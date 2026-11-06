# CONTRADICTIONS — merged contradiction sets (Phases 6-8 roll-up)

Pins: artifact `doc@7c80c34346c2` (pi-subagents 7c80c34346c2e46b0f0201c3bf916274159c7cf7; byte-identical in the pin worktree), environment `pi@b27829e6dfa7` and `mw@f7c0a9431d6c`; the program's own baselines are pi `f67b6665` and mw `0c78e253` (Pi `src/` is byte-identical baseline -> pin; MW moved by eight commits). Nothing was run: every verdict is a static read at the pins plus `git show`/`git log`/`git diff` between baseline and pin.

Claim ids are the merged `CLAIMS.jsonl` ids: part-02 (doc 02) claims were renumbered `C02nn -> C05nn` to remove the 79-id collision with part-01; `original_id` on each row keeps the part-level id. Every part-level set (g01 `K001-K009`, g02 `KG02-01..05`, g03 `G03-K01..K10`) is listed under the unified set that absorbs it, so nothing is collapsed silently. "Pin reading" states which side the environment pin supports.

Status vocabulary follows `status-and-propagation.md`: a version split that reconciles is recorded as such (ESTABLISHED at one revision, REFUTED at the other, temporal qualifier owed), not as CONTESTED. Only one set (KU10) is a live CONTESTED disagreement, and it is between two proposals.

Summary table

| Set | Topic | Absorbs | Final status | Pin reading |
|---|---|---|---|---|
| KU01 | Descriptor schema-ref mismatch vs its loader | K001, KG02-01, G03-K01, G03-K02, K009 | REFUTED at mw@f7c0a943 / ESTABLISHED at mw@0c78e253 (version split, reconciled) | pin: descriptor and host agree (repaired by 1f29daa7) |
| KU02 | "Pi hardcoded descriptor tests" misattribution | KG02-02 | REFUTED (repo misattribution + repaired upstream) | pin: no Pi descriptor test exists; MW's tests are file-driven |
| KU03 | developLive host AbortSignal | K002 | SUPPORTED, narrowed (version + semantic split) | pin: a pre-dispatch-only `signal?` exists (f7c0a943) |
| KU04 | "node() is shell-backed" | K003 | REFUTED as an observation; the artifact asserts only a norm | pin: capability-registry dispatch, no shell |
| KU05 | W11 row detection sentence; "no Mechanical binding" scope | K004, G03-K06 | status `planned` ESTABLISHED; detection sentence REFUTED; absence claims SUPPORTED/ESTABLISHED with invocation scope | pin: collective-event.ts exists; no invocation binding |
| KU06 | Worktree P0: "tests exercise" and unconditional "loss" | K005, G03-K05 | SUPPORTED, narrowed (semantic + quantifier split) | pin: failure path loses; happy path preserves |
| KU07 | compileContext "documented proof contract" | K006 | UNSUPPORTED as worded; narrower adapter proposition SUPPORTED | pin: requirements live in rf-context.ts, no document names a proof contract |
| KU08 | execute.ts vs execute-tool.ts "disagree" | K007 | SUPPORTED; connotation narrowed to intentional layering | pin: both halves tested deliberately |
| KU09 | Feedback window vs "recent" topics (incl. C0399 regrade) | K008 | SUPPORTED with temporal + provenance defeaters | pin: topics span 2026-10-20..11-03, one seat lineage |
| KU10 | `profile` (Pi doc) vs `mode` (MW doc) | KG02-03 | CONTESTED (two NON-EPISTEMIC proposals disagree) | pin: neither token shipped |
| KU11 | "installed verified descriptor" | KG02-04 | SUPPORTED with overclaim (semantic split) | pin: committed file self-describes `descriptor-only` |
| KU12 | "empty-grants refusal" label; second launch site | KG02-05, S1 | ESTABLISHED defect; label narrowed; contradiction wider than written | pin: both sides present and unchanged |
| KU13 | "explicit git-census profile" | G03-K03, S6 | REFUTED for the selectable profile; mechanism SUPPORTED | pin: `discovery: "git-tracked-files"`, no profile selector |
| KU14 | cancel/skip/retry race at beforeDispatch | G03-K04, S4 | PLAUSIBLE (g03 widening) under a SUPPORTED hypothesis (g01); "cancel" excluded | pin: run-level cancel re-checked (F10); per-agent skip/retry has no token |
| KU15 | "No GitHub CI" vs Pi `ci.yml` | G03-K07 | NON-EPISTEMIC norm; literal inventory reading contradicted | pin: `.github/workflows/ci.yml` exists in Pi |
| KU16 | "four callbacks" warranted by four outcomes | G03-K08 | NON-EPISTEMIC; dependency edge corrected | pin: callbacks and outcomes are distinct four-sets, both present |
| KU17 | "all unblockers before PI-3" vs conditional worktree item | G03-K09 | NON-EPISTEMIC planning tension | n/a (plan text) |
| KU18 | Baseline date vs UTC commit dates | G03-K10 | SUPPORTED; timezone qualifier owed | pin: f67b6665 is 2026-11-05 05:57Z |

---

