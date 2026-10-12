export interface StagedOfferValues {
  monthly: number;
  months: number;
  onceOff: number;
  introMonthly: number;
  introMonths: number;
}

const isAmount = (value: number) => Number.isFinite(value) && value >= 0 && value <= 1_000_000;
const toCents = (value: number) => Math.round(value * 100);

export function calculateStagedOfferCost(offer: StagedOfferValues): { total: number; effective: number } | null {
  if (![offer.monthly, offer.onceOff, offer.introMonthly].every(isAmount)
    || !Number.isInteger(offer.months) || offer.months < 1 || offer.months > 1200
    || !Number.isInteger(offer.introMonths) || offer.introMonths < 0 || offer.introMonths > offer.months) return null;
  const cents = toCents(offer.introMonthly) * offer.introMonths
    + toCents(offer.monthly) * (offer.months - offer.introMonths) + toCents(offer.onceOff);
  return { total: cents / 100, effective: cents / 100 / offer.months };
}

export interface BundleSimulationInput {
  periodDays: number;
  usageDays: number[];
  usageGb: number;
  dailyGb: number;
  dailyPrice: number;
  longerGb: number;
  longerPrice: number;
  longerValidityDays: number;
}

export interface BundlePathResult {
  purchases: number;
  total: number;
  usedGb: number;
  unusedGb: number;
  costPerUsedGb: number | null;
}

export function parseUsageDays(text: string, periodDays: number): number[] | null {
  if (!Number.isInteger(periodDays) || periodDays < 1 || periodDays > 366) return null;
  if (!text.trim()) return Array.from({ length: periodDays }, (_, index) => index + 1);
  const tokens = text.split(',').map((token) => token.trim());
  if (tokens.some((token) => !/^\d+$/.test(token))) return null;
  const days = tokens.map(Number);
  if (days.some((day) => day < 1 || day > periodDays)) return null;
  return [...new Set(days)].sort((a, b) => a - b);
}

// Integer thousandths of a GB avoid spurious extra purchases at decimal boundaries.
// Each purchase keeps its own expiry; buying again does not renew an older balance.
function simulatePath(input: BundleSimulationInput, allowanceGb: number, price: number, validityDays: number): BundlePathResult {
  const allowance = Math.round(allowanceGb * 1000);
  const usage = Math.round(input.usageGb * 1000);
  let purchases = 0;
  const balances: Array<{ remaining: number; expiresOn: number }> = [];
  for (const day of [...new Set(input.usageDays)].sort((a, b) => a - b)) {
    let need = usage;
    for (const balance of balances) {
      if (balance.expiresOn <= day) balance.remaining = 0;
      const used = Math.min(need, balance.remaining);
      need -= used;
      balance.remaining -= used;
    }
    if (need > 0) {
      const count = Math.ceil(need / allowance);
      purchases += count;
      balances.push({ remaining: count * allowance - need, expiresOn: day + validityDays });
    }
  }
  const usedUnits = new Set(input.usageDays).size * usage;
  const usedGb = usedUnits / 1000;
  const total = purchases * toCents(price) / 100;
  return {
    purchases, total, usedGb,
    unusedGb: (purchases * allowance - usedUnits) / 1000,
    costPerUsedGb: usedGb > 0 ? total / usedGb : null
  };
}

export function simulateBundleCosts(input: BundleSimulationInput): { daily: BundlePathResult; longer: BundlePathResult } | null {
  const validGb = (value: number) => Number.isFinite(value) && value >= 0.001 && value <= 1000
    && Math.abs(value * 1000 - Math.round(value * 1000)) < 0.000001;
  if (!Number.isInteger(input.periodDays) || input.periodDays < 1 || input.periodDays > 366
    || !Number.isInteger(input.longerValidityDays) || input.longerValidityDays < 1 || input.longerValidityDays > 366
    || ![input.dailyGb, input.longerGb].every(validGb)
    || !(input.usageGb === 0 || validGb(input.usageGb))
    || ![input.dailyPrice, input.longerPrice].every(isAmount)
    || input.usageDays.some((day) => !Number.isInteger(day) || day < 1 || day > input.periodDays)) return null;
  return {
    daily: simulatePath(input, input.dailyGb, input.dailyPrice, 1),
    longer: simulatePath(input, input.longerGb, input.longerPrice, input.longerValidityDays)
  };
}
