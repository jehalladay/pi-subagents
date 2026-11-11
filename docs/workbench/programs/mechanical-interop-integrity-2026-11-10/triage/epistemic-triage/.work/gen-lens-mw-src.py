"""Generator for lens-mw-src.jsonl (Phase 3 wave-1 blind lens 'mw-src', MII triage 2026-11-11).
Run: python3 -I gen-lens-mw-src.py   (writes lens-mw-src.jsonl beside this file and validates claim ids)
Evidence path conventions used in the rows:
  mw@69cb016d:<path>:<lines>  = file in pins/mw-69cb016d (MechanicalWorkflows env pin, HEAD 69cb016dd293a17bcc893f2baf410a51c226f4c9)
  pi@0fb90672:<path>          = file in pins/pi-0fb90672
  PROBE/<file>                = epistemic-triage/.work/lens-mw-src-probe/<file> (scratch copy, scripts and captured outputs of this lens)
"""
import glob, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
LENS = "mw-src"
F = []

def row(claimIds, relation, evidence, detectionModel, proposedStatus, drift, note):
    F.append({"lens": LENS, "claimIds": claimIds, "relation": relation, "evidence": evidence,
              "detectionModel": detectionModel, "proposedStatus": proposedStatus, "drift": drift, "note": note})

EXEC = ("execution on a scratch copy of the pin (PROBE/copy-69cb016d = git archive of 69cb016d, built with the lock-pinned tsc 5.9.3; "
        "node v22.23.2 runner, node v24.20.0 fixture/consumer, linux x86_64; temp and npm cache under .work; no repository written)")

# ---------------------------------------------------------------- core function
row(["C018"], "SUPPORTS",
    "mw@69cb016d:packages/development/src/develop.ts:21-24 `export async function develop(services: DevelopmentServices, request: DevelopmentRequest): Promise<DevelopmentOutcome>`; "
    "develop.ts:1-3 imports only types from ./contracts.js; contracts.ts:47-52 DevelopmentServices has exactly discover, compileContext, implement, verify; contracts.ts:54-58 DevelopmentOutcome is a four-kind union; "
    "index.ts:1 exports develop. Executed: the pin's own host suite passes 123/123 (PROBE/out/host-suite-node22.tap, incl. 'the four services run in order exactly once' and 'four-arm witness'); "
    "an external tarball-installed consumer runs develop with each of the four callbacks exactly once (PROBE/out/m05-observations-node22runner.json, row positive-control). "
    "Producer-side: ~/.forge/ledger.jsonl holds three root-gate rows gate_verdict PASS for gated_commit 69cb016d / gated_tree 1383cae6 (PROBE/out/forge-ledger-corroboration.txt).",
    "V0 complete read of develop.ts, contracts.ts, index.ts at the pin, plus " + EXEC + ", plus a parse of the Forge ledger by gated_commit. Complete for signature and type contract; behavioural only for the paths the cited tests drive.",
    "ESTABLISHED",
    "'Ordinary' holds (plain exported async function, services injected as an argument). The companion's stronger word 'pure' (mw-README:19) is not entailed: develop() awaits caller callbacks that perform the effects. The clause 'its return value is the domain result workflow_observe must show unchanged' is a release target, not part of this observation.",
    "Core semantics are weaker than the outcome definitions in pi-04: develop.ts:57-65 returns verified_candidate for any verification whose verdict is 'passed' and whose evidence ref has nonblank system/kind/id. Native gate-definition, tree and environment checks are not in the core (see the C205 row).")

row(["C124", "C215"], "SUPPORTS",
    "mw@69cb016d:packages/development/src/contracts.ts:54-58 (verified_candidate | verification_failed | needs_evidence | indeterminate, no fifth member); develop.ts:34-74 has nine return sites (lines 34, 37, 42, 50, 55, 63, 65, 68, 70), each one of those four kinds; "
    "needs_evidence returns at develop.ts:36-38 before compileContext, implement or verify is called; verification_failed (develop.ts:67-69) and indeterminate (develop.ts:70-74) are separate arms. "
    "mw@69cb016d:apps/development-rig/src/live-gate.ts:210-223 classifies a native red only when gate_verdict FAIL, status error, disposition FAILED, terminal_fact failed and the candidate pin all agree; anything else is indeterminate. "
    "Executed: host-services.test.ts 'four-arm witness: each domain outcome is produced and returned unchanged' passes (PROBE/out/host-suite-node22.tap).",
    "V0 read of the union and of every return statement in develop(); " + EXEC + ". Exhaustive for develop(); adapters that wrap develop() can still throw typed errors instead of returning an outcome (developLive refusals), which is outside the union.",
    "ESTABLISHED",
    "C215's second half ('those types do not prove native provider composition through the Pi tool') is also correct: nothing at the pin composes these callbacks behind the ./host export (see the surface row for C133).",
    "Thrown refusals (INVALID_DEVELOPMENT_REQUEST TypeError at develop.ts:9-13; DevelopmentAbortedAfterDispatchError, DevelopmentLostAcknowledgementError in developLive) are a fifth observable result class that the 'four domain results' wording does not cover; an observation bridge has to carry them without mapping them onto indeterminate or failed.")

row(["C205", "C063"], "CONFLICTS_WITH",
    "pi-04:36 defines verified_candidate as 'passed producer gate on matching candidate commit/tree with valid native gate-definition and required execution evidence'. At the pin the producer's meaning is narrower: "
    "mw@69cb016d:packages/development/src/develop.ts:57-65 (verdict 'passed' + nonblank evidence ref) and mw@69cb016d:apps/development-rig/src/live-development.ts:387 (verify maps forge.kind==='passed' straight to verdict 'passed'). "
    "Executed end to end: developLive with an injected writer and an injected Forge connection answering a PASS frame that has no data.gate_passed, no gate_definition, no execution_environment and no tree statement returns workflow.kind 'verified_candidate' "
    "with binding {commit:native, gateDefinition:descriptor, environment:descriptor} (PROBE/out/legacy-pass-e2e-probe.jsonl; script PROBE/scripts/legacy_pass_e2e_probe.mjs).",
    "V0 read of both mapping sites + " + EXEC + " through developLive's public injection seams (options.agent, options.connectForge). The Forge frame is synthetic; the producer code path is the real built dist.",
    "NON-EPISTEMIC",
    "pi-04 presents its four definitions as the domain outcomes ('Assert each remains separately inspectable'), while I9 says Mechanical owns develop() semantics and pi-02:36 says the domain result stays unmodified. The pi-04 wording is a target semantics, not the producer's semantics at 69cb016d.",
    "PREMISE-SPLIT: 'a verified_candidate emitted by the paired producer already implies native gate-definition/tree/environment evidence' => REFUTED at mw-69cb016d (executed). Consequence for compilation: 'domain result unmodified' (pi-02:36) and 'no false Forge verification' (README purpose, I6) can only both hold once the producer changes its own projection (mw-03 H01) or Pi's assurance axis is made mandatory beside every verified_candidate; pi-03 gives P06 no producer dependency.")

row(["C090"], "SPECIALIZES",
    "mw@69cb016d:packages/development/src/contracts.ts:14-18 (DevelopmentRequest = task, workspaceId, baseRevision); develop.ts:9-13,25-27 throws TypeError 'INVALID_DEVELOPMENT_REQUEST: <name> must be a nonempty string'. "
    "The shipped host path is closed at run time for own enumerable keys: mw@69cb016d:apps/development-rig/src/entrypoint-host.ts:77-83 refuses unless Object.keys(input).length === 3 and all three are nonblank strings; "
    "mw@69cb016d:contracts/schemas/development-request.v1.schema.json has additionalProperties:false. Executed against the built ./host: an input with an extra enumerable `notes` is refused HostAdmissionError ENTRYPOINT_INPUT_INVALID with zero callbacks; "
    "an input carrying a NON-enumerable `notes` getter is admitted and the callbacks receive the caller's own object (identity preserved, member present); an enumerable accessor on `task` is admitted and the implement callback reads a different task than admission read (PROBE/out/host-probe.jsonl rows input-*).",
    "V0 read + " + EXEC + " (PROBE/scripts/host_probe.mjs imports the built dist/host.js).",
    "ESTABLISHED",
    "C090's last clause ('a TypeScript type, not a runtime-closed record') is true of core develop() only. Through @mechanical/development-rig/host the request is already runtime-closed for own enumerable members, so pi-02 §2.3 'closed members' is partly present on the producer side; what is absent is copying/canonicalization and accessor refusal.",
    "The producer forwards the caller's object by reference (entrypoint-host.ts:82 `return v as unknown as DevelopmentRequest`, then develop(options.services, request)). Pi cannot rely on the producer to snapshot or canonicalize: the accessor TOCTOU and the hidden-member carrier both reach the callbacks today. createDevelopmentServices (host-services.ts:30-50) would catch a changed task (HOST_REQUEST_MISMATCH) but is not wired into host.ts.")

row(["C080"], "SPECIALIZES",
    "pi-01:32 counterexample: input {task:'X', notes:'untrusted'} 'passed through unchanged to a naive launcher. Assert exact canonical bytes at the Mechanical callback.' Executed against the built ./host at the pin: that literal object is refused "
    "ENTRYPOINT_INPUT_INVALID before any callback (it also lacks workspaceId/baseRevision); the same holds for {task,workspaceId,baseRevision,notes} with an enumerable notes member (PROBE/out/host-probe.jsonl rows 'input-task-and-notes-only' and 'input-extra-enumerable-notes'). "
    "A note carried as a non-enumerable getter is admitted and is present on the object the discover callback receives (row 'input-nonenumerable-notes-getter').",
    EXEC + ". Scope: the producer boundary only; whether Pi's launcher structure hands raw params.input onward is a Pi-side fact outside this lens.",
    "PLAUSIBLE",
    "As written the counterexample cannot be observed 'at the Mechanical callback' through the shipped host: a plain note member produces a refusal (digest admitted over the stripped form, producer refuses the raw form), not a leak. The leak shape exists only for carriers the closed-key check does not see (non-enumerable or accessor members).",
    "For the red tests G08 and the 'poisoned note getter' obligation: assert at Pi's dispatch boundary (bytes handed to the host adapter), and use a non-enumerable/accessor carrier for the producer-side leg; an enumerable-note test at the producer is green on arrival and proves nothing about D3.")

# ---------------------------------------------------------------- host subpath
row(["C019", "C073"], "SUPPORTS",
    "mw@69cb016d:apps/development-rig/package.json:13-20 exports {'./host': {types:'./dist/host.d.ts', import:'./dist/host.js', default:'./dist/host.js'}, './package.json'}; :21-24 files ['dist','README.md']; :4 private:false. "
    "Dating (PROBE/out/git-facts.txt): the exports key is absent at 62a10b59 (commit 2026-11-09T06:13:13Z, the MNI env pin); `git log -S'\"./host\"'` finds one introducing commit, 24ef8984450bfeef0fd1d4a6b714f3c844fb6248 "
    "(author 2026-11-09T23:25:32Z, committer 2026-11-09T23:57:34Z, bead MechanicalWorkflows-loexn.5), 18 commits after 62a10b59; the manifest blob 5a4f7462 is unchanged from that commit through 0ffdc844. "
    "Producer-side: Forge ledger row op-8b6cf0cb874642d2bc85e0020dcac730, build, gate_verdict PASS, gated_commit 24ef8984, 2026-11-10T00:00:38Z (PROBE/out/forge-ledger-corroboration.txt). "
    "Executed at the pin copy: a fresh `npm pack` of the rig lists dist/host.js and dist/host.d.ts among 182 files (PROBE/out/m05-digest-probe-node24.json); an external npm project that installs only the three packed tarballs imports '@mechanical/development-rig/host', "
    "which resolves to <consumer>/node_modules/@mechanical/development-rig/dist/host.js (PROBE/out/installed-consumer-surface-probe.jsonl; pin test 'ok 104' in PROBE/out/host-suite-node22.tap).",
    "V0 read of the manifest at both revisions, git pickaxe over the ancestry of the pin, " + EXEC + ", and the producer-side Forge ledger. Registry publication was not probed (no registry query made).",
    "ESTABLISHED",
    "'Shipped' is warranted in this sense only: landed on main, declared in the export map, present in the packed tarball, importable from a tarball-installed external consumer. No evidence of registry publication exists at the pin (no publishConfig; docs/12 speaks of locally produced npm tarballs); that reading is UNDETERMINED (missing artifact: a registry record or release tag).",
    "The MNI finding (subpath absent at 62a10b59) and this claim are both correct for their pins; the change landed about 17.7 hours after the MNI pin. At 69cb016d the pin's own skill still says the opposite (see the stale-skill row for C019/C073).")

