"""Builder for lens-pi-src.jsonl (MII triage, phase 3 wave-1 blind lens "pi-src").
Run: python3 -I gen-lens-pi-src.py   (writes lens-pi-src.jsonl beside this file, then validates it)

Every Pi citation was read in the pinned worktree pins/pi-0fb90672 (git rev-parse HEAD =
0fb9067262532289104417d2b7f2f25704563a75; git --no-optional-locks status --porcelain empty). Nothing in either repository was
written, built or executed; git was used read-only. Paths are relative to the triage root scratch/mii-triage-1110/.

Status convention of this file: proposedStatus is the status this lens proposes for the EMPIRICAL content of the listed rows.
Where a listed row is a PROPOSAL, NORMATIVE or DEFINITION row, the status is that of its embedded empirical premise and the
builder appends a bracketed scope sentence to the note saying so; a row listed with NON-EPISTEMIC carries a scope or wording
finding in drift and note, not a truth verdict.
"""
import glob
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "lens-pi-src.jsonl")
PI = "pins/pi-0fb90672/"
MW = "pins/mw-69cb016d/"

NO_SRC_DRIFT = (
    "pi 0fb90672 -> 3fc0ead1 (document pin = origin/master as fetched): 2 docs commits (91d8fa8c, 3fc0ead1), 7 paths = the 6 program "
    "docs + .agents/skills/pi-mechanical-interop/SKILL.md; `git diff --stat 0fb90672 3fc0ead1 -- src test qa package.json forge.toml` "
    "is empty, so this src/test evidence is unchanged at the document pin."
)

rows = []


def add(claim_ids, relation, evidence, detection, status, drift, note):
    rows.append({
        "lens": "pi-src",
        "claimIds": claim_ids,
        "relation": relation,
        "evidence": evidence,
        "detectionModel": detection,
        "proposedStatus": status,
        "drift": drift,
        "note": note,
    })


# ======================================================================================================================
# A. The registered tool surface
# ======================================================================================================================

add(
    ["C007"], "SUPPORTS",
    PI + "src/workbench/execute-tool.ts:173 `export function createWorkflowExecuteTool(deps: WorkflowExecuteDeps) {`; :175-176 "
    "`return defineTool({` / `name: \"workflow_execute\",`. The file holds exactly one `defineTool(` call and zero `registerTool(` calls "
    "(grep -c). The registration is " + PI + "src/index.ts:3009 `pi.registerTool(createWorkflowExecuteTool({`, inside "
    "registerWorkbenchTools, which returns early unless the validated settings select the Claude backend: index.ts:2684 "
    "`if (workbenchToolsRegistered || sourceSettings(ctx)?.workflowAgentBackend !== \"claude\") return;` (called from index.ts:991).",
    "grep -c 'defineTool(' and 'registerTool(' over src/workbench/execute-tool.ts; grep -n 'name: \"' over src/index.ts and "
    "src/workbench/*.ts for the other registered tool names.",
    "ESTABLISHED",
    "Wording: the artifact says the file 'registers' the tool; the file DEFINES it and src/index.ts registers it. 'One executable tool' "
    "is true of this file only: the same registration block also registers launch-capable tools workflow_detached (index.ts:2912, "
    "launches a reviewed script on the detached host) and forge_gate_run (index.ts:2861). " + NO_SRC_DRIFT,
    "Scope condition the artifact omits: the tool exists on the model path only in a session whose workbench settings set "
    "workflowAgentBackend 'claude' and whose native modules loaded (index.ts:2683-2702). Any 'actual registered tool' test (V3) "
    "inherits that precondition; test/workbench-pi-observe.test.ts:1-9 shows the existing boot-the-real-extension pattern "
    "(test/helpers/boot-extension).",
)

add(
    ["C008", "C046", "C108", "C147", "C212"], "SUPPORTS",
    PI + "src/workbench/execute-tool.ts:217-218 `} else if (admission.definition.kind !== \"script\") {` / "
    "`refuse(\"unsupported-definition-kind\", \"only script definitions launch in this host\");`. The launch itself sits only in the "
    "following else branch (:219-251), so no non-script request reaches deps.resolveSource or a launcher. Ordering: :215-216 a detached "
    "request without workbench:detach refuses `missing-detach-grant` BEFORE the kind test, and decideExecute refusals (:202-205) precede "
    "both. Pinned by " + PI + "test/workbench-execute-tool.test.ts:173-178 `it(\"refuses function and furnace-formula definitions in "
    "this host without resolving or launching\"` ... `expect(reply.error?.code).toBe(\"unsupported-definition-kind\");` and "
    + PI + "test/workbench-function-authority.test.ts:1680-1682 (embedded with execute; embedded and detached with execute+detach).",
    "Complete read of execute-tool.ts (256 lines): the only launcher calls are at :245; the only path to them is the kind === script "
    "branch.",
    "ESTABLISHED",
    "Scope: 'its non-script branch returns unsupported-definition-kind' holds for requests that pass decideExecute and, in detached "
    "mode, hold workbench:detach; a function request in detached mode without that grant is refused as missing-detach-grant instead. "
    + NO_SRC_DRIFT,
    "The refusal reaches the model as envelope.error.code with status 'refused', ok false, invoked false (execute-tool.ts:148-167). "
    "P05 must flip these two pinned test rows for the one allowlisted function id; they currently assert the opposite of the target.",
)

add(
    ["C010"], "SUPPORTS",
    PI + "src/workbench/execute-tool.ts:182 `kind: Type.Union([Type.Literal(\"script\"), Type.Literal(\"function\"), "
    "Type.Literal(\"furnace-formula\")]),`; the pure module admits the same three: " + PI + "src/workbench/execute.ts:83 "
    "`const DEFINITION_KINDS: readonly string[] = [\"script\", \"function\", \"furnace-formula\"];`; type at "
    + PI + "src/workbench/identity.ts:13 `readonly kind: \"script\" | \"function\" | \"furnace-formula\";`.",
    "",
    "ESTABLISHED",
    NO_SRC_DRIFT,
    "decideExecute returns decision 'admitted' for a well-formed function request holding workbench:execute (execute.ts:179, 199-209); "
    "only the tool shell refuses it. So 'function admission' exists as a pure decision while 'function launch' does not.",
)

add(
    ["C009", "C041", "C011"], "SUPPORTS",
    PI + "src/index.ts:3009-3018 the registration passes exactly two launchers, `launchEmbedded: launchEmbeddedWorkflow,` and "
    "`launchDetached: launchDetachedWorkflow,`, and `resolveSource: (definition, cwd) => inspectWorkflowSource({ scriptPath: "
    "definition.id }, cwd),` (:3015). launchEmbeddedWorkflow (:2621-2643) builds a script task: :2633-2634 `const task = "
    "createWorkflowTask({` / `id: runId, script: launch.source.source, scriptPath: launch.source.sourceRef, args: launch.input, meta,`. "
    "launchDetachedWorkflow (:2665-2680) calls `workbenchNative().launchDetachedWorkflow({` with `scriptPath: launch.source.sourceRef` "
    "and `trustedScript: true`. index.ts imports from ./workbench/ at :69-89 name no function-authority, mechanical-descriptor, "
    "mechanical-coordination or source-admission module.",
    "Absence surface: (1) the static import list of src/index.ts:69-89; (2) grep -rn over src/ for the module names and for every "
    "exported symbol (adoptFunctionActions, dispatchFunctionWithAuthority, decideFunctionAuthority, FUNCTION_ACTION_CONTRACT, "
    "admitSourceWrite, WriterLeases, confineWorkspace, measureSourceIdentity, WriteBoundaryAuthority, resolve/load/"
    "admitMechanicalEntrypoint): zero hits outside the defining files (mechanical-coordination.ts imports one constant from "
    "mechanical-descriptor.ts and itself has no importer); (3) every dynamic `import(` in src/ has a literal specifier, and "
    "native-modules.ts:62-69 lists none of them; (4) grep '@mechanical' over src/ and package.json: one hit, the allowlist string "
    "mechanical-descriptor.ts:131; (5) the detached host's load-by-path field localProvider (hosts/local-detached.ts:78, 476) is not "
    "passed at either registered call site (index.ts:2669-2674, 2924). Not searched: code outside the Pi repository.",
    "ESTABLISHED",
    NO_SRC_DRIFT,
    "The pin's own records agree: function-authority.ts:113 'Not wired: each pinned workflow_execute request naming a function "
    "definition resolves and launches nothing.'; source-admission.ts:45-46 'Not wired yet: workflow_execute still refuses a function "
    "definition (execute-tool.ts, unsupported-definition-kind) until the dispatch bead composes this seam.'; "
    "docs/workbench/receipts/wb-201v.md:9 'No production path dispatches a function today'.",
)

add(
    ["C001"], "SUPPORTS",
    "Pi half only. No function route in code (previous row). No release metadata carries one: grep -n -i "
    "'workflow_execute\\|unsupported-definition-kind' over " + PI + "CHANGELOG.md returns nothing; " + PI + "package.json version "
    "0.20.0 with no @mechanical dependency; " + PI + "docs/workbench/feature-matrix.md:112 W11 status `planned`; " + PI +
    "docs/workbench/mechanical-function-hosting.md:3 '**Status at 2026-11-09 audit pins: first-class Pi→Mechanical function "
    "invocation not shipped.**'",
    "Pi source and tests at 0fb90672 plus CHANGELOG.md, package.json, the feature matrix and the operator hosting page. The "
    "Mechanical half of the claim is not covered by this lens.",
    "SUPPORTED",
    "The program directory itself is absent from the 0fb90672 tree (docs/programs holds only the November 9 program); it arrives "
    "with 91d8fa8c. " + NO_SRC_DRIFT,
    "Baseline modules that predate the program (the three seams and the coordination boundary) are present and unwired; they are not "
    "an implementation of any packet.",
)

# ======================================================================================================================
# B. Descriptor boundary
# ======================================================================================================================

add(
    ["C012", "C104", "C027", "C088"], "SUPPORTS",
    PI + "src/workbench/mechanical-descriptor.ts:116 `export const MECHANICAL_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;`; :128-137 the "
    "frozen allowlist MECHANICAL_REVIEWED_ENTRYPOINTS with one entry `id: \"mechanical.development.develop.v1\",` `package: "
    "\"@mechanical/workflows-development\",` `export: \"develop\",` `inputSchema: \"development-request.v1.schema.json\",` "
    "`outputSchema: \"development-outcome.v1.schema.json\",` `bindings: Object.freeze([\"discover\", \"compileContext\", \"implement\", "
    "\"verify\"]),`; :160-163 `export interface MechanicalReleasePin { readonly descriptorDigest: string; readonly artifactDigest: "
    "string; }`; :326 resolveMechanicalEntrypoint (pin grammar :330, descriptor digest before parse :337, artifact digest :321); "
    ":365-374 loadMechanicalEntrypoint re-measures, runs the host loader once and reads `resolved.entry.export` off its result; "
    ":377 admitMechanicalEntrypoint. Producer side of the id: " + MW + "apps/development-rig/src/host-binding.ts:10 `export const "
    "HOST_BINDING_DESCRIPTOR_ID = \"mechanical.development.develop.v1\" as const;` and the committed descriptor's `\"id\"`.",
    "",
    "ESTABLISHED",
    "The module's own limits travel with the claim: :6-7 'FORM ... ENUMERATED, NOT GENERAL'; :87-90 'NOT CLAIMED ... that an installed "
    "package or a published tarball was read; the invocation contract and its version ... dispatch, grants, source admission and outcome "
    "validation'. Descriptor of record is named at MW f7c0a943 (:16); the vendored fixture " + PI +
    "test/fixtures/mw-development-entrypoint-v1.json is byte-identical (cmp; sha256 68cc312b...192d0f) to " + MW +
    "contracts/entrypoints/development.v1.json, so there is no descriptor drift f7c0a943 -> 69cb016d. " + NO_SRC_DRIFT,
    "'Has a loader' is all that is established: zero production callers (see the wiring row). The 'artifact' this boundary pins is "
    "ONE regular file by SHA-256 (:303-323), not a tarball plus runtime-file manifest; the loader itself is host-supplied "
    "(MechanicalExportLoader, :193) and the module imports nothing but node:crypto/fs/path.",
)

