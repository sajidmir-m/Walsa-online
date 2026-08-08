import { useQuery } from '@tanstack/react-query';
import {
  Share2,
  Video,
  Palette,
  Sparkles,
  MapPin,
  Search,
  Target,
  Crosshair,
  LineChart,
  type LucideIcon,
} from 'lucide-react';
import { supabase, type DbMarketingService } from '@/lib/supabaseClient';
import {
  marketingServices as fallbackServices,
  type MarketingServiceItem,
} from '@/data/marketingServices';

const iconMap: Record<string, LucideIcon> = {
  Share2,
  Video,
  Palette,
  Sparkles,
  MapPin,
  Search,
  Target,
  Crosshair,
  LineChart,
};

function mapDbService(row: DbMarketingService): MarketingServiceItem {
  return {
    slug: row.slug,
    title: row.title,
    shortTitle: row.short_title || row.title,
    tagline: row.tagline,
    description: row.description,
    items: Array.isArray(row.items) ? row.items : [],
    icon: iconMap[row.icon_name] ?? Share2,
    accent: row.accent || 'purple',
  };
}

export function useMarketingServices() {
  const query = useQuery({
    queryKey: ['marketing_services'],
    queryFn: async (): Promise<MarketingServiceItem[]> => {
      if (!supabase) return fallbackServices;
      const { data, error } = await supabase
        .from('marketing_services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) {
        console.warn('[marketing_services]', error.message);
        return fallbackServices;
      }
      if (!data?.length) return fallbackServices;
      return data.map((row) => mapDbService(row as DbMarketingService));
    },
    staleTime: 60_000,
  });

  return {
    services: query.data ?? fallbackServices,
    loading: query.isLoading,
    refetch: query.refetch,
  };
}

export function useMarketingService(slug: string | undefined) {
  const { services, loading } = useMarketingServices();
  const service = slug ? services.find((s) => s.slug === slug) : undefined;
  return { service, loading, all: services };
}
