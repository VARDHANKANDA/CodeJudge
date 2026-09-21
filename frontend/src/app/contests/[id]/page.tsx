'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../../lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, Trophy, ListCollapse, Award, Loader2 } from 'lucide-react';

interface ContestProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  points: number;
}

interface LeaderboardUser {
  rank: number;
  user: {
    username: string;
    name?: string;
    avatarUrl?: string;
  };
  score: number;
  penalty: number;
  lastAcceptedTime: string | null;
}

export default function ContestDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'problems' | 'leaderboard'>('problems');
  const [timeLeft, setTimeLeft] = useState('');

  // Fetch contest details
  const { data: contest, isLoading: contestLoading } = useQuery({
    queryKey: ['contest-details', id],
    queryFn: () => apiRequest(`/contests/${id}`),
  });

  // Fetch contest problems
  const { data: problems = [], isLoading: problemsLoading } = useQuery<ContestProblem[]>({
    queryKey: ['contest-problems', id],
    queryFn: () => apiRequest(`/contests/${id}/problems`),
  });

  // Fetch contest leaderboard
  const { data: leaderboard = [], refetch: refetchLeaderboard } = useQuery<LeaderboardUser[]>({
    queryKey: ['contest-leaderboard', id],
    queryFn: () => apiRequest(`/contests/${id}/leaderboard`),
  });

  // Countdown timer logic
  useEffect(() => {
    if (!contest) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(contest.endTime).getTime();
      const start = new Date(contest.startTime).getTime();

      if (now < start) {
        const diff = start - now;
        setTimeLeft(`Starts in: ${formatDuration(diff)}`);
      } else if (now >= start && now <= end) {
        const diff = end - now;
        setTimeLeft(`Time Remaining: ${formatDuration(diff)}`);
      } else {
        setTimeLeft('Contest Ended');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  const formatDuration = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const difficultyColors: Record<string, string> = {
    EASY: 'text-success bg-success/10',
    MEDIUM: 'text-warning bg-warning/10',
    HARD: 'text-danger bg-danger/10',
  };

  if (contestLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center space-y-2">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm ml-2">Syncing contest synchronization configurations...</p>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="py-20 text-center text-danger font-medium">
        Contest workspace not found.
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Contest header */}
      <div className="glass-panel p-6 rounded-2xl border border-border/40 relative shadow-lg">
        <h1 className="text-3xl font-poppins font-extrabold text-white">{contest.title}</h1>
        <p className="text-xs text-gray-400 mt-2 font-light">{contest.description}</p>
        
        {/* Timer display */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/20 pt-4">
          <div className="flex items-center space-x-2 text-primary font-mono font-bold text-sm bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-lg">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <span>Start: {new Date(contest.startTime).toLocaleString()}</span>
            <span>•</span>
            <span>End: {new Date(contest.endTime).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-border/40 pb-px">
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 ${
            activeTab === 'problems' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <ListCollapse className="h-4 w-4" />
            <span>Problems ({problems.length})</span>
          </div>
        </button>
        <button
          onClick={() => {
            setActiveTab('leaderboard');
            refetchLeaderboard();
          }}
          className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 ${
            activeTab === 'leaderboard' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center space-x-1.5">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </div>
        </button>
      </div>

      {/* Content panes */}
      <div className="min-h-[40vh]">
        {activeTab === 'problems' ? (
          problemsLoading ? (
            <div className="py-20 text-center text-xs text-gray-500">Retrieving contest challenges...</div>
          ) : problems.length === 0 ? (
            <div className="py-20 text-center text-xs text-gray-500">No problems mapped to this contest yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {problems.map((prob) => (
                <div
                  key={prob.id}
                  className="glass-panel p-5 rounded-xl border border-border/40 flex items-center justify-between hover:bg-white/5 transition"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white font-poppins">{prob.title}</h3>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider ${difficultyColors[prob.difficulty] || 'text-gray-300'}`}>
                        {prob.difficulty}
                      </span>
                      <span className="text-accent font-semibold">{prob.points} Points</span>
                    </div>
                  </div>

                  <Link
                    href={`/problems/${prob.slug}?contestId=${contest.id}`}
                    className="px-5 py-2 rounded-lg text-xs font-bold text-white gradient-btn shadow"
                  >
                    Solve
                  </Link>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Leaderboard ICPC Style display */
          <div className="glass-panel rounded-2xl border border-border/40 overflow-hidden shadow">
            {leaderboard.length === 0 ? (
              <div className="py-20 text-center text-gray-500 text-xs">
                No submissions logged. Submit a problem to populate rankings!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-card/25 text-gray-400 text-xs uppercase font-semibold">
                      <th className="px-6 py-4 text-center w-16">Rank</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4 text-center">Score</th>
                      <th className="px-6 py-4 text-center">Penalty (Mins)</th>
                      <th className="px-6 py-4 text-right">Last Accepted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 text-xs sm:text-sm">
                    {leaderboard.map((row) => (
                      <tr key={row.user.username} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-center font-bold font-mono text-primary w-16">
                          {row.rank}
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">
                          {row.user.name || row.user.username}
                        </td>
                        <td className="px-6 py-4 text-center text-accent font-semibold font-mono">
                          {row.score}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-400 font-mono">
                          {row.penalty}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-400">
                          {row.lastAcceptedTime ? new Date(row.lastAcceptedTime).toLocaleTimeString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
