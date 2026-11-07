# SOURCE-MAP — lineages, independence and what each lineage can establish (mechanical-interoperability-audit-2026-11-06 at pi@d7666a76f561)

Roll-up investigator, 2026-11-07. Evidence records: `EVIDENCE.jsonl`, 626 rows (one per distinct pin+path+lines+quote), every one a static read at a pin or a read-only `git`/`grep`/`ls` probe output recorded by an investigator; nothing was run against the subjects. Pins: `pi@d7666a76f561` (482 records), `mw@97e18068f399` (123), `mw-tip@6e15a4245d3f` (20), corpus-internal (1).

The single most important provenance fact of this audit: **the Pi program (docs 01-05 + README), the hosting guide, the pi-mechanical-interop SKILL and the MechanicalWorkflows companion program are ONE authorial lineage** — one author, one Pi commit (d7666a76, 2026-11-07 01:52Z) paired with two MW commits seven minutes earlier (2ea69445 17:45:07 -0800, 6e15a424 17:45:57 -0800 on 2026-11-06). Agreement among these surfaces is internal coherence, never corroboration. Every proposition the audit grades above `NON-EPISTEMIC` had to be witnessed by a lineage outside it (code, tests, git history, producer receipts, agent feedback) or by the independent triage lineage (the machine-audited Nov-4 ledger).

## 1. Lineages

### L1 — The authorial lineage (one origin; 155 records)

| Surface | Pin | Records | Files |
|---|---|---|---|
| Program docs 01-05 + README (`docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/`) | pi@d7666a76f561 | 99 | 6 |
| `.agents/skills/pi-mechanical-interop/SKILL.md` | pi@d7666a76f561 | 29 | 1 |
| `docs/workbench/mechanical-function-hosting.md` | pi@d7666a76f561 | 8 | 1 |
| MW companion program `docs/programs/pi-workbench-interoperability-audit-2026-11-06/` (README, 01-04) | mw-tip@6e15a4245d3f only | 13 | 3 |
| MW companion skill `.agents/skills/mechanical-pi-host/SKILL.md` | mw@97e18068f399 (Nov-4-era text; rewritten at tip) | 4 | 1 |
| MW tip README/AGENTS/docs edits restating pin-graded findings | mw-tip@6e15a4245d3f / mw@97e18068f399 | 2 | 1 |

What L1 can establish: what the author states (anchors for every claim; `anchor[]` on the rows), the program's own definitions, norms and proposals (`NON-EPISTEMIC`, 236 rows), and the program's self-reports (method, nothing executed) — the latter only as attributive claims until corroborated (C1101, C1388, C1428 are corroborated by the commit shape, L6). What L1 cannot establish: any current-state fact about either repository, any producer capability, any adoption of the proposed ABI. The companion program exists only at mw-tip (K105); 13 of its records are the only witnesses of the MW-R0..R8 labels and the `mechanical.pi-host/v1` / `evidenceProfile` / `contextProfile` tokens — all proposal force.

### L2 — The triage lineage (independent of L1 as an investigator product; 124 records)

| Surface | Pin | Records |
|---|---|---|
| Nov-4 triage ledger `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/` (CLAIMS.jsonl 490 rows, EPISTEMIC-AUDIT, CONTRADICTIONS, REMEDIATION M001-M050, BEAD-PLAN, ATOMIC-REQUIREMENTS) | pi@d7666a76f561 | 116 |
| Nov-4 Pi program docs (01-audit-and-evidence, 02-host-architecture-and-protocol, README) — same author as L1, dated 2026-11-04/05 | pi@d7666a76f561 | 6 |
| Nov-4 MW companion program `docs/programs/pi-workbench-interop-2026-11-04/` — same author | mw@97e18068f399 | 2 |