add(
    ["C133", "C165", "C103", "C135"], "CONTRADICTS",
    "Pi side: " + PI + "src/workbench/mechanical-descriptor.ts:131-132 the only reviewed entry is package "
    "`\"@mechanical/workflows-development\"`, export `\"develop\"`; :258-259 `if (implementation.package !== entry.package) return "
    "refused(\"package\", \"not-allowlisted\");` / `if (implementation.export !== entry.export) return refused(\"export\", "
    "\"not-allowlisted\");`; :108 `export const MECHANICAL_DESCRIPTOR_STATUS = \"descriptor-only\";` enforced at :265 `if (status !== "
    "MECHANICAL_DESCRIPTOR_STATUS) return refused(\"status\", \"status-unsupported\");`; :110 closed member set (eight names), :248 any "
    "other member `member-unexpected`; :371-372 the load reads `reviewedExport(namespace, resolved.entry.export)` and refuses "
    "`export-missing` when the loader's result has no own function member `develop`. Producer side at the paired pin: " + MW +
    "contracts/entrypoints/development.v1.json still reads `\"package\": \"@mechanical/workflows-development\"`, `\"export\": "
    "\"develop\"`, `\"status\": \"descriptor-only\"`, `\"note\": \"No remote host loader or generic invocation transport is "
    "implemented. Artifact binding belongs to the deployment host.\"`; " + MW + "apps/development-rig/src/host-binding.ts:5-6 'the "
    "status stays descriptor-only until an invocable package has separately passed joint ratification with Pi'; " + MW +
    "apps/development-rig/src/host.ts:13-18, 52 the `./host` module's value exports are HostBindingError, WRITE_GRANT, "
    "admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding, HOST_API_VERSION, HostAdmissionError and "
    "invokeDevelopmentHost - no `develop`.",
    "Complete read of mechanical-descriptor.ts (381 lines); cat of the MW descriptor; grep -n '^export' over the MW host.ts. The MW "
    "half is offered for the mw-src lens to confirm.",
    "CONTESTED",
    "The artifact has A0 resolve 'the saved reviewed definition and descriptor with Pi allowlist' (pi-02 L16) and P04/section 8 'import "
    "@mechanical/development-rig/host only from reviewed installed artifact' (pi-03 L41, pi-02 L47) without saying that the reviewed "
    "entry, on both sides at the pins, names a different package and export than the one P04 imports, and a status the boundary admits "
    "only as descriptor-only.",
    "Consequence for requirements: the existing loader cannot serve P04 unchanged. A loader that returns the host namespace is refused "
    "export-missing; a loader that imports the library tarball and returns `develop` has Pi supply the four callbacks itself, which "
    "section 8 rules out ('Pi consumes only @mechanical/development-rig/host', Pi does not 'reimplement developer logic', pi-02 L47) "
    "and P04's own Done line excludes ('actual MW producer host runs exact four callbacks', pi-03 L43). P00/P04 need an explicit decision: the reviewed "
    "descriptor's implementation target and status for the host route, the versioned validator that admits it (the closed member set "
    "refuses any new assurance member today), and which of Pi's admitMechanicalEntrypoint or MW's invokeDevelopmentHost performs the "
    "trusted import.",
)

# ======================================================================================================================
# C. Function authority
# ======================================================================================================================

add(
    ["C013", "C106", "C111"], "SUPPORTS",
    PI + "src/workbench/function-authority.ts:271 `export function adoptFunctionActions(bindings: readonly FunctionActionBinding[]): "
    "FunctionActionContract {` (1 to 64 bindings :272; exactly definitionId and actionGrant :275-276; :284 a grant in Pi's own "
    "namespace is refused, `if (actionGrant.startsWith(PI_NAMESPACE)) invalid(` with the text 'a workbench grant is Pi's own "
    "authority and never doubles as a function action grant.'; :285 each definition and grant bound once; :289 "
    "`ADOPTED.add(contract);` and :314 `if (!ADOPTED.has(contract) || contract.state !== \"adopted\") return undefined;`). Recheck: "
    ":359-369 dispatchFunctionWithAuthority: :362 entry decision, :364 `if (park !== undefined) await park();`, :365-366 `// The FINAL "
    "boundary: both reads are fresh at the rows the doc above names.` / `const final = decideFunctionAuthority({ admission, contract, "
    "entered, current: { grants: host.grants(), identity: host.identity() } });`, :368 `const value = await "
    "dispatch(final.authority);`. Exactness: :337 workbench:execute, :342 the bound action grant by `grants.includes(actionGrant)`; "
    "identity equality :332.",
    "",
    "ESTABLISHED",
    "Claimed by the module only at its pinned rows (:10-35 'Other requests, changes, callback outcomes and scheduling forms are NOT "
    "CLAIMED'). " + NO_SRC_DRIFT,
    "The final read covers grants and identity only; source, runtime manifest and lease fencing are not part of it.",
)

add(
    ["C105"], "QUALIFIES",
    PI + "src/workbench/function-authority.ts:263-270 'Adopts the exact action grants a producer contract binds, one per reviewed "
    "definition ... The returned contract, its binding list and each binding are frozen, and only a contract returned here is honored "
    "by decideFunctionAuthority.' against :199-211 FunctionDispatchOptions { admission, contract, host, park?, dispatch }.",
    "",
    "NON-EPISTEMIC",
    "pi-02 L18 writes the adoption call as step A2 of the per-invocation transaction ('A2 admit function action grant via "
    "adoptFunctionActions([...])'). In the code adoption is a one-time act that mints the contract object the host then holds; the "
    "per-invocation act is dispatchFunctionWithAuthority against that contract. " + NO_SRC_DRIFT,
    "A requirement should separate 'the host holds exactly one adopted contract, created after MW-CONTRACT ratification' from 'each "
    "invocation is decided against it at entry and again at the final boundary'. Calling the adoption per invocation would mint a new "
    "honored contract each time.",
)

add(
    ["C014", "C050", "C107", "C145", "C159"], "SUPPORTS",
    PI + "src/workbench/function-authority.ts:135 `export const FUNCTION_ACTION_BLOCKER = \"MW-CONTRACT\";`; :145 `export const "
    "FUNCTION_ACTION_CONTRACT: FunctionActionContract = Object.freeze({ state: \"unadopted\", blockedOn: FUNCTION_ACTION_BLOCKER });`; "
    ":105-107 'No action spelling is adopted: FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch refuses, and one that "
    "passes the earlier rules refuses as function-action-unadopted.'; :339-341 the refusal. History: `git log -S` on that declaration "
    "returns one commit, 029dabca (2026-11-06, wb-201v), so it has been unadopted since it was written. Spelling: grep -rF "
    "'mechanical:develop-write' over src/ and test/ returns nothing; the seam grammar :215 `const GRANT = "
    "/^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;` and settings.ts:415 accept that spelling (evaluated: true, 24 characters, not in the "
    "workbench: namespace), while " + PI + "test/workbench-function-authority.test.ts:252, 804 pins refusal of the earlier example "
    "`mechanical:develop:write`. Producer witness of the spelling: " + MW + "apps/development-rig/src/host-binding.ts:13-14 '/** "
    "Candidate grant spelling, not yet adopted jointly with Pi ... */' `export const WRITE_GRANT = \"mechanical:develop-write\" as "
    "const;`.",
    "grep -c 'export default' src/workbench/function-authority.ts = 0; grep over src/ for importers of FUNCTION_ACTION_CONTRACT = 0 "
    "(tests only); the two regexes were evaluated in node against the proposed spelling.",
    "ESTABLISHED",
    "Wording: 'exported default FUNCTION_ACTION_CONTRACT' - it is a named export (there is no ES default export); read as 'the default "
    "contract value' the claim holds. The suite's adopted contract uses the fixture grant `fixture-fn:develop-write` "
    "(test/workbench-function-authority.test.ts:249), not the proposed spelling. " + NO_SRC_DRIFT,
    "Nothing in production supplies any contract to the boundary, adopted or not, because nothing in production calls the boundary.",
)

# ======================================================================================================================
# D. Source admission, leases, composition
# ======================================================================================================================

add(
    ["C015", "C110", "C094"], "SUPPORTS",
    PI + "src/workbench/source-admission.ts:338-345 confineWorkspace: :343 `if (!contains(root, canonical)) return "
    "refusal(\"workspace-outside-root\");` :344 `if (worktreeRoot(git, canonical) !== canonical) return "
    "refusal(\"workspace-not-worktree-root\");`; :368-388 measureSourceIdentity (HEAD^{commit} and HEAD^{tree} :374-375, ls-files tags "
    ":377-378, status :379-382 dirty-base, gate manifest :383-384, digest :386); :463-467 writesRequested (own data member allowWrites "
    "=== true); :481 `if (!writesRequested(request.policy)) return refusal(\"writes-not-requested\");`; :499-503 rule 10/11 re-measure "
    "and attestation re-read after the wait (`source-changed`).",
    "",
    "ESTABLISHED",
    "Two qualifiers. (a) The module never names forge.toml: the manifest is a host-declared workspace-relative path (:146-147 'The "
    "gate manifest the identity binds'); forge.toml is the suite's fixture value (test/workbench-mechanical-source-admission.test.ts:"
    "520, 527). (b) :355-357 'Dirtiness is read from git status alone, so an edit git status does not list is measured clean (the "
    "suite's residual family UNLISTED-EDITS pins two such edits)' - 'clean' therefore excludes ignored files. " + NO_SRC_DRIFT,
    "Confinement is 'realpath inside the authorized root AND the root git reports for its own worktree'; a subdirectory of a worktree "
    "is refused. Claimed by the module only at its suite-planted forms.",
)

add(
    ["C089"], "QUALIFIES",
    PI + "src/workbench/source-admission.ts:16-17 rule 3 'the write request (writes-not-requested): request.policy asks for writes ... "
    "asking grants nothing' and :481 the refusal; " + PI + "src/workbench/mechanical-descriptor.ts:160-163 the pin holds two digests, "
    "descriptorDigest and artifactDigest, the latter over one regular file (:303-323); " + PI + "src/workbench/execute.ts:84 `const "
    "DIGEST = /^sha256:[0-9a-f]{64}$/;` is the only rule on definitionRef.artifactDigest, and for a script the shell compares it with "
    "the saved source's digest (execute-tool.ts:227).",
    "",
    "NON-EPISTEMIC",
    "pi-02 L5 calls the policy {allowWrites:true} 'optional' and gives the definition reference one `artifactDigest:<sha256>`. "
    + NO_SRC_DRIFT,
    "Two things the request surface leaves open against the pin. (1) If the source seam is reused, a write function without "
    "allowWrites is refused writes-not-requested, so the policy is required, not optional. (2) The route involves at least three "
    "byte identities (the descriptor, the library tarball the Mechanical host admits, the rig package that exports the host) plus a "
    "runtime manifest; the surface does not say which one the model-supplied artifactDigest names or what it is compared with.",
)

add(
    ["C016", "C042", "C117"], "SUPPORTS",
    PI + "src/workbench/source-admission.ts:430-431 `export class WriterLeases {` / `  readonly #held = new Map<string, "
    "WriterLease>();`; :434-440 acquire: `if (this.#held.has(canonicalRoot)) return undefined;` ... `this.#held.set(canonicalRoot, "
    "lease);`; :443-447 release deletes only for the very lease object; :450-452 holder. Header :46-47 'One WriterLeases registry "
    "binds the writers of one host process.' The host hands the registry in: :152 `readonly leases: WriterLeases;`.",
    "Absence of a durable or shared store: complete read of the class (:430-453) - its three methods touch only the private Map; the "
    "module's imports (:49-53) are node:crypto, node:fs (lstatSync, readFileSync, realpathSync, used for realpath and the manifest "
    "bytes) and node:path. grep -rn 'new WriterLeases' over src/ = 0 (tests only).",
    "ESTABLISHED",
    "'Process-local' is an upper bound: the Map is a private field of one WriterLeases INSTANCE, the module exports the class and no "
    "singleton, and no production code constructs one, so two registries in one process would not exclude each other either. "
    + NO_SRC_DRIFT,
    "The lease record itself is two fields (:130-133 canonicalRoot, invocationId).",
)

