const DEFAULT_PUBLISHED_ISO = '2025-01-15T00:00:00.000Z';
const DEFAULT_MODIFIED_ISO = '2026-02-15T00:00:00.000Z';

const STATIC_ROUTE_MODIFIED_ISO: Record<string, string> = {
  '/': '2026-03-25T00:00:00.000Z',
  '/alerts/': '2026-03-30T00:00:00.000Z',
  '/about/': '2026-01-20T00:00:00.000Z',
  '/contact/': '2026-01-20T00:00:00.000Z',
  '/cookie-policy/': '2026-04-08T00:00:00.000Z',
  '/editorial-policy/': '2026-01-20T00:00:00.000Z',
  '/fix-mobile-problems/': '2026-04-01T00:00:00.000Z',
  '/guides/': '2026-03-31T00:00:00.000Z',
  '/methodology/': '2026-01-20T00:00:00.000Z',
  '/mtn-ussd-codes/': '2026-03-31T00:00:00.000Z',
  '/network/': '2026-03-24T00:00:00.000Z',
  '/privacy-policy/': '2026-01-20T00:00:00.000Z',
  '/save-ussd-codes/': '2026-03-30T00:00:00.000Z',
  '/cell-c-ussd-codes/': '2026-03-31T00:00:00.000Z',
  '/telkom-ussd-codes/': '2026-03-31T00:00:00.000Z',
  '/terms/': '2026-01-20T00:00:00.000Z',
  '/travel-sims-south-africa/': '2026-02-18T00:00:00.000Z',
  '/ussd-codes-south-africa/': '2026-04-08T00:00:00.000Z',
  '/vodacom-ussd-codes/': '2026-03-31T00:00:00.000Z'
};

const GUIDE_MODIFIED_BY_SLUG: Record<string, string> = {
  'airtime-data-saving-tips-south-africa': '2026-03-31T00:00:00.000Z',
  'best-data-deals-south-africa': '2026-03-12T00:00:00.000Z',
  'cheap-night-data-south-africa': '2026-03-12T00:00:00.000Z',
  'cheapest-1gb-data-south-africa': '2026-03-18T00:00:00.000Z',
  'convert-airtime-to-data-south-africa': '2026-03-14T00:00:00.000Z',
  'how-to-buy-data-cell-c': '2026-03-10T00:00:00.000Z',
  'how-to-buy-data-mtn': '2026-03-10T00:00:00.000Z',
  'how-to-buy-data-telkom': '2026-03-10T00:00:00.000Z',
  'how-to-buy-data-vodacom': '2026-03-10T00:00:00.000Z',
  'how-to-check-data-balance': '2026-03-16T00:00:00.000Z',
  'how-to-stop-wasp-vas-charges-south-africa': '2026-03-31T00:00:00.000Z',
  'prepaid-vs-contract-south-africa': '2026-03-10T00:00:00.000Z',
  'cheapest-data-south-africa': '2026-04-08T00:00:00.000Z',
  'why-does-my-data-finish-so-fast-south-africa': '2026-03-31T00:00:00.000Z',
  'why-is-my-airtime-disappearing-south-africa': '2026-04-08T00:00:00.000Z',
  'why-is-my-data-finishing-so-fast': '2026-04-16T00:00:00.000Z',
  'why-is-my-data-disappearing-south-africa': '2026-04-16T00:00:00.000Z',
  'how-to-stop-airtime-being-used-automatically': '2026-04-16T00:00:00.000Z',
  'how-to-cancel-subscriptions-mtn-vodacom-telkom': '2026-04-16T00:00:00.000Z',
  'how-to-check-subscriptions-on-mtn': '2026-04-16T00:00:00.000Z',
  'how-to-check-subscriptions-on-vodacom': '2026-04-16T00:00:00.000Z',
  'how-to-stop-wasp-services-south-africa': '2026-04-16T00:00:00.000Z',
  'how-to-protect-airtime-from-being-used': '2026-04-16T00:00:00.000Z',
  'airtime-data-problems-south-africa': '2026-04-16T00:00:00.000Z',
  'why-is-my-data-disappearing-vodacom': '2026-04-16T00:00:00.000Z',
  'why-is-my-data-disappearing-mtn': '2026-04-16T00:00:00.000Z'
};

