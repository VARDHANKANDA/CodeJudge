'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { AlertCircle, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Simulate/request password recovery initiation
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess('If an account exists with this email, a password reset link has been dispatched.');
    } catch (err: any) {
      setError(err.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-border/80 relative shadow-2xl space-y-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sign In</span>
        </Link>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-poppins font-extrabold text-white">Reset Password</h1>
          <p className="text-gray-400 text-xs">Enter your verified email address to receive reset instructions</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 bg-danger/10 border border-danger/30 text-danger text-xs p-3 rounded-lg">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-2 bg-success/10 border border-success/30 text-success text-xs p-3 rounded-lg">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white gradient-btn flex items-center justify-center space-x-2 transition"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <span>Send Instructions</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
