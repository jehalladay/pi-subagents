import json, sys
OUT = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/epistemic-triage/.work/lens-contradict.jsonl"
L = "contradict"
rows = []
def add(claimIds, relation, evidence, detectionModel, proposedStatus, drift, note, severity):
    rows.append({"lens": L, "claimIds": claimIds, "relation": relation, "evidence": evidence,
                 "detectionModel": detectionModel, "proposedStatus": proposedStatus, "drift": drift,
                 "note": note, "severity": severity})

# F01 first-release host mode
add(["C026","C029","C230","C089"], "CONFLICTS_WITH",
    "pi-README.md L24: 'First supported vertical: ... attached or explicitly admitted same-machine execution' | pi-02 L5: 'hostMode:\"embedded\" for first cut' | pi-05 L41: 'First: embedded same-machine Pi host ... Later: attached/detached variants' | pi-03 L77-78: 'P11 — Optional detached function ... (P2) Only after P10' | pin pi-0fb90672 src/workbench/execute.ts:19 EXECUTE_HOST_MODES = [\"embedded\", \"detached\"]; execute-tool.ts:179 'in this Pi session (hostMode embedded) or on the same-machine detached host (hostMode detached)'; grep -rnw attached src/ finds no host-mode use.",
    "Textual comparison of the three release-boundary sentences; grep of the Pi pin for the token 'attached' and for the hostMode allowlist (surface: src/**/*.ts).",
    "C029 UNSUPPORTED (no 'attached' placement exists at the pin; 'explicitly admitted same-machine' maps to detached, which pi-03/pi-05 defer); C026/C230/C089 NON-EPISTEMIC but mutually inconsistent",
    "scope inflation of the release boundary (README admits placements that 02/03/05 defer to P11) + vocabulary with no code witness ('attached')",
    "The README release definition and the 05 'Supported first release' section contradict each other on whether attached/detached placements are in the first release. Remediation NARROW_SCOPE on README L24 to 'embedded (same-machine Pi session) execution' or SURFACE_DISAGREEMENT; define 'attached' or drop it.", "high")

# F02 three H-numberings
add(["C221","C227","C142","C163"], "CONFLICTS_WITH",
    "pi-05 L30-34: 'H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding ...; H02: production four callbacks ...; H03: strict verification evidence ...; H04: effect-intent and reconciliation ...; H05: shared tests, installed host V2, registered Pi tool V3 ...' | mw-README L26: 'H01 strict native Forge eligibility ...; H02 durable effect and non-occurrence law; H03 compose trusted host binding and exact service callbacks; H04 pin executable runtime closure; H05 process cancellation/journal/producer identity; H06 real joint Pi handoff; H07–H09 adversarial, load, docs/skill release tail' | mw-03 L22 '### H01 — Native Forge certificate', L28 '### H02 — Durable effect and non-occurrence semantics', L34 '### H03 — Verified installed executable and provider closure', L40 '### H04 — Descriptor and closed binding validator', L45 '### H05 — Compose native four services', L51 '### H06 — Authorized composed application host', L57 '### H07 — First-class producer progress/recovery', L63 '### H08 — Registered Pi joint native acceptance', L68 H09, L72 H10, L76 H11, L81 H12 | mw-05 L24-32 dependency table uses the mw-03 numbering (H00..H08).",
    "Token census of H-labels per document (grep -oE '\\bH[0-9]{2}\\b' per file) and side-by-side reading of each label's gloss in pi-05, mw-README, mw-03, mw-05.",
    "C221 ESTABLISHED (three incompatible numberings are observed); C142/C163 UNSUPPORTED as written (the referent of 'MW H01/H02' is undecidable)",
    "label drift: the same token H0n names three different work items across pi-05, mw-README and mw-03/mw-05 (mw-README is shifted by one from mw-03 from H03 onward and lacks mw-03's H04)",
    "Confirms the MNI lesson 'conflicting Pi-vs-MW DAGs'. Even inside the MW program the README's priority list and the 03 packet list disagree (README H06 'real joint Pi handoff' is mw-03 H08). Remediation: one shared label table (ADD_MISSING_PREMISE) and rewrite pi-03/pi-05 cross-references to it.", "high")