## KU01 — Mechanical descriptor schema refs vs its entrypoint host (version split, reconciled)

Claims: C0189, C0190, C0193, C0194, C0195, C0196, C0277 (doc 01); C0530, C0529 (doc 02; part-02 C0230/C0229); C0305, C0336, C0338, C0437 (doc 03 / SKILL); presuppositions of the NON-EPISTEMIC rows C0197, C0199, C0302, C0337, C0438, C03142, C0531, C0535, C0536.
Absorbs: K001, KG02-01, G03-K01, G03-K02, K009 (Pi SKILL:14 vs MW SKILL:14).
Status: REFUTED at `mw@f7c0a9431d6c`; ESTABLISHED at `mw@0c78e253`. Host-side half (C0191, C0192, C0529) ESTABLISHED at both revisions.

### Evidence for the claims (baseline)
- `mw@0c78e253 (git show):contracts/entrypoints/development.v1.json:8-9` — `"inputSchema": "../schemas/development-request.v1.schema.json", "outputSchema": "../schemas/development-outcome.v1.schema.json"`
- `mw@0c78e253 (git show):apps/development-rig/test/entrypoint-host.test.ts:12` — handwritten descriptor literal with bare names
- `mw@f7c0a9431d6c:apps/development-rig/src/entrypoint-host.ts:89` — exact-string compare against bare filenames (unchanged baseline -> pin)
- `mw@f7c0a9431d6c:docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md:22` — MW program restates the mismatch, self-scoped to 0c78e253 (same author, same evening: one lineage)
- `mw@f7c0a9431d6c:README.md:47` — "The checked-in entrypoint descriptor does not currently match the local loader's schema-ref check" (stale at the pin)

### Evidence against (pin)
- `mw@f7c0a9431d6c:contracts/entrypoints/development.v1.json:8-9` — `"inputSchema": "development-request.v1.schema.json", "outputSchema": "development-outcome.v1.schema.json"`
- `git -C mw log 0c78e253..f7c0a943` — `1f29daa7 fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host tests (MechanicalWorkflows-14zrz)`; authored 2026-11-05 08:14:24Z, committed 08:49:21Z (cherry-pick of db320491); the Pi program commit 7c80c343 is 2026-11-05 06:25:31Z, about 1 h 49 min earlier
- `mw@f7c0a9431d6c:apps/development-rig/test/{entrypoint-host,installed-host}.test.ts:12/29` — `JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", ...)))`
- `mw@f7c0a9431d6c:apps/development-rig/test/entrypoint-descriptor-file.test.ts:14-15,52` — "PIWB-MW0-R001: the committed descriptor of record is consumed from disk"; test "accepts the committed descriptor over the real npm-packed tarball" (not run)
- `mw@f7c0a9431d6c:.agents/skills/mechanical-pi-host/SKILL.md:14` — "agree on one canonical schema-ref grammar (bare filename ..., no `..`)"
- `mw@f7c0a9431d6c:contracts/README.md:13` — "audit found a schema-path mismatch ...; it is repaired (PIWB-MW0-R001)"

### Reconciliation attempts
- version split: SUCCEEDS. Every Pi-side sentence describes 0c78e253 truthfully; the repair landed between the Pi program commit and the environment pin; the Pi docs at 7c80c343 were never updated.
- scope split: n/a (same file, same host). semantic split: n/a (exact string equality).
- cross-document: Pi SKILL:14 ("disagree") directly contradicts MW SKILL:14 ("agree") at the pins; MW README:47 still agrees with the Pi SKILL and is itself stale. Normalising by revision dissolves every pairing.
- derivation: C0194's derivation (relative refs + exact bare-filename compare -> failure) is valid; its premises C0189/C0190 fail at the pin and the conclusion is re-derived as REFUTED (identical strings cannot fail an equality check), not merely unsupported.

### Pin reading
The pin supports "repaired": committed JSON and host strings match byte-for-byte; three tests read the committed file (test execution not witnessed here).

### What would settle it
Settled by `git show 0c78e253:contracts/entrypoints/development.v1.json` vs the pin file and `git log` (1f29daa7). Running the MW suite would add a passing-test witness (not run). Repair owed (REMEDIATION M012-M017, M027, M030, M032, M037, M038, M048): ADD_TEMPORAL_QUALIFIER on 01:29-31, 01:65, 02:48, 03:7, 03:18 and SKILL:14.

---

## KU02 — "Pi consumes the canonical descriptor without hardcoded tests" (misattribution)

