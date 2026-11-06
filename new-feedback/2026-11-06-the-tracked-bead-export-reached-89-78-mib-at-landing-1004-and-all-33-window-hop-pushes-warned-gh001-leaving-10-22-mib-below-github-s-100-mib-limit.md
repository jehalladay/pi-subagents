# The tracked bead export reached 89.78 MiB at landing 1004 and all 33 window hop pushes warned GH001, leaving 10.22 MiB below GitHub's 100 MiB limit

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-11-06 (window rows with `utc` in [2026-11-05T07:52:00Z, 2026-11-06T07:53:00Z), including the full closing 07:52 minute; originally measured 07:55Z–08:45Z; correction re-checked 2026-11-06)
**`pi-subagents` revision:** operational pin as assigned: trunk `origin/workbench/implementation-program` at `c4e8f8264511b53d1ad93f67dc0901eedbe5355a`, fetched at launch (`git fetch -q origin` rc 0; `git log -1` prints `2026-11-06T06:55:01Z ledger: close wb-x4ph (landing 1004, merge 63a1e5e0)`). Source read at that same sha: root tree `1510b348a4e24af07d05f1cd085ebcc58897db33`, `src` tree `0861eafe72fc4617fab6c0b88b4daff1981e9940`, `package.json` names `@tintinweb/pi-subagents` `0.20.0`. No installed extension build sha was established: the `pi` runner on PATH (`/home/jehallad/.local/bin/pi` → `/local/home/jehallad/.pi/agent/bin/pi`) prints `1.2.0` and did not run in this lane. My rig clone's checked-out HEAD `188ae5901612801d87cc482c5e7851910eb82a1d` sits 4,240 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`); nothing below was read from the working tree.
**`bd` revision:** `bd version 1.1.0-rc.1 (8467bf047) db-schema-max=v59` — the exporter every hop runs (`bd -C "$STORE" export -o …`).
**`git` revision:** `git version 2.50.1` — the pusher.
**Method:** read-only re-derivation; nothing was written to any store, branch or worktree. `git cat-file -s`, `git cat-file --batch-check` and `git log --format … -- .beads/issues.jsonl` over the fetched ref in my rig clone; `python3 -I` filters over the machine ledger `machines/flywheel/ledger/metrics.jsonl` (one line = one `M:<n>` row) and over the 33 in-window `fold-done` rows' receipt directories `machines/flywheel/runtime/landchain/fw-landchain-<bead>-L<landing>/`; one time-boxed `git ls-remote origin` with a positive control; one fetch of the GitHub large-files documentation page; `bd export --help` and `bd --version`. The machine's `bin/land-chain.sh` (sha256 prefix `2093d8dbbbb57673`, 1,416 lines) and `bin/push-stderr-classify.py` were read for the mechanism and not edited. Every number below comes from these runs.
**Scope:** feedback about operating `pi-subagents`' workbench program as a tool — specifically the tracked `.beads/issues.jsonl` export that every landing hop commits to `workbench/implementation-program` and pushes to GitHub — not about any workbench bead, not about `bd` (the exporter did what it was asked, 33 of 33 times) and not about GitHub (which enforces a limit it documents). The hop mechanism lives in the flywheel machine's `land-chain.sh`, outside this repository; it is cited because it is how the repository is operated today.
**Prior art:** none on the export's size, the GH001 warning or the 100 MiB block. Checked at the fetched ref: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 41 entries; a filename grep for `export|jsonl|issues|gh001|mib|large-file|lfs|size|github|push|hop|blob|limit|headroom|outage|commit_refs|retry` hits 3 (the 10-20 AGENTS.md push-clause file, the 10-27 census-reads-the-export file and the 11-02 export-readers CORROBORATION); `git grep -li` over the 41 bodies for `GH001`, `Large files detected`, `100 MiB`, `50 MiB`, `git-lfs`, `recommended maximum file size`, `cat-file -s` and `MiB` hits 0 each (armed control: `issues.jsonl` hits 15 of 41). The nearest files, `2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md` and `2026-11-02-CORROBORATION-export-readers-grew-83-of-475-to-141-of-545-in-6-days-a-landed-census-reads-the-installed-tree-and-41-of-41-sweeps-say-unflagged-red-none.md`, report test coupling to the export's content; this file reports the tracked blob's size against the transport's limit, so it is a new finding that links to them rather than a corroboration. Also enumerated: `bd export --help` at `1.1.0-rc.1` lists no status or age filter (flags: `--all`, `--include-infra`, `--include-memories`, `-o`, `--scrub`).

## Summary, with numbers

