#!/usr/bin/env python3
# Generator for claims-part-03.jsonl (Phase 1 atomize: 03, 04, README, SKILL at doc@7c80c34346c2).
import json, sys

D03 = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/03-implementation-and-qa.md"
D04 = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/04-agent-handoff.md"
RD = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md"
SK = ".agents/skills/pi-mechanical-interop/SKILL.md"

BASE = "program baseline f67b6665/0c78e253 (stated 2026-11-04); re-locate at pi@b27829e6dfa7 / mw@f7c0a9431d6c"
PROP = "proposed"
DOC = "doc@7c80c34346c2"

rows = []

def c(id, kind, prop, wording, path, lines, section, scope, tv, premises=None, deps=None, material=False):
    rows.append({
        "id": id, "kind": kind, "proposition": prop, "strongest_wording": wording,
        "source": {"path": path, "lines": lines, "section": section},
        "scope": scope, "time_version": tv,
        "implicit_premises": premises or [], "depends_on": deps or [], "material": material,
    })

# ---------------------------------------------------------------- 03 : release slices
S = "Release slices (independent, ordered only by true dependencies)"
c("C0301", "PROPOSAL", "The eight release slices PI-0..PI-7 are independently landable and ordered only by true dependencies.",
  "Release slices (independent, ordered only by true dependencies)", D03, "3", S,
  "PI-0..PI-7 as a plan", PROP, ["the slice table's listed dependencies are the only real ones"], [], False)

c("C0302", "PROPOSAL", "PI-0 (Pi + Mechanical) delivers: pinned baseline, reconciled descriptor canonicalization and host ABI, and a signed-off audit inventory.",
  "Pin baseline, reconcile descriptor canonicalization and host ABI; signed-off audit inventory", D03, "7", S,
  "PI-0 deliverable", PROP, [], ["C0305"], False)
c("C0303", "NORMATIVE", "PI-0 may not close until the committed manifest is read via the actual host.",
  "Read committed manifest via actual host", D03, "7", S, "PI-0 closure", PROP, [], [], True)
c("C0304", "NORMATIVE", "PI-0 may not close until a wrong digest, wrong path or wrong schema is refused before import.",
  "wrong digest/path/schema refuse before import", D03, "7", S, "PI-0 closure", PROP, [], [], True)
c("C0305", "OBSERVATION", "Mechanical descriptor canonicalization and the host ABI are currently not reconciled (they disagree).",
  "reconcile descriptor canonicalization and host ABI", D03, "7", S,
  "MechanicalWorkflows descriptor vs entrypoint host", BASE,
  ["implicit: 'reconcile' presupposes a present mismatch"], ["C0437"], True)

c("C0306", "PROPOSAL", "PI-1 (Pi) adds a `function` branch to `workflow_execute` gated behind a feature flag and a grant.",
  "`function` branch in `workflow_execute` behind feature/grant", D03, "8", S, "PI-1 deliverable", PROP, [], ["C0310"], False)
c("C0307", "PROPOSAL", "PI-1 (Pi) registers a pinned local Mechanical host.",
  "registration of pinned local Mechanical host", D03, "8", S, "PI-1 deliverable", PROP, [], ["C0436"], False)
c("C0308", "NORMATIVE", "PI-1 may not close until source bytes/manifest, identity and grants are checked.",
  "Source bytes/manifest, identity and grants checked", D03, "8", S, "PI-1 closure", PROP, [], [], True)
c("C0309", "NORMATIVE", "PI-1 may not close unless the existing script branch of `workflow_execute` is unchanged.",
  "script branch unchanged", D03, "8", S, "PI-1 closure", PROP, [], ["C0430"], True)
c("C0310", "OBSERVATION", "Pi `workflow_execute` currently has no `function` branch.",
  "`function` branch in `workflow_execute`", D03, "8", S, "pi-subagents src/workbench/execute-tool.ts", BASE,
  ["implicit: adding a branch presupposes absence"], ["C0430", "C0432"], True)

c("C0311", "PROPOSAL", "PI-2 (Mechanical) delivers a versioned, independently importable `develop` host binding from its rig plus a local packaged consumer.",
  "Versioned, independently importable `develop` host binding from its rig and a local packaged consumer", D03, "9", S,
  "PI-2 deliverable", PROP, [], ["C0315"], False)
c("C0312", "NORMATIVE", "PI-2 may not close until the binding supplies the correct four callbacks.",
  "Correct four callbacks", D03, "9", S, "PI-2 closure", PROP, ["Mechanical `develop` takes exactly four callback services"], ["C03111"], True)
c("C0313", "NORMATIVE", "PI-2 may not close without a real package install and the correct source/evidence shape.",
  "real package install, source/evidence shape", D03, "9", S, "PI-2 closure", PROP, [], [], True)
c("C0314", "NORMATIVE", "PI-2 may not introduce a Pi import into Mechanical core.",
  "no Pi import in core", D03, "9", S, "PI-2 closure", PROP, [], ["C03134"], True)
c("C0315", "OBSERVATION", "Mechanical's `develop` host binding is not currently independently importable from the development rig.",
  "independently importable `develop` host binding", D03, "9", S, "MechanicalWorkflows apps/development-rig", BASE,
  ["implicit: a deliverable presupposes absence"], ["C0434"], True)

c("C0316", "PROPOSAL", "PI-3 (Both) performs the first actual Pi -> Mechanical `develop` run in a clean isolated Git workspace using the explicit `git-census` profile.",
  "First actual Pi → Mechanical `develop` in clean isolated Git workspace using explicit `git-census` profile", D03, "10", S,
  "PI-3 deliverable", PROP, [], ["C0320", "C0321"], False)
c("C0317", "NORMATIVE", "PI-3 may not close until a native Claude session creates a changed commit.",
  "Native Claude session creates changed commit", D03, "10", S, "PI-3 closure", PROP, [], [], True)
c("C0318", "NORMATIVE", "PI-3 may not close until the Forge result agrees on commit/tree with the created commit.",
  "Forge result agrees on commit/tree", D03, "10", S, "PI-3 closure", PROP, [], [], True)
c("C0319", "NORMATIVE", "PI-3 may not close until Pi observes the four-domain outcome.",
  "Pi observes four-domain outcome", D03, "10", S, "PI-3 closure", PROP, [], ["C03111"], True)
c("C0320", "OBSERVATION", "MechanicalWorkflows has an explicitly selectable `git-census` source-scope profile.",
  "explicit `git-census` profile", D03, "10", S, "MechanicalWorkflows source-scope services", BASE, [], ["C0443"], True)
c("C0321", "OBSERVATION", "No Pi -> Mechanical `develop` run has yet occurred.",
  "First actual Pi → Mechanical `develop`", D03, "10", S, "both repos + recorded receipts", BASE,
  ["implicit in 'First actual'"], ["C0446"], True)

c("C0322", "PROPOSAL", "PI-4 (Pi) delivers complete observation and operator controls, independent per-agent skip/retry cancellation, and replay fingerprints.",
  "Complete observation and operator controls; independent per-agent skip/retry cancellation, replay fingerprints", D03, "11", S,
  "PI-4 deliverable", PROP, [], [], False)
c("C0323", "NORMATIVE", "PI-4 may not close while any unauthorized late SDK start is possible.",
  "Zero unauthorized late SDK starts", D03, "11", S, "PI-4 closure", PROP, [], ["C0353"], True)
c("C0324", "NORMATIVE", "PI-4 may not close while blind effect replay is possible.",
  "no blind effect replay", D03, "11", S, "PI-4 closure", PROP, [], [], True)
c("C0325", "NORMATIVE", "PI-4 may not close until native refs are exact and stale/unknown states are visible.",
  "exact native refs, stale/unknown visible", D03, "11", S, "PI-4 closure", PROP, [], [], True)

c("C0326", "PROPOSAL", "PI-5 (Both) delivers certified HX task-scope plus task-grounded RF composition.",
  "Certified HX task-scope + task-grounded RF composition", D03, "12", S, "PI-5 deliverable", PROP, [], ["C0444", "C0445"], False)
