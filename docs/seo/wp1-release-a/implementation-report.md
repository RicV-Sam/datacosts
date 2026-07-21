# DataCost SEO WP1 Release A.3 remediation report

## 1. Status and authority boundary

Release A.3 is a local remediation of the three deployment-blocking bypasses reproduced by the independent Release A.2 review. The implementation is complete and locally validated, but it remains **pending independent review** and is **not deployment-ready**.

No branch or tag was pushed. No pull request, merge, deployment, GA4/GSC change, sitemap submission, indexing request, dependency or lockfile change, public SEO/content change, or Release B work was performed.

## 2. Starting point recorded before editing

- Reviewed worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a2-remediation`
- Reviewed branch: `codex/seo-wp1-release-a2-remediation`
- Reviewed A.2 HEAD: `1dc082906db19d798f25cf778735ca09c32303b0`
- Validated A.2 implementation HEAD: `5ee4094e879ac9ded2d897573b60f8f87a97e158`
- Original project baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Reviewed A.2 status before isolation: clean
- A.3 worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a3-remediation`
- A.3 branch: `codex/seo-wp1-release-a3-remediation`
- A.3 starting HEAD: `1dc082906db19d798f25cf778735ca09c32303b0`
- A.3 starting status: clean
- Baseline ancestry: verified, exit 0
- Reviewed A.2 ancestry: verified, exit 0
- Node: `v24.11.0`
- npm: `11.1.0`
- A.2 dependency arrangement: ordinary local `node_modules` directory
- A.3 dependency arrangement: ordinary local `node_modules` created by clean `npm ci`; 314 packages
- Configured remote: `origin` at `https://github.com/RicV-Sam/datacosts.git`
- A.3 upstream: none
- Matching remote A.2/A.3 branch tips: none
- No configured remote ref contained reviewed A.2 HEAD when checked
- Original main worktree: `main` at `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Original main status, observed before work and verified unchanged afterward: modified `package.json`; untracked `docs/social/facebook/launch-pack/`; untracked `scripts/generate-facebook-launch-assets.mjs`

The complete worktree inventory was recorded before editing. Existing Release A, A.1, A.2, validation, and Codex worktrees were left untouched.

## 3. Immutable implementation identity

- Clean-validated A.3 implementation HEAD: `395547f1426aba8e9d3416fa3a0174a1e0d60994`
- Implementation commit: `395547f1426aba8e9d3416fa3a0174a1e0d60994` — `fix(seo): close Release A.3 evidence and consent bypasses`
- Documentation parent: `395547f1426aba8e9d3416fa3a0174a1e0d60994`
- Final local handoff HEAD: resolve `git rev-parse codex/seo-wp1-release-a3-remediation`

A commit cannot contain its own hash without changing that hash. The immutable implementation and documentation-parent identities are therefore exact; the final documentation-only commit is truthfully identified by the local branch-resolution command rather than a false embedded self-hash.

The A.3 implementation-only diff from reviewed A.2 is exactly 6 files, 363 insertions, and 55 deletions:

- `src/data/wp1ReleaseARecords.ts`
- `src/seo/wp1SourceFreshness.ts`
- `src/utils/analyticsConsent.ts`
- `tests/wp1-release-a-remediation-analytics-negative.test.ts`
- `tests/wp1-release-a-remediation-source-negative.test.ts`
- `tests/wp1-release-a-source.test.ts`

The final A.3 handoff range through the branch-resolved documentation commit contains 8 files, 598 insertions, and 270 deletions. The complete Release A range from the original baseline contains 42 files, 30,350 insertions, and 103 deletions. The A.3 range's only additional files beyond the implementation are:

- `docs/seo/wp1-release-a/implementation-report.md`
- `docs/seo/wp1-release-a/release-a-summary.json`

There are no merge commits in the A.3 range and no unrelated implementation changes.

## 4. A.3 remediation matrix

| Reproduced blocker | Correction | Negative proof | Status |
|---|---|---|---|
| Caller-selected evergreen interval for USSD | Closed `EvidenceRecordKind` values map to canonical policies; caller `riskClass` is compatibility-only and mismatches fail closed | A USSD record labelled evergreen is rejected and its March evidence is overdue under the canonical 90-day interval | Remediated; pending independent review |
| Non-recursive comparison/source selection | Validation and `selectEligibleSources` call the same recursive dependency evaluator, with full path diagnostics | Top and middle derived records above an expired base are excluded from selection | Remediated; pending independent review |
| Compatibility-labelled consent updater override | The exported updater accepts only adapter authority and rejects runtime calls labelled `window` or `dataset` | A consumed Consent Mode denial remains denied after both compatibility-labelled calls | Remediated; pending independent review |

No claim is marked independently closed. Deployment remains blocked until the separate review gate is passed.

## 5. Canonical evidence policy

The closed kinds are `ussd_code`, `price`, `promotion`, `device_step`, and `evergreen_fact`. They map respectively to the canonical risk/review policies `ussd_code`, `price`, `promotion`, `device_steps`, and `evergreen`. Price and promotion kinds are always strict; quick-answer record type remains always strict independently of kind.

Effective strictness is:

```text
new lifecycle
OR materially edited legacy lifecycle
OR powers quick answer
OR canonical record policy is always strict
```

Caller lifecycle remains ignored. Caller risk class cannot select a review interval. Unknown kinds, kind/risk mismatches, USSD/non-USSD kind mismatches, and operator/non-evergreen kind mismatches fail closed. Frozen, manifest-backed untouched legacy records retain their approved warning-compatible path only when no strict condition applies.

Production registry totals remain 28 untouched legacy USSD records, zero edited records, five new operator records, five strict new records, and 28 documented backfill warnings.

## 6. Shared recursive evidence eligibility

`evaluateSourceEligibility` is the single recursive primitive used by validation and `selectEligibleSources`. It checks direct and transitive dependencies for missing references, cycles, dates, status, confidence, review due dates, and strict publishability. Dependency evaluation remains strict at every depth. Path-specific failures are retained without memoization loss and diagnostics show the complete route from the selected source to the failing descendant.

Tests cover eligible multi-level chains and transitive expired, future-effective, low-confidence, and overdue bases. The reproduced `top -> middle -> expired base` selection bypass is now ineligible at both derived levels.

## 7. Consent update authority

Window and dataset compatibility values remain initialization-only inputs. Consent Mode entries are consumed in array order. The explicit adapter updater is the sole exported live mutation authority; compatibility-labelled runtime calls are ignored even when invoked from untyped JavaScript. Unknown never erases a prior explicit decision, later authoritative Consent Mode grant/deny transitions remain ordered, and dispatch rechecks live consent immediately before sending.

## 8. Red/green evidence

Before implementation, three focused tests reproduced exactly the remaining A.2 failures:

1. USSD evergreen policy borrowed a 365-day interval.
2. Source selection returned derived records above an expired transitive base.
3. Compatibility-labelled updater calls changed a consumed denial to granted.

The red phase was 26 passed and 3 failed. After remediation, all three reproduced failures pass. The complete remediation-negative suite is 36/36, and the complete WP1 contract suite is 99/99.

## 9. Validation at the implementation HEAD

All results below were obtained at `395547f1426aba8e9d3416fa3a0174a1e0d60994` with a clean tracked worktree after generation/build:

| Check | Result |
|---|---|
| `npm ci` | exit 0; 314 packages; ordinary local `node_modules` |
| `npm run lint` / `npm run typecheck` | exit 0 |
| three reproduced A.3 negative cases | 3/3 |
| remediation-negative suite | 36/36 |
| `npm run check:wp1-contracts` | 99/99; 28 expected compatibility warnings |
| `npm run build` | exit 0; SEO and AdSense output checks passed |
| `npm run check:wp1-search-regression` | 244 HTML routes, 244 titles, 207 sitemap URLs, 826 JSON-LD blocks unchanged |
| `npm run check:wp1-privacy` | passed across 214 tracked text files; 2 documented exact exceptions |
| `npx playwright test` | 39/39 browser tests |
| `npm audit --omit=dev` | 0 vulnerabilities |
| full `npm audit` | 4 existing moderate development/build-time findings |
| generated output / Windows newline check | clean |
| `git diff --check` | clean |

The full audit command correctly exits non-zero because of the four documented moderate development-only nodes. No forced or breaking dependency change was attempted.

## 10. Preserved A.2 behavior and public-output invariance

The frozen legacy manifest, lifecycle classifier, direct date-window validation, exact privacy exceptions, semantic analytics relationships, protocol-relative canonical rejection, every-record review-date validation, query clusters, fresh-build regression, JSON-LD comparison, route diagnostics, Windows clean generation, and public-output invariance all remain passing.

No public title, meta description, H1, introduction, page copy, displayed USSD code, link destination/anchor, canonical, robots directive, sitemap membership, redirect, URL, breadcrumb, structured data, `datePublished`, `dateModified`, source/freshness presentation, or quick-answer presentation changed.

Stable-ID totals remain 74 occurrences and 50 unique IDs. Code IDs remain 61 occurrences and 37 unique IDs; answer IDs remain 3 occurrences and 3 unique IDs; the canonical registry has four producer registries. Query-cluster version remains `wp1-v1.1`.

## 11. Explicitly deferred or excluded

- Four moderate development/build-time dependency findings remain deferred; production audit is clean.
- The 28 untouched legacy USSD records remain in the editorial evidence-backfill queue.
- IL-01 through IL-17; QA-01 through QA-04 presentation; CI-10, CI-13, CI-19, and CI-20 treatment; query-owner content changes; and Release B remain excluded.
- No dependency, lockfile, public-output, external service, push, PR, merge, or deployment action occurred.

## 12. Complete local Release A commit list through implementation

1. `67174c71be7558c04ff94130439a70d844d71d6b` — `feat(seo): add WP1 source freshness contracts`
2. `e1339409b2c4297cd963887d44ce7da06b3efafc` — `feat(analytics): instrument WP1 user action events`
3. `4371dd6c1e3af67f154ea384279ef547d793fb74` — `test(seo): freeze WP1 baselines and regressions`
4. `8dff7e06d3e934b2af77cfd988d679b3dfdfadb9` — `docs(seo): finalize WP1 Release A handoff`
5. `b9aaec0e06257034b5403cf3974607e674f0d6c3` — `docs(seo): record final Release A evidence`
6. `cf12c25d29d5be4b9c846e324f126b662197cab6` — `fix(seo): enforce lifecycle and evidence eligibility`
7. `9229864cf7720f9d2bdb8d029d815b4d3f585974` — `fix(analytics): enforce live consent and registered event IDs`
8. `1a35f8f140922d46ca34be7a5b8412e5ad9e48e1` — `fix(seo): rebuild and compare structured search output`
9. `dac656e4496d182fe11d2f57b9338d080818b416` — `fix(seo): version query cohorts and enforce repository privacy`
10. `e9c87ac1d69f6206d9ef003adc6fed7e65391151` — `test(seo): complete remediation validation gate`
11. `e69c2a5ffca3ddc8dc9f540dac66807a97c3eb46` — `docs(seo): finalize Release A.1 remediation handoff`
12. `0098c5517c6fbde1ff0c54940608d4dbcdde65e7` — `fix(seo): enforce strict lifecycle and recursive evidence`
13. `d9ef2520dc3ea1cb0a1cfdbfd2907591863fccdb` — `fix(analytics): enforce consent and event relationships`
14. `a7b5ac704cb6869a01ebfbfc60f453b6e1b17803` — `fix(build): preserve clean generated output`
15. `898b4dcecf2ef4f92f3d2cf8dd5d6b6e5887d1fa` — `docs(seo): finalize Release A.2 remediation handoff`
16. `5ee4094e879ac9ded2d897573b60f8f87a97e158` — `fix(seo): apply always-strict record policy`
17. `55c112337369d3db1def098820a7ffcd4255fde0` — `docs(seo): record final Release A.2 policy validation`
18. `1dc082906db19d798f25cf778735ca09c32303b0` — `docs(seo): reconcile Release A.2 handoff scope`
19. `395547f1426aba8e9d3416fa3a0174a1e0d60994` — `fix(seo): close Release A.3 evidence and consent bypasses`
20. Current documentation-only handoff commit — resolve `git rev-parse codex/seo-wp1-release-a3-remediation`

## 13. Review gate and rollback

- [x] Three reproduced A.2 bypasses remediated locally
- [x] Negative tests added for each reproduced bypass
- [x] Passing A.2 controls preserved
- [x] Public search output invariant
- [x] Dependency and lockfile exclusions respected
- [x] Original main worktree unchanged
- [x] No push, PR, merge, deployment, external action, or Release B work
- [ ] Independent Release A.3 approval
- [ ] Separate integration/deployment authorization

Nothing was pushed or deployed. The isolated A.3 worktree/branch can be abandoned without touching the original dirty main worktree. If later integrated, rollback should use ordinary `git revert`, not reset or clean operations against the original worktree.
