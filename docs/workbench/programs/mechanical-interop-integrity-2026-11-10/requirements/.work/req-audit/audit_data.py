"""Curated per-row audit data for the MII Phase 10.9 requirement audit (EAT-R391..R470).

Every value here is an auditor judgment recorded on 2026-11-11 from the pinned substrate; the generator
joins it with the parsed drafts, the ledger and the live bead read. Nothing here is a test result.
"""

# --- live bead read (bd --readonly --json list --all --limit 0; cwd PrimaryInstallation/src/Pi-subagents) ---
BEAD_READ_AT = "2026-11-11T10:29:12Z"  # second full read; statuses below are from it
BEAD_FIRST_READ_AT = "2026-11-11T09:32:10Z"
# drift between the two reads (1,395 beads both times): wb-w8fk in_progress -> open (updated 2026-11-11T09:52:21Z)
BEAD_DRIFT = "wb-w8fk moved from in_progress to open at 2026-11-11T09:52:21Z (assignee unchanged); no other carrier changed between the reads of 09:32:10Z and 10:29:12Z"
BEAD_STATUS = {
    "wb-rhyt": "open", "wb-1a3t": "open", "wb-w8fk": "open", "wb-y0n6": "in_progress", "wb-2ukh": "in_progress",
    "wb-4bxo": "open", "wb-9a1o": "open", "wb-upad": "closed", "wb-mwsy": "open", "wb-5a7k": "closed",
    "wb-p3i2": "open", "wb-xr1z": "open", "wb-9bof": "open", "wb-yiu4": "open", "wb-zswl": "open",
    "wb-dlc6": "closed", "wb-pxvv": "in_progress", "wb-669r": "closed", "wb-7wkb": "closed", "wb-1zn2": "deferred",
    "wb-12x1": "closed", "wb-5ik5": "closed", "wb-s8rm": "closed", "wb-9v02": "closed", "wb-3121": "closed",
}

# audited live carrier per requirement (None = new bead owed); second element = note
BEAD = {}
for n in (391, 398, 405, 469, 470):
    BEAD[n] = ["wb-w8fk"]
for n in range(392, 398):
    BEAD[n] = []
for n in list(range(399, 405)) + list(range(406, 412)) + [464]:
    BEAD[n] = ["wb-2ukh"]
for n in (412, 419, 426, 441, 461, 465):
    BEAD[n] = ["wb-4bxo"]
BEAD[413] = []
for n in (414, 415, 416, 417, 418, 420, 442, 443, 444, 454, 467):
    BEAD[n] = ["wb-mwsy"]
for n in (421, 422, 423, 425, 460):
    BEAD[n] = ["wb-y0n6"]
BEAD[424] = ["wb-y0n6", "wb-w8fk"]
BEAD[427] = ["wb-4bxo", "wb-2ukh"]
for n in (428, 429, 433, 434, 436, 438, 439, 451, 452, 466):
    BEAD[n] = ["wb-9a1o"]
BEAD[430] = ["wb-p3i2", "wb-9a1o"]
for n in (431, 437, 457, 462):
    BEAD[n] = ["wb-p3i2"]
BEAD[432] = []
BEAD[435] = ["wb-9a1o", "wb-mwsy"]
BEAD[440] = ["wb-9a1o", "wb-mwsy"]
BEAD[445] = ["wb-mwsy", "wb-9bof"]
for n in (446, 449, 453):
    BEAD[n] = ["wb-xr1z"]
for n in (447, 448, 450, 455, 463):
    BEAD[n] = ["wb-9bof"]
for n in (456, 458, 459, 468):
    BEAD[n] = ["wb-yiu4"]

# draft targets that are closed at the live read -> (closed bead, successor)
RETARGET = {
    418: [("wb-5a7k", "wb-mwsy")],
    429: [("wb-upad", "wb-9a1o")],
    436: [("wb-upad", "wb-9a1o")],
    438: [("wb-upad", "wb-9a1o")],
    439: [("wb-upad", "wb-9a1o")],
    440: [("wb-upad", "wb-9a1o"), ("wb-5a7k", "wb-mwsy")],
    444: [("wb-5a7k", "wb-mwsy")],
    445: [("wb-5a7k", "wb-mwsy")],
}

