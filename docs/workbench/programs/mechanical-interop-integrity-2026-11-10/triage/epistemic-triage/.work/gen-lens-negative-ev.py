#!/usr/bin/env python3
"""Generator of lens-negative-ev.jsonl (MII triage, Phase 3 wave 1, blind lens "negative-ev").
Every row names the claim ids it bears on (validated against claims-*.jsonl), the evidence actually inspected at the pins,
the detection model behind any absence verdict, a proposed status and any drift. Run: python3 -I gen-lens-negative-ev.py"""
import glob, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
P = "pi@0fb90672"
M = "mw@69cb016d"
D = "pi@3fc0ead1 (document pin)"
T = "pi@ce180d82 (gated trunk tip)"
S = "epistemic-triage/.work/negev-scratch/"
STATUSES = {"ESTABLISHED", "SUPPORTED", "PLAUSIBLE", "UNSUPPORTED", "CONTESTED", "REFUTED", "UNDETERMINED", "NON-EPISTEMIC"}
F = []


def add(fid, claim_ids, relation, evidence, detection, status, drift, note):
    F.append({"lens": "negative-ev", "id": fid, "claimIds": claim_ids, "relation": relation, "evidence": evidence,
              "detectionModel": detection, "proposedStatus": status, "drift": drift, "note": note})


def ev(pin, where, text, lines=None, kind="observation"):
    row = {"pin": pin, "path": where}
    if lines is not None:
        row["lines"] = lines
    row[kind] = text
    return row


# ---------------------------------------------------------------------------------------------------------------------
# The five no-live-proof claims
# ---------------------------------------------------------------------------------------------------------------------
add("NE-01", ["C023"], "SUPPORTS", [
    ev(P + " + " + M, S + "join_scan.py -> join-scan-pi.json, join-scan-mw.json",
       "File-level co-occurrence of the join components Pi's own prior-run census reads (Pi run id wf_*, Mechanical outcome token, Forge "
       "operation id op-<32 hex>; test/helpers/mechanical-evidence-census.ts:46-51) over every tracked text file. Pi: 2223 files, and only "
       "the three aggregated tracker exports under .beads hold all of them. Mechanical: 703 files, none holds any Pi run id.", kind="probe"),
    ev(P, S + "join_scan_lines.py -> join-scan-pi-beads-lines.json",
       "Record level over the four .beads exports (5095 records): 0 records hold a Pi run id, an outcome token and a Forge operation id together.", kind="probe"),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m01/installed-host-l2-receipt.json", "\"pi_invocation_id\": null,", "17", "quote"),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m00-a/baseline.json", "\"pi_invocation_id\": null,", "17", "quote"),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m05/installed-pi-consumer-l2-receipt.json",
       "installed-pi-consumer-conformance-fixture-L2: fixture callbacks over real packed bytes; no Pi registration, no live SDK, no native provider proof", "11", "quote"),
    ev(P, "git log --full-history --raw --no-abbrev --format= 0fb90672 -- src/workbench/execute-tool.ts",
       "One blob (d873e378) in all 6980 commits reachable from the pin since the file was added at 0645a877 (2026-10-17); pickaxe finds no "
       "other definition of a tool named workflow_execute under src. No ancestor revision can launch a function through the registered tool.", kind="probe"),
    ev(P, "test/workbench-mechanical-evidence-census.test.ts", "Measured at this cut: searched-scope absence, global UNDETERMINED", "78", "quote"),
],
    "A joined receipt is one record naming a Pi run id (the registered tool mints wf_* ids: src/index.ts:3014), a Mechanical outcome token and a "
    "Forge operation id. Surface: every tracked text file of both pins at file level (a superset of entry-level joins), record level for the "
    "tracker exports, all dates. Power: finds the standard spellings; the standing census's R080-LIVE-PLANTED case shows the same patterns find a "
    "planted join. Blind: non-standard spellings, a Pi side named only by a session UUID, a join split across files, uncommitted worktree files, "
    "stores outside the two trees. The structural reading (no revision can launch a function) closes the registered-route case independently of spelling.",
    "ESTABLISHED",
    "The standing census reads dated entries 2026-10-15..2026-11-06 only (test/helpers/mechanical-evidence-census.ts:110-112): 67 of the 178 dated "
    "level-2 entries in docs/workbench/receipts at the pin (2026-11-07..2026-11-10) lie outside its window; this scan read them. Unchanged at "
    "Mechanical 1be2b8dc.",
    "Verdict is for the scoped proposition: no such receipt in the committed stores of either repository at the pins, at any date, and none "
    "producible through the registered route of any ancestor revision. Pi-native live receipts exist and are not to be reclassified as missing "
    "(qa/workbench/receipts/wb-a2g.3-operator-receipt.json, real Claude sessions; docs/workbench/TRACEABILITY.md:190, run wf_a9f7f6808d55): the "
    "absence is of the join with Mechanical only. Requirement candidate (EVIDENCE_ACQUISITION): the V4 receipt carries the join components in one "
    "record and the census window is extended in the same cut, so the standing reader reports WITNESSED instead of staying quiet.")

add("NE-02", ["C023", "C024", "C025", "C022"], "GENERALIZES", [
    ev(D, "docs/programs/mechanical-interop-integrity-2026-11-10/README.md",
       "No live joined Claude/Git/Forge Pi receipt, no joined crash restart proof, no compatible distributed lease proof.", "21", "quote"),
    ev(P, "test/workbench-mechanical-evidence-census.test.ts",
       "global absence of a Pi -> Mechanical develop run is NOT CLAIMED by this census (it never concludes one)", "118-119", "quote"),
    ev(P, "test/workbench-mwi-docs-remediation-census.test.ts",
       "Row M050 / EAT-R143 (id at line 1158) replaced \"No Pi-to-Mechanical end-to-end acceptance has been witnessed.\" by \"No Pi-to-Mechanical "
       "end-to-end acceptance receipt exists in either repository.\"", "1157-1168"),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m01/installed-host-l2-receipt.json",
       "The receipt's commands cite stores outside both repositories as evidence locations: an OrchestrationEngineer ledger directory and "
       "/home/jehallad/.forge/ledger.jsonl."),
    ev("shared artifact store, 2026-11-11", "~/s3/artifacts/pi/{owner,owner-review}",
       "Name-only listing: four triage and verdict directories, none named for a joined native run.", kind="probe"),
],
    "The artifact states no detection surface for the unscoped reading. Searched by this lens: both pinned trees (content), the 1210 refs and 285 "
    "worktree HEADs of the local Pi repository for any changed execute-tool.ts (none), and directory names under ~/s3/artifacts/pi. Not searched: "
    "file contents of the shared artifact store, the OrchestrationEngineer ledger, Claude session journals, the Forge ledger, uncommitted "
    "worktree changes, other clones. A name-only listing has little power.",
    "UNDETERMINED",
    "The sentence drops a scope this repository already put in place: remediation row M050 and the EAT-R080 rule that a bounded absence never "
    "concludes a global one.",
    "Global (unscoped) reading only; the scoped verdicts are NE-01, NE-03, NE-04 and NE-06. Missing artifact that would settle it: a search of "
    "the stores the standing census declares unread. Remediation NARROW_SCOPE: name the two repositories and the pins, as M050 does.")