c("C0327", "NORMATIVE", "PI-5 may not close until source revision, coverage witness, task/query digest and render identity are producer-backed.",
  "Source revision, coverage witness, task/query digest and render identity producer-backed", D03, "12", S, "PI-5 closure", PROP, [], [], True)
c("C0328", "NORMATIVE", "PI-5 may not close until negative controls block writes.",
  "negative controls block writes", D03, "12", S, "PI-5 closure", PROP, [], [], True)

c("C0329", "PROPOSAL", "PI-6 (Both) delivers detached and optional Furnace-hosted function execution.",
  "Detached and optional Furnace-hosted function execution", D03, "13", S, "PI-6 deliverable", PROP, [], [], False)
c("C0330", "NORMATIVE", "PI-6 may not close until real grant/reattach control, Run/Work/Attempt mapping, failure and crash uncertainty, and producer-owned retry are in place.",
  "Real grant/reattach control, Run/Work/Attempt mapping, failure and crash uncertainty, producer-owned retry", D03, "13", S,
  "PI-6 closure", PROP, ["Furnace exposes Run/Work/Attempt identities"], ["C0463"], True)

c("C0331", "PROPOSAL", "PI-7 (Both) delivers coordination-package pure function execution plus scale/reproducibility.",
  "Coordination package pure function execution plus scale/reproducibility", D03, "14", S, "PI-7 deliverable", PROP, [], ["C0334"], False)
c("C0332", "NORMATIVE", "PI-7 may not close if policy outputs can act as authority.",
  "Policy outputs never act as authority", D03, "14", S, "PI-7 closure", PROP, [], [], True)
c("C0333", "NORMATIVE", "PI-7 may not close until host admission/backpressure is measured and absence of regressions is shown.",
  "measured host admission/backpressure and absence of regressions", D03, "14", S, "PI-7 closure", PROP, [], [], True)
c("C0334", "OBSERVATION", "MechanicalWorkflows has a `packages/coordination` package exposing pure policy functions.",
  "Coordination package pure function execution", D03, "14", S, "MechanicalWorkflows packages/coordination", BASE,
  ["implicit in naming the package and in `packages/coordination/test/` (line 47)"], [], True)

# ---------------------------------------------------------------- 03 : first unblockers
S = "First unblockers, before claiming PI-3"
c("C0335", "NORMATIVE", "Unblockers 1-6 must be completed before PI-3 is claimed.",
  "First unblockers, before claiming PI-3", D03, "16", S, "program sequencing", PROP, [], [], True)

c("C0336", "OBSERVATION", "The comparison between Mechanical's checked-in descriptor and `entrypoint-host.ts` is currently broken (they do not match).",
  "Fix Mechanical checked-in descriptor versus `entrypoint-host.ts` comparison", D03, "18", S,
  "MechanicalWorkflows checked-in descriptor + entrypoint-host.ts", BASE, ["implicit: 'Fix' presupposes a defect"], ["C0437"], True)
c("C0337", "NORMATIVE", "Tests must exercise exactly the checked-in descriptor and a packed tarball.",
  "test exactly checked-in descriptor and a packed tarball", D03, "18", S, "Mechanical descriptor tests", PROP, [], ["C0338"], True)
c("C0338", "OBSERVATION", "Existing Mechanical tests do not load the checked-in descriptor file (they use a constructed approximation).",
  "test exactly checked-in descriptor", D03, "18", S, "MechanicalWorkflows apps/development-rig tests", BASE,
  ["implicit: the instruction only makes sense if current tests do otherwise"], ["C0438", "C03142"], True)

c("C0339", "OBSERVATION", "Pi `workflow_execute` refuses `function` definitions even when they are authorized.",
  "Fix Pi `workflow_execute` refusal for authorized `function` definitions", D03, "19", S,
  "pi-subagents workflow_execute tool", BASE, [], ["C0430", "C0432"], True)
c("C0340", "OBSERVATION", "Pi has no installed-host loader for Mechanical functions.",
  "provide the actually installed host loader", D03, "19", S, "pi-subagents src/workbench", BASE,
  ["implicit: 'provide' presupposes absence"], ["C0435", "C0436"], True)
c("C0341", "NORMATIVE", "Long-running development must not be routed through `node()`.",
  "do not route long-running development through `node()`", D03, "19", S, "Pi workflow primitives", PROP,
  ["`node()` is unsuitable for long tasks (default 30-second limit)"], ["C0460"], True)

c("C0343", "OBSERVATION", "Pi's registered detached Claude request path sends empty grants and therefore fails local detached admission.",
  "Fix Pi registered detached Claude empty-grants path", D03, "20", S, "pi-subagents detached Claude registration", BASE,
  ["implicit: 'Fix' presupposes a defect"], ["C0441"], True)
c("C0344", "NORMATIVE", "The empty-grants defect must be fixed independently and the validator must not be disabled.",
  "Fix ... independently; do not disable validator", D03, "20", S, "pi-subagents detached admission", PROP, [], ["C0345"], True)
c("C0345", "OBSERVATION", "Pi has a validator that enforces grants at detached Claude admission.",
  "do not disable validator", D03, "20", S, "pi-subagents detached admission", BASE, [], ["C0440"], True)

c("C0346", "OBSERVATION", "Pi `cleanupWorktree` loses (deletes) worktrees that contain modifications.",
  "Fix loss of modified worktrees in `cleanupWorktree`", D03, "21", S, "pi-subagents cleanupWorktree", BASE,
  ["implicit: 'Fix loss' presupposes the loss occurs"], ["C0349"], True)
c("C0347", "NORMATIVE", "`cleanupWorktree` must be fixed before Pi worktree isolation is reused for this program.",
  "before reusing Pi worktree isolation", D03, "21", S, "Pi worktree isolation", PROP, [], ["C0346"], True)
c("C0348", "PROPOSAL", "PI-3 may begin on a distinct, materialized Mechanical workspace instead of Pi worktree isolation if that is simpler.",
  "begin PI-3 on a distinct, materialized Mechanical workspace if simpler", D03, "21", S, "PI-3 execution", PROP, [], [], False)
c("C0349", "OBSERVATION", "Pi has a worktree-isolation facility with a `cleanupWorktree` function.",
  "Pi worktree isolation", D03, "21", S, "pi-subagents source", BASE, [], [], True)

c("C0350", "OBSERVATION", "Pi registers no abort token before the async Claude `beforeDispatch` seam.",
  "Register an abort token before the async Claude `beforeDispatch` seam", D03, "22", S, "pi-subagents Claude agent launch", BASE,
  ["implicit: the instruction presupposes absence"], ["C0351"], True)
c("C0351", "OBSERVATION", "Pi's Claude agent launch has an asynchronous `beforeDispatch` seam during which startup can be parked.",
  "the async Claude `beforeDispatch` seam ... while startup is parked", D03, "22", S, "pi-subagents Claude agent launch", BASE, [], [], True)
c("C0352", "NORMATIVE", "Skip/retry and workflow cancel must be tested while startup is parked at `beforeDispatch`.",
  "test skip/retry and workflow cancel while startup is parked", D03, "22", S, "Pi cancellation tests", PROP, [], ["C0351"], True)
c("C0353", "INFERENCE", "At baseline, a cancel/skip/retry issued while startup is parked can result in a late, unauthorized SDK start.",
  "Register an abort token before the async Claude `beforeDispatch` seam, and test skip/retry and workflow cancel while startup is parked", D03, "22", S,
  "pi-subagents Claude agent launch", BASE, ["no other mechanism prevents the start after the seam"], ["C0350", "C0351"], True)

c("C0354", "NORMATIVE", "Candidate/source identity and explicit write permission must be established before any edit.",
  "Establish candidate/source identity and explicit write permission before any edit", D03, "23", S, "any Pi/Mechanical edit path", PROP, [], [], True)
c("C0355", "NORMATIVE", "Pi/Mechanical integration may use the current git-census mode only when the result is labeled as git-census.",
  "may use current git-census mode **only** when labeled as such", D03, "23", S, "Pi/Mechanical integration", PROP, [], ["C0356"], True)
