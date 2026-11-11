# MechanicalWorkflows → Pi Workbench: native function interoperability

**Date:** 2026-11-09. **Status:** proposed executable design and verification program; this document does not claim a landed Pi→Mechanical native function run. **Package owner:** MechanicalWorkflows. **Paired Pi program:** https://github.com/jehalladay/pi-subagents/tree/master/docs/programs/mechanical-native-interoperability-2026-11-09/

## Objective and definition of done

Deliver a separately installed, SHA-256-pinned Mechanical application-host entrypoint, callable through Pi's actual registered `workflow_execute` function path. The first supported journey is host-admitted one-writer Git tracked-file census + plain task context → Mechanical `develop(services, request)` → native Claude Agent SDK candidate commit/tree → matching native Forge full gate → Pi `workflow_observe` with uncollapsed domain, source, effect and provider status. The first live acceptance must be proven from the registered Pi path, not a direct `develop()` call, a shell command, a script workflow or an injected fake.

Do not make this library a scheduler, provider SDK wrapper, workflow DSL, agent fleet controller, generic tool registry or durable-state store. No Pi dependency in `@mechanical/workflows-development`; no Forge↔Furnace dependency; no Library dependency; no GitHub CI; use local Forge gates and producer-native receipts. Existing core code remains independently callable.

## Read in order

1. [01 — Current-source audit and architectural contract](01-AUDIT-AND-CONTRACT.md). Dated source facts, corrected old findings, authority/evidence boundaries, proposed stable ABI, outcome semantics and acceptance invariants.
2. [02 — Mechanical implementation packages](02-IMPLEMENTATION-PACKAGES.md). Independently landable, ordered work with source paths, dependencies, falsifiers, handoffs and skill/documentation obligations.
3. [03 — Test, fault-injection, native verification and release tail](03-VERIFICATION-AND-RELEASE.md). Deterministic conformance, installed producer/consumer smoke, native SDK journeys, negative controls, crash recovery, concurrency, cost, replay and final release criteria.

The corresponding Pi package contains its own complete local design and implementation packets; neither implementing agent needs a Library checkout or to reconstruct this plan from the other repository.

## Audit baseline and disposition (not live proof)

Mechanical `main`: `62a10b5924ccb10db428999cb148fa23f732e4fe`. Pi `master`: `8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164`. Re-pin both before the first code cut and again before a joint gate; concurrent agents may have advanced either branch.

| Boundary | Observed at audit pin | Required next |
| --- | --- | --- |
| Core composition | `packages/development/src/develop.ts` implements four injected callbacks and four outcomes | Preserve unchanged; add consumer-driven contract tests only |
| Descriptor/loader | Committed descriptor schema refs repaired; local SHA-256 pinned npm tarball test exists | Turn proven packaged host into a stable explicit rig-host export |
| Application adapter | `developLive` owns Git/Claude/Forge and historical bounded real producer journeys | Bind those services to an authorized Pi host invocation, not CLI flags |
| Uncertain effects | Typed post-dispatch abort/lost-ack, read-only reconciliation and replay identity slices present | Connect to Pi durable lifecycle and native effect reconciliation |
| Pi consumer | `workflow_execute` explicitly refuses `function`; separate descriptor/authority/source components exist | Registered function dispatcher, observation, first joined live receipt |
| Later native tiers | HX task scope not proven; RF committed-context adapter separately evolves | Opt-in producer-gated profiles, never a dependency of Git-census v1 |

**Corrections to the November 4/6 audits:** the descriptor mismatch is repaired; Pi's historical worktree destruction-on-preservation-failure path has a typed preserve-on-failure implementation; two registered detached Claude grant producers have explicit effective-grant wiring/tests; Pi Claude host rechecks abort after asynchronous before-dispatch; Mechanical now handles more post-dispatch uncertainty and identity. Old audits remain as dated provenance, not present-tense blocker lists. These changes are component-level, not proof of the joined function route.

> **Erratum (EAT-R028, M00-D, 2026-11-09; pin advance deferred to the owner).** The sentence "Pi Claude host rechecks abort after asynchronous before-dispatch" in the corrections paragraph above does not correct the November 4/6 audits. The whole-run recheck predates those audits (Pi 59da7d84, 2026-10-15); the audits reported the per-agent skip/retry race during the awaited beforeDispatch, not the absence of the whole-run recheck. Read the paragraph above as dated provenance. The owner decides the wording change and advances the pin.

> **Erratum (EAT-R029, M00-D, 2026-11-09; pin advance deferred to the owner).** The current state reads: the packed @mechanical/workflows-development library artifact is loaded by a local SHA-256-pinned test; the rig host itself is neither exported nor packaged. The table cell "Turn proven packaged host into a stable explicit rig-host export" above claims more than the pin shows. The owner decides the wording change and advances the pin.

## Release train and sequencing

- **Foundations (M0):** re-pin, measure current tests and artifacts, ratify one ABI/grant vocabulary, retain the fixed regressions.
- **Mechanical host (M1):** stable packed rig host export + pinned service binding + independently installed external consumer + safe source/effect records.
- **Registered joint lane (M2):** Pi's function admission/dispatch/observation calls this exact installed host. Prove positive and refusal paths, then one real Claude/Git/Forge journey.
- **Verification tail (M3):** adverse source/grant/manifest mutations, abort/crash/lost ack, all four outcomes, exact Forge proof, full local gates and clean external install, recovery, host-wide load, agent UX tests, docs/skills and honest release ledger.
- **Optional extensions (M4, separately gated):** HX task coverage, committed RF context, pure coordination, detached reattach and Furnace-owned Run/Work/Attempt.

## Non-negotiable invariants

- Pi's success launching a function never means Mechanical verified a candidate. Only matching native Forge evidence authorizes the `verified_candidate` projection.
- The initial `git-census-v1` is an explicitly limited application choice, not HX-certified task completeness; `plain-v1` is not an RF render. An RF preview is never committed RF evidence.
- Host owns principal, workspace, grants, admission and invocation lifetime. Application owns bound callback closures. The model/request cannot select arbitrary packages, exports, JavaScript modules, write grants or provider credentials.
- Unknown post-dispatch effect means uncertain and preserved; a stop request cannot roll back Git, Beads or Forge; do not blindly retry.
- Gate a named candidate source commit **and tree** under its gate definition. A PASS-shaped fixture, transport exit zero, incomplete gate selection, or stale gate is not a native PASS.
- Documents and skills must describe the exact code cut and test receipt; never upgrade a planned interface based on a doc merge alone.

## Program ancestry

Read, but do not clone, existing `docs/programs/pi-workbench-interop-2026-11-04/`, `pi-workbench-interoperability-audit-2026-11-06/`, `bead-machine-field-convergence-2026-11-07/`, `rfcli-feedback-adoption-2026-11-04/`, and Pi's 25-group EAT/Beads plan. Preserve their requirement identifiers and external native-evidence gates. This program is a reconciled delivery route, not a new competing requirements registry.

**Verification of this document commit:** source/design review only. No test, package install, Forge gate, native Claude/Forge call or registered Pi function execution was run to produce this design.
