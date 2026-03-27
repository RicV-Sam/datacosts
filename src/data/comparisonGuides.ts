import { NetworkName } from '../types';

export type ComparisonGuideSlug =
  | 'cheapest-1gb-data-south-africa'
  | 'cheapest-10gb-data-south-africa'
  | 'best-monthly-data-deals-south-africa'
  | 'best-prepaid-data-deals-south-africa'
  | 'cheapest-whatsapp-bundles-south-africa'
  | 'cheap-night-data-south-africa';

export type ComparisonGuideMode =
  | 'cheapest-1gb'
  | 'cheapest-10gb'
  | 'best-monthly'
  | 'best-prepaid'
  | 'cheapest-whatsapp'
  | 'cheap-night';

export interface ComparisonLink {
  href: string;
  label: string;
  description: string;
}

export interface ComparisonFaq {
  question: string;
  answer: string;
}

export interface ComparisonGuideDefinition {
  slug: ComparisonGuideSlug;
  mode: ComparisonGuideMode;
  canonicalPath: string;
  aliases?: string[];
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  tableTitle: string;
  quickHeading: string;
  watchOuts: string[];
  savingsTips: string[];
  trustLine: string;
  faqs: ComparisonFaq[];
  links: ComparisonLink[];
  coverageFirstNetwork?: NetworkName;
}

