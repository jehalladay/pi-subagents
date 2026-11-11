"""Row edits applied at consolidation. Every 'replace' asserts its old text occurs exactly once in the named field.

Tuple: (requirement, field, kind, old, new, finding, note)
field: statement | rationale | conditions | mutant | tier | criteria:<0-based index> | criteria+
kind:  replace | set | append
"""

E = []


def ed(rid, field, kind, old, new, ra, note):
    E.append((rid, field, kind, old, new, ra, note))


# ---------------------------------------------------------------- RA-02 (R441) + RA-09 (R412, R441, R466)
ed("EAT-R441", "statement", "replace",
   'MUST remain the actual pin-time shape — outer `workbench.tool-reply/v1`, inner `workbench.execute/v1` with required `contractVersion`, `status in {accepted, launched, refused}`, `completion: "not-asserted"`, `invoked`, `nativeRefs`, `truncated` — MUST NOT introduce the pi-05 illustration members (`tool`, `next`) or the literal `"tool-reply/v1"` as a contract string,',
   'MUST keep the registered tool\'s model-facing envelope as pinned — `contract: "workbench.tool-reply/v1"`, `tool: "workflow_execute"`, `ok`, `invoked`, `status`, `completion: "not-asserted"`, `nativeRefs` and the optional members `invocationId`, `definition`, `hostMode`, `nativeRefsOmitted`, `policy`, `provenance`, `error`, `truncated {reason, maxBytes}`, `truncation` — adding only versioned members; MUST NOT add the illustration member `next` or emit the bare string `tool-reply/v1`;',
   "RA-02", "statement clause replaced with the audit's section 4 text (model-facing envelope, not the inner builder type)")
ed("EAT-R441", "criteria:0", "set", "Schema test: the function-route reply validates against the existing `WorkflowExecuteReply` type",
   'Through ORACLE-REG the function-route reply parses as the pinned envelope plus additive versioned members: `contract === "workbench.tool-reply/v1"`, `tool === "workflow_execute"`, `next` absent; the script-path rows of workbench-surface-census.test.ts and workbench-execute-tool.test.ts stay green unedited. A unit assertion on the pure builder checks `contractVersion === "workbench.execute/v1"` and boolean `truncated`.',
   "RA-02", "criterion 1 replaced with the audit's section 4 text")
ed("EAT-R441", "rationale", "append", "",
   ' Consolidation correction (RA-02): the object the model reads is the registered tool\'s `WorkflowExecuteEnvelope` (execute-tool.ts:107-124 at 0fb90672: outer key `contract` :108, member `tool: "workflow_execute"` :109, built by `envelope()` :143; the script-path bytes are pinned by test/workbench-surface-census.test.ts:269), not the pure builder\'s `WorkflowExecuteReply` (execute.ts:65-79, which carries `contractVersion` and boolean `truncated`). The E062 / K006 comparison quoted above was made against the inner type; relative to the envelope the single foreign illustration member is `next`. C225 NON-EPISTEMIC and K006 owe a ledger correction entry (the comparison object is the envelope).',
   "RA-02", "rationale carries the audit's correction of the comparison object; ledger correction entry for C225 / K006 is owed (not written here)")
ed("EAT-R441", "criteria:2", "set", '`status === "accepted"` is never emitted by the function branch unless a ratified decision row is cited',
   '`accepted` is emitted only under option (i) of the EAT-R466 launch-status decision recorded in the EAT-R405 ratification record; the test fails on `status === "accepted"` by default and admits it only when the fixture cites that recorded option.',
   "RA-09", "criterion 3 bound to option (i) of the EAT-R466 decision")
ed("EAT-R441", "conditions", "set", "none.",
   "The launch-status decision is owned by EAT-R466 and recorded in the EAT-R405 ratification record; until that record exists criterion 3 is BLOCKED on G-RATIFY (RA-09). Otherwise none.",
   "RA-09", "conditions name the owning decision row and the G-RATIFY block")
ed("EAT-R412", "criteria:2", "replace",
   "an empty truthful list is not replaced with a synthetic id.",
   "an empty list is permitted only under option (i) of the EAT-R466 launch-status decision and is never replaced with a synthetic id.",
   "RA-09", "criterion 3: empty native-ref list only under option (i)")
ed("EAT-R412", "conditions", "append", "",
   " Launch status for a launch that has no producer-native reference yet is the EAT-R466 decision recorded in the EAT-R405 ratification record; until that record exists criterion 3's status clause is BLOCKED on G-RATIFY (RA-09).",
   "RA-09", "conditions name the owning decision row and the G-RATIFY block")
ed("EAT-R466", "statement", "append", "",
   " This row owns one decision, recorded in the EAT-R405 ratification record — launch status for an embedded function launch with no producer-native reference yet: exactly one of (i) `accepted` with a ratified meaning, (ii) `launched` carrying a host-minted Pi-native reference, (iii) the reply is delayed until the first native reference.",
   "RA-09", "row made the owner of the one launch-status decision (audit section 4 text)")
ed("EAT-R466", "conditions", "append", "",
   " Until the launch-status decision record exists, this clause, EAT-R412 criterion 3 and EAT-R441 criterion 3 are BLOCKED on G-RATIFY (RA-09).",
   "RA-09", "conditions state the G-RATIFY block shared by R412 / R441 / R466")

# ---------------------------------------------------------------- RA-03 (R446, R401; text items R391, R398, R447, R458)
ed("EAT-R446", "statement", "set", "The verification suite MUST implement falsifiers G01",
   "The Pi suite MUST implement the Pi-side projection legs of G01, G02, G03 and G12 — a red test and a negative mutant each, through ORACLE-REG with an injected observed envelope and, where applicable, an injected producer certificate — asserting the EAT-R433..R436 projections. The producer-side classifier tests (MW Q01, Q03, Q04, Q05, Q08 by content) are Mechanical-owned (mw-03 H01/H09; tracker wb-1zn2): the Pi receipt cites the producer receipt when it exists and records BLOCKED(producer-red-absent) when it does not. No Pi cut adds or edits a test in the Mechanical repository.",
   "RA-03", "statement replaced with the audit's section 4 text (Pi-side projection legs only)")
