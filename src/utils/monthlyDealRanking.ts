import {
  isAmountInDealSizeBand,
  type DealAccessTier,
  type MonthlyDataDealOffer,
  type TrackedDataSizeGb
} from '../data/monthlyDeals';

export interface DealOfferMetrics {
  advertisedTotalGb: number;
  restrictedGb: number;
  anytimeShare: number;
  costPerAnytimeGb: number | null;
  costPerAdvertisedGb: number | null;
}

export interface DealAwards {
  bestOverall: MonthlyDataDealOffer | null;
  lowestAdvertisedPrice: MonthlyDataDealOffer | null;
  bestAnytimeValue: MonthlyDataDealOffer | null;
}

const ACCESS_ORDER: Record<DealAccessTier, number> = {
  public: 0,
  provider_customer: 1,
  qualifying_price_plan: 2
};

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getDealOfferMetrics(offer: MonthlyDataDealOffer): DealOfferMetrics {
  const otherRestrictedGb = offer.allocation.otherRestricted.reduce((total, item) => total + item.gb, 0);
  const restrictedGb =
    offer.allocation.nightGb +
    offer.allocation.streamingGb +
    offer.allocation.socialGb +
    otherRestrictedGb;
  const advertisedTotalGb = offer.allocation.anytimeGb + restrictedGb + (offer.allocation.conditionalBonusGb ?? 0);

  return {
    advertisedTotalGb,
    restrictedGb,
    anytimeShare: advertisedTotalGb > 0 ? offer.allocation.anytimeGb / advertisedTotalGb : 0,
    costPerAnytimeGb:
      offer.allocation.anytimeGb > 0
        ? roundCurrency(offer.priceZar / offer.allocation.anytimeGb)
        : null,
    costPerAdvertisedGb:
      advertisedTotalGb > 0
        ? roundCurrency(offer.priceZar / advertisedTotalGb)
        : null
  };
}

export function isMonthlyComparable(offer: MonthlyDataDealOffer): boolean {
  return offer.validity.kind === 'monthly' || (offer.validity.days >= 28 && offer.validity.days <= 31);
}

function tieBreak(left: MonthlyDataDealOffer, right: MonthlyDataDealOffer): number {
  if (left.priceZar !== right.priceZar) return left.priceZar - right.priceZar;
  if (ACCESS_ORDER[left.accessTier] !== ACCESS_ORDER[right.accessTier]) {
    return ACCESS_ORDER[left.accessTier] - ACCESS_ORDER[right.accessTier];
  }
  if (left.billing !== right.billing) return left.billing === 'once_off' ? -1 : 1;
  return left.providerName.localeCompare(right.providerName);
}

export function getDealAwards(
  sizeGb: TrackedDataSizeGb,
  offers: MonthlyDataDealOffer[]
): DealAwards {
  const awardEligible = offers.filter(
    (offer) => offer.rankingStatus === 'eligible' && isMonthlyComparable(offer)
  );

  const anytimeEligible = awardEligible
    .filter((offer) => isAmountInDealSizeBand(offer.allocation.anytimeGb, sizeGb));

  const bestOverall = [...anytimeEligible].sort((left, right) => tieBreak(left, right));

  const bestAnytimeValue = [...anytimeEligible]
    .sort((left, right) => {
      const leftCost = getDealOfferMetrics(left).costPerAnytimeGb ?? Number.POSITIVE_INFINITY;
      const rightCost = getDealOfferMetrics(right).costPerAnytimeGb ?? Number.POSITIVE_INFINITY;
      return leftCost - rightCost || tieBreak(left, right);
    });

  const advertisedEligible = awardEligible
    .filter((offer) => isAmountInDealSizeBand(getDealOfferMetrics(offer).advertisedTotalGb, sizeGb))
    .sort((left, right) => tieBreak(left, right));

  return {
    bestOverall: bestOverall[0] ?? null,
    lowestAdvertisedPrice: advertisedEligible[0] ?? null,
    bestAnytimeValue: bestAnytimeValue[0] ?? null
  };
}

export function sortDealsForDisplay(
  sizeGb: TrackedDataSizeGb,
  offers: MonthlyDataDealOffer[]
): MonthlyDataDealOffer[] {
  const awards = getDealAwards(sizeGb, offers);
  return [...offers].sort((left, right) => {
    const awardPriority = (offer: MonthlyDataDealOffer): number => {
      if (offer.id === awards.bestOverall?.id) return 0;
      if (offer.id === awards.bestAnytimeValue?.id) return 1;
      if (offer.id === awards.lowestAdvertisedPrice?.id) return 2;
      return offer.rankingStatus === 'eligible' ? 3 : 4;
    };
    const leftPriority = awardPriority(left);
    const rightPriority = awardPriority(right);
    if (leftPriority !== rightPriority) return leftPriority - rightPriority;
    if (left.rankingStatus !== right.rankingStatus) return left.rankingStatus === 'eligible' ? -1 : 1;
    return tieBreak(left, right);
  });
}
