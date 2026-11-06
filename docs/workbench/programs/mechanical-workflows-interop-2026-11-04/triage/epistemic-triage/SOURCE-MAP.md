# SOURCE-MAP — lineages, same-origin groups, and what each lineage can establish

Audit: epistemic adversarial triage of the Pi ↔ MechanicalWorkflows interop design program. Artifact pin `doc@7c80c34346c2`; environment pins `pi@b27829e6dfa7`, `mw@f7c0a9431d6c`; program baselines pi `f67b6665`, mw `0c78e253` (read via `git show` inside the mw pin). Evidence records live in `EVIDENCE.jsonl` (868 records: 307 audited-program-doc anchors, 354 primary-code, 55 test-source, 58 probe outputs, 34 repo docs, 28 counterpart-program docs, 12 feedback reports, 9 baseline reads plus 1 baseline probe, 5 historical receipts, 6 other — 2 of the 6 are reads of this audit's own part files, root `triage@self`). Nothing was run; every record is a static read, a `git show/log/diff`, or a recorded `ls`/`grep` probe.

Roots (every `EVIDENCE.jsonl` row declares one):

| Pin | Root | Note |
|---|---|---|
| `doc@7c80c34346c2` | pi-subagents commit 7c80c34346c2e46b0f0201c3bf916274159c7cf7 | the five program docs + SKILL; byte-identical in the pin worktree `pins/pi-b27829e6` |
| `pi@b27829e6dfa7` | `pins/pi-b27829e6` = pi-subagents b27829e6dfa7d2c39e493095d963117d2d078d61 | origin/master merge of the workbench trunk (landings through 996) + the program commit; `src/` byte-identical to f67b6665 |
| `mw@f7c0a9431d6c` | `pins/mw-main` = MechanicalWorkflows f7c0a9431d6cc36a15b409b1788c945ef86ad5e2 | eight commits after the program's MW baseline |
| `mw@0c78e253` | MechanicalWorkflows 0c78e2530cbf5737a8bbb763475385a2f0f760cc via `git show` in `pins/mw-main` | the program's stated MW baseline |
| `triage@self` | this audit's delivered `epistemic-triage/` tree | the two part-file bookkeeping reads (E0760, E0761); durable beside `CLAIMS.jsonl`, never the purged working directory |

## 1. Lineages

### L1 — The program author's own writing (one origin)

Members: the five Pi program docs and the Pi SKILL (commit 7c80c343, 2026-11-04 22:25:31 -0800, one author); the MechanicalWorkflows counterpart program `docs/programs/pi-workbench-interop-2026-11-04/` and `.agents/skills/mechanical-pi-host/SKILL.md` (bf8fbb93, 22:30:58 -0800, five minutes later, same author, same baselines); the W11 row of `docs/workbench/feature-matrix.md` (10a67e73, 2026-10-15, same author), bead wb-04s and `docs/workbench/TRACEABILITY.md`; MW `contracts/README.md:13` and `docs/05` wording rewritten by 1f29daa7 (doc-cites-program-cites-code).

Same-origin groups inside L1 (recorded as `SAME_ORIGIN_AS` in `RELATIONS.jsonl`, families A-U):
- A descriptor/loader mismatch: C0189/C0190/C0193-C0196/C0277 (01) = C0530/C0529/C0534 (02) = C0305/C0336/C0338 (03) = C0437 (SKILL) = MW 01:22, MW README:47.
- B worktree P0: C0165-C0171/C0274 (01) = C0346/C0349 (03) = C0452 (SKILL) = MW 01:66 ("External Pi defects", QUOTED_FROM the Pi audit).
- C function-kind refusal / no binding: C0127/C0128/C0160-C0164/C0178/C0179/C0183/C0184 (01) = C0310/C0339/C0340 (03) = C0430-C0432/C0435/C0436 (SKILL) = C03132 (04).
- D detached grants: C0200-C0205/C0209/C0275 (01) = C0586/C0587 (02) = C0343-C0345 (03) = C0439-C0442 (SKILL).
- E cancellation race: C0210-C0217 (01) = C0350-C0353 (03) = C0453/C0454 (SKILL).
- G git-census vocabulary: C0245/C0246 (01) = C0522/C0555-C0557 (02) = C0320/C0355/C0356/C03113 (03) = C0443/C0444 (SKILL) = MW program 02:25 (`mode`).
- H W11 row: C0163/C0182 (01) = C0406-C0408 (README) = C03124 (04).
- I RF preview vs committed render: C0247-C0255 (01) = C0559/C0560 (02) = C0419 (README) = C0445 (SKILL) = C0370 (03).
- J HX scope gap: C0239-C0246 (01) = C0444/C03114/C0326 (03/SKILL).
- K node() deadline: C0186-C0188/C0230/C0231 (01) = C0341/C03143 (03/04) = C0459/C0460 (SKILL).
- L replay identity: C0218-C0227 (01) = C0550/C0551 (02) = C0324/C0455/C03147 (03/04/SKILL).
- M audit method and baselines: C0101-C0106/C0271-C0273 (01) = C0401-C0403/C0409 (README) = C0427 (SKILL).
- N feedback topics: C0103/C0263-C0266 (01) = C0399/C03126 (03/04).
- O no Pi->Mechanical run: C0160/C0164 (01) = C0321/C0446 (03/SKILL).
- P script workflows: C0113/C0114/C0127 (01) = C03106 (03).
- Q four outcome variants: C0238/C0139 (01) = C0547/C0562 (02) = C03111/C0369 (03).
- R installed host: C0141-C0146 (01) = C0521 (02) = C0434/C0315 (SKILL/03).
- S historical rig receipts: C0152 (01) = C0381/C0380 (03).
- U shared existence facts: C0107/C0122/C0134/C0137/C0147/C0153/C0154 (01) = C0511/C0516/C0554/C0567/C0588/C0592 (02) = C0334/C0428/C0429/C0433/C0463 (03/SKILL).

Can establish: what the author asserted, proposed and required, and that the five files plus SKILL are internally consistent where checked (no claim phrased as a run result; lens-logic rows 54-57). Cannot establish: the truth of any code or repo claim. A proposition that appears in three program files, in the MW program and in the W11 row still has one origin; its warrant is whatever the pinned source establishes. Agreement between the Pi and MW programs is never corroboration.

### L2 — Pi source at the pin (primary, 224 code records)

`src/workbench/claude-host.ts` (41 records), `src/workflow/runtime.ts` (37), `src/worktree.ts` (23), `src/index.ts` (16), `hosts/local-detached.ts` (14), `execute-tool.ts` (12), `hosts/furnace-hosted.ts` (12), `journal.ts` (10), `providers/*.ts`, `native-modules.ts`, `capability-registry.ts`, `collective-event.ts`, `worker-source.ts`, `agent-manager.ts`, `package.json`.

Drift: none. `git diff --stat f67b6665 b27829e6 -- src/` is empty; the 375 intervening commits touch tests, docs, ledger, `.beads` and `new-feedback/` only. Every Pi `file:line` the program cites re-locates; the only offset is `execute-tool.ts` 215-219 -> 217-218 (benign).

Can establish (ESTABLISHED grade): structural and static facts — what is registered, what a branch refuses, what an array literal contains, which grant a validator demands, what a catch block does. Cannot establish: that any path executes as read (no test, Forge gate or SDK call was run), runtime timing, or anything about installed SDK versions.

### L3 — Pi tests at the pin (40 records)

`test/worktree.test.ts` (17), `test/workbench-claude-cancel-faults.test.ts` (F10), `workbench-execute(-tool).test.ts`, `workbench-local-detached-effects.test.ts`, `workbench-role-capabilities-settings.test.ts`, `workbench-pi-detached.test.ts`, census files (bodies not read line by line).

Can establish: what a test asserts and therefore what the suite can detect (e.g., the worktree failure-path tests assert the `hasChanges:false` report, not the removal; no test parks `beforeDispatch` and issues skip/retry; no test drives the registered detached launch into the real preflight). Cannot establish: that tests pass (not run), or that a described behaviour is guarded (characterization vs regression tests are distinguished on the rows).

### L4 — Pi repository documents at the pin (17 repo-doc + 1 receipt records)

`docs/workbench/feature-matrix.md` (W11 row 112, blob identical baseline -> pin, detection sentence stale since 2026-10-28), `AGENTS.md`, `docs/workbench/receipts/*.md` (52 files; 9 mention the Claude host), `docs/workbench/15-implementation-program.md`, `docs/workbench/TRACEABILITY.md`, `.github/workflows/ci.yml`.

Can establish: that the documents say what they say and exist at the pin. The feature-matrix row is the same author's prior observation whose embedded grep detector is re-run and found stale; its `planned` status is the only part carried. Cannot establish: current tree state (that is L2's job) or the validity of receipt contents (not assessed).

