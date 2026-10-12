import assert from 'node:assert/strict';
import test from 'node:test';
import { bundles } from '../src/data';
import { comparisonGuideDefinitions } from '../src/data/comparisonGuides';
import { getComparisonOfferCatalog } from '../src/utils/comparisonOfferCatalog';
import { getTierComparison, hasCurrentOfferEvidence, getTierTargetGb } from '../src/utils/tierComparison';
import { filterBundlesByMode, pickBestRowBundleForMode } from '../src/utils/comparisonSelection';
import { getDealAwards, getDealOfferMetrics } from '../src/utils/monthlyDealRanking';

const NOW = new Date('2026-10-12T12:00:00Z');
const catalog = getComparisonOfferCatalog();

test('every configured tier has a real comparison and all non-tier modes retain results', () => {
  for (const definition of Object.values(comparisonGuideDefinitions)) {
    const target = getTierTargetGb(definition.mode);
    if (target && target > 1) {
      const tier = getTierComparison(definition.mode, catalog, NOW);
      assert.ok(tier && tier.offers.length > 0, definition.slug);
      assert.equal(new Set(tier.offers.map(offer => offer.id)).size, tier.offers.length);
    } else {
      assert.ok(filterBundlesByMode(definition.mode).length > 0, definition.slug);
    }
  }
});

test('anytime-plus-night smartphone bundle survives the exact tier and monthly filters', () => {
  const split = bundles.find(bundle => bundle.id === 'mtn-monthly-5gb')!;
  assert.ok(filterBundlesByMode('cheapest-5gb', [split]).includes(split));
  assert.equal(pickBestRowBundleForMode([split], 'cheapest-5gb')?.id, split.id);
  assert.ok(filterBundlesByMode('best-monthly', [split]).includes(split));
  const totalOnly = { ...split, anytimeData: '2GB', nightData: '3GB', volume: '5GB' };
  assert.equal(pickBestRowBundleForMode([totalOnly], 'cheapest-5gb'), null);
  const unverified = { ...split, sourceConfidence: 'manual_required' as const };
  assert.equal(pickBestRowBundleForMode([unverified], 'cheapest-5gb'), null);
});

test('10GB display separates pooled anytime from restricted totals and shares tracker awards', () => {
  const tier = getTierComparison('cheapest-10gb', catalog, NOW)!;
  const split = tier.offers.find(offer => offer.id === 'vodacom-prepaid-lte-10-plus-10-2026-10')!;
  assert.equal(split.allocation.anytimeGb, 10);
  assert.equal(split.allocation.nightGb, 10);
  assert.equal(split.priceZar, 149);
  assert.equal(getDealOfferMetrics(split).costPerAnytimeGb, 14.9);
  assert.deepEqual(tier.awards, getDealAwards(10, tier.offers));
  assert.ok(tier.awards.bestOverall!.allocation.anytimeGb >= 10);
  const advertisedOnly = tier.offers.find(offer => offer.id === 'vodacom-prepaid-lte-5-plus-5-2026-10')!;
  assert.equal(advertisedOnly.allocation.anytimeGb, 5);
  assert.notEqual(tier.awards.bestOverall?.id, advertisedOnly.id);
});

test('catalogue adapter deduplicates existing products and preserves 50GB LTE conditions', () => {
  assert.equal(catalog.filter(offer => offer.providerId === 'vodacom' && offer.allocation.anytimeGb === 10 && offer.priceZar === 149).length, 1);
  const tier = getTierComparison('cheapest-50gb', catalog, NOW)!;
  assert.equal(tier.offers[0].allocation.anytimeGb, 50);
  assert.equal(tier.offers[0].allocation.nightGb, 50);
  assert.equal(tier.offers[0].rankingStatus, 'context_only');
  assert.equal(tier.awards.bestOverall, null);
});

test('new 2GB evidence retains 14 vs 30-day validity without awarding a mixed-validity winner', () => {
  const tier = getTierComparison('cheapest-2gb', catalog, NOW)!;
  assert.equal(tier.fallback, false);
  assert.ok(tier.offers.some(offer => offer.id === 'mtn-monthly-2-plus-2-2026-10'));
  assert.ok(tier.offers.some(offer => offer.id === 'vodacom-prepaid-lte-2-plus-2-2026-10'));
  assert.equal(tier.offers.find(offer => offer.providerId === 'mtn')!.priceZar, 155);
  assert.equal(tier.offers.find(offer => offer.id === 'vodacom-prepaid-lte-2-plus-2-2026-10')!.validity.label, '14 days');
  assert.equal(tier.awards.bestOverall, null);
});

test('missing target class can show larger alternatives but cannot manufacture a target winner', () => {
  const bigger = catalog.filter(offer => offer.comparisonSizesGb.includes(20));
  const tier = getTierComparison('cheapest-15gb', bigger, NOW)!;
  assert.equal(tier.fallback, true);
  assert.equal(tier.sizeGb, 20);
  assert.ok(tier.offers.length > 0);
  assert.equal(tier.awards.bestOverall, null);
  assert.equal(getTierComparison('cheapest-10gb', [], NOW)!.offers.length, 0);
});

test('stale, future, unverified, malformed and non-official evidence fails closed', () => {
  const offer = catalog[0];
  for (const changed of [
    { ...offer, source: { ...offer.source, checkedAt: '2026-09-12' } },
    { ...offer, source: { ...offer.source, checkedAt: '2026-10-13' } },
    { ...offer, source: { ...offer.source, checkedAt: 'not-a-date' } },
    { ...offer, source: { ...offer.source, official: false as unknown as true } },
    { ...offer, source: { ...offer.source, url: 'https://example.com/price' } },
    { ...offer, priceZar: NaN },
    { ...offer, allocation: { ...offer.allocation, anytimeGb: -1 } }
  ]) assert.equal(hasCurrentOfferEvidence(changed, NOW), false);
  assert.equal(getTierComparison('cheapest-10gb', catalog, new Date('2026-11-12T12:00:00Z'))!.offers.length, 0);
});