ed("EAT-R446", "criteria:0", "set", "For each of G01/G02/G03/G12 a producer-side (MW) test injects",
   "For each of G01/G02/G03/G12 a Pi-side red test through ORACLE-REG injects the stated evidence defect as an observed envelope (and, where applicable, an injected producer certificate) and asserts the EAT-R433..R436 projection (indeterminate / no strict promotion); a negative mutant that weakens the Pi projection guard turns the test red. The Pi receipt cites the producer-side classifier receipt (MW Q01, Q03, Q04, Q05, Q08 by content; Mechanical-owned) when it exists and records BLOCKED(producer-red-absent) when it does not.",
   "RA-03", "CONSEQUENTIAL: criterion 1 required a producer-side (MW) test and classifier mutant; realigned to the replaced statement using the statement's own terms (no section 4 text exists for this criterion)")
ed("EAT-R446", "tier", "set", "V1 (producer red/mutant)",
   "V1 + V3 (audited tier, RA-03 / RA-12; the draft's producer-side leg and native projection leg are replaced: an injected envelope defect cannot come from a real Forge run, so the projection is the registered-route tier).",
   "RA-03", "tier set to V1 + V3 (also discharges RA-12 for this row)")
ed("EAT-R401", "statement", "set", "Every admitted provider write entry MUST deny a stale or invalid lease generation",
   "Pi MUST expose the ratified current-generation verifier to the composed host and MUST keep effectful function readiness false for any topology in which the installed host does not demonstrably deny a stale or invalid generation at provider write entry (consumption test: stale token → zero edit, commit and gate effects).",
   "RA-03", "statement subject moved from the provider write entry (mw-03 H06) to Pi; audit's section 4 text")
ed("EAT-R391", "mutant", "set", "Replace the producer hash with bare SHA-256 of canonical JSON",
   "Consumer-side conformance failure against a fixture reader: a fixture reader that computes bare SHA-256 of canonical JSON (dropping the ratified prefix/domain) passes the byte-equality control but must fail the shared digest vector.",
   "RA-03", "TEXT item: mutant rephrased as a consumer-side conformance failure against a fixture reader (no producer code is mutated by a Pi cut)")
ed("EAT-R398", "mutant", "set", "Have Mechanical accept the serialized generation without current-authority validation",
   "Consumer-side conformance failure against a fixture host: a fixture host that accepts the serialized generation without current-authority validation must fail the stale-token fixture.",
   "RA-03", "TEXT item: mutant rephrased as a consumer-side conformance failure against a fixture host")
ed("EAT-R447", "statement", "append", "",
   " Pi-side arms only; the producer-side red is consumed.",
   "RA-03", "TEXT item: statement names which arm is Pi's (audit's section 4 phrase)")
ed("EAT-R458", "criteria:0", "replace",
   "the Pi and MW receipt emitters both validate against it or against explicit documented mappings;",
   "the Pi emitter validates; the MW receipt is joined through the documented mapping; MW-side adoption is tracked by wb-1zn2;",
   "RA-03", "TEXT item: criterion 1 no longer requires the MW emitter to validate (audit's section 4 text)")

# ---------------------------------------------------------------- RA-04 (R448, R450, R463, R464)
ed("EAT-R448", "conditions", "set", "cross-process lease substrate must exist first (EAT-R464)",
   "prerequisite: EAT-R399, R400, R401, R402; red by construction until they land; EAT-R464 is downstream.",
   "RA-04", "conditions replaced (cycle with EAT-R464 removed; substrate rows named)")
ed("EAT-R450", "conditions", "set", "durable intent/fence journal (MII P02/P07) must exist; see EAT-R464.",
   "durable intent/fence journal (MII P02/P07) must exist: EAT-R399..R403 and EAT-R414..R417.",
   "RA-04", "conditions name the substrate and journal rows instead of EAT-R464")
ed("EAT-R463", "conditions", "set", "requires EAT-R450 harness and EAT-R464 durable lease/journal.",
   "requires the EAT-R450 harness, EAT-R399..R403, EAT-R414..R417 and the joined route (EAT-R412, R426).",
   "RA-04", "conditions name the harness, substrate, journal and joined-route rows instead of EAT-R464")
ed("EAT-R464", "statement", "replace",
   "MUST produce the currently nonexistent evidence of writer-lease exclusivity beyond one process: a durable same-machine cross-process lease (persisting after launch return, fencing stale generations, surviving restart in a recovery-held state) proven by the G06/G07 tests;",
   "MUST record, as a receipt, that EAT-R448 passed against the EAT-R399..R401 substrate in the named same-machine topology; it adds no second substrate;",
   "RA-04", "statement narrowed to the acquisition receipt (audit's section 4 text); the 'compatible' and P00 clauses are kept")
ed("EAT-R464", "criteria:0", "set", "A durable lease substrate exists whose persisted owner is observable",
   "The receipt records that G06/G07 (EAT-R448) passed, including the restart case, against the EAT-R399..R401 substrate, whose persisted owner is observable; timeout-only release is impossible by construction (a timeout transitions to recovery-held, never to free; mutant proves it). This row builds no substrate of its own.",
   "RA-04", "CONSEQUENTIAL: criterion 1 asked this row to make the substrate exist; realigned to the narrowed statement (no section 4 text exists for this criterion)")
ed("EAT-R464", "conditions", "append", "",
   " Downstream of EAT-R448; resulting order EAT-R398 → EAT-R399..R403 → EAT-R448 → EAT-R464 (RA-04).",
   "RA-04", "conditions state the resulting order")
