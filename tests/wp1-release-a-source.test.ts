import assert from 'node:assert/strict';
import test from 'node:test';
import {
  deriveReviewDueAt,
  type ContentEvidenceRecord,
  type SourceRecord,
  validateReleaseAData
} from '../src/seo/wp1SourceFreshness';

const source = (overrides: Partial<SourceRecord> = {}): SourceRecord => ({
  recordId: 'source.operator.example',
  sourceUrl: 'https://example.com/evidence',
  sourceType: 'operator',
  checkedAt: '2026-07-01',
  verificationMethod: 'operator_page',
  claimScope: 'Example controlled claim.',
  status: 'verified',
  confidence: 'high',
  lastContentChangeAt: '2026-06-01',
  ...overrides
});

const content = (overrides: Partial<ContentEvidenceRecord> = {}): ContentEvidenceRecord => ({
  recordId: 'content.example',
  recordType: 'content',
  riskClass: 'evergreen',
  lifecycle: 'new',
  sourceRecordIds: ['source.operator.example'],
  active: true,
  ...overrides
});

test('duplicate IDs and missing references fail', () => {
  const result = validateReleaseAData(
    [source(), source({ sourceUrl: 'https://example.com/second' })],
    [content({ sourceRecordIds: ['source.missing'] })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'duplicate_stable_id'));
  assert.ok(result.errors.some((issue) => issue.code === 'missing_source_reference'));
});

test('invalid enum values, dates, future checks and ranges fail', () => {
  const result = validateReleaseAData([
    source({ recordId: 'source.invalid_type', sourceType: 'blog' as SourceRecord['sourceType'] }),
    source({ recordId: 'source.invalid_date', checkedAt: '2026-02-30' }),
    source({ recordId: 'source.future', checkedAt: '2026-08-01' }),
    source({ recordId: 'source.invalid_range', effectiveFrom: '2026-08-01', expiresAt: '2026-07-01' })
  ], [], { asOf: '2026-07-21' });
  assert.ok(result.errors.some((issue) => issue.code === 'invalid_source_type'));
  assert.ok(result.errors.some((issue) => issue.code === 'invalid_date'));
  assert.ok(result.errors.some((issue) => issue.code === 'future_checked_at'));
  assert.ok(result.errors.some((issue) => issue.code === 'invalid_effective_range'));
});

test('approved review intervals are derived from checkedAt', () => {
  assert.equal(deriveReviewDueAt('2026-07-01', 'promotion'), '2026-07-31');
  assert.equal(deriveReviewDueAt('2026-07-01', 'price'), '2026-07-31');
  assert.equal(deriveReviewDueAt('2026-07-01', 'ussd_code'), '2026-09-29');
  assert.equal(deriveReviewDueAt('2026-07-01', 'device_steps'), '2026-12-28');
  assert.equal(deriveReviewDueAt('2026-07-01', 'evergreen'), '2027-07-01');
});

test('review overrides require justification and cannot extend a promotion past expiry', () => {
  const result = validateReleaseAData([
    source({ reviewDueAt: '2026-09-01', expiresAt: '2026-08-01' })
  ], [], { asOf: '2026-07-21' });
  assert.ok(result.errors.some((issue) => issue.code === 'unjustified_review_due_override'));
  assert.ok(result.errors.some((issue) => issue.code === 'review_due_after_expiry'));
});

test('expired active promotions and unverified strict quick-answer evidence are excluded', () => {
  const result = validateReleaseAData(
    [source({ expiresAt: '2026-07-01', status: 'needs_review' })],
    [content({ recordType: 'quick_answer', riskClass: 'promotion', powersQuickAnswer: true })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'expired_active_promotion'));
  assert.ok(result.errors.some((issue) => issue.code === 'strict_source_not_publishable'));
  assert.deepEqual(result.excludedRecordIds, ['content.example']);
});

test('new or edited high-risk records require evidence', () => {
  const result = validateReleaseAData([], [content({ riskClass: 'price', lifecycle: 'edited', sourceRecordIds: [] })], { asOf: '2026-07-21' });
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
});

test('untouched legacy gaps warn and join the backfill queue without blocking', () => {
  const result = validateReleaseAData([], [content({ lifecycle: 'legacy_untouched', riskClass: 'ussd_code', sourceRecordIds: [] })], { asOf: '2026-07-21' });
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.some((issue) => issue.code === 'legacy_evidence_backfill'));
  assert.deepEqual(result.editorialBackfillIds, ['content.example']);
  assert.deepEqual(result.eligibleRecordIds, ['content.example']);
});

test('overdue evergreen evidence warns, while overdue quick-answer evidence fails', () => {
  const stale = source({ checkedAt: '2024-01-01' });
  const evergreen = validateReleaseAData([stale], [content()], { asOf: '2026-07-21' });
  assert.equal(evergreen.errors.length, 0);
  assert.ok(evergreen.warnings.some((issue) => issue.code === 'source_review_overdue'));

  const strict = validateReleaseAData([stale], [content({ recordType: 'quick_answer', powersQuickAnswer: true })], { asOf: '2026-07-21' });
  assert.ok(strict.errors.some((issue) => issue.code === 'source_review_overdue'));
});

test('checkedAt validation never mutates lastContentChangeAt', () => {
  const evidence = source({ checkedAt: '2026-07-20', lastContentChangeAt: '2026-05-10' });
  const before = structuredClone(evidence);
  validateReleaseAData([evidence], [content()], { asOf: '2026-07-21' });
  assert.deepEqual(evidence, before);
  assert.equal(evidence.lastContentChangeAt, '2026-05-10');
});

