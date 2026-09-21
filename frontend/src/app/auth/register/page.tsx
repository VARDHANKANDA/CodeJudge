'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../../lib/api';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
        skipAuth: true,
      });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Try a different username/email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-border/80 relative shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-poppins font-extrabold text-white">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the CodeJudge competitive coding arena</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center space-x-2 bg-danger/10 border border-danger/30 text-danger text-sm px-4 py-3 rounded-lg">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center space-x-2 bg-success/10 border border-success/30 text-success text-sm px-4 py-3 rounded-lg animate-bounce">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Ram Kumar"
              className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/80 transition text-white"
            />
            {errors.name && (
              <span className="text-xs text-danger font-medium mt-1 block">{errors.name.message}</span>
            )}
          </div>

          {/* Username input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Username</label>
            <input
              type="text"
              {...register('username')}
              placeholder="coder_ram"
              className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/80 transition text-white"
            />
            {errors.username && (
              <span className="text-xs text-danger font-medium mt-1 block">{errors.username.message}</span>
            )}
          </div>

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
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/80 transition text-white"
            />
            {errors.password && (
              <span className="text-xs text-danger font-medium mt-1 block">{errors.password.message}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white gradient-btn flex items-center justify-center space-x-2 transition mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registering Account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
