# MII Requirement Consolidation

Stamp: **2026-11-11T11:12:44Z**. This is a **requirement-text conditional pass**, not implementation, bead filing, ratification, test or release acceptance. The upstream `REQUIREMENTS-AUDIT.md` remains the L0 audit (FAIL AS DRAFTED); the 80-row corrected set is `ATOMIC-REQUIREMENTS.md`. Original shards and maps are retained read-only in `.work/`, and the original Matrix A L0 verdicts are pinned in `.work/consolidate/TDD-MATRIX.audit-input.md`. Environment: Pi `0fb90672`, MW `69cb016d`; document Pi `3fc0ead1`, MW companion `6476372f`. Grade basis: patched `CLAIMS.jsonl` (C107 ESTABLISHED, C173 SUPPORTED). **All 80 acceptance states remain NOT_RUN.**

## Conditional-pass bar

| Audit condition | Result | Evidence / bound |
|---|---|---|
| Inline claim labels match patched ledger | **MET** | `laundering_scan.py`: 423 citation tokens (distinct per requirement), 415 with inline status labels, 190 distinct claims; **0 mismatches, 0 weak-status unlabelled**. This is a regex scan plus the audited reading, not a new primary-source re-audit. |
| No `Maps-to:` line names a closed bead | **MET on the known closed-id set; current live census pending** | 80 canonical `Maps-to:` lines checked; 0 names any closed target from the audit or the owner graph-audit repoints. Exact-id `bd --readonly --json` filing-time re-read remains mandatory. The attempted new per-id read timed out on wb-752.13 and produced no complete snapshot; see Read-only bead-status attempt. |
| No `AMEND` row in Matrix A | **MET** | 24 original AMEND verdicts repaired to `TRACEABLE` (56 originally traceable); 0 AMEND after consolidation. Original L0 judgments are preserved in the audit-input snapshot. Runtime gate cells remain NOT_RUN / BLOCKED (not PASS). |
| Explicit P/V deferrals and D-number dispositions | **MET** | P11, P12, V6 plus C005 / C035 / EAT-R253 deferrals at `ATOMIC-REQUIREMENTS.md:2031`; D1-D12 table at `ATOMIC-REQUIREMENTS.md:2049`; P11/P12/V6 have null-requirement map records (80-row 1:1 join unaffected). |

The strict `no Maps-to names a closed bead` predicate is met against all known closed ids. A claim that this is *freshness-certified for every bead at final filing* is NOT made: that needs a successful new `bd --readonly --json` exact-id read. Treat the final filing-time status check as an open guard, not a claim of a fresh census.

### Audit scanners (on the consolidated file)

The audit scripts hard-code three shards. We copied the **byte-identical** `ATOMIC-REQUIREMENTS.md` to `.work/consolidate/scanner-input/requirements/.work/req-r-core.md` and supplied two empty shard placeholders there; `epistemic-triage` and `pins` in that scanner root are symlinks to the read-only input trees. No audit script was modified. All scripts were run using `python3 -I` from the specified audit directory.

- `parse_reqs.py`: `80 requirements parsed; parsed 80/80 rows, 293 acceptance criteria; 80/80 with packet and V-tier (independent parse check).`
- `laundering_scan.py`: `citation tokens (distinct per requirement): 423 | with inline status label: 415 | distinct claims cited: 190 | label != ledger (manual read required): | weak-status claims cited without an inline status label:`
- `anchor_check.py`: `anchors 76 in 29 files: match 76, mismatch 0`
- Canonical-file SHA-256 and scanner-copy SHA-256 are identical (`cd20b89bfde90fa524b4a8c917850346f54cc9e6d6a67299bf5a9b5273cf1e4c` at this stamp); the captured outputs are under `.work/consolidate/`. Source anchors re-opened at the pins: **76 of 76 match in 29 files**.

## Fix ledger: RA-01..RA-22

Counts below are **distinct requirement rows whose text, mapping, tier or metadata was edited**, not the number of criterion sub-arms and not the number of now-complete implementation legs. RA-10 copies audited EXTENDS to all 80 rows; 41 needed a new/corrected EAT lineage (35 ADD + 6 CORRECT), 35 were OK and 4 NEW. Some filing-time fixes were inserted into text here, but their actual owner action remains NOT_RUN.

