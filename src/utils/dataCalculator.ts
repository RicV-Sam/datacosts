import { Bundle } from '../types';

export type UsageProfile = {
  video: number;
  social: number;
  chat: number;
  web: number;
};

export const USAGE_RATES = {
  video: 1.5,
  social: 0.2,
  chat: 0.05,
  web: 0.1
};

export type DataRecommendation = {
  bestValue: Bundle;
  cheapest: Bundle;
  heavyUser: Bundle | null;
  topUp: Bundle | null;
  savings: number;
  note: string;
};

export function calculateMonthlyNeed(usage: UsageProfile): number {
  const daily =
    usage.video * USAGE_RATES.video +
    usage.social * USAGE_RATES.social +
    usage.chat * USAGE_RATES.chat +
    usage.web * USAGE_RATES.web;

  return daily * 30;
}

export function parseDataAmountToGb(value: string): number {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 0;
  if (normalized.includes('unlimited')) return Number.POSITIVE_INFINITY;

  const matches = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(tb|gb|mb)\b/g)];
  if (!matches.length) return 0;

  return matches.reduce((total, match) => {
    const amount = Number(match[1]);
    const unit = match[2];
    if (!Number.isFinite(amount) || amount <= 0) return total;
    if (unit === 'tb') return total + amount * 1000;
    if (unit === 'gb') return total + amount;
    return total + amount / 1000;
  }, 0);
}

function isSocialBundle(bundle: Bundle): boolean {
  const name = bundle.name.toLowerCase();
  return bundle.type === 'Social' || name.includes('whatsapp') || name.includes('social') || bundle.anytimeData.toLowerCase().includes('whatsapp');
}

function isNightOnlyBundle(bundle: Bundle): boolean {
  const name = bundle.name.toLowerCase();
  const anytimeGb = parseDataAmountToGb(bundle.anytimeData);
  return (name.includes('night') || Boolean(bundle.nightData)) && anytimeGb <= 0;
}

function getGeneralDataGb(bundle: Bundle): number {
  if (isSocialBundle(bundle) || isNightOnlyBundle(bundle)) return 0;
  const anytimeGb = parseDataAmountToGb(bundle.anytimeData);
  if (anytimeGb > 0 || bundle.anytimeData.toLowerCase().includes('0mb')) return anytimeGb;
  return parseDataAmountToGb(bundle.volume);
}

function getValidityDays(bundle: Bundle): number {
  const validity = bundle.validity.toLowerCase();
  const duration = validity.match(/^(\d+)\s*(hour|day|week|month)s?$/);
  if (duration) return Number(duration[1]) * ({ hour: 1 / 24, day: 1, week: 7, month: 30 }[duration[2]] ?? 0);
  if (validity === 'month-to-month' || validity === 'monthly') return 30;
  return 0;
}

function isRealisticMonthlyMatch(bundle: Bundle, monthlyNeedGb: number): boolean {
  const generalDataGb = getGeneralDataGb(bundle);
  if (generalDataGb <= 0) return false;

  const validityDays = getValidityDays(bundle);
  if (validityDays < 30) return false;

  return generalDataGb >= monthlyNeedGb;
}

function getValueScore(bundle: Bundle, monthlyNeedGb: number): number {
  const generalDataGb = getGeneralDataGb(bundle);
  if (generalDataGb === Number.POSITIVE_INFINITY) return bundle.price / Math.max(monthlyNeedGb, 1);
  if (generalDataGb <= 0) return Number.POSITIVE_INFINITY;
  return bundle.price / generalDataGb;
}

export function getDataRecommendations(
  allBundles: Bundle[],
  monthlyNeedGb: number,
  currentSpend: number | '',
  now: Date = new Date()
): DataRecommendation | null {
  if (!Number.isFinite(monthlyNeedGb) || monthlyNeedGb <= 0) return null;
  const eligible = allBundles.filter((bundle) => {
    const checked = Date.parse(`${bundle.lastVerified}T00:00:00Z`);
    const age = now.getTime() - checked;
    return bundle.sourceConfidence === 'verified' && Boolean(bundle.sourceUrl?.startsWith('https://')) &&
      Number.isFinite(age) && age >= 0 && age < 30 * 86400000 &&
      Number.isFinite(bundle.price) && bundle.price > 0 &&
      (bundle.productType === 'smartphone_once_off_data' || bundle.productType === 'smartphone_recurring_data');
  });
  const recommendationPool = eligible.filter((bundle) => isRealisticMonthlyMatch(bundle, monthlyNeedGb));

  if (!recommendationPool.length) return null;

  const cheapest = [...recommendationPool].sort((a, b) => a.price - b.price)[0];
  const bestValue = [...recommendationPool].sort((a, b) => getValueScore(a, monthlyNeedGb) - getValueScore(b, monthlyNeedGb))[0];
  const heavyUser = monthlyNeedGb > 50
    ? [...recommendationPool].filter((bundle) => getGeneralDataGb(bundle) === Number.POSITIVE_INFINITY).sort((a, b) => a.price - b.price)[0] ?? null
    : null;
  const topUp = null;

  const savings = typeof currentSpend === 'number' && Number.isFinite(currentSpend)
    ? Math.max(0, currentSpend - cheapest.price)
    : 0;

  const note = 'Listed phone-data bundles cover the full estimate for at least 30 days. Night and social allowances, router products and personalised offers are excluded. Confirm coverage, eligibility and the checkout price before buying.';

  return { bestValue, cheapest, heavyUser, topUp, savings, note };
}
