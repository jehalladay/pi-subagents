from pathlib import Path
import json, hashlib

ROOT = Path('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110')
OUT = ROOT / 'requirements/.work'
claims_path = ROOT / 'epistemic-triage/CLAIMS.jsonl'
claims = {r['id']: r for r in (json.loads(l) for l in claims_path.read_text().splitlines() if l.strip())}
remediation_path = ROOT / 'epistemic-triage/REMEDIATION.md'
remediations = {}
for line in remediation_path.read_text().splitlines():
    if line.startswith('| M'):
        cells = [s.strip() for s in line.strip('|').split('|')]
        if len(cells) >= 9:
            remediations.setdefault(cells[1], []).append(cells[0])
rows = []

def add(n, title, typ, authority, ids, statement, rationale, ac, tiers, packet, bead, conditions='', predecessor='', mutant='', evidence_gate=''):
    rows.append(dict(requirement=f'EAT-R{n}',title=title,type=typ,authority=authority,derived_from=ids.split(),statement=statement,rationale=rationale,acceptance=ac,verification=tiers.split(),packet=packet,bead=bead,conditions=conditions,predecessor=predecessor,mutant=mutant,evidence_gate=evidence_gate))

add(391, 'Ratify the function-input digest wire contract', 'NORMATIVE_DESIGN', 'NORMATIVE_DECISION',
    'C060 C099 C135 C146 C153',
    'The jointly versioned ABI MUST define one function-input digest construction and its exact canonical byte basis for producer and consumer comparison.',
    'C060/C099/C135/C146/C153 are NON-EPISTEMIC proposals or norms. Their flags preserve the CONTESTED three-digest premise (E164) and UNSUPPORTED cross-repository digest interoperability premise (E232): equality of JSON bytes alone does not establish equality of hashes. This requirement mandates a contract, not an assertion that the pins already share one.',
    [
        'A checked-in vector specifies canonical UTF-8 bytes, algorithm, prefix/domain including every NUL delimiter, sha256 encoding, missing-input treatment and the named function digest field. The record explicitly retains workflow-execute-input or records a versioned replacement; an unrecorded choice fails validation.',
        'Independent Pi and installed-MW vector readers compute the identical expected digest for Unicode/key-order cases. Changing task, host-resolved workspace or base commit changes identity; changing stripped notes does not.',
        'A contract table identifies how function admission, task/observe and any future detached digest fields relate to this field. The existing workflow-input and invocation-input domains are not equated with it by field name; their script behavior remains unchanged.'
    ], 'V1 V2 V3', 'MII P00', 'wb-w8fk',
    'Joint P00 / companion mw-03 H00 adoption decision required; no Pi dependency is introduced into Mechanical core.',
    'Extends MNI EAT-R203/EAT-R204; fills the new D3 wire-digest gap.',
    'Replace the producer hash with bare SHA-256 of canonical JSON; the byte-equality control passes but the shared digest vector must fail.',
    'DIGEST-WIRE-VECTORS (planned shared artifact; not an existing receipt label)')

add(392, 'Dispatch the immutable admitted payload', 'BEHAVIORAL', 'RISK_CONTROL',
    'C038 C039 C040 C041 C080 C099 C100 C149 C151 C153',
    'A function invocation MUST hand Mechanical the immutable canonical payload admitted for that invocation, rather than the caller object or a later recanonicalization of it.',
    'C038/C039/C041/C100 are ESTABLISHED at Pi 0fb90672: admission hashes a judged value, script launch structures retain raw params.input, and no function is launched. C080 is only PLAUSIBLE as a future integration leak. C040/C099/C149/C151/C153 are NON-EPISTEMIC. Risk control closes the latent composition hazard without claiming a current effectful leak.',
    [
        'Invoke the actual registered workflow_execute function route with a complete typed request. Capture bytes at both the Pi-to-installed-host entry and the Mechanical callback: assert both equal the admitted canonical bytes and both produce the persisted function digest from EAT-R391.',
        'Change the original caller object while installation is parked. The callback still receives the originally admitted payload; neither raw-object identity nor the mutation reaches it. The payload carrier is distinct from the existing input-free ExecuteAdmission, or its schema change is explicitly versioned.',
        'Assert the same function digest in durable invocation custody and workflow_observe. Run existing script-launch regression cases and assert their raw-input semantics are unchanged.'
    ], 'V1 V2 V3', 'MII P01', 'new',
    'Depends on EAT-R391 and the reviewed composed host/registered route. Admission-only green tests are prerequisite controls, not new dispatch proof.',
    'New MII D3; do not reuse closed wb-7wkb (MNI P01) or reopen closed wb-201v solely because notes are mentioned.',
    'Pass params.input instead of the admitted carrier; the registered entry-byte assertion must fail.',
    'CANONICAL-DISPATCH-V3 (planned)')

add(393, 'Omit note members without evaluating them', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C038 C060 C096 C097 C101 C152 C194',
    'Function canonicalization MUST omit the literal notes members covered by withoutBeadsNotes before any value-reading copy, so omitted notes are neither evaluated nor retained for dispatch or recovery identity.',
    'C038/C096 are ESTABLISHED for supported records/arrays at the Pi pin; they do not establish the provenance of all notes strings. C060/C097/C101/C152/C194 are NON-EPISTEMIC; the UNSUPPORTED new-red premise E169 records already-green admission-only note tests. The new evidence is at the composed/registered boundary, not a claim that the pure guard is absent.',
    [
        'For a complete typed DevelopmentRequest, vary enumerable notes, a nonenumerable notes carrier, and a notes getter that increments a counter then throws. Assert getter count zero, identical admitted/entry/callback bytes and digest, and no own notes property on the callback object.',
        'Plant notes members in supported nested records/arrays and caller policy; assert omission follows the ratified literal-key rule and the resulting function policy/input are the values measured at the new boundary.',
        'Reload the retained canonical request from invocation custody. Assert no note bytes enter the recovery identity or host plan. Do not describe arbitrary notes as authenticated Beads data.'
    ], 'V1 V3', 'MII P01', 'new',
    'Ordinary property-accessor tests are in scope. In-process Proxy traps are a separately declared limit; do not claim JSON-origin requests prove safety for arbitrary proxies.',
    'Extends EAT-R154 omission semantics at the new dispatch boundary.',
    'Use object spread/value iteration before dropping notes; the poison-getter zero-read assertion must fail.',
    'G08-REGISTERED-NOTES (planned)')

add(394, 'Preserve retained-value canonical rejection', 'NEGATIVE_REGRESSION', 'NORMATIVE_DECISION',
    'C060 C096 C097 C151',
    'The new function payload carrier MUST NOT weaken the existing canonical validator by accepting accessors in any retained member or other nonrepresentable visited input/policy forms.',
    'C096 is ESTABLISHED only for supported copying forms; C060/C097/C151 are NON-EPISTEMIC. E166 flags the proposed authority-bearing-only accessor language as CONTESTED against the pinned validator, which rejects every retained accessor. The requirement preserves that stricter guard; it does not resolve the flagged proposal by pretending it was implemented.',
    [
        'Run table-driven cases for top-level and nested retained getters, array-slot accessors, cycles, nonplain prototypes, prototype-ambiguous records and non-JSON values. Assert bounded typed refusal before host/callback entry and that retained accessors are never invoked.',
        'At the chosen canonical depth/UTF-8 limit, an in-budget ordinary JSON control is admitted and the first over-limit case refuses. Preserve the pinned depth-64 and canonical-validator 1 MiB backstop unless a versioned stricter decision is recorded.',
        'Keep the notes-getter exception from EAT-R393: an omitted notes getter is neither invoked nor a reason to weaken rejection elsewhere.'
    ], 'V1 V3', 'MII P01', 'new',
    'Transport-decoded JSON and explicitly supported in-process object forms only; Proxy-trap universality is not claimed.',
    'Retains pinned canonicalJson guards and EAT-R154 supported forms.',
    'Allow an accessor because its key is not authority-bearing; a nested retained-getter case must fail.',
    'CANONICAL-RETAINED-GUARDS (planned)')

