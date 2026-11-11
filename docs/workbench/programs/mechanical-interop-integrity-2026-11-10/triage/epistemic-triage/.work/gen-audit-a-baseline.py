#!/usr/bin/env python3
# Phase 4+5 adversarial audit, cluster a-baseline (MII 2026-11-10).
# Scope: pi-README baseline bullets C007-C025, five absence claims (C009,C022,C023,C024,C025),
# release-definition premises C027-C030. Judged at pi@0fb90672 / mw@69cb016d.
# Inputs: lens-pi-src.jsonl, lens-mw-src.jsonl, lens-negative-ev.jsonl, claims-readme.jsonl,
# plus direct re-verification in the pin clones performed by this audit (noted "re-read"/"re-run").
import json, os

PI_DRIFT = ("None for this row's evidence: pi 0fb90672->3fc0ead1 (document commit) touches only the 6 program docs + "
            ".agents/skills/pi-mechanical-interop/SKILL.md; git diff over src/test/qa/package.json/forge.toml is empty (re-verified in the pin clone).")
MW_DRIFT = ("None for this row's evidence: mw 69cb016d->1be2b8dc (the README's noted additional main commit) changes only "
            "apps/development-rig/test/host-services.test.ts among apps/packages/contracts/qa (re-verified in the pin clone); this row's witnesses are untouched.")
JOINT_DRIFT = PI_DRIFT + " MW side: " + MW_DRIFT

rows = []
def row(id, finalStatus, kind, rival, attacks, decisive, drift, permitted, remediation):
    rows.append({"id": id, "finalStatus": finalStatus, "kind": kind, "rivalReading": rival,
                 "attacks": attacks, "decisiveEvidence": decisive, "driftAtDocCommit": drift,
                 "permittedWording": permitted, "remediation": remediation})

row("C007", "ESTABLISHED", "OBSERVATION",
    "The file registers nothing (it only defines the tool), and 'one executable tool' misdescribes a Pi that registers other launch-capable tools beside it; registration is also conditional, so some sessions have no workflow_execute at all.",
    ["entailment/wording 'registers': execute-tool.ts holds 1 defineTool and 0 registerTool calls (re-run grep); registration is src/index.ts:3009 — survives only under the claim's second reading (defines the tool another file registers).",
     "quantifier 'one': true scoped to the file; over the registered surface it would fail — the same block registers launch-capable workflow_detached (~index.ts:2912) and forge_gate_run (~2860) (re-read registerTool census).",
     "scope omission: registerWorkbenchTools returns early unless workbench settings select workflowAgentBackend 'claude' and native modules load (index.ts:2684, re-read); the bullet omits that a non-claude-backend session has no registered workflow_execute."],
    "pins/pi-0fb90672/src/workbench/execute-tool.ts:173-176 (createWorkflowExecuteTool -> defineTool name 'workflow_execute'; sole defineTool, zero registerTool) and src/index.ts:3009-3018 + :2684, all re-read in this audit.",
    PI_DRIFT,
    "src/workbench/execute-tool.ts defines the one executable tool workflow_execute; src/index.ts:3009 registers it in sessions whose workbench settings select the Claude backend; launch-capable workflow_detached and forge_gate_run are registered beside it.",
    "NARROW_SCOPE: keep 'one' scoped to the file; state the backend-conditional registration (V3 inherits that precondition).")

row("C008", "ESTABLISHED", "OBSERVATION",
    "Non-script requests can be refused with other codes first (missing-detach-grant, admission refusals), so the uniform model-visible behaviour the bullet implies does not hold.",
    ["refusal-order/scope: verified :215-218 — a detached request lacking workbench:detach refuses missing-detach-grant BEFORE the kind test; decideExecute refusals (:202-205) precede both. The atomized claim's carve-out absorbs this; the bare artifact sentence alone does not.",
     "entailment: the only launcher call (:245) sits in the else branch of the kind test, so no non-script request reaches resolveSource or a launcher — entailed by the handler text (256 lines, read complete by the lens; branch re-read here).",
     "test witness: pinned refusal tests exist (test/workbench-execute-tool.test.ts:173-182; test/workbench-function-authority.test.ts:1680-1682); note P05's planned red tests collide with them and must amend them in the same cut."],
    "pins/pi-0fb90672/src/workbench/execute-tool.ts:215-219 re-read in this audit: `} else if (admission.definition.kind !== \"script\") { refuse(\"unsupported-definition-kind\", \"only script definitions launch in this host\"); }`.",
    PI_DRIFT,
    "a non-script request that passes admission (and, in detached mode, holds workbench:detach) is refused unsupported-definition-kind and never reaches a launcher; earlier refusal codes exist for grant/admission failures.",
    "none required; wording may name the two earlier refusal codes.")

