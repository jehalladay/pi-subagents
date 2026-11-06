#!/usr/bin/env python3
"""Phases 4-6 generator for claim group g02 (mw-interop epistemic triage).

Reads claims-part-02.jsonl; writes status-part-g02.jsonl, relations-part-g02.jsonl,
contradictions-part-g02.md and dossiers/<Cid>.g02.md (suffix avoids the known
C0201-C0279 id collision with claims-part-01).
All pin evidence below was re-opened by this investigator at the pins (git -C <pin>,
grep, sed) before grading; lens rows were treated as leads, not verdicts.
"""
import json, os

ROOT = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/scratch/mw-interop-triage/out/epistemic-triage"
P02 = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/02-host-architecture-and-protocol.md"
PIN_DOC = "doc@7c80c34346c2"
PIN_PI = "pi@b27829e6dfa7"
PIN_MW = "mw@f7c0a9431d6c"
PIN_MWB = "mw@0c78e253 (program baseline, read via git show inside the mw pin worktree)"

def ev(pin, path, lines, quote):
    return {"pin": pin, "path": path, "lines": lines, "quote": quote[:240]}

D = lambda p, l, q: ev(PIN_DOC, p, l, q)
P = lambda p, l, q: ev(PIN_PI, p, l, q)
M = lambda p, l, q: ev(PIN_MW, p, l, q)
B = lambda p, l, q: ev(PIN_MWB, p, l, q)

# ---- shared evidence objects (verified by this investigator at the pins) ----
E_BANNER = D(P02, "3", "**Status: design only.** All `mw.pi.*` contract names and shapes below are proposed, not shipped.")
E_DEV_SIG = M("packages/development/src/develop.ts", "21-24", "export async function develop(\n  services: DevelopmentServices,\n  request: DevelopmentRequest,\n): Promise<DevelopmentOutcome> {")
E_DEV_NE = M("packages/development/src/develop.ts", "36-38", 'if (scope.coverage !== "complete") {\n    return { kind: "needs_evidence", scope, reason: "SCOPE_INCOMPLETE" };\n  }')
E_SERVICES = M("packages/development/src/contracts.ts", "47-49", "export interface DevelopmentServices {\n  readonly discover: (request: DevelopmentRequest) => Promise<ScopeResult>;\n  readonly compileContext: (scope: ScopeResult, request: DevelopmentRequest) => Promise<CompiledContext>;")
E_OUTCOME = M("packages/development/src/contracts.ts", "54-55", 'export type DevelopmentOutcome =\n  | { readonly kind: "verified_candidate"; readonly candidate: Candidate; readonly verification: VerificationResult }')
E_OUTCOME_NE = M("packages/development/src/contracts.ts", "57", '| { readonly kind: "needs_evidence"; readonly scope: ScopeResult; readonly reason: "SCOPE_INCOMPLETE" }')
E_DESC_PIN = M("contracts/entrypoints/development.v1.json", "8-9", '"inputSchema": "development-request.v1.schema.json",\n  "outputSchema": "development-outcome.v1.schema.json",')
E_DESC_BASE = B("contracts/entrypoints/development.v1.json", "8-9", '"inputSchema": "../schemas/development-request.v1.schema.json",\n  "outputSchema": "../schemas/development-outcome.v1.schema.json",')
E_DESC_ID = M("contracts/entrypoints/development.v1.json", "3", '"id": "mechanical.development.develop.v1",')
E_DESC_SCHEMA = M("contracts/entrypoints/development.v1.json", "2", '"schema": "mechanical-workflows/entrypoint/v1",')
E_DESC_STATUS = M("contracts/entrypoints/development.v1.json", "16-17", '"status": "descriptor-only",\n  "note": "No remote host loader or generic invocation transport is implemented. Artifact binding belongs to the deployment host."')
E_DESC_BIND = M("contracts/entrypoints/development.v1.json", "10-15", '"bindings": [\n    "discover",\n    "compileContext",\n    "implement",\n    "verify"\n  ],')
E_FIX = M("git log 0c78e253..f7c0a9431d6c -- contracts/entrypoints/development.v1.json", "-", "1f29daa7 2026-11-05T08:49:21Z fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host tests (MechanicalWorkflows-14zrz)")
E_EH_FN = M("apps/development-rig/src/entrypoint-host.ts", "84", "export async function invokePinnedDevelopment(options: PinnedHostOptions, input: unknown): Promise<DevelopmentOutcome> {")
E_EH_CHECK = M("apps/development-rig/src/entrypoint-host.ts", "89-90", 'd.inputSchema !== "development-request.v1.schema.json" || d.outputSchema !== "development-outcome.v1.schema.json") {\n    throw new Error("ENTRYPOINT_CONTRACT_INVALID: unsupported descriptor, schema or entrypoint");')
E_EH_NAME = M("apps/development-rig/src/entrypoint-host.ts", "32", 'const NAME = "mechanical.development.develop.v1";')
E_EXEC_GRANT = P("src/workbench/execute.ts", "16", 'export const EXECUTE_GRANT = "workbench:execute";')
E_DETACH_GRANT = P("src/workbench/execute-tool.ts", "57", 'export const DETACH_GRANT = "workbench:detach";')
E_DETACH_ENF = P("src/workbench/execute-tool.ts", "215-216", 'if (admission.hostMode === "detached" && !rights.includes(DETACH_GRANT)) {\n        refuse("missing-detach-grant", `detached hostMode requires both ${EXECUTE_GRANT} and ${DETACH_GRANT}; execute alone never reaches a detached launch`);')
E_IDX_2873 = P("src/index.ts", "2873", 'if (!grants(ctx).includes(params.action === "launch" ? "workbench:detach" : "workbench:observe")) return textResult("Permission denied: explicit detached launch or observe grant required.");')
E_LIVE_IFACE = P if False else M("apps/development-rig/src/live-development.ts", "18-21", 'export interface LiveDevelopmentResult {\n  readonly mode: "live-claude-forge";\n  readonly discovery: "git-tracked-files";\n  readonly context: "plain-task-context" | "reactive-fiber";')
E_LIVE_TXN = M("apps/development-rig/src/live-development.ts", "48-49", "Caller must opt in to writes through the CLI. This application function itself\n * is not a durable transaction: interrupted agent writes require manual reconciliation.")
E_LIVE_COMMIT = M("apps/development-rig/src/live-development.ts", "135-136", 'if (after.commit === revision) {\n        throw new Error("AGENT_COMMIT_NOT_ESTABLISHED: the agent made no committed change");')
E_IDX_LAUNCH = P("src/index.ts", "2627-2628", 'cwd: ctx.cwd, input: launch.input, trustedScript: true, backend: claude ? "claude" : "deterministic",\n      providers: [], grants: [], permissions: ["inspect", "execute"], sourceFiles: [launch.source.sourceRef],')
E_IDX_CLAUDE = P("src/index.ts", "2623", 'const claude = settings?.workflowAgentBackend === "claude";')
E_IDX_2640 = P("src/index.ts", "2640", 'if (workbenchToolsRegistered || sourceSettings(ctx)?.workflowAgentBackend !== "claude") return;')
E_IDX_2881 = P("src/index.ts", "2881", 'backend:params.backend ?? "deterministic",providers:[],grants:[],permissions:["inspect","execute"],sourceFiles:[source.sourceRef],')
E_LD_427 = P("src/workbench/hosts/local-detached.ts", "427", 'if (!Array.isArray(grants) || grants.length > 128 || grants.some(grant => typeof grant !== "string" || !grant.trim() || grant.length > 256)) throw new Error("Invalid explicit grants.");')
E_LD_430 = P("src/workbench/hosts/local-detached.ts", "430", 'if (request.backend === "claude" && !grants.includes("claude:invoke")) throw new Error("Claude requires explicit claude:invoke grant (auth is SDK-owned and separate).");')
E_FH_HDR = P("src/workbench/hosts/furnace-hosted.ts", "4-6", "A Pi process registers ONE deterministic workflow callback as a Furnace\n * ExecutorApp executor, opens an EmbeddedHost for ONE Run, writes the Run's\n * extension-driver config")
E_FH_NORETRY = P("src/workbench/hosts/furnace-hosted.ts", "9", "This module adds no scheduler, no retry and no checkpoint.")
E_FH_ATTEMPT = P("src/workbench/hosts/furnace-hosted.ts", "7-9", "a Run's sequential Attempts share one\n * kept bridge connection and host session, and each Attempt is identified by its own\n * admission receipt. This module adds no scheduler, no retry and no checkpoint.")
E_FH_CLASS = P("src/workbench/hosts/furnace-hosted.ts", "240", "export class FurnaceHostedExecutor {")
E_COORD_PKG = M("packages/coordination/package.json", "2", '"name": "@mechanical/workflows-coordination",')
E_COORD_README = M("packages/coordination/README.md", "3", "Nothing in this package performs an effect: no file write, no process, no network, no SDK import. A proposal is **not** an authorized effect; the resolver decides which intents are *admissible* against one pinned basis, protected scopes and")
E_COORD_RECONCILE = M("packages/coordination/src/index.ts", "4", 'export { reconcile } from "./resolver.js";')
E_MWDOC_MODE = M("docs/programs/pi-workbench-interop-2026-11-04/02-binding-and-packaging-contract.md", "25", 'mode: "git-census" | "native-task-scope";')
E_MWDOC_EFFAUTH = M("docs/programs/pi-workbench-interop-2026-11-04/02-binding-and-packaging-contract.md", "26", "effectAuthorization: { allowed: boolean; operatorId: string; exactSourceBasis: string };")
E_DOC_PROFILE = D(P02, "40", 'profile: "git-census" | "native-task-scope";')
E_HX_NATIVE = M("apps/development-rig/src/hx-scope.ts", "33", 'queryDigest:answer.queryDigest,revision:null,scopeKind:"filesystem"};')
E_HX_COMPLETE = M("apps/development-rig/src/hx-scope.ts", "45-46", 'observed.scopeKind==="task"&&observed.revision===request.baseRevision&&\n    typeof observed.queryDigest==="string"&&!!observed.queryDigest;')
E_RF_ARGV = P("src/workbench/providers/reactivefiber.ts", "115", 'return ["--workspace",workspaceRoot,"context","render",...select,"--no-commit","--no-input","--json"];')
E_RF_NULLID = P("src/workbench/providers/reactivefiber.ts", "70", "if (!record(result) || result.ephemeral!==true || result.render_id!==null ||")
E_RF_READ = P("src/workbench/providers/reactivefiber.ts", "201", 'registry.register({descriptor:{id:"reactivefiber.render.preview",version:"1.0.0",description:"RF noncommitted context with native provenance; no authoritative or journal store write (disposable, reconstructible cache-plane writes may occur)"')
E_RFC_RENDERID = M("apps/development-rig/src/rf-context.ts", "84", 'typeof renderId !== "string" || !renderId.trim() ||')
E_J_EFFECT = P("src/workflow/journal.ts", "109-110", 'The effect class the host declared for the capability when the node ran.\n   * `"read"` is the only class a resume may replay; anything else — including')
E_J_STALE = P("src/workflow/journal.ts", "51-52", 'a "read" result may be handed\n * back on resume (marked stale, never fresh), while any other effect class is')
E_RT_SEM = P("src/workflow/runtime.ts", "737-738", "const semaphore = new Semaphore(options.concurrency ?? workflowConcurrency());\n  const nodeSemaphore = new Semaphore(16);")
E_LD_DAC = P("src/workbench/hosts/local-detached.ts", "12-13", "<base>/pw-<uid>/<digest>.sock under a private per-user runtime base\n * (XDG_RUNTIME_DIR, then /run/user/<uid>); under the shared tmpdir fallback it")
E_LD_SESSION = P("src/workbench/hosts/local-detached.ts", "495", 'if (sessionId !== process.pid || !/^\\d+$/.test(processStartTicks)) throw new Error("Host is not the actual detached OS session leader.");')
E_EDF_READ = M("apps/development-rig/test/entrypoint-descriptor-file.test.ts", "16", 'const committed = JSON.parse(readFileSync(descriptorUrl, "utf8")) as EntrypointDescriptor;')
E_EDF_DIGEST = M("apps/development-rig/test/entrypoint-descriptor-file.test.ts", "42", "artifactPath: packedLibrary, artifactDigest: digest(readFileSync(packedLibrary)), descriptor,")
E_IH_HDR = M("apps/development-rig/src/installed-host.ts", "1", "/** Transient local installer/loader for an exact SHA-256-pinned npm tarball. */")
E_IH_DIGEST = M("apps/development-rig/src/installed-host.ts", "37-38", 'const copyDigest = "sha256:" + createHash("sha256").update(await readFile(artifact)).digest("hex");\n        if (copyDigest !== options.artifactDigest) throw new Error("ENTRYPOINT_ARTIFACT_MISMATCH: artifact bytes changed during installation");')
E_CENSUS_PROSE = P("test/workbench-docs07-provider-rules.census.ts", "262", "contracts/entrypoints/development.v1.json declares optional descriptor-only entrypoint metadata.")

