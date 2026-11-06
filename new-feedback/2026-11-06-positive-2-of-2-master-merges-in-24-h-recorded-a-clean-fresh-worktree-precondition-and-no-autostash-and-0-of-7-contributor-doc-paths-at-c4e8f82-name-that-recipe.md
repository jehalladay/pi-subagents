# positive: 2 of 2 master merges in 24 h (b27829e6, 85c9b80f) recorded a clean fresh-worktree precondition and --no-autostash, and 0 of 7 contributor-doc paths at c4e8f82 name that recipe

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the flywheel bead-machine orchestrator. The two merges and every ledger row quoted below are this seat's own machine record, read back from the ledger; the doc counts are the repository's, read at the pinned revision.
**Date:** 2026-11-06 (operation window 2026-11-05T07:52:00Z <= utc <= 2026-11-06T07:52:00Z for every ledger count — rows M:58275..M:60593, 2,319 rows; the doc counts are a snapshot at one commit)
**`pi-subagents` revision:** source read at `c4e8f8264511b53d1ad93f67dc0901eedbe5355a` = `git rev-parse origin/workbench/implementation-program` after `git fetch -q origin` at 2026-11-06T08:34:29Z (the ledger-close commit of landing 1004, `2026-11-06 06:55:01 +0000`; root tree `1510b348a4e24af07d05f1cd085ebcc58897db33`, `src` tree `0861eafe72fc4617fab6c0b88b4daff1981e9940`; `package.json` names `@tintinweb/pi-subagents` `0.20.0`). Installed tool revision: per the REPO FACTS pin the installed tool is the trunk tip at fetch, so installed = source = this same `c4e8f826`; no separately installed pi-subagents build exists on this host (see the `pi` line). Read through the object store only (`git show <sha>:<path>`, `git ls-tree`, `git grep <sha>`); trunk was not checked out, because this clone shares its object store with live land-/gate- worktrees.
**`pi` revision:** the runner on PATH prints `1.2.0` (`/home/jehallad/.local/bin/pi` -> `/local/home/jehallad/.pi/agent/bin/pi`; `~/.pi/agent/install/releases/` holds only `1.2.0`). A time-boxed `find` under `~/.pi/agent/install` for a `pi-subagents` directory or a `package.json` under a `*pi-subagents*` path returned 0 hits, so no installed pi-subagents extension build is pinned here. Nothing in this file rests on running the extension: the behaviour praised is two `git merge` operations the machine ran on this repository, and the behaviour measured is the text of seven tracked files.
**Method:** `git fetch -q origin`, then `git ls-tree -r --name-only` and `git grep -l -i -E` at `origin/workbench/implementation-program` and at `origin/master` for prior art; `sed -n '<n>p' machines/flywheel/ledger/metrics.jsonl` for rows M:60001, M:60467, M:59314, M:59333, M:59338, M:59956, M:60239 and M:60240 (M:n = line n; 60,659 lines at my read, append-only); one `python3 -I` pass over the ledger for the window bounds and the `master-merge` kind count; `git log -1 --format='%H%n parents: %P%n date: %ci%n subject: %s'`, `git merge-base --is-ancestor`, `git diff --shortstat` and `git ls-remote origin` on the two merge shas; `git show <pin>:<path> | grep -c` over 7 doc paths plus `git grep -l <pin>` over the whole tracked tree as the armed control; `pi --version` and a time-boxed `find` under `~/.pi/agent/install`. The machine ledger and state were read only. Nothing was committed, pushed or written outside this file.
**Scope:** feedback about operating pi-subagents' workbench program — the recipe by which the machine integrates `workbench/implementation-program` into `master`, and the contributor docs that could carry that recipe — not about the workbench beads. Positives plus one documentation gap. The data-loss incident that motivated the recipe happened in the flywheel machine's own repository (`machines/flywheel`, a separate git repository), not in this one; it appears here only as the qualified motivation.
**Prior art:** none on this recipe. At `c4e8f826` (`git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/`, 41 entries) no filename carries `autostash`, `no-ff`, `porcelain`, `clean-index`, `recipe`, `master-merge`, `commit-lock`, `index-lock` or `outage` (the looser `clean-` matches 1 of 41: `2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md`, a landing-duration phrase, not a recipe); a body grep at the same ref (`git grep -l -i -E ... origin/workbench/implementation-program -- new-feedback/`) reads 0 files for each of `autostash`, `--no-ff`, `no-autostash`, `clean-index`, `commit_refs`, `FW_COMMIT_LOCK`, `index.lock`, `origin/master`, `untracked-files=no`, and 14 files for `porcelain` — 11 of the 14 only in a metadata revision-pin line (`git status --porcelain | wc -l`), 1 in that line plus a quoted probe (`2026-10-21-vitest-run-...:77`), 2 only in quoted probe or gate text (`2026-11-01-CORROBORATION-n-3-...:196`; `2026-11-02-CORROBORATION-npm-ci-...:80,224,274`); none about a merge. At `origin/master` = `85c9b80f` (44 entries: the 41 plus the three 2026-11-04/2026-11-05 files the owner landed there) the filename check reads 0 for the same keywords (and the same single `clean-` hit, 1 of 44), and the body grep reads 0 files for each of `autostash`, `--no-ff`, `no-autostash`, `clean-index`, `commit_refs`, `FW_COMMIT_LOCK`, `index.lock` and `untracked-files=no`, 1 file for `origin/master` (`2026-11-04-CORROBORATION-n-4-42-of-56-refusals-in-24-h-...-0-of-5-doc-paths-name-it.md:249`, a probe note that `git symbolic-ref --short refs/remotes/origin/HEAD` prints `origin/master`, not a merge) and 17 for `porcelain` (the 14 plus the three landed files: a metadata revision pin at `2026-11-05-CORROBORATION-a-landed-census-...:5`, a clone-dirtiness probe `git status --porcelain | wc -l` = 19 at `2026-11-04-CORROBORATION-n-4-...:249`, and quoted gate-worktree row text "porcelain 0" at `2026-11-04-a-symlinked-node-modules-...:183,184`); none about a merge. The nearest adjacent file is `2026-10-20-agents-md-git-section-says-never-push-while-the-context-profiles-section-defers-to-orchestrator-instructions-so-a-finished-cut-parked-until-owner-ruling-r589-named-which-clause-wins.md`, which concerns push authority, not integration merges. This working tree's own listing is 4,240 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`), which is why the checks were run at the ref. Armed control for the body grep: `worktree` reads 35 of 41 files and `landing` 35 of 41 at the ref.

