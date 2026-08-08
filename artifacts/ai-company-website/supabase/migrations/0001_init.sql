-- WALSA ONLINE — Admin Panel schema
-- Paste this entire file into Supabase → SQL Editor → Run

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.pages (
  slug text primary key,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null references public.pages(slug) on delete cascade,
  section_key text not null,
  sort_order int not null default 0,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (page_slug, section_key)
);

create table if not exists public.queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_interest text,
  message text not null,
  source_page text default 'home',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  industry text not null default '',
  color text not null default 'from-blue-500 to-indigo-500',
  logo_initials text not null default '',
  logo_url text not null default '',
  summary text not null default '',
  services jsonb not null default '[]'::jsonb,
  results jsonb not null default '[]'::jsonb,
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_title text not null default '',
  tagline text not null default '',
  description text not null default '',
  items jsonb not null default '[]'::jsonb,
  icon_name text not null default 'Share2',
  accent text not null default 'purple',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists idx_page_sections_page on public.page_sections(page_slug);
create index if not exists idx_queries_status on public.queries(status);
create index if not exists idx_queries_created on public.queries(created_at desc);
create index if not exists idx_clients_sort on public.clients(sort_order);
create index if not exists idx_marketing_sort on public.marketing_services(sort_order);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.queries enable row level security;
alter table public.clients enable row level security;
alter table public.marketing_services enable row level security;
alter table public.site_settings enable row level security;

-- Public read for content tables
drop policy if exists "Public read pages" on public.pages;
create policy "Public read pages" on public.pages for select using (true);

drop policy if exists "Public read page_sections" on public.page_sections;
create policy "Public read page_sections" on public.page_sections for select using (true);

drop policy if exists "Public read clients" on public.clients;
create policy "Public read clients" on public.clients for select using (true);

drop policy if exists "Public read marketing_services" on public.marketing_services;
create policy "Public read marketing_services" on public.marketing_services for select using (true);

drop policy if exists "Public read site_settings" on public.site_settings;
create policy "Public read site_settings" on public.site_settings for select using (true);

-- Authenticated write for content tables
drop policy if exists "Auth write pages" on public.pages;
create policy "Auth write pages" on public.pages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Auth write page_sections" on public.page_sections;
create policy "Auth write page_sections" on public.page_sections for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Auth write clients" on public.clients;
create policy "Auth write clients" on public.clients for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Auth write marketing_services" on public.marketing_services;
create policy "Auth write marketing_services" on public.marketing_services for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Auth write site_settings" on public.site_settings;
create policy "Auth write site_settings" on public.site_settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Queries: public insert (contact form), auth read/update
drop policy if exists "Public insert queries" on public.queries;
create policy "Public insert queries" on public.queries for insert with check (true);

drop policy if exists "Auth read queries" on public.queries;
create policy "Auth read queries" on public.queries for select
  using (auth.role() = 'authenticated');

drop policy if exists "Auth update queries" on public.queries;
create policy "Auth update queries" on public.queries for update
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Auth delete queries" on public.queries;
create policy "Auth delete queries" on public.queries for delete
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Seed: pages
-- ---------------------------------------------------------------------------