row("C009", "ESTABLISHED", "OBSERVATION",
    "src/index.ts wires more than script launchers (forge_gate_run, workflow_detached, agent tools), so 'wires script launchers only' is false over the file; or a dynamic/path-driven load smuggles a function launcher in.",
    ["quantifier over the file: defeated only outside the claim's scope — the sentence is exact for the workflow_execute registration (launchEmbedded/launchDetached + script-path resolveSource, re-read :3009-3018); read over the whole file it would be false (forge_gate_run, workflow_detached).",
     "dynamic-import escape: every dynamic import in src has a literal specifier; the one path-driven load (hosts/local-detached.ts:476 localProvider) is not fed by either registered call site — launchDetachedWorkflow passes providers: [] (re-read :2665-2680).",
     "absence detector stated and strong: import closure from the extension entry leaves function-authority.ts, source-admission.ts, mechanical-descriptor.ts, mechanical-coordination.ts unreachable (17 of 124 modules unreachable; negev import_closure probe); no @mechanical dependency in package.json; the pin's own in-code records agree ('Not wired yet...')."],
    "src/index.ts:3009-3018 and launchDetachedWorkflow :2665-2680 re-read in this audit (scriptPath, trustedScript: true, providers: []); negev-scratch/import-closure-pi.json.",
    PI_DRIFT,
    "src/index.ts wires only script launchers into the registered workflow_execute tool; no function, furnace-formula or Mechanical launcher is wired anywhere in the file (which also registers other, likewise non-function, tools).",
    "NARROW_SCOPE: keep the sentence bound to the workflow_execute wiring.")

row("C010", "ESTABLISHED", "OBSERVATION",
    "The schema advertises script only; 'function'/'furnace-formula' are docs vocabulary, so no well-formed non-script request can even be submitted.",
    ["entailment: direct literal defeats the rival — kind: Type.Union([Type.Literal(\"script\"), Type.Literal(\"function\"), Type.Literal(\"furnace-formula\")]) re-read at execute-tool.ts:182; same three in execute.ts:83 and identity.ts:13.",
     "supporting nuance: decideExecute returns 'admitted' for a well-formed function request holding workbench:execute (execute.ts:179,199-209) — pure admission exists while launch does not, so a model really can submit the kind and get past admission to the shell refusal."],
    "pins/pi-0fb90672/src/workbench/execute-tool.ts:182 re-read in this audit.",
    PI_DRIFT,
    "as written; may add that the tool description does not tell the model the two advertised kinds are refused.",
    "none for the claim. Successor gap: no MII packet narrows the schema or implements furnace-formula, so the schema keeps advertising a refused kind unless a requirement says otherwise.")

row("C011", "ESTABLISHED", "INFERENCE",
    "Some other reachable path — another registered tool, a dynamic load, an ancestor revision, or a script shim — launches function/furnace-formula definitions, making the advertisement partial execution support.",
    ["missing-premise hunt ('no other reachable path'): closed at the pin — one launcher call site (:245) inside the script branch; all sixteen registerTool sites read, no second workflow_execute; import closure leaves the Mechanical modules unreachable; execute-tool.ts is the same blob on all 1082 refs that carry it and all 285 worktree HEADs (negev probe).",
     "route-redefinition: a saved script that shells out to Mechanical would be a script route, not kind=function execution; none exists in examples/, .pi/ or qa/ (negev).",
     "category guard: 'advertises' never entailed 'supports'; two pinned tests assert the refusal of both kinds.",
     "temporal: holds since the tool was added (0645a877, 2026-10-17) — the inference is not pin-lucky."],
    "Deductive step over C008+C009+C010 (all ESTABLISHED) plus the negev exhaustive surface; branch and registration re-read in this audit.",
    PI_DRIFT,
    "at 0fb90672 no request of kind function or furnace-formula can execute through the registered tool in any host mode; the schema's advertisement is not execution support.",
    "none.")

row("C012", "ESTABLISHED", "OBSERVATION",
    "'Has a pinned descriptor/allowlist loader' is capability inflation: the loader is dead code, its 'artifact' pin covers one file rather than a package closure, and the allowlist does not cover the package Pi actually plans to consume.",
    ["existence vs use: 'has' holds — digest grammar MECHANICAL_DIGEST_PATTERN :116 and frozen one-entry allowlist :128-137 re-read in this audit; resolve/load/admitMechanicalEntrypoint present (:326,:365,:377, lens); loadMechanicalEntrypoint has zero production callers — any stronger 'uses' reading dies.",
     "pin scope: artifactDigest pins ONE regular file by sha256 (:303-323), not a tarball + runtime-file manifest; the export loader itself is host-supplied (MechanicalExportLoader).",
     "allowlist coverage: it reviews @mechanical/workflows-development (library), not @mechanical/development-rig whose ./host subpath pi-02 section 8 has Pi consume; no Pi allowlist entry, dependency or pin covers the rig or the coordination tarball (negev) — a P00 contract gap.",
     "descriptor drift: none — Pi's vendored fixture is byte-identical (sha256 68cc312b...192d0f) to mw contracts/entrypoints/development.v1.json; descriptor of record MW f7c0a943."],
    "mechanical-descriptor.ts:116 and :128-137 re-read in this audit; byte-compare of the two descriptor files (lens cmp/sha256).",
    JOINT_DRIFT,
    "has an unwired, digest-pinned descriptor/allowlist loader admitting one reviewed entrypoint; the pin covers a single artifact file, the allowlist names the library package only, and nothing in production calls or pins it.",
    "ADD_MISSING_PREMISE in the program: the rig/host package is outside the current allowlist and pin surface (P00 decision).")

