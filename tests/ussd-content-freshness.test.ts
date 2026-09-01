import assert from 'node:assert/strict';
import test from 'node:test';
import { getNetworkUssdModifiedIso, getRouteModifiedIso } from '../src/seo/contentDates';

const AUDIT_ISO = '2026-09-01T00:00:00.000Z';

test('operator USSD routes and network-hub labels share the current audit date', () => {
  for (const slug of ['mtn', 'vodacom', 'telkom', 'cell-c']) {
    assert.equal(getRouteModifiedIso(`/${slug}-ussd-codes/`), AUDIT_ISO, slug);
    assert.equal(getNetworkUssdModifiedIso(slug), AUDIT_ISO, slug);
  }
});
