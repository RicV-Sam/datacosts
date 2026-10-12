import { bundles } from '../data';
import type { Bundle, NetworkName } from '../types';
import { isVerifiedBundleSource } from './bundleSource';
import { parseDataAmountToGb } from './dataCalculator';

export const CORE_NETWORKS: NetworkName[] = ['Vodacom', 'MTN', 'Telkom', 'Cell C'];

export function volumeToGb(volume: string): number {
  const normalized = volume.trim().toLowerCase();
  if (normalized.includes('unlimited')) return Number.POSITIVE_INFINITY;

  const mbMatch = normalized.match(/(\d+(?:\.\d+)?)\s*mb/);
  if (mbMatch) return Number(mbMatch[1]) / 1000;

  const gbMatch = normalized.match(/(\d+(?:\.\d+)?)\s*gb/);
  if (gbMatch) return Number(gbMatch[1]);

  return 0;
}

export function isNightBundle(bundle: Bundle): boolean {
  return bundle.name.toLowerCase().includes('night') || (bundle.nightData !== undefined && bundle.nightData !== '');
}

export function isMonthlyBundle(bundle: Bundle): boolean {
  const validity = bundle.validity.toLowerCase();
  return bundle.type === 'Monthly' || validity.includes('30 day') || validity.includes('month');
}

export function isSocialBundle(bundle: Bundle): boolean {
  return bundle.type === 'Social' || bundle.name.toLowerCase().includes('whatsapp') || bundle.name.toLowerCase().includes('social');
}

function isSmartphoneOnceOffBundle(bundle: Bundle): boolean {
  return bundle.productType === 'smartphone_once_off_data';
}

function getTargetSizeGb(mode: string): number | null {
  const targetMap: Record<string, number> = {
    'cheapest-2gb': 2,
    'cheapest-5gb': 5,
    'cheapest-10gb': 10,
    'cheapest-15gb': 15,
    'cheapest-20gb': 20,
    'cheapest-50gb': 50
  };

  return targetMap[mode] ?? null;
}

export function filterBundlesByMode(mode: string, input: Bundle[] = bundles): Bundle[] {
  const base = input.filter((bundle) => CORE_NETWORKS.includes(bundle.network));

  if (mode === 'cheapest-1gb') {
    return base.filter(
      (bundle) =>
        parseDataAmountToGb(bundle.anytimeData) === 1 &&
        isSmartphoneOnceOffBundle(bundle) &&
        parseDataAmountToGb(bundle.anytimeData) > 0 &&
        !isSocialBundle(bundle)
    );
  }

  if (mode === 'cheapest-10gb') {
    return base.filter(
      (bundle) =>
        parseDataAmountToGb(bundle.anytimeData) === 10 &&
        isSmartphoneOnceOffBundle(bundle) &&
        parseDataAmountToGb(bundle.anytimeData) > 0 &&
        !isSocialBundle(bundle)
    );
  }

  if (
    mode === 'cheapest-2gb' ||
    mode === 'cheapest-5gb' ||
    mode === 'cheapest-15gb' ||
    mode === 'cheapest-20gb' ||
    mode === 'cheapest-50gb'
  ) {
    return base.filter(
      (bundle) => isSmartphoneOnceOffBundle(bundle) && parseDataAmountToGb(bundle.anytimeData) > 0 && !isSocialBundle(bundle)
    );
  }

  if (mode === 'best-monthly') {
    return base.filter(
      (bundle) =>
        isSmartphoneOnceOffBundle(bundle) &&
        isMonthlyBundle(bundle) &&
        parseDataAmountToGb(bundle.anytimeData) > 0 &&
        !isSocialBundle(bundle)
    );
  }

  if (mode === 'best-prepaid') {
    return base.filter(
      (bundle) =>
        isSmartphoneOnceOffBundle(bundle) &&
        parseDataAmountToGb(bundle.anytimeData) > 0 &&
        !isSocialBundle(bundle) &&
        bundle.type !== 'Contract'
    );
  }

  if (mode === 'cheapest-whatsapp') {
    return base.filter((bundle) => isSocialBundle(bundle));
  }

  if (mode === 'cheap-night') {
    return base.filter((bundle) => isNightBundle(bundle));
  }

  return base;
}

export function hasCurrentBundleEvidence(bundle: Bundle, now = Date.now()): boolean {
  const age = now - Date.parse(`${bundle.lastVerified}T00:00:00Z`);
  return isVerifiedBundleSource(bundle) && Boolean(bundle.sourceUrl?.startsWith('https://')) &&
    Number.isFinite(bundle.price) && bundle.price > 0 && Number.isFinite(age) && age >= 0 && age < 30 * 86400000;
}

function preferVerifiedRows(rows: Bundle[]): Bundle[] {
  const now = Date.now();
  const verifiedRows = rows.filter(bundle => {
    const age = now - Date.parse(`${bundle.lastVerified}T00:00:00Z`);
    return isVerifiedBundleSource(bundle) && Boolean(bundle.sourceUrl?.startsWith('https://')) &&
      Number.isFinite(bundle.price) && bundle.price > 0 &&
      Number.isFinite(age) && age >= 0;
  });
  return verifiedRows;
}

export function pickBestRowBundleForMode(rows: Bundle[], mode: string): Bundle | null {
  if (!rows.length) return null;

  const targetGb = mode === 'cheapest-1gb' ? 1 : getTargetSizeGb(mode);
  if (targetGb) {
    const exactMatches = rows.filter((bundle) => parseDataAmountToGb(bundle.anytimeData) === targetGb);
    return [...preferVerifiedRows(exactMatches)].sort((a, b) => a.price - b.price)[0] || null;
  }

  if (mode === 'best-monthly' || mode === 'best-prepaid') {
    const preferredRows = preferVerifiedRows(rows);
    const byValue = preferredRows.filter((bundle) => bundle.costPerGb > 0).sort((a, b) => a.costPerGb - b.costPerGb)[0];
    return byValue || [...preferredRows].sort((a, b) => a.price - b.price)[0];
  }

  return [...preferVerifiedRows(rows)].sort((a, b) => a.price - b.price)[0];
}
