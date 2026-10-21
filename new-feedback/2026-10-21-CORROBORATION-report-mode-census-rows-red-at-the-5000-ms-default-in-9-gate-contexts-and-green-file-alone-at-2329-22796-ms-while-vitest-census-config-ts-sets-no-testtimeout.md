# CORROBORATION — report-mode census rows red at the vitest 5000 ms default in 9 gate contexts across 2026-10-20/21 (load1 250-563) and mostly green file-alone at 2329-22796 ms (8 rows red even alone), while `vitest.census.config.ts` sets no `testTimeout` and the chronic rows carry none — the census tier wants its own budget (n=9 gate contexts, 11 line-named rows)

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-21
**Corroborates:** `2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md` — verdict **STILL-TRUE** at `eaa5a46` for the configuration claim and four of the five rows; **CHANGED** for the fifth row (table below)
**`pi-subagents` revision:** `origin/workbench/implementation-program` at `eaa5a46` (commit 2026-10-21T08:00:34Z; the original file pinned `ba3e4ff`); at the adversarial re-read the fetched ref had moved 34 commits to `eb4bfed` (2026-10-21T08:39:04Z) with none of the paths cited below changed; local clone HEAD `a67bc36`, 1,613 behind `eaa5a46`, porcelain 0 — source read at `eaa5a46` with `git show`
**`vitest` revision:** 4.1.10 (lock at `eaa5a46`; installed in the rig clone and the gate worktrees); node v24.20.0
**`forge` revision:** UNVERIFIED for the gates cited — 0 of the 125 kept gate-record JSON files under `/tmp/fw-gate-wb-*.json` carry a `forge_revision` field; the host's PATH `forge --version` at read time prints `forge 0.2.1 (rev d29a7df76185, built 2026-10-20)`, the install, not the gates' runs
**Method:** read `vitest.census.config.ts`, `vitest.config.ts`, the five original rows and the chronic census rows at `eaa5a46`; read the owner evidence fold `state/pending-feedback-evidence/vitest-5000ms-default.md`, the g11 LAND-PREP design, BOUNDARY landings 194-204, the 43 kept gate summaries, the register `state/known-settled-rows.json` and the 1,056 in-window ledger rows; every duration below comes quoted from a gate record or a ledger row, none re-measured by me; a second pass of the same seat re-read every quote and re-counted every number before filing
**Scope:** feedback about the test budget the census tier runs under, not about any census's judgment and not about the machine's register (which exists because of this)
**Prior art:** the file corroborated (the only hit for `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/ | grep -iE 'timeout|5000'`, and the only sibling whose body mentions `testTimeout`); the owner disposition on the evidence fold reads "CORROBORATION candidate for the five-trunk-tests-red-at-5000ms finding, revision-pinned at d3404d3" (`state/pending-feedback-evidence/vitest-5000ms-default.md`, first entry, 2026-10-20T18:25:02Z); cure beads for OTHER files, both closed at `eaa5a46`: wb-gy0 (dependency-census subprocess budgets) and wb-cvjm (saved-precedence per-row budgets, landed as landing 188, `BOUNDARY.md:4374`, 2026-10-20T22:55:32Z)

## Already filed — this corroborates, it does not restate

