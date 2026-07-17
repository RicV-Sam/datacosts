# DataCost Facebook Organic Growth Plan

Prepared: 17 July 2026  
Status: implementation brief for review  
Scope: repository analysis, channel design and implementation planning only

## Executive recommendation

Launch one official Facebook Page for DataCost before considering a Group. Position it as an independent South African mobile-data and connectivity help resource, not as a feed of price links. Start with four useful posts per week: two answer-first or native tips, one discussion or poll, and one carefully selected website link. Use confirmed evergreen DataCost pages for the first month and place pricing, bundle and promotion posts behind a same-day verification step.

Before the Page is made public, approve a real square identity mark and a properly cropped cover image. The files currently named `public/logo.png` and `public/og-image.jpg` are both 1280 x 6366 full-page screenshots, so neither is suitable as a Facebook profile image or share card. The website already emits canonical and Open Graph metadata for most content templates, but all 221 Open Graph-enabled pages in the current build use the same unsuitable screenshot. The repository has no Facebook profile configuration, Facebook footer link, `sameAs` profile reference, social publishing ledger, or Facebook-specific event tracking.

The first implementation package after approval should therefore be small and non-public: approve the Page identity, handle shortlist, About copy, moderation rules, profile image, cover image and setup checklist. Do not combine this with Page creation, website deployment, GA4 changes or the whole launch calendar.

## Evidence basis and assumptions

### Repository evidence inspected

The findings in this brief are based on the checked-in repository and its existing generated `dist` snapshot, including:

- `README.md`, `package.json`, `vite.config.ts`, `index.html` and `.github/workflows/deploy.yml`
- `src/App.tsx`, `src/config/routeCatalog.ts`, `src/config/dataProblemPublishing.ts` and `src/config/redirectAliases.ts`
- content under `src/data/`, including guides, comparisons, networks, bundles, USSD codes, fixes, fibre, promotions and checked-in data-problem JSON
- metadata and schema implementations in page components, `src/seo/siteConstants.ts` and `src/utils/structuredData.ts`
- analytics code in `index.html` and `src/utils/tracking.ts`
- `docs/website-blueprint.md`, `docs/seo-gsc-baseline.md`, `docs/seo-query-ownership.md`, the DataCost Answers workflow and the three existing LinkedIn drafts
- the current built HTML in `dist`, used only as a coverage snapshot; it was not rebuilt for this analysis

Repository counts at the time of review:

| Asset | Confirmed count | Main source |
| --- | ---: | --- |
| Indexable routes | 205 | `src/config/routeCatalog.ts` |
| Noindex routes | 24 | `src/config/routeCatalog.ts` |
| General data-driven guides | 23 | `src/data/guides.ts` |
| Comparison guide definitions | 11 | `src/data/comparisonGuides.ts` |
| Network hubs | 5 | `src/data/networks.ts` |
| Mobile bundle records | 46 | `src/data.ts` |
| USSD network datasets / codes | 4 / 20 | `src/data/ussdCodes.ts` |
| Fix pages | 85 | `src/data/fixes.ts` |
| Published data-problem pages | 23 | `src/config/dataProblemPublishing.ts` and checked-in JSON |
| Fibre pages | 22 | `src/data/fibre/fibrePages.ts` |
| Verified promotions | 0 | `src/data/promos.ts` |

### Assumptions and execution-day checks

- No Facebook Page URL, handle or account is recorded in the repository. Handle availability must be checked during Page setup; none of the options in this plan is claimed as available.
- The repository proves that LinkedIn post drafts exist, but it does not prove that a LinkedIn Company Page or any other social profile is live. Confirm externally before describing LinkedIn as an active channel.
- Facebook category names, call-to-action labels, image crops and Page settings can change. The setup operator must verify the current Meta interface before publishing. The recommended choices below describe the intended outcome, with fallbacks where appropriate.
- The GSC notes identify high-impression query clusters and give aggregate performance, but the repository does not contain the underlying page-level click and impression export. Launch ordering therefore uses documented query opportunity plus content usefulness and freshness, not invented page-level traffic numbers.
- Posting times are hypotheses in South African Standard Time (SAST, UTC+2). They should be replaced by Page-specific audience data after four weeks.
- No live Facebook Page, Meta account or website was accessed for this planning task.

## 1. Current state

### Positioning

DataCost is a static-first React consumer information site focused on South African mobile-data prices, USSD guidance, prepaid troubleshooting, network comparisons, router SIM use, fibre and home internet. The repository consistently describes organic search and trust as the primary growth strategy. Monetisation is secondary to useful, independent editorial content.

The Facebook positioning should retain that trust promise:

> Practical, independent help for South Africans trying to buy, check, save or troubleshoot mobile data and connectivity.

DataCost must not present itself as a mobile network, authorised support desk or generic deals page.

### Site architecture and build process

- React 19, React Router and TypeScript, built with Vite.
- Tailwind CSS for presentation and `react-helmet-async` for page metadata.
- A client-side application whose important routes are prerendered with Puppeteer into static HTML.
- `src/config/routeCatalog.ts` is the route source of truth for indexability, prerendering and sitemap generation.
- The build checks data-problem publishing, fibre-price freshness, sitemap generation, the Vite/prerender output, SEO output and AdSense output.
- Pull requests run lint and build checks. Pushes to `main` deploy to GitHub Pages and then attempt Bing and IndexNow submission.
- Canonical URLs are normalised to `https://datacost.co.za/` with trailing slashes.

### Routes and content sources

| Content family | Storage and rendering | Facebook use |
| --- | --- | --- |
| Bundle and price data | `src/data.ts`, bundle comparison pages and network facets | Use only after a price/source check; strong for comparison graphics |
| General guides | `src/data/guides.ts` rendered by `src/components/GuidePage.tsx` | Main evergreen launch supply |
| Comparison guides | `src/data/comparisonGuides.ts` and dedicated comparison pages | Useful for decision posts; price claims need refresh |
| Network hubs | `src/data/networks.ts`, `NetworkPage.tsx` and `NetworkPageTemplate.tsx` | Network-specific explainers and comparison prompts |
| USSD content | `src/data/ussd.ts`, `src/data/ussdCodes.ts` and USSD pages | High-utility save/share posts; codes must be rechecked |
| Fix content | `src/data/fixes.ts` with 20 mobile-data, 15 USSD, 10 LTE-router and 40 unrelated utility pages | Use telecom subsets only for Facebook launch |
| Data-problem SEO pages | 23 checked-in JSON files under `src/data/seo-pages/data-problems/`, controlled by the publishing manifest | Answer-first troubleshooting posts; each has review fields and verification flags |
| Fibre | `src/data/fibre/` definitions, companies, sources and price snapshot | Strong home-internet pillar; price pages require freshness checks |
| Promotions | `src/data/promos.ts` | Watchlist structure exists, but there are zero verified promotions; do not publish promo claims yet |
| DataCost Answers | Reusable React intro/CTA components, selected guide pages, workflow doc and LinkedIn drafts | Directly reusable Facebook series; not a separate CMS or route collection |

