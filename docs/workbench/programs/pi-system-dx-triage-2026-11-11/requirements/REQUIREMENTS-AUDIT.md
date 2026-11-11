# REQUIREMENTS-AUDIT — Pi-subagents system DX/UX/LX triage, requirement set EAT-R311..EAT-R390

Audit date: 2026-11-11 (07:00–07:30Z). Auditor: requirement-set investigator (Phase 10 step 9 of the epistemic-adversarial-triage protocol).
Audited artifacts (all read at their on-disk state at audit time):

- `requirements/.work/req-r-lx.md` (EAT-R311..R340, 30 rows), `req-r-ops.md` (R341..R365, 25), `req-r-platform.md` (R366..R390, 25);
- `requirements/.work/map-r-lx.jsonl` (30 rows), `map-r-ops.jsonl` (25), `map-r-platform.jsonl` (25);
- `epistemic-triage/CLAIMS.jsonl` (267 rows: 224 defects, 43 positives; grades 240 ESTABLISHED / 26 SUPPORTED / 1 PLAUSIBLE / 0 UNDETERMINED / 0 CONTESTED / 0 REFUTED), `REMEDIATION.md` (224 defect rows), `CONTRADICTIONS.md` (43 claims named), `EPISTEMIC-AUDIT.md`, `MANIFEST.md`.

Environment pin re-verified: `hx --workspace pin-ce180d82 git refs` → `refs/heads/workbench/implementation-program ce180d82f9385a315ff26bd8e7f9202cac19f5b3`, `HEAD detached`; `git -C pin-ce180d82 rev-parse HEAD` → `ce180d82f9385a315ff26bd8e7f9202cac19f5b3`. (`refs/heads/master` has moved to c0f775e9 since the MANIFEST noted 0fb90672 — master drift, not an audit-target change.)

Instruments (user-ordered, loaded first): `hx` 0.1.0 (`/home/jehallad/.local/bin/hx`), `rf` 0.1.883 (`rf --json --version` → `ok:true`, 89 leaves / 81 reachable, `mismatch:false`; receipt `.work/reqset-audit/rf-version.json`). Bead status read with `bd --readonly --sandbox show <id> --json` from the live store (receipt `.work/reqset-audit/bd-readback.out`, 24 ids, 07:02:32Z). Scripts and intermediate JSON under `requirements/.work/reqset-audit/` (`parse.py`, `check1.py`, `check2.py`, `gen-matrix.py`, `parsed.json`, `coverage.json`, `launder-issues.json`, `path-refs.json`, `bd-scope/*.json`).

---

## Verdict: **CONDITIONAL**

The 80 compiled requirements are individually sound: ids unique and contiguous, every rationale states the ledger grade of every cited claim and none states more than the ledger permits, every requirement names type + authority + evidence tier + Maps-to + a resolving oracle, every acceptance criterion is an `Assert` naming a probe/test/census that exists under `probes/` or in the pin. The set is **not yet closed over the ledger**: 13 ESTABLISHED/SUPPORTED defect claims have neither a requirement nor an explicit deferral, four embedded UNDETERMINED legs have no EVIDENCE_ACQUISITION row, two LX-shard rows point at closed beads, two rows restate the scope of open beads, and one normative row contradicts a documented contract that an open bead asserts as a falsifier. All of these are cured by mapping/custody edits and follow-on IDs (EAT-R391+), not by re-deriving any of the 80 statements. **The set may be handed to agentic-tdd / bead filing only after F-01..F-04 land; F-05..F-15 land in the same roll-up.**

### Check results

| # | Check (from the task) | Result | Evidence |
|---|---|---|---|
| 1 | No laundering (rationale grade ≤ claim grade) | **PASS** | `check1.py`: 0 rationale/map grade statements exceed the ledger grade across 80 rows (`launder-issues.json`: 6 notes, none a launder). r-lx's blanket "every cited claim is ESTABLISHED" holds (0 non-ESTABLISHED citations). Reproduction verbs (`reproduced`/`established`/`drove`/`measured`) appear only on ESTABLISHED claims. 75/75 `epistemic_basis` statuses in map-r-ops/map-r-platform equal the ledger. |
| 2 | Ids unique, contiguous in EAT-R311..R390 | **PASS** | 80 ids, 80 unique, min 311, max 390, no gaps, none outside range; map ids == requirement ids; each shard monotone and contiguous (311–340, 341–365, 366–390). |
| 3 | Every ESTABLISHED/SUPPORTED defect claim → ≥1 requirement or explicit named deferral | **FAIL → fix F-01** | 224 defects: 126 compiled (115 EST, 10 SUP, 1 PLA), 85 explicitly deferred (71 EST, 14 SUP), **13 uncovered** (11 EST, 2 SUP): C004, C020, C023, C025, C059, C060, C066, C070, C071, C123, C124, C125, C177 (`coverage.json`). |
| 4 | Every UNDETERMINED material claim → EVIDENCE_ACQUISITION row | **CONDITIONAL → F-05** | Top-level UNDETERMINED rows: 0. Embedded UNDETERMINED legs: C096, C097 (credentialed live pty captures), C120 (outside-machine enforcement), C142 (`needs a forge gate`). Authority census: 0 EVIDENCE_ACQUISITION rows among 80. C096/C097 have a named BLOCKED-not-PASS gate inside R351/R352 criterion 3; C120 is named "remains unknown" in R387 conditions without a gate; C142's leg is in a DEFERRED table row with no gate. Also unrowed acquisition residue named by r-platform itself: C216 remote media render, C238 bind address of the rf-spawned dolt server (security-relevant), C241 cross-host portability, C245 grandchild pipe custody. |
| 5 | Stubs → cure or explicit defer | **PASS** | 12 `axis:stub` claims (C049, C055, C063, C069, C078, C102, C119, C126, C169, C182, C184, C185): all compiled into EAT-R387 (status truth) **and** explicitly deferred for implementation to named MNI/W owners (r-platform "Cross-family scope not silently implemented"; r-ops table rows for C049/C078/C102/C169). No stub is cured by implication. |
| 6 | Each requirement names family + V-tier + Maps-to | **PASS (vocabulary split → F-07, F-11)** | 80/80 carry Type, Authority, Statement, Rationale, Evidence tier target, Maps-to; 80/80 have acceptance criteria (57×3, 19×2, 4×4 = 234 criteria, 234 start with `Assert`), 80/80 name a resolving oracle. r-lx Maps-to names the ledger family (agents/execute/observe/interop); r-ops/r-platform Maps-to names W/VC groups and map-r-ops rows carry no `family` key. |
| 7 | Overlaps with existing live beads (extend-not-duplicate) | **CONDITIONAL → F-02, F-03, F-04, F-12** | 24 bead ids read live. Stale: wb-9x5.16 (R328, R331) and wb-79k.1/.2 (R329) are **closed**, consolidated into wb-9x5.11 / wb-79k.3. Duplicate-risk: R349 ≈ wb-752.13 (in_progress) scope; R374 ≈ wb-79k.3 (open) scope. Conflict: R345 vs docs/workbench/08 contract asserted by wb-0kg.3's falsifier. wb-jwc.7 (R367) is closed/landed. |
| 8 | Oracle/path resolution | **PASS** | 81 path-like references (probes/<family>/…, test/…, qa/workbench/…, src/…, docs/…) and 52 bare probe names resolve under `probes/` or `pin-ce180d82/` (`path-refs.json`; the three regex "misses" were `.json` files that exist). Red-first anchors quoted at exact lines verified: `test/workbench-pi-observe.test.ts:231` (R329), `test/workbench-function-authority.test.ts:1683` (R337), `test/workbench-ecosystem-native.test.ts:17` (C241). |

