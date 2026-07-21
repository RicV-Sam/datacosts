import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import {
  canSendAnalytics,
  copyUssdCodeToClipboard,
  trackCopyUssdCode,
  trackQuickAnswerAction,
  type QuickAnswerActionEvent
} from '../src/utils/tracking';
import { getAnalyticsConsentAudit, updateAnalyticsConsent } from '../src/utils/analyticsConsent';

type CapturedEvent = [string, string, Record<string, unknown>];
const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalNavigator = globalThis.navigator;

function installBrowser(options: {
  windowConsent?: 'granted' | 'denied' | 'unknown';
  datasetConsent?: 'granted' | 'denied' | 'unknown';
  dataLayer?: unknown[];
  canonicalHref?: string;
  canonicalRawHref?: string;
  clipboardWrite?: (value: string) => Promise<void>;
} = {}) {
  const events: CapturedEvent[] = [];
  const browserWindow = {
    location: { href: 'https://datacost.co.za/ussd-codes-south-africa/?private=discarded#section', pathname: '/ussd-codes-south-africa/' },
    dataLayer: (options.dataLayer ?? []) as unknown[],
    __DATACOST_ANALYTICS_CONSENT: options.windowConsent,
    gtag: (...args: CapturedEvent) => events.push(args)
  };
  Object.defineProperty(globalThis, 'window', { configurable: true, value: browserWindow });
  const documentElement = { dataset: { analyticsConsent: options.datasetConsent } };
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      documentElement,
      querySelector: () => options.canonicalHref ? {
        href: options.canonicalHref,
        getAttribute: () => options.canonicalRawHref ?? options.canonicalHref
      } : null
    }
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent: 'Unit Test Browser',
      webdriver: false,
      clipboard: { writeText: options.clipboardWrite ?? (async () => undefined) }
    }
  });
  return { browserWindow, documentElement, events };
}

afterEach(() => {
  Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: originalNavigator });
});

const quickAnswer: QuickAnswerActionEvent = {
  answerId: 'qa.vodacom.data_balance',
  operator: 'vodacom',
  actionType: 'open_guide',
  placement: 'quick_answer_primary'
};

const deniedUpdate = ['consent', 'update', { analytics_storage: 'denied' }];

test('a stale dataset grant cannot override a later Consent Mode denial', () => {
  installBrowser({ datasetConsent: 'granted', dataLayer: [deniedUpdate] });
  assert.equal(canSendAnalytics(), false);
});

test('a stale window unknown or grant cannot override a later denial', () => {
  installBrowser({ windowConsent: 'unknown', dataLayer: [deniedUpdate] });
  assert.equal(canSendAnalytics(), false);
  installBrowser({ windowConsent: 'granted', dataLayer: [deniedUpdate] });
  assert.equal(canSendAnalytics(), false);
});

test('compatibility values cannot grant after a Consent Mode denial has already been consumed', () => {
  const windowCase = installBrowser({ dataLayer: [deniedUpdate] });
  assert.equal(canSendAnalytics(), false);
  windowCase.browserWindow.__DATACOST_ANALYTICS_CONSENT = 'granted';
  assert.equal(canSendAnalytics(), false);

  const datasetCase = installBrowser({ dataLayer: [deniedUpdate] });
  assert.equal(canSendAnalytics(), false);
  datasetCase.documentElement.dataset.analyticsConsent = 'granted';
  assert.equal(canSendAnalytics(), false);
});

test('compatibility-labelled updater calls cannot override a consumed denial', () => {
  installBrowser({ dataLayer: [deniedUpdate] });
  assert.equal(canSendAnalytics(), false);

  const compatibilityUpdate = updateAnalyticsConsent as unknown as (state: 'granted', source: string) => void;
  compatibilityUpdate('granted', 'window');
  assert.equal(canSendAnalytics(), false);

  compatibilityUpdate('granted', 'dataset');
  assert.equal(canSendAnalytics(), false);
});

test('a post-load denial immediately stops dispatch', () => {
  const { browserWindow, events } = installBrowser({ windowConsent: 'granted' });
  trackQuickAnswerAction(quickAnswer);
  browserWindow.dataLayer.push(deniedUpdate);
  trackQuickAnswerAction(quickAnswer);
  assert.equal(events.length, 1);
});

test('a syntax-valid but unregistered answer ID cannot dispatch', () => {
  const { events } = installBrowser({ windowConsent: 'granted' });
  assert.throws(() => trackQuickAnswerAction({ ...quickAnswer, answerId: 'qa.unregistered.safe_id' } as unknown as QuickAnswerActionEvent), /Invalid answer_id/);
  assert.equal(events.length, 0);
});