ed("EAT-R464", "tier", "set", "V1 + V5.",
   "V1 + V3 + V5 (audited tier, RA-12; the draft omitted the registered-route tier carried by its behaviour row EAT-R400).",
   "RA-12", "tier set to the audited value (metadata only)")

# ---------------------------------------------------------------- RA-05 (R462, R431)
ed("EAT-R462", "statement", "replace",
   "a real strict Forge gate — capturing the actual strict-positive native envelope, exact resolved SDK paths/versions and the certificate result/event carrier — and,",
   "the native Forge full gate; where EAT-R437 has settled attainability by envelope, the strict-positive envelope is captured; until then a V4 receipt whose assurance is the weak value is a valid non-strict V4 receipt and the strict clause stays `undetermined`; the receipt also captures exact resolved SDK paths/versions and the certificate result/event carrier; and,",
   "RA-05", "strict-positive MUST replaced with the audit's section 4 text (non-strict V4 receipt allowed; strict stays the EAT-R437 gate)")
ed("EAT-R462", "statement", "append", "",
   " Duty split (RA-05): EAT-R431 owns the receipt content, provider readback and BLOCKED semantics; this row owns (a) the acquisition, citing the EAT-R431 receipt, and (b) the external-store census, whose scope extends to the crash-restart and lease absences (C024 ESTABLISHED, C025 ESTABLISHED).",
   "RA-05", "duty split with EAT-R431 stated; census scope extended to C024 / C025")
ed("EAT-R462", "criteria:0", "set", "A V4 receipt (EAT-R458 schema) exists with non-null native axes validated per EAT-R457",
   "A V4 receipt (EAT-R458 schema; content, provider readback and BLOCKED semantics owned by EAT-R431) exists with non-null native axes validated per EAT-R457, produced through the registered route (route witness as in EAT-R461); where EAT-R437 has not settled strict attainability by envelope, a receipt whose assurance is the weak value is a valid non-strict V4 receipt and carries the strict clause as `undetermined`.",
   "RA-05", "CONSEQUENTIAL: criterion 1 aligned with the replaced statement (cites the EAT-R431 receipt; non-strict V4 receipt valid)")
ed("EAT-R462", "criteria:1", "append", "",
   " The census covers three absences: joined native-run receipts (C023 ESTABLISHED), joined crash-restart proof (C024 ESTABLISHED) and cross-process writer-lease proof (C025 ESTABLISHED).",
   "RA-05", "census scope extended to the crash-restart and lease absences")
ed("EAT-R462", "conditions", "append", "",
   " Strict attainability remains the EAT-R437 acquisition gate (UNDETERMINED until settled by envelope or by recorded decision). EAT-R431, EAT-R457 and EAT-R462 are filed as legs of one bead under wb-p3i2 (RA-05).",
   "RA-05", "conditions carry the EAT-R437 gate and the one-bead filing rule")
ed("EAT-R431", "conditions", "append", "",
   " Duty split (RA-05): this row owns the receipt content, provider readback and BLOCKED semantics; EAT-R462 owns the acquisition and the external-store census; EAT-R431, EAT-R457 and EAT-R462 are filed as legs of one bead under wb-p3i2.",
   "RA-05", "duty split with EAT-R462 stated")

# ---------------------------------------------------------------- RA-06 (R470, R438)
ed("EAT-R470", "statement", "replace",
   "P00→wb-w8fk (in_progress, + carry the wb-1zn2 (deferred) external-gate tracker),",
   "P00→wb-w8fk (open at the 2026-11-11 live reads; + carry the wb-1zn2 (deferred) external-gate tracker), P01 → new (no MNI carrier; wb-7wkb is the closed MNI P01 and different work),",
   "RA-06", "map gains P01 (audit's section 4 text); wb-w8fk status drift corrected under RA-01")
ed("EAT-R470", "statement", "replace",
   "P06→wb-9a1o (open),",
   "P06 → wb-9a1o (wb-upad closed into it),",
   "RA-06", "map entry for P06 names the closed lineage bead (audit's section 4 text)")
ed("EAT-R470", "statement", "replace",
   "P10→wb-yiu4 (open; docs lineage wb-12x1 closed), epic wb-1a3t (open)",
   "P10→wb-yiu4 (open; docs lineage wb-12x1 closed), P11 → wb-zswl (deferred), P12 → wb-pxvv (deferred), epic wb-1a3t (open)",
   "RA-06", "map gains P11 and P12 as deferred packets (audit's section 4 text; packet deferral, not bead status)")
ed("EAT-R470", "statement", "replace",
   "closed carriers (wb-7wkb, wb-5a7k, wb-12x1, wb-5ik5)",
   "closed carriers (wb-7wkb, wb-5a7k, wb-upad, wb-12x1, wb-5ik5)",
   "RA-01", "closed-carrier lineage list gains wb-upad")
ed("EAT-R470", "conditions", "append", "",
   " P11, P12 and V6 are explicit deferrals (section 'Explicit deferrals'; RA-06): 'P11 → wb-zswl (deferred)' and 'P12 → wb-pxvv (deferred)' state the packet disposition; the bead status is whatever the live read returns.",
   "RA-06", "conditions point at the explicit deferral section")
ed("EAT-R438", "criteria:2", "set", "Given a detached function launch (if admitted at all before P11)",
   'First-release assertion: a detached function launch is refused (EAT-R404 criterion 3, EAT-R412 criterion 2), and a text census over `src/workbench/execute-tool.ts` reply builders asserts that no function-route reply contains "observe the launch through workflow_observe" for a mode that is not observable. DEFERRED to P11 (EXTENDS EAT-R296; carrier wb-zswl): for an admitted detached function launch the execute reply\'s guidance text does not contain that instruction and carries an explicit `observability: "not-observable-in-this-mode"` member.',
   "RA-06", "criterion 3: untestable detached arm marked deferred to P11; the refusal is the first-release assertion")

