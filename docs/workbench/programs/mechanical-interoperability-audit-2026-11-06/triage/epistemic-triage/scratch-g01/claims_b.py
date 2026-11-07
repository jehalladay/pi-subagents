# Material claim verdicts, part B (result lifecycle, MW host, descriptor correction, MW cancel, HX/RF, release/perf, what-can-be-claimed).

B = {}

B["C1181"] = dict(
 status="ESTABLISHED", strength="has no (at the pin, tracked src tree; detection model stated)",
 wording="has no Mechanical domain-state projection",
 overclaims=False,
 rationale="grep for the four outcome tokens over src/ -> 0 hits (hits only in test census files); grep -rli mechanical src/ -> collective-event.ts (observation events for collective.event.v1 envelopes, not develop() outcomes) and a prose word. Scope per C1104.",
 evidence=["D01_32", "GREP_OUTCOME", "GREP_MECH", "CE_16"],
 defeaters=["semantic: collective-event.ts does project Mechanical collective events into the observation projection; it is not a domain-state (outcome) projection, which is what the claim denotes", "scope: unlanded branches excluded"],
 rivals=[], faithful=True,
 propagation="Grounds C1184's presupposition that no projection exists to confuse variants.", missing=None,
 strongest="Lexical detector on the exact outcome vocabulary returns nothing in src.", counter="A projection could use other names - the hosts listing and kind refusal (C1144) make any outcome projection pointless at the pin; accepted.",
 narrower="No src module at the pin reads or projects Mechanical develop() outcome variants.", settle="none",
 attacks=["Ran the token grep and the mechanical grep."], remediation="none",
)

B["C1182"] = dict(
 status="ESTABLISHED", strength="has no (at the pin, tracked src tree)",
 wording="or native-source/journal adapter",
 overclaims=False,
 rationale="No src module names Mechanical other than collective-event.ts (observation-only) and tool-description.ts (prose); src/workflow/*.ts has no Mechanical reference; package.json has no @mechanical dependency.",
 evidence=["D01_32", "GREP_MECH", "PKG_MECH"],
 defeaters=["scope: unlanded wb-s8rm adds a source-admission test (not an adapter); wb-ocie adds a descriptor module - neither is a journal adapter"],
 rivals=[], faithful=True,
 propagation="none further", missing=None,
 strongest="Lexical absence plus dependency absence.", counter="None.", narrower="n/a", settle="none",
 attacks=["grep over src/workflow for mechanical -> prose only."], remediation="none",
)

