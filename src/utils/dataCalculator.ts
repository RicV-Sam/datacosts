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
    if (unit === 'tb') return total + amount * 1024;
    if (unit === 'gb') return total + amount;
    return total + amount / 1024;
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
  if (validity.includes('hour')) return 1 / 24;
  if (validity.includes('week') || validity.includes('7 day')) return 7;
  if (validity.includes('month') || validity.includes('30 day') || bundle.type === 'Monthly' || bundle.type === 'Prepaid') return 30;
  if (validity.includes('night') || validity.includes('day') || bundle.type === 'Daily') return 1;
  return 30;
}

function isRealisticMonthlyMatch(bundle: Bundle, monthlyNeedGb: number): boolean {
  const generalDataGb = getGeneralDataGb(bundle);
  if (generalDataGb === Number.POSITIVE_INFINITY) return true;
  if (generalDataGb <= 0) return false;

  const validityDays = getValidityDays(bundle);
  if (monthlyNeedGb > 10 && validityDays < 28) return false;
  if (monthlyNeedGb > 3 && validityDays < 7) return false;

  return generalDataGb >= monthlyNeedGb * 0.9;
}

function getValueScore(bundle: Bundle, monthlyNeedGb: number): number {
  const generalDataGb = getGeneralDataGb(bundle);
  if (generalDataGb === Number.POSITIVE_INFINITY) return bundle.price / Math.max(monthlyNeedGb, 1);
  if (generalDataGb <= 0) return Number.POSITIVE_INFINITY;
  return bundle.price / generalDataGb;
}

function getClosestMonthlyFallback(bundles: Bundle[], monthlyNeedGb: number): Bundle | null {
  const monthlyGeneralBundles = bundles
    .filter((bundle) => getGeneralDataGb(bundle) > 0)
    .filter((bundle) => getValidityDays(bundle) >= 28)
    .sort((a, b) => {
      const aGap = Math.abs(getGeneralDataGb(a) - monthlyNeedGb);
      const bGap = Math.abs(getGeneralDataGb(b) - monthlyNeedGb);
      if (aGap !== bGap) return aGap - bGap;
      return getValueScore(a, monthlyNeedGb) - getValueScore(b, monthlyNeedGb);
    });

  return monthlyGeneralBundles[0] ?? null;
}

function getEmergencyTopUp(bundles: Bundle[]): Bundle | null {
  const topUps = bundles
    .filter((bundle) => !isSocialBundle(bundle) && !isNightOnlyBundle(bundle))
    .filter((bundle) => getGeneralDataGb(bundle) > 0 && getGeneralDataGb(bundle) <= 2)
    .sort((a, b) => a.price - b.price);

  return topUps[0] ?? null;
}

export function getDataRecommendations(
  allBundles: Bundle[],
  monthlyNeedGb: number,
  currentSpend: number | ''
): DataRecommendation | null {
  const suitableBundles = allBundles.filter((bundle) => isRealisticMonthlyMatch(bundle, monthlyNeedGb));
  const fallback = suitableBundles.length > 0 ? null : getClosestMonthlyFallback(allBundles, monthlyNeedGb);
  const recommendationPool = suitableBundles.length > 0 ? suitableBundles : (fallback ? [fallback] : []);

  if (!recommendationPool.length) return null;

  const cheapest = [...recommendationPool].sort((a, b) => a.price - b.price)[0];
  const bestValue = [...recommendationPool].sort((a, b) => getValueScore(a, monthlyNeedGb) - getValueScore(b, monthlyNeedGb))[0];
  const heavyUser = monthlyNeedGb > 50
    ? [...recommendationPool].filter((bundle) => getGeneralDataGb(bundle) === Number.POSITIVE_INFINITY).sort((a, b) => a.price - b.price)[0] ?? null
    : null;
  const topUp = suitableBundles.length === 0 ? getEmergencyTopUp(allBundles) : null;

  const savings = typeof currentSpend === 'number'
    ? Math.max(0, currentSpend - cheapest.price)
    : 0;

  const note = suitableBundles.length > 0
    ? 'Recommendations exclude social-only and night-only bundles because they do not cover normal monthly internet use.'
    : 'No listed bundle fully covers the estimate, so this is the closest monthly-style option; any small top-up shown is only an emergency add-on.';

  return { bestValue, cheapest, heavyUser, topUp, savings, note };
}
