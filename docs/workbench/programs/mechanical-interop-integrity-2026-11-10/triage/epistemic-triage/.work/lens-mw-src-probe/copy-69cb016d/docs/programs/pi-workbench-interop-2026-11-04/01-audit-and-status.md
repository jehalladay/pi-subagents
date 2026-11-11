# 01 — MechanicalWorkflows system audit for Pi consumption

**Static source audit, not execution:** pinned `main` `0c78e2530cbf5737a8bbb763475385a2f0f760cc`, Pi implementation at `f67b6665a132dbb0e86aea48cf36cf6ae0412521`, shipped documentation and existing tests. No live Pi/Mechanical invocation, Forge build, npm pack, SDK calls, or negative mutants ran while drafting this program. Historical `qa/integration/` receipts support only the operations they actually tested.

## Implementation inventory

| Component | Verified source | Present behavior | Pi implication |
| --- | --- | --- | --- |
| Provider-neutral development | `packages/development/src/{index,develop,contracts}.ts` | `develop(services,request)` gates discover → compileContext → implement → verify, checks source basis, returns four domain outcomes | Reuse exact function; never translate it into workflow YAML/DSL |
| Local entrypoint validation | `apps/development-rig/src/entrypoint-host.ts` | checks descriptor, names, four bindings, input, SHA-256 artifact and output basis/evidence; trusted host owns loader | Good substrate, but committed descriptor must match |
| Installed local host | `apps/development-rig/src/installed-host.ts` | copies tarball, offline `npm install --ignore-scripts`, validates package and digest, imports `dist/index.js`, invokes function | Real packaged invocation available; no Pi adapter, no sandbox |
| Live development rig | `apps/development-rig/src/{live-development,claude-implement,live-gate}.ts` | explicitly opted-in Claude edit/commit, clean Git candidate, real Forge verdict | Existing live mode can provide first end-to-end consumer |
| Native evidence composition | `apps/development-rig/src/{live-evidence,live-composition,hx-scope,rf-context}.ts` | product-specific ports and strict native evidence checks | Full native task-scope blocked by HX basis; RF contract distinct from Pi preview |
| Furnace executor | `apps/development-rig/src/{furnace-app,furnace-gate}.ts` | Forge gate callback hosted through native Furnace; separate Pi FurnaceHostedExecutor is available | Compose without reimplementing Furnace lifecycles |
| Coordination package | `packages/coordination/src/index.ts`, `combinators.ts`, policy graph and evaluation modules | pure policy combinators, resolver, episode/replay/training functions; no provider effects in core | First pure function consumer; proposals must not execute as native actions |
| Pi Workflow Workbench | `pi-subagents/src/workbench/execute-tool.ts`, `src/index.ts` | registered tool dispatch currently restricted to script definitions | Missing function branch and host binding |

## Findings

### MW-P0 — Committed descriptor cannot pass its implemented host predicate

The repo's `contracts/entrypoints/development.v1.json` declares `inputSchema:"../schemas/development-request.v1.schema.json"` and matching output path; `apps/development-rig/src/entrypoint-host.ts` requires exact bare strings `development-request.v1.schema.json` and `development-outcome.v1.schema.json`. The host's tests manually construct the bare-name descriptor, rather than importing the checked-in JSON. Directly feeding the declared descriptor into `invokePinnedDevelopment` is refused at `ENTRYPOINT_CONTRACT_INVALID` before the function runs. **Repair the shipped contract itself and write a file-driven red/green test.** Use a single canonical schema-ref grammar, no arbitrary relative traversal, and do not relax package/export/ABI checks.

### MW-P1 — No externally consumable versioned function binding

`@mechanical/workflows-development` is published as a normal package export, and the rig has an installed local loader. The rig's `package.json` has a CLI bin but no explicit stable host API `exports` subpath; Pi contains no native Mechanical host. Its `workflow_execute` refuses kind `function`. Agree on a versioned, pinned host-facing adapter or `@mechanical/development-rig/host` export **only after measuring the actual installed consumer**; avoid another abstraction/package unless necessary. Keep core library free of Pi/Claude/Furnace hard dependencies.

### MW-P1 — Host can load a function without giving it usable application services

`invokeInstalledDevelopment()` receives trusted `DevelopmentServices` callbacks from the caller. The actual Pi Workbench has four unrelated native *read* providers and no app binding for discover/compileContext/implement/verify. A registry `node()` read is not itself a callback contract; each service must preserve provider-native source basis, permissions and evidence. A valid tarball and function export are necessary, but do not complete integration.

### MW-P1 — Current HX native default cannot satisfy task coverage

