import React, { useState } from 'react';
import { Redirect, useLocation } from 'wouter';
import { useAdminAuth } from '@/admin/AuthContext';

export default function Login() {
  const { user, loading, configured, signIn } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Redirect to="/admin" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setLocation('/admin');
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="WALSA ONLINE" className="h-16 w-auto mx-auto rounded-md mb-4" />
          <h1 className="text-2xl font-bold font-display text-white">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-2">Sign in to manage content &amp; queries</p>
        </div>

        {!configured && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Supabase env vars are missing. Follow <code>ADMIN_SETUP.md</code> first.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#08111F] p-8 space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
              placeholder="admin@walsaonline.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !configured}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