add(395, 'Do not relabel canonical budgets as raw budgets', 'NEGATIVE_REGRESSION', 'LINGUISTIC_INTEGRITY',
    'C095 C060 C096',
    'The function route and its contract MUST NOT represent the existing canonical, notes-stripped byte limits as a raw-request-size guarantee.',
    'C095 is REFUTED: Pi 0fb90672 budgets canonical notes-stripped function values, not raw caller JSON. This row derives only a negative regression from that refutation. C060 is NON-EPISTEMIC and C096 ESTABLISHED; any new transport/raw gate requires its own explicit normative decision and cannot be inferred from C095.',
    [
        'A fixture with an admitted small canonical request and notes exceeding 64 KiB demonstrates the canonical input limit independently of raw size. Assert its digest is the same as the note-free request and document any separately adopted transport refusal as a distinct reason.',
        'On retained canonical input, assert the 64 KiB limit; on canonical function policy, assert the 4096-byte limit, including multibyte UTF-8 boundaries. A over-limit refusal invokes zero callbacks.',
        'Validate the contract/budget table names raw transport, canonical input and canonical policy as separate detection surfaces. No test or documentation labels the current canonical rule raw JSON enforcement.'
    ], 'V1 V3', 'MII P01', 'new',
    'A separate raw-size limit is permitted only through recorded adoption; existing note-identity independence is preserved. No raw limit is invented by this compile.',
    'Negative-only cure for MII C095/M089-M090; preserves EAT-R154.',
    'Measure raw function input as if it were the canonical limit, or label canonical success as raw boundedness; the budget-surface test must fail.',
    'BUDGET-SURFACE-REGRESSION (planned)')

add(396, 'Bind canonical workspace and basis to host measurements', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C059 C090 C091 C098 C152',
    'The canonical DevelopmentRequest MUST bind workspaceId and baseRevision to independently host-authorized workspace mapping and measured full base commit.',
    'C090 is ESTABLISHED for the producer three-field type and nonblank checks, not full canonical closure. C059/C091/C098/C152 are NON-EPISTEMIC. K011 remains a design fork: host injection versus caller comparison must be selected explicitly; caller bytes never establish authority.',
    [
        'The P00 decision and schema choose one surface: task-only with host injection, or caller task/workspaceId/baseRevision compared against the host mapping. Reject unknown members and nonblank-string violations before dispatch.',
        'For the comparison surface, a different workspaceId or full base commit refuses rather than silently overriding. For injection, caller basis/root members refuse as outside the surface; host-resolved values are included before canonical hashing.',
        'After a fresh host-authorized basis/workspace selection, typed basis changes alter the function digest. A caller cannot select an unauthorized root by supplying a path-like workspaceId.'
    ], 'V1 V2 V3', 'MII P01 / P03', 'new',
    'P00 must record the K011 request-surface decision. Both alternatives are specified for the decision test; implementation does not silently support both.',
    'New D3 canonical request mapping; coordinated with wb-2ukh source authority.',
    'Trust caller workspace/basis or silently replace a mismatched submitted basis; the mismatch refusal test must fail.',
    'REQUEST-BASIS-BINDING (planned)')

add(397, 'Keep write requests narrower than authorization', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C060 C089 C094 C105',
    'Function admission MUST honor the caller write policy as a request ceiling and never treat allowWrites:true, policy omission or annotations as a write grant.',
    'C094 is ESTABLISHED: allowWrites:true is a request recognized by the unwired source seam, not authorization. C060/C089/C105 are NON-EPISTEMIC; M084 leaves omission semantics for P00. This is an adopted request-ceiling obligation, not evidence that any omission rule is already shared.',
    [
        'The ratified schema chooses omission behavior explicitly. A missing/false/malformed policy follows that decision without silently converting a caller denial into allowWrites:true.',
        'With allowWrites:true and no exact host write grant, assert typed refusal and zero host domain callbacks, SDK sessions, Forge requests and writes. With a valid grant but an explicit caller write denial, the write route does not run.',
        'Note text and additional/free-text policy action members cannot widen the requested or host-admitted effect set; an admitted positive control uses the exact ratified ceiling.'
    ], 'V1 V3', 'MII P01 / P03', 'new',
    'P00 policy-omission decision required; absence is not guessed. Ratified effect vocabulary remains a producer contract dependency.',
    'Extends existing writesRequested semantics; no new generic permission grammar.',
    'Default every omitted/false policy to write-enabled, or treat caller allowWrites as authorization; a denial case must fail.',
    'REQUEST-WRITE-CEILING (planned)')

add(398, 'Ratify the single-machine lease authority interface', 'NORMATIVE_DESIGN', 'NORMATIVE_DECISION',
    'C025 C045 C062 C066 C114 C116 C156 C193',
    'The joint ABI MUST name Pi as authoritative invocation-lease owner and specify Mechanical provider-entry fence verification against that same authority for the supported same-machine topology.',
    'C025 is ESTABLISHED only over both pinned repositories: neither cross-process nor distributed lease proof exists there. C045/C062/C066/C114/C116/C156/C193 are NON-EPISTEMIC. K013/K035 leave holder, verifier and enforcement modality unresolved; prose agreement is not a token protocol. E031 refutes the embedded claim that scripts already use this seam; no such premise is adopted.',
    [
        'The joint adopted fixture defines token fields (canonical root, invocation, owner and generation), current-generation verification operation, state transitions, release authority and the lifetime of a verified write permission. Pi owns release; Mechanical does not mint a competing lease.',
        'A cross-repository fixture passes a Pi-held token to the installed composed host and validates it through a protected current-authority reader. Mismatched owner/root/invocation/generation yields zero writer calls.',
        'The contract makes provider stale-fence denial mandatory for the supported topology, names OS/filesystem/process assumptions and declares distributed or nonparticipating-writer limits. It does not call a single-process map cross-process proof.'
    ], 'V1 V2 V5', 'MII P00 / P02 / P03', 'wb-w8fk',
    'Existing wb-w8fk is blocked on deferred owner-managed wb-1zn2. Preserve that lineage; do not release the tracker or claim joint ratification in this compile.',
    'Extends MNI EAT-R207/EAT-R232/EAT-R269; operational lease implementation extends wb-2ukh.',
    'Have Mechanical accept the serialized generation without current-authority validation; the stale-token fixture must fail.',
    'LEASE-AUTHORITY-ABI (planned)')

add(399, 'Persist one authoritative cross-process root reservation', 'BEHAVIORAL', 'RISK_CONTROL',
    'C016 C042 C117 C116 C120 C156 C158 C193',
    'Admitted Mechanical function writers on one supported machine MUST acquire ownership through one durable authoritative reservation store keyed by canonical root.',
    'C016/C042/C117 are ESTABLISHED: WriterLeases is per-instance memory, no production caller instantiates it, and dispatch-settlement release is only a seam. C116/C120/C156/C158/C193 are NON-EPISTEMIC. This creates function-writer exclusion, not a repair of a claimed production script lease or a distributed guarantee.',
    [
        'Start two independent Pi processes with the same configured authoritative store, simultaneously requesting one realpath through direct/symlink/dot aliases. Exactly one acquires the writer reservation; the other receives writer-held (or the ratified bounded queue state), with aggregate writer count one.',
        'A fresh third process reads the persisted canonical root, invocation, owner, generation and custody state without access to the first process memory. Creating a second local adapter instance does not create an independent lease namespace.',
        'Record the store path, schema, locking primitive and tested filesystem in the receipt. Restart does not discard the reservation; acquisition-store failure produces no writer.'
    ], 'V1 V3 V5', 'MII P02', 'wb-2ukh',
    'Requires EAT-R398. Same-machine participating Mechanical functions only; no use of S3 Mountpoint for lock/journal random writes.',
    'Extends MNI EAT-R232 on live MNI P03 wb-2ukh; wb-s8rm is a closed historical seam carrier.',
    'Replace the authoritative store with new WriterLeases per process; the dual-process alias test must detect two writers.',
    'G07-CROSS-PID-RESERVATION (planned)')