row("C013", "ESTABLISHED", "OBSERVATION",
    "'Can adopt and recheck exact grants' overstates an unexercised module, or 'recheck' implies a wider final read than the code performs.",
    ["capability witness: adoptFunctionActions at :271 (1-64 bindings; Pi-namespace grants refused :284; each definition/grant bound once) and dispatchFunctionWithAuthority at :359 with the final fresh read of grants+identity (:365-366) — both re-located in this audit; 'can' = capability in the module, exactly the claim's reading.",
     "recheck surface cap: the final read covers grants and identity ONLY — not source, runtime manifest or lease fencing; a wider reading dies.",
     "use: nothing in production supplies any contract or calls the boundary (module unreachable from the entry) — travels as a qualifier, not a defeater of 'can'."],
    "function-authority.ts:271 and :359 re-verified by grep in this audit; exactness rows :337-342 (lens).",
    PI_DRIFT,
    "the module can adopt exact grants and re-reads host grants+identity at the dispatch boundary; nothing in production calls it, and the final read does not cover source, manifest or leases.",
    "none.")

row("C014", "ESTABLISHED", "OBSERVATION",
    "'Exported default FUNCTION_ACTION_CONTRACT remains unadopted' is false: either an ES default export exists, some importer adopts a contract somewhere, or 'remains' smuggles unverified history.",
    ["wording 'exported default': the file has 0 `export default` (re-run grep); it is a named exported constant — the claim's own gloss ('the default contract value') absorbs it; artifact wording stays loose.",
     "temporal 'remains': pickaxe shows the declaration introduced unadopted at 029dabca (2026-11-06) and unchanged since — 'remains' holds over its whole history (lens git log -S).",
     "adopted-contract-elsewhere: adoptFunctionActions has no call site outside its definition; the ADOPTED set is fed only there; module unreachable from the entry — no adopted contract object can exist in a production process at the pin (negev symbol search over all 124 modules).",
     "spelling premise: candidate grant mechanical:develop-write exists only producer-side as 'not yet adopted jointly' (mw host-binding.ts:13-14); Pi src/tests never name it; Pi's suite pins refusal of the older colon spelling — no silent cross-repo adoption."],
    "function-authority.ts:135 and :145 re-read in this audit: Object.freeze({ state: \"unadopted\", blockedOn: FUNCTION_ACTION_BLOCKER }); grep 'export default' = 0.",
    JOINT_DRIFT,
    "the module's exported default contract VALUE (a named export, not an ES default export) is unadopted and has been since its introduction; nothing in production supplies any contract to the boundary.",
    "DOWNGRADE_MODALITY: render 'exported default' as 'exported default contract value (named export)'.")

row("C015", "ESTABLISHED", "OBSERVATION",
    "'Confines Git worktrees' is either contentless or leaky: subdirectories pass, ignored edits pass, or the gate-manifest premise is fictional.",
    ["concreteness: refusal vocabulary re-read in this audit (workspace-outside-root :72/:171, workspace-not-worktree-root :73) — an admitted workspace must realpath inside the authorized root AND be the root git reports for its own worktree; a subdirectory of a worktree is refused (confineWorkspace :338-345, lens).",
     "dirty-measure hole (survives as qualifier): dirtiness is read from git status alone, so an edit status does not list (ignored files) is measured clean — the suite's UNLISTED-EDITS family pins two such edits.",
     "manifest premise: the module never names forge.toml; the gate manifest is a host-declared workspace-relative path — forge.toml is the suite's fixture value, not module behaviour."],
    "source-admission.ts refusal-code vocabulary re-read; :338-345,:368-388 (lens quotes).",
    PI_DRIFT,
    "confines admitted workspaces to realpath-inside-authorized-root AND own-worktree-root; identity is measured from git status (unlisted/ignored edits read clean) against a host-declared manifest path.",
    "none.")

row("C016", "ESTABLISHED", "OBSERVATION",
    "'Process-local WriterLeases map' is wrong in one of two directions: a durable/shared store backs it after all, or even process-locality is too generous because exclusivity is per-instance only.",
    ["durable-store hunt: the class's three methods touch only the private Map (readonly #held, re-read :430-431); imports are node:crypto + read-only node:fs + node:path; no flock/fsync/wx in the module — hidden persistence dead.",
     "sharpening (survives): exclusivity is per-INSTANCE — the module exports the class and no singleton; two registries in one process would not exclude each other; one-registry-per-host is a stated convention (:46-47), not enforced; `new WriterLeases` has 0 src call sites (re-run), so at the pin no Pi process holds any writer lease at all.",
     "release semantics: the lease releases in a finally block when dispatch settles (:488-509); whether that equals 'launch return' depends on a caller that does not exist — D5 latent by construction."],
    "source-admission.ts:430-431 re-read in this audit; grep 'new WriterLeases' over src = 0 (re-run).",
    PI_DRIFT,
    "writer leases live in a per-instance in-memory Map: no persistence, no cross-process visibility, no post-restart exclusivity, and nothing in production instantiates a registry.",
    "DOWNGRADE_MODALITY: say per-instance in-memory registry; P02 should make one-registry-per-host a tested invariant.")

