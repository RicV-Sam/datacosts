import {
  WP1_LEGACY_MANIFEST,
  fingerprintMaterialClaim,
  type LegacyManifestEntry
} from './wp1LegacyManifest';

export const STABLE_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._:-][a-z0-9]+)*$/;
export const DATE_ONLY_TIMEZONE = 'Africa/Johannesburg';

export const SOURCE_TYPES = ['operator', 'regulator', 'device_vendor', 'editorial'] as const;
export const VERIFICATION_METHODS = ['operator_page', 'app_check', 'ussd_test', 'support_confirmation', 'derived'] as const;
export const SOURCE_STATUSES = ['verified', 'needs_review', 'expired'] as const;
export const SOURCE_CONFIDENCE = ['high', 'medium', 'low'] as const;
export const RISK_CLASSES = Object.freeze(['promotion', 'price', 'ussd_code', 'device_steps', 'evergreen'] as const);
export const EVIDENCE_RECORD_KINDS = Object.freeze(['ussd_code', 'price', 'promotion', 'device_step', 'evergreen_fact'] as const);
export const REVIEW_OVERRIDE_APPROVERS = ['seo_lead', 'editorial_lead'] as const;
export const EVIDENCE_POLICY_VERSION = 'wp1-release-a.4' as const;
const CONSERVATIVE_OVERRIDE_RISK_CLASS: RiskClass = 'promotion';

export type SourceType = (typeof SOURCE_TYPES)[number];
export type VerificationMethod = (typeof VERIFICATION_METHODS)[number];
export type SourceStatus = (typeof SOURCE_STATUSES)[number];
export type SourceConfidence = (typeof SOURCE_CONFIDENCE)[number];
export type RiskClass = (typeof RISK_CLASSES)[number];
export type EvidenceRecordKind = (typeof EVIDENCE_RECORD_KINDS)[number];
export type EvidenceSubjectKind = EvidenceRecordKind;
export type RecordLifecycle = 'new' | 'legacy_edited' | 'legacy_untouched';
export type ContentEvidenceRecordType = 'ussd_code' | 'quick_answer' | 'operator' | 'content';

export interface SourceRecord {
  recordId: string;
  sourceUrl: string;
  sourceType: SourceType;
  checkedAt: string;
  effectiveFrom?: string;
  expiresAt?: string;
  verificationMethod: VerificationMethod;
  derivedFromSourceIds?: string[];
  claimScope: string;
  status: SourceStatus;
  confidence: SourceConfidence;
  lastContentChangeAt?: string;
  reviewDueAt?: string;
  reviewDueOverrideReason?: string;
  reviewDueOverrideApprovedBy?: string;
  conflictNote?: string;
  conflictsWith?: string[];
  supersedes?: string[];
  exclusiveClaimScope?: boolean;
}

export interface ContentEvidenceRecord {
  recordId: string;
  recordType: ContentEvidenceRecordType;
  /** Caller input retained for migration compatibility, but ignored for enforcement. */
  lifecycle?: 'new' | 'edited' | 'legacy_edited' | 'legacy_untouched';
  materialClaim?: Record<string, unknown>;
  sourceRecordIds: string[];
  active: boolean;
  powersQuickAnswer?: boolean;
}

export interface EvidenceRecordPolicy {
  readonly riskClass: RiskClass;
  readonly reviewIntervalDays: number;
  readonly alwaysStrict: boolean;
  readonly requiresEffectiveFrom: boolean;
  readonly requiresExpiry: boolean;
  readonly minimumConfidence: Exclude<SourceConfidence, 'low'>;
}

const EVIDENCE_RECORD_POLICIES = Object.freeze({
  ussd_code: Object.freeze({ riskClass: 'ussd_code', reviewIntervalDays: 90, alwaysStrict: false, requiresEffectiveFrom: false, requiresExpiry: false, minimumConfidence: 'medium' }),
  price: Object.freeze({ riskClass: 'price', reviewIntervalDays: 30, alwaysStrict: true, requiresEffectiveFrom: false, requiresExpiry: false, minimumConfidence: 'medium' }),
  promotion: Object.freeze({ riskClass: 'promotion', reviewIntervalDays: 30, alwaysStrict: true, requiresEffectiveFrom: true, requiresExpiry: true, minimumConfidence: 'medium' }),
  device_step: Object.freeze({ riskClass: 'device_steps', reviewIntervalDays: 180, alwaysStrict: false, requiresEffectiveFrom: false, requiresExpiry: false, minimumConfidence: 'medium' }),
  evergreen_fact: Object.freeze({ riskClass: 'evergreen', reviewIntervalDays: 365, alwaysStrict: false, requiresEffectiveFrom: false, requiresExpiry: false, minimumConfidence: 'medium' })
} satisfies Record<EvidenceRecordKind, EvidenceRecordPolicy>);

