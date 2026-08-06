import { USSDEntry } from '../types';

export const ussdRepository: readonly USSDEntry[] = [
  // VODACOM
  {
    id: 'ussd.vodacom.balance_detailed',
    network: 'Vodacom',
    category: 'Balance',
    action: 'Direct Balance Check',
    code: '*136#',
    explanation: 'Check your Vodacom airtime and bundle balances directly.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.balance_main',
    network: 'Vodacom',
    category: 'Balance',
    action: 'Main Self-service Menu',
    code: '*135#',
    explanation: 'Open Vodacom self-service, including bundle and account menus.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.recharge_voucher',
    network: 'Vodacom',
    category: 'Airtime / Recharge',
    action: 'Recharge with Voucher',
    code: '*136*01*PIN#',
    explanation: 'Load a prepaid voucher by inserting its recharge PIN.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.vodacom.buy_data',
    network: 'Vodacom',
    category: 'Data / Bundles',
    action: 'Buy Data / Bundles',
    code: '*135#',
    explanation: 'Open the main Vodacom menu, then select the current bundle option and follow the prompts.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.transfer_airtime_data',
    network: 'Vodacom',
    category: 'Transfers',
    action: 'Data Bundle Transfer / Buy',
    code: '*135*1002#',
    explanation: 'Open Vodacom\'s published data-bundle transfer and purchase route, then follow the current prompts.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.check_number',
    network: 'Vodacom',
    category: 'Number / SIM info',
    action: 'Check My Number',
    code: '*135*501#',
    explanation: 'Displays your current MSISDN (cellphone number).',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.account_menu',
    network: 'Vodacom',
    category: 'Self-service / Account',
    action: 'Manage My Account',
    code: '*135#',
    explanation: 'Change settings, manage VAS services and update profile.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.customer_care',
    network: 'Vodacom',
    category: 'Support / Customer care',
    action: 'Customer Care Call',
    code: '135',
    explanation: 'Call center support for all queries.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.vodacom.just4you',
    network: 'Vodacom',
    category: 'Promotions',
    action: 'Just 4 You Deals',
    code: '*123#',
    explanation: 'Personalized data and voice deals tailored to your usage.',
    status: 'verified',
    dialable: true
  },

  // MTN
  {
    id: 'ussd.mtn.balance_main',
    network: 'MTN',
    category: 'Balance',
    action: 'Check Balance',
    code: '*136#',
    explanation: 'View your remaining airtime and data bundles.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.mtn.recharge_voucher',
    network: 'MTN',
    category: 'Airtime / Recharge',
    action: 'Recharge Account',
    code: '*136*VoucherCode#',
    explanation: 'Top up your MTN prepaid account.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.mtn.buy_data',
    network: 'MTN',
    category: 'Data / Bundles',
    action: 'Buy Data / Bundles',
    code: '*136*2#',
    explanation: 'Access the menu to buy data and specialized bundles.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.mtn.transfer_airtime_data',
    network: 'MTN',
    category: 'Transfers',
    action: 'MTN Me2U (Transfer)',
    code: '*136*3#',
    explanation: 'Transfer airtime or data to other MTN users.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.mtn.check_number',
    network: 'MTN',
    category: 'Other',
    action: 'Own-number Help',
    code: 'N/A',
    explanation: 'MTN does not currently publish a network-wide own-number USSD shortcut; check the MTN App, SIM details, or call 135.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.mtn.customer_care',
    network: 'MTN',
    category: 'Support / Customer care',
    action: 'MTN Helpdesk',
    code: '135',
    explanation: 'Direct line to MTN customer support.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.mtn.xtratime',
    network: 'MTN',
    category: 'Promotions / Advance airtime / Extras',
    action: 'XtraTime',
    code: '*136*2*6#',
    explanation: 'Open the current XtraTime menu for eligible airtime or data advances; *151# may remain available on some profiles.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.mtn.mytownoffers',
    network: 'MTN',
    category: 'Promotions',
    action: 'MTN Made4U / personalised offers',
    code: '*142#',
    explanation: 'Check Made4U and other SIM-specific offers, including MyTownOffers where the line and location qualify.',
    status: 'verified',
    dialable: true
  },

  // TELKOM
  {
    id: 'ussd.telkom.balance_main',
    network: 'Telkom',
    category: 'Balance',
    action: 'Check Balance',
    code: '*188#',
    explanation: 'Shows airtime, Anytime data and Night Surfer balances where applicable.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.telkom.buy_data',
    network: 'Telkom',
    category: 'Data / Bundles',
    action: 'Buy Data',
    code: '*180#',
    explanation: 'Open Telkom self-service to buy standard bundles and use supported account actions.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.telkom.check_number',
    network: 'Telkom',
    category: 'Number / SIM info',
    action: 'Check My Number',
    code: '*1#',
    explanation: 'Displays your Telkom mobile number.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.telkom.customer_care',
    network: 'Telkom',
    category: 'Support / Customer care',
    action: 'Customer Care',
    code: '180',
    explanation: 'Call for Telkom technical and account support.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.telkom.monice',
    network: 'Telkom',
    category: 'Promotions',
    action: 'Mo\'Nice Deals',
    code: '*123#',
    explanation: 'View personalised Telkom data and voice offers available to your line; prices and eligibility vary by customer.',
    status: 'verified',
    dialable: true
  },

  // CELL C
  {
    id: 'ussd.cellc.balance_main',
    network: 'Cell C',
    category: 'Balance',
    action: 'Check Balance',
    code: '*101#',
    explanation: 'View your airtime and data bundle status.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.cellc.buy_data',
    network: 'Cell C',
    category: 'Data / Bundles',
    action: 'Buy Bundles',
    code: '*147#',
    explanation: 'Open Cell C self-service, select the bundle action shown on your line, and follow the prompts.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.cellc.check_number',
    network: 'Cell C',
    category: 'Other',
    action: 'Own-number Help',
    code: 'N/A',
    explanation: 'Cell C does not currently publish a verified own-number USSD shortcut; check the SIM packaging or account details, or call 135.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.cellc.customer_care',
    network: 'Cell C',
    category: 'Support / Customer care',
    action: 'Customer Service',
    code: '135',
    explanation: 'Speak to a Cell C representative.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.cellc.for_you',
    network: 'Cell C',
    category: 'Promotions',
    action: 'Alternative Prepaid Offers',
    code: '*141#',
    explanation: 'Check alternative prepaid offers available to your Cell C line; use *147# for ordinary bundle and account menus.',
    status: 'verified',
    dialable: true
  },

  // RAIN
  {
    id: 'ussd.rain.app_only',
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
