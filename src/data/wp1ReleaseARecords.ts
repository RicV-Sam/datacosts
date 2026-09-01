import { ussdRepository } from './ussd';
import { type ContentEvidenceRecord, type SourceRecord } from '../seo/wp1SourceFreshness';

export const WP1_EVIDENCE_AS_OF = '2026-09-01';

export const wp1SourceRecords: SourceRecord[] = [
  {
    recordId: 'source.operator.mtn',
    sourceUrl: 'https://www.mtn.co.za/',
    sourceType: 'operator',
    checkedAt: '2026-07-20',
    verificationMethod: 'operator_page',
    claimScope: 'MTN operator identity and official-domain ownership; no public content change.',
    status: 'verified',
    confidence: 'high',
    lastContentChangeAt: '2026-07-04'
  },
  {
    recordId: 'source.operator.vodacom',
    sourceUrl: 'https://www.vodacom.co.za/',
    sourceType: 'operator',
    checkedAt: '2026-07-20',
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom operator identity and official-domain ownership; no public content change.',
    status: 'verified',
    confidence: 'high',
    lastContentChangeAt: '2026-07-04'
  },
  {
    recordId: 'source.operator.cellc',
    sourceUrl: 'https://www.cellc.co.za/',
    sourceType: 'operator',
    checkedAt: '2026-07-20',
    verificationMethod: 'operator_page',
    claimScope: 'Cell C operator identity and official-domain ownership; no public content change.',
    status: 'verified',
    confidence: 'high',
    lastContentChangeAt: '2026-07-04'
  },
  {
    recordId: 'source.operator.telkom',
    sourceUrl: 'https://www.telkom.co.za/',
    sourceType: 'operator',
    checkedAt: '2026-07-20',
    verificationMethod: 'operator_page',
    claimScope: 'Telkom operator identity and official-domain ownership; no public content change.',
    status: 'verified',
    confidence: 'high',
    lastContentChangeAt: '2026-07-04'
  },
  {
    recordId: 'source.operator.rain',
    sourceUrl: 'https://www.rain.co.za/',
    sourceType: 'operator',
    checkedAt: '2026-07-20',
    verificationMethod: 'operator_page',
    claimScope: 'Rain operator identity and official-domain ownership; no public content change.',
    status: 'verified',
    confidence: 'high',
    lastContentChangeAt: '2026-07-04'
  },
  {
    recordId: 'source.ussd.vodacom.useful-codes',
    sourceUrl: 'https://now.vodacom.co.za/do-it-yourself/the-most-useful-ussd-codes-for-vodacom-users/',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom main self-service, voucher recharge, CallMe and published data-bundle transfer/purchase USSD routes.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.vodacom.balance',
    sourceUrl: 'https://now.vodacom.co.za/do-it-yourself/the-three-easiest-ways-to-check-your-vodacom-balance/',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom direct prepaid balance code and distinction from the main self-service menu.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.vodacom.prepaid-data',
    sourceUrl: 'https://www.vodacom.co.za/vodacom/shopping/data/prepaid-data',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom prepaid bundle purchasing through the *135# menu.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.mtn.yello-trader-2026-07',
    sourceUrl: 'https://onlinecms.mtn.co.za/sites/default/files/july-2026-yello-trader.pdf',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    effectiveFrom: '2026-07-07',
    expiresAt: '2026-08-06',
    verificationMethod: 'operator_page',
    claimScope: 'Historical July 2026 MTN public USSD catalogue, including menu, bundle, XtraTime and Made4U routes.',
    status: 'expired',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.mtn.xtratime',
    sourceUrl: 'https://www.mtn.co.za/home/xtra-time/',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Current MTN XtraTime access through *151# or the XtraTime option under *136*2#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.vodacom.check-number',
    sourceUrl: 'https://now.vodacom.co.za/be-datawyze/datawyze-how-to-check-your-data-bundle-balance/',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom *135*501# route for displaying the mobile number associated with a SIM.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.vodacom.customer-care',
    sourceUrl: 'https://now.vodacom.co.za/what-to-download/do-it-yourself-with-vodacom/',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom customer-care access by dialling 135.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.vodacom.just4you',
    sourceUrl: 'https://www.vodacom.co.za/vodacom/terms/promotions/just4you',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Vodacom Just 4 You personalised-offer access through *123#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.mtn.historical-code-table',
    sourceUrl: 'https://onlinecms.mtn.co.za/sites/default/files/July%20YT.pdf',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Historical 2023 MTN code table lists *123*888# for My Number and *121*(number)# for Call Back; the catalogue period has ended, so only the current CallBack page is treated as live confirmation.',
    status: 'verified',
    confidence: 'medium'
  },
  {
    recordId: 'source.ussd.mtn.current-ussd-help',
    sourceUrl: 'https://www.mtn.co.za/home/help/content/ussd-codes',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Current MTN balance, detailed balance, bundle purchase, Me2U, CallBack and card-recharge routes. The page omits a current direct voucher-loading shortcut for the user\'s own line and an own-number shortcut, so those legacy formats remain withheld.',
    status: 'verified',
    confidence: 'high',
    conflictNote: 'Historical MTN catalogues list direct own-line voucher and own-number formats that are absent from the current public USSD guidance.'
  },
  {
    recordId: 'source.ussd.mtn.customer-service-charter',
    sourceUrl: 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-customer-service-charter-final-english-2-0',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'MTN customer-service charter confirms 135 as the on-network call-centre number.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.mtn.mytownoffers',
    sourceUrl: 'https://www.mtn.co.za/home/terms-and-conditions/content/mytownoffers-terms-and-conditions',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'MyTownOffers eligibility, location dependence and supported self-service channels.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.telkom.help-guide',
    sourceUrl: 'https://www.telkom.co.za/help-guide',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Telkom balance, standard self-service, voucher recharge and Please Call Me USSD routes.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.telkom.monice',
    sourceUrl: 'https://www.telkom.co.za/welcome/personal/mobile-contract/mo%27nice',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Telkom Mo\'Nice personalised-offer access on *123#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.telkom.check-number',
    sourceUrl: 'https://intouch.telkom.co.za/blog/never-get-caught-offline-again/640',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Telkom mobile own-number lookup through *1#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.telkom.customer-care',
    sourceUrl: 'https://group.telkom.co.za/documents/regulatory/terms-and-conditions/telkom_terms_and_conditions_for_reverse_bill_url.pdf',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Telkom customer-care access on 180 from a Telkom cellular phone and 081180 from other phones.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.data-bundles',
    sourceUrl: 'https://www.cellc.co.za/cellc/get-databundles',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C standard bundle purchasing through the *147# self-service menu.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.support-faq',
    sourceUrl: 'https://www.cellc.co.za/cellc/faq-support',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C *101# balance check and on-network 135 customer-care number.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.recharge',
    sourceUrl: 'https://www.cellc.co.za/cellc/faq-recharge-your-account',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C voucher recharge through *102*voucherpin#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.please-call-me',
    sourceUrl: 'https://www.cellc.co.za/cellc/connectforfree-info',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C callback request through *111*phone number#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.airtime-share',
    sourceUrl: 'https://www.cellc.co.za/cellc/get-airtime-airtime-share',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C Airtime Share access through the *147# menu.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.contact',
    sourceUrl: 'https://www.cellc.co.za/cellc/contact-us',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C support route used when no current official own-number USSD shortcut is published.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.cellc.alternative-offers',
    sourceUrl: 'https://www.cellc.co.za/cellc/switch-to-supabonus',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Cell C alternative prepaid offers available on *141#.',
    status: 'verified',
    confidence: 'high'
  },
  {
    recordId: 'source.ussd.rain.4g-mobile-services',
    sourceUrl: 'https://www.rain.co.za/legal?section=rainGO',
    sourceType: 'operator',
    checkedAt: WP1_EVIDENCE_AS_OF,
    verificationMethod: 'operator_page',
    claimScope: 'Rain states that USSD is unavailable on its 4G Mobile Services network.',
    status: 'verified',
    confidence: 'high'
  }
];

