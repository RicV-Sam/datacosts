# DataCosts SEO And GSC Baseline

This note records the starting context for ongoing weekly SEO and Google Search Console reviews for `datacost.co.za`.

## Baseline Context

- Production property: `https://datacost.co.za/`
- Project search baseline start date: `2026-03-23`
- First reviewed GSC export date: `2026-05-01`
- GSC data in the first exports runs through `2026-04-28`
- The GSC "Last 3 months" export only contains 37 days because the project is new; treat it as all available search history at the time of the first review, not as a full 90-day trend.

## First Validated Export Set

The first validated GSC Performance exports were:

- Last 3 months: `2026-03-23` to `2026-04-28`
- Last 28 days: `2026-04-01` to `2026-04-28`
- Last 7 days: `2026-04-22` to `2026-04-28`

The nested date ranges validated cleanly:

- The 7-day data matched the same dates inside the 28-day export.
- The 7-day data matched the same dates inside the all-history export.
- The 28-day data matched the same dates inside the all-history export.

## Initial Performance Baseline

| Period | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| 37 days | 159 | 25,838 | 0.62% | 9.71 |
| 28 days | 138 | 23,483 | 0.59% | 9.87 |
| 7 days | 51 | 8,810 | 0.58% | 9.80 |

Latest 7 days versus the previous 7 days from the 28-day export:

| Period | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Previous 7 days, `2026-04-15` to `2026-04-21` | 36 | 5,624 | 0.64% | 9.98 |
| Latest 7 days, `2026-04-22` to `2026-04-28` | 51 | 8,810 | 0.58% | 9.80 |

Interpretation:

- Clicks and impressions increased in the latest 7-day period.
- CTR dipped slightly while visibility grew.
- Average position improved slightly.
- Early opportunity is likely CTR improvement and better page targeting for queries ranking around positions 7 to 12.

## FreeHub Separation

`freehub.datacost.co.za` appeared in the first DataCosts GSC page export because FreeHub previously lived under the DataCosts property.

FreeHub has since moved to its own repo and website as a separate project. For ongoing DataCosts reviews:

- Exclude `https://freehub.datacost.co.za/` URLs from DataCosts page-level analysis.
- Treat FreeHub page rows in historic DataCosts exports as legacy noise.
- Keep query, country, device, and chart totals as property-level signals unless a review specifically needs strict main-domain-only reporting.
- Focus page opportunity analysis on `https://datacost.co.za/` URLs only.

## Initial Page Indexing Snapshot

The first GSC Page indexing export was downloaded on `2026-05-01`. The visible GSC summary showed:

| Status | Pages |
| --- | ---: |
| Indexed | 96 |
| Not indexed | 27 |

The coverage export chart ended on `2026-04-27`, with `96` indexed pages and `27` not indexed pages. The five not-indexed reasons were:

| Reason | Source | Validation | Pages | DataCosts interpretation |
| --- | --- | --- | ---: | --- |
| Not found (404) | Website | Failed | 9 | All 9 URLs were legacy `freehub.datacost.co.za` URLs. Exclude from DataCosts page-level action unless they continue to pollute the property. |
| Alternative page with proper canonical tag | Website | Not Started | 1 | Legacy `freehub.datacost.co.za` URL. Exclude from DataCosts action. |
| Discovered - currently not indexed | Google systems | Not Started | 6 | All 6 are valid `datacost.co.za` URLs in the route catalog. Treat as crawl/indexing queue items and monitor/request indexing. |
| Crawled - currently not indexed | Google systems | Not Started | 5 | Four are valid `datacost.co.za` content URLs in the route catalog; one is `sitemap.xml`, which does not need to be indexed. Improve internal links/content signals for the four content URLs and monitor. |
| Page with redirect | Website | Started | 6 | Four are legacy FreeHub redirects. The two DataCosts entries are expected canonical redirects: `https://www.datacost.co.za/` and `http://datacost.co.za/`. |

Main-domain URLs in the first `Discovered - currently not indexed` set:

- `https://datacost.co.za/cell-c-ussd-codes/`
- `https://datacost.co.za/data-problems/how-to-check-wasp-subscriptions-mtn/`
- `https://datacost.co.za/fix-mobile-problems/`
- `https://datacost.co.za/mtn-ussd-codes/`
- `https://datacost.co.za/telkom-ussd-codes/`
- `https://datacost.co.za/vodacom-ussd-codes/`

Main-domain URLs in the first `Crawled - currently not indexed` set:

- `https://datacost.co.za/network/vodacom/cheapest-1gb/`
- `https://datacost.co.za/network/telkom/monthly-data/`
- `https://datacost.co.za/network/vodacom/monthly-data/`
- `https://datacost.co.za/guides/cheapest-2gb-data-south-africa/`
- `https://datacost.co.za/sitemap.xml`

Routing check:

- The six discovered URLs are present in `src/config/routeCatalog.ts`.
- The four content URLs from crawled-not-indexed are present in `src/config/routeCatalog.ts`.
- `sitemap.xml` being crawled but not indexed is expected and does not need a fix.
- The DataCosts redirect rows are expected canonical-domain variants and do not indicate an indexable page problem.

Near-term indexing priorities:

1. Request indexing or recrawl for the six discovered URLs after confirming live canonical tags and sitemap inclusion.
2. Improve internal links into the four crawled-not-indexed content URLs.
3. Monitor whether the FreeHub legacy rows disappear from the DataCosts property after the separate FreeHub site settles.
4. Keep the `Page with redirect` validation running for canonical-domain cleanup.

Update on `2026-05-01`:

- The six `Discovered - currently not indexed` URLs were submitted for indexing in GSC.
- The repo was updated to strengthen internal links into the network USSD pages, `fix-mobile-problems`, MTN WASP subscription check, `cheapest-2gb`, and the filtered Vodacom/Telkom monthly and Vodacom 1GB pages.
- The filtered bundle-page titles and descriptions were tightened for monthly-data and 1GB intent pages.
- The network-specific USSD page titles were updated to include `South Africa` for better query alignment.

## Weekly Review Inputs

For each Friday SEO and GSC review, use:

- GSC Performance export for the latest 7 days.
- GSC Performance export for the latest 28 days.
- Longer all-available or 3-month export when useful for trend context.
- GSC indexing or page indexing details when available.
- Sitemap and canonical health checks from the live site and built output.
- Google keyword research or Keyword Planner exports when available.

Keyword research adds value because it shows demand that may not yet appear in GSC. Compare supplied keyword data against GSC query data to separate:

- queries where DataCosts already has impressions but needs CTR or ranking work
- relevant keyword opportunities where DataCosts is not yet visible
- content gaps that justify new or expanded pages

## Review Priorities

Weekly reviews should produce a short prioritized action list, with emphasis on:

- low CTR queries and pages with meaningful impressions
- pages ranking around positions 7 to 12
- indexing, sitemap, canonical, and schema issues
- internal-link opportunities between guides, network pages, and troubleshooting pages
- keyword gaps from supplied Google keyword data
- changes in clicks, impressions, CTR, and average position since the previous review