Claims: C0534 (part-02 C0234), premise of C0533 (C0233).
Absorbs: KG02-02.
Status: REFUTED (the implied Pi tests do not exist; the hand-authored tests were MechanicalWorkflows', now file-driven).

### Evidence for the reading as atomized
- `doc@7c80c34346c2:02-host-architecture-and-protocol.md:48` — "Pi consumes the canonical exported descriptor without hardcoded tests that substitute a hand-authored object."

### Evidence against
- `pi@b27829e6dfa7`: grep `EntrypointDescriptor|development.v1.json|mechanical.development.develop` over `src/` and `test/` -> only prose/census fixtures (`test/workbench-docs07-provider-rules.census.ts:262`, mw-intent-host, mw-composition-ref), no descriptor object or test
- `mw@f7c0a9431d6c:apps/development-rig/test/entrypoint-host.test.ts:12`, `installed-host.test.ts:29`, `entrypoint-descriptor-file.test.ts:16` — the formerly hand-authored tests, now reading the committed JSON (1f29daa7)

### Reconciliation attempts
- semantic split: PARTIAL — read as a prescription for future Pi behaviour the sentence asserts nothing false; the atomized existence premise fails under every reading.
- repo split: the defect existed in MW at baseline, not in Pi, and is repaired at the MW pin.

### Pin reading
No Pi test constructs a Mechanical descriptor; MW's tests load the committed file.

### What would settle it
Settled by the detector (grep, both trees) plus the MW test diff. Repair: MARK_AS_DEFINITION (REMEDIATION M031): state the sentence as a requirement and name the repo where the hand-authored tests lived.

---

## KU03 — developLive host AbortSignal (version + semantic split)

Claims: C0229 (doc 01), presupposition of C0235; MW program 01:42 restates ("lack a public host-provided AbortSignal").
Absorbs: K002.
Status: SUPPORTED for the narrowed reading ("no general / mid-run cancellation"); the unqualified presence clause is REFUTED at the pin.

### Evidence for the claim (baseline)
- `mw@0c78e253 (git show):apps/development-rig/src/claude-implement.ts:11-15` — `AgentOptions { model?; maxTurns?; maxBudgetUsd? }` (no signal); `live-development.ts` grep `signal|abort`: 0 hits

### Evidence against (pin)
- `mw@f7c0a9431d6c:apps/development-rig/src/claude-implement.ts:15-20` — `readonly signal?: AbortSignal;` "Honoured as a pre-dispatch barrier only ... not forwarded to the SDK and an abort during a running session is not handled by this slice."
- `mw@f7c0a9431d6c:apps/development-rig/src/live-development.ts:59,112` — `assertNotCancelledBeforeDispatch(options.signal);`
- `git -C mw log -1 f7c0a943` — "feat(development-rig): add a host AbortSignal with a pre-dispatch cancellation barrier for developLive and runClaudeImplementation (MechanicalWorkflows-llkkl)" (authored 2026-11-05 08:39:53Z, committed 12:24:14Z: the pin commit itself)
- `mw@f7c0a9431d6c:apps/development-rig/test/live-development.test.ts:415` — "an already-aborted host signal dispatches no agent and no Forge" (not run)

### Reconciliation attempts
- version split: SUCCEEDS for the presence clause (true at baseline, false at pin).
- semantic split: SUCCEEDS for "general": the pin signal is a pre-dispatch barrier only; mid-run cancellation is still absent.

### Pin reading
A host-supplied `signal` exists and is honoured before dispatch only.

### What would settle it
Settled by git show/log. Repair (M019): ADD_TEMPORAL_QUALIFIER + narrowing on 01:47.

---

## KU04 — "node() is shell-backed" (extracted observation vs the pin)

Claims: C0188 (OBSERVATION extracted from the prohibition at 01:27; C0186 is the norm).
Absorbs: K003.
Status: REFUTED as an observation at `pi@b27829e6`; the artifact itself does not assert it.

### Evidence for the claim
- `doc@7c80c34346c2:01-audit-and-evidence.md:27` — "do not use a shell-backed `node()` or paste Mechanical code into the workflow interpreter." (prescriptive)
- loose reading only: `pi@b27829e6dfa7:src/workbench/providers/reactivefiber.ts:139` spawns the `rf` binary; `providers/forge.ts:87` `ServerConnection.spawn("forge")` — two of four providers reach external processes by argv spawn, no shell

### Evidence against
- `pi@b27829e6dfa7:src/workflow/runtime.ts:1352` — capabilityId validated against a dotted-identifier grammar; `:1610` `callNode(...)` -> `CapabilityRegistry.invoke`
- `pi@b27829e6dfa7:src/workbench/providers/hyperunix.ts:4`, `furnace.ts:4` — SDK imports, no process
- grep `shell: true|sh -c` over runtime.ts, worker-source.ts, providers/*.ts: 0 hits

### Reconciliation attempts
- semantic split: the clause prohibits a remedy shape; as an observation the strict reading ("executes a shell") is contradicted and the loose reading ("reaches external binaries") holds for two providers by argv spawn.

### Pin reading
node() is capability-registry-backed.

### What would settle it
Settled by source. Ledger repair only (M011 REMOVE_CLAIM): the row restates a norm as an observation; no artifact repair is owed beyond an optional clarity edit.

---

## KU05 — W11 feature-matrix row and the scope of "no Mechanical binding"

Claims: C0163, C0182 (SOURCE_REPORT of the W11 row), C0161 ("no Mechanical SDK/host adapter"), C0436 (SKILL:13 "no registered Mechanical binding"), C0407, C03124, C0406, C0340, C0435.
Absorbs: K004, G03-K06.
Status: the W11 status `planned` is ESTABLISHED; the row's embedded detection sentence is REFUTED at the pin (and was already false at the baseline, blob identical); the absence claims are SUPPORTED (C0161, C0163, C0182) or ESTABLISHED (C0436, C0340, C0435) with the invocation/host-binding scope.

### Evidence for the claims
- `pi@b27829e6dfa7:docs/workbench/feature-matrix.md:112` — W11 "planned", bead wb-04s blocked (row authored 2026-10-15, 10a67e73; blob 573385d8 identical at baseline and pin)
- `ls src/workbench/hosts/` -> `furnace-hosted.ts local-detached.ts`; `package.json` has no `@mechanical` dependency; no descriptor/installed-host reference in `src/`

### Evidence against (the row's detection sentence; the unqualified "no Mechanical code")
- `pi@b27829e6dfa7:docs/workbench/feature-matrix.md:112` — "grep -ril mechanical over src/ and test/ matches only an incidental word ... no src/workbench module, no test file."
- `pi@b27829e6dfa7:src/workbench/collective-event.ts:2,39` — "the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope"; `COLLECTIVE_EVENT_PROVIDER = "mechanical-workflows"`; added f65860e1 2026-10-28 (present at the baseline too); `test/workbench-collective-event.test.ts` exists; `grep -ril mechanical src/ test/` -> 2 src files + 78 test files at the pin

### Reconciliation attempts
- scope split: SUCCEEDS. "No Mechanical function-invocation / host binding" is true; "no Mechanical code at all" is false. The audit's own table says "None registered" (invocation), which survives.
- temporal split: the row's detection text predates collective-event.ts and was never refreshed.
- cross-group asymmetry: C0436 (SKILL) is ESTABLISHED and C0161 (01 table cell) SUPPORTED; the difference is wording-driven ("registered binding" vs the wider table cell), both permitted wordings carry the collective-event.ts qualifier (RELATIONS X025).

### Pin reading
No invocation binding; a read-only envelope boundary exists; the W11 status is accurate and its evidence sentence stale.

### What would settle it
Refresh the W11 row's detection sentence (feature-matrix edit, out of this artifact); qualify 01:17 and 01:27 (M005, M006, M009).

---

## KU06 — Worktree P0: "tests explicitly exercise this outcome" and "loss of modified worktrees"

Claims: C0169 (01:23), C0346 (03:21), C0167 (01:23 "force-removes"), with C0170 (01:21 "may discard") as the established origin.
Absorbs: K005, G03-K05.
Status: SUPPORTED, narrowed. C0170 ESTABLISHED (modal "may" is the right strength). C0167 ESTABLISHED with the attempted/guaranteed narrowing.

### Evidence
- `pi@b27829e6dfa7:src/worktree.ts:145,160,169-170,177-181,189` — commit, branch, remove; outer catch: `removeWorktree` (`git worktree remove --force`, prune fallback) then `return { hasChanges: false }`
- `pi@b27829e6dfa7:test/worktree.test.ts:432,445-446` — "reports no changes when the preservation commit fails" -> `expect(result.hasChanges).toBe(false)`; `:383-385,416-417` comments "can DESTROY user work while reporting success-shaped output"
- `pi@b27829e6dfa7:test/worktree.test.ts:222,449` — "commits changes and creates branch when changes exist"; "creates the branch BEFORE removing the worktree, so a removal failure cannot lose commits" (happy path preserves)
- no failure-path test asserts `existsSync(wt.path) === false`

### Reconciliation attempts
- semantic split (C0169): "exercise" (drive the path and assert the report) vs "assert the force-remove" — true under the former; these are characterization tests that lock the lossy behaviour in and must not be read as guards.
- quantifier split (C0346): loss requires a preservation failure AND a successful `--force` removal; the normal modified path commits and branches first. 03:21 and SKILL:24 dropped the 01:21 modal.
- modality (C0167): removal is attempted; when git cannot remove (corrupted link) the directory remains.

### Pin reading
The failure path discards work and reports clean; the happy path preserves; no real deletion was observed (nothing run).

### What would settle it
A failure-path test asserting directory removal (or the P0 regression test the doc proposes). Repairs M007, M008, M039.

---

## KU07 — compileContext "documented proof contract" (Pi doc vs MW docs/code)

Claims: C0251 (UNSUPPORTED), framing of C0252 (PREDICTION, SUPPORTED under reading A), C0253 (SUPPORTED).
Absorbs: K006.
Status: UNSUPPORTED as worded; the narrower proposition (the rig adapter enforces RF render requirements in code; MW docs/07 documents the RF-id receipt rule) is SUPPORTED.

### Evidence for the narrow reading
- `mw@f7c0a9431d6c:apps/development-rig/src/rf-context.ts:82-89` — `RF_CONTEXT_UNESTABLISHED` unless render_id nonempty, text includes task+revision, `graph_revision_id`, verified model budget (requirement block unchanged since baseline; 1872a6f1/a074428d touched error handling)
- `mw@f7c0a9431d6c:docs/07-identity-effects-and-recovery.md:88` — "`receiptOf()` labels that stage established only when the RF producer id is present"
- `pi@b27829e6dfa7:src/workbench/providers/reactivefiber.ts` — preview argv ends `--no-commit --no-input --json`; the provider rejects any envelope whose render_id is not null

### Evidence against (as worded)
- grep -rni "proof contract" over MW docs/, packages/, apps/ -> 0 hits; grep compileContext docs/*.md -> 04:10,35 and 06:105, none stating proof obligations
- `mw@f7c0a9431d6c:packages/development/src/contracts.ts:27-31` — `CompiledContext { basis; text; evidence? }` (no render_id); `develop.ts:40-42` checks basis equality only

### Reconciliation attempts
- semantic split: "documented proof contract of compileContext" (absent) vs "code-enforced requirements of the rig's renderTaskContext adapter" (present). C0252 is sound only under the adapter reading; under the develop() port reading the prediction does not follow.

### Pin reading
Requirements exist in the rig adapter's code; no document states a proof contract for the port.

### What would settle it
An MW document stating compileContext's proof obligations would establish the claim as worded. Repairs M022 (REPLACE_SOURCE), M023 (NARROW_SCOPE naming the referent).

---

## KU08 — "model and tool disagree" vs intentional layering

Claims: C0184.
Absorbs: K007.
Status: SUPPORTED (factual core ESTABLISHED; the defect connotation narrowed).

### Evidence
- `pi@b27829e6dfa7:src/workbench/execute.ts:78` admits `script|function|furnace-formula`; `test/workbench-execute.test.ts:178` asserts all three "admitted"
- `pi@b27829e6dfa7:src/workbench/execute-tool.ts:217-218` refuses non-script with the typed refusal `unsupported-definition-kind` (cited 215-219: two-line benign drift); `test/workbench-execute-tool.test.ts:173` asserts the refusal "in this host"

### Reconciliation attempts
- semantic split: SUCCEEDS — model admits, this host refuses; both halves are deliberately tested. Not an inconsistency.

### Pin reading
Intentional layering.

### What would settle it
A design note stating the intent (the tests already favour the layering reading). Repair M010.

---

## KU09 — Feedback window: method line vs "recent" topics (doc 01 internal; doc 03 restatement)

Claims: C0103 (window 2026-11-01..03) vs C0264/C0265 (deadline inflation, report-mode readers); C0263/C0266 (in-window topics); C0399 (03:50 conjunction, regraded ESTABLISHED -> SUPPORTED by Phase 6 propagation).
Absorbs: K008 (+ lens-provenance rows 25-27, lens-scope row 7).
Status: C0264/C0265 SUPPORTED with temporal and provenance defeaters; C0263/C0266 ESTABLISHED; C0399 SUPPORTED (cap inherited from C0264, its weakest topic).

### Evidence
- `pi@b27829e6dfa7:new-feedback/` filenames: deadline/timeout themes dated 2026-10-20..10-30 (eight files); report-mode 2026-10-21..10-29; census-conflict 2026-10-27, 11-01, 11-03; prep 2026-10-31, 11-01, 11-02, 11-04
- bodies of the six 11-01..11-03 files: "deadline" 0/6, "report-mode" 1/6, "prep" 6/6, "conflict" 6/6; "tester" appears in 0 of 44 bodies; "timeout" in 24 of 44
- all 44 files: one flywheel seat lineage (a8ddce77); each 11-0x file "the same seat ... a later cycle"
- at the pin new-feedback/ also holds 2026-11-04 (2) and 2026-11-05 (1) files that postdate the baseline

### Reconciliation attempts
- temporal split: SUCCEEDS — "recent" in P2 spans October; the method line names only the 11-01..03 tail as the newest files read.
- provenance: n=3/n=4 corroboration counts are one lineage, not independent witnesses.
- propagation: 03:50 conjoins three topics; a conjunction cannot exceed its weakest member (C0264 SUPPORTED), hence the C0399 regrade (CLAIMS.patch.jsonl).

### Pin reading
Topics are locatable by filename over 2026-10-20..11-03; the October bodies were not read.

### What would settle it
Reading the bodies of the October files; dates in the P2 sentence (M025, M026).

---

## KU10 — `profile` (Pi doc 02) vs `mode` (MW doc 02) for the same proposed selector — CONTESTED

Claims: C0522 (part-02 C0222; Pi side), C0555-C0557 (profile semantics); MW counterpart lives in the MW program (not audited here).
Absorbs: KG02-03 (+ lens-logic row 41).
Status: CONTESTED between the two program documents (both NON-EPISTEMIC proposals; neither shipped).

### Evidence for `profile`
- `doc@7c80c34346c2:02-host-architecture-and-protocol.md:40` — `profile: "git-census" | "native-task-scope";`

### Evidence for `mode`
- `mw@f7c0a9431d6c:docs/programs/pi-workbench-interop-2026-11-04/02-binding-and-packaging-contract.md:25` — `mode: "git-census" | "native-task-scope";`

### Reconciliation attempts
- same value set, same author, same evening (one lineage): a naming divergence inside one program, not independent designs. Broader shape divergence: `FunctionLaunch{definitionRef,input,hostMode,profile,policy}` vs `BoundInvocation{entrypointId,artifactDigest,request,scope,mode,effectAuthorization}`.
- neither token exists in any shipped `.ts` at either pin (`git-census` greps to prose only), so no code is contradicted.

### Pin reading
Neither reading is shipped; the pin cannot arbitrate a naming choice.

### What would settle it
A single contract spec (one field name) adopted by both repos before implementation; tracker: program owner. Repair M029 (SURFACE_DISAGREEMENT).

---

## KU11 — "installed verified descriptor" vs the descriptor's own status

Claims: C0521 (part-02 C0221).
Absorbs: KG02-04.
Status: SUPPORTED with overclaim (semantic split resolves most of it).

### Evidence for
- `mw@f7c0a9431d6c:contracts/entrypoints/development.v1.json:3` — `"id": "mechanical.development.develop.v1"`; `apps/development-rig/src/entrypoint-host.ts:32` — `const NAME = "mechanical.development.develop.v1"`; `entrypoint-descriptor-file.test.ts:42` digests a real packed tarball

### Evidence against the "installed" qualifier
- `mw@f7c0a9431d6c:contracts/entrypoints/development.v1.json:16-17` — `"status": "descriptor-only", "note": "No remote host loader or generic invocation transport is implemented. Artifact binding belongs to the deployment host."`

### Reconciliation attempts
- semantic split: "installed verified" as install-flow-verified in tests holds; as a standing installed artifact it does not. The committed+digest-checked proposition is ESTABLISHED.

### Pin reading
A committed, test-verified descriptor; nothing installed.

### What would settle it
An install receipt (artifact digest + install location) at a future pin. Repair M028.

---

## KU12 — "empty-grants refusal" label and the width of the detached-admission contradiction

Claims: C0586 (part-02 C0286; label inherited by C0587), C0200-C0205, C0209 (doc 01), C0343, C0345, C0439-C0441 (doc 03 / SKILL).
Absorbs: KG02-05, S1.
Status: ESTABLISHED defect (static, not run), semantically narrowed label; the contradiction is wider than the doc states.

### Evidence for the defect
- `pi@b27829e6dfa7:src/index.ts:2623,2627-2628` — registered detached launch sends `grants: []` with backend `"claude"` whenever `workflowAgentBackend === "claude"`; `:2640` the workbench tools register only under that setting; second site `:2880-2881` (`workflow_detached`)
- `pi@b27829e6dfa7:src/workbench/hosts/local-detached.ts:430` — `if (request.backend === "claude" && !grants.includes("claude:invoke")) throw ...`; `:442` exact `claude:tool:<name>` grants; grep `claude:invoke` over src/ -> only this line (no producer of the grant anywhere)

### Evidence narrowing the label
- `pi@b27829e6dfa7:src/workbench/hosts/local-detached.ts:427` — the generic validator accepts an empty array; the refusal fires on the missing `claude:invoke` grant, not on emptiness
- no test drives the registered tool's claude-backend detached launch through index.ts into the real preflight (execute-tool tests inject `launchDetached` as `vi.fn`; the three `claude:invoke` tests call the host directly with the grant present) — C0209 SUPPORTED

### Reconciliation attempts
- semantic split: RESOLVES — "empty-grants refusal" names the symptom; the mechanism is missing grant wiring on the caller side. The fix lands in the caller's grants, not in empty-list handling.
- scope: with backend `deterministic` the same path launches and passes; the contradiction is claude-backend-specific, and under the only setting that registers the tools every detached launch through them is refused.

### Pin reading
Both sides present and unchanged baseline -> pin; defect current.

### What would settle it
A fixture run of the registered `workflow_execute`/`workflow_detached` path under `workflowAgentBackend: "claude"` reproducing the line-430 throw (not run). No remediation row owed (not an overclaim); S1 widening noted in EPISTEMIC-AUDIT.md.

---

## KU13 — "explicit `git-census` profile" vs the shipped tracked-file census

Claims: C0320 (REFUTED), C0356, C0443 (SUPPORTED, narrowed), C0444 (ESTABLISHED), C0355, C03113, C0316 (NON-EPISTEMIC dependants); proposals C0522, C0555 (doc 02); presupposition of C0245 (doc 01).
Absorbs: G03-K03, S6.
Status: REFUTED for "explicitly selectable profile"; the mechanism it labels is SUPPORTED (developLive) and its non-HX character ESTABLISHED.

### Evidence for the claims
- `doc@7c80c34346c2:03-implementation-and-qa.md:10,23`; `SKILL.md:16`; `02-host-architecture-and-protocol.md:40,58` (the program's own vocabulary)
- `mw@f7c0a9431d6c:apps/development-rig/src/live-development.ts:20` — `readonly discovery: "git-tracked-files";` (fixed mode); `:30` — `readonly contextMode?: "plain" | "rf";` (the only selectable axis); evidence kind `tracked-file-census`; receipt code `GIT_TRACKED_FILE_CENSUS_NOT_HX_TASK_SCOPE`

### Evidence against the profile
- grep `git-census|gitCensus|git_census` over MW `apps/`, `packages/` (*.ts) at the pin: 0 hits; in docs only docs/07 and the MW program doc; at the Pi pin only the two program docs
- `mw@f7c0a9431d6c:apps/development-rig/src/live-composition.ts:4-6` — a separate root wires HX task scope through `discoverTaskScope` (so "Mechanical's current mode is git-census" is true of developLive, not of every rig entrypoint)

### Reconciliation attempts
- semantic split: SUCCEEDS — the tracked-file mechanism is real; "git-census" is a proposed label; "selectable profile" is proposal -> observation drift (C0320 depends on the doc-02 proposals C0522/C0555, which cannot warrant an observation).

### Pin reading
A fixed tracked-file census in developLive; no profile selector; a separate HX root exists.

### What would settle it
Explicit selector code and an actual consumer invocation. Repairs M035, M041, M049.

---

## KU14 — cancel/skip/retry at the parked `beforeDispatch` seam

Claims: C0213 (doc 01 HYPOTHESIS, SUPPORTED), C0353 (doc 03 INFERENCE, PLAUSIBLE), C0210-C0212, C0214, C0350, C0351 (ESTABLISHED premises), C0352, C0323, C0372, C0453 (NON-EPISTEMIC dependants).
Absorbs: G03-K04, S4.
Status: per-agent skip/retry race SUPPORTED as a hypothesis (unreproduced); the g03 widening to "cancel" and "unauthorized late SDK start" PLAUSIBLE; run-level cancel excluded by code and test.

### Evidence
- `pi@b27829e6dfa7:src/workbench/claude-host.ts:207` awaits `beforeDispatch`; `:215` `if (config.signal?.aborted) return { ok:false, skipped:true, ... }` (workflow-wide re-check); `:216-220` controller created and registered only after the await; `:341-344` `abortAgent` is `controllers.get(agentId)?.abort()` plus `pendingLookupAborts` only when `sessions.has(agentId)`
- `pi@b27829e6dfa7:src/workflow/runtime.ts:879,887` skip/retry call `host.abortAgent`; `:1215` `live.started = true` before `spawnAgent`; `:1278-1282` retry re-queues
- `pi@b27829e6dfa7:test/workbench-claude-cancel-faults.test.ts:535` — F10 "a run abort during beforeDispatch stops the agent before query()" (run-signal only); grep skip/retry/abortAgent with beforeDispatch over test/ -> 0
- resume path: `pendingLookupAborts` consumed only after `getSession` (`:348-351`), so the same gap exists there (S4; strengthens, does not contradict)

### Reconciliation attempts
- scope split: SUCCEEDS — the whole-workflow signal is re-checked after the await (C0214, F10); only per-agent skip/retry lacks a token during the await. 03:22 lists testing both (a norm); the extracted C0353 over-reads it into "cancel ... can result in a late unauthorized SDK start".
- strength: structural derivation only; no fault-injection run exists at the pin, so HYPOTHESIS/modal wording is the ceiling.

### Pin reading
Per-agent skip/retry during the await is a no-op by code reading; run-level cancel is protected.

### What would settle it
A fixture test that parks `beforeDispatch`, issues skip/retry (or `host.abortAgent`), releases, and asserts `sdk.calls.length === 0` with a skipped settlement. Repair M040 (NARROW_SCOPE on 03:22).

---

## KU15 — "No GitHub CI" vs the pre-existing Pi `ci.yml`

Claims: C0422 (README:24), C0394 (03:48).
Absorbs: G03-K07.
Status: NON-EPISTEMIC; the literal repository-wide inventory reading is contradicted at the pin.

### Evidence
- `doc@7c80c34346c2:README.md:24` — "No GitHub CI; use Forge for the primary gate ..."; `03-implementation-and-qa.md:48` — "Do **not** add GitHub CI."
- `pi@b27829e6dfa7:AGENTS.md:167` — "Use Forge for project build/test/package integration, do not add GitHub CI, and do not introduce Library as a dependency."
- `pi@b27829e6dfa7:.github/workflows/ci.yml:1-6` — `name: CI / on: push: branches: [master] / pull_request: branches: [master]` (exists at the pin)

### Reconciliation attempts
- semantic split: "do not add/rely on CI for this program" is compatible with the inherited workflow file; "there is no GitHub CI" is false for Pi. MW has no CI file. No deletion or configuration change is implied by either reading.

### Pin reading
A CI workflow file exists in Pi; the program rule is the intended reading.

### What would settle it
Owner clarification of program-scoped prohibition vs repository-wide desired state. Repair M047 (NARROW_SCOPE).

---

## KU16 — "Correct four callbacks" warranted through the four outcome variants

Claims: C0312 (NON-EPISTEMIC), C03111 (ESTABLISHED), C0547 (part-02 C0247, ESTABLISHED).
Absorbs: G03-K08.
Status: NON-EPISTEMIC; the dependency path does not entail the callback count, but the count is established directly.

### Evidence
- `mw@f7c0a9431d6c:contracts/entrypoints/development.v1.json:10-15` — `"bindings": ["discover","compileContext","implement","verify"]`
- `mw@f7c0a9431d6c:packages/development/src/contracts.ts:47-52` — `DevelopmentServices { discover; compileContext; implement; verify }`; `:54-58` — `DevelopmentOutcome` union of exactly four variants

### Reconciliation attempts
- edge correction: outcomes and callbacks are distinct four-member sets; the ledger edge C0312 -> C03111 is replaced by C0312 -> C0547 (M033, ledger only). No doc change.

### Pin reading
Both four-sets present.

---

## KU17 — "All unblockers before PI-3" vs the conditional worktree item

Claims: C0335, C0347, C0348 (NON-EPISTEMIC).
Absorbs: G03-K09.
Status: NON-EPISTEMIC planning tension, not a factual contradiction.

### Evidence
- `doc@7c80c34346c2:03-implementation-and-qa.md:16` — "First unblockers, before claiming PI-3"; `:21` — "Fix loss of modified worktrees ... before reusing Pi worktree isolation; begin PI-3 on a distinct, materialized Mechanical workspace if simpler."; `:20` — detached repair "independently"

### Reconciliation attempts
- the heading suggests six unconditional blockers; item 4 is explicitly conditional on reusing worktree isolation and item 3 is independent of embedded PI-3. Consistent under the reading "each unblocker gates the path that needs it".

### What would settle it
An explicit dependency/closure graph and the owner's reading of "before claiming PI-3". No remediation row (not an overclaim; no epistemic status).

---

## KU18 — "Audit baseline (2026-11-04)" vs UTC commit dates

Claims: C0402 (SUPPORTED, overclaims), C0403 (SUPPORTED), C03122 (ESTABLISHED).
Absorbs: G03-K10.
Status: SUPPORTED; the date holds only in the author's -0800 zone.

### Evidence
- `doc@7c80c34346c2:README.md:4` — "**Audit baseline (2026-11-04):** pi-subagents `master` `f67b6665...`; MechanicalWorkflows `main` `0c78e253...`"
- `git -C pi log -1 f67b6665` — 2026-11-05 05:57:48 +0000 (= 2026-11-04 21:57 -0800); `7c80c343` — 2026-11-04 22:25:31 -0800 (= 2026-11-05 06:25Z), parent f67b6665
- `git -C mw log -1 0c78e253` — 2026-11-02 21:17:57 +0000; `bf8fbb93` (MW program) — 2026-11-04 22:30:58 -0800, five minutes after the Pi program commit
- `git -C pi log -1 b27829e6` — 2026-11-06 00:35:07 +0000, "Merge workbench/implementation-program (landings through 996, trunk d7b5e894) into master"; 375 commits ahead of f67b6665, `src/` unchanged

### Reconciliation attempts
- timezone split: SUCCEEDS — local -0800 date reconciles the 2026-11-04 label with the 2026-11-05 UTC Pi commit. "master now contains the former implementation branch" (04:7) is true at the environment merge pin, not at the program authoring instant.

### Pin reading
The baselines are the commits named; the date needs a zone.

### What would settle it
Timezone/pin qualifiers (M045); the original timestamped ref readbacks would settle the historical default-branch identity.

---

## Scope omissions and pin-internal findings carried from the parts (not contradictions)

- S1 — 01:35 names only `workflow_execute`; `pi@b27829e6dfa7:src/index.ts:2880-2881` (`workflow_detached`) also sends `grants:[]` with an optional claude backend; `:2640` registers the workbench tools only when `workflowAgentBackend === "claude"`, so every registered detached launch is a claude-backend launch. Under-statement of C0200/C0205 (absorbed into KU12).
- S2 — 01:43 lists cwd/model/permissions/tools/roles/grants/principal; the pinned `replayBasis` also contains `settings` (settingSources names). Under-statement of C0218 (M018).
- S3 — `pi@b27829e6dfa7:src/workflow/tool-description.ts:81` still advertises `isolation?: 'worktree'` for workflow `agent()` while `claude-host.ts:188-189` refuses it. Pin-internal description/host mismatch adjacent to C0175; not a program-doc claim.
- S4 — the per-agent cancellation gap also exists on the resume path (absorbed into KU14).
- S5 — 01:3 names reports "2026-11-01 to 2026-11-03"; at the pin new-feedback/ also holds 2026-11-04 (2) and 2026-11-05 (1) files that postdate the baseline (none were in f67b6665). Temporal drift, not a contradiction (C0103 SUPPORTED).
- S6 — "git-census" (02:40, 03:10, SKILL:16) is not an identifier at the MW pin (absorbed into KU13).
- S7 — Ledger: claims-part-01 and claims-part-02 shared ids C0201..C0279 for different propositions; resolved in the merged ledger by renumbering part-02 to C0501..C0599 (`original_id` retained; dossiers for g02 keep their `.g02.md` names).
- S8 — lens-negative row 46 counted the program commit as "6 files, all .md"; `git show --stat 7c80c343` lists 10 files (5 program docs, the SKILL, AGENTS.md, README.md, docs/workbench/07-native-integrations.md, docs/workbench/README.md), all Markdown. The docs-only conclusion stands; the count in that lens row is wrong (noted on C0409).