# --- audited EXTENDS lineage into EAT-R201..R310 (MNI). verdict: OK | ADD | CORRECT | NEW ---
EXT = {
    391: (["R203", "R205"], "CORRECT", "draft names R203/R204; R204 is the grant ratification, the digest contract extends the ABI (R203) and its fail-closed admission (R205)"),
    392: ([], "NEW", "no R201-R310 row covers function-input dispatch identity (token scan: withoutBeadsNotes/inputDigest/canonical input = 0 hits in MNI bodies); earlier lineage EAT-R154; adjacent R235/R238"),
    393: ([], "NEW", "lineage is EAT-R154 (audit-11-06), outside R201-R310"),
    394: ([], "NEW", "lineage is EAT-R154; preserves pinned canonicalJson guards"),
    395: ([], "NEW", "negative cure of C095; lineage EAT-R154"),
    396: (["R223", "R229", "R230"], "ADD", "draft states none; host-measured basis extends source confinement (R229/R230) and model-provided authority (R223)"),
    397: (["R225", "R270"], "ADD", "draft states none; a request ceiling extends exact rights (R225) and no-capability-from-tool-input (R270)"),
    398: (["R207", "R232", "R269"], "OK", ""),
    399: (["R232", "R269"], "OK", "draft names R232; R269 (A12) is the registered-path sibling"),
    400: (["R232"], "OK", ""),
    401: (["R207", "R232", "R269"], "OK", ""),
    402: (["R232", "R278", "R280", "R281"], "CORRECT", "draft writes an open range 'R280+'; name the rows"),
    403: (["R232", "R251", "R254", "R282"], "CORRECT", "draft names R250 (intent-before-dispatch); the release law extends native readback (R251), effect count (R254) and the recovery oracle (R282)"),
    404: (["R207", "R226", "R232", "R303"], "OK", "add R226 (detach right) and R303 (optional extensions not blockers) for the first-release fence"),
    405: (["R203", "R204", "R205"], "OK", ""),
    406: (["R223", "R228", "R270"], "ADD", "draft names no EAT id"),
    407: (["R204", "R225", "R227", "R228"], "CORRECT", "draft cites 'R224+'; R224 is installed-package serialization - the grant rows are R225/R227/R228"),
    408: (["R229", "R233"], "ADD", "draft names no EAT id; R233 (host-minted current write attestation) is the same subject - delta is the production minting channel"),
    409: (["R228", "R234"], "ADD", "draft names no EAT id; QUALIFIES R234: the Pi-side no-await chain stays necessary for the Pi-to-host handoff but is not the final boundary (E227/K034)"),
    410: (["R229", "R230", "R231", "R268"], "CORRECT", "draft cites 'R225+'; R225 is rights - source admission is R229-R231, registered sweep R268"),
    411: (["R206", "R234", "R238"], "ADD", "draft names no EAT id"),
    412: (["R235", "R236", "R237", "R240", "R270"], "ADD", "draft names no EAT id"),
    413: (["R213", "R214", "R253"], "OK", "draft names R253 (+R160); R213/R214 are the V1 legs of the same witnessed defect (MNI audit F3)"),
    414: (["R239", "R250"], "OK", ""),
    415: (["R250", "R251", "R261"], "OK", "add R251/R261 (native readback; producer-defined receipts)"),
    416: (["R250"], "OK", "near-restatement of R250 with correlation and fault injection as the delta"),
    417: (["R254", "R281"], "ADD", "draft names no EAT id"),
    418: (["R243", "R252", "R253"], "CORRECT", "draft cites R251 (native readback); stop/cancel asymmetry is R252"),
    419: (["R205", "R238", "R243"], "ADD", "draft names no EAT id"),
    420: (["R251", "R254", "R282"], "ADD", "draft names no EAT id"),
    421: (["R220", "R221"], "OK", ""), 422: (["R220", "R222"], "OK", ""), 423: (["R221", "R223"], "OK", ""),
    424: (["R203", "R204", "R233"], "OK", ""), 425: (["R263", "R271", "R286"], "OK", ""), 426: (["R235", "R258"], "OK", ""),
    427: (["R225", "R228", "R238", "R267"], "OK", ""), 428: (["R242", "R243"], "OK", "R273 is the P08 sweep sibling"),
    429: (["R244", "R248"], "OK", ""), 430: (["R229", "R242", "R248"], "OK", ""), 431: (["R259", "R260", "R263", "R277"], "OK", ""),
    432: (["R293", "R310"], "OK", ""), 433: (["R244", "R245", "R274"], "OK", ""), 434: (["R245", "R274"], "OK", ""),
    435: (["R231", "R245"], "OK", ""), 436: (["R245", "R275"], "OK", ""), 437: (["R259", "R261", "R274"], "OK", ""),
    438: (["R239", "R246", "R275"], "OK", ""), 439: (["R244", "R247"], "OK", ""), 440: (["R247", "R248"], "OK", ""),
    441: (["R240", "R247"], "OK", ""), 442: (["R239", "R250"], "OK", ""), 443: (["R251", "R254", "R282"], "OK", ""),
    444: (["R251", "R253", "R282"], "OK", "the Maps-to line embeds a cross-reference to EAT-R445; move it to Conditions"),
    445: (["R252", "R254", "R256", "R280", "R281"], "OK", ""),
    446: (["R245", "R272", "R274"], "ADD", ""), 447: (["R251", "R254", "R280", "R282"], "ADD", ""), 448: (["R232", "R269", "R284"], "ADD", ""),
    449: (["R266", "R267", "R268", "R270", "R272"], "ADD", ""), 450: (["R216", "R257", "R278", "R280", "R281"], "ADD", ""),
    451: (["R247", "R248", "R275", "R281"], "ADD", ""), 452: (["R242", "R243", "R273"], "ADD", "thin delta: CLI-surface referent"),
    453: (["R238", "R266", "R272", "R279"], "ADD", "thin delta: independent detectors and coverage bound"),
    454: (["R252", "R280", "R282"], "ADD", "thin delta: exact native refs"), 455: (["R284", "R285"], "ADD", "thin delta: joined/native leg, unknown for unmeasured counters"),
    456: (["R291", "R307", "R308"], "ADD", "R307 already bars CI as the delivery mechanism and preserves existing CI files; delta is the bar on asserting absence (also EAT-R140 wording, outside R201-R310)"),
    457: (["R261", "R277", "R291"], "ADD", ""), 458: (["R208", "R241", "R291"], "ADD", ""), 459: (["R209", "R286", "R292", "R294"], "ADD", ""),
    460: (["R220", "R271"], "ADD", "R271's 'conditional on MW-INSTALLED-HOST' is retired at 69cb016d (C019/C073)"), 461: (["R235", "R265", "R304"], "ADD", ""),
    462: (["R259", "R260", "R263", "R277"], "ADD", ""), 463: (["R215", "R216", "R257", "R278", "R279", "R280", "R281"], "ADD", ""),
    464: (["R207", "R232", "R269"], "ADD", ""), 465: (["R249", "R289"], "ADD", ""), 466: (["R240", "R244", "R289"], "ADD", ""),
    467: (["R252", "R282", "R289"], "ADD", ""), 468: (["R288", "R290", "R293", "R294", "R306", "R308", "R310"], "ADD", ""),
    469: (["R206", "R209", "R309"], "ADD", ""), 470: (["R201", "R202", "R309"], "ADD", "R201 (re-pin record) is the carrier of the P00 re-pin duty the MII set does not restate"),
}

