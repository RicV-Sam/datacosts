import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CNI_URL_COHORT,
  GSC_QUERY_OWNER_COHORT,
  WP1_BASELINE,
  assignGscQueryCluster,
  normaliseCanonicalPath,
  normalizeGscQuery,
  validateQueryClusterDefinitions,
  type QueryClusterDefinition
} from '../src/seo/wp1Measurement';

test('approved cohorts and query coverage remain frozen at v1.1', () => {
  assert.equal(WP1_BASELINE.queryClusterVersion, 'wp1-v1.1');
  assert.equal(WP1_BASELINE.gsc.queryCoveragePercent, 50.84);
  assert.equal(CNI_URL_COHORT.length, 20);
  assert.deepEqual(GSC_QUERY_OWNER_COHORT.filter((row) => row.treatment === 'untreated').map((row) => row.id), ['qo-10', 'qo-12', 'qo-15']);
});

test('canonical normalisation strips query and fragment and applies one trailing slash', () => {
  assert.equal(normaliseCanonicalPath('http://www.datacost.co.za/guides/test?x=1#part'), '/guides/test/');
  assert.equal(normaliseCanonicalPath('/guides/test/index.html?x=1'), '/guides/test/');
  assert.equal(normaliseCanonicalPath('/asset.xml?x=1'), '/asset.xml');
  assert.equal(normaliseCanonicalPath('/'), '/');
});

test('AN-05 query definitions are complete, versioned and valid', () => {
  assert.deepEqual(validateQueryClusterDefinitions(), []);
  for (const definition of GSC_QUERY_OWNER_COHORT) {
    assert.equal(definition.version, 'wp1-v1.1');
    assert.equal(definition.locale, 'en-ZA');
    assert.ok(definition.includeExact.length + definition.includePatterns.length > 0);
    assert.ok(definition.sourceEvidenceReference.includes('50.84%'));
  }
});

test('query normalization is deterministic across case, whitespace and punctuation', () => {
  assert.equal(normalizeGscQuery('  HOW-to   Check MTN Data Balance?! '), 'how to check mtn data balance');
  assert.deepEqual(assignGscQueryCluster('HOW TO CHECK MTN DATA BALANCE?!'), {
    normalizedQuery: 'how to check mtn data balance',
    clusterId: 'qo-06',
    version: 'wp1-v1.1',
    status: 'matched',
    overlappingClusterIds: []
  });
  assert.equal(assignGscQueryCluster('MTN data remaining').clusterId, 'qo-06');
});

test('exclusions, unmatched and suppressed queries remain explicit', () => {
  assert.equal(assignGscQueryCluster('mtn data balance bundle price').status, 'unmatched');
  assert.equal(assignGscQueryCluster('completely unrelated query').status, 'unmatched');
  assert.equal(assignGscQueryCluster('[suppressed]').status, 'suppressed');
  assert.equal(assignGscQueryCluster('(not set)').status, 'suppressed');
});

test('overlaps resolve by declared priority and remain visible', () => {
  const base = GSC_QUERY_OWNER_COHORT[0];
  const definitions: QueryClusterDefinition[] = [
    { ...base, id: 'cluster.second', priority: 20, includeExact: ['shared query'], includePatterns: [], excludePatterns: [] },
    { ...base, id: 'cluster.first', priority: 10, includeExact: ['shared query'], includePatterns: [], excludePatterns: [] }
  ];
  const assignment = assignGscQueryCluster('shared query', definitions);
  assert.equal(assignment.clusterId, 'cluster.first');
  assert.deepEqual(assignment.overlappingClusterIds, ['cluster.second']);
});

test('a membership change carries a new version without rewriting historical assignment', () => {
  const v1 = GSC_QUERY_OWNER_COHORT;
  const v2: QueryClusterDefinition[] = GSC_QUERY_OWNER_COHORT.map((definition) => ({
    ...definition,
    version: 'wp1-v1.2',
    effectiveFrom: '2026-08-01',
    includeExact: definition.id === 'qo-02' ? [...definition.includeExact, 'vodacom remaining data'] : definition.includeExact
  }));
  assert.equal(assignGscQueryCluster('vodacom remaining data', v1).status, 'unmatched');
  assert.equal(assignGscQueryCluster('vodacom remaining data', v2).version, 'wp1-v1.2');
  assert.equal(assignGscQueryCluster('vodacom data balance', v1).version, 'wp1-v1.1');
});
