# Pi-subagents requirement roll-up

2026-11-11. Pin **ce180d82f9385a315ff26bd8e7f9202cac19f5b3**, fork v0.20.0. This is a requirement/mapping/custody roll-up, not implementation or release certification. **All 98 acceptance states are NOT_RUN**; named missing artifacts remain BLOCKED. No bead mutations, git commits, source edits or docs/08 amendment were made.

## Index and counts

| Shard | Range | Full rows | File |
|---|---|---:|---|
| LX | EAT-R311..R340 | 30 | .work/req-r-lx.md |
| Operations | EAT-R341..R365 | 25 | .work/req-r-ops.md |
| Platform | EAT-R366..R390 | 25 | .work/req-r-platform.md |
| Follow-on | **EAT-R471..R488** | **18** | .work/req-r-followon.md |
| Total | R311..R390 + R471..R488 | **98** | CLAIM-REQUIREMENT-MAP.jsonl / TDD-MATRIX.md |

**R391..R470 are MII-reserved and were not allocated.** New rows: 12 BEHAVIORAL / EMPIRICAL_REPAIR (seven F-01 journey breaks and five F-13 priorities), five VERIFICATION / EVIDENCE_ACQUISITION (C120, C142, C216, C241, C245), one NEGATIVE_REGRESSION / RISK_CONTROL (C238 explicit loopback). R351/R352 criterion 3 carries EVIDENCE_ACQUISITION gate authority in the map without new statements.

One canonical disposition per each of 267 claims: 147 defect claims compiled, **77 defect claims tabled DEFERRED_FOR_RANGE_CAPACITY**; 35 positives appear as derivation premises in retained historical/new rows and eight have retained-positive dispositions. The 77 uncompiled deferrals comprise six F-01 remainder, ten F-13 remainder and 61 prior-shard residual claims. Compiled does not mean repaired; joined dispositions retain independent implementation residuals.

## One V ladder (F-07)

| Canonical V | Meaning | Normalized L evidence |
|---|---|---|
| V0 | pinned static census/status | L1 census + L10; applicable focused validators also L4/L5 |
| V1 | focused red-first module/seam assertions and mutants | L4 + applicable L5 |
| V2 | independently packed/installed consumer | L1 + L6/L7/L8 through G-CONSUMER; registry rendering requires its own artifact gate |
| V3 | actual registered Pi tool or production component, injected I/O only | L3, with L2 contract and L8 agent journey where applicable |
| V4 | joined mandatory native Mechanical path | L1 + L6; no current row targets V4 |
| V5 | restart/fault/process/load/operational trial | L1 + L5 + L6; operator UX L7 when applicable |
| V6 | actual optional native HX/RF/Forge/Furnace producer | L1/L6 via the named real-producer gate; lower-tier assertions still apply |

This ladder supersedes conflicting local shard definitions for handoff only. The existing TDD-MATRIX.md normalization table preserves the legacy meaning of each original V label. The canonical map stores **L-tier lists**, derived from applied matrix cells, not raw V labels. A native pass cannot be minted from an injected V3 callback. `A`/`A*` are planned applicability, never green; missing exact artifact => BLOCKED.

## Family vocabulary (F-11)

The map `family` is the CLAIMS.jsonl ledger family, a string for one family or a sorted array for cross-family premises. `workbenchGroup` preserves the distinct W/VC/program Maps-to vocabulary. W07 is a workbench ownership/group label, not the ledger family `providers`; neither is substituted for the other. `existingBeads` contains active extension/coordination targets, not proof of coverage; closed ids remain explicitly labeled lineage and are never filing targets.

## Owner ruling and R345 (F-04)

Owner ruling 2026-11-11: the shipped docs/workbench/08 contract stands — inspection after host loss reports unknown with reconciliation guidance, never a replayed verdict; wb-0kg.3's falsifier is affirmed. EAT-R345's graceful-retirement/saved-observation distinction is deferred as a NORMATIVE_DESIGN candidate for the next program revision; every R345 cell stays A*(G-RULING) BLOCKED until a docs/08 amendment is separately adopted.

R345 historical Statement and criteria remain byte-identical as required by the no-re-derivation directive. Its condition and map identify a deferred candidate, not adopted implementation authority. Every L0–L10 matrix cell is **A*(G-RULING) BLOCKED**. The received ruling does not open the gate: a separately adopted docs/08 amendment is still required. The shipped contract and wb-0kg.3 falsifier are affirmed.

## F-01 closure

