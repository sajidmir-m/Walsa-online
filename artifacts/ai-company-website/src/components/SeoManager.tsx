import { useEffect } from 'react';
import { useLocation } from 'wouter';
import {
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_KEYWORDS,
  absoluteUrl,
} from '@/lib/site';

type PageSeo = {
  title: string;
  description: string;
  noindex?: boolean;
};

const ROUTES: Record<string, PageSeo> = {
  '/': {
    title: `${SITE_NAME} — ${SITE_TAGLINE} | Srinagar, Kashmir`,
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: `About Kasshit — AI & Digital Transformation Company | Srinagar`,
    description:
      'Kasshit (KASSH.IT) is an AI and digital transformation company in Srinagar, Kashmir, founded by Sajid Nazir. Technology and marketing under one roof.',
  },
  '/work': {
    title: `Our Work — Kasshit | Live Projects & Websites`,
    description:
      'Explore live websites and platforms Kasshit has shipped for e-commerce, travel, education, and business brands across Kashmir and India.',
  },
  '/clients': {
    title: `Clients — Kasshit | Brands We Work With`,
    description: 'Case studies and results from brands that partner with Kasshit for AI, software, and digital marketing.',
  },
  '/services': {
    title: `Services — Kasshit | AI, Software & Digital Marketing`,
    description:
      'Kasshit services: AI agents, software development, mobile apps, UI/UX, cloud, and digital marketing in Srinagar, Kashmir.',
  },
  '/services/ai': {
    title: `AI Services — Kasshit | AI Agents & Automation`,
    description: 'Production-grade AI agents, voice interfaces, and intelligent automation by Kasshit in Kashmir, India.',
  },
  '/services/software': {
    title: `Software Development — Kasshit | Custom Web & Apps`,
    description: 'Custom websites, web apps, dashboards, CRM, and ERP systems engineered by Kasshit.',
  },
  '/services/mobile': {
    title: `Mobile Apps — Kasshit | Android & Cross-Platform`,
    description: 'Native and cross-platform mobile apps designed and built by Kasshit.',
  },
  '/services/uiux': {
    title: `UI/UX Design — Kasshit`,
    description: 'Product design, wireframes, and brand-first interfaces from Kasshit.',
  },
  '/services/cloud': {
    title: `Cloud & DevOps — Kasshit`,
    description: 'AWS, Azure, CI/CD, and cloud architecture managed by Kasshit.',
  },
  '/services/marketing': {
    title: `Digital Marketing — Kasshit | SEO, Ads & Social`,
    description:
      'Social media, content, SEO, ads, and marketing strategy managed end-to-end by Kasshit in Srinagar, Kashmir.',
  },
};

const MARKETING_TITLES: Record<string, string> = {
  'social-media-management': 'Social Media Management',
  'content-creation': 'Content Creation',
  'graphic-design': 'Graphic Design',
  branding: 'Branding',
  'google-business-profile': 'Google Business Profile',
  'local-seo': 'Local SEO',
  'meta-advertising': 'Meta Advertising',
  'google-ads': 'Google Ads',
  'marketing-strategy': 'Marketing Strategy',
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function resolveSeo(path: string): PageSeo {
  if (path.startsWith('/admin')) {
    return {
      title: `Admin — ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      noindex: true,
    };
  }

  const marketingMatch = path.match(/^\/services\/marketing\/([^/]+)\/?$/);
  if (marketingMatch) {
    const slug = marketingMatch[1];
    const label = MARKETING_TITLES[slug] ?? slug.replace(/-/g, ' ');
    return {
      title: `${label} — ${SITE_NAME}`,
      description: `${label} managed end-to-end by Kasshit — planning, execution, and growth.`,
    };
  }

  const normalized = path.replace(/\/$/, '') || '/';
  return (
    ROUTES[normalized] ?? {
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: DEFAULT_DESCRIPTION,
    }
  );
}

/** Keeps title, description, canonical, and social tags in sync with the current route. */
export default function SeoManager() {
  const [location] = useLocation();

  useEffect(() => {
    const seo = resolveSeo(location);
    const url = absoluteUrl(location === '/' ? '/' : location.replace(/\/$/, ''));

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'keywords', DEFAULT_KEYWORDS);
    upsertMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
  }, [location]);

  return null;
}
