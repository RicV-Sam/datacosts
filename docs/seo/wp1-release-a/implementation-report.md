# DataCost SEO WP1 Release A implementation report

## 1. Executive implementation summary

Release A is implemented on an isolated local branch and stops at the code-review gate. It adds stable IDs, the compatible source/freshness validator, AN-01/02/05/06/07/08 contracts, success-only USSD copy instrumentation, frozen measurement cohorts and search-output regression protection. It does not add a quick-answer UI or any Release B search-facing treatment.

## 2. Source of truth

The approved source is **DataCost SEO Implementation Work Package 1 — Version 1.1**. The explicit implementation authorization dated 21 July 2026 constrained work to Release A.

## 3. Pre-change repository state

- Original worktree: `C:\Users\ricca\Desktop\DataCost\datacosts`
- Branch: `main`
- HEAD: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Existing tracked modification: `package.json` (unrelated Facebook launch command)
- Existing untracked work: `docs/social/facebook/launch-pack/` and `scripts/generate-facebook-launch-assets.mjs`
- Relevant ignored paths: `dist/`, `node_modules/`, `playwright-report/`, `test-results/`, logs and environment files
- Pre-change lint/type check: passed
- Pre-change build: passed; 244 HTML files, five sitemap files and 207 sitemap URLs
- Pre-change Playwright: 35/36 passed; `verify_ussd_v4.spec.ts` contained stale 2026-H1 and March-date assertions against the existing July baseline

The authorized worktree is `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a`. Original unrelated changes were not copied, reset, staged or committed.

## 4. Version 1.1 Release A rows implemented

- A-01: stable IDs for USSD, future quick-answer, source, operator and content records
- A-02: scoped SF-01–SF-10 source/freshness model
- A-03: strict-new/edited plus warning-only legacy compatibility validator
- A-04 / AN-01: `copy_ussd_code` contract, instrumentation and pre-treatment mechanism
- A-05 / AN-02: dormant typed `quick_answer_action` contract and test harness
- A-06 / AN-05: frozen GSC query-owner cohort and untreated comparison rows
- A-07 / AN-06: frozen 20-URL CNI cohort and reconciliation definitions
- A-08 / AN-07: organic landing-page report definition
- A-09 / AN-08: source quality/freshness report definition
- A-10: consent and prerender/static-generation suppression
- A-11: ID, evidence, analytics, interaction and search-output regression tests
- A-12: baseline definitions, versioning and transition-window annotation

## 5. Rows deliberately not implemented

Release B was not implemented. This includes QA-01/02/03 presentation, QA-04, the 17 link mappings, CI-10/13/19/20 treatments, title/meta/H1/intro changes, visible source/freshness presentation, redirects, noindex, canonical reassignment, URL consolidation/removal and sitemap membership changes.

## 6. Files added

- `src/seo/wp1SourceFreshness.ts`
- `src/seo/wp1Measurement.ts`
- `src/seo/wp1QuickAnswerDefinitions.ts`
- `src/data/wp1ReleaseARecords.ts`
- `scripts/check-wp1-release-a.ts`
- `scripts/check-wp1-search-regression.ts`
- `tests/wp1-release-a-source.test.ts`
- `tests/wp1-release-a-analytics.test.ts`
- `tests/wp1-release-a-measurement.test.ts`
- `tests/wp1-release-a-copy.spec.ts`
- `docs/seo/wp1-release-a/search-output-baseline.json`
- This report and `release-a-summary.json`

## 7. Files modified

- `package.json`
- `src/types.ts`
- `src/data.ts`
- `src/data/ussd.ts`
- `src/data/ussdCodes.ts`
- `src/utils/tracking.ts`
- `src/components/USSDCodeFinder.tsx`
- `src/components/UssdTool.tsx`
- `src/pages/USSDPage.tsx`
- `src/pages/NetworkUSSDPage.tsx`
- `tests/verify_ussd_v4.spec.ts` (aligned stale assertions to the recorded pre-change output and made screenshots portable)

## 8. Diff statistics

Against `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`, Release A changes 24 files with 1,359 insertions and 79 deletions. Generated `dist/` output is ignored and no generated production output is committed.

## 9. Stable-ID design

IDs are explicit semantic strings such as `ussd.mtn.balance_main`, `qa.vodacom.data_balance`, `source.operator.mtn` and `operator.vodacom`. They do not depend on array position or display labels, must match a restrictive analytics-safe pattern, are capped at 100 characters, and are checked for duplicates and missing references. Future quick-answer definitions contain IDs and Release B row references only—no copy, operator instruction, action, component or publish flag.

## 10. Source/freshness contract

The contract supports `sourceUrl`, `sourceType`, `checkedAt`, `effectiveFrom`, `expiresAt`, `verificationMethod`, `claimScope`, `status`, `confidence`, `lastContentChangeAt`, derived or justified review due dates, conflicts, supersession and stable record IDs. Approved intervals are 30 days for prices/promotions, 90 for USSD codes, 180 for device steps and 365 for evergreen claims.

## 11. Strict versus warning behavior

New or edited high-risk and future quick-answer-powered records require verified, in-date, non-low-confidence evidence and fail validation otherwise. Expired active promotions are excluded and fail. Untouched legacy gaps warn and enter the editorial backfill queue; the current queue has 28 USSD records. Overdue evergreen evidence warns unless strict. Overrides require a date, reason and approver and cannot silently extend beyond promotion expiry.

