# Development rig — fixture and real Forge verification

This is the composition root for `@mechanical/workflows-development`. It has two **distinct** journeys:

**Fixture development workflow** (no providers, no real gate):
```sh
npm run fixture -- --task "Fix parser" --workspace demo --revision base-1
```

**Live native Forge gate** for an **already committed, clean Git candidate**:
```sh
# First build/install compatible public @forge/sdk (from the separate Forge repository).
# Example in a local developer checkout:
npm install --no-save --workspace @mechanical/development-rig /path/to/Forge/sdk/typescript
npm run build
node apps/development-rig/dist/cli.js --live-verify --workspace /absolute/path/to/forge-package --forge-bin forge
```

The CLI verifies that a Forge package manifest exists and the Git working tree is clean, records HEAD/tree, opens the public Forge App Server SDK, initializes protocol compatibility, invokes `gate.run` with `{root,require_complete:true}`, then rechecks Git HEAD and cleanliness. It interprets the **native serialized Forge result**, never an exit-zero guess. It exits 0 only on an established matching committed PASS, 1 for an established FAIL, 3 for indeterminate, and 2 for missing/invalid inputs and startup failures. Inspect the JSON's `mode: live-forge`, `result.reason`, `result.native` and operation ID. This is conservative; missing native basis evidence cannot be claimed as PASS.

**Optional Furnace executor definition:** `dist/furnace-app.js` exports exactly one real `ExecutorApp` registered as `mechanical.forge-gate`. It loads public `@furnace/sdk` and `@forge/sdk`, consumes Furnace's native `ExecutionContext.workspace.root`, and maps gate observations to `ExecutionResult.success/failure(task)/indeterminate`. To exercise it, configure an actual Furnace executor host and formula using Furnace's own supported instructions. **No Furnace Run is created by this repository**, and it does not automatically supervise or retry the gate; the host is responsible for execution and recovery.

The current `develop()` function itself still has no live HX/RF/agent implementation. An ordinary non-fixture development invocation refuses with `LIVE_DEVELOPMENT_NOT_IMPLEMENTED`. The explicit `--live-develop` mode invokes the Claude Agent SDK, but the full provider journey remains unverified. Default context is a labeled plain prompt; the opt-in `--context-mode rf` selects a native ReactiveFiber render and refuses with `RF_UNAVAILABLE` when the `rf` executable cannot be started. Beyond the bounded run in [live single-writer development](../../docs/14-live-single-writer-development.md), no live RF journey is claimed.

**Live read-only observation (opt-in, isolated):** `dist/live-observation.js` observes Forge (the `.forge/logs/operations/<operationId>.json` log and the `.forge/logs/commands.jsonl` row Forge wrote for the gate the command receipt named; `.forge/last-run.json` is the pytest fix-verify manifest and is never read), Beads (`bd show` only), Furnace (an injected run reader) and HyperUnix coverage, labelling an observation `live` only when a native receipt with a native id travels with it; anything else is an explicit `unknown` observation. `runAuthorizedGateFlow` runs one `gate.run` intent admitted by `reconcile` through the existing Forge verification and records the command receipt and the independently observed outcome. The one live test, when enabled, fails unless the observed leg is `observed` and names the command's operation id (an unknown observation never satisfies it); it needs `MW_LIVE_FORGE_FLOW=1` and `MW_LIVE_FORGE_ROOT=<candidate scratch worktree>`; without them it skips with an UNKNOWN record.

See [live verification contract](../../docs/13-live-forge-verification.md) and [status](../../docs/10-current-state-and-gaps.md).

## Opt-in real single-writer development

```sh
# Requires optional public Claude Agent SDK and built Forge SDK; authentication belongs to the host.
node apps/development-rig/dist/cli.js --live-develop \\
  --workspace /absolute/path/to/trusted/clean/forge-package \\
  --task "Implement the requested change" \\
  --allow-writes --forge-bin forge
```

The Claude agent is permitted to write files and commit changes. Use an isolated trusted checkout. The application requires a clean, committed changed HEAD before executing the real Forge full gate. Discovery is only a `git ls-files` census, not HyperUnix; the default context is a labeled plain prompt, and ReactiveFiber context is opt-in (see the RF-mode invocation below). A successful agent response is not sufficient evidence of a code change or verification. No automatic retry after uncertain agent effects. [Full contract](../../docs/14-live-single-writer-development.md).