---

## Fix list (ordered; severity = what it blocks)

| Id | Severity | Affects | Defect | Smallest cure |
|---|---|---|---|---|
| **F-01** | **BLOCKING (handoff)** | ledger closure | 13 ESTABLISHED/SUPPORTED defect claims have no requirement and no explicit deferral (table below). Several are high-impact journey breaks: C059 (catalog hands out refs execute refuses), C060 (same digest behaves differently by hostMode, nested workflow fatal on detached, unannounced), C177 (forge_gate_run operation never readable back by the agent), C123 (coordination boundary runs synchronously on the host loop with no deadline/abort), C125 (a FIFO at descriptorPath hangs the host and keeps the process alive), C023 (unhandled promise rejections at shutdown), C004 (two model resolvers for one `model:` key). | In the parent roll-up: mint follow-on atomic requirements EAT-R391+ for the ESTABLISHED journey breaks (C059, C060, C177, C123, C125, C023, C004 at minimum) and table the rest as `DEFERRED_FOR_RANGE_CAPACITY` with the investigator cureHint as the uncompiled basis. No omission may stay silent. |
| **F-02** | **BLOCKING (filing)** | R328, R329, R331; req-r-lx.md header | Maps-to names closed beads as live: wb-9x5.16 (closed 2026-11-11, "Consolidated … into wb-9x5.11"), wb-79k.1/wb-79k.2 (closed, "Consolidated … into wb-79k.3"). The r-lx header lists wb-9x5.16 and wb-79k.1/.2 among "open live beads". | Repoint R328/R331 to **wb-9x5.11** and R329 to **wb-79k.3** only; fix the header list; carry the closed ids as lineage, never as filing targets. |
| **F-03** | **HIGH (extend-not-duplicate)** | R349, R374 | R349 ("Registered furnace_observe MUST return … through the bounded sanitized workbench.tool-reply/v1 contract") restates wb-752.13's in_progress scope ("the reply becomes the landed wb-752.2 observe reply shape … contract = TOOL_REPLY_CONTRACT_VERSION … bounded snapshot rows, event-window metadata"). R374 ("ingest HX and RF read results through the landed provider reader adapters into its scope-bound observation projection") restates wb-79k.3's open scope (title "host-owned HX, RF-preview and detached observation projection wiring", the consolidation target of wb-79k.1/.2). | File both as **acceptance-criteria extensions on the existing beads** (R349's refusal-dialect + 20-Attempt truncation legs onto wb-752.13; R374's coverage-honesty + grant-gating legs onto wb-79k.3), not as new beads. Keep the EAT ids as provenance on the bead notes. |
| **F-04** | **HIGH (design conflict)** | R345 | R345 (NORMATIVE_DECISION) requires a detached host to persist a saved terminal observation that a fresh-process inspect returns "marked saved". docs/workbench/08-lifecycle-and-recovery.md states "Inspection after host loss reports unknown with producer reconciliation guidance; it does not replay a saved terminal verdict or rerun JavaScript", and open bead wb-0kg.3's acceptance asserts that as a falsifier ("never a replayed verdict"). R345 distinguishes graceful expiry from host kill, but the shipped contract does not. | Route to an owner ruling before implementation: amend docs/08 to distinguish *graceful retirement with a labeled saved observation* from *host loss → unknown*, and re-scope wb-0kg.3's falsifier accordingly; until then every R345 cell is `A*(G-RULING)` = BLOCKED (TDD-MATRIX). |
| **F-05** | **MEDIUM** | R351, R352, R387, R376; deferred C142, C238, C241, C245 | No requirement carries `EVIDENCE_ACQUISITION` authority although the set names eight unknowns: C096/C097 live pty captures (gated inside R351/R352 c3 — acceptable form, authority not recorded), C120 outside-machine enforcement (named unknown, no gate), C142 "forge was not run" against bound evidence (deferred, no gate), C238 bind address of the rf-launched `dolt sql-server` **unexamined** (listening port; security-relevant), C216 remote registry render (PLAUSIBLE), C241 cross-host portability, C245 grandchild pipe custody. | Mint EVIDENCE_ACQUISITION rows (EAT-R391+) or record each as a named `A*` gate; this audit's TDD-MATRIX registers G-PTY (BLOCKED: credentialed session + `qa/workbench/live-inspector-receipt.mjs`, absent at pin) and G-EXTERNAL-ENFORCEMENT (BLOCKED: no artifact). C238's bind-address check is a ≤5-minute `ss -ltnp` oracle on the probe workspace and should be run before any bead claims the daemon is loopback-only. |
| **F-06** | **MEDIUM** | all three map files | Three incompatible row schemas: map-r-lx rows have `req, claims, authority, derivation, family, verification, existingBead (scalar/null), priorEAT, conditions` and no `epistemic_basis`/`type`/`oracle`/`acceptanceState`/`scope`; map-r-ops/map-r-platform rows have `existingBeads` (array), `epistemic_basis`, `oracle`, `acceptanceState`, `scope`, `dependsOnCompiled`; map-r-ops has no `family` key. None uses the skill's recommended keys (`requirement`, `derived_from`, `verification` as an L-tier list). | Emit one `requirements/CLAIM-REQUIREMENT-MAP.jsonl` in the canonical shape (`requirement, type, authority, derived_from, epistemic_basis[{id,status}], derivation, conditions[], verification[L…]`) plus `family`, `existingBeads[]`, `oracle`, `acceptanceState:"NOT_RUN"`, `scope`. Grades copied from the ledger (this audit found 0 mismatches to carry over). |
| **F-07** | **MEDIUM** | evidence tiers | The shards define **conflicting V ladders**: r-lx V2 = packed/installed consumer, V4 = joined native producer CLIs; r-ops/r-platform V6 = native producers, V4 = Mechanical ABI/native path, and r-ops says V2/V4 "are not silently awarded". r-lx rows therefore cannot be read with r-platform's key. | Adopt one ladder in the roll-up; TDD-MATRIX.md carries the normalization table and maps every row to L-tiers. |
| **F-08** | **MEDIUM** | C045, C157, C203, C213, C229, C083, C168, C110, C161, C172, C145, C049, C078, C102, C169 | Cross-shard disposition conflicts and un-executed attachments: r-platform prose attaches C229→R363, C157/C045/C203→R327, C213→R339, C083→R349/R367, yet none of those claims appears in the target requirement's rationale or map row, and C045/C157/C083 are `DEFERRED_FOR_RANGE_CAPACITY` in r-ops' table while C229 is DEFERRED in r-platform's own table. C168 is tabled DEFERRED in r-ops but compiled by R372; C110/C161/C172/C145 tabled DEFERRED in r-ops but compiled by R387/R357; C049/C078/C102/C169 carry both a DEFERRED row and an R387 status-truth mapping (consistent only if read as "status compiled, implementation deferred"). | One disposition per claim in the roll-up map: attached claims go into the target row's `derived_from`/`epistemic_basis`; dual rows become `compiled: <id>; implementation residual: <text>`. |
| **F-09** | **LOW** | R321, R322, R328, R357, R326 | map.claims cites positives the rationale does not (C074→R321, C073→R322, C194→R328 — they are preservation controls named under Conditions); R357's rationale cites C145 without its grade and the map omits it; R326 cites C030 (positive precedent) without its grade. | Add the grade words; put C145 in R357's map row; move preservation controls to a `preserves[]` key so `derived_from` stays the derivation basis. |
| **F-10** | **LOW** | R315, R319, R328, R329, R330, R332, R335 (3 MUSTs); 13 rows with 2 | Atomicity: r-platform's contract "one statement is one independently testable invariant" is not met by the r-lx shard's compound statements (e.g. R319 bundles notification naming + a budget setting + multi-id `get_subagent_result`). | At bead filing split each compound row into one child bead per acceptance criterion; keep the EAT id as the parent. No re-derivation needed — each criterion already names its oracle. |
| **F-11** | **LOW** | r-ops/r-platform rows | "Family" is expressed in two vocabularies: ledger family (agents/detached/execute/furnace/inspector/interop/journal/node-rpc/observe/packaging/providers/scheduling) in r-lx vs W/VC workbench groups in r-ops/r-platform; map-r-ops rows have no `family` key. | Add the ledger family (derivable from the claims) to every map row beside the W/VC group. |
| **F-12** | **LOW** | R367 c4 | Conditions say "wb-jwc.7 pins the noncommitted preview stderr-discard/kill custody … BLOCKED pending an explicit amendment". wb-jwc.7 is **closed** (landed, "landing 1052 … merge 0ebfd9ce"), so the pin is landed code/test, not an open bead. | Reword: "BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed)"; name the test file that pins it as the artifact. |
| **F-13** | **INFO** | 15 claims | Explicit but **prose-only** deferrals (no table row): C002, C003, C005, C014, C021, C022, C050, C051, C052, C054, C062, C068, C116, C178, C193 (table below). Acceptable as "explicit named deferral"; several are high-impact (C002 fail-open fallback tier, C062 workflow master-switch bypass, C054 embedded model stop, C014/C051 result custody). | Table them with reason + cureHint in the roll-up residual queue; prioritise C002, C062, C054, C014/C051 for EAT-R391+. |
| **F-14** | **INFO** | positives C032, C075, C155, C197 | Four positives are cited by no requirement block (they appear only in the r-platform "Positive regression queue" prose and the r-lx header). | Map each to an existing retained test or a narrow NEGATIVE_REGRESSION row in the roll-up. |
| **F-15** | **INFO** | R366 Conditions | "The vendored SDK drops edge/answer information" is overstated: `node_modules/@hyperunix/sdk/dist/execution.js:8-9` streams answer projections as distinct events (`events()`), `result.js:184/439` carries `answerCount`; only the `find()`/`rows()` path the provider uses (`src/workbench/providers/hyperunix.ts:21,42`) yields node-claim bodies only. | Reword the condition: the cure consumes `events()` answer projections; R366 is not SDK-blocked (G-HX AVAILABLE). |

