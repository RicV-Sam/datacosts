# DataCost SEO WP1 Release A.5 remediation report

## 1. Status and authority boundary

Release A.5 is a local remediation of the findings reproduced by the Independent WP1 Release A.4 review. The authorised implementation is complete and locally validated, but the findings remain **pending independent review** and the release is **not deployment-ready**.

No branch or tag was pushed. No pull request, merge, deployment, GA4/GSC change, sitemap submission, indexing request, dependency or lockfile change, public SEO/content change, or Release B work was performed.

## 2. Starting point recorded before editing

- Reviewed worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a4-remediation`
- Reviewed branch: `codex/seo-wp1-release-a4-remediation`
- Reviewed A.4 HEAD: `4826486989acf015faa7d261a0b63e18cd424a21`
- A.4 implementation commit: `f81970a881851a9b4a1eeceae12547e8fff8969c`
- Original project baseline: `d35bb614fca0c280bd86bbc2418a2c0dbe042a5a`
- Reviewed A.4 status before isolation: clean
- A.5 worktree: `C:\Users\ricca\Desktop\DataCost\datacosts-wp1-release-a5-remediation`
- A.5 branch: `codex/seo-wp1-release-a5-remediation`
- A.5 starting HEAD and status: reviewed A.4 HEAD; clean
- Baseline and reviewed A.4 ancestry: verified, exit 0
- Node: `v24.11.0`; npm: `11.1.0`
- Dependency arrangement: A.4 has an ordinary local `node_modules`; A.5 uses a local directory junction to that unchanged install. No install or lockfile operation was performed.
- Lockfile SHA-256: `93D73DE402BEF43DC3A8362C5F5679E5B166AF7D0F9CE86F85F918D68A8344A5`
- Configured remote: `origin` at `https://github.com/RicV-Sam/datacosts.git`; A.5 upstream: none
- Original main worktree: `main` at the original baseline
- Original main status, verified unchanged: modified `package.json`; untracked `docs/social/facebook/launch-pack/`; untracked `scripts/generate-facebook-launch-assets.mjs`

The complete worktree inventory was recorded before editing. Existing Release A through A.4, validation, and Codex worktrees were left untouched.

## 3. Immutable implementation identity

- Clean-validated A.5 implementation HEAD: `48bbe00052e3e0bc3900a859ee9669c16c29ac24`
- Implementation commit: `48bbe00052e3e0bc3900a859ee9669c16c29ac24` — `fix(seo): close Release A.5 evidence authority bypasses`
- Documentation parent: `48bbe00052e3e0bc3900a859ee9669c16c29ac24`
- Final local handoff HEAD: resolve `git rev-parse codex/seo-wp1-release-a5-remediation`

A commit cannot contain its own hash without changing that hash. The implementation and documentation-parent hashes above are exact; the final documentation-only commit is identified by branch resolution.

The implementation-only diff from reviewed A.4 is exactly **6 files, 264 insertions, and 186 deletions**:

- `scripts/check-wp1-release-a.ts`
- `src/data/wp1EvidenceSubjects.ts`
- `src/data/wp1ReleaseARecords.ts`
- `src/seo/wp1SourceFreshness.ts`
- `tests/wp1-release-a-remediation-source-negative.test.ts`
- `tests/wp1-release-a-source.test.ts`

The final A.5 handoff range through the documentation-only commit contains **8 files, 398 insertions, and 372 deletions**. The complete Release A range from the original baseline through that handoff contains **43 files, 30,624 insertions, and 103 deletions**. There are no merge commits in the A.5 range.

## 4. A.5 remediation matrix

| Independent A.4 finding | Local correction | Negative proof | Status |
|---|---|---|---|
| P0: callers could construct a trusted registry and bind a price, promotion, or device subject as evergreen | Removed the exported general-purpose registry constructor. A private builder now derives a frozen authority only from the owning USSD, price, promotion, device-step, evergreen-guide, and operator collections. Validation no longer accepts a caller registry. | The constructor is absent at runtime; a supplied `evidenceSubjects` object is ignored; unregistered price, promotion, and device aliases are excluded and selection returns no sources. | Remediated locally; pending independent review |
| P0: validation and selection resolved different contexts | Selection now requires the opaque result object produced by validation. A private `WeakMap` retains the resolved policy, lifecycle strictness, as-of date, immutable source snapshot, and final record eligibility. | A new USSD record with overdue evidence is rejected by validation and selection; post-validation source mutation cannot revive an excluded record. | Remediated locally; pending independent review |
| P1: selector runtime input did not reject unexpected fields or arguments | Replaced the positional policy-facing API with one exact request object. Unknown keys, extra arguments, malformed IDs, untrusted validation results, proxies that throw, and missing records all return an empty safe state. | Both an object containing `strict`/`promotion` and a valid request followed by an extra positional argument return no sources. | Remediated locally; pending independent review |
| P1: negative tests and handoff claims overstated closure | Replaced the masked tests with direct reproductions and changed the artifacts to distinguish local remediation from independent closure. | Four focused A.5 blocker tests pass; independent review remains false in both artifacts. | Remediated locally; pending independent review |

