export interface WorkProject {
  slug: string;
  title: string;
  category: string;
  industry: string;
  url: string;
  domain: string;
  description: string;
  color: string;
  accent: string;
  border: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
}

/** Fallback when Supabase is not configured or empty. */
export const works: WorkProject[] = [
  {
    slug: 'stepup',
    category: 'E-Commerce',
    industry: 'Fashion',
    title: 'StepUp — Premium Fashion Store',
    url: 'https://stepupkmr.com/',
    domain: 'stepupkmr.com',
    description:
      'A premium fashion e-commerce experience built for StepUp Kashmir — sleek product showcases, smooth shopping flow, and a brand-first design.',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
    tags: ['Website', 'E-Commerce', 'Branding'],
    imageUrl: '',
    featured: true,
  },
  {
    slug: 'kasshit',
    category: 'E-Commerce',
    industry: 'Quick Commerce',
    title: 'Kasshit — Fast Grocery Delivery',
    url: 'https://www.kasshit.in/',
    domain: 'kasshit.in',
    description:
      'Quick-commerce platform for fresh daily essentials — fast grocery delivery in India with a clean ordering experience built for speed.',
    color: 'from-lime-500/20 to-green-500/10',
    accent: 'text-lime-400',
    border: 'hover:border-lime-500/30',
    tags: ['Website', 'Quick Commerce', 'Delivery'],
    imageUrl: '',
    featured: true,
  },
  {
    slug: 'class17',
    category: 'Education',
    industry: 'Education & Training',
    title: 'Class17 — Learning Platform',
    url: 'https://class17.in/',
    domain: 'class17.in',
    description:
      'A custom website and AI agent for Class17 that answers student questions instantly and keeps learners engaged around the clock.',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    border: 'hover:border-pink-500/30',
    tags: ['Website', 'AI Agent', 'Education'],
    imageUrl: '',
    featured: false,
  },
  {
    slug: 'elanpro',
    category: 'Business',
    industry: 'Professional Services',
    title: 'Elanpro — Business Website & AI Agent',
    url: 'https://elanpro.net/',
    domain: 'elanpro.net',
    description:
      'A modern, conversion-focused website for Elanpro with a custom AI agent handling customer queries and lead capture 24/7.',
    color: 'from-blue-500/20 to-indigo-500/10',
    accent: 'text-blue-400',
    border: 'hover:border-blue-500/30',
    tags: ['Website', 'AI Agent', 'Automation'],
    imageUrl: '',
    featured: true,
  },
  {
    slug: 'prezrve',
    category: 'Platform',
    industry: 'Creator Economy',
    title: 'Prezrve — Find Content Creators',
    url: 'https://www.prezrve.com/',
    domain: 'prezrve.com',
    description:
      'A platform connecting brands with content creators — waitlist onboarding for creators and clients with a clean, focused signup flow.',
    color: 'from-purple-500/20 to-violet-500/10',
    accent: 'text-purple-400',
    border: 'hover:border-purple-500/30',
    tags: ['Website', 'Platform', 'Lead Capture'],
    imageUrl: '',
    featured: false,
  },
  {
    slug: 'tempest-treks',
    category: 'Travel',
    industry: 'Travel & Tourism',
    title: 'Tempest Treks — Kashmir Tour Packages',
    url: 'https://www.tempesttreks.in/',
    domain: 'tempesttreks.in',
    description:
      'Full travel website for Tempest Treks with tour packages, cabs, off-beat destinations, and enquiry flows built to convert visitors into bookings.',
    color: 'from-cyan-500/20 to-sky-500/10',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
    tags: ['Website', 'Tour Packages', 'Booking'],
    imageUrl: '',
    featured: true,
  },
  {
    slug: 'high-tower-tours',
    category: 'Travel',
    industry: 'Travel & Tourism',
    title: 'High Tower Tours & Travels',
    url: 'https://www.hightowertourtravels.in/',
    domain: 'hightowertourtravels.in',
    description:
      'Kashmir & Ladakh travel site with smart tour search, featured packages, cab fleet listings, and WhatsApp booking integration.',
    color: 'from-orange-500/20 to-amber-500/10',
    accent: 'text-orange-400',
    border: 'hover:border-orange-500/30',
    tags: ['Website', 'Smart Search', 'WhatsApp Booking'],
    imageUrl: '',
    featured: false,
  },
  {
    slug: 'wasturwan-travels',
    category: 'Travel',
    industry: 'Travel & Tourism',
    title: 'Wasturwan Travels',
    url: 'https://www.wasturwantravels.com/',
    domain: 'wasturwantravels.com',
    description:
      'An elegant travel brand site for Wasturwan Travels — curated Kashmir experiences, featured packages, and enquiry-driven trip planning.',
    color: 'from-fuchsia-500/20 to-purple-500/10',
    accent: 'text-fuchsia-400',
    border: 'hover:border-fuchsia-500/30',
    tags: ['Website', 'Tour Packages', 'Branding'],
    imageUrl: '',
    featured: false,
  },
];

export const WORK_CATEGORIES = ['All', 'E-Commerce', 'Travel', 'Education', 'Business', 'Platform'] as const;
