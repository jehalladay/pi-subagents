# Material claim verdicts, part A (worktree, function dispatch, detached grants, cancel, replay).
# Each entry: id -> dict. Evidence keys refer to evidence.EV / evidence.PRIOR_ROWS ("P:C0xxx").

A = {}

A["C1104"] = dict(
 status="ESTABLISHED", strength="is (self-report of method; plain factual wording about the document's own stated scope)",
 wording="unlanded machine branches and external journals were not enumerated",
 overclaims=False,
 rationale="Doc 01 line 3 states its own detection bound verbatim. The bound is real and material: the pin clone carries 1137 remote refs, 40 machine/flywheel/* branches ahead of d7666a76, and 8 of them touch the very files the absence/present-tense findings rest on (wb-5ik5 rewrites src/worktree.ts, wb-413a rewrites claude-host.ts replay, wb-ocie adds src/workbench/mechanical-descriptor.ts). Every 'no X exists' and 'currently refuses' row in this group inherits this bound as a scope restriction.",
 evidence=["D01_3", "PI_BR_COUNT", "PI_BR_5IK5", "PI_BR_413A", "PI_BR_OCIE"],
 defeaters=["none against the self-report; the branch survey is a SCOPE defeater for every downstream absence claim (they hold on the tracked master tree at d7666a76, not across unlanded work)"],
 rivals=["'not enumerated' could be read as 'none exist' by a careless reader; the survey shows they exist and carry relevant code"],
 faithful=None,
 propagation="Scope restriction 'tracked tree at pi d7666a76 / mw 97e18068, unlanded branches excluded' propagates to C1122, C1131-C1136, C1144, C1147, C1171-C1176, C1181, C1182, C1193, C1197, C1214-C1217, C1255.",
 missing=None,
 strongest="The method sentence is a first-person scope declaration; it is true by inspection and its honesty is confirmed by the branch survey (unlanded work exists and is relevant).",
 counter="A reader may treat the bound as a formality; it is not: wb-5ik5 (2026-11-06/07) already implements the worktree preservation fix on an unlanded branch, so 'currently' claims are pin-relative, not world-relative.",
 narrower="Doc 01 declares, and the pin clone confirms, that machine/flywheel/* branches with MWI-relevant code exist and were outside its inspection.",
 settle="Nothing further for the self-report; for downstream claims, a re-grade at a later master tip after the branches land.",
 attacks=["Entailment: line 3 quoted verbatim - holds.", "Detection model: ran git branch -r and per-branch diff against HEAD in the pin clone - 8 relevant branches found, confirming the bound is material.", "Temporal: branch commits are dated 2026-11-06/07, i.e. concurrent with the artifact - the doc's 'currently' is pin-time only."],
 remediation="none for this row; carry the scope restriction on every absence row (done in this ledger).",
)

A["C1114"] = dict(
 status="SUPPORTED", strength="evidence indicates (two gap families with different warrants: replay gaps ESTABLISHED by enumeration; per-agent startup gap a code-witnessed HYPOTHESIS, not run)",
 wording="replay/source and per-agent startup gaps",
 overclaims=False,
 rationale="Compound topology cell. The replay/source gap is established by the single replayBasis literal (claude-host.ts:166-175 lists no Git base, skill bytes, provider version or effect ref). The per-agent startup gap is the PI-CANCEL hypothesis (C1162): the controller joins the map only after the awaited beforeDispatch and the post-await re-check reads only the run-wide signal, so abortAgent during the await is a no-op by code reading; no runtime reproduction exists (not run). A compound claim cannot leave stronger than its weaker member.",
 evidence=["D01_10", "CH_166", "CH_207", "CH_215", "CH_216_220", "CH_341"],
 defeaters=["undercutting (startup gap): no test parks beforeDispatch and issues a per-agent abort; F10 covers only the run-wide signal", "scope: at the pin only; branch wb-413a already rebinds replay to measured source/instruction/provider readings (unlanded)"],
 rivals=["the startup gap may never manifest if beforeDispatch resolves faster than any skip can be issued; that is a timing question the static reading cannot close"],
 faithful=None,
 propagation="Inherits C1162 (SUPPORTED hypothesis) and C1171-C1173 (ESTABLISHED); depends_on list in the claims file is correct.",
 missing="A parked-beforeDispatch + abortAgent(agentId) test with SDK query count (wb-9v02) to settle the startup-gap half.",
 strongest="Both gaps are literally visible in claude-host.ts at the pin: the replay array and the await-before-register ordering.",
 counter="'Gaps' implies defects; the replay basis is documented as deliberately excluding per-run identity, and the startup window is only a defect if a skip can actually land inside it at runtime.",
 narrower="claude-host.ts's replay basis omits source/instruction/provider identity (established); its per-agent abort has a structural window during beforeDispatch (code-witnessed, unreproduced).",
 settle="Runtime reproduction for the startup gap; nothing further for the replay enumeration.",
 attacks=["Entailment of 'replay/source gap': enumerated the literal; no commit/tree/skill/version member - holds.", "Entailment of 'per-agent startup gap': traced skip -> abortAgent -> controllers.get undefined, sessions.has false (first spawn) -> no-op; re-check at 215 reads config.signal only - structural window holds by code.", "Independence: the SKILL/README restatements are the same lineage; no new warrant."],
 remediation="Split the cell into two findings with their own statuses when the ledger is compiled into requirements.",
)

