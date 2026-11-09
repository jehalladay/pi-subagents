# REQUIREMENTS-AUDIT — Phase 10.9 requirement-set audit

Program: `mechanical-native-interoperability-2026-11-09` (Pi-subagents). Audit date: 2026-11-09. Role: PHASE 10.9 requirement-set auditor (epistemic-adversarial-triage).

Pins: program docs Pi `b085c34e` (pi-02, pi-03 normative); Pi environment `8e2fedeb` (claim judgments); MW environment `62a10b59`; MW sibling docs `7f3809fd` (context only). This is an **L0 static audit of the compiled requirement set**: no tests, builds, installs, or native launches were executed; all empirical statuses are the FINAL ledger statuses of `epistemic-triage/CLAIMS.jsonl` (289 rows).

Audited inputs:

- `requirements/.work/req-r-foundations.md` (EAT-R201..R234, 34 rows) + `map-r-foundations.jsonl`
- `requirements/.work/req-r-lane.md` (EAT-R235..R264, 30 rows) + `map-r-lane.jsonl`
- `requirements/.work/req-r-tail.md` (EAT-R265..R294, 30 rows) + `map-r-tail.jsonl`
- `requirements/.work/req-r-optional-ops.md` (EAT-R295..R310, 16 rows) + `map-r-optional-ops.jsonl`
- `epistemic-triage/CLAIMS.jsonl` (289 FINAL rows), `epistemic-triage/REMEDIATION.md` (M001–M039)
- `docs/pi-02-IMPLEMENTATION-PACKAGES.md`, `docs/pi-03-VERIFICATION-AND-RELEASE.md`

Detection surfaces (stated per the hard rules — every absence claim below is bounded to its searched surface):

- **Citation/laundering scan:** regex `\bC\d{3}\b( STATUS)?` over all four requirement files (headers and bodies): 873 citation tokens, 744 with an inline status label, 222 distinct claims cited; the map rows reference exactly the same 222 claims. Every inline status label was compared with the ledger FINAL status. Weak-status citations (REFUTED/UNSUPPORTED/CONTESTED/UNDETERMINED) were additionally required to carry an explicit status marker within the citing requirement; the 3 contextual exceptions were read in full (see check 1). 18 requirement bodies were spot-read end-to-end.
- **Structure scan:** headings `## EAT-R\d+ —`, `Type/Authority/Statement/Rationale/Acceptance criteria/Evidence tier target/Maps-to` fields, numbered criteria, and 1:1 join against the 110 map rows.
- **Family coverage scan:** row-id and section tokens (`A01..A14`, `B01..B14`, section C/D/E/F/G/H references) over requirement bodies. A requirement covering a family without using these tokens would be missed by this model; the family sets below were spot-confirmed against titles.