add("NE-03", ["C024"], "DERIVED_FROM", [
    ev(P, "src/workbench/execute-tool.ts", "No joined invocation can exist at the pin or in its ancestry (NE-01, NE-05), so no joined crash or restart trial can.", "215-252"),
    ev(P, "src/index.ts", "Explicit same-machine private host launch or reattachment. Survives Pi disconnect, not host crash.", "2914", "quote"),
    ev(P, "qa/workbench/local-detached-faults.mjs; test/workbench-detached-faults-receipt.test.ts; test/scratch-killed-run.test.ts",
       "Fault and kill evidence exists for Pi script and detached hosts; none names Mechanical."),
    ev(M, "apps/development-rig/test/{effect-intent,effect-settlement-once,post-dispatch-abort}.test.ts; qa/adversarial/forge-gate-faults.ts",
       "Fault evidence exists for the standalone producer; none names a Pi invocation (0 Pi run ids in the tree)."),
],
    "Derivation from the absence of any joined launch (exhaustive over the pin's ancestry), plus the join scan of NE-01 and a token search "
    "(SIGKILL, crash, restart) over tests, QA and receipts of both pins, each hit read as Pi-only or Mechanical-only. Power: a joined trial needs "
    "a Pi run id beside a Mechanical outcome and none exists. Blind: stores outside the two trees.",
    "ESTABLISHED",
    "None between the pin and Mechanical 1be2b8dc.",
    "The single-side fault evidence is baseline and must not be reclassified as missing. The baseline bullets leave out a restart fact that "
    "bears on V5: Pi's registered observation itself does not survive an extension-process restart (NE-15).")

add("NE-04", ["C025"], "SUPPORTS", [
    ev(P, "src/workbench/source-admission.ts", "export class WriterLeases { readonly #held = new Map<string, WriterLease>();", "430-431", "quote"),
    ev(P, "src/workbench/source-admission.ts", "import { lstatSync, readFileSync, realpathSync } from \"node:fs\";", "50", "quote"),
    ev(P, "test/workbench-mechanical-source-admission.test.ts",
       "Writer exclusivity across host processes is NOT CLAIMED by this suite: one WriterLeases registry binds one host's writers.", "225", "quote"),
    ev(P, "src/schedule-store.ts:27,33; src/workbench/hosts/local-detached.ts:273-280; src/workflow/admission.ts:98",
       "Other exclusivity primitives exist for other purposes: a wx lock file for the schedule store (taken over when the recorded pid is not "
       "running), an mkdir reservation of a detached invocation id, and in-memory capacity leases. None is keyed by workspace root."),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m05/installed-pi-consumer-l2-receipt.json",
       "SHAPE ONLY: binding asks intent.writer other than single; a real second concurrent writer process is not exercised (single-writer lock lives outside the facade)", "716", "quote"),
    ev(M, "apps/development-rig/src", "No workspace writer lease: the word lease occurs only in packages/coordination/src/rewrite-inheritance.ts (pure domain data)."),
],
    "Token search for lease, fence and lock primitives (O_EXCL, wx, flock, lockfile) over src of both pins, then reading each hit. Power: a durable "
    "or shared lease store must import a write or lock primitive; the lease module imports none and no other module keys a lock by workspace "
    "root, so no in-repo proof can exist. Blind: coordinators or proofs outside the two trees.",
    "ESTABLISHED",
    "'compatible' is undefined in the corpus. Mechanical's binding carries only intent.writer: \"single\" (host-binding.ts:39,133) and its own "
    "receipt places the single-writer lock outside the facade, so there is no producer-side lease for a Pi lease to be compatible with.",
    "The absence named is not the one the first release turns on. First release needs cross-process same-machine exclusivity and defers "
    "distributed fleets (pi-02 section 4, P02, G07, pi-05 L41). That nearer absence, no cross-process writer lease implemented or proven, is "
    "established by the same surface and by the suite's own NOT CLAIMED line, yet the baseline bullet does not state it. The schedule-store lock "
    "releases on pid-not-running, the liveness-as-release pattern I5 and pi-02 section 4 forbid; it must not be reused as the writer lease.")

add("NE-05", ["C010", "C011", "C008", "C041", "C046"], "ENTAILS", [
    ev(P, "src/workbench/execute-tool.ts", "kind: Type.Union([Type.Literal(\"script\"), Type.Literal(\"function\"), Type.Literal(\"furnace-formula\")]),", "182", "quote"),
    ev(P, "src/workbench/execute-tool.ts",
       "One launcher call site (line 245), inside the else branch of `admission.definition.kind !== \"script\"` (line 217), which refuses "
       "unsupported-definition-kind with \"only script definitions launch in this host\" (line 218).", "215-252"),
    ev(P, "src/index.ts", "The only registration of the tool; it wires launchEmbeddedWorkflow, launchDetachedWorkflow and a resolveSource that reads a saved script path.", "3009-3018"),
    ev(P, "test/workbench-execute-tool.test.ts", "refuses function and furnace-formula definitions in this host without resolving or launching", "173-182", "quote"),
    ev(P, "test/workbench-function-authority.test.ts", "Embedded and detached function requests with the grants held read unsupported-definition-kind.", "1680-1682"),
    ev(P, "git for-each-ref / git worktree list (local Pi repository, 2026-11-11)",
       "execute-tool.ts is the same blob on all 1082 refs that carry it (128 older refs lack the file) and on all 285 worktree HEADs.", kind="probe"),
],
    "Exhaustive reading of the one handler (256 lines) and of every registerTool site in src/index.ts (sixteen tools: twelve workbench tools "
    "and the four subagent tools); pickaxe for any other tool named workflow_execute. Power: complete for the registered tool at the pin, and the two "
    "tests would turn red on any wired function launch. Blind: nothing within the registered tool. A script that itself shells out to "
    "Mechanical would be a different route; none exists in examples/, .pi/ or qa/.",
    "ESTABLISHED",
    "Has held since the tool was added (0645a877, 2026-10-17).",
    "Three scope notes the sentence omits. (1) The refusal a non-script request sees is not always unsupported-definition-kind: a detached "
    "request without workbench:detach is refused missing-detach-grant first (line 215), and one without workbench:execute is refused at "
    "admission. (2) 'Registered' holds only in sessions whose workbench.workflowAgentBackend is \"claude\" and whose native modules load "
    "(src/index.ts:2684); V3 has to state that configuration. (3) The tool description (line 179) does not tell the model that two advertised "
    "kinds are refused, and no MII packet narrows the schema or implements furnace-formula (P11 is Furnace Run ownership, not that kind), so "
    "the schema keeps advertising an unsupported kind after MII unless a requirement says otherwise. P05's red tests collide with the two "
    "standing refusal tests, which have to be amended in the same cut.")

add("NE-06", ["C022", "C077"], "SUPPORTS", [
    ev(M, "apps/development-rig/test/installed-pi-consumer-conformance.test.ts",
       "An external npm project named mw-pi-external-consumer (line 85) installs three packed tarballs and imports only "
       "@mechanical/development-rig/host (line 113); header line 7: \"L2 is fixture callbacks over real packed bytes: never native provider proof.\"", "1-8,85,113"),
    ev(M, "whole tree (703 tracked files)",
       "0 Pi run ids. Outside docs, Pi package spellings occur only in the producer's own guards and their tests (scripts/check-structure.ts:250-278, "
       "apps/development-rig/test/core-no-sdk-guard.test.ts:13) and as a repository URL in one QA baseline, never as an import. workflow_execute "
       "occurs outside docs only as literals of scripts/check-docs-stale-claims.*. "
       "registerTool, defineTool and ExtensionAPI: 0. No spawn of a pi binary. None of the four package.json manifests names a Pi package.", kind="probe"),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m01/installed-host-l2-receipt.json",
       "L2 only: fixture callbacks against real packed tarballs; no Pi registered dispatch, no application-owned bundle (M02), no native Claude or Forge provider proof; the entrypoint status stays descriptor-only.", "169", "quote"),
    ev(M, "qa/integration/evidence/2026-10-15-live-claude-forge-verified.json",
       "A standalone native run (mode live-claude-forge, a Claude session id, a Forge operation id, workspace /tmp/mw-live-pkg-j8e); it names no Pi."),
],
    "A Mechanical test or receipt that ran through registered Pi must load the Pi extension or the Pi coding agent, spawn pi, or record a Pi "
    "invocation id. Surface: import specifiers, manifests, spawn calls and id fields over all 703 tracked files. Power: complete for committed "
    "code and receipts at the pin; the producer's own structure guard would turn red on a Pi import in the core libraries. Blind: receipts held "
    "outside the repository.",
    "ESTABLISHED",
    "Holds unchanged at 1be2b8dc, the companion's stated baseline. The standalone native receipts are dated 2026-10-15 to 2026-10-20, older than "
    "the snapshot's code; the companion says an older L3 receipt does not certify current native runtime (mw-04 L5).",
    "'Those proofs' covers four assets, two of which (develop and the host subpath) are code rather than proofs; the sentence is true of all "
    "four. The fixture's name is the only thing in it that mentions Pi.")

