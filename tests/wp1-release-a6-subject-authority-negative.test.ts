import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { bundles } from '../src/data';
import { fixPages } from '../src/data/fixes';
import { problemGuides } from '../src/data/problemGuides';
import type { Promo } from '../src/data/promos';
import { ussdRepository } from '../src/data/ussd';
import * as subjectAuthority from '../src/data/wp1EvidenceSubjects';
import {
  fingerprintEvidenceSubject,
  WP1_EVIDENCE_FINGERPRINT_PROJECTION_VERSION
} from '../src/seo/wp1EvidenceSubjectProjections';

type IntegrityDiagnostic = {
  code: string;
  recordId: string | null;
  runtimeOwner: string | null;
  expectedOwner: string | null;
  expectedKind: string | null;
  actualStructure: string;
  missingFields: string[];
  invalidFields: string[];
  unexpectedSemanticFields: string[];
  expectedFingerprint: string | null;
  actualFingerprint: string | null;
  explanation: string;
};

type FreshResult = {
  accepted: boolean;
  lookupKind: string | null;
  lookupFailed: boolean;
  validationRejected: boolean;
  selectionSources: string[];
  diagnostic: IntegrityDiagnostic | null;
};

const runFreshAuthority = (setup: string, lookupId: string): FreshResult => {
  const child = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    input: `${setup}
const lookupId = ${JSON.stringify(lookupId)};
try {
  const authority = await import('./src/data/wp1EvidenceSubjects.ts');
  console.log('RESULT=' + JSON.stringify({ accepted: true, lookupKind: authority.resolveWp1EvidenceSubjectKind(lookupId), lookupFailed: false, validationRejected: false, selectionSources: [], diagnostic: null }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  const jsonStart = message.indexOf('{');
  const diagnostic = jsonStart >= 0 ? JSON.parse(message.slice(jsonStart)) : null;
  let validationRejected = false;
  try { await import('./src/seo/wp1SourceFreshness.ts'); } catch { validationRejected = true; }
  console.log('RESULT=' + JSON.stringify({ accepted: false, lookupKind: null, lookupFailed: true, validationRejected, selectionSources: [], diagnostic }));
}
`
  });
  assert.equal(child.status, 0, String(child.stderr) || String(child.stdout));
  const line = String(child.stdout).split(/\r?\n/).find((candidate) => candidate.startsWith('RESULT='));
  assert.ok(line, String(child.stdout));
  return JSON.parse(line.slice('RESULT='.length)) as FreshResult;
};

const assertRejected = (
  setup: string,
  lookupId: string,
  expected: Partial<Pick<IntegrityDiagnostic, 'code' | 'recordId' | 'runtimeOwner' | 'expectedOwner' | 'expectedKind'>>,
  field?: string
): IntegrityDiagnostic => {
  const result = runFreshAuthority(setup, lookupId);
  assert.equal(result.accepted, false);
  assert.equal(result.lookupFailed, true);
  assert.equal(result.validationRejected, true);
  assert.deepEqual(result.selectionSources, []);
  assert.ok(result.diagnostic);
  for (const [key, value] of Object.entries(expected)) assert.equal(result.diagnostic[key as keyof IntegrityDiagnostic], value, key);
  if (field) {
    assert.ok([
      ...result.diagnostic.missingFields,
      ...result.diagnostic.invalidFields,
      ...result.diagnostic.unexpectedSemanticFields
    ].some((entry) => entry === field || entry.startsWith(`${field}:`)), `${field}: ${JSON.stringify(result.diagnostic)}`);
  }
  return result.diagnostic;
};