### Existing assets suitable for Facebook

- Broad all-network USSD and balance guidance.
- Operator-specific MTN, Vodacom, Telkom and Cell C code pages.
- Data-saving, disappearing data/airtime and WASP troubleshooting.
- Buying-data and bank-app guides.
- Router SIM, stolen phone and airtime-versus-data DataCost Answers.
- Fibre coverage, installation, terminology and fibre-versus-LTE explainers.
- Network and bundle comparisons, subject to price verification.
- A documented DataCost Answers workflow that already turns real questions into evergreen pages and direct replies.
- Three existing LinkedIn drafts that can be adapted into Facebook-native launch posts.
- A freshness model in `src/seo/contentDates.ts` and review dates/verification flags in data-problem JSON.

The `docs/seo-query-ownership.md` file identifies high-impression clusters around MTN balance, MTN data balance, Cell C balance, Vodacom balance, full Vodacom USSD lists, Telkom USSD codes, all-network codes, all-network data-balance comparison, MTN Please Call Me and airtime advance. These clusters deserve early Facebook testing, but the note does not include page-level performance values.

### Existing social channels

- Three `DataCost Answers` LinkedIn drafts and a workflow that specifies Company Page posts exist in `docs/`.
- No Reddit or broader social-channel operating document exists in the repository.
- No Facebook, Instagram, X, TikTok, YouTube or social-profile URL is configured in site code or documentation.
- A repository search found no `facebook.com`, `fb:app_id`, `sameAs` or central social-profile configuration.
- External verification is required before calling any existing channel live.

### Metadata and social sharing state

- The homepage, guide, comparison, network, data-problem, fix and fibre templates generally emit canonical, Open Graph and Twitter-card metadata.
- The current `dist` snapshot has 241 built `index.html` files, all with canonical tags. It has 221 pages with `og:title` and 220 with `twitter:card`.
- Pages without Open Graph coverage are mostly legal, trust/support and redirect pages such as About, Contact, Cookie Policy, Editorial Policy, Methodology, Privacy Policy, Sitemap and Terms. This is not a launch blocker for the selected content pages, but it shows metadata is not implemented through one reusable component.
- All current Open Graph-enabled built pages use `https://datacost.co.za/og-image.jpg`; there are no page-specific share images.
- `public/og-image.jpg` and `public/logo.png` are both 1280 x 6366 full-page screenshots. They are unsuitable for 1.91:1 share cards and square profile/logo use.
- The SEO checker validates canonical ownership of `og:url`, `og:image` and `twitter:image`, but does not require Open Graph tags on every indexable page or validate image dimensions, aspect ratio, file purpose or visual legibility.
- Organization objects exist in JSON-LD, but no central Organization entity exposes social profiles through `sameAs`.

### Analytics and attribution state

- GA4 measurement ID `G-2HX8HCQR13` is loaded in `index.html` outside local/prerender contexts.
- `src/utils/tracking.ts` provides a generic `trackEvent()` wrapper and one implemented custom event, `outbound_click`, for selected clicks to mobile networks from the calculator or modal.
- Standard GA4 acquisition can receive referrer and UTM data, so tagged inbound Facebook sessions can be measured without a new incoming-click event.
- No Facebook-specific UTM convention exists.
- No site-to-Facebook profile link exists, so no outbound social-profile event is currently emitted.
- There is no tracked contact-email click, DataCost Answers question click, alert prompt click or active newsletter conversion. The email-alert form explicitly says it is not an active subscription.
- The Privacy and Cookie pages already describe analytics, referring pages and interaction events in broad terms. Any new embedded social scripts, Meta Pixel or data-sharing technology would require a separate privacy and consent review. This plan does not recommend Meta Pixel for the organic launch.

### Gaps preventing effective Facebook distribution

1. No Facebook Page or approved Page specification.
2. No usable profile, cover or Open Graph share assets.
3. One generic and badly shaped image is used for all share cards.
4. No social profile configuration, footer link or Organization `sameAs`.
5. No publishing ledger, post template, moderation playbook or owner/reviewer workflow.
6. No Facebook UTM convention or post-level campaign record.
7. No tracked site-to-Facebook click and no measurable question-submission click.
8. Price and promotion content has high freshness risk; the verified promotions list is empty.
9. Page-level GSC data is not stored in the repository, so source-page prioritisation cannot be quantified from checked-in evidence.
10. DataCost Answers is reusable but currently documented for LinkedIn rather than a multi-channel workflow.

## 2. Facebook channel strategy

### Page identity specification

| Field | Recommendation | Notes |
| --- | --- | --- |
| Page name | **DataCost.co.za – Mobile Data & Connectivity Help** | If Meta rejects punctuation or length, use **DataCost.co.za** and carry the descriptor in the category and bio. |
| Preferred username | `@datacostza` | First choice only; availability is unconfirmed. |
| Fallback usernames | `@datacostcoza`, `@datacostsouthafrica` | Avoid underscores or a network name unless all cleaner options are unavailable. |
| Category | **Website** | Use **Product/service** or the nearest current consumer-information category if Website is unavailable. Verify in the live setup UI. |
| Short description | **Independent South African mobile data, USSD, fibre and connectivity guides. Compare costs, solve problems and use your data better.** | Keep the independence signal visible. |
| Website | `https://datacost.co.za/` | Use the clean canonical URL in the About field. Use a tagged URL in the primary CTA if supported. |
| Contact email | `hello@datacost.co.za` | Already published on the site. Do not add a phone number unless a staffed support number exists. |
| Primary CTA | **Learn More** to the website | Fallback: the nearest current “Visit website” action. Tag this destination as `page_profile / cta_button`. |

### Full About description

> DataCost.co.za helps South Africans understand mobile data prices, check balances, find USSD codes, buy bundles, troubleshoot airtime and connectivity problems, compare networks, and make sense of fibre and home internet. We are an independent consumer information site and are not affiliated with MTN, Vodacom, Telkom, Cell C, Rain or any fibre provider. Prices, promotions and codes can change, so time-sensitive information is checked and official sources take priority. For account-specific support, contact your network. Visit https://datacost.co.za/ or send editorial corrections and general questions to hello@datacost.co.za.

### Profile image requirements

- Create a true square master at 1080 x 1080 pixels, exported as PNG.
- Use a simple DataCost mark or clear `DC`/DataCost wordmark with high contrast.
- Keep essential artwork inside the central 70% because Facebook displays profile images as circles in many placements.
- Do not use mobile-network logos or colours in a way that implies affiliation.
- Verify legibility at 40 x 40 pixels and on light and dark interfaces.
- Retain an editable master and record the final exported file and approval date.

### Cover image requirements

