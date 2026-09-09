import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Save, Trash2, Upload, ImageOff, Star } from 'lucide-react';
import { supabase, type DbWork } from '@/lib/supabaseClient';
import { WORK_CATEGORIES } from '@/data/works';
import AdminLayout from '@/admin/AdminLayout';

const IMAGE_BUCKET = 'work-images';

const CATEGORY_OPTIONS = WORK_CATEGORIES.filter((c) => c !== 'All');

const STYLE_PRESETS = [
  {
    label: 'Emerald',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  {
    label: 'Lime',
    color: 'from-lime-500/20 to-green-500/10',
    accent: 'text-lime-400',
    border: 'hover:border-lime-500/30',
  },
  {
    label: 'Blue',
    color: 'from-blue-500/20 to-indigo-500/10',
    accent: 'text-blue-400',
    border: 'hover:border-blue-500/30',
  },
  {
    label: 'Cyan',
    color: 'from-cyan-500/20 to-sky-500/10',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
  },
  {
    label: 'Orange',
    color: 'from-orange-500/20 to-amber-500/10',
    accent: 'text-orange-400',
    border: 'hover:border-orange-500/30',
  },
  {
    label: 'Pink',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    border: 'hover:border-pink-500/30',
  },
  {
    label: 'Purple',
    color: 'from-purple-500/20 to-violet-500/10',
    accent: 'text-purple-400',
    border: 'hover:border-purple-500/30',
  },
  {
    label: 'Fuchsia',
    color: 'from-fuchsia-500/20 to-purple-500/10',
    accent: 'text-fuchsia-400',
    border: 'hover:border-fuchsia-500/30',
  },
];

const emptyForm = (): Partial<DbWork> => ({
  slug: '',
  title: '',
  category: 'Business',
  industry: '',
  url: '',
  domain: '',
  description: '',
  color: STYLE_PRESETS[2].color,
  accent: STYLE_PRESETS[2].accent,
  border: STYLE_PRESETS[2].border,
  tags: [],
  image_url: '',
  featured: false,
  sort_order: 0,
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export default function WorkAdmin() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Partial<DbWork>>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const list = useQuery({
    queryKey: ['admin_works'],
    queryFn: async () => {
      if (!supabase) return [] as DbWork[];
      const { data, error: qErr } = await supabase
        .from('works')
        .select('*')
        .order('sort_order', { ascending: true });
      if (qErr) throw qErr;
      return (data ?? []) as DbWork[];
    },
  });

  useEffect(() => {
    setImageBroken(false);
    if (selectedId === 'new') {
      setForm({ ...emptyForm(), sort_order: list.data?.length ?? 0 });
      return;
    }
    const row = list.data?.find((w) => w.id === selectedId);
    if (row) setForm({ ...row });
  }, [selectedId, list.data]);

  const normalizeImage = async (file: File): Promise<{ blob: Blob; ext: string; type: string }> => {
    if (file.type === 'image/svg+xml') return { blob: file, ext: 'svg', type: file.type };
    if (['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
      const ext = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
      return { blob: file, ext, type: file.type };
    }
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not convert image'))), 'image/png'),
    );
    return { blob, ext: 'png', type: 'image/png' };
  };

  const uploadImage = async (file: File) => {
    if (!supabase) {
      setError('Supabase is not configured');
      return;
    }
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const { blob, ext, type } = await normalizeImage(file);
      const path = `${(form.slug || 'work').trim() || 'work'}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(IMAGE_BUCKET)
        .upload(path, blob, { cacheControl: '3600', upsert: true, contentType: type });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      setImageBroken(false);
      setMessage('Image uploaded');
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Upload failed';
      if (/bucket not found/i.test(raw)) {
        setError(
          'Storage bucket "work-images" is missing. Run supabase/migrations/0005_works.sql in the Supabase SQL Editor, then try again.',
        );
      } else if (/row-level security|not authorized|violates.*policy/i.test(raw)) {
        setError(
          'Upload blocked by storage permissions. Add upload policies for the "work-images" bucket (see ADMIN_SETUP.md), then try again.',
        );
      } else {
        setError(raw);
      }
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!supabase || !form.title || !form.slug) {
      setError('Title and slug are required');
      return;
    }
    setSaving(true);
    setError(null);
    setMessage(null);

    const url = (form.url ?? '').trim();
    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      category: form.category ?? 'Business',
      industry: form.industry ?? '',
      url,
      domain: (form.domain ?? '').trim() || domainFromUrl(url),
      description: form.description ?? '',
      color: form.color ?? STYLE_PRESETS[2].color,
      accent: form.accent ?? STYLE_PRESETS[2].accent,
      border: form.border ?? STYLE_PRESETS[2].border,
      tags: form.tags ?? [],
      image_url: form.image_url ?? '',
      featured: Boolean(form.featured),
      sort_order: form.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    const { error: saveErr } =
      selectedId && selectedId !== 'new'
        ? await supabase.from('works').update(payload).eq('id', selectedId)
        : await supabase.from('works').insert(payload);

    setSaving(false);
    if (saveErr) {
      setError(saveErr.message);
      return;
    }
    setMessage(selectedId === 'new' ? 'Work created' : 'Work updated');
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ['admin_works'] });
    qc.invalidateQueries({ queryKey: ['works'] });
    qc.invalidateQueries({ queryKey: ['admin_dashboard_stats'] });
  };

  const remove = async () => {
    if (!supabase || !selectedId || selectedId === 'new') return;
    if (!confirm('Delete this work project? It will disappear from /work and the home portfolio.')) return;
    const { error: delErr } = await supabase.from('works').delete().eq('id', selectedId);
    if (delErr) {
      setError(delErr.message);
      return;
    }
    setMessage('Work deleted');
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ['admin_works'] });
    qc.invalidateQueries({ queryKey: ['works'] });
    qc.invalidateQueries({ queryKey: ['admin_dashboard_stats'] });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Our Work</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Create, edit, and delete portfolio projects. Upload a cover or leave blank to use a live site screenshot.
          </p>
        </div>
        <button
          onClick={() => setSelectedId('new')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" /> Add Work
        </button>
      </div>

      {(message || error) && (
        <div
          className={`mb-4 text-sm rounded-xl px-3 py-2 w-fit border ${
            error
              ? 'text-red-300 bg-red-500/10 border-red-500/20'
              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
          }`}
        >
          {error ?? message}
        </div>
      )}

      {list.isError && (
        <div className="mb-4 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
          Could not load works. Run <code className="text-amber-200">0005_works.sql</code> in Supabase SQL Editor.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-white/10">
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium">Home</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                </tr>
              </thead>
              <tbody>
                {(list.data ?? []).map((w) => (
                  <tr
                    key={w.id}
                    onClick={() => setSelectedId(w.id)}
                    className={`border-b border-white/5 cursor-pointer hover:bg-white/[0.03] ${
                      selectedId === w.id ? 'bg-primary/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{w.title}</div>
                      <div className="text-xs text-slate-500">{w.domain || w.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{w.category}</td>
                    <td className="px-4 py-3">
                      {w.featured ? (
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{w.sort_order}</td>
                  </tr>
                ))}
                {!list.isLoading && (list.data ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-slate-500 text-sm">
                      No work yet. Click Add Work to create your first project.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedId ? (
          <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 space-y-3 h-fit sticky top-24">
            <h2 className="font-semibold text-lg">{selectedId === 'new' ? 'New Work' : 'Edit Work'}</h2>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Title</label>
              <input
                value={form.title ?? ''}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: selectedId === 'new' && !f.slug ? slugify(title) : f.slug,
                  }));
                }}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Slug</label>
              <input
                value={form.slug ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Category</label>
                <select
                  value={form.category ?? 'Business'}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Industry</label>
                <input
                  value={form.industry ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                  className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Live URL</label>
              <input
                value={form.url ?? ''}
                onChange={(e) => {
                  const url = e.target.value;
                  setForm((f) => ({
                    ...f,
                    url,
                    domain: f.domain || domainFromUrl(url),
                  }));
                }}
                placeholder="https://example.com"
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Domain label</label>
              <input
                value={form.domain ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
                placeholder="example.com"
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>

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
              <label className="text-xs text-slate-500">Tags (one per line)</label>
              <textarea
                rows={3}
                value={(form.tags ?? []).join('\n')}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    tags: e.target.value
                      .split('\n')
                      .map((l) => l.trim())
                      .filter(Boolean),
                  }))
                }
                className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Color style</label>
              <div className="flex flex-wrap gap-2">
                {STYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        color: preset.color,
                        accent: preset.accent,
                        border: preset.border,
                      }))
                    }
                    className={`px-2.5 py-1 rounded-lg text-xs border cursor-pointer ${
                      form.color === preset.color
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500">Cover image (optional)</label>
              <div className="flex items-center gap-3">
                <div className="w-20 h-14 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                  {form.image_url && !imageBroken ? (
                    <img
                      src={form.image_url}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={() => setImageBroken(true)}
                    />
                  ) : (
                    <ImageOff className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadImage(file);
                      e.target.value = '';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 cursor-pointer disabled:opacity-60"
                  >
                    <Upload className="w-4 h-4" /> {uploading ? 'Uploading…' : 'Upload image'}
                  </button>
                  <input
                    value={form.image_url ?? ''}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, image_url: e.target.value }));
                      setImageBroken(false);
                    }}
                    placeholder="or paste image URL (blank = live screenshot)"
                    className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 py-1">
              <label className="text-sm text-slate-300 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(form.featured)}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="rounded border-white/20"
                />
                Show on home portfolio
              </label>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500">Order</label>
                <input
                  type="number"
                  value={form.sort_order ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                  className="w-20 bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>
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
                  aria-label="Delete work"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500 text-sm h-fit">
            Select a project or add a new one
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
