import { currentMonthlyDealSnapshot, getExpectedComparisonSizes, type MonthlyDataDealOffer } from './monthlyDeals';

// Supplemental current evidence; historical monthly snapshots remain immutable.
// Prices, allocations and validity checked on the official pages on 12 October 2026.
export const comparisonOfferUpdates: MonthlyDataDealOffer[] = [
  {
    id: 'mtn-monthly-2-plus-2-2026-10', providerId: 'mtn', providerName: 'MTN',
    offerName: 'Monthly 2GB Anytime + 2GB Night Express', comparisonSizesGb: [],
    advertisedDataLabel: '4GB total: 2GB anytime + 2GB Night Express', priceZar: 155,
    allocation: { anytimeGb: 2, nightGb: 2, streamingGb: 0, socialGb: 0, otherRestricted: [] },
    validity: { kind: 'days', days: 30, label: '30 days' }, billing: 'once_off',
    paymentModel: { kind: 'mixed', note: 'Available to PayAsYouGo and postpaid customers; confirm purchase and billing terms.' },
    commitment: { kind: 'once_off' }, productType: 'mobile_data', accessTier: 'provider_customer',
    purchaseChannels: ['MTN app', 'MTN Chat', 'MTN USSD', 'Participating retailers and banks'],
    eligibility: 'Available to MTN PayAsYouGo and postpaid customers. Select the once-off option; a recurring option also exists.',
    importantNotes: ['The 2GB Night Express wallet is restricted to overnight use and does not count as anytime data.', 'The Internet Bundles terms state 23:59–05:00, while dedicated Night Express terms state 00:01–04:59. Confirm the applicable window with MTN before scheduling downloads.'],
    rankingStatus: 'eligible',
    source: { url: 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles', title: 'MTN Internet Bundles terms', checkedAt: '2026-10-12', official: true }
  },
  {
    id: 'vodacom-prepaid-lte-2-plus-2-2026-10', providerId: 'vodacom', providerName: 'Vodacom',
    offerName: 'Prepaid LTE 2GB Anytime + 2GB Night Owl', comparisonSizesGb: [],
    advertisedDataLabel: '4GB total: 2GB anytime + 2GB Night Owl', priceZar: 49,
    allocation: { anytimeGb: 2, nightGb: 2, streamingGb: 0, socialGb: 0, otherRestricted: [] },
    validity: { kind: 'days', days: 14, label: '14 days' }, billing: 'once_off',
    paymentModel: { kind: 'prepaid', settlement: 'upfront' }, commitment: { kind: 'once_off' },
    productType: 'prepaid_lte', accessTier: 'qualifying_price_plan',
    purchaseChannels: ['*123#', 'VodaPay app'],
    eligibility: 'Requires the Vodacom Prepaid LTE price plan. The terms exclude Community Service and CST Management SIMs.',
    importantNotes: ['Night Owl runs from 00:00 to 05:00.', 'Price includes VAT. This is a 14-day LTE price-plan product, not a like-for-like 30-day smartphone bundle.', 'Eligibility and purchase terms: https://www.vodacom.co.za/vodacom/terms/home-prepaid-lte'],
    rankingStatus: 'context_only', rankingExclusionReason: '14-day LTE price-plan offer; excluded from monthly smartphone awards.',
    source: { url: 'https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans', title: 'Vodacom prepaid plans and LTE pricing', checkedAt: '2026-10-12', official: true }
  }
];


// Extend verified provider series without editing immutable historical snapshots.
function checkedSeries(providerId: MonthlyDataDealOffer['providerId'], prices: Record<number, number>, templateId: string): MonthlyDataDealOffer[] {
  const template = currentMonthlyDealSnapshot.offers.find(offer => offer.id === templateId);
  if (!template) throw new Error(`Missing provider evidence template: ${templateId}`);
  return Object.entries(prices).map(([amount, priceZar]) => {
    const anytimeGb = Number(amount);
    const allocation = { anytimeGb, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [] };
    return { ...template,
      id: `${providerId}-reviewed-${anytimeGb}gb-2026-10-12`,
      offerName: `${anytimeGb}GB ${template.billing === 'recurring_monthly' ? 'monthly plan' : '30-day data bundle'}`,
      advertisedDataLabel: `${anytimeGb}GB anytime`, priceZar, allocation,
      comparisonSizesGb: getExpectedComparisonSizes(allocation),
      source: { ...template.source, checkedAt: '2026-10-12' }
    };
  });
}
comparisonOfferUpdates.push(
  ...checkedSeries('airmobile', { 2: 60, 5: 100, 15: 220 }, 'airmobile-data-only-10gb-2026-10'),
  ...checkedSeries('nedbank-connect', { 2: 60, 5: 100, 15: 220, 50: 450 }, 'nedbank-connect-prepaid-10gb-2026-10'),
  ...checkedSeries('fnb-connect', { 6: 139, 50: 369 }, 'fnb-connect-data-plan-12gb-2026-10')
);
const capitecTemplate = currentMonthlyDealSnapshot.offers.find(offer => offer.id === 'capitec-connect-10gb-30-day-2026-10');
if (!capitecTemplate) throw new Error('Missing Capitec evidence template');
for (const [anytimeGb, priceZar, days] of [[2, 59, 30], [5, 100, 30], [50, 450, 60]]) {
  const allocation = { anytimeGb, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [], conditionalBonusGb: anytimeGb * 0.2,
    conditionalBonusNote: 'The official linked-number column includes a 20% allocation bonus; rankings use only the guaranteed base allocation.' };
  comparisonOfferUpdates.push({ ...capitecTemplate, id: `capitec-connect-reviewed-${anytimeGb}gb-2026-10-12`,
    offerName: `${anytimeGb}GB ${days}-day data bundle`, advertisedDataLabel: `${anytimeGb}GB base allocation; linked-number bonus shown separately`,
    priceZar, allocation, comparisonSizesGb: getExpectedComparisonSizes(allocation), validity: { kind: 'days', days, label: `${days} days` },
    importantNotes: ['Rankings use the guaranteed base allocation; the linked-number bonus is conditional.'],
    rankingStatus: days === 30 ? 'eligible' : 'context_only',
    ...(days === 60 ? { rankingExclusionReason: '60-day validity; excluded from like-for-like monthly awards.' } : {}),
    source: { ...capitecTemplate.source, checkedAt: '2026-10-12' }
  });
}


for (const original of currentMonthlyDealSnapshot.offers.filter(offer =>
  offer.providerId === 'standard-bank-connect' || offer.id === 'cell-c-10-plus-10-2026-10' ||
  (offer.providerId === 'fnb-connect' && offer.billing === 'recurring_monthly'))) {
  const notes = original.id === 'cell-c-10-plus-10-2026-10'
    ? ['Only 10GB is pooled anytime data. The other 10GB is Nite data usable from 00:00 to 04:59:59; this window is not the 30-day bundle expiry.', 'General 30-day bundle terms confirm Prepaid, Hybrid and Postpaid eligibility.']
    : original.importantNotes;
  comparisonOfferUpdates.push({ ...original, importantNotes: notes, source: { ...original.source, checkedAt: '2026-10-12' } });
}
for (const offer of comparisonOfferUpdates.filter(offer => offer.providerId === 'fnb-connect' && offer.billing === 'recurring_monthly')) {
  offer.commitment = { kind: 'month_to_month', cancellationNote: "Open-ended packages require one month's termination notice; fees remain payable through the notice period." };
  offer.importantNotes = [...offer.importantNotes, "Open-ended package cancellation requires one month's notice; this is not immediate free cancellation."];
}
