export const TRACKED_DATA_SIZES_GB = [5, 10, 15, 20, 30, 50] as const;

export type TrackedDataSizeGb = (typeof TRACKED_DATA_SIZES_GB)[number];

export type DealProviderId =
  | 'airmobile'
  | 'capitec-connect'
  | 'cell-c'
  | 'fnb-connect'
  | 'melon-mobile'
  | 'mtn'
  | 'nedbank-connect'
  | 'standard-bank-connect'
  | 'telkom'
  | 'vodacom';

export type DealBilling = 'once_off' | 'recurring_monthly';
export type DealProductType = 'mobile_data' | 'mobile_plan' | 'prepaid_lte';
export type DealAccessTier = 'public' | 'provider_customer' | 'qualifying_price_plan';
export type DealRankingStatus = 'eligible' | 'context_only';

export interface RestrictedDataAllocation {
  label: string;
  gb: number;
  restriction: string;
}

export interface DealDataAllocation {
  anytimeGb: number;
  nightGb: number;
  streamingGb: number;
  socialGb: number;
  otherRestricted: RestrictedDataAllocation[];
  conditionalBonusGb?: number;
  conditionalBonusNote?: string;
}

export type DealValidity =
  | { kind: 'days'; days: number; label: string }
  | { kind: 'monthly'; label: string };

export interface DealOfferSource {
  url: string;
  title: string;
  checkedAt: string;
  official: true;
}

export interface MonthlyDataDealOffer {
  id: string;
  providerId: DealProviderId;
  providerName: string;
  offerName: string;
  comparisonSizesGb: TrackedDataSizeGb[];
  advertisedDataLabel: string;
  priceZar: number;
  allocation: DealDataAllocation;
  validity: DealValidity;
  billing: DealBilling;
  productType: DealProductType;
  accessTier: DealAccessTier;
  purchaseChannels: string[];
  eligibility: string;
  importantNotes: string[];
  rankingStatus: DealRankingStatus;
  rankingExclusionReason?: string;
  source: DealOfferSource;
}

export interface MonthlyDataDealSnapshot {
  month: string;
  label: string;
  checkedAt: string;
  methodologyVersion: string;
  offers: MonthlyDataDealOffer[];
}
