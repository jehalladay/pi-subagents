# 12 — Forge workspace, packaging and deployment operations

## The current monorepo

At root, `forge.workspace.toml` registers exactly `library:workflows-development` and `code:development-rig`. The root `forge.toml` remains a separate Forge package with an integration gate. Both members have their own `forge.toml`, `package.json`, source and test roots. The app depends on the library in both the Forge member dependency table and npm workspaces.

```text
mechanical-workflows (Forge workspace)
  root Forge package (integration gate, not workspace member)
  packages/development   library:workflows-development
  apps/development-rig   code:development-rig -> library:workflows-development
```

Do not turn the repository root into a workspace member. Add new members with explicit Forge refs and on-disk package manifests, not implicit directory discovery.

## Bootstrap

```sh
mise install
npm install
forge workspace lock
forge build
npm test
npm run fixture -- --task "Verify parser" --workspace demo --revision base
```

Node 22.18+ is declared in package engines. Direct TypeScript and `@types/node` development versions are pinned in the root package, and transitive dependencies are lockfile-pinned in the committed `package-lock.json`; release reproducibility still needs an installed-artifact consumer test. On the actual host, inspect `forge explain` and `forge gate` rather than assuming a command's success from its presence in a TOML file.

The root Forge gate wraps Node tooling through declared `[build.commands]`. npm/TypeScript are the implementation toolchain, not a replacement authority for Forge.

## Build artifacts and dependency boundaries

The library package emits `dist/` JavaScript and type declarations. The rig emits an executable CLI. Future distributables should be built and certified through Forge-supported artifacts. A deployed worker should contain the selected package, runtime, its required SDKs and config—not the whole Git repo, Library or unrelated workflow packages.

Role profile examples (TARGET): `implementation` may need agent SDK, Forge and HX; `verification` may need Forge SDK and Furnace executor SDK; `research` may need HX and selected model provider. The actual install dependency graph must prove isolation; optional configuration alone does not prove packages were excluded.

### Packaging acceptance (TARGET)

- Publish/pack library and executable without reading sibling source directories.
- Install artifacts in a clean external directory and run unit plus entrypoint smoke; no source checkout.
- Validate artifact digest and contract schema at a host boundary.
- Fail if transitive dependencies require Library or unused provider families.
- Record versions of Forge, host runtime and all provider SDKs in execution evidence.

## Workspace/materialization

A remote worker receives logical workspace identity and an expected source basis, not merely the caller's absolute path. Forge's Workspace Families may eventually provision child materializations and share immutable compatible cache objects. Until shipped, keep single-writer semantics and explicitly record root/basis. Do not confuse `workspaces/` source checkout convention with a native Forge child instance.

## Configuration and secrets

Local app configuration lives at the composition root; product SDKs receive explicit settings. Credentials remain under the host's credential mechanisms. Never serialize SDK objects or access tokens into the remote entrypoint descriptor, request schema or receipt. Separate artifact identity from runtime configuration and subject/workspace identity.

## Resource and lifecycle

The application constructs and closes connections it owns. Workflow library callbacks borrow clients. Furnace executor hosts may outlive client calls; Run liveness and supervision remain Furnace facts. Use application concurrency limits for transient agent work and Furnace admission when native shared scheduling is required. Avoid blocking all Furnace seats on nested child Runs; ordinary `await` does not park an Attempt.

## Changes and releases

Use Forge gates and local QA; avoid GitHub CI. Make schema/API changes with versioned contracts and negative fixtures. No generated skill is claimed here. If a skill is eventually added, follow the owning product's skill-generation patterns rather than introducing a hand-maintained divergence.

## Troubleshooting

- `npm test` fails missing modules: perform `npm install` from the repo root; never claim successful compilation without actual package installation.
- Forge reports stale lock: `forge workspace lock`, examine Forge's structured reason codes.
- Rig refuses `LIVE_DEVELOPMENT_NOT_IMPLEMENTED` without an explicit mode: use `--fixture` only for synthetic smoke, `--live-verify` for a real Forge gate, or `--live-develop --allow-writes` for opt-in agent changes.
- Fixture prints a PASS-like verdict: this is synthetic and labeled; not a real Forge certificate.
- Root gate/SDK mismatch: use installed SDK public surface; amend the app or upstream, not by importing private modules.