A["C1116"] = dict(
 status="ESTABLISHED", strength="is / does (plain factual, at the pin, static reading; test pass not run)",
 wording="`function` and `furnace-formula` refused before launch",
 overclaims=False,
 rationale="execute-tool.ts:217-218 refuses admission.definition.kind !== 'script' with unsupported-definition-kind before resolveSource or any launch; the committed test iterates ['function','furnace-formula'] and asserts resolveSource and launchEmbedded were never called. execute-tool.ts is byte-identical between the program baseline 278c8f79 and the artifact pin (d7666a76 is a docs-only commit).",
 evidence=["D01_11", "ET_215_218", "ET_TEST", "PI_DRIFT"],
 defeaters=["none at the pin; precondition: a detached request without workbench:detach is refused earlier with missing-detach-grant (different code, still no launch)"],
 rivals=["none material"],
 faithful=True,
 propagation="Supports C1141, C1147; consistent with prior C0162/C0432 (ESTABLISHED) - restatement at the new pin, no delta.",
 missing=None,
 strongest="Direct source reading plus a committed test asserting exactly this behaviour.",
 counter="A refusal path in code is not a witnessed refusal in a running Pi; the test was not run here. The proposition is about the code path, so the counter does not bite.",
 narrower="At pi d7666a76 the registered workflow_execute code path refuses non-script kinds before any source resolution or launch.",
 settle="Nothing further (test pass would add a runtime witness but is not required for the code proposition).",
 attacks=["Line numbers 217-218 verified exact at the pin.", "Checked that no other launch path bypasses the kind check: both detached call sites in index.ts go through ExecuteLaunch produced after this check (2621 launchDetachedWorkflow takes an ExecuteLaunch); workflow_detached (2880) takes scriptPath only, so no definition kind reaches it."],
 remediation="none",
)

A["C1120"] = dict(
 status="ESTABLISHED", strength="is (static source contradiction; not executed)",
 wording="registered Claude request passes incompatible empty grants",
 overclaims=False,
 rationale="index.ts:2627-2628 hardcodes grants: [] with backend 'claude' when workflowAgentBackend==='claude'; local-detached.ts validateRequest (called first in launchDetachedWorkflow, 531-532) throws at 430 without claude:invoke. 'Incompatible' is entailed. The second registered producer (workflow_detached, 2881) also passes grants:[] and so is refused whenever params.backend==='claude'.",
 evidence=["D01_13", "IDX_2623", "IDX_2627", "IDX_2881", "LD_430", "LD_442", "LD_531", "NM_89"],
 defeaters=["none; scope: the contradiction exists only under the claude backend setting (deterministic backend passes validation with empty grants)"],
 rivals=["an intermediate layer could inject grants: checked - workbenchNative().launchDetachedWorkflow is a bare getter over the local-detached export (native-modules.ts:89-90)"],
 faithful=True,
 propagation="Jointly with C1151-C1153 grounds C1154; prior C0201/C0343/C0439/C0441/C0586 restated at the new pin.",
 missing=None,
 strongest="Both halves are literal source at the pin and the call order (validate first) is explicit.",
 counter="The deterministic backend is the default; the Claude path is opt-in by settings, so the 'registered Claude request' never fires unless workflowAgentBackend is 'claude'. The claim is correctly scoped to that request.",
 narrower="Under workflowAgentBackend==='claude', the registered detached launch cannot pass validateRequest.",
 settle="A runtime attempt of the registered path with backend claude (expected refusal) would add an execution witness; none exists at the pin (prior C0209).",
 attacks=["Entailment: verified both call sites and the validator lines.", "Intermediate injection: ruled out by native-modules.ts getter.", "Drift: index.ts and local-detached.ts unchanged between 278c8f79 and d7666a76."],
 remediation="none",
)

A["C1122"] = dict(
 status="ESTABLISHED", strength="is (for the catch's behaviour); 'dangerous' is an evaluative gloss warranted by C1133",
 wording="dangerous preservation-error catch",
 overclaims=False,
 rationale="worktree.ts:177-181 is a single outer catch that force-removes the worktree and returns {hasChanges:false}; git() throws on any non-zero exit (75-76), so any step in the try block (status, add, commit, rev-parse, branch) routes here. The evaluative 'dangerous' rests on C1133 (loss of recoverable changes), which is established by code reading.",
 evidence=["D01_14", "WT_CATCH", "WT_REMOVE", "WT_GIT"],
 defeaters=["temporal/scope: unlanded branch wb-5ik5 (commits 2026-11-06/07) rewrites this catch to keep the worktree; not at the pin", "undercutting (characterization): test/worktree.test.ts:432-446 asserts the hasChanges:false report after an injected commit failure, locking the current behaviour in as specified"],
 rivals=["'historic' (same cell) is a definitional label (prior C0177), not a claim that the path is unused: agent-manager.ts calls cleanupWorktree at three sites today"],
 faithful=True,
 propagation="Grounds C1131-C1135.",
 missing=None,
 strongest="The catch is seven lines and unambiguous; the force-remove is in removeWorktree one screen below.",
 counter="The catch is 'best effort cleanup' by its own comment; one could argue losing a temp worktree after a failed commit is intended. The counter does not change what the code does, only whether it is a defect - that is the normative row C1134.",
 narrower="At the pin, any failure inside cleanupWorktree's try block force-removes the worktree and reports no changes.",
 settle="none needed for the code reading.",
 attacks=["Entailment verified line by line.", "Reachability: agent-manager.ts:738/891/929 call cleanupWorktree for Pi-native worktree agents, so the path is live today (not only historic).", "Drift: worktree.ts unchanged 278c8f79..d7666a76."],
 remediation="none",
)

