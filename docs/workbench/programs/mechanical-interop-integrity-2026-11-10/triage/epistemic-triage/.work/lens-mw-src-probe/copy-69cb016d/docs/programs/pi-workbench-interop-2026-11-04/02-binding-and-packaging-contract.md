# 02 — Mechanical-side executable binding and artifact contract

**Design only** — type examples below are proposed. Do not add a universal workflow interface to the provider-neutral library.

## Committed source of truth

Existing `contracts/entrypoints/development.v1.json` is the descriptor of record for `mechanical.development.develop.v1`. `contracts/schemas/` holds its input/output schema. Existing `invokePinnedDevelopment` and `invokeInstalledDevelopment` are the host of record for local trusted artifacts. Repair the basename-versus-relative-ref discrepancy **first**; record exact canonicalization rules, deny `..` escapes, external URLs, unexpected extra descriptor fields, stale versions and wrong package/export. Tests must read **the on-disk descriptor** used by real consumers, not a handwritten object. The installed host must compare the actual `sha256:` digest of the exact packed artifact and type-check the loaded export.

## Proposed application host port

```ts
// Application adapter / host package only, NOT packages/development.
interface MechanicalHostServices {
  // Host supplies these capabilities as constrained closures; no JSON-serializable callable string.
  discover: DevelopmentServices["discover"];
  compileContext: DevelopmentServices["compileContext"];
  implement: DevelopmentServices["implement"];
  verify: DevelopmentServices["verify"];
}
interface BoundInvocation {
  entrypointId: "mechanical.development.develop.v1";
  artifactDigest: `sha256:${string}`;
  request: DevelopmentRequest;
  scope: { workspaceRoot: string; baseCommit: string; baseTree: string; gateDigest: string };
  mode: "git-census" | "native-task-scope";
  effectAuthorization: { allowed: boolean; operatorId: string; exactSourceBasis: string };
}
```

This is **not** an imperative `executeCommand(name,argv)` interface, an agent-tool conversion, a new scheduler, or a generic long-lived RPC. Host-owned callbacks can use native SDK clients as closure captures. No provider's credentials leave the application host. The target is a small, explicit TypeScript host export alongside existing rig adapters; consider a new package only if a real independent consumer requires it.

### Source/materialization preflight

- Require a canonical workspace inside authorized root and a single-writer lease/ownership record for effectful `implement`; do not reuse the shared parent checkout silently.
- Establish clean base Git commit+tree (not HEAD alone), package/gate manifest digest, function artifact SHA, source files and effective settings/instruction/skill digests before dispatch.
- Bind the implementation agent to the workspace explicitly; it must not write outside the working directory. Confirm a changed, clean candidate commit/tree and preserve it on failure/cancel. Do not use unsafe cleanup that can erase dirty edits.
- Verify the candidate's exact source using Forge's **native operation and predicate**, not process exit; report `unknown` or `indeterminate` on basis mismatch, partial verification or missing evidence. Never assert a Forge PASS because `develop()` resolved successfully.

## Service profiles

**Level G / Git-census (first vertical):** use the already implemented Mechanical `developLive` callback adapters for tracked-file discovery, optional explicitly plain or task-grounded RF context, Claude SDK single writer, and native Forge gate. Label `discovery:"git-tracked-files"` and its limited coverage authority. No claim of a task-scoped HyperUnix proof.

**Level N / Native task scope (later):** `discover` requires actual HX task/revision/query digest and a complete coverage witness; incomplete/unknown stops before `implement`. `compileContext` must return producer-backed RF context at same source revision with model budget, graph revision, output digest and a genuine render reference. Pi's ephemeral `--no-commit` preview is read-only preview and not a substitute.

**Level P / Pure coordination:** a separate allowed package/export list for pure coordination evaluators. No implicit source writes, no external policy effects, and outputs are proposals until a host-approved resolver applies them. Support serialized inputs only where a published explicit schema and semantics exist; do not invent a generic callable registry for all `packages/coordination` exports.

## Result and effect contract

The host returns a typed domain result *and* a separate invocation lifecycle:
```ts
interface MechanicalInvocationObservation {
  invocationId: string;                       // host ID, not a Furnace Run ID
  execution: "running" | "completed" | "failed" | "cancelled" | "unknown";
  domain?: DevelopmentOutcome;                // preserved as-is
  producerRefs: readonly { system: string; kind: string; id: string }[];
  sourceBasis: { workspaceId: string; baseCommit: string; baseTree: string; candidateCommit?: string; candidateTree?: string };
  evidenceFreshness: "current" | "stale" | "unknown";
}
```
The `DevelopmentOutcome` still uses its original four arms. `needs_evidence` is not "failed" in the same sense as `verification_failed`; `indeterminate` is not a successful verification; `verified_candidate` must have matching explicit native Forge operation evidence. Keep diagnostic codes and native producer IDs, never fabricate one from a UI call index. The actual versioned serialization should have a unique contract name, producer namespace and JSON schemas verified in both repos before shipping.

## Cancellation, retries and hosting

Pass host `AbortSignal` to owned runners/SDKs before the first asynchronous dispatch and record operation start separately from settlement. On interruption, stop future work but do not promise to reverse an already-committed Git candidate or Forge effect. Store exact native evidence and recovery workspace before disposing. An unknown effect is **not automatically retried**. Any retry must be authorized after producer-native reconciliation.

A disposable local npm install directory does not sandbox imported JS; only use explicitly reviewed, digest-pinned code. A detached subprocess is an independently authorized host (not just `Promise.race` on a worker). Furnace Run/Work/Attempt belongs to Furnace, and an ExecutorApp callback's return must be mapped independently from Mechanical's domain outcome. No second Furnace retry queue or Beads readiness index.

## API/version policy

Pin tested package versions and check the real installed SDK at the adapter. A provider failure should preserve its domain and transport/error taxonomy, exact argument/request and version; an unsupported upstream API results in a named integration blocker and precise upstream feedback, not an invented method. Each independent provider can evolve without forcing Mechanical's ordinary function API to depend on it.
