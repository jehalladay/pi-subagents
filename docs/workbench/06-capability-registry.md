# 06 — Capability registry, typed node providers and agent tools

## Location and scope

The registry belongs to the **workbench host**, not MechanicalWorkflows and not Forge/Furnace/HX/RF. It is optional per running host; its job is discover/authorize/dispatch/inspect operations, not own their state machines. A producer-specific adapter may register one or several narrow operations. Providers are independently installable; no required dependency on every SDK.

## Proposed capability descriptor

    type CapabilityDescriptor = {
      id: string;                      // e.g. "forge.build"
      version: string;                 // immutable API contract version
      description: string;
      inputSchema: JsonSchema;
      outputSchema?: JsonSchema;
      effectClass: "read" | "write" | "external" | "unknown";
      permissions: string[];           // host policy requirement identifiers
      supportedModes: ("invoke" | "inspect" | "observe")[];
      contractSource?: string;         // SDK docs / source ref and version
    };

    type CapabilityProvider<I,O> = {
      descriptor: CapabilityDescriptor;
      invoke(input: I, ctx: ProviderInvocationContext): Promise<O>;
      inspect?(ref: NativeRef, ctx: ProviderReadContext): Promise<NativeSnapshot>;
      observe?(ref: NativeRef, ctx: ProviderReadContext): AsyncIterable<NativeUpdate>;
    };

This contract is **workbench-facing**. Native output remains recoverable as an original native object/result reference where serializable, and rich producer status must not be flattened into a boolean. The "effectClass" is a conservative routing hint, not an exactly-once guarantee.

## InvocationContext

Must include: pinned source/deployment digest, workflow invocation reference, logical node call ID, caller identity/role, explicit capability grant, subject workspace/source basis, cancellation signal for current wait, trace parent, and host-only provider bindings. Native clients and credentials never cross script VM boundary.

## Registration and resolution

- Provider ID and semantic contract version unique; collisions fail at startup/registration with diagnostic.
- Discovery returns permitted metadata only; never implies invoke permission.
- Provider package may be lazy loaded upon first authorized invocation.
- Build a finite allowlist for each Pi tool, each Claude role/tool server and each workflow host; no "everything registered = everything executable".
- Capability aliases, if needed, map to one canonical ID with explicit deprecation; no fuzzy semantic lookup during execution.
- Validate input both at RPC entry and provider boundary (prevent TOCTOU under dynamic bindings); validate output representation without erasing unknown producer fields.
- Establish max input/output sizes, execution deadlines, memory/event quotas and secret redaction.
- No generic auto-retry; producer-specific adapters alone may reconcile native logical identities.

## Tool exposure

**Pi side:** register concise discovery/invocation/observation tools and Pi commands. Pi does not need hundreds of eagerly advertised provider-specific tools. Allow on-demand capability contract retrieval.

**Claude Agent SDK side:** expose a curated subset through documented custom MCP tools/in-process MCP servers (or other verified native tool API). Include permissions, tool identity, bounded observations and redaction. Do not prescribe generic "asTools()" in core SDKs; provider edge owns adaptation.

**Script side:** node() is a deterministic host RPC, not an LLM tool call. Agent tool calls and script node calls are separately observable.

## Optional inspect/observe

A capability can invoke once and return a value; not all operations expose long-lived status. For native operations with a Run/operation ID, advertise independent inspect/observe. A one-shot function need not implement fake "poll until done" semantics.

Observe must support snapshot and event stream if native provider supports them; otherwise explicit polling with provider-specific freshness. Control actions are separate, explicitly registered by a provider with per-action preconditions and acknowledgements. No mandatory universal pause/resume/cancel methods.

## Discovery examples (proposed identifiers)

- mechanical.development.develop.v1 -> ordinary function via bound services
- forge.build -> Forge typed operation + native evidence
- furnace.runs.start/get/events -> native Run client
- hyperunix.query -> typed HXQ with coverage and bounds
- reactivefiber.render -> supported verified render interface, otherwise capability unavailable with blocker
- claude.session.observe -> Claude SDK events/transcript while controlled by Workbench

These names are design examples, **not claims they are existing SDK function names**.

## Conformance tests

- Same capability in workflow node() and Pi invocation uses identical authorization and input contracts.
- Read-only agent cannot invoke write capability even if it knows ID.
- Missing native SDK/provider is explicit error, not silent CLI fallback.
- Unknown effects never auto-retry after disconnect.
- Registry provider hot change does not silently alter a running pinned execution. Version/digest mismatch must fail or explicitly begin new invocation.
## Current experimental policy surface

Registered descriptors do not grant access. Invocation requires every explicit producer permission in the descriptor. A descriptor with no producer permission requirements still needs exact `invoke:<capabilityId>`. Catalog discovery independently requires exact `discover:<capabilityId>`. Optional provider inspection requires `inspect:<capabilityId>` and an advertised, implemented inspect mode. No universal observe/control methods are manufactured for producers.

The host registry bounds JSON depth, bytes and wait deadlines. Errors retain validation, authorization, unavailable, transport and uncertain-effect categories through worker RPC. A deadline stops the caller's wait; it does not establish producer rollback. An effectful invocation that loses a usable answer remains uncertain and is not retried automatically. Host principal/workspace annotations are audit metadata until the entrypoint's scope checks and deployment identity supply actual authority.

Configuration uses an explicit finite `workbench.capabilityGrants` array. Selecting Claude does not supply native grants. Unknown or malformed permission data denies access. Provider-specific resource scope remains enforced by native adapters and host wiring; this policy increment is not a complete cross-tenant or expired-token authorization service.