What L2 can establish: what the Nov-4 program said and how the machine-audited ledger graded it (the `SUPERSEDES` targets: 328 prior ids, 621 edges; prior grades read, never changed), and therefore the FIDELITY of the reconciliation (`supersedes_faithful` true 314 / false 3 / no prior 142). The ledger is a different lineage from the program text (investigator seats, Phase 9 gate exit 0), so `C1544` "the Nov-4 ledger records KU10 as CONTESTED" is ESTABLISHED from it alone; the Nov-4 program docs are NOT independent of L1 (same author) and serve only as the superseded text. Six ESTABLISHED/SUPPORTED rows rest on L2 alone (C1303, C1408, C1503, C1529, C1541, C1544): all are source reports about the Nov-4 artifacts themselves.

### L3 — Pi source and tests at the pin (primary; 106 + 11 records, 18 + 3 files)

`src/worktree.ts`, `src/workbench/claude-host.ts`, `src/workbench/execute-tool.ts`, `src/workbench/execute.ts`, `src/workbench/hosts/local-detached.ts`, `src/workbench/hosts/furnace-hosted.ts`, `src/index.ts`, `src/workflow/runtime.ts`, `src/workbench/collective-event.ts`, `src/workbench/tool-replies.ts`, `src/workbench/reactivefiber-observer.ts`, `src/agent-manager.ts`, `src/workflow/tool-description.ts`; tests `test/worktree.test.ts`, `test/workbench-execute-tool.test.ts`, `test/workbench-claude-cancel-faults.test.ts`. Byte-identical at the program-stated baseline 278c8f79 and at d7666a76 (`git diff --name-only 278c8f79 d7666a76` is docs-only).

What L3 establishes: every Pi current-state finding — the worktree catch (F01), the grants contradiction (F02), the structural cancel window (F03, mechanism only), the replayBasis members (F04), the non-script refusal and absent host (F09), the semaphores (F16), node() dispatch (F17), the RF preview comment (F19, one authorial step removed from the RF producer). Limits: source presence is not a witnessed pass (01:3; nothing run); a committed test asserts the lossy report (K102); unlanded branches excluded (K110).

### L4 — MechanicalWorkflows source, contracts and tests at the pin (70 + 7 records, 16 + 1 files) and at earlier revisions via `git show` (L6)

`apps/development-rig/src/{claude-implement,live-development,entrypoint-host,installed-host,git-source-publication,rf-workload,rf-context}.ts`, `apps/development-rig/package.json`, `packages/development/src/contracts.ts`, `packages/development/package.json`, `packages/coordination/README.md`, `contracts/entrypoints/development.v1.json`, `apps/development-rig/test/entrypoint-descriptor-file.test.ts`. Unchanged between 97e18068 and 6e15a4245d3f (drift is docs-only).

What L4 establishes: the descriptor repair (F05, with the pre-image at 0c78e253 / 1f29daa7^ via `git show`), the pre-dispatch-only signal (F06), the missing exports map (F11), the four outcome variants, the trusted in-process loader, the app-local digests (F04b), the result-side `mode` literal (K104), the idempotency fingerprint (K112), the absence of Pi imports in MW core. Limits: static; the SDK internals are not inspected; Forge/HX/RF/Furnace producers are not pinned in this triage.

### L5 — Producer-probe evidence outside the authorial lineage (56 records)

| Surface | Pin | Records | Producer |
|---|---|---|---|
| `docs/workbench/receipts/wb-f3wd.md` + `qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json` | pi@d7666a76f561 | part of 37 | machine seat wb-f3wd: installed hx 0.1.0 (binary SHA-256 recorded), three `find` legs on a two-file fixture; 84-capability roster |
| `docs/workbench/receipts/wb-muip.md` + JSON transcripts | pi@d7666a76f561 | part of 37 | machine seat wb-muip: receipt census (205 entries / 56 files, 0 witnesses, four stores declared unread) and two failed-gate Forge 0.2.1 invocations |
| MW `docs/10-current-state-and-gaps.md`, `qa/integration/2026-10-15-*` | mw@97e18068f399 | 5 (+ listing probes in L6) | MW's own historical live receipts (2026-10-15 Forge PASS/FAIL, Claude end-to-end, Furnace Run/Attempt; mid-gate FORGE_OPERATION_CANCELLED) |
| `new-feedback/*.md` (44 files at the pin; 14 records / 11 files cited) | pi@d7666a76f561 | 14 | orchestration agents' dated append-only reports (doc 02 feedback table) |