const EVIDENCE_KIND_BY_RISK_CLASS = Object.freeze({
  promotion: 'promotion',
  price: 'price',
  ussd_code: 'ussd_code',
  device_steps: 'device_step',
  evergreen: 'evergreen_fact'
} satisfies Record<RiskClass, EvidenceRecordKind>);

/** Compatibility view only; enforcement reads the private canonical policy table. */
export const REVIEW_INTERVAL_DAYS: Readonly<Record<RiskClass, number>> = Object.freeze({
  promotion: EVIDENCE_RECORD_POLICIES.promotion.reviewIntervalDays,
  price: EVIDENCE_RECORD_POLICIES.price.reviewIntervalDays,
  ussd_code: EVIDENCE_RECORD_POLICIES.ussd_code.reviewIntervalDays,
  device_steps: EVIDENCE_RECORD_POLICIES.device_step.reviewIntervalDays,
  evergreen: EVIDENCE_RECORD_POLICIES.evergreen_fact.reviewIntervalDays
});

export function getEvidenceRecordPolicy(kind: unknown): Readonly<EvidenceRecordPolicy> | null {
  return isAllowed(EVIDENCE_RECORD_KINDS, kind) ? EVIDENCE_RECORD_POLICIES[kind] : null;
}

export interface EvidenceSubjectCollections {
  readonly ussd_code?: readonly string[];
  readonly price?: readonly string[];
  readonly promotion?: readonly string[];
  readonly device_step?: readonly string[];
  readonly evergreen_fact?: readonly string[];
}

export interface EvidenceSubjectRegistration {
  readonly subjectKind: EvidenceSubjectKind;
}

export type EvidenceSubjectRegistry = Readonly<Record<string, EvidenceSubjectRegistration>>;

const trustedEvidenceSubjectRegistries = new WeakSet<object>();

/**
 * Creates the evidence-subject authority outside evidence records. Collection adapters
 * provide record IDs under a fixed collection key; records cannot choose their own kind.
 */
export function createEvidenceSubjectRegistry(collections: EvidenceSubjectCollections): EvidenceSubjectRegistry {
  if (!collections || typeof collections !== 'object' || Array.isArray(collections)) {
    throw new TypeError('Evidence subject collections must be an object.');
  }

  const suppliedKinds = Object.keys(collections);
  for (const suppliedKind of suppliedKinds) {
    if (!isAllowed(EVIDENCE_RECORD_KINDS, suppliedKind)) {
      throw new TypeError(`Unknown evidence subject collection: ${suppliedKind}`);
    }
  }

  const registry: Record<string, EvidenceSubjectRegistration> = Object.create(null) as Record<string, EvidenceSubjectRegistration>;
  for (const subjectKind of EVIDENCE_RECORD_KINDS) {
    const recordIds = collections[subjectKind];
    if (recordIds === undefined) continue;
    if (!Array.isArray(recordIds)) {
      throw new TypeError(`Evidence subject collection ${subjectKind} must be an array.`);
    }
    for (const recordId of recordIds) {
      if (!isStableAnalyticsId(recordId)) {
        throw new TypeError(`Invalid evidence subject ID: ${String(recordId)}`);
      }
      if (Object.hasOwn(registry, recordId)) {
        throw new TypeError(`Evidence subject ID is registered more than once: ${recordId}`);
      }
      registry[recordId] = Object.freeze({ subjectKind });
    }
  }

  const frozen = Object.freeze(registry);
  trustedEvidenceSubjectRegistries.add(frozen);
  return frozen;
}

const RECORD_TYPE_ALWAYS_STRICT: Readonly<Record<ContentEvidenceRecordType, boolean>> = {
  ussd_code: false,
  quick_answer: true,
  operator: false,
  content: false
};

export interface ValidationIssue {
  severity: 'error' | 'warning';
  code: string;
  recordId: string;
  message: string;
}

export interface SourceEligibility {
  eligible: boolean;
  reasonCodes: string[];
  reviewDueAt: string | null;
  dependencyFailures: SourceDependencyFailure[];
}

export interface SourceDependencyFailure {
  sourceId: string;
  path: string[];
  reasonCodes: string[];
}

