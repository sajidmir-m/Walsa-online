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
    slug: 'techflow',
    name: 'TechFlow',
    industry: 'FinTech',
    color: 'from-blue-500 to-indigo-500',
    logoInitials: 'TF',
    logoSrc: '/images/clients/techflow.svg',
    summary: 'AI-powered risk assessment that transformed underwriting throughput.',
    services: ['AI Agents', 'Machine Learning', 'Cloud Migration'],
    results: [
      { label: 'ROI Increase', value: '340%' },
      { label: 'Throughput', value: '10×' },
      { label: 'Default Rate Drop', value: '42%' },
    ],
    description:
      'We rebuilt TechFlow’s core underwriting engine with real-time machine learning models and autonomous decision agents. The new system processes 10× more applications with the same team while significantly reducing default rates — delivering a 340% ROI within the first year.',
  },
  {
    slug: 'shopwise',
    name: 'ShopWise',
    industry: 'E-Commerce',
    color: 'from-purple-500 to-violet-500',
    logoInitials: 'SW',
    logoSrc: '/images/clients/shopwise.svg',
    summary: 'Predictive supply chain automation that cut inventory costs nearly in half.',
    services: ['Predictive AI', 'Automation', 'SaaS Platform'],
    results: [
      { label: 'Cost Reduction', value: '45%' },
      { label: 'Forecast Horizon', value: '30 Days' },
      { label: 'Stockouts Cut', value: '68%' },
    ],
    description:
      'ShopWise needed smarter inventory decisions. We built an autonomous demand-forecasting system that predicts spikes 30 days ahead and automates supplier ordering — cutting inventory costs by 45% and nearly eliminating stockouts.',
  },
  {
    slug: 'medora',
    name: 'Medora Health',
    industry: 'Healthcare',
    color: 'from-emerald-500 to-teal-500',
    logoInitials: 'MH',
    logoSrc: '/images/clients/medora.svg',
    summary: 'Patient triage AI assistant serving millions with faster care pathways.',
    services: ['AI Chatbots', 'NLP', 'Integrations'],
    results: [
      { label: 'Patients Served', value: '2M+' },
      { label: 'Faster Triage', value: '60%' },
      { label: 'CSAT Score', value: '4.8★' },
    ],
    description:
      'Medora Health partnered with us to deploy an NLP-powered triage assistant that assesses patients before they reach a clinician. Wait times dropped 60%, schedules optimized dynamically, and over 2 million patients have been served to date.',
  },
  {
    slug: 'insightly',
    name: 'Insightly',
    industry: 'SaaS',
    color: 'from-orange-500 to-amber-500',
    logoInitials: 'IN',
    logoSrc: '/images/clients/insightly.svg',
    summary: 'Intelligent analytics dashboard with generative reports and anomaly detection.',
    services: ['Software Development', 'Data Engineering', 'UI/UX'],
    results: [
      { label: 'Faster Reporting', value: '12×' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Time Saved / Week', value: '40 hrs' },
    ],
    description:
      'Insightly’s raw data streams were overwhelming their ops team. We built a real-time analytics platform with generative reports and custom anomaly detection — turning noise into clear decisions 12× faster.',
  },
  {
    slug: 'nova-retail',
    name: 'Nova Retail',
    industry: 'Retail',
    color: 'from-pink-500 to-rose-500',
    logoInitials: 'NR',
    logoSrc: '/images/clients/nova-retail.svg',
    summary: 'Full-funnel digital marketing that tripled online revenue in six months.',
    services: ['Meta Ads', 'SEO', 'Content Marketing', 'Social Media'],
    results: [
      { label: 'Revenue Growth', value: '3×' },
      { label: 'ROAS', value: '220%' },
      { label: 'Organic Traffic', value: '+185%' },
    ],
    description:
      'Nova Retail needed consistent brand presence and measurable growth. We ran integrated SEO, Meta Ads, content creation (30 reels/month), and social management — tripling monthly revenue in under six months with a 220% ROAS.',
  },
  {
    slug: 'learnscape',
    name: 'LearnScape',
    industry: 'EdTech',
    color: 'from-cyan-500 to-sky-500',
    logoInitials: 'LS',
    logoSrc: '/images/clients/learnscape.svg',
    summary: 'Complete UX redesign that dramatically lifted learner engagement.',
    services: ['UI/UX Design', 'Design Systems', 'Mobile Apps'],
    results: [
      { label: 'Engagement Lift', value: '82%' },
      { label: 'App Rating', value: '4.9★' },
      { label: 'Retention', value: '+55%' },
    ],
    description:
      'LearnScape’s learning platform felt dated and confusing. We led a full UX overhaul — research, wireframes, prototypes, and a scalable design system — resulting in an 82% engagement lift and a 4.9★ app rating.',
  },
  {
    slug: 'fleetgo',
    name: 'FleetGo',
    industry: 'Logistics',
    color: 'from-teal-500 to-cyan-500',
    logoInitials: 'FG',
    logoSrc: '/images/clients/fleetgo.svg',
    summary: 'Cross-platform fleet app with real-time tracking and route optimization.',
    services: ['Mobile Development', 'Cloud Infrastructure', 'API Integration'],
    results: [
      { label: 'Fuel Savings', value: '35%' },
      { label: 'Downloads', value: '50K+' },
      { label: 'Dispatch Speed', value: '2×' },
    ],
    description:
      'FleetGo needed a modern driver and dispatch experience. We delivered a React Native app with live GPS, optimized routing, and push alerts — cutting fuel spend 35% and doubling dispatch speed across their fleet.',
  },
  {
    slug: 'brightpath',
    name: 'BrightPath Bank',
    industry: 'FinServ',
    color: 'from-indigo-500 to-blue-500',
    logoInitials: 'BP',
    logoSrc: '/images/clients/brightpath.svg',
    summary: 'Zero-downtime AWS multi-region migration for a legacy banking stack.',
    services: ['Cloud & Infrastructure', 'DevOps', 'Security'],
    results: [
      { label: 'Availability', value: '99.99%' },
      { label: 'Infra Cost Cut', value: '60%' },
      { label: 'Deploy Time', value: 'Minutes' },
    ],
    description:
      'BrightPath Bank migrated from a monolithic on-prem system to a multi-region AWS architecture with full CI/CD. We achieved zero-downtime cutover, 99.99% availability, and a 60% reduction in infrastructure cost.',
  },
];
