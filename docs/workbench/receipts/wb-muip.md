# wb-muip: [MWI-unknowns] Acquire missing producer evidence without upgrading audit claims

## 2026-11-06 receipt: prior-run census and Forge transport probe, both external legs explicitly partial (machine seat ws-01, base 814dcdd)

- Surface: test and qa only, no src change. `test/workbench-mechanical-evidence-census.test.ts` is the suite (39 rows: 33 cases and 6 shape and anchor rows), `test/helpers/mechanical-evidence-census.ts` the judges, `test/fixtures/mwi-unknowns-requirements-roster.json` the vendored requirement text (pi-subagents master `0b25e14e`, `triage/requirements/ATOMIC-REQUIREMENTS.md` lines 1476-1484 and 1486-1494, each block held to its SHA-256), `qa/workbench/forge-transport-probe.mjs` the native probe and `qa/workbench/receipts/wb-muip-forge-transport-probe.json` its committed record.
- EAT-R080, the prior-run census (triage: C0321 UNDETERMINED, C0446 SUPPORTED). Read scope: the level-2 entries of `docs/workbench/receipts/*.md`, the level-2 sections of `docs/workbench/TRACEABILITY.md` and one entry per `qa/workbench/receipts/*.json`; dated entries inside 2026-10-15..2026-11-06 are read, and so is every undated entry. A witness is one entry joining all four components: a Pi workflow run id, a Mechanical domain outcome token, a native Forge operation id and a source pin. Measured on this cut's tree: 205 entries in 56 files (149 receipt entries, 54 TRACEABILITY sections, 2 JSON receipts), 98 dated and 107 undated, 0 out of range, 0 witnesses, 125 partials (116 with a source pin only, 5 with a run id and a pin, 3 with an operation id and a pin, 1 with a run id, an operation id and a pin), and no entry carries a Mechanical outcome token. Verdict: searched-scope absence. Global reading: UNDETERMINED.
- Declared unread, each "not authorized in this phase": the MechanicalWorkflows repository, the shared artifact store, the Claude session journals and the workbench machine ledger. The census has no universal-absence word, so it never concludes that no run happened.
- EAT-R081, the Forge transport probe (triage: C0368 UNDETERMINED). The contract is pinned from `forge codes --json` on forge 0.2.1 rev f7d4a6a8ae17 (variant python-reference). Its exit codes are success 0, error 1, usage 2, partial 3 and no_verdict 69, so only success maps to 0. Native transcripts came from `node qa/workbench/forge-transport-probe.mjs --write qa/workbench/receipts/wb-muip-forge-transport-probe.json` (2026-11-06), each a `forge build` in a throwaway package whose one gate step exits 0 or 1:
  - the PASS control, `forge build --json`: exit 0, status success, gate verdict PASS;
  - the failed gate, `forge build --json`: exit 1, status error, gate verdict FAIL;
  - the failed gate, `forge build --keep-going --no-replay --json`: exit 1, status error, gate verdict FAIL.
  Each transcript carries its native operation id and the envelope's own version and revision, and each agrees with the contract. Judged: scoped non-observation. No admitted transcript pairs exit 0 with FAIL, and the scope is the two failed-gate argv on that build. Fixtures and adapter conditionals are excluded by source, so they cannot upgrade the verdict. The record is tied to the probe script by its SHA-256, so any edit to the probe reds the recorded-probe row until the record is regenerated with the command above.
