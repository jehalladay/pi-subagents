# 01 — Product vision and settled questions

## User journey
An application author composes deterministic rules and opt-in trainable numerical policies over versioned observations. The composed organization emits typed intentions. Existing reconcile checks basis, protected scopes, read/write conflicts and budgets. Native host executes admitted intents and supplies receipts. A separate offline learner materializes eligible feedback, trains a MicroPolicy checkpoint, or evaluates a proposed structural rewrite. Publication is explicitly opt-in and revision-guarded.

## Decided
1. No new orchestrator, universal scheduler, storage service, tool provider, or special requirement to use MicroPolicy; plain functions first.
2. Policy graph is a **declarative wrapper** over existing combinators and pure functions, not a competing runtime (delayed/stateful edges need a new typed operator; combinators.ts has none at 19ca8d4).
3. Synchronous Policy.propose stays stable initially; optional external MP worker may precompute immutable numerical decisions tied to a pinned basis.
4. Pre-sampling eligible actions, sampled behavior and post-resolver outcome are separate records.
5. Graph manifests are immutable/versioned; graph promotion and MicroPolicy checkpoint promotion are separate CAS operations.
6. Mandatory evidence and authority remain exact; learned predictive features may inform but never certify effects.
7. Certified consumer-relative interfaces coexist with richer full-history evidence.
8. Typed rewrites produce candidates only; publication is governed. Contracts classified exact versus empirical; no magic proof via JSON validator.
9. Finite oracle and property-specific interpreters are research tooling, not deployed process engines.
10. Computational priority: deterministic exact/greedy arbitration and fixed baseline before learned arbitration; do not over-engineer.
11. No live background graph evolution by default; experimental promotions require independent quality evidence and rollback.
12. No mutation may alter Forge gate requirements, Beads claims, Furnace execution authority or trust policy (policy prohibition; no technical guard until the D5/D6 rewrite engine exists).

## Non-goals
Handwired compiler internals; ReactiveQuery query evaluator; network transport; distributed multi-host coordination; generalized DPO rewrite library; proof of arbitrary asynchronous liveness; effectful DevTools. All remain separate owners or deferred research.
