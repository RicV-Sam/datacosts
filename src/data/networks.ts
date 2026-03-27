import { NetworkName } from '../types';

export interface NetworkPageData {
  slug: string;
  networkName: NetworkName;
  intro: string;
  tips: string[];
  bestFor: string;
  strengths: string[];
  faqs: { question: string; answer: string }[];
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
        answer: 'For standard prepaid pricing, daily or weekly 1GB bundles are often cheaper upfront than 30-day options. The monthly 1GB bundle is usually priced higher per GB, but Just 4 You may offer better personalised rates.'
      },
      {
        question: 'Does Vodacom have unlimited data?',
        answer: 'Vodacom has unlimited-style products mainly on fixed LTE/5G and selected contract categories. Standard prepaid handset bundles are generally capped by volume and validity.'
      },
      {
        question: 'How do I check my Vodacom data balance?',
        answer: 'Dial *135# for a quick balance view. For more detailed bundle visibility, use *135*502# or check in the My Vodacom app.'
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
    intro: 'MTN is a leading telecommunications provider in South Africa, offering high-speed connectivity and aggressive data promotions. MTN is particularly popular for its "Boosta" bundles and extensive 5G network, often providing excellent value for money in urban and suburban areas.',
    bestFor: 'Best for Speed & Performance',
    strengths: [
      'Consistently high average download speeds',
      'Aggressive Boosta bundle promotions',
      'Strong 5G presence in urban areas',
      'Excellent roaming performance'
    ],
    tips: [
      'Look out for MTN "Made For You" deals in the mobile app for significant savings.',
      'Consider MTN Boosta bundles for extra data value on monthly plans.',
      'Use the MTN app to manage your data limit and prevent unexpected costs.'
    ],
    faqs: [
      {
        question: 'How do I buy MTN data bundles?',
        answer: 'MTN bundles can be purchased by dialing *136*2#, using the MTN App, or via online banking. Personalized "Made4U" deals are available by dialing *142#.'
      },
      {
        question: 'What are MTN Boosta bundles?',
        answer: 'MTN Boosta bundles are promotional offers that provide significantly more data (often double) for a slightly higher price than standard bundles, usually valid for 30 days.'
      },
      {
        question: 'How do I check my MTN data balance?',
        answer: 'Dial *136# to see a quick summary of your airtime and data, or use the MTN app for a detailed breakdown of all active bundles.'
      }
    ]
  },
  'telkom': {
    slug: 'telkom',
    networkName: 'Telkom',
    intro: 'Telkom is widely recognized as the most budget-friendly network for "Anytime" prepaid data in South Africa. With its competitive pricing and "Mo\'Nice" personalized offers, Telkom is the go-to choice for users looking to maximize their data per Rand.',
    bestFor: 'Best for Prepaid Value',
    strengths: [
      'Lowest standard price for 30-day Anytime data',
      'Highly competitive Mo\'Nice personalized deals',
      'Strong performance in metropolitan areas',
      'Great value for large volume (20GB+) prepaid packs'
    ],
    tips: [
      'Dial *180# and check the "Mo\'Nice" menu for the absolute cheapest personalized deals.',
      'Telkom\'s prepaid bundles are often significantly cheaper than competitors for the same volume.',
      'Be aware of coverage maps as Telkom performs best in metropolitan areas.'
    ],
    faqs: [
      {
        question: 'How do I buy Telkom data?',
        answer: 'Purchase Telkom bundles by dialing *180#. For the best possible rates, always check the Mo\'Nice menu by dialing *123# before buying a standard bundle.'
      },
      {
        question: 'Is Telkom data cheaper than Vodacom or MTN?',
        answer: 'Generally, yes. Telkom usually offers the lowest cost-per-GB for standard "Anytime" prepaid data bundles compared to the other major mobile networks.'
      },
      {
        question: 'How do I check my Telkom balance?',
        answer: 'Dial *188# to receive an SMS with your current airtime and data balance, including Night Owl data.'
      }
    ]
  },
  'cell-c': {
    slug: 'cell-c',
    networkName: 'Cell C',
    intro: 'Cell C offers value-focused data plans by leveraging roaming agreements with South Africa\'s largest networks. This allows Cell C to provide broad coverage while maintaining competitive prices on their monthly and weekly data bundles.',
    bestFor: 'Best for Social Media & Value',
    strengths: [
      'Affordable social media specific bundles',
      'Broad coverage via MTN/Vodacom roaming',
      'Competitive weekly and monthly data rates',
      'Flexible "For You" personalized offers'
    ],
    tips: [
      'Check the Cell C app for "Double Data" promotions on selected bundles.',
      'Cell C\'s monthly bundles offer a good balance between price and validity.',
      'Take advantage of Cell C\'s social media specific bundles for targeted savings.'
    ],
    faqs: [
      {
        question: 'How do I buy Cell C data bundles?',
        answer: 'Dial *147# to access the main bundle menu, or use the Cell C App for exclusive promotions and "For You" personalized deals.'
      },
      {
        question: 'Does Cell C have good coverage?',
        answer: 'Yes, Cell C has significant coverage across South Africa because it utilizes roaming agreements with both MTN and Vodacom in areas where it doesn\'t have its own towers.'
      },
      {
        question: 'Is Cell C cheaper for data?',
        answer: 'Cell C is often very competitive, especially on monthly bundles and social media packs. They frequently run "Double Data" promotions that offer high value for money.'
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
