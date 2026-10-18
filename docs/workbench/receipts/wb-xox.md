# wb-xox: receipts: per-bead receipt files under receipts/ replace the TRACEABILITY EOF-append for NEW receipts; historical TRACEABILITY frozen append-only

## 2026-10-17 receipt: the receipts/ cutover (branch machine/flywheel/wb-xox, seat ws-02, run g5-work-r50)

This is the first receipt filed under the convention this cut introduces (`docs/workbench/15-implementation-program.md`, section "Delivery receipts").

- Base: trunk `130785e`. The claim-time tip was `1222f97`; before any commit the branch fast-forwarded to `fcddc91` (the wb-cra landing, whose TRACEABILITY section is the last row of the old EOF-append convention) and then to `130785e`.
- Freeze: `docs/workbench/TRACEABILITY.md` at `130785e` is git blob `3ffc7495bab9902f48eee51b7d71401dbf460d35`, 104960 bytes, sha256 `f03ba24f9da290e2efb1c62ba57b1d2c02687c18a76151938c85f436b64a9735`. Commit `2979307908b9808b0eec77c4ad08d8d0cd7810c1` appended one blank separator line and the cutover pointer row `## Continued in receipts/ per wb-xox` (2 lines added, none removed), leaving 104998 bytes, sha256 `49464205ace07970d5a11b020391b761e098c402a8c08508958a2a48e5a583e6`. That commit is the file's last writer; the cutover row sits after the wb-cra section, as the owner constraint on this bead requires.
- Convention: the "Delivery receipts" section of `docs/workbench/15-implementation-program.md` (new text after "Agent handoff"; no tracked paragraph named the EOF-append when the cut began) names `docs/workbench/receipts/<bead-id>.md`, the one-line `INDEX.md` append, the correction rule for historical rows, the freeze and the cutover commit.
- Location: the receipts live under `docs/workbench/receipts/`, beside the frozen file whose cutover row points at them. A repository-root `receipts/` would add a top-level path the package-boundary census does not allow.
- Seeded entries: this file and its `INDEX.md` line are the first two entries of `docs/workbench/receipts/`.
- Acceptance map: R1 `test/workbench-traceability-freeze.test.ts` (freeze census and falsifiers); R2 `test/workbench-receipts-shape.test.ts` (directory shape and falsifiers); R3 `test/workbench-receipts-convention.test.ts` (convention section pin and falsifiers); R4 by review of the wording: input-hygiene wording only, no security claims, every date and time computed with `date -u`.
- Red, measured before the change each test pins: R1 `7 failed | 5 passed (12)` on TRACEABILITY as trunk `130785e` held it; R2 and R3 `16 failed | 28 passed (44)` on the tree of commit `2979307` (no receipts directory, no convention section).
- Green, measured on this tree before commit: R1, R2 and R3 together `56 passed (56)` (12, 20 and 24 rows). The gate and landing records for this cut go in later entries of this file.