add(400, 'Retain writer ownership after launch reply', 'BEHAVIORAL', 'RISK_CONTROL',
    'C043 C044 C081 C062 C115 C155 C156 C157 C192',
    'Function writer ownership MUST outlive launch-promise settlement while native writer effects remain possible.',
    'C043 is ESTABLISHED about the helper finally block; C044/C081/C155 are SUPPORTED conditional hazards, not observed joined incidents. C062/C115/C156/C157/C192 are NON-EPISTEMIC. C155’s script-helper facet is REFUTED (E031), so this adds a new function lifetime and preserves actual script behavior separately.',
    [
        'The registered launch returns while the producer worker is held at a first-edit barrier. Assert completion:not-asserted, reservation still active, and a second same-root function invocation in another process refused without writer entry.',
        'Exercise both resolving and rejecting dispatch promises while an already-dispatched native worker is still possible. Neither promise outcome alone transitions the lease to released.',
        'After safe terminal settlement under EAT-R403, a newly authorized invocation can acquire the root; the test retains the original invocation identity throughout the first worker lifetime.'
    ], 'V1 V3 V5', 'MII P02', 'wb-2ukh',
    'Native worker barrier and cross-process oracle required; already-green in-memory alias tests alone are insufficient.',
    'Extends MNI EAT-R232 and MII D5/G06; no existing script-lease regression is fabricated.',
    'Release in finally as soon as launch refs return; the second-process writer denial must fail.',
    'G06-LAUNCH-LIFETIME (planned)')

add(401, 'Deny stale generations at provider writer entry', 'BEHAVIORAL', 'RISK_CONTROL',
    'C061 C114 C116 C156 C157 C160 C193',
    'Every admitted provider write entry MUST deny a stale or invalid lease generation through the ratified current-authority verifier before the effect is dispatched.',
    'The cited rows are NON-EPISTEMIC. K035/E230 preserve the unresolved token/verifier interface and Pi’s where-possible versus MW’s mandatory-enforcement conflict. This requirement adopts mandatory stale-fence denial for the supported topology under risk control; it does not claim an existing fence or universal OS sandbox.',
    [
        'Pause an old worker before writer entry; perform an authorized custody transition that invalidates its generation; then resume it. Assert verifier denial and zero edit/commit/gate effects from that generation.',
        'Replay an old token with a reused PID, changed invocation or root alias. It cannot authenticate by PID/liveness alone. A current-generation positive control reaches the intended provider once.',
        'If the provider adapter cannot enforce the ratified fence at its entry, effectful readiness remains false for that topology and the receipt names the unenforced window.'
    ], 'V1 V2 V3 V5', 'MII P02 / P03', 'wb-2ukh',
    'Requires EAT-R398 and companion mw-03 H06 fence/live-reader contract. Mid-provider arbitrary filesystem writes remain an explicit containment limit unless separately enforced.',
    'Extends MNI EAT-R207/EAT-R232/EAT-R269; producer side is a named blocking dependency, not Pi-copied internals.',
    'Accept a token because its PID is live, skipping generation lookup; the resumed stale-worker test must fail.',
    'STALE-GENERATION-PROVIDER-ENTRY (planned)')

add(402, 'Keep crashed or timed-out invocations fenced', 'BEHAVIORAL', 'RISK_CONTROL',
    'C118 C119 C062 C156 C157 C174 C204',
    'Lost heartbeat, owner death or timeout after possible dispatch MUST leave invocation ownership quarantined or recovering until justified disposition, not automatically reacquirable.',
    'C118 is SUPPORTED: timeout is not proof of quiescence. C119/C062/C156/C157/C174/C204 are NON-EPISTEMIC. The target crash behavior has no joined proof at the pins; process death and power loss require different evidence and are not conflated.',
    [
        'Kill the Pi owner after first edit, after candidate commit and after Forge dispatch in separate trials. A fresh process reads the open intent/reservation, reports unknown/recovering, and refuses a second effectful invocation.',
        'Advance a test clock past heartbeat/lease timeout while the worker is paused, and simulate PID reuse. The root remains unavailable without affirmative settlement or explicitly authorized audited disposition.',
        'The receipt enumerates tested kill windows, OS/filesystem assumptions, late-worker treatment and untested power-loss behavior. A process-kill result is never labeled power-failure durability proof.'
    ], 'V1 V3 V5', 'MII P02 / P07', 'wb-2ukh',
    'Companion native effect lookup/settlement evidence is a dependency; reuse historical wb-7wkb kill/verifier machinery where applicable, retaining its not-claimed list.',
    'Extends MNI EAT-R232/EAT-R280+ custody behavior; historical cleanup trial is not a joined-host test.',
    'Delete the lease solely when heartbeat expires or owner PID dies; restart reacquisition test must fail.',
    'P18-FRESH-PROCESS-FENCE (planned)')

add(403, 'Release only on known-safe disposition', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C115 C119 C121 C131 C132 C174',
    'Pi MUST release a function reservation only through a known-safe disposition transition backed by pre-dispatch non-occurrence or native terminal quiescence/settlement evidence.',
    'C132 is ESTABLISHED: clean HEAD/status cannot prove non-occurrence, with an ignored-file counterexample at MW 69cb016d. C115/C119/C121/C131/C174 are NON-EPISTEMIC. This is a release law, not an assertion that current producer reconciliation already satisfies it.',
    [
        'A denied invocation with durable affirmative no-dispatch evidence releases its reserved generation; a terminal writer with stopped effects and matching known disposition releases through the authoritative Pi transition.',
        'Launch acknowledgment, clean HEAD, timeout, missing provider record, transport completion, or an unknown Forge result alone cannot authorize release. The reservation remains fenced in each table case.',
        'An operator override requires current recovery permission and an append-only audited override record. It is exposed as operator disposition, not fabricated native settlement or rollback; an unprivileged release request leaves custody unchanged.'
    ], 'V1 V3 V5', 'MII P02 / P07', 'wb-2ukh',
    'Exact settlement/non-occurrence evidence schema and Pi/MW record precedence must be ratified after EAT-R415. Native proof production remains Mechanical-owned.',
    'Extends MNI EAT-R232/EAT-R250 recovery custody; maintains EAT-R207 lease-owner choice.',
    'Treat clean HEAD plus no operation id as known no-write; ignored-file/lost-ack release test must fail.',
    'SAFE-RELEASE-TABLE (planned)')

add(404, 'Constrain lease exclusivity to ratified roots and topology', 'NORMATIVE_DESIGN', 'NORMATIVE_DECISION',
    'C004 C062 C120 C121 C158 C230',
    'First-release function admission MUST apply an explicit root-overlap/isolation policy within embedded same-machine execution, without claiming coverage of exempt writers or distributed hosts.',
    'The cited rows are NON-EPISTEMIC. K014 exposes all-writer versus function-only exclusivity; M116 requires nested-root behavior. C230 proposes embedded first release. No existing script writer is assumed to take the unwired lease.',
    [
        'P00 records one nested/overlapping-root policy and either dedicated roots isolated from exempt writers or a separately implemented all-writer fence. Same-realpath aliases always conflict; ancestor/descendant root cases follow the explicit policy.',
        'Two nonoverlapping dedicated roots proceed concurrently under the configured resource cap. At cap exhaustion the extra invocation has no writer effect and a bounded refusal/queue state.',
        'A distributed/fleet or detached function request is ineligible for the first release until separate topology admission and evidence exist. Capability text scopes exclusion to participating functions unless all-writer enforcement is actually tested.'
    ], 'V1 V3 V5', 'MII P02 / P00', 'wb-2ukh',
    'K014 overlap/exempt-writer decision pending P00. Existing script placements remain available with their established semantics; new function placement is narrower.',
    'Extends EAT-R207/EAT-R232 supported-topology conditions; optional MII P11 is not enabled.',
    'Key nested aliases independently or advertise distributed exclusivity from one-machine tests; the policy/capability test must fail.',
    'ROOT-TOPOLOGY-POLICY (planned)')

