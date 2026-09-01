export const TRACKED_DATA_SIZES_GB = [5, 10, 15, 20, 30, 50] as const;

export const DEAL_PROVIDER_IDS = [
  'airmobile',
  'capitec-connect',
  'cell-c',
  'fnb-connect',
  'melon-mobile',
  'mtn',
  'nedbank-connect',
  'standard-bank-connect',
  'telkom',
  'vodacom'
] as const;

export type TrackedDataSizeGb = (typeof TRACKED_DATA_SIZES_GB)[number];
export type DealProviderId = (typeof DEAL_PROVIDER_IDS)[number];
export type DealProviderKind = 'network_operator' | 'mvno';
export type DealHostNetworkId = 'cell-c' | 'mtn' | 'rain' | 'telkom' | 'vodacom';
export type DealBillingCadence = 'once_off' | 'recurring_monthly';
export type DealBilling = DealBillingCadence;
export type DealProductType = 'mobile_data' | 'mobile_plan' | 'prepaid_lte';
export type DealAccessTier = 'public' | 'provider_customer' | 'qualifying_price_plan';
export type DealRankingStatus = 'eligible' | 'context_only';

export type DealPaymentModel =
  | { kind: 'prepaid'; settlement: 'upfront' }
  | { kind: 'top_up'; settlement: 'pre_funded' }
  | { kind: 'postpaid'; settlement: 'in_arrears' }
  | { kind: 'mixed'; note: string }
  | { kind: 'not_confirmed'; note: string };

export type DealCommitment =
  | { kind: 'once_off' }
  | { kind: 'month_to_month'; cancellationNote?: string }
  | { kind: 'fixed_term'; months: number; cancellationNote?: string }
  | { kind: 'not_confirmed'; note: string };

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
  /** Price recurrence only. Do not infer payment timing or commitment from this field. */
  billing: DealBillingCadence;
  /** Optional only so immutable pre-taxonomy snapshots remain readable. Required for the current snapshot. */
  paymentModel?: DealPaymentModel;
  /** Optional only so immutable pre-taxonomy snapshots remain readable. Required for the current snapshot. */
  commitment?: DealCommitment;
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
