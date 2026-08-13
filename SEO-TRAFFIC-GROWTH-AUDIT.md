# DataCost Organic Traffic Growth Audit

**Audit date:** 13 August 2026

**Primary property:** `sc-domain:datacost.co.za`

**Latest Search Console date:** 11 August 2026 (normal Search Console reporting lag applies)

**Decision window:** latest 28 days, 15 July–11 August 2026, compared with 17 June–14 July 2026

**Supporting evidence:** latest 7 days (5–11 August), latest three months (12 May–11 August), built-site crawl, route catalog, prior GSC coverage reviews, and representative live SERPs

## Executive summary

DataCost is growing, but visibility is growing faster than traffic. In the latest 28 days, clicks increased from approximately 1,720 to 2,020 (**+17.4%**) while impressions increased from approximately 347,000 to 463,000 (**+33.4%**). Average position improved slightly from 7.9 to 7.8, but CTR declined from 0.5% to 0.4%. The immediate growth problem is therefore not a lack of indexed surface; it is converting an expanding first-page/near-first-page footprint into more qualified clicks while protecting established pages.

The site is technically much stronger than the headline indexing counts imply. The production build generates 248 HTML files: 210 indexable routes, 20 intentional `noindex` routes, and 18 redirect aliases. The configured XML sitemaps contain 170 deliberately prioritised URLs. A full built-output crawl now finds no broken internal links, no indexable orphans, exactly one H1 and one canonical on every generated page, correct robots/sitemap alignment, and expected schema/breadcrumb output on canonical pages. HTTP and `www` both 301 directly to `https://datacost.co.za/`.

The main low-risk implementation was internal linking. Twelve indexable pages had no inbound HTML links in the previous build. All twelve now receive contextual links from the airtime and data problems hub, grouped by data, airtime, or subscription intent. No title, description, URL, canonical, robots, redirect, schema, or sitemap changes were made because the current evidence did not justify the ranking risk.

Bing independently confirms the opportunity. From 15 July–11 August, Bing clicks rose from 141 to 307 (**+117.7%**) and impressions rose from 12,913 to 22,454 (**+73.9%**); CTR improved from 1.09% to 1.37%. Bing is not experiencing the same sitewide CTR erosion as Google, but it identifies specific low-CTR pages in the same operator, USSD, balance-check, and router clusters. Bing also has a desktop-heavy impression mix, so dense comparison experiences must work well on desktop even though Google makes mobile the overall priority.

The highest-value growth path is to improve the established data-deals and operator clusters with better comparison utility and fresher evidence, then deepen task-specific USSD and troubleshooting coverage. Competitors increasingly win with filterable deal databases, MVNO breadth, normalised 30-day pricing, and tightly focused task directories. DataCost already has the authority base and page-one visibility to compete, but should add these capabilities deliberately rather than mass-produce pages.

## Evidence quality and limits

- Search Console is the authoritative performance source. Values shown as abbreviated cards in the interface are recorded as approximate where appropriate; percentage changes inherit that rounding.
- FreeHub URLs were excluded from DataCost page-level decisions. Historic property totals can still contain legacy `freehub.datacost.co.za` noise.
- The three-month comparison is launch-skewed: 4,444 clicks and 957,198 impressions versus 242 clicks and 44,610 impressions in the preceding period. It demonstrates scale-up, not a stable seasonal growth rate.
- The accessible Analytics account exposed a FreeHub property, not a confirmed DataCost GA4 property. GA4 engagement and conversion evidence is therefore an access gap and did not block the search audit.
- The supplied Google Keyword Planner materials include a three-keyword snapshot and the first 100 visible ideas out of 1,639 available ideas. They are demand estimates, not Search Console performance, and the remaining 1,539 ideas were not supplied. Location, language, network, date range, and match settings are not visible, so the averages are directional only. Keyword Planner `Competition` describes paid-advertiser competition, not organic ranking difficulty, and the displayed GBP bids must not be read as South African traffic value without the missing targeting context.
- Bing evidence comes from six Bing Webmaster Tools exports dated 13 August 2026 and covering 13 May–11 August. Country and device totals reconcile exactly to 47,545 impressions and 671 clicks. The 55-page report covers 94.5% of impressions and 90.3% of clicks, while the 666-keyword report exposes only 12.7% of impressions and 48.0% of clicks; Bing query-level conclusions are therefore directional, not complete.
- Two additional Bing keyword-demand exports contain estimated impressions and unlabeled trend arrays, not clicks, rankings, landing pages, or dated performance. Their volumes are not additive to the Bing performance report. The larger export mixes telecom intent with unrelated meanings of “data,” so only explicitly relevant South African mobile terms inform recommendations.
- Bing country code `ww` accounts for most rows but is not a usable country definition, and country-level average position is exported as zero throughout. Neither field is used for geographic or ranking conclusions.
- Search appearance exposed no useful rich-result segment; only a zero-volume translated-results row was visible. No rich-result uplift is claimed.
- Search Console's current examples interface exposed only the leading rows of the 15 crawled-not-indexed group. The review therefore reconciled the live examples with the repository's prior full-batch GSC review rather than inventing unseen URLs.
- External links were source-reviewed and representative official links were sampled. A reliable exhaustive external HTTP status check is not possible because many operator sites reject automated requests; broken **internal** links were checked exhaustively.

