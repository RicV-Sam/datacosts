export type UssdNetworkKey = 'mtn' | 'vodacom' | 'cellc' | 'telkom';

export interface UssdCodeItem {
  id: string;
  codeType: 'balance' | 'data' | 'recharge' | 'transfer' | 'account' | 'other';
  label: string;
  code: string;
}

export interface UssdNetwork {
  name: string;
  codes: UssdCodeItem[];
}

export const ussdCodesByNetwork: Record<UssdNetworkKey, UssdNetwork> = {
  mtn: {
    name: 'MTN',
    codes: [
      { id: 'ussd.mtn.balance_main', codeType: 'balance', label: 'Airtime Balance', code: '*136#' },
      { id: 'ussd.mtn.data_balance', codeType: 'balance', label: 'Data Balance', code: '*136*1#' },
      { id: 'ussd.mtn.buy_data', codeType: 'data', label: 'Buy Data', code: '*136*2#' },
      { id: 'ussd.mtn.recharge_voucher', codeType: 'recharge', label: 'Recharge', code: '*136*Voucher#' },
      { id: 'ussd.mtn.please_call_me', codeType: 'other', label: 'Please Call Me', code: '*121*number#' },
      { id: 'ussd.mtn.check_number', codeType: 'account', label: 'Check Number', code: '*123*888#' }
    ]
  },
  vodacom: {
    name: 'Vodacom',
    codes: [
      { id: 'ussd.vodacom.balance_main', codeType: 'balance', label: 'Airtime Balance', code: '*135#' },
      { id: 'ussd.vodacom.data_balance', codeType: 'balance', label: 'Data Balance', code: '*135#' },
      { id: 'ussd.vodacom.buy_data', codeType: 'data', label: 'Buy Data', code: '*135*2#' },
      { id: 'ussd.vodacom.recharge_voucher', codeType: 'recharge', label: 'Recharge', code: '*136*Voucher#' },
      { id: 'ussd.vodacom.please_call_me', codeType: 'other', label: 'Please Call Me', code: '*140*number#' },
      { id: 'ussd.vodacom.transfer_airtime_data', codeType: 'transfer', label: 'Transfer Airtime', code: '*135*1002#' }
    ]
  },
  cellc: {
    name: 'Cell C',
    codes: [
      { id: 'ussd.cellc.balance_main', codeType: 'balance', label: 'Airtime Balance', code: '*101#' },
      { id: 'ussd.cellc.recharge_voucher', codeType: 'recharge', label: 'Recharge', code: '*102*PIN#' },
      { id: 'ussd.cellc.please_call_me', codeType: 'other', label: 'Please Call Me', code: '*111*number#' },
      { id: 'ussd.cellc.transfer_airtime', codeType: 'transfer', label: 'Transfer Airtime', code: '*102*2#' }
    ]
  },
  telkom: {
    name: 'Telkom',
    codes: [
      { id: 'ussd.telkom.balance_main', codeType: 'balance', label: 'Airtime Balance', code: '*188#' },
      { id: 'ussd.telkom.recharge_voucher', codeType: 'recharge', label: 'Recharge', code: '*188*PIN#' },
      { id: 'ussd.telkom.please_call_me', codeType: 'other', label: 'Please Call Me', code: '*140*number#' },
      { id: 'ussd.telkom.check_number', codeType: 'account', label: 'Check Number', code: '*1#' }
    ]
  }
};

export const ussdNetworkOrder: UssdNetworkKey[] = ['mtn', 'vodacom', 'cellc', 'telkom'];

export const ussdMostUsed = [
  { label: 'Check Airtime Balance', code: '*136# / *135# / *101# / *188#' },
  { label: 'Buy Data Quickly', code: '*136*2# / *135*2# / *147# / *180#' },
  { label: 'Send Please Call Me', code: '*121*number# / *140*number#' }
];