test('production callers cannot supply an arbitrary canonical path', () => {
  const { events } = installBrowser({ windowConsent: 'granted' });
  trackQuickAnswerAction({ ...quickAnswer, canonicalPath: 'https://attacker.example/private/path?secret=value#fragment' } as unknown as QuickAnswerActionEvent);
  assert.equal(events[0][2].canonical_path, '/ussd-codes-south-africa/');
});

test('no state and unknown preserve the approved default while initial denial suppresses', () => {
  installBrowser();
  assert.equal(canSendAnalytics(), true);
  installBrowser({ windowConsent: 'unknown' });
  assert.equal(canSendAnalytics(), true);
  installBrowser({ windowConsent: 'denied' });
  assert.equal(canSendAnalytics(), false);
});

test('conflicting initial sources resolve conservatively', () => {
  installBrowser({ windowConsent: 'granted', datasetConsent: 'denied' });
  assert.equal(canSendAnalytics(), false);
});

test('later authoritative updates can grant then deny without a reload', () => {
  const { browserWindow } = installBrowser({ windowConsent: 'denied' });
  assert.equal(canSendAnalytics(), false);
  browserWindow.dataLayer.push(['consent', 'update', { analytics_storage: 'granted' }]);
  assert.equal(canSendAnalytics(), true);
  browserWindow.dataLayer.push(['consent', 'update', { analytics_storage: 'denied' }]);
  assert.equal(canSendAnalytics(), false);
  browserWindow.dataLayer.push(['consent', 'update', { analytics_storage: 'unknown' }]);
  assert.equal(canSendAnalytics(), false);
});

test('the shared adapter exposes one ordered state to multiple consumers', () => {
  installBrowser({ windowConsent: 'denied' });
  assert.equal(canSendAnalytics(), false);
  updateAnalyticsConsent('granted');
  assert.equal(canSendAnalytics(), true);
  assert.equal(canSendAnalytics(), true);
  updateAnalyticsConsent('denied');
  assert.equal(canSendAnalytics(), false);
  assert.ok(getAnalyticsConsentAudit().some((entry) => entry.source === 'adapter' && entry.state === 'denied'));
});

test('a valid same-origin rendered canonical wins and is normalized', () => {
  const { events } = installBrowser({
    windowConsent: 'granted',
    canonicalHref: 'https://datacost.co.za/guides/example/index.html?discarded=yes#section'
  });
  trackQuickAnswerAction(quickAnswer);
  assert.equal(events[0][2].canonical_path, '/guides/example/');
});

test('an off-origin rendered canonical is rejected in favour of location', () => {
  const { events } = installBrowser({
    windowConsent: 'granted',
    canonicalHref: 'https://attacker.example/private/'
  });
  trackQuickAnswerAction(quickAnswer);
  assert.equal(events[0][2].canonical_path, '/ussd-codes-south-africa/');
});

test('a raw protocol-relative rendered canonical is rejected in favour of location', () => {
  const { events } = installBrowser({
    windowConsent: 'granted',
    canonicalRawHref: '//datacost.co.za/guides/example/',
    canonicalHref: 'https://datacost.co.za/guides/example/'
  });
  trackQuickAnswerAction(quickAnswer);
  assert.equal(events[0][2].canonical_path, '/ussd-codes-south-africa/');
});

test('registered analytics IDs reject the wrong operator or code type before dispatch', () => {
  const { events } = installBrowser({ windowConsent: 'granted' });
  assert.throws(() => trackQuickAnswerAction({ ...quickAnswer, operator: 'mtn' } as QuickAnswerActionEvent), /operator/i);
  assert.throws(() => trackCopyUssdCode({
    codeId: 'ussd.mtn.balance_main',
    operator: 'vodacom',
    codeType: 'promotion',
    placement: 'ussd_hub'
  } as never), /(operator|code_type)/i);
  assert.equal(events.length, 0);
});

test('consent is re-checked between the click and asynchronous dispatch', async () => {
  let completeWrite: (() => void) | undefined;
  const { browserWindow, events } = installBrowser({
    windowConsent: 'granted',
    clipboardWrite: () => new Promise<void>((resolve) => { completeWrite = resolve; })
  });
  const pending = copyUssdCodeToClipboard('*136#', {
    operator: 'mtn',
    codeType: 'balance',
    codeId: 'ussd.mtn.balance_main',
    placement: 'ussd_hub'
  });
  browserWindow.dataLayer.push(deniedUpdate);
  completeWrite?.();
  assert.equal(await pending, true);
  assert.equal(events.length, 0);
});
