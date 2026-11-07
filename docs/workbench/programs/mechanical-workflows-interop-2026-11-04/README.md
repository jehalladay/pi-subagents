# Pi Workbench ↔ MechanicalWorkflows: interoperable function hosting

**Status:** HISTORICAL DESIGN PROGRAM (2026-11-04), not an implementation or live acceptance receipt. For present-tense findings use the [2026-11-06 reconciled program](../mechanical-interoperability-audit-2026-11-06/README.md): Mechanical repaired its committed descriptor in `1f29daa7` and added a pre-dispatch-only AbortSignal in `f7c0a943`. Other source-bound claims below are dated; preserve this program for its original design, epistemic audit, requirements and TDD evidence.
**Audit baseline (2026-11-04):** pi-subagents `master` `f67b6665a132dbb0e86aea48cf36cf6ae0412521`; MechanicalWorkflows `main` `0c78e2530cbf5737a8bbb763475385a2f0f760cc`.
**Scope:** the Pi host half of one coordinated cross-repository program. The MechanicalWorkflows half is under `MechanicalWorkflows/docs/programs/pi-workbench-interop-2026-11-04/`.

This program continues W11/VC-3 from [feature-matrix](../../feature-matrix.md) and [implementation program](../../15-implementation-program.md). It does **not** relabel W11 as completed. The audit inventories installed code and recorded evidence only; no new test, live integration, Forge gate or benchmark ran in preparation for these docs. Do not infer executable support from proposed types, commands, or examples.

## Reading order

1. [01 — Source-grounded audit](01-audit-and-evidence.md): both systems, actionable defects, evidence grades and audit blind spots.
2. [02 — Host architecture and protocol](02-host-architecture-and-protocol.md): executable function contract, responsibilities and source/effect safety.
3. [03 — Implementation and QA](03-implementation-and-qa.md): independently landable verticals, tests, real producer witnesses and gates.
4. [04 — Agent handoff and operational guidance](04-agent-handoff.md): exactly how agents should investigate, implement and report each cut.
5. [Project skill](../../../../.agents/skills/pi-mechanical-interop/SKILL.md): context-efficient workflow for agents developing this seam.

## Hard boundaries

- Pi hosts invocation, launch, observation and explicitly authorized controls. It does not become a workflow scheduler, Beads authority, Forge verifier, Furnace replica or dependency of MechanicalWorkflows.
- MechanicalWorkflows retains ordinary typed function composition; application-owned services are callbacks, **not** a universal tool ABI. No new obligatory DSL/registry.
- Claude Agent SDK owns agent sessions. Forge owns native gate results and evidence. Furnace owns durable Run/Work/Attempt and retry decisions. HX owns coverage and source query basis. RF owns render provenance. Beads owns readiness.
- A successful function return is not a Forge PASS; a displayed result is not current native evidence; a read-only RF preview is not a committed task-grounded render.
- Every ability to write/dispatch must have explicit host-side authorization and recoverable native references. Never silently retry an ambiguous effect.
- No GitHub CI; use Forge for the primary gate, with test evidence, negative controls and per-cut receipts. Do not append to the historical `TRACEABILITY.md`.
