# 03 — Pi implementation packets: ordered and independently reviewable
**Every packet:** inspect exact current sources/Beads first; write a red behavior test and its negative mutant; implement minimal change; run focused suites and applicable local Forge full gate; capture command/exit/digest/native receipts; update docs/skills and actual status in the SAME implementation cut. The following IDs are planning labels, not Beads IDs. No GitHub CI or invented passing gates.

## Dependency graph
~~~text
P00 source pins/ABI decision
  +-> P01 canonical function input -------+
  +-> P02 durable lease/fencing ----------+--> P04 composed admission --> P05 registered function launcher
  +-> P03 exact grant/source authority ----+             |                     |
  +-> P06 observation contract [parallel] -+-------------+---------------------+--> P07 journal/control/reconcile
  Mechanical H01/H02/H03 host, native proof, services --------------------------------+--> P08 joined native journey
  P08 --> P09 fault/restart/soak --> P10 release/docs/skills
  Optional P11 detached/Furnace; P12 HX/RF/read-only functions, separately gated
~~~

### P00 — Re-pin and jointly ratify v1 (P0)
**Inspect:** src/index.ts, src/workbench/execute*, mechanical-descriptor, function-authority, source-admission, observation, Pi W11, paired Mechanical host.ts/host-binding.ts/host-services.ts.
**Implement:** signed-off literal descriptor ID/version, exact action grant mechanical:develop-write, canonical input rule, first host mode, profile set, versioned test vectors; record both source SHAs, installed Node/SDK identity. Do not confuse a proposed v1 contract with enabled function support.
**Red tests:** incompatible schema or spelling; unadopted grant; producer/consumer disagree on canonical JSON bytes. **Done:** two repos reference identical compatibility matrix; unknown versions fail closed.

### P01 — Canonical admitted function payload (P0)
**Change:** src/workbench/execute.ts, execute-tool.ts, identity.ts as needed; do NOT alter script execution semantics.
**Implement:** normalized immutable function request returned by admission, digest computed over exactly dispatched payload; protective handling of Beads notes, getter/cycle/prototype edge cases, UTF-8/depth budgets.
**Red tests:** raw-vs-canonical divergence; poisoned note getter; note-only changes never affect function identity; typed source/basis changes DO affect identity; a test launcher receives canonical bytes only.
**Done:** callback input deep-equals admitted payload and hashes to stored inputDigest; no leaking note bytes.

### P02 — Invocation-owned, durable writer lease and fencing (P0)
**Change:** src/workbench/source-admission.ts (retain pure checks), new host lease/ownership adapter under src/workbench/ and tests; journal storage explicit.
**Implement:** lease persists after launch return, cross-process same-machine exclusivity, stale-owner fencing, recovery-held state; remove lease release from launch-return lifetime for function workflows. Keep existing script helper behavior unless requalified.
**Red tests:** launch resolves while writer sleeps, second root alias refused; distinct roots allowed; crash/restart leaves uncertain lease; failed pre-dispatch safely releases; stale generation cannot write; lease is not freed by timeout only.
**Done:** no duplicate concurrent writer on supported host topology and exact persisted owner is observable.

### P03 — Joint final-boundary authority/source recheck (P0)
**Change:** function-authority.ts adoption and source-admission host composition; maintain model input/host separation.
**Implement:** exact workbench:execute + mechanical:develop-write, host-only effective principal/session, source Git HEAD/tree/clean/Forge manifest, operator attestation and authorized root; repeat after async install/wait and immediately at effect dispatch, bound to active fence.
**Red tests:** revoked action grant, changed principal, source changed during install, moved worktree symlink, changed manifest, wrong workspace/identity, extra action permission, user-provided fake grant, machine PID race.
**Done:** first effect cannot occur with any stale mutable authority axis.

### P04 — Reviewed installed host consumer (P0; MW H01/H02)
**Change:** native loader seam/host adapter and package dependencies, no private imports.
**Implement:** exact descriptor/installed package/runtime manifest checks; import @mechanical/development-rig/host only from reviewed installed artifact; reject disallowed exports and missing callback binding; don't construct a second Mechanical scheduler.
**Red tests:** corrupt descriptor/tarball, alternate export, installed JS mutation, path/symlink escapes, unexpected function, missing SDK, incompatible Node version.
**Done:** independently packed fixture and negative controls pass V2; actual MW producer host runs exact four callbacks.

