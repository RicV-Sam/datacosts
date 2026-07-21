# DataCost SEO WP1 Release A.2 remediation report

## 1. Status and authority boundary

Release A.2 is a local remediation of the ten remaining findings in the independent Release A.1 review. It starts from reviewed Release A.1 HEAD `e69c2a5ffca3ddc8dc9f540dac66807a97c3eb46` and stops at the independent-review gate.

No branch or tag was pushed. No pull request, deployment, GA4/GSC change, sitemap submission, indexing request, dependency change, lockfile change, public-content treatment, or Release B work was performed.

## 2. Starting point recorded before editing

- Release A.2 worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a2-remediation`
- Branch: `codex/seo-wp1-release-a2-remediation`
- Starting HEAD: `e69c2a5ffca3ddc8dc9f540dac66807a97c3eb46`
- Starting status: clean
- Original baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Release A.1 ancestry from the baseline: verified
- Release A.2 ancestry from reviewed Release A.1 HEAD: verified
- Node: `v24.11.0`
- npm: `11.1.0`
- Release A.1 dependency arrangement: `node_modules` junction to the original main worktree
- Release A.2 dependency arrangement: independent ordinary `node_modules` created by `npm ci`; 314 packages
- Original main worktree branch/HEAD: `main` at `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Original main status, observed and left untouched: modified `package.json`; untracked `docs/social/facebook/launch-pack/`; untracked `scripts/generate-facebook-launch-assets.mjs`

## 3. Release A.2 implementation identity

The immutable, clean-validated code head is `5ee4094e879ac9ded2d897573b60f8f87a97e158`.

Release A.2 commits:

1. `0098c55` — `fix(seo): enforce strict lifecycle and recursive evidence`
2. `d9ef252` — `fix(analytics): enforce consent and event relationships`
3. `a7b5ac7` — `fix(build): preserve clean generated output`
4. `5ee4094` — `fix(seo): apply always-strict record policy`
5. Documentation-only handoff commit — resolve with `git rev-parse codex/seo-wp1-release-a2-remediation`

A commit cannot truthfully embed its own hash without changing that hash. Therefore this report records the immutable implementation head exactly and gives the explicit local branch-resolution command for the documentation-only handoff commit. It does not use a placeholder or mislabel the implementation head as the handoff head.

## 4. Findings remediated

| Finding | Release A.2 correction | Negative proof |
|---|---|---|
| Evergreen risk-class strictness bypass | Strictness is derived from frozen lifecycle and quick-answer policy; `riskClass` cannot downgrade new or edited records | A new USSD record declaring `evergreen` fails without eligible evidence |
| Consent compatibility-state override | Window and dataset compatibility values are initialization-only; consumed Consent Mode/adapter decisions cannot be overwritten by stale compatibility state | A consumed denial remains denied despite stale compatibility grants |
| Transitive derived-evidence eligibility | Every descendant in a derived-source chain is traversed and evaluated under strict eligibility | An eligible direct parent with an expired grandparent is rejected |
| Analytics ID/operator/code-type relationships | Registry validation enforces code-type enums, same-registry ID uniqueness, cross-registry ID/type consistency, and runtime ID/operator/type relationships | Unknown types, duplicate IDs, and wrong runtime relationships all fail |
| Exact privacy exceptions | Allowlist entries require file/range, description, reason, approver, and exact SHA-256 match fingerprints | Replacing an approved public value on the same line with an arbitrary phone-shaped value fails |
| Protocol-relative canonical rejection | Raw canonical `href` is inspected before browser URL resolution; `//host/path` is rejected | Protocol-relative rendered canonical falls back to current same-origin location |
| Review-date extension on every record | Every `reviewDueAt` is compared with the shortest approved interval before usage filtering | An unused source carrying an unapproved extension fails |
| Cross-platform clean generation | Generated text is compared after LF normalization; meaningful changes preserve the checked-out newline convention | LF/CRLF-only changes do not rewrite; real changes preserve CRLF |
| Accurate handoff/identity reporting | Exact reviewed A.1 head and immutable A.2 code head are recorded; final documentation identity is branch-resolved | Machine-readable summary contains no self-hash placeholder |
| Negative tests for reproduced failures | Each reproduced review failure has a named regression test | Focused suite: 40/40 passing after a red phase with nine reproduced failures; the explicit always-strict policy case is also covered |

## 5. Red/green remediation evidence

Before implementation, the focused negative suite failed in nine reproduced cases:

- arbitrary phone-shaped value on an allowlisted line
- unknown analytics code type
- duplicate ID within one registry
- stale compatibility grant after a consumed denial
- protocol-relative canonical
- wrong analytics ID/operator/code-type relationship
- evergreen strictness bypass
- unused-source review-date extension
- expired transitive derived dependency

After implementation, the focused remediation suite passes 40/40 and the full WP1 contract suite passes 90/90.

## 6. Lifecycle and evidence policy

