import assert from 'node:assert/strict';
import test from 'node:test';
import { GSC_QUERY_OWNER_COHORT } from '../src/seo/wp1Measurement';

test('every AN-05 query cluster has reproducible membership rules', () => {
  for (const cluster of GSC_QUERY_OWNER_COHORT) {
    assert.ok('version' in cluster, `${cluster.id} has no version`);
    assert.ok('includeExact' in cluster || 'includePatterns' in cluster, `${cluster.id} has no inclusion rule`);
    assert.ok('excludePatterns' in cluster, `${cluster.id} has no exclusions`);
    assert.ok('priority' in cluster, `${cluster.id} has no overlap priority`);
  }
});
