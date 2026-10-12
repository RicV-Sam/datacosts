import { bundles } from '../data';
import { currentMonthlyDealSnapshot, getExpectedComparisonSizes, type MonthlyDataDealOffer } from '../data/monthlyDeals';
import { parseDataAmountToGb } from './dataCalculator';
import { isVerifiedBundleSource } from './bundleSource';
import { comparisonOfferUpdates } from '../data/comparisonOfferUpdates';

/** Adapt recorded monthly bundles without changing historical snapshots or copying prices. */
export function getComparisonOfferCatalog(): MonthlyDataDealOffer[] {
  const offers = [...currentMonthlyDealSnapshot.offers, ...comparisonOfferUpdates];
  for (const bundle of bundles) {
    if (!isVerifiedBundleSource(bundle) || !bundle.sourceUrl || !bundle.sourceLabel || !bundle.lastVerified ||
      !['smartphone_once_off_data', 'prepaid_lte_router_data'].includes(bundle.productType ?? '') ||
      !/^30 days$/i.test(bundle.validity)) continue;
    const anytimeGb = parseDataAmountToGb(bundle.anytimeData);
    const nightGb = parseDataAmountToGb(bundle.nightData ?? '');
    if (!Number.isFinite(anytimeGb) || anytimeGb <= 0) continue;
    const providerId = ({ MTN: 'mtn', Vodacom: 'vodacom', Telkom: 'telkom', 'Cell C': 'cell-c' } as const)[bundle.network as 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C'];
    if (!providerId) continue;
    const productType = bundle.productType === 'prepaid_lte_router_data' ? 'prepaid_lte' : 'mobile_data';
    if (offers.some(offer => offer.providerId === providerId && offer.productType === productType &&
      offer.priceZar === bundle.price && offer.billing === 'once_off' &&
      offer.allocation.anytimeGb === anytimeGb && offer.allocation.nightGb === nightGb &&
      offer.validity.kind === 'days' && offer.validity.days === 30)) continue;
    const allocation = { anytimeGb, nightGb, streamingGb: 0, socialGb: 0, otherRestricted: [] };
    const router = productType === 'prepaid_lte';
    offers.push({
      id: `recorded-${bundle.id}`, providerId, providerName: bundle.network, offerName: bundle.name,
      comparisonSizesGb: getExpectedComparisonSizes(allocation),
      advertisedDataLabel: `${anytimeGb}GB anytime${nightGb ? ` + ${nightGb}GB night` : ''}`,
      priceZar: bundle.price, allocation, validity: { kind: 'days', days: 30, label: bundle.validity },
      billing: 'once_off', paymentModel: { kind: 'not_confirmed', note: 'Confirm payment requirements on the linked operator source.' },
      commitment: { kind: 'once_off' }, productType,
      accessTier: router ? 'qualifying_price_plan' : 'provider_customer',
      purchaseChannels: ['Confirm purchase channels with the operator'],
      eligibility: router ? 'Prepaid LTE/router product; confirm the required SIM, price plan and device on the official source.' : 'Requires a compatible operator SIM; confirm qualifying price plans on the official source.',
      importantNotes: [bundle.watchOut, bundle.note, bundle.nightWindow ? `Night window: ${bundle.nightWindow}` : nightGb ? 'Night hours are restricted; confirm the window on the official source.' : null].filter((note): note is string => Boolean(note)),
      rankingStatus: router ? 'context_only' : 'eligible',
      ...(router ? { rankingExclusionReason: 'LTE/router product shown for context; excluded from smartphone price awards.' } : {}),
      source: { url: bundle.sourceUrl, title: bundle.sourceLabel, checkedAt: bundle.lastVerified, official: true }
    });
  }
  return offers;
}
