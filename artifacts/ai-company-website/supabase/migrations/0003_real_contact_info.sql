-- Update contact section + site settings with WALSA ONLINE's real phone/WhatsApp/address.
-- Paste this into Supabase → SQL Editor → Run (after 0001_init.sql has already been run once).

update public.page_sections
set content = jsonb_set(
  jsonb_set(
    jsonb_set(
      jsonb_set(content, '{phone}', '"+91 88250 56728"'),
      '{whatsapp_number}', '"91495593939"'
    ),
    '{address_line1}', '"Khanyar"'
  ),
  '{address_line2}', '"Srinagar, Jammu and Kashmir"'
),
updated_at = now()
where page_slug = 'contact' and section_key = 'info';

update public.site_settings
set value = jsonb_set(value, '{number}', '"91495593939"'), updated_at = now()
where key = 'whatsapp';

update public.site_settings
set value = jsonb_set(value, '{phone}', '"+91 88250 56728"'), updated_at = now()
where key = 'contact';