Every landing in the window succeeded; nothing was blocked and no escalation is owed. The finding is a measured ceiling that the program's hop convention is approaching. At the fetched trunk tip `c4e8f826` (landing 1004) the tracked `.beads/issues.jsonl` blob is 94,137,051 bytes (89.78 MiB). All 33 of 33 `fold-done` landings in the window (L972–L1004, ledger rows M:58339–M:60535) pushed a hop commit whose preserved `push-hop.err` carries GitHub's `warning: GH001: Large files detected`; 0 of 33 carry `rejected`, `fatal` or `commit_refs`. Across those 33 hops the export grew 3,758,143 bytes in 82,206 s (3.77 MiB/day by the endpoints, 3.57 MiB/day by least squares, 117,442 bytes per hop on average), and since the first blob at or above 50 MiB (landing 725, 2026-10-30T23:42:02Z) it grew 41,669,884 bytes in 6.30 days (6.31 MiB/day). GitHub documents that it "blocks files larger than 100 MiB"; the headroom at landing 1004 is 104,857,600 − 94,137,051 = 10,720,549 bytes (10.22 MiB), which those three rates spend in 1.62, 2.71 and 2.86 days respectively, counted from 2026-11-06T06:55:01Z — a conditional projection, not a deadline. The bytes are accumulation, not one giant record: 1,166 closed issues of 1,299 hold 90,867,507 of 94,137,051 line bytes (96.5%), the `notes` field holds 90,097,555 characters (95.7% of line bytes) and the largest line is 768,264 bytes (`wb-hk9l`; 0 of 1,299 lines exceed 1 MiB). A cost already paid: each of the 33 hop blobs sits in my rig clone's object store as a loose, undeltified object of 36,228,515–37,699,086 bytes, 1,161.6 MiB for the window (33 of 33 loose; the clone's shared store originally reported 6,452 loose objects, 1.53 GiB, a moving point-in-time snapshot). At the block, the hop step would refuse after the merge is already on trunk (the landing order is merge push, close, export, hop push), so the cheapest fix is a size preflight before the merge push and the structural one is an export shape that the 180 of 560 test files naming `issues.jsonl` at the pin can still read.

## Finding 1 — the tracked export blob at the fetched trunk tip is 94,137,051 bytes (89.78 MiB) — **CONFIRMED**

```
$ git fetch -q origin; echo rc=$?
rc=0
$ git rev-parse origin/workbench/implementation-program
c4e8f8264511b53d1ad93f67dc0901eedbe5355a
$ git ls-tree c4e8f8264511b53d1ad93f67dc0901eedbe5355a -- .beads/
100644 blob f7738583fca749237af124df35e0d8182a4a038d	.beads/.gitignore
100644 blob 63e8f4c232ee83a6a239ae43b85f9c7903601dbb	.beads/README.md
100644 blob d402f49ad50ed3ee01dbf9ef010d077df272c629	.beads/config.yaml
040000 tree e7e018f5f2541d38f16d9e6a703b040567e5e688	.beads/hooks
100644 blob 56d09158722222553d5d2ec483b6acf1a2f21593	.beads/interactions.jsonl
100644 blob b43c152afc6d7cc778de8c21db9fe731895071e3	.beads/issues.jsonl
100644 blob 8f81e51d627f03ede30ca6518920ad15a00aa278	.beads/metadata.json
$ git cat-file -s c4e8f8264511b53d1ad93f67dc0901eedbe5355a:.beads/issues.jsonl
94137051
$ git cat-file -s c4e8f8264511b53d1ad93f67dc0901eedbe5355a:.beads/interactions.jsonl
1012058
```

94,137,051 / 2^20 = 89.78, the figure the remote printed at landing 1004 (Finding 2), so the "MB" in GitHub's warning is a binary mebibyte. This is the blob at the fetched tip, read from my clone's object store; no peer checkout and no store was read. `.gitattributes` does not exist at the pin (`git show c4e8f8264511b53d1ad93f67dc0901eedbe5355a:.gitattributes` prints `fatal: path '.gitattributes' does not exist in 'c4e8f8264511b53d1ad93f67dc0901eedbe5355a'`), so the blob is tracked as a plain git object. `.beads/config.yaml` at the pin sets `export:` with `auto: false` and `sync.remote: "git+https://github.com/jehalladay/Pi-subagents"`; `AGENTS.md:191` and `AGENTS.md:248` at the pin both say "`.beads/issues.jsonl` is a passive export".

## Finding 2 — 33 of 33 window hop pushes carry GitHub's GH001 warning, 0 of 33 a rejection — **CONFIRMED**

