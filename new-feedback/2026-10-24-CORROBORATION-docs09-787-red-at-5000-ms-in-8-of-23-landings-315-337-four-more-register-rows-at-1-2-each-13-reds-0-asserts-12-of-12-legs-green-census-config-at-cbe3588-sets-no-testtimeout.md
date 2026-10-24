# CORROBORATION, n=23 landings: `test/workbench-docs09-readers-relationships.census.ts:787` red at the vitest 5000 ms default in 8 of 23 landing gates (35%, landings 315-337, 2026-10-23T23:00Z-2026-10-24T08:00Z) and four more settled-register rows (`docs09:688`, `inspector:58` twice, `tool-exposure:581`, `docs20:550`) in 13 strict-marker reds over 10 red-path landings, every red 0 AssertionError and every file-alone leg green on try 1 (12 of 12 legs, 265,827 ms), while `vitest.census.config.ts` at `cbe3588` still sets no `testTimeout` and none of the five rows carries one

**From:** flywheel (Pi-Subagents Orchestration Engineer), the dogfooding agent of the bead-machine orchestrator — the same seat as the three earlier files on this theme (2026-10-20 original, 2026-10-21 and 2026-10-23 corroborations), a fourth cycle; the measurements come from gate-judge reports and ledger rows the seat's gates wrote and this agent did not run
**Date:** 2026-10-24 (window measured: 2026-10-23T23:00Z-2026-10-24T08:00Z; written 08:00-08:30Z)
**`pi-subagents` revision:** trunk `origin/workbench/implementation-program` at `cbe3588` (commit 2026-10-24T07:32:41Z, "ledger: close wb-6ps1.2 (landing 337, merge e079c1d)" — landing 337's hop, the last landing in the window), read with `git show` and checked out in the detached worktree this file was written in; the rig clone's checked-out HEAD is `188ae59` (2026-10-22T06:34:53Z), 343 commits behind that ref, `git status --porcelain` 0 lines; the four cited test files, both vitest configs, `forge.toml` and `package.json` are byte-identical at `188ae59` and `cbe3588` (`git diff --stat 188ae59 cbe3588 -- ...` prints nothing); `package.json` `"version": "0.20.0"` at `cbe3588`. The corroborated file pinned `ba3e4ff`; the 2026-10-21 file `eaa5a46`; the 2026-10-23 file `9357bf4`. The dispatch brief that scheduled this filing named no tool version string; every string here is one this agent read.
**`vitest` revision:** 4.1.10 (`package-lock.json` at `cbe3588`, `"node_modules/vitest": { "version": "4.1.10"`; the rig clone's `./node_modules/.bin/vitest --version` prints `vitest/4.1.10 linux-x64 node-v24.20.0`)
**Gate harness revision:** `forge 0.2.1 (rev bd7d9f8e68ad)` as the `harness` field of 28 of the 33 in-window `gate-pass` ledger rows (5 rows carry none) — the complete gates; the 23 land-prep gates' harness string is in no artifact this agent read, so for the landing gates it is UNVERIFIED
**Method:** read the 10 gate-judge reports kept under the machine root (`OrchestrationEngineer/machines/flywheel/fixtures/landprep-redpath/fw-judge-wb-*.try1.json`, stamps 20261024T000326Z-20261024T072946Z) for `reds[]` and `serialLegs[]`; read ledger rows M:14430-15701 (`ledger/metrics.jsonl`, the 1,272 rows stamped inside the window) for the 23 `landing-gate`, 10 `landing-gate-try`, 23 `fold-done`, 62 `serial-leg`, 33 `gate-pass` and 87 `host-sample` rows; read `state/known-settled-rows.json` (33 entries at read time) and `BOUNDARY.md:6320-6665` (the in-window lines); re-read the five `it(...)` lines, both vitest configs, the blobs and `forge.toml` at `cbe3588` with `git show`, `git ls-tree` and `git diff --stat`. Every ms and load1 figure below is quoted from a judge report or a ledger row; none was re-measured by this agent. The numbers were counted twice (a per-landing walk and a per-row tally) and agree.
**Scope:** feedback about the vitest budget that four census files and one product test file run under in the program's landing gates, not about the rows' logic, not about the machine's register and judge (which absorb the cost and are praised below), and not about the five other files that paid a serial leg in the window.
**Corroborates:** [`2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md`](2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md) — verdict **STILL-TRUE** at `cbe3588` for the `inspector:58` row and for the no-timeout configuration (table below); independent hit 4 (same seat, fourth cycle, a fresh closed set of 23 landings read from artifacts the earlier files did not have). Also corroborates [`2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md`](2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md) — verdict **STILL-TRUE** at `cbe3588`: `vitest.census.config.ts` sets no budget and report-mode census rows keep redding at the default; its chronic `docs09:642` row is today's `:787`.
**Extends (sibling on `origin/machine/flywheel/feedback-2026-10-23`, absent from this directory at `cbe3588`, so not a `Corroborates` target the linter can resolve):** `2026-10-23-CORROBORATION-docs09-census-787-red-at-8-of-22-landings-262-283-and-inspector-58-at-8-of-22-each-costing-one-13823-52080-ms-serial-leg-while-the-60000-ms-it-options-cure-stays-unapplied.md` — verdict **STILL-TRUE at larger n** at `cbe3588`: `docs09:787` red at 8 of 22 landings there and 8 of 23 here, 16 of 45 (36%) across the two closed sets; `inspector:58` 8 of 22 there and 2 of 23 here, 10 of 45.
**Prior art:** `git fetch -q origin && git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/ | grep -i -E 'timeout|5000|census|serial|docs09|inspector'` at `cbe3588` lists the 2026-10-20 and 2026-10-21 files above plus two 2026-10-21 files about other vitest surfaces (JSON `failureMessages`; a census file run without the census config collects 0 tests); the trunk listing holds 14 entries (13 files plus `README.md`). Three sibling files sit only on unmerged `machine/flywheel/feedback-*` branches (`comm -13` of the trunk listing against each branch listing): one on the 2026-10-22 branch (census judge case-function resolution, not budgets) and two on the 2026-10-23 branch (the corroboration named above and a positives file on the R636 landing law). `git rev-list --count HEAD..origin/workbench/implementation-program` in the rig clone prints 343, so this check was made at the ref, not in that working tree.
**Delivery:** by the branch `machine/flywheel/dogfood-20261024`, cut from `cbe3588`, pending a trunk merge by the repository owner — this seat pushes only `machine/flywheel/*` branches, never trunk. Docs-only commit: no build or test step ran for it, and no hook refused it, because no hook is bound in this clone (`git config core.hooksPath` unset, `.git/hooks` holds only `*.sample`, no `.githooks` or `.gitmessage` at `cbe3588`). A docs-only gate waiver therefore has nothing to waive here; it is disclosed anyway under the standing direction for feedback commits.

## Why a second file rather than an edit

The three earlier files belong to the directory's record and are not edited. The 2026-10-20 file counted register sightings at `ba3e4ff`; the 2026-10-21 file counted gate contexts and ledger-row mentions at `eaa5a46`; the 2026-10-23 file counted landings 262-283 at `9357bf4` from gate-judge reports; this file counts the next closed set of landings, 315-337, at `cbe3588`, from the same artifact class plus the ledger rows that index it. Keeping the four apart is what makes "four cycles, three instruments, the same chronic rows" mean something: an edit would fold four measurements into one and lose the revision at which each held. It also spares every writer the merge conflict a shared file imposes under concurrent filing, and here it keeps a file that lands by owner merge independent of two sibling files that have not landed yet.

## What this adds

- **A new measurement at a new revision, carrying a realized cost:** a per-landing count over the closed set of the 23 consecutive landings folded inside 2026-10-23T23:00Z-2026-10-24T08:00Z (landings 315-337; first fold 23:21:45Z, last fold 07:45:35Z; `fold-done` rows M:14488-15680), at trunk `cbe3588` — two days and 343 commits after the 2026-10-23 file's `9357bf4`, with the two per-row cures that file and the 2026-10-21 file asked for still unapplied to every one of the five rows. The set names two rows the directory has not line-named before: `test/workbench-docs20-contract.census.ts:550` (the 2026-10-21 file's owner digest named the docs20 file without a line) and `test/workbench-docs09-readers-relationships.census.ts:688` (that file's `:567` row, re-keyed after the blob changed). 10 of 23 landings (43%) paid at least one file-alone serial leg; 13 of 23 (57%) passed clean; the 12 legs summed to 265,827 ms (4 min 26 s) of serialized wall clock at `VITEST_MAX_WORKERS=1`, plus one gate-judge run per red-path landing.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| five product rows (among them `inspector:58`) red at `Test timed out in 5000ms` under load and green in 60 s serial legs; `vitest.config.ts` sets no `testTimeout`/`hookTimeout`; none of the five `it(...)` calls carries one | [`2026-10-20-five-trunk-tests-red-...md`](2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md), Findings 1-2 |
| report-mode census rows red at 5000 ms in 9 gate contexts and (mostly) green file-alone; `vitest.census.config.ts` sets no budget; the chronic docs09 row | [`2026-10-21-CORROBORATION-report-mode-census-rows-...md`](2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md), Findings 1-2 |
| `docs09:787` and `inspector:58` red at 8 of 22 landings 262-283 each, 16 legs, 421,684 ms; the `{ timeout: 60_000 }` it-options shape already in 35 sibling test files | `2026-10-23-CORROBORATION-docs09-census-787-red-at-8-of-22-landings-262-283-...md` on `origin/machine/flywheel/feedback-2026-10-23`, Findings 1-2 |
| the cost is one serial leg per red; the register exists because the same rows kept re-paying it; registration changed who rules, not whether the leg runs | 2026-10-20 file Finding 3; 2026-10-21 file Finding 3; 2026-10-23 file Finding 3 |
| per-row `{ timeout }` options as the cheapest fix; `testTimeout` in `vitest.census.config.ts` as the config-level floor; measure the row before trusting the budget | 2026-10-20 file fix #1; 2026-10-21 file fix #1; 2026-10-23 file recommendations 1-3 |

## Finding 1 — the per-landing count and its price — **CONFIRMED**

Source per row: the `landing-gate` ledger row (M: number; `verdict`, `serialLegRows`), the kept gate-judge report (`verdictClass`, `needsRuling`, `reds[]`, `serialLegs[]`), and the `serial-leg` ledger row the judge wrote (seat `land-prep`, run `gate-judge`). In-gate tally = the judge's `run1FileTally.text`; leg = `serialLegs[].tries[0]` (`ms`, `load1`, `testsRun`/`passed`). Every red below carried `"marker": "Test timed out in 5000ms"`, `"strictMarker": true`, `"assertionErrors": 0`, `"realAssertions": 0` and a non-empty `register.matches`; every one of the 10 reports reads `"verdictClass": "PASS-WITH-TIMING-NOTE"`, `"needsRuling": false`, judge 1.1.0.

| landing | bead | `landing-gate` row | row(s) red in run 1 | in-gate file tally | file-alone leg: ms, load1 at leg start, tests (ledger row) |
|---|---|---|---|---|---|
| 315 | wb-4nut.8 | M:14468 | none | — | none |
| 316 | wb-4nut.9 | M:14503 | none | — | none |
| 317 | wb-tz4r.3 | M:14520 | none | — | none |
| 318 (SPOT) | wb-tz4r.6 | M:14564 | **docs09:787** | `(88 tests \| 1 failed) 30637ms` | docs09 21867, 164.32, 88/88 (M:14562) |
| 319 | wb-tz4r.5 | M:14584 | none | — | none |
| 320 | wb-tz4r.4 | M:14682 | **docs09:787** | `27838ms` | docs09 26555, 221.93, 88/88 (M:14673) |
| 321 | wb-5ltg.1 | M:14728 | none | — | none |
| 322 | wb-tz4r.7 | M:14751 | none | — | none |
| 323 | wb-5ltg.3 | M:14796 | none | — | none |
| 324 | wb-gxd7.3 | M:14848 | none | — | none |
| 325 | wb-gxd7.4 | M:14981 | none | — | none |
| 326 | wb-gxd7.1 | M:15017 | none | — | none |
| 327 | wb-gxd7.5 | M:15064 | **docs09:787** | `34081ms` | docs09 21436, 231.48, 88/88 (M:15061) |
| 328 (SPOT) | wb-csbt.1 | M:15176 | **docs09:787** | `33307ms` | docs09 21703, 211.87, 88/88 (M:15170) |
| 329 | wb-4nut.1 | M:15207 | none | — | none |
| 330 | wb-x0xu.1 | M:15259 | **inspector:58** | `(133 tests \| 1 failed) 10809ms` | inspector 14712, 152.82, 133/133 (M:15255) |
| 331 | wb-z3ft.1 | M:15294 | **inspector:58** | `10294ms` | inspector 14732, 236.1, 133/133 (M:15289) |
| 332 | wb-z3ft.2 | M:15348 | none | — | none |
| 333 | wb-z3ft.3 | M:15420 | none | — | none |
| 334 | wb-ojm5.1 | M:15478 | **docs09:787**, **tool-exposure:581** | docs09 `31062ms`; tool-exposure `(43 tests \| 1 failed) 19743ms` | docs09 30343, 227.01, 88/88 (M:15472); tool-exposure 20288, 243.94, 43/43 (M:15473) |
| 335 | wb-kjg9.1 | M:15535 | **docs09:787** | `30812ms` | docs09 29028, 202.99, 88/88 (M:15531) |
| 336 | wb-ojm5.2 | M:15576 | **docs09:787**, **docs20:550** | docs09 `35426ms`; docs20 `(47 tests \| 1 failed) 18732ms` | docs09 22225, 172.11, 88/88 (M:15569); docs20 12258, 144.41, 47/47 (M:15570) |
| 337 (product hop) | wb-6ps1.2 | M:15629 | **docs09:688**, **docs09:787** | `(88 tests \| 2 failed) 37971ms` | docs09 30680, 324.17, 88/88 (M:15625) |

Counts over the 23: `docs09:787` red at 8 (318, 320, 327, 328, 334, 335, 336, 337; 35%); `inspector:58` at 2 (330, 331); `docs09:688`, `tool-exposure:581` and `docs20:550` at 1 each (337, 334, 336); 13 red readings in 10 red-path landings; clean PASS at 13 (315-317, 319, 321-326, 329, 332, 333). The 12 file-alone legs: docs09 8 legs at 21436-30680 ms (sum 203,837 ms), inspector 2 legs at 14712-14732 ms (29,444 ms), tool-exposure 1 leg 20288 ms, docs20 1 leg 12258 ms; together 265,827 ms at load1 144.41-324.17 at leg start; 12 of 12 green on try 1 (88/88, 133/133, 43/43, 47/47). The one landing with two reds in one file (337) paid one docs09 leg, so 13 reds cost 12 legs.

The leg commands, verbatim from the judge reports (`serialLegs[].command`; landings 337 and 330):

```
env -u CLAUDECODE -u AI_AGENT VITEST_MAX_WORKERS=1 VITEST_MAX_THREADS=1 VITEST_MAX_FORKS=1 ./node_modules/.bin/vitest run test/workbench-docs09-readers-relationships.census.ts --testTimeout=60000 --reporter=default --config vitest.census.config.ts
env -u CLAUDECODE -u AI_AGENT VITEST_MAX_WORKERS=1 VITEST_MAX_THREADS=1 VITEST_MAX_FORKS=1 ./node_modules/.bin/vitest run test/workbench-inspector.test.ts --testTimeout=60000 --reporter=default
```

The two reds of landing 337 as the judge recorded them (`fw-judge-wb-6ps1.2.20261024T072946Z.try1.json`, fields used above):

```
"file": "test/workbench-docs09-readers-relationships.census.ts", "line": 688, "marker": "Test timed out in 5000ms", "strictMarker": true, "assertionErrors": 0, "realAssertions": 0, "run1FileTally": {"text": "❯ test/workbench-docs09-readers-relationships.census.ts (88 tests | 2 failed) 37971ms"}, "register": {"matches": [14]}, "step": "census"
"file": "test/workbench-docs09-readers-relationships.census.ts", "line": 787, "marker": "Test timed out in 5000ms", "strictMarker": true, "assertionErrors": 0, "realAssertions": 0, "run1FileTally": {"text": "(same file tally)"}, "register": {"matches": [12]}, "step": "census"
"serialLegs": [{"file": "test/workbench-docs09-readers-relationships.census.ts", "tries": [{"ms": 30680, "load1": 324.17, "testsRun": 88, "passed": 88, "failed": 0, "outcome": "green", "testsSummaryText": "Tests  88 passed (88)"}]}]
```

Wider scope, file level only: the whole window holds 62 `serial-leg` rows, all `realAssertions` 0 — 36 for the docs09 census file (20962-61339 ms, sum 1,091,341 ms, `testsRun` 88, load1 102.13-393.55; seats gate-prep-* and land-prep), 11 for the inspector file (11187-32354 ms, sum 191,044 ms, 133 tests), 6 for the tool-exposure census (17623-33622 ms, sum 134,448 ms, 43 tests), 2 for the docs20 census (12258-19884 ms, 47 tests), 2 for compat-feature and 5 singles (gp-fallback, control-admission, docs14-performance-benchmark, risk-register, rf-federation-parity-premise). The four files of the five rows account for 55 of the 62 legs (89%) and 1,448,975 ms (24 min 9 s) of the window's 1,578,616 ms of serial legs. The complete gates (gate-prep seats; 33 `gate-pass` rows, 29 of them `PASS-WITH-TIMING-NOTE`, `nproc` 64, `vitestCap` 8, `loadAvgStart` 99.09-356.53) pay the same leg before an entry reaches land-prep; those 50 gate-prep legs are counted here by file, because a gate-prep leg can be triggered by any register row of the file (the string `docs09:787` appears in 27 of the 33 `gate-pass` rows, `inspector:58` in 7, `docs09:688` in 4, `tool-exposure:581` in 4, `docs20:550` in 1 — string matches on the row text, not re-judged).

## Finding 2 — all five rows still carry no budget, both configs still set none, and the files are byte-identical to the register's keys — **CONFIRMED**

```
$ git show cbe3588:vitest.census.config.ts | sed -n '6p'
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
$ git show cbe3588:vitest.config.ts | grep -n -i 'testTimeout\|hookTimeout'; echo "rc=$?"
rc=1
$ git show cbe3588:test/workbench-docs09-readers-relationships.census.ts | sed -n '787p'
  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
$ git show cbe3588:test/workbench-docs09-readers-relationships.census.ts | sed -n '688p'
  it.each(PINNED_HALVES.map(({ row, half }) => ({ key: halfKey(row, half), half })))("AC2 $key: every pinned case is collected once, passed and asserting in the default gate's own report", ({ key, half }) => {
$ git show cbe3588:test/workbench-inspector.test.ts | sed -n '58p'
 it('window access reads only visible rows even after 100k updates and retains selected identity',()=>{
$ git show cbe3588:test/workbench-tool-exposure-census.census.ts | sed -n '581p'
  it.each(JUDGED)("AC2 row $id: every pinned case is collected once, passed and asserting in the default gate's own report", row => {
$ git show cbe3588:test/workbench-docs20-contract.census.ts | sed -n '550p'
  it.each(PINNED)(`AC2 $row.id / $half.id: ${AC2_CLAIM}`, ({ row, half }) => {
$ for f in docs09-readers-relationships.census tool-exposure-census.census docs20-contract.census; do git show cbe3588:test/workbench-$f.ts | grep -c -i timeout; done
0
0
0
$ git ls-tree cbe3588 test/workbench-docs09-readers-relationships.census.ts test/workbench-docs20-contract.census.ts test/workbench-inspector.test.ts test/workbench-tool-exposure-census.census.ts
100644 blob 3f7db6021e7769a919378ffb6269b77549332603	test/workbench-docs09-readers-relationships.census.ts
100644 blob 03f7b0adf959b464b05d93d31511948c68833463	test/workbench-docs20-contract.census.ts
100644 blob d792389d7926a9d266afccaf01e281859b4a8148	test/workbench-inspector.test.ts
100644 blob 036383babd79abed9c7153e5fb2a03a8dbbeb2c7	test/workbench-tool-exposure-census.census.ts
$ git diff --stat 188ae59 cbe3588 -- test/workbench-docs09-readers-relationships.census.ts test/workbench-inspector.test.ts test/workbench-tool-exposure-census.census.ts test/workbench-docs20-contract.census.ts vitest.census.config.ts vitest.config.ts forge.toml package.json; echo "rc=$?"
rc=0
```

Two-argument `it(name, fn)` or `it.each(table)(name, fn)` at all five rows; no options object and no numeric trailing argument, so the 5000 ms default governs each in the parallel run (`vitestCap` 8 in every in-window `gate-pass` row). The inspector file carries the word `timeout` on 10 lines, none of them `:58`. The four blobs equal the `fileBlobSha` the register keys the five entries by — `3f7db602` (`:787` at index 11 and `:688` at index 13), `d792389d` (`:58`, index 1), `036383ba` (`:581`, indexes 4, 15 and 23 for three `it.each` cases at one line), `03f7b0ad` (`:550`, index 24) — so every hit in the table above matched on a byte-identical file, and a one-line edit to any of them expires its own entries under the register's stated clause ("expires on blob change, serial fail, or owner ruling", entries 1, 4, 11, 13).

## Finding 3 — all five rows already sit in the settled-row register, which keeps the gate green and keeps the leg — **CONFIRMED**

`state/known-settled-rows.json` at read time (33 entries; a JSON list, position = index + 1):

| row | index | `registeredUtc` / grant | `measuredSerialMs` recorded at grant |
|---|---|---|---|
| `test/workbench-inspector.test.ts:58` | 1 | 2026-10-20T06:52:01Z, "ack GRANTED on the third sighting" | none recorded |
| `test/workbench-tool-exposure-census.census.ts:581` | 4 (also 15: R699 2026-10-22T14:42:15Z; 23: R712 2026-10-23T10:50:40Z — other `it.each` cases at the same line) | 2026-10-20T19:04:39Z, entries 7-9 granted | `[3450]` |
| `test/workbench-docs09-readers-relationships.census.ts:787` | 11 | 2026-10-21T10:53:06Z, owner R653 entry 26 | `[31995, 33802]` (file wall) |
| `test/workbench-docs09-readers-relationships.census.ts:688` (`RA1/a`) | 13 | 2026-10-21T19:07:57Z, owner R676 entry 28 | `[30722, 28349]` (file wall) |
| `test/workbench-docs20-contract.census.ts:550` | 24 | 2026-10-23T15:34:27Z, owner grant R718 (landing 300) | none recorded |

The 10 red-path reports resolved through the register route: `register.matches` non-empty on 13 of 13 reds, `needsRuling` false on 10 of 10 reports, no owner ruling requested for any of the five rows in the window (the 6 in-window `ruling-received` rows — R729, R730, R733, R734 among them — concern other rows: `gp-fallback-census:188`, `compat-feature:416`, `control-admission`). The register's own text names its limit: it expires on blob change, serial fail or owner ruling; it never claimed to remove the leg. The ledger carries the same fact per landing in the `landing-gate` rows' `note` field — "landing 320 land-prep try 1 red path ruled landable (one strict …)" (M:14682), "landing 334 land-prep try 1 red path ruled landable (two strict …)" (M:15478) — ten such notes for ten landings, bookkeeping the budget fix would retire. `BOUNDARY.md:6381`, `:6557` and `:6637` are the fold-record lines for landings 318, 330 and 336 (`landing-gate M:14564 … cmd=cmd_20c75936d1e2 | verdict=pass`, `M:15259 … cmd=cmd_658129ab828c`, `M:15576 … cmd=cmd_958d15731141`).

## Re-check verdicts on the corroborated files

| Claim in the corroborated file | Verdict at `cbe3588` |
|---|---|
| 2026-10-20 F2: `vitest.config.ts` sets neither `testTimeout` nor `hookTimeout` | **STILL-TRUE** — `git show cbe3588:vitest.config.ts \| grep -n -i 'testTimeout\|hookTimeout'` rc 1 |
| 2026-10-20 F1: `inspector:58` carries no timeout argument; red at 5000 ms under load, green serially | **STILL-TRUE, and now counted again** — 2 of 23 landings (8 of 22 in the previous set); 2 of 2 legs green 133/133 at 14712-14732 ms; line and blob unchanged (`d792389d`) |
| 2026-10-20 F1: `identity:88`, `identity:159`, `workflow-gate-worktree:299` red at 5000 ms | **UNDETERMINED** — none of the three appears in the 10 land-prep judge reports or in the 62 in-window `serial-leg` rows (no leg for those files); not looked for in the `gate-pass` rows' text |
| 2026-10-20 F1: `saved-precedence:146` red at 5000 ms | **CHANGED** per the 2026-10-21 file (the row carries `REWALK_ROW: { timeout: 60_000 }` since landing 188); not re-read here |
| 2026-10-20 F3: one serial leg per red | **STILL-TRUE, price measured again** — 12 legs, 265,827 ms, over 23 landings (16 legs, 421,684 ms over the previous 22) |
| 2026-10-21 F1: `vitest.census.config.ts` sets no budget; chronic census rows carry none | **STILL-TRUE** — line 6 quoted above; `grep -c -i timeout` 0 in the three census files |
| 2026-10-21 F2: the chronic docs09 row is `:642` (entry 5, blob `b78d92ea`) | **CHANGED** — the row sits at `:787` (blob `3f7db602`, register index 11, grant entry 26) since the 2026-10-21 re-key the 2026-10-23 file records; it red at 8 of 23 here |
| 2026-10-21 F2: file-alone durations for the chronic docs09 rows 80-109% of the default | **UNDETERMINED here** — the 12 legs record the file wall (88 rows, 21436-30680 ms), not the row's own duration; the row-level figure still needs a `--reporter=json` leg |
| 2026-10-21 F3: the register holds 22 entries, 13 naming census rows | **CHANGED** — 33 entries at read time; not re-classified by tier |
| 2026-10-23 F1: `docs09:787` and `inspector:58` red at 8 of 22 each | **STILL-TRUE at larger n** for `:787` (8 of 23 here; 16 of 45 across both sets); `inspector:58` fell to 2 of 23 here (10 of 45) |
| 2026-10-23 F2: both rows carry no budget; the `{ timeout: 60_000 }` it-options shape sits in 35 sibling test files | **STILL-TRUE, and grown** — the rows quoted above carry none; `git grep -l 'timeout: 60_000' cbe3588 -- test/ \| wc -l` prints 66 files (114 lines with `git grep -n`), up from 35 files / 60 lines at `9357bf4` |

## Recommendations, additive to the corroborated files' lists

1. **Make census-row budgets scale with load instead of with a per-row register.** The acceptance the orchestrator wrote for this filing, re-probeable from the artifacts this file used: a land-prep gate at load1 150-350 (the 12 legs started at 144.41-324.17; the 87 in-window `host-sample` rows read `load1Obs` 73.69-411.68 on this 64-core host) whose gate-judge report has no `reds[]` entry with `"line"` 787, 688, 58, 581 or 550, no `serialLegs[]` entry for the four files, and `verdictClass` `PASS` where no other row reds. Either shape below satisfies it; the 2026-10-21 file's `testTimeout` in `vitest.census.config.ts` (one line; the config-level form already exists in this repo at `vitest.furnace-hosted.config.ts`, `vitest.detached-control-live.config.ts` and `vitest.claude-control-live.config.ts`, which set `testTimeout` 150_000-240_000 for their live tiers) covers the four census rows at once, and the 2026-10-23 file's per-row `{ timeout: 60_000 }` (the shape 66 test files carry at `cbe3588`) covers `inspector:58`, which the census config does not reach.
2. **Or declare the census tier serial where it runs in the gate.** The census step is a separate forge command (`forge.toml:191-195` at `cbe3588`: `[build.commands.census]`, `command = "npm run test:census"`, `timeout = 300`, `after = ["test"]`; `package.json:51`: `"test:census": "vitest run --config vitest.census.config.ts"`), so `VITEST_MAX_WORKERS=1` or `fileParallelism: false` for that step alone would run the 26 `.census.ts` files (`git ls-tree -r --name-only cbe3588 -- test/ | grep -c '\.census\.ts$'` prints 26) the way the serial legs already run them — the legs show the whole docs09 file at 21-31 s and the other three files at 12-20 s under cap 1, so a serial tier costs on the order of the legs it would retire, and it removes the cap-8 contention that makes a 5000 ms budget a lottery. Cost to measure before adopting: the census step's wall at cap 1 for all 26 files; the artifacts here hold only the four files' walls.
3. **Retire the five register entries with the fix, not before it.** Each entry expires on blob change; the one-line edits above change exactly those blobs, so the fix is also the retirement path (the 2026-10-23 file's point, confirmed here for `:688`, `:581` and `:550` as well: the register's eviction clause reads the same for every entry). Until then the register is doing its job — every one of the 13 reds was classified without an owner ruling — and should not be read as a reason the budget can wait: it hides the cost, 265,827 ms of legs in nine hours on the landing side alone, in `note` fields.

## Positives worth protecting

- **The strict-marker plus zero-assert shape made all 13 reds machine-classifiable.** Every red in Finding 1 carried `"marker": "Test timed out in 5000ms"`, `"strictMarker": true`, `"assertionErrors": 0`, `"realAssertions": 0`, and the judge resolved each through `register.matches` to `"needsRuling": false` — 10 of 10 red-path reports, 0 owner rulings on these rows in the window. That rests on the frozen-report census design (`vitest.census.config.ts:2-5`: census legs "judge the gate's OWN report at .forge/vitest-report.json (written by the test step) and never re-execute it") and on vitest's stable default-marker wording. Keep the marker text, the `.census.ts` suffix that keeps judging files out of the default include, and the report path `.forge/vitest-report.json` as the input contract; a census row red for a timing reason stays a timing reason on re-judge of the same report.
- **Blob-pinned register keys expire with the fix.** All 13 hits matched a `fileBlobSha` equal to the gated tree's blob (`3f7db602`, `d792389d`, `036383ba`, `03f7b0ad` at `cbe3588`), so the recommended one-line edits retire their own entries. Keep the key form (`file` + `titleChain` + `line` + `markerClass` + `fileBlobSha`), and prefer appending census rows to moving them, since a reflow re-keys every entry in the file at once (the `:642` to `:787` history).
- **The judge report plus typed ledger rows let this whole file be rebuilt without a transcript.** Each leg carries `ms`, `load1`, `testsRun`, `passed`, `failed`, `outcome` and the exact command; each `landing-gate` row carries `serialLegRows` and a `note` naming the landing; the 10 `landing-gate-try` rows point at the judge report (the `/tmp` copies still existed at read time; the kept copies under `fixtures/landprep-redpath/` carry the same stamps). Keep every one of those fields.
- **The landing law held through all 23 landings.** 23 `fold-done` rows, one per landing 315-337, each with `merge`, `hop` and `baseFrom` chaining to the previous hop; the last hop is `cbe3588`, the tree this file reads. The 13 timing reds delayed landings by one leg each and refused none.

## What I did not establish

- Any duration of my own; every ms, load1 and tally figure above is quoted from a judge report or a ledger row at the load it names.
- The per-row duration of `:787`, `:688`, `:58`, `:581` or `:550` in any leg (file-level wall only); a `--reporter=json` file-alone leg per row would give it, as the 2026-10-21 and 2026-10-23 files already asked.
- Whether the 50 gate-prep serial legs on the four files in the window were triggered by these five rows or by the files' other register rows; counted at file level only, and the `gate-pass` row mentions are string matches.
- The census step's wall at cap 1 for all 26 census files (recommendation 2's cost); only the four files' legs are in the artifacts.
- Whether any of the five rows does executing-mode work such that a 60 s budget could mask a hang — `:787`, `:688`, `:581` and `:550` re-judge a frozen report by design, `:58` ingests 100k updates in-process; I read the quoted `it` lines and no helper.
- The harness revision of the 23 land-prep gates (no artifact read carries it); the `forge 0.2.1 (rev bd7d9f8e68ad)` string is the complete gates'.
- The brief that scheduled this filing counted `docs09:787` red in "7 gates (roughly 35%)" of "~20 full landing gates"; the kept reports and ledger rows count 8 of 23 (35%) — the eighth is landing 337 (wb-6ps1.2, judge stamp 2026-10-24T07:29:46Z), inside the window. The brief also described the roster/census pairing as letting the landings "verify surface containment mechanically"; this file verifies the mechanical classification of the 13 reds and the 23 folds, not surface containment, which it did not probe.
- Whether `testTimeout` in the census config interacts with the `--testTimeout=60000` the legs pass on the command line (the CLI flag should win; not exercised).

## Postscript — delivery by machine branch

This file is delivered on `machine/flywheel/dogfood-20261024`, cut from `cbe3588` in a detached worktree so the rig clone's shared tree (checked out at `188ae59`) was never written. The seat's standing constraint allows pushes to `machine/flywheel/*` only; landing on `workbench/implementation-program` is the repository owner's merge, as it was for the seven `machine/flywheel/feedback-2026-10-*` branches before it (the 2026-10-22 and 2026-10-23 branches' three files are still absent from trunk at `cbe3588`). The commit is docs-only, carries this one file, ran no build or test step, and met no hook: `git config core.hooksPath` is unset in the clone, `.git/hooks` holds only `*.sample`, and `cbe3588` tracks no `.githooks` or `.gitmessage`.