add(
    ["C025"], "SUPPORTS",
    "Pi half only. The one writer-lease implementation is the in-memory registry of the previous row. Other cross-process primitives "
    "in " + PI + "src/: src/schedule-store.ts:27 `writeFileSync(lockPath, `${process.pid}`, { flag: \"wx\" });` (a PID lock for the "
    "session schedule file; :31-36 it unlinks a lock whose PID is not running) and src/workbench/hosts/local-detached.ts:291 an "
    "O_CREAT|O_EXCL create used for the invocation-id reservation. Neither guards a workspace root.",
    "grep -rn -i 'flock\\|lockfile\\|O_EXCL\\|\"wx\"' over src/ (the two sites above plus lockfile mentions in identity.ts that concern "
    "package-lock.json); grep -rn 'fsync\\|fdatasync' over src/ = 0; grep -rl 'WriterLeases' over test/: only "
    "workbench-mechanical-source-admission.test.ts; grep -rlwi 'lease\\|leases' over src/: source-admission.ts (writer leases) and "
    "workflow/admission.ts, runtime.ts, telemetry.ts (HostAdmissionLease, an in-memory capacity permit, admission.ts:98-103). "
    "Mechanical's tree and receipts are not covered by this lens.",
    "SUPPORTED",
    NO_SRC_DRIFT,
    "The schedule-store lock releases on PID liveness alone, which is the rule pi-02 section 4 forbids for writer leases ('A timeout "
    "is not proof of safe release'), so it is not a reusable pattern for P02.",
)

add(
    ["C043"], "SUPPORTS",
    PI + "src/workbench/source-admission.ts:488 `const lease = host.leases.acquire(admitted.identity.canonicalRoot, "
    "request.invocationId);` ... :505 `const value = await dispatch(grant);` :506 `return Object.freeze({ decision: \"dispatched\", "
    "identity: current.identity, value });` :507-509 `} finally {` / `host.leases.release(lease);` / `}`. Header :41 'The lease rule 7 "
    "takes is released when a later rule refuses and when dispatch settles; an error dispatch throws propagates unchanged.'",
    "",
    "ESTABLISHED",
    "Wording: 'released when the dispatch promise resolves' is slightly narrow; the finally block releases when dispatch SETTLES "
    "(resolves or rejects) and also when rules 8-11 refuse after the lease was taken. " + NO_SRC_DRIFT,
    "The lease lifetime is exactly the lifetime of the promise the host's dispatch callback returns; nothing in the module ties it to a "
    "writer's termination.",
)

add(
    ["C044", "C081", "C155"], "SUPPORTS",
    "Both existing launchers resolve at launch, not at completion. " + PI + "src/index.ts:2640-2642 `// Background, like "
    "SubagentWorkflow: the reference comes back now and completion is read through workflow_observe.` / `void runWorkflowTask(ctx, "
    "task).then(() => notifyWorkflowFinished(task));` / `return [{ provider: \"pi-workflow\", type: \"task\", id: runId, ...`; "
    ":2669-2679 the detached launcher awaits only the host's receipt and returns two native references. The deps contract says so: "
    + PI + "src/workbench/execute-tool.ts:98-101 'resolves to the native references the host reports (never completion)'.",
    "",
    "SUPPORTED",
    "C044 and C081 are hypotheses about a function launcher that does not exist; what is established is the structural premise for "
    "the two script launchers plus the lease lifetime of the previous row. No run exhibits an early release, because nothing "
    "composes the two. C155's scope sentence 'script path uses the same helper' is wrong at the pin (next row). " + NO_SRC_DRIFT,
    "If a function launcher with the existing launch-returns-references shape were passed as admitSourceWrite's dispatch, the lease "
    "would be released when the references come back. That is a derivation from two code facts, not an observed defect.",
)

add(
    ["C154"], "CONTRADICTS",
    "grep -rn 'WriterLeases\\|admitSourceWrite\\|source-admission' over " + PI + "src/ returns only the defining file "
    "src/workbench/source-admission.ts; the sole user is " + PI + "test/workbench-mechanical-source-admission.test.ts. Neither script "
    "launcher (src/index.ts:2621-2643, 2665-2680) takes a writer lease or calls source admission.",
    "grep over src/ for the module name and each exported symbol; complete read of both launchers.",
    "UNSUPPORTED",
    "pi-03 L29 'Keep existing script helper behavior unless requalified' (P02) presupposes a script path that uses this lease helper; "
    "the companion claim row C155 states it outright in its scope ('script path uses the same helper'). At the pin no script path "
    "uses it. " + NO_SRC_DRIFT,
    "What IS established for this row's other premise: the pure checks are separable. confineWorkspace (:338) and "
    "measureSourceIdentity (:368) are exported on their own, WriterLeases (:430) and WriteBoundaryAuthority (:397) are separate "
    "classes, and only admitSourceWrite (:478) couples them to the release-in-finally lifetime. 'Remove lease release from "
    "launch-return lifetime for function workflows' therefore changes a helper with no production caller; there is no script "
    "behaviour to preserve in this seam.",
)

add(
    ["C047", "C046", "C053"], "SUPPORTS",
    "Import graph at the pin: " + PI + "src/index.ts:69-89 (the ./workbench/ imports) and " + PI + "src/workbench/native-modules.ts:"
    "62-69 (the one dynamic-import seam) reach none of function-authority.ts, mechanical-descriptor.ts, mechanical-coordination.ts, "
    "source-admission.ts. `ls src/workbench/hosts` = furnace-hosted.ts, local-detached.ts. grep -rci mechanical over src/ lists ten "
    "files; the ones that are Mechanical boundaries (mechanical-descriptor.ts, mechanical-coordination.ts, collective-event.ts, "
    "function-authority.ts, source-admission.ts) each have zero importers in src/. grep -n -i mechanical over "
    "src/workbench/{observation,observe-query,control,control-tool,reconcile-decision,reconcile-tool}.ts and "
    "src/workflow/reconcile.ts: no hit.",
    "Per-module importer count by grep -rln '/<module>.js\"' over src/ excluding the module itself; directory listing of "
    "src/workbench/hosts; fixed-string grep of the observation, control and reconcile modules.",
    "ESTABLISHED",
    "Conjunction: the artifact's one sentence covers three different states. Function authority and the descriptor/source guards "
    "EXIST and are unwired; a Pi-side Mechanical host does not exist at all (no module), which docs/workbench/feature-matrix.md:112 "
    "already records ('No binding host exists ... no module under src/workbench/hosts/ names MechanicalWorkflows'). "
    "hosts/furnace-hosted.ts also has zero importers. " + NO_SRC_DRIFT,
    "The README baseline lists three seams and omits two further unwired Mechanical boundaries present at the pin: "
    "mechanical-coordination.ts (the pure `reconcile` export under its own grant, :136 `export const MECHANICAL_COORDINATION_GRANT = "
    "\"workbench:coordinate\";`, the only src change since the November 9 deposit) and collective-event.ts. P12's 'pure coordination "
    "operations receive separate reviewed IDs, effect classes and grants' already has this partial witness, and it uses a grant in "
    "Pi's own workbench: namespace, which adoptFunctionActions refuses for function actions (function-authority.ts:284).",
)

add(
    ["C048", "C082", "C113"], "SUPPORTS",
    "Each seam ends 'final check, then await dispatch' and neither knows the other. " + PI + "src/workbench/function-authority.ts:8-9 "
    "'its launch may wait ... before its loader imports the pinned export and its provider runs'; :205-207 'The loader and provider "
    "calls. At the rows the doc of dispatchFunctionWithAuthority names, they are invoked only on an authorized FINAL decision'; "
    ":366-368 final decision then `await dispatch(final.authority)`. " + PI + "src/workbench/source-admission.ts:500-505 fresh "
    "measurement and attestation, then `await dispatch(grant)`. Neither file imports the other (function-authority.ts:129-132; "
    "source-admission.ts:49-53).",
    "Complete read of both modules and their import lists.",
    "SUPPORTED",
    "A derivation from code structure, not a demonstrated race. " + NO_SRC_DRIFT,
    "Two concrete consequences. (1) Nesting either seam inside the other's dispatch puts the outer final check before the inner wait, "
    "so one axis is always stale by the time the inner dispatch runs. (2) In the authority seam the loader (artifact import) is part "
    "of `dispatch`, that is AFTER the final grant read, so the artifact's own counterexample 'grant revoked after installation but "
    "before first writer effect' (pi-01 L34) is not covered by the existing boundary; pi-02 A5 needs the install before the last "
    "check or a second check after it.",
)

add(
    ["C160", "C109", "C103"], "QUALIFIES",
    "The retained source seam cannot dispatch without an operator attestation: " + PI + "src/workbench/source-admission.ts:22-23 rule "
    "6 'host.attestation is an object host.authority minted (attestation-absent), whose workspace is that canonical root "
    "(attestation-other-workspace) and whose sourceIdentity is that identity's digest (attestation-stale)'; :469-475 boundaryOf; "
    ":486-487 before the lease and :502-503 again after the wait. grep -rn 'new WriteBoundaryAuthority' over src/ = 0, so no "
    "production channel mints one.",
    "",
    "CONTESTED",
    "pi-03 L35 (P03) lists 'operator attestation and authorized root' among the axes; pi-02 A0-A6 (L16-L22) has no attestation step "
    "and pi-02 section 7 has no attestation refusal. The two documents disagree about whether the first release has one. "
    + NO_SRC_DRIFT,
    "If admitSourceWrite is composed as it stands, every function admission refuses attestation-absent until something mints an "
    "attestation for the measured identity. The requirement set has to say who attests (which operator action, through which host "
    "channel) or that the rule is dropped for this route.",
)

add(
    ["C112", "C115", "C116", "C121"], "QUALIFIES",
    "The existing lease record has two fields: " + PI + "src/workbench/source-admission.ts:130-133 `export interface WriterLease {` / "
    "`readonly canonicalRoot: string;` / `readonly invocationId: string;` / `}`. It has no generation, owner, acquisition time, state "
    "or heartbeat, and the registry has no state between 'held' and 'absent' (:434-452). An intent-before-dispatch row does exist for "
    "script nodes: " + PI + "src/workflow/journal.ts:59-64 (the `dispatched` marker appended before the provider call).",
    "Complete read of the WriterLease interface and WriterLeases class; grep -c 'generation\\|heartbeat\\|fenc' over "
    "source-admission.ts = 0.",
    "ESTABLISHED",
    "Everything in the proposed lease object except the root and the invocation id is new, as is every state other than held. "
    + NO_SRC_DRIFT,
    "'Prompt/script worktrees remain unaffected' (pi-02 L31) is true by construction at the pin, since no prompt or script path "
    "takes a writer lease. 'Not the existing process-local WriterLeases alone' (pi-02 L28) leaves open whether the in-memory registry "
    "is kept as a first-level check under the durable lock or replaced; P02's 'retain pure checks' does not settle it, because the "
    "registry is not one of the pure checks.",
)

add(
    ["C120"], "SUPPORTS",
    PI + "src/workbench/source-admission.ts:428 'admitSourceWrite keys the lease by the canonical root it measured, never by the "
    "caller's spelling of the workspace.' and :488 `host.leases.acquire(admitted.identity.canonicalRoot, request.invocationId)`. "
    "Pinned in " + PI + "test/workbench-mechanical-source-admission.test.ts:81-82 (the EAT-R024 mutant 'Allocate lease by caller alias "
    "instead of canonical root'), :87-88 R024-ALIAS (case at :1160) and :94-95 R024-TWO-ROOTS (case at :1244).",
    "",
    "ESTABLISHED",
    "Within one registry instance in one process only. " + NO_SRC_DRIFT,
    "Also pinned and relevant to P07's 'reattach same invocation': the holder's own invocation id cannot re-acquire its root "
    "(:113-115 R024-HOLDER-ID-ADMISSION, case at :1357), so reattachment needs a different primitive than acquire.",
)

