# 04 — Public programming model

## Direct use: the whole initial API

```ts
import { develop, type DevelopmentServices } from "@mechanical/workflows-development";

const services: DevelopmentServices = {
  discover: async request => /* app uses HX or equivalent */,
  compileContext: async (scope, request) => /* app uses RF or equivalent */,
  implement: async (context, scope, request) => /* app uses selected agent SDK */,
  verify: async (candidate, request) => /* app uses Forge */,
};
const outcome = await develop(services, {
  task: "Fix parser",
  workspaceId: "repo",
  baseRevision: "base",
});
```

Callbacks are deliberately **application ports**, not a universal tool ABI. They may be implemented using SDK objects captured in closures. `develop` does not construct, discover or close those objects.

## Types and decision behavior

Defined in `packages/development/src/contracts.ts`:

- `DevelopmentRequest`: task, logical workspace identifier, requested base revision.
- `SubjectBasis`: workspace identifier and revision string, **the minimal scaffold identity**; live Forge adapters must expand/refine basis checks to cover dirty state, configuration, materialization and content semantics.
- `ScopeResult`: basis, `complete|partial|unknown` coverage, file names, optional reference.
- `CompiledContext`: basis, text, optional producer evidence.
- `Candidate`: original parent basis, actual changed basis, optional evidence.
- `VerificationResult`: basis, `passed|failed|partial|unknown` plus optional native evidence reference.
- `DevelopmentOutcome`: `verified_candidate`, `verification_failed`, `needs_evidence`, or `indeterminate`.

The development function executes **discover → compileContext → implement → verify**, with early return upon input/basis/evidence inadequacy. It does not currently perform review, iterative repair, candidate promotion, publication, Beads readiness, or durable verification. Those are deliberate extension cuts, not hidden assumptions.

### Basis rules

For requested basis `B0`, discovery and context must match `B0`. The candidate `B1` must name `B0` as its parent and use a distinct revision. The live Git adapter additionally requires a changed HEAD tree, rejecting empty commits or change-then-revert histories. Verification must name `B1`. A `passed` verdict without a producer reference is indeterminate. These are conservative checks, not evidence that a literal revision string covers all Forge inputs.

### Failure classifications

- Invalid caller arguments: throw before effects.
- Incomplete discovery: `needs_evidence` (do not implement).
- Basis mismatch or non-established verification: `indeterminate`.
- Established unsuccessful domain gate: `verification_failed`.
- Established passing gate with reference: `verified_candidate`.

An exception from a service callback is **not** automatically a domain failure; callers and live adapters should retain native transport/SDK error classes and may catch/classify them at the application boundary. Don't replace all failures with a Boolean.

## Composition patterns

Any module can `await develop(...)`, call other exported functions, run bounded parallel analysis, or call selected native SDKs. Other workflows are allowed to be Claude-specific or Furnace-specific if their actual behavior requires it; do not introduce artificial portable agent facades.

For roles in a swarm, explicitly construct a separate dependency set per role. An agent tool must expose only the methods that the role is authorized to invoke, through the provider adapter. No `asTools()` in generic core.

## Extending the development library

Add an application-specific function such as `adversarialReview(services, request)` when it has a real consumer. Reuse domain output and evidence references but preserve native source results where correctness requires it. Extract `packages/review` only after reuse; do not implement a universal graph/node/workflow DSL.

## Lifecycle

The component borrows all injected dependencies. Its return does not dispose of service connections or cancel durable Runs. CLI/Furnace/remote hosts are responsible for disposing of resources they constructed, according to the native SDK contracts.

## Optional native composition (2026-10-15)

Application hosts that provide real task-scoped HyperUnix, task/source-grounded ReactiveFiber, agent and Forge adapters can call `developWithNativeEvidence()` from the rig. The function still delegates basis and outcome decisions to `develop()`, refuses incomplete scope before RF and implementation, and checks the rendered RF producer reference before assigning an agent. It is an optional application composition function, not a workflow engine or a universal SDK contract.

## Application-specific review decision function (2026-10-15)

`reviewCandidate(services, request)` is an ordinary optional function with explicit `plan`, `choose`, `review` and `verify` callbacks. It requires a plan tied to the original task/basis, a candidate listed in that plan with a changed revision, an attributable review on that candidate, and only then a native verification of the same candidate. Rejected or unknown reviews never invoke verification; callback errors propagate instead of being reclassified as rejection. A failing native gate remains a domain failure after approval. This function does not create or repair candidates itself and runs no agent/model/Forge SDK implicitly. There is no registry, scheduler, generic workflow DSL or automatic retry of unknown side effects.

## Explicit repair handoff (2026-10-15)

`repairRejectedCandidate(services)` is one opt-in application function for a candidate with an attributable rejected review. The caller supplies exactly one `produceRepair` effect; the new candidate must name the rejected commit as parent and have a different revision in the same workspace. A fresh review tied to that revision must approve before native verification. Rejection, unknown review, missing evidence, wrong basis and gate failure remain distinct outcomes. A thrown repair callback propagates unchanged; the function never retries it or loops. It is not a running automated model repair service, and no guarantee is made about edits or side effects outside the caller's workspace.

## Live one-shot repair host (2026-10-15)

`repairLiveCandidate()` in the development rig binds an explicit previously rejected clean Git candidate, starts one selected Claude Agent SDK repair effect, requires a changed clean commit with unchanged Forge gate declaration, then runs a separate read-only candidate-bound review before the native Forge gate. Callback failures propagate and no retry or silent fallback occurs. This is opt-in application code; its tests use real Git repos and injected agent/reviewer/Forge responses. A full real provider-backed repair run remains unwitnessed and cannot be called delivered solely from these tests.