c("C0356", "OBSERVATION", "Mechanical's current source-scope mode is git-census rather than certified task-scoped HX.",
  "current git-census mode", D03, "23", S, "MechanicalWorkflows source-scope services", BASE, [], ["C0443", "C0444"], True)

# ---------------------------------------------------------------- 03 : QA matrix
S = "QA matrix"
c("C0357", "NORMATIVE", "QA requires a positive journey in which the committed descriptor loads the exact tarball once, evidenced by blob SHA and installed-package proof.",
  "Committed descriptor loads exact tarball once ... blob SHA, installed package proof", D03, "29", S, "descriptor/tarball loader", PROP, [], [], True)
c("C0358", "NORMATIVE", "QA requires mutants that alter schema ref, SHA, package/export, or source after pin, each of which must be refused.",
  "mutate schema ref, SHA, package/export, or source after pin", D03, "29", S, "descriptor/tarball loader", PROP, [], [], True)
c("C0359", "NORMATIVE", "On a descriptor refusal no provider may be invoked.",
  "no provider invoked on refusal", D03, "29", S, "descriptor/tarball loader", PROP, [], [], True)

c("C0360", "NORMATIVE", "QA requires the real Pi `workflow_execute` to launch a function, evidenced by the Pi reply, a single invocation ID and no unauthorized child.",
  "Real Pi `workflow_execute` launches function ... Pi reply, single invocation ID, no unauthorized child", D03, "30", S, "Pi workflow_execute", PROP, [], ["C0306"], True)
c("C0361", "NORMATIVE", "QA requires negatives for no grant, wrong definition kind, forged principal, stale source and path escape, each refused.",
  "no grant, wrong definition kind, forged principal, stale source, path escape", D03, "30", S, "Pi workflow_execute admission", PROP, [], [], True)

c("C0362", "NORMATIVE", "QA requires a positive journey in which native `develop` exercises its four callbacks.",
  "Native `develop` four callbacks", D03, "31", S, "Mechanical develop", PROP, [], ["C0312"], True)
c("C0363", "NORMATIVE", "QA requires negatives for partial/unknown discovery, wrong workspace/base and provider throw, producing no implementation on incomplete scope and a distinct outcome.",
  "discovery partial/unknown, wrong workspace/base, provider throws | no implement on incomplete scope, appropriate distinct outcome", D03, "31", S,
  "Mechanical develop", PROP, [], ["C0364"], True)
c("C0364", "OBSERVATION", "Mechanical `develop` has a discovery phase whose scope completeness gates a subsequent implement phase.",
  "no implement on incomplete scope", D03, "31", S, "MechanicalWorkflows develop.ts", BASE, [], [], True)

c("C0365", "NORMATIVE", "QA requires a positive journey in which the agent writes a candidate with a recoverable worktree/commit.",
  "Agent writes candidate ... recoverable worktree/commit", D03, "32", S, "candidate write path", PROP, [], [], True)
c("C0366", "NORMATIVE", "QA requires negatives for dirty base, failed commit, branch creation failure and mid-run cancel, none producing a false-clean state.",
  "dirty base, failed commit, branch creation failure, mid-run cancel | ... no false-clean", D03, "32", S, "candidate write path", PROP, [], ["C0346"], True)

c("C0367", "NORMATIVE", "QA requires Forge verify negatives (transport exit 0 with failed gate, partial selection, mismatched commit/tree, missing operation ID) and only a matching native producer gate may warrant `verified_candidate`.",
  "only matching native producer gate warrants verified_candidate", D03, "33", S, "Forge verify translation", PROP, [], ["C0368", "C0369"], True)
c("C0368", "OBSERVATION", "A Forge invocation can return transport exit 0 while the gate itself failed.",
  "transport 0 with failed gate", D03, "33", S, "Forge CLI behavior", BASE, ["the mutant is realizable, not merely hypothetical"], [], True)
c("C0369", "OBSERVATION", "`verified_candidate` is a Mechanical domain outcome variant.",
  "warrants verified_candidate", D03, "33", S, "MechanicalWorkflows contracts.ts", BASE, [], ["C03111"], True)

c("C0370", "NORMATIVE", "QA requires RF/HX negatives (RF preview substituted for committed render, incomplete HX with false known-empty, changed query basis) to reject false completeness and side effects.",
  "RF preview substituted for committed render, incomplete HX + false known-empty, changed query basis | reject false completeness/side effects", D03, "34", S,
  "RF/HX native services", PROP, [], ["C0445"], True)
c("C0371", "NORMATIVE", "QA requires replay/retry negatives (effect result lost between dispatch and settlement; changed skill/source/model/provider basis) yielding one dispatch or a typed uncertain-effect, never a silent second write.",
  "one dispatch or typed uncertain-effect; never silent second write", D03, "35", S, "replay/retry", PROP, [], [], True)
c("C0372", "NORMATIVE", "QA requires per-agent control negatives (skip during beforeDispatch, SDK terminal after abort, unawaited launch, cancel during gate) with no late unauthorized query or fabricated cancellation.",
  "no late unauthorized query or fabricated cancellation", D03, "36", S, "per-agent control", PROP, [], ["C0351"], True)
c("C0373", "NORMATIVE", "QA requires detached negatives (missing claude:invoke/tool grants, lost handshake, PID reuse, socket ownership mismatch) producing refusal/unknown with preserved host ID and no implicit kill.",
  "refusal/unknown with preserved host ID; no implicit kill", D03, "37", S, "detached Claude hosting", PROP, [], ["C0374", "C0440"], True)
c("C0374", "OBSERVATION", "Pi detached Claude hosting identifies hosts by PID and a socket with ownership checks.",
  "PID reuse, socket ownership mismatch", D03, "37", S, "pi-subagents detached hosting", BASE, [], [], True)
c("C0375", "NORMATIVE", "QA requires Furnace negatives (Attempt cancellation, controller crash, lost start response, duplicate retry) evidenced by producer Run/Attempt refs with no blind retry and no fake durable restart.",
  "producer Run/Attempt refs; no blind retry, no fake durable restart", D03, "38", S, "Furnace hosting", PROP, [], ["C0463"], True)
c("C0376", "NORMATIVE", "QA requires that a pure policy proposal misread as a command causes no Beads/Furnace/Forge side effect without separate authority.",
  "no Beads/Furnace/Forge side effect without separate authority", D03, "39", S, "coordination", PROP, [], ["C0334"], True)
c("C0377", "NORMATIVE", "QA requires load negatives (concurrent workflows exceeding host budgets, progress/log floods, queued cancels) evidenced by admission counts, queue latency, bounded memory and an honest dropped-event counter.",
  "admission counts, queue latency, bounded memory, honest dropped-event counter", D03, "40", S, "load", PROP, [], [], True)

c("C0378", "NORMATIVE", "Live acceptance requires a full run from the actual registered Pi tool through the installed Mechanical tarball with one isolated source checkout and real producer APIs.",
  "demonstrate a full run from the actual registered Pi tool, through the installed Mechanical tarball with one isolated source checkout and real producer APIs", D03, "42", S,
  "live acceptance", PROP, [], [], True)
c("C0379", "NORMATIVE", "Live acceptance must capture native session ID, commit/tree, Forge operation ID and verdict, the user's Pi observation/reopen path, and explicit denial/cancellation controls.",
  "Capture native session ID, commit/tree, Forge operation ID and verdict, the user's Pi observation/reopen path, and explicit denial/cancellation controls", D03, "42", S,
  "live acceptance", PROP, [], [], True)
c("C0380", "DEFINITION", "A fixture PASS, source grep, unit mock, or a previous standalone Mechanical rig receipt does not constitute end-to-end Pi acceptance.",
  "Fixture PASS, source grep, unit mock or a previous standalone Mechanical rig receipt is not an end-to-end Pi acceptance", D03, "42", S, "acceptance definition", PROP, [], [], True)
c("C0381", "OBSERVATION", "A previous standalone Mechanical rig receipt exists.",
  "a previous standalone Mechanical rig receipt", D03, "42", S, "MechanicalWorkflows recorded evidence", BASE, ["implicit: the definite reference presupposes existence"], [], True)

