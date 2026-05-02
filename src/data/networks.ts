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
    intro: 'Vodacom is usually chosen for coverage consistency, not because it is always the cheapest network. In many areas, users pay a premium for reliability, while savings often come from selecting the right bundle type and checking personalised offers first.',
    bestFor: 'Coverage consistency and premium network reliability',
    verdictSummary: 'Vodacom is usually chosen for coverage and consistency rather than being the cheapest option. Most savings come from matching bundle validity to usage and checking personalised offers first.',
    strengths: [
      'Strong 4G and 5G footprint across urban and many rural areas',
      'Broad spread of hourly, daily, weekly and monthly prepaid options',
      'Personalised Just 4 You offers can be cheaper than standard pricing',
      'Widely used self-service channels via USSD, app and banking integrations'
    ],
    tips: [
      'Check Just 4 You (*123#) before buying a standard prepaid bundle.',
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
        'Most prepaid users buy data through *135# and the data menu flow on *135*2#. You can also buy through the My Vodacom or VodaPay app, plus selected banking app channels.',
        'Before paying standard rates, check *123# (Just 4 You). These personalised offers can be cheaper, but they are not identical for every customer and can change over time.',
        'For a step-by-step walkthrough, use the How to buy Vodacom data guide: /guides/how-to-buy-data-vodacom/'
      ]
    },
    personalisedSection: {
      title: 'What is Vodacom Just 4 You?',
      paragraphs: [
        'Just 4 You is Vodacom\'s personalised offer channel. It is driven by usage profile and campaigns, so two prepaid users can see different deals on the same day.',
        'Check on *123#. Treat it as a variable savings channel, not a fixed public bundle table.'
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
        { question: 'Why is Vodacom data expensive?', answer: 'Vodacom standard prepaid can be pricier than value-led rivals, especially outside personalised promotions.' },
        { question: 'Why is my Vodacom data finishing so fast?', answer: 'Background updates, video autoplay and out-of-bundle usage are common reasons for rapid data drain.' },
        { question: 'How do I stop out-of-bundle charges?', answer: 'Keep an active bundle and manage out-of-bundle settings in self-service channels so airtime is protected.' },
        { question: 'Is Vodacom cheaper through Just 4 You?', answer: 'Often yes, but not always. Just 4 You is personalised, so offer value varies by user and campaign.' },
        { question: 'Does Vodacom have unlimited prepaid data?', answer: 'True unlimited prepaid handset data is uncommon. Unlimited-style options are usually tied to fixed LTE or 5G product categories.' }
      ]
    },
    narrowSearchLinks: [
      { href: '/guides/how-to-buy-data-vodacom/', label: 'How to buy Vodacom data' },
      { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'Vodacom vs MTN' },
      { href: '/guides/stop-wasp-subscriptions-south-africa/', label: 'Stop out-of-bundle charges' },
      { href: '/ussd-codes-south-africa/', label: 'Vodacom USSD codes' }
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
        bestFor: 'Low cost per GB',
        usuallyCheapest: 'Often',
        coverage: 'Best in metros',
        goodFor: 'Budget-focused prepaid users',
        href: '/network/telkom/'
      },
      {
        network: 'Cell C',
        bestFor: 'Value mixes',
        usuallyCheapest: 'Sometimes',
        coverage: 'Roaming-backed footprint',
        goodFor: 'Flexible monthly and social buyers',
        href: '/network/cell-c/'
      }
    ],
    faqs: [
      {
        question: 'How do I buy Vodacom data bundles?',
        answer: 'You can buy Vodacom data via *135# or *135*2#, in the My Vodacom or VodaPay app, and through selected banking apps. For personalised offers, check Just 4 You on *123# first.'
      },
      {
        question: 'What is the cheapest Vodacom 1GB data bundle?',
        answer: 'On Vodacom’s public prepaid menu, the daily and weekly 1GB options are usually the cheaper entry points upfront, while the 30-day once-off 1GB bundle costs more per GB. Just 4 You can still beat listed menu pricing for some users.'
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
        answer: 'It depends on the bundle and your personalised offers. Vodacom often wins on coverage consistency, while MTN may be cheaper on certain promotional prepaid bundles.'
      }
    ]
  },
  'mtn': {
    slug: 'mtn',
    networkName: 'MTN',
    intro: 'MTN is usually the strongest all-round prepaid option when you want broad coverage plus frequent promotions. It is often compared directly with Vodacom, and value can improve a lot when you check personalised offers first.',
    bestFor: 'Strong all-round prepaid performance',
    verdictSummary: 'MTN is often a balanced choice for users who want strong coverage plus regular promo value, especially when personalised deals are active.',
    strengths: [
      'Strong national 4G coverage with reliable urban performance',
      'Frequent promo mechanics through Boosta and Made4U-style offers',
      'Wide spread of daily, weekly and monthly prepaid options',
      'Good balance between performance and deal availability'
    ],
    tips: [
      'Check Made4U offers first before buying standard MTN prepaid bundles.',
      'Compare Boosta-style options against normal monthly bundles to confirm real Rand-per-GB value.',
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
        'Before checking out on standard menus, review MTN personalised offers via *142# where available.',
        'Need full steps? Use /guides/how-to-buy-data-mtn/.'
      ]
    },
    personalisedSection: {
      title: 'What are MTN personalised deals?',
      paragraphs: [
        'MTN often runs personalised prepaid offers (commonly seen as Made4U-style deals) that vary by user profile and campaign period.',
        'Treat promo offers as variable, not guaranteed public pricing.'
      ]
    },
    editorialComparisonSection: {
      title: 'How MTN compares to other networks',
      paragraphs: [
        'MTN usually sits between premium reliability and value pricing: often cheaper than Vodacom on promos, while still maintaining strong coverage.',
        'For direct comparisons, check /guides/vodacom-vs-mtn-data-prices/ and compare /network/telkom/ or /network/cell-c/ for price-led alternatives.'
      ]
    },
    commonQuestionsSection: {
      title: 'Common MTN data questions',
      items: [
        { question: 'Is MTN cheaper than Vodacom?', answer: 'Often on promotional bundles, yes. On standard bundles, it depends on size and validity.' },
        { question: 'Why does MTN data finish fast?', answer: 'Background updates and video-heavy apps are common causes, especially near bundle expiry.' },
        { question: 'How do I stop MTN out-of-bundle usage?', answer: 'Keep a valid bundle active and manage data settings before balance reaches zero.' },
        { question: 'Are MTN promos always available?', answer: 'No. Promo availability changes by campaign and customer profile.' },
        { question: 'Does MTN have night bundles?', answer: 'Yes, selected night-focused options are available, but terms and windows can vary.' }
      ]
    },
    narrowSearchLinks: [
      { href: '/guides/how-to-buy-data-mtn/', label: 'How to buy MTN data' },
      { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'MTN vs Vodacom' },
      { href: '/guides/why-is-my-data-finishing-so-fast/', label: 'Why MTN data finishes fast' },
      { href: '/ussd-codes-south-africa/', label: 'MTN USSD codes' }
    ],
    commonMistakes: [
      'Ignoring app-only or personalised MTN promotions before buying standard bundles.',
      'Buying small daily bundles repeatedly instead of moving to weekly or monthly options.',
      'Assuming every MTN promo is always active for every SIM.',
      'Letting bundles expire and dropping into out-of-bundle charging.',
      'Comparing headline bundle size without checking validity and cost per GB.'
    ],
    comparisonSummary: [
      { network: 'MTN', bestFor: 'Balanced speed and value', usuallyCheapest: 'Sometimes', coverage: 'Strong national footprint', goodFor: 'Users wanting all-round prepaid performance', href: '/network/mtn/' },
      { network: 'Vodacom', bestFor: 'Consistency and coverage', usuallyCheapest: 'No', coverage: 'Very strong national footprint', goodFor: 'Signal reliability first', href: '/network/vodacom/' },
      { network: 'Telkom', bestFor: 'Low cost per GB', usuallyCheapest: 'Often', coverage: 'Best in metros', goodFor: 'Budget-first data buyers', href: '/network/telkom/' },
      { network: 'Cell C', bestFor: 'Promo-driven value', usuallyCheapest: 'Sometimes', coverage: 'Roaming-backed', goodFor: 'Deal hunters', href: '/network/cell-c/' }
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
        question: 'What are MTN Boosta bundles?',
        answer: 'Boosta bundles are MTN promotional structures that can increase included data value compared to standard offers.'
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
        answer: 'MTN is often strong on promo value while Vodacom often leads on coverage consistency; best choice depends on your area and usage.'
      }
    ]
  },
  'telkom': {
    slug: 'telkom',
    networkName: 'Telkom',
    intro: 'Telkom is usually the value-first choice for prepaid users chasing lower Rand-per-GB, especially on larger monthly bundles. Pricing is often excellent, but user experience can still vary by area.',
    bestFor: 'Value-led prepaid data pricing',
    verdictSummary: 'Telkom often leads on prepaid value, but best results depend on your local coverage quality and choosing the right validity period.',
    strengths: [
      'Often cheaper than premium rivals on larger monthly bundles',
      'Strong Mo\'Nice personalised pricing potential',
      'Competitive 1GB-to-20GB price points',
      'Attractive option for price-sensitive users'
    ],
    tips: [
      'Check Mo\'Nice and standard pricing before buying to see which gives lower cost per GB.',
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
        'Check Mo\'Nice-style personalised options first, because they can be cheaper than standard menu pricing for some users.',
        'See /guides/how-to-buy-data-telkom/ for the full buy flow.'
      ]
    },
    personalisedSection: {
      title: 'What are Telkom Mo\'Nice deals?',
      paragraphs: [
        'Mo\'Nice refers to Telkom personalised prepaid offers that can change by campaign, profile and usage history.',
        'Treat them as personalised deals, not fixed public rates.'
      ]
    },
    editorialComparisonSection: {
      title: 'How Telkom compares to other networks',
      paragraphs: [
        'Telkom is often strongest on price-per-GB for larger bundles, while MTN and Vodacom are often preferred for broader consistency.',
        'Compare /network/mtn/, /network/vodacom/ and /network/cell-c/ to match price against your local coverage realities.'
      ]
    },
    commonQuestionsSection: {
      title: 'Common Telkom data questions',
      items: [
        { question: 'Is Telkom always the cheapest network?', answer: 'Often for larger prepaid bundles, but not always for every bundle size or validity window.' },
        { question: 'Why is my Telkom speed inconsistent?', answer: 'Performance can vary by area and congestion, so local experience matters more than headline pricing.' },
        { question: 'How do I buy Telkom data bundles?', answer: 'Use *180# or Telkom-supported channels, and check personalised options first.' },
        { question: 'Does Telkom have night bundles?', answer: 'Yes, selected night-style options exist, but terms can change over time.' },
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
      'Ignoring personalised Mo\'Nice offers before purchasing standard bundles.'
    ],
    comparisonSummary: [
      { network: 'Telkom', bestFor: 'Low cost per GB', usuallyCheapest: 'Often', coverage: 'Best in metros', goodFor: 'Price-sensitive prepaid users', href: '/network/telkom/' },
      { network: 'MTN', bestFor: 'Balanced performance', usuallyCheapest: 'Sometimes', coverage: 'Strong national footprint', goodFor: 'Users wanting consistency and promos', href: '/network/mtn/' },
      { network: 'Vodacom', bestFor: 'Coverage consistency', usuallyCheapest: 'No', coverage: 'Very strong national footprint', goodFor: 'Reliability-focused users', href: '/network/vodacom/' },
      { network: 'Cell C', bestFor: 'Deal alternatives', usuallyCheapest: 'Sometimes', coverage: 'Roaming-backed', goodFor: 'Promo-led buyers', href: '/network/cell-c/' }
    ],
    faqs: [
      {
        question: 'How do I buy Telkom data?',
        answer: 'Purchase Telkom bundles using *180# or supported app channels. Check Mo\'Nice offers before buying standard bundles.'
      },
      {
        question: 'Is Telkom data cheaper than Vodacom or MTN?',
        answer: 'Generally, yes. Telkom usually offers the lowest cost-per-GB for standard "Anytime" prepaid data bundles compared to the other major mobile networks.'
      },
      {
        question: 'How do I check my Telkom balance?',
        answer: 'Dial *188# to receive an SMS with your current airtime and data balance, including Night Owl data.'
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
    intro: 'Cell C is a deal-driven prepaid option that can be very competitive on selected bundles and promos. It is often used by bargain-hunters willing to compare campaigns and validity terms carefully.',
    bestFor: 'Promo-driven prepaid value alternatives',
    verdictSummary: 'Cell C can deliver strong value on targeted promotions, but users should verify validity limits and local network experience before committing.',
    strengths: [
      'Competitive pricing on selected weekly and monthly bundles',
      'Frequent promotional mechanics for value seekers',
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
        'Check personalised and promotional menus first because Cell C value is often strongest on campaign-led offers.',
        'For full steps, visit /guides/how-to-buy-data-cell-c/.'
      ]
    },
    personalisedSection: {
      title: 'What are Cell C personalised deals?',
      paragraphs: [
        'Cell C frequently runs personalised or campaign-led offers that vary by user and period.',
        'Use them as opportunistic savings channels, not guaranteed base pricing.'
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
        { question: 'Is Cell C always the cheapest?', answer: 'Not always. It can be very competitive on certain promotions but less aggressive on others.' },
        { question: 'Why does Cell C value change so often?', answer: 'Campaign-led pricing can change frequently, so deals are often time-bound.' },
        { question: 'Does Cell C have good coverage?', answer: 'Coverage experience can vary by area and roaming conditions, so local testing matters.' },
        { question: 'How do I buy Cell C data?', answer: 'Use *147# and official channels, then compare active promos before checkout.' },
        { question: 'Are Cell C social bundles full internet?', answer: 'No. Social bundles are usually app-limited and should not be treated as full browsing data.' }
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
      'Skipping current promo checks before buying standard bundles.'
    ],
    comparisonSummary: [
      { network: 'Cell C', bestFor: 'Promo-led alternatives', usuallyCheapest: 'Sometimes', coverage: 'Roaming-backed footprint', goodFor: 'Bargain hunters and selective deal buyers', href: '/network/cell-c/' },
      { network: 'Telkom', bestFor: 'Large-bundle value', usuallyCheapest: 'Often', coverage: 'Best in metros', goodFor: 'Budget-first monthly users', href: '/network/telkom/' },
      { network: 'MTN', bestFor: 'Balanced all-round use', usuallyCheapest: 'Sometimes', coverage: 'Strong national footprint', goodFor: 'Coverage and promo balance', href: '/network/mtn/' },
      { network: 'Vodacom', bestFor: 'Reliability and consistency', usuallyCheapest: 'No', coverage: 'Very strong national footprint', goodFor: 'Users prioritising stable service', href: '/network/vodacom/' }
    ],
    faqs: [
      {
        question: 'How do I buy Cell C data bundles?',
        answer: 'Dial *147# for bundle menus and use Cell C digital channels for current promotions and personalised options.'
      },
      {
        question: 'Does Cell C have good coverage?',
        answer: 'Yes, Cell C has significant coverage across South Africa because it utilizes roaming agreements with both MTN and Vodacom in areas where it doesn\'t have its own towers.'
      },
      {
        question: 'Is Cell C cheaper for data?',
        answer: 'Cell C is often very competitive, especially on monthly bundles and social media packs. They frequently run "Double Data" promotions that offer high value for money.'
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
    intro: 'Rain has revolutionized the South African market by focusing on unlimited data plans. Unlike traditional networks, Rain is app-managed and does not use USSD codes, making it a favorite for home office setups and heavy data users in 5G-enabled areas.',
    bestFor: 'Best for Home 5G & Unlimited Data',
    strengths: [
      'Truly unlimited 4G and 5G data plans',
      'No contracts or long-term commitments',
      'Very high speeds in strong 5G coverage areas',
      'Simple, app-based account management'
    ],
    tips: [
      'Rain is best used as a "Fixed" or "Home" internet solution rather than mobile-only.',
      'Check your 5G coverage before committing to the premium unlimited plans.',
      'Manage everything through the Rain dashboard or mobile app for instant control.'
    ],
    faqs: [
      {
        question: 'Does Rain have USSD codes?',
        answer: 'No, Rain does not use USSD codes. All management, from activation to checking usage and changing plans, is done via the Rain app or their website portal.'
      },
      {
        question: 'Is Rain data truly unlimited?',
        answer: 'Rain offers several "Unlimited" plans. While they don\'t have a hard data cap, they do have policies regarding streaming quality (e.g., Basic vs. HD) depending on the specific plan you choose.'
      },
      {
        question: 'Is Rain better for home internet or mobile?',
        answer: 'Rain is most popular as a home internet replacement (Fixed-LTE or 5G). While you can use it on a mobile phone, its unlimited nature makes it ideal for households with multiple devices.'
      }
    ]
  }
};
