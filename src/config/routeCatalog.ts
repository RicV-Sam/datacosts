import { bundles } from '../data';
import { networkPages } from '../data/networks';
import { guides } from '../data/guides';
import { Bundle } from '../types';
import { SITE_ORIGIN } from '../seo/siteConstants';

export const BASE_URL = SITE_ORIGIN;

export type BundleTypeConfig = {
  label: string;
  filter: (bundle: Bundle) => boolean;
  guideSlug?: string;
};

const isDailyBundle = (bundle: Bundle) =>
  bundle.type === 'Daily' ||
  (bundle.validity.toLowerCase().includes('day') &&
    !bundle.validity.toLowerCase().includes('7 day') &&
    !bundle.validity.toLowerCase().includes('30 day'));
const isWeeklyBundle = (bundle: Bundle) =>
  bundle.type === 'Weekly' || bundle.validity.toLowerCase().includes('week') || bundle.validity.toLowerCase().includes('7 day');
const isMonthlyBundle = (bundle: Bundle) =>
  bundle.type === 'Monthly' || bundle.validity.toLowerCase().includes('30 day') || bundle.validity.toLowerCase().includes('month');
const isNightBundle = (bundle: Bundle) =>
  bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== '');
const isSocialBundle = (bundle: Bundle) =>
  bundle.type === 'Social' ||
  bundle.name.toLowerCase().includes('whatsapp') ||
  bundle.name.toLowerCase().includes('social');

export const BUNDLE_TYPE_MAP: Record<string, BundleTypeConfig> = {
  'cheapest-1gb': {
    label: 'Cheapest 1GB',
    filter: (bundle) => bundle.volume === '1GB' && !isSocialBundle(bundle),
    guideSlug: 'cheapest-1gb-data-south-africa'
  },
  '1gb': {
    label: 'Cheapest 1GB',
    filter: (bundle) => bundle.volume === '1GB' && !isSocialBundle(bundle),
    guideSlug: 'cheapest-1gb-data-south-africa'
  },
  '2gb': {
    label: '2GB',
    filter: (bundle) => bundle.volume === '2GB'
  },
  '5gb': {
    label: '5GB',
    filter: (bundle) => bundle.volume === '5GB'
  },
  '10gb': {
    label: '10GB',
    filter: (bundle) => bundle.volume === '10GB'
  },
  'daily-data': {
    label: 'Daily',
    filter: (bundle) => isDailyBundle(bundle) && !isNightBundle(bundle) && !isSocialBundle(bundle)
  },
  'weekly-data': {
    label: 'Weekly',
    filter: (bundle) => isWeeklyBundle(bundle) && !isSocialBundle(bundle)
  },
  'monthly-data': {
    label: 'Monthly',
    filter: (bundle) => isMonthlyBundle(bundle) && !isNightBundle(bundle) && !isSocialBundle(bundle)
  },
  'night-data': {
    label: 'Night',
    filter: (bundle) => isNightBundle(bundle),
    guideSlug: 'cheap-night-data-south-africa'
  },
  'social-data': {
    label: 'Social',
    filter: (bundle) => isSocialBundle(bundle)
  }
};

const PHASE1_FILTER_ROUTES: Array<{ network: string; bundleType: string }> = [
  { network: 'vodacom', bundleType: 'cheapest-1gb' },
  { network: 'vodacom', bundleType: 'daily-data' },
  { network: 'vodacom', bundleType: 'monthly-data' },
  { network: 'vodacom', bundleType: 'night-data' },
  { network: 'mtn', bundleType: 'cheapest-1gb' },
  { network: 'mtn', bundleType: 'daily-data' },
  { network: 'mtn', bundleType: 'monthly-data' },
  { network: 'mtn', bundleType: 'night-data' },
  { network: 'telkom', bundleType: 'cheapest-1gb' },
  { network: 'telkom', bundleType: 'daily-data' },
  { network: 'telkom', bundleType: 'monthly-data' },
  { network: 'cell-c', bundleType: 'cheapest-1gb' },
  { network: 'cell-c', bundleType: 'daily-data' },
  { network: 'cell-c', bundleType: 'monthly-data' }
];