# ---------------------------------------------------------------- 03 : test placement and build order
S = "Test placement and build order"
c("C0382", "PROPOSAL", "Pi tests for this program go in new `test/workbench-mechanical-*.test.ts` files covering admission, descriptor resolution, host binding, four outcome variants, native evidence projection, cancellation and source pinning.",
  "new `test/workbench-mechanical-*.test.ts` for admission, descriptor resolution, host binding, four outcome variants, native evidence projection, cancellation and source pinning", D03, "46", S,
  "pi-subagents test/", PROP, [], [], False)
c("C0383", "NORMATIVE", "Focused fault/contract tests come before a live `qa/workbench/` journey.",
  "focused fault/contract tests before a live `qa/workbench/` journey", D03, "46", S, "Pi test ordering", PROP, [], ["C0384"], False)
c("C0384", "OBSERVATION", "pi-subagents has a `qa/workbench/` directory for live journeys.",
  "a live `qa/workbench/` journey", D03, "46", S, "pi-subagents qa/workbench/", BASE, [], [], True)
c("C0385", "NORMATIVE", "Do not add costly logic to the shared census header or the giant assertion table; keep behavioral checks in dedicated scoped test files.",
  "Avoid adding costly logic to a shared census header or giant assertion table", D03, "46", S, "Pi test hygiene", PROP, [], ["C0386"], False)
c("C0386", "OBSERVATION", "pi-subagents tests contain a shared census header and a giant assertion table.",
  "a shared census header or giant assertion table", D03, "46", S, "pi-subagents test/", BASE, [], [], True)
c("C0387", "PROPOSAL", "Mechanical tests for the committed descriptor loader, package signature, adapter services and cancel/error translation go in `apps/development-rig/test/`.",
  "Mechanical: `apps/development-rig/test/` for committed descriptor loader, package signature, adapter services and cancel/error translation", D03, "47", S,
  "MechanicalWorkflows apps/development-rig/test/", PROP, [], ["C0388"], False)
c("C0388", "OBSERVATION", "MechanicalWorkflows has an `apps/development-rig/test/` directory.",
  "`apps/development-rig/test/`", D03, "47", S, "MechanicalWorkflows", BASE, [], [], True)
c("C0389", "NORMATIVE", "Mechanical core development tests must stay provider-neutral.",
  "core development tests stay provider-neutral", D03, "47", S, "MechanicalWorkflows packages/development tests", PROP, [], [], False)
c("C0390", "PROPOSAL", "Pure function mapping tests go in `packages/coordination/test/`.",
  "`packages/coordination/test/` for pure function mapping", D03, "47", S, "MechanicalWorkflows packages/coordination/test/", PROP, [], ["C0334"], False)
c("C0391", "PROPOSAL", "Mechanical adds an external installed consumer and an opt-in live scratch-workspace proof.",
  "Add an external installed consumer and an opt-in live scratch-workspace proof", D03, "47", S, "MechanicalWorkflows", PROP, [], [], False)
c("C0392", "OBSERVATION", "pi-subagents has an existing `forge.toml` and its primary gate is `forge build` plus `forge run <named test or live tier>`.",
  "Pi primary gate: `forge build` using existing `forge.toml` and `forge run <named test or live tier>`", D03, "48", S, "pi-subagents forge.toml", BASE, [], [], True)
c("C0393", "OBSERVATION", "MechanicalWorkflows' primary gate is a root `forge build` with its existing package/root tests.",
  "Mechanical primary gate: root `forge build` and its existing package/root tests", D03, "48", S, "MechanicalWorkflows root forge config", BASE, [], [], True)
c("C0394", "NORMATIVE", "GitHub CI must not be added.",
  "Do **not** add GitHub CI", D03, "48", S, "both repos", PROP, [], ["C0422"], True)
c("C0395", "PROPOSAL", "Iteration uses isolated `npm run check` or targeted Vitest.",
  "isolated `npm run check`/targeted Vitest for iteration", D03, "48", S, "pi-subagents", PROP, [], ["C0396"], False)
c("C0396", "OBSERVATION", "pi-subagents has an `npm run check` script and uses Vitest.",
  "`npm run check`/targeted Vitest", D03, "48", S, "pi-subagents package.json", BASE, [], [], True)
c("C0397", "NORMATIVE", "Every new assertion must have an adversarial mutant that makes it red while the repaired code makes it green.",
  "Every new assertion gets an adversarial mutant that makes it red and the repaired code makes it green", D03, "49", S, "test discipline", PROP, [], [], True)
c("C0398", "NORMATIVE", "Exact command/version/ref/result must be recorded; no test result may be assumed from a source audit.",
  "Record exact command/version/ref/result; no test result is assumed from a source audit", D03, "49", S, "evidence discipline", PROP, [], [], True)
c("C0399", "SOURCE_REPORT", "Pi feedback reports (new-feedback/) identify long preps, tester timeout modes and shared census edit conflicts.",
  "Pi feedback reports identify long preps, tester timeout modes and shared census edit conflicts", D03, "50", S, "pi-subagents new-feedback/", BASE, [], ["C03126"], True)
c("C03100", "NORMATIVE", "Do not grow the constrained shared ledger and do not assert a new measurement without a new run.",
  "avoid growing an already constrained shared ledger or asserting a new measurement without a new run", D03, "50", S, "Pi evidence discipline", PROP, [], [], False)
c("C03101", "NORMATIVE", "Per-bead Pi receipts under `docs/workbench/receipts/wb-*.md` are written only when a real bead/receipt exists; otherwise the program stays design-only.",
  "only **when a corresponding real bead/receipt exists**; otherwise retain the program as design-only", D03, "51", S, "Pi receipts", PROP, [], [], True)
c("C03102", "NORMATIVE", "Do not edit the historical `TRACEABILITY.md` and do not fabricate bead IDs.",
  "Do not edit historical `TRACEABILITY.md` or fabricate bead IDs", D03, "51", S, "pi-subagents docs", PROP, [], ["C03103", "C0423"], True)
c("C03103", "OBSERVATION", "pi-subagents has a historical `TRACEABILITY.md` file.",
  "historical `TRACEABILITY.md`", D03, "51", S, "pi-subagents docs", BASE, [], [], True)
c("C03104", "NORMATIVE", "Mechanical records measured evidence in its existing QA/integration hierarchy.",
  "Mechanical puts measured evidence in its existing QA/integration hierarchy", D03, "51", S, "MechanicalWorkflows", PROP, ["MW has an existing QA/integration hierarchy"], [], False)

# ---------------------------------------------------------------- 03 : completion criteria
S = "Completion / release criteria"
c("C03105", "NORMATIVE", "Working Pi script workflows must not regress when the Workbench/Mechanical feature is disabled.",
  "Working Pi *script* workflows do not regress when Workbench/Mechanical feature disabled", D03, "55", S, "Pi script workflows", PROP, [], ["C03106"], True)
c("C03106", "OBSERVATION", "Pi script workflows currently work.",
  "Working Pi *script* workflows", D03, "55", S, "pi-subagents workflow_execute script branch", BASE, ["implicit in 'Working'"], ["C0430"], True)
c("C03107", "NORMATIVE", "A function artifact must be installable and executable without a repository checkout dependency.",
  "A function artifact can be installed and executed without a repository checkout dependency", D03, "56", S, "release criterion", PROP, [], [], True)
c("C03108", "NORMATIVE", "No extension source copy of the Mechanical function body is allowed.",
  "no extension source copy of Mechanical function body", D03, "56", S, "release criterion", PROP, [], [], True)
c("C03109", "NORMATIVE", "No unapproved mutation may run through a catalog, preview, observer, or function launch.",
  "No unapproved mutation can run through a catalog, preview, observer, or function launch", D03, "57", S, "release criterion", PROP, [], [], True)
c("C03110", "NORMATIVE", "An uncertain producer effect must remain uncertain across Pi process restart/resume with no implicit duplicate.",
  "An uncertain producer effect remains uncertain across Pi process restart/resume; no implicit duplicate", D03, "58", S, "release criterion", PROP, [], [], True)