A["C1125"] = dict(
 status="ESTABLISHED", strength="is (plain factual within Node module semantics)",
 wording="trusted in-process JS",
 overclaims=False,
 rationale="installed-host.ts recomputes the artifact SHA-256 (37-38), requires the installed realpath inside the isolated root (42), then `await import(url)` of dist/index.js (43-44) with no vm, worker or process boundary. Importing executes the module as the host process's code.",
 evidence=["D01_16", "MW_INST_37", "MW_INST_42"],
 defeaters=["none"],
 rivals=["the digest+root checks are integrity controls, not isolation; the claim distinguishes the two correctly"],
 faithful=True,
 propagation="Grounds C1195 (non-material) and the presupposition of C1196.",
 missing=None,
 strongest="A dynamic import in the same process is by definition in-process trusted execution.",
 counter="None credible; the temp directory and digest checks do not create a sandbox (prior C0528).",
 narrower="n/a (claim already narrow).",
 settle="none",
 attacks=["grep for vm./worker/sandbox in installed-host.ts: only the dynamic import at 44."],
 remediation="none",
)

A["C1129"] = dict(
 status="ESTABLISHED", strength="is (module-level; 'boundary' = a typed ingestion module, not an operational wired path)",
 wording="read-only Mechanical-event boundary, not first-class function launch",
 overclaims=False,
 rationale="collective-event.ts exists at the pin (added f65860e1, 2026-10-28), imports only ./observation.js, declares authority observation-only, and performs no launch. It is also unwired: no module under src/ imports it (only tests do), so 'boundary' must be read as a module, not as a registered tool path.",
 evidence=["D01_18", "CE_2", "CE_16", "CE_34", "CE_ADDED", "CE_IMPORTERS"],
 defeaters=["scope: module-level only; dynamic import by computed string would evade the literal grep (blind spot)"],
 rivals=["'integration' readings of this cell overstate: the module is exercised by tests, not by a registered Pi tool"],
 faithful=None,
 propagation="Grounds C1244 (collective-event.ts exists, falsifying the W11 sentence at the pin) and bounds C1144 (a Mechanical-named module exists but is not a host).",
 missing=None,
 strongest="Header comment, import list and provider constants all say observation-only; nothing executes.",
 counter="Calling an unwired module a 'boundary' could suggest Pi ingests Mechanical events today; it does not on any registered path.",
 narrower="src/workbench/collective-event.ts is an observation-only envelope module with no src importer and no launch capability.",
 settle="none",
 attacks=["grep importers over src/ and test/ - src: only itself.", "Checked for fs/child_process/launch imports - none."],
 remediation="Wording: add 'module-level, unwired at the pin' where the cell is restated.",
)

A["C1131"] = dict(
 status="ESTABLISHED", strength="does (plain factual)",
 wording="on preservation failure its outer catch attempts `git worktree remove --force`",
 overclaims=False,
 rationale="catch at 177-181 calls removeWorktree; removeWorktree runs ['worktree','remove','--force', path] (189), falling back to prune. Entailed verbatim.",
 evidence=["WT_CATCH", "WT_REMOVE"],
 defeaters=["temporal: wb-5ik5 (unlanded) changes this; not at the pin"],
 rivals=[], faithful=True,
 propagation="Premise of C1133.", missing=None,
 strongest="Literal code.", counter="None.", narrower="n/a", settle="none",
 attacks=["Verified both functions at the pin."], remediation="none",
)

A["C1132"] = dict(
 status="ESTABLISHED", strength="does (plain factual)",
 wording="returns `hasChanges:false`",
 overclaims=False,
 rationale="Line 180 returns { hasChanges: false } from the catch; the same shape is the clean no-change result (152), so callers cannot distinguish failure from success (prior C0171).",
 evidence=["WT_CATCH", "WT_TEST_432"],
 defeaters=["temporal: wb-5ik5 (unlanded) adds a typed preservationFailed variant; not at the pin"],
 rivals=[], faithful=True,
 propagation="Premise of C1133.", missing=None,
 strongest="Literal code; the committed test at 432-446 asserts exactly this return after an injected commit failure.",
 counter="None.", narrower="n/a", settle="none",
 attacks=["Verified return and the test."], remediation="none",
)

A["C1133"] = dict(
 status="ESTABLISHED", strength="can / may (modal is correct: loss occurs when the catch is reached and the force-remove succeeds; the artifact uses 'can')",
 wording="This can discard recoverable changes after commit or branch failure.",
 overclaims=False,
 rationale="Deductive from established premises: git() throws on non-zero exit (75-76); the worktree is detached (111-112); a commit failure leaves edits only in the worktree's working tree, which `worktree remove --force` deletes; a double branch-creation failure leaves the commit unreferenced once the detached worktree (and its HEAD reflog) is removed. Both are recoverable before the catch and discarded or orphaned after it. The trigger set is wider than worded: status/add/rev-parse failures route to the same catch (fidelity lens narrowing) - an understatement, not an overclaim.",
 evidence=["D01_22b", "WT_GIT", "WT_DETACH", "WT_ADD_COMMIT", "WT_BRANCH", "WT_CATCH", "WT_REMOVE"],
 defeaters=["undercutting (reproduction): no test at the pin asserts byte loss; test 432-446 asserts only the report half (prior M008)", "scope: 'after commit or branch failure' understates the trigger set (status/add/rev-parse failures also reach the catch)"],
 rivals=["the branch-failure case leaves a dangling commit object recoverable by fsck until gc - 'discard' is strictly true of the reference and of the working tree, not of the object store"],
 faithful=True,
 propagation="Grounds C1134, C1135; inherits scope restriction from C1104 (wb-5ik5 unlanded fix).",
 missing="An injected-failure test asserting bytes before/after (the artifact itself demands it; wb-5ik5 cuts #1-#3 on the unlanded branch claim to add it - not inspected for pass here, not run).",
 strongest="Three code facts (throwing git helper, detached worktree, force-remove in catch) entail the loss mechanically.",
 counter="'Recoverable' presumes the edits mattered; a reviewer could say the agent's work was never committed to a branch so nothing 'owned' was lost. The code still destroys bytes the agent wrote.",
 narrower="If any git step in cleanupWorktree fails after the agent edited files, the edits (and any fresh commit's reference) are removed with the worktree and the caller is told there were no changes.",
 settle="The injected-failure byte-preservation test the artifact requires.",
 attacks=["Entailment: traced each failure point; the catch is the only handler.", "Alternative explanation: could `worktree remove --force` fail and leave the directory? Then prune runs; the directory may survive as an orphan - loss avoided by accident, not by design; the claim says 'can', which survives.", "Independence: Nov-4 program, SKILL and README restate the same reading (one lineage); the code is the witness."],
 remediation="Broaden the trigger set wording to 'any failed preservation step'.",
)

