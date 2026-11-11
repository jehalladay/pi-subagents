# Architecture and native integration — Composable Coordination Harnesses and Colony Experiments

## Responsibility and placement

Owned: application-owned policy-composition contracts and adapters; deterministic coordination simulation; isolated live harness experiments; test fixtures; environment and rollout export.

Not owned: a new engine, global scheduler, event database, inference provider, task tracker, or replacement for Furnace/Beads/RF/Forge.

## Application shape
Packages/coordination (proposed): contracts, combinators, pure conflict resolution, episode trace/export, fixture adapters. Apps/coordination-lab (proposed): landing-queue, context-handoff, artifact-recovery, quorum-evidence and resilience environments; adapters for Beads, Furnace, Git, Forge, HX and RF. These are candidate directories, not shipped exports.

A harness creates real native clients at the app boundary, feeds immutable read snapshots into policy evaluation, serializes proposed intents, checks revision/capabilities, and invokes existing authorized operations. On every effect, record command receipt + independent observed outcome. Maintain a deterministic fake-world oracle with the same semantic event schema. New agent SDK variants are simply application-owned executors, not imported into generic policy core.

Decision constraints: a policy may rank or abstain; native authority determines whether a write or landing is permitted. Quorum assessment, when eventually available, is only supporting evidence—not a Git, Forge or authorization verdict.


## Integration interfaces

| Producer / consumer | Contract at boundary |
|---|---|
| Furnace | Use ExecutorApp/Run/Attempt ownership and event observations; workflow process lifecycle stays in Furnace. |
| Forge | Native gate result and evidence-basis matching; no synthetic PASS in real-mode output. |
| ReactiveFiber | Task/source-bound context and dependency provenance; no second prompt graph. |
| HyperUnix | Respect semantic coverage complete/partial/unknown; unknown cannot certify task scope. |
| Beads | Atomic task claim and dependencies; never synthesize ownership from a successful command invocation. |

## End-to-end event contract (proposed)

```json
{
  "schema": "collective.event.v1",
  "episode_id": "task:demo",
  "event_id": "event:1",
  "actor_id": "worker:1",
  "producer_revision": "sha256:...",
  "subject": {"uri": "git:repo/path", "revision": "commit-sha"},
  "causal_parents": [],
  "evidence_refs": [],
  "status": "observed",
  "authority": "observation-only"
}
```

This is an illustrative interchange envelope, **not** an existing runtime schema. Consumers must retain native receipt payloads in addition to this projection. Event linkage is provenance, not proof of causal responsibility. Event IDs and producer revisions must be validated. Define exact JSON Schema/protobuf and version negotiation before shipping.

## Failure behavior

Duplicate events are idempotent; stale revisions yield conflicts; unavailable services stay unavailable; unrecognized capabilities fail closed. An observation cannot unilaterally execute, publish or certify a downstream effect. The caller owns effect retries and lifecycle unless native ownership says otherwise.
