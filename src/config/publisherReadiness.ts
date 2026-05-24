export const GOOGLE_PARTNER_DATA_POLICY_URL = 'https://policies.google.com/technologies/partner-sites';

export const GOOGLE_ADVERTISING_DISCLOSURE =
  'Google and other advertising partners may use cookies, web beacons, IP addresses, and similar identifiers to serve ads, measure ad performance, prevent fraud, and understand how users interact with ads on DataCost.';

export const GOOGLE_PARTNER_DATA_LINK_COPY =
  'How Google uses data when you use partners sites or apps';

export const PUBLISHER_CONTENT_MIN_WORDS = 450;

export type PublisherAdPlacement =
  | 'after-first-useful-answer'
  | 'after-primary-content'
  | 'between-independent-sections'
  | 'footer-supplement';

export const PUBLISHER_AD_PLACEMENT_POLICY = [
  'Do not place ads before the first useful answer or primary comparison.',
  'Do not place ads next to navigation, search, USSD dial buttons, form submits, or other action controls.',
  'Do not use overlays, interstitial traps, sticky takeovers, or layouts that hide the content users came for.',
  'Do not render ads on noindex, redirect, legal, contact, sitemap, alerts, or thin utility routes.',
  'Do not make ads visually imitate network cards, correction links, operator buttons, or editorial rankings.'
];

export const ALLOWED_PUBLISHER_AD_PLACEMENTS: PublisherAdPlacement[] = [
  'after-first-useful-answer',
  'after-primary-content',
  'between-independent-sections',
  'footer-supplement'
];

const AD_FREE_EXACT_ROUTES = new Set([
  '/404/',
  '/about/',
  '/alerts/',
  '/contact/',
  '/cookie-policy/',
  '/editorial-policy/',
  '/methodology/',
  '/privacy-policy/',
  '/save-ussd-codes/',
  '/sitemap/',
  '/terms/'
]);

const AD_FREE_PREFIXES = [
  '/fix/',
  '/privacy/',
  '/fix-mobile-problems/',
  '/fix-a-problem/'
];

export function normalizePublisherRoute(routeInput: string): string {
  if (!routeInput || routeInput === '/') return '/';
  const pathname = routeInput.startsWith('http')
    ? new URL(routeInput).pathname
    : routeInput;
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

export function getPublisherAdFreeRoutes(): string[] {
  return [...AD_FREE_EXACT_ROUTES].sort();
}

export function isPublisherAdBlockedRoute(routeInput: string, noindexRoutes: string[] = []): boolean {
  const route = normalizePublisherRoute(routeInput);
  if (AD_FREE_EXACT_ROUTES.has(route)) return true;
  if (AD_FREE_PREFIXES.some((prefix) => route.startsWith(prefix))) return true;

  const noindexRouteSet = new Set(noindexRoutes.map(normalizePublisherRoute));
  return noindexRouteSet.has(route);
}

export function canRenderPublisherAdsOnRoute(routeInput: string, noindexRoutes: string[] = []): boolean {
  return !isPublisherAdBlockedRoute(routeInput, noindexRoutes);
}

export function canRenderPublisherAdPlacement(
  routeInput: string,
  placement: PublisherAdPlacement,
  noindexRoutes: string[] = []
): boolean {
  return canRenderPublisherAdsOnRoute(routeInput, noindexRoutes) && ALLOWED_PUBLISHER_AD_PLACEMENTS.includes(placement);
}
