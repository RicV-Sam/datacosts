import assert from 'node:assert/strict';
import test from 'node:test';
import {
  currentMonthlyDealSnapshot,
  getExpectedComparisonSizes,
  getCurrentOffersForSize,
  monthlyDealHistory,
  TRACKED_DATA_SIZES_GB
} from '../src/data/monthlyDeals';
import { getDealAwards, getDealOfferMetrics, sortDealsForDisplay } from '../src/utils/monthlyDealRanking';
import { buildMonthlyDealItemListSchema, buildMonthlyDealWinnerItemListSchema } from '../src/utils/monthlyDealStructuredData';

test('tracker supports future sizes while preserving immutable monthly history', () => {
  assert.deepEqual(TRACKED_DATA_SIZES_GB, [5, 10, 15, 20, 30, 50]);
  assert.equal(monthlyDealHistory.length, 2);
  assert.deepEqual(monthlyDealHistory.map((snapshot) => snapshot.month), ['2026-08', '2026-09']);
  assert.equal(monthlyDealHistory[0].checkedAt, '2026-08-04');
  assert.equal(monthlyDealHistory[0].offers.length, 28);
  assert.equal(currentMonthlyDealSnapshot.month, '2026-09');
  assert.equal(currentMonthlyDealSnapshot.checkedAt, '2026-09-01');
  assert.equal(currentMonthlyDealSnapshot.offers.length, 28);
});

test('derived calculations keep anytime and advertised totals separate', () => {
  const offer = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'vodacom-prepaid-lte-10-plus-10-2026-09');
  assert.ok(offer);
  const metrics = getDealOfferMetrics(offer);
  assert.equal(metrics.advertisedTotalGb, 20);
  assert.equal(metrics.restrictedGb, 10);
  assert.equal(metrics.costPerAnytimeGb, 14.9);
  assert.equal(metrics.costPerAdvertisedGb, 7.45);

  const conditional = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'capitec-connect-10gb-30-day-2026-09');
  assert.ok(conditional);
  const conditionalMetrics = getDealOfferMetrics(conditional);
  assert.equal(conditionalMetrics.advertisedTotalGb, 12);
  assert.equal(conditionalMetrics.costPerAnytimeGb, 15);
  assert.equal(conditionalMetrics.costPerAdvertisedGb, 12.5);
});

test('daily-release and streaming data never become anytime data', () => {
  const daily = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'telkom-daily-dose-30gb-2026-09');
  const streaming = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'mtn-entertainment-streaming-20gb-2026-09');
  assert.ok(daily);
  assert.ok(streaming);
  assert.equal(getDealOfferMetrics(daily).costPerAnytimeGb, null);
  assert.equal(getDealOfferMetrics(streaming).costPerAnytimeGb, null);
  assert.equal(streaming.allocation.streamingGb, 20);
});

test('size bands deterministically include pooled-anytime and advertised-total classes', () => {
  const vodacom20Advertised = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'vodacom-prepaid-lte-10-plus-10-2026-09');
  const vodacom40Advertised = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'vodacom-prepaid-lte-20-plus-20-2026-09');
  const fnb25 = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'fnb-connect-data-plan-25gb-2026-09');
  const standardBank35 = currentMonthlyDealSnapshot.offers.find((row) => row.id === 'standard-bank-connect-connected-gigs-pro-35gb-2026-09');
  assert.ok(vodacom20Advertised);
  assert.ok(vodacom40Advertised);
  assert.ok(fnb25);
  assert.ok(standardBank35);
  assert.deepEqual(getExpectedComparisonSizes(vodacom20Advertised.allocation), [10, 20]);
  assert.deepEqual(getExpectedComparisonSizes(vodacom40Advertised.allocation), [20, 30]);
  assert.deepEqual(getExpectedComparisonSizes(fnb25.allocation), [20]);
  assert.deepEqual(getExpectedComparisonSizes(standardBank35.allocation), [30]);
});

test('ranking keeps cheapest genuine anytime, unit value and advertised price separate', () => {
  const ten = getDealAwards(10, getCurrentOffersForSize(10));
  const twenty = getDealAwards(20, getCurrentOffersForSize(20));
  const thirty = getDealAwards(30, getCurrentOffersForSize(30));

  assert.equal(ten.bestOverall?.id, 'vodacom-prepaid-lte-10-plus-10-2026-09');
  assert.equal(twenty.bestOverall?.id, 'standard-bank-connect-connected-gigs-plus-20gb-2026-09');
  assert.equal(thirty.bestOverall?.id, 'mtn-super-data-30gb-2026-09');
  assert.equal(ten.bestAnytimeValue?.id, 'vodacom-prepaid-lte-10-plus-10-2026-09');
  assert.equal(twenty.bestAnytimeValue?.id, 'fnb-connect-data-plan-25gb-2026-09');
  assert.equal(thirty.bestAnytimeValue?.id, 'standard-bank-connect-connected-gigs-pro-35gb-2026-09');
  assert.equal(ten.lowestAdvertisedPrice?.id, 'vodacom-prepaid-lte-5-plus-5-2026-09');
  assert.equal(twenty.lowestAdvertisedPrice?.id, 'vodacom-prepaid-lte-10-plus-10-2026-09');
  assert.equal(thirty.lowestAdvertisedPrice?.id, 'cell-c-day-by-day-30gb-2026-09');
});

test('context-only offers cannot lead even when their nominal value looks strong', () => {
  const offers = getCurrentOffersForSize(20);
  const contextOnly = offers.filter((offer) => offer.rankingStatus === 'context_only');
  assert.ok(contextOnly.length >= 2);
  const awards = getDealAwards(20, offers);
  assert.ok(contextOnly.every((offer) => offer.id !== awards.bestOverall?.id));
  assert.ok(contextOnly.every((offer) => offer.id !== awards.lowestAdvertisedPrice?.id));
});

test('structured ItemList mirrors visible source-checked rows without speculative availability', () => {
  const offers = sortDealsForDisplay(20, getCurrentOffersForSize(20));
  const schema = buildMonthlyDealItemListSchema('20GB comparison', 'https://datacost.co.za/best-20gb-data-deals-south-africa/', offers);
  assert.equal(schema.numberOfItems, offers.length);
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[0].item.name, offers[0].offerName);
  const serialized = JSON.stringify(schema);
  assert.ok(serialized.includes('"priceCurrency":"ZAR"'));
  assert.ok(serialized.includes('"Pooled anytime data"'));
  assert.ok(serialized.includes('"Cost per advertised GB"'));
  assert.ok(serialized.includes('"Conditional bonus data"'));
  assert.ok(serialized.includes('"Streaming-only data"'));
  assert.ok(!serialized.includes('priceValidUntil'));
  assert.ok(!serialized.includes('InStock'));
});

test('hub winner schema stays limited to facts displayed in winner summaries', () => {
  const winners = ([10, 20, 30] as const)
    .map((size) => getDealAwards(size, getCurrentOffersForSize(size)).bestOverall)
    .filter((offer): offer is NonNullable<typeof offer> => Boolean(offer));
  const schema = buildMonthlyDealWinnerItemListSchema(
    'Monthly deal winners',
    'https://datacost.co.za/best-data-deals-south-africa/',
    winners
  );
  const serialized = JSON.stringify(schema);
  assert.equal(schema.numberOfItems, 3);
  assert.ok(serialized.includes('"Cost per anytime GB"'));
  assert.ok(!serialized.includes('Official source checked'));
  assert.ok(!serialized.includes('Purchase channels'));
  assert.ok(!serialized.includes('eligibility'));
});
