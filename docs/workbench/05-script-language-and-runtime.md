# 05 — Script language compatibility, VM and node() semantics

## Compatibility obligation

Existing scripts authored for Claude Code's Workflow tool and accepted by upstream pi-subagents must continue to work unchanged. Preserve literal export const meta metadata, args, agent(), parallel(), pipeline(), phase(), log(), workflow(), budget, console and return-value JSON boundary. Track precise golden behavior from upstream docs/workflows.md and tests; do not claim all possible Claude-internal API versions are identical.

Upstream semantics to preserve unless explicitly versioned:
- Workflow script body is wrapped as async function; bare return and top-level await are allowed.
- meta must be statically extractable pure literal, not executed during discovery.
- parallel(thunks) is a barrier and settles siblings independently with failure represented under established script semantics.
- pipeline(items,...stages) has no stage-wide barrier; stage gets prior result/original item/index; item-level failure semantics must not drift.
- phase grouping and scoped nested workflow() behavior match existing fixtures; nested bound currently one level.
- agent(prompt,opts) supports label, phase, model, agentType, isolation, gate, resume, effort, schema under documented validation/combinations.
- JSON-only RPC/results; object schema is checked; rejected unsupported options remain errors, not ignored.
- budget behavior retains compatibility where Claude Code-specific values are unavailable; do not invent a valid total.
- Existing saved-workflow lookup precedence and source resolution preserved unless separately migrated.

## New extension

Add optional global:

    node(capabilityId: string, input: JsonValue, options?: NodeCallOptions): Promise<JsonValue>

Proposed options: label, phase, explicit logicalKey, deadlineMs, resultProjection (optional). All optional; do not add semantic retry or universal status defaults. No arbitrary import, require, eval, fetch, native IO, credentials, or SDK clients inside script VM.

## Node dispatch protocol

1. Worker validates capabilityId syntax and recursively validates payload as JSON. Assign monotonically stable local call index and phase context.
2. Worker sends RPC {method:"node",callId,capabilityId,input,options,workflowInvocationRef} to trusted host.
3. Host looks up provider, verifies version and permissions/capability contract, validates input and effect policy, resolves host-owned bindings and native client.
4. Host executes provider operation once per authorized invocation or reconciles existing logical operation according to native semantics.
5. Host emits progress, native reference, evidence and final result. Response includes either JSON result or typed transport failure; no treating result.success=false as transport failure.
6. Worker resolves/rejects promise. Error taxonomy and result projection must be explicit and testable.

## Worker and RPC changes

- src/workflow/worker-source.ts: install node() and worker RPC format. Do not put provider code or secrets in this file.
- src/workflow/runtime.ts: new handleNode(...) branch, per-node progress entries, cancellation semantics, resource fairness and backpressure.
- src/workflow/progress.ts: projected SDK operation entry, not a fake "agent".
- src/workflow/journal.ts: NEVER automatically apply settled-agent prefix cache to new effectful SDK nodes. Need per-producer freshness/effect policy (see 08).
- src/workflow/meta.ts: preserve old literal metadata parser.
- Runner caps: count agent slots and SDK node operation slots separately where underlying provider owns its own admission; avoid global CPU-count-based cap for remote calls without measuring.

## Error taxonomy

Distinguish (a) syntax/validation error before invocation, (b) capability unavailable, (c) permission denied, (d) transport/runtime failure, (e) producer domain result unsuccessful, (f) uncertain external effect, (g) cancelled/aborted wait, (h) stale observation. Expose typed diagnostics; do not silently return null for every failure. Legacy agent() null failure semantics may remain at script boundary, with full detail in observer.

## Security note

node:vm is a language convenience and determinism mechanism, **not a hostile-code security boundary**. Upstream worker-source.ts explicitly warns about host-realm closure exposure; privileged provider calls need a separate process/permission boundary if scripts may be untrusted.

## Conformance

Run legacy fixtures in upstream Pi mode (where available) and Claude host mode, comparing script-level result shapes, phase grouping, error behavior, ordering constraints and cancellation. Test workload schedule nondeterminism rather than requiring identical parallel arrival order. Include invalid/malicious payloads, cycles, prototype pollution attempts, oversized values and timeout ambiguity.