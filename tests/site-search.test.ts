import test from 'node:test';
import assert from 'node:assert/strict';
import items from '../src/data/generated/siteSearch.json' with { type: 'json' };
import { searchSite } from '../src/utils/siteSearch';
import { getIndexableRoutes, getNoindexRoutes } from '../src/config/routeCatalog';
import { getRedirectAliasRoutes } from '../src/config/redirectAliases';

test('search covers canonical indexable routes once and never exposes drafts or aliases', () => {
  const paths = items.map((item) => item.path);
  assert.equal(new Set(paths).size, paths.length);
  assert.deepEqual([...paths].sort(), [...getIndexableRoutes()].sort());
  for (const path of [...getNoindexRoutes(), ...getRedirectAliasRoutes(), '/data-problems/how-to-stop-data-from-disappearing-android/']) assert.ok(!paths.includes(path), path);
});
test('existing help, fibre and tools are discoverable beyond the former eight guides', () => {
  for (const [query, path] of [
    ['MTN APN', '/fix/mtn-apn-settings/'],
    ['fiber installation', '/fibre/fibre-installation-costs-south-africa/'],
    ['rollover', '/guides/icasa-data-rollover-rules-south-africa/'],
    ['data bundle selector', '/tools/data-bundle-selector/'],
    ['vodacom data balance', '/data-problems/how-to-check-data-balance-vodacom-ussd/']
  ]) assert.ok(searchSite(items, query).some((item) => item.path === path), `${query}: ${path}`);
});
test('query matching handles punctuation and has deterministic empty and no-result states', () => {
  assert.deepEqual(searchSite(items, 'cell-c'), searchSite(items, 'Cell C'));
  assert.equal(searchSite(items, '').length, 8);
  assert.deepEqual(searchSite(items, 'zzzzunlistedquery'), []);
  assert.equal(searchSite(items, 'data', 2).length, 2);
});