The calculation notebooks are at `docs/seo/organic-traffic-growth-analysis.ipynb`, `docs/seo/bing-search-analysis.ipynb`, `docs/seo/bing-keyword-demand-analysis.ipynb`, and `docs/seo/google-keyword-ideas-analysis.ipynb`.

## Strengths

1. **Large, growing first-page footprint.** Average position is 7.8 across 463,000 latest-28-day impressions.
2. **Strong South African relevance.** South Africa generated 1,803 clicks and 422,594 impressions, about 89% of clicks and 91% of impressions.
3. **Mobile-market fit.** Mobile generated 1,698 clicks and 392,350 impressions, about 84% of clicks and 85% of impressions.
4. **Established topical winners.** The homepage, MTN and Vodacom operator pages, operator USSD pages, APN troubleshooting, price comparisons, and cheapest-data guides all have demonstrated traction.
5. **Sound technical contracts.** Canonicals, H1s, robots directives, redirect aliases, content dates, schema parsing, and sitemap generation are centrally validated.
6. **Clear query ownership.** `docs/seo-query-ownership.md` already separates broad USSD, operator-code, balance-check, and troubleshooting intent.
7. **Evidence-aware publishing.** Data-problem and fibre content is validated before build, and public search-output regressions are guarded.

## Primary bottlenecks

1. **CTR dilution:** impressions rose 33.4% while clicks rose 17.4%; CTR fell 0.1 percentage point.
2. **Losses on established leaders:** the homepage, MTN page, and Vodacom page lost clicks versus the previous 28 days even as the site expanded.
3. **Comparison utility gap:** competitors expose hundreds of offers, filters, MVNOs, term/type facets, and normalised monthly value.
4. **Uneven internal authority:** twelve indexable troubleshooting pages were orphans before this implementation.
5. **Mixed GSC exclusion reporting:** legitimate content, redirect aliases, utilities, intentional noindex pages, and legacy FreeHub URLs share the same headline buckets.
6. **Measurement gap:** no confirmed DataCost GA4 property was available, so qualified sessions, engagement, outbound operator clicks, and conversions cannot yet be tied to search landing pages.
7. **Performance risk:** the main JavaScript bundle is about 406 kB before gzip, the shared header chunk about 138 kB, and several hub HTML files exceed 100 kB. This is a mobile CWV risk, not a confirmed field failure; GSC supplied no usable field CWV evidence in this audit.

## Analytics findings

### Period performance

| Window | Clicks | Impressions | CTR | Avg. position | Interpretation |
| --- | ---: | ---: | ---: | ---: | --- |
| Latest 7 days | 439 | 107,767 | 0.4% | 7.7 | Visibility remains high; CTR is the constraint. |
| Latest 28 days | ~2,020 | ~463,000 | 0.4% | 7.8 | Decision window. |
| Previous 28 days | ~1,720 | ~347,000 | 0.5% | 7.9 | Clicks +17.4%; impressions +33.4%. |
| Latest 3 months | 4,444 | 957,198 | 0.5% | 8.0 | Strong launch-driven expansion. |
| Previous 3 months | 242 | 44,610 | 0.5% | 9.9 | Not a stable comparable baseline. |

### Query opportunities in positions 4–15

| Query | Latest 28-day signal | Assessment |
| --- | --- | --- |
| `mtn data deals prepaid` | 16 clicks / 1,383 impressions / 1.2% CTR / pos. 5.7 | Strong owner and improving rank; improve deal completeness and freshness, not the title. |
| `mtn prepaid data deals` | 14 / 1,071 / 1.3% / 6.6 | Same intent family; protect the primary operator page and prevent duplicate targeting. |
| `cell c data deals` | 16 / 4,883 / 0.3% / 9.5 | Largest clear impression-to-click gap; investigate snippet/intent and offer freshness after another stable window. |
| `mtn data bundles` | 12 / 1,157 / 1.0% / 9.1 | Expand structured bundle coverage and comparison paths. |
| `telkom ussd codes` | 13 / 1,097 / 1.2% / 3.8 | Ranking is strong; focused task answers and snippet clarity matter more than architecture. |
| `mtn ussd codes` | 8 / 805 / 1.0% / 4.8 | Defend with official verification and task completeness. |
| `vodacom ussd codes` | 7 / 1,033 / 0.7% / 5.4 | Meaningful CTR opportunity, but query ownership is already clear and ranking improved sharply. |
| `cheapest data in south africa` | 15 / 257 / 5.8% / 6.7 | High-quality CTR; protect the current owner and strengthen comparison utility. |
| `cheapest prepaid data in south africa` | 9 / 103 / 8.7% / 4.9 | Excellent CTR; preserve snippet and URL. |

