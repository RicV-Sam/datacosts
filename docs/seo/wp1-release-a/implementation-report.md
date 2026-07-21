# DataCost SEO WP1 Release A.6 finalisation report

## 1. Status and authority boundary

The narrow Release A.6 finalisation patch is complete and clean-validated locally. The security-critical A.5 bypasses were independently found closed; this correction addresses the five Medium findings in the Independent WP1 Release A.6 review.

Status remains **pending focused independent revalidation**. `independentReviewApproved` and `deploymentReady` remain false. Nothing was pushed, merged or deployed, and no pull request, GA4/GSC change, sitemap submission, indexing request, dependency/lockfile change, public SEO/content change or Release B work occurred.

## 2. Identity and reconciliation

- Worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a6-remediation`
- Finalisation branch: `codex/seo-wp1-release-a6-finalisation`
- Starting reviewed A.6 HEAD: `ebc3f89e1c047a75a97d3379f111dfaf90d5601f`
- Corrected implementation commit: `7af8114ef656369e8f483eb41e34be4e162f3459`
- Documentation parent: `7af8114ef656369e8f483eb41e34be4e162f3459`
- Reviewed A.5 HEAD: `a34903111211c34306aae14d8f5f7aa06df9b668`
- Original baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Final handoff HEAD: resolve `git rev-parse codex/seo-wp1-release-a6-finalisation`

A commit cannot embed its own final hash, so the documentation parent is recorded directly and the final documentation-only handoff HEAD is reported externally. Required ancestry checks passed. The original main worktree remains at the baseline with its pre-existing modified `package.json` and untracked social launch-pack/generator files unchanged.

The A.6 commit list through the documentation parent is:

1. `7e16a6e9058cdd859bf419eee48f75c6e1d050ae` — close A.6 semantic-authority gaps.
2. `ebc3f89e1c047a75a97d3379f111dfaf90d5601f` — record the reviewed A.6 handoff.
3. `7af8114ef656369e8f483eb41e34be4e162f3459` — finalise the independent review corrections.

The implementation correction from the reviewed A.6 HEAD is 5 files, 930 insertions and 326 deletions. Through this handoff, A.6 is 10 files, 1,328 insertions and 339 deletions from A.5; complete Release A is 45 files, 31,613 insertions and 103 deletions from the original baseline.

## 3. Owner-specific semantic projections

Fingerprint projection version: `wp1-release-a.6-projection-v1`. Manifest version: `wp1-release-a.6`.

Each projection includes a versioned envelope containing canonical owner and kind. Projection functions use explicit field lists, do not spread runtime objects, and do not hash unknown fields.

| Owner | Semantic fields included | Cosmetic/presentation fields excluded |
|---|---|---|
| USSD | stable ID, network/operator, category/code type, semantic action, dial code, dialability | explanation wording and note text |
| Price | stable ID and slug, network, price, currency (`ZAR` default), volume, validity, bundle type, anytime/night allocation, product type and night window | display name, best-for/watch-out/note copy, source labels/URLs/confidence, badges and calculated cost-per-GB |
| Promotion | stable ID, provider/operator, promotion type and category | title, summary, priority, sponsorship presentation, source labels and freshness dates |
| Device step | stable ID and slug, cluster, provider/platform and service type | headings, SEO fields, summary, instructions, FAQs, related-link presentation and ordering |
| Evergreen fact | stable claim slug, or fixed operator plus canonical claim scope | titles, descriptions, visible guide text, quick-answer copy, arrays and presentation order |

All 172 manifest fingerprints were migrated deterministically without changing canonical IDs, kinds or owners. Cosmetic edits and collection reordering now reconcile successfully; price, currency, operator, USSD code/type, promotion identity, device category/platform, claim identity and owner changes alter the semantic projection and fail closed.

## 4. Integrity diagnostics

Authority failures remain fatal during initialisation but now carry a structured JSON diagnostic containing:

- Failure code and concise explanation.
- Record/content ID where inferable.
- Runtime owner, expected manifest owner and expected kind.
- Inferred actual structure.
- Exact missing, invalid and unexpected semantic fields.
- Expected and actual fingerprints where applicable.

Covered codes include `missing_canonical_subject`, `unexpected_runtime_subject`, `owner_mismatch`, `kind_mismatch`, `missing_required_field`, `invalid_field_type`, `unexpected_semantic_field`, `semantic_fingerprint_mismatch`, `duplicate_subject_id`, `cross_owner_collision` and `invalid_manifest_entry`. Diagnostics contain schema/identity data only and do not expose source content or sensitive values.

## 5. Selector diagnostics

`selectEligibleSources` remains the compatibility API and preserves the established empty-array safe state. A detailed selector now returns an immutable discriminated result containing either eligible sources or deterministic request errors.

Diagnostics identify unexpected and missing keys, invalid request/value types, extra positional arguments, unknown content IDs, invalid/unknown source-ID lists, invalid evaluation dates and forged/untrusted validation contexts. All paths continue to use the trusted validation snapshot; failed requests neither mutate that context nor affect a later valid selection.

## 6. Negative and positive evidence

The focused authority suite now contains 10 tests and covers:

- Fresh price, promotion and device injection before authority import.
- Structurally valid uncommitted collection additions.
- Evergreen replacement by price, promotion, device and USSD shapes.
- Slug-only price and price-shaped USSD records.
- Missing and invalid fields.
- Unknown subjects, duplicate IDs and cross-owner collisions.
- Price/currency/operator, USSD code/type and device/platform semantic mutation.
- Unknown semantic-field injection and full fingerprint diagnostics.
- Cosmetic price/name, description/title, USSD explanation, device/guide copy changes and collection reordering as positive controls.
- Narrow lookup-only export surface and 172-subject reconciliation.

The selector suite begins with a genuinely eligible canonical price source and independently rejects all 12 forbidden policy keys, combined keys, excess arguments, null/array/primitives, missing or unknown IDs, invalid source lists/dates, throwing proxies and forged validation contexts. It confirms valid selection still succeeds after every failed request.

Fresh-process authority failure prevents lookup installation and prevents the validation/selection module from acquiring partial authority. Each hostile child process records failed lookup, rejected validation loading and an empty selection result. Tests run in isolated child processes and leave no mutation residue.

## 7. Clean validation

Validation environment: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a6-finalisation-validation-2`, detached at `7af8114ef656369e8f483eb41e34be4e162f3459`.