Issue count for the structured return: **15** (F-01..F-15).

---

## 1. Requirement inventory by type and authority

| Type | Authority | Count |
|---|---|---|
| BEHAVIORAL | EMPIRICAL_REPAIR | 58 |
| REPRESENTATION | LINGUISTIC_INTEGRITY | 7 |
| REPRESENTATION | EMPIRICAL_REPAIR | 4 |
| NORMATIVE_DESIGN | NORMATIVE_DECISION | 3 |
| NEGATIVE_REGRESSION | NORMATIVE_DECISION | 3 |
| INSTRUMENTATION | EMPIRICAL_REPAIR | 2 |
| BEHAVIORAL | NORMATIVE_DECISION | 1 |
| REPRESENTATION | NORMATIVE_DECISION | 1 |
| NEGATIVE_REGRESSION | RISK_CONTROL | 1 |

Totals: 80 requirements — BEHAVIORAL 59, REPRESENTATION 12, NEGATIVE_REGRESSION 4, NORMATIVE_DESIGN 3, INSTRUMENTATION 2, VERIFICATION 0; EMPIRICAL_REPAIR 64, NORMATIVE_DECISION 8, LINGUISTIC_INTEGRITY 7, RISK_CONTROL 1, **EVIDENCE_ACQUISITION 0** (see F-05). Shard evidence-tier targets as written: V3 ×41, V5 ×16, V6 ×12, V2 ×7, V1 ×3, V0 ×1 (normalized in TDD-MATRIX.md).

## 2. Requirement → claim provenance (every row; L0 = this audit's per-row verdict)