row(["C134"], "SUPPORTS",
    "Export map: only './host' and './package.json' (mw@69cb016d:apps/development-rig/package.json:13-20). Module surface: host.ts:13-15,18,21-30,52 export HostBindingError, WRITE_GRANT, admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding, HOST_API_VERSION, HostAdmissionError, invokeDevelopmentHost. "
    "Executed from a tarball-installed consumer: Object.keys of the imported subpath = exactly those eight names; the bare specifier '@mechanical/development-rig' fails ERR_PACKAGE_PATH_NOT_EXPORTED (PROBE/out/installed-consumer-surface-probe.jsonl). "
    "No Pi import: the only non-relative static specifier under packages/development/src (6 files) and packages/coordination/src (84 files) is node:crypto, with zero dynamic import() sites (PROBE/out/static-scans.txt S1); "
    "mw@69cb016d:scripts/check-structure.ts:248-278 enforces it (LIBRARY_PROVIDER_IMPORT_FORBIDDEN names @earendil-works/pi-*, @tintinweb/pi-subagents, pi-subagents) and the script passes at the pin copy (PROBE/out/check-structure.out); apps/development-rig/test/core-no-sdk-guard.test.ts (EAT-R024) guards the core manifest and compiled dist against Pi, Furnace, Forge and Claude SDK names and passes inside the 123/123 host suite.",
    "Complete specifier census by regex over every .ts under the two core src trees (static from/import and import( sites), the repo's own structure gate executed on the scratch copy, and an import probe from an installed consumer. The census does not see a specifier assembled at run time; the structure gate counts a non-literal import in packages/coordination as a violation.",
    "ESTABLISHED",
    "The structure rule covers the two libraries only; apps/development-rig is explicitly outside it (check-structure.ts:252-253). The rig has no Pi import today (PROBE/out/static-scans.txt S2) but nothing forbids one.",
    "DevelopmentServices = exactly four callbacks is also established (contracts.ts:47-52). The enforced binding list on the host path is entrypoint-host.ts:33; HOST_SERVICE_NAMES lives in host-services.ts, which is not reachable through the export map.")

row(["C133", "C166", "C227"], "ASSUMES",
    "Runtime closure of the shipped entry: dist/host.js -> installed-host.js -> entrypoint-host.js, plus host-binding.js; external specifiers are node builtins only; that is 4 of the 60 dist modules (PROBE/out/host-closure.txt). "
    "From a tarball-installed consumer every other module is closed: './host-services', './dist/host-services.js', './dist/effect-intent.js', './dist/effect-reconciliation.js', './dist/live-development.js' all fail ERR_PACKAGE_PATH_NOT_EXPORTED (PROBE/out/installed-consumer-surface-probe.jsonl). "
    "host-services.ts exports (createDevelopmentServices, developThroughHost, projectForgeVerification, describeProducerReceipt, HOST_SERVICE_NAMES) have exactly one consumer in the repository, test/host-services.test.ts (PROBE/out/static-scans.txt S7). "
    "DevelopmentHostOptions (host.ts:32-43) has no signal, progress, binding, lease or effect-store member; cancellation and progress exist only on developLive (live-development.ts:82; claude-implement.ts:51).",
    "Static closure walk of the built dist plus import attempts from an installed external consumer (" + EXEC + "). Complete for static imports of the four closure modules.",
    "NON-EPISTEMIC",
    "pi-02 §8 ('Pi consumes only @mechanical/development-rig/host ... Mechanical receives trusted host binding + constrained four service callbacks and a cancellation/progress channel') reads as if the subpath already carried those channels. At the pin it carries a fixture-callback admission facade: digest checks, a transient npm install, import of develop, a shape validator and a grant helper.",
    "PREMISE-SPLIT: 'the surfaces P04-P08 need (native services, strict projection, effect intent/reconciliation, progress, cancellation) are reachable through the only subpath Pi may import' => REFUTED at mw-69cb016d (executed). Every one of them is a producer change (mw-03 H01-H07) that must also widen what ./host exports; pi-03's P04 'Done: actual MW producer host runs exact four callbacks' is satisfiable today only with caller-supplied fixture callbacks.")

row(["C133"], "CONFLICTS_WITH",
    "pi-02:47 says 'Mechanical receives trusted host binding + constrained four service callbacks', i.e. the caller hands the four callbacks in, which is the shape that exists at the pin (mw@69cb016d:apps/development-rig/src/host.ts:41-42 'services: DevelopmentServices ... Exactly the four application callbacks'). "
    "pi-05:31 (H02) says the producer supplies 'production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate', and mw-02 §1/§2 (H4) says the composed call 'constructs the four services and only then enters pinned develop()'.",
    "Read of the three passages against the shipped signature. Document-level conflict; the code witness fixes only what exists today.",
    "NON-EPISTEMIC",
    "Two incompatible ownership models for the callbacks appear in one corpus: Pi-supplied (pi-02 §8, matching the shipped ABI) and producer-constructed (pi-05 H02, mw-02). They differ in who runs the Claude SDK: Pi declares @anthropic-ai/claude-agent-sdk 0.3.300 itself (pi@0fb90672:package.json), while the rig resolves the SDK at run time from whatever the host installed.",
    "Needs an explicit P00 decision before P04/P05 can be cut; the answer changes which repository owns the writer session, its receipts and the SDK version pin.")

row(["C173"], "CONTRADICTS",
    "mw@69cb016d:apps/development-rig/src/effect-intent.ts:143-159 exports fileEffectIntentStore(path) (one file at a caller-chosen path) and readEffectIntent(path); EffectIntentRecord (effect-intent.ts:23-37) carries intentId and invocationIdentitySha256 but no Pi invocation id; "
    "effect-reconciliation.ts:86 reconcileUncertainEffect has no caller in src (PROBE/out/static-scans.txt S7: 0). Neither module is in the export map: importing them from a tarball-installed consumer fails ERR_PACKAGE_PATH_NOT_EXPORTED (PROBE/out/installed-consumer-surface-probe.jsonl). "
    "The rig CLI passes no store, so nothing is recorded on the standalone path (mw@69cb016d:.agents/skills/mechanical-pi-host/SKILL.md, 'Disclosed limits').",
    "V0 read of both modules, grep for callers across apps/ packages/ scripts/ qa/, and an import probe from an installed consumer (" + EXEC + ").",
    "UNSUPPORTED",
    "'Mechanical exports an effect-intent store/reader' is true of module exports and false of package exports; 'lookup' has no witness at all: there is a path-addressed single-file reader, no index by invocation.",
    "Applies to the Mechanical half of C173 (the premise that P07 has a producer 'effect-intent lookup' to integrate). The module-level existence of the named functions is established; an integrable lookup keyed by Pi invocation is not, and depends on mw-03 H02/H07 plus an export.")

row(["C214"], "SUPPORTS",
    "mw@69cb016d:apps/development-rig/src/host.ts:52-71 invokeDevelopmentHost(options, input) checks the descriptor digest, parses the descriptor and calls invokeInstalledDevelopment; no parameter or code path reads a host binding. "
    "host-binding.ts:99-135 validateHostBinding is a shape validator: allowedEffects only has to be an array of nonblank strings (:124) and workspaceRealpath only has to match /^\\/[^\\0]*$/ (:113). "
    "Executed: validateHostBinding accepts allowedEffects ['rm -rf /','publish-everything','anything goes'] and a workspace path that does not exist; dispatchWriteAtFinalBoundary runs the writer when the grant was absent at admission and is present now, and refuses WRITE_GRANT_REVOKED when it was admitted and is gone (PROBE/out/host-probe.jsonl).",
    "V0 read + " + EXEC + ".",
    "ESTABLISHED",
    "pi-05:30 words H01 as '@mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding', which in isolation reads as present tense; at the pin the binding guards are exported beside the invocation, not required by it. C214 states this correctly.",
    "The two committed fixtures spell allowedEffects differently: host-binding.test.ts:23 uses [WRITE_GRANT] ('mechanical:develop-write'), installed-pi-consumer-conformance.test.ts:139 uses ['develop-write']. The effect vocabulary is unratified even inside the producer.")

# ---------------------------------------------------------------- binding / profiles / ratification
row(["C087", "C093"], "SUPPORTS",
    "mw@69cb016d:apps/development-rig/src/host-binding.ts:9 HOST_BINDING_CONTRACT = 'mechanical.pi-host/v1'; :10 HOST_BINDING_DESCRIPTOR_ID = 'mechanical.development.develop.v1'; :11 EVIDENCE_PROFILES = ['git-census-v1','hx-task-scope-v1']; "
    ":12 CONTEXT_PROFILES = ['plain-v1','rf-committed-v1']; :13-14 WRITE_GRANT = 'mechanical:develop-write' commented 'Candidate grant spelling, not yet adopted jointly with Pi'; :19-42 MechanicalHostBindingV1 with source {workspaceRealpath, baseCommit, baseTree, forgeManifestSha256}, invocationId, both profiles, intent.writer 'single'; "
    ":2-6 'Proposed ... the status stays descriptor-only until an invocable package has separately passed joint ratification with Pi'. mw@69cb016d:contracts/schemas/mechanical-host-binding.v1.schema.json mirrors it (required list, additionalProperties false, same enums). "
    "First commit of the module: 6c287304, 2026-11-09T22:53:09Z, after the MNI pin (PROBE/out/git-facts.txt). Executed: host-binding.test.ts passes inside the 123/123 host suite.",
    "V0 read of the module and schema at the pin; " + EXEC + ".",
    "ESTABLISHED",
    "Inside the producer the status wording conflicts: host-binding.ts:2-6, the schema description and contracts/README.md:22 say 'proposed ... descriptor-only until joint ratification is recorded in writing', while host.ts:17 comments HOST_API_VERSION as 'The ratified host contract version this facade implements'. No ratification record exists at the pin.",
    "host.ts:17 is the one place a reader could take as evidence that v1 is ratified; it is a comment contradicted by three sibling sources and by the M05 receipt ('no Pi P-descriptor/P-contract coordination was performed'). Treat as documentation promoted past its warrant; P00's ratification is still entirely ahead.")

