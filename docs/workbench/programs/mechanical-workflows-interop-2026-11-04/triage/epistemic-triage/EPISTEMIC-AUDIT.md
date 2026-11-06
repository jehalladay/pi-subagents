# EPISTEMIC-AUDIT — Pi Workbench ↔ MechanicalWorkflows interop design program

Roll-up of the Phase 6-8 merge (propagation across claim groups, language reconciliation, minimal remediation) over 490 atomic claims extracted from the program's five documents and project skill. Machine-readable surfaces: `CLAIMS.jsonl` (one row per claim, sorted by id, final status fields), `EVIDENCE.jsonl` (868 records), `RELATIONS.jsonl` (1,494 edges: 1,387 intra-group, 100 cross-group, 7 roll-up same-origin), `LENSES.jsonl` (246 lens rows re-keyed to the merged ids), `CLAIMS.patch.jsonl` (the one Phase 6 regrade), `CONTRADICTIONS.md`, `SOURCE-MAP.md`, `REMEDIATION.md`, per-claim dossiers under `dossiers/` for all 392 material rows. Counts below are descriptive; there is no scalar confidence score.

## 1. Pinned substrate

| What | Pin | Notes |
|---|---|---|
| Artifact under audit | pi-subagents `7c80c34346c2e46b0f0201c3bf916274159c7cf7` — `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/{README,01,02,03,04}.md` + `.agents/skills/pi-mechanical-interop/SKILL.md` | authored 2026-11-04 22:25:31 -0800 (= 2026-11-05 06:25Z); commit touches 10 Markdown files (325 insertions); docs byte-identical in the pin worktree |
| Pi environment | `b27829e6dfa7d2c39e493095d963117d2d078d61` (origin/master, 2026-11-06 00:35Z) | merge of the workbench trunk (landings through 996) + the program commit; 375 commits after the program baseline `f67b6665`; `src/` byte-identical to the baseline |
| MW environment | `f7c0a9431d6cc36a15b409b1788c945ef86ad5e2` (origin/main, 2026-11-05 12:24Z) | 8 commits after the program baseline `0c78e253` (2026-11-02 21:17Z) |
| Program baselines | pi `f67b6665` (2026-11-05 05:57Z), mw `0c78e253` | the README dates both "2026-11-04" in the author's -0800 zone |
| Counterpart | MW `docs/programs/pi-workbench-interop-2026-11-04/` (bf8fbb93, five minutes after the Pi program) | read as a source, same author; never corroboration |
| Not run | any test, Forge gate, Vitest, npm, Claude/Forge/Furnace/HX/RF call, SDK install | every grade is a static read at the pins plus `git show/log/diff` |

## 2. Claim inventory

By status (490 claims; 392 material):

| Status | All | Material | Permitted language |
|---|---|---|---|
| ESTABLISHED | 162 | 160 | plain factual wording inside the stated scope and pin |
| SUPPORTED | 45 | 40 | "evidence indicates" / "is supported by" |
| PLAUSIBLE | 2 | 2 | "may" / "is consistent with" |
| UNDETERMINED | 2 | 2 | "is unknown from the available evidence; missing: <artifact>" |
| UNSUPPORTED | 2 | 2 | "asserted, but the available evidence does not establish it" |
| CONTESTED | 0 (one CONTESTED set, KU10, between two proposals) | — | "sources disagree" |
| REFUTED | 14 | 14 | "the available evidence contradicts ... within <pin>" |
| NON-EPISTEMIC | 263 | 172 | "the program requires / proposes / defines" |

By document:

| Doc | ESTABLISHED | SUPPORTED | PLAUSIBLE | UNDETERMINED | UNSUPPORTED | REFUTED | NON-EPISTEMIC | total |
|---|---|---|---|---|---|---|---|---|
| README | 4 | 3 | 0 | 0 | 0 | 0 | 16 | 23 |
| 01 audit | 104 | 25 | 0 | 0 | 1 | 7 | 42 | 179 |
| 02 architecture/protocol | 11 | 7 | 0 | 0 | 0 | 2 | 79 | 99 |
| 03 implementation/QA | 20 | 6 | 2 | 2 | 0 | 4 | 80 | 114 |
| 04 handoff | 8 | 1 | 0 | 0 | 1 | 0 | 24 | 34 |
| SKILL | 15 | 3 | 0 | 0 | 0 | 1 | 22 | 41 |

