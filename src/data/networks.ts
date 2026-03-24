import { NetworkName } from '../types';

export interface NetworkPageData {
  slug: string;
  networkName: NetworkName;
  intro: string;
  tips: string[];
}

export const networkPages: Record<string, NetworkPageData> = {
  'vodacom': {
    slug: 'vodacom',
    networkName: 'Vodacom',
    intro: 'Vodacom is South Africa\'s largest mobile network, known for its extensive coverage and "Gold Standard" 5G performance. While often priced at a premium, Vodacom offers a wide variety of bundles for every type of user, from ultra-low-cost daily packs to high-volume monthly data.',
    tips: [
      'Use the Vodacom App to access "Just 4 You" personalized discounted bundles.',
      'Check for 1-hour and 1-day bundles if you need a quick top-up for a specific task.',
      'Always keep an eye on your "Out-of-Bundle" settings to avoid expensive airtime consumption.'
    ]
  },
  'mtn': {
    slug: 'mtn',
    networkName: 'MTN',
    intro: 'MTN is a leading telecommunications provider in South Africa, offering high-speed connectivity and aggressive data promotions. MTN is particularly popular for its "Boosta" bundles and extensive 5G network, often providing excellent value for money in urban and suburban areas.',
    tips: [
      'Look out for MTN "Made For You" deals in the mobile app for significant savings.',
      'Consider MTN Boosta bundles for extra data value on monthly plans.',
      'Use the MTN app to manage your data limit and prevent unexpected costs.'
    ]
  },
  'telkom': {
    slug: 'telkom',
    networkName: 'Telkom',
    intro: 'Telkom is widely recognized as the most budget-friendly network for "Anytime" prepaid data in South Africa. With its competitive pricing and "Mo\'Nice" personalized offers, Telkom is the go-to choice for users looking to maximize their data per Rand.',
    tips: [
      'Dial *180# and check the "Mo\'Nice" menu for the absolute cheapest personalized deals.',
      'Telkom\'s prepaid bundles are often significantly cheaper than competitors for the same volume.',
      'Be aware of coverage maps as Telkom performs best in metropolitan areas.'
    ]
  },
  'cell-c': {
    slug: 'cell-c',
    networkName: 'Cell C',
    intro: 'Cell C offers value-focused data plans by leveraging roaming agreements with South Africa\'s largest networks. This allows Cell C to provide broad coverage while maintaining competitive prices on their monthly and weekly data bundles.',
    tips: [
      'Check the Cell C app for "Double Data" promotions on selected bundles.',
      'Cell C\'s monthly bundles offer a good balance between price and validity.',
      'Take advantage of Cell C\'s social media specific bundles for targeted savings.'
    ]
  },
  'rain': {
    slug: 'rain',
    networkName: 'Rain',
    intro: 'Rain has revolutionized the South African market by focusing on unlimited data plans. Unlike traditional networks, Rain is app-managed and does not use USSD codes, making it a favorite for home office setups and heavy data users in 5G-enabled areas.',
    tips: [
      'Rain is best used as a "Fixed" or "Home" internet solution rather than mobile-only.',
      'Check your 5G coverage before committing to the premium unlimited plans.',
      'Manage everything through the Rain dashboard or mobile app for instant control.'
    ]
  }
};
