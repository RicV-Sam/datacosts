import { Bundle } from '../types';

export const MANUAL_PRICE_CHECK_NOTE =
  'Price check advised: this bundle may vary by SIM, app, promotion, region, or checkout flow. Confirm with the operator before buying.';

export function isVerifiedBundleSource(bundle: Bundle): boolean {
  return bundle.sourceConfidence === 'verified';
}

export function getBundleSourceNote(bundle: Bundle): string | null {
  if (bundle.sourceConfidence === 'manual_required') {
    return MANUAL_PRICE_CHECK_NOTE;
  }

  if (bundle.sourceConfidence === 'dynamic_checkout') {
    return 'Price may depend on the operator checkout flow. Confirm the final price before buying.';
  }

  if (bundle.sourceConfidence === 'personalised') {
    return 'Personalised offer: availability and price can vary by SIM, customer profile, and campaign.';
  }

  return null;
}

export function getBundleSourceSummary(bundle: Bundle): string | null {
  const parts = [
    bundle.sourceLabel,
    bundle.lastVerified ? `checked ${bundle.lastVerified}` : null,
    bundle.nightWindow ? `night window ${bundle.nightWindow}` : null
  ].filter((part): part is string => Boolean(part));

  return parts.length > 0 ? parts.join(' | ') : null;
}
