#!/usr/bin/env python3
"""Phase 1 atomization of pi-README.md (MII triage). Writes claims-readme.jsonl, ids C001-C035.

Atomization only: no row carries a verdict. Run with: python3 -I gen-claims-readme.py <out.jsonl>
"""
import json
import sys

DOC = "pi-README.md"
PI = "pi-0fb90672"
MW = "mw-69cb016d"
HIST = "history"
NONE = "none"

ROWS = []


def row(cid, loc, kind, text, sw, scope, tc, material, cited=(), deps=()):
    ROWS.append({
        "id": cid,
        "doc": DOC,
        "loc": loc,
        "kind": kind,
        "text": text,
        "strongestWording": sw,
        "scope": scope,
        "timeContext": tc,
        "material": material,
        "citedPaths": list(cited),
        "deps": list(deps),
    })


# ---------------------------------------------------------------- header (lines 1-4)
row("C001",
    "Header status line (line 2); restated by the heading 'Observed baseline, not a promise of execution' (line 16) and by the last sentence of baseline bullet 5 (line 21)",
    "OBSERVATION",
    "Self-declared status, read as an absence claim: the program is design documents only. At the inspected revisions nothing it designs is implemented, in particular Pi has no working registered workflow_execute(kind=function) route to a Mechanical function, and no release carries it. Writing the design is not offered as evidence of implementation.",
    "**Status: DESIGN ONLY, not implemented or released.**",
    "Program level, both repositories at the header pins. 'Implemented' = the behaviour of the program's packets (P00-P12); 'released' = any shipped Pi or Mechanical version carrying the joined function route. Modules that predate the program (C012-C016) are baseline, not its implementation. No detection surface is stated beyond the inspected revisions; candidates are Pi source and tests at 0fb90672 and release metadata (package version, changelog, feature matrix).",
    PI, True, (), ("C008", "C009", "C011"))

row("C002",
    "Header (line 2, 'Default branch'; line 3, 'Inspected Pi revision')",
    "OBSERVATION",
    "The Pi revision this program inspected is commit 0fb9067262532289104417d2b7f2f25704563a75. It is a commit of the Pi-subagents repository on its default branch, whose ref name is 'master'. Every Pi-side baseline statement is about that revision, not about a later tip.",
    "**Inspected Pi revision:** 0fb9067262532289104417d2b7f2f25704563a75.",
    "Pi-subagents git history and default-branch setting: the commit exists, it is on the default branch, and the default branch has that name. The program's own deposit commits (documents only) come after this revision and are outside the claim.",
    HIST, True)

row("C003",
    "Header (line 3, 'Paired Mechanical snapshot ... with an additional main commit observed while authoring'; line 4, 'Companion Mechanical program' URL)",
    "OBSERVATION",
    "Mechanical-side pairing facts: (i) the paired MechanicalWorkflows snapshot is commit 69cb016dd293a17bcc893f2baf410a51c226f4c9, a commit on Mechanical's main branch; (ii) when this program was authored, main already held one further commit beyond that snapshot, so the snapshot was not the tip; (iii) a companion Mechanical program exists on main at docs/programs/pi-host-integrity-2026-11-10; (iv) implicit in 'paired': the companion program's own stated Mechanical and Pi baselines are these same revisions, or differ from them only by that one further commit.",
    "**Paired Mechanical snapshot:** 69cb016dd293a17bcc893f2baf410a51c226f4c9, with an additional main commit observed while authoring",
    "MechanicalWorkflows git history and branch main around authoring (header date 2026-11-10). Facet (iii) is judged at main at or after the companion's deposit, not at 69cb016d, which may predate it. Facet (iv) is read against the 'Source baseline' line of the companion README. 'An additional main commit' is read as exactly one.",
    HIST, True, ("docs/programs/pi-host-integrity-2026-11-10",))

