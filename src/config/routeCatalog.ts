import { bundles } from '../data';
import { networkPages } from '../data/networks';
import { guides } from '../data/guides';
import { Bundle } from '../types';

export const BASE_URL = 'https://datacost.co.za';

export type BundleTypeConfig = {
  label: string;
  filter: (bundle: Bundle) => boolean;
  guideSlug?: string;
};

export const BUNDLE_TYPE_MAP: Record<string, BundleTypeConfig> = {
  '1gb': {
    label: '1GB',
    filter: (bundle) => bundle.volume === '1GB',
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
    filter: (bundle) =>
      (bundle.validity.toLowerCase().includes('day') &&
        !bundle.validity.toLowerCase().includes('30 day') &&
        !bundle.validity.toLowerCase().includes('7 day')) ||
      bundle.type === 'Daily'
  },
  'weekly-data': {
    label: 'Weekly',
    filter: (bundle) => bundle.validity.toLowerCase().includes('week') || bundle.type === 'Weekly'
  },
  'monthly-data': {
    label: 'Monthly',
    filter: (bundle) =>
      bundle.validity.toLowerCase().includes('30 day') ||
      bundle.type === 'Monthly' ||
      bundle.validity.toLowerCase().includes('month')
  },
  'night-data': {
    label: 'Night',
    filter: (bundle) => bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== ''),
    guideSlug: 'cheap-night-data-south-africa'
  }
};

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
  routes.add('/guides/cheapest-monthly-data-south-africa/');
  routes.add('/guides/cheapest-10gb-data-south-africa/');
  routes.add('/guides/cheapest-unlimited-data-south-africa/');
  routes.add('/guides/best-sim-only-deals-south-africa/');
  routes.add('/guides/cheapest-whatsapp-bundles-south-africa/');
  routes.add('/guides/vodacom-vs-mtn-data-prices/');
  routes.add('/guides/stop-wasp-subscriptions-south-africa/');
  routes.add('/travel-sims-south-africa/');

  for (const guide of guides) {
    routes.add(`/guides/${guide.slug}/`);
  }

  for (const networkPage of Object.values(networkPages)) {
    routes.add(`/network/${networkPage.slug}/`);
  }

  for (const networkPage of Object.values(networkPages)) {
    const networkBundles = bundles.filter((bundle) => bundle.network === networkPage.networkName);

    for (const [bundleTypeSlug, bundleTypeConfig] of Object.entries(BUNDLE_TYPE_MAP)) {
      const hasMatchingBundle = networkBundles.some((bundle) => bundleTypeConfig.filter(bundle));
      if (!hasMatchingBundle) {
        continue;
      }

      routes.add(`/network/${networkPage.slug}/${bundleTypeSlug}/`);
    }
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