`apps/development-rig/src/hx-scope.ts` returns complete only for a terminal task-scoped response with matching `baseRevision`, `queryDigest`, complete coverage and `licensesAbsence`. Its default native `runNative()` invokes a filesystem `find` and returns `revision:null,scopeKind:"filesystem"`. That is incomplete for task-specific mutation authorization by design. Real native task query/witness is a producer dependency; do not mock completeness. Existing `developLive` Git-tracked-files census legitimately calls its **own** Git census complete, and must remain separately labeled.

### MW-P1 — RF current live path cannot substitute a Pi preview

Mechanical `rf-context.ts` expects successful task-grounded text at the requested revision plus a nonempty `render_id`, output digest, graph revision and model budget evidence. Pi `reactivefiber.render.preview` uses `--no-commit`, and validates `render_id:null` for ephemeral rendering. The two have different authority and evidence contracts. Plan a separate, installed producer API for committed context; reconcile installed argv/schema versions before unifying code. A cache-plane write is not source-context commitment.

### MW-P1 — Agent writing and cancellation are not host-shaped yet

`developLive(root,task,options)` and `runClaudeImplementation(root,prompt,options)` lack a public host-provided AbortSignal; an agent may continue writing/committing while an external observer believes cancellation requested. `developLive` explicitly says interrupted writes require manual reconciliation. For Pi use, supply cancellation/intent before the first SDK/tool call, preserve dirty artifacts and candidate refs, and never equate abort acknowledgement with rollback. Source identity must also bind candidate commit/tree, gate manifest digest, and effective instruction/skill/service configuration; the minimal `SubjectBasis` with two strings is a scaffold, not complete cross-host replay authority.

### MW-P1 — Package install is not process isolation or authorization

`invokeInstalledDevelopment` installs into a temporary directory but calls the loaded function in the host's own Node process with powerful injected callbacks and inherited process-level context. This is safe only for reviewed/pinned **trusted function artifacts** and least-privilege service bindings; it is not an untrusted code sandbox, durable worker or guarantee of cancellation. Pi's worker VM is also not an isolated arbitrary-code execution service. Host grants and process separation need their own threat model.

### MW-P1 — Domain outcome must survive wrapper and provider transport

The four `DevelopmentOutcome` cases are `verified_candidate`, `verification_failed`, `needs_evidence`, `indeterminate`. The function returns a successful Promise for several **non-success** domain outcomes, and an exception is not automatically a task failure. The Pi adapter must preserve each case plus original native refs and the Forge basis/predicate. Furnace's `ExecutionResult.success` is still its executor word, not proof of general software correctness.

### MW-P2 — Pure coordination policy evaluation is a distinct fast vertical

`packages/coordination` has pure policies and experiments including `sequential`, `parallel`, `guarded`, `alternative`, `inhibit`, `repeated`, graph-policy evaluation and replay/training exports. These are simpler first candidates for pinned function calling because they require no Claude or worktree effects. Do not let policy output directly mutate a Beads issue, perform a Forge build, or start a Furnace Run; explicitly resolve and authorize any proposal via producer authority.

### MW-P2 — Native version/drift and reproducibility

The rig's Forge/HX/RF/Claude integrations use independent client/CLI contracts. In particular the Mechanical RF renderer and Pi preview use intentionally different modes, and the declared descriptor/schema loader mismatch shows the danger of hand-authored fixtures. Add cross-version manifest tests, installed-tarball consumers, package lock/protocol pins and explicit `unavailable` outcomes. Historical positive receipts remain scoped to their actual versions; the repo's `docs/10-current-state-and-gaps.md` must be revised after **measured** new code, not by copying this plan's desired state.

### MW-P2 — Documentation and agent discoverability

Mechanical had no existing `.agents/skills/` task skill at this pinned head. The new dedicated skill accompanies this program. Pi's W11 feature-matrix remains planned; stale introductory statements in older docs must not be read as a newer live certification. The design corpus requires current/target/integration classifications; retain them when implementing and update application README, docs/05/06/10, QA receipts and skill in each code cut.

## External Pi defects affecting the Mechanical consumer

Before choosing Pi-managed worktree isolation or detached execution, fix Pi `src/worktree.ts` catch path that may remove uncommitted edits on Git-preservation failure (P0), Pi detached-Claude grant mismatch (`src/index.ts` empty grants versus detached `claude:invoke` requirement), per-agent skip/retry startup abort race (pending reproduction) and source/skill replay basis gaps. Detailed code-level evidence is in the paired Pi audit. These are Pi-owned; do not work around them by weakening Mechanical's candidate/source checks.

## Conformance disclaimer

Read existing Mechanical source and documented prior live evidence, but **did not** execute the tests, Git mutations, Forge gate, npm packaging or live SDKs during this audit. This program is not a ticket close receipt, does not assert a current PASS, and does not change W11 status in Pi.