c("C03111", "OBSERVATION", "MechanicalWorkflows defines exactly four domain outcome variants for `develop`.",
  "Four Mechanical domain outcome variants", D03, "59", S, "MechanicalWorkflows contracts.ts", BASE, [], [], True)
c("C03112", "NORMATIVE", "The four Mechanical domain outcome variants must survive translation into Pi separately from process status and Forge gate proof.",
  "Four Mechanical domain outcome variants survive the translation separately from process status and Forge gate proof", D03, "59", S, "release criterion", PROP, [], ["C03111"], True)
c("C03113", "NORMATIVE", "If installed HX cannot supply live native task-scope evidence, that blocks only the certified native-scope profile, not honestly labeled Git-census mode.",
  "remains a blocker **only** to the certified native-scope profile, not to honestly labeled Git-census mode", D03, "60", S, "release criterion", PROP, [], ["C03114", "C0355"], True)
c("C03114", "HYPOTHESIS", "The installed HX may not support live native task-scope evidence.",
  "Live native task-scope evidence, if unsupported by installed HX", D03, "60", S, "installed HX at baseline", BASE, [], ["C0444"], True)
c("C03115", "NORMATIVE", "Reproducible evidence must be attached before any slice is declared live/closed, and docs, skill and feature matrix are updated in the same implementation cut.",
  "Reproducible evidence is attached before declaring any slice live/closed; docs, skill and feature matrix updated in same implementation cut", D03, "61", S, "release criterion", PROP, [], [], True)

# ---------------------------------------------------------------- 04 : intro
S = "04 — Agent instructions (intro)"
c("C03116", "NORMATIVE", "Implementers must use `.agents/skills/pi-mechanical-interop/SKILL.md` and the matching Mechanical repo skill.",
  "Use `.agents/skills/pi-mechanical-interop/SKILL.md` and the matching Mechanical repo skill", D04, "3", S, "implementers of both repos", PROP, [], ["C03117"], False)
c("C03117", "OBSERVATION", "MechanicalWorkflows has a skill matching the Pi `pi-mechanical-interop` skill.",
  "the matching Mechanical repo skill", D04, "3", S, "MechanicalWorkflows skills", BASE, [], [], True)
c("C03118", "NORMATIVE", "Each cut is independently owned and must bring code, tests, relevant user-facing docs, a truthful status update and real gate receipts.",
  "Each cut is independently owned and must bring code, tests, the relevant user-facing docs, a truthful status update and real gate receipts", D04, "3", S, "every cut", PROP, [], [], True)
c("C03119", "NORMATIVE", "The distinction between this design program and already-verified code must be preserved.",
  "Preserve the distinction between this program (design) and already-verified code", D04, "3", S, "documentation", PROP, [], ["C0401"], False)

# ---------------------------------------------------------------- 04 : first read
S = "First read"
c("C03120", "NORMATIVE", "Before work, fetch both repos and capture exact default-branch SHAs, blob SHAs of affected files, installed SDK versions and any unlanded local/agent work.",
  "Fetch both repos and capture exact default branch SHAs, blob SHAs of affected files, installed SDK versions and any unlanded local/agent work", D04, "7", S, "implementers", PROP, [], [], False)
c("C03121", "NORMATIVE", "Never audit only the old Pi `master` baseline without checking Workbench code.",
  "Never audit just the old Pi `master` baseline without checking Workbench code", D04, "7", S, "auditors", PROP, [], ["C03122"], False)
c("C03122", "OBSERVATION", "pi-subagents `master` now contains the former implementation (Workbench) branch.",
  "`master` now contains the former implementation branch", D04, "7", S, "pi-subagents master", "as of doc@7c80c34346c2 (2026-11-05); check at pi@b27829e6dfa7", [], [], True)
c("C03123", "NORMATIVE", "Read the complete target module plus `AGENTS.md`, the W11 feature row, Mechanical `docs/04`, `docs/05`, `contracts/entrypoints/development.v1.json`, `entrypoint-host.ts`, `installed-host.ts`, `develop.ts` and `contracts.ts`.",
  "Read the complete target module and `AGENTS.md`, W11 feature row, Mechanical `docs/04`, `docs/05`, `contracts/entrypoints/development.v1.json`, `entrypoint-host.ts`, `installed-host.ts`, `develop.ts` and `contracts.ts`", D04, "8", S,
  "implementers", PROP, [], ["C03124", "C03125"], False)
c("C03124", "OBSERVATION", "pi-subagents has an `AGENTS.md` and a feature-matrix row W11.",
  "`AGENTS.md`, W11 feature row", D04, "8", S, "pi-subagents", BASE, [], ["C0407"], True)
c("C03125", "OBSERVATION", "MechanicalWorkflows has `docs/04`, `docs/05`, `contracts/entrypoints/development.v1.json`, `entrypoint-host.ts`, `installed-host.ts`, `develop.ts` and `contracts.ts`.",
  "Mechanical `docs/04`, `docs/05`, `contracts/entrypoints/development.v1.json`, `entrypoint-host.ts`, `installed-host.ts`, `develop.ts` and `contracts.ts`", D04, "8", S, "MechanicalWorkflows", BASE, [], [], True)
c("C03126", "OBSERVATION", "pi-subagents has a `new-feedback/` directory and an authoritative Beads workspace with ready/blocked status.",
  "Inspect Pi `new-feedback/`, outstanding owner/flywheel branches, Beads ready/blocked status from its authoritative workspace", D04, "9", S, "pi-subagents", BASE, [], [], True)
c("C03127", "NORMATIVE", "Inspect Pi `new-feedback/`, outstanding owner/flywheel branches and Beads status, and distinguish producer receipts from docs claims.",
  "distinguish producer receipts from docs claims", D04, "9", S, "auditors", PROP, [], ["C03126"], False)
c("C03128", "NORMATIVE", "The ledger must not be mined as a source of synthetic live evidence.",
  "Do not mine the ledger as a source of synthetic live evidence", D04, "9", S, "auditors", PROP, [], [], True)
c("C03129", "NORMATIVE", "Build one failing test at the real consumer seam before modifying production; report the failing command and first relevant assertion; fix; rerun positive and mutant; run the Forge gate; update docs/skill/receipt.",
  "Build one failing test at the **real consumer seam** before modifying production", D04, "10", S, "every change", PROP, [], ["C0397"], True)

# ---------------------------------------------------------------- 04 : ownership
S = "Code ownership map"
c("C03130", "OBSERVATION", "pi-subagents has `src/workbench/execute-tool.ts`, `execute.ts`, `native-modules.ts` and `src/index.ts`.",
  "Pi owns `src/workbench/execute-tool.ts`, `execute.ts`, `native-modules.ts`, `src/index.ts`", D04, "14", S, "pi-subagents src/", BASE, [], [], True)
c("C03131", "NORMATIVE", "Pi owns `src/workbench/execute-tool.ts`, `execute.ts`, `native-modules.ts`, `src/index.ts`, `hosts/mechanical-functions.ts`, observation projection, live control and UI.",
  "Pi owns ... observation projection, live control and UI", D04, "14", S, "ownership", PROP, [], ["C03130"], False)
c("C03132", "OBSERVATION", "`hosts/mechanical-functions.ts` does not yet exist in pi-subagents; it is proposed.",
  "`hosts/mechanical-functions.ts` (proposed)", D04, "14", S, "pi-subagents src/workbench/hosts", BASE, [], ["C0436"], True)
c("C03133", "NORMATIVE", "Mechanical owns the canonical descriptor and schema, packaged `develop` export, `apps/development-rig` binding and source-scope services, and `packages/development` policies.",
  "Mechanical owns the canonical descriptor and schema, packaged `develop` export, `apps/development-rig` application binding and source-scope services, `packages/development` policies", D04, "15", S,
  "ownership", PROP, [], ["C0342"], False)
c("C0342", "OBSERVATION", "MechanicalWorkflows has `apps/development-rig` and `packages/development`.",
  "`apps/development-rig` application binding ... `packages/development` policies", D04, "15", S, "MechanicalWorkflows", BASE, [], [], True)
