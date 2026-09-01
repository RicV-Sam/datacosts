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
    id: 'ussd.vodacom.please_call_me',
    network: 'Vodacom',
    category: 'Other',
    action: 'Please Call Me',
    code: '*140*number#',
    explanation: 'Send a callback request by replacing number with the recipient\'s mobile number.',
    status: 'verified',
    dialable: false
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
    explanation: 'Open Vodacom\'s services menu and follow the prompts for services available to your line.',
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
    id: 'ussd.mtn.data_balance',
    network: 'MTN',
    category: 'Balance',
    action: 'Detailed Balance Inquiries',
    code: '*136*1#',
    explanation: 'Open MTN\'s detailed balance view for the balances available on your line.',
    status: 'verified',
    dialable: true
  },
  {
    id: 'ussd.mtn.recharge_voucher',
    network: 'MTN',
    category: 'Airtime / Recharge',
    action: 'Voucher Recharge Guidance',
    code: 'N/A',
    explanation: 'MTN\'s current public USSD list does not confirm a direct voucher-loading shortcut for your own line. It publishes *136*10# for card recharge; otherwise use a current official recharge channel or call 135.',
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
    id: 'ussd.mtn.please_call_me',
    network: 'MTN',
    category: 'Other',
    action: 'Please Call Me / CallBack',
    code: '*121*number#',
    explanation: 'Send a callback request by replacing number with the recipient\'s mobile number; dial *121# for the callback menu.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.mtn.check_number',
    network: 'MTN',
    category: 'Other',
    action: 'Own-number Help',
    code: 'N/A',
    explanation: 'A current own-number shortcut was not confirmed in this audit. MTN\'s 2023 catalogues listed *123*888#; verify it on your SIM, check the MTN App or call 135.',
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
    code: '*151#',
    explanation: 'Open XtraTime for eligible airtime or data advances; MTN also documents *136*2# followed by the XtraTime option.',
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
    id: 'ussd.telkom.recharge_voucher',
    network: 'Telkom',
    category: 'Airtime / Recharge',
    action: 'Recharge with Voucher',
    code: '*188*PIN#',
    explanation: 'Recharge by replacing PIN with the voucher PIN.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.telkom.please_call_me',
    network: 'Telkom',
    category: 'Other',
    action: 'Please Call Me',
    code: '*140*number#',
    explanation: 'Send a callback request by replacing number with the recipient\'s mobile number.',
    status: 'verified',
    dialable: false
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
    id: 'ussd.cellc.recharge_voucher',
    network: 'Cell C',
    category: 'Airtime / Recharge',
    action: 'Recharge with Voucher',
    code: '*102*PIN#',
    explanation: 'Recharge by replacing PIN with the voucher PIN.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.cellc.please_call_me',
    network: 'Cell C',
    category: 'Other',
    action: 'Please Call Me',
    code: '*111*number#',
    explanation: 'Send a callback request by replacing number with the recipient\'s mobile number.',
    status: 'verified',
    dialable: false
  },
  {
    id: 'ussd.cellc.transfer_airtime',
    network: 'Cell C',
    category: 'Transfers',
    action: 'Airtime Share Menu',
    code: '*147#',
    explanation: 'Open Cell C self-service, select Airtime Share, and follow the prompts.',
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
    explanation: 'Use the Rain app or website for account management; Rain specifically says USSD is unavailable on its 4G Mobile Services network.',
    status: 'verified',
    note: 'The verified no-USSD statement is scoped to Rain 4G Mobile Services.',
    dialable: false
  }
];
