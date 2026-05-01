export type RedirectAlias = {
  from: string;
  to: string;
  label: string;
};

export const REDIRECT_ALIASES: RedirectAlias[] = [
  { from: '/privacy/', to: '/privacy-policy/', label: 'Privacy Policy' },
  { from: '/ussd-codes/', to: '/ussd-codes-south-africa/', label: 'USSD Codes South Africa' },
  { from: '/cheapest-1gb-data-south-africa/', to: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data South Africa' },
  { from: '/airtime-disappearing/', to: '/guides/why-is-my-airtime-disappearing-south-africa/', label: 'Why Is My Airtime Disappearing?' },
  { from: '/how-to-cancel-wasp-subscriptions-south-africa/', to: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop WASP Subscriptions South Africa' },
  { from: '/telkom-night-data-bundles/', to: '/network/telkom/night-data/', label: 'Telkom Night Data Bundles' },
  { from: '/night-data-bundles-south-africa/', to: '/guides/cheap-night-data-south-africa/', label: 'Cheap Night Data South Africa' }
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