# ---------------------------------------------------------------- RA-07 (R469; D8 / D10 / D11 named in R434 / R428 / R425)
ed("EAT-R469", "statement", "append", "",
   " The crosswalk MUST also carry namespace `D` (id, ledger id PI-I0n / MW-I0n, owner in each program, severity in each program, content, Pi consumption rows, MW packet, ruling), namespace `tier` (V ↔ MW-L ↔ L0-L10; EXTENDS EAT-R209), and glossary rows for 'strict' (axes of EAT-R434, attainability EAT-R437) and MW-CONTRACT (the EAT-R405 record).",
   "RA-07", "crosswalk namespaces D and tier and the two glossary rows added (audit's section 4 text)")
ed("EAT-R469", "criteria+", "append", "",
   "The table records one owner ruling for D6 (two-part: Pi P04/P05 wiring + MW H06 composed host), one severity ruling each for D4, D10, D11, MW-I10, MW-I12, and one label for D7; until a ruling exists the row reads CONTESTED and no bead is keyed by the bare label.",
   "RA-07", "acceptance criterion added (audit's section 4 text)")
ed("EAT-R434", "conditions", "append", "",
   " D-ledger (RA-07): this row is the Pi-side consumption guard for D8 (mw-01 MW-I06, Mechanical P1: the projection checks the candidate commit only, not all strict axes) — every axis is validated against the observed envelope and a partial certificate is never strict; the repair is MW packet mw-03 H01 (tracker wb-1zn2), never a Pi bead.",
   "RA-07", "D8 named with its companion definition reference (one disposition: row edit)")
ed("EAT-R428", "conditions", "append", "",
   " D-ledger (RA-07): criterion 2 is the Pi-side consumption guard for D10 (mw-01 MW-I07, Mechanical P2: a malformed descriptor is dereferenced into a TypeError instead of a typed refusal) — any thrown producer fault stays on the typed fault channel, never an outcome; Pi's own descriptor shape check is EAT-R219; the repair is MW packet mw-03 H04 (tracker wb-1zn2), never a Pi bead; the severity ruling is owner-routed through the EAT-R469 crosswalk.",
   "RA-07", "D10 named with its companion definition reference (one disposition: row edit)")
ed("EAT-R425", "conditions", "append", "",
   " D-ledger (RA-07): this row is the Pi-side consumption guard for D11 (mw-01 MW-I08, Mechanical P1: the packed host loads callbacks without proving SDK / executable identity or credentials) — identity is recorded and an unavailable runtime is refused, together with EAT-R465 (native-provider readiness axis) and EAT-R431 (BLOCKED, never an imitation); the repair is MW packet mw-03 H03 / H05 (tracker wb-1zn2), never a Pi bead; the severity ruling and the SDK-pin owner (RA-15) are owner-routed through the EAT-R469 crosswalk and the EAT-R405 record.",
   "RA-07", "D11 named with its companion definition reference (one disposition: row edit)")

# ---------------------------------------------------------------- RA-08 (R413, R431, R444, R445)
ed("EAT-R413", "conditions", "append", "",
   " RA-08: the repair itself (legs EAT-R213 / R214 / R253, authority EMPIRICAL_REPAIR; the red-first evidence is the existing repro test/workbench-mwi-cancel-repro.test.ts) is compiled nowhere in EAT-R391..R470 and had no live bead at the 2026-11-11 reads. ONE new bead carries those legs with this row as its gate leg; it is TO-BE-FILED at bead filing by the owner. Until its receipt exists every effectful arm (EAT-R431, R444, R445, R454, R457, R462) stays fixture-only.",
   "RA-08", "repair orphan recorded; carrier marked TO-BE-FILED by the owner (no bead id invented)")
ed("EAT-R431", "conditions", "replace",
   "EAT-R253 repair receipt (E013:",
   "EAT-R413 (MII carrier of the EAT-R253 gate): the EAT-R253 repair receipt (E013:",
   "RA-08", "conditions cite EAT-R413 as the MII carrier of the EAT-R253 gate")
ed("EAT-R431", "conditions", "replace",
   'is UNSUPPORTED as a packet reference, C142)',
   'is not a packet reference — C142 UNSUPPORTED)',
   "scan", "status label moved next to its claim id so the laundering scan reads it (wording only; grade unchanged)")
ed("EAT-R444", "conditions", "append", "",
   " EAT-R413 (MII carrier of the EAT-R253 gate) must hold before any effectful (non-fixture) arm of this row runs (see EAT-R445 conditions; moved here from the draft Maps-to line).",
   "RA-08", "conditions cite EAT-R413; the cross-reference embedded in the draft Maps-to line moved here (also discharges the RA-19 item for this row)")
ed("EAT-R445", "conditions", "replace",
   "EAT-R253 (parked-beforeDispatch skip/retry loss, E013) must carry a repair receipt",
   "EAT-R413 (MII carrier of the EAT-R253 gate): EAT-R253 (parked-beforeDispatch skip/retry loss, E013) must carry a repair receipt",
   "RA-08", "conditions cite EAT-R413 as the MII carrier of the EAT-R253 gate")


# RA-08 owner directive closes the independent-path loophole: every effectful arm waits on the repair bead.
ed("EAT-R413", "statement", "append", "", " Every effectful function arm, including a newly independent dispatch path, MUST remain gated on the source-pinned EAT-R213 / R214 / R253 repair receipt plus this EAT-R413 gate; no path renaming waives the gate.", "RA-08", "statement closes an independent-path bypass under the owner directive")
ed("EAT-R413", "criteria:1", "set", "If implementation uses a genuinely independent dispatch path", "An independent dispatch path is not an exception to the EAT-R253 repair gate. Record the design decision and run an equivalent registered-route barrier test (skip/retry while parked yields zero late writer/SDK starts), but keep every effectful arm disabled or fixture-only until the source-pinned EAT-R213 / R214 / R253 repair receipt and this EAT-R413 gate exist. Do not silently waive EAT-R253 by renaming the path.", "RA-08", "owner direction: no independent-path bypass of repair; every effectful arm is blocked")
# ---------------------------------------------------------------- RA-12 tiers (metadata; R446 done under RA-03, R464 under RA-04 block)
ed("EAT-R447", "tier", "set", "V1 + V5.",
   "V1 + V3 + V5 (audited tier, RA-12; the draft omitted the registered-route tier carried by its behaviour row EAT-R443).",
   "RA-12", "tier set to the audited value (metadata only)")
