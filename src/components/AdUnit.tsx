import React from 'react';
import { AdPlacement, shouldRenderHouseAd, shouldReserveManualAdSlot } from '../config/ads';
import { FreehubPromo } from './FreehubPromo';

interface AdUnitProps {
  type: Extract<AdPlacement, 'aboveFold' | 'inContent' | 'stickyMobile'>;
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, className = '' }) => {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;

  if (shouldRenderHouseAd(pathname, type)) {
    return <FreehubPromo placement={type} className={className} />;
  }

  if (shouldReserveManualAdSlot(pathname)) {
    // TODO: Render real manual AdSense units here when publisher slot IDs are available.
    return null;
  }

  return null;
};
