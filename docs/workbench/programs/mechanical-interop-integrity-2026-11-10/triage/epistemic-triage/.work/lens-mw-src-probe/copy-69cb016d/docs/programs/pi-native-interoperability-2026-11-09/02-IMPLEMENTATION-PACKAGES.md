# 02 — MechanicalWorkflows delivery packets and cross-repository handoffs

**Program type:** implementation design, not claimed delivery. **Owner:** MechanicalWorkflows. **Audit pins:** MW 62a10b59 / Pi 8e2fedeb; re-pin at work time. **Related original tracks:** MW-R0..R8, MW-BM-01..05, Pi W11/VC-3, B-descriptor/B-source/B-authority/B-dispatch/B-outcomes/B-effects/B-observe/B-git-census and 2026-11-04 EAT requirements. Reuse real Beads issue IDs from the local repositories; identifiers below are *new planning labels*, not issued beads.

## Work method

For **every packet**: first read all implicated source and prior tests; record both current HEADs and any unmerged machine deliveries; create or reuse the Beads issue; write a failing consumer-oriented test and a negative mutation; implement the smallest change; run focused suite and applicable Forge gate; preserve actual command/exit/receipt/provenance; update README, AGENTS, docs, source examples and `.agents/skills/mechanical-pi-host/SKILL.md` as appropriate in that **same implementation cut**. A documentation commit is not completion. Never alter historical receipts to upgrade status. Use direct main-branch integration only when independently reviewed and source-head safe; no GitHub CI or PR is required.

## Dependency DAG

~~~text
M00 baseline/ABI ruling
   ├─ M01 packaged host export ────┐
   ├─ M02 service adapter ─────────┤
   ├─ M03 source/effect identity ───┤
   └─ M04 cancel/reconcile ────────┤
                                   ▼
                        M05 installed consumer
                                   │
                       Pi P01–P06 registered function
                                   │
                                   ▼
                        M06 joint native acceptance
                                   │
                        M07–M09 verification tail
                                   │
                  M10 coordination / M11 HX+RF / M12 Furnace
~~~

Parallelize M01–M04 only if they do not edit overlapping files; branch/tree re-review and full gate remain required. The final QA tail is **not** deferred to optional extensions. Functional acceptance M06 is incomplete until M07–M09 exit.

### M00 — Baseline reconciliation and joint ABI adjudication (P0)

- **Scope:** inspect `contracts/entrypoints/`, `packages/development/`, rig package/exports, `docs/05–10`, `AGENTS.md`, Pi source/registered tool, current feedback and local Beads issues; verify October/November fixes are present. Record current Node/SDK versions and actual installed manifest constraints.
- **Decision:** ratify `mechanical.pi-host/v1` or explicitly version another; distinguish Pi `hostMode` from host-owned `evidenceProfile` and `contextProfile`. Choose exact representable function-action grant with Pi (candidate `mechanical:develop-write`, **not yet adopted**); no three-colon permission. Agree descriptor artifact packaging, no arbitrary export, identity/ref vocabulary, cancellation and version migration.
- **Deliverables:** signed-in-repo contract table, actual TypeScript types/JSON schema when implemented, producer+consumer contract tests and compatibility fixtures; mapping of old EAT/MW/PI-BM requirements (preserve IDs and correct resolved statuses, no duplicate numbering).
- **Falsifier:** test an old descriptor fixture, missing/extra field, unknown version, bad grant and disputed profile spelling; no provider import/effect. **Exit:** one mutually confirmed ABI and measured current component baseline. If unsettled, all writes stay gated.

### M01 — Independently installed host facade (P0; depends M00)

- **Edit:** `apps/development-rig/package.json`, `src/entrypoint-host.ts`, `src/installed-host.ts`, new narrow `src/host.ts` (or justified named module), `contracts/`, external installed-consumer tests.
- **Implement:** one stable exported host subpath, typed versioned API and error shapes; manifest lists compiled JS and declarations. The host loads the exact independently packed `@mechanical/workflows-development` artifact and committed descriptor by SHA-256, before executing trusted code. The rig itself must also be packable/importable independently without reaching into its source checkout; no ambient module resolution from the monorepo.
- **Controls:** immutable bytes; closed metadata; package/export/id allowlist; schema refs scoped to shipped canonical files; reject symlink/path traversal/control characters, directory/FIFO, digest mismatch, manifest drift, missing export and extra callback. A caller-provided loader is a trusted injection seam, not authorization.
- **Tests:** retain `entrypoint-descriptor-file.test.ts`; add external temp npm project importing `@mechanical/development-rig/host` and packed library; success with real descriptor and injected no-effect callbacks; refuse bad SHA or schema before import. Negative mutant swaps pack bytes after initial digest.
- **Exit:** `MW-INSTALLED-HOST` L2 receipt: exact pack hash, file list, Node version, clean external import, input/output and denial proof. Pi must consume this released shape, not invented source exports.

