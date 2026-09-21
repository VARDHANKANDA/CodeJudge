'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/auth';
import { apiRequest } from '../../../lib/api';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        skipAuth: true,
      });
      setAuth(data.user, data.accessToken, data.refreshToken);
      router.push('/problems');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-border/80 relative shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-poppins font-extrabold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access the arena</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center space-x-2 bg-danger/10 border border-danger/30 text-danger text-sm px-4 py-3 rounded-lg">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              {...register('email')}
              placeholder="ram@codejudge.com"
              className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/80 transition text-white"
            />
            {errors.email && (
              <span className="text-xs text-danger font-medium mt-1 block">{errors.email.message}</span>
            )}
          </div>

          {/* Password input */}
          <div className="space-y-1 relative">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className="w-full bg-background border border-border/60 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-primary/80 transition text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-danger font-medium mt-1 block">{errors.password.message}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white gradient-btn flex items-center justify-center space-x-2 transition"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Logging In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-primary hover:underline font-semibold">
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}
