import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

test('the October supplement retains its reviewed inputs when the current monthly IDs roll over', () => {
  // A future current snapshot is a different object: never mutate October's
  // immutable history to simulate it. Resolve the real modules against a small
  // temporary registry with November selected and the real October history.
  const directory = mkdtempSync(path.join(os.tmpdir(), 'datacost-rollover-'));
  let offers;
  try {
    mkdirSync(path.join(directory, 'comparisonOfferUpdates'));
    mkdirSync(path.join(directory, 'monthlyDeals/history'), { recursive: true });
    writeFileSync(path.join(directory, 'package.json'), '{"type":"module"}');
    writeFileSync(path.join(directory, 'comparisonOfferUpdates.ts'), readFileSync(new URL('../src/data/comparisonOfferUpdates.ts', import.meta.url)));
    writeFileSync(path.join(directory, 'comparisonOfferUpdates/2026-10-12.ts'), readFileSync(new URL('../src/data/comparisonOfferUpdates/2026-10-12.ts', import.meta.url)));
    const historyModule = new URL('../src/data/monthlyDeals/history/2026-10.ts', import.meta.url).href;
    const sizesModule = new URL('../src/data/monthlyDeals/sizeBands.ts', import.meta.url).href;
    writeFileSync(path.join(directory, 'monthlyDeals/history/2026-10.ts'), `export { october2026DealSnapshot } from ${JSON.stringify(historyModule)};`);
    writeFileSync(path.join(directory, 'monthlyDeals/sizeBands.ts'), `export { getExpectedComparisonSizes } from ${JSON.stringify(sizesModule)};`);
    writeFileSync(path.join(directory, 'monthlyDeals/index.ts'), `
      export { getExpectedComparisonSizes } from ${JSON.stringify(sizesModule)};
      export const currentMonthlyDealSnapshot = { month: '2026-11', offers: [] };
    `);
    const activeModule = pathToFileURL(path.join(directory, 'comparisonOfferUpdates.ts')).href;
    const code = `const { comparisonOfferUpdates } = await import(${JSON.stringify(activeModule)}); process.stdout.write(JSON.stringify(comparisonOfferUpdates));`;
    offers = JSON.parse(execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', code], { encoding: 'utf8' }));
  } finally {
    assert.equal(path.dirname(path.resolve(directory)), path.resolve(os.tmpdir()));
    assert.ok(path.basename(directory).startsWith('datacost-rollover-'));
    rmSync(directory, { recursive: true, force: true });
  }
  assert.equal(offers.length, 20);
  assert.ok(offers.every((offer: { id: string; source: { checkedAt: string } }) =>
    offer.id.includes('2026-10') && offer.source.checkedAt === '2026-10-12'));
  assert.ok(offers.some((offer: { id: string }) => offer.id === 'fnb-connect-data-plan-12gb-2026-10'));
  assert.ok(offers.some((offer: { id: string }) => offer.id === 'cell-c-10-plus-10-2026-10'));
});
