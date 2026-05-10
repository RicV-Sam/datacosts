export const SITE_ORIGIN = 'https://datacost.co.za';
export const SITE_URL = `${SITE_ORIGIN}/`;
export const DEFAULT_OG_IMAGE_URL = `${SITE_ORIGIN}/og-image.jpg`;
export const SITE_LOGO_URL = `${SITE_ORIGIN}/logo.png`;
export const SITE_BRAND_NAME = 'DataCost.co.za';
export const SITE_PRODUCT_NAME = 'DataCost';
export const SITE_EDITOR_NAME = 'Riccardo Vallaro';
export const SITE_EDITOR_ROLE = 'Telecom & Mobile Services Specialist';
export const SITE_EDITOR_BIO =
  'Mobile services and telecom professional with experience across VAS, carrier billing, mobile content, and African operator partnerships.';
export const SITE_EDITOR_TRUST_SUMMARY =
  'Guides are based on public operator pricing, USSD flows, official support pages, and South African prepaid user needs.';

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, '');
  return `${trimmed}/`;
}

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${normalizePath(path)}`;
}

export function toCanonicalUrl(path: string): string {
  return toAbsoluteUrl(path);
}
