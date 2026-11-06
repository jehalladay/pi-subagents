# REQUIREMENTS AUDIT — Phase 10 step 9 (adversarial audit of the EAT requirement set)

Audited 2026-11-06T06:05Z..06:30Z. Auditor: step 9 investigator (read-only outside out/).
Pins: doc@7c80c34346c2 | pi@b27829e6dfa7 | mw@f7c0a9431d6c. Inputs: CLAIMS.jsonl a626c68ca30b, RELATIONS.jsonl f0195fb21633, REMEDIATION.md 09136019cded.
Audited artifacts (after fix): ATOMIC-REQUIREMENTS.md, CLAIM-REQUIREMENT-MAP.jsonl, TDD-MATRIX.md, BEAD-PLAN.md. Pre-fix copies: build/v0/.

## D0 — Blocker found at step start: the four input files did not exist

`build/compile.py` (step 8 output) builds the 143-requirement set in memory from CLAIMS/RELATIONS/REMEDIATION but is truncated: it ends at line 156 with no emitter, and `out/requirements/` contained no other file. Resolution: this step wrote `build/emit.py`, a judgment-free renderer of exactly the compiler’s data (verified: compiler asserts every cited claim id exists), materialized v0 of the four files, archived them at `build/v0/`, and then audited and fixed v0 in place. Verdict impact: recorded as a defect of the compiler step; the audit below applies to the materialized set.

## Defects found and fixes applied (in place; ids stable, no renumbering)

| Fix | Defect | Files edited | Edits |
|---|---|---|---|
| F1 | **Launder**: EAT-R062 cites C03114 (PLAUSIBLE) but carried the default condition "No additional unresolved condition" — a PLAUSIBLE hypothesis presented as settled design input | ATOMIC-REQUIREMENTS.md, CLAIM-REQUIREMENT-MAP.jsonl | 1 requirement; conditions now name C03114 PLAUSIBLE + HX-TASK-SCOPE-PROBE and state the control asserts no incapability |
| F2 | **Provenance loss**: the compiler dropped the REMEDIATION `Status` cell, so the 50 docs-correction requirements did not carry the triage warrant of the claim they repair | ATOMIC-REQUIREMENTS.md, CLAIM-REQUIREMENT-MAP.jsonl | 50 rows gain `remediation.status` / `[row status: ...]` |
| F3 | **Provenance gap**: relation edges were filtered to 5 types and heads-only, hiding DEPENDS_ON (235), ASSUMES (34), QUOTED_FROM (18) and tail-side edges; 16 requirements showed empty relations | ATOMIC-REQUIREMENTS.md, CLAIM-REQUIREMENT-MAP.jsonl | all 143 rows recomputed over every edge type, heads+tails, sorted, cap 12; empty-relations rows drop from 16 to 7 (those 7 cite claims with zero graph edges — claim provenance remains) |
| F4 | **Silent deferral**: REMEDIATION "Not repaired here" items (MW README.md:47 staleness, C0399 regrade, external receipt census, Forge transport evidence, missing HX pin) appeared nowhere in the requirement artifacts | BEAD-PLAN.md | 1 new "Explicit deferrals" section (6 rows, each with owner/tracking) |
| F5 | **Statement corruption**: the compiler’s sentence derivation lower-cased proper nouns and duplicated articles ("The pi MUST…" ×62, "The mW MUST…" ×6, "The the…" ×6) | ATOMIC-REQUIREMENTS.md | 74 statements normalized |
| F6 | **Misleading range**: BEAD-PLAN showed the non-contiguous docs bead as `EAT-R004..EAT-R143 (51)`, reading as 140 requirements | BEAD-PLAN.md | 1 row → `EAT-R004, EAT-R094..EAT-R143 (51)` |

fixes_applied = 6 defect classes (270 line-level edits). v0→fixed diffs: ATOMIC 366+74 lines, MAP 260 lines, PLAN 12 lines, TDD 0 lines.

## Adversarial checklist results

