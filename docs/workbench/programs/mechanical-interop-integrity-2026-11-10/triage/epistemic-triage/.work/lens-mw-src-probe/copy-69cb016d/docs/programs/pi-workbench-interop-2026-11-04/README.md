# MechanicalWorkflows ↔ Pi Workflow Workbench: native function interoperability

**Status:** DESIGN/AUDIT PROGRAM ONLY; no implementation or new live cross-repository test in this commit.
**Source audit (2026-11-04):** MechanicalWorkflows `main` `0c78e2530cbf5737a8bbb763475385a2f0f760cc`; Pi `master` `f67b6665a132dbb0e86aea48cf36cf6ae0412521` (prior to the corresponding Pi design commit `7c80c34346c2e46b0f0201c3bf916274159c7cf7`).
**Paired program:** [Pi Workbench Mechanical interoperability](https://github.com/jehalladay/pi-subagents/tree/master/docs/workbench/programs/mechanical-workflows-interop-2026-11-04).

## Reading order

1. [01 — Source-grounded audit](01-audit-and-status.md): development core, installed host, live rig, coordination functions, provider boundaries and real gaps.
2. [02 — Application binding and packaged function contract](02-binding-and-packaging-contract.md): exact manifest, service adapters, effect and evidence semantics.
3. [03 — Implementation and conformance](03-implementation-and-conformance.md): work items, tests, negative controls, live acceptance and external producer dependencies.
4. [04 — Agent playbook and worked journeys](04-agent-playbook.md): implementation handoff, examples and operational run classification.
5. [Dedicated project skill](../../../.agents/skills/mechanical-pi-host/SKILL.md).

## Accepted architecture

MechanicalWorkflows is **ordinary typed functions** and pure coordination policies, not a scheduler, tool registry or Pi SDK. An application host provides callback dependencies, native producer SDKs and workspace ownership. Pi may host, observe and explicitly control a function invocation; Mechanical never depends on Pi to run. Furnace owns Run/Work/Attempt and retry policy; Forge owns build/gate proof; Beads owns work readiness; HyperUnix owns task coverage; ReactiveFiber owns render provenance; the Claude Agent SDK owns agent sessions. No Library dependency; no GitHub CI.

The first production-worthy cross-repo journey should use the existing, explicitly labeled Git-census development mode in a disposable single-writer workspace; it must not claim certified task-scoped HX. A later native HX+RF tier needs true producer witnesses. This plan does not create or modify source code, dependency graphs, tests or runtime capabilities; it records the implementation work required and the test oracles for closure.
