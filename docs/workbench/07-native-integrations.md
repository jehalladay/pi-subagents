# 07 — MechanicalWorkflows and ecosystem native SDK integration

## MechanicalWorkflows is an ordinary function library

**Current evidence:** https://github.com/jehalladay/MechanicalWorkflows, docs/04-public-programming-model.md, docs/06-sdk-integration-and-hosts.md, docs/11-decisions-and-non-goals.md. The shipped @mechanical/workflows-development exports develop(services,request) with four injected callbacks; the documentation baseline described its rig as fixture-only. A later read-only inspection on 2026-10-15 found a narrower RF/Claude/Forge live rig, but not the required HX-task-scoped Pi binding. See `TRACEABILITY.md` for artifact pins and limitations. contracts/entrypoints/development.v1.json declares optional descriptor-only entrypoint metadata.

Host integration:
1. Resolve requested entrypoint package/export and pinned artifact digest; reject incompatible host ABI.
2. Validate request against descriptor schema and application invariants.
3. Construct a scope-limited service dependency object from native SDK clients owned by this host.
4. Call exported function directly, or delegate to Furnace ExecutorApp where selected.
5. Validate output and record native evidence references; preserve four existing outcome variants.
6. Dispose only host-owned clients. Client disconnect does not imply detached native child stop.

No MechanicalWorkflows dependency on Workbench, no mandated graph DSL, no mandatory registration inside MechanicalWorkflows. Descriptor introspection helps catalog only; it is not already a deployment/runtime loader.

CACWorkflowCompositionV0 is design-only (the MechanicalWorkflows cac-workflow-composition-2026-10-18 program states it as a concept only, with no released schema or type), and no Pi surface consumes it; when a release ships it and a Pi surface consumes it, Pi carries each step and source-artifact ID only as a native reference equal to the producer's own ID, counts a step or source without one as an unmapped entry, and never mints a Beads task ID, a Forge operation or gate ID, or a Furnace Attempt ID from composition fields.

## Forge provider

Use public Forge TypeScript App Server/facade or other current SDK. Initial functions: build/verification, affected/incremental selection, inspect artifact and operation. Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states. The gate.status reader echoes the producer's per-package derived-verdict basis (last_result_state.invalidation_basis.derived_from) as the package snapshot basis, distinct from the workspace basis of WB-025 (02-atomic-requirements.md), and quotes the producer's freshness word verbatim; it never recomputes freshness, never fabricates a basis when the descriptor is absent or malformed, and freshness never confers current authority (authoritative_current alone does). A successful RPC or shell exit does **not** equal verified Forge PASS. The gate.run reader carries the producer's selected-versus-complete universe (data.selection_accounting for the declared steps or members, data.selection for the tests) beside the operation's verdict as its own facet; a run that selected fewer units than it declared or narrowed its tests renders partial, a selection that is not well formed renders unknown, neither ever renders success, and a gate-step node carries only its own step's outcome, never the workspace verdict. Prefer Forge first for gates, test, build and packaging. Workspace Families and global cache designs must be probed for actual shipped availability before calling child creation or cache APIs.

## Furnace provider

Use public TypeScript client for runs.start/get/status/events/pause/stop as verified. Native Run/Work/Attempt and supervision semantics remain Furnace's. Future idempotent ensure/reconcile and convenience wait methods are upstream targets, not an assumed API. Ambiguous runs.start timeout -> uncertain/reconcile; do not issue second start blindly. A Furnace host may use ExecutorApp over the per-Attempt embedded bridge to call a MechanicalWorkflows function, with the application outcome mapped explicitly to the four-word Furnace execution result (only status is read; failure_class and data are not); failure and indeterminate park the Run rather than retrying, cancellation is a cooperative AbortSignal, and transport success is never domain verification.

## HyperUnix provider

Use typed TS HX SDK/HXQ builder/results; preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence. Incomplete query cannot silently authorize "nothing to do" or produce false success. Graph query as observation enhancement is optional; HX is not mandatory UI event storage. An HX answer is an observation only: the hyperunix.find reader adapter projects one hyperunix.query.snapshot whose evidence references are hx-binary and hx-coverage references only and no Beads, Forge, Furnace or Git kind or reference, and its one possible edge is the display grouping from the invoking operation the host names, so an HX answer never closes Beads work, passes a Forge gate or stands for a Furnace state or a Git basis.

## ReactiveFiberCLI provider

Use actual public render/context APIs; present Python/CLI interop honestly if no production TypeScript SDK exists at selected revision. Do not declare a typed TS context-render client exists without code evidence. Return actual context text, producer/render reference, model/input/source basis, necessity/budget result and partial/refused status. The RF capability accepts either {model, task} or {view, taskId} with an optional model, never both, and spawns only --no-commit --no-input --json renders. The swarm RF workspace root is an operator setting, workbench.reactivefiberWorkspaceRoot, under the unchanged reactivefiber:render grant, with single-host scope: multi-host use of a swarm workspace on a shared filesystem is unsupported and not safe. RF_WORKSPACE and SWARM_RF_WORKSPACE are the allowlisted operational names a hosted agent learns the swarm workspace from, identical on the embedded and the detached host. The legacy {model, task} argv is frozen byte for byte (SCG-R025). For the shared "SDK package + revision" record, the RF adapter records the producer release that provenance.cli_version states as one rf-cli evidence reference, never as sourceVersion, and the TSX engine identity that provenance.sdk_versions.tsx_runtime/tsx_sdk state as one rf-engine evidence reference per entry. The RF contractSource names the rf version of a recorded measurement receipt, and the rf-preview live tier guards drift against rf --version --json. Fixture text is never reported as real generated context.

## Beads provider

Beads retains readiness, formulas and logical task dependencies. Workbench may inspect supported scopes and surface linked work; it does not store an authoritative second readiness DAG. No assumed stable Beads SDK if only other integration contracts are available.

## RCP provider

Optional future continuation projection/adaptor, only when compatible native capture/restore exists. No promise of restoring an ordinary JavaScript stack from a Furnace restart.

## Agent provider

Use Claude Agent SDK for workflow agent(). Role-specific tool catalogs may include restricted Forge/HX/Furnace/RF actions through the provider edges, not a universal all-tools conversion. Native Claude SDK hooks/session records remain first-class. A Claude agent() call's completion, its transcript and its session reference are observations only: the Claude topology adapter projects claude.call, claude.session and claude.tool-use snapshots with partial or unknown coverage and no Forge, Furnace, Beads or Git snapshot, edge or reference, and a claude-message evidence read carries no status or verdict, so a failed Forge gate stays failed and an open Beads item stays open whatever the transcript says.

## Shared integration requirements

Every live adapter records: SDK package + revision, native operation IDs, owner/basis, observed evidence, error taxonomy, trace correlation, cancellation/timeout semantics, and cleanup ownership. For a missing API, produce upstream feedback with smallest reproducer, accepted behavior, and explicit blocker. Avoid quietly writing a private reimplementation of an upstream feature.

## First realistic vertical journey

Real HX scope -> real RF context -> Claude SDK implementing agent in controlled workspace -> real Forge verification -> optional Furnace-supervised full gate. First usable cut may deploy HX + Forge nodes independently before RF/MechanicalWorkflows reach live vertical readiness. Never call fixture success a live end-to-end journey.