# ---------------------------------------------------------------------------------------------------------------------
# unadopted / process-local / called nowhere
# ---------------------------------------------------------------------------------------------------------------------
add("NE-07", ["C014", "C050", "C107", "C159"], "SUPPORTS", [
    ev(P, "src/workbench/function-authority.ts",
       "export const FUNCTION_ACTION_CONTRACT: FunctionActionContract = Object.freeze({ state: \"unadopted\", blockedOn: FUNCTION_ACTION_BLOCKER });", "145", "quote"),
    ev(P, "git log -S (pickaxe) on the declaration", "Introduced unadopted at 029dabca (2026-11-06) and unchanged since.", kind="probe"),
    ev(P, "src (124 modules)",
       "adoptFunctionActions has no call site outside its definition (line 271); the ADOPTED set (line 231) is fed only there (line 289); the "
       "module is unreachable from src/index.ts (NE-12). The file has no `export default`.", kind="probe"),
],
    "Symbol search over all 124 src modules plus the import closure from the extension entry. Power: an adopted contract object can come only "
    "from adoptFunctionActions, which no production module calls, so none can exist in a production process at the pin. Blind: nothing in src; "
    "tests adopt fixture grants.",
    "ESTABLISHED",
    "'remains' holds over the constant's whole history. 'exported default' is a named export, not an ES default export.",
    "Read with NE-08: the constant is true and is read by nothing.")

add("NE-08", ["C105", "C051", "C065"], "ASSUMES", [
    ev(P, "src/workbench/function-authority.ts",
       "The constant is referenced only at its declaration (line 145) and in a comment (line 106). decideFunctionAuthority reads input.contract "
       "(line 338) and dispatchFunctionWithAuthority takes contract from its options (line 360): a caller-supplied value.", "106,145,338,360"),
    ev(P, "src/workbench/function-authority.ts",
       "adoptFunctionActions accepts 1 to 64 bindings whose grant matches /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/ (line 215), is at most 256 "
       "characters and is outside the workbench: namespace (line 226). mechanical:develop-write qualifies. Nothing checks a ratification artifact.", "215-289"),
    ev(P, "src/workbench/function-authority.ts", "FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch", "106", "quote"),
],
    "Full reading of the 370-line module for every read of the constant and every precondition of adoption. Power: complete for the module.",
    "UNSUPPORTED",
    "",
    "Embedded premise only: that 'unadopted / MW-CONTRACT' is an enforced gate. The normative rows stay NON-EPISTEMIC. At the pin 'ONLY after "
    "MW-CONTRACT ratification' (pi-02 A2) is a convention: a future launcher can call adoptFunctionActions with the candidate spelling and pass "
    "the result in, the exported constant untouched; the module's 'so every function dispatch refuses' is true only of a caller that passes that "
    "constant. Requirement candidate (RISK_CONTROL): bind adoption to a ratified, digest-pinned contract artifact, with a red test that adoption "
    "without it refuses and a census that production holds exactly one adoption site.")

add("NE-09", ["C145"], "SUPPORTS", [
    ev(P, "git grep mechanical:develop-write", "src 0, test 0, qa 0; docs 18, .beads 2.", kind="probe"),
    ev(P, "test/workbench-function-authority.test.ts:249; test/workbench-claude-tool-grants.test.ts:118", "Pi's tests adopt only the fixture grant fixture-fn:develop-write."),
    ev(M, "apps/development-rig/src/host-binding.ts", "export const WRITE_GRANT = \"mechanical:develop-write\" as const;", "14", "quote"),
],
    "Literal search over the whole tracked tree of the Pi pin. Power: complete for the literal spelling.",
    "ESTABLISHED",
    "",
    "Pi's adoption seam has never been exercised with the candidate spelling; the first test that does so is P00 or P03 work.")

add("NE-10", ["C016", "C042", "C043", "C117"], "SUPPORTS", [
    ev(P, "src/workbench/source-admission.ts", "readonly #held = new Map<string, WriterLease>();", "431", "quote"),
    ev(P, "src/workbench/source-admission.ts",
       "The lease is acquired at line 488 and released in a finally block (line 508) once `await dispatch(grant)` (line 505) settles or a later rule refuses.", "488-509"),
    ev(P, "whole tree",
       "`new WriterLeases()` occurs only in test/workbench-mechanical-source-admission.test.ts (lines 541, 593); admitSourceWrite has no call site "
       "in src; the module is unreachable from src/index.ts.", kind="probe"),
    ev(P, "src/workbench/source-admission.ts", "Not wired yet: workflow_execute still refuses a function definition", "45", "quote"),
],
    "Symbol search for instantiation and call sites over the tracked tree, the module's import list (read-only fs functions) and the import "
    "closure. Power: complete; a lease is held only by an instance and no production code creates one.",
    "ESTABLISHED",
    "The state is narrower than 'process-local': it is per instance (two registries in one process do not exclude each other; one registry per "
    "host process is a convention the module does not enforce), and at the pin no Pi process holds any writer lease, for scripts or anything else.",
    "The release-on-settle facet (C043) is entailed by the finally block. Whether that moment equals 'launch return' depends on a caller that does "
    "not exist, so D5 is latent by construction and C044 stays a hypothesis. P02 should make one-registry-per-host an explicit, tested invariant.")

add("NE-11", ["C155", "C154", "C156", "C116"], "CONTRADICTS", [
    ev(P, "src/index.ts",
       "The script launch sites (embedded 2621-2647, detached 2665-2680, workflow_detached 2911-2929, the workflow tool near 3452) call neither "
       "admitSourceWrite nor WriterLeases; no src module does.", kind="probe"),
    ev(D, "docs/programs/mechanical-interop-integrity-2026-11-10/03-IMPLEMENTATION-PACKETS.md",
       "remove lease release from launch-return lifetime for function workflows. Keep existing script helper behavior unless requalified.", "29", "quote"),
    ev(D, "docs/programs/mechanical-interop-integrity-2026-11-10/02-PROTOCOL-AND-RUNTIME.md", "not the existing process-local WriterLeases alone", "28", "quote"),
],
    "Same call-site search as NE-10. Power: complete for src at the pin.",
    "REFUTED",
    "",
    "Refuted facet only: that scripts or any registered path use this lease helper today (stated in the scope of row C155 and presupposed by the "
    "two quoted sentences). The storage and release facets are NE-10. Consequences: 'existing script helper behavior' has no referent in "
    "source-admission.ts, so P02 has to name what it preserves (candidates: src/worktree.ts preservation, the detached host's invocation "
    "reservation); 'remove lease release from launch-return lifetime for function workflows' describes a lifetime no workflow has yet. No "
    "regression test should be written for a script lease that never existed.")