row("C017", "ESTABLISHED", "OBSERVATION",
    "The seven-primitive inventory is inflated (a primitive is docs-only or broken) or deflated-by-omission: the bullet's own 'do not reclassify as missing' rule hides a Mechanical-facing boundary the corpus never names.",
    ["per-conjunct witness: all seven present as code (script launcher index.ts:2621-2643 + workflow/runtime; claude-host.ts with pinned @anthropic-ai/claude-agent-sdk 0.3.300; hosts/local-detached.ts; observation.ts; control.ts; reconcile-tool.ts; worktree.ts) — five re-checked file-level in this audit; 'has' = code present, which the claim itself marks weaker than exercised.",
     "quality qualifiers (survive): detached lifetime is 'survives-client-disconnect-not-host-crash' (local-detached.ts:103); worktree preservation is agent-scoped isolation under os.tmpdir(); the Claude-host primitive carries the witnessed pending-cancellation defect wb-9v02/EAT-R253 that MNI gated effectful dispatch on and MII's corpus drops (lineage lens).",
     "omission: src/workbench/mechanical-coordination.ts (419 lines, invokeMechanicalCoordination, reviewed id mechanical.coordination.reconcile.v1, observation-only authority, 0 importers — re-verified) is a fourth Mechanical-facing boundary the baseline and P12 never name; a from-scratch P12 would duplicate wb-0gbh against MNI EAT-R301.",
     "second-half absence ('none runs Mechanical through the registered route'): inherited from C011 (ESTABLISHED)."],
    "File witnesses re-verified at the pin in this audit; mechanical-coordination.ts wc -l = 419 with 0 src importers (re-run).",
    PI_DRIFT,
    "Pi has the seven named primitives as code at the pin, with the stated lifetime/scope limits and the known Claude-host cancellation defect; the baseline list omits the landed observation-only mechanical-coordination boundary, which must also not be reclassified as missing.",
    "ADD_MISSING_PREMISE: name mechanical-coordination.ts in the baseline and P12; carry the wb-9v02 cancellation-defect gate into P05/P07.")

row("C018", "ESTABLISHED", "OBSERVATION",
    "develop is not 'ordinary' (hidden context or effects), the services are not exactly four, or the outcome contract is weaker than the release leans on.",
    ["signature witness: develop(services, request): Promise<DevelopmentOutcome> re-read at develop.ts:21-24; exactly four callbacks discover/compileContext/implement/verify re-read at contracts.ts:48-51; outcome is a four-kind union; executed 123/123 on a pin copy including 'the four services run in order exactly once' (lens PROBE).",
     "'ordinary' vs 'pure': ordinary holds (plain exported async function, services injected); the companion's stronger word 'pure' is NOT entailed — develop awaits caller callbacks that perform the effects; cap for joint wording.",
     "strictness premise (survives as program gap, not a defeater): core returns verified_candidate for ANY verification verdict 'passed' with nonblank system/kind/id (develop.ts:57-65) — far weaker than pi-04's strict native semantics; that is exactly D1's Mechanical-owned gap."],
    "develop.ts:21-24 and contracts.ts:48-51 re-read in this audit; PROBE/out/host-suite-node22.tap 123/123 (lens execution).",
    MW_DRIFT,
    "Mechanical has ordinary develop(services, request) with exactly four callbacks and a four-outcome domain union; 'the domain result workflow_observe must show unchanged' is a release target, and the core's verified_candidate acceptance is looser than the program's strict-Forge target.",
    "none.")

row("C019", "ESTABLISHED", "OBSERVATION",
    "(MNI lesson: phantom subpath) @mechanical/development-rig/host does not resolve, or 'shipped' means registry-published/stable, which nothing shows; the producer's own skill text at the pin even denies the export.",
    ["phantom-subpath attack: dead at this pin — exports['./host'] -> dist/host.js re-read in the manifest (private:false, files [dist, README.md]); npm pack lists dist/host.js (+.d.ts) among 182 files; an external tarball-only consumer resolves the specifier (lens execution).",
     "temporal: the subpath landed at 24ef8984 (2026-11-09T23:25Z), 18 commits AFTER the MNI env pin 62a10b59 — MNI's 'absent' and MII's 'shipped' are both correct at their pins; manifest blob unchanged through 0ffdc844.",
     "counterevidence preserved: the producer's skill at 69cb016d states the opposite ('does not give Pi a stable callable rig-host export'); stale documentation corrected at 6476372f — primary evidence (manifest, tarball, executed import) outweighs; recorded, not deleted.",
     "'shipped' = registry-published: UNDETERMINED — no publishConfig, no registry probe; missing artifact: a registry record or release tag."],
    "apps/development-rig/package.json exports/files/private re-read in this audit; PROBE m05-digest-probe-node24.json and installed-consumer-surface-probe.jsonl (lens execution).",
    MW_DRIFT + " The ./host export itself landed one day before the pin (24ef8984), so the MNI->MII delta here is real program-pin drift, resolved in this claim's favour at 69cb016d.",
    "'shipped' = landed on main, declared in the export map, present in the packed tarball, importable by a tarball-installed external consumer; registry publication is not established.",
    "ADD_TEMPORAL_QUALIFIER + DOWNGRADE_MODALITY of 'shipped' to the four verified senses; producers should fix the stale skill line (done post-pin).")

