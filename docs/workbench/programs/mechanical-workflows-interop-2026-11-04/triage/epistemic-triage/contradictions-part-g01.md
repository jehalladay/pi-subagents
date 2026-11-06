# Contradiction sets — claim group g01 (01-audit-and-evidence.md: "What exists" table + P0/P1/P2 findings + Method/Limitations)

Claim ids below are the **claims-part-01.jsonl** ids. Note the ledger-level collision: claims-part-02.jsonl reuses C0201..C0279 for different propositions; every id here is the part-01 claim. Pins: doc@7c80c34346c2 (artifact), pi@b27829e6dfa7 (Pi src byte-identical to the program baseline f67b6665), mw@f7c0a9431d6c (eight commits after the program's MW baseline 0c78e253). Nothing was run; every entry is from source read at the pins plus `git show`/`git log`/`git diff` across baseline and pin.

Status vocabulary: a "version split" that reconciles is recorded as such (not CONTESTED): the claim is ESTABLISHED at one revision and REFUTED at the other, and the artifact owes a temporal qualifier.

---

## K001 — Mechanical descriptor schema refs vs its entrypoint host (Pi doc vs MW pin; Pi SKILL vs MW SKILL)

Claims: C0189, C0190, C0193, C0194, C0195, C0196 (and the presuppositions of C0197, C0199, C0277); restated in Pi 02 line 48 ("ships relative schema paths"), Pi 03 lines 7/18 ("reconcile descriptor canonicalization", "Fix Mechanical checked-in descriptor versus entrypoint-host.ts comparison"), Pi SKILL line 14 ("disagree about schema reference spelling").
Status: REFUTED at mw@f7c0a9431d6c; ESTABLISHED at mw@0c78e253 (version split, reconciled).

### Evidence for the claims (baseline)
- `mw@0c78e253 (git show):contracts/entrypoints/development.v1.json:8-9` — `"inputSchema": "../schemas/development-request.v1.schema.json", "outputSchema": "../schemas/development-outcome.v1.schema.json"`
- `mw@0c78e253 (git show):apps/development-rig/test/entrypoint-host.test.ts:12` — handwritten descriptor literal with bare names
- `mw@f7c0a9431d6c:apps/development-rig/src/entrypoint-host.ts:89` — exact-string compare against bare filenames (unchanged baseline->pin)
- `mw@f7c0a9431d6c:docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md:22` — MW program restates the mismatch (same author, same evening: one lineage)

### Evidence against (pin)
- `mw@f7c0a9431d6c:contracts/entrypoints/development.v1.json:8-9` — `"inputSchema": "development-request.v1.schema.json", "outputSchema": "development-outcome.v1.schema.json"`
- `mw@f7c0a9431d6c:git log 0c78e253..f7c0a943` — `1f29daa7 2026-11-05 08:14:24Z fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host tests (MechanicalWorkflows-14zrz)` (about 1 h 49 min after the Pi program commit 7c80c343 at 2026-11-05 06:25Z)
- `mw@f7c0a9431d6c:apps/development-rig/test/{entrypoint-host,installed-host}.test.ts:12/29` — `JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", ...)))`
- `mw@f7c0a9431d6c:apps/development-rig/test/entrypoint-descriptor-file.test.ts:52-55` — asserts both hosts accept the committed descriptor over a real npm-packed tarball (test not run here)
- `mw@f7c0a9431d6c:.agents/skills/mechanical-pi-host/SKILL.md:14` — "the checked-in development.v1.json and entrypoint-host.ts agree on one canonical schema-ref grammar (bare filename ..., no `..`)"
- `mw@f7c0a9431d6c:contracts/README.md:13` — "audit found a schema-path mismatch between the descriptor and the host; it is repaired (PIWB-MW0-R001)"

### Reconciliation attempts
- version split: SUCCEEDS. The Pi doc describes 0c78e253 truthfully; the repair landed before the environment pin. The Pi doc at 7c80c343 was never updated.
- scope split: n/a (same file, same host).
- semantic split: n/a (exact string equality is unambiguous).
- cross-document: Pi SKILL line 14 ("disagree") directly contradicts MW SKILL line 14 ("agree") at the pins; MW's statement is the current one.

### What would settle it
Settled by `git show 0c78e253:contracts/entrypoints/development.v1.json` vs the pin file and `git log` (1f29daa7). Running the MW suite would additionally witness the file-driven tests passing (not run). Repair owed: ADD_TEMPORAL_QUALIFIER on 01 line 31, 02 line 48, 03 lines 7/18 and SKILL line 14 ("at 0c78e253 ...; repaired at 1f29daa7").

---

## K002 — developLive host AbortSignal (Pi doc + MW program doc vs MW pin)

Claims: C0229 (and the presupposition of C0235); restated in MW program 01 line 42 ("lack a public host-provided AbortSignal").
Status: SUPPORTED for the narrowed reading ("no general / mid-run cancellation"); the unqualified presence clause is REFUTED at the pin (version + semantic split, reconciled).

### Evidence for the claim (baseline)
- `mw@0c78e253 (git show):apps/development-rig/src/claude-implement.ts:11-15` — `AgentOptions { model?; maxTurns?; maxBudgetUsd? }` (no signal)
- `mw@0c78e253 (git show):apps/development-rig/src/live-development.ts` — grep `signal|abort`: 0 hits

### Evidence against (pin)
- `mw@f7c0a9431d6c:apps/development-rig/src/claude-implement.ts:15-20` — `readonly signal?: AbortSignal;` "Honoured as a pre-dispatch barrier only ... not forwarded to the SDK and an abort during a running session is not handled by this slice."
- `mw@f7c0a9431d6c:apps/development-rig/src/live-development.ts:59,112` — `assertNotCancelledBeforeDispatch(options.signal);`
- `mw@f7c0a9431d6c:git log -1 f7c0a943` — "feat(development-rig): add a host AbortSignal with a pre-dispatch cancellation barrier for developLive and runClaudeImplementation (MechanicalWorkflows-llkkl)" (the pin commit itself)
- `mw@f7c0a9431d6c:apps/development-rig/test/live-development.test.ts:415` — "an already-aborted host signal dispatches no agent and no Forge" (not run)

### Reconciliation attempts
- version split: SUCCEEDS for the presence clause (true at baseline, false at pin).
- semantic split: SUCCEEDS for the word "general": the pin signal is a pre-dispatch barrier only; mid-run cancellation is still absent.

### What would settle it
Settled by git show/log. Repair owed: NARROW_SCOPE + ADD_TEMPORAL_QUALIFIER ("at 0c78e253 no signal option; at f7c0a943 a pre-dispatch-only signal, not forwarded to the SDK").

---

## K003 — "node() is shell-backed" (extracted observation vs Pi pin)

Claims: C0188 (OBSERVATION extracted from the prescriptive clause "do not use a shell-backed `node()`" at 01 line 27; C0186 is the norm).
Status: REFUTED as an observation at pi@b27829e6; the artifact itself does not assert it.

### Evidence for the claim
- `doc@7c80c34346c2:01-audit-and-evidence.md:27` — "do not use a shell-backed `node()` or paste Mechanical code into the workflow interpreter." (prescriptive)
- Loose reading only: `pi@b27829e6dfa7:src/workbench/providers/reactivefiber.ts:139` spawns the `rf` binary; `providers/forge.ts:87` `ServerConnection.spawn("forge")` — two of four providers reach external processes (no shell).

### Evidence against
- `pi@b27829e6dfa7:src/workflow/runtime.ts:1352` — capabilityId validated against a dotted-identifier grammar; `:1610` — `callNode({ callId, index, capabilityId ...})` -> `CapabilityRegistry.invoke`
- `pi@b27829e6dfa7:src/workbench/providers/hyperunix.ts:4` and `furnace.ts:4` — SDK imports, no process at all
- no `shell: true`, `sh -c` or exec-of-a-string anywhere in runtime.ts, worker-source.ts or providers/*.ts (grep)

### Reconciliation attempts
- semantic split: the doc's clause is a prohibition on a remedy shape, not a description; as an observation the strict reading ("executes a shell") is contradicted and the loose reading ("reaches external binaries") is true of two providers by argv spawn.

### What would settle it
Settled by source. Ledger repair: the row should be MARK_AS_DEFINITION/REMOVE_CLAIM (it restates a norm as an observation); no artifact repair owed.

---

## K004 — W11 feature-matrix row's embedded detection vs the Pi tree; "no Mechanical SDK/host adapter" scope

Claims: C0163, C0182 (SOURCE_REPORT of the W11 row), C0161 ("no Mechanical SDK or host adapter"); Pi SKILL line 13 ("The source tree contains no registered Mechanical binding").
Status: C0163/C0182 SUPPORTED (status 'planned' accurate; embedded evidence stale); C0161 SUPPORTED with the invocation scope; the row's detection sentence is REFUTED at the pin.

### Evidence for the claims
- `pi@b27829e6dfa7:docs/workbench/feature-matrix.md:112` — W11 "planned", bead wb-04s blocked (row authored 2026-10-15, 10a67e73)
- `pi@b27829e6dfa7:ls src/workbench/hosts/` — furnace-hosted.ts local-detached.ts only; `package.json` has no @mechanical dependency; `grep claude:invoke`-style checks find no descriptor/installed-host reference in src/

### Evidence against (the row's evidence sentence; the unqualified "no Mechanical code")
- `pi@b27829e6dfa7:docs/workbench/feature-matrix.md:112` — "grep -ril mechanical over src/ and test/ matches only an incidental word ... no src/workbench module, no test file."
- `pi@b27829e6dfa7:src/workbench/collective-event.ts:2,39` — "the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope"; `COLLECTIVE_EVENT_PROVIDER = "mechanical-workflows"`; added f65860e1 2026-10-28 (present at the program baseline too); test/workbench-collective-event.test.ts exists.

### Reconciliation attempts
- scope split: SUCCEEDS. "No Mechanical *function invocation / host* binding" is true; "no Mechanical code at all" is false. The audit's own table says "None registered" (invocation), which survives.
- temporal split: the row's detection text predates collective-event.ts and was not refreshed.

### What would settle it
Refresh the W11 row's detection sentence; qualify C0161/SKILL line 13 with "invocation/host binding".

---

## K005 — "existing worktree tests explicitly exercise this outcome" vs what the tests assert

Claims: C0169.
Status: SUPPORTED (narrowed): the report half is asserted; the removal half is described in comments but not asserted.

### Evidence
- `pi@b27829e6dfa7:test/worktree.test.ts:432,445-446` — "reports no changes when the preservation commit fails" -> `expect(result.hasChanges).toBe(false)`
- `pi@b27829e6dfa7:test/worktree.test.ts:383-385,416-417` — comments: "can DESTROY user work while reporting success-shaped output"; "The agent's work is lost either way"
- No failure-path test asserts `existsSync(wt.path) === false`; the ordering test (449) asserts removal on the success path only.

### Reconciliation attempts
- semantic split: "exercise" (drive the path and assert the report) vs "assert the force-remove" — the doc's phrase is true under the former. These are characterization tests that lock the lossy behaviour in; they must not be read as guards.

### What would settle it
A failure-path test asserting directory removal (or the P0 regression test the doc proposes, which would invert the expectation).

---

## K006 — "documented proof contract" for compileContext (Pi doc vs MW docs/code)

Claims: C0251 (and the framing of C0252/C0253).
Status: UNSUPPORTED as worded; the narrower proposition (the rig adapter enforces RF render requirements in code; docs/07 documents the RF-id receipt rule) is SUPPORTED.

### Evidence for the claim (narrow reading)
- `mw@f7c0a9431d6c:apps/development-rig/src/rf-context.ts:82-89` — RF_CONTEXT_UNESTABLISHED unless render_id nonempty, text includes task+revision, graph_revision_id, verified model budget
- `mw@f7c0a9431d6c:docs/07-identity-effects-and-recovery.md:88` — "`receiptOf()` labels that stage established only when the RF producer id is present"

### Evidence against (as worded)
- grep -rni "proof contract" over MW docs/, packages/, apps/ -> 0 hits; grep compileContext docs/*.md -> 04:10,35 and 06:105, none stating proof obligations
- `mw@f7c0a9431d6c:packages/development/src/contracts.ts:27-31` — CompiledContext { basis; text; evidence? } (no render_id); `develop.ts:40-42` checks basis equality only

### Reconciliation attempts
- semantic split: "documented proof contract of compileContext" (absent) vs "code-enforced requirements of the rig's renderTaskContext adapter" (present). The prediction C0252 is sound only under the adapter reading.

### What would settle it
An MW document stating compileContext's proof obligations would establish the claim as worded. Repair: REPLACE_SOURCE (cite rf-context.ts and docs/07) and NARROW_SCOPE (name the rig adapter).

---

## K007 — "model and tool disagree" vs intentional layering (claim vs Pi tests)

Claims: C0184.
Status: SUPPORTED (factual core ESTABLISHED; the "disagree"/defect connotation narrowed).

### Evidence
- `pi@b27829e6dfa7:src/workbench/execute.ts:78` admits script|function|furnace-formula; `test/workbench-execute.test.ts:178` asserts all three "admitted"
- `pi@b27829e6dfa7:src/workbench/execute-tool.ts:217-218` refuses non-script with the typed refusal `unsupported-definition-kind`; `test/workbench-execute-tool.test.ts:173` asserts the refusal "in this host"

### Reconciliation attempts
- semantic split: SUCCEEDS — model admits, this host refuses; both halves are deliberately tested. Not an inconsistency.

### What would settle it
A design note stating the intent; the tests already favor the layering reading.

---

## K008 — Feedback window: method line vs P2 "recent" topics (Pi doc internal)

Claims: C0103 (window 2026-11-01..03) vs C0264/C0265 (deadline inflation, report-mode readers).
Status: C0264/C0265 SUPPORTED with a temporal defeater; C0263/C0266 ESTABLISHED (in-window).

### Evidence
- `pi@b27829e6dfa7:new-feedback/` filenames: deadline/timeout themes dated 2026-10-20..10-30; report-mode themes 2026-10-21..10-29; census-conflict 2026-10-27, 11-01, 11-03; prep 2026-10-31, 11-01, 11-02, 11-04
- bodies of the six 11-01..11-03 files: "deadline" 0/6, "report-mode" 1/6, "prep" 6/6, "conflict" 6/6
- all 44 files: one flywheel seat lineage (a8ddce77), each 11-0x file "the same seat ... a later cycle"

### Reconciliation attempts
- temporal split: SUCCEEDS — "recent" in P2 spans October; the method line names only the 11-01..03 tail as the newest files read.
- provenance: the n=3/n=4 corroboration counts are one lineage, not independent witnesses.

### What would settle it
Read the bodies of the October files (not done here); add the dates to the P2 sentence.

---

## K009 — Pi SKILL line 14 vs MW SKILL line 14 (cross-repo skill contradiction at the pins)

Claims: C0195 (quoted in Pi SKILL 14).
Status: Pi SKILL stale; MW SKILL current (same root as K001).

- `doc@7c80c34346c2:.agents/skills/pi-mechanical-interop/SKILL.md:14` — "Mechanical's checked-in descriptor and its entrypoint host disagree about schema reference spelling."
- `mw@f7c0a9431d6c:.agents/skills/mechanical-pi-host/SKILL.md:14` — "The checked-in `contracts/entrypoints/development.v1.json` and `entrypoint-host.ts` agree on one canonical schema-ref grammar ... (PIWB-MW0-R001)."

Reconciliation: version split (Pi SKILL written at 06:25Z, MW repair 08:14Z the same day). Repair: Pi SKILL line 14 -> "agreed since 1f29daa7; keep tests reading the committed file".

---

## Scope omissions and pin-internal findings (not contradictions, recorded for completeness)

- S1 — 01 line 35 names only `workflow_execute`; `pi@b27829e6dfa7:src/index.ts:2880-2881` (workflow_detached) also sends `grants:[]` with an optional claude backend. Under-statement of C0200/C0205; the contradiction is wider than written. Also: `index.ts:2640` registers the workbench tools only when `workflowAgentBackend === "claude"`, so every registered detached launch is a claude-backend launch (C0204 is unconditional in practice).
- S2 — 01 line 43 lists cwd/model/permissions/tools/roles/grants/principal; the pinned replayBasis also contains `settings` (settingSources names). Under-statement of C0218.
- S3 — `pi@b27829e6dfa7:src/workflow/tool-description.ts:81` still advertises `isolation?: 'worktree'` for workflow `agent()` while `claude-host.ts:188-189` refuses it. Pin-internal description/host mismatch adjacent to C0175; not a g01 claim.
- S4 — The P1 cancellation gap (C0213) also exists on the resume path: `pendingLookupAborts` is consumed only after `getSession` (claude-host.ts 348-351), so an abortAgent landing during the second `beforeDispatch` await is lost there too. Strengthens, does not contradict.
- S5 — 01 line 3 names reports "2026-11-01 to 2026-11-03"; at the pin new-feedback/ also holds 2026-11-04 (2) and 2026-11-05 (1) files that postdate the baseline (none were in f67b6665). Temporal, not a contradiction.
- S6 — "git-census" (02 line 40, 03 line 10, SKILL line 16's "Git-census mode") is not an identifier at the MW pin (grep over *.ts: 0); the shipped discriminant is `discovery: "git-tracked-files"` with evidence kind `tracked-file-census`. The program's vocabulary, not MW's. Affects the presupposition of C0245 only.
- S7 — Ledger: claims-part-01 and claims-part-02 share ids C0201..C0279 for different propositions. Every row and dossier in this group carries `claim_file: claims-part-01.jsonl`; graph assembly must key by (file, id) or renumber.
