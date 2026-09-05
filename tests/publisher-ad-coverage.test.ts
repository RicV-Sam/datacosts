import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { ADSENSE_AUTO_ADS_LOADER, ADSENSE_SCRIPT_URL } from '../src/config/adsense';
import { canRenderPublisherAdsOnRoute } from '../src/config/publisherReadiness';
import { getIndexableFixRoutes, getNoindexRoutes } from '../src/config/routeCatalog';
import { getRedirectAliasRoutes } from '../src/config/redirectAliases';

test('published fix guides and editorial pages remain eligible for AdSense', () => {
  const noindexRoutes = getNoindexRoutes();
  const contentRoutes = [
    '/', '/fix/', '/fix/vodacom-data-not-working/',
    '/about/', '/africa-expansion/', '/editorial-policy/', '/methodology/',
    '/contact/', '/privacy-policy/', '/save-ussd-codes/', '/terms/',
    ...getIndexableFixRoutes()
  ];
  for (const route of contentRoutes) {
    assert.equal(canRenderPublisherAdsOnRoute(route, noindexRoutes), true, route);
  }
});

test('navigation, unfinished, noindex and redirect pages remain excluded from AdSense', () => {
  const noindexRoutes = getNoindexRoutes();
  const excludedRoutes = [
    '/404/', '/alerts/', '/sitemap/', '/cookie-policy/',
    ...noindexRoutes, ...getRedirectAliasRoutes()
  ];
  for (const route of excludedRoutes) {
    assert.equal(canRenderPublisherAdsOnRoute(route, noindexRoutes), false, route);
  }
});

test('AdSense waits for stable React content and loads only once', () => {
  const appended: Array<Record<string, unknown>> = [];
  const events = new EventTarget();
  const document = {
    addEventListener: events.addEventListener.bind(events),
    querySelector: () => appended.find((script) => script.src === ADSENSE_SCRIPT_URL),
    createElement: () => ({}),
    head: { appendChild: (script: Record<string, unknown>) => appended.push(script) }
  };
  const loader = ADSENSE_AUTO_ADS_LOADER.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
  // Even if an integration registers the loader twice, no duplicate request.
  runInNewContext(loader, { document });
  runInNewContext(loader, { document });
  assert.equal(appended.length, 0, 'must not run while React replaces the prerendered root');
  events.dispatchEvent(new Event('render-event'));
  events.dispatchEvent(new Event('render-event'));
  assert.equal(appended.length, 1);
  assert.equal(appended[0].src, ADSENSE_SCRIPT_URL);
  assert.equal(appended[0].async, true);
  assert.equal(appended[0].crossOrigin, 'anonymous');
});