| Requirement | Shard | Type | Authority | Epistemic basis (ledger grade) | Shard V | Live beads named (status 2026-11-11 07:02Z) | Prior EAT lineage | L0 |
|---|---|---|---|---|---|---|---|---|
| EAT-R311 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C001(EST), C009(EST) | V3 | none (new) | EAT-R313 | PASS |
| EAT-R312 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C001(EST), C029(EST) | V3 | none (new) | EAT-R311 | PASS |
| EAT-R313 | r-lx | REPRESENTATION | EMPIRICAL_REPAIR | C007(EST), C008(EST), C010(EST), C011(EST) | V3 | none (new) | — | PASS |
| EAT-R314 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C007(EST), C016(EST) | V3 | none (new) | EAT-R313 | PASS |
| EAT-R315 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C012(EST), C013(EST) | V3 | none (new) | — | COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R316 | r-lx | INSTRUMENTATION | EMPIRICAL_REPAIR | C006(EST), C017(EST) | V3 | none (new) | — | PASS |
| EAT-R317 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C018(EST) | V3 | none (new) | — | PASS |
| EAT-R318 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C019(EST), C026(EST) | V3 | none (new) | — | PASS |
| EAT-R319 | r-lx | BEHAVIORAL | NORMATIVE_DECISION | C015(EST) | V3 | none (new) | — | COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R320 | r-lx | REPRESENTATION | EMPIRICAL_REPAIR | C024(EST) | V3 | none (new) | — | PASS |
| EAT-R321 | r-lx | REPRESENTATION | EMPIRICAL_REPAIR | C053(EST), C065(EST), C074(EST) | V3 | wb-0kg.3[in_progress], wb-69g.12[in_progress] | — | COND(F-09 C074 map-only) |
| EAT-R322 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C056(EST), C073(EST) | V3 | none (new) | — | COND(F-09 C073 map-only) |
| EAT-R323 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C057(EST) | V3 | none (new) | — | PASS |
| EAT-R324 | r-lx | REPRESENTATION | EMPIRICAL_REPAIR | C058(EST) | V3 | wb-69g.12[in_progress] | — | PASS |
| EAT-R325 | r-lx | REPRESENTATION | LINGUISTIC_INTEGRITY | C061(EST) | V3 | none (new) | — | PASS |
| EAT-R326 | r-lx | NORMATIVE_DESIGN | NORMATIVE_DECISION | C030(EST), C067(EST) | V3 | none (new) | — | COND(F-09 C030 grade not stated) |
| EAT-R327 | r-lx | REPRESENTATION | LINGUISTIC_INTEGRITY | C064(EST), C191(EST) | V2 | none (new) | EAT-R290, EAT-R306 | COND(F-08 C203/C045/C157 attachments not in map) |
| EAT-R328 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C179(EST), C194(EST) | V3 | wb-9x5.16[closed] | — | COND(F-02 wb-9x5.16 closed->wb-9x5.11; F-09 C194 map-only); COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R329 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C180(EST) | V3 | wb-79k.1[closed] | EAT-R243 | COND(F-02 wb-79k.1/.2 closed->wb-79k.3); COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R330 | r-lx | INSTRUMENTATION | EMPIRICAL_REPAIR | C181(EST) | V3 | none (new) | EAT-R248 | COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R331 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C183(EST) | V3 | wb-9x5.16[closed] | — | COND(F-02 wb-9x5.16 closed->wb-9x5.11) |
| EAT-R332 | r-lx | REPRESENTATION | NORMATIVE_DECISION | C058(EST), C186(EST) | V3 | none (new) | EAT-R324 | COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R333 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C187(EST), C196(EST) | V3 | wb-752.13[in_progress], wb-h8f.7[open] | — | PASS |
| EAT-R334 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C188(EST) | V3 | none (new) | — | PASS |
| EAT-R335 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C189(EST) | V3 | none (new) | — | COND(F-10 three-MUST statement: split per criterion at filing) |
| EAT-R336 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C190(EST) | V3 | wb-6ze.15[in_progress] | — | PASS |
| EAT-R337 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C118(EST), C122(EST), C127(EST) | V1 today | none (new) | EAT-R204, EAT-R265, EAT-R267 | PASS |
| EAT-R338 | r-lx | BEHAVIORAL | EMPIRICAL_REPAIR | C128(EST), C129(EST) | V1 | none (new) | EAT-R268 | PASS |
| EAT-R339 | r-lx | REPRESENTATION | LINGUISTIC_INTEGRITY | C130(EST) | V2 | wb-yiu4[open] | EAT-R290, EAT-R306 | COND(F-08 C213 attachment not in map) |
| EAT-R340 | r-lx | NORMATIVE_DESIGN | NORMATIVE_DECISION | C131(EST) | V1 | none (new) | — | PASS |
| EAT-R341 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C034(EST) | V5 | wb-0kg.3[in_progress] | — | PASS |
| EAT-R342 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C037(EST) | V5 | wb-0kg.3[in_progress] | — | PASS |
| EAT-R343 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C033(EST), C042(EST) | V5 | wb-0kg.3[in_progress], wb-79k.3[open] | EAT-R296 | PASS |
| EAT-R344 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C036(EST) | V5 | wb-0kg.3[in_progress] | EAT-R296 | PASS |
| EAT-R345 | r-ops | NORMATIVE_DESIGN | NORMATIVE_DECISION | C035(EST), C041(EST) | V5 | wb-0kg.3[in_progress] | EAT-R296 | COND(F-04 conflicts docs/workbench/08 + wb-0kg.3 falsifier: owner ruling owed) |
| EAT-R346 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C076(EST), C077(SUP), C093(EST) | V6 | wb-752.12[closed], wb-752.13[in_progress] | EAT-R297 | PASS |
| EAT-R347 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C079(EST) | V3 | wb-752.13[in_progress] | — | PASS |
| EAT-R348 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C080(EST), C093(EST) | V6 | wb-752.13[in_progress] | — | PASS |
| EAT-R349 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C082(EST), C091(EST), C094(EST) | V6 | wb-752.12[closed], wb-752.13[in_progress], wb-h8f.7[open] | — | COND(F-03 restates wb-752.13 scope: file as extension) |
| EAT-R350 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C095(EST), C112(EST) | V5 | wb-6ze.15[in_progress], wb-9x5.11[in_progress] | — | PASS |
| EAT-R351 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C096(EST) | V5 | wb-6ze.15[in_progress], wb-9x5.11[in_progress] | — | COND(F-05 pty gate has no EVIDENCE_ACQUISITION row) |
| EAT-R352 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C097(EST), C114(EST) | V5 | wb-6ze.15[in_progress], wb-79k.3[open] | — | COND(F-05 pty gate has no EVIDENCE_ACQUISITION row) |
| EAT-R353 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C098(EST), C114(EST) | V5 | wb-6ze.15[in_progress] | — | PASS |
| EAT-R354 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C103(EST) | V5 | wb-6ze.15[in_progress], wb-9x5.11[in_progress] | — | PASS |
| EAT-R355 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C100(EST) | V5 | wb-6ze.15[in_progress] | — | PASS |
| EAT-R356 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C105(EST), C113(EST) | V5 | wb-6ze.15[in_progress], wb-9x5.11[in_progress], wb-9x5.16[closed] | — | PASS |
| EAT-R357 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C134(EST), C145(EST), C146(EST), C153(EST) | V5 | none (new) | EAT-R256, EAT-R278 | COND(F-09 C145 cited without grade, absent from map; F-08 dual disposition) |
| EAT-R358 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C135(EST), C153(EST) | V3 | none (new) | EAT-R238, EAT-R256 | PASS |
| EAT-R359 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C138(EST), C154(EST) | V5 | none (new) | EAT-R256, EAT-R278 | PASS |
| EAT-R360 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C144(EST), C175(EST) | V3 | none (new) | EAT-R256 | PASS |
| EAT-R361 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C136(EST), C137(EST), C159(EST) | V3 | none (new) | — | PASS |
| EAT-R362 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C160(EST) | V3 | none (new) | EAT-R256 | PASS |
| EAT-R363 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C156(EST), C174(EST) | V3 | none (new) | EAT-R238 | COND(F-08 C229 attachment vs table deferral) |
| EAT-R364 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C158(EST), C174(EST) | V3 | none (new) | — | PASS |
| EAT-R365 | r-ops | BEHAVIORAL | EMPIRICAL_REPAIR | C147(EST) | V3 | none (new) | — | PASS |
| EAT-R366 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C217(EST), C218(EST) | V6 | wb-lri[in_progress] | EAT-R247, EAT-R248, EAT-R299 | COND(F-15 condition overstated: vendored @hyperunix/sdk 0.1.0 exposes answer projections via events() and answerCount; only the find()/rows() path drops them) |
| EAT-R367 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C221(EST), C222(EST), C223(EST), C240(EST), C244(EST) | V6 | wb-5uh[in_progress], wb-jwc.7[closed], wb-lri[in_progress], wb-x32[in_progress] | EAT-R40, EAT-R363, EAT-R364 | COND(F-12 wb-jwc.7 is closed/landed, not an open bead; F-08 C083 attach) |
| EAT-R368 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C220(EST), C242(EST) | V3 | none (new) | EAT-R290 | PASS |
| EAT-R369 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C231(EST), C243(EST) | V3 | wb-f5y[in_progress] | EAT-R227, EAT-R228 | PASS |
| EAT-R370 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C232(EST) | V6 | wb-5uh[in_progress], wb-lri[in_progress], wb-x32[in_progress] | — | PASS |
| EAT-R371 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C226(EST) | V6 | wb-x32[in_progress] | — | PASS |
| EAT-R372 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C168(SUP), C233(EST), C245(EST) | V6 | wb-x32[in_progress] | EAT-R74, EAT-R75 | COND(F-08 C168 tabled DEFERRED in r-ops yet compiled here) |
| EAT-R373 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C224(EST) | V6 | wb-79k.3[open] | EAT-R239, EAT-R243 | PASS |
| EAT-R374 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C225(EST), C246(EST) | V6 | wb-79k.1[closed], wb-79k.3[open] | EAT-R248, EAT-R299, EAT-R300, EAT-R373 | COND(F-03 restates wb-79k.3 scope: file as extension) |
| EAT-R375 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C239(EST) | V3 | wb-4ax[closed] | — | PASS |
| EAT-R376 | r-platform | REPRESENTATION | LINGUISTIC_INTEGRITY | C199(EST), C210(SUP), C216(PLA) | V2 | wb-cax[in_progress] | EAT-R286 | COND(F-05 C216 PLAUSIBLE remote render: acquisition residual unrowed) |
| EAT-R377 | r-platform | REPRESENTATION | LINGUISTIC_INTEGRITY | C200(EST), C202(EST), C208(EST), C214(EST) | V2 | wb-cax[in_progress] | EAT-R286 | PASS |
| EAT-R378 | r-platform | NEGATIVE_REGRESSION | RISK_CONTROL | C205(SUP), C206(EST), C207(EST), C211(EST) | V2 | wb-cax[in_progress] | EAT-R271 | PASS |
| EAT-R379 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C248(EST), C249(EST), C267(EST) | V3 | none (new) | — | PASS |
| EAT-R380 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C250(EST), C266(EST) | V3 | none (new) | — | PASS |
| EAT-R381 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C252(EST), C265(EST) | V5 | none (new) | — | PASS |
| EAT-R382 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C251(EST), C265(EST) | V5 | none (new) | — | PASS |
| EAT-R383 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C249(EST), C255(EST) | V3 | none (new) | EAT-R379 | PASS |
| EAT-R384 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C261(EST), C267(EST) | V3 | none (new) | — | PASS |
| EAT-R385 | r-platform | BEHAVIORAL | EMPIRICAL_REPAIR | C262(EST) | V3 | none (new) | — | PASS |
| EAT-R386 | r-platform | REPRESENTATION | LINGUISTIC_INTEGRITY | C258(EST), C259(SUP), C260(EST), C263(EST) | V2 | wb-cax[in_progress], wb-yiu4[open] | EAT-R290, EAT-R379, EAT-R384, EAT-R385 | PASS |
| EAT-R387 | r-platform | REPRESENTATION | LINGUISTIC_INTEGRITY | C049(SUP), C055(EST), C063(EST), C069(SUP), C078(EST), C102(EST), C110(EST), C115(EST), C117(EST), C119(EST), C120(EST), C121(EST), C126(EST), C161(EST), C169(SUP), C172(EST), C182(EST), C184(EST), C185(SUP), C192(EST), C209(SUP), C225(EST) | V0 | wb-2ukh[open], wb-4bxo[open], wb-752.13[in_progress], wb-79k.3[open], wb-cax[in_progress], wb-h8f.7[open], wb-y0n6[in_progress], wb-yiu4[open] | EAT-R82, EAT-R167, EAT-R293, EAT-R306, EAT-R310 | COND(F-05 C120 outside-machine unknown has no acquisition gate; F-08 C049/C078/C102/C169/C110/C161/C172 dual disposition) |
| EAT-R388 | r-platform | NEGATIVE_REGRESSION | NORMATIVE_DECISION | C206(EST), C207(EST), C208(EST), C211(EST), C214(EST) | V2 | wb-cax[in_progress] | EAT-R271, EAT-R286, EAT-R288, EAT-R376, EAT-R377, EAT-R378 | PASS |
| EAT-R389 | r-platform | NEGATIVE_REGRESSION | NORMATIVE_DECISION | C031(EST), C072(EST), C243(EST), C245(EST), C246(EST) | V6 | wb-f5y[in_progress] | EAT-R227, EAT-R228, EAT-R238, EAT-R367, EAT-R368, EAT-R369, EAT-R370, EAT-R371, EAT-R375 | PASS |
| EAT-R390 | r-platform | NEGATIVE_REGRESSION | NORMATIVE_DECISION | C041(EST), C094(EST), C114(EST), C132(EST), C133(EST), C175(EST), C194(EST), C195(EST), C196(EST), C198(EST), C247(EST) | V6 | wb-752.12[closed], wb-752.13[in_progress], wb-79k.3[open], wb-9x5.10[closed], wb-9x5.11[in_progress], wb-h8f.2[open], wb-h8f.7[open], wb-yiu4[open] | EAT-R248, EAT-R263, EAT-R287, EAT-R289, EAT-R310, EAT-R374, EAT-R387 | PASS |

