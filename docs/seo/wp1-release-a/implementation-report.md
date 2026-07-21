# DataCost SEO WP1 Release A.1 remediation report

## 1. Executive remediation summary

Release A.1 resolves every Blocker, High and Medium issue in the independent WP1 Release A code review and stops at the independent-review gate. The work is local only on `codex/seo-wp1-release-a-remediation`; it has not been pushed, deployed, submitted for indexing, or used to change GA4/GSC. Release B presentation, copy, internal-link and query-owner treatments remain absent.

## 2. Independent-review findings addressed

All reviewed findings were addressed: deterministic lifecycle classification; strict evidence/date eligibility; live consent precedence; complete event-ID registration; runtime ID membership; internally derived canonicals; fresh-build search regression; JSON-LD comparison; route/field diagnostics; cross-platform normalization; derived/supersession graphs; review-date constraints; reproducible query cohorts; fixture privacy; screenshot hygiene; whitespace; and artifact accuracy.

| Severity / original finding | Component changed | Correction | Proving test/result | Remaining risk |
|---|---|---|---|---|
| Blocker — caller-controlled legacy classification | `wp1LegacyManifest.ts`, `wp1SourceFreshness.ts`, records | Frozen fingerprint classification; caller lifecycle ignored | new/spoofed/edited/renamed/quick-answer lifecycle tests pass | 28 truly unchanged records still need evidence backfill |
| Blocker — future/expired strict evidence remained eligible | source eligibility | One inclusive authoritative date/status/confidence/review function; promotion dates required | boundary, future, expiry, inverted/status/overdue tests pass | editorial dates must remain maintained |
| Blocker — stale consent could override denial | `analyticsConsent.ts`, tracking | Ordered live store, conservative initialization, event-time refresh | 12 transition/dispatch tests pass | external CMP must publish supported updates |
| High — UI ID datasets omitted | `wp1AnalyticsRegistry.ts`, validator | All four producer registries included; occurrence/unique counts separated | actual registry plus per-dataset collision/mismatch tests pass | future producers must join registry |
| High — syntax-valid unregistered IDs dispatched | tracking event types/runtime assertions | Registered unions plus runtime membership | unregistered answer/code tests pass | none identified |
| High — search check trusted stale `dist/` | search script/package commands | dedicated fresh temporary production build | injected stale-dist test and clean fresh build pass | build runtime increases intentionally |
| High — JSON-LD ignored | search parser/baseline | parse/normalize/fingerprint all JSON-LD and public dates | `@type`/`@id`/date/URL mutations fail as expected | schema semantics beyond JSON structure still need reviewer judgment |
| High — derived evidence needed no dependency | source graph | required dependencies, eligibility and auditable chains | missing/valid/expired/cycle tests pass | none identified |
| High — realistic phone fixture | analytics fixture/privacy scan | sentinel replacement and tracked-file scanner | privacy tests and 212-file scan pass | two documented public-content exceptions remain |
| Medium — AN-05 labels lacked membership | measurement definitions | versioned exact/regex/exclusion/priority rules | normalization/variant/exclusion/overlap/version tests pass | suppressed GSC rows remain unassignable by design |
| Medium — review override could predate check | source validation | date ordering, approver/reason and no-extension rules | override negative/boundary tests pass | extension policy remains intentionally unapproved |
| Medium — self/cyclic source graphs passed | graph validator | self, duplicate, missing and 2/3-node cycles rejected | graph suite passes | none identified |
| Medium — aggregate/fragile search diagnostics | v2 per-route snapshot | attribute-aware title/meta/link parsing, field diagnostics, newline normalization | 244/244 titles; 19 mutation/normalization tests pass | baseline size is larger |
| Medium — range whitespace failures and screenshot debris | affected files/tests | EOF cleanup and per-test output paths | both diff checks and full browser suite pass cleanly | generated output directories remain ignored |

## 3. Findings not addressed and why