c("C03134", "NORMATIVE", "No Pi import may be introduced into Mechanical's provider-neutral packages.",
  "Do not introduce a Pi import into its provider-neutral packages", D04, "15", S, "MechanicalWorkflows packages", PROP, [], [], True)
c("C03135", "NORMATIVE", "Furnace stays runtime authority; no new automatic retries, global workflow graph, or durable journal for Furnace Attempts may be implemented.",
  "Furnace stays runtime authority; do not implement new automatic retries, a global workflow graph, or a durable journal for Furnace Attempts", D04, "16", S, "architecture boundary", PROP, [], ["C0416"], True)
c("C03136", "NORMATIVE", "Forge stays build/gate authority and Beads stays readiness authority.",
  "Forge stays build/gate authority. Beads stays readiness authority", D04, "16", S, "architecture boundary", PROP, [], ["C0416"], False)
c("C03137", "NORMATIVE", "Forge and Furnace must not depend on each other; only the application composition root may call each for its independent job.",
  "No use of Forge/Furnace as dependencies of each other; only the application composition root may call each for its independent job", D04, "17", S, "architecture boundary", PROP, [], [], True)
c("C03138", "NORMATIVE", "No Library dependency is allowed.",
  "No Library dependency", D04, "17", S, "architecture boundary", PROP, ["'Library' refers to the OrchestrationEngineer Library repo"], [], True)

# ---------------------------------------------------------------- 04 : handoff contract
S = "Handoff contract for each change"
c("C03139", "NORMATIVE", "Each change's handoff must report the twelve fields: baseline sha/source paths; behavior to change; owner repo and producer authority; supported API/version confirmed by installed code; one negative reproducer and one positive journey; observed vs planned code; permissions/effects/cancellation/retention; native evidence/identity and no-false-PASS predicate; timing/resource budget and control behavior; Forge commands run and exact outcomes; docs/skill/source map/feature matrix/receipt updates; remaining blockers and next safe independent cut.",
  "baseline sha / source paths: ... remaining blockers and next safe independent cut:", D04, "21-34", S, "every change", PROP, [], [], True)

# ---------------------------------------------------------------- 04 : not acceptable
S = "Not acceptable"
c("C03140", "NORMATIVE", "A README that calls a future invocation runnable or hides its missing grant/host implementation is not acceptable.",
  "A README that calls a future invocation runnable or hides its missing grant/host implementation", D04, "38", S, "docs", PROP, [], ["C03141"], True)
c("C03141", "OBSERVATION", "An existing README in one of the repos presents a not-yet-runnable invocation as runnable or omits its missing grant/host implementation.",
  "A README that calls a future invocation runnable", D04, "38", S, "pi-subagents / MechanicalWorkflows README(s)", BASE,
  ["implicit: the prohibition is drawn from an observed instance (01 audit)"], [], True)
c("C03142", "NORMATIVE", "A test that creates a hand-written descriptor rather than loading the descriptor Pi will read is not acceptable.",
  "A test that creates a hand-written descriptor rather than loading the descriptor Pi will read", D04, "39", S, "tests", PROP, [], ["C0338"], True)
c("C03143", "NORMATIVE", "An unconditional `node()` call that blocks for the entire long-lived Mechanical development task is not acceptable.",
  "An unconditional `node()` call that blocks for the entire long-lived Mechanical development task", D04, "40", S, "Pi workflow primitives", PROP, [], ["C0341", "C0460"], True)
c("C03144", "NORMATIVE", "A fake Forge PASS, or a native ID constructed from a Pi-only execution index, is not acceptable.",
  "A fake Forge PASS or a native ID constructed from a Pi-only execution index", D04, "41", S, "evidence", PROP, [], ["C03145"], True)
c("C03145", "OBSERVATION", "Pi maintains a Pi-only execution index from which identifiers could be constructed.",
  "a Pi-only execution index", D04, "41", S, "pi-subagents workflow execution state", BASE, [], [], True)
c("C03146", "NORMATIVE", "A successful `git status` must not be interpreted as a preservation guarantee after a failed commit.",
  "A successful `git status` interpreted as a preservation guarantee after failed commit", D04, "42", S, "candidate write path", PROP,
  ["a clean `git status` after a failed commit does not prove the work was preserved"], ["C0366"], True)
c("C03147", "NORMATIVE", "A model answer must not be reused across changed source/instructions on the basis of an equal prompt alone.",
  "A model answer reused across changed source/instructions on the basis of equal prompt alone", D04, "43", S, "replay/cache", PROP, [], ["C0455"], True)
c("C03148", "NORMATIVE", "A claimed real integration based only on a fixture, test count or previously measured independent component journeys is not acceptable.",
  "A claimed real integration based only on fixture, test count or previously measured independent component journeys", D04, "44", S, "acceptance", PROP, [], ["C0380"], True)

# ---------------------------------------------------------------- README
S = "README header"
c("C0401", "DEFINITION", "The program's status is a new design program, not an implementation or a live acceptance receipt.",
  "NEW DESIGN PROGRAM — not an implementation or live acceptance receipt", RD, "3", S, "the whole program", DOC, [], [], True)
c("C0402", "OBSERVATION", "On 2026-11-04 the pi-subagents `master` audit baseline was commit f67b6665a132dbb0e86aea48cf36cf6ae0412521.",
  "pi-subagents `master` `f67b6665a132dbb0e86aea48cf36cf6ae0412521`", RD, "4", S, "pi-subagents master on 2026-11-04", "2026-11-04", [], [], True)
c("C0403", "OBSERVATION", "On 2026-11-04 the MechanicalWorkflows `main` audit baseline was commit 0c78e2530cbf5737a8bbb763475385a2f0f760cc.",
  "MechanicalWorkflows `main` `0c78e2530cbf5737a8bbb763475385a2f0f760cc`", RD, "4", S, "MechanicalWorkflows main on 2026-11-04", "2026-11-04", [], [], True)
c("C0404", "DEFINITION", "This program's scope is the Pi host half of one coordinated cross-repository program.",
  "the Pi host half of one coordinated cross-repository program", RD, "5", S, "program scope", DOC, [], [], False)
c("C0405", "OBSERVATION", "The MechanicalWorkflows half of the program is at `MechanicalWorkflows/docs/programs/pi-workbench-interop-2026-11-04/`.",
  "The MechanicalWorkflows half is under `MechanicalWorkflows/docs/programs/pi-workbench-interop-2026-11-04/`", RD, "5", S, "MechanicalWorkflows docs", BASE, [], [], True)
c("C0406", "SOURCE_REPORT", "This program continues W11/VC-3 from `docs/workbench/feature-matrix.md` and `docs/workbench/15-implementation-program.md`.",
  "This program continues W11/VC-3 from [feature-matrix](../../feature-matrix.md) and [implementation program](../../15-implementation-program.md)", RD, "7", S, "pi-subagents docs/workbench", DOC, [], ["C0407"], False)
c("C0407", "OBSERVATION", "pi-subagents `docs/workbench/feature-matrix.md` has a W11 row and `docs/workbench/15-implementation-program.md` defines VC-3.",
  "W11/VC-3", RD, "7", S, "pi-subagents docs/workbench", BASE, [], [], True)
c("C0408", "NORMATIVE", "This program does not relabel W11 as completed.",
  "It does **not** relabel W11 as completed", RD, "7", S, "feature-matrix W11", DOC, [], ["C0407"], True)
c("C0409", "OBSERVATION", "The audit inventoried installed code and recorded evidence only; no new test, live integration, Forge gate or benchmark ran in preparation for these docs.",
  "no new test, live integration, Forge gate or benchmark ran in preparation for these docs", RD, "7", S, "the program's own method", DOC, [], [], True)
c("C0410", "NORMATIVE", "Executable support must not be inferred from proposed types, commands, or examples.",
  "Do not infer executable support from proposed types, commands, or examples", RD, "7", S, "readers", DOC, [], [], True)
