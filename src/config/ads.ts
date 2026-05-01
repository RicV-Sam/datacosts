export type AdPlacement = 'aboveFold' | 'inContent' | 'sidebar' | 'footer' | 'generic' | 'stickyMobile';

const DEFAULT_FREEHUB_PROMO_URL = 'https://freehub.co.za/';

const TRUST_AND_LEGAL_ROUTES = new Set([
  '/privacy-policy/',
  '/terms/',
  '/cookie-policy/',
  '/editorial-policy/',
  '/contact/'
]);

function parseEnvBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') return fallback;
  return value.toLowerCase() === 'true';
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

export const isAdSenseApproved = parseEnvBoolean(import.meta.env.VITE_ADSENSE_APPROVED, false);
export const areManualAdSlotsEnabled = parseEnvBoolean(import.meta.env.VITE_ENABLE_MANUAL_AD_SLOTS, true);

// House ads are temporary fallback promos while AdSense is pending or unfilled.
// Once AdSense is approved, disable house ads; if using Auto ads, disable manual slots too.
export const areHouseAdsEnabled = parseEnvBoolean(import.meta.env.VITE_ENABLE_HOUSE_ADS, !isAdSenseApproved);
export const freehubPromoUrl = import.meta.env.VITE_FREEHUB_PROMO_URL || DEFAULT_FREEHUB_PROMO_URL;

export function isAdRouteExcluded(pathname: string): boolean {
  return TRUST_AND_LEGAL_ROUTES.has(normalizePath(pathname));
}

export function shouldRenderHouseAd(pathname: string, placement: AdPlacement): boolean {
  if (isAdRouteExcluded(pathname)) return false;
  if (!areManualAdSlotsEnabled) return false;
  if (isAdSenseApproved) return false;
  if (!areHouseAdsEnabled) return false;
  if (placement === 'stickyMobile') return false;
  return placement === 'aboveFold';
}

export function shouldReserveManualAdSlot(pathname: string): boolean {
  if (isAdRouteExcluded(pathname)) return false;
  return areManualAdSlotsEnabled && isAdSenseApproved;
}