- Create a high-resolution 1.91:1-ish cover master, provisionally 1640 x 624 pixels, and verify the crop in the current Page preview before publishing.
- Keep the logo, promise and any text inside the centre safe area; allow for different desktop/mobile crops and the profile image overlap.
- Recommended message: **“Mobile data, USSD, fibre and connectivity help for South Africa.”**
- Avoid detailed price tables, promotions, operator logos and small text.
- Export a compressed JPG or PNG and test on mobile and desktop.

### Recommended launch settings

- Keep the Page unpublished or minimally visible until identity, About copy, website link, CTA, moderation rules and at least three launch posts are ready.
- Require two-factor authentication for every person with Page access.
- Grant the minimum necessary access: one primary owner and one backup; use task-based access for publishers where available.
- Enable messaging only if the owner can check it consistently. Use an automatic greeting that explains DataCost cannot access accounts, reverse charges or act for a network.
- Enable comment moderation and a profanity/spam filter. Prepare a keyword list for common scam phrases, unsolicited investment/loan offers and requests to move users to WhatsApp.
- Add a pinned welcome post explaining DataCost’s purpose, independence and privacy warning.
- Do not upload contacts, add Meta Pixel, boost posts or connect third-party automation during the organic launch.
- Complete the Page’s transparency, website and contact fields accurately. Do not imply an office address or opening hours unless they are real and support is staffed.

### Page versus Group

Launch the Page only. A Group would create moderation and support expectations before there is evidence of a recurring community need. Reconsider a Group after 90 days only if the Page has:

- recurring useful discussions rather than isolated support complaints;
- enough weekly questions to sustain conversation;
- a named moderator and response standard;
- clear safety rules for personal information and scams;
- evidence that a Group would produce unique help rather than split a small audience.

## 3. Audience

| Audience | Problem to solve | Useful DataCost response |
| --- | --- | --- |
| Prepaid mobile users | Make airtime and data last; avoid out-of-bundle loss; find codes and affordable bundles | USSD, balance, saving and airtime-loss guidance |
| Contract customers | Understand allocation, out-of-bundle settings, SIM-only value and unexpected usage | Contract/prepaid comparisons and usage troubleshooting |
| Router and LTE users | Check/recharge a SIM in a router, fix connected-without-internet problems and choose suitable data | Router SIM Answers, LTE fixes and bundle-size guidance |
| Fibre shoppers | Check coverage, distinguish FNO from ISP, compare true costs and understand installation | Fibre explainers and comparison prompts |
| Balance/recharge users | Find the correct code or app flow quickly, including when the app is unavailable | Network-specific and all-network USSD/balance pages |
| Network-value comparers | Compare price, validity, coverage needs and bundle type without marketing hype | Methodology-led comparisons with freshness labels |
| Users with disappearing data or airtime | Identify background use, WASP/VAS charges, out-of-bundle use or billing evidence | Answer-first troubleshooting and escalation evidence |
| Promotion and bundle seekers | Find current deals without falling for expired or SIM-specific claims | Verified-only promotions with date, eligibility and source warnings |
| Security-affected users | Act quickly after a stolen phone or suspected SIM/account risk | Prioritised safety checklist and official support routing |
| Question askers | Get a general answer without sharing private account data | DataCost Answers and the question email route |

## 4. Content pillars

Recommended steady state: four feed posts per week. Frequencies below are targets per four-week cycle, not additional posts on top of that rhythm.

| Pillar | Purpose and source pages | Recommended format and frequency | Link and CTA | Main risk/control |
| --- | --- | --- | --- | --- |
| Quick mobile data tips | Extract one action from saving guides and data-problem pages | Native text or single-card graphic, 3-4/month | Link only when the page adds depth. CTA: “Save this for later” or “See the full checklist.” | Oversimplification; keep the tip accurate without forcing a click. |
| USSD codes | All-network and operator-specific USSD pages | Saveable card/carousel, 2-3/month | Link for the complete/current list. CTA: “Which network should we check next?” | Codes change or vary by tariff; recheck official sources and date the card. |
| Network-specific help | Network hubs, buying, balance and data-problem pages | Answer-first post or short step list, 2/month | Usually link. CTA: “Follow the steps and keep the result message.” | Appearing affiliated or promising a universal menu; repeat independence and variation caveat. |
| Data balance and recharge | Balance guides, buying-data guides, bank-app guide | Three-step card or short native checklist, 2/month | Link for all methods. CTA: “Check your balance before buying again.” | Wrong/outdated menu path; same-day verification for codes. |
| Router SIM questions | Router SIM Answer and LTE-router fixes | Scenario post, diagram or checklist, 1/month | Link to detailed guide. CTA: “Set this up while you can still read the router SMS inbox.” | Device/firmware variation; explain fallback paths. |
| Fibre and home internet | Fibre hub, coverage, FNO/ISP, installation, fibre-vs-LTE | Explainer graphic, poll or decision checklist, 2/month | Link for full context. CTA: “Check coverage before comparing price.” | Address-level coverage and pricing change; never promise availability. |
| Data-saving advice | Saving tips and background-data pages | Native checklist or one-setting walkthrough, 2/month | Alternate link and no-link formats. CTA: “Which app uses the most data on your phone?” | Device UI differs; label Android/Samsung/iPhone scope. |
| Mobile data problems | Fix hub, disappearing-data and no-internet pages | Symptom-first steps, 2/month | Link after giving a useful first action. CTA: “Tell us the symptom, not your number.” | Comments become support tickets; route account-specific cases to networks. |
| Network comparisons | Comparison guides, network hubs and bundle records | Poll or criteria-led graphic, 1/month | Link only after data refresh. CTA: “What matters more where you live: price, coverage or validity?” | Misleading rankings; show methodology/date and avoid universal “best” claims. |
| Promotions and bundle updates | `verifiedPromos` and bundle sources | Dated offer card only when verified, maximum 1/month initially | Direct link if the DataCost page adds comparison value. CTA: “Check eligibility before paying.” | Currently zero verified promos; do not run this pillar until records are verified. |
| DataCost Answers | Existing Answer pages and future real questions | Numbered series with native summary, 2/month | Link to full answer and question route. CTA: “Send a general question without account details.” | Privacy and thin-content risk; anonymise and improve existing pages first. |
| Polls and audience questions | Derived from recurring content decisions | Native poll/question, 2-3/month | Usually no link. CTA: one precise question. | Low-value engagement bait; every poll must inform editorial work. |

### Recommended post mix

- 35% native tips/checklists that are useful without leaving Facebook.
- 30% link posts to evergreen guides.
- 20% questions, polls and comment-led research.
- 15% DataCost Answers, comparisons or verified time-sensitive updates.

This mix avoids the low-reach pattern of publishing only links while still creating attributable website traffic.

## 5. Launch content pack

All URLs below were confirmed in `getIndexableRoutes()` on 17 July 2026. “Freshness” describes the check required before posting; it is not a claim that the underlying operator information is permanently correct.

