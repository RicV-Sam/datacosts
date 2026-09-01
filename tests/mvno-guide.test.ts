import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  currentMonthlyDealSnapshot,
  dealProviders,
  getAdvertisedAllocationTotalGb,
  getExpectedComparisonSizes,
  getMaximumEligibleAllocationTotalGb,
  isMvnoProviderId,
  type DealDataAllocation
} from '../src/data/monthlyDeals';
import {
  MVNO_GUIDE_PATH,
  MVNO_PROVIDER_IDS,
  MVNO_REVIEWED_AT,
  mvnoProviderProfiles
} from '../src/data/mvnos';
import { getIndexableRoutes, getNoindexRoutes, getSitemapRoutes } from '../src/config/routeCatalog';

const EXPECTED_MVNO_PROVIDER_IDS = [
  'airmobile',
  'capitec-connect',
  'fnb-connect',
  'melon-mobile',
  'nedbank-connect',
  'standard-bank-connect'
] as const;

test('MVNO editorial profiles cover the six tracked MVNO providers exactly once', () => {
  const profileIds = mvnoProviderProfiles.map((profile) => profile.id);
  const providerRegistryIds = dealProviders
    .filter((provider) => provider.kind === 'mvno')
    .map((provider) => provider.id);

  assert.equal(mvnoProviderProfiles.length, EXPECTED_MVNO_PROVIDER_IDS.length);
  assert.equal(new Set(profileIds).size, profileIds.length, 'MVNO editorial profile IDs must be unique');
  assert.deepEqual([...MVNO_PROVIDER_IDS].sort(), [...EXPECTED_MVNO_PROVIDER_IDS].sort());
  assert.deepEqual([...profileIds].sort(), [...EXPECTED_MVNO_PROVIDER_IDS].sort());
  assert.deepEqual([...providerRegistryIds].sort(), [...EXPECTED_MVNO_PROVIDER_IDS].sort());
});

test('MVNO editorial evidence and benefits retain source, eligibility and ranking guardrails', () => {
  for (const profile of mvnoProviderProfiles) {
    assert.ok(profile.sources.length > 0, `${profile.id} must cite at least one official source`);
    const declaredSourceKeys = new Set(profile.sources.map((source) => `${source.title}\n${source.url}`));

    for (const source of profile.sources) {
      assert.equal(source.official, true, `${profile.id} source must be official`);
      assert.equal(source.checkedAt, MVNO_REVIEWED_AT, `${profile.id} source check date must match the guide review`);
      const parsed = new URL(source.url);
      assert.equal(parsed.protocol, 'https:', `${profile.id} source must use HTTPS`);
    }

    for (const benefit of profile.benefits) {
      assert.equal(
        benefit.includeInBaseRanking,
        false,
        `${profile.id} benefit "${benefit.title}" must remain outside base tariff rankings`
      );
      assert.equal(benefit.source.official, true, `${profile.id} benefit source must be official`);
      assert.equal(benefit.source.checkedAt, MVNO_REVIEWED_AT, `${profile.id} benefit source must use the guide review date`);
      assert.equal(new URL(benefit.source.url).protocol, 'https:', `${profile.id} benefit source must use HTTPS`);
      assert.ok(
        declaredSourceKeys.has(`${benefit.source.title}\n${benefit.source.url}`),
        `${profile.id} benefit "${benefit.title}" must reference a declared profile source`
      );

      if (benefit.kind === 'temporary_promotion') {
        assert.match(
          benefit.validThrough ?? '',
          /^\d{4}-\d{2}-\d{2}$/,
          `${profile.id} temporary promotion "${benefit.title}" needs a validThrough date`
        );
        assert.ok(
          Date.parse(`${benefit.validThrough}T23:59:59.999Z`) >= Date.parse(`${benefit.source.checkedAt}T00:00:00.000Z`),
          `${profile.id} temporary promotion "${benefit.title}" cannot expire before its source check`
        );
      }

      if (benefit.kind === 'bank_linked_reward') {
        assert.ok(
          benefit.eligibility?.trim(),
          `${profile.id} bank-linked benefit "${benefit.title}" must state its eligibility conditions`
        );
      }
    }

    if (profile.watchOutSource) {
      assert.equal(profile.watchOutSource.official, true, `${profile.id} watch-out source must be official`);
      assert.equal(profile.watchOutSource.checkedAt, MVNO_REVIEWED_AT, `${profile.id} watch-out source must use the guide review date`);
      assert.ok(
        declaredSourceKeys.has(`${profile.watchOutSource.title}\n${profile.watchOutSource.url}`),
        `${profile.id} watch-out source must be declared in the profile source register`
      );
    }
  }

  const melon = mvnoProviderProfiles.find((profile) => profile.id === 'melon-mobile');
  assert.ok(melon?.watchOutSource, 'Melon trial auto-conversion warning must link to official terms');
});

