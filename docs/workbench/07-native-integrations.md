# 07 — MechanicalWorkflows and ecosystem native SDK integration

## MechanicalWorkflows is an ordinary function library

**Current evidence:** https://github.com/jehalladay/MechanicalWorkflows, docs/04-public-programming-model.md, docs/06-sdk-integration-and-hosts.md, docs/11-decisions-and-non-goals.md. The shipped @mechanical/workflows-development exports develop(services,request) with four injected callbacks; its rig is currently **fixture only**. contracts/entrypoints/development.v1.json declares optional descriptor-only entrypoint metadata.

Host integration:
1. Resolve requested entrypoint package/export and pinned artifact digest; reject incompatible host ABI.
2. Validate request against descriptor schema and application invariants.
3. Construct a scope-limited service dependency object from native SDK clients owned by this host.
4. Call exported function directly, or delegate to Furnace ExecutorApp where selected.
5. Validate output and record native evidence references; preserve four existing outcome variants.
6. Dispose only host-owned clients. Client disconnect does not imply detached native child stop.

No MechanicalWorkflows dependency on Workbench, no mandated graph DSL, no mandatory registration inside MechanicalWorkflows. Descriptor introspection helps catalog only; it is not already a deployment/runtime loader.

## Forge provider

Use public Forge TypeScript App Server/facade or other current SDK. Initial functions: build/verification, affected/incremental selection, inspect artifact and operation. Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states. A successful RPC or shell exit does **not** equal verified Forge PASS. Prefer Forge first for gates, test, build and packaging. Workspace Families and global cache designs must be probed for actual shipped availability before calling child creation or cache APIs.

## Furnace provider

Use public TypeScript client for runs.start/get/status/events/pause/stop as verified. Native Run/Work/Attempt and supervision semantics remain Furnace's. Future idempotent ensure/reconcile and convenience wait methods are upstream targets, not an assumed API. Ambiguous runs.start timeout -> uncertain/reconcile; do not issue second start blindly. A Furnace host may use ExecutorApp to call MechanicalWorkflows function, with application outcome mapped explicitly to Furnace execution result; don't conflate transport success and domain verification.

## HyperUnix provider

Use typed TS HX SDK/HXQ builder/results; preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence. Incomplete query cannot silently authorize "nothing to do" or produce false success. Graph query as observation enhancement is optional; HX is not mandatory UI event storage.

## ReactiveFiberCLI provider

Use actual public render/context APIs; present Python/CLI interop honestly if no production TypeScript SDK exists at selected revision. Do not declare a typed TS context-render client exists without code evidence. Return actual context text, producer/render reference, model/input/source basis, necessity/budget result and partial/refused status. Fixture text is never reported as real generated context.

## Beads provider

Beads retains readiness, formulas and logical task dependencies. Workbench may inspect supported scopes and surface linked work; it does not store an authoritative second readiness DAG. No assumed stable Beads SDK if only other integration contracts are available.

## RCP provider

Optional future continuation projection/adaptor, only when compatible native capture/restore exists. No promise of restoring an ordinary JavaScript stack from a Furnace restart.

## Agent provider

Use Claude Agent SDK for workflow agent(). Role-specific tool catalogs may include restricted Forge/HX/Furnace/RF actions through the provider edges, not a universal all-tools conversion. Native Claude SDK hooks/session records remain first-class.

## Shared integration requirements

Every live adapter records: SDK package + revision, native operation IDs, owner/basis, observed evidence, error taxonomy, trace correlation, cancellation/timeout semantics, and cleanup ownership. For a missing API, produce upstream feedback with smallest reproducer, accepted behavior, and explicit blocker. Avoid quietly writing a private reimplementation of an upstream feature.

## First realistic vertical journey

Real HX scope -> real RF context -> Claude SDK implementing agent in controlled workspace -> real Forge verification -> optional Furnace-supervised full gate. First usable cut may deploy HX + Forge nodes independently before RF/MechanicalWorkflows reach live vertical readiness. Never call fixture success a live end-to-end journey.