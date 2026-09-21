'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import { Award, CheckCircle, Zap, Activity, Clock, FileCode, Flame } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Submission {
  id: string;
  language: string;
  verdict: string;
  createdAt: string;
  problem: {
    id: string;
    title: string;
    slug: string;
    difficulty?: string;
  };
}

export default function Dashboard() {
  const { user } = useAuthStore();

  // Fetch recent submissions
  const { data: submissions = [], isLoading } = useQuery<Submission[]>({
    queryKey: ['recent-submissions'],
    queryFn: () => apiRequest('/submissions/recent?limit=30'),
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-400 space-y-4">
        <p className="text-lg">Please sign in to view your dashboard</p>
      </div>
    );
  }

  // Aggregate stats
  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter((s) => s.verdict === 'ACCEPTED');
  
  // Unique solved problems list
  const uniqueSolved = Array.from(new Set(acceptedSubmissions.map((s) => s.problem.id)));
  const uniqueSolvedCount = uniqueSolved.length;

  // Language usage breakdown
  const languageCounts = submissions.reduce((acc: Record<string, number>, curr) => {
    acc[curr.language] = (acc[curr.language] || 0) + 1;
    return acc;
  }, {});

  const languageData = Object.keys(languageCounts).map((key) => ({
    name: key.toUpperCase(),
    value: languageCounts[key],
  }));

  // Easy/Medium/Hard aggregation from solved problems
  const difficultyCounts = acceptedSubmissions.reduce(
    (acc: { EASY: number; MEDIUM: number; HARD: number }, curr) => {
      // Fallback difficulty if missing in relation
      const diff = (curr.problem.difficulty || 'EASY') as 'EASY' | 'MEDIUM' | 'HARD';
      acc[diff] = (acc[diff] || 0) + 1;
      return acc;
    },
    { EASY: 0, MEDIUM: 0, HARD: 0 },
  );

  const pieData = [
    { name: 'Easy', value: difficultyCounts.EASY, color: '#22C55E' },
    { name: 'Medium', value: difficultyCounts.MEDIUM, color: '#F59E0B' },
    { name: 'Hard', value: difficultyCounts.HARD, color: '#EF4444' },
  ].filter((item) => item.value > 0);

  // Submissions timeline data (last 7 entries)
  const timelineData = submissions
    .slice()
    .reverse()
    .map((s) => ({
      date: new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      verdict: s.verdict === 'ACCEPTED' ? 1 : 0,
    }));

  return (
    <div className="space-y-8 py-4">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-poppins font-extrabold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm">Monitor your algorithms training history and performance analytics</p>
      </div>

      {/* Grid counters */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Score Points */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Score Points</p>
            <p className="text-2xl font-bold font-poppins text-accent">{user.points}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
            <Award className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2: Rating */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CP Rating</p>
            <p className="text-2xl font-bold font-poppins text-primary">{user.rating}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
            <Flame className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Solved problems */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Problems Solved</p>
            <p className="text-2xl font-bold font-poppins text-success">{uniqueSolvedCount}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-success/10 border border-success/25 flex items-center justify-center text-success">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Card 4: Daily Streak */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Streak</p>
            <p className="text-2xl font-bold font-poppins text-white">5 Days</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Zap className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* Analytics Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Timeline Chart */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold font-poppins text-white">Evaluation Timeline</h3>
            <span className="text-xs text-gray-400">Accepted vs. Errors</span>
          </div>

          <div className="h-64">
            {timelineData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                No activity data available. Submit solutions to seed logs!
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorVerdict" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} domain={[0, 1]} tickFormatter={(v) => (v === 1 ? 'AC' : 'WA')} />
                  <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155' }} />
                  <Area type="monotone" dataKey="verdict" stroke="#FF6B00" fillOpacity={1} fill="url(#colorVerdict)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Difficulty Distribution Chart */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-border/40 flex flex-col justify-between space-y-4">
          <h3 className="text-base font-semibold font-poppins text-white">Difficulty Split</h3>
          <div className="h-48 flex items-center justify-center">
            {pieData.length === 0 ? (
              <span className="text-gray-500 text-xs">No problems solved yet</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Legend indicator */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            <div className="text-success bg-success/10 py-1.5 rounded-lg">Easy ({difficultyCounts.EASY})</div>
            <div className="text-warning bg-warning/10 py-1.5 rounded-lg">Medium ({difficultyCounts.MEDIUM})</div>
            <div className="text-danger bg-danger/10 py-1.5 rounded-lg">Hard ({difficultyCounts.HARD})</div>
          </div>
        </div>
      </section>

      {/* Submissions log history */}
      <section className="glass-panel rounded-2xl border border-border/40 overflow-hidden shadow-xl p-6">
        <h3 className="text-base font-semibold font-poppins text-white mb-4">Submission Logs</h3>
        {isLoading ? (
          <div className="py-8 text-center text-gray-500 text-xs">Loading logs...</div>
        ) : submissions.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-xs">No submissions logged yet</div>
        ) : (
          <div className="divide-y divide-border/20 max-h-72 overflow-y-auto pr-2">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="space-y-1">
                  <p className="font-semibold text-white">
                    {sub.problem.title}
                  </p>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                    <span className="uppercase font-mono">{sub.language}</span>
                    <span>•</span>
                    <span>{new Date(sub.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                    sub.verdict === 'ACCEPTED' ? 'text-success bg-success/15 border border-success/20' : 'text-danger bg-danger/15 border border-danger/20'
                  }`}>
                    {sub.verdict}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