## 12. Analytics event schemas

`copy_ussd_code` sends only `canonical_path`, `operator`, `code_type`, `code_id` and `placement`, and only after the clipboard promise succeeds. `quick_answer_action` is a typed dormant contract using `canonical_path`, `answer_id`, `operator`, `action_type`, `placement` and optional controlled `destination_type`. Neither schema accepts clipboard content, phone/account values, free-form input or full destination URLs.

## 13. Privacy and consent controls

Events are blocked for explicit denied analytics consent, prerender injection, headless/prerender user agents and WebDriver/static validation. An explicit in-page consent state or Consent Mode `analytics_storage` update is honored; where no analytics consent value exists, the existing site behavior is preserved. Event handlers remain click-bound and emit once per successful action. “Please Call Me” values are never sent, logged or placed in fixtures/baselines.

## 14. Baseline and cohort definitions

- Baseline as of: 21 July 2026; timezone `Africa/Johannesburg`
- GSC: 21 June–18 July 2026, three-day reporting delay
- GA4: 23 June–20 July 2026, one-day reporting delay
- GSC exported query impressions: 187,914 of 369,636; coverage is **50.84%**, not 100%
- Query-cluster version: `wp1-v1.1`; membership is frozen
- Canonical paths: HTTPS, `datacost.co.za`, query/fragment removed, approved aliases only, one trailing slash for non-file paths
- GA4 segment: Organic Search, South Africa, desktop/mobile/tablet
- Untreated rows: QO-10, QO-12 and QO-15
- Transition: exclude D–D+7; read 28 days at D+8–D+35 and 56 days at D+8–D+63
- Missing/suppressed data stays distinct from zero; GA4 sessions need not equal GSC clicks

The complete repeatable constants live in `src/seo/wp1Measurement.ts`.

## 15. Test commands executed

- `npm run lint`
- `npm run build`
- `npm run check:wp1-contracts`
- `npm run check:wp1-search-regression`
- `npx playwright test wp1-release-a-copy.spec.ts`
- `npx playwright test`

## 16. Test results

Contract/unit coverage includes duplicates, references, enums, dates, future checks, ranges, expiry, strict evidence, compatibility warnings, all review intervals, semantic date separation, canonical normalization, cohort freezing, success/failure/consent/prerender analytics and payload allowlisting. All 16 contract tests and all 39 browser tests pass.

## 17. Build, lint and type-check results

Build, TypeScript checking and repository SEO/AdSense validators pass. The build remains at 244 generated HTML files and five sitemap files.

## 18. Route, canonical and sitemap regression

The committed baseline fingerprints 244 route outputs and 207 sitemap URLs. Comparison covers canonical/title/description/robots/H1 fields, normalized visible text, internal link destinations/anchors, sitemap membership, `robots.txt` and `_redirects`. All hashes match the pre-change build. Sitemap membership, URL count, canonical outputs, public text, links, robots and redirects are unchanged.

## 19. Dependencies

No dependency was added or updated and `package-lock.json` was not regenerated. The implementation uses TypeScript, Node's built-in test runner and the repository's existing Playwright/Vite tools.

## 20. Known limitations

- Release A freezes approved aggregate evidence; it does not fetch live GSC/GA4 data or change external configuration.
- The 28 untouched legacy USSD claims still need editorial evidence backfill before a later strict migration.
- Quick-answer actions have no pre-change baseline because the UI does not exist; their first Release B measurement period must be labeled a post-launch benchmark.
- Consent and browser controls cause GA4 undercounting; GSC and GA4 are intentionally not forced to reconcile.

## 21. Discoveries outside scope

The existing USSD browser test had stale H1/date/section assumptions and Linux-only screenshot paths. Its assertions were aligned to the recorded pre-change output without changing public content. No CI/CNI page treatment was attempted.

## 22. Rollback procedure

Because nothing was pushed or deployed, the safest rollback is to delete the isolated worktree after review or use ordinary `git revert` commits on this local branch. Do not reset or clean the original dirty worktree.

## 23. Local branch and commits

- Branch: `codex/seo-wp1-release-a`
- Baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Source/freshness commit: `67174c7`
- Analytics/measurement commit: `e133940`
- Review documentation and regression tooling: `4371dd6`
- Handoff finalization: `8dff7e0`
- Final report metadata: current local branch HEAD at handoff

No commit was pushed and no pull request was opened.

## 24. Release A deployment checklist

- [x] Code-review candidate only
- [x] Local build/type/test evidence collected
- [x] Search-output regression matched baseline
- [x] No Release B UI/content/link treatment
- [x] No credentials, raw personal data or large exports committed
- [x] No dependency change
- [ ] Independent code review
- [ ] Deployment authorization
- [ ] Production smoke test after a separately authorized deployment
- [ ] Release annotation with actual deployment timestamp

## 25. Conditions remaining before Release B

Release A must be independently reviewed and later deployed under separate authorization. After deployment, confirm AN-01 event quality and consent behavior, record the actual deployment boundary, complete evidence for any quick answer intended to publish, keep QA-04 blocked, and obtain separate Release B authorization. GSC/GA4 setting changes, indexing requests, sitemap submission and production release remain outside this handoff.