GREP_MWPI = "detector: grep -rn 'mw\\.pi\\.' over the full pi@b27829e6 and mw@f7c0a943 worktrees; sole hit is doc 02 itself (re-run by this investigator)"
GREP_PIDEP = "detector: grep -rn 'pi-subagents|\"@pi/|\"pi\"' over mw root/packages/apps package.json files: 0 hits; lens additionally grepped sources: 0 hits"
GREP_PITEST = "detector: grep -rln 'EntrypointDescriptor|development.v1.json|mechanical.development.develop' over pi src/ and test/: one hit, a census paragraph fixture (prose), no descriptor object or test"

# ---- per-claim grading (empirical rows) ----
GRADE = {}  # id -> dict(status, ps, overclaims, rationale, evidence, defeaters, rivals, propagation)

GRADE["C0201"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly, repo-scoped: no mw.pi.* contract name or shape is shipped in pi-subagents or MechanicalWorkflows at the pins; every mw.pi.* name in doc 02 is proposed only.",
    rationale="Absence verified with a capable detector: grep for 'mw.pi.' over both pinned worktrees returns only doc 02 itself. The banner's own framing matches the audited state. Scope is the two repos at the pins; artifacts outside the repos are outside the detector.",
    evidence=[E_BANNER], defeaters=["repo-scope detector only: grep covers the two pinned worktrees; out-of-repo or unpublished artifacts are outside it"],
    rivals=["counter-reading: 'shipped' could denote released artifacts beyond the two repos; the detector cannot reach those, so the established proposition is the repo-scoped one"],
    propagation="none (no depends_on); this row is the framing premise for the part's PROPOSAL/NORMATIVE rows", det=GREP_MWPI)

GRADE["C0211"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly: at mw@f7c0a943 Mechanical exports develop(services, request) returning Promise<DevelopmentOutcome>.",
    rationale="Re-located at the pin by this investigator: packages/development/src/develop.ts lines 21-24 export exactly develop(services: DevelopmentServices, request: DevelopmentRequest). No drift from the program baseline (packages/development unchanged 0c78e253..f7c0a943).",
    evidence=[E_DEV_SIG], defeaters=[], rivals=["none material; signature is verbatim at the pin"],
    propagation="none (no depends_on)")

GRADE["C0216"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly, repo-scoped: MechanicalWorkflows declares no dependency on Pi in any package manifest at mw@f7c0a943.",
    rationale="Absence with a stated detector: grep for pi-subagents/@pi refs over mw root, packages/* and apps/* package.json files returns nothing (re-run by this investigator); the scope lens additionally grepped sources with zero hits. Runtime/npm-resolution level not exercised (not run).",
    evidence=[M("packages/development/package.json", "-", "(no pi entry; grep over root, development, coordination and development-rig package.json: no match)")],
    defeaters=["manifest+source detector at the pins; npm install graph not resolved (not run)"],
    rivals=["counter-reading: an undeclared runtime coupling could exist outside manifests; no import of any pi module was found in mw sources either"],
    propagation="none (no depends_on)", det=GREP_PIDEP)

