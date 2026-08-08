import React from 'react';
import { Redirect } from 'wouter';
import { useAdminAuth } from '@/admin/AuthContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm">Loading admin…</span>
        </div>
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6">
        <div className="max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-amber-100">
          <h1 className="text-xl font-bold mb-3">Supabase not configured</h1>
          <p className="text-sm text-amber-100/80 leading-relaxed mb-4">
            Copy <code className="text-amber-200">.env.example</code> to{' '}
            <code className="text-amber-200">.env.local</code>, fill in your Project URL and anon key,
            then restart the dev server. See <code className="text-amber-200">ADMIN_SETUP.md</code>.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/admin/login" />;
  }

  return <>{children}</>;
}
