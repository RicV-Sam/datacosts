import { USSDEntry } from '../types';

export type MajorUssdNetwork = 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C';

const MAJOR_USSD_IDS_BY_NETWORK: Readonly<Record<MajorUssdNetwork, readonly string[]>> = {
  MTN: [
    'ussd.mtn.balance_main',
    'ussd.mtn.data_balance',
    'ussd.mtn.buy_data',
    'ussd.mtn.transfer_airtime_data',
    'ussd.mtn.please_call_me',
    'ussd.mtn.customer_care',
    'ussd.mtn.xtratime',
    'ussd.mtn.mytownoffers'
  ],
  Vodacom: [
    'ussd.vodacom.balance_detailed',
    'ussd.vodacom.buy_data',
    'ussd.vodacom.recharge_voucher',
    'ussd.vodacom.transfer_airtime_data',
    'ussd.vodacom.please_call_me',
    'ussd.vodacom.check_number',
    'ussd.vodacom.customer_care',
    'ussd.vodacom.just4you'
  ],
  Telkom: [
    'ussd.telkom.balance_main',
    'ussd.telkom.buy_data',
    'ussd.telkom.recharge_voucher',
    'ussd.telkom.please_call_me',
    'ussd.telkom.check_number',
    'ussd.telkom.customer_care',
    'ussd.telkom.monice'
  ],
  'Cell C': [
    'ussd.cellc.balance_main',
    'ussd.cellc.buy_data',
    'ussd.cellc.recharge_voucher',
    'ussd.cellc.please_call_me',
    'ussd.cellc.transfer_airtime',
    'ussd.cellc.check_number',
    'ussd.cellc.customer_care',
    'ussd.cellc.for_you'
  ]
};

export function getMajorNetworkCodes(entries: readonly USSDEntry[], network: MajorUssdNetwork): USSDEntry[] {
  const byId = new Map(entries.filter((entry) => entry.network === network).map((entry) => [entry.id, entry]));
  return MAJOR_USSD_IDS_BY_NETWORK[network]
    .map((id) => byId.get(id))
    .filter((entry): entry is USSDEntry => Boolean(entry));
}

export function findMostUsedCode(entries: readonly USSDEntry[], patterns: readonly string[]): USSDEntry | null {
  return (
    entries.find((entry) => {
      const haystack = `${entry.action} ${entry.category}`.toLowerCase();
      const terms = new Set(haystack.split(/[^a-z0-9]+/).filter(Boolean));
      return (
        entry.status === 'verified' &&
        entry.code !== 'N/A' &&
        patterns.some((pattern) => {
          const normalizedPattern = pattern.toLowerCase();
          return normalizedPattern.includes(' ')
            ? haystack.includes(normalizedPattern)
            : terms.has(normalizedPattern);
        })
      );
    }) || null
  );
}
