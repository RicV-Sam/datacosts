import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateConsumedData, calculatePhoneOwnership, calculateUsageScenario, selectListedBundles, type ConsumptionInput, type SelectorPreferences } from '../src/utils/discoveryTools';
import { currentMonthlyDealSnapshot, type MonthlyDataDealOffer } from '../src/data/monthlyDeals';
import { discoveryGuides } from '../src/data/discoveryGuides';
import { getIndexableRoutes, getSitemapRoutes } from '../src/config/routeCatalog';
import { getGuideModifiedIso } from '../src/seo/contentDates';

const daily: ConsumptionInput = { days: 30, price: 169, anytimeGb: 0.5, nightGb: 0.5, daytimeUseGb: 0.25, nightUseGb: 0, dailyRelease: true };
const prefs: SelectorPreferences = { needGb: 10, minimumDays: 30, banks: [], planProviders: [], allowLte: false, allowRecurring: false };
const now = new Date('2026-10-12T12:00:00Z');
const template = currentMonthlyDealSnapshot.offers.find((offer) => offer.rankingStatus === 'eligible' && offer.providerId === 'cell-c')!;
function offer(change: Partial<MonthlyDataDealOffer> = {}): MonthlyDataDealOffer {
  return { ...template, id: 'test-public', providerId: 'cell-c', providerName: 'Cell C', allocation: { anytimeGb: 10, nightGb: 0, streamingGb: 0, socialGb: 0, otherRestricted: [] }, priceZar: 100, validity: { kind: 'days', days: 30, label: '30 days' }, accessTier: 'public', billing: 'once_off', commitment: { kind: 'once_off' }, productType: 'mobile_data', source: { ...(currentMonthlyDealSnapshot.offers.find(row => row.providerId === (change.providerId ?? 'cell-c'))?.source ?? template.source), checkedAt: '2026-10-12' }, ...change };
}

