import { NetworkName } from '../types';
import { networkMetadata } from '../data';

const UTM_PARAMS = '?utm_source=datacost&utm_medium=referral&utm_campaign=datacost_tool';

export const trackAndRedirect = (network: NetworkName, source: 'calculator' | 'modal', bundleName?: string) => {
  const meta = networkMetadata[network];
  const url = `${meta.externalUrl}${UTM_PARAMS}`;

  // Lightweight tracking
  const message = bundleName
    ? `User clicked ${network} (${bundleName}) from ${source}`
    : `User clicked ${network} from ${source}`;

  console.log(message);

  // Future: Add GA or other tracking tools here
  // window.gtag?.('event', 'outbound_click', { network, source, bundle_name: bundleName });

  window.open(url, '_blank', 'noopener,noreferrer');
};
