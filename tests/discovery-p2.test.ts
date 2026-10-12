import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { calculateStagedOfferCost, parseUsageDays, simulateBundleCosts, type BundleSimulationInput } from '../src/utils/costCalculators';
import { DailyMonthlyCalculatorPage, DAILY_MONTHLY_CALCULATOR_PATH } from '../src/pages/DailyMonthlyCalculatorPage';
import { MvnoGuidePage } from '../src/pages/MvnoGuidePage';
import { mvnoProviderProfiles } from '../src/data/mvnos';
import { currentMonthlyDealSnapshot } from '../src/data/monthlyDeals';
import { getIndexableRoutes, getSitemapRoutes } from '../src/config/routeCatalog';
import { getRouteModifiedIso } from '../src/seo/contentDates';

const offer = { monthly: 299, months: 24, onceOff: 100, introMonthly: 99, introMonths: 3 };
const scenario: BundleSimulationInput = {
  periodDays: 30, usageDays: parseUsageDays('', 30)!, usageGb: 0.5,
  dailyGb: 1, dailyPrice: 10, longerGb: 10, longerPrice: 100, longerValidityDays: 30
};

test('staged prices preserve flat pricing, include fees, and count the promotion only once', () => {
  assert.deepEqual(calculateStagedOfferCost(offer), { total: 6676, effective: 6676 / 24 });
  assert.equal(calculateStagedOfferCost({ ...offer, introMonths: 0 })?.total, 7276);
  assert.equal(calculateStagedOfferCost({ ...offer, introMonths: 24 })?.total, 2476);
  assert.equal(calculateStagedOfferCost({ ...offer, introMonthly: 0, introMonths: 3 })?.total, 6379);
  assert.equal(calculateStagedOfferCost({ ...offer, monthly: 9.99, introMonths: 0, onceOff: 0, months: 3 })?.total, 29.97);
});

test('invalid staged terms and non-finite amounts cannot produce a comparison', () => {
  for (const change of [{ introMonths: 25 }, { introMonths: -1 }, { introMonths: 1.5 }, { months: 0 }, { months: 24.5 }, { monthly: Infinity }, { onceOff: NaN }]) {
    assert.equal(calculateStagedOfferCost({ ...offer, ...change }), null);
  }
});

test('the hypothetical comparison fulfils the same 15GB, including a second longer bundle', () => {
  const result = simulateBundleCosts(scenario)!;
  assert.deepEqual(result.daily, { purchases: 30, total: 300, usedGb: 15, unusedGb: 15, costPerUsedGb: 20 });
  assert.deepEqual(result.longer, { purchases: 2, total: 200, usedGb: 15, unusedGb: 5, costPerUsedGb: 200 / 15 });
});

test('small allowances cannot win by delivering less demand', () => {
  const result = simulateBundleCosts({ ...scenario, periodDays: 3, usageDays: [1, 2, 3], usageGb: 2, dailyGb: 1, longerGb: 1, longerPrice: 20 })!;
  assert.equal(result.daily.purchases, 6);
  assert.equal(result.longer.purchases, 6);
  assert.equal(result.daily.usedGb, 6);
  assert.equal(result.longer.usedGb, 6);
  assert.equal(result.longer.total, 120);
});

test('each purchase keeps its own expiry and a late first-use day does not buy earlier', () => {
  const expired = simulateBundleCosts({ ...scenario, periodDays: 31, usageDays: [1, 31], usageGb: 1 })!;
  assert.equal(expired.longer.purchases, 2, 'day-1 30-day allowance cannot serve day 31');
  const late = simulateBundleCosts({ ...scenario, periodDays: 35, usageDays: [7, 35], usageGb: 1 })!;
  assert.equal(late.longer.purchases, 1, 'a purchase on day 7 remains valid on day 35');
  const independent = simulateBundleCosts({ ...scenario, periodDays: 4, usageDays: [1, 2, 4], usageGb: 2, longerGb: 3, longerValidityDays: 2 })!;
  assert.equal(independent.longer.purchases, 3, 'the day-2 purchase also expires before day 4');
});

test('decimal boundaries, duplicate days and zero demand are handled without extra purchases', () => {
  const decimal = simulateBundleCosts({ ...scenario, periodDays: 3, usageDays: [1, 2, 3, 3], usageGb: 0.1, longerGb: 0.3 })!;
  assert.equal(decimal.longer.purchases, 1);
  assert.equal(decimal.longer.unusedGb, 0);
  assert.deepEqual(parseUsageDays('3, 1, 3', 30), [1, 3]);
  const zero = simulateBundleCosts({ ...scenario, usageGb: 0 })!;
  assert.equal(zero.daily.total, 0);
  assert.equal(zero.longer.total, 0);
  assert.equal(zero.daily.costPerUsedGb, null);
});

test('malformed schedules and invalid capacities, prices or validity are rejected', () => {
  for (const text of ['0', '31', '1.5', '1,', '1,,3', 'NaN', '-2']) assert.equal(parseUsageDays(text, 30), null);
  for (const change of [{ dailyGb: 0 }, { longerGb: -1 }, { usageGb: Infinity }, { usageGb: 0.0001 }, { longerPrice: NaN }, { longerValidityDays: 1.5 }, { usageDays: [31] }]) {
    assert.equal(simulateBundleCosts({ ...scenario, ...change }), null);
  }
});

function render(element: React.ReactElement) {
  return renderToStaticMarkup(React.createElement(MemoryRouter, {}, React.createElement(HelmetProvider, {}, element)));
}

test('TFG has sourced payment choices but cannot silently add a tracker price or ranking', () => {
  const profile = mvnoProviderProfiles.find((entry) => entry.id === 'tfg-connect')!;
  assert.deepEqual(profile.editorialCommitments, ['once_off', 'month_to_month']);
  assert.ok(profile.sources.every((source) => source.checkedAt === '2026-10-12'));
  assert.equal(currentMonthlyDealSnapshot.offers.filter((entry) => String(entry.providerId) === profile.id).length, 0);
  const html = render(React.createElement(MvnoGuidePage, { onNavigate: () => {}, onScrollTo: () => {} }));
  const tfg = html.slice(html.indexOf('data-mvno-provider="tfg-connect"'), html.indexOf('data-mvno-provider="airmobile"'));
  assert.match(tfg, /outside its price rankings/);
  assert.match(tfg, /MTN and other networks/);
  assert.match(tfg, /interest/);
  assert.doesNotMatch(tfg, /Payment: <\/p>/);
});

test('the new tool has a discoverable canonical route and no price-feed claims', () => {
  assert.ok(getIndexableRoutes().includes(DAILY_MONTHLY_CALCULATOR_PATH));
  assert.ok(getSitemapRoutes().includes(DAILY_MONTHLY_CALCULATOR_PATH));
  assert.equal(getRouteModifiedIso(DAILY_MONTHLY_CALCULATOR_PATH), '2026-10-12T00:00:00.000Z');
  const html = render(React.createElement(DailyMonthlyCalculatorPage, { onNavigate: () => {}, onScrollTo: () => {} }));
  assert.match(html, /Load hypothetical example/);
  assert.match(html, /not a live provider-price feed/);
  assert.match(html, /repeat purchases and multiple active bundles/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});
