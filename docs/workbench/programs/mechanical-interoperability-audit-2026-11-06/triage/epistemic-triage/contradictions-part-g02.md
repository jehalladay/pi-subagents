# Contradiction sets — group g02 (doc 02 feedback/epistemics reconciliation + doc 03 host contract)

Investigator g02, 2026-11-07. Pins: ARTIFACT/ENV pi@d7666a76f561; MW mw@97e18068f399 (program baseline); MW tip mw-tip@6e15a4245d3f (two docs-only commits past the pin, verified by `git diff --name-only`). Nothing was executed (not run). Claim ids below are the claims-part-02.jsonl ids; where an id is also used by another part (C1201-C1245 collide with part-01, C1301-C1331 with part-03) the part-02 proposition is meant.

Corpus defect carried forward (not a contradiction in the artifact): the Phase-1 claim-id space is not unique across parts (76 duplicated ids). Every g02 output row carries `part: claims-part-02.jsonl`; dossiers for colliding ids are named `<Cid>.g02.md` (the naming precedent the Nov-4 merged ledger used for its own part-02 collision), non-colliding ids keep `<Cid>.md`.

## KG02-N01 — Companion host contract cited at a baseline where it does not exist

Claims: C1262 (also README/doc-03 link claims of other groups)
Status: reconciled by version split (not CONTESTED); recorded as a pin/baseline defect of the artifact

### Evidence for the presupposition (companion exists)
- mw-tip@6e15a4245d3f docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md L3: "**Proposal only; do not treat names or types below as shipped APIs.** This adopts one vocabulary to resolve the November 4 Pi `profile` versus Mechanical `mode` proposal conflict (KU10);"
- mw-tip commit: "2ea6944561fa04f8b7d7c3570221232aeed7ce6e 2026-11-06 17:45:07 -0800 James Halladay docs(interop): reconcile Pi function host audit, feedback and delivery program"

### Evidence against (at the program's own stated baseline)
- pi@d7666a76f561 README.md L3: "Baseline: Pi `master` at `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`; MechanicalWorkflows `main` at `97e18068f3996d9a3faf242c089691b049ed04ac`. Re-pin before implementation."
- mw@97e18068f399 `git ls-tree --name-only 97e18068 docs/programs/` lists eight directories and no `pi-workbench-interoperability-audit-2026-11-06`.
- pi@d7666a76f561 03-function-host-contract.md L3 links `.../blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md` (moving ref, no pin).

### Reconciliation attempts
- version split: true at mw-tip 6e15a424 (seven minutes before the Pi commit, same author), false at the stated baseline 97e18068. Reconciles.
- provenance: the companion is the same authorial lineage, so even at the tip it is a counterpart to align with, not independent adoption or corroboration.

### What would settle it
A re-pinned README baseline naming 6e15a4245d3f (or later) for MechanicalWorkflows, or a pinned link in doc 03; and, for adoption, a conformance test or signed acceptance from both repositories (wb-w8fk / wb-0gbh).

## KG02-N02 — Doc 03 bans generic "profile"/"mode" aliases while the artifact's own surfaces and shipped MW code use the words

Claims: C1276, C1245 (narrowing), C1255
Status: reconciled by semantic split (ABI token vs prose; request-side selector vs result-side field); artifact consistency defect owed to wb-12x1 / wb-w8fk

### Evidence for the ban
- pi@d7666a76f561 03-function-host-contract.md L19: "Do not ship generic “profile” or “mode” aliases without both-repository ABI approval."
- Nov-4 CONTRADICTIONS.md L22: "| KU10 | `profile` (Pi doc) vs `mode` (MW doc) | KG02-03 | CONTESTED (two NON-EPISTEMIC proposals disagree) | pin: neither token shipped |"

