export type UssdNetworkKey = 'mtn' | 'vodacom' | 'cellc' | 'telkom';

export interface UssdCodeItem {
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
      { label: 'Airtime Balance', code: '*136#' },
      { label: 'Data Balance', code: '*136*1#' },
      { label: 'Buy Data', code: '*136*2#' },
      { label: 'Recharge', code: '*136*Voucher#' },
      { label: 'Please Call Me', code: '*121*number#' },
      { label: 'Check Number', code: '*123*888#' }
    ]
  },
  vodacom: {
    name: 'Vodacom',
    codes: [
      { label: 'Airtime Balance', code: '*100#' },
      { label: 'Data Balance', code: '*135#' },
      { label: 'Recharge', code: '*100*01*PIN#' },
      { label: 'Please Call Me', code: '*140*number#' },
      { label: 'Transfer Airtime', code: '*111*072#' }
    ]
  },
  cellc: {
    name: 'Cell C',
    codes: [
      { label: 'Airtime Balance', code: '*101#' },
      { label: 'Recharge', code: '*102*PIN#' },
      { label: 'Please Call Me', code: '*111*number#' },
      { label: 'Transfer Airtime', code: '*102*2#' }
    ]
  },
  telkom: {
    name: 'Telkom',
    codes: [
      { label: 'Airtime Balance', code: '*188#' },
      { label: 'Recharge', code: '*188*PIN#' },
      { label: 'Please Call Me', code: '*140*number#' },
      { label: 'Check Number', code: '*1#' }
    ]
  }
};

export const ussdNetworkOrder: UssdNetworkKey[] = ['mtn', 'vodacom', 'cellc', 'telkom'];

export const ussdMostUsed = [
  { label: 'Check Airtime Balance', code: '*136# / *100# / *101# / *188#' },
  { label: 'Buy Data Quickly', code: '*136*2# / *135#' },
  { label: 'Send Please Call Me', code: '*121*number# / *140*number#' }
];
