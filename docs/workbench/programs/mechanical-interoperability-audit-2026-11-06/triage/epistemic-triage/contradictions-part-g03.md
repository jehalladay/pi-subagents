# Contradictions — group g03 (04-implementation-program, 05-qa-operator-guide, README, hosting guide, SKILL)

Investigator scope: claims-part-03 (C1301–C1390, part-03 readings of the colliding C1301–C1331 ids) and claims-part-04 (C1401–C14121). Pins: `pi@d7666a76f561`, `mw@97e18068f399`, drift `mw-tip@6e15a4245d3f`. Nothing was run; every citation was re-opened at the pin.

## K-g03-01 — Prerequisites of the first effectful run: README:22 vs the BEAD-PLAN graph the program orders reused

Claims: C1427 (README:22 'Critical before an effectful run' — four items), C1316 / C1304 (04:16, 04:3 'Reuse its dependency graph')
Status: CONTESTED (two normative orderings inside one artifact lineage)

### Evidence for C1427's ordering
- `pi@d7666a76f561:docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/README.md:22` — "**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may be missed; and replay does not yet bind source/skills/provider revisions."
- 04:7–10 place B-detached-grants and B-source/B-replay in 'P1' rows above the 'First joint live' row.

### Evidence for the BEAD-PLAN ordering
- `BEAD-PLAN.md:35` — row 19 B-git-census depends on `B-preserve, B-dispatch, B-outcomes, B-effects` only; external `MW-HOST, MW-CANCEL`.
- `BEAD-PLAN.md:165` — "PI-3 is embedded-first. Detached repair and native HX certification are not false blockers. Cancellation experiment must be dispositioned ..."
- `BEAD-PLAN.md:26` — row 10 B-replay has no dependant.
- `04-implementation-program.md:3` — "Reuse its dependency graph and original labels."

### Reconciliation attempts
- scope split: read 'effectful run' as 'any run including detached mode' — README does not say so, and the embedded-first live cut is effectful (Claude writer + Forge).
- version split: none; both texts are at the same pin.
- semantic split: 'Critical' as priority, not as a blocker — plausible but 04's Stage column ('P1' above 'First joint live') reads as sequencing.

### What would settle it
An owner ruling recorded on wb-p3i2 (B-git-census) naming its blockers, or an amendment to 04's Stage table carrying BEAD-PLAN's Depends-on column.

## K-g03-02 — 'Never remove or weaken a safety test' vs the B-preserve acceptance 'no false-clean'

Claims: C1344 (04:35), C1306 / C1333 / C1358 (04:7, 04:28, 05:11)
Status: CONTESTED within the Nov-6 text; reconcilable by the Nov-4 BEAD-PLAN rule 8 the program incorporates by reference

### Evidence for the collision
- `pi@d7666a76f561:test/worktree.test.ts:432,445-446` — "reports no changes when the preservation commit fails ... expect(result.hasChanges).toBe(false); expect(result.branch).toBeUndefined();" — a committed test asserting the lossy false-clean report.
- `04-implementation-program.md:35` — "Never remove or weaken a safety test to make a gate green." (no carve-out)
- `04-implementation-program.md:7` — acceptance "bytes retained, no false-clean".

### Evidence for the reconciliation
- `BEAD-PLAN.md:8` — "Where an existing characterization test conflicts with a required contract (B-preserve), obtain an explicit specification ruling first; the ruling is part of the cut receipt."
- `REMEDIATION.md:18` (M008) — the Nov-4 ledger already narrowed 'the existing worktree tests exercise this outcome' to 'they lock the lossy behaviour in rather than guard against it'.

### Reconciliation attempts
- semantic split: a characterization test of a defect is not a 'safety test' — plausible, but 04:35 gives no criterion.
- version split: none.

### What would settle it
A specification ruling recorded in the wb-5ik5 cut receipt (the BEAD-PLAN mechanism), or a one-clause carve-out added to 04:35.

## K-g03-03 — MW track labels and external gates: 04:22 MW-R1..R7 vs Nov-4 mw-* tracks / tracker bead wb-1zn2

Claims: C1322–C1328, C1304, C1315, C1362
Status: CONTESTED (label vocabularies; unmapped) — plus an omitted dependency

