# wb-n40d: R694 follow-up from wb-9b7e landing 1087: F8 R-B761 RIDER, still not cured: 20 bead anchors that SL-LIVE (test/workbench-mechanical-status-ledger.test.ts) pins through the export sit only in the notes of six beads the export holds not closed (wb-1zn2, wb-w8fk, wb-4bxo, wb-9a1o, wb-p3i2, wb-pxvv),...

## 2026-11-10 receipt: the notes lines that held 20 status-ledger anchors on six open or deferred beads, read at two exports and now cited by those rows (machine seat ws-11, run g10-work-s322, base e31e1e9)

- Lineage: the ONE R694 carry of the wb-9b7e landing 1087 PASS-WITH-FINDING (gate cmd_95aff2a5c80b). Its F8 leads with the R-B761 rider: R-B761 (M:73076) put the risk on wb-0b81, and the wb-0b81 and wb-9b7e cuts disclosed it in the suite's NOT CLAIMED paragraph without curing it. This cut moves the 20 anchors off those notes.
- The risk, measured at this cut's base: the ledger `test/fixtures/mechanical-historical-status-ledger.json` held 122 bead anchors over 24 beads; only notes held 56 of them, and 20 of those sat on the six beads below, which the export holds open or deferred. SL-LIVE of `test/workbench-mechanical-status-ledger.test.ts` reads each bead anchor again from each later export, so a notes replace on one of those six beads would red SL-LIVE once that export landed.
- Reads: the main export `.beads/issues.jsonl` at the ledger's pin `b1459f77f4d4` and at this cut's base `e31e1e9cf46f`, read with `git show <commit>:.beads/issues.jsonl`. The six beads are not closed at either commit, so each one's whole record is its line in the main export. At both commits, each row id below is held by exactly two lines of its row bead's notes and by no part of that bead's description, the bead's status is the one shown, and the quoted text sits in the notes line named, the same bytes at both commits.
- The cure: each row below now cites, as its one evidence item, its own item of this section, by the anchor `<row id> in the notes of <row bead>`, in place of the bead anchor that only those notes held. A receipt is append-only, so a later notes replace on any of the six beads leaves every anchor of these 20 rows in place.
- EAT-R089 in the notes of wb-1zn2 (deferred): notes line 16 holds `MW-R1 ~ mw-host (EAT-R089)`
- EAT-R090 in the notes of wb-1zn2 (deferred): notes line 16 holds `MW-R3 ~ mw-cancel (EAT-R090)`
- EAT-R091 in the notes of wb-1zn2 (deferred): notes line 16 holds `MW-R5 ~ mw-native (EAT-R091)`
- EAT-R092 in the notes of wb-1zn2 (deferred): notes line 16 holds `MW-R6 ~ mw-furnace (EAT-R092)`
- EAT-R093 in the notes of wb-1zn2 (deferred): notes line 16 holds `MW-R7 ~ mw-coordination (EAT-R093)`
- EAT-R148 in the notes of wb-w8fk (open): notes line 2 reads `- Primary requirements: EAT-R148, EAT-R149, EAT-R150, EAT-R151.`
- EAT-R149 in the notes of wb-w8fk (open): notes line 2 reads `- Primary requirements: EAT-R148, EAT-R149, EAT-R150, EAT-R151.`
- EAT-R150 in the notes of wb-w8fk (open): notes line 2 reads `- Primary requirements: EAT-R148, EAT-R149, EAT-R150, EAT-R151.`
- EAT-R151 in the notes of wb-w8fk (open): notes line 2 reads `- Primary requirements: EAT-R148, EAT-R149, EAT-R150, EAT-R151.`
- EAT-R155 in the notes of wb-4bxo (open): notes line 2 reads `- Primary requirements: EAT-R155.`
- EAT-R156 in the notes of wb-9a1o (open): notes line 2 reads `- Primary requirements: EAT-R156, EAT-R157, EAT-R158.`
- EAT-R157 in the notes of wb-9a1o (open): notes line 2 reads `- Primary requirements: EAT-R156, EAT-R157, EAT-R158.`
- EAT-R158 in the notes of wb-9a1o (open): notes line 2 reads `- Primary requirements: EAT-R156, EAT-R157, EAT-R158.`
- EAT-R159 in the notes of wb-p3i2 (open): notes line 2 reads `- Primary requirements: EAT-R159.`
- EAT-R163 in the notes of wb-pxvv (open): notes line 2 reads `- Primary requirements: EAT-R163.`
- EAT-R173 in the notes of wb-1zn2 (deferred): notes line 6 reads `- Primary requirements: EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177.`
- EAT-R174 in the notes of wb-1zn2 (deferred): notes line 6 reads `- Primary requirements: EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177.`
- EAT-R175 in the notes of wb-1zn2 (deferred): notes line 6 reads `- Primary requirements: EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177.`
- EAT-R176 in the notes of wb-1zn2 (deferred): notes line 6 reads `- Primary requirements: EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177.`
- EAT-R177 in the notes of wb-1zn2 (deferred): notes line 6 reads `- Primary requirements: EAT-R173, EAT-R174, EAT-R175, EAT-R176, EAT-R177.`
- Tests (`test/workbench-mechanical-status-ledger.test.ts`): SL-NOTES-REPLACE judges the committed ledger with the committed export in which the notes of the six beads are empty and reads no finding; SL-NOTES-RECEIPT pins that exactly these 20 rows cite this section, each with its own anchor, and that their beads are those six; SL-SHAPE's frozen list carries the 20 rows' new sha256 prefixes; SL-LIVE reads the 20 anchors in this section.
- Red, as measured at base `e31e1e9` with only the two new cases and their header lines added (2026-11-10T21:15:21Z): the suite read 249 passed | 2 failed (251). SL-NOTES-REPLACE read 20 L-EVIDENCE findings, exactly the 20 rows above; SL-NOTES-RECEIPT read no row citing this receipt.
- Green, as measured on these bytes: the suite 251 of 251; the 13 subject files and the suite under the gate's test flags, 14 files and 1523 of 1523; the census leg 6 of 6 over that report.
- After the change (anchor census over the committed export): 102 bead anchors over 24 beads and 146 receipt anchors over 14 receipts; only notes hold 36 of the bead anchors, all on nine closed beads, and none sits on a bead the export holds open or deferred.
- Batteries (each member applied alone and restored by sha256; the suite run alone, the census leg over the clean gate-form report of these bytes): `CT-BATTERY v2: CT1 red=5; CT1b red=4; CT2 red=1; CT3 red=3; CT4 red=207; CT5 red=206; CT6 red=203`, CT5 and CT6 killed through the EAT-R001..EAT-R200 range (L-IDS), outside the suite's literals. Cut members: an anchor re-pointed to its bead (3 red), an item of this section deleted (203), the plant hollowed (1), a bead dropped from the six (1), a row dropped from the 20 (1), EAT-R177 dropped from every literal and from this section (1, through the export), this section's heading edited (203), an anchor shortened to its row id (2).
- NOT CLAIMED here: that SL-LIVE stays green over a later export (an edit of a closed bead's notes that drops one of the 36 anchors only notes hold still reds it; the suite's NOT CLAIMED paragraph names those nine beads); that the six beads still own these requirements after the two exports named above.
- Commands: `VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mechanical-status-ledger.test.ts` (the suite); for the census leg, `npm run build`, then `npm run test -- <the 13 subject files> test/workbench-mechanical-status-ledger.test.ts`, then `./node_modules/.bin/vitest run --config vitest.census.config.ts test/workbench-mechanical-status-ledger.census.ts`.
- Not run by this seat: the complete gate of record, which belongs to the gate lane.