const operatorSourceId = (operator: string): string => `source.operator.${operator.toLowerCase().replace(/\s+/g, '')}`;
const operatorRecordId = (operator: string): string => `operator.${operator.toLowerCase().replace(/\s+/g, '')}`;
const operators = ['MTN', 'Vodacom', 'Cell C', 'Telkom', 'Rain'] as const;

const ussdSourceIdsByRecordId: Readonly<Record<string, readonly string[]>> = Object.freeze({
  'ussd.vodacom.balance_detailed': ['source.ussd.vodacom.balance'],
  'ussd.vodacom.balance_main': ['source.ussd.vodacom.useful-codes'],
  'ussd.vodacom.recharge_voucher': ['source.ussd.vodacom.useful-codes'],
  'ussd.vodacom.buy_data': ['source.ussd.vodacom.prepaid-data'],
  'ussd.vodacom.transfer_airtime_data': ['source.ussd.vodacom.useful-codes'],
  'ussd.vodacom.please_call_me': ['source.ussd.vodacom.useful-codes'],
  'ussd.vodacom.check_number': ['source.ussd.vodacom.check-number'],
  'ussd.vodacom.account_menu': ['source.ussd.vodacom.useful-codes'],
  'ussd.vodacom.customer_care': ['source.ussd.vodacom.customer-care'],
  'ussd.vodacom.just4you': ['source.ussd.vodacom.just4you'],
  'ussd.mtn.balance_main': ['source.ussd.mtn.current-ussd-help'],
  'ussd.mtn.data_balance': ['source.ussd.mtn.current-ussd-help'],
  'ussd.mtn.recharge_voucher': ['source.ussd.mtn.current-ussd-help'],
  'ussd.mtn.buy_data': ['source.ussd.mtn.current-ussd-help'],
  'ussd.mtn.transfer_airtime_data': ['source.ussd.mtn.current-ussd-help'],
  'ussd.mtn.please_call_me': ['source.ussd.mtn.current-ussd-help'],
  'ussd.mtn.check_number': ['source.ussd.mtn.current-ussd-help', 'source.ussd.mtn.historical-code-table'],
  'ussd.mtn.customer_care': ['source.ussd.mtn.customer-service-charter'],
  'ussd.mtn.xtratime': ['source.ussd.mtn.xtratime'],
  'ussd.mtn.mytownoffers': ['source.ussd.mtn.mytownoffers'],
  'ussd.telkom.balance_main': ['source.ussd.telkom.help-guide'],
  'ussd.telkom.buy_data': ['source.ussd.telkom.help-guide'],
  'ussd.telkom.recharge_voucher': ['source.ussd.telkom.help-guide'],
  'ussd.telkom.please_call_me': ['source.ussd.telkom.help-guide'],
  'ussd.telkom.check_number': ['source.ussd.telkom.check-number'],
  'ussd.telkom.customer_care': ['source.ussd.telkom.customer-care'],
  'ussd.telkom.monice': ['source.ussd.telkom.monice'],
  'ussd.cellc.balance_main': ['source.ussd.cellc.support-faq'],
  'ussd.cellc.buy_data': ['source.ussd.cellc.data-bundles'],
  'ussd.cellc.recharge_voucher': ['source.ussd.cellc.recharge'],
  'ussd.cellc.please_call_me': ['source.ussd.cellc.please-call-me'],
  'ussd.cellc.transfer_airtime': ['source.ussd.cellc.airtime-share'],
  'ussd.cellc.check_number': ['source.ussd.cellc.contact'],
  'ussd.cellc.customer_care': ['source.ussd.cellc.support-faq'],
  'ussd.cellc.for_you': ['source.ussd.cellc.alternative-offers'],
  'ussd.rain.app_only': ['source.ussd.rain.4g-mobile-services']
});

const ussdEvidenceRecords: ContentEvidenceRecord[] = ussdRepository.map((record) => ({
  recordId: record.id,
  recordType: 'ussd_code' as const,
  materialClaim: {
    operator: record.network,
    code: record.code,
    codeType: record.category,
    label: record.action,
    instructions: record.explanation,
    claimScope: record.explanation,
    customerType: null,
    productType: null,
    status: record.status,
    dialable: record.dialable ?? null,
    note: 'note' in record ? record.note : null
  },
  sourceRecordIds: [...(ussdSourceIdsByRecordId[record.id] ?? [])],
  active: true
}));

const operatorEvidenceRecords: ContentEvidenceRecord[] = operators.map((operator) => ({
  recordId: operatorRecordId(operator),
  recordType: 'operator' as const,
  materialClaim: { operator, claimScope: 'Operator identity and official-domain ownership.' },
  sourceRecordIds: [operatorSourceId(operator)],
  active: true
}));

export const wp1ContentRecords: ContentEvidenceRecord[] = [
  ...ussdEvidenceRecords,
  ...operatorEvidenceRecords
];
