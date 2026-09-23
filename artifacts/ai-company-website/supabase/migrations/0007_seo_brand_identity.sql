-- SEO hero: brand name Kasshit + company identity for search / AI discovery
-- Paste into Supabase → SQL Editor → Run (safe to re-run).

update public.page_sections
set content = content
  || jsonb_build_object(
    'badge', 'AI & Digital Transformation Company · Srinagar, Kashmir',
    'brand_name', 'Kasshit',
    'company_line', 'An AI, software & digital marketing company',
    'subheadline', 'Kasshit (KASSH.IT) is a digital transformation company based in Srinagar, Jammu and Kashmir. Our engineers build AI agents and software. Our marketers grow brands with SEO, content, and campaigns that compound.'
  ),
  updated_at = now()
where page_slug = 'home' and section_key = 'hero';

update public.page_sections
set content = content
  || jsonb_build_object(
    'badge', 'Who We Are',
    'headline', 'Kasshit —',
    'headline_highlight', 'AI & Digital Transformation',
    'body', 'Kasshit (KASSH.IT) is an AI and digital transformation company based in Srinagar, Jammu and Kashmir, India. Founded by Sajid Nazir. We build AI agents, custom software, mobile apps, cloud systems, and digital marketing — SEO, social media, ads, and branding — under one roof.'
  ),
  updated_at = now()
where page_slug = 'about' and section_key = 'intro';
