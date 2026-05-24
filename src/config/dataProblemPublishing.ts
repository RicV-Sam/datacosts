export type DataProblemIndexingStatus = 'index' | 'noindex' | 'draft';

export type DataProblemPublishingEntry = {
  fileName: string;
  route: string;
  indexingStatus: DataProblemIndexingStatus;
};

export const DATA_PROBLEM_PUBLISHING_ENTRIES: DataProblemPublishingEntry[] = [
  {
    fileName: 'why-is-my-data-disappearing-vodacom.json',
    route: '/data-problems/why-is-my-data-disappearing-vodacom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-wasp-charges-vodacom.json',
    route: '/data-problems/how-to-stop-wasp-charges-vodacom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-check-data-balance-vodacom-ussd.json',
    route: '/data-problems/how-to-check-data-balance-vodacom-ussd/',
    indexingStatus: 'index'
  },
  {
    fileName: 'why-does-my-data-run-out-so-fast-mtn.json',
    route: '/data-problems/why-does-my-data-run-out-so-fast-mtn/',
    indexingStatus: 'index'
  },
  {
    fileName: 'why-does-my-data-run-out-so-fast-cell-c.json',
    route: '/data-problems/why-does-my-data-run-out-so-fast-cell-c/',
    indexingStatus: 'index'
  },
  {
    fileName: 'why-does-my-data-run-out-so-fast-telkom.json',
    route: '/data-problems/why-does-my-data-run-out-so-fast-telkom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-data-disappearing-vodacom.json',
    route: '/data-problems/how-to-stop-data-disappearing-vodacom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-data-disappearing-mtn.json',
    route: '/data-problems/how-to-stop-data-disappearing-mtn/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-data-disappearing-cell-c.json',
    route: '/data-problems/how-to-stop-data-disappearing-cell-c/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-data-disappearing-telkom.json',
    route: '/data-problems/how-to-stop-data-disappearing-telkom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'why-is-my-airtime-disappearing-vodacom-prepaid.json',
    route: '/data-problems/why-is-my-airtime-disappearing-vodacom-prepaid/',
    indexingStatus: 'index'
  },
  {
    fileName: 'why-is-my-airtime-disappearing-mtn-prepaid.json',
    route: '/data-problems/why-is-my-airtime-disappearing-mtn-prepaid/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-airtime-disappearing-vodacom.json',
    route: '/data-problems/how-to-stop-airtime-disappearing-vodacom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-airtime-disappearing-cell-c.json',
    route: '/data-problems/how-to-stop-airtime-disappearing-cell-c/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-airtime-disappearing-telkom.json',
    route: '/data-problems/how-to-stop-airtime-disappearing-telkom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'why-is-my-data-disappearing-overnight-android.json',
    route: '/data-problems/why-is-my-data-disappearing-overnight-android/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-wasp-charges-cell-c.json',
    route: '/data-problems/how-to-stop-wasp-charges-cell-c/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-wasp-charges-mtn.json',
    route: '/data-problems/how-to-stop-wasp-charges-mtn/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-wasp-charges-telkom.json',
    route: '/data-problems/how-to-stop-wasp-charges-telkom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-check-wasp-subscriptions-vodacom.json',
    route: '/data-problems/how-to-check-wasp-subscriptions-vodacom/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-check-wasp-subscriptions-mtn.json',
    route: '/data-problems/how-to-check-wasp-subscriptions-mtn/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-background-data-usage-android.json',
    route: '/data-problems/how-to-stop-background-data-usage-android/',
    indexingStatus: 'index'
  },
  {
    fileName: 'how-to-stop-apps-using-data-in-background-samsung.json',
    route: '/data-problems/how-to-stop-apps-using-data-in-background-samsung/',
    indexingStatus: 'index'
  }
];

function normalizeRoute(route: string): string {
  if (route === '/') return route;
  const withLeadingSlash = route.startsWith('/') ? route : `/${route}`;
  return `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

export function getDataProblemPublishingEntries(statuses: DataProblemIndexingStatus[]): DataProblemPublishingEntry[] {
  const statusSet = new Set(statuses);
  return DATA_PROBLEM_PUBLISHING_ENTRIES.filter((entry) => statusSet.has(entry.indexingStatus));
}

export function getDataProblemRoutesByIndexingStatus(statuses: DataProblemIndexingStatus[]): string[] {
  return getDataProblemPublishingEntries(statuses).map((entry) => normalizeRoute(entry.route));
}

export function getBundledDataProblemSourceFiles(): string[] {
  return getDataProblemPublishingEntries(['index', 'noindex']).map((entry) => entry.fileName);
}