No Blocker, High or Medium finding remains unaddressed. Two pre-existing public-content phone-shaped areas are line-scoped in the privacy allowlist because changing rendered copy was explicitly prohibited: four USSD dial examples and two published operator business-support contacts. They are not fixtures or user data and require a separately authorized content/privacy review.

## 4. Branch, baseline and local HEAD

- Branch: `codex/seo-wp1-release-a-remediation`
- Reviewed Release A HEAD: `b9aaec0e06257034b5403cf3974607e674f0d6c3`
- Original baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Clean-validated implementation HEAD: `e9c87ac1d69f6206d9ef003adc6fed7e65391151`
- Handoff artifact commit: resolve the current local HEAD with `git rev-parse HEAD`; this report is committed after the clean-validated implementation and changes documentation only.

## 5. Complete commit list

Original Release A:

1. `67174c7` — source/freshness contracts
2. `e133940` — analytics instrumentation
3. `4371dd6` — baselines/regressions
4. `8dff7e0` — original handoff
5. `b9aaec0` — independent-review evidence target

Release A.1:

1. `cf12c25` — lifecycle manifest and evidence eligibility
2. `9229864` — live consent and registered event IDs
3. `1a35f8f` — fresh search build, JSON-LD coverage and mutation tests
4. `dac656e` — versioned query cohorts, privacy scan and hygiene
5. `e9c87ac` — complete validation commands and screenshot output isolation
6. Current documentation-only handoff commit — resolve with `git rev-parse HEAD`

## 6. Files changed

The remediation adds the frozen manifest, consent store, analytics registry, privacy scan, v2 search baseline and focused negative/mutation tests. It modifies source eligibility, analytics dispatch, query measurement definitions, search comparison, event-producing dataset typings, screenshot output paths, package commands and handoff artifacts. Use `git diff --name-status d35bb614fca0c280bd86bbc2418a2c0dbe042a5a..HEAD` for the authoritative list.

## 7. Diff statistics

Including this handoff artifact content: 39 files changed, 29,744 insertions and 99 deletions versus the original baseline. Most insertions are the 1.10 MB per-route v2 search-output baseline. No dependency, lockfile, raw analytics export or production build output was added.

## 8. Lifecycle-classification design

`classifyContentLifecycle` ignores caller lifecycle claims. It fingerprints material claim fields and compares them with the frozen baseline manifest:

- matching ID and fingerprint → `legacy_untouched`
- matching ID with changed material fields → `legacy_edited`
- unknown ID → `new`
- any quick-answer-powered record → strict regardless of lifecycle

Renames are treated as a missing frozen record plus a strict new record when completeness enforcement is enabled.

## 9. Frozen legacy-manifest design

`src/seo/wp1LegacyManifest.ts` contains 28 static entries with stable ID, record type, SHA-256 material fingerprint, baseline commit, migration version and source location. Ordinary checks only read it; no normal build/test command regenerates it. Duplicate IDs, invalid fingerprints and missing provenance fail.

## 10. Evidence-window and eligibility rules

`evaluateSourceEligibility` is the authoritative source-selection function used by validation and safe source selection. Date-only comparisons use `Africa/Johannesburg` policy with inclusive effective/expiry boundaries. Strict records require valid non-future checks, verified non-low-confidence evidence, current review, and in-window dates. Promotions require `effectiveFrom` and `expiresAt`; status cannot override dates. All-expired candidate sets return an empty array.

## 11. Review-date override rules

Overrides require a non-empty reason and an allowlisted approver. `reviewDueAt` cannot precede `checkedAt`, exceed `expiresAt`, or extend the normally derived review date. Release A.1 allows shortening only because no approved extension maximum exists.

## 12. Derived-source graph rules

Derived records require `derivedFromSourceIds`. Missing, duplicate, self-referential and cyclic dependencies fail. Dependencies must be eligible for the relevant claim date. Supersession and conflict graphs receive the same missing/self/duplicate/cycle checks. Exclusive active claim-scope collisions fail. Validation returns dependency chains for audit.