add(405, 'Bind production adoption to pinned joint ratification', 'BEHAVIORAL', 'RISK_CONTROL',
    'C050 C051 C105 C106 C107 C145 C135',
    'The production function route MUST obtain its action contract only through host validation of a digest-pinned joint ratification record and matching installed-host compatibility evidence.',
    'C050/C106/C107 are ESTABLISHED about the unadopted default and helper minting, not enforced ratification; C145 is SUPPORTED for the proposed spelling. C051/C105/C135 are NON-EPISTEMIC with UNSUPPORTED ratification-event flags E028/E216. This closes the missing gate without treating MW-CONTRACT as an existing receipt.',
    [
        'The host-owned ratification record names both full source pins, descriptor/schema/status/export choices, mechanical.development.develop.v1, exact mechanical:develop-write, EAT-R391 digest vectors, EAT-R398 lease authority and installed-host evidence digests. Unknown/missing/altered records refuse readiness.',
        'Production registration cannot enable dispatch with the unadopted default, caller-built adoption data, or a minted helper contract unbound to the record. A module/call-site census names the sole protected production adoption path.',
        'A valid matching record enables the fixture path; changing artifact/schema/grant spelling invalidates that adoption. The receipt distinguishes contract approval from each invocation’s current permission decision.'
    ], 'V1 V2 V3', 'MII P00 / P03', 'wb-w8fk',
    'Blocked by existing wb-1zn2 external-gate lineage and explicit joint record. Evidence labels are defined by the record, not fabricated native IDs.',
    'Extends MNI EAT-R203/EAT-R204/EAT-R205; production enforcement extends wb-2ukh.',
    'Call adoptFunctionActions directly in production without checking ratification; missing-record dispatch test must fail.',
    'RATIFICATION-ADOPTION-BOUNDARY (planned)')

add(406, 'Protect the live authority source from writer influence', 'BEHAVIORAL', 'RISK_CONTROL',
    'C059 C091 C092 C196',
    'Function authority, budgets, profiles and lease verification MUST originate in protected host state that the admitted writer cannot alter or replace through its authorized workspace.',
    'C059/C091/C092/C196 are NON-EPISTEMIC; M059/M086/M205 identify a conditional writable-settings trust risk, not an observed joined exploit. The norm requires a protected trust source and does not claim prompt filters provide an OS sandbox.',
    [
        'Forge caller grants, root, principal/session, invocation, profile, artifact path or effect budget in tool JSON/notes/annotations. Assert none becomes trusted authority and no denied invocation reaches effects.',
        'A host configuration that places live permission/lease authority inside the writable root or writable alias refuses readiness unless an independently tested protection mechanism prevents writer mutation.',
        'Attempt to mutate/replace the authority source through the allowed writer interface; observe denial or the independently enforced protection. A current-host grant read remains unchanged; distinguish this test from request-field forgery.'
    ], 'V1 V3 V5', 'MII P03', 'wb-2ukh',
    'Trust-store placement/protection must be selected by host configuration. Do not weaken service auth or claim unrestricted filesystem containment from a fixture.',
    'Extends MNI authority/source composition and MII I2/G10.',
    'Use caller permissions or a writer-controlled settings file as current authority; the forged/mutated trust-source test must fail.',
    'HOST-TRUST-SOURCE-INTEGRITY (planned)')

add(407, 'Require exact current execute and write grants', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C013 C051 C093 C105 C106 C111 C145 C160',
    'Each function effect handoff MUST require current trusted workbench:execute and the exact adopted mechanical:develop-write for the reviewed definition, with stable principal/session.',
    'C013/C093/C106/C111 are ESTABLISHED for module capability and candidate constants, not production wiring. C145 is SUPPORTED; C051/C105/C160 are NON-EPISTEMIC. The requirement is conditional on EAT-R405 adoption and does not treat candidate syntax as joint approval.',
    [
        'With both exact grants, stable host identity and all other prerequisites valid, the admitted fixture reaches one callback. Remove either grant, supply only a broader/suffixed/wrong-namespace action, or change principal/session: assert typed refusal and zero provider effect.',
        'Grant data absent, malformed or unknown is denied, not interpreted as empty success. Relevant known provider grants may exist in the host set but do not substitute for mechanical:develop-write or widen the effect plan.',
        'Park installation/admission, revoke the action or execute grant, then continue. Re-read the trusted store and refuse before writer entry. Caller fake grants never satisfy the condition.'
    ], 'V1 V2 V3', 'MII P03', 'wb-2ukh',
    'EAT-R405 ratification required. First release embedded; detached workbench:detach remains a future separately admitted condition.',
    'Extends existing dispatchFunctionWithAuthority seam and MNI EAT-R204/R224+; no existing green seam is relabeled registered proof.',
    'Accept action-prefix matches or skip the post-wait read; the suffixed-grant/revocation fixture must fail.',
    'EXACT-GRANTS-V3 (planned)')

add(408, 'Mint host-owned source attestations through an explicit channel', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C109 C110 C160 C103',
    'The composed function host MUST obtain source-write attestation from a specified protected operator/host channel bound to the measured canonical root and source identity.',
    'C110 is ESTABLISHED for suite-scoped source checks, including a host-selected manifest. C109/C160/C103 are NON-EPISTEMIC; E157 flags missing production attestation minting as CONTESTED. Existing source admission rejects absent attestation; it cannot become usable merely by composing helpers.',
    [
        'The adoption/configuration record names the operator action or trusted host channel, current authorizer and attestation lifetime. A valid channel mints a source identity attestation; no tool-input object is accepted as minted authority.',
        'Absent, forged, stale or other-root attestation refuses before writer entry. An attestation to the measured root/commit/tree/manifest admits a positive control.',
        'After an async wait, changed source or changed authorization invalidates the attestation. Neither copying its serialized fields nor changing a symlink can preserve authority.'
    ], 'V1 V2 V3', 'MII P03', 'wb-2ukh',
    'P00 must choose the production minting channel or explicitly supersede the inherited attestation rule with a recorded equivalent; this compile does not drop it silently.',
    'Extends live source composition using closed wb-s8rm/WriteBoundaryAuthority lineage.',
    'Treat a matching caller-shaped attestation as minted, or omit the rule; forged-attestation test must fail.',
    'HOST-SOURCE-ATTESTATION (planned)')

add(409, 'Carry live authority readers to the producer effect boundary', 'BEHAVIORAL', 'RISK_CONTROL',
    'C048 C049 C061 C103 C111 C113 C114 C160 C162',
    'The Pi-to-Mechanical trusted context MUST allow the composed producer to revalidate current authority/source/fence after its own asynchronous preparation and immediately before provider effect entry.',
    'C048/C113 are SUPPORTED architectural inferences; C111 is ESTABLISHED only for grants/identity helper checks. The remaining rows are NON-EPISTEMIC. E227 REFUTES the embedded premise that Pi A5 is necessarily the last check: Mechanical performs later async install/preparation. This requirement does not assume that refuted sufficiency; it mandates producer-side live validation as risk control.',
    [
        'In an installed-host test, park producer preparation after Pi handoff, then revoke a grant/change identity, change source or invalidate fence in separate cases. A protected live-reader/verifier sees each change and zero writer callbacks occur.',
        'A serialized binding or captured grant/source snapshot alone cannot satisfy the current-read contract. Invalid/unavailable readers fail closed, and writer-controlled callbacks cannot replace them.',
        'The receipt names which Pi and Mechanical modules enforce each boundary and the remaining check-to-effect window. A passing test asserts only enumerated mutation windows, not globally atomic behavior.'
    ], 'V1 V2 V3 V5', 'MII P03 (joint companion mw-03 H06)', 'wb-2ukh',
    'Blocked on Mechanical-owned authorized composed host/live-reader API through the reviewed public host subpath. Pi must not copy private producer implementation.',
    'Extends MNI integrated-chain work; corrects MII final-boundary ownership inflation.',
    'Freeze authority at Pi A5 and pass snapshots only; after-handoff revocation test must fail.',
    'PRODUCER-FINAL-LIVE-READ (planned)')