add(
    ["C026"], "QUALIFIES",
    "The only worktree-creating primitive in Pi places worktrees under the temp directory: " + PI + "src/worktree.ts:139 `const "
    "worktreePath = join(tmpdir(), `pi-agent-${agentId}-${suffix}`);` and :143 `git worktree add --detach <path> HEAD`. Source "
    "admission refuses a workspace outside the host's authorized root: " + PI + "src/workbench/source-admission.ts:343 "
    "`workspace-outside-root`. The tool's workspace scope is the session directory: " + PI + "src/index.ts:2506-2508 `return { "
    "workspace: realpathSync(ctx.cwd), principal: localPrincipal(ctx) };`.",
    "",
    "NON-EPISTEMIC",
    "The release definition's 'one clean isolated Git worktree' names no creator and no location; pi-02 A3 says 'resolve canonical "
    "Git worktree' without saying how it relates to the session directory or to the authorized root. " + NO_SRC_DRIFT,
    "A point to settle in requirements, not a defect: made with the existing helper, the isolated worktree lies outside an "
    "authorized root equal to the session workspace; if it is the session directory itself it is not isolated. Either the host "
    "authorizes a second root for function worktrees or Mechanical's own materialization supplies the path.",
)

# ======================================================================================================================
# E. Input identity
# ======================================================================================================================

add(
    ["C038", "C096", "C150"], "SUPPORTS",
    PI + "src/workbench/execute.ts:185 `const judged = (value: unknown): unknown => (kind === \"function\" ? "
    "withoutBeadsNotes(value) : value);`; :193 `const inputText = boundedJson(judged(input.value), INPUT_BYTES);`; :203 `inputDigest: "
    "identityDigest(\"workflow-execute-input\", JSON.parse(inputText)),`; the policy takes the same path (:188). " + PI +
    "src/workbench/identity.ts:176-211 withoutBeadsNotes: :202 `if (key === BEADS_NOTE_FIELD) continue;` runs before any descriptor "
    "read, so a note getter is never invoked; it returns a new record or array for plain forms and the original item for depth over "
    "64 or a cycle (:179), a sparse array (:188), a non-plain prototype (:199), a symbol or prototype key (:203) and an accessor or "
    "non-enumerable member (:205).",
    "",
    "ESTABLISHED",
    "Claimed by the module only at the EAT-R154 rows (execute.ts:38-41 'other request forms are NOT CLAIMED'). The key test is by "
    "NAME at every depth: any own member called `notes` in any plain record is dropped, not only Beads export rows. " + NO_SRC_DRIFT,
    "This lens's reading, not test-verified here: every form for which withoutBeadsNotes returns the original is one canonicalJson "
    "refuses (identity.ts:104 depth, :108 cycle, :110-112 prototype, :117-122 arrays, :129-130 hidden or symbol keys, :133 prototype "
    "keys, :137 accessors), so a returned-as-is form ends as malformed-request rather than as a digest over note text.",
)

add(
    ["C039", "C100"], "SUPPORTS",
    PI + "src/workbench/execute-tool.ts:198 `input: params.input as JsonValue,` (the request handed to decideExecute) and :236 "
    "`input: params.input as JsonValue,` (the ExecuteLaunch the launcher receives). The launchers pass it on: " + PI +
    "src/index.ts:2634 `args: launch.input` and :2671 `input: launch.input`.",
    "",
    "ESTABLISHED",
    "For kind script the digest and the launched value are the same data (no note stripping), so the divergence is latent and specific "
    "to a function route built on this launcher shape. " + NO_SRC_DRIFT,
    "The launched value is the caller's object by reference, neither the canonical text (execute.ts:193 inputText) nor a copy; the "
    "admission keeps only the digest (execute.ts:38 'The input itself is never retained, only its digest'). The policy, by contrast, "
    "IS the admitted frozen copy (execute-tool.ts:238).",
)

add(
    ["C080"], "SUPPORTS",
    "The two code facts the counterexample needs both hold at the pin: the admission of a function request drops a top-level `notes` "
    "member before hashing (" + PI + "src/workbench/execute.ts:185, 193, 203; " + PI + "src/workbench/identity.ts:202), and the "
    "launch record carries the caller's original object (" + PI + "src/workbench/execute-tool.ts:236).",
    "",
    "SUPPORTED",
    "A hypothesis about a launcher that does not exist: today the function request is refused before any launch record is built "
    "(execute-tool.ts:217-218). " + NO_SRC_DRIFT,
    "For { task: \"X\", notes: \"untrusted\" } the admitted digest covers { task: \"X\" } and a launcher reusing ExecuteLaunch.input "
    "would receive the note. Sound as a red-test shape.",
)

add(
    ["C153", "C099", "C060"], "CONTRADICTS",
    "Three different input digests exist at the pin and the admission's is the one that is dropped. (1) " + PI +
    "src/workbench/execute.ts:203 domain `workflow-execute-input` over the judged canonical input; " + PI +
    "src/workbench/execute-tool.ts:76-87 ExecuteLaunch has no inputDigest member and the envelope (:150-170) never emits one, and "
    "grep -rn inputDigest over src/ shows no reader of admission.inputDigest. (2) " + PI + "src/index.ts:3174 `task.inputDigest = "
    "identityDigest(\"workflow-input\", task.args === undefined ? { supplied: false } : { supplied: true, value: task.args });` - "
    "another domain, another shape, computed over the RAW launched args; this is the value workflow_observe shows (:2968). (3) " + PI +
    "src/workbench/hosts/local-detached.ts:703 `identityDigest(\"invocation-input\", request.input) !== boot.inputDigest` for the "
    "detached host.",
    "grep -rn 'inputDigest' over src/ (all sites listed above plus designer.ts, patch-proposal.ts, reconcile-decision.ts and "
    "workflow/reconcile.ts, none of which reads the admission).",
    "CONTESTED",
    "pi-03 L25 'hashes to stored inputDigest' and the claim row's premise 'an inputDigest field is already stored by the existing "
    "invocation record' are true only of digest (2), which is not the admission digest and is not computed over the canonical "
    "notes-stripped payload. " + NO_SRC_DRIFT,
    "Requirement gap: I3/P01 must name ONE digest (domain string, exact basis, where it is stored and shown) and say what happens to "
    "the other two for function invocations; otherwise 'callback input hashes to stored inputDigest' can be satisfied against the "
    "wrong value.",
)

add(
    ["C149", "C151"], "QUALIFIES",
    "The script and function admissions share one function and one handler: " + PI + "src/workbench/execute.ts:160 decideExecute is "
    "kind-generic except :185; " + PI + "src/workbench/execute-tool.ts:191-254 is one execute handler. Two default-tier rows pin the "
    "admission's shape: " + PI + "test/workbench-execute.test.ts:144 `it(\"input is identified by a stable digest, never retained: "
    "same input, same digest; any change moves it\"` with :149 `expect(JSON.stringify(admitted(decideExecute(request({ input: { "
    "secret: \"needle-9f3\" } }), host())))).not.toContain(\"needle-9f3\");`, and :272 `expect(Object.keys(admission).sort())."
    "toStrictEqual([\"admissionPolicy\", \"contractVersion\", \"definition\", \"grant\", \"hostMode\", \"inputDigest\", "
    "\"invocationId\", \"policy\"]);`.",
    "",
    "ESTABLISHED",
    "The artifact's P01 'normalized immutable function request returned by admission' (pi-03 L23) does not mention that the admission "
    "is pinned to retain no input bytes and to hold exactly eight keys. " + NO_SRC_DRIFT,
    "Established is the premise that script execution runs through these files. For P01 to honour 'do NOT alter script execution "
    "semantics' the canonical payload has to travel outside ExecuteAdmission, or only on function admissions with these two rows "
    "deliberately re-pinned; the requirement should name the carrier.",
)

add(
    ["C097", "C060"], "CONTRADICTS",
    PI + "src/workbench/identity.ts:136-137 `const descriptor = Object.getOwnPropertyDescriptor(record, key);` / `if (!descriptor || "
    "!Object.hasOwn(descriptor, \"value\")) throw new IdentityConflictError(\"Identity input cannot contain accessors.\");` - every "
    "member of every record, at every depth, with no notion of 'authority-bearing'; arrays likewise (:120-123). The only accessor that "
    "is tolerated is one on a member named `notes` of a function request, because that member is dropped unread (:202).",
    "",
    "CONTESTED",
    "pi-02 L10 narrows the rejection to 'accessors in authority-bearing members', while pi-01 L19 (I3) says 'Reject unrepresentable, "
    "accessor/cyclic/budget-exceeding forms' without the qualifier. The existing guard is the broader one. " + NO_SRC_DRIFT,
    "Implemented literally, the pi-02 wording would admit accessors in non-authority members and so weaken a guard the pin already "
    "enforces, against the heading of pi-01 section B ('none may be weakened'). The requirement should state the existing rule: no "
    "accessor anywhere in an admitted function input or policy.",
)

add(
    ["C095"], "SUPPORTS",
    PI + "src/workbench/execute.ts:81-84 `const REQUEST_KEYS: readonly string[] = [\"definitionRef\", \"input\", \"hostMode\", "
    "\"policy\"];` `const DEFINITION_KEYS: readonly string[] = [\"kind\", \"id\", \"schemaVersion\", \"artifactDigest\"];` ... `const "
    "DIGEST = /^sha256:[0-9a-f]{64}$/;`; :88-89 `const INPUT_BYTES = 64 * 1024;` `const POLICY_BYTES = 4096;`; enforcement :164, :173, "
    ":175, :179, :181; rule order stated at :153-155 ('request shape, host invocation reference, digest-pinned definition, hostMode "
    "allowlist, policy, input, then authority').",
    "",
    "ESTABLISHED",
    NO_SRC_DRIFT,
    "Further existing bounds the proposal can cite rather than restate: canonicalJson's depth 64 and 1 MiB cap (identity.ts:104, "
    ":146), and 256-byte clean text for definition id and schemaVersion (execute.ts:90, :110-112).",
)

add(
    ["C098"], "SUPPORTS",
    "Nothing in Pi validates or binds the producer request shape today: grep -rn 'baseRevision' over " + PI + "src/ = 0, and "
    "`workspaceId` occurs only in src/workbench/reactivefiber-observer.ts and src/workbench/mechanical-coordination.ts (the "
    "coordination basis, :181), neither on the execute path. The suite already uses the three-field input as its function fixture: "
    + PI + "test/workbench-function-authority.test.ts:254 `const TASK: JsonValue = { task: \"t\", workspaceId: \"w\", baseRevision: "
    "\"r\" };`. The source seam's request carries a PATH, not an id: " + PI + "src/workbench/source-admission.ts:137-138 '/** The "
    "caller's absolute workspace path; rule 4 confines it. */' `readonly workspace: string;`.",
    "Fixed-string grep over src/.",
    "ESTABLISHED",
    "The proposal says 'Bind workspaceId and baseRevision to host-measured workspace' without saying how an identifier maps to the "
    "absolute path the confinement rule takes, or what baseRevision is compared with (the measured HEAD commit, :374, is the obvious "
    "candidate but is not named). " + NO_SRC_DRIFT,
    "Established is the baseline: no existing validation. The seam already has the 'refuse, do not override' behaviour for a path "
    "(workspace-outside-root, workspace-not-worktree-root); the id-to-path mapping and the baseRevision comparison are the new parts a "
    "requirement must spell out.",
)