| Finding | Row count / changed rows | Consolidation action and exact location | Remaining filing-time / text-cycle guard |
|---|---|---|---|
| RA-01 | 14: R418, R419, R420, R429, R436, R438, R439, R440, R444, R445, R454, R467, R469, R470 | Retargeted all eight draft closed-carrier mappings (five wb-upad rows to wb-9a1o, four wb-5a7k references to wb-mwsy; R440 names both) and retained closed ids only as lineage. Also corrected lineage/coordination mentions on six other rows and the status in the R469/R470 carrier lines. (ATOMIC-REQUIREMENTS.md:997; ATOMIC-REQUIREMENTS.md:1274; ATOMIC-REQUIREMENTS.md:2022; ATOMIC-REQUIREMENTS.md:35). | Re-read status by exact id at filing; other owner graph-audit repoints are in the table below. |
| RA-02 | 1: R441 | Replaced R441 statement and criterion 1 with audit section 4 envelope text (`contract`, `tool`, `next` absent; inner builder separately tested), recorded C225/K006 correction owed. (ATOMIC-REQUIREMENTS.md:1287; ATOMIC-REQUIREMENTS.md:1292). | Correction entry to the upstream ledger is owner-routed, not written here (read-only upstream). |
| RA-03 | 6: R391, R398, R401, R446, R447, R458 | Made R446 Pi-side projection tests only, R401 Pi-side verifier exposure/host consumption; R391/R398 mutants are fixture consumer checks, R447 Pi-side arms only, R458 Pi emitter validates and MW is joined by mapping. (ATOMIC-REQUIREMENTS.md:1415; ATOMIC-REQUIREMENTS.md:302; ATOMIC-REQUIREMENTS.md:1715). | MW classifier / provider-entry producer tests remain owned by MW, tracker wb-1zn2; missing producer-red receipt is BLOCKED. |
| RA-04 | 4: R448, R450, R463, R464 | Removed the R448↔R464 dependency cycle; R399..R403 build the substrate, R414..R417 the journal, R448 tests them, R464 records the receipt. (ATOMIC-REQUIREMENTS.md:1475; ATOMIC-REQUIREMENTS.md:1856; ATOMIC-REQUIREMENTS.md:1842). | Implementation/testing still NOT_RUN. |
| RA-05 | 2: R431, R462 | Aligned R462 with R431: non-strict V4 weak-assurance receipt valid, strict attainment reserved for R437; R431 owns content/readback/BLOCKED, R462 owns acquisition plus external-store census of C023/C024/C025. (ATOMIC-REQUIREMENTS.md:1808; ATOMIC-REQUIREMENTS.md:1046). | File R431/R457/R462 as legs of ONE bead under wb-p3i2; R437 strict attainability still UNDETERMINED until its envelope or decision gate. |
| RA-06 | 2: R438, R470 | Added explicit P11/P12/V6 deferrals and null-requirement map records for C178/C179/C143 (+ C186 V6); R470 enumerates both optional packets; R438 c3 defers an otherwise-unreachable detached function arm. (ATOMIC-REQUIREMENTS.md:2031; ATOMIC-REQUIREMENTS.md:2007; ATOMIC-REQUIREMENTS.md:1216; CLAIM-REQUIREMENT-MAP.jsonl:81–84). | P11/P12/V6 are P2/optional, not a first-release dependency; wb-zswl is open at audit read and wb-pxvv in_progress. |
| RA-07 | 4: R425, R428, R434, R469 | D1-D12 disposition table; R425 D11, R428 D10, R434 D8 explicitly name the MW definitions and Pi consumption; R469 crosswalk namespaces D/tier/strict/MW-CONTRACT plus D6 and severity/label ruling criterion. (ATOMIC-REQUIREMENTS.md:2049; ATOMIC-REQUIREMENTS.md:1981; ATOMIC-REQUIREMENTS.md:1989). | D6 owner and D4/D10/D11/MW-I10/MW-I12 severity and D7 label remain owner-routed, CONTESTED until recorded. No bare-label bead. |
| RA-08 | 4: R413, R431, R444, R445 | R413 carrier marked TO-BE-FILED by the owner; one new bead will carry existing EAT-R213/R214/R253 repair legs plus R413 gate. R431/R444/R445 cite the R413 gate, not a closed repro bead. (ATOMIC-REQUIREMENTS.md:601; ATOMIC-REQUIREMENTS.md:1046; ATOMIC-REQUIREMENTS.md:1401). | NO bead was filed here and no id invented. Every effectful arm stays gated until the source-pinned repair receipt exists. |
| RA-09 | 3: R412, R441, R466 | R466 now owns exactly one embedded launch-status decision recorded in R405 ratification: accepted with meaning, launched with Pi-native ref, or delayed reply. R412 allows empty refs only under option (i); R441 accepted only under (i). (ATOMIC-REQUIREMENTS.md:1905; ATOMIC-REQUIREMENTS.md:573; ATOMIC-REQUIREMENTS.md:1294). | All three clauses BLOCKED on G-RATIFY until the decision record exists; no option chosen here. |
| RA-10 | 80: R391, R392, R393, R394, R395, R396, R397, R398, R399, R400, R401, R402, R403, R404, R405, R406, R407, R408, R409, R410, R411, R412, R413, R414, R415, R416, R417, R418, R419, R420, R421, R422, R423, R424, R425, R426, R427, R428, R429, R430, R431, R432, R433, R434, R435, R436, R437, R438, R439, R440, R441, R442, R443, R444, R445, R446, R447, R448, R449, R450, R451, R452, R453, R454, R455, R456, R457, R458, R459, R460, R461, R462, R463, R464, R465, R466, R467, R468, R469, R470 | Every row now has an Extends line copied from Matrix A. Corrected six wrong/open-ended core references; R409 explicitly QUALIFIES EAT-R234 (Pi no-await chain is necessary but not the final boundary); R460 retires EAT-R271’s former missing-host condition. (ATOMIC-REQUIREMENTS.md:506; ATOMIC-REQUIREMENTS.md:1772; TDD-MATRIX.md:68). | 81st requirement not minted; 35 ADD, 6 CORRECT, 35 OK, 4 NEW in the audit lineage adjudication. |
| RA-11 | — | Copied Matrix A linked rows and added Verifies/Verified-by fields; table of 20 overlap groups below assigns one owning test family rather than silently duplicating a test. (ATOMIC-REQUIREMENTS.md:1506; ATOMIC-REQUIREMENTS.md:102; CONSOLIDATION.md: (heading “Audit overlap groups” below)). | At filing, the behaviour bead owns the test; the verification bead consumes that receipt. No test run here. |
| RA-12 | 4: R447, R448, R449, R464 | Normalized five audited tier corrections: R446 V1/V3 (under RA-03), R447 V1/V3/V5, R448 V1/V3/V5, R449 V1/V2/V3 and R464 V1/V3/V5. (ATOMIC-REQUIREMENTS.md:1426; ATOMIC-REQUIREMENTS.md:1865). | Retain actual Matrix B runtime gates; metadata is not a proof receipt. |
| RA-13 | 6: R414, R439, R459, R461, R468, R470 | Inserted privacy, local full Forge gate per cut/final tree, re-pin and landing-trunk rule, sample registered-route transcripts and same-invocation workflow_reconcile into existing criteria. (ATOMIC-REQUIREMENTS.md:1244; ATOMIC-REQUIREMENTS.md:622; ATOMIC-REQUIREMENTS.md:1742; ATOMIC-REQUIREMENTS.md:2016; ATOMIC-REQUIREMENTS.md:1961; ATOMIC-REQUIREMENTS.md:1789). | These gates are NOT_RUN; owner must enforce the first-cut re-pin, docs/privacy and local full gates at filing/implementation. |
| RA-14 | 1: R468 | Added explicit REFUTED C005/C035 deferrals; R468 gained insert-only remediation annotation block and recorded-red census repair criteria. (ATOMIC-REQUIREMENTS.md:2042; ATOMIC-REQUIREMENTS.md:1962; ATOMIC-REQUIREMENTS.md:1963). | Owner must land annotation M-ids and repair wb-12x1 census rows before another docs/skill edit; run record for GitHub Actions owner-routed/out of scope. |
| RA-15 | 8: R405, R419, R426, R439, R443, R444, R445, R461 | R405 ratification gains SDK-pin/factory owner and V3 fixture seam; R426/R461 wait for it. R419 gains one K030 effect-axis row; R439/R443/R444/R445 use the contingent single field name rather than selecting a competing alias. (ATOMIC-REQUIREMENTS.md:403; ATOMIC-REQUIREMENTS.md:743; ATOMIC-REQUIREMENTS.md:1394). | Owners must choose the factory boundary and effect-axis value set/field name; no fabricated ratification or native readiness. |
| RA-16 | — | No new ids; Matrix sections 6 and 7 enumerate separate acceptance gate lines for 21 compound rows and 18 falsifiers. (TDD-MATRIX.md:236; TDD-MATRIX.md:261). | At filing every independently failing clause gets its own gate/receipt line on the owning bead. |
| RA-17 | — | Normalized one canonical map schema over all 80 rows (authority, derivation, basis/grade, derived claims vs remediation IDs, packet, live beads, audited extends, scope/verification/oracle). (CLAIM-REQUIREMENT-MAP.jsonl:1; CLAIM-REQUIREMENT-MAP.jsonl:80). | The user-requested map fields are present; aliases from the original three maps are preserved only as provenance in .work. Priority P0 first release is in the header. |
| RA-18 | 10: R449, R451, R455, R456, R459, R460, R465, R468, R469, R470 | Named the eight missing negative mutants on R455/R456/R459/R460/R465/R468/R469/R470 and a guard-removal mutant per arm for R449/R451. (ATOMIC-REQUIREMENTS.md:1645; ATOMIC-REQUIREMENTS.md:1991; ATOMIC-REQUIREMENTS.md:1498; ATOMIC-REQUIREMENTS.md:1547). | All tests and mutants are NOT_RUN; criterion-level gates still owed at filing. |
| RA-19 | 7: R421, R446, R449, R451, R459, R466, R470 | Corrected R421’s eight exports; R446 Forge fields/K023 source-status wording; R449/R451 E169 seam-level control caveats; R459 MW-L4/L5 namespace; R466 projector R433/R434; R470 packet-closure schema EAT-R291. R424’s C095 surviving facet remains scoped to closed request/definition keys, not input. (ATOMIC-REQUIREMENTS.md:789; ATOMIC-REQUIREMENTS.md:1911; ATOMIC-REQUIREMENTS.md:2014). | R438’s remaining detached wording is deferred to P11; R462’s strict path remains R437-gated; schema/field-path and EAT-R253 predicates are ratification/repair gates. |
| RA-20 | 1: R470 | R470 now names both parent epics and their carrier groups, not a single “the epic”. (ATOMIC-REQUIREMENTS.md:2024; ATOMIC-REQUIREMENTS.md:2021). | Owner must select one parent for new MII beads (new epic, or wb-rhyt with related wb-1a3t); no bead mutation here. |
| RA-21 | — | No bead mutation; canonical Maps-to names in-progress carrier work-content correspondences only, not permission to rewrite their acceptance. (ATOMIC-REQUIREMENTS.md:35; ATOMIC-REQUIREMENTS.md:506). | File successors blocked by in-progress wb-2ukh / wb-y0n6; append-only notes (`--append-notes-file`, never `--notes`); append R409’s EAT-R234 qualification to wb-2ukh before its next gate. |
| RA-22 | — | Recorded the DX title-level overlaps and live related-edge targets below; the MII rows and DX rows are not rewritten to erase overlaps. (CONSOLIDATION.md: (heading “DX overlap” below); ATOMIC-REQUIREMENTS.md:35). | Owner adds related edges to DX beads at filing and later landing re-reads the earlier reply/journal receipt; body-level reconciliation remains owed. |

