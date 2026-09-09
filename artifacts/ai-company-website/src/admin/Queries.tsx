import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageCircle, Trash2 } from 'lucide-react';
import { supabase, type DbQuery, type QueryStatus } from '@/lib/supabaseClient';
import AdminLayout from '@/admin/AdminLayout';

export default function Queries() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<'all' | QueryStatus>('all');
  const [selected, setSelected] = useState<DbQuery | null>(null);
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ['admin_queries', filter],
    queryFn: async () => {
      if (!supabase) return [] as DbQuery[];
      let q = supabase.from('queries').select('*').order('created_at', { ascending: false });
      if (filter !== 'all') q = q.eq('status', filter);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as DbQuery[];
    },
  });

  const updateStatus = async (id: string, status: QueryStatus) => {
    if (!supabase) return;
    setBusy(true);
    await supabase.from('queries').update({ status }).eq('id', id);
    setBusy(false);
    qc.invalidateQueries({ queryKey: ['admin_queries'] });
    qc.invalidateQueries({ queryKey: ['admin_dashboard_stats'] });
    qc.invalidateQueries({ queryKey: ['admin_recent_queries'] });
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const remove = async (id: string) => {
    if (!supabase || !confirm('Delete this query permanently?')) return;
    setBusy(true);
    await supabase.from('queries').delete().eq('id', id);
    setBusy(false);
    setSelected(null);
    qc.invalidateQueries({ queryKey: ['admin_queries'] });
    qc.invalidateQueries({ queryKey: ['admin_dashboard_stats'] });
  };

  const waLink = (q: DbQuery) => {
    const phone = (q.phone || '').replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hi ${q.name}, thanks for contacting Kasshit regarding ${q.service_interest || 'your project'}.`,
    );
    return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Queries</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Every contact-form lead — also sent to WhatsApp automatically
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'contacted', 'closed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer ${
                filter === f
                  ? 'bg-primary/20 border-primary/40 text-primary'
                  : 'bg-transparent border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-white/10">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">When</th>
                </tr>
              </thead>
              <tbody>
                {(list.data ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                      No queries found.
                    </td>
                  </tr>
                )}
                {(list.data ?? []).map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => setSelected(q)}
                    className={`border-b border-white/5 cursor-pointer hover:bg-white/[0.03] ${
                      selected?.id === q.id ? 'bg-primary/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{q.name}</div>
                      <div className="text-xs text-slate-500">{q.email}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 hidden md:table-cell">
                      {q.service_interest || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          q.status === 'new'
                            ? 'border-emerald-500/30 text-emerald-400'
                            : q.status === 'contacted'
                              ? 'border-amber-500/30 text-amber-400'
                              : 'border-slate-500/30 text-slate-400'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs hidden sm:table-cell whitespace-nowrap">
                      {new Date(q.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 h-fit sticky top-24">
          {!selected ? (
            <p className="text-slate-500 text-sm text-center py-10">Select a query to view details</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">
                  {selected.email}
                </a>
                {selected.phone && (
                  <div className="text-sm text-slate-400 mt-1">{selected.phone}</div>
                )}
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <div>Service: {selected.service_interest || '—'}</div>
                <div>Source: {selected.source_page || '—'}</div>
                <div>{new Date(selected.created_at).toLocaleString()}</div>
              </div>

              <div className="rounded-xl bg-[#08111F] border border-white/5 p-4 text-sm text-slate-300 whitespace-pre-wrap">
                {selected.message}
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-500">Status</label>
                <select
                  disabled={busy}
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value as QueryStatus)}
                  className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                >
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="closed">closed</option>
                </select>
              </div>

              <a
                href={waLink(selected)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/25 hover:bg-[#25D366]/25 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" /> Reply on WhatsApp
              </a>

              <button
                disabled={busy}
                onClick={() => remove(selected.id)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 text-sm cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
