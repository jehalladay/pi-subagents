# Composition and episode semantics for TrainingWorks

Existing mw.episode.v1 is native — an MW-owned contract, not real-tool execution evidence. A TrainingWorks adapter must retain original source bytes or digest, the verification grade appropriate to the source (a fixture verdict for fixture sources; a native grade only for replay/live sources), environment mode and explicit unknowns. tw.step.v1 is an external TrainingWorks schema that MW neither emits nor consumes at HEAD; a transformed tw.step.v1 record is a *projection*, never an upgrade in authority — the rule binds future adapter output.

## Component conditions
Sequential P;Q: Q's input assumption follows from accepted P output under the same pinned state basis. The exported sequential() performs no validation or acceptance; this condition is a new validator obligation, not current combinator behavior.
Guarded P▷Q: the guard carries a valid guard witness (distinct from MW's liveWitness) and does not authorize effects; witness-bearing guards are new machinery beyond the exported guarded().
Parallel P||Q: check aggregate resources, shared writes and source versions (implemented). The unknown-dynamic-effects check is doc-only at HEAD; until built, parallel effect resolution may be claimed only for budget and scope interference.
Alternative P⊕Q: the selector is versioned and trainable in interface — the versioned selector interface admits trained implementations; no trainer exists in-repo and none is added. The selection decision must be recorded.
Inhibition P-|Q: evidence-based inhibit may suppress proposed action but not override native requirements.
Repeated P*: bounded, with nonquiescence and termination (the implemented triple).

## Research tests
Construct two locally valid proposals contending for a shared resource and require composite failure: shared write/read scope contention is satisfied and tested at HEAD; shared budget contention is not satisfied at HEAD and is new validator work. Verify effectful permutations are not claimed commutative. Compare fixed versus learned selector on matched held-out episodes — the learned selector is supplied from outside MW (no in-repo trainer); MW provides the versioned selector interface, the comparison harness and the matched held-out episodes. Artifact consumption edges are not causal effect; matched include/remove interventions with policy adaptation estimate effects separately.

## Authority/evidence
Beads retains task readiness/completion, Furnace retains execution/retry, Forge retains native build validation, and Git retains commit/history authority. A fixture's completion may be exact in its own world without asserting real agent execution succeeded. Native APIs require explicit scope and isolated opt-in.
