'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../../lib/api';
import Editor from '@monaco-editor/react';
import { useParams, useRouter } from 'next/navigation';
import { Play, Send, Sparkles, Loader2, RefreshCw, Terminal, Cpu, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export default function ProblemWorkspace() {
  const { slug } = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState<'description' | 'discussion'>('description');
  
  // AI assistant states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

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
      const templates = problem.codeTemplates as Record<string, string>;
      if (templates && templates[language]) {
        setCode(templates[language]);
      } else {
        // Defaults
        const defaults: Record<string, string> = {
          python: `def solve():\n    # Write code here\n    pass\n`,
          javascript: `function solve() {\n    // Write code here\n}\n`,
          cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write code here\n    return 0;\n}\n`,
          java: `public class Solution {\n    public static void main(String[] args) {\n        // Write code here\n    }\n}\n`,
        };
        setCode(defaults[language] || '// Write code here\n');
      }
    }
  }, [problem, language]);

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: (body: { problemId: string; code: string; language: string }) =>
      apiRequest('/submissions', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => {
      // Start polling status
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
    });
  };

  const pollSubmissionStatus = (id: string) => {
    setExecStatus('Executing solution...');
    const interval = setInterval(async () => {
      try {
        const sub = await apiRequest(`/submissions/${id}`);
        if (sub.verdict !== 'QUEUED' && sub.verdict !== 'RUNNING') {
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
    }, 1500);
  };

  // AI mutation
  const handleAICall = async (endpoint: 'review' | 'complexity' | 'optimize') => {
    setAiLoading(true);
    setAiFeedback(null);
    try {
      const response = await apiRequest(`/ai/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify({ code, language }),
      });
      setAiFeedback(response.feedback);
    } catch (err: any) {
      setAiFeedback(`Failed to connect to AI assistant: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-2 min-h-[85vh]">
      {/* Left Column: Problem statement details */}
      <div className="lg:col-span-5 flex flex-col space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-border/40 flex-grow flex flex-col h-[75vh] overflow-y-auto">
          {/* Header */}
          <div className="border-b border-border/40 pb-4 mb-4">
            <h1 className="text-2xl font-poppins font-extrabold text-white">{problem.title}</h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase ${
                problem.difficulty === 'EASY' ? 'text-success bg-success/15' :
                problem.difficulty === 'MEDIUM' ? 'text-warning bg-warning/15' : 'text-danger bg-danger/15'
              }`}>
                {problem.difficulty}
              </span>
              <span className="text-xs text-accent font-semibold">{problem.points} Points</span>
              <span className="text-xs text-gray-400">Limits: {problem.timeLimit}ms / {problem.memoryLimit}MB</span>
            </div>
          </div>

          {/* Description Content */}
          <div className="flex-grow space-y-6 text-sm text-gray-300 leading-relaxed font-light whitespace-pre-line">
            <div>
              <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Description</h3>
              <p className="font-poppins">{problem.description}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">Constraints</h3>
              <p className="font-mono bg-background/50 border border-border/40 p-3 rounded-lg text-gray-400">
                {problem.constraints}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1.5">Sample Input</h4>
                <pre className="bg-background/80 border border-border/60 p-3 rounded-lg font-mono text-xs text-white overflow-x-auto">
                  {problem.sampleInput}
                </pre>
              </div>
              <div>
                <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1.5">Sample Output</h4>
                <pre className="bg-background/80 border border-border/60 p-3 rounded-lg font-mono text-xs text-white overflow-x-auto">
                  {problem.sampleOutput}
                </pre>
              </div>
            </div>
          </div>

          {/* AI Panel Tray */}
          <div className="mt-8 pt-4 border-t border-border/40 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">AI Code Assistant</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAICall('review')}
                disabled={aiLoading}
                className="px-3 py-1.5 bg-primary/10 border border-primary/25 hover:bg-primary/20 text-xs font-semibold rounded-lg text-white transition flex items-center space-x-1"
              >
                <span>Code Review</span>
              </button>
              <button
                onClick={() => handleAICall('complexity')}
                disabled={aiLoading}
                className="px-3 py-1.5 bg-accent/10 border border-accent/25 hover:bg-accent/20 text-xs font-semibold rounded-lg text-white transition flex items-center space-x-1"
              >
                <span>Explain Complexity</span>
              </button>
              <button
                onClick={() => handleAICall('optimize')}
                disabled={aiLoading}
                className="px-3 py-1.5 bg-success/10 border border-success/25 hover:bg-success/20 text-xs font-semibold rounded-lg text-white transition flex items-center space-x-1"
              >
                <span>Optimize Code</span>
              </button>
            </div>

            {aiLoading && (
              <div className="flex items-center space-x-2 text-xs text-gray-400 py-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span>Thinking...</span>
              </div>
            )}

            {aiFeedback && (
              <div className="bg-background/50 border border-border/60 p-4 rounded-xl text-xs text-gray-300 overflow-x-auto whitespace-pre-line font-mono max-h-48 overflow-y-auto">
                {aiFeedback}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Code Editor & Terminal */}
      <div className="lg:col-span-7 flex flex-col space-y-4 h-[75vh]">
        {/* Editor controls */}
        <div className="glass-panel p-3.5 rounded-xl border border-border/40 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-background border border-border/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 focus:outline-none"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="cpp">C++ (GCC)</option>
              <option value="java">Java</option>
            </select>

            <select
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
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
            language={language === 'cpp' ? 'cpp' : language}
            theme={theme}
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              fontSize: fontSize,
              minimap: { enabled: false },
              automaticLayout: true,
              tabSize: 4,
              cursorBlinking: 'smooth',
            }}
          />
        </div>

        {/* Terminal/Console drawer */}
        {consoleOpen && (
          <div className="glass-panel border border-border/60 rounded-xl overflow-hidden shadow-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <div className="flex items-center space-x-1.5 text-xs text-gray-300 font-semibold uppercase">
                <Terminal className="h-4 w-4 text-primary" />
                <span>Console Terminal</span>
              </div>
              <button
                onClick={() => setConsoleOpen(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Hide
              </button>
            </div>

            {/* Execution logs */}
            <div className="space-y-2 text-xs font-mono">
              {execStatus && (
                <div className="flex items-center space-x-2 text-gray-400 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>{execStatus}</span>
                </div>
              )}

              {execVerdict && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {execVerdict === 'ACCEPTED' ? (
                      <span className="flex items-center space-x-1 px-2.5 py-1 bg-success/15 border border-success/30 rounded text-success font-bold text-xs uppercase">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Accepted</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 px-2.5 py-1 bg-danger/15 border border-danger/30 rounded text-danger font-bold text-xs uppercase">
                        <XCircle className="h-4 w-4" />
                        <span>{execVerdict}</span>
                      </span>
                    )}

                    {execTime !== null && (
                      <span className="flex items-center space-x-1 text-gray-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{execTime}ms</span>
                      </span>
                    )}

                    {execMemory !== null && (
                      <span className="flex items-center space-x-1 text-gray-400">
                        <Cpu className="h-3.5 w-3.5" />
                        <span>{(execMemory / 1024).toFixed(2)}MB</span>
                      </span>
                    )}
                  </div>

                  {execError && (
                    <div className="bg-red-950/30 border border-danger/20 p-3 rounded-lg text-danger max-h-40 overflow-y-auto whitespace-pre-wrap">
                      {execError}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