| Order | Confirmed source page | Facebook angle and suggested opening | Summary | CTA / visual | Freshness requirement |
| ---: | --- | --- | --- | --- | --- |
| 1 | `https://datacost.co.za/ussd-codes-south-africa/` | **“Save these South African USSD shortcuts before you need them.”** | Introduce the all-network code directory and ask which code people use most. | “Open the full directory.” Branded saveable code card recommended. | Recheck the featured codes against current operator guidance on publishing day. |
| 2 | `https://datacost.co.za/guides/how-to-check-data-balance/` | **“Not sure where your data went? Start by checking the right balance.”** | Compare MTN, Vodacom, Telkom and Cell C balance routes and different bundle buckets. | “See every network method.” Four-network checklist graphic. | Last-modified record is 16 July 2026, but verify codes again. |
| 3 | `https://datacost.co.za/guides/airtime-data-saving-tips-south-africa/` | **“One setting can quietly use data every day: background app activity.”** | Give three native saving actions, then offer the full 15-tip list. | “Save the checklist.” Single tip graphic or carousel. | Review device instructions; page date is older than the other launch guides. |
| 4 | `https://datacost.co.za/guides/why-does-my-data-finish-so-fast-south-africa/` | **“If your data finishes too fast, check these five things before buying again.”** | Background apps, video quality, updates, hotspots and bundle mismatch. | “Use the full diagnosis.” Five-item graphic. | Confirm no price claims are used in the post. |
| 5 | `https://datacost.co.za/mtn-ussd-codes/` | **“MTN balance, recharge and self-service codes in one place.”** | Address the documented high-impression MTN balance cluster. | “Open the MTN list.” MTN-labelled but DataCost-branded card. | Verify every displayed code; do not use MTN trade dress as DataCost identity. |
| 6 | `https://datacost.co.za/vodacom-ussd-codes/` | **“Looking for the full Vodacom USSD list?”** | Explain that menus can change and link to the maintained directory. | “Check the current list.” Code card recommended. | Verify codes and menu wording on the day. |
| 7 | `https://datacost.co.za/telkom-ussd-codes/` | **“Save the Telkom balance and self-service shortcuts you actually use.”** | Serve the documented Telkom USSD query cluster. | “Open the Telkom guide.” Saveable graphic. | Verify codes and account-type caveats. |
| 8 | `https://datacost.co.za/cell-c-ussd-codes/` | **“Cell C balance check: keep the quickest route handy.”** | Lead with balance intent, then point to the broader list. | “See all Cell C codes.” Saveable graphic. | Verify codes; repository notes identify Cell C balance as a high-impression cluster. |
| 9 | `https://datacost.co.za/guides/why-is-my-airtime-disappearing-south-africa/` | **“Airtime disappearing? It may be data, a subscription, or something else.”** | Separate likely causes and the evidence to capture before support escalation. | “Work through the checks.” Decision-tree graphic recommended. | Verify current network cancellation/support paths before quoting them. |
| 10 | `https://datacost.co.za/guides/stop-wasp-subscriptions-south-africa/` | **“Recurring mobile charges need evidence, not guesswork.”** | Explain how to check, cancel and keep confirmation messages. | “Use the full WASP/VAS checklist.” Simple steps card. | Recheck operator paths and terminology; avoid claiming DataCost can cancel services. |
| 11 | `https://datacost.co.za/guides/convert-airtime-to-data-south-africa/` | **“Before browsing with fresh airtime, buy the data bundle first.”** | Explain why converting/buying a bundle can prevent raw-airtime use. | “See every network method.” Four-network steps graphic. | Verify USSD/app paths and do not promise a personalised option. |
| 12 | `https://datacost.co.za/guides/check-router-sim-data-balance-and-recharge/` | **“How do you top up a SIM inside a router at a remote site?”** | Adapt DataCost Answers #1: link the SIM to the provider account while OTP/SMS access is available. | “Read DataCost Answers #1.” Router/SIM diagram recommended. | Check network app/account routes; note router and firmware variation. |
| 13 | `https://datacost.co.za/guides/stolen-phone-south-africa/` | **“A stolen phone can become a banking and SIM-swap problem. Do these actions first.”** | Adapt DataCost Answers #2 with safety, bank, lock, SIM/IMEI and account priorities. | “Save the urgent checklist.” High-contrast checklist graphic. | Verify official Apple/Google/network terminology; avoid delaying emergency/bank action. |
| 14 | `https://datacost.co.za/guides/airtime-or-data-south-africa/` | **“Should you buy airtime or data? It depends on what you need next.”** | Adapt DataCost Answers #3: data for apps, voice for calls, mixed bundle for mixed use, then protect out-of-bundle spend. | “Use the decision guide.” Split decision graphic. | Confirm no bundle-price claim is added. |
| 15 | `https://datacost.co.za/fibre/how-to-check-fibre-coverage-south-africa/` | **“Check coverage before you compare fibre prices.”** | Explain why address-level availability and the FNO/ISP distinction matter. | “Follow the coverage checklist.” Address-to-FNO-to-ISP diagram. | Never ask users to post a full home address in comments. |
| 16 | `https://datacost.co.za/fibre/fibre-vs-lte-south-africa/` | **“Fibre or LTE/5G: which fits your home?”** | Compare installation, mobility, latency, coverage and backup needs rather than declaring one universal winner. | “Compare the trade-offs.” Side-by-side graphic. | Check any price examples and coverage wording before use. |
| 17 | `https://datacost.co.za/fix/mobile-data-on-but-not-working/` | **“Your phone shows mobile data, but nothing loads. Try this order.”** | Give a short sequence: signal/balance, flight mode/restart, data settings and support evidence. | “Open the full fix.” Numbered troubleshooting card. | Keep steps generic across devices; verify any operator-specific details. |
| 18 | `https://datacost.co.za/data-problems/how-to-stop-background-data-usage-android/` | **“Android can use data while the screen is off. Here is where to look.”** | Give a device-side action and ask which app appears at the top of data usage. | “Use the Android walkthrough.” Phone-settings graphic. | Review date/verification flags before publishing; UI differs by Android version. |

### Content deliberately excluded from the first launch pack

- `/promos/`: there are zero verified promotion records.
- “Cheapest” and current-price pages: strong later opportunities, but they require a same-day bundle/source check and suitable dated graphics.
- Fibre package price pages: use only after `npm run check:fibre-prices` is clean and the individual source rows are checked.
- Noindex routes: do not use as campaign landing pages.

## 6. Thirty-day publishing plan

### Rhythm and timing hypothesis

- Launch week: five posts to make the Page immediately useful.
- Weeks two to four: four posts per week, normally Monday, Tuesday, Thursday and Saturday.
- Primary test windows: 07:30-08:30, 12:15-13:15 and 18:30-20:00 SAST.
- Do not post multiple feed items in one day during the first month.
- Review Page insights weekly and change timing only after enough posts exist to compare.

