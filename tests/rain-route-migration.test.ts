import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { getIndexableRoutes, getPrerenderRoutes, getSitemapRoutes } from '../src/config/routeCatalog';
import { getRedirectAlias, REDIRECT_ALIASES } from '../src/config/redirectAliases';
import { bundles } from '../src/data';
import { NetworkPage } from '../src/pages/NetworkPage';
import { getNetworkModifiedIso, getNetworkPageModifiedIso, getNetworkUssdModifiedIso } from '../src/seo/contentDates';

const LEGACY_RAIN_PATH = '/network/rain/rain-unlimited-4g-data-price/';
const CANONICAL_RAIN_PATH = '/network/rain/';

function renderNetwork(slug: string): string {
  return renderToStaticMarkup(React.createElement(MemoryRouter, {},
    React.createElement(HelmetProvider, {}, React.createElement(NetworkPage, {
      networkSlug: slug, onNavigate: () => {}, onScrollTo: () => {}
    }))));
}

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
  assert.equal(bundle.name, 'Rain unlimited home up to 30Mbps');
  assert.equal(bundle.sourceUrl, 'https://www.rain.co.za/5Ghomewifi');
  assert.equal(bundle.lastVerified, '2026-10-02');

  assert.ok(!getPrerenderRoutes().includes('/network/rain/rain-unlimited-5g-data-price/'));
});

test('Rain renders unlimited home plans and qualified account help without prepaid USSD promises', () => {
  const html = renderNetwork('rain');
  const table = html.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/)?.[1] ?? '';
  assert.ok(table, 'Rain price table must render without JavaScript');
  assert.equal((table.match(/Not applicable — unlimited plan/g) ?? []).length, 2);
  assert.equal((table.match(/Monthly plan/g) ?? []).length, 2);
  assert.match(html, /Not applicable — unlimited plan/);
  assert.doesNotMatch(html, /R0\.00\/GB|Monthly Once-off|Rain prepaid bundle prices|Rain airtime advance codes|commonly used Rain USSD/);
  assert.match(html, /Listed Rain home-internet plans/);
  assert.match(html, /Rain account and balance help/);
  assert.match(html, /legacy 4G Mobile Services terms/);
  assert.match(html, /href="https:\/\/www\.rain\.co\.za\/faqs"[^>]*>Rain&#x27;s official FAQ/);
  assert.match(html, /Official Rain account help/);
  assert.doesNotMatch(html, /href="\/fix\/rain-balance-check\/"/);
  assert.match(table, /R679/);
  assert.match(table, /R799/);
});

test('finite MTN value formatting and other operator copy survive the scoped corrections', () => {
  const mtn = renderNetwork('mtn');
  assert.match(mtn, /R\d+\.\d{2}\/GB/);
  assert.match(mtn, /Monthly Once-off/);
  assert.match(mtn, /MTN USSD codes/);
  assert.match(mtn, /Personalised offers vary by SIM, tariff and campaign/);
  assert.doesNotMatch(mtn, /Personalised deals such as Just 4 You/);
  const vodacom = renderNetwork('vodacom');
  assert.match(vodacom, /Vodacom prepaid bundle prices/);
  assert.match(vodacom, /Personalised deals such as Just 4 You/);
  assert.doesNotMatch(vodacom, /Not applicable — unlimited plan/);
});

test('page corrections do not recertify Rain or MTN pricing and USSD evidence', () => {
  for (const slug of ['rain', 'mtn']) {
    assert.equal(getNetworkPageModifiedIso(slug), '2026-10-22T00:00:00.000Z');
    assert.equal(getNetworkModifiedIso(slug), '2026-10-02T00:00:00.000Z');
    assert.equal(getNetworkUssdModifiedIso(slug), '2026-09-01T00:00:00.000Z');
  }
});