## Local npm packaging under Forge (2026-10-15)

Both TypeScript member manifests override Forge's default `pnpm pack` with `package = "npm pack --ignore-scripts"`, matching this repository's pinned npm workspaces. `forge package --path packages/development` and `forge package --path apps/development-rig` produced npm tarballs locally. The rig package publishes only `dist/` and its README, not source, tests, or unrelated SDK providers. This is not a registry release; installed-artifact consumer smoke is required before MW-028/MW-051 graduate.

Local installed-consumer smoke: `forge package --path packages/development`, `forge package --path packages/coordination`, `forge package --path apps/development-rig`, then `./qa/integration/installed-consumer.sh` (for a known clean Forge test package, set `MW_CLEAN_FORGE_PACKAGE=/absolute/path`). The script installs one packed tarball for every rig runtime dependency (development, coordination) plus the rig, refusing with `PACKAGE_TARBALLS_MISSING` that names each absent tarball; it creates a fresh external npm install, checks the installed library/CLI without source imports, asserts the installed rig's dependency set equals `apps/development-rig/package.json` and that each dependency resolves from the external install, and refuses unexpected provider dependencies. The smoke runs in no Forge gate step; the `structure` step instead carries the static `INSTALLED_CONSUMER_SMOKE_STALE` guard (`scripts/check-structure.ts`), which fails when the tarball set or the assertion list drifts from the rig manifest. It does not require Library or publish anything to a registry.

## Offline container worker smoke (2026-10-15)

`qa/integration/container-worker.sh` runs a local `docker` container with network disabled and root filesystem read-only. It mounts only a pinned Node binary, the Forge-built development-library npm tarball and a standalone worker entrypoint; no MechanicalWorkflows source checkout or Library is mounted. The worker verifies the tarball SHA-256 before extracting the package to ephemeral memory-backed storage, imports the built `dist/index.js`, and exercises a partial-scope negative control. The root Forge `evidence` step also tests wrong-digest refusal and successful installed import outside Docker. This is a local OCI smoke, not an AgentCore or production deployment, and it does not provide provider SDK credentials or remote source materialization.

## Fresh-clone reproducibility and provider SDK prerequisites (2026-10-15)

A fresh `git clone` plus `npm ci` passes the root Forge gate with **no** provider
SDK installed: every gate test injects fakes, and the installed-host and
container-worker tests now `npm pack` the library at test time instead of
reading an untracked tarball (a fresh clone had failed exactly there). The
live paths load `@forge/sdk`, `@anthropic-ai/claude-agent-sdk`,
`@hyperunix/sdk` and `@furnace/sdk` dynamically and refuse with
`*_SDK_NOT_INSTALLED` when absent. On the development host they are installed
out of band and are therefore `extraneous` to `npm ls`: the three in-house SDKs
as `npm install --no-save` links to their `sdk/typescript` checkouts under the
PrimaryInstallation workspace, the Claude Agent SDK from the registry. They
are deliberately not declared dependencies of either package (MW-051); the
witnessed live journeys depend on that host preparation and say so.

**Correction (2026-10-15, later the same day).** The claim above was false
between the TypeScript conversion and the fix recorded in the evidence file
named below (both at `79c1a22` and its successor commit): once the `typing`
step type-checked `qa/**`, a fresh clone with no provider SDK failed with
`qa/adversarial/forge-gate-cancel.ts(13,117): error TS2307: Cannot find module
'@forge/sdk'`, because that script's dynamic-import fallback named the SDK as a
string literal, which `tsc` resolves even inside `import()`. The Orchestration
Engineer peer found it in its own rig clone (`npm ci` then `forge build`) and
it reproduced here from a fresh `git clone` of `79c1a22`. The fix loads the
fallback through a non-literal specifier, like `live-gate.ts`, and the
`structure` gate step now refuses any string-literal `import`, `from` or
`require` of `@forge/sdk`, `@anthropic-ai/claude-agent-sdk`, `@hyperunix/sdk`
or `@furnace/sdk` under `scripts/`, `qa/`, `apps/` and `packages/`
(`OPTIONAL_SDK_LITERAL_IMPORT`), with the scanned sources declared as that
step's inputs. Evidence of the red and green fresh clones:
`qa/integration/evidence/2026-10-15-fresh-clone-typing-recovery.json`.