The ledger has 33 `fold-done` rows with `utc` in [2026-11-05T07:52:00Z, 2026-11-06T07:53:00Z) (M:58339 L972 `wb-sp4w` to M:60535 L1004 `wb-x4ph`; the window's first row is M:58275 at 07:52:05Z and its last M:60596 at 07:52:16Z). Each row's `bead` and `landing` name one receipt directory, `runtime/landchain/fw-landchain-<bead>-L<landing>/`, whose `push-hop.err` is the stderr of that landing's hop push. At landing 1004, verbatim (`cat -A`; the trailing spaces are the remote's):

```
$ cat -A machines/flywheel/runtime/landchain/fw-landchain-wb-x4ph-L1004/push-hop.err
remote: warning: See https://gh.io/lfs for more information.        $
remote: warning: File .beads/issues.jsonl is 89.78 MB; this is larger than GitHub's recommended maximum file size of 50.00 MB        $
remote: warning: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.        $
```

Its mtime is `2026-11-06 06:55:09.836240850 +0000`; `hop.sha` in the same directory reads `c4e8f8264511b53d1ad93f67dc0901eedbe5355a`, the fetched tip. The census keyed by the ledger's exact (bead, landing) pairs:

```
33 fold-done landings: push-hop.err=33 GH001=33 rejected-hop=0 missing=0
{'commit_refs': 0, 'fatal': 0, 'rejected': 0, 'files': 33}
```

Instrument note: a glob over the 33 landing numbers matches 35 directories: `fw-landchain-wb-9h7s-L972` (mtime 2026-11-05T06:36:43Z) and `fw-landchain-wb-z79l-L1003` (mtime 2026-11-06T04:26:20Z) are abandoned candidate directories holding only `candidates.txt` and `entry.json`, so a glob-based census reads 33 GH001 of 35 directories and shows two spurious missing receipts; the 33 above is the bead-keyed recount. The table in Evidence lists the remote's figure for each of the 33 (86.19 MB at L972 to 89.78 MB at L1004, monotone). The `export.err` in the same 33 directories each hold a single line `Exported <n> issues to …` (33 of 33, 1,254 issues at L972 to 1,299 at L1004: the export succeeded on its first attempt every time).

## Finding 3 — the export grew 3,758,143 bytes over the 33 window hops (3.77 MiB/day), each hop a new full blob — **CONFIRMED**

`git cat-file -s <hop>:.beads/issues.jsonl` and `git log -1 --format=%cI <hop>` for the 33 hop shas the ledger rows name:

```
first L972 size=90378908 at 2026-11-05T08:04:55Z; last L1004 size=94137051 at 2026-11-06T06:55:01Z
delta bytes=3758143 over 82206 s (0.9515 d) across 32 hop intervals => 3.77 MiB/day; per-hop mean 117442 bytes
distinct export blob ids among 33 hops: 33
least-squares slope: 3.5735284864510075 MiB/day
```

Why each hop is a new blob: `land-chain.sh:1144-1165` (machine source, sha256 prefix `2093d8dbbbb57673`) runs a full `bd -C "$STORE" export -o "$STORE/.beads/issues.jsonl"` after the closes (:1145), copies the file into a fresh detached hop worktree (:1160), stages exactly `.beads/issues.jsonl .beads/interactions.jsonl` (:1161), refuses a hop that stages nothing in `issues.jsonl` (:1163) and commits with the subject `ledger: close <bead> (landing <n>, merge <sha8>)` (:1164-1165); the comment at :1144 states the design: the hop "carries a fresh full export". The size series is monotone: 32 of 32 in-window pairs grew, and L972 (90,378,908 bytes) exceeds the preceding out-of-window L971 (90,069,321 bytes, hop `d7988bc0a4d6cf6e48fa1be2e62c2833ead3420f`, 2026-11-05T06:27:18Z), and 2 of 987 chronologically adjacent pairs in the whole path history decreased (−97 bytes at `c5f2c2c4`, 2026-10-15T05:24:18Z; −4,404 bytes at `ebd5908d`, 2026-10-17T11:48:11Z).

## Finding 4 — the blob first exceeded 50 MiB at landing 725 and 269 of 988 path commits now exceed it, 6.31 MiB/day since — **CONFIRMED**