### Audit overlap groups — one test family / one owning bead (RA-11)

The source is audit section 7. The verifier rows consume the behaviour owner’s one test receipt; these are not 20 new requirement ids.

| Group | Behaviour / contract rows | Verification / acquisition rows | Relation to write into the rows |
|---|---|---|---|
| canonical input / notes (G08) | R392, R393 | R449 | R449[G08] is the falsifier evidence of R393/R392; one test family, owned by the P01 bead |
| installed runtime integrity (G09, V2 gate) | R421, R422 | R449, R460 | R460 is the tier gate consuming R421/R422 receipts; R449[G09] cites the same mutation test |
| forged request authority (G10) | R406, R424, R465 | R449 | R424 c2 and R465 c2 reuse the R406 forged-field battery |
| revocation and source drift at the final boundary (P13, P14) | R407, R409, R410, R427 | R449 | R427 c3 = P13; R410 c1 = P14 |
| lease lifetime and cross-process exclusivity (G06, G07) | R398, R399, R400, R401 | R448, R464 | R464 is the acquisition receipt of R448 passing against R399-R401; it is not a second substrate |
| crash fence and recovery (G11, P18, V5) | R402, R420, R445 | R450, R463 | R463 runs the R450 harness over the joined route |
| strict assurance consumption (G01, G02, G03, G12) | R433, R434, R435, R436 | R437, R446 | R446 is the falsifier evidence of R434/R435/R436; R437 settles attainability |
| uncertain effect and non-occurrence (G04, G05) | R403, R420, R443 | R447 | R447 is the falsifier evidence of R443 |
| observation integrity (P15, P16, P17) | R417, R429, R440, R442 | R451 | R451 is the falsifier evidence of R440 (P15/P17) and R417 (P16) |
| four domain outcomes | R428 | R452 | R452 restates R428 c1/c2 and adds the CLI-surface referent |
| zero effects on denial | R397, R427 | R453 | R453 is the detector/positive-control discipline of R427 |
| cancel requested vs established | R418, R445 | R454, R467 | four rows state the same distinction: R418 owns the transition table, R445 c1 the post-dispatch control reply, R454 the reporting, R467 the operator help |
| release law and audited override | R403 | R467 | R467 c2 restates R403 c3 |
| registered route (V3 gate) | R412, R426 | R461 | R461 is the tier gate consuming R412/R426 receipts |
| joined native receipt (V4) | R425, R430, R431, R457 | R462 | R431 and R462 are one acquisition; see RA-05 |
| launch reply and envelope | R412, R441 | R466 | three rows constrain one reply; see RA-02 and RA-09 |
| journal and intent before dispatch | R414, R416, R442 | — | R416 (correlated intent before handoff) and R442 (intent row before the composed call, fail closed) are one ordering obligation seen from two clusters |
| producer intent correlation and lookup | R415, R444 | — | R415 acquires the contract R444 consumes |
| refusal and reason mapping | R419, R427, R428 | R467 | R467's reason help must read the R419 table |
| same-invocation observation durability | R414, R438, R439 | R463 | R463 c3 restates R438 c2 |