| Attack | Result |
|---|---|
| Requirement launders UNSUPPORTED/REFUTED/UNDETERMINED premise as fact | 1 found (EAT-R062, F1) and fixed. The 50 docs rows cite weak claims as **repair targets**, not premises; after F2 each carries the REMEDIATION row status. Post-fix sweep: 0 weak-status citations without a named status (28 requirements cite weak claims; table below). |
| Material UNDETERMINED disappeared | None. C0321 → EAT-R080 (census, UNDETERMINED named) + EAT-R129 (M036 docs row); C0368 → EAT-R039 (guardrail, "remains UNDETERMINED" in conditions) + EAT-R081 (FORGE-TRANSPORT-CENSUS) + EAT-R135 (M042). Coverage row `material-weak-claims-cited.uncited = []` (all 20 material weak claims cited). |
| Requirement without claim/relation provenance or authority (scope creep) | None. 143/143 rows carry claims + per-claim statuses + authority enum; group provenance adds slice/owner/gate. The one externally-sourced authority (standing user merge request, EAT-R004) is quoted as direction with machine admission still required. 7 requirements cite claims having zero relation edges of any type — noted, not a defect (claims provenance intact). |
| Implementation-relevant remediation not covered nor explicitly deferred | None after F4. 50/50 M rows → EAT-R094..R143 (coverage row `remediation-rows-covered.missing = []`). REMEDIATION is docs-scoped by construction; code-relevant findings arrive via claims into the behavior groups. "Not repaired here" items: W11 matrix sentence covered by EAT-R082; the rest explicitly deferred in BEAD-PLAN with owners. |
| Requirement missing from the TDD matrix | None: 143 matrix rows = 143 requirements (checked by id). Every row has a red assertion, an adversarial mutant and a gate tier; **every row is `not run`** — nothing in this phase was executed. |
| Acceptance criterion not an executable assertion | None found. 3 regex-flagged rows (EAT-R024, EAT-R034, EAT-R089) verified executable on inspection (lease-count, serializability/no-callback-injection, packed-facade install assertions). Journey-style criteria (EAT-R004, EVIDENCE_ACQUISITION rows) assert on receipts/transcripts, which the release group makes mandatory artifacts. |
| Requirement forces Pi to import MW core or implement an MW deliverable | None. The 6 MW deliverables are owner=MW, excluded from Pi beads (EAT-R088..R093); EAT-R035 census-rejects MW core/rig/deep imports; FurnaceHostedExecutor verified Pi-owned at the pin (src/workbench/hosts/furnace-hosted.ts; MW references it only in its own program doc). EAT-R070 mutant ("Pi-only retry database") and EAT-R092 mutant ("implement in MW core a Pi retry db") both make boundary violations red. |
| Bead not independently landable, or weakens an existing test | BEAD-PLAN marks per-bead landability: 14 land now, 5 partial (fixture legs now, live legs behind named gates), 6 blocked on named external gates — blocked beads are not claimed landable. No requirement or bead weakens a test: mutants encode the forbidden weakenings; B-preserve requires an explicit specification ruling before touching the conflicting false-clean characterization tests ("never weaken or delete a safety test to fit code"). |

## Launder check table (all requirements citing weak-warrant claims, post-fix)

| Req | Claim | Status | Where the status is surfaced | Role of the weak claim |
|---|---|---|---|---|
| EAT-R007 | C0534 | REFUTED | conditions name it | conditioned premise |
| EAT-R009 | C0194 | REFUTED | conditions name it | conditioned premise |
| EAT-R015 | C0353 | PLAUSIBLE | conditions name it | repair/acquisition target |
| EAT-R039 | C0368 | UNDETERMINED | conditions name it | conditioned premise |
| EAT-R053 | C0320 | REFUTED | conditions name it | repair/acquisition target |
| EAT-R057 | C03114 | PLAUSIBLE | conditions name it | repair/acquisition target |
| EAT-R062 | C03114 | PLAUSIBLE | conditions name it | conditioned premise |
| EAT-R080 | C0321 | UNDETERMINED | conditions name it | repair/acquisition target |
| EAT-R081 | C0368 | UNDETERMINED | conditions name it | repair/acquisition target |
| EAT-R104 | C0188 | REFUTED | conditions name it; remediation row status = REFUTED | repair/acquisition target |
| EAT-R105 | C0189 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R106 | C0190 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R107 | C0193 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R108 | C0194 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R109 | C0195 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R110 | C0196 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R115 | C0251 | UNSUPPORTED | remediation row status = UNSUPPORTED | repair/acquisition target |
| EAT-R123 | C0530 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R124 | C0534 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R125 | C0305 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R128 | C0320 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R129 | C0321 | UNDETERMINED | remediation row status = UNDETERMINED / overclaims | repair/acquisition target |
| EAT-R130 | C0336 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R131 | C0338 | REFUTED | remediation row status = REFUTED | repair/acquisition target |
| EAT-R133 | C0353 | PLAUSIBLE | remediation row status = PLAUSIBLE / overclaims | repair/acquisition target |
| EAT-R135 | C0368 | UNDETERMINED | remediation row status = UNDETERMINED / overclaims | repair/acquisition target |
| EAT-R137 | C03141 | UNSUPPORTED | remediation row status = UNSUPPORTED | repair/acquisition target |
| EAT-R141 | C0437 | REFUTED | remediation row status = REFUTED | repair/acquisition target |

