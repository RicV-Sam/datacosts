import type {
  DealAccessTier,
  DealBilling,
  DealOfferSource,
  DealProductType,
  MonthlyDataDealOffer,
  MonthlyDataDealSnapshot
} from '../types';
import { getExpectedComparisonSizes } from '../sizeBands';

const CHECKED_AT = '2026-08-04';

function officialSource(url: string, title: string): DealOfferSource {
  return { url, title, checkedAt: CHECKED_AT, official: true };
}

function createAnytimeSeries(config: {
  idPrefix: string;
  providerId: MonthlyDataDealOffer['providerId'];
  providerName: string;
  prices: Record<number, number>;
  validity: MonthlyDataDealOffer['validity'];
  billing: DealBilling;
  productType: DealProductType;
  accessTier: DealAccessTier;
  purchaseChannels: string[];
  eligibility: string;
  importantNotes: string[];
  source: DealOfferSource;
}): MonthlyDataDealOffer[] {
  return Object.entries(config.prices).map(([sizeValue, priceValue]) => {
    const sizeGb = Number(sizeValue);
    const priceZar = priceValue;
    const allocation = {
      anytimeGb: sizeGb,
      nightGb: 0,
      streamingGb: 0,
      socialGb: 0,
      otherRestricted: []
    };
    return {
      id: `${config.idPrefix}-${sizeGb}gb-2026-08`,
      providerId: config.providerId,
      providerName: config.providerName,
      offerName: `${sizeGb}GB ${config.productType === 'mobile_plan' ? 'monthly plan' : 'data bundle'}`,
      comparisonSizesGb: getExpectedComparisonSizes(allocation),
      advertisedDataLabel: `${sizeGb}GB anytime`,
      priceZar,
      allocation,
      validity: config.validity,
      billing: config.billing,
      productType: config.productType,
      accessTier: config.accessTier,
      purchaseChannels: config.purchaseChannels,
      eligibility: config.eligibility,
      importantNotes: config.importantNotes,
      rankingStatus: 'eligible',
      source: config.source
    };
  });
}

const airmobileOffers = createAnytimeSeries({
  idPrefix: 'airmobile-data-only',
  providerId: 'airmobile',
  providerName: 'AirMobile by Afrihost',
  prices: { 10: 150, 20: 250, 30: 350 },
  validity: { kind: 'monthly', label: 'Monthly allocation' },
  billing: 'recurring_monthly',
  productType: 'mobile_data',
  accessTier: 'public',
  purchaseChannels: ['Afrihost website', 'Afrihost app'],
  eligibility: 'Open month-to-month service; a new AirMobile SIM or supported MTN SIM/APN setup is required.',
  importantNotes: [
    'The official page describes this as anytime data with no fixed-term contract.',
    'Unused monthly data rolls over until the last day of the following calendar month, for a maximum rollover period of 31 days.'
  ],
  source: officialSource(
    'https://www.afrihost.com/airmobile/data-only/',
    'Data Only | AirMobile | Afrihost'
  )
});

const nedbankOffers = createAnytimeSeries({
  idPrefix: 'nedbank-connect-prepaid',
  providerId: 'nedbank-connect',
  providerName: 'Nedbank Connect',
  prices: { 10: 150, 20: 250, 30: 350 },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['Nedbank Money app', 'Nedbank Online Banking'],
  eligibility: 'Requires a Nedbank account and an active Nedbank Connect SIM or eSIM.',
  importantNotes: [
    'The official catalogue lists these as standard data bundles and lists social bundles separately.',
    'DataCost treats the standard allocation as general-use data; confirm the checkout wording before purchase.'
  ],
  source: officialSource(
    'https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html',
    'Pitch-perfect prepaid bundles | Nedbank Connect'
  )
});

const melonAnytimeOffers = createAnytimeSeries({
  idPrefix: 'melon-byop-data-only',
  providerId: 'melon-mobile',
  providerName: 'Melon Mobile',
  prices: { 10: 179, 20: 299, 30: 379 },
  validity: { kind: 'days', days: 30, label: '30-day monthly plan' },
  billing: 'recurring_monthly',
  productType: 'mobile_plan',
  accessTier: 'public',
  purchaseChannels: ['Melon Mobile checkout', 'Melon Mobile app'],
  eligibility: 'Open month-to-month build-your-own plan with zero voice minutes and zero SMSs; requires a Melon SIM or eSIM.',
  importantNotes: [
    'The live checkout price is used instead of older marketing examples.',
    'The plan cycle is 30 calendar days; unused data does not expire while a valid paid plan remains active under Melon’s Terms of Use.'
  ],
  source: officialSource(
    'https://my.melonmobile.co.za/offers/selected-plan?data=10&plan=byop&sms=0&voice=0',
    'Melon Mobile Build Your Own Plan checkout'
  )
}).map((offer) => ({
  ...offer,
  source: {
    ...offer.source,
    url: `https://my.melonmobile.co.za/offers/selected-plan?data=${offer.comparisonSizesGb[0]}&plan=byop&sms=0&voice=0`
  }
}));