# F03 cross-repo DAG conflict for P04/P08
add(["C142","C163","C139","C141","C174"], "CONFLICTS_WITH",
    "pi-03 L39: '### P04 — Reviewed installed host consumer (P0; MW H01/H02)' and L11: 'Mechanical H01/H02/H03 host, native proof, services ----> P08 joined native journey' | mw-05 L27: '| H03 exact executable manifest | Pi P04 installed host |', L28: '| H04 closed binding and allowedEffects | Pi P03/P04 composed admission |', L30: '| H06 composed host entrypoint | Pi P04/P05 authority transitivity |' | mw-03 L63: '### H08 — Registered Pi joint native acceptance (P0; H05–H07 + Pi P05–P07)' and L11 'H05 + H06 + H07 + Pi registered dispatcher ----> H08' | pi-03 L58 P07: 'integrate Mechanical effect-intent lookup' while the pi-03 graph lists no effect-intent handoff (pi-05 H04) among P08's Mechanical prerequisites.",
    "Reconstructed both dependency graphs as edge lists from pi-03 L5-14 + pi-05 L29-34 and mw-03 L5-14 + mw-05 L21-32; compared the Mechanical prerequisites each side assigns to Pi P04 and to the joined journey (Pi P08 / MW H08).",
    "C142/C163 UNSUPPORTED (prerequisite sets conflict across repos and the labels are ambiguous); C139/C141 NON-EPISTEMIC",
    "DAG conflict: Pi says P04 needs 'MW H01/H02' (under pi-05 numbering: binding + callbacks; under mw-03 numbering: Forge certificate + effect law); MW says P04 needs H03/H04/H06 (manifest, binding, composed entrypoint). MW requires its recovery protocol (H07, built on H02) before the joined journey; Pi's graph omits the effect-intent handoff from P08's Mechanical prerequisites although P07 depends on it.",
    "Both repos cannot schedule against each other's graph. Remediation: SURFACE_DISAGREEMENT then one ratified joint DAG in P00/H00.", "high")

# F04 D6 ownership
add(["C031","C032","C033"], "CONFLICTS_WITH",
    "pi-README L27: 'Pi owns: ... P0 composed authority/routing (D6/D9) ... D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus.' (D6 is listed as Pi-owned, not shared) | pi-01 L9: 'PI-I03 / D6 | ... Registered tool supports script only; function authority, descriptor/source guards and Mechanical host are not transitively wired. | Pi P04/P05' | mw-01 L22: '**MW-I04 / D6 — P0 host composition:** invokeDevelopmentHost accepts artifacts+services but not mechanical.pi-host/v1 binding, effective grants, source authority or active lease. ... Add reviewed composed invocation entrypoint' (Mechanical-owned P0 with a Mechanical fix).",
    "Cross-tabulated every D-number against its owner and severity in pi-README L27, pi-01 table, mw-01 ledger (grep -oE '\\bD[0-9]+\\b' per file).",
    "C031 NON-EPISTEMIC but the embedded factual premise 'D6 is Pi-owned and not shared' is CONTESTED between the two ledgers",
    "ownership drift: the same defect number carries a Pi-side fix (wire the registered tool) and a Mechanical-side fix (new composed entrypoint); README's shared list omits D6",
    "Remediation SURFACE_DISAGREEMENT: list D6 as shared (Pi P04/P05 + MW H06) in README L27. Related label drift: README calls D7 'strict Forge proof' while mw-01 L20 defines D7 as 'effect-intent settlement'.", "medium")

# F05 'as described in this corpus'
add(["C032"], "CONTRADICTS",
    "pi-README L27: 'D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus.' and 'Mechanical owns: P0 strict Forge proof (D1/D7), P0 negative-effect semantics (D2), packed executable closure (D4)' | pi-README L9-14 'Read in order' enumerates only 01..05 | pi-01..pi-05 contain the tokens D3, D5, D6, D9 only (pi-01 L7-10); D1, D2, D4, D7, D8, D10, D11, D12 occur nowhere in pi-01..pi-05 | mw-01 L19-27 is the only place describing D1, D7, D2, D6, D4, D8, D10, D11, D12.",
    "Absence claim with stated surface: grep -oE '\\bD[0-9]{1,2}\\b' over docs/pi-*.md and docs/mw-*.md; counted per file.",
    "UNSUPPORTED under the README's own definition of the corpus (01..05); SUPPORTED only if 'this corpus' is read to include the companion Mechanical program's 01 document",
    "scope/provenance: the README delegates eight defect descriptions to a document outside its reading order without naming it",
    "Remediation ADD_SOURCE/NARROW_SCOPE: replace 'as described in this corpus' with 'as described in the companion Mechanical program, 01-AUDIT-AND-PROOF.md (MW-I01..MW-I12)'. Note mw-01 marks none of D8/D10/D11/D12 as shared (all Mechanical P1/P2).", "medium")