```
commits touching .beads/issues.jsonl on origin/workbench/implementation-program: 988
with a readable blob: 988; missing/err: 0
commits whose export blob is >= 50 MiB (52428800): 269 of 988
earliest >=50MiB: 99ead5ff0933eeeeace83526f87e072c035efe82 52467167 2026-10-30T23:42:02Z ledger: close wb-lrl3 (landing 725, merge d9c8ea24)
previous commit  : bffdf2de49231363b0540a1770a57737a343beff 52314652 2026-10-30T23:14:43Z ledger: close wb-v4d5 (landing 724, merge e1572896)
newest: c4e8f8264511b53d1ad93f67dc0901eedbe5355a 94137051 2026-11-06T06:55:01Z ledger: close wb-x4ph (landing 1004, merge 63a1e5e0)
growth from earliest>=50MiB to tip: 41669884 bytes over 544379 s (6.301 d) = 6.31 MiB/day
oldest commit with the path: 43ad58b5dc2add37efd036f06435d4cea5a849c2 37698 2026-10-15T04:02:03Z
```

The 50 MiB warning threshold was crossed 6.3 days before this file. The 33 window hops measured all carried the warning; the other 236 commits at or above 50 MiB are inferred to have warned from the documented threshold, not from their receipts, which I did not read.

## Finding 5 — 1,166 closed issues hold 96.5% of the bytes and `notes` holds 95.7%; no single line exceeds 1 MiB — **CONFIRMED**

`git show c4e8f8264511b53d1ad93f67dc0901eedbe5355a:.beads/issues.jsonl | python3 -I profile.py` (line bytes by `status`, string-field lengths):

```
issues (lines): 1299 total line bytes: 94137051
  closed: 1166 issues, 90867507 bytes (96.5% of line bytes)
  in_progress: 25 issues, 1966335 bytes (2.1% of line bytes)
  open: 104 issues, 1297248 bytes (1.4% of line bytes)
  blocked: 3 issues, 3885 bytes (0.0% of line bytes)
  deferred: 1 issues, 2076 bytes (0.0% of line bytes)
notes chars total: 90097555 (95.7% of line bytes; chars, not bytes)
largest line bytes: 768264 id: wb-hk9l | lines > 1 MiB: 0
top string fields by chars: [('notes', 90097555), ('description', 1248125), ('close_reason', 497713), ('acceptance_criteria', 408887)]
```

This is whole-ledger accumulation of closed beads' notes, which the program's receipt discipline produces by design; it is not one runaway record, so no single bead edit would bring the file back under the threshold.

## Finding 6 — GitHub documents the 100 MiB block, so the headroom at landing 1004 is 10,720,549 bytes (10.22 MiB) — **CONFIRMED**

The GitHub page `https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github`, fetched 2026-11-06, states, verbatim: "If you attempt to add or update a file that is larger than 50 MiB, you will receive a warning from Git." and "GitHub blocks files larger than 100 MiB." and "To track files beyond this limit, you must use Git Large File Storage (Git LFS)." The page names no plan-dependent figure for pushes. 100 MiB = 104,857,600 bytes; 104,857,600 − 94,137,051 = 10,720,549 bytes = 10.22 MiB. The remote's own figure (89.78 MB for 94,137,051 bytes) confirms the binary unit, so every local calculation here uses MiB.

## Finding 7 — at the measured rates the headroom lasts 1.62 to 2.86 days from landing 1004 — **PLAUSIBLE**

Holding each measured rate fixed from 2026-11-06T06:55:01Z, calculating with unrounded rates and truncating displayed timestamps to the minute:

```
Oct30-Nov06 (41669884 B / 544379 s): 6.31 MiB/day -> 1.62 d -> 2026-11-07T21:49Z
window endpoints (3758143 B / 82206 s): 3.77 MiB/day -> 2.71 d -> 2026-11-09T00:03Z
window least-squares (unrounded 3.5735284864510075 MiB/day): 3.5735 MiB/day -> 2.861 d -> 2026-11-09T03:34Z
hops to 100MiB at per-hop mean: 91.28  (117,442 bytes per hop; 32 intervals averaged 2,569 s)
```

PLAUSIBLE, not CONFIRMED: the rate depends on runtime state I did not exercise — the landing cadence, the notes volume per closed bead and any change to the exporter or the store before the threshold. These are conditional projections from the tip's timestamp, not a deadline and not a predicted outage.

## Finding 8 — an oversize export would refuse at the hop step after the merge is already on trunk — **PLAUSIBLE**

The landing order in `land-chain.sh` is merge push (`push_retry merge` at :1070), `bd close` (`close.err`), export (:1145), hop commit (:1165), hop push (`push_retry hop` at :1170). The L1004 receipt mtimes agree: `push-merge.err 06:54:41.99`, `close.err 06:54:48.66`, `export.err 06:54:57.56`, `hop.unpushed.sha 06:55:01.47`, `push-hop.err 06:55:09.83`. `bin/push-stderr-classify.py:12` lists `pre-receive hook declined` under `CORRECTNESS`, and `push_retry` exits 6 on a correctness refusal (:375-376) with the text `push_refused_text` builds at :299: `push of the ledger hop refused: <tail -c 300 of the receipt> (hop commit <sha> kept; re-run --from hop)`. GitHub delivers its size block from a pre-receive hook, so a blocked hop would most likely read as a correctness refusal: the merge already on `workbench/implementation-program`, the bead already closed in the store, the hop commit kept locally and never retried, and a `--from hop` resume unable to succeed until the blob shrinks. PLAUSIBLE because no oversize push was attempted and the refusal text GitHub would print was not observed in any receipt (0 of 33 carry `rejected`).

