'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import {
  ShieldAlert,
  Server,
  Cpu,
  Database,
  FileText,
  AlertCircle,
  Loader2,
  Users,
  Search,
  CheckCircle,
  Shield,
  Activity,
  Play,
  Check,
  XCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

interface SystemHealth {
  uptime: number;
  platform: string;
  arch: string;
  cpuCores: number;
  freeMemoryBytes: number;
  totalMemoryBytes: number;
  processMemory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
  loadAvg: number[];
}

interface AuditLog {
  id: string;
  action: string;
  createdAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  user?: {
    username: string;
    email: string;
  };
}

interface AdminUser {
  id: string;
  email: string;
  username: string;
  name: string | null;
  role: 'USER' | 'PROBLEM_SETTER' | 'CONTEST_MANAGER' | 'MODERATOR' | 'ADMIN';
  points: number;
  rating: number;
  isEmailVerified: boolean;
  createdAt: string;
  _count: {
    submissions: number;
    solvedProblems: number;
  };
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'overview' | 'problems' | 'users' | 'logs'>('overview');
  const [logsPage, setLogsPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [userSearch, setUserSearch] = useState('');
  const [problemSearch, setProblemSearch] = useState('');
  const [problemDifficultyFilter, setProblemDifficultyFilter] = useState('ALL');
  const [problemStatusFilter, setProblemStatusFilter] = useState('ALL');
  const [roleMessage, setRoleMessage] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyAllLoading, setVerifyAllLoading] = useState(false);
  const [verifyResults, setVerifyResults] = useState<any | null>(null);