Every one of the 80 rows traces to ≥1 ledger claim (no requirement without provenance); 0 cited claim ids are absent from the ledger; `priorEAT` references are lineage only (prior text historical), as every shard states.

## 3. Empirical rationales preserve status, scope, time/version

- Grade words: every rationale states the ledger grade of every cited defect claim (`check1.py` found the only unstated grades on three *positive* precedents — C030 in R326, C194 in R328 (map-only), C145 in R357 — F-09). Grouped forms ("C049/C069/C169/C185/C209 are SUPPORTED code-read claims, not reproductions", R387) match the ledger exactly.
- Scope/time: 80/80 rationales pin "at ce180d82" / "2026-11-11"; r-ops/r-platform rows carry `scope: ce180d82…, 2026-11-11` in the map; r-lx states it once in the header and per-rationale cites the probe receipts.
- SUPPORTED premises kept SUPPORTED: C077 (R346 "only supports the missing follow-up ownership claim at its detection surface"), C168 (R372 "not reproduction of every limit"), C205 (R378 "no stale distribution was reproduced"), C210/C216 (R376), C259 (R386 "by code read, not overnight result loss reproduction"), C049/C069/C169/C185/C209 (R387), C160's duplicate-tail leg (R362 "only PLAUSIBLE … not asserted as observed"), C001's nested leg (R312 "SUPPORTED at src/agent-manager.ts:1229, src/nested-tools.ts:189").
- Statements do not assert SUPPORTED/PLAUSIBLE premises as fact: R378 is NEGATIVE_REGRESSION under RISK_CONTROL (correct form for a SUPPORTED-only basis); R376's MUST rests on C199 ESTABLISHED, C216 PLAUSIBLE appears only as a prediction with "no remote rendering was measured".

## 4. UNDETERMINED operational findings → named gates

Ledger: 0 top-level UNDETERMINED rows (EPISTEMIC-AUDIT.md line 20). Embedded legs and the gates this audit assigns (TDD-MATRIX gate registry):

