# Certified Partial Persistence — MechanicalWorkflows interface program

Status: **design integration note only** (2026-10-18). Source of the complete mathematical theory: [Compositional Coordination Intelligence, 05–09](https://github.com/jehalladay/research/tree/main/programs/compositional-coordination-intelligence). Do not duplicate that research in this package.

## Responsibility boundary

MechanicalWorkflows owns typed application composition, effect proposal selection, deterministic admission, native environment adapters and atomic workflow publication. MicroPolicyCLI owns pure policy learning, critic estimates, numerical checkpoint artifacts and research reference implementations. ReactiveFiber owns contextual observation projections; MechanicalFiberRuntime owns separate semantic-runtime reference behavior. Forge/Beads/Furnace/git retain their native source-of-truth identities and verdict/effect authority. A numerical policy **cannot** issue a verification receipt or rewrite an authoritative outcome ledger.

## Target contracts — not implemented APIs

* `CertifiedResourceRef.v1`: immutable artifact digest, revision/snapshot token, producer provenance, type, dependency completeness statement, consumer scope and external authority source reference.
* `ValidationQuery.v1`: requested consumer class, exact environment revision, artifact + transitive dependency references, and required effect scope. Must be answered by the **source-owned validator**, not an LLM or a local invented verdict.
* `QuarantinePlan.v1`: changed source inputs, dependency-closed impacted set, semantic revalidation opportunities, alternative recipes, budget and native evidence requirements.
* `RepairProposal.v1`: typed graph recipe substitution or recomputation, predicted cost and predicted value. It is untrusted until selected, admitted, executed and independently validated.
* `PublicationBarrier.v1`: atomic snapshot of accepted verified artifacts after repair. Intermediate mixed-revision states may not be exposed to unqualified consumers.

No adapter is allowed to silently equate artifact authenticity with validity under *current* consumer and environment constraints. On source invalidation, quarantine conservatively by descendant closure. Sound semantic recertification may shrink the actual recomputation set, but must have independent native evidence. The closure is the minimum **opaque dependency quarantine**, not necessarily minimum recomputation.

## Required engineering gates

1. Dependency incompleteness negative control: an undeclared toolchain/source observation changes while a file digest stays the same; reuse must fail closed.
2. Revoked source receipt: descendents are quarantined and no stale mixed snapshot is published.
3. Valid semantic equivalence: changed upstream source need not force downstream recomputation if native recertification proves the exact consumer-relevant value unchanged.
4. Multi-worker handoff: successor inherits typed artifact, not predecessor hidden recurrent state, private authority or task identity.
5. Alternative producers and shared setup costs: ensure cost optimization considers only pre-admitted, version-compatible implementations.
6. Verified effect accounting: exactly one canonical outcome identity per actual terminal result; counterfactual credits remain annotations.
7. Strict effect bounds: learning/developmental policy submits proposals, but the same deterministic native admission gate remains authoritative.
8. Proper stochastic repair: detect loops/nonterminating invalidation cycles and report no finite-work guarantee rather than misrepresenting expected cost.

## Acceptance criteria

Use the pure MicroPolicyCLI `src/certified-persistence.js` fixture for finite-DAG semantics only; do **not** add it as a mandatory runtime dependency merely for an experiment. After native adapter implementation, compare authorized application execution against scratch evaluation with synchronized inputs and source-owned receipts, including failure and stale/recovery controls. Ensure work/verification/storage counts match the exact CPP W-1–W-6 reference formulas in controlled fixtures. Use local/Forge evidence; no GitHub CI requirement.

No production runtime implementation, real source receipt, native Forge verdict, or measured swarm improvement is claimed by this document.