row(["C028"], "SPECIALIZES",
    "Mechanical: the two identifiers occur as enum members in host-binding.ts:11-12, in the JSON schema, and in two tests (host-binding.test.ts, installed-pi-consumer-conformance.test.ts); nowhere else in apps/ packages/ contracts/ (PROBE/out/static-scans.txt S5). "
    "No code selects behaviour by profile: developLive chooses context by options.contextMode 'plain'|'rf' (live-development.ts:217-255) and always runs the Git tracked-file census (:201-216); its receipt reports discovery 'git-tracked-files' and context 'plain-task-context' (:431-432); "
    "invocation-identity.ts:38-53 carries contextProfile/evidenceProfile as free host-stated strings not checked against the enums. Pi: zero occurrences of either identifier under pi@0fb90672:src (PROBE/out/static-scans.txt S5).",
    "Fixed-string grep for the four profile spellings over every .ts/.json under MW apps/development-rig/src, packages/, contracts/ and the rig tests, and over Pi src at 0fb90672; V0 read of the consuming code paths. Absence = zero matches in those trees.",
    "ESTABLISHED",
    "Witnessed 'in code' means: validated labels in one producer validator and schema (since 6c287304, 2026-11-09). They are not bound to any behaviour, and Pi's source does not know them. The profile-to-behaviour mapping (git-census-v1 = tracked-file census; plain-v1 = plain task context) exists only as prose.",
    "Per identifier and repository: MW label witness yes/yes; MW behavioural witness no/no; Pi src witness no/no. The MNI lesson (profile vocabulary without a code witness) is half-cured: a host can now be refused for an unknown profile string, but a 'git-census-v1/plain-v1' run and an unlabelled run execute the same code.")

row(["C050", "C107", "C145"], "SUPPORTS",
    "Producer-side statements that the joint contract is not ratified: host-binding.ts:2-6 and :13; contracts/README.md:22 ('The grant spelling and the contract version stay a proposal: the written joint ratification with Pi (P-contract) is a recorded condition that this cut does not fabricate'); "
    "qa/integration/pi-native-interoperability-2026-11-09/m05/installed-pi-consumer-l2-receipt.json known_gaps: 'no Pi P-descriptor/P-contract coordination was performed (M05 coordinates it)'. "
    "Token census (PROBE/out/static-scans.txt S10): 'MW-CONTRACT' has 0 occurrences anywhere in MW at the pin and 4 in Pi src; 'P-contract' has 4 occurrences in MW and 0 in Pi src/docs. "
    "The spelling 'mechanical:develop-write' is the producer's (host-binding.ts:14) and has 0 occurrences in Pi src (S5).",
    "Fixed-string grep over all .ts/.json/.md of the MW pin and over Pi src/docs at 0fb90672; V0 read of the cited passages. The Pi-side value of FUNCTION_ACTION_CONTRACT itself was not read by this lens.",
    "SUPPORTED",
    "The ratification gate has no shared name: Pi blocks on 'MW-CONTRACT', the producer waits on 'P-contract'. Neither repository defines what artifact discharges it. host.ts:17 ('ratified') is the lone contrary wording.",
    "Independent producer-side corroboration of the Pi-side observations (their primary reading belongs to the Pi-source lens): both repositories record the contract as unadopted. The same naming gap sits under the A2 adoption gate ('ONLY after MW-CONTRACT ratification', pi-02 A2): P00 needs one named, located ratification record that both tokens resolve to.")

# ---------------------------------------------------------------- L2 fixtures and the M05 receipt
row(["C020", "C068", "C077"], "SUPPORTS",
    "Fixtures at the pin: apps/development-rig/test/installed-consumer.test.ts (packs three packages, installs only the tarballs into an empty npm project under the temp dir, imports the subpath, asserts every module resolves under the consumer's node_modules and not the checkout, :96-111; negative controls :113-128), "
    "installed-pi-consumer-conformance.test.ts (15 rows, each in its own child on Node 24, import counter by module-customization hook), installed-host.test.ts, installed-host-conformance.test.ts, host-facade.test.ts; receipts qa/integration/pi-native-interoperability-2026-11-09/m01/*.json and m05/installed-pi-consumer-l2-receipt.json. "
    "Executed here: conformance file 20/20 pass, 0 skipped (PROBE/out/m05-test-node22runner.tap); the 15 observed rows equal the committed receipt rows on admission, refusal code, import loads and callback totals (PROBE/out/m05-observations-node22runner.json); wider host suite 123/123 (PROBE/out/host-suite-node22.tap). "
    "Producer-side: Forge ledger PASS rows for gated_commit 69cb016d at 2026-11-10T18:09:00Z, 18:29:54Z and 22:00:52Z (PROBE/out/forge-ledger-corroboration.txt). "
    "The consumer fixture (row.mjs, test lines 107-247) imports node:crypto, node:fs, node:path and '@mechanical/development-rig/host' only; its project is named mw-pi-external-consumer (:85).",
    "V0 read of the tests and receipts + " + EXEC + " + producer-side ledger parse. The executed run is one host and one toolchain.",
    "ESTABLISHED",
    "Scope the receipt states for itself: 'fixture callbacks over real packed bytes; no Pi registration, no live SDK, no native provider proof'; three rows (unauthorised-workspace, concurrent-writer, source-drift) are marked SHAPE ONLY in the receipt. 'L2' is the producer's tier name; it is not Pi's V2 (see the V2 row).",
    "C077: the fixture is a plain Node ESM project that imports no Pi package; 'pi-consumer' is a file-name fragment only. The evidentiary weight is in the executable tests, which reproduce; the M05 receipt as a record has its own defects (see the validator row).")

row(["C183", "C166", "C195"], "CONFLICTS_WITH",
    "pi-04:7 defines V2 as 'actual independent npm-packed Mechanical host installed in fresh consumer; digest+runtime-file checks'. The producer's L2 at the pin checks tarball and descriptor digests, package name and install-root containment (installed-host.ts:19-51) and nothing per installed file. "
    "Executed: while the host installs, appending one line to <tmp>/mw-installed-host-*/node_modules/@mechanical/workflows-development/dist/index.js (tarball bytes unchanged) is not detected: the host admits, returns verified_candidate and the appended code runs once "
    "(PROBE/out/defect-probe.jsonl row D4-installed-js-mutation: appendsLanded 1, tarballDigestUnchanged true, mutatedCodeExecutions 1; script PROBE/scripts/defect_probe.mjs).",
    EXEC + ". The mutation is made by a timer in the same process during the host's own async install window, i.e. by a party with write access to the temp directory.",
    "NON-EPISTEMIC",
    "The baseline phrase 'L2 external installed-host fixtures' and P04's 'pass V2' are not the same bar: existing L2 has no runtime-file check, so no existing fixture satisfies V2 as defined.",
    "PREMISE-SPLIT: 'installed JS mutated after extraction is currently admitted by the producer host' (G09 / D4) => ESTABLISHED at mw-69cb016d (executed red in a scratch probe, not a committed test). V2 therefore depends on mw-03 H03, which pi-03 does not name for P04 (it names 'MW H01/H02').")

row(["C068", "C020"], "SUPPORTS",
    "Pin commit 69cb016d (mw@69cb016d:apps/development-rig/test/installed-pi-consumer-conformance.test.ts:367-394) asserts for each of the three packages that the receipt's file list and content_sha256 equal those computed from the tarball the test itself packs. "
    "Independent recomputation in Python from tarballs packed at the pin copy (PROBE/scripts/m05_digest_probe.py -> PROBE/out/m05-digest-probe-node24.json): content digests equal for all three "
    "(@mechanical/workflows-development sha256:fa970eef..., -coordination sha256:6f5e4ac1..., development-rig sha256:ad626451...), file lists equal (20, 254, 182 entries); on this host even the unasserted whole-tarball sha256 values match (db578552..., 965f3307..., 28983aab...) under npm 11.19.0 and 10.9.8. "
    "The committed test passes (PROBE/out/m05-test-node22runner.tap, test 20). Negative control: one comment line appended to packages/development/src/develop.ts and rebuilt makes the receipt test fail with '@mechanical/workflows-development: the committed receipt content digest is stale against the tarball packed from this tree' (PROBE/out/m05-mutant-b-source-change.tap). "
    "Later commits leave the binding valid: the git objects for packages/development, packages/coordination/src, apps/development-rig/src, the rig package.json and README, contracts, package-lock.json and the receipt are identical at 69cb016d, 1be2b8dc, 6476372f and 0ffdc844.",
    "Independent re-implementation of the documented digest (sorted packed paths, NUL, sha256 of each extracted file, LF) outside the repository's test code, the repository test itself, and a source mutant, all by " + EXEC + ". Git object identity compared with rev-parse over the four revisions in a scratch bare repository.",
    "ESTABLISHED",
    "What is bound is the three content digests and three file lists. The claim in the commit subject ('bind the M05 receipt content digests to the packed tree') is exact; 'the receipt is bound to the tree' would overstate it (next row).",
    "This is the pin commit's own change (bead MechanicalWorkflows-loexn.21); the receipt's mechanical_base_sha names the pin's parent c8be64da, because a commit cannot contain its own id.")

row(["C068", "C020"], "SPECIALIZES",
    "Unbound receipt members, shown by a passing mutant: with mechanical_base_sha replaced by forty zeros, the corrupt-tarball row's refusal_code replaced by a string never observed, and the symlink-escape row's status set to 'fail', the receipt test still passes (PROBE/out/m05-mutant-a-unbound-fields.tap). "
    "Source: test lines 370-377 check schema/packet/label/tier/native flag literals, node version /^v24\\./ and a 40-hex shape for the base sha; lines 388-393 require the fifteen row ids, status in {pass, fail} and zero imports/callbacks on refusal rows; the top-level status and each row's code are not compared with the run. "
    "The whole-tarball sha256 is recorded but 'not asserted' (receipt gate_note). The digest is taken over dist as it exists when the test runs: the rig member gate builds only the rig (mw@69cb016d:apps/development-rig/forge.toml typing = 'npm run build'), so a stale packages/development/dist would be packed unchanged; only the root gate rebuilds all three first (package.json 'test': 'npm run build && ...').",
    EXEC + " (mutant A edits only the receipt JSON in a second scratch copy) + V0 read of the assertions and gate manifests.",
    "ESTABLISHED",
    "'Binds to the packed tree' travels with three limits: (1) packed dist at test time, source only via the root gate's build; (2) not the base sha, row outcomes, row status, top-level status or tarball sha256; (3) one toolchain (tsc 5.9.3; the receipt's own M01 sibling says 'not asserted across npm major versions').",
    "A receipt whose rows said 'fail' or named a wrong refusal code would be accepted by the test at the pin. Row behaviour is checked live by the same file when it runs (and it does pass here); the JSON rows are a self-report.")

row(["C068", "C020"], "CONFLICTS_WITH",
    "The producer's own validator for schema mw.pi-interop-receipt.v1 (mw@69cb016d:scripts/check-interop-receipt.ts) refuses the committed M05 receipt: run over the pin copy it prints 'm05/installed-pi-consumer-l2-receipt.json: refused (19)' and exits 2, while m00-a/baseline.json and m01/installed-host-l2-receipt.json have no refusals "
    "(PROBE/out/check-interop-receipt.out, .err). Refusals include INTEROP_RECEIPT_NATIVE_ID_MISSING ('status pass needs the observed Forge operation id'; the receipt has forge_operation_id null), INTEROP_RECEIPT_GATE_UNSTATED (no native_gate_verdict), INTEROP_RECEIPT_SHA_INVALID for mechanical_sha and pi_sha (the receipt has mechanical_base_sha and no pi_sha), "
    "INTEROP_RECEIPT_LIMITATIONS_MISSING (it has known_gaps) and fourteen INTEROP_RECEIPT_FIELD_MISSING refusals for absent template fields. With --base c8be64da (the pin's parent) a twentieth refusal appears, INTEROP_RECEIPT_ARCHIVE_MODIFIED: the pin commit rewrote an archived receipt (PROBE/out/check-interop-receipt-base-parent.err); the validator states 'A receipt is written once ... and never rewritten' (check-interop-receipt.ts:121). "
    "The validator CLI is referenced by no gate command (grep of package.json, forge.toml and scripts: only its own unit test, which uses temp directories). The conformance test asserts the schema string only (test line 371).",
    EXEC + ": the repository's validator run unmodified, once on the scratch copy and once with --root at the pin worktree and --base at the parent (read-only; `git status` of the pin stayed empty). Grep for 'check-interop-receipt' over *.json, *.toml, *.ts, *.md of the pin.",
    "ESTABLISHED",
    "The record the pin commit binds is not a valid receipt under the schema it declares, it claims status 'pass' without a native verdict or operation id, and tree-coupling forces in-place rewrites that the same repository's archive rule forbids. 'L2 evidence exists' survives because the tests reproduce; 'an M05 receipt certifies L2' does not.",
    "For the successor program: pi-04:2 ('Persist logs under a new source-pinned QA receipt directory, not by rewriting older provenance') and pi-05:38 ('do not rewrite prior producer receipts') are already violated by the paired producer's newest receipt mechanism. A requirement that receipt validators run inside the gate over every committed receipt is warranted (evidence acquisition), as is choosing between tree-coupled regeneration and write-once archives.")