add("NE-12", ["C047", "C108", "C009", "C147", "C167", "C212"], "ENTAILS", [
    ev(P, S + "import_closure.py -> import-closure-pi.json",
       "124 tracked src modules; 107 reachable from src/index.ts (package.json pi.extensions); 17 unreachable, among them function-authority.ts "
       "(no importer), source-admission.ts (no importer), mechanical-descriptor.ts (imported only by mechanical-coordination.ts, for one "
       "constant) and mechanical-coordination.ts (no importer). No unresolved relative specifier.", kind="probe"),
    ev(P, "src/index.ts:3967; src/ui/workflow-menu.ts:208; src/workbench/native-modules.ts:62-69",
       "Every dynamic import in src has a literal specifier. The one path-driven load (src/workbench/hosts/local-detached.ts:476) is not fed by a "
       "registered call site: both pass providers: [] (src/index.ts:2672, 2925)."),
    ev(P, "package.json; package-lock.json; vendor/", "No @mechanical package is a dependency; the only '@mechanical/' text in src is the allowlist entry at src/workbench/mechanical-descriptor.ts:131. src/index.ts holds no 'mechanical' token."),
],
    "Static import graph over every tracked src module (static import, re-export, dynamic import, require; comments stripped), entry = the "
    "extension entry. Type-only imports count as edges, so 'unreachable' is conservative. Power: complete for module-level wiring. Blind: a "
    "runtime load by computed path (one site, read by hand).",
    "ESTABLISHED",
    "The code at the pin equals the gated trunk tip ce180d82 (git diff ce180d82 0fb90672 -- src test qa is empty). Across the 1207 ref tips of "
    "the local repository no further src file is named for Mechanical, functions, leases, fences or hosts; the same holds for Mechanical, "
    "function and lease names across 285 worktree HEADs.",
    "'src/index.ts wires script launchers only' is exact for the workflow_execute wiring. Read over the whole file it is false: index.ts also "
    "registers forge_gate_run (starts a native Forge gate, line 2861), workflow_detached (a second detached script launcher, line 2912) and the "
    "Agent and workflow tools. Keep the sentence scoped to workflow_execute.")

add("NE-13", ["C144", "C017"], "CONFLICTS_WITH", [
    ev(P, "src/workbench/mechanical-coordination.ts",
       "A fourth Mechanical-facing boundary (419 lines, bead wb-0gbh): invokeMechanicalCoordination (line 376) for the reviewed entry "
       "mechanical.coordination.reconcile.v1 (lines 149-150), under its own grant workbench:coordinate (line 136) and authority observation-only "
       "(line 138), with reviewed digests of the producer descriptor and schemas (line 156). No importer in src.", "136-156,376"),
    ev(D, "docs/programs/mechanical-interop-integrity-2026-11-10/README.md",
       "Baseline bullet 2 names mechanical-descriptor.ts, function-authority.ts and source-admission.ts only.", "18"),
    ev(D, "docs/programs/mechanical-interop-integrity-2026-11-10/03-IMPLEMENTATION-PACKETS.md",
       "**Inspect:** src/index.ts, src/workbench/execute*, mechanical-descriptor, function-authority, source-admission, observation, Pi W11, paired Mechanical host.ts/host-binding.ts/host-services.ts.", "17", "quote"),
],
    "File-name and token survey of src for 'mechanical' (ten files match) set against the modules the corpus names. Power: complete for file names.",
    "ESTABLISHED",
    "",
    "Status is for the observation that this boundary exists and is unwired; no listed row changes status. It is one more 'called nowhere' "
    "module, and the corpus that says 'do not reclassify those as missing' does not list it. P12's rule (a separate reviewed id and grant for "
    "pure coordination operations, never development-write) is already realized for one export, with observation-only authority. P00 should add the file to its inspection list and P12 "
    "should extend it, not rebuild it.")

add("NE-14", ["C053", "C213"], "SUPPORTS", [
    ev(P, "git grep over src", "No src file spells verified_candidate, verification_failed or needs_evidence. 'mechanical' is absent from src/index.ts, "
       "observation.ts, observe-query.ts, reconcile-tool.ts, reconcile-decision.ts, control.ts, control-tool.ts and src/workflow/reconcile.ts.", kind="probe"),
    ev(P, "src/index.ts", "workflow_observe looks the task up in workflowTasks by taskId and checks session, workspace and principal.", "2957-2965"),
],
    "Token search over all 124 src modules for the producer's outcome vocabulary and name, plus reading the observe handler. Power: a projection "
    "of Mechanical domain outcomes has to spell or import them; neither occurs.",
    "ESTABLISHED",
    "",
    "Bounded scoped native observation exists (C052) and is not to be reclassified as missing.")

add("NE-15", ["C030", "C029"], "CONTRADICTS", [
    ev(P, "src/index.ts", "const workflowTasks = new Map<string, WorkflowTask>();", "2460", "quote"),
    ev(P, "src/index.ts",
       "The task registry is written at three sites (the embedded launcher near 2637, the workflow tool near 3452, a session-start run near "
       "3610). launchDetachedWorkflow (2665-2680) registers no task, and workflow_observe answers \"Workflow unavailable in this local "
       "operator/session/workspace scope.\" (line 2965) when the registry has no entry or the session differs.", "2460,2621-2680,2957-2965"),
    ev(P, "src/workbench/execute-tool.ts", "observe the launch through workflow_observe", "163,179", "quote"),
    ev(P, "src/index.ts:2461; src/workflow/tool-description.ts:204",
       "The projection is an in-memory object; the session task directory is only written; resume is a new run (resumeFromRunId)."),
    ev(P, "src/workbench/execute.ts", "export const EXECUTE_HOST_MODES: readonly ExecuteHostMode[] = Object.freeze([\"embedded\", \"detached\"] as const);", "19", "quote"),
    ev(D, "README.md:24; 02-PROTOCOL-AND-RUNTIME.md:5; 05-OPERATIONS-AND-HANDOFF.md:41",
       "README puts 'attached or explicitly admitted same-machine execution' in the first vertical; pi-02 says hostMode \"embedded\" for first "
       "cut; pi-05 says 'First: embedded ... Later: attached/detached variants'. The word attached names no host mode in src of either pin."),
],
    "Reading every write to the task registry and the observe handler, and a word search for 'attached' as a mode in src of both pins. Power: "
    "complete for the registered observe route at the pin.",
    "REFUTED",
    "The corpus names WriterLeases as the process-local piece. The task registry and projection behind workflow_observe are process-local as "
    "well and are not listed.",
    "Refuted facets: C030's 'in each host mode' (a detached workflow_execute launch cannot be observed through workflow_observe by its invocation "
    "reference, although the reply tells the model to do that) and C029's 'attached' mode (not a Pi host mode). The narrower proposition is "
    "ESTABLISHED: for an embedded launch, in the same extension process and session, the invocation reference is the task id workflow_observe "
    "accepts. Consequences: 'workflow_observe of the SAME logical invocation' has no existing mechanism outside embedded mode or across a "
    "restart, so P06, P07 and V5 build it; and the first-release placement needs one word across README, pi-02 and pi-05.")

add("NE-16", ["C164", "C214", "C133"], "SUPPORTS", [
    ev(M, "apps/development-rig/package.json", "The exports map holds ./host and ./package.json only.", "13-19"),
    ev(M, "apps/development-rig/src/host.ts",
       "export async function invokeDevelopmentHost(options: DevelopmentHostOptions, input: unknown): Promise<DevelopmentOutcome> {", "52", "quote"),
    ev(M, "apps/development-rig/src/host.ts",
       "DevelopmentHostOptions has artifactPath, artifactDigest, descriptorBytes, descriptorDigest and services: no binding, signal or progress "
       "member. The binding guards are re-exported (line 13) and have no caller in the rig's src outside host-binding.ts.", "13,32-43"),
    ev(P, "src; package.json", "Pi imports no @mechanical package and depends on none (NE-12)."),
],
    "Full reading of host.ts (71 lines) and the exports map, and a call-site search over the rig's src. Power: complete for the installed surface, "
    "which is all Pi may import.",
    "ESTABLISHED",
    "",
    "For C133 the status is for the observation in its scope, not for the proposal. Three absences on the only subpath Pi may consume: the "
    "invocation does not require the mechanical.pi-host/v1 binding, and it carries neither a cancellation nor a progress channel. pi-02 section "
    "8 lists that channel among what Mechanical 'receives'; it has no carrier at the pin and needs an owning Mechanical packet.")

