'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import Link from 'next/link';
import { Search, Loader2, BookOpen, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface ProblemItem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  points: number;
  tags: Array<{ tag: { name: string; slug: string } }>;
}

export default function Problems() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);

  // Fetch problems from NestJS API using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['problems', page, search, difficulty, tag],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '10');
      if (search) params.append('search', search);
      if (difficulty) params.append('difficulty', difficulty);
      if (tag) params.append('tag', tag);
      return apiRequest(`/problems?${params.toString()}`);
    },
  });

  const problemsList: ProblemItem[] = data?.items || [];
  const totalPages = data?.totalPages || 1;

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const difficultyColors = {
    EASY: 'text-success bg-success/10 border-success/20',
    MEDIUM: 'text-warning bg-warning/10 border-warning/20',
    HARD: 'text-danger bg-danger/10 border-danger/20',
  };

  return (
    <div className="space-y-8 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-white">Challenges</h1>
          <p className="text-gray-400 text-sm">Practice standard coding challenges, filters by topic, and optimize execution</p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-card/40 border border-border/40 p-4 rounded-xl backdrop-blur-md">
        {/* Search */}
        <div className="relative md:col-span-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search problems by title, keywords..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-background/60 border border-border/60 pl-10 pr-4 py-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-primary/80 transition"
          />
        </div>

        {/* Difficulty filter */}
        <div className="md:col-span-3">
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-full bg-background/60 border border-border/60 px-4 py-2.5 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-primary/80 transition cursor-pointer"
          >
            <option value="">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        {/* Tag filter */}
        <div className="md:col-span-3">
          <input
            type="text"
            placeholder="Filter by Tag slug (e.g. arrays)"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background/60 border border-border/60 px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-primary/80 transition"
          />
        </div>
      </div>

      {/* Problems list */}
      <div className="glass-panel rounded-2xl border border-border/40 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-gray-400 text-sm">Harvesting challenge database...</p>
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-danger font-medium">
            Error loading problems: {error.message}
          </div>
        ) : problemsList.length === 0 ? (
          <div className="py-20 text-center text-gray-400 space-y-2">
            <BookOpen className="h-10 w-10 text-gray-500 mx-auto" />
            <p className="font-semibold">No problems match your search criteria</p>
            <p className="text-xs">Try adjusting your filters or search tags</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-card/25 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4 text-center">Difficulty</th>
                  <th className="px-6 py-4 text-center">Score Points</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {problemsList.map((problem) => (
                  <tr key={problem.id} className="hover:bg-white/5 transition duration-150">
                    <td className="px-6 py-4">
                      <Link href={`/problems/${problem.slug}`} className="font-semibold text-white hover:text-primary transition">
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${difficultyColors[problem.difficulty]}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-semibold text-accent">
                      {problem.points}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                        {problem.tags.length > 0 ? (
                          problem.tags.map(({ tag }) => (
                            <span key={tag.slug} className="text-[10px] bg-card border border-border/40 px-2 py-0.5 rounded text-gray-300">
                              {tag.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500 font-light">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/problems/${problem.slug}`}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white gradient-btn shadow-md hover:opacity-90"
                      >
                        <span>Solve</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 bg-card border border-border/60 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-gray-400 px-4">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 bg-card border border-border/60 rounded-lg text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