# --- intra-set links (behaviour/contract rows <-> verification/acquisition rows) ---
GROUPS = [
    ("canonical input / notes (G08)", [392, 393], [449], "R449[G08] is the falsifier evidence of R393/R392; one test family, owned by the P01 bead"),
    ("installed runtime integrity (G09, V2 gate)", [421, 422], [449, 460], "R460 is the tier gate consuming R421/R422 receipts; R449[G09] cites the same mutation test"),
    ("forged request authority (G10)", [406, 424, 465], [449], "R424 c2 and R465 c2 reuse the R406 forged-field battery"),
    ("revocation and source drift at the final boundary (P13, P14)", [407, 409, 410, 427], [449], "R427 c3 = P13; R410 c1 = P14"),
    ("lease lifetime and cross-process exclusivity (G06, G07)", [398, 399, 400, 401], [448, 464], "R464 is the acquisition receipt of R448 passing against R399-R401; it is not a second substrate"),
    ("crash fence and recovery (G11, P18, V5)", [402, 420, 445], [450, 463], "R463 runs the R450 harness over the joined route"),
    ("strict assurance consumption (G01, G02, G03, G12)", [433, 434, 435, 436], [437, 446], "R446 is the falsifier evidence of R434/R435/R436; R437 settles attainability"),
    ("uncertain effect and non-occurrence (G04, G05)", [403, 420, 443], [447], "R447 is the falsifier evidence of R443"),
    ("observation integrity (P15, P16, P17)", [417, 429, 440, 442], [451], "R451 is the falsifier evidence of R440 (P15/P17) and R417 (P16)"),
    ("four domain outcomes", [428], [452], "R452 restates R428 c1/c2 and adds the CLI-surface referent"),
    ("zero effects on denial", [397, 427], [453], "R453 is the detector/positive-control discipline of R427"),
    ("cancel requested vs established", [418, 445], [454, 467], "four rows state the same distinction: R418 owns the transition table, R445 c1 the post-dispatch control reply, R454 the reporting, R467 the operator help"),
    ("release law and audited override", [403], [467], "R467 c2 restates R403 c3"),
    ("registered route (V3 gate)", [412, 426], [461], "R461 is the tier gate consuming R412/R426 receipts"),
    ("joined native receipt (V4)", [425, 430, 431, 457], [462], "R431 and R462 are one acquisition; see RA-05"),
    ("launch reply and envelope", [412, 441], [466], "three rows constrain one reply; see RA-02 and RA-09"),
    ("journal and intent before dispatch", [414, 416, 442], [], "R416 (correlated intent before handoff) and R442 (intent row before the composed call, fail closed) are one ordering obligation seen from two clusters"),
    ("producer intent correlation and lookup", [415, 444], [], "R415 acquires the contract R444 consumes"),
    ("refusal and reason mapping", [419, 427, 428], [467], "R467's reason help must read the R419 table"),
    ("same-invocation observation durability", [414, 438, 439], [463], "R463 c3 restates R438 c2"),
]

# --- findings ---
BLOCKING = ["RA-01", "RA-02", "RA-03", "RA-04", "RA-05", "RA-06", "RA-07", "RA-08", "RA-09", "RA-10"]
# row -> finding tags; AMEND rows are those needing a text change before filing
TAGS = {}
def _t(ids, tag):
    for i in ids:
        TAGS.setdefault(i, []).append(tag)
_t([418, 429, 436, 438, 439, 440, 444, 445], "RA-01")
_t([441], "RA-02")
_t([401, 446], "RA-03")
_t([391, 398, 447, 458], "RA-03s")
_t([448, 450, 463, 464], "RA-04")
_t([431, 462], "RA-05")
_t([470], "RA-06")
_t([404, 412, 438], "RA-06s")
_t([469], "RA-07")
_t([459], "RA-07s")
_t([413], "RA-08")
_t([431, 444, 445], "RA-08s")
_t([412, 441, 466], "RA-09")
_t([391, 402, 403, 407, 410, 418], "RA-10")
_t([396, 397, 406, 408, 409, 411, 412, 417, 419, 420], "RA-10s")
_t(list(range(446, 471)), "RA-10s")
_t([446, 447, 448, 449, 464], "RA-12")
_t([414, 439, 459, 461, 468, 470], "RA-13")
_t([468, 469], "RA-14")
_t([405, 425, 426, 439, 443, 444, 445, 461], "RA-15")
_t([423, 438, 440, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 456, 459, 462, 464, 466, 467, 468, 470], "RA-16")
_t([449, 451, 455, 456, 459, 460, 465, 468, 469, 470], "RA-18")
_t([421, 424, 431, 438, 444, 446, 449, 451, 459, 461, 462, 466, 470], "RA-19")
_t([470], "RA-20")
AMEND = {401, 407, 410, 412, 413, 418, 429, 431, 436, 438, 439, 440, 441, 444, 445, 446, 448, 450, 462, 463, 464, 466, 469, 470}