Frozen lifecycle remains authoritative. The effective strict policy is lifecycle-driven: all `new` and `legacy_edited` records, every quick-answer-powered record, and any record subject to an always-strict policy require strict evidence. `legacy_untouched` compatibility warnings remain available only to records that match the frozen manifest.

The current manifest still has 28 untouched legacy entries, zero edited entries, and five new operator records. The five new records are strict regardless of their risk-class labels. The 28 untouched records remain in the documented evidence-backfill queue.

Derived evidence now fails if any dependency at any depth is ineligible for the claim date. Existing missing-reference, duplicate, self-reference, cycle, direct-date-window, supersession, conflict, and audit-chain behavior is preserved.

Review-date overrides remain shortening-only under the currently approved policy. Every source record is checked against the conservative 30-day ceiling before usage/claim filtering, preventing unused records from carrying latent unauthorized extensions.

## 7. Consent and analytics registry policy

Compatibility values on `window` and `documentElement.dataset` are read once when the store initializes. They cannot later override an explicit Consent Mode or adapter decision. Consent Mode entries retain array order, adapter calls retain call order, unknown does not erase an explicit state, and a later explicit grant or denial remains live. Dispatch rechecks consent immediately before sending.

The event registry still covers all four approved producers and retains the reviewed totals: 61 USSD occurrences across four registries, 74 full stable-ID occurrences, and 50 unique full stable IDs. Release A.2 additionally validates the semantic relationship of each registered ID to its operator and code type, not only membership. Quick-answer IDs are likewise tied to their registered operator. Unknown code types and same-registry duplicate IDs fail.

## 8. Canonical and privacy policy

Analytics canonicals remain internally derived. Same-origin absolute rendered canonicals are accepted; external and protocol-relative raw canonicals are rejected in favour of normalized current location. Public canonical output was not changed.

The privacy allowlist is exact-value scoped without storing the clear value in the allowlist. Each permitted public-content occurrence is authorized by a SHA-256 match fingerprint plus file/range and approval metadata. The two approved public-content areas and three approved exact fingerprints remain unchanged. An arbitrary replacement on the same line is not exempt.

## 9. Cross-platform generated-output behavior

Sitemap and redirect generation no longer rewrites a tracked file solely because the checkout uses CRLF rather than LF. Normalized equality skips the write; a meaningful write preserves the existing newline convention. Repeated generation and the production build leave the tracked worktree clean.

## 10. Validation at the immutable code head

Validated implementation head: `5ee4094e879ac9ded2d897573b60f8f87a97e158`.

| Check | Result |
|---|---|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| focused remediation tests | 40/40 |
| all `tests/*.test.ts` | 90/90 |
| `npm run build` | exit 0; 244 HTML files, 5 sitemap files, 207 URLs |
| `npm run check:wp1-contracts` | 90/90; 28 documented compatibility warnings |
| `npm run check:wp1-search-regression` | 244 routes/titles, 207 URLs, 826 JSON-LD blocks unchanged |
| `npm run check:wp1-privacy` | passed across 214 tracked text files; 2 documented exact public-content entries |
| `npm audit --omit=dev` | 0 vulnerabilities |
| full `npm audit` | 4 existing moderate development/build-time findings |
| generation/build working-tree check | clean |
| `git diff --check` | clean |

The final documentation-only handoff commit is independently revalidated from a fresh detached worktree after it is created; its exact hash and clean status are reported in the reviewer handoff response.

## 11. Public-output invariance

The fresh v2 search comparison passes across 244 routes, 244 titles, 207 sitemap URLs, links, visible text, metadata, robots, redirects, and 826 JSON-LD blocks. No title, meta description, H1, introductory copy, visible source/freshness date, displayed USSD code, link destination/anchor, public canonical, robots directive, sitemap membership, redirect, URL structure, structured-data output, or public `dateModified` changed.

## 12. Explicitly deferred or excluded

- The four moderate audit nodes are development/build-time only. Production audit is clean. No breaking downgrade or forced audit fix was applied.
- The 28 frozen untouched legacy source records still require editorial evidence backfill.
- Quick answers remain dormant contracts only; Release B UI/copy was not added.
- IL-01 through IL-17, QA-01 through QA-04 presentation, CI-10, CI-13, CI-19 and CI-20 treatment remain outside this remediation.
- No external analytics, Search Console, deployment, submission, indexing, push, or pull-request action was taken.

## 13. Rollback

Nothing was pushed or deployed. Review can be abandoned by removing only the isolated Release A.2 and validation worktrees. If the commits are later integrated, use ordinary `git revert` in reverse order. Do not reset, clean, or overwrite the original dirty main worktree.

## 14. Review gate

- [x] All ten Release A.1 review findings remediated
- [x] Negative regression coverage for every reproduced failure
- [x] Already corrected Release A.1 areas preserved
- [x] Public search output invariant
- [x] Dependency and lockfile scope respected
- [x] Original main worktree untouched
- [x] No push, PR, deployment, external analytics/search action, or Release B work
- [ ] Independent reviewer approval
- [ ] Separate implementation/deployment authorization