test('daily night allowances do not subsidise daytime demand or hide unused data', () => {
  const result = calculateConsumedData(daily)!;
  assert.equal(result.usedGb, 7.5);
  assert.equal(result.unusedGb, 22.5);
  assert.equal(result.unmetGb, 0);
  assert.equal(result.costPerUsedGb, 169 / 7.5);
  assert.equal(result.costPerAnytimeGb, 169 / 15);
});
test('night demand uses the night wallet, then spare anytime, while excess stays unmet', () => {
  const result = calculateConsumedData({ ...daily, days: 2, daytimeUseGb: 0.25, nightUseGb: 1 })!;
  assert.deepEqual([result.usedGb, result.unusedGb, result.unmetGb], [2, 0, 0.5]);
});
test('pooled amounts are total purchase allowances; daily amounts are per day', () => {
  const result = calculateConsumedData({ ...daily, anytimeGb: 15, nightGb: 15, dailyRelease: false })!;
  assert.equal(result.usedGb, 7.5);
  assert.equal(result.unusedGb, 22.5);
  const allUsed = calculateConsumedData({ ...daily, anytimeGb: 0.001, nightGb: 0.002, daytimeUseGb: 0.001, nightUseGb: 0.002 })!;
  assert.equal(allUsed.unusedGb, 0);
});
test('zero consumption is undefined value, and invalid purchase inputs fail closed', () => {
  assert.equal(calculateConsumedData({ ...daily, daytimeUseGb: 0 })?.costPerUsedGb, null);
  assert.equal(calculateConsumedData({ ...daily, anytimeGb: 0 })?.costPerAnytimeGb, null);
  for (const change of [{ days: 0 }, { days: 1.5 }, { days: 367 }, { price: -1 }, { nightGb: Infinity }, { daytimeUseGb: NaN }]) assert.equal(calculateConsumedData({ ...daily, ...change }), null);
});
test('handset ownership comparison includes promo prices and both fixed costs over one term', () => {
  const contract = { months: 24, monthly: 499, introMonthly: 399, introMonths: 3, onceOff: 99 };
  assert.deepEqual(calculatePhoneOwnership(contract, 6000, 150, 0), { contract: 11775, prepaid: 9600, difference: 2175 });
  assert.equal(calculatePhoneOwnership({ ...contract, introMonths: 25 }, 6000, 150, 0), null);
  assert.equal(calculatePhoneOwnership(contract, -1, 150, 0), null);
  assert.equal(calculatePhoneOwnership({ months: 3, monthly: 9.99, introMonthly: 0, introMonths: 0, onceOff: 0 }, 0.01, 9.99, 0.02)?.prepaid, 30);
});
test('usage scenario preserves default estimate and excludes the declared Wi-Fi share', () => {
  const usage = { video: 1, social: 2, chat: 1, web: 1 };
  const result = calculateUsageScenario(usage, 100)!;
  assert.ok(Math.abs(result.base - 61.5) < 1e-10);
  assert.ok(Math.abs(calculateUsageScenario(usage, 50)!.base - 30.75) < 1e-10);
  assert.equal(calculateUsageScenario(usage, 0)?.higher, 0);
  assert.equal(calculateUsageScenario(usage, 101), null);
  assert.equal(calculateUsageScenario(usage, 100, { ...usage, video: NaN }), null);
});
test('selector requires bank and tariff declarations, including a separate LTE choice', () => {
  const bank = offer({ id: 'bank', providerId: 'capitec-connect', accessTier: 'qualifying_price_plan' });
  const lte = offer({ id: 'lte', providerId: 'vodacom', accessTier: 'qualifying_price_plan', productType: 'prepaid_lte' });
  assert.equal(selectListedBundles([bank, lte], prefs, now)?.length, 0);
  assert.deepEqual(selectListedBundles([bank, lte], { ...prefs, banks: ['capitec-connect'] }, now)?.map((o) => o.id), ['bank']);
  assert.equal(selectListedBundles([lte], { ...prefs, planProviders: ['vodacom'] }, now)?.length, 0);
  assert.equal(selectListedBundles([lte], { ...prefs, planProviders: ['vodacom'], allowLte: true }, now)?.length, 1);
});
test('selector never counts night, streaming or conditional rewards toward anytime demand', () => {
  const restricted = offer({ allocation: { ...offer().allocation, anytimeGb: 5, nightGb: 5, streamingGb: 20, conditionalBonusGb: 10 } });
  assert.deepEqual(selectListedBundles([restricted], prefs, now), []);
});
test('selector rejects excluded evidence, stale/future checks, calendar expiry and unknown commitments', () => {
  const variants = [offer({ rankingStatus: 'context_only' }), offer({ validity: { kind: 'monthly', label: 'calendar month' } }), offer({ commitment: { kind: 'not_confirmed', note: 'unknown' } }), offer({ commitment: { kind: 'fixed_term', months: 24 } }), offer({ source: { ...offer().source, checkedAt: '2026-09-12' } }), offer({ source: { ...offer().source, checkedAt: '2026-10-13' } })];
  assert.deepEqual(selectListedBundles(variants, { ...prefs, banks: ['fnb-connect'], allowRecurring: true }, now), []);
  assert.equal(selectListedBundles([offer()], { ...prefs, minimumDays: 0 }, now), null);
});
test('selector handles recurrence explicitly and sorts prices deterministically', () => {
  const recurring = offer({ id: 'monthly', billing: 'recurring_monthly', commitment: { kind: 'month_to_month' } });
  assert.equal(selectListedBundles([recurring], prefs, now)?.length, 0);
  assert.equal(selectListedBundles([recurring], { ...prefs, allowRecurring: true }, now)?.length, 1);
  assert.deepEqual(selectListedBundles([offer({ id: 'b', priceZar: 101 }), offer({ id: 'a' })], prefs, now)?.map((o) => o.id), ['a', 'b']);
});
test('new guides have reachable catalogue routes and truthful publication chronology', () => {
  const indexed = new Set(getIndexableRoutes()), sitemap = new Set(getSitemapRoutes());
  for (const guide of discoveryGuides) {
    const route = `/guides/${guide.slug}/`;
    assert.ok(indexed.has(route) && sitemap.has(route), route);
    assert.ok(Date.parse(getGuideModifiedIso(guide.slug)) >= Date.parse(`${guide.publishedAt}T00:00:00Z`));
    assert.ok(guide.officialSources?.length);
  }
});


test('FNB fixed-day bundles share the reviewed evidence policy and require bank eligibility', () => {
  const fnb = currentMonthlyDealSnapshot.offers.find(row => row.id === 'fnb-connect-standard-bundle-20gb-2026-10')!;
  assert.equal(selectListedBundles([fnb], prefs, now)?.length, 0);
  assert.equal(selectListedBundles([fnb], { ...prefs, banks: ['fnb-connect'] }, now)?.length, 1);
  const unsafe = { ...fnb, source: { ...fnb.source, url: 'https://example.com/unverified' } };
  assert.equal(selectListedBundles([unsafe], { ...prefs, banks: ['fnb-connect'] }, now)?.length, 0);
});