add(
    ["C101", "C152", "C157", "C161", "C194", "C199", "C200", "C202", "C203"], "QUALIFIES",
    "Rows already pinned green at seam level at the pin. Poisoned note getter and note-only identity: " + PI +
    "test/workbench-function-authority.test.ts:2302 `it(\"in each host mode, a note member holding a getter, in the caller policy or "
    "beside the task fields of the caller input, is never invoked, and the request for mechanical.development.develop.v1 is decided as "
    "that request c...` and the EAT-R154 describe at :2004. Alias and distinct roots: " + PI +
    "test/workbench-mechanical-source-admission.test.ts:87-88 'R024-ALIAS: while inv-a writes, inv-b's admission through a symlink "
    "alias and inv-c's through a dot spelling of the same workspace refuse writer-held', :94-95 R024-TWO-ROOTS. Source or manifest "
    "change during the wait: :116-118 EAT-R025 'Park admission, change commit/tree, gate manifest or tracked bytes, release; assert "
    "refusal before SDK dispatch' (R025-COMMIT, -AMEND, -GATE, -TRACKED). Revoked grant or changed principal at the final boundary: "
    + PI + "src/workbench/function-authority.ts:22-25 (six listed changes refuse at dispatch with zero callback, loader and provider "
    "calls). Duplicate or out-of-order event: " + PI + "src/workbench/observation.ts:638 `ingest(event: ObservationEvent): "
    "\"applied\" | \"duplicate\" | \"out-of-order\" | \"refused\"`. Trimmed identity drops refs: " + PI +
    "src/workbench/execute-tool.ts:146-147, 162-164.",
    "Read of the three suite headers and the cited rows; no test was executed by this lens.",
    "UNSUPPORTED",
    "The artifact lists these as 'Red tests' (pi-03 L24, L30, L36) and as falsifiers G08, P13, P14, P16, P17 without saying at which "
    "level they are red. At the seam they are not red today. " + NO_SRC_DRIFT,
    "Unsupported is the premise that these tests are red at the pin. For test-first work the red has to be stated through the "
    "registered tool (or the new composed boundary): 'raw-vs-canonical divergence', 'a test launcher receives canonical bytes only', "
    "'launch resolves while writer sleeps', cross-process exclusion, restart, stale generation and timeout are the rows with no green "
    "analogue at the pin. A requirement that copies the list as written would count already-passing seam tests as its red evidence.",
)

# ======================================================================================================================
# F. The primitives the README says exist
# ======================================================================================================================

add(
    ["C017"], "SUPPORTS",
    "One witness per primitive. (i) script: " + PI + "src/index.ts:2621-2643 launchEmbeddedWorkflow, src/workflow/runtime.ts "
    "(runWorkflow). (ii) Claude: " + PI + "src/workbench/claude-host.ts:1 '/** Claude Agent SDK execution of *workflow* agent() "
    "calls; Pi's Agent tool stays separate. */' importing `query as sdkQuery` from @anthropic-ai/claude-agent-sdk (:4-10), pinned "
    "`\"@anthropic-ai/claude-agent-sdk\": \"0.3.300\"` (package.json:36). (iii) detached host: " + PI +
    "src/workbench/hosts/local-detached.ts:1-9, :531 launchDetachedWorkflow, :610 connectDetachedWorkflow; tool workflow_detached "
    "(index.ts:2912). (iv) observation: " + PI + "src/workbench/observation.ts:1, :339; tool index.ts:2933. (v) control: " + PI +
    "src/workbench/control.ts:1-9, :30; src/workbench/control-tool.ts:138; registered index.ts:3063. (vi) reconcile: " + PI +
    "src/workbench/reconcile-tool.ts:62; registered index.ts:2997. (vii) worktree preservation: " + PI + "src/worktree.ts:74-91, "
    ":210-215.",
    "",
    "ESTABLISHED",
    "Seven conjuncts in one sentence, no path cited by the artifact; each holds as 'code present', which is weaker than 'exercised'. "
    "Scope of two of them: the detached host's lifetime is `lifetime: \"survives-client-disconnect-not-host-crash\"` "
    "(local-detached.ts:103); worktree.ts is isolation for AGENTS ('Git worktree isolation for agents', :2) under os.tmpdir() (:139). "
    + NO_SRC_DRIFT,
    "The second half ('not joined Mechanical execution') follows from the wiring row. The baseline does not mention three further "
    "existing primitives the design leans on: the per-run workflow journal with a pre-dispatch marker row "
    "(src/workflow/journal.ts:59-64), the host admission budget (src/workflow/admission.ts, three pools and a queue deadline, not "
    "instantiated in src/) and the script path's own pre-dispatch re-measurement (src/workbench/identity.ts:364-371 "
    "verifyInvocationIdentity).",
)

add(
    ["C054", "C075"], "SUPPORTS",
    "Detached integrity: " + PI + "src/workbench/hosts/local-detached.ts:5-9 'launchDetachedWorkflow() admits a reviewed trusted "
    "script, pins its input/config/implementation and returns the receipt served by the actual detached process ... inspect() after "
    "loss returns unknown/reconcile, never a saved terminal verdict or a replacement JavaScript execution'; :416 `if "
    "(input.trustedScript !== true) throw new Error(\"Only explicitly reviewed trusted scripts may run; VM is not an isolation "
    "boundary.\");`; :703 `... throw new Error(\"IDENTITY_CONFLICT: actual host pin differs from admission.\");`; :53 the fixed "
    "RECONCILE text 'Never automatically retry this invocation'. Preservation: " + PI + "src/worktree.ts:210-215 `} catch (err) {` "
    "... '// A preservation step failed: keep the worktree and return the failed variant (EAT-R001/EAT-R002 ...). Before wb-5ik5 this "
    "catch force-removed the worktree and returned `{ hasChanges: false }`.' / `return { hasChanges: true, preservationFailed: true, "
    "path: worktree.path, diagnostic: diagnosticOf(err) };`.",
    "",
    "ESTABLISHED",
    "Citation: pi-01 L13 cites 'worktree.ts' beside a src/workbench/hosts/ path; the file is src/worktree.ts (there is no "
    "src/workbench/worktree.ts). Scope: 'preserve-on-failure' is 'keep the worktree when a PRESERVATION STEP fails' for agent "
    "worktrees, claimed only at the PF rows of test/worktree.test.ts (:77); it is not preservation on any failure and is not specific "
    "to detached scripts. " + NO_SRC_DRIFT,
    "The 'source worktree preservation fix' of pi-01 L29 resolves to bead wb-5ik5 ('[MWI-preserve] P0 preserve edited worktrees when "
    "Git preservation fails', closed 2026-11-07 in .beads/archive/issues-closed-2026-11.jsonl), a November 4 program bead.",
)

add(
    ["C074"], "SUPPORTS",
    "The fix is identifiable and is on the Mechanical side: " + MW + " `git log -- contracts/entrypoints/development.v1.json` shows "
    "1f29daa7 (2026-11-05) 'fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host "
    "tests (MechanicalWorkflows-14zrz)' as the last commit touching the file, and `git merge-base --is-ancestor 1f29daa7 69cb016d` "
    "succeeds. Pi consumes the repaired form: " + PI + "src/workbench/mechanical-descriptor.ts:114 `export const "
    "MECHANICAL_SCHEMA_REF_PATTERN = /^[a-z0-9][a-z0-9.-]*\\.schema\\.json$/;` and the bare filenames at :133-134. " + PI +
    ".agents/skills/pi-mechanical-interop/SKILL.md:14 records it: 'disagreed about schema reference spelling at `0c78e253`; they agree "
    "since MW `1f29daa7` (bare filenames)'.",
    "git log and merge-base in the MW pin worktree (read-only); grep of the Pi boundary and skill.",
    "SUPPORTED",
    "The artifact gives no commit, file or finding id for 'the earlier schema-filename fix'; the identification above is this lens's, "
    "from the pin's skill text and MW history.",
    "The fix is not a Pi source change. It belongs with the Mechanical lens for confirmation of what exactly 1f29daa7 changed.",
)

add(
    ["C052", "C170", "C213", "C127", "C128"], "SUPPORTS",
    PI + "src/workbench/observation.ts:1 '/** Bounded, read-only native observation cache. Producers retain all execution authority. "
    "*/'; :2 `export interface NativeRef { provider: string; type: string; id: string; scope?: string }`; :3 `export interface "
    "ObservationScope { workspace: string; principal: string }`; :129 `const MAX_DEFAULT = {maxEvents:20_000,maxNodes:2_000,"
    "maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100};`; :130 keyOf includes workspace and principal; :638-655 ingest (duplicate, "
    "out-of-order, gap marks stale). Reply builder " + PI + "src/workbench/observe-query.ts:110-120 ObserveRequest {scope, "
    "invocationId, cursor?, limit?, selectors?, maxBytes?}, :183-235 freshness, anomalies, droppedForBytes. Tool " + PI +
    "src/index.ts:2932-2996: parameter `taskId` (:2937), `workbench:observe` grant (:2957), `const task = "
    "workflowTasks.get(params.taskId);` (:2961) and the session, workspace and principal check (:2963-2965).",
    "",
    "ESTABLISHED",
    "The projection is in memory: observation.ts has no import at all, so nothing is persisted and a restart loses it. "
    "ObservationScope carries no session; the tool adds the session check itself. The registered tool's parameter is `taskId`; "
    "`(scope, invocationId)` is the pure builder's request, with scope supplied by the host. " + NO_SRC_DRIFT,
    "Freshness (current/stale/unknown), event-gap anomaly and dropped-for-bytes counters already exist, so pi-02 section 6's "
    "'freshness, source-cursor gap and dropped-event count' extends existing fields rather than inventing them. Nothing here observes "
    "a Mechanical invocation.",
)

add(
    ["C030"], "SUPPORTS",
    "Same handle in embedded mode: " + PI + "src/index.ts:3014 `mintInvocationId: workflowRunId,` (src/workflow/task.ts:29-31 "
    "`wf_` + 12 hex), :2624 `const runId = launch.invocationId;`, :2637 `workflowTasks.set(runId, task);`, and workflow_observe looks "
    "the task up by that id: :2961 after :2958 `if (!/^wf_[a-z0-9-]{6,}$/.test(params.taskId)) return textResult(\"Invalid workflow "
    "task ID.\");`.",
    "workflowTasks.set sites (grep): index.ts:2637, 3452, 3610 - none in launchDetachedWorkflow (:2665-2680). Importers of "
    "src/workbench/detached-observer.ts in src/: 0.",
    "SUPPORTED",
    "Holds for embedded launches only. A detached workflow_execute launch returns the same wf_ id but registers no task, so the "
    "registered workflow_observe answers 'Workflow unavailable in this local operator/session/workspace scope.' (:2965) for it, "
    "although the execute tool's own text says 'observe the launch through workflow_observe' (execute-tool.ts:179). " + NO_SRC_DRIFT,
    "Sufficient as a premise for the first cut (pi-02 L5 hostMode embedded). It becomes a gap for P11: a detached function would have "
    "no workflow_observe path at all without new wiring.",
)

add(
    ["C023", "C024"], "SUPPORTS",
    "Pi half only. Receipts: `ls docs/workbench/receipts | wc -l` = 72 in " + PI + "; grep -rl verified_candidate over them = 0; the "
    "only release blocks (wb-j5y5.md, wb-r5q2.md) all read `slice status: partial` (6 of 6). The three receipts that mention a "
    "function launch say it is refused, e.g. docs/workbench/receipts/wb-s8rm.md:18 'the seam is not wired yet. `workflow_execute` "
    "still refuses a function definition'. " + PI + "src/workbench/control.ts:30-36 NATIVE_CONTROL_ACTIONS names only furnace, "
    "claude-agent-sdk, forge and local-detached (:218-219 `return deny(\"unknown-action\", \"validation\", \"unknown action\");` for "
    "anything else).",
    "Absence surface: the 72 per-bead receipts under docs/workbench/receipts, plus the code fact that the registered route refuses "
    "every function request (so this revision cannot have produced a joined run or a joined restart). Receipts kept outside the "
    "repository and everything in the Mechanical tree are not covered by this lens.",
    "SUPPORTED",
    NO_SRC_DRIFT,
    "The receipt search only confirms that no Pi document claims otherwise; the stronger ground is that nothing launches a function.",
)