| claim in the 2026-10-20 file | re-check at `eaa5a46` | verdict |
|---|---|---|
| `vitest.config.ts` sets neither `testTimeout` nor `hookTimeout` | `git show eaa5a46:vitest.config.ts \| grep -n -i 'testTimeout\|hookTimeout'` prints nothing (rc 1) | STILL-TRUE |
| `identity:88`, `identity:159`, `workflow-gate-worktree:299`, `inspector:58` carry no timeout argument | each `it(...)` read at the ref; the blocks close `});` at `:114`, `:180`, `:313`, `:71` with no numeric or `{ timeout }` argument between | STILL-TRUE (4 of 5 rows) |
| `saved-precedence:146` carries no timeout argument | the row now sits at `:236` as `it("re-walks ...", REWALK_ROW, async () => {` with `:49 const REWALK_ROW_BUDGET_MS = 60_000;` and `:54 const REWALK_ROW: { readonly timeout: number } = { timeout: REWALK_ROW_BUDGET_MS };` (the wb-cvjm cure, landing 188); `:146` now reads `const workflowCtx = () => ctx({ cwd: hermetic.dir });` | CHANGED — that row now carries a 60 s budget |
| the five rows red at 5000 ms under load and green serially | all five rows appear in in-window ledger rows by name (string match, not re-measured: identity:88 in 15 rows, identity:159 in 8, workflow-gate-worktree:299 in 1, saved-precedence:146 in 9 — every one before its landing-188 cure at 22:55:32Z — inspector:58 in 13; register hits and reds), e.g. `/tmp/fw-gate-wb-0xjp.summary.txt:29`: "Sole run-1 red: test/workbench-saved-precedence.test.ts:146 [...] 'Error: Test timed out in 5000ms.' (9752 ms). The same row passed in run 1 in mode legacy (355 ms) and mode pi (135 ms)."; `inspector:58` red in the hkq3 LAND-PREP run 1 and cleared 133/133 file-alone (`BOUNDARY.md:4762`, fold stamped 2026-10-21T08:02:14Z, 51 s after the window's end) | STILL-TRUE |

## What this adds

A second, larger site class: **report-mode census rows** — `it()` and `it.each()` rows in `test/**/*.census.ts` that re-judge the frozen `.forge/vitest-report.json` and never execute product code — red at exactly `Test timed out in 5000ms` under gate load and (mostly) green file-alone, in 9 gate contexts across the night, with per-row durations on both sides; the census config's own absence of a budget; and the realized cost (a landing gate red at the census step only; one 18-file tier never green in 3 executions). The original file's fixes targeted five product tests; this class wants one line in `vitest.census.config.ts`.

## Finding 1 — the census config sets no budget and the chronic rows carry none — **CONFIRMED**

`vitest.census.config.ts:6` at `eaa5a46` (the whole config object):
```
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
```
```
$ for f in docs09-readers-relationships compat-feature w21-survivor-pins; do git show eaa5a46:test/workbench-$f.census.ts | grep -c -i timeout; done
0
0
0
```
(Armed: the same grep over all 25 census files, widened to a 4+-digit trailing `it()` argument, finds the word or the argument in 12 of 25 — a crude upper bound, not a read; `workflow-conformance.census.ts` alone carries 16 such lines.) The row the register calls entry 5, at `eaa5a46`:
```
test/workbench-docs09-readers-relationships.census.ts:642
  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
```
and `:567`:
```
  it.each(PINNED_HALVES.map(({ row, half }) => ({ key: halfKey(row, half), half })))("AC2 $key: every pinned case is collected once, passed and asserting in the default gate's own report", ({ key, half }) => {
    const verdicts = judge(REPORT, half.pins.map(entry => casePin(entry)));
```
Two-argument `it`, no options object, so the 5000 ms default governs. A gate summary says the same from the other side (`/tmp/fw-gate-wb-6hb.7.summary.txt:28`: "Marker: every red carries 'Test timed out in 5000ms' (the vitest default; vitest.census.config.ts sets none).").

## Finding 2 — the measurements, both sides — **CONFIRMED** (quoted from gate records; durations in ms)

| gate context (record) | load1 | in-gate red(s) at the 5000 ms default | same row(s) file-alone under the census config |
|---|---|---|---|
| owner landing-201 gate `cmd_c551ed4655c1` (`BOUNDARY.md:4724`, fold heading `:4723` at 07:10:00Z) | ~410 → 307 | "RED at the CENSUS step only (lint, typing, build, full TEST step GREEN; 1205/1233 census rows passed; 28 census reds / 16 census files all budget timeouts, no assertion" | owner re-run digest (`DESIGN-g11-landprep.md:56`): "12 of 16 fully green [...]; 4 files red with 8 failing rows TOTAL, every one 'Error: Test timed out in 5000ms', zero assertion failures: docs20-contract 1/33 [...], risk-register 3/53 [...], tool-exposure 3/43 [...], w21-survivor-pins 1/3" — 8 rows over budget even alone |
| LAND-PREP shadow #3 `cmd_cb6b5c1b8d0b` (`BOUNDARY.md:4745`, heading `:4744` at 07:42:01Z) | 259 → 393 | "lint/typing/build/TEST GREEN (13062/0/7), CENSUS RED 6 rows in 2 files, every one 'Test timed out in 5000ms' (compat-feature:406 AC2 B1.1/B3.1/B3.2/B4.1/B4.2; w21-survivor-pins:60 docs-floor), 0 AssertionError" | not run (shadow gate; the 6 rows filed as register candidates) |
| wb-4ap.19 out-of-band census (`/tmp/fw-gate-wb-4ap.19.summary.txt:127-128`) | 558 → 563 | "compat-feature:406 'B1.1' 5172.5 ms; docs09:567 'RA1/a' 5433.5 ms (register entry); docs09:642 5991.6 ms (register entry); evidence-ui-census:553 'ui-2/whole' 5036.5 ms; w21-survivor-pins:60 5082.8 ms" | "compat-feature 35/35 (B1.1 4222.1 ms), docs09 82/82 (:567 4150.2 ms, :642 5456.0 ms), evidence-ui-census 74/74 (ui-2/whole 2329.5 ms), w21-survivor-pins 3/3 (:60 3633.2 ms)" (load1 360.49 at the docs09 leg, `:158`) |
| wb-64x cut 5 `cmd_0b304f430c3a` (`/tmp/fw-gate-wb-64x.summary.txt:26`) | 249.51 (leg) | docs09:642 "7531 ms in-gate" | "82/82 passed [...] row :642 passed in 4677.06 ms" |
| wb-cax.15 machine gate `cmd_7906190768bd` (`/tmp/fw-gate-wb-cax.15.summary.txt:18`, `:40`) | 402 → 354; 407.30 (leg) | "test/workbench-docs09-readers-relationships.census.ts:642, 'Test timed out in 5000ms', 6544 ms. 0 AssertionError lines." | "docs09 census config 82/82, 34151 ms, load1 407.30 (:642 4003.5 ms = 80% of the 5000 ms default)" |
| wb-hkq3 gate `cmd_4929ff234f65` out-of-band census (`/tmp/fw-gate-wb-hkq3.summary.txt:62`) | 375.84 → 331.25 | "docs09-readers-relationships.census.ts:642, 'Test timed out in 5000ms', 5148.2 ms" | "The serial census leg is 82/82 (:642 at 5048.1 ms, over the default even at cap 1; gy0 floor class)" |
| wb-6hb.7 gate (`/tmp/fw-gate-wb-6hb.7.summary.txt:12`, `:23`, `:37`, `:133`; evidence fold) | 365-478 | run 2 "docs04-tests-census:551 AC2 'G2', docs09-readers-relationships:642 (register entry 5), and tool-exposure-census:581"; "docs09:642 at 5183 ms (register entry 5) and risk-register:408 AC2 K02/overlay-and-command-tests at 5920 ms"; "The 18-file census tier did not complete green in any of 3 executions at load1 365-478. All 8 red readings came from neighbour census files on the vitest 5000 ms default (7 distinct rows; docs09:642 red in all three)" | ":642 [...] Red at 5183 ms, serial 5133 ms. [...] Also red in run 2 (6924 ms, serial 4465 ms) and out of band (6008 ms)" |
| wb-p2ef gate `cmd_dce6424b086a` out-of-band census (`/tmp/fw-gate-wb-p2ef.summary.txt:61`, `:89`) | 296.83 → 270.11 | "All 3 reds 'Test timed out in 5000ms': docs07:874 [...] (5815.7 ms [...]), docs09:671 [...] (5899.5 ms [...]), docs09:675 [...] (18303.9 ms" | "docs09:671 serial 22796.1 ms = 456% of the 5000 ms default; docs07:874 6007.2 ms = 120%; entry 14 docs09:675 2355.1 ms = 47%" |
| wb-h8f.11 LAND-PREP `cmd_ec7830775ee8` (`DESIGN-g11-landprep.md:87`; ran 08:02:38Z-08:10:53Z, just after the window's end) | 262 → 359 | "CENSUS RED 2/1233, one file docs09-readers-relationships.census.ts, both 'Test timed out in 5000ms', 0 AssertionError: :642 (register entry 5) and :567" | "file-alone census-config leg 82/82 in 22664 ms" |

Eleven line-named rows in the table: docs09 `:567`, `:642`, `:671`, `:675`; docs07 `:874`; compat-feature `:406` (five `it.each` cases under one line); w21-survivor-pins `:60`; evidence-ui `:553`; risk-register `:408`; tool-exposure `:581`; docs04-tests-census `:551` — plus the docs20-contract rows of the owner digest, line-unnamed there. One more in-window sighting carries both numbers in a typed ledger row: `metrics.jsonl` row 8530 (2026-10-21T07:53:08Z, wb-72c.1 gate `cmd_cd1f26946a43`, `"line":"642","rowMs":"5007","gateRowMs":"5082","testsRun":"82","load1":"339.46"`) — the row cost 5007 ms file-alone against the 5000 ms default and 5082 ms in-gate. Across the window, 37 of 1,056 ledger rows and 32 of 43 kept summaries carry `Test timed out in 5000ms`; the machine's register (`state/known-settled-rows.json`) holds 22 entries, 13 of which name a `.census.ts` row (11 distinct rows: docs09 `:642`, `:567`, `:693`, `:675`; docs04 `:551`; risk-register `:408`; tool-exposure `:581`; docs07 `:865`, `:874`; w21-survivor-pins `:60`; compat-feature `:406`) — in the owner's entry numbering, entries 5, 9, 11 and 14 share the docs09 blob `b78d92ea` (`/tmp/fw-gate-wb-72c.1.summary.txt:114`), entry 24 keys `docs07:874` and entry 25 keys `compat-feature:406` (`BOUNDARY.md:4754`, under the R639 register-grant heading at `:4753`, 2026-10-21T07:52:29Z).

Readings the numbers support: every red carried the strict marker and no `AssertionError`; every row that got a file-alone leg under the census config passed it except the owner digest's 8 and `docs09:671`; the file-alone durations for the chronic docs09 rows (4003.5, 4150.2, 4677.06, 5007, 5048.1, 5133, 5456.0 ms) sit at 80-109% of the default on a host at load1 200-410, so under cap-8 gate load they cross 5000 ms more often than not. In-gate the same rows read 5036-7531 ms, roughly 1.2-1.6x their file-alone time; one row (`docs09:671`) read 22796 ms file-alone at load1 ~410, so a 30 s budget would still miss it on a bad minute.

## Finding 3 — the realized cost — **CONFIRMED**

- Landing 201 went red at the census step with lint, typing, build and the full test step green (`BOUNDARY.md:4724`); the landing stood on an owner ruling (R573(a), echo class), and the owner then re-ran 16 files file-alone to evidence it.
- The wb-6hb.7 gate never saw its 18-file census tier green in 3 executions (`:133` above); its verdict needed R598 and the register to pass.
- The machine's register now holds 22 entries — a per-row ledger of "known timing red, cleared file-alone" kept so gates stop re-paying the serial leg; 13 of the 22 name census rows.
- Four files on the owner's re-run stayed red alone at 5000 ms (8 rows); the floor for `docs09:642` alone sits at 5007-5456 ms in four independent legs (72c.1, hkq3, 6hb.7, 4ap.19).

## Suggested fixes, cheapest first

1. `vitest.census.config.ts`: `test: { include: [...], allowOnly: false, testTimeout: 30_000 }`. Report-mode rows re-judge a frozen report; their truth cannot change with the budget, so a larger budget cannot hide a real failure in them — it only stops the lottery. One line; it would retire at least the docs09 register entries (5, 9, 11, 14) and entries 24-25 as they expire.
2. Where a census row does subprocess or product work (executing mode, e.g. `workflow-conformance.census.ts` with its 16 timeout lines), keep the per-row budgets already there — the config value acts as a floor for the report-mode majority, not as a replacement for those.
3. Record the tier's load beside the census step the way the gates do (`load1` at start and end in the operation log), so the next budget decision reads measured headroom; the original file's `PI_GATE_LOAD` idea covers the same ground.

## Positives worth protecting

- Every census red in the table carried the strict marker and no `AssertionError`: the frozen-report design (`vitest.census.config.ts:2-3`: "judge the gate's OWN report at .forge/vitest-report.json (written by the test step) and never re-execute it") makes a census red judgeable after the fact — file-alone on the same report it reproduces or clears deterministically. The R642 echo-by-consequence test (`DESIGN-g11-landprep.md:83`) rests on exactly this: "(2) a file-alone leg on the same frozen report reproduces it deterministically (report-input dependence, not product flake)" — the hkq3 docs06 row reproduced 1/44 on the same frozen report (ledger row 8537, 2026-10-21T07:57:59Z, `"testsRun":"44"`, `"realAssertions":"1"`). Keep the report path `.forge/vitest-report.json`, the `--includeTaskLocation` flag and the `pretest` removal as the input contract.
- The register keys rows by `file` + `titleChain` + `line` + `markerClass` + `fileBlobSha` (`state/known-settled-rows.json`, the docs09:642 entry: `"fileBlobSha": "b78d92ea9ac22bd6018925e34cd63bd8f7565702"`), and the owner's two-arm guarded-files check keys config files by path (`BOUNDARY.md:406-407`, the 14e78f1 lesson — `:154-155` records that landing as RETRACTED: a forge.toml edit must remove no lines and its added-line set must stay disjoint from the retracted landing's). Both depend on stable file paths and line-addressable rows; a mass rename or reflow of census files would invalidate every register entry at once. Prefer appending rows to moving them.
- The wb-cvjm cure shape (`REWALK_ROW: { timeout: 60_000 }` passed as the options argument) reads as the model for per-row budgets where a config-level floor does not fit.

## What I did not establish

- Any duration of my own; every ms figure above comes from a gate record or a ledger row at the load it names.
- The exact count of distinct census rows red in the window; the owner digest names files and counts, not line numbers, for the docs20-contract file.
- The two counts for wb-6hb.7 disagree by one — the evidence fold says "8 red readings over 6 distinct rows", the summary's `:133` says "7 distinct rows"; both quoted, not reconciled.
- Whether `testTimeout` in the census config interacts with the `--testTimeout=60000` the serial legs pass on the command line (the CLI flag should win; not exercised).
- Whether any census file's rows run in executing mode such that a 30 s floor would mask a hang (the `workflow-conformance` 16 lines suggest per-row budgets already govern there; not read in full).
- Whether the four original product rows red in this window red for the original reason; I counted their names in in-window ledger rows (register hits included) and quoted one verbatim red (0xjp:29), nothing more.