The position 10–30 tail should be the next export-led discovery pool, but it should not drive metadata edits until query-to-page ownership is available at full row level. The bounded interface evidence did not support a safe mass rewrite.

### Page gains and losses

| Page | Latest vs previous 28 days | Reading |
| --- | --- | --- |
| Homepage | 246 vs 308 clicks; 12,260 vs 13,275 impressions | Established leader declined; protect and diagnose query mix. |
| `/network/mtn/` | 152 vs 251; 20,519 vs 24,686 | Material loss despite position 7.8; priority refresh/competitor review. |
| `/network/vodacom/` | 73 vs 80; 22,222 vs 24,327 | Smaller decline; CTR stable at 0.3%. |
| `/network/cell-c/` | 100 vs 36; 18,154 vs 7,005 | Major visibility gain; monitor quality and CTR. |
| `/telkom-ussd-codes/` | 99 vs 76; 25,435 vs 18,328 | Durable growing winner. |
| `/fix/vodacom-apn-settings/` | 89 vs 29; 5,092 vs 1,698 | Emerging troubleshooting winner. |
| `/fix/telkom-apn-settings/` | 85 vs 48; 3,405 vs 2,380 | Emerging winner with 2.5% CTR. |
| `/guides/vodacom-vs-mtn-data-prices/` | 64 vs 47; CTR 3.5% vs 2.0% | Strong comparison intent. |
| `/cell-c-ussd-codes/` | 62 vs 29; 41,383 vs 32,019 | Huge impression base and very low displayed CTR; defend relevance, test task snippets carefully. |
| `/guides/cheapest-data-south-africa/` | 56 vs 23; 4,690 vs 1,635 | Growing strategic owner. |

### Segments

- Mobile dominates, so snippet testing, answer-first layouts, interaction latency, and compact comparison controls should be designed mobile-first.
- Desktop average position weakened from 8.8 to 9.7 while impressions rose. This is secondary to mobile but worth checking on comparison/table SERPs.
- Non-South-African traffic is small. Nigeria, the UK, Ghana, Zimbabwe, and the US should not distort South African content decisions.

### Cannibalisation

No top-query pair supplied enough evidence to justify consolidation. The existing ownership map correctly separates broad USSD directories, operator USSD pages, balance how-tos, and troubleshooting pages. The dense “data disappearing” family remains a monitoring risk: broad national guides should own diagnosis, operator guides should own network-specific causes, and `/data-problems/` pages should own a distinct fix/question. Preserve URLs and reinforce those roles through links and copy.

### Google Keyword Planner demand check

| Keyword | Avg. monthly searches | Three-month change | YoY change | Paid competition | Top-of-page bid range |
| --- | ---: | ---: | ---: | --- | ---: |
| `airtime` | 1,600 | 0% | +19% | Low | £0.16–£0.91 |
| `data` | 8,100 | -18% | 0% | Low | £0.94–£4.75 |
| `ussd` | 1,900 | 0% | 0% | Low | £0.48–£1.14 |

This independently validates sustained broad interest in airtime and USSD topics. The `airtime` YoY increase is a useful directional signal for the transfer, recharge, and balance-check opportunities already identified in Bing. `ussd` confirms the strategic value of the existing directory and operator-code owners, but does not justify another broad USSD page.

The apparent 8,100-search volume for `data` is not actionable on its own: the term spans mobile bundles, computing, analytics, privacy, education, and many other intents, while its three-month estimate is down 18%. DataCost should continue targeting qualified operator-and-task phrases rather than the generic head term.

#### Keyword-ideas subset

The attached text contains 100 unique visible rows with 101,440 combined average monthly searches. That total is not a market size: `vodacom deals` alone contributes 60,500 (59.6%) and can include handset, contract, upgrade, voice, and data intent. It is excluded from qualified data-opportunity sizing until its SERP and query refinements are reviewed.