# ---------------------------------------------------------------- purpose (line 7) and reading order (lines 9-14)
row("C004",
    "Purpose (line 7), sentences 1 and 3",
    "NORMATIVE",
    "Program goal and standing constraint: (i) deliver one first-class, versioned, independently installed MechanicalWorkflows function through Pi's registered workflow_execute(kind=function) route; (ii) with six required properties: exact input identity, end-to-end authority, long-lived exclusive workspace ownership, observable domain outcomes, durable uncertainty, and no false Forge verification; (iii) the November 9 program remains historical requirements provenance; (iv) the source changes that program completed must not be undone.",
    "Deliver one first-class, versioned, independently installed MechanicalWorkflows function through Pi's *registered* workflow_execute(kind=function) route, with exact input identity, end-to-end authority, long-lived exclusive workspace ownership, observable domain outcomes, durable uncertainty and no false Forge verification.",
    "Program-level objective and regression constraint for Pi and Mechanical. Its empirical premises are separate rows: the registered tool and its kind vocabulary (C007, C010), no current execution support (C008, C009, C011), the November 9 program and its completed changes (C006), the Mechanical function and its identity (C018, C027).",
    NONE, False, ("docs/programs/mechanical-native-interoperability-2026-11-09",),
    ("C006", "C007", "C010", "C011", "C018", "C027"))

row("C005",
    "Purpose (line 7), sentence 2; Read in order (lines 9-14)",
    "INFERENCE",
    "The program is (i) the next design revision after the November 9 program and (ii) self-contained: the README and the five documents its reading order links (01-AUDIT-AND-INVARIANTS.md, 02-PROTOCOL-AND-RUNTIME.md, 03-IMPLEMENTATION-PACKETS.md, 04-ADVERSARIAL-VERIFICATION.md, 05-OPERATIONS-AND-HANDOFF.md) exist at those relative paths and between them define every term, ledger and requirement an implementer needs, so nothing has to be fetched from the November 9 program, the companion Mechanical program or any other document.",
    "This is the next, self-contained design revision.",
    "The six-file corpus docs/programs/mechanical-interop-integrity-2026-11-10/ at the document pin (Pi 3fc0ead1), which is later than the inspected revision. 'Self-contained' is tested by looking for identifiers the corpus uses but does not define (D-numbers, H-packets, G and P test ids, V-tiers, W11, MW-CONTRACT) and for requirements it delegates to other documents.",
    HIST, True,
    ("01-AUDIT-AND-INVARIANTS.md", "02-PROTOCOL-AND-RUNTIME.md", "03-IMPLEMENTATION-PACKETS.md", "04-ADVERSARIAL-VERIFICATION.md", "05-OPERATIONS-AND-HANDOFF.md"),
    ("C006", "C032"))

row("C006",
    "Purpose (line 7), sentence 3 (the cited path, and the presupposition of 'its completed source changes')",
    "OBSERVATION",
    "Two facets: (i) a November 9 program exists in Pi at docs/programs/mechanical-native-interoperability-2026-11-09 at the inspected revision; (ii) that program has completed source changes, meaning code changes attributable to it have already landed, which is what 'must not be undone' protects. The artifact does not say which changes these are or which repository holds them.",
    "its completed source changes must not be undone",
    "(i) the Pi tree at 0fb90672; (ii) Pi git history between the November 9 program's deposit and 0fb90672 (source and test changes attributable to its packets or beads), and Mechanical history if the phrase covers producer-side changes. No detection surface is stated for which changes count.",
    PI, True, ("docs/programs/mechanical-native-interoperability-2026-11-09",))

# ---------------------------------------------------------------- observed baseline, bullet 1 (line 17)
row("C007",
    "Observed baseline, bullet 1 (line 17), sentence 1, clause 1",
    "OBSERVATION",
    "src/workbench/execute-tool.ts provides exactly one executable tool, workflow_execute, the registered tool whose kind=function route the Purpose names. Two readings of 'registers': the file itself calls Pi's registration API, or it defines the tool that another file registers. 'One' is scoped to this file, not to every launch-capable tool Pi registers.",
    "src/workbench/execute-tool.ts registers one executable tool",
    "Pi src/workbench/execute-tool.ts at 0fb90672 (the tool definitions it exports) and the call site that registers that tool.",
    PI, True, ("src/workbench/execute-tool.ts",))

