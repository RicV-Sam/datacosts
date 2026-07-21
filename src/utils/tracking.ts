import { NetworkName } from '../types';
import { networkMetadata } from '../data';
import { normaliseCanonicalPath } from '../seo/wp1Measurement';
import { isStableAnalyticsId } from '../seo/wp1SourceFreshness';

const UTM_PARAMS = '?utm_source=datacost&utm_medium=referral&utm_campaign=datacost_tool';

type TrackingParams = Record<string, string | number | boolean | undefined>;

export const ANALYTICS_OPERATORS = ['mtn', 'vodacom', 'telkom', 'cell_c', 'rain'] as const;
export const USSD_CODE_TYPES = ['balance', 'airtime', 'data', 'recharge', 'transfer', 'account', 'support', 'promotion', 'other'] as const;
export const USSD_COPY_PLACEMENTS = ['homepage_finder', 'ussd_hub', 'network_ussd_page', 'save_ussd_tool'] as const;
export const QUICK_ANSWER_ACTION_TYPES = ['copy', 'dial', 'open_guide', 'open_operator'] as const;
export const QUICK_ANSWER_PLACEMENTS = ['quick_answer_primary', 'quick_answer_secondary'] as const;
export const DESTINATION_TYPES = ['internal_guide', 'operator_site', 'tel'] as const;

export type AnalyticsOperator = (typeof ANALYTICS_OPERATORS)[number];
export type UssdCodeType = (typeof USSD_CODE_TYPES)[number];
export type UssdCopyPlacement = (typeof USSD_COPY_PLACEMENTS)[number];
export type QuickAnswerActionType = (typeof QUICK_ANSWER_ACTION_TYPES)[number];
export type QuickAnswerPlacement = (typeof QUICK_ANSWER_PLACEMENTS)[number];
export type DestinationType = (typeof DESTINATION_TYPES)[number];

export interface CopyUssdCodeEvent {
  operator: AnalyticsOperator;
  codeType: UssdCodeType;
  codeId: string;
  placement: UssdCopyPlacement;
  canonicalPath?: string;
}

export interface QuickAnswerActionEvent {
  answerId: string;
  operator: AnalyticsOperator;
  actionType: QuickAnswerActionType;
  placement: QuickAnswerPlacement;
  destinationType?: DestinationType;
  canonicalPath?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event', eventName: string, params?: TrackingParams) => void;
    __PRERENDER_INJECTED?: boolean;
    __DATACOST_ANALYTICS_CONSENT?: 'granted' | 'denied' | 'unknown';
  }
}

function isPrerenderSnapshot(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;

  return (
    /HeadlessChrome|Prerender/i.test(navigator.userAgent || '') ||
    window.__PRERENDER_INJECTED === true ||
    navigator.webdriver === true
  );
}

function dataLayerAnalyticsConsent(): 'granted' | 'denied' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';
  if (window.__DATACOST_ANALYTICS_CONSENT) return window.__DATACOST_ANALYTICS_CONSENT;
  if (document.documentElement.dataset.analyticsConsent === 'denied') return 'denied';
  if (document.documentElement.dataset.analyticsConsent === 'granted') return 'granted';

  let latest: 'granted' | 'denied' | 'unknown' = 'unknown';
  for (const item of window.dataLayer ?? []) {
    const values = Array.from((item ?? []) as ArrayLike<unknown>);
    if (values[0] !== 'consent' || (values[1] !== 'default' && values[1] !== 'update')) continue;
    const consent = values[2] as { analytics_storage?: unknown } | undefined;
    if (consent?.analytics_storage === 'denied') latest = 'denied';
    if (consent?.analytics_storage === 'granted') latest = 'granted';
  }
  return latest;
}

export function canSendAnalytics(): boolean {
  return !isPrerenderSnapshot() && dataLayerAnalyticsConsent() !== 'denied';
}

export function trackEvent(eventName: string, params: TrackingParams = {}): void {
  if (!canSendAnalytics()) return;
  window.gtag?.('event', eventName, params);
}

function approvedValue<T extends readonly string[]>(values: T, value: unknown, field: string): T[number] {
  if (typeof value !== 'string' || !values.includes(value)) throw new Error(`Invalid ${field}`);
  return value;
}

function canonicalPath(value?: string): string {
  const input = value ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  return normaliseCanonicalPath(input);
}

export function toAnalyticsOperator(network: NetworkName): AnalyticsOperator {
  return network === 'Cell C' ? 'cell_c' : network.toLowerCase() as AnalyticsOperator;
}

export function toUssdCodeType(value: string): UssdCodeType {
  const normalized = value.toLowerCase();
  if (normalized.includes('balance')) return 'balance';
  if (normalized.includes('recharge') || normalized.includes('airtime / recharge')) return 'recharge';
  if (normalized.includes('transfer')) return 'transfer';
  if (normalized.includes('data') || normalized.includes('bundle')) return 'data';
  if (normalized.includes('account') || normalized.includes('number') || normalized.includes('sim')) return 'account';
  if (normalized.includes('support') || normalized.includes('customer')) return 'support';
  if (normalized.includes('promotion') || normalized.includes('deal')) return 'promotion';
  if (normalized.includes('airtime')) return 'airtime';
  return 'other';
}

export function trackCopyUssdCode(event: CopyUssdCodeEvent): void {
  if (!isStableAnalyticsId(event.codeId)) throw new Error('Invalid code_id');
  trackEvent('copy_ussd_code', {
    canonical_path: canonicalPath(event.canonicalPath),
    operator: approvedValue(ANALYTICS_OPERATORS, event.operator, 'operator'),
    code_type: approvedValue(USSD_CODE_TYPES, event.codeType, 'code_type'),
    code_id: event.codeId,
    placement: approvedValue(USSD_COPY_PLACEMENTS, event.placement, 'placement')
  });
}

export function trackQuickAnswerAction(event: QuickAnswerActionEvent): void {
  if (!isStableAnalyticsId(event.answerId)) throw new Error('Invalid answer_id');
  trackEvent('quick_answer_action', {
    canonical_path: canonicalPath(event.canonicalPath),
    answer_id: event.answerId,
    operator: approvedValue(ANALYTICS_OPERATORS, event.operator, 'operator'),
    action_type: approvedValue(QUICK_ANSWER_ACTION_TYPES, event.actionType, 'action_type'),
    placement: approvedValue(QUICK_ANSWER_PLACEMENTS, event.placement, 'placement'),
    destination_type: event.destinationType
      ? approvedValue(DESTINATION_TYPES, event.destinationType, 'destination_type')
      : undefined
  });
}

export async function copyUssdCodeToClipboard(value: string, event: CopyUssdCodeEvent): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(value);
    trackCopyUssdCode(event);
    return true;
  } catch {
    return false;
  }
}

export const trackAndRedirect = (network: NetworkName, source: 'calculator' | 'modal', bundleName?: string) => {
  const meta = networkMetadata[network];
  const url = `${meta.externalUrl}${UTM_PARAMS}`;

  // Lightweight tracking
  const message = bundleName
    ? `User clicked ${network} (${bundleName}) from ${source}`
    : `User clicked ${network} from ${source}`;

  console.log(message);

  trackEvent('outbound_click', { network, source, bundle_name: bundleName });

  window.open(url, '_blank', 'noopener,noreferrer');
};
