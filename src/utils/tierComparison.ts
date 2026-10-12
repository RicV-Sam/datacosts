import { getAdvertisedAllocationTotalGb, getDealSizeUpperBound, TRACKED_DATA_SIZES_GB, type MonthlyDataDealOffer, type TrackedDataSizeGb } from '../data/monthlyDeals';
import { getDealAwards, sortDealsForDisplay } from './monthlyDealRanking';
import { getComparisonOfferCatalog } from './comparisonOfferCatalog';

import { hasCurrentOfferEvidence, hasRecordedOfferEvidence } from './comparisonEvidence';
export { hasCurrentOfferEvidence, hasRecordedOfferEvidence } from './comparisonEvidence';

export function getTierTargetGb(mode: string): number | null {
  const match = /^cheapest-(1|2|5|10|15|20|50)gb$/.exec(mode);
  return match ? Number(match[1]) : null;
}

/** Same bands and awards as the monthly tracker; never turn a fallback into a target-size winner. */
export function getTierComparison(mode: string, allOffers = getComparisonOfferCatalog(), now = new Date()) {
  const targetGb = getTierTargetGb(mode);
  if (targetGb === null || targetGb === 1) return null;
  const sizeGb = targetGb as 2 | TrackedDataSizeGb;
  const upperGb = sizeGb === 2 ? 5 : getDealSizeUpperBound(sizeGb);
  // Preserve dated reference comparisons after publication; expired evidence cannot win awards.
  const checkedOffers = allOffers.filter(offer => hasRecordedOfferEvidence(offer, now));
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
  const currentOffers = offers.filter(offer => hasCurrentOfferEvidence(offer, now));
  const awards = fallback ? { bestOverall: null, bestAnytimeValue: null, lowestAdvertisedPrice: null } : getDealAwards(sizeGb, currentOffers, now);
  return { targetGb, sizeGb: displaySizeGb, upperGb, fallback, offers, currentOffers, awards, hasOverdueEvidence: currentOffers.length < offers.length };
}
