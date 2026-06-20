import { readFile } from 'node:fs/promises';
import path from 'node:path';

type FibrePricePackage = {
  id: string;
  ispId: string;
  fnoId: string;
  planName: string;
  downloadMbps: number;
  uploadMbps: number;
  monthlyPrice: number;
  promoPrice: number | null;
  setupNotes: string;
  sourceUrl: string;
  sourceLabel: string;
  checkedAt: string;
  confidence: 'high' | 'medium' | 'low';
  requiresAddressCheck: boolean;
  tags: string[];
};

type FibrePriceSnapshot = {
  checkedAt: string;
  generatedBy: string;
  notes: string;
  prices: FibrePricePackage[];
};

const SNAPSHOT_PATH = path.resolve(process.cwd(), 'src/data/generated/fibrePriceSnapshot.json');
const STALE_WARNING_DAYS = 45;

function assert(condition: unknown, message: string, errors: string[]): void {
  if (!condition) errors.push(message);
}

function daysOld(dateOnly: string): number {
  const checkedAt = new Date(`${dateOnly}T00:00:00.000Z`);
  if (Number.isNaN(checkedAt.getTime())) return Number.POSITIVE_INFINITY;
  return Math.floor((Date.now() - checkedAt.getTime()) / (24 * 60 * 60 * 1000));
}

function validatePackage(price: FibrePricePackage, index: number, errors: string[], warnings: string[]): void {
  const prefix = `prices[${index}] (${price.id || 'missing id'})`;
  assert(Boolean(price.id), `${prefix}: missing id`, errors);
  assert(Boolean(price.ispId), `${prefix}: missing ispId`, errors);
  assert(Boolean(price.fnoId), `${prefix}: missing fnoId`, errors);
  assert(Boolean(price.planName), `${prefix}: missing planName`, errors);
  assert(Number.isFinite(price.downloadMbps) && price.downloadMbps > 0, `${prefix}: invalid downloadMbps`, errors);
  assert(Number.isFinite(price.uploadMbps) && price.uploadMbps > 0, `${prefix}: invalid uploadMbps`, errors);
  assert(Number.isFinite(price.monthlyPrice) && price.monthlyPrice >= 100 && price.monthlyPrice <= 5000, `${prefix}: monthlyPrice outside expected range`, errors);
  assert(price.promoPrice === null || (Number.isFinite(price.promoPrice) && price.promoPrice >= 0), `${prefix}: invalid promoPrice`, errors);
  assert(Boolean(price.setupNotes), `${prefix}: missing setupNotes`, errors);
  assert(/^https:\/\//.test(price.sourceUrl), `${prefix}: sourceUrl must be https`, errors);
  assert(Boolean(price.sourceLabel), `${prefix}: missing sourceLabel`, errors);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(price.checkedAt), `${prefix}: checkedAt must be YYYY-MM-DD`, errors);
  assert(['high', 'medium', 'low'].includes(price.confidence), `${prefix}: invalid confidence`, errors);
  assert(typeof price.requiresAddressCheck === 'boolean', `${prefix}: requiresAddressCheck must be boolean`, errors);
  assert(Array.isArray(price.tags) && price.tags.length > 0, `${prefix}: tags must be non-empty`, errors);

  const age = daysOld(price.checkedAt);
  if (age > STALE_WARNING_DAYS) {
    warnings.push(`${prefix}: checkedAt is ${age} days old; page will mark it as needs recheck`);
  }
}

async function main(): Promise<void> {
  const raw = await readFile(SNAPSHOT_PATH, 'utf8');
  const snapshot = JSON.parse(raw) as FibrePriceSnapshot;
  const errors: string[] = [];
  const warnings: string[] = [];

  assert(/^\d{4}-\d{2}-\d{2}$/.test(snapshot.checkedAt), 'snapshot.checkedAt must be YYYY-MM-DD', errors);
  assert(Boolean(snapshot.generatedBy), 'snapshot.generatedBy is required', errors);
  assert(Boolean(snapshot.notes), 'snapshot.notes is required', errors);
  assert(Array.isArray(snapshot.prices) && snapshot.prices.length > 0, 'snapshot.prices must be non-empty', errors);

  const seenIds = new Set<string>();
  const seenCombos = new Set<string>();

  snapshot.prices.forEach((price, index) => {
    validatePackage(price, index, errors, warnings);

    if (seenIds.has(price.id)) {
      errors.push(`Duplicate price id: ${price.id}`);
    }
    seenIds.add(price.id);

    const combo = `${price.ispId}|${price.fnoId}|${price.downloadMbps}|${price.uploadMbps}|${price.monthlyPrice}|${price.sourceUrl}`;
    if (seenCombos.has(combo)) {
      errors.push(`Duplicate provider/network/speed/price/source row: ${combo}`);
    }
    seenCombos.add(combo);
  });

  if (warnings.length > 0) {
    console.warn(warnings.join('\n'));
  }

  if (errors.length > 0) {
    throw new Error(`Fibre price snapshot validation failed:\n${errors.join('\n')}`);
  }

  console.log(`Fibre price snapshot check passed for ${snapshot.prices.length} rows at ${SNAPSHOT_PATH}.`);
}

await main();
