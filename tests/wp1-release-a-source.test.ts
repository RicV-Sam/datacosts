import assert from 'node:assert/strict';
import test from 'node:test';
import {
  classifyContentLifecycle,
  deriveReviewDueAt,
  selectEligibleSources,
  type ContentEvidenceRecord,
  type SourceRecord,
  validateLegacyManifest,
  validateReleaseAData
} from '../src/seo/wp1SourceFreshness';
import { fingerprintMaterialClaim, type LegacyManifestEntry } from '../src/seo/wp1LegacyManifest';

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
  const materialClaim = { code: '*000#', operator: 'Example', claimScope: 'Balance lookup.' };
  const legacyManifest: LegacyManifestEntry[] = [{
    recordId: 'content.example',
    recordType: 'content',
    materialFingerprint: fingerprintMaterialClaim(materialClaim),
    baselineCommit: 'test-baseline',
    migrationVersion: 'test-v1'
  }];
  const result = validateReleaseAData([], [content({ materialClaim, riskClass: 'ussd_code', sourceRecordIds: [] })], { asOf: '2026-07-21', legacyManifest });
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

const legacyClaim = {
  operator: 'Example',
  code: '*000#',
  codeType: 'Balance',
  label: 'Check balance',
  instructions: 'Dial the code.',
  claimScope: 'Example prepaid balance lookup.'
};

const legacyEntry = (overrides: Partial<LegacyManifestEntry> = {}): LegacyManifestEntry => ({
  recordId: 'ussd.example.legacy',
  recordType: 'ussd_code',
  materialFingerprint: fingerprintMaterialClaim(legacyClaim),
  baselineCommit: 'test-baseline',
  migrationVersion: 'test-v1',
  ...overrides
});

const legacyContent = (claim: Record<string, unknown> = legacyClaim, overrides: Partial<ContentEvidenceRecord> = {}): ContentEvidenceRecord => ({
  recordId: 'ussd.example.legacy',
  recordType: 'ussd_code',
  riskClass: 'ussd_code',
  materialClaim: claim,
  lifecycle: 'legacy_untouched',
  sourceRecordIds: [],
  active: true,
  ...overrides
});

test('frozen manifest deterministically classifies unchanged, edited and new records', () => {
  const manifest = [legacyEntry()];
  assert.equal(classifyContentLifecycle(legacyContent(), manifest), 'legacy_untouched');
  assert.equal(classifyContentLifecycle(legacyContent({ ...legacyClaim, code: '*001#' }), manifest), 'legacy_edited');
  assert.equal(classifyContentLifecycle(legacyContent({ ...legacyClaim, claimScope: 'Changed scope.' }), manifest), 'legacy_edited');
  assert.equal(classifyContentLifecycle(legacyContent({ ...legacyClaim, operator: 'Other' }), manifest), 'legacy_edited');
  assert.equal(classifyContentLifecycle(legacyContent(legacyClaim, { recordId: 'ussd.example.new' }), manifest), 'new');
});

test('edited, new, renamed and quick-answer records cannot enter warning-only legacy treatment', () => {
  const manifest = [legacyEntry()];
  const changed = validateReleaseAData([], [legacyContent({ ...legacyClaim, code: '*001#' })], { asOf: '2026-07-21', legacyManifest: manifest });
  assert.ok(changed.errors.some((issue) => issue.code === 'strict_evidence_required'));

  const callerSpoof = validateReleaseAData([], [legacyContent(legacyClaim, { recordId: 'ussd.example.new', lifecycle: 'legacy_untouched' })], { asOf: '2026-07-21', legacyManifest: manifest });
  assert.ok(callerSpoof.errors.some((issue) => issue.code === 'strict_evidence_required'));

  const renamed = validateReleaseAData([], [legacyContent(legacyClaim, { recordId: 'ussd.example.renamed' })], { asOf: '2026-07-21', legacyManifest: manifest, requireCompleteLegacyManifest: true });
  assert.ok(renamed.errors.some((issue) => issue.code === 'missing_legacy_record'));
  assert.ok(renamed.errors.some((issue) => issue.code === 'strict_evidence_required'));

  const quickAnswer = validateReleaseAData([], [legacyContent(legacyClaim, { recordType: 'quick_answer', powersQuickAnswer: true })], { asOf: '2026-07-21', legacyManifest: [{ ...legacyEntry(), recordType: 'quick_answer' }] });
  assert.ok(quickAnswer.errors.some((issue) => issue.code === 'strict_evidence_required'));
});

test('manifest validation rejects duplicate IDs and malformed fingerprints', () => {
  const issues = validateLegacyManifest([
    legacyEntry(),
    legacyEntry({ materialFingerprint: 'not-a-sha256' })
  ]);
  assert.ok(issues.some((issue) => issue.code === 'duplicate_manifest_id'));
  assert.ok(issues.some((issue) => issue.code === 'invalid_manifest_fingerprint'));
});