### Evidence of generic words still live
- pi@d7666a76f561 docs/workbench/mechanical-function-hosting.md L17: "Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical."
- mw@97e18068f399 .agents/skills/mechanical-pi-host/SKILL.md L26: "6. Use Git-census mode first with explicit label; require real task-scope HX and committed RF evidence to graduate to native profile."
- mw@97e18068f399 apps/development-rig/src/live-development.ts L19-22: `export interface LiveDevelopmentResult { readonly mode: "live-claude-forge"; readonly discovery: "git-tracked-files"; readonly context: "plain-task-context" | "reactive-fiber";`

### Reconciliation attempts
- semantic split: the ban targets request-side ABI selector names; hosting.md:17 and MW SKILL:26 are prose, and the MW `mode` member is a result-side literal, not a selector with the KU10 value set. Reconciles, but the prose surfaces are exactly the "stale user-facing current guidance" C1255 orders updated, and the MW tip SKILL (6e15a424) is the place to check whether the wording moved.
- the request-side absence claim (C1245) stands; the result-side `mode` field must be named when the alias ban is implemented.

### What would settle it
A joint ABI ruling (wb-w8fk) naming the selectors and stating what happens to the MW result-side `mode` member; a hosting.md/SKILL wording pass.

## KG02-N03 — Execution-axis value set silently revised against the Nov-4 proposal

Claims: C1306 vs prior C0562 (Nov-4 02-host-architecture-and-protocol.md L62)
Status: reconciled by version split (two proposals, two days apart, same author); fidelity defect: the reconciliation program does not mark the change

### Evidence for C1306
- pi@d7666a76f561 03-function-host-contract.md L36: "- **Execution:** queued, running, settled, failed, unknown."

### Evidence for C0562
- Nov-4 CLAIMS.jsonl C0562 proposition: "The observation terminal is reported separately with executionStatus in {running, completed, failed, cancelled, unknown}, domainOutcome in {verified_candidate, verification_failed, needs_evidence, indeterminate} or absent, plus freshness, coverage, and producer/native references."

### Reconciliation attempts
- version split: both are NON-EPISTEMIC proposals; the later one supersedes. Reconciles as a design choice.
- fidelity: README L5 states the program "reconciles, rather than silently rewrites" the Nov-4 design; here a value set changed ('completed'/'cancelled' out, 'queued'/'settled' in) with no note, and 'cancelled' disappears from the execution axis while C1319 requires distinguishing three cancel kinds. supersedes_faithful=false on C1306 records the silence, not a misquotation.