# ---------------------------------------------------------------- standalone native execution
row(["C021"], "SPECIALIZES",
    "Code: mw@69cb016d:apps/development-rig/src/live-development.ts:123-127 developLive(root, task, options) composes develop() with four inline closures (:200-392): real `git` children for the census and basis (live-gate.ts:87-98), the Claude Agent SDK by run-time specifier (claude-implement.ts:93-96), a Forge App Server gate.run with require_complete:true (live-gate.ts:249-267); reachable through the rig bin (cli.ts:35-37 --live-develop, :55-57 --live-verify). "
    "Recorded runs in the repository: qa/integration/evidence/2026-10-15-live-claude-forge-verified.json (mode live-claude-forge, verified_candidate, Claude session a40f3d8a-..., Forge op-f74368f4..., candidate aedc62aa/tree ed3b7d12), 2026-10-15-live-rf-claude-forge-verified.json, 2026-10-15-beads-claim-agent-forge-verified.json, 2026-10-15-live-verify-pass/-fail.json; journey notes qa/integration/2026-10-15-live-forge-gate.md and 2026-10-15-furnace-and-agent.md (SDK 0.3.300, forge 0.2.1 rev 0deb972720ce). "
    "Executed here: Git leg with a real repository (PROBE/out/legacy-pass-e2e-probe.jsonl, PROBE/out/defect-probe.jsonl D2 rows). Claude and Forge legs are not runnable from the packed artifact alone: from a consumer that installed only the three tarballs, "
    "`mechanical-development-rig --live-develop --workspace <clean pkg> --task ... --allow-writes` exits 2 with CLAUDE_AGENT_SDK_NOT_INSTALLED and leaves HEAD and status unchanged; `--live-verify` exits 2 with FORGE_SDK_NOT_INSTALLED (PROBE/out/installed-cli-live-develop-no-sdk.stderr, PROBE/out/installed-cli-live-verify-no-sdk.stderr); "
    "both SDKs are absent from the installed closure (PROBE/out/installed-consumer-surface-probe.jsonl) and the rig manifest is test-pinned NOT to list the Claude SDK (apps/development-rig/test/sdk-version-pin.test.ts:60-68).",
    "V0 read of the producer path; read of the committed receipts; " + EXEC + " of the installed CLI without provider SDKs. No native Claude or Forge run was made by this lens (no credentials used, SDKs not installed in the scratch consumer).",
    "SUPPORTED",
    "Three conjuncts, different warrants. Git: established (executed). Claude and Forge: the code path exists and runs were recorded on 2026-10-15 at then-current sources with separately installed SDKs; nothing shows a native run at 69cb016d, and the packed rig cannot do one without out-of-manifest installs. 'Has ... execution' is warranted as 'has the code and historical recorded runs', not as 'executes at the paired snapshot'.",
    "Split into (i) code path present [ESTABLISHED], (ii) historical recorded native runs exist [ESTABLISHED as in-repo records, see C069 row], (iii) native run reproducible at 69cb016d [UNDETERMINED; missing artifact: a receipt naming producer commit 69cb016d or later, SDK identity and a native Forge operation]. docs/10-current-state-and-gaps.md:975 at the pin says 'Not claimed: an L3 receipt against the live SDK (MechanicalWorkflows-loexn.18)'.")

row(["C069"], "SUPPORTS",
    "Committed native records dated 2026-10-15/16/20 under mw@69cb016d:qa/integration/evidence/ carry Claude session ids, Forge operation ids, candidate commit/tree and the full native envelope (e.g. 2026-10-15-live-claude-forge-verified.json). "
    "The producer's own ladder classifies them: docs/programs/pi-native-interoperability-2026-11-09/03-VERIFICATION-AND-RELEASE.md:19 'historical October-native receipts are historical L3 for their then-current source, not new L4 proof'. "
    "Producer-side cross-check: the five 2026-10-15 operation ids have 0 rows in ~/.forge/ledger.jsonl, which was compacted on 2026-11-10T13:52:43Z (13426 rows dropped; earliest retained row 2026-11-09T10:12:02Z), whereas the M00-A and M01 gate ids are present (PROBE/out/forge-ledger-corroboration.txt). "
    "In every recorded Forge response that carries the member, execution_environment.pinned is false (148 occurrences in 16 of 54 scanned evidence files, none true) and the 2026-10-15 app-server responses have envelope.gated_commit and gated_tree null (PROBE/out/static-scans.txt S11); live-gate.test.ts:760-765 pins 'pinned is false on the witnessed receipt'.",
    "Read of the committed receipts and a full-tree JSON scan for the pinned and gated_* members; grep of the Forge ledger by operation id. The ledger no longer covers October, so absence there shows only that no independent producer-side record survives on this host.",
    "ESTABLISHED",
    "'Exists' holds for in-repository records only: one lineage (the rig's own capture of the envelope), no surviving producer ledger row, sources and Forge revision of October (rev 0deb972720ce and f897f3619fa9; the installed forge is now rev e3d480952064). The receipts do not name the MechanicalWorkflows commit that produced them.",
    "Under the strictness the successor programs propose (gate_passed true AND native commit/tree AND gate definition AND pinned environment) none of these records would be strict-native; they are the 'legacy' class. Consistent with I10 keeping them separate, but 'older native L3' must not be read as a strict precedent.")

row(["C022"], "SUPPORTS",
    "Receipts say so themselves: M05 scope 'no Pi registration, no live SDK, no native provider proof'; M01 pi_invocation_id null and limitation 'no Pi code ran in this cut'. "
    "Census: no file under MW apps/, packages/, qa/, examples/, contracts/ imports or names a Pi package or tool; 'workflow_execute' occurs in code only as a stale-phrase literal in scripts/check-docs-stale-claims*; the Pi package names occur only as forbidden-specifier patterns (scripts/check-structure.ts:271 and its test, apps/development-rig/test/core-no-sdk-guard.test.ts:13) and as a git ls-remote URL in m00-a/baseline.json; "
    "'workflow_observe', 'registerTool' and 'ExtensionAPI' nowhere (PROBE/out/static-scans.txt S3); the rig's complete import-specifier list holds node builtins, the two @mechanical packages and four provider SDK names (S2). "
    "The 2026-10-15 native receipts carry no Pi invocation field and predate any function route. Pi at 0fb90672 has 0 occurrences of 'development-rig' in src (S5).",
    "Fixed-string grep for eight Pi-surface tokens over every .ts/.mjs/.js/.json/.sh/.py under the five MW code roots, the full import-specifier census of rig and libraries, and a read of each receipt's scope and id fields. Detection power: any test or receipt that loads the Pi extension or calls its tool must name one of those tokens or import one of those packages; a run performed outside the repository and never recorded would not be seen.",
    "ESTABLISHED",
    "'Proofs' is loose for the first two list items (a function and a subpath are not proofs). The absence is established for everything recorded in the producer repository at the pin.",
    "The claim's dependence on Pi-side facts (what the registered tool can launch) is not assessed here; this row establishes the producer-side half, which by itself entails the claim for every asset stored in the producer repository.")

# ---------------------------------------------------------------- embedded defect premises
row(["C033"], "SUPPORTS",
    "(i) D1/D7: live-gate.ts:205 rejects only `data.gate_passed === false`; :55-63 and :113-154 allow gateDefinition/environment 'descriptor' and an empty tree list; live-development.ts:387 maps kind 'passed' to verdict 'passed'; :411-415 settles the effect intent with the locally measured gate.basis.tree and the cached forge.toml hash. "
    "Executed: a PASS frame with no gate_passed, gate_definition, execution_environment or tree classifies kind 'passed' (PROBE/out/defect-probe.jsonl D1 row 1); end to end it yields verified_candidate and a 'settled' intent whose committedTree and gateDefinitionSha256 are host-local values the frame never stated (PROBE/out/legacy-pass-e2e-probe.jsonl row 2). The committed tests pin this: live-gate.test.ts:818-828 asserts kind 'passed' with descriptor bindings. "
    "(ii) D2: effect-reconciliation.ts:98 returns not-occurred, hence retryPermitted true (:78-80), for HEAD at base with clean status. Executed: an effect in an ignored path and a tracked edit then revert both return not-occurred/retryPermitted true; a gate lookup answering found:false for a null operation id also returns retryPermitted true (defect-probe D2 rows). "
    "(iii) D4: installed-host.ts:37,51 re-digest the tarball only. Executed: a mutated installed dist/index.js runs with the tarball digest unchanged (defect-probe D4 row).",
    "V0 read of each cited line + " + EXEC + " (PROBE/scripts/defect_probe.mjs and legacy_pass_e2e_probe.mjs against the built dist; real git repository for D2; synthetic Forge frames for D1/D7).",
    "ESTABLISHED",
    "The README gives labels only. The producer facts behind them are real at 69cb016d, and unchanged at 1be2b8dc and 0ffdc844 (no src change). D7's label in the README ('strict Forge proof') differs from the companion ledger's ('effect-intent settlement').",
    "These are scratch-probe reds, not committed tests; pi-01:2 keeps deep-audit references as hypotheses 'until a red test exercises them', so each still owes a committed red test in the producer repository. The probes give the expected failing observations for those tests.")

row(["C084"], "SUPPORTS",
    "Executed: developLive with an injected writer and a Forge frame lacking gate_passed, gate_definition, execution_environment and any tree statement returns workflow.kind 'verified_candidate', verdict 'passed', binding {commit:'native', gateDefinition:'descriptor', environment:'descriptor'}; with an effect-intent store the record ends 'settled' (PROBE/out/legacy-pass-e2e-probe.jsonl). "
    "Recorded real instance: qa/integration/evidence/2026-10-15-live-claude-forge-verified.json has workflow.kind verified_candidate while data.execution_environment is {kind:'host', pinned:false} and envelope.gated_commit / gated_tree are null "
    "(commit taken from the evidence_ref run record, tree from data.source_tree; qa/integration/2026-10-15-live-forge-gate.md:31-40 'Upstream finding').",
    EXEC + " through public injection seams, plus a read of the committed native receipt.",
    "ESTABLISHED",
    "The hypothesis is confirmed for the producer at the pin in two forms: a fully bare frame (synthetic) and an environment-unpinned, envelope-unbound frame (recorded, real Forge 0.2.1 rev 0deb972720ce). What stays unknown is what the currently installed Forge (rev e3d480952064) emits.",
    "Moves C084 from HYPOTHESIS to an observation about the producer. The Pi obligation it motivates (preserve the weak observation without upgrading it) meets a producer that itself reports verified_candidate; see the C205 row.")

