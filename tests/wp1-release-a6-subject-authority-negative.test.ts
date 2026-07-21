import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import * as subjectAuthority from '../src/data/wp1EvidenceSubjects';

const runFreshAuthorityImport = (setup: string): ReturnType<typeof spawnSync> => spawnSync(
  process.execPath,
  ['--import', 'tsx', '--input-type=module', '-'],
  {
    cwd: process.cwd(),
    encoding: 'utf8',
    input: `${setup}
try {
  await import('./src/data/wp1EvidenceSubjects.ts');
  console.log('UNEXPECTED_AUTHORITY_ACCEPTANCE');
  process.exitCode = 17;
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (!message.includes('Canonical evidence subject integrity failure (wp1-release-a.6)')) throw error;
  console.log('REJECTED_CANONICAL_INTEGRITY');
}
`
  }
);

const assertIntegrityRejection = (setup: string): void => {
  const result = runFreshAuthorityImport(setup);
  const stdout = String(result.stdout);
  const stderr = String(result.stderr);
  assert.equal(result.status, 0, stderr || stdout);
  assert.match(stdout, /REJECTED_CANONICAL_INTEGRITY/);
  assert.doesNotMatch(stdout, /UNEXPECTED_AUTHORITY_ACCEPTANCE/);
};

test('the authoritative subject manifest is not publicly enumerable or mutable', () => {
  assert.deepEqual(Object.keys(subjectAuthority), ['resolveWp1EvidenceSubjectKind']);
  assert.equal(subjectAuthority.resolveWp1EvidenceSubjectKind('price.mtn-50gb-data-price'), 'price');
  assert.equal(subjectAuthority.resolveWp1EvidenceSubjectKind('uncommitted.subject'), null);
});

test('fresh imports reject price, promotion and device records injected through problem guides', () => {
  const attacks = [
    `import { problemGuides } from './src/data/problemGuides.ts';
Reflect.set(problemGuides, 'hostile-price', { slug: 'hostile-price', id: 'hostile-price', price: 1 });`,
    `import { problemGuides } from './src/data/problemGuides.ts';
Reflect.set(problemGuides, 'hostile-promotion', { slug: 'hostile-promotion', id: 'hostile-promotion', promoType: 'data', verificationStatus: 'verified' });`,
    `import { problemGuides } from './src/data/problemGuides.ts';
Reflect.set(problemGuides, 'hostile-device', { slug: 'hostile-device', id: 'hostile-device', cluster: 'mobile-data', steps: ['trust me'] });`
  ];
  for (const attack of attacks) assertIntegrityRejection(attack);
});

test('fresh imports reject structurally valid records appended before authority initialisation', () => {
  const attacks = [
    `import { bundles } from './src/data.ts';
bundles.push({ ...bundles[0], id: 'hostile-price', slug: 'hostile-price' });`,
    `import { verifiedPromos } from './src/data/promos.ts';
verifiedPromos.push({ id: 'hostile-promotion', title: 'Hostile', provider: 'Hostile', promoType: 'data', category: 'data', summary: 'Hostile', verificationStatus: 'verified', isSponsored: false, displayPriority: 1 });`,
    `import { fixPages } from './src/data/fixes.ts';
fixPages.push({ ...fixPages[0], id: 'hostile-device', slug: 'hostile-device' });`,
    `import { ussdRepository } from './src/data/ussd.ts';
ussdRepository.push({ ...ussdRepository[0], id: 'ussd.hostile.balance' });`
  ];
  for (const attack of attacks) assertIntegrityRejection(attack);
});

test('fresh imports reject semantic mutation of an existing owned record', () => {
  assertIntegrityRejection(`import { bundles } from './src/data.ts';
bundles[0].price = bundles[0].price + 1;`);
});