28 requirements cite 20 weak-warrant claims; 0 rows MISSING a surfaced status.

## Pin verifications performed by this audit (receipts)

- pi@b27829e6dfa7 `src/worktree.ts:177-180`: outer catch calls `removeWorktree` then `return { hasChanges: false }` — premise of B-preserve (C0167/C0168) holds at pin.
- pi@b27829e6dfa7 `src/index.ts:~2627-2628`: detached launch sends `backend: claude ? "claude" : "deterministic"` with `grants: []` — premise of B-detached-grants (C0200/C0201) holds; cited lines 2621-2630 drifted slightly but the block is intact (drift recorded).
- pi@b27829e6dfa7 `src/workflow/runtime.ts:737` `new Semaphore(options.concurrency ?? workflowConcurrency())` and `:63-64` clamp `Math.max(1, Math.min(16, cpuCount - 2))` — EAT-R073 premise and its "production default clamps" condition both hold.
- pi@b27829e6dfa7 `src/workbench/claude-host.ts:166-175`: replay basis = cwd/model/permissionMode/settings/tools/roles/grants/principal — omits source revision, instruction bytes, provider version (C0219/C0220/C0221 hold).
- mw@f7c0a9431d6c `contracts/entrypoints/development.v1.json`: `inputSchema`/`outputSchema` are bare canonical names — the REFUTED descriptor-mismatch claims stay refuted; EAT-R009 correctly treats pin equality as positive control.
- Claim propositions behind preserve/detached-grants/replay/source/authority/outcomes/limits/docs-landing groups read from CLAIMS.jsonl and checked for entailment against their requirements (spot sample of 60+ claims); no citation found that fails to bear on its requirement.
- Not run: Forge, vitest, npm, live providers, external receipt stores. All TDD rows are `not run`.

## Residual deferrals (mirror of BEAD-PLAN "Explicit deferrals")

1. MW README.md:47 present-tense staleness — MW-owned docs edit, tracked with the MW owner (mw-contract track).
2. C0399 regrade — no doc edit owed (CLAIMS.patch.jsonl carries lineage).
3. Bounded external receipt-store census for C0321 — blocked on explicit authorization; EVIDENCE-CENSUS gate; absence claims stay scoped until then.
4. Producer-side Forge transport evidence for C0368 — FORGE-TRANSPORT-CENSUS; the EAT-R039 guardrail stays mandatory regardless of outcome.
5. HX product pin for the installed-capability probe — HX-TASK-SCOPE-PROBE must pin the version it measures.
6. MW-CONTRACT adoption (KU10, C0522 CONTESTED lineage) — selector/ABI choice stays open; contract-choice/descriptor/authority beads blocked on it; no requirement chooses a spelling.

## User merge directive disposition

The relayed user request ("start merging your work into the master branch") is carried by EAT-R004 and the BEAD-PLAN header: work lands on pi-subagents `master` only through the workbench machine landing lane, first landing = B-docs cut (program corrections + this triage). It supplies direction, not machine consent; admission and repository authorizations resolve at landing time. This audit step is read-only outside `out/` and performed no commit, merge, push or bead filing; executing the landing belongs to the orchestrator’s landing lane.

## Verdict

PASS_WITH_FIXES — the requirement set as materialized is traceable (claims+status+relations on every row), launders nothing after F1/F2, preserves every material UNDETERMINED, covers all 50 remediation rows, maps 1:1 into the TDD matrix, keeps the Pi/MW boundary, and plans only independently landable or explicitly gated beads. The step-start blocker (missing files / truncated compiler) is resolved by materialization and recorded above.