## Evidence

**CONFIRMED drift during drafting:** landing 1005 (`wb-z79l`, hop `814dcdd01bec171673ff17d085296276a140e15b`) committed at 2026-11-06T08:41:24Z: `.beads/issues.jsonl` is 94,420,911 bytes (+283,860 over L1004), the remote printed `90.05 MB` and GH001 in `runtime/landchain/fw-landchain-wb-z79l-L1005/push-hop.err` (mtime 08:41:35Z), with no `rejected`, `fatal` or `commit_refs` in that receipt; 989 path commits at that tip. The correction re-check found `origin/workbench/implementation-program` at that sha. The original size/history figures remain pinned to `c4e8f826`, not to the moving ref. The strict closing bound `< 2026-11-06T07:52:00Z` instead ends at M:60593 (07:49:39Z); including the closing minute ends at M:60596 (07:52:16Z). Either bound contains the same 33 `fold-done` rows.

Hop table — landing, bead, ledger row, hop sha (8), the remote's figure quoted from `push-hop.err`, the blob size from `git cat-file -s`, the hop's committer date from `git log -1 --format=%cI`:

| landing | bead | row | hop | remote figure | blob bytes | committer date |
|---|---|---|---|---|---|---|
| 972 | wb-sp4w | M:58339 | 094bf2a1 | 86.19 MB | 90378908 | 2026-11-05T08:04:55Z |
| 973 | wb-u6ho | M:58393 | 4ab3af53 | 86.26 MB | 90445356 | 2026-11-05T08:27:54Z |
| 974 | wb-ldqu | M:58474 | 16a53840 | 86.42 MB | 90619729 | 2026-11-05T09:02:20Z |
| 975 | wb-jwc.10 | M:58554 | 26463052 | 86.49 MB | 90694530 | 2026-11-05T09:25:14Z |
| 976 | wb-nj87 | M:58587 | 83f76eb5 | 86.56 MB | 90769254 | 2026-11-05T09:49:20Z |
| 977 | wb-zdwo | M:58690 | 5e06d6dc | 86.68 MB | 90887992 | 2026-11-05T10:19:45Z |
| 978 | wb-pyel.1 | M:58733 | 133c84dd | 86.70 MB | 90909530 | 2026-11-05T10:40:26Z |
| 979 | wb-yf7o | M:58773 | 4bc649cd | 86.77 MB | 90987277 | 2026-11-05T10:58:23Z |
| 980 | wb-ekl1 | M:58833 | 70c41b97 | 86.96 MB | 91182896 | 2026-11-05T11:23:10Z |
| 981 | wb-lt9r | M:58864 | b489ad39 | 87.00 MB | 91227726 | 2026-11-05T11:35:31Z |
| 982 | wb-vw8i | M:58935 | dfa7f930 | 87.16 MB | 91389999 | 2026-11-05T12:06:39Z |
| 983 | wb-9h7s | M:58995 | 1f8be5ee | 87.18 MB | 91412827 | 2026-11-05T12:24:12Z |
| 984 | wb-zchj | M:59028 | deadf307 | 87.31 MB | 91555208 | 2026-11-05T12:41:34Z |
| 985 | wb-pyel.5 | M:59056 | c8f2eeb1 | 87.34 MB | 91586479 | 2026-11-05T12:56:35Z |
| 986 | wb-kb9f | M:59113 | bd767d77 | 87.48 MB | 91726509 | 2026-11-05T13:29:18Z |
| 987 | wb-021.6 | M:59138 | 108a2025 | 87.51 MB | 91755678 | 2026-11-05T13:46:50Z |
| 988 | wb-tz2.3 | M:59292 | 95fb8156 | 87.75 MB | 92012888 | 2026-11-05T15:41:40Z |
| 989 | wb-2b41 | M:59362 | 86e254d3 | 87.85 MB | 92118500 | 2026-11-05T16:17:04Z |
| 990 | wb-ulnv | M:59488 | 40f8915f | 88.05 MB | 92328497 | 2026-11-05T18:22:22Z |
| 991 | wb-3uxh | M:59566 | fd8f71c5 | 88.15 MB | 92427710 | 2026-11-05T19:36:55Z |
| 992 | wb-7nf4 | M:59602 | e58821f4 | 88.25 MB | 92542037 | 2026-11-05T19:57:55Z |
| 993 | wb-xtah | M:59716 | b45f46ad | 88.41 MB | 92705147 | 2026-11-05T21:49:00Z |
| 994 | wb-40zp | M:59860 | ef903e2e | 88.63 MB | 92932488 | 2026-11-05T23:28:45Z |
| 995 | wb-c8nb | M:59942 | ab929a29 | 88.69 MB | 92997902 | 2026-11-05T23:46:52Z |
| 996 | wb-i5ih | M:59944 | d7b5e894 | 88.80 MB | 93114029 | 2026-11-06T00:02:24Z |
| 997 | wb-o3f8 | M:60024 | b561689b | 88.91 MB | 93226344 | 2026-11-06T00:44:18Z |
| 998 | wb-q8v3 | M:60064 | e0eb6ca2 | 88.97 MB | 93292475 | 2026-11-06T01:14:17Z |
| 999 | wb-qzqd | M:60129 | 365f4167 | 89.04 MB | 93366205 | 2026-11-06T01:43:10Z |
| 1000 | wb-imm0 | M:60160 | 82dbe2f8 | 89.09 MB | 93416688 | 2026-11-06T01:59:10Z |
| 1001 | wb-0hr6 | M:60226 | 805a2bad | 89.21 MB | 93539289 | 2026-11-06T02:53:47Z |
| 1002 | wb-0fq9 | M:60308 | 1b707ef0 | 89.31 MB | 93648314 | 2026-11-06T03:46:03Z |
| 1003 | wb-i4m6 | M:60435 | 15de5c51 | 89.56 MB | 93905425 | 2026-11-06T05:30:25Z |
| 1004 | wb-x4ph | M:60535 | c4e8f826 | 89.78 MB | 94137051 | 2026-11-06T06:55:01Z |

