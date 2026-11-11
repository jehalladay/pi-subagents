# 01 — Product goals and user journeys

## Purpose

Provide reusable application behavior that composes existing ecosystem SDKs through idiomatic TypeScript (and independently Python where real consumers need it). The first consumer is a development rig that scopes code, compiles context, invokes agents, verifies candidates and eventually establishes a durable release gate. A swarm should launch a small workflow package, not clone the full Library archive.

## Product properties

1. **Small**: a workflow is an exported function receiving caller-owned dependencies and input. It needs no graph model, global runtime or registry to run locally.
2. **Selectable**: separately installable packages and deployment artifacts select only the SDKs an application role needs. One optional provider must not drag all other providers into its dependency tree.
3. **Semantically honest**: Forge owns build truth; Beads owns work readiness; Furnace owns Run/Work/Attempt, supervision, resource admission and recovery; HX owns query completeness; RF owns context provenance; agent SDK owns its sessions and turns.
4. **Hostable without rewriting**: direct call is the baseline; a thin CLI host and later a Furnace executor can call that same function. Each host claims only its real guarantees.
5. **Observable**: native operation IDs and source/artifact bases are retained, with external correlation when available; no second authoritative workflow ledger.
6. **Forge-native**: Forge workspace members encapsulate builds, tests, artifacts and eventual incremental selection. The project dogfoods Forge rather than teaching agents to avoid it.

## Primary journeys

**J1 — Consume one workflow library.** An application imports `develop`, supplies four native or application-local service callbacks and receives a typed domain outcome. No host manifest required.

**J2 — Run a safe local fixture.** An implementer runs the development-rig with `--fixture`, observes a JSON result explicitly labeled synthetic, and sees fail-closed validation of coverage, stale basis, and missing verification evidence. A real task is not claimed to have been executed.

**J3 — Real single-writer development (TARGET).** A local composition root connects HX, RF, selected agent SDK and Forge; scopes code; compiles role context; edits through one writer; verifies the actual candidate; reports native references, partial/unknown without fabrication.

**J4 — Optional durable verification (TARGET).** The same application establishes a Furnace formula/Run for an expensive Forge verification through a Furnace executor callback. Detach/observe/reattach use Furnace APIs and never duplicate an uncertain Run blindly.

**J5 — Independently deployed worker (TARGET).** Forge produces a pinned executable artifact. A host validates the input contract, resolves scoped clients and workspace materialization, calls the function, and frees only host-owned resources. No Library checkout or root monorepo checkout in the worker.

**J6 — Isolated swarm (TARGET).** After Forge Workspace Families ships, workers write to separate child workspaces, and one explicit integration step creates/verifies a new candidate basis. Sharing an immutable cache never means sharing mutable state or reusing a gate verdict.

**J7 — Agent invokes a workflow (TARGET).** A provider-specific agent adapter exposes a *curated application capability*. Tool return status is distinct from the application's domain outcome and from Furnace Work status. No universal `asTools` in the core SDKs.

## Non-goals

Not a general job scheduler, DAG DSL, executor platform, replay engine, global resource budget, credential store, universal tool interface, universal agent runtime, HyperUnix state clone, or replacement for Beads/Furnace/Forge. No attempt to achieve universally exactly-once external effects.

## Success measures

- A real developer can follow the local function API without learning an additional workflow language.
- A live single-writer vertical slice reaches an established Forge result and retains the producer's diagnostic/evidence information; mocks don't count.
- A Furnace-hosted execution uses Furnace's executor SDK and makes no unsupported durability claim.
- Runtime/build dependency graph excludes Library and optional unused providers.
- Measured glue code, startup/process overhead, poll loops, and uncertain-operation workarounds are visible upstream feedback instead of becoming hidden permanent infrastructure.