GRADE["C0221"] = dict(
    status="SUPPORTED", overclaims=True,
    ps="Evidence-qualified only: a committed Mechanical descriptor bearing id mechanical.development.develop.v1 exists at mw@f7c0a943 and the install-path tests consume it with a digest check; the descriptor's own status field says 'descriptor-only', so 'installed verified' may not be stated as a standing artifact state.",
    rationale="The id is verbatim in development.v1.json line 3 and in the host constant NAME (entrypoint-host.ts:32); entrypoint-descriptor-file.test.ts reads the committed file and digests a real packed tarball. But the file self-describes as 'descriptor-only' with no loader/transport, so 'installed verified descriptor' overstates install state.",
    evidence=[E_DESC_ID, E_EH_NAME, E_EDF_READ, E_DESC_STATUS],
    defeaters=["scope defeater on 'installed': descriptor status 'descriptor-only' + note 'No remote host loader or generic invocation transport is implemented'"],
    rivals=["narrower proposition ESTABLISHED: a committed, digest-checkable descriptor bearing that id exists at the mw pin and is consumed by install-path tests"],
    propagation="depends_on C0220 (NON-EPISTEMIC proposal): warrant is independent of the proposal (pin descriptor file), so the proposal does not cap this row")

GRADE["C0227"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly within Node/JS module semantics: importing packed code executes its module top-level as the importing process's code, with the host's privileges.",
    rationale="Valid derivation from module-loading semantics: import/require runs module top-level code in-process; no pin artifact bears on it and none is needed. The pins' only related precedent (installed-host.ts) loads a digest-pinned tarball precisely because import is execution.",
    evidence=[E_IH_HDR], defeaters=[], rivals=["counter-reading: a hypothetical isolated loader (vm/worker/subprocess) would not grant host privileges; the claim is about plain import, which the doc names"],
    propagation="none (no depends_on); platform-semantics scope travels with the claim")

GRADE["C0228"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly within OS process semantics: a temporary install directory is a filesystem location and provides no process isolation for imported code.",
    rationale="Analytic within OS semantics: isolation is a process/namespace property, not a directory property; code imported from a temp dir runs in the importing process. No pin artifact contradicts; installed-host.ts's temp-dir install plus in-process import is the live instance the sentence warns about.",
    evidence=[E_IH_HDR], defeaters=[], rivals=["none material: no reading makes a directory an isolation boundary"],
    propagation="none (no depends_on)")

GRADE["C0229"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly: at mw@f7c0a943 invokePinnedDevelopment checks the descriptor's schema names by exact string equality against the bare filenames.",
    rationale="Re-located at the pin: entrypoint-host.ts exports invokePinnedDevelopment at line 84 and lines 89-90 compare d.inputSchema/d.outputSchema to the two bare filenames, throwing ENTRYPOINT_CONTRACT_INVALID otherwise; file unchanged baseline..pin (git diff empty).",
    evidence=[E_EH_FN, E_EH_CHECK], defeaters=[], rivals=["none material; the check is verbatim at the pin"],
    propagation="none (no depends_on)")

GRADE["C0230"] = dict(
    status="REFUTED", overclaims=True,
    ps="Must be stated with the temporal split only: at the program baseline mw@0c78e253 the descriptor shipped '../schemas/' relative paths; commit 1f29daa7 (2026-11-05, after the doc) rewrote them to bare filenames, so at mw@f7c0a943 Mechanical no longer ships relative schema paths.",
    rationale="The present-tense proposition is contradicted at the environment pin: development.v1.json lines 8-9 carry bare filenames at mw@f7c0a943. git show 0c78e253 confirms '../schemas/' at the baseline and git log shows exactly one intervening commit (1f29daa7) changing those lines. Accurate when written; stale at the pin.",
    evidence=[E_DESC_PIN, E_DESC_BASE, E_FIX],
    defeaters=["temporal defeater: fixed by 1f29daa7 2026-11-05T08:49Z, ~2h after the Pi program commit; the doc at 7c80c343 was not updated"],
    rivals=["baseline reading PRESERVED as true: 'Mechanical ships relative schema paths' was accurate at mw@0c78e253 (../schemas/ prefixes verified via git show)"],
    propagation="downstream C0231/C0236 (repair proposals) inherit a stale problem statement; see their rows — the proposals are not refuted by this, but their rationale may no longer assert the defect as current")

GRADE["C0234"] = dict(
    status="REFUTED", overclaims=True,
    ps="The available evidence contradicts the proposition within the pi repo at b27829e6: no Pi test constructs or substitutes a hand-authored Mechanical descriptor; the hand-authored descriptor tests were MechanicalWorkflows' at its baseline and are file-driven at the mw pin.",
    rationale="Capable detector re-run: grep for EntrypointDescriptor/development.v1.json/mechanical.development.develop over pi src/+test/ yields one census prose fixture and no descriptor object or test. The repair's implicit premise misattributes MW's baseline tests (made file-driven by 1f29daa7) to Pi.",
    evidence=[E_CENSUS_PROSE, E_EDF_READ, E_FIX],
    defeaters=["provenance/misattribution defeater: the hand-authored tests lived in apps/development-rig/test at mw baseline, not in Pi"],
    rivals=["rival reading PRESERVED: doc 02 line 48 can be read as pure prescription for future Pi consumption, asserting no existing Pi test — under that reading the sentence is NON-EPISTEMIC and no false claim arises; the atomized observation fails under either reading",
            "baseline-MW reading: 'hand-authored descriptor tests exist' was true of MW at 0c78e253 and repaired at the pin"],
    propagation="C0233 depends on this row: its motivating premise fails; C0233 survives only as a normative decision, not as empirical repair", det=GREP_PITEST)

GRADE["C0240"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly: the workbench:detach grant exists in pi at b27829e6 (DETACH_GRANT constant) and is enforced for detached launches.",
    rationale="Re-located at the pin: execute-tool.ts:57 defines DETACH_GRANT='workbench:detach'; lines 215-216 refuse detached hostMode without it; index.ts:2873 gates the workflow_detached tool on the same string. 'Existing' is accurate.",
    evidence=[E_DETACH_GRANT, E_DETACH_ENF, E_IDX_2873], defeaters=[], rivals=["none material"],
    propagation="none (no depends_on); C0241 builds on this row")

GRADE["C0247"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly: at mw@f7c0a943 DevelopmentServices declares exactly discover, compileContext, implement and verify, and the committed descriptor binds the same four.",
    rationale="Re-located at the pin: contracts.ts lines 47-52 declare exactly the four callbacks; the descriptor's bindings array lists the same four in order. Joint warrant from interface and descriptor.",
    evidence=[E_SERVICES, E_DESC_BIND], defeaters=[], rivals=["none material; 'exactly four' verified against the full interface"],
    propagation="none (no depends_on); C0248 builds on this row")

GRADE["C0254"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly: the existing Mechanical journey at mw@f7c0a943 is a single-writer journey over Git tracked files with optional plain/RF context, a Claude implementation and a Forge gate.",
    rationale="Re-located at the pin: LiveDevelopmentResult hardcodes mode 'live-claude-forge', discovery 'git-tracked-files' and context 'plain-task-context'|'reactive-fiber'; the writer must commit (AGENT_COMMIT_NOT_ESTABLISHED) and the module doc declares the single-writer, non-transactional contract.",
    evidence=[E_LIVE_IFACE, E_LIVE_COMMIT, E_LIVE_TXN], defeaters=[],
    rivals=["note: 'explicitly labeled' holds via literals and comments; the label 'git-census' itself is NOT shipped vocabulary (see C0255)"],
    propagation="none (no depends_on); C0255/C0256 build on this row")

GRADE["C0267"] = dict(
    status="SUPPORTED", overclaims=False,
    ps="Evidence-qualified: under the writer service bundle the design binds (implement producing commits, verify dispatching gates), develop is effectful even when discover begins as a read.",
    rationale="Inference with a verified premise: the shipped journey's implement stage requires a new commit (live-development.ts 135-136) and verify runs a Forge gate, so an invocation that passes discover performs external effects. Caveat: develop(services,request) is parametric — with fixture/read-only services it performs no external effect.",
    evidence=[E_LIVE_COMMIT, E_DEV_SIG],
    defeaters=["scope defeater: effectfulness is a property of the bound writer services, not of develop() in isolation (fixture bundles are pure)"],
    rivals=["narrower proposition ESTABLISHED: develop under the rig's live writer bundle is effectful; the doc's sentence is a design rule for that binding"],
    propagation="none (no depends_on); C0268 builds on this row")