add(410, 'Remeasure source at stage-appropriate final boundaries', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C061 C098 C109 C110 C160 C161 C200',
    'The composed host MUST compare current canonical root, Git basis/cleanliness and forge.toml identity against the authorized stage-specific source basis before a new effect.',
    'C110 is ESTABLISHED for enumerated pure source checks at Pi 0fb90672; C061/C098/C109/C160/C161/C200 are NON-EPISTEMIC. Existing green wait tests do not prove new installed/registered windows. Initial source and legitimate committed candidate are distinct stages, so a static base-only check is insufficient.',
    [
        'Before first writer entry, compare realpath root, full HEAD commit/tree, clean status, host attestation and explicit forge.toml hash with the admitted basis. Mutate each during install/wait, including moved symlink and tracked/untracked dirt: refuse with source mismatch and zero writer effects.',
        'After an authorized candidate commit, a later gate uses the authorized candidate stage rather than treating any HEAD change as legitimate or permanently requiring initial HEAD. The source-stage transition is explicitly recorded and forge.toml remains bound to the approved manifest.',
        'Wrong workspace mapping, unauthorized stage transition or manifest substitution refuses; an unchanged valid basis reaches the intended callback. Keep the current pure source checks as regression controls.'
    ], 'V1 V2 V3', 'MII P03', 'wb-2ukh',
    'Producer defines candidate/gate stage proof; this row consumes its ratified mapping and does not implement Forge strict-proof semantics in Pi.',
    'Extends MNI EAT-R225+ source admission; MII P03/P14.',
    'Compare only HEAD or accept every post-handoff HEAD change as a candidate; the manifest/dirt/stage mutation tests must fail.',
    'STAGE-SOURCE-REVALIDATION (planned)')

add(411, 'Enforce the composed admission dependency order', 'NORMATIVE_DESIGN', 'NORMATIVE_DECISION',
    'C103 C104 C109 C112 C113 C114 C139 C140 C142 C163 C168',
    'The registered function dispatcher MUST enforce one explicitly assigned ordered admission chain whose dependent effect cannot run before its prerequisites are established.',
    'C104 is ESTABLISHED only for descriptor/artifact seam checks; C113 is SUPPORTED non-atomicity. C103/C109/C112/C114/C139/C168 are NON-EPISTEMIC. C140/C142/C163 are UNSUPPORTED label identities/dependencies and cannot establish an implementation DAG. The obligation adopts an explicit DAG, without assuming that P04 composed admission and P04 installed-host review are the same work.',
    [
        'A ratified trace enumerates resolve reviewed definition/closure, host intent/scope, adoption and exact grants, measured source/attestation, durable reservation, installed closure/provider readiness, durable intent and final live recheck before effect. Trace validation rejects effect entry with any unestablished prerequisite.',
        'The joint dependency table names Pi composition owner plus installed-host review separately and keys Mechanical dependencies by companion file/section and real work identity, not bare H01/H02 tokens. P05 remains blocked until the specific public composed-host prerequisites exist.',
        'Inject a wait at each preparation/persistence point. The next effect requires a current recheck or fence under EAT-R409; the contract describes residual windows and never labels independent helpers one ACID transaction.'
    ], 'V1 V2 V3', 'MII P03 / P05 (P04 installed-host prerequisite)', 'wb-2ukh',
    'P00 joint DAG/identifier ruling needed. Installed runtime closure is compiled by the artifact/runtime workstream; this row enforces its readiness as a prerequisite.',
    'Extends live wb-2ukh integrated chain and wb-4bxo dispatch sequencing; does not duplicate wb-y0n6 installed-consumer work.',
    'Dispatch before an intent write or use an unordered bag of helpers; ordered-trace mutation must fail.',
    'COMPOSED-ADMISSION-TRACE (planned)')

add(412, 'Enable only the genuine registered reviewed function branch', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C007 C008 C009 C011 C047 C065 C089 C167 C168 C169 C230',
    'Pi MUST route only the reviewed embedded mechanical.development.develop.v1 through the actual registered workflow_execute function branch after composed admission.',
    'C007/C008/C009/C011/C047/C167 are ESTABLISHED at the Pi pin: registration is backend-conditional and function execution absent. C065/C089/C168/C169/C230 are NON-EPISTEMIC. The target is a new route, not a shell/script alias or proof from direct MW fixtures. C169’s native-ref prerequisite is not assumed: missing producer IDs stay absent.',
    [
        'Load the real Pi extension with its valid workbench backend/native prerequisites, locate the registered tool and invoke kind=function with the adopted reviewed request. The installed producer function is reached exactly once, and the dispatch trace satisfies EAT-R411.',
        'Unknown definition/schema/export, furnace-formula, arbitrary function, unsupported host placement or missing adoption/permission gives zero function callbacks and a bounded refusal. The host uses only reviewed artifact/public host admission, not model-selected imports.',
        'Launch returns a truthful host-minted invocation address and workbench.tool-reply/v1 completion:not-asserted while the worker continues. Real native refs are included only if observed; an empty truthful list is not replaced with a synthetic id. Existing script, detached-script and standalone subagent tests remain green.'
    ], 'V1 V2 V3', 'MII P05', 'wb-4bxo',
    'EAT-R391–411 relevant prerequisites plus EAT-R413 gating. Backend-conditional registration is a stated test precondition. V3 deterministic callbacks make no V4 native-provider claim.',
    'Extends MNI P04 on live wb-4bxo, not live bead labels that merely share MII P05 numbering.',
    'Replace actual registration with a helper call or script wrapper; the registration/branch oracle must fail.',
    'REGISTERED-FUNCTION-V3 (planned)')

add(413, 'Keep the known cancellation ordering gate on effectful readiness', 'NEGATIVE_REGRESSION', 'RISK_CONTROL',
    'C017 C123 C168 C174',
    'Effectful function readiness MUST remain disabled or fixture-only while a reused dispatch path can lose the pending skip/retry during parked beforeDispatch.',
    'C017 is ESTABLISHED with the known cancellation-defect qualification. C123/C168/C174 are NON-EPISTEMIC; M014/M121/M174 and E013 carry the witnessed wb-9v02 repro/EAT-R253 ordering. Closed wb-9v02 is a repro carrier, not a completed repair. This preserves the inherited gate rather than fabricating a live repair bead or a fixed runtime.',
    [
        'Reuse the existing parked-beforeDispatch repro and record the pre-repair observed-violation output. For a reused affected path, native function readiness stays false until a source-pinned EAT-R253 repair receipt demonstrates pending skip/retry prevents a late SDK start.',
        'If implementation uses a genuinely independent dispatch path, record that explicit design decision and run an equivalent registered-route barrier test; a skip/retry while parked yields zero late writer/SDK starts. Do not silently waive EAT-R253 by renaming the path.',
        'Remove the readiness dependency in a mutant build with the witnessed path unchanged; the effect-enablement gate test must turn red. No new tests claim the closed repro itself fixed the defect.'
    ], 'V1 V3 V5', 'MII P05 / P07', 'new',
    'New live repair/gate carrier required after a fresh bead census; wb-9v02 and wb-3121 are closed evidence carriers, not safe Maps-to live targets.',
    'Preserves MNI EAT-R253 and prior EAT-R160; implementation repair remains test-first from the witnessed red.',
    'Mark readiness true because wb-9v02 is closed; the pending-skip native-start gate must fail.',
    'EAT-R253-READINESS-PRECONDITION (planned extension, not a new pass)')