S = "Reading order"
c("C0411", "SOURCE_REPORT", "The program consists of 01 (audit), 02 (architecture/protocol), 03 (implementation/QA), 04 (agent handoff) and the project skill at `.agents/skills/pi-mechanical-interop/SKILL.md`, each covering the stated topics.",
  "1. [01 — Source-grounded audit] ... 5. [Project skill](../../../../.agents/skills/pi-mechanical-interop/SKILL.md)", RD, "11-15", S, "program files", DOC, [], [], False)
S = "Hard boundaries"
c("C0412", "NORMATIVE", "Pi hosts invocation, launch, observation and explicitly authorized controls.",
  "Pi hosts invocation, launch, observation and explicitly authorized controls", RD, "19", S, "Pi role", DOC, [], [], True)
c("C0413", "NORMATIVE", "Pi does not become a workflow scheduler, Beads authority, Forge verifier, Furnace replica or dependency of MechanicalWorkflows.",
  "It does not become a workflow scheduler, Beads authority, Forge verifier, Furnace replica or dependency of MechanicalWorkflows", RD, "19", S, "Pi role", DOC, [], [], True)
c("C0414", "NORMATIVE", "MechanicalWorkflows retains ordinary typed function composition; application-owned services are callbacks, not a universal tool ABI.",
  "application-owned services are callbacks, **not** a universal tool ABI", RD, "20", S, "MechanicalWorkflows role", DOC, [], [], True)
c("C0415", "NORMATIVE", "No new obligatory DSL or registry may be introduced.",
  "No new obligatory DSL/registry", RD, "20", S, "both repos", DOC, [], [], True)
c("C0416", "NORMATIVE", "Claude Agent SDK owns agent sessions; Forge owns native gate results and evidence; Furnace owns durable Run/Work/Attempt and retry decisions; HX owns coverage and source query basis; RF owns render provenance; Beads owns readiness.",
  "Claude Agent SDK owns agent sessions. Forge owns native gate results and evidence. Furnace owns durable Run/Work/Attempt and retry decisions. HX owns coverage and source query basis. RF owns render provenance. Beads owns readiness", RD, "21", S,
  "authority map", DOC, [], [], True)
c("C0417", "DEFINITION", "A successful function return is not a Forge PASS.",
  "A successful function return is not a Forge PASS", RD, "22", S, "evidence semantics", DOC, [], [], True)
c("C0418", "DEFINITION", "A displayed result is not current native evidence.",
  "a displayed result is not current native evidence", RD, "22", S, "evidence semantics", DOC, [], [], True)
c("C0419", "DEFINITION", "A read-only RF preview is not a committed task-grounded render.",
  "a read-only RF preview is not a committed task-grounded render", RD, "22", S, "evidence semantics", DOC, [], ["C0445"], True)
c("C0420", "NORMATIVE", "Every ability to write or dispatch must have explicit host-side authorization and recoverable native references.",
  "Every ability to write/dispatch must have explicit host-side authorization and recoverable native references", RD, "23", S, "all write/dispatch paths", DOC, [], [], True)
c("C0421", "NORMATIVE", "An ambiguous effect must never be silently retried.",
  "Never silently retry an ambiguous effect", RD, "23", S, "all effect paths", DOC, [], [], True)
c("C0422", "NORMATIVE", "No GitHub CI; Forge is the primary gate, with test evidence, negative controls and per-cut receipts.",
  "No GitHub CI; use Forge for the primary gate, with test evidence, negative controls and per-cut receipts", RD, "24", S, "both repos", DOC, [], [], True)
c("C0423", "NORMATIVE", "Nothing may be appended to the historical `TRACEABILITY.md`.",
  "Do not append to the historical `TRACEABILITY.md`", RD, "24", S, "pi-subagents docs", DOC, [], ["C03103"], True)

# ---------------------------------------------------------------- SKILL
S = "frontmatter"
c("C0424", "NORMATIVE", "The skill applies when designing, implementing, auditing or operating Pi Workbench invocation of MechanicalWorkflows functions (pinned artifacts, native HX/RF/Claude/Forge services, Furnace hosting, source-basis proof, effect recovery).",
  "Use when designing, implementing, auditing, or operating Pi Workbench invocation of MechanicalWorkflows functions", SK, "3", S, "skill trigger", DOC, [], [], False)
S = "Pi Workbench ↔ MechanicalWorkflows integration (preamble)"
c("C0425", "NORMATIVE", "Read the program README and its four guides, `AGENTS.md`, `docs/workbench/feature-matrix.md` W11 and MechanicalWorkflows' matching program/skill before changing integration code.",
  "Read `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md` and its four guides before changing integration code", SK, "8", S, "implementers", DOC, [], ["C03117"], False)
c("C0426", "NORMATIVE", "Verify both current branch heads and installed SDKs before relying on the program's pins.",
  "Verify both current branch heads and installed SDKs", SK, "8", S, "implementers", DOC, [], [], True)
c("C0427", "DEFINITION", "The program's source pins are an audit baseline, not permanent truth.",
  "program source pins are an audit baseline, not permanent truth", SK, "8", S, "program pins", DOC, [], ["C0402", "C0403"], False)

S = "Actual current state"
c("C0428", "OBSERVATION", "Pi has a real Claude SDK workflow host.",
  "Pi has a real Claude SDK workflow host", SK, "12", S, "pi-subagents src/workbench", BASE, [], [], True)
c("C0429", "OBSERVATION", "Pi registers the tools `workflow_execute`, `workflow_observe`, `workflow_control` and `workflow_reconcile`.",
  "tools `workflow_execute`, `workflow_observe`, `workflow_control` and `workflow_reconcile`", SK, "12", S, "pi-subagents tool registration", BASE, [], [], True)
c("C0430", "OBSERVATION", "`workflow_execute` accepts only script definitions today.",
  "`workflow_execute` accepts **only script** definitions today", SK, "12", S, "pi-subagents workflow_execute", BASE, [], [], True)
c("C0431", "OBSERVATION", "Function and furnace-formula definitions are modelled (typed) in Pi.",
  "function and furnace-formula are modelled", SK, "12", S, "pi-subagents workflow definition types", BASE, [], [], True)
c("C0432", "OBSERVATION", "Function and furnace-formula definitions are refused by `workflow_execute`.",
  "function and furnace-formula are modelled but refused", SK, "12", S, "pi-subagents workflow_execute", BASE, [], ["C0431"], True)
c("C0433", "OBSERVATION", "MechanicalWorkflows exports `develop(services,request)`.",
  "Mechanical exports `develop(services,request)`", SK, "13", S, "MechanicalWorkflows develop export", BASE, [], [], True)
c("C0434", "OBSERVATION", "MechanicalWorkflows has a pinned installed tarball host.",
  "has a pinned installed tarball host", SK, "13", S, "MechanicalWorkflows installed-host.ts", BASE, [], [], True)
c("C0435", "OBSERVATION", "Pi does not currently load or call the Mechanical installed tarball host.",
  "Pi does not currently load or call that host", SK, "13", S, "pi-subagents source tree", BASE,
  ["absence claim: detector = search of the Pi source tree for Mechanical host imports/calls"], ["C0434"], True)
c("C0436", "OBSERVATION", "The Pi source tree contains no registered Mechanical binding.",
  "The source tree contains no registered Mechanical binding", SK, "13", S, "pi-subagents source tree", BASE,
  ["absence claim: detector = grep for Mechanical registration in src/"], [], True)
c("C0437", "OBSERVATION", "Mechanical's checked-in descriptor and its entrypoint host disagree about the spelling of the schema reference.",
  "Mechanical's checked-in descriptor and its entrypoint host disagree about schema reference spelling", SK, "14", S, "MechanicalWorkflows descriptor + entrypoint-host.ts", BASE, [], [], True)
c("C0438", "NORMATIVE", "Test the checked-in descriptor file, not a constructed approximation.",
  "Test the checked-in file, not a constructed approximation", SK, "14", S, "Mechanical descriptor tests", DOC, [], ["C0437"], True)
c("C0439", "OBSERVATION", "Pi's registered detached Claude request sends `grants:[]`.",
  "Pi's registered detached Claude request sends `grants:[]`", SK, "15", S, "pi-subagents detached Claude registration", BASE, [], [], True)