No finding is marked independently closed solely because the committed suite passes.

## 5. Evidence authority and policy ownership

`createEvidenceSubjectRegistry` and `EvidenceSubjectCollections` are no longer exported or present. `validateReleaseAData` no longer accepts `evidenceSubjects`. The new collection-owned authority derives IDs directly from the production collections and exposes only a frozen registry view and an ID resolver; it exposes no registration or construction function. Unknown IDs fail closed with `missing_evidence_subject`.

`ContentEvidenceRecord` still rejects record-local `subjectKind`, `recordKind`, and `riskClass` fields. The private policy table remains deeply frozen and is now versioned `wp1-release-a.5`; its review intervals, promotion window requirements, minimum confidence, and always-strict settings are unchanged.

Effective strictness remains:

```text
new lifecycle
OR materially edited legacy lifecycle
OR powers quick answer
OR canonical record policy is always strict
```

## 6. Shared validation and selection context

`selectEligibleSources` accepts exactly:

```text
validationResult
contentId
candidateSourceIds
```

The validation result is an opaque capability: copied or forged result objects have no private context and fail closed. The private context stores the canonical policy, lifecycle-derived strictness, as-of date, immutable source snapshot, recursive dependency universe, and final record eligibility. Selection therefore cannot choose a semantic kind, interval, promotion treatment, minimum confidence, or strictness value.

The existing recursive evaluator remains shared. Direct and transitive checks, complete failure paths, missing references, and cycle handling remain unchanged.

## 7. Focused negative evidence

The four focused A.5 blocker proofs are:

1. No exported trusted-registry constructor exists, and a caller registry cannot register an unknown subject.
2. Price, promotion, and device records cannot regain evergreen treatment through untyped policy fields or an arbitrary registry.
3. Unexpected selector fields, extra arguments, throwing malformed objects, and post-validation mutation fail closed.
4. Selection reuses the strict lifecycle context that validation resolved for a new USSD record.

The source remediation suite is 24/24, the complete remediation-negative suite is 41/41, and the complete WP1 contract suite is 104/104.

## 8. Validation at the implementation HEAD

All results below were rerun at `48bbe00052e3e0bc3900a859ee9669c16c29ac24`; generation and builds left the tracked worktree clean.

| Check | Result |
|---|---|
| `npm run lint` / `npm run typecheck` | exit 0 |
| focused A.5 blocker tests | 4/4 |
| source remediation suite | 24/24 |
| complete remediation-negative suite | 41/41 |
| `npm run check:wp1-contracts` | 104/104; 28 expected compatibility warnings |
| `npm run build` | exit 0; SEO and AdSense output checks passed |
| `npm run check:wp1-search-regression` | 244 HTML routes, 244 titles, 207 sitemap URLs, 826 JSON-LD blocks unchanged |
| `npm run check:wp1-privacy` | passed across 215 tracked text files; 2 documented exact exceptions |
| `npx playwright test` | 39/39 browser tests |
| `npm audit --omit=dev` | 0 vulnerabilities |
| full `npm audit` | 4 existing moderate development/build-time findings; expected non-zero exit |
| Windows generation/newline checks | passed |
| `git diff --check` | clean |

No forced or breaking dependency change was attempted.

## 9. Preserved behavior and public-output invariance

The frozen legacy manifest, lifecycle classifier, strictness precedence, recursive dependency diagnostics, consent restrictions, analytics relationships, privacy exceptions, protocol-relative canonical rejection, review-date validation, search regression, JSON-LD comparison, query clusters, and Windows clean generation remain passing.

Production totals remain 33 content records: 28 untouched legacy USSD records, zero edited records, five new operator records, five strict records, and 28 backfill warnings. Stable-ID totals remain 74 occurrences and 50 unique IDs. Event totals remain 64 occurrences and 40 unique IDs. The query-cluster version remains `wp1-v1.1`.

No public title, meta description, H1, introduction, page copy, displayed USSD code, internal link, canonical, robots directive, sitemap membership, redirect, URL, breadcrumb, JSON-LD, publication/modification date, source/freshness presentation, or quick-answer presentation changed.

## 10. Deferred, excluded, and review gate

- Four moderate development/build-time dependency findings remain deferred; the production audit is clean.
- The 28 untouched legacy USSD records remain in the evidence-backfill queue.
- IL-01 through IL-17; QA-01 through QA-04 presentation; CI-10, CI-13, CI-19 and CI-20 treatment; query-owner changes; dependency work; external service actions; and Release B remain excluded.
- No push, PR, merge, deployment, external analytics/Search Console action, sitemap submission, or indexing request occurred.

- [x] A.4 bypasses reproduced and remediated locally
- [x] Focused negative tests added
- [x] Passing controls and public output preserved
- [x] Original main worktree unchanged
- [ ] Independent Release A.5 approval
- [ ] Separate integration or deployment authorization

The isolated A.5 branch can be abandoned without touching the original main worktree. If later integrated, rollback should use an ordinary `git revert`, not reset or clean operations against the original worktree.
