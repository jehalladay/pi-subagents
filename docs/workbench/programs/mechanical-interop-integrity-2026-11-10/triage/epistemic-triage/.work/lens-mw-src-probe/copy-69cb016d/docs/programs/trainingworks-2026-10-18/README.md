# TrainingWorks Integration — Coordination Exercises and Policy Composition

**Status 2026-10-18: additive adapter design; no new implementation asserted.**

MechanicalWorkflows already has real, pure TypeScript coordination-policy combinators, five fixture environment families, versioned mw.episode.v1 records and mw.training-export.v1 exports. Preserve and build on these native contracts. This package remains ordinary composable workflow functions and policy composition; it is **not** a general RL gym, task scheduler or training backend. The boundary criterion for the opt-in step-level fixture below: step surfaces exist only over sources with real step semantics, and no generic environment registry, reward engine or scheduler is introduced.

[TrainingWorks developer program](https://github.com/jehalladay/TrainingWorks/tree/main/docs/programs/compositional-competency-learning-2026-10-18) (pinned main 826c9bb56bc1ae7e56f8d81ef7830b90859f52cf (committed 2026-10-18), read 2026-10-19 via git ls-remote; the repository requires credentials for content dereference) owns generic family generation, multi-view projections and transfer analysis. [Research](https://github.com/jehalladay/research/tree/main/programs/trainingworks-compositional-competency-transfer) (pinned main 130e21b7a8f736263643967cf6f4eb579dcb1258 (committed 2026-10-18), read 2026-10-19 via git ls-remote; same credential caveat) holds theorem work.

## Adapter responsibility
Export an optional source contract for the existing wrapped set — the five fixture families, the elastic variant, the decision-replay adapter and the comparative evaluation harness — do not rewrite them. Preserve role, policy/revision, proposed/admitted/rejected intents, log-probability fields as typed (the record types admit logProb number|'unknown'; at HEAD every native record's logProb is the literal 'unknown', so preservation of the known case is pass-through only and its positive control must be synthetic), initial/updated checkpoints, artifact/attempt lineage, fixture/replay/live distinctions and constrained source basis.

An opt-in step-level reference fixture can expose valid reset/step/observe/verify when the actual source supports it. At HEAD no in-repo source supports step semantics, so the step fixture is new surface rather than a wrap of existing engines, and it remains subject to the package boundary above. MW distinguishes fixture/replay evidence from native PASS; never advertise native PASS on fixture-only state. ('Fork' is TrainingWorks vocabulary, not an MW verification grade, and is not used here.) Keep pure scoring and native Forge/Furnace/Beads authority separate.

## Cross-program connection
This complements docs/programs/collective-adaptation-2026-10-16/ and its coordination calculus. The exported combinators (sequential, parallel, guarded, alternative, inhibit, repeated — packages/coordination/src/combinators.ts) form the starting point for composed exercise contracts: the five tree-composable combinators plus the `repeated` wrapper, which composes only as a wrapper and is excluded from composition trees. Global validation is mandatory and local policy success is insufficient; shared resource/effect resolution means what reconcile() implements at HEAD — scopes, budget, basis and protected scopes — while resolution of unknown dynamic effects is future work with no mechanism at HEAD.

## Delivery and acceptance
C0 import/export parity fixtures and negative controls for mode upgrade or missing logprob. The mode-upgrade control pre-exists; the missing-logprob negative control requires a new import/validation path, and export-side parity has no mw.training-export.v1 schema artifact to validate against — one must be added.
C1 one exercise family from existing landing queue or evidence quorum with independent reference state/oracle. The existing landing-queue/evidence-quorum oracles accept only the baseline policy pair, so a policy-generic independent oracle is new work within C1.
C2 multiple views from identical episode root and lineage-preserving transformations.
C3 substitute trained policy and compare deterministic baseline on held-out seeds and, separately, held-out families. Seed determinism and seed hold-out are implemented by the harness; family hold-out is possible in principle but unsupported by the harness at HEAD and requires new harness support.
C4 opt-in native isolated integration only after semantics/authority checks.

No new runtime dependencies, universal provider ABI, global event store, or GitHub CI. Forge remains the build gate.
