# 12 — Dependency-ordered delivery plan

These are design work packages; no tickets are created and completion is not asserted.

| Stage | Work packages | Exit evidence |
|---|---|---|
| D0 | Owner/source inventory, exact existing MW fixture behavior, MP installed API matrix | pinned baseline, negative tests |
| D1 | Versioned manifest, port checker, identity, instantaneous cycle rejection | pure schema conformance |
| D2 | Deterministic graph compiler using old MW combinators, local read-only trace | old/new fixture equivalence |
| D3 | Additive stochastic decision sidecar, pre-sampling support, in-process/precomputed MP adapter | two-claim exact oracle and MP parity |
| D4 | Consumer-relative interface spec, finite abstraction oracle integration | free/reserved/busy counterexample |
| D5 | Restricted typed rewrite candidate engine, transport, certificate footprint | immutable candidate and invalidation tests |
| D6 | Single specialized parent/child recovery rewrite; matched sim training | held-out and negative results |
| D7 | Scratch native observation/effect bridge with receipts and explicit promotion gate | independent live evidence |
| D8 | Profiling, proof-assurance DevTools view, docs/product split | measured UX/DX/LX and Forge evidence |

D1/D2 overlap the existing CompositionTree compiler (packages/coordination/src/evaluation.ts treeConfiguration) and APO-003; record a reuse-or-supersede decision at D1 start. The D4/APO-007/APO-012 gating oracle must be an in-repo pure TS reference enumeration with tests, or the D4 gate is blocked on the external research owner (01 L15 and 13 L4 call the oracle research-only). In-repo oracle owner: packages/coordination (the package that already owns evaluation.ts treeConfiguration); this is a design assignment: the package already exports per-family oracles such as oracleLandedOrder, but no D4 free/reserved/busy finite abstraction enumeration exists at 19ca8d4. D1, D2 and D3 depend on D0's pinned baseline. Parallelism: D1 contract research, exact finite oracle (separate research owner), and MP API parity can proceed independently; D3 depends on D1/D2, D5 depends on D1/D4, D7 depends on all safety and native validation gates. Prefer Forge for quality steps, no GitHub Actions obligation.

## Status promotion
For each APO requirement update source + tests + status ledger (= the Status column of 02-atomic-requirements.md) in one change. Documentation-only does not satisfy any TARGET gate. If backend feature missing, record refusal; do not invent a fallback that changes policy semantics; the only fallback is the decisionSource fallback defined once at 04 L16.
