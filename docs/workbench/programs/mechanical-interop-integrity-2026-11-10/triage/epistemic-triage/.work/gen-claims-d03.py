#!/usr/bin/env python3 -I
"""Phase 1 ATOMIZE generator for pi-03-IMPLEMENTATION-PACKETS.md -> claims-d03.jsonl (ids C136-C180).

Every strongestWording is asserted to be a verbatim substring of the pinned document copy.
Graph-line wordings are extracted by regex from the document so dash runs are copied, not typed.
"""
import json, re, sys

DOC = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/docs/pi-03-IMPLEMENTATION-PACKETS.md"
OUT = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/epistemic-triage/.work/claims-d03.jsonl"
DOCNAME = "pi-03-IMPLEMENTATION-PACKETS.md"
ID_LO, ID_HI = 136, 180
KINDS = {"OBSERVATION","SOURCE_REPORT","FORMAL_DERIVATION","INFERENCE","HYPOTHESIS","PREDICTION","DEFINITION","NORMATIVE","PROPOSAL"}
TIMES = {"pi-0fb90672","mw-69cb016d","history","none"}

doc = open(DOC, encoding="utf-8").read()

def rx(pattern):
    m = re.search(pattern, doc)
    if not m:
        sys.exit(f"regex did not match document: {pattern!r}")
    return m.group(0)

claims = []
def C(n, loc, kind, text, sw, scope, time, material, paths, deps):
    claims.append({
        "id": f"C{n}", "doc": DOCNAME, "loc": loc, "kind": kind, "text": text,
        "strongestWording": sw, "scope": scope, "timeContext": time, "material": material,
        "citedPaths": paths, "deps": deps,
    })

# ---------------------------------------------------------------- preamble (L1-L2)
C(136, "L2 preamble 'Every packet'", "NORMATIVE",
  "Per-packet execution protocol: inspect exact current sources/Beads first; write a red behavior test and its negative mutant; implement the minimal change; run focused suites and the applicable local Forge full gate; capture command/exit/digest/native receipts; update docs/skills and actual status in the same implementation cut. Embedded premise: Pi has an applicable local Forge gate configuration (forge.toml at the pin) that a packet can run.",
  "inspect exact current sources/Beads first; write a red behavior test and its negative mutant; implement minimal change; run focused suites and applicable local Forge full gate; capture command/exit/digest/native receipts; update docs/skills and actual status in the SAME implementation cut",
  "all MII packets P00-P12; Pi repo (MW packets carry their own protocol in mw-03 L2)", "none", False,
  ["pi:forge.toml", "doc:mw-03-IMPLEMENTATION-PACKETS.md#L2"], [])

C(137, "L2 preamble", "DEFINITION",
  "The packet identifiers P00-P12 in this document are planning labels, not Beads IDs. Implicit premise the implementation hangs on: there is a mapping from these labels to the live MNI beads that must be reconciled, and that mapping is NOT the identity on numbers (live beads are keyed to MNI-2026-11-09 labels: wb-w8fk=MNI P00 contract choice ~ MII P00; wb-y0n6=MNI P02 'Installed producer descriptor/package admission' ~ MII P04, not MII P02; wb-2ukh=MNI P03 authority+writer source admission ~ MII P03 (+ the MII P02 lease surface in source-admission.ts); wb-4bxo=MWI-dispatch registered tool ~ MII P05, not MII P04; wb-9a1o outcomes ~ MII P06; wb-mwsy/wb-5a7k effects+controls ~ MII P07; wb-p3i2 ~ MII P08; wb-xr1z/wb-9bof ~ MII P09; wb-yiu4 ~ MII P10).",
  "The following IDs are planning labels, not Beads IDs.",
  "MII P00-P12 vs MNI P00-P12 vs live beads under epic wb-rhyt; mapping is undocumented in this file", "history", True,
  ["pi:docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md#L37-L115", "beads:wb-w8fk,wb-y0n6,wb-2ukh,wb-4bxo,wb-9a1o,wb-mwsy,wb-5a7k,wb-p3i2,wb-xr1z,wb-9bof,wb-yiu4"], [])

C(138, "L2 preamble", "OBSERVATION",
  "Absence claim: the Pi repository has no GitHub CI (so packet evidence must come from local focused tests and local Forge gates, never from CI or invented passing gates). Detection surface for the strong reading: existence of a workflow definition under .github/workflows/ at 0fb90672 (a ci.yml defining lint/typecheck/test jobs on push/pull_request to master is present at the pin); the weaker operational reading ('no CI run is available as evidence in this environment') has no stated detection surface in the document.",
  "No GitHub CI or invented passing gates.",
  "Pi repo at 0fb90672 (README 'Operating constraints' repeats the same sentence); MW repo at 69cb016d has no .github/workflows", "pi-0fb90672", True,
  ["pi:.github/workflows/ci.yml", "doc:pi-README.md#L30"], [])

# ---------------------------------------------------------------- dependency graph (L4-L14)
C(139, "L6-L9 dependency graph", "PROPOSAL",
  "Dependency-order assumption: P00 (source pins/ABI decision) precedes P01, P02, P03 and P06; P01 (canonical function input), P02 (durable lease/fencing) and P03 (exact grant/source authority) jointly precede P04; P04 precedes P05 (registered function launcher). Embedded premise: the ABI decision in P00 is needed before any of the three P0 foundations can be cut (P01-P03 each name P00 outputs: canonical input rule, grant spelling, descriptor ID/version).",
  rx(r"\+-> P02 durable lease/fencing -+\+--> P04 composed admission --> P05 registered function launcher"),
  "MII Pi-side DAG only; compare MNI DAG where P04 was the registered branch and P02 the installed-descriptor admission (label shift)", "none", True,
  ["doc:pi-03#L6-L9", "pi:docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md#L11"], ["C137"])

