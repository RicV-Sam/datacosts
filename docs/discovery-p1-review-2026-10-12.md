# DataCost discovery: P1 review

Prepared 12 October 2026. This record covers the checks completed before release.
The user authorised publication of the factual P1 changes on 12 October.
Deployment and live verification are separate from the pre-release checks below.

## Implemented changes

| Surface | Before | Review candidate |
| --- | --- | --- |
| Older 10GB and 20GB guides | Empty results could imply no offers existed, although the broader trackers had offers. | Explain the exact-size, four-network, once-off filters and exclusions; link prominently to the matching broader tracker. Keep existing comparison filters, routes, canonicals and rankings. |
| Telkom network page | The presence of “hour” in “24 Hours” classified explicitly Daily bundles as Hourly and excluded them from general-use summary picks. | Respect the explicit Daily type. Daily 150MB and Daily 1GB retain their prices and validity and can appear in the relevant summary cards. Clarify that summary picks cover only source-checked rows in the displayed table. Let Telkom's summary names wrap on small screens so the bundle size stays readable. |
| MTN Super Data | Eligibility mentioned migration without explaining both directions of forfeiture. | Show the migration warning in the tracker hub winner, the 30GB quick verdict, and desktop/mobile comparison views. Cite clauses 3.1 and 3.5 and separately date the migration-terms check. |

Only the older 10GB/20GB guide editorial dates and Telkom parent-page date advance to 12 October. Their generated sitemap dates match. Monthly price snapshot dates remain 2 October, as required by the tracker validation contract. USSD dates and historical snapshots remain intact.

## Primary evidence

- [MTN Super Data terms](https://www.mtn.co.za/home/terms-and-conditions/content/mtn-super-data), retrieved directly with HTTP 200 on 12 October. The web research reader timed out, but direct access succeeded. Clause 3.1 forfeits Bonus Bonanza or other previous plan benefits when entering Super Data. Clause 3.5 forfeits unused, unexpired Super Data and Voice bundles when leaving. The table lists 30GB/R269/30 days, 70GB/R419/30 days and 200GB/R549/30 days. This closes the report's 30GB price-access gap; the expired brochure is not used as current price evidence.
- [Telkom time-based catalogue](https://www.telkom.co.za/prepaid-services/time-based-bundle), inspected in a browser on 12 October using its “Daily bundles” tab. It lists 150MB/R12 and 1GB/R31, each with 24-hour validity. Only these two existing price-row source dates advance to 12 October. It also lists a smaller 30MB/R5.50 daily bundle; the current table is not a complete catalogue and its summary now says so.
- Live DataCost 10GB/20GB guide results, populated trackers and their active route implementations were inspected before editing. Different comparison scopes are preserved instead of merging unlike products into one ranking.

## Verification

- Four focused regression tests cover daily classification and summary eligibility, exact-size guide scope/link/canonical, MTN mobile/desktop warnings, and review-date boundaries.
- The regression tests are included in the existing editorial-integrity build check, so the deployment workflow will run them.
- Existing monthly-deal, analytics and MVNO tests passed: 18 tests.
- Type checking/lint and the full build passed, including publishing checks, price validation, editorial integrity, sitemap generation, prerendering, SEO and ad checks.
- SEO output validation covered 251 generated HTML files and five sitemap files. The sitemap remains at 172 URLs.
- Browser checks covered the five affected routes at 1280, 768, 390 and 320 pixels. No page-level horizontal overflow occurred at those widths. The broader tracker link opened the correct destination, and its keyboard focus outline was visible.
- Screenshots were inspected for the narrow guide and MTN migration warning. Reduced-motion and 200% CSS-zoom checks were also performed.

## Known limitations and remaining queue

At 200% CSS zoom, the shared header produces eight pixels of page overflow on the 20GB guide. The original checkout reproduced the same 1288-pixel document width in a 1280-pixel viewport. This candidate does not alter the header; the issue remains a separate UI follow-up. Browser checks do not establish WCAG conformance or field performance.

The tracker retains its saved prices, eligibility taxonomy, rankings and source dates. The new MTN notice records a separate terms check and does not claim a complete price refresh. Telkom's complete catalogue has not been imported.

P2 work is still queued:

1. Resolve FNB's conflicting pricing-guide effective dates using current primary evidence.
2. Extend the retention calculator with introductory and subsequent monthly prices.
3. Build a daily-versus-monthly simulator that fulfils the same usage demand in both scenarios.
4. Verify TFG Connect product terms before adding it to the existing MVNO guide.

Zero-rating, RICA, MTN night products, family sharing and BozzaGigs remain evidence holds. New regulatory copy needs a current legal-status check.