| Unknown | Where it lives | Gate | Status |
|---|---|---|---|
| C096 live pty capture of the transcript card counter | R351 c3 ("missing credentials records BLOCKED, not PASS") | G-PTY | BLOCKED — credentialed Pi session + `qa/workbench/live-inspector-receipt.mjs` (wb-6ze.15 deliverable, absent at pin) |
| C097 credentialed four-view pty capture | R352 c3 | G-PTY | BLOCKED (same artifacts) |
| C120 outside-machine enforcement of the same-cut rule | R387 Conditions ("remains unknown; repository enforcement is the named detection surface") | G-EXTERNAL-ENFORCEMENT | BLOCKED — no outside-machine artifact named at the pin |
| C142 "forge was not run" against bound producer evidence | r-ops residual table (DEFERRED) | none | **unrowed → F-05** (forge 0.2.1 is on PATH, so the acquisition is runnable) |
| C238 bind address of the rf-owned `dolt sql-server` (port 52443 observed, bind not examined) | r-platform residual table (DEFERRED) | none | **unrowed → F-05** (security-relevant; dolt 2.2.4 + rf present) |
| C216 registry-page media render | R376 Conditions / disposition table ("acquire a fork manifest registry render before a media defect claim") | G-NPM (network) | unrowed as a requirement → F-05 |
| C241 cross-host portability of the native tier | r-platform disposition table (DEFERRED, SUPPORTED) | none | unrowed → F-05 |
| C245 grandchild pipe retention | R372/R389 Conditions ("not closed by C245 and must not be certified here") | none | unrowed → F-05 |

## 5. CONTESTED findings

Ledger: 0 CONTESTED rows. One **design** conflict surfaced by this audit between a compiled normative row and a shipped contract that an open bead asserts as a falsifier: R345 vs docs/workbench/08-lifecycle-and-recovery.md:67 (sentence verified at the pin) + wb-0kg.3 (F-04). It is recorded as a conflict, not resolved here; every R345 cell is gated on G-RULING.

## 6. REFUTED / UNSUPPORTED laundering

Ledger: 0 REFUTED, 0 UNSUPPORTED rows — nothing to launder. Negative check: no requirement statement asserts a proposition the ledger grades below SUPPORTED (the single PLAUSIBLE claim, C216, generates no MUST).

## 7. Mandatory requirements on uncertain evidence → explicit non-epistemic authority

- R378 (basis C205 SUPPORTED only): authority **RISK_CONTROL**, type NEGATIVE_REGRESSION — correct.
- R376 (C199 EST + C210 SUP + C216 PLA): authority LINGUISTIC_INTEGRITY; the mandate rests on the ESTABLISHED premise — correct.
- R345 (C035/C041 ESTABLISHED, but the *remedy* is a product choice): authority NORMATIVE_DECISION — correct form; blocked by F-04 for a different reason.
- No EMPIRICAL_REPAIR row rests on SUPPORTED/PLAUSIBLE defects alone (`check1.py` second pass: 0 hits).

## 8. NON-EPISTEMIC / normative rows marked as decisions, not discoveries

Eight rows carry NORMATIVE_DECISION and say so in their rationale: R319 (README:78 documented design → "experience-standard decision"), R326 ("compact Agent description is the in-repo precedent"), R332 ("the experience standard the repo itself sets upstream"), R340 ("adopted readability/robustness standard"), R345 ("explicit product decision"), R388/R389/R390 ("regression protection is an explicit experience standard"; "scoped positives, not a global security certification"; "evidence-grade conservation"). Numeric budgets are flagged normative where chosen (R318 default budget, R326 ≤4,096 bytes, R367 1,024-byte diagnostic budget, R377 floor policy, R382 retry budget).

## 9. Atomicity and executable acceptance criteria

- 234 criteria; 234 begin with `Assert`; 80/80 rows name at least one oracle (probe file, repo test, qa script, census or counter); all 81 path references and 52 bare probe names resolve (`path-refs.json`).
- Atomicity: 60 statements carry one MUST, 13 carry two, 7 carry three (all seven in r-lx: R315, R319, R328, R329, R330, R332, R335) — F-10. Each criterion is independently assertable, so splitting at filing time loses nothing.
- Conditions: 17 rows state `none`; the rest name exact unknowns or design choices. The 30 r-lx rows have no separate `Probe oracle` field but embed the oracle in every criterion (`probes/<family>/RUN.sh <probe> -t <case>` or a named qa/test oracle).

## 10. TDD-matrix coverage

`requirements/TDD-MATRIX.md`: **80 rows** (one per requirement, verified by `grep -c '^| EAT-R'` = 80, 19 fields per row), L0 = this audit's verdict per row (PASS ×55, COND ×25), L1–L10 cells `A`/`A*(gate)`/`S`/`·` with a justification column, a gate registry with host-measured status (AVAILABLE/NOT_RUN vs BLOCKED + exact artifact), and the V→L normalization table (F-07). Every cell is NOT_RUN unless marked BLOCKED; no green is claimed.

## 11. Implementation-relevant remediation covered or explicitly deferred

| State | Defects | Grades |
|---|---|---|
| Compiled into ≥1 requirement | 126 | 115 EST, 10 SUP, 1 PLA |
| Explicitly deferred (table row or named prose) | 85 | 71 EST, 14 SUP |
| **Uncovered — neither** | **13** | 11 EST, 2 SUP |

Per family (compiled / deferred / uncovered): agents 16/6/4 · detached 6/9/0 · execute 11/6/5 · furnace 7/10/0 · inspector 9/8/0 · interop 13/1/3 · journal 9/10/0 · node-rpc 8/11/0 · observe 14/2/1 · packaging 7/6/0 · providers 14/11/0 · scheduling 12/5/0. All 43 claims named in CONTRADICTIONS.md are compiled or deferred (0 uncovered).

### 11a. Uncovered defect claims (F-01) — the parent must row or table each one

