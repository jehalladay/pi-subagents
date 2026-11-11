# 13 — Real Forge verification: first live vertical cut

**Status (2026-10-15): source, negative controls, and native Forge PASS/FAIL plus Furnace Run/Attempt witnesses recorded; Furnace SDK release build remains red.**

The first live workflow capability is intentionally small: verify an **existing, clean, committed Forge package** through Forge's public TypeScript App Server SDK and optionally expose the same gate through Furnace's public ExecutorApp. This is real product wiring, not the fixture `develop()` path and not yet a complete AI development swarm.

## API used and why

Verified against Forge main at `b96320a9c4478f51b7a7ac6d854840e4c990134c`:

- `@forge/sdk` exports `ServerConnection`.
- `ServerConnection.spawn("forge")` owns the App Server process; `initialize()` performs version/capability negotiation and `close()` tears it down.
- The server method `gate.run` requires `params.root` and accepts `require_complete`. Use public `request("gate.run", {root, require_complete:true})`.
- **Notable SDK gap:** the current `ForgeFacades.gate.run({target,changed})` facade forwards only `{target,changed}`; the inspected server's `gate.run` handler demands `root`. MechanicalWorkflows does not forge a false typed façade or silently parse the shell. Improve this mismatch upstream in Forge.
- Served answers carry `operation_id`, `terminal_fact`, flat serialized keys and `forge_result` preserving the native serialized `CommandResult`, including `status`, `data.gate_verdict`, `envelope.disposition`, `envelope.gated_commit`, diagnostics and IDs.

## Requirements to use