What L5 establishes: the receipt-stated facts (F07, F08) exactly as scoped by the receipts' own detection models — version-scoped (hx 0.1.0, find verb), store-scoped (searched stores; MW repo unread), argv-scoped (two failed-gate invocations). Doc 02's feedback counts resolve verbatim to dated files (7 of 8 rows; the eighth, "Multiple October reports", carries no counts). Independence: the seats are not the program author; the receipts landed on master before d7666a76 and were read, not re-run, here. Limits: one producer version each; nothing re-executed; the census did not search the MW repository.

### L6 — Git history and read-only probes at the pins (75 probe records, 66 distinct commands or listings)

`git diff --name-only 278c8f79 d7666a76` (10 docs files), `git log --format=... 97e18068..6e15a4245d3f` (2ea69445, 6e15a424), `git ls-tree --name-only 97e18068 docs/programs/` (no companion dir), `git show 0c78e253:...` / `git show 1f29daa7^:...` (descriptor pre-images), `git blame -L 112,112 docs/workbench/feature-matrix.md` (10a67e73 2026-10-15), `git log --diff-filter=A -- src/workbench/collective-event.ts` (f65860e1 2026-10-28), `git log HEAD..origin/machine/flywheel/wb-5ik5` / `wb-413a` / `wb-ocie` (unlanded cuts), `git show --stat d7666a76` (282+/25-, docs only), greps for `mechanical`, `AbortController`, `idempoten`, `unsupported-definition-kind`, `exports|main`, `.github` listings. The roll-up re-ran five of these read-only (baseline diff, MW drift log and file list, `ls-tree` at pin and tip, `.github` listing, bead JSON parse, idempotency grep) and recorded the outputs as evidence (`origins` = `rollup-pin-read`).

What L6 establishes: temporal facts (what changed when; ancestry of 1f29daa7/f7c0a943; drift), absence claims with an armed detector (grep/ls over a bounded tree), and the pin/baseline inconsistency of the companion citation (K105). Limits: a probe witnesses the tracked tree it ran over; unlanded branch content was listed, not inspected (K110).

### L7 — Repository documents and the beads store at the pin (20 records: 9 Pi repo docs, 7 beads rows, 2 CI, 2 AGENTS.md/forge.toml)

`docs/workbench/feature-matrix.md:112` (W11 row; stale since f65860e1), `docs/workbench/README.md:55,57-59`, `docs/workbench/13-contracts-and-config.md:10`, `AGENTS.md:167`, `forge.toml`, `.github/workflows/ci.yml`, `.beads/issues.jsonl` (wb-1a3t epic description pins pi b27829e6 / mw f7c0a943; wb-muip and wb-f3wd closed 2026-11-06; wb-9v02 in_progress; wb-1zn2 deferred).

What L7 establishes: the subject facts for the W11, GitHub-CI and bead-pin findings (K107, K108, K115, K116, K117). The W11 row is itself a dated authorial artifact (2026-10-15 / 2026-10-27) and is graded as a stale source, not as evidence of current state.

### Not available (named)