## Summary, with numbers

Both integration merges of the window succeeded and both ledger rows record the same recipe: a fresh temporary worktree, a tracked-files-clean assertion (`git status --porcelain --untracked-files=no` reading 0) before the merge, `git merge --no-ff --no-autostash`, a no-force push, and a read-back of the remote tip. The `master-merge` kind holds exactly 2 rows in the whole 60,659-line ledger (M:60001 at 2026-11-06T00:35:36Z and M:60467 at 2026-11-06T06:17:58Z), both inside the window, so 2 of 2 is the complete population, not a sample. `git log`, `git merge-base --is-ancestor`, `git diff --shortstat` and `git ls-remote` independently agree with every graph fact the rows state (parents, ancestry of `origin/master`, the 12-file +14257/-1587 delta of the second merge, the remote tip `85c9b80f`). The gap: 0 of 7 contributor-doc paths at `c4e8f826` contain `autostash`, `porcelain` or `--no-ff` (armed controls: `worktree` reads 2, 27 and 2 in three of them; `landing` reads 1 in a fourth), and across the whole tracked tree at that commit the only file naming `autostash` or `--no-ff` is `.beads/issues.jsonl`. The recipe therefore lives in two ledger rows and an operator's habit. Four claims: 3 CONFIRMED, 1 CONFIRMED with a PLAUSIBLE sub-claim. No escalation warranted; the ask is documentation.

