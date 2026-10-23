# CORROBORATION, n=22 landings: `docs09-readers-relationships.census.ts:787` (register entry 26) red at 8 of 22 phase-2 landings 262-283 and `workbench-inspector.test.ts:58` (register position 2) at 8 of 22, each red costing one 13823-52080 ms file-alone serial leg (16 legs, 421,684 ms), while the `{ timeout: 60_000 }` it-options shape already landed in 35 sibling test files stays unapplied to both rows

**From:** flywheel (Pi-Subagents Orchestration Engineer) — the same seat as the corroborated author, three cycles later (2026-10-20 original, 2026-10-21 corroboration, this file); the measurements come from 22 machine land-prep gates and their gate-judge reports, which the seat did not hand-run and re-read here from the kept artifacts
**Date:** 2026-10-23
**`pi-subagents` revision:** rig checkout HEAD `188ae59`; trunk `origin/workbench/implementation-program` at `9357bf4` (landing 285 hop, 2026-10-23T08:05:21Z) in the detached worktree this file was written in; the two row blobs are byte-identical at `188ae59`, `186a0ee` (landing 284 hop) and `9357bf4` — docs09 `3f7db602`, inspector `d792389d` — and the register keys both rows by exactly those blobs. The corroborated file pinned `ba3e4ff`; the 2026-10-21 corroboration pinned `eaa5a46`.
**`vitest` revision:** `4.1.10` (`package-lock.json` at `9357bf4`; `./node_modules/.bin/vitest --version` in the rig clone prints `vitest/4.1.10 linux-x64 node-v24.20.0`); git 2.50.1
**Method:** read the machine ledger (`ledger/metrics.jsonl` rows M:10192-12644, the 2,453 rows stamped 2026-10-22T08:00Z-2026-10-23T08:00Z) for the 22 `landing-gate` rows and 21 `land-prep` `serial-leg` rows of landings 262-283; opened the 15 kept gate-judge reports those rows name (`fixtures/landprep-redpath/fw-judge-<bead>.<utc>.try1.json` under the machine root `OrchestrationEngineer/machines/flywheel/`) for the red row, marker, assertion count, register match and leg wall clock; read `BOUNDARY.md:5559-5760` (folds 262-283) and `state/known-settled-rows.json` (21 entries at read time); re-read both `it(...)` lines and both vitest configs at the trunk tip with `git show` and `git grep`. Every ms figure below is quoted from a judge report or ledger row; none was re-measured by me.
**Scope:** feedback about the vitest budget on two trunk test rows as the phase-2 landing gates experience it, not about the rows' logic, not about the machine's register or judge (which absorb the cost and are praised below), and not about the eleven other rows that red in the same window.
**Corroborates:** [`2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md`](2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md) — verdict **STILL-TRUE** at `9357bf4` for the `inspector:58` row and for the no-timeout configuration (table below); independent hit 3 for that row (the original's register sightings, the 2026-10-21 file's 13 ledger mentions, this file's 8 landings). Also corroborates [`2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md`](2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md) — verdict **STILL-TRUE, at a new site** at `9357bf4`: its chronic docs09 row (`:642`, blob `b78d92ea`, entry 5) now sits at `:787` (blob `3f7db602`, entry 26) and keeps redding.
**Prior art:** `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/ | grep -i -E 'timeout|census|vitest|serial|register|docs09|inspector'` at `186a0ee` lists exactly the two files above plus two unrelated vitest files (json `failureMessages`, census config collects 0 tests); `git diff --stat 186a0ee 9357bf4 -- new-feedback/` is empty; the unlanded `origin/machine/flywheel/feedback-2026-10-22` branch adds one file about the census judge's case-function resolution, not about budgets.

## Why a second file rather than an edit

Both earlier files belong to the directory's record and are not edited. The 2026-10-20 file counted register sightings at `ba3e4ff`; the 2026-10-21 file counted gate contexts and ledger-row mentions at `eaa5a46`; this file counts landings in a closed set at `9357bf4`, from a different artifact class (gate-judge reports). Keeping the three apart is what makes "n=3 cycles, three instruments, same two rows" mean something — an edit would fold three measurements into one and lose the revision at which each held. It also spares every writer the merge conflict a shared file imposes under concurrent filing.

## What this adds

- **A new measurement, carrying a realized cost:** a per-landing count over a closed set of 22 consecutive phase-2 landings (262-283, the first land-prep gate at 2026-10-22T23:37:52Z, the last fold at 2026-10-23T07:43:38Z), with the serial-leg wall clock each red cost, read from the 15 kept gate-judge reports. `docs09:787` red at 8 of 22 landings, `inspector:58` at 8 of 22, both at 3 of 22; 13 of 22 landings paid at least one of the two file-alone legs; 7 of 22 passed clean; the 16 legs summed to 421,684 ms (7 min 2 s) of serialized wall clock at `vitestCap 1`, plus one gate-judge run per red-path landing. The earlier files predicted "every gate that reds one of them must run a serial leg"; this file is the set where that landed 16 times in 8 h 06 min. One site is new to the directory: `test/workbench-docs09-readers-relationships.census.ts:787` (the 2026-10-21 file's `:642` row, re-keyed after the file's blob changed).

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| five product rows (among them `inspector:58`) red at `Test timed out in 5000ms` under load and green in 60 s serial legs; `vitest.config.ts` sets no `testTimeout`/`hookTimeout`; none of the five `it(...)` calls carries one | [`2026-10-20-five-trunk-tests-red-...md`](2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md), Findings 1-2 |
| report-mode census rows (docs09 `:567`/`:642`/`:671`/`:675`, docs07, compat-feature, w21, risk-register, tool-exposure, docs04) red at 5000 ms in 9 gate contexts; `vitest.census.config.ts` sets no budget | [`2026-10-21-CORROBORATION-report-mode-census-rows-...md`](2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md), Findings 1-2 |
| the cost is one serial leg per red; the register exists because the same rows kept re-paying it | both files, Finding 3 |
| per-row `{ timeout }` options as the cheapest fix; the wb-cvjm `REWALK_ROW: { timeout: 60_000 }` shape as the model | 2026-10-20 file, fix #1; 2026-10-21 file, Positives, third bullet |
| `testTimeout: 30_000` in `vitest.census.config.ts` as the config-level floor | 2026-10-21 file, fix #1 |

## Finding 1 — the per-landing count and its price — **CONFIRMED**

Source per row: the `landing-gate` ledger row (M: number), its `judgeReport` (the gate-judge JSON), and the `land-prep` `serial-leg` rows. In-gate tally = the judge's `run1FileTally.text`; leg = the judge's `serialLegs[].tries[0]` (`ms` = "live wall clock (time.monotonic) around the vitest child", `load1` = "/proc/loadavg read at leg start", `testsRun`). Every red below carried `"marker": "Test timed out in 5000ms"`, `"assertionErrors": 0`, `"realAssertions": 0`.

| landing | bead | land-prep gate | row(s) red in run 1 | in-gate file tally | file-alone leg (ms, load1, tests) | verdict |
|---|---|---|---|---|---|---|
| 262 | wb-o4h0.1 (M:11509) | `cmd_f1f8d91b1347` (try 3) | **docs09:787** | `(88 tests \| 1 failed) 31452ms` | docs09 28872, 279.78, 88/88 | PASS-WITH-TIMING-NOTE |
| 263 | wb-a9l2.8 (M:11589), SPOT | `cmd_6018e1dfaa73` | **docs09:787** | `(88 tests \| 1 failed) 29380ms` | docs09 24504, 237.8, 88/88 | PASS-WITH-TIMING-NOTE |
| 264 | wb-a9l2.7 (M:11648) | `cmd_eadc593f94eb` | none | — | none | PASS |
| 265 | wb-o4h0.3 (M:11689) | `cmd_3835ae125d63` | **docs09:787**, **inspector:58**, tool-exposure:581 | docs09 `29032ms`; inspector `(133 tests \| 1 failed) 12470ms` | docs09 33509, 256.5, 88/88; inspector 16220, 266.7, 133/133; tool-exposure 20825 | PASS-WITH-TIMING-NOTE |
| 266 | wb-1xvp.3 (M:11714) | `cmd_876171bc6a32` | none | — | none | PASS |
| 267 | wb-1xvp.2 (M:11740) | `cmd_18b21dfd4dbc` | none | — | none | PASS |
| 268 | wb-o4h0.6 (M:11797), SPOT | `cmd_af7c36d1788e` | sanitizer-corpus:1162 only | — | sanitizer-corpus 35934 | PASS-WITH-TIMING-NOTE (R705(a)) |
| 269 | wb-tnz5.1 (M:11826) | `cmd_405f66df13b1` | none | — | none | PASS |
| 270 | wb-o4h0.7 (M:11926) | `cmd_0ea93d3166de` | **docs09:787**, **inspector:58** | docs09 `29912ms`; inspector `12443ms` | docs09 32837, 314.95, 88/88; inspector 21338, 308.38, 133/133 | PASS-WITH-TIMING-NOTE |
| 271 | wb-o4h0.4 (M:11972) | `cmd_a72bcdc63caf` | **inspector:58** | `17230ms` | inspector 22913, 200.89, 133/133 | PASS-WITH-TIMING-NOTE |
| 272 | wb-tnz5.2 (M:12008) | `cmd_0ccc268a98b6` | w21-survivor-pins:60 only | — | w21 4889 | PASS-WITH-TIMING-NOTE |
| 273 | wb-o4h0.5 (M:12073), SPOT | `cmd_4983135d869b` | **inspector:58** | `13326ms` | inspector 13823, 168.52, 133/133 | PASS-WITH-TIMING-NOTE |
| 274 | wb-tnz5.3 (M:12110) | `cmd_fb8054413f0e` | **docs09:787** | `32331ms` | docs09 32368, 364.18, 88/88 | PASS-WITH-TIMING-NOTE |
| 275 | wb-tnz5.4 (M:12130) | `cmd_27bab359b875` | none | — | none | PASS |
| 276 | wb-tnz5.5 (M:12181) | `cmd_9c580d403e6c` | **docs09:787**, **inspector:58**, inspector:599 (entry 29) | docs09 `28761ms`; inspector `(133 tests \| 2 failed) 18054ms` | docs09 31295, 308.01, 88/88; inspector 25906, 276.52, 133/133 | PASS-WITH-TIMING-NOTE |
| 277 | wb-pfxo.3 (M:12301) | `cmd_8bf70fa257bc` | **docs09:787** | `40745ms` | docs09 33682, 295.0, 88/88 | PASS-WITH-TIMING-NOTE |
| 278 | wb-pfxo.2 (M:12369), SPOT | `cmd_373482980f3f` | none | — | none | PASS |
| 279 | wb-pfxo.4 (M:12410) | `cmd_4a534700d31e` | **inspector:58**, tool-exposure:581 | inspector `13789ms` | inspector 14791, 298.3, 133/133; tool-exposure 17796 | PASS-WITH-TIMING-NOTE (R705(b)) |
| 280 | wb-pfxo.1 (M:12439) | `cmd_46b8a3905578` | **inspector:58** | `10356ms` | inspector 21914, 223.74, 133/133 | PASS-WITH-TIMING-NOTE |
| 281 | wb-pfxo.5 (M:12488) | `cmd_d4a36bfe5f79` | **docs09:787** | `36997ms` | docs09 52080, 378.25, 88/88 | PASS-WITH-TIMING-NOTE |
| 282 | wb-pfxo.6 (M:12510) | `cmd_0147bba4ef1b` | none | — | none | PASS |
| 283 | wb-pfxo.7 (M:12593), SPOT | `cmd_731e42405d7b` | **inspector:58** | `11571ms` | inspector 15632, 151.01, 133/133 | PASS-WITH-TIMING-NOTE |

Counts over the 22: `docs09:787` red at 8 (262, 263, 265, 270, 274, 276, 277, 281); `inspector:58` red at 8 (265, 270, 271, 273, 276, 279, 280, 283); both at 3 (265, 270, 276); at least one at 13; clean PASS at 7 (264, 266, 267, 269, 275, 278, 282); red path on other rows only at 2 (268, 272). The 16 file-alone legs: docs09 8 legs at 24504-52080 ms (sum 269,147 ms), inspector 8 legs at 13823-25906 ms (sum 152,537 ms), together 421,684 ms, at load1 151.01-378.25 at leg start; 16 of 16 green on try 1 (88/88 or 133/133). The two rows account for 16 of the 21 `land-prep` serial legs in this set (the other 5: schedule-e2e at 262 try 2, tool-exposure:581 twice, sanitizer-corpus:1162, w21:60).

The leg commands, verbatim from the judge reports (`serialLegs[].command`), landing 263 and landing 273:

```
env -u CLAUDECODE -u AI_AGENT VITEST_MAX_WORKERS=1 VITEST_MAX_THREADS=1 VITEST_MAX_FORKS=1 ./node_modules/.bin/vitest run test/workbench-docs09-readers-relationships.census.ts --testTimeout=60000 --reporter=default --config vitest.census.config.ts
env -u CLAUDECODE -u AI_AGENT VITEST_MAX_WORKERS=1 VITEST_MAX_THREADS=1 VITEST_MAX_FORKS=1 ./node_modules/.bin/vitest run test/workbench-inspector.test.ts --testTimeout=60000 --reporter=default
```

The red as the judge recorded it (landing 273, `reds[0]`, abridged to the fields used above):

```
"file": "test/workbench-inspector.test.ts", "line": 58, "titleChainRendered": "W15 four-view inspector > window access reads only visible rows even after 100k updates and retains selected identity", "markerClass": "Test timed out in", "marker": "Test timed out in 5000ms", "strictMarker": true, "timingClass": true, "assertionErrors": 0, "realAssertions": 0, "run1FileTally": {"tests": 133, "failed": 1, "text": "❯ test/workbench-inspector.test.ts (133 tests | 1 failed) 13326ms"}, "register": {"matches": [2], ...
```

and the leg (`serialLegs[0].tries[0]`): `"ms": 13823, "load1": 168.52, "testsRun": 133, "passed": 133, "failed": 0, "outcome": "green", "testsSummaryText": "Tests  133 passed (133)"`.

Wider scope, file level only: the whole 24 h window holds 104 `serial-leg` rows — 50 for the docs09 census file (20722-52080 ms, `testsRun` 88, seats gate-prep-1..11 and land-prep) and 13 for the inspector file (12337-42681 ms, `testsRun` 133). The complete gates (gate-prep seats) pay the same leg before an entry reaches land-prep; those 63 rows are counted here by file, because a gate-prep leg can be triggered by the files' other register rows (docs09 `:688` entry 28; inspector `:599` entry 29, `:926` entry 22).

## Finding 2 — both rows still carry no budget, both configs still set none, and the cure shape already sits in 35 sibling test files — **CONFIRMED**

```
$ git show 186a0ee:test/workbench-docs09-readers-relationships.census.ts | sed -n '787p'
  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
$ git show 186a0ee:test/workbench-inspector.test.ts | sed -n '58p'
 it('window access reads only visible rows even after 100k updates and retains selected identity',()=>{
$ git rev-parse HEAD:test/workbench-docs09-readers-relationships.census.ts HEAD:test/workbench-inspector.test.ts   # HEAD = 9357bf4
3f7db602...   d792389d...        (the register's fileBlobSha for entries 26 and 4; identical at 188ae59 and 186a0ee)
$ grep -c -i 'testTimeout\|hookTimeout' vitest.config.ts; grep -c -i 'testTimeout' vitest.census.config.ts     # worktree at 9357bf4
0
0
$ git grep -n 'timeout: 60_000' HEAD -- test/ | wc -l; git grep -l 'timeout: 60_000' HEAD -- test/ | wc -l
60
35
$ sed -n '1286p' test/workbench-rf-federation-stamps-census.test.ts
        it(pin, { timeout: 60_000 }, async () => {
```

Two-argument `it(name, fn)` at both rows; no options object, no numeric third argument; the 5000 ms default governs each in the parallel run. The last line is the cut that landed as landing 273 (`1eb4335`, "Land wb-o4h0.5: pin the rf federation-stamps census - cut #1 (landing 273, spot pair)", 2 files, 2364 insertions) — the landing whose own land-prep gate paid the 13823 ms `inspector:58` leg carried, in its diff, the it-options shape the inspector row lacks. Other sites of the same shape at `9357bf4`: `test/agent-dir.test.ts:89`, `:99`, `:108`; `test/scratch-killed-run.test.ts:273`, `:291`, `:298`; and `test/foreground-concurrency-print-mode-e2e.test.ts:32` (`vi.setConfig({ testTimeout: 60_000 })`, the file-level form).

## Finding 3 — the register plus serial-leg law absorbs every one of the 16 reds, at the price of the leg; registration changed who rules, not whether the leg runs — **CONFIRMED**

- R609 (BOUNDARY.md:4423): "R609 (owner): timing-confirmation policy ADOPTED with four binding clauses - strict marker set / R574-shape serial leg / typed serial-leg row per file / safety-v[...]". The file-alone leg is binding before a timing red clears; the R-T7(5) register route then clears a registered row without a ruling — `"needsRuling": false` on 13 of the 15 red-path judge reports (the 2 `true` were R705(a)/(b) rulings on non-register rows at 268 and 279, not on these two).
- Entry 26 (`docs09:787`) was granted 2026-10-21T10:53:06Z (R653; `measuredSerialMs: [31995, 33802]`), the `inspector:58` entry 2026-10-20T06:52:01Z; both rows red at 8 of these 22 landings afterwards. The register's own text names its purpose and its limit: "expires on blob change, serial fail, or owner ruling" — it never claimed to remove the leg.
- Each red-path landing also wrote a RULED LANDABLE line into the program's record — 15 lines for the 15 red-path landings; two name the row (BOUNDARY.md:5557 for 262 and :5562 for 263, both "R-T7(5) register (docs09:787 entry 26), serial leg green 88/88"), the other 13 count register HITs without naming them — e.g. BOUNDARY.md:5562: "Landing 263 (wb-a9l2.8, SPOT) RULED LANDABLE: pass-with-timing-note, R-T7(5) register (docs09:787 entry 26), serial leg green 88/88, cmd_6018e1dfaa73, tree 742492ad. 2026-10-23T00:18:44Z". A line per landing that records the same fact 16 times about two rows is bookkeeping the budget fix would retire.

## Re-check verdicts on the corroborated files

| Claim in the corroborated file | Verdict at `9357bf4` |
|---|---|
| 2026-10-20 F2: `vitest.config.ts` sets neither `testTimeout` nor `hookTimeout` | **STILL-TRUE** — `grep -c` 0 in the worktree at `9357bf4` |
| 2026-10-20 F1: `inspector:58` carries no timeout argument; red at 5000 ms under load, green serially | **STILL-TRUE, and now counted** — 8 of 22 landings; 8 of 8 file-alone legs green 133/133 at 13823-25906 ms; line and blob unchanged (`d792389d`) |
| 2026-10-20 F1: `identity:88`, `identity:159`, `workflow-gate-worktree:299` red at 5000 ms | **UNDETERMINED** — none of the three appears in the 15 land-prep judge reports for 262-283; I did not look for them in the gate-prep gates |
| 2026-10-20 F1: `saved-precedence:146` red at 5000 ms | **CHANGED** per the 2026-10-21 file (the row carries `REWALK_ROW: { timeout: 60_000 }` since landing 188); not re-read here |
| 2026-10-20 F3: one serial leg per red | **STILL-TRUE, price measured** — 16 legs, 421,684 ms, over 22 landings |
| 2026-10-21 F1: `vitest.census.config.ts` sets no budget | **STILL-TRUE** — `grep -c` 0 at `9357bf4` |
| 2026-10-21 F1/F2: `docs09:642` is the chronic row (entry 5, blob `b78d92ea`) | **CHANGED** — the file's blob moved to `3f7db602`; the register expired entry 5 file-wide at fold 211 and re-granted the same titleChain at `:787` as entry 26 (register `evidence[2]`: "line re-read at blob 3f7db602: :787 (was :642 at blob b78d92ea, expired file-wide at fold 211)"); the row keeps redding, 8 of 22 |
| 2026-10-21 F2: file-alone durations for the chronic docs09 rows 80-109% of the default | **UNDETERMINED here** — the 16 legs record the file wall (88 rows, 24504-52080 ms), not the row's own duration; the row-level figure needs the `--reporter=json` leg the 2026-10-21 file asked for |
| 2026-10-21 F3: the register holds 22 entries, 13 naming census rows | **CHANGED** — 21 entries at read time (19 at the landing-263 judge, 20 at the landing-273 judge, per the reports' `register.entries`); not re-classified by tier |

## Recommendations, additive to the corroborated files' lists

1. Apply the in-store it-options shape to exactly the two hottest register rows, one line each: `it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", { timeout: 60_000 }, () => {` at `test/workbench-docs09-readers-relationships.census.ts:787` and `it('window access reads only visible rows even after 100k updates and retains selected identity', { timeout: 60_000 }, () => {` at `test/workbench-inspector.test.ts:58` — the shape at `test/workbench-rf-federation-stamps-census.test.ts:1286` and 59 other lines. Acceptance, re-probeable from the artifacts this file used: a land-prep gate at load1 150-380 (the range the 16 legs saw at leg start) whose gate-judge report has no `reds[]` entry with `"line": 787` or `"line": 58`, no `serialLegs[]` entry for either file, and `verdictClass` `PASS` where no other row reds; entries 26 and 4 then expire on blob change under their own clause, which is the intended retirement path.
2. Measure the row before trusting the budget: the row-level duration of `:787` and `:58` is not recorded in any artifact I read (the register's `measuredSerialMs` and the legs' `ms` are the file wall for 88 and 133 rows). One `--reporter=json` file-alone leg per row gives it; a 60 s budget is justified if the row alone sits an order of magnitude under it, as the 2026-10-21 file's 4003-5456 ms readings for the predecessor `:642` suggest.
3. Two lines before the config-level floor: the two rows caused 16 of the 21 land-prep legs in this set (76%), so the per-row fix retires most of the landing-side cost at once; the 2026-10-21 file's `testTimeout` in `vitest.census.config.ts` remains the right second step for the long tail (tool-exposure:581 at 265 and 279, w21:60 at 272, and the gate-prep legs on docs07/compat-feature).

## Positives worth protecting

- The gate-judge report is a complete, self-describing record: each red carries `marker`, `markerRef` (e.g. `diagnostics[0].message#L22`), `assertionErrors`, `run1FileTally` and `register.matches`; each leg carries the exact `commandArgv`, `ms` with `msSource: "live wall clock (time.monotonic) around the vitest child"`, `load1` with `load1Source: "/proc/loadavg read at leg start"` and a `testsSummaryRef` into the kept log. This file's whole table was rebuilt from 15 reports without opening a transcript. Keep every one of those fields; a summary-only judge output would make the next corroboration a guess.
- Blob-pinned register keys: both rows matched by `fileBlobSha` equal to the gated tree's blob at all 16 hits (`register position 12 (blob 3f7db602 = tip = merge...)`, `register position 2 (blob d792389d = tip = merge...)` in the reports' route text), so the one-line fix in recommendation 1 expires its own entry. Keep the key form.
- `--testTimeout=60000` on the leg's command line, never an edit to the tree: the leg proves the row and leaves the trunk's budget as the trunk declared it. The leg is an instrument; keep it in that shape.

## What I did not establish

- The per-row duration of `:787` or `:58` in any leg (file-level wall only; see recommendation 2).
- Whether the 50 docs09 and 13 inspector gate-prep legs in the window were triggered by these two rows or by the files' other register rows; counted at file level only.
- Whether a 60 s budget could hide a real hang in either row: `:787` re-judges a frozen report, `:58` ingests 100k updates in-process; I read the first three lines of each body and no helper.
- The brief that scheduled this filing attributed the `{ timeout: 60_000 }` precedent to "o4h0.5 F4"; the wb-o4h0.5 bead's F4 note concerns a `'+'`-concatenated literal escaping a scan, not a timeout, so this file cites the landed line (`1eb4335`, `:1286`) and not that label.
- Landing 284 (wb-pfxo.10) folded at 07:56:18Z inside the window and passed clean; it lies outside the 262-283 set the counts use. Of the 42 in-window landings (243-284) only 262-283 were tabulated.
