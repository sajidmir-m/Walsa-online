import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Save, Trash2 } from 'lucide-react';
import { supabase, type DbMarketingService } from '@/lib/supabaseClient';
import AdminLayout from '@/admin/AdminLayout';

const emptyForm = (): Partial<DbMarketingService> => ({
  slug: '',
  title: '',
  short_title: '',
  tagline: '',
  description: '',
  items: [],
  icon_name: 'Share2',
  accent: 'purple',
  sort_order: 0,
});

const ICON_OPTIONS = [
  'Share2',
  'Video',
  'Palette',
  'Sparkles',
  'MapPin',
  'Search',
  'Target',
  'Crosshair',
  'LineChart',
];

export default function MarketingServicesAdmin() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Partial<DbMarketingService>>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const list = useQuery({
    queryKey: ['admin_marketing'],
    queryFn: async () => {
      if (!supabase) return [] as DbMarketingService[];
      const { data, error } = await supabase
        .from('marketing_services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data ?? []) as DbMarketingService[];
    },
  });

  useEffect(() => {
    if (selectedId === 'new') {
      setForm({ ...emptyForm(), sort_order: list.data?.length ?? 0 });
      return;
    }
    const row = list.data?.find((s) => s.id === selectedId);
    if (row) setForm({ ...row });
  }, [selectedId, list.data]);

  const save = async () => {
    if (!supabase || !form.title || !form.slug) {
      setMessage('Title and slug are required');
      return;
    }
    setSaving(true);
    setMessage(null);
    const payload = {
      slug: form.slug,
      title: form.title,
      short_title: form.short_title ?? form.title,
      tagline: form.tagline ?? '',
      description: form.description ?? '',
      items: form.items ?? [],
      icon_name: form.icon_name ?? 'Share2',
      accent: form.accent ?? 'purple',
      sort_order: form.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    const { error } =
      selectedId && selectedId !== 'new'
        ? await supabase.from('marketing_services').update(payload).eq('id', selectedId)
        : await supabase.from('marketing_services').insert(payload);

    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Saved');
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ['admin_marketing'] });
    qc.invalidateQueries({ queryKey: ['marketing_services'] });
    qc.invalidateQueries({ queryKey: ['admin_dashboard_stats'] });
  };

  const remove = async () => {
    if (!supabase || !selectedId || selectedId === 'new') return;
    if (!confirm('Delete this marketing service?')) return;
    await supabase.from('marketing_services').delete().eq('id', selectedId);
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ['admin_marketing'] });
    qc.invalidateQueries({ queryKey: ['marketing_services'] });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Marketing Services</h1>
          <p className="text-slate-400 mt-1 text-sm">Digital marketing offerings shown on the site</p>
        </div>
        <button
          onClick={() => setSelectedId('new')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {message && (
        <div className="mb-4 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 w-fit">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/10">
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Accent</th>
                <th className="px-4 py-3 font-medium">Order</th>
              </tr>
            </thead>
            <tbody>
              {(list.data ?? []).map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`border-b border-white/5 cursor-pointer hover:bg-white/[0.03] ${
                    selectedId === s.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{s.title}</div>
                    <div className="text-xs text-slate-500">{s.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{s.accent}</td>
                  <td className="px-4 py-3 text-slate-500">{s.sort_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {selectedId ? (
          <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 space-y-3 h-fit sticky top-24">
            <h2 className="font-semibold text-lg">
              {selectedId === 'new' ? 'New Service' : 'Edit Service'}
            </h2>
            {(
              [
                ['title', 'Title'],
                ['slug', 'Slug'],
                ['short_title', 'Short title'],
                ['tagline', 'Tagline'],
                ['accent', 'Accent color key'],
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
              <label className="text-xs text-slate-500">Icon</label>
              <select
                value={form.icon_name ?? 'Share2'}
                onChange={(e) => setForm((f) => ({ ...f, icon_name: e.target.value }))}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Description</label>
              <textarea
                rows={3}
                value={form.description ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-500">Included items (one per line)</label>
              <textarea
                rows={6}
                value={(form.items ?? []).join('\n')}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    items: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean),
                  }))
                }
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
            Select a service or add a new one
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
