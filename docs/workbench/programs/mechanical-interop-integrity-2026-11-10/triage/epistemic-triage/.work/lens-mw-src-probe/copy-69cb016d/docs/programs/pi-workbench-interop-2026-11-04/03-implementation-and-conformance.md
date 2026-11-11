# 03 — Coordinated implementation program and conformance oracles

Each slice is independently testable, with code, docs, skill, source/basis evidence and a measured Forge gate. Dependency edges are real; do not turn the program into an obligatory monolithic release.

| Slice | Repo owner | Work | Closure proof |
| --- | --- | --- | --- |
| MW-0 | Mechanical | Canonical committed descriptor and loader predicate, schema path grammar, external artifact consumer | Existing JSON loads actual packed tarball; wrong SHA/schema/escape refused before import |
| MW-1 | Mechanical | Host-exposed versioned local `develop` function adapter via existing rig; typed host callback binding | Installed package consumer, exactly four callback calls, all 4 outcomes preserved |
| PI-1 | Pi | Authorized `function` branch in `workflow_execute`, pinned manifest and live registry | Real registered Pi tool dispatches only explicit allowlisted function |
| MW-2 | Mechanical | Host-injected cancellation and source-scope contract for single-writer `developLive` | Cancel during SDK startup/edit/Forge preserves recoverable candidate and typed uncertain state |
| PI/MW-3 | Both | Pi → installed Mechanical → real Git-census Claude/Git/Forge flow | Exact native Claude session, changed candidate commit/tree, Forge operation/verdict observed by Pi |
| MW-4 | Mechanical + HX/RF | Native HX task/revision/completeness and committed RF provenance service bundle | Incomplete HX, stale basis, ephemeral preview all block implementation |
| PI/MW-5 | Both + Furnace | Detached and optional Furnace-supervised function callback | Reattach and observe native Run/Attempt, no blind retry, crash unknown honest |
| MW-6 | Mechanical | One pure coordination export as a pinned read-only function | No side-effect without separate Beads/Forge/Furnace authorization |
| PI/MW-7 | Both | Multi-workflow resource admission, performance and docs/status closure | Bounded peak concurrency, memory and event output with real trace metrics |

## MW-0 first red test

Read `contracts/entrypoints/development.v1.json` **from the repository** in `apps/development-rig/test/entrypoint-host.test.ts` or a separate direct corpus test. Invoke `invokePinnedDevelopment` on the existing file with a real digest-pinned artifact and injected callbacks. At the audit baseline it should fail due to schema path mismatch; use the negative result as the bug witness. Repair descriptor/host grammar consistently, rerun positive, and mutate a schema filename/path to confirm negative. Keep the host fail-closed for all other wrong contract fields.

## MW-1 services tests

- Run real `npm pack` from `packages/development`, offline install exact SHA and load the installed `develop` export; ensure neither installer nor consumer read a repo checkout.
- Bind `discover`, `compileContext`, `implement`, `verify` using normal application callbacks. Test early-return: incomplete scope invokes neither implement nor Forge; wrong basis refuses before the next callback.
- Test `verified_candidate` only for matching, producer-backed Forge evidence; missing ID, failed gate, partial gate, transport success without native verdict, and changed Git tree must not pass.
- Preserve all original outcome variants. Add result/mode/operation reference counters separate from app return status.
- Avoid a new universal command API; the callable loader is an explicit, versioned consumer of one function.

## MW-2 cancellation and source safety

Instrument a synthetic pre-dispatch barrier and a real disposable workspace. Abort before agent query, during edits, between changed commit and Forge, and after Forge dispatch before reply. An uncommitted changed file must remain recoverable; cancellation cannot report that a commit or Forge operation was reversed. Record Git ref, worktree path, owner, native SDK session/operation IDs and uncertainty; guarantee no second side-effect call without reconciliation. Include an adversarial test where a model ignores abort, and a basis drift case after an asynchronous wait.

## Native providers

- HX: an installed producer must furnish a terminal task-specific query with source revision, digest and proof of complete coverage; test false empty, incomplete and wrong-revision states.
- RF: test committed `render_id`/graph/output digest and model basis; negative control on Pi `--no-commit` preview and old CLI argv schema.
- Claude: real `@anthropic-ai/claude-agent-sdk` using allowed write tools and one isolated source checkout, bounded turn/budget settings; no Pi `AgentManager` imitation. Role instructions and skills must be part of replay identity.
- Forge: true native operation ID, candidate commit/tree, selection coverage and verdict; do not equate last_result, successful RPC or a partially selected gate with current PASS.
- Beads: use native ready/claim paths only at explicitly authorized boundaries; no implicit issue status updates or new Beads SDK fiction.
- Furnace: use native ExecutorApp with exact Run/Work/Attempt identity, manual reconciliation on ambiguous starts; no automatic second start after unknown transport.

## Cross-repo live test: do not close without this

1. Install packaged Mechanical release artifacts with their exact SHA, validated by the **actual** committed manifest.
2. In actual Pi (Workbench enabled, explicit operator grants), launch a `function` definition with `workflow_execute` into a fresh, clean, host-owned disposable workspace. Confirm no Pi script-only fallback and no unsolicited read/write side effect before admission.
3. Have the real Claude SDK commit a small test fixture change; verify the candidate commit/tree is changed and source scope unchanged.
4. Run actual Forge gate and preserve its operation and exact native PASS/FAIL/partial verdict; observe in Pi through `workflow_observe` and inspector, with no fake success.
5. Prove negative: wrong digest and insufficient grants dispatch nothing; partial HX/wrong RF proof starts no writer; cancelled/unknown writes don't repeat; detached grant refusal cannot be bypassed by policy input.
6. Record source tree, package/version, installed binary versions, commands, code and native IDs, observed outcomes, reviewer limitations and replay/restart notes. Only then change Pi W11 matrix to a witnessed status.

## QA and documentation

Use root `forge build` and its declared member/package gates; use `npm test` for local iterations; do not add GitHub CI. Existing `qa/integration/` records are historical receipts, not a substitute for this new run. The source audit used no test commands, so its expected results above are **requirements**, not measurements.

Update `contracts/README.md`, `docs/05-deployable-entrypoints.md`, `docs/06-sdk-integration-and-hosts.md`, `docs/10-current-state-and-gaps.md`, `apps/development-rig/README.md`, root README and the dedicated skill whenever implementation changes a public surface. Every new diagnostic must have a negative test or an explicit defensive-guard entry per `AGENTS.md`. Pi updates W11, Workbench user guide, receipt and skill in its own code cuts. Mutant each safety assertion. Preserve independent Beads tasks and producer source authority.

**Never** declare the function callable from Pi solely because a schema, design document, loader unit test or provider mock exists. Final conformance is the actual registered Pi → packaged Mechanical → native services → Pi observable result.