## Filing-time checklist (RA-11..RA-22)

- [ ] **RA-11** — For each of the twenty overlap groups above, assign exactly one behaviour-bead test owner; verification bead consumes the same receipt. Keep Verifies/Verified-by links and report sub-gates independently.
- [ ] **RA-12** — Carry audited V-tier lists into the bead criterion lines (five corrected rows; R446 V1/V3); never promote fixture V3 to native V4.
- [ ] **RA-13** — Attach/privacy-test R414/R439; re-pin both full SHAs/trees and current bead snapshot before first cut (R470); name landing trunk/default branch/merge direction/validator anchor; run local full Forge gate on every cut and final merged tree (R459), capture registered-route sample transcripts (R468), and include workflow_reconcile in V3 (R461).
- [ ] **RA-14** — Land the deferred insert-only M-id annotation block in program docs after pinned sections, list landed M-ids and leave pin advance to its owner; repair the wb-12x1 recorded-red census before another docs/skill edit. Carry C005 negative/self-containment wording and C035 split-facet deferral; GitHub-Actions run record is routed to Pi owner and out of program scope.
- [ ] **RA-15** — Ratify SDK pin/provider-factory ownership and V3 injection seam in R405; ratify K030 one effect-axis field/value set in R419. Until then R426/R461 and R439/R443/R444/R445 clauses remain conditional.
- [ ] **RA-16** — For the twenty-one compound rows, create one gate line per independently failing clause in Matrix section 7; for G01-G12/P13-P18 use the eighteen falsifier rows of Matrix section 6. Do not mint EAT-R471..R488 (DX owns them).
- [ ] **RA-17** — Use the single canonical map schema and checked statuses at filing; `derived_from` contains claim IDs, `remediation_ids` separately carries M-ids, and `maps_to.extends_eat` carries predecessor EAT IDs (never bead IDs).
- [ ] **RA-18** — Retain one explicit guard-removal mutant for each R449/R451 falsifier arm and the eight named negative mutants; record pre-implementation red and mutant result, not a claim that they ran here.
- [ ] **RA-19** — Consume corrected EAT references / eight host exports / K023 field wording; preserve R424’s C095 closed-key facet only. R438 detached text waits on P11; R446 schema field paths and R462 strict attainment remain ratification / R437 gated.
- [ ] **RA-20** — Read both epics wb-1a3t (MWI) and wb-rhyt (MNI), choose one parent for new MII beads (new epic or wb-rhyt related to wb-1a3t), and record the owner’s choice before filing.
- [ ] **RA-21** — Fresh exact-id bd --readonly --json status read first. For claimed/in-progress carriers wb-2ukh and wb-y0n6 use blocked successor beads and append-only notes, never modify in-flight acceptance; R409’s qualification of EAT-R234 must be appended to wb-2ukh before its next gate. wb-w8fk is OPEN but a respin is in flight.
- [ ] **RA-22** — Add related edges to wb-9btr, wb-5xdi, wb-djk5, wb-r1bz, wb-q0on, wb-nagx, wb-hbju as appropriate. If both programs change one reply/journal shape, later landing re-reads the earlier receipt; conduct body-level reconciliation before that landing.