add(
    ["C123", "C212"], "SUPPORTS",
    PI + "src/workbench/control-tool.ts:138 `name: \"workflow_control\",` and :2-4 'explicit native action after "
    "permission/preconditions; returns requested/acknowledged/result distinct'; " + PI + "src/workbench/control-reply.ts:80-81 "
    "`requested: \"Requested only: the producer has not acknowledged this action, and completion is not established.\",` / "
    "`acknowledged: \"Acknowledged by the producer; completion is not established. Observe the target for its outcome.\",`; " + PI +
    "src/workbench/control.ts:54-55 deny policies include `observer-only` and `cross-scope`. " + PI +
    "src/workbench/reconcile-tool.ts:62-66 `name: \"workflow_reconcile\",` ... 'record an explicit operator acknowledgement or "
    "override so a resume can proceed. Never re-executes anything itself.' with determinations effect-confirmed, effect-absent, "
    "indeterminate (:71). Registered at " + PI + "src/index.ts:2997 and :3063; workflow_execute at :3009; workflow_observe at :2932.",
    "",
    "ESTABLISHED",
    "All four workflow_* tools are registered only when the Claude backend is configured and the native modules load "
    "(index.ts:2684, 2691-2702); 'registered' is conditional on that. workflow_reconcile is keyed by taskId and reads the script "
    "run's journal, not a function invocation. " + NO_SRC_DRIFT,
    "'Cancellation requested is separate from cancellation established' and 'observed status does not grant control' already have "
    "script-side analogues (three receipt phases; the observer-only denial).",
)

add(
    ["C173"], "SUPPORTS",
    "Pi half only: the two adapters exist (" + PI + "src/workbench/control-tool.ts:138; " + PI +
    "src/workbench/reconcile-tool.ts:62) over a per-run journal (" + PI + "src/workflow/journal.ts:252-254 appendJournal).",
    "",
    "SUPPORTED",
    "The Mechanical half of the claim (an effect-intent store and reader to integrate) is outside this lens. On the Pi side 'host "
    "journal and lease state' do not exist for function invocations: the journal is the script run's, and lease state is the "
    "in-memory registry. " + NO_SRC_DRIFT,
    "",
)

add(
    ["C122"], "CONTRADICTS",
    "A per-run journal exists for script workflows: " + PI + "src/workflow/journal.ts:43-44 'The file is JSON Lines, appended as each "
    "agent settles, so a run that is killed mid-flight still leaves everything it had finished.'; :59-64 'a non-read node ... is "
    "appended once BEFORE its provider is called, as a `dispatched` marker row ... A marker nothing superseded is a dispatch with no "
    "settled record, and a resume refuses there as an uncertain effect.'; :68-70 'runtime.ts refuses the call, fail-closed, when its "
    "marker row does not reach the file'; :252-254 appendJournal uses appendFileSync. Wired at " + PI + "src/index.ts:2629 "
    "`journalPath = join(dir, `${runId}.workflow.jsonl`);`.",
    "grep -rn 'fsync\\|fdatasync' over src/ = 0. Journal directory: src/output-file.ts:47-60 sessionTaskDir = "
    "join(tmpdir(), `pi-subagents-<uid>`)/<encoded-cwd>/<sessionId>/tasks.",
    "REFUTED",
    "Refuted is the claim row's scope premise 'no durable journal exists at the pin', not the proposal: the proposed invocation "
    "journal is new for FUNCTION invocations. " + NO_SRC_DRIFT,
    "Limits of the existing journal that the proposal must not inherit silently: it lives under os.tmpdir() (lost to a temp cleaner "
    "or a reboot), it is appended without fsync, and it is keyed to a script run's agent and node positions. It does already "
    "implement 'intent row before dispatch, refuse on an unsettled marker', which is the shape of pi-02 A6; P07 can state whether it "
    "extends this file or adds a separate store.",
)

add(
    ["C102"], "SUPPORTS",
    "The model-facing reply is bounded with a visible marker: " + PI + "src/workbench/execute.ts:93-94 `const DEFAULT_REPLY_BYTES = "
    "8192;` `const MIN_REPLY_BYTES = 2048;`, :344-365 the fixed squeeze order (policy echo, native references, reason, definition and "
    "reference text, whole references, invocation text), :340-341 `truncated: notes.length > 0,` with the `[truncated]` note; " + PI +
    "src/workbench/execute-tool.ts:146-147 a trimmed identity drops the native references and :162-164 names the omission "
    "(nativeRefsOmitted).",
    "For the durable half: grep 'node:fs\\|writeFileSync\\|appendFileSync' over src/workbench/execute.ts and execute-tool.ts = 0.",
    "ESTABLISHED",
    "Established is the premise that a bounded, redacted reply builder exists and already keeps a trimmed identity from being shown "
    "as addressable. The rule's other half speaks of 'durable host records': at the pin the execute path writes nothing, so no durable "
    "record of an admission (grants, principal, digests) exists to be truncated or kept whole. " + NO_SRC_DRIFT,
    "What is persisted today sits elsewhere and is script-shaped: the embedded launcher's script copy and journal under os.tmpdir() "
    "(index.ts:2627-2629) and the detached host's boot pin and receipt under <agentDir>/workbench-detached (index.ts:2670). The rule "
    "therefore depends on the journal P07 introduces.",
)

add(
    ["C126", "C071", "C072"], "SUPPORTS",
    PI + "src/workbench/tool-replies.ts:14 `export const TOOL_REPLY_CONTRACT_VERSION = \"workbench.tool-reply/v1\";`; " + PI +
    "src/workbench/execute-tool.ts:108-113 the envelope type (`readonly invoked: boolean;` ... `readonly completion: "
    "\"not-asserted\";`), :151-156 the values (`ok: !refused,` `invoked: !refused,` `completion: \"not-asserted\",`); " + PI +
    "src/workbench/execute.ts:57-58 '/** Launch-level statuses only. There is deliberately no completed, succeeded or failed ... */' "
    "`export type LaunchStatus = \"accepted\" | \"launched\" | \"refused\";`.",
    "",
    "ESTABLISHED",
    "Spelling: the contract literal is `workbench.tool-reply/v1`; the artifact abbreviates it to 'tool-reply/v1'. " + NO_SRC_DRIFT,
    "The shell only ever emits `launched` or `refused`; `accepted` exists in the type and is never set by execute-tool.ts.",
)

add(
    ["C225", "C169"], "SUPPORTS",
    PI + "src/workbench/execute.ts:279 `if (launchStatus === \"launched\" && reportedRefs.length === 0) return fail(\"A launched reply "
    "requires at least one native reference.\");`. The shell builds the reply outside its try block (" + PI +
    "src/workbench/execute-tool.ts:245-246 sets `outcome = { status: \"launched\", nativeRefs };`, :253 calls "
    "buildWorkflowExecuteReply), so a launcher that resolved to an empty list makes the tool call throw.",
    "",
    "ESTABLISHED",
    "pi-05 L11-L20 illustrates `\"status\":\"launched\"` with `\"nativeRefs\":[]` and says 'Empty nativeRefs is valid only when "
    "truthful'; pi-03 L48 (P05) expects 'invocation+native refs'. The pin sides with pi-03. " + NO_SRC_DRIFT,
    "Established is the conflict between the illustration and the pinned reply builder. An envelope with status launched and an "
    "empty nativeRefs list IS reachable today, but only through identity trimming, and then it carries nativeRefsOmitted with a count "
    "and a reason (execute-tool.ts:146-147, 162-164). If a function launch can truthfully have no native reference yet, the ABI needs "
    "either the `accepted` status for it or a relaxed rule; that is a decision for P00, not a copyable example.",
)

add(
    ["C178"], "SUPPORTS",
    "Both P11 subjects exist only in script-shaped form. Detached: " + PI + "src/workbench/execute-tool.ts:31-33 'Review assertion "
    "for a detached launch: the local detached host admits only a reviewed script.' and " + PI +
    "src/workbench/hosts/local-detached.ts:68 `trustedScript: true;`, :416 the refusal of anything else. Furnace: " + PI +
    "src/workbench/hosts/furnace-hosted.ts:1-9 'Optional Furnace-hosted execution adapter (wb-zmd, W18-C). A Pi process registers ONE "
    "deterministic workflow callback as a Furnace ExecutorApp executor ... This module adds no scheduler, no retry and no "
    "checkpoint.'",
    "Importers of src/workbench/hosts/furnace-hosted.ts in src/ = 0 (grep); it is exercised by tests and its own forge tiers "
    "(forge.toml:39-44 furnace-hosted-retry-fault and furnace-hosted-live), not from src/.",
    "ESTABLISHED",
    "Baseline only: a detached FUNCTION binding and a Furnace Run/Attempt for a function are both new work, which is what the packet "
    "says. " + NO_SRC_DRIFT,
    "Consistent with the observe-handle row: a detached launch has no workflow_observe path today, so P11 inherits that gap as well "
    "as the binding.",
)

add(
    ["C164"], "SUPPORTS",
    PI + "src/workbench/native-modules.ts:2 'native-modules.ts — the one dynamic-import seam for the native SDKs (wb-cax.10).'; :6-10 "
    "'Every module that reaches a native SDK at run time (@furnace/sdk, @forge/sdk, @hyperunix/sdk, the Claude Agent SDK) is imported "
    "here and only here ... the tripwire is test/workbench-boot-isolation.test.ts'; :62-69 the eight imports. " + PI +
    "package.json:35-43 dependencies list no @mechanical package; vendored SDKs are `file:vendor/*.tgz` with bundledDependencies.",
    "grep -rn '@mechanical\\|development-rig' over src/ and package.json: one hit (the allowlist string, mechanical-descriptor.ts:131).",
    "ESTABLISHED",
    "'Native loader seam' has two candidate referents at the pin: this dynamic-import seam, and the host-supplied "
    "MechanicalExportLoader of mechanical-descriptor.ts:193. pi-03 L40 does not say which. " + NO_SRC_DRIFT,
    "A Mechanical import added anywhere but native-modules.ts would trip the boot-isolation tripwire; an existing precedent for "
    "'exact pinned tarballs' is the vendor/ + lockfile-integrity check in identity.ts:233-276.",
)

add(
    ["C070", "C168"], "SUPPORTS",
    "Script tests exist: `ls test | wc -l` = 622 entries, 46 of them named workflow-*, workbench-execute*, workbench-pi-* or "
    "subagents-print-mode*, among them " + PI + "test/workbench-execute.test.ts (789 lines), test/workbench-execute-tool.test.ts "
    "(224), test/workbench-pi-observe.test.ts, test/workbench-pi-detached.test.ts, test/workbench-pi-reconcile.test.ts. The three "
    "paths P05 must preserve are distinct code: the script branch (" + PI + "src/workbench/execute-tool.ts:219-251), the detached "
    "provider grant selection (" + PI + "src/index.ts:2650-2664 detachedClaudeLaunch, `claude:invoke` plus `claude:tool:<name>` "
    "filtered by held grants) and the standalone subagent tool (" + PI + "src/index.ts:2450 `pi.registerTool(registeredAgentTool);`).",
    "",
    "ESTABLISHED",
    "Existence only: no test was run by this lens and none of these rows says anything about pass status. " + NO_SRC_DRIFT,
    "",
)

# ======================================================================================================================
# G. Vocabulary, documents and pins
# ======================================================================================================================

add(
    ["C029"], "CONTRADICTS",
    PI + "src/workbench/execute.ts:19-20 `export const EXECUTE_HOST_MODES: readonly ExecuteHostMode[] = Object.freeze([\"embedded\", "
    "\"detached\"] as const);` / `export type ExecuteHostMode = \"embedded\" | \"detached\";`. The same-machine, explicitly admitted "
    "placement in Pi IS the detached host: " + PI + "src/workbench/hosts/local-detached.ts:1 '/** Optional SAME-MACHINE host.' and "
    + PI + "src/index.ts:2914 'Explicit same-machine private host launch or reattachment.'",
    "grep -rn -i '\\battached\\b' over src/workbench and src/workflow, excluding reattach/detached: one hit, prose in identity.ts:3 "
    "('attached to observations/results').",
    "UNSUPPORTED",
    "'attached' is not a Pi placement: no mode, grant or tool uses the word. " + NO_SRC_DRIFT,
    "Unsupported is the facet 'an attached mode exists'. The embedded mode (execution inside the calling session) and the detached "
    "same-machine host both exist; the corpus-consistency facet is in the next row.",
)

