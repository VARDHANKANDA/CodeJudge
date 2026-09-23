'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  CircleDashed,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Loader2,
  Code2,
} from 'lucide-react';

interface TopicProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  points: number;
  isSolved: boolean;
}

interface RoadmapTopic {
  id: string;
  slug: string;
  name: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  conceptOverview: string;
  keyConcepts: string[];
  totalProblems: number;
  solvedProblems: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  problems: TopicProblem[];
}

interface RoadmapLevel {
  levelNumber: number;
  title: string;
  subtitle: string;
  description: string;
  topics: RoadmapTopic[];
}

interface RoadmapData {
  levels: RoadmapLevel[];
  summary: {
    totalLevels: number;
    totalTopics: number;
    totalProblems: number;
    solvedProblems: number;
    completionPercentage: number;
  };
}

export default function RoadmapPage() {
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  });

  const { data, isLoading } = useQuery<RoadmapData>({
    queryKey: ['roadmap-structure'],
    queryFn: () => apiRequest('/roadmap'),
  });

  const toggleLevel = (lvlNum: number) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [lvlNum]: !prev[lvlNum],
    }));
  };

  const difficultyColors = {
    EASY: 'text-success bg-success/10 border-success/20',
    MEDIUM: 'text-warning bg-warning/10 border-warning/20',
    HARD: 'text-danger bg-danger/10 border-danger/20',
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm">Loading Structured DSA Roadmap...</p>
      </div>
    );
  }

  const summary = data?.summary || {
    totalLevels: 7,
    totalTopics: 0,
    totalProblems: 0,
    solvedProblems: 0,
    completionPercentage: 0,
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-border/80 p-8 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Compass className="h-3.5 w-3.5" />
              <span>Structured 7-Level Progression</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-poppins font-black text-white tracking-tight">
              Comprehensive <span className="gradient-text">DSA Roadmap</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              A carefully structured, concept-first roadmap from foundational complexity analysis to elite competitive programming. Every topic is paired with verified canonical problems.
            </p>
          </div>

          {/* Overall Progress Widget */}
          <div className="w-full md:w-auto min-w-[260px] bg-background/60 border border-border/80 p-5 rounded-2xl flex flex-col space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">Overall Roadmap Progress</span>
              <span className="text-accent font-bold">{summary.completionPercentage}%</span>
            </div>
            <div className="w-full bg-border/40 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 rounded-full"
                style={{ width: `${summary.completionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
              <span>{summary.solvedProblems} Solved</span>
              <span>{summary.totalProblems} Problems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Levels List */}
      <div className="space-y-6">
        {data?.levels.map((level) => {
          const isExpanded = !!expandedLevels[level.levelNumber];
          const levelProblems = level.topics.reduce((sum, t) => sum + t.totalProblems, 0);
          const levelSolved = level.topics.reduce((sum, t) => sum + t.solvedProblems, 0);
          const levelPercent = levelProblems > 0 ? Math.round((levelSolved / levelProblems) * 100) : 0;

          return (
            <div
              key={level.levelNumber}
              className="glass-panel border border-border/70 rounded-2xl overflow-hidden transition shadow-lg hover:border-border"
            >
              {/* Level Accordion Header */}
              <button
                onClick={() => toggleLevel(level.levelNumber)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center font-bold text-white text-sm">
                    L{level.levelNumber}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-lg font-poppins font-bold text-white">
                        Level {level.levelNumber}: {level.title}
                      </h2>
                      <span className="hidden sm:inline-block text-xs text-gray-400 font-medium">
                        — {level.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{level.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono font-bold text-gray-300">
                      {levelSolved}/{levelProblems} Done
                    </span>
                    <span className="text-[11px] text-gray-500 block">({levelPercent}%)</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Topics Container */}
              {isExpanded && (
                <div className="border-t border-border/40 p-6 space-y-6 bg-background/40">
                  {level.topics.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-xs italic">
                      Advanced modules available in next curriculum release.
                    </div>
                  ) : (
                    level.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-background/80 border border-border/60 rounded-xl p-5 space-y-4 hover:border-primary/40 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2.5">
                              {topic.status === 'COMPLETED' ? (
                                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                              ) : topic.status === 'IN_PROGRESS' ? (
                                <Flame className="h-4 w-4 text-warning shrink-0" />
                              ) : (
                                <CircleDashed className="h-4 w-4 text-gray-500 shrink-0" />
                              )}
                              <h3 className="text-sm font-bold text-white">{topic.name}</h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  difficultyColors[topic.difficulty]
                                }`}
                              >
                                {topic.difficulty}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">{topic.description}</p>
                          </div>

                          {topic.totalProblems > 0 ? (
                            <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                              {topic.solvedProblems}/{topic.totalProblems} Solved
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-border/30 whitespace-nowrap">
                              Problems coming soon
                            </span>
                          )}
                        </div>

                        {/* Concept Overview Box */}
                        <div className="bg-white/[0.02] border border-border/30 rounded-lg p-3.5 text-xs text-gray-300 leading-relaxed">
                          <div className="flex items-center space-x-1.5 text-primary text-[11px] font-semibold mb-1">
                            <BookOpen className="h-3 w-3" />
                            <span>Concept Summary</span>
                          </div>
                          {topic.conceptOverview}
                        </div>

                        {/* Key Concept Chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {topic.keyConcepts.map((kc, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-mono px-2 py-0.5 bg-border/40 text-gray-300 rounded-md border border-border/60"
                            >
                              {kc}
                            </span>
                          ))}
                        </div>

                        {/* Associated Problems List */}
                        {topic.problems && topic.problems.length > 0 ? (
                          <div className="pt-2 border-t border-border/30 space-y-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                              Practice Challenges ({topic.problems.length})
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {topic.problems.map((prob) => (
                                <Link
                                  key={prob.id}
                                  href={`/problems/${prob.slug}`}
                                  className="flex items-center justify-between p-3 rounded-lg bg-border/20 border border-border/40 hover:border-primary/50 hover:bg-white/[0.04] transition group"
                                >
                                  <div className="flex items-center space-x-2.5">
                                    {prob.isSolved ? (
                                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                                    ) : (
                                      <Code2 className="h-4 w-4 text-gray-500 group-hover:text-primary transition shrink-0" />
                                    )}
                                    <span
                                      className={`text-xs font-semibold ${
                                        prob.isSolved ? 'text-gray-300' : 'text-white group-hover:text-primary'
                                      } transition`}
                                    >
                                      {prob.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                        difficultyColors[prob.difficulty]
                                      }`}
                                    >
                                      {prob.difficulty}
                                    </span>
                                    <ArrowRight className="h-3.5 w-3.5 text-gray-500 group-hover:translate-x-0.5 transition" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="pt-2 border-t border-border/20 flex items-center justify-between text-[11px] text-gray-500">
                            <span className="flex items-center space-x-1.5">
                              <CircleDashed className="h-3.5 w-3.5 text-gray-500" />
                              <span>Verified practice challenges coming in next content batch</span>
                            </span>
                            <span className="text-gray-500 font-mono">Concept Guide Active</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