- No live Claude / Forge / Furnace / HX / RF call; no `npm pack`, no vitest run, no Forge gate (the program's own L0 status is corroborated, not exceeded).
- Forge, HyperUnix, ReactiveFiber and Furnace are not pinned in this triage; producer facts come only from committed receipts and Pi/MW source comments.
- The installed environment (globally installed packages/extensions) was not inspected (C1557 scope).
- Unlanded machine/flywheel branches were listed by ref and subject line only; their content was not read for correctness (K110).
- The MW repository was not searched for a receipt of a Pi launch (the wb-muip census declared it unread; C0321 stays UNDETERMINED).
- No author session transcript (C1101, C1503 "reviewed" self-reports stay attributive).

## 2. Independence map — what rests on what

| Family (restatement cluster across docs 01-05 / README / hosting / SKILL) | Witness lineages in `support[]` | Independent of L1? | Resulting ceiling |
|---|---|---|---|
| F01 worktree P0 (11 members, g01/g02/g03) | L3 code + tests, L6 | yes | ESTABLISHED at the pin; byte-loss reproduction still owed (wb-5ik5) |
| F02 detached grants (11) | L3, L6 | yes | ESTABLISHED (static derivation; runtime refusal unwitnessed, wb-wupg) |
| F03 cancel race (7) | L3 (mechanism), L1 (hypothesis wording), L7 (wb-9v02) | mechanism yes; outcome no | SUPPORTED hypothesis everywhere; never promoted (lens-logic[3]) |
| F04 replay basis (8) | L3, L2 | yes | ESTABLISHED by enumeration of the single replayBasis literal |
| F05 descriptor repair (13) | L4 + L6 pre-images, L2 | yes | ESTABLISHED; temporal split faithful to the Nov-4 grades |
| F06 MW cancel pre-dispatch (11) | L4, L5 (docs/10), L2 | yes | ESTABLISHED (Claude-session scope); K111 |
| F07 HX probe (13) | L5 receipts, L2 | yes (machine seat) | ESTABLISHED as receipt reports, version/verb-scoped; C1550 overclaims |
| F08 wb-muip census (8) | L5 receipts, L1, L2 | yes (machine seat) | ESTABLISHED scoped absence; universal stays UNDETERMINED |
| F09 no Mechanical host (17) | L3, L6, L1 | yes | ESTABLISHED at the tracked tree (K110 defeater) |
| F10 collective-event / W11 stale (7) | L3, L6, L7, L2 | yes | ESTABLISHED existence; 'overlooked' and 'integration' overclaim |
| F11 MW packaged consumer (6) | L4 manifest, L6 | yes | ESTABLISHED (no exports map); 'incomplete' inherits proposal force |
| F12 companion at tip (2 + 12 norms) | L6 ls-tree, L1 companion | partly (existence yes; content L1 only) | ESTABLISHED at mw-tip only; all companion-derived norms proposal force |
| F13 program executed nothing (6) | L6 commit shape, L1 | yes | SUPPORTED (uncommitted runs unobservable) |
| F14 baselines/drift (5) | L6 | yes | ESTABLISHED |
| F15 no GitHub CI (1 + 3 norms) | L7 ci.yml, L7 AGENTS.md, L2 M047 | yes | REFUTED as observation; norm narrowed |
| F16 semaphores (3) | L3 | yes | ESTABLISHED/SUPPORTED (prospective halves) |
| F17 node() (3) | L3, L2 | yes | ESTABLISHED |
| F18 selectors not deployed (3 + 5 norms) | L3/L4 greps, L1 | yes for absence; proposals L1 only | ESTABLISHED absence; proposals NON-EPISTEMIC |
| F19 RF preview (7) | L3 comment, L4 rf-context.ts | one step removed from the RF producer | ESTABLISHED/SUPPORTED (not run) |
| F20 MW receipts 2026-10-15 (5) | L5, L6 | yes | ESTABLISHED/SUPPORTED (dated; later MW evidence exists, none about Pi) |
| doc 03 ABI, doc 04 stages, doc 05 journeys, hosting target design, SKILL rules (236 NON-EPISTEMIC rows) | L1 only (anchors) + code-witnessed presuppositions on 157 rows | no | proposal/requirement force; adoption unwitnessed in any code or third artifact |

Reading the map: 174 of 183 ESTABLISHED rows and 36 of 38 SUPPORTED rows have at least one witness outside the authorial lineage; the rest are source reports whose subject is the prior triage or a repo document. No ESTABLISHED current-state row rests on L1 alone. 157 of 236 NON-EPISTEMIC rows have their presuppositions witnessed by code or producer evidence; 79 rest on their anchor or on L1/L2 text — these are the pure design proposals (doc 03 axes, doc 04 stage acceptances, doc 05 journeys, SKILL steps) and carry proposal force only.

## 3. Provenance defeaters recorded on rows

- **Same-lineage restatement** (60 `SAME_ORIGIN_AS` relations, 21 of them roll-up family hyperedges): doc 01 findings re-appear in doc 02, README:18/22, hosting.md:7/17 and SKILL:12-17; MW tip README/AGENTS/SKILL restate the pin-graded MW findings. Counted once; never as a second source.
- **Companion counterpart** (K105): the MW companion program is the paired commit of the same author; its agreement with doc 03 on `evidenceProfile`/`contextProfile`/`mechanical.pi-host/v1` is internal coherence (lens-logic[8]). It is also absent at the stated MW baseline, so 13 records carry pin `mw-tip@6e15a4245d3f` and the rows they support carry a tip-only scope restriction.
- **Prior-ledger grades as evidence**: the Nov-4 ledger grades are used only to judge fidelity (`supersedes_faithful`), never to upgrade a new claim (C1224's upgrade of C03114 PLAUSIBLE -> ESTABLISHED is authorized by the wb-f3wd receipt, L5, not by the ledger).
- **Pi reading of a producer's docs** (F19): the RF `--no-commit` fact is a Pi source comment citing RFCLI docs at 6a251bf73af5; one authorial step removed from the producer (lens-negative[27]).
- **Receipt detection models carried, not widened**: the wb-muip and wb-f3wd receipts define their own witness/absence detectors; every restatement stays inside them (lens-scope[11], [12]).
- **Triage corpus self-reference**: two records point at the triage's own claims-part files (the id-collision defect); they support no claim about the artifact.

## 4. Ledger provenance note

- `CLAIMS.jsonl` ids: part-01 C1101-C1257, part-03 C1301-C1390, part-04 C1401-C1499 + C14100-C14121 unchanged; part-02 re-keyed +300 (C1501-C1631). `original_id`, `part`, `group`, `claim_file`, `status_file` and `dossier` are on every row. Rows are sorted by numeric id.
- `support[]` / `counterevidence[]` / `anchor[]` hold `EVIDENCE.jsonl` ids only; `anchor[]` is the row's own artifact sentence (self-reference kept out of `support[]`). `evidence[]` keeps the investigators' inline citations verbatim for readers without the evidence file. Four g01 rows that cited no witness (C1112, C1128, C1180, C1242) and the overclaiming C1217 received support records from roll-up pin re-reads (quotes verbatim; `rollup_adjustments` names them).
- `RELATIONS.jsonl`: 1458 rows — 679 g01, 252 g02 (re-keyed), 394 g03 (from/to normalized to tails/heads), 133 roll-up (95 lens relations typed by effect — the 4 corpus-defect lens rows map to no claim —, 21 restatement-family hyperedges, 17 contradiction-set hyperedges); 630 prior-link `SUPERSEDES`/`SPECIALIZES`/`GENERALIZES`/`CONFLICTS_WITH` edges to C0xxx ids (grades untouched); 102 cross-group.
- `LENSES.jsonl`: the 99 lens rows with claim ids resolved to merged ids; 4 rows are corpus-defect rows (no claim mapping); 2 citations resolved by content with a note (`id_resolution_notes`).
- Durable homes (MANIFEST.md): pi-subagents master under `<programDir>/triage/` after landing, mirror `~/s3/artifacts/pi/owner/2026-11-07-mwi-audit-triage/`; this working directory is purgeable scratch.
