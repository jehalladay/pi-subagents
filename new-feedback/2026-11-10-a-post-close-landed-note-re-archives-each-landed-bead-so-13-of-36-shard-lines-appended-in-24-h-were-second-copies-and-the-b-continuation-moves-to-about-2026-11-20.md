# A post-close LANDED note re-archives each landed bead, so 13 of 36 shard lines appended in 24 h were second copies and the -b continuation moves to about 2026-11-20

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) - the same seat as the corroborated file, a later cycle
**Date:** 2026-11-10 (window: ledger rows with `utc` in [2026-11-09T08:25:00Z, 2026-11-10T08:25:00Z) = M:68738 (08:25:11Z) to M:72032 (08:24:56Z), 3,295 rows; measured 08:45Z to 09:10Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `d00c37429887a6a0bad010983074553b5601e976`, fetched at launch (`git fetch -q origin` rc 0; `git log -1` prints `2026-11-10T08:25:50Z ledger: close wb-7u0r (landing 1083, merge ec7db5e4)`; root tree `9ee10c0a444e68b5b3ddf53f69a9e84ceb7bd297`; `package.json` names `@tintinweb/pi-subagents` `0.20.0`). Source read at that same sha with `git cat-file`, `git grep` and `git ls-tree`: `qa/workbench/tracker-export.mjs` is blob `2bcb1244e1a6`, 78,043 bytes, 1,076 lines, byte-identical to its copy at the corroborated file's pin `b8778933cba36a0be756cdc9172dd74ed040e83d` (`git diff --stat b8778933cb d00c374298 -- qa/workbench/tracker-export.mjs` prints nothing). My rig clone's checked-out HEAD `188ae59016` is 4,826 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`); nothing below was read from the working tree. No `pi` runner, `bd`, `node`, `vitest` or `forge` command ran in this lane.
**`git` revision:** `git version 2.50.1`, the instrument for every byte count, beside `python3 -I` for the shard, receipt and ledger filters.
**Machine side (read-only, cited as producer evidence):** `machines/flywheel/bin/fold.sh` 223 lines, sha256 prefix `68073edd81ae0a95`, and `machines/flywheel/bin/land-chain.sh` 1,449 lines, sha256 prefix `a37f27677642799f`, both byte-identical to the machine repository's HEAD at the measurement, `001fc4760` (09:10Z), and at this file's fix pass, `12dee6da5` (committed 09:16:07Z; the one commit between them touches only `ledger/metrics.jsonl`): `git -C machines/flywheel diff --quiet HEAD -- bin/fold.sh` rc 0 at both, the same for `bin/land-chain.sh`; last commits on the paths `c9268213f` 2026-11-06T13:32:48Z and `a7142d5ec` 2026-11-09T11:16:00Z; the ledger `machines/flywheel/ledger/metrics.jsonl` at 72,124 lines (one line = one `M:<n>` row); receipts under `machines/flywheel/runtime/landchain/fw-landchain-<bead>-L<n>/`. None was edited.
**Method:** read-only re-derivation. `git log --first-parent` over `a70b3578ae^..d00c374298` for the 13 `ledger: close` hop commits L1071-L1083; `git cat-file -s <hop>:.beads/issues.jsonl` and `<hop>:.beads/archive/issues-closed-2026-11.jsonl` at each of the 14 hops L1070-L1083, compared with the 13 `hop-compact.receipt` files by `python3 -I json`; `grep` over the 26 `push-hop.err` / `push-hop.1.err` receipts; `python3 -I` over `git cat-file -p` of the 2026-11 shard at the L1070 hop and at the pin (prefix check, per-line id census, per-hop diff of the 14 consecutive blobs), of the 2026-10 shard at the pin and of the main export at the pin; `git cat-file -p` of `qa/workbench/tracker-export.mjs` and `test/workbench-tracker-export-tracked-layout.test.ts` at the pin; a `kind == "fold-done"` filter over the ledger; `grep -n` over `machines/flywheel/bin/fold.sh` and `land-chain.sh` for the note and close sites. Nothing was written to any store, branch, worktree or receipt; scratch copies of four blobs and the source file sat under `~/.cache/`. Path spelling: no census test path is named here; the one `test/` file cited is the compaction selftest the gate runs.
**Scope:** feedback about operating `pi-subagents`' workbench program as a tool - the landed `qa/workbench/tracker-export.mjs` compact verb, its receipt and the shard layout it writes at every landing hop - not about any workbench bead, not about `bd`, and not about GitHub. The hop and fold mechanism (`land-chain.sh`, `fold.sh`) belongs to the flywheel machine outside this repository; the ordering effect in Finding 4 is routed to the machine and not asked of this repository. Finding 6 is this repository's one in-repo ask.
**Prior art:** on trunk at `d00c374298`, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 41 entries; a filename grep for `landed|re-archiv|rearchiv|second-copy|supersed|shard|archive|copy|copies|duplicate|roundtrip|round-trip|compact|export|issues-jsonl|hop` hits 8 (with and without `-i`), all about landed censuses or readers of the export (the 10-27 census-reads-the-export file, the 11-02 export-readers CORROBORATION and six landing-law, census-judge or guard-site files: 10-22 census-judge, 10-23 r636 landing law, 10-27 CORROBORATION n-37, 10-29 CORROBORATION n-58, 10-31 istypenode guard sites, 11-01 CORROBORATION sibling-census), none about the shard's shape. The union with the five unlanded feedback branches (`machine/flywheel/feedback-2026-11-04` `0bc3d6fd3a`, `-05` `3c806e1d6c`, `-06` `eb67a88ff1`, `-09` `2966416bf2`, `feedback/shift-left-research-engineer-2026-11-07` `5e463083cf`; each `git merge-base --is-ancestor <branch> origin/workbench/implementation-program` rc 1) is 49 distinct entries. `git grep -li -F` over the bodies at all six refs: `LANDED (landing` 0, `superseded cop` 0, `second copy` 0, `latest archived line` 0, `reArchived` 0, `Lock released, queue entry dequeued` 0, `issues-closed-2026-11-b` 1 (the 11-09 file below), `re-archived` 1 (the same file, Evidence: "29 re-archived lines, at most 2 per id", a count with no cause). The mechanism, its cost share and the per-hop composition are new. The scaffold's own ranking named the 10-27 census file, the 11-05 seat-token CORROBORATION and the 11-09 close-stubs CORROBORATION as word-sharing neighbours (shared words `bead`, `note`, `landed`, `close`); each is about a census reading the export, not about the shard. The working tree holds 26 untracked feedback files dated before 11-10 (`git status --porcelain -- new-feedback/`; 19 of them on trunk by name - the rig HEAD is 4,826 commits behind, so they show as untracked - and 7 unlanded, travelling on the 11-04, -05, -06 and -09 branches) and two 2026-11-10 siblings from this run (a Node-pin finding and a `claude-host` positive), none on this theme.
**Corroborates / re-checks:** `2026-11-09-positive-the-compaction-landed-at-1042-with-680108-b-headroom-at-1041-and-17-of-17-hop-receipts-l1043-l1070-read-roundtrip-true-as-the-full-export-passed-104857600-b-at-1054.md` - this seat's file one day earlier, pinned at `b8778933cb`, travelling on `origin/machine/flywheel/feedback-2026-11-09` (`2966416bf2`) and NOT on trunk, so this file takes a plain claim filename and carries the re-check table below instead of a CORROBORATION marker that the strict linter reads as a dangling CORRECTS target wherever the 11-09 file is absent from the directory - the detached delivery worktree cut from trunk, and trunk itself until the 11-09 branch lands (measured: a marked copy of this file lints `0 findings, 0 warnings` rc 0 beside the target on disk and reds `CORRECTS finding ...:11 dangling reference '2026-11-09-positive-...md': no such file` rc 1 without it; `feedback-lint.py` resolves the reference against the file's own directory, not against trunk). The 11-09 file took the same route for the 11-06 file. Verdicts at `d00c374298`: its Finding 4 **STILL-TRUE** at larger n (30 of 30 receipts since L1043), its Finding 6 projection **CHANGED** (about 2 days became about 9.7), its Evidence re-archived count explained. Independent hit: no - the same seat and the same instruments, a later cycle; what this adds is a mechanism, a realized cost and the re-check.
**Delivery:** draft only, uncommitted and unpushed, as assigned. This one file lives under the rig's `new-feedback/`; a later delivery must commit it on `machine/flywheel/feedback-2026-11-10` cut from a detached worktree of `origin/workbench/implementation-program`, docs-only, never checking out or pushing trunk. Gate waiver disclosure for that later commit: docs-only, no forge gate run, no tests run, no hook bypassed. `core.hooksPath` unset (`git config core.hooksPath` rc 1); `.githooks` and `.gitmessage` absent at the ref (`git ls-tree origin/workbench/implementation-program -- .githooks .gitmessage` prints nothing) and in the clone (`ls` rc 2).

## Summary, with numbers

Every landing in the window succeeded: 12 of 12 `fold-done` rows in the window (landings 1071-1082, M:68820 to M:71612) pushed a compacted hop, landing 1083's hop (`d00c374298`, 08:25:50Z, the pin) followed 50 s after the window closed, and no escalation is owed. The positive holds at larger n: 13 of 13 `hop-compact.receipt` files L1071-L1083 read `"sealedUnchanged":true,"roundTrip":true`, their `mainBytes` and `largestShard.bytes` equal the tracked blobs at their hop 13 of 13 times each, 26 of 26 `push-hop*.err` carry `GH001` on the 2026-11 shard (60.29 MB to 63.44 MB) and 0 carry `rejected` - 30 of 30 compacted hops since L1043 round-trip. The new finding is what the shard grew with: of the 36 lines appended to `.beads/archive/issues-closed-2026-11.jsonl` between the L1070 hop (`a70b3578ae`, 363 lines, 63,082,584 B) and the L1083 hop (399 lines, 66,525,891 B), 13 are second copies of an id already in the shard, 1,199,916 of the 3,443,307 B growth (34.8%), and the 13 ids are exactly the beads landed at L1070-L1082; each second copy differs from its first only in `updated_at` and `notes`, the appended text being the machine fold's `LANDED (landing N, ...)` note, written by `fold.sh:192-193` after the close hop that archived the first copy (`land-chain.sh:1166`). The tool is doing what its header documents (`tracker-export.mjs:59-60`, rule C4; the check at `:729`), the round trip needs it, and the cost is a machine ordering effect: at the pin 42 of 399 shard lines (6,615,558 of 66,525,891 B, 9.9%) are superseded copies, against 0 of 903 in the sealed 2026-10 shard. The re-check of my own 11-09 projection is CHANGED: the shard grew 142,395 B/h over 24.18 h, not 785,092 B/h, so the 99,614,720 B ceiling and the `-b` continuation fall around 2026-11-20 (headroom 33,088,829 B = 232 h), not in about 2 days; the orchestrator's R-B735 F7 "~2026-11-18" was the closer estimate. One in-repo ask: the receipt collapses `appended` to a count (`:942`), so no hop can show how many of its appended lines were re-archives; a `reArchived` count is derivable at `:729-746` with no extra read.

## Finding 1 - 13 more hop receipts (L1071-L1083): 13 of 13 read `roundTrip` and `sealedUnchanged` true, 13 of 13 `mainBytes` and 13 of 13 `largestShard.bytes` equal the tracked blobs, 26 of 26 push receipts warn GH001 and 0 are rejected, and no `-b` continuation exists at the pin - **CONFIRMED**

```
$ git fetch -q origin; echo rc=$?
rc=0
$ git rev-parse origin/workbench/implementation-program
d00c37429887a6a0bad010983074553b5601e976
$ git log --first-parent --format='%H %cI %s' a70b3578ae49f67652a19c5861603b7157a9aba1^..d00c37429887a6a0bad010983074553b5601e976 | grep -c ' ledger: close '
14
$ cat machines/flywheel/runtime/landchain/fw-landchain-wb-uqax-L1071/hop-compact.receipt
{"verb":"compact","now":"2026-11-09T08:46:10.236Z","fullBytes":105964640,"mainBytes":2639263,"rows":1357,"stubs":1238,"appended":{"issues-closed-2026-11.jsonl":2},"shards":2,"largestShard":{"name":"issues-closed-2026-11.jsonl","bytes":63213969},"ceiling":99614720,"sealedUnchanged":true,"roundTrip":true}
$ cat machines/flywheel/runtime/landchain/fw-landchain-wb-7u0r-L1083/hop-compact.receipt
{"verb":"compact","now":"2026-11-10T08:25:48.103Z","fullBytes":107401069,"mainBytes":1915784,"rows":1371,"stubs":1260,"appended":{"issues-closed-2026-11.jsonl":2},"shards":2,"largestShard":{"name":"issues-closed-2026-11.jsonl","bytes":66525891},"ceiling":99614720,"sealedUnchanged":true,"roundTrip":true}
$ git cat-file -s b8778933cba36a0be756cdc9172dd74ed040e83d:.beads/issues.jsonl; git cat-file -s b8778933cba36a0be756cdc9172dd74ed040e83d:.beads/archive/issues-closed-2026-11.jsonl
2639263
63213969
$ git cat-file -s d00c37429887a6a0bad010983074553b5601e976:.beads/issues.jsonl; git cat-file -s d00c37429887a6a0bad010983074553b5601e976:.beads/archive/issues-closed-2026-11.jsonl
1915784
66525891
$ git ls-tree -l -r d00c37429887a6a0bad010983074553b5601e976 -- .beads/archive/
100644 blob 9552e4e9e7b970063e3fe5f0f37f4f939d1870cd 46834285	.beads/archive/issues-closed-2026-10.jsonl
100644 blob 1814c8ad10a7db60025e0ab9fd1c17454813509a 66525891	.beads/archive/issues-closed-2026-11.jsonl
$ git cat-file -e d00c37429887a6a0bad010983074553b5601e976:.beads/archive/issues-closed-2026-11-b.jsonl; echo rc=$?
fatal: path '.beads/archive/issues-closed-2026-11-b.jsonl' does not exist in 'd00c37429887a6a0bad010983074553b5601e976'
rc=128
```

The 14 first-parent `ledger: close` commits are the L1070 hop and the 13 hops L1071-L1083 (table in Evidence); 13 receipt directories `fw-landchain-<bead>-L1071` to `-L1083` each hold one `hop-compact.receipt`, and the same loop that printed the two above read all 13 with `json.load`: 13 of 13 `"roundTrip":true`, 13 of 13 `"sealedUnchanged":true`, 13 of 13 `mainBytes` equal to `git cat-file -s <hop>:.beads/issues.jsonl`, 13 of 13 `largestShard.bytes` equal to `git cat-file -s <hop>:.beads/archive/issues-closed-2026-11.jsonl`, `largestShard.name` the 2026-11 shard 13 of 13 times, `appended` naming only that shard 13 of 13 times with counts 2, 3, 8, 3, 2, 2, 3, 2, 3, 2, 2, 2, 2 (sum 36). `fullBytes`, the uncompacted export the hop read, ran 105,964,640 (L1071) to 107,401,069 (L1083); `rows` 1,357 to 1,371; `stubs` 1,238 to 1,260. With the 11-09 file's 17 receipts L1043-L1070 this is 30 of 30 compacted hops reading `roundTrip` true. Push receipts: 13 `push-hop.err` and 13 `push-hop.1.err` (byte-identical pairs 13 of 13 - `land-chain.sh:264-265` adopts an unnumbered first attempt's stderr as `.1.err`), 26 of 26 carry `GH001`, 0 of 26 carry `rejected` or `fatal`; the armed control for that zero, the same `grep -rl rejected` over every `*.err` under the receipt root, finds 6 older files (L881, L930, L994 among them). The remote's shard figure runs 60.29, 60.58, 60.99, 61.17, 61.31, 61.40, 61.86, 62.17, 62.70, 62.89, 63.07, 63.28, 63.44 MB over L1071-L1083, monotone. First and last, verbatim (`cat -A`; trailing spaces are the remote's):

```
$ cat -A machines/flywheel/runtime/landchain/fw-landchain-wb-uqax-L1071/push-hop.err
remote: warning: See https://gh.io/lfs for more information.        $
remote: warning: File .beads/archive/issues-closed-2026-11.jsonl is 60.29 MB; this is larger than GitHub's recommended maximum file size of 50.00 MB        $
remote: warning: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.        $
$ cat -A machines/flywheel/runtime/landchain/fw-landchain-wb-7u0r-L1083/push-hop.err
remote: warning: See https://gh.io/lfs for more information.        $
remote: warning: File .beads/archive/issues-closed-2026-11.jsonl is 63.44 MB; this is larger than GitHub's recommended maximum file size of 50.00 MB        $
remote: warning: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.        $
```

## Finding 2 - re-check of the 11-09 file's Finding 6 projection: the shard grew 142,395 B/h over 24.18 h, 5.5 times slower than the 785,092 B/h it projected, so the ceiling and the `-b` continuation fall around 2026-11-20 - **CHANGED** (the bytes **CONFIRMED**, the date **PLAUSIBLE**)

The 11-09 file's Finding 6 heading ends "the -b continuation opens in about 2 days at the window rate - **PLAUSIBLE**", and its body reads: "The 2026-11 shard grew 52,609,241 -> 63,082,584 B (+10,473,343 B, +56 lines: 307 lines at the L1042 hop, 363 at L1070) between the L1042 hop (18:54:32Z) and the L1070 hop (08:14:57Z), 13.34 h = 785,092 B/h; headroom to the 99,614,720 B soft ceiling at L1070 = 36,532,136 B = 46.5 h = 1.94 d at that rate." Re-derived at the pin:

```
$ git log -1 --format=%cI a70b3578ae49f67652a19c5861603b7157a9aba1; git cat-file -s a70b3578ae49f67652a19c5861603b7157a9aba1:.beads/archive/issues-closed-2026-11.jsonl
2026-11-09T08:14:57Z
63082584
$ git log -1 --format=%cI d00c37429887a6a0bad010983074553b5601e976; git cat-file -s d00c37429887a6a0bad010983074553b5601e976:.beads/archive/issues-closed-2026-11.jsonl
2026-11-10T08:25:50Z
66525891
$ python3 -I -   # the arithmetic, verbatim output
hours 24.1814 growth 3443307 rate 142394.9 B/h  = 3.259 MiB/day
headroom 33088829 B -> 232.4 h = 9.68 d -> 2026-11-20T00:48Z
earlier rate 785092 B/h -> ratio 5.51x; projected at the earlier rate after 24.18 h: 82067199 B
earlier window hours 13.34 growth 10473343 rate 785092 B/h; lines 56 -> 4.20 lines/h, 187024 B/line; this window 36 lines -> 1.49 lines/h, 95647 B/line
without the 13 second copies: growth 2243391 -> rate 92773 B/h -> headroom 14.86 d
```

Old and new side by side: at 785,092 B/h the shard would have stood at 82,067,199 B at the L1083 hop; it stands at 66,525,891 B. The 36 appended lines (363 -> 399, `python3 -I` line count over both blobs) arrived at 1.49 lines/h against 4.20, and averaged 95,647 B against 187,024 B. The landing cadence is the larger factor: 13 landings (13 hops) in 24.18 h, one per 1.86 h, against 28 landing numbers (17 hops, five of them octopus batches) in the 13.34 h of the earlier window. Restated claim: at the window rate the 99,614,720 B ceiling is 232 h = 9.7 days from the pin, so the first `-b` continuation opens around 2026-11-19/20; the orchestrator's R-B735 F7 "~2026-11-18" (quoted in the 11-09 file) was the closer estimate and my "about 2 days" the over-estimate, owned here. The bytes, hops and stamps are CONFIRMED (`git` output above); the date is PLAUSIBLE because it rests on 13 landings in 24 h holding - the earlier window's 28 in 13.34 h shows the cadence moves by a factor of four between days, and the second-copy share (Finding 3) moves with it. Whether the seal-and-continue works on the live shard stays UNDETERMINED until it happens; the artifact is still the first `hop-compact.receipt` whose `appended` names `issues-closed-2026-11-b.jsonl`.

## Finding 3 - mechanism: 13 of the 36 appended lines are second copies of the 13 beads landed at L1070-L1082 (1,199,916 of 3,443,307 B, 34.8%), each differing from its first copy only in `updated_at` and `notes`, the appended text being the fold's LANDED note; every hop L1071-L1083 carried exactly one, the previous landing's bead - **CONFIRMED**

`python3 -I` over `git cat-file -p` of the shard at the L1070 hop and at the pin, verbatim output:

```
L1070 bytes 63082584 lines 363 | L1083 bytes 66525891 lines 399
prefix preserved: True
appended lines 36: first-copy lines 23 (2243391 B), second-copy lines 13 (1199916 B)
second-copy share of growth: 1199916 of 3443307 = 34.8%
second-copy ids in append order: ['wb-zrzn', 'wb-uqax', 'wb-qgyq', 'wb-m2j4', 'wb-nu12', 'wb-ub94', 'wb-vnuv', 'wb-guqa', 'wb-3fop', 'wb-1ht7', 'wb-g464', 'wb-3121', 'wb-7wkb']
--- per second copy: id, bytes, changed fields, notes delta chars, prefix-preserved, closed_at, copy1.updated_at, copy2.updated_at
wb-zrzn 60973 ['notes', 'updated_at'] 386 True 2026-11-09T08:14:43Z 2026-11-09T08:14:43Z 2026-11-09T08:15:14Z
wb-uqax 70800 ['notes', 'updated_at'] 386 True 2026-11-09T08:45:54Z 2026-11-09T08:45:54Z 2026-11-09T08:46:31Z
wb-qgyq 52851 ['notes', 'updated_at'] 386 True 2026-11-09T09:19:37Z 2026-11-09T09:19:37Z 2026-11-09T09:20:08Z
wb-m2j4 64983 ['notes', 'updated_at'] 386 True 2026-11-09T09:54:41Z 2026-11-09T09:54:41Z 2026-11-09T09:55:19Z
wb-nu12 110023 ['notes', 'updated_at'] 386 True 2026-11-09T11:28:38Z 2026-11-09T11:28:38Z 2026-11-09T11:29:09Z
wb-ub94 39982 ['notes', 'updated_at'] 425 True 2026-11-09T12:00:19Z 2026-11-09T12:00:19Z 2026-11-09T12:00:58Z
wb-vnuv 60292 ['notes', 'updated_at'] 386 True 2026-11-09T13:22:01Z 2026-11-09T13:22:01Z 2026-11-09T13:22:35Z
wb-guqa 67716 ['notes', 'updated_at'] 386 True 2026-11-09T13:50:09Z 2026-11-09T13:50:09Z 2026-11-09T13:50:39Z
wb-3fop 254385 ['notes', 'updated_at'] 386 True 2026-11-09T17:13:25Z 2026-11-09T17:13:25Z 2026-11-09T17:14:00Z
wb-1ht7 124439 ['notes', 'updated_at'] 386 True 2026-11-09T20:06:09Z 2026-11-09T20:06:09Z 2026-11-09T20:06:47Z
wb-g464 73337 ['notes', 'updated_at'] 386 True 2026-11-09T22:49:43Z 2026-11-09T22:49:43Z 2026-11-09T22:50:07Z
wb-3121 116761 ['notes', 'updated_at'] 386 True 2026-11-10T00:39:02Z 2026-11-10T00:39:02Z 2026-11-10T00:40:04Z
wb-7wkb 103374 ['notes', 'updated_at'] 386 True 2026-11-10T05:00:11Z 2026-11-10T05:00:11Z 2026-11-10T05:01:40Z
copy bytes min (39982, 'wb-ub94') median 70800 max (254385, 'wb-3fop')
--- wb-7u0r copies at L1083: 1 closed_at ['2026-11-10T08:25:33Z'] updated_at ['2026-11-10T08:25:33Z'] LANDED in notes: [False]
```

The 13 ids are the beads of the 13 `ledger: close` hops L1070-L1082 (Evidence table), in landing order; `wb-7u0r` (L1083) has one copy at the pin, its `updated_at` still equal to its `closed_at`, and will take its second at the next hop unless the ordering changes. In each pair the first copy's `updated_at` equals its `closed_at` (the row as the close hop exported it) and the second's is 24 to 89 s later; the `notes` of the second copy start with the whole `notes` of the first (prefix preserved 13 of 13) and add 386 characters (425 for `wb-ub94`, whose note carries the extra sentence "The merge hop CLOSES the acceptance set."). The appended text for `wb-uqax`, verbatim as `repr`:

```
'\nLANDED (landing 1071, 2026-11-09T08:46:23Z): merge 78abe8e (95b0727 onto a70b357; test: landing 1071 wb-uqax (orchestrator landing under standing rule 22; land-prep gate M:68802 tree 84807646358044f4d7b9ccf598e8f62abcb492ab)) + ledger hop b877893 = trunk tip. Owner gate of record on the exact merge.  Lock released, queue entry dequeued by the orchestrator at the fold (bin/fold.sh).\n'
```

The timeline for that bead, all stamps from the artefacts: `closed_at` 08:45:54Z; the compact receipt's `now` 08:46:10.236Z; the hop `b8778933cb` committed 08:46:13Z carrying the first copy; the note's own stamp 08:46:23Z and the row's `updated_at` 08:46:31Z; the `fold-done` row M:68820 at 08:50:11Z; the second copy entered the shard at the next hop, `360fa73471` (L1072, 09:19:50Z). For `wb-7wkb`: `closed_at` 05:00:11Z, hop `fbbbf67040` 05:00:27Z, `updated_at` 05:01:40Z, M:71612 05:18:32Z, second copy at `d00c374298` (L1083, 08:25:50Z). Per hop, from a diff of the 14 consecutive blobs (each a prefix of the next, 13 of 13):

```
L1071 b8778933cb appended 2: first-copy 1 ['wb-uqax'] second-copy 1 [('wb-zrzn', 60973)]
L1072 360fa73471 appended 3: first-copy 2 ['wb-qgyq', 'wb-0gbh'] second-copy 1 [('wb-uqax', 70800)]
L1073 62eb86875b appended 8: first-copy 7 ['wb-pl64', 'wb-c14o', 'wb-vzhq', 'wb-021.1', 'wb-m2j4', 'wb-u0hl', 'wb-p5oq'] second-copy 1 [('wb-qgyq', 52851)]
L1074 d0cd26c1ac appended 3: first-copy 2 ['wb-nu12', 'wb-0prs'] second-copy 1 [('wb-m2j4', 64983)]
L1075 56915e29bc appended 2: first-copy 1 ['wb-ub94'] second-copy 1 [('wb-nu12', 110023)]
L1076 0461d2f899 appended 2: first-copy 1 ['wb-vnuv'] second-copy 1 [('wb-ub94', 39982)]
L1077 905d0b9560 appended 3: first-copy 2 ['wb-guqa', 'wb-tz2.11'] second-copy 1 [('wb-vnuv', 60292)]
L1078 524c225828 appended 2: first-copy 1 ['wb-3fop'] second-copy 1 [('wb-guqa', 67716)]
L1079 d1b45b4ab3 appended 3: first-copy 2 ['wb-1ht7', 'wb-7ak9'] second-copy 1 [('wb-3fop', 254385)]
L1080 008e25c7eb appended 2: first-copy 1 ['wb-g464'] second-copy 1 [('wb-1ht7', 124439)]
L1081 d35bc9fe95 appended 2: first-copy 1 ['wb-3121'] second-copy 1 [('wb-g464', 73337)]
L1082 fbbbf67040 appended 2: first-copy 1 ['wb-7wkb'] second-copy 1 [('wb-3121', 116761)]
L1083 d00c374298 appended 2: first-copy 1 ['wb-7u0r'] second-copy 1 [('wb-7wkb', 103374)]
totals: first-copy 23 second-copy 13
```

The per-hop `appended` counts agree with the 13 receipts (2, 3, 8, 3, 2, 2, 3, 2, 3, 2, 2, 2, 2), and the 23 first copies match the receipts' `stubs` moving 1,237 (L1070) to 1,260 (L1083): 23 beads closed in the window, 13 of them archived twice.

## Finding 4 - the tool does what its header documents: `tracker-export.mjs:729` appends a closed row whenever its raw line differs from its id's latest archived line, the round trip needs that line to hold the note, and the second copy is a machine ordering effect - the LANDED note is written at `fold.sh:192-193` after the close at `land-chain.sh:1166` and the hop at `:1203` - **CONFIRMED** at the pin; the routing to the machine is this seat's reading

`qa/workbench/tracker-export.mjs` at `d00c374298` (blob `2bcb1244e1a6`):

```
59:  * ... A closed row is appended, by that rule, when no shard holds its id (C3) or its full line differs from its id's
60:  * latest archived line (C4, C4b, C17, R2), and never when it equals it (C6, C17, K1). A shard only ever grows by whole lines at its end
63:  * ... The latest line of an id - the last one, shards in name order - is its body (C4, R2), ...
527: function latestArchived(shards) {
535:       latest.set(archivedId(line, `${name} line ${index + 1}`), line);
691:     latest = latestArchived(shards);
728:     mainLines.push(JSON.stringify(stubOf(line.value)));
729:     if (latest.get(line.id) === line.raw) continue;
745:     appended.set(name, [...(appended.get(name) ?? []), line.id]);
746:     appendLines.set(name, [...(appendLines.get(name) ?? []), line.raw]);
568:     const archived = latest.get(record.id);
569:     if (archived !== undefined) lines[index] = archived;
581: export function rehydrateTrackerText(main, shards) {
582:   return substitute(main, latestArchived(shards));
773:   if (rehydrateTrackerText(main, sorted) !== full) return refuse("round-trip", ["tracker-export: REFUSED the compacted export does not rehydrate to the full export it was cut from; nothing is written"]);
```

Mechanism, read from source and matched by Finding 3's data: `latestArchived` (`:527-538`) maps each id to its last archived line; the compact loop stubs every closed row (`:728`) and skips the archive only when the full export's raw line equals that latest line (`:729`); otherwise the whole line is appended (`:745-746`). After the fold rewrote `updated_at` and `notes`, the full export's line for the bead differs from the archived one, so the next hop appends it whole - 13 of 13 times in the window. Rehydration substitutes each stub with the id's latest archived line (`:568-569`, `:581-582`), and the compaction refuses as `round-trip` when that does not reproduce the full export (`:773`); the full export holds the note, so an exporter that skipped the second copy would fail its own round trip. The rule is therefore sound and pinned: the gate selftest `test/workbench-tracker-export-tracked-layout.test.ts:364` (L8 RE-ARCHIVED ROW, 407 lines at the pin) plants exactly this shape - `:374` `const rewritten: Row = { ...original, updated_at: REWRITTEN_UPDATED_AT, notes: \`${...original.notes...}\nwb-ff3w L8: this row re-archived\` };` - and `forge.toml:9` puts `test` in the gate.

The order that produces the second copy is the machine's, at the current scripts (`land-chain.sh` 1,449 lines, `fold.sh` 223 lines, both clean against the machine repository's HEAD `001fc4760` at the measurement and `12dee6da5` at the fix pass):

```
land-chain.sh:1166:  ok=0; for i in 1 2 3; do BEADS_ACTOR=flywheel timeout 120 bd -C "$STORE" close "$mb" --reason "$REASON" >/dev/null 2>"$D/close.err" && { ok=1; break; } || sleep 15; done
land-chain.sh:1172:  ok=0; for i in 1 2 3; do BEADS_ACTOR=flywheel timeout 120 bd -C "$STORE" export -o "$STORE/.beads/issues.jsonl" >/dev/null 2>"$D/export.err" && { ok=1; break; } || sleep 10; done
land-chain.sh:1193:  node "$HW/qa/workbench/tracker-export.mjs" compact --full "$STORE/.beads/issues.jsonl" --beads "$HW/.beads" > "$D/hop-compact.receipt" || { RC=$?; git -C "$RIG" worktree remove --force "$HW"; die "hop compact rc $RC (receipt $D/hop-compact.receipt; rc 2 = soft ceiling - the wall path needs the hand)" 5; }
land-chain.sh:1203:  push_retry hop "$HOP" "$MERGEF"
land-chain.sh:1238:  bash "$FW/bin/fold.sh" --landing "$LANDING" --bead "$BEAD" --merge "$MERGEF" --hop "$HOPF" --kind auto \
fold.sh:192:         printf 'LANDED (landing %s, %s): merge %s (%s onto %s; %s) + ledger hop %s%s. Owner gate of record on the exact merge%s. %s Lock released, queue entry dequeued by the orchestrator at the fold (bin/fold.sh).\n' "$LANDING" "$NOW" "$M7" "${QCOMMIT:0:7}" "$P7" "$KIND${NOTE:+: $NOTE}" "$H7" "$( [ -n "$STACKED" ] && printf " (trunk tip %s stacked above at fold time)" "${TIP:0:7}" || { [ -n "$BATCH" ] && printf " = trunk tip, shared by %s landings (batch %s, octopus merge %s with %s entry parents)" "$B_K" "$B_ID" "$M7" "$B_K" || printf " = trunk tip"; } )" "${OWNERGATE:+ ($OWNERGATE)}" "$( [ $CLOSE = 1 ] && echo 'The merge hop CLOSES the acceptance set.' || echo '' )" > "$NF"
fold.sh:193:         ok=0; for i in 1 2 3; do BEADS_ACTOR=flywheel timeout 120 bd -C "$STORE" update "$BEAD" --append-notes-file "$NF" >/dev/null 2>&1 && { ok=1; break; } || sleep 15; done
```

Close (`:1166`), export (`:1172`), compact (`:1193`, archiving the first copy), hop push (`:1203`), then the fold (`:1238`) appends the LANDED note (`fold.sh:192-193`) - and the note names the hop sha `%s` (`ledger hop b877893` above), so it cannot be composed before the hop exists. The `close_reason` the stub keeps already names the landing and the merge: `wb-uqax` reads `landing 1071: merge 78abe8e58191 landed on workbench/implementation-program (land-prep gate of record; standing rule 22)` (`land-chain.sh:1165`), and the `fold-done` row M:68820 carries `"merge"`, `"hop"`, `"baseFrom"` and the fold commit, so every fact the note adds to the bead is already on the ledger. Routed to the machine: write the note before the close (dropping the hop sha, which the ledger row holds), fold its remaining text into the close `--reason`, or accept the copy knowingly; none of these is this repository's code. `fold.sh` was last changed 2026-11-06T13:32:48Z (`c9268213f`) and the note shape predates the compaction (L1042), so the cost began the day the shard did.

## Finding 5 - realized cost at the pin: 42 of 399 lines of the 2026-11 shard (6,615,558 of 66,525,891 B, 9.9%) are superseded copies, 42 of 42 by a LANDED note, against 0 of 903 in the sealed 2026-10 shard; per landed bead the copy costs its whole row, 39,982 to 254,385 B, median 70,800 B - **CONFIRMED**

```
L1083: lines 399 distinct ids 357 duplicate lines 42 ids with >1 copy 42 max copies 2
superseded bytes 6615558 = 9.9% of 66525891
--- whole 2026-11 shard at L1083: duplicate-id pairs 42 changed-field signatures {('notes', 'updated_at'): 42} second copies whose appended note carries 'LANDED (landing': 42
2026-10 shard: bytes 46834285 lines 903 distinct ids 903 superseded lines 0
```

The 11-09 file counted "29 re-archived lines, at most 2 per id" at L1070 without a cause; 29 + 13 = 42 at the pin, 42 of 42 with the `('notes', 'updated_at')` signature and a `LANDED (landing` note, so the cause above accounts for every superseded line in the shard. The 2026-10 shard - sealed before the first LANDED note could follow a compacted hop (the compaction landed at L1042 on 2026-11-08) - holds 0. The cost per bead is the whole row because a shard line is the full closed bead with its notes: the 13 window copies span 39,982 B (`wb-ub94`) to 254,385 B (`wb-3fop`), median 70,800 B (`wb-uqax`), 1,199,916 B in all; without them the window's growth would have been 2,243,391 B (92,773 B/h) and the headroom about 14.9 days instead of 9.7 (Finding 2 output). The cost is bytes toward the 99,614,720 B ceiling and the GH001 line on every push; nothing about correctness - the round trip holds with the copy, and the latest line is the right body.

## Finding 6 - in-repo ask: the receipt collapses `appended` id lists to counts (`:942`), so no hop can show how many of its appended lines were re-archives; a `reArchived` count is derivable at `:729-746` with no extra read - **CONFIRMED** (source at the pin); the 11-09 positive on the receipt keys **STILL-TRUE**

```
934:   out(
935:     `${JSON.stringify({
936:       verb: "compact",
937:       now: stamp,
938:       fullBytes: Buffer.byteLength(fullText),
939:       mainBytes: Buffer.byteLength(result.main),
940:       rows: result.rows,
941:       stubs: result.stubs,
942:       appended: Object.fromEntries([...result.appended].map(([name, ids]) => [name, ids.length])),
943:       shards: result.shards.size,
944:       largestShard: largest ?? null,
945:       ceiling: ceiling.bytes,
946:       sealedUnchanged: true,
947:       roundTrip: true,
948:     })}\n`,
949:   );
```

`result.appended` holds the ids (`:745`, `:774`); the receipt prints `ids.length` (`:942`). So the L1072 receipt reads `"appended":{"issues-closed-2026-11.jsonl":3}` and nothing in it says that one of the three is `wb-uqax` archived for the second time; Finding 3 needed a diff of consecutive blobs to see it. At `:729` the loop already knows whether `latest.has(line.id)` when it decides to append, so a per-shard `reArchived` count (or the ids) costs no extra read and would have made this file a `grep` over 13 receipts. The receipt's twelve keys - `verb, now, fullBytes, mainBytes, rows, stubs, appended, shards, largestShard, ceiling, sealedUnchanged, roundTrip` - are unchanged at the pin (`:934-947`) and 13 of 13 receipts parse with `json.load`, so the 11-09 file's positive "the receipt is one JSON line on stdout with stable keys the machine quotes" is STILL-TRUE; the ask is additive.

## Re-check verdicts on the 11-09 file (pinned at `b8778933cb`) at `d00c374298`

| Claim in the 11-09 file | Verdict at `d00c374298` |
|---|---|
| F1 - the wall was reached, not crossed: 104,177,492 B at the L1041 hop, 0 of 1,032 trunk export blobs at or over 104,857,600 B | **UNDETERMINED** - the per-commit `cat-file -s` sweep was not repeated; the artifact is that sweep over the 1,044 first-parent path commits at the pin (`git log --first-parent --format=%H d00c374298 -- .beads/issues.jsonl | wc -l`) |
| F2 - 1,238 of 1,238 closed rows of the main export are stub-shaped | **STILL-TRUE, extended** - at the pin 1,260 of 1,260 closed rows hold only `STUB_FIELDS` keys (1,371 rows: closed 1,260, open 87, in_progress 20, blocked 3, deferred 1; `python3 -I` over `git cat-file -p d00c374298:.beads/issues.jsonl`) |
| F3 - the round trip is a refusal before the first write (`:773` before `:930-932`) | **STILL-TRUE** - `tracker-export.mjs` is byte-identical at the two pins (`git diff --stat` prints nothing); lines `:772-774`, `:917-919`, `:930-932` re-read |
| F4 - 17 of 17 receipts L1043-L1070 read `roundTrip` true and `mainBytes` equal the blob | **STILL-TRUE at larger n** - 13 of 13 L1071-L1083 (Finding 1), 30 of 30 since L1043 |
| F5 - 13 h 45 min 19 s of held passes under R-B714/716/718 before the cure | **UNDETERMINED** - historical ledger rows not re-read this cycle; the rows M:64992, M:65089, M:65173, M:66547 are the artifact |
| F6 - GH001 persists on the shard, 0 of 18 rejected | **STILL-TRUE** - 26 of 26 `push-hop*.err` L1071-L1083 warn GH001 on the shard, 0 rejected (Finding 1) |
| F6 - the `-b` continuation opens in about 2 days at the window rate (PLAUSIBLE) | **CHANGED** - 142,395 B/h, about 9.7 days, around 2026-11-20 (Finding 2); no `-b` file at the pin (`cat-file -e` rc 128) |
| F7 - 0 of 3 operator docs name the compacted shape | **STILL-TRUE** - at the pin `git grep -c -i -E 'issues-closed|\.beads/archive|stub row|trackerExportText|compact'` is 0 for `AGENTS.md` and `.beads/README.md`; the 1 hit in `docs/workbench/15-implementation-program.md` is `:68` "compact bounded result and ACL", the word `compact` in another sense, and `:7` still reads "The in-repo Beads ledger (`.beads/issues.jsonl`, live local Dolt in `.beads/`)"; `AGENTS.md:191` and `:248` still read "`.beads/issues.jsonl` is a passive export" |
| Routed (a) - `guard` and `pre-push` have 0 production callers | **STILL-TRUE** - `grep -rn -E 'tracker-export[^ ]* +(guard|pre-push)' machines/flywheel/bin ~/.local/bin` 0 lines; the armed control for `compact` finds `land-chain.sh:1193` (moved from `:1191` by `a7142d5ec`) |
| Routed (b) - hop subjects and `fold-done` rows carry no receipt figure | **STILL-TRUE** - 13 of 13 `ledger: close` subjects L1071-L1083 are the bare `(landing N, merge X)` form, 0 carry `roundTrip`, `mainBytes` or `fullBytes` |
| F8 - the eight re-check rows on the 11-06 file | **UNDETERMINED** - not re-derived; nothing here depends on them |
| Positive - the 2026-10 shard is byte-stable (blob `9552e4e9`, 46,834,285 B, 903 lines, 903 ids) | **STILL-TRUE** - the same blob and figures at the pin, 13 hops later, 0 superseded lines |
| Positive - the receipt keys the machine quotes | **STILL-TRUE** - `:934-947` unchanged (Finding 6) |

## Evidence

Hop table - landing, bead, `fold-done` row (the ledger row's `utc`), hop sha (10), the hop's committer date, the tracked main export blob and the 2026-11 shard blob (`git cat-file -s`), both equal to the receipt's `mainBytes` and `largestShard.bytes` at every hop, and the receipt's `appended` count split by the per-hop blob diff:

| landing | bead | fold-done row (utc) | hop | committer date | main blob | shard blob | appended = first + second |
|---|---|---|---|---|---|---|---|
| 1070 | wb-zrzn | M:68715 (08:19:43Z) | a70b3578ae | 2026-11-09T08:14:57Z | 2647112 | 63082584 | (the 11-09 file's last hop) |
| 1071 | wb-uqax | M:68820 (08:50:11Z) | b8778933cb | 2026-11-09T08:46:13Z | 2639263 | 63213969 | 2 = 1 + 1 (wb-zrzn) |
| 1072 | wb-qgyq | M:68910 (09:22:45Z) | 360fa73471 | 2026-11-09T09:19:50Z | 2440202 | 63526058 | 3 = 2 + 1 (wb-uqax) |
| 1073 | wb-m2j4 | M:69033 (09:58:36Z) | 62eb86875b | 2026-11-09T09:54:58Z | 2147212 | 63950108 | 8 = 7 + 1 (wb-qgyq) |
| 1074 | wb-nu12 | M:69207 (11:41:13Z) | d0cd26c1ac | 2026-11-09T11:28:49Z | 2176784 | 64136652 | 3 = 2 + 1 (wb-m2j4) |
| 1075 | wb-ub94 | M:69303 (12:03:46Z) | 56915e29bc | 2026-11-09T12:00:36Z | 2201732 | 64286230 | 2 = 1 + 1 (wb-nu12) |
| 1076 | wb-vnuv | M:69526 (13:26:20Z) | 0461d2f899 | 2026-11-09T13:22:18Z | 2283675 | 64386116 | 2 = 1 + 1 (wb-ub94) |
| 1077 | wb-guqa | M:69597 (13:54:29Z) | 905d0b9560 | 2026-11-09T13:50:21Z | 1946443 | 64865920 | 3 = 2 + 1 (wb-vnuv) |
| 1078 | wb-3fop | M:69925 (17:16:37Z) | 524c225828 | 2026-11-09T17:13:38Z | 1955708 | 65187633 | 2 = 1 + 1 (wb-guqa) |
| 1079 | wb-1ht7 | M:70344 (20:24:53Z) | d1b45b4ab3 | 2026-11-09T20:06:22Z | 1795239 | 65744465 | 3 = 2 + 1 (wb-3fop) |
| 1080 | wb-g464 | M:70674 (22:52:47Z) | 008e25c7eb | 2026-11-09T22:49:54Z | 1870302 | 65941853 | 2 = 1 + 1 (wb-1ht7) |
| 1081 | wb-3121 | M:70923 (00:43:41Z) | d35bc9fe95 | 2026-11-10T00:39:38Z | 1809108 | 66131563 | 2 = 1 + 1 (wb-g464) |
| 1082 | wb-7wkb | M:71612 (05:18:32Z) | fbbbf67040 | 2026-11-10T05:00:27Z | 1854052 | 66351310 | 2 = 1 + 1 (wb-3121) |
| 1083 (after the 08:25Z stamp) | wb-7u0r | M:72054 (08:35:33Z) | d00c374298 | 2026-11-10T08:25:50Z | 1915784 | 66525891 | 2 = 1 + 1 (wb-7wkb) |

Ledger scope: 3,295 rows carry a `utc` inside the window, M:68738 to M:72032; `kind` census leads with `store-idle` 1,678, `daemon-liveness` 276, `correction` 241, `host-sample` 227, `gate-stage` 73, `run-start` 50; `fold-done` 12 (L1071-L1082; L1083's M:72054 at 08:35:33Z falls after the stamp and is reported as drift, the way the 11-09 file reported L1071). Ledger rows quoted or cited: M:68715, M:68820 (raw row bytes, the three keys adjacent: `"merge":"78abe8e5819145bf561758cf80847ec920079ac8","hop":"b8778933cba36a0be756cdc9172dd74ed040e83d","baseFrom":"a70b3578ae49f67652a19c5861603b7157a9aba1"`), M:68910, M:69033, M:69207, M:69303, M:69526, M:69597, M:69925, M:70344, M:70674, M:70923, M:71612 (raw row bytes, elisions marked: `"duties":{"rc":7,"refusals":[],"unhandled":[{"fid":"F2",` ... `"mode":"automated with remainder; remainder executed by hand (fold-duties dry+execute rc=7 reviewed;` ..., `mode` the tenth of the fourteen `duties` keys; the window's one post-fold rc 7), M:72054. The 11-09 file's text quoted above: its Finding 6 heading and body (lines 125-140 of that file at `2966416bf2`), its Finding 2 Evidence sentence "363 lines over 334 distinct ids at L1070 (29 re-archived lines, at most 2 per id), 365 over 335 at L1071" (line 68), and its fix 4 "the 2026-11 shard grows 785,092 B/h over 13.34 h and reaches the ceiling in about 2 days at that rate". Receipt-side files read: 13 `hop-compact.receipt`, 13 `push-hop.err`, 13 `push-hop.1.err`, 13 `hop.sha` (each equal to the first-parent `ledger: close` commit of its landing, 13 of 13). Scratch copies: the four blobs (the 2026-11 shard at L1070 and at the pin, the 2026-10 shard and the main export, 63,082,584 / 66,525,891 / 46,834,285 / 1,915,784 B) and `tracker-export.mjs` under `~/.cache/fw-feedback-1110/` (sha256 prefix of the source copy `40c7e936d7e8a723`, matching blob `2bcb1244e1a6`).

## Suggested fixes, cheapest first

1. **Write the LANDED note before the close hop, or stop writing it** (machine side, routed out; cost: moving `fold.sh:192-193` ahead of `land-chain.sh:1166`, minus the hop sha the note names, or deleting step 9 of the fold). Every fact the note carries is already on the ledger's `fold-done` row (`merge`, `hop`, `baseFrom`, the fold commit) and the landing and merge are in the bead's `close_reason`, which the stub keeps; the row's second archive is the only thing the note buys in the tracked export. One change saves a median 70,800 B per landing - 1,199,916 B of this window's 3,443,307 B - and moves the first `-b` seal from about 9.7 to about 14.9 days at this cadence.
2. **A `reArchived` count in the compact receipt** (this repository; Finding 6; cost: one counter in the loop at `:729-746` and one key at `:942`, no extra read): `appended` already distinguishes shards; a per-shard `{ appended: n, reArchived: k }` or a top-level `reArchived` makes the share Finding 3 measured a `grep` over receipts, and lets the machine's fold-done row carry it if fix 1 of the 11-09 file lands. Keep the existing twelve keys as they are (Positives).
3. **One sentence in the module header** (this repository; cost: text at `:59-60`): the C4 rule is stated; a clause saying that a note appended after a close archives the whole row again would tell the next operator why the live shard's line count outruns its id count (399 over 357 at the pin) without this file.
4. **Decide the shard period with the measured rate, not the projected one** (owner question, no code; the 11-09 file's fix 4 re-weighted): at 142,395 B/h the 2026-11 shard seals around 2026-11-20, and a `-b` continuation opened then would take about 29 days to fill (99,614,720 B at 142,395 B/h = 700 h), so the month boundary comes first - the period is the UTC close month (`:65-66`) and December's closes open `issues-closed-2026-12.jsonl`; with fix 1 the seal moves to about 2026-11-25 (33,088,829 B at 92,773 B/h), still inside the month. The receipt's `largestShard` field remains the instrument; the measured rate moved by a factor of 5.5 between two consecutive days, so the decision wants a week of `largestShard` readings, not one.

## Positives worth protecting

- **The C4 rule is sound and the round trip depends on it** - `:729` appends whenever the raw line differs from the id's latest archived line, `:568-569` substitutes the stub with that latest line, and `:773` refuses when the result is not the full export. A refactor that skipped a "duplicate" id at `:729` to save bytes would make the rehydrated export miss the LANDED note and refuse every hop after a fold; the saving belongs in the writer's ordering (fix 1), never in the compaction.
- **The L8 RE-ARCHIVED ROW selftest pins exactly the production shape** - `test/workbench-tracker-export-tracked-layout.test.ts:364-375` rewrites `updated_at` and `notes` of a tracked archived row, plants it as a continuation and asserts that the id's last archived line and `trackerExportText`'s line are the rewritten one, under the gate's `test` step (`forge.toml:9`). The 42 production pairs at the pin carry that same `('notes', 'updated_at')` signature 42 of 42 times. Keep L8 whatever fix 1 does on the machine.
- **A shard grows only by whole lines at its end, on the live data too** - 13 of 13 consecutive blobs L1070-L1083 are a prefix of the next (`b.startswith(a)` True 13 of 13), as the header claims for the CLI (K13, `:61-62`). That is what made the per-hop diff in Finding 3 possible from `git` objects alone, and what keeps `latestArchived`'s "last one wins" (`:521`) meaningful; an in-place rewrite of a superseded line would break both.
- **The receipt still has one line and twelve stable keys** - `:934-947` unchanged between the two pins; 13 of 13 receipts parse, `mainBytes` and `largestShard.bytes` equal the blobs 13 of 13 times. Fix 2 adds a key; renaming or removing one would break `> "$D/hop-compact.receipt"` consumers silently.
- **The sealed shard stays sealed** - `issues-closed-2026-10.jsonl` is blob `9552e4e9`, 46,834,285 B, 903 lines over 903 ids at the pin, 0 superseded; `refuse("sealed", ...)` at `:757-762` and the L6 pin keep it so, and the 42 second copies all went to the open month's shard.
- **The round trip and ceiling refusals sit before the first write** (the 11-09 file's first positive) - STILL-TRUE by byte identity of the source; 30 of 30 receipts since L1043 read `roundTrip` true because the printing branch is unreachable from a refused result.
- **The hop is fail-closed on the compactor and stages the archive by name** - `land-chain.sh:1193` dies 5 on a nonzero compact; 13 of 13 hops took that path and each hop commit carries exactly the receipt's bytes.

## What I did not establish

- No `compact`, `rehydrate` or `guard` run was exercised; the mechanism in Finding 4 rests on reading `tracker-export.mjs:527-538`, `:568-582`, `:728-746` and `:773` at the pin and on the data of Finding 3 matching it 13 of 13 times, not on a planted re-run. The artifact that would settle it directly: one `compact` over a scratch copy of the export where a closed bead's `notes` were appended after its first archive, with its receipt.
- Whether fix 1 is acceptable to the machine's owner - the note is a bead-side record of the landing that the ledger duplicates; I did not read the standing rules that mandate it (`state/standing-rules.md` was not opened), so "stop writing it" is an option, not a recommendation.
- The LANDED note's effect on readers of bead notes other than the shard (gate censuses that parse notes; the 10-27 and 11-05 files) was not examined; nothing here depends on it.
- The 11-09 file's F1, F5 and F8 were not re-derived (table above); the artifacts are named there.
- Whether the first seal-and-continue works on the live shard; the first receipt whose `appended` names `issues-closed-2026-11-b.jsonl` is the artifact. The 2026-11-20 estimate assumes 13 landings per 24 h and this window's bytes per line hold; the previous day ran four times faster.
- The `fullBytes` series is read from receipts the machine wrote; I did not read the store's export file (the owner's store checkout was not touched) and so did not independently size the uncompacted export.
- `push-hop.1.err` equals `push-hop.err` 13 of 13 times here; whether any hop in the window needed a second push attempt was not checked beyond that equality (no `push-hop.2.err` exists in the 13 directories).
- No `pi` invocation, gate, test, `bd`, `node`, `vitest` or `forge` command ran in this lane; the owner's store checkout and every live land-/gate- worktree were left unread; no branch, worktree, receipt or ledger row was written.

## Postscript - one instrument misprint caught before it became a claim

The per-hop diff script's first line printed "L1070 lines 125226": inside a quoted heredoc the byte string `b'\\n'` counted the two-character sequence backslash-n in the notes, not newlines. The line counts carried above (363 at L1070, 399 at the pin) come from the earlier census script, whose `split(b'\n')` was written outside that quoting, and the per-hop rows do not use the misprinted figure. Recorded so the next seat does not trust a line count from a nested heredoc without a control.