# --- audited V tiers where the draft tier is wrong or incomplete ---
VT_FIX = {
    446: (["V1", "V3"], "draft 'V1 (producer red/mutant) + V4 projection': the V1 leg named is MW-owned, and an injected envelope defect cannot be produced by a real Forge run - the Pi legs are V1 (validator unit + mutant) and V3 (projection through the registered route, as R434-R436 state); the one real envelope is EAT-R437's V4 arm"),
    447: (["V1", "V3", "V5"], "draft omits V3 although R443 (same tests) is V3 barrier-injected + V5"),
    448: (["V1", "V3", "V5"], "statement says 'through the registered route' (= V3) but the tier line omits V3; R400 carries V1/V3/V5"),
    449: (["V1", "V2", "V3"], "G09 is a V2 installed-consumer test (R422) repeated at V3; the tier line omits V2"),
    464: (["V1", "V3", "V5"], "the G06 arm is a registered-route test (V3)"),
}

# --- L1..L10 cells: A | * + gate (A*) | S | . ---
C = {
    391: "A *CON A A A . . . *COV *RAT", 392: "A *CON A A A A . A *COV A", 393: "A . A A A . . A *COV A", 394: "A . A A A . . A *COV A",
    395: "A . A A A . . . *COV A", 396: "A *CON A A A . . A *COV *RAT", 397: "A . A A A . . A *COV *RAT", 398: "A *CON . A A *FLT . . *COV *RAT",
    399: "A . A A A *FLT . . *COV A", 400: "A . A A A *FLT . A *COV A", 401: "A *CON A A A *FLT . . *COV A", 402: "A . A A A *FLT . A *COV A",
    403: "A . A A A *FLT A . *COV A", 404: "A . A A A *FLT . . *COV *RAT", 405: "A *CON A A A . . A *COV *RAT", 406: "A . A A A *FLT . A *COV A",
    407: "A *CON A A A . . A *COV A", 408: "A *CON A A A . . A *COV *RAT", 409: "A *CON A A A *FLT . . *COV A", 410: "A *CON A A A . . A *COV A",
    411: "A *CON A A A . . . *COV *RAT", 412: "A *CON A A A A . A *COV A", 413: "A . A A A *FLT . A *COV A", 414: "A . A A . *FLT . A *COV *RAT",
    415: "*CON *CON A A A *FLT . . . *RAT", 416: "A . A A A *FLT . . *COV A", 417: "A . A A A *FLT . A *COV A", 418: "A A A A A *FLT A A *COV A",
    419: "A *CON A A A . A A *COV *RAT", 420: "A *CON A A A *FLT A A *COV A",
    421: "*CON *CON A A A . . . *COV A", 422: "*CON *CON A A A . . . *COV A", 423: "*CON *CON A A A . . . *COV A", 424: "A . A A A . . . *COV *RAT",
    425: "*CON *CON A A A . A . *COV *NAT", 426: "A . A A A A . A *COV A", 427: "A . A A A . . A *COV A", 428: "A A A A A . A A *COV A",
    429: ". . A A A . . . *COV A", 430: "A A A A A *NAT . A *COV *NAT", 431: "*NAT *NAT *NAT A . *NAT . *NAT . *NAT", 432: "A A A A . . A A *COV A",
    433: "A A A A A . A A *COV *ENV", 434: "A . A A A . . . *COV *ENV", 435: "A A A A A . . . *COV *ENV", 436: "A A A A A A A A *COV *ENV",
    437: "*ENV . . A . . . . . *ENV", 438: "A A A A A *FLT A A *COV A", 439: "A A A A A . A A *COV A", 440: "A A A A A . . A *COV A",
    441: "A A A A A . A A *COV *RAT", 442: "A . A A A *FLT . . *COV A", 443: "A A A A A *FLT A A *COV A", 444: "A *CON A A A *FLT A A *COV A",
    445: "A A A A A *FLT A A *COV A",
    446: ". . A A A . . . . A", 447: "A . A A A *FLT . . . A", 448: "A . A A A *FLT . . . A", 449: "*CON *CON A A A . . . . A",
    450: "A . A A A *FLT . . . A", 451: ". A A A A . . A . A", 452: "S A A A A . A A *COV A", 453: "A . A A A . . . . A",
    454: "A A A A A *FLT A A *COV A", 455: "*FLT . . A . *FLT . . . *FLT", 456: "A . . A . . . . *COV A", 457: "*NAT . *NAT A A *NAT . . *COV *NAT",
    458: "A *RAT . A A . . . *COV *RAT", 459: "A . . A A . A . *COV A", 460: "*CON *CON . A . . . . . A", 461: "A . A A . A . A . A",
    462: "*NAT . *NAT . . *NAT . *NAT . *NAT", 463: "*FLT . A . A *FLT . *FLT . *FLT", 464: "*FLT . A A . *FLT . . . *RAT", 465: ". A A A A . A A *COV A",
    466: ". A A A A . A A *COV *RAT", 467: "A A A A A *FLT A A *COV *RAT", 468: "A A . A . . A A . A", 469: "A . . A A . . . *COV *RAT",
    470: "A . . A . . . . *COV A",
}