insert into public.pages (slug, title) values
  ('home', 'Home'),
  ('about', 'About'),
  ('technology', 'Technology'),
  ('marketing', 'Digital Marketing'),
  ('clients', 'Clients'),
  ('work', 'Our Work'),
  ('contact', 'Contact')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Seed: page_sections (editable content with current site copy as defaults)
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_slug, section_key, sort_order, content) values
(
  'home', 'hero', 0,
  '{
    "badge": "Technology & Marketing, Done Right",
    "headline_prefix": "We build",
    "rotating_phrases": ["AI Agents", "Scalable Software", "High-Ranking SEO", "Growth Campaigns", "Mobile Apps"],
    "subheadline": "Our engineers build the agents and software. Our marketers make sure people find you — with SEO, content, and campaigns that compound.",
    "cta_primary": "Start a Project",
    "cta_secondary": "See Our Work",
    "stats": [
      {"value": 500, "suffix": "+", "label": "Projects Delivered"},
      {"value": 50, "suffix": "+", "label": "AI Agents Built"},
      {"value": 98, "suffix": "%", "label": "Client Satisfaction"},
      {"value": 15, "suffix": "+", "label": "Countries Served"}
    ]
  }'::jsonb
),
(
  'about', 'intro', 0,
  '{
    "badge": "Who We Are",
    "headline": "Builders & Marketers,",
    "headline_highlight": "Under One Roof",
    "body": "WALSA ONLINE is a digital transformation company with two clear strengths: technology that ships, and marketing that grows. Our engineers build AI agents and software. Our marketers make sure the right people find you — with content, SEO, and campaigns that compound."
  }'::jsonb
),
(
  'about', 'mission', 1,
  '{
    "title": "Our Mission",
    "body": "Help ambitious businesses modernize how they operate and how they show up online — without juggling five agencies. From AI systems and cloud infrastructure to social media, reels, and paid ads, we take ownership end-to-end so you can focus on running the business."
  }'::jsonb
),
(
  'about', 'cta', 2,
  '{
    "title": "Let''s Build Something Together",
    "body": "Whether you need AI agents, a new product, or a full marketing engine — we''re ready.",
    "button": "Get in Touch"
  }'::jsonb
),
(
  'technology', 'stack', 0,
  '{
    "heading": "Our Tech Ecosystem",
    "subheading": "We build with the most powerful, scalable, and secure technologies available today.",
    "techs": ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "FastAPI", "Supabase", "Firebase", "Flutter", "AWS", "Docker", "Kubernetes", "LangChain", "n8n"]
  }'::jsonb
),
(
  'marketing', 'intro', 0,
  '{
    "badge": "Marketing Solution",
    "headline": "Digital Marketing",
    "headline_highlight": "That Grows Brands",
    "body": "Choose a service below to see exactly what''s included — Social Media, Content Creation, SEO, Ads, Strategy, and more — each managed end-to-end by WALSA ONLINE."
  }'::jsonb
),
(
  'clients', 'intro', 0,
  '{
    "headline": "Brands That",
    "headline_highlight": "Trust Us",
    "body": "Click any logo to see who they are, what we built together, and the results we delivered — across technology and marketing."
  }'::jsonb
),
(
  'contact', 'info', 0,
  '{
    "heading": "Let''s Build Something",
    "heading_highlight": "Amazing",
    "body": "Ready to transform your business? Drop us a line and our engineering team will get back to you within 24 hours.",
    "email": "hello@walsaonline.com",
    "phone": "+1 (800) 555-0199",
    "whatsapp_number": "18005550199",
    "address_line1": "100 AI Avenue, Tech District",
    "address_line2": "San Francisco, CA 94105"
  }'::jsonb
),
(
  'home', 'footer', 10,
  '{
    "tagline": "Architecting the future of enterprise software. We blend artificial intelligence with world-class engineering to deliver unmatched digital experiences."
  }'::jsonb
)
on conflict (page_slug, section_key) do nothing;

-- ---------------------------------------------------------------------------
-- Seed: site settings
-- ---------------------------------------------------------------------------