export interface ValidationResult {
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  editorialBackfillIds: string[];
  eligibleRecordIds: string[];
  excludedRecordIds: string[];
  lifecycleByRecordId: Record<string, RecordLifecycle>;
  lifecycleCounts: Record<RecordLifecycle, number>;
  dependencyChains: Record<string, string[][]>;
}

const DAY_MS = 86_400_000;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SHA256_PATTERN = /^[a-f0-9]{64}$/;

export function parseDateOnly(value: string): number | null {
  if (!ISO_DATE_PATTERN.test(value)) return null;
  const parsed = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10) === value ? parsed : null;
}

function addDays(value: string, days: number): string {
  const parsed = parseDateOnly(value);
  if (parsed === null) throw new Error(`Invalid ISO date: ${value}`);
  return new Date(parsed + days * DAY_MS).toISOString().slice(0, 10);
}

export function isStableAnalyticsId(value: string): boolean {
  return STABLE_ID_PATTERN.test(value) && value.length <= 100;
}

export function deriveReviewDueAt(checkedAt: string, riskClass: RiskClass): string {
  const subjectKind = EVIDENCE_KIND_BY_RISK_CLASS[riskClass];
  const policy = subjectKind ? EVIDENCE_RECORD_POLICIES[subjectKind] : null;
  if (!policy) throw new Error(`Invalid risk class: ${String(riskClass)}`);
  return addDays(checkedAt, policy.reviewIntervalDays);
}

export function getReviewDueAt(source: SourceRecord, riskClass: RiskClass): string {
  return source.reviewDueAt ?? deriveReviewDueAt(source.checkedAt, riskClass);
}

function isAllowed<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === 'string' && values.includes(value);
}

export function validateLegacyManifest(manifest: readonly LegacyManifestEntry[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const entry of manifest) {
    if (seen.has(entry.recordId)) {
      issues.push({ severity: 'error', code: 'duplicate_manifest_id', recordId: entry.recordId, message: 'Frozen legacy manifest IDs must be unique.' });
    }
    if (!isStableAnalyticsId(entry.recordId)) {
      issues.push({ severity: 'error', code: 'invalid_manifest_id', recordId: entry.recordId, message: 'Frozen legacy manifest ID is invalid.' });
    }
    if (!SHA256_PATTERN.test(entry.materialFingerprint)) {
      issues.push({ severity: 'error', code: 'invalid_manifest_fingerprint', recordId: entry.recordId, message: 'Frozen legacy fingerprint must be a lowercase SHA-256 digest.' });
    }
    if (!entry.baselineCommit || !entry.migrationVersion) {
      issues.push({ severity: 'error', code: 'invalid_manifest_provenance', recordId: entry.recordId, message: 'Frozen legacy entries require baseline and migration provenance.' });
    }
    seen.add(entry.recordId);
  }
  return issues;
}

export function classifyContentLifecycle(
  record: ContentEvidenceRecord,
  manifest: readonly LegacyManifestEntry[] = WP1_LEGACY_MANIFEST
): RecordLifecycle {
  const baseline = manifest.find((entry) => entry.recordId === record.recordId && entry.recordType === record.recordType);
  if (!baseline) return 'new';
  const fingerprint = fingerprintMaterialClaim(record.materialClaim ?? {});
  return fingerprint === baseline.materialFingerprint ? 'legacy_untouched' : 'legacy_edited';
}

function validateUniqueIds(records: Array<{ recordId: string }>, issues: ValidationIssue[]): void {
  const seen = new Set<string>();
  for (const record of records) {
    if (!isStableAnalyticsId(record.recordId)) {
      issues.push({ severity: 'error', code: 'invalid_stable_id', recordId: record.recordId, message: 'ID is not analytics-safe.' });
    }
    if (seen.has(record.recordId)) {
      issues.push({ severity: 'error', code: 'duplicate_stable_id', recordId: record.recordId, message: 'Stable IDs must be unique.' });
    }
    seen.add(record.recordId);
  }
}

