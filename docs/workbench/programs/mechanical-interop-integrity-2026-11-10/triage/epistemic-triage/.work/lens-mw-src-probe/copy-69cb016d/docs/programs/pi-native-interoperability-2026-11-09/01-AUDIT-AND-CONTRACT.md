# 01 — Source audit, verdict reconciliation and proposed host contract

**Evidence class:** L0 static source/recorded receipts. **Pins:** MW `62a10b59`, Pi `8e2fedeb`, 2026-11-09. Neither live test execution nor a new complete Forge gate was performed in authoring this document. Reinspect current default branches and unmerged implementation branches before treating any finding as current.

## 1. Code that exists

### Mechanical core
- `packages/development/src/contracts.ts`: `DevelopmentRequest` has task, workspaceId and baseRevision; `DevelopmentServices` has precisely discover, compileContext, implement and verify. `DevelopmentOutcome` is verified_candidate / verification_failed / needs_evidence / indeterminate.
- `packages/development/src/develop.ts`: guards nonempty request, discovery/context/candidate/verification basis alignment, incomplete scope, no-op revision and absent verification producer reference. This ordinary function neither schedules nor owns SDKs/retries. Preserve its original semantics and avoid host status fields creeping into this domain type.
- `packages/coordination/src/index.ts`: extensive pure coordination, evidence, policy and training APIs; outputs are proposals or validated data, never Beads claims, Furnace transitions or Forge gate authority. Do not make read-only coordination a prerequisite of development hosting.

### Mechanical installed and live application
- `contracts/entrypoints/development.v1.json` now names `mechanical.development.develop.v1`, `mechanical-workflows/entrypoint/v1`, bare schema filenames and four callbacks. `status: descriptor-only` is retained as descriptor-only data, not a function-launch promise.
- `apps/development-rig/src/entrypoint-host.ts`: validates closed descriptor, input, exact package/export/bindings, SHA-256 of artifact, outcome consistency; caller supplies trusted loader and services.
- `apps/development-rig/src/installed-host.ts`: offline npm install from a copied tarball with scripts disabled and package/root checks; trusted in-process module import, **not an isolation sandbox**. The real committed descriptor and packed tarball are read in `test/entrypoint-descriptor-file.test.ts`.
- Rig `package.json` exposes CLI bin and packs dist/README, but has **no stable explicit `exports` host subpath**; Pi cannot consume a stable application host by contract today.
- `apps/development-rig/src/live-development.ts`, `claude-implement.ts`, `live-gate.ts`: opt-in single-writer Git/Claude/Forge path, with actual bounded native receipts in `qa/integration/` from October 15. `developLive` is not an independently installed, host-authorized Pi service bundle.
- `post-dispatch-abort.ts`, `effect-reconciliation.ts`, `invocation-identity.ts`: typed abort and lost-ack uncertainty, read-only native reconciliation, source/SDK/settings/prompt/skill/gate-manifest fingerprints. Current functions remain application-local; they do not constitute Pi's durable recovery journal.
- `rf-context.ts`, `hx-scope.ts`, Beads intake/claim, optional Furnace executor: source-specific bridges, not a universal evidence standard. November RF improvements add explicit actor, workspace, SDK version, workload observation, replay idempotency keys and unavailable-producer refusals; most newly added tests are injected-executor or CLI tests rather than a new joined Pi witness.

### Pi consumer at the same audit pins
- `src/workbench/execute-tool.ts`: registered `workflow_execute` accepts definition kinds script/function/furnace-formula in schema but refuses non-script before source resolution or launch. Its test asserts this. The `workbench/implementation-program` branch was checked and retains that refusal.
- `src/workbench/mechanical-descriptor.ts`: independently validates pinned descriptor/allowlist and loader; the Pi test uses a vendored descriptor fixture and does **not** prove one installed Mechanical host has executed.
- `src/workbench/function-authority.ts`: final-boundary principal/session and exact-grant decision. `FUNCTION_ACTION_CONTRACT` is unadopted pending joint action grammar; not called by registered function execution.
- `src/workbench/source-admission.ts`: canonical Git root, measured commit/tree/gate basis, host attestation, lease, final source check and bounded dispatch; not wired into `workflow_execute(function)`.
- `src/worktree.ts`: preserve-on-failure typed result replaces historical destructive catch for tested forms. `src/index.ts` forwards effective Claude invoke/tool grants from both detached producers, and `claude-host.ts` rechecks abort after awaited beforeDispatch. Regressions must remain tested, but they are **not** still-current missing implementation defects.
- Pi hosts, journal, `workflow_observe`, `workflow_control`, `workflow_reconcile` and `collective-event.ts` provide useful script/provider and read-only foundation; there is no registered Mechanical function host or joined observation acceptance receipt.

