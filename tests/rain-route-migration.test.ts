import assert from 'node:assert/strict';
import test from 'node:test';
import { getIndexableRoutes, getPrerenderRoutes, getSitemapRoutes } from '../src/config/routeCatalog';
import { getRedirectAlias, REDIRECT_ALIASES } from '../src/config/redirectAliases';
import { bundles } from '../src/data';

const LEGACY_RAIN_PATH = '/network/rain/rain-unlimited-4g-data-price/';
const CANONICAL_RAIN_PATH = '/network/rain/';

test('legacy Rain route is a prerendered alias to the canonical network hub', () => {
  const alias = getRedirectAlias(LEGACY_RAIN_PATH);
  assert.equal(alias?.to, CANONICAL_RAIN_PATH);
  assert.equal(REDIRECT_ALIASES.filter((entry) => entry.from === LEGACY_RAIN_PATH).length, 1);

  assert.ok(getPrerenderRoutes().includes(LEGACY_RAIN_PATH));
  assert.ok(!getIndexableRoutes().includes(LEGACY_RAIN_PATH));
  assert.ok(!getSitemapRoutes().includes(LEGACY_RAIN_PATH));

  assert.ok(getIndexableRoutes().includes(CANONICAL_RAIN_PATH));
  assert.ok(getSitemapRoutes().includes(CANONICAL_RAIN_PATH));
});

test('historical Rain evidence identity remains stable while its product evidence is current', () => {
  const bundle = bundles.find((entry) => entry.id === 'rain-unlimited-4g');
  assert.ok(bundle, 'legacy Rain evidence record must remain available to the evidence registry');
  assert.equal(bundle.slug, 'rain-unlimited-4g-data-price');
  assert.equal(bundle.name, 'Rain unlimited home 30Mbps');
  assert.equal(bundle.sourceUrl, 'https://www.rain.co.za/5Ghomewifi');
  assert.equal(bundle.lastVerified, '2026-09-01');

  assert.ok(!getPrerenderRoutes().includes('/network/rain/rain-unlimited-5g-data-price/'));
});
