import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import {
  copyUssdCodeToClipboard,
  trackQuickAnswerAction,
  type CopyUssdCodeEvent,
  type QuickAnswerActionEvent
} from '../src/utils/tracking';

type CapturedEvent = [string, string, Record<string, unknown>];
const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalNavigator = globalThis.navigator;

function installBrowser(options: { clipboardFails?: boolean; consent?: 'granted' | 'denied'; prerender?: boolean } = {}) {
  const events: CapturedEvent[] = [];
  const writes: string[] = [];
  const browserWindow = {
    location: { href: 'https://datacost.co.za/ussd-codes-south-africa/index.html', pathname: '/ussd-codes-south-africa/index.html' },
    dataLayer: [],
    __DATACOST_ANALYTICS_CONSENT: options.consent,
    __PRERENDER_INJECTED: options.prerender,
    gtag: (...args: CapturedEvent) => events.push(args)
  };
  Object.defineProperty(globalThis, 'window', { configurable: true, value: browserWindow });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement: { dataset: {} }, querySelector: () => null } });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent: options.prerender ? 'Prerender' : 'Unit Test Browser',
      webdriver: options.prerender === true,
      clipboard: {
        writeText: async (value: string) => {
          if (options.clipboardFails) throw new Error('denied');
          writes.push(value);
        }
      }
    }
  });
  return { events, writes };
}

afterEach(() => {
  Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: originalNavigator });
});

const copyEvent: CopyUssdCodeEvent = {
  operator: 'mtn',
  codeType: 'balance',
  codeId: 'ussd.mtn.balance_main',
  placement: 'ussd_hub'
};

test('one successful clipboard action emits one canonical, allowlisted event without clipboard text', async () => {
  const { events, writes } = installBrowser({ consent: 'granted' });
  const success = await copyUssdCodeToClipboard('*136#', copyEvent);
  assert.equal(success, true);
  assert.deepEqual(writes, ['*136#']);
  assert.equal(events.length, 1);
  assert.equal(events[0][1], 'copy_ussd_code');
  assert.deepEqual(events[0][2], {
    canonical_path: '/ussd-codes-south-africa/',
    operator: 'mtn',
    code_type: 'balance',
    code_id: 'ussd.mtn.balance_main',
    placement: 'ussd_hub'
  });
  assert.equal(JSON.stringify(events).includes('*136#'), false);
});

test('failed clipboard action emits no success event', async () => {
  const { events } = installBrowser({ clipboardFails: true, consent: 'granted' });
  assert.equal(await copyUssdCodeToClipboard('*136#', copyEvent), false);
  assert.equal(events.length, 0);
});

test('denied consent, prerendering and automated generation suppress events', async () => {
  let browser = installBrowser({ consent: 'denied' });
  assert.equal(await copyUssdCodeToClipboard('*136#', copyEvent), true);
  assert.equal(browser.events.length, 0);

  browser = installBrowser({ consent: 'granted', prerender: true });
  assert.equal(await copyUssdCodeToClipboard('*136#', copyEvent), true);
  assert.equal(browser.events.length, 0);
});

test('quick-answer contract uses only controlled IDs/enums and does not need Release B UI', () => {
  const { events } = installBrowser({ consent: 'granted' });
  const event: QuickAnswerActionEvent = {
    answerId: 'qa.vodacom.data_balance',
    operator: 'vodacom',
    actionType: 'open_guide',
    placement: 'quick_answer_primary',
    destinationType: 'internal_guide'
  };
  trackQuickAnswerAction(event);
  assert.deepEqual(events[0][2], {
    canonical_path: '/ussd-codes-south-africa/',
    answer_id: 'qa.vodacom.data_balance',
    operator: 'vodacom',
    action_type: 'open_guide',
    placement: 'quick_answer_primary',
    destination_type: 'internal_guide'
  });
});

test('unknown enum values and unsafe IDs are rejected before dispatch', () => {
  const { events } = installBrowser({ consent: 'granted' });
  assert.throws(() => trackQuickAnswerAction({ ...({
    answerId: 'user_input_must_not_be_sent',
    operator: 'vodacom',
    actionType: 'open_guide',
    placement: 'quick_answer_primary'
  } as unknown as QuickAnswerActionEvent) }), /Invalid answer_id/);
  assert.throws(() => trackQuickAnswerAction({
    answerId: 'qa.vodacom.data_balance',
    operator: 'vodacom',
    actionType: 'free_text' as QuickAnswerActionEvent['actionType'],
    placement: 'quick_answer_primary'
  }), /Invalid action_type/);
  assert.equal(events.length, 0);
});

