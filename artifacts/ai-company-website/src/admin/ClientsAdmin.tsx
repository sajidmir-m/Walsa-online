import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Save, Trash2 } from 'lucide-react';
import { supabase, type DbClient } from '@/lib/supabaseClient';
import AdminLayout from '@/admin/AdminLayout';

const emptyForm = (): Partial<DbClient> => ({
  slug: '',
  name: '',
  industry: '',
  color: 'from-blue-500 to-indigo-500',
  logo_initials: '',
  logo_url: '',
  summary: '',
  services: [],
  results: [],
  description: '',
  sort_order: 0,
});

export default function ClientsAdmin() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Partial<DbClient>>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const list = useQuery({
    queryKey: ['admin_clients'],
    queryFn: async () => {
      if (!supabase) return [] as DbClient[];
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data ?? []) as DbClient[];
    },
  });

  useEffect(() => {
    if (selectedId === 'new') {
      setForm({ ...emptyForm(), sort_order: (list.data?.length ?? 0) });
      return;
    }
    const row = list.data?.find((c) => c.id === selectedId);
    if (row) setForm({ ...row });
  }, [selectedId, list.data]);

  const save = async () => {
    if (!supabase || !form.name || !form.slug) {
      setMessage('Name and slug are required');
      return;
    }
    setSaving(true);
    setMessage(null);
    const payload = {
      slug: form.slug,
      name: form.name,
      industry: form.industry ?? '',
      color: form.color ?? 'from-blue-500 to-indigo-500',
      logo_initials: form.logo_initials ?? '',
      logo_url: form.logo_url ?? '',
      summary: form.summary ?? '',
      services: form.services ?? [],
      results: form.results ?? [],
      description: form.description ?? '',
      sort_order: form.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    const { error } =
      selectedId && selectedId !== 'new'
        ? await supabase.from('clients').update(payload).eq('id', selectedId)
        : await supabase.from('clients').insert(payload);

    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Saved');
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ['admin_clients'] });
    qc.invalidateQueries({ queryKey: ['clients'] });
    qc.invalidateQueries({ queryKey: ['admin_dashboard_stats'] });
  };

  const remove = async () => {
    if (!supabase || !selectedId || selectedId === 'new') return;
    if (!confirm('Delete this client?')) return;
    await supabase.from('clients').delete().eq('id', selectedId);
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ['admin_clients'] });
    qc.invalidateQueries({ queryKey: ['clients'] });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Clients</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage logos, case studies, and results</p>
        </div>
        <button
          onClick={() => setSelectedId('new')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {message && (
        <div className="mb-4 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 w-fit">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/10">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Industry</th>
                <th className="px-4 py-3 font-medium">Order</th>
              </tr>
            </thead>
            <tbody>
              {(list.data ?? []).map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`border-b border-white/5 cursor-pointer hover:bg-white/[0.03] ${
                    selectedId === c.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{c.industry}</td>
                  <td className="px-4 py-3 text-slate-500">{c.sort_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedId ? (
          <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 space-y-3 h-fit sticky top-24">
            <h2 className="font-semibold text-lg">{selectedId === 'new' ? 'New Client' : 'Edit Client'}</h2>
            {(
              [
                ['name', 'Name'],
                ['slug', 'Slug'],
                ['industry', 'Industry'],
                ['logo_initials', 'Logo initials'],
                ['logo_url', 'Logo URL'],
                ['color', 'Gradient color classes'],
                ['summary', 'Summary'],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <label className="text-xs text-slate-500">{label}</label>
                <input
                  value={String(form[key] ?? '')}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Description</label>
              <textarea
                rows={4}
                value={form.description ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-y"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Services (one per line)</label>
              <textarea
                rows={3}
                value={(form.services ?? []).join('\n')}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    services: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean),
                  }))
                }
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Results JSON</label>
              <textarea
                rows={4}
                value={JSON.stringify(form.results ?? [], null, 2)}
                onChange={(e) => {
                  try {
                    setForm((f) => ({ ...f, results: JSON.parse(e.target.value) }));
                  } catch {
                    /* typing */
                  }
                }}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Sort order</label>
              <input
                type="number"
                value={form.sort_order ?? 0}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-sm font-medium cursor-pointer border-none disabled:opacity-60"
              >
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}
              </button>
              {selectedId !== 'new' && (
                <button
                  onClick={remove}
                  className="px-3 rounded-xl bg-red-500/10 text-red-300 border border-red-500/20 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500 text-sm h-fit">
            Select a client or add a new one
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