Object-store cost (realized; my rig clone, whose object store the live land-/gate- worktrees share). The following is an original point-in-time snapshot taken during 2026-11-06T07:55Z–08:45Z, not a sha-pinned property; its exact measurement time was not retained. The shared store changes with fetched landings, so `git count-objects -vH` need not reproduce these counts:

```
33 window hop blobs: sum objectsize=3039240887 (2.83 GiB); sum objectsize:disk=1218000213 (1161.6 MiB); deltas 0 of 33; min/max disk 36228515/37699086
loose: 33 of 33      (.git/objects/<2>/<38> exists for each of the 33 blob ids)
unique export blobs in the 988-commit path history: 988; sum objectsize=33714554865 (31.40 GiB); sum objectsize:disk=1623628094 (1548.4 MiB); stored as deltas: 942 of 988
$ git count-objects -vH
count: 6452
size: 1.53 GiB
in-pack: 503568
packs: 3
size-pack: 240.82 MiB
```

Reading: the 955 packed blobs cost about 386.8 MiB together (roughly 0.4 MiB each as deltas), while the 33 recent ones, fetched hop by hop, sit loose and undeltified at 36–38 MiB each until a repack; the per-landing fetch cost in every clone is therefore a ~37 MiB loose object, not the ~117 KB of new text. Network bytes per push or fetch were not measured (git sends thin packs).

Ledger rows quoted: M:58339 (`kind` `fold-done`, `bead` `wb-sp4w`, `landing` `972`, `hop` `094bf2a14c6367b1b729fc2f8fcc4ad11e35454e`, `utc` `2026-11-05T08:12:35Z`) and M:60535 (`fold-done`, `wb-x4ph`, `1004`, `hop` `c4e8f8264511b53d1ad93f67dc0901eedbe5355a`, `utc` `2026-11-06T06:57:55Z`). `commit_refs` occurs in 4 ledger rows (M:41242 2026-10-31T13:12:38Z, M:55298, M:55302 and M:55348, all 2026-11-04), every one before this window.

Remote refs: `git ls-remote origin 'refs/dolt/*'` printed nothing (rc 0); the positive control `git ls-remote origin refs/heads/workbench/implementation-program` printed `c4e8f8264511b53d1ad93f67dc0901eedbe5355a	refs/heads/workbench/implementation-program`.