A["C1134"] = dict(
 status="NON-EPISTEMIC", strength="the program assigns / we rate (priority is a normative decision)",
 wording="**P0 PI-WT — Potential loss of edited source.**",
 overclaims=False,
 rationale="Priority assignment. Presuppositions: C1133 ESTABLISHED (loss mechanism), C1122 ESTABLISHED, reachability today through agent-manager worktree agents (AM_738) - all hold. Consistent with prior C0173/C0452 (P0) and with the MW companion's 'P0, external-to-Mechanical'. Authority: the program author; the Nov-4 BEAD-PLAN additionally requires a specification ruling where the characterization test (432-446) conflicts with the required contract.",
 evidence=["D01_22a", "AM_738", "WT_TEST_432", "BEADPLAN_8", "NOV4_01_21"],
 defeaters=["none epistemic; process: the conflicting characterization test is not named anywhere in the eight Nov-6 artifact files"],
 rivals=["a reviewer could rate it P1 if the Claude host never requests worktree isolation (it refuses it, C1136); but Pi-native agents reach the path today, so P0 is applicable"],
 faithful=True,
 propagation="Presupposition statuses: C1133 ESTABLISHED, C1122 ESTABLISHED.", missing=None,
 strongest="Loss of user source is the canonical P0.", counter="Priority is a choice; a program could defer it where the writer never uses worktrees. The artifact chooses P0 for any Mechanical writer.",
 narrower="n/a (normative)", settle="n/a",
 attacks=["Presuppositions re-opened at the pin (catch, test, call sites)."],
 remediation="Name test/worktree.test.ts:432-446 in the finding so the implementing bead carries the BEAD-PLAN:8 ruling duty.",
)

