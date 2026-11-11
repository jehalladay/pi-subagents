# 03 — Architecture and package boundaries

## Architecture in one sentence

MechanicalWorkflows provides application-level composition functions; source products provide their own execution, query, context, build, inference and recovery capabilities. Remote hosting is a **projection of an ordinary function into an existing host**, not a new runtime.

```text
                       application / workflow package
                      ordinary async functions + policy
                               /             \
                    native SDK calls    optional host adapter
                         |                   |
         Forge / HX / RF / agent SDK      Furnace / CLI / remote host
                         \___________________/
                              native authorities
```

Neither side of this diagram imposes a product dependency on the other.

## Ownership table

| Concern | Owner | MechanicalWorkflows responsibility |
| --- | --- | --- |
| Package/workspace build, test, artifact | Forge | Declare source/build and use public SDK |
| Beads formulas, readiness, completion | Beads | Choose work/application policy |
| Run, Work, Attempt, retries, admission, recovery | Furnace | Request, observe, map the application outcome in a host adapter |
| Hypergraph query and coverage truth | HyperUnix | Form user-relevant query and react to partial/unknown |
| Reactive context composition/provenance | ReactiveFiber | Provide task/role input, consume render evidence |
| Model/agent lifecycle | Chosen agent SDK | Author prompts, roles, tool selection |
| Continuation capture/compatibility | RCP + runtime | Opt in only when supported |
| Development/review/integration policy | MechanicalWorkflows | Ordinary application code |
| Agent tool rendering | Provider-specific adapter | Select only allowed tools; never force generic provider runtime |
| Cross-product querying | HyperUnix provider(s), optionally | Carry refs/correlation; don't duplicate state |

## Initial repository layout

```text
/
  forge.toml                  root integration gate; not a workspace member
  forge.workspace.toml        member registry
  package.json                private npm workspaces, only build tooling
  .mise.toml                  pinned Node
  packages/development/       public ordinary-code library, no product SDK deps yet
  apps/development-rig/       host / composition root, fixture-only at this baseline
  contracts/entrypoints/     optional descriptor data
  contracts/schemas/         wire input/outcome schemas
  scripts/                    real local QA checks (run by Forge)
  docs/                       product specifications and status
```

`packages/development` is named `library:workflows-development`; `apps/development-rig` is `code:development-rig`. The app declares the library as its Forge dependency and npm workspace dependency. The root is not registered as a member because Forge doesn't support root-as-own-member in this workspace model.

## Package boundaries

The development package owns `develop(services, request)` and its **application-specific** value/result types. It cannot import provider SDKs simply to initialize infrastructure. Product-specific integration code belongs initially in the rig's composition root; if repeated by other consumers, extract an optional integration package that depends on both public SDKs.

The rig owns CLI flags, client construction, configuration, credentials acquisition, and resources it creates. When a Furnace executor host is implemented, its separate adapter will own translation from `ExecutionContext` to the app request and from `DevelopmentOutcome` to Furnace `ExecutionResult`.

A producer's native result must be retained or addressed by its reference when application summaries lose fidelity. No `GenericOperation`, `UniversalResult`, `WorkflowState`, or `WorkflowRuntime`.

## Real source versus planned extension

The code currently implements only the synthetic fixture path. `contracts/entrypoints/development.v1.json` is **descriptor-only**, not the registration point of a functioning remote host. Don't treat documented Forge workspace-family/cache capabilities, proposed Furnace idempotent establishment, or RF full-render slices as shipped.

## Dependency direction constraints

```text
development library ----> only TypeScript stdlib/application interfaces
development rig --------> development library; (future) selected SDKs
Furnace adapter --------> Furnace public SDK + development library
Forge verification adapter -> Forge public SDK + development library
agent presentation adapter -> selected provider SDK + curated product tool surface
```

No core product imports MechanicalWorkflows. MechanicalWorkflows does not import Library. No adapter forces Forge core to depend on Furnace or vice versa.

## Capacity and scalability

Application concurrency uses ordinary async controls and caller configuration. Furnace manages shared admission when expressly invoked. Forge manages build parallelism. Agent SDKs manage provider/client concurrency. No monorepo-wide scheduler. A durable parent may need to return an awaiting-child result to its host instead of occupying a scarce executor while awaiting a child; Furnace's future wakeup semantics remain native Furnace work.
