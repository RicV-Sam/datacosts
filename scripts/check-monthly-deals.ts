import {
  currentMonthlyDealSnapshot,
  DEAL_PROVIDER_IDS,
  dealProviderProfiles,
  dealProviders,
  getDealSizePath,
  getExpectedComparisonSizes,
  getCurrentOffersForSize,
  monthlyDealHistory,
  TRACKED_DATA_SIZES_GB,
  type DealProviderId
} from '../src/data/monthlyDeals';
import { getDealAwards, getDealOfferMetrics, isMonthlyComparable } from '../src/utils/monthlyDealRanking';
import { getRouteModifiedIso } from '../src/seo/contentDates';

const MAX_SOURCE_AGE_DAYS = 30;
const MAX_PROVIDER_RELATIONSHIP_AGE_DAYS = 90;
const launchedSizes = [10, 20, 30] as const;
const expectedMvnoIds = new Set<DealProviderId>([
  'airmobile',
  'capitec-connect',
  'fnb-connect',
  'melon-mobile',
  'nedbank-connect',
  'standard-bank-connect'
]);
const allowedHosts: Record<DealProviderId, string[]> = {
  airmobile: ['afrihost.com'],
  'capitec-connect': ['capitecbank.co.za'],
  'cell-c': ['cellc.co.za'],
  'fnb-connect': ['fnb.co.za'],
  'melon-mobile': ['melonmobile.co.za'],
  mtn: ['mtn.co.za'],
  'nedbank-connect': ['nedbank.co.za'],
  'standard-bank-connect': ['standardbank.co.za'],
  telkom: ['telkom.co.za'],
  vodacom: ['vodacom.co.za']
};

const errors: string[] = [];
const seenMonths = new Set<string>();
const seenOfferIds = new Set<string>();

function fail(message: string): void {
  errors.push(message);
}

function baseHost(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, '').replace(/^personal\./, '').replace(/^connect\./, '').replace(/^my\./, '');
}

function ageInDays(checkedAt: string): number {
  return (Date.now() - new Date(`${checkedAt}T23:59:59.999Z`).getTime()) / 86_400_000;
}

if (dealProviders.length !== DEAL_PROVIDER_IDS.length) {
  fail('Provider registry must contain every tracked provider exactly once');
}

for (const providerId of DEAL_PROVIDER_IDS) {
  const provider = dealProviderProfiles[providerId];
  if (provider.id !== providerId) fail(`${providerId} registry key and id differ`);
  const shouldBeMvno = expectedMvnoIds.has(providerId);
  if ((provider.kind === 'mvno') !== shouldBeMvno) fail(`${providerId} has the wrong provider kind`);

  const relationshipCheckedAt = provider.hostNetwork.status === 'confirmed'
    ? provider.hostNetwork.source.checkedAt
    : provider.hostNetwork.checkedAt;
  const relationshipAgeDays = ageInDays(relationshipCheckedAt);
  if (!Number.isFinite(relationshipAgeDays)) fail(`${providerId} has an invalid host-relationship check date`);
  if (relationshipAgeDays < -1) fail(`${providerId} host-relationship check date cannot be in the future`);
  if (relationshipAgeDays > MAX_PROVIDER_RELATIONSHIP_AGE_DAYS) {
    fail(`${providerId} host-relationship review is older than ${MAX_PROVIDER_RELATIONSHIP_AGE_DAYS} days`);
  }

  if (provider.kind === 'network_operator' && provider.hostNetwork.status !== 'not_applicable') {
    fail(`${providerId} is a network operator and must not claim a host network`);
  }
  if (provider.kind === 'mvno' && String(provider.hostNetwork.status) === 'not_applicable') {
    fail(`${providerId} is an MVNO and needs a confirmed or explicitly unconfirmed host relationship`);
  }
  if (provider.hostNetwork.status === 'confirmed') {
    if (!provider.hostNetwork.source.official) fail(`${providerId} host relationship is not officially sourced`);
    try {
      if (new URL(provider.hostNetwork.source.url).protocol !== 'https:') {
        fail(`${providerId} host-relationship source is not HTTPS`);
      }
    } catch {
      fail(`${providerId} has an invalid host-relationship source URL`);
    }
  }
}