## D-number, packet and V-tier deferrals

The complete D1-D12 table is `ATOMIC-REQUIREMENTS.md:2049`. D8 → R434 row edit; D10 → R428 row edit; D11 → R425 row edit. D6 (K004) → one owner-routed two-part ruling (Pi P04/P05 wiring and MW H06 composed host); D4/D10/D11/MW-I10/MW-I12 severities and D7 label each await a single owner ruling in R469. There is no bare D-label bead.

| Item | One explicit disposition | Carrier / rule |
|---|---|---|
| P11 | DEFERRED P2 optional detached/Furnace, EXTENDS EAT-R295..R298 / R303 | wb-zswl (open in audit snapshot); R404/R412 refuse first-release detached function; R438 c3 deferred. |
| P12 | DEFERRED P2 optional HX/RF/further function families, EXTENDS EAT-R299..R302 / R303 | wb-pxvv (in_progress in audit snapshot); not an MII first-release dependency. |
| V6 | DEFERRED with P11/P12 (C186 second half) | No MII row silently claims this tier; R463 retains untested topologies. |
| C178/C179/C143/C186 | Null-requirement map disposition records, patched-ledger statuses copied | `CLAIM-REQUIREMENT-MAP.jsonl:81–84`, preserving 80-row 1:1 requirement join. |
| EAT-R253 repair | TO-BE-FILED by owner (one new bead, no id invented) | Existing EAT-R213/R214/R253 repair legs + R413 gate; blocks all effectful arms pending source-pinned receipt. |
| C005 / C035 | Explicitly routed REFUTED premises | C005 wording insert M005/M006 and crosswalk R469; C035 facets (i)-(iii) established, (iv) M038/M039 Furnace-profile wording, (v) CI R456; GitHub-Actions run record owner-routed / out of scope. |

