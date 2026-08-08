-- Storage buckets for the admin panel.
--   client-logos : logo uploads from /admin/clients
--   site-assets  : any other images you want to upload later (page images, banners, ...)
-- Paste this whole file into Supabase → SQL Editor → Run.

insert into storage.buckets (id, name, public)
values
  ('client-logos', 'client-logos', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

-- RLS policies on storage.objects: public read, signed-in admins can write.
-- Wrapped in a DO block because some Supabase projects don't allow policy
-- creation on storage.objects from the SQL editor. If you see the NOTICE
-- about insufficient privileges, add the policies from the Dashboard instead:
-- Storage → [bucket] → Policies → New policy (see ADMIN_SETUP.md).
do $$
begin
  drop policy if exists "Public read client logos" on storage.objects;
  create policy "Public read client logos"
    on storage.objects for select
    using (bucket_id in ('client-logos', 'site-assets'));

  drop policy if exists "Authenticated upload client logos" on storage.objects;
  create policy "Authenticated upload client logos"
    on storage.objects for insert
    with check (bucket_id in ('client-logos', 'site-assets') and auth.role() = 'authenticated');

  drop policy if exists "Authenticated update client logos" on storage.objects;
  create policy "Authenticated update client logos"
    on storage.objects for update
    using (bucket_id in ('client-logos', 'site-assets') and auth.role() = 'authenticated');

  drop policy if exists "Authenticated delete client logos" on storage.objects;
  create policy "Authenticated delete client logos"
    on storage.objects for delete
    using (bucket_id in ('client-logos', 'site-assets') and auth.role() = 'authenticated');
exception
  when insufficient_privilege then
    raise notice 'Could not create storage policies from SQL. Create them in Dashboard: Storage -> Policies (see ADMIN_SETUP.md).';
end $$;
