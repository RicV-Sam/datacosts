import assert from 'node:assert/strict';
import test from 'node:test';
import {
  type ContentEvidenceRecord,
  type SourceRecord,
  validateReleaseAData
} from '../src/seo/wp1SourceFreshness';
import { fingerprintMaterialClaim } from '../src/seo/wp1LegacyManifest';

const source = (overrides: Partial<SourceRecord> = {}): SourceRecord => ({
  recordId: 'source.operator.example',
  sourceUrl: 'https://example.com/evidence',
  sourceType: 'operator',
  checkedAt: '2026-07-20',
  verificationMethod: 'operator_page',
  claimScope: 'Example controlled claim.',
  status: 'verified',
  confidence: 'high',
  ...overrides
});

const content = (overrides: Partial<ContentEvidenceRecord> = {}): ContentEvidenceRecord => ({
  recordId: 'ussd.example.new_record',
  recordType: 'ussd_code',
  riskClass: 'ussd_code',
  lifecycle: 'legacy_untouched',
  sourceRecordIds: [],
  active: true,
  ...overrides
});

test('unknown records cannot self-declare legacy warning treatment', () => {
  const result = validateReleaseAData([], [content()], { asOf: '2026-07-21' });
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
});

test('a new USSD record cannot bypass strict evidence by declaring evergreen risk', () => {
  const result = validateReleaseAData(
    [],
    [content({ riskClass: 'evergreen', lifecycle: 'legacy_untouched' })],
    { asOf: '2026-07-21' }
  );
  assert.equal(result.lifecycleByRecordId['ussd.example.new_record'], 'new');
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('an always-strict record policy applies even to an untouched legacy record', () => {
  const materialClaim = { answerId: 'qa.example.legacy' };
  const record = content({
    recordId: 'qa.example.legacy',
    recordType: 'quick_answer',
    riskClass: 'evergreen',
    powersQuickAnswer: false,
    materialClaim
  });
  const result = validateReleaseAData([], [record], {
    asOf: '2026-07-21',
    legacyManifest: [{
      recordId: record.recordId,
      recordType: record.recordType,
      materialFingerprint: fingerprintMaterialClaim(materialClaim),
      baselineCommit: 'test-baseline',
      migrationVersion: 'test-policy'
    }]
  });

  assert.equal(result.lifecycleByRecordId[record.recordId], 'legacy_untouched');
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
  assert.deepEqual(result.excludedRecordIds, [record.recordId]);
});

test('future-effective quick-answer evidence is ineligible', () => {
  const result = validateReleaseAData(
    [source({ effectiveFrom: '2026-07-22' })],
    [content({ recordType: 'quick_answer', powersQuickAnswer: true, sourceRecordIds: ['source.operator.example'] })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'source_not_yet_effective'));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('expired strict USSD evidence is ineligible regardless of risk class', () => {
  const result = validateReleaseAData(
    [source({ expiresAt: '2026-07-20' })],
    [content({ lifecycle: 'new', sourceRecordIds: ['source.operator.example'] })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'source_expired'));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('promotions require an explicit effective window and expiry', () => {
  const result = validateReleaseAData(
    [source()],
    [content({ lifecycle: 'new', riskClass: 'promotion', sourceRecordIds: ['source.operator.example'] })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'promotion_effective_from_required'));
  assert.ok(result.errors.some((issue) => issue.code === 'promotion_expiry_required'));
});

test('derived evidence requires a dependency', () => {
  const result = validateReleaseAData(
    [source({ verificationMethod: 'derived' })],
    [content({ lifecycle: 'new', sourceRecordIds: ['source.operator.example'] })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'derived_dependency_required'));
});

test('self-supersession is rejected', () => {
  const result = validateReleaseAData(
    [source({ supersedes: ['source.operator.example'] })],
    [],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'self_reference'));
});

test('reviewDueAt cannot precede checkedAt', () => {
  const result = validateReleaseAData(
    [source({
      checkedAt: '2026-07-20',
      reviewDueAt: '2026-07-19',
      reviewDueOverrideReason: 'Shorten review window.',
      reviewDueOverrideApprovedBy: 'seo_lead'
    })],
    [],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'review_due_before_checked'));
});

test('an unused source cannot carry an unauthorised extension beyond the conservative review window', () => {
  const result = validateReleaseAData(
    [source({
      checkedAt: '2026-07-01',
      reviewDueAt: '2026-09-01',
      reviewDueOverrideReason: 'Unapproved extension.',
      reviewDueOverrideApprovedBy: 'seo_lead'
    })],
    [],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'review_due_extension_not_permitted'));
});

test('an expired transitive dependency excludes the derived claim', () => {
  const expiredBase = source({
    recordId: 'source.operator.expired-base',
    expiresAt: '2026-07-20'
  });
  const middle = source({
    recordId: 'source.operator.middle',
    verificationMethod: 'derived',
    derivedFromSourceIds: [expiredBase.recordId]
  });
  const top = source({
    recordId: 'source.operator.top',
    verificationMethod: 'derived',
    derivedFromSourceIds: [middle.recordId]
  });
  const result = validateReleaseAData(
    [expiredBase, middle, top],
    [content({ sourceRecordIds: [top.recordId] })],
    { asOf: '2026-07-21' }
  );
  assert.ok(result.errors.some((issue) => issue.code === 'ineligible_derived_dependency' && issue.message.includes(expiredBase.recordId)));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});