### Source M-id custody (RA-14)

Twenty content-covered but uncited M-ids from audit section 9: M028/M029 → R468; M034/M035 → R459; M055 → R413/R412 c3; M058 → R421-R423; M067 → R459; M076 → R432; M081/M082 → R424; M083 → R405 c1/R421; M097 → R439 c4/R440 c2/R414 c3; M132/M133 → R423/R429; M150 → R405 c1/R391; M152 → R392; M176/M177 → R433; M221 → R412; M223 → R421. These are **filing-time citation annotations**, not proof the insert block has been landed. The ten uncovered program/landing/tier inserts from the audit now have criterion owners R470 (M002/M003/M037/M136/M187/M238 and EAT-R201), R459 (M017/M191 and EAT-R286), R468 (M056), with M143/M144 (C141 packet edges) filed as dependencies. The sixteen wording-only insert rows remain R468’s one append-after-pinned-sections block: M001/M005/M006/M007/M008/M012/M041/M068/M069/M070/M071/M074/M075/M104/M134/M163; owner records each inserted M-id and decides pin advance. No upstream docs were edited.

## Range-exhausted candidates

The MII allocated range is **EAT-R391..R470 only**. DX uses EAT-R471..R488. The following have independent obligations if the owner chooses a real split; they are **candidates only**, with no new requirement id minted:

