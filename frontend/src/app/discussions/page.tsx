'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import { MessageSquare, Heart, Plus, Search, Filter, Loader2, BookOpen, AlertCircle, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Discussion {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name?: string;
    avatarUrl?: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

export default function DiscussionsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New discussion form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [modalError, setModalError] = useState<string | null>(null);

  // Fetch discussions
  const { data, isLoading, isError } = useQuery<{ items: Discussion[]; totalPages: number; total: number }>({
    queryKey: ['discussions', page, category],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '15');
      if (category) params.append('category', category);
      return apiRequest(`/discussions?${params.toString()}`);
    },
  });

  // Create discussion mutation
  const createMutation = useMutation({
    mutationFn: (body: { title: string; content: string; category: string }) =>
      apiRequest('/discussions', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      setIsModalOpen(false);
      setNewTitle('');
      setNewContent('');
      setNewCategory('General');
      setModalError(null);
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
    },
    onError: (err: any) => {
      setModalError(err.message || 'Failed to create discussion');
    },
  });

  // Like toggle mutation
  const likeMutation = useMutation({
    mutationFn: (discussionId: string) =>
      apiRequest('/discussions/like', {
        method: 'POST',
        body: JSON.stringify({ discussionId }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
    },
  });

  const categories = ['General', 'Tutorial', 'Contests', 'Help', 'Interview Prep'];

  const filteredItems = (data?.items || []).filter((item) =>
    search ? item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <div className="space-y-8 py-4">
      {/* Title and Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-white">Discussions Forum</h1>
          <p className="text-gray-400 text-sm">Ask questions, share algorithmic strategies, and collaborate with the community</p>
        </div>

        {isAuthenticated ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-white gradient-btn flex items-center space-x-2 shadow-lg hover:opacity-90 transition"
          >
            <Plus className="h-4 w-4" />
            <span>New Discussion</span>
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="px-5 py-2.5 rounded-xl font-semibold text-white gradient-btn flex items-center space-x-2 shadow-lg"
          >
            <span>Sign In to Post</span>
          </Link>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-card/40 border border-border/40 p-4 rounded-xl backdrop-blur-md">
        <div className="relative md:col-span-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background/60 border border-border/60 pl-10 pr-4 py-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-primary/80 transition"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="w-full bg-background/60 border border-border/60 px-4 py-2.5 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-primary/80 transition cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-gray-400 text-sm">Loading discussion threads...</p>
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-danger font-medium">Error loading discussions.</div>
        ) : filteredItems.length === 0 ? (
          <div className="glass-panel p-12 text-center text-gray-400 rounded-2xl border border-border/20 space-y-3">
            <BookOpen className="h-10 w-10 text-gray-500 mx-auto" />
            <p className="font-semibold text-white">No discussions found</p>
            <p className="text-xs">Be the first to start a conversation in this topic!</p>
          </div>
        ) : (
          filteredItems.map((thread) => (
            <div
              key={thread.id}
              className="glass-panel p-6 rounded-2xl border border-border/40 hover:border-primary/30 transition shadow-lg space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {thread.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      Posted by <span className="text-white font-semibold">{thread.author.name || thread.author.username}</span> •{' '}
                      {new Date(thread.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-white hover:text-primary transition cursor-pointer">
                    {thread.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed line-clamp-3 whitespace-pre-line">
                {thread.content}
              </p>

              <div className="flex items-center space-x-6 text-xs text-gray-400 border-t border-border/20 pt-3">
                <button
                  onClick={() => isAuthenticated && likeMutation.mutate(thread.id)}
                  className="flex items-center space-x-1.5 hover:text-danger transition"
                >
                  <Heart className="h-4 w-4" />
                  <span>{thread._count?.likes ?? 0} Likes</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span>{thread._count?.comments ?? 0} Comments</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Discussion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-border/80 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h2 className="text-lg font-poppins font-bold text-white">Create New Discussion</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {modalError && (
              <div className="flex items-center space-x-2 bg-danger/10 border border-danger/30 text-danger text-xs p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-300 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Optimal approach for Graph Dijkstra algorithm"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-300 uppercase tracking-wider">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-primary/80 transition"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-300 uppercase tracking-wider">Content (Markdown)</label>
                <textarea
                  rows={6}
                  placeholder="Explain your thought process, share code blocks or ask questions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-background border border-border/60 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary/80 transition resize-none font-mono"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white bg-card border border-border/60 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!newTitle.trim() || !newContent.trim()) {
                      setModalError('Please provide both title and content.');
                      return;
                    }
                    createMutation.mutate({
                      title: newTitle,
                      content: newContent,
                      category: newCategory,
                    });
                  }}
                  disabled={createMutation.isPending}
                  className="px-5 py-2 rounded-xl text-white gradient-btn font-semibold flex items-center space-x-1.5 shadow"
                >
                  {createMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Publish Thread</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