GRADE["C0275"] = dict(
    status="SUPPORTED", overclaims=False,
    ps="Evidence-qualified: an interrupt acknowledgement does not undo an agent commit or a native Forge/Furnace effect; durable producer effects persist past the interrupted process.",
    rationale="Analytic for durable external effects plus a pin witness: MW's module doc states the function is not a durable transaction and interrupted agent writes require manual reconciliation. No rollback mechanism exists at either pin.",
    evidence=[E_LIVE_TXN], defeaters=[],
    rivals=["counter-reading tested and failed: no compensation/rollback path exists in either pin's sources for commits or gate dispatches"],
    propagation="none (no depends_on); C0276 builds on this row")

GRADE["C0282"] = dict(
    status="SUPPORTED", overclaims=False,
    ps="Evidence-qualified and conditional: under the proposed embedded design, invocation state lives in the Pi process, so embedded mode cannot survive a crash of that process.",
    rationale="Analytic consequence of the proposed design (C0281: Pi process owns invocation and child SDK handles). Nothing serializes a live JS stack; the existing embedded host keeps controllers/sessions in process memory. Conditional on the proposal, not a property of shipped mw.pi code (none exists).",
    evidence=[D(P02, "72", "Pi process owns function invocation and child SDK handles, records structured events, and cannot survive its own crash.")],
    defeaters=["conditional scope: a future embedded design with external checkpointing would evade it; the doc proposes none"],
    rivals=["none material under the stated design"],
    propagation="depends_on C0281 (PROPOSAL): capped as a conditional/analytic consequence of the proposed design")

GRADE["C0286"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly as a static source contradiction at pi b27829e6 (not executed): the registered detached launch path sends backend 'claude' with grants:[] while the host preflight throws without claude:invoke, so the detached/SDK path refuses; the mechanism is the missing claude:invoke wiring, and an empty grant list itself passes the generic validator.",
    rationale="Both sides re-located at the pin: index.ts 2627-2628 hard-codes grants:[] (backend 'claude' whenever workflowAgentBackend==='claude', the only setting under which the tools register, line 2640); local-detached.ts:430 throws for backend claude without claude:invoke. A second site (workflow_detached, line 2881) has the same shape. Not run: static derivation only.",
    evidence=[E_IDX_LAUNCH, E_IDX_CLAUDE, E_LD_430, E_LD_427, E_IDX_2881],
    defeaters=["semantic defeater on the label only: 'empty-grants refusal' names the symptom; line 427 accepts an empty array, the refusal fires on the missing claude:invoke grant"],
    rivals=["stronger reading preserved: since registration itself requires workflowAgentBackend='claude' (index.ts:2640), every registered detached launch is refused at preflight at the pin",
            "scope split preserved: with backend 'deterministic' the same code path launches and passes — the contradiction is claude-backend-specific"],
    propagation="none (no depends_on); C0287 builds on this row")

GRADE["C0288"] = dict(
    status="ESTABLISHED", overclaims=False,
    ps="May state plainly: pi at b27829e6 ships export class FurnaceHostedExecutor (furnace-hosted.ts:240), and the module registers exactly one deterministic workflow callback per Furnace Run.",
    rationale="Re-located at the pin: the class exists verbatim at line 240 and the module header states ONE callback for ONE Run; the adapter refuses construction without a workflow callback. 'Existing' is accurate; Pi src is byte-identical baseline..pin.",
    evidence=[E_FH_CLASS, E_FH_HDR], defeaters=[], rivals=["none material"],
    propagation="none (no depends_on)")

GRADE["C0289"] = dict(
    status="SUPPORTED", overclaims=False,
    ps="Evidence-qualified: Furnace owns retry and Attempt identity; the Pi adapter adds no scheduler, retry or checkpoint, and each Attempt is identified by its own admission receipt.",
    rationale="Pin evidence is the adapter's own contract header (no retry/scheduler locally; Attempts identified by admission receipts) consistent with Furnace's documented ownership. The Furnace store/runtime itself was not inspected in this audit, so the cross-product ownership claim stays evidence-qualified.",
    evidence=[E_FH_ATTEMPT, E_FH_NORETRY],
    defeaters=["lineage limit: the Pi header and the program docs share authorship; Furnace-side sources are outside the pins"],
    rivals=["none found: no competing retry owner appears in either pin"],
    propagation="none (no depends_on); C0290 builds on this row")

GRADE["C0291"] = dict(
    status="SUPPORTED", overclaims=False,
    ps="Evidence-qualified: after a host crash, the live JS stack and in-memory execution state are not restored; recovery is from persisted records only.",
    rationale="Analytic platform semantics (no mechanism serializes a live JS stack across process death) consistent with the adapter's 'no checkpoint' contract. No pin artifact claims otherwise.",
    evidence=[E_FH_NORETRY], defeaters=[],
    rivals=["none material; a checkpoint/restore design would be a different proposal, and the doc proposes none"],
    propagation="none (no depends_on)")

GRADE["C0292"] = dict(
    status="SUPPORTED", overclaims=False,
    ps="Evidence-qualified: @mechanical/workflows-coordination exists at mw@f7c0a943 and its documented contract is pure evaluation (no file write, process, network or SDK import); purity is the package's stated and tested contract, not re-proven per-export here.",
    rationale="Existence is established (package.json name; exports incl. reconcile). Purity rests on the package's own README contract and its stated equivalence-law tests; this audit did not line-audit every export for effects, so the conjunction stays SUPPORTED.",
    evidence=[E_COORD_PKG, E_COORD_README, E_COORD_RECONCILE],
    defeaters=["purity verified at the documentation/contract level only in this audit"],
    rivals=["narrower proposition ESTABLISHED: the package exists and documents a no-effect contract with a resolver boundary"],
    propagation="none (no depends_on); C0293/C0294 build on this row")

