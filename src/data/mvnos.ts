import { isMvnoProviderId } from './monthlyDeals/providers';
import type { DealProviderId } from './monthlyDeals/types';

export { isMvnoProviderId };

export const MVNO_GUIDE_PATH = '/guides/mvnos-south-africa/';
export const MVNO_REVIEWED_AT = '2026-09-01';

export const MVNO_PROVIDER_IDS = [
  'airmobile',
  'capitec-connect',
  'fnb-connect',
  'melon-mobile',
  'nedbank-connect',
  'standard-bank-connect'
] as const satisfies readonly DealProviderId[];

export type MvnoProviderId = (typeof MVNO_PROVIDER_IDS)[number];
export type MvnoBankId = 'capitec' | 'fnb' | 'nedbank' | 'standard-bank';
export type MvnoFitTag =
  | 'bank_rewards'
  | 'data_only'
  | 'family_lines'
  | 'flexible_topups'
  | 'monthly_data'
  | 'voice_heavy';
export type MvnoBenefitKind =
  | 'standard_value'
  | 'bank_linked_reward'
  | 'service_feature'
  | 'temporary_promotion';

export interface MvnoEditorialSource {
  title: string;
  url: string;
  checkedAt: string;
  official: true;
}

export interface MvnoBenefit {
  kind: MvnoBenefitKind;
  title: string;
  detail: string;
  eligibility?: string;
  validThrough?: string;
  includeInBaseRanking: false;
  source: MvnoEditorialSource;
}

export interface MvnoProviderProfile {
  id: MvnoProviderId;
  name: string;
  bankId: MvnoBankId | null;
  accessLabel: string;
  fitTags: MvnoFitTag[];
  bestFor: string;
  whyItSaves: string;
  extraPerks: string;
  whatYouNeed: string;
  watchOut: string;
  watchOutSource?: MvnoEditorialSource;
  benefits: MvnoBenefit[];
  sources: MvnoEditorialSource[];
}

function officialSource(title: string, url: string): MvnoEditorialSource {
  return { title, url, checkedAt: MVNO_REVIEWED_AT, official: true };
}

const airMobilePrepaid = officialSource(
  'AirMobile prepaid',
  'https://www.afrihost.com/airmobile/prepaid'
);
const airMobileDataOnly = officialSource(
  'AirMobile data-only plans',
  'https://www.afrihost.com/airmobile/data-only/'
);
const airMobileTerms = officialSource(
  'AirMobile prepaid terms',
  'https://www.afrihost.com/terms-and-conditions/airmobile'
);

const capitecConnect = officialSource(
  'Capitec Connect',
  'https://www.capitecbank.co.za/personal/connect/'
);
const capitecBundles = officialSource(
  'Capitec Connect bundles',
  'https://www.capitecbank.co.za/personal/connect/capitec-bundles/'
);
const capitecFaq = officialSource(
  'Capitec Connect FAQs',
  'https://www.capitecbank.co.za/were-here-to-help/faqs/'
);

const fnbConnect = officialSource(
  'FNB Connect overview',
  'https://www.fnb.co.za/fnb-connect/sayYesToConnect.html'
);
const fnbShop = officialSource(
  'FNB Connect SIMs and plans',
  'https://www.fnb.co.za/fnb-connect/shop.html'
);
const fnbPricing = officialSource(
  'FNB Connect Retail Annual Pricing Guide 2026–2027',
  'https://www.fnb.co.za/downloads/pricing-guides/FNB-Connect-Retail.pdf'
);

const melonWhy = officialSource(
  'Why Melon Mobile',
  'https://www.melonmobile.co.za/why-melon'
);
const melonPlans = officialSource(
  'Melon Mobile build-your-own plans',
  'https://www.melonmobile.co.za/build-your-own-plan'
);
const melonFamily = officialSource(
  'Melon Family plans',
  'https://www.melonmobile.co.za/family'
);
const melonTrialTerms = officialSource(
  'Melon Mobile 30-day free-trial terms',
  'https://www.melonmobile.co.za/legal/30-day-free-trial-terms-and-conditions'
);

const nedbankConnect = officialSource(
  'Nedbank Connect',
  'https://personal.nedbank.co.za/nedbank-connect.html'
);
const nedbankConnectTerms = officialSource(
  'Nedbank Connect terms',
  'https://personal.nedbank.co.za/legal/terms-and-conditions/connect-terms-and-conditions.html'
);
const nedbankGreenbacksTerms = officialSource(
  'Greenbacks Rewards Programme terms',
  'https://personal.nedbank.co.za/legal/terms-and-conditions/greenbacks-rewards-terms-and-conditions.html'
);