function validateSourceRecord(source: SourceRecord, asOf: string, issues: ValidationIssue[]): void {
  let sourceUrl: URL | null = null;
  try {
    sourceUrl = new URL(source.sourceUrl);
  } catch {
    // Reported below.
  }
  if (!sourceUrl || sourceUrl.protocol !== 'https:') {
    issues.push({ severity: 'error', code: 'invalid_source_url', recordId: source.recordId, message: 'Source URL must be an absolute HTTPS URL.' });
  }
  if (!isAllowed(SOURCE_TYPES, source.sourceType)) {
    issues.push({ severity: 'error', code: 'invalid_source_type', recordId: source.recordId, message: 'Source type is not approved.' });
  }
  if (!isAllowed(VERIFICATION_METHODS, source.verificationMethod)) {
    issues.push({ severity: 'error', code: 'invalid_verification_method', recordId: source.recordId, message: 'Verification method is not approved.' });
  }
  if (!isAllowed(SOURCE_STATUSES, source.status)) {
    issues.push({ severity: 'error', code: 'invalid_source_status', recordId: source.recordId, message: 'Source status is not approved.' });
  }
  if (!isAllowed(SOURCE_CONFIDENCE, source.confidence)) {
    issues.push({ severity: 'error', code: 'invalid_source_confidence', recordId: source.recordId, message: 'Source confidence is not approved.' });
  }
  if (!source.claimScope.trim()) {
    issues.push({ severity: 'error', code: 'missing_claim_scope', recordId: source.recordId, message: 'Claim scope is required.' });
  }

  const checkedAt = parseDateOnly(source.checkedAt);
  const asOfDate = parseDateOnly(asOf);
  if (checkedAt === null || asOfDate === null) {
    issues.push({ severity: 'error', code: 'invalid_date', recordId: source.recordId, message: 'checkedAt and asOf must be real YYYY-MM-DD dates.' });
  } else if (checkedAt > asOfDate) {
    issues.push({ severity: 'error', code: 'future_checked_at', recordId: source.recordId, message: 'checkedAt cannot be in the future.' });
  }

  const effectiveFrom = source.effectiveFrom ? parseDateOnly(source.effectiveFrom) : null;
  const expiresAt = source.expiresAt ? parseDateOnly(source.expiresAt) : null;
  if (source.effectiveFrom && effectiveFrom === null) {
    issues.push({ severity: 'error', code: 'invalid_effective_from', recordId: source.recordId, message: 'effectiveFrom must be a real YYYY-MM-DD date.' });
  }
  if (source.expiresAt && expiresAt === null) {
    issues.push({ severity: 'error', code: 'invalid_expires_at', recordId: source.recordId, message: 'expiresAt must be a real YYYY-MM-DD date.' });
  }
  if (effectiveFrom !== null && expiresAt !== null && effectiveFrom > expiresAt) {
    issues.push({ severity: 'error', code: 'invalid_effective_range', recordId: source.recordId, message: 'effectiveFrom cannot be after expiresAt.' });
  }
  if (source.status === 'expired' && asOfDate !== null && (expiresAt === null || expiresAt >= asOfDate)) {
    issues.push({ severity: 'error', code: 'expired_status_window_mismatch', recordId: source.recordId, message: 'Expired status must agree with an elapsed expiry date.' });
  }
  if (source.lastContentChangeAt && parseDateOnly(source.lastContentChangeAt) === null) {
    issues.push({ severity: 'error', code: 'invalid_content_change_date', recordId: source.recordId, message: 'lastContentChangeAt must be a real YYYY-MM-DD date.' });
  }

  if (source.reviewDueAt) {
    const override = parseDateOnly(source.reviewDueAt);
    const reason = source.reviewDueOverrideReason?.trim();
    const approver = source.reviewDueOverrideApprovedBy?.trim();
    if (override === null) {
      issues.push({ severity: 'error', code: 'invalid_review_due_override', recordId: source.recordId, message: 'reviewDueAt override must be a real YYYY-MM-DD date.' });
    }
    if (!reason || !approver) {
      issues.push({ severity: 'error', code: 'unjustified_review_due_override', recordId: source.recordId, message: 'Review-due overrides need a reason and approver.' });
    }
    if (approver && !isAllowed(REVIEW_OVERRIDE_APPROVERS, approver)) {
      issues.push({ severity: 'error', code: 'invalid_review_due_approver', recordId: source.recordId, message: 'Review-due override approver is not allowlisted.' });
    }
    if (override !== null && checkedAt !== null && override < checkedAt) {
      issues.push({ severity: 'error', code: 'review_due_before_checked', recordId: source.recordId, message: 'Review-due override cannot precede checkedAt.' });
    }
    if (override !== null && expiresAt !== null && override > expiresAt) {
      issues.push({ severity: 'error', code: 'review_due_after_expiry', recordId: source.recordId, message: 'Review-due override cannot extend past expiry.' });
    }
    if (override !== null && checkedAt !== null) {
      const conservativeDerived = parseDateOnly(deriveReviewDueAt(source.checkedAt, CONSERVATIVE_OVERRIDE_RISK_CLASS));
      if (conservativeDerived !== null && override > conservativeDerived) {
        issues.push({
          severity: 'error',
          code: 'review_due_extension_not_permitted',
          recordId: source.recordId,
          message: 'Unscoped review-due overrides cannot exceed the shortest approved review interval.'
        });
      }
    }
  } else if (source.reviewDueOverrideReason || source.reviewDueOverrideApprovedBy) {
    issues.push({ severity: 'error', code: 'orphan_review_due_justification', recordId: source.recordId, message: 'Override justification requires reviewDueAt.' });
  }
}