## Check results

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | No rationale states a premise stronger than its audited status (laundering) | **PASS** | 0 mismatches among 744 status-labeled citations vs ledger FINAL statuses. All 18 weak-status claims (13 REFUTED, 3 UNSUPPORTED, 1 CONTESTED, 1 UNDETERMINED) are cited with status named and used only via their `permittedWording` remainder (e.g. R281/R282 cite "C075 permitted wording" — the ledger-sanctioned remainder, with the four-producer reconciliation fact separately carried by C074 ESTABLISHED). Spot-reads: R202, R204, R208, R210, R213, R214, R216, R220, R234, R249, R253, R255, R257, R264, R271, R276, R280–R283, R291, R293, R294, R299, R300, R309, R310. One wording nit (F5). |
| 2 | Every operationally material UNDETERMINED/CONTESTED claim maps to verification/instrumentation or an explicit deferral | **PASS** | Ledger has exactly 1 material CONTESTED (C164) and 1 material UNDETERMINED (C221). C164 → EAT-R206 (joint-DAG ruling requirement) + preserved-not-resolved conditions on R205, R209, R235, R259, R264 (edge-filing block), R294, R309. C221 → explicit named deferral (REMEDIATION M015; foundations "Scope dispositions", lane compile notes, optional-ops dispositions) with the operative protection compiled as R241/R259/R263 (labels-become-claims-only-via-receipts, C222) and preservation duties in R293 crit. 6 / R310. The UNDETERMINED host-death member carried inside C089/M006 → EAT-R216, EAT-R257, EAT-R281 crit. 5 (EVIDENCE_ACQUISITION). |
| 3 | Every REFUTED premise appears only as negative/regression | **PASS** | All 13 REFUTED claims map to 30 requirement rows; each use is negative, conditional, or corrected-wording: C026→R202/R293; C071→R213/R216/R253/R275; C075→R250/R251/R280/R281/R282; C089→R213/R214/R216/R253/R257/R275/R279/R281; C166→R206/R208/R264/R277; C176→R202/R210/R255/R280/R283 (M009 corrected form mandated in receipts); C180→R202/R211; C201→R239/R258/R283/R297 (bounded "never verify none exists"); C204→R203/R249/R262/R276/R299/R310; C205→R208/R261/R277/R291 (label treated as unratified); C218→R276/R300/R310; C239→R221/R222/R235/R259/R271 (V2 conditional on MW-INSTALLED-HOST); C275→R203/R249/R262/R270/R289/R310. Cluster notes in each file itemize the same discipline. |
| 4 | ID uniqueness + range compliance EAT-R201..R310 | **PASS** | 110 requirements, IDs unique, contiguous EAT-R201..R310, zero gaps, zero out-of-range, zero duplicate map rows, 1:1 req↔map join (110/110). Cluster ranges: foundations 201–234, lane 235–264, tail 265–294, optional-ops 295–310. |
| 5 | Every P00–P12 packet and every pi-03 family A–H covered | **PASS** | Packet coverage (map rows): P00:10, P01:7, P02:8, P03:10, P04:7, P05:8, P06:9, P07:6, P08:15, P09:8, P10:14, P11:4, P12:4 — none empty, no deferral needed. Family coverage (detection model above): A:29 rows (R217–R238, R265–R271, R294 …), B:18 (R242–R248, R273–R277 …), C:12 (R210–R215, R278–R283, R296, R298), D:4 (R286, R287, R288, R310), E:3 (R269, R284, R285), F:5 (R247, R275, R289, R290, R306), G:6 (R208, R261, R291, R292, R308, R310), H:13 (R264, R276, R285–R287, R292–R294, R303, R310 …). |
| 6 | Every requirement names packet + verification tier | **PASS** | 110/110 bodies carry `Maps-to: P..` and an `Evidence tier target` naming a V-tier; 110/110 map rows carry `packet` + `verification` (V0:6, V1:30, V2:7, V3:38, V4:7, V5:18, V6:4); zero text↔map packet mismatches; tier values consistent (32 rows use a deliberate dual-tier wording — primary tier in the map; see F4). |
| 7 | Duplicates/overlaps between clusters flagged | **PASS with findings** | The clusters flag most overlaps themselves (lane "Out of lane" notes; optional-ops "Sibling overlap is explicit" header; R309 "R202 owns classification"; receipts chain R208→R241→R261→R291 cross-conditioned via K006/K009). Residual under-flagged overlaps are F1–F3 below. |

## Findings