Repository surfaces at the pin that name the export: `git grep -l issues.jsonl` over `test/*.test.ts` hits 180 of 560 test files (a mention count, not a reader census; the 11-02 CORROBORATION measured 141 of 545 readers at its pin). Outside `test/`, `new-feedback/` and the two JSONL files, `issues.jsonl` is named by `.beads/config.yaml`, `AGENTS.md` (:191, :248), `docs/workbench/15-implementation-program.md:7` and three receipts under `docs/workbench/receipts/`. No tracked file at the pin outside `test/`, `new-feedback/` and the two JSONL exports names `GH001`, `100 MiB`, `100 MB` or `large file` (`git grep -n -i -E 'GH001|100 ?MiB|100 ?MB|large file' c4e8f826 -- . ':!test' ':!new-feedback' ':!*.jsonl'`, 0 matching lines, rc 1). Without the JSONL exclusion the same grep returns 1 matching line, `.beads/issues.jsonl:435`, the `wb-uwk7` record: `large file` occurs twice in its notes, in "changes the large file's last byte to 0x81" and "the deep entry and the large file are held to the installed tree", neither about GitHub. This matching row is the armed control for the negative; the scope excludes JSONL exports, not all bead documentation.

## Suggested fixes, cheapest first

1. **A size preflight before the merge push** — measure the previous hop's export blob (or the store's current export) at the top of the landing and refuse, with a typed ledger row, above a threshold such as 95 MiB (99,614,720 bytes). It costs one `git cat-file -s` or one `stat` and turns the first blocked hop from a post-merge correctness refusal (Finding 8) into a pre-merge refusal the orchestrator can rule on. It shrinks nothing. The preflight belongs to the machine's `land-chain.sh`; this repository's half of the fix is item 2.
2. **State the constraint where the export is documented** — nothing tracked at the pin outside tests, `new-feedback/` and the two JSONL exports names GH001, 100 MiB or the searched large-file terms (Evidence); the export itself has unrelated planted-tree notes, not a GitHub policy. One sentence beside the "passive export" line at `AGENTS.md:191` naming the tracked-blob limit, the size at the time of writing and where the size is checked would let the next operator find the ceiling before the remote does.
3. **Split the export into a live file and dated closed archives** — for example `.beads/issues.jsonl` holding the open, in_progress, blocked and deferred issues (3,269,544 bytes at the pin, 3.5% of the file) plus `.beads/archive/issues-closed-<YYYY-MM>.jsonl` files that each stay far below 50 MiB. `bd export` at `1.1.0-rc.1` has no status filter, so the split is a post-export step in the hop. The cost is the reader census: 180 of 560 `test/*.test.ts` files at the pin name `issues.jsonl`, and every reader that asserts over closed rows must learn the archive path in the same commit or the gate reds. Do not simply drop closed records: the censuses and the receipt discipline read them.
4. **Git LFS for the export** — the remote's own suggestion. Not recommended as the first move: at the pin no `.gitattributes` exists, every gate worktree and every census reader would need `git lfs` installed and the pointer resolved, and the hop cadence would move the cost to LFS bandwidth rather than remove it. Name it, cost it, decide it; do not migrate unverified.

## Positives worth protecting

- **The hop keeps the remote's stderr verbatim, per landing** — 33 of 33 `push-hop.err` receipts were present and readable, and the GH001 text in them is what made this measurement possible. The comments at `land-chain.sh:85` and `:244` record that an earlier re-run truncated a `push-hop.err` to 0 bytes and that per-attempt receipts are now created under `noclobber`. A refactor that routed push stderr to `/dev/null`, or reused one receipt path across attempts, would lose the only evidence that the warning fired.
- **Hop subjects name the landing, the bead and the merge** — `ledger: close wb-x4ph (landing 1004, merge 63a1e5e0)` lets `git log -- .beads/issues.jsonl` attribute all 988 export states to landings without opening the ledger; the 50 MiB crossing (Finding 4) was located from the subject lines alone. Keep the subject grammar stable.
- **The export is a plain tracked blob, so every figure here is reproducible at any revision** — `git cat-file -s <sha>:.beads/issues.jsonl` reproduces Findings 1, 3 and 4 in any clone that has the ref. A move to LFS or to an untracked export would make the history of the ledger's size, and the ledger itself at past revisions, unreadable without extra tooling; whichever shape fix 3 or 4 takes should keep that property.
- **The hop stages by name and refuses an empty stage** — `git add -- .beads/issues.jsonl .beads/interactions.jsonl` (`land-chain.sh:1161`) and the `hop stages nothing in issues.jsonl` refusal (:1163); no `add -A`, so no stray file can ride a hop onto trunk. 33 of 33 window hops produced a distinct export blob id.
- **`bd export` succeeded on its first attempt 33 of 33 times** (`export.err`: `Exported 1254 issues` at L972 to `Exported 1299 issues` at L1004), each inside the hop's `timeout 120`. The exporter is not the problem; the transport ceiling is.

## What I did not establish

