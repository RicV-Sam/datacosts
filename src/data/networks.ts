import { NetworkName } from '../types';

export interface NetworkPageData {
  slug: string;
  networkName: NetworkName;
  intro: string;
  tips: string[];
  extraSavingsTips?: string[];
  bestFor: string;
  verdictSummary?: string;
  strengths: string[];
  faqs: { question: string; answer: string }[];
  howToBuySection?: { title: string; paragraphs: string[] };
  personalisedSection?: { title: string; paragraphs: string[] };
  editorialComparisonSection?: { title: string; paragraphs: string[] };
  commonQuestionsSection?: { title: string; items: { question: string; answer: string }[] };
  narrowSearchLinks?: { href: string; label: string }[];
  commonMistakes?: string[];
  comparisonSummary?: {
    network: NetworkName;
    bestFor: string;
    usuallyCheapest: string;
    coverage: string;
    goodFor: string;
    href: string;
  }[];
}

export const networkPages: Record<string, NetworkPageData> = {
  'vodacom': {
    slug: 'vodacom',
    networkName: 'Vodacom',
    intro: 'Compare Vodacom data bundles, prepaid deals, USSD codes, price, validity, and use case before you buy. Vodacom is usually chosen for coverage consistency, while personalised offers should be checked live on the customer\'s own line.',
    bestFor: 'Coverage consistency and premium network reliability',
    verdictSummary: 'Vodacom is usually chosen for coverage and consistency. Compare bundle validity, allocation and the live personalised menu on your own line before buying.',
    strengths: [
      'Strong 4G and 5G footprint across urban and many rural areas',
      'Broad spread of hourly, daily, weekly and monthly prepaid options',
      'Personalised Just 4 You offers are available to check on *123#',
      'Widely used self-service channels via USSD, app and banking integrations'
    ],
    tips: [
      'Check Just 4 You (*123#) and compare the live allocation, validity and price with the public menu.',
      'If you only need data for a short task, compare hourly or daily options before buying monthly bundles.',
      'Keep out-of-bundle usage disabled where possible so airtime is not consumed at high per-MB rates.'
    ],
    extraSavingsTips: [
      'Compare short-term bundles against monthly bundles. Daily top-ups can become expensive over a full month.',
      'Avoid browsing from airtime with no active bundle. Out-of-bundle rates can consume airtime quickly.'
    ],
    howToBuySection: {
      title: 'How to buy Vodacom data bundles',
      paragraphs: [
        'Most prepaid users buy data by dialling *135# and following the data-bundle prompts. You can also buy through the My Vodacom or VodaPay app, plus selected banking app channels.',
        'Check *123# for Just 4 You, then compare the allocation, validity and price shown on your line with the public menu. Offers can differ between customers and change over time.',
        'For a step-by-step walkthrough, use the How to buy Vodacom data guide: /guides/how-to-buy-data-vodacom/'
      ]
    },
    personalisedSection: {
      title: 'What is Vodacom Just 4 You?',
      paragraphs: [
        'Just 4 You is Vodacom\'s personalised offer channel. It is driven by usage profile and campaigns, so two prepaid users can see different deals on the same day.',
        'Check on *123#. Treat it as a variable offer channel, not a fixed public bundle table. Prepaid LTE data rows with Night Owl allocations are a separate router/LTE product family, not smartphone once-off bundle pricing.'
      ]
    },
    editorialComparisonSection: {
      title: 'How Vodacom compares to other networks',
      paragraphs: [
        'Vodacom usually wins on consistency and coverage, but standard prepaid pricing can be higher than value-led rivals.',
        'For the head-to-head view, read /guides/vodacom-vs-mtn-data-prices/. You can also compare /network/mtn/, /network/telkom/, and /network/cell-c/.'
      ]
    },
    commonQuestionsSection: {
      title: 'Common Vodacom data questions',
      items: [
        { question: 'Why do Vodacom data prices vary?', answer: 'Price, allocation and validity differ by bundle type, while Just 4 You offers can also differ by customer and campaign.' },
        { question: 'Why is my Vodacom data finishing so fast?', answer: 'Background updates, video autoplay and out-of-bundle usage are common reasons for rapid data drain.' },
        { question: 'How do I stop out-of-bundle charges?', answer: 'Keep an active bundle and manage out-of-bundle settings in self-service channels so airtime is protected.' },
        { question: 'How does Vodacom Just 4 You compare with the public menu?', answer: 'There is no guaranteed price relationship. Compare the live allocation, validity and price shown on *123# with the public menu before buying.' },
        { question: 'Does Vodacom have unlimited prepaid data?', answer: 'True unlimited prepaid handset data is uncommon. Unlimited-style options are usually tied to fixed LTE or 5G product categories.' }
      ]
    },
    narrowSearchLinks: [
      { href: '/guides/how-to-buy-data-vodacom/', label: 'How to buy Vodacom data' },
      { href: '/guides/how-to-check-vodacom-airtime-balance/', label: 'Check Vodacom balance' },
      { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'Vodacom vs MTN' },
      { href: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop out-of-bundle charges' },
      { href: '/vodacom-ussd-codes/', label: 'Vodacom USSD codes' }
    ],
    commonMistakes: [
      'Buying daily bundles repeatedly instead of moving to a monthly pack when usage is consistent.',
      'Assuming Just 4 You prices are public and identical for every Vodacom customer.',
      'Leaving out-of-bundle enabled and losing airtime at high per-MB rates.',
      'Treating social bundles as full internet access when they are app-limited.',
      'Missing the difference between once-off bundles and auto-recurring options.',
      'Choosing the cheapest headline price instead of comparing Rand-per-GB and validity.'
    ],
    comparisonSummary: [
      {
        network: 'Vodacom',
        bestFor: 'Coverage consistency',
        usuallyCheapest: 'No',
        coverage: 'Strong national footprint',
        goodFor: 'Users who prioritise reliable signal',
        href: '/network/vodacom/'
      },
      {
        network: 'MTN',
        bestFor: 'Speed and promos',
        usuallyCheapest: 'Sometimes',
        coverage: 'Strong urban and suburban',
        goodFor: 'Promo hunters and heavy app users',
        href: '/network/mtn/'
      },
      {
        network: 'Telkom',
        bestFor: 'Reviewed daily, weekly and social rows',
        usuallyCheapest: 'Compare live',
        coverage: 'Check local map',
        goodFor: 'Users matching validity to their use case',
        href: '/network/telkom/'
      },
      {
        network: 'Cell C',
        bestFor: 'Value mixes',
        usuallyCheapest: 'Sometimes',
        coverage: 'Dual-MOCN partner footprint',
        goodFor: 'Flexible monthly and social buyers',
        href: '/network/cell-c/'
      }
    ],
    faqs: [
      {
        question: 'How do I buy Vodacom data bundles?',
        answer: 'You can buy Vodacom data by dialling *135# and following the prompts, in the My Vodacom or VodaPay app, and through selected banking apps. Check Just 4 You on *123# and compare the live terms on your own line.'
      },
      {
        question: 'What is the cheapest Vodacom 1GB data bundle?',
        answer: 'Short-validity and 30-day 1GB options serve different usage patterns. Compare the current *135# public menu with any Just 4 You offer shown on *123#, including allocation, validity and live price.'
      },
      {
        question: 'Does Vodacom have unlimited data?',
        answer: 'Vodacom has unlimited-style products mainly on fixed LTE/5G and selected contract categories. Standard prepaid handset bundles are generally capped by volume and validity.'
      },
      {
        question: 'How do I check my Vodacom data balance?',
        answer: 'Dial *135# for the main balance menu, then use the My Vodacom or VodaPay app when you want a fuller bundle breakdown.'
      },
      {
        question: 'What is Vodacom Just 4 You?',
        answer: 'Just 4 You is Vodacom\'s personalised offers channel, accessed on *123#. Deals can vary by customer profile, usage pattern and campaign period.'
      },
      {
        question: 'Can I buy Vodacom data with airtime?',
        answer: 'Yes. Most prepaid bundles can be purchased using airtime through Vodacom USSD flows and app channels, subject to available balance and offer eligibility.'
      },
      {
        question: 'How do I stop out-of-bundle charges on Vodacom?',
        answer: 'The safest approach is to keep a valid bundle active and manage out-of-bundle settings in your self-service profile. If out-of-bundle is enabled, airtime can be consumed quickly at per-MB rates.'
      },
      {
        question: 'Is Vodacom cheaper than MTN?',
        answer: 'It depends on the exact public bundle, any offer shown on your line, validity and local coverage. Compare both networks\' live terms rather than assuming one is always lower-priced.'
      }
    ]
  },
  'mtn': {
    slug: 'mtn',
    networkName: 'MTN',
    intro: 'Compare MTN data bundles, prepaid deals, USSD codes, price, validity, and use case before you buy. Made4U and other personalised offers can differ by SIM, tariff, location and campaign.',
    bestFor: 'Strong all-round prepaid performance',
    verdictSummary: 'MTN is often a balanced choice for users who want strong coverage and a range of prepaid options. Compare any personalised offer with the public menu on the same allocation and validity.',
    strengths: [
      'Strong national 4G coverage with reliable urban performance',
      'Made4U and other personalised offers, including MyTownOffers where eligible',
      'Wide spread of daily, weekly and monthly prepaid options',
      'Good balance between performance and deal availability'
    ],
    tips: [
      'Check *142# for Made4U and compare the live allocation, validity and price with standard prepaid bundles.',
      'Treat MyTownOffers as location- and eligibility-dependent rather than national public pricing.',
      'Avoid out-of-bundle usage by keeping a live bundle active and watching balance before expiry.'
    ],
    extraSavingsTips: [
      'Small daily bundles can look cheap but become expensive when repeated all month.',
      'If your data drains quickly, review app background usage and autoplay settings.'
    ],
    howToBuySection: {
      title: 'How to buy MTN data bundles',
      paragraphs: [
        'Most users buy MTN data through *136*2# and the MyMTN app. You can also buy through supported banking channels.',
        'Review Made4U on *142# where available and compare the live terms with the standard menu.',
        'Need full steps? Use /guides/how-to-buy-data-mtn/.'
      ]
    },
    personalisedSection: {
      title: 'What are MTN personalised deals?',
      paragraphs: [
        'MTN runs Made4U and other SIM-specific offers; MyTownOffers can appear for eligible prepaid customers in selected areas.',
        'Treat promo offers as variable, not guaranteed public pricing.'
      ]
    },
    editorialComparisonSection: {
      title: 'How MTN compares to other networks',
      paragraphs: [
        'MTN combines broad coverage with public and personalised prepaid channels. Compare like-for-like allocations and validity with Vodacom before choosing.',
        'For direct comparisons, check /guides/vodacom-vs-mtn-data-prices/ and compare /network/telkom/ or /network/cell-c/ for price-led alternatives.'
      ]
    },
    commonQuestionsSection: {
      title: 'Common MTN data questions',
      items: [
        { question: 'How does MTN pricing compare with Vodacom?', answer: 'There is no fixed winner. Compare the same allocation and validity, any restrictions, and the live price shown by each network.' },
        { question: 'Why does MTN data finish fast?', answer: 'Background updates and video-heavy apps are common causes, especially near bundle expiry.' },
        { question: 'How do I stop MTN out-of-bundle usage?', answer: 'Keep a valid bundle active and manage data settings before balance reaches zero.' },
        { question: 'Are MTN promos always available?', answer: 'No. Promo availability changes by campaign and customer profile.' },
        { question: 'Does MTN have night bundles?', answer: 'Yes. Current MTN Night Express wording lists a 00:01-04:59 use window for Night Express data bundles.' }
      ]
    },
    narrowSearchLinks: [
      { href: '/guides/how-to-buy-data-mtn/', label: 'How to buy MTN data' },
      { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'MTN vs Vodacom' },
      { href: '/guides/why-is-my-data-finishing-so-fast/', label: 'Why MTN data finishes fast' },
      { href: '/ussd-codes-south-africa/', label: 'MTN USSD codes' }
    ],
    commonMistakes: [
      'Assuming an app-only or personalised MTN offer is available to every customer.',
      'Buying small daily bundles repeatedly instead of moving to weekly or monthly options.',
      'Assuming every MTN promo is always active for every SIM.',
      'Letting bundles expire and dropping into out-of-bundle charging.',
      'Comparing headline bundle size without checking validity and cost per GB.'
    ],
    comparisonSummary: [
      { network: 'MTN', bestFor: 'Balanced speed and value', usuallyCheapest: 'Sometimes', coverage: 'Strong national footprint', goodFor: 'Users wanting all-round prepaid performance', href: '/network/mtn/' },
      { network: 'Vodacom', bestFor: 'Consistency and coverage', usuallyCheapest: 'No', coverage: 'Very strong national footprint', goodFor: 'Signal reliability first', href: '/network/vodacom/' },
      { network: 'Telkom', bestFor: 'Reviewed daily, weekly and social rows', usuallyCheapest: 'Compare live', coverage: 'Check local map', goodFor: 'Users matching validity to their use case', href: '/network/telkom/' },
      { network: 'Cell C', bestFor: 'Promo-driven value', usuallyCheapest: 'Sometimes', coverage: 'Dual-MOCN partner footprint', goodFor: 'Deal hunters', href: '/network/cell-c/' }
    ],
    faqs: [
      {
        question: 'How do I buy MTN data bundles?',
        answer: 'Buy MTN bundles using *136*2#, the MyMTN app, or supported banking channels. Check personalised offers on *142# when available.'
      },
      {
        question: 'What is the cheapest MTN 1GB option?',
        answer: 'Short-validity 1GB bundles are often cheapest upfront, while longer-validity bundles can be better for controlled monthly usage.'
      },
      {
        question: 'How do I check my MTN data balance?',
        answer: 'Dial *136# to see a quick summary of your airtime and data, or use the MTN app for a detailed breakdown of all active bundles.'
      },
      {
        question: 'What are MTN Made4U and personalised offers?',
        answer: 'Made4U and other SIM-specific offers can appear on *142#, *136*2#, or the MTN app. MyTownOffers may appear for eligible prepaid customers in selected areas. These offers are not universal, so confirm the live price and validity.'
      },
      {
        question: 'Can I buy MTN data with airtime?',
        answer: 'Yes, most prepaid MTN bundles can be purchased using airtime balance via USSD or app channels.'
      },
      {
        question: 'Does MTN have unlimited prepaid data?',
        answer: 'True unlimited handset prepaid is limited; most prepaid bundles are capped by size and validity.'
      },
      {
        question: 'How do I avoid MTN out-of-bundle charges?',
        answer: 'Keep an active bundle and monitor expiry to avoid defaulting to out-of-bundle rates.'
      },
      {
        question: 'Is MTN better than Vodacom for data?',
        answer: 'Compare current public and line-specific offers alongside coverage in the places you use data. Neither network has a permanent price or coverage advantage for every customer.'
      }
    ]
  },
  'telkom': {
    slug: 'telkom',
    networkName: 'Telkom',
    intro: 'Compare Telkom public data bundles and any Mo\'Nice offer shown on your line before you buy. Price, allocation and validity differ by product, while network experience can vary by area.',
    bestFor: 'Time-based and line-specific prepaid options',
    verdictSummary: 'Telkom offers several prepaid validity options; compare the live price and allocation, then confirm coverage where you use data.',
    strengths: [
      'Public hourly, daily and weekly bundle categories',
      'Mo\'Nice personalised offer channel on *123#',
      'Multiple validity periods for different usage patterns',
      'Public catalogue and self-service buying channels'
    ],
    tips: [
      'Check Mo\'Nice and the standard menu, then compare allocation, validity and price like for like.',
      'If you commute between regions, verify your real-world Telkom coverage before buying a large bundle.',
      'Track expiry dates closely so unused data does not lapse before month-end.'
    ],
    extraSavingsTips: [
      'Do not assume Telkom is cheapest in every bundle size; compare 1GB and daily categories separately.',
      'If coverage is inconsistent in your area, a slightly pricier but more stable network may be better value overall.'
    ],
    howToBuySection: {
      title: 'How to buy Telkom data bundles',
      paragraphs: [
        'Use *180# to buy Telkom prepaid bundles, or buy through supported app and banking channels.',
        'Check Mo\'Nice on *123# and compare any offer shown on your line with the standard *180# menu. Do not treat a Mo\'Nice price as public national pricing.',
        'See /guides/how-to-buy-data-telkom/ for the full buy flow.'
      ]
    },
    personalisedSection: {
      title: 'What are Telkom Mo\'Nice deals?',
      paragraphs: [
        'Mo\'Nice refers to Telkom personalised prepaid offers that can change by campaign, profile and usage history.',
        'Treat them as personalised deals, not fixed public rates. Use Telkom self-service menus such as *123# where available, and confirm the live offer before buying.'
      ]
    },
    editorialComparisonSection: {
      title: 'How Telkom compares to other networks',
      paragraphs: [
        'The reviewed Telkom catalogue currently includes daily, weekly and social prepaid rows. Compare those with equivalent products instead of inferring a large-bundle price leader from a different validity or product family.',
        'Compare /network/mtn/, /network/vodacom/ and /network/cell-c/ to match price against your local coverage realities.'
      ]
    },
    commonQuestionsSection: {
      title: 'Common Telkom data questions',
      items: [
        { question: 'Is Telkom always the cheapest network?', answer: 'No network is always cheapest across every bundle size and validity window. Compare current like-for-like public prices before buying.' },
        { question: 'Why is my Telkom speed inconsistent?', answer: 'Performance can vary by area and congestion, so local experience matters more than headline pricing.' },
        { question: 'How do I buy Telkom data bundles?', answer: 'Use *180# or Telkom-supported channels. You can also check Mo\'Nice on *123# and compare the live terms.' },
        { question: 'Does Telkom have night bundles?', answer: 'Yes. Telkom describes Night Surfer as once-off data used between midnight and 07:00 on the Telkom network.' },
        { question: 'Can I use airtime to buy Telkom data?', answer: 'Yes, prepaid bundles can generally be bought with airtime balance.' }
      ]
    },
    narrowSearchLinks: [
      { href: '/guides/how-to-buy-data-telkom/', label: 'How to buy Telkom data' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best monthly data deals in SA' },
      { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB data in SA' },
      { href: '/ussd-codes-south-africa/', label: 'Telkom USSD codes' }
    ],
    commonMistakes: [
      'Buying large bundles without checking whether Telkom coverage is consistent in your area.',
      'Assuming Telkom is always the cheapest in every bundle category.',
      'Confusing fixed-style/home products with normal mobile prepaid bundles.',
      'Choosing headline GB size without checking validity and expiry behavior.',
      'Treating a personalised Mo\'Nice offer as a fixed national price.'
    ],
    comparisonSummary: [
      { network: 'Telkom', bestFor: 'Reviewed daily, weekly and social rows', usuallyCheapest: 'Compare live', coverage: 'Check local map', goodFor: 'Users matching validity to their use case', href: '/network/telkom/' },
      { network: 'MTN', bestFor: 'Balanced performance', usuallyCheapest: 'Sometimes', coverage: 'Strong national footprint', goodFor: 'Users wanting consistency and promos', href: '/network/mtn/' },
      { network: 'Vodacom', bestFor: 'Coverage consistency', usuallyCheapest: 'No', coverage: 'Very strong national footprint', goodFor: 'Reliability-focused users', href: '/network/vodacom/' },
      { network: 'Cell C', bestFor: 'Deal alternatives', usuallyCheapest: 'Sometimes', coverage: 'Dual-MOCN partner footprint', goodFor: 'Promo-led buyers', href: '/network/cell-c/' }
    ],
    faqs: [
      {
        question: 'How do I buy Telkom data?',
        answer: 'Purchase Telkom bundles using *180# or supported app channels. Check Mo\'Nice on *123# and compare any live offer with the standard menu.'
      },
      {
        question: 'How does Telkom data pricing compare with Vodacom or MTN?',
        answer: 'The result depends on bundle size, validity and current public pricing. Compare like-for-like anytime allocations and local coverage rather than assuming a permanent winner.'
      },
      {
        question: 'How do I check my Telkom balance?',
        answer: 'Dial *188# to check your current airtime and data balance. Night-data balances can appear separately depending on the bundle type on your line.'
      },
      {
        question: 'What is the cheapest Telkom 1GB option?',
        answer: 'Daily and short-validity options may be cheapest upfront, while monthly options can be better for regular usage control.'
      },
      {
        question: 'Does Telkom have unlimited prepaid data?',
        answer: 'Most Telkom prepaid mobile bundles are capped. Unlimited-style offerings are usually in separate product categories.'
      },
      {
        question: 'Can I buy Telkom bundles with airtime?',
        answer: 'Yes, prepaid Telkom bundles can generally be purchased with airtime balance.'
      },
      {
        question: 'How do I avoid wasting Telkom data?',
        answer: 'Choose bundle validity that matches your usage cycle and avoid overbuying if you may not finish data in time.'
      },
      {
        question: 'Is Telkom better than Cell C for value?',
        answer: 'Telkom often leads on large-bundle cost per GB, while Cell C can be competitive on specific promotions.'
      }
    ]
  },
  'cell-c': {
    slug: 'cell-c',
    networkName: 'Cell C',
    intro: 'Compare Cell C data deals, Cell C data bundles, prepaid data, promo-led offers, price, validity, and value before you buy. Use the Cell C USSD help below to check bundle and account routes, then match the offer to your real use case.',
    bestFor: 'Promo-driven prepaid value alternatives',
    verdictSummary: 'Cell C can deliver strong value on targeted promotions, but users should verify validity limits and local network experience before committing.',
    strengths: [
      'Competitive pricing on selected Cell C data deals and monthly bundles',
      'Promo-led offers for value seekers who check current menus first',
      'Social and targeted bundles for app-heavy users',
      'Alternative pricing route versus premium networks'
    ],
    tips: [
      'Check current promo bundles first before buying standard Cell C options.',
      'Compare validity windows carefully because very cheap bundles can expire quickly.',
      'Use social bundles only when you understand app restrictions and fair-use terms.'
    ],
    extraSavingsTips: [
      'Do not assume every Cell C promotion is permanent; campaign pricing can change quickly.',
      'If signal quality varies in your area, compare practical coverage performance before committing to large bundles.'
    ],
    howToBuySection: {
      title: 'How to buy Cell C data bundles',
      paragraphs: [
        'Buy Cell C bundles through *147# and Cell C digital channels. Many users also buy via supported banking routes.',
        'Use the Cell C app or website to verify your number and view any MyConnecta offers available to your line, then compare the live terms with the standard menu.',
        'For full steps, visit /guides/how-to-buy-data-cell-c/.'
      ]
    },
    personalisedSection: {
      title: 'What are Cell C MyConnecta deals?',
      paragraphs: [
        'MyConnecta offers require number verification and can vary by usage profile, spend and period.',
        'Use the Cell C app or website to view offers for your own line. *141# may show alternative offers, while *147# remains the standard bundle and self-service menu.'
      ]
    },
    editorialComparisonSection: {
      title: 'How Cell C compares to other networks',
      paragraphs: [
        'Cell C often appeals to users chasing promos and selective value, while MTN and Vodacom are more often chosen for consistency.',
        'Compare /network/telkom/ for baseline budget pricing and /network/mtn/ or /network/vodacom/ for broader network performance.'
      ]
    },
    commonQuestionsSection: {
      title: 'Common Cell C data questions',
      items: [
        { question: 'Is Cell C always the cheapest?', answer: 'No network is always cheapest. Compare the current public menu and any MyConnecta offer shown after verifying your own number.' },
        { question: 'Why does Cell C value change so often?', answer: 'Campaign-led pricing can change frequently, so deals are often time-bound.' },
        { question: 'Does Cell C have good coverage?', answer: 'Coverage experience can vary by area and by the partner radio network serving the line, so check the Cell C coverage map and test locally.' },
        { question: 'How do I buy Cell C data?', answer: 'Use *147# for the standard bundle menu or Cell C digital channels. MyConnecta offers require number verification on the app or website.' },
        { question: 'Are Cell C social bundles full internet?', answer: 'No. Social bundles are usually app-limited and should not be treated as full browsing data.' },
        { question: 'Do Cell C night-data windows always match?', answer: 'No. Day-By-Day Daily Nite wording uses midnight to 04:59, while LTE/Home Connecta product-family rules can differ.' }
      ]
    },
    narrowSearchLinks: [
      { href: '/guides/how-to-buy-data-cell-c/', label: 'How to buy Cell C data' },
      { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB data in SA' },
      { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best monthly data deals in SA' },
      { href: '/ussd-codes-south-africa/', label: 'Cell C USSD codes' }
    ],
    commonMistakes: [
      'Expecting every Cell C promo to remain available long-term.',
      'Buying purely on headline price without checking validity and restrictions.',
      'Confusing social/app bundles with full internet access.',
      'Ignoring local coverage experience when comparing deals.',
      'Treating a MyConnecta or campaign offer as available to every Cell C number.'
    ],
    comparisonSummary: [
      { network: 'Cell C', bestFor: 'Promo-led alternatives', usuallyCheapest: 'Sometimes', coverage: 'Dual-MOCN partner footprint', goodFor: 'Bargain hunters and selective deal buyers', href: '/network/cell-c/' },
      { network: 'Telkom', bestFor: 'Reviewed daily, weekly and social rows', usuallyCheapest: 'Compare live', coverage: 'Check local map', goodFor: 'Users matching validity to their use case', href: '/network/telkom/' },
      { network: 'MTN', bestFor: 'Balanced all-round use', usuallyCheapest: 'Sometimes', coverage: 'Strong national footprint', goodFor: 'Coverage and promo balance', href: '/network/mtn/' },
      { network: 'Vodacom', bestFor: 'Reliability and consistency', usuallyCheapest: 'No', coverage: 'Very strong national footprint', goodFor: 'Users prioritising stable service', href: '/network/vodacom/' }
    ],
    faqs: [
      {
        question: 'How do I buy Cell C data bundles?',
        answer: 'Dial *147# for the standard bundle menu. Use the Cell C app or website and verify your number to view any MyConnecta offers available to your line.'
      },
      {
        question: 'Does Cell C have good coverage?',
        answer: 'Cell C uses a national dual-MOCN model across MTN and Vodacom radio access networks. Coverage and performance are still location-dependent, so check the current Cell C map and test the places that matter to you.'
      },
      {
        question: 'How does Cell C data pricing compare?',
        answer: 'Compare the current *147# menu with any MyConnecta offer shown after number verification. Allocation, validity, price and availability can change, so older promotions are not reliable benchmarks.'
      },
      {
        question: 'What is the cheapest Cell C 1GB option?',
        answer: 'Short-validity options can be cheaper upfront, while monthly options may better suit regular users.'
      },
      {
        question: 'Can I buy Cell C bundles with airtime?',
        answer: 'Yes, most prepaid bundles can be purchased with airtime balance through approved channels.'
      },
      {
        question: 'Does Cell C have unlimited prepaid data?',
        answer: 'Most Cell C prepaid offerings are capped by bundle size and validity.'
      },
      {
        question: 'How do I avoid expensive out-of-bundle usage on Cell C?',
        answer: 'Keep an active bundle and monitor balances before expiry to prevent accidental airtime consumption.'
      },
      {
        question: 'Is Cell C better than Telkom for value?',
        answer: 'Cell C can be very competitive on promotions, while Telkom often leads on baseline large-bundle pricing.'
      }
    ]
  },
  'rain': {
    slug: 'rain',
    networkName: 'Rain',
    intro: 'Rain is different from the prepaid mobile networks in this comparison because it focuses on app- and web-managed monthly products instead of large prepaid USSD bundle menus. Current public families include unlimited home, rainOne Unlimited, unlimited mobile with LoopPhone, and the loop portable router, so compare the product family before treating a Rain price as a normal mobile-data bundle.',
    bestFor: 'Home, fixed-use, and high-volume data where Rain coverage fits',
    strengths: [
      'Unlimited home 5G home-wifi plans',
      'rainOne Unlimited home-and-mobile options',
      'Unlimited mobile with LoopPhone and the loop portable-router family',
      'No contracts or long-term commitments',
      'Simple, app-based account management'
    ],
    tips: [
      'Rain is often best evaluated as a home internet, mobile-combo, or portable-router product rather than a normal prepaid mobile bundle.',
      'Check Rain coverage and the exact product\'s location or loopzone rules before committing to unlimited home or loop plans.',
      'Manage everything through the Rain dashboard or mobile app for instant control.'
    ],
    verdictSummary: 'Rain has fewer listed deals here because its product structure is different from prepaid mobile bundle menus: compare coverage fit, monthly price, device terms, location rules and included mobile extras rather than SKU count.',
    faqs: [
      {
        question: 'Does Rain have USSD codes?',
        answer: 'No, Rain does not use USSD codes. All management, from activation to checking usage and changing plans, is done via the Rain app or their website portal.'
      },
      {
        question: 'Is Rain data truly unlimited?',
        answer: 'Rain unlimited home, rainOne Unlimited and loop products include unlimited-style elements, but speed tiers, device terms, location rules and coverage conditions still matter. Check the exact official product page before buying.'
      },
      {
        question: 'Is Rain better for home internet or mobile?',
        answer: 'Unlimited home is the home-wifi family, rainOne Unlimited combines home and mobile services, unlimited mobile is offered with LoopPhone, and the loop is a portable-router product with location rules.'
      }
    ]
  }
};