  // Fetch admin metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: () => apiRequest('/admin/metrics'),
    enabled: user?.role === 'ADMIN',
  });

  // Fetch all problems for Admin Quality tab
  const { data: problemsData, isLoading: problemsLoading, refetch: refetchProblems } = useQuery({
    queryKey: ['admin-problems'],
    queryFn: () => apiRequest('/problems?limit=100'),
    enabled: user?.role === 'ADMIN' && activeTab === 'problems',
  });

  // Fetch system health metrics
  const { data: health, isLoading: healthLoading } = useQuery<SystemHealth>({
    queryKey: ['admin-health'],
    queryFn: () => apiRequest('/admin/health'),
    refetchInterval: 5000,
    enabled: user?.role === 'ADMIN' && activeTab === 'overview',
  });

  // Fetch audit logs
  const { data: logsData, isLoading: logsLoading } = useQuery<{ items: AuditLog[]; totalPages: number }>({
    queryKey: ['admin-logs', logsPage],
    queryFn: () => apiRequest(`/admin/logs?page=${logsPage}&limit=10`),
    enabled: user?.role === 'ADMIN' && (activeTab === 'overview' || activeTab === 'logs'),
  });

  // Fetch users list
  const { data: usersData, isLoading: usersLoading } = useQuery<{ items: AdminUser[]; totalPages: number; total: number }>({
    queryKey: ['admin-users', usersPage, userSearch],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('page', usersPage.toString());
      params.append('limit', '10');
      if (userSearch) params.append('search', userSearch);
      return apiRequest(`/admin/users?${params.toString()}`);
    },
    enabled: user?.role === 'ADMIN' && activeTab === 'users',
  });

  // Verify single problem
  const handleVerifyProblem = async (id: string) => {
    try {
      setVerifyingId(id);
      const res = await apiRequest(`/problems/${id}/verify`, { method: 'POST' });
      setRoleMessage(`Verification result for ${res.problemTitle || id}: ${res.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
      setTimeout(() => setRoleMessage(null), 4000);
      refetchProblems();
    } catch (err: any) {
      setRoleMessage(`Verification failed: ${err.message}`);
      setTimeout(() => setRoleMessage(null), 4000);
    } finally {
      setVerifyingId(null);
    }
  };

  // Verify all problems
  const handleVerifyAll = async () => {
    try {
      setVerifyAllLoading(true);
      const res = await apiRequest('/problems/verify-all', { method: 'POST' });
      setVerifyResults(res);
      setRoleMessage(`Verified all problems: ${res.passedCount}/${res.total} Passed (${res.failedCount} Failed)`);
      setTimeout(() => setRoleMessage(null), 5000);
      refetchProblems();
    } catch (err: any) {
      setRoleMessage(`Verification suite failed: ${err.message}`);
      setTimeout(() => setRoleMessage(null), 4000);
    } finally {
      setVerifyAllLoading(false);
    }
  };

  // Toggle publish
  const handleTogglePublish = async (id: string) => {
    try {
      const res = await apiRequest(`/problems/${id}/toggle-publish`, { method: 'PATCH' });
      setRoleMessage(`Updated "${res.title}" status to ${res.qualityStatus}`);
      setTimeout(() => setRoleMessage(null), 3000);
      refetchProblems();
    } catch (err: any) {
      setRoleMessage(`Status change failed: ${err.message}`);
      setTimeout(() => setRoleMessage(null), 4000);
    }
  };

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      apiRequest(`/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      }),
    onSuccess: (updated: any) => {
      setRoleMessage(`Successfully updated role for ${updated.username} to ${updated.role}`);
      setTimeout(() => setRoleMessage(null), 3000);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-logs'] });
    },
    onError: (err: any) => {
      setRoleMessage(`Failed to update role: ${err.message}`);
      setTimeout(() => setRoleMessage(null), 4000);
    },
  });

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.role !== 'ADMIN') {
    return (
      <div className="py-20 text-center text-danger flex flex-col items-center space-y-3">
        <ShieldAlert className="h-10 w-10 text-danger" />
        <p className="font-bold text-lg">Access Denied</p>
        <p className="text-sm text-gray-400">You must be a system administrator to access this area.</p>
      </div>
    );
  }

  const freeMemGb = health ? (health.freeMemoryBytes / (1024 * 1024 * 1024)).toFixed(2) : '0';
  const totalMemGb = health ? (health.totalMemoryBytes / (1024 * 1024 * 1024)).toFixed(2) : '0';
  const processHeapMb = health ? (health.processMemory.heapUsed / (1024 * 1024)).toFixed(2) : '0';

  const roleColors: Record<string, string> = {
    ADMIN: 'text-danger bg-danger/10 border-danger/30',
    PROBLEM_SETTER: 'text-accent bg-accent/10 border-accent/30',
    CONTEST_MANAGER: 'text-primary bg-primary/10 border-primary/30',
    MODERATOR: 'text-warning bg-warning/10 border-warning/30',
    USER: 'text-gray-300 bg-card border-border/40',
  };

  return (
    <div className="space-y-8 py-4">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-white">Admin Management Portal</h1>
          <p className="text-gray-400 text-sm">Monitor microservices metrics, problem quality verifiers, and user access controls</p>
        </div>
      </div>

      {roleMessage && (
        <div className="flex items-center space-x-2 bg-primary/10 border border-primary/30 text-primary text-xs p-3.5 rounded-xl shadow-lg animate-pulse">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{roleMessage}</span>
        </div>
      )}

      {/* Numerical Metrics Summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: metrics?.users ?? '-', icon: Users },
          { label: 'Problems Count', value: metrics?.problems ?? '-', icon: Database },
          { label: 'Submissions Solved', value: metrics?.submissions ?? '-', icon: Cpu },
          { label: 'Contest Matches', value: metrics?.contests ?? '-', icon: FileText },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-card p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-2xl font-bold font-poppins text-white">{item.value}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-white/5 border border-border/40 flex items-center justify-center text-gray-400">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-border/40 pb-px">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>System & Verdicts</span>
        </button>
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'problems' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Database className="h-4 w-4" />
          <span>Problem Quality & Verifier</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>User Management</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>Security Audit Trail</span>
        </button>
      </div>

      {/* Tab 1: System & Verdicts */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
              <h3 className="text-base font-semibold font-poppins text-white flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-primary" />
                <span>Infrastructure Health</span>
              </h3>

              {healthLoading ? (
                <div className="py-10 text-center text-gray-500 text-xs">Fetching stats...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="bg-card/45 p-3 rounded-lg border border-border/20">
                    <p className="text-gray-400">OS Platform</p>
                    <p className="text-sm text-white mt-0.5 uppercase">{health?.platform} ({health?.arch})</p>
                  </div>
                  <div className="bg-card/45 p-3 rounded-lg border border-border/20">
                    <p className="text-gray-400">CPU Cores</p>
                    <p className="text-sm text-white mt-0.5">{health?.cpuCores} Threads</p>
                  </div>
                  <div className="bg-card/45 p-3 rounded-lg border border-border/20">
                    <p className="text-gray-400">Physical Memory Usage</p>
                    <p className="text-sm text-white mt-0.5">{freeMemGb}GB / {totalMemGb}GB Free</p>
                  </div>
                  <div className="bg-card/45 p-3 rounded-lg border border-border/20">
                    <p className="text-gray-400">Process Node Heap</p>
                    <p className="text-sm text-accent mt-0.5">{processHeapMb}MB Used</p>
                  </div>
                </div>
              )}
            </div>

            {/* Verdict breakdown */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
              <h3 className="text-base font-semibold font-poppins text-white flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                <span>Submissions Verdict Breakdown</span>
              </h3>
              {metricsLoading ? (
                <div className="py-10 text-center text-gray-500 text-xs">Syncing logs...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold font-mono">
                  <div className="bg-success/5 border border-success/20 p-3 rounded-lg text-success">
                    ACCEPTED: {metrics?.verdictDistribution?.ACCEPTED ?? 0}
                  </div>
                  <div className="bg-danger/5 border border-danger/20 p-3 rounded-lg text-danger">
                    WRONG ANSWER: {metrics?.verdictDistribution?.WRONG_ANSWER ?? 0}
                  </div>
                  <div className="bg-warning/5 border border-warning/20 p-3 rounded-lg text-warning">
                    COMPILATION ERR: {metrics?.verdictDistribution?.COMPILATION_ERROR ?? 0}
                  </div>
                  <div className="bg-white/5 border border-border/25 p-3 rounded-lg text-gray-300">
                    RUNTIME ERR: {metrics?.verdictDistribution?.RUNTIME_ERROR ?? 0}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: Problem Quality & Verification Pipeline */}
      {activeTab === 'problems' && (
        <section className="glass-panel p-6 rounded-2xl border border-border/40 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-semibold font-poppins text-white flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Problem Quality Assurance & Verification Suite</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Automated regression testing against canonical reference solutions and all hidden boundary test cases.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleVerifyAll}
                disabled={verifyAllLoading}
                className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center space-x-2 transition shadow-lg shadow-primary/20 cursor-pointer"
              >
                {verifyAllLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying All Problems...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Run Verification Suite</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quality Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-card/40 border border-border/30 p-3.5 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Repository</span>
              <p className="text-lg font-bold text-white mt-0.5">{metrics?.problemQuality?.total ?? metrics?.problems ?? 0} Problems</p>
            </div>
            <div className="bg-success/5 border border-success/20 p-3.5 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-success tracking-wider">Verified Solutions</span>
              <p className="text-lg font-bold text-success mt-0.5">{metrics?.problemQuality?.verified ?? metrics?.problems ?? 0} Verified</p>
            </div>
            <div className="bg-accent/5 border border-accent/20 p-3.5 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-accent tracking-wider">Total Test Cases</span>
              <p className="text-lg font-bold text-accent mt-0.5">{metrics?.problemQuality?.totalTestCases ?? metrics?.totalTestCases ?? 0} Tests</p>
            </div>
            <div className="bg-warning/5 border border-warning/20 p-3.5 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-warning tracking-wider">Failed / Draft</span>
              <p className="text-lg font-bold text-warning mt-0.5">{metrics?.problemQuality?.failed ?? 0} Issues</p>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by problem title or slug..."
                value={problemSearch}
                onChange={(e) => setProblemSearch(e.target.value)}
                className="w-full bg-background border border-border/60 pl-9 pr-3 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-primary/80"
              />
            </div>
            <select
              value={problemDifficultyFilter}
              onChange={(e) => setProblemDifficultyFilter(e.target.value)}
              className="bg-background border border-border/60 px-3 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-primary"
            >
              <option value="ALL">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
            <select
              value={problemStatusFilter}
              onChange={(e) => setProblemStatusFilter(e.target.value)}
              className="bg-background border border-border/60 px-3 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-primary"
            >
              <option value="ALL">All Quality Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="VERIFIED">Verified Only</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>

          {verifyResults && (
            <div className="bg-card/60 border border-border/40 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-white">Verification Summary Report:</span>
                <span className="font-mono text-success">
                  {verifyResults.passedCount} Passed / {verifyResults.failedCount} Failed (Total: {verifyResults.total})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {verifyResults.results?.map((r: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded border text-xs flex justify-between items-center ${
                      r.passed
                        ? 'bg-success/5 border-success/20 text-success'
                        : 'bg-danger/5 border-danger/20 text-danger'
                    }`}
                  >
                    <span className="font-medium text-white truncate max-w-[200px]">{r.problemTitle}</span>
                    <span className="font-mono text-[11px] font-bold">
                      {r.passed ? `✅ PASS (${r.timeMs || 0}ms)` : `❌ FAIL: ${r.reason || 'Test Failed'}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {problemsLoading ? (
            <div className="py-12 flex justify-center items-center space-x-2 text-xs text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Loading canonical problem repository...</span>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-card/25 text-gray-400 font-semibold uppercase">
                    <th className="px-4 py-3">Problem Title</th>
                    <th className="px-4 py-3">Difficulty</th>
                    <th className="px-4 py-3 text-center">Testcases</th>
                    <th className="px-4 py-3 text-center">Quality Status</th>
                    <th className="px-4 py-3 text-center">Verified</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-gray-300">
                  {(Array.isArray(problemsData) ? problemsData : problemsData?.items || [])
                    .filter((p: any) => {
                      if (problemSearch && !p.title.toLowerCase().includes(problemSearch.toLowerCase()) && !p.slug.toLowerCase().includes(problemSearch.toLowerCase())) {
                        return false;
                      }
                      if (problemDifficultyFilter !== 'ALL' && p.difficulty !== problemDifficultyFilter) {
                        return false;
                      }
                      if (problemStatusFilter !== 'ALL' && p.qualityStatus !== problemStatusFilter) {
                        return false;
                      }
                      return true;
                    })
                    .map((p: any) => (
                    <tr key={p.id} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white">{p.title}</div>
                        <div className="text-[10px] text-gray-400 font-mono">/{p.slug}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.difficulty === 'EASY'
                              ? 'text-success bg-success/10'
                              : p.difficulty === 'MEDIUM'
                              ? 'text-warning bg-warning/10'
                              : 'text-danger bg-danger/10'
                          }`}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-gray-300">
                        {p._count?.testCases ?? 0}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                            p.qualityStatus === 'PUBLISHED'
                              ? 'text-primary bg-primary/10 border-primary/30'
                              : p.qualityStatus === 'VERIFIED'
                              ? 'text-accent bg-accent/10 border-accent/30'
                              : 'text-warning bg-warning/10 border-warning/30'
                          }`}
                        >
                          {p.qualityStatus || 'DRAFT'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.isVerified ? (
                          <span className="inline-flex items-center space-x-1 text-success font-semibold text-[11px]">
                            <Check className="h-3.5 w-3.5" />
                            <span>VERIFIED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-warning font-semibold text-[11px]">
                            <XCircle className="h-3.5 w-3.5" />
                            <span>UNVERIFIED</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleVerifyProblem(p.id)}
                          disabled={verifyingId === p.id}
                          className="px-2.5 py-1 bg-card hover:bg-white/10 border border-border/40 rounded text-xs text-gray-300 hover:text-white transition disabled:opacity-40 cursor-pointer inline-flex items-center space-x-1"
                        >
                          {verifyingId === p.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Play className="h-3 w-3 text-accent" />
                          )}
                          <span>Verify</span>
                        </button>
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          className="px-2.5 py-1 bg-card hover:bg-white/10 border border-border/40 rounded text-xs text-gray-300 hover:text-white transition cursor-pointer"
                        >
                          {p.qualityStatus === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Tab 3: User Management */}
      {activeTab === 'users' && (
        <section className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-base font-semibold font-poppins text-white flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>User Accounts Management</span>
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search username/email..."
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  setUsersPage(1);
                }}
                className="w-full bg-background border border-border/60 pl-9 pr-3 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-primary/80"
              />
            </div>
          </div>

          {usersLoading ? (
            <div className="py-12 flex justify-center items-center space-x-2 text-xs text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Loading user directory...</span>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-card/25 text-gray-400 font-semibold uppercase">
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 text-center">Score</th>
                    <th className="px-4 py-3 text-center">Solved</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3 text-right">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-gray-300">
                  {usersData?.items.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-semibold text-white">
                        {u.name ? `${u.name} (@${u.username})` : `@${u.username}`}
                      </td>
                      <td className="px-4 py-3 text-gray-400 font-mono">{u.email}</td>
                      <td className="px-4 py-3 text-center text-accent font-semibold font-mono">{u.points}</td>
                      <td className="px-4 py-3 text-center text-success font-semibold font-mono">{u._count.solvedProblems}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${roleColors[u.role] || 'text-gray-300'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <select
                          value={u.role}
                          onChange={(e) => updateRoleMutation.mutate({ userId: u.id, role: e.target.value })}
                          disabled={updateRoleMutation.isPending || u.id === user.id}
                          className="bg-background border border-border/60 px-2 py-1 rounded text-xs text-white focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50"
                        >
                          <option value="USER">USER</option>
                          <option value="PROBLEM_SETTER">PROBLEM_SETTER</option>
                          <option value="CONTEST_MANAGER">CONTEST_MANAGER</option>
                          <option value="MODERATOR">MODERATOR</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Pagination */}
          {usersData && usersData.totalPages > 1 && (
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                disabled={usersPage === 1}
                className="px-3 py-1 bg-card border border-border/40 rounded text-xs text-gray-400 hover:text-white disabled:opacity-30"
              >
                Prev
              </button>
              <span className="text-xs text-gray-400 px-2 flex items-center">
                Page {usersPage} of {usersData.totalPages}
              </span>
              <button
                onClick={() => setUsersPage((p) => Math.min(usersData.totalPages, p + 1))}
                disabled={usersPage === usersData.totalPages}
                className="px-3 py-1 bg-card border border-border/40 rounded text-xs text-gray-400 hover:text-white disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Audit Logs */}
      {activeTab === 'logs' && (
        <section className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
          <h3 className="text-base font-semibold font-poppins text-white flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-danger" />
            <span>Security Audit Trail logs</span>
          </h3>

          {logsLoading ? (
            <div className="py-8 text-center text-gray-500 text-xs flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Querying security logs...</span>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-card/25 text-gray-400 font-semibold uppercase">
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">User Account</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">Client Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-gray-300 font-mono">
                  {logsData?.items.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">
                        {log.action}
                      </td>
                      <td className="px-4 py-3">
                        {log.user ? `${log.user.username} (${log.user.email})` : 'System Event'}
                      </td>
                      <td className="px-4 py-3">
                        {log.ipAddress || 'Internal'}
                      </td>
                      <td className="px-4 py-3 max-w-[200px] truncate">
                        {log.userAgent || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Audit Log Pagination */}
          {logsData && logsData.totalPages > 1 && (
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setLogsPage((p) => Math.max(1, p - 1))}
                disabled={logsPage === 1}
                className="px-3 py-1 bg-card border border-border/40 rounded text-xs text-gray-400 hover:text-white disabled:opacity-30"
              >
                Prev
              </button>
              <span className="text-xs text-gray-400 px-2 flex items-center">
                Page {logsPage} of {logsData.totalPages}
              </span>
              <button
                onClick={() => setLogsPage((p) => Math.min(logsData.totalPages, p + 1))}
                disabled={logsPage === logsData.totalPages}
                className="px-3 py-1 bg-card border border-border/40 rounded text-xs text-gray-400 hover:text-white disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