- OS: Microsoft Windows 11 Home `10.0.26200`, build 26200.
- Node: `v24.11.0`; npm: `11.1.0`.
- Dependencies: fresh `npm ci`, 314 packages, ordinary non-junction `node_modules`.

| Check | Result |
|---|---|
| `npm ci` | exit 0 |
| full `npm audit` | expected exit 1; four unchanged moderate development/build-time findings |
| `npm audit --omit=dev` | exit 0; zero vulnerabilities |
| lint and typecheck | exit 0 |
| production build | exit 0 |
| WP1 contracts | 115/115; 28 legacy compatibility warnings |
| focused A.6 authority tests | 10/10 |
| selector-malformation/source tests | 25/25 |
| all remediation-negative tests | 42/42 |
| search mutation tests | 19/19 |
| focused analytics browser tests | 3/3 |
| full Playwright suite | 39/39 |
| SEO, AdSense and privacy checks | exit 0; privacy scanned 217 tracked text files with 2 documented exceptions |
| all four required diff checks | exit 0 |

The initial and final validation statuses were empty. The full browser suite's ignored `playwright-report` and `test-results` output was removed after verification; no screenshot, mutation, temporary baseline or tracked generated-file residue remains. No reset, restore, clean or index-refresh workaround was used.

## 8. Public-output invariance and preserved controls

The accepted baseline was compared after a fresh build and was not regenerated or replaced:

- 244 routes and titles.
- 207 sitemap URLs across 5 sitemap files.
- 826 JSON-LD blocks.
- Zero public differences.

There were no changes to public titles, descriptions, H1s, visible copy, displayed USSD codes, links/anchors, canonicals, robots, sitemap membership, redirects, URLs, breadcrumbs, JSON-LD, public dates, source/freshness presentation or quick-answer UI.

The private 172-subject manifest, narrow resolver, import-order protection, five owner validators, shared validation-selection context, recursive dependency eligibility, consent restrictions, deeply frozen policy table, analytics relationships, privacy exceptions and search-regression controls remain intact. Live collections do not construct authority, the full registry is not exported, and ordinary builds do not regenerate the manifest.

## 9. Known limitations and independent-review gate

- Final approval remains pending focused independent revalidation.
- The manifest currently contains zero production promotion subjects; the explicit promotion projection is exercised with constructed records and untrusted fresh-process injection tests.
- Twenty-eight untouched legacy USSD records remain in the editorial evidence-backfill queue.
- Four unchanged moderate development/build-time findings remain deferred; the production audit is clean.
- Quick answers remain dormant contracts only; no Release B UI was introduced.

- [x] Security-critical A.5 bypasses independently found closed.
- [x] Five A.6 Medium corrections implemented locally.
- [x] Clean detached validation and public-output comparison passed.
- [x] Original main worktree preserved.
- [ ] Focused independent revalidation approval.
- [ ] Separate integration, push, PR or deployment authority.

Stop at this independent-review gate. Do not push, open a pull request, merge, deploy or begin Release B.
