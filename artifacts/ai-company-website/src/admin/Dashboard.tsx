import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Inbox, FileText, Users, Megaphone, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import AdminLayout from '@/admin/AdminLayout';

export default function Dashboard() {
  const stats = useQuery({
    queryKey: ['admin_dashboard_stats'],
    queryFn: async () => {
      if (!supabase) return { newQueries: 0, totalQueries: 0, pages: 0, clients: 0, marketing: 0 };

      const [newQ, allQ, pages, clients, marketing] = await Promise.all([
        supabase.from('queries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('queries').select('id', { count: 'exact', head: true }),
        supabase.from('pages').select('slug', { count: 'exact', head: true }),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('marketing_services').select('id', { count: 'exact', head: true }),
      ]);

      return {
        newQueries: newQ.count ?? 0,
        totalQueries: allQ.count ?? 0,
        pages: pages.count ?? 0,
        clients: clients.count ?? 0,
        marketing: marketing.count ?? 0,
      };
    },
  });

  const recent = useQuery({
    queryKey: ['admin_recent_queries'],
    queryFn: async () => {
      if (!supabase) return [];
      const { data } = await supabase
        .from('queries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const s = stats.data;

  const cards = [
    { label: 'New Queries', value: s?.newQueries ?? '—', href: '/admin/queries', icon: Inbox, accent: 'text-emerald-400' },
    { label: 'Total Queries', value: s?.totalQueries ?? '—', href: '/admin/queries', icon: Inbox, accent: 'text-primary' },
    { label: 'Pages', value: s?.pages ?? '—', href: '/admin/pages', icon: FileText, accent: 'text-violet-400' },
    { label: 'Clients', value: s?.clients ?? '—', href: '/admin/clients', icon: Users, accent: 'text-cyan-400' },
    { label: 'Marketing Services', value: s?.marketing ?? '—', href: '/admin/marketing', icon: Megaphone, accent: 'text-fuchsia-400' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Overview of leads and site content</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-white/10 bg-[#050816] p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${card.accent}`} />
              </div>
              <div className="text-2xl font-bold font-display text-white">{card.value}</div>
              <div className="text-xs text-slate-500 mt-1">{card.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-semibold">Recent Queries</h2>
          <Link href="/admin/queries" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {(recent.data ?? []).length === 0 && (
            <div className="px-5 py-10 text-center text-slate-500 text-sm">
              No queries yet. Submissions from the contact form will appear here and on WhatsApp.
            </div>
          )}
          {(recent.data ?? []).map((q) => (
            <div key={q.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{q.name}</div>
                <div className="text-xs text-slate-500 truncate">{q.email} · {q.service_interest || 'General'}</div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full border w-fit ${
                  q.status === 'new'
                    ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                    : q.status === 'contacted'
                      ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                      : 'border-slate-500/30 text-slate-400 bg-slate-500/10'
                }`}
              >
                {q.status}
              </span>
              <div className="text-xs text-slate-500 shrink-0">
                {new Date(q.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