# F06 reply illustration vs tool-reply/v1
add(["C225","C126","C071","C085"], "CONFLICTS_WITH",
    "pi-02 L39: 'workflow_execute reply remains tool-reply/v1 with invoked/launch-only semantics.' | pi-01 L39: 'Maintain the Pi model-facing tool-reply/v1 envelope and the explicit \"completion:not-asserted\" launch semantics.' | pi-05 L10-19 illustration: {\"tool\":\"workflow_execute\",\"status\":\"launched\",\"completion\":\"not-asserted\",\"invocationId\":\"<host-minted>\",\"nativeRefs\":[],\"next\":\"workflow_observe on the same scoped invocation\"} | pin pi-0fb90672 src/workbench/execute.ts:14 EXECUTE_CONTRACT_VERSION = \"workbench.execute/v1\"; execute.ts:65-79 WorkflowExecuteReply members: contractVersion, status, completion, invocationId?, definition?, hostMode?, nativeRefs, policy?, reason?, refusal?, truncated, truncation? (no 'tool', no 'next'; contractVersion and truncated are required); src/index.ts:2783 replies reach the model 'folded into workbench.tool-reply/v1'.",
    "Compared the member set of the pi-05 JSON against the pinned WorkflowExecuteReply interface and the tool-reply/v1 folding comments at the pin.",
    "C225 NON-EPISTEMIC (illustration) but inconsistent with C126/C071; the implicit premise that the shown shape is the maintained envelope: UNSUPPORTED",
    "shape drift: two foreign members added, two required members dropped, contract string absent",
    "pi-05 labels it 'proposal, not executed output', yet pi-02/pi-01 promise the envelope 'remains' unchanged. Remediation: either mark the illustration as prose-only or restate it in the pinned shape (contractVersion, status, completion, invocationId, hostMode, nativeRefs, truncated).", "medium")

# F07 P03 Done universal vs atomicity caveat
add(["C162","C113","C114","C103"], "CONTRADICTS",
    "pi-03 L37: '**Done:** first effect cannot occur with any stale mutable authority axis.' | pi-02 L24: 'Git, permission store, lease store, runtime import and external SDK are not one ACID transaction. Use explicit fencing + final-boundary revalidation + durable intent; document the remaining window and have the provider reject a stale fence where possible. Never describe independent helper calls as globally atomic.' | mw-02 L19: 'Do not claim these steps form a single ACID transaction. Explicitly document the remaining asynchronous dispatch window and enforce fences at provider write entry.'",
    "Read the P03 exit criterion against the two atomicity caveats; checked that no bounding clause (window, topology, tested cases) qualifies the universal 'any stale axis'.",
    "C162 NON-EPISTEMIC but over-claims relative to C113/C114; as an acceptance predicate it is unfalsifiable as written -> DOWNGRADE_MODALITY/NARROW_SCOPE",
    "quantifier strengthening: a residual non-atomic window is conceded in 02 and then excluded by 'cannot ... any' in 03",
    "Rewrite P03 Done as 'no first effect occurs with a stale axis in the enumerated red tests (L36); the residual window is documented and the provider rejects a stale fence'. Same shape risk for P02 Done L31 'no duplicate concurrent writer on supported host topology' (bounded, acceptable) versus pi-04 L57 veto (unbounded).", "medium")

# F08 assurance/effect vocabulary
add(["C125","C135","C171"], "CONFLICTS_WITH",
    "pi-02 L36: 'Add observed assurance: strict-native, legacy-weak, unknown; effect: no-effect, dispatched-uncertain, occurred, settled.' and L48: 'ABI handshake: ... evidence profile, runtime manifest, disposition ... Both test the same versioned fixture vectors. Old v1 descriptors ... remain descriptor-only or legacy-weak' | pi-03 L53: 'strict/weak/unknown gate assurance' | mw-01 L35: 'Native assurance: descriptor / legacy-observed / candidate-bound-native / strict-native' and L36: 'Effects: no-dispatch, dispatched-uncertain, occurred, settled' | mw-02 L54: 'assurance legacy-observed' and L58: 'Model states: intended -> dispatch-possible -> observed-native-effects -> settled / uncertain'.",
    "grep -noE over both doc sets for the assurance and effect tokens; tabulated the value sets per document.",
    "NON-EPISTEMIC (proposals) with SURFACE_DISAGREEMENT required before any 'same versioned fixture vectors' claim can be met",
    "vocabulary drift inside a contract the docs call jointly versioned: 3-valued vs 4-valued assurance (Pi lacks descriptor and candidate-bound-native, MW lacks unknown; legacy-weak vs legacy-observed), no-effect vs no-dispatch, and a third MW state set for the same effect axis",
    "pi-02 L48 requires both repos to 'test the same versioned fixture vectors' while the enumerations differ; P00/H00 must ratify one spelling per axis.", "medium")