| Theme or example | Avg. monthly searches | Direction | Audit implication |
| --- | ---: | --- | --- |
| `data deals` | 1,900 | +19% three-month; flat YoY | Supports the established comparison and operator-page strategy. |
| `cheap data deals` | 590 | +22% three-month and YoY | Reinforces price-led comparison intent already owned by current guides. |
| `month to month data deals` | 1,300 | +23% three-month and YoY | Strong case for clearer month-to-month filtering and labels, not a duplicate page family. |
| `sim card data deals` | 1,900 | +26% three-month; +50% YoY | Emerging comparison facet; validate whether users mean SIM-only/mobile data before implementation. |
| `prepaid data deals` | 390 | +22% three-month; +50% YoY | Supports differentiated prepaid inventory on existing operator owners. |
| `vodacom unlimited data deals` | 4,400 | Flat three-month; -18% YoY | Large intent, but declining; strengthen the existing unlimited guide and Vodacom pathways. |
| `mtn unlimited data deals` | 3,600 | -19% three-month and YoY | Large but declining; avoid interpreting volume as growth. |
| `cell c unlimited data deals` | 1,900 | -21% three-month; flat YoY | Validate current product availability before expanding coverage. |
| `mtn data contract` | 1,600 | Flat three-month; +23% YoY | Contract intent deserves clearer comparison facets and ownership. |
| `telkom month to month data deals` | 1,300 | Flat three-month; -54% YoY | Meaningful volume but sharp decline; refresh evidence before prioritising. |

The visible set contains 14,880 searches across 27 rows mentioning `unlimited` or `uncapped`, 6,690 across 17 month-to-month/contract rows, and 3,290 across 22 cheap/best/affordable rows. These groups overlap and therefore must not be added together. Very large percentage increases on 10–90-search phrases are low-base effects and rank below established high-volume owners.

Google and Bing now agree on the broad themes—operator deals, unlimited/uncapped data, affordability, and plan type—but only Search Console can determine which DataCost page currently owns each query and whether a snippet or content change is safe. No title, new page family, consolidation, or architecture change is justified by Keyword Planner alone.

## Bing search and AI findings

### Bing search performance

| Window | Clicks | Impressions | CTR | Change versus prior period |
| --- | ---: | ---: | ---: | --- |
| Full export, 13 May–11 August | 671 | 47,545 | 1.41% | 91-day context only |
| Latest 28 days, 15 July–11 August | 307 | 22,454 | 1.37% | Clicks +117.7%; impressions +73.9%; CTR +0.28 pp |
| Previous 28 days, 17 June–14 July | 141 | 12,913 | 1.09% | Comparison baseline |

Bing's aggregate momentum is stronger than Google's and CTR is improving, so a broad Bing snippet rewrite is not warranted. The useful Bing signal is page-level concentration.

### Bing page opportunities

| Page | Impressions | Clicks | CTR | Avg. position | Implication |
| --- | ---: | ---: | ---: | ---: | --- |
| `/network/vodacom/` | 6,811 | 49 | 0.72% | 5.88 | Largest Bing page-level CTR opportunity; also weak on Google. Diagnose shared intent before testing a snippet. |
| `/network/mtn/` | 6,419 | 134 | 2.09% | 5.91 | Strong Bing performer despite its Google decline; avoid a cross-engine title change without query-page evidence. |
| `/ussd-codes-south-africa/` | 5,690 | 31 | 0.54% | 6.30 | Broad directory intent produces impressions but weak click conversion on both engines. |
| `/guides/how-to-check-vodacom-airtime-balance/` | 4,015 | 18 | 0.45% | 4.57 | High-rank, low-CTR task page; query wording and direct-answer snippet deserve focused review. |
| `/network/cell-c/` | 3,411 | 69 | 2.02% | 5.29 | Confirms Cell C momentum and useful click conversion. |
| `/guides/how-to-check-mtn-data-balance/` | 2,620 | 10 | 0.38% | 5.78 | Clear task-intent CTR gap; ownership is already defined. |
| `/network/telkom/monthly-data/` | 2,124 | 60 | 2.82% | 5.96 | Important Bing winner; preserve this protected URL and its evidence gate. |
| Homepage | 1,983 | 54 | 2.72% | 6.35 | Healthy Bing CTR relative to operator/directory pages. |
| `/guides/convert-airtime-to-data-south-africa/` | 1,287 | 36 | 2.80% | 3.79 | Strong qualified task page; protect. |
| `/fix/huawei-router-login-192-168-8-1/` | 1,076 | 15 | 1.39% | 6.28 | Confirms the router-login cluster discovered in GSC; improve intent coverage, not indexability. |

The most useful exposed Bing queries are `vodacom data deals` (773 impressions, 0.52% CTR, position 6.30), `cell c data deals` (393, 1.53%, 4.84), `mtn please call me code` (155, 0%, 4.24), and router-login variants around positions 5–7 with CTR between 0% and 1.33%. The report exposes less than half of total clicks at keyword level, so these are candidates for diagnosis rather than sufficient evidence for automatic metadata changes.

