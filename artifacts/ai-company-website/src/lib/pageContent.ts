import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Deep-merge remote content over local defaults (arrays replace, objects merge). */
export function mergeContent<T extends Record<string, unknown>>(
  defaults: T,
  remote: Record<string, unknown> | null | undefined,
): T {
  if (!remote) return defaults;
  const result: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(remote)) {
    const remoteVal = remote[key];
    const defaultVal = defaults[key];
    if (isPlainObject(remoteVal) && isPlainObject(defaultVal)) {
      result[key] = mergeContent(defaultVal, remoteVal);
    } else if (remoteVal !== undefined && remoteVal !== null) {
      result[key] = remoteVal;
    }
  }
  return result as T;
}

export function usePageSection<T extends Record<string, unknown>>(
  pageSlug: string,
  sectionKey: string,
  defaults: T,
) {
  const query = useQuery({
    queryKey: ['page_section', pageSlug, sectionKey],
    queryFn: async () => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('page_sections')
        .select('content')
        .eq('page_slug', pageSlug)
        .eq('section_key', sectionKey)
        .maybeSingle();
      if (error) {
        console.warn(`[pageContent] ${pageSlug}.${sectionKey}:`, error.message);
        return null;
      }
      return (data?.content as Record<string, unknown>) ?? null;
    },
    staleTime: 60_000,
    retry: 1,
  });

  return {
    data: mergeContent(defaults, query.data ?? undefined),
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export function usePageSections(pageSlug: string) {
  return useQuery({
    queryKey: ['page_sections', pageSlug],
    queryFn: async () => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_slug', pageSlug)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}