# F09 refusal vocab
add(["C130","C224"], "CONFLICTS_WITH",
    "pi-02 L43: 'Reject with stable categories: definition-unreviewed; descriptor-mismatch; artifact-mismatch; installed-content-mismatch; runtime-unavailable; permission-unknown; grant-revoked; principal-changed; source-changed; workspace-dirty; writer-held; capacity-exhausted; intent-persist-failed; dispatch-outcome-unknown; post-dispatch-aborted; native-gate-unestablished; recovery-not-authorized.' | pi-05 L7: 'Provide reason-specific action help for SOURCE_CHANGED, GRANT_REVOKED, WRITER_HELD, NATIVE_EVIDENCE_MISSING and UNCERTAIN_EFFECT.' | mw-02 L71: 'HOST_BINDING_INVALID, HOST_SOURCE_CHANGED, HOST_WRITE_GRANT_REVOKED, HOST_LEASE_STALE, HOST_RUNTIME_CONTENT_MISMATCH, HOST_PROVIDER_UNAVAILABLE, HOST_INTENT_NOT_DURABLE, HOST_NATIVE_PROOF_INCOMPLETE, HOST_EFFECT_UNKNOWN'.",
    "Extracted every reason/refusal identifier from pi-02, pi-05 and mw-02 and matched them pairwise by meaning and spelling.",
    "NON-EPISTEMIC; internal Pi inconsistency (two spellings, two of five pi-05 codes without a pi-02 category: NATIVE_EVIDENCE_MISSING, UNCERTAIN_EFFECT)",
    "vocabulary drift within the Pi program (kebab-case categories vs SCREAMING_CASE reason codes) and across the ABI boundary (HOST_* codes)",
    "Low severity on its own; becomes material because pi-02 L48 lists 'result semantics' and 'disposition' as handshake items. Remediation: one refusal table with the MW HOST_* mapping column.", "low")

# F10 tier ladders
add(["C182","C183","C184","C185","C186","C067","C210"], "CONFLICTS_WITH",
    "pi-04 L5-11: 'V0 ... V1 ... V2: actual independent npm-packed Mechanical host installed in fresh consumer ... V3: actual registered workflow_execute(function) with deterministic four callbacks ... no native provider claim. V4: same registered route and installed real Claude SDK + native Forge full gate ... V5 ... V6' | mw-04 L5: 'L0 source ...; L1 deterministic ...; L2 independent npm-packed ...; L3 live Claude/Git/Forge proof from standalone producer; L4 SAME native journey actually invoked via Pi registered workflow_execute(kind=function) ...; L5 ...; L6' | pi-01 L26: 'Existing direct Mechanical L2, older native L3 and Pi script tests remain separate; only an actual registered Pi invocation proves V3/V4.' | pi-04 L61 veto: 'missing L4/L5 but marked shipped' | pi-05 L34: 'H05: shared tests, installed host V2, registered Pi tool V3, native V4, recovery V5' | mw-04 L74 veto: 'The registered Pi path is never exercised; fixture-only success is labeled L4.' | mw-01 L19 uses 'STRICT V1 promotion' as a version token.",
    "Token census of V/L tiers per document; aligned tier definitions by content (V2~L2, V4~L4, V5~L5; V3 and L3 have no counterpart on the other side).",
    "NON-EPISTEMIC/DEFINITION; mapping between ladders is an unstated premise (ADD_MISSING_PREMISE)",
    "two unreconciled evidence ladders; Pi mixes both (I10, veto list) and asks Mechanical (pi-05 H05) for Pi-ladder tiers; Pi V3 (registered route with deterministic callbacks) risks being read as MW L4 'fixture-only success'",
    "Not a defect in any single sentence, but a joint receipt citing 'L4' or 'V3' is ambiguous without a mapping table in P00/H00.", "low")

# F11 basis from caller vs I2
add(["C059","C090","C098","C152","C091"], "CONFLICTS_WITH",
    "pi-01 L18 (I2): 'Principal, session, permissions, authorized roots, lease token, source basis, chosen evidence/context profiles and effect budget come from trusted host state, not tool JSON, Beads notes or annotations.' | pi-02 L5: 'input {task, workspaceId, baseRevision} only if those inputs are host-constrained to authorized values ... The host may expose a narrower task-only request and inject workspace/basis.' | pi-02 L11: 'Bind workspaceId and baseRevision to host-measured workspace; refuse inconsistent caller values rather than overriding silently.' | pi-02 L12: 'Compute and retain inputDigest from exact canonical admitted payload; make that payload immutable and dispatch it.' | pi-03 L24: 'typed source/basis changes DO affect identity' | pin mw-69cb016d packages/development/src/contracts.ts:14-18 DevelopmentRequest = {task, workspaceId, baseRevision}.",
    "Traced where workspaceId/baseRevision originate in each sentence (caller JSON vs host measurement) and whether they enter the digested/dispatched payload; checked the producer request shape at the MW pin.",
    "NON-EPISTEMIC; design fork left open (refuse-inconsistent vs inject) and I2's 'not tool JSON' is violated by the caller-supplied-then-validated basis path -> SPLIT_CLAIM",
    "modality/scope: I2 states an absolute source-of-truth rule; 02 §1-2 lets the basis bytes originate in the model request (validated), which also makes them part of the input identity",
    "Pick one: (a) host injects workspace/basis into the canonical payload and the model request is task-only (I2 holds, digest excludes caller basis), or (b) caller supplies them and I2 is narrowed to 'authority over basis comes from host measurement; caller values are compared, never trusted'.", "medium")

