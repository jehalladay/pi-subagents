# Adaptive Policy Organizations — design and developer program

Date: 2026-10-18. Status: accepted design direction (author self-declared; no independent reviewer recorded); documentation only. No policy-graph compiler, developmental rewrite implementation, Lean proof or production collective is claimed here.

## Mission
Extend the existing pure MechanicalWorkflows coordination package to compose optional numerical MicroPolicy decisions, expose sufficient typed subsystem boundaries, safely produce candidate organization rewrites, and evaluate adaptations against independently verifiable outcomes. Preserve ordinary functions as the public programming model and native effect authorities.

## Reading map
- [01 Product and decisions](01-vision-decisions.md)
- [02 Atomic requirements](02-atomic-requirements.md)
- [03 Formal operational model](03-operational-semantics.md)
- [04 Architecture and ownership](04-hld-ownership.md)
- [05 Low-level graph and evaluator](05-graph-lld.md)
- [06 Interfaces and abstraction contracts](06-subsystem-interfaces.md)
- [07 Developmental rewrites and publication](07-rewrite-lifecycle.md)
- [08 Numerical-policy and episode bridge](08-micropolicy-adapter.md)
- [09 Control, evidence and resources](09-resource-evidence-control.md)
- [10 Training, credit and harnesses](10-training-experiments.md)
- [11 QA, threat model and observability](11-qa-threat-model.md)
- [12 Staged implementation and gates](12-delivery-stages.md)
- [13 ADRs, alternatives and migration](13-adrs-migration.md)
- [14 Worked merge-lane scenarios](14-worked-example.md)
- [15 Research provenance and traceability](15-source-and-research-map.md)

The cross-repo mathematical inquiry lives at [research/programs/adaptive-organizational-compositionality](https://github.com/jehalladay/research/tree/main/programs/adaptive-organizational-compositionality), especially its theorem obligations and exact finite reference exercises. This documentation settles *design ownership and acceptance criteria*, not unproven mathematical conjectures.

## Source reality
packages/coordination currently has typed Policy.propose, combinators, reconcile, fixtures, episode export and replay, and a CompositionTree compiler over the same combinators (packages/coordination/src/evaluation.ts treeConfiguration L347). These remain the starting point; no new centralized runtime. MicroPolicyCli at 9d51a8c6ed08 (2026-10-19T00:41Z, README L5-L59; local checkout commit, not yet on the public remote, whose main is 69cdf79577a9) ships initial categorical sampling and local REINFORCE, plus M1a/M1b reference tooling; its optional Handwired integration is not asserted end-to-end passed. ReactiveQuerySDK remains design-only for evidence computations. All illustrative APIs here are TARGET unless explicitly labeled CURRENT (CURRENT = at 19ca8d4).

## Canonical authority
MechanicalWorkflows: application-local policy composition, manifest validation, fixture/harness and training-export sidecars. MicroPolicyCli: numerical inference, score sampling, parameter training/checkpoints; MP owns checkpoint parameter remapping across rewrites (TARGET API) while MW emits only the named semantic map. ReactiveFiber ecosystem: observations and updates. Forge/Furnace/Beads/Git: real authority and receipts. Existing MechanicalFiberRuntime: separate OCaml semantic owner. NO Library runtime dependency, no GitHub CI; use Forge and installed negative controls.


## Certified Partial Persistence research integration

[16 — CPP native-admission bridge](16-certified-partial-persistence-bridge.md) defines **target-only** typed certificate/validation/quarantine/publication contracts. The [mathematical proof program](https://github.com/jehalladay/research/tree/main/programs/compositional-coordination-intelligence) proves conditional safe reuse and expected repair-cost laws; [MicroPolicyCLI M1k](https://github.com/jehalladay/MicroPolicyCli/blob/main/docs/INDEPENDENT_M1K.md) offers pure synthetic validation fixtures. MechanicalWorkflows remains responsible for native admission and source-validity checks, not for numerical critic models or fabrication of external receipts. No adapter or native effect runtime is claimed implemented by this documentation change.


## Consumer-relative certificate and reliability extension

[17 — CPP-6/7/8 consumer certificates and invalidation reliability](17-consumer-certificates-and-invalidation-reliability.md) is a **design bridge** to [research theorem documents 10–13](https://github.com/jehalladay/research/tree/main/programs/compositional-coordination-intelligence) and the [MicroPolicyCLI M1l pure reference](https://github.com/jehalladay/MicroPolicyCli/blob/main/docs/INDEPENDENT_M1L.md). It preserves source-owned authentication, deterministic admission, snapshot publication and native effect boundaries; no new MechanicalWorkflows evaluator, validator, source receipt or production feature is asserted implemented.


## CPP-10 temporal repair admission

[18 — Source-validity uncertainty and temporal repair](18-cpp10-temporal-repair-admission.md) extends CPP-1–9 design to native source revisions, uncertain validity, deterministic verification/admission, linearizable snapshot publication, revocation/read fences and canonical effect identity. **Design obligations only**; no native implementation or verified proof is claimed.

## CPP-10 source-to-model audit (2026-10-19)

[19 — Refinement proof obligations](19-cpp10-refinement-proof-obligations.md) inspects `contracts.ts`, `resolver.ts`, `artifact-recovery.ts` and `evaluation.ts` as they actually exist. In particular, `reconcile` checks against the supplied basis and is **not** a native atomic publication fence. The source-authenticated CAS/current-read/effect-id premises of [CPP-10.12](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/19-cpp10-source-to-model-refinement.md) remain to be discharged against real adapters.

## CPP-10: first source-backed publication path

[20 — Real Git-content source refinement](20-cpp10-git-native-source-refinement.md) extends the [19 source-to-code audit](19-cpp10-refinement-proof-obligations.md) with `temporal-publication.ts` and an opt-in `GitBlobPublicationSource` using native `git update-ref --stdin` CAS. This applies **only** to Git blob bytes in a single current tree, with no effect obligations. Source-authenticated Forge/Beads/Furnace verdicts, all-current multi-source publication and Lean-checked refinement remain separate open obligations.
