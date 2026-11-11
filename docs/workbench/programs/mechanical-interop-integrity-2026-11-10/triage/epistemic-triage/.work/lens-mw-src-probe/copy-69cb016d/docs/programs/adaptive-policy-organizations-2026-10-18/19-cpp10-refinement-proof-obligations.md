# 19 — CPP-10.12–15: Source-to-model audit, revision publication and temporal admission proof obligations

Status 2026-10-19: direct **current main source inspection** plus typed design requirements and falsifiers. Not a native adapter, source validator, atomic commit, or proven source-to-model simulation. Mathematical proofs live in research documents [18](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/18-cpp10-static-uncertainty-and-robust-repair.md), [19](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/19-cpp10-source-to-model-refinement.md), and [20](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/20-cpp10-temporal-overlap-and-certificate-complexity.md). Extends the existing [16](16-certified-partial-persistence-bridge.md)–[18](18-cpp10-temporal-repair-admission.md).

## Source inspected and the gaps it proves

The actual current `packages/coordination/src/contracts.ts` defines a synchronous pure `Policy.propose` with `propose-only` authority, `Basis {workspaceId,revision}`, an `Intent.expectedRevision` and `evidenceRefs`, and leaves real effects to an external host. It does not issue source receipts.

The current `packages/coordination/src/resolver.ts` defines `reconcile` as a **pure intent-selection function**. It rejects a stale `expectedRevision` relative to its **input pinned basis**, conflicting read/write scopes, protected scopes, exceeded budgets and self-asserted `authorized-effect`. It does not perform native compare-and-commit against source state after evaluation. It would be unsound to claim `INTENT_BASIS_STALE` proves a source revision has not advanced asynchronously.

The current `packages/coordination/src/artifact-recovery.ts` is explicitly a seeded `mode:"fixture"`. It models a crashed producer leaving a progress snapshot, followed by a successor that may reuse the artifact. Digest/provenance checks are fixture state transitions, not native source-scope semantic validity. The larger `evaluation.ts` harness similarly evaluates typed fixture environments and external policy configurations. These are useful falsifiable local models, not verified real source adapters.

**Direct conclusion:** native source snapshot acquisition, sound semantic validity checking across revisions, cross-source coherent cuts, publication CAS/linearization, and current-read fencing are **not established by these inspected modules**. Do not infer absence from other uninspected packages, but do not promote existing fixture/resolver APIs to evidence of them.

## Refinement obligations with an explicit two-layer transition mapping

Abstract visible labels: `proposal`, `nativeAcceptedEffect`, `sourceRevision`, `nativeValidate`, `quarantine`, `publishSnapshot`, `readCurrent`, `readHistorical`, `reject`. Numerical MicroPolicy outputs enter only `proposal`, not native events.

Concrete step to abstract mapping targets:

| Concrete file/API | What is evidenced today | Missing assumption to prove CPP-10.12 |
| --- | --- | --- |
| `contracts.ts:Policy.propose` | typed pure candidate outputs, no effects | policy replay/persistence observation congruence for versioned consumer class |
| `resolver.ts:reconcile` | deterministic admission relative to supplied basis | a separate native authorization/commit gate and version recheck at execution |
| `artifact-recovery.ts` | seeded fixture digest/progress and handoff | source soundness, complete environment dependencies and real revision receipts |
| `evaluation.ts` | budget-matched fixture evaluation | real source effect and consumer-trace correspondence, not just fixture return |
| proposed native adapter | no validated implementation shown in inspected paths | revision-vector consistent cut, native auth, effect dedup, source-owned receipt validation, CAS |
| consumer read API | no validated current-read fence shown | current versus historical contract, no post-revocation stale current reads |

## Authority/validity types (TARGET only)

Separate `ValidityBelief.v1` (joint posterior over hidden validity/source-model identity, no authority) from `SourceValidityJudgment.v1` (CERTIFIED/REVOKED/UNKNOWN, source-owned revision, consumer/effect scope, complete dependency attestation), and `PublicationCandidate.v2` (immutable staged artifact IDs, candidate coherent cut, all transitive proof references, canonical native effect IDs).

An inspection plan is only a proposal to query a source. A `CERTIFIED` status requires actual native proof; confidence posterior cannot generate it. The publication barrier should expose `compareAndPublish(candidate,expectedCut)` on a native source-backed atomic facility, or document a serializable equivalent. The application must reject old worker completions whose evidence revisions differ from the commit point.

## Acceptance experiments to falsify the refinement

1. **Validation/commit race:** native source changes after receipt issuance but before publication. Native CAS must reject, not merely a stale `Intent` checked against an earlier `Basis`.
2. **Fractured multi-source cut:** sources A/B individually attest local versions but the artifact dependency graph requires a mutually incompatible pair. Deny current-snapshot publication without a consistent cut.
3. **Concurrent worker replacement:** two workers complete the same terminal effect. Only native owner can deduplicate using a canonical outcome key; numerical policy ID is insufficient.
4. **Post-publication revocation:** current-read fence must refuse or return new coherent snapshot, even if old CAS succeeded.
5. **Observation-interface expansion:** formerly hidden source effect becomes consumer visible. Old semantic quotient no longer suffices.
6. **Source-model uncertainty:** an inspection learned under a fixed unknown validator must update a joint source-model belief; a changing validator model requires source revision/epoch tracking.
7. **Queue instability:** even a bounded expected number of native operations cannot be called bounded wall-time if verifier arrivals overwhelm service capacity.
8. **Actual receipt forging/expiration:** malicious or outdated artifacts must remain UNKNOWN/REVOKED regardless of numerical posterior.

## Stage gates and non-goals

G0 freeze externally owned native source contracts; G1 map source revisions/effect IDs to concrete adapter; G2 prove one-source compare-and-publish safety; G3 check current/historical reader semantics; G4 formally specify two-source consistent cuts; G5 trace-refinement tests with injected asynchronous schedules; G6 only then allow candidate policy to optimize inspection order; G7 measure repeated repair under source validity windows and service capacity.

Do not implement a new central orchestrator. Do not make MicroPolicyCLI the issuer of Forge, Furnace, Beads, Git or other native verdicts. No Forge/Handwired, Lean, or native source execution is claimed by this note.


## CPP-10.19/20 mathematical linkage

[Research 23](https://github.com/jehalladay/research/blob/main/programs/compositional-coordination-intelligence/23-cpp10-factorized-repair-and-revision-aware-filtering.md) supplies symbolic expected-work certificates and revision-aware belief error bounds for candidate inspection/repair policies. Neither is an authorized native receipt, publication fence, or current-read contract. Real source latency, validators, mixed-source cut semantics and effect identity remain application adapter obligations.