row(["C187", "C188", "C189", "C190", "C195"], "ASSUMES",
    "Each falsifier presupposes that the paired producer currently does the wrong thing. Executed at the pin copy (PROBE/out/defect-probe.jsonl, PROBE/out/legacy-pass-e2e-probe.jsonl): "
    "G01 PASS without gate_passed -> classified 'passed' and reported verified_candidate; G02 matching commit with no tree statement -> 'passed' (resolveCandidatePin needs a commit statement, trees are optional, live-gate.ts:147-153); "
    "G03 gate_definition and execution_environment absent -> 'passed' with descriptor bindings, and even the unwired stricter projection passes with an unpinned environment and no tree (row 'gate_passed-true-definition-present-env-unpinned-no-tree' -> hostServicesProjection verdict 'passed'); "
    "G04 edit then restore with clean HEAD -> not-occurred, retryPermitted true; G09 installed JS mutated after extraction -> admitted and executed.",
    EXEC + ". G01-G03 use synthetic Forge frames against the real classifier; G04 uses a real git repository; G09 mutates the real temp install.",
    "NON-EPISTEMIC",
    "The rows are requirements on Pi's observable behaviour, yet for G01-G05 and G09 the decision is made inside the producer (classifier, reconciliation, installed host). Pi can only satisfy them through producer changes or by re-deriving the judgment from the raw envelope, which I9 assigns to Mechanical.",
    "PREMISE-SPLIT: 'the producer at 69cb016d exhibits the G01, G02, G03, G04 and G09 defect shapes' => ESTABLISHED (executed in scratch probes). Ownership of each red test should follow the code that decides: producer repository first, Pi projection second.")

row(["C191"], "SPECIALIZES",
    "G05 lists three effect carriers. Executed against effect-reconciliation at the pin (PROBE/out/defect-probe.jsonl D2 rows): an effect in a git-ignored path -> disposition not-occurred, retryPermitted true (defect present); an untracked file -> disposition occurred, retryPermitted false "
    "(already denied, because effect-reconciliation.ts:91 runs status with --untracked-files=all and :97 treats any status line as occurred); an effect outside the worktree was not probed and is invisible to a status of the worktree by construction.",
    EXEC + " with a real git repository; two of three arms executed.",
    "NON-EPISTEMIC",
    "The disjunction 'ignored/untracked/non-worktree' reads as three red cells; one of them (untracked) is green on arrival at the paired producer.",
    "PREMISE-SPLIT: ignored-path arm => ESTABLISHED red; untracked arm => REFUTED as a defect (retry already denied); out-of-worktree arm => UNDETERMINED (not executed; red by construction of the detector). A falsifier written on the untracked arm alone would pass without any change.")

row(["C166"], "SPECIALIZES",
    "P04's red list against what the producer host already refuses at the pin (PROBE/out/m05-observations-node22runner.json, PROBE/out/host-suite-node22.tap, PROBE/out/host-probe.jsonl, PROBE/out/host-node18-probe.jsonl): "
    "corrupt descriptor -> HOST_DESCRIPTOR_DIGEST_MISMATCH (green); corrupt tarball -> ENTRYPOINT_ARTIFACT_MISMATCH (green); alternate export -> ENTRYPOINT_CONTRACT_INVALID (green); path/symlink escapes -> ENTRYPOINT_ARTIFACT_PATH_INVALID / ENTRYPOINT_ARTIFACT_INVALID (green); "
    "unexpected function -> 'module exports no develop' and 'develop export is a string' refuse (tests ok 15, ok 16; green); installed JS mutation -> admitted (red); incompatible Node version -> under node v18.20.2, outside the declared engines '>=22.18.0 <25', the installed host admits and returns verified_candidate (red; the tarball ships no engine-strict setting and host.ts has no version check); "
    "missing SDK -> not applicable to the fixture host (it needs no SDK); on the native CLI path the refusals CLAUDE_AGENT_SDK_NOT_INSTALLED / FORGE_SDK_NOT_INSTALLED exist as untyped reason strings. Two adjacent typed-error gaps: a descriptor without `implementation` or `bindings` raises a raw TypeError, a nonexistent artifact path a raw ENOENT (host-probe rows).",
    EXEC + ".",
    "NON-EPISTEMIC",
    "Seven listed red tests; at the producer layer four are already green, two are red and one (missing SDK) does not apply to the fixture host. As Pi-side tests all seven are red only because no Pi adapter exists, which says nothing about the listed behaviours.",
    "For compilation: state per item which layer must be red (Pi adapter vs producer host). 'Done: independently packed fixture and negative controls pass V2' is already met by the producer for the digest half and unmet for the runtime-file half. The companion's Q15 has the same shape: of 'implementation, bindings, inputSchema' the inputSchema arm already refuses typed (ENTRYPOINT_CONTRACT_INVALID).")

row(["C031"], "ASSUMES",
    "Producer facts behind the four labels the Pi corpus never describes: D8 (MW-I06) projectForgeVerification (host-services.ts:70-82) checks manifest equality, commit equality and gateDefinition native only; executed: it returns 'passed' for an unpinned environment with no tree statement (PROBE/out/defect-probe.jsonl D1 row 3). "
    "D10 (MW-I07) executed: descriptor missing `implementation` -> TypeError 'Cannot read properties of undefined (reading 'package')', missing `bindings` -> TypeError, `implementation: null` -> TypeError (PROBE/out/host-probe.jsonl; entrypoint-host.ts:105-111). "
    "D11 (MW-I08) both provider SDKs are run-time specifiers outside the manifest (claude-implement.ts:93-96, live-gate.ts:231-235; sdk-version-pin.test.ts:60-68), executed refusals from an installed consumer. "
    "D12 (MW-I09) the writer's containment is SDK options only: cwd, allowedTools [Read, Glob, Grep, Edit, Write, Bash(git status|add|commit *)], permissionMode 'dontAsk', settingSources [] (claude-implement.ts:143-147); no process, namespace or filesystem isolation appears in the writer path.",
    "V0 read + " + EXEC + " for D8, D10, D11; D12 is a read of the option object and of the three writer-path files for any isolation primitive (none found; an absence over those files only).",
    "NON-EPISTEMIC",
    "The Pi README names D8/D10/D11/D12 without describing them; the descriptions exist only in the companion (mw-01:24-27).",
    "PREMISE-SPLIT: 'the four gaps labelled D8, D10, D11, D12 are real at the paired snapshot' => ESTABLISHED at mw-69cb016d (D8, D10, D11 executed; D12 by source read). The ownership sentence itself is normative; the ledger defects of the D-numbers are in the C032 row.")

row(["C026", "C175", "C185", "C209"], "ASSUMES",
    "The first-release definition requires a 'strict native Forge gate' and P08/V4 require a real verified case 'using native evidence only'. The companion's strict rule requires gate_passed===true, native candidate commit/tree, native gate definition AND a pinned execution environment (mw-01 MW-I01; mw-02 §4; mw-04 Q05 'execution_environment.pinned false/missing ... indeterminate'). "
    "In the producer repository at the pin, execution_environment.pinned is false in every one of its 148 occurrences across the 16 evidence files that carry it (54 JSON files scanned) and never true; kind is 'host' in all 148 and env_mode 'inherited' in all 30 occurrences, for forge 0.2.1 rev 0deb972720ce (2026-10-15) and rev f897f3619fa9 (2026-10-20) (PROBE/out/static-scans.txt S11, S14). "
    "Frames with pinned true occur only as synthetic fixtures in test files (for example apps/development-rig/test/live-gate.test.ts:803-816, kind 'container'); no committed evidence or receipt JSON has one. The 2026-10-15 app-server gate.run responses returned envelope.gated_commit/gated_tree null (qa/integration/2026-10-15-live-forge-gate.md:31-40); the 2026-10-20 journeys carry data.gated_commit/gated_tree.",
    "JSON walk over every evidence and program receipt file at the pin for members named pinned, gated_commit, gated_tree, harness; read of the test fixture. No Forge gate was run by this lens; the installed forge (0.2.1 rev e3d480952064, built 2026-11-10) was not probed.",
    "NON-EPISTEMIC",
    "Attainability of the positive strict case in the stated topology (same machine, host execution) is presupposed, never evidenced. All available witnesses point the other way for the environment axis.",
    "PREMISE-SPLIT: 'a native Forge full gate in the first-release topology can yield a strict-native PASS' => UNDETERMINED. Missing artifact: one native gate.run envelope from the currently installed Forge on a clean committed disposable package showing execution_environment.pinned true together with native commit/tree and gate definition; or a joint decision that strict v1 does not require the environment pin. Until then V4's verified_candidate leg may only ever produce indeterminate, which would leave the release definition unsatisfiable rather than failed.")

# ---------------------------------------------------------------- cross-program labels, ledgers, vocabulary
row(["C163"], "CONFLICTS_WITH",
    "Three incompatible meanings of the producer labels H01-H06 in the paired corpus. pi-05:30-34: H01 host accepts binding + runtime manifest + typed descriptor errors, H02 production four callbacks, H03 strict verification evidence, H04 effect intent/reconciliation, H05 shared tests V2-V5. "
    "mw-03:16-81 (and mw-05's dependency table, mw-04:2): H00 ABI, H01 strict Forge certificate, H02 effect/non-occurrence, H03 installed runtime closure, H04 descriptor/binding validator, H05 native four services, H06 composed host, H07 progress/recovery, H08 joined Pi journey, H09-H11 tail. "
    "mw-README:26: H01 strict Forge, H02 effect law, H03 compose host binding and service callbacks, H04 runtime closure, H05 cancellation/journal/identity, H06 joint Pi handoff, H07-H09 tail. "
    "pi-03:11 lists 'Mechanical H01/H02/H03 host, native proof, services', an order that matches none of them positionally (pi-05 has host, services, native proof); pi-03:39 gates P04 on 'MW H01/H02'. "
    "Graph shape also differs: pi-03 makes P08 depend on P05-P07 plus those three labels; mw-03:63 makes H08 depend on H05-H07 plus 'Pi P05-P07', and transitively on H01-H04. pi-05:34 lists as a blocking producer handoff 'registered Pi tool V3, native V4, recovery V5', which are outputs of Pi's own P05/P08/P09.",
    "Complete read of every H-label definition site in the twelve program files (grep 'H0[0-9]' over docs/pi-*.md and docs/mw-*.md); the companion files are byte-identical to MW 6476372f:docs/programs/pi-host-integrity-2026-11-10/ (sha256 compared).",
    "CONTESTED",
    "The premise that 'H01/H02/H03' resolve to definite producer packets fails: the same token names different work in pi-05, mw-03 and mw-README, and the companion contradicts itself between its README and its packet file. pi-05's H05 is circular as a prerequisite.",
    "Applies to the label-resolution premise of this inference. Code check: none of the candidate meanings has an implementation at the pin, so the code cannot arbitrate. Beads must be keyed by function and owner, never by H-number; P04 as written (installed host consumer) needs mw-03 H03+H04+H06, P08 needs mw-03 H01-H07.")

row(["C221"], "SUPPORTS",
    "pi-05:30-33 against mw-03:22-57. pi-05 H02 (four native callbacks) = mw-03 H05; pi-05 H03 (strict verification) = mw-03 H01; pi-05 H04 (effect intent/reconciliation) = mw-03 H02 (plus H07 for reporting native effects). "
    "pi-05 H01 bundles three producer packets, not two: binding acceptance (mw-03 H06), typed malformed-descriptor refusal and closed binding (mw-03 H04) and 'exact immutable package/runtime manifest' (mw-03 H03).",
    "Side-by-side read of the two definition sites.",
    "SUPPORTED",
    "The mapping in the claim omits mw-03 H03 from pi-05 H01, and there is a third numbering (mw-README:26) the claim does not mention.",
    "The conclusion (a handoff keyed only by H-label is ambiguous) is strengthened: three numberings, not two.")