const fnbSource = officialSource(
  'https://www.fnb.co.za/downloads/pricing-guides/FNB-Connect-Retail.pdf',
  'FNB Connect Retail Annual Pricing Guide 2026–2027'
);

const fnbDataPlanOffers = createAnytimeSeries({
  idPrefix: 'fnb-connect-data-plan',
  providerId: 'fnb-connect',
  providerName: 'FNB Connect',
  prices: { 12: 179, 25: 215 },
  validity: { kind: 'monthly', label: 'Monthly allocation' },
  billing: 'recurring_monthly',
  productType: 'mobile_plan',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['FNB app', 'FNB Online Banking', 'FNB Connect call centre'],
  eligibility: 'Requires a qualifying FNB transactional account and an active FNB Connect SIM or eSIM; applicants must be 18+ or use an eligible linked youth account.',
  importantNotes: [
    'This is a month-to-month data plan, not the more expensive once-off bundle with a matching headline size.',
    'Prices come from the FNB Connect Retail Annual Pricing Guide valid 1 July 2026 to 30 June 2027.'
  ],
  source: fnbSource
});

const fnbOffers = createAnytimeSeries({
  idPrefix: 'fnb-connect-standard-bundle',
  providerId: 'fnb-connect',
  providerName: 'FNB Connect',
  prices: { 20: 549, 30: 599 },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['FNB app', 'FNB Online Banking', 'FNB Connect USSD'],
  eligibility: 'Requires a qualifying FNB transactional account and an active FNB Connect SIM or eSIM; applicants must be 18+ or use an eligible linked youth account.',
  importantNotes: ['Prices come from the FNB Connect Retail Annual Pricing Guide valid 1 July 2026 to 30 June 2027.'],
  source: fnbSource
});

const standardBankEligibility = 'Requires an eligible Standard Bank account in your own name, in good standing, and a Standard Bank Connect SIM or eSIM; applicants must be 18+.';
const standardBankSimPlansSource = officialSource(
  'https://connect.standardbank.co.za/sim-plans',
  'Standard Bank Connect live SIM plans'
);

const standardBank10Gb: MonthlyDataDealOffer = {
  id: 'standard-bank-connect-10gb-bundle-2026-08',
  providerId: 'standard-bank-connect',
  providerName: 'Standard Bank Connect',
  offerName: '10GB data bundle',
  comparisonSizesGb: [10],
  advertisedDataLabel: '10GB anytime',
  priceZar: 399,
  allocation: { anytimeGb: 10, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['Standard Bank Connect website', '*136#'],
  eligibility: standardBankEligibility,
  importantNotes: ['The live bundle catalogue lists a 30-day expiry.'],
  rankingStatus: 'eligible',
  source: standardBankSimPlansSource
};

const standardBank20Gb: MonthlyDataDealOffer = {
  id: 'standard-bank-connect-connected-gigs-plus-20gb-2026-08',
  providerId: 'standard-bank-connect',
  providerName: 'Standard Bank Connect',
  offerName: 'Connected Gigs Plus 20GB plan',
  comparisonSizesGb: [20],
  advertisedDataLabel: '20GB anytime',
  priceZar: 209,
  allocation: { anytimeGb: 20, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'monthly', label: 'Monthly allocation' },
  billing: 'recurring_monthly',
  productType: 'mobile_plan',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['Standard Bank Connect website'],
  eligibility: standardBankEligibility,
  importantNotes: [
    'The live Standard Bank Connect checkout lists 20GB as the plan allocation at R209 per month.',
    'Subscription data expires on the last day before the next debit-order date and does not roll over.',
    'The subscription is billed monthly in advance; recheck the live checkout before ordering.'
  ],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://connect.standardbank.co.za/checkout',
    'Standard Bank Connect live SIM plan checkout'
  )
};