| Day | SAST | Activity / content pillar | Objective | Destination | Primary outcome |
| ---: | --- | --- | --- | --- | --- |
| 1 | 19:00 | Pinned welcome: what DataCost is, independence, privacy warning and what followers can ask | Establish trust | Homepage in CTA only | Reach / profile visits |
| 2 | 07:45 | All-network USSD launch card | Immediate utility | `/ussd-codes-south-africa/` | Shares / saves / clicks |
| 3 | - | Reply to comments; record questions and moderation issues | Learn | None | Quality responses |
| 4 | 12:30 | Data-balance comparison | Search-to-social bridge | `/guides/how-to-check-data-balance/` | Clicks / saves |
| 5 | - | Invite only genuine existing contacts who would find the Page useful; no bulk invitations | Seed relevant audience | None | Relevant follows |
| 6 | 09:30 | Poll: “What uses your data fastest: video, social apps, hotspot or updates?” | Audience research | None | Comments / votes |
| 7 | 18:45 | Five checks when data finishes fast | Practical help | `/guides/why-does-my-data-finish-so-fast-south-africa/` | Shares / clicks |
| 8 | - | Week-one scorecard and freshness review | Measure | Ledger | Decisions |
| 9 | 07:45 | One native data-saving tip: background activity | Reach without link dependence | Optional link in first comment only after testing | Saves / comments |
| 10 | - | Respond and tag reusable questions | Research | None | Content opportunities |
| 11 | 19:00 | MTN USSD/balance post | Network help | `/mtn-ussd-codes/` | Clicks / shares |
| 12 | - | No feed post; check link attribution and GA4 landing pages | QA | GA4 / ledger | Data quality |
| 13 | 09:30 | DataCost Answers #1: remote router SIM | Authority / utility | `/guides/check-router-sim-data-balance-and-recharge/` | Clicks / comments |
| 14 | - | Comment follow-up: ask router users which network/device setup they manage, without account details | Research | None | Comments |
| 15 | 12:30 | Vodacom USSD list | Network help | `/vodacom-ussd-codes/` | Clicks / shares |
| 16 | - | Mid-month scorecard; compare native versus link posts | Optimise | Ledger | Decisions |
| 17 | 07:45 | Airtime disappearing decision-tree post | Problem solving | `/guides/why-is-my-airtime-disappearing-south-africa/` | Shares / clicks |
| 18 | - | Moderate and convert recurring questions into backlog candidates | Workflow | None | Content opportunities |
| 19 | 19:00 | Fibre coverage question: “Do you know your FNO and ISP?” | Education | `/fibre/how-to-check-fibre-coverage-south-africa/` | Comments / clicks |
| 20 | - | No feed post | - | - | - |
| 21 | 09:30 | Cell C balance/USSD saveable card | Network help | `/cell-c-ussd-codes/` | Shares / clicks |
| 22 | - | Review first three weeks; refresh next week’s pages | Quality control | Ledger | Accuracy |
| 23 | 12:30 | DataCost Answers #2: stolen phone checklist | High-value safety help | `/guides/stolen-phone-south-africa/` | Saves / shares / clicks |
| 24 | - | Respond with official support routes where account action is required | Trust | None | Helpful replies |
| 25 | 19:00 | Telkom USSD guide | Network help | `/telkom-ussd-codes/` | Shares / clicks |
| 26 | - | No feed post | - | - | - |
| 27 | 09:30 | Poll: fibre versus LTE/5G, with criteria in the post | Audience research | Optional `/fibre/fibre-vs-lte-south-africa/` after the native prompt | Votes / comments |
| 28 | - | Capture poll reasons as editorial insights, not just vote totals | Research | Ledger | Content ideas |
| 29 | 07:45 | Android background-data walkthrough | Device help | `/data-problems/how-to-stop-background-data-usage-android/` | Saves / clicks |
| 30 | 16:00 | Month-one review post: useful lessons, top guide and question invitation | Retention / feedback | Best-performing landing page and `/contact/#questions` | Returning users / questions |

The remaining launch-pack pages form the next-month queue. Do not force all 18 links into 30 days if native posts are producing better reach and useful comments.

## 7. Website implementation requirements

### Required before launch

| Requirement | Repository implication | Acceptance test |
| --- | --- | --- |
| Replace the default Open Graph screenshot | Create a real 1200 x 630 `og-image` with logo, short promise and safe margins; update or replace `public/og-image.jpg` | Facebook-compatible aspect ratio, readable at mobile preview size, compressed appropriately, no current price claim |
| Create a real square logo/profile asset | Do not reuse the 1280 x 6366 screenshot in `public/logo.png` | Square, transparent or solid background, legible at 40 px, correct Organization logo URL |
| Verify launch-page metadata | Check the 18 source pages in built HTML for title, description, canonical, `og:type`, `og:title`, `og:description`, `og:url` and `og:image` | One canonical; clean production URLs; image loads; selected pages all covered |
| Define UTM rules and a ledger | Documentation/operational change; no production code needed | Every launch link has a unique `utm_content` and matching ledger row |
| Protect canonical URLs from campaign parameters | Existing canonical implementation already emits clean paths; verify with sample tagged URLs | Tagged URL renders a clean canonical without UTM parameters |

### Recommended shortly after launch

| Requirement | Likely files | Notes |
| --- | --- | --- |
| Central social-profile configuration | New `src/config/socialProfiles.ts`, `src/seo/siteConstants.ts` | Store the approved Facebook URL once; do not scatter it across components. |
| Facebook footer link | `src/components/Footer.tsx` | Add only after the real Page URL exists. Label clearly; open external links safely. |
| Outbound profile click event | `src/utils/tracking.ts` and Footer/social-link component | Suggested event: `social_profile_click` with `platform`, `placement` and `destination_host`. |
| Organization `sameAs` | Central schema helper or homepage Organization object | Add the exact live Page URL. Avoid duplicate, inconsistent Organization objects. |
| Reusable social metadata component | New SEO component/helper plus page templates | Consolidate title, description, canonical, type and image; preserve current page-specific values. |
| Build-time social validation | `scripts/check-seo-output.ts` and tests | Require OG fields on indexable content pages; validate image aspect/dimensions and accessible asset existence. |
| Page-specific share images for priority pages | `public/images/social/` plus per-page metadata field/config | Start with the top five landing pages; do not create 205 images at once. |
| Question/contact click tracking | DataCost Answer CTA and `ContactPage.tsx` | Track click intent; actual email receipt still needs a manual count or form system. |

Do not append Facebook UTMs to internal DataCost links after the landing page. GA4 session attribution should retain the original Facebook source. If an on-site promotion or internal CTA later needs attribution, use a dedicated interaction event rather than overwriting the acquisition source with internal UTM parameters.

### Optional future improvements

- A small social-card generator that renders approved templates from page title, pillar, network and review date.
- Share buttons only if user research shows people want them. Prefer native Web Share on supported devices; do not add third-party widgets or scripts merely to display share icons.
- A Facebook Group link after the 90-day decision gate.
- A post scheduling export if manual publishing becomes burdensome.
- Meta Pixel only if a later paid-media or retargeting case justifies it and privacy/consent review is complete. It is unnecessary for measuring tagged organic traffic.

