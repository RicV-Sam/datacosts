export const WP1_BASELINE = {
  version: '1.1',
  baselineAsOf: '2026-07-21',
  timezone: 'Africa/Johannesburg',
  gsc: {
    period: { start: '2026-06-21', end: '2026-07-18' },
    reportingDelayDays: 3,
    exportedQueryImpressions: 187_914,
    totalImpressions: 369_636,
    queryCoveragePercent: 50.84,
    limitation: 'Exported query rows are privacy-thresholded and cover 50.84% of total impressions, not 100%.'
  },
  ga4: {
    period: { start: '2026-06-23', end: '2026-07-20' },
    reportingDelayDays: 1,
    channel: 'Organic Search',
    country: 'South Africa',
    devices: ['desktop', 'mobile', 'tablet'],
    consentLimitation: 'Consent and browser controls can suppress analytics events and sessions.'
  },
  queryClusterVersion: 'wp1-v1.1',
  canonicalNormalisation: {
    scheme: 'https',
    host: 'datacost.co.za',
    stripQuery: true,
    stripFragment: true,
    aliasPolicy: 'Apply approved aliases only; Release A creates none.',
    trailingSlash: 'Exactly one trailing slash for non-file paths; root remains /.'
  },
  transitionWindows: {
    excluded: 'deployment day through D+7',
    firstRead: 'D+8 through D+35 (28 days)',
    decisionRead: 'D+8 through D+63 (56 days)'
  },
  totalClusterGuardrail: {
    success: 'Intended owner becomes the largest cluster contributor, totals remain stable or improve, and supporting pages retain narrow intent.',
    redFlag: 'After device and untreated-cohort review at 56 days: loss greater than 10% and at least 500 impressions, or greater than 15% and at least 5 clicks.'
  },
  expectedCrossSourceDifference: 'GA4 sessions and GSC clicks are not expected to reconcile exactly because attribution, consent, timezones, bot filtering and reporting thresholds differ.'
} as const;

export const GSC_QUERY_OWNER_COHORT = [
  { id: 'qo-02', treatment: 'treated_release_b', ownerPath: '/data-problems/how-to-check-data-balance-vodacom-ussd/', cluster: 'Vodacom data balance' },
  { id: 'qo-03', treatment: 'treated_release_b', ownerPath: '/cell-c-ussd-codes/', cluster: 'Cell C balance' },
  { id: 'qo-05', treatment: 'treated_release_b', ownerPath: '/mtn-ussd-codes/', cluster: 'MTN generic balance' },
  { id: 'qo-06', treatment: 'treated_release_b', ownerPath: '/guides/how-to-check-mtn-data-balance/', cluster: 'MTN data balance' },
  { id: 'qo-10', treatment: 'untreated', ownerPath: '/network/mtn/', cluster: 'MTN network hub' },
  { id: 'qo-12', treatment: 'untreated', ownerPath: '/network/cell-c/', cluster: 'Cell C network hub' },
  { id: 'qo-15', treatment: 'untreated', ownerPath: '/guides/best-sim-only-deals-south-africa/', cluster: 'SIM-only deals' }
] as const;

export const CNI_URL_COHORT = [
  ['ci-01', '/guides/how-to-check-subscriptions-on-mtn/', 'genuine_cni'],
  ['ci-02', '/fix/prepaid-meter-keypad-not-working/', 'no_performance'],
  ['ci-03', '/data-problems/how-to-check-data-balance-vodacom-ussd/', 'genuine_cni'],
  ['ci-04', '/guides/how-to-protect-airtime-from-being-used/', 'no_performance'],
  ['ci-05', '/data-problems/why-does-my-data-run-out-so-fast-telkom/', 'no_performance'],
  ['ci-06', '/data-problems/how-to-stop-airtime-disappearing-telkom/', 'genuine_cni'],
  ['ci-07', '/guides/how-to-check-mtn-airtime-balance/', 'genuine_cni'],
  ['ci-08', '/guides/how-to-check-mtn-data-balance/', 'indexed_or_stale'],
  ['ci-09', '/guides/cheapest-5gb-data-south-africa/', 'no_performance'],
  ['ci-10', '/guides/why-is-my-data-finishing-so-fast/', 'no_performance'],
  ['ci-11', '/fix/cell-c-data-not-working/', 'no_performance'],
  ['ci-12', '/fix/openview-activation-not-working/', 'no_performance'],
  ['ci-13', '/network/vodacom/cheapest-1gb/', 'indexed_or_stale'],
  ['ci-14', '/guides/', 'indexed_or_stale'],
  ['ci-15', '/methodology/', 'no_performance'],
  ['ci-16', '/privacy-policy/', 'no_performance'],
  ['ci-17', '/travel-sims-south-africa/', 'indexed_or_stale'],
  ['ci-18', '/data-problems/how-to-stop-background-data-usage-android/', 'no_performance'],
  ['ci-19', '/save-ussd-codes/', 'indexed_or_stale'],
  ['ci-20', '/guides/how-to-buy-data-telkom/', 'indexed_or_stale']
] as const;

export const ORGANIC_LANDING_REPORT = {
  dimensions: ['canonical_path', 'country', 'device'],
  metrics: ['sessions', 'engaged_sessions', 'qualified_actions', 'actions_per_session'],
  filters: { channel: 'Organic Search', country: 'South Africa' },
  coverageNote: 'Report consent-aware coverage and never infer missing event volume as zero demand.'
} as const;

export const DATA_QUALITY_REPORT = {
  fields: ['as_of', 'max_source_date', 'row_count', 'duplicate_count', 'missing_rate', 'query_coverage', 'timezone'],
  suppressionNote: 'Small or privacy-thresholded rows may be absent; preserve null/missing separately from zero.'
} as const;

export function normaliseCanonicalPath(input: string): string {
  const parsed = new URL(input, 'https://datacost.co.za');
  let path = parsed.pathname.replace(/\/index\.html$/i, '/').replace(/\/{2,}/g, '/');
  const finalSegment = path.split('/').filter(Boolean).at(-1) ?? '';
  const looksLikeFile = /\.[a-z0-9]{2,8}$/i.test(finalSegment);
  if (path !== '/' && !looksLikeFile) path = `${path.replace(/\/$/, '')}/`;
  return path || '/';
}