- EVIDENCE-CENSUS legs, explicitly partial. The authorized bounded external store census (EAT-R080's conditions) did not run, because no store authorization exists in this phase. A FORGE-TRANSPORT-CENSUS beyond the recorded argv and build did not run. The slice is not claimed live or closed (EAT-R085), and the B-outcomes guardrail EAT-R039 stays mandatory whatever this census records.
- Residuals, each named and pinned by a quiet row: R-OUTCOME-WORDS (J03's fourth outcome, the plain word indeterminate, is not read as an outcome), R-PI-REFERENCE (a Pi side named only by a session UUID), R-SPELLING (a component outside its one pattern), R-SPLIT-JOIN (components split across entries), R-DECLARED-PROVENANCE (provenance is read as declared) and R-VERDICT-SPELLING (a failed gate spelled other than the native FAIL).
- Frozen shape (standing rule 16): one row pins `EAT-R080:16` and `EAT-R081:11` and the six residual families. Requirement ids are anchored outside the census in this bead's row of `.beads/issues.jsonl`, and the outcome list in `docs/workbench/01` J03.
- CT battery (v2), each member applied in place and restored byte-identical: CT1 red=2; CT1b red=2; CT2 red=1; CT3 red=1; CT4 red=3; CT5 red=2; CT6 red=1. CT6 is killed by the export anchor alone.
- Red: the suite against stub judges that have the exported API and blind bodies gave 31 failed | 8 passed (39). The 8 that pass are two absence rows a blind judge satisfies and the 6 shape and anchor rows, which do not read the judges.
- Green: 39 of 39.
- Mutants: 27 of 27 killed, each applied in place and restored byte-identical (sha256 checked), with 1 to 7 failures each. 24 are on the judges, covering both vendored adversarial mutants, every component pattern, the range bounds, undated reading, entry splitting, JSON dating, store declaration, each exclusion reason, the witness and FAIL rules, the contract check and the store listing. 3 are on the evidence path: the probe reading another operation id field, a recorded failed gate edited to exit 0, and a recorded transcript relabelled as a fixture.

## 2026-11-07 receipt: wb-prv7, the R694 follow-up of landing 1011, reads receipts through marked, records each test's end and anchors the census here (machine seat ws-10, run g10-work-s233)

- Follow-up: wb-prv7 carries the wb-muip gate's F1 (leads) and F2 to F5 (ride); F14, the register archive, is the orchestrator's duty and not this cut's. The suite and its judges are the two files the entry above names. This entry's cut changes how a markdown receipt is split and joined and adds five cases, the record and the anchor below; the EAT-R081 judges, the declared scope and range and the vendored roster are unchanged.
- F1 (leads): the reader split at every raw line starting `## `, inside fenced code too, and read HTML comment text as entry text. It now reads a receipt through the lexer of marked 18.0.11 (the pinned devDependency): the top-level level-2 headings marked reads, ATX or setext, split it, so a level-2 line inside fenced or indented code, an HTML block or comment, a list item or a block quote opens no entry, and the join reads each entry's text less its HTML comments, while code keeps its text. Each entry's text is still its own lines. Cases: R080-HEADING-FORMS, R080-FENCED-HEADING (the gate's fenced-line witness, with its fence-less control), R080-COMMENT-TEXT (the gate's comment witness, with its comment-free and code controls) and R080-CONTAINER-TEXT (lists, tables and block quotes read item by item, cell by cell and line by line).
- F5: R080-ONE-PART-PARTIAL pins a partial carrying one component, for each of the four.
- F2 and F3: the census's tests and residual families are anchored here, outside its two files. Its receipt-anchor check reads the last level-2 entry of this receipt through marked's tokens and holds the first table's ids, rows and kinds to the census's cases and checks in registration order, each census row's claim ids there to that row's pins, and the second table to its residual families, all exactly.
- F4: every test before the census's record pushes its end with the assertion count vitest holds for it. The record, registered last, reads the vitest task tree (every title in order, every other test in run mode, not inverted and run before it) and holds the ends to the first table's counts, in run order.
- Live reading, measured on this cut's tree (trunk fd90f9d plus this cut): 209 entries in 58 files (152 receipt entries, 54 TRACEABILITY sections, 3 JSON receipts), 101 dated and 108 undated, 1 out of range (this entry), 0 witnesses and 127 partials (118 with a source pin only, 5 with a run id and a pin, 3 with an operation id and a pin, 1 with all three). The marked reader and the line reader it replaces read the same entries, dates and components on this tree and on trunk fd90f9d alone (208 entries, 0 out of range): searched-scope absence, global UNDETERMINED.
- Changes: this receipt is append-only (standing rule 15). A later cut that changes a test, a pin, an assertion count or a residual family appends a new dated entry carrying both tables for its state, and the census reads the last entry.

| Test | Row | Kind | Assertions |
| --- | --- | --- | --- |
| R080-NEVER-RAN-MUTANT | EAT-R080 | claim | 5 |
| R080-EMPTY-UNREAD | EAT-R080 | claim | 3 |
| R080-VOCABULARY | EAT-R080 | claim | 2 |
| R080-JOINED-WITNESS | EAT-R080 | claim | 5 |
| R080-NEEDS-PI-RUN | EAT-R080 | claim | 4 |
| R080-NEEDS-OUTCOME | EAT-R080 | claim | 4 |
| R080-NEEDS-OPERATION | EAT-R080 | claim | 4 |
| R080-NEEDS-PIN | EAT-R080 | claim | 4 |
| R080-ONE-PART-PARTIAL | EAT-R080 | claim | 9 |
| R080-OUTCOME-TOKENS | EAT-R080 | claim | 4 |
| R080-RANGE-BOUNDS | EAT-R080 | claim | 6 |
| R080-UNDATED-READ | EAT-R080 | claim | 3 |
| R080-MARKDOWN-ENTRIES | EAT-R080 | claim | 5 |
| R080-HEADING-FORMS | EAT-R080 | claim | 5 |
| R080-FENCED-HEADING | EAT-R080 | claim | 6 |
| R080-COMMENT-TEXT | EAT-R080 | claim | 25 |
| R080-CONTAINER-TEXT | EAT-R080 | claim | 4 |
| R080-JSON-ENTRY | EAT-R080 | claim | 6 |
| R080-UNDECLARED-STORE | EAT-R080 | claim | 1 |
| R080-LIVE-STORES | EAT-R080 | claim | 14 |
| R080-LIVE-PLANTED | EAT-R080 | claim | 9 |
| R081-FIXTURE-MUTANT | EAT-R081 | claim | 4 |
| R081-ADAPTER-CONDITIONAL | EAT-R081 | claim | 2 |
| R081-PAIRING-WITNESSED | EAT-R081 | claim | 3 |
| R081-SCOPED-NON-OBSERVATION | EAT-R081 | claim | 3 |
| R081-NEEDS-PRODUCER | EAT-R081 | claim | 2 |
| R081-NEEDS-OPERATION | EAT-R081 | claim | 2 |
| R081-NEEDS-PAIRING-FIELDS | EAT-R081 | claim | 2 |
| R081-NO-FAILED-GATE | EAT-R081 | claim | 3 |
| R081-FIXTURE-NEVER-UPGRADES | EAT-R081 | claim | 3 |
| R081-CONTRACT-CONSISTENCY | EAT-R081 | claim | 1 |
| R081-RECORDED-PROBE | EAT-R081 | claim | 15 |
| QUIET-OUTCOME-WORDS | EAT-R080 | quiet | 2 |
| QUIET-PI-REFERENCE | EAT-R080 | quiet | 2 |
| QUIET-SPELLING | EAT-R080 | quiet | 7 |
| QUIET-SPLIT-JOIN | EAT-R080 | quiet | 2 |
| QUIET-DECLARED-PROVENANCE | EAT-R081 | quiet | 2 |
| QUIET-VERDICT-SPELLING | EAT-R081 | quiet | 3 |
| CHECK-FROZEN-SHAPE | - | check | 2 |
| CHECK-TILING | - | check | 78 |
| CHECK-ROSTER | - | check | 20 |
| CHECK-EXPORT-ANCHOR | - | check | 3 |
| CHECK-J03-ANCHOR | - | check | 3 |
| CHECK-LIVE-SCOPE | - | check | 6 |
| CHECK-RECEIPT-ANCHOR | - | check | 7 |

| Residual family | Row | Quiet row |
| --- | --- | --- |
| R-OUTCOME-WORDS | EAT-R080 | QUIET-OUTCOME-WORDS |
| R-PI-REFERENCE | EAT-R080 | QUIET-PI-REFERENCE |
| R-SPELLING | EAT-R080 | QUIET-SPELLING |
| R-SPLIT-JOIN | EAT-R080 | QUIET-SPLIT-JOIN |
| R-DECLARED-PROVENANCE | EAT-R081 | QUIET-DECLARED-PROVENANCE |
| R-VERDICT-SPELLING | EAT-R081 | QUIET-VERDICT-SPELLING |
