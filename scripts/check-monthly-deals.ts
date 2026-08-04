import {
  currentMonthlyDealSnapshot,
  getDealSizePath,
  getExpectedComparisonSizes,
  getCurrentOffersForSize,
  monthlyDealHistory,
  TRACKED_DATA_SIZES_GB,
  type DealProviderId
} from '../src/data/monthlyDeals';
import { getDealAwards, getDealOfferMetrics, isMonthlyComparable } from '../src/utils/monthlyDealRanking';
import { getRouteModifiedIso } from '../src/seo/contentDates';

const MAX_SOURCE_AGE_DAYS = 45;
const launchedSizes = [10, 20, 30] as const;
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
  }
}

const latestByMonth = [...monthlyDealHistory].sort((left, right) => right.month.localeCompare(left.month))[0];
if (currentMonthlyDealSnapshot.month !== latestByMonth.month) fail('Current snapshot is not the latest history entry');

const sourceAgeMs = Date.now() - new Date(`${currentMonthlyDealSnapshot.checkedAt}T23:59:59.999Z`).getTime();
if (sourceAgeMs > MAX_SOURCE_AGE_DAYS * 86_400_000) {
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