**Out of scope, carried as motivation only — the machine's own repository, not this one; graded PLAUSIBLE by its producer.** The recipe is the machine's response to a 2026-11-05 loss in its own repository (`machines/flywheel`, a separate git repository). M:59314 (`machine-defect`, 2026-11-05T16:03:51Z, bead wb-2b41) opens "machine-repo state rewrite 2026-11-05T15:15:36Z (g10.22 merge autostash sequence)" and its `cause` field closes, byte-exact: "Causal attribution to the autostash is PLAUSIBLE (reflog + mtimes + stash objects), not CONFIRMED by a producer transcript". The counts, with their scope: 12,288 `state/` paths in the machine repository absent, 12,277 restored at `2b57767f` (M:59333, `correction`, 16:09:44Z, byte-exact: "12,288 state/ paths were still absent; 12,277 restored at commit 2b57767f"); M:59338 (`tune-candidate`, 16:11:27Z) adds that "the 15:15:36Z g10.22 merge attempt ran with merge.autostash active on the machine repo". The triage rows that followed (M:60239, M:60240; Finding 4) rank a pre-merge clean-index refusal, not the flag alone, as the necessary cure. I did not read the machine repository's reflog or recovery refs, so I carry the producer's grade and do not raise it; the incident is motivation here, not a claim of this file, and its record belongs to the machine ledger.

## Finding 1 — master merge b27829e6 (landings through 996) recorded the clean-worktree + `--no-ff --no-autostash` recipe, and the graph agrees — **CONFIRMED**

The first merge of the window is the ledger's first `master-merge` row. Quoted fields, byte-exact from M:60001 (`sed -n '60001p' machines/flywheel/ledger/metrics.jsonl`):

```
"kind":"master-merge" ... "mergeCommit":"b27829e6dfa7d2c39e493095d963117d2d078d61",
"parents":["03426da428afa5d8f14b13edc29e66b1c1a7cf33 (master, 4 docs-only own commits)","d7b5e894ac5db277c33a6820299de24e0df33ce5 (workbench trunk, landings through 996)"],
"pushed":"03426da4..b27829e6 origin/master (fast-forward of the merge, no force)",
"method":"clean temp rig worktree (porcelain -uno 0), git merge --no-ff --no-autostash (the R-B618-era lessons), conflict-free, worktree removed",
"idem":"master-merge-20261106-b27829e6","utc":"2026-11-06T00:35:36Z"
```

Independent check in this clone's object store (the row is the orchestrator's self-report; the graph is git's):

```
$ git log -1 --format='%H%n parents: %P%n date: %ci%n subject: %s' b27829e6dfa7d2c39e493095d963117d2d078d61
b27829e6dfa7d2c39e493095d963117d2d078d61
 parents: 03426da428afa5d8f14b13edc29e66b1c1a7cf33 d7b5e894ac5db277c33a6820299de24e0df33ce5
 date: 2026-11-06 00:35:07 +0000
 subject: Merge workbench/implementation-program (landings through 996, trunk d7b5e894) into master - the flywheel machine's landed work to date; first master merge under the user's 2026-11-06 standing order
$ git merge-base --is-ancestor b27829e6dfa7d2c39e493095d963117d2d078d61 origin/master; echo rc=$?
rc=0
$ git diff --shortstat 03426da428afa5d8f14b13edc29e66b1c1a7cf33 b27829e6dfa7d2c39e493095d963117d2d078d61
 38 files changed, 32056 insertions(+), 741 deletions(-)
```

Two parents (so `--no-ff` held: a fast-forward would have left no merge commit), the parents the row names, 29 seconds between the commit and the row, and the merge is an ancestor of `origin/master`. The method string is what makes this a positive: the precondition (`porcelain -uno 0`), the explicit flag and the worktree disposal are all in the record, so a reader who was not there can see what the operator checked. The "R-B618-era lessons" the method string credits are the machine's own commit-lock flip (R-B618 = M:59956, `ruling-bound`, 2026-11-06T00:09:11Z, `FW_COMMIT_LOCK=1` on the machine repository's record chains "after index.lock collisions #3 (L993, R-B613) and #4 (L996, R-B617)") — a mechanism of the machine repository, named here only to gloss the quote.

## Finding 2 — master merge 85c9b80f (landings 997-1003) asserted `git status --porcelain --untracked-files=no` = 0 before merging, pushed without force and read the remote tip back; the 12-file +14257/-1587 delta and the tip reproduce — **CONFIRMED**

Quoted fields, byte-exact from M:60467:

```
"mergeCommit":"85c9b80fdad430bfcff5b130dc538fd8fdf13874",
"parents":"0b25e14e084a5b1d612e780bc12a927b3a80dd62 15de5c51da080ca1fcee12af12c8e590534499b5",
"pushed":"origin/master ls-remote read back 85c9b80fdad430bfcff5b130dc538fd8fdf13874 after a no-force push",
"method":"fresh temp worktree on master tip 0b25e14e; git status --porcelain --untracked-files=no read 0 (asserted before merge); merge --no-ff --no-autostash of trunk 15de5c51da08 (landings 997-1003; 12 files, +14257/-1587); worktree removed after push",
"authority":"... master had advanced by the Sr. Engineer's mw-interop docs commit 0b25e14e atop the prior merge b27829e6 - ancestry verified before merging",
"idem":"master-merge-20261106-85c9b80f","utc":"2026-11-06T06:17:58Z"
```

Independent check:

```
$ git log -1 --format='%H%n parents: %P%n date: %ci%n subject: %s' 85c9b80fdad430bfcff5b130dc538fd8fdf13874
85c9b80fdad430bfcff5b130dc538fd8fdf13874
 parents: 0b25e14e084a5b1d612e780bc12a927b3a80dd62 15de5c51da080ca1fcee12af12c8e590534499b5
 date: 2026-11-06 06:17:40 +0000
 subject: Merge workbench/implementation-program (landings through 1003, trunk 15de5c51da08) into master - the flywheel machine's standing 6h master merge (user order 2026-11-06; continuity check 06:17Z)
$ git merge-base --is-ancestor 85c9b80fdad430bfcff5b130dc538fd8fdf13874 origin/master; echo rc=$?
rc=0
$ git diff --shortstat 0b25e14e084a5b1d612e780bc12a927b3a80dd62 85c9b80fdad430bfcff5b130dc538fd8fdf13874
 12 files changed, 14257 insertions(+), 1587 deletions(-)
$ git merge-base 0b25e14e084a5b1d612e780bc12a927b3a80dd62 15de5c51da080ca1fcee12af12c8e590534499b5
d7b5e894ac5db277c33a6820299de24e0df33ce5
$ git diff --shortstat d7b5e894ac5db277c33a6820299de24e0df33ce5 15de5c51da080ca1fcee12af12c8e590534499b5
 12 files changed, 14257 insertions(+), 1587 deletions(-)
$ git log -1 --format='%H%n parents: %P%n date: %ci%n subject: %s' 0b25e14e084a5b1d612e780bc12a927b3a80dd62
0b25e14e084a5b1d612e780bc12a927b3a80dd62
 parents: b27829e6dfa7d2c39e493095d963117d2d078d61
 date: 2026-11-06 06:16:20 +0000
 subject: docs(workbench): mw-interop epistemic triage + Phase-10 requirements (wf_e2a33273-049)
$ date -u +%Y-%m-%dT%H:%M:%SZ; git ls-remote origin refs/heads/master refs/heads/workbench/implementation-program
2026-11-06T08:34:29Z
85c9b80fdad430bfcff5b130dc538fd8fdf13874	refs/heads/master
c4e8f8264511b53d1ad93f67dc0901eedbe5355a	refs/heads/workbench/implementation-program
```

The row's "12 files, +14257/-1587" is the delta both as first-parent..merge (what the merge brought to `master`) and as merge-base..trunk-tip (what trunk had added since d7b5e894) — the two agree, which is what a conflict-free merge of a branch that received no other changes looks like. The row's "master had advanced ... 0b25e14e atop the prior merge" reproduces: 0b25e14e's single parent is b27829e6, its `%an` reads `Pi-Subagents Owner (Sr. Engineer session)`, and it sits 80 seconds before the merge. `ls-remote` at 2026-11-06T08:34:29Z — 2 h 16 min 31 s after the row's `utc` 06:17:58Z — still reads `85c9b80f` for `refs/heads/master`, so the no-force push landed and nothing has moved the tip since.

## Finding 3 — 0 of 7 contributor-doc paths at c4e8f826 contain `autostash`, `porcelain` or `--no-ff`, with armed controls that hit — **CONFIRMED** as a scoped absence

Counts by `git show c4e8f8264511b53d1ad93f67dc0901eedbe5355a:<path> | grep -c`:

```
path                                               exists autostash porcelain  no-ff | worktree landing merge
AGENTS.md                                             yes         0         0      0 |        2       0     1
CONTRIBUTING.md                                       yes         0         0      0 |        0       0     0
README.md                                             yes         0         0      0 |       27       0     2
docs/workbench/README.md                              yes         0         0      0 |        0       0     0
docs/workbench/15-implementation-program.md           yes         0         0      0 |        0       1     0
docs/workbench/17-packaging-and-operations.md         yes         0         0      0 |        2       0     0
docs/workbench/IMPLEMENTATION_GUIDE.md                yes         0         0      0 |        0       0     0
```

