import test from 'node:test';
import assert from 'node:assert/strict';
import { getFibrePrices, getFreshFibrePrices, getFibrePriceSnapshot, isFibrePriceFresh } from '../src/data/fibre/fibrePricing';

test('freshness rejects future, impossible and invalid dates and respects the exact 45-day boundary', () => {
  const start = new Date('2026-11-01T00:00:00Z');
  assert.equal(isFibrePriceFresh('2026-11-01', start), true);
  assert.equal(isFibrePriceFresh('2026-11-02', start), false);
  assert.equal(isFibrePriceFresh('2026-02-30', new Date('2026-03-03T00:00:00Z')), false);
  assert.equal(isFibrePriceFresh('2026-11-01', new Date('invalid')), false);
  assert.equal(isFibrePriceFresh('2026-11-01', new Date('2026-12-16T00:00:00Z')), true);
  assert.equal(isFibrePriceFresh('2026-11-01', new Date('2026-12-16T00:00:00.001Z')), false);
});
test('stale, conflicting and unidentified-network rows cannot consume a fresh comparison limit', () => {
  const snapshot = getFibrePriceSnapshot();
  const original = snapshot.prices;
  const base = original[0];
  try {
    snapshot.prices = [
      { ...base, id: 'stale', monthlyPrice: 10, checkedAt: '2026-08-06' },
      { ...base, id: 'conflict', monthlyPrice: 20, checkedAt: '2026-11-01', confidence: 'low' },
      { ...base, id: 'from-price', monthlyPrice: 25, checkedAt: '2026-11-01', fnoId: 'multi-network' },
      { ...base, id: 'fresh-a', monthlyPrice: 30, checkedAt: '2026-11-01' },
      { ...base, id: 'fresh-b', monthlyPrice: 40, checkedAt: '2026-11-01' },
    ];
    assert.deepEqual(getFreshFibrePrices({ limit: 2 }, new Date('2026-11-01T12:00:00Z')).map((row) => row.id), ['fresh-a', 'fresh-b']);
    assert.equal(getFreshFibrePrices({ limit: 0 }, new Date('2026-11-01T12:00:00Z')).length, 0);
    assert.equal(getFibrePrices({ maxMonthlyPrice: 0 }).length, 0);
  } finally { snapshot.prices = original; }
});
