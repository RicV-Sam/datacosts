import assert from 'node:assert/strict';

/** Reference-only views must not advertise stale offers as current search data. */
export function assertSourceBackedItemList(itemList: { itemListElement?: unknown[] } | undefined, currentRows: number, slug: string): void {
  if (currentRows === 0) {
    assert.equal(itemList, undefined, `Non-current offers must not have an ItemList: ${slug}`);
    return;
  }
  assert.ok(Array.isArray(itemList?.itemListElement), `Missing current-offer ItemList: ${slug}`);
  assert.equal(itemList.itemListElement.length, currentRows, `Schema/current offers diverged: ${slug}`);
}