**Opt-in ReactiveFiber context (runnable invocation, not a witnessed result):** the Forge package must already hold an initialized RF workspace with an active task-provider component; the CLI never initializes it.

```sh
node apps/development-rig/dist/cli.js --live-develop \
  --workspace /absolute/path/to/trusted/clean/forge-package \
  --task "Implement the requested change" \
  --allow-writes --forge-bin forge \
  --context-mode rf --model claude-opus-5 \
  --rf-actor ACTOR --rf-session SESSION_ID \
  --rf-history-limit 20 --render-idempotency-key KEY
```

`--rf-actor`, `--rf-session`, `--rf-history-limit` (decimal integer 1..500) and `--render-idempotency-key` each require a value. Under plain context any of them refuses as `RF_OPTION_REQUIRES_RF_MODE` before Beads is read or `develop()` runs.

**Read-only Beads task intake:** `--live-develop --workspace /clean/forge/package --bead ISSUE_ID --beads-directory /beads/workspace --allow-writes` reads `bd --readonly ready/show` to select the task, then runs the same agent composition. `--bead` and `--task` cannot be combined. A ready read is **not** a claim or reservation; this command never closes Beads work, and the caller must reconcile the issue after an ambiguous agent/gate outcome.

**Explicit Beads claim:** add `--claim-bead` to the `--bead --allow-writes` form only when you want a native `bd update --claim` effect. The host confirms the issue is assigned to its Beads actor and in progress, then rechecks the clean Git basis. Ambiguous claim replies trigger one authoritative `bd show`, never another claim. Agent/Forge failures leave the issue in progress for manual reconciliation. A verified code candidate is **not** proof that the Beads task is accepted, so the CLI never auto-closes it.

A bounded native `--bead --claim-bead` journey is recorded in [Beads claim QA](../../qa/integration/2026-10-15-beads-claim-journey.md). It proves that a successful agent+Forge gate does not auto-close the issue; explicit task acceptance follows separately.


## CPP-10 opt-in Git-native content publication (2026-10-19)

The exported `dist/git-source-publication.js` provides `GitBlobPublicationSource`, a concrete `SourcePublicationPort` for a *single local Git repository*. It integrates with `publishReconciled` from `@mechanical/workflows-coordination`. Callers supply the explicit repository path and workspace ID; no CLI command runs it automatically.

Its accepted contract is **only** `git-blob-content-v1`: an artifact's `receiptRef` has the form `gitblob:<oid>`, where that Git blob occurs in the tree of the source revision (default `refs/heads/main`), and `digest` is `sha256:<hex>` computed from its raw bytes. The artifact must declare no external-effect discharge IDs. Required dependencies are staged as a closed DAG, and the adapter independently rechecks the native blob identities/digests.

A successful publish uses one native Git `update-ref --stdin` transaction to `verify` the source ref's expected commit OID and compare/update `refs/cpp10/publication`. A source revision change before the transaction causes refusal; post-publication source revision changes make `readCurrent()` return null until newly recertified. Git content identity is not author-signature verification, build/Forge correctness, or any authority to execute tools. The Git publication ref is local and source-native; no cross-repository atomicity or effect ledger is claimed.

Reproduce with disposable local Git repositories after building the coordination and development-rig workspaces:

`npm run build --workspace @mechanical/workflows-coordination`
`npm run build --workspace @mechanical/development-rig`
`npm run test --workspace @mechanical/development-rig`

Tests are in `test/git-source-publication.test.ts`. The isolated local native-Git prototype passed 6/6 and pure bridge 8/8; the full assembled repository test gate remains to be run on a full checkout. Formal scope: [CPP-10 Git-native refinement](../../docs/programs/adaptive-policy-organizations-2026-10-18/20-cpp10-git-native-source-refinement.md). No new orchestration runtime, Forge gate, source signer or policy authority is introduced by this optional adapter.

## Host bead selection with optional GraphPolicy advice (2026-10-21)

