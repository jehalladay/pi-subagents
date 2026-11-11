# 05 — Graph manifest, compilation and local evaluator LLD

## Manifest (target)
Schema mw.policy-graph.v1 fields: graphId, revision, nodes, edges, requiredContracts, implementationRefs, exactBasisPolicy, parentRevision. Node kinds: observation, pure transform, numeric policy, deterministic policy, conditional selector, guard/inhibitor, bounded option, composition and output. Ports have stable ID, schema ref, temporal instant/delayed, evidence scope and freshness requirement. Opaque implementation refs resolve via trusted application registry, not arbitrary code from JSON.

## Validator
1. Reject unknown schema, duplicate node/port IDs, unresolved implementation, incompatible port/temporal schemas.
2. Reject any cycle consisting entirely of instantaneous edges; allow delayed cycles only with explicit bounded memory/trigger semantics.
3. Verify node input observation scopes and confidentiality rights, pre-action action vocabulary and mask projection contract.
4. Verify capability/effect classes against fixed application authority; ensure all proposed effects still traverse reconcile.
5. Verify aggregate resource and timing envelopes; mark approximate caps as advisory, not hard proofs.
6. Compute semantic hash over canonical versioned manifest (do not borrow MicroPolicy checkpoint hash encoding).
7. Generate per-node basis/read scope/trace IDs and source map for 'why was this policy evaluated'.

## Compiler
Compile direct compositional functions using existing sequential/parallel/guarded/alternative/inhibit/repeated operators (a delayed-edge operator is TARGET; combinators.ts ships none at 19ca8d4). Do not change their order-sensitive intent traces or resolver semantics. Distinct stochastic decision identity and sidecar are maintained external to old Proposal shape. Pure deterministic reusable projections can cache by revision+scope; samples cache by *decision instance*, never by input vector alone.

## Execution
Synchronous path: in-process finite numerical policy. Precomputed path: MP local JSONL worker returns immutable choice receipt; synchronously verify receipt against graph/node/basis/checkpoint/memory before Policy.propose translates to typed intent. Worker timeout doesn't mutate graph or claim effects.

## Profiling
Record graph size, live nodes, evaluator calls, cache hits, per-node compute, source completeness, resource claims, reconciliation refusals, delayed trigger count, time to quiescence and bytes/evidence.