### L5 — MechanicalWorkflows source at the pin (130 code records)

`apps/development-rig/src/live-development.ts` (27), `packages/development/src/contracts.ts` (19), `contracts/entrypoints/development.v1.json` (10), `entrypoint-host.ts` (10), `hx-scope.ts` (10), `develop.ts`, `packages/coordination/src/index.ts`, `rf-context.ts`, `claude-implement.ts`, `installed-host.ts`, `live-composition.ts`, `furnace-process-executor.ts`, `apps/development-rig/package.json`.

Drift baseline -> pin (eight commits, 2026-11-04 22:30 -0800 .. 2026-11-05 12:24Z): `bf8fbb93` MW program docs + skill; `8b9d3dd2`, `1710e229` RF adoption docs; `1f29daa7` descriptor schema refs -> bare filenames + file-driven host tests (authored 08:14:24Z, committed 08:49:21Z; cherry-pick of db320491); `1872a6f1` rf binary resolution and typed RF refusals in `rf-context.ts` (requirement block unchanged); `04eeb944` rf-workload observation; `a074428d` consumer-side guard for redacted rf projections; `f7c0a943` host `AbortSignal` pre-dispatch barrier (the pin commit). Unchanged: `entrypoint-host.ts`, `hx-scope.ts`, `packages/development/src/*`.

