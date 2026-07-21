import assert from 'node:assert/strict';
import test from 'node:test';
import {
  collectWp1RegistryOccurrences,
  validateWp1AnalyticsRegistry,
  type RegistryOccurrence
} from '../src/seo/wp1AnalyticsRegistry';

test('the canonical event registry covers every current producer with exact totals', () => {
  const result = validateWp1AnalyticsRegistry();
  assert.deepEqual(result.errors, []);
  assert.equal(result.occurrenceCount, 64);
  assert.equal(result.uniqueIdCount, 40);
  assert.equal(result.codeOccurrenceCount, 61);
  assert.equal(result.uniqueCodeIdCount, 37);
  assert.equal(result.answerOccurrenceCount, 3);
  assert.equal(result.uniqueAnswerIdCount, 3);
  assert.deepEqual(result.registries, ['quickAnswers', 'ussdCodes', 'ussdCodesByNetwork', 'ussdRepository']);
});

test('a conflicting occurrence in src/data.ts::ussdCodes fails', () => {
  const occurrences = collectWp1RegistryOccurrences();
  const target = occurrences.find((item) => item.registry === 'ussdCodes' && item.id === 'ussd.mtn.balance_main');
  assert.ok(target);
  target.code = '*999#';
  const result = validateWp1AnalyticsRegistry(occurrences);
  assert.ok(result.errors.some((issue) => issue.code === 'conflicting_code_for_id' && issue.id === target.id));
});

test('an operator mismatch in ussdCodesByNetwork fails', () => {
  const occurrences = collectWp1RegistryOccurrences();
  const target = occurrences.find((item) => item.registry === 'ussdCodesByNetwork' && item.id === 'ussd.vodacom.balance_main');
  assert.ok(target);
  target.operator = 'mtn';
  const result = validateWp1AnalyticsRegistry(occurrences);
  assert.ok(result.errors.some((issue) => issue.code === 'operator_id_mismatch' && issue.id === target.id));
  assert.ok(result.errors.some((issue) => issue.code === 'conflicting_operator_for_id' && issue.id === target.id));
});

test('missing codes, unknown operators and unregistered code IDs fail', () => {
  const invalid: RegistryOccurrence[] = [{
    registry: 'ussdCodes',
    id: 'ussd.unknown.syntax_valid',
    operator: 'unknown',
    code: '',
    codeType: 'balance',
    label: 'Synthetic fixture'
  }];
  const result = validateWp1AnalyticsRegistry(invalid);
  assert.ok(result.errors.some((issue) => issue.code === 'unregistered_code_id'));
  assert.ok(result.errors.some((issue) => issue.code === 'unknown_operator'));
  assert.ok(result.errors.some((issue) => issue.code === 'missing_code'));
});

test('unregistered quick answers fail canonical membership', () => {
  const result = validateWp1AnalyticsRegistry([{
    registry: 'quickAnswers',
    id: 'qa.unregistered.safe_id',
    operator: 'vodacom'
  }]);
  assert.ok(result.errors.some((issue) => issue.code === 'unregistered_answer_id'));
});

test('equivalent records under different IDs are diagnosed', () => {
  const occurrences: RegistryOccurrence[] = [
    { registry: 'ussdCodes', id: 'ussd.mtn.balance_main', operator: 'mtn', code: '*136#', codeType: 'balance', label: 'Balance' },
    { registry: 'ussdCodesByNetwork', id: 'ussd.mtn.data_balance', operator: 'mtn', code: '*136#', codeType: 'balance', label: 'Balance' }
  ];
  const result = validateWp1AnalyticsRegistry(occurrences);
  assert.ok(result.warnings.some((issue) => issue.code === 'equivalent_records_different_ids'));
});

