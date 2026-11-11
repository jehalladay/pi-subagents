# 03 — Verification-first tail: contract, native execution, faults, recovery, load and release

**Mandatory:** M07–M09 from [implementation packets](02-IMPLEMENTATION-PACKAGES.md) are part of v1 release, not stretch goals. Every assertion has a falsifying input and observed receipt. No tests or infrastructure journeys were run for this design document. Names below describe acceptance targets until measured.

> **Erratum (EAT-R030 falsifier scope, M00-D, 2026-11-09; pin advance deferred to the owner).** Every matrix row (C01 to C24 and the fault matrix) pairs a mutation with a required observation. The performance, agent-LX and packaging sections state methods without per-assertion falsifiers, so the sentence "Every assertion has a falsifying input and observed receipt" covers the matrices only. The owner decides the wording change and advances the pin.

## Evidence ladder: never promote a weaker witness

| Tier | Required evidence | What it does not prove |
| --- | --- | --- |
| L0 audit | exact repo SHA, file/line, compiled/API contract inspected | executable behavior |
| L1 deterministic | focused unit/property tests + red/green and negative mutant, source pinned | installed artifact or real provider |
| L2 installed producer/consumer | independent `npm pack` artifacts, SHA and manifest file list, fresh temp npm consumer, live import of shipped export | real Claude/Forge or Pi registered path |
| L3 native producer | actual SDK session/operation, exact versions, native Git commit/tree and Forge complete gate envelope, failure and unknown | registered Pi function dispatch |
| L4 joined registered | actual Pi `workflow_execute(function)` and `workflow_observe` correlate logical invocation, original Mechanical outcome, source tree and Forge native refs | detached restart/Furnace Attempt or workload scale |
| L5 lifecycle/soak | injected and (where safe) real kill/lost ack/late completion/duplicate event, reattach and multi-call measurements | HX/RF completeness unless independently witnessed |
| L6 optional producer tier | HX task query/coverage and RF committed render (or Furnace Run/Attempt) with native IDs/versions and negative controls | automatic retroactive certification of Git/plain v1 |

The root Forge green result and a direct `develop()` fixture remain L1; independent Mechanical installed tarballs are L2; historical October-native receipts are **historical L3 for their then-current source**, not new L4 proof.

> **Erratum (EAT-R030 ladder, M00-D, 2026-11-09; pin advance deferred to the owner).** Within this program the L0-L6 ladder above supersedes the ladder in docs/08-qa-and-conformance.md; the two ladders disagree on L4, so read both: docs/08-qa-and-conformance.md keeps governing work outside this program. The owner decides the wording change and advances the pin.

## Test construction rules

1. **Red first:** for every new capability, write a consumer-facing test against currently shipped source and preserve the failing predicate/output. A test that only scans a comment is not behavioral evidence.
2. **Positive and negative pair:** every refusal has a nearly identical authorized positive control; a universal deny stub cannot pass.
3. **Mutant survives means not proven:** for each safety property inject the named regression (skip digest read, accept stale basis, coerce Forge FAIL to PASS, erase worktree, blindly retry, bypass grant). The target test must fail. Record equivalent/quiet mutants without claiming killed.
4. **Use actual installed artifacts:** do not substitute a hand-crafted descriptor, unresolved repo-local `dist`, mock SDK and generic npm success for independent consumer proof. Negative tests may use controlled injected fake providers when specifically labeled L1.
5. **Scoped source and receipts:** exact SHA/tree, binary/sdk versions, command/exit, relevant test names, numbered cases, evidence producer and limitations. Do not use global claims beyond probed cases or historical test counts as a new result.
6. **No fake authority:** shell/exit 0, model summary, UI display, script success, read-only policy evaluation, HX partial response and RF preview cannot establish the native source or gate verdict.

## Deterministic contract matrix (L1/L2, run both direct installed and registered Pi path)

