import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { comparisonGuideDefinitions } from '../src/data/comparisonGuides';
import { getTierComparison, getTierTargetGb, hasCurrentOfferEvidence } from '../src/utils/tierComparison';
import { getComparisonOfferCatalog } from '../src/utils/comparisonOfferCatalog';
import { filterBundlesByMode, pickBestRowBundleForMode, CORE_NETWORKS } from '../src/utils/comparisonSelection';
import { getExpectedComparisonSizes } from '../src/data/monthlyDeals';

const checkOutput = process.argv.includes('--output');
const catalog = getComparisonOfferCatalog();
assert.equal(new Set(catalog.map(offer => offer.id)).size, catalog.length, 'Duplicate comparison offer IDs');
for (const offer of catalog) {
  assert.ok(hasCurrentOfferEvidence(offer), `Invalid or stale evidence: ${offer.id}`);
  assert.deepEqual(offer.comparisonSizesGb, getExpectedComparisonSizes(offer.allocation), `Broken size mapping: ${offer.id}`);
}
for (const definition of Object.values(comparisonGuideDefinitions)) {
  const target = getTierTargetGb(definition.mode);
  const tier = getTierComparison(definition.mode, catalog);
  const pool = filterBundlesByMode(definition.mode);
  const selected = CORE_NETWORKS.map(network => pickBestRowBundleForMode(pool.filter(bundle => bundle.network === network), definition.mode)).filter(Boolean);
  assert.ok(tier ? tier.offers.length > 0 : selected.length > 0, `Empty comparison: ${definition.canonicalPath}`);
  if (checkOutput) {
    const html = readFileSync(`dist${definition.canonicalPath}index.html`, 'utf8');
    assert.ok(html.includes(`href="https://datacost.co.za${definition.canonicalPath}"`), `Missing canonical: ${definition.slug}`);
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    const itemList = schemas.find(schema => schema['@type'] === 'ItemList');
    assert.ok(itemList?.itemListElement.length > 0, `Empty/missing ItemList: ${definition.slug}`);
    if (tier) {
      assert.ok(html.includes(`data-tier-comparison="${target}"`), `Missing server-delivered comparison: ${definition.slug}`);
      assert.equal(itemList.itemListElement.length, tier.offers.length, `Schema/visible offers diverged: ${definition.slug}`);
      for (const offer of tier.offers) {
        assert.equal(html.split(`data-comparison-offer="${offer.id}"`).length - 1, 2, `Missing mobile card or desktop row: ${offer.id}`);
        assert.ok(html.includes(`href="${offer.source.url.replaceAll('&', '&amp;')}"`), `Missing official source: ${offer.id}`);
        assert.ok(html.includes(offer.source.checkedAt), `Missing checked date: ${offer.id}`);
        assert.ok(itemList.itemListElement.some((entry: any) => entry.item.name === offer.offerName), `Missing schema offer: ${offer.id}`);
      }
      if (tier.fallback) assert.ok(html.includes('larger') && html.includes('not exact'), `Unlabelled fallback: ${definition.slug}`);
    }
  }
  console.log(`${definition.slug}: ${tier ? tier.offers.length : selected.length} source-checked rows${tier?.fallback ? ' (larger alternatives)' : ''}${checkOutput ? '; HTML and schema checked' : ''}`);
}