| Claim | Grade | Family | Axis | Claim (abridged) | Cost (who hurts) | Investigator cureHint (abridged) |
|---|---|---|---|---|---|---|
| C004 | ESTABLISHED | agents | gap | An agent file's `model:` goes through two different resolvers depending on how the agent is started. The Agent tool uses the fuzzy resolver; a direct @mention, the scheduler, cross-extension RPC and a from-disk resume use an exact provider/id lookup and silen… | Operators who start agents by direct @mention, schedule or RPC (e.g. pi-tasks). The 'fast/cheap' agent silently runs on the most expensive model wher… | Use resolveModel() at src/agent-runner.ts:832 so every start path shares one resolver, and report an unresolved pin instead of falling back silently. |
| C020 | ESTABLISHED | agents | DX | An agent whose `name:` contains a space, which the loader deliberately allows, cannot be spawned once it sets `memory:`, and the failure appears only at spawn time. Separately, a read-only agent's memory block omits the memory directory, so the files its MEMO… | Agent authors who use human-readable names with memory (every spawn fails) and every read-only agent with memory (the index is visible, the linked no… | Derive the memory directory from a slug (handleBase) or reject the combination at load with the file named; add the directory line to the read-only block. |
| C023 | ESTABLISHED | agents | DX | Shutting the session down while an agent is in flight raises unhandled promise rejections ('This extension ctx is stale…') from the manager's error-path settle and from the mention-clone fallback chain. | Anyone quitting pi or running it headless with agents still running: stack traces at exit and possibly a non-zero exit code from an otherwise success… | Guard onComplete on the error path as on the success path, end the clone chain with a catch that touches nothing on ctx, and check the session is still active before emi… |
| C025 | SUPPORTED | agents | QoL | Hard-coded model pins lag the registry. The create wizard's haiku/sonnet/opus choices write claude-haiku-4-5, claude-sonnet-4-6 and claude-opus-4-6, and the shipped Explore agent pins claude-haiku-4-5, on a host whose registry lists opus-5-5, sonnet-5-5 and h… | Users of /agents → Create new agent and of Explore: agents are written against models one to three generations old without being told. Low impact per… | Offer registry-derived choices in the wizard (newest per family), or write a family alias once fuzzy resolution prefers the newest id. |
| C059 | ESTABLISHED | execute | gap | workflow_catalog hands out definition references that workflow_execute then refuses. (a) Saved workflows in the user's agent dir (`<agentDir>/workflows/*.js`, one of the three documented saved roots) are listed with a definition, but execute answers source-un… | Operators who keep reusable workflows in the agent dir ('one that follows the user everywhere', per the SubagentWorkflow description) and anyone in a… | Resolve a definition whose id is a saved-root path through the saved-name resolver (same precedence as SubagentWorkflow), or have the catalog flag entries execute cannot… |
| C060 | ESTABLISHED | execute | gap | The same digest-pinned definition behaves differently by hostMode and nothing says so before launch. On the detached host a nested workflow() is fatal ('This workflow host cannot run nested workflows.') and every node() fails ('Unknown or unavailable capabili… | Any agent that picks hostMode 'detached' for a definition using workflow() or node() (e.g. the shipped compose.js, any forge/hx-reading script): the … | At admission, run the existing static projection (validateWorkflowSource possibleCalls) and refuse detached with a typed `host-incompatible-definition` naming the primit… |
| C066 | ESTABLISHED | execute | UX | For the operator, a workflow launched through workflow_execute does not look like a workflow in the transcript. The tool defines no renderCall or renderResult and returns no details, so the host has only the raw JSON envelope to show where SubagentWorkflow re… | Operators watching a Workbench session: every workflow_execute launch is a ~700-byte JSON line with no progress card, and a refusal is easy to miss b… | Return details {taskId} and add renderCall/renderResult that reuse renderWorkflowCard for embedded launches and a compact one-line render for detached launches and refus… |
| C070 | SUPPORTED | execute | DX | No test in the gate drives a real embedded launch through the booted workflow_execute tool. The tool suite stubs the source resolver and both launchers; the only booted call sites are one detached launch and one refusal row. The composition-root code that tur… | Maintainers: a regression in the embedded launch path (the default hostMode) would pass the gate; three of the defects above (user-level definitions,… | Add a wiring test that boots the extension in a hermetic dir and runs workflow_catalog -> workflow_execute(embedded) -> completion notification, plus the user-level-defi… |
| C071 | ESTABLISHED | execute | QoL | The `--subagents-workflow-file` flag cannot pass arguments to the script: one flag is registered, the script sees `args` as undefined, and the path never journals, so a flag-launched run cannot be resumed. Examples that take args (fan-out-audit.js, compose.js… | Operators scripting workflows from a shell or CI: every parameterised workflow needs a wrapper script or an LLM turn to pass args; long flag-launched… | Add `--subagents-workflow-args=<json / @file>` (JSON-checked like the tool's args) and give flag runs a journal path so resumeFromRunId works. |
| C123 | ESTABLISHED | interop | gap | The coordination boundary calls the producer export synchronously on the host's event loop with no deadline and no abort signal, and the latencyMs budget it requires in the input is only compared with the echo, never enforced. | The Pi session that first hosts a coordination call: a slow or looping policy evaluation freezes the TUI, timers and every other tool for its whole d… | State in the module header that latencyMs is echoed and not enforced, and run the export where a deadline can end it (a worker with a timeout equal to the budget), retur… |
| C124 | ESTABLISHED | interop | gap | The three seams disagree on 'unknown permission data'. For one host grant read holding an entry outside the capabilityGrants grammar, workflow_execute's admission and the function authority boundary deny, while the coordination boundary admits and calls the p… | The integration bead (wb-2ukh composes authority and source admission in one chain) and any later coordination caller inherit three grant judges and … | Export one grant-list judge and one clean-text judge from a shared module (settings.ts already owns the grammar) and have the three seams import it; decide in writing wh… |
| C125 | ESTABLISHED | interop | DX | A FIFO at descriptorPath makes the descriptor boundary wait forever and then keeps the host process from exiting. The same module refuses a FIFO at artifactPath, and the sibling coordination boundary refuses one at its descriptor path. | A host that passes a path it does not fully control (a configured descriptor location, a test double) hangs one libuv thread per call and cannot shut… | Read the descriptor through the coordination boundary's readRegular (one non-blocking open, the handle judged a regular file, then read), which returns descriptor/not-a-… |
| C177 | ESTABLISHED | observe | gap | An operation started with forge_gate_run can never be read back by the agent: its reply says completion 'not-asserted', the host observes the terminal into the session projection, but workflow_observe only addresses wf_ task viewports, so the operation id is … | Every forge_gate_run call: the agent cannot close the loop on the gate it started and has to shell out to forge or author a workflow script; the two … | Let workflow_observe take a native ref (provider/type/id) as an alternative to taskId and answer the scope's row for it, or have forge_gate_run pass an invocationId and … |

### 11b. Prose-only deferrals (F-13) — explicit, but owed a table row

| Claim | Grade | Family | Axis | Where deferred | Claim (abridged) |
|---|---|---|---|---|---|
| C002 | ESTABLISHED | agents | gap | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | The two documented ways to take the all-tools general-purpose agent away do not stop it from being spawned. With disableDefaultAgents:true, or with `enabled: false` on general-purpose, a caller-suppli… |
| C003 | ESTABLISHED | agents | gap | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | Under stock headless semantics (await session.prompt, print, dispose) the default spawn mode loses the subagent. The Agent reply says 'started in background… you will be notified', the parent turn end… |
| C005 | ESTABLISHED | agents | DX | r-platform:cross-family-prose | Agent-file frontmatter fails open and silently. Unknown keys and wrong-typed values are dropped with no warning, several in the permissive direction, and Claude Code-format files load with their restr… |
| C014 | ESTABLISHED | agents | missing-req | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | Ten minutes after an agent finishes, the orchestrator can no longer reach it. The record and its full result are gone and get_subagent_result, resume and steer_subagent answer 'Agent not found… may ha… |
| C021 | ESTABLISHED | agents | gap | r-platform:cross-family-prose | Scope models does not enforce the list syntax pi itself accepts. An enabledModels list written with globs, bare ids or :thinking suffixes turns the check into a silent no-op, and a mixed list refuses … |
| C022 | ESTABLISHED | agents | gap | r-lx:coverage-note(left to sibling clusters / residue) | The mention clone is not held to the agent the user typed, and its turn is billed nowhere visible. Whatever subagent_type the clone's model passes is spawned, and the clone session's usage reaches nei… |
| C050 | ESTABLISHED | execute | gap | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | The documented headless composition `pi -p --subagents-workflow-file=<path>` crashes the real pi CLI: exit 1, an uncaught `Error: This extension ctx is stale after session replacement or reload` throw… |
| C051 | ESTABLISHED | execute | missing-req | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | A workflow's return value beyond 4000 characters is unrecoverable for the model. The completion notification cuts `<result>` at 4000 chars with '...(truncated)' (details.resultPreview at 500), and no … |
| C052 | ESTABLISHED | execute | gap | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | A headless host that honours the extension's published hold contract still loses workflow results: the registry (`Symbol.for('pi-subagents:manager')`) exposes hasRunning/waitForAll over AGENTS only, s… |
| C054 | ESTABLISHED | execute | missing-req | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | No model-facing tool can stop a run that workflow_execute (or SubagentWorkflow) launched. Embedded: workflow_control over the returned {provider:'pi-workflow',type:'task'} reference refuses cancel/sto… |
| C062 | ESTABLISHED | execute | gap | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | `workflowsEnabled: false`, documented as 'the master switch for scripted workflows' under which the model 'cannot call it', does not switch off workflow_execute. In Workbench mode the tool stays regis… |
| C068 | ESTABLISHED | execute | missing-req | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | A model cannot find out which workflow runs exist in its session, nor avoid repeating a launch whose reply it lost. Two identical workflow_execute calls start two runs; no tool lists runs (workflow_ob… |
| C116 | ESTABLISHED | interop | DX | r-platform:cross-family-prose | The skill cannot be kept current the way its own rule 8 demands. test/workbench-mwi-docs-remediation-census.test.ts pins three skill sentences to line numbers (SKILL:L14, SKILL:L16), so adding one bul… |
| C178 | ESTABLISHED | observe | missing-req | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | An invocation is findable only while the same Pi process and session hold it in memory and the agent still has the task id: there is no tool that lists invocations, a new session id (/new, /resume, fo… |
| C193 | ESTABLISHED | observe | friction | r-lx:coverage-note(left to sibling clusters / residue), r-platform:cross-family-prose | The repo's own reply-size bench for this tool prints nothing until it finishes — 310 s on this host — and Node warns on every run that dist/*.js is reparsed as ES module because package.json declares … |

### 11c. Positives

43 positives: 37 cited in requirement rationales or map rows as basis or preservation controls (R388/R389/R390 compile 21 distinct positives as NEGATIVE_REGRESSION invariants), 2 more mentioned in conditions, 4 cited nowhere in a requirement block (C032, C075, C155, C197 — F-14; all four are listed in r-platform's "Positive regression queue").

## 12. Live-bead overlap (extend-not-duplicate)

Status read 2026-11-11T07:02:32Z with `bd --readonly --sandbox show <id> --json` (receipt `.work/reqset-audit/bd-readback.out`; scope text in `.work/reqset-audit/bd-scope/*.json`).

| Bead | Live status | Named by | Reading |
|---|---|---|---|
| wb-9x5.16 | **closed** → wb-9x5.11 | R328, R331, r-lx header | **stale** (F-02) |
| wb-79k.1, wb-79k.2 | **closed** → wb-79k.3 | R329 | **stale** (F-02) |
| wb-752.12 | closed → wb-752.13 | R346 (as lineage) | correct |
| wb-9x5.10 | closed → wb-9x5.11 | r-platform header (as lineage) | correct |
| wb-4ax | closed (W06 landed) | R375 (as historical lineage) | correct |
| wb-jwc.7 | **closed** (landed, landing 1052) | R367 c4 "BLOCKED pending amendment" | reword (F-12) |
| wb-752.13 | in_progress — "bounded furnace_observe reply … TOOL_REPLY_CONTRACT_VERSION … bounded snapshot rows, event-window metadata" | R349 "extends"; R346, R333 | **R349 restates its scope → extension, not a new bead** (F-03); R346 (relate loop) and R333 (refusal dialect) extend |
| wb-79k.3 | open — "host-owned HX, RF-preview and detached observation projection wiring" | R374 "extends"; R329, R343, R373, R390 | **R374 restates its consolidated HX/RF scope → extension** (F-03); R343 extends (bead "sends no command"), R329/R373 consistent vocabulary |
| wb-0kg.3 | in_progress — detached exit/reattach receipt, falsifier "never a replayed verdict" | R341–R345 | R341–R344 extend; **R345 conflicts** (F-04) |
| wb-6ze.15 | in_progress — live four-view pty receipt (`qa/workbench/live-inspector-receipt.mjs`, absent at pin) | R350–R356, R336 | extend; R351/R352 c3 **depend on** its harness (G-PTY BLOCKED) |
| wb-h8f.7 | open — bounded workflow_compare builder + registered adoption | R333 c2, R349, R387, R390 | extend with explicit boundary ("must not fork a second envelope") |
| wb-69g.12 | in_progress — validate-reply falsifiers + M14/M15 invocationId redaction | R321, R324 | extend (redaction invariants on new reply shapes) |
| wb-9x5.11 | in_progress — W21 receipts | R350, R351, R354, R356, R390 | lineage; correct target for R328/R331 |
| wb-cax, wb-lri, wb-x32, wb-5uh, wb-f5y | in_progress W-containers (sparse descriptions) | R366–R378, R386–R390 | file children under them |
| wb-yiu4 (P10, open, blocked by P08/P09), wb-2ukh (P03, open), wb-y0n6 (P02, in_progress), wb-4bxo (open) | MNI owners | R339, R386, R387, R390 | status-truth rows extend; implementation stays with these owners |

No requirement duplicates a closed bead's landed scope; two restate open/in_progress bead scope (F-03); one conflicts with an open bead's falsifier (F-04).

## 13. Residual assumptions and real-infrastructure gates

- Instruments present on this host: hx 0.1.0, rf 0.1.883 (81/89 leaves reachable), forge 0.2.1, furnace 0.1.0, pi 1.2.0, node 24.20.0 (+22.23.2, 18.20.2 via mise), dolt 2.2.4 — all V6/G-* gates except G-PTY are AVAILABLE and NOT_RUN. The absent artifact for G-PTY is a credentialed live Pi session plus the wb-6ze.15 harness.
- Every acceptance run must re-pin (the shards say so; master has already moved to c0f775e9); a PASS at a later tip is a Phase 11 re-adjudication, not a retroactive grade.
- The 80-id range is exhausted: every cure in F-01, F-05 and F-13 needs EAT-R391+ or an explicit tabled deferral in the parent roll-up; this audit minted no ids.
- Read-only discipline held: no live checkout was modified; `bd` ran with `--readonly --sandbox`; all writes went to `requirements/`, `requirements/.work/reqset-audit/`.

## Method receipts

- `python3 -I parse.py` → 80 requirement blocks, 80 map rows, 267 ledger rows.
- `python3 -I check1.py` → ids/fields/laundering (6 notes, 0 launders).
- `python3 -I check2.py` → coverage 126/85/13, stubs 12/12 compiled+deferred, positives 37/2/4.
- `bd --readonly --sandbox show <24 ids> --json` → `bd-readback.out`; 13 bead scope dumps → `bd-scope/`.
- `hx --workspace pin-ce180d82 git refs --best-effort`, `hx … show test/<anchor>.test.ts --best-effort`, `hx … children qa/workbench --best-effort` (74 regular files; partial-coverage warning, as expected for a markerless root) — pin identity and anchor existence.
- `rf --json --version` → `rf-version.json`.
- `ls pin-ce180d82/qa/workbench` (no `live-inspector-receipt.mjs`), `mise ls node`, `command -v hx rf forge furnace pi node dolt` — gate availability.
