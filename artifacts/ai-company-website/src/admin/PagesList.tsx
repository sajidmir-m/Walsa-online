import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, FileText } from 'lucide-react';
import { supabase, type DbPage } from '@/lib/supabaseClient';
import AdminLayout from '@/admin/AdminLayout';

export default function PagesList() {
  const pages = useQuery({
    queryKey: ['admin_pages'],
    queryFn: async () => {
      if (!supabase) return [] as DbPage[];
      const { data, error } = await supabase.from('pages').select('*').order('title');
      if (error) throw error;
      return (data ?? []) as DbPage[];
    },
  });

  const sectionCounts = useQuery({
    queryKey: ['admin_page_section_counts'],
    queryFn: async () => {
      if (!supabase) return {} as Record<string, number>;
      const { data } = await supabase.from('page_sections').select('page_slug');
      const counts: Record<string, number> = {};
      for (const row of data ?? []) {
        counts[row.page_slug] = (counts[row.page_slug] ?? 0) + 1;
      }
      return counts;
    },
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-display">Pages</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Edit Home, About, Technology, Digital Marketing, Contact, and more
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(pages.data ?? []).map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="group rounded-2xl border border-white/10 bg-[#050816] p-5 hover:border-primary/40 transition-colors flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white group-hover:text-primary transition-colors">
                {page.title}
              </div>
              <div className="text-xs text-slate-500 mt-1">/{page.slug}</div>
              <div className="text-xs text-slate-400 mt-2">
                {sectionCounts.data?.[page.slug] ?? 0} editable section
                {(sectionCounts.data?.[page.slug] ?? 0) === 1 ? '' : 's'}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-primary mt-1" />
          </Link>
        ))}

        {(pages.data ?? []).length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500 text-sm">
            No pages found. Run the SQL migration in <code>ADMIN_SETUP.md</code>.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
