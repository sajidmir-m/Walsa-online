-- Replace demo/placeholder clients with WALSA ONLINE's real clients.
-- Paste this into Supabase → SQL Editor → Run (after 0001_init.sql has already been run once).

delete from public.clients;

insert into public.clients (slug, name, industry, color, logo_initials, logo_url, summary, services, results, description, sort_order) values
(
  'elanpro', 'Elanpro', 'Professional Services', 'from-blue-500 to-indigo-500', 'EP',
  '/images/clients/elanpro.svg',
  'A modern business website paired with a custom AI agent for customer engagement.',
  '["Website Development","AI Agents","Chatbot & Automation"]'::jsonb,
  '[{"label":"Website","value":"Delivered"},{"label":"AI Agent","value":"Deployed"},{"label":"Support","value":"24/7"}]'::jsonb,
  'WALSA ONLINE designed and built a modern, conversion-focused website for Elanpro and deployed a custom AI agent to handle customer queries and lead capture around the clock.',
  0
),
(
  'prezrve', 'Prezrve', 'Business Services', 'from-purple-500 to-violet-500', 'PZ',
  '/images/clients/prezrve.svg',
  'End-to-end website build with an AI-powered bot to streamline customer support.',
  '["Website Development","AI Agents","Chatbot & Automation"]'::jsonb,
  '[{"label":"Website","value":"Delivered"},{"label":"AI Bot","value":"Live"},{"label":"Response Time","value":"Instant"}]'::jsonb,
  'We built Prezrve a professional website from the ground up and integrated an AI-powered bot that automates customer support and everyday operational queries.',
  1
),
(
  'stepup', 'StepUp', 'Business Growth', 'from-emerald-500 to-teal-500', 'SU',
  '/images/clients/stepup.svg',
  'A performance-driven website and AI agent built to support customer growth journeys.',
  '["Website Development","AI Agents","Chatbot & Automation"]'::jsonb,
  '[{"label":"Website","value":"Delivered"},{"label":"AI Agent","value":"Deployed"},{"label":"Automation","value":"Live"}]'::jsonb,
  'StepUp partnered with WALSA ONLINE for a full website build and a dedicated AI agent that engages visitors, answers questions, and guides them toward conversion.',
  2
),
(
  'dna-networks', 'DNA Networks', 'Networking & IT Services', 'from-orange-500 to-amber-500', 'DN',
  '/images/clients/dna-networks.svg',
  'Website development and an AI chatbot built to support networking & IT service inquiries.',
  '["Website Development","AI Agents","Chatbot & Automation"]'::jsonb,
  '[{"label":"Website","value":"Delivered"},{"label":"AI Chatbot","value":"Live"},{"label":"Support","value":"24/7"}]'::jsonb,
  'WALSA ONLINE delivered a professional website for DNA Networks along with an AI chatbot that handles service inquiries and routes leads to the right team instantly.',
  3
),
(
  'class17', 'Class17', 'Education & Training', 'from-pink-500 to-rose-500', 'C17',
  '/images/clients/class17.svg',
  'A custom website and AI agent designed to support student and customer engagement.',
  '["Website Development","AI Agents","Chatbot & Automation"]'::jsonb,
  '[{"label":"Website","value":"Delivered"},{"label":"AI Agent","value":"Deployed"},{"label":"Engagement","value":"Automated"}]'::jsonb,
  'We built Class17 a custom website and an AI agent that answers common questions instantly and keeps students and customers engaged around the clock.',
  4
),
(
  'travel-agencies', 'Travel Agencies', 'Travel & Tourism', 'from-cyan-500 to-sky-500', 'TA',
  '/images/clients/travel-agencies.svg',
  'Website development and AI booking assistants built for travel agency partners.',
  '["Website Development","AI Agents","Chatbot & Automation"]'::jsonb,
  '[{"label":"Websites","value":"Delivered"},{"label":"AI Assistant","value":"Deployed"},{"label":"Bookings","value":"Automated"}]'::jsonb,
  'WALSA ONLINE builds websites and AI booking assistants for travel agency partners — helping travelers get instant answers and smoother booking experiences.',
  5
);
