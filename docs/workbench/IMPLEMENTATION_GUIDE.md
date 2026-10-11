# Implementation agent directive

## Read first, before writing code

README.md -> 00-current-state-and-source-map.md -> 02-atomic-requirements.md -> 03-architecture-and-ownership.md -> 15-implementation-program.md. Then read the specific subsystem spec and native SDK source. Treat all proposed node signatures as *not implemented* until confirmed by checked-out installed versions.

## Product requirement

This fork must remain a usable Pi extension. Pi is the interactive workflow designer/observer/operator. Its Claude-compatible workflow agent() calls must execute via the real Claude Agent SDK in Workbench mode. SDK-backed node() calls must use host-side native ecosystem providers, including MechanicalWorkflows ordinary functions and Forge/Furnace/HX/RF where actually available. Rich terminal inspection must remain cheap for large swarms.

## Implementation rules

1. Preserve upstream history and MIT attribution. No blanket rewrite/deletion of Pi subagent functionality.
2. Use Forge as build/test interface; no GitHub CI and no Library dependency.
3. Verify exact SDK versions and APIs from source before calling methods. Unsupported method => explicit blocker and native product feedback, not invented shim.
4. Maintain legacy saved scripts and golden compatibility tests; first cut must support real Claude SDK execution without script edits.
5. No generic durable scheduler, hidden Furnace state-machine imitation, universal asTools(), or fake provider PASS.
6. Native provider results retain source basis, identities, evidence, partial/unknown and transport/domain distinctions.
7. No automatic retry of ambiguous external effects. Agent session resume and workflow replay are separate problems.
8. UI projections are source-labeled observations, not authoritative state. Render only visible/changed nodes. Pi tools deliver bounded structured results.
9. Add adverse/negative tests for each semantic guarantee. Report actual command/environment evidence.
10. Keep a status ledger with shipped/fixture/experimental/blocked; don't conflate documentation with implementation.

## First sprint: VC-1

Baseline: identify exact fork SHA and run existing tests. Add ClaudeWorkflowHost behind explicit Workbench selection, translate native SDK sessions/results into existing WorkflowHost contract, register Pi workflow control/observe, retain upstream GUI and script examples. Produce real SDK proof, including a negative assertion that Pi createAgentSession/AgentManager is not used for workflow agent().

## Second sprint: VC-2

Add node() RPC and a versioned provider registry. Execute one real read-only HX query or a Forge SDK operation with a native evidence reference, policy gating, malformed input negative controls and NO effectful blind replay. Hook it into the existing workflow progress inspector.

## Subsequent sprints

Incremental native observers -> terminal multi-view UI -> MechanicalWorkflows live bindings -> external Furnace attachment -> designer comparison -> optional independent host. Do not block early working cuts on full system completeness.

## Deliverable discipline

Every commit implementing functionality updates corresponding docs with exact tested status, logs/artifacts, links to upstream blockers, and scope of remaining gaps. Direct pushes may be used; PR/CI workflows are not assumed.