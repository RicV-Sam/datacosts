import { ussdCodes } from '../data';
import { ussdRepository } from '../data/ussd';
import { ussdCodesByNetwork } from '../data/ussdCodes';
import { WP1_FUTURE_QUICK_ANSWERS, type Wp1QuickAnswerId } from './wp1QuickAnswerDefinitions';
import { isStableAnalyticsId } from './wp1SourceFreshness';

export const REGISTERED_USSD_CODE_IDS = [
  'ussd.cellc.balance_main',
  'ussd.cellc.buy_data',
  'ussd.cellc.check_number',
  'ussd.cellc.customer_care',
  'ussd.cellc.for_you',
  'ussd.cellc.please_call_me',
  'ussd.cellc.recharge_voucher',
  'ussd.cellc.transfer_airtime',
  'ussd.mtn.balance_main',
  'ussd.mtn.buy_data',
  'ussd.mtn.check_number',
  'ussd.mtn.customer_care',
  'ussd.mtn.data_balance',
  'ussd.mtn.mytownoffers',
  'ussd.mtn.please_call_me',
  'ussd.mtn.recharge_voucher',
  'ussd.mtn.transfer_airtime_data',
  'ussd.mtn.xtratime',
  'ussd.rain.app_only',
  'ussd.telkom.balance_main',
  'ussd.telkom.buy_data',
  'ussd.telkom.check_number',
  'ussd.telkom.customer_care',
  'ussd.telkom.monice',
  'ussd.telkom.please_call_me',
  'ussd.telkom.recharge_voucher',
  'ussd.vodacom.account_menu',
  'ussd.vodacom.balance_detailed',
  'ussd.vodacom.balance_main',
  'ussd.vodacom.buy_data',
  'ussd.vodacom.check_number',
  'ussd.vodacom.customer_care',
  'ussd.vodacom.data_balance',
  'ussd.vodacom.just4you',
  'ussd.vodacom.please_call_me',
  'ussd.vodacom.recharge_voucher',
  'ussd.vodacom.transfer_airtime_data'
] as const;

export type RegisteredUssdCodeId = (typeof REGISTERED_USSD_CODE_IDS)[number];
export type RegisteredQuickAnswerId = Wp1QuickAnswerId;
export type RegisteredAnalyticsId = RegisteredUssdCodeId | RegisteredQuickAnswerId;

export type RegistryOperator = 'mtn' | 'vodacom' | 'telkom' | 'cell_c' | 'rain';

export interface RegistryOccurrence {
  registry: 'ussdRepository' | 'ussdCodes' | 'ussdCodesByNetwork' | 'quickAnswers';
  id: string;
  operator: string;
  code?: string;
  codeType?: string;
  label?: string;
}

export interface RegistryIssue {
  severity: 'error' | 'warning';
  code: string;
  id: string;
  registry: string;
  message: string;
}

export interface RegistryValidation {
  errors: RegistryIssue[];
  warnings: RegistryIssue[];
  occurrenceCount: number;
  uniqueIdCount: number;
  codeOccurrenceCount: number;
  uniqueCodeIdCount: number;
  answerOccurrenceCount: number;
  uniqueAnswerIdCount: number;
  registries: string[];
}

const ussdIdSet = new Set<string>(REGISTERED_USSD_CODE_IDS);
const answerIdSet = new Set<string>(WP1_FUTURE_QUICK_ANSWERS.map((answer) => answer.answerId));

function operatorId(value: string): RegistryOperator | null {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalized === 'cellc') return 'cell_c';
  if (normalized === 'mtn' || normalized === 'vodacom' || normalized === 'telkom' || normalized === 'rain') return normalized;
  return null;
}

function categoryType(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized.includes('balance')) return 'balance';
  if (normalized.includes('recharge')) return 'recharge';
  if (normalized.includes('transfer')) return 'transfer';
  if (normalized.includes('data') || normalized.includes('bundle')) return 'data';
  if (normalized.includes('account') || normalized.includes('number') || normalized.includes('sim')) return 'account';
  if (normalized.includes('support') || normalized.includes('customer')) return 'support';
  if (normalized.includes('promotion') || normalized.includes('deal')) return 'promotion';
  if (normalized.includes('airtime')) return 'airtime';
  return 'other';
}

function normalizeCode(value: string): string {
  const compact = value.toLowerCase().replace(/\s+/g, '');
  if (compact.startsWith('n/a')) return 'n/a';
  return compact
    .replace(/vouchercode|voucher|pin/g, '{token}')
    .replace(/number/g, '{number}');
}

