'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../../lib/api';
import Editor from '@monaco-editor/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  Play,
  Send,
  Sparkles,
  Loader2,
  RefreshCw,
  Terminal,
  Cpu,
  Clock,
  CheckCircle2,
  XCircle,
  BookOpen,
  HelpCircle,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface Editorial {
  approach?: string;
  algorithm?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  content: string;
  referenceCode?: Record<string, string>;
}

export default function ProblemWorkspace() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const contestId = searchParams.get('contestId') || undefined;

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState<'description' | 'hints' | 'editorial' | 'discussion'>('description');
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});

  // Execution states
  const [execStatus, setExecStatus] = useState<string | null>(null);
  const [execVerdict, setExecVerdict] = useState<string | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [execMemory, setExecMemory] = useState<number | null>(null);
  const [execError, setExecError] = useState<string | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(false);

  // Fetch problem details
  const { data: problem, isLoading, isError } = useQuery({
    queryKey: ['problem', slug],
    queryFn: () => apiRequest(`/problems/slug/${slug}`),
  });

  // Update editor templates on language or problem change
  useEffect(() => {
    if (problem) {
      const templates = (problem.codeTemplates || {}) as Record<string, string>;
      if (templates && templates[language]) {
        setCode(templates[language]);
      } else {
        const defaults: Record<string, string> = {
          python: `import sys\n\ndef solve():\n    # Write your solution here\n    pass\n\nsolve()\n`,
          javascript: `const fs = require('fs');\n\nfunction solve() {\n    // Write your solution here\n}\n\nsolve();\n`,
          typescript: `function solve() {\n    // Write your solution here\n}\n\nsolve();\n`,
          cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}\n`,
          java: `import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) throws Exception {\n        // Write your solution here\n    }\n}\n`,
        };
        setCode(defaults[language] || '// Write solution here\n');
      }
    }
  }, [problem, language]);

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: (body: { problemId: string; code: string; language: string; contestId?: string }) =>
      apiRequest('/submissions', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => {
      pollSubmissionStatus(data.id);
    },
    onError: (err: any) => {
      setExecStatus(null);
      setExecVerdict('ERROR');
      setExecError(err.message || 'Failed to submit solution');
    },
  });

  const handleRunSubmit = () => {
    if (!problem) return;
    setConsoleOpen(true);
    setExecStatus('Queuing in sandbox...');
    setExecVerdict(null);
    setExecTime(null);
    setExecMemory(null);
    setExecError(null);

    submitMutation.mutate({
      problemId: problem.id,
      code,
      language,
      contestId,
    });
  };

  const pollSubmissionStatus = (id: string) => {
    setExecStatus('Executing in sandbox...');
    const interval = setInterval(async () => {
      try {
        const sub = await apiRequest(`/submissions/${id}`);
        if (sub.verdict !== 'QUEUED' && sub.verdict !== 'RUNNING' && sub.verdict !== 'PENDING') {
          clearInterval(interval);
          setExecStatus(null);
          setExecVerdict(sub.verdict);
          setExecTime(sub.executionTime);
          setExecMemory(sub.memoryUsage);
          setExecError(sub.errorMessage);
        }
      } catch (err: any) {
        clearInterval(interval);
        setExecStatus(null);
        setExecVerdict('ERROR');
        setExecError(err.message || 'Error tracking submission');
      }
    }, 1200);
  };

  const toggleHint = (idx: number) => {
    setRevealedHints((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400">Loading IDE Workspace...</p>
      </div>
    );
  }

  if (isError || !problem) {
    return (
      <div className="py-20 text-center text-danger font-medium">
        Error loading workspace. Problem not found.
      </div>
    );
  }

  const editorial: Editorial | undefined = problem.editorial;
  const hints: string[] = (problem.hints || []) as string[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-2 min-h-[85vh]">
      {/* Left Column: Multi-tab Problem details */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className="glass-panel p-6 rounded-2xl border border-border/60 flex-grow flex flex-col h-[78vh] overflow-hidden">
          {/* Header */}
          <div className="border-b border-border/40 pb-4 mb-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-poppins font-extrabold text-white">{problem.title}</h1>
              {problem.isVerified && (
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Verified</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase ${
                  problem.difficulty === 'EASY'
                    ? 'text-success bg-success/15'
                    : problem.difficulty === 'MEDIUM'
                    ? 'text-warning bg-warning/15'
                    : 'text-danger bg-danger/15'
                }`}
              >
                {problem.difficulty}
              </span>
              <span className="text-xs text-accent font-semibold">{problem.points} Points</span>
              <span className="text-xs text-gray-400">Limits: {problem.timeLimit}ms / {problem.memoryLimit}MB</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 border-b border-border/40 pb-2 mb-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeTab === 'description'
                  ? 'bg-primary/20 text-white border border-primary/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Statement</span>
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeTab === 'hints'
                  ? 'bg-primary/20 text-white border border-primary/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Hints ({hints.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('editorial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                activeTab === 'editorial'
                  ? 'bg-primary/20 text-white border border-primary/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Editorial</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-grow overflow-y-auto pr-1 space-y-6 text-sm text-gray-300 leading-relaxed font-light">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Description</h3>
                  <div className="whitespace-pre-line leading-relaxed text-gray-200">
                    {problem.description}
                  </div>
                </div>

                {problem.inputFormat && (
                  <div>
                    <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">Input Format</h3>
                    <p className="text-xs text-gray-400 font-mono bg-background/50 p-2.5 rounded-lg border border-border/40">
                      {problem.inputFormat}
                    </p>
                  </div>
                )}

                {problem.outputFormat && (
                  <div>
                    <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">Output Format</h3>
                    <p className="text-xs text-gray-400 font-mono bg-background/50 p-2.5 rounded-lg border border-border/40">
                      {problem.outputFormat}
                    </p>
                  </div>
                )}

                {/* Sample Testcases */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Example Walkthrough</h3>
                  <div className="bg-background/80 border border-border/60 rounded-xl p-4 space-y-3">
                    <div>
                      <span className="text-xs text-gray-500 font-semibold block mb-1">Input:</span>
                      <pre className="bg-[#111] p-2.5 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto border border-border/40">
                        {problem.sampleInput}
                      </pre>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-semibold block mb-1">Expected Output:</span>
                      <pre className="bg-[#111] p-2.5 rounded-lg text-xs font-mono text-success overflow-x-auto border border-border/40">
                        {problem.sampleOutput}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Constraints</h3>
                  <div className="bg-background/50 border border-border/40 p-3.5 rounded-xl font-mono text-xs text-gray-400 whitespace-pre-line">
                    {problem.constraints}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Step-by-Step Hints</h3>
                {hints.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No hints available for this problem.</p>
                ) : (
                  hints.map((hint, idx) => {
                    const isRevealed = !!revealedHints[idx];
                    return (
                      <div key={idx} className="border border-border/60 rounded-xl overflow-hidden bg-background/60">
                        <button
                          onClick={() => toggleHint(idx)}
                          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/[0.02] transition"
                        >
                          <span className="text-xs font-bold text-white">Hint {idx + 1}</span>
                          {isRevealed ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        {isRevealed && (
                          <div className="p-3.5 pt-0 text-xs text-gray-300 border-t border-border/30 bg-white/[0.01]">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-primary text-xs font-bold">
                  <BookOpen className="h-4 w-4" />
                  <span>Canonical Algorithmic Editorial</span>
                </div>

                {editorial ? (
                  <div className="space-y-4 text-xs text-gray-300">
                    {/* Complexity Badges */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-background/80 border border-border/60 p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Time Complexity</span>
                        <span className="text-accent font-mono font-bold text-sm">
                          {editorial.timeComplexity || 'O(N)'}
                        </span>
                      </div>
                      <div className="bg-background/80 border border-border/60 p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Space Complexity</span>
                        <span className="text-success font-mono font-bold text-sm">
                          {editorial.spaceComplexity || 'O(1)'}
                        </span>
                      </div>
                    </div>

                    {/* Approach & Algorithm */}
                    {editorial.approach && (
                      <div>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider text-[11px]">Core Approach</h4>
                        <p className="bg-background/50 p-3 rounded-xl border border-border/40 leading-relaxed">
                          {editorial.approach}
                        </p>
                      </div>
                    )}

                    {editorial.algorithm && (
                      <div>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider text-[11px]">Algorithm Steps</h4>
                        <pre className="bg-background/50 p-3 rounded-xl border border-border/40 whitespace-pre-line font-mono text-[11px] text-gray-300 leading-relaxed">
                          {editorial.algorithm}
                        </pre>
                      </div>
                    )}

                    {/* Editorial Markdown Body */}
                    <div className="whitespace-pre-line leading-relaxed pt-2 border-t border-border/30">
                      {editorial.content}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">Editorial is being compiled by verified problem setters.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Code Editor & Execution Terminal */}
      <div className="lg:col-span-7 flex flex-col space-y-4 h-[78vh]">
        {/* Editor controls */}
        <div className="glass-panel p-3.5 rounded-xl border border-border/40 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-background border border-border/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 focus:outline-none"
            >
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript (Node.js)</option>
              <option value="typescript">TypeScript</option>
              <option value="cpp">C++ (GCC)</option>
              <option value="java">Java (OpenJDK)</option>
            </select>

            <select
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              className="bg-background border border-border/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 focus:outline-none"
            >
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunSubmit}
              disabled={submitMutation.isPending}
              className="px-4 py-2 bg-white text-background hover:bg-gray-100 font-bold rounded-lg text-xs flex items-center space-x-1.5 transition shadow"
            >
              {submitMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              <span>Submit Solution</span>
            </button>
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div className="flex-grow border border-border/40 rounded-2xl overflow-hidden bg-[#1e1e1e]">
          <Editor
            height="100%"
            language={language === 'c' || language === 'cpp' ? 'cpp' : language}
            value={code}
            theme={theme}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              fontFamily: "'Fira Code', monospace",
            }}
          />
        </div>

        {/* Execution Drawer / Results Bar */}
        {consoleOpen && (
          <div className="glass-panel border border-border/60 rounded-xl p-4 flex flex-col space-y-2 bg-[#0e0e0e] shadow-xl">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Judging Verdict</span>
              </div>
              <button
                onClick={() => setConsoleOpen(false)}
                className="text-xs text-gray-500 hover:text-white"
              >
                Close
              </button>
            </div>

            {execStatus && (
              <div className="flex items-center space-x-2 text-xs text-primary py-2 animate-pulse font-mono">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{execStatus}</span>
              </div>
            )}

            {execVerdict && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center space-x-1.5 ${
                      execVerdict === 'ACCEPTED'
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-danger/20 text-danger border border-danger/30'
                    }`}
                  >
                    {execVerdict === 'ACCEPTED' ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span>{execVerdict}</span>
                  </span>

                  {execTime !== null && (
                    <span className="text-xs text-gray-400 flex items-center space-x-1 font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{execTime}ms</span>
                    </span>
                  )}
                  {execMemory !== null && (
                    <span className="text-xs text-gray-400 flex items-center space-x-1 font-mono">
                      <Cpu className="h-3.5 w-3.5" />
                      <span>{execMemory}KB</span>
                    </span>
                  )}
                </div>

                {execError && (
                  <div className="bg-danger/10 border border-danger/20 p-3 rounded-lg text-xs font-mono text-danger whitespace-pre-wrap max-h-32 overflow-y-auto">
                    {execError}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
