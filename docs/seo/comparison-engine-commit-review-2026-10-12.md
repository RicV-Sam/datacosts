# DataCost comparison commit review

The review of `34771e5` found four issues requiring correction and one inherited source wording error. The corrected comparison branch passes local validation, but publication should wait for integration with the other active DataCost sprint. No push, merge into main, deployment or indexing submission was performed by this review.

## Findings and corrections

1. **Evidence ageing could recreate empty comparisons after publication.** `getTierComparison` removed all records after 30 days during client rendering. The deployment gate could not prevent a visitor later receiving an empty comparison. Dated reference rows now remain visible, with overdue warnings; current awards and price schema exclude overdue evidence. The 1GB selection follows the same principle. Monthly tracker awards also use the shared current-evidence check.
2. **Vodacom LTE eligibility depended on catalogue origin.** Existing 5GB/10GB/20GB snapshot records were eligible, while the adapter excluded the same family's 50GB offer on a supposed smartphone restriction. Official terms require the qualifying LTE price plan and exclude certain SIM types; they do not establish a router-only device restriction. All sizes now use consistent eligible price-plan treatment. MTN Home Wi-Fi retains its separately documented device restriction and context status.
3. **Sparse tiers omitted verified offers from existing provider sources.** Added current supplements for AirMobile 2GB/5GB/15GB, Nedbank 2GB/5GB/15GB/50GB, FNB 6GB/50GB and Capitec 2GB/5GB/50GB. Bank eligibility, payment uncertainty, recurring billing, conditional bonuses and validity stay visible. The 60-day Capitec offer does not enter monthly awards. Eligible monthly 2GB allowances now receive the same band-based awards; the 14-day Vodacom offer does not.
4. **The browser gate could pass with no application JavaScript.** A prerendered selector and absence of script errors were insufficient. The gate now requires the application's `render-event` and fails failed/non-successful local script or stylesheet requests. An intentional blocked-script run confirmed that it rejects the failure.
5. **Cell C's inherited note confused usage hours with expiry.** The 10GB+10GB Nite record now describes Nite as usable 00:00–04:59:59, distinct from the 30-day bundle expiry. FNB plan cancellation wording also now states the verified one-month notice requirement.

| Tier | Rows in 34771e5 | Rows after review |
| --- | ---: | ---: |
| 1GB | 3 | 3 |
| 2GB | 3 | 6 |
| 5GB | 2 | 6 |
| 10GB | 10 | 10 |
| 15GB | 1 | 3 |
| 20GB | 11 | 11 |
| 50GB | 1 | 4 |

These are recorded offer counts, not unique providers or exhaustive market coverage. Historical monthly snapshots are unchanged. Current supplements override selected records by ID and retain independent pricing check dates.

## Source evidence

- [Vodacom pricing](https://www.vodacom.co.za/vodacom/shopping/plans/prepaid-plans) and [LTE terms](https://www.vodacom.co.za/vodacom/terms/home-prepaid-lte) corroborate the split allocations, prices, validity, purchase channels and price-plan eligibility. They support no blanket router-only rule for these prepaid LTE offers.
- [MTN Internet Bundles](https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles) corroborates the 2GB+2GB and 5GB+5GB records. The documented conflict between general and dedicated Night Express usage windows remains disclosed rather than silently resolved.
- [AirMobile](https://www.afrihost.com/airmobile/data-only/) confirms 2GB R60/month, 5GB R100/month and 15GB R220/month. The parent review retrieved the official HTML; script and comment content was excluded when inspecting its visible pricing.
- [Nedbank prepaid bundles](https://personal.nedbank.co.za/nedbank-connect/prepaid-bundles.html) confirms 30-day 2GB R60, 5GB R100, 15GB R220 and 50GB R450, and the bank-account requirement. Its current visible table was checked separately from commented HTML.
- [Capitec bundles](https://www.capitecbank.co.za/personal/connect/capitec-bundles/) confirms 30-day 2GB R59 and 5GB R100, and 60-day 50GB R450. Linked-number bonuses remain conditional and excluded from base allowance awards.
- [FNB pricing guide](https://www.fnb.co.za/downloads/pricing-guides/FNB-Connect-Retail.pdf), printed page 8, confirms 6GB R139/month and 50GB R369/month alongside the existing 12GB R179 and 25GB R215 plans. [Product information](https://www.fnb.co.za/fnb-connect/sayYesToConnect.html) and [relationship agreement](https://www.fnb.co.za/downloads/fnbconnect/terms/FNBConnectRelationshipAgreement.pdf), section 7.2, support month-to-month service and one month's cancellation notice. The internal effective-date conflict in the pricing guide remains disclosed.
- [Standard Bank SIM plans](https://connect.standardbank.co.za/sim-plans) was verified in an isolated browser, including its Data Only tab: 10GB once-off R199 for 30 days, Connected Gigs Plus 20GB R209/month and Pro 35GB R299/month. Those prices corroborate the existing October records. [Subscriber terms](https://connect.standardbank.co.za/terms-and-conditions) corroborate qualifying bank account, age and recurring allocation/expiry rules.
- [Cell C's catalogue](https://www.cellc.co.za/cellc/jsp/pinless-recharge/rechargeBundle_ajax.jsp?bundleCategory=DATAWEB&bundleType=DATAWEB) was verified through an isolated browser: active record DW1041 lists 10GB Anytime + 10GB Nite, R469, 30 days, once-off. [30-day terms](https://www.cellc.co.za/cellc/static-content/PDF/30-day-bundle-tnc.pdf), sections 12 and 19, distinguish overnight usage from actual bundle expiry.

Some plain web-reader/native requests timed out or returned 403. The affected key facts were recovered from official HTML, the web reader or isolated browser as appropriate. An inaccessible response was not treated as evidence that an offer disappeared. This review corroborates the added and corrected offers and the key reused facts above; it is not a claim of an exhaustive fresh audit of every market offer or every unchanged historical snapshot field.

## Other running request

The other chat is **Prepare DataCost research prompt**. It already released `5a7d8d5`, adding the daily-versus-monthly calculator, retention changes and TFG guidance. That committed release is now integrated into this isolated comparison branch via local merge `9b0ad09`. Its review-date conflict was resolved by preserving both sprints' dates and the new calculator route. The combined build includes its tests and routes.

Its next sprint is still active in the separate `datacost-discovery-p1` worktree. At the review checkpoint it had uncommitted changes to `ComparisonGuidePage`, package scripts, content dates, routing and sitemaps, including product-specific night rules. Those files overlap this branch. Worktree isolation prevents direct overwrites, but the next release must combine the final commits and rerun validation. This review did not modify, copy, stop or message that chat's unfinished work.

## Validation and verdict

Passed locally: TypeScript lint; ten comparison regression tests; nineteen monthly/MVNO/analytics tests; 120 WP1 contract tests; the full production build with the integrated P2 editorial checks; SEO checks across 252 HTML pages and five sitemap files; AdSense checks; all eleven comparison-mode output checks; 21 tier/viewport checks without JavaScript; application execution and local asset checks; seven hydrated tier checks at a simulated 15 January 2027 showing dated references with no stale awards; and the negative blocked-script test.

The retained 200% text limitation is in the unchanged header: at a 390px viewport it expands page width to 488px. The comparison content stays within the viewport. No accessibility conformance, Linux CI success, field performance, indexing or traffic outcome is asserted.

**Verdict:** the original commit needed fixes. The corrected branch is suitable for final release integration, with no remaining verified comparison-logic blocker identified in this review. Hold publication until the other active sprint's final changes have been integrated and the combined branch passes its final checks. Source freshness must be rechecked if release is delayed.