### P05 — Actual registered workflow_execute(kind=function) (P0; P01–P04)
**Change:** src/workbench/execute-tool.ts; src/index.ts registration; logic isolated from script launcher.
**Implement:** one allowlisted function branch with A0–A6 admission, resource reservation and durable launch; precise launch reply (never false completion); preserve script, detached provider grant and standalone subagent paths. No shell/script alias.
**Red tests:** invoke the actual registered Pi tool, assert Mechanical function callback reached exactly once; absent grant -> zero callbacks; function refuses if not reviewed; first successful launch returns invocation+native refs while worker continues.
**Done:** V3 recorded through Pi registration, not a direct host-helper call.

### P06 — Producer-qualified observation bridge (P0; parallel with P04)
**Change:** src/workbench/observation.ts and native adapter; workflow_observe tool, scoped event journal.
**Implement:** native refs + Pi invocation correlation; typed stages and raw Mechanical four domain results; strict/weak/unknown gate assurance; bounds/drop/freshness semantics. No results invented when provider missing.
**Red tests:** out-of-order/gap, duplicate native event, collapsed verification_failed vs indeterminate, blank native id, wrong scope, truncation, failed progress observer, native record unavailable.
**Done:** user can inspect status, evidence origin and uncertainty without needing Mechanical private API access.

### P07 — Durable invocation journal, controls and reconciliation (P0; P02/P05/P06)
**Change:** workflow_control/workflow_reconcile adapters, host journal and lease state; integrate Mechanical effect-intent lookup.
**Implement:** append-only idempotent event ids; pre- vs post-dispatch cancellation distinction; native lookup and no-blind-retry; reattach same invocation to still-running native producers; operator action for unknown.
**Red tests:** kill after intent but before SDK, kill after first edit, after commit, before/after gate dispatch, lost ack, double stop, late events, corrupted journal, start/recovery race.
**Done:** no unknown effect is replayed just because Pi restarted, and writer lease stays fenced until justified.

### P08 — Genuine native acceptance (P0; P05–P07 and Mechanical host native closure)
**Change:** integration harness using installed packages and native services; opt-in credentials; exact environment proof.
**Run:** actual Pi tool → Mechanical host → Claude session edit/commit → strict matching Forge full gate → Pi observation of source/digest/native ids. Include verified_candidate, verification_failed, needs_evidence and indeterminate semantics across deterministic fixtures; real verified case uses native evidence only.
**Done:** independently inspectable V4 receipt with exact SHAs and commands; no simulated PASS accepted.

### P09 — Fault, restart, load and falsification tail (P0)
**Change:** tests for G01–G12 and Pi-specific P-cases, process-kill harness, soak instrumentation.
**Run:** negative controls, red mutants, cross-PID writer exclusion, stale fence rejection, event ordering, resource caps, 1/4/16 concurrent invocations; measure cold vs warm load, memory, process count, failure recovery.
**Done:** V5 receipts and no duplicate side effect under all tested failure windows. State untested host topologies explicitly.

### P10 — Release and skill/docs/operator completion (P0)
**Change:** docs/workbench/feature-matrix.md W11, docs/workbench/*, README, AGENTS.md, .agents/skills/pi-mechanical-interop/SKILL.md, sample invocation/observe/control transcripts.
**Done:** shipped/unshipped rows match actual evidence; user-visible statuses and explanations truthful; exact first-release limitations recorded. Preserve older receipts as history.

### P11 — Optional detached function and Furnace ownership (P2)
Only after P10: first-class detached host binding, independent resource and auth proof, durable Furnace Run/Attempt when explicitly configured. No implicit Furnace dependency or shared fake invocation identity.

### P12 — Optional HX/RF and additional pure function families (P2)
Require independent HX task-scope and committed RF witnesses. Review/repair functions and pure coordination operations receive separate reviewed IDs, effect classes and grants; never inherit development-write automatically.

## Packet closure receipt schema
Record: packet label, real bead id if any, repo + full commit + parent, source paths/diffs, test/mutant fixtures, command/exit/duration, Forge gate request/operation, native producer refs, SHA-256 of installed artifacts and relevant source, outstanding uncertainties, before/after capability matrix, docs/skills changes. Do not mark planned evidence as a pass.
