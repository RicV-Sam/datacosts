import { getAdvertisedAllocationTotalGb, getDealSizeUpperBound, TRACKED_DATA_SIZES_GB, type MonthlyDataDealOffer, type TrackedDataSizeGb } from '../data/monthlyDeals';
import { getDealAwards, sortDealsForDisplay } from './monthlyDealRanking';
import { getComparisonOfferCatalog } from './comparisonOfferCatalog';

const OFFICIAL_HOSTS: Record<MonthlyDataDealOffer['providerId'], string> = {
  airmobile: 'afrihost.com', 'capitec-connect': 'capitecbank.co.za', 'cell-c': 'cellc.co.za',
  'fnb-connect': 'fnb.co.za', 'melon-mobile': 'melonmobile.co.za', mtn: 'mtn.co.za',
  'nedbank-connect': 'nedbank.co.za', 'standard-bank-connect': 'standardbank.co.za',
  telkom: 'telkom.co.za', vodacom: 'vodacom.co.za'
};

export function getTierTargetGb(mode: string): number | null {
  const match = /^cheapest-(1|2|5|10|15|20|50)gb$/.exec(mode);
  return match ? Number(match[1]) : null;
}

export function hasCurrentOfferEvidence(offer: MonthlyDataDealOffer, now = new Date()): boolean {
  let url: URL;
  try { url = new URL(offer.source.url); } catch { return false; }
  const host = OFFICIAL_HOSTS[offer.providerId];
  const checked = Date.parse(`${offer.source.checkedAt}T00:00:00Z`);
  const age = now.getTime() - checked;
  const allocations = [offer.allocation.anytimeGb, offer.allocation.nightGb, offer.allocation.socialGb,
    offer.allocation.streamingGb, ...offer.allocation.otherRestricted.map(item => item.gb)];
  return offer.source.official === true && url.protocol === 'https:' && !url.username && !url.password &&
    (url.hostname === host || url.hostname.endsWith(`.${host}`)) &&
    /^\d{4}-\d{2}-\d{2}$/.test(offer.source.checkedAt) && Number.isFinite(age) && new Date(checked).toISOString().slice(0, 10) === offer.source.checkedAt && age >= 0 && age < 30 * 86400000 &&
    Number.isFinite(offer.priceZar) && offer.priceZar > 0 &&
    allocations.every(value => Number.isFinite(value) && value >= 0) &&
    Boolean(offer.eligibility.trim()) && Boolean(offer.validity.label.trim());
}

/** Same bands and awards as the monthly tracker; never turn a fallback into a target-size winner. */
export function getTierComparison(mode: string, allOffers = getComparisonOfferCatalog(), now = new Date()) {
  const targetGb = getTierTargetGb(mode);
  if (targetGb === null || targetGb === 1) return null;
  const sizeGb = targetGb as 2 | TrackedDataSizeGb;
  const upperGb = sizeGb === 2 ? 5 : getDealSizeUpperBound(sizeGb);
  const checkedOffers = allOffers.filter(offer => hasCurrentOfferEvidence(offer, now));
  // Restricted totals can enter the display band, but only pooled-anytime data can win anytime awards.
  const matches = checkedOffers.filter(offer => sizeGb === 2
    ? [offer.allocation.anytimeGb, getAdvertisedAllocationTotalGb(offer.allocation)].some(amount => amount >= 2 && amount < 5)
    : offer.comparisonSizesGb.includes(sizeGb));
  const fallback = matches.length === 0;
  const nextSize = TRACKED_DATA_SIZES_GB.find(size => size > targetGb && checkedOffers.some(offer => offer.comparisonSizesGb.includes(size)));
  const displaySizeGb = fallback && nextSize ? nextSize : sizeGb;
  const candidates = fallback
    ? checkedOffers.filter(offer => nextSize !== undefined && offer.comparisonSizesGb.includes(nextSize))
    : matches;
  const offers = displaySizeGb === 2 ? [...candidates].sort((a, b) => a.priceZar - b.priceZar) : sortDealsForDisplay(displaySizeGb, candidates);
  // The 2GB evidence mixes 14- and 30-day products; do not claim a like-for-like winner.
  const awards = fallback || sizeGb === 2 ? { bestOverall: null, bestAnytimeValue: null, lowestAdvertisedPrice: null } : getDealAwards(sizeGb, offers);
  return { targetGb, sizeGb: displaySizeGb, upperGb, fallback, offers, awards };
}