const standardBankPlans = officialSource(
  'Standard Bank Connect SIM plans',
  'https://connect.standardbank.co.za/sim-plans'
);
const standardBankFaq = officialSource(
  'Standard Bank Connect FAQs',
  'https://connect.standardbank.co.za/faqs/new-to-standard-bank-connect'
);
const standardBankProfessional = officialSource(
  'Standard Bank Professional Banking 2026 benefits',
  'https://www.standardbank.co.za/static_file/South%20Africa/PDF/Brochures/Welcome-to-Professional-Banking-2026.pdf'
);

export const mvnoProviderProfiles: MvnoProviderProfile[] = [
  {
    id: 'airmobile',
    name: 'AirMobile by Afrihost',
    bankId: null,
    accessLabel: 'Public — no bank account required',
    fitTags: ['data_only', 'flexible_topups', 'monthly_data'],
    bestFor: 'People who want public prepaid top-ups, a data-only SIM, or predictable month-to-month data without opening a bank account.',
    whyItSaves: 'A hard cap is the default and out-of-bundle use is opt-in, so the service can suit users who value spend control as much as the headline price.',
    extraPerks: 'Paid data lasts until the end of the following month, paid airtime has long validity, and AirShare can move airtime or data between AirMobile users.',
    whatYouNeed: 'An Afrihost profile, RICA, and an AirMobile SIM or eSIM. Some data-only setups can use a supported MTN SIM and Afrihost APN.',
    watchOut: 'A data-only APN setup is not the same as a full mobile voice plan. Check device and SIM-activity rules, and treat dated call promotions separately from normal value.',
    benefits: [
      {
        kind: 'service_feature',
        title: 'Hard-cap spend control',
        detail: 'Out-of-bundle data is opt-in, with top-ups available when the included allocation runs out.',
        includeInBaseRanking: false,
        source: airMobileDataOnly
      },
      {
        kind: 'standard_value',
        title: 'Useful rollover windows',
        detail: 'Paid data rolls to the end of the following month, while paid airtime lasts to the end of the following year.',
        includeInBaseRanking: false,
        source: airMobileTerms
      },
      {
        kind: 'temporary_promotion',
        title: 'AirMobile-to-AirMobile calls',
        detail: 'Qualifying calls between AirMobile numbers are advertised as free during the current promotion.',
        validThrough: '2027-01-31',
        includeInBaseRanking: false,
        source: airMobilePrepaid
      }
    ],
    sources: [airMobilePrepaid, airMobileDataOnly, airMobileTerms]
  },
  {
    id: 'capitec-connect',
    name: 'Capitec Connect',
    bankId: 'capitec',
    accessLabel: 'Capitec customers',
    fitTags: ['bank_rewards', 'flexible_topups', 'voice_heavy'],
    bestFor: 'Existing Capitec customers who prefer prepaid control and can link their Connect number to their banking profile.',
    whyItSaves: 'Linked numbers receive 20% extra data on listed recharges, while the catalogue also includes no-expiry and short-validity bundles for irregular use.',
    extraPerks: 'Free Connect-to-Connect calls and, for qualifying credit-card customers, 1GB of monthly data.',
    whatYouNeed: 'An active Capitec account and a Capitec Connect SIM obtained through a branch; extra linked-number benefits require the correct number on the banking profile.',
    watchOut: 'The extra data is conditional and does not count in DataCost’s base R/GB. The credit-card benefit also carries card eligibility, fees and good-standing requirements.',
    benefits: [
      {
        kind: 'bank_linked_reward',
        title: '20% extra data for linked numbers',
        detail: 'Official bundle tables show a separate linked-number allocation at the same listed bundle price.',
        eligibility: 'The Connect number must be linked to the customer’s Capitec banking profile.',
        includeInBaseRanking: false,
        source: capitecBundles
      },
      {
        kind: 'bank_linked_reward',
        title: '1GB monthly credit-card benefit',
        detail: 'Qualifying customers can receive 1GB each month on a verified Connect number.',
        eligibility: 'Requires an active Capitec credit card in good standing; card fees and credit terms still matter.',
        includeInBaseRanking: false,
        source: capitecFaq
      },
      {
        kind: 'service_feature',
        title: 'Free Connect-to-Connect calls',
        detail: 'Calls between Capitec Connect numbers are advertised as free without a separate opt-in.',
        includeInBaseRanking: false,
        source: capitecConnect
      },
      {
        kind: 'standard_value',
        title: 'No-expiry bundle choices',
        detail: 'The current catalogue includes no-expiry data and voice bundles alongside 1-, 7-, 30- and 60-day options.',
        includeInBaseRanking: false,
        source: capitecBundles
      }
    ],
    sources: [capitecConnect, capitecBundles, capitecFaq]
  },
  {
    id: 'fnb-connect',
    name: 'FNB Connect',
    bankId: 'fnb',
    accessLabel: 'Qualifying FNB customers',
    fitTags: ['bank_rewards', 'flexible_topups', 'monthly_data', 'voice_heavy'],
    bestFor: 'Existing FNB customers who already use eBucks and want prepaid, Top Up or postpaid choices managed beside their bank account.',
    whyItSaves: 'The range spans once-off bundles and flexible month-to-month plans; qualifying rewards can improve the value for customers who already meet FNB and eBucks criteria.',
    extraPerks: 'Data rollover and transfer tools, plus WhatsApp-messaging and voice-minute rewards on qualifying SIMs.',
    whatYouNeed: 'A qualifying FNB transactional account, an FNB Connect SIM or eSIM, and the relevant reward criteria for any eBucks or data benefit.',
    watchOut: '“Up to 15%” is not a universal discount. Account type, eBucks level, earn limits and banking fees can change the real value; device bundles may also introduce a fixed repayment term.',
    benefits: [
      {
        kind: 'bank_linked_reward',
        title: 'Up to 15% back',
        detail: 'The current guide advertises up to 15% back in data or eBucks on qualifying SIM-plan and prepaid bundle spend.',
        eligibility: 'The reward form and rate depend on the qualifying account and eBucks rules.',
        includeInBaseRanking: false,
        source: fnbPricing
      },
      {
        kind: 'bank_linked_reward',
        title: 'WhatsApp messaging and voice rewards',
        detail: 'FNB advertises an unlimited WhatsApp-messaging reward and 35 voice minutes each month, subject to its terms and fair-use rules.',
        eligibility: 'Requires a qualifying FNB Connect SIM and account relationship.',
        includeInBaseRanking: false,
        source: fnbConnect
      },
      {
        kind: 'service_feature',
        title: 'Rollover and transfer controls',
        detail: 'Eligible data can be rolled over once and selected amounts can be transferred to another FNB Connect number.',
        includeInBaseRanking: false,
        source: fnbShop
      },
      {
        kind: 'standard_value',
        title: 'Month-to-month SIM plans',
        detail: 'Current SIM-only plan material says customers are not locked into a fixed-term contract.',
        includeInBaseRanking: false,
        source: fnbShop
      }
    ],
    sources: [fnbConnect, fnbShop, fnbPricing]
  },
  {
    id: 'melon-mobile',
    name: 'Melon Mobile',
    bankId: null,
    accessLabel: 'Public — no bank account required',
    fitTags: ['family_lines', 'monthly_data', 'voice_heavy'],
    bestFor: 'People who want to build their own monthly allocation, make many calls, or manage several family or smart-device lines in one app.',
    whyItSaves: 'Custom data, voice and SMS allocations can reduce paying for categories you do not use, while unlimited-call tiers can suit genuinely voice-heavy users.',
    extraPerks: 'eSIM onboarding, month-to-month changes, WhatsApp support, and multi-line management from one account.',
    whatYouNeed: 'A debit or credit card, the Melon app or website, RICA, and a physical SIM or compatible eSIM device.',
    watchOut: 'Unlimited calls and SMS are subject to fair use. The current free trial automatically moves to a paid 5GB monthly plan unless you cancel or change it before the trial ends.',
    watchOutSource: melonTrialTerms,
    benefits: [
      {
        kind: 'service_feature',
        title: 'Build Your Own plans',
        detail: 'Choose separate data, voice and SMS allocations and change or cancel the monthly plan.',
        includeInBaseRanking: false,
        source: melonWhy
      },
      {
        kind: 'standard_value',
        title: 'Unlimited voice tiers',
        detail: 'Several current plans combine anytime data with unlimited national calls and SMS, subject to fair use.',
        includeInBaseRanking: false,
        source: melonPlans
      },
      {
        kind: 'service_feature',
        title: 'Multi-line management',
        detail: 'A family account can manage multiple SIMs, balances, top-ups and separate plans from one account.',
        includeInBaseRanking: false,
        source: melonFamily
      }
    ],
    sources: [melonWhy, melonPlans, melonFamily, melonTrialTerms]
  },
  {
    id: 'nedbank-connect',
    name: 'Nedbank Connect',
    bankId: 'nedbank',
    accessLabel: 'Nedbank customers',
    fitTags: ['bank_rewards', 'flexible_topups', 'monthly_data', 'voice_heavy'],
    bestFor: 'Existing Nedbank customers who want prepaid top-ups or a cancellable monthly plan, especially voice-heavy users who already qualify for Greenbacks.',
    whyItSaves: 'Users can choose a once-off prepaid bundle or a monthly plan; preset plans include unlimited calls and SMS, and Greenbacks members can receive monthly reward airtime.',
    extraPerks: 'Build-your-own monthly plans, eSIM, and data transfer between Nedbank Connect users.',
    whatYouNeed: 'A Nedbank current or savings account, Nedbank ID, RICA, and an active Nedbank Connect SIM or eSIM. Greenbacks benefits require separate programme eligibility.',
    watchOut: 'Greenbacks reward airtime is not cash or data: it cannot buy data, SMSs or subscriptions, expires in the month issued, and varies by Greenbacks level.',
    benefits: [
      {
        kind: 'bank_linked_reward',
        title: 'Up to R300 monthly reward airtime',
        detail: 'The published Greenbacks scale ranges from R0 to R300 airtime a month depending on reward level.',
        eligibility: 'Requires an active Nedbank Connect SIM and Greenbacks qualification.',
        includeInBaseRanking: false,
        source: nedbankGreenbacksTerms
      },
      {
        kind: 'standard_value',
        title: 'Prepaid and cancellable monthly choices',
        detail: 'Nedbank Connect offers once-off prepaid bundles and 30-day subscription bundles that can be cancelled in digital banking.',
        includeInBaseRanking: false,
        source: nedbankConnectTerms
      },
      {
        kind: 'standard_value',
        title: 'Unlimited calls and SMS on preset plans',
        detail: 'Current preset plans include unlimited calls and SMS, subject to fair-use rules.',
        includeInBaseRanking: false,
        source: nedbankConnect
      }
    ],
    sources: [nedbankConnect, nedbankConnectTerms, nedbankGreenbacksTerms]
  },
  {
    id: 'standard-bank-connect',
    name: 'Standard Bank Connect',
    bankId: 'standard-bank',
    accessLabel: 'Standard Bank customers',
    fitTags: ['bank_rewards', 'family_lines', 'monthly_data', 'voice_heavy'],
    bestFor: 'Existing Standard Bank customers who want a data-focused monthly plan, family data sharing, or a Circle plan with selected unlimited-call numbers.',
    whyItSaves: 'Current Connected Gigs plans combine monthly data with no-expiry top-up choices, while data transfer and automatic top-ups can reduce wasted or emergency purchases.',
    extraPerks: 'Circle plans can include unlimited calling to selected numbers, and some qualifying banking packages advertise extra monthly Connect data.',
    whatYouNeed: 'An active FICA-verified Standard Bank transactional account, age 18+, and a Standard Bank Connect SIM or eSIM.',
    watchOut: 'Bank-package data and accessory discounts are conditional, not universal savings. Include the banking package fee and exact qualification rules before calling the MVNO cheaper.',
    benefits: [
      {
        kind: 'standard_value',
        title: 'No-expiry top-ups and data transfer',
        detail: 'Current plan material advertises no-expiry bundle choices and transfers to other Standard Bank Connect users.',
        includeInBaseRanking: false,
        source: standardBankPlans
      },
      {
        kind: 'service_feature',
        title: 'Circle calling options',
        detail: 'Selected Connected Circle plans include unlimited calling to a stated number of chosen contacts.',
        includeInBaseRanking: false,
        source: standardBankPlans
      },
      {
        kind: 'bank_linked_reward',
        title: 'Package-specific monthly data',
        detail: 'Some current Standard Bank packages advertise extra Connect data with a qualifying monthly subscription.',
        eligibility: 'The amount and requirements depend on the banking package; account fees and Connect-plan minimums still apply.',
        includeInBaseRanking: false,
        source: standardBankProfessional
      },
      {
        kind: 'service_feature',
        title: 'Family data sharing',
        detail: 'Purchased data can be transferred to another active Standard Bank Connect number, with separate transferred-data validity.',
        includeInBaseRanking: false,
        source: standardBankFaq
      }
    ],
    sources: [standardBankPlans, standardBankFaq, standardBankProfessional]
  }
];

export const mvnoProfileById = new Map(mvnoProviderProfiles.map((profile) => [profile.id, profile]));
