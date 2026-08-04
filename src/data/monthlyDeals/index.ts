import { august2026DealSnapshot } from './history/2026-08';
import type { MonthlyDataDealSnapshot, MonthlyDataDealOffer, TrackedDataSizeGb } from './types';

export * from './types';
export * from './sizeBands';

export const LAUNCHED_DEAL_SIZES_GB: TrackedDataSizeGb[] = [10, 20, 30];

// Append new immutable snapshots here. Keeping older entries makes month-over-month
// editorial review possible without creating new public URLs.
export const monthlyDealHistory: MonthlyDataDealSnapshot[] = [august2026DealSnapshot];

export const currentMonthlyDealSnapshot = [...monthlyDealHistory]
  .sort((left, right) => right.month.localeCompare(left.month))[0];

export function getCurrentOffersForSize(sizeGb: TrackedDataSizeGb): MonthlyDataDealOffer[] {
  return currentMonthlyDealSnapshot.offers.filter((offer) => offer.comparisonSizesGb.includes(sizeGb));
}

export function getDealSizePath(sizeGb: TrackedDataSizeGb): string {
  return `/best-${sizeGb}gb-data-deals-south-africa/`;
}