### Exact bootstrap

A fresh clone needs only the lockfile install; the gate must pass with no
provider SDK present:

```sh
git clone https://github.com/jehalladay/MechanicalWorkflows && cd MechanicalWorkflows
mise install            # Node 24 and Python per .mise.toml
npm ci                  # exact dependencies from package-lock.json; no provider SDK
FORGE_JSON=1 forge build
```

The live paths (`--live-verify`, `--live-develop`, the QA drivers under `qa/`)
additionally need the provider SDKs, installed out of band and never declared
in any `package.json` (MW-051). On the development host they are the
`sdk/typescript` checkouts of the sibling tool repositories, linked with
`--no-save` so `package-lock.json` stays untouched, plus the public Claude
Agent SDK from the registry:

```sh
# from the MechanicalWorkflows root; each checkout must already carry its built dist/
npm install --no-save \
  /abs/path/PrimaryInstallation/src/Forge/sdk/typescript \
  /abs/path/PrimaryInstallation/src/HyperUnix-CLI/sdk/typescript \
  /abs/path/PrimaryInstallation/src/Furnace/sdk/typescript \
  @anthropic-ai/claude-agent-sdk@0.3.300
npm ls --depth 0 2>/dev/null | grep -E "@forge/sdk|@hyperunix/sdk|@furnace/sdk|claude-agent-sdk"   # listed as extraneous links
```

`npm ci` removes those links again (it reinstalls from the lockfile), so
re-run the second block after any `npm ci`. The Furnace TypeScript SDK does
not build at its current upstream revision (bead fvh); its link serves only
the `FURNACE_SDK_NOT_INSTALLED` refusal path until that is fixed.

## Language policy (2026-10-15)

The workspace is TypeScript and Python only. All executable sources — library
and app code, every test, the QA drivers and the repo scripts — are `.ts`,
executed directly by Node 24's native type stripping (`node --test
test/*.test.ts`); the Python usage proof and installed-SDK probe stay under
`qa/integration/python-consumer/`. The root `typing` gate step type-checks the
packages (`npm run build`) and every test/QA/script file
(`npm run typecheck:qa`, `tsconfig.qa.json`, strict with
`exactOptionalPropertyTypes`), so an untyped test cannot land. No tracked
JavaScript remains; a new `.mjs`/`.js` file fails the structure review.

## Host-local workspace materialization (2026-10-15)

A distributed worker must not take a caller's absolute path as the workspace identity (MW-053). `apps/development-rig/src/workspace-materialize.ts` accepts a `WorkspaceSource` — a content-addressed Git bundle (`git-bundle:sha256:<digest of the bundle bytes>`) or a remote Git URL (`git-repository:<url>`; a local repository path is refused with `WORKSPACE_SOURCE_LOCAL_PATH_REFUSED`) — plus a full 40-hex revision, and materializes it with `git clone --no-checkout` then `git checkout --detach <revision>` under an absolute directory the host chose (`WORKSPACE_SLOT_NOT_ABSOLUTE` otherwise). A revision the source does not contain is `WORKSPACE_REVISION_UNAVAILABLE` and leaves no checkout behind. The identity does not depend on the bundle's path or the worker's cwd, so a retry on another host materializes the same basis. The entrypoint request's `workspaceId` is then that identity and `baseRevision` the pinned commit; the pinned entrypoint host's digest check (MW-022/MW-030) still gates which code runs. Nothing here is an RPC runtime or a scheduler.
