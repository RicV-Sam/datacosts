import type { MonthlyDataDealOffer, DealProviderId } from '../data/monthlyDeals/types';
import { calculateStagedOfferCost, type StagedOfferValues } from './costCalculators';
import { hasCurrentOfferEvidence } from './comparisonEvidence';
import { USAGE_RATES, type UsageProfile } from './dataCalculator';

const finite = (value: number, max = 1_000_000) => Number.isFinite(value) && value >= 0 && value <= max;

export interface ConsumptionInput {
  days: number;
  price: number;
  anytimeGb: number;
  nightGb: number;
  daytimeUseGb: number;
  nightUseGb: number;
  dailyRelease: boolean;
}

// One purchase: a daily wallet cannot borrow tomorrow's allowance; pooled wallets
// can. Night traffic uses its night wallet first, then the remaining anytime wallet.
export function calculateConsumedData(input: ConsumptionInput) {
  if (!Number.isInteger(input.days) || input.days < 1 || input.days > 366
    || ![input.price, input.anytimeGb, input.nightGb, input.daytimeUseGb, input.nightUseGb].every((n) => finite(n))) return null;
  const units = (gb: number) => Math.round(gb * 1000);
  const dayNeed = units(input.daytimeUseGb);
  const nightNeed = units(input.nightUseGb);
  const multiplier = input.dailyRelease ? input.days : 1;
  const any = units(input.anytimeGb);
  const night = units(input.nightGb);
  const demandDay = dayNeed * (input.dailyRelease ? 1 : input.days);
  const demandNight = nightNeed * (input.dailyRelease ? 1 : input.days);
  const usedNight = Math.min(night, demandNight);
  // Daytime demand receives the anytime wallet first; spare anytime can cover night demand.
  const usedAny = Math.min(any, demandDay + demandNight - usedNight);
  const usedGb = (usedAny + usedNight) * multiplier / 1000;
  const allowanceGb = (any + night) * multiplier / 1000;
  const price = Math.round(input.price * 100) / 100;
  return {
    allowanceGb, usedGb, unusedGb: (any + night - usedAny - usedNight) * multiplier / 1000,
    unmetGb: Math.max(0, (dayNeed + nightNeed) * input.days - (usedAny + usedNight) * multiplier) / 1000,
    costPerUsedGb: usedGb > 0 ? price / usedGb : null,
    costPerAnytimeGb: any > 0 ? price / (any * multiplier / 1000) : null
  };
}

export function calculatePhoneOwnership(contract: StagedOfferValues, handset: number, prepaidMonthly: number, prepaidOnceOff: number) {
  const cost = calculateStagedOfferCost(contract);
  if (!cost || ![handset, prepaidMonthly, prepaidOnceOff].every((n) => finite(n))) return null;
  const prepaid = (Math.round(handset * 100) + Math.round(prepaidOnceOff * 100)
    + Math.round(prepaidMonthly * 100) * contract.months) / 100;
  return { contract: cost.total, prepaid, difference: cost.total - prepaid };
}

export function calculateUsageScenario(usage: UsageProfile, mobilePercent: number, rates: UsageProfile = USAGE_RATES) {
  if (!finite(mobilePercent, 100) || !Object.values(usage).every((n) => finite(n, 24))
    || !Object.values(rates).every((n) => finite(n, 100))) return null;
  const base = (Object.keys(usage) as Array<keyof UsageProfile>)
    .reduce((sum, key) => sum + usage[key] * rates[key], 0) * 30 * mobilePercent / 100;
  // A disclosed sensitivity exercise, not confidence intervals or observed subscriber data.
  return { lower: base * 0.75, base, higher: base * 1.25 };
}

export interface SelectorPreferences {
  needGb: number;
  minimumDays: number;
  banks: DealProviderId[];
  planProviders: DealProviderId[];
  allowLte: boolean;
  allowRecurring: boolean;
}
const BANK_PROVIDERS: DealProviderId[] = ['capitec-connect', 'fnb-connect', 'nedbank-connect', 'standard-bank-connect'];

export function selectListedBundles(offers: MonthlyDataDealOffer[], preferences: SelectorPreferences, now: Date = new Date()) {
  if (!finite(preferences.needGb, 1000) || preferences.needGb <= 0
    || !Number.isInteger(preferences.minimumDays) || preferences.minimumDays < 1 || preferences.minimumDays > 366) return null;
  return offers.filter((offer) => {
    // Use the same current source-evidence policy as the comparison engine.
    if (offer.rankingStatus !== 'eligible' || !hasCurrentOfferEvidence(offer, now)
      || !finite(offer.priceZar) || !finite(offer.allocation.anytimeGb)
      || offer.allocation.anytimeGb < preferences.needGb) return false;
    if (BANK_PROVIDERS.includes(offer.providerId) && !preferences.banks.includes(offer.providerId)) return false;
    // Bank account/SIM qualification is declared in the bank controls. Only
    // non-bank tariff changes need the separate special-price-plan declaration.
    if (offer.accessTier === 'qualifying_price_plan' && !BANK_PROVIDERS.includes(offer.providerId)
      && !preferences.planProviders.includes(offer.providerId)) return false;
    if (offer.productType === 'prepaid_lte' && !preferences.allowLte) return false;
    if (offer.billing === 'recurring_monthly' && !preferences.allowRecurring) return false;
    if (!offer.commitment || !['once_off', 'month_to_month'].includes(offer.commitment.kind)) return false;
    // Calendar-month offers cannot promise a fixed number of days, so they do not
    // satisfy this selector's exact-day validity requirement.
    return offer.validity.kind === 'days' && offer.validity.days >= preferences.minimumDays;
  }).sort((a, b) => a.priceZar - b.priceZar || a.id.localeCompare(b.id));
}
