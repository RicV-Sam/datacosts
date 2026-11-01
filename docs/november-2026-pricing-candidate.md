# November 2026 pricing review

The user authorized activation on 1 November 2026 and deployment after the full production build passes. This is a narrow exception to affected pricing holds. Homepage/MTN base rows, other editorial holds and existing review dates remain unchanged.

## Explicit selection

- `src/data/monthlyDeals/index.ts` selects November alongside the three immutable older snapshots.
- `src/data/comparisonOfferUpdates.ts` explicitly selects `2026-11-01.ts` and its recorded-bundle exclusions. The versioned October module retains its original immutable October inputs.
- `src/data/monthlyDeals/history/2026-11.ts` contains 26 monthly records reviewed on 1 November.
- `src/data/comparisonOfferUpdates/2026-11-01.ts` contains 18 supplemental records. Six October shadow overrides are incorporated into the November monthly records rather than duplicated. The supplement contains fourteen additional offers and four independently checked base-catalogue references.

The active catalogue has 44 records. No filename glob or automatic latest-module selection activates a supplement. Future reviews and their exclusions must be explicitly selected.

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

## Review composition and base-data boundary

`buildComparisonOfferCatalog()` composes the selected review with its recorded-bundle exclusions:

```ts
buildComparisonOfferCatalog({
  monthlyOffers: november2026DealSnapshot.offers,
  supplementalOffers: november2026ComparisonOffers,
  excludedRecordedBundleIds: november2026ExcludedRecordedBundleIds
});
```

The two recorded-bundle exclusions prevent the adapter from reintroducing older Vodacom references. A reviewed `recorded-...` override takes precedence over its base record even when its price changes. The active catalogue supplies these exclusions; `src/data.ts` remains unchanged.

Keeping review-bound overrides separate from `src/data.ts` preserves the held homepage and MTN base rows. The authorized pricing exception does not release other content holds. Record the actual release and affected observation cohorts so later reviews do not assume unchanged comparison content.

The snapshot, supplement and exclusions are selected together. Older history and global base-bundle dates are not re-dated. Source freshness, affected metadata and the complete production build must pass before publication. Recheck sources before their freshness window ends or sooner if an offer materially changes.

## Validation

- `npm run test:comparisons` includes a real module-resolution rollover regression against a temporary registry with November selected.
- `npm run test:pricing-candidates` checks authorized selection, composition, four withheld references, override precedence, source/size contracts and award exclusions at the documented review date. Its fixed review clock is test-only.
- Run lint, monthly/editorial checks, privacy/contracts and the full production build after changes.

Production freshness gates remain unchanged. Publication requires the full production command, not only a diagnostic rendering build. Fixed historical test clocks do not alter production clocks or source-age rules.