### Device mix changes the design priority by engine

- Bing desktop: 31,064 impressions (65.3%), 279 clicks (41.6%), 0.90% CTR.
- Bing mobile: 16,481 impressions (34.7%), 392 clicks (58.4%), 2.38% CTR.

Google remains mobile-led and much larger, so mobile-first remains the overall rule. Bing adds a desktop requirement: comparison tables, filters, and operator hubs should use the extra width well and make scan-heavy decisions easier rather than merely stretching the mobile layout.

### Bing AI citations

Bing reports 69,174 AI citations across 91 days, with an average of 760 citations and 17.9 cited pages per day. In the latest 28 days, citations fell from 34,590 to 22,365 (**-35.3%**) while average cited pages rose from 12.2 to 21.7 (**+77.9%**). Citation frequency became less concentrated and more pages participated.

This is visibility evidence, not a traffic or conversion metric. It supports maintaining clear answer blocks, source-backed claims, stable canonicals, and differentiated pages, but it does not justify creating more pages or rewriting proven search snippets by itself.

### Bing keyword demand reveals a transfer-workflow gap

The two Bing keyword-demand files add a different kind of evidence: potential demand rather than DataCost's current search performance. The airtime file contains 17 tightly related terms and 2,582 total estimated impressions. The larger “data” file contains 145 terms and 52,249 impressions, but only 25 terms and 16,564 impressions (31.7%) are explicitly relevant to DataCost's mobile-operator scope.

| Intent cluster | Selected demand evidence | Existing owner or gap | Recommended treatment |
| --- | --- | --- | --- |
| Operator data deals | MTN 2,463; Telkom 1,956; Vodacom 1,553; Cell C 1,182 | Existing operator pages | Highest-confidence demand confirmation; strengthen inventory and comparison utility on current owners. |
| Unlimited data | Telkom 783; MTN 601; Vodacom 520; generic variants 793 | Existing unlimited-data guide plus operator FAQs | Expand comparison depth and operator links; do not create four near-duplicate pages. |
| Transfer data | Vodacom 631; MTN 386 | Vodacom has a USSD FAQ; no equally clear cross-network workflow | Add distinct task sections to operator USSD pages first; consider a comparative guide only after performance evidence. |
| Transfer airtime | MTN 1,083; Telkom 247 | Codes appear in broader USSD material but lack a clear task owner | Strongest uncovered task intent. Define ownership before creating content; MTN Me2U should remain separate from borrowing airtime. |
| Buy data | Telkom 587; MTN 376; Vodacom 358 | Existing operator buying guides | Reinforce and keep current pages differentiated by operator workflow. |
| Balance checks | Telkom data variants 768; Vodacom data 336; Vodacom airtime variants 459; Cell C airtime 152 | Existing balance guides and operator USSD pages | Confirms current ownership map; improve snippets/sections rather than add pages. |
| Recharge Vodacom airtime | 350 | Broad Vodacom USSD coverage | Add/strengthen an exact recharge section if official workflow evidence is current. |

The largest raw term, `clearing app cache data` (5,791 impressions), is semantically ambiguous and not evidence for a new DataCost page. Likewise, generic education, analytics, privacy, company-name, and employment meanings of “data” were excluded. `inside data vodacom` (875) and Ringas terms require intent/source verification before any action.

The unlabeled trend arrays sum to the reported impression totals but do not provide calendar dates. They can show distribution across observations, not reliable month-over-month timing.

## Technical findings

### Built search surface

| Check | Result |
| --- | ---: |
| Generated HTML files | 248 |
| Indexable routes | 210 |
| Intentional `noindex` routes | 20 |
| Redirect aliases | 18 |
| Configured sitemap URLs | 170 |
| Missing or multiple H1s | 0 |
| Missing or multiple canonicals | 0 |
| Broken internal links | 0 |
| Indexable pages with zero inbound links after implementation | 0 |
| Canonical pages with parsed JSON-LD/breadcrumb output | 230 |

The 40 indexable routes omitted from XML sitemaps are mainly deliberately de-emphasised fix routes. This is an explicit route-catalog policy, not drift. The five current discovered-not-indexed examples are all included in a sitemap, so this policy is not causing that current bucket. Reconsider wider sitemap membership only with crawl/indexation evidence.

Metadata duplicates were confined to intentional redirect aliases pointing at the same destination. Canonical page metadata did not produce a confirmed duplicate defect requiring a change.

### Host and redirect behaviour

- `http://datacost.co.za/` → 301 → `https://datacost.co.za/`
- `https://www.datacost.co.za/` → 301 → `https://datacost.co.za/`
- `https://datacost.co.za/` → 200