row(["C032"], "CONTRADICTS",
    "D-number census (PROBE/out/static-scans.txt S8): in the six Pi files D1-D12 occur only as labels in pi-README:27 and as D3, D5, D6, D9 in the pi-01 ledger; D1, D2, D4, D7, D8, D10, D11, D12 are described nowhere in the Pi corpus. "
    "The companion ledger (mw-01:19-27) describes D1, D2, D4, D6, D7, D8, D10, D11, D12. D6 has two entries with two owners: pi-01 PI-I03/D6 (registered tool is script-only; Pi P04/P05) and mw-01 MW-I04/D6 (invokeDevelopmentHost lacks binding, grants, source, lease; Mechanical P0), while pi-README:27 files D6 under 'Pi owns'. "
    "Labels drift: README 'P0 strict Forge proof (D1/D7)' versus mw-01 'MW-I02 / D7 - P0 effect-intent settlement'; README gives D4 no severity, mw-01 says P1, mw-03:34 says 'P1/P0 dependency'.",
    "grep -oE for D1..D12 over all twelve program files, then a read of each occurrence.",
    "REFUTED",
    "'As described in this corpus' is false for the Pi corpus, which the README calls self-contained; it is true only if 'corpus' silently means the joint Pi+Mechanical programs. Even then D6 is not single-owner.",
    "Scope of REFUTED: facet (i)/(ii) under the Pi-corpus reading and facet (iii) (one meaning, one owner per D-number) under either reading. Under the joint reading facets (i)/(ii) are SUPPORTED: every D-number is described in one of the two ledgers.")

row(["C171", "C125", "C135", "C122"], "CONFLICTS_WITH",
    "None of the proposed assurance or effect vocabulary exists in producer code, tests or contracts at the pin: 0 occurrences each of strict-native, legacy-weak, legacy-observed, candidate-bound-native, VerificationCertificate, effect-intent/v2, invokeAuthorizedDevelopmentHost and the new HOST_* codes (PROBE/out/static-scans.txt S4). "
    "What exists: GateBinding {commit: native|run_record|descriptor, gateDefinition: native|descriptor, environment: established|descriptor} (live-gate.ts:33-40); EffectDisposition uncertain|settled (effect-intent.ts:12); reconciliation occurred|not-occurred|unknown (effect-reconciliation.ts:72); "
    "progress disposition none|uncertain|settled and seven stages discovery, context, sdk_startup, first_edit, commit, gate_dispatch, settlement (progress-stages.ts:9,32); receipt dispositions not-started|started|settled|uncertain (scripts/check-interop-receipt.ts:17). "
    "The two programs then propose different sets: Pi assurance {strict-native, legacy-weak, unknown} (pi-02:36) versus Mechanical {descriptor, legacy-observed, candidate-bound-native, strict-native} (mw-01:35); Pi effect {no-effect, ...} versus Mechanical {no-dispatch, ...} (mw-01:36); "
    "Pi journal events native_session_observed, candidate_committed, forge_dispatched, forge_observed, effect_settled (pi-02:34) versus the producer's existing stage names.",
    "Fixed-string grep for each proposed token over MW apps/ packages/ contracts/ scripts/ qa/ (*.ts, *.json); V0 read of the existing enumerations; read of the two proposal passages.",
    "NON-EPISTEMIC",
    "C171's embedded premise that 'strict/weak' corresponds to a certificate distinction Mechanical has at 69cb016d is false: there is no certificate type and no strict/weak vocabulary, only binding-source annotations. The same concept is spelled 'legacy-weak' by Pi and 'legacy-observed' by Mechanical, and the value sets differ in size.",
    "PREMISE-SPLIT: 'Mechanical has a strict-vs-legacy-weak certificate distinction at 69cb016d' => REFUTED (0 witnesses in the searched trees). The ABI handshake (pi-02:48) cannot use 'the same versioned fixture vectors' until one vocabulary is chosen; four disposition vocabularies (plus the binding-source annotations) already coexist in the producer.")

row(["C211", "C180", "C067"], "CONFLICTS_WITH",
    "Three receipt shapes for the joint work. Implemented and validated at the pin: mw.pi-interop-receipt.v1, snake_case, tiers L0-L6, fields mechanical_sha, pi_sha, pi_invocation_id, claude_session_id, forge_operation_id, native_gate_verdict, effect_disposition, commands, negative_controls, mutants, limitations (scripts/check-interop-receipt.ts:12-22). "
    "Proposed by the companion: 'mechanical.pi-host.release/v1' with packages[].installedContentSha256, claudeSdkIdentity, forgeSdkIdentity, native.environmentPin, effects.fencingGeneration, tests[] (mw-04:50-64). "
    "Proposed by Pi: an unnamed schema with packages[].runtimeManifestSha256, sdkIdentities, native.environmentBinding, effects.leaseGeneration, gates[], fixtures[], tier (pi-04:65).",
    "Read of the validator source and of both proposed templates.",
    "NON-EPISTEMIC",
    "The 'truthful L4 source-pinned receipt from both repositories' (mw-03 H08) and Pi's V4 receipt have no single agreed schema or tier vocabulary (Pi V0-V6, producer L0-L6), and the one implemented schema already has a committed nonconforming record (M05).",
    "Same failure family as the predecessor's phantom receipt names: a joint artifact both sides must emit is specified twice, differently. P00 should fix one schema id, one tier vocabulary and one validator, and gate on it.")

row(["C067", "C210"], "CONFLICTS_WITH",
    "Pi defines tiers V0-V6 (pi-04:5-11) and nowhere defines an L ladder, yet uses 'L2' and 'L3' (pi-README:20, pi-01:26) and vetoes release on 'missing L4/L5 but marked shipped' (pi-04:61). The producer ladders define L3 as standalone native producer and L4 as the joined registered journey "
    "(mw-04:5; mw@69cb016d:docs/programs/pi-native-interoperability-2026-11-09/03-VERIFICATION-AND-RELEASE.md:11-16). Pi's V3 is the registered tool with deterministic callbacks and no native provider; the producer's L3 is native with no Pi. Index 3 names disjoint evidence in the two ladders.",
    "grep for L-tier and V-tier tokens over the six Pi files; read of the producer ladder definitions at the pin and in the companion.",
    "NON-EPISTEMIC",
    "'L4/L5' in a Pi release veto is an undefined term in a corpus declared self-contained; a reader must import the producer's ladder to interpret it, and V3/L3 invite a false equivalence.",
    "A veto row should be restated in V-terms (V4/V5) or the two ladders mapped once: V2~L2, V4~L4, V5~L5, V6~L6; V3 and L3 have no counterpart.")

row(["C058", "C092", "C165"], "ASSUMES",
    "What the producer binding and host pin is the core library tarball only: host-binding.ts:22-27 fixes artifact.package '@mechanical/workflows-development' / export 'develop' with one sha256; installed-host.ts verifies and installs that one tarball. "
    "The code that performs admission (and, after H05/H06, would run the writer and the gate) lives in @mechanical/development-rig, which declares its two siblings by version, not digest (apps/development-rig/package.json:30-33) and is itself pinned by nothing on the producer side; an external consumer must install three tarballs to obtain ./host (installed-consumer.test.ts:96-97). "
    "Two code-identity regimes for develop coexist in the rig: invokeDevelopmentHost enters the digest-admitted copy installed in a temp directory, while host-services.ts:7 and live-development.ts:6 import the version-resolved dependency copy (six dist modules import the package at run time: candidate-selection, cli, host-services, live-development, live-evidence, repair-run; PROBE/out/host-closure.txt).",
    "V0 read of the binding type, the installer and the manifests; import census of the rig.",
    "NON-EPISTEMIC",
    "I1's 'tarball digest' and pi-02's singular artifactDigest read as one artifact identity. At the pin there are three tarballs, and the one named in the binding is not the one that will hold the effectful code.",
    "PREMISE-SPLIT: 'the artifact digest in the reviewed definition/binding identifies the code that executes effects' => UNSUPPORTED at mw-69cb016d (it identifies the pure library; the host and future native services sit in an unpinned sibling). P04's 'exact descriptor/installed package/runtime manifest checks' has to name all three packages; measured values on this host: development db578552..., coordination 965f3307..., rig 28983aab... (PROBE/out/m05-digest-probe-node24.json).")

row(["C165"], "CONTRADICTS",
    "grep -i 'schedul' over apps/development-rig/src, packages/development/src and packages/coordination/src returns eight lines, all disclaimers or abstract statements: 'No Furnace scheduling ... implemented here' (furnace-gate.ts:3), 'no scheduler, registry or generic DAG' (packages/development/src/review.ts:1), "
    "'No RPC, scheduling or durability is implemented here' (workspace-materialize.ts:6), and comments in elastic-landing.ts, runtime-plan.ts, step-fixture.ts about what 'no scheduler' could do (PROBE/out/static-scans.txt S6). AGENTS.md:5 lists 'scheduler' among what the project has none of.",
    "Case-insensitive substring grep over every .ts of the three source trees; all hits read.",
    "NON-EPISTEMIC",
    "'Don't construct a second Mechanical scheduler' presupposes a first one. Mechanical has none and disclaims one.",
    "PREMISE-SPLIT: facet (a) './host is an exported subpath' => ESTABLISHED; facet (b) 'Mechanical owns a scheduler a Pi host could duplicate' => REFUTED (zero implementations in the searched trees). The intended rule is 'do not build a scheduler for Mechanical functions; Pi's existing scheduling applies' and should be worded so.")

# ---------------------------------------------------------------- pairing, time and the newer main commits
row(["C003"], "SUPPORTS",
    "PROBE/out/git-facts.txt. (i) 69cb016dd293a17bcc893f2baf410a51c226f4c9 (author 2026-11-10T16:41:18Z, committer 2026-11-10T17:47:28Z, parent c8be64da, tree 1383cae6) is an ancestor of origin/main and was its tip at the fetch of 2026-11-11T03:45:36Z. "
    "(ii) Its child 1be2b8dc (committer 2026-11-11T03:54:09Z) was the only later main commit when the Pi program was committed (91d8fa8c, 2026-11-11T04:22:15Z); by the Pi document pin 3fc0ead1 (04:27:58Z) the companion deposit 6476372f (04:27:41Z) existed too; "
    "`git ls-remote origin refs/heads/main` at 2026-11-11T05:31:34Z returned 0ffdc844 (committer 04:58:58Z), three commits past the snapshot. "
    "(iii) docs/programs/pi-host-integrity-2026-11-10/ has 6 files at 6476372f and 0 at 69cb016d and 1be2b8dc; the six triage copies docs/mw-*.md are sha256-identical to the files at 6476372f. "
    "(iv) The companion states its baseline as 'MechanicalWorkflows 1be2b8dc ...; Pi-subagents 0fb90672' (mw-README:3, mw-01:2), i.e. the child of the Pi program's snapshot, not the snapshot.",
    "Read-only git on the pin worktree (rev-list, reflog of origin/main, ls-tree, show), `git ls-remote` against the remote, and a fetch of remote main into a scratch bare repository under .work that borrows the local object store (no ref or object written to any repository).",
    "SUPPORTED",
    "Time: 'an additional main commit' was exact when the Pi files were committed and is stale now (three). Pairing: the two programs name different Mechanical baselines (69cb016d versus 1be2b8dc). Facet (iii) is true of main after 6476372f, not of the snapshot itself.",
    "The difference between the two stated baselines is immaterial to every source claim: 69cb016d..1be2b8dc changes two test titles and one identifier-mapping row. (i) and (iii) are ESTABLISHED; (ii) is consistent with commit dates (push times are bounded only by the fetch reflog, 03:45Z-04:28Z); (iv) holds in its weaker 'differ only by that one further commit' form.")

