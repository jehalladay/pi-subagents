import json
from pathlib import Path
W=Path('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/epistemic-triage/.work')
claims={r['id']:r for r in map(json.loads,(W/'claims-d02.jsonl').read_text().splitlines())}
PI='pins/pi-0fb90672/'
MW='pins/mw-69cb016d/'
probe='epistemic-triage/.work/audit-a-protocol.scratch/probe/'
drift=('Direct git diff verified: Pi 0fb90672 -> document 3fc0ead1 changes six program docs and a skill only; src/test/qa/package.json/forge.toml unchanged. MW 69cb016d -> companion baseline 1be2b8dc changes two test titles and identifier mapping only; deposit 6476372f adds docs/skill. Source, contracts and manifests cited here are unchanged even through locally available 0ffdc844. Verdict remains scoped to the supplied environment pins, not arbitrary current heads.')
rows=[]
def add(n,status,rival,attacks,evidence,wording,remediation):
 id=f'C{n:03d}'; c=claims[id]
 rows.append(dict(id=id,finalStatus=status,kind=c['kind'],rivalReading=rival,attacks=attacks,decisiveEvidence=evidence,driftAtDocCommit=drift,permittedWording=wording,remediation=remediation))
N='NON-EPISTEMIC'; E='ESTABLISHED'; S='SUPPORTED'; R='REFUTED'
add(87,E,'The contract name may be merely aspirational, or its existence might establish a ratified, enforced host ABI.',[
'Failed existence attack: literal constants, type, schema and validator exist at the MW pin.',
'Existence does not imply ratification: host-binding.ts:2-6 says proposed; host.ts:17 alone says ratified, but the facade options have no binding member.',
'Closed JSON shape is not universal object hardening: validator uses inherited-member checks and Object.keys; symbol extras and inherited fields pass the direct probe.',
'Source mapping is partial: Pi accepts 40/64-hex Git IDs and a host-declared gate manifest path; MW accepts 40-hex IDs and describes forge.toml.'
],MW+'apps/development-rig/src/host-binding.ts:9-42,71-76,99-134; contracts/schemas/mechanical-host-binding.v1.schema.json; '+PI+'src/workbench/source-admission.ts:118,186; '+probe+'mw-probe.jsonl M2-binding-validation (direct Node import of pin, no native providers).',
'At MW 69cb016d, proposed mechanical.pi-host/v1 has the listed JSON shape and pure validation helpers; the current invokeDevelopmentHost call does not require that binding and joint ratification is not established.',
'NARROW_SCOPE: qualify closed as serialized JSON shape, not arbitrary JavaScript objects. ADD_MISSING_PREMISE: ratify Git-ID/hash/path mapping and the composed host signature; retain proposed status.')
add(88,E,'The shared ID might already review the rig host export rather than the pure library.',[
'Failed same-ID attack: both constants name mechanical.development.develop.v1; descriptor fixture hashes match.',
'Target mismatch survives: allowlist and descriptor review @mechanical/workflows-development/develop, whereas proposed Pi imports @mechanical/development-rig/host, whose namespace has no develop export.'
],PI+'src/workbench/mechanical-descriptor.ts:128-137,258-265,365-374; '+MW+'apps/development-rig/src/host-binding.ts:10; contracts/entrypoints/development.v1.json; both descriptor files hash to sha256:68cc312ba82c5837eff64bb6de39e0db09073c836d851d550e13aa458d192d0f (recomputed).',
'Both pins share a reviewed descriptor ID for the descriptor-only pure library entrypoint; this is not yet an allowlisted composed rig-host export.',
'ADD_MISSING_PREMISE: define descriptor-to-host export resolution and coordinated status/validator changes before P04; preserve the existing descriptor witness.')
add(89,N,'This may be an already supported request or an unambiguous first-release call.',[
'The kind=function schema exists but registered execution refuses it.',
'Optional allowWrites conflicts with source-admission reuse: absence produces writes-not-requested.',
'Only embedded/detached exist in code; README attached wording and later-variant wording are not one explicit topology.',
'One artifactDigest does not specify the rig/library/coordination closure; workspace injection versus caller comparison is a deliberate fork, not implementation evidence.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:5; docs/pi-05-OPERATIONS-AND-HANDOFF.md:41; '+PI+'src/workbench/execute.ts:19,81-89; execute-tool.ts:215-218; source-admission.ts:481; '+probe+'pi-probe.jsonl P9-lease-lifetime.',
'Propose embedded function execution with host-authoritative workspace/basis, an explicitly selected input surface and a defined write-request rule; execution remains unimplemented.',
'ADD_MISSING_PREMISE: settle policy omission, workspace injection/comparison, artifactDigest referent and embedded first-release topology in P00.')
add(90,E,'A three-member TypeScript interface might prove that the entire installed host rejects every non-closed object.',[
'Core required-field checks and three-field interface are directly present.',
'Host layer already rejects extra enumerable members, but returns the caller object; hidden properties/accessors are not universally rejected.',
'Non-string/blank fields throw; there is no guarantee every invocation returns a domain result.'
],MW+'packages/development/src/contracts.ts:14-18; develop.ts:9-13,25-27; apps/development-rig/src/entrypoint-host.ts:77-83; lens-mw-src-probe/out/host-probe.jsonl input-* (prior investigator execution, not re-executed here).',
'The core DevelopmentRequest names task/workspaceId/baseRevision and develop checks them for nonblank strings. The host additionally checks enumerable keys, not full canonical-object identity.',
'NARROW_SCOPE: distinguish core type, host enumerable-key validation and new Pi canonicalization. Preserve existing producer validation rather than claiming it absent.')
add(91,N,'Host-bound settings may already be sufficiently trusted simply because they are not tool JSON.',[
'Caller-data versus host-authority separation is a rule, not proof of confinement.',
'Current grants reader merges workspace .pi/subagents.json over global settings; whether a future writer can modify it depends on write-root topology and is not demonstrated.',
'Comparing caller workspace/basis to host measurements need not violate host-only authority: validated equality is not trusting the caller. The stronger contradiction reading is rejected.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:5; '+PI+'src/index.ts:2503-2511; settings.ts:559-589; source-admission.ts:355-357; .gitignore:39.',
'Require authority to derive from protected host state; caller-provided workspace/basis may only be compared with independently authoritative measurements.',
'ADD_MISSING_PREMISE: fix grant-store trust/protection relative to writer roots. Keep writable-settings exploit a conditional risk, not an observed function-route exploit.')
add(92,N,'A host-held plan containing the listed values might itself be an existing authority bearer or pin every executed package.',[
'Plan is proposed and distinct from the smaller serialized binding.',
'MW binding pins library tarball only; rig and coordination are separate packages. Plural package/runtime-manifest intent prevents treating the proposal itself as a false singular-package assertion.',
'Values checked before invocation cannot replace fresh reads after asynchronous callee installation.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:6; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:6-8,15-17; '+MW+'apps/development-rig/src/host-binding.ts:22-27; package.json:30-33; installed-host.ts:29-52.',
'Propose a Pi-owned plan with separate identities for all executing artifacts and trusted live authority access at the final provider boundary.',
'ADD_MISSING_PREMISE: enumerate rig/library/coordination/runtime closure digests and ownership; define which fields are immutable snapshots and which require current readers.')
add(93,E,'Profiles and the candidate grant might still be vocabulary with no source witness, as in an earlier program.',[
'Failed historical carry-over attack: all three spellings have literal code witnesses in host-binding.ts.',
'Candidate spelling is representable but not jointly adopted; enum existence proves neither operational profile implementation nor Pi support.'
],MW+'apps/development-rig/src/host-binding.ts:9-14; '+probe+'mw-probe.jsonl M3-grant-grammar; '+PI+'src/workbench/function-authority.ts:215,257-289.',
'MW 69cb016d declares git-census-v1/plain-v1 and candidate mechanical:develop-write; the candidate spelling is accepted by both action grammars, without establishing joint adoption.',
'ADD_TEMPORAL_QUALIFIER: retain MW pin and candidate/enum-only qualifications; no absence claim inherited from MNI.')
add(94,E,'allowWrites:true might confer a write capability or be enough to dispatch.',[
'Own data property true is recognized for the suite-pinned plain/null-prototype forms.',
'Asking is only rule 3; confinement, measurement, attestation and ownership still follow.'
],PI+'src/workbench/source-admission.ts:455-487; '+probe+'pi-probe.jsonl P9-lease-lifetime (missing policy refused).',
'The source seam recognizes an own allowWrites:true on accepted plain policy objects as a request, never as an authorization.',
'No empirical correction needed; carry the request-versus-grant distinction into P00 policy semantics.')
add(95,R,'The numeric limits exist, but they bound function input after note omission rather than raw JSON.',[
'The closed key sets, digest grammar, host modes and numeric constants survive direct inspection.',
'Decisive raw-budget counterexample: a function input whose notes alone exceed 64 KiB or 1 MiB is admitted; the same oversized script input and an oversized typed task refuse.',
'This is not a production denial-of-service finding; it refutes only the raw-budget premise in the extracted compound claim.'
],PI+'src/workbench/execute.ts:81-89,185-194; identity.ts:202; test/workbench-function-authority.test.ts:2280-2299; '+probe+'pi-probe.jsonl P3-oversize-note (rc=0).',
'At the Pi pin, request/definition keys are closed and the 64 KiB input / 4096-byte policy budgets apply to canonicalized, notes-stripped function values, not raw caller JSON.',
'SPLIT_CLAIM: preserve key/grammar/limit observations as established and correct the raw-budget clause. ADD_MISSING_PREMISE: specify a separate transport/raw-size gate if desired without weakening EAT-R154 note independence.')
add(96,E,'withoutBeadsNotes might sanitize every object or already retain an immutable dispatch payload.',[
'Function-only use for input and policy is directly present.',
'Return-original behavior is per visited subtree, not a guarantee the whole returned graph is the original on a nested cycle.',
'Notes are removed by name at every plain-record depth, including non-Beads records; copy refusal is subsequently checked by canonicalJson.',
'Proxy traps may run during Reflect/getPrototype operations; poisoned ordinary getters and proxies are different forms.'
],PI+'src/workbench/identity.ts:156-210; execute.ts:185-203; '+probe+'pi-probe.jsonl P2-accessor-on-typed-member, P4-proxy-input, P10-notes-by-name.',
'For function admissions, withoutBeadsNotes copies supported records/arrays and omits notes by name; unsupported visited values may be returned unchanged for the following canonical validator to reject.',
'NARROW_SCOPE: use visited value/subtree for fallback behavior; preserve supported-form limits and distinguish ordinary getters from Proxy traps.')
add(97,N,'The requested canonicalizer is entirely missing, or only authority-bearing accessors need rejection.',[
'Existing canonicalJson already rejects accessors on every retained member, cycles, hidden/symbol keys and nonplain objects.',
'Rejecting authority-bearing accessors is a minimum constraint, not affirmative permission for others; a lens inference that it necessarily weakens the guard is too strong.',
'Ordinary defensive spread would invoke note getters before omission; clone strategy is load-bearing.',
'Proxy input is admitted by current helper with reflective trap execution; future threat model must distinguish parsed JSON from arbitrary in-process objects.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:10; docs/pi-01-AUDIT-AND-INVARIANTS.md:19; '+PI+'src/workbench/identity.ts:100-147,176-210; '+probe+'pi-probe.jsonl P2/P4.',
'Extend existing canonical checks to return one admitted immutable payload; retain rejection of every non-note accessor and omit notes before any value-reading copy.',
'ADD_MISSING_PREMISE: define safe copying order, retained-member accessor policy and in-process Proxy scope; make tests target dispatch identity rather than claiming all validators absent.')
add(98,N,'Producer-shape validation and host basis binding might already be complete at Pi.',[
'Core three-field type exists and host enumerable-key checks provide partial validation, but Pi src contains no baseRevision use.',
'Workspace id need not equal a path by definition; source-admission takes a path. The mapping/comparison is unspecified.',
'Host-injected and caller-compared surfaces can both honor host-only authority; they require different input contracts.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:11; '+MW+'apps/development-rig/src/entrypoint-host.ts:77-83; live-development.ts:394; '+PI+'src/workbench/source-admission.ts:134-140. Direct grep over all Pi src: baseRevision zero; workspaceId only coordination/reactivefiber modules.',
'Require a canonical three-field DevelopmentRequest and an explicit workspaceId-to-authorized-root and baseRevision-to-measured-commit relationship.',
'ADD_MISSING_PREMISE: choose id mapping and full commit comparison; reject mismatches and preserve producer validation as an existing backstop.')
add(99,N,'Stored inputDigest might already be the admission digest or merely SHA-256 of canonical bytes.',[
'Admission keeps only its digest; launcher has no inputDigest member and dispatches raw input.',
'Observed script digest uses workflow-input with a supplied/value wrapper; detached verification uses invocation-input; admission uses workflow-execute-input.',
'Domain-separated digest differs from plain canonical-byte SHA-256 even with identical payload bytes.'
],PI+'src/workbench/execute.ts:38-48,203; execute-tool.ts:76-87,236; index.ts:2968,3174; hosts/local-detached.ts:703; identity.ts:151-153; '+probe+'pi-probe.jsonl P1/P5.',
'Require one named function-input digest construction and immutable admitted payload to be retained, dispatched, journaled and observed consistently.',
'ADD_MISSING_PREMISE: ratify prefix/domain/encoding and exact payload vectors; map or separate the three existing digest domains rather than equating their fields.')
add(100,E,'This describes an actual note-leaking function execution, or an ordinary script whose admitted and executed JSON differ.',[
'The two source expressions are verified: function judgment strips notes; launch object reads params.input.',
'No function enters that launch branch, so actual function leakage is not established.',
'Ordinary script values have the same data for hashing/dispatch, although the raw reference is not the parsed digest basis; stronger live divergence requires a separate mutation witness.'
],PI+'src/workbench/execute.ts:185-203; execute-tool.ts:198,217-218,232-245; '+probe+'pi-probe.jsonl P1/P4 (helper probes only).',
'The existing launcher structure retains raw params.input while function admission hashes a judged copy; this is a latent integration hazard, not an observed function-route dispatch at 0fb90672.',
'NARROW_SCOPE: retain no-current-function-launch qualifier; write the red at the new composed/registered callback boundary.')
add(101,N,'Poisoned-note admission tests must currently fail and can serve as new red evidence without a dispatch assertion.',[
'Existing EAT-R154 tests already assert ordinary note getter reads zero at admission.',
'No-forwarding half is new at the function dispatch boundary; direct producer own-enumerable note input is already rejected.',
'Copy-before-omission implementations can fail even if withoutBeadsNotes itself is safe.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:12; '+PI+'test/workbench-function-authority.test.ts:2302-2330; identity.ts:202; '+MW+'apps/development-rig/src/entrypoint-host.ts:77-83.',
'Add a composed/registered-route test proving the poisoned note is neither read nor present at the callback, preserving existing green admission tests.',
'NARROW_SCOPE: name the new boundary and failing callback assertion; do not count existing admission-only tests as new red evidence.')
add(102,N,'Bounded replies already imply complete durable admission records or addressable truncated IDs.',[
'Current reply builder may trim identities then drop native refs with omission metadata; immutable durable identity storage is a separate obligation.',
'Execute modules do not persist an admission record; script files/journals elsewhere do not establish function evidence custody.',
'Never truncate is not permission for unbounded storage or disclosure: complete authorized evidence can be referenced through bounded records.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:13,40; '+PI+'src/workbench/execute.ts:344-365; execute-tool.ts:146-170; index.ts:2625-2636.',
'Require independently bounded/redacted model replies and complete authorized durable evidence, preserving addressable identities or honest omission indicators.',
'ADD_MISSING_PREMISE: bind to P07 durable storage, access control and evidence-reference design; do not advertise the proposed durable half as present.')
add(103,N,'The ordered helpers already compose one atomic admission and Pi A5 alone can remain the final check.',[
'Current seams are unconnected; source seam additionally requires a minted attestation omitted from A0-A6.',
'MW currently installs asynchronously inside invocation; a Pi pre-handoff check can stale during that work.',
'A6 durable intent itself may await after A5: revalidate after all such waits before effect entry.',
'Existing descriptor resolves library develop, not the proposed composed host export.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:16-24; docs/pi-03-IMPLEMENTATION-PACKETS.md:35; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:12-19; '+PI+'src/workbench/source-admission.ts:486-503; '+MW+'apps/development-rig/src/installed-host.ts:29-52; '+probe+'pi-probe.jsonl P8/P9.',
'Propose joint ordered admission with explicit attestation and producer-side live revalidation after preparation/durable intent; no global atomicity claim.',
'ADD_MISSING_PREMISE: specify attestation channel, per-artifact installation owner, live readers/fence verifier and final check location; make P03 depend on the matching MW composed-host contract.')
add(104,E,'The loader verifies the installed runtime closure or already loads an independently installed rig package.',[
'Descriptor and regular artifact file SHA checks, closed diagnostics, and reviewed-entry handoff are established.',
'The module explicitly does not claim installed-package verification; host supplies loader and pin.',
'No src production caller invokes this boundary, and descriptor location itself is not root-confined by it.'
],PI+'src/workbench/mechanical-descriptor.ts:21-23,87-98,128-137,303-381; src importer/call-site census performed in this audit.',
'Pi has an unwired descriptor/regular-artifact integrity seam with allowlisted metadata and typed refusals, not an installed runtime-closure verifier.',
'NARROW_SCOPE: retain enumerated forms and host-supplied pin/loader qualifications; add installed runtime checks as new work.')
add(105,N,'MW-CONTRACT is an existing machine-enforced ratification event and adoption must occur exactly once by current API design.',[
'No ratification input is accepted by adoptFunctionActions; it checks grammar, shape and uniqueness within the passed binding list.',
'The helper can mint multiple valid contracts; one-time lifecycle is a proposed host policy, not an API restriction.',
'MW-CONTRACT/P-contract have no single agreed ratification artifact; matching tests are a gating decision, not an already satisfied external receipt.',
'Detached conjunction remains a shell check; function-authority alone does not enforce detach.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:18; '+PI+'src/workbench/function-authority.ts:271-290,338-344; execute-tool.ts:215-216; '+MW+'contracts/README.md:22; '+probe+'pi-probe.jsonl P7-adoption.',
'Require host adoption to be tied to a jointly signed-off pinned contract and installed-host evidence, then decide each invocation against the held contract and all applicable grants.',
'ADD_MISSING_PREMISE: define the ratification artifact and host adoption lifecycle; distinguish contractual review from runtime grant checks.')
add(106,E,'The exported adoption function might accept lookalike contracts or intrinsically authorize arbitrary artifacts.',[
'WeakSet proves only contracts minted by this module are honored; lookalike probe refuses.',
'Unique definition/action binding is per contract, not global across adoptions.',
'Binding key is definitionId, not schemaVersion or artifactDigest: P7 changes those axes and the authority seam still dispatches, so descriptor/source composition remains required.'
],PI+'src/workbench/function-authority.ts:228-231,263-290,313-315; '+probe+'pi-probe.jsonl P7-adoption.',
'adoptFunctionActions mints frozen provenance-checked contracts with 1..64 exact definition/action pairs, unique within each contract; it is not full artifact or ratification admission.',
'NARROW_SCOPE: state per-contract uniqueness and definitionId-only action binding; keep descriptor/version/artifact checks at the composed boundary.')
add(107,R,'The default constant is unadopted, but a host-supplied adopted contract can dispatch while that constant remains unchanged.',[
'The constant and routing-later statements are established.',
'The unrestricted consequence that a function dispatch passing earlier rules must refuse is contradicted: dispatch reads options.contract, not the exported constant.',
'Direct probe adopts mechanical:develop-write, dispatches once with it, and separately observes default/forged contract refusal; no production function route is claimed.'
],PI+'src/workbench/function-authority.ts:145,199-211,271-290,338-344,359-368; '+probe+'pi-probe.jsonl P7-adoption (viaAdopted=dispatched, viaDefault=entry:function-action-unadopted).',
'FUNCTION_ACTION_CONTRACT is unadopted; dispatches supplied that value refuse after earlier checks. A separately minted adopted contract can dispatch at the helper seam, but production wires no function launcher.',
'SPLIT_CLAIM: preserve the default observation and routing absence; remove the universal helper-refusal consequence. ADD_MISSING_PREMISE: enforce ratification at the production adoption site.')
add(108,E,'An advertised function kind or dormant helper imports might already furnish a transitive registered function route.',[
'Full execute-tool read: only script branch reaches launcher calls.',
'Src importer/symbol census finds no callers of function authority/source/descriptor entrypoints; index wires script launchers.',
'Refusal ordering matters: malformed/unauthorized requests or detached-without-detach refuse earlier, not necessarily unsupported-definition-kind.',
'Tool registration depends on Claude backend/native modules; whole index.ts also registers other non-script tools, so script-only is scoped to workflow_execute.'
],PI+'src/workbench/execute-tool.ts:202-245; src/index.ts:2618-2684,3009-3018; src/workbench/mechanical-coordination.ts:133 is sole descriptor import (constant only).',
'At Pi 0fb90672, when workflow_execute is registered, its eligible non-script requests refuse and its production launch wiring is script-only; the three function seams are not transitively invoked.',
'NARROW_SCOPE: retain registration condition, earlier refusal precedence and workflow_execute-only wiring scope.')
add(109,N,'Existing source admission suffices unchanged to bind the future host source and acquire persistent ownership.',[
'Canonical confinement/measurement exist, but host must mint an attestation for that measured identity.',
'Current lease is one instance-local Map and releases on dispatch settlement.',
'After expected candidate edits, rechecking the original HEAD as immutable would incorrectly reject valid progress; source expectations must be stage-specific.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:19-20; '+PI+'src/workbench/source-admission.ts:397-410,469-508; '+probe+'pi-probe.jsonl P9-lease-lifetime.',
'Propose attested canonical initial source binding and durable ownership with stage-appropriate revalidation after waits; no publication authority is inferred.',
'ADD_MISSING_PREMISE: define attestation minting, source-field mapping and initial-versus-candidate source transitions; replace or wrap current lease lifetime explicitly.')
add(110,E,'Source identity is a generic cleanliness/forge.toml guarantee or stays current without a fresh check.',[
'Confinement, HEAD/tree/status/manifest hashing and post-wait measurement are directly present.',
'forge.toml is the suite-selected host.gateManifest value, not hard-coded by the module.',
'Clean means no git-status records; ignored changes outside the selected manifest are not detected.',
'Remeasurement and attestation reread cover the measured axes only; not every root alias or external mutable state.'
],PI+'src/workbench/source-admission.ts:338-388,469-503; test/workbench-mechanical-source-admission.test.ts:412-427,520-527; direct source grep forge.toml=0.',
'The suite-scoped source seam confines and measures Git HEAD/tree/status plus a host-selected manifest, then remeasures and rechecks attestation after a wait; the fixture selects forge.toml.',
'NARROW_SCOPE: state git-status cleanliness and host-selected manifest; pin forge.toml explicitly in the function host mapping.')
add(111,E,'The final authority check covers all effects or proves source/fence freshness through arbitrary loader waits.',[
'Fresh grants/identity are read after park and before dispatch; park revocation control produces zero dispatch effects.',
'Dispatch includes loader/provider work, so revocation during that async callback can precede first effect after the last read.',
'Other axes and arbitrary scheduling forms are outside the module claim; positive seam coverage is not invalidated by that limitation.'
],PI+'src/workbench/function-authority.ts:10-35,359-368; '+probe+'pi-probe.jsonl P8-final-check-window (park revocation refuses; loader-time revocation still reaches simulated effect).',
'The authority seam rechecks grants/principal/session after its optional park for the enumerated forms; it does not provide composed source/runtime/fence freshness.',
'NARROW_SCOPE: carry helper-boundary coverage and scheduling limits; add final producer-entry revalidation rather than relabeling existing tests as full composition.')
add(112,N,'The Pi intent and existing MW effect intent are one already shared durable record.',[
'Pi A6 precedes handoff; MW H5 precedes its writer. Two stages need correlation, not automatic identity.',
'MW standalone effect-intent exists with opt-in store; ./host facade exposes no store/read recovery channel.',
'A launch reference does not establish native completion or even known provider identity.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:22; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:17,58,64; '+MW+'apps/development-rig/src/effect-intent.ts:23-40,143-158; host.ts:32-43; '+PI+'src/workflow/journal.ts:59-70.',
'Require durable Pi admission/dispatch intent and correlated producer effect intent before their respective boundaries, returning launch-only status.',
'ADD_MISSING_PREMISE: define intent IDs, store ownership/paths, recovery authority and present/absent/settled/unknown cross-record table.')
add(113,S,'Independent helpers can be nested safely, or a future coordinator could eliminate every window and make the universal no-transaction assertion false.',[
'At these pins no combined transaction manager exists in the inspected call paths; authority and source checks are independent.',
'P8 concretely shows helper-level last-check/async-dispatch staleness; it is not a live function-route race.',
'An assertion about any possible future Pi host is broader than this source evidence. Global ACID impossibility is not formally proved.'
],PI+'src/workbench/function-authority.ts:359-368; source-admission.ts:478-509; '+MW+'apps/development-rig/src/installed-host.ts:29-52; '+probe+'pi-probe.jsonl P8-final-check-window.',
'The inspected helpers and proposed cross-system handoffs do not establish a shared ACID transaction; final-check-to-effect windows must be modeled explicitly.',
'NARROW_SCOPE: retain architectural inference at inspected/proposed composition, not a universal theorem about all future implementations; document tested/residual windows.')
add(114,N,'Fencing plus repeated checks is already implemented or guarantees every mutable authority axis is atomic.',[
'The rule explicitly rejects global atomicity; this survives the rival atomic-helpers reading.',
'Pi where-possible provider fence rejection is weaker than companion mandatory write-entry enforcement.',
'Provider fence token/current-generation query is not defined in the closed serialized binding.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:24; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:14,19,59; '+MW+'apps/development-rig/src/host-binding.ts:105; '+PI+'src/workbench/source-admission.ts:130-133.',
'Require explicit final-boundary fencing/revalidation and durable intent while documenting remaining asynchronous windows; do not claim global atomicity.',
'SURFACE_DISAGREEMENT: ratify mandatory supported-topology fence enforcement and verifier/token interface; reconcile P03 unbounded Done language with documented residual windows.')
add(115,N,'The current lease has this lifecycle or an accepted/launched handle establishes terminal settlement.',[
'Current lease contains only canonicalRoot/invocationId with held/absent state.',
'Launch-shaped helper dispatch can resolve while the writer remains live; the probe demonstrates why ownership cannot follow that promise automatically.',
'Slashed states uncertain/recovering and settled/released need transition definitions, not merely names.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:27; '+PI+'src/workbench/source-admission.ts:130-133,430-452,505-508; '+probe+'pi-probe.jsonl P9-lease-lifetime.',
'Introduce the proposed invocation-owned persistent lease lifecycle; accepted/launched alone must not release ownership.',
'ADD_MISSING_PREMISE: define distinct states, generation transitions and release evidence in the durable adapter; preserve current helper as a scoped primitive.')
add(116,N,'Process-local WriterLeases already supplies cross-process/durable fencing, or the program demands distributed support in its first release.',[
'Class methods touch only a private Map; two instances in one process independently acquire the same root.',
'First-release single-machine and deferred distributed coordinator are distinct scopes; no current distributed guarantee is inferred.',
'MW has no lease/fence identifier implementation in inspected rig source/test; writer:single is metadata only.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:28; '+PI+'src/workbench/source-admission.ts:430-453; '+probe+'pi-probe.jsonl P6-lease-registry; '+MW+'apps/development-rig/src/host-binding.ts:120-124. Direct rig src/test census for WriterLeases/writerLease/leaseGeneration/fencingGeneration/fenceToken/fencingToken/ownerId: zero.',
'Require durable cross-process single-machine ownership for first release; distributed coordination is a separately tested later capability.',
'ADD_MISSING_PREMISE: define shared lock/store owner and fencing mechanism; name nonparticipating-writer limits and persist/reattach semantics.')
add(117,E,'Process-local is really process-wide, or finally-release necessarily means the real writer ended.',[
'Private instance Map proves no durable or inter-process sharing; no production constructor/caller appears in src.',
'finally runs when dispatch resolves/rejects, including launch-shaped callbacks whose writer continues.',
'Direct probe contrasts immediate launch return (overlap possible) with long-lived dispatch (second call writer-held). This is helper evidence, not current registered-function failure.'
],PI+'src/workbench/source-admission.ts:41-47,430-453,488-509; '+probe+'pi-probe.jsonl P6/P9; direct complete src call-site census.',
'WriterLeases is registry-instance-local memory and admitSourceWrite releases it when its dispatch promise settles; no cross-process or restart persistence follows.',
'NARROW_SCOPE: prefer instance-local within one process; keep launch-return hazard conditional on how the future callback resolves.')
add(118,S,'A timeout or killed process necessarily means the writer can no longer affect the workspace.',[
'Timeout is an observation of elapsed time/lost liveness, not affirmative termination of every child/provider.',
'A fenced provider or verified termination could make release safe, but that adds evidence absent from timeout alone.',
'No real kill/partition experiment was run by this audit; this is the protocol inference and bounded countermodel.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:29; '+PI+'src/index.ts:2640-2642 (launch precedes background completion); '+MW+'apps/development-rig/src/post-dispatch-abort.ts:1-5,20-34. Countermodel: heartbeat delivery stalls while a previously launched writer remains live.',
'A timeout alone does not establish quiescence or settled effects; safe release needs additional fencing/termination/producer evidence.',
'ADD_MISSING_PREMISE: enumerate supported failure/liveness cases and tests; do not advertise unexecuted crash-recovery proof.')
add(119,N,'Operator intervention may silently transform unknown effects into no-effect or automatically release after a kill.',[
'Rule is a conservative release policy, not an implemented quarantine mechanism.',
'Operator override must be an explicit audited risk decision, not newly invented native non-occurrence evidence.',
'Kill of one host process is not inherently termination of all external effects.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:29; docs/pi-05-OPERATIONS-AND-HANDOFF.md:7; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:61,64.',
'Retain fenced/quarantined ownership after lost heartbeat/kill until justified recovery or an explicit audited operator disposition.',
'ADD_MISSING_PREMISE: define release decision authority, override evidence labeling and recovery permission checks; keep C118 inference separate from mandatory rule.')
add(120,N,'Different canonical roots imply nonoverlapping writable resources, while alias conflict already proves global exclusion.',[
'Same-root aliases conflict within one registry, and separate roots can be leased concurrently.',
'Nested roots are distinct keys but overlap filesystem subtrees: source-admission explicitly supports parent/submodule and ignored/inner simultaneous leases.',
'No current sandbox establishes that a parent-root writer cannot reach the nested root; do not equate different root strings with disjoint effects.',
'Reattachment cannot simply reacquire the held root under the same invocationId: current acquire refuses it.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:30; '+PI+'src/workbench/source-admission.ts:418-428,434-438; test/workbench-mechanical-source-admission.test.ts:1303-1335,1357; '+probe+'pi-probe.jsonl P6-lease-registry.',
'Require alias conflict at the authoritative store; permit concurrent roots only under an explicit overlap/isolation policy and resource caps.',
'ADD_MISSING_PREMISE: ratify nested/overlapping-root behavior and reattach primitive; otherwise qualify exclusivity as exact-root-key exclusion among participating functions.')
add(121,N,'Retaining function locks while leaving script paths unaffected guarantees exclusive filesystem ownership against every writer.',[
'No current script path takes WriterLeases; retaining scripts unchanged does not fence script/operator writers in a function root.',
'Known terminal domain failure does not by itself prove all effects stopped; lease outcome needs independent settlement/quiescence evidence.',
'An early host denial can safely release only when no provider effect occurred, not merely because the host returned an error.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:31; '+PI+'src/workbench/source-admission.ts:45-47; src/index.ts:2621-2642,2665-2678; docs/mw-04-VERIFICATION-AND-RELEASE.md Q20.',
'Release a function lease only after known-safe terminal effect disposition; retain uncertain leases and preserve existing script behavior without claiming script writers are fenced.',
'NARROW_SCOPE: exclusivity is among participating function invocations unless additional containment is implemented. ADD_MISSING_PREMISE: classify pre-effect host errors and terminal quiescence.')
add(122,N,'Pi has no journal at all, or every proposed journal event can already carry a producer-native reference.',[
'Claim scope note no durable journal exists is too broad: script journal.ts persists JSONL and writes non-read dispatch markers; it is not a durable function-invocation/fence journal.',
'Existing script file lives under tmpdir and lacks fsync; neither existence nor absence establishes full crash/power-failure durability.',
'Admitted/lease_acquired events precede native IDs: mandatory native-ref wording conflicts with no fabricated IDs unless absence is representable.',
'Event replay rebuilds projection; it is not effect retry. Existing MW progress stages differ, and Pi/MW intent records need mapping.',
'Prior EAT-R239/R250 require reuse of task/journal store; a separate store needs explicit supersession.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:34,39; '+PI+'src/workflow/journal.ts:43-70,252-258; output-file.ts:47-60; index.ts:2625-2636; docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md EAT-R239/R250; '+MW+'apps/development-rig/src/progress-stages.ts:9-24.',
'Propose an idempotent durable function-event journal extending or explicitly replacing existing script/task storage; early events carry native refs only when actually observed.',
'SPLIT_CLAIM: remove the overbroad no-journal scope annotation. ADD_MISSING_PREMISE: reconcile inherited storage requirements, optional native refs, event/stage mapping and Pi/MW intent correlation.')
add(123,N,'Existing requested/acknowledged/result controls already implement the function state machine and same-invocation restart.',[
'Existing script controls preserve phase distinctions and reconcile never reexecutes itself; function lifecycle remains new.',
'Restart session changes interact with scope authorization: same invocation reattachment needs an explicit host-mediated transfer rather than weakening scope checks.',
'Prior EAT-R253 names a parked-beforeDispatch skip/retry repair gate; reuse of that producer path must not drop the inherited gate.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:35; '+PI+'src/workbench/control-tool.ts:2-20; control-reply.ts:80-82; src/index.ts:2961-2965; docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md EAT-R253.',
'Introduce the function invocation lifecycle while preserving requested-versus-established cancellation and explicit scoped recovery; an unknown effect never becomes rollback by projection.',
'ADD_MISSING_PREMISE: define restart authorization and lifecycle transitions; preserve EAT-R253 ordering for any reused affected dispatch path, or explicitly justify a different path.')
add(124,E,'Exactly four outcomes means every host invocation completes with one of those values and no exception channel exists.',[
'The union and every normal develop return belong to the four listed kinds.',
'Invalid request checks throw; callback rejection propagates. Host admission and native uncertainty exceptions are not fifth domain kinds but are additional observable channels.',
'verified_candidate at core level requires callback evidence, not all newly proposed strict-native certificate fields.'
],MW+'packages/development/src/contracts.ts:54-58; develop.ts:9-13,21-75; apps/development-rig/src/host.ts:47-70.',
'All normal develop results use the four-domain union; thrown input/callback/admission/uncertainty errors remain separately observable and must not be collapsed into a fabricated outcome.',
'NARROW_SCOPE: explicitly say normal return results; observation bridge must preserve typed exceptions and original domain result independently.')
add(125,N,'Both repositories already share these assurance/effect enums, or Pi must rewrite a legacy producer result to match strict semantics.',[
'Pi legacy-weak/unknown differs from MW descriptor/legacy-observed/candidate-bound-native; only strict-native is common.',
'No-effect and no-dispatch are not the same evidence claim after a possible dispatch; source-code dispositions use further vocabularies.',
'Original domain result and assurance can be stored independently; MW strict conversion to indeterminate is producer behavior, not permission for Pi to rewrite arbitrary legacy returns.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:36,48; docs/mw-01-AUDIT-AND-PROOF.md:32-36; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:54,58-61; '+MW+'apps/development-rig/src/effect-intent.ts:12; progress-stages.ts:32; effect-reconciliation.ts:72.',
'Propose independent domain/assurance/effect axes, pending a joint enumeration and lossless mapping from legacy producer values.',
'SURFACE_DISAGREEMENT: ratify enum/allowed-pair mappings and one strict-assurance producer oracle; require affirmative evidence for any no-effect projection.')
add(126,E,'tool-reply/v1 is the exact literal, accepted is emitted by this tool, or invoked proves native completion.',[
'Exact envelope literal is workbench.tool-reply/v1; tool-reply/v1 is prose shorthand.',
'LaunchStatus type permits accepted/launched/refused, but execute-tool emits only launched/refused at the pin.',
'invoked=!refused is a launch-level report; completion always not-asserted. Future post-dispatch errors require explicit uncertain handling rather than current generic launch-failed collapse.'
],PI+'src/workbench/tool-replies.ts:14; execute.ts:57-69; execute-tool.ts:106-124,143-170,245-248.',
'The registered execute envelope is workbench.tool-reply/v1 with launch-only invoked/status and completion:not-asserted; accepted is a permitted type value, not a currently emitted execute status.',
'NARROW_SCOPE: use the full contract literal and distinguish type vocabulary from emitted statuses; preserve separate post-dispatch uncertainty in the new path.')
add(127,N,'The public tool already accepts scope/invocationId and can correlate all required strict proof and producer references.',[
'The pure observe request takes scope/invocationId; public tool takes taskId and injects scope with session checks.',
'In-memory projection already has freshness/gap/drop semantics but no Mechanical invocation integration.',
'Strict certificate transport and assurance authority remain unspecified: MW proposes a certificate not named by the Pi surface; current host returns domain outcome only.',
'Native events/stages and scope fields require an explicit mapping; restart observation cannot assume old session access persists.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:39; '+PI+'src/workbench/observe-query.ts:110-120; observation.ts:1-3,638-655; index.ts:2932-2968; '+MW+'apps/development-rig/src/host.ts:52; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:29-55.',
'Extend scoped observation of the same logical function invocation, retaining domain result, producer references, strict proof provenance and existing freshness/drop indicators.',
'ADD_MISSING_PREMISE: define public parameters versus injected scope, certificate transport/validator ownership, stage mapping and authorized post-restart access.')
add(128,N,'Every current NativeRef requires scope, or a nonblank producer string necessarily names a real native record.',[
'Pi NativeRef.scope is optional; future required scoping must specify host context versus producer field.',
'MW describeProducerReceipt substitutes literal uncertain into missing ID slots; it must not be copied into an addressable Pi native ref.',
'Early journal events lack native identity; null/omission must remain valid with separate evidence strength.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:39; '+PI+'src/workbench/observation.ts:2-3; '+MW+'apps/development-rig/src/host-services.ts:94-106; effect-reconciliation.ts:53; docs/pi-04-ADVERSARIAL-VERIFICATION.md:65.',
'Require native references to retain provider/type/id and authorized scope when available, never substituting diagnostic sentinels for absent IDs.',
'ADD_MISSING_PREMISE: ratify null/omitted representation and field mapping; include nonblank uncertain sentinel and wrong-scope negative controls.')
add(129,N,'The host ABI already exports a progress channel and swallowing all callback failures supplies durable correctness.',[
'Standalone developLive isolates progress throws/rejections, but current ./host signature has no progress channel.',
'Observation-sink failure is distinct from failed durable post-effect persistence; the latter must surface uncertainty, not be swallowed.',
'Callbacks as data-only is a control-authority rule, not a sandbox against arbitrary in-process callback side effects.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:40; '+MW+'apps/development-rig/src/live-development.ts:172-184; host.ts:32-43; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:59.',
'Require observer failures not to change domain outcome or trigger another effect, while separately surfacing durable-custody failures as uncertainty.',
'ADD_MISSING_PREMISE: define event sink versus durable journal interfaces and their distinct failure laws; expose the progress channel through the reviewed composed export.')
add(130,N,'The 17 proposed public categories already map consistently to Pi helpers, MW errors and operator actions.',[
'Direct census: only source-changed and writer-held occur as these literals in Pi src; other names are proposed.',
'Pi operations uses uppercase aliases; MW proposes HOST_* codes; no joint mapping or effect-boundary classification is defined.',
'Attestation, missing write request, confinement, unknown identity and stale fence need complete mappings; writer-held is not stale-generation rejection.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:43; docs/pi-05-OPERATIONS-AND-HANDOFF.md:7; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:71; '+PI+'src/workbench/source-admission.ts:68-83; function-authority.ts:159-166; complete fixed-string src/test census in this audit.',
'Propose stable public refusal/recovery categories with explicit mappings from retained Pi seam codes and producer codes, preserving pre-effect versus post-effect meaning.',
'ADD_MISSING_PREMISE: one versioned table of internal/public/operator names, custody state and recovery action for every error, including stale fence and attestation failures.')
add(131,N,'Any exception before a returned launch handle proves no effect; absent native IDs make uncertainty unreportable.',[
'Possible-effect boundary is provider receipt possibility, not successful launch return.',
'Host may deny before provider dispatch after Pi handoff; correlated durable evidence must distinguish that from death/lost acknowledgement.',
'Unknown native IDs remain absent/null, not fabricated; uncertain effect and frozen lease are still representable.',
'No auto retry does not forbid idempotent read-only event replay/reconciliation.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:44; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:58-64; '+MW+'apps/development-rig/src/host.ts:66-69; '+PI+'src/workbench/execute-tool.ts:245-248.',
'Require safe refusal only when non-dispatch is established; after possible effect retain uncertainty, known refs and ownership, with no automatic re-invocation.',
'ADD_MISSING_PREMISE: define exact effect boundary and joint intent/error recovery table; distinguish unknown IDs, effect replay and projection replay.')
add(132,E,'Unchanged HEAD plus clean status is a complete no-effect detector for this invocation.',[
'Counterexample reproduced against pinned reconciliation: ignored file remains present while HEAD/status are unchanged and code returns not-occurred/retryPermitted.',
'Positive detector control: untracked visible file produces occurred/retry denied.',
'Edit-then-restore also leaves no visible diff; this probe retains the ignored file, so it is not an independent isolation of reverted-edit semantics.',
'The direct counterexample establishes inadequacy of universal negative evidence, not the availability of a future comprehensive producer certificate.'
],MW+'apps/development-rig/src/effect-reconciliation.ts:86-99; '+probe+'mw-probe.jsonl M1-negative-evidence: pristine, ignored-effect, edit-restored, untracked-effect (real scratch Git, direct pinned source import, rc=0). Original cited effect-intent.ts alone did not entail this failure.',
'A clean HEAD/status observation cannot prove no effect: at MW 69cb016d an ignored-file effect survives while reconciliation returns not-occurred and permits retry.',
'REPLACE_SOURCE: cite effect-reconciliation.ts and the direct counterexample. ADD_MISSING_PREMISE: require qualified native non-occurrence evidence or retain unknown; no inference that current code already enforces the proposal.')
add(133,N,'The shipped ./host subpath already supplies native service composition, binding, progress, cancellation and reconciliation.',[
'Subpath exists but current options are artifacts/descriptor/services only; required channels and native provider composition are not reachable through that facade.',
'Pi says Mechanical receives four callbacks; companion says Mechanical constructs them from trusted context/factories. These can describe layers, but no composed signature/test injection seam resolves them.',
'Existing reviewed descriptor targets library develop, not the rig host; legacy entrypoint may remain only if Pi selects the reviewed composed export.',
'No Pi core import is currently found; that does not make future dependency direction self-enforcing.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:47; docs/pi-05-OPERATIONS-AND-HANDOFF.md:31; docs/mw-02-HOST-AND-EFFECT-CONTRACT.md:5-8,16; '+MW+'apps/development-rig/src/host.ts:32-43,52-65; package.json:13-20; '+PI+'src/workbench/mechanical-descriptor.ts:128-137.',
'Keep the stable public ./host dependency direction; add a ratified composed entrypoint exposing trusted binding, native services and observation/control channels without Pi importing private source.',
'SURFACE_DISAGREEMENT: settle callback/factory ownership and deterministic injection seam. ADD_MISSING_PREMISE: version export selection and expose all required channels at ./host.')
add(134,E,'The host subpath is nonexistent, four callbacks are only prose, or grep failed to detect real Pi package imports.',[
'Exports map and facade exports are directly present; bare package import is not the public code subpath.',
'DevelopmentServices has exactly four declared callbacks; arbitrary structurally extra JavaScript properties are a separate runtime question.',
'No-Pi claim is bounded to the source/manifest/import census, not runtime code assembled dynamically or future versions.'
],MW+'apps/development-rig/package.json:13-20; src/host.ts:13-21,52; packages/development/src/contracts.ts:47-52; scripts/check-structure.ts:247-278. lens-mw-src-probe/out/static-scans.txt S1/S2: complete static import census of two library trees, node:crypto only nonrelative core specifier, zero dynamic imports (prior investigator evidence); direct source reads confirm public surface.',
'At MW 69cb016d, ./host is the rig export map code subpath, the facade exports the listed entry/error/guards, and the two core source trees contain no Pi package import in the inspected static census.',
'ADD_SOURCE: cite complete import/specifier census and actual @tintinweb/pi-subagents/@earendil-works scopes, not solely a few spelling greps; preserve source scope.')
add(135,N,'The listed handshake already fixes an agreed ABI, common grammar, descriptor status and shared fixture set.',[
'Existing descriptor validators both require descriptor-only; the release status and migration are undecided.',
'MW isRepresentableGrant excludes dots while Pi action grammar accepts them; candidate spelling still works on both. Host Claude tool grants are a separate grammar, not action grants.',
'Shared input bytes alone do not agree on digest construction; source IDs/hashes, event/ref/error/assurance/effect vocabularies also need mapping.',
'G/P and Q fixture namespaces are different and no one-to-one mapping exists in the design; one authoring lineage is consistency evidence, not independent corroboration.',
'Proposed shared vectors are not a claim they already run; conflicts stay design remediations rather than empirical refutation of the proposal.'
], 'docs/pi-02-PROTOCOL-AND-RUNTIME.md:48; docs/pi-03-IMPLEMENTATION-PACKETS.md:18-19; docs/mw-03-IMPLEMENTATION-PACKETS.md H00; '+PI+'src/workbench/mechanical-descriptor.ts:108,265; function-authority.ts:215,222,224; '+MW+'apps/development-rig/src/entrypoint-host.ts:107; host-binding.ts:158; '+probe+'mw-probe.jsonl M3 and pi-probe.jsonl P5.',
'Jointly ratify a versioned ABI and fixture map before composed invocation; legacy descriptor-only records must never be silently upgraded to strict execution evidence.',
'ADD_MISSING_PREMISE: publish the ratification record covering descriptor status/export, digest construction, request mapping, source grammar, fence/live readers, error/event/ref/result/assurance mappings and joint fixture IDs; preserve legacy compatibility explicitly.')
assert {r['id'] for r in rows}=={i for i,c in claims.items() if c['material']}
assert len(rows)==49
out=W/'audit-a-protocol.jsonl'
out.write_text(''.join(json.dumps(r,ensure_ascii=False)+'\n' for r in rows))
from collections import Counter
print(out)
print(Counter(r['finalStatus'] for r in rows))
print('rows',len(rows),'bytes',out.stat().st_size)