row("C020", "ESTABLISHED", "OBSERVATION",
    "The 'L2 external installed-host fixtures' are absent, Pi-flavoured in name only, or their receipts are too weak for the tier label to mean anything.",
    ["existence+execution: installed-consumer.test.ts, installed-pi-consumer-conformance.test.ts (present, re-verified; its own header: 'L2 is fixture callbacks over real packed bytes: never native provider proof'), installed-host(.conformance)/host-facade tests, M01/M05 receipts; executed 20/20 on a pin copy; digest binding independently recomputed in Python; a source mutant turns the receipt test red (lens PROBE).",
     "name inflation: the consumer fixture imports only @mechanical/development-rig/host and node builtins — 'pi-consumer' is a filename fragment; no Pi package anywhere in it.",
     "receipt weakness (survives as caveat): the receipt test leaves mechanical_base_sha, row outcomes/status and whole-tarball sha unasserted (mutant with zeroed sha + wrong refusal code + status 'fail' still passes); the producer's own mw.pi-interop-receipt.v1 validator REFUSES the committed M05 receipt (19 refusals, 20th INTEROP_RECEIPT_ARCHIVE_MODIFIED vs parent — the pin commit rewrote a write-once archive) and runs in no gate. Fixtures and tests are real; the M05 receipt as a record is weaker than its label.",
     "tier vocabulary: 'L2' is the producer's tier name, not Pi's V2."],
    "Conformance test presence + header line and the m05 receipt scope line re-read in this audit; PROBE taps (20/20, mutants A/B) and check-interop-receipt.out (lens execution).",
    MW_DRIFT,
    "Mechanical has L2 external installed-host fixtures (pack -> install into an external consumer -> exercise), with fixture callbacks over real packed bytes; the committed M05 receipt is partially unbound and refused by the producer's own validator, so cite the executable tests, not the receipt alone.",
    "ADD_MISSING_PREMISE for the program: run the receipt validator inside the gate over every committed receipt; decide write-once vs tree-coupled regeneration (feeds D7).")

row("C021", "SUPPORTED", "OBSERVATION",
    "'Mechanical has standalone native Git/Claude/Forge execution' reads as a capability demonstrable at the paired snapshot; in fact the packed rig cannot run the Claude or Forge legs at all without out-of-manifest SDK installs, so the bullet is a historical resume presented as current capability.",
    ["conjunct split: Git — re-executed at the pin copy against a real repository (ESTABLISHED). Claude/Forge — code path verified (developLive composes real git children, the Claude Agent SDK by runtime specifier, Forge gate.run require_complete:true; CLI --live-develop/--live-verify), and recorded native receipts exist in-repo; but no native run exists at 69cb016d.",
     "reproducibility attack (succeeds against the strong reading): from a tarball-only consumer the CLI exits 2 with CLAUDE_AGENT_SDK_NOT_INSTALLED / FORGE_SDK_NOT_INSTALLED; both SDKs are absent from the installed closure and the rig manifest is test-pinned NOT to list the Claude SDK (lens PROBE).",
     "temporal: the receipts are 2026-10-15..20, older than the snapshot's code; the pin's own docs/10 says 'Not claimed: an L3 receipt against the live SDK'; the companion (mw-04 L5) says an older L3 receipt does not certify current native runtime.",
     "receipt authenticity spot-check: 2026-10-15-live-claude-forge-verified.json re-read in this audit — mode live-claude-forge, Claude session a40f3d8a-..., Forge op-f74368f48f7a4e29b703c1ca184af0d2, candidate aedc62aa/tree ed3b7d12 — internally complete as a record."],
    "Re-read receipt fields + rig manifest (no Claude SDK dep) in this audit; PROBE installed-cli-live-develop-no-sdk.stderr / installed-cli-live-verify-no-sdk.stderr and legacy-pass-e2e-probe.jsonl (lens execution).",
    MW_DRIFT,
    "Mechanical has the standalone producer code path; the Git leg re-verified at the pin; native Claude/Forge legs are recorded 2026-10-15 receipts at then-current sources and are NOT re-run or runnable from the packed artifact at the paired snapshot (SDKs live outside the packed closure by design).",
    "ADD_TEMPORAL_QUALIFIER on the bullet; EVIDENCE_ACQUISITION: produce a fresh native receipt at the re-pinned snapshot (SDK identity + native Forge operation) before H01/D1 relies on the capability.")

row("C022", "ESTABLISHED", "OBSERVATION",
    "Some listed Mechanical asset does reach registered Pi (the 'pi-consumer' suite being the obvious candidate), or the sentence smuggles a global absence it cannot see.",
    ["per-asset content check: the four assets are committed artifacts whose imports and records fix what they demonstrate — the conformance fixture imports only @mechanical/development-rig/host (its name is the only Pi-ish thing in it); m01 carries pi_invocation_id: null with the limitation 'no Pi code ran in this cut' (re-read); m05 scope 'no Pi registration, no live SDK, no native provider proof' (re-read); the 2026-10-15 standalone receipts name no Pi.",
     "census: 0 Pi imports/run-ids/tool tokens across the 703 tracked files (workflow_execute appears only as stale-phrase literals in the docs linter; Pi package names only as the producer's own forbidden-specifier guards and one ls-remote URL); the structure guard would turn red on a Pi import.",
     "Pi-side closure: the registered route refuses every function request at the pin and its whole ancestry (C008/C011), so no asset could have run through registered Pi.",
     "global-absence worry: does not bite — the claim quantifies over the four named in-repo assets, not over all receipts anywhere; their own content settles it.",
     "wording: 'proofs' is loose for develop and the subpath (code, not proofs)."],
    "m01:17 pi_invocation_id null + :174 limitation and the m05 scope line re-read in this audit; static-scans S2/S3/S5/S12 (lens).",
    JOINT_DRIFT,
    "none of the four listed assets runs through Pi's registered tool; whatever they demonstrate, they demonstrate without a registered Pi workflow_execute invocation ('assets', since two of the four are code rather than proofs).",
    "none.")

