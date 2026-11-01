import assert from 'node:assert/strict';
import test from 'node:test';
import { bundles } from '../src/data';
import { currentMonthlyDealSnapshot, getExpectedComparisonSizes, getCurrentOffersForSize, monthlyDealHistory } from '../src/data/monthlyDeals';
import { november2026DealSnapshot } from '../src/data/monthlyDeals/history/2026-11';
import { november2026ComparisonOffers, november2026ExcludedRecordedBundleIds } from '../src/data/comparisonOfferUpdates/2026-11-01';
import { buildComparisonOfferCatalog, getComparisonOfferCatalog } from '../src/utils/comparisonOfferCatalog';
import { hasCurrentOfferEvidence } from '../src/utils/comparisonEvidence';
import { getDealAwards } from '../src/utils/monthlyDealRanking';

const REVIEW_TIME = new Date('2026-11-01T23:00:00Z');
const candidate = buildComparisonOfferCatalog({
  monthlyOffers: november2026DealSnapshot.offers,
  supplementalOffers: november2026ComparisonOffers,
  excludedRecordedBundleIds: november2026ExcludedRecordedBundleIds
});

test('the authorized November snapshot, supplement and exclusions are selected together', () => {
  assert.equal(currentMonthlyDealSnapshot, november2026DealSnapshot);
  assert.ok(monthlyDealHistory.includes(november2026DealSnapshot));
  assert.deepEqual(getComparisonOfferCatalog(), candidate);
  assert.ok(getComparisonOfferCatalog().every(offer => offer.source.checkedAt === '2026-11-01'));
  for (const size of [10, 20, 30] as const) {
    assert.deepEqual(getCurrentOffersForSize(size), november2026DealSnapshot.offers.filter(offer => offer.comparisonSizesGb.includes(size)));
  }
});

test('the candidate composes 44 reviewed records without reviving four withheld references', () => {
  assert.equal(november2026DealSnapshot.offers.length, 26);
  assert.equal(november2026ComparisonOffers.length, 18);
  assert.equal(candidate.length, 44);
  assert.equal(new Set(candidate.map(offer => offer.id)).size, candidate.length);
  for (const offer of candidate) {
    assert.ok(hasCurrentOfferEvidence(offer, REVIEW_TIME), offer.id);
    assert.deepEqual(offer.comparisonSizesGb, getExpectedComparisonSizes(offer.allocation), offer.id);
    assert.ok(offer.paymentModel && offer.commitment && offer.purchaseChannels.length > 0, offer.id);
  }
  for (const id of ['recorded-voda-monthly-1-5gb', 'recorded-voda-monthly-3gb', 'mtn-entertainment-streaming-20gb-2026-11', 'mtn-home-wifi-15-plus-15-2026-11']) {
    assert.ok(!candidate.some(offer => offer.id === id), id);
  }
});

test('a review-bound override prevents an older base price from being appended again', () => {
  const original = candidate.find(offer => offer.id === 'recorded-mtn-monthly-1gb')!;
  const override = { ...original, priceZar: original.priceZar + 1 };
  const result = buildComparisonOfferCatalog({ monthlyOffers: [], supplementalOffers: [override], recordedBundles: bundles.filter(bundle => bundle.id === 'mtn-monthly-1gb') });
  assert.deepEqual(result, [override]);
});

test('monthly candidates retain usable comparisons without rewarding conflicted, daily or conditional allocations as pooled anytime', () => {
  for (const size of [10, 20, 30] as const) {
    const offers = november2026DealSnapshot.offers.filter(offer => offer.comparisonSizesGb.includes(size));
    assert.ok(offers.length >= 4, `${size}GB`);
    const awards = getDealAwards(size, offers, REVIEW_TIME);
    assert.ok(awards.bestOverall && awards.lowestAdvertisedPrice, `${size}GB`);
    assert.ok(awards.bestOverall.allocation.anytimeGb >= size);
    assert.notEqual(awards.bestOverall.rankingStatus, 'context_only');
    assert.notEqual(awards.bestOverall.providerId, 'fnb-connect');
  }
  assert.ok(candidate.filter(offer => offer.providerId === 'fnb-connect').every(offer => offer.rankingStatus === 'context_only' && offer.rankingExclusionReason));
  const capitec = candidate.find(offer => offer.id === 'capitec-connect-10gb-30-day-2026-11')!;
  assert.equal(capitec.allocation.anytimeGb, 10);
  assert.equal(capitec.allocation.conditionalBonusGb, 2);
  assert.ok(candidate.filter(offer => offer.id.startsWith('melon-byop')).every(offer => offer.rankingStatus === 'context_only'));
});