Can establish: MW structural facts at the pin, including the two repairs that overturn program claims (descriptor refs; AbortSignal presence). Cannot establish: runtime behaviour (nothing run), or that the file-driven tests pass.

### L6 — MechanicalWorkflows source at the program baseline (9 records + 1 probe via `git show 0c78e253:`)

`contracts/entrypoints/development.v1.json:8-9` (`../schemas/` refs), `apps/development-rig/test/entrypoint-host.test.ts:12` (handwritten literal), `claude-implement.ts:11-15` (no `signal`), `live-development.ts` (grep `signal|abort`: 0).

Can establish: that the program described the baseline truthfully (the descriptor family and the AbortSignal claim are ESTABLISHED at 0c78e253). Cannot establish: anything about the pin; it is the "before" side of every version split.

### L7 — MechanicalWorkflows tests at the pin (15 records)

`entrypoint-descriptor-file.test.ts` (9), `installed-host.test.ts`, `entrypoint-host.test.ts`, `live-development.test.ts:415`.

Can establish: that three tests read the committed descriptor and one asserts both hosts accept it over a real npm-packed tarball; that an already-aborted host signal dispatches nothing. Cannot establish: that they pass (not run).

### L8 — MechanicalWorkflows documents at the pin (17 repo-doc + 28 counterpart-program records)

`docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md` (17; self-scoped to 0c78e253), `02-binding-and-packaging-contract.md` (`mode`), `.agents/skills/mechanical-pi-host/SKILL.md:14` (repair recorded), `contracts/README.md:13`, `README.md:47` (stale), `docs/04`, `docs/05` (rewritten by 1f29daa7), `docs/06`, `docs/07:88`, `docs/13`, `docs/14`.