const COMPARISON_GUIDE_MODIFIED_BY_SLUG: Record<string, string> = {
  'best-monthly-data-deals-south-africa': '2026-03-21T00:00:00.000Z',
  'best-prepaid-data-deals-south-africa': '2026-03-18T00:00:00.000Z',
  'cheap-night-data-south-africa': '2026-03-18T00:00:00.000Z',
  'cheapest-1gb-data-south-africa': '2026-03-18T00:00:00.000Z',
  'cheapest-2gb-data-south-africa': '2026-03-31T00:00:00.000Z',
  'cheapest-5gb-data-south-africa': '2026-03-31T00:00:00.000Z',
  'cheapest-10gb-data-south-africa': '2026-03-19T00:00:00.000Z',
  'cheapest-15gb-data-south-africa': '2026-03-31T00:00:00.000Z',
  'cheapest-20gb-data-south-africa': '2026-03-31T00:00:00.000Z',
  'cheapest-50gb-data-south-africa': '2026-03-31T00:00:00.000Z',
  'cheapest-whatsapp-bundles-south-africa': '2026-03-20T00:00:00.000Z'
};

const NETWORK_MODIFIED_BY_SLUG: Record<string, string> = {
  'cell-c': '2026-03-17T00:00:00.000Z',
  mtn: '2026-03-17T00:00:00.000Z',
  rain: '2026-03-14T00:00:00.000Z',
  telkom: '2026-03-17T00:00:00.000Z',
  vodacom: '2026-03-17T00:00:00.000Z'
};

const BUNDLE_TYPE_MODIFIED_ISO = '2026-03-17T00:00:00.000Z';

function normalizeRoute(route: string): string {
  if (route === '/') return route;
  return route.endsWith('/') ? route : `${route}/`;
}

function isoToDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

function fromMapOrFallback(
  map: Record<string, string>,
  key: string,
  fallback: string = DEFAULT_MODIFIED_ISO
): string {
  return map[key] || fallback;
}

export function getDefaultPublishedIso(): string {
  return DEFAULT_PUBLISHED_ISO;
}

export function getGuideModifiedIso(slug: string): string {
  return fromMapOrFallback(GUIDE_MODIFIED_BY_SLUG, slug, '2026-03-10T00:00:00.000Z');
}

export function getComparisonGuideModifiedIso(slug: string): string {
  return fromMapOrFallback(COMPARISON_GUIDE_MODIFIED_BY_SLUG, slug, '2026-03-18T00:00:00.000Z');
}

export function getNetworkModifiedIso(slug: string): string {
  return fromMapOrFallback(NETWORK_MODIFIED_BY_SLUG, slug, '2026-03-14T00:00:00.000Z');
}

export function getBundleTypeModifiedIso(networkSlug: string): string {
  const networkDate = fromMapOrFallback(NETWORK_MODIFIED_BY_SLUG, networkSlug, BUNDLE_TYPE_MODIFIED_ISO);
  return networkDate > BUNDLE_TYPE_MODIFIED_ISO ? networkDate : BUNDLE_TYPE_MODIFIED_ISO;
}

export function formatIsoForDisplay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getRouteModifiedIso(routeInput: string): string {
  const route = normalizeRoute(routeInput);
  const staticModified = STATIC_ROUTE_MODIFIED_ISO[route];
  if (staticModified) return staticModified;

  if (route.startsWith('/guides/')) {
    const guideSlug = route.replace('/guides/', '').replace(/\/$/, '');
    if (guideSlug === '') {
      return STATIC_ROUTE_MODIFIED_ISO['/guides/'];
    }
    const guideModified = GUIDE_MODIFIED_BY_SLUG[guideSlug] || COMPARISON_GUIDE_MODIFIED_BY_SLUG[guideSlug];
    if (guideModified) return guideModified;
    return '2026-03-10T00:00:00.000Z';
  }

  if (route.startsWith('/network/')) {
    const segments = route.split('/').filter(Boolean);
    if (segments.length === 1) {
      return STATIC_ROUTE_MODIFIED_ISO['/network/'];
    }
    if (segments.length >= 2) {
      const networkSlug = segments[1];
      if (segments.length === 2) {
        return getNetworkModifiedIso(networkSlug);
      }
      return getBundleTypeModifiedIso(networkSlug);
    }
  }

  return DEFAULT_MODIFIED_ISO;
}

export function getRouteLastMod(route: string): string {
  return isoToDateOnly(getRouteModifiedIso(route));
}