### M02 — Application-owned development service bundle (P0; M00, parallel M01)

- **Edit:** rig composition root/new `host-services.ts`, `live-development.ts`, `claude-implement.ts`, `live-gate.ts`; **do not** add SDK imports to `packages/development/`.
- **Implement:** explicit four-closure `DevelopmentServices` factory around pinned workspace/request; Git tracked-file census and intentionally plain context first; one authorized bounded native Claude Agent SDK writer; verify committed changed source via native Forge. Share existing rig code rather than copy the entire CLI or rewrite the core.
- **Correctness:** exact request basis before each callback; if discovered scope is partial, fail before writer and map to `needs_evidence`; if committed candidate is unchanged, dirty, wrong parent/tree or Forge definition changed, do not claim verified. Preserve original provider IDs and native verdict axes.
- **Tests:** four-callback spy order, all four output arms, unknown scope leaves writer/gate at zero, SDK throws after a write, no-op commit, changed tree with stale base, all Forge FAIL/partial/unknown/incomplete selection and wrong operation basis.
- **Exit:** direct independently installed host can run the **real application-owned bundle** against a disposable Git scratch project. No claim of Pi registration until M06.

### M03 — Source authority and replay identity closure (P0; M00, supports M02)

- **Edit:** `invocation-identity.ts`, `live-gate.ts`, host request/binding, tests. Reuse source digests already captured by `developLive`; add only missing cross-host axes.
- **Identity minimum:** canonical authorized workspace realpath, principal/session and Pi invocation, base SHA/tree, Git status/index/untracked handling, Forge manifest hash, descriptor+tarball SHA-256, effective task, prompt/instructions/skills, model/tools/permissionMode, provider and SDK names/versions, context/evidence profiles, selected native gate parameters. Missing axes are explicit and disallow reuse; an initial run can refuse replay rather than fabricating a complete identity.
- **Effects:** host emits one intent record before a write, native agent session/commit and Forge operation once received, and settles/uncertain with external native refs. Candidate verification binds exact committed tree and gate definition, not only a human-readable gate status.
- **Tests:** one-byte mutations for every axis; source changes during async preflight; index-only, untracked, symlink, submodule, changed `forge.toml`, stale gate and wrong-authority attestations; no write on failed preflight. Replay with unknown provider basis is refused.
- **Exit:** effect/source evidence carries across typed host output; Pi can join it to a logical invocation without guessing IDs.

### M04 — Cancellation, transport loss and effect reconciliation (P0; M00, M02/M03)

- **Edit:** `live-development.ts`, `claude-implement.ts`, `post-dispatch-abort.ts`, `effect-reconciliation.ts`, optional host controls and tests.
- **Build on existing:** pre-dispatch `DEVELOPMENT_CANCELLED_BEFORE_DISPATCH`, post-dispatch `DevelopmentAbortedAfterDispatchError`, `DevelopmentLostAcknowledgementError`, read-only `reconcileUncertainEffect`. Do not delete existing invariants or relabel an abort as rollback.
- **Add:** application-host propagation of cancellation request and a structured progress callback through discovery, context, SDK startup, first edit, commit, gate dispatch and settlement; SDK abort only through supported public control. Capture last native session/operation refs; surface late producer success after cancel without pretending it never wrote.
- **Recovery:** uncertain effect freezes automatic writer/gate replay and preserves worktree; read-only producer reconciliation distinguishes occurred/not-occurred/unknown, with retry permitted only by a witnessed not-occurred result plus fresh authorized source basis. A lost Beads claim, Furnace Attempt, RF commit or Forge gate never silently restarts.
- **Tests:** abort already set, abort while `beforeDispatch` is parked, SDK ignores abort and returns later, commit failure, worktree dirty, Forge reply lost after dispatch, process kill after candidate commit, twice-delivered event; repeat test with real tracked and untracked bytes. No second writer or Forge call when uncertain.
- **Exit:** typed control and reconciliation semantics are observable by the independently installed host; Pi wires its own lifecycle separately.

### M05 — Installed Pi-consumer conformance (P0; M01–M04)

- **Edit:** isolated external package fixture and `qa/integration/` receipts; coordinate Pi P-descriptor/P-contract implementation.
- **Exercise:** install compiled Mechanical packages from pinned tarballs into an independent npm project with Node 24, import host by named export, pass effective host-owned binding and run `develop()` with fixture-safe services.
- **Negative suite:** corrupt descriptor/tarball bytes, alternate export, transient swap after validate, symlink escape, missing callback, unauthorised workspace, concurrent writer and source drift. Assert no import/SDK/gate effects before final admission.
- **Exit:** producer and consumer agree on exact API, version, request/output and denial data; Pi can import without Mechanical repo checkout. Local installed-consumer is **L2**, not native provider proof.