function normalizeLabel(value: string | undefined): string {
  return (value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function collectWp1RegistryOccurrences(): RegistryOccurrence[] {
  return [
    ...ussdRepository.map((record) => ({
      registry: 'ussdRepository' as const,
      id: record.id,
      operator: operatorId(record.network) ?? record.network,
      code: record.code,
      codeType: categoryType(record.category),
      label: record.action
    })),
    ...ussdCodes.map((record) => ({
      registry: 'ussdCodes' as const,
      id: record.id,
      operator: operatorId(record.network) ?? record.network,
      code: record.code,
      codeType: categoryType(`${record.category} ${record.purpose}`),
      label: record.purpose
    })),
    ...Object.entries(ussdCodesByNetwork).flatMap(([network, value]) => value.codes.map((record) => ({
      registry: 'ussdCodesByNetwork' as const,
      id: record.id,
      operator: operatorId(network) ?? network,
      code: record.code,
      codeType: record.codeType,
      label: record.label
    }))),
    ...WP1_FUTURE_QUICK_ANSWERS.map((answer) => ({
      registry: 'quickAnswers' as const,
      id: answer.answerId,
      operator: answer.operator
    }))
  ];
}

export function validateWp1AnalyticsRegistry(
  occurrences: readonly RegistryOccurrence[] = collectWp1RegistryOccurrences()
): RegistryValidation {
  const issues: RegistryIssue[] = [];
  const byId = new Map<string, RegistryOccurrence[]>();

  for (const occurrence of occurrences) {
    const isAnswer = occurrence.registry === 'quickAnswers';
    const approved = isAnswer ? answerIdSet.has(occurrence.id) : ussdIdSet.has(occurrence.id);
    if (!isStableAnalyticsId(occurrence.id)) {
      issues.push({ severity: 'error', code: 'invalid_stable_id', id: occurrence.id, registry: occurrence.registry, message: 'Analytics ID is not syntax-safe.' });
    }
    if (!approved) {
      issues.push({ severity: 'error', code: isAnswer ? 'unregistered_answer_id' : 'unregistered_code_id', id: occurrence.id, registry: occurrence.registry, message: 'Analytics ID is not present in the canonical registry.' });
    }

    const operator = operatorId(occurrence.operator);
    const idOperator = occurrence.id.split('.')[1] === 'cellc' ? 'cell_c' : occurrence.id.split('.')[1];
    if (!operator) {
      issues.push({ severity: 'error', code: 'unknown_operator', id: occurrence.id, registry: occurrence.registry, message: `Unknown operator: ${occurrence.operator}` });
    } else if (operator !== idOperator) {
      issues.push({ severity: 'error', code: 'operator_id_mismatch', id: occurrence.id, registry: occurrence.registry, message: `Operator ${operator} conflicts with ID namespace ${idOperator}.` });
    }
    if (!isAnswer && !occurrence.code?.trim()) {
      issues.push({ severity: 'error', code: 'missing_code', id: occurrence.id, registry: occurrence.registry, message: 'Event-producing USSD records require a code value.' });
    }

    const group = byId.get(occurrence.id) ?? [];
    group.push(occurrence);
    byId.set(occurrence.id, group);
  }

  for (const [id, group] of byId) {
    if (group[0].registry === 'quickAnswers') continue;
    const normalizedCodes = new Set(group.map((item) => normalizeCode(item.code ?? '')));
    const normalizedOperators = new Set(group.map((item) => operatorId(item.operator)));
    if (normalizedCodes.size > 1) {
      issues.push({ severity: 'error', code: 'conflicting_code_for_id', id, registry: group.map((item) => item.registry).join(','), message: 'The same canonical ID has conflicting code values across UI registries.' });
    }
    if (normalizedOperators.size > 1) {
      issues.push({ severity: 'error', code: 'conflicting_operator_for_id', id, registry: group.map((item) => item.registry).join(','), message: 'The same canonical ID has conflicting operators across UI registries.' });
    }
  }

  const logicalSignatures = new Map<string, Set<string>>();
  for (const occurrence of occurrences.filter((item) => item.registry !== 'quickAnswers')) {
    const signature = [operatorId(occurrence.operator), normalizeCode(occurrence.code ?? ''), normalizeLabel(occurrence.label)].join('|');
    const ids = logicalSignatures.get(signature) ?? new Set<string>();
    ids.add(occurrence.id);
    logicalSignatures.set(signature, ids);
  }
  for (const ids of logicalSignatures.values()) {
    if (ids.size > 1) {
      const list = [...ids].sort();
      issues.push({ severity: 'warning', code: 'equivalent_records_different_ids', id: list.join(','), registry: 'cross-registry', message: `Equivalent logical records use different IDs: ${list.join(', ')}` });
    }
  }

  const codeOccurrences = occurrences.filter((item) => item.registry !== 'quickAnswers');
  const answerOccurrences = occurrences.filter((item) => item.registry === 'quickAnswers');
  return {
    errors: issues.filter((issue) => issue.severity === 'error'),
    warnings: issues.filter((issue) => issue.severity === 'warning'),
    occurrenceCount: occurrences.length,
    uniqueIdCount: new Set(occurrences.map((item) => item.id)).size,
    codeOccurrenceCount: codeOccurrences.length,
    uniqueCodeIdCount: new Set(codeOccurrences.map((item) => item.id)).size,
    answerOccurrenceCount: answerOccurrences.length,
    uniqueAnswerIdCount: new Set(answerOccurrences.map((item) => item.id)).size,
    registries: [...new Set(occurrences.map((item) => item.registry))].sort()
  };
}

export function assertRegisteredUssdCodeId(value: unknown): asserts value is RegisteredUssdCodeId {
  if (typeof value !== 'string' || !ussdIdSet.has(value)) throw new Error('Invalid code_id');
}

export function registeredUssdCodeId(value: string): RegisteredUssdCodeId {
  assertRegisteredUssdCodeId(value);
  return value;
}

export function assertRegisteredQuickAnswerId(value: unknown): asserts value is RegisteredQuickAnswerId {
  if (typeof value !== 'string' || !answerIdSet.has(value)) throw new Error('Invalid answer_id');
}
