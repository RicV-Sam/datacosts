import type { Bundle } from '../types';

// Editorial history only: do not import these rows into public comparisons or schema.
// Restore a row to src/data.ts only after its current terms can be verified.
export const withheldBundles: readonly (Bundle & {
  withheldAt: string;
  withholdingReason: string;
})[] = [
  {
    id: 'voda-night-owl-250mb',
    slug: 'vodacom-night-owl-250mb-price',
    network: 'Vodacom',
    name: 'Vodacom Night Owl 250MB',
    price: 14,
    volume: '250MB',
    validity: '24 Hours',
    type: 'Daily',
    anytimeData: '0MB',
    nightData: '250MB',
    costPerGb: 56,
    bestFor: 'Late-night updates and overnight downloads',
    watchOut: 'The recorded 250MB/R14 offer was not found in the current public catalogue. Confirm current availability and price with Vodacom; absence alone does not establish withdrawal.',
    sourceUrl: 'https://www.vodacom.co.za/vodacom/shopping/data/prepaid-data',
    sourceLabel: 'Vodacom prepaid data page',
    sourceConfidence: 'manual_required',
    lastVerified: '2026-09-01',
    productType: 'night_data',
    nightWindow: '00:00-05:00',
    withheldAt: '2026-10-02',
    withholdingReason: 'Current price and availability could not be confirmed. Withheld from the active catalogue following the October audit; not declared discontinued.'
  }
];