## 13. Consent authority and transition model

`src/utils/analyticsConsent.ts` provides one live per-window store. Window and dataset values are compatibility initialization inputs; conflicting initial values resolve to denied. Consent Mode entries are applied in array order, and the adapter records live changes in call order. Unknown never erases an explicit decision. A later grant can re-enable only after it is observed after a denial; a later denial suppresses immediately. Dispatch refreshes consent immediately before sending. No known state preserves the approved Release A default.

## 14. Complete stable-ID registry design

`src/seo/wp1AnalyticsRegistry.ts` covers `ussdRepository`, `src/data.ts::ussdCodes`, `ussdCodesByNetwork` and dormant quick-answer definitions. Current totals are:

- 64 event-ID occurrences
- 40 unique event IDs
- 61 USSD occurrences / 37 unique USSD IDs
- 3 quick-answer occurrences / 3 unique answer IDs
- 74 full WP1 stable-ID occurrences / 50 unique IDs after source and operator records are included

Cross-registry operator/code conflicts, unknown operators, missing codes, unregistered IDs and equivalent records under different IDs are validated.

## 15. Runtime membership enforcement

Event types use inferred registered unions for operator, code type, action, placement, destination, `codeId` and `answerId`. Runtime assertions reject unregistered values even when syntax-safe. `qa.unregistered.safe_id` cannot dispatch.

## 16. Canonical-path derivation

Production event callers cannot provide a canonical path. Dispatch uses a valid same-origin rendered canonical first, otherwise normalized current location. Queries and fragments are removed, external origins are rejected, file paths retain file form, and non-file paths receive one trailing slash.

## 17. Privacy fixture and scan changes

The realistic phone-shaped analytics fixture was replaced with `user_input_must_not_be_sent`. `npm run check:wp1-privacy` scans tracked text files, distinguishes USSD/date patterns, masks diagnostics, and fails likely South African phone shapes outside the two documented line-scoped public-content exceptions. Its own tests assemble synthetic shapes at runtime and commit no phone literal.

## 18. Search-regression build and comparison design

The normal command creates a dedicated OS temporary directory, runs a deterministic production build into it, compares the fresh output and removes the temporary directory. It never reads repository `dist/`. Separate explicit commands generate and review a candidate; ordinary checks never rewrite the committed baseline.

## 19. Structured-data comparison coverage

Every `application/ld+json` block is parsed. Malformed JSON fails with a route diagnostic. Object keys are normalized, array order is preserved, multiple blocks are sorted deterministically, and each route records its JSON-LD fingerprint plus summaries for `@type`, `@id`, URL, `datePublished` and `dateModified`. The clean build contains 826 JSON-LD blocks.

## 20. Mutation-test results

All 19 search-regression tests pass. Required failure mutations cover title, description, H1, canonical, robots meta, visible text, link anchor, link destination, sitemap membership, JSON-LD `@type`, `@id`, `dateModified`, canonical URL, redirects and robots. No-op tests cover CRLF/LF, final newlines, attribute order and JSON object-key order. A stale repository `dist/` fixture is ignored.

## 21. Query-cohort match definitions

All seven AN-05 records include version, effective date, owner, supporting pages, exact queries, regexes, exclusions, unique priority, locale, treatment and source reference. NFKC/case/punctuation/whitespace normalization is deterministic. Overlaps are priority-resolved and surfaced, unmatched and suppressed queries remain explicit, and historical assignments retain their cluster version. The 50.84% exported-query coverage limitation remains visible. Approved owners were not changed.

## 22. Clean-install validation