add(
    ["C026", "C230"], "QUALIFIES",
    "Code vocabulary: " + PI + "src/workbench/execute.ts:19-20 (embedded, detached) and " + PI + "src/workbench/execute-tool.ts:215-216 "
    "(detached needs workbench:detach as well).",
    "",
    "NON-EPISTEMIC",
    "The corpus uses 'attached' two ways and scopes the first release three ways: pi-README L24 'attached or explicitly admitted "
    "same-machine execution' (first vertical); pi-02 L5 'hostMode:\"embedded\" for first cut'; pi-05 L41 'First: embedded same-machine "
    "Pi host ... Later: attached/detached variants'; pi-03 L77-L78 detached function is P2, 'Only after P10'.",
    "If 'explicitly admitted same-machine' means the detached host, the README's first release is wider than the other three "
    "documents. The requirement set should use the two code words and state that the first release is embedded only.",
)

add(
    ["C138"], "CONTRADICTS",
    PI + ".github/workflows/ci.yml:1-10 `name: CI` / `on:` / `push:` `branches: [master]` / `pull_request:` `branches: [master]` with "
    "jobs build and compat-floor-pi running npm ci, lint, typecheck and test. The repository's own earlier remediation already "
    "corrected this sentence: " + PI + "test/workbench-mwi-docs-remediation-census.test.ts:1121-1130 row M047 (EAT-R140, claim C0422, "
    "'NON-EPISTEMIC / overclaims') existing: 'No GitHub CI; use Forge for the primary gate' -> repair: 'Do not add or rely on GitHub CI "
    "for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge for the primary gate'. " + PI +
    "AGENTS.md:167 'do not add GitHub CI'.",
    "find .github -type f in the Pi pin (FUNDING.yml, workflows/ci.yml); `ls pins/mw-69cb016d/.github` -> no such directory.",
    "REFUTED",
    "Refuted on the empirical reading only ('the Pi repository has no GitHub CI'). As a rule ('do not add or rely on it') the sentence "
    "is non-epistemic and consistent with AGENTS.md; pi-04 L52 already uses the safer form 'There is no GitHub CI requirement.' The "
    "README L30 and pi-03 L2 wording regresses to the form a landed remediation row replaced.",
    "Incidental: that workflow pins node-version 22 (:16) while package.json:4-6 requires node >=24, so it is not evidence about the "
    "supported runtime either.",
)

add(
    ["C035"], "CONTRADICTS",
    "Facet (v), Pi half: " + PI + ".github/workflows/ci.yml exists and triggers on push and pull_request to master (previous row). "
    "The Mechanical half of facet (v) holds on this surface: `ls " + MW + ".github` -> no such directory.",
    "Directory listing of .github in both pin worktrees. Facets (i) to (iv) of this row (Forge/Furnace independence, Mechanical core "
    "free of Pi, no Library requirement, optional profiles) are not judged by this lens.",
    "CONTESTED",
    "One of five facets, in one of two repositories, fails on its empirical reading.",
    "Contested rather than refuted because the row bundles five facets; only the 'no GitHub-hosted CI is configured for either "
    "repository' reading is contradicted, and only for Pi.",
)

add(
    ["C130"], "SUPPORTS",
    "Of the 17 categories in pi-02 L43, grep -rlF for each as a quoted literal over " + PI + "src/ finds two: `\"writer-held\"` and "
    "`\"source-changed\"`, both in src/workbench/source-admission.ts:80, 83. The other 15 have no hit in src/ or test/. The five "
    "operator codes of pi-05 L7 (SOURCE_CHANGED, GRANT_REVOKED, WRITER_HELD, NATIVE_EVIDENCE_MISSING, UNCERTAIN_EFFECT) have none "
    "either. Existing typed vocabularies at the pin: " + PI + "src/workbench/execute.ts:35 (six policies, e.g. "
    "`unknown-permission-data`, `missing-execute-grant`), execute-tool.ts:66-72 (six launch refusals), function-authority.ts:159-166 "
    "(seven, e.g. `changed-effective-identity`, `function-action-unadopted`), source-admission.ts:68-83 (fifteen, e.g. `dirty-base`, "
    "`attestation-absent`), mechanical-descriptor.ts:146-150 (eighteen reasons, e.g. `digest-mismatch`, `status-unsupported`), "
    "src/workflow/admission.ts:57 (`admission-deadline`).",
    "Fixed-string grep of each proposed spelling over src/ and test/.",
    "ESTABLISHED",
    "The corpus itself uses two spellings for the same refusals (kebab-case in pi-02, upper snake case in pi-05), and neither matches "
    "the codes the retained seams already return for the same conditions (permission-unknown vs unknown-permission-data, "
    "principal-changed vs changed-effective-identity, workspace-dirty vs dirty-base, descriptor-mismatch vs digest-mismatch). "
    + NO_SRC_DRIFT,
    "Established is the row's premise that only two of the seventeen match existing codes verbatim. No proposed category covers the "
    "three attestation refusals, writes-not-requested, workspace-outside-root, workspace-not-worktree-root, source-unmeasurable or "
    "gate-manifest-unavailable. A requirement needs one mapping table from each existing code to a public category, or it must say "
    "which seam codes are renamed.",
)

add(
    ["C056"], "SUPPORTS",
    PI + "docs/workbench/feature-matrix.md:108 '## W11: MechanicalWorkflows binding host'; :112 the single row '... | planned | "
    "Beads wb-04s (W11) status=blocked and wb-w12 (VC-3 epic) status=blocked ... No binding host exists (re-measured 2026-11-06 at "
    "trunk 814dcdd by wb-j5y5, EAT-R082) ...'; legend :13-17 'landed-gated', 'partial', 'in-progress', 'planned', 'not-started'.",
    "",
    "SUPPORTED",
    "Vocabulary: the matrix has no 'shipped' or 'not-shipped' status; the row's status is `planned` (chosen as 'the weaker fit' for "
    "blocked beads, caveats column). The artifact's 'not-shipped' (pi-01 L14) and 'shipped/unshipped rows' (pi-03 L75) are its own "
    "words. feature-matrix.md is identical on master 0fb90672 and trunk ce180d82 (git diff --numstat empty).",
    "Supported on the semantic reading (planned is not shipped). A requirement that edits W11 must use the legend's words: the "
    "section is machine-read (see the release-validator row).",
)

add(
    ["C216", "C217", "C177"], "SUPPORTS",
    "Each named surface exists at the pin: " + PI + "docs/workbench/feature-matrix.md:108-112 (W11, `planned`; the row text reads "
    "'Hosted develop() with real scope-limited service bindings (HX->RF->Claude SDK->Forge composition; four domain outcome variants "
    "preserved)'), " + PI + "README.md, " + PI + "AGENTS.md, " + PI + ".agents/skills/pi-mechanical-interop/SKILL.md (39 lines; :8 "
    "'**Start with the current local Pi design program:** `docs/programs/mechanical-native-interoperability-2026-11-09/README.md`'), "
    "and docs/workbench/00..20 plus mechanical-function-hosting.md.",
    "ls of docs/workbench and .agents/skills/pi-mechanical-interop; grep -n W11 over the feature matrix.",
    "ESTABLISHED",
    "The W11 row still describes the HX->RF composition, not the Git-census/plain first release. Three of these surfaces differ "
    "between master and the trunk branch at the pin (AGENTS.md, README.md, the skill) and mechanical-function-hosting.md is "
    "master-only; see the pin-topology row.",
    "Established is the existence premise and the W11 wording; neither is a witness of a joined route.",
)

add(
    ["C177", "C180", "C136"], "QUALIFIES",
    "An existing release validator constrains the surfaces these rows change. " + PI + "qa/workbench/mwi-release.mjs:432 `export "
    "const HOSTS_DIR = \"src/workbench/hosts/\";` and :985 rule `w11-absence-stale`: 'W11 states that no binding host exists while "
    "<modules> names MechanicalWorkflows'; :1017-1019 `traceability-changed` (TRACEABILITY must equal the cut base); :1023-1025 "
    "`shared-index-added` for any added docs/**/index.md; :1028-1032 `receipt-not-per-bead` ('a receipt is one per-bead file, "
    "docs/workbench/receipts/<bead-id>.md') and `receipt-bead-not-real` ('absent from the bead export'). Held by " + PI +
    "test/workbench-mwi-release.test.ts:1663 `it(\"finds a host module at any depth under src/workbench/hosts/ and in any case of the "
    "word mechanical ...` and its real-tree block (header :10).",
    "Read of the validator's rule sites and of the test header; the validator was not run.",
    "NON-EPISTEMIC",
    "The artifact names W11 and the skill as P10 work and tells every packet to update status 'in the SAME implementation cut', but "
    "does not name this validator. " + NO_SRC_DRIFT,
    "Whether the validator is run against MII cuts is a process fact this lens cannot read from the pin (it is written for the "
    "November 4 program's `mwi-release` blocks). If it is: the first cut that adds a host module naming Mechanical under "
    "src/workbench/hosts/ must rewrite the W11 absence sentence in that same cut (so W11 moves at P04/P05, not at P10); packet labels "
    "cannot name receipt files; and 'a new source-pinned QA receipt directory' (pi-04 L2) cannot live under docs/workbench/receipts/.",
)

add(
    ["C218", "C219"], "SUPPORTS",
    PI + "package.json:4-6 `\"engines\": {` / `\"node\": \">=24\"` / `}`; the manifest has no `bin` member and its entry is "
    "`\"pi\": { \"extensions\": [\"./src/index.ts\"] }` (:73). " + MW + "apps/development-rig/package.json `\"engines\": { \"node\": "
    "\">=22.18.0 <25\" }`, `\"bin\": { \"mechanical-development-rig\": \"./dist/cli.js\" }`.",
    "",
    "ESTABLISHED",
    "The overlap of the two engine ranges is Node 24.x only. " + NO_SRC_DRIFT,
    "Bearing on the artifact: 'CLI output' (pi-04 L36) and 'the actual built CLI' (pi-04 L53) have no Pi-subagents referent; the only "
    "CLI in the pair is Mechanical's rig binary or the host `pi` program. P04's 'incompatible Node version' red test has a real edge "
    "on both sides of 24.x.",
)

add(
    ["C220"], "QUALIFIES",
    "A default-tier census is line-anchored to the skill file the deposit edited. " + PI +
    "test/workbench-mwi-docs-remediation-census.test.ts:546 `SKILL: \".agents/skills/pi-mechanical-interop/SKILL.md\",`; rows M048 "
    "`where: \"SKILL:L14\"` (:1138), M049 and M050 `where: \"SKILL:L16\"` (:1150, :1162); the predicate :1263-1272 `if (at.length !== "
    "1) findings.push(`${row.id} stands ${at.length} times`);` ... `if (line < place.first || line > place.last) "
    "findings.push(`${row.id} stands at ${place.page}:L${line}`);`; asserted on the live tree at :2415 "
    "`expect(findingsOf(row, text), \"the live page\").toEqual([]);`. The file is in the default tier (vitest.config.ts include "
    "test/**/*.test.ts; not in its exclude list). `git diff 0fb90672 3fc0ead1 -- .agents/skills/pi-mechanical-interop/` shows the "
    "deposit inserting three lines after line 7 ('**Next design program (2026-11-10, planned; not shipped):** ...').",
    "Static simulation of the stands/absent pins of findingsOf over `git show <rev>:<page>` blobs "
    "(epistemic-triage/.work/lens-pi-src.scratch/census_sim.py; the HIDDEN-form lexer check is not simulated; nothing was executed "
    "in the repository). Control: test and pages at the trunk parent ce180d82 -> 0 of 50 rows with findings and line counts README "
    "24, 01 66, 02 79, 03 61, 04 44, SKILL 35, equal to the test header's own figures (:21). Master 0fb90672 -> 2 of 50 (M049 and "
    "M050 'stands 0 times'; SKILL has 39 lines). Document pin 3fc0ead1 -> 3 of 50 (additionally 'M048 stands at SKILL:L17').",
    "ESTABLISHED",
    "Time context: the row describes the skill at 0fb90672, and that description holds there. But the deposit commits 91d8fa8c and "
    "3fc0ead1 already performed part of pi-05 L23 ('begin here for the next program, explicit status planned') on master, with no "
    "test run (pi-01 L2, pi-04 L2). On master the skill had already been rewritten by 4b219f24 (2026-11-09), which is why two rows "
    "are predicted red at the inspected revision itself; the trunk branch still carries the wb-12x1 text.",
    "Established: the skill text at the pin and the existence of the line-anchored reader. Predicted, not observed: the census fails "
    "on master at the inspected revision (2 rows) and one more row was moved off its line by the design deposit. Any bead that edits "
    "SKILL.md must move the M048-M050 anchors in the same cut, and a bead cut from trunk will not see master's skill text at all. "
    "Run that one test file at trunk and at master before any packet uses the default gate as its green baseline.",
)

