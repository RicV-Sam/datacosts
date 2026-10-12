import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { NetworkPage } from '../src/pages/NetworkPage';
import { ComparisonGuidePage } from '../src/pages/ComparisonGuidePage';
import { MonthlyDealComparison } from '../src/components/deals/MonthlyDealComparison';
import { SuperDataMigrationNotice } from '../src/components/deals/SuperDataMigrationNotice';
import { currentMonthlyDealSnapshot, getCurrentOffersForSize } from '../src/data/monthlyDeals';
import { getNetworkPageModifiedIso, getNetworkUssdModifiedIso, getRouteModifiedIso } from '../src/seo/contentDates';

const navigation = { onNavigate: () => {}, onScrollTo: () => {} };
function render(element: React.ReactElement, route = '/') {
  return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [route] },
    React.createElement(HelmetProvider, {}, element)));
}

test('24-hour Telkom bundles remain daily and can appear in general-use summary picks', () => {
  const html = render(React.createElement(NetworkPage, { ...navigation, networkSlug: 'telkom' }));
  assert.match(html, /These picks compare only source-checked rows in the table below/);
  const rows = html.match(/<tr\b[\s\S]*?<\/tr>/g) ?? [];
  for (const name of ['Telkom Daily 150MB', 'Telkom Daily 1GB']) {
    const row = rows.find((entry) => entry.includes(name));
    assert.ok(row, name);
    assert.match(row, />Daily<\/td>/);
    assert.match(row, /24 Hours/);
    assert.doesNotMatch(row, />Hourly<\/td>/);
  }
  const mtnHtml = render(React.createElement(NetworkPage, { ...navigation, networkSlug: 'mtn' }));
  const hourly = (mtnHtml.match(/<tr\b[\s\S]*?<\/tr>/g) ?? []).find((row) => row.includes('MTN Hourly 150MB'));
  assert.ok(hourly);
  assert.match(hourly, />Hourly<\/td>/);
  const cheapSummary = html.indexOf('Lowest verified general-use Telkom price');
  assert.ok(cheapSummary >= 0);
  assert.match(html.slice(cheapSummary, cheapSummary + 1600), /Telkom Daily 150MB/);
  const oneGbSummary = html.indexOf('Lowest verified Telkom 1GB price');
  assert.ok(oneGbSummary >= 0);
  assert.match(html.slice(oneGbSummary, oneGbSummary + 1600), /Telkom Daily 1GB/);
});

test('empty exact-size guides explain their scope and link to the matching broader tracker', () => {
  for (const size of [10, 20]) {
    const route = `/guides/cheapest-${size}gb-data-south-africa/`;
    const html = render(React.createElement(ComparisonGuidePage, {
      ...navigation, guideSlug: `cheapest-${size}gb-data-south-africa`
    }), route);
    const quickAnswer = html.slice(html.indexOf('id="quick-answer"'), html.indexOf('id="comparison-table"'));
    assert.ok(quickAnswer.includes(`href="/best-${size}gb-data-deals-south-africa/"`));
    assert.match(quickAnswer, /does not include MVNOs or recurring plans/);
    assert.ok(quickAnswer.includes(`No source-checked exact ${size}GB bundle meets`));
    assert.match(quickAnswer, /This does not mean no/);
    assert.match(html, new RegExp(`rel="canonical" href="https://datacost.co.za${route}"`));
  }
});

test('both mobile and desktop MTN comparison views show both migration losses without rewriting history', () => {
  const offers = getCurrentOffersForSize(30);
  const html = render(React.createElement(MonthlyDealComparison, { sizeGb: 30, offers }));
  assert.equal((html.match(/Before switching to or from Super Data/g) ?? []).length, 2);
  assert.equal((html.match(/Moving away forfeits unused, unexpired Super Data and Voice bundles/g) ?? []).length, 2);
  assert.equal((html.match(/Migration terms checked 12 October 2026/g) ?? []).length, 2);
  assert.match(html, /Bonus Bonanza/);
  const other = offers.find((offer) => offer.providerId !== 'mtn');
  assert.ok(other);
  assert.equal(render(React.createElement(SuperDataMigrationNotice, { offer: other })), '');
  assert.equal(currentMonthlyDealSnapshot.checkedAt, '2026-10-02');
  assert.ok(currentMonthlyDealSnapshot.offers.every((offer) => offer.source.checkedAt === '2026-10-02'));
});

test('editorial dates advance only for changed pages, preserving price and USSD review dates', () => {
  for (const route of ['/guides/cheapest-10gb-data-south-africa/', '/guides/cheapest-20gb-data-south-africa/']) {
    assert.equal(getRouteModifiedIso(route), '2026-10-12T00:00:00.000Z');
  }
  assert.equal(getNetworkPageModifiedIso('telkom'), '2026-10-12T00:00:00.000Z');
  assert.equal(getNetworkUssdModifiedIso('telkom'), '2026-09-01T00:00:00.000Z');
  assert.equal(getRouteModifiedIso('/best-10gb-data-deals-south-africa/'), '2026-10-02T00:00:00.000Z');
  assert.equal(getRouteModifiedIso('/best-30gb-data-deals-south-africa/'), '2026-10-02T00:00:00.000Z');
  assert.equal(getRouteModifiedIso('/best-data-deals-south-africa/'), '2026-10-02T00:00:00.000Z');
});