### Corrected claims / residual risks

| Historical audit statement | Current disposition |
| --- | --- |
| Mechanical descriptor cannot be read by local loader | **Resolved at source**; test repaired descriptor and real npm pack again on current head |
| Pi destroys edited worktree after preservation error | **Implementation corrected for enumerated failure forms**; retain tests and add crash/power-loss recovery |
| Detached Claude launch always forwards empty grants | **Corrected in two registered producers**; separately test real provider auth/effective permissions |
| Pre-dispatch abort can start late SDK after awaited callback | **Pi host rechecks whole-run abort**; confirm per-agent skip path and full lifecycle under parked barriers |
| Mechanical signal works only before SDK dispatch | **Obsolete as blanket statement**; current path distinguishes post-dispatch abort, but no durable rollback/recovery is implied |
| Pi has no Mechanical-related code | **False**; descriptor, authority, source and read-only collective event exist; execution wiring is missing |
| First class Pi→Mechanical execution is complete | **Unsubstantiated**; registered function refusal remains |
| HX scope and RF preview can vouch for complete task semantics | **False**; preserve separate producer-native acceptance gates |

> **Erratum (EAT-R028, M00-D, 2026-11-09; pin advance deferred to the owner).** The row "Pre-dispatch abort can start late SDK after awaited callback" above reads "Pi host rechecks whole-run abort" as a correction. The whole-run recheck predates the November 4/6 audits (Pi 59da7d84, 2026-10-15); those audits reported the per-agent skip/retry race during the awaited beforeDispatch. Keep the per-agent path under test as the row says. The owner decides the wording change and advances the pin.

## 2. Ownership and package boundary

**Mechanical core:** pure typed composition, callback order, domain outcome and basis constraints. **Mechanical application host:** trusted callback construction, exact installed artifact, provider SDK edges, Git source lease/candidate, effect recording, native Forge adapter. **Pi:** function admission, principal/authorization, logical invocation, placement, control request, observation, host-level budgets and operator UI. **Furnace (optional):** native durable Run/Work/Attempt lifecycle and retry decisions. **Beads:** work identity, ready/claim/close. **HX:** scoped query/coverage. **RF:** committed render and provenance. **Forge:** build and gate evidence. These authorities remain external.

The application host must be callable independently of Pi: a non-Pi TypeScript consumer can load the same pinned host and inject host-owned binding context. Pi imports only the packaged facade at its integration boundary; neither Mechanical core nor coordination code imports Pi. Do not make Forge/Furnace refer to each other or require Forge merely to execute Mechanical pure logic.

## 3. One proposed joint versioned ABI (adoption required)

The existing Mechanical descriptor is a package-entrypoint metadata contract; Pi's `DefinitionRef` is a saved-definition identity. They are **not** the same digest. Adopt a minimal application-host binding contract, proposed name `mechanical.pi-host/v1`, with these independent axes:

~~~ts
// Proposed application-host-only contract; NOT a shipped export.
interface MechanicalHostBindingV1 {
  contract: "mechanical.pi-host/v1";
  descriptorId: "mechanical.development.develop.v1";
  artifact: {
    package: "@mechanical/workflows-development";
    export: "develop";
    sha256: string; // exact npm tarball bytes
    descriptorSha256: string; // committed descriptor bytes
  };
  source: {
    workspaceRealpath: string;
    baseCommit: string;
    baseTree: string;
    forgeManifestSha256: string;
  };
  invocationId: string; // Pi's logical ID; no provider identity forged
  evidenceProfile: "git-census-v1" | "hx-task-scope-v1";
  contextProfile: "plain-v1" | "rf-committed-v1";
  intent: {
    task: string;
    writer: "single";
    allowedEffects: readonly string[];
  };
}
// Pi's existing hostMode is transport: embedded | detached.
// Effective grants, principal and session are host-owned, not request fields.
~~~