By kind: NORMATIVE 192, OBSERVATION 186, PROPOSAL 56, INFERENCE 26, DEFINITION 15, SOURCE_REPORT 9, FORMAL_DERIVATION 3, HYPOTHESIS 2, PREDICTION 1. The 227 epistemic rows are 186 observations, 26 inferences, 9 source reports, 3 derivations, 2 hypotheses, 1 prediction. 48 rows carry `overclaims=true` (the artifact's wording is stronger than its warrant); 15 of them are also REFUTED/UNSUPPORTED.

Ledger repair: parts 01 and 02 had reused ids C0201-C0279 for different propositions; part-02 rows are renumbered C0501-C0599 in the merged ledger (`original_id` retained, dossiers keep `.g02.md` names). All 490 ids are unique and numerically sorted; every provenance path resolves in the pin worktree; no ESTABLISHED/SUPPORTED/REFUTED row cites its own doc line as support (doc lines are `anchor`, other program files `cited` lineage); permitted wordings are sentences; the five duplicated permitted wordings are all declared same-origin siblings.

## 3. What the program got right (ESTABLISHED at the pins)

Every Pi-side code finding re-locates at `pi@b27829e6` unchanged (the only offset is `execute-tool.ts` 215-219 -> 217-218):

- P0 worktree: `cleanupWorktree` (`src/worktree.ts:125-181`) commits, branches, removes; its outer catch force-removes (attempted) and returns `hasChanges:false` (C0165-C0168, C0170 "may discard", C0171, C0274). The in-repo test header (2026-10-17) predates the program and states the same loss. Established by reading source alone; no loss was observed (nothing run).
- P1 detached grants: `src/index.ts:2623-2628` sends backend `claude` with `grants:[]`; `hosts/local-detached.ts:430` throws without `claude:invoke`; the tools register only when `workflowAgentBackend === "claude"` (`:2640`), so every registered detached launch is refused at preflight (C0200-C0205, C0275, C0343, C0441, C0586). Static derivation, not executed; no test drives the registered path into the real preflight (C0209 SUPPORTED). Wider than written: `workflow_detached` (`:2880-2881`) has the same shape.
- P1 function dispatch: `execute.ts:78` models `script|function|furnace-formula`; `execute-tool.ts:217-218` refuses every non-script kind with a typed refusal; `native-modules.ts` registers exactly four read providers; no Mechanical function host, loader or `@mechanical` dependency exists (C0127, C0128, C0160, C0162, C0178-C0181, C0183, C0310, C0339, C0340, C0430-C0432, C0435, C0436).
- P1 replay identity: `claude-host.ts:166-175` serializes cwd, model, permissionMode, settings, tools, roles, grants, principal and nothing else — no source revision, instruction contents or provider versions (C0218-C0221; C0224 SUPPORTED); effect classes and uncertain-replay denial exist (C0222, C0223).
- P1 cancellation seam premises: `beforeDispatch` awaited at `:207`, controller registered after it, `abortAgent` a no-op for an unregistered id, workflow-wide signal re-checked at `:215` (C0210-C0212, C0214, C0350, C0351).
- P1 HX scope gap: `hx-scope.ts` default native query returns `revision:null`, `scopeKind:"filesystem"`; completeness requires `task` scope; `develop()` returns `needs_evidence` on incomplete coverage; Pi `hyperunix.find` is a general read (C0239-C0244, C0444).
- P1 RF preview vs render: Pi preview spawns `--no-commit` and rejects any non-null `render_id`; MW `renderTaskContext` demands a nonempty `render_id` plus task/revision/provenance/budget (C0247-C0250, C0445; C0253 SUPPORTED).
- Inventory: four outcome variants, four service callbacks, `develop(services, request)`, SHA-256 installed host with packed-tarball tests, coordination exports, `FurnaceHostedExecutor` one callback per Run, `workbench:detach` grant, repo paths and gates (C0107-C0113, C0115-C0118, C0120-C0158 except C0139/C0152, C0238, C0511, C0516, C0529, C0540, C0547, C0554, C0588, C03111, C0384-C0396, C03103, C03117, C03122, C03125, C03130, C0405-C0407, C0428, C0429, C0433, C0434, C0460).
- Framing: `doc 02` is design-only and no `mw.pi.*` name is shipped anywhere in either tree (C0501); the program states it ran nothing and treats receipts as historical.

## 4. What the program overclaims — material findings with final status and permitted wording

### 4.1 Overturned by drift (REFUTED at the pin, true at the baseline)

The P1 "checked-in Mechanical descriptor conflicts with its own loader" family — C0189, C0190, C0193, C0194, C0195, C0196 (doc 01), C0530, C0534 (doc 02), C0305, C0336, C0338 (doc 03), C0437 (SKILL); 13 rows plus the stale meta-claim C0277 (ESTABLISHED, overclaims). MW `1f29daa7` (authored 2026-11-05 08:14Z, about 1 h 49 min after the Pi program commit; committed 08:49Z) rewrote `development.v1.json` to the bare filenames the host demands and made three rig tests read the committed file over a packed tarball. At `mw@f7c0a943` the strings match byte-for-byte; MW's own SKILL:14 and contracts/README:13 record the repair (MW README:47 lags). Permitted wording: "At MW `0c78e253` the committed descriptor declared `../schemas/` refs and failed the host's exact-string check; `1f29daa7` repaired it and the pin's tests load the committed file (not run here)." Every present-tense restatement (01:29-31, 01:65, 02:48, 03:7, 03:18, SKILL:14) owes a temporal qualifier; PI-0 and unblocker 1 are already landed upstream.

C0534 is additionally a repo misattribution: the hand-authored descriptor tests the sentence gestures at were MechanicalWorkflows'; Pi has no descriptor-consuming test at all.

### 4.2 Overturned as extraction, not as artifact (REFUTED/UNSUPPORTED rows whose doc sentence is a norm)

- C0188 "node() is shell-backed": the doc prohibits a shell-backed `node()`; the pin dispatches a validated capabilityId through `CapabilityRegistry.invoke`. Ledger repair only.
- C03141 "an existing README calls a future invocation runnable": 04:38 lists a prohibited pattern and names no instance. Ledger repair only.
- C0320 "explicitly selectable `git-census` profile": no such identifier or selector exists in MW source; `developLive` hardcodes `discovery: "git-tracked-files"` and the only selectable axis is `contextMode`. The label is the program's own proposal (doc 02) read back as an observation in 03:10, 03:23 and SKILL:16 (C0356, C0443 SUPPORTED with the label narrowed).
- C0251 "documented proof contract for `compileContext`": no MW document names one (grep 0 hits); the requirements live in the rig adapter `rf-context.ts` and docs/07's RF-id receipt rule; the `develop()` port checks basis equality only. C0252's prediction is sound for the adapter and does not follow for the port.

### 4.3 Narrowed (SUPPORTED/ESTABLISHED with `overclaims=true`)

| Claim | Where | Overclaim | Permitted wording (short) |
|---|---|---|---|
| C0229 | 01:47 | "no ... AbortSignal in its public options" | at 0c78e253 none; `f7c0a943` adds `signal?` as a pre-dispatch barrier only; mid-run cancellation still absent |
| C0346, C0452 | 03:21, SKILL:24 | "loss of modified worktrees" (modal dropped) | loss only on the failure path; the happy path commits and branches first |
| C0169 | 01:23 | "tests explicitly exercise this outcome" | tests assert the `hasChanges:false` report, not the removal; characterization, not guard |
| C0167 | 01:23 | "force-removes" | attempted force-remove with prune fallback |
| C0184 | 01:27 | model/tool "disagree" | deliberate layering, both halves tested |
| C0161, C0163, C0182 | 01:17, 01:27 | "no Mechanical SDK/host adapter"; W11 row cited as current | no invocation/host binding; `collective-event.ts` exists; the W11 detection sentence is stale (and was at the baseline) |
| C0353, C0323 | 03:22, 03:11 | "cancel/skip/retry ... late unauthorized SDK start" | per-agent skip/retry only; run-level cancel re-checked and tested (F10); hypothesis unreproduced |
| C0231 | 01:47 | 30 s deadline "cannot substitute" | the structural premise (one value, no mid-run control) is unstated; deadline configurable; duration unmeasured |
| C0218 | 01:43 | seven-item list | eight items (adds `settings`) |
| C0139, C0248, C0261, C0119, C0114 | 01 table/P2 | optional evidence; inferred "committed"; zero-concurrency reachable; nesting depth; receipts | scope qualifiers on the rows |
| C0152, C0381 | 01:15, 03:42 | "recorded live producer receipts" | dated 2026-10-15, three weeks before the baseline; validity not assessed |
| C0264, C0265, C0399 | 01:59, 03:50 | "recent" deadline/report-mode topics | October files, one flywheel-seat lineage; bodies not read |
| C0521 | 02:32 | "installed verified descriptor" | committed, test-verified, self-described `descriptor-only` |
| C0315 | 03:9 | "independently importable" | rig package has `bin` only; deep imports work |
| C03106 | 03:55 | "working script workflows" | source implemented, tests recorded; not run |
| C0402 | README:4 | "2026-11-04" | author's -0800 date; UTC 2026-11-05 |
| C0409 | README:7 | "no new test ... ran" | authors' self-report; docs-only commit is consistent |
| C0422, C0312 | README:24, 03:9 | "No GitHub CI"; wrong warrant edge | program rule (Pi has `ci.yml`); callbacks established directly |
| C0446, C0321 | SKILL:16, 03:10 | "not witnessed" / "first actual" | in-repo absence only; history outside the repos unchecked |

### 4.4 Linguistic-strength transformations found

- historical -> current: the descriptor family (13 rows), C0277, C0152/C0381 (receipt dates), C0229.
- may -> does: C0346/C0452 (01 "may discard" -> 03/SKILL "loss").
- proposal -> observation: C0320, C0356, C0443 (`git-census` profile); C0534 (prescription read as existing Pi tests).
- norm -> observation (extraction defects): C0188, C03141.
- documented -> implemented / implemented -> works: C0251 (code-enforced vs documented), C03106, C0443 ("real ... operates").
- some -> all / quantifier loss: C0161, C0436 (any Mechanical code vs invocation binding), C0353 (adds "cancel"), C0218 (list), C0119 (depth).
- one source -> consensus: every "n=3/n=4" feedback corroboration (one seat lineage); every agreement between the Pi and MW program documents (one author, five minutes apart).
- tested -> correct: absent — the artifact never phrases a run result (lens-logic rows 54-57). This is the program's strongest discipline.

## 5. Contradiction sets

Eighteen unified sets in `CONTRADICTIONS.md` (KU01-KU18) absorb every part-level set (K001-K009, KG02-01..05, G03-K01..K10). Seventeen reconcile by version, scope, semantic or quantifier split; the pin reading is recorded for each. One remains CONTESTED: KU10, the same proposed selector is named `profile` in Pi doc 02:40 and `mode` in the MW program doc 02:25 (both NON-EPISTEMIC, one author; a single contract name must be chosen before implementation). Two cross-repo document contradictions exist at the pins and dissolve by revision: Pi SKILL:14 ("disagree") vs MW SKILL:14 ("agree", PIWB-MW0-R001); MW README:47 ("does not currently match") vs MW contracts/README:13 ("repaired").

## 6. Provenance and independence

- One author, one evening, one lineage: the Pi program (7c80c343) and the MW program (bf8fbb93) were written five minutes apart from the same baselines; the W11 row (10a67e73), bead wb-04s and TRACEABILITY share the author. A proposition appearing in three program files, the MW program and the feature matrix has one origin; its warrant is whatever the pinned source establishes (SOURCE-MAP L1).
- Independent witnesses exist for every material code finding: Pi source + tests at the pin (L2, L3), MW source at pin and baseline (L5, L6, L7), git history (L11), audit probes (L12). These, not the documents, carry the ESTABLISHED grades.
- The MW program's "External Pi defects" section is QUOTED_FROM the Pi audit and adds no warrant to the P0/P1 Pi findings; MW `hx-scope.ts`'s header comment and the HX-gap derivation are the same author's text, the code logic is the independent check.
- `new-feedback/`: 44 files, one flywheel-seat lineage (a8ddce77); the n=3/n=4 corroboration counts are not independent; the deadline/report-mode topics are October-dated and their bodies were not read.
- Historical receipts (2026-10-15 rig journeys) witness the rig three weeks before the baseline; none names a Pi-hosted run.

## 7. Propagation results (Phase 6)

- 100 cross-group edges were added (`RELATIONS.jsonl` X001-X100, families A-U) and checked: no epistemic tail exceeds its necessary premise. Seven same-origin asymmetries are wording-driven and documented on the edges: C0277 (meta-claim) vs the refuted C0194; C0340/C0436 ("no loader/registered binding", ESTABLISHED) vs C0161 ("no SDK/host adapter" table cell, SUPPORTED); C0407/C03124/C0406 (the W11 row exists) vs C0163/C0182 (its contents as evidence); C0381 (a 2026-10-15 receipt exists) vs C0152 ("recorded live receipts" as a current grade).
- One regrade: C0399 (03:50 "Pi feedback reports identify long preps, tester timeout modes and shared census edit conflicts") ESTABLISHED -> SUPPORTED. The conjunction inherits the cap of its weakest topic (C0264, SUPPORTED: October files located by filename, bodies not read, "tester" appears in 0 of 44 bodies). Recorded in `CLAIMS.patch.jsonl` and as `verdict_history` `correction-20261106:SUPPORTED@b27829e6dfa7`; no row depends on C0399.
- Intra-group edges where a conclusion is graded above a premise all carry an independent-warrant note on the row: C0164 and C0183 (over-determined by C0160/C0162 and C0179), C0232 (entailed by C0160), C0252 (sound under reading A independently of C0251), C0263/C0266 (file bodies at the pin, independent of the audit's self-reported window C0103), C0277 (meta-claim), C0444 (source, independent of "operates").
- NON-EPISTEMIC rows whose motivating premise is stale or absent at the pin keep their requirement force but owe the premise qualifier on the same doc line: C0302, C0316, C0337, C0438, C03142, C0531, C0535, C0536, C0533, C0197, C0199, C0347, C0323 (over-broad "any unauthorized late SDK start" via C0353).
- Broken derivations were recomputed, not propagated as "false": C0194's valid derivation lost two premises at the pin and the conclusion was re-derived REFUTED from string equality; C0196's conditional stays valid with its antecedent gone; C0232 ("not yet bridged") survives the weakening of C0229 through C0160.

## 8. Remediation summary

`REMEDIATION.md` holds 50 rows: 14 REFUTED + 2 UNSUPPORTED + 1 CONTESTED set (C0522) + 33 further overclaiming rows; coverage passes in both directions. Classes: ADD_TEMPORAL_QUALIFIER 19, NARROW_SCOPE 17, ADD_MISSING_PREMISE 3 (one of them a ledger-edge correction, C0312), DOWNGRADE_MODALITY 3, REMOVE_CLAIM 2 (ledger only), PRESERVE_AS_UNDETERMINED 2, REPLACE_SOURCE 1, MARK_AS_DEFINITION 1, SURFACE_DISAGREEMENT 1, ADD_SOURCE 1. Every repair is a wording change to the program docs or a ledger correction; none touches code. One edit per doc line discharges several rows (01:31 carries four; 01:27, 01:55 and 01:59 three each). No tracker issue is filed here; Phase 10 is expected to file `wb-` beads and the landing is a docs-only commit on pi-subagents `master`.

## 9. UNDETERMINED and open questions — the artifact that would settle each

| Claim | Question | Missing artifact |
|---|---|---|
| C0321 (UNDETERMINED) | Has any Pi -> Mechanical `develop` run ever occurred? | a producer-side Pi invocation/session journal joined to a Mechanical outcome and Forge operation at an identified source pin, plus a bounded receipt census outside the repos (ledger, S3) |
| C0368 (UNDETERMINED) | Can native Forge exit transport 0 with a failed gate? | the Forge producer contract/source at a declared pin, or a raw live transcript pairing exit 0 with a native gate FAIL and operation id |
| C0213 / C0353 (SUPPORTED / PLAUSIBLE) | Is the per-agent skip/retry race real at runtime? | a fixture that parks `beforeDispatch`, issues skip/retry or `host.abortAgent`, releases, and asserts zero SDK calls with a skipped settlement |
| C0209 (SUPPORTED) | Does any indirect harness drive the registered detached launch into the real preflight? | a census of every test entrypoint including `*.census.ts` bodies |
| C0169 (SUPPORTED) | Is the worktree removal asserted anywhere on a failure path? | a failure-path test asserting `existsSync(wt.path) === false` (or the proposed P0 regression test) |
| C0224 (SUPPORTED) | Does an equal prompt replay under a changed source tree? | a test editing source/skill bytes under an unchanged prompt/basis and observing reuse |
| C0231 (SUPPORTED) | Does `develop()` exceed the 30 s default? | a measured duration, and an explicit statement that `node()` exposes no mid-run control |
| C0251 / C0252 (UNSUPPORTED / SUPPORTED) | Which `compileContext` is meant? | the referent (rig adapter vs `develop()` port) stated in the doc; an MW document naming compileContext's obligations |
| C0264, C0265, C0399 (SUPPORTED) | What do the October feedback bodies say? | reading the 2026-10-20..10-30 files (filenames only were read) |
| C0114, C0152 (SUPPORTED) | Do receipts witness the executor / the rig at the pin? | a receipt dedicated to the Claude executor; a rig receipt dated at or after the pin |
| C0101-C0103, C0271-C0273, C0409 (SUPPORTED) | What did the program's audit actually inspect or run? | the audit session transcript or probe log |
| C0258 (SUPPORTED) | Is there any cross-workflow limiter for scheduled agents? | an inspection of the scheduled-agent subsystem |
| C03114 (PLAUSIBLE) | Does the installed HX supply native task-scope evidence? | the installed HX product pinned and queried (not pinned here) |

## 10. Drift since the program baseline

- Pi: 375 commits `f67b6665..b27829e6`, `src/` unchanged (every Pi citation re-locates); `new-feedback/` gained three files (2026-11-04 x2, 2026-11-05) that the audit could not have read; `docs/workbench/feature-matrix.md` blob unchanged (its W11 detection sentence was already stale at the baseline).
- MW: 8 commits `0c78e253..f7c0a943`. `1f29daa7` repairs the descriptor schema refs and makes the host tests file-driven (overturns 13 claims); `f7c0a943` adds a pre-dispatch `AbortSignal` (narrows C0229); `1872a6f1`/`a074428d` touch `rf-context.ts` error handling (requirement block unchanged); `bf8fbb93`, `8b9d3dd2`, `1710e229` add the MW program, skill and RF-adoption docs; `04eeb944` adds rf-workload observation. `entrypoint-host.ts`, `hx-scope.ts`, `packages/development/src/*`, `packages/coordination/src/index.ts` unchanged.
- Timing: the two MW repairs were authored 1 h 49 min and 2 h 14 min after the Pi program commit; the Pi docs were not updated afterwards, so the program is accurate about the world it audited and stale about the pin in exactly those two places.

## 11. Audit limits

- Nothing was run: no test, gate, SDK call or live producer; "ESTABLISHED" means established by source reading at the pins. Runtime claims (C03106, C0443 "operates", C03114) are capped accordingly.
- Absence detectors are repo-scoped greps/ls over the two worktrees (detection model recorded per row); generated code, runtime registration, the flywheel ledger (excluded by the program's own rule), `~/s3` receipts, local uncommitted work and remote histories are outside them (C0321, C0446, C0409, C0368).
- Test bodies of `*.census.ts` files and the October `new-feedback/` bodies were not read line by line.
- Installed SDK versions were not read; the Furnace and Forge products are not pinned (C0463, C0368 rest on repo text).
- Dossiers exist for the 392 material rows; the 98 non-material rows (framing, method, norms without an empirical premise) carry their complete record in `CLAIMS.jsonl` only.
- 58 evidence records are probe outputs (`ls`, `grep`, `git diff/log/show`) rather than files; they declare their root and are typed `PROBE_OUTPUT`. A Phase 9 gate that requires every evidence path to be a file must either accept this type or materialize the probe outputs.
- Lens row re-keying after the id collision used explicit part markers where present and token overlap otherwise; 15 rows needed a hand override (listed in `gen-rollup.py`), none remained ambiguous. One lens row (lens-negative 46) undercounted the program commit as 6 files; the correct count is 10, all Markdown (noted on C0409).
- The MW counterpart program was read as a source only; its own claims are not graded here.
- The audit's remediation targets the program documents; code defects the program correctly identifies (P0 worktree, P1 detached grants, P1 function dispatch, P1 replay identity, P1 HX gap, RF conflation) are confirmed at the pin and left to the implementation program.