test('the private authority remains lookup-only and reconciles all 172 committed subjects', () => {
  assert.deepEqual(Object.keys(subjectAuthority), ['resolveWp1EvidenceSubjectKind']);
  assert.equal(subjectAuthority.resolveWp1EvidenceSubjectKind('price.mtn-50gb-data-price'), 'price');
  assert.equal(subjectAuthority.resolveWp1EvidenceSubjectKind('uncommitted.subject'), null);
  const source = readFileSync(new URL('../src/data/wp1EvidenceSubjects.ts', import.meta.url), 'utf8');
  assert.equal([...source.matchAll(/Object\.freeze\(\{"contentId":/g)].length, 172);
  assert.equal(WP1_EVIDENCE_FINGERPRINT_PROJECTION_VERSION, 'wp1-release-a.6-projection-v1');
  assert.match(source, /CANONICAL_EVIDENCE_FINGERPRINT_PROJECTION_VERSION/);
});

test('owner projections ignore cosmetic fields but retain explicit semantic fields', () => {
  const price = bundles[0] as unknown as Record<string, unknown>;
  const priceFingerprint = fingerprintEvidenceSubject('price_collection', price);
  assert.equal(fingerprintEvidenceSubject('price_collection', { ...price, name: 'Cosmetic card name', bestFor: 'New display copy', sourceLabel: 'Cosmetic source label' }), priceFingerprint);

  const ussd = ussdRepository[0] as unknown as Record<string, unknown>;
  const ussdFingerprint = fingerprintEvidenceSubject('ussd_repository', ussd);
  assert.equal(fingerprintEvidenceSubject('ussd_repository', { ...ussd, explanation: 'Reworded explanation', note: 'UI note' }), ussdFingerprint);

  const device = fixPages[0] as unknown as Record<string, unknown>;
  const deviceFingerprint = fingerprintEvidenceSubject('device_collection', device);
  assert.equal(fingerprintEvidenceSubject('device_collection', { ...device, title: 'Cosmetic title', summary: 'Cosmetic summary', metaDescription: 'Cosmetic description' }), deviceFingerprint);

  const guide = Object.values(problemGuides)[0] as unknown as Record<string, unknown>;
  const guideFingerprint = fingerprintEvidenceSubject('problem_guides', guide);
  assert.equal(fingerprintEvidenceSubject('problem_guides', { ...guide, titleTag: 'Cosmetic title', intro: 'Reworded description', quickAnswer: ['Presentation-only change'] }), guideFingerprint);

  const promotion: Promo = { id: 'promo-id', title: 'Title', provider: 'MTN', promoType: 'bundle', category: 'data', summary: 'Summary', verificationStatus: 'verified', isSponsored: false, displayPriority: 1 };
  const promotionFingerprint = fingerprintEvidenceSubject('promotion_collection', promotion);
  assert.equal(fingerprintEvidenceSubject('promotion_collection', { ...promotion, title: 'Cosmetic title', summary: 'Cosmetic description', displayPriority: 99 }), promotionFingerprint);

  assert.notEqual(fingerprintEvidenceSubject('price_collection', { ...price, price: Number(price.price) + 1 }), priceFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('price_collection', { ...price, currency: 'USD' }), priceFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('price_collection', { ...price, network: 'Vodacom' }), priceFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('ussd_repository', { ...ussd, code: '*000#' }), ussdFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('ussd_repository', { ...ussd, category: 'Other' }), ussdFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('promotion_collection', { ...promotion, provider: 'Vodacom' }), promotionFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('promotion_collection', { ...promotion, promoType: 'airtime' }), promotionFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('device_collection', { ...device, cluster: 'ussd' }), deviceFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('device_collection', { ...device, provider: 'Other' }), deviceFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('problem_guides', { ...guide, slug: 'different-claim' }), guideFingerprint);
  assert.notEqual(fingerprintEvidenceSubject('device_collection', price), priceFingerprint, 'owner is part of the fingerprint envelope');
});

test('cosmetic mutation and collection reordering remain valid in fresh processes', () => {
  const controls = [
    `import { bundles } from './src/data.ts'; bundles[0].name = 'Cosmetic display name'; bundles[0].bestFor = 'Cosmetic card copy';`,
    `import { ussdRepository } from './src/data/ussd.ts'; ussdRepository[0].explanation = 'Cosmetic explanation';`,
    `import { fixPages } from './src/data/fixes.ts'; fixPages[0].title = 'Cosmetic page title'; fixPages[0].summary = 'Cosmetic summary';`,
    `import { problemGuides } from './src/data/problemGuides.ts'; const key = Object.keys(problemGuides)[0]; problemGuides[key].titleTag = 'Cosmetic title'; problemGuides[key].intro = 'Cosmetic description';`,
    `import { bundles } from './src/data.ts'; bundles.reverse();`
  ];
  for (const setup of controls) {
    const result = runFreshAuthority(setup, 'price.mtn-50gb-data-price');
    assert.equal(result.accepted, true, setup);
    assert.equal(result.lookupKind, 'price', setup);
  }
});

test('fresh price, promotion and device injection attacks fail before lookup, validation or selection', () => {
  const attacks = [
    [`import { problemGuides } from './src/data/problemGuides.ts'; Reflect.set(problemGuides, 'hostile-price', { slug: 'hostile-price', id: 'hostile-price', price: 1 });`, 'evergreen_fact.hostile-price'],
    [`import { problemGuides } from './src/data/problemGuides.ts'; Reflect.set(problemGuides, 'hostile-promotion', { slug: 'hostile-promotion', id: 'hostile-promotion', promoType: 'data', verificationStatus: 'verified' });`, 'evergreen_fact.hostile-promotion'],
    [`import { problemGuides } from './src/data/problemGuides.ts'; Reflect.set(problemGuides, 'hostile-device', { slug: 'hostile-device', id: 'hostile-device', cluster: 'mobile-data', steps: ['trust me'] });`, 'evergreen_fact.hostile-device']
  ] as const;
  for (const [setup, id] of attacks) {
    assertRejected(setup, id, { recordId: id, runtimeOwner: 'problem_guides', expectedOwner: null, expectedKind: null });
  }
});

test('fresh structurally valid collection injections remain untrusted', () => {
  const attacks = [
    [`import { bundles } from './src/data.ts'; bundles.push({ ...bundles[0], id: 'hostile-price', slug: 'hostile-price' });`, 'price.hostile-price', 'price_collection'],
    [`import { verifiedPromos } from './src/data/promos.ts'; verifiedPromos.push({ id: 'hostile-promotion', title: 'Hostile', provider: 'MTN', promoType: 'data', category: 'data', summary: 'Hostile', verificationStatus: 'verified', isSponsored: false, displayPriority: 1 });`, 'promotion.hostile-promotion', 'promotion_collection'],
    [`import { fixPages } from './src/data/fixes.ts'; fixPages.push({ ...fixPages[0], id: 'hostile-device', slug: 'hostile-device' });`, 'device_step.hostile-device', 'device_collection']
  ] as const;
  for (const [setup, id, owner] of attacks) {
    assertRejected(setup, id, { code: 'unexpected_runtime_subject', recordId: id, runtimeOwner: owner, expectedOwner: null, expectedKind: null });
  }
});

test('actionable structural diagnostics identify malformed and wrong-owner shapes', () => {
  assertRejected(
    `import { bundles } from './src/data.ts'; bundles[0] = { slug: bundles[0].slug };`,
    'price.mtn-50gb-data-price',
    { code: 'missing_required_field', recordId: 'price.mtn-50gb-data-price', runtimeOwner: 'price_collection', expectedOwner: 'price_collection', expectedKind: 'price' },
    'id'
  );
  assertRejected(
    `import { bundles } from './src/data.ts'; bundles[0].price = '299';`,
    'price.mtn-50gb-data-price',
    { code: 'invalid_field_type', recordId: 'price.mtn-50gb-data-price', runtimeOwner: 'price_collection', expectedOwner: 'price_collection', expectedKind: 'price' },
    'price'
  );
  assertRejected(
    `import { bundles } from './src/data.ts'; import { ussdRepository } from './src/data/ussd.ts'; ussdRepository[0] = { ...bundles[0], id: ussdRepository[0].id };`,
    'ussd.vodacom.balance_main',
    { code: 'unexpected_semantic_field', recordId: 'ussd.vodacom.balance_main', runtimeOwner: 'ussd_repository', expectedOwner: 'ussd_repository', expectedKind: 'ussd_code' },
    'slug'
  );
  const guideKey = 'why-is-my-data-disappearing-south-africa';
  assertRejected(
    `import { problemGuides } from './src/data/problemGuides.ts'; problemGuides['${guideKey}'] = { slug: '${guideKey}', id: 'promo', title: 'Promo', provider: 'MTN', promoType: 'data', category: 'data', summary: 'Promo', verificationStatus: 'verified', isSponsored: false, displayPriority: 1 };`,
    `evergreen_fact.${guideKey}`,
    { code: 'unexpected_semantic_field', recordId: `evergreen_fact.${guideKey}`, runtimeOwner: 'problem_guides', expectedOwner: 'problem_guides', expectedKind: 'evergreen_fact' },
    'id'
  );
  assertRejected(
    `import { fixPages } from './src/data/fixes.ts'; import { problemGuides } from './src/data/problemGuides.ts'; problemGuides['${guideKey}'] = { ...fixPages[0], slug: '${guideKey}' };`,
    `evergreen_fact.${guideKey}`,
    { code: 'unexpected_semantic_field', recordId: `evergreen_fact.${guideKey}`, runtimeOwner: 'problem_guides', expectedOwner: 'problem_guides', expectedKind: 'evergreen_fact' },
    'id'
  );
});

test('existing evergreen replacements by price, promotion, device and USSD shapes all fail closed', () => {
  const key = 'why-is-my-data-disappearing-south-africa';
  const attacks = [
    `import { bundles } from './src/data.ts'; import { problemGuides } from './src/data/problemGuides.ts'; problemGuides['${key}'] = { ...bundles[0], slug: '${key}' };`,
    `import { problemGuides } from './src/data/problemGuides.ts'; problemGuides['${key}'] = { slug: '${key}', id: 'promo', title: 'Promo', provider: 'MTN', promoType: 'data', category: 'data', summary: 'Promo', verificationStatus: 'verified', isSponsored: false, displayPriority: 1 };`,
    `import { fixPages } from './src/data/fixes.ts'; import { problemGuides } from './src/data/problemGuides.ts'; problemGuides['${key}'] = { ...fixPages[0], slug: '${key}' };`,
    `import { ussdRepository } from './src/data/ussd.ts'; import { problemGuides } from './src/data/problemGuides.ts'; problemGuides['${key}'] = { ...ussdRepository[0], slug: '${key}' };`
  ];
  for (const setup of attacks) {
    assertRejected(setup, `evergreen_fact.${key}`, { recordId: `evergreen_fact.${key}`, runtimeOwner: 'problem_guides', expectedOwner: 'problem_guides', expectedKind: 'evergreen_fact' });
  }
});

test('unknown subjects, duplicate IDs and cross-owner collisions have specific diagnostics', () => {
  assertRejected(
    `import { bundles } from './src/data.ts'; bundles.push({ ...bundles[0], id: 'hostile-price', slug: 'hostile-price' });`,
    'price.hostile-price',
    { code: 'unexpected_runtime_subject', recordId: 'price.hostile-price', runtimeOwner: 'price_collection', expectedOwner: null, expectedKind: null }
  );
  assertRejected(
    `import { bundles } from './src/data.ts'; bundles.push({ ...bundles[0] });`,
    'price.mtn-50gb-data-price',
    { code: 'duplicate_subject_id', recordId: 'price.mtn-50gb-data-price', runtimeOwner: 'price_collection', expectedOwner: 'price_collection', expectedKind: 'price' }
  );
  assertRejected(
    `import { bundles } from './src/data.ts'; import { ussdRepository } from './src/data/ussd.ts'; ussdRepository.push({ ...ussdRepository[0], id: 'price.' + bundles[0].slug });`,
    'price.mtn-50gb-data-price',
    { code: 'cross_owner_collision', recordId: 'price.mtn-50gb-data-price', runtimeOwner: 'price_collection', expectedOwner: 'price_collection', expectedKind: 'price' }
  );
  assertRejected(
    `import { bundles } from './src/data.ts'; bundles.shift();`,
    'price.mtn-50gb-data-price',
    { code: 'missing_canonical_subject', recordId: 'price.mtn-50gb-data-price', runtimeOwner: null, expectedOwner: 'price_collection', expectedKind: 'price' }
  );
});

test('semantic mutation and unknown semantic fields fail with complete mismatch diagnostics', () => {
  const mismatch = assertRejected(
    `import { bundles } from './src/data.ts'; bundles[0].price = bundles[0].price + 1;`,
    'price.mtn-50gb-data-price',
    { code: 'semantic_fingerprint_mismatch', recordId: 'price.mtn-50gb-data-price', runtimeOwner: 'price_collection', expectedOwner: 'price_collection', expectedKind: 'price' }
  );
  assert.match(mismatch.expectedFingerprint ?? '', /^[a-f0-9]{64}$/);
  assert.match(mismatch.actualFingerprint ?? '', /^[a-f0-9]{64}$/);
  assert.notEqual(mismatch.expectedFingerprint, mismatch.actualFingerprint);

  assertRejected(
    `import { bundles } from './src/data.ts'; bundles[0].semanticOverride = 'evergreen';`,
    'price.mtn-50gb-data-price',
    { code: 'unexpected_semantic_field', recordId: 'price.mtn-50gb-data-price', runtimeOwner: 'price_collection', expectedOwner: 'price_collection', expectedKind: 'price' },
    'semanticOverride'
  );
});

test('claim-defining operator, code, type, currency and device fields fail authority initialisation', () => {
  const attacks = [
    [`import { bundles } from './src/data.ts'; bundles[0].currency = 'USD';`, 'price.mtn-50gb-data-price', 'price_collection', 'price'],
    [`import { bundles } from './src/data.ts'; bundles[0].network = 'Vodacom';`, 'price.mtn-50gb-data-price', 'price_collection', 'price'],
    [`import { ussdRepository } from './src/data/ussd.ts'; ussdRepository[0].code = '*000#';`, 'ussd.vodacom.balance_main', 'ussd_repository', 'ussd_code'],
    [`import { ussdRepository } from './src/data/ussd.ts'; ussdRepository[0].category = 'Other';`, 'ussd.vodacom.balance_main', 'ussd_repository', 'ussd_code'],
    [`import { ussdRepository } from './src/data/ussd.ts'; ussdRepository[0].network = 'MTN';`, 'ussd.vodacom.balance_main', 'ussd_repository', 'ussd_code'],
    [`import { fixPages } from './src/data/fixes.ts'; fixPages[0].cluster = 'ussd';`, 'device_step.vodacom-apn-settings', 'device_collection', 'device_step'],
    [`import { fixPages } from './src/data/fixes.ts'; fixPages[0].provider = 'Other';`, 'device_step.vodacom-apn-settings', 'device_collection', 'device_step'],
    [`import { fixPages } from './src/data/fixes.ts'; fixPages[0].serviceType = 'other-service';`, 'device_step.vodacom-apn-settings', 'device_collection', 'device_step']
  ] as const;
  for (const [setup, id, owner, kind] of attacks) {
    assertRejected(setup, id, { code: 'semantic_fingerprint_mismatch', recordId: id, runtimeOwner: owner, expectedOwner: owner, expectedKind: kind });
  }
});
