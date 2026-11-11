# Furnace ExecutorApp host: pass, fail and unknown through the real `@furnace/sdk` — 2026-10-15

## Producer identities and scope

- Furnace executable: `furnace 0.1.0`, rev `e2294c9f00b3`, sha256 `ddf8da52…`, process driver, `context = "stdin-json"`. `execution.driver` is not a setting on this binary (`config explain execution.driver` → `invalid_arguments`), so the extension driver was not available; the SDK's own `dist/src/host.js` hosted the app under the process driver.
- Furnace TypeScript SDK: `@furnace/sdk` 0.1.0 built from an isolated detached worktree of Furnace at `1cf027b0c5c4` (`sdk/typescript` unchanged since `444aa16b22f0`). `npm run build` exits 2 with 5 test-only diagnostics (4 × `ceiling_override` missing on `AttemptDto`, 1 × `attempt_timeout` missing on `RunDto`); `src/` compiles and `dist/src` emits (`noEmitOnError` unset; package `main` is `dist/src/index.js`). This is an unreleased source build whose own test compile is red, linked out of band with `npm install --no-save`; no manifest changed. fvh stays open on that release question.
- Forge: executable 0.2.1 rev `0deb972720ce`; public `@forge/sdk` from the Primary installation's prebuilt dist, linked the same way.
- MechanicalWorkflows rig: scratch clone `/tmp/mw-062-rig` at `09f98606e0f7`, `npm ci --ignore-scripts && npm run build` exit 0; the app is `apps/development-rig/dist/furnace-app.js`, executor `mechanical.forge-gate`.
- Beads `bd 1.1.0-rc.1`; each subject has its own `bd init` store (embedded Dolt). The shared MechanicalWorkflows graph was not touched.
- Subjects: three fresh clones of the clean scratch Python Forge package (`03a0fa58…`) under `/tmp/mw-062/{pass,fail,unknown}`, each with one commit that untracks the ignored `.beads/` files (bd init had modified a tracked `config.yaml`, which would have dirtied the candidate basis); the fail arm adds a committed test that fails at runtime; the unknown arm adds a committed passing test that writes `gate-side-effect.txt` into the package root during the gate.

Executor definition (identical in the three subjects, paths elided):

```toml
[execution]
executor = "mw-062-executor-app"
max_parallel = 1
attempt_timeout = "20m"

[executors.mw-062-executor-app]
program = "<node>"
args = ["<sdk>/dist/src/host.js", "--app", "<rig>/apps/development-rig/dist/furnace-app.js", "--executor", "mechanical.forge-gate"]
context = "stdin-json"
env = { MECHANICAL_FORGE_BINARY = "<forge>" }
```

## Direct pre-checks (not the witness)

Each subject's gate was first run directly (`FORGE_JSON=1 forge build`) to warm the hatch environment and fix the expected verdict: pass → `success`/`PASS` (lint, typing, test, coverage, wheel), fail → `error`/`FAIL` at `test`, unknown → `success`/`PASS` with `?? gate-side-effect.txt` left untracked. The side-effect file was removed before the unknown arm's Run so every Run began on a clean committed basis.

## Three real Runs

`env --default-signal furnace -C <subject> --json --request-id mw-062-<arm>-<hhmmss> run start mw-062`, one Run per subject, no reconciliation of the SDK contract (the `ContractUnavailableError` of the 01:57 witness did not recur).

| arm | subject commit | Run | Attempt | host `ExecutionResult.status` | host exit | Furnace outcome (`exit_code` recorded) | Run state | `run start` exit | Forge operation |
|---|---|---|---|---|---|---|---|---|---|
| pass | `d330e6fb9121` | `frn-run-pass-wisp-lm4` | `frn-atm-pass-wisp-exm-1` | `success` (`FORGE_GATE_PASS`) | 0 | `success` (0) | `completed` | 0 | `op-a3d72d12c5b0470f9905fcd5507b695d` |
| fail | `82f2e45404b9` | `frn-run-fail-wisp-nwd` | `frn-atm-fail-wisp-iui-1` | `failure`, `failure_class` `task` (`FORGE_GATE_FAIL`) | 10 | `work_failure` (10) | `needs_attention` | 5 | `op-9055570a746a4e5c82c903ccb57abeeb` |
| unknown | `d39afd8b2b42` | `frn-run-unknown-wisp-w1g` | `frn-atm-unknown-wisp-cfo-1` | `indeterminate` (`WORKSPACE_NOT_CLEAN_AFTER_GATE`) | 12 | `work_failure` (12) | `needs_attention` | 5 | `op-df3cfcb298ef47a7b36f014a986f3374` |

Each Attempt's `termination_cause` is `natural_exit`; Run-start-to-Attempt-finish was 7 to 10 s per arm. The host's result documents sit where the SDK reserves them, `<subject>/.furnace/results/<attempt_id>.json`; Furnace captured no stdout or stderr lines from the host (`logs --attempt … --stream stdout|stderr` returned 0 lines each). The unknown arm's workspace carried `?? gate-side-effect.txt` after its Run, which is the mechanism the live gate reported.

## What the witness establishes

- **Three distinct mappings, end to end.** Gate `passed` → `success` → exit 0 → Furnace `success` and the Work closed; gate `failed` → `failure` → exit 10 (`EXIT_RESULT_FAILURE`) → `work_failure`; gate `indeterminate` → `indeterminate` → exit 12 (`EXIT_RESULT_INDETERMINATE`) → `work_failure`. Furnace parks both nonzero arms identically (`needs_attention`, `retry_class_not_enabled`), but records the exit code unaltered, so the FAIL/unknown distinction survives in its Attempt record as well as in the host's result document.
- **The adapter owned nothing.** It established no Run, claimed no Work, retried nothing and waited for nothing; Furnace instantiated the formula, claimed the Work, started the host once per Attempt, closed the pass arm's Work and parked the others.
- **Native Forge identity travelled.** The pass and fail documents carry the pinned basis (commit, tree, `clean: true`) and the Forge operation id in `data`; the unknown document carries the operation id only inside its summary text, because the SDK's `ExecutionResult.indeterminate(message)` has no data channel (an upstream SDK limitation already recorded in docs/13).
- **The 01:57 contract failure is gone at this SDK revision.** The first witness needed a build-output-only reconciliation of the generated contract; this one ran the unmodified build output.

## What it does not establish

- The Furnace **extension driver** (Generation 2 resident host): absent from the installed binary; the app ran under the process driver through the SDK host executable.
- A **release-grade** `@furnace/sdk`: the dist came from a source tree whose test compile is red.
- **Cancellation** through the host, and Furnace reading the result document (under the process driver it reads only the exit status).

## Evidence

`evidence/2026-10-15-furnace-executor-app-host.json`: producers (binary sha, SDK revision and diagnostics, host and app sha256), the executor definition and formula, per-arm `run start` envelopes, `run status`, `run inspect`, `attempt list`, the host result documents, the direct pre-check verdicts and the expected-versus-observed mapping (`observedMatchesExpected` true for all three arms).
