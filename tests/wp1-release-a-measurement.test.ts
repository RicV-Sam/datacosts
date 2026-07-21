import assert from 'node:assert/strict';
import test from 'node:test';
import { CNI_URL_COHORT, GSC_QUERY_OWNER_COHORT, WP1_BASELINE, normaliseCanonicalPath } from '../src/seo/wp1Measurement';

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

