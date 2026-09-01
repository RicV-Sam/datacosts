const DEFAULT_PUBLISHED_ISO = '2025-01-15T00:00:00.000Z';
const DEFAULT_MODIFIED_ISO = '2026-02-15T00:00:00.000Z';
const PUBLISHER_REVIEW_MODIFIED_ISO = '2026-05-24T00:00:00.000Z';
const FIBRE_REVIEW_MODIFIED_ISO = '2026-08-06T00:00:00.000Z';
const PRICING_AUDIT_MODIFIED_ISO = '2026-09-01T00:00:00.000Z';
const EDITORIAL_AUDIT_MODIFIED_ISO = '2026-09-01T00:00:00.000Z';
const MONTHLY_DEAL_REVIEW_MODIFIED_ISO = '2026-09-01T00:00:00.000Z';

const STATIC_ROUTE_MODIFIED_ISO: Record<string, string> = {
  '/': PRICING_AUDIT_MODIFIED_ISO,
  '/alerts/': '2026-05-10T00:00:00.000Z',
  '/about/': '2026-08-01T00:00:00.000Z',
  '/airtime-advance-codes/': PRICING_AUDIT_MODIFIED_ISO,
  '/contact/': '2026-05-10T00:00:00.000Z',
  '/cookie-policy/': PUBLISHER_REVIEW_MODIFIED_ISO,
  '/editorial-policy/': '2026-05-10T00:00:00.000Z',
  '/best-data-deals-south-africa/': MONTHLY_DEAL_REVIEW_MODIFIED_ISO,
  '/best-10gb-data-deals-south-africa/': MONTHLY_DEAL_REVIEW_MODIFIED_ISO,
  '/best-20gb-data-deals-south-africa/': MONTHLY_DEAL_REVIEW_MODIFIED_ISO,
  '/best-30gb-data-deals-south-africa/': MONTHLY_DEAL_REVIEW_MODIFIED_ISO,
  '/buy-data-airtime-south-africa/': '2026-06-18T00:00:00.000Z',
  '/fibre/': EDITORIAL_AUDIT_MODIFIED_ISO,
  '/fibre/cheapest-fibre-packages-south-africa/': FIBRE_REVIEW_MODIFIED_ISO,
  '/fibre/prepaid-fibre-south-africa/': FIBRE_REVIEW_MODIFIED_ISO,
  '/fibre/fibre-vs-lte-south-africa/': EDITORIAL_AUDIT_MODIFIED_ISO,
  '/fibre/fibre-vs-rain-5g-south-africa/': EDITORIAL_AUDIT_MODIFIED_ISO,
  '/fibre/how-to-check-fibre-coverage-south-africa/': FIBRE_REVIEW_MODIFIED_ISO,
  '/fibre/fibre-installation-costs-south-africa/': FIBRE_REVIEW_MODIFIED_ISO,
  '/fibre/coverage-by-area/': FIBRE_REVIEW_MODIFIED_ISO,
  '/fix/': '2026-07-24T00:00:00.000Z',
  '/guides/': PRICING_AUDIT_MODIFIED_ISO,
  '/methodology/': '2026-08-01T00:00:00.000Z',
  '/mtn-ussd-codes/': PRICING_AUDIT_MODIFIED_ISO,
  '/network/': PRICING_AUDIT_MODIFIED_ISO,
  '/privacy-policy/': PUBLISHER_REVIEW_MODIFIED_ISO,
  '/promos/': '2026-06-18T00:00:00.000Z',
  '/save-ussd-codes/': PRICING_AUDIT_MODIFIED_ISO,
  '/sitemap/': '2026-09-01T00:00:00.000Z',
  '/cell-c-ussd-codes/': PRICING_AUDIT_MODIFIED_ISO,
  '/telkom-ussd-codes/': PRICING_AUDIT_MODIFIED_ISO,
  '/terms/': '2026-05-10T00:00:00.000Z',
  '/trust/': PUBLISHER_REVIEW_MODIFIED_ISO,
  '/travel-sims-south-africa/': EDITORIAL_AUDIT_MODIFIED_ISO,
  '/ussd-codes-south-africa/': PRICING_AUDIT_MODIFIED_ISO,
  '/vodacom-ussd-codes/': PRICING_AUDIT_MODIFIED_ISO
};

