# 03 — Pi native Mechanical interoperability: testing, falsification, recovery and release gate

**Release tail is mandatory:** P08, P09 and P10 are part of first `workflow_execute(function)` support, not optional polish. No commands in this plan were executed to author it. Requirement labels/gate names become actual claims only with a passing receipt on a pinned candidate.

## Acceptance hierarchy

| Level | Evidence | May claim | Must not claim |
| --- | --- | --- | --- |
| V0 | current exact repo source/commit and external contract inspection | implemented code shape and grounded gaps | actual test pass |
| V1 | red/green focused tests + adversarial mutants | bounded behavior on named fixtures | installed runtime or native provider |
| V2 | real independently packed Mechanical artifact imported by Pi external consumer | function ABI, descriptor, version and package identity | registered Pi execution or native Forge |
| V3 | actual registered `workflow_execute(kind:function)`, tested with injected finite callbacks | real Pi tool routing, permission and observation wiring | native Claude/Git/Forge proof |
| V4 | same registered route with installed SDK session and complete native Forge candidate proof | first verified live Pi→Mechanical interop | durable restart/Furnace fleet or HX/RF proof |
| V5 | crash/restart/lost acknowledgment, controls, multiple invocation/budget/UX trials | tested recovery and operational limits | a larger fleet not tested |
| V6 | optional native Furnace/HX/RF producers | provider-specific extension only | automatic certification of all profiles |

A source commit, passing test file, mocked callback, Forge-shaped JSON, standalone Mechanical CLI PASS or historical producer operation is insufficient for V4. Require a new joined Pi invocation + native SDK/Forge/source receipt.

## Red-first development policy

Every new implementation packet must include a **valid positive** and a **single-fault negative** at the registered path. Preserve the pre-implementation failing output before the code lands. Mutation tests remove one check (for example final rights re-read, digest, source change, intent write, gate selection proof or worktree preservation): the relevant assertion must turn red. Record mutant not run/survived/equivalent rather than declaring all killed. Avoid huge text-census assertions that pass while the registered route is inert; test behavior through the registered tool and observer.

Tests must be independent of the current `new-feedback` free-form notes or frozen `.beads/issues.jsonl` prose. Keep per-cut tests in separate files where possible; avoid unrelated broad shared headings/census edits that collide under concurrent machines. When a docs/file census requires acknowledgment, add exactly the new reviewed paths and record the reason; never weaken an invariant to make it green. Distinguish test timeout, tooling/environment red and true assertion failure.

## A. Registered dispatch, package identity and permissions (P08, V1–V3)

| Test ID | Positive | Mutation / negative | Expected real registered-tool observation |
| --- | --- | --- | --- |
| A01 | exact saved `function` definition | arbitrary `function` id, fake schema, `furnace-formula` | refused; zero source load / native launch |
| A02 | correct Pi saved source digest | one-byte change to saved definition | no Mechanical artifact import |
| A03 | Mechanical committed descriptor + SHA | stale vendored fixture; extra/duplicate field; wrong schema-ref or traversal | refused before import with diagnostic |
| A04 | actual pinned npm pack artifact | wrong manifest, changed tarball byte, path/symlink swap | no importer or provider call |
| A05 | exact reviewed host subpath | attacker-provided module/export/URL/shell string in JSON | no arbitrary module or command evaluated |
| A06 | `workbench:execute` plus exact function action | grant absent, prefix/wildcard, wrong namespace, model-supplied grant | no function dispatch |
| A07 | detached additionally holds `workbench:detach` | omit detach right | refused before detached host |
| A08 | Claude session holds `claude:invoke` and tool rights | omit one SDK tool right; forge rights in policy only | native host preflight refuses correctly |
| A09 | current Pi principal/session | change principal or session after parked admission, impersonate in input | final authority refusal, no write |
| A10 | clean canonical workspace | dirty tracked/untracked/index; misdirected git; symlink alias; submodule / unmerged | source admission refusal, bytes retained |
| A11 | stable Git tree and Forge manifest | move HEAD after initial measure or change `forge.toml` | no stale writer or verification |
| A12 | one writer lease | concurrent invocations to same realpath/alias | exactly one admitted writer or safe bounded refusal |
| A13 | one registered Pi tool for function, existing scripts | duplicate workflow tools / run same script golden fixture | no tool naming conflict or script behavior drift |
| A14 | no invalid extra fields | model injects principal, grants, module, profile or hidden policy | host never gains capability from input |