const standardBank35Gb: MonthlyDataDealOffer = {
  id: 'standard-bank-connect-connected-gigs-pro-35gb-2026-08',
  providerId: 'standard-bank-connect',
  providerName: 'Standard Bank Connect',
  offerName: 'Connected Gigs Pro 35GB plan',
  comparisonSizesGb: [30],
  advertisedDataLabel: '35GB anytime',
  priceZar: 299,
  allocation: { anytimeGb: 35, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'monthly', label: 'Monthly allocation' },
  billing: 'recurring_monthly',
  productType: 'mobile_plan',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['Standard Bank Connect website'],
  eligibility: standardBankEligibility,
  importantNotes: [
    'The live Standard Bank Connect catalogue lists 35GB at R299 per month.',
    'Subscription data expires on the last day before the next debit-order date and does not roll over.'
  ],
  rankingStatus: 'eligible',
  source: standardBankSimPlansSource
};

const capitec10Gb: MonthlyDataDealOffer = {
  id: 'capitec-connect-10gb-30-day-2026-08',
  providerId: 'capitec-connect',
  providerName: 'Capitec Connect',
  offerName: '10GB 30-day data bundle',
  comparisonSizesGb: [10],
  advertisedDataLabel: '10GB, or 12GB when the number is linked',
  priceZar: 150,
  allocation: {
    anytimeGb: 10,
    nightGb: 0,
    streamingGb: 0,
    socialGb: 0,
    otherRestricted: [],
    conditionalBonusGb: 2,
    conditionalBonusNote: 'The official table lists an extra 2GB for linked numbers.'
  },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['Capitec app', 'Capitec Connect USSD'],
  eligibility: 'Requires a Capitec account and an active Capitec Connect SIM.',
  importantNotes: ['The guaranteed 10GB—not the conditional linked-number bonus—is used for rankings.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.capitecbank.co.za/personal/connect/capitec-bundles/',
    'Data & Airtime Packages | Capitec Connect Bundles'
  )
};

