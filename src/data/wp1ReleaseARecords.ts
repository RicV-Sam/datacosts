import { ussdRepository } from './ussd';
import { type ContentEvidenceRecord, type SourceRecord } from '../seo/wp1SourceFreshness';

export const WP1_EVIDENCE_AS_OF = '2026-08-01';

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
    claimScope: 'Vodacom main self-service, voucher recharge and data-transfer USSD routes.',
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
    claimScope: 'Current MTN public USSD list, including menu, bundle, XtraTime and Made4U routes; no own-number or Please Call Me shortcut is listed.',
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
    claimScope: 'Telkom balance and standard self-service USSD routes.',
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
  'ussd.mtn.check_number': ['source.ussd.mtn.yello-trader-2026-07'],
  'ussd.mtn.xtratime': ['source.ussd.mtn.yello-trader-2026-07'],
  'ussd.mtn.mytownoffers': ['source.ussd.mtn.yello-trader-2026-07', 'source.ussd.mtn.mytownoffers'],
  'ussd.telkom.balance_main': ['source.ussd.telkom.help-guide'],
  'ussd.telkom.buy_data': ['source.ussd.telkom.help-guide'],
  'ussd.telkom.monice': ['source.ussd.telkom.monice'],
  'ussd.cellc.buy_data': ['source.ussd.cellc.data-bundles'],
  'ussd.cellc.check_number': ['source.ussd.cellc.contact'],
  'ussd.cellc.for_you': ['source.ussd.cellc.alternative-offers']
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
