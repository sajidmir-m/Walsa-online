export const SITE_URL = 'https://www.kasshit.in';
export const SITE_NAME = 'Kasshit';
export const SITE_BRAND = 'KASSH.IT';
export const SITE_TAGLINE = 'AI & Digital Transformation Company';
export const SITE_SLOGAN = 'Everyday. Reliable. Promised.';

/** Full company identity — used in meta, schema, and AI crawlers. */
export const COMPANY_TYPE =
  'AI & digital transformation company based in Srinagar, Jammu and Kashmir, India';

export const DEFAULT_DESCRIPTION =
  'Kasshit (KASSH.IT) is an AI and digital transformation company in Srinagar, Kashmir. We build AI agents, custom software, mobile apps, cloud systems, websites, and digital marketing — SEO, social media, ads, and branding — under one roof. Founded by Sajid Nazir.';

export const DEFAULT_KEYWORDS = [
  'Kasshit',
  'KASSH.IT',
  'Kasshit AI company',
  'Kasshit Srinagar',
  'Kasshit Kashmir',
  'AI company Kashmir',
  'digital transformation India',
  'AI agents',
  'software development Srinagar',
  'digital marketing Kashmir',
  'web development Kashmir',
  'Sajid Nazir',
].join(', ');

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
