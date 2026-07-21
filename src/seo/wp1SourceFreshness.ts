export const STABLE_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._:-][a-z0-9]+)*$/;

export const SOURCE_TYPES = ['operator', 'regulator', 'device_vendor', 'editorial'] as const;
export const VERIFICATION_METHODS = ['operator_page', 'app_check', 'ussd_test', 'support_confirmation', 'derived'] as const;
export const SOURCE_STATUSES = ['verified', 'needs_review', 'expired'] as const;
export const SOURCE_CONFIDENCE = ['high', 'medium', 'low'] as const;
export const RISK_CLASSES = ['promotion', 'price', 'ussd_code', 'device_steps', 'evergreen'] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];
export type VerificationMethod = (typeof VERIFICATION_METHODS)[number];
export type SourceStatus = (typeof SOURCE_STATUSES)[number];
export type SourceConfidence = (typeof SOURCE_CONFIDENCE)[number];
export type RiskClass = (typeof RISK_CLASSES)[number];
export type RecordLifecycle = 'new' | 'edited' | 'legacy_untouched';

export const REVIEW_INTERVAL_DAYS: Readonly<Record<RiskClass, number>> = {
  promotion: 30,
  price: 30,
  ussd_code: 90,
  device_steps: 180,
  evergreen: 365
};

export interface SourceRecord {
  recordId: string;
  sourceUrl: string;
  sourceType: SourceType;
  checkedAt: string;
  effectiveFrom?: string;
  expiresAt?: string;
  verificationMethod: VerificationMethod;
  claimScope: string;
  status: SourceStatus;
  confidence: SourceConfidence;
  lastContentChangeAt?: string;
  reviewDueAt?: string;
  reviewDueOverrideReason?: string;
  reviewDueOverrideApprovedBy?: string;
  conflictNote?: string;
  supersedes?: string[];
}

export interface ContentEvidenceRecord {
  recordId: string;
  recordType: 'ussd_code' | 'quick_answer' | 'operator' | 'content';
  riskClass: RiskClass;
  lifecycle: RecordLifecycle;
  sourceRecordIds: string[];
  active: boolean;
  powersQuickAnswer?: boolean;
}

export interface ValidationIssue {
  severity: 'error' | 'warning';
  code: string;
  recordId: string;
  message: string;
}

export interface ValidationResult {
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  editorialBackfillIds: string[];
  eligibleRecordIds: string[];
  excludedRecordIds: string[];
}

const DAY_MS = 86_400_000;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseIsoDate(value: string): number | null {
  if (!ISO_DATE_PATTERN.test(value)) return null;
  const parsed = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10) === value ? parsed : null;
}

function addDays(value: string, days: number): string {
  const parsed = parseIsoDate(value);
  if (parsed === null) throw new Error(`Invalid ISO date: ${value}`);
  return new Date(parsed + days * DAY_MS).toISOString().slice(0, 10);
}

export function isStableAnalyticsId(value: string): boolean {
  return STABLE_ID_PATTERN.test(value) && value.length <= 100;
}

export function deriveReviewDueAt(checkedAt: string, riskClass: RiskClass): string {
  return addDays(checkedAt, REVIEW_INTERVAL_DAYS[riskClass]);
}

export function getReviewDueAt(source: SourceRecord, riskClass: RiskClass): string {
  return source.reviewDueAt ?? deriveReviewDueAt(source.checkedAt, riskClass);
}

function isAllowed<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === 'string' && values.includes(value);
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

  const checkedAt = parseIsoDate(source.checkedAt);
  const asOfDate = parseIsoDate(asOf);
  if (checkedAt === null || asOfDate === null) {
    issues.push({ severity: 'error', code: 'invalid_date', recordId: source.recordId, message: 'checkedAt and asOf must be real YYYY-MM-DD dates.' });
  } else if (checkedAt > asOfDate) {
    issues.push({ severity: 'error', code: 'future_checked_at', recordId: source.recordId, message: 'checkedAt cannot be in the future.' });
  }

  const effectiveFrom = source.effectiveFrom ? parseIsoDate(source.effectiveFrom) : null;
  const expiresAt = source.expiresAt ? parseIsoDate(source.expiresAt) : null;
  if (source.effectiveFrom && effectiveFrom === null) {
    issues.push({ severity: 'error', code: 'invalid_effective_from', recordId: source.recordId, message: 'effectiveFrom must be a real YYYY-MM-DD date.' });
  }
  if (source.expiresAt && expiresAt === null) {
    issues.push({ severity: 'error', code: 'invalid_expires_at', recordId: source.recordId, message: 'expiresAt must be a real YYYY-MM-DD date.' });
  }
  if (effectiveFrom !== null && expiresAt !== null && effectiveFrom > expiresAt) {
    issues.push({ severity: 'error', code: 'invalid_effective_range', recordId: source.recordId, message: 'effectiveFrom cannot be after expiresAt.' });
  }
  if (source.lastContentChangeAt && parseIsoDate(source.lastContentChangeAt) === null) {
    issues.push({ severity: 'error', code: 'invalid_content_change_date', recordId: source.recordId, message: 'lastContentChangeAt must be a real YYYY-MM-DD date.' });
  }
  if (source.reviewDueAt) {
    const override = parseIsoDate(source.reviewDueAt);
    if (override === null) {
      issues.push({ severity: 'error', code: 'invalid_review_due_override', recordId: source.recordId, message: 'reviewDueAt override must be a real YYYY-MM-DD date.' });
    }
    if (!source.reviewDueOverrideReason?.trim() || !source.reviewDueOverrideApprovedBy?.trim()) {
      issues.push({ severity: 'error', code: 'unjustified_review_due_override', recordId: source.recordId, message: 'Review-due overrides need a reason and approver.' });
    }
    if (override !== null && expiresAt !== null && override > expiresAt) {
      issues.push({ severity: 'error', code: 'review_due_after_expiry', recordId: source.recordId, message: 'Review-due override cannot silently extend past expiry.' });
    }
  } else if (source.reviewDueOverrideReason || source.reviewDueOverrideApprovedBy) {
    issues.push({ severity: 'error', code: 'orphan_review_due_justification', recordId: source.recordId, message: 'Override justification requires reviewDueAt.' });
  }
}

