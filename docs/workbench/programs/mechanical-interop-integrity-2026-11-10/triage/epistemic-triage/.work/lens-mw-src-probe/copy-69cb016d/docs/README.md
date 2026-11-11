# MechanicalWorkflows — developer documentation

This corpus specifies the **smallest useful, independently deployable workflow-composition product**. It is written for implementation swarms and application authors, not as a universal workflow standard. The normative boundary: **ordinary functions are the programming model; product SDKs retain their authority; remote hosting is optional**.

## Reading map

1. [01 — Product goals and journeys](01-product-goals-and-user-journeys.md) — why this exists and exactly what users should accomplish.
2. [02 — Atomic requirements](02-atomic-requirements.md) — flat, falsifiable requirements; current versus target scope.
3. [03 — Architecture and package boundaries](03-architecture-and-package-boundaries.md) — ownership, dependencies, monorepo layout, modularity.
4. [04 — Public programming model](04-public-programming-model.md) — TypeScript application API, results, composition, extension.
5. [05 — Deployable entrypoints](05-deployable-entrypoints.md) — proposed metadata/invocation rules, with no new runtime.
6. [06 — SDK integration and hosts](06-sdk-integration-and-hosts.md) — Forge, Furnace, HX, RF, Beads, agents, adapter layering.
7. [07 — Identity, effects, recovery](07-identity-effects-and-recovery.md) — nested operations, restart/cancellation and honest uncertainty.
8. [08 — QA and conformance](08-qa-and-conformance.md) — fixture, live integration, fault and performance acceptance.
9. [09 — Flat implementation program](09-implementation-program.md) — independent work packages, no artificial serial roadmap.
10. [10 — Current state and gaps](10-current-state-and-gaps.md) — implementation evidence, known limitations, upstream dependencies.
11. [11 — Decisions and non-goals](11-decisions-and-non-goals.md) — settled architecture and scope guardrails.
12. [12 — Packaging and operations](12-packaging-and-operations.md) — Forge, monorepo, dependency hygiene, deployment profiles.

## Authority and evidence

- This repository owns **composition behavior**, application-local contracts, packaging metadata, executable reference journeys and integration findings. It does not own other products' APIs or lifecycle semantics.
- The external SDKs' shipped code/contracts are authoritative for actual invocation shapes. Design documents here cannot make an unimplemented method available.
- Each requirement is tagged `CURRENT` when it is addressed by committed files, `TARGET` when it remains a development objective, or `INTEGRATION` when live upstream behavior must be witnessed. The status ledger in [10](10-current-state-and-gaps.md) is the authoritative *current-project* implementation inventory.
- A green fixture run establishes only the local composition invariants explicitly exercised. It cannot establish a real Forge gate PASS, durable Furnace behavior, complete HX coverage, or a ReactiveFiber render.
- No GitHub CI. Forge is the primary gate; local Node tests and adversarial journeys feed Forge.
- Historical Library may be consulted, never installed or imported as a project dependency.

## Documentation change rule

When changing public contracts, update the schema/type, at least one positive case, at least one negative control, and the status ledger in one change. Do not write implementation plans claiming support that the current SDKs do not ship. Review the actual upstream SDK version before coding its integration.

13. [13 — Live Forge verification](13-live-forge-verification.md) — real public SDK gate, clean Git basis, and optional Furnace executor adapter.

14. [14 — Live single-writer development](14-live-single-writer-development.md) — opt-in Claude Agent SDK + Git candidate + native Forge gate; clearly labeled limitations.

15. [Adaptive Policy Organizations (2026-10-18)](programs/adaptive-policy-organizations-2026-10-18/README.md) — full additional design program for typed policy graphs, stochastic decision sidecars, sufficient subsystem interfaces, developmental rewriting, proofs and the MicroPolicy boundary; design only.
16. [15 — Code standards and the build system](15-code-standards-and-build-system.md) — aesthetic conventions, organization rules, the mechanical standards gate and Forge incremental selection.

16. [16 — GraphPolicy bead selection](16-graph-policy-bead-selection.md) — host work selection with shadow/canary GraphPolicyCLI advice over a host-enumerated support; witnessed 2026-10-21; no training yet.

## New coordinated interoperability program (2026-11-04)

[MechanicalWorkflows → Pi Workbench audit and design](programs/pi-workbench-interop-2026-11-04/README.md) covers the source-level contract mismatch, pinned artifact/function hosting, four application service bindings, source/effect safety, native evidence, cancellation, HX/RF acceptance and Furnace ownership. Paired Pi program: `jehalladay/pi-subagents/docs/workbench/programs/mechanical-workflows-interop-2026-11-04/`. It is design-only; no new live cross-repository conformance has been measured. The existing [current state](10-current-state-and-gaps.md) continues to distinguish achieved code from future milestones.

## Reconciled interop audit and delivery program (2026-11-06)

[Current Mechanical/Pi interop audit, host contract, implementation slices and feedback/QA](programs/pi-workbench-interoperability-audit-2026-11-06/README.md) supersedes the November 4 program **for current-state claims** (the original remains historical). The committed descriptor mismatch has been repaired; the first Pi function launch, active cancellation, and live joint acceptance are **not** shipped. Read `.agents/skills/mechanical-pi-host/SKILL.md` for implementation guidance.

## Native Mechanical function → Pi interoperability program (2026-11-09)

[Current source reconciliation, jointly versioned host protocol, independently landable Mechanical packets and test/fault/native-release tail](programs/pi-native-interoperability-2026-11-09/README.md). This is the first place to begin a new implementation cut; the November 4/6 records remain historical. No registered Pi function execution is claimed by the docs. The [paired Pi program](https://github.com/jehalladay/pi-subagents/tree/master/docs/programs/mechanical-native-interoperability-2026-11-09/) is independently actionable.