ed("EAT-R448", "tier", "set", "V1 + V5.",
   "V1 + V3 + V5 (audited tier, RA-12; the statement says 'through the registered route').",
   "RA-12", "tier set to the audited value (metadata only)")
ed("EAT-R449", "tier", "set", "V1 + V3.",
   "V1 + V2 + V3 (audited tier, RA-12; G09 is an installed-consumer falsifier, as its behaviour row EAT-R422).",
   "RA-12", "tier set to the audited value (metadata only)")


# ---------------------------------------------------------------- RA-19 text references (fixes that fit existing rows)
ed("EAT-R446", "conditions", "replace", "is design prose at the pins, not verified code fields", "uses Forge fields documented and pinned at the source (K023 RESOLVED-BY-SOURCE; EAT-R434): `data.gated_commit`, `data.gated_tree`, `gate_passed`, `gate_definition`, `execution_environment`; the certificate transport/eligibility decision still needs EAT-R458 ratification", "RA-19", "K023 field names no longer called design prose; certificate mapping still ratified")
ed("EAT-R451", "rationale", "replace", "these rows currently have no implemented subject and must land with the P06 bridge", "the seam-level observation ingest greens are controls (E169); the joined P06 observation bridge remains the new red subject", "RA-19", "E169 caveat restores the already-green seam controls")
ed("EAT-R449", "conditions", "append", "", " E169 seam-level greens (e.g., admission-only notes tests and observation ingest) are baseline controls, not a registered-route red test; the new G08/G09/G10/P13/P14 red tests are through the named joined or installed boundary (RA-19).", "RA-19", "E169 caveat recorded")
ed("EAT-R459", "statement", "replace", "missing L4/L5 marked shipped", "missing Mechanical L4/L5 (MW evidence ladder; not this matrix's agentic-tdd L4/L5) marked shipped", "RA-19", "L4/L5 namespace clarified")
ed("EAT-R421", "criteria:0", "replace", "the four exported symbols listed in C214 are present", "the eight runtime exports listed in C214 are present: `invokeDevelopmentHost`, `HostAdmissionError`, `HOST_API_VERSION`, `HostBindingError`, `WRITE_GRANT`, `admitHostBinding`, `dispatchWriteAtFinalBoundary`, `validateHostBinding`", "RA-19", "exact eight host subpath runtime exports enumerated (audit section 4)")
ed("EAT-R466", "criteria:1", "replace", "evidence strength is computed from the producer certificate (EAT-R446)", "evidence strength is computed from the producer certificate projected under EAT-R433 / EAT-R434 (EAT-R446 is the falsifier suite, not the projector)", "RA-19", "wrong R446 proof-reference corrected to R433/R434")
ed("EAT-R470", "criteria:2", "replace", "validates against the EAT-R458-adjacent closure schema", "validates against the packet-closure receipt schema (pi-03 L83-84 field list; EXTENDS EAT-R291), ratified with EAT-R458", "RA-19", "undefined adjacent schema reference replaced with audit section 4 text")
ed("EAT-R470", "conditions", "append", "", " Both parent epics exist: wb-1a3t (MWI) and wb-rhyt (MNI); the filing owner chooses one parent for new MII beads (new MII epic, or wb-rhyt related to wb-1a3t), never assumes there is only one (RA-20).", "RA-20", "two parent epics + one owner ruling for new MII beads")
# RA-13 / RA-14 / RA-15 are filing-time acceptance changes. They fit existing rows and are applied
# as text obligations; actual file edits, owner rulings and gates remain NOT_RUN.
ed("EAT-R439", "criteria+", "append", "", "Model-visible summaries and file names are redacted under the existing observe scope rules; the test asserts no workspace-absolute path or note text in the reply.", "RA-13", "privacy obligation attached to R439 (test is NOT_RUN)")
ed("EAT-R414", "criteria+", "append", "", "The durable record is readable only through the operator-scoped path; an out-of-scope read is refused.", "RA-13", "privacy obligation attached to R414 (test is NOT_RUN)")
ed("EAT-R459", "criteria+", "append", "", "A release dry-run vetoes when there is no recorded local full Forge gate (forge.toml `gate`) on each cut and on the final merged tree (EXTENDS EAT-R286).", "RA-13", "QA step 7 gate predicate attached to R459")
ed("EAT-R470", "criteria+", "append", "", "A pre-cut re-pin record names both full SHAs, trees and the active bead snapshot (EXTENDS EAT-R201).", "RA-13", "QA step 1 re-pin record attached to R470")
ed("EAT-R470", "criteria+", "append", "", "The map names the landing trunk, the default branch, the merge direction and the program-docs validator anchor.", "RA-13", "landing-branch / validator-anchor rule attached to R470")
ed("EAT-R468", "criteria+", "append", "", "Sample invocation / observe / control transcripts are captured from registered-route runs and carry their receipt reference; the pi-05 JSON stays labelled proposal.", "RA-13", "P10 sample transcript / QA step 8 obligation attached to R468")
ed("EAT-R461", "criteria:0", "replace", "asserts the same invocationId is observable via workflow_observe.", "asserts the same invocationId is observable via workflow_observe and workflow_reconcile in the same invocation.", "RA-13", "workflow_reconcile joined to V3 gate")
ed("EAT-R468", "criteria+", "append", "", "The MII program directory gains one appended annotation block (insert-only, after the pinned sections) carrying the deferred REMEDIATION inserts; the block lists each M-id landed; the pin advance stays an owner decision.", "RA-14", "wording-only remediation insert custody attached to R468")
ed("EAT-R468", "criteria+", "append", "", "The first docs/skill cut repairs the recorded-red census rows through the census's append-only protocol before any other skill edit (authority EMPIRICAL_REPAIR; restore the M049 / M050 standing text or re-pin the rows through the census's append-only receipt protocol).", "RA-14", "recorded-red wb-12x1 census repair precondition attached to R468")
ed("EAT-R405", "criteria:0", "replace", "installed-host evidence digests.", "installed-host evidence digests, SDK pin owner and provider-factory ownership, and the V3 fixture-host injection seam.", "RA-15", "joint ratification record gains SDK/factory owner and V3 fixture seam")
ed("EAT-R426", "conditions", "append", "", " The EAT-R405 ratification record must choose SDK pin owner, provider-factory ownership (Pi passing callbacks versus Mechanical composing them from host-supplied factories), and the V3 fixture-host injection seam (E226 / K032); this row does not choose for the owners (RA-15).", "RA-15", "callback ownership is an explicit decision gate")
ed("EAT-R461", "conditions", "append", "", " The EAT-R405 ratification record must settle SDK pin owner, provider-factory ownership and the V3 fixture-host injection seam (E226 / K032) before the tier is claimed (RA-15).", "RA-15", "V3 evidence waits on the owner/factory ruling")
ed("EAT-R419", "criteria+", "append", "", "The table has one effect-axis row (K030): a ratified field name, value set and a rule that `no-effect` is never assigned after dispatch; EAT-R439 / R443 / R444 / R445 use that one ratified field name, never competing aliases.", "RA-15", "one effect-axis vocabulary row attached to R419; field choice still owner-ratified")