### Facebook sharing image design

- Default website share card: 1200 x 630 pixels.
- Keep title text short; the page title and description will also appear in metadata.
- Maintain strong contrast and central safe margins.
- Do not place prices, expiry dates or unverified operator claims in the default card.
- Page-specific cards should show a review date only when the underlying page uses a genuine freshness workflow.
- Verify the image preview after deployment before sharing the first URL.

### Privacy and consent

- UTM parameters and GA4 acquisition use the existing measurement setup and broad privacy disclosures.
- A normal outbound Facebook link does not require embedding Meta code.
- Do not add Facebook SDK widgets, like boxes, login, contact upload, Pixel or conversion API in this launch package.
- If any such technology is proposed later, review POPIA implications, cookie/consent controls, data retention and the Privacy/Cookie pages before implementation.

## 8. Analytics and attribution

### UTM convention

Use lowercase ASCII, stable names and no personal data.

| Parameter | Rule | Example |
| --- | --- | --- |
| `utm_source` | Always `facebook` | `facebook` |
| `utm_medium` | Always `organic_social` for unpaid Page posts | `organic_social` |
| `utm_campaign` | Channel phase plus year/month or quarter | `fb_launch_2026_07` |
| `utm_content` | Unique post ID: day/order + short page/format label | `d02_ussd_hub_card` |
| `utm_term` | Omit for organic posts unless a deliberate taxonomy is later needed | - |

Examples:

```text
https://datacost.co.za/ussd-codes-south-africa/?utm_source=facebook&utm_medium=organic_social&utm_campaign=fb_launch_2026_07&utm_content=d02_ussd_hub_card

https://datacost.co.za/guides/check-router-sim-data-balance-and-recharge/?utm_source=facebook&utm_medium=organic_social&utm_campaign=fb_launch_2026_07&utm_content=d13_answer_01_router_sim

https://datacost.co.za/?utm_source=facebook&utm_medium=organic_social&utm_campaign=page_profile&utm_content=cta_button
```

Do not reuse one `utm_content` across multiple posts. Do not put a person’s name, Facebook user ID, phone number or comment text into a URL.

### GA4 reporting

Create a saved exploration or report view that covers:

1. Session source/medium equals `facebook / organic_social`.
2. Session campaign and manual ad content (`utm_content`) for post-level analysis.
3. Landing page plus query string, then a clean landing-page grouping without UTM noise.
4. Sessions, engaged sessions, engagement rate, average engagement time and views per session.
5. New versus returning users.
6. Any implemented question/contact/alert events.

Also monitor untagged Facebook referrals separately: `facebook.com`, `m.facebook.com`, `l.facebook.com` and `lm.facebook.com` may appear as referral sources. Treat this as a cleanup signal, not a substitute for tagging.

### Reconciliation

- Facebook outbound/link clicks and GA4 sessions will not match exactly because of repeat clicks, privacy controls, app browsers, blocked analytics and page-load failures.
- Compare direction and ratios, not one-to-one equality.
- Record both Facebook link clicks and GA4 sessions in the ledger. Investigate abrupt changes in the click-to-session ratio.
- Separate website sessions from Page profile visits, reach, reactions and followers.

### DataCost Answers measurement

For each Answer post, record:

- post ID/series number and source question theme;
- tagged link clicks and GA4 sessions;
- engaged sessions and returning users;
- clicks on the “Send your question” CTA if that event is implemented;
- manually counted relevant emails/questions;
- comments that reveal a new or missing intent;
- whether the existing guide was updated as a result.

### Weekly scorecard

| Metric | Source | Why it matters |
| --- | --- | --- |
| Posts published / planned | Ledger | Operational consistency |
| Posts with freshness check and unique UTM | Ledger QA | Accuracy and attribution quality |
| Facebook link clicks | Page insights | User intent before site load |
| Facebook-attributed sessions | GA4 | Primary traffic outcome |
| Engaged sessions and engagement rate | GA4 | Traffic quality |
| Returning users | GA4 | Early habit/brand signal |
| Top landing pages and `utm_content` | GA4 | Which problems and formats work |
| Relevant comments/questions | Facebook + ledger | Editorial opportunity |
| Question/correction submissions | Event plus mailbox manual count | High-intent outcome |
| Content updates caused by audience feedback | Repository/ledger | Channel learning value |
| Incorrect/outdated post incidents | Incident log | Trust guardrail; target zero |

Followers, reactions and reach are supporting diagnostics, not the primary success measure.

### Provisional 30/60/90-day success gates

These are planning targets for a new channel, not forecasts. Rebaseline them after the first 30 days.

| Period | Traffic and quality target | Operational and learning target |
| --- | --- | --- |
| First 30 days | At least 100 Facebook-attributed sessions, 50 engaged sessions and 10 returning users | 16-18 useful posts, 100% tagged link posts, 100% freshness checks, zero material accuracy incidents, at least one actionable audience question/correction |
| First 60 days cumulative | At least 250 sessions, 125 engaged sessions and 25 returning users; engaged-session rate at or above the site’s comparable non-paid baseline | Two proven content pillars, at least three actionable questions, consistent four-post rhythm |
| First 90 days cumulative | At least 500 sessions, 250 engaged sessions and 50 returning users | At least five comment-derived content opportunities, three documented site improvements/updates, and a clear keep/change/stop decision for each pillar |

If traffic misses the absolute targets but comments produce important corrections or high-intent Answers, retain the channel test and improve distribution. If reach grows without site sessions, engaged visits or useful questions, change the format mix rather than celebrating follower totals.

## 9. Operational workflow

### Publishing process

1. **Select a source page.** Choose one confirmed indexable route from the route catalog. Avoid a noindex or redirect route.
2. **Check freshness.** Review `contentDates`, page source notes, operator links, prices, codes, promotion dates and any JSON `verifyFlags`/`reviewDueDate`. Record who checked and when.
3. **Draft for Facebook.** Lead with the user’s problem, give at least one useful answer natively, then add a link only when the page adds depth.
4. **Add tracking.** Generate the unique UTM URL and confirm it resolves while retaining the clean canonical.
5. **Create/approve an image.** Use the approved template. Add a checked date to time-sensitive cards; include alt text in the publishing notes.
6. **Review.** A second person checks accuracy, independence, privacy, spelling, UTM and visual crop for any price, code, safety or promotion post.
7. **Publish.** Record the actual time, Facebook post URL and any deviation from the draft.
8. **Respond and moderate.** Use reply templates; remove scams/personal data where possible and direct private account matters to the correct operator.
9. **Review performance.** Update 24-hour and seven-day results without rewriting historical fields.
10. **Feed learning back.** Add recurring questions to the DataCost Answers/content backlog and update the relevant page when the audience reveals missing or incorrect information.

### Publishing record location and format

Keep the durable source of truth in the repository under `docs/social/facebook/` once implementation starts:

