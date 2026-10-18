# The TRACEABILITY EOF-append convention serialized two union re-cuts in 24 h at a full seat each, so per-bead receipt files would remove the bottleneck

- **From:** flywheel (Pi-Subagents Orchestration Engineer seat, bead-machine orchestrator)
- **Date:** 2026-10-17
- **Revision:** pi-subagents `workbench/implementation-program` at 76b597e (window end; the window's landings span e944238 through 76b597e); `master` at 38034a0.
- **Method:** 24 h window 2026-10-16T08:20Z to 2026-10-17T08:20Z of machine records: known-conflicts registry firings, run ledgers for the union re-cut seats, and the owner's landing relays.
- **Scope:** the docs convention that every bead's receipt row appends at the end of `docs/workbench/TRACEABILITY.md`. Not about any bead's content.

## Summary

Because every delivering bead appends its receipt section at the same file position (EOF of `docs/workbench/TRACEABILITY.md`), any two concurrent cuts that both carry receipts conflict there by construction. In this window the known-conflicts registry fired three entries at one landing (entries 4, 22, 25 at the wb-2t2 landing 1e46831), and the machine paid two dedicated union re-cut seats to resolve the serialization: wb-5x0.1 (run g5-work-r47, one HAIKU seat, 534 s wall, delivered 42211c7) and wb-752.9 (owes the same union after 5x0.1 lands, registry entry 25; its earlier union re-cut in this program was run r22). Each re-cut re-measures its whole delivery (219 of 219 rows for 5x0.1 plus the 90-row docs suite) to change zero substance: the only delta is where the EOF sections sit.

## Finding 1 (CONFIRMED): the EOF anchor converts doc-receipt concurrency into serial seat work

- 2 union re-cut seats in 24 h, each a full worktree + merge + parse-check + full re-measure cycle, with the 5x0.1 one measured at 534 s and a full vitest run (266 files, 9352 passed) to land a docs-position change.
- The registry can only predict and sequence these conflicts (it did, correctly, 3 of 3); it cannot remove them, because the convention guarantees them.

## Fixes, cheapest first

1. Per-bead receipt files: `docs/workbench/receipts/<bead>.md`, one file per delivering bead, with `TRACEABILITY.md` keeping only the ordering ledger (or generated from the directory). Two concurrent cuts then touch disjoint paths and `git merge-tree` answers rc 0.
2. Keyed sections with a merge driver or a stable per-bead anchor line, so unions resolve textually without re-anchoring.
3. Keep the convention but exempt receipt-only hunks from the re-measure duty (owner-ruled narrower re-cut), trading audit uniformity for seat time.

## Positives worth protecting

- The EOF-anchored-union + parse-check protocol itself (trunk blob stays a byte prefix; landed section slice sha-verified; heading count +1): it made the re-cuts mechanical, gate-checkable, and safe — both unions in this program's history parse-checked clean on first delivery.
- The known-conflicts registry: 3 of 3 firings in the window were correct and pre-sequenced, so no seat discovered the conflict by surprise.

## What was not established

- No measurement of how often receipts conflict at lower concurrency; this window ran 16-plus lanes, which is the regime the program asked for.
- No claim that fix 1 preserves the current single-file read experience; a renderer or index would need to.

## Delivery

Docs-only commit on branch `machine/flywheel/feedback-2026-10-17` for the program owner to land, per this directory's README (feedback writers do not push protected branches). No build or test gate ran for this file; gate waiver disclosed per standing operator direction.
