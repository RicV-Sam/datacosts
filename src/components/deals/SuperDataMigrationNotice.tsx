import React from 'react';
import type { MonthlyDataDealOffer } from '../../data/monthlyDeals';

const SOURCE_URL = 'https://www.mtn.co.za/home/terms-and-conditions/content/mtn-super-data';

// This terms check is separate from the immutable monthly price snapshot.
export function SuperDataMigrationNotice({ offer }: { offer: MonthlyDataDealOffer }) {
  if (offer.providerId !== 'mtn' || offer.source.url !== SOURCE_URL) return null;

  return (
    <div className="mt-3 border-l-4 border-amber-600 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
      <p className="font-bold">Before switching to or from Super Data</p>
      <p>Moving to Super Data forfeits Bonus Bonanza “Recharge and Get” and any other benefits from your previous price plan. Moving away forfeits unused, unexpired Super Data and Voice bundles.</p>
      <a href={SOURCE_URL} className="inline-block min-h-11 py-2 font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        MTN terms, clauses 3.1 and 3.5
      </a>
      <p className="text-xs">Migration terms checked 12 October 2026.</p>
    </div>
  );
}