function evaluateDirectSourceEligibility(
  source: SourceRecord,
  policy: Readonly<EvidenceRecordPolicy>,
  asOf: string,
  strict: boolean
): SourceEligibility {
  const reasonCodes: string[] = [];
  const asOfDate = parseDateOnly(asOf);
  const checkedAt = parseDateOnly(source.checkedAt);
  const effectiveFrom = source.effectiveFrom ? parseDateOnly(source.effectiveFrom) : null;
  const expiresAt = source.expiresAt ? parseDateOnly(source.expiresAt) : null;
  let reviewDueAt: string | null = null;

  try {
    reviewDueAt = source.reviewDueAt ?? addDays(source.checkedAt, policy.reviewIntervalDays);
  } catch {
    reasonCodes.push('invalid_date');
  }

  if (asOfDate === null || checkedAt === null) reasonCodes.push('invalid_date');
  else if (checkedAt > asOfDate) reasonCodes.push('future_checked_at');

  if (source.effectiveFrom && effectiveFrom === null) reasonCodes.push('invalid_effective_from');
  if (source.expiresAt && expiresAt === null) reasonCodes.push('invalid_expires_at');
  if (effectiveFrom !== null && asOfDate !== null && effectiveFrom > asOfDate) reasonCodes.push('source_not_yet_effective');
  if (expiresAt !== null && asOfDate !== null && expiresAt < asOfDate) reasonCodes.push('source_expired');

  if (policy.requiresEffectiveFrom && !source.effectiveFrom) reasonCodes.push('promotion_effective_from_required');
  if (policy.requiresExpiry && !source.expiresAt) reasonCodes.push('promotion_expiry_required');

  if (source.status !== 'verified') reasonCodes.push('strict_source_not_publishable');
  const confidenceRank: Readonly<Record<SourceConfidence, number>> = { low: 0, medium: 1, high: 2 };
  if (confidenceRank[source.confidence] < confidenceRank[policy.minimumConfidence]) reasonCodes.push('strict_source_not_publishable');

  if (reviewDueAt && parseDateOnly(reviewDueAt) !== null && asOfDate !== null && parseDateOnly(reviewDueAt)! < asOfDate) {
    reasonCodes.push('source_review_overdue');
  }

  if (source.reviewDueAt && checkedAt !== null) {
    const derived = parseDateOnly(addDays(source.checkedAt, policy.reviewIntervalDays));
    const override = parseDateOnly(source.reviewDueAt);
    if (override !== null && derived !== null && override > derived) reasonCodes.push('review_due_extension_not_permitted');
  }

  const uniqueReasons = [...new Set(reasonCodes)];
  const blocking = strict
    ? uniqueReasons
    : uniqueReasons.filter((code) => ['invalid_date', 'future_checked_at', 'source_not_yet_effective', 'source_expired', 'promotion_effective_from_required', 'promotion_expiry_required'].includes(code));

  return { eligible: blocking.length === 0, reasonCodes: uniqueReasons, reviewDueAt, dependencyFailures: [] };
}

