export const SITE_ORIGIN = 'https://datacost.co.za';
export const SITE_URL = `${SITE_ORIGIN}/`;
export const DEFAULT_OG_IMAGE_URL = `${SITE_ORIGIN}/og-image.jpg`;
export const SITE_LOGO_URL = `${SITE_ORIGIN}/logo.png`;
export const SITE_BRAND_NAME = 'DataCost.co.za';
export const SITE_PRODUCT_NAME = 'DataCost';

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
