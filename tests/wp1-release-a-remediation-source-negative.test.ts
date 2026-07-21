import assert from 'node:assert/strict';
import test from 'node:test';
import * as sourceFreshness from '../src/seo/wp1SourceFreshness';
import {
  EVIDENCE_POLICY_VERSION,
  getEvidenceRecordPolicy,
  type ContentEvidenceRecord,
  type EvidenceSubjectKind,
  type SourceRecord,
  selectEligibleSources,
  validateReleaseAData as validateReleaseADataCore
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

type TestContentOverrides = Partial<ContentEvidenceRecord> & { subjectKind?: EvidenceSubjectKind };

const CANONICAL_PRICE_ID = 'price.mtn-50gb-data-price';
const CANONICAL_USSD_ID = 'ussd.vodacom.balance_main';
const CANONICAL_EVERGREEN_ID = 'operator.mtn';

const content = (overrides: TestContentOverrides = {}): ContentEvidenceRecord => {
  const { subjectKind = 'ussd_code', ...recordOverrides } = overrides;
  const defaultRecordId = subjectKind === 'price'
    ? CANONICAL_PRICE_ID
    : subjectKind === 'evergreen_fact'
      ? CANONICAL_EVERGREEN_ID
      : subjectKind === 'ussd_code'
        ? 'ussd.example.new_record'
        : `${subjectKind}.unregistered_contract_subject`;
  return {
    recordId: defaultRecordId,
    recordType: 'ussd_code',
    lifecycle: 'legacy_untouched',
    sourceRecordIds: [],
    active: true,
    ...recordOverrides
  };
};

type TestValidationOptions = Parameters<typeof validateReleaseADataCore>[2];

const validateReleaseAData = (
  sources: SourceRecord[],
  records: ContentEvidenceRecord[],
  options: TestValidationOptions
) => validateReleaseADataCore(sources, records, options);

const selectForCanonicalPrice = (sources: SourceRecord[]): SourceRecord[] => {
  const record = content({
    recordId: CANONICAL_PRICE_ID,
    recordType: 'content',
    sourceRecordIds: sources.map((candidate) => candidate.recordId)
  });
  const validationResult = validateReleaseAData(sources, [record], { asOf: '2026-07-21', legacyManifest: [] });
  return selectEligibleSources({
    validationResult,
    contentId: record.recordId,
    candidateSourceIds: sources.map((candidate) => candidate.recordId)
  });
};

const compileTimeCallerKindBypass: ContentEvidenceRecord = {
  recordId: 'content.compile_time_bypass',
  recordType: 'content',
  sourceRecordIds: [],
  active: true,
  // @ts-expect-error Evidence records cannot carry semantic-kind authority.
  subjectKind: 'evergreen_fact'
};
void compileTimeCallerKindBypass;

test('unknown records cannot self-declare legacy warning treatment', () => {
  const result = validateReleaseAData([], [content()], { asOf: '2026-07-21' });
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
});

test('a new USSD record cannot bypass strict evidence by declaring evergreen risk', () => {
  const record = content({ lifecycle: 'legacy_untouched' });
  (record as ContentEvidenceRecord & { riskClass: string }).riskClass = 'evergreen';
  const result = validateReleaseAData(
    [],
    [record],
    { asOf: '2026-07-21' }
  );
  assert.equal(result.lifecycleByRecordId['ussd.example.new_record'], 'new');
  assert.ok(result.errors.some((issue) => issue.code === 'caller_evidence_policy_forbidden'));
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('caller policy fields and unregistered semantic aliases fail closed', () => {
  const records = [
    content({ recordId: 'content.price', recordType: 'content', subjectKind: 'price' }),
    content({ recordId: 'content.promotion', recordType: 'content', subjectKind: 'promotion' }),
    content({ recordId: 'content.ussd_wrong_kind', subjectKind: 'evergreen_fact' })
  ];
  Object.assign(records[0] as object, { recordKind: 'evergreen_fact', riskClass: 'evergreen' });
  Object.assign(records[1] as object, { recordKind: 'evergreen_fact', riskClass: 'ussd_code' });
  const result = validateReleaseAData([], records, { asOf: '2026-07-21', legacyManifest: [] });

  assert.equal(result.errors.filter((issue) => issue.code === 'caller_evidence_policy_forbidden').length, 4);
  assert.equal(result.errors.filter((issue) => issue.code === 'missing_evidence_subject').length, 3);
  assert.deepEqual(result.excludedRecordIds, records.map((record) => record.recordId).sort());
});

test('there is no exported trusted-registry constructor and caller registries fail closed at runtime', () => {
  assert.equal('createEvidenceSubjectRegistry' in sourceFreshness, false);
  const record = content({ recordType: 'content' });
  const result = Reflect.apply(validateReleaseADataCore, undefined, [[], [record], {
    asOf: '2026-07-21',
    legacyManifest: [],
    evidenceSubjects: { [record.recordId]: { subjectKind: 'evergreen_fact' } } as never
  }]) as ReturnType<typeof validateReleaseADataCore>;
  assert.ok(result.errors.some((issue) => issue.code === 'missing_evidence_subject'));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('an edited legacy USSD record cannot relabel itself as evergreen', () => {
  const originalClaim = { operator: 'Example', code: '*100#', claimScope: 'Original balance code.' };
  const editedClaim = { ...originalClaim, code: '*101#' };
  const record = content({ materialClaim: editedClaim });
  (record as ContentEvidenceRecord & { riskClass: string }).riskClass = 'evergreen';
  const result = validateReleaseAData([], [record], {
    asOf: '2026-07-21',
    legacyManifest: [{
      recordId: record.recordId,
      recordType: record.recordType,
      materialFingerprint: fingerprintMaterialClaim(originalClaim),
      baselineCommit: 'test-baseline',
      migrationVersion: 'test-policy'
    }]
  });

  assert.equal(result.lifecycleByRecordId[record.recordId], 'legacy_edited');
  assert.ok(result.errors.some((issue) => issue.code === 'caller_evidence_policy_forbidden'));
  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
});

test('a valid new evergreen fact remains strict', () => {
  const record = content({
    recordId: CANONICAL_EVERGREEN_ID,
    recordType: 'content',
    subjectKind: 'evergreen_fact'
  });
  const result = validateReleaseAData([], [record], { asOf: '2026-07-21', legacyManifest: [] });

  assert.ok(result.errors.some((issue) => issue.code === 'strict_evidence_required'));
  assert.deepEqual(result.excludedRecordIds, [record.recordId]);
});

test('a USSD record cannot borrow the evergreen review interval', () => {
  const staleForUssd = source({ checkedAt: '2026-03-01' });
  const record = content({ sourceRecordIds: [staleForUssd.recordId] });
  Object.assign(record as object, { recordKind: 'evergreen_fact', riskClass: 'evergreen' });
  const result = validateReleaseAData(
    [staleForUssd],
    [record],
    { asOf: '2026-07-21', legacyManifest: [] }
  );

  assert.ok(result.errors.some((issue) => issue.code === 'caller_evidence_policy_forbidden'));
  assert.ok(result.errors.some((issue) => issue.code === 'source_review_overdue'));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('an always-strict record policy applies even to an untouched legacy record', () => {
  const materialClaim = { priceId: CANONICAL_PRICE_ID };
  const record = content({
    recordId: CANONICAL_PRICE_ID,
    recordType: 'content',
    subjectKind: 'price',
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

test('the versioned evidence policy is deeply frozen', () => {
  assert.equal(EVIDENCE_POLICY_VERSION, 'wp1-release-a.6');
  const policy = getEvidenceRecordPolicy('ussd_code');
  assert.ok(policy);
  assert.ok(Object.isFrozen(policy));
  assert.throws(() => {
    (policy as { riskClass: string }).riskClass = 'evergreen';
  }, TypeError);
  assert.equal(getEvidenceRecordPolicy('ussd_code')?.riskClass, 'ussd_code');
});

test('price, promotion and device subjects cannot masquerade as generic evergreen content', () => {
  const priceSource = source({ recordId: 'source.price.stale', checkedAt: '2026-05-01' });
  const promotionSource = source({ recordId: 'source.promotion.no_window' });
  const deviceSource = source({ recordId: 'source.device.stale', checkedAt: '2025-12-01' });
  const records = [
    content({ recordId: 'content.price', recordType: 'content', subjectKind: 'price', sourceRecordIds: [priceSource.recordId] }),
    content({ recordId: 'content.promotion', recordType: 'content', subjectKind: 'promotion', sourceRecordIds: [promotionSource.recordId] }),
    content({ recordId: 'content.device', recordType: 'content', subjectKind: 'device_step', sourceRecordIds: [deviceSource.recordId] })
  ];
  for (const record of records) Object.assign(record as object, { subjectKind: 'evergreen_fact', recordKind: 'evergreen_fact', riskClass: 'evergreen' });

  const result = validateReleaseAData([priceSource, promotionSource, deviceSource], records, {
    asOf: '2026-07-21',
    legacyManifest: []
  });

  assert.equal(result.errors.filter((issue) => issue.code === 'caller_evidence_policy_forbidden').length, 9);
  for (const record of records) {
    assert.ok(result.errors.some((issue) => issue.recordId === record.recordId && issue.code === 'missing_evidence_subject'));
    assert.deepEqual(selectEligibleSources({
      validationResult: result,
      contentId: record.recordId,
      candidateSourceIds: record.sourceRecordIds
    }), []);
  }
  assert.deepEqual(result.excludedRecordIds, records.map((record) => record.recordId).sort());
});

test('the canonical promotion policy always requires effective and expiry windows', () => {
  const policy = getEvidenceRecordPolicy('promotion');
  assert.equal(policy?.requiresEffectiveFrom, true);
  assert.equal(policy?.requiresExpiry, true);
});

test('malformed selector policy fields and extra positional arguments fail closed', () => {
  const eligibleSource = source({ recordId: 'source.price.eligible' });
  const priceRecord = content({ recordId: CANONICAL_PRICE_ID, recordType: 'content', sourceRecordIds: [eligibleSource.recordId] });
  const validationResult = validateReleaseAData([eligibleSource], [priceRecord], { asOf: '2026-07-21', legacyManifest: [] });
  const validRequest = { validationResult, contentId: priceRecord.recordId, candidateSourceIds: [eligibleSource.recordId] };
  const selectedBaseline = selectEligibleSources(validRequest);
  assert.equal(selectedBaseline.length, 1);
  assert.equal(selectedBaseline[0]?.recordId, eligibleSource.recordId);
  assert.deepEqual(Reflect.apply(selectEligibleSources, undefined, [{ ...validRequest, strict: false, promotion: false }]) as SourceRecord[], []);
  assert.deepEqual(Reflect.apply(selectEligibleSources, undefined, [validRequest, { strict: false }]) as SourceRecord[], []);
  const throwingRequest = new Proxy({}, { ownKeys: () => { throw new Error('malformed selector input'); } });
  assert.deepEqual(Reflect.apply(selectEligibleSources, undefined, [throwingRequest]) as SourceRecord[], []);
});

test('selection reuses validation lifecycle strictness for a new USSD record', () => {
  const overdue = source({ recordId: 'source.ussd.overdue', checkedAt: '2026-03-01' });
  const record = content({
    recordId: CANONICAL_USSD_ID,
    recordType: 'ussd_code',
    sourceRecordIds: [overdue.recordId]
  });
  const validationResult = validateReleaseAData([overdue], [record], { asOf: '2026-07-21', legacyManifest: [] });

  assert.equal(validationResult.lifecycleByRecordId[record.recordId], 'new');
  assert.ok(validationResult.errors.some((issue) => issue.recordId === record.recordId && issue.code === 'source_review_overdue'));
  assert.deepEqual(selectEligibleSources({
    validationResult,
    contentId: record.recordId,
    candidateSourceIds: [overdue.recordId]
  }), []);
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
    [content({ lifecycle: 'new', recordType: 'content', subjectKind: 'promotion', sourceRecordIds: ['source.operator.example'] })],
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
  assert.ok(result.errors.some((issue) =>
    issue.code === 'ineligible_derived_dependency' &&
    issue.message.includes(`${top.recordId} -> ${middle.recordId} -> ${expiredBase.recordId}`)
  ));
  assert.deepEqual(result.excludedRecordIds, ['ussd.example.new_record']);
});

test('recursive selection applies strict future, confidence and review rules to transitive bases', () => {
  const invalidBases: SourceRecord[] = [
    source({ recordId: 'source.base.future_effective', effectiveFrom: '2026-07-22' }),
    source({ recordId: 'source.base.low_confidence', confidence: 'low' }),
    source({ recordId: 'source.base.overdue', checkedAt: '2026-01-01' })
  ];

  for (const base of invalidBases) {
    const middle = source({
      recordId: `${base.recordId}.middle`,
      verificationMethod: 'derived',
      derivedFromSourceIds: [base.recordId]
    });
    const top = source({
      recordId: `${base.recordId}.top`,
      verificationMethod: 'derived',
      derivedFromSourceIds: [middle.recordId]
    });
    const selectedIds = selectForCanonicalPrice([base, middle, top])
      .map((candidate) => candidate.recordId);
    assert.ok(!selectedIds.includes(middle.recordId));
    assert.ok(!selectedIds.includes(top.recordId));
  }
});

test('recursive selection retains a fully eligible three-level chain', () => {
  const base = source({ recordId: 'source.valid.base' });
  const middle = source({
    recordId: 'source.valid.middle',
    verificationMethod: 'derived',
    derivedFromSourceIds: [base.recordId]
  });
  const top = source({
    recordId: 'source.valid.top',
    verificationMethod: 'derived',
    derivedFromSourceIds: [middle.recordId]
  });

  assert.deepEqual(
    selectForCanonicalPrice([base, middle, top]).map((candidate) => candidate.recordId),
    [base.recordId, middle.recordId, top.recordId]
  );
});

test('source selection excludes every derived source above an expired transitive dependency', () => {
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

  const selected = selectForCanonicalPrice([expiredBase, middle, top]);

  assert.deepEqual(selected, []);
});
