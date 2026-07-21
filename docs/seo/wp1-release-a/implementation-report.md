# DataCost SEO WP1 Release A.4 remediation report

## 1. Status and authority boundary

Release A.4 is a local remediation of the remaining evidence-policy findings reproduced by the Independent WP1 Release A.3 review. The implementation is complete and locally validated, but it remains **pending independent review** and is **not deployment-ready**.

No branch or tag was pushed. No pull request, merge, deployment, GA4/GSC change, sitemap submission, indexing request, dependency or lockfile change, public SEO/content change, or Release B work was performed.

## 2. Starting point recorded before editing

- Reviewed worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a3-remediation`
- Reviewed branch: `codex/seo-wp1-release-a3-remediation`
- Reviewed A.3 HEAD: `5d86e459c0bd60480706ea7110dd69df109f8267`
- Validated A.3 implementation HEAD: `395547f1426aba8e9d3416fa3a0174a1e0d60994`
- Original project baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Reviewed A.3 status before isolation: clean
- A.4 worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a4-remediation`
- A.4 branch: `codex/seo-wp1-release-a4-remediation`
- A.4 starting HEAD: `5d86e459c0bd60480706ea7110dd69df109f8267`
- A.4 starting status: clean
- Baseline ancestry: verified, exit 0
- Reviewed A.3 ancestry: verified, exit 0
- Node: `v24.11.0`
- npm: `11.1.0`
- A.3 dependency arrangement: ordinary local `node_modules` directory
- A.4 dependency arrangement: ordinary local `node_modules` created by `npm ci`; 314 packages
- Configured remote: `origin` at `https://github.com/RicV-Sam/datacosts.git`
- A.4 upstream: none
- Matching local remote-tracking ref containing the A.3 or A.4 tip: none
- Original main worktree: `main` at `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Original main status, observed before work and verified unchanged afterward: modified `package.json`; untracked `docs/social/facebook/launch-pack/`; untracked `scripts/generate-facebook-launch-assets.mjs`

The complete worktree inventory was recorded before editing. Existing Release A, A.1, A.2, A.3, validation, and Codex worktrees were left untouched.

## 3. Immutable implementation identity

- Clean-validated A.4 implementation HEAD: `f81970a881851a9b4a1eeceae12547e8fff8969c`
- Implementation commit: `f81970a881851a9b4a1eeceae12547e8fff8969c` — `fix(seo): enforce Release A.4 evidence policy authority`
- Documentation parent: `f81970a881851a9b4a1eeceae12547e8fff8969c`
- Final local handoff HEAD: resolve `git rev-parse codex/seo-wp1-release-a4-remediation`

A commit cannot contain its own hash without changing that hash. The implementation and documentation-parent identities are exact; the final documentation-only commit is identified by the local branch-resolution command rather than a false embedded self-hash.

The A.4 implementation-only diff from reviewed A.3 is exactly 5 files, 397 insertions, and 169 deletions:

- `scripts/check-wp1-release-a.ts`
- `src/data/wp1ReleaseARecords.ts`
- `src/seo/wp1SourceFreshness.ts`
- `tests/wp1-release-a-remediation-source-negative.test.ts`
- `tests/wp1-release-a-source.test.ts`

The final A.4 handoff range through the branch-resolved documentation commit contains **7 files, 548 insertions, and 300 deletions**. Its only files beyond the implementation are:

- `docs/seo/wp1-release-a/implementation-report.md`
- `docs/seo/wp1-release-a/release-a-summary.json`

The complete Release A range from the original baseline through the final handoff contains **42 files, 30,598 insertions, and 103 deletions**. There are no merge commits in the A.4 range and no unrelated implementation changes.

## 4. A.4 remediation matrix

| Independent A.3 finding | Correction | Negative proof | Local status |
|---|---|---|---|
| P0: price, promotion and device records could self-label as evergreen generic content | Removed `recordKind`, `subjectKind`, and `riskClass` authority from `ContentEvidenceRecord`; a trusted, collection-owned subject registry now binds record IDs to canonical semantic kinds | Stale price and device evidence remain overdue and a promotion without dates remains invalid even when untyped input adds evergreen policy fields | Remediated; pending independent review |
| P0: selection accepted caller `strict` and `promotion` flags | Removed the options parameter; selection resolves interval, window requirements, strictness, and confidence threshold only from the canonical policy | Promotion selection rejects missing dates and price selection rejects low-confidence evidence even when JavaScript supplies a fourth `{ strict: false }` argument | Remediated; pending independent review |
| P1: exported policy entries were mutable | Made the table private, deeply runtime-frozen and readonly; exposed a readonly lookup; added `wp1-release-a.4` policy version | Mutation of the returned USSD policy throws and the canonical risk class remains `ussd_code` | Remediated; pending independent review |
| P2: A.3 handoff omissions and unsupported closure claim | Added policy version, strict total, aggregate event totals, focused totals, exact identity/diffs, and conservative closure language | Machine-readable and prose artifacts share the immutable implementation identity and do not claim independent closure | Remediated; pending independent review |

No independent finding is marked closed solely because the committed suite passes. Deployment remains blocked until a separate review and separate authorization.

## 5. Canonical subject and policy architecture

`ContentEvidenceRecord` no longer accepts semantic kind or risk class. Production USSD and operator collection adapters construct records without policy fields. `wp1EvidenceSubjects` is built separately from those collection-owned record sets, and `validateReleaseAData` requires a registry produced by the canonical factory.

The registry factory rejects unknown collection keys, invalid IDs, duplicate registrations and malformed collection values. Registries and entries are frozen and branded in a private runtime trust set. Raw JavaScript objects, `as any` registries, missing registrations, and caller policy fields fail closed. A TypeScript regression assertion prevents semantic-kind authority from being added back to evidence records.

Canonical subject kinds remain:

- `ussd_code`
- `price`
- `promotion`
- `device_step`
- `evergreen_fact`

Policy version `wp1-release-a.4` owns the review interval, risk class, always-strict status, effective-date requirement, expiry requirement and minimum confidence. The table and every nested entry are runtime frozen. The compatibility review-interval export is also frozen and derives from this table; enforcement reads the private policy directly.

Effective record strictness remains:

```text
new lifecycle
OR materially edited legacy lifecycle
OR powers quick answer
OR canonical record policy is always strict
```

## 6. Canonical selection and recursive eligibility

`selectEligibleSources` now accepts only sources, a canonical subject kind and the as-of date. It has no caller-controlled strictness or promotion flags. Promotion windows, the 30-day price/promotion interval, 90-day USSD interval, 180-day device interval, 365-day evergreen interval, minimum confidence and always-strict behavior are policy-derived.

The already-correct shared recursive evaluator remains in place. Validation and selection still apply direct and transitive eligibility, strict dependency evaluation, complete path diagnostics, missing-reference checks and cycle protection.

## 7. Focused negative evidence

The focused A.4 additions are 4/4:

1. The versioned canonical policy and subject registry are runtime frozen.
2. Price, promotion and device subjects cannot masquerade as generic evergreen content.
3. Selection always enforces canonical promotion windows.
4. A legacy JavaScript caller flag cannot disable canonical price strictness.

The complete remediation-negative suite is 40/40. The complete WP1 contract suite is 103/103.

## 8. Validation at the implementation HEAD

All results below were rerun at `f81970a881851a9b4a1eeceae12547e8fff8969c`, with a clean tracked worktree after generation/build:

| Check | Result |
|---|---|
| `npm ci` | exit 0; 314 packages; ordinary local `node_modules` |
| `npm run lint` / `npm run typecheck` | exit 0 |
| focused A.4 blocker tests | 4/4 |
| remediation-negative suite | 40/40 |
| `npm run check:wp1-contracts` | 103/103; 28 expected compatibility warnings |
| `npm run build` | exit 0; SEO and AdSense output checks passed |
| `npm run check:wp1-search-regression` | 244 HTML routes, 244 titles, 207 sitemap URLs, 826 JSON-LD blocks unchanged |
| `npm run check:wp1-privacy` | passed across 214 tracked text files; 2 documented exact exceptions |
| `npx playwright test` | 39/39 browser tests |
| `npm audit --omit=dev` | 0 vulnerabilities |
| full `npm audit` | 4 existing moderate development/build-time findings |
| generated output / Windows newline check | clean |
| `git diff --check` | clean |

The full audit correctly exits non-zero because of the four documented moderate development-only nodes. No forced or breaking dependency change was attempted.

## 9. Preserved A.3 behavior and public-output invariance

The frozen legacy manifest, lifecycle classifier, strictness precedence, recursive dependency validation and selection, complete dependency diagnostics, consent initialization/update restrictions, semantic analytics relationships, exact privacy exceptions, protocol-relative canonical rejection, review-date validation, search regression, JSON-LD comparison, query clusters and Windows clean generation remain passing.

Production totals remain 33 content records: 28 untouched legacy USSD records, zero edited records, five new operator records, five strict records, and 28 documented backfill warnings.

Stable-ID totals remain 74 occurrences and 50 unique IDs. Event IDs total 64 occurrences and 40 unique IDs: code IDs are 61 occurrences/37 unique and answer IDs are 3 occurrences/3 unique. The canonical analytics registry count remains 4. Focused analytics tests remain 16/16. Query-cluster version remains `wp1-v1.1`.

No public title, meta description, H1, introduction, page copy, displayed USSD code, link destination/anchor, canonical, robots directive, sitemap membership, redirect, URL, breadcrumb, structured data, `datePublished`, `dateModified`, source/freshness presentation, or quick-answer presentation changed.

## 10. Explicitly deferred or excluded

- Four moderate development/build-time dependency findings remain deferred; the production audit is clean.
- The 28 untouched legacy USSD records remain in the editorial evidence-backfill queue.
- IL-01 through IL-17; QA-01 through QA-04 presentation; CI-10, CI-13, CI-19 and CI-20 treatment; query-owner content changes; and Release B remain excluded.
- No dependency, lockfile, public-output, external-service, push, PR, merge or deployment action occurred.

## 11. Complete local Release A commit list through implementation

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
20. `5d86e459c0bd60480706ea7110dd69df109f8267` — `docs(seo): record Release A.3 remediation handoff`
21. `f81970a881851a9b4a1eeceae12547e8fff8969c` — `fix(seo): enforce Release A.4 evidence policy authority`
22. Current documentation-only handoff commit — resolve `git rev-parse codex/seo-wp1-release-a4-remediation`

## 12. Review gate and rollback

- [x] Reproduced A.3 policy-authority bypasses remediated locally
- [x] Negative tests added for every reproduced bypass
- [x] Passing A.3 controls preserved
- [x] Public search output invariant
- [x] Dependency and lockfile exclusions respected
- [x] Original main worktree unchanged
- [x] No push, PR, merge, deployment, external action, or Release B work
- [ ] Independent Release A.4 approval
- [ ] Separate integration/deployment authorization

Nothing was pushed or deployed. The isolated A.4 worktree/branch can be abandoned without touching the original dirty main worktree. If later integrated, rollback should use ordinary `git revert`, not reset or clean operations against the original worktree.