# ---- notable NON-EPISTEMIC rows: presuppositions + consistency notes ----
NOTE = {
 "C0202": "shape is self-consistent with the FunctionLaunch block at doc lines 36-42.",
 "C0203": "admission-before-dispatch matches the existing execute-tool refusal ladder (grants checked before launch).",
 "C0204": "host registry is new; the two named modes correspond to existing pi hosts (claude-host embedded, local-detached).",
 "C0205": "precedent exists at the mw pin: installed-host.ts is a transient installer/loader for an exact SHA-256-pinned npm tarball whose digest is re-checked from installed bytes (lines 37-38); descriptor implementation.export is the single export 'develop'.",
 "C0206": "consistent with DevelopmentServices being injected callbacks (contracts.ts 47-52).",
 "C0207": "the two discover options mirror shipped facts: hx-scope.ts task-scope completeness vs live-development's git tracked-file census.",
 "C0208": "the two compileContext options mirror shipped facts: rf-context.ts committed render vs plain-task-context.",
 "C0209": "matches the shipped rig: claude-implement.ts + isolated workspace + AGENT_COMMIT_NOT_ESTABLISHED commit requirement.",
 "C0210": "matches the shipped rig verify stage (Forge gate observation returned natively).",
 "C0212": "typed outcome + producer refs matches DevelopmentOutcome and the nativeRefs vocabulary.",
 "C0213": "names existing pi surfaces (workflow_observe/inspector/workflow_control) being extended, not invented.",
 "C0214": "consistent with furnace-hosted.ts wrapping one callback per Run.",
 "C0215": "consistent with audited facts: MW declares no Pi dependency (C0216 ESTABLISHED) and owns its domain outcomes.",
 "C0217": "hosts at both pins already own/dispose native clients (rig adapters own HX/RF/Claude/Forge handles; pi providers are host-owned).",
 "C0218": "consistent with the pin: the committed descriptor is inert JSON ('descriptor-only'); nothing executes it.",
 "C0219": "presupposes a shippable pinned artifact source: a committed, digest-checkable descriptor and an npm-pack digest flow exist at the mw pin.",
 "C0220": "id and schema-version VALUES match the pin descriptor exactly (lines 2-3). NB: the descriptor names the field 'schema'; the proposal names it 'schemaVersion' — same value, different field name, a consistency nit to settle at implementation.",
 "C0222": "CONFLICT recorded (KG02-03): the MW program doc names the same selector 'mode' (02-binding-and-packaging-contract.md:25) while this doc names it 'profile' (02:40); same value set 'git-census'|'native-task-scope'. Neither identifier is shipped vocabulary at either pin.",
 "C0223": "consistent with the absence of any dynamic package/export loading surface at the pi pin; the norm bars a class of implementation, it does not describe one.",
 "C0224": "allowlist resolution is new; digest-check precedent exists (installed-host.ts).",
 "C0225": "digest-from-installed-bytes precedent: installed-host.ts 37-38; symlink/escape prevention precedent: local-detached realpath/session checks.",
 "C0226": "implicit premise is analytic: digest+schema validity says nothing about role/rights; consistent with the grant ladder (C0237-C0246).",
 "C0231": "STALE PREMISE: at mw@f7c0a943 one canonical grammar is already in force — bare basenames compared by exact equality (1f29daa7) — and a corpus-file test exists; residual scope is the formal grammar spec and Pi-side consumption.",
 "C0232": "consistent with the pin's exact-equality check, which accepts no arbitrary paths at all today.",
 "C0233": "MOTIVATING PREMISE REFUTED (C0234): Pi has no hand-authored descriptor test; the offending tests were MW's and are file-driven at the pin. The norm 'consume the canonical exported descriptor' remains a coherent forward rule for Pi.",
 "C0235": "ALREADY REALIZED at the mw pin for MW: entrypoint-descriptor-file.test.ts reads the committed descriptor and digests the real packed tarball (lines 16, 42). A Pi-side corpus-file contract test remains absent (no Pi descriptor test exists).",
 "C0236": "strictly stronger than what ships (exact-match accepts nothing unknown); traversal rejection becomes load-bearing only under the proposed resolving grammar.",
 "C0237": "presupposed grant exists: EXECUTE_GRANT='workbench:execute' (execute.ts:16).",
 "C0238": "the proposed grant string mechanical:develop:write appears nowhere at either pin (new vocabulary, correctly marked 'proposed').",
 "C0239": "consistent with the MW program's BoundInvocation.effectAuthorization {allowed, operatorId, exactSourceBasis} (MW doc 02:26) — same author, one lineage.",
 "C0241": "presupposed grant exists and is enforced: DETACH_GRANT (execute-tool.ts:57, refusal at 215-216, index.ts:2873).",
 "C0242": "consistent with the pin's grant model (grants are host-validated strings; no caller-supplied escalation path found).",
 "C0243": "partial precedent at the pin: local-detached validates realpath-based socket placement and OS session leadership (/proc stat, line 495).",
 "C0244": "no dispatch-time grant re-evaluation surface exists yet at the pi pin; the norm is new.",
 "C0245": "no effective-identity re-check surface exists yet at the pi pin; the norm is new.",
 "C0246": "consistent with the coordination package's resolver boundary (a proposal is not an authorized effect).",
 "C0248": "presupposes C0247 (ESTABLISHED): the four callbacks exist to be bound host-side.",
 "C0249": "consistent with the shipped single-writer journey (C0254) and its SOURCE_BASIS_CHANGED_BEFORE_DISCOVERY guard.",
 "C0250": "DELIBERATE STRENGTHENING vs shipped code: Pi's current replayBasis (claude-host.ts 166-175) omits source revision, instruction/skill digests and provider versions (part-01 finding); the definition adds exactly those.",
 "C0251": "applies the C0250 definition; consistent with the journal's refusal semantics (non-read classes never replayed).",
 "C0252": "consistent with MW: commit existence is checked (AGENT_COMMIT_NOT_ESTABLISHED) while verification is Forge's gate, not the commit.",
 "C0253": "consistent with MW's verified_candidate carrying a VerificationResult and the rig's GateObservation.",
 "C0255": "presupposes C0254 (ESTABLISHED). NB 'git-census' is proposed vocabulary only: the shipped literal is discovery:'git-tracked-files' and the only selectable axis is contextMode 'plain'|'rf'.",
 "C0256": "matches the shipped comment verbatim in spirit: 'Complete only for Git's tracked-file census, not task-specific semantic relevance' (live-development.ts ~78).",
 "C0257": "mirrors shipped hx-scope.ts completeness: scopeKind 'task', revision===baseRevision, nonempty queryDigest (lines 45-46); the default native query (revision:null, scopeKind 'filesystem', line 33) can never satisfy it.",
 "C0258": "ALREADY SHIPPED behavior at the mw pin: develop.ts 36-38 returns needs_evidence/SCOPE_INCOMPLETE before implement whenever coverage!=='complete'.",
 "C0259": "matches both pins: pi preview rejects any non-null render_id (reactivefiber.ts:70; argv --no-commit, effectClass 'read') and MW's committed render demands a nonempty render_id (rf-context.ts:84).",
 "C0260": "consistent: rf-context additionally demands a sha256 digest and graph_revision_id, so a fabricated id would still fail the provenance checks.",
 "C0261": "launch/settlement split is consistent with pi's journal rule (dispatch recorded independently of settlement); completion:'not-asserted' matches it.",
 "C0262": "the domainOutcome vocabulary equals MW's four DevelopmentOutcome kinds exactly (contracts.ts 55-58): consistent.",
 "C0263": "consistent with the native-verdict rule and MW's VerificationResult being gate-produced.",
 "C0264": "consistent with needs_evidence being a typed outcome at the mw pin that no adapter maps to success today (no adapter exists).",
 "C0265": "consistent; no shipped adapter exists to violate it (design-only).",
 "C0266": "consistent with Furnace Attempt identity living in admission receipts (furnace-hosted.ts header).",
 "C0268": "builds on C0267 (SUPPORTED); the identity-and-intent row is new persistence, consistent with the journal's dispatch-marker rule.",
 "C0269": "matches pi's journal semantics: a dispatch marker is written independently of settlement and a resume refuses on an unsettled marker.",
 "C0270": "consistent with journal semantics: non-read effects are tripwires, never silently replayed.",
 "C0271": "consistent with C0270; 'producer-native reconciliation' matches the journal's refusal-first stance.",
 "C0272": "matches the shipped rule exactly: a journaled 'read' may be handed back marked stale, never fresh (journal.ts 51-52, 109-110).",
 "C0273": "consistent with C0252/C0253: function result and provider verification are separate observations.",
 "C0274": "names the exact seam where part-01 found the per-agent beforeDispatch abort gap (claude-host.ts awaits at 207, controller registered after): the norm would close a real, documented gap.",
 "C0276": "builds on C0275 (SUPPORTED); 'classify unclear effects as uncertain' matches the journal's uncertain-effect refusals.",
 "C0277": "consistent with external Run ownership (furnace-hosted wraps a Run it does not own the lifecycle of).",
 "C0278": "consistent with Attempt identity from admission receipts; exact-target control is new surface.",
 "C0279": "consistent with producer-ownership throughout the program (SDK cancellation belongs to the producer).",
 "C0280": "consistent with the admission-boundary design; no shipped pause surface exists to check.",
 "C0281": "consistent with the existing embedded claude-host ownership model (controllers/sessions in the Pi process).",
 "C0283": "recommendation only; inherits C0281's consistency.",
 "C0284": "consistent with shipped local-detached: receipts and boot pin exist, reattach by invocation id exists, separate grant exists (DETACH_GRANT).",
 "C0285": "matches shipped DAC: per-uid socket directories (local-detached.ts 12-13) and OS session-leader verification (line 495); no network transport exists.",
 "C0287": "premise C0286 ESTABLISHED. NB the mechanism is the missing claude:invoke wiring on the registered path (empty list per se passes line 427), so the fix lands in the caller's grant wiring, not in empty-list handling.",
 "C0290": "builds on C0289 (SUPPORTED); pi's journal currently stores workflow effects, not Furnace rows — consistent.",
 "C0293": "hedged 'may be'; inherits C0292 (SUPPORTED existence+purity contract).",
 "C0294": "restates the package's own documented resolver boundary (README line 3: a proposal is not an authorized effect; reconcile decides admissibility).",
 "C0295": "presupposition supported: shipped limits are per-run Semaphores (runtime.ts 737-738) and no cross-invocation limiter was found at the pin (part-01 lens; detector grep over src).",
 "C0296": "the named limits are new; only per-run agent/node semaphores and the capability deadline exist today.",
 "C0297": "backpressure-with-reason is new surface; consistent with the refusal-first style of existing hosts.",
 "C0298": "tracing fields are new; consistent with existing structured-event recording in the embedded host.",
 "C0299": "consistent with current topology: forge-control/forge-operation-observer and furnace-hosted are separate pi modules with no cross-dependency found at the pin.",
}