| ID | Positive fixture | Adversarial mutation | Required observation |
| --- | --- | --- | --- |
| C01 | committed exact descriptor and schemas | missing/extra key; wrong descriptor version; bare filename becomes traversal | pre-import refusal; zero callbacks |
| C02 | SHA-pinned npm tarball | swap one byte, symlink/mutable artifact, mismatched installed manifest | no import, zero agent and Forge calls |
| C03 | allowlisted `develop` export | arbitrary package/export/path/URL/code string | refusal, never execute attacker-selected module |
| C04 | host authorized principal/session/workspace | model-provided grants or changed principal while parked | refusal at final boundary; no writer |
| C05 | exact read/write grant | no grant, similar-prefix grant, revoked grant after admission | zero effect; unchanged source |
| C06 | clean isolated source commit/tree | dirty staged, unstaged, untracked, unmerged, symlink escape or wrong realpath | refuse or explicitly preserve unknown before edit |
| C07 | complete Git census at pinned basis | partial/unknown discovery or wrong workspace/revision | `needs_evidence` or `indeterminate`; no implement/verify |
| C08 | plain compiled context at same basis | stale/mismatched context or untrusted RF preview substitution | not verified; writer blocked when basis inconsistent |
| C09 | single native Claude writer | SDK startup failure or no session ID | `indeterminate`/typed refusal; no Forge credit |
| C10 | changed committed candidate | empty commit, same tree, changed-then-reverted tree, wrong parent/workspace | no `verified_candidate`, no matching Forge credit |
| C11 | native Forge PASS, full required selection | transport OK with native FAIL, partial selection, missing gate field, contradictory native axes | `verification_failed` or `indeterminate`, never PASS |
| C12 | native gate pinned to candidate tree and manifest | gate returned for different tree or definition changed | stale/refused/indeterminate; original result retained |
| C13 | good native PASS evidence ref | evidence id blank, missing operation, synthetic ref or fixture status | `indeterminate` even if callback says passed |
| C14 | successful mechanical domain result | change transport/process status only | separate axes; no domain rewrite |
| C15 | structured `verification_failed` | fail mapped to thrown generic transport error | keep Mechanical original failure and native diagnostic |
| C16 | `needs_evidence` from partial coverage | auto-map to generic failure or success | retained `needs_evidence` with coverage |
| C17 | `indeterminate` after unknown gate | replace unknown with PASS-shaped fields | unknown retained, never retry without reconciliation |
| C18 | safe worktree preservation | git status/add/commit/branch fails; cleanup force removes | exact tracked/untracked bytes remain and typed preservation failure |
| C19 | host cancellation request | abort before dispatch or after candidate effects | pre-dispatch zero provider calls; post-dispatch uncertain, not rollback |
| C20 | intent recorded once and native reply available | lost ack, duplicate completion, replay after changed skill/model/source | no second effect; unknown until native proof |
| C21 | bounded observation stream with native refs | dropped events, out-of-order cursor, event replay, oversized output | bounded, gap/stale explicitly visible |
| C22 | two overlapping invocations | same writer workspace, forged lease or changed main during wait | exactly one writer or both refused safely |
| C23 | optional read-only coordination | policy recommends write/claim/close | proposal only; no Beads/Furnace/Forge mutation |
| C24 | optional committed RF/HX producer | placeholder RF, `--no-commit` preview, unsupported HX task-scope | refuse higher-fidelity profile without preventing Git/plain |

Assertions C01–C06, C10–C13, C18 and C20 are release blockers. C23/C24 must refuse safely even when the optional feature is not enabled; their full positive native versions are optional L6.

## Four domain outcomes × host status

An exhaustive registered-path table must execute original Mechanical semantics rather than converting them to a single Boolean:

| Domain | Core origin | Pi presentation | Required prohibition |
| --- | --- | --- | --- |
| `verified_candidate` | passed verification with producer evidence, matching candidate basis | settled + native gate PASS on correct candidate, source freshness | never display for fake/partial/stale Forge |
| `verification_failed` | Forge-native failed verdict on correct basis | settled domain failure, native failure reason visible | do not call it transport exception or PASS |
| `needs_evidence` | partial/unknown scope | settled/no writer, scope incomplete | do not infer absence or allow implementation |
| `indeterminate` | invalid basis, missing proof, verification partial/unknown | indeterminate/unknown, retain original cause and refs | no blind retry or PASS |
| no domain outcome | admission refusal or interrupted/unknown transport | refused/unknown and effect disposition | never fabricate a Mechanical domain response |

Also test each under fresh/stale/unknown source and under process failure. A source becoming stale after a historical PASS does not change the historical producer result; it prevents **current verification credit** and may demand re-gate.

> **Erratum (EAT-R030 Core origin, M00-D, 2026-11-09; pin advance deferred to the owner).** The Core origin column attributes the Forge-native verdict behind verification_failed to the application rig (the live Forge producer), not Mechanical core: the core package stays free of Forge, Pi, Furnace and Claude SDK dependencies. The owner decides the wording change and advances the pin.