row("C023", "ESTABLISHED", "OBSERVATION",
    "A joined live receipt exists somewhere the search did not reach — the artifact sentence is a global absence with NO stated detection surface; or, per provider, a joined receipt exists for at least one of Claude/Git/Forge.",
    ["absence-without-detector (succeeds against the artifact wording, not the scoped claim): the README states no detection surface; the triage supplies one — file-level co-occurrence of the join components (Pi wf_* run id, Mechanical outcome token, Forge op-id) over every tracked text file of both pins: only the three .beads tracker exports hold all three, and record-level 0 of 5095 records join them; m01/m05 pi_invocation_id null; 72 Pi receipts with 0 verified_candidate (re-run in this audit).",
     "structural closure (defeats the per-provider rival inside the scope): execute-tool.ts is one blob across all 6980 commits since the tool existed, all 1082 refs and 285 worktree HEADs — no ancestor registered route could launch a function at any date, so no genuine joined receipt could exist for ANY provider; residual: a locally patched, never-committed Pi build.",
     "global reading: UNDETERMINED — unsearched: contents of the shared artifact store (name-only listing done), the OrchestrationEngineer ledger, ~/.forge/ledger.jsonl, Claude session journals, other clones; the repo's own M050/EAT-R143 row and census ('global absence ... NOT CLAIMED') already model the correct scoping.",
     "detector blind spots: non-standard spellings, session-UUID-only joins, split joins — mitigated by the structural closure for everything via the registered route.",
     "displacement guard: Pi-native live Claude receipts and standalone Mechanical receipts exist and are not reclassified as missing; the absence is of the JOIN only."],
    "negev join-scan (join-scan-pi.json, join-scan-mw.json, join-scan-pi-beads-lines.json) + all-refs blob probe; Pi receipts sweep re-run in this audit (72 files, 0 verified_candidate).",
    JOINT_DRIFT,
    "no joined live Claude/Git/Forge receipt exists in the committed stores of either repository at the pins, and none could have been produced through the registered route at any ancestor revision; absence beyond the two repositories is undetermined (M050 wording form).",
    "NARROW_SCOPE + state the detection surface in the README bullet, following the repo's own M050/EAT-R143 precedent.")

row("C024", "ESTABLISHED", "OBSERVATION",
    "Crash/restart proof exists but single-sided evidence was miscounted as absent, or the joined absence is unknowable without a stated detector.",
    ["derivation (valid, premises established): no joined invocation can exist at the pin or any ancestor (C023 structural closure) -> no joined crash/restart trial can exist; corroborated by a token search (SIGKILL/crash/restart) over tests, QA and receipts of both pins, every hit Pi-only or Mechanical-only.",
     "single-side displacement: fault/kill evidence exists for Pi script/detached hosts (qa/workbench/local-detached-faults.mjs, test/scratch-killed-run.test.ts) and for the standalone producer (effect-intent, effect-settlement-once, post-dispatch-abort, forge-gate-faults) — the claim correctly excludes them; they are baseline, not missing.",
     "adjacent omitted fact (survives as program note): Pi's registered observation itself does not survive an extension restart — workflowTasks is an in-memory Map and the observe handler requires the same sessionId (re-read in this audit) — bears directly on V5.",
     "global reading: UNDETERMINED over stores outside both repositories (same surface gap as C023)."],
    "workflowTasks declaration/writes and the observe availability check re-read in this audit (src/index.ts:2460,:2637,:2957-2965); negev NE derivation + token search (lens).",
    JOINT_DRIFT,
    "no joined Pi-to-Mechanical crash/restart proof exists in either repository at the pins, and none could have been produced through the registered route; single-side fault harnesses exist and stay baseline; registered observation itself is in-memory and session-scoped at the pin.",
    "NARROW_SCOPE as C023; lineage: MII P09 should extend the wb-7wkb kill/verifier harness and inherit its 'not claimed' list rather than start fresh.")

