import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import {
  trackDealOfferSourceClick,
  trackDealSizeNavigation,
  type DealOfferSourceClickEvent
} from '../src/utils/tracking';

type CapturedEvent = [string, string, Record<string, unknown>];

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalNavigator = globalThis.navigator;

function installBrowser(consent: 'granted' | 'denied' = 'granted') {
  const events: CapturedEvent[] = [];
  const canonicalHref = 'https://datacost.co.za/best-20gb-data-deals-south-africa/';
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { href: canonicalHref, pathname: '/best-20gb-data-deals-south-africa/' },
      dataLayer: [],
      __DATACOST_ANALYTICS_CONSENT: consent,
      gtag: (...args: CapturedEvent) => events.push(args)
    }
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      documentElement: { dataset: {} },
      querySelector: () => ({ getAttribute: () => canonicalHref, href: canonicalHref })
    }
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { userAgent: 'Unit Test Browser', webdriver: false }
  });
  return events;
}

afterEach(() => {
  Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: originalNavigator });
});

test('deal events use the rendered canonical and controlled low-cardinality fields', () => {
  const events = installBrowser();

  trackDealOfferSourceClick({
    providerId: 'vodacom',
    offerId: 'vodacom-prepaid-lte-10-plus-10-2026-09',
    targetGb: 20,
    placement: 'comparison_card'
  });
  trackDealSizeNavigation({ targetGb: 30, sourceGb: 20, placement: 'size_switcher' });

  assert.deepEqual(events, [
    ['event', 'deal_offer_source_click', {
      canonical_path: '/best-20gb-data-deals-south-africa/',
      provider_id: 'vodacom',
      offer_id: 'vodacom-prepaid-lte-10-plus-10-2026-09',
      target_gb: 20,
      placement: 'comparison_card'
    }],
    ['event', 'deal_size_navigation', {
      canonical_path: '/best-20gb-data-deals-south-africa/',
      target_gb: 30,
      source_gb: 20,
      placement: 'size_switcher'
    }]
  ]);
});

test('deal events respect denied consent and reject uncontrolled identifiers', () => {
  const events = installBrowser('denied');
  trackDealSizeNavigation({ targetGb: 10, placement: 'hub_summary' });
  assert.equal(events.length, 0);

  assert.throws(() => trackDealOfferSourceClick({
    providerId: 'vodacom',
    offerId: 'unsafe user input',
    targetGb: 20,
    placement: 'comparison_table'
  } as DealOfferSourceClickEvent), /Invalid offer_id/);
  assert.throws(() => trackDealSizeNavigation({
    targetGb: 25 as never,
    placement: 'related_deals'
  }), /Invalid target_gb/);
  assert.equal(events.length, 0);
});