add("NE-17", ["C173"], "SUPPORTS", [
    ev(M, "apps/development-rig/src/effect-intent.ts",
       "Module-level exports exist: openEffectIntent (53), attachEffectRefs (65), settleEffectIntent (103), fileEffectIntentStore (143), readEffectIntent (154).", "53-154"),
    ev(M, "apps/development-rig/src", "readEffectIntent and fileEffectIntentStore have no caller outside effect-intent.ts.", kind="probe"),
    ev(M, "qa/integration/pi-native-interoperability-2026-11-09/m01/installed-host-l2-receipt.json",
       "the deep import @mechanical/development-rig/dist/live-development.js is refused with ERR_PACKAGE_PATH_NOT_EXPORTED", "68", "quote"),
],
    "Module export list, the package exports map and a call-site search over the rig's src. Power: complete for what exists and for what an "
    "installed consumer can reach.",
    "ESTABLISHED",
    "",
    "Established at module level only. None of these symbols is reachable through ./host, the one subpath Pi may import (pi-02 section 8), so "
    "'integrate Mechanical effect-intent lookup' (P07) names a surface that does not exist for a consumer (NE-18).")

add("NE-18", ["C174", "C166"], "ASSUMES", [
    ev(M, "apps/development-rig/src/host.ts", "The export list holds no effect-intent, reconciliation or service-composition symbol.", "13-18"),
    ev(M, "apps/development-rig/src/host-services.ts",
       "createDevelopmentServices (30), developThroughHost (53), projectForgeVerification (70) and describeProducerReceipt (103) have no caller "
       "in the rig's src and are not re-exported by host.ts; one test file uses them.", "30-103"),
    ev("companion program (mw-01, table rows host-services.ts and live-development.ts)", "docs/mw-01-AUDIT-AND-PROOF.md",
       "strict projection not wired to developLive; does not fully enforce required source-tree/environment assurances", "12", "quote"),
],
    "Export list of the one consumable subpath and a call-site search over apps/development-rig/src for each symbol. Power: complete for what an "
    "installed consumer can reach and for production callers in the rig.",
    "UNSUPPORTED",
    "",
    "Embedded premises only: that Pi can today integrate a Mechanical effect-intent lookup (P07) and that a producer host runs the four "
    "callbacks composed from native services (P04 Done, H02). At the pin the lookup is module-internal and the four-callback adapter is "
    "test-only, while the native path in live-development.ts is a separate flow. Each is a Mechanical-owned dependency (pi-05 H02, H04) and "
    "should be a named blocking edge of P04 and P07.")

add("NE-19", ["C012", "C104", "C027", "C088"], "SUPPORTS", [
    ev(P, "src/workbench/mechanical-descriptor.ts",
       "One allowlist entry: id mechanical.development.develop.v1, package @mechanical/workflows-development, export develop, four bindings. "
       "The admitted status is the constant \"descriptor-only\" (line 108). Descriptor of record: Mechanical f7c0a943 (line 16).", "16,108,128-136"),
    ev(P + " + " + M, "test/fixtures/mw-development-entrypoint-v1.json vs contracts/entrypoints/development.v1.json",
       "Byte-identical (sha256 68cc312b...2d0f). The producer file reads \"status\": \"descriptor-only\" (line 16) and its note says \"No remote "
       "host loader or generic invocation transport is implemented.\" (line 17).", kind="probe"),
    ev(P, "src", "No digest of record for the development descriptor or artifact (that sha occurs in docs, .beads and one test only; the only "
       "sha256 literals in src are the three coordination digests). loadMechanicalEntrypoint (line 365) has no caller.", kind="probe"),
],
    "Reading the module, a byte comparison of the two descriptor files and a literal search for the digest. Power: complete for the pins.",
    "ESTABLISHED",
    "",
    "Established: the boundary and the shared id. Two absences ride on it. (1) No production pin: the module checks a pin that a host supplies, "
    "and nothing supplies one. (2) The allowlist reviews the library package @mechanical/workflows-development, not @mechanical/development-rig, "
    "whose ./host subpath pi-02 section 8 says Pi consumes; no Pi allowlist entry, dependency or pin covers the rig or the coordination tarball "
    "that the producer's own L2 receipts install beside it. The producer's descriptor still declares descriptor-only and says no invocation "
    "transport is implemented; changing either changes the pinned digest, so it is a P00 contract decision, and Pi's boundary refuses any other "
    "status today.")

add("NE-20", ["C111"], "SUPPORTS", [
    ev(P, "src/workbench/function-authority.ts",
       "The final decision re-reads host.grants() and host.identity() only (line 366; entry reads at 361-362); the module imports "
       "capability-registry, execute, identity (types) and redaction (lines 129-132), not source-admission.", "129-132,359-368"),
    ev(P, "src/workbench/source-admission.ts", "The source re-measure and attestation re-read after the wait (lines 500-503) read no grant or identity; the module does not import function-authority.", "49-53,498-509"),
],
    "Reading both modules' imports and bodies. Power: complete for the two modules.",
    "ESTABLISHED",
    "",
    "The enumerated coverage on row C111 (grants and identity only; not source, runtime manifest or lease fencing) is established. C048 follows "
    "a fortiori: the two rechecks are never composed at the pin, since neither module imports the other and neither is reachable from the "
    "extension entry.")

# ---------------------------------------------------------------------------------------------------------------------
# negative claims about process: no CI, no tests executed, design only
# ---------------------------------------------------------------------------------------------------------------------
add("NE-21", ["C138", "C035"], "CONTRADICTS", [
    ev(P, ".github/workflows/ci.yml",
       "A CI workflow is configured on push and pull_request to master; its jobs run npm ci, lint, typecheck and test under node-version: 22 "
       "(lines 16, 51, 72). package.json engines require node >=24.", "1-72"),
    ev(M, ".github", "No such directory.", kind="probe"),
    ev(P, "test/workbench-mwi-docs-remediation-census.test.ts",
       "Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge for the primary gate", "1130", "quote"),
    ev(D, "README.md:30; 01-AUDIT-AND-INVARIANTS.md:29; 03-IMPLEMENTATION-PACKETS.md:2; 05-OPERATIONS-AND-HANDOFF.md:38", "The corpus restates the bare form 'No GitHub CI'."),
    ev("local Pi repository, 2026-11-11", "refs/remotes/origin/master", "Points at 3fc0ead1: the deposit is on the remote default branch, the branch the workflow triggers on.", kind="probe"),
],
    "Listing of .github/ in both pinned trees. Power: complete for 'a workflow is configured'; silent on whether GitHub Actions runs it for this fork.",
    "REFUTED",
    "Regression of wording this repository already narrowed (row M047 / EAT-R140).",
    "Refuted reading: the empirical one, for Pi (C138's strong reading; C035 facet v). It holds for Mechanical. The rule reading (do not add or "
    "rely on GitHub CI, C034) is NON-EPISTEMIC and unaffected. The deposit was pushed to master, the branch that workflow triggers on, under a "
    "Node version below the package's engines floor; whether a run happened and what it reported is UNDETERMINED (no run record in the tree). "
    "Remediation: reuse M047's wording.")

add("NE-22", ["C036", "C181"], "SUPPORTS", [
    ev(P + " -> " + D, "git diff --name-status 0fb90672 3fc0ead1",
       "Two commits (91d8fa8c, 3fc0ead1; 2026-11-10 20:22 and 20:27 -08:00): six program files added and .agents/skills/pi-mechanical-interop/SKILL.md "
       "modified. No src, test, qa or receipt path.", kind="probe"),
    ev("mw@1be2b8dc -> mw@6476372f", "git diff --name-status 1be2b8dc 6476372f", "Six program files added and .agents/skills/mechanical-pi-host/SKILL.md modified.", kind="probe"),
    ev(P, "test/workbench-mwi-docs-remediation-census.test.ts",
       "by the authors' account no new test, live integration, Forge gate or benchmark ran in preparation for these docs (the program commit is docs-only)", "1118", "quote"),
],
    "The diff shows what the commits changed, not what the authors ran; neither tree holds an execution record. Power: can show the absence of "
    "committed test artifacts; cannot show the absence of execution.",
    "SUPPORTED",
    "'this design commit' is two commits on the Pi side.",
    "An author report that cannot be verified as activity and is consistent with the docs-only diff. Row M046 / EAT-R139 fixed the warranted "
    "form ('by the authors' account ... the program commit is docs-only'); the corpus states it flat. Not running the gate is also why a gate "
    "effect of the deposit went unseen (NE-23).")