This is the correct single-hop canonical-host behaviour.

### Indexing review

Current GSC headline: **201 indexed, 64 not indexed** (last update shown 7 August 2026).

| Reason | Count | Classification and action |
| --- | ---: | --- |
| Not found (404) | 27 | Prior full review found this overwhelmingly legacy FreeHub noise plus an old DataCost alias. Do not create unrelated DataCost pages to satisfy this count. Clean up at the legacy host/property boundary. |
| Excluded by `noindex` | 13 | Utility/facet/planned surfaces. Compare examples against the 20-route intentional noindex catalog before acting; low traffic alone is not a reason to add/remove noindex. |
| Page with redirect | 4 | Expected host variants and route aliases unless a current indexable URL appears. Redirect behaviour is correct in the build. |
| Crawled—not indexed | 15 | Mixed group. Review below; do not treat utilities or aliases as content failures. |
| Discovered—not indexed | 5 | All five are valid, indexable, internally linked, self-canonical, and in the configured sitemap. Monitor after deployment; no code defect confirmed. |

**Five discovered examples reviewed:**

- `/fibre/cheapest-fibre-packages-south-africa/`
- `/fibre/prepaid-fibre-vs-month-to-month-fibre/`
- `/fix/huawei-router-login-192-168-8-1/`
- `/fix/phone-says-no-internet-south-africa/`
- `/fix/telkom-lte-router-no-internet/`

All passed current indexability, canonical, H1, internal-link, and sitemap checks. Their GSC “last crawled” value was unavailable, which is consistent with discovery without crawl.

**Crawled-not-indexed examples reconciled:**

- Current visible main-domain content included `/data-problems/how-to-stop-airtime-disappearing-telkom/`, `/guides/cheapest-5gb-data-south-africa/`, `/methodology/`, `/privacy-policy/`, and `/data-problems/how-to-stop-background-data-usage-android/`. Keep indexable where configured; the first and Android pages now have direct hub links, while methodology/privacy are trust pages rather than traffic targets.
- `/guides/how-to-stop-wasp-vas-charges-south-africa/` is an intentional redirect alias to the canonical WASP guide.
- `/sitemap-trust.xml`, `/sitemap.xml`, and `ads.txt` are crawlable utility resources and are not intended search-result documents.
- Legacy `freehub.datacost.co.za` examples are outside the DataCost content templates.
- The previous full failed-validation review classified 12 current indexable DataCost pages, one alias, three utilities, and six legacy FreeHub URLs. The live count has since fallen to 15, but the mixed-bucket principle remains valid.

### Rendering, mobile, images, and CWV

- Prerendering produces complete HTML, titles, descriptions, canonicals, headings, links, and JSON-LD without requiring client execution for discovery.
- Social preview assets are validated for expected dimensions; image URLs and canonical-host literals pass the SEO validator.
- The principal performance risk is payload size on mobile, especially shared JavaScript and large hubs. Before changing layouts, capture field CWV by template and inspect LCP image/font behaviour, interaction latency, and third-party script cost.
- AdSense output validation passes. Future ad or push changes should be tested against mobile CWV and answer visibility.

## Content findings

### What is working

- Direct South African answers with network-specific codes, APN settings, and purchase paths.
- Clear source/review-date structures on changeable claims.
- Strong comparison intent on Vodacom versus MTN and cheapest-data guides.
- Operator pages functioning as durable hubs.

### Gaps

- Data-deal pages do not yet match competitors' breadth, filtering, term/type segmentation, or MVNO coverage.
- Several query families rank well but earn very low CTR. The likely causes include broad SERP intent, competing rich utilities, and snippets that do not surface the exact task/value quickly enough.
- Troubleshooting coverage is deep but can look repetitive. Each page needs a distinct symptom, diagnostic order, official evidence, and escalation path.
- Some trust pages appear in crawled-not-indexed reporting. That is not a content emergency; their role is trust and policy support rather than traffic acquisition.

No thin-page rewrite was implemented because the current query evidence did not identify a specific unmet intent on a single weak page with enough confidence.

## Internal-link findings

Before implementation, twelve indexable pages had no inbound links in rendered HTML. They were concentrated in airtime loss, data drain, WASP subscription checks, and network-specific “data disappearing” guidance.

The fix uses the existing hub and React `Link` model. Each page is now listed contextually under Data Issues, Airtime Issues, or Subscription Issues on `/guides/airtime-data-problems-south-africa/`. No footer links were added, and no links were removed from performing pages.

The next linking layer should strengthen hub → supporting page → related page → hub relationships within the deal, USSD, APN, fibre, and troubleshooting clusters. Use page-level GSC data first so links reinforce the intended owner rather than create cannibalisation.