function evaluateSourceDependencyTree(
  source: SourceRecord,
  byId: ReadonlyMap<string, SourceRecord>,
  policy: EvidenceRecordPolicy,
  asOf: string,
  strict: boolean,
  parentPath: readonly string[] = []
): SourceEligibility {
  const direct = evaluateDirectSourceEligibility(source, policy, asOf, strict);
  const currentPath = [...parentPath, source.recordId];
  const dependencyFailures: SourceDependencyFailure[] = [];

  if (source.verificationMethod === 'derived') {
    const dependencyIds = source.derivedFromSourceIds ?? [];
    if (dependencyIds.length === 0) {
      dependencyFailures.push({
        sourceId: source.recordId,
        path: currentPath,
        reasonCodes: ['derived_dependency_required']
      });
    }

    for (const dependencyId of dependencyIds) {
      if (currentPath.includes(dependencyId)) {
        dependencyFailures.push({
          sourceId: dependencyId,
          path: [...currentPath, dependencyId],
          reasonCodes: ['reference_cycle']
        });
        continue;
      }

      const dependency = byId.get(dependencyId);
      if (!dependency) {
        dependencyFailures.push({
          sourceId: dependencyId,
          path: [...currentPath, dependencyId],
          reasonCodes: ['missing_derived_dependency']
        });
        continue;
      }

      const dependencyResult = evaluateSourceDependencyTree(
        dependency,
        byId,
        policy,
        asOf,
        true,
        currentPath
      );
      if (dependencyResult.reasonCodes.length > 0) {
        dependencyFailures.push({
          sourceId: dependency.recordId,
          path: [...currentPath, dependency.recordId],
          reasonCodes: dependencyResult.reasonCodes
        });
      }
      dependencyFailures.push(...dependencyResult.dependencyFailures);
    }
  }

  const uniqueFailures = [...new Map(dependencyFailures.map((failure) => [
    `${failure.path.join('>')}|${failure.reasonCodes.join(',')}`,
    failure
  ])).values()];
  return {
    ...direct,
    eligible: direct.eligible && uniqueFailures.length === 0,
    dependencyFailures: uniqueFailures
  };
}

export function evaluateSourceEligibility(
  source: SourceRecord,
  recordKind: EvidenceRecordKind,
  asOf: string,
  allSources: readonly SourceRecord[] = [source]
): SourceEligibility {
  const policy = getEvidenceRecordPolicy(recordKind);
  if (!policy) {
    return {
      eligible: false,
      reasonCodes: ['invalid_record_kind'],
      reviewDueAt: null,
      dependencyFailures: []
    };
  }
  const byId = new Map(allSources.map((candidate) => [candidate.recordId, candidate]));
  return evaluateSourceDependencyTree(source, byId, policy, asOf, policy.alwaysStrict);
}

/** Safe selection primitive: direct and transitive evidence must all be eligible. */
export function selectEligibleSources(
  sources: readonly SourceRecord[],
  recordKind: EvidenceRecordKind,
  asOf: string
): SourceRecord[] {
  return sources.filter((source) => evaluateSourceEligibility(source, recordKind, asOf, sources).eligible);
}

function validateReferenceGraph(
  records: readonly SourceRecord[],
  field: 'supersedes' | 'conflictsWith' | 'derivedFromSourceIds',
  issues: ValidationIssue[]
): void {
  const byId = new Map(records.map((record) => [record.recordId, record]));
  const adjacency = new Map<string, string[]>();

  for (const record of records) {
    const refs = record[field] ?? [];
    const seen = new Set<string>();
    for (const ref of refs) {
      if (seen.has(ref)) {
        issues.push({ severity: 'error', code: 'duplicate_reference', recordId: record.recordId, message: `Duplicate ${field} reference: ${ref}` });
      }
      if (ref === record.recordId) {
        issues.push({ severity: 'error', code: 'self_reference', recordId: record.recordId, message: `${field} cannot reference itself.` });
      }
      if (!byId.has(ref)) {
        const code = field === 'supersedes' ? 'missing_superseded_source' : field === 'derivedFromSourceIds' ? 'missing_derived_dependency' : 'missing_conflict_source';
        issues.push({ severity: 'error', code, recordId: record.recordId, message: `Unknown ${field} reference: ${ref}` });
      }
      seen.add(ref);
    }
    adjacency.set(record.recordId, refs.filter((ref) => byId.has(ref) && ref !== record.recordId));
  }

  const visited = new Set<string>();
  const active = new Set<string>();
  const path: string[] = [];
  const walk = (id: string): void => {
    if (active.has(id)) {
      const cycleStart = path.indexOf(id);
      const cycle = [...path.slice(cycleStart), id];
      issues.push({ severity: 'error', code: 'reference_cycle', recordId: id, message: `${field} cycle: ${cycle.join(' -> ')}` });
      return;
    }
    if (visited.has(id)) return;
    active.add(id);
    path.push(id);
    for (const next of adjacency.get(id) ?? []) walk(next);
    path.pop();
    active.delete(id);
    visited.add(id);
  };
  for (const id of adjacency.keys()) walk(id);
}

function dependencyChains(sourceId: string, byId: ReadonlyMap<string, SourceRecord>, trail: string[] = []): string[][] {
  if (trail.includes(sourceId)) return [[...trail, sourceId]];
  const source = byId.get(sourceId);
  const dependencies = source?.derivedFromSourceIds ?? [];
  if (dependencies.length === 0) return [[...trail, sourceId]];
  return dependencies.flatMap((dependency) => dependencyChains(dependency, byId, [...trail, sourceId]));
}

