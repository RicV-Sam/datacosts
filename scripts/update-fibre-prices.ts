import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import type { FibrePriceSnapshot } from '../src/data/fibre/fibrePricing';
import { isApprovedFibreSource, prepareFibrePriceDraft, requireCompleteFibreRefresh } from './lib/fibre-price-extraction';

const SNAPSHOT_PATH = path.resolve('src/data/generated/fibrePriceSnapshot.json');
const DRAFT_PATH = path.resolve('src/data/generated/fibrePriceSnapshot.draft.json');
const REPORT_PATH = path.resolve('src/data/generated/fibrePriceSnapshot.review.json');
// Existing --commit means replace the local JSON snapshot, not a Git commit.
const apply = process.argv.includes('--commit');
if (process.argv.slice(2).some(arg => arg !== '--commit')) throw new Error('Supported option: --commit. Offline fixtures cannot be used to apply prices.');

async function main(): Promise<void> {
  const snapshot = JSON.parse(await readFile(SNAPSHOT_PATH, 'utf8')) as FibrePriceSnapshot;
  const sources = new Map<string, string>();
  const responses: Array<Record<string, unknown>> = [];
  const checkedAt = new Date().toISOString().slice(0, 10);
  for (const url of new Set(snapshot.prices.map(row => row.sourceUrl))) {
    const rows = snapshot.prices.filter(row => row.sourceUrl === url);
    if (!rows.every(isApprovedFibreSource)) {
      responses.push({ url, error: 'Unapproved provider source' });
      continue;
    }
    try {
      const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30_000), headers: {
        'user-agent': 'DataCost price snapshot checker (+https://datacost.co.za/contact/)'
      } });
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error(`HTTP ${response.status}; expected HTML`);
      const html = await response.text();
      sources.set(url, html);
      responses.push({ url, fetchedAt: new Date().toISOString(), sha256: createHash('sha256').update(html).digest('hex'), status: response.status });
    } catch (error) {
      responses.push({ url, error: error instanceof Error ? error.message : String(error) });
    }
  }
  const draft = prepareFibrePriceDraft(snapshot, sources, checkedAt);
  await writeFile(REPORT_PATH, `${JSON.stringify({ checkedAt, scope: 'Published price/product identity; review installation, cancellation and promotion terms before use', responses, reviews: draft.reviews }, null, 2)}\n`);
  await writeFile(DRAFT_PATH, `${JSON.stringify(draft.snapshot, null, 2)}\n`);
  if (apply) {
    requireCompleteFibreRefresh(draft.reviews);
    const temporary = `${SNAPSHOT_PATH}.${process.pid}.tmp`;
    try {
      await writeFile(temporary, `${JSON.stringify(draft.snapshot, null, 2)}\n`, { flag: 'wx' });
      await rename(temporary, SNAPSHOT_PATH);
    } finally {
      await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; });
    }
    console.log(`Replaced local fibre price snapshot: ${SNAPSHOT_PATH}`);
  } else {
    console.log(`Wrote review draft: ${DRAFT_PATH}`);
  }
  for (const row of draft.reviews) console.log(`${row.id}: ${row.status === 'matched' ? `price matched R${row.monthlyPrice}` : row.reason}`);
  console.log(`Review evidence: ${REPORT_PATH}. Unresolved rows retain their existing values and dates.`);
}

await main();