row("C008",
    "Observed baseline, bullet 1 (line 17), sentence 1, clause 2",
    "OBSERVATION",
    "In the workflow_execute tool of src/workbench/execute-tool.ts, a request whose definition kind is not script is never launched: the non-script branch returns a refusal carrying the code unsupported-definition-kind. This covers kind function and kind furnace-formula alike. Requests refused earlier in the handler (admission or grant checks) do not reach this branch.",
    "its non-script branch returns unsupported-definition-kind",
    "The workflow_execute handler in Pi src/workbench/execute-tool.ts at 0fb90672: definition kinds other than script, and the refusal code returned to the model.",
    PI, True, ("src/workbench/execute-tool.ts",), ("C007",))

row("C009",
    "Observed baseline, bullet 1 (line 17), sentence 2",
    "OBSERVATION",
    "Absence claim over one file: src/index.ts wires only script launchers into the registered workflow_execute tool. Each launcher it supplies, for every host mode, runs a saved script; it wires no function launcher, no furnace-formula launcher and no Mechanical host.",
    "src/index.ts wires script launchers only.",
    "Pi src/index.ts at 0fb90672: the launcher dependencies passed to the workflow_execute tool where it is registered, and any other call site in that file that could launch a non-script definition. Detection surface: that file's launcher wiring and imports.",
    PI, True, ("src/index.ts",), ("C007",))

row("C010",
    "Observed baseline, bullet 1 (line 17), sentence 3 (presupposition: the schema advertises both kinds)",
    "OBSERVATION",
    "The model-facing parameter schema of the registered tool advertises the definition kinds function and furnace-formula beside script, so a model can submit a well-formed request that names either kind.",
    "The model schema advertising function and furnace-formula",
    "The workflow_execute parameter schema at 0fb90672 (the definition kind field). The sentence names no file; by bullet context the schema is that of the tool in C007.",
    PI, True, (), ("C007",))

row("C011",
    "Observed baseline, bullet 1 (line 17), sentence 3 (predicate)",
    "INFERENCE",
    "The schema's advertisement of function and furnace-formula (C010) is not execution support: at the inspected revision no request of kind function or furnace-formula can execute through the registered tool. This is an inference from the non-script refusal (C008) and the script-only wiring (C009); it fails if any other reachable path launches a non-script definition.",
    "The model schema advertising function and furnace-formula is NOT execution support.",
    "The whole registered Pi tool surface at 0fb90672, in every host mode. 'Execution support' = a launch that reaches a function or formula producer.",
    PI, True, (), ("C008", "C009", "C010"))

# ---------------------------------------------------------------- observed baseline, bullet 2 (line 18)
row("C012",
    "Observed baseline, bullet 2 (line 18), clause 1",
    "OBSERVATION",
    "src/workbench/mechanical-descriptor.ts contains a loader for a Mechanical entrypoint descriptor that is pinned and allowlisted: it admits a descriptor and the artifact it names only when they match digest pins and the descriptor matches an entry of a fixed allowlist of reviewed entrypoints.",
    "src/workbench/mechanical-descriptor.ts has a pinned descriptor/allowlist loader",
    "Pi src/workbench/mechanical-descriptor.ts at 0fb90672: its validation and load functions, digest-pin checks and reviewed-entrypoint allowlist. 'Pinned' is read as digest-pinned. 'Has' = the module exists; whether anything outside tests calls it is a separate question (C009).",
    PI, True, ("src/workbench/mechanical-descriptor.ts",))