For A01–A14, test **actual Pi registered tool definitions** captured from `src/index.ts` registration rather than only `decideExecute` or the Mechanical descriptor helper. For V2 specifically import a fresh independently packed `@mechanical/development-rig/host` and `@mechanical/workflows-development` from temp consumer outside both repos; record SHA of package bytes and manifest, and assert real export callable. A passed descriptor-loader unit against a mock function is V1, not V2.

## B. Mechanical semantic fidelity, native gate and Pi observation (P08, V3–V4)

| Test ID | Producer behavior | Required Pi output and prohibited collapse |
| --- | --- | --- |
| B01 | complete source, native Forge PASS, matching changed commit/tree and producer reference | domain `verified_candidate`; separate process/gate/freshness axes |
| B02 | candidate correct, native Forge FAIL | domain `verification_failed`; operation/ref remains; not transport failure |
| B03 | partial/unknown scope | domain `needs_evidence`; agent/Forge never dispatched |
| B04 | SDK/Git basis invalid or Forge verdict partial/unknown | domain `indeterminate`; no false PASS |
| B05 | mechanical function refused before invocation | no invented domain, launch refused / effect not-started |
| B06 | gate transport exit zero but actual native FAIL/incomplete required step | not PASS; original native axes retained |
| B07 | cached historical PASS while HEAD or manifest changed | historical proof visible but freshness stale; current gate credit revoked |
| B08 | blank agent session, absent Forge operation ID, missing candidate tree | no verified claim; diagnostic/unknown |
| B09 | bounded out-of-order native observation and dropped cursor | explicit gap/stale, not implied successful completion |
| B10 | archived Pi invocation re-opened after originating model turn | exact domain/native refs and source identity present |
| B11 | user stop during SDK write then late SDK commit | cancellation requested; effects uncertain/occurred, never rollback |
| B12 | present pure coordination proposal | non-authoritative; never automatically claims Beads or passes Forge |
| B13 | unsupported HX task scope / Pi RF preview | Git/plain remains operable; unsupported higher profile refused |
| B14 | no code change candidate / changed HEAD same Git tree | no verified candidate, gate not credited |

For B01–B04, assert the **complete original Mechanical outcome payload** and the separate host envelope, not only a `kind` string. Every outcome must be exercised through `workflow_execute` plus `workflow_observe`; a direct `develop()` fixture counts only as an additional control.

The native V4 gate requires an actual Claude SDK session ID, source base/commit/tree, Forge full selection and native operation identifier, matching candidate commit/tree and gate manifest, Pi invocation/definition ID, package/descriptor/SDK versions, exact input task and original domain. Two native negatives: one genuine Forge FAIL and one unknown/refusal (e.g. dirty basis or incomplete gate). Use producer-native API evidence; do not rely on an assistant's summary.

## C. Cancellation, journal, recovery and replay (P09, V5)

Fault tests must record full tracked **and untracked** worktree bytes, HEAD/index, source/permission basis, native-effect attempt count and Pi journal before/after. Each fault is injected at an independently controlled barrier and, when feasible, inspected after a separate process restart.

| Phase killed or interrupted | Expected invariant | Fail if |
| --- | --- | --- |
| before descriptor import | zero import/callback/SDK effects | imported untrusted artifact |
| after source measure, before final right check | stale/revoked grant prevents launch | cached admission authorizes |
| writer lease acquired, no effect yet | claim not executed; release or reconcile responsibly | second writer enters shared root |
| `beforeDispatch` pending + per-agent skip | pending cancel honored at exact test barrier | late SDK query starts |
| native Claude started, before first output | unknown/active session identified or explicitly unknown | auto-repeat without native read |
| after tracked/untracked edit, before commit | bytes and recovery path preserved | force-remove returns false clean |
| after Git commit, before acknowledgment | native commit SHA/tree recoverable | second commit or false not-started |
| Forge gate dispatched, reply lost | native operation lookup / indeterminate | silent second `gate.run` |
| native gate settled, Pi observation lost | native refs and truthful historical outcome persisted | fabricated new gate or lost source |
| cancel after writes + late completion | report actual code effects, no rollback claim | claims cancellation erased source |
| host process killed during observation | stale/unknown cursor; reattach id and ref | old cached event represented current |
| journal replay with changed skills/model/tools/gate source | old answer refused/stale | replay based only on task label |
| repeated cancel/reconcile event | idempotent control, one effect | duplicate agent/gate/claim |
| inability to consult Git/Forge native source | unknown with operator instruction | `not-occurred` inferred from no response |

