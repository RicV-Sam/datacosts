export type PublisherConsentDecision = 'granted' | 'denied';

export type PublisherConsentState = {
  adStorage: PublisherConsentDecision;
  adUserData: PublisherConsentDecision;
  adPersonalization: PublisherConsentDecision;
  updatedAt: string;
};

export const PUBLISHER_CONSENT_STORAGE_KEY = 'datacost.publisherConsent.v1';

export const DEFAULT_PUBLISHER_CONSENT: PublisherConsentState = {
  adStorage: 'denied',
  adUserData: 'denied',
  adPersonalization: 'denied',
  updatedAt: '1970-01-01T00:00:00.000Z'
};

function isConsentDecision(value: unknown): value is PublisherConsentDecision {
  return value === 'granted' || value === 'denied';
}

export function readPublisherConsent(): PublisherConsentState {
  if (typeof window === 'undefined') return DEFAULT_PUBLISHER_CONSENT;

  const rawValue = window.localStorage.getItem(PUBLISHER_CONSENT_STORAGE_KEY);
  if (!rawValue) return DEFAULT_PUBLISHER_CONSENT;

  try {
    const parsed = JSON.parse(rawValue) as Partial<PublisherConsentState>;
    if (
      isConsentDecision(parsed.adStorage) &&
      isConsentDecision(parsed.adUserData) &&
      isConsentDecision(parsed.adPersonalization) &&
      typeof parsed.updatedAt === 'string'
    ) {
      return {
        adStorage: parsed.adStorage,
        adUserData: parsed.adUserData,
        adPersonalization: parsed.adPersonalization,
        updatedAt: parsed.updatedAt
      };
    }
  } catch {
    window.localStorage.removeItem(PUBLISHER_CONSENT_STORAGE_KEY);
  }

  return DEFAULT_PUBLISHER_CONSENT;
}

export function savePublisherConsent(consent: Omit<PublisherConsentState, 'updatedAt'>): PublisherConsentState {
  const nextConsent = {
    ...consent,
    updatedAt: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PUBLISHER_CONSENT_STORAGE_KEY, JSON.stringify(nextConsent));
  }

  return nextConsent;
}

export function canRequestPersonalizedAds(): boolean {
  const consent = readPublisherConsent();
  return (
    consent.adStorage === 'granted' &&
    consent.adUserData === 'granted' &&
    consent.adPersonalization === 'granted'
  );
}