test('current MVNO tracker rows keep billing, payment and commitment as separate explicit fields', () => {
  const mvnoOffers = currentMonthlyDealSnapshot.offers.filter((offer) => isMvnoProviderId(offer.providerId));

  assert.equal(mvnoOffers.length, 19);
  assert.equal(mvnoOffers.filter((offer) => offer.billing === 'once_off').length, 9);
  assert.equal(mvnoOffers.filter((offer) => offer.billing === 'recurring_monthly').length, 10);
  assert.equal(mvnoOffers.filter((offer) => offer.commitment?.kind === 'once_off').length, 9);
  assert.equal(mvnoOffers.filter((offer) => offer.commitment?.kind === 'month_to_month').length, 8);
  assert.equal(mvnoOffers.filter((offer) => offer.commitment?.kind === 'not_confirmed').length, 2);
  assert.equal(mvnoOffers.filter((offer) => offer.commitment?.kind === 'fixed_term').length, 0);

  for (const offer of mvnoOffers) {
    assert.ok(offer.paymentModel, `${offer.id} needs an explicit payment model`);
    assert.ok(offer.commitment, `${offer.id} needs an explicit commitment classification`);

    if (offer.paymentModel?.kind === 'mixed' || offer.paymentModel?.kind === 'not_confirmed') {
      assert.ok(offer.paymentModel.note.trim(), `${offer.id} must explain its ${offer.paymentModel.kind} payment model`);
    }
    if (offer.commitment?.kind === 'not_confirmed') {
      assert.ok(offer.commitment.note.trim(), `${offer.id} must explain why commitment is not confirmed`);
    }
    if (offer.billing === 'once_off') {
      assert.equal(offer.commitment?.kind, 'once_off', `${offer.id} once-off billing must use once-off commitment`);
    } else {
      assert.ok(
        offer.commitment?.kind === 'month_to_month' || offer.commitment?.kind === 'not_confirmed',
        `${offer.id} recurring billing must not imply a fixed term`
      );
    }
  }
});

test('conditional bonus data stays outside normal advertised totals and size bands', () => {
  const conditionalOffers = currentMonthlyDealSnapshot.offers
    .filter((offer) => isMvnoProviderId(offer.providerId))
    .filter((offer) => (offer.allocation.conditionalBonusGb ?? 0) > 0);

  assert.ok(conditionalOffers.length > 0, 'the current MVNO tracker must retain a conditional-bonus example');

  for (const offer of conditionalOffers) {
    const withoutConditionalBonus: DealDataAllocation = {
      ...offer.allocation,
      conditionalBonusGb: undefined,
      conditionalBonusNote: undefined
    };
    assert.equal(
      getAdvertisedAllocationTotalGb(offer.allocation),
      getAdvertisedAllocationTotalGb(withoutConditionalBonus),
      `${offer.id} conditional bonus must not change the ordinary advertised total`
    );
    assert.deepEqual(
      getExpectedComparisonSizes(offer.allocation),
      getExpectedComparisonSizes(withoutConditionalBonus),
      `${offer.id} conditional bonus must not change its normal size bands`
    );
    assert.equal(
      getMaximumEligibleAllocationTotalGb(offer.allocation),
      getAdvertisedAllocationTotalGb(offer.allocation) + (offer.allocation.conditionalBonusGb ?? 0)
    );
  }

  const boundaryCrossingAllocation: DealDataAllocation = {
    anytimeGb: 9,
    nightGb: 0,
    streamingGb: 0,
    socialGb: 0,
    otherRestricted: [],
    conditionalBonusGb: 2,
    conditionalBonusNote: 'Only for an eligible linked customer.'
  };
  assert.equal(getAdvertisedAllocationTotalGb(boundaryCrossingAllocation), 9);
  assert.equal(getMaximumEligibleAllocationTotalGb(boundaryCrossingAllocation), 11);
  assert.deepEqual(getExpectedComparisonSizes(boundaryCrossingAllocation), [5]);
});

test('the canonical MVNO guide is indexable and included in the sitemap catalog', () => {
  assert.ok(getIndexableRoutes().includes(MVNO_GUIDE_PATH));
  assert.ok(getSitemapRoutes().includes(MVNO_GUIDE_PATH));
  assert.ok(!getNoindexRoutes().includes(MVNO_GUIDE_PATH));
});

test('the MVNO guide source preserves its decision labels and conservative structured-data types', async () => {
  const source = await readFile('src/pages/MvnoGuidePage.tsx', 'utf8');

  for (const label of ['Best for', 'Why it saves', 'Extra perks', 'What you need', 'Watch out']) {
    assert.ok(source.includes(label), `MVNO guide source is missing the "${label}" decision label`);
  }

  assert.match(source, /buildBreadcrumbSchema\(breadcrumbItems\)/);
  assert.match(source, /['"]@type['"]:\s*['"]Article['"]/);
  assert.match(source, /['"]@type['"]:\s*['"]ItemList['"]/);
  assert.doesNotMatch(
    source,
    /['"]@type['"]\s*:\s*['"](?:Product|Offer)['"]/i,
    'MVNO guide must not publish Product or Offer structured markup for conditional benefits'
  );
});