add("NE-23", ["C220", "C226", "C177"], "SUPPORTS", [
    ev(T + ", " + P + ", " + D, S + "remediation_census_replay.py -> remediation-census-replay.json; skill_line_probe2.py -> skill-line-probe2.json",
       "Static replay of the STANDS and ABSENT pins of findingsOf (test/workbench-mwi-docs-remediation-census.test.ts:1263-1283), all 50 rows "
       "parsed from the test file at the pin. Trunk tip ce180d82: 50 clean (positive control; page line counts match the census header). "
       "Inspected revision 0fb90672: 2 red, M049 / EAT-R142 and M050 / EAT-R143 'stands 0 times' (skill line 16, rewritten by master-only commit "
       "4b219f24 on 2026-11-09). Document pin 3fc0ead1: 3 red, adding M048 / EAT-R141 'stands at SKILL:L17'.", kind="probe"),
    ev(P + " -> " + D, "git diff 0fb90672 3fc0ead1 -- .agents/skills/pi-mechanical-interop/SKILL.md", "The deposit inserts three lines above the line the census pins as SKILL:L14.", kind="probe"),
    ev(P, "test/workbench-mwi-docs-remediation-census.test.ts", "expect(findingsOf(row, text), \"the live page\").toEqual([]);", "2415", "quote"),
    ev(P, "vitest.config.ts", "include is test/**/*.test.ts and the census file is not in exclude: it runs in the default tier.", "17,27"),
    ev(P, "qa/workbench/mwi-release.mjs:420; test/fixtures/edc-demand-channel-roster.json:700-701",
       "Two further readers of the skill. The roster's quiet row 'subjectless:demand demands' has no match on master: the word occurs once in the "
       "skill on trunk and not at 0fb90672 or 3fc0ead1 (read, not replayed)."),
    ev("mw@6476372f", S + "mw_stale_literal_probe.py -> mw-stale-literal-probe.json",
       "Failed attack, kept: the twelve literals of Mechanical's scripts/check-docs-stale-claims.ts find 0 hits in the seven files of the Mechanical deposit.", kind="probe"),
],
    "Static replay of the test's own string predicate through git show, validated by the all-clean reading on the tree the gate runs on. Power: "
    "exact for STANDS and ABSENT; the HIDDEN-form check is not replayed, so the replay can only under-count. Not executed: no test was run "
    "(read-only), so effects on other suites are not measured.",
    "ESTABLISHED",
    "Three trees differ on this file: the skill has 35 lines on trunk, 39 at 0fb90672 and 42 at 3fc0ead1.",
    "Status is for C220's premise, that a default-tier census reads the skill by frozen wording and line, with the measured consequence. 'Design "
    "only' does not entail 'gate-neutral': on the branch the program names as its baseline two census rows already read red, and the program's "
    "own deposit adds a third. pi-05 L23 and P10 order further skill edits in every code packet; on trunk each one moves or removes lines the "
    "census pins at L14 and L16. Requirement candidate: a packet that edits the skill, README or the 2026-11-04 program pages replays this "
    "census first and lands the row amendment (the receipt-anchor entry) in the same cut.")

add("NE-24", ["C002", "C229", "C136"], "DEPENDS_ON", [
    ev(P, "git log -1 --format=%p 0fb90672; git merge-base --is-ancestor",
       "Parents 95dcdfce (master) and ce180d82 (tip of workbench/implementation-program, 'ledger: close wb-n40d (landing 1088 ...)'). The trunk "
       "tip is an ancestor of the pin; the pin and the master-only doc commits (4b219f24, the two program deposits) are not ancestors of trunk.", kind="probe"),
    ev("local Pi repository, 2026-11-11", "refs/remotes/origin/HEAD -> origin/master",
       "origin/master is 3fc0ead1, whose first-parent chain is 91d8fa8c then 0fb90672: the inspected revision is on the default branch.", kind="probe"),
    ev(T, "git ls-tree ce180d82 docs/programs/", "Empty: no program directory exists on trunk.", kind="probe"),
    ev(T + " vs " + P, "git diff --name-only ce180d82 0fb90672",
       "880 docs paths, two files under .agents, AGENTS.md, README.md and three new-feedback files differ; no src, test, qa, package or forge path does.", kind="probe"),
],
    "Ancestry and tree diff in the local Pi object store on 2026-11-11. Power: exact for committed history; silent on unpushed work.",
    "ESTABLISHED",
    "Scope note for every Pi baseline row: the code facts are those of the gated trunk tip, while the program documents, the rewritten skill, "
    "README.md and AGENTS.md are master-only.",
    "Status is for C002 (the revision is on the default branch) with a scope the corpus does not state. The absence that matters to implementers: "
    "the MII and MNI program directories do not exist on the branch where beads land, so 'inspecting current main/master and active branches' "
    "(pi-05 L38) and 'update docs/skills ... in the SAME implementation cut' (pi-03 L2) need a stated rule for which branch carries program "
    "documents and how skill edits reach trunk. Other doc-reading suites on master are unmeasured.")

add("NE-25", ["C001"], "SUPPORTS", [
    ev(P + " -> " + D, "git diff --name-status 0fb90672 3fc0ead1", "The deposit changes documents and one skill file only (NE-22).", kind="probe"),
    ev(P, "local Pi repository, 2026-11-11",
       "Across 1207 ref tips and 285 worktree HEADs the only src files named for Mechanical, functions or leases are function-authority.ts, "
       "mechanical-descriptor.ts and mechanical-coordination.ts; execute-tool.ts never differs.", kind="probe"),
    ev(P, ".beads/issues.jsonl", "wb-4bxo (launch authorized embedded functions through the registered Pi tool) is open; wb-xr1z is in_progress."),
    ev(P, "CHANGELOG.md; package.json", "The changelog names neither MechanicalWorkflows, @mechanical nor workflow_execute (its one 'mechanical' is an ordinary adjective, line 41); package version 0.20.0."),
    ev(P, "docs/workbench/mechanical-function-hosting.md", "first-class Pi→Mechanical function invocation not shipped", "3", "quote"),
],
    "Tree diff of the deposit, a blob census of the handler over every ref and worktree HEAD known to this clone, a file-name census under src and "
    "a changelog search. Power: complete for committed state in this clone. Blind: uncommitted work in worktrees; other clones.",
    "ESTABLISHED",
    "",
    "Scoped to the program's packets. Several mechanisms the design asks for exist as baseline and are not implementation of this program: alias "
    "conflict by measured root, re-measure after the admission wait, a final-boundary grant and identity re-read, descriptor digest checks, a "
    "write-ahead journal row for non-read script nodes.")

