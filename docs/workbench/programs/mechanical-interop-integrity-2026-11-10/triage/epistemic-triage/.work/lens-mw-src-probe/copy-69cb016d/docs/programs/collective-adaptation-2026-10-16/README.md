# Composable Coordination Harnesses and Colony Experiments

**Program:** 2026-10-16 · **Status:** proposed/additive design; the six policy combinators are implemented in packages/coordination (sequential, parallel, guarded, alternative, inhibit, repeated); the remainder of this program's implementation is not claimed · **Target:** jehalladay/MechanicalWorkflows `main`

Compose small reactive coordination policies into task allocation, context handoff, evidence acquisition, integration and resilience behaviors with comparable deterministic, replay and live harnesses.

**Baseline:** The current typed `develop()` library and development rig have bounded Claude Agent SDK, Forge, Furnace and RF journeys; the repo explicitly is NOT an engine, scheduler, state database, or generalized tool ABI. HX-scoped swarm and production multi-host experiments remain unproven.

**Ownership:** application-owned policy-composition contracts and adapters; deterministic coordination simulation; isolated live harness experiments; test fixtures; environment and rollout export.

**Explicit non-goals:** a new engine, global scheduler, event database, inference provider, task tracker, or replacement for Furnace/Beads/RF/Forge.

## Developer documents

1. [01 Requirements](01-requirements.md) — numbered, acceptance-oriented requirements and boundaries.
2. [02 Architecture](02-architecture.md) — data model, native adapters, interfaces and operational design.
3. [03 Formal semantics](03-formal-semantics.md) — equations, assumptions and policy/credit invariants.
4. [04 Implementation plan](04-implementation-plan.md) — dependency-aware milestones and deliverables.
5. [05 QA and acceptance](05-qa-and-acceptance.md) — automated gates, experiments, counterexamples and release rules.

## Cross-ecosystem specifications

- [06 Coordination policy algebra](06-coordination-policy-algebra.md) — typed intents, composition, conflicts and protected effect boundaries.
- [07 Colony training environments](07-colony-training-environments.md) — simulation/replay/live, five environments, RL comparisons and evaluation.
- [08 Ecosystem implementation index](08-ecosystem-implementation-index.md) — links, ownership and dependency-ordered program across 13 repositories.

## Program-wide decisions

No new authoritative task store, build verdict, environment graph, inference transport or workflow scheduler. Preserve native SDK contracts and unknown/partial evidence. TrailCLI and QuorumCLI do not yet have repositories: **do not implement their service internals here**; use opt-in boundary contracts and honest unavailability. Authorization and deterministic verification remain outside learned policy control. This is design work: no code/tests are asserted implemented.

## Related work

[training](https://github.com/jehalladay/training) (multilevel credit), [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows) (harness), [MechanicalFiberRuntime](https://github.com/jehalladay/MechanicalFiberRuntime) (semantic reference), [ReactiveFiberCLI](https://github.com/jehalladay/ReactiveFiberCLI) (reactive context). Inspect each installed SDK/version before implementation; these documents cannot certify its deployed behavior.
