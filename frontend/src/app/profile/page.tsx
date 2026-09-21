'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import { Award, Flame, CheckCircle, Calendar, Shield, Loader2, BookOpen, Clock, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  username: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  role: string;
  points: number;
  rating: number;
  createdAt: string;
  solvedCount: number;
  submissions: Array<{
    id: string;
    verdict: string;
    language: string;
    createdAt: string;
    problem: {
      title: string;
      slug: string;
    };
  }>;
  achievements: Array<{
    achievement: {
      name: string;
      description: string;
      badgeUrl: string;
    };
    unlockedAt: string;
  }>;
}

export default function ProfilePage() {
  const { user } = useAuthStore();

  const { data: profile, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ['user-profile', user?.username],
    queryFn: () => apiRequest(`/users/profile/${user?.username}`),
    enabled: !!user?.username,
  });

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-400 space-y-4">
        <p className="text-lg">Please sign in to view your profile</p>
        <Link href="/auth/login" className="px-6 py-2.5 rounded-xl font-semibold text-white gradient-btn inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm">Fetching user profile data...</p>
      </div>
    );
  }

  const userInitials = profile?.name
    ? profile.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : profile?.username.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Profile Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-border/40 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-primary to-accent p-1 shadow-xl shrink-0">
            <div className="h-full w-full rounded-2xl bg-background flex items-center justify-center text-2xl font-bold text-white font-poppins">
              {userInitials}
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left flex-grow">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-poppins font-extrabold text-white">
                {profile?.name || profile?.username}
              </h1>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 uppercase self-center md:self-auto">
                {user.role}
              </span>
            </div>
            <p className="text-sm text-gray-400 font-light">@{profile?.username} • Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '-'}</p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/20">
          <div className="bg-card/40 p-4 rounded-xl border border-border/20 text-center">
            <p className="text-xs text-gray-400 uppercase font-semibold">Total Points</p>
            <p className="text-2xl font-bold font-poppins text-accent mt-1">{profile?.points ?? user.points}</p>
          </div>
          <div className="bg-card/40 p-4 rounded-xl border border-border/20 text-center">
            <p className="text-xs text-gray-400 uppercase font-semibold">CP Rating</p>
            <p className="text-2xl font-bold font-poppins text-primary mt-1">{profile?.rating ?? user.rating}</p>
          </div>
          <div className="bg-card/40 p-4 rounded-xl border border-border/20 text-center">
            <p className="text-xs text-gray-400 uppercase font-semibold">Problems Solved</p>
            <p className="text-2xl font-bold font-poppins text-success mt-1">{profile?.solvedCount ?? 0}</p>
          </div>
          <div className="bg-card/40 p-4 rounded-xl border border-border/20 text-center">
            <p className="text-xs text-gray-400 uppercase font-semibold">Badges Earned</p>
            <p className="text-2xl font-bold font-poppins text-white mt-1">{profile?.achievements?.length ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Badges & Achievements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-poppins font-bold text-white">Unlocked Badges</h2>
            </div>

            {profile?.achievements && profile.achievements.length > 0 ? (
              <div className="space-y-3">
                {profile.achievements.map((item, idx) => (
                  <div key={idx} className="bg-card/40 border border-border/30 p-4 rounded-xl flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.achievement.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-xs">
                No badges unlocked yet. Solve coding problems to earn achievements!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Submissions */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-poppins font-bold text-white">Recent Submissions</h2>
              </div>
              <Link href="/dashboard" className="text-xs text-primary hover:underline font-semibold">
                View Full Logs
              </Link>
            </div>

            {profile?.submissions && profile.submissions.length > 0 ? (
              <div className="divide-y divide-border/20">
                {profile.submissions.map((sub) => (
                  <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <Link href={`/problems/${sub.problem.slug}`} className="font-semibold text-white hover:text-primary transition">
                        {sub.problem.title}
                      </Link>
                      <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                        <span className="uppercase font-mono">{sub.language}</span>
                        <span>•</span>
                        <span>{new Date(sub.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      sub.verdict === 'ACCEPTED' ? 'text-success bg-success/15 border border-success/20' : 'text-danger bg-danger/15 border border-danger/20'
                    }`}>
                      {sub.verdict}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-xs">
                No recent submissions logged.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
