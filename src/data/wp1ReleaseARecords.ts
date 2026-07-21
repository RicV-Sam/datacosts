import { ussdRepository } from './ussd';
import {
  createEvidenceSubjectRegistry,
  type ContentEvidenceRecord,
  type SourceRecord
} from '../seo/wp1SourceFreshness';

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
  }
];

const operatorSourceId = (operator: string): string => `source.operator.${operator.toLowerCase().replace(/\s+/g, '')}`;
const operatorRecordId = (operator: string): string => `operator.${operator.toLowerCase().replace(/\s+/g, '')}`;
const operators = ['MTN', 'Vodacom', 'Cell C', 'Telkom', 'Rain'] as const;

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
  sourceRecordIds: [] as string[],
  active: true
}));

const operatorEvidenceRecords: ContentEvidenceRecord[] = operators.map((operator) => ({
  recordId: operatorRecordId(operator),
  recordType: 'operator' as const,
  materialClaim: { operator, claimScope: 'Operator identity and official-domain ownership.' },
  sourceRecordIds: [operatorSourceId(operator)],
  active: true
}));

/** Collection-owned authority: semantic kinds are derived here, never from evidence records. */
export const wp1EvidenceSubjects = createEvidenceSubjectRegistry({
  ussd_code: ussdEvidenceRecords.map((record) => record.recordId),
  evergreen_fact: operatorEvidenceRecords.map((record) => record.recordId)
});

export const wp1ContentRecords: ContentEvidenceRecord[] = [
  ...ussdEvidenceRecords,
  ...operatorEvidenceRecords
];