B["C1184"] = dict(
 status="NON-EPISTEMIC", strength="must (requirement)",
 wording="must remain distinct from a resolved Promise, transport result, native Forge verdict and Furnace Attempt status",
 overclaims=False,
 rationale="Requirement restating prior C0237/C0417/C03112. Presupposition C1183 (four variants) verified at contracts.ts:54-58: exactly verified_candidate, verification_failed, needs_evidence, indeterminate.",
 evidence=["D01_32", "MW_CONTRACTS_54"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition status: C1183 ESTABLISHED.", missing=None,
 strongest="Type-level fact + design rule.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["Counted union members at the pin: four."], remediation="none",
)

B["C1193"] = dict(
 status="ESTABLISHED", strength="has no (manifest-level absence; stronger than worded: no main either, so no resolvable bare import)",
 wording="and no stable explicit host API export for Pi",
 overclaims=False,
 rationale="apps/development-rig/package.json at the pin has keys name, version, private, description, type, engines, bin, files, scripts, dependencies, license - no exports, main, module or types. Only the library (@mechanical/workflows-development) declares main/types/exports. 'For Pi' is framing: the absence is for every consumer. Deep dist/ imports remain physically possible because no exports map restricts them - the claim is about declared exports, not reachability.",
 evidence=["D01_34", "MW_PKG_10", "MW_PKG_KEYS", "MW_LIBPKG_10"],
 defeaters=["none; MW tip drift touches README only, not the manifest"],
 rivals=["'not importable' would be an overreading; deep paths resolve"], faithful=True,
 propagation="Premise of C1196, C1197; prior C0315 (SUPPORTED) upgraded to ESTABLISHED here by direct manifest reading (evidence delta: full key inventory at the pin).", missing=None,
 strongest="Whole-manifest read.", counter="None.", narrower="n/a", settle="none",
 attacks=["Enumerated every top-level key.", "Compared with the library manifest."], remediation="Drop 'for Pi' or say 'for any consumer'.",
)

B["C1196"] = dict(
 status="NON-EPISTEMIC", strength="we propose (proposal)",
 wording="Pi needs a real independent installed consumer plus write authority.",
 overclaims=False,
 rationale="Proposal restating prior C0391/C0450. Presuppositions: C1193 ESTABLISHED; no Mechanical write-action grant literal exists at either pin (grep mechanical in Pi src -> no grant string; NATIVE_GRANTS lists forge/hyperunix/reactivefiber/furnace only).",
 evidence=["D01_34c", "LD_409", "GREP_MECH"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition statuses: C1193 ESTABLISHED; absence of a Mechanical write grant ESTABLISHED at the pin.", missing=None,
 strongest="Follows from the manifest and grant inventories.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["Checked NATIVE_GRANTS roster."], remediation="none",
)

B["C1197"] = dict(
 status="SUPPORTED", strength="evidence indicates ('incomplete' is relative to the program's consumer requirement; the manifest facts are established)",
 wording="**P1 MW-HOST — Incomplete packaged consumer.**",
 overclaims=False,
 rationale="Derived from C1192 (bin declared) and C1193 (no exports/main). 'Incomplete' presupposes that a programmatic host API is required for Pi - a normative premise from doc 03. The factual core (no declared entry point) is established; the evaluation inherits proposal force.",
 evidence=["D01_34b", "MW_PKG_10", "MW_PKG_KEYS"],
 defeaters=["semantic: 'consumer' here means the rig package as something Pi could consume; the rig is itself a consumer of the library - the heading's vocabulary is loose"],
 rivals=["MW could intend the CLI as the only supported surface; then 'incomplete' is a Pi-side requirement, not an MW defect"], faithful=None,
 propagation="Feeds wb-zswl/wb-669r sequencing in doc 04.", missing="A jointly adopted statement of what the packaged host surface must export (B-contract-choice).",
 strongest="No main, no exports: a bare import has no entry.", counter="Normative target not fixed by evidence.",
 narrower="The rig package declares only a CLI bin; it exposes no declared programmatic entry a consumer could import by package name.", settle="The B-contract-choice ruling.",
 attacks=["Manifest enumerated."], remediation="State the target surface where 'incomplete' is used.",
)

B["C1200"] = dict(
 status="ESTABLISHED", strength="did / repaired (plain factual: commit content and ancestry verified)",
 wording="Mechanical commit `1f29daa7` repaired schema refs in `contracts/entrypoints/development.v1.json`",
 overclaims=False,
 rationale="git show 1f29daa7 rewrites inputSchema/outputSchema from ../schemas/<name> to bare <name>; 1f29daa7 (2026-11-05) is an ancestor of the MW pin 97e18068; at the pin development.v1.json:8-9 equals the host's exact-equality strings (entrypoint-host.ts:89). 'Repaired' is warranted because the host predicate required bare names both before and after (0c78e253 host line 89 identical).",
 evidence=["D01_36", "MW_1F29_DIFF", "MW_1F29_STAT", "MW_ANC", "MW_LOG", "MW_DESC_8", "MW_HOST_89", "MW_OLD_HOST", "MW_TIP"],
 defeaters=["none; tip drift is docs-only"], rivals=[], faithful=True,
 propagation="Grounds C1201-C1205; prior C0189/C0190/C0305/C0336/C0437/C0530 (all REFUTED at the Nov-4 env pin with the same temporal split) restated.", missing=None,
 strongest="Commit diff + ancestry + pinned file + host predicate all agree.", counter="None.",
 narrower="n/a", settle="none",
 attacks=["Ran merge-base --is-ancestor; read the diff; compared the pinned JSON to the host constants byte for byte."], remediation="none",
)

B["C1201"] = dict(
 status="ESTABLISHED", strength="introduced (commit content; test pass not run)",
 wording="introduced tests reading the committed file with a packed tarball",
 overclaims=False,
 rationale="1f29daa7 adds apps/development-rig/test/entrypoint-descriptor-file.test.ts (82 lines) which reads contracts/entrypoints/development.v1.json via import.meta.url and runs `npm pack` on packages/development at test time, and switches entrypoint-host.test.ts and installed-host.test.ts (2 lines each) to the committed file. Whether the tests pass was not run.",
 evidence=["MW_1F29_STAT", "MW_DESC_TEST_15", "MW_DESC_TEST_29"],
 defeaters=["undercutting (not run): committed test code is not a witnessed pass (doc 01 line 3 says so itself)"],
 rivals=[], faithful=True,
 propagation="Grounds C1205.", missing=None,
 strongest="Verbatim test source and commit stat.", counter="None.", narrower="n/a", settle="A recorded run of the rig test suite at the pin (not run here).",
 attacks=["Read the test header; confirmed the pack call and file read."], remediation="none",
)

B["C1202"] = dict(
 status="ESTABLISHED", strength="were true at (historical, scoped to MW 0c78e253, the Nov-4 program's stated MW baseline)",
 wording="Old present-tense November 4 mismatch claims were true at an earlier baseline",
 overclaims=False,
 rationale="At 0c78e253 (the Nov-4 README's MW baseline) development.v1.json carried ../schemas/ refs while entrypoint-host.ts:89 already required bare names - so the Nov-4 claims (C0189/C0190/C0194/C0195) were true when written. The Nov-4 triage itself graded them REFUTED at its env pin f7c0a943 with the same temporal split; this row restates that split faithfully.",
 evidence=["D01_36b", "MW_OLD_DESC", "MW_OLD_HOST", "NOV4_README_4", "P:C0189", "P:C0194"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Supports C1204.", missing=None,
 strongest="Code at the historical revision, not only the prior ledger, witnesses it.", counter="None.",
 narrower="n/a", settle="none",
 attacks=["git show 0c78e253 for both files."], remediation="none",
)

B["C1203"] = dict(
 status="ESTABLISHED", strength="is false at (plain factual at mw@97e18068 and mw-tip)",
 wording="but false at these pins",
 overclaims=False,
 rationale="At 97e18068 the descriptor strings equal the host constants; tip drift is docs-only so the same holds at 6e15a424.",
 evidence=["MW_DESC_8", "MW_HOST_89", "MW_TIP"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Grounds C1204.", missing=None,
 strongest="Byte comparison.", counter="None.", narrower="n/a", settle="none",
 attacks=["Compared strings; checked tip drift file list."], remediation="none",
)

B["C1204"] = dict(
 status="NON-EPISTEMIC", strength="the program rates (priority/status ruling); the 'P0' attribution needs a source qualifier",
 wording="**CORRECTED, not open P0 — Descriptor drift.**",
 overclaims=True,
 rationale="Status ruling. Presuppositions C1200/C1203 ESTABLISHED, so 'CORRECTED' is well-founded. Faithfulness defect: the superseded Pi ledger row C0199 graded the conflict P1, and the Nov-4 Pi program heading reads 'P1: checked-in Mechanical descriptor conflicts with its own loader'; the 'P0' label exists only in the MW Nov-4 companion ('MW-P0 — Committed descriptor cannot pass its implemented host predicate'). 'Not open P0' therefore mis-names the Pi lineage's prior priority. The claims-file proposition adds '(or P1)', which the artifact does not say.",
 evidence=["D01_36", "NOV4_01_29", "P:C0199", "MW_NOV4_P0", "MW_DESC_8", "MW_HOST_89"],
 defeaters=["provenance/semantic: 'P0' is the MW companion's label, not the Pi ledger's (P1)"],
 rivals=["reading 'not open P0' as a present-status statement ('this is not an open P0 item') is true but then says nothing about the prior grade; the heading's rhetorical contrast implies a prior P0 that the Pi lineage never assigned"],
 faithful=False,
 propagation="Presupposition statuses: C1200 ESTABLISHED, C1203 ESTABLISHED. Priority attribution: unfaithful to C0199.", missing=None,
 strongest="The item is corrected; no priority applies to a closed item.", counter="The heading attributes a P0 that the superseded Pi row never carried.",
 narrower="Descriptor drift is CORRECTED at the pins; the Nov-4 Pi program rated it P1 (C0199) and the Nov-4 MW program MW-P0; neither is open.", settle="n/a (wording repair).",
 attacks=["Searched both Nov-4 programs for the P0 label: Pi -> P1; MW -> MW-P0."], remediation="Reword to 'CORRECTED (was Pi P1 / MW-P0)'.",
)

B["C1205"] = dict(
 status="NON-EPISTEMIC", strength="must (requirement)",
 wording="New code must protect the repair rather than implement it again.",
 overclaims=False,
 rationale="Requirement redirecting prior C0197/C0337/C0438 ('fix and test the descriptor') to 'guard the landed repair'. Presuppositions C1200, C1201 ESTABLISHED. Faithful as an update: the prior proposals' target was reached by 1f29daa7, so the surviving duty is regression protection.",
 evidence=["D01_36b", "MW_1F29_STAT", "MW_DESC_TEST_15"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Presupposition statuses: C1200 ESTABLISHED, C1201 ESTABLISHED (test pass not run).", missing=None,
 strongest="Guard-the-fix is the correct successor of fix-it.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["n/a"], remediation="none",
)

B["C1210"] = dict(
 status="ESTABLISHED", strength="added (commit content; component = the rig's AgentOptions/LiveDevelopmentOptions, not the library's develop())",
 wording="Mechanical commit `f7c0a943` added `signal?: AbortSignal`",
 overclaims=False,
 rationale="f7c0a943 (2026-11-05, ancestor of the pin) touched only apps/development-rig/{src,test} and docs/06; it added AgentOptions.signal (inherited by LiveDevelopmentOptions, live-development.ts:34). packages/development/src has zero signal/AbortSignal references at the pin. The artifact wording is correct; the claims-file proposition 'develop/developLive options' overreaches the component for develop() - the library function has no signal.",
 evidence=["D01_38", "MW_F7C0_STAT", "MW_SIG_37", "MW_LIVE_34", "MW_LIB_NOSIG", "MW_ANC"],
 defeaters=["scope (extraction, not artifact): 'develop' in the ledger proposition is wrong; developLive/runClaudeImplementation is right"],
 rivals=[], faithful=True,
 propagation="Premise of C1211, C1212, C1218.", missing=None,
 strongest="Commit stat and the option's own doc comment.", counter="None for the artifact wording.",
 narrower="f7c0a943 added an optional host AbortSignal to the development-rig's AgentOptions (and thus developLive's options).", settle="none",
 attacks=["git show --stat f7c0a943; grep the library for AbortSignal -> 0."], remediation="Fix the ledger proposition to drop 'develop'.",
)

B["C1211"] = dict(
 status="ESTABLISHED", strength="is honoured only at (plain factual by enumeration of the signal's readers)",
 wording="honored at pre-dispatch barriers only",
 overclaims=False,
 rationale="options.signal is read only by assertNotCancelledBeforeDispatch (46-47), called at claude-implement.ts:84, live-development.ts:65 and 119 - three pre-dispatch barriers; the option's doc comment says so.",
 evidence=["MW_SIG_37", "MW_SIG_46", "MW_SIG_84", "MW_LIVE_65"],
 defeaters=["none; tip drift docs-only"], rivals=[], faithful=None,
 propagation="Premise of C1218.", missing=None,
 strongest="Complete reader enumeration (grep signal|abort over the two files).", counter="None.", narrower="n/a", settle="none",
 attacks=["grep -rn 'signal|abort' over apps/development-rig/src -> barrier uses only."], remediation="none",
)

B["C1212"] = dict(
 status="ESTABLISHED", strength="is not passed (absence by enumeration of the agentQuery options literal)",
 wording="and not passed into the running SDK",
 overclaims=False,
 rationale="The options object handed to agentQuery (claude-implement.ts:91-100, used at 114) has members cwd, allowedTools, permissionMode, settingSources, maxTurns, maxBudgetUsd, model - no signal or abortController; grep abortController|AbortController over apps/development-rig/src -> 0. The doc comment states 'It is not forwarded to the SDK'.",
 evidence=["MW_QUERY_91", "MW_SIG_37"],
 defeaters=["blind spot: an SDK option under another name could carry a controller; none appears in the literal"], rivals=[], faithful=None,
 propagation="Premise of C1214, C1218.", missing=None,
 strongest="Literal + self-description.", counter="None.", narrower="n/a", settle="none",
 attacks=["Enumerated the config literal."], remediation="none",
)

B["C1214"] = dict(
 status="SUPPORTED", strength="evidence indicates (scope: host-initiated cancel of the running Claude SDK implement session; a Forge-gate cancel is READ by the host, which is a different sense)",
 wording="Mid-session cancel ... remain to implement",
 overclaims=True,
 rationale="For the Claude implement session the signal is not forwarded (C1212), so mid-session cancel of the agent is not implemented. But MW docs/10:141 records (2026-10-15) that a mid-gate cancel through the public Forge SDK is accepted and read by the host as FORGE_OPERATION_CANCELLED. 'Mid-session cancel' unqualified therefore overstates: the Forge-gate leg already observes an operation cancel; the Claude-session leg does not initiate or handle one.",
 evidence=["D01_38b", "MW_QUERY_91", "MW_SIG_37", "MW_DOCS10_141"],
 defeaters=["semantic/scope: Forge operation cancel is handled (read) at the gate leg; the absence is of host-initiated cancel of the running agent session"],
 rivals=["'cancel' as a host-owned protocol (initiate + recover) vs 'cancel' as observing a producer's cancelled operation - the artifact means the former"], faithful=None,
 propagation="Premise of C1218 (partial cancel) - which survives on either reading.", missing=None,
 strongest="No forwarding of the signal into the SDK session is literal.", counter="docs/10:141.",
 narrower="At mw@97e18068 no host-initiated cancellation reaches a running Claude SDK implement session; the Forge-gate leg reads a producer-side cancel as FORGE_OPERATION_CANCELLED.", settle="none (wording).",
 attacks=["Searched docs/10 for cancel - found the 2026-10-15 record."], remediation="Qualify 'mid-session cancel' as 'of the running Claude SDK session'.",
)

B["C1215"] = dict(
 status="SUPPORTED", strength="evidence indicates (absence under a lexical detector; the artifact gives no detection model)",
 wording="dirty-write reconciliation ... remain to implement",
 overclaims=False,
 rationale="grep -i reconcil over apps/development-rig/src finds Beads claim read-reconciliation and a Furnace disclaimer only; dirty worktrees are EXCLUDED by candidate-selection.ts:141 (git status --porcelain non-empty -> excluded) and cleanGitBasis refuses a dirty basis - i.e. refusal, not reconciliation. The MW tip companion (same lineage) says 'Interrupted writes are not rolled back.' No detection model is stated in doc 01, so the warrant is this investigator's grep, not the artifact's.",
 evidence=["D01_38b", "MW_GREP_RECON", "MW_CLEAN_141"],
 defeaters=["undercutting: lexical detector; a reconciliation under another name is possible (blind spot)"], rivals=["refusing dirty state is a defensible design; 'remain to implement' presumes reconciliation is wanted (program choice)"], faithful=None,
 propagation="none further", missing="A statement from MW of what 'dirty-write reconciliation' must do, so absence can be tested rather than grepped.",
 strongest="Current code refuses rather than reconciles.", counter="Absence of a word is not absence of a mechanism.",
 narrower="At mw@97e18068 the rig refuses dirty workspaces (cleanGitBasis, candidate exclusion) and has no code path that reconciles interrupted writes.", settle="The specification above plus a grep/test against it.",
 attacks=["Ran the grep; read candidate-selection.ts:141 and cleanGitBasis callers."], remediation="Add the detection model to the artifact sentence.",
)

B["C1216"] = dict(
 status="SUPPORTED", strength="evidence indicates (source self-declares app-local scope; no joining code at either pin)",
 wording="cross-host replay ... remain to implement",
 overclaims=False,
 rationale="The only replay identities in the rig are declared 'App-local replay identity only: not a cross-host replay authority' (claude-implement.ts:9; live-development.ts:30); packages/coordination has replay.ts/decision-replay.ts for coordination decisions, not for host sessions; nothing in Pi reads MW identities (C1175).",
 evidence=["D01_38b", "MW_REPLAY_9", "MW_GATE_29", "GREP_MECH"],
 defeaters=["semantic: packages/coordination exports replay functions (decision replay) - a different sense of 'replay'"], rivals=[], faithful=None,
 propagation="none further", missing=None,
 strongest="Producer self-description at the pin.", counter="Coordination 'replay' exists; it is not cross-host session replay.",
 narrower="No cross-host (Pi<->MW) replay identity or protocol exists at either pin; MW's identities are self-declared app-local.", settle="none",
 attacks=["grep -rln replay over rig and packages -> coordination decision replay only."], remediation="none",
)

B["C1217"] = dict(
 status="SUPPORTED", strength="evidence indicates (scope: host-level guarantee for develop() effects; one effect type already carries an idempotency fingerprint)",
 wording="no-duplicate effects remain to implement",
 overclaims=True,
 rationale="No host-level no-duplicate guarantee for develop() effects exists (no 'exactly once'/'at most once' code; the detached Pi host's effect gating is Pi-side). But git-source-publication.ts carries an idempotencyKey with an IDEMPOTENCY_FINGERPRINT_INVALID refusal (43, 74-75), and rf-workload.ts recognises RF_IDEMPOTENCY_KEY_CONFLICT - so 'no-duplicate effects' is not wholly absent in the repo; it is absent as a general host guarantee.",
 evidence=["D01_38b", "MW_IDEMP_43"],
 defeaters=["scope: idempotency exists for the Git-source publication candidate; the blanket wording ignores it"], rivals=[], faithful=None,
 propagation="none further", missing="A definition of the effect classes the guarantee must cover (doc 03 effects cut, wb-mwsy).",
 strongest="No general effect-dedup layer.", counter="git-source-publication.ts idempotency key.",
 narrower="At mw@97e18068 there is no general no-duplicate guarantee for develop() effects; an idempotency fingerprint exists for Git-source publication only.", settle="The effect-class definition.",
 attacks=["grep idempot|duplicate|once over rig and packages."], remediation="Qualify as 'no general no-duplicate guarantee'.",
)

B["C1218"] = dict(
 status="ESTABLISHED", strength="is partial (plain factual: a cancel option exists and is pre-dispatch only)",
 wording="**P1 MW-CANCEL — Partial cancel.**",
 overclaims=False,
 rationale="Entailed by C1210-C1212: a signal exists, is honoured at three barriers, is not forwarded. 'Partial' is the exact word. Prior C0229 split (presence refuted, mid-run generality supported) is restated faithfully. The P1 label is normative.",
 evidence=["D01_38", "MW_SIG_37", "MW_SIG_46", "MW_LIVE_65", "MW_QUERY_91", "P:C0229"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Feeds wb-9v02/wb-5a7k sequencing.", missing=None,
 strongest="Code and self-description agree.", counter="None.", narrower="n/a", settle="none",
 attacks=["Premises re-opened."], remediation="none",
)

B["C1220"] = dict(
 status="ESTABLISHED", strength="is recorded (a receipt exists and says X; producer evidence, not re-run)",
 wording="A fresh Pi 2026-11-06 native HX probe recorded",
 overclaims=False,
 rationale="docs/workbench/receipts/wb-f3wd.md (2026-11-06 receipt) and qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json (utc 2026-11-06T12:11:25Z) are committed at the pin; the probe measured hx 0.1.0 (binary SHA-256 recorded).",
 evidence=["F3WD_7", "F3WD_JSON", "F3WD_13"],
 defeaters=["none; not re-run here"], rivals=[], faithful=None,
 propagation="Grounds C1221-C1225, C1252.", missing=None,
 strongest="Two committed records with a timestamp and producer pin.", counter="None.", narrower="n/a", settle="none",
 attacks=["Read both records."], remediation="none",
)

B["C1221"] = dict(
 status="ESTABLISHED", strength="recorded (source report matches the receipt verbatim)",
 wording="incomplete normal filesystem coverage (exit 3)",
 overclaims=False,
 rationale="Receipt line 9: filesystem-live exit 3, coverage incomplete (HX-COVERAGE-INCOMPLETE); JSON observations[0].exitCode 3.",
 evidence=["F3WD_9", "F3WD_JSON"],
 defeaters=["none"], rivals=[], faithful=None,
 propagation="Supports C1224.", missing=None, strongest="Verbatim.", counter="None.", narrower="n/a", settle="none",
 attacks=["Compared doc 01:40 to receipt and JSON."], remediation="none",
)

B["C1222"] = dict(
 status="ESTABLISHED", strength="recorded",
 wording="best-effort exit 0 still incomplete",
 overclaims=False,
 rationale="Receipt line 10: exit 0, terminal complete, over the same incomplete coverage; 'An exit of 0 is not complete coverage.' JSON observations[1].exitCode 0 with HX-COVERAGE-INCOMPLETE.",
 evidence=["F3WD_10", "F3WD_JSON"],
 defeaters=["none"], rivals=[], faithful=None,
 propagation="Supports C1224.", missing=None, strongest="Verbatim.", counter="None.", narrower="n/a", settle="none",
 attacks=["Compared."], remediation="none",
)

B["C1223"] = dict(
 status="ESTABLISHED", strength="recorded",
 wording="GitView find failure `view-binding-pending` (exit 4)",
 overclaims=False,
 rationale="Receipt line 11: revision-pinned leg refused exit 4, HX-RUNTIME-INTERNAL-FAILURE, reason view-binding-pending; JSON observations[2].exitCode 4.",
 evidence=["F3WD_11", "F3WD_JSON"],
 defeaters=["none"], rivals=[], faithful=None,
 propagation="Supports C1224.", missing=None, strongest="Verbatim.", counter="None.", narrower="n/a", settle="none",
 attacks=["Compared."], remediation="none",
)

B["C1224"] = dict(
 status="ESTABLISHED", strength="is (the receipt's verdict token, scoped to hx 0.1.0 at the recorded binary and the find verb)",
 wording="its verdict is `task-scope-unsupported`",
 overclaims=False,
 rationale="Receipt line 12 and JSON verdict both read task-scope-unsupported. Supersedes C03114 (HYPOTHESIS, PLAUSIBLE: 'installed HX may not support live native task-scope evidence') with a producer measurement - a legitimate upgrade with an evidence delta (the probe), scoped to hx 0.1.0 / find; other verbs and builds are NOT CLAIMED by the receipt itself.",
 evidence=["F3WD_12", "F3WD_JSON", "F3WD_15", "P:C03114"],
 defeaters=["scope: one producer version, one verb; the receipt lists what is NOT CLAIMED"], rivals=[], faithful=True,
 propagation="Grounds C1231's HX half, C1252.", missing=None,
 strongest="Producer-recorded verdict.", counter="None.", narrower="n/a", settle="A later HX build would need a new probe.",
 attacks=["Checked the receipt's own scope limits."], remediation="none",
)

B["C1225"] = dict(
 status="ESTABLISHED", strength="states (the receipt names git-census not blocked)",
 wording="it explicitly **does not block Git-census**",
 overclaims=False,
 rationale="Receipt line 12: 'Git-census mode is named not blocked (claim C03113)'; JSON blocker.notBlocked[0] = git-census. Supersedes C03113 (NORMATIVE) by recording that the probe carried the carve-out as data.",
 evidence=["F3WD_12", "F3WD_JSON", "P:C03113"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Supports the Git-census-first sequencing in doc 04.", missing=None,
 strongest="Verbatim in two records.", counter="None.", narrower="n/a", settle="none",
 attacks=["Compared."], remediation="none",
)

B["C1226"] = dict(
 status="ESTABLISHED", strength="has no (Pi's own provider contract pins render_id null; not an RF producer run)",
 wording="Pi RF `--no-commit` preview has no committed render ID",
 overclaims=False,
 rationale="providers/reactivefiber.ts builds argv with --no-commit (115), declares the contract source 'context.render --no-commit' (17) and REFUSES any result whose render_id is not null (70); reactivefiber-observer.ts:355 refuses likewise. So by Pi's own contract the preview carries no render id. No RF producer output is in either pin, so the RF-side behaviour rests on Pi's reading of RFCLI docs (observer comment 256-257).",
 evidence=["D01_40b", "RF_17", "RF_70", "RF_115", "RFO_355", "RFO_256"],
 defeaters=["provenance: RF's own behaviour is attested only through Pi's source comment citing RFCLI docs at 6a251bf7; the Pi-side contract is the code witness"], rivals=[], faithful=True,
 propagation="Premise of C1231.", missing=None,
 strongest="Pi refuses a non-null render_id in two places.", counter="If RF changed to return a render_id for --no-commit, Pi would refuse the envelope - the claim about Pi's preview stays true either way.",
 narrower="n/a", settle="none",
 attacks=["grep no-commit/render_id across providers and observer."], remediation="none",
)

B["C1231"] = dict(
 status="ESTABLISHED", strength="are distinct (deductive from the two contracts); 'may not be conflated' is the normative consequence",
 wording="**P1 HX/RF — Evidence distinction.**",
 overclaims=False,
 rationale="Pi's preview requires render_id === null (C1226); MW's rf-context.ts requires a nonempty render_id, task/revision-grounded text, a sha256 digest, a graph revision and a verified model budget (82-89), throwing RF_CONTEXT_UNESTABLISHED otherwise. The two contracts are mutually exclusive by code, so the evidence classes are distinct. The HX half: the probe's task-scope-unsupported verdict vs Git census (C1224/C1225). The P1 label is normative.",
 evidence=["D01_40b", "RF_70", "MW_RF_82", "MW_RF_85", "F3WD_12"],
 defeaters=["none"], rivals=[], faithful=True,
 propagation="Feeds wb-669r/wb-pxvv sequencing.", missing=None,
 strongest="Mutually exclusive predicates in code.", counter="None.", narrower="n/a", settle="none",
 attacks=["Read both predicates at the pins."], remediation="none",
)

B["C1240"] = dict(
 status="ESTABLISHED", strength="do not (deductive: semaphores are constructed per executeWorkflow call)",
 wording="Per-workflow semaphores do not provide global bounds across workflows",
 overclaims=False,
 rationale="runtime.ts:737-738 constructs new Semaphore(...) and new Semaphore(16) inside the runtime factory, so each run owns its permits; nothing in execute-tool.ts/execute.ts caps invocations (byte caps only). Narrowing: Pi's agent-manager has a process-wide maxConcurrent pool for Pi-native agents (index.ts:1551-1552), which does not govern Claude-SDK workflow agents - the claim is about the semaphores and is exact.",
 evidence=["D01_42", "RT_737", "IDX_1551"],
 defeaters=["scope: a process-wide cap exists for a different agent population (agent-manager)"], rivals=[], faithful=True,
 propagation="Grounds C1249 (non-material).", missing=None,
 strongest="Construction site is per-run.", counter="agent-manager's pool - different population.", narrower="n/a", settle="none",
 attacks=["grep -i semaphore src -> runtime.ts only; grep cap|limit in execute-tool/execute -> byte caps."], remediation="none",
)

B["C1244"] = dict(
 status="SUPPORTED", strength="is stale at the pin (the W11 sentence is false at d7666a76); 'overlooked' as an authorial oversight is not supported - the sentence predates the file",
 wording="its broad mechanical grep sentence overlooked existing `collective-event.ts`",
 overclaims=True,
 rationale="feature-matrix.md:112 asserts 'no src/workbench module, no test file' and is false at the pin: src/workbench/collective-event.ts and test/workbench-collective-event.test.ts exist. But git blame dates line 112 to 10a67e73 (2026-10-15) and collective-event.ts arrived with f65860e1 (2026-10-28); the matrix was last edited 2026-10-27. So the sentence was true when written and became stale; 'overlooked existing' (authorial oversight of an existing file) is contradicted by the dates, while the claims-file's disjunctive premise ('or exists at the pin where the sentence is still present') holds. The prior ledger (C0163/C0182) already used the correct word: 'stale at the pin'. d7666a76 does not amend the matrix.",
 evidence=["D01_42", "FM_112", "FM_BLAME", "CE_ADDED", "FM_LASTLOG", "P:C0163", "P:C0161"],
 defeaters=["temporal (rebutting for the 'overlooked' reading): sentence 2026-10-15 < file 2026-10-28", "process: the reconciliation commit flags the staleness but leaves feature-matrix.md untouched (git diff 278c8f79..d7666a76 has no feature-matrix.md)"],
 rivals=["present-tense reading: 'the sentence (as still published) overlooks the file' - true at the pin"],
 faithful=True,
 propagation="Grounds C1245; supports C1129.", missing=None,
 strongest="At the pin the published sentence is false and the file exists.", counter="The author of 2026-10-15 could not overlook a file created 2026-10-28.",
 narrower="The W11 row's embedded grep sentence (written 2026-10-15) is stale at d7666a76: src/workbench/collective-event.ts (2026-10-28) and its test exist.", settle="n/a (wording).",
 attacks=["git blame -L112; git log --diff-filter=A on collective-event.ts; git log on feature-matrix.md."], remediation="Replace 'overlooked existing' with 'is stale: predates'.",
)

B["C1245"] = dict(
 status="NON-EPISTEMIC", strength="must avoid (norm)",
 wording="Avoid old blanket absence language",
 overclaims=False,
 rationale="Norm. Presupposition C1244 (a stale blanket absence sentence exists) SUPPORTED/true at the pin. Note the norm is unmet by the artifact commit itself for feature-matrix.md:112, which d7666a76 leaves in place.",
 evidence=["D01_42b", "FM_112", "PI_DRIFT"],
 defeaters=["none epistemic; the norm's own target file is not amended by the commit that states the norm"], rivals=[], faithful=None,
 propagation="Presupposition status: C1244 SUPPORTED.", missing=None,
 strongest="Good hygiene rule.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["Checked the diff file list for feature-matrix.md - absent."], remediation="Amend feature-matrix.md:112 (wb-12x1 docs bead).",
)

B["C1248"] = dict(
 status="NON-EPISTEMIC", strength="must avoid (norm)",
 wording="Avoid ... default-timeout/serialized-gate regressions",
 overclaims=False,
 rationale="Norm. Presuppositions C1246/C1247 (feedback documents such regressions): dated new-feedback/ files at the pin name a 5000 ms Vitest default timeout misread as census reds (2026-10-28) and a single-file serialization re-created by a receipts index (2026-10-18); prior C0264 SUPPORTED, C0266 ESTABLISHED.",
 evidence=["D01_42b", "FB_TIMEOUT", "FB_SERIAL"],
 defeaters=["none"], rivals=[], faithful=None,
 propagation="Presupposition statuses: C1246 SUPPORTED, C1247 SUPPORTED (filenames state the claims; bodies not re-audited here).", missing=None,
 strongest="Feedback-grounded rule.", counter="None.", narrower="n/a", settle="n/a",
 attacks=["grep new-feedback for timeout/serializ -> dated files found."], remediation="none",
)

B["C1253"] = dict(
 status="ESTABLISHED", strength="found (source report; the receipt says exactly this, with its scope declared)",
 wording="Pi `wb-muip` found no joined Pi-run/Mechanical-outcome/Forge-operation/source-pin in its declared in-repo receipt scope",
 overclaims=False,
 rationale="wb-muip.md line 6 defines the witness (four joined components), the read scope (receipt entries, TRACEABILITY sections, qa JSON receipts; 205 entries in 56 files) and reports 0 witnesses; line 7 declares the unread stores. The program restates all of it with the scope attached.",
 evidence=["D01_46", "MUIP_6", "MUIP_6b", "MUIP_7"],
 defeaters=["none for the report; the census itself did not search the MW repository (declared unread), so an MW-side receipt of a Pi launch would not have been seen"],
 rivals=[], faithful=True,
 propagation="Grounds C1254, C1255, C1256.", missing=None,
 strongest="Receipt-stated scope and count.", counter="None.", narrower="n/a", settle="none",
 attacks=["Read the receipt; compared the four-component definition to doc 01:46."], remediation="none",
)

B["C1255"] = dict(
 status="ESTABLISHED", strength="has no located witness in those stores (scoped absence; the universal reading is UNDETERMINED and the artifact says so)",
 wording="A first registered Pi function → Mechanical live run has **no located joined witness in those stores**",
 overclaims=False,
 rationale="Entailed by C1253 with the store scope carried; the artifact itself adds 'not a proven universal historical absence' and the SKILL restates 'left global historical absence UNDETERMINED'. Supersedes C0321 (UNDETERMINED) and C0446 (SUPPORTED) faithfully: the universal proposition stays UNDETERMINED; only the searched-scope absence is asserted.",
 evidence=["D01_46b", "MUIP_6", "MUIP_7", "SKILL_17", "P:C0321", "P:C0446"],
 defeaters=["scope: the four declared-unread stores; the MW repository was not searched"], rivals=["an MW-side or external journal witness could exist - the artifact preserves this"], faithful=True,
 propagation="Premise of C1256 (definition).", missing="For the universal question: the authorized bounded external store census the receipt names (EAT-R080 conditions) - not run.",
 strongest="Scope-disciplined restatement of a producer census.", counter="None.", narrower="n/a", settle="The external store census.",
 attacks=["Checked every restatement (01:46, 02, SKILL:17) keeps the store scope - it does."], remediation="none",
)
