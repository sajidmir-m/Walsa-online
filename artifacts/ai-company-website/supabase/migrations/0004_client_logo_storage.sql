-- Storage bucket for client logo uploads (used by /admin/clients).
-- Paste this into Supabase → SQL Editor → Run.

insert into storage.buckets (id, name, public)
values ('client-logos', 'client-logos', true)
on conflict (id) do update set public = true;

-- Anyone can view logos (bucket is public, but keep an explicit read policy too).
drop policy if exists "Public read client logos" on storage.objects;
create policy "Public read client logos"
  on storage.objects for select
  using (bucket_id = 'client-logos');

-- Only signed-in admins can upload/replace/delete logos.
drop policy if exists "Authenticated upload client logos" on storage.objects;
create policy "Authenticated upload client logos"
  on storage.objects for insert
  with check (bucket_id = 'client-logos' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update client logos" on storage.objects;
create policy "Authenticated update client logos"
  on storage.objects for update
  using (bucket_id = 'client-logos' and auth.role() = 'authenticated');

drop policy if exists "Authenticated delete client logos" on storage.objects;
create policy "Authenticated delete client logos"
  on storage.objects for delete
  using (bucket_id = 'client-logos' and auth.role() = 'authenticated');