function resolveContentRecordPolicy(
  record: ContentEvidenceRecord,
  evidenceSubjects: EvidenceSubjectRegistry,
  registryTrusted: boolean,
  issues: ValidationIssue[]
): { subjectKind: EvidenceSubjectKind; policy: Readonly<EvidenceRecordPolicy>; valid: boolean } {
  let valid = true;

  for (const forbiddenKey of ['subjectKind', 'recordKind', 'riskClass'] as const) {
    if (Object.hasOwn(record as object, forbiddenKey)) {
      issues.push({
        severity: 'error',
        code: 'caller_evidence_policy_forbidden',
        recordId: record.recordId,
        message: `${forbiddenKey} is not accepted on evidence records; the collection-owned subject registry is authoritative.`
      });
      valid = false;
    }
  }

  const registration = registryTrusted ? evidenceSubjects[record.recordId] : undefined;
  const policy = getEvidenceRecordPolicy(registration?.subjectKind);
  if (!registration || !policy) {
    issues.push({
      severity: 'error',
      code: 'missing_evidence_subject',
      recordId: record.recordId,
      message: 'Record is not registered by a trusted collection-owned evidence-subject registry.'
    });
    return { subjectKind: 'promotion', policy: EVIDENCE_RECORD_POLICIES.promotion, valid: false };
  }

  const compatibleRecordType =
    (record.recordType !== 'ussd_code' || registration.subjectKind === 'ussd_code') &&
    (record.recordType !== 'operator' || registration.subjectKind === 'evergreen_fact');
  if (!compatibleRecordType) {
    issues.push({
      severity: 'error',
      code: 'incompatible_record_kind',
      recordId: record.recordId,
      message: `Record type ${record.recordType} cannot use evidence kind ${registration.subjectKind}.`
    });
    valid = false;
  }

  return {
    subjectKind: registration.subjectKind,
    policy: {
      ...policy,
      alwaysStrict: policy.alwaysStrict || RECORD_TYPE_ALWAYS_STRICT[record.recordType]
    },
    valid
  };
}

