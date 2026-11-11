# 07 — Identity, effects, nested calls, and recovery

This document keeps recursive execution **simple** by preserving each producer's native state machine. It does not define a second state engine for MechanicalWorkflows.

## Four identities that must not collapse

1. **Definition** — workflow package + exported entrypoint + schema version.
2. **Deployment** — immutable executable artifact digest and host compatibility.
3. **Logical invocation** — caller-assigned identity for a request; distinguishes intentional duplicates from retries.
4. **Native execution** — e.g. Furnace Run, Work, Attempt, Forge operation, agent session/turn and workspace materialization. Each remains owned by its producer.

Tracing spans and provider tool-call IDs correlate these facts. A trace ID is not a Run ID, an artifact digest is not a workspace ID, and a parent Attempt ID is a poor stable key for durable child work because it changes on retry.

## Direct versus durable nested calls

```text
function A calls function B directly   -> ordinary language stack, no new durable object
function A establishes Furnace Run R   -> new native durable identity; A may observe/await/detach
Furnace Attempt calls function A        -> Attempt may rerun; A's external effects are not exactly once
function A establishes Furnace Run R2  -> R2's lifetime and recovery are native Furnace responsibilities
```

The optional entrypoint descriptor cannot change these truths.

## Effect rule

Do not retry a request whose external effect may have happened without first consulting the producer's supported reconciliation/idempotency mechanism. Network timeout, child process death, and lost result **do not** establish non-execution.

Some reads are safely recomputable, but still freshness-bound. An agent workspace edit, external publication, or Furnace Run establishment requires specific semantics. No universal `Effect` interface is defined.

## Proposed Furnace native Run ensure

This is an **upstream target**, not implemented here or claimed shipped by Furnace:

```text
ensure(logicalKey K, canonicalSpecification S)
  absent K       -> atomically establish R, bind K -> (S,R)
  existing K,S   -> return R
  existing K,S'  -> conflict, never substitute R or silently create new
  unknown state  -> reconcile, not blind duplicate
```

The key should be stable across retry of the same logical parent Work and child role. The separate specification digest should include immutable code artifact, effective formula/executor identity, canonical input, configuration and subject basis. Equal payload does **not** alone imply same logical invocation; two intentional calls may have identical arguments.

Furnace owns durable Run establishment; MechanicalWorkflows MAY derive an application logical key but MUST NOT persist an authoritative second key-to-Run database.

Until such a native contract is implemented, ambiguous `runs.start()` results remain unresolved. Disallow automatic repeats when duplication would be unsafe.

## Reattachment and liveness

Client disconnect is not Run stop. Parent Attempt failure is not child Run cancellation. Observing a Run is not supervising it. Furnace's workflow-operations design distinguishes supervision intent, controller session and actually observed supervision; adapters must preserve that difference.

A waiting caller should distinguish a **wait deadline** from an **operation deadline** and from **cancel intent**. Aborted wait must not implicitly stop work unless the explicit API says so. Cancellation request/acceptance is not terminal cancellation.

## Shared children and ownership

A child operation may have several readers. Causal origin, dependency, cancellation authority, resource charge and lifecycle custody are separate relationships. A dependent consumer cannot cancel shared work just because it stops waiting. These relationships should be recorded by their authoritative producers as possible and queried through HX later if useful; this project does not keep an authoritative global edge store.

## Capacity and nested deadlock

Four parent executor callbacks occupying four slots while each waits for a new child requiring a slot can deadlock. An ordinary `await` does **not** release Furnace execution resources. Initial policy: favor returning an explicit awaiting-child domain reference, native Beads dependencies, or separately admitted worker capacity; never claim automatic callback suspension. Future native Furnace wakeup/resource facilities should be used rather than duplicating a scheduler here.

## Workspace basis and shared storage

Subject basis must bind the actual candidate verified. A remote host must resolve logical workspace + expected basis to its own materialization. Forge workspace-family snapshots are distinct from mutable child instances; sharing immutable storage does not make mutable changes shared or prove any gate PASS. Unknown capture consistency or mismatched candidate refuses verification rather than silently running on current cwd.

## RCP

Optional continuation semantics apply only when a runtime and provider actually support compatible capture/restore. Furnace supervision alone does not preserve a TypeScript stack. No default RCP dependency.

## Recovery falsifiers

- Kill a parent after child creation but before child ID return; automatic retry must not create a second child when native ensure is available.
- Same child key with changed specification must conflict.
- Kill a worker after external effect but before terminal result; require reconciliation/unknown.
- Cancel a parent with shared detached child; child does not automatically stop.
- Fill all execution seats with waiting parents and pending children; document the required native wakeup/admission behavior, refuse claims of progress until measured.
- Swap a verified candidate basis; verification must not report PASS for the substituted tree.

These are target live journeys; the current scaffold only tests the smaller input/basis/evidence invariants.

## Local receipt projection (2026-10-15)

`apps/development-rig/src/receipt.ts` offers a pure, non-authoritative projection of a completed local `LiveDevelopmentResult`. It retains the Git base and candidate as distinct bases, marks the agent session as observed, names the native Forge operation, and marks Furnace not run for the local host. A mismatched candidate gate or missing Forge operation is never established by this projection. It does not persist or reconcile execution state. A real Furnace-hosted development receipt needs its own native Run/Work/Attempt references and is not supplied by this local projection.

## RF render reference in local result (2026-10-15)

The opt-in RF context path now preserves its native `reactive-fiber/render` id on `LiveDevelopmentResult.contextEvidence`; `receiptOf()` labels that stage established only when the RF producer id is present, instead of calling a real render plain task context. The Git census remains observed rather than HX-complete task scope, and Furnace remains not run for this local host. A fabricated or absent render ref yields an unknown context stage.

## Review producer identity in local receipts (2026-10-15)

A local development receipt now has a separate `review` stage. An attributable read-only provider review is merely observed and names its `review-session`; native Forge verification remains a different stage with its own operation id. Unknown or evidence-free review is not treated as approval or a gate result. This does not make an agent review durable or equivalent to the task-acceptance decision.