C(140, "L8 graph node vs L39 heading", "INFERENCE",
  "Implicit identity premise: the dependency-graph node labelled 'P04 composed admission' denotes the same packet as the section '### P04 — Reviewed installed host consumer (P0; MW H01/H02)'. The two names describe different work (composition of P01-P03 admission vs. consuming the reviewed installed Mechanical host); the document never states they are one packet, and P05's header '(P0; P01–P04)' is the only place the chain is restated.",
  "P04 composed admission",
  "internal consistency of pi-03 only", "none", True,
  ["doc:pi-03#L8", "doc:pi-03#L39", "doc:pi-03#L45"], ["C139"])

C(141, "L10 graph + L57 P07 heading", "PROPOSAL",
  "Dependency-order assumption: P06 (observation contract) runs in parallel with P01-P04 and feeds P07 (journal/control/reconcile); P07 also depends on P02 and P05 (heading '(P0; P02/P05/P06)'). Embedded premise: the observation bridge can be built without the registered launcher existing (P06 is 'parallel with P04' and not downstream of P05).",
  rx(r"\+-> P06 observation contract \[parallel\] -\+-+\+-+\+--> P07 journal/control/reconcile"),
  "MII Pi-side DAG; P06/P07 vs live beads wb-9a1o (outcomes) and wb-mwsy/wb-5a7k (effects/controls) which depend on wb-4bxo (dispatch)", "none", True,
  ["doc:pi-03#L10", "doc:pi-03#L51", "doc:pi-03#L57"], ["C137", "C139"])

C(142, "L11 dependency graph", "PROPOSAL",
  "Cross-repository dependency assumption: P08 (joined native journey) requires the Mechanical-side host packets labelled H01/H02/H03, native proof and services, in addition to P07. Embedded premise: the labels H01/H02/H03 as used here resolve to definite Mechanical packets; the Pi corpus (pi-05 L30-L32) defines H01=host accepts validated binding+manifest, H02=production four callbacks, H03=strict verification evidence, whereas the Mechanical companion (mw-03) defines H01=strict Forge certificate, H02=negative effect/recovery, H03=installed runtime closure, and mw-03's own joined journey node is H08 gated on H05+H06+H07+'Pi registered dispatcher'.",
  rx(r"Mechanical H01/H02/H03 host, native proof, services -+\+--> P08 joined native journey"),
  "joint Pi/MW DAG; two H-numberings in play (pi-05 vs mw-03)", "mw-69cb016d", True,
  ["doc:pi-03#L11", "doc:pi-05-OPERATIONS-AND-HANDOFF.md#L30-L32", "doc:mw-03-IMPLEMENTATION-PACKETS.md#L5-L13"], [])

C(143, "L12-L13 dependency graph", "PROPOSAL",
  "Dependency-order assumption: P08 precedes P09 (fault/restart/soak) which precedes P10 (release/docs/skills); P11 (detached/Furnace) and P12 (HX/RF/read-only functions) are optional, come only after P10 and are separately gated. Compare MNI where the adversarial matrix (MNI P08, live bead wb-xr1z in_progress) precedes crash/recovery (MNI P09, wb-9bof) and release (MNI P10, wb-yiu4).",
  "P08 --> P09 fault/restart/soak --> P10 release/docs/skills",
  "MII tail ordering; MNI beads wb-xr1z -> wb-9bof -> wb-yiu4 already encode a similar chain", "none", False,
  ["doc:pi-03#L12-L13", "beads:wb-xr1z,wb-9bof,wb-yiu4"], ["C137"])

# ---------------------------------------------------------------- P00 (L16-L19)
C(144, "L17 P00 Inspect", "OBSERVATION",
  "Existence premise: the sources P00 directs implementers to inspect exist at the pins — Pi src/index.ts, src/workbench/execute*.ts (execute.ts, execute-tool.ts), mechanical-descriptor.ts, function-authority.ts, source-admission.ts, observation.ts and a W11 row in docs/workbench/feature-matrix.md; Mechanical host.ts, host-binding.ts and host-services.ts (located under apps/development-rig/src/ at 69cb016d, a path the document does not state).",
  "src/index.ts, src/workbench/execute*, mechanical-descriptor, function-authority, source-admission, observation, Pi W11, paired Mechanical host.ts/host-binding.ts/host-services.ts",
  "Pi at 0fb90672 and MW at 69cb016d; bare basenames are given for the Mechanical files", "pi-0fb90672", True,
  ["pi:src/index.ts", "pi:src/workbench/execute.ts", "pi:src/workbench/execute-tool.ts", "pi:src/workbench/mechanical-descriptor.ts", "pi:src/workbench/function-authority.ts", "pi:src/workbench/source-admission.ts", "pi:src/workbench/observation.ts", "pi:docs/workbench/feature-matrix.md#W11", "mw:apps/development-rig/src/host.ts", "mw:apps/development-rig/src/host-binding.ts", "mw:apps/development-rig/src/host-services.ts"], [])

