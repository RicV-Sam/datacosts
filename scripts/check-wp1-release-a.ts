import { wp1ContentRecords, wp1EvidenceSubjects, wp1SourceRecords } from '../src/data/wp1ReleaseARecords';
import { CNI_URL_COHORT, GSC_QUERY_OWNER_COHORT, WP1_BASELINE, validateQueryClusterDefinitions } from '../src/seo/wp1Measurement';
import { isStableAnalyticsId, validateReleaseAData } from '../src/seo/wp1SourceFreshness';
import { collectWp1RegistryOccurrences, validateWp1AnalyticsRegistry } from '../src/seo/wp1AnalyticsRegistry';

const result = validateReleaseAData(wp1SourceRecords, wp1ContentRecords, {
  asOf: WP1_BASELINE.baselineAsOf,
  evidenceSubjects: wp1EvidenceSubjects,
  requireCompleteLegacyManifest: true
});
const registry = validateWp1AnalyticsRegistry();
const registryOccurrences = collectWp1RegistryOccurrences();
const allIds = [
  ...registryOccurrences.map((record) => record.id),
  ...wp1SourceRecords.map((record) => record.recordId),
  ...wp1ContentRecords.filter((record) => record.recordType !== 'ussd_code').map((record) => record.recordId)
];

const unsafeIds = allIds.filter((id) => !isStableAnalyticsId(id));

if (result.errors.length > 0 || registry.errors.length > 0 || unsafeIds.length > 0) {
  console.error(JSON.stringify({ errors: result.errors, registryErrors: registry.errors, unsafeIds }, null, 2));
  process.exit(1);
}

if (CNI_URL_COHORT.length !== 20) throw new Error('AN-06 CNI cohort must contain exactly 20 URLs.');
if (GSC_QUERY_OWNER_COHORT.filter((row) => row.treatment === 'untreated').length !== 3) {
  throw new Error('AN-05 must retain the three approved untreated comparison rows.');
}
if (WP1_BASELINE.gsc.queryCoveragePercent !== 50.84) throw new Error('GSC query coverage baseline changed.');
const queryDefinitionErrors = validateQueryClusterDefinitions();
if (queryDefinitionErrors.length > 0) throw new Error(`AN-05 query definitions failed: ${queryDefinitionErrors.join('; ')}`);

console.log(`WP1 Release A validation passed: ${allIds.length} stable-ID occurrences, ${new Set(allIds).size} unique stable IDs, ${registry.codeOccurrenceCount} code occurrences across ${registry.registries.length} registries, ${result.warnings.length} compatibility warnings, ${result.editorialBackfillIds.length} legacy backfill records.`);