ed("EAT-R444", "criteria:2", "replace", '`effectDisposition: "unknown"`', '`<EAT-R419 ratified effect-axis field>: "unknown"`', "RA-15", "R444 criterion 3 uses the one ratified field name")
# ---------------------------------------------------------------- RA-15 effect-axis field use and RA-18 explicit negative mutants
# Field name is a ratification item (K030), so clauses below are conditional on the ONE R419 table row.
for _rid, _field, _old, _new in [
    ("EAT-R439", "statement", "effect disposition (EAT-R443)", "effect disposition (EAT-R443, using the one ratified effect-axis field name and value set in EAT-R419)"),
    ("EAT-R443", "criteria:0", '`disposition: "unknown"`', '`<EAT-R419 ratified effect-axis field>: "unknown"`'),
    ("EAT-R444", "statement", '`effectDisposition: "unknown"`', '`<EAT-R419 ratified effect-axis field>: "unknown"`'),
    ("EAT-R445", "criteria:0", '`effect: "dispatched-uncertain"`', '`<EAT-R419 ratified effect-axis field>: "dispatched-uncertain"`'),
]:
    ed(_rid, _field, "replace", _old, _new, "RA-15", "one ratified K030 field name replaces conflicting Pi-side aliases; value set remains owner-ratified")
for _rid, _test in [
    ("EAT-R455", "A receipt carrying an SLA with no raw measurement row is accepted by a mutant validator; the RA-18 test must reject it."),
    ("EAT-R456", "A validator mutant accepts a write into a prior source-pinned receipt directory; the append-only custody check must turn red."),
    ("EAT-R459", "A release mutant proceeds with an unmapped veto predicate; the executable gate must turn red."),
    ("EAT-R460", "A V2 gate mutant accepts a changed installed `dist` runtime file after tarball verification; the fresh-consumer runtime-file check must turn red."),
    ("EAT-R465", "An inspect mutant reports ready when one named readiness axis is broken; the per-axis disabled test must turn red."),
    ("EAT-R468", "A docs-lint mutant accepts a shipped W11 row without a receipt link; the same-cut documentation gate must turn red."),
    ("EAT-R469", "A crosswalk-lint mutant accepts a dependency keyed by a bare H-number with no owner/content; the namespace validator must turn red."),
    ("EAT-R470", "A map-validator mutant accepts a closed bead as an active filing carrier; the live exact-id census check must turn red."),
]:
    ed(_rid, "criteria+", "append", "", _test, "RA-18", "row-specific negative mutant named; NOT_RUN")
    ed(_rid, "mutant", "set", "", _test, "RA-18", "draft supplied no negative mutant; consolidated row supplies an explicit mutant")