row("C013",
    "Observed baseline, bullet 2 (line 18), clause 2, first half",
    "OBSERVATION",
    "src/workbench/function-authority.ts can do two things with exact grants: (i) adopt them, that is bind a function definition to one exact action-grant spelling; (ii) recheck them, that is read the host's grants again at the final dispatch boundary instead of relying on the decision taken when the request entered.",
    "src/workbench/function-authority.ts can adopt and recheck exact grants",
    "Pi src/workbench/function-authority.ts at 0fb90672: the adoption function and the authority decision and dispatch boundary. 'Can' = the capability exists in the module, not that a registered path uses it.",
    PI, True, ("src/workbench/function-authority.ts",))

row("C014",
    "Observed baseline, bullet 2 (line 18), clause 2, second half",
    "OBSERVATION",
    "The contract value that src/workbench/function-authority.ts exports as the one in force, FUNCTION_ACTION_CONTRACT, is in the unadopted state: no exact function action grant has been adopted for any definition. 'Exported default' is read as the default contract value the module exports, not necessarily an ES default export.",
    "its exported default FUNCTION_ACTION_CONTRACT remains unadopted",
    "The exported constant FUNCTION_ACTION_CONTRACT in Pi src/workbench/function-authority.ts at 0fb90672 and every importer that supplies a contract to the authority decision. 'Remains' implies it was also unadopted at earlier revisions.",
    PI, True, ("src/workbench/function-authority.ts",), ("C013",))

row("C015",
    "Observed baseline, bullet 2 (line 18), clause 3, first half",
    "OBSERVATION",
    "src/workbench/source-admission.ts confines Git worktrees: before a source write it checks the workspace and refuses one that fails the confinement. Read concretely, an admitted workspace must resolve inside an authorized root and be the root of its own Git worktree.",
    "src/workbench/source-admission.ts confines Git worktrees",
    "Pi src/workbench/source-admission.ts at 0fb90672: workspace confinement and source-identity measurement. The artifact says only 'confines Git worktrees'; what is confined, and against which root, has to be read from the module.",
    PI, True, ("src/workbench/source-admission.ts",))

row("C016",
    "Observed baseline, bullet 2 (line 18), clause 3, second half",
    "OBSERVATION",
    "src/workbench/source-admission.ts keeps writer leases in a WriterLeases registry backed by an in-memory map, so lease state lives only in the process that created the registry. It is not persisted and is not visible to another process or host, and therefore gives no cross-process or post-restart exclusivity.",
    "carries a process-local WriterLeases map",
    "The WriterLeases class in Pi src/workbench/source-admission.ts at 0fb90672 and the sites that instantiate it. 'Process-local' contains an absence claim (no durable or shared lease store behind it); its detection surface is that class and its callers.",
    PI, True, ("src/workbench/source-admission.ts",))

# ---------------------------------------------------------------- observed baseline, bullet 3 (line 19)
row("C017",
    "Observed baseline, bullet 3 (line 19), both sentences",
    "OBSERVATION",
    "Pi at the inspected revision already has seven primitives, each separately testable: (i) script workflow execution; (ii) Claude execution; (iii) a detached host; (iv) observation; (v) control; (vi) reconcile; (vii) worktree preservation. The artifact attaches a two-part classification rule: they are not missing, so they are not to be rebuilt, and they are not joined Mechanical execution, because none of them runs a Mechanical function through the registered route. The second part is an absence claim that rests on C008, C009 and C011.",
    "Pi has script, Claude, detached-host, observation/control/reconcile and worktree-preservation primitives. Do not reclassify those as missing or as joined Mechanical execution.",
    "Pi src/ at 0fb90672. The artifact cites no path for any of the seven, so each needs its own witness and verdict. 'Primitive' (code present) is weaker than 'working' or 'exercised by a registered tool'.",
    PI, True, (), ("C008", "C009", "C011"))