C(145, "L18 P00 Implement", "INFERENCE",
  "The exact v1 action grant spelling is 'mechanical:develop-write', presented as the literal both repositories sign off. Embedded empirical premise: this spelling is already the Mechanical side's spelling (witnessed at 69cb016d in apps/development-rig/src/host-binding.ts and tests) and Pi has NOT adopted it (zero occurrences in Pi src at 0fb90672; function-authority.ts FUNCTION_ACTION_CONTRACT is frozen at state 'unadopted', blockedOn 'MW-CONTRACT'); the spelling appears in Pi only in the MNI program docs.",
  "exact action grant mechanical:develop-write",
  "joint v1 contract; Pi src vs MW src witnesses differ; overlaps live bead wb-w8fk (in_progress, contract choice)", "pi-0fb90672", True,
  ["pi:src/workbench/function-authority.ts#L135-L145", "mw:apps/development-rig/src/host-binding.ts", "mw:apps/development-rig/test/host-binding.test.ts", "mw:apps/development-rig/test/installed-pi-consumer-conformance.test.ts", "beads:wb-w8fk"], [])

C(146, "L18 P00 Implement", "PROPOSAL",
  "P00 deliverables: a signed-off literal descriptor ID/version, the exact action grant, a canonical input rule, a first host mode, a profile set and versioned test vectors; record both source SHAs and the installed Node/SDK identity. Red tests: incompatible schema or spelling; unadopted grant; producer/consumer disagreement on canonical JSON bytes.",
  "signed-off literal descriptor ID/version, exact action grant mechanical:develop-write, canonical input rule, first host mode, profile set, versioned test vectors; record both source SHAs, installed Node/SDK identity",
  "P00 scope; overlaps MNI P00 (wb-w8fk) and mw-03 H00 'ratify mechanical.pi-host/v1, reviewed ID, mechanical:develop-write, canonical input, profile pair'", "none", False,
  ["doc:pi-03#L18-L19", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H00", "beads:wb-w8fk"], ["C145"])

C(147, "L18 P00", "OBSERVATION",
  "Baseline observation embedded in a warning: at 0fb90672 Pi has no enabled Mechanical function support; the v1 contract is a proposal only (consistent with README baseline: the registered tool's non-script branch returns unsupported-definition-kind and src/index.ts wires script launchers only).",
  "Do not confuse a proposed v1 contract with enabled function support.",
  "Pi at 0fb90672", "pi-0fb90672", True,
  ["pi:src/workbench/execute-tool.ts", "pi:src/index.ts", "doc:pi-README.md#L17"], [])

C(148, "L19 P00 Done", "PROPOSAL",
  "P00 exit criteria: the two repositories reference an identical compatibility matrix, and unknown contract versions fail closed.",
  "two repos reference identical compatibility matrix; unknown versions fail closed",
  "P00 acceptance; both repos", "none", False, ["doc:pi-03#L19"], ["C145", "C146"])

# ---------------------------------------------------------------- P01 (L21-L25)
C(149, "L22 P01 Change", "PROPOSAL",
  "P01 change set is confined to src/workbench/execute.ts, execute-tool.ts and identity.ts 'as needed', and must not alter script execution semantics. Embedded premise: the script execution path is implemented in or through those same three files, so a function-route change there can regress scripts.",
  "src/workbench/execute.ts, execute-tool.ts, identity.ts as needed; do NOT alter script execution semantics",
  "P01; Pi at 0fb90672; function route only, script path preserved", "pi-0fb90672", True,
  ["pi:src/workbench/execute.ts", "pi:src/workbench/execute-tool.ts", "pi:src/workbench/identity.ts"], [])

C(150, "L24 P01 Red tests (implicit premise)", "OBSERVATION",
  "Implicit empirical premise presupposed by the 'raw-vs-canonical divergence' red test and by pi-01 PI-I01: at 0fb90672 the function admission digest is computed over withoutBeadsNotes(input) while the script-style launcher structure reads the original params.input, so a function route built on the existing launcher structure could dispatch bytes that differ from the digested canonical payload. (No current function launch occurs, so the divergence is latent, not exercised.)",
  "raw-vs-canonical divergence",
  "Pi at 0fb90672; latent structure, not an observed runtime defect", "pi-0fb90672", True,
  ["pi:src/workbench/execute.ts", "pi:src/workbench/identity.ts", "pi:src/workbench/function-authority.ts", "doc:pi-01-AUDIT-AND-INVARIANTS.md#L7"], [])

C(151, "L23 P01 Implement", "PROPOSAL",
  "P01 deliverable: admission returns a normalized immutable function request; the digest is computed over exactly the dispatched payload; Beads notes, getter/cycle/prototype edge cases and UTF-8/depth budgets are handled protectively.",
  "normalized immutable function request returned by admission, digest computed over exactly dispatched payload; protective handling of Beads notes, getter/cycle/prototype edge cases, UTF-8/depth budgets",
  "P01; overlaps MNI P01/P03 and D3 (PI-I01)", "none", False, ["doc:pi-03#L23", "doc:pi-01-AUDIT-AND-INVARIANTS.md#L7"], ["C150"])

C(152, "L24 P01 Red tests", "PROPOSAL",
  "P01 red-test specification: raw-vs-canonical divergence; poisoned note getter; note-only changes never affect function identity; typed source/basis changes DO affect identity; a test launcher receives canonical bytes only.",
  "note-only changes never affect function identity; typed source/basis changes DO affect identity; a test launcher receives canonical bytes only",
  "P01 tests; relates to G08 (differing Beads notes, identical typed input) in pi-04", "none", False,
  ["doc:pi-03#L24", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#G08"], ["C151"])

C(153, "L25 P01 Done", "PROPOSAL",
  "P01 exit criteria: the callback input deep-equals the admitted payload and hashes to the stored inputDigest; no note bytes leak. Embedded premise: an inputDigest field is already stored by the existing invocation record at the pin (symbol present in src/workbench/execute.ts, src/index.ts and reconcile/task modules).",
  "callback input deep-equals admitted payload and hashes to stored inputDigest; no leaking note bytes",
  "P01 acceptance; Pi at 0fb90672 for the stored-digest premise", "pi-0fb90672", True,
  ["pi:src/workbench/execute.ts", "pi:src/index.ts", "pi:src/workflow/task.ts", "pi:src/workflow/reconcile.ts"], ["C151", "C152"])

# ---------------------------------------------------------------- P02 (L27-L31)
C(154, "L28-L29 P02 Change", "PROPOSAL",
  "P02 change set: keep src/workbench/source-admission.ts's pure checks; add a new host lease/ownership adapter (and tests) under src/workbench/; make journal storage explicit; keep existing script helper behavior unless requalified. Embedded premise: source-admission.ts at the pin separates pure checks from host/lease state so the former can be retained unchanged.",
  "src/workbench/source-admission.ts (retain pure checks), new host lease/ownership adapter under src/workbench/ and tests; journal storage explicit",
  "P02; Pi at 0fb90672; overlaps live bead wb-2ukh (MNI P03 writer source admission) rather than wb-y0n6 (MNI P02)", "pi-0fb90672", True,
  ["pi:src/workbench/source-admission.ts", "beads:wb-2ukh", "beads:wb-y0n6"], ["C137"])

C(155, "L29 P02 Implement (implicit premise)", "OBSERVATION",
  "Implicit empirical premise presupposed by 'remove lease release from launch-return lifetime' and by pi-01 PI-I02: at 0fb90672 the writer lease (WriterLeases in source-admission.ts) is a process-local in-memory map released when the dispatch promise resolves, i.e. bound to the launch-return lifetime; a detached or asynchronous launch can therefore return before the writer terminates.",
  "remove lease release from launch-return lifetime for function workflows",
  "Pi at 0fb90672; script path uses the same helper", "pi-0fb90672", True,
  ["pi:src/workbench/source-admission.ts", "doc:pi-01-AUDIT-AND-INVARIANTS.md#L8", "doc:pi-README.md#L18"], [])

C(156, "L29 P02 Implement", "PROPOSAL",
  "P02 deliverable: the lease persists after launch return; cross-process same-machine exclusivity; stale-owner fencing; a recovery-held state; lease release removed from the launch-return lifetime for function workflows.",
  "lease persists after launch return, cross-process same-machine exclusivity, stale-owner fencing, recovery-held state",
  "P02; same-machine topology only (no distributed lease claimed)", "none", False, ["doc:pi-03#L29"], ["C155"])

C(157, "L30 P02 Red tests", "PROPOSAL",
  "P02 red-test specification: launch resolves while the writer sleeps and a second root alias is refused; distinct roots allowed; crash/restart leaves an uncertain lease; failed pre-dispatch safely releases; a stale generation cannot write; the lease is not freed by timeout alone.",
  "launch resolves while writer sleeps, second root alias refused; distinct roots allowed; crash/restart leaves uncertain lease; failed pre-dispatch safely releases; stale generation cannot write; lease is not freed by timeout only",
  "P02 tests; maps to G06/G07 in pi-04", "none", False, ["doc:pi-03#L30", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#G06-G07"], ["C156"])

C(158, "L31 P02 Done", "PROPOSAL",
  "P02 exit criteria: no duplicate concurrent writer on the supported host topology, and the exact persisted owner is observable. Scope premise: 'supported host topology' is not enumerated in this document (P09 asks to state untested topologies explicitly).",
  "no duplicate concurrent writer on supported host topology and exact persisted owner is observable",
  "P02 acceptance; topology quantifier unspecified here", "none", False, ["doc:pi-03#L31", "doc:pi-03#L71"], ["C156", "C157"])

# ---------------------------------------------------------------- P03 (L33-L37)
C(159, "L34 P03 Change", "OBSERVATION",
  "P03 change set names 'function-authority.ts adoption' and source-admission host composition while maintaining model-input/host separation. Embedded empirical premise: at 0fb90672 function-authority.ts contains an adoption mechanism (FunctionActionContract with exported default FUNCTION_ACTION_CONTRACT = {state:'unadopted', blockedOn:'MW-CONTRACT'}) and the rechecks in source-admission.ts/function-authority.ts exist but do not form one atomic policy across async waits (pi-01 PI-I04).",
  "function-authority.ts adoption and source-admission host composition; maintain model input/host separation",
  "Pi at 0fb90672; overlaps live bead wb-2ukh (MNI P03) and MNI D6/D9", "pi-0fb90672", True,
  ["pi:src/workbench/function-authority.ts#L133-L157", "pi:src/workbench/source-admission.ts", "doc:pi-01-AUDIT-AND-INVARIANTS.md#L10", "beads:wb-2ukh"], ["C145"])

C(160, "L35 P03 Implement", "PROPOSAL",
  "P03 deliverable: require exact workbench:execute + mechanical:develop-write grants, host-only effective principal/session, source Git HEAD/tree/clean state and Forge manifest, operator attestation and an authorized root; repeat the whole check after async install/wait and immediately at effect dispatch, bound to the active fence. Embedded premise: 'workbench:execute' is an existing Pi grant spelling (witnessed in execute-tool.ts/execute.ts/function-authority.ts).",
  "exact workbench:execute + mechanical:develop-write, host-only effective principal/session, source Git HEAD/tree/clean/Forge manifest, operator attestation and authorized root; repeat after async install/wait and immediately at effect dispatch, bound to active fence",
  "P03; depends on P02 fence; overlaps mw-03 H06 (recheck after async preparation immediately before effect)", "pi-0fb90672", True,
  ["pi:src/workbench/execute-tool.ts", "pi:src/workbench/function-authority.ts", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H06"], ["C145", "C156", "C159"])

C(161, "L36 P03 Red tests", "PROPOSAL",
  "P03 red-test specification: revoked action grant, changed principal, source changed during install, moved worktree symlink, changed manifest, wrong workspace/identity, extra action permission, user-provided fake grant, machine PID race.",
  "revoked action grant, changed principal, source changed during install, moved worktree symlink, changed manifest, wrong workspace/identity, extra action permission, user-provided fake grant, machine PID race",
  "P03 tests; maps to G10 in pi-04", "none", False, ["doc:pi-03#L36", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#G10"], ["C160"])

C(162, "L37 P03 Done", "PROPOSAL",
  "P03 exit criterion, universally quantified: the first effect cannot occur with ANY stale mutable authority axis (grant, principal/session, source HEAD/tree/clean, manifest, attestation, root, fence).",
  "first effect cannot occur with any stale mutable authority axis",
  "P03 acceptance; quantifier 'any' over the axes listed in L35", "none", False, ["doc:pi-03#L37"], ["C160", "C161"])

# ---------------------------------------------------------------- P04 (L39-L43)
C(163, "L39 P04 heading", "INFERENCE",
  "Dependency claim: P04 (reviewed installed host consumer) depends on Mechanical packets 'H01/H02'. Embedded label premise: under pi-05's numbering H01=host accepts validated mechanical.pi-host/v1 binding + immutable package/runtime manifest and H02=production four callbacks (a coherent dependency for P04's content); under mw-03's numbering H01=strict Forge certificate and H02=negative effect/recovery semantics, while the installed-runtime closure and descriptor/binding hardening that P04's content actually consumes are mw-03 H03/H04.",
  "Reviewed installed host consumer (P0; MW H01/H02)",
  "cross-corpus label resolution; MW at 69cb016d; overlaps live bead wb-y0n6 (MNI P02 installed descriptor/package admission)", "mw-69cb016d", True,
  ["doc:pi-03#L39", "doc:pi-05-OPERATIONS-AND-HANDOFF.md#L30-L31", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H01-H04", "beads:wb-y0n6"], ["C142"])

C(164, "L40 P04 Change", "OBSERVATION",
  "P04 change set presupposes a 'native loader seam' in Pi onto which a Mechanical host adapter and package dependencies can be added without private imports. Embedded premise: such a seam exists at 0fb90672 (src/workbench/native-modules.ts exports loadWorkbenchNative/isWorkbenchNativeLoaded/workbenchNative) and Pi currently has no import of @mechanical/development-rig/host anywhere in src.",
  "native loader seam/host adapter and package dependencies, no private imports",
  "Pi at 0fb90672", "pi-0fb90672", True,
  ["pi:src/workbench/native-modules.ts", "pi:package.json"], [])

C(165, "L41 P04 Implement", "PROPOSAL",
  "P04 deliverable: exact descriptor/installed-package/runtime-manifest checks; import @mechanical/development-rig/host only from the reviewed installed artifact; reject disallowed exports and a missing callback binding; do not construct a second Mechanical scheduler. Embedded premises: (a) './host' is an exported subpath of @mechanical/development-rig at 69cb016d (apps/development-rig/package.json exports './host' -> dist/host.js); (b) Mechanical owns a 'scheduler' that a Pi host could otherwise duplicate (the word has witnesses only in packages/coordination at the MW pin, not in apps/development-rig).",
  "import @mechanical/development-rig/host only from reviewed installed artifact; reject disallowed exports and missing callback binding; don't construct a second Mechanical scheduler",
  "P04; MW package surface at 69cb016d; overlaps mw-03 H03 (installed runtime closure) and H04 (binding validator), live bead wb-y0n6", "mw-69cb016d", True,
  ["mw:apps/development-rig/package.json#exports", "mw:apps/development-rig/src/host.ts", "mw:packages/coordination/src/elastic-landing.ts", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H03-H04", "beads:wb-y0n6"], ["C163", "C164"])

C(166, "L42-L43 P04 Red tests + Done", "PROPOSAL",
  "P04 red tests (corrupt descriptor/tarball, alternate export, installed JS mutation, path/symlink escapes, unexpected function, missing SDK, incompatible Node version) and exit criteria: an independently packed fixture and negative controls pass V2, and the actual MW producer host runs exactly four callbacks. Embedded premises: V2 is defined in pi-04 (independent npm-packed host installed in a fresh consumer; no Pi claimed); the 'four callbacks' are Mechanical's HOST_SERVICE_NAMES discover/compileContext/implement/verify (host-services.ts at 69cb016d).",
  "independently packed fixture and negative controls pass V2; actual MW producer host runs exact four callbacks",
  "P04 acceptance; V2 tier; maps to G09 in pi-04", "mw-69cb016d", True,
  ["doc:pi-04-ADVERSARIAL-VERIFICATION.md#L7", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#G09", "mw:apps/development-rig/src/host-services.ts#L26-L40"], ["C165"])

# ---------------------------------------------------------------- P05 (L45-L49)
C(167, "L46 P05 Change", "OBSERVATION",
  "P05 change set presupposes that workflow_execute is registered in src/index.ts and implemented in src/workbench/execute-tool.ts, with function logic to be isolated from the script launcher. Embedded premise (baseline): at 0fb90672 execute-tool.ts registers one executable tool whose non-script branch returns unsupported-definition-kind, and src/index.ts carries the workflow_execute registration (tool name present at index.ts L2618/L3006).",
  "src/workbench/execute-tool.ts; src/index.ts registration; logic isolated from script launcher",
  "Pi at 0fb90672; overlaps live bead wb-4bxo (MWI-dispatch through the registered Pi tool) and MNI P04", "pi-0fb90672", True,
  ["pi:src/workbench/execute-tool.ts", "pi:src/index.ts#L2618", "pi:src/index.ts#L3006", "beads:wb-4bxo"], ["C147"])

C(168, "L47 P05 Implement", "PROPOSAL",
  "P05 deliverable: one allowlisted function branch with A0-A6 admission (pi-02 stages: resolve, create, admit, resolve, acquire, verify, journal), resource reservation and durable launch; a precise launch reply that never reports false completion; the script, detached provider-grant and standalone subagent paths preserved; no shell/script alias. Embedded premise: those three existing paths are distinct code paths in execute-tool.ts/hosts at the pin.",
  "one allowlisted function branch with A0–A6 admission, resource reservation and durable launch; precise launch reply (never false completion); preserve script, detached provider grant and standalone subagent paths. No shell/script alias.",
  "P05; depends on P01-P04", "pi-0fb90672", True,
  ["doc:pi-02-PROTOCOL-AND-RUNTIME.md#L16-L22", "pi:src/workbench/execute-tool.ts", "pi:src/workbench/hosts/local-detached.ts", "pi:src/workbench/hosts/furnace-hosted.ts"], ["C139", "C167"])

C(169, "L48-L49 P05 Red tests + Done", "PROPOSAL",
  "P05 red tests and exit: invoking the actual registered Pi tool reaches the Mechanical function callback exactly once; absent grant yields zero callbacks; the function refuses if not reviewed; the first successful launch returns invocation+native refs while the worker continues; V3 is recorded through Pi registration, not a direct host-helper call.",
  "invoke the actual registered Pi tool, assert Mechanical function callback reached exactly once; absent grant -> zero callbacks; function refuses if not reviewed; first successful launch returns invocation+native refs while worker continues",
  "P05 acceptance; V3 tier (pi-04 L8)", "none", False, ["doc:pi-03#L48-L49", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#L8"], ["C168"])

# ---------------------------------------------------------------- P06 (L51-L55)
C(170, "L52 P06 Change", "OBSERVATION",
  "P06 change set presupposes existing Pi surfaces src/workbench/observation.ts and a registered workflow_observe tool, to be extended with a native adapter and a scoped event journal. Embedded premise: both surfaces exist at 0fb90672 (observation.ts present; workflow_observe named in src/index.ts L2640/L2933).",
  "src/workbench/observation.ts and native adapter; workflow_observe tool, scoped event journal",
  "Pi at 0fb90672; overlaps live bead wb-9a1o (MWI-outcomes) and MNI P05", "pi-0fb90672", True,
  ["pi:src/workbench/observation.ts", "pi:src/index.ts#L2640", "pi:src/index.ts#L2933", "beads:wb-9a1o"], [])

C(171, "L53 P06 Implement", "PROPOSAL",
  "P06 deliverable: native refs correlated with the Pi invocation; typed stages and the raw Mechanical four domain results; strict/weak/unknown gate assurance; bounds/drop/freshness semantics; no results invented when the provider is missing. Embedded vocabulary premise: 'four domain results' and 'strict/weak' gate assurance correspond to Mechanical's outcome statuses (verified_candidate, verification_failed, needs_evidence, indeterminate) and its strict-vs-legacy-weak certificate distinction at 69cb016d; 'unknown' is a Pi-side addition.",
  "native refs + Pi invocation correlation; typed stages and raw Mechanical four domain results; strict/weak/unknown gate assurance; bounds/drop/freshness semantics. No results invented when provider missing.",
  "P06; vocabulary judged at MW 69cb016d", "mw-69cb016d", True,
  ["mw:apps/development-rig/src/live-gate.ts", "mw:apps/development-rig/src/live-development.ts", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H01"], ["C170"])

C(172, "L54-L55 P06 Red tests + Done", "PROPOSAL",
  "P06 red tests (out-of-order/gap, duplicate native event, collapsed verification_failed vs indeterminate, blank native id, wrong scope, truncation, failed progress observer, native record unavailable) and exit: a user can inspect status, evidence origin and uncertainty without Mechanical private API access. Embedded premise: verification_failed and indeterminate are distinct Mechanical outcome statuses that a bridge could wrongly collapse.",
  "out-of-order/gap, duplicate native event, collapsed verification_failed vs indeterminate, blank native id, wrong scope, truncation, failed progress observer, native record unavailable",
  "P06 acceptance; MW statuses at 69cb016d", "mw-69cb016d", True,
  ["doc:pi-03#L54-L55", "mw:apps/development-rig/src/live-development.ts"], ["C171"])

# ---------------------------------------------------------------- P07 (L57-L61)
C(173, "L58 P07 Change", "OBSERVATION",
  "P07 change set presupposes existing workflow_control and workflow_reconcile adapters in Pi, a host journal and lease state (from P02), and a Mechanical 'effect-intent lookup' to integrate. Embedded premises: at 0fb90672 the tools exist (control-tool.ts; reconcile-tool.ts registers name 'workflow_reconcile'); at 69cb016d Mechanical exports an effect-intent store/reader (effect-intent.ts: openEffectIntent, attachEffectRefs, settleEffectIntent, readEffectIntent, fileEffectIntentStore; effect-reconciliation.ts: reconcileUncertainEffect, describeLostAcknowledgement).",
  "workflow_control/workflow_reconcile adapters, host journal and lease state; integrate Mechanical effect-intent lookup",
  "Pi at 0fb90672 and MW at 69cb016d; overlaps live beads wb-mwsy (MWI-effects) and wb-5a7k (MWI-controls), MNI P06, mw-03 H02/H07", "pi-0fb90672", True,
  ["pi:src/workbench/control-tool.ts", "pi:src/workbench/reconcile-tool.ts#L62", "mw:apps/development-rig/src/effect-intent.ts", "mw:apps/development-rig/src/effect-reconciliation.ts", "beads:wb-mwsy", "beads:wb-5a7k"], ["C154", "C156"])

C(174, "L59-L61 P07 Implement/Red/Done", "PROPOSAL",
  "P07 deliverable and exit: append-only idempotent event ids; pre- vs post-dispatch cancellation distinguished; native lookup with no blind retry; reattach the same invocation to still-running native producers; an operator action for unknown outcomes; red tests across kill windows (after intent before SDK, after first edit, after commit, before/after gate dispatch), lost ack, double stop, late events, corrupted journal, start/recovery race; done when no unknown effect is replayed merely because Pi restarted and the writer lease stays fenced until justified.",
  "no unknown effect is replayed just because Pi restarted, and writer lease stays fenced until justified",
  "P07 acceptance; maps to G04/G05/G11 in pi-04; depends on P02/P05/P06", "none", False,
  ["doc:pi-03#L59-L61", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#G04-G05", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#G11"], ["C141", "C173"])

# ---------------------------------------------------------------- P08 (L63-L66)
C(175, "L63-L66 P08", "PROPOSAL",
  "P08 (genuine native acceptance): an integration harness using installed packages and native services with opt-in credentials and exact environment proof runs actual Pi tool -> Mechanical host -> Claude session edit/commit -> strict matching Forge full gate -> Pi observation of source/digest/native ids, covering verified_candidate, verification_failed, needs_evidence and indeterminate on deterministic fixtures with the real verified case using native evidence only; exit is an independently inspectable V4 receipt with exact SHAs and commands and no simulated PASS. Dependency premise: requires P05-P07 and 'Mechanical host native closure' (mw-03 H05/H06/H07 content). Vocabulary premise: the four statuses exist at 69cb016d.",
  "actual Pi tool → Mechanical host → Claude session edit/commit → strict matching Forge full gate → Pi observation of source/digest/native ids",
  "P08; V4 tier; joint Pi/MW; overlaps live bead wb-p3i2 (git-census host in isolated Pi-owned invocation), MNI P07, mw-03 H08", "mw-69cb016d", True,
  ["doc:pi-03#L63-L66", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#L9", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H08", "mw:apps/development-rig/src/live-development.ts", "beads:wb-p3i2"], ["C142", "C169", "C171", "C174"])

# ---------------------------------------------------------------- P09 (L68-L71)
C(176, "L68-L71 P09", "PROPOSAL",
  "P09 (fault, restart, load and falsification tail): tests for G01-G12 and Pi-specific P-cases, a process-kill harness and soak instrumentation; runs negative controls, red mutants, cross-PID writer exclusion, stale fence rejection, event ordering, resource caps and 1/4/16 concurrent invocations; measures cold vs warm load, memory, process count and failure recovery; exit is V5 receipts with no duplicate side effect under all tested failure windows, with untested host topologies stated explicitly. Embedded premise: G01-G12 are the twelve falsification cases defined in pi-04's table.",
  "V5 receipts and no duplicate side effect under all tested failure windows. State untested host topologies explicitly.",
  "P09; V5 tier; quantifier limited to tested windows; overlaps live beads wb-xr1z (in_progress) and wb-9bof", "none", True,
  ["doc:pi-03#L68-L71", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#L16-L27", "doc:pi-04-ADVERSARIAL-VERIFICATION.md#L10", "beads:wb-xr1z", "beads:wb-9bof"], ["C143", "C175"])

# ---------------------------------------------------------------- P10 (L73-L75)
C(177, "L73-L75 P10", "PROPOSAL",
  "P10 (release and docs/skills/operator completion) changes docs/workbench/feature-matrix.md W11, docs/workbench/*, README, AGENTS.md, .agents/skills/pi-mechanical-interop/SKILL.md and adds sample invocation/observe/control transcripts; exit: shipped/unshipped rows match actual evidence, user-visible statuses are truthful, exact first-release limitations recorded, older receipts preserved as history. Embedded premise: each named doc path and the W11 row exist at 0fb90672 (W11 row records 'planned', beads wb-04s/wb-w12 blocked, 'No binding host exists').",
  "docs/workbench/feature-matrix.md W11, docs/workbench/*, README, AGENTS.md, .agents/skills/pi-mechanical-interop/SKILL.md, sample invocation/observe/control transcripts",
  "P10; Pi at 0fb90672; overlaps live bead wb-yiu4 (MNI P10 W11 truth) and PI-I08", "pi-0fb90672", True,
  ["pi:docs/workbench/feature-matrix.md#L108-L112", "pi:README.md", "pi:AGENTS.md", "pi:.agents/skills/pi-mechanical-interop/SKILL.md", "doc:pi-01-AUDIT-AND-INVARIANTS.md#L14", "beads:wb-yiu4"], ["C176"])

# ---------------------------------------------------------------- P11 / P12 (L77-L81)
C(178, "L77-L78 P11", "PROPOSAL",
  "P11 (optional, P2, only after P10): first-class detached host binding, independent resource and auth proof, and a durable Furnace Run/Attempt when explicitly configured; no implicit Furnace dependency and no shared fake invocation identity.",
  "Only after P10: first-class detached host binding, independent resource and auth proof, durable Furnace Run/Attempt when explicitly configured. No implicit Furnace dependency or shared fake invocation identity.",
  "P11 optional; overlaps MNI P11 (beads wb-zswl/wb-dlc6 per MANIFEST) and pi-README 'Preserve independent Forge and Furnace'", "none", False,
  ["doc:pi-03#L77-L78", "pi:src/workbench/hosts/furnace-hosted.ts", "pi:src/workbench/hosts/local-detached.ts"], ["C143"])

C(179, "L80-L81 P12", "NORMATIVE",
  "P12 (optional, P2): additional pure function families and HX/RF profiles require independent HX task-scope and committed RF witnesses; review/repair functions and pure coordination operations receive separate reviewed IDs, effect classes and grants and never inherit development-write automatically.",
  "Review/repair functions and pure coordination operations receive separate reviewed IDs, effect classes and grants; never inherit development-write automatically.",
  "P12 optional; overlaps MNI P12 (beads wb-pxvv/wb-669r per MANIFEST), mw-03 H12", "none", False,
  ["doc:pi-03#L80-L81", "doc:mw-03-IMPLEMENTATION-PACKETS.md#H12"], ["C143", "C145"])

# ---------------------------------------------------------------- closure receipt schema (L83-L84)
C(180, "L83-L84 Packet closure receipt schema", "NORMATIVE",
  "Every packet closure receipt records: packet label, real bead id if any, repo + full commit + parent, source paths/diffs, test/mutant fixtures, command/exit/duration, Forge gate request/operation, native producer refs, SHA-256 of installed artifacts and relevant source, outstanding uncertainties, before/after capability matrix and docs/skills changes; planned evidence is never marked as a pass.",
  "Record: packet label, real bead id if any, repo + full commit + parent, source paths/diffs, test/mutant fixtures, command/exit/duration, Forge gate request/operation, native producer refs, SHA-256 of installed artifacts and relevant source, outstanding uncertainties, before/after capability matrix, docs/skills changes. Do not mark planned evidence as a pass.",
  "all packets; receipt custody rule", "none", False, ["doc:pi-03#L83-L84"], ["C136", "C137"])

# ---------------------------------------------------------------- validate
errors = []
ids = [c["id"] for c in claims]
if len(ids) != len(set(ids)):
    errors.append("duplicate ids")
for c in claims:
    n = int(c["id"][1:])
    if not (ID_LO <= n <= ID_HI):
        errors.append(f"{c['id']} out of range")
    if c["kind"] not in KINDS:
        errors.append(f"{c['id']} bad kind {c['kind']}")
    if c["timeContext"] not in TIMES:
        errors.append(f"{c['id']} bad timeContext {c['timeContext']}")
    if c["strongestWording"] not in doc:
        errors.append(f"{c['id']} strongestWording not verbatim in doc: {c['strongestWording'][:60]!r}")
    if not isinstance(c["material"], bool):
        errors.append(f"{c['id']} material not bool")
    for d in c["deps"]:
        if d not in ids:
            errors.append(f"{c['id']} dep {d} not in this file")
    for k in ("id","doc","loc","kind","text","strongestWording","scope","timeContext","material","citedPaths","deps"):
        if k not in c:
            errors.append(f"{c['id']} missing {k}")
expected = list(range(ID_LO, ID_HI + 1))
got = sorted(int(i[1:]) for i in ids)
if got != expected:
    errors.append(f"id set is not exactly C{ID_LO}..C{ID_HI}: missing {sorted(set(expected)-set(got))}, extra {sorted(set(got)-set(expected))}")
if errors:
    print("\n".join(errors)); sys.exit(1)

with open(OUT, "w", encoding="utf-8") as f:
    for c in claims:
        f.write(json.dumps(c, ensure_ascii=False) + "\n")
mat = [c["id"] for c in claims if c["material"]]
print(json.dumps({"file": OUT, "count": len(claims), "materialCount": len(mat), "materialIds": mat}, ensure_ascii=False))
