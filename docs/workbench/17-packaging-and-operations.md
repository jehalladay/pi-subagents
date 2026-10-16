# 17 — Packaging, configuration, operations, and release evidence

## Development workspace

Fork remains jehalladay/pi-subagents based on tintinweb/pi-subagents, MIT. Use Forge for source/build/test/package gates. Add Forge manifest if supported by verified Forge backend without inventing commands. No GitHub CI. Node/TypeScript versions and exact SDK versions should be pinned in lockfile and verified by a clean external consumer test.

Do not introduce a dependency on Library. MechanicalWorkflows integration should consume separately installable artifacts rather than the entire workspace checkout.

## Install profile

Start as a Pi extension with optional Claude Agent SDK and provider adapters behind validated feature config. Keep standard upstream features working when Workbench is disabled. No claim that new functionality exists until implemented, packaged and tested. Use current Pi install methods only after testing exact package name/version in a clean Pi environment.

Separate:
- embedded Pi extension with local Claude SDK host;
- optional headless executor library/process for detached runs;
- optional Furnace ExecutorApp adapter (later);
- independently installed provider adapters.

## Runtime and host requirements

- Credentials sourced from deployment/SDK supported mechanism; no secret copied into script VM. The two interpreter launch seams pass an allowlisted environment only (`src/workbench/process-env.ts`): the embedded worker gets none of `process.env`, the detached host gets the named operational variables and no credential-shaped name; a deployment that authenticates the SDK through an environment variable must instead provision the SDK's credential store for detached hosts.
- Workspace materialization pinned to correct basis and permissions.
- Provider clients initialized lazily with scoped resource ownership.
- Streaming bounded by max in-flight node calls, backend admission and configured quota.
- Shutdown: stop accepting calls, notify owned local tasks, attempt graceful end, report unresolved effects, and release owned resources.
- A Pi UI reconnect is only an observer/client action; it must not restart external work.

## Operations telemetry

Report actual: active workflows, Claude SDK sessions, provider call outcomes, event lag, dropped/late observations, projection size, number of visible rows, UI render p95, memory, token use from SDK, native evidence coverage and ambiguous external effects. Hide/redact prompt/tool bodies by default.

## Error and degradation policy

- Missing Claude auth -> clear config error; do not silently use Pi model.
- Unsupported provider version -> capability unavailable diagnostic; no fictitious CLI fallback.
- Offline observation -> last-known state visibly stale; no fake terminal completion.
- Unsupported worktree isolation -> refuse isolated operation.
- Incomplete source basis -> prohibit verification PASS projection.
- Expired control credentials -> deny action; preserving observation if allowed.
- UI terminal too narrow -> compact single-column view, not crash.

## Versioning / distribution

Version parser language and node-provider contract independently of bundle version. Changed semantics require migration notes and fixture tests. Pin immutable deploy artifact for reproducible observations. Release docs include feature matrix with status (not claimed based only on source commit).

## Declared support matrix (release checklist item 4)

What this fork is tested against and declares as supported, measured at the time of writing (2026-10-15, trunk `06f7071`). Every row names where the declaration lives; the measured census and its drift guard are wb-cax.20's receipt, which compares the live pins against this table and goes red when they diverge. Nothing here is a claim beyond what the gate runs: Python is not a runtime dependency of this package (no Python row), and a version outside the declared set is unsupported until a gate run on it is recorded.

| Component | Declared | Where declared / how measured |
|---|---|---|
| Node.js runtime | tested on v24.20.0; declared floor `>=24` (package.json `engines`) | `node --version` on the gate host; no `.node-version` pin exists, the floor is the only declaration |
| TypeScript | `6.0.3` exact (runtime AST dependency of the source designer) | package.json dependency pin + lockfile |
| @anthropic-ai/claude-agent-sdk | `0.3.300` exact | package.json dependency pin + lockfile |
| @forge/sdk | `0.1.0` vendored tarball (`file:vendor/forge-sdk-0.1.0.tgz`), checksum-pinned by the lockfile | lockfile integrity |
| @furnace/sdk | `0.1.0` vendored tarball (`file:vendor/furnace-sdk-0.1.0.tgz`), checksum-pinned by the lockfile | lockfile integrity |
| @hyperunix/sdk | `0.1.0` vendored tarball (`file:vendor/hyperunix-sdk-0.1.0.tgz`), checksum-pinned by the lockfile | lockfile integrity |
| Pi host packages (peer) | `@earendil-works/pi-ai` >=1.1.0, `@earendil-works/pi-coding-agent` >=1.1.0, `@earendil-works/pi-tui` >=1.1.0 | peerDependencies; the host supplies them, tested against the lockfile's 1.1.0 |
| Test and lint toolchain (dev) | vitest `4.1.10`, biome `2.4.15` | lockfile; not a runtime requirement |

Policy: the Node floor and the exact pins change only by an owner commit that re-runs the complete gate on the new version and updates this table in the same commit; a drift found by wb-cax.20's guard is a defect in whichever side moved without the other.

## Release checklist

1. Sources and upstream license preserved; fork origin recorded.
2. Forge clean build and tests run with commands/logs and SHA.
3. Real Claude SDK workflow proof, transcript/usage native evidence.
4. Exact supported Python/TS/SDK dependency versions listed.
5. Legacy script golden suite and key commands pass.
6. Authorized provider invocation and denial tests pass.
7. Abort/restart/side-effect ambiguity tests pass.
8. 80x24, 120x40 and resize/SSH terminal tests pass.
9. Profiling numbers recorded if making scale claims.
10. Clean external install and minimal-permissions run succeeds.

Not running these tests during documentation authoring must be disclosed, never retroactively called release proof.
## Current experimental distribution

The declared portable Forge gate includes lint, types, tests, compilation, a compiled external workflow smoke and package-content inspection. Native SDK artifacts are checksum-pinned and bundled so a packed parent can install them. A separately invoked clean consumer smoke has successfully installed and imported the compiled runtime. The package contains a validated dependency-lock copy under `vendor/`, while producer-local Beads/Forge/Furnace/HX/RF stores are excluded. Workspace agent tooling (`.agents/`, `.codex/`) is excluded by `.npmignore`; `docs/` (product specification) and `qa/` (runnable consumer verification, inert without fixtures or environment) ship deliberately. `qa/workbench/package-smoke.mjs` classifies every packed path against a top-level allowlist, a denylist and the lock's `inBundle` entries (`qa/workbench/package-boundary.mjs`), packs twice to assert identical shasum and integrity, and emits a `workbench.package-smoke/v2` receipt with revision, toolchain and host. No npm publication or version bump is performed by this program run.

Live tiers are explicit and separate: `native-read`, `rf-preview`, `furnace-observe`, and `claude-live`. The RF/Furnace tiers require pre-existing disposable native fixtures. Missing fixture settings fail rather than skip. Their receipts establish only the surfaces actually exercised. A clean portable gate does not satisfy the full live TUI, security, detached or inspector release checklist.

The source designer uses the pinned TypeScript compiler as a runtime AST dependency. It does not execute candidate JavaScript during validation. The separate active external Furnace verification tier is `furnace-active-observe`, requiring an independently launched disposable native Run. Its fixture variables are not optional skip signals: absent identity fails the explicit tier. The local detached shell tier is a separate process-lifecycle proof, not remote authentication or native crash-durability evidence.
