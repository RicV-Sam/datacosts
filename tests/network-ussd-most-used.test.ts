import assert from 'node:assert/strict';
import test from 'node:test';
import { ussdRepository } from '../src/data/ussd';
import { findMostUsedCode, getMajorNetworkCodes } from '../src/utils/ussdSelection';

test('MTN buy-data selection does not confuse detailed balance with data', () => {
  const mtnEntries = ussdRepository.filter((entry) => entry.network === 'MTN');
  const selected = findMostUsedCode(mtnEntries, ['buy data', 'bundle', 'data']);
  assert.equal(selected?.id, 'ussd.mtn.buy_data');
  assert.equal(selected?.code, '*136*2#');
});

test('curated network lists are stable and keep high-value MTN and Vodacom actions', () => {
  assert.deepEqual(
    getMajorNetworkCodes(ussdRepository, 'MTN').map((entry) => entry.id),
    [
      'ussd.mtn.balance_main',
      'ussd.mtn.data_balance',
      'ussd.mtn.buy_data',
      'ussd.mtn.transfer_airtime_data',
      'ussd.mtn.please_call_me',
      'ussd.mtn.customer_care',
      'ussd.mtn.xtratime',
      'ussd.mtn.mytownoffers'
    ]
  );
  assert.deepEqual(
    getMajorNetworkCodes(ussdRepository, 'Vodacom').map((entry) => entry.id),
    [
      'ussd.vodacom.balance_detailed',
      'ussd.vodacom.buy_data',
      'ussd.vodacom.recharge_voucher',
      'ussd.vodacom.transfer_airtime_data',
      'ussd.vodacom.please_call_me',
      'ussd.vodacom.check_number',
      'ussd.vodacom.customer_care',
      'ussd.vodacom.just4you'
    ]
  );
});
