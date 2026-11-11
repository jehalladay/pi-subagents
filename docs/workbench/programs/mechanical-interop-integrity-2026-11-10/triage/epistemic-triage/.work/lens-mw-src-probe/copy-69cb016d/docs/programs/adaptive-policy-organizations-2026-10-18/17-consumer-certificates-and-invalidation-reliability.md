# 17 — Consumer-sufficient certificates and invalidation reliability (M1l design bridge)

**Status:** design/research linkage only; no native MechanicalWorkflows runtime changes are claimed. Extends the existing `16-certified-partial-persistence-bridge.md` by referencing the proved CPP-6/7/8 finite models in `jehalladay/research/programs/compositional-coordination-intelligence/10–13`.

## Integration responsibilities

MechanicalWorkflows remains responsible for typed application-level consumer contracts and determining which external source revisions, effects, and admission decisions are observable. The finite Moore quotient is a *pure* consumer-interface compression reference: it does not issue signed certificates, reveal external hidden state, or authorize effects. A valid practical artifact must retain its immutable source identity, complete dependency scope, current environment revision, proof/verifier reference, native effect discharge information, and typed consumer compatibility **in addition to** any compact semantic class payload.

## Suggested bounded design gates

1. **Explicit contract capture:** partition consumer-visible values, rejection/admission, effect receipts and allowed action traces; incomplete source facts produce UNKNOWN rather than an optimistic equivalence class.
2. **Source-owned authentication:** verify a receipt through the actual authoritative adapter and record its version/scope; do not treat MicroPolicyCLI fixture classes or synthetic graphs as trusted evidence.
3. **Sound quarantine:** compute opaque descendant closure on a revision change; mark all affected artifacts unusable until native revalidation or recomputation. A policy critic's causal score is not an admissibility override.
4. **Semantic revalidation:** when an independently verified consumer-relative equivalence proof exists, a quarantined artifact can be recertified without rebuilding, provided effect obligations are already discharged and producer/successor checkpoint changes do not alter observed semantics.
5. **Snapshot publication:** retain prior source-owned outcome IDs; stage proofs and replacements; publish a coherent snapshot atomically only after all demanded dependency scopes are valid.
6. **Risk reporting:** estimate expected one-wave quarantine from independent source revocation risks, or use the distribution-free union bound when correlations are unknown. Do not treat the numerical risk calculation as permission to skip mandatory source checks.
7. **Dynamic hazards:** model recurring invalidation as a proper Markov repair process only when a valid state abstraction exists; the global reset formula demonstrates that constant hazard can destroy persistence scaling.

## Falsification and acceptance

Include at least: two states with same current output but divergent permitted future actions; incomplete toolchain dependency; native non-idempotent effect requiring new execution; forged/tampered receipt; different worker hidden states; correlated source invalidations invalidating the independent product law; source revision race between validation and publication; and global-reset hazard versus localized invalidation. Verify native receipts and authorization only through original source systems. Use local/Forge gates, not new GitHub CI.

No new orchestration runtime, policy graph engine or cross-SDK dependency is introduced. Mechanistic algorithms remain in MechanicalWorkflows, mathematical proofs in the research repo, pure numeric reference in MicroPolicyCLI.

## Stochastic consumer abstraction note

[CPP-9a/9b](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/14-probabilistic-bisimulation-and-interface-complexity.md) proves a sound finite probabilistic bisimulation quotient preserving contracted class-policy Bellman values, and gives a counterexample to claiming bisimulation is minimal for trace-only observation. A future MechanicalWorkflows adapter can use verified stochastic equivalence only if the declared consumer interface, legal action support, conditional transition law, source revisions, native effect receipts and authorization gates are all covered. [MicroPolicyCLI M1l](https://github.com/jehalladay/MicroPolicyCli/blob/main/docs/INDEPENDENT_M1L.md) does not perform native validation. Design only.
