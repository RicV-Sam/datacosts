import type { MonthlyDataDealOffer } from './monthlyDeals';

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