| ID | Severity | Rows | Finding | Exact fix |
|---|---|---|---|---|
| F1 | MEDIUM | EAT-R216 (P01, foundations), EAT-R257 (P06, lane) | Same missing artifact (M006: kill the SDK child mid-query; settled result/journal; no auto-repeat) compiled as two EVIDENCE_ACQUISITION requirements in two clusters. Neither row names the other; R257 states `prior: none (named audit gap)` although R216 covers the same gap and extends EAT-R015/R016/R043/R160; packet assignment diverges (P01 vs P06). Only the optional-ops header flags the pair ("R216/R257 SDK-child death"). | At bead filing: ONE acquisition bead carrying both rows as legs (R216 = settlement/attempt-count across separate-process restart; R257 = journal/cursor + EAT-R256 recording protocol), owner packet P06 with the P01 falsifier leg noted. On next text cycle: amend R257 `prior:` to name EAT-R216/EAT-R160; reconcile packet. |
| F2 | LOW | EAT-R283 (P09, tail) vs EAT-R255, EAT-R258 (P06, lane) | R283 crit. 2 restates R255 crit. 1 (status/add/commit/branch injection → typed preservation-failed + bytes on disk) and R283 crit. 4 restates R258's no-second-scheduler guard, without cross-referencing either (optional-ops R297 does cross-reference R258). | File R283 as the P09 re-verification consuming R255/R258 receipts, not new scope; add the two cross-references on next text cycle. |
| F3 | LOW | EAT-R213, EAT-R214 (P01, V1) and EAT-R253 (P06, V3) | The one witnessed code defect (wb-9v02 parked-beforeDispatch skip/retry loss) is compiled three times in two clusters at two tiers. The V1-component → V3-registered layering is the program's own convention and all three extend EAT-R015/R016/R160, but no row names its siblings — a bead generator would mint three beads for one defect. | Attach all three rows to the existing wb-9v02 bead as legs (V1 skip, V1 retry, V3 registered closure + ordering gate); do not mint new beads. |
| F4 | OBSERVATION | 32 rows (R236, R239, R241, R242, R245, R249, R251, R254–R256, R258, R261, R263–R266, R269, R270, R272–R275, R282, R283, R285–R289, R291, R293, R294) | Dual-tier `Evidence tier target` wording (e.g. "V3 (own harness V1)"; "V0 config truth, enforced again at V4 execution") vs a single primary `verification` value in the map rows. Deliberate convention, not laundering. | None required. TDD-MATRIX quotes the tier line verbatim so no secondary leg is silently dropped; bead filing must carry both legs. |
| F5 | OBSERVATION | EAT-R309 | Condition wording "C164 contested scheduling is resolved by R206" could be misread as the contest being settled; C164 remains CONTESTED until the P00/M00 ruling and R309's own body marks it contested. Intended meaning is delegation. | Reword to "gated by EAT-R206" on next text cycle. |
| F6 | OBSERVATION | map rows EAT-R235 (C237), EAT-R242 (C246) | Map `claims` arrays list two claims cited only in the lane's shared registered-path-oracle header, not in those requirement bodies. Both ESTABLISHED; provenance surplus only, direction map⊇body. | None required; note for map consumers. |

No laundering, coverage, ID, or packet/tier defect was found. No FAIL item exists.

## Verdict

**CONDITIONAL PASS.**

All seven ordered checks pass. The verdict is conditional only on the filing-time consolidations that prevent the flagged inter-cluster duplications from propagating into the bead graph:

1. (F1) One SDK-child-death acquisition bead for R216+R257 — not two.
2. (F3) One wb-9v02 repair bead carrying R213/R214/R253 as legs — not three beads.
3. (F2) R283 filed as P09 re-verification consuming R255/R258 receipts.
4. (F5 + F1 text nits) On the next requirements text cycle: R309 "gated by EAT-R206"; R257 `prior:` names EAT-R216.

These conditions require no re-compilation of the requirement set and do not block Phase 11 bead generation if applied during filing.

## Appendix A — weak-claim disposition map (ledger → requirements)