| Claim | Disposition |
|---|---|
| C059 | compiled: EAT-R471; implementation residual: none beyond the named invariant; no blanket claim closure |
| C060 | compiled: EAT-R472; implementation residual: none beyond the named invariant; no blanket claim closure |
| C177 | compiled: EAT-R473; implementation residual: none beyond the named invariant; no blanket claim closure |
| C123 | compiled: EAT-R474; implementation residual: none beyond the named invariant; no blanket claim closure |
| C125 | compiled: EAT-R475; implementation residual: none beyond the named invariant; no blanket claim closure |
| C023 | compiled: EAT-R476; implementation residual: none beyond the named invariant; no blanket claim closure |
| C004 | compiled: EAT-R477; implementation residual: none beyond the named invariant; no blanket claim closure |
| C020 | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Derive the memory directory from a slug (handleBase) or reject the combination at load with the file named; add the directory line to the read-only block. |
| C025 | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Offer registry-derived choices in the wizard (newest per family), or write a family alias once fuzzy resolution prefers the newest id. |
| C066 | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Return details {taskId} and add renderCall/renderResult that reuse renderWorkflowCard for embedded launches and a compact one-line render for detached launches and refusals (refusals styled as errors). |
| C070 | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Add a wiring test that boots the extension in a hermetic dir and runs workflow_catalog -> workflow_execute(embedded) -> completion notification, plus the user-level-definition and stale-digest refusals. |
| C071 | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Add `--subagents-workflow-args=<json &#124; @file>` (JSON-checked like the tool's args) and give flag runs a journal path so resumeFromRunId works. |
| C124 | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Export one grant-list judge and one clean-text judge from a shared module (settings.ts already owns the grammar) and have the three seams import it; decide in writing whether coordination's narrower rule is intended and pin the five forms above either way. |

## F-13 priority and residual-deferral table

Exactly one disposition for each of the 15 formerly prose-only deferrals. Five are now full atomic rows; ten remain tabled with the investigator cureHint. A scoped full row does not erase an independent residual.

| Claim | Grade | Family | Disposition / cureHint |
|---|---|---|---|
| C002 | ESTABLISHED | agents | compiled: EAT-R484; implementation residual: none beyond the named invariant; no blanket claim closure |
| C003 | ESTABLISHED | agents | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: When ctx.mode is print/json, default run_in_background to false and say so in the reply, or hold the turn on manager.waitForAll(); await the mention clone when headless; correct README.md:195. |
| C005 | ESTABLISHED | agents | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Validate frontmatter against a key/type/enum table: warn (and fail under strictAgentFiles) on unknown keys and invalid values, accept yes/no/on/off and quoted booleans/numbers, and alias Claude Code camelCase keys and capitalised tool names. |
| C014 | ESTABLISHED | agents | compiled: EAT-R487; implementation residual: R487 compiles result retrieval only; tombstone-backed model resume/steer and retention-policy choices remain uncompiled. |
| C021 | ESTABLISHED | agents | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Reuse pi's pattern resolver, or warn once and fail closed when any pattern is unsupported. |
| C022 | ESTABLISHED | agents | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Force params.subagent_type = opts.type in cloneAgentTool.execute and add the clone session's assistant usage to pendingUsage. |
| C050 | ESTABLISHED | execute | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Guard the flag's completion callback like scheduleNudge does (try/catch around appendEntry/sendMessage) and, in print mode, await the flag-launched run inside session_start (or hold the session) and write the result to stdout; add a print-mode e2e case to test/subagents-print-mode-e2e.test.ts. |
| C051 | ESTABLISHED | execute | compiled: EAT-R488; implementation residual: none beyond the named invariant; no blanket claim closure |
| C052 | ESTABLISHED | execute | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Fold running workflow tasks into registryEntry.hasRunning/waitForAll (await the runWorkflowTask promises kept on the task), and say in README 'Cross-Extension RPC'/headless notes that workflows are held too. |
| C054 | ESTABLISHED | execute | compiled: EAT-R486; implementation residual: R486 compiles embedded cancel; R343 compiles detached cancel. Detached shutdown/reclamation is still uncompiled, not a duplicate cancel bead. |
| C062 | ESTABLISHED | execute | compiled: EAT-R485; implementation residual: none beyond the named invariant; no blanket claim closure |
| C068 | ESTABLISHED | execute | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Let workflow_observe without taskId return a bounded page of this session's runs {taskId, name, status, startedAt}; optionally accept a caller idempotency key on workflow_execute that returns the existing invocation. |
| C116 | ESTABLISHED | interop | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Re-key rows M048-M050 (and the page rows) by a content anchor (the sentence stands exactly once in its section) instead of a line number, or move the 50 historical corrections into a frozen ledger so the live skill is free to change. No live bead names this (searched the pin's .beads/issues.jsonl for docs-remediation, SKILL:L, line-anchored: 0 live hits). |
| C178 | ESTABLISHED | observe | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Add a bounded workflow list read (id, name, status, startedAt, node count; newest first; same scope ACL) and name it in the unavailable refusal; rehydrate finished tasks from the session task dir on session_start, or say 'not retained after restart' explicitly. Scope the resume-miss roster to the caller's session. |
| C193 | ESTABLISHED | observe | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Emit a progress line per series on stderr (12 series) and state the expected duration in the header; set the module type for dist (or emit .mjs) so Node does not reparse. |

## F-14 positives retained

These are retained test obligations, not claims that suites were rerun or that old green establishes complete correctness. All four grades are ESTABLISHED at the ledger pin.

| Positive | Scoped invariant | Retained resolvable oracles |
|---|---|---|
| C032 | 18-file / 645-test agent-family baseline; keep existing assertions alongside new cases, not blanket correctness | test/agent-manager.test.ts; test/agent-types.test.ts; test/custom-agents.test.ts; test/model-resolver.test.ts; test/model-scope.test.ts; test/enabled-models.test.ts; test/mention.test.ts; test/mention-clone.test.ts; test/group-join.test.ts; test/skill-loader.test.ts; test/invocation-config.test.ts; test/memory.test.ts; test/prompts.test.ts; test/agent-manager-gc.test.ts; test/foreground-result-retrieval.test.ts; test/agent-dir.test.ts; test/agent-mention-wiring.test.ts; test/nested-tools.test.ts |
| C075 | golden catalog → embedded execute → completion and five unmodified examples | test/workflow-examples.test.ts; test/workflow-examples-claude-backend.test.ts; test/workflow-tool-description.test.ts; test/workflow-tool.test.ts; probes/execute/real-extension.probe.test.ts |
| C155 | SIGKILL worktree exact-byte preservation and non-destructive restart prune | test/worktree-process-kill-preservation.test.ts; test/worktree.test.ts; probes/journal/p10-worktree.probe.ts |
| C197 | in-turn task-id/script addressability and partial-gap for evicted events | probes/observe/t/b-registered.probe.test.ts; probes/observe/t/a-builder.probe.test.ts; test/workflow-tool.test.ts |

## Filing-time instructions (F-03 / F-10)

No beads were created or amended. R349 map directive is `extend:wb-752.13`; R374 is `extend:wb-79k.3`. Every original multi-MUST row (seven three-MUST and thirteen two-MUST statements) has `filingDirective:"split-per-criterion"` in the canonical map. Keep the EAT id as provenance/parent and split at filing, not by re-deriving the historical statement.

## Audit-fix ledger

| Fix | Completed action / remaining condition | Evidence file:line |
|---|---|---|
| F-01 | Seven full journey-break rows R471..R477; six remaining claims tabled with exact cureHints; no uncovered roll-up claim. | .work/req-r-followon.md:7; .work/req-r-followon.md:281 |
| F-02 | R328/R331 target wb-9x5.11, R329 wb-79k.3; header corrected; closed targets retained only as lineage. | .work/req-r-lx.md:9; CLAIM-REQUIREMENT-MAP.jsonl:18; CLAIM-REQUIREMENT-MAP.jsonl:19; CLAIM-REQUIREMENT-MAP.jsonl:21 |
| F-03 | FILING-TIME only: explicit extension directives; no bead mutation. | CLAIM-REQUIREMENT-MAP.jsonl:39; CLAIM-REQUIREMENT-MAP.jsonl:64 |
| F-04 | Verbatim owner ruling; historical R345 candidate preserved; all 11 cells BLOCKED pending separately adopted docs/08 amendment. | .work/req-r-ops.md:83; TDD-MATRIX.md:90 |
| F-05 | Five acquisition rows R478..R482; C238 resolved loopback guard R483; R351/R352 G-PTY authority recorded. Missing acquisition artifacts remain BLOCKED. | .work/req-r-followon.md:116; CLAIM-REQUIREMENT-MAP.jsonl:41; CLAIM-REQUIREMENT-MAP.jsonl:42; CLAIM-REQUIREMENT-MAP.jsonl:93 |
| F-06 | 98 canonical schema rows; ledger grades copied; original legacy shards retained for historical checker compatibility. | CLAIM-REQUIREMENT-MAP.jsonl:1; CLAIM-REQUIREMENT-MAP.jsonl:98 |
| F-07 | One canonical V ladder and existing V→L normalization; canonical map verification is applied L-tier list. | TDD-MATRIX.md:21; CLAIM-REQUIREMENT-MAP.jsonl:81 |
| F-08 | Corroborating claims attached to rationale/map (C045/C157/C203→R327, C213→R339, C083→R349/R367, C229→R363); canonical joined dispositions replace conflicting blanket deferrals and retain independent residuals. | CLAIM-REQUIREMENT-MAP.jsonl:17; CLAIM-REQUIREMENT-MAP.jsonl:53; .work/req-r-ops.md:471 |
| F-09 | Grade words added C030/C145; C145 maps to R357; preservation controls moved to preserves (C074/C073/C194, plus C195). | CLAIM-REQUIREMENT-MAP.jsonl:11; CLAIM-REQUIREMENT-MAP.jsonl:12; CLAIM-REQUIREMENT-MAP.jsonl:18; CLAIM-REQUIREMENT-MAP.jsonl:47 |
| F-10 | FILING-TIME only: split-per-criterion for all 20 multi-MUST statements; original Statement bytes unchanged. | CLAIM-REQUIREMENT-MAP.jsonl:5; .work/rollup/validate.out:1 |
| F-11 | Every canonical row has ledger family beside retained workbenchGroup; multi-family rows explicitly array-valued. | CLAIM-REQUIREMENT-MAP.jsonl:31; CLAIM-REQUIREMENT-MAP.jsonl:77 |
| F-12 | R367 c4/condition and disposition name closed landed custody pin + test/workbench-rf-stderr-receipt-capture-census.test.ts. No custody pin amendment. | .work/req-r-platform.md:41; CLAIM-REQUIREMENT-MAP.jsonl:57 |
| F-13 | Five priority rows R484..R488; all 15 formerly prose-only claims tabled above with joined disposition/cureHint. | .work/req-r-followon.md:202; .work/rollup/dispositions.jsonl:3 |
| F-14 | C032/C075/C155/C197 retained exact test/probe paths; no new unnecessary requirement IDs. | .work/rollup/dispositions.jsonl:155 |
| F-15 | R366 condition/map corrected to events()/answerCount versus find()/rows(); G-HX AVAILABLE, not SDK-blocked. | .work/req-r-platform.md:28; CLAIM-REQUIREMENT-MAP.jsonl:56 |

## Checker executions and limitations

Executed the original scripts unchanged with `python3 -I`, refreshing their prerequisite `parsed.json` through their unchanged `parse.py`. All three scripts exited 0. Output receipts are .work/rollup/parse.out, check1.out, check2.out and checker-exits.txt. Exit 0 is **not** treated as a full-set pass: these scripts print findings rather than returning a failure status.

**Hard-coded scope:** parse.py loads only req-r-{lx,ops,platform}.md and their three maps; check1.py fixes its id range at R311..R390. check2.py reads that 80-row parsed snapshot and only the original three shard texts, not req-r-followon.md, the canonical map or this index. Consequently it still reports 13 uncovered claims and four unmapped positives, despite their new rows/tables/retained oracles. The checkers were not modified. The supplemental validator checks all 98 rows and 267 dispositions; it does not claim implementation acceptance.

### Original parser output

```text
requirements parsed: 80 maps: 80 ledger rows: 267
```

### Original check1.py output

```text
A. ids: 80 unique: 80 min 311 max 390
   missing in 311..390: [] outside range: []
   map ids == req ids: True
    req-r-lx.md 311 .. 340 n= 30 monotone: True contiguous: True
    req-r-ops.md 341 .. 365 n= 25 monotone: True contiguous: True
    req-r-platform.md 366 .. 390 n= 25 monotone: True contiguous: True

B. field completeness
   types: {'BEHAVIORAL': 59, 'REPRESENTATION': 12, 'INSTRUMENTATION': 2, 'NORMATIVE_DESIGN': 3, 'NEGATIVE_REGRESSION': 4}
   authorities: {'EMPIRICAL_REPAIR': 64, 'NORMATIVE_DECISION': 8, 'LINGUISTIC_INTEGRITY': 7, 'RISK_CONTROL': 1}
   tiers: {'V3': 20, 'V3.': 21, 'V2.': 2, 'V1 today': 1, 'V1': 1, 'V1.': 1, 'V5': 16, 'V6': 12, 'V2': 5, 'V0': 1}
   criteria count distribution: Counter({3: 57, 2: 19, 4: 4})

C. laundering check
   issues: 0
```

### Original check2.py output

```text
defects: 224 positives: 43

DEFECT COVERAGE: Counter({'COMPILED': 132, 'DEFERRED': 79, 'UNCOVERED': 13})
by grade x state: Counter({('ESTABLISHED', 'COMPILED'): 120, ('ESTABLISHED', 'DEFERRED'): 66, ('SUPPORTED', 'DEFERRED'): 13, ('ESTABLISHED', 'UNCOVERED'): 11, ('SUPPORTED', 'COMPILED'): 11, ('SUPPORTED', 'UNCOVERED'): 2, ('PLAUSIBLE', 'COMPILED'): 1})

UNCOVERED defects (no requirement, no deferral, no mention):
   C004 ESTABLISHED agents gap | An agent file's `model:` goes through two different resolvers depending on how the agent is started. The Agent tool uses the fuzzy resolver; a direct 
   C020 ESTABLISHED agents DX | An agent whose `name:` contains a space, which the loader deliberately allows, cannot be spawned once it sets `memory:`, and the failure appears only 
   C023 ESTABLISHED agents DX | Shutting the session down while an agent is in flight raises unhandled promise rejections ('This extension ctx is stale…') from the manager's error-pa
   C025 SUPPORTED agents QoL | Hard-coded model pins lag the registry. The create wizard's haiku/sonnet/opus choices write claude-haiku-4-5, claude-sonnet-4-6 and claude-opus-4-6, a
   C059 ESTABLISHED execute gap | workflow_catalog hands out definition references that workflow_execute then refuses. (a) Saved workflows in the user's agent dir (`<agentDir>/workflow
   C060 ESTABLISHED execute gap | The same digest-pinned definition behaves differently by hostMode and nothing says so before launch. On the detached host a nested workflow() is fatal
   C066 ESTABLISHED execute UX | For the operator, a workflow launched through workflow_execute does not look like a workflow in the transcript. The tool defines no renderCall or rend
   C070 SUPPORTED execute DX | No test in the gate drives a real embedded launch through the booted workflow_execute tool. The tool suite stubs the source resolver and both launcher
   C071 ESTABLISHED execute QoL | The `--subagents-workflow-file` flag cannot pass arguments to the script: one flag is registered, the script sees `args` as undefined, and the path ne
   C123 ESTABLISHED interop gap | The coordination boundary calls the producer export synchronously on the host's event loop with no deadline and no abort signal, and the latencyMs bud
   C124 ESTABLISHED interop gap | The three seams disagree on 'unknown permission data'. For one host grant read holding an entry outside the capabilityGrants grammar, workflow_execute
   C125 ESTABLISHED interop DX | A FIFO at descriptorPath makes the descriptor boundary wait forever and then keeps the host process from exiting. The same module refuses a FIFO at ar
   C177 ESTABLISHED observe gap | An operation started with forge_gate_run can never be read back by the agent: its reply says completion 'not-asserted', the host observes the terminal

MENTIONED-ONLY (named in a block but not compiled/deferred):

DEFERRED only via the r-lx coverage note ('left to sibling clusters') — check a sibling actually took it:
   C022 ESTABLISHED agents gap | The mention clone is not held to the agent the user typed, and its turn is billed nowhere visible. Whatever subagent_typ

DEFERRED only via prose (no table row):
   C002 ESTABLISHED agents gap
   C003 ESTABLISHED agents gap
   C005 ESTABLISHED agents DX
   C014 ESTABLISHED agents missing-req
   C021 ESTABLISHED agents gap
   C050 ESTABLISHED execute gap
   C051 ESTABLISHED execute missing-req
   C052 ESTABLISHED execute gap
   C054 ESTABLISHED execute missing-req
   C062 ESTABLISHED execute gap
   C068 ESTABLISHED execute missing-req
   C116 ESTABLISHED interop DX
   C178 ESTABLISHED observe missing-req
   C193 ESTABLISHED observe friction

per-family defect coverage:
   agents {'COMPILED': 16, 'DEFERRED': 6, 'UNCOVERED': 4}
   detached {'COMPILED': 7, 'DEFERRED': 8}
   execute {'DEFERRED': 6, 'COMPILED': 11, 'UNCOVERED': 5}
   furnace {'COMPILED': 8, 'DEFERRED': 9}
   inspector {'COMPILED': 9, 'DEFERRED': 8}
   interop {'COMPILED': 13, 'DEFERRED': 1, 'UNCOVERED': 3}
   journal {'COMPILED': 9, 'DEFERRED': 10}
   node-rpc {'COMPILED': 9, 'DEFERRED': 10}
   observe {'UNCOVERED': 1, 'DEFERRED': 2, 'COMPILED': 14}
   packaging {'COMPILED': 9, 'DEFERRED': 4}
   providers {'COMPILED': 15, 'DEFERRED': 10}
   scheduling {'COMPILED': 12, 'DEFERRED': 5}

STUB axis claims:
   C049 SUPPORTED detached COMPILED ['EAT-R387'] ['r-ops:DEFERRED_FOR_RANGE_CAPACITY', 'r-platform:cross-family-prose'] | nativeRuntimeIdentity is a hard-coded 'unsupported' literal in every receipt and snapshot while the landed exe
   C055 ESTABLISHED execute COMPILED ['EAT-R387'] ['r-lx:coverage-note(left to sibling clusters / residue)', 'r-platform:cross-family-prose'] | The `policy` parameter of workflow_execute is validated, bounded and echoed back in the reply, but nothing app
   C063 ESTABLISHED execute COMPILED ['EAT-R387'] ['r-lx:coverage-note(left to sibling clusters / residue)', 'r-platform:cross-family-prose'] | workflow_execute advertises three definition kinds but launches one. The schema and the pure admission accept 
   C069 SUPPORTED execute COMPILED ['EAT-R387'] ['r-platform:cross-family-prose'] | The host admission budget — the three shared pools (sdk-queries, child-processes, forge-operations) with a que
   C078 ESTABLISHED furnace COMPILED ['EAT-R387'] ['r-ops:DEFERRED_FOR_RANGE_CAPACITY', 'r-platform:cross-family-prose'] | Descriptor-only control verbs: the adapter table FURNACE_CONTROL_VERBS (src/workbench/furnace-control.ts:69-78
   C102 ESTABLISHED inspector COMPILED ['EAT-R387'] ['r-ops:DEFERRED_FOR_RANGE_CAPACITY', 'r-platform:cross-family-prose'] | Two controls of the rich inspector are bound in code and do nothing. Zoom-in is `matchesKey(data,'+') || match
   C119 ESTABLISHED interop COMPILED ['EAT-R387'] ['r-lx:coverage-note(left to sibling clusters / residue)', 'r-platform:cross-family-prose'] | The whole interop surface is test-only at the pin. None of its seven modules is reachable from the composition
   C126 ESTABLISHED interop COMPILED ['EAT-R387'] ['r-platform:cross-family-prose'] | The descriptor boundary admits a producer descriptor only while the descriptor declares itself non-invocable. 
   C169 SUPPORTED node-rpc COMPILED ['EAT-R387'] ['r-ops:DEFERRED_FOR_RANGE_CAPACITY', 'r-platform:cross-family-prose'] | 'observe' is a descriptor-only capability mode: CAPABILITY_MODES and CapabilityDescriptor.supportedModes accep
   C182 ESTABLISHED observe COMPILED ['EAT-R387'] ['r-lx:coverage-note(left to sibling clusters / residue)', 'r-platform:cross-family-prose'] | Three reply blocks of workflow_observe are placeholders for what docs/workbench/11 promises ('event window, ag
   C184 ESTABLISHED observe COMPILED ['EAT-R387'] ['r-lx:coverage-note(left to sibling clusters / residue)', 'r-platform:cross-family-prose'] | workflow_compare cannot produce a comparison through the registered tool: on two runs of one saved script with
   C185 SUPPORTED observe COMPILED ['EAT-R387'] ['r-lx:coverage-note(left to sibling clusters / residue)', 'r-platform:cross-family-prose'] | Two landed, tested read models of this family are reachable from nothing: src/workbench/latency.ts (latency de

POSITIVES: compiled 35 mentioned 4 neither ['C032', 'C075', 'C155', 'C197']
```

### Full-roll-up supplemental validator output

Command: `python3 -I requirements/.work/rollup/validate.py` (rc=0).

```text
PASS: 98 canonical/map/prose/matrix ids; original R311..R390 statements byte-identical; new R471..R488 contiguous; reserved R391..R470 untouched.
PASS: 267 unique claim dispositions; all map grades equal CLAIMS.jsonl; preservation controls separate; all acceptance NOT_RUN.
PASS: 18 new full atomic rows (12 BEHAVIORAL + 5 VERIFICATION/EVIDENCE_ACQUISITION + 1 NEGATIVE_REGRESSION/RISK_CONTROL), >=2 Assert criteria each.
PASS: F-02 live targets; F-03 filing extensions; F-05 pty gate authorities; R345 all 11 cells BLOCKED on G-RULING.
PASS: 42 concrete new-row oracle paths and all F-14 retained test paths resolve.
Defect dispositions: {'COMPILED': 147, 'DEFERRED_FOR_RANGE_CAPACITY': 77}
Positive dispositions: {'RETAINED_POSITIVE': 8, 'COMPILED': 35}
Total tabled uncompiled deferrals: 77 (F-01 six; F-13 ten; other prior-shard residual claims 61).
```

## Canonical per-claim disposition index

One row per ledger claim, including retained positives. This table and the per-requirement `claimDispositions` in the canonical map are authoritative over historical shard coverage prose. `compiled: …; implementation residual: …` is one scoped disposition, never contradictory COMPILED and DEFERRED statuses. Acquisitions are requirements to gather evidence, not empirical repairs.

| Claim | Grade | Family | Kind | Canonical disposition |
|---|---|---|---|---|
| C001 | ESTABLISHED | agents | defect | compiled: EAT-R311, EAT-R312; implementation residual: none beyond the named invariant; no blanket claim closure |
| C002 | ESTABLISHED | agents | defect | compiled: EAT-R484; implementation residual: none beyond the named invariant; no blanket claim closure |
| C003 | ESTABLISHED | agents | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: When ctx.mode is print/json, default run_in_background to false and say so in the reply, or hold the turn on manager.waitForAll(); await the mention clone when headless; correct README.md:195. |
| C004 | ESTABLISHED | agents | defect | compiled: EAT-R477; implementation residual: none beyond the named invariant; no blanket claim closure |
| C005 | ESTABLISHED | agents | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Validate frontmatter against a key/type/enum table: warn (and fail under strictAgentFiles) on unknown keys and invalid values, accept yes/no/on/off and quoted booleans/numbers, and alias Claude Code camelCase keys and capitalised tool names. |
| C006 | ESTABLISHED | agents | defect | compiled: EAT-R316; implementation residual: none beyond the named invariant; no blanket claim closure |
| C007 | ESTABLISHED | agents | defect | compiled: EAT-R313, EAT-R314; implementation residual: none beyond the named invariant; no blanket claim closure |
| C008 | ESTABLISHED | agents | defect | compiled: EAT-R313; implementation residual: none beyond the named invariant; no blanket claim closure |
| C009 | ESTABLISHED | agents | defect | compiled: EAT-R311; implementation residual: none beyond the named invariant; no blanket claim closure |
| C010 | ESTABLISHED | agents | defect | compiled: EAT-R313; implementation residual: none beyond the named invariant; no blanket claim closure |
| C011 | ESTABLISHED | agents | defect | compiled: EAT-R313; implementation residual: none beyond the named invariant; no blanket claim closure |
| C012 | ESTABLISHED | agents | defect | compiled: EAT-R315; implementation residual: none beyond the named invariant; no blanket claim closure |
| C013 | ESTABLISHED | agents | defect | compiled: EAT-R315; implementation residual: none beyond the named invariant; no blanket claim closure |
| C014 | ESTABLISHED | agents | defect | compiled: EAT-R487; implementation residual: R487 compiles result retrieval only; tombstone-backed model resume/steer and retention-policy choices remain uncompiled. |
| C015 | ESTABLISHED | agents | defect | compiled: EAT-R319; implementation residual: none beyond the named invariant; no blanket claim closure |
| C016 | ESTABLISHED | agents | defect | compiled: EAT-R314; implementation residual: none beyond the named invariant; no blanket claim closure |
| C017 | ESTABLISHED | agents | defect | compiled: EAT-R316; implementation residual: none beyond the named invariant; no blanket claim closure |
| C018 | ESTABLISHED | agents | defect | compiled: EAT-R317; implementation residual: none beyond the named invariant; no blanket claim closure |
| C019 | ESTABLISHED | agents | defect | compiled: EAT-R318; implementation residual: none beyond the named invariant; no blanket claim closure |
| C020 | ESTABLISHED | agents | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Derive the memory directory from a slug (handleBase) or reject the combination at load with the file named; add the directory line to the read-only block. |
| C021 | ESTABLISHED | agents | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Reuse pi's pattern resolver, or warn once and fail closed when any pattern is unsupported. |
| C022 | ESTABLISHED | agents | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Force params.subagent_type = opts.type in cloneAgentTool.execute and add the clone session's assistant usage to pendingUsage. |
| C023 | ESTABLISHED | agents | defect | compiled: EAT-R476; implementation residual: none beyond the named invariant; no blanket claim closure |
| C024 | ESTABLISHED | agents | defect | compiled: EAT-R320; implementation residual: none beyond the named invariant; no blanket claim closure |
| C025 | SUPPORTED | agents | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Offer registry-derived choices in the wizard (newest per family), or write a family alias once fuzzy resolution prefers the newest id. |
| C026 | ESTABLISHED | agents | defect | compiled: EAT-R318; implementation residual: none beyond the named invariant; no blanket claim closure |
| C027 | ESTABLISHED | agents | positive | retained regression: EAT-R484; retained oracle: cmd: cd probes/agents && ./RUN.sh p02-reply-dialect.probe.test.ts -t E3 -> out/p02-e3-unknown-type.json fallbackNone: `Unknown or disabled agent type: "code-reviewer". Available: general-purpose, Explore, Plan.`, spawnedAgents:0. Same refusal for a disabled general-purpose: out/p11-disable-and-fallback.json, third scenario (childrenThatActuallyRan: []).; no new acceptance pass |
| C028 | ESTABLISHED | agents | positive | retained regression: source-scoped ledger oracle; retained oracle: cmd: cd probes/agents && ./RUN.sh p13-positives.probe.test.ts -> out/p13-loader-positives.json: loadedNames [bom, extonly, good]; warnings `[pi-subagents] Skipping agent file <cwd>/.pi/agents/broken.md: Nested mappings are not allowed in compact mappings at line 1, column 14: … ^` and `… declares name "plugin:reviewer", which contains ":" — reserved for plugin-scoped identifiers. Rename it, or move the label to `display_name:`. Skipping.`; strictThrows `<cwd>/.pi/agents/broken.md: Nested mappings are not allowed…`; bomAgentBuiltins: [].; no new acceptance pass |
| C029 | ESTABLISHED | agents | positive | compiled: EAT-R312; implementation residual: none beyond the named invariant; no blanket claim closure |
| C030 | ESTABLISHED | agents | positive | compiled: EAT-R326; implementation residual: none beyond the named invariant; no blanket claim closure |
| C031 | ESTABLISHED | agents | positive | compiled: EAT-R389; implementation residual: none beyond the named invariant; no blanket claim closure |
| C032 | ESTABLISHED | agents | positive | retained regression: EAT-R477; retained oracle: test/agent-manager.test.ts; test/agent-types.test.ts; test/custom-agents.test.ts; test/model-resolver.test.ts; test/model-scope.test.ts; test/enabled-models.test.ts; test/mention.test.ts; test/mention-clone.test.ts; test/group-join.test.ts; test/skill-loader.test.ts; test/invocation-config.test.ts; test/memory.test.ts; test/prompts.test.ts; test/agent-manager-gc.test.ts; test/foreground-result-retrieval.test.ts; test/agent-dir.test.ts; test/agent-mention-wiring.test.ts; test/nested-tools.test.ts; no new acceptance pass |
| C033 | ESTABLISHED | detached | defect | compiled: EAT-R343; implementation residual: shutdown reachability is separate from cancel; preserve a separate reviewed action/permission requirement. |
| C034 | ESTABLISHED | detached | defect | compiled: EAT-R341; implementation residual: none beyond the named invariant; no blanket claim closure |
| C035 | ESTABLISHED | detached | defect | compiled: EAT-R345; implementation residual: R345 graceful-retirement saved observation is a deferred NORMATIVE_DESIGN candidate; docs/08 contract and wb-0kg.3 falsifier stand. |
| C036 | ESTABLISHED | detached | defect | compiled: EAT-R344; implementation residual: R344 compiles transport-loss classification; retirement interpretation cannot rely on the blocked R345 saved observation. |
| C037 | ESTABLISHED | detached | defect | compiled: EAT-R342; implementation residual: none beyond the named invariant; no blanket claim closure |
| C038 | SUPPORTED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Derive providers from held grants at both launch sites (mirror the embedded registry's grant-driven set) or refuse at launch when the script's node() targets are unreachable. |
| C039 | SUPPORTED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add optional input (JSON), timeoutMs and retentionMs to workflow_detached's launch parameters and pass them through. |
| C040 | ESTABLISHED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: In the entrypoint catch, write a redacted error.json beside the boot pin before exit and have the launcher's pre-handshake error name that file. |
| C041 | ESTABLISHED | detached | positive | compiled: EAT-R345, EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C042 | ESTABLISHED | detached | positive | compiled: EAT-R343; implementation residual: none beyond the named invariant; no blanket claim closure |
| C043 | ESTABLISHED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Shorten the per-launch template (pw-<uid>- to p-) or hash the uid into the digest, and correct the matrix row to the formula (103 - len(tmpdir) - uid-dependent overhead). |
| C044 | ESTABLISHED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add "type":"module" to package.json (or emit the host entrypoint as .mjs). |
| C045 | ESTABLISHED | detached | defect | compiled: EAT-R327; implementation residual: Tool-reference scope compiled in R327; no independent deferred tool-reference obligation remains. |
| C046 | SUPPORTED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Per-action refusal: name the missing token and the workbench.capabilityGrants settings key. |
| C047 | SUPPORTED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Accept bounded handshakeMs/idleMs launch params and append an idle-expiry/timeout row to controlAudit (or a terminal file) before stop(). |
| C048 | SUPPORTED | detached | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add action:'list' that reads the invocation directory and reports id, launchedAt, pid and socket-liveness per row. |
| C049 | SUPPORTED | detached | defect | compiled: EAT-R387; implementation residual: Wire the executable-identity observation into receipt construction for absolute-path runtimes, or drop the field from the receipt contract until W18 lands. |
| C050 | ESTABLISHED | execute | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Guard the flag's completion callback like scheduleNudge does (try/catch around appendEntry/sendMessage) and, in print mode, await the flag-launched run inside session_start (or hold the session) and write the result to stdout; add a print-mode e2e case to test/subagents-print-mode-e2e.test.ts. |
| C051 | ESTABLISHED | execute | defect | compiled: EAT-R488; implementation residual: none beyond the named invariant; no blanket claim closure |
| C052 | ESTABLISHED | execute | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Fold running workflow tasks into registryEntry.hasRunning/waitForAll (await the runWorkflowTask promises kept on the task), and say in README 'Cross-Extension RPC'/headless notes that workflows are held too. |
| C053 | ESTABLISHED | execute | defect | compiled: EAT-R321; implementation residual: none beyond the named invariant; no blanket claim closure |
| C054 | ESTABLISHED | execute | defect | compiled: EAT-R486; implementation residual: R486 compiles embedded cancel; R343 compiles detached cancel. Detached shutdown/reclamation is still uncompiled, not a duplicate cancel bead. |
| C055 | ESTABLISHED | execute | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C056 | ESTABLISHED | execute | defect | compiled: EAT-R322; implementation residual: none beyond the named invariant; no blanket claim closure |
| C057 | ESTABLISHED | execute | defect | compiled: EAT-R323; implementation residual: none beyond the named invariant; no blanket claim closure |
| C058 | ESTABLISHED | execute | defect | compiled: EAT-R324, EAT-R332; implementation residual: none beyond the named invariant; no blanket claim closure |
| C059 | ESTABLISHED | execute | defect | compiled: EAT-R471; implementation residual: none beyond the named invariant; no blanket claim closure |
| C060 | ESTABLISHED | execute | defect | compiled: EAT-R472; implementation residual: none beyond the named invariant; no blanket claim closure |
| C061 | ESTABLISHED | execute | defect | compiled: EAT-R325; implementation residual: none beyond the named invariant; no blanket claim closure |
| C062 | ESTABLISHED | execute | defect | compiled: EAT-R485; implementation residual: none beyond the named invariant; no blanket claim closure |
| C063 | ESTABLISHED | execute | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C064 | ESTABLISHED | execute | defect | compiled: EAT-R327; implementation residual: none beyond the named invariant; no blanket claim closure |
| C065 | ESTABLISHED | execute | defect | compiled: EAT-R321; implementation residual: none beyond the named invariant; no blanket claim closure |
| C066 | ESTABLISHED | execute | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Return details {taskId} and add renderCall/renderResult that reuse renderWorkflowCard for embedded launches and a compact one-line render for detached launches and refusals (refusals styled as errors). |
| C067 | ESTABLISHED | execute | defect | compiled: EAT-R326; implementation residual: none beyond the named invariant; no blanket claim closure |
| C068 | ESTABLISHED | execute | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Let workflow_observe without taskId return a bounded page of this session's runs {taskId, name, status, startedAt}; optionally accept a caller idempotency key on workflow_execute that returns the existing invocation. |
| C069 | SUPPORTED | execute | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C070 | SUPPORTED | execute | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Add a wiring test that boots the extension in a hermetic dir and runs workflow_catalog -> workflow_execute(embedded) -> completion notification, plus the user-level-definition and stale-digest refusals. |
| C071 | ESTABLISHED | execute | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Add `--subagents-workflow-args=<json &#124; @file>` (JSON-checked like the tool's args) and give flag runs a journal path so resumeFromRunId works. |
| C072 | ESTABLISHED | execute | positive | compiled: EAT-R389; implementation residual: none beyond the named invariant; no blanket claim closure |
| C073 | ESTABLISHED | execute | positive | retained regression: EAT-R322; retained oracle: probes/execute/results/script-runtime.json; no new acceptance pass |
| C074 | ESTABLISHED | execute | positive | retained regression: EAT-R321, EAT-R488; retained oracle: probes/execute/results/execute-extra.json; probes/execute/results/script-runtime.json; probes/execute/results/cli-flag.json; no new acceptance pass |
| C075 | ESTABLISHED | execute | positive | retained regression: EAT-R471, EAT-R485, EAT-R488; retained oracle: test/workflow-examples.test.ts; test/workflow-examples-claude-backend.test.ts; test/workflow-tool-description.test.ts; test/workflow-tool.test.ts; probes/execute/real-extension.probe.test.ts; no new acceptance pass |
| C076 | ESTABLISHED | furnace | defect | compiled: EAT-R346; implementation residual: exact work-readiness enrichment follows consolidated wb-752.12/wb-752.13; filing ownership/matrix correction is a separate traceability task. |
| C077 | SUPPORTED | furnace | defect | compiled: EAT-R346; implementation residual: exact work-readiness enrichment follows consolidated wb-752.12/wb-752.13; filing ownership/matrix correction is a separate traceability task. |
| C078 | ESTABLISHED | furnace | defect | compiled: EAT-R387; implementation residual: Either extend NATIVE_CONTROL_ACTIONS.furnace to ['stop','pause','resume'] (pause/resume are non-destructive; keep stop under operator confirmation) and rule attempt-stop out (delete the row or give Attempt targets an owner-delegation rule), or delete the unreachable rows and reword matrix row 99 to 'run stop only'. |
| C079 | ESTABLISHED | furnace | defect | compiled: EAT-R347; implementation residual: none beyond the named invariant; no blanket claim closure |
| C080 | ESTABLISHED | furnace | defect | compiled: EAT-R348; implementation residual: none beyond the named invariant; no blanket claim closure |
| C081 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add a bounded `events` page (limit, after-cursor) to FurnaceReading via Events.list, set stream.runLifecycle to 'events list --after <cursor>' and cursor to the page's next_cursor; update the matrix caveat. |
| C082 | ESTABLISHED | furnace | defect | compiled: EAT-R349; implementation residual: synthetic Run invocation and operator picker reachability remain separate from the bounded reply requirement (C087 residual). |
| C083 | ESTABLISHED | furnace | defect | compiled: EAT-R349, EAT-R367; implementation residual: Bounded sanitized Furnace diagnostic legs compiled in R349/R367; R367 non-envelope retention remains blocked by the landed custody pin. |
| C084 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: State 'the Run must live under <cwd>/.furnace (furnace -C <cwd>)' in the description and docs; optionally accept an allowlisted stateDir inside the bound workspace. |
| C085 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Type.String({pattern:'^frn-run-[a-zA-Z0-9_-]{1,100}$', description:'Furnace Run id as `furnace run list --json` reports it'}), include the hint in the refusal text, and add a README subsection under Workbench mode. |
| C086 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Expose the existing loader as a tool (`workflow_evidence {ref}`) or add optional {attemptId, stream, maxLines} params to furnace_observe that call readFurnaceAttemptLogEvidence under furnace:inspect. |
| C087 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Give external Run snapshots a synthetic invocation (trace.invocationId `furnace:<runId>`) and list them in the inspector's workflow picker, reusing the existing tree/timeline over the topology from FURNACE-001. |
| C088 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Extend live-furnace-vc4-launch.mjs with `--formula external-inspect --complete` (executor /usr/bin/true, wait for completed) and name the formula/state contract in docs/workflows.md:455. |
| C089 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: One PI_FURNACE_FIXTURE_* contract with a `mode` (completed&#124;active) plus one launcher flag, and a preflight line in each tier that prints the expected prefix and variables before asserting. |
| C090 | SUPPORTED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Split FurnaceObserverLimits into SnapshotLimits {attemptLimit, logBytes, callTimeoutMs} and PollLimits, and derive the client timeout from callTimeoutMs. |
| C091 | ESTABLISHED | furnace | defect | compiled: EAT-R349; implementation residual: none beyond the named invariant; no blanket claim closure |
| C092 | ESTABLISHED | furnace | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Export one FURNACE_RUN_ID regex from furnace-observer.ts and use it in the tool, in the capability inputSchema (`pattern`) and in furnace-evidence.ts. |
| C093 | ESTABLISHED | furnace | positive | compiled: EAT-R346, EAT-R348; implementation residual: none beyond the named invariant; no blanket claim closure |
| C094 | ESTABLISHED | furnace | positive | compiled: EAT-R349, EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C095 | ESTABLISHED | inspector | defect | compiled: EAT-R350; implementation residual: exit-first footer copy is separate from overlay layout; R350 only requires a usable visible hint. |
| C096 | ESTABLISHED | inspector | defect | compiled: EAT-R351; implementation residual: progressVersion memoization is separate; do not weaken navigation/performance controls to implement invalidation. |
| C097 | ESTABLISHED | inspector | defect | compiled: EAT-R352; implementation residual: intervals, observed parent topology, and suppressing event-only remainders remain follow-ons; R352 only owns truthful freshness. Credentialed four-view pty is explicitly required. |
| C098 | ESTABLISHED | inspector | defect | compiled: EAT-R353; implementation residual: pause and legacy-node g fallback remain follow-ons; R353 owns stop only. |
| C099 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Make the footer view-aware (overview: '/ filter · f focus · ⏎ collapse · g controls'; timeline: '= - zoom · h l pan'; details: 'e next · ⏎ load · c transcript') and add the four-view key table to README ## Commands. |
| C100 | ESTABLISHED | inspector | defect | compiled: EAT-R355; implementation residual: visible editing cursor, no-match row and clear-before-close remain follow-ons; R355 owns printable editor precedence only. |
| C101 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Bind PgUp/PgDn/Home/End in both reducers (reuse createViewerKeys), make the rich filter a projection query by title or provider rather than a page-local narrowing, and add a requirement that any row is reachable within a stated number of keys. |
| C102 | ESTABLISHED | inspector | defect | compiled: EAT-R387; implementation residual: Compare the printable character (data === '+') for zoom-in; either implement follow (keep the cursor on the newest row while it is on) or remove the key and the header word. |
| C103 | ESTABLISHED | inspector | defect | compiled: EAT-R354; implementation residual: initial focus and per-run retention/fair eviction remain follow-ons; R354 owns action-key alignment only. |
| C104 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Carry lastError and a small provider facts map (render id, verdict, coverage) on the observation node, draw them wrapped in details, and remove the constant Source line until a producer supplies one. |
| C105 | ESTABLISHED | inspector | defect | compiled: EAT-R356; implementation residual: none beyond the named invariant; no blanket claim closure |
| C106 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Default to fit-to-span with a seconds-per-cell zoom, add page pan, format durations with formatDuration, and emit the phase-kinds note only when a producer could have supplied kinds. |
| C107 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Pass panes: true and an ascii flag from one capability source (a workbench.tui setting or a TERM/locale probe) at workflow-dialog.ts:1316 and to layoutWorkflowDialog and renderWorkflowCard; add a wiring test that fails when the host omits them. |
| C108 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Return a width-aware component (render(width) calling layoutWorkflowCard with that width) instead of a pre-laid-out Text, and cap agent rows per phase with a '+N more · /agents → Workflows' line. |
| C109 | ESTABLISHED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: In elapsedMs also subtract (now - pausedAt) while paused (pass pausedAt through the dialog and card task objects) and give the fleet row the same elapsed value. |
| C110 | ESTABLISHED | inspector | defect | compiled: EAT-R387; implementation residual: Status/evidence census wording compiled in R387; panes/ASCII production wiring remains independent C107 residual. |
| C111 | SUPPORTED | inspector | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add a short 'For agents' paragraph to README ## Commands and to docs/workbench/10 naming workflow_observe and workflow_control as the model-facing equivalent of the inspector, with a pointer to qa/workbench/inspector-smoke.mjs. |
| C112 | ESTABLISHED | inspector | positive | compiled: EAT-R350; implementation residual: none beyond the named invariant; no blanket claim closure |
| C113 | ESTABLISHED | inspector | positive | compiled: EAT-R356; implementation residual: none beyond the named invariant; no blanket claim closure |
| C114 | ESTABLISHED | inspector | positive | compiled: EAT-R352, EAT-R353, EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C115 | ESTABLISHED | interop | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C116 | ESTABLISHED | interop | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Re-key rows M048-M050 (and the page rows) by a content anchor (the sentence stands exactly once in its section) instead of a line number, or move the 50 historical corrections into a frozen ledger so the live skill is free to change. No live bead names this (searched the pin's .beads/issues.jsonl for docs-remediation, SKILL:L, line-anchored: 0 live hits). |
| C117 | ESTABLISHED | interop | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C118 | ESTABLISHED | interop | defect | compiled: EAT-R337; implementation residual: none beyond the named invariant; no blanket claim closure |
| C119 | ESTABLISHED | interop | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C120 | ESTABLISHED | interop | defect | compiled: EAT-R387, EAT-R478; implementation residual: Repository changed-path/status enforcement is R387; R478 acquires the outside-machine leg only. Missing external artifact stays BLOCKED. |
| C121 | ESTABLISHED | interop | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C122 | ESTABLISHED | interop | defect | compiled: EAT-R337; implementation residual: none beyond the named invariant; no blanket claim closure |
| C123 | ESTABLISHED | interop | defect | compiled: EAT-R474; implementation residual: none beyond the named invariant; no blanket claim closure |
| C124 | ESTABLISHED | interop | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-01 follow-on capacity; cureHint: Export one grant-list judge and one clean-text judge from a shared module (settings.ts already owns the grammar) and have the three seams import it; decide in writing whether coordination's narrower rule is intended and pin the five forms above either way. |
| C125 | ESTABLISHED | interop | defect | compiled: EAT-R475; implementation residual: none beyond the named invariant; no blanket claim closure |
| C126 | ESTABLISHED | interop | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C127 | ESTABLISHED | interop | defect | compiled: EAT-R337; implementation residual: none beyond the named invariant; no blanket claim closure |
| C128 | ESTABLISHED | interop | defect | compiled: EAT-R338; implementation residual: none beyond the named invariant; no blanket claim closure |
| C129 | ESTABLISHED | interop | defect | compiled: EAT-R338; implementation residual: none beyond the named invariant; no blanket claim closure |
| C130 | ESTABLISHED | interop | defect | compiled: EAT-R339; implementation residual: none beyond the named invariant; no blanket claim closure |
| C131 | ESTABLISHED | interop | defect | compiled: EAT-R340; implementation residual: none beyond the named invariant; no blanket claim closure |
| C132 | ESTABLISHED | interop | positive | compiled: EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C133 | ESTABLISHED | interop | positive | compiled: EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C134 | ESTABLISHED | journal | defect | compiled: EAT-R357; implementation residual: session-start journal discovery notification, recovery documentation and one cross-session scope rule remain follow-ons; R357 owns scoped disk resolution after restart. |
| C135 | ESTABLISHED | journal | defect | compiled: EAT-R358; implementation residual: corrected guidance for truly unclassified historical rows remains a distinct representation fix. |
| C136 | ESTABLISHED | journal | defect | compiled: EAT-R361; implementation residual: safe large-repo replay measurement and bare-resume recorded args remain follow-ons; R361 only owns truthful decline disclosure. |
| C137 | ESTABLISHED | journal | defect | compiled: EAT-R361; implementation residual: safe large-repo replay measurement and bare-resume recorded args remain follow-ons; R361 only owns truthful decline disclosure. |
| C138 | ESTABLISHED | journal | defect | compiled: EAT-R359; implementation residual: none beyond the named invariant; no blanket claim closure |
| C139 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Return denials as JSON {contract, phase:'denied', policy, category, reason, field} (a field NAME is not caller text, so naming it keeps the no-echo rule); add a description to each parameter naming the actions that require it; put one worked call per action in docs/workflows.md. |
| C140 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Emit a complete `next` call (evidence:{capabilityId:<the position's first evidenceRead>, input:<its input skeleton, pre-filled from recordedNativeRefs>}) and omit it when evidenceReads is empty; filter the roster by `position`; journal label and dispatchedAt on node rows and show them; use one JSON dialect on all four surfaces and state the hint once in the notification. |
| C141 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: On an uncertain refusal carry forward the bound decision rows with the node row; for settlement 'none' replace the `resume` member with the override call template for the same taskId. |
| C142 | ESTABLISHED | journal | defect | compiled: EAT-R479; implementation residual: Bind a receipt to the journaled reference the read was ASKED about (an input that names the recorded id, verified in the result) instead of the read's own operation id; allowlist a read that inspects the effect's own object per producer (hx mutation show <id>, rf context show <render_id>); for producers with no declared read either accept noEvidenceReason 'no-read-capability' under the exact grant or make the runtime hint say 'fresh run only'. R479 acquires the NOT_RUN Forge leg only. |
| C143 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Give inspect limit/cursor and make `position` filter (the workbench.tool-reply/v1 paging the sibling tools use); cap `snapshot` with a byte-cap marker and its digest; return the record id instead of echoing `entry`; report an eviction in the evidence reply or persist receipts beside the journal. |
| C144 | ESTABLISHED | journal | defect | compiled: EAT-R360; implementation residual: compatibility warning presentation is bounded under R360; comprehensive upgrade/downgrade compatibility policy remains a separate decision. |
| C145 | ESTABLISHED | journal | defect | compiled: EAT-R357; implementation residual: R357 maps the no-shipped-effectful-producer premise; a real effectful capability/grant/native journey remains uncompiled. |
| C146 | ESTABLISHED | journal | defect | compiled: EAT-R357; implementation residual: session-start journal discovery notification, recovery documentation and one cross-session scope rule remain follow-ons; R357 owns scoped disk resolution after restart. |
| C147 | ESTABLISHED | journal | defect | compiled: EAT-R365; implementation residual: none beyond the named invariant; no blanket claim closure |
| C148 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: When ctx.hasUI, require ctx.ui.confirm for override and stamp how the decision was confirmed on the record (ui &#124; tool-call); give the inspector's pending row a key that opens the same journey for a human. |
| C149 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Return a distinct variant ({hasChanges:true, missing:true, path}) for a vanished directory and append 'worktree directory missing at cleanup; its changes cannot be recovered' to the result. |
| C150 | ESTABLISHED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Append the branch or kept-path note on the rejected path too (surface worktreeResult in get_subagent_result and the notification); at session_start list `git worktree list` entries under tmpdir named pi-agent-* and notify; add a 'Recovering a worktree' paragraph to README.md (git worktree list, commit from the kept directory, git worktree remove, git branch -D pi-agent-*). |
| C151 | SUPPORTED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add the journal and the persisted script to the README.md:637 list and the :4226 sentence; add a workflowJournal:false setting that passes no journal (resume then answers 'has no journal to resume from'). |
| C152 | SUPPORTED | journal | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Pass a journal (a file beside the invocation's boot pin) to runWorkflow at local-detached.ts:730 and name its path in the lost-host snapshot's reconcileHint. |
| C153 | ESTABLISHED | journal | positive | compiled: EAT-R357, EAT-R358; implementation residual: none beyond the named invariant; no blanket claim closure |
| C154 | ESTABLISHED | journal | positive | compiled: EAT-R359; implementation residual: none beyond the named invariant; no blanket claim closure |
| C155 | ESTABLISHED | journal | positive | retained regression: source-scoped ledger oracle; retained oracle: test/worktree-process-kill-preservation.test.ts; test/worktree.test.ts; probes/journal/p10-worktree.probe.ts; no new acceptance pass |
| C156 | ESTABLISHED | node-rpc | defect | compiled: EAT-R363; implementation residual: none beyond the named invariant; no blanket claim closure |
| C157 | ESTABLISHED | node-rpc | defect | compiled: EAT-R327; implementation residual: Provider-input reference scope compiled in R327; backend-aware runtime description/errors remain C164/C234 residuals. |
| C158 | ESTABLISHED | node-rpc | defect | compiled: EAT-R364; implementation residual: new timeout/cancel categories are C166 residual; R364 preserves existing typed information only. |
| C159 | ESTABLISHED | node-rpc | defect | compiled: EAT-R361; implementation residual: none beyond the named invariant; no blanket claim closure |
| C160 | ESTABLISHED | node-rpc | defect | compiled: EAT-R362; implementation residual: none beyond the named invariant; no blanket claim closure |
| C161 | ESTABLISHED | node-rpc | defect | compiled: EAT-R387; implementation residual: Landed replay status wording compiled in R387; do not repin historical fixtures or infer new runtime replay guarantees. |
| C162 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: rewrite the sentence to the basis rule: replays only under an identical model/permission/tools/roles/grants/cwd/replay-dependency basis, otherwise runs live |
| C163 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: name the Claude-backend exclusions (minimal, isolation, gate) in the Workbench paragraph and make gate/isolation refusals consistent (both fatal before dispatch, or both null) |
| C164 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: message: 'node() needs the Claude workbench backend: set workbench.workflowAgentBackend="claude" and workbench.capabilityGrants in .pi/subagents.json'; optionally drop the node() line from the description when the backend is pi |
| C165 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: map each SDKResultError subtype to a coded sentence with a hint (e.g. 'CLAUDE_MAX_TURNS: the child hit the SDK turn cap; split the task or raise maxTurns') the way authRequiredError does |
| C166 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: add 'timeout' and 'cancelled' categories (or a `reason` field on CapabilityDiagnostic) and keep 'transport' for provider/protocol failures |
| C167 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: include `${path}` ('invoke(<id>) output') in the three byte-limit messages and classify an oversized provider answer as 'unavailable' (too large to transport) rather than caller validation |
| C168 | SUPPORTED | node-rpc | defect | compiled: EAT-R372; implementation residual: General operator capabilityLimits and nodeCap knobs remain uncompiled; R372 compiles deadline composition only. |
| C169 | SUPPORTED | node-rpc | defect | compiled: EAT-R387; implementation residual: remove 'observe' from the type until a dispatch path exists; either implement inspect() on at least one provider or stop listing inspect in supportedModes |
| C170 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: render `· from resume journal` / reconcile state before the result preview and clamp the preview to the remaining width; consider a distinct glyph for 'done, freshness unknown' with a legend |
| C171 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: render 'unclassified' when effectClass is empty; put the error once (status short, result full) in formatWorkflowNotification |
| C172 | ESTABLISHED | node-rpc | defect | compiled: EAT-R387; implementation residual: Live-true feature/changelog wording compiled in R387; no separate duplicate status requirement. |
| C173 | SUPPORTED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: document claude:transcript next to capabilityGrants; make the toast name `workbench.capabilityGrants` in .pi/subagents.json; add a 'more' key or limit prompt in the viewer |
| C174 | ESTABLISHED | node-rpc | positive | compiled: EAT-R363, EAT-R364; implementation residual: none beyond the named invariant; no blanket claim closure |
| C175 | ESTABLISHED | node-rpc | positive | compiled: EAT-R360, EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C176 | ESTABLISHED | node-rpc | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: ship a .hyperunix config (or document `--workspace src`) for hx users of this repo; file the json-schema.ts parse gap upstream against hx with the byte offsets |
| C177 | ESTABLISHED | observe | defect | compiled: EAT-R473; implementation residual: none beyond the named invariant; no blanket claim closure |
| C178 | ESTABLISHED | observe | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Add a bounded workflow list read (id, name, status, startedAt, node count; newest first; same scope ACL) and name it in the unavailable refusal; rehydrate finished tasks from the session task dir on session_start, or say 'not retained after restart' explicitly. Scope the resume-miss roster to the caller's session. |
| C179 | ESTABLISHED | observe | defect | compiled: EAT-R328; implementation residual: none beyond the named invariant; no blanket claim closure |
| C180 | ESTABLISHED | observe | defect | compiled: EAT-R329; implementation residual: none beyond the named invariant; no blanket claim closure |
| C181 | ESTABLISHED | observe | defect | compiled: EAT-R330; implementation residual: none beyond the named invariant; no blanket claim closure |
| C182 | ESTABLISHED | observe | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C183 | ESTABLISHED | observe | defect | compiled: EAT-R331; implementation residual: none beyond the named invariant; no blanket claim closure |
| C184 | ESTABLISHED | observe | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C185 | SUPPORTED | observe | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C186 | ESTABLISHED | observe | defect | compiled: EAT-R332; implementation residual: none beyond the named invariant; no blanket claim closure |
| C187 | ESTABLISHED | observe | defect | compiled: EAT-R333; implementation residual: none beyond the named invariant; no blanket claim closure |
| C188 | ESTABLISHED | observe | defect | compiled: EAT-R334; implementation residual: none beyond the named invariant; no blanket claim closure |
| C189 | ESTABLISHED | observe | defect | compiled: EAT-R335; implementation residual: none beyond the named invariant; no blanket claim closure |
| C190 | ESTABLISHED | observe | defect | compiled: EAT-R336; implementation residual: none beyond the named invariant; no blanket claim closure |
| C191 | ESTABLISHED | observe | defect | compiled: EAT-R327; implementation residual: none beyond the named invariant; no blanket claim closure |
| C192 | ESTABLISHED | observe | defect | compiled: EAT-R387; implementation residual: none beyond the named invariant; no blanket claim closure |
| C193 | ESTABLISHED | observe | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: F-13 remaining independent obligation; cureHint: Emit a progress line per series on stderr (12 series) and state the expected duration in the header; set the module type for dist (or emit .mjs) so Node does not reparse. |
| C194 | ESTABLISHED | observe | positive | compiled: EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C195 | ESTABLISHED | observe | positive | compiled: EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C196 | ESTABLISHED | observe | positive | compiled: EAT-R333, EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C197 | ESTABLISHED | observe | positive | retained regression: EAT-R473; retained oracle: probes/observe/t/b-registered.probe.test.ts; probes/observe/t/a-builder.probe.test.ts; test/workflow-tool.test.ts; no new acceptance pass |
| C198 | ESTABLISHED | observe | positive | compiled: EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C199 | ESTABLISHED | packaging | defect | compiled: EAT-R376; implementation residual: Actual registry publication remains a separate policy/approval, not the corrected install recipe. |
| C200 | ESTABLISHED | packaging | defect | compiled: EAT-R377; implementation residual: CI historical pass is not inferred; fresh adopted-floor run required. |
| C201 | ESTABLISHED | packaging | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Reword both to 'release gate is Forge-controlled; GitHub CI is a compat canary only' (one-line edits). |
| C202 | ESTABLISHED | packaging | defect | compiled: EAT-R377; implementation residual: none beyond the named invariant; no blanket claim closure |
| C203 | ESTABLISHED | packaging | defect | compiled: EAT-R327; implementation residual: Tool-reference reach compiled in R327; no duplicate repair. |
| C204 | ESTABLISHED | packaging | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Exclude docs/workbench/receipts/ (and consider TRACEABILITY.md) from the pack - one .npmignore line plus a boundary-classifier allowlist edit; keeps the specs, drops 1.5MB+ of inert evidence. |
| C205 | SUPPORTED | packaging | defect | compiled: EAT-R378; implementation residual: No stale artifact was reproduced; R378 is risk control with a planted mismatch oracle. |
| C206 | ESTABLISHED | packaging | positive | compiled: EAT-R378, EAT-R388; implementation residual: none beyond the named invariant; no blanket claim closure |
| C207 | ESTABLISHED | packaging | positive | compiled: EAT-R378, EAT-R388; implementation residual: none beyond the named invariant; no blanket claim closure |
| C208 | ESTABLISHED | packaging | positive | compiled: EAT-R377, EAT-R388; implementation residual: none beyond the named invariant; no blanket claim closure |
| C209 | SUPPORTED | packaging | defect | compiled: EAT-R387; implementation residual: R387 repairs status scope/freshness; a fully regenerated measured-row census still requires current feature receipts. |
| C210 | SUPPORTED | packaging | defect | compiled: EAT-R376; implementation residual: Fork name/version/repository/homepage distribution policy remains uncompiled NORMATIVE_DECISION. |
| C211 | ESTABLISHED | packaging | positive | compiled: EAT-R378, EAT-R388; implementation residual: none beyond the named invariant; no blanket claim closure |
| C212 | SUPPORTED | packaging | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Generate .npmignore from the classifier's rule tables (single source), or flip to a package.json files allowlist and let the classifier verify it. |
| C213 | SUPPORTED | packaging | defect | compiled: EAT-R339; implementation residual: Skill/doc packaging coherence compiled in R339; no duplicate repair. |
| C214 | ESTABLISHED | packaging | positive | compiled: EAT-R377, EAT-R388; implementation residual: Preserve command-doc/CI script parity with its own drift guard; R388 only artifact admission. |
| C215 | SUPPORTED | packaging | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Lazy-load/optionalize typescript for the designer path (refuse with a clear diagnostic when absent), keeping the exact pin for the gated path. |
| C216 | PLAUSIBLE | packaging | defect | compiled: EAT-R376, EAT-R480; implementation residual: R480 acquires remote media evidence only; publishing identity/media URL policy remains an unadopted distribution decision. No publication authorized. |
| C217 | ESTABLISHED | providers | defect | compiled: EAT-R366; implementation residual: none beyond the named invariant; no blanket claim closure |
| C218 | ESTABLISHED | providers | defect | compiled: EAT-R366; implementation residual: none beyond the named invariant; no blanket claim closure |
| C219 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add limit + cursor (and a names-only projection) to the input schema and page the result under the bound; when a bound is hit, return a typed partial with nextCursor instead of a validation rejection, or at least say 'output exceeded N bytes; narrow root'. |
| C220 | ESTABLISHED | providers | defect | compiled: EAT-R368; implementation residual: Native inspect/observe functionality remains separate from static contract retrieval R368. |
| C221 | ESTABLISHED | providers | defect | compiled: EAT-R367; implementation residual: none beyond the named invariant; no blanket claim closure |
| C222 | ESTABLISHED | providers | defect | compiled: EAT-R367; implementation residual: Non-envelope stderr cause is BLOCKED pending amendment of the landed custody pin (wb-jwc.7, closed; test/workbench-rf-stderr-receipt-capture-census.test.ts); preserve actual exit status without claiming stderr capture. |
| C223 | ESTABLISHED | providers | defect | compiled: EAT-R367; implementation residual: 1024-byte diagnostic standard is proposed; implement bounded codepoint-safe representation, not native source expansion. |
| C224 | ESTABLISHED | providers | defect | compiled: EAT-R373; implementation residual: none beyond the named invariant; no blanket claim closure |
| C225 | ESTABLISHED | providers | defect | compiled: EAT-R374, EAT-R387; implementation residual: Claude-topology production wiring remains uncompiled; R374 covers only HX/RF. |
| C226 | ESTABLISHED | providers | defect | compiled: EAT-R371; implementation residual: none beyond the named invariant; no blanket claim closure |
| C227 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Cut the rf-pin-bump (re-capture test/fixtures/rf-result-keys.json and REACTIVE_FIBER_CONTRACT_SOURCE from a fresh stamped receipt) and file a standing bead that fires when the installed rf moves. |
| C228 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Document one valid id in the worked example and the property description; surface rf's hint; optionally accept contextWindow/maxOutput as an explicit third input arm. |
| C229 | ESTABLISHED | providers | defect | compiled: EAT-R363; implementation residual: Schema first-failing-path/oneOf diagnostic compiled in R363; no duplicate schema repair. |
| C230 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add description, examples (hx.fs/regular-file) and default to the schema properties; require root explicitly or state the default in the contract; point at `hx schema list` for kinds. |
| C231 | ESTABLISHED | providers | defect | compiled: EAT-R369; implementation residual: Installed worked role/grant configuration is a documentation leg to R327/R325, not a second missing-grant runtime obligation. |
| C232 | ESTABLISHED | providers | defect | compiled: EAT-R370; implementation residual: Doctor/preflight binary presence/version listing remains uncompiled. |
| C233 | ESTABLISHED | providers | defect | compiled: EAT-R372; implementation residual: General capabilityLimits and nodeCap operator knobs remain uncompiled; R372 only deadline composition. |
| C234 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Build the node() paragraph from the live registry (list ids when the Claude backend is selected, omit the hook otherwise), say 'a failed node() throws a typed CapabilityError', and make the no-registry error name the setting. |
| C235 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Emit tool:'workbench_catalog' from the capability catalog builder (one literal plus its type). |
| C236 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Hold one initialised connection per registry scope for reads (closed at session_shutdown, as forge_gate_run connections already are) or batch targets in one connection. |
| C237 | ESTABLISHED | providers | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Offer a compact projection by default (RF: output.text, render basis, budget summary, diagnostics; HX: answers, completeness, licenses_absence) with the full native source behind an explicit flag; fix the worked example to return counts, not certificates. |
| C238 | ESTABLISHED | providers | defect | compiled: EAT-R483; implementation residual: State the process side effect in the descriptor and docs/workbench/13; surface a notice when a preview's rf child launches a server; decide whether session_shutdown should offer `rf storage local-servers --idle` as a hint. Bind-address unknown RESOLVED by probes/reqset-rollup/c238-bind-address.txt; R483 is explicit-loopback regression only. |
| C239 | ESTABLISHED | providers | defect | compiled: EAT-R375; implementation residual: Registry-derived id rosters/extensibility checklist remain uncompiled; R375 only failure isolation. |
| C240 | ESTABLISHED | providers | defect | compiled: EAT-R367; implementation residual: none beyond the named invariant; no blanket claim closure |
| C241 | SUPPORTED | providers | defect | compiled: EAT-R481; implementation residual: Resolve hx through the SDK's own PATH lookup in the test, and make the probes take the repository root (or require the argument). R481 acquires cross-host evidence only. |
| C242 | ESTABLISHED | providers | positive | compiled: EAT-R368; implementation residual: none beyond the named invariant; no blanket claim closure |
| C243 | ESTABLISHED | providers | positive | compiled: EAT-R369, EAT-R389; implementation residual: none beyond the named invariant; no blanket claim closure |
| C244 | ESTABLISHED | providers | positive | compiled: EAT-R367; implementation residual: none beyond the named invariant; no blanket claim closure |
| C245 | ESTABLISHED | providers | positive | compiled: EAT-R372, EAT-R389, EAT-R482; implementation residual: Direct-child/environment positive retained by R372/R389; R482 acquires the distinct grandchild stdout-pipe lifecycle leg, not a cleanup guarantee. |
| C246 | ESTABLISHED | providers | positive | compiled: EAT-R374, EAT-R389; implementation residual: none beyond the named invariant; no blanket claim closure |
| C247 | ESTABLISHED | providers | positive | compiled: EAT-R390; implementation residual: none beyond the named invariant; no blanket claim closure |
| C248 | ESTABLISHED | scheduling | defect | compiled: EAT-R379; implementation residual: bypassQueue concurrency containment remains an independent risk-control choice after timer-domain repair. |
| C249 | ESTABLISHED | scheduling | defect | compiled: EAT-R379, EAT-R383; implementation residual: Invalid enabled-state cleanup is part of error-delivery acceptance; general minimum-rate/concurrency policy is not. |
| C250 | ESTABLISHED | scheduling | defect | compiled: EAT-R380; implementation residual: none beyond the named invariant; no blanket claim closure |
| C251 | ESTABLISHED | scheduling | defect | compiled: EAT-R382; implementation residual: none beyond the named invariant; no blanket claim closure |
| C252 | ESTABLISHED | scheduling | defect | compiled: EAT-R381; implementation residual: none beyond the named invariant; no blanket claim closure |
| C253 | ESTABLISHED | scheduling | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Record armedAt/nextFireAt when the timer is armed (or chain setTimeout from an explicit next time) and read it in getNextRun; drop or read the stored nextRun; width-aware columns (relative time for once jobs); add enable/disable and run-now actions. |
| C254 | ESTABLISHED | scheduling | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Validate with `new Cron(expr, { paused: true }, () => {})` then `.stop()`, or parse via `CronPattern` only. |
| C255 | ESTABLISHED | scheduling | defect | compiled: EAT-R383; implementation residual: none beyond the named invariant; no blanket claim closure |
| C256 | ESTABLISHED | scheduling | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Key uniqueness on the generated id (nanoid already unique) and drop the name check, or auto-suffix; if names matter, accept the Agent `name` param for the job and mention it in the reply. |
| C257 | ESTABLISHED | scheduling | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add list_scheduled / cancel_scheduled (or a schedule_action tool with inspect&#124;cancel&#124;disable) gated on schedulingEnabled; have the reply name the tool instead of the menu. |
| C258 | ESTABLISHED | scheduling | defect | compiled: EAT-R386; implementation residual: Orphan store adoption/cleanup and deleteFileIfEmpty production caller remain uncompiled; R386 owns disclosure only. |
| C259 | SUPPORTED | scheduling | defect | compiled: EAT-R386; implementation residual: Scheduled transcript creation remains uncompiled and SUPPORTED; R386 only discloses actual behavior. |
| C260 | ESTABLISHED | scheduling | defect | compiled: EAT-R386; implementation residual: IANA timezone selector and resolved local+UTC next-run reply remain independent uncompiled behaviors. |
| C261 | ESTABLISHED | scheduling | defect | compiled: EAT-R384; implementation residual: Strict/coercion policy remains a separate decision; diagnostics do not silently change accepted types. |
| C262 | ESTABLISHED | scheduling | defect | compiled: EAT-R385; implementation residual: none beyond the named invariant; no blanket claim closure |
| C263 | ESTABLISHED | scheduling | defect | compiled: EAT-R386; implementation residual: Model-only docs journey must be driven on a fresh install; generated surface.json is not the reader oracle. |
| C264 | ESTABLISHED | scheduling | defect | DEFERRED_FOR_RANGE_CAPACITY; reason: prior shard capacity or independent implementation scope; cureHint: Add a byte cap (e.g. 16-32 KB) with an explicit '... (truncated at N bytes)' marker, and tell the agent the byte limit in the memory instructions; longer term route memory through a budgeted render. |
| C265 | ESTABLISHED | scheduling | positive | compiled: EAT-R381, EAT-R382; implementation residual: Normal-store atomic/stale-lock/lazy-directory positives are controls for R381/R382, not a guarantee on arbitrary filesystems. |
| C266 | ESTABLISHED | scheduling | positive | compiled: EAT-R380; implementation residual: Schema removal and refusal ordering preserved in R380; full token-spec baseline has a separate positive control. |
| C267 | ESTABLISHED | scheduling | positive | compiled: EAT-R379, EAT-R384; implementation residual: Past one-shot/malformed JSON/false fallback controls attach to R379/R384, with source-specific evidence retained. |

## Completion boundary

All F-01..F-15 roll-up edits are complete within requirements/. No authorized fix was omitted. Implementation, acquisition runs, filing-time bead extensions/splits, custody-pin amendment and the separately adopted docs/08 amendment are intentionally not executed here. R345, G-PTY and absent acquisition artifacts remain BLOCKED as specified. Original REQUIREMENTS-AUDIT.md and the 80 original Statements are preserved; checker source code was not edited.
