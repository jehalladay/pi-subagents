# CORROBORATION, n=58: landings 611-668 landed 58 of 58 merge trees identical to the gated tree, 35 of them in 13 octopus batches of 2 to 4 members and 2 of them src landings — and the HOLD branch the 2026-10-23 file left unmeasured fired 5 times with 0 pushes on a REAL RED verdict

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle (six days and 326 landings later); the measurement re-derives every equality from the rig clone's object store against the machine ledger, it does not quote the earlier file's method output
**Date:** 2026-10-29 (ledger window from 2026-10-28T07:56:00Z inclusive to 2026-10-29T07:30:00Z exclusive; derivation run 2026-10-29T08:18Z-08:40Z; re-derivation of every number a verifier disputed, at the pinned sha, 2026-10-29T09:17Z)
**`pi-subagents` revision:** trunk `origin/workbench/implementation-program` at `e3022a1390d5d7c69e8a928a360ce099776f91bf` when the scout read source (2026-10-29T07:09:05Z tip) and at `9fdd6d9b23485d9067c92d20df320f491182df91` when this draft fetched (`git fetch -q origin` rc 0 at 2026-10-29T08:18:02Z; tip "ledger: close wb-km7q.1 (landing 669, merge 3e63d8b3)" 2026-10-29T08:08:26Z); `git diff --quiet e3022a1 9fdd6d9b -- new-feedback/ docs/ AGENTS.md README.md test/helpers/census.ts` rc 0, so every path cited below holds at both shas (this repository has no `bin/` at either sha — `git ls-tree 9fdd6d9b -- bin/` prints 0 entries — so every `bin/` path named below is the machine's, not this repository's); `e3022a1` is an ancestor of `9fdd6d9b` (`git merge-base --is-ancestor` rc 0). The corroborated file pinned trunk at `9357bf4267252eb91b043dafeb28bf0157838eee` (landing 285 hop, 2026-10-23T08:05:21Z), an ancestor of both (rc 0, rc 0). The 58 landings' merge, hop and gated-tree shas are pinned per landing in the Evidence section and all 58 hops are ancestors of `9fdd6d9b` (58 of 58, `git merge-base --is-ancestor`). The rig clone's checked-out HEAD stayed at `188ae59` throughout; nothing was checked out.
**`vitest` revision:** `4.1.10` (`./node_modules/.bin/vitest --version` prints `vitest/4.1.10 linux-x64 node-v24.20.0`; `package.json:71` at both trunk shas pins `"vitest": "^4.0.18"`)
**`node` revision:** `v24.20.0` (`node --version`)
**Machine-side tool pins (producer artifacts, not this repo):** gate-judge `1.1.0` (`tool`/`version` keys of the five kept try-1 judge reports named below); the land-prep gate envelope for the refused 627 gate is `fixtures/landprep-redpath/envelope-wb-t1jc-cmd_08533cd9be6f.json` (`contract_version` key present; `data.gated_tree`/`data.gated_commit` read from it)
**Method:** read-only derivation over the flywheel machine ledger `machines/flywheel/ledger/metrics.jsonl` (`M:n` = line n; 33,366 lines at the derivation and 33,455 at the re-derivation, 4,378 rows with `utc` in the window spanning M:28908..M:33285 at both lengths; the file has 251 non-monotonic timestamp steps over its whole length by the derivation's definition — `ts = row.utc or row.ts`, each row compared with the last row that carried either; 250 by `utc` alone carried across the 79 `utc`-less rows, 249 comparing adjacent rows only, all three re-counted at 33,455 lines — so rows were selected by `utc` value, never by line range) with `python3 -I`: every `fold-done` row (landing, bead, merge, hop, baseFrom, landingKind), every `landing-gate` row (gatedTree, mergeTree, cmd, verdict, furnaceMode, base, tip, note), every `landing-batch-result`, `gate-lock-released`, `landing-gate-try` and `ruling-bound` row, joined to the rig clone's object store with `git -C rig rev-parse MERGE^{tree}`, `git rev-list --parents -n 1 MERGE`, `git rev-parse HOP^`, `git rev-parse MERGE^1`, `git merge-base --is-ancestor` and `git log 9fdd6d9b23485d9067c92d20df320f491182df91 --format='%H %T'` (3,618 trunk ancestors at `9fdd6d9b`; `git rev-list --count 9fdd6d9b` = 3618). The first walk ran by ref name and read 3,632 ancestors, because the shared clone's `origin/workbench/implementation-program` moved during the 08:18-08:40Z derivation — the live land-loop fetches in this clone; its reflog: `8ac84f04` at 08:23:31Z, then `1ad30c3e664448acffc5020f0b0ff6971835dd37` ("ledger: close wb-b9n.1 (landing 670, merge 8ac84f04)", committed 08:23:44Z) at 08:23:52Z, `git rev-list --count 1ad30c3e` = 3632 — so the census was re-walked at the pinned sha with the same result (red trees on 0/0/0/1/0 trunk commits, control 1, at both `9fdd6d9b` and `1ad30c3e`), and every other git read below names the sha, not the ref. The custody/timing block in Finding 4 and the try/staged counts in Finding 3 come from a second read-only script over the same rows, `/tmp/fw-c3-fix/fw-c3-custody.py` (release row = the first `gate-lock-released` row for the landing's bead whose reason names `landing N`; hop commit time = `git show -s --format=%cI HOP`; `statistics.median`), whose output is quoted there; the five kept try-1 gate-judge reports with real reds and the one kept gate envelope under `machines/flywheel/fixtures/landprep-redpath/`; the ruling rows in `machines/flywheel/BOUNDARY.md` (10,138 lines at the read, 10,161 at the re-derivation; append-only, so the cited `:9525`, `:9559`, `:9615`, `:9824` are stable, and the quotes from `:9525` and `:9559` re-read verbatim). All machine paths are relative to `OrchestrationEngineer/machines/flywheel/`. No test, gate, `bd` write or push ran for this file.
**Scope:** positives about the pi-subagents landing protocol as operated under standing rule 22 (the orchestrator lands FIFO itself; the land-prep gate on the exact merge is the gate of record) over the 58 landings 611-668 — tree identity under octopus batches and src-touching landings, the HOLD branch on a REAL RED verdict, and PASS-KEEPS-ENTRY custody — plus a re-check of every claim in the corroborated file and of its one ask. Defects from the same window (the R515/R668 refusal class, the report-mode census consequent, the fold-duties registry-resolution refusals) belong to sibling files and are not re-argued here. The machine's own row formats are named where they bound a measurement, not as asks on this repository; Findings 3 and 4 re-check the corroborated file's machine-side wins (the HOLD branch, lock custody) for the re-check table only, and no ask on this repository follows from them. The one ask here is Recommendation 1 (one paragraph in `docs/workbench/feature-matrix.md`); Recommendation 2 is a machine-side note and is labelled as such.
**Corroborates:** [`2026-10-23-the-r636-phase-2-landing-law-landed-22-of-22-landings-262-283-with-5-of-5-r633-spot-pairs-agreeing-and-22-of-22-landed-merge-trees-identical-to-the-gated-tree.md`](2026-10-23-the-r636-phase-2-landing-law-landed-22-of-22-landings-262-283-with-5-of-5-r633-spot-pairs-agreeing-and-22-of-22-landed-merge-trees-identical-to-the-gated-tree.md) — verdict **STILL-TRUE** for its win 1 and win 3, **CHANGED** for its win 2, and its win-4 HOLD branch moves from UNDETERMINED to **CONFIRMED**, all at `9fdd6d9b` (the corroborated file was at `9357bf4`); independent hit 2 (same seat, a later cycle, a fresh derivation). That file sits on `origin/machine/flywheel/feedback-2026-10-23` only (one-file commit `7aad71a70763599ade8bbdce57fef7a8be03128e`, 2026-10-23T08:21:24Z, blob `47536509f19122f087c057a2fb112e0685955cbb`), not on trunk at `9fdd6d9b` (0 of 18 entries). The delivery recipe for this file cherry-picks that one-file commit onto the delivery branch ahead of this file — the same blob at the same path, so a later landing of `feedback-2026-10-23` merges it without conflict — which is what lets the link above resolve on the branch and `feedback-lint.py --strict` exit 0 there; the lint of this file ran with that file present in this directory (`git hash-object` = `47536509`).
**Prior art:** checked at the fetched ref: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` = 18 entries at `9fdd6d9b` (identical listing at `e3022a1`); the filename grep `tree|identical|R636|R633|landing-law|octopus|gated|land-prep|PASS-KEEPS` hits only `2026-10-20-npm-ci-in-25-gate-worktrees-...md` (on the word "worktrees"); body greps at the ref (`git grep -li`): `R636` 1 file and `landing law` 1 file (both `2026-10-24-CORROBORATION-docs09-787-...md`, which cites the law in passing), `gatedTree` 1 file (`2026-10-15-positive-the-complete-gate-receipt-...md`), `tree identity`, `tree-identical`, `identical to the gated tree`, `PASS-KEEPS-ENTRY`, `octopus` 0 files each. No trunk file states this claim. Eleven `origin/machine/flywheel/feedback-*` branches (2026-10-15 .. 2026-10-28) hold unlanded flywheel files; the corroborated file is one of them. A sibling lane's untracked draft on the R515/R668 refusal class (`2026-10-29-CORROBORATION-70-of-86-gate-refusals-...md`) sat in this directory at write time; a different claim.

## Why a second file rather than an edit

The corroborated file belongs to an earlier cycle of this seat and is not edited. A separate file preserves its revision (`9357bf4`), its method (fold lines in `BOUNDARY.md:5559-5760` plus judge reports) and this one's (ledger rows joined to the object store, a different instrument), which is what makes n=58 a second measurement rather than a restatement — an edit would fold two observations into one and destroy the independence it claims. It also spares every writer the merge conflict a shared file imposes under concurrent filing: a sibling lane was writing into this directory at the same time.

## What this adds

- **A new measurement:** 58 of 58 landings (611-668, 22 h 58 min 45 s from the first landing gate 2026-10-28T08:15:10Z to the last fold-done row 2026-10-29T07:13:55Z) landed a merge commit whose tree equals the `landing-gate` row's `gatedTree`, 0 differ — where the corroborated file had 22 of 22 (landings 262-283, 8 h 06 min). The new count covers two populations the earlier file explicitly excluded: 35 of the 58 landed through 13 octopus merges of 3, 4 or 5 parents (batches of 2 to 4 members; the earlier set was 22 two-parent singles), and 2 of the 58 are `landingKind: src` landings (644 wb-4ap.15, 646 wb-gwr.2; the earlier file: "no src-touching landing sat in this set, so the law's behaviour on one was not exercised here"). The re-check table below carries the rest: the HOLD branch exercised 5 times with 0 pushes on a REAL RED verdict (the earlier file: "the law was not exercised against a real-assertion red in this set (0 occurred), so its HOLD branch is unmeasured here"), the spot-pair leg gone under standing rule 22, and the file's one ask still open at `9fdd6d9b`.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| The R636 two-leg law: gate the exact merge onto the live hop, push only a tree-identical commit, 22 of 22 at landings 262-283 | [`2026-10-23-the-r636-phase-2-landing-law-landed-22-of-22-landings-262-283-with-5-of-5-r633-spot-pairs-agreeing-and-22-of-22-landed-merge-trees-identical-to-the-gated-tree.md`](2026-10-23-the-r636-phase-2-landing-law-landed-22-of-22-landings-262-283-with-5-of-5-r633-spot-pairs-agreeing-and-22-of-22-landed-merge-trees-identical-to-the-gated-tree.md), win 1 |
| PASS-KEEPS-ENTRY custody (lock and queue entry released only at the fold), 22 of 22 | the same file, win 3 |
| The complete-gate receipt's `gated_tree`/`gated_commit` fields as what lets an orchestrator verify a closure without building | `2026-10-15-positive-the-complete-gate-receipt-and-red-green-re-verification-discipline-let-an-orchestrator-verify-6-of-6-closures-without-building-and-the-owner-bounced-0.md` (on trunk) |
| The report-mode census consequent that produced 2 of the 5 REAL RED verdicts counted here (`test/workbench-docs14-performance-benchmark.census.ts:553` reds when `test/workbench-tool-reply-bench.test.ts:291` times out in the same report) | `2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-...md` (branch `origin/machine/flywheel/feedback-2026-10-28`, `663fd8fc`); this file counts the HOLD, not the cause |
| The timing-red register rows the red paths cleared serially (31 of the 58 landing gates here ran a red path) | `2026-10-24-CORROBORATION-docs09-787-red-at-5000-ms-in-8-of-23-landings-315-337-...md` (on trunk) and its 2026-10-23 sibling; not re-counted here |
| The ask for a contributor-facing doc naming the law | the corroborated file, "Asks"; re-armed below, not restated |

## Summary, with numbers

58 of 58 fold-done landings (611-668, contiguous) in the window carry a `landing-gate` row with `verdict: pass` and `furnaceMode: supervised`, and for 58 of 58 `git rev-parse MERGE^{tree}` on the ledger's merge sha equals the row's `gatedTree` (in-row `mergeTree == gatedTree` 58 of 58 too). The 58 landings resolve to 36 distinct merge commits: 23 two-parent singles and 13 octopus merges (7 three-parent, 3 four-parent, 3 five-parent) carrying 35 landings; every one of the 13 is tree-identical and every one of the 36 merge subjects carries "land-prep gate of record under standing rule 22" (36 of 36). The hop's parent is the merge for 58 of 58 (batch members share one hop commit), the merge's first parent equals the row's `base` and the fold-done `baseFrom` for 58 of 58. Five land-prep judge runs in the window ended REAL RED (judge `exitCode 8`, `realReds` 1-3 each): 627, 650, 631 twice (the B631-632 batch probe and the k=1 re-cut), and the B644-647 batch; 0 of the 5 red-judged tips is an ancestor of trunk at `9fdd6d9b` (`git merge-base --is-ancestor` rc 1, 5 of 5; control: landed merge `943b2964` rc 0), 4 of the 5 red trees appear on 0 of 3,618 trunk ancestors at `9fdd6d9b`, and the fifth (`d1c88ab9`, 631's re-cut) appears on exactly 1 — landing 631's merge `a8b70bd4`, a fresh commit gated PASS on that exact tree (`cmd_71879f7dbeab`, M:30340, 15:28:33Z) before the push. 59 `gate-lock-released` rows: 58 of 58 landings have a release naming "landing N" for the landing's bead, released 9-63 s after the hop commit (median 16 s) and never before the landing gate (0 of 58); the 59th (M:29050) parks a stale PASS. 0 of 58 landing-gate rows mention a SPOT pair (armed control: 23 such rows ledger-wide, the last at landing 438), so the earlier file's win 2 is CHANGED, not re-checked. The one ask stays open: `git grep -il -E 'R636|R633|PASS-KEEPS-ENTRY|tree identity' REF -- docs/ AGENTS.md README.md` = 0 files at both `e3022a1` and `9fdd6d9b` (armed: `gate of record` 6 files, `land-prep` 3, `standing rule 22` 1). Findings 1-5 **CONFIRMED** from the object store and the ledger; the load-induced attribution of the five REAL REDs is the producer's ruling text and stays **PLAUSIBLE** here; the 58 PASS gate envelopes themselves were not read (**UNDETERMINED** on their contents, the ledger rows stand in for them).

## Finding 1 — 58 of 58 landed merge commits carry the exact tree the land-prep gate of record gated, 0 differ — **CONFIRMED** (re-derived)

For every `fold-done` row in the window the landed merge's tree, read from the clone's object store, equals the `landing-gate` row's `gatedTree`:

```
$ python3 -I /tmp/fw-c3-derive.py machines/flywheel/ledger/metrics.jsonl rig origin/workbench/implementation-program
LEDGER rows total 33366; non-monotonic utc steps 251; window rows 4378 spanning M:28908..M:33285 (window 2026-10-28T07:56:00Z <= utc < 2026-10-29T07:30:00Z)
fold-done rows 58 over 58 landings (dup landings: none); landing-gate rows 58 over 58 landings (dup: none)
fold-done landing range 611..668 contiguous=True
RESULT: fold-done landings 58; with landing-gate row 58; tree-identical 58; differ 0; no gate row none
in-row mergeTree == gatedTree: 58 of 58
verdicts: {'pass': 58}
furnaceMode: {'supervised': 58}
landingKind: {'test': 56, 'src': 2}
shape: {'merge': 58}
merge is ancestor of hop: 58 of 58; hop is ancestor of origin/workbench/implementation-program: 58 of 58; hop^ == merge: 58 (others, batch members after the first: [])
merge^1 == fold-done.baseFrom: 58 of 58; merge^1 == landing-gate.base: 58 of 58
span: first landing-gate utc 2026-10-28T08:15:10Z (L611) .. last fold-done utc 2026-10-29T07:13:55Z (L668)
```

The per-landing pin (58 lines) is in the Evidence section. The derive run above took the ref name as its trunk argument; its hop-ancestry line was re-checked at the pinned sha (`hop is ancestor of 9fdd6d9b2348: 58 of 58`, in Finding 4's block). What the equality rests on, in the rows' own bytes — the `landing-gate` row for landing 611 (M:28939) and its release row (M:28944), `sed -n '28939p;28944p' machines/flywheel/ledger/metrics.jsonl`:

```
{"kind":"landing-gate","bead":"wb-dcsb","tip":"19aa0ff9ba0acf0e83a4d9cc5f3103c20cb84556","base":"99e1dfd254663c2ba60ebdba8a15ac90fa31934c","mergeTree":"ba7b4616a0de956694ce15be9a604349d9f90c8f","gatedTree":"ba7b4616a0de956694ce15be9a604349d9f90c8f","cmd":"cmd_78bc19767317","verdict":"pass","serialLegRows":"0","holds":"0","furnaceMode":"supervised","furnaceRun":"frn-run-fw-wisp-9f114","furnaceAttempt":"frn-atm-fw-wisp-mfors-1","attemptExit":"0","reds":[],"realReds":[],"steps":"lint=0,typing=0,build=0,test=0,census=0,workbench-shell=0,package-smoke=0","landing":611,"machineGateCmd":"cmd_bd94571eda08","note":"landing 611 wb-dcsb land-prep clean PASS: every step 0, no judge red - reds [] explicit (R770)","stageSeconds":{"setup":18,"gate":607,"judge":0,"rows":0},"utc":"2026-10-28T08:15:10Z","run":"land-prep","gen":"g10","actor":"flywheel"}
{"kind":"gate-lock-released","bead":"wb-dcsb","seat":"orchestrator","reason":"landing 611 folded: merge 943b296 + ledger cf56481 (test; landing 611 wb-dcsb (orchestrator landing under standing rule 22; land-prep gate M:28939 tree ba7b4616a0de956694ce15be9a604349d9f90c8f); after R-B40 (598 try-2 timing clear, fresh PREP))","utc":"2026-10-28T08:15:32Z","run":"orchestrator","gen":"g10","actor":"flywheel"}
```

and trunk's own record of the same landing, `git log -1 --format='%h %s' 943b2964fe82`:

```
943b296 landing 611: wb-dcsb (machine/flywheel/wb-dcsb tip 19aa0ff9b onto trunk 99e1dfd25; land-prep gate of record under standing rule 22)
```

The trunk-side count: of the 36 distinct landed merge commits, 36 of 36 subjects carry the phrase `land-prep gate of record under standing rule 22` (109 merge commits are reachable in the window by `git log 9fdd6d9b --merges --since=2026-10-28T07:56:00Z --until=2026-10-29T07:35:00Z`; the other 73 are branch-side "merge trunk X into machine/flywheel/..." commits, e.g. `2c2b9e6 merge trunk aec4521 into machine/flywheel/wb-km7q.1 (merge-not-rebase, standing rule 4; respin cut #2, landing 664, trunk moved during the cut)`).

**Why it must survive a refactor** (restating the corroborated file's mechanism with this window's shape): the land-prep gate runs on the exact merge commit — for a batch, the exact octopus merge — the push fast-forwards that same commit, the hop commit's parent is that merge, and every member's `fold-done` row points at the one merge sha, so tree identity is one `rev-parse` per landing. Anything that gates a probe tree, re-merges after the gate, or composes the batch after gating loses the equality that makes "0 of 58 differ" a measurement.

## Finding 2 — the law holds under octopus batches (13 merges, 35 landings) and under src-touching landings (2), both outside the corroborated file's scope — **CONFIRMED**

```
merge parent counts over landings: {2: 23, 3: 14, 4: 9, 5: 12}
distinct merge commits 36; parent counts over distinct merges: {2: 23, 3: 7, 4: 3, 5: 3}
octopus merges (parents>=3): 13, landings in them: 35, all tree-identical: True
  batch 618-620 merge 1a68208c862c parents 4 tree d1201645595a gated d1201645595a identical=True
  batch 646-648 merge 445b3178f40d parents 4 tree bfe27239221e gated bfe27239221e identical=True
  batch 623-624 merge 525eae4857c7 parents 3 tree fce91abfb43c gated fce91abfb43c identical=True
  batch 636-639 merge 571f4e472d17 parents 5 tree b6e1ea541f99 gated b6e1ea541f99 identical=True
  batch 667-668 merge 5fae5b3feefc parents 3 tree 33d96aa53b0a gated 33d96aa53b0a identical=True
  batch 621-622 merge 91fe5bfbff38 parents 3 tree dd12ab412ba5 gated dd12ab412ba5 identical=True
  batch 632-635 merge 93e6fe2d2c58 parents 5 tree 1d7ad988f6f3 gated 1d7ad988f6f3 identical=True
  batch 627-629 merge a371ab7586c3 parents 4 tree f7f917572a2a gated f7f917572a2a identical=True
  batch 650-651 merge ac17f4522865 parents 3 tree 30452a443279 gated 30452a443279 identical=True
  batch 644-645 merge afc95186b04b parents 3 tree 1685d5747902 gated 1685d5747902 identical=True
  batch 640-643 merge de2a517ce942 parents 5 tree fa1708fdf810 gated fa1708fdf810 identical=True
  batch 616-617 merge f6f85b936727 parents 3 tree e08eaa3cec08 gated e08eaa3cec08 identical=True
  batch 655-656 merge fe2d5e9810d7 parents 3 tree 721784ac786b gated 721784ac786b identical=True
singles (2 parents): 23, all identical: True
two-parent merges shared by >1 landing: none
  non-test landing 644 wb-4ap.15 merge afc95186b04b tree 1685d5747902 gated 1685d5747902 identical=True parents=3
  non-test landing 646 wb-gwr.2 merge 445b3178f40d tree bfe27239221e gated bfe27239221e identical=True parents=4
```

The batch members' `landing-gate` rows all carry the batch's one `gatedTree` (e.g. M:30397-M:30400 for 632-635, `cmd_38271ad4cd68`, tree `1d7ad988f6f3`), and the `landing-batch-result` rows (28 in the window) record the shape: `(landed, landed)` size 2: 7, size 3: 3, size 4: 3; `(prep, clean)` sizes 2/3/4: 2/2/2; `(prep, composed)` 2/3/4: 5/1/1; `(prep, red-bisect)` size 2: 1 and size 4: 1 (Finding 3). Trunk's own view of one five-parent merge, `git log -1 --format='%h %s' 93e6fe2d2c58`:

```
93e6fe2 landings 632..635: batch B632-635-51f4db4-t1 (4 beads: wb-s8fh .. wb-iwhu .. wb-a6nf .. wb-8ccl; octopus onto trunk 51f4db41d; land-prep gate of record under standing rule 22)
```

The two src landings: `git diff --name-only afc95186b04b^1 afc95186b04b -- src/` lists `src/workbench/collective-event.ts` (1 of 8 paths in that batch's first-parent diff) and `445b3178f40d^1..445b3178f40d` lists `src/workbench/hyperunix-observer.ts` (1 of 10 paths); their `fold-done` rows carry `"landingKind": "src"` and their trees equal the gated trees as above. The parent-count census over every trunk ancestor in the window (`git log 9fdd6d9b23485d9067c92d20df320f491182df91 --since=2026-10-28T07:56:00Z --until=2026-10-29T07:35:00Z --format='%h %P'`): parents=1 81, parents=2 96, parents=3 7, parents=4 3, parents=5 3 — the 13 octopus merges are the only commits with 3 or more parents.

## Finding 3 — the HOLD branch fired 5 times in the window: 0 of 5 red-judged tips reached trunk, 4 of 5 red trees appear on no trunk commit, and the fifth landed only after a fresh PASS gate on that exact tree — **CONFIRMED** (the load-induced attribution of the reds is the producer's ruling text, **PLAUSIBLE**)

Thirty-four kept gate-judge reports dated 2026-10-28/29 sit under `fixtures/landprep-redpath/` — 33 try-1 and one try-2 (`fw-judge-wb-4ap.15.20261028T172843Z.try2.json`, the 644-645 re-cut: `exitCode 0`, `realReds` 0, `identity.tipTree 1685d574...`, the tree that landed); 5 of the 33 try-1 reports carry `realReds` above 0 (0 of the 1 try-2), all five with `exitCode 8`, `route full-rerun`, `needsRuling true`, and `identity.tipTreeMatchesArg == identity.tipTreeMatchesEnvelope == true`:

| landing | report | judged tip / tipTree | realReds | ruling | what landed instead |
|---|---|---|---|---|---|
| 627 wb-t1jc | `fw-judge-wb-t1jc.20261028T124932Z.try1.json`; envelope `envelope-wb-t1jc-cmd_08533cd9be6f.json` (`status: error`, `data.gated_tree f108cf88edba8c7727de7af2ec0c2acc89a8f9c2`, `data.gated_commit d4916f7b55e8e5a777e958111154fc0a530d026c`) | `d4916f7b` / `f108cf88` | 1: `test/workbench-docs14-performance-benchmark.census.ts:553 realAssertions 1`; reds 2 (`tool-reply-bench.test.ts:291` "Test timed out in 60000ms", 0 real) | R-B48 M:29764, `BOUNDARY.md:9525` | try row M:29748 → fresh PREP → `landing-gate` M:29813 `cmd_a28564c1df61` gatedTree `f7f917572a2a` pass 13:14:26Z → `fold-done` M:29880 merge `a371ab7586c3` (4 parents, batch 627-629) |
| 650 wb-3jun | `fw-judge-wb-3jun.20261028T210244Z.try1.json` | `62616955` / `14d6eb65` | 1: the same `docs14:553` consequent; reds 3 (`h2-bead-graph-census.test.ts:2401` 5000 ms, `tool-reply-bench:291` 60000 ms, both 0 real) | R-B57 M:31523, `BOUNDARY.md:9824` | try row M:31499 → `landing-gate` M:31570 `cmd_b14f027c7809` gatedTree `30452a443279` pass 21:28:55Z → `fold-done` M:31598 merge `ac17f4522865` (3 parents, batch 650-651) |
| 631 wb-b9n.2, batch probe | `fw-judge-wb-b9n.2.20261028T141201Z.try1.json` (batch B631-632-7a0ab7f-t1, `landing-batch-result` M:30012 `outcome red-bisect prepRc 8`) | `edaf1e2c` / `b085f26d` | 3: `adversarial-matrix.census.ts:646`, `:666` (1 each), `docs07-provider-rules.census.ts:987 registered entry 46 blob changed`; reds 39 | R-B50 M:30019, `BOUNDARY.md:9559` ("Landing 631 ... is the first instance") | try rows M:30010/M:30011 (`cmd_aef43dc64138`, tree `b085f26de946`) → bisect to k=1 |
| 631 wb-b9n.2, k=1 re-cut | `fw-judge-wb-b9n.2.20261028T144544Z.try1.json` | `14652a4d` / `d1c88ab9` | 3: `adversarial-matrix:646`, `:666`, `subsystem-matrix.census.ts:824` (1 each); reds 47 | R-B50 (in advance) | try row M:30156 (`cmd_4405afeaedb0`, tree `d1c88ab94050`) → `landing-gate` M:30340 `cmd_71879f7dbeab` gatedTree `d1c88ab94050` pass 15:28:33Z → `fold-done` M:30523 merge `a8b70bd4c7bc` (2 parents) |
| 644 wb-4ap.15, batch | `fw-judge-wb-4ap.15.20261028T171815Z.try1.json` (batch B644-647-dab445f-t1, M:30792 `red-bisect prepRc 8`) | `9da72bab` / `226dcea6` | 1: `gp-control-loop-audit.test.ts:168 registered entry 37 blob changed`; reds 5 | R-B54 M:30800 | try rows M:30788-M:30791 (`cmd_d0f3561d29d4`, tree `226dcea6ebeb`) → try 2 M:30840/M:30841 `cmd_246d2c025466` tree `1685d5747902` → `landing-gate` M:30842/M:30845 → merge `afc95186b04b` (644-645); 646-648 recomposed → `cmd_8ceb4b39d700` → merge `445b3178f40d` |

The never-pushed check, run against every ancestor of trunk at the pinned sha (`git log 9fdd6d9b23485d9067c92d20df320f491182df91 --format='%H %T'`, 3,618 commits; the bracketed count repeats it over the 3,632 ancestors of `1ad30c3e`, where the ref stood after it moved mid-derivation), with the armed control on the same instrument:

```
L627 tip d4916f7b55e8 type=commit ancestor-rc=1 tip^{tree}=f108cf88edba (judge tipTree f108cf88edba, equal=yes) trunk-commits-with-tree=0 [at 1ad30c3e: 0]
L650 tip 62616955f8f5 type=commit ancestor-rc=1 tip^{tree}=14d6eb6543bc (judge tipTree 14d6eb6543bc, equal=yes) trunk-commits-with-tree=0 [at 1ad30c3e: 0]
L631a tip edaf1e2c3174 type=commit ancestor-rc=1 tip^{tree}=b085f26de946 (judge tipTree b085f26de946, equal=yes) trunk-commits-with-tree=0 [at 1ad30c3e: 0]
L631b tip 14652a4deebb type=commit ancestor-rc=1 tip^{tree}=d1c88ab94050 (judge tipTree d1c88ab94050, equal=yes) trunk-commits-with-tree=1 a8b70bd4c7bc [at 1ad30c3e: 1]
L644 tip 9da72bab742f type=commit ancestor-rc=1 tip^{tree}=226dcea6ebeb (judge tipTree 226dcea6ebeb, equal=yes) trunk-commits-with-tree=0 [at 1ad30c3e: 0]
=== armed controls: landed merge 943b2964 (L611) and its tree ba7b4616 ===
ancestor-rc=0
trunk-commits-with-tree ba7b4616: 1
```

The fifth row is the instructive one. The red-judged tip `14652a4d` (committed 2026-10-28T14:12:13Z) and the landed merge `a8b70bd4` (committed 15:10:27Z) have the same two parents (`7a0ab7f7` + `89a8c5a0`) and the same tree `d1c88ab9`; the push took the fresh commit after a fresh gate of record passed on that exact tree (M:30340, note: "landing 631 wb-b9n.2; 6 register timeout(s) R705(b), needsRuling false; land-prep-composed row (red path, FW_LANDPREP_COMPOSE_R705B=on)"). So the invariant that held 5 of 5 times is "a tree is pushed only under a PASS gate of record on that tree", not "a tree once judged red never lands" — the second form would have blocked a landing whose reds the ruling classed as load noise. Why the reds were load noise is the producer's reading, quoted from `BOUNDARY.md:9525` and not re-run by me:

> red [2] test/workbench-docs14-performance-benchmark.census.ts:553 AC2 'measure:pi-tool-response-size'/'guard' (1 real assertion) - a report-mode census that judges the default gate's OWN report and asserts every pinned tool-reply-bench case 'collected once, passed and asserting'; with [1] timed out in that report, [2] fails as its consequent (the M:23533 judge class, R-B35 precedent at landing 587). The pre-leg REAL RED rule refused every serial leg because [2] carries a real assertion, so no leg ran.

and from `BOUNDARY.md:9559` (R-B50): "the PASS-held entries stay, the kept worktree is removed, and the loop is relaunched from a fresh copy with the same env when load1 has fallen below 250". The judge's own hold text for 627: `"test/workbench-tool-reply-bench.test.ts:291 not cleared (leg not-run (pre-leg REAL RED: 1 red(s) carry real assertions; no leg runs, nothing is appended))"`. Five landings carry more than one `landing-gate-try` row in the window (41 try rows over 35 landings; 627: 2, 631: 3, 644: 2, 645: 2, 650: 2), and `landing-staged` rows repeat for nine (68 rows over 58 landings; 616, 627, 631 x3, 632, 644-647, 650).

## Finding 4 — PASS-KEEPS-ENTRY custody held 58 of 58 times: every lock release follows the landing gate and the hop commit, and 58 of 58 release reasons name the gate row — **CONFIRMED**; the release-to-fold-row timing is **CHANGED** (108-2,907 s, not "within 1 s"), by construction of the g10.16 POST step

```
$ python3 -I /tmp/fw-c3-fix/fw-c3-custody.py machines/flywheel/ledger/metrics.jsonl rig 9fdd6d9b23485d9067c92d20df320f491182df91
LEDGER rows total 33455; rows without utc 79; non-monotonic steps: utc-or-ts 251, utc-only carry-over 250, utc-only adjacent 249; window rows (by utc) 4378 spanning M:28908..M:33285
fold-done landings 58 (611..668)
landing-gate-try rows in window: 41 over 35 landings; landings with >1 try row: 5 -> {627: 2, 631: 3, 644: 2, 645: 2, 650: 2}
landing-staged rows in window: 68 over 58 landings; landings with >1 staged row: 9 -> {616: 2, 627: 2, 631: 3, 632: 2, 644: 2, 645: 2, 646: 2, 647: 2, 650: 2}
gate-lock-released rows in window: 59
58 landings: release >= hop commit time: 58 of 58; release >= landing-gate row: 58 of 58; release reason names the landing's 40-hex gatedTree: 23 of 58; names the landing-gate row M:n: 58 of 58
hop is ancestor of 9fdd6d9b2348: 58 of 58
release minus hop-commit seconds: min 9.0 median 16.0 max 63.0 (statistics.median over 58 values)
fold-done minus release seconds: min 108.0 median 678.0 max 2907.0 (statistics.median over 58 values; sorted 29th/30th = 672.0/684.0)
  fold-release 29th/30th landings: L613 672.0, L651 684.0; max L641 2907.0; min L665 108.0
L611 gate 08:15:10Z hop-commit 08:15:22Z release 08:15:32Z (M:28944) fold-done 08:25:10Z
L641 gate 16:48:40Z hop-commit 16:51:32Z release 16:52:07Z (M:30689) fold-done 17:40:34Z
L668 gate 07:08:42Z hop-commit 07:09:05Z release 07:09:23Z (M:33258) fold-done 07:13:55Z
```

and `fw-c3-derive.py`'s coverage check over the same rows (the lines that name the 59th row):

```
gate-lock-released rows: 59
landings covered by a release row naming 'landing N' for the landing's bead: 58 of 58
  extra release row M:29050 utc=2026-10-28T08:50:25Z bead=wb-km7q.9 reason=stale PASS at landing 613 (post-sweep-red): parked to state/gate-queue-parked/wb-km7q.9.respin-by-reference-613.json, respin by reference; recipe /tmp/fw-landchain-wb-dkru-L613/stale-pass-candidate.json
```

So the lock outlives the gate (0 of 58 releases before the landing-gate row) and the push (58 of 58 releases after the hop commit, by 9-63 s), which is the custody the rule promises. The earlier file measured releases "within 1 s of their fold" against fold lines; here the `fold-done` row is appended when the POST step (post-fold, fold-duties, sweep) completes, 108-2,907 s after the release (median 678 s by `statistics.median` over the 58 values; the sorted 29th and 30th are 672 s at landing 613 and 684 s at landing 651) — landing 641's 2,907 s is the 632-635 POST hand-resume window (release reason M:30689: "relaunch after the 632-635 POST hand resume (R-B52)"; R-B52 is M:30498, `BOUNDARY.md:9615`, the post-sweep ruling after landing 631 on the stale queued cut `59cf7586` of wb-klr7). The 23 single-landing release reasons name the 40-hex gated tree; the 35 batch-member reasons name the member gate rows instead, e.g. M:30689 `land-prep gate  wb-1ouh:M:30663 wb-tz2.4:M:30666 wb-4ap.14:M:30669 wb-sfgr:M:30672`. The 59th row is the parked stale PASS of wb-km7q.9 at landing 613 (R-B43 M:29052), a different queue cycle, not a custody break on a landed entry — the same shape the earlier file saw in its two `gate-dequeued` rows.

## Finding 5 — the R633 spot-pair leg does not exist in this window (0 of 58, armed control 23 ledger-wide), and the corroborated file's one ask is STILL-OPEN at `9fdd6d9b` (0 docs files; armed controls 6/3/1) — **CONFIRMED** (grep counts)

```
SPOT in window landing-gate rows: 0 of 58; armed control: landing-gate rows anywhere in the ledger with SPOT: 23, first/last M:((9028, None), (21475, 438))
```

Under standing rule 22 the orchestrator lands FIFO itself and the land-prep gate is the gate of record (every release reason: "orchestrator landing under standing rule 22"), so the owner's out-of-band spot probe the earlier file measured 5 of 5 (landings 263, 268, 273, 278, 283) no longer occurs; the last SPOT-annotated `landing-gate` row ledger-wide is landing 438 (M:21475). The re-check verdict is CHANGED, not STILL-TRUE and not FIXED. The ask — "Document the two-leg tree-identity law ... and PASS-KEEPS-ENTRY in a contributor-facing doc in this repository" — re-armed at both pinned shas:

```
[ref e3022a1390d5d7c69e8a928a360ce099776f91bf]
  R636|R633|PASS-KEEPS-ENTRY|tree identity in docs/ AGENTS.md README.md: 0
  armed 'gate of record': 6
  armed 'land-prep': 3
  armed 'standing rule 22': 1
[ref 9fdd6d9b23485d9067c92d20df320f491182df91]
  R636|R633|PASS-KEEPS-ENTRY|tree identity in docs/ AGENTS.md README.md: 0
  armed 'gate of record': 6
  armed 'land-prep': 3
  armed 'standing rule 22': 1
```

The six `gate of record` hits at both shas: `docs/workbench/feature-matrix.md`, `docs/workbench/receipts/wb-752.9.md`, `docs/workbench/receipts/wb-a9l2.8.md`, `docs/workbench/receipts/wb-b9n.2.md`, `docs/workbench/receipts/wb-h8f.6.md`, `docs/workbench/receipts/wb-nl8.3.md` — receipts and a matrix row, not a contributor-facing statement of the law. The corroborated file counted `land-prep` in 2 files at `9357bf4`; 3 now.

## Evidence

Per-landing pin (L bead merge12 tree12 gated12 identical parents gate-cmd landing-gate-row fold-done-row landingKind), the derivation's own output:

```
L611 wb-dcsb 943b2964fe82 ba7b4616a0de ba7b4616a0de T p2 cmd_78bc19767317 M:28939 M:28982 test
L612 wb-0st4 f65d9c93c402 1d27323d6451 1d27323d6451 T p2 cmd_b0842451b8f3 M:28997 M:29018 test
L613 wb-dkru b8f9a015fe09 886ffc623084 886ffc623084 T p2 cmd_41142887e7e7 M:29033 M:29069 test
L614 wb-yght b8abaf74dd5d 7080276ece38 7080276ece38 T p2 cmd_b5b028ea7382 M:29075 M:29102 test
L615 wb-xfkx 83754e2368ed 9e64b30690d8 9e64b30690d8 T p2 cmd_4ab04e0d66f7 M:29171 M:29210 test
L616 wb-jusi f6f85b936727 e08eaa3cec08 e08eaa3cec08 T p3 cmd_5988a14fe224 M:29345 M:29391 test
L617 wb-r63c f6f85b936727 e08eaa3cec08 e08eaa3cec08 T p3 cmd_5988a14fe224 M:29346 M:29398 test
L618 wb-mpmm 1a68208c862c d1201645595a d1201645595a T p4 cmd_acfaf8649ed7 M:29405 M:29436 test
L619 wb-nfhy 1a68208c862c d1201645595a d1201645595a T p4 cmd_acfaf8649ed7 M:29406 M:29441 test
L620 wb-a7w6 1a68208c862c d1201645595a d1201645595a T p4 cmd_acfaf8649ed7 M:29407 M:29448 test
L621 wb-d0dl 91fe5bfbff38 dd12ab412ba5 dd12ab412ba5 T p3 cmd_02ed0f42cdec M:29491 M:29542 test
L622 wb-2xd5 91fe5bfbff38 dd12ab412ba5 dd12ab412ba5 T p3 cmd_02ed0f42cdec M:29494 M:29547 test
L623 wb-0hkv 525eae4857c7 fce91abfb43c fce91abfb43c T p3 cmd_14304743702b M:29554 M:29585 test
L624 wb-shnw 525eae4857c7 fce91abfb43c fce91abfb43c T p3 cmd_14304743702b M:29557 M:29590 test
L625 wb-k2t6 1c9adc57023e 828d100e7b42 828d100e7b42 T p2 cmd_477822ae98a3 M:29623 M:29643 test
L626 wb-vfzd f95273b3569c cc5c1e621790 cc5c1e621790 T p2 cmd_1b0d95790503 M:29683 M:29715 test
L627 wb-t1jc a371ab7586c3 f7f917572a2a f7f917572a2a T p4 cmd_a28564c1df61 M:29813 M:29880 test
L628 wb-50dt a371ab7586c3 f7f917572a2a f7f917572a2a T p4 cmd_a28564c1df61 M:29816 M:29899 test
L629 wb-rqfx a371ab7586c3 f7f917572a2a f7f917572a2a T p4 cmd_a28564c1df61 M:29819 M:29920 test
L630 wb-lhlc c194195ca4da 07fa8dbf5a8c 07fa8dbf5a8c T p2 cmd_bd882b527aa9 M:29916 M:30024 test
L631 wb-b9n.2 a8b70bd4c7bc d1c88ab94050 d1c88ab94050 T p2 cmd_71879f7dbeab M:30340 M:30523 test
L632 wb-s8fh 93e6fe2d2c58 1d7ad988f6f3 1d7ad988f6f3 T p5 cmd_38271ad4cd68 M:30397 M:30559 test
L633 wb-iwhu 93e6fe2d2c58 1d7ad988f6f3 1d7ad988f6f3 T p5 cmd_38271ad4cd68 M:30398 M:30561 test
L634 wb-a6nf 93e6fe2d2c58 1d7ad988f6f3 1d7ad988f6f3 T p5 cmd_38271ad4cd68 M:30399 M:30568 test
L635 wb-8ccl 93e6fe2d2c58 1d7ad988f6f3 1d7ad988f6f3 T p5 cmd_38271ad4cd68 M:30400 M:30576 test
L636 wb-tcak 571f4e472d17 b6e1ea541f99 b6e1ea541f99 T p5 cmd_2587329e0ce7 M:30478 M:30630 test
L637 wb-2cv7 571f4e472d17 b6e1ea541f99 b6e1ea541f99 T p5 cmd_2587329e0ce7 M:30479 M:30638 test
L638 wb-kw2r 571f4e472d17 b6e1ea541f99 b6e1ea541f99 T p5 cmd_2587329e0ce7 M:30480 M:30647 test
L639 wb-n5xs 571f4e472d17 b6e1ea541f99 b6e1ea541f99 T p5 cmd_2587329e0ce7 M:30481 M:30678 test
L640 wb-1ouh de2a517ce942 fa1708fdf810 fa1708fdf810 T p5 cmd_22f7f09d9cef M:30663 M:30749 test
L641 wb-tz2.4 de2a517ce942 fa1708fdf810 fa1708fdf810 T p5 cmd_22f7f09d9cef M:30666 M:30894 test
L642 wb-4ap.14 de2a517ce942 fa1708fdf810 fa1708fdf810 T p5 cmd_22f7f09d9cef M:30669 M:30870 test
L643 wb-sfgr de2a517ce942 fa1708fdf810 fa1708fdf810 T p5 cmd_22f7f09d9cef M:30672 M:30873 test
L644 wb-4ap.15 afc95186b04b 1685d5747902 1685d5747902 T p3 cmd_246d2c025466 M:30842 M:30916 src
L645 wb-2fb4 afc95186b04b 1685d5747902 1685d5747902 T p3 cmd_246d2c025466 M:30845 M:30955 test
L646 wb-gwr.2 445b3178f40d bfe27239221e bfe27239221e T p4 cmd_8ceb4b39d700 M:30933 M:30977 src
L647 wb-4ap.13 445b3178f40d bfe27239221e bfe27239221e T p4 cmd_8ceb4b39d700 M:30934 M:30995 test
L648 wb-0lf.1 445b3178f40d bfe27239221e bfe27239221e T p4 cmd_8ceb4b39d700 M:30935 M:30985 test
L649 wb-1no5 723761e037ec 112b61078708 112b61078708 T p2 cmd_1072d31cc835 M:31241 M:31260 test
L650 wb-3jun ac17f4522865 30452a443279 30452a443279 T p3 cmd_b14f027c7809 M:31570 M:31598 test
L651 wb-tz2.5 ac17f4522865 30452a443279 30452a443279 T p3 cmd_b14f027c7809 M:31573 M:31622 test
L652 wb-e66.2 e5ecd39c6f06 33b40b05dd34 33b40b05dd34 T p2 cmd_337ee0fd1a74 M:32273 M:32296 test
L653 wb-0lf.6 0e6877bb271d 85b8b2c6e83b 85b8b2c6e83b T p2 cmd_3b379ca0506f M:32356 M:32432 test
L654 wb-cppf a6b6ef83c3f2 3142c8870aec 3142c8870aec T p2 cmd_1d966aa3026c M:32396 M:32451 test
L655 wb-e66.4 fe2d5e9810d7 721784ac786b 721784ac786b T p3 cmd_ce2508258939 M:32476 M:32504 test
L656 wb-5esj fe2d5e9810d7 721784ac786b 721784ac786b T p3 cmd_ce2508258939 M:32479 M:32508 test
L657 wb-9clo 3fcac4ef98a5 dcac589e9f93 dcac589e9f93 T p2 cmd_7e9a8ea18bbf M:32526 M:32543 test
L658 wb-0lf.4 d634b6478f9e aa95940ab3c9 aa95940ab3c9 T p2 cmd_d74a8fc51c98 M:32637 M:32678 test
L659 wb-4ap.16 d85f38378689 f9bb3686ce18 f9bb3686ce18 T p2 cmd_ad6476c40e16 M:32667 M:32693 test
L660 wb-e66.1 ef0bc378152b 1ea5299b720c 1ea5299b720c T p2 cmd_1ebbcdc1959a M:32699 M:32710 test
L661 wb-0lf.5 e9f9e49ef53f a910ab8286c4 a910ab8286c4 T p2 cmd_d48fe6aebc8a M:32780 M:32840 test
L662 wb-4ap.12 a2bec26149cf d2fe705599d1 d2fe705599d1 T p2 cmd_8b1e19b8dbb7 M:32829 M:32890 test
L663 wb-0lf.3 9cf5e198c109 a0a055f20d0e a0a055f20d0e T p2 cmd_56d42bf4f987 M:33032 M:33072 test
L664 wb-2j3.10 b19b505c6d9a 2746831ab57f 2746831ab57f T p2 cmd_1b58b705b762 M:33059 M:33085 test
L665 wb-ijf8 b95aff2b57ec 3710c0be2da7 3710c0be2da7 T p2 cmd_aa342441189b M:33169 M:33179 test
L666 wb-b04.1 36eb15e9945f 8f0279ccf6ba 8f0279ccf6ba T p2 cmd_b7e70e73f92b M:33212 M:33234 test
L667 wb-ae7u 5fae5b3feefc 33d96aa53b0a 33d96aa53b0a T p3 cmd_ef7c4187d1cf M:33251 M:33268 test
L668 wb-b04.2 5fae5b3feefc 33d96aa53b0a 33d96aa53b0a T p3 cmd_ef7c4187d1cf M:33252 M:33273 test
```

(12-hex prefixes; the ledger rows hold the 40-hex forms, e.g. landing 627's `gatedTree f7f917572a2ae920702d77a85ffefd2120e41dea`, landing 650's `30452a443279e0416abc6075467a25883d1954d8`, landing 631's `d1c88ab94050f1e797b48b2f8f42f9ad7725db47`.) The red-bisect batch rows:

```
M:30012 landing-batch-result wb-b9n.2 id=B631-632-7a0ab7f-t1 phase=prep outcome=red-bisect size=2 prepRc=8 utc=2026-10-28T14:12:03Z members: wb-b9n.2 L631 cmd_003b67421e60; wb-s8fh L632 cmd_63cea08dc442
M:30792 landing-batch-result wb-4ap.15 id=B644-647-dab445f-t1 phase=prep outcome=red-bisect size=4 prepRc=8 utc=2026-10-28T17:18:15Z members: wb-4ap.15 L644 cmd_af88b64da162; wb-2fb4 L645 cmd_d877dbc825c7; wb-gwr.2 L646 cmd_ab186cf47587; wb-4ap.13 L647 cmd_65883c224c75
```

The red-path shape over the 58 landing gates, for the Win-4 re-check row: 27 notes read `clean PASS`, 31 read `red path` and all 31 carry `needsRuling false` ("N register timeout(s) R705(b)"), `holds` is `"0"` in 58 of 58, `serialLegRows` sum 151; the 28 `ruling-bound` rows in the window (R-B42 .. R-B69) include the five landing stops this file names (R-B46 616 in-surface timing, R-B48 627, R-B50 631, R-B54 644, R-B57 650) — none of them a tree-identity mismatch, and none of the 58 `fold-done` rows records a revert. Trunk tip and ancestry at the fetch: `9fdd6d9b23485d9067c92d20df320f491182df91 2026-10-29 08:08:26 +0000 ledger: close wb-km7q.1 (landing 669, merge 3e63d8b3)`; `9357bf4267252eb91b043dafeb28bf0157838eee 2026-10-23 08:05:21 +0000 ledger: close wb-pfxo.9 (landing 285, merge 42bceef)`.

## Re-check verdicts on the corroborated file

| Claim in the corroborated file (at `9357bf4`) | Verdict at `9fdd6d9b` |
|---|---|
| Win 1 — every landed merge carries the exact tree the gate of record gated (22 of 22, landings 262-283; base == previous hop; hop^ == merge; fold cmd == ledger cmd) | **STILL-TRUE** at n=58 — 58 of 58 trees equal, hop^ == merge 58 of 58, merge^1 == ledger `base` 58 of 58 (Finding 1); **and now also** under 13 octopus merges (35 landings) and 2 src landings (Finding 2). The fold-cmd equality was not re-checked here (fold lines not read; the ledger's `cmd` and the trunk subject were) |
| Win 2 — 5 of 5 R633 spot pairs agreed, asymmetry guard armed and never tripped | **CHANGED** — the leg does not exist in this window: 0 of 58 landing-gate rows mention a spot pair (control 23 ledger-wide, last at landing 438); under standing rule 22 the land-prep gate is the only gate of record and the identity check is machine-side only. The restated claim: one leg, 58 of 58 (Finding 5) |
| Win 3 — PASS-KEEPS-ENTRY custody, lock and entry released only at the fold, 22 of 22, releases within 1 s of the fold and 51 s-6 min 55 s after the landing gate | **STILL-TRUE** on custody — 58 of 58 releases after both the landing gate and the hop commit, 0 before the gate; **CHANGED** on timing — releases sit 9-63 s after the hop commit and 108-2,907 s before the `fold-done` row, because that row now closes POST (Finding 4). The queue-entry dequeue rows were not re-counted (UNDETERMINED for the entry half; the lock half is measured) |
| Win 4 — the red path stayed mechanical (13 of 15 red-path landings with no ruling; 2 under the R705(b) delegation); HOLD branch UNDETERMINED ("no real-assertion red occurred") | Mechanical half **STILL-TRUE** in shape — 31 of 58 gates ran a red path and all 31 carry `needsRuling false` under R705(b) (counts, not per-red re-verification); HOLD branch **CONFIRMED** — fired 5 times, 0 pushes on a REAL RED verdict, every landed tree under its own PASS gate of record (Finding 3) |
| Ask — document the two-leg law and PASS-KEEPS-ENTRY in a contributor-facing doc (`git grep` over `docs/ AGENTS.md README.md` = 0 files at `9357bf4`) | **STILL-OPEN** — 0 files at `e3022a1` and at `9fdd6d9b`, armed controls 6/3/1 (Finding 5) |
| Scope line — "no src-touching landing sat in this set" | **CHANGED** — 2 src landings in this set, both tree-identical (Finding 2) |

## Recommendations, additive to the corroborated file's list

1. The cheapest cure for the open ask is one paragraph where `gate of record` already appears — `docs/workbench/feature-matrix.md` at `9fdd6d9b` (the only non-receipt hit of the six) — stating the one-leg law as this window measured it: the gate of record runs on the exact (octopus) merge commit; the push fast-forwards that commit; the hop's parent is the merge; `gatedTree` in the ledger equals the landed merge's tree; a REAL RED holds the push and a fresh PASS gate of record on the exact tree precedes any later push. Acceptance: `git grep -il -E 'tree identity|gated tree|gate of record' REF -- docs/workbench/feature-matrix.md` prints the file and the paragraph names the merge-commit identity, not only the gate.
2. Machine-side, not an ask on this repository: the landing merge subject is composed by the machine's `bin/land-prep.sh:942` (`K1_SUBJ`, the octopus subject) and `:947` (`git commit-tree "$MT" -p "$HOPF" -p "$TIPF" -m "landing ${LANDING}: $BEAD (machine/flywheel/$BEAD tip ${TIPF:0:9} onto trunk ${HOPF:0:9}; land-prep gate of record under standing rule 22)"`) under `OrchestrationEngineer/machines/flywheel/` — a separate checkout (`dcbf5e73`; `bin/land-prep.sh` last changed `a60102d1`, 2026-10-28T20:50:11Z) — and this repository has no `bin/` at `9fdd6d9b`. Recorded here only because the trunk subject is where a reader without the ledger would look. The note: put the 12-hex gated tree into the landing merge subject beside the phrase that is already there 36 of 36 times (`land-prep gate of record under standing rule 22`), e.g. `... under standing rule 22; gated tree f7f917572a2a)`, so the equality becomes checkable from `git log --format='%s %T'` alone, without the machine ledger. Today the 23 single-landing lock-release reasons carry the 40-hex tree and the 35 batch-member reasons do not (Finding 4); the merge subject is the one place every member shares. Acceptance: for every landing merge, the 12-hex in the subject is a prefix of `%T`.
3. Keep the invariant in the form that held: "push only under a PASS gate of record on this exact tree", not "never push a tree once judged red" — the 631 re-cut shows the difference (Finding 3, fifth row). A refactor that blocklists red trees would have refused a landing the ruling classed as load noise and that a fresh gate passed.

## Positives worth protecting (what worked well)

- The land-prep gate gates the exact commit that gets pushed, including a five-parent octopus merge: 13 of 13 batch merges and 23 of 23 singles tree-identical, one `rev-parse` per landing to prove it. The refactor that would lose it: gating a probe tree, composing the batch after the gate, or re-merging after the gate.
- The gate envelope's `data.gated_tree` and `data.gated_commit` (read here from the refused 627 envelope: `f108cf88...`, `d4916f7b...`) and the judge's `identity` block (`tipTreeMatchesArg` and `tipTreeMatchesEnvelope` true in 5 of 5 red reports) are what let a reader check, after the fact, which tree a verdict was about — including the verdicts that did not land. Making either optional removes the HOLD branch's evidence.
- The pre-leg REAL RED rule held the push 5 of 5 times, and the resumption path always ran a fresh gate of record before pushing (627 and 650 on fresh batch trees; 631 and 644 after bisect or re-cut) — the rows M:29748 → M:29813, M:31499 → M:31570, M:30156 → M:30340, M:30788 → M:30840 are the receipts.
- Per-member `landing-gate` rows all carry the batch's one `gatedTree`, and one hop commit closes every member (hop^ == merge 58 of 58), so a batch is not a weaker record than a single: the same equalities hold per member.
- The lock release names the landing-gate row (`M:n`) in 58 of 58 reasons and follows the hop commit by 9-63 s — custody through the push, legible from the ledger alone.
- The trunk subjects themselves state the gate of record (36 of 36 landed merges), so `git log` on trunk already says which protocol landed each commit; the machine-side note in recommendation 2 only adds the tree.

## What I did not establish

- The 58 PASS gate envelopes (`gate.json` of `cmd_78bc19767317` .. `cmd_ef7c4187d1cf`) were not read; `gatedTree` for the landed gates comes from the `landing-gate` ledger rows and `mergeTree` from the same rows. The one envelope read is the refused 627 one. UNDETERMINED on the envelopes' contents; the missing artifacts are those 58 files.
- Whether the five REAL REDs were load-induced: I quote the rulings (R-B48, R-B50, R-B54, R-B57) and the judge reports' `realAssertions` fields; I did not re-run any serial leg or the bench. PLAUSIBLE.
- The fold-cmd-equals-ledger-cmd check and the "Register blob check" of the fold lines were not re-run; this file reads the ledger rows and trunk, not the fold lines in BOUNDARY.md beyond the four ruling rows quoted.
- Queue-entry dequeue custody (the entry half of PASS-KEEPS-ENTRY): `gate-dequeued` rows (144 in the window) were not joined to landings; only `gate-lock-released` rows were.
- The lock files under `state/` were not read; custody is measured from ledger rows only.
- The parent-count census by `git log --since/--until` depends on commit timestamps, which the branch-side merges set at cut time; the 13-octopus count is confirmed independently from the 36 distinct landed merges.
- Nothing about the fold-duties, post-fold or sweep steps that the `fold-done` row waits on; their refusals in this window (R-B61, R-B62, R-B64, R-B68, R-B69) belong to a sibling file.
- That the law holds beyond this host, this trunk and this window.

## Grades

| Finding | Grade |
|---|---|
| 1 — 58 of 58 landed merge trees equal `gatedTree`, 0 differ; hop^ == merge and merge^1 == base 58 of 58 | **CONFIRMED** (object store + ledger; the derivation output quoted) |
| 2 — holds under 13 octopus merges (35 landings) and 2 src landings | **CONFIRMED** |
| 3 — HOLD branch fired 5 times; 0 of 5 red tips on trunk; 4 of 5 red trees on no trunk commit; the fifth landed under a fresh PASS gate on the exact tree | **CONFIRMED** for the counts and ancestry; the load-induced attribution **PLAUSIBLE** (ruling text, legs not re-run) |
| 4 — custody 58 of 58 (releases after gate and hop; 58 of 58 reasons name the gate row); release-to-fold-row timing CHANGED | **CONFIRMED** on custody; the entry-dequeue half **UNDETERMINED** (rows not joined) |
| 5 — spot-pair leg absent (0 of 58, control 23); ask STILL-OPEN (0 files, controls 6/3/1) | **CONFIRMED** (grep counts with armed controls) |
| The 58 PASS gate envelopes' own `gated_tree` values | **UNDETERMINED** — not read; ledger rows stand in |