### What would settle it
One sentence in doc 03 (or wb-9a1o's acceptance) naming the Nov-4 enumeration and the reason for the change, and stating where a cancelled execution is represented (execution axis or effects/freshness axes).

## KG02-N04 — "Update stale user-facing current guidance" vs feature-matrix.md:112 still false at the pin

Claims: C1255, C1239, C1237
Status: not a factual contradiction; an unmet norm at the artifact pin (remediation target wb-12x1)

### Evidence
- pi@d7666a76f561 docs/workbench/feature-matrix.md L112: "No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ('cheap mechanical stages') in src/workflow/tool-description.ts; no src/workbench module, no test file."
- pi@d7666a76f561 `grep -rli mechanical src/` -> src/workbench/collective-event.ts, src/workflow/tool-description.ts; collective-event.ts added by f65860e1 (2026-10-28).
- pi@d7666a76f561 `git show --stat d7666a76` lists 10 files; feature-matrix.md is not among them.
- pi@d7666a76f561 02-feedback-and-epistemics.md L33: "Update stale user-facing current guidance in this program and the skill; the dated prior audit remains provenance, not normative present state."
- Nov-4 C0457 (NON-EPISTEMIC): "Update docs, status matrix and this skill in the same code cut" — the status-matrix clause is not restated by C1255.

### Reconciliation attempts
- scope split: C1255's own scope is "this program and the skill"; feature-matrix.md is outside it. But SKILL.md L8 directs readers to "W11 in docs/workbench/feature-matrix.md", so the stale sentence is user-facing current guidance by the program's own routing.

### What would settle it
A commit amending feature-matrix.md:112 (and hosting.md:17 per KG02-N02), or an explicit statement that W11's matrix row is historical.

## KG02-N05 — Lifecycle norms stated imperatively while the motivating race is an unreproduced hypothesis

Claims: C1317, C1318 (norms) vs C1243 (HYPOTHESIS, SUPPORTED, unreproduced); doc 04:9 (other group) "code fix not claimed from hypothesis alone"
Status: reconciled (design target vs sequencing); no contradiction of fact

### Evidence
- pi@d7666a76f561 03-function-host-contract.md L47: "Before `beforeDispatch`, store pending per-agent abort state; after the async barrier, cancellation must prevent an SDK query."
- pi@d7666a76f561 02-feedback-and-epistemics.md L26: "per-agent `beforeDispatch` late launch is a **hypothesis**, not reproduced by this audit."
- pi@d7666a76f561 src/workbench/claude-host.ts L207, L220, L341-344 (controller registered after the awaited beforeDispatch; abortAgent aborts a registered controller only).
- .beads/issues.jsonl: wb-9v02 in_progress "[MWI-cancel-repro] Reproduce parked per-agent skip and retry before choosing a repair".

### Reconciliation attempts
- the norm is a contract target; the hypothesis status governs whether a code change may be claimed as a repair; wb-9v02 sequences the reproduction first. Reconciles.

### What would settle it
The wb-9v02 reproduction (park beforeDispatch, issue a per-agent skip/retry, release, assert zero SDK query() calls and a skipped settlement).

## KG02-N06 — "Dirty worktree remains recoverable" vs a committed test that asserts the lossy report

Claims: C1321, C1242 (g02); doc 04:35 "Never remove or weaken a safety test" (other group)
Status: conflict between a required contract and an existing characterization test; the Nov-4 BEAD-PLAN resolves it procedurally, the Nov-6 program does not restate the resolution

### Evidence
- pi@d7666a76f561 src/worktree.ts L176-180: `} catch { // Best effort cleanup on error  try { await removeWorktree(pi, cwd, worktree.path); } catch { /* ignore */ }  return { hasChanges: false }; }`
- pi@d7666a76f561 test/worktree.test.ts L432, L445-446: `it("reports no changes when the preservation commit fails", ...)` ... `expect(result.hasChanges).toBe(false); expect(result.branch).toBeUndefined();`
- Nov-4 BEAD-PLAN.md L8: "Never weaken or delete an existing safety test to fit code. Where an existing characterization test conflicts with a required contract (B-preserve), obtain an explicit specification ruling first;"
- pi@d7666a76f561 03-function-host-contract.md L47: "delayed SDK success and a dirty worktree remain observable and recoverable."

### Reconciliation attempts
- procedural: the characterization test is not a safety test; BEAD-PLAN:8 requires a specification ruling before changing it. Reconciles if wb-5ik5 carries that ruling.

### What would settle it
The specification ruling for B-preserve (wb-5ik5) that re-specifies the failed-preservation return value, then the test change and the code change in one cut.

## Scope notes (recorded, not contradictions)

- C1250 / C1327: "task-scope unsupported at hx 0.1.0" is the receipt's verdict for the find verb and the 84-capability roster; the receipt lists a workspace-defined named query carrying a task scope as NOT CLAIMED, so the version-wide reading is evidence-qualified (SUPPORTED), not plain.
- C1237: "read-only Mechanical event integration" is module-level (no src importer of collective-event.ts); the operational-path reading is not established.
- C1233 / C1235: the AbortSignal belongs to apps/development-rig (AgentOptions/LiveDevelopmentOptions), not to core develop() in packages/development.
- C1252: the beads the program binds work to still carry the Nov-4 pins (epic wb-1a3t: mw f7c0a943 / pi b27829e6), one MW commit before the program's stated baseline.
