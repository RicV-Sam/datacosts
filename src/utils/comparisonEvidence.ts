import type { MonthlyDataDealOffer } from '../data/monthlyDeals/types';

const OFFICIAL_HOSTS: Record<MonthlyDataDealOffer['providerId'], string> = {
  airmobile: 'afrihost.com', 'capitec-connect': 'capitecbank.co.za', 'cell-c': 'cellc.co.za',
  'fnb-connect': 'fnb.co.za', 'melon-mobile': 'melonmobile.co.za', mtn: 'mtn.co.za',
  'nedbank-connect': 'nedbank.co.za', 'standard-bank-connect': 'standardbank.co.za',
  telkom: 'telkom.co.za', vodacom: 'vodacom.co.za'
};

export function hasRecordedOfferEvidence(offer: MonthlyDataDealOffer, now = new Date()): boolean {
  let url: URL;
  try { url = new URL(offer.source.url); } catch { return false; }
  const host = OFFICIAL_HOSTS[offer.providerId];
  const checked = Date.parse(`${offer.source.checkedAt}T00:00:00Z`);
  const age = now.getTime() - checked;
  const allocations = [offer.allocation.anytimeGb, offer.allocation.nightGb, offer.allocation.socialGb,
    offer.allocation.streamingGb, ...offer.allocation.otherRestricted.map(item => item.gb)];
  return offer.source.official === true && url.protocol === 'https:' && !url.username && !url.password &&
    (url.hostname === host || url.hostname.endsWith(`.${host}`)) &&
    /^\d{4}-\d{2}-\d{2}$/.test(offer.source.checkedAt) && Number.isFinite(age) && new Date(checked).toISOString().slice(0, 10) === offer.source.checkedAt && age >= 0 &&
    Number.isFinite(offer.priceZar) && offer.priceZar > 0 &&
    allocations.every(value => Number.isFinite(value) && value >= 0) &&
    Boolean(offer.eligibility.trim()) && Boolean(offer.validity.label.trim());
}

export function hasCurrentOfferEvidence(offer: MonthlyDataDealOffer, now = new Date()): boolean {
  const age = now.getTime() - Date.parse(`${offer.source.checkedAt}T00:00:00Z`);
  return hasRecordedOfferEvidence(offer, now) && age < 30 * 86400000;
}
