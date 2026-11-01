import assert from 'node:assert/strict';
import test from 'node:test';
import { assertSourceBackedItemList } from '../scripts/lib/comparison-output';

test('current comparison rows require a complete matching search ItemList', () => {
  assert.doesNotThrow(() => assertSourceBackedItemList({ itemListElement: [{}, {}] }, 2, 'current'));
  assert.throws(() => assertSourceBackedItemList(undefined, 2, 'missing'), /Missing current-offer/);
  assert.throws(() => assertSourceBackedItemList({ itemListElement: [] }, 2, 'empty'), /diverged/);
  assert.throws(() => assertSourceBackedItemList({ itemListElement: [{}] }, 2, 'partial'), /diverged/);
});

test('reference-only comparisons cannot emit current-offer search data', () => {
  assert.doesNotThrow(() => assertSourceBackedItemList(undefined, 0, 'references'));
  assert.throws(() => assertSourceBackedItemList({ itemListElement: [{}] }, 0, 'stale'), /Non-current offers/);
  assert.throws(() => assertSourceBackedItemList({ itemListElement: [] }, 0, 'empty'), /Non-current offers/);
});
