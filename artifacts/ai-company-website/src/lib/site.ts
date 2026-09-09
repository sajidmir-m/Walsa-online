export const SITE_URL = 'https://www.kasshit.in';
export const SITE_NAME = 'Kasshit';
export const SITE_TAGLINE = 'AI & Digital Transformation';
export const DEFAULT_DESCRIPTION =
  'Kasshit builds AI agents, custom software, mobile apps, cloud systems, and growth marketing — technology and marketing under one roof.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