# ---------------------------------------------------------------- observed baseline, bullet 4 (line 20)
row("C018",
    "Observed baseline, bullet 4 (line 20), sentence 1, item 1; Release definition (line 24), 'four Mechanical callbacks' and 'original domain result' (presuppositions)",
    "OBSERVATION",
    "Mechanical has an ordinary function develop(services, request), that is a plain function that receives its services as an argument. The services it takes are exactly four callbacks, the 'four Mechanical callbacks' of the release definition, and its return value is the domain result that the release definition requires workflow_observe to show unchanged.",
    "Mechanical has ordinary develop(services,request)",
    "Mechanical source at 69cb016d: the develop export and its services, request and outcome contract. The artifact cites no path. 'Ordinary', 'exactly four' and 'returns a domain result' are separate facets.",
    MW, True)

row("C019",
    "Observed baseline, bullet 4 (line 20), sentence 1, item 2",
    "OBSERVATION",
    "The Mechanical package @mechanical/development-rig ships a host subpath: the module specifier @mechanical/development-rig/host resolves through the package's export map to a built host entry that is part of the packed artifact. 'Shipped' is stronger than 'declared in source'.",
    "a shipped @mechanical/development-rig/host subpath",
    "Mechanical at 69cb016d: the development-rig package manifest (exports, files), the host source it points to and the built or packed output. Whether the package is published to a registry is not stated.",
    MW, True, ("@mechanical/development-rig/host",))

row("C020",
    "Observed baseline, bullet 4 (line 20), sentence 1, item 3",
    "OBSERVATION",
    "Mechanical has L2 external installed-host fixtures: tests or fixtures, at the tier Mechanical calls L2, that pack the host, install it into a consumer outside the workspace sources and exercise the installed artifact.",
    "L2 external installed-host fixtures",
    "Mechanical at 69cb016d: development-rig tests, fixtures and QA receipts labelled L2, installed-host or installed-consumer. 'L2' is Mechanical's tier name and is not defined in the README; 'external' = installed outside the workspace source tree.",
    MW, True, (), ("C019",))

row("C021",
    "Observed baseline, bullet 4 (line 20), sentence 1, item 4",
    "OBSERVATION",
    "Mechanical has standalone native execution for three providers: (i) Git, (ii) Claude, (iii) Forge. 'Standalone' means run by Mechanical's own rig without Pi; 'native' means the real provider (real Git operations, the real Claude Agent SDK, a real Forge gate) rather than a fake or fixture.",
    "standalone native Git/Claude/Forge execution",
    "Mechanical at 69cb016d: the live development producer of the development rig and its recorded native evidence. Three conjuncts, one verdict each. 'Has ... execution' may mean code that can run natively or runs that were actually recorded; the artifact does not say which.",
    MW, True)

row("C022",
    "Observed baseline, bullet 4 (line 20), sentence 2",
    "OBSERVATION",
    "Absence claim: none of the four Mechanical assets just listed (the develop function, the host subpath, the L2 installed-host fixtures, the standalone native execution), which the artifact here calls 'proofs', runs through Pi's registered tool. Whatever they demonstrate, they demonstrate it without a registered Pi workflow_execute invocation.",
    "Those proofs do NOT run through registered Pi.",
    "Mechanical tests, fixtures and receipts at 69cb016d, read against Pi's registered tool at 0fb90672. No detection surface is stated; the candidate is whether any Mechanical test or receipt loads the Pi extension or calls its registered workflow_execute. A consumer that is only named after Pi does not count as registered Pi.",
    MW, True, (), ("C008", "C009", "C018", "C019", "C020", "C021"))

# ---------------------------------------------------------------- observed baseline, bullet 5 (line 21)
row("C023",
    "Observed baseline, bullet 5 (line 21), sentence 1, clause 1",
    "OBSERVATION",
    "Absence claim: no receipt exists of a live, joined run, meaning one invocation through Pi's registered route that reached a Mechanical function and real Claude, real Git and real Forge. The slash-joined triple is read as one run covering all three providers; the stronger per-provider reading (no live joined Pi receipt for Claude, none for Git, none for Forge) is the reading to attack.",
    "No live joined Claude/Git/Forge Pi receipt",
    "Committed receipts and evidence in Pi at 0fb90672 and in Mechanical at 69cb016d. No detection surface is stated; receipts held outside the two repositories are not covered. 'Live' = real providers; 'joined' = through registered Pi into Mechanical. Standalone Mechanical receipts and Pi script receipts do not count.",
    PI, True, (), ("C008", "C009", "C022"))