add(
    ["C002", "C144"], "SUPPORTS",
    "In " + PI + ": `git rev-parse HEAD` = 0fb9067262532289104417d2b7f2f25704563a75; `git log -1 --format=%cI\\ %s` = "
    "'2026-11-11T00:23:06Z continuity-18: merge workbench/implementation-program (landings 1087-1088) into master'; parents 95dcdfce "
    "(master) and ce180d82 (workbench/implementation-program, equal to origin/workbench/implementation-program as fetched); "
    "`git branch -a --contains HEAD` lists remotes/origin/master with origin/HEAD -> origin/master. `git diff --stat ce180d82 "
    "0fb90672 -- src test qa package.json forge.toml` is empty. The files P00 tells implementers to inspect all exist: src/index.ts, "
    "src/workbench/execute.ts, execute-tool.ts, mechanical-descriptor.ts, function-authority.ts, source-admission.ts, observation.ts, "
    "docs/workbench/feature-matrix.md (W11 at :108); and in " + MW + "apps/development-rig/src/: host.ts, host-binding.ts, "
    "host-services.ts.",
    "git plumbing in the pin worktree with --no-optional-locks; `git --no-optional-locks status --porcelain` is empty; ls of the "
    "named files.",
    "ESTABLISHED",
    "The inspected revision is a master merge whose CODE equals the trunk branch tip; the two trees differ only in documents "
    "(`git diff --name-only ce180d82 0fb90672`: 873 paths under docs/workbench/programs, plus AGENTS.md +12, README.md +5, the skill "
    "+11/-7, docs/workbench/README.md, docs/workbench/07-native-integrations.md). Master-only at the pin (absent at ce180d82): "
    "docs/programs/mechanical-native-interoperability-2026-11-09/, docs/workbench/mechanical-function-hosting.md, "
    ".agents/skills/pi-mechanical-interop/bead-machine-field-idioms.md.",
    "'Default branch: master' holds. For implementation the relevant fact is that the branch the feature matrix calls trunk "
    "(feature-matrix.md:5 'Trunk: branch `workbench/implementation-program`') does not contain the program documents, the November 9 "
    "program, or master's versions of AGENTS.md, README.md and the skill that pi-03 P10 and pi-05 tell beads to edit. `src/workbench/"
    "execute*` resolves to execute.ts and execute-tool.ts only.",
)

add(
    ["C005"], "SUPPORTS",
    "Existence facet only: `git diff --name-only 0fb90672 3fc0ead1` lists exactly the six files README.md and 01 to 05 under "
    "docs/programs/mechanical-interop-integrity-2026-11-10/ (plus the skill). `ls " + PI + "docs/programs` at the inspected revision "
    "shows only mechanical-native-interoperability-2026-11-09.",
    "git diff --name-only between the inspected revision and the document pin; directory listing at the inspected revision.",
    "SUPPORTED",
    "The six files exist at the document pin, not at the inspected revision, and on master only.",
    "Whether the corpus is self-contained (every identifier defined inside it) is not judged by this lens. One self-containment "
    "pointer from the source side: MW-CONTRACT is defined in code (function-authority.ts:135), W11 in the feature matrix, and neither "
    "is defined in the six files.",
)

add(
    ["C006"], "CONTRADICTS",
    "Facet (i) holds on master: " + PI + "docs/programs/mechanical-native-interoperability-2026-11-09/ exists (first deposit adf2c52d, "
    "2026-11-09). Facet (ii) has no Pi referent: `git log adf2c52d..0fb90672 -- src` touches one file, "
    "src/workbench/mechanical-coordination.ts (+419), whose header attributes it to another program (:2-3 'wb-0gbh; "
    "mechanical-workflows-interop-2026-11-04 B-coordination, slice PI-7'); none of the 111 commit subjects in that range names a "
    "November 9 bead. The tracked bead export agrees: " + PI + ".beads/issues.jsonl has the November 9 epic wb-rhyt and its packets "
    "wb-y0n6, wb-2ukh, wb-9bof, wb-yiu4 'open' and wb-xr1z 'in_progress'; the seams the README lists were closed under November 4 "
    "beads in .beads/archive/issues-closed-2026-11.jsonl (wb-201v authority, wb-s8rm source, wb-ocie descriptor, wb-0gbh "
    "coordination, wb-5ik5 preserve).",
    "git log over src/ for the range from the November 9 program's first commit to the pin; grep of the range's commit subjects for "
    "wb-w8fk|wb-y0n6|wb-2ukh|wb-4bxo|wb-9a1o|wb-mwsy|wb-5a7k|wb-p3i2|wb-xr1z|wb-9bof|wb-yiu4 (no match); status lookup in the two "
    "tracked bead export files. Mechanical history is not covered by this lens.",
    "UNSUPPORTED",
    "The phrase 'its completed source changes must not be undone' attributes completed source changes to the November 9 program. In "
    "Pi, at the inspected revision, that program has none; the code it would protect was delivered by the November 4 program. The "
    "November 9 program directory is master-only (absent at trunk ce180d82).",
    "Unsupported is facet (ii) on the Pi side; facet (i) is established on master. The regression constraint is still sensible, but "
    "it needs a real referent: either the November 4 seams by file and bead (function-authority.ts, source-admission.ts, "
    "mechanical-descriptor.ts, mechanical-coordination.ts, worktree.ts), or Mechanical commits, which the mw lens would have to "
    "supply.",
)

add(
    ["C091", "C059", "C196"], "QUALIFIES",
    "Where 'the permission store' is at the pin: " + PI + "src/index.ts:2509-2511 `function grants(ctx: ExtensionContext): readonly "
    "string[] {` / `return loadSettings(ctx.cwd).workbench?.capabilityGrants ?? [];` / `}`; " + PI + "src/settings.ts:588-590 "
    "`export function loadSettings(cwd: string = process.cwd()): SubagentsSettings {` / `return { ...readSettingsFile(globalPath()), "
    "...readSettingsFile(projectPath(cwd)) };` with :563-565 `function projectPath(cwd: string): string {` / `return join(cwd, "
    "\".pi\", \"subagents.json\");`. So a project file inside the session directory replaces the global `workbench` object whole, and "
    "it is re-read on every call (execute-tool.ts:192-194).",
    "Read of the three functions; no experiment was run.",
    "PLAUSIBLE",
    "The rule rows stand as rules. What is qualified is their premise that grants come from 'trusted host state': at the pin one of "
    "the two grant sources is a file under the workspace the session runs in. " + NO_SRC_DRIFT,
    "Established: the code facts above. Plausible, not shown: that a function writer can reach that file. It depends on whether the "
    "function's write root contains or equals the session directory, and the artifact itself disclaims any sandbox ('no sandbox claim "
    "from SDK prompt/tool filters', pi-01 L29). Where the file is git-ignored (as in Pi's own .gitignore: `.pi/subagents.json`), the "
    "source re-measure would not see an edit to it (UNLISTED-EDITS). A final-boundary re-read is only as strong as the store it "
    "reads; a requirement should fix the grant source for function dispatch relative to the writer's root.",
)

add(
    ["C003"], "SUPPORTS",
    "Adjacent to this lens, from the MW pin worktree: `git log -1 --format='%H parents=%P' 1be2b8dc7e1e852fd35f9b6e3347386377c3f371` "
    "gives parent 69cb016dd293a17bcc893f2baf410a51c226f4c9; `git rev-list --count 69cb016d..1be2b8dc` = 1; `git diff --stat` between "
    "them: apps/development-rig/test/host-services.test.ts and one program document, 3 insertions and 3 deletions. The companion "
    "README (docs/mw-README.md:3) states its own baseline as 'MechanicalWorkflows 1be2b8dc...; Pi-subagents 0fb90672... before Pi "
    "design commit'.",
    "git plumbing in pins/mw-69cb016d (read-only).",
    "SUPPORTED",
    "The 'additional main commit' is exactly one, 1be2b8dc, and it changes a test file and a document, no source. The companion's "
    "Mechanical baseline is that commit, not the paired snapshot named by the Pi README; the two differ by that single commit.",
    "Offered for the mw-src lens to own; recorded here only because the Pi fixture comparison in the descriptor row depends on the "
    "descriptor being unchanged across it. Whether the companion program exists on Mechanical main was not checked here.",
)

# ----------------------------------------------------------------------------------------------------------------------
# write + validate
# ----------------------------------------------------------------------------------------------------------------------
STATUSES = {"ESTABLISHED", "SUPPORTED", "PLAUSIBLE", "UNSUPPORTED", "CONTESTED", "REFUTED", "UNDETERMINED", "NON-EPISTEMIC"}
RELATIONS = {"SUPPORTS", "CONTRADICTS", "QUALIFIES"}
RULE_KINDS = {"PROPOSAL", "NORMATIVE", "DEFINITION"}

kinds = {}
for path in sorted(glob.glob(os.path.join(HERE, "claims-*.jsonl"))):
    with open(path, encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if line:
                record = json.loads(line)
                kinds[record["id"]] = record["kind"]

problems = []
for index, row in enumerate(rows, 1):
    for claim in row["claimIds"]:
        if claim not in kinds:
            problems.append(f"row {index}: unknown claim {claim}")
    rule_rows = [claim for claim in row["claimIds"] if kinds.get(claim) in RULE_KINDS]
    empirical = [claim for claim in row["claimIds"] if kinds.get(claim) not in RULE_KINDS]
    if row["proposedStatus"] == "NON-EPISTEMIC":
        if empirical:
            problems.append(f"row {index}: NON-EPISTEMIC listed for empirical rows {empirical}")
    elif rule_rows:
        listed = ", ".join(f"{claim} ({kinds[claim]})" for claim in rule_rows)
        scope = (f"[Status scope: the status is for the embedded empirical premise; {listed} "
                 f"{'is a rule or proposal row and stays' if len(rule_rows) == 1 else 'are rule or proposal rows and stay'} "
                 "NON-EPISTEMIC as such.]")
        row["note"] = (row["note"] + " " + scope).strip()
    if row["proposedStatus"] not in STATUSES:
        problems.append(f"row {index}: status {row['proposedStatus']}")
    if row["relation"] not in RELATIONS:
        problems.append(f"row {index}: relation {row['relation']}")
    if not row["evidence"].strip():
        problems.append(f"row {index}: empty evidence")

# a claim must not receive two different non-rule statuses from this lens
seen = {}
for index, row in enumerate(rows, 1):
    for claim in row["claimIds"]:
        if kinds.get(claim) in RULE_KINDS:
            continue
        seen.setdefault(claim, set()).add(row["proposedStatus"])
for claim, statuses in sorted(seen.items()):
    if len(statuses) > 1:
        problems.append(f"{claim}: conflicting statuses {sorted(statuses)}")

with open(OUT, "w", encoding="utf-8") as handle:
    for row in rows:
        handle.write(json.dumps(row, ensure_ascii=False) + "\n")

with open(OUT, encoding="utf-8") as handle:
    parsed = [json.loads(line) for line in handle if line.strip()]
for index, row in enumerate(parsed, 1):
    if set(row) != {"lens", "claimIds", "relation", "evidence", "detectionModel", "proposedStatus", "drift", "note"}:
        problems.append(f"row {index}: key set {sorted(row)}")
mapped = {claim for row in parsed for claim in row["claimIds"]}
print(f"rows written: {len(parsed)}; distinct claims mapped: {len(mapped)}; known claims: {len(kinds)}")
print("statuses:", {status: sum(1 for row in parsed if row["proposedStatus"] == status) for status in sorted(STATUSES)
                    if any(row["proposedStatus"] == status for row in parsed)})
print("relations:", {relation: sum(1 for row in parsed if row["relation"] == relation) for relation in sorted(RELATIONS)})
print("problems:", problems or "none")