# F12 legacy export vs 'no route to an effect'
add(["C165","C214","C133","C134"], "CONFLICTS_WITH",
    "mw-03 L53: 'Old invokeDevelopmentHost may remain as low-level legacy fixture API, not secure invocation claim.' and L55: '**Done:** no route to an effect without complete trust composition, yet no Pi imports in Mechanical core.' | mw-01 L22: 'Keep legacy pure installed fixture API as descriptor-only/low-trust where needed.' | mw-02 L5: 'Retain the shipped @mechanical/development-rig/host stable subpath and the existing pure develop() API.' | pin mw-69cb016d apps/development-rig/src/host.ts:32-43,52 invokeDevelopmentHost(options{artifactPath, artifactDigest, descriptorBytes, descriptorDigest, services}, input) runs develop() with caller-injected services and takes no binding, grant, source or lease | pi-03 L41: 'import @mechanical/development-rig/host only from reviewed installed artifact; reject disallowed exports' | pi-02 L47: 'Pi consumes only @mechanical/development-rig/host and exact pinned tarballs'.",
    "Read the H06 exit criterion against the retained legacy export and the pinned signature of invokeDevelopmentHost; checked whether any text scopes 'route' to the composed call.",
    "The universal 'no route to an effect without complete trust composition' is UNSUPPORTED while the legacy export stays on the same shipped subpath; SUPPORTED only if scoped to 'through the Pi-facing composed call' (NARROW_SCOPE)",
    "quantifier: an exported, effect-capable legacy entry contradicts an unqualified 'no route'",
    "Pi's safety then rests on pi-03 P04 'reject disallowed exports' (Pi-side allowlist of export names), which the MW Done criterion should name instead of claiming closure on its own.", "medium")

# F13 lease ownership both sides
add(["C062","C066","C031","C116","C121"], "CONFLICTS_WITH",
    "pi-README L27: 'Pi owns: ... P0 invocation-scoped writer ownership (D5)' | mw-05 L11: 'Pi owns registered tools, global permissions, invocation lifetime, lease authority, observation scope, UI/TUI and scheduling.' | mw-02 L7: 'Trusted host context carries ... active lease/fencing token' | mw-02 L59: 'The main write precondition checks *current* approved root/source/grants/fence, and holds exclusive ownership until native terminal proof.' | mw-04 L2 'This is the falsification protocol for H09–H11' with Q18 'two Pi host processes same canonical root, first worker alive after launch handle | only one writer, other fenced' and Q20 'first writer never dispatched, all host checks deny | zero effects and safe lease release'.",
    "Collected every sentence naming who holds, fences or releases the writer lease; compared the owner named in README/mw-05 with the holder named in mw-02 §5 and the behaviors MW's own protocol tests (Q18, Q20).",
    "NON-EPISTEMIC; ownership statement needs SURFACE_DISAGREEMENT (Pi = lease authority and release; Mechanical = fence enforcement at write entry) before Q18/Q20 can be assigned to a repo",
    "ownership drift: 'holds exclusive ownership' (MW) vs 'Pi owns lease authority' (MW, Pi); MW's Q20 expects a lease release it does not own",
    "Low-medium: the design may intend a two-layer model (Pi lease, MW fence check), but no sentence says so; P02/H06 red tests would otherwise duplicate or miss the release path.", "low")

# F14 prompt/script worktrees unaffected vs exclusive ownership
add(["C121","C062","C004"], "CONFLICTS_WITH",
    "pi-README L7: 'long-lived exclusive workspace ownership' | pi-01 L21 (I5): '**I5 Exclusive ownership:** ... A second host/process sees the same authoritative lease.' | pi-02 L31: 'retain lock on after-dispatch unknown. Prompt/script worktrees remain unaffected.' | pi-03 L29: 'Keep existing script helper behavior unless requalified.' | pin pi-0fb90672: src/workbench/source-admission.ts is imported by no other module under src/ (grep -rln source-admission|WriterLeases|admitSourceWrite src/ lists only itself; its header L45-46 'Not wired yet: workflow_execute still refuses a function definition'), so script/prompt writers take no lease today.",
    "Read the exclusivity invariant against the exemption sentence; verified at the pin which launch paths acquire a WriterLeases lease (import graph of src/).",
    "NON-EPISTEMIC; I5/README 'exclusive' should be NARROW_SCOPE'd to 'exclusive among Mechanical function invocations'; the premise that script writers are fenced is UNSUPPORTED",
    "scope: 'exclusive workspace ownership' reads as exclusive against all Pi writers, while 02 exempts prompt/script worktrees and no script path takes the lease",
    "If a script workflow may write into the same canonical root during a function lease, G06 ('second same-root invocation rejected') is satisfied only for function invocations; the docs should say so.", "low")

