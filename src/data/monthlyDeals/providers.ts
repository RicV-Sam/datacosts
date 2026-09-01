import {
  DEAL_PROVIDER_IDS,
  type DealHostNetworkId,
  type DealOfferSource,
  type DealProviderId,
  type DealProviderKind,
  type MonthlyDataDealOffer
} from './types';

export type DealHostNetworkRelationship =
  | { status: 'not_applicable'; checkedAt: string }
  | { status: 'not_confirmed'; checkedAt: string; note: string }
  | {
      status: 'confirmed';
      networkId: DealHostNetworkId;
      relationshipNote: string;
      source: DealOfferSource;
    };

export interface DealProviderProfile {
  id: DealProviderId;
  name: string;
  kind: DealProviderKind;
  hostNetwork: DealHostNetworkRelationship;
}

const CHECKED_AT = '2026-09-01';

export const dealProviderProfiles = {
  airmobile: {
    id: 'airmobile',
    name: 'AirMobile by Afrihost',
    kind: 'mvno',
    hostNetwork: {
      status: 'confirmed',
      networkId: 'mtn',
      relationshipNote: 'Afrihost describes AirMobile as its MVNO provided through MTN infrastructure. This relationship does not imply identical coverage, speeds or service priority.',
      source: {
        url: 'https://help.afrihost.com/entry/afrihost-airmobile-explained/',
        title: 'Afrihost AirMobile Explained | Help Centre',
        checkedAt: CHECKED_AT,
        official: true
      }
    }
  },
  'capitec-connect': {
    id: 'capitec-connect',
    name: 'Capitec Connect',
    kind: 'mvno',
    hostNetwork: {
      status: 'confirmed',
      networkId: 'mtn',
      relationshipNote: 'Capitec says Connect operates on MTN national network infrastructure through Cell C. This relationship does not imply identical coverage, speeds or service priority.',
      source: {
        url: 'https://www.capitecbank.co.za/were-here-to-help/faqs/',
        title: 'Capitec Connect FAQs',
        checkedAt: CHECKED_AT,
        official: true
      }
    }
  },
  'cell-c': {
    id: 'cell-c',
    name: 'Cell C',
    kind: 'network_operator',
    hostNetwork: { status: 'not_applicable', checkedAt: CHECKED_AT }
  },
  'fnb-connect': {
    id: 'fnb-connect',
    name: 'FNB Connect',
    kind: 'mvno',
    hostNetwork: {
      status: 'not_confirmed',
      checkedAt: CHECKED_AT,
      note: 'The current reviewed FNB pricing guide does not substantiate a host-network claim.'
    }
  },
  'melon-mobile': {
    id: 'melon-mobile',
    name: 'Melon Mobile',
    kind: 'mvno',
    hostNetwork: {
      status: 'confirmed',
      networkId: 'mtn',
      relationshipNote: 'Melon Mobile states that its service operates on the MTN network. This relationship does not imply identical coverage, speeds or service priority.',
      source: {
        url: 'https://www.melonmobile.co.za/legal/30-day-free-trial-terms-and-conditions',
        title: 'Melon Mobile 30-Day Free Trial terms',
        checkedAt: CHECKED_AT,
        official: true
      }
    }
  },
  mtn: {
    id: 'mtn',
    name: 'MTN',
    kind: 'network_operator',
    hostNetwork: { status: 'not_applicable', checkedAt: CHECKED_AT }
  },
  'nedbank-connect': {
    id: 'nedbank-connect',
    name: 'Nedbank Connect',
    kind: 'mvno',
    hostNetwork: {
      status: 'not_confirmed',
      checkedAt: CHECKED_AT,
      note: 'The current reviewed prepaid-bundle source does not substantiate a host-network claim.'
    }
  },
  'standard-bank-connect': {
    id: 'standard-bank-connect',
    name: 'Standard Bank Connect',
    kind: 'mvno',
    hostNetwork: {
      status: 'not_confirmed',
      checkedAt: CHECKED_AT,
      note: 'The current reviewed SIM-plan source does not substantiate a host-network claim.'
    }
  },
  telkom: {
    id: 'telkom',
    name: 'Telkom',
    kind: 'network_operator',
    hostNetwork: { status: 'not_applicable', checkedAt: CHECKED_AT }
  },
  vodacom: {
    id: 'vodacom',
    name: 'Vodacom',
    kind: 'network_operator',
    hostNetwork: { status: 'not_applicable', checkedAt: CHECKED_AT }
  }
} satisfies Record<DealProviderId, DealProviderProfile>;

export const dealProviders: DealProviderProfile[] = DEAL_PROVIDER_IDS.map(
  (providerId) => dealProviderProfiles[providerId]
);

export function getDealProviderProfile(providerId: DealProviderId): DealProviderProfile {
  return dealProviderProfiles[providerId];
}

export function isMvnoProviderId(providerId: DealProviderId): boolean {
  return dealProviderProfiles[providerId].kind === 'mvno';
}

export function isMvnoOffer(offer: Pick<MonthlyDataDealOffer, 'providerId'>): boolean {
  return isMvnoProviderId(offer.providerId);
}
