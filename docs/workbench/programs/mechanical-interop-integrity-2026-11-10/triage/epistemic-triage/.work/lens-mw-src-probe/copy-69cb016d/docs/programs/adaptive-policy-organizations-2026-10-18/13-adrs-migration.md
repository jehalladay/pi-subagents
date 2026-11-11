# 13 — Architectural decision records, alternatives and migration

A01 (accepted design): plain functions and existing Policy<O,I,M> remain primary; new graph manifest is additive.
A02: finite probabilistic labeled transition system with explicit scheduler is research oracle, not production runtime.
A03: MW coordination graph compiler; MP independent numerical training; no duplicate learner or effects.
A04: optional precomputed MP decision, keeping synchronous propose contract; no worker call in pure policy.
A05: split action support/sample, proposal, admission, execution, feedback.
A06: consumer-relative exact interfaces and advisory learned predictions separate; no global minimal summary assumption.
A07: private state CAS acknowledged separately from external native effects.
A08: typed restricted DPO-style rewrite, not general graph transform DSL; immutable candidate and CAS promotion.
A09: equivalence-preserving refactors and behavior-changing mutations have distinct gates.
A10: certificate scopes include implicit resource, time, source completeness and stochastic dependencies; local disconnected dataflow alone insufficient.
A11: first experiments deterministic fixed/heuristic baselines; learned policy must beat fair cost comparisons.
A12: changes to authority, required native verifier and execution protocol prohibited from learned rewrite.

## Rejected/deferred
No automatic conversion of arbitrary JS to Handwired, no silent global policy graph persisted in Beads, no trainable hard authorization, no universal scheduler, no automatic policy graph rebuild on every RF render, no generalized browser runtime, no distributed PPO/off-policy from historical replay, no claiming Lean proofs before native builds.

## Compatibility
Preserve original mw.episode.v1 and mw.training-export.v1. Add new sidecar with separate schema; map old records as unknown behavior support rather than invent zero log probability. Graph reader version fail-closed on unknown opcode/major (CURRENT: episode.ts L181 and training-export.ts L63 already emit unknown; the fail-closed graph reader is TARGET). Existing apps keep using direct ordinary functions; adoption opt-in.