const capitec20GbLongValidity: MonthlyDataDealOffer = {
  id: 'capitec-connect-20gb-60-day-2026-08',
  providerId: 'capitec-connect',
  providerName: 'Capitec Connect',
  offerName: '20GB 60-day data bundle',
  comparisonSizesGb: [20],
  advertisedDataLabel: '20GB, or 24GB when the number is linked',
  priceZar: 250,
  allocation: {
    anytimeGb: 20,
    nightGb: 0,
    streamingGb: 0,
    socialGb: 0,
    otherRestricted: [],
    conditionalBonusGb: 4,
    conditionalBonusNote: 'The official table lists an extra 4GB for linked numbers.'
  },
  validity: { kind: 'days', days: 60, label: '60 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['Capitec app', 'Capitec Connect USSD'],
  eligibility: 'Requires a Capitec account and an active Capitec Connect SIM.',
  importantNotes: ['Useful as a longer-validity alternative, but not like-for-like with a 30-day offer.'],
  rankingStatus: 'context_only',
  rankingExclusionReason: 'Excluded from monthly awards because the official validity is 60 days.',
  source: capitec10Gb.source
};

const vodacom10GbAdvertised: MonthlyDataDealOffer = {
  id: 'vodacom-prepaid-lte-5-plus-5-2026-08',
  providerId: 'vodacom',
  providerName: 'Vodacom',
  offerName: 'Prepaid LTE 5GB Anytime + 5GB Night Owl',
  comparisonSizesGb: [5, 10],
  advertisedDataLabel: '10GB total: 5GB anytime + 5GB Night Owl',
  priceZar: 99,
  allocation: { anytimeGb: 5, nightGb: 5, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'prepaid_lte',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['*123#', 'VodaPay app'],
  eligibility: 'Available on the Vodacom Prepaid LTE price plan.',
  importantNotes: ['Half of the advertised total is Night Owl data usable only from 00:00 to 05:00.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans',
    'Prepaid Price Plans | Prepaid LTE Data Bundles | Vodacom'
  )
};

const vodacom20GbAdvertised: MonthlyDataDealOffer = {
  ...vodacom10GbAdvertised,
  id: 'vodacom-prepaid-lte-10-plus-10-2026-08',
  offerName: 'Prepaid LTE 10GB Anytime + 10GB Night Owl',
  comparisonSizesGb: [10, 20],
  advertisedDataLabel: '20GB total: 10GB anytime + 10GB Night Owl',
  priceZar: 149,
  allocation: { anytimeGb: 10, nightGb: 10, streamingGb: 0, socialGb: 0, otherRestricted: [] }
};

const vodacom40GbAdvertised: MonthlyDataDealOffer = {
  ...vodacom10GbAdvertised,
  id: 'vodacom-prepaid-lte-20-plus-20-2026-08',
  offerName: 'Prepaid LTE 20GB Anytime + 20GB Night Owl',
  comparisonSizesGb: [20, 30],
  advertisedDataLabel: '40GB total: 20GB anytime + 20GB Night Owl',
  priceZar: 229,
  allocation: { anytimeGb: 20, nightGb: 20, streamingGb: 0, socialGb: 0, otherRestricted: [] }
};

const cellC20GbAdvertised: MonthlyDataDealOffer = {
  id: 'cell-c-10-plus-10-2026-08',
  providerId: 'cell-c',
  providerName: 'Cell C',
  offerName: '10GB Anytime + 10GB Nite bundle',
  comparisonSizesGb: [10, 20],
  advertisedDataLabel: '20GB total: 10GB anytime + 10GB nite',
  priceZar: 469,
  allocation: { anytimeGb: 10, nightGb: 10, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'provider_customer',
  purchaseChannels: ['*147#', 'Cell C website', 'Cell C app'],
  eligibility: 'Requires an active Cell C line.',
  importantNotes: ['Only 10GB is pooled anytime data; the other 10GB is Nite data that expires at 04:59:59.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.cellc.co.za/cellc/jsp/pinless-recharge/rechargeBundle_ajax.jsp?bundleCategory=DATAWEB&bundleType=DATAWEB',
    'Cell C live data bundle catalogue'
  )
};

const mtnStreaming20Gb: MonthlyDataDealOffer = {
  id: 'mtn-entertainment-streaming-20gb-2026-08',
  providerId: 'mtn',
  providerName: 'MTN',
  offerName: 'Entertainment 20GB bundle',
  comparisonSizesGb: [20],
  advertisedDataLabel: '20GB streaming-only data',
  priceZar: 499,
  allocation: { anytimeGb: 0, nightGb: 0, streamingGb: 20, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'provider_customer',
  purchaseChannels: ['*142#', 'MTN app'],
  eligibility: 'Requires an MTN prepaid line and an active supported entertainment-service account.',
  importantNotes: ['Usable only for the entertainment services named in MTN’s terms; it is not general internet data.'],
  rankingStatus: 'context_only',
  rankingExclusionReason: 'Excluded from all general-data awards because the entire allocation is streaming-only.',
  source: officialSource(
    'https://www.mtn.co.za/home/terms-and-conditions/content/the-prepaid-mtn-entertainment-bundles-terms-and-conditions',
    'Prepaid MTN Entertainment Bundles terms'
  )
};

const mtnSuperData30Gb: MonthlyDataDealOffer = {
  id: 'mtn-super-data-30gb-2026-08',
  providerId: 'mtn',
  providerName: 'MTN',
  offerName: 'Super Data 30GB',
  comparisonSizesGb: [30],
  advertisedDataLabel: '30GB anytime',
  priceZar: 269,
  allocation: { anytimeGb: 30, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['*137#', '*136*2#', 'MTN app', 'MTN website', 'MTN stores', 'informal retail channel'],
  eligibility: 'New or existing MTN prepaid customers must migrate to the Super Data price plan.',
  importantNotes: ['The official terms were amended in June 2026.', 'No data sharing or carry-over.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-super-data',
    'MTN Super Data terms and conditions'
  )
};

const telkomDailyDose30Gb: MonthlyDataDealOffer = {
  id: 'telkom-daily-dose-30gb-2026-08',
  providerId: 'telkom',
  providerName: 'Telkom',
  offerName: 'Daily Dose Gigs 30GB',
  comparisonSizesGb: [30],
  advertisedDataLabel: '30GB total, released as 1GB per day',
  priceZar: 289,
  allocation: {
    anytimeGb: 0,
    nightGb: 0,
    streamingGb: 0,
    socialGb: 0,
    otherRestricted: [{ label: 'Daily-release anytime data', gb: 30, restriction: '1GB is allocated per day and expires at 23:59.' }]
  },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'provider_customer',
  purchaseChannels: ['*180#', 'MyTelkom app', 'Telkom website', 'Telkom Pay', 'Telkom WhatsApp', 'Telkom stores'],
  eligibility: 'Available to Telkom Mobile Prepaid, Hybrid and Prepaid LTE customers.',
  importantNotes: ['The full 30GB is not available on day one; unused daily allocations do not carry over.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.telkom.co.za/prepaid-services/dailydosebundles',
    'Telkom Daily Dose bundles'
  )
};

const melonGigaDay30Gb: MonthlyDataDealOffer = {
  id: 'melon-gigaday-30gb-2026-08',
  providerId: 'melon-mobile',
  providerName: 'Melon Mobile',
  offerName: 'GigADay 30GB / 30 days',
  comparisonSizesGb: [30],
  advertisedDataLabel: '30GB total, released as 1GB per day',
  priceZar: 299,
  allocation: {
    anytimeGb: 0,
    nightGb: 0,
    streamingGb: 0,
    socialGb: 0,
    otherRestricted: [{ label: 'Daily-release data', gb: 30, restriction: '1GB is allocated per day; unused daily data is forfeited.' }]
  },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'provider_customer',
  purchaseChannels: ['Melon Mobile website', 'Melon Mobile app'],
  eligibility: 'Requires a valid Melon Mobile SIM or eSIM.',
  importantNotes: ['This is not a 30GB pool available on day one.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.melonmobile.co.za/legal/gigaday-terms-and-conditions',
    'Melon Mobile GigADay terms and conditions'
  )
};

const cellCDayByDay30Gb: MonthlyDataDealOffer = {
  id: 'cell-c-day-by-day-30gb-2026-08',
  providerId: 'cell-c',
  providerName: 'Cell C',
  offerName: 'Day-by-Day 30GB bundle',
  comparisonSizesGb: [30],
  advertisedDataLabel: '30GB total: 15GB daily anytime + 15GB daily nite',
  priceZar: 169,
  allocation: {
    anytimeGb: 0,
    nightGb: 15,
    streamingGb: 0,
    socialGb: 0,
    otherRestricted: [{ label: 'Daily-release anytime data', gb: 15, restriction: '500MB anytime is allocated each day and expires daily.' }]
  },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'mobile_data',
  accessTier: 'provider_customer',
  purchaseChannels: ['*147#', 'Cell C app', 'Cell C website'],
  eligibility: 'Available to active Cell C Prepaid, TopUp and Postpaid customers.',
  importantNotes: ['Each day provides 500MB anytime and 500MB Nite; unused daily allocations do not carry and Nite expires at 04:59:59.'],
  rankingStatus: 'eligible',
  source: officialSource(
    'https://www.cellc.co.za/cellc/static-content/PDF/Day-By-Day_Data_Bundles_FAQ_Web.pdf',
    'Cell C Day-by-Day data bundle FAQ'
  )
};

const mtnHomeWifi30GbAdvertised: MonthlyDataDealOffer = {
  id: 'mtn-home-wifi-15-plus-15-2026-08',
  providerId: 'mtn',
  providerName: 'MTN',
  offerName: 'Home Wi-Fi 15GB Anytime + 15GB Night Express',
  comparisonSizesGb: [15, 30],
  advertisedDataLabel: '30GB total: 15GB anytime + 15GB Night Express',
  priceZar: 199,
  allocation: { anytimeGb: 15, nightGb: 15, streamingGb: 0, socialGb: 0, otherRestricted: [] },
  validity: { kind: 'days', days: 30, label: '30 days' },
  billing: 'once_off',
  productType: 'prepaid_lte',
  accessTier: 'qualifying_price_plan',
  purchaseChannels: ['MTN Home Wi-Fi subscriber channels', 'selected MTN stores'],
  eligibility: 'Only for the MTN Home Wi-Fi price plan and eligible Home Wi-Fi device types.',
  importantNotes: ['The line may be restricted if used in a non-eligible device.', 'Half of the advertised total is Night Express data usable from 00:00:01 to 04:59:59.'],
  rankingStatus: 'context_only',
  rankingExclusionReason: 'Excluded from general mobile awards because it is device/price-plan restricted and only 15GB is anytime.',
  source: officialSource(
    'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-home-wi-fi-product-terms-and-conditions',
    'MTN Home Wi-Fi Product terms and conditions'
  )
};

export const august2026DealSnapshot: MonthlyDataDealSnapshot = {
  month: '2026-08',
  label: 'August 2026',
  checkedAt: CHECKED_AT,
  methodologyVersion: '1.1.0',
  offers: [
    ...airmobileOffers,
    ...nedbankOffers,
    ...melonAnytimeOffers,
    ...fnbDataPlanOffers,
    ...fnbOffers,
    standardBank10Gb,
    standardBank20Gb,
    standardBank35Gb,
    capitec10Gb,
    capitec20GbLongValidity,
    vodacom10GbAdvertised,
    vodacom20GbAdvertised,
    vodacom40GbAdvertised,
    cellC20GbAdvertised,
    mtnStreaming20Gb,
    mtnSuperData30Gb,
    telkomDailyDose30Gb,
    melonGigaDay30Gb,
    cellCDayByDay30Gb,
    mtnHomeWifi30GbAdvertised
  ]
};