row("C024",
    "Observed baseline, bullet 5 (line 21), sentence 1, clause 2",
    "OBSERVATION",
    "Absence claim: no proof exists (test, receipt or recorded trial) that a joined Pi-to-Mechanical invocation survives a crash and restart of the host or worker, that is, that it is re-attached or reconciled afterwards without a duplicated effect.",
    "no joined crash restart proof",
    "Tests and receipts in Pi at 0fb90672 and Mechanical at 69cb016d; no detection surface is stated. 'Joined' as in C023: crash or restart evidence that exists only for Pi scripts or only for standalone Mechanical is outside the claim.",
    PI, True, (), ("C023",))

row("C025",
    "Observed baseline, bullet 5 (line 21), sentence 1, clause 3",
    "OBSERVATION",
    "Absence claim: no proof exists of a distributed writer lease that is compatible with this design, that is, no evidence that one writer lease is honoured across processes or hosts. 'Compatible' is not defined in the README; it may mean compatible with the program's lease semantics or compatible between Pi and Mechanical.",
    "no compatible distributed lease proof",
    "Lease implementations, tests and receipts in Pi at 0fb90672 and Mechanical at 69cb016d; no detection surface is stated. Related to the process-local lease registry of C016.",
    PI, True, (), ("C016",))

# ---------------------------------------------------------------- release definition (line 24)
row("C026",
    "Release definition (line 24), both sentences",
    "DEFINITION",
    "Release definition (stipulated): the first supported vertical is (i) the host-reviewed function mechanical.development.develop.v1; (ii) attached or explicitly admitted same-machine execution; (iii) one clean isolated Git worktree; (iv) the profile pair git-census-v1/plain-v1; (v) four Mechanical callbacks; (vi) a candidate commit made by the real Claude Agent SDK; (vii) a strict native Forge gate; (viii) workflow_observe of the same logical invocation, showing the original domain result. Excluded from it: a script alias, a model-provided action grant, an ambient workspace write, a generic function import, invented verification, and automatic retry of an uncertain effect.",
    "No script alias, model-provided action grant, ambient workspace write, generic function import, invented verification, or automatic uncertain-effect retry.",
    "Stipulated scope of the first release. Its current-state premises are separate rows: function id (C027), profiles (C028), execution placement (C029), observation (C030), develop and its callbacks (C018), worktree confinement (C015), native providers (C021). Items (vi) to (viii) are targets, not present-state claims.",
    NONE, False, (), ("C015", "C018", "C021", "C027", "C028", "C029", "C030"))

row("C027",
    "Release definition (line 24), sentence 1, item 1 (presupposition); Purpose (line 7), 'versioned'",
    "OBSERVATION",
    "mechanical.development.develop.v1 is an existing, versioned identity of Mechanical's develop function, and it is 'host-reviewed' in the sense that Pi's fixed allowlist of reviewed entrypoints names it. Two facets, one per repository: a producer-side descriptor carries the id; Pi's allowlist carries the same id.",
    "host-reviewed mechanical.development.develop.v1",
    "Pi at 0fb90672 (the reviewed-entrypoint allowlist of the descriptor module in C012) and Mechanical at 69cb016d (the entrypoint descriptor and schemas that name the id). 'Host-reviewed' is not defined in the README.",
    PI, True, (), ("C012", "C018"))