### M06 — First joint registered Pi→Mechanical→Claude/Git/Forge journey (P0; M05 and Pi registered dispatch)

- **Joint:** invoke the actual Pi `workflow_execute` tool with `kind:function`, reviewed saved definition and admitted exact Mechanical artifact; observe via `workflow_observe` and inspect resulting native provider refs. No use of `SubagentWorkflow`, direct `develop()` or shell `node()` may substitute for this gate.
- **Positive:** disposable isolated clean Forge workspace; Git census/plain; one bounded Claude agent makes nonempty changed committed source; native Forge runs and returns exact PASS candidate tree; Pi shows original `verified_candidate`.
- **Negative:** same path with partial scope → `needs_evidence`, Forge FAIL → `verification_failed`, unknown transport/proof → `indeterminate`, invalid permissions/source → refused before import.
- **Exit:** joint `PI-FUNCTION-REGISTERED` then `PI-GIT-CENSUS-LIVE` receipts with Pi invocation, candidate commit/tree, installed SDK versions, original Mechanical outcome, Forge operation and proof, no phantom IDs. M06 alone is not release completion; enter verification tail.

## Mandatory test/verification-focused tail

### M07 — Adversarial contract and outcome falsification (P0; M06)

Run every negative row in [03](03-VERIFICATION-AND-RELEASE.md) through both host facade **and the registered Pi tool**. Independently mutate definition digest, descriptor, tarball, grant, source commit, tree, skills, Forge manifest, native verdict axes and outcome envelope. Every falsifier must demonstrably turn its intended positive assertion red, and the real code must refuse without unexpected provider side effects. Add non-equivalent positive controls so a blanket refusal implementation cannot pass.

### M08 — Crash recovery, cancellation and multi-invocation soak (P0; M06/M07)

Exercise each effect edge (before writer, during edit, after commit, gate dispatched but unacknowledged, after native PASS but before Pi observation, detached process death). Retain dirty work and native IDs; no duplicate write/claim/gate; fail closed when native readback inconclusive. Measure host/global concurrency, backpressure, arrival/completion counts, event gaps, memory/FD growth, cumulative token/SDK cost and clean teardown at 1, 4, 16 and a larger bounded concurrency if the environment supports it. Define acceptance thresholds from an observed baseline, not fabricated numbers.

### M09 — Release, documentation, skills and installed operator acceptance (P0; M07/M08)

Re-run exact clean candidate HEAD local Forge full gate, `npm test`, independent `npm pack` + installed consumer and Pi registered/live acceptance under the same pinned artifact. Provide one adversarial fixture per denial class, the full four-outcome witness and an operator-friendly inspection of current state, candidate, native gate and uncertainty. Update `docs/05/06/07/08/10`, app README, root README/AGENTS, mechanical-pi-host and any RF skill, and Pi's skill/matrix in their own code cuts. Prevent stale present-tense claims. Merge/re-pin/gate again after any subsequent source change. W11 cannot be marked shipped until **joined L4 native proof** and final release-tail gates pass.

## Optional, nonblocking work after first release

### M10 — Pure coordination host (P2)
Expose a separately allowlisted, schema-pinned read-only coordination evaluator only if an external consumer needs it. No external effect from `Policy` or GP/MicroPolicy recommendation without an authorized resolver. Check JSON determinism, empty/malformed inputs, time/memory bound, no transitive provider import.

### M11 — Certified HX + committed RF context (P2, gated on producer witness)
Add host-selected `hx-task-scope-v1` only on terminal native query/coverage with task/revision/digest, absence and completeness licensed. Add `rf-committed-v1` only with committed render ID, model, graph revision, digest, budget, workspace/actor and current source. Cover idempotent same-key replay, missing RF executable, lock pressure versus currentness conflict and preview-substitution denial. Keep first Git/plain release unaffected.

### M12 — Furnace-owned detached/durable application hosting (P2, gated)
Map real Furnace ExecutorApp/Run/Work/Attempt identity to the same Mechanical function and Pi observer. Let Furnace own retry/scheduling/stop decisions. Test lost `runs.start` acknowledgement, reattach, controller liveness, partial/unknown/FAIL and Run terminal consistency. Never invent `runs.ensure` or a `run wait` command, and never duplicate a Furnace-owned Attempt.

## Implementation handoff and change discipline

Each independent landing includes: exact current SHA/branch; an existing Beads ID or newly created real ID (never fictional); change scope; source/runtime/contract acceptance; initial red tests/mutants; implemented code; focused and full Forge gate outputs; packaging result; native receipts when applicable; known-unknown list; skill and docs parity. A failing native external dependency remains a typed blocker with version and smallest reproduction, not a fake local PASS. Restrict shared multi-agent edits to separate files and avoid frozen census/header edits that conflict with sibling seats. [Verification plan](03-VERIFICATION-AND-RELEASE.md) is mandatory and makes all release claims falsifiable.
