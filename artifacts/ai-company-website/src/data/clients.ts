export interface Client {
  slug: string;
  name: string;
  industry: string;
  color: string;
  logoInitials: string;
  /** Path under /public — swap for a real PNG/SVG anytime */
  logoSrc: string;
  summary: string;
  services: string[];
  results: { label: string; value: string }[];
  description: string;
}

export const clients: Client[] = [
  {
    slug: 'elanpro',
    name: 'Elanpro',
    industry: 'Professional Services',
    color: 'from-blue-500 to-indigo-500',
    logoInitials: 'EP',
    logoSrc: '/images/clients/elanpro.svg',
    summary: 'A modern business website paired with a custom AI agent for customer engagement.',
    services: ['Website Development', 'AI Agents', 'Chatbot & Automation'],
    results: [
      { label: 'Website', value: 'Delivered' },
      { label: 'AI Agent', value: 'Deployed' },
      { label: 'Support', value: '24/7' },
    ],
    description:
      'Kasshit designed and built a modern, conversion-focused website for Elanpro and deployed a custom AI agent to handle customer queries and lead capture around the clock.',
  },
  {
    slug: 'prezrve',
    name: 'Prezrve',
    industry: 'Business Services',
    color: 'from-purple-500 to-violet-500',
    logoInitials: 'PZ',
    logoSrc: '/images/clients/prezrve.svg',
    summary: 'End-to-end website build with an AI-powered bot to streamline customer support.',
    services: ['Website Development', 'AI Agents', 'Chatbot & Automation'],
    results: [
      { label: 'Website', value: 'Delivered' },
      { label: 'AI Bot', value: 'Live' },
      { label: 'Response Time', value: 'Instant' },
    ],
    description:
      'We built Prezrve a professional website from the ground up and integrated an AI-powered bot that automates customer support and everyday operational queries.',
  },
  {
    slug: 'stepup',
    name: 'StepUp',
    industry: 'Business Growth',
    color: 'from-emerald-500 to-teal-500',
    logoInitials: 'SU',
    logoSrc: '/images/clients/stepup.svg',
    summary: 'A performance-driven website and AI agent built to support customer growth journeys.',
    services: ['Website Development', 'AI Agents', 'Chatbot & Automation'],
    results: [
      { label: 'Website', value: 'Delivered' },
      { label: 'AI Agent', value: 'Deployed' },
      { label: 'Automation', value: 'Live' },
    ],
    description:
      'StepUp partnered with Kasshit for a full website build and a dedicated AI agent that engages visitors, answers questions, and guides them toward conversion.',
  },
  {
    slug: 'dna-networks',
    name: 'DNA Networks',
    industry: 'Networking & IT Services',
    color: 'from-orange-500 to-amber-500',
    logoInitials: 'DN',
    logoSrc: '/images/clients/dna-networks.svg',
    summary: 'Website development and an AI chatbot built to support networking & IT service inquiries.',
    services: ['Website Development', 'AI Agents', 'Chatbot & Automation'],
    results: [
      { label: 'Website', value: 'Delivered' },
      { label: 'AI Chatbot', value: 'Live' },
      { label: 'Support', value: '24/7' },
    ],
    description:
      'Kasshit delivered a professional website for DNA Networks along with an AI chatbot that handles service inquiries and routes leads to the right team instantly.',
  },
  {
    slug: 'class17',
    name: 'Class17',
    industry: 'Education & Training',
    color: 'from-pink-500 to-rose-500',
    logoInitials: 'C17',
    logoSrc: '/images/clients/class17.svg',
    summary: 'A custom website and AI agent designed to support student and customer engagement.',
    services: ['Website Development', 'AI Agents', 'Chatbot & Automation'],
    results: [
      { label: 'Website', value: 'Delivered' },
      { label: 'AI Agent', value: 'Deployed' },
      { label: 'Engagement', value: 'Automated' },
    ],
    description:
      'We built Class17 a custom website and an AI agent that answers common questions instantly and keeps students and customers engaged around the clock.',
  },
  {
    slug: 'travel-agencies',
    name: 'Travel Agencies',
    industry: 'Travel & Tourism',
    color: 'from-cyan-500 to-sky-500',
    logoInitials: 'TA',
    logoSrc: '/images/clients/travel-agencies.svg',
    summary: 'Website development and AI booking assistants built for travel agency partners.',
    services: ['Website Development', 'AI Agents', 'Chatbot & Automation'],
    results: [
      { label: 'Websites', value: 'Delivered' },
      { label: 'AI Assistant', value: 'Deployed' },
      { label: 'Bookings', value: 'Automated' },
    ],
    description:
      'Kasshit builds websites and AI booking assistants for travel agency partners — helping travelers get instant answers and smoother booking experiences.',
  },
];
