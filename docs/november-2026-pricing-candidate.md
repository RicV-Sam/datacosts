# November 2026 pricing candidate — inactive

The 1 November source review prepares a later data release without activating it. Existing observation holds and the instruction to keep the November data inactive remain in force. Committing or publishing the preparation code does not authorize activation of these records.

## Explicit selection

- `src/data/monthlyDeals/index.ts` still selects the October snapshot from the existing three registered history entries.
- `src/data/comparisonOfferUpdates.ts` explicitly selects `2026-10-12.ts`. That module reads its original immutable October snapshot, not whichever monthly snapshot becomes current.
- `src/data/monthlyDeals/history/2026-11.ts` contains 26 candidate monthly records and is **not registered**.
- `src/data/comparisonOfferUpdates/2026-11-01.ts` contains 18 candidate supplemental records and is **not selected**. Six October shadow overrides are incorporated into the reviewed November monthly records rather than duplicated here. The supplement contains fourteen additional offers and four independently checked base-catalogue references.

No filename glob, date comparison or automatic latest-module selection activates the supplement. Do not add the November snapshot to the registry or change the active supplement selection during the holds.

## Scope and uncertainty

The review accounts for the existing 48 logical catalogue records: 44 retained candidates and four withheld references. This is not a complete South African market comparison, a purchase test or a certification of SIM-specific availability. Additional VodaPay-exclusive products were identified but are outside this retained-record candidate; do not claim comprehensive coverage.

Withheld from the candidate:

- `mtn-entertainment-streaming-20gb-2026-10`
- `mtn-home-wifi-15-plus-15-2026-10`
- `recorded-voda-monthly-1-5gb`
- `recorded-voda-monthly-3gb`

The two MTN references have old, still-published terms without an independently reconfirmed current purchase route. The two Vodacom references are supported by a 2025 tariff-change notice, but the current prepaid catalogue did not reconfirm those exact variants. This does not establish withdrawal. Their historical source dates remain intact in the active/history data.

The FNB guide's conflicting effective periods remain disclosed. Its six candidate records are retained as `context_only` and cannot win awards. Monthly fee cadence is kept separate from an unconfirmed exact commitment/payment variant. Other unknown tax, expiry, eligibility and cancellation details remain explicit in the source review and candidate notes; none is inferred from a price alone.

Material documentary changes include Melon's current 30-day plan expiry, Capitec's parent/guardian-consent eligibility route, Standard Bank's current prepaid source/payment classification, and the unresolved Cell C transfer clauses. Night, daily-release, conditional bonus and longer-validity allocations remain separate.

The detailed per-record source ledger, response files/hashes, rendered selector/FAQ evidence and unresolved items are in the existing private monthly audit folder under `2026-11-01/november-preparation/`. Each retained record also stores its primary official URL and actual 1 November check date. No account, checkout or live SIM access was used.

## Preview composition and later activation

`buildComparisonOfferCatalog()` accepts explicit inputs so the candidate can be checked without changing the active registry:

```ts
buildComparisonOfferCatalog({
  monthlyOffers: november2026DealSnapshot.offers,
  supplementalOffers: november2026ComparisonOffers,
  excludedRecordedBundleIds: november2026ExcludedRecordedBundleIds
});
```

The two recorded-bundle exclusions are required for this candidate. Omitting them would allow the adapter to reintroduce the older Vodacom references. A reviewed `recorded-...` override takes precedence over its base record even when its price changes. The active catalogue supplies no exclusions and remains unchanged.

Keeping review-bound overrides separate from `src/data.ts` allows a future authorized comparison revision to be scoped without automatically changing the held homepage or MTN network base rows. It does not release the comparison, pilot, MVNO or other holds. Review dates are not automatic edit permission.

Before any permitted activation, recheck source freshness and unresolved offers, review the exact affected pages/metadata, and select the monthly snapshot, supplement and recorded-bundle exclusions together. Do not re-date October history or change global base-bundle dates. A future activation needs the normal complete production checks and explicit publication authorization.

## Validation

- `npm run test:comparisons` includes a real module-resolution rollover regression against a temporary registry with November selected.
- `npm run test:pricing-candidates` checks inactivity, composition, four withheld references, override precedence, source/size contracts and award exclusions at the documented review date. Its fixed review clock is test-only.
- Run lint, monthly/editorial checks, privacy/contracts and the full production build after changes.

The normal production build still rejects the active October evidence for age. The inactive candidate does not clear or bypass that gate. A diagnostic rendering build can check unchanged active output separately and is not release approval.
