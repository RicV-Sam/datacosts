import { NetworkName } from '../types';
import { networkMetadata } from '../data';

const UTM_PARAMS = '?utm_source=datacost&utm_medium=referral&utm_campaign=datacost_tool';

export const trackAndRedirect = (network: NetworkName, source: 'calculator' | 'modal', bundleName?: string) => {
  const meta = networkMetadata[network];
  const url = `${meta.externalUrl}${UTM_PARAMS}`;

  // Google Analytics Event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'airtime_click', {
      network: network.toLowerCase(),
      location: window.location.pathname,
      source: source,
      bundle_name: bundleName
    });
  }

  // Lightweight tracking
  const message = bundleName
    ? `User clicked ${network} (${bundleName}) from ${source}`
    : `User clicked ${network} from ${source}`;

  console.log(message);

  window.open(url, '_blank', 'noopener,noreferrer');
};