PRESUP = {
 "C0205": [("a digest-pinned packed artifact and loader are feasible in this stack", "ESTABLISHED (precedent)", "installed-host.ts digest check (mw pin)")],
 "C0219": [("a shipped, pinned artifact can serve as descriptor source", "ESTABLISHED", "committed descriptor + npm-pack digest flow at mw pin")],
 "C0220": [("the id and schema version exist in a shipped descriptor", "ESTABLISHED", "development.v1.json lines 2-3")],
 "C0222": [("hostMode/profile axes exist to select", "NON-EPISTEMIC (proposed)", "no shipped selector; MW doc names the field 'mode' (conflict KG02-03)")],
 "C0231": [("Mechanical checks descriptor schema names in invokePinnedDevelopment", "ESTABLISHED", "entrypoint-host.ts 84, 89-90"),
            ("Mechanical ships relative schema paths", "REFUTED at pin (true at baseline)", "development.v1.json 8-9 at pin vs git show 0c78e253; fix 1f29daa7")],
 "C0232": [("a schema-ref resolution step will exist", "NON-EPISTEMIC (proposed)", "today's check is exact-equality, no resolution")],
 "C0233": [("Pi currently has hardcoded tests substituting a hand-authored descriptor", "REFUTED", "grep over pi src/+test/: no descriptor test; MW's tests were the hand-authored ones (now file-driven)")],
 "C0235": [("no corpus-file-driven descriptor contract test exists", "REFUTED for MW at pin / holds for Pi", "entrypoint-descriptor-file.test.ts exists at mw pin; no Pi-side descriptor test exists")],
 "C0237": [("a workbench:execute grant exists in pi", "ESTABLISHED", "execute.ts:16 EXECUTE_GRANT")],
 "C0241": [("the workbench:detach grant exists", "ESTABLISHED", "execute-tool.ts:57 + enforcement 215-216")],
 "C0248": [("the four callbacks exist to bind", "ESTABLISHED", "contracts.ts 47-52")],
 "C0255": [("the existing journey is as C0254 describes", "ESTABLISHED", "live-development.ts 18-21"),
            ("'git-census' names something shipped", "REFUTED as shipped vocabulary", "grep: no git-census identifier in any mw .ts at the pin; proposal vocabulary only")],
 "C0257": [("HX can emit task-scoped certified coverage", "SUPPORTED (shape exists)", "hx-scope.ts completeness contract 45-46; no live run in this audit (not run)")],
 "C0258": [("incomplete coverage can be detected and refused", "ESTABLISHED", "develop.ts 36-38 ships exactly this")],
 "C0260": [("an adapter could otherwise fabricate a render id", "ESTABLISHED (counterfactual guarded)", "rf-context demands id+digest+graph provenance")],
 "C0262": [("the four domainOutcome values exist in MW", "ESTABLISHED", "contracts.ts 55-58 exact match")],
 "C0266": [("Furnace Attempt identity is producer-issued", "SUPPORTED", "furnace-hosted.ts header: admission receipts")],
 "C0268": [("develop is effectful (C0267)", "SUPPORTED", "writer bundle commits; see C0267")],
 "C0287": [("the empty-grants/claude:invoke defect exists", "ESTABLISHED", "index.ts 2627-28 + local-detached.ts 430")],
 "C0290": [("Furnace owns retry/Attempt identity (C0289)", "SUPPORTED", "adapter header; Furnace sources outside pins")],
 "C0294": [("coordination emits proposals needing resolution", "ESTABLISHED", "README + reconcile export")],
 "C0295": [("current admission is per-run only", "SUPPORTED", "runtime.ts 737-738 per-run semaphores; no cross-invocation limiter found")],
}

EXTRA_EV = {
 "C0205": [E_IH_HDR, E_IH_DIGEST],
 "C0219": [E_DESC_STATUS, E_IH_DIGEST],
 "C0220": [E_DESC_SCHEMA, E_DESC_ID],
 "C0222": [E_DOC_PROFILE, E_MWDOC_MODE],
 "C0231": [E_DESC_PIN, E_FIX, E_EH_CHECK],
 "C0233": [E_CENSUS_PROSE],
 "C0235": [E_EDF_READ, E_EDF_DIGEST],
 "C0237": [E_EXEC_GRANT],
 "C0239": [E_MWDOC_EFFAUTH],
 "C0241": [E_DETACH_GRANT, E_DETACH_ENF],
 "C0243": [E_LD_SESSION],
 "C0248": [E_SERVICES],
 "C0250": [P("src/workbench/claude-host.ts", "166-175", 'const replayBasis = JSON.stringify([\n    config.cwd,\n    config.model ?? null,\n    permissionMode,\n    settings,\n    tools,\n    config.roles ?? null,\n    config.grants ?? null,\n    config.principal ?? null,\n  ]);')],
 "C0255": [E_LIVE_IFACE],
 "C0256": [M("apps/development-rig/src/live-development.ts", "78-81", '// Complete only for Git\'s tracked-file census, not task-specific semantic relevance. ... evidence: { system: "git", kind: "tracked-file-census", id: revision },')],
 "C0257": [E_HX_NATIVE, E_HX_COMPLETE],
 "C0258": [E_DEV_NE],
 "C0259": [E_RF_ARGV, E_RF_NULLID, E_RFC_RENDERID],
 "C0260": [E_RFC_RENDERID],
 "C0262": [E_OUTCOME, E_OUTCOME_NE],
 "C0266": [E_FH_ATTEMPT],
 "C0272": [E_J_STALE, E_J_EFFECT],
 "C0269": [E_J_EFFECT],
 "C0274": [P("src/workbench/claude-host.ts", "207", 'try { await config.beforeDispatch?.(); } catch (error) {')],
 "C0284": [E_LD_DAC],
 "C0285": [E_LD_DAC, E_LD_SESSION],
 "C0287": [E_IDX_LAUNCH, E_LD_430, E_LD_427],
 "C0290": [E_FH_NORETRY],
 "C0294": [E_COORD_README, E_COORD_RECONCILE],
 "C0295": [E_RT_SEM],
 "C0299": [E_FH_HDR],
}

KIND_VERB = {"PROPOSAL": "proposes", "NORMATIVE": "requires", "DEFINITION": "defines"}