ed("EAT-R449", "criteria+", "append", "", "One guard-removal mutant per falsifier: G08 reintroduces the notes-bearing raw payload; G09 skips the installed-file manifest check; G10 trusts each of forged grant/root/profile/principal in four distinct mutants; P13 skips the post-wait grant read; P14 skips the post-wait source / manifest read. Each mutant must turn its own red test red.", "RA-18", "one guard-removal mutant per G08/G09/G10/P13/P14 arm")
ed("EAT-R451", "criteria+", "append", "", "One guard-removal mutant per falsifier: P15 drops scope authorization on a captured native ref; P16 disables event-ID deduplication; P17 truncates a long native ref instead of omitting it. Each mutant must turn its own red test red.", "RA-18", "one guard-removal mutant per P15/P16/P17 arm")
# ---------------------------------------------------------------- Predecessor-lineage prose (RA-01 closed-bead repoints, RA-10 corrections).
# Core rows: patches to the drafted 'Predecessor lineage' text. (requirement, old, new, finding, note)
LINEAGE_PATCH = [
    ("EAT-R391", "Extends MNI EAT-R203/EAT-R204;", "Extends MNI EAT-R203 and EAT-R205 (the draft cited R203/R204; corrected under RA-10);", "RA-10", "lineage ids corrected"),
    ("EAT-R402", "Extends MNI EAT-R232/EAT-R280+ custody behavior;", "Extends MNI EAT-R232, EAT-R278, EAT-R280 and EAT-R281 custody behavior (the draft wrote the open range R280+; closed under RA-10);", "RA-10", "open-ended lineage range closed"),
    ("EAT-R403", "Extends MNI EAT-R232/EAT-R250 recovery custody; maintains EAT-R207 lease-owner choice.", "Extends MNI EAT-R232, EAT-R251, EAT-R254 and EAT-R282 recovery custody (the draft cited R250; corrected under RA-10); maintains the R207 lease-owner choice.", "RA-10", "lineage ids corrected"),
    ("EAT-R407", "MNI EAT-R204/R224+;", "MNI EAT-R204, EAT-R225, EAT-R227 and EAT-R228 (the draft cited R224+; corrected under RA-10: R224 is installed-package serialization, the grant rows are R225 / R227 / R228);", "RA-10", "lineage ids corrected"),
    ("EAT-R410", "Extends MNI EAT-R225+ source admission;", "Extends MNI EAT-R229, EAT-R230, EAT-R231 and EAT-R268 source admission (the draft cited R225+; corrected under RA-10: R225 is rights, source admission is R229-R231 and R268);", "RA-10", "lineage ids corrected"),
    ("EAT-R418", "Extends live wb-5a7k controls and MNI EAT-R251/R253 ordering, not closed repro status.", "Extends the controls scope now carried by live wb-mwsy (lineage: wb-5a7k, closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy) and MNI EAT-R243, EAT-R252 and EAT-R253 ordering (the draft cited R251; corrected under RA-10: R251 is native readback, the stop asymmetry is R252), not closed repro status.", "RA-01", "closed carrier repointed to wb-mwsy; lineage ids corrected (RA-10)"),
    ("EAT-R419", "coordinates wb-5a7k recovery help.", "coordinates the recovery help now carried by wb-mwsy (lineage: wb-5a7k, closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy).", "RA-01", "closed coordination target repointed to wb-mwsy"),
    ("EAT-R420", "actual controls coordinated with wb-5a7k.", "actual controls are carried by wb-mwsy (lineage: wb-5a7k, closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy).", "RA-01", "closed coordination target repointed to wb-mwsy"),
]

UPAD = "lineage: wb-upad (MWI-observe; closed 2026-11-11T05:28:31Z, consolidated into wb-9a1o)"
A5K = "lineage: wb-5a7k (MWI-controls; closed 2026-11-11T05:29:23Z, consolidated into wb-mwsy)"
TRK = "wb-1zn2 (deferred; MW-owned deliverables tracker, never a Pi filing target)"

# Exec and release rows: the drafted Maps-to line carried lineage remarks; they move to 'Predecessor lineage'.
LINEAGE_NEW = {
    "EAT-R421": "EAT-R221's condition \"/host does not exist\" is retired at 69cb016d.",
    "EAT-R422": "MW-side counterpart (MW H03) tracked in " + TRK + ".",
    "EAT-R423": "Carrier role: wb-y0n6 carries the Pi allowlist; the MW composed export is tracked in " + TRK + ".",
    "EAT-R424": "Carrier roles: wb-y0n6 (binding construction) and wb-w8fk (contract adoption).",
    "EAT-R425": "EAT-R286 is the Node 24 release profile.",
    "EAT-R426": "No further lineage stated in the draft.",
    "EAT-R427": "Carrier roles: wb-4bxo (dispatch) with wb-2ukh (authority rechecks).",
    "EAT-R428": "Packet roles: P06 (observation side) and P05 (dispatch side).",
    "EAT-R429": UPAD + " — the draft named it as carrier with wb-9a1o (RA-01).",
    "EAT-R430": "Packet / carrier roles: P08 (native arm) via the P06 projection; wb-p3i2 with wb-9a1o.",
    "EAT-R431": "No further lineage stated in the draft.",
    "EAT-R432": "Packet role: P10 wording for the P08 arm. No live bead carries the containment wording; the nearest live release/docs bead is wb-yiu4 (related, not the carrier).",
    "EAT-R433": "No further lineage stated in the draft.",
    "EAT-R434": "Producer counterpart MW H01 (mw-03 numbering) tracked in " + TRK + ".",
    "EAT-R435": "Packet roles: P06 / P07 (observation and settlement records); wb-9a1o with wb-mwsy; extends EAT-R245 criterion 4.",
    "EAT-R436": "EAT-R245 is extended at B07. " + UPAD + " — the draft named it as co-carrier (RA-01).",
    "EAT-R437": "Carrier role: wb-p3i2 (native); MW H01 tracked in " + TRK + "; new as an explicit attainability gate.",
    "EAT-R438": UPAD + " — the draft named it as the sole carrier (RA-01).",
    "EAT-R439": UPAD + " — the draft named it as carrier with wb-9a1o (RA-01).",
    "EAT-R440": UPAD + "; " + A5K + " — the draft named both as carriers (RA-01).",
    "EAT-R441": "Packet role: P05 reply.",
    "EAT-R442": "No further lineage stated in the draft.",
    "EAT-R443": "Producer counterpart MW H02 tracked in " + TRK + ".",
    "EAT-R444": A5K + " — the draft named it as co-carrier (RA-01).",
    "EAT-R445": "Carrier roles: wb-mwsy (V3 arms) and wb-9bof (V5 arms). " + A5K + " — the draft named it as the first carrier (RA-01).",
    "EAT-R446": "The draft stated bead lineage only.",
    "EAT-R447": "The draft stated bead lineage only.",
    "EAT-R448": "The draft stated bead lineage only. Lease implementation surface: wb-2ukh (related, not this row's carrier).",
    "EAT-R449": "The draft stated bead lineage only.",
    "EAT-R450": "The draft stated bead lineage only. Harness lineage: wb-7wkb (closed).",
    "EAT-R451": "The draft stated bead lineage only.",
    "EAT-R452": "The draft stated bead lineage only.",
    "EAT-R453": "The draft stated bead lineage only.",
    "EAT-R454": "The draft stated bead lineage only. Controls " + A5K + ".",
    "EAT-R455": "The draft stated bead lineage only.",
    "EAT-R456": "The draft stated bead lineage only.",
    "EAT-R457": "The draft stated bead lineage only.",
    "EAT-R458": "The draft stated bead lineage only.",
    "EAT-R459": "The draft stated bead lineage only.",
    "EAT-R460": "The draft stated bead lineage only.",
    "EAT-R461": "The draft stated bead lineage only.",
    "EAT-R462": "The draft stated bead lineage only.",
    "EAT-R463": "The draft stated bead lineage only. Harness lineage: wb-7wkb (closed).",
    "EAT-R464": "The draft stated bead lineage only. External-gates lineage: " + TRK + ".",
    "EAT-R465": "The draft stated bead lineage only.",
    "EAT-R466": "The draft stated bead lineage only.",
    "EAT-R467": "The draft stated bead lineage only. Controls " + A5K + ".",
    "EAT-R468": "The draft stated bead lineage only. Docs lineage: wb-12x1 (closed).",
    "EAT-R469": "The draft stated bead lineage only. MW-side obligations tracked under " + TRK + ".",
    "EAT-R470": "The draft stated bead lineage only. Epics: wb-1a3t (MWI) parents wb-w8fk, wb-4bxo, wb-9a1o, wb-mwsy, wb-p3i2, wb-zswl, wb-pxvv; wb-rhyt (MNI) parents wb-y0n6, wb-2ukh, wb-xr1z, wb-9bof, wb-yiu4; the parent ruling for new MII beads is owed (RA-20).",
}

