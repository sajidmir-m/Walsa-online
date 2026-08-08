# WALSA ONLINE — Admin Panel Setup Guide

Follow these steps **once**. After this, you manage everything from `/admin`.

---

## 1. Create a free Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign up / log in.
2. Click **New project**.
3. Pick an organization, name the project (e.g. `walsa-online`), set a strong database password, choose a region close to you.
4. Wait ~1–2 minutes for the project to finish provisioning.

## 2. Get your API keys

1. In the left sidebar: **Project Settings** (gear) → **API**.
2. Copy:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long JWT starting with `eyJ...`)
3. Create a file at `artifacts/ai-company-website/.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key
```

4. Restart the Vite dev server after saving `.env.local`.

> Never put the **service_role** key in frontend code. It stays only in Supabase Edge Function secrets.

## 3. Run the database migration

1. In Supabase: **SQL Editor** → **New query**.
2. Open `artifacts/ai-company-website/supabase/migrations/0001_init.sql` from this repo.
3. Paste the entire contents into the SQL Editor and click **Run**.
4. You should see success. Tables created: `pages`, `page_sections`, `queries`, `clients`, `marketing_services`, `site_settings`.

## 4. Create your admin login

1. In Supabase: **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter your email + a strong password. Toggle **Auto Confirm User** ON.
3. Click **Create user**.
4. Optional but recommended: **Authentication** → **Providers** → **Email** → disable **Enable sign ups** so only this account can exist.

You will log into the site at `/admin/login` with this email/password.

## 5. Activate CallMeBot (WhatsApp alerts)

1. Open WhatsApp on the phone that should receive lead alerts.
2. Message this number: **+34 644 59 71 07**
3. Send exactly: `I allow callmebot to send me messages`
4. CallMeBot replies with your personal **API key** (a short number/code).
5. Note your WhatsApp number in international format **without + or spaces** (e.g. `919876543210` for India).

## 6. Deploy the Edge Function + set secrets

### Option A — Supabase Dashboard (easiest)

1. Install the Supabase CLI if needed: `npm i -g supabase`
2. From the website folder:

```bash
cd artifacts/ai-company-website
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

(`YOUR_PROJECT_REF` is the subdomain part of your Project URL.)

3. Set secrets:

```bash
npx supabase secrets set CALLMEBOT_PHONE=919876543210 CALLMEBOT_APIKEY=your_callmebot_key
```

4. Deploy the function:

```bash
npx supabase functions deploy submit-query --no-verify-jwt
```

(`--no-verify-jwt` lets the public contact form call the function without a logged-in user.)

### Option B — Manual paste in Dashboard

1. Supabase → **Edge Functions** → **Create a new function** named `submit-query`.
2. Paste the code from `supabase/functions/submit-query/index.ts`.
3. Under **Edge Function Secrets**, add `CALLMEBOT_PHONE` and `CALLMEBOT_APIKEY`.
4. Disable JWT verification for this function (Settings → uncheck "Verify JWT") so the contact form works for anonymous visitors.

## 7. Open the admin panel

1. Start the site: `pnpm --filter @workspace/ai-company-website dev`
2. Visit `http://localhost:5173/admin/login`
3. Sign in with the admin email/password from step 4.
4. You can now:
   - See **Queries** (every contact-form lead) — also pushed to WhatsApp
   - Edit **Pages** (Home, About, Technology, Marketing, Contact, …)
   - Manage **Clients** and **Marketing Services**

## 8. Production hosting (Replit)

1. In Replit → **Secrets** (lock icon), add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key
2. Redeploy the website artifact (or push to `main` if auto-deploy is on).
3. Vite bakes these into the JS bundle at **build time**, so secrets must be set **before** the production build runs.
4. After deploy, open `https://YOUR-REPLIT-URL/admin/login` and sign in.

Wherever else you host (Vercel / Netlify / Cloudflare Pages), add the same two env vars, then rebuild/redeploy.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Contact form says "not configured" | `.env.local` missing or Vite not restarted |
| WhatsApp not arriving | Re-check CallMeBot activation + secrets; free API has daily limits |
| Can't log into `/admin` | Confirm user exists and is confirmed in Auth → Users |
| Content not updating on live site | Hard-refresh; check RLS policies ran successfully |
| Edge Function 401 | Redeploy with `--no-verify-jwt` |
