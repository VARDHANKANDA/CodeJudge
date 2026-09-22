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

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'logs'>('overview');
  const [logsPage, setLogsPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [userSearch, setUserSearch] = useState('');
  const [roleMessage, setRoleMessage] = useState<string | null>(null);

  // Fetch admin metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: () => apiRequest('/admin/metrics'),
    enabled: user?.role === 'ADMIN',
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

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      apiRequest(`/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      }),
    onSuccess: (updated) => {
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
          <p className="text-gray-400 text-sm">Monitor microservices metrics, server execution queues, and platform users</p>
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

      {/* Tab 2: User Management */}
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