add(414, 'Retain existing task and journal custody lineage', 'NORMATIVE_DESIGN', 'NORMATIVE_DECISION',
    'C122 C154 C168 C173 C174',
    'Function invocation custody MUST reuse the existing Workbench task/observation store and workflow journal lineage unless an explicit recorded supersession of their inherited requirements is adopted.',
    'C173 is SUPPORTED overall, with ESTABLISHED Pi adapters/journal and nonintegrable producer lookup facets. C122/C154/C168/C174 are NON-EPISTEMIC. E046/E178 REFUTE their embedded no-journal gloss: script journals exist but tmpdir/append-without-fsync is not function restart/power-failure proof. This norm preserves EAT-R239/R250, not a claim of current function storage.',
    [
        'The implementation decision names existing task/observe and journal modules extended for function state. A registered invocation and workflow_observe address share the same host invocation ID; no hidden parallel task authority is introduced.',
        'If a new durable adapter/store is necessary, its ratification explicitly supersedes the incompatible portions of EAT-R239/R250 with reasons and specifies authoritative migration/projection ownership. Without that record the cut fails the module/storage census.',
        'The function journal’s configured durable local location, access rules and retention survive the declared restart model, rather than inheriting tmpdir cleanup exposure. Existing script journal and task behavior remain regression controls.'
    ], 'V0 V1 V3 V5', 'MII P05 / P07', 'wb-mwsy',
    'P00 storage decision required; accepting a new adapter does not permit a second hidden task authority. Parent compile must coordinate wb-4bxo task registration.',
    'Preserves/explicitly supersedes only by decision MNI EAT-R239 and EAT-R250; extends live wb-mwsy.',
    'Add a private function task map unseen by existing observe or use a purgeable temp journal as declared durable custody; the identity/restart census must fail.',
    'FUNCTION-CUSTODY-LINEAGE (planned)')

add(415, 'Acquire the missing joint intent-correlation contract', 'VERIFICATION', 'EVIDENCE_ACQUISITION',
    'C112 C122 C173 C174',
    'Before recovery is enabled, the teams MUST produce inspectable evidence settling the Pi-journal/Mechanical-intent identity, custody and lookup contract for one logical invocation.',
    'C112/C122/C174 are NON-EPISTEMIC with E228 UNDETERMINED embedded intent-correlation premises. C173 is SUPPORTED overall: Pi adapters exist, MW intent functions are module exports only; package reachability is REFUTED and invocation-keyed lookup UNSUPPORTED. This row explicitly acquires the missing contract/evidence instead of assuming an integrable lookup or choosing recovery precedence by inference.',
    [
        'Produce a versioned joint record naming Pi admission/dispatch intent ID, Mechanical provider intent ID, their correlation with invocation/source/fence, each store owner/path/lifetime and authoritative recovery precedence. State whether IDs are shared or distinct; no ambiguous receipt intentId remains.',
        'From a fresh independently installed consumer through the ratified public host API, query one invocation and distinguish present-open, present-settled, absent-with-complete-no-dispatch evidence, absent-with-unknown dispatch and corrupt/unreadable record. Preserve the raw producer response plus both source/artifact pins.',
        'Run a cross-record table where Pi intent/dispatch marker exists but MW intent is absent due to pre-provider refusal or process death. Evidence must distinguish the cases or explicitly retain unknown/fenced. Record which cases are settled and which remain unresolved; recovery readiness cannot pass while material cases lack a rule/witness.'
    ], 'V1 V2 V3 V5', 'MII P07 (companion mw-03 H02 / H07)', 'wb-mwsy',
    'Named missing artifacts: joint intent-correlation/precedence specification, invocation-addressable public lookup, and fresh-process cross-record fixtures. No private src import or guessed subpath substitutes for the public API.',
    'Extends MNI EAT-R250 custody and live wb-mwsy; carries the actual MW public-export blocker, not the stale absent-host-subpath premise.',
    'Treat MW record absence as no-dispatch regardless of Pi dispatch marker; the absent-with-unknown table must fail.',
    'JOINT-INTENT-CORRELATION-EVIDENCE (planned acquisition; unresolved at compile)')

add(416, 'Persist correlated intent before possible dispatch', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C112 C122 C131 C174 C204',
    'The function host MUST durably record the correlated intent required at its dispatch boundary before permitting the corresponding effect handoff.',
    'The cited rows are NON-EPISTEMIC. E228 remains UNDETERMINED about correlation/precedence and is handled by EAT-R415; this row is conditional on that decision, not evidence that it exists. E046/E178 preserve the existing script write-ahead mechanism while limiting its fsync/tmpdir assurance.',
    [
        'After EAT-R415 settles identifiers, instrument persistence acknowledgment and provider dispatch. Assert the required Pi intent precedes Pi handoff and the correlated producer intent precedes writer/gate handoff; a failed required write prevents the matching effect.',
        'On the declared local OS/filesystem, inject file write, fsync, rename/append commit and required parent-directory durability failures according to the chosen journal primitive. Pre-effect failure yields typed refusal and zero provider effects; a post-effect persistence failure yields unknown with retained reservation.',
        'Kill at intent-before-dispatch and dispatch-before-ack barriers, restart in a new process and read the surviving correlated markers. State the demonstrated failure model; fsync calls/process-kill tests alone do not assert measured power-loss survival.'
    ], 'V1 V3 V5', 'MII P07', 'wb-mwsy',
    'Blocked on EAT-R415 and EAT-R414 durable storage choice. MW owns its provider intent persistence; Pi consumes acknowledgment/correlation, never copies producer internals.',
    'Extends MNI EAT-R250; strengthens function-specific persistence without weakening script regressions.',
    'Warn and proceed when function intent persistence fails, or dispatch before acknowledgment; zero-effects fault-injection test must fail.',
    'INTENT-BEFORE-EFFECT (planned)')

add(417, 'Replay journal events idempotently without replaying effects', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C064 C122 C174 C202',
    'A function projection rebuilt from durable events MUST deduplicate by event identity and never dispatch effects as a consequence of projection replay.',
    'All cited rows are NON-EPISTEMIC. K020 distinguishes allowed event/projection replay from forbidden automatic effect replay. E046/E178 refute absence of all existing journals; E169 makes clear green in-memory ingest tests are not fresh-process durability evidence.',
    [
        'Persist each observed event with event ID, logical invocation/source pin, monotonic local sequence and evidence strength. Native refs are optional until genuinely observed; source refs are not fabricated to fill early events.',
        'Rebuild in a fresh process from duplicate and out-of-order/late terminal events. Assert deterministic projection under the ratified order/gap policy, one effective application per event ID and zero new SDK/gate/writer calls.',
        'Unknown event/schema versions, conflicting duplicate content or a corrupt tail produce typed unresolved/gap state under the ratified policy, not silent settled success. Replaying release_complete cannot release an unrelated generation.'
    ], 'V1 V3 V5', 'MII P07', 'wb-mwsy',
    'Event vocabulary/stage mapping is a joint ABI dependency; observation bridge supplies producer-qualified events, not invented local facts.',
    'Extends MNI journal/reconcile work; keeps projection replay separate from effect retry.',
    'Invoke the producer while rebuilding a dispatch_requested row, or count a duplicate twice; replay effect-counter/projection test must fail.',
    'P16-DURABLE-EVENT-REPLAY (planned)')

add(418, 'Keep invocation lifecycle and cancellation transitions evidence-driven', 'BEHAVIORAL', 'NORMATIVE_DECISION',
    'C064 C123 C124 C125 C174 C224',
    'Function lifecycle/control transitions MUST preserve uncertainty until evidence establishes completion or cancellation, independently of the producer domain result.',
    'C124 is ESTABLISHED for normal four-way develop results, not thrown failures. C064/C123/C125/C174/C224 are NON-EPISTEMIC; K008/K020 require distinct axes/replay meanings. This is a transition contract, not proof that existing controls already target joined native invocations.',
    [
        'Validate the ratified transition table for admitted/reserved/dispatched/observing/completed_known/outcome_unknown/reconciling/operator_action_required. Launch success alone cannot transition to completed_known; thrown admission/callback errors remain typed, not fabricated domain results.',
        'For pre-effect cancellation, establish no dispatch and safe disposition; after possible effect, cancel requested is distinct from cancel established. Double stop, late acknowledgment or missing native identity cannot produce rollback/completion without affirmative evidence.',
        'Control resolves the exact invocation/native target under current scope/recovery permissions. Cross-principal or wrong-target actions mutate no state and invoke no producer control. A normal domain result is preserved independently of invocation/effect state.'
    ], 'V1 V3 V5', 'MII P07', 'wb-5a7k',
    'Joint enum/native-control mapping and EAT-R413 readiness gate required; strict-assurance proof projection is owned by the observation/verification workstream.',
    'Extends live wb-5a7k controls and MNI EAT-R251/R253 ordering, not closed repro status.',
    'Set cancel established or completed_known on control transport success; lost-ack transition test must fail.',
    'SCOPED-LIFECYCLE-CONTROL (planned)')

