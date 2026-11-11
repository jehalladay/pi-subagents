# MechanicalWorkflows

**Bead-machine field-convergence program (proposed, 2026-11-07):** [This repository's design, implementation work packages and agent-skill acceptance](docs/programs/bead-machine-field-convergence-2026-11-07/README.md). Start locally; no Library design checkout is required.


**Composable agentic workflows as ordinary software.** MechanicalWorkflows is a small Forge-managed workspace of independently installable workflow libraries and applications. It is **not** a workflow engine, scheduler, durable-state database, agent SDK, or replacement for Furnace, Beads, Forge, HyperUnix, ReactiveFiber, or RCP.

**Status: first real composition code (2026-10-11).** The development rig now implements an opt-in, single-writer **Claude Agent SDK → committed Git candidate → native Forge full gate** journey, plus standalone native Forge verification and an optional Furnace gate executor. Git tracked-file discovery and plain context are explicitly **not** HyperUnix or ReactiveFiber. A real installed-Forge gate journey (native PASS, native FAIL, dirty refusal) was witnessed on 2026-10-15 — see `qa/integration/2026-10-15-live-forge-gate.md`; a Furnace-hosted gate and one bounded end-to-end Claude SDK candidate with native Forge PASS were witnessed; earlier larger attempts remained incomplete, and unit mocks do not establish product success. A bounded RF-context and Beads-claimed agent/Forge journey plus a separate read-only reviewer recovery one unattended rejected→repair→approval→Forge PASS journey and one two-candidate isolated-worktree selection with review and Forge PASS on a scratch package were also witnessed (the selection host is the `--live-select` CLI command); the same gate and development functions also ran under real Furnace Runs through the process driver (PASS, FAIL, misconfiguration and a full development Attempt, `qa/integration/2026-10-15-furnace-process-host.md`); full task-scoped HX, release-quality Furnace SDK hosting, remote deployment and isolated swarms remain open. See [status](docs/10-current-state-and-gaps.md).

## Workspace

| Forge member | Package | Purpose |
| --- | --- | --- |
| `library:workflows-development` | `@mechanical/workflows-development` | Typed ordinary development composition function; no provider SDK dependencies. |
| `code:development-rig` | `@mechanical/development-rig` | Fixture, optional real Claude+Git+Forge development, real Forge verification, and optional Furnace gate executor. |
| `library:workflows-coordination` | `@mechanical/workflows-coordination` | Pure coordination policy ports, composition operators and deterministic resolver for the collective-adaptation program (M0); no effects, no provider SDK dependencies. |

The repository root has a **separate Forge root gate** and is not registered as a workspace member. Source packages and optional adapters are added only when proven necessary. **Library is not a dependency**, submodule, required checkout, or source of ambient configuration.

## Quick start

Requires Node 22.18+ and npm; `.mise.toml` pins a supported development Node. The `forge` executable is needed for Forge gates. From a checkout:

```sh
mise install                         # if using mise
npm ci                               # install exact dependencies from committed package-lock.json
forge workspace lock                 # generate Forge workspace lock, if required by installed Forge
forge build                          # root source and documentation gate
npm test                             # standalone Node/TypeScript checks
npm run fixture -- --task "Check the parser" --workspace example --revision base-1
```

The last command runs **in-memory fixtures only**, prints a JSON result labeled `mode: "fixture"`, and must not be represented as real development or verification. The fixture is synthetic. To use a **real Forge gate** on an existing committed and clean Forge package, install the compatible `@forge/sdk` package and run `node apps/development-rig/dist/cli.js --live-verify --workspace /absolute/path/to/package --forge-bin forge`. For an opt-in **single-writer agent implementation** in a trusted isolated workspace, install the public Claude Agent SDK too and use `--live-develop --workspace /repo/package --task "Implement X" --allow-writes`. This edits and commits source and then gates it with Forge. It is *not* yet an RF/HX-backed development swarm. See [live verification](docs/13-live-forge-verification.md) and [live development](docs/14-live-single-writer-development.md).

## Public usage

```ts
import { develop } from "@mechanical/workflows-development";

const result = await develop(
  { discover, compileContext, implement, verify },
  { task: "Fix parser", workspaceId: "repo-A", baseRevision: "commit-123" },
);
```

Those four functions are **application-owned, typed dependencies**. They are not a new provider interface standard. The workflow does not own or close the clients behind them.

## Pi Workbench interoperability — current implementation program (2026-11-09)

[Full package-local audit, host contract, implementation packets and mandatory verification/release tail](docs/programs/pi-native-interoperability-2026-11-09/README.md) is the current implementation handoff. The committed descriptor and installed local loader are repaired, and Mechanical has bounded native Claude/Git/Forge journeys, but the separately installed application host has no stable Pi consumer export yet; Pi's registered `workflow_execute` still refuses `function` definitions. This is **not** a runnable Pi→Mechanical function integration. Git-census/plain is the first target; HX task coverage and committed RF context require separate native proof. The [November 4 design](docs/programs/pi-workbench-interop-2026-11-04/README.md) and [November 6 audit](docs/programs/pi-workbench-interoperability-audit-2026-11-06/README.md) remain dated history. Follow the [mechanical-pi-host skill](.agents/skills/mechanical-pi-host/SKILL.md).

## Developer documentation

Start with the [developer corpus](docs/README.md), especially the [requirements](docs/02-atomic-requirements.md), [architecture](docs/03-architecture-and-package-boundaries.md), [programming model](docs/04-public-programming-model.md), [external invocation contract](docs/05-deployable-entrypoints.md), [SDK integration](docs/06-sdk-integration-and-hosts.md), [recovery semantics](docs/07-identity-effects-and-recovery.md), [QA](docs/08-qa-and-conformance.md), and [flat implementation program](docs/09-implementation-program.md).

## Build and contribution rules

Use Forge as the first build/gate interface; report gaps rather than bypassing it as policy. Root commands wrap basic Node build tools **under Forge**, not as a competing build system. No GitHub CI. Do not add a dependency on Library. Tests must reject fake PASS, partial-to-success coercion, lost basis, and hidden work. The MIT license is at [LICENSE](LICENSE).


## Reactive Fiber feedback and agent adoption (November 2026)

The [repository-specific audit and design program](docs/programs/rfcli-feedback-adoption-2026-11-04/README.md) maps ReactiveFiberCLI feedback to this package's contracts, implementation packets and acceptance tests. The [agent adoption guide](skills/mechanical-workflows-rf/SKILL.md) starts with existing capabilities and clearly separates proposed work from runnable APIs. These documents do not imply new runtime functionality or test qualification.