(`autostash` and `porcelain` case-insensitive; `no-ff` is the literal `--no-ff`; `worktree`, `landing` case-insensitive and `merge` word-bounded, as the controls.) All 7 paths exist at the pin (`git cat-file -e`). The controls arm the instrument: the same `grep -c` on the same blobs reads `worktree` 2, 27 and 2 and `landing` 1, so a zero is a zero of the text, not of a grep that never ran.

Whole-tree control at the same commit, `git grep -l` over every tracked file:

```
$ git grep -l -i 'autostash' c4e8f8264511b53d1ad93f67dc0901eedbe5355a | wc -l     # 1 file: .beads/issues.jsonl
$ git grep -l -- '--no-ff'  c4e8f8264511b53d1ad93f67dc0901eedbe5355a | wc -l     # 1 file: .beads/issues.jsonl
$ git grep -l -i 'porcelain' c4e8f8264511b53d1ad93f67dc0901eedbe5355a | wc -l    # 45 files: .beads/issues.jsonl, docs/workbench/receipts/wb-hqa.2.md, new-feedback/* metadata pins, ...
```

So for the two tokens that define the recipe the absence extends beyond the 7 paths to the whole tracked tree except the beads export, where `autostash` appears only inside the notes of two beads (`wb-jwc.7`, `wb-ulnv`) describing the 2026-11-05 recovery, and `--no-ff` inside the records of three closed beads (`wb-752.3`, `wb-a2g.1`, `wb-6ze.27`). A reader of the contributor docs at this commit learns that worktrees exist (`README.md`, 27 mentions) and that landings exist (`15-implementation-program.md`), and nothing about how `master` receives trunk. The 7 paths are the ones a contributor would open first; they are not every markdown file in the repo (`docs/workbench/` holds 21 numbered docs, `00-current-state-and-source-map.md` through `20-evidence-loader-contract.md`, of which the table reads 2, plus `TRACEABILITY.md`, `feature-matrix.md` and a `receipts/` subtree, which I did not count individually — the whole-tree `git grep` covers them for `autostash` and `--no-ff`, and for `porcelain` I did not open each of the 45 hits).

## Finding 4 — the rows that adopted the recipe rank the clean-index assertion as the necessary cure and `--no-autostash` as belt-and-braces — **CONFIRMED** as quoted text; the sufficiency sub-claim is **PLAUSIBLE**

- CONFIRMED — M:60239 (`evolution-triage-completed`, 2026-11-06T03:09:50Z) says: "R1 merge-loss prevention SURVIVES rank 1 (clean-index refusal + durable-baseline delta; the autostash-config prevention claim REFUTED by scratch git 2.50.1 repro)". M:60240 (R-B621, same stamp) says: "PRIMARY requirement per the owner order: K1 merge safety - (a) pre-merge clean-index refusal (git status --porcelain -uno empty + no lock holder; --no-autostash belt-and-braces; the config-only prevention claim is REFUTED so the refusal is the necessary cure), (b) post-merge loss detection as a DELTA vs pinned durable baseline refs, (c) monitor shrink-below-cursor typed alert." Both quotes are byte-exact from the rows.
- PLAUSIBLE — that `--no-autostash` alone would not have prevented the 2026-11-05 loss. The rows assert it from a repro I did not re-run; the artifact is the dossier the rows name (`scratch/fw-rows-backup/evolution-20261105-dossier.json`, `163272 bytes` per M:60239), which I did not open. What the two observed merges prove is narrower than either claim: with a tree asserted clean, the flag and the merge together lost nothing — they do not test the flag on a dirty tree. So any promoted recipe should keep both halves, the assertion and the flag, as the rows do; the assertion is the half with the stronger evidence behind it.

## Evidence