Can establish: what MW's documents state, including that MW itself records the repair (SKILL:14, contracts/README:13) while MW README:47 lags. Cannot establish: code facts (L5 does), and the program docs here are L1 (same author), so they never corroborate the Pi program.

### L9 — Historical producer receipts (5 records)

`mw@f7c0a9431d6c:qa/integration/2026-10-15-combined-live-composition.md` and sibling 2026-10-15..10-21 files; `qa/integration/evidence/` (49 files); `docs/13`, `docs/14`.

Can establish: that dated receipts exist and what they record (a 2026-10-15 fail-closed rig journey; `developWithNativeEvidence()` ran once). Cannot establish: behaviour at the baseline or pin (three weeks later), receipt validity (not assessed), or anything about a Pi-hosted run (none names one).

### L10 — Pi `new-feedback/` reports (12 records; 44 files at the pin)

One flywheel-seat lineage (Pi-Subagents Orchestration Engineer, job a8ddce77; 25 files name it explicitly; each 11-0x file is "the same seat ... a later cycle"). Dates 2026-10-15..2026-11-05; three files (11-04 x2, 11-05) postdate the program baseline.

Can establish: which topics the reports raise (census edit conflicts and prep bottlenecks in the 11-01..03 bodies, 6/6; Vitest default-timeout and report-mode themes in October files, located by filename). Cannot establish: independent corroboration (n=3/n=4 counts are one lineage), the truth of the measurements (historical producer numbers per the program's own rule), or the October bodies' content (not read).

### L11 — Git history in both pins (recorded as probe outputs)

`git log -1` on f67b6665 (2026-11-05 05:57:48Z), 7c80c343 (2026-11-04 22:25:31 -0800), b27829e6 (2026-11-06 00:35:07Z, 375 commits after f67b6665), 0c78e253 (2026-11-02 21:17:57Z), bf8fbb93, 1f29daa7, 1872a6f1, a074428d, f7c0a943; `git show --stat 7c80c343` (10 Markdown files); `git diff --stat f67b6665 b27829e6 -- src/` (empty).

Can establish: order and timing of commits (author vs committer dates both recorded), which files a commit touched, that Pi `src/` did not move. Cannot establish: what a remote default branch pointed at on a given calendar day (no ref snapshot), or local-timezone intent beyond the recorded `-0800` offsets.

### L12 — Audit probes (58 probe-output records)

`ls src/workbench/hosts/`, `grep -ril mechanical src/ test/`, `grep -rn 'mw\.pi\.'` (both worktrees), `grep claude:invoke src/ test/`, `grep git-census` (MW *.ts: 0), `grep 'proof contract'` (MW docs: 0), `grep -rn 'concurrency:' src/`, `grep beforeDispatch test/`, `ls new-feedback/` date histograms, package-manifest greps.

Can establish: absences within the searched surface, with the detection model named on the row (`detection_model`), and the positive hits they returned. Cannot establish: absences outside the surface — generated code, runtime registration, the flywheel ledger, `~/s3` receipts, local uncommitted work, remote histories. Every absence row carries this limit (notably C0321, C0446, C0409, C0368).

### Not available (named, per `MANIFEST.md`)

Live Claude/Forge/Furnace/HX/RF calls; a Forge gate or Vitest run; installed SDK versions (lockfiles not read); the flywheel ledger as live evidence (excluded by the program's own rule); S3 receipts; the audit session transcript of the program's author.

## 2. Independence map

| Proposition family | Independent witnesses | Same-origin restatements (add no warrant) |
|---|---|---|
| Descriptor/loader mismatch (A) | L6 (baseline), L5 + L7 (pin), L11 (1f29daa7) | Pi 01/02/03/SKILL, MW 01, MW README:47 |
| Worktree P0 (B) | L2 (`worktree.ts`), L3 (`worktree.test.ts` header, 2026-10-17, predates the program) | Pi 01/03/SKILL, MW 01:66 |
| Function-kind refusal (C) | L2 (`execute.ts`, `execute-tool.ts`), L3 (both tests) | Pi 01/03/SKILL/04, W11 row |
| Detached grants (D) | L2 (`index.ts`, `local-detached.ts`), L12 (`grep claude:invoke`) | Pi 01/02/03/SKILL, MW 01 |
| Cancellation race (E) | L2 (`claude-host.ts`, `runtime.ts`), L3 (F10 covers run-level only), L12 (no skip/retry fault test) | Pi 01/03/SKILL, MW 01 |
| git-census profile (G) | L5 (`live-development.ts:20,30`, `live-composition.ts`), L12 (`grep git-census`: 0) | Pi 01/02/03/SKILL, MW program 02 |
| W11 row (H) | L4 (row), L2 (`collective-event.ts`), L12 (`grep -ril mechanical`) | Pi 01/README/04 |
| RF preview vs render (I) | L2 (`providers/reactivefiber.ts`), L5 (`rf-context.ts`), L8 (`docs/07:88`) | Pi 01/02/README/SKILL, MW 01 |
| HX scope gap (J) | L5 (`hx-scope.ts`, `develop.ts:36-38`), L2 (`providers/hyperunix.ts`) | Pi 01/03/SKILL, MW 01, hx-scope.ts header comment (same author) |
| node() deadline (K) | L2 (`capability-registry.ts:62`) | Pi 01/03/04/SKILL |
| Replay identity (L) | L2 (`claude-host.ts:166-175`, `journal.ts`) | Pi 01/02/03/04/SKILL, MW 01 |
| Audit self-reports (M) | L11 (docs-only commit; dates) — consistent, not probative | Pi 01/README/SKILL, MW 01 |
| Feedback topics (N) | L10 (one seat lineage), L12 (filename/body greps) | Pi 01/03 |
| No Pi->Mechanical run (O) | L12 (repo-scoped absence only) | Pi 01/03/SKILL, MW 01 |
| Four outcomes / callbacks (Q) | L5 (`contracts.ts:47-58`, `development.v1.json:10-15`) | Pi 01/02/03/SKILL, MW 01 |
| Historical receipts (S) | L9 (2026-10-15 files) | Pi 01/03, MW 01 |

## 3. Provenance defeaters recorded on rows

- provenance (one lineage counted as many): C0163, C0182, C0264, C0265, C0399, C0409, C03126; every "n=3/n=4 corroboration" in `new-feedback/`.
- undercutting (source present, support relation unreliable): C0163/C0182 (stale detection sentence inside the cited row), C0231 (configurable deadline, unmeasured duration), C0252 (two referents of `compileContext`), C0409 (self-report).
- temporal (true at baseline, false at pin): C0189, C0190, C0193-C0196, C0229, C0277, C0305, C0336, C0338, C0437, C0530; (true at 2026-10-15, not at pin): C0152, C0381.
- scope (true only narrower): C0119, C0139, C0161, C0167, C0169, C0218, C0248, C0261, C0315, C0346, C0353, C0356, C0443, C0446, C0521, C0534 (repo misassigned).
- semantic (term shift): C0184 (disagree vs layering), C0188 (norm vs observation), C0251 (documented contract vs code-enforced adapter), C0320 (proposal vs observation), C0586 label (symptom vs mechanism), C0522 (`profile` vs `mode`).

## 4. Ledger provenance note

Part-02 claim ids were renumbered C02nn -> C05nn in the merge (the parts had reused C0201-C0279 for different propositions); `original_id`, `claim_file` and `dossier` on each `CLAIMS.jsonl` row map back to the part files and the per-claim dossiers (`dossiers/C02nn.g02.md` keep their part-level names). Lens rows naming a colliding id were re-keyed by the part the lens author named, by an explicit `#partNN` marker, or by token overlap with the two candidate propositions; 15 rows needed a hand override (`LENS_OVERRIDES` in `gen-rollup.py`), none remained ambiguous. 27 evidence records are reachable only through evidence-to-evidence relations (e.g., Pi SKILL:14 vs MW SKILL:14) and are attached to no claim row.