def main():
    claims = [json.loads(l) for l in open(os.path.join(ROOT, "claims-part-02.jsonl")) if l.strip()]
    by_id = {c["id"]: c for c in claims}
    status_rows, relations, dossier_count = [], [], 0
    counts = {}

    # relations: DEPENDS_ON from the claims file (part-02-internal ids)
    for c in claims:
        for dep in c.get("depends_on", []):
            relations.append({"from": c["id"], "to": dep, "relation": "DEPENDS_ON",
                              "evidence": [], "joint": []})

    # relations: evidence-level rows (verified at the pins)
    def rel(frm, to, kind, evs, joint=None):
        relations.append({"from": frm, "to": to, "relation": kind,
                          "evidence": evs, "joint": joint or []})

    rel(f"{PIN_PI}:{P02}:3", "C0201", "SUPPORTS", [E_BANNER])
    rel(f"{PIN_MW}:packages/development/src/develop.ts:21-24", "C0211", "SUPPORTS", [E_DEV_SIG])
    rel(f"{PIN_MW}:packages/*/package.json+apps/*/package.json", "C0216", "SUPPORTS", [], None)
    rel(f"{PIN_MW}:contracts/entrypoints/development.v1.json:3", "C0221", "SUPPORTS", [E_DESC_ID])
    rel(f"{PIN_MW}:contracts/entrypoints/development.v1.json:16-17", "C0221", "CONTRADICTS", [E_DESC_STATUS])
    rel("C0221", f"{PIN_MW}:contracts/entrypoints/development.v1.json:3", "QUOTED_FROM", [E_DESC_ID])
    rel("C0220", f"{PIN_MW}:contracts/entrypoints/development.v1.json:2-3", "QUOTED_FROM", [E_DESC_SCHEMA, E_DESC_ID])
    rel(f"{PIN_MW}:apps/development-rig/src/entrypoint-host.ts:84-90", "C0229", "SUPPORTS", [E_EH_FN, E_EH_CHECK])
    rel(f"{PIN_MW}:contracts/entrypoints/development.v1.json:8-9", "C0230", "CONTRADICTS", [E_DESC_PIN, E_FIX])
    rel(f"{PIN_MWB}:contracts/entrypoints/development.v1.json:8-9", "C0230", "SUPPORTS", [E_DESC_BASE])
    rel(f"{PIN_PI}:src+test (descriptor grep)", "C0234", "CONTRADICTS", [E_CENSUS_PROSE])
    rel(f"{PIN_MW}:apps/development-rig/test/entrypoint-descriptor-file.test.ts:16", "C0234", "CONTRADICTS", [E_EDF_READ])
    rel(f"{PIN_PI}:src/workbench/execute-tool.ts:57", "C0240", "SUPPORTS", [E_DETACH_GRANT, E_DETACH_ENF])
    rel(f"{PIN_PI}:src/workbench/execute.ts:16", "C0237", "SUPPORTS", [E_EXEC_GRANT])
    rel(f"{PIN_MW}:packages/development/src/contracts.ts:47-52", "C0247", "SUPPORTS", [E_SERVICES],
        joint=[f"{PIN_MW}:packages/development/src/contracts.ts:47-52", f"{PIN_MW}:contracts/entrypoints/development.v1.json:10-15"])
    rel(f"{PIN_MW}:apps/development-rig/src/live-development.ts:18-21", "C0254", "SUPPORTS", [E_LIVE_IFACE, E_LIVE_COMMIT])
    rel(f"{PIN_PI}:src/index.ts:2627-2628", "C0286", "SUPPORTS", [E_IDX_LAUNCH, E_LD_430],
        joint=[f"{PIN_PI}:src/index.ts:2627-2628", f"{PIN_PI}:src/workbench/hosts/local-detached.ts:430"])
    rel(f"{PIN_PI}:src/workbench/hosts/furnace-hosted.ts:240", "C0288", "SUPPORTS", [E_FH_CLASS, E_FH_HDR])
    rel(f"{PIN_PI}:src/workbench/hosts/furnace-hosted.ts:7-9", "C0289", "SUPPORTS", [E_FH_ATTEMPT])
    rel(f"{PIN_MW}:packages/coordination/package.json:2", "C0292", "SUPPORTS", [E_COORD_PKG, E_COORD_README])
    rel(f"{PIN_MW}:apps/development-rig/src/live-development.ts:135-136", "C0267", "SUPPORTS", [E_LIVE_COMMIT])
    rel(f"{PIN_MW}:apps/development-rig/src/live-development.ts:48-49", "C0275", "SUPPORTS", [E_LIVE_TXN])
    rel("C0222", f"{PIN_MW}:docs/programs/pi-workbench-interop-2026-11-04/02-binding-and-packaging-contract.md:25", "CONFLICTS_WITH", [E_DOC_PROFILE, E_MWDOC_MODE])
    rel(f"{PIN_DOC}:{P02}:1-79", f"{PIN_MW}:docs/programs/pi-workbench-interop-2026-11-04/02-binding-and-packaging-contract.md", "SAME_ORIGIN_AS",
        [M("docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md", "66", "Detailed code-level evidence is in the paired Pi audit. These are Pi-owned; do not work around them by weakening Mechanical's candidate/source checks.")])
    rel("C0255", "C0254", "SPECIALIZES", [E_LIVE_IFACE])
    rel("C0256", "C0255", "SPECIALIZES", [])
    rel(f"{PIN_MW}:packages/development/src/develop.ts:36-38", "C0258", "SUPPORTS", [E_DEV_NE])
    rel(f"{PIN_MW}:apps/development-rig/src/hx-scope.ts:33-46", "C0257", "SUPPORTS", [E_HX_NATIVE, E_HX_COMPLETE])
    rel(f"{PIN_PI}:src/workbench/providers/reactivefiber.ts:70-115", "C0259", "SUPPORTS", [E_RF_ARGV, E_RF_NULLID],
        joint=[f"{PIN_PI}:src/workbench/providers/reactivefiber.ts:70", f"{PIN_MW}:apps/development-rig/src/rf-context.ts:84"])
    rel(f"{PIN_PI}:src/workflow/journal.ts:51-52", "C0272", "SUPPORTS", [E_J_STALE])
    rel(f"{PIN_PI}:src/workflow/runtime.ts:737-738", "C0295", "SUPPORTS", [E_RT_SEM])
    rel(f"{PIN_MW}:apps/development-rig/src/installed-host.ts:1-38", "C0205", "SUPPORTS", [E_IH_HDR, E_IH_DIGEST])
    rel(f"{PIN_MW}:apps/development-rig/test/entrypoint-descriptor-file.test.ts:16-42", "C0235", "SUPPORTS", [E_EDF_READ, E_EDF_DIGEST])
    rel(f"{PIN_PI}:src/workbench/hosts/local-detached.ts:12-13+495", "C0285", "SUPPORTS", [E_LD_DAC, E_LD_SESSION])
    rel(f"{PIN_MW}:packages/development/src/contracts.ts:54-58", "C0262", "SUPPORTS", [E_OUTCOME, E_OUTCOME_NE])

    os.makedirs(os.path.join(ROOT, "dossiers"), exist_ok=True)

    for c in claims:
        cid, kind = c["id"], c["kind"]
        material = bool(c.get("material"))
        wording = c.get("strongest_wording", "")
        prop = c["proposition"]
        src = c["source"]
        deps = c.get("depends_on", [])
        doc_ev = D(src["path"], src["lines"], wording or prop)

        if cid in GRADE:
            g = GRADE[cid]
            status, ps, over = g["status"], g["ps"], g["overclaims"]
            rationale = g["rationale"][:400]
            evidence = g["evidence"]
            defeaters, rivals = g["defeaters"], g["rivals"]
            propagation = g["propagation"]
        else:
            status, over = "NON-EPISTEMIC", False
            verb = KIND_VERB.get(kind, "states")
            short = prop if len(prop) <= 150 else prop[:147] + "..."
            ps = (f"Non-epistemic {kind.lower()}: may be stated only as what the design {verb} "
                  f"for mw.pi.function-invocation/v1, never as shipped or verified behavior — {short}")
            note = NOTE.get(cid, "no load-bearing empirical presupposition found beyond the design-only framing (C0201).")
            pres = PRESUP.get(cid)
            pres_txt = "; ".join(f"{p[0]} -> {p[1]}" for p in pres) if pres else "design-only framing C0201 -> ESTABLISHED"
            rationale = (f"{kind} row of the proposed contract (doc 02, design-only banner line 3). "
                         f"Presuppositions: {pres_txt}. Consistency: {note}")[:400]
            evidence = [doc_ev] + EXTRA_EV.get(cid, [])
            defeaters = []
            if cid in ("C0231",):
                defeaters = ["stale problem statement: the descriptor grammar was canonicalized at the mw pin (1f29daa7) after the doc"]
            if cid in ("C0233",):
                defeaters = ["motivating premise REFUTED (C0234): the hand-authored tests were MW's, not Pi's"]
            if cid in ("C0235",):
                defeaters = ["partially moot: the corpus-file test already exists at the mw pin (MW side)"]
            if cid in ("C0222",):
                defeaters = ["cross-doc naming conflict: MW program doc calls the field 'mode' (KG02-03)"]
            rivals = [f"as worded ({kind}) vs read as shipped behavior: the shipped reading is barred by the line-3 banner and the mw.pi.* grep (C0201)"]
            propagation = ("non-epistemic row; " +
                           ("; ".join(f"premise {d} at {('ESTABLISHED' if d in GRADE and GRADE[d]['status']=='ESTABLISHED' else GRADE[d]['status'] if d in GRADE else 'NON-EPISTEMIC')}" for d in deps)
                            if deps else "no depends_on") +
                           ". A broken empirical premise bars its restatement in the rationale but does not refute a norm/proposal (requirement force never upgrades or inherits warrant).")

        counts[status] = counts.get(status, 0) + 1
        row = {"id": cid, "kind": kind, "status": status,
               "permitted_strength": ps,
               "artifact_wording": wording,
               "overclaims": over,
               "rationale": rationale,
               "evidence": evidence,
               "defeaters": defeaters,
               "rivals_preserved": rivals,
               "depends_on": deps,
               "propagation": propagation,
               "missing_artifact": None,
               "material": material,
               "note": "ids are part-02-scoped: claims-part-01 reuses C0201-C0279 for different propositions" if cid == "C0201" else None}
        if row["note"] is None:
            del row["note"]
        status_rows.append(row)

        # ---- dossier for material claims ----
        if not material:
            continue
        dossier_count += 1
        det = GRADE.get(cid, {}).get("det")
        pres = PRESUP.get(cid)
        lines = []
        lines.append(f"# {cid} (part-02) — {prop}")
        lines.append("")
        lines.append("## Verbatim artifact wording")
        lines.append(f"> {wording}")
        lines.append(f"- Anchor: `{src['path']}` lines {src['lines']} (section: {src.get('section','-')}), doc pin {PIN_DOC}")
        lines.append("")
        lines.append("## Claim type and scope")
        lines.append(f"- Kind: {kind}" + (" (material)" if material else ""))
        lines.append(f"- Scope: {c.get('scope','-')}")
        lines.append(f"- Temporal/version context: {c.get('time_version','-')}")
        if c.get("implicit_premises"):
            lines.append(f"- Implicit premises: " + "; ".join(c["implicit_premises"]))
        lines.append("")
        lines.append("## Warrant verdict")
        lines.append(f"- Status: {status}")
        lines.append(f"- Permitted wording: {ps}")
        if over:
            lines.append("- Overclaims as worded: YES (see defeaters)")
        lines.append("")
        lines.append("## Support")
        lines.append("| Evidence | Relation | What it establishes | Limits |")
        lines.append("|---|---|---|---|")
        for e in evidence:
            q = e["quote"].replace("|", "\\|").replace("\n", " ")[:160]
            what = "bears directly on the proposition at the pin" if status != "NON-EPISTEMIC" else "the artifact states the row; extra cites check presuppositions"
            lim = "static read at the pin; nothing was executed (not run)"
            lines.append(f"| {e['pin']}:{e['path']}:{e['lines']} | SUPPORTS | {what}: \u201c{q}\u201d | {lim} |")
        if det:
            lines.append(f"| detection model | ABSENCE | {det} | repo-scope only |")
        lines.append("")
        lines.append("## Counterevidence / defeaters")
        if defeaters:
            lines.append("| Evidence | Defeater type | Effect |")
            lines.append("|---|---|---|")
            for d in defeaters:
                dt = "temporal" if "temporal" in d or "1f29daa7" in d else ("scope" if "scope" in d.lower() else ("semantic" if "semantic" in d or "label" in d else ("provenance" if "provenance" in d or "misattribut" in d or "lineage" in d else "undercutting")))
                lines.append(f"| {d.replace('|', '/')} | {dt} | caps or narrows the claim as recorded in the verdict |")
        else:
            lines.append("- none recorded")
        lines.append("")
        lines.append("## Dependencies")
        lines.append(f"- depends_on: {', '.join(deps) if deps else 'none'} (part-02 ids)")
        if pres:
            lines.append("- Presupposition statuses:")
            for p in pres:
                lines.append(f"  - {p[0]} -> **{p[1]}** ({p[2]})")
        downstream = [c2["id"] for c2 in claims if cid in c2.get("depends_on", [])]
        lines.append(f"- downstream claims affected: {', '.join(downstream) if downstream else 'none'}")
        lines.append("")
        lines.append("## Rival readings tested")
        if cid in GRADE:
            for r in rivals:
                lines.append(f"- {r}")
            lines.append("- upgrade/downgrade/settle: " + {
                "ESTABLISHED": "a runtime execution or a moved pin could still narrow it; a contrary pin artifact would downgrade it",
                "SUPPORTED": "a direct run / line-audit (or a producer-side source) would upgrade to ESTABLISHED; a contrary artifact would downgrade",
                "REFUTED": "only new evidence at the pin (not rewording) could revive it; the baseline reading stays preserved as history",
            }[status])
        else:
            verb = KIND_VERB.get(kind, "states")
            lines.append(f"- strongest support reading: the row as worded — a {kind} the design {verb}, motivated by the audited failure modes it addresses.")
            lines.append("- strongest counter-reading: read as a description of shipped behavior — barred by the line-3 design-only banner and the mw.pi.* absence (C0201).")
            lines.append(f"- narrower proposition clearly supported: the doc at {PIN_DOC} states this {kind.lower()} at {src['path']}:{src['lines']}.")
            lines.append("- what would settle/upgrade: an implementation plus conformance tests at a future pin turns conformance into empirical claims; program abandonment moots the row.")
        lines.append("")
        lines.append("## Adversarial attacks")
        if cid in GRADE:
            lines.append("- citation-entailment: every cited line re-opened at the pin by this investigator; quotes above are verbatim.")
            lines.append("- version mismatch: program baseline (pi f67b6665 / mw 0c78e253) vs pins checked; drift recorded where found (see defeaters).")
            lines.append("- documented-vs-implemented: the row was graded only against what the pins hold; nothing was executed (not run).")
            lines.append("- lineage: program docs (Pi 02 / MW program docs) are one authorial lineage; grading relied on primary sources, not doc agreement.")
            if det:
                lines.append(f"- absence discipline: {det}")
        else:
            lines.append("- presupposition attack: each implicit premise re-checked at the pins (statuses above); broken premises recorded, never silently inherited.")
            lines.append(f"- consistency attack vs audited facts: {NOTE.get(cid, 'no inconsistency found with the audited pin facts.')}" )
            lines.append("- category attack: confirmed non-epistemic (norm/proposal/definition); any 'documented implies implemented' reading rejected.")
        lines.append("")
        lines.append("## Missing evidence")
        lines.append("- none" if status != "UNDETERMINED" else f"- {row['missing_artifact']}")
        lines.append("")
        lines.append("## Remediation")
        if cid == "C0230":
            lines.append("- ADD_TEMPORAL_QUALIFIER (insert, doc is hash-pinned): annotate doc 02 line 48 that the relative-path observation describes mw@0c78e253 and was repaired by 1f29daa7 before mw@f7c0a943. Pin advance is the owner's decision; deferred: pin advance awaits the program owner (orchestrator).")
        elif cid == "C0234":
            lines.append("- NARROW_SCOPE + ADD_SOURCE (insert): restate the repair premise as MW's baseline tests (now file-driven); drop the implication that Pi carries such tests. Deferred: doc is hash-pinned; annotation insert awaits the program owner.")
        elif cid == "C0221":
            lines.append("- DOWNGRADE_MODALITY (insert): 'from installed verified descriptor' -> 'from the committed descriptor (digest-checked on install)'.")
        elif cid == "C0231":
            lines.append("- ADD_TEMPORAL_QUALIFIER (insert): note the canonical bare-basename grammar is already adopted at mw@f7c0a943 (1f29daa7); residual scope is the formal grammar spec + Pi-side consumption.")
        elif cid == "C0235":
            lines.append("- NARROW_SCOPE (insert): the MW-side corpus-file test exists at the pin; the residual proposal is the Pi-side consumption test.")
        elif cid == "C0233":
            lines.append("- ADD_MISSING_PREMISE correction (insert): re-ground the norm as NORMATIVE_DECISION (the empirical premise about Pi tests is refuted).")
        elif cid == "C0222":
            lines.append("- SURFACE_DISAGREEMENT: reconcile 'profile' (Pi doc) vs 'mode' (MW doc) before implementation; one name must win (tracker: program owner).")
        elif cid == "C0286":
            lines.append("- NARROW_SCOPE (optional insert): name the mechanism as missing claude:invoke wiring on the registered path; keep 'empty-grants' as the symptom label only.")
        else:
            lines.append("- none")
        lines.append("")
        with open(os.path.join(ROOT, "dossiers", f"{cid}.g02.md"), "w") as f:
            f.write("\n".join(lines))

    with open(os.path.join(ROOT, "status-part-g02.jsonl"), "w") as f:
        for r in status_rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    with open(os.path.join(ROOT, "relations-part-g02.jsonl"), "w") as f:
        for r in relations:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print("status rows:", len(status_rows))
    print("relations:", len(relations))
    print("dossiers:", dossier_count)
    print("counts:", json.dumps(counts))

if __name__ == "__main__":
    main()