add(419, 'Map refusal codes without losing effect custody', 'REPRESENTATION', 'NORMATIVE_DECISION',
    'C085 C126 C130 C131 C224',
    'The versioned function refusal/recovery mapping MUST preserve whether non-dispatch is established or effects remain possible when translating internal, producer and operator codes.',
    'C126 is ESTABLISHED for workbench.tool-reply/v1 launch-only semantics. C085/C130/C131/C224 are NON-EPISTEMIC; K009 records incompatible public/operator/HOST_* spellings. A mapping is mandated, not inferred from similar names; native-gate-unestablished is not automatically safe no-effect.',
    [
        'A machine-readable table covers each pi-02 public category, retained Pi seam code and producer HOST_* code, including stale fence, attestation and persistence faults. Each entry specifies public/operator name, pre/post-effect class, custody transition and authorized next action.',
        'Golden fixtures for pre-effect denial show invoked:false/refused with completion:not-asserted and zero effect counters. Post-dispatch abort/lost acknowledgment retain invocation, known native refs and frozen lease with uncertainty, regardless of the translated label.',
        'Unknown codes remain typed unknown/unmapped with conservative custody; no raw paths/secrets leak and no same-spelling alias silently changes semantics. Operator help uses the same versioned mapping rather than an independent success/refusal oracle.'
    ], 'V1 V2 V3', 'MII P05 / P07', 'wb-4bxo',
    'Joint P00 code vocabulary ruling required; observation/operator workstream consumes this table. No change to existing script outer-envelope semantics.',
    'Extends MNI registered dispatch/error contract and live wb-4bxo; coordinates wb-5a7k recovery help.',
    'Translate HOST_EFFECT_UNKNOWN to safe refused/released; post-effect custody fixture must fail.',
    'REFUSAL-CUSTODY-MAPPING (planned)')

add(420, 'Reconcile the same invocation without blind effect retry', 'BEHAVIORAL', 'RISK_CONTROL',
    'C064 C083 C131 C132 C173 C174 C190 C191 C197 C204',
    'Recovery of an unknown function effect MUST use authorized read-only native reconciliation of the same invocation and MUST NOT automatically reinvoke writer or Forge effects.',
    'C083 is SUPPORTED as lost-ack possibility; C132 is ESTABLISHED that clean HEAD cannot establish non-occurrence, reproduced with an ignored-file effect. C173 is SUPPORTED with package-lookup gaps retained; the remaining rows are NON-EPISTEMIC. Recovery is conditional on EAT-R415 public evidence, not assumed from module exports or a clean tree.',
    [
        'Kill/loss-of-ack after edit, restored bytes, ignored/untracked effect, candidate commit and gate dispatch in separate registered trials. Restart, match invocation/source/fence and use read-only producer lookup. Assert no additional writer/SDK/gate attempt and retain known native refs/unknown custody.',
        'A provider not-found response without complete invocation/effect/window lookup remains unknown; clean HEAD/status or absent operation ID is insufficient. Qualified affirmative native occurrence/non-occurrence evidence is retained with provider identity and lookup completeness.',
        'Reattach a still-running producer under current recovery scope to the same logical invocation, not a new invocation. Any new effect attempt requires a distinctly new authorized attempt after safe disposition; ambiguous/corrupt/wrong-scope records remain fenced/operator-action-required.'
    ], 'V1 V2 V3 V5', 'MII P07', 'wb-mwsy',
    'Blocked on EAT-R415 exported lookup and correlation, EAT-R403 release law and companion mw-03 H02/H07 native disposition. No Pi private MW import or producer-logic copy.',
    'Extends MNI effect/journal/reconcile requirements on live wb-mwsy; actual controls coordinated with wb-5a7k.',
    'Permit retry solely from clean HEAD or provider not-found; ignored-effect/lost-ack test must show a forbidden second effect and fail.',
    'NO-BLIND-EFFECT-REPLAY (planned)')

assert [r['requirement'] for r in rows] == [f'EAT-R{n}' for n in range(391,421)]
for r in rows:
    assert r['type'] in {'NORMATIVE_DESIGN','BEHAVIORAL','NEGATIVE_REGRESSION','VERIFICATION','REPRESENTATION','INSTRUMENTATION'}
    assert r['authority'] in {'NORMATIVE_DECISION','RISK_CONTROL','EMPIRICAL_REPAIR','EVIDENCE_ACQUISITION','LINGUISTIC_INTEGRITY'}
    assert all(cid in claims for cid in r['derived_from'])
    r['epistemic_basis'] = [{'id':cid,'kind':claims[cid]['kind'],'status':claims[cid]['status'],'source':claims[cid]['provenance'],'scope':claims[cid]['scope'],'temporal_context':claims[cid]['temporal_context']} for cid in r['derived_from']]
    r['embedded_premise_flags'] = [{'claim':cid, **f} for cid in r['derived_from'] for f in claims[cid].get('embedded_premise_flags',[])]
    r['remediation_ids'] = sorted({mid for cid in r['derived_from'] for mid in remediations.get(cid,[])})

