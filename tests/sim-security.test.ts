import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { FixDetailPage, FixProblemPage } from '../src/pages/FixProblemPage';
import { GuidesIndex } from '../src/pages/GuidesIndex';
import { StolenPhoneGuidePage } from '../src/pages/StolenPhoneGuidePage';
import { getIndexableRoutes, getPrerenderRoutes, getSitemapRoutes } from '../src/config/routeCatalog';
import { getFixPage, getFixPagesByCluster, simSwapWarningFixSlugs } from '../src/data/fixes';
import { getRouteModifiedIso } from '../src/seo/contentDates';

const route = '/fix/sim-swap-fraud-south-africa/';
const nav = { onNavigate: () => {}, onScrollTo: () => {} };
function render(element: React.ReactElement) {
  return renderToStaticMarkup(React.createElement(MemoryRouter, {}, React.createElement(HelmetProvider, {}, element)));
}
test('security page is indexable, prerendered and included in the sitemap', () => {
  for (const routes of [getIndexableRoutes(), getPrerenderRoutes(), getSitemapRoutes()]) assert.ok(routes.includes(route));
  assert.equal(getFixPagesByCluster('sim-security').length, 1);
  assert.equal(getRouteModifiedIso(route), getFixPage('sim-swap-fraud-south-africa')?.publishedIso);
});
test('urgent security advice precedes recovery and complaint waiting periods', () => {
  const html = render(React.createElement(FixDetailPage, { ...nav, slug: 'sim-swap-fraud-south-africa' }));
  assert.match(html, /Signal loss alone does not confirm fraud/);
  assert.ok(html.indexOf('Act immediately') < html.indexOf('Recovery and follow-up'));
  assert.ok(html.indexOf('Contact your network and bank immediately') < html.indexOf('14 working days'));
  assert.match(html, /Do not wait for money to disappear/);
  assert.match(html, /nearest SAPS station/);
  assert.doesNotMatch(html, /Most likely cause|First thing to try|Step-by-Step Fix|2025-01-15T/);
  for (const source of getFixPage('sim-swap-fraud-south-africa')!.officialSources!) assert.ok(html.includes(source.href));
});
test('fix hub, guides and stolen-phone guide link to the same security page', () => {
  const pages = [React.createElement(FixProblemPage, nav), React.createElement(GuidesIndex, nav), React.createElement(StolenPhoneGuidePage, nav)];
  for (const page of pages) assert.ok(render(page).includes('href="' + route + '"'));
  assert.match(render(pages[0]), /id="sim-security"/);
});

test('phone and OTP troubleshooting exposes the fraud route before routine checks', () => {
  for (const slug of simSwapWarningFixSlugs) {
    assert.ok(getFixPage(slug), slug);
    const html = render(React.createElement(FixDetailPage, { ...nav, slug }));
    const warning = html.indexOf('id="sim-swap-warning"');
    assert.ok(warning >= 0 && warning < html.indexOf('Quick Answer'), slug);
    assert.ok(html.includes('href="' + route + '"'), slug);
    assert.match(html, /Signal loss alone does not prove fraud/);
    assert.match(html, /contact your bank too/);
  }
  for (const slug of ['rain-router-no-internet', 'mobile-hotspot-not-working-south-africa', 'dstv-e48-32-error', 'sim-swap-fraud-south-africa']) {
    const html = render(React.createElement(FixDetailPage, { ...nav, slug }));
    assert.doesNotMatch(html, /id="sim-swap-warning"/);
  }
});