export function validateReleaseAData(
  sourceRecords: SourceRecord[],
  contentRecords: ContentEvidenceRecord[],
  options: { asOf: string }
): ValidationResult {
  const issues: ValidationIssue[] = [];
  validateUniqueIds([...sourceRecords, ...contentRecords], issues);
  sourceRecords.forEach((source) => validateSourceRecord(source, options.asOf, issues));

  const sourcesById = new Map(sourceRecords.map((source) => [source.recordId, source]));
  const asOf = parseIsoDate(options.asOf);
  const excluded = new Set<string>();
  const backfill = new Set<string>();

  for (const source of sourceRecords) {
    for (const supersededId of source.supersedes ?? []) {
      if (!sourcesById.has(supersededId)) {
        issues.push({ severity: 'error', code: 'missing_superseded_source', recordId: source.recordId, message: `Unknown superseded source: ${supersededId}` });
      }
    }
  }

  for (const record of contentRecords) {
    const highRisk = record.riskClass !== 'evergreen';
    const strict = record.powersQuickAnswer === true || (record.lifecycle !== 'legacy_untouched' && highRisk);
    const referencedSources = record.sourceRecordIds
      .map((sourceId) => sourcesById.get(sourceId))
      .filter((source): source is SourceRecord => Boolean(source));

    for (const sourceId of record.sourceRecordIds) {
      if (!sourcesById.has(sourceId)) {
        issues.push({ severity: 'error', code: 'missing_source_reference', recordId: record.recordId, message: `Unknown source record: ${sourceId}` });
        excluded.add(record.recordId);
      }
    }

    if (record.lifecycle === 'legacy_untouched' && referencedSources.length === 0) {
      issues.push({ severity: 'warning', code: 'legacy_evidence_backfill', recordId: record.recordId, message: 'Untouched legacy record needs editorial source backfill.' });
      backfill.add(record.recordId);
      continue;
    }

    if (strict && referencedSources.length === 0) {
      issues.push({ severity: 'error', code: 'strict_evidence_required', recordId: record.recordId, message: 'Strict records require source evidence.' });
      excluded.add(record.recordId);
      continue;
    }

    for (const source of referencedSources) {
      const reviewDue = parseIsoDate(getReviewDueAt(source, record.riskClass));
      const expired = source.expiresAt ? parseIsoDate(source.expiresAt) : null;
      const overdue = asOf !== null && reviewDue !== null && reviewDue < asOf;
      const activePromotionExpired = record.active && record.riskClass === 'promotion' && expired !== null && asOf !== null && expired < asOf;

      if (activePromotionExpired) {
        issues.push({ severity: 'error', code: 'expired_active_promotion', recordId: record.recordId, message: 'Expired promotion cannot remain eligible for active display.' });
        excluded.add(record.recordId);
      }

      if (strict && (source.status !== 'verified' || source.confidence === 'low')) {
        issues.push({ severity: 'error', code: 'strict_source_not_publishable', recordId: record.recordId, message: 'Strict records require verified, non-low-confidence evidence.' });
        excluded.add(record.recordId);
      }

      if (overdue) {
        const severity: ValidationIssue['severity'] = strict ? 'error' : 'warning';
        issues.push({ severity, code: 'source_review_overdue', recordId: record.recordId, message: `Source review was due ${getReviewDueAt(source, record.riskClass)}.` });
        if (strict) excluded.add(record.recordId);
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
    excludedRecordIds: [...excluded].sort()
  };
}

