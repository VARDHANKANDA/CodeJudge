'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import { Trophy, Award, Flame, CheckCircle, Loader2 } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  id: string;
  username: string;
  name?: string;
  points: number;
  rating: number;
  solvedCount: number;
}

export default function Leaderboard() {
  const { data: users = [], isLoading, isError } = useQuery<LeaderboardUser[]>({
    queryKey: ['global-leaderboard'],
    queryFn: () => apiRequest('/users/leaderboard?limit=50'),
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center space-y-2">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm ml-2">Loading global rankings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-poppins font-extrabold text-white">Global Leaderboard</h1>
        <p className="text-gray-400 text-sm">Behold the rankings of elite programmers based on total score points</p>
      </div>

      {/* Podium for top 3 users */}
      {users.length >= 3 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6">
          {/* 2nd Place */}
          <div className="glass-panel p-6 rounded-2xl border border-border/40 text-center flex flex-col items-center justify-center space-y-3 order-2 md:order-1 md:mt-6">
            <div className="h-12 w-12 rounded-full bg-slate-400 flex items-center justify-center font-bold text-background text-lg shadow-md">
              2
            </div>
            <div>
              <p className="font-bold text-white font-poppins">{users[1].name || users[1].username}</p>
              <p className="text-xs text-gray-400">@{users[1].username}</p>
            </div>
            <div className="flex justify-center space-x-3 text-xs font-semibold pt-1">
              <span className="text-accent">{users[1].points} pts</span>
              <span className="text-primary">{users[1].rating} rating</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="glass-panel p-8 rounded-2xl border border-primary/30 text-center flex flex-col items-center justify-center space-y-3 order-1 md:order-2 shadow-xl bg-gradient-to-tr from-primary/5 to-accent/5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center font-bold text-white text-2xl shadow-lg ring-4 ring-primary/20">
              1
            </div>
            <div>
              <p className="font-extrabold text-white font-poppins text-lg">{users[0].name || users[0].username}</p>
              <p className="text-xs text-primary font-semibold">@{users[0].username}</p>
            </div>
            <div className="flex justify-center space-x-4 text-sm font-bold pt-2">
              <span className="text-accent">{users[0].points} pts</span>
              <span className="text-white bg-primary/20 border border-primary/20 px-2 py-0.5 rounded-full text-[10px]">{users[0].rating} rating</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="glass-panel p-6 rounded-2xl border border-border/40 text-center flex flex-col items-center justify-center space-y-3 order-3 md:order-3 md:mt-10">
            <div className="h-12 w-12 rounded-full bg-amber-750 flex items-center justify-center font-bold text-background text-lg shadow-md bg-orange-700/60">
              3
            </div>
            <div>
              <p className="font-bold text-white font-poppins">{users[2].name || users[2].username}</p>
              <p className="text-xs text-gray-400">@{users[2].username}</p>
            </div>
            <div className="flex justify-center space-x-3 text-xs font-semibold pt-1">
              <span className="text-accent">{users[2].points} pts</span>
              <span className="text-primary">{users[2].rating} rating</span>
            </div>
          </div>
        </section>
      )}

      {/* Global ranking table */}
      <section className="glass-panel rounded-2xl border border-border/40 overflow-hidden shadow-xl max-w-5xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-card/25 text-gray-400 text-xs uppercase font-semibold">
                <th className="px-6 py-4 text-center w-20">Rank</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4 text-center">Score Points</th>
                <th className="px-6 py-4 text-center">CP Rating</th>
                <th className="px-6 py-4 text-center">Solved Challenges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-xs sm:text-sm">
              {users.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-center font-extrabold font-mono text-primary w-20">
                    {row.rank}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-white">{row.name || row.username}</p>
                      <p className="text-xs text-gray-400 font-light">@{row.username}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-accent font-bold font-mono">
                    {row.points}
                  </td>
                  <td className="px-6 py-4 text-center text-primary font-semibold font-mono">
                    {row.rating}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 font-semibold font-mono">
                    {row.solvedCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