Proposed facade: a stable typed `@mechanical/development-rig/host` subpath (final spelling chosen jointly after package test), exporting an explicit versioned host function and typed start/observation/settlement interface. It must bind actual `DevelopmentServices` through **application-owned factories**, not from JSON-provided callback names. The package's current loader is a possible implementation primitive; it is not itself sufficient admission or runtime isolation. Avoid a generic arbitrary-export registry and an opaque unversioned `invoke` method.

**Binding decision gate:** Mechanical and Pi agree in writing on request/response schemas, stable entrypoint ID, artifact layout, exact permission grammar, event/version vocabulary, control types, error/refusal mapping and compatibility policy. Implement consumer tests against *the producer package*, not a copied TypeScript interface alone. Keep `status: descriptor-only` until an actual invocable package has separately passed; a new host contract must distinguish artifact admissible from execution available.

## 4. Exact admission and execution sequence

1. Pi validates saved `DefinitionRef` source digest and reviewed function allowlist, effective principal/session/grants and embedded versus detached permission. Model input cannot provide authority.
2. Host verifies descriptor bytes, all closed fields, allowed package/export, schema files and SHA-256 npm artifact **before** trusted JS import. Revalidate identity when crossing async installation/dispatch barriers.
3. Host owns one canonical, authorized isolated workspace; measure clean Git HEAD, base tree, gate declaration, effective task/instructions/skills, selected SDK/model/tool configuration and permission basis. Missing replay axes cause replay refusal; unknown at initial admission never masquerades as a complete source witness.
4. Acquire a writer lease, re-measure source after async operations, persist effect intent before agent dispatch. Bind `discover` to Git tracked-file census and `compileContext` to explicit plain text for first release. Do not label this HX coverage. `implement` calls one bounded native Claude SDK session and requires changed clean candidate commit/tree; `verify` calls native Forge on that candidate.
5. Write provider IDs, candidate and operation refs as they become authoritative. If an effect response is lost, preserve workspace/intent and report `uncertain`; no second dispatch without native reconciliation. Release the lease only under a settled or explicitly reconciled effect state.
6. Mechanical core returns one domain outcome. The application host reports a separate transport/execution/effect/freshness envelope and native refs. Pi projects and observes it; no invented native identifiers or auto-PASS.

## 5. Outcome and evidence projection

The joint envelope must keep **seven orthogonal axes**: (a) admission/launch, (b) execution state, (c) original `DevelopmentOutcome` or absent, (d) Forge-native verdict and operation, (e) candidate source commit/tree plus parent, (f) effect disposition/not-started/started/settled/uncertain, (g) freshness/current/stale/unknown. Include provider-qualified native refs, worktree recovery handle and bounded evidence provenance. A fulfilled Promise with `verification_failed` is not a process crash; a process success with `indeterminate` is not PASS.

Never collapse `needs_evidence` into task failure, Forge `partial` into `passed`, native `FAIL` into transport error, cancelled into rollback, RF preview into committed render, or a read-only policy proposal into effect authorization. Native operation IDs can be known when result verdict remains unknown; keep both facts.

## 6. Alternatives considered and rejected

- **Run Mechanical CLI under a Pi script/node:** useful diagnostic only; bypasses registered function identity, admission and observation.
- **Copy `develop()` into Pi:** creates competing domain semantics and a hidden coupling.
- **Make Mechanical a generic engine/scheduler:** duplicates Furnace, loses ordinary-function property.
- **Treat local npm temp install as a security sandbox:** incorrect; only reviewed/trusted executable artifacts may be imported.
- **Require HX/RF completion before v1:** unnecessarily blocks the already working Git-census/plain development path.
- **Automatically retry unknown writes:** risks duplicate commits, gate operations and Beads/Furnace effects.

## 7. Evidence limitations at this audit

No live joint Pi→Mechanical run, release artifact performance measurement, full native crash/reattach or complete HX task-scope producer proof was obtained by this audit. Existing October native receipts and November test/commit reports are cited only at their recorded scope. Every implementation cut must re-pin current code and measure its own exact changed tree. Use [work packets](02-IMPLEMENTATION-PACKAGES.md) and the [verification tail](03-VERIFICATION-AND-RELEASE.md).
