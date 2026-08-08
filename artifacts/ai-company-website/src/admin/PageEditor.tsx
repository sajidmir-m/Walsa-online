import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import { supabase, type DbPageSection } from '@/lib/supabaseClient';
import AdminLayout from '@/admin/AdminLayout';

function FieldEditor({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {fieldKey}
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs text-slate-500 uppercase tracking-wide">{fieldKey}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
        />
      </div>
    );
  }

  if (Array.isArray(value)) {
    const isStringArray = value.every((v) => typeof v === 'string');
    if (isStringArray) {
      return (
        <div className="space-y-1.5">
          <label className="text-xs text-slate-500 uppercase tracking-wide">
            {fieldKey} <span className="text-slate-600">(one item per line)</span>
          </label>
          <textarea
            rows={Math.min(12, Math.max(3, value.length + 1))}
            value={(value as string[]).join('\n')}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split('\n')
                  .map((l) => l.trimEnd())
                  .filter((l, i, arr) => !(i === arr.length - 1 && l === '')),
              )
            }
            className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono resize-y"
          />
        </div>
      );
    }

    return (
      <div className="space-y-1.5">
        <label className="text-xs text-slate-500 uppercase tracking-wide">
          {fieldKey} <span className="text-slate-600">(JSON array)</span>
        </label>
        <textarea
          rows={8}
          value={JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch {
              /* keep typing */
            }
          }}
          className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono resize-y"
        />
      </div>
    );
  }

  if (value !== null && typeof value === 'object') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs text-slate-500 uppercase tracking-wide">
          {fieldKey} <span className="text-slate-600">(JSON object)</span>
        </label>
        <textarea
          rows={8}
          value={JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch {
              /* keep typing */
            }
          }}
          className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono resize-y"
        />
      </div>
    );
  }

  const str = String(value ?? '');
  const long = str.length > 80 || fieldKey.includes('body') || fieldKey.includes('subheadline') || fieldKey.includes('description');

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-slate-500 uppercase tracking-wide">{fieldKey}</label>
      {long ? (
        <textarea
          rows={4}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm resize-y"
        />
      ) : (
        <input
          type="text"
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
        />
      )}
    </div>
  );
}

export default function PageEditor() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';
  const qc = useQueryClient();
  const [drafts, setDrafts] = useState<Record<string, Record<string, unknown>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');

  const page = useQuery({
    queryKey: ['admin_page', slug],
    queryFn: async () => {
      if (!supabase) return null;
      const { data } = await supabase.from('pages').select('*').eq('slug', slug).maybeSingle();
      return data;
    },
    enabled: Boolean(slug),
  });

  const sections = useQuery({
    queryKey: ['admin_page_sections', slug],
    queryFn: async () => {
      if (!supabase) return [] as DbPageSection[];
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', slug)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data ?? []) as DbPageSection[];
    },
    enabled: Boolean(slug),
  });

  useEffect(() => {
    if (!sections.data) return;
    const next: Record<string, Record<string, unknown>> = {};
    for (const s of sections.data) {
      next[s.section_key] = { ...(s.content as Record<string, unknown>) };
    }
    setDrafts(next);
  }, [sections.data]);

  const title = page.data?.title ?? slug;

  const saveSection = async (sectionKey: string) => {
    if (!supabase) return;
    setSaving(sectionKey);
    setMessage(null);
    const content = drafts[sectionKey] ?? {};
    const { error } = await supabase.from('page_sections').upsert(
      {
        page_slug: slug,
        section_key: sectionKey,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'page_slug,section_key' },
    );
    setSaving(null);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage(`Saved “${sectionKey}”`);
    qc.invalidateQueries({ queryKey: ['admin_page_sections', slug] });
    qc.invalidateQueries({ queryKey: ['page_section', slug] });
    qc.invalidateQueries({ queryKey: ['page_sections', slug] });
  };

  const addSection = async () => {
    const key = newKey.trim().toLowerCase().replace(/\s+/g, '_');
    if (!key || !supabase) return;
    const { error } = await supabase.from('page_sections').insert({
      page_slug: slug,
      section_key: key,
      sort_order: (sections.data?.length ?? 0),
      content: { title: 'New section', body: '' },
    });
    if (error) {
      setMessage(error.message);
      return;
    }
    setNewKey('');
    qc.invalidateQueries({ queryKey: ['admin_page_sections', slug] });
    qc.invalidateQueries({ queryKey: ['admin_page_section_counts'] });
  };

  const deleteSection = async (sectionKey: string) => {
    if (!supabase || !confirm(`Delete section “${sectionKey}”?`)) return;
    await supabase
      .from('page_sections')
      .delete()
      .eq('page_slug', slug)
      .eq('section_key', sectionKey);
    qc.invalidateQueries({ queryKey: ['admin_page_sections', slug] });
    qc.invalidateQueries({ queryKey: ['admin_page_section_counts'] });
  };

  const sectionList = useMemo(() => sections.data ?? [], [sections.data]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link href="/admin/pages" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4" /> All pages
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold font-display">{title}</h1>
        <p className="text-slate-400 mt-1 text-sm">Edit sections for /{slug}</p>
        {message && (
          <div className="mt-3 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 w-fit">
            {message}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {sectionList.map((section) => {
          const content = drafts[section.section_key] ?? {};
          const keys = Object.keys(content);
          return (
            <div
              key={section.id}
              className="rounded-2xl border border-white/10 bg-[#050816] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 gap-3">
                <div>
                  <h2 className="font-semibold text-white">{section.section_key}</h2>
                  <div className="text-xs text-slate-500">sort {section.sort_order}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteSection(section.section_key)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-300 hover:bg-red-500/10 border-none bg-transparent cursor-pointer"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    disabled={saving === section.section_key}
                    onClick={() => saveSection(section.section_key)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 cursor-pointer border-none"
                  >
                    <Save className="w-4 h-4" />
                    {saving === section.section_key ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
              <div className="p-5 grid grid-cols-1 gap-4">
                {keys.length === 0 && (
                  <p className="text-sm text-slate-500">Empty section — add fields via JSON or create a new section.</p>
                )}
                {keys.map((key) => (
                  <FieldEditor
                    key={key}
                    fieldKey={key}
                    value={content[key]}
                    onChange={(next) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [section.section_key]: { ...prev[section.section_key], [key]: next },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}

        {sectionList.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500 text-sm">
            No sections yet for this page.
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-slate-500 uppercase tracking-wide">Add new section</label>
            <input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g. testimonials"
              className="w-full bg-[#08111F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
            />
          </div>
          <button
            onClick={addSection}
            disabled={!newKey.trim()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 disabled:opacity-50 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Section
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
