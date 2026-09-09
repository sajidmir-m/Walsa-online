-- Update contact / WhatsApp to Sajid's number: 9149559393
-- Paste into Supabase → SQL Editor → Run (safe to re-run).

update public.page_sections
set content = jsonb_set(
      jsonb_set(content, '{phone}', '"+91 91495 59393"'),
      '{whatsapp_number}', '"919149559393"'
    ),
    updated_at = now()
where page_slug = 'contact' and section_key = 'info';

update public.site_settings
set value = jsonb_set(value, '{number}', '"919149559393"'), updated_at = now()
where key = 'whatsapp';

update public.site_settings
set value = jsonb_set(value, '{phone}', '"+91 91495 59393"'), updated_at = now()
where key = 'contact';