1. A checked-out Forge **package** with `forge.toml`, inside a Git repository, at a clean committed HEAD. No unstaged, staged or untracked files (subject to Git's own ignore rules).
2. Node >=22.18, npm workspace dependencies and a built development-rig.
3. The compatible **public** `@forge/sdk` package installed into the development-rig workspace. A local developer may pack/install it from the Forge repository; the monorepo has no permanent mandatory Forge SDK dependency.
4. A compatible installed `forge` executable whose `app-server --stdio` protocol is available.

Example:

```sh
mise install
npm install
# In a developer environment with Forge separately checked out and its SDK built:
npm install --no-save --workspace @mechanical/development-rig /path/to/Forge/sdk/typescript
npm run build

node apps/development-rig/dist/cli.js --live-verify \
  --workspace /absolute/path/to/clean-forge-package \
  --forge-bin forge
```

An npm package/install path must produce the `@forge/sdk` **built** distribution; importing uncompiled source under `node_modules` is not a supported fallback. The optional `@furnace/sdk` can be installed separately for the Furnace executor host.

## Execution contract

The host:
1. Canonicalizes the package root, requires `forge.toml`, and checks Git HEAD, HEAD tree and clean status before any SDK connection.
2. Dynamically loads the **public** `@forge/sdk`; absence/incompatibility is a visible error. This keeps the other workflow library free of mandatory Forge dependencies.
3. Spawns the Forge App Server and requires `initialize()` to return exactly `compatible`.
4. Calls `gate.run` with root and `require_complete: true`. A transport failure **after dispatch** is `indeterminate`, not a gate FAIL and never a reason to blindly repeat an unsafe side effect.
5. Closes its owned SDK connection.
6. Rechecks clean Git basis. Any newly dirty workspace or HEAD/tree drift results in an indeterminate observation.
7. Inspects the **native** response's `forge_result` and the related outer keys. Success requires native `status=success`, `data.gate_verdict=PASS`, `envelope.disposition=SUCCEEDED`, a matching native candidate pin, no contradicted `gate_passed`, and `terminal_fact=completed`. The candidate pin is resolved from native statements with strict precedence: `envelope.gated_commit`/`gated_tree`, then `data.gated_commit`/`gated_tree`, then `data.source_tree` (tree) and the envelope-named `evidence_ref` run record's `revision`/`source_tree` (commit/tree) — the record must resolve strictly inside the verified package root. Every present native commit/tree statement must agree with the observed clean basis, and at least one native commit statement is required. Unknown or missing proof is `indeterminate`.
8. Emits JSON labeled `mode: live-forge`. The entire native response remains under `result.native`; the application does not flatten Forge's rich verdict into an irreversible Boolean.

An established `FAIL` under `status=error` maps to `kind=failed` only when native `disposition=FAILED`, `terminal_fact=completed`, a matching candidate pin, and no contradictory `gate_passed=true` also hold. Other combinations remain `indeterminate`, not a domain failure. Partial, unknown, incomplete, status contradiction, missing candidate pin, or mutated workspace never maps to pass.

## Exit behavior

| Exit | Meaning |
| --- | --- |
| 0 | Pinned full native Forge PASS established |
| 1 | Native Forge gate FAIL established |
| 2 | Invalid/missing startup requirements or SDK invocation refusal |
| 3 | Forge gate outcome indeterminate, insufficient evidence, transport-unknown after dispatch, or changed basis |

A positive unit fixture that supplies a forged response shape does **not** prove an actual Forge PASS. Real integration proof requires a recorded Forge operation on an installed Forge build with its native evidence intact.

## Furnace ExecutorApp

`apps/development-rig/src/furnace-app.ts` exports `app`, one `@furnace/sdk` `ExecutorApp` with callback `mechanical.forge-gate`. It derives the verified package root from **Furnace's actual `ExecutionContext.workspace.root`**, not application-defined Work variables.

The Furnace host selects the callback through its own `--app ... --executor mechanical.forge-gate` or resident/extension configuration as supported by the version installed. The callback runs the same real Forge gate and projects:

- gate PASS → `ExecutionResult.success` with native Forge operation ID and pinned basis;
- gate FAIL → `ExecutionResult.failure(...,{failure_class:"task"})`;
- gate unknown → `ExecutionResult.indeterminate`, naming original operation when available.

It does **not** establish a Furnace Run, own scheduling, allocate resources, or implement retry policy. Furnace remains authoritative for Work/Attempt state, supervision and recovery. Since Furnace's present `indeterminate(message)` constructor accepts no structured data, the message includes the native operation ID when available. The wire itself already round-trips a `data` member on an indeterminate document (`RESULT_MEMBERS`, decoder proof of 2026-10-15), so only the constructor lacks the slot `success`/`failure` expose; filed upstream in both SDKs at Furnace `a5c8e326dd36` (metadata follow-up `af925e1899c7`). Until it lands, the text workaround stays.

The callback should be run only under an explicit Furnace formula and executor configuration. A locally imported `ExecutorApp` is not a proof that a Run or Attempt occurred. Do not claim durable execution until a real host journey witnesses it.

## Deliberate restrictions

- No agent execution, RF context generation, HX scope analysis, Beads selection or multi-writer workers yet.
- Clean committed candidate requirement is intentionally strict. An agent editing an uncommitted worktree must first produce an explicit stable candidate; no dirty tree is silently credited.
- A before/after Git check is a **limited** consistency assertion against ordinary mutations; it is not a globally atomic snapshot or defense against unobserved ABA. Long term Forge's own frozen source snapshot and workspace-family basis should be used.
- Unknown Forge protocol compatibility is a refusal, not optimistic compatibility.
- No automatic retry of ambiguous transport outcomes.
- The optional SDK packages are external; **Library is never installed**.

## Acceptance and upstream follow-up

Source-level checks live in `apps/development-rig/test/live-gate.test.ts` and `furnace-gate.test.ts`, including clean/pass, partial/status mismatch, wrong commit, domain FAIL, dirty basis, mutation during execution, incompatible handshake and native result mapping.

Still required to claim delivered live integration: install real SDKs, execute an actual Forge gate in a clean package, capture its real response, verify commit/tree fields and toolchain compatibility, invoke the Furnace host through an actual Run/Attempt, and document any mismatches. Extend CI-free local Forge gates with these integration journeys once environments are available.

## Live witness (2026-10-15)

Executed against installed forge 0.2.1 (rev `0deb972720ce`): native PASS
(`op-2d1ab467653d4b34a3c9f4a68193ae0c`, exit 0), native FAIL
(`op-29e737dde4d3497ca3bac6ebafd2140b`, exit 1, `status=error`/`FAIL`/`FAILED`), and a
dirty-workspace refusal (exit 2). Upstream finding: the app-server `gate.run` result
carries `envelope.gated_commit`/`gated_tree` as null (unlike the CLI build envelope); the
commit is natively pinned only via the `evidence_ref` run record and the tree via
`data.source_tree`. Filed to Forge. Full report:
[qa/integration/2026-10-15-live-forge-gate.md](../qa/integration/2026-10-15-live-forge-gate.md).
MW-061's ambiguous-dispatch behavior remains unit-tested only; no live transport failure
was observed.

## Furnace-hosted witness (2026-10-15)

A real Beads formula `mw-gate` started Furnace Run `frn-run-mw-live-pkg-wisp-9wh`. The TypeScript SDK host failed before the callback on its first two Attempts because its generated contract module and manifest carried different Smithy model digests. After a **local build-output-only** reconciliation against the current model, `work retry` reached Attempt `frn-atm-mw-live-pkg-wisp-cti-3`, returned a native `ExecutionResult.success` with Forge operation `op-05196cc11ed547529f48f578b82b1b43`, and `run resume --continue` completed the Run. The Furnace SDK source checkout remains unmodified, and its current `npm run build` is red; do not treat this temporary local artifact as a release-ready SDK. Full evidence: [Furnace and agent integration report](../qa/integration/2026-10-15-furnace-and-agent.md).

## Delivery completeness guard (2026-10-15)

An App Server frame carrying `delivery.complete=false` is now indeterminate even when its nested Forge gate fields look like PASS. The application retains the original operation id and native frame so an observer can reconcile; it never re-dispatches the gate automatically. A red-first negative control injects a PASS-shaped response with dropped delivery and asserts no verified candidate. The installed Forge App Server results previously witnessed carried complete delivery.

## Established cancellation (2026-10-15)

A cancelled `gate.run` answers with a bare result envelope: `status:error`, `envelope:null`, `data.terminal_disposition = cancelled-established`, `data.cancellation.establishment = CANCELLED_CONFIRMED`, and the operation id only under `data`. The classifier reads this as `indeterminate` with reason `FORGE_OPERATION_CANCELLED` and keeps that operation id. A cancel receipt (`cancellationEstablished:false`) is never evidence of cancellation, and no cancelled or wrapper-less envelope is ever a PASS or FAIL. Witnessed live in `qa/adversarial/2026-10-15-forge-gate-cancel.md`.

## Furnace process host (2026-10-15)

`apps/development-rig/src/furnace-process-executor.ts` is a plain executable Furnace starts once per Attempt under `driver = "process"`, `context = "stdin-json"`. It decodes Furnace's four-group `ExecutionContext` strictly, dispatches on a leading `[gate]` or `[develop]` in the Work title, runs `verifyExistingCandidate` or `developLive` on `workspace.root`, writes one receipt per Attempt (`mechanical-workflows/furnace-process-receipt/v1`, under `MW_FURNACE_RECEIPTS` or `<root>/.furnace/mw-receipts`) and exits 0 only on an established Forge PASS or a `verified_candidate`; 1 for FAIL / `verification_failed`, 3 for indeterminate, 64 for an unusable context, 66 for a refused tag or missing task, 70 for a thrown service. Furnace reads only that exit status, so the receipt is where the Forge operation id, the agent session and the FAIL/indeterminate distinction survive. Four real Runs (PASS, FAIL, a misconfigured Forge binary, and the full `developLive`) are recorded in `qa/integration/2026-10-15-furnace-process-host.md`; the FAIL control caught and fixed the terminal-fact regression described under MW-060. The `@furnace/sdk` `ExecutorApp` host above was then witnessed through the same binary (next section).

## Furnace ExecutorApp host (2026-10-15)

The `@furnace/sdk` `ExecutorApp` above ran under the installed Furnace (`e2294c9f00b3`, process driver, `context = "stdin-json"`) through the SDK's own `dist/src/host.js --app <rig>/apps/development-rig/dist/furnace-app.js --executor mechanical.forge-gate`, with the SDK built from a detached worktree at `1cf027b0c5c4` (its `npm run build` exits 2 on five test-only diagnostics; `dist/src` emits and loads). Three real Runs on three committed subjects established the three mappings end to end: a passing gate became `ExecutionResult.success` (host exit 0, Attempt `success`, Run `completed`, `op-a3d72d12c5b0470f9905fcd5507b695d`); a failing gate became `failure` with `failure_class` `task` (exit 10, `work_failure`, `op-9055570a746a4e5c82c903ccb57abeeb`); a gate that passed but left an untracked file became `indeterminate` (`WORKSPACE_NOT_CLEAN_AFTER_GATE`, exit 12, `work_failure`, `op-df3cfcb298ef47a7b36f014a986f3374`). Furnace recorded the three exit codes unaltered and parked the two nonzero arms at `needs_attention`; the host wrote each result document to `<workspace>/.furnace/results/<attempt_id>.json`. The adapter established no Run and owned no Work or Attempt state. Still not established: the extension driver (absent from this binary), a release-grade SDK (fvh), and cancellation through the host. Report: `qa/integration/2026-10-15-furnace-executor-app-host.md`.
