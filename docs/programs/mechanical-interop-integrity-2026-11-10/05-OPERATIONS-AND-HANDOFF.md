# 05 — Agent/operator experience, documentation and Mechanical handoff
This file makes the Pi program independent to execute. It does NOT transfer implementation ownership of Mechanical code to Pi.

## Operator-facing contract and LX
Tool discovery/inspect MUST show one reviewed function, required grants and readiness conditions separately: descriptor available, runtime artifact admitted, effective permission, source eligible, writer availability, native provider available, strict gate profile. A disabled function explains why and which *host-owned* action could resolve it; no suggestion that model-supplied fields can grant permission.
The launch summary shows invocation ID, source commit, definition digest, host mode and launch-only status. The observation view shows independent rows for native session, candidate commit/tree, Forge gate, evidence strength, effect intent/reconciliation and last update. Never label a workflow SUCCESS because a launcher succeeded.
Controls: cancel requested vs cancel established; reattach; inspect worktree; reconcile read-only; release requires known-safe settlement; operator override explicit, audited and distinctly labelled. Provide reason-specific action help for SOURCE_CHANGED, GRANT_REVOKED, WRITER_HELD, NATIVE_EVIDENCE_MISSING and UNCERTAIN_EFFECT.

## Response shape illustration (proposal, not executed output)
~~~json
{
  "tool":"workflow_execute",
  "status":"launched",
  "completion":"not-asserted",
  "invocationId":"<host-minted>",
  "nativeRefs":[],
  "next":"workflow_observe on the same scoped invocation"
}
~~~
The corresponding observation retains original Mechanical four-way outcome as a typed field; separate launch, effect, verification and source-freshness dimensions. Empty nativeRefs is valid only when truthful, not a fabricated identifier.

## Skill and docs work in each code packet
- .agents/skills/pi-mechanical-interop/SKILL.md: begin here for the next program, explicit status *planned*, source pins/re-pin rule, red-first actual tool invocation, no false test claims; add usage idioms and diagnostic messages as observed.
- README.md / AGENTS.md: package tree, first-run preconditions, supported Node/SDKs, permissions, explicit external package pinned installation, debugging and replay process.
- docs/workbench/feature-matrix.md W11: separate existing primitives, true joined registered route, real native V4 proof, restart V5 and optional profiles; avoid importing historical workbench branch evidence as current main/master.
- docs/workbench security/operations/tool documents: canonical Beads note omission, exact action grant, effect-intent journal, writer fence, source basis/Forge assurance matrix, failed/stale/unknown semantics, repair paths.
- Existing script, standalone subagents and Furnace guides: note they are unchanged; do not advertise scripts as Mechanical function adapters.

## Mechanical producer handoff — exact blocking dependencies
H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding and exact immutable package/runtime manifest; reject malformed descriptors with typed errors.
H02: production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate; provider SDK/runtime identity pinned; no nested developLive within implement callback.
H03: strict verification evidence with candidate commit/tree, gate definition/hash, required environment and pass completeness; legacy-weak PASS never promoted.
H04: effect-intent and reconciliation report producer-native effects and bounded non-occurrence proof, no blind replay; durable file fsync checks.
H05: shared tests, installed host V2, registered Pi tool V3, native V4, recovery V5; exact owner and operation receipt.
Pi MUST NOT implement H01–H04 by copying Mechanical internal code. Mechanical MUST NOT depend on Pi packages to implement its own four domain functions.

## Adoption and sequencing
Each agent begins by inspecting current main/master and active branches, relevant feedback and Beads. A red test plus a negative mutant must accompany each new behavior. Use packet-specific commits and source-pinned receipts, no GitHub CI. Reconcile branch changes before landing; do not rewrite prior producer receipts or invent test runs. If a target cannot be validated, leave it pending with exact blocker, paths and next evidence requested.

## Supported first release / future variants
First: embedded same-machine Pi host, reviewed ordinary develop, Git census/plain context, single-writer runtime with cross-PID fence and native Forge evidence. Later: attached/detached variants, optional Furnace Run/Attempt, HX/RF and other Mechanical functions; each added independently with a new verified effect/capability profile. Design allows teams/swarms/fleets to orchestrate invocations, but does not make bead-machine or Furnace machinery a universal prerequisite.