header = '''# MII r-core atomic requirements

**Phase 10 compile input for the parent workflow; not an implementation or test-pass report.**

Range: **EAT-R391–EAT-R420**, 30 requirements. Scope: Pi-owned D3 canonical identity; D5 invocation ownership; D6/D9 composed authority/routing; protocol and state-machine custody. All requirements are P0 for the target first release. MII packet labels are planning labels, never Beads IDs.

## Pinned basis and compilation rules

- Document pin: Pi `3fc0ead1e99f854365fd4226f582eaf4f19f8858`, `docs/pi-README.md` and `pi-01..pi-05`; MW companion is context, not independent corroboration.
- Empirical environment pins: Pi `0fb9067262532289104417d2b7f2f25704563a75`; MW `69cb016dd293a17bcc893f2baf410a51c226f4c9`. Ledger adjudicated 2026-11-11. Claims do not silently transfer to later tips. Re-pin before implementation and append evidence deltas if any status changes.
- Authoritative compile sources: `epistemic-triage/CLAIMS.jsonl`, `REMEDIATION.md`, conditional `ARBITRATION-2026-11-11.md`, and the cited program sections. The JSONL map retains complete claim scope/time/source, embedded flags and remediation IDs. A row's NON-EPISTEMIC status never upgrades its empirical premises.
- Existing baseline: registered function execution is absent at the Pi pin; source/authority/descriptor guards are existing-but-unwired seams. WriterLeases is **registry-instance-local memory**, not a current script lease or a cross-process lock. Its conditional launch-settlement hazard is not an observed joined production incident.
- First release is proposed **embedded same-machine** execution among participating Mechanical function writers. Unknown descriptor status/export, request-surface/policy choices, overlap policy, live trust channel and Pi/MW intent precedence are explicit joint decision/evidence gates. No undefined attached placement, distributed guarantee, implicit detached/Furnace/HX/RF enablement or OS-sandbox claim.
- REFUTED C095 contributes only to negative EAT-R395. Refuted facets (script lease use, no journal, Pi-only final-boundary sufficiency, integrable private lookup) are never positive premises. UNSUPPORTED DAG labels motivate an explicit normative decision, not a claimed existing graph.
- Material UNDETERMINED embedded intent-correlation premise E228 is routed to **EAT-R415 / EVIDENCE_ACQUISITION**. Behavior depending on it remains blocked pending its evidence. No current recovery contract is invented.
- Pin-preserving documentation repairs are insert annotations after complete pinned sections; owner Pi Workbench (James Halladay) controls any pin advance. This compilation neither edits those documents nor advances a pin.

## Execution and evidence conventions

Acceptance criteria below are planned assertions, not executed results. Implement with agentic-tdd: L0 traceability → L1 shell actual entrypoint → L2 fresh external installed consumer → L3 real framework composition → L4 behavior/OOD/round-trip units → broader lifecycle/fault tests → L9 coverage → L10 adversarial gate. Each row has a named falsifier; no missing-import red or already-green seam test counts as its new behavior red. A denied path is tested alongside an actually admitted positive and guard-removal mutant, so zero callbacks is not proved merely by today's universal function refusal.

Counters/detection surface: admission faults use independent host-entry/domain-callback/SDK-session/Forge-request counters plus tracked, untracked and ignored-path workspace snapshots. These demonstrate zero effects only within the declared fixture/provider surface. Native-stage trials require producer-native refs/logs, not echoed expected text. The implementer records command, exit, full source pin, installed digests, fixture and mutant outcome. Planned gate labels below are **test artifact names to be created**, not claims that receipts already exist.

MII evidence ladder: V0 pinned inspection; V1 focused/property/mutation; V2 independently packed installed host; V3 actual registered Pi function plus same-invocation observe with deterministic callbacks; V4 registered native Claude/Git/strict Forge; V5 interruption/restart/resource trials; V6 separately admitted optional topology. These are **not** agentic-tdd L0–L10. This core slice does not claim V4 or strict-PASS attainability; those belong to native-proof/release compilation. V1/V2 alone never satisfy a stated V3/V5 closure.

Bead mapping is verified from the pinned `.beads/issues.jsonl` export and corroborated by the lineage lens, not a current live-DB claim. At the pin: `wb-w8fk`, `wb-2ukh`, `wb-y0n6`, `wb-4bxo`, `wb-mwsy`, `wb-5a7k` are open; `wb-1zn2` is deferred owner-managed; `wb-7wkb`, `wb-s8rm`, `wb-9v02` are closed historical carriers. Parent bead generation must re-read the live DB before append-amending or filing. MII P01 has **no** MNI carrier: Maps-to new, not closed same-numbered `wb-7wkb`. MII P02/P03 extend `wb-2ukh`; MII P05 extends `wb-4bxo`; MII P07 extends `wb-mwsy`/`wb-5a7k`. Do not duplicate live packets or replace their notes.

'''
parts = [header]
for r in rows:
    basis = '; '.join(f"{b['id']} {b['status']}" for b in r['epistemic_basis'])
    parts.append(f"## {r['requirement']} — {r['title']}\n\n")
    parts.append(f"- Type: {r['type']}\n- Authority: {r['authority']}\n- Priority: P0\n- Statement: {r['statement']}\n")
    parts.append(f"- Rationale: {r['rationale']} Audited basis: {basis}. All empirical statements retain the environment pins above.\n")
    parts.append(f"- Derived from / remediation: {', '.join(r['derived_from'])}; {', '.join(r['remediation_ids']) or 'no remediation row (direct adopted norm)'}.\n")
    parts.append('- Executable acceptance criteria:\n')
    for i,a in enumerate(r['acceptance'],1): parts.append(f"  {i}. {a}\n")
    parts.append(f"- Negative mutant: {r['mutant']}\n")
    parts.append(f"- V-tier: {', '.join(r['verification'])}; planned evidence artifact `{r['evidence_gate']}`.\n")
    parts.append(f"- Conditions / unresolved gates: {r['conditions'] or 'None beyond the scoped prerequisites.'}\n")
    parts.append(f"- Maps-to: {r['packet']}; {'new' if r['bead']=='new' else 'LIVE bead '+r['bead']+' (extend; re-read live DB before mutation)'}.\n")
    parts.append(f"- Predecessor lineage: {r['predecessor']}\n\n")

parts.append('''## Handoff boundaries and completeness

This is the assigned r-core slice, not the final all-program requirement set. The parent compiles installed executable closure, native Forge assurance/attainability, full observation provenance/bounds, provider progress, native acceptance, load/soak, identifier/DAG reconciliation and release/docs into adjacent slices. Core readiness depends on those producer-owned artifacts where stated; they are not silently waived or implemented by copying MW private source. The unsupported bare H-label dependency claims are preserved as decision defects until a joint identifier map exists.

EAT-R398/EAT-R405 retain the existing `wb-w8fk` → deferred `wb-1zn2` dependency. EAT-R413 needs a new live carrier after a current census because the repro bead is closed and no live repair carrier was found at the pin. EAT-R415 remains an acquisition gate, and EAT-R403/EAT-R416/EAT-R420 cannot claim recovery complete before it is settled.

The main behavioral remedies for canonical carrier/digest/notes/budgets, invocation lifetime/cross-PID ownership, authority/source/live rechecks, storage lineage, intent correlation, event-vs-effect replay, scoped controls and effect-aware error mapping are covered in this range. Pure wording-only repairs remain owner-controlled inserts; this file is input to the parent requirements/TDD matrix, not a replacement for the pinned REMEDIATION ledger.

### Requirement-specific TDD matrix input

All rows apply L0 (claim/requirement/Bead traceability), L1 shell harness, L2 external installed/client boundary, L3 registered/framework boundary, L4 preimplementation units, L5 failure/mutant batteries, L9 coverage and L10 critical audit. L6/L7/L8 apply to runtime rows for lifecycle/user/agent inspect-recover journeys; decision/representation-only rows exercise them through their dependent runtime fixtures, rather than a fabricated independent lifecycle. The parent full matrix must retain per-row concrete evidence references and any actual A*/S/structural justification.

V5 rows additionally require a real multi-process fresh-instance harness, not in-memory timeout simulation alone. External producer APIs not yet delivered are named blockers; lack of credentials/runtime availability is pending evidence, never a passing skip. The acquisition row EAT-R415 records settled and unresolved cases explicitly. No native V4 proof is claimed by this compilation.
''')
(OUT / 'req-r-core.md').write_text(''.join(parts))
maprows=[]
for r in rows:
    maprows.append({
        'requirement':r['requirement'], 'type':r['type'], 'authority':r['authority'], 'priority':'P0',
        'statement':r['statement'], 'derived_from':r['derived_from'], 'epistemic_basis':r['epistemic_basis'],
        'embedded_premise_flags':r['embedded_premise_flags'], 'remediation_ids':r['remediation_ids'],
        'derivation': {'RISK_CONTROL':'CONDITIONAL_RISK_CONTROL','NORMATIVE_DECISION':'ADOPTED_NORMATIVE_OBLIGATION','EVIDENCE_ACQUISITION':'MISSING_EVIDENCE_GATE','LINGUISTIC_INTEGRITY':'NEGATIVE_WORDING_REGRESSION','EMPIRICAL_REPAIR':'SCOPED_EMPIRICAL_REPAIR'}[r['authority']],
        'rationale':r['rationale'], 'conditions':[r['conditions']] if r['conditions'] else [],
        'verification':r['verification'], 'verification_namespace':'MII V0-V6',
        'acceptance_criteria':r['acceptance'], 'negative_mutant':r['mutant'],
        'planned_evidence':r['evidence_gate'], 'evidence_status':'PLANNED_NOT_EXECUTED',
        'maps_to':{'mii_packet':r['packet'],'live_bead':r['bead'],'operation':'new' if r['bead']=='new' else 'extend','status_basis':'pi-0fb90672 passive export; re-read current live DB before mutation'},
        'predecessor_lineage':r['predecessor'],
        'tdd_levels':['L0','L1','L2','L3','L4','L5','L9','L10'] + ([] if r['type'] in {'NORMATIVE_DESIGN','REPRESENTATION'} else ['L6','L7','L8']),
        'compile_input_hashes':{'CLAIMS.jsonl':hashlib.sha256(claims_path.read_bytes()).hexdigest(),'REMEDIATION.md':hashlib.sha256(remediation_path.read_bytes()).hexdigest()},
    })
(OUT/'map-r-core.jsonl').write_text(''.join(json.dumps(r,ensure_ascii=False)+'\n' for r in maprows))
print(json.dumps({'file':str(OUT/'req-r-core.md'),'map':str(OUT/'map-r-core.jsonl'),'count':len(rows),'range':'EAT-R391..EAT-R420','bytes':{'requirements':(OUT/'req-r-core.md').stat().st_size,'map':(OUT/'map-r-core.jsonl').stat().st_size}},indent=2))
