# 05 — Optional deployable entrypoints and host invocation

**Status: descriptor plus a transient local validation host.** The repository commits a descriptor and request/result schemas and `apps/development-rig/src/entrypoint-host.ts` now verifies a pinned artifact digest, one allowed entrypoint, input/bindings and conservative output semantics before/after a caller-supplied loader. It is **not** a generic remote invocation server, artifact loader or durable host. The loader is caller-owned and must load the already-checked bytes; no network transport is implemented.

## Distinction

A direct function requires no descriptor:

```ts
await develop(services, request);
```

A host on another process/machine needs to know what code to load, what input to validate, and how to construct scoped dependencies. A *deployable entrypoint descriptor* may supply that metadata. It is not a workflow-state machine, transport protocol, scheduling policy, or persistent execution object.

## Descriptor

See `contracts/entrypoints/development.v1.json` (schema version, entrypoint ID, package export, input/output schema paths and binding names). A deployment manifest, owned by Forge build outputs and the host, additionally pins an **immutable artifact digest** and compatibility evidence; a version label alone is insufficient for remote retries.

```text
Definition: package + entrypoint + schema version
Deployment: definition + exact artifact digest + host/runtime compatibility
Invocation: caller logical identity + validated input + bindings + observed correlation
Execution: local function or host-native Run/Attempt (NOT created by the descriptor)
```

## Minimal host path

1. Authenticate/authorize the caller and selected entrypoint using host-native controls.
2. Resolve the pinned artifact and verify digest/entrypoint compatibility before dispatch.
3. Validate externally supplied input schema and refuse extra/invalid fields; validate application-level invariants.
4. Resolve logical workspace/basis into a host-local materialization without assuming caller cwd paths exist remotely.
5. Construct only approved bindings (SDK clients, agent tools, credentials via host mechanisms). Do not serialize client objects or secrets.
6. Call the exported function through native language invocation.
7. Validate result representation; present native evidence refs and any native host execution identifiers.
8. Release only host-owned resources. If the host crashes between side effects and result delivery, preserve uncertainty and reconcile through the producer, not a new MechanicalWorkflows registry.

## Why no universal handle

A local Promise, Forge operation handle, Furnace Run and remote provider invocation have different lifetimes and guarantees. The public entrypoint metadata must not normalize away wait timeouts, cancellation acknowledgements, evidence completeness or durable recovery. A lost acknowledgement without an abort settles in the development rig as `DevelopmentLostAcknowledgementError` (`DEVELOPMENT_LOST_ACKNOWLEDGEMENT`, `UNCERTAIN_AFTER_LOST_ACK`), never as a retry; `reconcileUncertainEffect` is the one decision point that may permit a re-dispatch, and only on a cited native non-occurrence record.

The invocation ID identifies the caller's logical request. It is neither a Run ID nor a tool-call ID. Host-specific execution IDs remain native.

## Artifact/version compatibility

Host must refuse if artifact digest, entrypoint identity, schema or required capabilities fail compatibility checks. A retry must not silently load newer implementation code. A caller may migrate explicitly by creating a new specification and following the host's supported migration policy.

## External schema limitations

`contracts/schemas/development-request.v1.schema.json` describes the request's syntactic shape. `DevelopmentOutcome` has a **coarse discriminator schema**. It does *not* validate or certify the complete Forge evidence structure; live producers keep ownership of those contracts. If extending the external result shape, add canonical contract validation and cross-language conformance fixtures before claiming interoperation.

## No implicit durability

A function hosted by Furnace can be retried in a new Attempt. That does not mean arbitrary JavaScript locals, SDK sessions, agent calls or external effects are checkpointed or exactly once. For continuation, use actual native facilities; RCP remains optional and is not automatically wired.

## Adversarial acceptance

Mismatched artifact, unsupported binding, invalid input, malformed output and unknown dispatch must fail truthfully. A transport timeout cannot be interpreted as proof that a host never started execution. No host adapter may silently downgrade requested durable guarantees to transient invocation.

## Pinned transient host cut (2026-10-15)

`invokePinnedDevelopment()` refuses a mismatched SHA-256 file digest, wrong descriptor/id/schema/bindings, extra or empty input fields, and success-shaped output lacking native verification evidence or matching candidate basis. It never invokes the loader before preflight, never retries a loader or callback exception, and labels no transient invocation durable. The load callback is host-owned and must load only the pinned artifact; this function cannot prove that arbitrary callback behavior uses its path. Tests demonstrate the refusal boundaries against an on-disk temporary artifact. An installed-artifact loader and out-of-tree executable worker remain future work; MW-022/023/028/029 are not graduated to complete remote-host status.

## Installed local artifact journey (2026-10-15)

`invokeInstalledDevelopment()` copies an npm tarball into a fresh host-owned directory, verifies its caller-pinned SHA-256 and exact descriptor, installs only that local tarball with npm offline and lifecycle scripts disabled, checks the installed package identity and artifact digest again, and imports the installed `dist/index.js` from its isolated tree. It calls `invokePinnedDevelopment()` for input/binding/output checks. Positive and negative installed-tarball tests now run without a MechanicalWorkflows checkout imported by the *worker*. The host process still uses this rig's source code; it is not a remote container/RPC host and cannot promise durable execution or protect against concurrent malicious filesystem writers after its final digest check. Artifact signing, host-managed credentials, schema canonicalization and remote-materialization remain target work.

## New packaged function-host verification program (2026-11-04)

The [Pi Workbench interoperability program](programs/pi-workbench-interop-2026-11-04/README.md) audited the shipped `contracts/entrypoints/development.v1.json` against `apps/development-rig/src/entrypoint-host.ts` and found the descriptor's `../schemas/` values refused by the host's bare-filename checks. PIWB-MW0-R001 repaired the descriptor of record: the one canonical schema-ref grammar is a bare filename resolved in `contracts/schemas/` (no directory segment, no `..` traversal), so the host check is unchanged. `apps/development-rig/test/entrypoint-descriptor-file.test.ts` now reads the committed descriptor from the repository and runs it through `invokeInstalledDevelopment` over the actual `npm pack` tarball of `packages/development` and through `invokePinnedDevelopment`, and shows a mutated schema filename or path refused `ENTRYPOINT_CONTRACT_INVALID` before `load()`. The installed host proves local function invocation with trusted injected callbacks; it is not an arbitrary-code sandbox or the Pi/Mechanical integration, and this test alone does not make the function Pi-callable. This paragraph is a design notice, not a status upgrade. The 2026-11-09 M01 cut adds the stable `@mechanical/development-rig/host` export (`invokeDevelopmentHost`) that wraps this installed host with descriptor-digest admission and a typed `HostAdmissionError`; see docs/10 for its L2 evidence and limits.

## Pure coordination function host (PIWB-MW6-R001)

`invokePinnedReconcile()` in `apps/development-rig/src/coordination-host.ts` pins `reconcile` as a read-only function behind `contracts/entrypoints/coordination-reconcile.v1.json` (`bindings: []`) and the published `coordination-resolver-input.v1` / `coordination-resolution.v1` schemas. It reuses the closed-descriptor and bare-filename schema-reference grammar of `invokePinnedDevelopment()`, validates input before the loader and output after the call, and returns a Resolution that means admissibility only; it never applies an admitted intent. See `contracts/README.md` for the refusal codes. The function is not Pi-callable and this paragraph is not a status upgrade.
