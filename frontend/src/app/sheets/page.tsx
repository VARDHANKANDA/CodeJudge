'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import Link from 'next/link';
import {
  Layers,
  CheckCircle2,
  CircleDashed,
  ArrowRight,
  Flame,
  Award,
  Loader2,
  Search,
  BookMarked,
  Filter,
} from 'lucide-react';

interface SheetProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  points: number;
  isSolved: boolean;
}

interface CuratedSheet {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  problems: SheetProblem[];
  availableCount: number;
  totalCount: number;
  solvedCount: number;
  progressPercent: number;
  availabilityPercent: number;
}

export default function SheetsPage() {
  const [activeSheetId, setActiveSheetId] = useState<string>('foundations-75');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: sheets = [], isLoading } = useQuery<CuratedSheet[]>({
    queryKey: ['curated-sheets'],
    queryFn: () => apiRequest('/roadmap/sheets'),
  });

  const activeSheet = sheets.find((s) => s.id === activeSheetId) || sheets[0];

  const difficultyColors = {
    EASY: 'text-success bg-success/10 border-success/20',
    MEDIUM: 'text-warning bg-warning/10 border-warning/20',
    HARD: 'text-danger bg-danger/10 border-danger/20',
    MIXED: 'text-primary bg-primary/10 border-primary/20',
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm">Loading Curated Practice Sheets...</p>
      </div>
    );
  }

  const filteredProblems = (activeSheet?.problems || []).filter((p) => {
    const matchesDifficulty = filterDifficulty === 'ALL' || p.difficulty === filterDifficulty;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-border/80 p-8 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <BookMarked className="h-3.5 w-3.5" />
            <span>Curated Preparation Tracks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-black text-white tracking-tight">
            Curated <span className="gradient-text">Practice Sheets</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Targeted problem collections organized for high-yield interview preparation and topic-specific mastery. Track your progress across top question sets.
          </p>
        </div>
      </div>

      {/* Sheets Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sheets.map((sheet) => {
          const isSelected = sheet.id === activeSheetId;
          return (
            <button
              key={sheet.id}
              onClick={() => setActiveSheetId(sheet.id)}
              className={`p-5 rounded-2xl border text-left transition relative overflow-hidden ${
                isSelected
                  ? 'glass-panel border-primary/80 shadow-lg bg-primary/[0.04]'
                  : 'bg-background/60 border-border/60 hover:border-border hover:bg-white/[0.02]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      difficultyColors[sheet.difficulty as keyof typeof difficultyColors] || 'text-gray-300'
                    }`}
                  >
                    {sheet.difficulty}
                  </span>
                  <span className="text-xs font-mono font-bold text-accent">
                    {sheet.progressPercent}% Done
                  </span>
                </div>
                <h2 className="text-sm font-bold text-white leading-snug">{sheet.title}</h2>
                <p className="text-xs text-gray-400 line-clamp-2">{sheet.description}</p>
                <div className="w-full bg-border/40 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                    style={{ width: `${sheet.progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-gray-400 block pt-1">
                  {sheet.solvedCount} of {sheet.availableCount || sheet.problems.length} solved ({sheet.availableCount || sheet.problems.length}/{sheet.totalCount} available)
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sheet Content Panel */}
      {activeSheet && (
        <div className="glass-panel border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-poppins font-extrabold text-white">{activeSheet.title}</h2>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  {activeSheet.availableCount || activeSheet.problems.length} of {activeSheet.totalCount} Verified
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{activeSheet.description}</p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background border border-border/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary/80 transition"
                />
              </div>

              {/* Difficulty filter */}
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="bg-background border border-border/60 rounded-xl px-3 py-2 text-xs font-semibold text-gray-300 focus:outline-none"
              >
                <option value="ALL">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>

          {/* Problem Table */}
          <div className="space-y-2">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs italic">
                No problems match the current filter criteria.
              </div>
            ) : (
              filteredProblems.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/problems/${p.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/40 hover:border-primary/50 hover:bg-white/[0.03] transition group"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-xs font-mono text-gray-500 w-6">#{idx + 1}</span>
                    {p.isSolved ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <CircleDashed className="h-4 w-4 text-gray-500 group-hover:text-primary transition shrink-0" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        p.isSolved ? 'text-gray-300 line-through decoration-gray-600' : 'text-white group-hover:text-primary'
                      } transition`}
                    >
                      {p.title}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        difficultyColors[p.difficulty]
                      }`}
                    >
                      {p.difficulty}
                    </span>
                    <span className="text-xs text-accent font-semibold">{p.points} pts</span>
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:translate-x-0.5 transition" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
