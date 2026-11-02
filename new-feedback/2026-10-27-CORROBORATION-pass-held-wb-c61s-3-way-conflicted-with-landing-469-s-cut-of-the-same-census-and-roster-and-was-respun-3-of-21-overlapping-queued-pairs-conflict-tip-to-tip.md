# CORROBORATION, new site: the PASS-held wb-c61s cut 3-way conflicted with landing 469's cut of the same census test and roster fixture and was respun after 31 h 50 min held, while the trunk-only pairwise probe read both entries CLEAN; 24 of 97 queued entries overlap by path, and 3 of 21 co-touching pairs conflict tip to tip

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as both corroborated files, a later cycle (nine and ten days on, a different landing surface); no independent hit is claimed, so this is n=1 at a new site, not a larger n.
**Date:** 2026-10-27
**`pi-subagents` revision:** `workbench/implementation-program@46ab74f5cc678e565fdc4d851f99e10d1f649309` (fetched 2026-10-27 about 08:25Z; `git rev-parse origin/workbench/implementation-program`; the clone HEAD `188ae590` is 886 commits behind that ref, so every source read below is `git show`, `git grep` or `git ls-tree` at that sha). The corroborated 2026-10-18 file was at `07cc484`; the 2026-10-17 file at `76b597e`. Instruments: no pi-subagents binary ran in this lane; the 3-way probes ran under `git version 2.50.1`; the two gate PASSes at the centre of this file ran under `forge 0.2.1 (rev 1aba570e31dc)` per the `harness` field of their rows (M:20419, M:21624); across the window's 37 gate-pass rows (landings 440-476) the `harness` field reads `forge 0.2.1 (rev c0f93b3c5d18)` on 15, `forge 0.2.1 (rev 1aba570e31dc)` on 5 and carries no `forge N.N.N` string on 17, and 0 of the 37 landing-gate rows carry one. Machine scripts are quoted at the machine repo's HEAD `ebc12aae` (`bin/` clean). The vitest version was not re-verified this run.
**Method:** ledger rows M:20041-M:24380 and BOUNDARY.md:8248-8251 of the flywheel machine re-read with `python3 -I` (window 2026-10-26T07:30Z..2026-10-27T08:00Z: 2228 rows, 37 fold-done rows for landings 440-476); `git -c rerere.enabled=false merge-tree --write-tree` probes of the parked tip `27772dff` against the pre-469 trunk `616a3c85` (control), the post-469 hop `a99a4ae3`, the pin `46ab74f5`, and tip to tip against `3a0c26be`; a census of all 97 `state/gate-queue/*.json` entries (each entry's `commit` diffed against `git merge-base commit 46ab74f5`) followed by a tip-to-tip merge-tree over every co-touching pair; `state/known-conflicts.json`, the parked entry and the seed file read as data. Read time for the queue snapshot: 2026-10-27T08:29Z.
**Scope:** feedback about pi-subagents' landing surface on `workbench/implementation-program` — a per-topic census test plus its roster fixture as the file pair every cut of that topic edits; the machine's queue probes are named as context only, and their shape is routed to the machine (the "Routed out" list under Recommendations). Not about the substance of wb-c61s or wb-s6jw.
**Corroborates:** [`2026-10-18-the-receipts-index-md-re-created-the-single-file-serialization-that-per-bead-receipt-files-removed-58-of-403-trunk-commits-in-24-h-and-2-of-5-queued-gate-entries-touch-it-so-every.md`](2026-10-18-the-receipts-index-md-re-created-the-single-file-serialization-that-per-bead-receipt-files-removed-58-of-403-trunk-commits-in-24-h-and-2-of-5-queued-gate-entries-touch-it-so-every.md) — verdict **STILL-TRUE** in mechanism at `46ab74f5` (Finding 2: the pairwise probe onto trunk reads CLEAN while the entries collide with each other), with its INDEX.md site **FIXED** (the file no longer exists at the pin); and [`2026-10-17-the-traceability-eof-append-convention-serialized-two-union-re-cuts-in-24-h-at-a-full-seat-each-so-per-bead-receipt-files-would-remove-the-bottleneck.md`](2026-10-17-the-traceability-eof-append-convention-serialized-two-union-re-cuts-in-24-h-at-a-full-seat-each-so-per-bead-receipt-files-would-remove-the-bottleneck.md) — verdict **STILL-TRUE** in class at `46ab74f5` (a shared landing target turns concurrency into serial re-cut work), with its registry positive **CHANGED** at this site. Independent hit: none (same seat).

## Why a second file rather than an edit

Both corroborated files are earlier cycles of this seat, and the directory is append-only: a separate file keeps their revisions (`76b597e`, `07cc484`), their sites (TRACEABILITY.md, receipts INDEX.md) and their methods intact, and pins this site to its own revision (`46ab74f5`) and its own probes. The prediction they made — whichever of two co-touching cuts lands second re-cuts, at the cost of a seat turn — is checked here against a realized instance on a third surface; folding that into either file would fold a prediction and its test into one observation. It also spares every concurrent writer the merge conflict a shared file imposes, which is the finding itself.

## What this adds

- **A new site:** the shared landing target is no longer a docs file but the per-topic census test plus its roster fixture — `test/workbench-h2-close-condition-census.test.ts` (1232 lines at the pin) and `test/fixtures/h2-close-condition-roster.json` (1400 lines) — and the cost the 10-18 file predicted landed on a PASS-held entry rather than on a seat still cutting: a gate PASS of 487.6 s wall, held 31 h 50 min 8 s, was parked as stale at the landing-469 sweep and a full re-cut (cut #2, respin 1) was seeded. The queue measurement that follows (24 of 97 entries overlap by path; 21 co-touching pairs; 3 of 21 conflict tip to tip, one of them the same census-plus-roster shape) is what the new site contributes to the fix design, not a second axis of corroboration.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| A shared append anchor (EOF of `docs/workbench/TRACEABILITY.md`) converts doc-receipt concurrency into serial seat work: 2 union re-cuts in 24 h, 534 s wall and 266 files / 9352 tests re-run to change zero substance | 2026-10-17 file, Finding 1 |
| The known-conflicts registry "can only predict and sequence these conflicts (it did, correctly, 3 of 3); it cannot remove them, because the convention guarantees them" | 2026-10-17 file, Finding 1, second bullet; Positives, second bullet |
| `docs/workbench/receipts/INDEX.md` was the most-touched trunk file: 58 of 403 commits in 24 h | 2026-10-18 file, Finding 1 |
| "2 of 5 queued candidates add an INDEX line, and they collide with each other"; "The fold's pairwise probe onto `07cc484` read all 5 CLEAN, because each candidate is tested against trunk alone. The entry-versus-entry probe says otherwise" (`git -c rerere.enabled=false merge-tree --write-tree dbd9d7b… a972493…` → `CONFLICT (content): Merge conflict in docs/workbench/receipts/INDEX.md`) | 2026-10-18 file, Finding 2, lines 32-54 |
| The cure: per-bead files; "the directory listing is the index" | 2026-10-17 file, fix 1; 2026-10-18 file, Summary |

## Finding 1 — CONFIRMED: two PASS-held cuts of the same census + roster sat in the queue side by side for 31 h 20 min; the one that landed second was parked as stale and respun by reference

The rows, in order (all `python3 -I` reads of `ledger/metrics.jsonl`; `M:n` is the line number):

```
M:20041 gate-enqueued  wb-s6jw  2026-10-25T11:55:42Z  tip 3a0c26be
M:20419 gate-pass      wb-s6jw  2026-10-25T14:03:52Z  wallSeconds 565.873  seat gate-prep-11  harness forge 0.2.1 (rev 1aba570e31dc)
M:20434 gate-held      wb-s6jw  2026-10-25T14:09:47Z
M:21125 claim          wb-c61s  2026-10-25T18:19:38Z  seat ws-03  run g10-work-s96  source store  pickOrder oldest-ready
M:21314 collect-ready  wb-c61s  2026-10-25T19:46:58Z  "files":["test/fixtures/h2-close-condition-roster.json","test/workbench-h2-close-condition-census.test.ts"]
M:21316 gate-enqueued  wb-c61s  2026-10-25T19:47:25Z  tip 27772dff  base a5e4427c
M:21624 gate-pass      wb-c61s  2026-10-25T21:58:02Z  wallSeconds 487.629  seat gate-prep-4  run g10-gate-s100  harness forge 0.2.1 (rev 1aba570e31dc)  vitestCap 8  loadAvgStart 107.29  nproc 64
M:21644 gate-held      wb-c61s  2026-10-25T22:10:41Z  verdictClass PASS-WITH-TIMING-NOTE  passKeepsEntry true  held true
M:24172 hop-fold (after landing 466)  2026-10-27T05:00:22Z  pairwise onto f49fead: 102 tokens, 0 non-CLEAN, including wb-c61s=CLEAN wb-s6jw=CLEAN
M:24259 landing-staged wb-s6jw  2026-10-27T05:31:00Z  landing 469  tip 3a0c26be  hop 616a3c85
M:24297 landing-gate   wb-s6jw  2026-10-27T05:44:04Z  verdict pass  "landing 469 wb-s6jw land-prep clean PASS: every step 0, no judge red - reds [] explicit (R770)"  stageSeconds gate 772
M:24300 gate-lock-released wb-s6jw 2026-10-27T05:44:26Z "landing 469 folded: merge b7a2e73 + ledger a99a4ae ..."
M:24350 seed-enqueued  wb-c61s  2026-10-27T06:00:49Z  respin 1  tier sonnet  priority 1
M:24357 gate-lock-released wb-c61s 2026-10-27T06:01:09Z
M:24380 fold-done      wb-s6jw  2026-10-27T06:10:50Z  landing 469  merge b7a2e73b637dc71c69014714f5b26b5f8f9e4c13  hop a99a4ae3c7b1fc5daeec8a09b1688ec7c42491b2
```

M:24350, verbatim fields: `"title": "wb-c61s cut #2 (respin by reference): re-cut over the landed wb-s6jw cut of test/workbench-h2-close-condition-census.test.ts + roster (3-way conflict vs trunk a99a4ae3 at landing 469); keep cut-#1 findings red-first; R754 no landed row or pin dropped"`, `"ruling": "routine respin by reference (orchestrator order at the landing-469 sweep under standing rule 22; FIFO resolution, no ruling hold)"`, `"regate": "held PASS entry 27772dff parked to state/gate-queue-parked/wb-c61s.respin-by-reference-469.json BEFORE the lock release; gate lock released (re-gate order); bead reopened with the respin note"`.

M:24357, verbatim: `"reason":"respin-by-reference order at landing 469 sweep: tip 27772dff 3-way CONFLICTS with the landed wb-s6jw cut of test/workbench-h2-close-condition-census.test.ts + test/fixtures/h2-close-condition-roster.json (merge-tree rc 1 onto base a99a4ae3); entry parked BEFORE the release (PASS stale; re-cut seeded wb-c61s.respin1.json; standing rule 22)"`.

BOUNDARY.md:8248 `## FOLD landing 469 (wb-s6jw) (2026-10-27T05:44:26Z, orchestrator via bin/fold.sh)`; :8249 begins `NEW BASE a99a4ae (landing 469, wb-s6jw - landing 469 wb-s6jw (orchestrator landing under standing rule 22; land-prep gate M:24297 tree 8a3c1159a9a82f819d7b4bf5fb68064bcbc30f74)`; :8251 is the fold-done row M:24380.

The brief handed to the re-cut seat (`/tmp/fw-c61s-respin-brief.txt`, 965 bytes, also embedded as `brief` in `state/seed-claimed/wb-c61s.respin1.json`), first two sentences verbatim: `wb-c61s cut #2 (respin by reference; orchestrator order at the landing-469 sweep, standing rule 22). Your cut #1 tip 27772dffed2f (machine/flywheel/wb-c61s) holds a PASS but 3-way CONFLICTS with trunk: landing 469 (wb-s6jw merge b7a2e73b637d) landed a different cut of the SAME two files - test/workbench-h2-close-condition-census.test.ts and test/fixtures/h2-close-condition-roster.json.`

Independent reproduction in my clone (not the machine's rows), with the armed control first:

```
$ git -C rig diff --name-only 616a3c8551482615bc8a26f47333c9e563768054 b7a2e73b637dc71c69014714f5b26b5f8f9e4c13     # landing 469's merge vs its base: the s6jw cut
test/fixtures/h2-close-condition-roster.json
test/workbench-h2-close-condition-census.test.ts
$ git -C rig merge-base 27772dffed2f a99a4ae3c7b1fc5daeec8a09b1688ec7c42491b2
a5e4427cf13c8d49367a5b05bdfafe6c222800e5
$ git -C rig diff --name-only a5e4427cf13c8d49367a5b05bdfafe6c222800e5 27772dffed2f                                   # the c61s cut: the same two files, no others
test/fixtures/h2-close-condition-roster.json
test/workbench-h2-close-condition-census.test.ts
$ git -C rig -c rerere.enabled=false merge-tree --write-tree --name-only 616a3c8551482615bc8a26f47333c9e563768054 27772dffed2f   # CONTROL: the trunk before landing 469
302f996ae92c2dc9d7ccf27a4d5f36a436a865ce
merge-tree rc=0
$ git -C rig -c rerere.enabled=false merge-tree --write-tree --name-only a99a4ae3c7b1fc5daeec8a09b1688ec7c42491b2 27772dffed2f   # the trunk after landing 469
23b52cc9bc90f5910b2c988bc7306318b428d056
test/fixtures/h2-close-condition-roster.json
test/workbench-h2-close-condition-census.test.ts

Auto-merging test/fixtures/h2-close-condition-roster.json
CONFLICT (content): Merge conflict in test/fixtures/h2-close-condition-roster.json
Auto-merging test/workbench-h2-close-condition-census.test.ts
CONFLICT (content): Merge conflict in test/workbench-h2-close-condition-census.test.ts
merge-tree rc=1
$ git -C rig -c rerere.enabled=false merge-tree --write-tree --name-only 46ab74f5cc678e565fdc4d851f99e10d1f649309 27772dffed2f   # the pin: still conflicting, the re-cut had not landed
eae43b7aba3f719667a980585145c4f38c882083
test/fixtures/h2-close-condition-roster.json
test/workbench-h2-close-condition-census.test.ts

Auto-merging test/fixtures/h2-close-condition-roster.json
CONFLICT (content): Merge conflict in test/fixtures/h2-close-condition-roster.json
Auto-merging test/workbench-h2-close-condition-census.test.ts
CONFLICT (content): Merge conflict in test/workbench-h2-close-condition-census.test.ts
merge-tree rc=1
```

Sizes of the two cuts against their own merge-bases (`git diff --stat`): c61s `2 files changed, 274 insertions(+), 50 deletions(-)` (roster 102 lines, census 222 lines); s6jw `2 files changed, 108 insertions(+), 20 deletions(-)` (roster 60, census 68). The c61s base `a5e4427c` (committed 2026-10-25T19:39:54Z, the landing-433 hop) is an ancestor of the landing-469 trunk `616a3c85` (`git merge-base --is-ancestor` rc 0): the cut was correct against every trunk it saw, and the gate that passed it (probe `a5151700` = gateBase `6c0ebdb9` + `27772dff`, M:21624) merged cleanly. Nothing in this finding is a gate defect.

Durations, computed from the row stamps above: s6jw's PASS had been held 5 h 37 min 38 s when c61s was enqueued (M:20434 → M:21316) and 4 h 9 min 51 s when the c61s seat claimed the bead (M:20434 → M:21125); the two PASS-held entries sat side by side 31 h 20 min 19 s (M:21644 → M:24259); c61s's PASS was held 31 h 50 min 8 s before it was parked (M:21644 → M:24350); from c61s's enqueue to the collision surfacing: 34 h 13 min 24 s (M:21316 → M:24350); s6jw's own queue residency was 41 h 35 min 18 s (M:20041 → M:24259).

## Finding 2 — CONFIRMED: the information that the two PASS-held cuts of the same census + roster collide was in this repo's object store from M:21644 (2026-10-25T22:10:41Z) onward — a tip-to-tip merge-tree of 3a0c26be and 27772dff conflicts in both files — while the fold's pairwise line at M:24172 read both CLEAN 30 min before landing 469

This is the 10-18 file's Finding 2 mechanism at the new site. The last hop-fold before landing 469, M:24172 (`hop-fold`, `afterLanding` 466, 2026-10-27T05:00:22Z), carries 102 tokens in its `pairwise` field, 0 of them non-CLEAN, among them `wb-c61s=CLEAN` and `wb-s6jw=CLEAN`; landing 469 was staged 30 min 38 s later (M:24259). The probe that produced M:24172 merges each entry onto trunk alone (machine `bin/fold-hop.sh:50` at `ebc12aae`); its shape is the machine's and is named as context, not as a finding against this repo. The 37 fold-done rows for landings 440-476 all carry `duties.knownConflicts` = `none`, and 0 of their 37 `sweep` fields contain the string CONFLICT; the landing-469 row's reads `sweep-landing a99a4ae vs a99a4ae: unflagged_red=none flagged_red=none f5=none`. The collision is recorded only in M:24350, M:24357 and `state/known-conflicts.json`.

The same two commits, tip to tip (both are in this repo's object store on `machine/flywheel/wb-s6jw` and `machine/flywheel/wb-c61s`; `git ls-remote origin` listed both refs at these shas at 2026-10-27T09:36Z):

```
$ git -C rig -c rerere.enabled=false merge-tree --write-tree --name-only 3a0c26be063ab60d2e4702071bce737be6f7e390 27772dffed2f7fe75904c2dba43a4ae027cb188b
43df62b5915eefccddcbba41a80ba3277a4d76b5
test/fixtures/h2-close-condition-roster.json
test/workbench-h2-close-condition-census.test.ts

Auto-merging test/fixtures/h2-close-condition-roster.json
CONFLICT (content): Merge conflict in test/fixtures/h2-close-condition-roster.json
Auto-merging test/workbench-h2-close-condition-census.test.ts
CONFLICT (content): Merge conflict in test/workbench-h2-close-condition-census.test.ts
merge-tree rc=1
$ git -C rig merge-base 3a0c26be063ab60d2e4702071bce737be6f7e390 27772dffed2f7fe75904c2dba43a4ae027cb188b
94c66b1c4ee3f63328919ab9829508b66a9989fb
```

Both tips were queued from the c61s enqueue (M:21316, 2026-10-25T19:47:25Z) — 34 h 13 min 24 s before the sweep found the collision (M:24350, 06:00:49Z) — and both held a PASS from M:21644 (22:10:41Z) onward, 31 h 20 min 19 s before landing 469 was staged (M:24259, 05:31:00Z) and 31 h 50 min 8 s before the park (M:24350); already at the c61s seat's claim (M:21125, 18:19:38Z) s6jw's queued tip of the same two files had been PASS-held 4 h 9 min 51 s (M:20434, 14:09:47Z). The information that c61s could not land as cut once s6jw landed first was available for the whole of that hold.

The registry did not pre-sequence this pair. `state/known-conflicts.json` (`conflicts`: 37 entries) holds the pair as entry 37 of 37 with `"firstSeen": "2026-10-27T06:00:49Z"` — 16 min 23 s after the 05:44:26Z fold (BOUNDARY.md:8248), the same second as the seed-enqueue row M:24350 — and its fields, verbatim: `"file": "test/workbench-h2-close-condition-census.test.ts (+ test/fixtures/h2-close-condition-roster.json)"`, `"shape": "content (3-way vs the landed wb-s6jw cut at landing 469; both cut the same census + roster; merge-tree rc 1 onto a99a4ae3)"`, `"routed": "respin by reference (orchestrator order at the landing-469 sweep under standing rule 22): entry parked to state/gate-queue-parked/wb-c61s.respin-by-reference-469.json, lock released, seed wb-c61s.respin1.json enqueued; remove this entry when the re-cut lands"`. The string `s6jw` occurs once in the whole file, inside that entry. This is the 10-17 file's positive — "3 of 3 firings in the window were correct and pre-sequenced, so no seat discovered the conflict by surprise" — CHANGED at this site: the row recorded the resolution after the landing instead of sequencing the pair before it.

## Finding 3 — CONFIRMED as measured for the overlap and the tip-to-tip conflicts; PLAUSIBLE that the 18 textually clean pairs are clean: 24 of 97 queued entries share a cut file, 23 files are touched by more than one entry (17 of them census tests or roster fixtures), 21 co-touching pairs, 3 of 21 conflict tip to tip

Queue snapshot 2026-10-27T08:29Z (`state/gate-queue`: 97 files; every entry carries `bead, branch, commit, base, seat, red, green, respin, enqueuedUtc, run, note, statementLint`; `respin` 0 on 97 of 97; `enqueuedUtc` from 2026-10-25T14:31:04Z to 2026-10-27T08:19:36Z). Cut surface per entry = `git diff --name-only $(git merge-base commit 46ab74f5) commit`; 97 of 97 resolved. Output of the census, verbatim:

```
entries sharing >=1 cut file with another entry: 24 of 97
  same, excluding .beads/* and TRACEABILITY.md: 24
files touched by >1 entry: 23 (excl .beads/TRACEABILITY: 23 )
of which census tests or roster fixtures: 17
  x3 test/fixtures/rf-tsx-closed-vocabulary-roster.json :: wb-30xx wb-g8uk wb-jwc.4
  x3 test/workbench-docs09-readers-relationships.census.ts :: wb-4ap.17 wb-grmo.2 wb-vm71
  x2 docs/workbench/feature-matrix.md :: wb-693.7 wb-jwc.4
  x2 src/index.ts :: wb-4ap.17 wb-86q
  x2 test/fixtures/forge-proposal-admission-roster.json :: wb-4ap.17 wb-9akv
  x2 test/fixtures/h2-bead-graph-roster.json :: wb-k888 wb-mdfe
  x2 test/fixtures/h2-state-promotion-roster.json :: wb-cd1r wb-jwc.4
  x2 test/fixtures/observation-class-roster.json :: wb-4tdn wb-kku9.5
  x2 test/fixtures/rc-context-block-roster.json :: wb-jwc.4 wb-ycir
  x2 test/fixtures/rf-typed-status-echo-roster.json :: wb-jwc.4 wb-rgov
  x2 test/fixtures/ri-emitted-reference-roster.json :: wb-an8d wb-jwc.4
  x2 test/fixtures/tsx-resource-closure-roster.json :: wb-blzr wb-jwc.4
  x2 test/fixtures/tsx-unshipped-surface-roster.json :: wb-4azw wb-693.7
  x2 test/helpers/rf-render-fixture.ts :: wb-grmo.1 wb-jwc.4
  x2 test/workbench-detached-timing-guard.test.ts :: wb-ksz wb-nqbd
  x2 test/workbench-forge-operation-observer.test.ts :: wb-4ap.17 wb-dt6z
  x2 test/workbench-forge-proposal-admission-census.test.ts :: wb-4ap.17 wb-9akv
  x2 test/workbench-h2-bead-graph-census.test.ts :: wb-k888 wb-mdfe
  x2 test/workbench-observation-class-census.test.ts :: wb-4tdn wb-kku9.5
  x2 test/workbench-rc-context-block-census.test.ts :: wb-jwc.4 wb-ycir
  x2 test/workbench-rf-observation-cache-key.test.ts :: wb-fed7 wb-jwc.4
  x2 test/workbench-rf-tsx-closed-vocabulary-census.test.ts :: wb-30xx wb-g8uk
  x2 test/workbench-tsx-unshipped-surface-census.test.ts :: wb-4azw wb-693.7
```

10 of the 23 shared files are `test/fixtures/*-roster.json`, 7 are census files (6 `*-census.test.ts` plus `test/workbench-docs09-readers-relationships.census.ts`), 6 are other files. 6 pairs share both a census test and its roster — the exact c61s x s6jw shape: wb-30xx x wb-g8uk, wb-4ap.17 x wb-9akv, wb-4azw x wb-693.7, wb-4tdn x wb-kku9.5, wb-jwc.4 x wb-ycir, wb-k888 x wb-mdfe. 0 queued entries touch the h2-close-condition census or roster at the snapshot (c61s is parked and its re-cut not yet delivered; s6jw landed).

Tip-to-tip `merge-tree --write-tree` over every co-touching pair (the probe of Finding 2 run at scale; 21 pairs, all 21 completed inside a 150 s time box), verbatim:

```
pairs with merge-tree rc 1: 3 of 21; rc 0 (clean): 18; other rc: []
  rc=1 wb-4ap.17 x wb-grmo.2 | shared=1 | conflicting=1 :: test/workbench-docs09-readers-relationships.census.ts
  rc=1 wb-693.7 x wb-jwc.4 | shared=1 | conflicting=1 :: docs/workbench/feature-matrix.md
  rc=1 wb-k888 x wb-mdfe | shared=2 | conflicting=2 :: test/fixtures/h2-bead-graph-roster.json; test/workbench-h2-bead-graph-census.test.ts
pairs sharing BOTH a census test and a roster fixture: 6 [('wb-30xx', 'wb-g8uk'), ('wb-4ap.17', 'wb-9akv'), ('wb-4azw', 'wb-693.7'), ('wb-4tdn', 'wb-kku9.5'), ('wb-jwc.4', 'wb-ycir'), ('wb-k888', 'wb-mdfe')]
distinct entries in a conflicting pair: 6 of 97
```

So path overlap over-predicts textual conflict: 3 of 21 co-touching pairs conflict, 1 of the 6 census-plus-roster pairs (wb-k888 x wb-mdfe, both files, the c61s x s6jw shape), and 6 of 97 entries are in a conflicting pair. Whichever member of those 3 pairs lands second will reproduce Finding 1 unless it is sequenced or batched first; the remaining 18 pairs are PLAUSIBLE-clean only, because the registry's `entries` list carries a conflict kind that rc 0 cannot see — entry 1 of 2 reads `"kind": "semantic (textually clean)"` (wb-4ap.2 x wb-zsv.4: "composed tree RED at collection").

Cross-reference to the export-reading class filed separately in this batch as `2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md` (bead wb-tz4r.8, landing 467; the filename as it stands untracked in this batch's working tree at 09:36Z): 84 files under `test/*.ts` at `46ab74f5` mention `issues.jsonl` (`git grep -l -E 'issues\.jsonl' 46ab74f5 -- 'test/*.ts' | wc -l`; 82 with the stricter `\.beads/issues\.jsonl`), the h2-close-condition census is one of them (`test/workbench-h2-close-condition-census.test.ts:78`, `:859`, `:1114` at the pin), and 63 of the 97 queued entries touch at least one of the 84.

## Finding 4 — realized cost: CONFIRMED for the discarded gate and the hold; UNDETERMINED for the re-cut, which had not delivered by the window's end

Discarded: the wb-c61s cut-#1 gate PASS M:21624 (`wallSeconds` 487.629 on seat gate-prep-4, run g10-gate-s100, `vitestCap` 8, `loadAvgStart` 107.29, `nproc` 64, `slotWaitSeconds` 0), classed `PASS-WITH-TIMING-NOTE` with `passKeepsEntry` true at M:21644, held 31 h 50 min 8 s, then parked as `PASS stale` (M:24357). The parked entry `state/gate-queue-parked/wb-c61s.respin-by-reference-469.json` (2319 bytes) keeps the entry's full `red` and `green` statements, so the evidence survived even though the verdict did not. The brief's last sentence fixes the re-measure duty: `Carry cut #1's gate findings forward where still true; the gate re-measures everything on the new merge.`

Not yet realized: `state/seed-claimed/wb-c61s.respin1.json` carries `"pickedUtc": "2026-10-27T06:02:19Z", "pickedBy": "ws-05", "pickedRun": "g10-work-s113"`, and the ledger holds no row with `bead` = `wb-c61s` after M:24357 through M:24822 (read 2026-10-27T08:37Z); the two later rows that mention the bead belong to other beads (M:24400 wb-fed7 in `knownConflictsAtBind`, M:24719 wb-5qrd in `contacts`). The re-cut's seat time, its gate and its landing are the artifact that settles this cost.

## Re-check verdicts on the corroborated files

| Claim in the corroborated file | Verdict at `46ab74f5` |
|---|---|
| 10-18 Finding 1: INDEX.md is the most-touched file on trunk (58 of 403 commits in 24 h) | **FIXED** — `git cat-file -e 46ab74f5:docs/workbench/receipts/INDEX.md` → `fatal: path 'docs/workbench/receipts/INDEX.md' does not exist in '46ab74f5…'` (rc 128); last commit touching it `b71b72c 2026-10-18T10:16:43Z feat(workbench): wb-5zz retire committed receipts INDEX.md — the index is a rendered view of the directory`; `docs/workbench/receipts/` holds 47 entries at the pin |
| 10-18 Finding 2: queued entries collide with each other while the pairwise probe onto trunk reads all CLEAN, because each candidate is tested against trunk alone | **STILL-TRUE** in mechanism at a new site — the machine's probe (`bin/fold-hop.sh:50` at `ebc12aae`, context only) merges each entry onto trunk alone; M:24172 read `wb-c61s=CLEAN wb-s6jw=CLEAN`; tip to tip the pair is rc 1 in both files (Finding 2 above). The INDEX.md instance itself is moot (file gone) |
| 10-18 Finding 3 (CHANGED): the 10-17 prediction half-landed — per-bead receipt files exist, the index that lists them is still one committed file | **CHANGED again** — the second half landed (INDEX.md retired by `b71b72c`), and the serialization moved to a third surface: the per-topic census test and its roster fixture (Findings 1 and 3) |
| 10-17 Finding 1: the EOF anchor converts doc-receipt concurrency into serial seat work | **STILL-TRUE** in class at a new site — a PASS-held cut discarded and a full re-cut seeded over two shared files; for the TRACEABILITY.md anchor itself **UNDETERMINED** (the file exists at the pin, `git cat-file -e` rc 0; whether receipts still append at its EOF was not re-measured — artifact: `git log -p 46ab74f5 -- docs/workbench/TRACEABILITY.md` over the window) |
| 10-17 Positives: the known-conflicts registry pre-sequenced 3 of 3 firings, "so no seat discovered the conflict by surprise" | **CHANGED** at this site — entry 37 of 37 has `firstSeen` 2026-10-27T06:00:49Z, 16 min 23 s after the landing-469 fold; it recorded the resolution rather than sequencing the pair, and the next gate bound it 16 min later (M:24400, wb-fed7, `knownConflictsAtBind`: `state/known-conflicts.json 37 entries, sha256/16 b1191d057e2967d6 at 06:15Z (36 entries, df20c4906775a44e at 05:58Z; the new entry is wb-c61s x landed wb-s6jw): 0 mentions of wb-fed7 or the census`) |
| 10-17 fix 1 / 10-18 Summary: per-bead files; the directory listing is the index | **FIXED** for receipts (INDEX.md gone, 47 per-bead files); **not applied** to roster fixtures — 10 of the 23 files shared by queued entries are `test/fixtures/*-roster.json` |

## Recommendations, additive to the corroborated files' lists (cheapest first)

Repo-side asks — this repo's convention:

1. **Roster fixtures as directories where the roster is a union table** — one fragment per delivering bead, the census reading the directory — the cure the 10-18 file named and that landed for receipts (`docs/workbench/15-implementation-program.md:95` at `46ab74f5`: `A new receipt goes to docs/workbench/receipts/<bead-id>.md, one file per bead`). 10 of the 23 shared files are rosters; the census test itself stays one file by design (its value is the whole table), so there the fix is sequencing, not splitting.
2. **Document one open cut per census + roster pair** beside the receipts convention. What exists today: `docs/workbench/15-implementation-program.md:90-98` at `46ab74f5` ("Delivery receipts", the last section of the 98-line file) binds the per-bead receipt shape and says nothing about a second cut of a topic whose census + roster already has a PASS-held cut; `git grep -n -i -E 'known-conflicts|re-cut|respin by reference|one open cut|sequenc' 46ab74f5 -- 'docs/workbench/0*.md' 'docs/workbench/1*.md' AGENTS.md CONTRIBUTING.md README.md` returns 8 hits, every one a `sequence`/`consequence` word or the receipts-append sentence at `15-implementation-program.md:95`, none a landing rule (control: `receipts` over the same paths, 18 hits). The rule: the later cut re-cuts over the held tip by reference before its gate, not after a PASS. Acceptance: a reader at HEAD finds the rule by path, and the queue census of Finding 3 shows 0 pairs sharing both a census test and its roster (6 at the 08:29Z snapshot).

### Routed out — driving machine `bin/`, not this repo

Named as context for the asks above. None of the three is tracked on the machine side yet as of 2026-10-27T09:38Z: `state/pending-rule-edits/` holds 9 files (newest 2026-10-25T14:03:05Z) and 0 of 9 match `pairwise|merge-tree|tip-to-tip|enqueue`; the strings `tip-to-tip` / `tip to tip` occur 0 times in `BOUNDARY.md` (8394 lines; control `pairwise`: 332) and 0 times in `ledger/metrics.jsonl` (24985 rows; control `pairwise`: 550); the machine repo has no `new-feedback/` (`ls machines/flywheel/new-feedback` → `No such file or directory`); the machine's own bead store (a dolt store under `machines/flywheel/.beads`) was not opened. Artifact that settles tracking: a machine bead id or a `state/pending-rule-edits/` entry naming each line.

- **R1 — probe tips at enqueue time, not only onto trunk at fold time:** at the M:21316 moment run `git -c rerere.enabled=false merge-tree --write-tree HELD_TIP NEW_TIP` against every PASS-held entry and, on rc 1, write the `known-conflicts.json` row then, sequencing the later entry behind the earlier (it owes a re-cut over the landed shape, by reference, before its gate rather than after a PASS); 97 cut surfaces resolved in seconds here and 21 pair probes completed inside a 150 s box; probe tips rather than compare paths, because path overlap over-predicts 7 to 1 (3 conflicting of 21 co-touching pairs); at this site the probe would have fired at 2026-10-25T19:47:25Z, 34 h 13 min 24 s before the sweep found the collision (M:24350), 43 min 29 s before the 487.6 s gate on that cut started (M:21419, 20:30:54Z) and 2 h 10 min 37 s before it passed (M:21624).
- **R2 — add the tip-to-tip leg to the existing pairwise probe** (`bin/fold-hop.sh:50`, `bin/fold-hop.py:102`, `bin/fold-landing.py:119` at `ebc12aae`, each `merge-tree --write-tree BASE commit`) for entries whose cut surfaces intersect, so the BOUNDARY pairwise line reads `wb-c61s x wb-s6jw=CONFLICT` where M:24172 read two CLEANs — the same command, one more loop.
- **R3 — batch co-touching PASS-held cuts into one landing** where they merge clean with each other: the g10.14 knob at `bin/land-chain.sh:24,57-61` and `bin/fold.sh:12` (`FW_LAND_BATCH_MAX unset|1 = off, 2..8 = on`; default off at `ebc12aae`) covers the 18 of 21 clean pairs, and the trunk's first-parent log after the pin already shows it in use (`4384ed95 2026-10-27T09:10:36Z landings 481..482: batch B481-482-6412809-t1 (2 beads: wb-h55d .. wb-dwa9; octopus onto trunk 6412809cf; …` and `c1ea789c 2026-10-27T09:18:16Z landings 483..484: batch B483-484-c612d80-t1 …`); the 3 conflicting pairs still need R1 or R2, because an octopus of two tips that conflict with each other conflicts too (PLAUSIBLE: not run).

Routing: the two numbered asks change this repo (its fixtures convention and its contributor docs); the three R-lines change the driving machine's `bin/` and are recorded here because the surface they protect — the per-topic census plus roster as the unit every cut of a topic edits — is this repo's.

## Positives worth protecting

- **The parked entry keeps the evidence when the verdict goes stale.** `state/gate-queue-parked/wb-c61s.respin-by-reference-469.json` carries cut #1's complete `red` and `green` statements (2319 bytes) and the order of operations in M:24350/M:24357 is `entry parked ... BEFORE the lock release`, so there is no window in which a stale PASS could be landed, and nothing the seat measured is lost.
- **The respin brief needs no re-discovery.** 965 bytes name both files, the landed merge `b7a2e73b637d`, the re-cut shape (`merge-not-rebase; keep your branch history`), the substance to carry (`the three bd import-class close paths ...`) and the duty (`R754: no landed row or pin dropped`), and the same text rides in the seed file's `brief` field.
- **The registry row cites itself out of existence and reaches the next gate fast.** Entry 37 of 37 ends `remove this entry when the re-cut lands`; the registry's own `note` says gates `cite entries here by reference instead of re-deriving`; and M:24400 (wb-fed7, 06:17:08Z) bound the 37-entry registry 16 min after the row was written.
- **The landing gate was clean and the cuts were correct.** M:24297 `every step 0, no judge red - reds [] explicit (R770)`; the c61s base is an ancestor of the landing-469 trunk and its gate probe merged clean. The defect is in what the queue knows about its own entries, not in the gate or in either cut.
- **The convention bounds the blast radius to two files.** Both cuts touched exactly the census and its roster (`diff --name-only` outputs above); the shared target is small and named, which is what made a respin by reference possible at all.
- **(Machine-side context, not a positive of this repo) The per-entry probe runs at every hop and costs little.** The machine's `bin/fold-hop.sh:50` at `ebc12aae` probed 102 entries at M:24172; the gap is the probe's shape (onto trunk only), not its presence or its price.

## What I did not establish

- Whether the 18 textually clean co-touching pairs are semantically clean; the registry records a `semantic (textually clean)` kind (wb-4ap.2 x wb-zsv.4), so rc 0 is not proof. Artifact: the composed tree's suites per pair.
- The re-cut's cost (seat time, gate wall, landing); no `wb-c61s` row after M:24357 through M:24822. Artifact: its collect-ready, delivered, gate-pass and landing rows.
- Whether an octopus batch of a conflicting pair conflicts (not run), and the enqueue-time probe's false-positive rate on a longer window.
- Whether the TRACEABILITY.md EOF-append still serializes receipts at the pin (the file exists; its window history was not read).
- What the 17 of 37 gate-pass rows without a `forge N.N.N` string in `harness` ran under; whether that is an unrecorded field or a different harness. The vitest version was not re-verified; no pi-subagents binary ran in this lane.
- The queue numbers are a snapshot (08:29Z) of a queue that took new entries until at least 08:19:36Z; an earlier read the same morning counted one entry fewer in the overlap. Scope every number above to that snapshot.

## Delivery

Docs-only commit on branch `machine/flywheel/feedback-2026-10-27`, cut from a detached worktree of `origin/workbench/implementation-program`, for the program owner to land per this directory's README (feedback writers do not push protected branches). No build or test gate ran for this file; gate waiver disclosed per standing operator direction. The branch is cut at `46ab74f5`; by 2026-10-27T09:36:24Z (`git ls-remote origin refs/heads/workbench/implementation-program`, run from the rig clone) the live ref had moved to `e58c165b27afc9c2fb6a3dea9d28fae1a221b416`, 14 commits (8 first-parent: landings 479-484, committed 08:17:11Z-09:30:01Z) past the pin with the pin an ancestor (`git merge-base --is-ancestor` rc 0), so the owner lands this branch over a moved trunk; the parked c61s tip `27772dff` still conflicts with `e58c165b` in both files (`merge-tree --write-tree` rc 1, tree `00a6d041`), so the re-cut had not landed by then.
