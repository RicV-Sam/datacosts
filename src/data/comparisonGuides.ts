import { NetworkName } from '../types';

export type ComparisonGuideSlug =
  | 'cheapest-1gb-data-south-africa'
  | 'cheapest-2gb-data-south-africa'
  | 'cheapest-5gb-data-south-africa'
  | 'cheapest-10gb-data-south-africa'
  | 'cheapest-15gb-data-south-africa'
  | 'cheapest-20gb-data-south-africa'
  | 'cheapest-50gb-data-south-africa'
  | 'best-monthly-data-deals-south-africa'
  | 'best-prepaid-data-deals-south-africa'
  | 'cheapest-whatsapp-bundles-south-africa'
  | 'cheap-night-data-south-africa';

export type ComparisonGuideMode =
  | 'cheapest-1gb'
  | 'cheapest-2gb'
  | 'cheapest-5gb'
  | 'cheapest-10gb'
  | 'cheapest-15gb'
  | 'cheapest-20gb'
  | 'cheapest-50gb'
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

export interface ComparisonAudienceItem {
  title: string;
  description: string;
}

export interface ComparisonSizeFitItem {
  title: string;
  description: string;
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
  whoShouldBuyTitle?: string;
  whoShouldBuy?: ComparisonAudienceItem[];
  sizeFitTitle?: string;
  sizeFit?: ComparisonSizeFitItem[];
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
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Fix hidden usage and bundle mismatch issues.', }
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
      { href: '/guides/cheapest-5gb-data-south-africa/', label: 'Cheapest 5GB Data', description: 'Downgrade to a lighter mid-range benchmark.' },
      { href: '/guides/cheapest-15gb-data-south-africa/', label: 'Cheapest 15GB Data', description: 'Move up when 10GB is too tight.' },
      { href: '/guides/cheapest-20gb-data-south-africa/', label: 'Cheapest 20GB Data', description: 'Compare higher monthly value options.' },
      { href: '/network/vodacom/monthly-data/', label: 'Vodacom monthly bundles', description: 'Vodacom monthly intent page.' },
      { href: '/network/mtn/monthly-data/', label: 'MTN monthly bundles', description: 'MTN monthly intent page.' },
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Reduce avoidable monthly data drain.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-2gb-data-south-africa': {
    slug: 'cheapest-2gb-data-south-africa',
    mode: 'cheapest-2gb',
    canonicalPath: '/guides/cheapest-2gb-data-south-africa/',
    title: 'Cheapest 2GB Data in South Africa (2026) | DataCost',
    metaDescription:
      'Compare the cheapest 2GB data bundles in South Africa across Vodacom, MTN, Telkom and Cell C. See who offers the best value and who 2GB suits.',
    h1: 'Cheapest 2GB Data in South Africa (2026)',
    intro:
      '2GB bundles are usually for low-budget or emergency monthly usage. This page compares practical 2GB-style options across major networks so you can see whether a small bundle still makes sense for your real usage.',
    tableTitle: '2GB Comparison Across Major Networks',
    quickHeading: 'Is 2GB still worth buying in South Africa?',
    watchOuts: [
      '2GB can finish quickly with autoplay video, app updates, and cloud sync enabled.',
      'Some operators have limited exact 2GB listings, so the closest practical size may be shown.',
      'Using data after the bundle ends can drain airtime quickly at out-of-bundle rates.'
    ],
    savingsTips: [
      'Keep updates and backups on Wi-Fi only if you are buying 2GB.',
      'Use data-saver settings in social apps to stretch a small monthly bundle.',
      'If you top up often, compare 5GB options because they can be better value over a month.'
    ],
    whoShouldBuyTitle: 'Who should buy 2GB bundles?',
    whoShouldBuy: [
      { title: 'Light users', description: 'Best for WhatsApp, email, light browsing, and short daily sessions.' },
      { title: 'Emergency top-up buyers', description: 'Useful when you need temporary connectivity before your next full recharge.' },
      { title: 'Strict budget users', description: 'Can work when your monthly data budget is very tight and usage is controlled.' }
    ],
    sizeFitTitle: 'When 2GB is not enough (or too much)',
    sizeFit: [
      { title: 'Usually not enough for regular video use', description: 'Frequent TikTok, YouTube, and Instagram video will normally finish 2GB fast.' },
      { title: 'Sometimes too much for voice-only users', description: 'If your usage is mostly calls and occasional text, very short bundles can be enough.' },
      { title: 'Upgrade path', description: 'If you often buy extra data mid-month, compare 5GB and 10GB guides for stronger value.' }
    ],
    trustLine:
      'This 2GB guide focuses on practical low-budget telecom buying behavior in South Africa, including value risk when small bundles are repeatedly topped up.',
    faqs: [
      { question: 'Is 2GB enough for a month in South Africa?', answer: 'It can be enough for light chat, email, and browsing, but usually not enough for regular video streaming or hotspot use.' },
      { question: 'Which network has the cheapest 2GB data?', answer: 'It changes as offers rotate. Use the current table as a benchmark and confirm final checkout pricing on operator channels.' },
      { question: 'Is 2GB better than buying daily bundles?', answer: 'For many users, yes. A single 2GB purchase is often more manageable and can reduce repeated daily top-up costs.' },
      { question: 'What is the biggest risk with 2GB bundles?', answer: 'The biggest risk is out-of-bundle airtime leakage once the bundle ends.' }
    ],
    links: [
      { href: '/guides/cheapest-5gb-data-south-africa/', label: 'Cheapest 5GB Data', description: 'Upgrade to the next common prepaid size.' },
      { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data', description: 'Compare a mainstream monthly benchmark.' },
      { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data in South Africa', description: 'See overall market comparison first.' },
      { href: '/guides/best-prepaid-data-deals-south-africa/', label: 'Best Prepaid Data Deals', description: 'Find stronger prepaid value options.' },
      { href: '/ussd-codes-south-africa/', label: 'South Africa USSD Codes', description: 'Quick ways to check balance and buy data.' },
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Understand and fix rapid bundle depletion.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-5gb-data-south-africa': {
    slug: 'cheapest-5gb-data-south-africa',
    mode: 'cheapest-5gb',
    canonicalPath: '/guides/cheapest-5gb-data-south-africa/',
    title: 'Cheapest 5GB Data in South Africa (2026) | DataCost',
    metaDescription:
      'Compare the cheapest 5GB data bundles in South Africa. See network-by-network value, validity trade-offs, and who 5GB is best for.',
    h1: 'Cheapest 5GB Data in South Africa (2026)',
    intro:
      '5GB is a common mid-level prepaid size for users who need more than basic chat but are still budget-conscious. This page helps you compare currently listed options and whether 5GB is enough for your month.',
    tableTitle: '5GB Comparison Across Major Networks',
    quickHeading: 'Is 5GB a good-value mid-range bundle?',
    watchOuts: [
      'Exact 5GB options may be limited on some networks, so nearby sizes can be more practical.',
      'If your usage includes frequent video, 5GB can run out before month-end.',
      'A low upfront price can still be weak value if validity is short.'
    ],
    savingsTips: [
      'Use 5GB when your usage is mostly social, browsing, and occasional video.',
      'Compare cost per GB and validity together, not price alone.',
      'If 5GB keeps finishing early, move to 10GB instead of repeated top-ups.'
    ],
    whoShouldBuyTitle: 'Who should buy 5GB bundles?',
    whoShouldBuy: [
      { title: 'Moderate prepaid users', description: 'Suitable for mixed usage: chat, browsing, maps, and moderate social media.' },
      { title: 'Commuters and students', description: 'Good for daily mobile use without jumping straight to large monthly plans.' },
      { title: 'Value-focused users', description: 'Useful for buyers who want better value than 1GB or 2GB without a high upfront spend.' }
    ],
    sizeFitTitle: 'When 5GB is not enough (or too much)',
    sizeFit: [
      { title: 'Not enough for heavy streaming', description: 'Daily video watching and hotspot usage usually require 10GB or more.' },
      { title: 'Too much for occasional users', description: 'If you mainly use WhatsApp and email, smaller bundles may be cheaper overall.' },
      { title: 'Upgrade/downgrade path', description: 'Compare 2GB for tighter budgets and 10GB for heavier monthly use.' }
    ],
    trustLine:
      'This 5GB guide is built for practical South African prepaid buying decisions where budget limits and usage fit matter as much as headline bundle price.',
    faqs: [
      { question: 'Which network has the cheapest 5GB data bundle?', answer: 'It varies by promo cycle. Use this page as a live benchmark and verify final menu pricing before checkout.' },
      { question: 'Is 5GB enough for social media and browsing?', answer: 'For moderate use, yes. For heavy short-video use, it may finish quickly.' },
      { question: 'Is 5GB better value than buying multiple 1GB bundles?', answer: 'Often yes, especially when validity is longer and cost per GB is lower.' },
      { question: 'Should I choose 5GB or 10GB?', answer: 'If you regularly run out before month-end, 10GB is usually the better long-term option.' }
    ],
    links: [
      { href: '/guides/cheapest-2gb-data-south-africa/', label: 'Cheapest 2GB Data', description: 'Lower-budget alternative for lighter usage.' },
      { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data', description: 'Step up to a mainstream monthly size.' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best Monthly Data Deals', description: 'Compare 30-day value across networks.' },
      { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data in South Africa', description: 'Market-wide benchmark page.' },
      { href: '/guides/prepaid-vs-contract-south-africa/', label: 'Prepaid vs Contract', description: 'Choose the right billing model for your usage.' },
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Find the most common causes and fixes.', }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-15gb-data-south-africa': {
    slug: 'cheapest-15gb-data-south-africa',
    mode: 'cheapest-15gb',
    canonicalPath: '/guides/cheapest-15gb-data-south-africa/',
    title: 'Cheapest 15GB Data in South Africa (2026) | DataCost',
    metaDescription:
      'Compare the cheapest 15GB data options in South Africa. See which network gives the best value and when 15GB is a smarter buy than 10GB.',
    h1: 'Cheapest 15GB Data in South Africa (2026)',
    intro:
      '15GB is a practical step-up for users who find 10GB too tight but do not want to pay for very large plans. This guide compares the closest useful 15GB-style options and shows when this size makes financial sense.',
    tableTitle: '15GB Comparison Across Major Networks',
    quickHeading: 'When is 15GB the smartest middle-ground option?',
    watchOuts: [
      'Exact 15GB bundles are not always listed by every network, so nearest practical options may appear.',
      'Some larger bundles include split usage windows or promo conditions that affect real value.',
      'If you hotspot regularly, 15GB can still finish faster than expected.'
    ],
    savingsTips: [
      'Use 15GB-style bundles when 10GB consistently ends early in your month.',
      'Compare 15GB-style pricing against 20GB because bigger bundles can sometimes cost less per GB.',
      'Track data usage by app so you know whether to upgrade or optimize first.'
    ],
    whoShouldBuyTitle: 'Who should buy 15GB bundles?',
    whoShouldBuy: [
      { title: 'Active social users', description: 'Good for users who browse and stream short video regularly but not all day.' },
      { title: 'Mixed work-and-personal users', description: 'Useful for messaging, browsing, calls, and moderate cloud usage.' },
      { title: 'Users moving up from 10GB', description: 'A common upgrade path for people who run out in week three or four.' }
    ],
    sizeFitTitle: 'When 15GB is not enough (or too much)',
    sizeFit: [
      { title: 'Not enough for heavy hotspot usage', description: 'If you tether devices often, compare 20GB or 50GB options.' },
      { title: 'Too much for light chat users', description: 'If most usage is messaging only, 5GB or 10GB may be more cost-efficient.' },
      { title: 'Upgrade/downgrade path', description: 'Compare 10GB for lower spend and 20GB for stronger heavy-month value.' }
    ],
    trustLine:
      'This 15GB guide is designed for South African users choosing a practical mid-high bundle size, with clarity on value and fit rather than headline pricing alone.',
    faqs: [
      { question: 'Is 15GB enough for a month?', answer: 'For many active users, yes. For frequent streaming or hotspot use, 20GB may be safer.' },
      { question: 'Why compare 15GB against 20GB?', answer: 'Because bigger bundles can sometimes have a better cost-per-GB, even if the upfront price is higher.' },
      { question: 'Do all networks have an exact 15GB plan?', answer: 'Not always. This guide uses the closest practical options where exact 15GB is unavailable.' },
      { question: 'Who benefits most from 15GB bundles?', answer: 'Users who outgrow 10GB but do not need very large 30GB to 50GB plans.' }
    ],
    links: [
      { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data', description: 'Compare the lower mainstream benchmark.' },
      { href: '/guides/cheapest-20gb-data-south-africa/', label: 'Cheapest 20GB Data', description: 'Compare the next higher-value size.' },
      { href: '/guides/cheapest-50gb-data-south-africa/', label: 'Cheapest 50GB Data', description: 'For hotspot and heavy monthly usage.' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best Monthly Data Deals', description: 'Broader monthly comparison context.' },
      { href: '/network/', label: 'Network Comparison Hub', description: 'Compare network-level strengths before buying.' },
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Reduce avoidable monthly data drain.' }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-20gb-data-south-africa': {
    slug: 'cheapest-20gb-data-south-africa',
    mode: 'cheapest-20gb',
    canonicalPath: '/guides/cheapest-20gb-data-south-africa/',
    title: 'Cheapest 20GB Data in South Africa (2026) | DataCost',
    metaDescription:
      'Compare the cheapest 20GB data bundles in South Africa. See current network value, validity differences, and who should buy 20GB plans.',
    h1: 'Cheapest 20GB Data in South Africa (2026)',
    intro:
      '20GB is one of the strongest monthly value points for many South African prepaid users who stream regularly or share data with family. This page compares currently listed 20GB-style offers by network.',
    tableTitle: '20GB Comparison Across Major Networks',
    quickHeading: 'Is 20GB better value than 10GB or 15GB?',
    watchOuts: [
      'A bigger headline bundle still needs the right validity and usage conditions.',
      'Some 20GB plans are tied to promo windows and can change month to month.',
      'Heavy hotspot users may still need 50GB-level planning.'
    ],
    savingsTips: [
      'If you top up a 10GB bundle every month, compare your total spend against a single 20GB purchase.',
      'Use app-level controls to keep 20GB from being consumed by background activity.',
      'Compare monthly options and personalised promos before checkout.'
    ],
    whoShouldBuyTitle: 'Who should buy 20GB bundles?',
    whoShouldBuy: [
      { title: 'Regular streamers', description: 'Good for users watching moderate amounts of YouTube, TikTok, and Instagram video.' },
      { title: 'Household support users', description: 'Useful when one SIM helps cover multiple devices occasionally.' },
      { title: 'Heavy monthly prepaid users', description: 'Strong for people who consistently exceed 10GB but still want spend control.' }
    ],
    sizeFitTitle: 'When 20GB is not enough (or too much)',
    sizeFit: [
      { title: 'Not enough for full-time hotspot use', description: 'Daily tethering for work or home backup can require 50GB or unlimited options.' },
      { title: 'Too much for light users', description: 'If you mostly chat and browse, 5GB to 10GB may be better value for your budget.' },
      { title: 'Upgrade/downgrade path', description: 'Compare 15GB for a lower spend and 50GB for heavy consistent throughput.' }
    ],
    trustLine:
      'This 20GB comparison focuses on practical month-long prepaid value and the trade-off between higher upfront cost and reduced repeat top-ups.',
    faqs: [
      { question: 'Which network has the cheapest 20GB data in South Africa?', answer: 'It depends on current promotions and listed terms. Use the table here as a benchmark and verify final checkout pricing.' },
      { question: 'Is 20GB enough for streaming and social media?', answer: 'For many users it is enough, but heavy daily streaming or hotspot usage can still exceed 20GB.' },
      { question: 'Is 20GB usually better value than 10GB?', answer: 'Often yes on cost per GB, especially if you regularly top up smaller bundles during the month.' },
      { question: 'Should I buy 20GB prepaid or a contract plan?', answer: 'Prepaid is often better for spend control; contract may suit users who prefer fixed monthly billing and added services.' }
    ],
    links: [
      { href: '/guides/cheapest-15gb-data-south-africa/', label: 'Cheapest 15GB Data', description: 'Lower mid-high size benchmark.' },
      { href: '/guides/cheapest-50gb-data-south-africa/', label: 'Cheapest 50GB Data', description: 'Move up for heavy hotspot and backup usage.' },
      { href: '/guides/cheapest-10gb-data-south-africa/', label: 'Cheapest 10GB Data', description: 'Compare against the mainstream monthly size.' },
      { href: '/guides/cheapest-unlimited-data-south-africa/', label: 'Cheapest Unlimited Data', description: 'Compare heavy-use alternatives.' },
      { href: '/guides/prepaid-vs-contract-south-africa/', label: 'Prepaid vs Contract', description: 'Choose the right purchase model.' },
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Diagnose heavy-usage drain patterns.', }
    ],
    coverageFirstNetwork: 'Vodacom'
  },
  'cheapest-50gb-data-south-africa': {
    slug: 'cheapest-50gb-data-south-africa',
    mode: 'cheapest-50gb',
    canonicalPath: '/guides/cheapest-50gb-data-south-africa/',
    title: 'Cheapest 50GB Data in South Africa (2026) | DataCost',
    metaDescription:
      'Compare the cheapest 50GB data options in South Africa for heavy users, hotspot usage, and work-from-phone setups. See value and watch-outs by network.',
    h1: 'Cheapest 50GB Data in South Africa (2026)',
    intro:
      '50GB-level bundles are for heavy monthly users who rely on mobile internet for work, hotspot sharing, or home backup. This page compares currently listed large-size options and highlights where value and reliability matter most.',
    tableTitle: '50GB Comparison Across Major Networks',
    quickHeading: 'Who should buy 50GB data bundles?',
    watchOuts: [
      'Exact 50GB plans are not always available on every network at all times.',
      'Large bundles can still be poor value if your coverage is weak in key locations.',
      'If your usage is mostly chat and browsing, 50GB may be unnecessary spend.'
    ],
    savingsTips: [
      'Only buy 50GB when your usage consistently justifies it month after month.',
      'Check network performance in your area before prioritizing small price differences.',
      'Compare 20GB and unlimited plans to confirm the best heavy-use option.'
    ],
    whoShouldBuyTitle: 'Who should buy 50GB bundles?',
    whoShouldBuy: [
      { title: 'Heavy mobile users', description: 'Suitable for users who stream often, download large files, and stay online most of the day.' },
      { title: 'Hotspot and tethering users', description: 'Useful for people sharing internet with laptops or multiple devices.' },
      { title: 'Home backup users', description: 'Can work as a backup connection where fixed internet is unreliable.' }
    ],
    sizeFitTitle: 'When 50GB is not enough (or too much)',
    sizeFit: [
      { title: 'Not enough for very high household usage', description: 'Large families with continuous streaming may still need unlimited or fixed options.' },
      { title: 'Too much for moderate users', description: 'If you usually stay under 20GB, this size may not be cost-efficient.' },
      { title: 'Upgrade/downgrade path', description: 'Compare 20GB for lighter heavy use and unlimited for consistently high throughput.' }
    ],
    trustLine:
      'This 50GB guide is built for high-intent heavy-usage decisions in South Africa where total monthly spend and network stability are both critical.',
    faqs: [
      { question: 'What can I do with 50GB of data in a month?', answer: '50GB can support heavy browsing, regular streaming, remote work tasks, and moderate hotspot sharing depending on quality settings.' },
      { question: 'Which network has the cheapest 50GB data bundle?', answer: 'The answer changes by cycle and promotions. Use this comparison as a benchmark and confirm final operator pricing before purchase.' },
      { question: 'Is 50GB better than unlimited data?', answer: 'It depends on your usage and budget. 50GB can be more controlled on spend, while unlimited can suit very heavy users if terms are acceptable.' },
      { question: 'Should I buy 50GB for hotspot use?', answer: 'Yes if your hotspot usage is regular and you monitor consumption. If usage is extreme, compare unlimited alternatives.' }
    ],
    links: [
      { href: '/guides/cheapest-20gb-data-south-africa/', label: 'Cheapest 20GB Data', description: 'Lower heavy-use benchmark with lower upfront cost.' },
      { href: '/guides/cheapest-unlimited-data-south-africa/', label: 'Cheapest Unlimited Data', description: 'Compare true heavy-use alternatives.' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best Monthly Data Deals', description: 'Broader monthly value context.' },
      { href: '/network/', label: 'Network Comparison Hub', description: 'Compare network quality and practical fit.' },
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Cut avoidable drain and stretch usage.' },
      { href: '/methodology/', label: 'Methodology', description: 'See how DataCost compares network pricing.' }
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
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Reduce monthly data drain with practical fixes.' }
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
      { href: '/guides/why-does-my-data-finish-so-fast-south-africa/', label: 'Why Data Finishes Fast', description: 'Fix hidden usage and reduce repeat top-ups.' }
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
