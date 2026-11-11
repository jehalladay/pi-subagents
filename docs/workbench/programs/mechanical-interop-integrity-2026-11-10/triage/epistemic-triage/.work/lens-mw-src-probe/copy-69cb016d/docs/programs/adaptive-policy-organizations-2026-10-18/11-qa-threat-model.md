# 11 — QA, security, negative controls, DevTools

## QA matrix (planned; V1-V10 unexecuted at 19ca8d4)
V1 Schema/ports, duplicate, unknown node, stale implementer, wrong input type, cycles without delay.
V2 Finite stochastic exact normalization/fan-out/selector conditional log-prob and probability mass.
V3 Source witness changes/retractions/covered absence and invalid/unknown propagation.
V4 Resource overclaim, protected write, conflicting scopes, stale head; native host never receives unauthorized action.
V5 CAS memory state, retries, duplicate decision ID and in-flight native commitments.
V6 Rewrite dangling refs, identity loss, illegal authority gain, incompatible migration, certificate invalidation.
V7 Cross-check MW native deterministic fixture against graph manifest compiled behavior.
V8 Real MP sampled decision round-trip, action mask, logprob, on-policy update with checkpoint revision.
V9 Controlled comparison on heldout seed/family workload, bootstrap intervals and cost accounting.
V10 Optional isolated Git/Forge/Furnace/Beads receipts, verifying no fake live PASS.

## Threat model
Untrusted learned policy may invent score, parameters, invalid action, fake receipt ref, unauthorized write scope, ambiguous evidence, NaN or malicious mutation proposal. Host schema and native gates must refuse (TARGET; no host schema exists and reconcile admits NaN claims at 19ca8d4). Untrusted source query may be fresh but incomplete; cannot infer absence. User-supplied callbacks/collectors require explicit trust boundary. Training artifacts redact credentials and preserve opaque source digests. A compromised presentation workbench has no effect capability.

## Read-only workbench
Views: operational decision graph, epistemic why-not and completeness, policy gradient/credit, developmental ancestry, resource pressure and certificate dependency. Export reproducible trace with no secret data. DevTools is never required for correctness or hosting. No UI click silently publishes a graph.