## Topical map

| Cluster | Primary hubs/owners | Supporting intent | Growth posture |
| --- | --- | --- | --- |
| Data deals | Homepage, operator pages, cheapest-data and monthly-deal hubs | Size, validity, prepaid/monthly, comparison | Highest priority: richer utility and MVNO breadth. |
| Operators | `/network/mtn/`, `/network/vodacom/`, `/network/cell-c/`, `/network/telkom/` | Bundles, APN, balance, buying | Refresh leaders; protect URL ownership. |
| USSD | All-network hub plus four operator pages | Balance, buy, recharge, subscriptions, callback | Defend with task completeness and official checks. |
| Troubleshooting | `/fix/`, airtime/data problems hub | APN, router, data loss, airtime, WASP | Differentiate symptoms and strengthen contextual links. |
| Fibre | `/fibre/` | Price, FNO/ISP, prepaid, coverage, installation | Monitor current discovered URLs; expand only with evidence. |
| Contracts/retention | Cancellation and end-of-contract guides | Notice, retention offers, switching | Emerging qualified-intent cluster. |
| Trust/methodology | Methodology, editorial, privacy, trust | Source standards and review process | Maintain; do not judge by traffic alone. |

## Competitor findings

1. **DataDeals** advertises 254 deals across five providers and exposes filters for term, type, and provider. Its advantage is inventory depth and transaction-oriented browsing: [DataDeals comparison](https://www.datadeals.co.za/).
2. **South Africa Facts** provides an interactive prepaid comparator covering major operators and MVNOs, normalises multi-month bundles to a 30-day cost, and records a review date. Its advantage is decision utility and MVNO breadth: [mobile data comparator](https://southafricafacts.co.za/mobile-data-comparator/).
3. **USSD Code** builds focused operator and task directories with concise quick lists, last-checked dates, and official-source framing. Its advantage is exact task coverage: [MTN USSD page](https://ussdcode.co.za/mtn/) and [task directory](https://ussdcode.co.za/ussd-codes-by-task/).
4. **Official operators** remain the authority source for changeable codes and bundles. MTN, for example, documents purchase routes and reserves the right to change bundle availability: [MTN bundle terms](https://www.mtn.co.za/home/terms-and-conditions/content/mtn-internet-bundles-terms-and-conditions).

DataCost should not copy competitor page counts. It should combine its current ranking authority with better comparison controls, transparent normalisation, broader provider coverage, and clearer official verification.

## Ranked opportunities

Scores use 1–5, where impact/confidence 5 is highest, effort 5 is largest, and risk 5 is highest.

| Rank | Opportunity | Impact | Effort | Risk | Confidence | Horizon |
| ---: | --- | ---: | ---: | ---: | ---: | --- |
| 1 | Upgrade the core deal comparison experience with filters, validity/term normalisation, and clearly sourced updates | 5 | 5 | 3 | 5 | 90+ days |
| 2 | Diagnose Vodacom and MTN operator pages with full query-page exports; Bing and Google show different outcomes | 5 | 3 | 2 | 5 | 30 days |
| 3 | Run a controlled Vodacom snippet/intent test only after page-query ownership is confirmed | 4 | 2 | 2 | 4 | 30–60 days |
| 4 | Expand MVNO coverage on existing comparison owners before creating new families | 4 | 4 | 2 | 4 | 90 days |
| 5 | Defend operator USSD pages with task-level quick answers and official verification | 4 | 3 | 2 | 4 | 30–90 days |
| 6 | Capture DataCost GA4 landing-page and qualified-outbound-click measurement | 4 | 2 | 1 | 5 | 30 days |
| 7 | Continue contextual link reinforcement in deal, fibre, APN, and router clusters | 3 | 2 | 1 | 5 | 30 days |
| 8 | Profile mobile CWV by template and reduce shared JavaScript/third-party cost | 4 | 4 | 2 | 3 | 90 days |
| 9 | Review the 40 indexable but de-emphasised sitemap routes against actual crawl/indexation data | 2 | 2 | 2 | 3 | 90 days |
| 10 | Define ownership and test exact transfer-airtime/data sections before considering a comparative guide | 3 | 2 | 1 | 4 | 30–90 days |

## Top ten actions

1. Obtain full latest/previous 28-day Google and Bing query-by-page exports and isolate pages in positions 4–15 with below-peer CTR.
2. Diagnose the cross-engine operator split before changing titles: Vodacom is a shared CTR gap, while MTN performs strongly on Bing but declined on Google.
3. Build a product specification for a mobile-first comparison layer: provider, prepaid/monthly/contract, anytime data, night data, validity, effective 30-day cost, and source date.
4. Add MVNO rows to existing comparison owners with official or directly verifiable sources.
5. Review Cell C deals after another 28-day window; test a snippet change only if ownership, impressions, and below-peer CTR persist.
6. Add GA4/DataCost property access and define qualified organic outcomes: engaged visit, comparator use, operator click, alert signup, or saved code.
7. Keep the new orphan/link-graph validator in the build gate.
8. Monitor the five discovered-not-indexed URLs after deployment; inspect rather than rewrite if Google still has not crawled them.
9. Capture template-level mobile field CWV and prioritise the largest traffic templates.
10. Add source-backed MTN/Telkom airtime-transfer and MTN/Vodacom data-transfer sections to their intended USSD owners before evaluating a new comparative guide.

## Implemented changes

- Added contextual hub links to all twelve previously orphaned indexable pages.
- Preserved every public URL, trailing-slash rule, canonical, title, description, robots directive, redirect, schema definition, and sitemap rule.
- Expanded `scripts/check-seo-output.ts` so production output now fails on:
  - an indexable page without exactly one H1;
  - an indexable page without its exact self-canonical;
  - a broken internal link;
  - an indexable page with zero internal inbound links.
- Added focused SEO growth regression tests covering the twelve links plus the hub's canonical, indexability, Article, FAQ, and breadcrumb contracts.
- Added an executed analysis notebook containing the bounded Search Console calculations and guardrails.
- Refreshed the stale WP1 search-output baseline only after comparing a clean `HEAD` snapshot with the audit snapshot. The comparison found exactly three public-output differences, all expected on `/guides/airtime-data-problems-south-africa/`: visible text, internal-link hash, and internal-link list.
- Updated stale browser assertions so expected review dates, verified bundle rows, and redirect-alias classifications match the repository's current source-backed output; no public content was changed for those tests.
- Did not deploy, submit sitemaps, request indexing, or mutate Google properties.

## Validation results

- TypeScript type checking: passed.
- Production build: passed; 248 generated HTML files and five sitemap files.
- SEO output and AdSense validators: passed.
- Data-problem, fibre-price, and monthly-deal validators: passed.
- Unit tests: 127 passed.
- WP1 contract suite: passed.
- WP1 search regression: passed after a reviewed baseline refresh. A clean `HEAD`-versus-audit comparison confirmed that all 248 routes, titles, canonicals, robots rules, structured-data counts, redirects, and 170 sitemap memberships were identical; only the intended visible/internal-link output changed on `/guides/airtime-data-problems-south-africa/`.
- Full Playwright suite: passed after bringing three stale date assertions forward to the already-published August evidence dates.
- Final built crawl: no broken internal links, no indexable orphans, one H1 and self-canonical per indexable page, and no unexpected route/indexability changes.

## 30-day plan

- Secure full GSC query-page exports and DataCost GA4 access.
- Diagnose homepage, Vodacom, and MTN outcomes by query, landing page, device, country, and search engine.
- Monitor the twelve newly linked pages and five discovered-not-indexed examples.
- Refresh only stale operator facts/offers supported by primary sources.
- Specify qualified organic outcomes and baseline them in GA4.
- Capture mobile CWV for the homepage, operator pages, USSD hub, guides hub, fix hub, and deal-size pages.

## 90-day plan

- Release a measured comparison-utility improvement on existing deal URLs.
- Add verified MVNO coverage and normalised validity/value fields.
- Improve operator USSD quick-answer coverage without creating duplicate owners.
- Run one controlled snippet experiment at a time on high-impression pages meeting the agreed criteria.
- Review sitemap de-emphasis and crawl-depth policy against new indexation evidence.
- Reduce mobile payload/third-party costs on the highest-impression templates.

## Longer-term plan

- Build a maintained South African mobile-plan data layer spanning operators and MVNOs.
- Create new content only from demonstrated uncovered demand, with a named owner page and differentiation standard.
- Connect organic landing pages to qualified outcomes and commercial value, not clicks alone.
- Establish quarterly source-review cycles for prices, bundle validity, USSD codes, contracts, and fibre claims.
- Treat emerging fibre and contract clusters as experiments until they show repeatable qualified demand.

## What should DataCost do first, second, and third to double qualified organic traffic?

**First:** turn the existing data-deals visibility into a genuinely better decision product—broader provider coverage, source-backed freshness, filters, and normalised value—on the URLs that already rank.

**Second:** recover and defend the high-impression operator and USSD pages through query-level diagnosis, official verification, clearer task answers, and disciplined internal ownership, changing snippets only when a full 28-day query-page export proves the case.

**Third:** measure qualified outcomes in a confirmed DataCost GA4 property, then use those outcomes—not raw traffic—to choose the next comparison, troubleshooting, fibre, MVNO, and contract investments.
