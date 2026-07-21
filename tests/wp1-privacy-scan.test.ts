import assert from 'node:assert/strict';
import test from 'node:test';
import { scanPrivacyText } from '../scripts/check-wp1-privacy';

test('phone-shaped fixture data fails without committing a literal personal value', () => {
  const syntheticPhoneShape = ['0', '82', '123', '4567'].join('');
  const findings = scanPrivacyText('tests/synthetic-fixture.txt', `input=${syntheticPhoneShape}`, []);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].category, 'south_african_phone_shape');
  assert.equal(findings[0].preview.includes(syntheticPhoneShape), false);
});

test('USSD codes and ISO dates are not classified as phone numbers', () => {
  assert.deepEqual(scanPrivacyText('tests/safe-fixture.txt', 'code=*136# checkedAt=2026-07-21 value=user_input_must_not_be_sent', []), []);
});

test('allowlisting is line-scoped and requires a documented entry', () => {
  const syntheticPhoneShape = ['+27', '82', '123', '4567'].join('');
  const findings = scanPrivacyText('docs/public-contact.md', `first\ncontact ${syntheticPhoneShape}\nlast`, [{
    file: 'docs/public-contact.md',
    startLine: 2,
    endLine: 2,
    reason: 'Synthetic public-contact test.'
  }]);
  assert.deepEqual(findings, []);
});