- `machines/flywheel/ledger/metrics.jsonl` (M:n = line n; 60,659 lines at my read): M:60001 and M:60467 are the only two `master-merge` rows in the file (a `python3 -I` pass over every row: 2 rows of that kind in the whole ledger, both with `utc` inside the window). Window bounds by `utc`: first row M:58275, last row M:60593, 2,319 rows. Landing-family kinds inside the window: `landing-gate` 33, `landing-post-result` 75, `fold-done` 33, `landing-staged` 32, `landing-gate-try` 1, `landable` 1, `landing-compose-result` 1, `master-merge` 2.
- Motivation rows: M:59314 (`machine-defect`, 2026-11-05T16:03:51Z, bead wb-2b41, about the 15:14-15:17Z rewrite), M:59333 (`correction`, 16:09:44Z), M:59338 (`tune-candidate`, 16:11:27Z, `idem` `cand-g1023-merge-autostash-hazard`), M:60239 (`evolution-triage-completed`, 2026-11-06T03:09:50Z), M:60240 (R-B621, same stamp) — quoted in the out-of-scope paragraph under Summary and in Finding 4. M:59956 (R-B618, `ruling-bound`, 2026-11-06T00:09:11Z) is cited only to gloss M:60001's method string.
- Graph facts from this clone's object store after `git fetch -q origin` at 2026-11-06T08:34:29Z: `origin/workbench/implementation-program` = `c4e8f8264511b53d1ad93f67dc0901eedbe5355a`; `origin/master` = `85c9b80fdad430bfcff5b130dc538fd8fdf13874`; `origin/HEAD` -> `origin/master`; `git ls-remote` agrees with both. `15de5c51` (the second merge's trunk parent) is an ancestor of `c4e8f826`, 3 commits behind it (`git rev-list --count`). Neither merge commit is an ancestor of trunk (`git merge-base --is-ancestor <merge> origin/workbench/implementation-program` rc 1 for both), which is the expected shape: trunk flows into `master`, not back.
- Doc counts: the table in Finding 3, from `git show c4e8f826...:<path>` piped to `grep -c` per token, plus `git grep -l` over the whole tree at the pin for the two defining tokens.
- Installed-tool pin: `pi --version` -> `1.2.0`; `readlink -f "$(command -v pi)"` -> `/local/home/jehallad/.pi/agent/bin/pi`; `ls ~/.pi/agent/install/releases/` -> `1.2.0`; `find ~/.pi/agent/install -maxdepth 6 -type d -name 'pi-subagents*'` -> 0 hits (the same `find` root lists `releases/1.2.0`, so the traversal ran).

## Suggested fixes, cheapest first

1. **Write the recipe into `docs/workbench/17-packaging-and-operations.md`** (the operations doc; it already names worktrees twice) as the integration procedure for `master`: a fresh detached worktree on the `master` tip; `git status --porcelain --untracked-files=no` must print nothing before anything else runs; `git merge --no-ff --no-autostash <trunk-sha>`; a plain (no-force) push; `git ls-remote origin refs/heads/master` read back and compared to the merge sha; worktree removed. One paragraph and five commands; the two ledger rows above are the worked example. This is the ask of this file. The implementing team decides between that doc and `IMPLEMENTATION_GUIDE.md`; either reaches a contributor before the ledger does.
2. **One line in `AGENTS.md`'s git section** (the context file every agent session loads): "integration merges into `master` run in a fresh worktree whose tracked files are clean, with `--no-ff --no-autostash`, never with autostash". Cheaper than 1 and reaches agents; it does not explain why, so pair it with 1 when 1 lands.
3. **Make the precondition executable** — a small script (or a check in whatever script the owner lands merges with) that refuses to merge when `git status --porcelain --untracked-files=no` is non-empty, printing the dirty paths. The machine is building its own copy of this under g10.23 K1(a) (M:60240) for its repository; a repo-side twin would make the recipe a contract for this repository too rather than a habit two rows happen to record. Cost: one script and one test; the implementing team decides whether this repository or the machine owns it. Do not fix it by setting `merge.autostash=false` alone and calling it done: M:60239 records that the config-only form was refuted by a repro, and this file's two successes do not test it (Finding 4).

## Positives worth protecting

