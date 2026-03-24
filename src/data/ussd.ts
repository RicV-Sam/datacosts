import { USSDEntry } from '../types';

export const ussdRepository: USSDEntry[] = [
  // VODACOM
  {
    network: 'Vodacom',
    category: 'Balance',
    action: 'Check Balance (Main)',
    code: '*135#',
    explanation: 'Quick summary of airtime, data and SMS balances.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Vodacom',
    category: 'Balance',
    action: 'Detailed Balance',
    code: '*135*502#',
    explanation: 'Get a full breakdown of all your active bundles.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Vodacom',
    category: 'Airtime / Recharge',
    action: 'Recharge with Voucher',
    code: '*136*VoucherCode#',
    explanation: 'Instantly top up your account using a physical voucher.',
    status: 'verified',
    dialable: false
  },
  {
    network: 'Vodacom',
    category: 'Data / Bundles',
    action: 'Buy Data / Bundles',
    code: '*135*2#',
    explanation: 'Purchase daily, weekly or monthly data and social bundles.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Vodacom',
    category: 'Transfers',
    action: 'Transfer Airtime / Data',
    code: '*135*1002#',
    explanation: 'Send airtime or data to another Vodacom number.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Vodacom',
    category: 'Number / SIM info',
    action: 'Check My Number',
    code: '*135*501#',
    explanation: 'Displays your current MSISDN (cellphone number).',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Vodacom',
    category: 'Self-service / Account',
    action: 'Manage My Account',
    code: '*135#',
    explanation: 'Change settings, manage VAS services and update profile.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Vodacom',
    category: 'Support / Customer care',
    action: 'Customer Care Call',
    code: '135',
    explanation: 'Call center support for all queries.',
    status: 'verified',
    dialable: true
  },

  // MTN
  {
    network: 'MTN',
    category: 'Balance',
    action: 'Check Balance',
    code: '*136#',
    explanation: 'View your remaining airtime and data bundles.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'MTN',
    category: 'Airtime / Recharge',
    action: 'Recharge Account',
    code: '*136*VoucherCode#',
    explanation: 'Top up your MTN prepaid account.',
    status: 'verified',
    dialable: false
  },
  {
    network: 'MTN',
    category: 'Data / Bundles',
    action: 'Buy Data / Bundles',
    code: '*136*2#',
    explanation: 'Access the menu to buy data and specialized bundles.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'MTN',
    category: 'Transfers',
    action: 'MTN Me2U (Transfer)',
    code: '*136*3#',
    explanation: 'Transfer airtime or data to other MTN users.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'MTN',
    category: 'Number / SIM info',
    action: 'Check My Number',
    code: '*123*888#',
    explanation: 'Quickly find your own phone number.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'MTN',
    category: 'Support / Customer care',
    action: 'MTN Helpdesk',
    code: '135',
    explanation: 'Direct line to MTN customer support.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'MTN',
    category: 'Promotions / Advance airtime / Extras',
    action: 'XtraTime',
    code: '*151#',
    explanation: 'Advance airtime or data when you are low on balance.',
    status: 'verified',
    dialable: true
  },

  // TELKOM
  {
    network: 'Telkom',
    category: 'Balance',
    action: 'Check Balance',
    code: '*188#',
    explanation: 'Shows your anytime and night-owl data balances.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Telkom',
    category: 'Data / Bundles',
    action: 'Buy Data',
    code: '*180#',
    explanation: 'The main menu for purchasing Telkom Mo\'Nice and standard bundles.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Telkom',
    category: 'Number / SIM info',
    action: 'Check My Number',
    code: '*1#',
    explanation: 'Displays your Telkom mobile number.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Telkom',
    category: 'Support / Customer care',
    action: 'Customer Care',
    code: '180',
    explanation: 'Call for Telkom technical and account support.',
    status: 'verified',
    dialable: true
  },

  // CELL C
  {
    network: 'Cell C',
    category: 'Balance',
    action: 'Check Balance',
    code: '*101#',
    explanation: 'View your airtime and data bundle status.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Cell C',
    category: 'Data / Bundles',
    action: 'Buy Bundles',
    code: '*147#',
    explanation: 'Choose from a variety of data, voice, and SMS bundles.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Cell C',
    category: 'Number / SIM info',
    action: 'Check My Number',
    code: '*147*100#',
    explanation: 'Confirm your Cell C mobile number.',
    status: 'verified',
    dialable: true
  },
  {
    network: 'Cell C',
    category: 'Support / Customer care',
    action: 'Customer Service',
    code: '135',
    explanation: 'Speak to a Cell C representative.',
    status: 'verified',
    dialable: true
  },

  // RAIN
  {
    network: 'Rain',
    category: 'Other',
    action: 'Rain Management',
    code: 'N/A',
    explanation: 'Rain is fully managed via the Rain app or website.',
    status: 'verified',
    note: 'Rain does not use traditional USSD codes for management.',
    dialable: false
  }
];