const DATA_PROBLEM_ROUTE_MODIFIED_ISO: Record<string, string> = {
  '/data-problems/how-to-check-data-balance-vodacom-ussd/': '2026-07-30T00:00:00.000Z',
  '/data-problems/how-to-check-wasp-subscriptions-mtn/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-check-wasp-subscriptions-vodacom/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-airtime-disappearing-cell-c/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-airtime-disappearing-mtn/': '2026-04-18T00:00:00.000Z',
  '/data-problems/how-to-stop-airtime-disappearing-telkom/': '2026-07-18T00:00:00.000Z',
  '/data-problems/how-to-stop-airtime-disappearing-vodacom/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-apps-using-data-in-background-samsung/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-background-data-usage-android/': '2026-07-18T00:00:00.000Z',
  '/data-problems/how-to-stop-data-disappearing-cell-c/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-data-disappearing-mtn/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-data-disappearing-telkom/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-data-disappearing-vodacom/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-wasp-charges-cell-c/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-wasp-charges-mtn/': '2026-04-18T00:00:00.000Z',
  '/data-problems/how-to-stop-wasp-charges-telkom/': '2026-04-19T00:00:00.000Z',
  '/data-problems/how-to-stop-wasp-charges-vodacom/': '2026-04-18T00:00:00.000Z',
  '/data-problems/why-does-my-data-run-out-so-fast-cell-c/': '2026-04-19T00:00:00.000Z',
  '/data-problems/why-does-my-data-run-out-so-fast-mtn/': '2026-04-19T00:00:00.000Z',
  '/data-problems/why-does-my-data-run-out-so-fast-telkom/': '2026-07-18T00:00:00.000Z',
  '/data-problems/why-is-my-airtime-disappearing-cell-c/': '2026-05-02T00:00:00.000Z',
  '/data-problems/why-is-my-airtime-disappearing-mtn-prepaid/': '2026-04-19T00:00:00.000Z',
  '/data-problems/why-is-my-airtime-disappearing-telkom/': '2026-05-02T00:00:00.000Z',
  '/data-problems/why-is-my-airtime-disappearing-vodacom-prepaid/': '2026-04-19T00:00:00.000Z',
  '/data-problems/why-is-my-data-disappearing-cell-c/': '2026-05-02T00:00:00.000Z',
  '/data-problems/why-is-my-data-disappearing-mtn/': '2026-04-18T00:00:00.000Z',
  '/data-problems/why-is-my-data-disappearing-overnight-android/': '2026-04-19T00:00:00.000Z',
  '/data-problems/why-is-my-data-disappearing-telkom/': '2026-05-02T00:00:00.000Z',
  '/data-problems/why-is-my-data-disappearing-vodacom/': '2026-08-01T00:00:00.000Z'
};

const FIX_ROUTE_MODIFIED_ISO: Record<string, string> = {
  '/fix/cell-c-data-not-working/': '2026-07-30T00:00:00.000Z',
  '/fix/huawei-router-login-192-168-8-1/': '2026-07-24T00:00:00.000Z',
  '/fix/lte-router-red-light-no-internet/': '2026-07-30T00:00:00.000Z',
  '/fix/mtn-data-balance-check/': '2026-06-25T00:00:00.000Z',
  '/fix/telkom-data-balance-check/': '2026-06-25T00:00:00.000Z'
};

const GUIDE_MODIFIED_BY_SLUG: Record<string, string> = {
  'airtime-data-saving-tips-south-africa': '2026-07-30T00:00:00.000Z',
  'best-data-deals-south-africa': MONTHLY_DEAL_REVIEW_MODIFIED_ISO,
  'cheap-night-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-1gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'convert-airtime-to-data-south-africa': '2026-08-02T00:00:00.000Z',
  'buy-data-with-bank-apps-south-africa': '2026-06-18T00:00:00.000Z',
  'check-router-sim-data-balance-and-recharge': '2026-07-12T00:00:00.000Z',
  'stolen-phone-south-africa': '2026-07-12T00:00:00.000Z',
  'airtime-or-data-south-africa': '2026-07-15T00:00:00.000Z',
  'how-to-cancel-cellphone-contract-south-africa': '2026-08-06T00:00:00.000Z',
  'what-to-do-when-cellphone-contract-ends-south-africa': '2026-07-19T00:00:00.000Z',
  'cellphone-retention-offer-vs-switching-south-africa': '2026-07-19T00:00:00.000Z',
  'how-to-buy-data-cell-c': '2026-08-02T00:00:00.000Z',
  'how-to-buy-data-mtn': '2026-08-01T00:00:00.000Z',
  'how-to-buy-data-telkom': '2026-08-02T00:00:00.000Z',
  'how-to-buy-data-vodacom': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-check-data-balance': '2026-08-01T00:00:00.000Z',
  'how-to-check-mtn-data-balance': '2026-08-13T00:00:00.000Z',
  'how-to-check-mtn-airtime-balance': '2026-07-30T00:00:00.000Z',
  'how-to-check-vodacom-airtime-balance': '2026-07-09T00:00:00.000Z',
  'how-to-stop-wasp-vas-charges-south-africa': '2026-05-10T00:00:00.000Z',
  'stop-wasp-subscriptions-south-africa': '2026-08-02T00:00:00.000Z',
  'out-of-bundle-data-costs-south-africa': '2026-05-01T00:00:00.000Z',
  'prepaid-vs-contract-south-africa': '2026-08-27T00:00:00.000Z',
  'cheapest-data-south-africa': '2026-08-01T00:00:00.000Z',
  'cheapest-unlimited-data-south-africa': '2026-08-01T00:00:00.000Z',
  'best-sim-only-deals-south-africa': '2026-09-01T00:00:00.000Z',
  'mvnos-south-africa': '2026-09-01T00:00:00.000Z',
  'vodacom-vs-mtn-data-prices': EDITORIAL_AUDIT_MODIFIED_ISO,
  'why-does-my-data-finish-so-fast-south-africa': '2026-05-10T00:00:00.000Z',
  'why-is-my-airtime-disappearing-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'why-is-my-data-finishing-so-fast': PRICING_AUDIT_MODIFIED_ISO,
  'why-is-my-data-disappearing-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-stop-airtime-being-used-automatically': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-cancel-subscriptions-mtn-vodacom-telkom': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-check-subscriptions-on-mtn': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-check-subscriptions-on-vodacom': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-stop-wasp-services-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'how-to-protect-airtime-from-being-used': PRICING_AUDIT_MODIFIED_ISO,
  'airtime-data-problems-south-africa': '2026-08-13T00:00:00.000Z',
  'why-is-my-data-disappearing-vodacom': '2026-08-01T00:00:00.000Z',
  'why-is-my-data-disappearing-mtn': '2026-08-01T00:00:00.000Z'
};