test('eligibility includes date boundaries and excludes future or elapsed windows', () => {
  const activeToday = source({ effectiveFrom: '2026-07-21', expiresAt: '2026-07-21' });
  const eligible = validateReleaseAData([activeToday], [content({ recordId: 'content.today', riskClass: 'promotion', sourceRecordIds: [activeToday.recordId] })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.deepEqual(eligible.eligibleRecordIds, ['content.today']);

  const tomorrow = validateReleaseAData([source({ effectiveFrom: '2026-07-22' })], [content({ recordId: 'content.tomorrow', riskClass: 'price' })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(tomorrow.errors.some((issue) => issue.code === 'source_not_yet_effective'));

  const yesterday = validateReleaseAData([source({ expiresAt: '2026-07-20' })], [content({ recordId: 'content.yesterday', riskClass: 'price' })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(yesterday.errors.some((issue) => issue.code === 'source_expired'));
});

test('verified status cannot override expiry and expired status cannot contradict its window', () => {
  const expiredVerified = validateReleaseAData([source({ expiresAt: '2026-07-20', status: 'verified' })], [content({ riskClass: 'price' })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(expiredVerified.errors.some((issue) => issue.code === 'source_expired'));

  const contradictory = validateReleaseAData([source({ status: 'expired', effectiveFrom: '2026-07-22', expiresAt: '2026-07-30' })], [], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(contradictory.errors.some((issue) => issue.code === 'expired_status_window_mismatch'));
});

test('review overrides may shorten but never extend the derived review window', () => {
  const result = validateReleaseAData([
    source({ reviewDueAt: '2027-01-01', reviewDueOverrideReason: 'Attempted extension.', reviewDueOverrideApprovedBy: 'seo_lead' })
  ], [content({ riskClass: 'ussd_code' })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(result.errors.some((issue) => issue.code === 'review_due_extension_not_permitted'));
});

test('derived and supersession graphs reject missing references and two/three-node cycles', () => {
  const records = [
    source({ recordId: 'source.a', verificationMethod: 'derived', derivedFromSourceIds: ['source.b'] }),
    source({ recordId: 'source.b', verificationMethod: 'derived', derivedFromSourceIds: ['source.c'] }),
    source({ recordId: 'source.c', verificationMethod: 'derived', derivedFromSourceIds: ['source.a'], supersedes: ['source.missing'] })
  ];
  const result = validateReleaseAData(records, [], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(result.errors.some((issue) => issue.code === 'reference_cycle'));
  assert.ok(result.errors.some((issue) => issue.code === 'missing_superseded_source'));

  const twoNode = validateReleaseAData([
    source({ recordId: 'source.one', supersedes: ['source.two'] }),
    source({ recordId: 'source.two', supersedes: ['source.one'] })
  ], [], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(twoNode.errors.some((issue) => issue.code === 'reference_cycle'));
});

test('valid multi-source derivation records chains and rejects an expired dependency', () => {
  const sources = [
    source({ recordId: 'source.base.one' }),
    source({ recordId: 'source.base.two' }),
    source({ recordId: 'source.derived', verificationMethod: 'derived', derivedFromSourceIds: ['source.base.one', 'source.base.two'] })
  ];
  const valid = validateReleaseAData(sources, [content({ sourceRecordIds: ['source.derived'], riskClass: 'price' })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.equal(valid.errors.length, 0);
  assert.deepEqual(valid.dependencyChains['source.derived'], [
    ['source.derived', 'source.base.one'],
    ['source.derived', 'source.base.two']
  ]);

  sources[0] = source({ recordId: 'source.base.one', expiresAt: '2026-07-20' });
  const invalid = validateReleaseAData(sources, [content({ sourceRecordIds: ['source.derived'], riskClass: 'price' })], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(invalid.errors.some((issue) => issue.code === 'ineligible_derived_dependency'));
});

test('exclusive active claim conflicts fail and comparison selection returns an empty safe state', () => {
  const conflict = validateReleaseAData([
    source({ recordId: 'source.exclusive.one', claimScope: 'Exclusive offer', exclusiveClaimScope: true }),
    source({ recordId: 'source.exclusive.two', claimScope: 'Exclusive offer', exclusiveClaimScope: true })
  ], [], { asOf: '2026-07-21', legacyManifest: [] });
  assert.ok(conflict.errors.some((issue) => issue.code === 'exclusive_claim_scope_conflict'));

  assert.deepEqual(selectEligibleSources([
    source({ recordId: 'source.expired.one', expiresAt: '2026-07-20' }),
    source({ recordId: 'source.expired.two', expiresAt: '2026-07-19' })
  ], 'price', '2026-07-21', { strict: true }), []);
});