| Claim | FINAL status | Requirement rows (map) | Disposition |
|---|---|---|---|
| C026 | REFUTED | R202, R293 | negative ledger-row constraints; historical-wording regression |
| C028 | UNSUPPORTED | R220 | verification: pin exact rig tarball bytes |
| C063 | UNSUPPORTED | R204 | negative: MW-CONTRACT is a Pi blocker label, not an MW document |
| C071 | REFUTED | R213, R216, R253, R275 | narrowed via M004; joint-Mechanical gap drives new work, tested legs preserved |
| C075 | REFUTED | R250, R251, R280, R281, R282 | permittedWording remainder: Mechanical intent/reconcile entry absent → build+verify |
| C089 | REFUTED | R213, R214, R216, R253, R257, R275, R279, R281 | blanket framing refuted; witnessed wb-9v02 defect + UNDETERMINED host-death member compiled to repair/acquisition |
| C164 | CONTESTED | R205, R206, R209, R235, R264, R294 | preserved; ruled only by the P00/M00 joint-DAG decision (R206); edge-filing blocked (R264) |
| C166 | REFUTED | R206, R208, R264, R277 | M05=L2 fixture-safe, M06=joint event; metadata-truth constraints |
| C176 | REFUTED | R202, R210, R255, R280, R283 | M009 corrected wording mandated in receipts/docs |
| C180 | REFUTED | R202, R211 | audit-gloss refuted; both-producers regression retained |
| C201 | REFUTED | R239, R258, R283, R297 | "do not ADD a scheduler"; never compiled as a repo-wide absence claim |
| C204 | REFUTED | R203, R249, R262, R276, R299, R310 | profile literals = proposals; adoption-gated reporting + negative regressions |
| C205 | REFUTED | R208, R261, R277, R291 | MW-PI-NATIVE-LIVE unratified; joint receipt contract owed (P00/M00) |
| C218 | REFUTED | R276, R300, R310 | rf-committed-v1 = proposal; enablement gated on committed provenance |
| C221 | UNDETERMINED | R259, R263, R293, R310 | explicit named deferral (M015); labels-become-claims protection via receipts |
| C227 | UNSUPPORTED | R234, R238, R266, R272, R304, R305 | mutation targets = planned integration, not present function-path property |
| C239 | REFUTED | R221, R222, R235, R259, R271 | V2 leg conditional on MW-INSTALLED-HOST; no /host subpath at MW pins |
| C275 | REFUTED | R203, R249, R262, R270, R289, R310 | executed-profile reporting is post-adoption; F-question answered factually |

## Appendix B — explicit deferrals verified

- Foundations "Scope dispositions": C221 not made an implementation gate; C089 host-death → R216; C164 → R206; W11/V4/V5 acceptance owned by later shards.
- Lane "compile notes": REFUTED-premise table; C221 deliberately not compiled (protection via R241/R259/R263); C164 never resolved in-lane; out-of-lane list (A/B/C sweeps, mutation campaign, performance, release → tail; ABI/lease/grant/descriptor + V↔L map → foundations).
- Tail "Cluster notes": REFUTED-as-negatives table; C089 host-death → R281 crit. 5; C221 → R293 crit. 6; C164 condition on R294 only; open P00/M00 rulings enumerated per row.
- Optional-ops "Substrate"/"Scope dispositions": sibling-overlap census (R202, R226/R227, R216/R257, R258, P08–P10 tail); C221 → M015; K005/K006/K007/K008/K009/K010 owned by foundations; no EMPIRICAL_REPAIR/RISK_CONTROL authority used in-shard.

## Appendix C — companion artifact

`requirements/TDD-MATRIX.md` — one row per requirement (110), L0 column = this audit (PASS, finding tags F1–F3/F5/F6 on 11 rows), V-tier target quoted verbatim, named real-infrastructure gates (`PI-MECHANICAL-ARTIFACT`, `PI-FUNCTION-REGISTERED`, `PI-GIT-CENSUS-LIVE`, `MW-PI-NATIVE-LIVE`, `release-validator`) with explicit per-gate `BLOCKED`/`NOT_RUN` status — no silent skips. Standing blocks carried into the matrix: all V2 rows BLOCKED on MW-INSTALLED-HOST (C239/M017); all V4 rows carry MW-PI-NATIVE-LIVE BLOCKED pending the P00/M00 receipt-vocabulary ruling (C205/M013).
