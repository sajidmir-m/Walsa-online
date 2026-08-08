import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface QueryPayload {
  name?: string;
  email?: string;
  phone?: string;
  service_interest?: string;
  message?: string;
  source_page?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = (await req.json()) as QueryPayload;
    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const message = (body.message ?? '').trim();
    const phone = (body.phone ?? '').trim() || null;
    const service_interest = (body.service_interest ?? '').trim() || null;
    const source_page = (body.source_page ?? 'home').trim() || 'home';

    if (!name || !email || !message) {
      return json({ error: 'name, email, and message are required' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email address' }, 400);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceKey) {
      return json({ error: 'Server misconfigured' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from('queries')
      .insert({
        name,
        email,
        phone,
        service_interest,
        message,
        source_page,
        status: 'new',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return json({ error: 'Failed to save query' }, 500);
    }

    // Best-effort WhatsApp via CallMeBot — never fail the request if WA fails
    const waPhone = Deno.env.get('CALLMEBOT_PHONE');
    const waKey = Deno.env.get('CALLMEBOT_APIKEY');
    let whatsapp_sent = false;

    if (waPhone && waKey) {
      const text = [
        '🔔 New WALSA ONLINE Query',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        service_interest ? `Service: ${service_interest}` : null,
        `Page: ${source_page}`,
        '',
        `Message: ${message}`,
      ]
        .filter(Boolean)
        .join('\n');

      try {
        const url = new URL('https://api.callmebot.com/whatsapp.php');
        url.searchParams.set('phone', waPhone);
        url.searchParams.set('text', text);
        url.searchParams.set('apikey', waKey);

        const waRes = await fetch(url.toString());
        whatsapp_sent = waRes.ok;
        if (!waRes.ok) {
          console.error('CallMeBot status:', waRes.status, await waRes.text());
        }
      } catch (waErr) {
        console.error('CallMeBot error:', waErr);
      }
    } else {
      console.warn('CALLMEBOT_PHONE / CALLMEBOT_APIKEY not set — skipping WhatsApp');
    }

    return json({ ok: true, id: data.id, whatsapp_sent });
  } catch (err) {
    console.error(err);
    return json({ error: 'Unexpected error' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