- No 100 MiB rejection was reproduced and no oversize push was attempted; GitHub's exact refusal text, and whether `push-stderr-classify.py` would read it as `correctness` (`pre-receive hook declined`) or `unclassified`, rest on reading the classifier and GitHub's documentation, not on a receipt. Artifact that would settle it: one push of a 100 MiB-plus blob to a scratch repository, with its stderr.
- Whether GitHub's push limit differs for this account or plan; the fetched page names no plan-dependent figure for pushes. Artifact: the account's settings or a GitHub support statement.
- Network bytes per hop push or fetch; only object sizes (logical and on-disk) were measured. Artifact: `GIT_TRACE_PACKET` or the pack size of one push and one fetch.
- Whether the 236 commits at or above 50 MiB before this window also carried GH001; only the 33 window receipts were read.
- Whether the Dolt ledger has a remote copy independent of this blob: `refs/dolt/*` on `origin` is empty (positive control shown), `.beads/config.yaml` points `sync.remote` at this repository, and `bd export --help` says the export "is not a full database backup". No backup configuration or `bd backup` state was read. Artifact: `bd backup` status from the owner's store, which I did not touch.
- No gate, test, `bd` write or `pi` invocation ran in this lane; the owner's store checkout was not read (the `export.err` path names it only as the exporter's output). The `pi` runner's `1.2.0` is not a pi-subagents build and no installed extension sha was established.
- Any causal link between the GH001 warnings and the 11-04 `commit_refs` push errors: 0 of 33 window hop receipts carry `commit_refs`, and the rows naming it predate the window. None is claimed.

## Postscript — this file is itself a scanned surface

**CONFIRMED mention census:** 35 of 560 `test/*.test.ts` files at the pin contain `new-feedback` (`git grep -l new-feedback c4e8f826 -- 'test/*.test.ts'`); 24 of 560 contain `new-feedback/` with the trailing slash. **PLAUSIBLE historical probe account, receipts not retained:** the original draft was probed before delivery in detached worktrees of my rig clone at the pin (`/tmp/fw-fb-probe*-a8ddce77-*`, each removed after its run; the main clone's index stayed at 0 staged paths), `CLAUDECODE` unset, `VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 NO_COLOR=1`, `npx vitest run <files> --expect.requireAssertions`, host load 43–125 across the runs. No layout of the probe's `node_modules` satisfies every census at once, and the clean-pin controls show the reds are the harness, not this file: with `node_modules` as one symlink to the rig clone's, the two wb-021 doc censuses and the wb-km7q.6 census fail 9 tests (`Error: EISDIR: illegal operation on a directory, read` in their walk) on the clean pin exactly as with the draft untracked or staged; with `node_modules` as a real directory of 293 per-package symlinks (`git check-ignore` reports it ignored), those three files pass 77 of 77 on the clean pin and with the draft staged, while the wb-tz2.7 census fails 31 of 46 on the clean pin (`walk: … is not a directory` over a symlinked scoped SDK package) and passes 46 of 46 under the symlink layout, with and without the draft. Every one of the 35 files passed with this draft present in the layout that suits it: run 1 (symlink layout, draft `102b6f8f1c9dba23` untracked) `Test Files 3 failed | 32 passed (35)`, `Tests 9 failed | 1210 passed (1219)`; run 3 (real-directory layout, the same draft staged) the three files `Tests 77 passed (77)`; run 4 (real-directory layout, the bytes before this paragraph's rewrite staged) `Test Files 1 failed | 34 passed (35)` with all 31 reds in the wb-tz2.7 census; run 5 (symlink layout, the same bytes staged) that census `Tests 46 passed (46)`. The original account says the last pair ran over its then-current draft, not the corrected bytes now delivered: the 34 files under the real-directory layout printed `Test Files 34 passed (34)` and the wb-tz2.7 census under the symlink layout printed `Tests 46 passed (46)`, with 0 lines naming this file in any run. Those runs kept no artifact beyond this paragraph, so all run counts, load readings and causal attribution above are PLAUSIBLE, not reproducible CONFIRMED results. The pre-correction file re-checked here was 30,239 bytes, SHA-256 `390287bb594ae2016673ee029051f68173526621d3c54cb5fd49a327a1638b35`; that digest identifies the account being corrected, not the unavailable test inputs or receipts. No test was re-run over this corrected file. The artifact that would settle the account is retained Vitest JSON reporter output and input SHA-256 for each layout/control run over the corrected bytes; the final corrected-file SHA-256 is returned separately with this fix, avoiding a self-referential file digest. To stay out of the doc censuses' mention families this file names the census tests by bead rather than by file name, and no `.gitattributes`, LFS or archive change was made anywhere.