# F15 I1/G09/P04 P0 vs MW D4 P1
add(["C058","C166","C195","C033"], "CONFLICTS_WITH",
    "pi-01 L16-17: '## B. Invariants — none may be weakened ... **I1 Immutable bytes:** The exact reviewed definition ID, schema, descriptor digest, tarball digest, runtime file manifest digest and validated input bytes identify execution.' | pi-04 L24: 'G09 | installed JS mutation after tarball extraction | refuse before trusted import' | pi-03 L39,42: 'P04 — Reviewed installed host consumer (P0; ...)' red test 'installed JS mutation' | mw-01 L23: '**MW-I05 / D4 — P1 executable closure:** ... Build a verifiable installed file/dependency manifest' | mw-03 L34: '### H03 — Verified installed executable and provider closure (P1/P0 dependency)' | pi-README L27 lists 'packed executable closure (D4)' under Mechanical-owned without a P0 label.",
    "Cross-tabulated severity labels attached to the runtime-manifest work in pi-01/pi-03/pi-04 against mw-01/mw-03 and the README.",
    "NON-EPISTEMIC severity labels; inconsistent (Pi: non-weakenable invariant and P0 packet; MW: P1 with a 'P0 dependency' hedge)",
    "severity drift across the boundary: a Pi P0 exit criterion (P04 Done, G09) depends on Mechanical work Mechanical rates P1",
    "mw-03's '(P1/P0 dependency)' is an acknowledgement, not a resolution. Remediation: rate H03/D4 P0 for the first release or drop 'runtime file manifest digest' from I1's identity set (which pi-01 forbids).", "low")

# F16 mechanical.pi-host/v1 modality
add(["C087","C088"], "CONFLICTS_WITH",
    "pi-02 L2: 'exact producer-side binding is mechanical.pi-host/v1 and reviewed descriptor mechanical.development.develop.v1.' | mw-02 L2: '**Design contract — proposed, not shipped.** Its adoption requires Pi's matching v1 tests.' | mw-README L20: 'host-binding.ts defines proposed mechanical.pi-host/v1 and mechanical:develop-write' | mw-01 L11: 'host-binding.ts | proposed v1 shape ... | validator does not enforce allowedEffects values or source/binding reality; exported host doesn't require it' | pin mw-69cb016d apps/development-rig/src/host-binding.ts:9 HOST_BINDING_CONTRACT = \"mechanical.pi-host/v1\", :13 'Candidate grant spelling, not yet adopted jointly with Pi', :105 closed keys contract/descriptorId/artifact/source/invocationId/evidenceProfile/contextProfile/intent (matches mw-02 §1 bullet 1); host.ts:13 re-exports the guards; host.ts:32-43 DevelopmentHostOptions has no binding member | pin pi-0fb90672 src/workbench/mechanical-descriptor.ts:128-133 MECHANICAL_REVIEWED_ENTRYPOINTS names mechanical.development.develop.v1.",
    "Compared the modality of the Pi sentence ('is', 'exact', 'reviewed') with MW's self-description ('proposed, not shipped') and read the binding module and host options at the MW pin.",
    "C087 SUPPORTED as an existence claim (the contract string, validator and guards exist and are exported); the ratified/'exact' reading UNSUPPORTED (MW: proposed, grant 'not yet adopted jointly'); C088 SUPPORTED (both pins name the descriptor id) -> DOWNGRADE_MODALITY on pi-02 L2",
    "modality: Pi states as settled what MW states as proposed; both agree the composed call requiring the binding does not exist",
    "No shape drift found: mw-02 §1's described v1 members equal the pinned closed key set, so the 'same version, changed contents' attack fails here (recorded as a failed attack).", "low")

# F17 pi-05 H01/H02 indicative vs mw-01 present state
add(["C214","C215","C227"], "CONTRADICTS",
    "pi-05 L30: 'H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding and exact immutable package/runtime manifest; reject malformed descriptors with typed errors.' and L31: 'H02: production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate; provider SDK/runtime identity pinned' | pi-05 L29 header: 'Mechanical producer handoff — exact blocking dependencies' | mw-01 L8: 'no required host binding, source lease, grant or native provider services in invokeDevelopmentHost' and L12: 'strict projection not wired to developLive' | mw-README L21: fixtures 'do NOT invoke Pi's registered function tool or native L4' | pin mw-69cb016d host.ts:32-43 DevelopmentHostOptions = {artifactPath, artifactDigest, descriptorBytes, descriptorDigest, services}.",
    "Read the H01/H02 sentences in both available moods (present-state description vs requirement) against mw-01's current-state table and the pinned host signature.",
    "Present-tense reading REFUTED at the pins; requirement reading NON-EPISTEMIC (the header supports it) -> DOWNGRADE_MODALITY ('must accept', 'must be composed')",
    "modality: indicative verbs in a blocking-dependency list read as capabilities the companion program denies",
    "Body-vs-footer class: a sentence stronger than README L2 'not implemented' allows if read literally; cured by one modal verb per item.", "low")