c("C0440", "OBSERVATION", "Pi local detached admission demands the `claude:invoke` grant.",
  "local detached admission demands `claude:invoke`", SK, "15", S, "pi-subagents detached admission", BASE, [], [], True)
c("C0441", "INFERENCE", "The registered detached Claude request is refused by local detached admission because it sends empty grants while admission demands `claude:invoke`.",
  "sends `grants:[]`, but local detached admission demands `claude:invoke`", SK, "15", S, "pi-subagents detached path", BASE,
  ["the registered request actually reaches local detached admission unchanged", "no intermediate step injects grants"], ["C0439", "C0440"], True)
c("C0442", "NORMATIVE", "The `claude:invoke` grant requirement must never be removed.",
  "never remove this grant requirement", SK, "15", S, "pi-subagents detached admission", DOC, [], ["C0440"], True)
c("C0443", "OBSERVATION", "The live Mechanical Git-census mode is real (exists and operates).",
  "The live Mechanical Git-census mode is real", SK, "16", S, "MechanicalWorkflows source-scope services", BASE, [], [], True)
c("C0444", "OBSERVATION", "The Mechanical Git-census mode is not certified task-scoped HX.",
  "real but not certified task-scoped HX", SK, "16", S, "MechanicalWorkflows source-scope services", BASE, [], ["C0443"], True)
c("C0445", "OBSERVATION", "The Pi RF preview is not a committed RF render.",
  "Pi RF preview is not a committed RF render", SK, "16", S, "pi-subagents RF preview path", BASE, [], [], True)
c("C0446", "OBSERVATION", "No Pi-to-Mechanical end-to-end acceptance has been witnessed.",
  "No Pi-to-Mechanical end-to-end acceptance has been witnessed", SK, "16", S, "both repos + recorded receipts/ledger", BASE,
  ["absence claim: detector = search of receipts, docs and ledger for such an acceptance"], [], True)

S = "Effective engineering loop"
c("C0447", "NORMATIVE", "Read both module implementations, Beads/current feedback and target docs, and capture exact source/SDK versions before changing code.",
  "Read both module implementations, Beads/current feedback and target docs. Capture exact source/SDK versions", SK, "20", S, "implementers", DOC, [], [], False)
c("C0448", "NORMATIVE", "Write a red test at the consumer boundary that injects a real committed descriptor and, where applicable, an actually packed tarball.",
  "Write a red test at the consumer boundary; inject a real committed descriptor and, where applicable, an actually packed tarball", SK, "21", S, "implementers", DOC, [], ["C0337"], True)
c("C0449", "NORMATIVE", "Build the smallest host-owned service binding while retaining original Mechanical functions, source basis, provider evidence and the four outcome variants.",
  "Build the smallest host-owned service binding; retain original Mechanical functions, source basis, provider evidence, and the four outcome variants", SK, "22", S, "implementers", DOC, [], ["C03111"], True)
c("C0450", "NORMATIVE", "Write privileges must be bound to host-authorized source/workspace/identity, with no user-supplied JS/exports, ambient credentials, implicit Pi worker authority, or blind effect retries.",
  "No user-supplied JS/exports, ambient credentials, implicit Pi worker authority, or blind effect retries", SK, "23", S, "write paths", DOC, [], ["C0420", "C0421"], True)
c("C0451", "NORMATIVE", "Live implementation must use one clean isolated Git workspace and require an actual changed commit/tree plus matching native Forge evidence.",
  "use one clean isolated Git workspace and require actual changed commit/tree + matching native Forge evidence", SK, "24", S, "live implementation", DOC, [], ["C0317", "C0318"], True)
c("C0452", "NORMATIVE", "Failure to preserve a dirty worktree is a P0 defect.",
  "Failure to preserve a dirty worktree is P0", SK, "24", S, "severity assignment", DOC, [], ["C0346"], True)
c("C0453", "NORMATIVE", "Cancellation must be honored before `beforeDispatch`.",
  "Honor cancellation before `beforeDispatch`", SK, "25", S, "Pi agent launch", DOC, [], ["C0351"], True)
c("C0454", "DEFINITION", "Late SDK/tool results do not prove cancellation or rollback.",
  "late SDK/tool results do not prove cancellation or rollback", SK, "25", S, "evidence semantics", DOC, [], [], True)
c("C0455", "NORMATIVE", "Replay only on an exact source/instructions/capability basis; refuse when the effect is unknown.",
  "Replay only exact source/instructions/capability basis; refuse unknown effect", SK, "25", S, "replay", DOC, [], [], True)
c("C0456", "NORMATIVE", "When claiming native acceptance, run exact focused tests, an adversarial mutant, the Forge gate and a live scratch journey; record commands, source SHA, provider versions and references; say 'not run' when not run.",
  "Run exact focused tests, adversarial mutant, Forge gate, and live scratch journey when claiming native acceptance ... If not run, say not run", SK, "26", S, "acceptance claims", DOC, [], ["C0378", "C0398"], True)
c("C0457", "NORMATIVE", "Update docs, status matrix and this skill in the same code cut; Pi receipts are per real bead under `docs/workbench/receipts/`; historical TRACEABILITY stays frozen.",
  "Update docs, status matrix and this skill in the same code cut. Pi receipts are per real bead under `docs/workbench/receipts/`; leave historical TRACEABILITY frozen", SK, "27", S, "every cut", DOC, [], ["C03101", "C03102"], False)

S = "Routing"
c("C0458", "NORMATIVE", "Pure coordination evaluation routes through a registered allowlisted function with a read-only result and is not effect authorization.",
  "Pure coordination evaluation: registered allowlisted function, read-only result; **not** effect authorization", SK, "31", S, "routing", DOC, [], ["C0334"], True)
c("C0459", "NORMATIVE", "Long-lived `develop()` routes through a `workflow_execute` async function launch, not `node()`.",
  "Long-lived `develop()`: `workflow_execute` async function launch, not default 30-second `node()`", SK, "32", S, "routing", DOC, [], ["C0460", "C0306"], True)
c("C0460", "OBSERVATION", "Pi's `node()` primitive has a default 30-second limit.",
  "default 30-second `node()`", SK, "32", S, "pi-subagents node() primitive", BASE, [], [], True)
c("C0461", "NORMATIVE", "UI observation must source native refs and exact domain status and never infer a Forge PASS from function/process success.",
  "UI observation: source native refs and exact domain status; never infer Forge PASS from function/process success", SK, "33", S, "Pi UI", DOC, [], ["C0417"], True)
c("C0462", "NORMATIVE", "Durable work routes through Furnace ExecutorApp with actual Run/Attempt IDs; Pi is only controller/observer when explicitly authorized.",
  "Durable work: Furnace ExecutorApp and actual Run/Attempt IDs; Pi is only controller/observer when explicitly authorized", SK, "34", S, "routing", DOC, [], ["C0463"], True)
c("C0463", "OBSERVATION", "Furnace provides an ExecutorApp hosting model with Run/Attempt identifiers.",
  "Furnace ExecutorApp and actual Run/Attempt IDs", SK, "34", S, "Furnace (installed SDK)", BASE, [], [], True)
c("C0464", "NORMATIVE", "When an upstream API is missing, document a precise reproducible blocker and never create a pretend local facsimile.",
  "Upstream API missing: document a precise reproducible blocker; never create a pretend local facsimile", SK, "35", S, "implementers", DOC, [], [], True)

# ---- integrity checks
ids = [r["id"] for r in rows]
assert len(ids) == len(set(ids)), "duplicate ids"
idset = set(ids)
for r in rows:
    for d in r["depends_on"]:
        assert d in idset, f"{r['id']} depends on unknown {d}"
    assert r["kind"] in {"OBSERVATION","SOURCE_REPORT","FORMAL_DERIVATION","INFERENCE","HYPOTHESIS","PREDICTION","DEFINITION","NORMATIVE","PROPOSAL"}, r["id"]

out = sys.argv[1]
with open(out, "w", encoding="utf-8") as f:
    for r in rows:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")
print(len(rows), sum(1 for r in rows if r["material"]))