export const comparisonGuideDefinitions: Record<ComparisonGuideSlug, ComparisonGuideDefinition> = {
  'cheapest-1gb-data-south-africa': {
    slug: 'cheapest-1gb-data-south-africa',
    mode: 'cheapest-1gb',
    canonicalPath: '/guides/cheapest-1gb-data-south-africa/',
    title: 'Cheapest 1GB Data in South Africa (2026) | DataCost',
    metaDescription:
      'Compare the cheapest 1GB data in South Africa. See network-by-network prices, validity, value trade-offs, and practical prepaid watch-outs for 2026.',
    h1: 'Cheapest 1GB Data in South Africa (2026)',
    intro:
      'This page compares currently listed 1GB-style prepaid bundles across South Africa so you can choose based on both upfront price and real-world validity. For many users, the key decision is not only who is cheapest, but whether daily, weekly, or monthly 1GB fits actual usage.',
    tableTitle: '1GB Comparison Across Major Networks',
    quickHeading: 'Which network has the cheapest 1GB data right now?',
    watchOuts: [
      'Daily 1GB can look cheap upfront but become expensive if repeated all month.',
      'Weekly 1GB can be a useful middle ground, but often still costs more per GB than monthly bundles.',
      'Personalised offers can beat listed menu pricing, but they vary by SIM and period.'
    ],
    savingsTips: [
      'Check operator personalised menus first before paying standard listed rates.',
      'Match validity to your habit: daily for short bursts, monthly for controlled regular use.',
      'Avoid relying on airtime browsing after bundle expiry to prevent out-of-bundle leakage.'
    ],
    trustLine:
      'We compare publicly listed prepaid pricing and practical validity behavior to highlight real 1GB value, not just headline bundle names.',
    faqs: [
      {
        question: 'Which network currently has the cheapest listed 1GB data in South Africa?',
        answer: 'The cheapest listed option can rotate as promos change. Use the comparison rows on this page as a current benchmark and confirm final checkout pricing on operator channels.'
      },
      {
        question: 'Is daily, weekly, or monthly 1GB best?',
        answer: 'Daily is usually cheapest upfront, weekly is a middle ground, and monthly often provides better control for regular users. The best option depends on how often you actually buy data.'
      },
      {
        question: 'Can personalised deals beat these listed 1GB prices?',
        answer: 'Yes. Personalised channels such as Just 4 You, Made4U, and similar offer structures can be cheaper than standard menu pricing for some users.'
      },
      {
        question: 'What should I check before buying a 1GB bundle?',
        answer: 'Check validity, usage window, and cost per GB together. A low headline price can still be poor value if validity is too short for your usage.'
      }
    ],
    links: [
      { href: '/network/vodacom/cheapest-1gb/', label: 'Vodacom cheapest 1GB', description: 'Compare Vodacom 1GB intent page.' },
      { href: '/network/mtn/cheapest-1gb/', label: 'MTN cheapest 1GB', description: 'Compare MTN 1GB intent page.' },
      { href: '/network/telkom/cheapest-1gb/', label: 'Telkom cheapest 1GB', description: 'Compare Telkom 1GB intent page.' },
      { href: '/network/cell-c/cheapest-1gb/', label: 'Cell C cheapest 1GB', description: 'Compare Cell C 1GB intent page.' },
      { href: '/guides/how-to-buy-data-vodacom/', label: 'How to buy Vodacom data', description: 'Step-by-step Vodacom buy route.' },
      { href: '/guides/how-to-buy-data-mtn/', label: 'How to buy MTN data', description: 'Step-by-step MTN buy route.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-10gb-data-south-africa': {
    slug: 'cheapest-10gb-data-south-africa',
    mode: 'cheapest-10gb',
    canonicalPath: '/guides/cheapest-10gb-data-south-africa/',
    title: 'Cheapest 10GB Data Deals South Africa (2026) | DataCost',
    metaDescription:
      'Find the cheapest 10GB data deals in South Africa. Compare 10GB bundles by network, cost per GB, and practical fit for heavier prepaid users.',
    h1: 'Cheapest 10GB Data Deals South Africa (2026)',
    intro:
      '10GB bundles are often the entry point where prepaid users move from short top-ups to more stable monthly usage. This comparison focuses on currently listed 10GB options and whether the cheapest upfront option is also the best value per GB.',
    tableTitle: '10GB Comparison Across Major Networks',
    quickHeading: 'Who currently offers the best 10GB value?',
    watchOuts: [
      'A 10GB headline can include structure differences (for example split allocations) that affect practical usage.',
      'Cheapest 10GB upfront is not always the strongest value if validity or terms are restrictive.',
      'Heavy users may still outgrow 10GB and should compare larger monthly plans.'
    ],
    savingsTips: [
      'Compare 10GB price and cost per GB together before checkout.',
      'If your usage is close to heavy each month, benchmark 20GB or 30GB options too.',
      'Check operator app/USSD promos because 10GB value can improve significantly during campaigns.'
    ],
    trustLine:
      'Our 10GB comparison focuses on practical prepaid value in South Africa, including price, validity, and fit for mid-to-heavy usage.',
    faqs: [
      {
        question: 'Which network has the cheapest 10GB data right now?',
        answer: 'The cheapest listed 10GB option can move between operators as campaigns change. This page tracks currently listed benchmark pricing.'
      },
      {
        question: 'Is bigger always cheaper per GB?',
        answer: 'Often yes, but not always. Some promos can distort normal size-to-value patterns, so compare current listed cost per GB before buying.'
      },
      {
        question: 'Is 10GB enough for a month?',
        answer: 'For moderate users it can be enough. For heavy video streaming, hotspot usage, or constant updates, larger monthly bundles may be more practical.'
      },
      {
        question: 'What is the best 10GB option for prepaid users?',
        answer: 'The best option is usually the one that balances low cost per GB with a validity and usage pattern that matches your month.'
      }
    ],
    links: [
      { href: '/network/vodacom/monthly-data/', label: 'Vodacom monthly bundles', description: 'Vodacom monthly intent page.' },
      { href: '/network/mtn/monthly-data/', label: 'MTN monthly bundles', description: 'MTN monthly intent page.' },
      { href: '/network/telkom/monthly-data/', label: 'Telkom monthly bundles', description: 'Telkom monthly intent page.' },
      { href: '/network/cell-c/monthly-data/', label: 'Cell C monthly bundles', description: 'Cell C monthly intent page.' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best monthly data deals', description: 'Compare broader monthly value.' },
      { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB guide', description: 'Compare low-volume benchmark pricing.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'best-monthly-data-deals-south-africa': {
    slug: 'best-monthly-data-deals-south-africa',
    mode: 'best-monthly',
    canonicalPath: '/guides/best-monthly-data-deals-south-africa/',
    aliases: ['/guides/cheapest-monthly-data-south-africa/'],
    title: 'Best Monthly Data Deals South Africa (2026) | DataCost',
    metaDescription:
      'Compare the best monthly data deals in South Africa. See 30-day prepaid options by network, cost per GB, and who each monthly deal is best for.',
    h1: 'Best Monthly Data Deals South Africa (2026)',
    intro:
      'Monthly bundles are where most prepaid users make or lose value over time. This page compares currently listed 30-day style options so regular users can evaluate Rand-per-GB, practical fit, and coverage trade-offs in one place.',
    tableTitle: 'Monthly Bundle Comparison Across Major Networks',
    quickHeading: 'What are the best monthly prepaid data deals right now?',
    watchOuts: [
      'Monthly value differs sharply by bundle size, so compare like-for-like usage levels.',
      'Recurring bundles may auto-renew, which can drain airtime if not monitored.',
      'A cheaper monthly offer is only valuable if your local coverage is dependable.'
    ],
    savingsTips: [
      'For regular usage, monthly bundles often outperform repeated daily top-ups.',
      'Check if personalised monthly deals are available before standard checkout.',
      'Review expiry and renewal settings so you do not lose value through rollover assumptions.'
    ],
    trustLine:
      'We track monthly prepaid structures as a separate category to avoid misleading comparisons between short-validity and 30-day bundle behavior.',
    faqs: [
      {
        question: 'Which network gives the best monthly data value in South Africa?',
        answer: 'It depends on bundle size and current promos. This page compares currently listed monthly options so you can judge value by cost per GB and usage fit.'
      },
      {
        question: 'Are monthly bundles always better than daily bundles?',
        answer: 'For regular users, monthly is often better over time. For occasional users, daily can still be practical if usage is infrequent.'
      },
      {
        question: 'How do I choose the right monthly bundle size?',
        answer: 'Base the decision on your average month: messaging and browsing vs heavy streaming and hotspot usage. Avoid buying too small and repeatedly topping up.'
      },
      {
        question: 'What should I watch out for on recurring monthly bundles?',
        answer: 'Check auto-renew rules and available airtime behavior. Recurring bundles can be convenient, but only when renewal settings are understood.'
      }
    ],
    links: [
      { href: '/network/vodacom/monthly-data/', label: 'Vodacom monthly data', description: 'Vodacom monthly intent page.' },
      { href: '/network/mtn/monthly-data/', label: 'MTN monthly data', description: 'MTN monthly intent page.' },
      { href: '/network/telkom/monthly-data/', label: 'Telkom monthly data', description: 'Telkom monthly intent page.' },
      { href: '/network/cell-c/monthly-data/', label: 'Cell C monthly data', description: 'Cell C monthly intent page.' },
      { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB guide', description: 'Mid-volume monthly benchmark.' },
      { href: '/guides/why-is-my-data-finishing-so-fast/', label: 'Why data finishes fast', description: 'Reduce monthly data drain.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'best-prepaid-data-deals-south-africa': {
    slug: 'best-prepaid-data-deals-south-africa',
    mode: 'best-prepaid',
    canonicalPath: '/guides/best-prepaid-data-deals-south-africa/',
    title: 'Best Prepaid Data Deals South Africa (2026) | DataCost',
    metaDescription:
      'Compare the best prepaid data deals in South Africa. See value picks for budget users, regular users, and heavy users across major networks.',
    h1: 'Best Prepaid Data Deals South Africa (2026)',
    intro:
      'This page compares practical prepaid deals across major South African networks for users who buy data with airtime and need better value without contract lock-in. We separate value picks for budget, regular, and heavier usage profiles.',
    tableTitle: 'Best Prepaid Bundle Comparison Across Major Networks',
    quickHeading: 'Which prepaid deals currently offer the strongest value?',
    watchOuts: [
      'Cheapest prepaid headline price can hide short validity and repeated top-up costs.',
      'Some high-value prepaid offers are personalised and may not appear identically for every user.',
      'Coverage consistency can outweigh small price differences for users who rely on stable data access.'
    ],
    savingsTips: [
      'Compare prepaid value by usage profile: light, regular, and heavy users should not buy the same way.',
      'Check personalised USSD/app channels before final checkout to avoid paying full menu pricing.',
      'Prevent out-of-bundle consumption by tracking expiry and active balance throughout the month.'
    ],
    trustLine:
      'Our prepaid comparison focuses on practical South African buying behavior: airtime purchases, validity fit, and real value per usage pattern.',
    faqs: [
      {
        question: 'Which network currently has the best prepaid data deal?',
        answer: 'There is no single permanent winner. The best prepaid deal depends on current promotions, your usage pattern, and local network performance.'
      },
      {
        question: 'How should budget users compare prepaid bundles?',
        answer: 'Budget users should prioritize validity and avoid repeated short top-ups. A slightly higher upfront price can still be cheaper over a full month.'
      },
      {
        question: 'Is prepaid always cheaper than contract in South Africa?',
        answer: 'Prepaid is often cheaper for flexible users, but total value depends on your usage discipline and the specific plan structure.'
      },
      {
        question: 'What is the most common prepaid mistake?',
        answer: 'Buying only on headline price and ignoring validity, renewal behavior, and coverage fit.'
      }
    ],
    links: [
      { href: '/network/vodacom/', label: 'Vodacom network page', description: 'Vodacom prepaid context and bundle options.' },
      { href: '/network/mtn/', label: 'MTN network page', description: 'MTN prepaid context and promo patterns.' },
      { href: '/network/telkom/', label: 'Telkom network page', description: 'Telkom value-led prepaid context.' },
      { href: '/network/cell-c/', label: 'Cell C network page', description: 'Cell C promo-led prepaid context.' },
      { href: '/guides/prepaid-vs-contract-south-africa/', label: 'Prepaid vs contract guide', description: 'Understand model trade-offs.' },
      { href: '/ussd-codes-south-africa/', label: 'South Africa USSD codes', description: 'Check buy and balance short codes.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-whatsapp-bundles-south-africa': {
    slug: 'cheapest-whatsapp-bundles-south-africa',
    mode: 'cheapest-whatsapp',
    canonicalPath: '/guides/cheapest-whatsapp-bundles-south-africa/',
    title: 'Cheapest WhatsApp Bundles South Africa (2026) | DataCost',
    metaDescription:
      'Find the cheapest WhatsApp bundles in South Africa. Compare social bundle prices by network and see key restrictions before you buy.',
    h1: 'Cheapest WhatsApp Bundles South Africa (2026)',
    intro:
      'Social bundles can be very cheap for chat-first users, but they are often misunderstood. This guide compares currently listed WhatsApp and social-style bundles across major networks and explains where they are useful and where they fall short.',
    tableTitle: 'WhatsApp / Social Bundle Comparison Across Major Networks',
    quickHeading: 'Which network has the cheapest WhatsApp-style bundles?',
    watchOuts: [
      'Social bundles are usually app-limited and not equal to full open internet access.',
      'Very low prices can come with short validity and strict usage scope.',
      'Users who mix chat with browsing or streaming often need separate anytime data.'
    ],
    savingsTips: [
      'Use social bundles only when your usage is truly app-specific.',
      'If you also browse and stream, compare combined spend against a normal anytime bundle.',
      'Confirm current social-bundle terms in operator menus because offer structures change.'
    ],
    trustLine:
      'We separate social bundles from normal data comparisons to avoid misleading users who need full internet access.',
    faqs: [
      {
        question: 'What is the cheapest WhatsApp bundle in South Africa?',
        answer: 'Cheapest social pricing can change quickly by operator and promo cycle. This page tracks currently listed benchmark options for easy comparison.'
      },
      {
        question: 'Are WhatsApp bundles enough for normal internet use?',
        answer: 'Usually not. Most WhatsApp bundles are app-limited and do not cover full browsing, maps, or streaming.'
      },
      {
        question: 'Who should buy social bundles?',
        answer: 'They are best for users who mostly chat and send light media within supported apps.'
      },
      {
        question: 'What is the main risk with social bundle buying?',
        answer: 'Confusing social-only access with full internet and then burning airtime when non-supported usage starts.'
      }
    ],
    links: [
      { href: '/network/vodacom/', label: 'Vodacom data bundles', description: 'Vodacom network page and social-bundle context.' },
      { href: '/network/mtn/', label: 'MTN data bundles', description: 'MTN network page and promo context.' },
      { href: '/network/telkom/', label: 'Telkom data bundles', description: 'Telkom network page and value context.' },
      { href: '/network/cell-c/', label: 'Cell C data bundles', description: 'Cell C network page and promo context.' },
      { href: '/guides/how-to-buy-data-vodacom/', label: 'How to buy Vodacom data', description: 'Operator buy flow guide.' },
      { href: '/guides/how-to-buy-data-cell-c/', label: 'How to buy Cell C data', description: 'Operator buy flow guide.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheap-night-data-south-africa': {
    slug: 'cheap-night-data-south-africa',
    mode: 'cheap-night',
    canonicalPath: '/guides/cheap-night-data-south-africa/',
    title: 'Cheap Night Data South Africa (2026) | DataCost',
    metaDescription:
      'Compare cheap night data bundles in South Africa. See which networks offer the lowest night-bundle prices, usage windows, and practical watch-outs.',
    h1: 'Cheap Night Data South Africa (2026)',
    intro:
      'Night bundles can offer very strong value for users who schedule downloads and updates overnight. This page compares currently listed night-style bundles and highlights where users often get caught by timing and usage-window limits.',
    tableTitle: 'Night Bundle Comparison Across Major Networks',
    quickHeading: 'Which night bundles are currently cheapest?',
    watchOuts: [
      'Night bundle data is usually restricted to specific off-peak hours.',
      'Night GB does not automatically replace daytime anytime data.',
      'If you miss the usage window, even a cheap night bundle can deliver no practical value.'
    ],
    savingsTips: [
      'Use night bundles for scheduled downloads and updates, not daytime browsing.',
      'Pair night bundles with a small anytime bundle if you still need daytime connectivity.',
      'Check network-specific night windows and terms before buying.'
    ],
    trustLine:
      'We treat night bundles as a separate category because their usage windows make them fundamentally different from normal prepaid data.',
    faqs: [
      {
        question: 'Which network has the cheapest night data in South Africa?',
        answer: 'Night-bundle leaders can rotate as pricing changes. This page compares currently listed night options across major operators.'
      },
      {
        question: 'When are night bundles worth buying?',
        answer: 'They are worth buying when you can consistently use data during the night window for downloads, updates, or overnight streaming.'
      },
      {
        question: 'Can I use night data during the day?',
        answer: 'Usually no. Most night bundles are time-restricted and should not be treated as daytime browsing data.'
      },
      {
        question: 'What is the common mistake with night bundles?',
        answer: 'Buying on headline GB size without checking usage window, then failing to consume the data during valid hours.'
      }
    ],
    links: [
      { href: '/network/vodacom/night-data/', label: 'Vodacom night bundles', description: 'Vodacom night-data intent page.' },
      { href: '/network/mtn/night-data/', label: 'MTN night bundles', description: 'MTN night-data intent page.' },
      { href: '/network/telkom/', label: 'Telkom network page', description: 'Telkom pricing context and bundle categories.' },
      { href: '/network/cell-c/', label: 'Cell C network page', description: 'Cell C pricing context and bundle categories.' },
      { href: '/guides/why-is-my-data-finishing-so-fast/', label: 'Why data finishes fast', description: 'Reduce unexpected bundle drain.' },
      { href: '/ussd-codes-south-africa/', label: 'South Africa USSD codes', description: 'Find balance and buy short codes.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  }
};

export function getComparisonGuideBySlug(slug: string): ComparisonGuideDefinition | null {
  const direct = comparisonGuideDefinitions[slug as ComparisonGuideSlug];
  if (direct) {
    return direct;
  }

  const matchedAlias = Object.values(comparisonGuideDefinitions).find((definition) =>
    definition.aliases?.includes(`/guides/${slug}/`)
  );

  return matchedAlias || null;
}