row("C025", "ESTABLISHED", "OBSERVATION",
    "'No compatible distributed lease proof' is vacuous because 'compatible' is undefined, or wrong because some in-tree lock primitive already is such a lease — and it hides the nearer absence (cross-process same-machine exclusivity) the first release actually turns on.",
    ["in-tree lock survey: WriterLeases is a per-instance in-memory Map (C016); src/schedule-store.ts holds a wx PID-lock released on pid-not-running — exactly the liveness-as-release pattern pi-02 section 4 forbids for writer leases, so it cannot be the lease; hosts/local-detached.ts has an O_CREAT|O_EXCL invocation-id reservation; none is keyed by a workspace root. MW rig: 0 lease/fence/fencing tokens in apps/development-rig/src (re-run in this audit); MechanicalHostBindingV1 carries only intent.writer 'single'; its own receipt marks concurrent-writer rows SHAPE ONLY ('single-writer lock lives outside the facade').",
     "'compatible' undefined (survives): there is no producer-side lease for a Pi lease to be compatible with; the word needs a referent or deletion.",
     "nearer-absence (survives): the first release defers distributed fleets and needs cross-process same-machine exclusivity (pi-02 section 4, P02, G07, pi-05 L41) — equally unproven by the same surface and by the suite's own 'Writer exclusivity across host processes is NOT CLAIMED' line; the bullet names only 'distributed'.",
     "detector: a durable or shared lease store must import a write/lock primitive; token search over both src trees with every hit read — complete in-repo; blind to out-of-tree coordinators (global reading UNDETERMINED, near-structural since no in-repo client code could use one)."],
    "grep sweep re-run in this audit (0 lease words in rig src); lock-site survey of schedule-store.ts/local-detached.ts/source-admission.ts (lens + re-read).",
    JOINT_DRIFT,
    "no distributed — nor even cross-process — writer-lease implementation or proof exists in either repository at the pins; 'compatible' has no defined referent; the first release's own requirement (cross-process same-machine exclusivity) is equally unproven.",
    "NARROW_SCOPE + define or drop 'compatible'; ADD_MISSING_PREMISE: state the nearer cross-process absence; lineage: carry the lease-owner ruling (and wb-1zn2 external gate) in P00.")

row("C027", "ESTABLISHED", "OBSERVATION",
    "'Host-reviewed mechanical.development.develop.v1' reads as 'reviewed and invocable': the id is docs-only vocabulary, or the review covers the wrong package, so the release-definition premise is hollow.",
    ["two-facet witness: Pi's frozen allowlist entry re-read in this audit (id mechanical.development.develop.v1, package @mechanical/workflows-development, export develop, schemas, four bindings; mechanical-descriptor.ts:128-137); producer descriptor re-read (same id; status descriptor-only; byte-identical to Pi's vendored fixture, sha256 68cc312b...; hard-coded in entrypoint-host.ts:36 and host-binding.ts:10).",
     "doc-promoted-to-implementation (dies as a reading of this claim, survives as a release-gap): the reviewed descriptor says 'descriptor-only' and 'No remote host loader or generic invocation transport is implemented' (re-read); the producer host refuses any other status; Pi's loader has no caller and src holds no digest of record — an invocable v1 needs new descriptor bytes -> new digest -> allowlist/pin update, a P00 contract decision.",
     "package mismatch (rides from C012): the allowlist reviews the library package, not the rig whose ./host subpath pi-02 has Pi consume.",
     "'host-reviewed' undefined in the README — defined here only as 'named in Pi's fixed reviewed-entrypoint allowlist'."],
    "mechanical-descriptor.ts:128-137 and contracts/entrypoints/development.v1.json (id, status, note) re-read in this audit.",
    JOINT_DRIFT,
    "the versioned id exists on both sides and Pi's frozen allowlist names it; 'host-reviewed' means allowlisted-by-id only — the reviewed descriptor is descriptor-only and not invocable, and no production pin, caller or rig-package coverage exists at the pins.",
    "DOWNGRADE_MODALITY: define 'host-reviewed'; P00 must own the descriptor-status/digest transition.")

row("C028", "ESTABLISHED", "OBSERVATION",
    "(MNI lesson) git-census-v1/plain-v1 are profile vocabulary with no code witness — or, in the other direction, 'witnessed in code' gets read as 'a selectable Git/plain profile ships'.",
    ["witness hunt (kills the no-witness rival for MW): EVIDENCE_PROFILES = ['git-census-v1','hx-task-scope-v1'] and CONTEXT_PROFILES = ['plain-v1','rf-committed-v1'] re-read at host-binding.ts:11-12 (landed 6c287304, 2026-11-09); also in the JSON schema and two tests — the MNI lesson is half-cured: the labels now have a code witness and unknown profile strings can be refused.",
     "per-repository facet (negative-ev graded this facet REFUTED): Pi src/test/qa hold ZERO occurrences of either identifier (re-run grep = 0) — every Pi statement about the pair is, at the pin, a statement about a Mechanical constant; the claim itself leaves the Pi facet open rather than asserting it.",
     "doc-promoted-to-implementation (survives as the binding cap): no code selects behaviour by profile — developLive chooses context by options.contextMode and always runs the Git tracked-file census; invocation-identity carries the strings as free host-stated values unchecked against the enums; host-binding validates a binding no production path consumes; Pi's own remediation row M049 'no selectable profile ships' still describes the snapshot.",
     "quantifier: one verdict per identifier per repository — MW label witness yes/yes; MW behavioural witness no/no; Pi witness no/no."],
    "host-binding.ts:11-12 re-read in this audit; grep over Pi src/test/qa = 0 (re-run); M049/EAT-R142 row (lens).",
    JOINT_DRIFT,
    "git-census-v1 and plain-v1 exist as validated label constants in Mechanical's host-binding (plus schema and tests); they are absent from Pi source and bind no behaviour at either pin — the release definition's 'git-census-v1/plain-v1' names labels, not shipped selectable profiles.",
    "NARROW_SCOPE in the release definition ('validated labels, selection to be built'); the packet owning profiles must bind label -> behaviour with tests.")