- Path: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a-remediation-validation`
- Detached HEAD: `e9c87ac1d69f6206d9ef003adc6fed7e65391151`
- Node: `v24.11.0`
- npm: `11.1.0`
- `npm ci`: exit 0, 13.67 s, 314 packages installed
- Dependency directory: ordinary independent directory, not a junction
- Lockfile/repository content diff: none
- npm audit notice: four existing moderate findings; no audit fix or dependency change was authorized

## 23. Full test and build results

| Command | Exit | Result | Runtime |
|---|---:|---|---:|
| `npm ci` | 0 | 314 packages | 13.67 s |
| `npm run lint` | 0 | TypeScript clean | 3.73 s |
| `npm run typecheck` | 0 | TypeScript clean | 2.96 s |
| `npm run build` | 0 | 244 HTML, 5 sitemap files, 207 URLs | 36.93 s |
| `npm run check:wp1-contracts` | 0 | 78/78; 28 compatibility warnings | 1.44 s |
| `npm run check:wp1-search-regression` | 0 | 244 routes/titles, 207 URLs, 826 JSON-LD blocks | 35.69 s |
| `npm run check:seo` | 0 | 244 HTML / 5 sitemaps | 0.93 s |
| `npm run check:adsense` | 0 | 362 text files / 244 HTML | 0.92 s |
| `npm run check:wp1-privacy` | 0 | 212 tracked text files | 0.76 s |
| `npx playwright test wp1-release-a-copy.spec.ts` | 0 | 3/3 | 10.28 s |
| `npx playwright test` | 0 | 39/39 browser tests | 17.31 s |
| `git diff --check` | 0 | clean | <1 s |
| `git diff --check d35bb...HEAD` | 0 | clean | <1 s |

## 24. Search-output invariance result

The fresh v2 comparison passes for all 244 routes, all 244 titles, 207 sitemap URLs, links, visible text, metadata, robots, redirects and 826 JSON-LD blocks. The reviewed Release A checker was also streamed directly from `b9aaec0` against the remediation build and passed its original baseline: 244 HTML files and 207 sitemap URLs unchanged. No title, description, H1, visible copy, canonical, robots, redirect, sitemap membership or Release B presentation changed.

## 25. Known limitations

- The 28 frozen untouched USSD records remain warning-compatible pending editorial evidence backfill.
- The privacy allowlist preserves two pre-existing rendered public-content areas because search-facing edits were prohibited.
- npm reports four existing moderate dependency audit findings; dependencies were unchanged.
- Quick answers remain dormant IDs/contracts only; there is no Release B UI or pre-launch quick-answer baseline.
- GA4 remains consent/browser-dependent, and GSC suppressed rows cannot be deterministically assigned.
- The v2 baseline is intentionally large because it stores per-route diagnostic evidence.

## 26. Rollback procedure

Nothing was pushed or deployed. Preferred rollback is to remove the isolated remediation and validation worktrees after review. If commits are later integrated, use ordinary `git revert` in reverse order. Do not reset or clean the original dirty `main` worktree.

## 27. Updated machine-readable summary

`docs/seo/wp1-release-a/release-a-summary.json` contains the authoritative counts, branch, validated implementation HEAD, consent/query/search/privacy models, validation totals, known limitations and external-change flags.

## 28. Independent-review checklist

- [x] Deterministic frozen-manifest lifecycle; caller labels ignored
- [x] New/edited/quick-answer records strict
- [x] In-date authoritative evidence and promotion windows
- [x] Review overrides constrained
- [x] Derived/supersession graphs validated
- [x] Live consent transitions and denial suppression
- [x] Complete event-ID registry and runtime membership
- [x] Internal canonical derivation
- [x] Versioned reproducible query matching
- [x] Fresh-build search comparison
- [x] JSON-LD/public-date comparison and route diagnostics
- [x] Mutation and newline normalization tests
- [x] Fixture privacy and tracked-file scan
- [x] Portable screenshot outputs
- [x] Clean independent `npm ci`
- [x] Both whitespace checks
- [x] Search output and 207-URL sitemap invariant
- [x] No Release B, external changes, push, PR or deployment
- [ ] Independent reviewer approval
- [ ] Separate deployment authorization