row(["C003"], "SPECIALIZES",
    "Diff 69cb016d..0ffdc844 (PROBE/out/git-facts.txt name-status; ten paths): M apps/development-rig/test/host-services.test.ts (two test titles gain 'MW-R2 EAT-R027/EAT-R038', no assertion change; 1be2b8dc); M apps/development-rig/test/post-dispatch-abort.test.ts (header comment and four titles gain 'MW-R3 EAT-R043 EAT-R044'; 0ffdc844); "
    "M docs/programs/pi-native-interoperability-2026-11-09/04-IDENTIFIER-MAPPING.md (rows MW-R2 and MW-R3 move from 'defined' to 'test-pinned'); A six companion program files and M .agents/skills/mechanical-pi-host/SKILL.md (6476372f). "
    "No path under packages/, apps/development-rig/src, contracts/, qa/ or any package.json changed; tree and blob ids of packages/development, packages/coordination/src, apps/development-rig/src, the rig manifest and README, contracts, package-lock.json and the M05 receipt are identical at 69cb016d, 1be2b8dc, 6476372f and 0ffdc844. "
    "Forge ledger: root-gate PASS rows exist for gated_commit 1be2b8dc, 6476372f and 0ffdc844 (PROBE/out/forge-ledger-corroboration.txt).",
    "git diff --name-status and per-path rev-parse between the pin and the live remote tip in a scratch bare repository under .work; git show of each of the three commits; ledger parse by gated_commit.",
    "SUPPORTED",
    "The 'additional main commit' (1be2b8dc) and the two after it change test titles, one mapping document, one skill file and add the companion program. Nothing in producer source, contracts, manifests or receipts moved.",
    "Consequence: every source verdict this lens graded at 69cb016d transfers unchanged to 1be2b8dc (the companion's stated baseline) and to the remote tip 0ffdc844, including the M05 content-digest binding. The program's own re-pin rule still applies before implementation; the remote may have moved again after 2026-11-11T05:31:34Z.")

row(["C019", "C073"], "CONFLICTS_WITH",
    "At the environment pin the producer's own agent skill denies the export: mw@69cb016d:.agents/skills/mechanical-pi-host/SKILL.md 'Current, not aspirational' bullet 3 reads 'invokeInstalledDevelopment is a transient local, SHA-256-pinned, in-process trusted code loader; it does not give Pi a stable callable rig-host export, sandbox, durable worker or authorization.' "
    "The companion deposit 6476372f replaces that bullet with '@mechanical/development-rig/host now ships a stable ./host export and invokeDevelopmentHost ... but it does not yet compose Pi principal/grants, source attestation, a durable writer fence, or native four-callback services into an authorized registered Pi invocation' (git diff 1be2b8dc 6476372f -- .agents/skills/mechanical-pi-host/SKILL.md).",
    "git show of the skill file at 69cb016d and the diff introduced by 6476372f, compared with the manifest and the executed import (see the C019 row).",
    "ESTABLISHED",
    "A producer document at the paired snapshot says the opposite of the claim. It is stale documentation: the export landed in 24ef8984 on 2026-11-09 and the skill line was corrected only on 2026-11-11.",
    "The claims stand (primary evidence: manifest, packed tarball, executed import). Recorded because an agent that 'begins with the skill' at the stated snapshot would read the refuted statement; the docs stale-claim linter at the pin does not know this phrase.")

# ---------------------------------------------------------------- operating-constraint premises
row(["C035"], "SUPPORTS",
    "(ii) and (iii): the libraries import nothing but node:crypto (PROBE/out/static-scans.txt S1); the rig's static specifiers are node builtins and the two @mechanical packages, its dynamic ones @anthropic-ai/claude-agent-sdk, @hyperunix/sdk, @furnace/sdk, @forge/sdk (S2); no Pi and no Library specifier. "
    "Enforced by the root 'structure' gate step: scripts/check-structure.ts:248-278 (LIBRARY_PROVIDER_IMPORT_FORBIDDEN, Pi family named) and :102-107,:200-215 (LIBRARY_DEPENDENCY_FORBIDDEN, LIBRARY_MEMBER_FORBIDDEN); executed at the pin copy: 'structure: pass' (PROBE/out/check-structure.out). "
    "(i) the develop/host path modules (live-development, live-gate, claude-implement, host*, installed-host, entrypoint-host, effect-*) contain no Furnace reference; Furnace lives in four separate opt-in modules (furnace-app.ts, furnace-app-wiring.ts, furnace-gate.ts, furnace-process-executor.ts).",
    "Complete import-specifier census (regex over all .ts in the three src trees, static and string-literal dynamic), the repository's structure gate executed on the scratch copy, and a per-module grep for 'furnace'. Mechanical side only.",
    "ESTABLISHED",
    "Scope is the producer repository. 'Mechanical core' in (ii) is enforced for the two libraries; the rig is deliberately outside that rule.",
    "Covers facets (i) Mechanical half, (ii) and (iii). Facets (iv) and (v) are in the next two rows.")

row(["C035"], "SPECIALIZES",
    "(iv): HX and RF exist as profile enum values beside the Git/plain pair (host-binding.ts:11-12: hx-task-scope-v1, rf-committed-v1) and the validator accepts any combination. There is no Furnace profile value anywhere in the binding, schema or tests; Furnace exists only as hosting modules.",
    "Read of the profile enumerations and schema; grep for 'furnace' in host-binding.ts and the schema (0).",
    "UNSUPPORTED",
    "'Optional HX/RF/Furnace profiles' groups three things of two kinds: HX and RF are profile labels, Furnace is an execution host. As a statement that a Furnace profile exists it has no witness.",
    "Applies to facet (iv) only. HX and RF as labels are ESTABLISHED (label-only, see the C028 row); 'separately selectable' is true of the validator and untested in behaviour, since no code consumes the profile value.")

row(["C035"], "SUPPORTS",
    "(v) Mechanical half: `git ls-tree -r 69cb016d` contains no .github/, .gitlab-ci*, Jenkinsfile, .circleci, buildkite, azure-pipelines or .travis path (count 0, PROBE/out/git-facts.txt); the repository carries tests that forbid such files (scripts/check-no-foreign-ci.test.ts, scripts/check-foreign-ci-claimed.test.ts) and lists them as inputs of the test step (forge.toml). "
    "Cross-lens pointer: pins/pi-0fb90672/.github/workflows/ci.yml exists.",
    "Path listing of the whole pin tree against seven CI path patterns; existence check of one path in the Pi pin.",
    "ESTABLISHED",
    "The facet says 'either repository'. It holds for Mechanical; the Pi half is contradicted by a workflow file present at the Pi pin (outside this lens; see the Pi-source lens).",
    "Applies to the Mechanical conjunct of facet (v) only. As a two-repository conjunction the facet fails on the Pi side.")

row(["C218"], "SUPPORTS",
    "mw@69cb016d:apps/development-rig/package.json:7-9 engines.node '>=22.18.0 <25' (same in both libraries and the root); pi@0fb90672:package.json engines.node '>=24'. Intersection: 24.x. "
    "The declaration is advisory for a consumer: engine-strict=true sits in the monorepo .npmrc, which is not in the packed tarball (files: dist, README.md), and host.ts has no version check. Executed: under node v18.20.2 the tarball-installed host admits and returns verified_candidate (PROBE/out/host-node18-probe.jsonl). "
    "SDK identity: the rig resolves @anthropic-ai/claude-agent-sdk from the consumer's install at run time and reads its version from the installed manifest (claude-implement.ts:99-115); Pi pins 0.3.300 in its own dependencies; the 2026-10-15 producer receipts used 0.3.300.",
    "V0 read of both manifests + " + EXEC + " under an out-of-range Node binary available on the host.",
    "ESTABLISHED",
    "",
    "The executed result adds a fact the claim only implies: an incompatible Node version is not refused anywhere in the producer host today, so P04's 'incompatible Node version' red test has a real target. The producer's M05 fixture already resolves an explicit Node 24 child.")

# ---------------------------------------------------------------- historical fixes and descriptor identity
row(["C074"], "SUPPORTS",
    "Fix commit 1f29daa7ca6caaf12551d6d68413e36a50388650 (2026-11-05T08:49:21Z, 'fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host tests', bead MechanicalWorkflows-14zrz), an ancestor of the pin; it changed contracts/entrypoints/development.v1.json and added apps/development-rig/test/entrypoint-descriptor-file.test.ts. "
    "The descriptor has not changed since (blob d4f43d38, 564 bytes, sha256 68cc312b...). Executed at the pin copy: 'committed descriptor names schema files that exist beside it with one canonical grammar' and 'invokeInstalledDevelopment accepts the committed descriptor over the real npm-packed tarball' pass (PROBE/out/host-suite-node22.tap, ok 20, ok 21).",
    "git log on the descriptor path, git show --stat of the fix, " + EXEC + ".",
    "ESTABLISHED",
    "",
    "Identifies the fix the Pi text leaves unnamed. The same bytes are what Pi's fixture pins (next row).")

row(["C075"], "DEPENDS_ON",
    "No producer commit matching a worktree-preservation fix was found: `git log -i --grep=preserv` since 2026-11-01 over the pin's ancestry returns only c9d0ed52 ('outcome preservation', unrelated). The producer has a regression fence instead, apps/development-rig/test/writer-path-preservation.test.ts (commit 6af11151, 2026-11-07, EAT-R046 static leg). "
    "The producer's 2026-11-06 audit program assigns the repair to Pi: docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:19 'Pi can repair worktree preservation'.",
    "Commit-message grep over the pin's ancestry and a read of the one program sentence. Commit messages that do not use the stem 'preserv' would be missed.",
    "UNDETERMINED",
    "From producer evidence the referenced fix is a Pi-side change; this lens cannot identify or confirm it.",
    "Missing artifact: the Pi commit and regression test for the worktree-preservation fix (Pi-source lens). Nothing in the producer repository bears on whether it is fixed.")

row(["C088", "C027"], "SUPPORTS",
    "mw@69cb016d:contracts/entrypoints/development.v1.json: id 'mechanical.development.develop.v1', implementation {package '@mechanical/workflows-development', export 'develop'}, bindings [discover, compileContext, implement, verify], status 'descriptor-only'; sha256 68cc312ba82c5837eff64bb6de39e0db09073c836d851d550e13aa458d192d0f, git blob d4f43d38, 564 bytes. "
    "The same id is hard-coded at entrypoint-host.ts:36 and host-binding.ts:10. Pi's fixture copy pi@0fb90672:test/fixtures/mw-development-entrypoint-v1.json has the identical sha256, and pi@0fb90672:test/workbench-mechanical-descriptor.test.ts:155-161 records the producer file of record with the same blob, sha256 and byte count (PROBE/out/git-facts.txt).",
    "sha256sum and git rev-parse of the descriptor at the pin; sha256sum of the Pi fixture; read of the Pi test constant. Pi's allowlist constant itself was not read by this lens.",
    "SUPPORTED",
    "The reviewed descriptor both sides hold says status 'descriptor-only' and its note says 'No remote host loader or generic invocation transport is implemented'; the producer host refuses any other status (entrypoint-host.ts:107). An invocable v1 therefore needs either a descriptor that keeps calling itself descriptor-only or new bytes, a new digest and a Pi allowlist/pin update.",
    "The Mechanical half of both claims is established; the Pi allowlist half belongs to the Pi-source lens, hence SUPPORTED for the two-sided claims. The descriptor digest is the one identity value already byte-agreed across the two pins; P00 has to decide how 'reviewed and invocable' is represented without silently reusing a descriptor-only record.")

