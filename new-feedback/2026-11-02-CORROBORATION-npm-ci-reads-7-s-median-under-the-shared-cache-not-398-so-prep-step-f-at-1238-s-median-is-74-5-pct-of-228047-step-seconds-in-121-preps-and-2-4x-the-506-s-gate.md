# CORROBORATION: `npm ci` reads 7 s median under the shared cache, not 398, so PREP step F at 1,238 s median is 74.5 percent of 228,047 checklist step-seconds in 121 preps and 2.4x the 506 s landing gate

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle: the window 2026-11-01T07:55Z..2026-11-02T07:55Z against its 2026-10-19T08:00:34Z..2026-10-20T08:00Z; a fresh parse of a ledger that grew from 7,485 lines (M:7485 is the last row before its window closed) to 47,457 in between; 122 `gate-start` rows against its 25, and three row kinds it could not read because they did not exist yet (`prep-done` and `gate-stage` first appear at M:7612/M:7613, 2026-10-20T12:29Z; `landing-gate` at M:8439, 2026-10-21T06:14Z). A later window with a wider instrument, not a re-run of the same rows.
**Date:** 2026-11-02 (ledger window: rows whose `utc` is at or after 2026-11-01T07:55:00Z and before 2026-11-02T07:55:00Z; stamp 2026-11-02T07:55Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `5779ecaf116178b603edd10e40655bd3acf7c2a5` at 07:55Z, the landing-814 hop (`ledger: close wb-ey9p .. wb-jwc.11 (landings 813..814, batch B813-814-d418fee-t1, merge 69d08250)`, committed 2026-11-02T07:51:34Z). After `git fetch -q origin` (rc 0) the fetched ref stood, at read time, at `00b18a9c0eae8098414bfa7db6d8d55723d2c8ec` (2026-11-02T08:33:02Z, landing 817, 9 commits later); `git merge-base --is-ancestor 5779ecaf11 origin/workbench/implementation-program` exits 0, and `git diff --stat 5779ecaf11 00b18a9c0e -- new-feedback/ docs/ AGENTS.md CONTRIBUTING.md README.md qa/ test/helpers/census.ts forge.toml package.json package-lock.json` prints nothing, so every `path:line` below holds at both shas. The corroborated file was at `ba3e4ff`. The gate seats' procedure is machine-side, not this repository's: `machines/flywheel/generations/g10-gate.js` read at machine commit `be782191` (the file's last change, 2026-11-01T10:43:25Z; blob `403a7ab9`; machine repo HEAD `46236380` at read time — that HEAD moves with every ledger commit, so the file's last-change sha and its blob are the stable pins), with `git log -S` over the machine repo for the commit that introduced the cache. The rig clone's checked-out HEAD `188ae59016` sits 2,450 commits behind the fetched ref with 16 dirty paths before this file and its 2026-11-02 sibling were written (18 with them, every one an untracked `new-feedback/` file); nothing was read from its working tree, and trunk was neither checked out nor pushed from the main clone (live gate and land worktrees share its object store). Delivery: branch `machine/flywheel/feedback-2026-11-02`, cut from a detached worktree.
**Method:** read-only `python3 -I` passes over `machines/flywheel/ledger/metrics.jsonl` (47,457 lines at the first read, 47,459 at the second; the window is M:44048..M:47330, 3,283 rows, first `utc` 2026-11-01T07:55:02Z, last 2026-11-02T07:54:50Z; `M:n` is the 1-based line number). Medians are `statistics.median` (the mean of the two middle values at even n). One whole-file pass computed per-day medians of `gate-start.installSeconds` and the three `prep-done` walls and found the first row carrying `installCacheDir`. `git show`, `git grep` and `git ls-tree` at `5779ecaf11` and at the fetched ref; `git grep -c` and `git log -S` in the machine repo; the three `land-prep.out` receipts still on disk (`/tmp/fw-landchain-wb-021.2-L806`, `-wb-v03p-L809`, `-wb-ts6.3-L810`, volatile); one archived prep read for its step stamps (`~/s3/artifacts/flywheel/gate-prep-6/2026-11-01-wb-khhg-g10-gate-s174-prep/`). No test, gate or mutant ran in this lane: every red/green count quoted is a gate seat's own, copied from a row or an archive.
**Scope:** feedback about `pi-subagents`' landing convention as an orchestrator pays for it — what one landable cut costs between its queue entry and its merge, and which step carries that cost — not about the refused beads' substance and not about the machine's scheduler. The PREP steps (A–G) are the flywheel's procedure, written machine-side; this file names where the seconds go so that the repository's open product request (a census helper assertion, the 2026-10-29 file's Finding 6, re-checked in the 2026-11-01 n=3 file's Finding 5) can be ranked by the number it would move. The 11-01 n=3 file's claim-class census is re-checked here as table rows, not re-argued. The rig-side consequence the title leaves implicit: the repository's own executable steps — `npm ci` 8 s, the targeted suites 198 s, the seven-step landing gate 506 s, all medians — come to 712 s against the 2,339 s PREP median alone, and the open helper-assertion request (Recommendation 1) is the only in-repo change in this thread that moves the 1,238 s number. The orchestrator's packet asked for a rig test-infra file only if the rig's own steps dominate a prep; they do not, so this file is filed as the re-check the corroborated trunk file is owed (its install claim no longer reproduces) plus the weight that ranks that open request.
**Corroborates:** [`2026-10-20-npm-ci-in-25-gate-worktrees-cost-13098-s-3-6-h-in-24-h-median-398-s-max-1176-s-so-a-shared-offline-cache-or-node-modules-snapshot-would-return-about-a-seat-hour-per-gate-lane.md`](2026-10-20-npm-ci-in-25-gate-worktrees-cost-13098-s-3-6-h-in-24-h-median-398-s-max-1176-s-so-a-shared-offline-cache-or-node-modules-snapshot-would-return-about-a-seat-hour-per-gate-lane.md) — verdict **FIXED** at `5779ecaf11` on its title claim (the 24 h install cost is gone: 1,053 s over 122 `gate-start` rows against its 13,098 s over 25; its fix 1 is implemented verbatim machine-side); independent hit 2 (the same seat, a later cycle, a different window and three row kinds the original could not read). Where the per-landing cost now sits is this file's title claim (Findings 2 and 3), a restatement the corroborated file had no rows to make. The 2026-11-01 n=3 corroboration of the claim class (unlanded; it travels on `origin/machine/flywheel/feedback-2026-11-01` at `aabfb754a62145e8dce3c447f3ad1d1f81994d9b`) is re-checked in the second verdict table below (its Findings 1, 4 and 5 reproduce) and is named in full there and in the 'Already filed' table, not on this line, so that this line resolves on a trunk-cut worktree where that branch's files are absent.
**Prior art:** at the fetched trunk ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 18 entries (17 files + `README.md`, last dated 2026-10-25); the union of the same listing over the 15 `origin/machine/flywheel/feedback-*` branches holds 38 unique paths, 20 of them files that live only on a branch. The filename grep `prep|checklist|install|npm|cache|step-f|substance|per-landing|cost|seat-hour|f-step|mutant|hollow` over the union hits 7 paths: the corroborated file (the only one on install), the 2026-10-18 mutant-battery file, the 2026-10-23 docs09 corroboration, the 2026-10-26 positive, the 2026-10-31 R-B162 fresh-PREP file (the load-shaped timing class — adjacent, a different mechanism, cited not restated) and the two 2026-11-01 corroborations. The body grep (`git grep -l -F <token> <ref> -- new-feedback/`, unioned over the 16 refs) gives `installSeconds` 2 files (the corroborated file; one row quote in the 2026-10-31 istypenode file), `prep-done` 2 (kind counts in the 2026-10-26 and 2026-10-31 files), `checklistStepSeconds` 1 (one row's field, `{"D": 183, "F": 370, "G": 0}`, in the 2026-11-01 sibling-census file at :114 — never an aggregate), `npm-cache` 0 and `step F` 0. Nobody re-checked the install claim and no file carries the step split; that is what this file adds.

## Why a second file rather than an edit

The corroborated file carries its own window (25 rows, 2026-10-19/20), its revision (`ba3e4ff`) and its method (`gate-start.installSeconds` only); it is not edited. A separate file keeps the two windows separable — the install cost at `ba3e4ff` and at `5779ecaf11` are two measurements, and the FIXED verdict only means something if both stay readable side by side. It also keeps the append-only rule this directory's README states, and spares every writer the merge conflict a shared file imposes under concurrent filing.

## What this adds

- **A new revision:** at `5779ecaf11` the corroborated file's title claim no longer reproduces — 122 `gate-start` rows in 24 h carry `installSeconds` median 7 s, maximum 27 s, sum 1,053 s (its 25 rows: median 398 s, maximum 1,176 s, sum 13,098 s), and 122 of 122 carry `installCacheDir` ending in `/state/npm-cache`, which is its fix 1 (`npm_config_cache=<shared>`) as the machine implemented it on 2026-10-20 (Finding 1). The verdict word on the Corroborates line carries this result.
- **A new measurement:** where the per-landing cost went, which the original had no rows to read. The 121 `prep-done` rows of the window carry the g10.18 step stamps `checklistStepSeconds {"D","F","G"}`, and step F — the seat-run substance-rules step — holds 169,934 of 228,047 step-seconds (74.5 percent), median 1,238 s per prep, against a landing gate (`landing-gate.stageSeconds.gate`) of 506 s median and a complete-gate wall (`gate-pass.wallSeconds`) of 433 s median (Findings 2 and 3). The repository's own executable steps (`npm ci` 8 s, the targeted vitest suites 198 s median) are not where a landing's time goes. The template asks for one shape; this file carries two and names both.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| 25 `npm ci` walls summed to 13,098 s in 24 h at median 398 s; fixes 1–3 (shared cache, `node_modules` snapshot, `--offline`); install tracks load | the corroborated file, Findings 1–2 and its fix list |
| 74 of 77 refusals name R514/R515/R668 at a PREP F stage; 192,198 prep-seconds; the ladder's caps and exits; 0 of 5 contributor-doc paths name the class; `test/helpers/census.ts` exports no claim symbol | `2026-11-01-CORROBORATION-n-3-74-of-77-refusals-in-24-h-name-r514-r515-r668-at-192-198-prep-seconds-19-exits-and-28-caps-froze-the-class-and-0-of-5-contributor-doc-paths-name-it.md` (branch `feedback-2026-11-01`), and the two files it corroborates (2026-10-26, 2026-10-29) |
| the product-side request: a claimed-set block plus one helper assertion that reds a census file-alone when a header claim names a member outside the pinned set | the 2026-10-29 corroboration, Finding 6; re-checked STILL-TRUE in the 11-01 n=3 file, Finding 5, and in Finding 5 here |
| fresh PREP timing reds under load (the R-B162 class) and the g10.19 cycle boundary | `2026-10-31-CORROBORATION-r-b162-ruled-the-load-shaped-fresh-prep-class-a-4th-time-at-landing-738-w21-62-78-the-only-2-real-reds-of-33-and-the-stop-set-the-g10-19-cycle-boundary.md` (branch `feedback-2026-10-31`) |
| the rule-16 frozen-shape leg lives only in the machine's standing rules and a byte-frozen doc; no contributor doc shows the literal | `2026-10-20-the-rule-16-frozen-shape-assertion-lives-only-in-the-machine-standing-rules-and-the-byte-frozen-traceability-md-so-10-of-13-gate-refusals-in-24-h-cite-it-and-no-contributor-doc-shows-the-literal.md` (trunk) |
| a mutant battery run against the real tmpdir removed a sibling gate's scratch | `2026-10-18-a-mutant-battery-of-the-scratch-helper-ran-against-the-real-tmpdir-and-removed-every-child-of-the-shared-session-root-42-to-0-in-two-minutes-while-a-sibling-complete-gate-truncated.md` (trunk) |

## Summary, with numbers

In the 24 h window the metrics ledger holds 3,283 rows (M:44048..M:47330). The install the corroborated file measured is gone as a cost: 122 `gate-start` rows carry `installSeconds` median 7 s, maximum 27 s, sum 1,053 s, and every one of the 122 names the machine's shared cache directory; at the corroborated median the same 122 installs would have cost 48,556 s. The cost did not vanish from a landing, it moved. F's share of D+F+G (74.5 percent) is arithmetic over the three stamped checklist steps and does not include install, so it would read 74.5 percent at a 398 s install too; what the fall changes is the ranking of a landing's costs, not F's share. Over the 121 `prep-done` rows the three stamped checklist steps sum to 228,047 step-seconds: D (identity, scope, two-arm rule, merge-tree targeted suites) 43,001 s = 18.9 percent at 314 s median, F (the full substance-rule set, record honesty, the mutant legs) 169,934 s = 74.5 percent at 1,238 s median, G (red reproduction) 15,112 s = 6.6 percent at 91 s median; F exceeds D + G on 111 of 121 rows. The same rows put `installSeconds` at 8 s median (sum 1,275 s) and `targetedSuiteSeconds` at 198 s median (sum 23,572 s). The stage ledger agrees: `gate-stage` prep median 2,339 s (n=121, sum 302,081 s = 83.9 seat-hours), bind 1,277 s (n=117), while the 42 `landing-gate` rows of the window (42 of 42 pass) ran the seven-step forge gate in 506 s median and the 41 `gate-pass` rows report a complete-gate wall of 433 s median — PREP is 4.6x the landing gate and step F alone 2.4x. What F judges in this window is the class the 11-01 file counted: 76 `gate-refused` rows, 75 of 76 at a PREP F form, 72 of 76 naming R514, R515 or R668 in `reason` (75 of 76 anywhere in the row), 197,687 prep-seconds = 54.9 seat-hours, 63 of them refusal #2 or later carrying 169,241 s. Repository-side, nothing moved between `aa9ea0d8c8b1` and `5779ecaf11` on the re-checked claims: 0 contributor-doc files name the class against a control of 3, `test/helpers/census.ts` still exports no claim symbol, and `NOT CLAIMED` now sits in 112 test files (from 88). The one archive read puts the F split at 1,031 s to a second F stamp plus 261 s after it, for one prep; the split across the 121 is UNDETERMINED.

## Finding 1 — the corroborated file's fix 1 is implemented machine-side and the 24 h install cost is gone: 122 of 122 `gate-start` rows carry `installCacheDir=…/state/npm-cache`, `installSeconds` median 7 s, maximum 27 s, sum 1,053 s — **CONFIRMED** (re-check verdict **FIXED**); the cache's causal share of the fall — **PLAUSIBLE**

The corroborated file's fix 1 read: "A shared `npm` cache directory on the gate host (`npm_config_cache=<shared>`) populated once per lockfile change, so `--prefer-offline` actually hits; today no `npm_config_cache` is set, so each install uses the default `~/.npm` cache while `TMPDIR` points at a fresh `/var/tmp/fwg.XXXXXX`." The machine's g10 gate generation carries exactly that, and the ledger says when it arrived:

```
$ sed -n '40p' generations/g10-gate.js          # machine repo, HEAD 46236380, file last changed be782191
const INSTALL_CACHE_DIR = `${FW}/state/npm-cache`
$ grep -n -o 'mkdir -p ${INSTALL_CACHE_DIR}; export npm_config_cache=${INSTALL_CACHE_DIR}; npm ci --prefer-offline --no-audit --no-fund (record seconds)' generations/g10-gate.js
115:mkdir -p ${INSTALL_CACHE_DIR}; export npm_config_cache=${INSTALL_CACHE_DIR}; npm ci --prefer-offline --no-audit --no-fund (record seconds)
$ git log --format='%h %cI %s' -S'INSTALL_CACHE_DIR' -- generations/
f5b8f03c 2026-10-20T11:54:45Z g10 build: pipelined gate lane + work lane + dispatcher + ledger/audit (reviewed+fixed; fi…
$ grep -c 'npm_config_cache' generations/g7-gate.js generations/g8-gate.js generations/g9-gate.js generations/g10-gate.js
generations/g7-gate.js:0
generations/g8-gate.js:0
generations/g9-gate.js:0
generations/g10-gate.js:1
```

`g10-gate.js:115` is step C of the PREP procedure (`C. WORKTREE: git -C ${RIG} worktree add --detach ${WSROOT}/<seat>-<bead> <tip>; …`), so the install still runs in a fresh detached worktree per gate — the positive the corroborated file asked to protect. The first ledger row carrying the field is the cache fill, and the window's rows are the steady state (the three rows are field selections in row order; `…` marks the keys dropped — `branch`, `commit`, `base`, `pickOrder`, `pickOrderReason`, `actor` — and the `installCacheDir` value is cut to its tail):

```
M:7599 {"kind": "gate-start", "bead": "wb-0kg.11", "seat": "gate-prep-2", …, "installSeconds": 798, "load1AtStart": "277.64", "installCacheDir": ".../machines/flywheel/state/npm-cache", …, "utc": "2026-10-20T12:15:25Z", "run": "g10-gate-smoke1", "gen": "g10", …}
M:8577 {"kind": "gate-start", "bead": "wb-hk9l", "seat": "gate-prep-2", …, "installSeconds": 16, "load1AtStart": "247.28", "installCacheDir": ".../machines/flywheel/state/npm-cache", …, "utc": "2026-10-21T08:25:18Z", "run": "g10-gate-s6", "gen": "g10", …}
M:44061 {"kind": "gate-start", "bead": "wb-t8my", "seat": "gate-prep-7", …, "installSeconds": 15, "load1AtStart": "66.65", "installCacheDir": ".../machines/flywheel/state/npm-cache", …, "utc": "2026-11-01T08:01:05Z", "run": "g10-gate-s174", "gen": "g10", …}
[gate-start] n=122 installSeconds n=122 median=7.0 max=27.0 sum=1053.0 installCacheDir=state/npm-cache 122 of 122
```

The per-day medians over the whole ledger (the Evidence table) read 341 s on 2026-10-19 (n=16) and 383 s on 2026-10-20 (n=55), then 18 s on 2026-10-21 (n=54), 11–16 s on every day from 2026-10-22 to 2026-10-31 (n=39..151 per day), 7 s on 2026-11-01 (n=124) and 8.5 s on 2026-11-02 up to the stamp (n=42). The corroborated file's title claim — 13,098 s in 24 h at median 398 s — does not reproduce at `5779ecaf11`: **FIXED**, and by the machine's cache rather than by a rig commit (no change to `package.json`, `package-lock.json` or `vendor/` is needed to explain a 7 s `npm ci`; the `--prefer-offline --no-audit --no-fund` flags are the ones the original called right).

What keeps the causal share at **PLAUSIBLE** rather than CONFIRMED: the g7 rows of 2026-10-18 (n=36, no machine cache — `g7-gate.js` sets no `npm_config_cache` — median 6 s, maximum 122 s) show that a fresh-worktree `npm ci` was already fast the day before the slow window, and the g10 rows of 2026-10-20 (n=24, cache set from 11:54Z, median 417.5 s) show it still slow for the rest of the day the cache arrived; the drop to 18 s came on 2026-10-21. The runtime state not exercised is the same tip installed with and without `npm_config_cache` at the same load. What is CONFIRMED is the time series and the fact that every window row ran with the cache. Within the window the install still tracks load, at one thirtieth of the old scale: the lowest-load quartile (load1 14.11..31.18, n=30) installs in 6 s median, 8 s maximum; the highest-load quartile (load1 70.8..160.2, n=30) in 13 s median, 19 s maximum; the 20 rows at load1 >= 80 in 14 s median, 19 s maximum.

## Finding 2 — PREP's cost sits in step F: over 121 `prep-done` rows `checklistStepSeconds.F` is 1,238 s median and 169,934 s in sum, 74.5 percent of 228,047 step-seconds, against install 8 s and the targeted suites 198 s median — **CONFIRMED**

The g10.18 K3 stamps make the attribution a one-pass read. The procedure that produces the row:

```
$ grep -n -o 'Write ${ROW_PREFIX} metrics --kind prep-done --bead <bead> --seat <seat> --installSeconds <measured> --checklistSeconds <measured> --targetedSuiteSeconds <measured> --loadAtPrep <pick.loadAtPrep> --checklistStepSeconds .{0,60}' generations/g10-gate.js
175:Write ${ROW_PREFIX} metrics --kind prep-done --bead <bead> --seat <seat> --installSeconds <measured> --checklistSeconds <measured> --targetedSuiteSeconds <measured> --loadAtPrep <pick.loadAtPrep> --checklistStepSeconds '{"D":<n>,"F":<n>,"G":<n>}' (g10.18 K3-R13/A10: the three measured ch…
```

and the three steps the stamps bracket, as the same file words them (`g10-gate.js:116`, `:118`, `:119`, each trimmed to its opening clause):

```
116:D. CHECKLIST (record each): merge-base --is-ancestor base tip; 14e78f1 CONTENT must not survive - TWO-ARM RULE (owner 12:17Z), and the verdict MUST report WHICH ARM each of the four guarded files passed under, …  MERGE-TREE TARGETED SUITES …
118:F. SUBSTANCE RULES: apply the FULL landed substance-rule set exactly as the g8 gate did (TITLE-CENSUS ACCEPTANCE floor incl. parse-aware-or-reporter-verified, independently-authored falsifiers, head-misattribution, assertion-reached third leg + each-liveness + vacuous-title payload form, rendered-text docs truth, section-bound + same-view + heading-uniqueness, marker-class check, names-only projections, docs-census landing-order rule + state/landing-order-registry.json as the SOURCE, collapsed-readings class, paired divergence probe, note-honesty clean-claim scope, pin-flip probe floor, known-conflict registry by reference, frozen-shape assertion rule 16) - these rules are UNCHANGED from g8 and live in the standing rules + BOUNDARY + bead notes; any unmet rule = RESPIN with the unmet list. …
119:G. RED REPRODUCTION: run the delivery note's red command with the new src module(s) moved aside (or at the base blob), record the failure text and counts; restore byte-identical (sha256 before/after, porcelain empty); run the targeted green and record counts. …
```

One row, verbatim, and the pass over all 121:

```
M:44050 {"kind": "prep-done", "bead": "wb-khhg", "seat": "gate-prep-6", "installSeconds": 6, "checklistSeconds": 1555, "targetedSuiteSeconds": 198, "loadAtPrep": 38.01, "checklistStepSeconds": {"D": 100, "F": 1028, "G": 194}, "utc": "2026-11-01T07:55:47Z", "run": "g10-gate-s174", "gen": "g10", "actor": "flywheel"}
[prep-done] n=121 installSeconds: n=121 median=8.0 sum=1275.0 min=5.0 max=50.0
[prep-done] n=121 checklistSeconds: n=121 median=1794.0 sum=237136.0 min=803.0 max=4287.0
[prep-done] n=121 targetedSuiteSeconds: n=121 median=198.0 sum=23572.0 min=7.0 max=547.0
[prep-done] checklistStepSeconds present in 121 of 121 rows (missing 0, unparsable 0); total step-seconds 228047.0
   step D: n=121 median=314.0 sum=43001.0 (18.9% of step-seconds) min=50.0 max=1027.0
   step F: n=121 median=1238.0 sum=169934.0 (74.5% of step-seconds) min=359.0 max=3435.0
   step G: n=121 median=91.0 sum=15112.0 (6.6% of step-seconds) min=18.0 max=668.0
   rows with F > D+G: 111 of 121
```

Per row, F is 0.731 of `checklistSeconds` at the median (range 0.343..0.913 over the 117 rows left after keying by bead and run; four rows share a key). The stamps account for the checklist total: `checklistSeconds - (D+F+G)` is 21 s median (range -197..704; 2 of 117 rows negative). Joined to the verdict that followed each prep — per `prep-done` row, the first `gate-pass` or `gate-refused` row with the same bead and run after it and before that key's next `prep-done` row, each verdict row used once — F is 1,431.5 s median on the 76 preps that ended refused and 1,108 s on the 39 that ended in a pass; 6 preps have no verdict row in the window (F 1,642.5 s median), and 2 of the 41 `gate-pass` rows (M:44106 wb-i3p4, M:44155 wb-a6m9) follow `prep-done` rows written before 07:55Z (M:43983, M:44046). The key-level join — the last `prep-done` row per bead+run against every verdict of that key; 117 keys, 4 of them with two preps in one run — reads 73 refused-only at 1,446 s, 37 pass-only at 1,095 s, 1 key carrying both kinds (`wb-ey9p` in `g10-gate-s179`: refused M:46094, passed M:47268) at 2,240 s and 6 with no verdict at 1,642.5 s. The repository's executable steps — `npm ci`, `vitest` on the delivery's own suites plus the merge-tree targeted set — are 8 s and 198 s of a 2,339 s prep; the seat-run substance-rules step is where a landing's time goes, and it is the step that produces the refusals of Finding 4.

## Finding 3 — the stage ledger puts PREP at 2,339 s median (n=121) against a 506 s landing gate (n=42, 42 pass) and a 433 s complete-gate wall (n=41): 4.6x, and step F alone 2.4x — **CONFIRMED**

```
[gate-stage] n=358
   stage prep: n=121 median=2339.0 sum=302081.0 max=5125.0
   stage gate: n=120 median=0.0 sum=45437.0 max=1605.0          (77 rows at 0 and 43 non-zero rows at 1,021 median; the refusal fast path writes 0 on all 76 refused rows)
   stage bind: n=117 median=1277.0 sum=162401.0 max=2330.0
   bind joined (nearest verdict row by bead+run, each verdict used once): gate-pass n=41 median=1790.0 sum=72450.0
   bind joined (nearest verdict row by bead+run, each verdict used once): gate-refused n=76 median=1147.5 sum=89951.0
   prep stage minus (install+checklist+targeted), prep-done joined to gate-stage prep by bead+run in row order: n=121 median=341.0 sum=40098.0 min=-166.0 max=786.0   (302,081 - (1,275 + 237,136 + 23,572) = 40,098; the sum is pairing-invariant and a nearest-row join gives the same median)
[landing-gate] n=42 verdicts={'pass': 42} stageSeconds.gate n=42 median=506.0 sum=21884.0 min=371.0 max=1294.0; setup n=42 median=8.0
[gate-pass] n=41 wallSeconds n=41 median=433.367; gateSeconds n=41 median=1013.0; prepSeconds n=23 median=2268.0
   stepMs rows 40; total step-ms 18240607.0
   step test: n=40 median=313421.5 sum=13522394.0 (74.1%)
   step census: n=40 median=53704.5 sum=2230282.0 (12.2%)
   step typing: n=40 median=44406.5 sum=1880226.0 (10.3%)
   step build: n=40 median=7474.0 sum=386920.0 (2.1%)
   step package-smoke: n=40 median=3279.0 sum=142655.0 (0.8%)
   step lint: n=40 median=1114.5 sum=49404.0 (0.3%)
   step workbench-shell: n=40 median=621.0 sum=28726.0 (0.2%)
   gate-pass: sum(stepMs)/1000 minus wallSeconds: n=40 median=-1.5 min=-2.7 max=-1.3
```

Three receipts still on disk give the landing gate's stage split line by line (`forge.toml:9` at `5779ecaf11`: `gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]`; `:16-18` `[build.commands.test]` … `timeout = 1200`); the two ledger rows under the grep are field selections in row order, `…` marking the keys dropped:

```
$ grep -n -E 'stage setup|stage gate|step accounting' /tmp/fw-landchain-wb-021.2-L806/land-prep.out /tmp/fw-landchain-wb-v03p-L809/land-prep.out /tmp/fw-landchain-wb-ts6.3-L810/land-prep.out
/tmp/fw-landchain-wb-021.2-L806/land-prep.out:9:land-prep: stage setup 8
/tmp/fw-landchain-wb-021.2-L806/land-prep.out:11:land-prep: stage gate 566
/tmp/fw-landchain-wb-021.2-L806/land-prep.out:12:land-prep: step accounting (R648 readback): steps 7 present; exits lint=0,typing=0,build=0,test=0,census=0,workbench-shell=0,package-smoke=0; unobserved 0; failed_step None
/tmp/fw-landchain-wb-v03p-L809/land-prep.out:9:land-prep: stage setup 33
/tmp/fw-landchain-wb-v03p-L809/land-prep.out:11:land-prep: stage gate 564
/tmp/fw-landchain-wb-v03p-L809/land-prep.out:12:land-prep: step accounting (R648 readback): steps 7 present; exits lint=0,typing=0,build=0,test=0,census=0,workbench-shell=0,package-smoke=0; unobserved 0; failed_step None
/tmp/fw-landchain-wb-ts6.3-L810/land-prep.out:9:land-prep: stage setup 14
/tmp/fw-landchain-wb-ts6.3-L810/land-prep.out:11:land-prep: stage gate 1294
/tmp/fw-landchain-wb-ts6.3-L810/land-prep.out:12:land-prep: step accounting (R648 readback): steps 7 present; exits lint=0,typing=0,build=0,test=0,census=0,workbench-shell=0,package-smoke=0; unobserved 0; failed_step None
M:44066 {"kind": "landing-gate", "bead": "wb-zf7v", …, "verdict": "pass", …, "steps": "lint=0,typing=0,build=0,test=0,census=0,workbench-shell=0,package-smoke=0", "landing": 773, …, "stageSeconds": {"setup": 8, "gate": 514, "judge": 0, "rows": 0}, …, "utc": "2026-11-01T08:02:27Z", …}
M:44106 {"kind": "gate-pass", "bead": "wb-i3p4", "seat": "gate-prep-4", …, "wallSeconds": 445.651, …, "gateSeconds": 1119, "prepSeconds": 2580, …, "stepExits": {"lint": 0, "typing": 0, "build": 0, "test": 0, "census": 0, "workbench-shell": 0, "package-smoke": 0}, "stepMs": {"lint": 1219, "typing": 47269, "build": 7749, "test": 316892, "census": 65719, "workbench-shell": 820, "package-smoke": 4220}, …, "utc": "2026-11-01T08:22:05Z", "run": "g10-gate-s175", …}
```

Two readings of the complete gate disagree by design, not by error: `wallSeconds` (433 s median) is the forge envelope and equals the step sum within 1.3–2.7 s on 40 of 40 rows, while `gateSeconds` (1,013 s median) is the stage's shell wall — `g10-gate.js:180`: `Compute gateSeconds from shell date +%s at stage start/end (includes doctor/wait/timing reading), wallSeconds from the gate envelope/run measurement, never conflate them`. Either way the arithmetic holds: PREP 2,339 s is 4.6x the landing gate's 506 s and 5.4x the complete gate's 433 s wall; step F's 1,238 s is 2.4x the landing gate. The 2,339 s prep decomposes as install 8 + checklist 1,794 + targeted suites 198 + a residual of 341 s median (worktree add, fetch, bead read, archive and row writing — not stamped). The `test` step is 74.1 percent of the complete gate's own step time at 313 s median; the whole seven-step gate costs less than a quarter of one PREP.

## Finding 4 — what step F judges in this window: 76 `gate-refused` rows (43 beads), 75 of 76 at a PREP F form, 72 of 76 naming R514, R515 or R668 in `reason` (75 of 76 anywhere), 197,687 prep-seconds = 54.9 seat-hours, 63 of 76 at refusal #2 or later carrying 169,241 s — **CONFIRMED** (re-check verdict **STILL-TRUE** on the 11-01 n=3 file's Finding 1)

```
[gate-refused] n=76 distinct beads=43; reason names R514|R515|R668: 72; anywhere in row: 75
   reason omits identifiers: [(44673, 'wb-zmez', 1, 'PREP B(i) RE-RUN at PREP end (R539 (i) merge-tree conflict after the trunk move); H not reached'), (46220, 'wb-jwc.6', 6, 'PREP F'), (46907, 'wb-021.1', 3, 'PREP F'), (47039, 'wb-jwc.6', 7, 'PREP F')]
   row omits anywhere: [(44673, 'wb-zmez')]
   refusedAtStage: [('PREP F', 65), ('PREP F (H not reached)', 9), ('PREP F (rule 16 LEG 2)', 1), ('PREP B(i) RE-RUN at PREP end (R539 (i) merge-tree conflict after the trunk move); H not reached', 1)]
   PREP F forms: 75 of 76
   refusalNumber: [('1', 13), ('2', 17), ('3', 18), ('4', 21), ('5', 3), ('6', 3), ('7', 1)]
   prepSeconds n=76 sum=197687.0 (54.9 seat-hours) median=2444.0 min=1660.0 max=5125.0
   refusalNumber>=2: n=63 prepSeconds sum=169241.0
   synthesized true: 76; gateSeconds==0: 76; wallSeconds==0: 76
   reason contains 'LEG 2': 75
   reason contains 'wider than': 52
   reason contains 'hollow': 12
   reason contains 'plant': 24
   reason contains 'tsc rc 0' or 'biome rc 0': 21
   installSeconds on refused rows: n=76 median=7.0 sum=814.0
   checklistSeconds on refused rows: n=76 median=1886.5 sum=156962.0
   targetedSuiteSeconds on refused rows: n=76 median=198.5 sum=14996.0
[ruling-bound] n=84 labels R-B247..R-B329; naming R514|R515|R668: 62
```

The regex `R514|R515|R668` was tested case-sensitively against the `reason` field and against `json.dumps(row)`; the three keyword counts are case-insensitive substrings of `reason`. The orchestrator's packet said "76 of 76"; neither field reproduces it — the three PREP F rows whose `reason` omits the identifiers (M:46220, M:46907, M:47039) name the class elsewhere in the row, and M:44673 (a merge-tree conflict after a trunk move, refusal #1) is the one row that is not this class at all. The last refusal of the window and the ruling it drew, 3 min 40 s after the stamp, describe the work F does — gate-authored mutants run against the delivered census:

```
M:47305 {"kind": "gate-refused", "bead": "wb-wfpj", "utc": "2026-11-02T07:51:06Z", "refusedAtStage": "PREP F", "refusalNumber": 2, "prepSeconds": 2208, "checklistSeconds": 1860, "installSeconds": 14, "survivingMemberCounts": {"U1coordinated": 7, "U2": 5, "U3": 2, "U4": 4, "U5": 1, "surviving": 22, "battery": 28, "killed": 6, "oneEdit": 21, "coordinatedTwoSite": 7, …}}
  reason: "Substance RESPIN at PREP F: refusal #2 on cut #2 (tip 6b46036a on base f5cb9129, entry respin 0; gateBase e23b18e1; probe 2db420ab). Rule 16 LEG 2 is not met (R514/R515/R668 record honesty: claims wider than pins): 22 of 28 gate-authored reader hollowings keep the census at 0 failed | 108 passed (108) on two runs, each tsc rc 0, biome rc 0 and non-equivalent by a paired witness. …"
M:47343 ruling-bound R-B330 (2026-11-02T07:58:40Z, outside the window): "… cut #2 cures refusal #1's named members (43 of 43 replayed red) and the class re-fails through NEW non-equivalent members - 22 surviving gate-authored reader hollowings at 0 failed | 108 passed (108) on two runs, each tsc rc 0 and biome rc 0 with a paired real-tree witness …"
```

Against the 11-01 n=3 file (74 of 77 in `reason`, 76 of 77 PREP F, 192,198 s, 58 of 77 at #2 or later): the share on `reason` is 72 of 76, the stage share 75 of 76, the cost 197,687 s, the respin share 63 of 76 — **STILL-TRUE** on every count it made, with the refusal ordinal now peaking at #4 (21 rows) instead of #2.

## Finding 5 — repository-side, nothing moved between `aa9ea0d8c8b1` and `5779ecaf11`: 0 contributor-doc files name the class against a control of 3, `test/helpers/census.ts` exports no claim symbol (rc 1 against 56 export lines), `NOT CLAIMED` sits in 112 test files (from 88), and no contributor doc names the PREP steps, the mutant battery or record honesty — **CONFIRMED** (re-check verdict **STILL-TRUE** on the 11-01 file's Findings 4 and 5)

```
$ git grep -l -E 'R514|R515|R668|wider than pins|claims wider' 5779ecaf11 -- docs/ AGENTS.md CONTRIBUTING.md README.md qa/; echo "rc=$?"
rc=1
$ git grep -l -E 'R539' 5779ecaf11 -- docs/ AGENTS.md CONTRIBUTING.md README.md qa/; echo "rc=$?"
5779ecaf11:docs/workbench/receipts/wb-752.9.md
5779ecaf11:docs/workbench/receipts/wb-973.10.md
5779ecaf11:docs/workbench/receipts/wb-h8f.6.md
rc=0
$ for p in docs AGENTS.md CONTRIBUTING.md README.md qa; do git cat-file -e 5779ecaf11:$p && echo "exists $p"; done
exists docs / exists AGENTS.md / exists CONTRIBUTING.md / exists README.md / exists qa
$ git show 5779ecaf11:test/helpers/census.ts | grep -n -E '^export .*[Cc]laim'; echo "rc=$?"
rc=1
$ git show 5779ecaf11:test/helpers/census.ts | grep -c '^export '
56
$ git grep -l -F 'NOT CLAIMED' 5779ecaf11 -- test/ | wc -l
112
$ for w in mutant hollow falsifier 'gate-authored' 'record honesty' 'claims wider'; do printf '%-16s files: ' "$w"; git grep -l -i -F "$w" 5779ecaf11 -- docs/ AGENTS.md CONTRIBUTING.md README.md | grep -v 'docs/workbench/receipts/' | wc -l; done
mutant           files: 2        (docs/workbench/TRACEABILITY.md and feature-matrix.md, bead-specific lines)
hollow           files: 0
falsifier        files: 3
gate-authored    files: 0
record honesty   files: 0
claims wider     files: 0
$ git grep -l -i -E 'SUBSTANCE RULES|TITLE-CENSUS ACCEPTANCE|checklistStepSeconds|prep-done|gate-prep|substance-rule' 5779ecaf11 -- docs/ AGENTS.md CONTRIBUTING.md README.md | grep -v 'docs/workbench/receipts/' | wc -l
0                                 (control: the same grep over the whole tree hits 23 files - .beads exports, test files, fixtures, one receipt, two new-feedback files)
```

`docs/workbench/14-qa-and-benchmarks.md:119` (`## Truth labels and release gates`) and `:121` ("Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.") is the nearest contributor-facing sentence: it asks the author for a falsifier and says nothing about the gate authoring its own against the census header, which is what F spends 1,238 s doing. The 11-01 file's fix 1 (one paragraph there naming the class in the gate's own tokens) and the 2026-10-29 file's Finding 6 (a helper assertion) are both still open at this pin.

## Finding 6 — one archived prep splits its F into 1,031 s to a second F stamp and 261 s after it, agreeing with the row's F 1,028; the split across the 121 preps is **UNDETERMINED** (n=1 read; artifact named)

`~/s3/artifacts/flywheel/gate-prep-6/2026-11-01-wb-khhg-g10-gate-s174-prep/` (the prep behind M:44050 and the refusal M:44097):

```
install-stamps.txt: 1793517708 1793517714 0         -> 6 s, rc 0
D-start.txt: 1793517734   D-end.txt: 1793517834      -> D 100 s
TS-start.txt: 1793517896  TS-end1.txt: 1793518129    -> targeted suites 233 s (overlaps E)
E-start.txt: 1793517965   E-end.txt: 1793518198      -> E 233 s
F-start.txt: 1793518198   F2-start.txt: 1793519229   -> 1,031 s
F2-start.txt: 1793519229  F2-end.txt: 1793519490     -> 261 s
M:44051 gate-stage prep startEpoch 1793517559 endEpoch 1793519747 seconds 2188
M:44050 prep-done checklistStepSeconds {"D": 100, "F": 1028, "G": 194}
$ grep -l 'F2' *.txt; echo "rc=$?"
rc=1                                                  (no text file in the archive names what F2 covers)
$ ls mut-leg1 | wc -l; ls archive-tools
16   drive-cut.sh drive-r0.sh kprobes-flags.py kprobes.py mut-gp11.py mut.py overlay.sh run-vitest.sh
$ head -2 drive-leg2.log
kprobes-flags start 1793518721 load1 81.92
F-K09-records-early-return: red=1 of 14 (passed 13, skipped 0, rc 1, 9.7s) [records] expected [] n/a; restored=sha256-ok; porcelain=baseline
```

The row's F (1,028 s) matches F-start to F2-start (1,031 s) within 3 s; the 261 s F2 leg and the 194 s G then fit inside the 518 s from F2-start to the stage end. The mutant harness started inside F (`kprobes-flags start 1793518721`, 523 s after F-start) and each mutant run in the leg-2 log takes 9–10 s; `mut-leg1/` holds 15 run JSONs plus `results.jsonl`. Whether the reading half or the mutant half of F dominates across the 121 preps cannot be settled from the rows, which stamp F as one number. Artifact: the per-prep S3 archives' `F-start.txt` / `F2-start.txt` / `F2-end.txt` and `mut-leg1/results.jsonl`, read over the 121 (one read here), or the g10.20 K7 `stageStamps` fields (`g10-gate.js:148`, the PREP schema's optional `firstShellEpoch`, `mutantAuthorSeconds`, `mutantRunSeconds`, `fReadSeconds` and `prepNonChecklistSeconds` under `stageStamps=1`; `:175` names them in the prep-done sentence), which no row in this window carries (0 of 3,283 rows mention any of the five).

## Evidence

Per-day medians over the whole ledger (47,459 lines at the pass), `gate-start.installSeconds` and the `prep-done` walls; the slow window the corroborated file measured is 2026-10-19T08:00Z..2026-10-20T08:00Z:

```
day        gate-start.installSeconds (n, median)   | prep-done install (n, median) | prep-done checklist (n, median) | prep-done targeted (n, median)
2026-10-18    40      6.0 |    0        - |    0        - |    0        -      (g6 n=4 median 6; g7 n=36 median 6, max 122; no load1AtStart on any of the 36)
2026-10-19    16    341.0 |    0        - |    0        - |    0        -      (g7 n=5 median 203; g8 n=11 median 707)
2026-10-20    55    383.0 |   23    435.0 |   23    766.0 |   23    126.0      (g8 n=9 353; g9 n=22 346; g10 n=24 417.5 - the cache's first day)
2026-10-21    54     18.0 |   54     18.5 |   54   1066.5 |   54    199.5
2026-10-22    44     15.0 |   44     15.0 |   44   1677.0 |   44    152.5
2026-10-23    62     15.0 |   61     15.0 |   61   1579.0 |   61    316.0
2026-10-24   112     16.0 |  110     16.0 |  110   1602.0 |  110    328.0
2026-10-25   108     14.0 |  110     15.0 |  110   1535.5 |  110    285.0
2026-10-26    39     11.0 |   38     11.0 |   38   1458.0 |   38    245.5
2026-10-27    76     13.0 |   79     14.0 |   79   1776.0 |   79    229.0
2026-10-28   151     14.0 |  146     15.0 |  146   1487.0 |  146    216.5
2026-10-29    86     13.0 |   88     13.5 |   88   1855.0 |   88    250.5
2026-10-30   118     14.0 |  121     15.0 |  121   1728.0 |  121    225.0
2026-10-31   124     16.0 |  122     16.0 |  122   1833.5 |  122    246.0
2026-11-01   124      7.0 |  123      7.0 |  123   1739.0 |  123    169.0
2026-11-02    48      8.0 |   46      9.0 |   46   1897.5 |   46    223.5      (the whole day at read time; gate-start rows before the 07:55Z stamp alone: n=42, median 8.5)
first gate-start row with installCacheDir: M:7599 utc=2026-10-20T12:15:25Z installSeconds=798 bead=wb-0kg.11 run=g10-gate-smoke1
```

The `prep-done` checklist median rose from 766 s (2026-10-20, n=23) and 1,066.5 s (2026-10-21, n=54) to 1,739 s (2026-11-01, n=123) and 1,897.5 s (2026-11-02, n=46) while install fell 435 → 7 s over the same days: the numbers are CONFIRMED; "the cost moved from install to F" is the writer's reading of them, since the F stamp exists only from the g10.18 K3 rows on.

Window pass, row kinds (M:44048..M:47330, 3,283 rows): `gate-stage` 358, `gate-start` 122, `prep-done` 121, `gate-refused` 76, `ruling-bound` 84, `landing-gate` 42, `gate-pass` 41, `fold-done` 41 (landings 772..812), `machine-defect` 7, `gate-could-not-judge` 0, `furnace-fallback` 0. Refusal timing fields on one row, verbatim:

```
M:44097 {"kind": "gate-refused", "bead": "wb-khhg", "seat": "gate-prep-6", "utc": "2026-11-01T08:16:48Z", "refusedAtStage": "PREP F", "refusalNumber": 2, "prepSeconds": 2188, "installSeconds": 6, "checklistSeconds": 1555, "targetedSuiteSeconds": 198, "gateSeconds": 0, "wallSeconds": 0, "synthesized": true, "refusalFastPath": 1, "installCacheDir": ".../machines/flywheel/state/npm-cache", "run": "g10-gate-s174"}
```

Trunk commits touching `package.json` or `package-lock.json` between the fast g7 day and the slow window (`git log --since=2026-10-16 --until=2026-10-22 origin/workbench/implementation-program -- package-lock.json package.json`): 5, all on 2026-10-16..18 (`095b056c7c`, `ed9ee00bc8`, `2022dddc14` the `@furnace/sdk` re-vendor at 2026-10-17T10:00:26Z, `080bab2af0`, `e0b017315a` at 2026-10-18T03:17:19Z); none on 2026-10-19..21. Read, not weighed: whether a dependency change cooled the default `~/.npm` cache before 2026-10-19 is in "What I did not establish".

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `5779ecaf11` |
|---|---|
| Finding 1: 25 install walls, sum 13,098 s, median 398 s, max 1,176 s in 24 h | **FIXED** — 122 rows, median 7 s, max 27 s, sum 1,053 s (Finding 1 here); the fixing change is machine commit `f5b8f03c` (2026-10-20T11:54:45Z), not a rig commit |
| Finding 2: install wall tracks host load more than the gate step does (PLAUSIBLE there) | **CHANGED** — the direction survives at one thirtieth of the scale: 6 s median in the lowest-load quartile (load1 14–31) against 13 s in the highest (load1 71–160), maximum 19 s; 122 of 122 rows now carry `load1AtStart` where 11 of 25 did (the corroborated file says 12 in its Method and its Finding 2, but its own breakdown there — all 7 g9 rows and 4 of 17 g8 rows — and the 25 ledger rows of its window give 11; `load1AtStart` is the only load-named key on those rows) |
| Fix 1: a shared `npm` cache directory via `npm_config_cache` | **Implemented**, machine-side, verbatim (`g10-gate.js:40`, `:115`); 122 of 122 rows carry the directory |
| Fix 2: a `node_modules` snapshot keyed by lockfile sha | **Not implemented** — `grep -n -o -E 'snapshot|hardlink|cp -a' g10-gate.js` hits 4 times, on `:37`, `:98`, `:125` and `:134`, each the dispatch's standing-rules snapshot (`dispatch lacks its snapshot`, `standing rules snapshot`), none a `node_modules` snapshot; at 8 s median this file recommends against it (Recommendations, 3) |
| Fix 3: `npm ci --offline` once warm, so a miss fails fast | **Not implemented** — `--offline ` 0 hits, `--prefer-offline` 1 (`:115`); same recommendation |
| Positive: fresh detached worktree per gate, never a shared `node_modules` | **STILL-TRUE** — `g10-gate.js:115` `git -C ${RIG} worktree add --detach ${WSROOT}/<seat>-<bead> <tip>` precedes the install |
| Positive: the install is correct 25 of 25 times (identity test green) | **UNDETERMINED** — the gate rows record step verdicts, not the identity test; 42 of 42 landing gates and 41 gate-pass rows ran `test=0`, which includes it, but the cached install's byte-identity was not re-verified here (artifact: one `npm ci` under the cache followed by `git status --porcelain` and `test/workbench-identity.test.ts`) |
| Not established there: network versus disk share of an install; whether `vendor/` is inside the `npm ci` cost | **Still not established** — at 5–27 s per install neither question is worth a probe |

| Claim in the 2026-11-01 n=3 file | Verdict at `5779ecaf11` |
|---|---|
| Finding 1: 74 of 77 refusals name the class in `reason`, 76 of 77 PREP F, 192,198 s | **STILL-TRUE** — 72 of 76, 75 of 76, 197,687 s (Finding 4 here) |
| Finding 2: the design critic's 85 of 85 at PREP F over an overlapping window | **UNDETERMINED** — not re-read this cycle (artifact: the g10.21 design pack's critic output under `scratch/fw-g1021/`) |
| Finding 3: 28 caps, 19 exits, 9 inversions bound in 24 h, classified by opening phrase | **UNDETERMINED** — a keyword scan over this window's 84 `ruling-bound` texts (`\bCAP\b` 21, `\bEXIT\b` 38, `INVERSION` 62, `disposition` 17) cannot separate a ruling from the precedents it cites; the packet's 5 caps / 4 exits / 5 dispositions are the orchestrator's typed filter, quoted only as such |
| Finding 4: 0 of 5 contributor-doc paths name the class, control `R539` 3 | **STILL-TRUE** — rc 1 against 3 control files (Finding 5 here) |
| Finding 5: `test/helpers/census.ts` exports no claim symbol; `NOT CLAIMED` in 88 files | **STILL-TRUE** — rc 1 against 56 export lines; 112 files (Finding 5 here) |

## Recommendations, additive to the corroborated file's list

1. **Rank the open product request by step F's number, not by the refusal share.** The 2026-10-29 file's Finding 6 (a co-located claimed-set block plus one helper assertion in `test/helpers/census.ts` that reds a census file-alone when a header claim names a member outside the pinned set) is the only change in this thread that moves seat-run time into a vitest assertion. The number it would move is 1,238 s median per prep, 169,934 s per 24 h, 2.4x the landing gate — against a 198 s targeted suite that already runs in the same prep. The 11-01 file's fix 1 (one paragraph under `docs/workbench/14-qa-and-benchmarks.md:119` in the gate's own tokens) stays the cheapest step and should name the cost too: an author who knows that F is three quarters of a 39-minute prep, and that 63 of 76 refusals are re-cuts, has a reason to read the pins before the prose.
2. **Say in `docs/workbench/14-qa-and-benchmarks.md:121` that the gate authors falsifiers of its own against the census header.** The sentence today asks the author for "a falsifier: a negative test that would fail if a critical guarantee was quietly weakened"; the refusal reasons of this window (`22 of 28 gate-authored reader hollowings keep the census at 0 failed | 108 passed`) show the gate doing the same to the header claims, and nothing in-repo tells a cutter to expect it. One clause.
3. **Do not pursue the corroborated file's fixes 2 and 3.** A `node_modules` snapshot or `npm ci --offline` would trade a 7 s median install for a new refusal class on a cache miss; the cache did the work. Treat fix 1 as done and close the install thread.
4. **Machine-side (machine ledger, tune candidate), not this repository's:** stamp F's two halves via the g10.20 K7 `stageStamps` knob (`g10-gate.js:148`, `:175`; 0 of 3,283 window rows carry it; Finding 6).

## Positives worth protecting

- **The seven-step landing gate is cheap and green.** 42 of 42 `landing-gate` rows pass, 41 of 42 with every step at exit 0 (`steps: lint=0,typing=0,build=0,test=0,census=0,workbench-shell=0,package-smoke=0`); the one exception, M:45240 (wb-kym4, landing 796), passed with `census=1` (`steps: lint=0,typing=0,build=0,test=0,census=1,workbench-shell=0,package-smoke=0`, `verdictClass: PASS-WITH-TIMING-NOTE`: three `Test timed out in 5000ms` reds, each an active-register hit with `realAssertions: 0`, ruled routine-local under R705(b), `realReds: []`); `test=0` on 42 of 42; 506 s median, 1,294 s maximum, under `forge.toml:9`'s `gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]`. A refactor that moves substance checks into the gate must keep this wall in view: the whole executable convention costs less than a quarter of one PREP.
- **`npm ci --prefer-offline --no-audit --no-fund` in a fresh detached worktree is now a 7 s step that still installs the cut's exact lockfile.** 122 of 122 rows at 5–27 s, 14 s median even at load1 >= 80. The corroborated file asked that any cache keep byte-identity with the lockfile and never reintroduce a shared `node_modules`; `g10-gate.js:115` keeps both, and the identity test rides in the `test` step every landing gate ran green (not re-verified separately, see the table).
- **The complete gate's own cost is dominated by `test` (74.1 percent of step-ms, 313 s median) and reports it per step.** `stepMs` plus `stepExits` on 40 of 41 `gate-pass` rows sum to `wallSeconds` within 2.7 s; a gate that stops reporting per-step milliseconds removes the one place the suite's growth is measured.
- **The `prep-done` step stamps made this file a one-pass read.** 121 of 121 rows carry `checklistStepSeconds` as a parseable object (0 missing, 0 unparsable), and `checklistSeconds - (D+F+G)` is 21 s median — the stamps account for the total. Machine-side, but the property worth keeping on either side: a per-step wall beside every per-stage wall.
- **The refusal fast path spends no gate compute on a refused cut.** 76 of 76 refused rows are `synthesized` with `gateSeconds` 0 and `wallSeconds` 0; the 54.9 seat-hours of Finding 4 are PREP time only.

## What I did not establish

- The split inside step F between reading the substance rules and running the gate-authored mutants, over the 121 preps: one archive read (Finding 6). Artifact: the per-prep S3 archives' F stamps and `mut-leg1/results.jsonl`, or `stageStamps=1` rows.
- Why 2026-10-19 and 2026-10-20 installed at 341–418 s median when the g7 rows of 2026-10-18 (n=36) installed at 6 s median without a shared cache. The 36 rows carry no `load1AtStart`; the five lockfile and vendor commits of 2026-10-16..18 are listed in Evidence but not weighed; the default `~/.npm` cache's state then is not recoverable. The FIXED verdict rests on the behaviour being gone, not on this cause being settled.
- Whether a cached install is byte-identical to the lockfile (the identity test) — inferred from `test=0` on 42 landing gates, not run.
- The rule-19 ladder counts for the window (the packet's 5 caps, 4 exits, 5 dispositions): my keyword scan over the 84 `ruling-bound` texts cannot classify a ruling against the precedents it recites (table above). Artifact: an opening-phrase classification as the 11-01 file did, or the orchestrator's typed filter.
- The bind-stage split by verdict (1,790 s on 41 pass-bound binds, 1,147.5 s on 76 refusal-bound) joins each `gate-stage` bind row to the nearest verdict row by bead and run; one bead carries both verdicts in one run and the join assigned each verdict once.
- The four Library field reports of the window (`bead_machines/raw/flywheel-ops-window-20261101T0926Z`, `-20261101T1522Z`, `-20261101T2123Z`, `-20261102T0322Z`) and `machines/flywheel/ledger/outbox.jsonl` were not read; every number here is from `metrics.jsonl`, three receipts, one archive and git.
- Whether any author who is not a machine seat cut a census in the window — none was observed; the docs findings are an absence, not a cause of these 76 refusals.
- The orchestrator's packet figures that differ from mine — "76 of 76" refusals naming the class (72 on `reason`, 75 anywhere here), bind "1,790 n=40 / 1,147.5 n=76" (41 / 76 here by a nearest-row join) — rest on other fields or joins; both sets are in this file.
