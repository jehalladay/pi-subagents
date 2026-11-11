# SOURCE-MAP - provenance and source-independence, MII triage (2026-11-11)

Rule applied: descendants of one origin count as one evidentiary lineage. Every claim row's `support[]`/`counterevidence[]` cites EVIDENCE.jsonl records; each record names the lineage it belongs to through its `source_type`, `primary_artifacts` and `parents`.

## Lineages

| Lineage | What | Independence ruling |
|---|---|---|
| L1 | The audited artifact: Pi program docs/programs/mechanical-interop-integrity-2026-11-10/{README,01..05}.md at Pi 3fc0ead1 (deposit 91d8fa8c + link fix). Copies docs/pi-*.md are sha256-identical (joint#0, joint#4). | PRIMARY DOCUMENT (the thing graded). Its sentences are never evidence for themselves (gate check c). |
| L2 | Companion Mechanical program docs/programs/pi-host-integrity-2026-11-10/{README,01..05}.md at MW 6476372f. Same author identity, committed within six minutes of L1 (joint#1: James Halladay, 2026-11-10 20:22/20:27/20:27 -08:00). | SAME_ORIGIN_AS L1. Agreement between L1 and L2 is consistency of one lineage, not independent corroboration (joint#1, joint#44). Disagreements between them are DECISION-CONFLICTs (CONTRADICTIONS.md). |
| L3 | MNI-2026-11-09 program and its triage ledger (Pi docs/programs/mechanical-native-interoperability-2026-11-09, docs/workbench/programs/.../triage/epistemic-triage/CLAIMS.jsonl, EAT-R201..R310), env pin 8e2fedeb. | SAME_ORIGIN_AS the MII baseline rows: the eleven Pi src files MII describes have identical blob ids at 8e2fedeb and 0fb90672 (lineage#0), and the MII baseline bullets restate MNI ledger rows (C055/C058/C059/C062/C065/C067/C070/C085 ESTABLISHED there). MII inherits MNI vocabulary explicitly: see "Vocabulary inheritance" below. |
| L4 | Pi source, tests, fixtures, bead exports and docs at 0fb90672 (worktree pins/pi-0fb90672). | PRIMARY CODE. Independent of L1-L3 for every present-tense Pi claim. Read by the pi-src, negative-ev, lineage, joint lenses and the audits. |
| L5 | Mechanical source, contracts, manifests, QA receipts at 69cb016d (worktree pins/mw-69cb016d); unchanged through 1be2b8dc, 6476372f, 0ffdc844 for every cited path (mw-src#38). | PRIMARY CODE. Independent of L1-L3 for every present-tense Mechanical claim. Read by the mw-src, negative-ev, joint lenses and the audits. |
| L6 | Executions at the pins on scratch copies: pi-probe.jsonl/mw-probe.jsonl (audit-a-protocol), PROBE/out/* (mw-src: host suite 123/123, installed-consumer surface, defect probes D1/D2/D4/D8/D10/D11, forge-ledger corroboration), lineage-run census logs (trunk green, master red). | INDEPENDENT OBSERVATION of behaviour, distinct from source reading (L4/L5). Each probe names its runner, node version and detection power in the lens row. |
| L7 | Status registers: Pi docs/workbench/feature-matrix.md (W11 planned), test/fixtures/mechanical-historical-status-ledger.json (EAT-R202, 200 rows), .beads/issues.jsonl + archive, M046-M050 census rows (wb-12x1). | SECONDARY REGISTERS maintained by earlier programs; they corroborate absence claims (C001, C056, C216) and are the frozen readers the deposit broke (C220). |
| L8 | External references: Forge skill reference (~/.claude/skills/forge/references/commands-build.md: gated_commit, gated_tree, gate_passed, gate_definition, execution_environment), ~/.forge/ledger.jsonl root-gate rows for 69cb016d/1be2b8dc/6476372f/0ffdc844. | EXTERNAL AUTHORITY within its domain (Forge envelope semantics); used for C026/C185/C188 premises and for producer-side gate corroboration. |
| L9 | MWI-2026-11-04 program (Pi docs/workbench/programs/mechanical-workflows-interop-2026-11-04) and its beads wb-1a3t epic: wb-201v, wb-s8rm, wb-ocie, wb-0gbh, wb-5ik5, wb-wupg; MW 1f29daa7. | The actual origin of the seams and fixes the MII README attributes to "the November 9 program" (C006 UNSUPPORTED; C074/C075 attributed here). MW-CONTRACT is this program's label (BEAD-PLAN.md:73; function-authority.ts:135). |

## Vocabulary inheritance MNI -> MII (explicit SAME_ORIGIN lineages)

| Term family | Origin lineage | Claims carrying it |
|---|---|---|
| D1..D12 defect numbers | an "original deep-audit" that is in neither program directory (pi-01 L2); the companion mw-01 ledger describes D1, D2, D4, D6, D7, D8, D10, D11, D12; pi-01 describes D3, D5, D6, D9 | C031, C032 (REFUTED), C033; a second D-namespace (D01..D14 decisions) already lives in Pi docs/workbench/18-decisions-and-risks.md (joint#4) |
| P00..P12 packet labels | MNI-2026-11-09 packets and live beads (wb-w8fk P00, wb-y0n6 P02, wb-2ukh P03, wb-4bxo P04, ... wb-pxvv/669r P12); MII reuses the numbers for different work (P01, P02, P04-P09 denote different packets in the two programs) | C137 (mapping is not the identity on numbers), C139/C141/C143, lineage#13/#14 |
| H01..H05 handoff labels | three numberings: pi-05 (binding, callbacks, strict verification, effects, tests), mw-README (strict eligibility, effect law, ...), mw-03 (H00-H12 packets) | C221 SUPPORTED (collision established), C142/C163 UNSUPPORTED (referent undecidable), contradict#1, lineage#14 |
| L0..L5 evidence tiers | Mechanical 2026-11-09 interoperability ladder (mw-04 L5, receipts evidence_tier) and the standing QA ladder (MW docs/08); Pi defines V0..V6 and uses L2-L5 undefined | C005 (REFUTED facet ii), C067, C182, C210, negative-ev NE-28 |
| MW-CONTRACT | MWI-2026-11-04 BEAD-PLAN.md:73 external producer dependency; Pi function-authority.ts:135 FUNCTION_ACTION_BLOCKER; absent from every MW artifact at 69cb016d/6476372f (joint#15) | C050, C105, C107 (arbitrated), C135 |
| 'self-contained' / 'next design revision' | MII README L7; the routing surfaces (skill, AGENTS.md, README.md, hosting page) still call MNI the current program at 3fc0ead1 (lineage#8) | C005 REFUTED, C220, C226, C057 |
| 'No GitHub CI' / 'docs-only' / 'no joined receipt' sentences | wb-12x1 census rows M046 (EAT-R139), M047 (EAT-R140), M049 (EAT-R142), M050 (EAT-R143) had already narrowed these sentences; MII restates the bare forms | C035/C138 REFUTED (M047 regression), C023 (M050 form), C036/C181 (M046 form), C028 (M049 form) |
| W11 / feature-matrix wording | Pi docs/workbench/feature-matrix.md W11 (planned; HX->RF->Claude SDK->Forge) and the EAT-R202 status ledger fixture | C056, C216, C217, C001 |
| mechanical:develop-write, git-census-v1/plain-v1, mechanical.pi-host/v1, mechanical.development.develop.v1 | Mechanical host-binding.ts:9-14 (candidate, "not yet adopted jointly") and the shared descriptor; Pi carries the descriptor id in MECHANICAL_REVIEWED_ENTRYPOINTS and none of the profile/grant spellings in src | C027, C028, C087, C088, C093, C145 |

## De-duplication rulings

- Pi README baseline bullets (C007-C025) and the companion mw-README/mw-01 "already exists" rows describe the same facts from one authoring lineage; their agreement adds no witness. Each baseline row is graded on L4/L5 primary reads plus L6 executions (see each row's `support[]`).
- The MNI ledger's ESTABLISHED rows for the eleven unchanged Pi modules transfer to MII by blob identity (lineage#0); they are the same evidence, re-read at 0fb90672, not a second confirmation.
- The three program receipts under MW qa/integration/pi-native-interoperability-2026-11-09 are reports of a pack and a run (L2 tier); the M05 receipt is refused by the producer's own validator (C020, C068), so the executable tests, not the receipt, carry C019/C020.
- Author self-reports (C036, C181) are SOURCE_REPORTs established as reports; no committed artifact can establish author inactivity (detection model: commit file lists see committed artifacts only).
- The two "paired" Mechanical baselines (69cb016d in L1, 1be2b8dc in L2) differ by two test titles and one mapping row; every source verdict at 69cb016d transfers to 1be2b8dc and to 0ffdc844 (mw-src#38, contradict#17).

## Evidence census

EVIDENCE.jsonl holds 465 records: AUDITOR_PROBE_RECORD 462, PRIMARY_CODE 2, PRIMARY_CODE and PRIMARY_DOCS 1. 352 records resolve at least one primary pinned file on disk; 88 carry pointers that are commands, directories or external stores (listed in `unresolved_pointers`, kept as data).