# ---------------------------------------------------------------- handoff readiness and companion drift
row(["C227", "C228"], "ASSUMES",
    "State of the four producer handoffs at the pin, in pi-05's own numbering: H01 binding not required by the exported invocation (host.ts:52-71), no runtime manifest, malformed descriptor -> raw TypeError (executed, PROBE/out/host-probe.jsonl); "
    "H02 the only native composition is inline in developLive (live-development.ts:200-392), unreachable through ./host, SDKs unlisted; H03 no strict evidence type, weak PASS classifies passed (executed); H04 clean HEAD grants retry (executed), fileEffectIntentStore fsyncs the temp file and renames without a directory fsync (effect-intent.ts:143-152).",
    "V0 read + " + EXEC + " (see the rows for C033, C084, C133).",
    "NON-EPISTEMIC",
    "",
    "PREMISE-SPLIT: 'none of H01-H04 is already satisfied by the paired producer' => ESTABLISHED at mw-69cb016d. So every Pi packet that names a producer handoff (P04, P06 via strict evidence, P07, P08) is blocked on producer work that has no bead mapping in the Pi corpus.")

row(["C142", "C175"], "CONFLICTS_WITH",
    "Paths the companion packets name that do not exist at the pin (PROBE/out/static-scans.txt S9): apps/development-rig/src/effect-abort.ts (mw-03:29; the module is post-dispatch-abort.ts), the directory 'tests/' in 'tests/effect-intent.test.ts', 'tests/entrypoint-*.test.ts', 'tests/host-facade.test.ts' (mw-03:29,41,52; the directory is test/), and 'progress' (progress-stages.ts). "
    "mw-README:20 says installed-host.ts 'packs/imports exact tarball'; it copies and installs a caller-supplied tarball and never packs (installed-host.ts:19-35). All Mechanical paths the Pi corpus names (host.ts, host-binding.ts, host-services.ts under apps/development-rig/src) exist.",
    "git cat-file -e for each cited path at 69cb016d.",
    "NON-EPISTEMIC",
    "The producer packets that Pi's P07/P08 depend on carry phantom file names; the Pi corpus's own Mechanical path references are sound.",
    "Low severity, but a bead written from mw-03 H02/H04/H06 verbatim would point agents at nonexistent files. Not a defect of the Pi artifact; recorded because Pi's dependency rows inherit it.")

row(["C037"], "DERIVED_FROM",
    "This lens executed, at a scratch copy of the pin, the producer's own tests (M05 conformance 20/20; host suite 123/123; structure gate pass) and six probe scripts (PROBE/scripts/: m05_digest_probe.py, host_probe.mjs, defect_probe.mjs, legacy_pass_e2e_probe.mjs, installed_consumer_surface_probe.mjs, host_node_version_probe.mjs), with outputs under PROBE/out/. "
    "Independently, the Forge ledger shows the landing chain gated the pin itself (three PASS rows for gated_commit 69cb016d).",
    "Execution record of this lens; ledger parse.",
    "NON-EPISTEMIC",
    "",
    "Evidence delta for later phases: the authors' 'no tests were executed' reports are untouched, but the D1, D2, D4, D7, D8, D10 shapes and the legacy-PASS path now have executed witnesses at the producer pin. They remain scratch probes; the rule in pi-01:2 still asks for committed red tests. Nothing here was run against Pi.")

row(["C172"], "ASSUMES",
    "mw@69cb016d:packages/development/src/develop.ts:67-69 returns verification_failed only for verdict 'failed'; :70-74 returns indeterminate for 'partial' or 'unknown'; live-gate.ts:210-223 produces a failed observation only for a pinned native FAIL and indeterminate otherwise. Executed: 'four-arm witness' passes (PROBE/out/host-suite-node22.tap).",
    "V0 read + execution of the pin's host-services test on the scratch copy.",
    "NON-EPISTEMIC",
    "",
    "PREMISE-SPLIT: 'verification_failed and indeterminate are distinct producer statuses that a bridge could collapse' => ESTABLISHED at mw-69cb016d.")

row(["C101", "C194", "C152"], "ASSUMES",
    "Same executed probe as the C080 row (PROBE/out/host-probe.jsonl): at the producer boundary an own enumerable `notes` member is refused ENTRYPOINT_INPUT_INVALID with zero callbacks; a non-enumerable getter and an enumerable accessor both pass and reach the callbacks on the caller's own object.",
    "Execution against the built ./host of the scratch copy; producer boundary only.",
    "NON-EPISTEMIC",
    "The test obligations do not say at which boundary the assertion is made. At the producer boundary the plain-note case is already refused, so a test placed there is green before any change.",
    "PREMISE-SPLIT: 'without Pi-side canonicalization a note-bearing or accessor-bearing input can reach the Mechanical callback' => ESTABLISHED only for non-enumerable and accessor carriers, REFUTED for own enumerable note members (both executed). Place the note-difference and poisoned-getter assertions at Pi's dispatch boundary and add an accessor case for the producer leg.")

row(["C142"], "ASSUMES",
    "See the C163 row: the labels 'Mechanical H01/H02/H03' in pi-03:11 have three incompatible definitions (pi-05:30-34, mw-03:16-81, mw-README:26), the positional gloss 'host, native proof, services' matches none of them, and the companion's own joined node (mw-03:63, H08) depends on H05-H07 plus Pi P05-P07.",
    "Complete read of every H-label definition site in the twelve program files.",
    "NON-EPISTEMIC",
    "The dependency edge is drawn to labels that do not denote one set of producer work.",
    "PREMISE-SPLIT: 'H01/H02/H03 resolve to definite Mechanical packets' => CONTESTED (primary documents disagree; no implementation exists at the pin to arbitrate). In mw-03 terms P08 needs H01 through H07.")

row(["C005"], "CONTRADICTS",
    "Terms the six Pi files use without defining, whose definitions exist only in the companion or the producer repository: D1, D2, D4, D7, D8, D10, D11, D12 (labels in pi-README:27 only; described in mw-01:19-27; PROBE/out/static-scans.txt S8); "
    "the tier names L2, L3, L4, L5 (pi-README:20, pi-01:26, pi-04:61; defined in mw-04:5 and in the producer's 2026-11-09 program); the strictness criteria behind 'strict native Forge gate' (spelled out only in mw-01 MW-I01 and mw-02 §4); 'MW-CONTRACT ratification' (pi-02 A2) names no artifact.",
    "grep for each token over the six Pi files, then a read of every hit; the companion files compared byte-for-byte with MW 6476372f.",
    "REFUTED",
    "'Self-contained' fails on these terms: an implementer must open the companion Mechanical program to learn what eight of the twelve D-numbers, four tier names and 'strict' mean.",
    "Scope of REFUTED: facet (ii) (self-contained, defines every term) only, on the tokens listed. Facet (i) (successor revision; the five linked files exist) is not addressed by this lens.")

row(["C001"], "SUPPORTS",
    "Producer side of 'design only, not implemented or released': none of the identifiers the two programs introduce for producer work has a witness in MW code, tests or contracts at the pin (0 occurrences each of VerificationCertificate, strict-native, legacy-weak, invokeAuthorizedDevelopmentHost, effect-intent/v2, runtimeManifest, installedContentSha256, the new HOST_* codes; 0 lease/fencing words in apps/development-rig/src; PROBE/out/static-scans.txt S4); "
    "the shipped subpath exposes eight names and no binding-required entry (PROBE/out/installed-consumer-surface-probe.jsonl); the three package manifests are version 0.1.0 and the repository has no git tag; the highest evidence tier among the three program receipts is L2 (PROBE/out/static-scans.txt S12, S13).",
    "Fixed-string grep for thirteen proposed tokens over MW apps/ packages/ contracts/ scripts/ qa/ (*.ts, *.json); import probe from an installed consumer; `git tag --list` (empty); read of evidence_tier in the three receipts under qa/integration/pi-native-interoperability-2026-11-09/. Mechanical repository only.",
    "SUPPORTED",
    "",
    "The Mechanical half is established as an absence over the stated surface. The Pi half (no registered function route, no release) belongs to the Pi-source lens, hence SUPPORTED for the two-repository claim.")

row(["C023", "C024", "C025"], "SUPPORTS",
    "Producer-side search for any joined-run record: of 93 JSON files under mw@69cb016d:qa/ only two have a member named like pi*invocation (m00-a/baseline.json and m01/installed-host-l2-receipt.json), both null (PROBE/out/static-scans.txt S12); the M05 receipt states 'no Pi registration, no live SDK, no native provider proof'; the companion ledger records 'MW-I12 - P1 joint absence: no registered Pi-to-Mechanical L4 journey' (mw-01:30). "
    "For the lease facet: the rig source contains no lease or fencing code at all (0 word matches for lease, leases, fencing in apps/development-rig/src; PROBE/out/static-scans.txt S4) and MechanicalHostBindingV1 has no lease or fence member (host-binding.ts:19-42).",
    "JSON walk over every file under qa/ for members matching /pi_?invocation/i; word grep over the rig source; read of the binding type. Detects any recorded joined receipt or producer-side lease implementation stored in the producer repository at the pin; cannot see records kept only in the Pi repository or outside both.",
    "SUPPORTED",
    "",
    "Producer-side corroboration of three Pi-side absence claims; their primary detection surface is the Pi repository (Pi-source and negative-evidence lenses).")

# ---------------------------------------------------------------- emit + validate
def main():
    known = set()
    for path in sorted(glob.glob(os.path.join(HERE, "claims-*.jsonl"))):
        with open(path) as handle:
            for line in handle:
                if line.strip():
                    known.add(json.loads(line)["id"])
    statuses = {"ESTABLISHED", "SUPPORTED", "PLAUSIBLE", "UNSUPPORTED", "CONTESTED", "REFUTED", "UNDETERMINED", "NON-EPISTEMIC"}
    relations = {"SUPPORTS", "CONTRADICTS", "ENTAILS", "DERIVED_FROM", "ASSUMES", "QUOTED_FROM", "GENERALIZES", "SPECIALIZES", "DEPENDS_ON", "CONFLICTS_WITH", "SAME_ORIGIN_AS"}
    keys = ["lens", "claimIds", "relation", "evidence", "detectionModel", "proposedStatus", "drift", "note"]
    problems = []
    for index, finding in enumerate(F):
        if list(finding.keys()) != keys: problems.append((index, "keys"))
        for claim in finding["claimIds"]:
            if claim not in known: problems.append((index, "unknown claim " + claim))
        if not finding["claimIds"]: problems.append((index, "no claim ids"))
        if finding["proposedStatus"] not in statuses: problems.append((index, "status"))
        if finding["relation"] not in relations: problems.append((index, "relation"))
        if not finding["evidence"].strip() or not finding["detectionModel"].strip(): problems.append((index, "empty evidence/detection"))
    if problems:
        raise SystemExit("INVALID: " + json.dumps(problems))
    out = os.path.join(HERE, "lens-mw-src.jsonl")
    with open(out, "w") as handle:
        for finding in F:
            handle.write(json.dumps(finding, ensure_ascii=False) + "\n")
    print(json.dumps({"file": out, "count": len(F), "claims_known": len(known),
                      "claims_touched": sorted({c for f in F for c in f["claimIds"]})}))

if __name__ == "__main__":
    main()