const COMPARISON_GUIDE_MODIFIED_BY_SLUG: Record<string, string> = {
  'best-monthly-data-deals-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'best-prepaid-data-deals-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheap-night-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-1gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-2gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-5gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-10gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-15gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-20gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-50gb-data-south-africa': PRICING_AUDIT_MODIFIED_ISO,
  'cheapest-whatsapp-bundles-south-africa': PRICING_AUDIT_MODIFIED_ISO
};

const NETWORK_MODIFIED_BY_SLUG: Record<string, string> = {
  'cell-c': PRICING_AUDIT_MODIFIED_ISO,
  mtn: PRICING_AUDIT_MODIFIED_ISO,
  rain: PRICING_AUDIT_MODIFIED_ISO,
  telkom: PRICING_AUDIT_MODIFIED_ISO,
  vodacom: PRICING_AUDIT_MODIFIED_ISO
};

const NETWORK_PAGE_MODIFIED_BY_SLUG: Record<string, string> = {
  'cell-c': PRICING_AUDIT_MODIFIED_ISO,
  mtn: PRICING_AUDIT_MODIFIED_ISO,
  rain: PRICING_AUDIT_MODIFIED_ISO,
  telkom: PRICING_AUDIT_MODIFIED_ISO,
  vodacom: PRICING_AUDIT_MODIFIED_ISO
};

const NETWORK_USSD_MODIFIED_BY_SLUG: Record<string, string> = {
  'cell-c': PRICING_AUDIT_MODIFIED_ISO,
  mtn: PRICING_AUDIT_MODIFIED_ISO,
  rain: PRICING_AUDIT_MODIFIED_ISO,
  telkom: PRICING_AUDIT_MODIFIED_ISO,
  vodacom: PRICING_AUDIT_MODIFIED_ISO
};

const BUNDLE_TYPE_MODIFIED_ISO = '2026-07-30T00:00:00.000Z';

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

export function getNetworkPageModifiedIso(slug: string): string {
  return fromMapOrFallback(NETWORK_PAGE_MODIFIED_BY_SLUG, slug, getNetworkModifiedIso(slug));
}

export function getNetworkUssdModifiedIso(slug: string): string {
  return fromMapOrFallback(NETWORK_USSD_MODIFIED_BY_SLUG, slug, getNetworkPageModifiedIso(slug));
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
        return getNetworkPageModifiedIso(networkSlug);
      }
      return getBundleTypeModifiedIso(networkSlug);
    }
  }

  if (route.startsWith('/data-problems/')) {
    const dataProblemModifiedIso = fromMapOrFallback(DATA_PROBLEM_ROUTE_MODIFIED_ISO, route, DEFAULT_MODIFIED_ISO);
    // Sitemap/Article modification can post-date the source-guidance review shown
    // from JSON on the page; do not present this publisher pass as a new review date.
    return dataProblemModifiedIso > PUBLISHER_REVIEW_MODIFIED_ISO
      ? dataProblemModifiedIso
      : PUBLISHER_REVIEW_MODIFIED_ISO;
  }

  if (route.startsWith('/fibre/')) {
    return FIBRE_REVIEW_MODIFIED_ISO;
  }

  if (route.startsWith('/fix/')) {
    const fixModifiedIso = FIX_ROUTE_MODIFIED_ISO[route];
    if (fixModifiedIso) return fixModifiedIso;
    return PUBLISHER_REVIEW_MODIFIED_ISO;
  }

  return DEFAULT_MODIFIED_ISO;
}

export function getRouteLastMod(route: string): string {
  return isoToDateOnly(getRouteModifiedIso(route));
}