# ---------------------------------------------------------------------------------------------------------------------
# scope notes, phantom referents, embedded producer premises
# ---------------------------------------------------------------------------------------------------------------------
add("NE-26", ["C122"], "CONTRADICTS", [
    ev(P, "src/workflow/journal.ts", "appendFileSync(path, `${JSON.stringify(entry)}\\n`, \"utf-8\");", "254", "quote"),
    ev(P, "src/workflow/journal.ts",
       "Header: the file is JSON Lines appended as each agent settles (line 43), and a non-read node is appended once before it is dispatched (line 60) so a resume stops on it.", "43-62"),
    ev(P, "src/index.ts",
       "The embedded launcher writes the script and sets a journal path under the session task directory; when that write fails it warns "
       "('could not persist workflow script', line 2631) and launches without a journal.", "2625-2636"),
    ev(P, "src/index.ts:2997; src/workflow/reconcile.ts", "workflow_reconcile reads journal entries with acknowledge and override records."),
],
    "Search of the workflow modules for append and write primitives, and reading journal.ts's header and append site. Power: establishes that a "
    "persisted run journal exists; does not establish crash durability (appendFileSync, no fsync).",
    "REFUTED",
    "",
    "Refuted: the note in the scope of row C122 that no durable journal exists at the pin (the proposal itself is unaffected). What does not exist "
    "is a journal of function invocations, leases or effect intent, a mandatory-persistence rule (the embedded script launcher proceeds when the "
    "write fails, the opposite of pi-02's intent-persist-failed refusal) and fsync-level durability. P07's 'host journal' should say whether it "
    "extends journal.ts, which already has a write-ahead row for non-read nodes, or is new.")

add("NE-27", ["C165"], "ASSUMES", [
    ev(M, "packages/development/src/review.ts", "/** A bounded application review policy; no scheduler, registry or generic DAG. */", "1", "quote"),
    ev(M, "apps/development-rig/src; packages/coordination", "The word scheduler does not occur in the rig's src. The hits under packages/coordination are negations ('no ... scheduler is introduced') and a standing test, test/no-universal-provider-abi.test.ts, that forbids exporting a Scheduler name.", kind="probe"),
    ev("companion program", "docs/mw-README.md", "The deliverable is NOT a general-purpose workflow DSL, arbitrary loader, new scheduler or Pi dependency in Mechanical core.", "7", "quote"),
],
    "Word search over apps/, packages/ and contracts/ at the pin. Power: complete for the literal word.",
    "UNSUPPORTED",
    "",
    "Embedded premise (b) only: 'don't construct a second Mechanical scheduler' (P04) presupposes a first, and the develop path has none and says "
    "so. Reword to 'construct no scheduler'. Low severity; a red test for 'no second scheduler' would have nothing to compare against.")

add("NE-28", ["C210", "C067", "C005"], "CONFLICTS_WITH", [
    ev(D, "04-ADVERSARIAL-VERIFICATION.md", "missing L4/L5 but marked shipped", "61", "quote"),
    ev(D, "04-ADVERSARIAL-VERIFICATION.md", "The Pi ladder defines V0 to V6 and no L tier.", "5-11"),
    ev("companion program", "docs/mw-04-VERIFICATION-AND-RELEASE.md",
       "L3 live Claude/Git/Forge proof from standalone producer; L4 SAME native journey actually invoked via Pi registered workflow_execute(kind=function), with workflow_observe; L5 process death/recovery/concurrency/performance", "5", "quote"),
    ev(M, "docs/programs/pi-native-interoperability-2026-11-09/03-VERIFICATION-AND-RELEASE.md", "L4 joined registered", "15", "quote"),
    ev(M, "docs/08-qa-and-conformance.md", "The standing QA ladder: L3 real SDK integration; L4 Furnace host; L5 adversarial distributed.", "8-10"),
],
    "Reading the tier definitions in the six Pi files, the six companion files and the Mechanical pin's QA document. Power: complete for those files.",
    "UNSUPPORTED",
    "Two L ladders are in play on the Mechanical side: the interoperability ladder of its 2026-11-09 program (restated by the companion and used "
    "by the receipts' evidence_tier) and the standing QA ladder in docs/08. Neither is defined in the Pi corpus, which uses V0 to V6.",
    "Embedded premise only: that the veto can be evaluated from the Pi corpus (and, for this row, 'self-contained', C005). A veto is an absence "
    "test, so its tier names have to resolve. By the Mechanical pin's standing QA ladder 'missing L4' means no Furnace-host run, a "
    "first-release non-goal; by its interoperability ladder it means no joined registered run (Pi V4). Pi V3 (registered route, deterministic callbacks) has no L counterpart "
    "and Mechanical L3 (standalone native, I10's 'older native L3') has no V counterpart, so V3 and L3 are not the same tier. Remediation: "
    "restate the veto in V terms or add the L-to-V map.")

add("NE-29", ["C033"], "SUPPORTS", [
    ev(M, "apps/development-rig/src/live-gate.ts", "if (data[\"gate_passed\"] === false || frame[\"terminal_fact\"] !== \"completed\") {", "205", "quote"),
    ev(M, "apps/development-rig/src/live-gate.ts", "Any other value, an absent gate_passed included, falls through to kind \"passed\", reason FORGE_GATE_PASS.", "196-208"),
    ev(M, "apps/development-rig/src/effect-reconciliation.ts", "return decided(\"writer\", \"not-occurred\", { system: \"git\", kind: \"head-at-base-clean-worktree\", id: head });", "98", "quote"),
    ev(M, "apps/development-rig/src/effect-reconciliation.ts", "retryPermitted: disposition === \"not-occurred\" && evidence !== null", "79", "quote"),
],
    "Direct reading of the two functions at the pin. Power: establishes the code paths; no test was run. The Git check behind the second sees "
    "tracked changes and untracked non-ignored files only (status --porcelain=v1 --untracked-files=all, line 91).",
    "ESTABLISHED",
    "",
    "Facets (i) D1 and (ii) D2 of C033 at mw-69cb016d; facet (iii) D4 was not examined by this lens. Both are negative-evidence defects in "
    "producer code: the first reads a missing negative as a positive, the second reads no visible Git change as no effect and grants retry. They "
    "are the premises of G01 and of G04/G05 and should be cited with these lines; the README gives labels only.")

add("NE-30", ["C056", "C216", "C217"], "SUPPORTS", [
    ev(P, "docs/workbench/feature-matrix.md",
       "No binding host exists (re-measured 2026-11-06 at trunk 814dcdd by wb-j5y5, EAT-R082): no module under src/workbench/hosts/ names MechanicalWorkflows, and test/workbench-mwi-release.test.ts holds this statement to that directory.", "112", "quote"),
    ev(P, "src/workbench/hosts/", "furnace-hosted.ts and local-detached.ts; neither spells 'mechanical'.", kind="probe"),
],
    "The row states its own surface (the hosts directory) and a test holds it. Power: detects a host module under src/workbench/hosts that names "
    "MechanicalWorkflows. Blind: a function host placed elsewhere (P04 speaks of a 'native loader seam/host adapter', P02 of an adapter 'under "
    "src/workbench/') or one that never spells the product name.",
    "ESTABLISHED",
    "The row's inventory of src files matching 'mechanical' (two files at 814dcdd) is stale at the pin, where ten files match and four are "
    "Mechanical-facing boundaries.",
    "P10 has to re-point this detector when it changes W11; otherwise 'No binding host exists' can stay green beside a working host.")

add("NE-31", ["C134", "C035"], "SUPPORTS", [
    ev(M, "packages/development/package.json; packages/coordination/package.json; apps/development-rig/package.json",
       "The two libraries declare no dependencies; the rig depends on the two @mechanical packages only."),
    ev(M, "scripts/check-structure.ts",
       "LIBRARY_PROVIDER_IMPORT_FORBIDDEN is asserted over packages/development/src and packages/coordination/src with the Pi family spelled "
       "out (@earendil-works/pi-, @tintinweb/pi-subagents, pi-subagents).", "247-278"),
    ev(M, "whole tree", "No code file imports a Pi package (NE-06); no reference to Library in src or manifests.", kind="probe"),
],
    "Manifest read, an import-specifier scan of all tracked code and the producer's standing guard. Power: complete for static imports and "
    "declared dependencies in the core libraries; the rig is outside the producer's guard and inside this scan.",
    "ESTABLISHED",
    "",
    "C035 facets (ii) and (iii) and the Pi-import facet of C134. The detection surface recorded on row C134 ('pi-subagents, @pi/ and bare pi') "
    "does not name Pi's real package scopes (@tintinweb/pi-subagents; host @earendil-works/pi-coding-agent); replace it with the guard's list.")

