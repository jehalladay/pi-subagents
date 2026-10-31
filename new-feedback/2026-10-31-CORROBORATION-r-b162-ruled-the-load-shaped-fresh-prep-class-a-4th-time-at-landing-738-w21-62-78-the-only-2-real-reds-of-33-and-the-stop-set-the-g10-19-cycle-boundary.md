# CORROBORATION, n=4 rulings: R-B162 ruled the load-shaped fresh-PREP class a 4th time at landing 738 — w21 :62/:78 the only 2 real-assertion reds of 33 — and what this adds: a 3rd root presentation of the class at byte-identical pins (the 2nd on the w21 pair), and the REFUSED(4) stop adopted as the g10.19 cycle boundary

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated 2026-10-28 file and the two 2026-10-30 w21 files on their delivery branch; a later cycle at a new site, not an independent observer. The judge report, ledger rows and land-loop log quoted below are the machine's own artifacts, read, not produced, by this draft.
**Date:** 2026-10-31 (operation window 2026-10-29T07:35Z <= utc <= 2026-10-31T07:55Z as assigned by the orchestrator — two days; the 2026-10-30 run already covers the first of them: `origin/machine/flywheel/feedback-2026-10-30` carries commits 0d4a63408b / 9b87db3bac / 4721e254a8, all committed 2026-10-30T08:47:34Z by this seat, and all three of their Date lines state the window 2026-10-29T07:22Z <= utc <= 2026-10-30T07:40Z; so everything new here — landing 738's judge at 06:30:50Z, R-B162 at 06:33:27Z — falls in 2026-10-30T07:40Z..2026-10-31T07:55Z, and R-B114 at 2026-10-30T07:50:34Z, 10 min past that earlier window's end, is cited here only as lineage)
**`pi-subagents` revision:** every quoted `path:line` read at `89109cd37724d20335040444548d942b60f77bda` = `git rev-parse origin/workbench/implementation-program` after `git fetch` this session (rc 0; committerDate 2026-10-31T05:55:38Z) — the same sha M:40239 records as landing 738's `hop` and `trunkTip`. Blob pins at that sha (`git rev-parse 89109cd377:<path>`): `test/workbench-w21-survivor-pins.census.ts` fc6ccce, `test/workbench-cap-saturation-receipt.test.ts` 507907c, `test/helpers/census.ts` 51bc11a. The corroborated 2026-10-28 file read its sources at `99e1dfd254663c2ba60ebdba8a15ac90fa31934c`; the two 2026-10-30 w21 files pinned theirs at `a520cbdcf9b679fba36f07ddedf7afe3a0816b79`, and all 3 of 3 blobs above compare IDENTICAL between a520cbd and 89109cd377 by full 40-hex id (output quoted in Finding 2).
**Installed binary:** none for this repo — `package.json` at 89109cd377 declares no `bin` field (`@tintinweb/pi-subagents` 0.20.0), so every claim here is about source and gate artifacts. Toolchain pins at the ref: typescript `6.0.3` (`package.json:42`; the rig clone's `node_modules/typescript/package.json` also prints 6.0.3), vitest `^4.0.18` (`package.json:71`, the declared range).
**`vitest` revision:** 4.1.10 (`package-lock.json:5281-5282` at 89109cd377: `"node_modules/vitest": {` / `"version": "4.1.10"`; the rig clone's `node_modules/vitest/package.json` prints `"version": "4.1.10"`; not re-run by me — no gate or vitest run in this draft).
**Machine-side producer pins (not this repo):** gate-judge 1.1.0 (`"tool": "gate-judge", "version": "1.1.0"` in the judge report), judge command `cmd_961d55698231`, furnace-supervised gate run `frn-run-fw-wisp-rlzmm8` attempt `frn-atm-fw-wisp-9gbiu0-1` (attemptExit 0); `git ls-tree origin/workbench/implementation-program -- machines bin` lists 0 entries, so the judge and loop are out of this repo's scope and their classification vocabulary is cited only as the consumer of this repo's test design.
**Method:** read-only parse (python3 json) of the landing-738 judge report `/tmp/fw-landprep-wb-t99a-20261031T055651Z-786718/judge.json`; `sed -n`/JSON-parse of the machine ledger `machines/flywheel/ledger/metrics.jsonl` (40,516 lines at first read; a fix-pass re-parse at 40,594 lines found the same 4 label rows and no 5th) rows M:40239 and M:40325 plus a full-file parse for the labels R-B114/R-B132/R-B144/R-B162 (and M:27633 for R-B35); `grep -a` over the land-loop log `/tmp/fw-land-loop.out` (12,341 lines at first read, 12,365 at the fix-pass re-read with line 12327 unchanged), lines 12307-12341 quoted; `git show` / `git rev-parse` at 89109cd37724d20335040444548d942b60f77bda; the corroborated file's named 587 judge fixture `machines/flywheel/fixtures/landprep-redpath/fw-judge-wb-7rz9.20261027T230526Z.try1.json` parsed read-only (Finding 5); `git show`/`git log` over `origin/machine/flywheel/feedback-2026-10-28`, `-2026-10-29` and `-2026-10-30` for the sibling files' Date lines, commits and one quoted line. No gate re-run, no bd command, no write anywhere outside this file.
**Scope:** the same pi-subagents census coupling the corroborated file describes — report-mode census rows that re-judge the gate's own frozen vitest JSON report and red as real assertions when the pinned file fails for any reason — observed at a new landing (738) with the 4th ruling of the load-shaped fresh-PREP class as R-B162 names it — 2 of the 4 (R-B114, R-B162) on the w21 :62/:78 pair — R-B114 together with docs14 :553 — R-B132 on docs08 :546/:567, R-B144 on adversarial-matrix :646/:666 (Finding 3). What the carrier and the probes do at source stays with the 2026-10-30 files (byte-identical blobs, Finding 2); the judge's own classing of red[0] as uncertain is the machine's defect record, not this repo's.
**Corroborates:** 2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h (on `origin/machine/flywheel/feedback-2026-10-28`, commit 663fd8fc41; 0 of the 18 trunk entries at 89109cd377, so named slug-only — see Prior art) — verdict **STILL-TRUE** at `89109cd37724d20335040444548d942b60f77bda` for its Finding 1 mechanism, re-observed end to end at landing 738 (a timing failure inside a pinned file re-counted by report-mode census rows as the gate's only real-assertion reds); independent hit: the 6th landing in this seat's filed lineage (587; 627 and 650; 685; 692; 738), the same seat, a later cycle.
**Prior art:** checked at the fetched ref this session: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` = 18 entries (17 files + README) at 89109cd377; union `git ls-tree` over all `origin/machine/flywheel/*` branches = 33 unique names. The filename grep `survivor|cap-satur|w21|before-all|report-mode|census|r-b162|landing-73|markerless|suite-level` hits 5 of the 18 trunk entries and 16 of the 33 union names, and 0 of the 33 names landing 738, R-B162, or a markerless suite-level presentation. Of the 16 union hits, 9 are the census-budget/report-mode lineage this file extends (the 2026-10-21 report-mode CORROBORATION; the 2026-10-23, 2026-10-24 and 2026-10-27 n-37 docs09 files; the 2026-10-25 7e9a1eb file; the 2026-10-28 report-mode file; the 2026-10-29 docs14 CORROBORATION; the two 2026-10-30 w21 files), 1 is adjacent census-tier plumbing rather than budget or report-mode (2026-10-21 vitest-run-on-a-census-ts-file-without-the-census-config), and 6 match on the word census only (2026-10-21 package-json vite warning; 2026-10-22 census-judge factory-call resolution; 2026-10-26 positive typed-record refusals; 2026-10-27 wb-c61s conflict; 2026-10-27 wb-tz4r-8 bead-export; 2026-10-30 positive control-and-falsifier rows). Of the 5 trunk hits, 3 are the lineage (2026-10-21 report-mode CORROBORATION, 2026-10-24 docs09, 2026-10-25 7e9a1eb), 1 adjacent (2026-10-21 vitest-run-census-ts) and 1 not (2026-10-21 package-json). Unlanded at trunk, hence named slug-only wherever they appear in this file (this linter resolves only on-disk names): the corroborated 2026-10-28 file (`origin/machine/flywheel/feedback-2026-10-28`, 0 of 18 trunk entries), the 2026-10-29 docs14 CORROBORATION (`origin/machine/flywheel/feedback-2026-10-29`, 0 of 18) and the two 2026-10-30 w21 files (`origin/machine/flywheel/feedback-2026-10-30`, 0 of 18); of this file's lineage only the 2026-10-20, 2026-10-21, 2026-10-24 and 2026-10-25 files are at trunk, and only those carry resolvable links below.

## Why a second file rather than an edit

The corroborated file and the two 2026-10-30 w21 files are earlier cycles of this same seat; the directory is append-only, and none of the three is on disk at trunk yet — the corroborated 2026-10-28 file, the 2026-10-29 docs14 CORROBORATION and the 2026-10-30 pair all ride unlanded delivery branches (`origin/machine/flywheel/feedback-2026-10-28`, `-2026-10-29`, `-2026-10-30`); only the 2026-10-20/21/24/25 lineage is at trunk. So there is nothing to edit without destroying the per-cycle revision pins that make a recurrence count mean anything. A separate file also keeps landing 738's method (one judge report, one ledger, one log, read at one sha) separable from landing 692's.

## What this adds

- **A new site, with its ruling count:** landing 738 (wb-t99a) — and with it the class's 4th binding ruling, R-B162, whose text itself names the lineage R-B114/R-B132/R-B144 (Finding 3). The two 2026-10-30 files end at landing 692 and R-B114; nothing in the 33-name union states 738 or R-B162.
- Subsidiary, named here so the reader does not re-derive them (the template asks for exactly one named primary, which is the site above): **a 3rd root presentation of the class — the 2nd with this carrier and the identical w21 :62/:78 pair** (Finding 5: STACK_TRACE_ERROR over docs04 :557 ×2 at 587, collection-error at 692, and now a markerless-header suite-level FAIL at 738; the carrier and the pair match at 692 and 738 only, and at 692 the pair came with docs14 :553), **new numbers** (exactly 2 real-assertion reds of 33; 15 test-step + 18 census-step; 22 of 22 serial legs withheld), and **a larger realized cost** (the REFUSED(4) stop adopted by R-B162 as the g10.19 merge sequence's cycle-boundary stop, Finding 4).

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| the consequent mechanism at source (`census.ts:5188`: ``the case failed in the ${tier} report: ${test.errors[0] ?? "no error message"}``, with `errors: entry.failureMessages,` at `census.ts:4829` — so the row forwards `failureMessages[0]` and cannot name a budget expiry) and the landing-587 realized cost | 2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h (on `origin/machine/flywheel/feedback-2026-10-28`, unlanded at trunk) |
| the w21 liveness probe's shape (`:78` asserts `"absent"`, a code the judge cannot return once its pinned file fails) and the carrier `beforeAll` at :216-218 | 2026-10-30-census-liveness-probes-red-as-real-assertions-that-name-no-primary-when-a-pinned-file-fails-refusing-landings-685-and-692-pre-leg-on-adversarial-matrix-666-and-w21-survivor-pins-78 (on `origin/machine/flywheel/feedback-2026-10-30`, unlanded at trunk) |
| the collection-error route to w21:62 at landing 692, and the load figures living only in gate.json | 2026-10-30-CORROBORATION-n-2-landings-685-and-692-refused-pre-leg-on-4-and-3-real-assertion-census-rows-and-a-240000-ms-beforeall-timeout-in-a-pinned-file-reached-w21-survivor-pins-62-as-collection-error (same branch, unlanded at trunk) |
| census tier runs on the vitest default budget; `vitest.census.config.ts` sets no `testTimeout` (fix: one config line) | [`2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md`](2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md) |
| a second consequent pair (docs14) with an explicit per-it budget, landings 627 and 650 | 2026-10-29-CORROBORATION-n-2-docs14-report-mode-rows-turned-a-60000-ms-tool-reply-bench-timeout-into-a-census-red-at-landings-627-and-650-despite-the-explicit-per-it-budget (on `origin/machine/flywheel/feedback-2026-10-29`, unlanded at trunk) |
| the original load-vs-default-budget finding on trunk tests | [`2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md`](2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md) |

## Finding 1 — landing 738's judge wrote 33 reds with exactly 2 real-assertion reds, both w21 survivor-pin rows — **CONFIRMED**

`/tmp/fw-landprep-wb-t99a-20261031T055651Z-786718/judge.json` (gate-judge 1.1.0, finishedUtc 2026-10-31T06:30:50Z), parsed read-only:

```
exitCode = 8        verdictClass = "REAL-RED refusal"        reds: 33        realReds: 2
realReds[0] = "test/workbench-w21-survivor-pins.census.ts:62 realAssertions 1 (diagnostics[1].message#L167)"
realReds[1] = "test/workbench-w21-survivor-pins.census.ts:78 realAssertions 1 (diagnostics[1].message#L199)"
needsRulingReasons = ["REAL RED: test/workbench-w21-survivor-pins.census.ts:62 realAssertions 1 (diagnostics[1].message#L167); test/workbench-w21-survivor-pins.census.ts:78 realAssertions 1 (diagnostics[1].message#L199)"]
```

My tally over the `reds` array: 15 test-step reds + 18 census-step reds = 33 of 33; the 2 realReds above are the only entries with `realAssertions` > 0 (31 of 33 carry `realAssertions` 0). The root is `red[0]` (selected fields verbatim):

```
"index": 0, "step": "test", "file": "test/workbench-cap-saturation-receipt.test.ts", "line": 216,
"titleChain": [], "suiteFailure": true, "hookForm": true, "hookName": "beforeAll", "hookKey": "beforeAll@(file scope)",
"markerClass": "Hook timed out in", "marker": "Hook timed out in 240000ms", "markerRef": "diagnostics[0].message#L7008",
"strictMarker": true, "timingClass": true, "realAssertions": 0, "uncertain": true,
"uncertainReason": "no title chain in the FAIL header (suite-level failure) - markerless, clear prohibited",
"classification": "uncertain (reporter not exhaustively parsed / no title) - clear prohibited", "cleared": false,
"run1FileTally": {"tests": 55, "failed": 0, "skipped": 55, "text": "❯ test/workbench-cap-saturation-receipt.test.ts (55 tests | 55 skipped) 270272ms", ...}
```

55 of 55 cases in the pinned file skipped (the `beforeAll` never finished), and the two w21 rows at :62 and :78 — `red[31]` and `red[32]`, both `"step": "census"` — are the whole real-assertion surface of the refusal. The judge's identity block ties the artifact to the staged landing: `tip 2ca5daf2f37ae4f35e853bf28490ba87269721b1` with `tipTree e3ccc5da2a1e5048de7c5fb1b52fd7328a9c99b1`, `tipTreeMatchesArg: true`, `hop 89109cd37724d20335040444548d942b60f77bda`, `cutTip e15c77ae2efde60148e728999a71a98970a824fc` — matching M:40239 (`landing-staged`, 2026-10-31T05:56:32Z): `"tip":"e15c77ae2efde60148e728999a71a98970a824fc","hop":"89109cd37724d20335040444548d942b60f77bda","trunkTip":"89109cd37724d20335040444548d942b60f77bda","expectedTree":"e3ccc5da2a1e5048de7c5fb1b52fd7328a9c99b1","mergeTree":"e3ccc5da2a1e5048de7c5fb1b52fd7328a9c99b1"` — the gate judged a commit whose tree equals the staged merge tree.

R-B162's "the remaining 29 reds are the pre-leg not-run cascade" and my 33 − 1 − 2 = 30 reconcile on the judge's own `classification` strings: 29 of the 30 carry the cascade classification — 16 `not cleared (leg not-run (pre-leg REAL RED: 2 red(s) carry real assertions; no leg runs, nothing is appended)) - HOLD` and 13 `matched-active but not cleared (not-run (pre-leg REAL RED: 2 red(s) carry real assertions; no leg runs, nothing is appended)) - HOLD` — and the 30th, `red[1]` (`test/workbench-scratch-census.test.ts:712`, `beforeAll`, `Hook timed out in 60000ms`, realAssertions 0), is classed `hook red not cleared (no green try) - HOLD`, a second hook red that the ruling's sentence folds into neither count. The GATE-JUDGE log line (12327, Finding 4) renders the same split: entries [3]..[31] carry the cascade text, [2] carries the hook-HOLD text, and the phrase `not-run (pre-leg REAL RED` occurs 51 times on the line = 29 cascade reds + 22 serial legs. CONFIRMED from the two artifacts; the machine-side classifier source that emits those strings stays unread (a bound on the why, not on the tally).

## Finding 2 — the coupling is structural at 89109cd377, and the bytes are identical to the already-filed pins — **CONFIRMED**

The w21 census pins the cap-saturation file and judges the gate's own report for it, at `89109cd377:test/workbench-w21-survivor-pins.census.ts`:

```
28:  const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
30:  const CAP_RECEIPT = "test/workbench-cap-saturation-receipt.test.ts";
59:  describe("W21 survivor pins (wb-36l): the gate's own test report, judged in report mode", () => {
60:    it("docs-floor class: the re-expressed docs pin and its D1/D2/D3/D9/D10 falsifier rows are each collected once, passed and asserting", () => {
61:      const verdicts = judge(REPORT, DOCS_FLOOR_PINS);
62:      expect(refusals(verdicts)).toEqual([]);
63:      expect(verdicts.map(verdict => [verdict.code, verdict.cases])).toEqual(DOCS_FLOOR_PINS.map(() => ["ok", 1]));
75:    it("liveness: a survivor pin the report cannot hold is red, naming it (an accept-all judge cannot pass this census)", () => {
76:      const [verdict] = judge(REPORT, [{ ...DOCS_PIN, title: "D0 no such survivor row" }]);
77:      expect(verdict?.ok).toBe(false);
78:      expect(verdict?.code).toBe("absent");
79:      expect(verdict?.why).toContain("D0 no such survivor row");
80:    });
```

The carrier, at `89109cd377:test/workbench-cap-saturation-receipt.test.ts:216-218`:

```
216:  beforeAll(() => {
217:    realRun();
218:  }, 240_000);
```

The report plumbing, at `89109cd377:package.json:47-48` — the census judges what the test step wrote:

```
47:    "pretest": "node -e \"require('fs').rmSync('.forge/vitest-report.json',{force:true})\"",
48:    "test": "vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions",
```

The census tier's one config statement — line 6 of 6 of `89109cd377:vitest.census.config.ts`; lines 1-5 are `import { defineConfig } from "vitest/config";` and a four-line `// wb-nl8 census tier` comment — sets neither `testTimeout` nor `hookTimeout`:

```
6:export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
```

Byte identity with the pins the 2026-10-30 files filed at a520cbd — full ids, not prefixes:

```
$ for p in test/workbench-w21-survivor-pins.census.ts test/workbench-cap-saturation-receipt.test.ts test/helpers/census.ts; do ... git rev-parse at both shas ...
IDENTICAL test/workbench-w21-survivor-pins.census.ts  fc6ccceca523d70382ac51e1b05717d633372108
IDENTICAL test/workbench-cap-saturation-receipt.test.ts  507907c0dcbf6c1b1033a605c6e3fba0d7622bdf
IDENTICAL test/helpers/census.ts  51bc11af33774f11f9eb57840d62c3bd33221d75
```

So every source-level claim in the 2026-10-30 pair holds at 89109cd377 verbatim — nothing changed and the same two rows redded again.

## Finding 3 — R-B162 bound the class a 4th time, naming its own lineage — **CONFIRMED** (quoted)

The ledger's ruling-bound rows for this lineage, parsed (not grepped) from `machines/flywheel/ledger/metrics.jsonl`, scope = label match over all 40,516 rows at read:

| row | label | bead / landing | utc |
|---|---|---|---|
| M:36726 | R-B114 | wb-fity / 692 | 2026-10-30T07:50:34Z |
| M:38370 | R-B132 | wb-pyel.3 / 715 | 2026-10-30T17:59:48Z |
| M:39147 | R-B144 | wb-lrl3 / 725 | 2026-10-30T23:30:45Z |
| M:40325 | R-B162 | wb-t99a / 738 | 2026-10-31T06:33:27Z |

M:40325, the operative sentences verbatim:

> PREP REAL RED at landing 738 (wb-t99a, judge rc 8, cmd_961d55698231, merge tree e3ccc5da, tip e15c77ae on hop 89109cd3) ruled the R-B114/R-B132/R-B144 load-shaped fresh-PREP class under 22(d): the ROOT red is test/workbench-cap-saturation-receipt.test.ts:216 beforeAll SUITE-LEVEL failure (uncertain, markerless, no title chain in the FAIL header, realAssertions 0, timingClass true) under host load1 294-321; the only two realAssertions reds (test/workbench-w21-survivor-pins.census.ts:62/:78) are REPORT-MODE CENSUS CONSEQUENTS - that census judges the gate's own vitest JSON report rows for exactly the failed cap-saturation suite's cases (DOCS_FLOOR/G6 pins over CAP_RECEIPT), so they red whenever that suite fails for any reason; the remaining 29 reds are the pre-leg not-run cascade (every one realAssertions 0, timingClass true). Stale-pass scan: threeWayTouched 0 [] (the cut touches only the two rf-joint-view files; no overlap with cap-saturation or w21 paths). Per the class: the stale-pass candidate's respin-by-reference recipe is NOT taken and wb-t99a is NOT parked or respun.

"A 4th time" means exactly this: 4 of 4 rows in the table are `ruling-bound` rows whose label is one R-B162's own text names as the class (R-B114/R-B132/R-B144) plus R-B162 itself. The wider load family is older (R-B114's own text extends an "R-B46/R-B57/R-B101 class"); I did not census that wider family.

What each of the four ruled, from the `ruling` strings themselves (term counts in the order R-B114/R-B132/R-B144/R-B162: `w21` 1/0/0/2, `cap-saturation` 0/0/0/3, `CAP_RECEIPT` 0/0/0/1, lower-case `consequent` 0/0/3/0 — R-B162 writes it upper-case, "REPORT-MODE CENSUS CONSEQUENTS"): R-B114 ruled the same two w21 rows plus a third real-assertion row — "the 3 reds counted as real assertions are load-shaped (a 240000ms hook timeout in workbench-w21-survivor-pins.census.ts:62/:78 and the docs14 performance-benchmark census :553)" — without naming the carrier; R-B132 ruled "the two real-assertion reds sit in the docs08-replay-reconcile census (AC2 row j7 :546 and AC2 each-liveness :567)" with no w21, cap-saturation or consequent mention at all; R-B144 ruled four 5000 ms timeouts and "the two adversarial-matrix report-mode census reds are its consequents (:646 classified by the judge as 'report-mode-consequent of reds[2]'; :666 counted as the ONE real assertion"; R-B162 is the first of the four to state the w21-over-cap-saturation pairing ("DOCS_FLOOR/G6 pins over CAP_RECEIPT"). So the 4 rulings are one mechanism across four census files (w21 and docs14 in R-B114, docs08 in R-B132, adversarial-matrix in R-B144, w21 in R-B162), and the w21 pair specifically carries 2 of the 4.

## Finding 4 — realized cost: the stop became the g10.19 merge sequence's cycle boundary, with 22 of 22 serial legs withheld — **CONFIRMED**

`/tmp/fw-land-loop.out`, verbatim (line numbers at read):

```
12309: land-loop: landing 738 <- wb-t99a (FIFO head by gate-pass time; 1 PASS-held, batch depth target 4 of max 4) base 89109cd37724d20335040444548d942b60f77bda (2026-10-31T05:56:30Z)
12325: land-prep: gate rc=0 cmd=cmd_961d55698231 gatedTree=e3ccc5da2a1e5048de7c5fb1b52fd7328a9c99b1 (mergeTree e3ccc5da2a1e5048de7c5fb1b52fd7328a9c99b1) ...
12327: GATE-JUDGE wb-t99a cmd_961d55698231 tree e3ccc5da: verdict REAL-RED refusal, route 'full-rerun', needsRuling true. Steps: test exit 1, census exit 1. Reds 33: [1] test UNCERTAIN (no title chain in the FAIL header (suite-level failure) - markerless, clear prohibited) [...] [32] test/workbench-w21-survivor-pins.census.ts:62 hook hook@W21 survivor pins (wb-36l): the gate's own test report, judged in report mode line 62; Hook timed out in 240000ms, 1 AssertionError (real 1), REAL RED (realAssertions 1 > 0) [33] test/workbench-w21-survivor-pins.census.ts:78 NO MARKER, 1 AssertionError (real 1), REAL RED (realAssertions 1 > 0). [...]
12339: land-chain: REFUSED (4) land-prep-launch rc 8 (receipt /tmp/fw-landchain-wb-t99a-L738/land-prep.out) (2026-10-31T06:30:52Z)
12341: land-loop: PREP rc 4 on landing 738 wb-t99a - stopping for the hand (receipts /tmp/fw-landchain-wb-t99a-L738) (stale-pass candidate: /tmp/fw-landchain-wb-t99a-L738/stale-pass-candidate.json)
```

The GATE-JUDGE line's serial-legs list reads `not-run (pre-leg REAL RED: 2 red(s) carry real assertions; no leg runs, nothing is appended)` for 22 of 22 legs (cap, scratch, apo, the two detached files, gp, h2, inspector, three rf files, sanitizer, child, compat, docs07, docs09, docs12, docs14, hk9l, risk, tool, w21) — the two census consequents did not just red themselves, they withheld every clearing leg. The context for scope: landings 735 (k=1 bisect after a batch red) and 736..737 (octopus, folded onto hop 89109cd37724, log line 12307, 05:56:29Z) landed normally in the same hour; 738 is the one that stopped the loop. R-B162 then adopted the stop, verbatim:

> Resolution: FRESH PREP at the next loop relaunch; this REFUSED(4) stop is ADOPTED as the g10.19 merge sequence's cycle-boundary stop (BUILD-PLAN step 1 - the loop stays down through the merge, machine gate, audit, and relaunches fresh with the g10.19 knobs OFF, picking landing 738 up first). If the fresh PREP reds the same way post-merge, solo + bare-trunk reproduction precedes any parking ruling.

So the per-landing cost class the corroborated file measured in minutes (76.3 min at 587) has grown a new unit at 738: the whole landing loop staying down through a merge, machine gate and audit — adopted deliberately, but available to adopt only because this class stops the loop.

## Finding 5 — a 3rd presentation of the class, the 2nd with this carrier and the identical w21 :62/:78 pair — **CONFIRMED** (the per-landing root classifications graded inline)

Three landings filed by this seat, three different root presentations of one mechanism — a timed-out pinned file re-counted by report-mode census rows as the gate's only real-assertion reds. The carrier and the consequent pair differ at 587 and match at 692 and 738:

- **Landing 587** (corroborated file, Finding 2; ruling R-B35, M:27633, 2026-10-27T23:12:09Z): a different carrier and a different pair — `test/workbench-pi-streaming.test.ts:42/:64` (`Test timed out in 5000ms`, realAssertions 0) over `test/workbench-docs04-tests-census.census.ts:557` ×2 (realAssertions 1), plus `test/workbench-tool-exposure-census.census.ts:581` (realAssertions 0); no w21 row. A pinned case's 5000 ms expiry reached the census rows as `the case failed in the test report: Error: STACK_TRACE_ERROR`. The preserved judge fixture the corroborated file names (`machines/flywheel/fixtures/landprep-redpath/fw-judge-wb-7rz9.20261027T230526Z.try1.json`, 27,299 B, sha256 `320d76553cbd809427a2c212740b0cd38c671848e8adde6c1cef0349e1f66148`, re-parsed here) shows both roots with full title chains and `"uncertain": false`, classed `not cleared (leg not-run (pre-leg REAL RED: 2 red(s) carry real assertions; no leg runs, nothing is appended)) - HOLD` — not an uncertain root.
- **Landing 692** (2026-10-30 pair, unlanded branch; ruling R-B114, M:36726): this carrier and this pair, plus a third real-assertion row — R-B114: "a 240000ms hook timeout in workbench-w21-survivor-pins.census.ts:62/:78 and the docs14 performance-benchmark census :553". The cap-saturation `beforeAll` timeout left the file uncollected; `census.ts:5167` returned `collection-error` for every pin on the file, with the `Hook timed out in 240000ms` marker carried into the verdict text at w21:62. The root was classed uncertain there too: the 2026-10-30 CORROBORATION quotes the 692 judge report's row `[0]  test/workbench-cap-saturation-receipt.test.ts:216 (hook)    Hook timed out in 240000ms  0  uncertain (reporter not exhaustively parsed / no title) - clear prohibited` (its line 138 on `origin/machine/flywheel/feedback-2026-10-30`, tip 0d4a63408b); the judge.json itself (`/tmp/fw-landprep-wb-fity-20261030T070147Z-646442/`) is gone from disk this session (`ls`: No such file or directory) and the preserved `~/s3/artifacts/flywheel/land-prep/2026-10-30-wb-fity-try1` and `-try2` hold `gate.json` only (196,850 B and 282,768 B), so 692's classing rests on that sibling quote.
- **Landing 738** (this file; ruling R-B162, M:40325): the default reporter emitted a suite-level FAIL header with no title chain — judge `red[0].uncertainReason` verbatim: `no title chain in the FAIL header (suite-level failure) - markerless, clear prohibited` — while the same red's `marker` field still reads `Hook timed out in 240000ms` (`markerRef: diagnostics[0].message#L7008`, `strictMarker: true`); so "markerless" in the ruling describes the FAIL header, not the whole record. The GATE-JUDGE rendering of the two consequents also differs between them at this site: `[32]` w21:62 carries `Hook timed out in 240000ms` as a hook red, `[33]` w21:78 reads `NO MARKER ... REAL RED (realAssertions 1 > 0)`.

Why this is worth a finding and not trivia: the machine's classifier keys on the presentation (title chains, markers, collection state). Graded per landing: the root was classed uncertain at 738 (`red[0].uncertain: true`, Finding 1 — CONFIRMED) and at 692 (the sibling's quote above — CONFIRMED by citation, the artifact itself gone), and was NOT classed uncertain at 587 (the fixture, `"uncertain": false` on both roots — CONFIRMED); so "uncertain" is a property of this carrier's 240000 ms suite-level hook failure at 2 of 3 landings, not of the class. Each of the three landings drew its own orchestrator ruling (R-B35, R-B114, R-B162). What is invariant across all three shapes is the mechanism: the only `realAssertions` > 0 rows were the report-mode consequents of the timed-out pinned file (docs04 :557 ×2 at 587; w21 :62/:78 and docs14 :553 at 692; w21 :62/:78 at 738), because those rows judge report rows, not reporter text. The recurrence count — 4 rulings of the class, 2 of them on the w21 pair; 6 landings filed by this seat (587; 627 and 650; 685; 692; 738) across four census files (docs04 at 587; docs14 at 627, 650 and 692; adversarial-matrix at 685; w21 at 692 and 738) — is the consumer signal that the class is under-promoted.

## Evidence

- `/tmp/fw-landprep-wb-t99a-20261031T055651Z-786718/judge.json` (145,072 B; exitCode 8; realReds; red[0]/red[31]/red[32]; identity block) and `gate.json` (787,480 B, not parsed this draft; preserved copy noted at `~/s3/artifacts/flywheel/land-prep/2026-10-31-wb-t99a-try1` by log line 12333).
- `machines/flywheel/ledger/metrics.jsonl` rows M:40239 (`landing-staged`, quoted in Finding 1) and M:40325 (R-B162, quoted in Finding 3); lineage rows M:36726 / M:38370 / M:39147 (table in Finding 3). Read-only.
- `/tmp/fw-land-loop.out` lines 12307-12341 (Finding 4, quoted; `grep -a`, the file contains binary bytes elsewhere).
- Source at `89109cd37724d20335040444548d942b60f77bda` via `git show` / `git rev-parse` (Finding 2 and the re-check table): w21 `:28,:30,:59-:63,:75-:80`; cap-saturation `:216-:218`; `package.json:42,:47-:48,:71`; `package-lock.json:5281-5282`; `vitest.census.config.ts` whole file (6 lines); `test/helpers/census.ts:4829,:5188`; blob ids fc6ccce / 507907c / 51bc11a (full ids in Finding 2), also resolved at 99e1dfd254663c2ba60ebdba8a15ac90fa31934c.
- Sibling artifacts for Finding 5: `machines/flywheel/fixtures/landprep-redpath/fw-judge-wb-7rz9.20261027T230526Z.try1.json` (27,299 B; sha256 `320d76553cbd809427a2c212740b0cd38c671848e8adde6c1cef0349e1f66148`, the digest the corroborated file states for landing 587's judge report) parsed read-only; the 2026-10-30 CORROBORATION's line 138 on `origin/machine/flywheel/feedback-2026-10-30` (tip 0d4a63408b); `git log origin/machine/flywheel/feedback-2026-10-30 -3` and the three files' Date lines for the Date line above; M:27633 (R-B35, wb-7rz9) for 587's ruling.

## Re-check verdicts on the corroborated file

| Claim in the 2026-10-28 file | Verdict at `89109cd37724d20335040444548d942b60f77bda` |
|---|---|
| `test/helpers/census.ts:5188` forwards `failureMessages[0]` and the helper has no timeout vocabulary for a pinned case | **STILL-TRUE** — re-read at 89109cd377: `:5188` is ``if (test.state === "failed") return verdict(pin, "asserts", "failed", `the case failed in the ${tier} report: ${test.errors[0] ?? "no error message"}`, count);`` and `:4829` is `errors: entry.failureMessages,` (the field is `test.errors[0]`, fed from `failureMessages`); and by blob identity: `git rev-parse 99e1dfd254663c2ba60ebdba8a15ac90fa31934c:test/helpers/census.ts` = `51bc11af33774f11f9eb57840d62c3bd33221d75`, identical at the corroborated file's own pin, at a520cbd and at 89109cd377. The mechanism's output reproduced at landing 738 (2 real-assertion census reds on a timed-out pinned file) |
| the test step writes `.forge/vitest-report.json` that the census step re-judges (`package.json:47-48`) | **STILL-TRUE** — re-read at 89109cd377, quoted in Finding 2 |
| a report-mode census red names the pinned case but cannot name the budget expiry that caused it | **STILL-TRUE, and now also presentation-invariant** — three root presentations (587/692/738, Finding 5) of one mechanism; the consequent pair matches at 692 and 738 (w21 :62/:78) and differs at 587 (docs04 :557 ×2) |
| the docs04 rows and `pi-streaming:42/:64` carry no timeout option | **UNDETERMINED** — not re-read this session; this file's sites are the w21 rows, not docs04 |
| landing 587's realized cost (76.3 min staged-to-fold vs 24.6 min median over landings 477-610) | **UNDETERMINED** — historical derivation not re-run; this file adds the 738 cost unit instead (Finding 4) |

## Recommendations, additive to the corroborated file's list

1. Cheapest, and new here: put the coupling at the carrier — one comment line on `test/workbench-cap-saturation-receipt.test.ts:216-218` saying that `test/workbench-w21-survivor-pins.census.ts:62/:78` judge this file's report rows and will red as real assertions whenever this hook dies. The ruling texts show the cost (Finding 3): R-B114 (M:36726) ruled the same two rows as "a 240000ms hook timeout in workbench-w21-survivor-pins.census.ts:62/:78" without naming the carrier; R-B162 (M:40325) is the first of the 4 to state the pairing ("DOCS_FLOOR/G6 pins over CAP_RECEIPT"); R-B132 and R-B144 ruled other report-mode census files (docs08 :546/:567; adversarial-matrix :646/:666) and never mention w21 or cap-saturation — CONFIRMED from the four `ruling` strings. A fresh session reading the carrier would meet the pairing at the source. (The reverse pointer already exists — w21:30 names CAP_RECEIPT — the carrier-side pointer does not.)
2. Promote the class out of the inbox: 4 rulings of the load-shaped fresh-PREP class (2 of them on the w21 pair) and 6 landings filed by this seat across four census files (docs04 at 587; docs14 at 627, 650 and 692; adversarial-matrix at 685; w21 at 692 and 738) is the under-promotion signal the feedback contract names; the 2026-10-30 pair's fixes (a liveness `expect` that names the carrier; the census-tier budget line from the 2026-10-21 file) are endorsed, not re-filed.
3. For whoever lands the 2026-10-30 branch files: this file is written to chain onto them — same blobs (full-id identical), next landing, next ruling — so they can land together as one class dossier.

## Positives worth protecting

- `--expect.requireAssertions` plus per-red `realAssertions` counting kept 31 of 33 reds classed as assertion-free timing/cascade rows, so the refusal surface was exactly the 2 coupled census rows — the honesty mechanism worked; what recurs is the coupling, not a counting error.
- The w21:62 verdict text carried the carrier's marker verbatim (`Hook timed out in 240000ms` in GATE-JUDGE `[32]`) — the diagnosability the 2026-10-30 pair asked to protect survived at this site.
- M:40239 pinned `tip`/`hop`/`trunkTip`/`expectedTree`/`mergeTree`, and the judge's identity block (`tipTreeMatchesArg: true`) let this draft prove the judged tree equals the staged merge tree without re-running anything.
- R-B162's text names its lineage labels inline, so a reader can count the class's rulings from the ledger alone — this file's n=4 rests on that property.

## What I did not establish

- **Landing 692's judge report itself.** Its root classification is cited from the 2026-10-30 CORROBORATION's quote (Finding 5), not re-parsed: the judge.json R-B114 names is gone from `/tmp`, and the preserved `~/s3/artifacts/flywheel/land-prep/2026-10-30-wb-fity-try1` / `-try2` directories hold `gate.json` only — the missing artifact is that judge.json.
- **load1 294-321** is quoted from R-B162 only; `gate.json` (where the load figures live, per the 2026-10-30 pair's Finding 4) was not parsed this draft.
- **Why the judge's consequent allowlist did not declass the pair.** `judge.json.reportModeConsequent` shows `"knob": "FW_JUDGE_CONSEQUENT"` with a 2-entry allowlist loaded from machine state, yet both w21 rows still reached `realReds`/`needsRulingReasons`. Whether the allowlist names other files or names these and intentionally does not suppress them is machine-side (the allowlist file and judge source were not read) — UNDETERMINED, artifact named.
- **The post-merge outcome.** R-B162's own conditional ("If the fresh PREP reds the same way post-merge, solo + bare-trunk reproduction precedes any parking ruling") had not resolved at this draft's read; whether landing 738 greens on the fresh PREP is future evidence.
- **The 2026-10-30 files' findings beyond the rows re-checked above** (adversarial-matrix:666, the exposure counts, the a520cbd readbacks) were not re-verified here; their blobs' identity to 89109cd377 is proven only for the 3 files named in Finding 2.
