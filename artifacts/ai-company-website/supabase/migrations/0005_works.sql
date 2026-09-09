-- Kasshit — Our Work / portfolio projects
-- Manage from /admin/work (create, edit, delete, upload cover image).
-- Paste this entire file into Supabase → SQL Editor → Run.

create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'Business',
  industry text not null default '',
  url text not null default '',
  domain text not null default '',
  description text not null default '',
  color text not null default 'from-blue-500/20 to-indigo-500/10',
  accent text not null default 'text-blue-400',
  border text not null default 'hover:border-blue-500/30',
  tags jsonb not null default '[]'::jsonb,
  image_url text not null default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_works_sort on public.works(sort_order);
create index if not exists idx_works_featured on public.works(featured);

alter table public.works enable row level security;

drop policy if exists "Public read works" on public.works;
create policy "Public read works" on public.works for select using (true);

drop policy if exists "Auth write works" on public.works;
create policy "Auth write works" on public.works for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Cover images (optional — if empty, the site uses a live screenshot of the URL)
insert into storage.buckets (id, name, public)
values ('work-images', 'work-images', true)
on conflict (id) do update set public = true;

do $$
begin
  drop policy if exists "Public read work images" on storage.objects;
  create policy "Public read work images"
    on storage.objects for select
    using (bucket_id = 'work-images');

  drop policy if exists "Authenticated upload work images" on storage.objects;
  create policy "Authenticated upload work images"
    on storage.objects for insert
    with check (bucket_id = 'work-images' and auth.role() = 'authenticated');

  drop policy if exists "Authenticated update work images" on storage.objects;
  create policy "Authenticated update work images"
    on storage.objects for update
    using (bucket_id = 'work-images' and auth.role() = 'authenticated');

  drop policy if exists "Authenticated delete work images" on storage.objects;
  create policy "Authenticated delete work images"
    on storage.objects for delete
    using (bucket_id = 'work-images' and auth.role() = 'authenticated');
exception
  when insufficient_privilege then
    raise notice 'Could not create work-images storage policies from SQL. Create them in Dashboard: Storage -> Policies.';
end $$;

-- Seed current portfolio projects
insert into public.works (
  slug, title, category, industry, url, domain, description,
  color, accent, border, tags, featured, sort_order
) values
(
  'stepup',
  'StepUp — Premium Fashion Store',
  'E-Commerce',
  'Fashion',
  'https://stepupkmr.com/',
  'stepupkmr.com',
  'A premium fashion e-commerce experience built for StepUp Kashmir — sleek product showcases, smooth shopping flow, and a brand-first design.',
  'from-emerald-500/20 to-teal-500/10',
  'text-emerald-400',
  'hover:border-emerald-500/30',
  '["Website", "E-Commerce", "Branding"]'::jsonb,
  true,
  0
),
(
  'kasshit',
  'Kasshit — Fast Grocery Delivery',
  'E-Commerce',
  'Quick Commerce',
  'https://www.kasshit.in/',
  'kasshit.in',
  'Quick-commerce platform for fresh daily essentials — fast grocery delivery in India with a clean ordering experience built for speed.',
  'from-lime-500/20 to-green-500/10',
  'text-lime-400',
  'hover:border-lime-500/30',
  '["Website", "Quick Commerce", "Delivery"]'::jsonb,
  true,
  1
),
(
  'class17',
  'Class17 — Learning Platform',
  'Education',
  'Education & Training',
  'https://class17.in/',
  'class17.in',
  'A custom website and AI agent for Class17 that answers student questions instantly and keeps learners engaged around the clock.',
  'from-pink-500/20 to-rose-500/10',
  'text-pink-400',
  'hover:border-pink-500/30',
  '["Website", "AI Agent", "Education"]'::jsonb,
  false,
  2
),
(
  'elanpro',
  'Elanpro — Business Website & AI Agent',
  'Business',
  'Professional Services',
  'https://elanpro.net/',
  'elanpro.net',
  'A modern, conversion-focused website for Elanpro with a custom AI agent handling customer queries and lead capture 24/7.',
  'from-blue-500/20 to-indigo-500/10',
  'text-blue-400',
  'hover:border-blue-500/30',
  '["Website", "AI Agent", "Automation"]'::jsonb,
  true,
  3
),
(
  'prezrve',
  'Prezrve — Find Content Creators',
  'Platform',
  'Creator Economy',
  'https://www.prezrve.com/',
  'prezrve.com',
  'A platform connecting brands with content creators — waitlist onboarding for creators and clients with a clean, focused signup flow.',
  'from-purple-500/20 to-violet-500/10',
  'text-purple-400',
  'hover:border-purple-500/30',
  '["Website", "Platform", "Lead Capture"]'::jsonb,
  false,
  4
),
(
  'tempest-treks',
  'Tempest Treks — Kashmir Tour Packages',
  'Travel',
  'Travel & Tourism',
  'https://www.tempesttreks.in/',
  'tempesttreks.in',
  'Full travel website for Tempest Treks with tour packages, cabs, off-beat destinations, and enquiry flows built to convert visitors into bookings.',
  'from-cyan-500/20 to-sky-500/10',
  'text-cyan-400',
  'hover:border-cyan-500/30',
  '["Website", "Tour Packages", "Booking"]'::jsonb,
  true,
  5
),
(
  'high-tower-tours',
  'High Tower Tours & Travels',
  'Travel',
  'Travel & Tourism',
  'https://www.hightowertourtravels.in/',
  'hightowertourtravels.in',
  'Kashmir & Ladakh travel site with smart tour search, featured packages, cab fleet listings, and WhatsApp booking integration.',
  'from-orange-500/20 to-amber-500/10',
  'text-orange-400',
  'hover:border-orange-500/30',
  '["Website", "Smart Search", "WhatsApp Booking"]'::jsonb,
  false,
  6
),
(
  'wasturwan-travels',
  'Wasturwan Travels',
  'Travel',
  'Travel & Tourism',
  'https://www.wasturwantravels.com/',
  'wasturwantravels.com',
  'An elegant travel brand site for Wasturwan Travels — curated Kashmir experiences, featured packages, and enquiry-driven trip planning.',
  'from-fuchsia-500/20 to-purple-500/10',
  'text-fuchsia-400',
  'hover:border-fuchsia-500/30',
  '["Website", "Tour Packages", "Branding"]'::jsonb,
  false,
  7
)
on conflict (slug) do nothing;