add("NE-32", ["C219"], "SUPPORTS", [
    ev(P, "package.json", "No bin, main, exports or files member; \"pi\": {\"extensions\": [\"./src/index.ts\"]}; name @tintinweb/pi-subagents."),
    ev(D, "04-ADVERSARIAL-VERIFICATION.md", "Assert each remains separately inspectable in Pi UI, tool replies, CLI output and journal.", "36", "quote"),
    ev(D, "04-ADVERSARIAL-VERIFICATION.md", "Validate operator docs/skills/example transcripts against the actual built CLI.", "53", "quote"),
    ev(M, "apps/development-rig/package.json", "The rig has a bin, mechanical-development-rig.", "10-12"),
],
    "package.json members at both pins. Power: complete.",
    "ESTABLISHED",
    "",
    "The absence (C219) is established. The premise in pi-04 that a Pi CLI output and a 'built CLI' exist to assert against is UNSUPPORTED for "
    "this package (bears on C205): the only CLIs in play are the host pi binary, a peer dependency, and Mechanical's rig CLI, and the "
    "verification steps have to name which.")

add("NE-33", ["C225"], "SUPPORTS", [
    ev(P, "src/workbench/execute.ts", "if (launchStatus === \"launched\" && reportedRefs.length === 0) return fail(\"A launched reply requires at least one native reference.\");", "279", "quote"),
    ev(P, "src/workbench/execute.ts", "export type LaunchStatus = \"accepted\" | \"launched\" | \"refused\";", "58", "quote"),
],
    "Reading buildWorkflowExecuteReply. Power: complete.",
    "ESTABLISHED",
    "",
    "At the pin a launched reply with empty nativeRefs cannot be built; accepted is the existing status that permits none. The illustration at "
    "pi-05 L11-18 needs that reconciliation before a test copies it.")

add("NE-34", ["C028"], "CONTRADICTS", [
    ev(P, "git grep git-census-v1 / plain-v1", "src 0, test and qa 0; docs 147 and 100.", kind="probe"),
    ev(M, "apps/development-rig/src/host-binding.ts", "export const EVIDENCE_PROFILES = [\"git-census-v1\", \"hx-task-scope-v1\"] as const;", "11", "quote"),
    ev(M, "apps/development-rig/src",
       "evidenceProfile and contextProfile occur in host-binding.ts (validation of a binding that no production path consumes, lines 118-119) and "
       "invocation-identity.ts (hashed identity axes) only; live-development.ts reads neither.", kind="probe"),
    ev(P, "test/workbench-mwi-docs-remediation-census.test.ts", "Row M049 / EAT-R142 (id at line 1146): \"no selectable profile ships\".", "1145-1156"),
],
    "Literal search over src and tests of both pins and reading the two Mechanical modules. Power: complete for the spellings; shows that no "
    "code branches on a profile value.",
    "REFUTED",
    "",
    "Refuted facet: a code witness in Pi (there is none; the row asks for one verdict per repository). The Mechanical facet (also C093) is "
    "ESTABLISHED as labels only: two validator constants, a JSON schema and an identity axis. Nothing at either pin selects discovery or context "
    "behaviour by profile, so 'git-census-v1/plain-v1' in the release definition names a pair that is validated, not selectable; M049's 'no "
    "selectable profile ships' still describes the snapshot.")

add("NE-35", ["C003", "C087"], "SUPPORTS", [
    ev("companion program", "docs/mw-README.md", "**Source baseline:** MechanicalWorkflows 1be2b8dc7e1e852fd35f9b6e3347386377c3f371; Pi-subagents 0fb9067262532289104417d2b7f2f25704563a75 before Pi design commit.", "3", "quote"),
    ev(M + " -> mw@1be2b8dc", "git log 69cb016d..1be2b8dc; git diff --stat",
       "One commit (2026-11-11T03:54:09Z) changing two test titles in apps/development-rig/test/host-services.test.ts and one line of "
       "docs/programs/pi-native-interoperability-2026-11-09/04-IDENTIFIER-MAPPING.md. The Mechanical deposit 6476372f follows it.", kind="probe"),
],
    "Commit-range diff. Power: complete.",
    "ESTABLISHED",
    "The two programs name different Mechanical baselines: the Pi README pairs 69cb016d, the companion states 1be2b8dc.",
    "Failed attack, kept: an absence true at one baseline might fail at the other. Not reproduced: the one intervening commit touches no source, "
    "manifest, export or receipt, and 'an additional main commit' is exactly one. Every Mechanical-side negative verdict of this lens holds at both.")

add("NE-36", ["C171"], "ASSUMES", [
    ev(P + " + " + M, "git grep over code (Pi src, test, qa; Mechanical apps, packages, contracts, scripts, qa)",
       "0 occurrences of strict-native, legacy-weak, legacy-observed, candidate-bound-native or VerificationCertificate.", kind="probe"),
    ev(M, "apps/development-rig/src/live-gate.ts", "const DESCRIPTOR_BINDING: GateBinding = { commit: \"descriptor\", gateDefinition: \"descriptor\", environment: \"descriptor\" };", "52", "quote"),
    ev(M, "apps/development-rig/src/live-gate.ts",
       "The existing distinction is a three-axis binding annotation: gateDefinition native or descriptor (line 59), environment established or "
       "descriptor (line 61), commit supplied by pin resolution.", "55-62"),
    ev("companion program", "docs/mw-01-AUDIT-AND-PROOF.md", "descriptor / legacy-observed / candidate-bound-native / strict-native", "35", "quote"),
    ev(D, "02-PROTOCOL-AND-RUNTIME.md", "strict-native, legacy-weak, unknown", "36", "quote"),
],
    "Literal search over the code of both pins and reading the binding annotation in live-gate.ts. Power: complete for the spellings.",
    "UNSUPPORTED",
    "The two programs spell the tiers differently: three values with legacy-weak in the Pi corpus, four with legacy-observed and "
    "candidate-bound-native in the companion.",
    "Embedded premise only: that Mechanical at the snapshot has a strict versus legacy-weak certificate distinction under those names. What "
    "exists is a three-axis binding annotation and no certificate type; the assurance words are proposals with no code witness at either pin. "
    "P06 cannot test 'strict/weak/unknown' against a producer vocabulary until P00 fixes one spelling for both repositories.")

# ---------------------------------------------------------------------------------------------------------------------
claims = {}
for path in sorted(glob.glob(os.path.join(HERE, "claims-*.jsonl"))):
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            if line.strip():
                row = json.loads(line)
                claims[row["id"]] = row
problems = []
seen = set()
for row in F:
    if row["id"] in seen:
        problems.append("duplicate id " + row["id"])
    seen.add(row["id"])
    if row["proposedStatus"] not in STATUSES:
        problems.append(row["id"] + ": status " + row["proposedStatus"])
    for cid in row["claimIds"]:
        if cid not in claims:
            problems.append(row["id"] + ": unknown claim " + cid)
    for key in ("relation", "detectionModel", "note"):
        if not row[key].strip():
            problems.append(row["id"] + ": empty " + key)
    if not row["evidence"]:
        problems.append(row["id"] + ": no evidence")
if problems:
    print("\n".join(problems))
    sys.exit(1)
out = os.path.join(HERE, "lens-negative-ev.jsonl")
with open(out, "w", encoding="utf-8") as fh:
    for row in F:
        fh.write(json.dumps(row, ensure_ascii=False) + "\n")
by_status = {}
for row in F:
    by_status[row["proposedStatus"]] = by_status.get(row["proposedStatus"], 0) + 1
covered = sorted({cid for row in F for cid in row["claimIds"]})
print(json.dumps({"file": out, "count": len(F), "byStatus": by_status, "claimsCovered": len(covered)}, indent=1))