row("C028",
    "Release definition (line 24), sentence 1, item 4 (presupposition); Operating constraints (line 30), 'first Git/plain release'",
    "OBSERVATION",
    "git-census-v1 and plain-v1 are existing named profile identifiers, an evidence profile and a context profile that together form the 'Git/plain' pair, and they are witnessed in code rather than only in program documents. The README does not say which repository defines them or whether Pi's own source knows them.",
    "git-census-v1/plain-v1",
    "Source, schemas and tests in Mechanical at 69cb016d and in Pi at 0fb90672; documents do not count as witnesses. One verdict per identifier and per repository.",
    MW, True)

row("C029",
    "Release definition (line 24), sentence 1, item 2 (presupposition)",
    "OBSERVATION",
    "The execution placements named for the first release exist in Pi at the inspected revision: an 'attached' mode, read here as execution inside the calling Pi session, and a same-machine mode that requires explicit admission. Implicit second facet: the corpus uses one placement vocabulary for the first release, so 'attached or explicitly admitted same-machine' names the same scope as the host-mode statements in documents 02 and 05.",
    "attached or explicitly admitted same-machine execution",
    "The host-mode vocabulary and grants of Pi's workflow_execute at 0fb90672; the README does not define 'attached'. Consistency facet: document 02 section 1 (host mode for the first cut) and document 05 'Supported first release / future variants', at the document pin.",
    PI, True, (), ("C007",))

row("C030",
    "Release definition (line 24), sentence 1, item 8 (presupposition)",
    "OBSERVATION",
    "Pi at the inspected revision registers a workflow_observe tool, and workflow_execute mints a host-side logical invocation reference under which a launch can later be observed. This is the existing mechanism that 'workflow_observe of the SAME logical invocation' builds on. Showing a Mechanical domain result through it is a target, not part of this premise.",
    "workflow_observe of the SAME logical invocation and original domain result",
    "Pi's registered tools at 0fb90672: the handle workflow_observe accepts and the invocation reference workflow_execute returns. Whether the two are the same value in each host mode is part of the claim.",
    PI, True, (), ("C007", "C017"))

# ---------------------------------------------------------------- severity and ownership (line 27)
row("C031",
    "Severity and ownership (line 27), sentences 1, 2 and 4, and the assignment made in sentence 3",
    "NORMATIVE",
    "Ownership and severity split: (i) Pi owns three P0 items covering four D-numbers: canonical admitted input versus dispatched input (D3), invocation-scoped writer ownership (D5), composed authority and routing (D6/D9); and, with no D-number or severity given, real observation, journal, controls, lifetime and load; (ii) Mechanical owns two P0 items covering three D-numbers: strict Forge proof (D1/D7) and negative-effect semantics (D2); and, with no severity given, packed executable closure (D4), native service binding and provider receipts; (iii) D8, D10, D11 and D12 are shared or Mechanical-owned; (iv) definition: a P0 in this program is a blocker for the target release and is expressly not a claim that a currently exploitable Pi function route exists.",
    "Pi owns: P0 canonical admitted input vs dispatched input (D3); P0 invocation-scoped writer ownership (D5); P0 composed authority/routing (D6/D9); real observation, journal, controls, lifetime and load.",
    "Allocation of work between the two programs. Pi-side premises are carried by baseline rows: writer leases (C016), unadopted authority (C014), script-only routing (C008, C009), existing observation and control (C017). The D3 premise, that the admitted input can differ from what a launcher receives, is not stated in the README. Mechanical-side premises are C033; whether the corpus describes each D-number is C032.",
    NONE, False, (), ("C008", "C009", "C014", "C016", "C017", "C032", "C033"))

row("C032",
    "Severity and ownership (line 27), sentence 3 ('as described in this corpus'), and every D-number reference in the paragraph",
    "SOURCE_REPORT",
    "The D-numbers form one defect ledger that the corpus describes: (i) every D-number the README uses (D1 to D12) has a description a reader of the corpus can find; (ii) in particular the corpus describes D8, D10, D11 and D12 and says each is shared or Mechanical-owned; (iii) the README's label, owner and severity for each D-number agree with that description and with the companion Mechanical program's ledger, so no D-number has two meanings or two owners across the two programs.",
    "D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus.",
    "Detection surface: the six Pi program files at the document pin (where D1 to D12 occur and are defined). If 'this corpus' means the joint Pi and Mechanical program, also the companion's defect ledger; the artifact does not say which. Facet (iii) is a cross-program consistency check.",
    HIST, True, (), ("C003",))

