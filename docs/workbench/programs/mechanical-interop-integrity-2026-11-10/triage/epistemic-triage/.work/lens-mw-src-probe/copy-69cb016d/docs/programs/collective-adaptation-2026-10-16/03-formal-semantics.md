# Mathematical and semantic specification — Composable Coordination Harnesses and Colony Experiments

## Policy composition
A coordination policy is a typed transducer \(P:(O,M,C)\to\mathcal D(I,M')\), where C contains budget, authority, and episode identity; I is a proposed intent, **not an effect**. Parallel \(P\parallel Q\) collects proposals, then reconciliation checks write-set interference and cumulative resources. For disjoint permitted effect sets the intents may commute; otherwise a deterministic conflict result or explicit arbiter is required. Sequential \(P;Q\) passes Q only validated outputs of P. Guarded \(P\triangleright Q\) prevents Q's evaluation when the guard is false. Avoid asserting associativity for effectful semantics or trace structures without tests.

An environment is \(E=(S,O,A,T,R,V)\): a state, observations, admissible intents, transition dynamics, reward and independent verifier. Counterfactual comparisons replay from the same snapshot and budget while allowing agents to adapt. Comparisons report \(E[R]-\lambda E[cost]\), p95 latency, invalid landings and artifact causal utility; never optimize just throughput.


## Global invariants

1. A model action gets actor gradients only when that action was sampled from an eligible trainable policy and sufficient log-probability data exist.
2. Shared final task reward does not demonstrate marginal causal contribution; provenance and counterfactual value are different objects.
3. A valid policy proposal is not an authorized effect; a Quorum decision is not an external verifier PASS; a Trail signal is not evidence of truth.
4. Value and dependency projections preserve UNKNOWN instead of introducing closed-world assumptions.
5. An artifact persists across worker death; deletion or compaction of a prompt does not imply deletion of the environment or its lineage.
6. Composition's algebraic laws must specify whether equivalence is over values, outputs, traces or external effects.
7. Cost-adjusted reward comparisons must use equivalent budget/task distributions and independent validation.

## Research grounding and transfer limits

Relevant foundations include the Price equation and multilevel selection (descriptive population decomposition); iterated learning and cultural transmission; COMA counterfactual multi-agent credit; RUDDER return decomposition; hierarchical/options RL; successor features; learned critics and group-relative RL. Each idea transfers only under stated assumptions, and no cited biological analogue alone establishes correctness or superior RL performance.