# F18 MW baseline pin disagreement (resolved)
add(["C003","C033"], "CONFLICTS_WITH",
    "pi-README L3: '**Paired Mechanical snapshot:** 69cb016dd293a17bcc893f2baf410a51c226f4c9, with an additional main commit observed while authoring' | mw-README L3: '**Source baseline:** MechanicalWorkflows 1be2b8dc7e1e852fd35f9b6e3347386377c3f371' | mw-01 L2: 'Mechanical main 1be2b8d; Pi master 0fb9067 at review' | pin mw-69cb016d: git merge-base --is-ancestor 69cb016d 1be2b8dc -> true; git show --stat 1be2b8dc -> apps/development-rig/test/host-services.test.ts (+2/-2, test titles), docs/programs/pi-native-interoperability-2026-11-09/04-IDENTIFIER-MAPPING.md (+1/-1); 1be2b8dc is a cherry-pick of 531bc2bf.",
    "Resolved both commit ids in the MW pin's object store, checked ancestry and the diff stat between them.",
    "C003 ESTABLISHED (the 'additional main commit' is 1be2b8dc, the MW program's baseline); no material drift between the two MW baselines for any design claim",
    "temporal: the two programs pin adjacent MW commits; the delta touches two test titles and one mapping row only",
    "Informational: judge MW-side premises at 69cb016d as the task pins; nothing in 1be2b8dc changes a cited module. Recorded so the two-pin disagreement is not re-raised as a conflict.", "low")

# F19 'isolated' worktree vs no OS isolation
add(["C026","C004"], "CONFLICTS_WITH",
    "pi-README L24: 'one clean isolated Git worktree' | mw-README L9: 'Claude Agent SDK writes one isolated worktree with new committed tree' | mw-01 L27: '**MW-I09 / D12 — P1 confinement:** Claude Agent SDK allowedTools and prompts narrow expected behavior, but do not constitute OS-enforced write isolation. State first-release trusted-host boundary' | mw-05 L13: 'Native OS containment stronger than the trusted local host must be explicitly engineered/tested, never inferred from Claude prompt wording or allowedTools.' | pi-01 L29: 'no sandbox claim from SDK prompt/tool filters'.",
    "Compared the adjective 'isolated' in both release definitions with the confinement defect and non-claims in mw-01/mw-05/pi-01.",
    "NON-EPISTEMIC; NARROW_SCOPE: 'isolated' = a separate dedicated worktree, not an isolation (containment) boundary",
    "semantic drift: 'isolated' in the release headline can be read as the containment the corpus explicitly disclaims",
    "Low; one-word fix ('dedicated clean Git worktree') removes the stronger reading.", "low")

# F20 'replay' two senses
add(["C122","C064","C174"], "CONFLICTS_WITH",
    "pi-02 L34: 'replay is idempotent by event id. Native events are append-only facts, projection can be rebuilt.' | pi-01 L23 (I7): '... produce explicit uncertainty, retained native refs and zero blind replay.' | pi-02 L44: 'No auto re-invoke on unknown.' | mw-03 L30: 'Unknown denies replay' | mw-02 L61: 'A new writer attempt requires an explicitly new authorized attempt only after proven safe effects; never automatic on timeout.'",
    "Collected every use of 'replay' and classified it as event/projection replay or effect/writer replay.",
    "NON-EPISTEMIC; SPLIT_CLAIM the term into 'event replay (idempotent, always allowed)' and 'effect replay (denied on unknown)'",
    "semantic: one token for two opposite policies (always-idempotent vs never-automatic)",
    "A requirement writer copying 'zero blind replay' and 'replay is idempotent' into one row would produce a contradiction; naming the two senses prevents it.", "low")

