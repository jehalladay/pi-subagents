# 15 — Source baseline, research derivation and references

## Current application source (origin/main c07f2823b1a5, fetched 2026-10-19T02:05Z; program pinned at 19ca8d4)
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/contracts.ts
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/combinators.ts
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/resolver.ts
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/episode.ts
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/training-export.ts
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/elastic-landing.ts

## Neighbor source/owner
- https://github.com/jehalladay/MicroPolicyCli — current M0/M1a/M1b/M1c reference implementations and design
- https://github.com/jehalladay/ReactiveQuerySDK/blob/main/docs/program/03-formal-semantics.md — evidence completeness/negative dependency (design)
- https://github.com/jehalladay/FiberOpticsResearch/tree/main/docs/research/foa/programs/adaptive-computation-and-control-2026-10-17 — host controller and timing semantics
- https://github.com/jehalladay/MechanicalFiberRuntime — OCaml reconciliation reference
- https://github.com/jehalladay/research — cross-domain proofs, oracle, falsifiable research and bibliography. Theorem files obtained and pinned at revision 0e0b10ac7894cb18bfb99fdcc62085b056bd2946: programs/adaptive-organizational-compositionality/01-finite-semantics.md (finite kernel semantics and the strong controlled-lumpability statement) and programs/adaptive-organizational-compositionality/12-proof-obligations.md (T1 finite kernel composition, T2 controlled lumpability — statements under 'Establish first', not completed proofs at this pin).

## Independent research
Probabilistic bisimulation and controlled lumpability; Lack and Sobocinski adhesive categories; Stochastic Computation Graphs (Schulman et al.); COMA Foerster et al.; MAPPO; Dobrushin locality (Faizal, Ozdaglar, Wainwright ICML 2026); Lyapunov drift-plus-penalty (Neely); adaptive categorical policy training; causal state abstraction (Wang et al. AAAI 2024). For source links and detailed transfer limits see research program 13-related-work.md.

## Ownership note
The cross-ecosystem corpus is a proposal, not a claim that connected systems share a common installed SDK. Do not introduce imports merely because literature draws a conceptual analogy.

## Evaluation harness source (same pin)
- https://github.com/jehalladay/MechanicalWorkflows/blob/19ca8d481ab48c69fdf4f457ded66fe90592dd2f/packages/coordination/src/evaluation.ts — the CompositionTree compiler and budget-matched fixture evaluation harness named in 12 and 19; listed after the research entry so the fixed-line pins in packages/coordination/test/apo-doc-pins.test.ts keep their line numbers.