## Fault injection and process lifecycle matrix (L5)

For each row: capture pre-image of HEAD/index/tracked+untracked paths, current source digest, Pi logical invocation, effect intent and native refs. Crash the disposable child; restart/inspect from a fresh process; compare source bytes and effect count.

| Fault point | Must retain | Forbidden behavior |
| --- | --- | --- |
| before package validation | source untouched; explicit refusal | import/write |
| after package validation, before final grant | reviewed source/manifest | stale permission used to dispatch |
| after lease acquired, before first SDK effect | no claim of execution; safe release if positively no effect | orphaned falsely settled writer |
| SDK starts, no first output | pending/uncertain session and native lookup route | unconditional retry |
| after first edit, before commit | dirty tracked/untracked workspace and recovery location | forced removal/false clean |
| commit acknowledged, before host receives reply | commit SHA/tree if discoverable; uncertainty record | duplicate commit |
| Forge request sent, reply lost | native operation lookup and unknown status | dispatch same gate again blindly |
| native gate PASS, Pi observer offline | durable original refs/result, freshness recheck | lost proof or fabricated live completion |
| cancel requested, SDK completes late | actual late result and effect state; no false rollback | discard candidate or report nonexistent effect |
| session/host dies after listener registration | recoverable log/receipt and native producer readback | treating host death as Beads/Furnace rollback |

**Reconciliation oracle:** `occurred` permits attribution only with native evidence; `not-occurred` permits a *new* explicitly authorized dispatch only with current source/permission proof; `unknown` never retries. Abort is a request. Double stop, stop after completion, reconnect with stale cursor and duplicate event IDs are all negative controls. For Furnace-owned work, recovery must query the native Run/Attempt, not create a Pi mirror Run.

## Concrete journey and command matrix

Use existing package scripts; verify each command against the current package before execution rather than blindly paste a dated name.

~~~sh
# Mechanical clean source; run in the real checkout at the pinned head
npm ci
forge build
npm test
# Build the actual member packages, then npm pack from each member.
# Install those exact .tgz files in a fresh temp consumer outside this repository.

# Consumer: import @mechanical/development-rig/host from the packed rig.
# Execute L2 direct calls and negative admission tests.

# Pi checkout, pinned separately
npm ci
npm run lint
npm run typecheck
npm run typecheck:test
npm run test
forge build
# Then run opt-in registered-function and native Claude/Forge tests on scratch workspaces.
~~~

**Do not claim the example command block itself is a successful run.** Running the existing `--fixture`, `--live-develop` or `--live-verify` CLI independently is diagnostic/provider evidence at its own tier only. The joint acceptance must enter Pi's registered `workflow_execute` function branch, then `workflow_observe`, under a separately packed Mechanical application host.

The native journey must run at least: (a) one bounded Claude edit producing changed tree and full Forge PASS, (b) one native Forge FAIL and (c) one native unknown/refused condition. Exact provider versions, agent session, Forge operation, selected required steps, base/commit/tree, installed package SHA and the Pi invocation must appear in one joinable receipt. If the environment lacks SDK credentials or Forge executable, record **NOT RUN/BLOCKED**; a stub does not satisfy the gate.

## Independent packaging/release controls

- Require Node 24 in the first joint test matrix (the overlap of Pi's >=24 and the rig's >=22.18 <25 at audit pin). Do not declare Node 25 or older versions supported without fresh installed tests.
- Pack from clean committed source, list files and dependency graph, import from a temp project with no monorepo resolution, no ambient `NODE_PATH` or source checkout. Verify type declarations and runtime export.
- Test npm cache hit/miss and transient unpack/manifest failures. A cached prior tarball must not bypass a changed digest. Do not enable install scripts for executable artifacts without a new explicit review.
- Run full root/member Forge gates on the exact accepted source tree. If any implementation commit lands after a gate, re-run on the new tree; a previous green cannot certify a changed one.
- Preserve the public core package's absence of mandatory Pi/Furnace/Forge/Claude SDK dependencies. The application rig may import provider SDKs through explicit optional/runtime boundaries.
- Avoid modifying existing Pi frozen TRACEABILITY or release-test assertions to mark a planned W11 shipped. W11 release evidence must pass its own validator and the real producer gate.

## Performance and resource acceptance

