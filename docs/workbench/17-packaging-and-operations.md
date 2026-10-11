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

- Credentials sourced from deployment/SDK supported mechanism; no secret copied into script VM.
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