row("C029", "REFUTED", "OBSERVATION",
    "Strongest case for the claim: 'attached' is just the README's word for the embedded mode (execution inside the calling Pi session), which exists, and 'explicitly admitted same-machine' is the detached host, which exists — so both named placements exist.",
    ["facet 1 ('attached' exists): REFUTED — the host-mode enumeration is frozen to exactly ['embedded','detached'] (execute.ts:19-20, re-read); no mode, grant or tool uses 'attached' (re-run word search over src/workbench + src/workflow: one prose hit in identity.ts:3 in a different sense).",
     "charitable mapping attached=embedded: defeated by the corpus itself — pi-05 L41 reads 'First: embedded same-machine Pi host ... Later: attached/detached variants' (re-read), treating 'attached' as a LATER variant distinct from embedded; the README cannot mean embedded by a word its own corpus defers.",
     "facet 2 (one placement vocabulary): REFUTED — README L24 puts 'attached or explicitly admitted same-machine execution' in the first vertical; pi-02 L5 says hostMode 'embedded' for the first cut (re-read); pi-05 L41 defers attached/detached variants to Later. Three documents, three incompatible placement statements for the same first release.",
     "narrower truth (ESTABLISHED, preserved): Pi has exactly two placements at the pin — embedded (in the calling session) and detached (same-machine private host behind explicit workbench:execute + workbench:detach grants); pi-02's first cut is embedded.",
     "joint consequence (joint lens): 'first host mode' sits on Pi's ratification list with no counterpart in the companion, whose contract and receipts never mention a host mode."],
    "execute.ts:19-20 frozen enum + zero 'attached' mode tokens (re-read/re-run in this audit); README L24 vs pi-02 L5 vs pi-05 L41 wording triple (re-read). Four lenses converge: pi-src UNSUPPORTED, negative-ev REFUTED, contradict UNSUPPORTED + disagreement, joint REFUTED.",
    PI_DRIFT + " The contradiction is BETWEEN pinned documents of the same deposit, so no drift explains it away.",
    "Pi at 0fb90672 has two execution placements: embedded (inside the calling session) and the explicitly admitted same-machine detached host; 'attached' names no Pi placement. The first-release placement must be stated in one word across README, pi-02 and pi-05 (pi-02 says embedded).",
    "NARROW_SCOPE on README L24 to 'embedded (same-machine Pi session) execution' or SURFACE_DISAGREEMENT across the three documents; define 'attached' or drop it. Blocks one release-definition premise until the vocabulary is ruled.")

row("C030", "SUPPORTED", "OBSERVATION",
    "The observe premise holds universally: workflow_execute's minted reference can be observed through workflow_observe in every host mode (which the tool's own reply text asserts by telling the model to do exactly that).",
    ["core (ESTABLISHED): workflow_observe is registered (index.ts:2933) and workflow_execute mints a wf_ logical invocation id (mintInvocationId: workflowRunId, :3014; task.ts wf_+12hex) — re-read in this audit.",
     "embedded path (ESTABLISHED): the embedded launcher registers the task under that id (workflowTasks.set(runId, task), :2637, re-read) and workflow_observe resolves it for the same session/workspace/principal.",
     "universal facet ('in each host mode') REFUTED: launchDetachedWorkflow (:2665-2680, re-read) registers NO task, so for a detached launch the registered workflow_observe answers 'Workflow unavailable in this local operator/session/workspace scope.' (:2957-2965, re-read) — while the execute tool's description (:179) and its trim fallback (:163) tell the model to observe the launch through workflow_observe; the premise mechanism exists for embedded only.",
     "restart cap (survives): workflowTasks is an in-memory Map and observe is session-scoped, so the mechanism also does not survive an extension restart — P06/P07/V5 must build durable observation, and P11's detached function would have no observe path without new wiring.",
     "release-definition fit: pi-02 pins the first cut to hostMode embedded, where the premise holds; the README's own placement line (C029) would break it."],
    "index.ts:2460,:2637,:2665-2680,:2933,:2957-2965 and execute-tool.ts:163,:179 all re-read in this audit; negev NE-15 (lens).",
    PI_DRIFT,
    "Pi registers workflow_observe, and for an EMBEDDED launch the minted wf_ invocation reference is observable within the same extension process and session; a detached launch returns the same reference but is not observable through the registered workflow_observe at the pin, and no observation survives an extension restart.",
    "SPLIT_CLAIM / NARROW_SCOPE: state the premise for embedded mode only and name the detached + restart gaps as build targets (P06/P07/P11/V5); fix the execute-tool reply text that points detached launches at workflow_observe.")

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audit-a-baseline.jsonl")
with open(out, "w") as f:
    for r in rows:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")
print("wrote", out, "rows:", len(rows))
statuses = {}
for r in rows:
    statuses[r["finalStatus"]] = statuses.get(r["finalStatus"], 0) + 1
print("statuses:", statuses)