# --- gate status per row: (STATUS, exact reason) ---
ST = {
    391: ("BLOCKED", "G-RATIFY: joint digest construction unratified (E232: MW 69cb016d has no reader of Pi's `workbench.identity/v1` domain; E164 three Pi digests); Pi vector file and Pi reader legs are NOT_RUN"),
    392: ("NOT_RUN", "admission-only tests green today are controls; the registered-route leg waits for the P05 branch, the installed-host entry capture for the ratified fixture-host seam (K032)"),
    393: ("NOT_RUN", "seam-level note tests are already green at the pin (E169: test/workbench-function-authority.test.ts:2302) and count as controls; the new red is the registered route (P05)"),
    394: ("NOT_RUN", "pinned canonicalJson guards (identity.ts:104,136-137,146) are regression controls; new red is the carrier at the registered route (P05)"),
    395: ("NOT_RUN", "negative-only cure of REFUTED C095; no external blocker"),
    396: ("BLOCKED", "G-RATIFY: K011 request-surface decision (host injection vs caller comparison) not recorded"),
    397: ("BLOCKED", "G-RATIFY: policy-omission semantics (M084) not recorded"),
    398: ("BLOCKED", "G-RATIFY: token fields, current-generation verifier and enforcement modality (K013/K035); MW side tracked by wb-1zn2 (deferred)"),
    399: ("NOT_RUN", "Pi-only substrate; token fields final only after EAT-R398 is ratified"),
    400: ("NOT_RUN", "needs the durable store (EAT-R399) and the P05 branch; the first-edit barrier needs the fixture host"),
    401: ("BLOCKED", "the provider-entry fence check is producer code (mw-03 H06, absent at 69cb016d) and EAT-R398 is unratified; Pi verifier leg NOT_RUN"),
    402: ("NOT_RUN", "needs EAT-R399; joined kill windows additionally need the composed host (mw-03 H06)"),
    403: ("BLOCKED", "settlement / non-occurrence evidence schema follows EAT-R415 (MW invocation-keyed lookup and certificate absent)"),
    404: ("BLOCKED", "G-RATIFY: K014 overlap / exempt-writer policy not recorded"),
    405: ("BLOCKED", "G-RATIFY: joint ratification record does not exist (C107: adoption is not mechanically gated; wb-1zn2 deferred)"),
    406: ("NOT_RUN", "trust-store placement is a host configuration choice; Pi-only"),
    407: ("BLOCKED", "conditional on EAT-R405 adoption (G-RATIFY)"),
    408: ("BLOCKED", "G-RATIFY: production attestation minting channel undecided (E157 CONTESTED)"),
    409: ("BLOCKED", "live-reader API of the composed host is producer work (mw-03 H06); Pi-side reader construction NOT_RUN"),
    410: ("NOT_RUN", "pure source checks green today are controls; the candidate-stage mapping consumes the producer's stage proof (G-RATIFY)"),
    411: ("BLOCKED", "G-RATIFY: DAG / identifier ruling (C140, C142, C163 UNSUPPORTED)"),
    412: ("NOT_RUN", "definitionally red at the pin (`unsupported-definition-kind`, execute-tool.ts:218); prerequisites EAT-R391..R411, readiness gate EAT-R413"),
    413: ("NOT_RUN", "witnessed repro exists (test/workbench-mwi-cancel-repro.test.ts, kind observed-violation); the repair has no live carrier (RA-08)"),
    414: ("BLOCKED", "G-RATIFY: storage decision extend-vs-supersede (M119; EAT-R239/R250)"),
    415: ("BLOCKED", "MW exports no invocation-keyed lookup (ERR_PACKAGE_PATH_NOT_EXPORTED for dist/effect-intent.js at 69cb016d, E464; mw-03 H02/H07; wb-1zn2)"),
    416: ("BLOCKED", "on EAT-R415 (identifiers) and EAT-R414 (durable store)"),
    417: ("NOT_RUN", "observation.ts:638 ingest() is an existing primitive (control); durable fresh-process replay needs the journal extension (EAT-R414)"),
    418: ("BLOCKED", "G-RATIFY: transition enum / native-control mapping; effectful arms behind EAT-R413"),
    419: ("BLOCKED", "G-RATIFY: K009 vocabulary ruling; producer HOST_* codes have 0 occurrences at 69cb016d (E114)"),
    420: ("BLOCKED", "on EAT-R415 lookup, EAT-R403 release law and producer disposition (mw-03 H02/H07)"),
    421: ("NOT_RUN", "V2 leg is unblocked at 69cb016d (C019/C073: ./host imports from a tarball-installed consumer); the rig allowlist entry is a G-RATIFY item (M011)"),
    422: ("NOT_RUN", "Pi-computed manifest path is runnable now; the producer-emitted manifest is mw-03 H03 (wb-1zn2)"),
    423: ("BLOCKED", "positive arm: COMPOSED-EXPORT absent at 69cb016d (E114; mw-03 H06); refusal arm NOT_RUN"),
    424: ("BLOCKED", "G-RATIFY: closed allowedEffects set and grant spelling"),
    425: ("NOT_RUN", "V2 identity leg runnable (host node v24.20.0; mise 22.23.2 for the refusal arm); V4 leg BLOCKED by G-NATIVE"),
    426: ("BLOCKED", "COMPOSED-EXPORT (mw-03 H06) or a ratified fixture-host injection seam (K032); P05 branch"),
    427: ("NOT_RUN", "needs the P05 positive control; the pin-time universal refusal is a baseline only"),
    428: ("NOT_RUN", "P05 branch; fault-code table is a G-RATIFY item (K009)"),
    429: ("BLOCKED", "the shipped export has no progress member (E036; mw-03 H06/H07); stage table unratified (E236)"),
    430: ("BLOCKED", "producer implement-evidence shape unratified (E114); V4 arm by G-NATIVE"),
    431: ("BLOCKED", "G-NATIVE: MW composed host and native services (mw-03 H05/H06/H07), EAT-R253 repair receipt (no live carrier), credentials not probed; strict clause UNDETERMINED (EAT-R437)"),
    432: ("NOT_RUN", "docs census leg runnable today; payload leg waits for P05"),
    433: ("BLOCKED", "certificate carrier UNDETERMINED (E239); producer certificate absent (mw-03 H01); enumeration unratified (K008)"),
    434: ("BLOCKED", "no producer certificate at 69cb016d (mw-03 H01); pinned-environment axis unattained (EAT-R437)"),
    435: ("NOT_RUN", "negative arm runs on injected envelopes; positive control BLOCKED on the producer certificate"),
    436: ("NOT_RUN", "weak-drift arm runnable after P05; strict-drift arm BLOCKED on the producer certificate"),
    437: ("BLOCKED", "G-FORGE-ENVELOPE: UNDETERMINED - 148/148 committed occurrences read pinned:false (ledger); the installed Forge envelope was not probed by the triage; alternative (b) is a G-RATIFY decision"),
    438: ("NOT_RUN", "P05 branch and the durable task record (EAT-R414)"),
    439: ("NOT_RUN", "P05 branch; certificate and stage fields are G-RATIFY items"),
    440: ("NOT_RUN", "P05 branch; null/omitted representation unratified (M126)"),
    441: ("NOT_RUN", "criterion 1 must be amended first (RA-02); then P05"),
    442: ("NOT_RUN", "journal extension is Pi-only; the event-name table is a G-RATIFY item (E236)"),
    443: ("NOT_RUN", "negative arms reach `unknown` by design today; positive arm BLOCKED: no producer non-occurrence certificate (mw-03 H02)"),
    444: ("BLOCKED", "MW exported lookup (mw-03 H02/H07); the static import census leg is NOT_RUN and runnable now"),
    445: ("NOT_RUN", "V3 arms after P05; effectful arms BLOCKED on the EAT-R253 repair receipt; real-kill arm by G-FAULT"),
    446: ("BLOCKED", "certificate field paths unratified (EAT-R458) and no producer certificate; row must be amended first (RA-03, RA-12)"),
    447: ("NOT_RUN", "Pi-side arms after P05 and EAT-R399; the producer-side red is MW-owned and consumed, not written"),
    448: ("NOT_RUN", "definitionally red until EAT-R399-R401 land; conditions must be amended first (RA-04)"),
    449: ("NOT_RUN", "G09 leg runnable at V2 now; G08/G10/P13/P14 after P05"),
    450: ("NOT_RUN", "harness lineage exists (test/worktree-process-kill-preservation.test.ts; wb-7wkb closed); needs EAT-R399-R403 and EAT-R414-R417"),
    451: ("NOT_RUN", "P05 branch and the P06 bridge; seam-level greens are controls (E169)"),
    452: ("NOT_RUN", "P05 branch; the CLI surface stays S until the owner resolves its referent (C219)"),
    453: ("NOT_RUN", "needs the P05 positive control"),
    454: ("NOT_RUN", "P05 branch; the post-dispatch arm is behind the EAT-R253 repair receipt"),
    455: ("NOT_RUN", "script-baseline leg runnable now (qa/workbench/mwi-multiworkflow-load.mjs); joined/native leg BLOCKED by G-NATIVE"),
    456: ("NOT_RUN", "validator and grep gate; no external blocker"),
    457: ("BLOCKED", "G-NATIVE"),
    458: ("BLOCKED", "G-RATIFY: joint schema (K031: the two receipt templates cannot be joined by field today)"),
    459: ("BLOCKED", "G-RATIFY: the crosswalk (EAT-R469) precedes the veto-table freeze"),
    460: ("NOT_RUN", "unblocked for the shipped subpath; host node v24.20.0 lies inside the declared overlap >=24 <25"),
    461: ("BLOCKED", "P05 branch and grant adoption (EAT-R405)"),
    462: ("BLOCKED", "G-NATIVE; the external-store census leg is NOT_RUN and runnable now (read-only)"),
    463: ("BLOCKED", "needs the EAT-R450 harness, the durable lease/journal rows and the joined route"),
    464: ("NOT_RUN", "the proof follows EAT-R448 passing; the 'compatible' referent is an owner decision (G-RATIFY)"),
    465: ("NOT_RUN", "P05 branch (registered capability metadata)"),
    466: ("BLOCKED", "G-RATIFY: envelope and launch-status decision (RA-09)"),
    467: ("BLOCKED", "G-RATIFY: producer code vocabulary (EAT-R469)"),
    468: ("NOT_RUN", "precondition recorded red: the wb-12x1 census is red on master per the ledger (C220/E010: 4 failures at 0fb90672, 8 at 3fc0ead1; not re-run here)"),
    469: ("BLOCKED", "G-RATIFY: joint sign-off; MW side tracked by wb-1zn2 (deferred)"),
    470: ("NOT_RUN", "Pi-only map and validator; bead statuses must be live reads"),
}