| Candidate (not an id) | Reason it cannot be minted here | Current containment / owner route |
|---|---|---|
| Repair implementation for parked-beforeDispatch skip/retry loss | Empirical repair itself sits in predecessor EAT-R213/R214/R253; R413 is only the MII readiness gate and cannot stand in for the repair | File ONE new repair bead with those existing legs + R413; no new MII requirement is required unless owner specifically wants an independent new id. |
| Independent privacy obligation (doc-04 safety matrix) | R414/R439 gain executable privacy criteria; a standalone security/privacy requirement would exceed R470 | Keep those criteria on R414/R439; owner may reallocate after resolving the DX range. |
| Distinct QA step 7 full-gate requirement | R459 now includes a veto predicate for each cut/final merged tree; separate numbered QA requirement exceeds range | Keep a separate gate line under R459 (Matrix section 7). |
| Separate effect-axis vocabulary / SDK ownership decision requirements | R419 effect-axis table and R405 joint record carry the undecided fields; new decision ids would exceed range | G-RATIFY / owner-routed decisions under R419/R405; no guessed value set. |
| Split 21 compound rows or 18 falsifier arms into independent EAT ids | Each could fail independently but no EAT-R391..R470 id remains, and DX owns R471..R488 | Criterion-level gate lines under the existing rows (Matrix sections 6/7), or owner allocates ids outside this program’s range. |

## DX overlap: record without rewriting either requirement set

DX program epic **wb-9d2g** and its fifteen packets exist; DX owns EAT-R311..R390 / R471..R488, not this MII range. The audit compared titles only, not all bodies. Two DX beads were in progress at its read: wb-9btr and wb-5xdi. The owner’s W17 carve beads wb-rz62 and wb-xeej are new/live; they do not alter the MII row ranges or the following comparison.

| Shared surface | DX row(s) ↔ MII row(s) | Filing rule / live DX bead to relate |
|---|---|---|
| Launch reply and host mode | EAT-R321 ↔ R438 c3, R441, R466 | Do not fork envelope; re-read earlier landing’s reply receipt. wb-9btr (DX P03), wb-5xdi (DX P04) where shared files overlap. |
| Admission + interop refusals | EAT-R324, R337, R338 ↔ R419, R427 | Preserve measured cause and host-owned remedy; related edges to wb-9btr / wb-5xdi / wb-djk5 by touched surface. |
| One observe dialect | EAT-R328, R333 ↔ R439, R440 | Preserve observation scope/cursor and one reply dialect; related wb-5xdi / wb-djk5 / wb-r1bz as touched. |
| Control replies and embedded cancel | EAT-R334, R335, R486 ↔ R418, R445, R454, R467 | Separate cancel requested/established; related wb-q0on / wb-nagx / wb-hbju by touched surface. |
| Journal identity/replay | EAT-R357, R358, R360, R361 ↔ R414, R417, R438 c2, R442 | Preserve idempotent event replay vs effect replay; later landing re-reads earlier journal receipt; related wb-r1bz / wb-nagx / wb-hbju by touched surface. |
| Installed-package coherence | EAT-R339 ↔ R468 | Coordinate release docs/skills; related wb-5xdi / wb-djk5 by touched surface. |
| Host-incompatible definitions | EAT-R472 ↔ R412 c2 | One registered refusal; related wb-9btr / wb-5xdi by touched surface. |
| Detached lifecycle | EAT-R341..R345 ↔ R438 c3 | MII detached arm remains P11 deferred; do not rewrite DX detached work; related wb-r1bz / wb-nagx / wb-hbju by touched surface. |