```text
docs/social/facebook/
  README.md
  post-template.md
  content-ledger.csv
  moderation-playbook.md
  drafts/
```

Use CSV for the ledger because it is simple, diffable, sortable and importable into a spreadsheet. Keep long-form drafts in Markdown only when a post requires review. Do not introduce a database or scheduling application for the launch.

Recommended ledger fields:

```text
post_id,status,pillar,source_path,source_last_reviewed,freshness_checked_at,
freshness_checked_by,verify_notes,draft_path,image_path,scheduled_at_sast,
published_at_sast,facebook_post_url,utm_campaign,utm_content,tagged_url,
objective,facebook_link_clicks,ga4_sessions,ga4_engaged_sessions,
ga4_returning_users,relevant_comments,question_count,performance_notes
```

Rules:

- `post_id` never changes after drafting.
- `freshness_checked_at` is mandatory for every link post and same-day for price, promotion or USSD claims.
- Keep canonical source paths separate from tagged URLs.
- Do not store commenter names, phone numbers, email addresses or copied private messages in the repository.
- Performance updates should preserve the original post copy and publishing record.

### DataCost Answers feedback loop

- Capture the general problem, not the person’s identity.
- Search for an existing page first; update it instead of producing a thin duplicate.
- Research against current official sources and device/service context.
- Publish a general answer and explain that DataCost cannot act on a private network account.
- Reply to the original commenter only with information they can safely use in public; invite email only when appropriate and warn against sharing secrets.
- Record the answer number, source page, post and resulting content update.
- Expand the existing workflow document from “LinkedIn post” to a channel-neutral distribution step during implementation.

## 10. Brand and editorial guidance

### Voice

DataCost on Facebook should sound practical, helpful, direct, South African, consumer-focused and independent. It should be clear about uncertainty and avoid exaggerated claims. A good post should sound like an informed person explaining what to check next, not a corporate press release or generic AI summary.

### Writing rules

- Open with the user’s situation: **“Data finishing too fast?”**, **“Need to check a router SIM remotely?”**, or **“Before you buy another bundle…”**
- Put the first useful answer in the post; do not hide all value behind the link.
- Use short paragraphs and concrete verbs. Typical length: 60-140 words for link posts and 30-90 words for tips/polls.
- Use zero to two functional emojis. Good uses are a warning, checklist or question marker; avoid emoji chains.
- Use zero to three specific hashtags, usually only where they aid a series or topic, such as `#DataCostAnswers`, `#MobileData` or `#SouthAfrica`. Do not stuff network-name hashtags.
- Use one primary call-to-action. Prefer “Save this”, “Check the full steps”, “Tell us which network/menu you see” or one precise question.
- Avoid “You won’t believe”, “cheapest ever”, “guaranteed”, “everyone must”, “best network” and false urgency.
- Use South African terms naturally: airtime, data bundle, prepaid, load/buy data, network and rand. Explain jargon such as FNO, ISP, OOB, WASP and VAS on first use.

### Pricing and promotions

- Include the rand price, allowance, validity, eligibility, source and checked date together.
- Never crop out night-data, social-only, new-customer, SIM-specific, region-specific, auto-renewal or contract conditions.
- State the expiry date and time zone where known. Remove or clearly update expired posts if they could still mislead.
- If a personalised offer cannot be verified for all users, say so.
- Do not call a bundle cheapest without defining the comparison set and date.
- Sponsored or affiliate relationships must be disclosed clearly in the post and destination page. The repository currently does not document a Facebook sponsorship programme.

### Network comparisons and criticism

- Compare criteria, not identities: price, validity, coverage use case, support route, hotspot rules and flexibility.
- Distinguish user reports from verified facts.
- Give the network an official support/escalation role when account data is required.
- Correct errors publicly and update the linked article when needed.
- Never encourage pile-ons or present one anecdote as representative.

### Complaints and moderation

Recommended public reply pattern:

> Sorry you’re dealing with this. DataCost is independent and cannot access the account, but we can help you work out what evidence to collect and which official support route to use. Please do not post your phone number, PIN, OTP, account number, ID number or full address here.

Moderation actions:

- Hide or remove phone numbers, IDs, OTPs, account numbers, banking details and full residential addresses where Page controls allow it; tell the user why.
- Delete and ban clear scams, impersonation, malicious links and repeated spam. Preserve only minimal internal notes without personal data.
- Do not move users to an unverified WhatsApp number or accept payment for support.
- Keep criticism that is relevant and non-abusive, even when it is negative.
- Correct misinformation with a source or uncertainty statement rather than arguing.
- Maintain an escalation route for threats, illegal content, self-harm or immediate security/banking risks; Facebook is not the appropriate support channel for emergencies.

## 11. Risks and controls

| Risk | Impact | Control |
| --- | --- | --- |
| Outdated prices | Wrong buying decision and loss of trust | Same-day source check, checked date on creative, source/validity in ledger, correction procedure |
| Expired promotions | Users waste time or money | Publish only from verified records with end date; currently publish none |
| Incorrect USSD codes | Failed actions or unintended menu choices | Verify against current operator guidance and a live/test SIM where available; show network and checked date |
| Misleading comparisons | Reputational or consumer harm | Define criteria and date; avoid universal winners; link methodology |
| Comments become support requests | Unmanageable workload and implied affiliation | Scope statement, response templates, office-hours expectation and official-network routing |
| Users share personal information | Privacy/security harm | Repeated warnings, hide/remove data, never copy it into the ledger, moderator training |
| Spam and scam links | User loss and Page distrust | Keyword/filter controls, fast hide/delete/ban workflow, pinned anti-scam notice |
| Unclear network independence | Users believe DataCost represents an operator | Independence statement in About, pinned post, footer and comparison language |
| Link-only posts get low reach | Weak discovery | Native value first, polls/tips mix and format testing |
| Facebook copy merely duplicates pages | Low value and poor engagement | Adapt one problem/answer for the platform; add a question, checklist or visual |
| Empty Group launched too early | Split audience and high moderation cost | 90-day decision gate with activity/moderator criteria |
| Wrong social images | Broken or illegible previews | Replace current screenshots, validate dimensions and preview tagged URLs |
| Handle or category unavailable | Setup delay/inconsistency | Approved fallback list and execution-day verification |
| Account compromise or owner lockout | Loss of Page control | 2FA, two authorised owners, minimum access and recovery details stored securely outside the repo |
| Comment insight contains personal data | Privacy leak in repository | Record only anonymised problem themes and counts |
| GA4 and Facebook numbers differ | Bad performance decisions | Reconcile trends and click-to-session ratio; document platform/privacy causes |
| Adding Meta scripts creates privacy burden | Consent and compliance risk | Use normal links and GA4 UTMs; no Pixel/SDK for organic launch |
| Safety guidance becomes outdated | Security harm | Priority review for stolen-phone/account-risk content and official-source checks |
| Publishing non-telecom fix pages confuses the brand | Positioning drift | Limit launch to mobile-data, USSD, LTE-router and fibre content |

