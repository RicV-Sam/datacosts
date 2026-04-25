import { NetworkName } from '../types';
import { networkMetadata } from '../data';
import type { AdPlacement } from '../config/ads';

const UTM_PARAMS = '?utm_source=datacost&utm_medium=referral&utm_campaign=datacost_tool';

type TrackingParams = Record<string, string | number | boolean | undefined>;

interface HouseAdTrackingParams {
  placement: AdPlacement;
  page_path: string;
  destination_url: string;
  variant: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event', eventName: string, params?: TrackingParams) => void;
    __PRERENDER_INJECTED?: boolean;
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

export function trackEvent(eventName: string, params: TrackingParams = {}): void {
  if (isPrerenderSnapshot()) return;
  window.gtag?.('event', eventName, params);
}

export function trackHouseAdView(params: HouseAdTrackingParams): void {
  trackEvent('freehub_house_ad_view', { ...params });
}

export function trackHouseAdClick(params: HouseAdTrackingParams): void {
  trackEvent('freehub_house_ad_click', { ...params });
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
