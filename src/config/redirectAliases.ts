export type RedirectAlias = {
  from: string;
  to: string;
  label: string;
};

export const REDIRECT_ALIASES: RedirectAlias[] = [
  { from: '/privacy/', to: '/privacy-policy/', label: 'Privacy Policy' },
  { from: '/guides/best-data-deals-south-africa/', to: '/best-data-deals-south-africa/', label: 'Best Data Deals South Africa' },
  { from: '/ussd-codes/', to: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa' },
  { from: '/cheapest-1gb-data-south-africa/', to: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data South Africa' },
  { from: '/guides/convert-airtime-to-data/', to: '/guides/convert-airtime-to-data-south-africa/', label: 'Convert Airtime to Data South Africa' },
  { from: '/airtime-disappearing/', to: '/guides/why-is-my-airtime-disappearing-south-africa/', label: 'Why Is My Airtime Disappearing?' },
  { from: '/how-to-cancel-wasp-subscriptions-south-africa/', to: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions South Africa' },
  { from: '/guides/how-to-stop-wasp-vas-charges-south-africa/', to: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions South Africa' },
  { from: '/guides/how-to-stop-wasp-services-south-africa/', to: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions South Africa' },
  { from: '/fix-mobile-problems/', to: '/fix/', label: 'DataCost Fixes' },
  { from: '/fix-a-problem/', to: '/fix/', label: 'DataCost Fixes' },
  {
    from: '/fibre/cheap-fibre-south-africa/',
    to: '/fibre/cheapest-fibre-packages-south-africa/',
    label: 'Cheapest Fibre Packages South Africa'
  },
  {
    from: '/telkom-night-data-bundles/',
    to: '/guides/cheap-night-data-south-africa/',
    label: 'Cheap Night Data South Africa'
  },
  {
    from: '/network/rain/rain-unlimited-4g-data-price/',
    to: '/network/rain/',
    label: 'Rain Unlimited 5G Home WiFi'
  },
  { from: '/night-data-bundles-south-africa/', to: '/guides/cheap-night-data-south-africa/', label: 'Cheap Night Data South Africa' },
  { from: '/network/vodacom/daily-data/', to: '/network/vodacom/', label: 'Vodacom Data Prices' },
  {
    from: '/network/telkom/night-data/',
    to: '/guides/cheap-night-data-south-africa/',
    label: 'Cheap Night Data South Africa'
  },
  { from: '/network/cell-c/weekly-data/', to: '/network/cell-c/', label: 'Cell C Data Prices' },
  {
    from: '/network/cell-c/night-data/',
    to: '/guides/cheap-night-data-south-africa/',
    label: 'Cheap Night Data South Africa'
  }
];

function normalizeAliasPath(path: string): string {
  if (!path.startsWith('/')) {
    throw new Error(`Alias path must start with "/": ${path}`);
  }

  if (path === '/') {
    return path;
  }

  return `${path.replace(/\/+$/, '')}/`;
}

export function getRedirectAlias(pathname: string): RedirectAlias | undefined {
  const normalizedPath = normalizeAliasPath(pathname);
  return REDIRECT_ALIASES.find((alias) => alias.from === normalizedPath);
}

export function getRedirectAliasRoutes(): string[] {
  return REDIRECT_ALIASES.map((alias) => alias.from);
}
