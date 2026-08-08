import { useQuery } from '@tanstack/react-query';
import { supabase, type DbClient } from '@/lib/supabaseClient';
import { clients as fallbackClients, type Client } from '@/data/clients';

function mapDbClient(row: DbClient): Client {
  return {
    slug: row.slug,
    name: row.name,
    industry: row.industry,
    color: row.color,
    logoInitials: row.logo_initials,
    logoSrc: row.logo_url,
    summary: row.summary,
    services: Array.isArray(row.services) ? row.services : [],
    results: Array.isArray(row.results) ? row.results : [],
    description: row.description,
  };
}

export function useClients() {
  const query = useQuery({
    queryKey: ['clients'],
    queryFn: async (): Promise<Client[]> => {
      if (!supabase) return fallbackClients;
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) {
        console.warn('[clients]', error.message);
        return fallbackClients;
      }
      if (!data?.length) return fallbackClients;
      return data.map((row) => mapDbClient(row as DbClient));
    },
    staleTime: 60_000,
  });

  return {
    clients: query.data ?? fallbackClients,
    loading: query.isLoading,
    refetch: query.refetch,
  };
}
