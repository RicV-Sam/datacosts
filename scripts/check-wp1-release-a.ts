import { ussdRepository } from '../src/data/ussd';
import { wp1ContentRecords, wp1SourceRecords } from '../src/data/wp1ReleaseARecords';
import { CNI_URL_COHORT, GSC_QUERY_OWNER_COHORT, WP1_BASELINE } from '../src/seo/wp1Measurement';
import { WP1_FUTURE_QUICK_ANSWERS } from '../src/seo/wp1QuickAnswerDefinitions';
import { isStableAnalyticsId, validateReleaseAData } from '../src/seo/wp1SourceFreshness';

const result = validateReleaseAData(wp1SourceRecords, wp1ContentRecords, { asOf: WP1_BASELINE.baselineAsOf });
const allIds = [
  ...ussdRepository.map((record) => record.id),
  ...wp1SourceRecords.map((record) => record.recordId),
  ...wp1ContentRecords.filter((record) => record.recordType !== 'ussd_code').map((record) => record.recordId),
  ...WP1_FUTURE_QUICK_ANSWERS.map((record) => record.answerId)
];

const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
const unsafeIds = allIds.filter((id) => !isStableAnalyticsId(id));

if (result.errors.length > 0 || duplicateIds.length > 0 || unsafeIds.length > 0) {
  console.error(JSON.stringify({ errors: result.errors, duplicateIds, unsafeIds }, null, 2));
  process.exit(1);
}

if (CNI_URL_COHORT.length !== 20) throw new Error('AN-06 CNI cohort must contain exactly 20 URLs.');
if (GSC_QUERY_OWNER_COHORT.filter((row) => row.treatment === 'untreated').length !== 3) {
  throw new Error('AN-05 must retain the three approved untreated comparison rows.');
}
if (WP1_BASELINE.gsc.queryCoveragePercent !== 50.84) throw new Error('GSC query coverage baseline changed.');

console.log(`WP1 Release A validation passed: ${allIds.length} stable IDs, ${result.warnings.length} compatibility warnings, ${result.editorialBackfillIds.length} legacy backfill records.`);

