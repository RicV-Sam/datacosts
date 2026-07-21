import { ussdRepository } from './ussd';
import { verifiedPromos } from './promos';
import { fixPages } from './fixes';
import { problemGuides } from './problemGuides';
import { bundles } from '../data';
import type { EvidenceSubjectKind, EvidenceSubjectRegistry } from '../seo/wp1SourceFreshness';

const OPERATOR_RECORD_IDS = ['operator.mtn', 'operator.vodacom', 'operator.cellc', 'operator.telkom', 'operator.rain'] as const;

const registry: Record<string, Readonly<{ subjectKind: EvidenceSubjectKind }>> = Object.create(null) as Record<
  string,
  Readonly<{ subjectKind: EvidenceSubjectKind }>
>;
const STABLE_SUBJECT_ID = /^[a-z][a-z0-9]*(?:[._:-][a-z0-9]+)*$/;

function register(recordId: string, subjectKind: EvidenceSubjectKind): void {
  if (!STABLE_SUBJECT_ID.test(recordId) || recordId.length > 100) throw new Error(`Invalid canonical evidence subject: ${recordId}`);
  if (Object.hasOwn(registry, recordId)) throw new Error(`Duplicate canonical evidence subject: ${recordId}`);
  registry[recordId] = Object.freeze({ subjectKind });
}

for (const record of ussdRepository) register(record.id, 'ussd_code');
for (const record of bundles) register(`price.${record.slug}`, 'price');
for (const record of verifiedPromos) register(`promotion.${record.id}`, 'promotion');
for (const record of fixPages) register(`device_step.${record.id}`, 'device_step');
for (const record of Object.values(problemGuides)) register(`evergreen_fact.${record.slug}`, 'evergreen_fact');
for (const recordId of OPERATOR_RECORD_IDS) register(recordId, 'evergreen_fact');

/**
 * Frozen production authority derived from the owning USSD, price, promotion,
 * device-step, evergreen-guide and operator collections.
 * There is intentionally no exported constructor for trusted semantic bindings.
 */
export const WP1_EVIDENCE_SUBJECTS: EvidenceSubjectRegistry = Object.freeze(registry);

export function resolveWp1EvidenceSubjectKind(recordId: unknown): EvidenceSubjectKind | null {
  if (typeof recordId !== 'string') return null;
  return WP1_EVIDENCE_SUBJECTS[recordId]?.subjectKind ?? null;
}