### Evidence
- `04-implementation-program.md:22` — "MW-R1 installed rig host export; MW-R2 callback bundle; MW-R3 active cancellation/replay/effect control; MW-R4 joint native journey; MW-R5 native HX/RF; MW-R6 Furnace; MW-R7 coordination."
- `mw-tip@6e15a4245d3f:docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:7-15` — defines MW-R0..MW-R8; owner column reads 'Both' for MW-R4, 'HX/RF native producer' for MW-R5, 'Furnace native SDK + Pi detached host' for MW-R6.
- `mw@97e18068f399: git ls-tree docs/programs/` — no companion directory at the program's stated MW baseline; the labels resolve only at tip.
- `BEAD-PLAN.md:230-235` — Nov-4 tracks are mw-contract/mw-host/mw-cancel/mw-native/mw-furnace/mw-coordination (EAT-R088..R093).
- `.beads/issues.jsonl` wb-1zn2 — "close only when every named gate (MW-CONTRACT, MW-HOST, MW-CANCEL, MW-NATIVE, MW-FURNACE, MW-COORDINATION) is delivered".
- `04-implementation-program.md:15` and `05-qa-operator-guide.md:15` require 'native cancel' / 'stop during edit', which `apps/development-rig/src/claude-implement.ts:37-39` says MW does not implement (pre-dispatch barrier only); BEAD-PLAN row 16 gates that leg on MW-CANCEL, the Stage row carries no gate.

### Reconciliation attempts
- A plausible map exists (MW-R1≈mw-host, MW-R3≈mw-cancel, MW-R5≈mw-native, MW-R6≈mw-furnace, MW-R7≈mw-coordination; mw-contract ≈ 'joint ABI ruling' inside MW-R1; MW-R2/R4/R8 new) but it is written nowhere in the Pi artifact.
- '**Mechanical-owned** tracks' header vs the companion's own 'Both' / producer owners for R4–R6: a scope overstatement, not a factual contradiction.

### What would settle it
A label map (MW-Rn ↔ mw-* / EAT-R088..R093) in 04:22 or in bead wb-1zn2, and a restored External/Gate column on the Stage rows that depend on MW deliveries (B-dispatch, B-controls, B-git-census, B-hx/rf-admit, B-detached/furnace-function, B-coordination).

## K-g03-04 — Selector vocabulary: hosting.md:17 'host modes' vs doc 03:19's alias ban

Claims: C1458 (hosting.md:17); doc-03 selector claims (part-02 ids; anchored by path here)
Status: CONTESTED (internal vocabulary inconsistency in one commit)

### Evidence
- `docs/workbench/mechanical-function-hosting.md:17` — "Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical."
- `03-function-host-contract.md:19` — "Pi's existing `hostMode` means `embedded|detached` transport ... Do not ship generic “profile” or “mode” aliases without both-repository ABI approval."
- `mw@97e18068f399:apps/development-rig/src/live-development.ts:19-22` — a shipped result type already carries `mode: "live-claude-forge"`, `discovery`, `context` literals.

### Reconciliation attempts
- semantic split: hosting.md uses 'host modes' loosely for operator readers — but the contract reserves the word.

### What would settle it
Rewrite hosting.md:17 in doc-03 vocabulary (evidenceProfile/contextProfile values; detached/Furnace as hostMode/host variants).

## K-g03-05 — 'No GitHub CI' (04:35) vs pi-subagents' committed CI workflow and the same commit's 'no new GitHub CI' (README:28, SKILL:30)

Claims: C1345 (REFUTED as an observation), C1433 / C14115 (narrowed norm), prior C0422/C0394 (M047)
Status: resolved by scope split — recorded because 04:35 regresses a Nov-4 remediation

### Evidence
- `pi@d7666a76f561:.github/workflows/ci.yml:1-7,18-22` — on push/pull_request to master: npm ci, lint, typecheck, typecheck:test, `npm run test`.
- `04-implementation-program.md:35` — "No GitHub CI; use Forge."
- `README.md:28` / `SKILL.md:30` — "no new GitHub CI".
- `REMEDIATION.md:57` (M047) — "Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope)".
- MW: no `.github` at pin or tip.

### What would settle it
Rewrite 04:35 to the M047 form.

## K-g03-06 — 'All rows below are proposed work, not already delivered' (04:3) vs two closed beads with landed receipts

Claims: C1305 (REFUTED as a universal), C1321
Status: resolved by narrowing — recorded because a reader could re-file delivered evidence cuts

### Evidence
- `.beads/issues.jsonl` — wb-muip (B-unknowns) closed 2026-11-06T13:10:35Z; wb-f3wd (B-hx-evidence) closed 2026-11-06T18:27:50Z.
- `docs/workbench/receipts/wb-muip.md`, `wb-f3wd.md` — landed 2026-11-06 09:35Z / 12:45Z (git log), before d7666a76 (2026-11-07 01:52Z); cited by the program at 01:40 and 02:28.
- `04-implementation-program.md:20` — the 'Every cut' row names `B-unknowns`, `B-hx-evidence`.

### Rival reading preserved
'Rows' as continuing per-cut obligations rather than bead deliveries; under that reading the sentence is a reading rule and should not say 'not already delivered'.

### What would settle it
Owner wording excluding the landed evidence cuts.


---
Status census for g03 rows (208 rows, 165 dossiers): ESTABLISHED=60, NON-EPISTEMIC=138, REFUTED=2, SUPPORTED=8