## 12. Implementation work packages

### Work package 1: Facebook identity and setup packet

- **Objective:** approve everything needed to create the Page without creating it yet.
- **Files likely to change:** this plan or a new `docs/social/facebook/page-setup-spec.md`; draft identity/cover assets stored in a review location, not wired into production.
- **Deliverables:** final Page name, handle ranking, category fallback, descriptions, CTA, profile image, cover image, pinned welcome copy, access model, moderation rules and setup checklist.
- **Acceptance criteria:** assets pass crop/legibility checks; independence and privacy copy approved; two Page owners identified; no unverified handle claim.
- **Dependencies:** owner approval and access/recovery decisions.
- **Risks:** brand asset rework or handle unavailability.
- **Production behaviour:** no.
- **Deployment:** no.
- **Review gate:** explicit approval before any external Page creation.

### Work package 2: Controlled Facebook Page creation

- **Objective:** create and configure the official Page through the user-approved browser session.
- **Files likely to change:** optionally a non-secret Page record under `docs/social/facebook/`; never store credentials or recovery codes.
- **Deliverables:** Page URL, final handle, populated About fields, CTA, identity/cover, access controls, moderation settings and unpublished/draft launch state where supported.
- **Acceptance criteria:** correct public identity, website/email, independence copy, 2FA/access checks, no post published, URL captured.
- **Dependencies:** work package 1 approval and authenticated Meta access.
- **Risks:** UI/category changes, handle conflict, accidental publication or wrong account context.
- **Production behaviour:** external Facebook state changes; no website behaviour.
- **Deployment:** no website deployment.
- **Review gate:** user inspects the configured Page before it is promoted or content is published.

### Work package 3: Required website social assets and metadata

- **Objective:** make DataCost links render trustworthy Facebook previews.
- **Files likely to change:** `public/og-image.jpg`, `public/logo.png` or replacement paths, `src/seo/siteConstants.ts`, selected metadata components, `scripts/check-seo-output.ts`, relevant tests.
- **Deliverables:** true 1200 x 630 default share card, true square logo, metadata coverage verification and image validation.
- **Acceptance criteria:** production build passes; selected launch pages have correct OG/canonical fields; preview assets are correctly shaped and readable.
- **Dependencies:** approved brand assets.
- **Risks:** schema/logo regressions or cached old previews.
- **Production behaviour:** yes, metadata and public assets.
- **Deployment:** yes.
- **Review gate:** built-output review plus post-deploy social-preview verification before sharing.

### Work package 4: Launch content pack

- **Objective:** turn the approved source URLs into final Facebook-native copy and visuals.
- **Files likely to change:** `docs/social/facebook/drafts/`, approved creative location and content ledger.
- **Deliverables:** at least 15 reviewed posts, unique UTMs, alt text, source/freshness evidence and launch order.
- **Acceptance criteria:** every link resolves to an indexable canonical page; every claim is verified; no promo post without a verified promo record.
- **Dependencies:** Page identity and UTM convention; share assets deployed for link posts.
- **Risks:** stale codes, repetitive copy, too many link posts.
- **Production behaviour:** no website change unless freshness review finds a correction.
- **Deployment:** only if a separate content correction is approved.
- **Review gate:** editorial approval before scheduling/publishing.

### Work package 5: Social publishing ledger and workflow

- **Objective:** create a maintainable record and review process.
- **Files likely to change:** `docs/social/facebook/README.md`, `post-template.md`, `content-ledger.csv`, `moderation-playbook.md`, and `docs/datacost-answers-workflow.md`.
- **Deliverables:** templates, field definitions, roles, freshness SLA, correction process and privacy-safe question workflow.
- **Acceptance criteria:** one sample post can move from draft through seven-day review with all mandatory fields.
- **Dependencies:** agreed owner/reviewer roles.
- **Risks:** an overcomplicated ledger that is not maintained.
- **Production behaviour:** no.
- **Deployment:** no.
- **Review gate:** dry run with two launch posts.

### Work package 6: Website social profile and analytics changes

- **Objective:** connect the live Page to the site and measure high-intent actions.
- **Files likely to change:** new `src/config/socialProfiles.ts`, `src/components/Footer.tsx`, schema helper/homepage schema, `src/utils/tracking.ts`, DataCost Answer CTA, Contact page and tests.
- **Deliverables:** approved Facebook link, Organization `sameAs`, `social_profile_click`, and agreed question/contact click events.
- **Acceptance criteria:** only the exact live Page URL is used; events fire once with non-personal parameters; build and privacy review pass.
- **Dependencies:** live Page URL and event naming approval.
- **Risks:** duplicate events, broken external navigation or inconsistent schema.
- **Production behaviour:** yes.
- **Deployment:** yes.
- **Review gate:** event debug/GA4 verification and built-schema review.

### Work package 7: Thirty-day launch

- **Objective:** publish the approved calendar, moderate safely and collect a clean baseline.
- **Files likely to change:** ledger, approved drafts and weekly scorecard notes.
- **Deliverables:** launch posts, responses, weekly reviews, tagged traffic and question backlog.
- **Acceptance criteria:** 100% required ledger fields, four-post steady rhythm, no unresolved material accuracy issue and month-one report.
- **Dependencies:** work packages 2-6 as applicable; at minimum Page, assets, content, UTMs and workflow must be ready.
- **Risks:** low reach, support overload, stale content or inconsistent moderation.
- **Production behaviour:** external publishing; website changes only through separately reviewed corrections.
- **Deployment:** not inherently.
- **Review gate:** weekly keep/change/stop decisions; immediate pause for material misinformation.

### Work package 8: Reporting, optimisation and Group decision gate

- **Objective:** decide what to scale and whether community infrastructure is justified.
- **Files likely to change:** scorecard/report and future calendar; optional Group decision record.
- **Deliverables:** 30/60/90-day analysis, pillar ranking, landing-page insights, content backlog and Group decision.
- **Acceptance criteria:** decisions use sessions, engaged sessions, returning users, questions and operational capacity, not follower count alone.
- **Dependencies:** at least 30 days of clean data; 90 days for a Group decision.
- **Risks:** overreacting to small samples or creating a Group from vanity demand.
- **Production behaviour:** no unless a separately approved follow-on is chosen.
- **Deployment:** no.
- **Review gate:** owner approves scale, change, pause or Group experiment.

## 13. Recommended immediate next step

Approve and execute **Work package 1: Facebook identity and setup packet** only.

It is the smallest dependency-clearing package: it resolves the Page name, handle fallbacks, About copy, role/access model, moderation boundaries and the two missing brand assets without creating the Page, changing website code, altering GA4, producing the full launch pack or deploying anything. Once reviewed, Page creation can happen as its own controlled browser task, with a separate review before the Page is promoted or the first post is published.

## Scope confirmation

This task created only this planning document. It did not change production code, analytics configuration or existing site assets. It did not create or modify a Facebook account or Page, publish or schedule a post, commit, push, deploy or alter any external system.
