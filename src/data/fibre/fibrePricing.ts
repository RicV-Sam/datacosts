import fibrePriceSnapshot from '../generated/fibrePriceSnapshot.json' with { type: 'json' };
import { fibreCompanyById } from './fibreCompanies';

export type FibrePriceConfidence = 'high' | 'medium' | 'low';

export type FibrePricePackage = {
  id: string;
  ispId: string;
  fnoId: string;
  planName: string;
  downloadMbps: number;
  uploadMbps: number;
  monthlyPrice: number;
  promoPrice: number | null;
  promoTerms?: string;
  setupNotes: string;
  sourceUrl: string;
  sourceLabel: string;
  checkedAt: string;
  confidence: FibrePriceConfidence;
  requiresAddressCheck: boolean;
  tags: string[];
};

export type FibrePriceSnapshot = {
  checkedAt: string;
  generatedBy: string;
  notes: string;
  prices: FibrePricePackage[];
};

export type FibrePriceFilter = {
  ispIds?: string[];
  fnoIds?: string[];
  tags?: string[];
  maxMonthlyPrice?: number;
  minDownloadMbps?: number;
  limit?: number;
};

export const FIBRE_PRICE_STALE_DAYS = 45;

const snapshot = fibrePriceSnapshot as FibrePriceSnapshot;

export function getFibrePriceSnapshot(): FibrePriceSnapshot {
  return snapshot;
}

export function isFibrePriceFresh(checkedAt: string, now: Date = new Date()): boolean {
  const checkedDate = new Date(`${checkedAt}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkedAt) || Number.isNaN(checkedDate.getTime()) || Number.isNaN(now.getTime())) return false;
  if (checkedDate.toISOString().slice(0, 10) !== checkedAt) return false;
  const age = now.getTime() - checkedDate.getTime();
  return age >= 0 && age <= FIBRE_PRICE_STALE_DAYS * 24 * 60 * 60 * 1000;
}

export function getFibrePriceSnapshotStatus(now: Date = new Date()): {
  checkedAt: string;
  fresh: boolean;
  staleAfterDays: number;
  notes: string;
} {
  return {
    checkedAt: snapshot.checkedAt,
    fresh: isFibrePriceFresh(snapshot.checkedAt, now),
    staleAfterDays: FIBRE_PRICE_STALE_DAYS,
    notes: snapshot.notes
  };
}

export function getFibrePrices(filter: FibrePriceFilter = {}): FibrePricePackage[] {
  const ispSet = filter.ispIds ? new Set(filter.ispIds) : null;
  const fnoSet = filter.fnoIds ? new Set(filter.fnoIds) : null;
  const tagSet = filter.tags ? new Set(filter.tags) : null;

  const filtered = snapshot.prices
    .filter((price) => {
      if (ispSet && !ispSet.has(price.ispId)) return false;
      if (fnoSet && !fnoSet.has(price.fnoId)) return false;
      if (tagSet && !price.tags.some((tag) => tagSet.has(tag))) return false;
      if (filter.maxMonthlyPrice !== undefined && price.monthlyPrice > filter.maxMonthlyPrice) return false;
      if (filter.minDownloadMbps !== undefined && price.downloadMbps < filter.minDownloadMbps) return false;
      return true;
    })
    .sort((a, b) => {
      const monthlyDelta = a.monthlyPrice - b.monthlyPrice;
      if (monthlyDelta !== 0) return monthlyDelta;
      return a.downloadMbps - b.downloadMbps;
    });

  return typeof filter.limit === 'number' ? filtered.slice(0, filter.limit) : filtered;
}

export function getFreshFibrePrices(filter: FibrePriceFilter = {}, now: Date = new Date()): FibrePricePackage[] {
  const prices = getFibrePrices({ ...filter, limit: undefined })
    .filter((price) => isFibrePriceFresh(price.checkedAt, now) && price.confidence !== 'low' && price.fnoId !== 'multi-network');
  return typeof filter.limit === 'number' ? prices.slice(0, Math.max(0, filter.limit)) : prices;
}

export function getCheapestFibrePrices(limit = 8): FibrePricePackage[] {
  return getFreshFibrePrices({ limit });
}

export function getFibrePriceSources(prices: FibrePricePackage[]): Array<{ label: string; url: string }> {
  const seen = new Set<string>();
  const sources: Array<{ label: string; url: string }> = [];

  for (const price of prices) {
    const key = `${price.sourceLabel}|${price.sourceUrl}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({ label: price.sourceLabel, url: price.sourceUrl });
  }

  return sources;
}

export function formatRand(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'Check provider';
  return `R${value.toLocaleString('en-ZA')}`;
}

export function formatSpeed(downloadMbps: number, uploadMbps: number): string {
  return `${downloadMbps}/${uploadMbps} Mbps`;
}

export function getFibrePriceCompanyName(companyId: string): string {
  return fibreCompanyById[companyId]?.name ?? companyId;
}