# --- requirement-specific justification of the non-A cells ---
NOTE = {
    391: "L2: installed-MW vector reader in a fresh consumer. L6-L8 ·: a vector contract has no lifecycle, operator or agent journey of its own (exercised through R392). L10: the ratified vector file is the release evidence.",
    392: "L2: entry bytes captured at the Pi-to-installed-host boundary. L7 ·: no operator surface (digest shown by R439).",
    393: "L2 ·: note members never cross the package boundary (they are omitted before dispatch). L6/L7 ·: no state lifecycle, no operator surface.",
    394: "L2 ·: refusal happens before any host entry. L6/L7 ·: stateless refusal.",
    395: "L2 ·: wording/budget surface is Pi-local. L6-L8 ·: a negative wording regression has no journey; the budget table is read by the docs lint at L1.",
    396: "L2: host-resolved workspace/basis must equal what the installed host receives. L6/L7 ·: admission-time binding only. L10: the K011 decision record.",
    397: "L2 ·: the ceiling is decided before any host entry. L6/L7 ·: admission-time only. L10: the omission-semantics decision record.",
    398: "L2: Pi-held token validated by the installed composed host. L3 ·: an interface record - composition is exercised by R399-R401. L6: cross-process token fixture. L7/L8 ·: no operator/agent surface of its own. L10: the ratified ABI fixture.",
    399: "L2/L7/L8 ·: host-internal reservation store (operator view R467, agent-visible refusal R400). L6: two real Pi processes plus a fresh third reader.",
    400: "L2/L7 ·: lease lifetime is host-internal. L6: second process refused while the worker is held at the first-edit barrier.",
    401: "L2: stale token replayed against the installed composed host. L6: resumed stale worker in a second process. L7/L8 ·: no operator/agent surface.",
    402: "L2/L7 ·: custody state is host-internal (operator view R467). L6: real kill after first edit / commit / gate dispatch, fresh-process read.",
    403: "L2/L8 ·: release is a host/operator act, never an agent act. L6: release table over real custody transitions. L7: the audited operator override.",
    404: "L2/L7/L8 ·: a policy record. L6: concurrent non-overlapping roots under the resource cap. L10: the K014 decision record.",
    405: "L2: installed-host evidence digests named by the record. L6/L7 ·: readiness is computed at registration/admission. L10: the ratification record itself.",
    406: "L2/L7 ·: trust-source integrity is host-internal. L6: writer attempts to mutate the authority source during a run.",
    407: "L2: exact grant carried to the installed host. L6/L7 ·: admission and final-boundary checks only.",
    408: "L2: attestation consumed by the installed host. L6/L7 ·: admission-time. L10: the minting-channel decision record.",
    409: "L2: live readers handed to the installed composed host. L6: revocation after handoff in a second process. L7/L8 ·: no operator/agent surface.",
    410: "L2: stage-specific basis consumed by the installed host. L6/L7 ·: boundary checks only.",
    411: "L2: closure readiness is a prerequisite in the trace. L6-L8 ·: an ordering contract. L10: the DAG ruling.",
    412: "L2: reviewed artifact admission through the installed host. L7 ·: operator view is R465/R466.",
    413: "L2/L7 ·: readiness gate is host-internal. L6: parked-beforeDispatch barrier with a real skip/retry.",
    414: "L2/L7 ·: storage lineage is host-internal. L5 ·: one decision, no input surface. L6: declared restart model. L10: the storage decision record.",
    415: "L1/L2: query through the ratified public host API from a fresh installed consumer. L6: process death between the Pi dispatch marker and the producer intent, read from a fresh process. L7/L8 ·: an evidence acquisition. L9 ·: adds no production branch until settled. L10: the joint record.",
    416: "L2/L7/L8 ·: persistence ordering is host-internal. L6: kill at intent-before-dispatch and dispatch-before-ack.",
    417: "L2/L7 ·: projection rebuild is host-internal. L6: fresh-process rebuild from duplicate/late events.",
    418: "L6: lost acknowledgment and double stop across processes.",
    419: "L2: producer HOST_* codes consumed from the installed host. L6 ·: a mapping table. L10: the K009 ruling.",
    420: "L2: read-only producer lookup through the public API. L6: kill / lost ack then restart and reattach.",
    421: "L1/L2: fresh external consumer outside both repositories. L6-L8 ·: artifact admission has no lifecycle or journey of its own (R412/R426 carry them).",
    422: "L1/L2: mutated installed dist file with the tarball untouched. L6-L8 ·: as R421.",
    423: "L1/L2: both exports present in the installed host. L6-L8 ·: as R421.",
    424: "L2 ·: the binding is constructed Pi-side; producer acceptance is a shape check only. L6-L8 ·: admission-time. L10: ratified allowedEffects set.",
    425: "L1/L2: SDK resolution seen from the consumer root. L6/L8 ·: an admission record. L7: operator reads the runtime-unavailable reason. L10: real SDK identity in the V4 receipt.",
    426: "L2/L7 ·: call census is host-internal (agent view through the reply). The V4 instance named in the tier line is EAT-R431's receipt, not a cell of this row.",
    427: "L2/L6/L7 ·: denial happens before any host entry or state.",
    428: "L6 ·: projection of a terminal value, no lifecycle of its own. The V4 arms named in the tier line arrive with EAT-R431.",
    429: "L1/L2 ·: the sink is in-process and has no outside surface (observed through R439). L6-L8 ·: data-only channel.",
    430: "L6: real Claude SDK candidate commit. L7 ·: operator view is R466. L10: native candidate facts in the V4 receipt.",
    431: "all applied cells run only through G-NATIVE. L5/L7 ·: one receipt, no input surface or operator journey. L9 ·: an acquisition, adds no production branch (validator covered at L4).",
    432: "L5/L6 ·: a wording census.",
    433: "L6 ·: a projection. L10: one strict instance needs the real envelope (EAT-R437).",
    434: "L2/L7/L8 ·: validation is host-internal (result shown by R433/R439). L6 ·. L10: as R433.",
    435: "L6-L8 ·: the null verified tree is shown through R439. L10: as R433.",
    436: "L10: as R433.",
    437: "L1/L10: one real gate.run envelope or the decision record. L2/L3/L5-L9 ·: an attainability acquisition; only its validator (L4) is code.",
    438: "L6: registry dropped and rebuilt from the durable record (restart).",
    439: "L6 ·: a read projection.",
    440: "L6/L7 ·: representation rule, operator view is R466.",
    441: "L6 ·: a single reply. L10: envelope decision record (RA-09).",
    442: "L2/L7/L8 ·: journal rows are host-internal (shown through R439). L6: unwritable journal and kill windows.",
    443: "L6: lost acknowledgment after ignored-path / edit-revert effects, then reconcile.",
    444: "L2: exported lookup resolved from the installed host. L6: two Pi hosts recovering one intent.",
    445: "L6: real SIGKILL of an independently controlled child.",
    446: "L1/L2 ·: injected envelopes reach Pi through its Forge observer path only. L6-L8 ·: falsifier suite. L9 ·: test rows add no production branch (credited to R433-R436).",
    447: "L1: the out-of-worktree arm needs an outside-process oracle. L6: lost acknowledgment across a real process boundary. L2/L7/L8 ·: falsifier suite. L9 ·: credited to R443.",
    448: "L1: two real Pi processes. L6: kill and restart of the first process. L2/L7/L8 ·: falsifier suite. L9 ·: credited to R399-R401.",
    449: "L1/L2: the G09 arm runs in the fresh consumer. L6-L8 ·: falsifier suite. L9 ·: credited to R393/R406/R407/R410/R422.",
    450: "L2/L7/L8 ·: falsifier suite. L6: real kill harness. L9 ·: credited to R402/R445.",
    451: "L1 ·: in-process bridge tests. L6/L7 ·. L8: agent replays a captured ref. L9 ·: credited to R417/R440.",
    452: "L1 S: doc-04 names 'CLI output' but Pi has no bin/CLI export at the pin (C219) - skipped until the owner names the binary or re-scopes the surface. L6 ·.",
    453: "L1: workspace/effect detector reads git status and tree hash from outside the process. L2/L6-L8 ·: detector discipline. L9 ·: credited to R427.",
    454: "L6: cancel after dispatch with a live writer.",
    455: "L1/L6/L10: real concurrent processes (1/4/16 + same-root). L2/L3/L5/L7/L8 ·: a measurement run. L9 ·: adds no production branch.",
    456: "L2/L3/L5-L8 ·: a receipt-custody validator and a wording gate.",
    457: "all non-validator cells run only through G-NATIVE. L2/L7/L8 ·: capture instrumentation.",
    458: "L2/L10: join with the MW receipt needs the joint mapping. L3/L6-L8 ·: a schema and validator.",
    459: "L2/L3/L6/L8 ·: a gate table and its runner. L7: the operator's release decision.",
    460: "L1/L2: the gate itself is the fresh-consumer run. L3/L5-L9 ·: a tier gate consuming R421/R422 evidence.",
    461: "L2/L5/L7 ·: a tier gate consuming R412/R426 evidence. L9 ·: adds no production branch.",
    462: "all applied cells run only through G-NATIVE (the external-store census is an L1 read runnable now). L2/L4/L5/L7/L9 ·: an acquisition.",
    463: "L1/L6/L8/L10: real kill-at-stage runs over the joined route. L2/L4/L7/L9 ·: an acquisition.",
    464: "L1/L6: two real processes and a restart. L2/L5/L7-L9 ·: an acquisition. L10: the 'compatible' decision record.",
    465: "L1/L6 ·: inspect is an in-process registered tool read.",
    466: "L1/L6 ·: reply and projection shape. L10: envelope decision record.",
    467: "L6: override and reattach across processes. L10: ratified reason-to-code table.",
    468: "L3/L5/L6/L9 ·: documentation cut; its readers are censuses and lints.",
    469: "L2/L3/L6-L8 ·: a table and its validator/lint. L10: joint sign-off.",
    470: "L2/L3/L5-L8 ·: a map and its validator.",
}