A["C1135"] = dict(
 status="NON-EPISTEMIC", strength="must (requirement; force from the program, not from evidence)",
 wording="A concrete injected failure and byte-preservation assertion must precede use by a Mechanical writer.",
 overclaims=False,
 rationale="Requirement. Presuppositions: C1133 (ESTABLISHED), no such test exists at the pin (verified: worktree.test.ts asserts the report, not the bytes; prior M008). Consistent with prior C0172/C0174/C0347.",
 evidence=["D01_22b", "WT_TEST_432", "BEADPLAN_8"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition statuses: C1133 ESTABLISHED; absence of the test at the pin ESTABLISHED (grep preservation in test/worktree.test.ts -> 252, 432, neither asserts bytes).", missing=None,
 strongest="Standard regression-test demand.", counter="None (normative).", narrower="n/a", settle="n/a",
 attacks=["Checked the existing tests for a byte assertion - none."], remediation="none",
)

A["C1136"] = dict(
 status="ESTABLISHED", strength="does (plain factual, scoped to the Claude SDK workflow host)",
 wording="Pi Claude workflow `isolation:\"worktree\"` currently refuses",
 overclaims=False,
 rationale="claude-host.ts:188-189 returns an error for request.isolation === 'worktree'. Scope: the Claude SDK host only; Pi's legacy agent-manager path still honours agent({isolation:'worktree'}) (tool-description.ts:81; agent-manager.ts:738), so the lossy cleanupWorktree path remains reachable through Pi-native agents - which strengthens, not weakens, the P0.",
 evidence=["D01_22c", "CH_188", "TD_81", "AM_738"],
 defeaters=["scope: true of the Claude host, silent about the agent-manager host"],
 rivals=["'currently' is pin-time; no unlanded branch inspected changes 188-189 (wb-413a touches claude-host.ts for replay, not isolation - not inspected line by line)"],
 faithful=True,
 propagation="Grounds C1137 (non-material).", missing=None,
 strongest="Literal refusal string.", counter="None for the Claude host.",
 narrower="n/a", settle="none",
 attacks=["Verified lines; verified the second host still calls cleanupWorktree."], remediation="Add 'Claude SDK host' qualifier; note the agent-manager path is live.",
)

A["C1141"] = dict(
 status="ESTABLISHED", strength="does (plain factual about lines 217-218; precondition noted)",
 wording="`execute-tool.ts:217-218` deliberately rejects non-script definitions with `unsupported-definition-kind`",
 overclaims=False,
 rationale="Lines 217-218 are exact at the pin and refuse every kind !== 'script' with that code. Precondition: a request reaches them only after decideExecute admits it (202-203) and, for detached hostMode, only with the detach grant (215-216 refuses first with missing-detach-grant). So 'every non-script definition' is refused, but not every one with THIS code. 'Deliberately' is the separate inference C1142.",
 evidence=["D01_24a", "ET_215_218", "ET_202", "ET_TEST"],
 defeaters=["scope: refusal-code attribution holds only for requests that pass the earlier checks"],
 rivals=[], faithful=True,
 propagation="Premise of C1147, C1148 (non-material), C1142.", missing=None,
 strongest="Exact line numbers, exact code, committed test.",
 counter="A detached non-script request without workbench:detach is refused with missing-detach-grant, not unsupported-definition-kind.",
 narrower="No non-script definition launches; those reaching the kind check are refused with unsupported-definition-kind.",
 settle="none",
 attacks=["Line numbers verified (the Nov-4 doc's 215-219 offset is corrected here).", "Order of checks verified."],
 remediation="none (precondition is a note, not a defect)",
)

A["C1143"] = dict(
 status="ESTABLISHED", strength="asserts (a test asserts X; whether it passes was not run)",
 wording="its test explicitly expects refusal",
 overclaims=False,
 rationale="test/workbench-execute-tool.test.ts:173-181 loops over function and furnace-formula and asserts reply.error.code === 'unsupported-definition-kind' with resolveSource and launchEmbedded never called. Not run.",
 evidence=["ET_TEST"],
 defeaters=["none; 'a test asserts X' != 'the test can detect not-X' - here the assertion is on the exact code, so it would detect a code change"],
 rivals=[], faithful=None,
 propagation="Supports C1142 (intent).", missing=None,
 strongest="Verbatim test.", counter="None.", narrower="n/a", settle="none",
 attacks=["Read the test body; it is a positive assertion on the refusal code."], remediation="none",
)

A["C1144"] = dict(
 status="ESTABLISHED", strength="is (at the pin, tracked src tree, under the stated detection model)",
 wording="No native Mechanical host is registered.",
 overclaims=False,
 rationale="Detection model (run here): ls src/workbench/hosts -> furnace-hosted.ts, local-detached.ts; grep -rli mechanical src/ -> collective-event.ts (observation-only) and tool-description.ts (a prose word); grep for the four outcome tokens in src/ -> 0; package.json has no @mechanical dependency; execute-tool refuses kind !== script before launch. Scope inherits C1104: tracked tree at d7666a76 only (unlanded wb-ocie adds a descriptor boundary module, still not a host).",
 evidence=["D01_24b", "LD_409", "GREP_MECH", "GREP_OUTCOME", "PKG_MECH", "ET_215_218", "D01_3"],
 defeaters=["scope: unlanded branches excluded by declaration (C1104); dynamic registration from user settings not executed (static audit)"],
 rivals=["collective-event.ts is Mechanical-named code; it is not a host (no launch, unwired)"],
 faithful=True,
 propagation="Premise of C1147, C1181, C1182; the prior C0160/C0340/C0436 are restated at the new pin.",
 missing=None,
 strongest="Four independent lexical/structural detectors agree.",
 counter="A host could be registered under a name that never contains 'mechanical' - the hosts directory listing and the kind refusal close that gap for the registered execute path.",
 narrower="At pi d7666a76 no registered code path launches a Mechanical function.",
 settle="none at the pin; re-grade after wb-ocie/wb-4bxo land.",
 attacks=["Ran all four detectors at the pin.", "Checked unlanded branches: wb-ocie adds src/workbench/mechanical-descriptor.ts (descriptor admission), no host."],
 remediation="none",
)

A["C1145"] = dict(
 status="NON-EPISTEMIC", strength="must not (norm)",
 wording="Do not replace this with a shell-backed `node()`",
 overclaims=False,
 rationale="Norm restating prior C0186/C0341/C0459. Presupposition check: node() at the pin is capability dispatch through the detached registry under explicit grants (local-detached.ts), not a shell; the norm forbids a hypothetical shell-backed substitute, which is coherent.",
 evidence=["D01_24b"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition: C1147 (ESTABLISHED) - there is a gap someone might fill badly.", missing=None,
 strongest="Standard anti-pattern guard.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["Checked that 'shell-backed node()' does not describe current node(): it does not."], remediation="none",
)

A["C1146"] = dict(
 status="NON-EPISTEMIC", strength="must not (norm)",
 wording="or pretend that a separate Mechanical rig's CLI is Pi interop",
 overclaims=False,
 rationale="Norm. Presuppositions hold: the rig declares bin mechanical-development-rig (package.json:10-12) and contains no pi-subagents reference (grep 0 files), so it is a separate CLI and not a Pi binding (C1127, prior C0153).",
 evidence=["D01_24b", "MW_PKG_10", "MW_NO_PI", "MW_CLI"],
 defeaters=["none"], rivals=[], faithful=None,
 propagation="Presupposition statuses: C1192 ESTABLISHED, C1127 ESTABLISHED.", missing=None,
 strongest="Guards against relabelling.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["Verified bin and the absence of Pi references in MW src."], remediation="none",
)

A["C1147"] = dict(
 status="ESTABLISHED", strength="has no (plain factual at the pin, tracked tree)",
 wording="**P1 PI-FUNC — Missing first-class function dispatch.**",
 overclaims=False,
 rationale="Deductive from C1140 (model admits function), C1141 (tool refuses it), C1144 (no host registered): nothing at the pin launches a function definition. The 'P1' label itself is normative (recorded in the row's kind as INFERENCE; the priority is a choice).",
 evidence=["D01_24a", "EX_78", "ET_215_218", "GREP_MECH"],
 defeaters=["scope: pin-relative (C1104); unlanded branches wb-ocie/wb-ny54/wb-s8rm add descriptor/admission tests, no dispatch"],
 rivals=[], faithful=True,
 propagation="Premise of C1241 (non-material); prior C0128/C0164/C0183 restated.", missing=None,
 strongest="Three established premises, valid derivation.", counter="None at the pin.",
 narrower="n/a", settle="none",
 attacks=["Premises re-opened at the pin."], remediation="none",
)

A["C1151"] = dict(
 status="ESTABLISHED", strength="does (plain factual)",
 wording="with `grants:[]`",
 overclaims=False,
 rationale="index.ts:2628 literal grants: [] in launchDetachedWorkflow (backend claude when configured); 2881 likewise for workflow_detached.",
 evidence=["IDX_2623", "IDX_2627", "IDX_2881"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Premise of C1154.", missing=None,
 strongest="Literal.", counter="None.", narrower="n/a", settle="none",
 attacks=["Both call sites read."], remediation="none",
)

A["C1152"] = dict(
 status="ESTABLISHED", strength="does (plain factual)",
 wording="`local-detached.ts` requires `claude:invoke`",
 overclaims=False,
 rationale="local-detached.ts:430 throws when backend === 'claude' and grants lacks claude:invoke.",
 evidence=["LD_430", "LD_531"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Premise of C1154, C1157.", missing=None,
 strongest="Literal.", counter="None.", narrower="n/a", settle="none",
 attacks=["Verified validateRequest is the first statement of launchDetachedWorkflow."], remediation="none",
)

A["C1153"] = dict(
 status="ESTABLISHED", strength="does (plain factual; scope: tools configured on the request or its roles)",
 wording="and exact `claude:tool:...` grants",
 overclaims=False,
 rationale="local-detached.ts:442 throws unless every configured Claude tool (request.claude.tools plus role tools) has an exact claude:tool:<name> grant.",
 evidence=["LD_442"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Premise of C1154.", missing=None,
 strongest="Literal.", counter="With an empty tools list the loop is vacuous; the claude:invoke check (430) still refuses the registered request.", narrower="n/a", settle="none",
 attacks=["Read 431-442."], remediation="none",
)

A["C1154"] = dict(
 status="ESTABLISHED", strength="cannot (valid static derivation from established premises; not executed)",
 wording="**P1 PI-AUTH — Detached grant contradiction.**",
 overclaims=False,
 rationale="Premises C1151-C1153 established; implicit premise 'no intermediate layer injects grants' verified (native-modules.ts getter returns the local-detached export; validateRequest runs first). The derivation is valid; the conclusion is pin-scoped and static.",
 evidence=["D01_26a", "IDX_2627", "LD_430", "LD_531", "NM_89"],
 defeaters=["undercutting (execution): no test drives the registered path end to end (prior C0209 SUPPORTED); the refusal is derived, not witnessed at runtime"],
 rivals=[], faithful=True,
 propagation="Grounds C1158; prior C0204/C0205/C0343/C0441 restated.", missing="A runtime witness of the registered path refusing (or an end-to-end test) - owed by wb-wupg.",
 strongest="Static contradiction with the call order explicit.", counter="None credible.",
 narrower="n/a", settle="Run the registered path with backend claude and record the validateRequest refusal.",
 attacks=["Checked for grant injection between index.ts and validateRequest - none.", "Checked settings path: sourceSettings supplies model/tools/roles only (2629), no grants."],
 remediation="none",
)

A["C1156"] = dict(
 status="NON-EPISTEMIC", strength="we propose (proposal)",
 wording="Audit both registered detached launch paths.",
 overclaims=False,
 rationale="Proposal. Presupposition C1155 (exactly two registered detached launch paths) verified: launchDetachedWorkflow is called at index.ts:2625 (workflow_execute detached) and 2880 (workflow_detached tool); no other src call site.",
 evidence=["D01_26b", "IDX_CALLS", "IDX_2881"],
 defeaters=["none"], rivals=[], faithful=None,
 propagation="Presupposition status: C1155 ESTABLISHED.", missing=None,
 strongest="Both paths pass grants:[] so both need the audit.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["grep launchDetachedWorkflow( in src/index.ts -> two call sites."], remediation="none",
)

A["C1157"] = dict(
 status="NON-EPISTEMIC", strength="must (requirement)",
 wording="Keep the validator",
 overclaims=False,
 rationale="Requirement restating prior C0344/C0442. Presupposition C1152 (validator exists) ESTABLISHED.",
 evidence=["D01_26b", "LD_430"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition status: C1152 ESTABLISHED.", missing=None,
 strongest="Security control retention.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["n/a"], remediation="none",
)

A["C1158"] = dict(
 status="NON-EPISTEMIC", strength="we propose (proposal)",
 wording="fix host-grant propagation and test the registered path",
 overclaims=False,
 rationale="Proposal restating prior C0206-C0209. Presuppositions: C1154 ESTABLISHED (defect exists); no end-to-end test at the pin (prior C0209 SUPPORTED, not re-run here).",
 evidence=["D01_26b"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition statuses: C1154 ESTABLISHED; C0209 (prior) SUPPORTED.", missing=None,
 strongest="Standard repair + test.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["n/a"], remediation="none",
)

A["C1160"] = dict(
 status="ESTABLISHED", strength="does (plain factual)",
 wording="`claude-host.ts` awaits `beforeDispatch` before registering the controller",
 overclaims=False,
 rationale="await config.beforeDispatch at 207; controller created and registered at 216-220.",
 evidence=["CH_207", "CH_216_220"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Premise of C1162.", missing=None,
 strongest="Literal ordering.", counter="None.", narrower="n/a", settle="none",
 attacks=["Lines verified."], remediation="none",
)

A["C1162"] = dict(
 status="SUPPORTED", strength="can / may (hypothesis wording; mechanism code-witnessed, outcome not reproduced - 'not run')",
 wording="`abortAgent(agentId)` can miss a pending per-agent skip/retry",
 overclaims=False,
 rationale="Code path (not run): runtime.ts sets live.started = true before awaiting host.spawnAgent (1215-1223); skip/retry then call host.abortAgent (879, 886-887); abortAgent aborts only a registered controller and queues only when a session exists (341-344); on a first spawn during the beforeDispatch await neither exists, so the call is a no-op; after the await the host re-checks only the run-wide signal (215) and registers the controller (220), then queries. The structural window is therefore entailed by code; whether a skip can land inside it at runtime, and whether the SDK query then fires, is unreproduced. No test parks beforeDispatch with a per-agent abort (F10 parks it for the run-wide signal only).",
 evidence=["D01_28", "CH_207", "CH_215", "CH_216_220", "CH_341", "RT_879", "RT_886", "RT_1215", "TEST_F10", "TEST_F10_548"],
 defeaters=["undercutting: no runtime reproduction; a timing argument (beforeDispatch usually resolves in microseconds) could make the window practically unreachable - unmeasured", "rebutting candidate checked: pendingLookupAborts handles the resume path only (sessions.has true), not a first spawn"],
 rivals=["the window exists but the SDK query might still be cancelled by a later abortAgent once the controller is registered - the artifact's phrase 'late per-agent query' allows for that: the query would start, which is the defect"],
 faithful=True,
 propagation="Grounds C1114 (second half), C1163 (definition), C1164 (norm).",
 missing="Parked-beforeDispatch + abortAgent(agentId) reproduction with SDK call count (wb-9v02); the F10 harness already provides the parking apparatus.",
 strongest="Every link of the mechanism is literal code; the Nov-4 ledger (C0213 SUPPORTED, C0353 PLAUSIBLE) read it the same way.",
 counter="A code-reading race is a prediction; until the parked test exists, 'can miss' is the ceiling and 'misses' would be an overclaim. The artifact says exactly this.",
 narrower="During a first spawn's beforeDispatch await, abortAgent(agentId) has no target and the post-await check reads only the run-wide signal (code reading).",
 settle="The F10-style test with a per-agent abort instead of run.abort(), asserting sdk.calls length 0.",
 attacks=["Traced started flag ordering (1215 before 1223) so skip's `if (live.started)` guard passes during the await.", "Checked whether skip() of an unstarted agent (live.wake) covers this: it does not, because started is already true.", "Checked F10: parks beforeDispatch, aborts the RUN signal, asserts zero queries - confirms apparatus exists and the per-agent variant is absent."],
 remediation="none (artifact wording is calibrated); add the per-agent F10 variant in wb-9v02.",
)

A["C1164"] = dict(
 status="NON-EPISTEMIC", strength="may not (requirement)",
 wording="requiring a parked barrier and query-count reproduction; do not declare it witnessed or repaired without that experiment",
 overclaims=False,
 rationale="Requirement restating prior C0215/C0216/C0352. Presupposition: the experiment does not yet exist for the per-agent case (verified: F10 is run-wide only).",
 evidence=["D01_28", "TEST_F10"],
 defeaters=["none"], rivals=["the parked-barrier apparatus exists (F10); only the per-agent variant is missing - the requirement remains unmet, but the cost is small"], faithful=True,
 propagation="Presupposition statuses: C1162 SUPPORTED; absence of the per-agent parked test ESTABLISHED at the pin.", missing=None,
 strongest="Standard reproduce-before-fix rule.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["grep abortAgent in the cancel-faults test: all calls occur after sdkInit/sessions exist, none during a parked beforeDispatch."], remediation="none",
)

A["C1171"] = dict(
 status="ESTABLISHED", strength="does not (absence by complete enumeration of the single replayBasis literal)",
 wording="but not measured Git base commit/tree",
 overclaims=False,
 rationale="claude-host.ts:166-175 is the only replayBasis producer in src/ for the Claude host (grep replayBasis: producer at 166; local-detached.ts:681 builds its own digest that wraps commonHost.replayBasis and adds contract/backend/workspace/principal/grants/manifest/localProvider - still no Git commit/tree). No member is a commit or tree id.",
 evidence=["D01_30", "CH_166", "LD_681"],
 defeaters=["temporal: unlanded wb-413a 'bind Claude agent replay to measured source, instruction and provider readings' changes this; not at the pin"],
 rivals=["the journal also matches each entry's own call payload (prompt), which can carry source text incidentally - that is not a measured base identity"],
 faithful=True,
 propagation="Premise of C1175, C1176.", missing=None,
 strongest="Complete enumeration of a 10-line literal.", counter="None at the pin.",
 narrower="n/a", settle="none",
 attacks=["grep -n -i 'commit|tree|skill|version' claude-host.ts -> no basis member.", "Checked the detached host's basis for a Git identity - none."],
 remediation="none",
)

A["C1172"] = dict(
 status="ESTABLISHED", strength="does not (absence by enumeration)",
 wording="skill/instruction bytes",
 overclaims=False,
 rationale="replayBasis holds `settings` (setting-source names) and `tools`, never instruction or skill file contents (prior C0220 same finding).",
 evidence=["CH_166"],
 defeaters=["temporal: wb-413a (unlanded) adds instruction readings"], rivals=[], faithful=True,
 propagation="Premise of C1176.", missing=None,
 strongest="Enumeration.", counter="None.", narrower="n/a", settle="none",
 attacks=["Enumerated the literal."], remediation="none",
)

A["C1173"] = dict(
 status="ESTABLISHED", strength="does not (absence by enumeration; scope: the Claude host's basis)",
 wording="provider versions",
 overclaims=False,
 rationale="No provider/SDK version member in the Claude host literal. Note: the WorkflowHost.replayBasis doc comment (runtime.ts:258-261) lists 'provider manifest' as an intended member, and the detached host's digest does bind `manifest` and localProvider {version, digest} (local-detached.ts:681-684) - so the absence is specific to the Claude host's key, which is what 'Pi's replay key' denotes in the PI-REPLAY paragraph.",
 evidence=["CH_166", "RT_258", "LD_681"],
 defeaters=["scope: the detached host's basis binds a provider manifest/version; 'Pi's replay key' must be read as the Claude host's", "temporal: wb-413a (unlanded) adds provider readings"],
 rivals=["the runtime.ts interface comment overstates what the Claude host records; the claim is correct against code"],
 faithful=True,
 propagation="Premise of C1176.", missing=None,
 strongest="Enumeration.", counter="The detached host does bind a manifest; the claim is about the Claude host.", narrower="The Claude SDK host's replayBasis carries no provider version.", settle="none",
 attacks=["Compared the two bases.", "Read the interface doc comment."], remediation="Qualify 'Pi's replay key' as the Claude host's where restated.",
)

A["C1174"] = dict(
 status="ESTABLISHED", strength="does not (literal absence; effect gating happens elsewhere)",
 wording="or effect references",
 overclaims=False,
 rationale="No effect reference in the literal. The runtime gates node replay by effect class via describeNodeEffect separately, so effects are governed, just not as members of the key; the claim as worded ('not ... in the key') is literally true.",
 evidence=["CH_166"],
 defeaters=["scope: effect-class gating exists outside the key (runtime describeNodeEffect; local-detached.ts:678)"], rivals=[], faithful=None,
 propagation="Premise of C1176.", missing=None,
 strongest="Enumeration.", counter="Effects are handled by a different mechanism; a reader could infer 'effects unguarded' - not what the claim says.", narrower="n/a", settle="none",
 attacks=["Enumerated; noted describeNodeEffect."], remediation="none",
)

A["C1175"] = dict(
 status="ESTABLISHED", strength="is (the pinned source declares its own scope; 'useful' is an evaluative gloss)",
 wording="Mechanical's newest prompt/config and Forge-manifest hashes are useful **app-local** foundations, not a complete joint replay basis",
 overclaims=False,
 rationale="97e18068 adds replay {promptSha256, configuration} (claude-implement.ts:102-104) and gateManifestSha256 (live-development.ts:29-32); both carry source comments 'App-local replay identity only: not a cross-host replay authority'. No Pi code reads them (grep mechanical in Pi src -> no consumer). 'Not a complete joint basis' is entailed: a joint basis needs a Pi-side counterpart and Pi's basis lacks source identity (C1171).",
 evidence=["D01_30b", "MW_REPLAY_9", "MW_REPLAY_102", "MW_GATE_29", "MW_97E_STAT", "CH_166"],
 defeaters=["provenance: the 'app-local' characterization restates the source's self-description (same lineage as the MW companion) - but the code comment is a producer artifact at the pin, which suffices"],
 rivals=[], faithful=None,
 propagation="Depends on C1213 (non-material, ESTABLISHED) and C1171.", missing=None,
 strongest="Source self-description plus absence of any joining consumer.", counter="'Useful' is opinion; stripped, the factual core stands.",
 narrower="At mw@97e18068 the rig records prompt/config and forge.toml digests labelled app-local; nothing at either pin joins them to a Pi identity.",
 settle="none",
 attacks=["git log -S gateManifestSha256 -> 97e18068 only (lens); read both comments at the pin."], remediation="none",
)

A["C1176"] = dict(
 status="SUPPORTED", strength="evidence indicates (gap established; 'incomplete for Pi-hosted Mechanical functions' is prospective - no such function is hosted at the pin)",
 wording="**P1 PI-REPLAY — Incomplete source identity.**",
 overclaims=False,
 rationale="C1171-C1174 establish what the key omits. 'Incomplete' presupposes a target (a replay basis that distinguishes source/instruction/provider changes), which is the program's design requirement, and the subject (Pi-hosted Mechanical functions) does not exist at the pin. Prior C0224 (SUPPORTED) gives the consequence: on the resume path an agent answer is reused when prompt/journal key/replayBasis match, none of which measures the source tree.",
 evidence=["D01_30", "CH_166", "P:C0224"],
 defeaters=["scope: prospective subject; temporal: wb-413a (unlanded) addresses exactly this"],
 rivals=["for script workflows today the omission may be intended (per-run identity excluded by design per the 160-165 comment); the claim is about function hosting, where source identity would matter"],
 faithful=True,
 propagation="Inherits from C1171-C1174 (ESTABLISHED) with a normative premise; feeds doc 04's replay cut (B-replay wb-413a).", missing="None for the gap; a joint Pi/MW replay-basis specification would make 'complete' testable.",
 strongest="The omissions are established and the consequence (reuse under changed source) is code-read.", counter="'Incomplete' relative to what? The program defines the target; evidence cannot establish a requirement.",
 narrower="The Claude host's replay basis would not distinguish a Pi-hosted function replay across source, instruction or provider changes.",
 settle="A specification of the joint basis plus a test that a changed source tree declines replay.",
 attacks=["Checked whether the journal key compensates (prompt, label, model, agentType, effort, isolation, gate, resume, schema per C0224) - no source measure."], remediation="State the target explicitly where 'incomplete' is used.",
)
