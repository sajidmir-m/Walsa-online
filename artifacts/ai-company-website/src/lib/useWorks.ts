import { useQuery } from '@tanstack/react-query';
import { supabase, type DbWork } from '@/lib/supabaseClient';
import { works as fallbackWorks, type WorkProject } from '@/data/works';

function mapDbWork(row: DbWork): WorkProject {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    industry: row.industry,
    url: row.url,
    domain: row.domain,
    description: row.description,
    color: row.color,
    accent: row.accent,
    border: row.border,
    tags: Array.isArray(row.tags) ? row.tags : [],
    imageUrl: row.image_url ?? '',
    featured: Boolean(row.featured),
  };
}

export function useWorks() {
  const query = useQuery({
    queryKey: ['works'],
    queryFn: async (): Promise<WorkProject[]> => {
      if (!supabase) return fallbackWorks;
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) {
        console.warn('[works]', error.message);
        return fallbackWorks;
      }
      if (!data?.length) return fallbackWorks;
      return data.map((row) => mapDbWork(row as DbWork));
    },
    staleTime: 60_000,
  });

  const works = query.data ?? fallbackWorks;

  return {
    works,
    featured: works.filter((w) => w.featured),
    loading: query.isLoading,
    refetch: query.refetch,
  };
}

/** Live screenshot via WordPress mShots (free, no key). */
export function workScreenshot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1024`;
}

export function workCoverSrc(project: Pick<WorkProject, 'url' | 'imageUrl'>) {
  if (project.imageUrl?.trim()) return project.imageUrl.trim();
  if (project.url?.trim()) return workScreenshot(project.url.trim());
  return '';
}
