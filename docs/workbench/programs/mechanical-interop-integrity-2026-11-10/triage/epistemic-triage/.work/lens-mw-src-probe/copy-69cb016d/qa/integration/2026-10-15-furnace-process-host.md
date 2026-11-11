# Furnace process host: the same gate and development functions under real Furnace Runs — 2026-10-15

## Producer identities and scope

- Furnace executable `0.1.0`, rev `e2294c9f00b3` (`furnace --json version`), driver `process`, context `stdin-json`. No `@furnace/sdk`: the TypeScript SDK still does not build upstream (bead `fvh`), so this host is a plain executable Furnace starts once per Attempt.
- Forge executable `0.2.1` rev `0deb972720ce`; public `@forge/sdk` 0.1.0 for the gate inside the executor.
- Claude Agent SDK `0.3.300` for the `[develop]` step (same `developLive` the local `--live-develop` CLI runs).
- Beads `bd 1.1.0-rc.1`; each scratch workspace has its own `bd init` store. The shared MechanicalWorkflows graph was not touched.
- Executor: `apps/development-rig/src/furnace-process-executor.ts` (`dist/furnace-process-executor.js`), dispatching on a leading `[gate]` / `[develop]` in the Work title, writing one receipt per Attempt (`mechanical-workflows/furnace-process-receipt/v1`) and exiting 0 only on an established Forge PASS or a `verified_candidate`.
- Subjects: fresh clones of the clean scratch Python Forge package (`ce0657c…`) under `/tmp/mw-furnace-host-*`, each with a `bd init` commit.

## What Furnace established, per journey

| journey | Run | Attempt | executor exit | Furnace reading | receipt | Forge / agent native ids |
| --- | --- | --- | --- | --- | --- | --- |
| `[gate]` PASS | `frn-run-mwfh-wisp-ciz` | `frn-atm-mwfh-wisp-83m-1` | 0 | `completed`, 1 of 1 Work closed | `success`, forge `passed` | `op-ab0c3ab39bff4941b218e2cd912e6dad` at scratch `8f67330` |
| `[gate]` FAIL (failing test committed) | `frn-run-mwff-wisp-chy` | `frn-atm-mwff-wisp-oaf-1` | 1 | `needs_attention`, exit 5 `unsafe_recovery`, Work left `in_progress` | `work_failure`, forge `failed` `FORGE_GATE_FAIL` | `op-fa61251eb3ac4bdb8d0cbe2ff91e8519` at `f162648` |
| `[gate]` misconfigured Forge binary | `frn-run-mwnf-wisp-bn8` | `frn-atm-mwnf-wisp-b7q-1` | 70 | `needs_attention`, exit 5 | `work_failure`, forge `null`, error `the Forge app server connection closed … with "initialize" outstanding` | none: no verdict was invented |
| `[develop]` same `developLive` | `frn-run-mwdv-wisp-5yb` | `frn-atm-mwdv-wisp-3jk-1` | 0 | `completed`, 1 of 1 Work closed | `success`, development receipt `verified_candidate` | agent session `723d42f3-9d9b-435f-aded-ff3cbf889186`, candidate `74c079c6…`, `op-811cf92e5833439dbd0e8a2e7b24c570` |

Evidence: `evidence/2026-10-15-furnace-process-host.json` (run start envelopes, `run status`,
`attempt list`, `logs --attempt`, receipts, formula and config shape for every journey).

## Guarantee differences, stated

- **Local host** (`--live-verify`, `--live-develop`): the caller reads the typed `GateObservation` / `LiveDevelopmentResult` directly and the exit code is the application's own mapping.
- **Furnace process host**: Furnace reads exactly one bit, the exit status. Exit 0 closes the Work in Beads at once (close reason names the Attempt) and nothing reopens it; any nonzero exit is `work_failure`, which parks the Run in `needs_attention` with no automatic retry (`retry_class_not_enabled`). Furnace does not read the receipt. The receipt is therefore the only place where PASS, FAIL (exit 1), indeterminate (exit 3), a refused Work tag (66) and a thrown service (70) stay distinct, each with the Forge operation id when one exists. The Beads Work for a failed Attempt stays `in_progress`; reconciliation is the operator's (`run resume`, `work retry`, `run resume --continue`), never the executor's.
- **Durability**: a Furnace Run record and Attempt history survive the controller; the local CLI has neither. Neither host continues a JavaScript stack (MW-042).
- **Not the extension driver**: `furnace-app.ts` (`ExecutorApp` over `@furnace/sdk`) remains the richer, structured mapping and stays unreleasable until the SDK builds (MW-062 code present; MW-063's Furnace-SDK half open).

## A regression the negative control caught

The first FAIL control (`frn-run-mwff-wisp-5e0`, Attempt `frn-atm-mwff-wisp-s8t-1`, exit 3) read the native Forge FAIL as `indeterminate` (`FORGE_GATE_FAILURE_UNESTABLISHED`, `op-30edeace5fa44ae6bab3567b59ae351d`). Forge projects a `FAILED` disposition under terminal fact `failed` (`result_projection.terminal_fact_for`: `SUCCEEDED`/`NO_OP` → `completed`, `FAILED`/`REJECTED`/`BLOCKED` → `failed`, `PARTIAL`/`COULD_NOT_JUDGE` → `partial-indeterminate`), and the recorded live FAIL of the morning (`evidence/2026-10-15-live-verify-fail.json`) carries exactly that. Commit `2b55c44` had tightened the classifier to demand `completed` for a FAIL, with a unit fixture that fabricated the same wrong fact, so unit tests stayed green while every live FAIL became unknown. The classifier now requires `failed` for an established FAIL and treats `FAILED` under `completed` as a contradiction; the fixtures carry the witnessed fact. The second control above is the after-fix witness.

## Housekeeping observed

`bd` appends to `.beads/interactions.jsonl`, which the scratch package tracks; the gate's clean-tree check ran before that write in every journey, and the file was dirty after each Run. A package meant to host Furnace Runs should ignore the Beads store's mutable files.