**Related-edge target set (audit RA-22):** wb-9btr, wb-5xdi, wb-djk5, wb-r1bz, wb-q0on, wb-nagx, wb-hbju. Edges are a bead-filing action; NONE was added here. Body-level reconciliation of the two sets is still owed.

## Owner 2026-11-11 graph-audit bead repoints

Closed ids are lineage, not filing targets. The following owner-provided repoints take precedence over stale exports; only wb-upad/wb-5a7k occurred in draft `Maps-to:`. The other six source ids never became MII Maps-to targets and are recorded here for filing.

| Closed lineage id | Live target | Applied / implication |
|---|---|---|
| wb-upad | wb-9a1o | MII mappings retargeted (RA-01) |
| wb-5a7k | wb-mwsy | MII mappings retargeted (RA-01) |
| wb-79k.1 | wb-79k.3 | No MII Maps-to line named it; filing-time repoint only |
| wb-79k.2 | wb-79k.3 | No MII Maps-to line named it; filing-time repoint only |
| wb-9x5.10 | wb-9x5.11 | No MII Maps-to line named it; filing-time repoint only |
| wb-9x5.16 | wb-9x5.11 | No MII Maps-to line named it; filing-time repoint only |
| wb-69g.7 | wb-h8f.7 | No MII Maps-to line named it; filing-time repoint only |
| wb-752.12 | wb-752.13 | No MII Maps-to line named it; filing-time repoint only |

Status at the audit’s 2026-11-11T10:29:12Z read: wb-w8fk open; wb-y0n6/wb-2ukh/wb-pxvv in_progress; wb-zswl open. The owner additionally directed wb-rz62/wb-xeej live W17 carve beads and wb-9d2g DX epic with fifteen packets. Do not infer today’s current status from the stale committed `.beads/issues.jsonl`.

### Read-only bead-status attempt

A new per-id exact read was attempted from `PrimaryInstallation/src/Pi-subagents` using `bd --readonly --json show <id>`; the last call, wb-752.13, timed out after 120 seconds. The loop buffered earlier results in memory and did not write a partial success artifact before timing out. Thus `bd-status-attempt.json` records the failure plus the owner repoints and the prior audit snapshot, **not a fresh complete census**. No bead mutation was attempted. Repeat exact-id read at filing; do not file if a required target cannot be checked. This is the only unmet *live freshness* guard; the four specified textual conditional-pass checks above are met against audited/owner-known statuses.

## Custody / known limits

- All edits are under `requirements/`; no bead mutation, git commit, pinned-document edit, runtime test, Forge build or release occurred. The upstream `epistemic-triage/`, `docs/` and `pins/` were read-only.
- Matrix B’s L0-L10 cells and L0 detection scope are unchanged except audited V-tier metadata and stale “AMEND first” language. **No green runtime claim** was manufactured. The body-level DX comparison, external-store census, real native V4, crash V5 and strict attainability are pending.
- The range is closed; no EAT id beyond R470 was minted. Maps-to references only known live Pi carriers or explicit new / TO-BE-FILED carriers; closed/bead-external trackers are lineage/conditions.
- Fix ledger line numbers are generated from the exact consolidated files, not a proposed edit plan. `edits-applied.json`, `row-summary.json` and scanner outputs under `.work/consolidate/` permit rechecking the counts without changing the audit inputs.