- **The pre-merge clean assertion is in the record, with its reading** — M:60467: "git status --porcelain --untracked-files=no read 0 (asserted before merge)"; M:60001: "clean temp rig worktree (porcelain -uno 0)". A refactor of the operator recipe that keeps `--no-autostash` but drops the assertion loses the half with the stronger evidence (Finding 4); a refactor that keeps the assertion but stops writing its reading into the row loses the only thing that let this file verify it after the worktree was removed.
- **`--no-autostash` is spelled on the command even when the tree is asserted clean** — both rows. Belt-and-braces by the machine's own words (M:60240); keep the explicit flag rather than relying on a repository or global `merge.autostash` setting, which a fresh worktree or a different host would not carry.
- **`--no-ff` keeps two-parent provenance, and the merge subject names the trunk tip and the landing range** — "Merge workbench/implementation-program (landings through 1003, trunk 15de5c51da08) into master ..."; `git log --first-parent origin/master` therefore reads as a list of integration events (`85c9b80f`, `0b25e14e`, `b27829e6`, then the 2026-11-05 feedback landings), and `git diff --shortstat <first-parent> <merge>` reproduces the row's "12 files, +14257/-1587" exactly. A fast-forward would have erased both the event and the subject.
- **A fresh temporary worktree, removed after the push** — the clone whose object store the machine's live land-/gate- worktrees share is never checked out to `master` and its index is never the merge's index. Any "simplification" that merges in the main clone re-creates the dirty-index exposure the 2026-11-05 incident was about (in the other repository), and in this one it would also contend with the gate worktrees' object store.
- **No-force push plus `ls-remote` read-back, and the read-back is in the row** — "origin/master ls-remote read back 85c9b80f... after a no-force push". My own `ls-remote` 2 h 16 min 31 s later reads the same tip. Keep the read-back in the row: a push receipt is not a landing, and the row is where a later seat looks.
- **The row carries an `idem` key and the authority** — `master-merge-20261106-85c9b80f`, "USER standing order 2026-11-06 ~00:34Z (merge work into master at each 6h Continuity check)". That is what makes two rows a complete population (Evidence, first bullet) rather than two sightings.

## What I did not establish

- That the commands were run as the method strings say. I did not run either merge and did not read a producer transcript; the method fields are the orchestrator's self-report. What I verified independently is the graph (parents, dates, ancestry, diff stat), the remote tip and the subjects — consistent with the rows, not a recording of them. The temporary worktrees were removed, so nothing remains to re-check the `porcelain` reading against.
- That `--no-autostash` alone would, or would not, have prevented the machine-repository loss (Finding 4, PLAUSIBLE); the repro the rows cite is in a dossier I did not open.
- That the autostash sequence caused the 2026-11-05 loss in the machine repository (the out-of-scope paragraph under Summary, carried at the producer's PLAUSIBLE); I did not read that repository's reflog or `refs/recovery/*`, and the incident is motivation here, not a claim of this file.
- That the 7 paths are the complete contributor-doc surface. The whole-tree `git grep` extends the absence of `autostash` and `--no-ff` to every tracked file except `.beads/issues.jsonl`; for `porcelain` (45 tracked files) I did not open each hit; the 14 in `new-feedback/` were classified from their `git grep -n` line text (11 metadata-only, 3 with probe or gate text), not by reading each file.
- That the recipe is absent from the machine's own operating contract. The scope here is this repository's contributor docs; the machine's STANDARDS and BUILD-PLAN (M:59338 names "BUILD-PLAN section 4.2") were not searched for it.
- Any installed pi-subagents extension build. `pi` 1.2.0 is the runner; no pi-subagents build was found under `~/.pi/agent/install`, and nothing here needed one.
- The ledger's state after my read: 60,659 lines at `sed -n` time; it is append-only and later rows may extend or correct the ones quoted.

## Postscript — where prior art has to be read for this repository

The three 2026-11-04 and 2026-11-05 feedback files from this seat sit on `origin/master` (landed there at `2026-11-05 09:47:26 +0000` as `cd701fe849`, `469be63867`, `03426da428`, per `git log --first-parent origin/master`) and not on `origin/workbench/implementation-program` (41 entries at `c4e8f826` versus 44 at `85c9b80f`; `comm -13` lists exactly those three), while the 2026-11-02 deposit landed on trunk (`01deac5464`, "merge: land machine feedback deposit 2026-11-02"). A prior-art check for this repository therefore has to read both refs; this file's check did. Which branch the owner lands a dated feedback branch on is the owner's call, and the README's "a branch the program owner lands" covers both; the point is only that a one-ref `ls-tree` under-lists the inbox by three files today.