# Extends-line remarks (RA-10). Default remarks are derived from the Matrix A verdict.
EXTENDS_NOTE = {
    "EAT-R391": "CORRECT — the draft cited R203/R204.",
    "EAT-R402": "CORRECT — the draft wrote the open range R280+.",
    "EAT-R403": "CORRECT — the draft cited R250 where R251 / R254 / R282 apply.",
    "EAT-R407": "CORRECT — the draft cited R224+ (R224 is installed-package serialization; the grant rows are R225 / R227 / R228).",
    "EAT-R410": "CORRECT — the draft cited R225+ (rights; source admission is R229-R231, R268).",
    "EAT-R418": "CORRECT — the draft cited R251 (native readback; stop asymmetry is R252).",
    "EAT-R408": "ADD — the draft restated EAT-R233 without naming it.",
    "EAT-R409": "ADD — EXTENDS and QUALIFIES EAT-R234: the Pi-side no-await chain remains necessary for the Pi-to-host handoff and is not the final boundary (E227, K034).",
    "EAT-R460": "ADD — the draft stated bead lineage only; EAT-R271's condition 'conditional on MW-INSTALLED-HOST' is retired at 69cb016d.",
}

# Maps-to special carriers (rows that owe a new bead).
NEW_CARRIER = {
    "EAT-R392": "new bead owed (P01 canonical input; no MNI carrier — wb-7wkb is the closed MNI P01 and different work)",
    "EAT-R393": "new bead owed (P01 canonical input; no MNI carrier)",
    "EAT-R394": "new bead owed (P01 canonical input; no MNI carrier)",
    "EAT-R395": "new bead owed (P01 canonical input; no MNI carrier)",
    "EAT-R396": "new bead owed (P01 canonical input; no MNI carrier)",
    "EAT-R397": "new bead owed (P01 canonical input; no MNI carrier)",
    "EAT-R413": "TO-BE-FILED at bead filing by the owner (new bead, blocks every effectful arm per the audit); legs EAT-R213 / R214 / R253 with EAT-R413 as the gate leg",
    "EAT-R432": "new bead owed (containment wording; no live carrier)",
}

RA22_ROWS = ["EAT-R412", "EAT-R414", "EAT-R417", "EAT-R418", "EAT-R419", "EAT-R427", "EAT-R438", "EAT-R439", "EAT-R440", "EAT-R441", "EAT-R442", "EAT-R445", "EAT-R454", "EAT-R465", "EAT-R466", "EAT-R467", "EAT-R468"]

# Filing-time tags that consolidation discharged although they sit outside RA-01..RA-10 (entangled with a blocking fix).
EXTRA_RESOLVED = {
    "EAT-R431": {"RA-19"},  # 'cites EAT-R253 without R413' is the RA-08 fix
    "EAT-R444": {"RA-19"},  # Maps-to cross-reference moved to Conditions; EAT-R413 cited
    "EAT-R446": {"RA-12"},
    "EAT-R447": {"RA-12"},
    "EAT-R448": {"RA-12"},
    "EAT-R449": {"RA-12"},
    "EAT-R464": {"RA-12"},
    "EAT-R421": {"RA-19"},
    "EAT-R446": {"RA-12", "RA-19"},
    "EAT-R449": {"RA-12", "RA-19", "RA-18"},
    "EAT-R451": {"RA-19", "RA-18"},
    "EAT-R459": {"RA-19", "RA-18"},
    "EAT-R466": {"RA-19"},
    "EAT-R470": {"RA-19", "RA-18"},
    "EAT-R455": {"RA-18"},
    "EAT-R456": {"RA-18"},
    "EAT-R460": {"RA-18"},
    "EAT-R465": {"RA-18"},
    "EAT-R405": {"RA-15"},
    "EAT-R414": {"RA-13"},
    "EAT-R426": {"RA-15"},
    "EAT-R439": {"RA-13", "RA-15"},
    "EAT-R461": {"RA-13", "RA-15"},
    "EAT-R468": {"RA-13", "RA-14", "RA-18"},
    "EAT-R469": {"RA-14", "RA-18"},
}