**Recovery decision:** `occurred` only from producer-native evidence, `not-occurred` from positive authoritative absence at a queryable identity and current source, `unknown` from incomplete read. Only positively evidenced not-occurred plus newly authorized source may permit a new dispatch. A cancellation request never closes Beads, resets Git, reverses a Forge gate or undoes a Furnace Attempt.

Test that `cleanupWorktree` preservation-failed returns truthfully on status/add/commit/branch failures, and that the function host uses the safe path. Existing tests cover selected forms, not every crash scenario; run the broader injected and process-kill controls for V5. For detached/Furnace optional mode, use the native controller/Run/Attempt to reconcile, not a made-up local scheduler.

## D. Regression, packaging and real provider commands

The minimum source-level commands to **run when actual implementation lands** (check current scripts first):

~~~sh
# pi-subagents, clean commit
npm ci
npm run lint
npm run typecheck
npm run typecheck:test
npm run test
npm run build
forge build

# MechanicalWorkflows, separately clean commit
npm ci
npm test
forge build

# Mechanical producer and rig:
# npm pack their built members; independent temp consumer install;
# then Pi registered function path with that exact packed host.
~~~

Existing Pi tests to preserve/extend: `test/workbench-execute-tool.test.ts`, `test/workbench-mechanical-descriptor.test.ts`, `test/workbench-function-authority.test.ts`, `test/workbench-mechanical-source-admission.test.ts`, `test/workbench-detached-grants.test.ts`, `test/worktree.test.ts`, `test/workflow-effect-replay.test.ts`, `test/workbench-observation*.test.ts`, `test/workbench-mwi-release.test.ts`. Add narrowly named registered Mechanical launch/outcome/recovery tests, not a single giant census. Verify source files before using exact globs.

**Separate test runs by claim:** pure unit/fixture, cross-repo installed consumer, registered tool with fixture callbacks, native registered Claude/Forge, crash/restart and performance. A default `forge build` may exclude opt-in native lanes; run the native lanes explicitly and store output. A green default gate must not falsely certify native provider behavior. Underlying SDK/CLI versions must be read from installed manifests and native envelopes.

**Node matrix:** the audited overlap is Node 24 (Pi >=24, Mechanical rig >=22.18 and <25). First joint release must run this. Additional OS/Node versions are supported only if independently tested; mark not run otherwise.

## E. Bounded observation, performance and resource tests

Instrument admission duration, digest/descriptor check cost, installed package load, first SDK session effect, Git census/context, agent implementation, Forge verification, persisted journal/recovery, observer delivery and UI projection separately. Report attempted/admitted/queued/started/settled/failed/uncertain counts and reasons, native provider calls, RSS/heap peak, file descriptors, queue length, stream drops and total SDK/token spend.

Run baseline at 1 and 4 concurrent isolated invocations; then 16 read-only/fixture calls with independent roots and repeat to expose leaks. If host capacity allows, run a bounded larger tier. Run at least two competing writers on the **same** root with canonical path aliases to verify lease. No unbounded effectful load on shared source. Provide p50/p95 per phase, peak resources and bounded waiting/fairness. Define numeric SLOs after measurement; do not import historical npm-prep median as current data. Include cold vs warm installs with correct tarball SHA revalidation.

Measured performance gates should assert stable counters/caps; avoid wall-clock flakes under variable provider timing. Record unsupported/unrun levels honestly.

## F. Operator and agent experience acceptance

The actual Pi operator must be able to answer, without guessing: Which reviewed function and artifact? Which git root/base commit/tree? Which `evidenceProfile` and `contextProfile` actually executed? Which agent session/Forge operation? What is current stage? Was cancel requested or effective? Are effects uncertain? What can be safely retried? Why is an HX/RF high-evidence profile unavailable? Can I reopen the invocation after completion/restart?

