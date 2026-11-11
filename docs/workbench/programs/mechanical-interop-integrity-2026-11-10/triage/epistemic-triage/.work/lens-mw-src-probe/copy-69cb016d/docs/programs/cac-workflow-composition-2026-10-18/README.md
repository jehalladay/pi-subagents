# CAC Workflow Composition and Assurance — MechanicalWorkflows

**Design-only as of 2026-10-18 (19ca8d4): the two program documents are the only artifacts; P2–P4 plan adapter code and live runs.** MechanicalWorkflows is a family of composable workflow libraries and applications, not a workflow engine/scheduler, Beads status store, Forge verifier or new CAC runtime (it does ship an optional Furnace executor host adapter: apps/development-rig/src/furnace-process-executor.ts and furnace-app.ts, witnessed 2026-10-15).

## Purpose

Integrate the [Compositional Autonomous Computation](https://github.com/jehalladay/research/tree/130e21b7a8f736263643967cf6f4eb579dcb1258/programs/compositional-autonomous-computation) capability contract (repo pinned main as read 2026-10-19; the program URL was unreachable for content on 2026-10-18 — readable drafts: jehalladay/Library docs/theory/compositional-autonomous-computation @ff9a8e1, hand-derived, not Lean-checked; a reading citation, not a code dependency) with existing MechanicalWorkflows composition patterns, which may allow ordinary workflows to carry source-native evidence references (the rig already carries Git basis and Forge operation ids); soundness of authority/effect assumptions is hand-derived only for the finite sequential fragment (CAC 0.1–0.3 drafts) and open for dynamic authority versions. No umbrella engine is introduced.

## Program

[01 Contract, implementation and testing](01-composition-contracts.md).

## Boundaries

- MechanicalWorkflows is in the Mechanical ecosystem (the term is defined by the external CAC ecosystem map in the research repository's program, pinned above; no in-repo definition exists); no automatic membership in Reactive Fiber. RF participation is opt-in through the explicit rf-context adapter (--context-mode rf).
- Source authorities: Beads work readiness; Forge build gate; Furnace attempts; Git revisions; Reactive Fiber context projections only through the explicit rf-context adapter (verified model capability; the render must contain the task and the caller-supplied source revision). HyperUnix task-scope answers and agent-session references, which the rig already emits (live-observation.ts NativeSystem hx; receipt.ts agent stage), are observations, not source authorities.
- Agent SDK or Pi designs may execute a step but do not retroactively establish source evidence (one bounded Claude Agent SDK step witnessed 2026-10-15 under CLI opt-in; no Pi adapter is wired at 19ca8d4).
- CAC contract metadata is an optional view, never a condition for any existing workflow.

## Status
As of 2026-10-18 (19ca8d4) these are interface/theorem research requirements, not a claim that source code was modified or native workflows were run.
