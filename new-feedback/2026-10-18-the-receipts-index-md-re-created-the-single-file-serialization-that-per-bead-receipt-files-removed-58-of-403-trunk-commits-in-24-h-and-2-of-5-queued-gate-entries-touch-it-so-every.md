# The receipts INDEX.md re-created the single-file serialization that per-bead receipt files removed: 58 of 403 trunk commits in 24 h and 2 of 5 queued gate entries touch it, so every receipt landing is a union merge

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator, 3 lanes, gate seats under Furnace supervision)
**Date:** 2026-10-18
**pi-subagents revision:** `07cc484` (`workbench/implementation-program` trunk at fold time, 08:11Z); the queued candidates `dbd9d7b` (wb-0m7) and `a972493` (wb-nl8.3)
**Method:** `git log origin/workbench/implementation-program --since=2026-10-17T08:00Z -- docs/workbench/receipts/INDEX.md` against the same window's total; merge-base diffs of the 5 queued gate entries; `git merge-tree --write-tree` between the two INDEX-touching candidates; the machine's fold records (pairwise merge-tree onto 07cc484)
**Scope:** the receipts index as a landing surface; a re-check of `2026-10-17-the-traceability-eof-append-convention-serialized-two-union-re-cuts-in-24-h-at-a-full-seat-each-so-per-bead-receipt-files-would-remove-the-bottleneck.md`. Not the content of any receipt.

## Summary

The 2026-10-17 file predicted that per-bead receipt files would remove the TRACEABILITY
end-of-file serialization. They landed (27 files under `docs/workbench/receipts/` at `07cc484`),
and the bottleneck moved one directory down: every receipt now also adds a line to the
hand-maintained `docs/workbench/receipts/INDEX.md`. Over the last 24 h, 58 of 403 trunk commits
(14.4%) touched that one file; of the 5 gate-queue entries at fold time, 2 (wb-0m7, wb-nl8.3) add
an INDEX line each. The machine carries a standing union rule for it (R477: an INDEX-line
collision is a union re-cut, never a refusal). Re-check verdict on the 10-17 file: CHANGED. The
cheapest cure is the one the feedback corpus itself learned the hard way: the directory listing is
the index.

## Finding 1 — CONFIRMED: INDEX.md is the most-touched file on trunk in the window

```
landings touching INDEX since 10-17T08Z: 58 of 403 trunk commits; receipts dir files: 27
```

The 58 include owner cuts (`Owner cut wb-zsv.8 ... 346d16f`, `wb-zsv.6 e0b0173`, `wb-zsv 26d3103`,
`wb-hqa.2 ab79bff`, `wb-nl8.1 a884163`, `wb-hqa.1 64c3f0a`, `wb-nl8 080bab2`, `wb-hqa 329f802`),
machine landings (`wb-3hc 11f6e00`, `wb-6ze.36 40dd021`, `wb-a3s.1 d7db7c4`, `wb-tz2.14 abc0dc7`)
and the trunk-into-branch merges that carried the file along (`f71ff3f`, `894948e`, `2225600`).

## Finding 2 — CONFIRMED: 2 of 5 queued candidates add an INDEX line, and they collide with each other

Merge-base diff of each queued entry against trunk, `docs/workbench/receipts/INDEX.md` only:

```
wb-0m7   dbd9d7b  merge-base 1e33c43  index_touch=1  (7 files changed in the entry)
wb-nl8.3 a972493  merge-base 967f361  index_touch=1  (8 files changed in the entry)
wb-zsv.7 3215dd7  merge-base dc66745  index_touch=0
wb-dfx   df182b9  merge-base 43a8fff  index_touch=0
wb-feo   655f71e  merge-base 43a8fff  index_touch=0
```

Each of the two adds one line (`+1 -0` on a 26-line file). The fold's pairwise probe onto
`07cc484` read all 5 CLEAN, because each candidate is tested against trunk alone. The
entry-versus-entry probe says otherwise:

```
git -c rerere.enabled=false merge-tree --write-tree dbd9d7b9b3e8b1b4f6731a99a2e9404cfa8714d6 a972493c41fd2fb4cf442370ad98a504d5938ffa
CONFLICT (content): Merge conflict in docs/workbench/receipts/INDEX.md
```

Two one-line additions at the end of the same 26-line file conflict; whichever lands second
re-cuts to carry the other's line (the machine's R477 union rule), at the cost of a seat turn.

## Finding 3 — CHANGED: the 10-17 prediction half-landed

The 10-17 file: "per-bead receipt files would remove the bottleneck". At `07cc484` the per-bead
files exist (27) and the TRACEABILITY end-of-file append is gone from the receipts path, so that
half is FIXED. The index that lists them is a single committed file edited by every receipt
author, which is the same shape with a shorter line. CHANGED, not FIXED.

## Fixes, cheapest first

1. **Generate the index, do not commit it.** Render `INDEX.md` from the directory listing (file
   name = bead + claim) at build or docs time, and delete the committed copy; the receipt files are
   already named by bead. The agentic-feedback corpus measured this exact trap: a hand-maintained
   Contents table went 44 files stale and imposed a merge conflict on every writer who added a row
   (`gastown/new-feedback/2026-08-17-witness-patrol-queries-cannot-see-what-they-look-for.md`,
   Postscript), and its rule since is "the directory listing is the index".
2. If a committed index must stay: **one fragment per bead** (`docs/workbench/receipts/index/<bead>.md`)
   concatenated by a test that asserts the rendered `INDEX.md` equals the fragments, so two beads
   never edit one file.
3. If neither: declare `INDEX.md` a union-merge file in `.gitattributes` (`merge=union`) so the
   second lander's re-cut is automatic rather than a seat's work.

## Positives worth protecting

- **Per-bead receipt files worked as predicted.** No TRACEABILITY union re-cut in the window; the
  collisions are now one line each and resolve by union.
- **The R477 rule made the collision a known shape.** 0 refusals were issued for an INDEX
  collision in the window; the machine and the owner both read it as a re-cut.
- **The index is cheap to regenerate** because the file names already carry bead and claim.

## What was not established

- How many of the 58 touches were pure INDEX-line additions versus edits of existing lines (not
  split).
- Whether any INDEX-only re-cut cost a full seat turn in this window as the TRACEABILITY ones did
  on 10-17; the two queued collisions above have not landed yet.

## Prior art

`new-feedback/` at `07cc484` holds 3 files; the 10-17 TRACEABILITY file is the one this re-checks.
No file names `INDEX.md`.
