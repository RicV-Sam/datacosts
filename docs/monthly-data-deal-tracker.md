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

## September 2026 review

All 28 August rows and all 17 source URLs were rechecked on 1 September 2026. Prices, allocations and validity periods were unchanged, so the September snapshot retains the same offer set with fresh source dates and month-specific IDs.

The active source register now contains 16 unique URLs because the Standard Bank Connect 20GB row uses the publicly rendered SIM-plans page instead of the empty unauthenticated checkout shell. The FNB guide’s current cover period conflicts with legacy effective-date wording on page 32, so the rows retain the published prices with that date inconsistency disclosed. Cell C’s live catalogue remains session-sensitive, and the older MTN Entertainment/Home Wi-Fi terms plus the undated Cell C Day-by-Day PDF remain current first-party evidence with explicit freshness caveats.

## October 2026 review

All 28 retained offers were rechecked against official sources on 2 October 2026. The October snapshot preserves the August and September modules unchanged. Every October offer has its own month-specific ID and a 2026-10-02 source-check date.

Changes from September:

- Standard Bank Connect's rendered SIM-plans catalogue now lists its once-off 10GB bundle at R199 for 30 days, down from the September R399 observation. Connected Gigs Plus 20GB remains R209 per month and Pro 35GB remains R299 per month. Subscription data expires before the next debit-order date; advance billing is confirmed, but the exact commitment of those advertised plans remains unconfirmed.
- Melon's rendered Build Your Own selector confirms 10GB at R179, 20GB at R299 and 30GB at R379 per month when voice is zero and SMS is at its minimum. That minimum is now 50 included SMSs, not zero. All three rows disclose the included SMSs and are `context_only` under the data-only ranking contract. The rows cite the current public selector rather than redirected legacy checkout URLs.
- Melon GigADay remains R299 for 1GB daily over 30 days. The current product page, public product data and general terms establish automatic renewal, advance payment and month-to-month commitment, replacing the September once-off classification. Upfront payment does not confirm a formal prepaid/Top Up/postpaid label, so that field is `not_confirmed`. The row now discloses personal mobile-phone use only, daily expiry, no data transfer or roaming, and the distinction between stopping a future renewal and cancelling an activated period.
- AirMobile's data-only rows retain recurring monthly billing and month-to-month commitment. Their formal prepaid/Top Up/postpaid classification is now `not_confirmed`: the source confirms cadence, while the provider distinguishes its monthly and prepaid services, so advance billing is not used to infer a payment-model label.
- The remaining offer prices and allocations are unchanged. MTN Entertainment and Home Wi-Fi retain explicit caveats about their old, still-published terms; the FNB cover/page-32 date conflict remains disclosed.

The active register has 14 unique source URLs because the three Melon Build Your Own rows now share one selector. Supplementary terms checked alongside each row's primary source:

| Provider | Evidence and review outcome |
| --- | --- |
| AirMobile | [Data-only catalogue](https://www.afrihost.com/airmobile/data-only/) and [monthly terms](https://www.afrihost.com/terms-and-conditions/airmobile-monthly): 10GB/R150, 20GB/R250, 30GB/R350 monthly, unchanged; monthly and prepaid services are distinguished. |
| Nedbank Connect | [Prepaid catalogue](https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html): 10GB/R150, 20GB/R250, 30GB/R350 for 30 days, unchanged. |
| Capitec Connect | [Bundle catalogue](https://www.capitecbank.co.za/personal/connect/capitec-bundles/): 10GB/R150/30 days and 20GB/R250/60 days, with linked-number bonuses excluded from base ranking. |
| FNB Connect | [Retail pricing guide](https://www.fnb.co.za/downloads/pricing-guides/FNB-Connect-Retail.pdf): 12GB/R179 and 25GB/R215 plans; 20GB/R549 and 30GB/R599 bundles. Internal effective-period conflict remains. |
| Standard Bank Connect | [Rendered catalogue](https://connect.standardbank.co.za/sim-plans), [FAQ](https://connect.standardbank.co.za/faqs/new-to-standard-bank-connect) and [subscriber terms](https://connect.standardbank.co.za/terms-and-conditions): current prices, subscription expiry, advance billing and eligibility checked without login or ordering. |
| Melon Mobile | [Rendered BYOP selector](https://www.melonmobile.co.za/personal/plans/build-your-own-plan), [GigADay product page](https://www.melonmobile.co.za/personal/plans/gig-a-day-plan), [general terms](https://www.melonmobile.co.za/personal/legal/terms-of-use) and [GigADay terms](https://www.melonmobile.co.za/personal/legal/gig-a-day-terms-conditions): prices, included SMSs, 30-day renewal and restrictions checked without signup or ordering. |
| Vodacom | [Prepaid LTE catalogue](https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans): 5+5GB/R99, 10+10GB/R149, 20+20GB/R229 for 30 days, unchanged; anytime and night allocations remain separate. |
| Cell C | [Live catalogue](https://www.cellc.co.za/cellc/jsp/pinless-recharge/rechargeBundle_ajax.jsp?bundleCategory=DATAWEB&bundleType=DATAWEB), [30-day terms](https://www.cellc.co.za/cellc/static-content/PDF/30-day-bundle-tnc.pdf) and [Day-by-Day FAQ](https://www.cellc.co.za/cellc/static-content/PDF/Day-By-Day_Data_Bundles_FAQ_Web.pdf): active 10+10GB/R469 and daily 500MB+500MB for 30 days/R169. The separate expired 2022 promotional document was not used. |
| MTN | [Entertainment terms](https://www.mtn.co.za/home/terms-and-conditions/content/the-prepaid-mtn-entertainment-bundles-terms-and-conditions), [Super Data terms](https://www.mtn.co.za/home/terms-and-conditions/content/mtn-super-data) and [Home Wi-Fi terms](https://www.mtn.co.za/home/terms-and-conditions/content/mtn-home-wi-fi-product-terms-and-conditions): retained 20GB streaming/R499, 30GB anytime/R269 and 15+15GB Home Wi-Fi/R199; restrictions preserved. |
| Telkom | [Daily Dose page](https://www.telkom.co.za/prepaid-services/dailydosebundles), linked [terms](https://files.telkom.co.za/Terms+and+Conditions+Daily+Dose+Bundles) and [FAQ](https://files.telkom.co.za/Frequently+Asked+Questions+Daily+Dose+Data+Bundles): 30GB/R289 released 1GB daily, no carry-over or transfer. |

These checks establish public source evidence, not successful provider checkout or SIM-level availability. Prices can change after the review. No commit or publication is implied by preparing the snapshot.