for (const snapshot of monthlyDealHistory) {
  if (!/^\d{4}-\d{2}$/.test(snapshot.month)) fail(`Invalid snapshot month: ${snapshot.month}`);
  if (seenMonths.has(snapshot.month)) fail(`Duplicate snapshot month: ${snapshot.month}`);
  seenMonths.add(snapshot.month);
  if (!snapshot.checkedAt.startsWith(snapshot.month)) fail(`${snapshot.month} checkedAt must fall inside the snapshot month`);
  const checkedAtMs = new Date(`${snapshot.checkedAt}T23:59:59.999Z`).getTime();
  if (!Number.isFinite(checkedAtMs)) fail(`${snapshot.month} has an invalid checkedAt date`);
  if (checkedAtMs > Date.now() + 86_400_000) fail(`${snapshot.month} checkedAt cannot be in the future`);
  if (snapshot.offers.length === 0) fail(`${snapshot.month} has no offers`);

  for (const offer of snapshot.offers) {
    if (seenOfferIds.has(offer.id)) fail(`Duplicate offer id across history: ${offer.id}`);
    seenOfferIds.add(offer.id);
    if (!Number.isFinite(offer.priceZar) || offer.priceZar <= 0) fail(`${offer.id} has an invalid price`);
    if (offer.source.checkedAt !== snapshot.checkedAt) fail(`${offer.id} source date differs from its snapshot`);
    if (!offer.source.official) fail(`${offer.id} is not marked as an official source`);
    if (offer.purchaseChannels.length === 0) fail(`${offer.id} has no purchase channel`);
    if (offer.rankingStatus === 'eligible' && !isMonthlyComparable(offer)) fail(`${offer.id} is award-eligible but not monthly-comparable`);
    if (offer.rankingStatus === 'context_only' && !offer.rankingExclusionReason) fail(`${offer.id} needs a ranking exclusion reason`);
    if (offer.allocation.conditionalBonusGb && !offer.allocation.conditionalBonusNote) fail(`${offer.id} has an unexplained conditional bonus`);

    if (snapshot.month === currentMonthlyDealSnapshot.month) {
      const provider = dealProviderProfiles[offer.providerId];
      if (provider.name !== offer.providerName) fail(`${offer.id} provider name differs from the provider registry`);
      if (!offer.paymentModel) fail(`${offer.id} needs an explicit payment model in the current snapshot`);
      if (!offer.commitment) fail(`${offer.id} needs an explicit commitment in the current snapshot`);

      if (offer.paymentModel && (offer.paymentModel.kind === 'mixed' || offer.paymentModel.kind === 'not_confirmed') && !offer.paymentModel.note.trim()) {
        fail(`${offer.id} needs a note for its ${offer.paymentModel.kind} payment model`);
      }
      if (offer.commitment?.kind === 'fixed_term' && (!Number.isInteger(offer.commitment.months) || offer.commitment.months <= 0)) {
        fail(`${offer.id} has an invalid fixed-term month count`);
      }
      if (offer.commitment?.kind === 'not_confirmed' && !offer.commitment.note.trim()) {
        fail(`${offer.id} needs a note for its unconfirmed commitment`);
      }
      if (offer.billing === 'once_off' && offer.commitment?.kind !== 'once_off') {
        fail(`${offer.id} has once-off price cadence but not once-off commitment`);
      }
      if (offer.billing === 'recurring_monthly' && offer.commitment?.kind === 'once_off') {
        fail(`${offer.id} has recurring price cadence but once-off commitment`);
      }
      if ((offer.commitment?.kind === 'month_to_month' || offer.commitment?.kind === 'fixed_term') && offer.billing !== 'recurring_monthly') {
        fail(`${offer.id} has a recurring commitment but not recurring monthly price cadence`);
      }
    }

    for (const value of [
      offer.allocation.anytimeGb,
      offer.allocation.nightGb,
      offer.allocation.streamingGb,
      offer.allocation.socialGb,
      offer.allocation.conditionalBonusGb ?? 0,
      ...offer.allocation.otherRestricted.map((item) => item.gb)
    ]) {
      if (!Number.isFinite(value) || value < 0) fail(`${offer.id} has an invalid allocation`);
    }

    for (const size of offer.comparisonSizesGb) {
      if (!TRACKED_DATA_SIZES_GB.includes(size)) fail(`${offer.id} uses unsupported comparison size ${size}`);
    }
    const expectedComparisonSizes = getExpectedComparisonSizes(offer.allocation);
    if (JSON.stringify(offer.comparisonSizesGb) !== JSON.stringify(expectedComparisonSizes)) {
      fail(`${offer.id} comparison sizes must be ${expectedComparisonSizes.join(', ') || 'empty'} under the size-band contract`);
    }

    try {
      const parsed = new URL(offer.source.url);
      if (parsed.protocol !== 'https:') fail(`${offer.id} source is not HTTPS`);
      const hostname = baseHost(parsed.hostname);
      if (!allowedHosts[offer.providerId].some((host) => hostname === host || hostname.endsWith(`.${host}`))) {
        fail(`${offer.id} source host ${parsed.hostname} is not approved for ${offer.providerId}`);
      }
    } catch {
      fail(`${offer.id} has an invalid source URL`);
    }

    const metrics = getDealOfferMetrics(offer);
    if (metrics.advertisedTotalGb <= 0) fail(`${offer.id} has no advertised allocation`);
    if (metrics.costPerAdvertisedGb === null || metrics.costPerAdvertisedGb <= 0) fail(`${offer.id} has an invalid advertised R/GB`);
    if (metrics.maximumEligibleTotalGb < metrics.advertisedTotalGb) fail(`${offer.id} has an invalid conditional maximum`);
  }
}

const latestByMonth = [...monthlyDealHistory].sort((left, right) => right.month.localeCompare(left.month))[0];
if (currentMonthlyDealSnapshot.month !== latestByMonth.month) fail('Current snapshot is not the latest history entry');

if (ageInDays(currentMonthlyDealSnapshot.checkedAt) > MAX_SOURCE_AGE_DAYS) {
  fail(`Current monthly deal snapshot is older than ${MAX_SOURCE_AGE_DAYS} days`);
}

const publicDealPaths = [
  '/best-data-deals-south-africa/',
  ...launchedSizes.map((size) => getDealSizePath(size))
];
for (const path of publicDealPaths) {
  const contentDate = getRouteModifiedIso(path).slice(0, 10);
  if (contentDate !== currentMonthlyDealSnapshot.checkedAt) {
    fail(`${path} content date ${contentDate} must match snapshot check date ${currentMonthlyDealSnapshot.checkedAt}`);
  }
}

for (const size of launchedSizes) {
  const offers = getCurrentOffersForSize(size);
  if (offers.length < 4) fail(`${size}GB needs at least four official rows before launch`);
  const awards = getDealAwards(size, offers);
  if (!awards.bestOverall) fail(`${size}GB has no genuine-anytime winner`);
  if (!awards.lowestAdvertisedPrice) fail(`${size}GB has no advertised-price comparator`);
}

if (errors.length > 0) {
  console.error(`Monthly data deal validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Monthly data deal validation passed for ${monthlyDealHistory.length} snapshot(s), ${seenOfferIds.size} offer rows and ${launchedSizes.length} launched sizes.`);
