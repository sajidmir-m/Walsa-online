import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

/** Null when env vars are missing — public pages fall back to hardcoded defaults. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

export type QueryStatus = 'new' | 'contacted' | 'closed';

export interface DbQuery {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_interest: string | null;
  message: string;
  source_page: string | null;
  status: QueryStatus;
  created_at: string;
}

export interface DbPage {
  slug: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface DbPageSection {
  id: string;
  page_slug: string;
  section_key: string;
  sort_order: number;
  content: Record<string, unknown>;
  updated_at: string;
}

export interface DbClient {
  id: string;
  slug: string;
  name: string;
  industry: string;
  color: string;
  logo_initials: string;
  logo_url: string;
  summary: string;
  services: string[];
  results: { label: string; value: string }[];
  description: string;
  sort_order: number;
}

export interface DbMarketingService {
  id: string;
  slug: string;
  title: string;
  short_title: string;
  tagline: string;
  description: string;
  items: string[];
  icon_name: string;
  accent: string;
  sort_order: number;
}

export interface DbWork {
  id: string;
  slug: string;
  title: string;
  category: string;
  industry: string;
  url: string;
  domain: string;
  description: string;
  color: string;
  accent: string;
  border: string;
  tags: string[];
  image_url: string;
  featured: boolean;
  sort_order: number;
}
