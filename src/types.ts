export type NetworkName = 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C' | 'Rain';

export interface Bundle {
  id: string;
  slug: string;
  network: NetworkName;
  name: string;
  price: number;
  volume: string; // e.g. "10GB"
  validity: string; // e.g. "30 Days"
  type: 'Prepaid' | 'Contract' | 'Monthly' | 'Weekly' | 'Daily' | 'Hourly' | 'Social';
  anytimeData: string;
  nightData?: string;
  costPerGb: number;
  isBestValue?: boolean;
  isSpeedKing?: boolean;
  bestFor?: string;
  note?: string;
  watchOut?: string;
}

export interface NetworkStats {
  network: NetworkName;
  coverage: string;
  avgSpeed5G: string;
  resilience: string;
  pricePoint: string;
}

export interface NetworkMetadata {
  name: NetworkName;
  color: string;
  textColor: string;
  logoLetter: string;
  description: string;
  ussdBalance: string;
  externalUrl: string;
}

export type USSDCategory =
  | 'Balance'
  | 'Airtime / Recharge'
  | 'Data / Bundles'
  | 'Transfers'
  | 'Number / SIM info'
  | 'Self-service / Account'
  | 'Support / Customer care'
  | 'Promotions'
  | 'Promotions / Advance airtime / Extras'
  | 'Other';

export interface USSDEntry {
  network: NetworkName;
  category: USSDCategory;
  action: string;
  code: string;
  explanation: string;
  status: 'verified' | 'needs review';
  note?: string;
  dialable?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GuideStep {
  id?: string;
  title: string;
  description: string;
}

export interface GuideJumpLink {
  label: string;
  anchor: string;
}

export interface GuideResourceLink {
  href: string;
  label: string;
  description: string;
  action?: 'guide' | 'route';
  slug?: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  quickSummaryTitle?: string;
  quickSummaryItems?: string[];
  jumpLinksTitle?: string;
  jumpLinks?: GuideJumpLink[];
  stepsTitle?: string;
  steps?: GuideStep[];
  commonMistakesTitle?: string;
  commonMistakes?: GuideStep[];
  nextStepsTitle?: string;
  nextSteps?: GuideResourceLink[];
  faq: FAQ[];
  comparisonType?: '1gb' | 'night' | 'best-value' | 'all';
  additionalContent?: string;
}

export type NavigateFunction = (
  page: 'home' | 'ussd' | 'alerts' | 'guide' | 'network' | 'guides-index' | 'travel-sims' | 'fix-problem',
  slug?: string
) => void;
