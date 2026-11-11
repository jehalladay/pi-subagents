# 07 — Developmental rewrites, migration and promotion

## Restricted v1 grammar
specialize; factor duplicate pure computation; substitute compatible numerical policy; add a versioned non-authoritative guard; split/coarsen certified view; insert delayed state edge; retire unused policy. Every rule is typed and finite, with match guards and explicit L<-K->R preserved interface. DPO-style dangling-edge/identification checks only; do not claim generic DPO kernel or executable Lean proof.

## Mutation record
Parent graph revision, candidate hash, rule/match, changed nodes/ports/edges, read/evidence/resource dependencies, normalized port mapping, parameter checkpoint mapping, private memory migration, required certificates, experiment IDs. Candidate immutable and side-effect-free.

## Exact versus behavioral
Pure refactor: observable trace or declared contract equivalence. Changed behavior: valid authority/resource/evidence contracts, separate comparative fitness. Port equality alone is insufficient for stochastic equivalence; copying a random output differs from independent sampling.

## Migration
Only inherited named compatible params; preserve source checkpoint revision; no raw wire-index migration. Memory strategies reset, verified partition, unchanged-schema identity. Open native leases/claims remain in effect owner, never copied. Stop/dwell or drain active instances, create migration snapshot, validate, commit graph alias CAS, then resume; rollback does not rewind already committed native actions. Checkpoint parameter remapping across rewrites (transport) is owned by MicroPolicyCli as a TARGET public API (none at 9d51a8c6ed08); MW emits only the named semantic parameter map and takes no @micro-policy dependency.

## Assurance invalidation
Certificate dependencies include data edges, resource scopes, stochastic common causes, evidence coverage, timing and effect authority. A change to a premise invalidates all dependent certificates. An exact independent rewrite may retain unaffected certificates only under proof of complete dependency footprint. Global resource changes require full budget review.

## Candidate selection
First one proposed rewrite per candidate. Compare against parent on heldout workload regimes, compute/search budget, tail risk and stability. Each guard axis has a declared direction: compute/search budget and tail risk are lower-is-better, stability is higher-is-better, so a regression is a signed worsening beyond the axis tolerance times the parent value. Guard metrics are nonnegative; a negative one refuses. Only explicit promotions after required gates; retain rejected evaluations in lineage. A quality-diversity archive is research after a valid first vertical cut.
