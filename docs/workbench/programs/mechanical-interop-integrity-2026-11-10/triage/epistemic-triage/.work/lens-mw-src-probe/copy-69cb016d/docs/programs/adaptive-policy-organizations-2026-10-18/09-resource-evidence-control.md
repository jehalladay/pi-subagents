# 09 — Resource, epistemic and stability contracts

## Admission
Current MW reconcile rejects all parties of a write/read conflict, then applies cumulative resource budget in disclosed proposal order. A pure optional compatible-subset preselector may optimize conflicting candidates before reconcile; it may not weaken reconciliation or native authority. Deterministic exact combinatorial selection for small candidate sets is preferable to learned approximation until measured.

## Resources
Resource marking captures available/reserved/busy; conservation invariant e.g. L_free+L_reserved+L_busy=L_total under matching modeled transitions. Contracts describe max demand or bounded resource automaton, plus global budget and mutual exclusion. Never infer proof of true capacity from an arbitrary simulation token.

## Evidence
ReactiveQuerySDK's proposed K3 source completeness and retraction semantics are respected by optional integration; QuerySDK itself does not ship an installed production API yet (checked at ReactiveQuerySDK 1b4ac5ba9bf1a34bd2f80a33844ab9ec1e8bd5a7, committed 2026-10-19T05:44:24Z: the tree holds only LICENSE, README.md and docs/program/*.md, with no package.json, Cargo.toml or src/ path). Missing source, present zero, covered absence and invalid evidence are distinct. Numeric feature imputation must be explicit and include missingness. Queries returning zero rows retain *domain* dependency.

## Control
Separate resource pressure signals, policies and native actuator arbiter. Observe actual request/admission/refusal so integral windup cannot assume every request was applied. Apply hysteresis, dwell and bounded updates; no instantaneous feedback cycle. Linked queue systems require whole-plant testing for oscillation; stability not guaranteed from separately stable modules.

## Fairness
Aging/deficit penalties or hard min-service rules declared separately; an unconstrained learned utility may starve difficult tasks. Deterministic selection and queue policies measured under overload and underload. Cost model counts observation queries, workers, Forge validation, queue latency and policy inference.