# F21 'independent to execute' vs blocking dependencies
add(["C005"], "CONTRADICTS",
    "pi-05 L2: 'This file makes the Pi program independent to execute. It does NOT transfer implementation ownership of Mechanical code to Pi.' | pi-05 L29: '## Mechanical producer handoff — exact blocking dependencies' (H01-H05) | pi-03 L63: '### P08 — Genuine native acceptance (P0; P05–P07 and Mechanical host native closure)' and L39 'P04 ... (P0; MW H01/H02)' | pi-README L7: 'This is the next, self-contained design revision.'",
    "Read the two sentences of pi-05 L2 against the same file's blocking-dependency section and pi-03's cross-repo prerequisites.",
    "C005 'self-contained' SUPPORTED as a document property (reading order resolves within the five docs); 'independent to execute' UNSUPPORTED (P04/P08 block on Mechanical H-work)",
    "scope: 'independent' slides from 'readable on its own' to 'executable on its own'",
    "Rewrite as 'This file lets a Pi implementer proceed without reading Mechanical's program; Mechanical deliverables H01-H05 remain blocking.'", "low")

# F22 mw-04 present tense tests exist (MW-doc, no Pi claim row)
add([], "CONTRADICTS",
    "mw-04 L2: '**No tests, native provider runs or Forge gates are asserted by this document.**' | mw-04 L39: 'Each fault test has a nearby positive control that confirms real behavior is possible. Include a mutant that removes the relevant guard; the test must fail on the mutant.'",
    "Scanned every MW body sentence for indicative claims about tests, runs or receipts and compared with the document's own footer/non-claim.",
    "Indicative reading REFUTED by the document's own header (no such tests exist); NON-EPISTEMIC once DOWNGRADE_MODALITY to 'must have'",
    "modality: body sentence stronger than the non-claim header",
    "MW companion document; no Pi claim row. Nearest Pi analogue pi-03 L2 / pi-05 L38 is correctly modal ('must accompany').", "low")

# F23 Forge native tree/environment evidence hedged vs assumed
add(["C026","C033","C185","C188","C209"], "CONFLICTS_WITH",
    "pi-README L24: 'strict native Forge gate' (first supported vertical) | mw-README L9: 'native Forge complete gate establishes exact candidate/tree/definition/environment evidence' | mw-01 L19: 'gate-definition and execution_environment may be descriptor-only, and a tree proof need not be native' | mw-02 L53: 'If Forge's current published envelope does not contain a required field, explicitly document the supported evidence source and validate it or mark strict verification unavailable.' | pi-04 L17: 'G02 | matching commit but missing candidate tree evidence | strict result indeterminate unless documented independent native tree proof' | detection surface consulted: ~/.claude/skills/forge/references/commands-build.md documents data.gated_commit (HEAD at run START), data.gated_tree (HEAD's tree at run start when clean, \"\" otherwise), gate_passed, gate_definition, execution_environment; MW pin live-gate.ts reads gated_tree/source_tree/gate_definition/execution_environment/gate_passed.",
    "Compared the release headlines' assumption that Forge supplies strict native evidence with the hedges in mw-01/mw-02/pi-04; checked the Forge reference and the MW pin's live-gate.ts for the envelope fields.",
    "Embedded premise 'Forge's envelope carries native commit/tree/definition/environment evidence' SUPPORTED (Forge reference + MW reader), with the condition that gated_tree is empty when the run starts dirty; the docs' hedge is a conditional, not a contradiction -> ADD_SOURCE (cite the envelope fields in H01/G02)",
    "modality: release headlines assert, 02/04 hedge; no doc names the Forge envelope spec that settles it",
    "Not a live contradiction once the Forge reference is cited; recorded so H01/G02 carry the field names and the clean-start condition instead of 'documented independent native tree proof'.", "low")

# F24 verified_candidate definition strictness differs across repos
add(["C205","C187","C188","C189"], "CONFLICTS_WITH",
    "pi-04 L36: 'Verified_candidate: passed producer gate on matching candidate commit/tree with valid native gate-definition and required execution evidence.' and L16 'G01 | nominal Forge PASS missing gate_passed | no strict native verification' | mw-02 L54: 'A strict pass requires full carrier consistency: operation identity, completion, native candidate commit/tree, gate definition hash, environment pin, actual PASS, gate_passed===true, no cancellation, status/disposition consistency, no post-gate source mutation.' | mw-04 Q01 'indeterminate', Q06 'delivery incomplete, status mismatch, cancelled terminal, contradictory envelope verdict | indeterminate', Q10 'workspace was dirtied by gate | indeterminate; preserve native ref'.",
    "Aligned the Pi definition of verified_candidate and G01-G03 expected results with the MW strict-pass axes and Q01-Q10 verdicts.",
    "NON-EPISTEMIC/DEFINITION; Pi's definition is a proper subset of MW's (missing operation identity, completion/delivery, cancellation, status consistency, post-gate drift) and G01 names no domain verdict where MW names 'indeterminate'",
    "definition drift for a term both programs treat as a shared four-way domain outcome",
    "Since pi-01 I9 assigns develop() semantics to Mechanical, Pi should cite MW's axis list rather than restate a shorter one.", "low")

with open(OUT, "w", encoding="utf-8") as f:
    for r in rows:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")
print(len(rows), OUT)
