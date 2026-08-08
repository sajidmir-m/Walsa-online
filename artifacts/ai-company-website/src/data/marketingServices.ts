import {
  Share2,
  Video,
  Palette,
  Sparkles,
  MapPin,
  Search,
  Target,
  Crosshair,
  LineChart,
  type LucideIcon,
} from 'lucide-react';

export interface MarketingServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  accent: string;
}

/** One entry per PDF section — each gets its own detail page. */
export const marketingServices: MarketingServiceItem[] = [
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    shortTitle: 'Social Media',
    tagline: 'Daily management that grows your brand presence',
    description:
      'Complete Instagram & Facebook account management by our team — from content calendars and captions to engagement and consistent brand growth.',
    items: [
      'Complete Instagram & Facebook account management',
      'Daily account handling by our team',
      'Content planning and monthly content calendar',
      'Profile optimization',
      'Caption writing and hashtag research',
      'Audience engagement strategy',
      'Page growth and brand consistency',
    ],
    icon: Share2,
    accent: 'purple',
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    shortTitle: 'Content Creation',
    tagline: '30 professional reels and videos every month',
    description:
      'From shooting and editing to trending reel concepts — we create the content that makes your brand show up and convert.',
    items: [
      '30 Professional Reels per Month',
      'Professional video shooting',
      'High-quality video editing',
      'Creative scripting and content planning',
      'Trending reel concepts',
      'Product showcase videos',
      'Promotional videos',
      'Festival and seasonal content',
      'Behind-the-scenes content',
      'Educational and brand awareness content',
    ],
    icon: Video,
    accent: 'fuchsia',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortTitle: 'Graphic Design',
    tagline: 'Creatives that stop the scroll',
    description:
      'Professional post, story, carousel, and promotional designs that keep your brand visually sharp across every platform.',
    items: [
      'Professional Canva post designs',
      'Carousel posts',
      'Story designs',
      'Offer and promotional creatives',
      'Festival creatives',
      'Product posters',
      'Highlight cover designs',
    ],
    icon: Palette,
    accent: 'pink',
  },
  {
    slug: 'branding',
    title: 'Branding',
    shortTitle: 'Branding',
    tagline: 'Identity, messaging, and creative direction',
    description:
      'We develop and maintain a clear brand identity — colors, typography, messaging, and creative direction — so every touchpoint feels consistent.',
    items: [
      'Brand identity development',
      'Visual branding',
      'Brand color and typography consistency',
      'Brand messaging',
      'Creative direction',
    ],
    icon: Sparkles,
    accent: 'rose',
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile (GMB)',
    shortTitle: 'Google Business Profile',
    tagline: 'Show up on Google Maps and local search',
    description:
      'Complete Google Business Profile setup and ongoing optimization so customers find you on Maps, see your posts, and trust your reviews.',
    items: [
      'Complete profile setup and optimization',
      'Business information updates',
      'Photo uploads',
      'Google Posts',
      'Review management guidance',
      'Google Maps visibility improvement',
    ],
    icon: MapPin,
    accent: 'emerald',
  },
  {
    slug: 'local-seo',
    title: 'Local SEO',
    shortTitle: 'Local SEO',
    tagline: 'Rank where your customers search locally',
    description:
      'Local keyword research, Maps optimization, and listing improvements so your business ranks when nearby customers are looking for you.',
    items: [
      'Local keyword research',
      'Google Maps optimization',
      'Business listing optimization',
      'Local search ranking improvements',
      'Competitor analysis',
    ],
    icon: Search,
    accent: 'cyan',
  },
  {
    slug: 'meta-advertising',
    title: 'Meta Advertising',
    shortTitle: 'Meta Ads',
    tagline: 'Facebook & Instagram ads that generate leads',
    description:
      'Targeted Facebook & Instagram campaigns — lead gen, remarketing, creative management, and continuous optimization for better ROAS.',
    items: [
      'Facebook & Instagram Ads',
      'Audience targeting',
      'Lead generation campaigns',
      'Remarketing campaigns',
      'Campaign optimization',
      'Ad creative management',
    ],
    icon: Target,
    accent: 'violet',
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    shortTitle: 'Google Ads',
    tagline: 'Search campaigns that convert intent into customers',
    description:
      'Search campaign setup, keyword research, ad copy, and conversion-focused management so you capture high-intent traffic on Google.',
    items: [
      'Search campaign setup',
      'Keyword research',
      'Ad copywriting',
      'Campaign management',
      'Conversion optimization',
    ],
    icon: Crosshair,
    accent: 'blue',
  },
  {
    slug: 'marketing-strategy',
    title: 'Marketing Strategy',
    shortTitle: 'Marketing Strategy',
    tagline: 'Monthly plans, offers, and performance insights',
    description:
      'Competitor research, monthly strategy, campaign and offer planning, plus reporting with clear recommendations so growth stays intentional.',
    items: [
      'Competitor research',
      'Monthly marketing strategy',
      'Campaign planning',
      'Offer planning',
      'Performance monitoring',
      'Monthly reporting with insights and recommendations',
    ],
    icon: LineChart,
    accent: 'indigo',
  },
];

export function getMarketingService(slug: string): MarketingServiceItem | undefined {
  return marketingServices.find((s) => s.slug === slug);
}
