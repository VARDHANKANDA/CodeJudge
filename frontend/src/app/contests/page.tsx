'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import Link from 'next/link';
import { Calendar, Clock, Lock, Unlock, PlayCircle, Loader2, Trophy } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  isPrivate: boolean;
}

export default function Contests() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch contests list
  const { data, isLoading, isError } = useQuery<{ live: Contest[]; upcoming: Contest[]; past: Contest[] }>({
    queryKey: ['contests'],
    queryFn: () => apiRequest('/contests'),
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (contestId: string) =>
      apiRequest(`/contests/${contestId}/register`, {
        method: 'POST',
      }),
    onSuccess: () => {
      alert('Successfully registered for the contest!');
      queryClient.invalidateQueries({ queryKey: ['contests'] });
    },
    onError: (err: any) => {
      alert(err.message || 'Failed to register');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center space-y-2">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm ml-2">Entering the contest arena lobby...</p>
      </div>
    );
  }

  const { live = [], upcoming = [], past = [] } = data || {};

  return (
    <div className="space-y-10 py-4">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-poppins font-extrabold text-white">Contest Arena</h1>
        <p className="text-gray-400 text-sm">Join speed coding events, earn points, and climb the scoreboard ranks</p>
      </div>

      {/* Live Contests */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-primary font-bold">
          <PlayCircle className="h-5 w-5 animate-pulse" />
          <h2 className="text-xl font-poppins">Live Challenges</h2>
        </div>

        {live.length === 0 ? (
          <div className="glass-panel p-8 text-center text-gray-500 rounded-2xl border border-border/20 text-sm">
            No live events currently active. Check the upcoming schedule!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {live.map((contest) => (
              <div key={contest.id} className="glass-panel p-6 rounded-2xl border border-primary/20 relative shadow-lg">
                <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  LIVE NOW
                </div>
                <h3 className="text-lg font-bold font-poppins text-white pr-20">{contest.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{contest.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Ends {new Date(contest.endTime).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Link
                    href={`/contests/${contest.id}`}
                    className="px-6 py-2 rounded-lg text-xs font-bold text-white gradient-btn shadow-md"
                  >
                    Enter Workspace
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Contests */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-accent font-bold">
          <Calendar className="h-5 w-5" />
          <h2 className="text-xl font-poppins">Upcoming Events</h2>
        </div>

        {upcoming.length === 0 ? (
          <div className="glass-panel p-8 text-center text-gray-500 rounded-2xl border border-border/20 text-sm">
            No upcoming events scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((contest) => (
              <div key={contest.id} className="glass-panel p-6 rounded-2xl border border-border/40 relative shadow">
                <div className="absolute top-4 right-4">
                  {contest.isPrivate ? (
                    <Lock className="h-4 w-4 text-warning" />
                  ) : (
                    <Unlock className="h-4 w-4 text-success" />
                  )}
                </div>
                <h3 className="text-lg font-bold font-poppins text-white pr-10">{contest.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{contest.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Starts {new Date(contest.startTime).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => registerMutation.mutate(contest.id)}
                    disabled={registerMutation.isPending}
                    className="px-6 py-2 rounded-lg text-xs font-bold text-white bg-card border border-border/60 hover:bg-white/5 transition flex items-center space-x-1"
                  >
                    {registerMutation.isPending && <Loader2 className="h-3 w-3 animate-spin text-primary mr-1" />}
                    <span>Register</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Contests */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-400 font-bold">
          <Trophy className="h-5 w-5" />
          <h2 className="text-xl font-poppins">Past Coding Rounds</h2>
        </div>

        {past.length === 0 ? (
          <div className="glass-panel p-8 text-center text-gray-500 rounded-2xl border border-border/20 text-sm">
            No history recorded.
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-border/40 overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/40 bg-card/25 text-gray-400 text-xs uppercase font-semibold">
                    <th className="px-6 py-3.5">Title</th>
                    <th className="px-6 py-3.5">Timeline Date</th>
                    <th className="px-6 py-3.5 text-right">Leaderboard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-xs sm:text-sm">
                  {past.map((contest) => (
                    <tr key={contest.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 font-semibold text-white">{contest.title}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(contest.startTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/contests/${contest.id}`}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          View Results
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
