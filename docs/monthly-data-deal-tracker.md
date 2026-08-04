# DataCost Monthly Data Deal Tracker

The tracker publishes stable public URLs while keeping each editorial review as an immutable internal snapshot.

## Public routes

- `/best-data-deals-south-africa/`
- `/best-10gb-data-deals-south-africa/`
- `/best-20gb-data-deals-south-africa/`
- `/best-30gb-data-deals-south-africa/`

The tracker type already supports 5GB, 15GB and 50GB. Do not launch those pages until the active snapshot contains enough current official rows to support a useful comparison.

## Monthly update workflow

1. Copy the latest module under `src/data/monthlyDeals/history/` to a new `YYYY-MM.ts` file.
2. Recheck every retained row on a provider-owned page or terms document. Never use an aggregator as pricing evidence.
3. Add the new snapshot to `monthlyDealHistory` in `src/data/monthlyDeals/index.ts`. Do not edit or remove the older snapshot.
4. Keep anytime, night, streaming, social and other restricted allocations separate. Conditional bonus data must include its condition.
5. Mark longer-validity, bundled voice/SMS, fixed-device, source-conflicted or otherwise non-comparable rows as `context_only` with an explicit reason.
6. Update the four tracker dates in `src/seo/contentDates.ts` only after the review is complete.
7. Run `npm run check:monthly-deals`, the targeted tests, typecheck and the full production build.

## Ranking contract

Best overall requires:

- an official, dated and publicly reproducible source;
- guaranteed pooled anytime data inside the page band: 5–<10GB, 10–<15GB, 15–<20GB, 20–<30GB, 30–<50GB or 50–<100GB;
- 28–31-day validity or an explicitly monthly allocation;
- a ranking-eligible product.

An offer appears in a band when either its guaranteed pooled anytime allocation or its full advertised total falls inside that band. This lets a 10GB anytime + 10GB night offer appear as a genuine 10GB option and a split advertised-20GB comparator without letting a 50GB plan dominate the 30GB page. Conditional bonuses and daily-release wallets do not qualify as pooled anytime.

Best overall sorts qualifying offers by lowest monthly price. Exact ties use fewer access restrictions, once-off billing, then provider name. Best R/anytime-GB is calculated as a separate unit-value award. The lowest-advertised-price award may include night or other restricted data, but the page must disclose the full split beside the award.

## Analytics contract

The consent-aware tracker records `deal_size_navigation` for hub, size-switcher and related-page navigation, plus `deal_offer_source_click` for comparison cards, the desktop table and source registers. Event payloads use only controlled provider, size and placement values, a validated offer ID, and the rendered canonical path. They never include a price, free-text eligibility wording or an outbound URL.

## Advertising guardrail

The tracker does not insert a manual ad unit inside the winner summaries, comparison cards or desktop table. It keeps the site's existing consent-aware AdSense setup and leaves the core buying comparison uninterrupted; the production AdSense audit must continue to pass before publishing.

## August 2026 exclusions

Expired MTN Repriced Monthly and SuperFlex offers were excluded. Stock-limited BozzaGigs terms were excluded because no current product page confirms availability. Telkom’s Big Deal was withheld because its live page and linked terms conflict on contract length. Vodacom’s current 30GB promotion was withheld because the official public terms do not publish a price. Rain had no clean, generally comparable 10GB, 20GB or 30GB monthly SKU.
