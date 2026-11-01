# Fibre price updater

Run `npm run test:fibre-prices` for the offline extraction regressions, then `npm run update:fibre-prices` to fetch current provider-owned pages and prepare a local draft. This does not replace the active snapshot.

Review both ignored outputs under `src/data/generated/`:

- `fibrePriceSnapshot.draft.json`: proposed values, with unmatched rows and their original dates preserved.
- `fibrePriceSnapshot.review.json`: request outcomes, response hashes, exact matched rows, introductory conditions and unresolved reasons.

The extractor binds provider, FNO, speed and payment variant. Currency decimals are preserved. Conflicting displayed/embedded prices, missing products, multiple variants, incomplete promotions and failed requests remain unresolved. An absence is not evidence of withdrawal.

The draft documents price and product identity checks. Before accepting it, review current installation, processing, equipment, promotion, cancellation and address conditions too. An introductory price is separate from the ongoing monthly price and needs its conditions in `promoTerms`. Do not advance a full-guide review or any unrelated source date from a successful price extraction.

After a complete documented review, `npm run update:fibre-prices -- --commit` can replace the local JSON snapshot. This flag does not create a Git commit. The command only fetches live official pages; there is no fixture-input apply mode. It refuses an incomplete refresh before replacing the active file. Keep existing experiment/content holds and publication authorization separate.

Run `npm run check:fibre-prices`, `npm run lint` and the full production build after accepted changes. The fibre structural check reports stale rows. Monthly/comparison freshness gates remain stricter and must not be bypassed to make a release pass during an observation hold.
