# 18 — CPP-10 source-validity uncertainty and temporal repair admission bridge

Status (2026-10-18): **application design and verification obligations**, NOT an implemented validator, workflow publisher, native effect executor or verified source-to-model refinement. Extends [16](16-certified-partial-persistence-bridge.md) and [17](17-consumer-certificates-and-invalidation-reliability.md). The mathematical specification and proof register are [CPP-10A/B/ledger](https://github.com/jehalladay/research/tree/main/programs/compositional-coordination-intelligence/). The optional pure reference is [MicroPolicyCLI M1m](https://github.com/jehalladay/MicroPolicyCli/blob/main/docs/INDEPENDENT_M1M.md).

## Authority architecture — no new orchestrator

MechanicalWorkflows owns application intent composition, native adapter call ordering, deterministic reconciliation and atomic publication. Actual source systems own semantic truth, revisions, evidence signature, effect admission, canonical outcome IDs and revocation. MicroPolicyCLI can supply a distribution over validity, a proposed inspection target and a predicted cost; it **cannot** certify an artifact, mark a source-valid result, bypass native admission, or issue effect receipts. ReactiveFiber owns observation projections; Forge, Furnace, Beads, git and other sources retain native identities and outcomes. No duplicate workflow scheduler or universal central coordinator.

## Typed TARGET contracts (not shipped)

- `SourceSnapshotToken.v1`: source owner, exact immutable revision or consistent-cut vector, validity epoch, read-fence capability, expiry/lease scope, covered environment sources and consumer observation contract.
- `ValidityJudgment.v1`: `CERTIFIED | REVOKED | UNKNOWN` with distinct reason, effective revision/contract, validator identity, dependency-completeness witness, native evidence reference, and effect-obligation semantics. A confidence float belongs to a separate `ValidityBelief.v1` and cannot convert UNKNOWN into CERTIFIED.
- `RepairInspectionProposal.v1`: typed target artifact, consumer contract, source revision, requested native inspection/query, predicted latency/cost, resulting belief update and budget reservation. This is an untrusted *proposal*.
- `RepairAttempt.v1`: immutable original artifact provenance, source dependency refs, proposed replacement producer/checkpoint, authorized work identity, expected costs, retry key and completion receipt.
- `PublicationBarrier.v2`: compare-and-commit expected source revision vector, all transitive source evidence, typed consumer/rejection/effect contract, immutable canonical effect-outcome references and staged artifact set. Must be validated at actual publication linearization, not just at work submission.
- `RevocationNotice.v1`: source-native revision and affected validity/dependency scope. The receiving adapter computes conservative opaque closure and may seek independent semantic recertification, but cannot treat a learned causal attribution as a sound reason to omit closure.

## Target deterministic publication protocol

1. Query a **source-owned coherent snapshot**, including external facts, typed dependencies, consumer interface and effect obligations. If any source cannot attest a consistent cut, remain UNKNOWN and decline current-version publication.
2. Compute conservative dependency quarantine from native changed/revoked seeds. Preserve historical immutable outcomes even after quarantine.
3. A policy may propose to inspect, recertify, replace or recompute. The application checks eligibility, budgets and authority. A Bayesian posterior affects *ordering of admitted queries only*, never the required proof.
4. Obtain version-scoped source-native revalidation or source-admitted reevaluation receipts, including non-idempotent effect discharge. Pending completions from old versions remain historical and unpublishable as current.
5. Stage the complete transitive artifact graph, verify type/consumer/effect contracts, fresh source evidence and canonical outcome IDs. Reject cycles, missing dependencies and duplicate effect identities.
6. Atomically compare the authoritative effective revision vector and commit only if it still matches all staged evidence; retry revalidation/quarantine after a failed compare. Concurrent worker completion cannot override the fence.
7. Consumer reads specify either current-fenced semantics or explicitly version-tagged historical reads. Revocation propagation must fence current readers or implement a declared bounded-staleness/retraction contract.

The reference function `checkAbstractPublication` only evaluates an *already provided Boolean-premise object*. It is not a substitute for steps 1, 4 or 6; those require source integrations with real linearization points.

## Mandatory negative/falsification gates

A. Update the source between native validation and atomic publication: stale compare fails. B. Validate parent/child under different revisions: reject mixed snapshot. C. Hide a relevant build-toolchain dependency: evidence remains UNKNOWN; fail closed. D. Tamper with a signed native reference or use expired scope: reject despite high belief. E. Reuse old payload while new non-idempotent effect is required: reject/require native discharge; never synthesize an outcome. F. Retry worker after accepted effect: preserve canonical outcome identity and prevent duplicate. G. Reorder asynchronous completion after revocation: leave old result quarantined. H. Expand consumer interface to inspect a formerly hidden effect: demand new refinement proof. I. Degrade native verifier; compare actual source error behavior with declared risk budgets. J. Missing read fence during revocation must be detectable under current-snapshot contract.

## Evaluation and source-to-code proof obligations

P1: map every real mutable source field to abstract revision/dependency scope and define native validation's soundness assumption and evidence. P2: establish concrete linearization point for coherent source/read/publication events (or provide a countertrace). P3: prove forward simulation of local typed repair proposals under native admission. P4: prove source-owned effect trace identity and deduplication under replacement workers. P5: prove consumer-interface refinement across epochs, or require recertification on interface change. P6: test crash/restart recovery and pending queues without reissuing terminal effects. P7: check source-specific timeout/lease semantics and bounded staleness. P8: compare logical cost with MicroPolicyCLI exact tiny-state oracle under matched source calls and verification overhead.

**Not yet discharged:** P1–P8 against real MechanicalWorkflows source. No production repair implementation, real verifier, native Forge gate or model-checker execution is claimed. This document intentionally leaves the older design and negative findings intact.
