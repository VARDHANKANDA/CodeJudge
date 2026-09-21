'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/auth';
import { LogOut, User, LayoutDashboard, Award, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavbarClient() {
  const { user, clearAuth, isAuthenticated } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    setDropdownOpen(false);
    router.push('/auth/login');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-3">
        <Link
          href="/auth/login"
          className="text-sm font-semibold text-gray-300 hover:text-white px-4 py-2 hover:bg-white/5 rounded-lg transition"
        >
          Sign In
        </Link>
        <Link
          href="/auth/register"
          className="text-sm font-semibold text-white px-4 py-2 gradient-btn rounded-lg shadow-md transition"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const userInitials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : user.username.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center space-x-6 relative">
      {/* User points display */}
      <div className="flex items-center space-x-1.5 bg-card/60 border border-border/60 px-3 py-1.5 rounded-full text-xs font-medium">
        <Award className="h-4 w-4 text-accent" />
        <span className="text-gray-300 font-semibold">{user.points} pts</span>
      </div>

      {/* Avatar dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-accent p-[1.5px] focus:outline-none hover:opacity-90 transition"
        >
          <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-xs font-bold text-white uppercase">
            {userInitials}
          </div>
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop cover to close dropdown click away */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setDropdownOpen(false)}
            />

            <div className="absolute right-0 mt-3 w-56 rounded-xl glass-panel shadow-2xl z-20 border border-border/80 overflow-hidden divide-y divide-border/40 py-1">
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-white truncate">{user.name || user.username}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                <p className="text-[10px] mt-1 inline-block bg-primary/20 text-primary border border-primary/25 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                  {user.role}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>My Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-primary hover:text-primary hover:bg-white/5 transition font-medium"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}
              </div>

              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