function normalizeCanonicalPath(path: string): string {
  if (!path.startsWith('/')) {
    throw new Error(`Route must start with "/": ${path}`);
  }

  if (path === '/') {
    return path;
  }

  const trimmed = path.replace(/\/+$/, '');
  return `${trimmed}/`;
}

export function getIndexableRoutes(): string[] {
  const routes = new Set<string>();

  routes.add('/');
  routes.add('/ussd-codes-south-africa/');
  routes.add('/mtn-ussd-codes/');
  routes.add('/vodacom-ussd-codes/');
  routes.add('/telkom-ussd-codes/');
  routes.add('/cell-c-ussd-codes/');
  routes.add('/save-ussd-codes/');
  routes.add('/alerts/');
  routes.add('/guides/');
  routes.add('/network/');
  routes.add('/privacy-policy/');
  routes.add('/terms/');
  routes.add('/about/');
  routes.add('/methodology/');
  routes.add('/editorial-policy/');
  routes.add('/contact/');
  routes.add('/guides/cheapest-data-south-africa/');
  routes.add('/guides/cheapest-1gb-data-south-africa/');
  routes.add('/guides/best-data-deals-south-africa/');
  routes.add('/guides/best-prepaid-data-deals-south-africa/');
  routes.add('/guides/best-monthly-data-deals-south-africa/');
  routes.add('/guides/cheapest-2gb-data-south-africa/');
  routes.add('/guides/cheapest-5gb-data-south-africa/');
  routes.add('/guides/cheapest-10gb-data-south-africa/');
  routes.add('/guides/cheapest-15gb-data-south-africa/');
  routes.add('/guides/cheapest-20gb-data-south-africa/');
  routes.add('/guides/cheapest-50gb-data-south-africa/');
  routes.add('/guides/cheapest-unlimited-data-south-africa/');
  routes.add('/guides/best-sim-only-deals-south-africa/');
  routes.add('/guides/cheapest-whatsapp-bundles-south-africa/');
  routes.add('/guides/cheap-night-data-south-africa/');
  routes.add('/guides/vodacom-vs-mtn-data-prices/');
  routes.add('/guides/stop-wasp-subscriptions-south-africa/');
  routes.add('/travel-sims-south-africa/');

  for (const guide of guides) {
    routes.add(`/guides/${guide.slug}/`);
  }

  for (const networkPage of Object.values(networkPages)) {
    routes.add(`/network/${networkPage.slug}/`);
  }

  for (const phase1Route of PHASE1_FILTER_ROUTES) {
    const networkPage = networkPages[phase1Route.network];
    const bundleTypeConfig = BUNDLE_TYPE_MAP[phase1Route.bundleType];
    if (!networkPage || !bundleTypeConfig) {
      continue;
    }

    const networkBundles = bundles.filter((bundle) => bundle.network === networkPage.networkName);
    const hasMatchingBundle = networkBundles.some((bundle) => bundleTypeConfig.filter(bundle));
    if (!hasMatchingBundle) {
      continue;
    }

    routes.add(`/network/${networkPage.slug}/${phase1Route.bundleType}/`);
  }

  return [...routes].map(normalizeCanonicalPath);
}

export function getPrerenderRoutes(): string[] {
  return getIndexableRoutes();
}

export function validateIndexableRoutes(routes: string[]): void {
  const seen = new Set<string>();

  for (const route of routes) {
    if (route !== normalizeCanonicalPath(route)) {
      throw new Error(`Non-canonical route found: ${route}`);
    }

    if (route !== '/' && !route.endsWith('/')) {
      throw new Error(`Route must use trailing slash: ${route}`);
    }

    if (seen.has(route)) {
      throw new Error(`Duplicate route found: ${route}`);
    }

    seen.add(route);
  }
}
