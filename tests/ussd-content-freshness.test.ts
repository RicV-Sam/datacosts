import assert from 'node:assert/strict';
import test from 'node:test';
import { getNetworkUssdModifiedIso, getRouteModifiedIso } from '../src/seo/contentDates';

const AUDIT_ISO = '2026-09-01T00:00:00.000Z';

test('operator audit labels stay unchanged when a route receives a scoped content edit', () => {
  for (const slug of ['mtn', 'vodacom', 'telkom', 'cell-c']) {
    const routeModifiedIso = slug === 'telkom' ? '2026-10-03T00:00:00.000Z' : AUDIT_ISO;
    assert.equal(getRouteModifiedIso(`/${slug}-ussd-codes/`), routeModifiedIso, slug);
    assert.equal(getNetworkUssdModifiedIso(slug), AUDIT_ISO, slug);
  }
});
