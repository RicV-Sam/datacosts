import { TRACKED_DATA_SIZES_GB, type DealDataAllocation, type TrackedDataSizeGb } from './types';

const TERMINAL_UPPER_BOUND_GB = 100;

export function getDealSizeUpperBound(sizeGb: TrackedDataSizeGb): number {
  const index = TRACKED_DATA_SIZES_GB.indexOf(sizeGb);
  return TRACKED_DATA_SIZES_GB[index + 1] ?? TERMINAL_UPPER_BOUND_GB;
}

export function isAmountInDealSizeBand(amountGb: number, sizeGb: TrackedDataSizeGb): boolean {
  return amountGb >= sizeGb && amountGb < getDealSizeUpperBound(sizeGb);
}

export function getAdvertisedAllocationTotalGb(allocation: DealDataAllocation): number {
  return (
    allocation.anytimeGb +
    allocation.nightGb +
    allocation.streamingGb +
    allocation.socialGb +
    (allocation.conditionalBonusGb ?? 0) +
    allocation.otherRestricted.reduce((total, item) => total + item.gb, 0)
  );
}

export function getExpectedComparisonSizes(allocation: DealDataAllocation): TrackedDataSizeGb[] {
  const advertisedTotalGb = getAdvertisedAllocationTotalGb(allocation);
  return TRACKED_DATA_SIZES_GB.filter(
    (sizeGb) =>
      isAmountInDealSizeBand(allocation.anytimeGb, sizeGb) ||
      isAmountInDealSizeBand(advertisedTotalGb, sizeGb)
  );
}
