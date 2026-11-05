# 02 — Function host architecture and versioned protocol

**Status: design only.** All `mw.pi.*` contract names and shapes below are proposed, not shipped.

## Ownership and topology

```text
Pi extension (UI/observer/operator/authorization)
  workflow_execute({definitionRef: function, input, hostMode, policy})
    -> function admission / immutable definition + grants + source scope
    -> registered MechanicalFunctionHost (local embedded or detached)
       -> Mechanical packed artifact loader (one SHA-256-pinned export)
       -> application service bundle (host-owned callbacks)
          discover: task-scoped HX with certified coverage OR honest Git-census profile
          compileContext: task/revision-grounded RF OR explicitly plain profile
          implement: Claude Agent SDK + isolated Git workspace + candidate commit
          verify: Forge gate at candidate commit/tree + native verdict
       -> Mechanical develop(services, request)
    <- typed domain outcome + producer refs + function invocation lifecycle
  workflow_observe / inspector / explicit workflow_control
  optional Furnace ExecutorApp around the same callback
```

Pi is not the source of Mechanical's domain truth; its events are projections. Mechanical does not take a Pi dependency. Native Forge, Furnace, HX, RF and Beads clients are owned, authenticated and disposed by the selected host.

## Proposed entrypoint contract: `mw.pi.function-invocation/v1`

An allowlisted descriptor is **metadata**, not executable authority. Its source is a shipped, pinned artifact:
```ts
interface FunctionDefinition {
  kind: "function";
  id: "mechanical.development.develop.v1";  // from installed verified descriptor
  schemaVersion: "mechanical-workflows/entrypoint/v1";
  artifactDigest: `sha256:${string}`;
}
interface FunctionLaunch {
  definitionRef: FunctionDefinition;
  input: { task: string; workspaceId: string; baseRevision: string };
  hostMode: "embedded" | "detached"; // selected explicitly by host policy
  profile: "git-census" | "native-task-scope";
  policy?: { allowWrites?: boolean; runFurnace?: boolean };
}
```
Do **not** implement this with unbounded arbitrary package/export loading or user-supplied callback strings. Host resolves a fixed allowlist of definition IDs to a validated artifact and installed loader, validates the manifest with its shipped schemas, checks digest from installed bytes and prevents symlink/workspace escape. A source digest match and schema match are necessary, but not sufficient: host must affirm the role/profile and rights. Import of packed code executes trusted application code; a temporary install directory is **not** process isolation.

### Existing contract repair

Mechanical checks the descriptor schema names in `invokePinnedDevelopment` and ships relative schema paths. Adopt one canonical schema-ref grammar in the Mechanical repo: repository-relative (resolved under `contracts/`) OR basename with a canonical manifest transform; never silently accept arbitrary paths. Pi consumes the canonical exported descriptor without hardcoded tests that substitute a hand-authored object. Add a corpus-file-driven contract test and reject path traversal/unknown schema.

## Authorization

Every function dispatch needs both `workbench:execute` and a **proposed** exact function-action grant (e.g. `mechanical:develop:write`), PLUS an operator-attested write boundary. Detached execution requires existing `workbench:detach` and only actual SDK tool grants needed by the implementation role. A workflow string, function argument or JSON policy cannot manufacture rights. Validate source root/realpath, user and session, scope, git cleanliness, pinned source basis, source content digests and capability manifest. Re-evaluate revoked grants at dispatch; reject changed effective identity. Read-only coordination functions use a separate grant/profile, never a blanket write right.

## Service bundle and source basis

`DevelopmentServices` callbacks are application-owned ports: `discover`, `compileContext`, `implement`, `verify`. Bind them in an application host adapter, never inside the untrusted workflow worker. The `implement` callback must operate only on a host materialized single-writer workspace. Exact source identity includes repo/worktree root (canonical), base Git commit/tree, dirtiness, gate manifest digest, versioned provider settings and relevant instruction/skill digests. Where a dependency cannot be measured, prohibit stale replay. An agent-produced changed commit is not verification; Forge must report the candidate basis and native gate verdict.

`git-census` profile reproduces the explicitly labeled existing Mechanical single-writer journey (Git tracked files, optional plain/RF context, Claude, Forge). It does not assert task-specific HX completeness. `native-task-scope` requires real HX terminal, task scope, revision, digest and complete coverage. Partial/unknown -> `needs_evidence` and no writer dispatch. RF preview and RF committed render are separate service contracts; no synthetic render ID.

## Effect and lifecycle protocol

Proposed launch reply: `{contract:"mw.pi.function-invocation/v1",status:"launched",invocationId,definitionDigest,sourceBasis,nativeRefs,completion:"not-asserted"}`. Observation terminal is separately reported with `executionStatus` (running, completed, failed, cancelled, unknown), `domainOutcome` (verified_candidate, verification_failed, needs_evidence, indeterminate or absent), `verificationVerdict` (native Forge only), `freshness`, `coverage`, and producer/native references. An adapter cannot relabel `needs_evidence` as success, infer a Forge PASS from transport success, or claim a Furnace Attempt from an invented ID.

The function is effectful even if `discover` begins as a read. Before the first write/claim/gate dispatch, persist an identity and intent row; record dispatch independently from settlement. Never blindly retry an unknown result or replay an effect. A retry requires producer-native reconciliation and an explicit, scoped operator decision. A fresh read may be re-executed; a historical read is stale. Treat a terminal function result as a separate observation from the native provider's verification event.

### Cancellation, pause and retry

Honor caller cancellation while waiting in admission, before loading, before SDK query and after native dispatch. An interrupt acknowledgement is not rollback of an agent commit or native Forge/Furnace effect. On stop, retain the candidate's commit/ref and native refs; classify unclear effects as uncertain. The host must not ask Pi to kill an externally owned Furnace Run merely because an inspector closes. Operator control targets an exact invocation, child/Attempt ID and authority grant. Shared SDK cancellation belongs to its producer; pause is at admission boundaries unless producer supports pause.

### Host modes

- **Embedded:** Pi process owns function invocation and child SDK handles, records structured events, and cannot survive its own crash. First positive path.
- **Local detached:** independently owned local host with pinned snapshot and transport, separate grant, reattach by native invocation ID; secure same-machine DAC only. Fix the existing Claude empty-grants refusal and validate orphan/launch-unknown.
- **Furnace-hosted:** the existing `FurnaceHostedExecutor` wraps exactly one callback per Run; Furnace owns retry and Attempt identity. Never use Pi's journal as a second Furnace database. Host crash has no magic JS-stack restoration.
- **Coordination functions:** pure evaluation from `@mechanical/workflows-coordination` may be a lower-risk first consumer; proposals need an independent resolver/authority before any external action.

## Performance and resource policy

Admission is across simultaneous Pi invocations, not merely one script's semaphore. Name max concurrent Claude SDK queries, host child processes, native Forge operations, memory/output bytes and queue wait; backpressure with observable reason, not silent fanout. Trace each stage with monotonic timing, bounded progress, per-provider bytes and native IDs. Do not encode an unrelated global scheduler or turn Forge/Furnace into dependencies of each other.