insert into public.site_settings (key, value) values
  ('whatsapp', '{"number": "18005550199", "default_message": "Hi WALSA ONLINE, I''d like to discuss a project."}'::jsonb),
  ('contact', '{"email": "hello@walsaonline.com", "phone": "+1 (800) 555-0199"}'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Seed: clients
-- ---------------------------------------------------------------------------

insert into public.clients (slug, name, industry, color, logo_initials, logo_url, summary, services, results, description, sort_order) values
(
  'techflow', 'TechFlow', 'FinTech', 'from-blue-500 to-indigo-500', 'TF',
  '/images/clients/techflow.svg',
  'AI-powered risk assessment that transformed underwriting throughput.',
  '["AI Agents","Machine Learning","Cloud Migration"]'::jsonb,
  '[{"label":"ROI Increase","value":"340%"},{"label":"Throughput","value":"10×"},{"label":"Default Rate Drop","value":"42%"}]'::jsonb,
  'We rebuilt TechFlow''s core underwriting engine with real-time machine learning models and autonomous decision agents. The new system processes 10× more applications with the same team while significantly reducing default rates — delivering a 340% ROI within the first year.',
  0
),
(
  'shopwise', 'ShopWise', 'E-Commerce', 'from-purple-500 to-violet-500', 'SW',
  '/images/clients/shopwise.svg',
  'Predictive supply chain automation that cut inventory costs nearly in half.',
  '["Predictive AI","Automation","SaaS Platform"]'::jsonb,
  '[{"label":"Cost Reduction","value":"45%"},{"label":"Forecast Horizon","value":"30 Days"},{"label":"Stockouts Cut","value":"68%"}]'::jsonb,
  'ShopWise needed smarter inventory decisions. We built an autonomous demand-forecasting system that predicts spikes 30 days ahead and automates supplier ordering — cutting inventory costs by 45% and nearly eliminating stockouts.',
  1
),
(
  'medora', 'Medora Health', 'Healthcare', 'from-emerald-500 to-teal-500', 'MH',
  '/images/clients/medora.svg',
  'Patient triage AI assistant serving millions with faster care pathways.',
  '["AI Chatbots","NLP","Integrations"]'::jsonb,
  '[{"label":"Patients Served","value":"2M+"},{"label":"Faster Triage","value":"60%"},{"label":"CSAT Score","value":"4.8★"}]'::jsonb,
  'Medora Health partnered with us to deploy an NLP-powered triage assistant that assesses patients before they reach a clinician. Wait times dropped 60%, schedules optimized dynamically, and over 2 million patients have been served to date.',
  2
),
(
  'insightly', 'Insightly', 'SaaS', 'from-orange-500 to-amber-500', 'IN',
  '/images/clients/insightly.svg',
  'Intelligent analytics dashboard with generative reports and anomaly detection.',
  '["Software Development","Data Engineering","UI/UX"]'::jsonb,
  '[{"label":"Faster Reporting","value":"12×"},{"label":"Uptime","value":"99.9%"},{"label":"Time Saved / Week","value":"40 hrs"}]'::jsonb,
  'Insightly''s raw data streams were overwhelming their ops team. We built a real-time analytics platform with generative reports and custom anomaly detection — turning noise into clear decisions 12× faster.',
  3
),
(
  'nova-retail', 'Nova Retail', 'Retail', 'from-pink-500 to-rose-500', 'NR',
  '/images/clients/nova-retail.svg',
  'Full-funnel digital marketing that tripled online revenue in six months.',
  '["Meta Ads","SEO","Content Marketing","Social Media"]'::jsonb,
  '[{"label":"Revenue Growth","value":"3×"},{"label":"ROAS","value":"220%"},{"label":"Organic Traffic","value":"+185%"}]'::jsonb,
  'Nova Retail needed consistent brand presence and measurable growth. We ran integrated SEO, Meta Ads, content creation (30 reels/month), and social management — tripling monthly revenue in under six months with a 220% ROAS.',
  4
),
(
  'learnscape', 'LearnScape', 'EdTech', 'from-cyan-500 to-sky-500', 'LS',
  '/images/clients/learnscape.svg',
  'Complete UX redesign that dramatically lifted learner engagement.',
  '["UI/UX Design","Design Systems","Mobile Apps"]'::jsonb,
  '[{"label":"Engagement Lift","value":"82%"},{"label":"App Rating","value":"4.9★"},{"label":"Retention","value":"+55%"}]'::jsonb,
  'LearnScape''s learning platform felt dated and confusing. We led a full UX overhaul — research, wireframes, prototypes, and a scalable design system — resulting in an 82% engagement lift and a 4.9★ app rating.',
  5
),
(
  'fleetgo', 'FleetGo', 'Logistics', 'from-teal-500 to-cyan-500', 'FG',
  '/images/clients/fleetgo.svg',
  'Cross-platform fleet app with real-time tracking and route optimization.',
  '["Mobile Development","Cloud Infrastructure","API Integration"]'::jsonb,
  '[{"label":"Fuel Savings","value":"35%"},{"label":"Downloads","value":"50K+"},{"label":"Dispatch Speed","value":"2×"}]'::jsonb,
  'FleetGo needed a modern driver and dispatch experience. We delivered a React Native app with live GPS, optimized routing, and push alerts — cutting fuel spend 35% and doubling dispatch speed across their fleet.',
  6
),
(
  'brightpath', 'BrightPath Bank', 'FinServ', 'from-indigo-500 to-blue-500', 'BP',
  '/images/clients/brightpath.svg',
  'Zero-downtime AWS multi-region migration for a legacy banking stack.',
  '["Cloud & Infrastructure","DevOps","Security"]'::jsonb,
  '[{"label":"Availability","value":"99.99%"},{"label":"Infra Cost Cut","value":"60%"},{"label":"Deploy Time","value":"Minutes"}]'::jsonb,
  'BrightPath Bank migrated from a monolithic on-prem system to a multi-region AWS architecture with full CI/CD. We achieved zero-downtime cutover, 99.99% availability, and a 60% reduction in infrastructure cost.',
  7
)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Seed: marketing services
-- ---------------------------------------------------------------------------

insert into public.marketing_services (slug, title, short_title, tagline, description, items, icon_name, accent, sort_order) values
(
  'social-media-management', 'Social Media Management', 'Social Media',
  'Daily management that grows your brand presence',
  'Complete Instagram & Facebook account management by our team — from content calendars and captions to engagement and consistent brand growth.',
  '["Complete Instagram & Facebook account management","Daily account handling by our team","Content planning and monthly content calendar","Profile optimization","Caption writing and hashtag research","Audience engagement strategy","Page growth and brand consistency"]'::jsonb,
  'Share2', 'purple', 0
),
(
  'content-creation', 'Content Creation', 'Content Creation',
  '30 professional reels and videos every month',
  'From shooting and editing to trending reel concepts — we create the content that makes your brand show up and convert.',
  '["30 Professional Reels per Month","Professional video shooting","High-quality video editing","Creative scripting and content planning","Trending reel concepts","Product showcase videos","Promotional videos","Festival and seasonal content","Behind-the-scenes content","Educational and brand awareness content"]'::jsonb,
  'Video', 'fuchsia', 1
),
(
  'graphic-design', 'Graphic Design', 'Graphic Design',
  'Creatives that stop the scroll',
  'Professional post, story, carousel, and promotional designs that keep your brand visually sharp across every platform.',
  '["Professional Canva post designs","Carousel posts","Story designs","Offer and promotional creatives","Festival creatives","Product posters","Highlight cover designs"]'::jsonb,
  'Palette', 'pink', 2
),
(
  'branding', 'Branding', 'Branding',
  'Identity, messaging, and creative direction',
  'We develop and maintain a clear brand identity — colors, typography, messaging, and creative direction — so every touchpoint feels consistent.',
  '["Brand identity development","Visual branding","Brand color and typography consistency","Brand messaging","Creative direction"]'::jsonb,
  'Sparkles', 'rose', 3
),
(
  'google-business-profile', 'Google Business Profile (GMB)', 'Google Business Profile',
  'Show up on Google Maps and local search',
  'Complete Google Business Profile setup and ongoing optimization so customers find you on Maps, see your posts, and trust your reviews.',
  '["Complete profile setup and optimization","Business information updates","Photo uploads","Google Posts","Review management guidance","Google Maps visibility improvement"]'::jsonb,
  'MapPin', 'emerald', 4
),
(
  'local-seo', 'Local SEO', 'Local SEO',
  'Rank where your customers search locally',
  'Local keyword research, Maps optimization, and listing improvements so your business ranks when nearby customers are looking for you.',
  '["Local keyword research","Google Maps optimization","Business listing optimization","Local search ranking improvements","Competitor analysis"]'::jsonb,
  'Search', 'cyan', 5
),
(
  'meta-advertising', 'Meta Advertising', 'Meta Ads',
  'Facebook & Instagram ads that generate leads',
  'Targeted Facebook & Instagram campaigns — lead gen, remarketing, creative management, and continuous optimization for better ROAS.',
  '["Facebook & Instagram Ads","Audience targeting","Lead generation campaigns","Remarketing campaigns","Campaign optimization","Ad creative management"]'::jsonb,
  'Target', 'violet', 6
),
(
  'google-ads', 'Google Ads', 'Google Ads',
  'Search campaigns that convert intent into customers',
  'Search campaign setup, keyword research, ad copy, and conversion-focused management so you capture high-intent traffic on Google.',
  '["Search campaign setup","Keyword research","Ad copywriting","Campaign management","Conversion optimization"]'::jsonb,
  'Crosshair', 'blue', 7
),
(
  'marketing-strategy', 'Marketing Strategy', 'Marketing Strategy',
  'Monthly plans, offers, and performance insights',
  'Competitor research, monthly strategy, campaign and offer planning, plus reporting with clear recommendations so growth stays intentional.',
  '["Competitor research","Monthly marketing strategy","Campaign planning","Offer planning","Performance monitoring","Monthly reporting with insights and recommendations"]'::jsonb,
  'LineChart', 'indigo', 8
)
on conflict (slug) do nothing;