`--select-bead --beads-directory <store> [--gp-mode off|shadow|canary --gp-config apps/development-rig/graph-policy/bead-scorer-v1/config.json --gp-entry <GraphPolicyCLI>/ts/dist/main.js --records DIR] [--support id,id] [--types task] [--seed N] [--claim]` reads Beads' native ready list once, enumerates the legal support itself, optionally draws one candidate through the real `gp sample` (shadow records the advice; canary resolves it when it lies in the support and otherwise falls back with a named reason), and claims only with `--claim` through the same native claim as `--live-develop --claim-bead`. `--gp-reconcile --beads-directory <store> --records DIR --gp-config F --gp-entry F` resolves pending gp feedback from `bd show`. Records, receipts, witnessed runs and limits: [docs/16](../../docs/16-graph-policy-bead-selection.md).

`--gp-replay --history <bd list --all --json export> --gp-config F --gp-entry F --out DIR [--split ISO] [--thetas K] [--seed N] [--scale S]` replays every past claim in the history as a decision context, scores θ₀, single-unit probes, seeded perturbations and the host rules through one `gp rpc --stdio` session, selects on the train split only and writes the report plus the best theta's checkpoint document; see [docs/16](../../docs/16-graph-policy-bead-selection.md) "Replay experiment".


## Agent replay identity (app-local)

The Claude implementation record carries `replay: {promptSha256, configuration}`: the SHA-256 of the exact prompt passed to the SDK and a copy of the effective configuration (`allowedTools`, `permissionMode`, `settingSources`, `model` or `null`, `maxTurns`, `maxBudgetUsd`). `developLive` also returns `gateManifestSha256`, the SHA-256 of the `forge.toml` bytes it pinned. A changed prompt character, tool list or setting source yields a different identity; an injected agent that omits `replay` leaves it absent. This is app-local replay identity, not cross-host replay authority; see [docs/10](../../docs/10-current-state-and-gaps.md).

`developLive` also returns `invocation` (`src/invocation-identity.ts`): the clean Git commit and tree, the installed SDK name and version read from its manifest bytes (`null` and `complete:false` when unreadable), `settingsSha256` over the canonical configuration, the prompt and gate-manifest digests and the digests of the files named in the `skillFiles` option (default none), each with a per-axis SHA-256 and one `identitySha256`. A one-byte change on any axis changes the identity and `differingAxes` names it. Still app-local replay evidence; see [docs/06](../../docs/06-sdk-integration-and-hosts.md). The record also names nine cross-host axes (workspace realpath, task digest, principal/session, Pi invocation id, descriptor and tarball digests, context and evidence profiles, gate parameters): `developLive` observes the workspace realpath and the task digest itself, defaults the gate parameters to what it sends, and takes the rest from the `hostIdentity` option; an axis the host does not state is recorded in `missingAxes`, and `assertReplayable` (or `requireReplay: true`, before any dispatch) refuses with `INVOCATION_REPLAY_AXIS_MISSING` naming it. With an `effectIntent` store, `developLive` persists one effect-intent record (`src/effect-intent.ts`) before the writer dispatches, attaches the session, candidate commit/tree and Forge operation id as observed, and settles it only against the committed tree and the gate definition hash; otherwise it reads `uncertain`.

## Pi-host interoperability (design only, 2026-11-06)

A lost acknowledgement without an abort refuses with `DevelopmentLostAcknowledgementError` (`DEVELOPMENT_LOST_ACKNOWLEDGEMENT`, marker `UNCERTAIN_AFTER_LOST_ACK`, `src/effect-reconciliation.ts`): the agent runner threw after HEAD moved or the worktree went dirty (`effect: writer`), or the `gate.run` request was dispatched and no response arrived (`effect: gate`). The run never retries; `reconcileUncertainEffect(record, sources)` decides from injected read-only Git and Forge lookups whether the effect occurred, and sets `retryPermitted` only on a cited `not-occurred` record. An agent that fails without any trace keeps its own refusal.

The [reconciled cross-repo program](../../docs/programs/pi-workbench-interoperability-audit-2026-11-06/README.md) proposes a narrow installed rig host facade with explicit trusted `DevelopmentServices` bindings. The rig package exports one stable host subpath, `@mechanical/development-rig/host` (`invokeDevelopmentHost`, `HostAdmissionError`, `HOST_API_VERSION`, the host-binding guards), verified by an external installed-consumer test (L2, fixture services); it has no Pi registration and no application-owned service bundle yet. Its pre-dispatch signal and prompt/config/gate digests are **partial** foundations; they do not implement active cancellation or joint replay. The committed descriptor and installed-tarball tests exist, but no registered Pi `function` invocation has been witnessed. Start with named Git-census + plain context, not invented task-scoped HX proof.