row("C033",
    "Severity and ownership (line 27), sentence 2 (presuppositions); Purpose (line 7), 'no false Forge verification'",
    "INFERENCE",
    "Embedded premise of the Mechanical-owned items: at the paired snapshot the Mechanical producer really has the gaps these labels name. (i) Its Forge verification is not strict: a Forge result can be accepted as passed or verified without complete native proof (D1/D7; the 'false Forge verification' the Purpose excludes). (ii) Its negative-effect semantics can conclude that no effect occurred from evidence that does not establish it (D2). (iii) The executable closure of its packed host is not fully pinned or verified (D4). The README gives labels only and cites no source for any of the three.",
    "Mechanical owns: P0 strict Forge proof (D1/D7), P0 negative-effect semantics (D2), packed executable closure (D4), native service binding and provider receipts.",
    "Mechanical source at 69cb016d (development rig: gate classification, effect-intent settlement and reconciliation, installed-host loading). The README defines none of D1, D2, D4, D7. Document 01's header treats earlier deep-audit candidate references as hypotheses until a red test exercises them.",
    MW, True, (), ("C019", "C021", "C032"))

# ---------------------------------------------------------------- operating constraints (line 30)
row("C034",
    "Operating constraints (line 30), all sentences; Header (line 3), 're-pin both before implementation'",
    "NORMATIVE",
    "Operating constraints: (i) re-pin both repositories before implementation; (ii) GitHub CI is not the verification path: use focused local tests, a complete Forge gate where one is available, exact source pins and machine-readable producer receipts; (iii) preserve the independence of Forge and Furnace; (iv) never couple Mechanical core to Pi; (v) never require Library for execution; (vi) keep the optional HX, RF and Furnace profiles out of the first Git/plain release; (vii) use real Beads identities where they exist: the program's packet IDs are planning labels and must not be presented as bead IDs; (viii) documentation, skill, examples and agent LX updates belong to closure.",
    "Use focused local tests, complete Forge gate where available, exact source pins and machine-readable producer receipts.",
    "Process and architecture rules for implementers in both repositories. Their current-state premises are C035; the pins to refresh are C002 and C003.",
    NONE, False, (), ("C002", "C003", "C035"))

row("C035",
    "Operating constraints (line 30), sentences 1 and 3 (presuppositions)",
    "OBSERVATION",
    "Current-state premises the operating constraints presuppose: (i) Forge and Furnace are independent of each other at the pins, neither integration requiring the other, which is what 'Preserve' assumes; (ii) Mechanical core, the packages that hold develop and the coordination functions, has no dependency on Pi; (iii) executing the Mechanical function requires nothing from Library; (iv) HX, RF and Furnace exist as optional profiles, separately selectable and distinct from the Git/plain pair; (v) on the empirical reading of 'No GitHub CI.', no GitHub-hosted CI is configured for, or gates, either repository (the rule reading is C034 item ii).",
    "Preserve independent Forge and Furnace, never couple Mechanical core to Pi, never require Library for execution, and keep optional HX/RF/Furnace profiles outside the first Git/plain release.",
    "Dependency manifests, imports and profile vocabulary in Mechanical at 69cb016d and Pi at 0fb90672; for (v) the CI configuration directories of both trees. (ii), (iii) and (v) are absence claims with no stated detection surface. Five facets, one verdict each.",
    MW, True, (), ("C028",))


def main():
    out = sys.argv[1]
    with open(out, "w", encoding="utf-8") as fh:
        for r in ROWS:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")
    print("wrote", len(ROWS), "rows to", out)


if __name__ == "__main__":
    main()