Use Pi's existing inspector/footer/card and tool `workflow_observe` where appropriate; no second dashboard is mandatory just for Mechanical. Respect byte budget and redaction; keep native IDs, evidence gap and source stale labels in structured detail even when model-facing summary trims text. UI success glyph must never mean native Forge PASS without current proof. A long-lived Mechanical function has to remain addressable by its Pi logical invocation ID.

Run ten agent LX scenarios from installed README/AGENTS/skill only: (1) distinguish script from function, (2) discover the current registered command, (3) refuse wrong grant, (4) recognize an artifact mismatch, (5) interpret each four domain states, (6) inspect native Forge source, (7) cancel a running writer safely, (8) reconcile unknown after restart, (9) choose Git/plain versus HX/RF, (10) explain Furnace ownership. Score whether named commands actually exist and the agent does not invent unshipped APIs. Feed failures into skills/help and tests in the **same** implementation cut.

## G. Exact release evidence and gating

Each package must emit per-cut receipts, and the joint gate must join them:

~~~yaml
program: pi-mechanical-native-interop-2026-11-09
phase: P07|P08|P09|P10
evidence_level: V0|V1|V2|V3|V4|V5|V6
status: PASS|FAIL|BLOCKED|NOT_RUN
pi_sha: exact-source-commit
mechanical_sha: exact-source-commit
pi_branch: exact-branch
mechanical_branch: exact-branch
pi_saved_definition_digest: exact-or-null
mechanical_descriptor_sha256: exact-or-null
mechanical_rig_tarball_sha256: exact-or-null
mechanical_library_tarball_sha256: exact-or-null
node_and_sdk_versions: producer-read-map
source_base_commit: exact-or-null
source_base_tree: exact-or-null
candidate_commit: exact-or-null
candidate_tree: exact-or-null
forge_manifest_sha256: exact-or-null
pi_invocation_id: observed-or-null
native_claude_session_id: observed-or-null
native_forge_operation_id: observed-or-null
native_forge_verdict: PASS|FAIL|partial|unknown|not-run
mechanical_domain_outcome: original-object-or-absent
execution_status: observed
effect_disposition: observed
freshness: current|stale|unknown
commands_and_exit_codes: [exact measured argv and output]
tests: [ids, result, source-pin]
negative_mutants: [id, expected, observed]
performance: measured-or-not-run
limits_and_unknowns: [text]
~~~

This is a suggested receipt skeleton; use an adopted product version if different. No fabricated native IDs, no overwriting historical `TRACEABILITY.md`, no claiming `PARTIAL` as PASS. Store actual source/manifests and full output in bounded reproducible paths. Use Pi's `qa/workbench/mwi-release.mjs` and its release tests as **evidence validators**, not invocation runners; they cannot themselves establish a native function call.

## H. Final W11 promotion gate and veto conditions

**Required before mark W11 shipped:** exact mechanically adopted versioned ABI/grant, correct production registered function branch, real producer artifact installed independently, positive and failing admission controls including no-import, original Mechanical four outcomes through Pi, full native Claude/Forge joint PASS and FAIL/unknown, native IDs matched to source and Pi invocation, conservative cancellation and replay after fault, bounded resource tests, script/Agent/detached regressions, operator inspection, current README/AGENTS/skill/source examples, Forge complete gates on final landed SHA and release-validator PASS.

**Vetoes:** function launch still says unsupported; only a script/CLI/helper works; stale/refuted audit defects repeated as current; arbitrary model-supplied code/rights/host profile; misleading Forge PASS; missing candidate/tree; unknown effect retried; destructive worktree cleanup; incorrect status collapse; no observer; tests/gates from different commits; unmeasured but claimed cost/load; W11 set to landed solely by docs.

**Explicit non-vetoes for first Git/plain v1:** HX task-scoped complete coverage, RF committed contextual model, remote host fleet, general-purpose orchestration registry, pure coordination/GP policy execution and Furnace Run/Attempt. Enable each only under separately witnessed native provider gates.

**Last operation:** after merging all source/skill/documentation fixes into actual default branch(es), re-pin *both* heads, recompute both package hashes, rerun final required gates and the joined V4/V5 evidence. Any additional source change invalidates the old final-tree acceptance until re-gated.