Measure before optimizing: warm/cold external install, artifact verification, startup/first SDK effect, each callback, Forge gate, observation latency, CPU, RSS peak, file descriptors, event queue, source hash cost, SDK/token spend and host-wide active/queued invocation counts. Use separate instrumentation for admission overhead versus model/provider time. Run baseline at 1 and 4, then 16 concurrent bounded read-only/fixture calls; add effectful concurrency only in isolated independent worktrees. Include same-workspace writer contention and event subscriber dropped/late cases.

Report median/p95, peak memory, total wall time, refused/queued/started/completed counts, and whether provider rate limiting or local resources dominate. Define *numeric* budgets from measured baseline and operational SLO before release, then enforce them with stable assertions for operation counts/limits rather than brittle wall-clock thresholds. Any unsupported environment gets a documented not-run, not an assumed green.

## Agent LX and documentation verification

The operator must be able to inspect from Pi: saved definition id and digest, actual artifact identity, source basis, current stage (discover/context/agent/commit/Forge/settled), latest native refs, gate state, cancellation requested versus effective, uncertain effects, retry eligibility and recovery instructions. Show unsupported profiles as unavailable; no pretend buttons or unimplemented tool examples.

Run at least ten independent agent-orientation prompts using only each package's local `AGENTS.md`, README, dedicated skill and new program: discover implemented API, choose registered function rather than script, interpret each of four outcomes, inspect a stale gate, refuse bad grant, recover late cancel, explain HX/RF profile unsupported, distinguish Furnace/native, handle dirty source, and find the correct local tests. Grade whether an agent names real commands, correct file paths, available vs proposed statuses and safe fallback. Record fail cases as skill/CLI UX bugs; update docs/skills in the same code cut.

> **Erratum (EAT-R030 stage vocabulary, M00-D, 2026-11-09; pin advance deferred to the owner).** The stage vocabulary in this section (discover/context/agent/commit/Forge/settled) names the program's target, mapped onto the stages the rig receipt reports today; it does not describe stage names that the rig receipt already emits verbatim. The owner decides the wording change and advances the pin.

## Required receipt template

~~~yaml
program: mechanical-pi-native-interop-2026-11-09
packet: M06-or-M07-or-M08-or-M09
scope: exact-tested-cut
status: pass|fail|blocked|not-run
evidence_tier: L0|L1|L2|L3|L4|L5|L6
mechanical_sha: exact-commit
pi_sha: exact-commit
candidate_source_commit: exact-or-null
candidate_source_tree: exact-or-null
forge_manifest_sha256: exact-or-null
descriptor_sha256: exact-or-null
mechanical_tarball_sha256: exact-or-null
pi_definition_digest: exact-or-null
pi_invocation_id: observed-or-null
claude_session_id: observed-or-null
forge_operation_id: observed-or-null
native_gate_verdict: PASS|FAIL|partial|unknown|not-run
mechanical_outcome: original-arm-or-absent
effect_disposition: not-started|started|settled|uncertain
commands: [exact-argv-with-exit-and-output-paths]
negative_controls: [ids-and-observed-results]
mutants: [ids-killed-survived-equivalent]
performance: { measured: false, reason: not-run }
limitations: [all-unresolved-unknowns]
~~~

Use the actual product-native receipt schema if established later; do not fake IDs or read a generic workflow wrapper as the native Forge/Claude envelope. Record whether each phase has run, by whom/what package, and its exact pin. Archive per-cut evidence rather than rewriting one growing shared mutable table.

## Final release checklist and vetoes

**Must have:** correct both-package code on default branch, clean source pins, cross-repo ratified ABI, all positive and refusal L1 cases with falsifiers, real L2 independently installed consumer, real L4 Pi registered launch and inspect, Forge-native candidate PASS and native FAIL/unknown, all four outcomes, no false-clean/no blind replay in crash controls, bounded host invocation load, accurate README/AGENTS/skills/status, exact complete Forge gates after final merge, written receipt with every native ref/limitation.

**Veto release:** no registered function route; only helper/script/CLI success; descriptor/digest mismatch; arbitrary module import; grant from model input; uncertain write silently retried; dirty worktree discarded; unknown/partial Forge called PASS; mismatched commit/tree/gate; missing native refs; unmeasured but claimed performance; impossible to re-open an invocation; stale document describing proposed API as shipped.

**Optional not a veto for Git/plain v1:** certified HX task scope, committed RF contextual model, pure coordination exposure, remote hosts, Furnace reattach and large fleet-scale. Each obtains its own L6 gate before being listed as supported.