export function validateReleaseAData(
  sourceRecords: SourceRecord[],
  contentRecords: ContentEvidenceRecord[],
  options: { asOf: string; evidenceSubjects: EvidenceSubjectRegistry; legacyManifest?: readonly LegacyManifestEntry[]; requireCompleteLegacyManifest?: boolean }
): ValidationResult {
  const issues: ValidationIssue[] = [];
  const manifest = options.legacyManifest ?? WP1_LEGACY_MANIFEST;
  issues.push(...validateLegacyManifest(manifest));
  validateUniqueIds([...sourceRecords, ...contentRecords], issues);
  sourceRecords.forEach((source) => validateSourceRecord(source, options.asOf, issues));

  validateReferenceGraph(sourceRecords, 'supersedes', issues);
  validateReferenceGraph(sourceRecords, 'conflictsWith', issues);
  validateReferenceGraph(sourceRecords, 'derivedFromSourceIds', issues);

  const sourcesById = new Map(sourceRecords.map((source) => [source.recordId, source]));
  const excluded = new Set<string>();
  const backfill = new Set<string>();
  const lifecycleByRecordId: Record<string, RecordLifecycle> = {};
  const lifecycleCounts: Record<RecordLifecycle, number> = { new: 0, legacy_edited: 0, legacy_untouched: 0 };
  const auditChains: Record<string, string[][]> = {};
  const registryTrusted = Boolean(options.evidenceSubjects && trustedEvidenceSubjectRegistries.has(options.evidenceSubjects as object));
  if (!registryTrusted) {
    issues.push({
      severity: 'error',
      code: 'invalid_evidence_subject_registry',
      recordId: 'evidence.subjects',
      message: 'Evidence subjects must come from the canonical registry factory.'
    });
  }

  if (options.requireCompleteLegacyManifest) {
    const contentIds = new Set(contentRecords.map((record) => record.recordId));
    for (const entry of manifest) {
      if (!contentIds.has(entry.recordId)) {
        issues.push({ severity: 'error', code: 'missing_legacy_record', recordId: entry.recordId, message: 'Frozen legacy record is missing; renames must be reviewed as removal plus a strict new record.' });
      }
    }
  }

  for (const source of sourceRecords) {
    if (source.verificationMethod === 'derived' && (source.derivedFromSourceIds?.length ?? 0) === 0) {
      issues.push({ severity: 'error', code: 'derived_dependency_required', recordId: source.recordId, message: 'Derived evidence requires at least one source dependency.' });
    }
    if (source.exclusiveClaimScope && source.status === 'verified') {
      const conflicts = sourceRecords.filter((candidate) =>
        candidate.recordId !== source.recordId &&
        candidate.exclusiveClaimScope &&
        candidate.status === 'verified' &&
        candidate.claimScope === source.claimScope &&
        evaluateSourceDependencyTree(candidate, sourcesById, EVIDENCE_RECORD_POLICIES.evergreen_fact, options.asOf, true).eligible
      );
      if (conflicts.length > 0) {
        issues.push({ severity: 'error', code: 'exclusive_claim_scope_conflict', recordId: source.recordId, message: `Active exclusive claim scope also owned by: ${conflicts.map((item) => item.recordId).join(', ')}` });
      }
    }
  }

  for (const record of contentRecords) {
    const lifecycle = classifyContentLifecycle(record, manifest);
    lifecycleByRecordId[record.recordId] = lifecycle;
    lifecycleCounts[lifecycle] += 1;

    const resolvedPolicy = resolveContentRecordPolicy(record, options.evidenceSubjects, registryTrusted, issues);
    const recordPolicy = resolvedPolicy.policy;
    if (!resolvedPolicy.valid) excluded.add(record.recordId);
    const strict =
      lifecycle === 'new' ||
      lifecycle === 'legacy_edited' ||
      record.powersQuickAnswer === true ||
      recordPolicy.alwaysStrict;
    const referencedSources = record.sourceRecordIds
      .map((sourceId) => sourcesById.get(sourceId))
      .filter((source): source is SourceRecord => Boolean(source));

    for (const sourceId of record.sourceRecordIds) {
      if (!sourcesById.has(sourceId)) {
        issues.push({ severity: 'error', code: 'missing_source_reference', recordId: record.recordId, message: `Unknown source record: ${sourceId}` });
        excluded.add(record.recordId);
      }
    }

    if (lifecycle === 'legacy_untouched' && referencedSources.length === 0 && !strict) {
      issues.push({ severity: 'warning', code: 'legacy_evidence_backfill', recordId: record.recordId, message: 'Untouched frozen-baseline record needs editorial source backfill.' });
      backfill.add(record.recordId);
      continue;
    }

    if (strict && referencedSources.length === 0) {
      issues.push({ severity: 'error', code: 'strict_evidence_required', recordId: record.recordId, message: 'New, edited, or quick-answer records require source evidence.' });
      excluded.add(record.recordId);
      continue;
    }

    for (const source of referencedSources) {
      const eligibility = evaluateSourceDependencyTree(source, sourcesById, recordPolicy, options.asOf, strict);

      for (const code of eligibility.reasonCodes) {
        const strictOnly = ['strict_source_not_publishable', 'source_review_overdue', 'review_due_extension_not_permitted'].includes(code);
        const severity: ValidationIssue['severity'] = strict || !strictOnly ? 'error' : 'warning';
        issues.push({
          severity,
          code,
          recordId: record.recordId,
          message: `Source ${source.recordId} failed ${code} under ${DATE_ONLY_TIMEZONE} date-only rules.`
        });
        if (severity === 'error') excluded.add(record.recordId);
      }

      if (record.active && resolvedPolicy.subjectKind === 'promotion' && eligibility.reasonCodes.includes('source_expired')) {
        issues.push({ severity: 'error', code: 'expired_active_promotion', recordId: record.recordId, message: 'Expired promotion cannot remain eligible for active display.' });
        excluded.add(record.recordId);
      }

      if (source.verificationMethod === 'derived') {
        auditChains[source.recordId] = dependencyChains(source.recordId, sourcesById);
        for (const failure of eligibility.dependencyFailures) {
          issues.push({
            severity: 'error',
            code: 'ineligible_derived_dependency',
            recordId: record.recordId,
            message: `Derived dependency path ${failure.path.join(' -> ')} is not eligible: ${failure.reasonCodes.join(', ')}`
          });
          excluded.add(record.recordId);
        }
      }
    }
  }

  const errors = issues.filter((issue) => issue.severity === 'error');
  const warnings = issues.filter((issue) => issue.severity === 'warning');
  const eligibleRecordIds = contentRecords.map((record) => record.recordId).filter((id) => !excluded.has(id));

  return {
    errors,
    warnings,
    editorialBackfillIds: [...backfill].sort(),
    eligibleRecordIds,
    excludedRecordIds: [...excluded].sort(),
    lifecycleByRecordId,
    lifecycleCounts,
    dependencyChains: auditChains
  };
}
