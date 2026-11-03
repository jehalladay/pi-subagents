# CORROBORATION n=44 landings 396-439 at fced7bfd (same seat, later cycle; no independent hit): docs09:787 red at 10 landings, and all 103 serial legs (every file) = 45.3 min (101 zero-assert = 44.5 min; docs09 alone 62 legs = 30.3 min), while the gated 60000 ms cure e5b10c53 stayed PASS-held

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat, a later cycle; a fresh artifact window, not an independent implementation or test execution.
**Date:** 2026-10-26; measured window 2026-10-25T07:45:00Z..2026-10-26T07:30:00Z (23 h 45 min, the daily window, not literally 24 h).
**`pi-subagents` revision:** installed tool pin supplied by dispatch: `workbench/implementation-program@fced7bfda63e6975d331fd4f31ff4463b2c9136e`. Source read: `origin/workbench/implementation-program` fetched at that same full sha; `git rev-list --count fced7bfda63e6975d331fd4f31ff4463b2c9136e..origin/workbench/implementation-program` printed `0`. Its commit is `2026-10-25T21:21:19Z ledger: close wb-0kfa (landing 439, merge d1793b1d)`. Installed binary provenance was supplied, not independently verified by running pi-subagents. The clone's checked-out HEAD is 753 commits behind the pin and was not used for source quotes.
**`vitest` revision:** `4.1.10`; pinned `package-lock.json:5281-5282` says `"node_modules/vitest": {` / `"version": "4.1.10",`; the clone's version-only invocation printed `vitest/4.1.10 linux-x64 node-v24.20.0`. Pinned `package.json:3` says `"version": "0.20.0",` for pi-subagents.
**Gate harness revision:** the exact `harness` string `forge 0.2.1 (rev 1aba570e31dc)` appears on 54 of 90 in-window gate-pass rows; 7 name `forge 0.2.1 (rev 40c9ca729f7e)`, 22 omit `harness`, and 7 carry other strings. This is producer-recorded provenance, not a local harness execution.
**Method:** read-only `python3 -I` JSONL filter, inclusive UTC bounds above, `float()` coercion of string `ms`/`load1` and `int()` coercion of mixed string/integer `landing`; counted row kinds, verdictClass, reds[], registerHits, serial legs and their file/seat/run. Read O:942, M:19309/19518/19524, and live gate-queue/register snapshots without modifying the machine. Source: `git show`/`git grep`/`git log` at the explicit pin, plus the cure's explicit sha. No vitest test ran, no `bd` command, no gate, no commit, no push.
**Scope:** pi-subagents' census-tier test budgets and closure/landing conventions as experienced by the flywheel. The machine ledger is evidence of realized cost, not a claim that the machine's register or owner relay is defective. This file does not ask to bypass the owner ruling.
**Corroborates:** [`2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md`](2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md) — **STILL-TRUE** at `fced7bfda63e6975d331fd4f31ff4463b2c9136e` for the missing census floor and the docs09 cost; **CHANGED** for magnitudes and wb-ro6u's status (table below); independent hit: none (same seat, later cycle; the `n=44` in the title counts the landings in this window, not independent witnesses). Original pin `b887fa2e9f581f9a6b1e9d47cb723029aae353ae`.
**Prior art:** fetched-ref listing has 18 entries including README; keyword check `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/ | grep -i -E 'docs09|787|timeout|5000|census|serial|timing|ro6u|e5b10c|60000|held'`; body check `git grep -il -e 'ro6u' -e 'e5b10c5' -e 'WHOLE_TABLE_BUDGET' fced7bfda63e6975d331fd4f31ff4463b2c9136e -- new-feedback/` finds only the direct target. Its Finding 6 names the cure in flight, but explicitly did not read its gate state past M:19240; this file adds that PASS/hold evidence and the next closed landing set. No same-revision file at the fetched default ref states these new counts and hold chronology.
**Delivery:** draft only in a new detached worktree cut from the fetched ref; intended collector branch `machine/flywheel/feedback-2026-10-26`, not checked out or committed by this seat. Docs-only gate waiver disclosed under the filing direction: no build/test/gate ran; `git config core.hooksPath` returned rc 1 (unset), and `.gitmessage`/`.githooks` were absent in the clone. No hook refused this draft. A future commit must repeat the waiver in its body; this file is not delivered or landed.

## Summary, with numbers

**CONFIRMED —** the daily window contains 3093 ledger rows, M:19384..M:22476. All 103 serial-leg rows (every file; 11 distinct files) sum to 2,720,965 ms = 45.3 min; 101 of 103 carry `realAssertions:"0"` and sum to 44.5 min, while 2 carry `"1"`. The docs09 file alone accounts for 62 of those 103 legs = 1,816,126 ms = 30.3 min, all 62 at 88 tests, zero-assert and try 1. Of 46 landing-gate rows over 44 distinct landings 396-439, 10 rows at 10 distinct landings carry a docs09:787 strict 5000 ms red. The whole-table cure e5b10c53 was recorded PASS-WITH-FINDING at 08:42:07Z and HELD at 08:44:06Z for an owner F1 register-blob ruling plus the landing relay; 61 of 62 docs09 legs (29.8 min) and all 10 new-landings' :787 reds are stamped after that hold. Those are temporal costs, not proven savings the cure would have realized: :688 remains on the default even in the cure, and leg rows do not identify the red case.

## Why a second file rather than an edit

The earlier file's counts and pin remain intact. This is the same seat in the next cycle, with a fresh set of 44 landings and a newly observable gate/hold state. It adds evidence rather than overwriting or claiming a second independent witness. The owner's scope and ruling process remain authoritative.

## What this adds

**A realized cost — CONFIRMED:** 61 docs09 file-alone legs totaling 29.8 min accrued after the per-case cure's recorded hold, alongside :787 reds at 10 of the next 44 landings. The prior file named the cure only as delivered/in flight. The HOLD is a register re-key decision plus relay, not a measured runtime defect in that cut. The missing census-tier budget remains the tool-side ask.

## Already filed — this corroborates, it does not restate

| Axis already filed | Where |
|---|---|
| Census floor absent; docs09 re-proof cost; per-case cure delivered but gate state unexamined | `2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md`, Findings 2, 5, 6; fixes 1-2 |
| Per-landing count: :787 at 8 of 23 landings 315-337; register routing retains serial proof | `2026-10-24-CORROBORATION-docs09-787-red-at-5000-ms-in-8-of-23-landings-315-337-four-more-register-rows-at-1-2-each-13-reds-0-asserts-12-of-12-legs-green-census-config-at-cbe3588-sets-no-testtimeout.md`, Findings 1-3 |
| Report-mode census timing reds; a config floor proposed | `2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md`, Findings 1-3 / fix 1 |
| Default-tier timing reds and per-it budgets | `2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md`, Findings 1-3 / fix 1 |

## Finding 1 — 103 serial legs cost 45.3 min, 101 zero-assert legs cost 44.5 min, and docs09 takes 62 legs / 30.3 min — **CONFIRMED**

Derivation command (read-only; script written in local scratch, not the machine):

```text
python3 -I /tmp/c2-probe/derive.py /workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl
```

Verbatim selected output lines:

```text
file_lines 22530 window_rows 3093 first M:19384 2026-10-25T07:46:50Z last M:22476 2026-10-26T07:25:40Z
kinds serial-leg 103 gate-pass 90 gate-held 90 landing-gate 46 landing-gate-correction 1 fold-done 46 register-grant 2 register-refresh 1
serial-leg 103 first M:19476 last M:22217 sum_ms 2720965 wall_min 45.3 min 3519 med 26673 max 131078
serial-leg realAssertions {'0': 101, '1': 2} try {'1': 102, '2': 1} vitestCap {1: 103} load1 min 65.1 max 351.48
zeroAssert legs 101 ms 2671532 min 44.5
seatClass {'gate-prep-*': 82, 'land-prep': 21}
run [('g10-gate-s92', 28), ('gate-judge', 23), ('g10-gate-s90', 19), ('g10-gate-s98', 15), ('g10-gate-s100', 15), ('g10-gate-s97', 3)]
LEGFILE test/workbench-docs09-readers-relationships.census.ts legs 62 ms 1816126
LEGFILE test/workbench-inspector.test.ts legs 13 ms 240193
LEGFILE test/workbench-tool-exposure-census.census.ts legs 9 ms 165343
LEGFILE test/workbench-compat-feature.census.ts legs 7 ms 179977
LEGFILE test/workbench-w21-survivor-pins.census.ts legs 4 ms 21907
LEGFILE test/workbench-sanitizer-corpus.test.ts legs 2 ms 87797
LEGFILE test/workbench-docs14-performance-benchmark.census.ts legs 2 ms 49433
LEGFILE test/workflow-runtime.test.ts legs 1 ms 9285
LEGFILE test/workbench-risk-register.census.ts legs 1 ms 14798
LEGFILE test/workbench-tool-reply-bench.test.ts legs 1 ms 131078
LEGFILE test/workbench-child-crash-faults.census.ts legs 1 ms 5028
docs09 legs 62 sum_ms 1816126 wall_min 30.3 min 17483 med 28985 max 45954 testsRun {'88': 62} realAssertions {'0': 62} tries {'1': 62} load1 65.1-293.63
docs09 seatClass {'gate-prep-*': 53, 'land-prep': 9} first M:19476 2026-10-25T08:20:35Z last M:22216 2026-10-26T03:57:40Z
docs09 legs after 2026-10-25T08:44:06Z: 61 ms 1785663 min 29.8; at/before: 1 (M:19476 2026-10-25T08:20:35Z ms 30463)
```

Raw serial-leg row M:19476 (verbatim):

```json
{"kind":"serial-leg","bead":"wb-yf50","seat":"gate-prep-1","file":"test/workbench-docs09-readers-relationships.census.ts","ms":"30463","realAssertions":"0","try":"1","tree":"d5e5936ee2395113c257d7967f43816d71f7975f","load1":"187.37","vitestCap":1,"testsRun":"88","utc":"2026-10-25T08:20:35Z","run":"g10-gate-s90","gen":"g10","actor":"flywheel"}
```

**CONFIRMED —** docs09 ms min / median / max are 17,483 / 28,985 / 45,954 across those 62 rows, the median being the mean of the two middle sorted values 28,825 and 29,145 (even count, positions 31 and 32 of 62; 29,145 alone is the upper middle value, `statistics.median_high`, which is where an earlier 29,145 figure came from). Every one of the 103 leg rows has `file`, none has `line`; therefore 30.3 min is a file cost, not a :787-only cost. The 11-file list above is complete for these 103 rows, not just the top four. The two real-assert legs are M:21488/M:21489, docs14-performance-benchmark, both recorded `outcome:"red"`; the latter is the sole try-2 row. It would be false to call all 103 legs zero-assert or green.

## Finding 2 — :787 reds at 10 of 44 new landings; historical correction kept separate — **CONFIRMED**

Selected derivation output, verbatim:

```text
landing-gate 46 first M:19488 landing 396 2026-10-25T08:25:49Z last M:21546 landing 439 2026-10-25T21:20:35Z distinct 44 dupes {401: 2, 412: 2} verdict {'pass': 44, 'held': 2} verdictClass {'<absent>': 30, 'PASS-WITH-TIMING-NOTE': 14, 'REAL-RED refusal': 2} furnaceMode {'supervised': 46}
landing-gate withReds 16 redEntries 30 serialLegRows sum 21 holds sum 2
landing-gate red combos (marker, realAssertions, row verdict): {('Test timed out in 5000ms', 0, 'pass'): 25, ('NO MARKER', 1, 'held'): 4, ('Test timed out in 5000ms', 0, 'held'): 1}
landing-gate-correction M:20515 landing 382 corrects M:18422 ruling R770 reds 7 utc 2026-10-25T14:40:03Z
red keys incl. correction (37): [('docs09-readers-relationships.census.ts:787', 11), ('inspector.test.ts:58', 7), ('compat-feature.census.ts:406', 4), ('tool-exposure-census.census.ts:581', 3), ('sanitizer-corpus.test.ts:1162', 2), ('tsx-h2-proposed-api-census.test.ts:1706', 1), ('tsx-h2-proposed-api-census.test.ts:1716', 1), ('ri-decision-seed-claim-census.test.ts:1112', 1), ('ri-decision-seed-claim-census.test.ts:1122', 1), ('sanitizer-corpus.test.ts:969', 1), ('sanitizer-corpus.test.ts:1477', 1), ('w21-survivor-pins.census.ts:60', 1), ('docs04-tests-census.census.ts:551', 1), ('docs09-readers-relationships.census.ts:688', 1), ('risk-register.census.ts:408', 1)]
:787 reds after 2026-10-25T08:44:06Z: 10 of 10
```

The 46 landing-gate rows cover 44 distinct landings 396-439: landing 401 has a held row M:19749 then pass M:19792; landing 412 has held M:20402 then pass M:20438. Sixteen of 46 rows carry 30 red entries. The :787 subset:

| Landing | Ledger row | UTC | Verdict | docs09 leg back-reference |
|---|---|---|---|---|
| 398 | M:19580 | 2026-10-25T09:03:29Z | `pass` | M:19563 |
| 401 | M:19749 | 2026-10-25T10:09:43Z | `held` | none; real-red row held before legs |
| 404 | M:19994 | 2026-10-25T11:38:11Z | `pass` | M:19985 |
| 411 | M:20347 | 2026-10-25T13:37:09Z | `pass` | M:20317 |
| 413 | M:20493 | 2026-10-25T14:31:18Z | `pass` | M:20464 |
| 421 | M:20844 | 2026-10-25T16:32:13Z | `pass` | M:20838 |
| 422 | M:20907 | 2026-10-25T16:55:19Z | `pass` | M:20899 |
| 425 | M:21018 | 2026-10-25T17:37:00Z | `pass` | M:21014 |
| 432 | M:21240 | 2026-10-25T19:16:50Z | `pass` | M:21233 |
| 438 | M:21475 | 2026-10-25T20:57:49Z | `pass` | M:21457 |

**CONFIRMED —** all 10 :787 entries carry `marker:"Test timed out in 5000ms"` and `realAssertions:0`. Nine are on pass rows; one rides landing 401's two marker-less assertion reds and is held with them, with no serial leg on that attempt. The nine legRow references resolve to docs09 serial-leg rows for the matching beads, all try 1 / 88 tests / realAssertions 0.

**CONFIRMED — historical-record scope:** M:20515 is written at 2026-10-25T14:40:03Z but corrects M:18422 for **landing 382**, outside the 396-439 set. Its seven entries make 37 recorded reds when combined with the 30 new-landing entries; they are not 37 new failures in these 44 landings. In the combined recording-time count, :787 is 11, inspector:58 is 7 and :688 is 1; in the new-landing-only count, :787 is 10, inspector:58 is 6 and :688 is 0. The prior acceptance line remains NOT MET because :787 and inspector:58 still appear; :688 has no newly observed landing red here, but that does not prove it cured.

## Finding 3 — missing budgets reproduce at the pin; e5b10c53 budgets only :787 and has not landed — **CONFIRMED**

Entire `vitest.census.config.ts:1-6` at fced7bfd, verbatim:

```ts
import { defineConfig } from "vitest/config";
// wb-nl8 census tier: census legs (test/**/*.census.ts) judge the gate's OWN report at
// .forge/vitest-report.json (written by the test step) and never re-execute it. The .census.ts
// suffix keeps them outside the default include test/**/*.test.ts, so the default report can
// never record a judging file (u62 p-in-run, census.ts judge()).
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
```

Source/negative probes and armed positive control:

```text
$ git grep -n -E 'timeout' fced7bfda63e6975d331fd4f31ff4463b2c9136e -- test/workbench-docs09-readers-relationships.census.ts
rc=1
$ git grep -n -E 'timeout' fced7bfda63e6975d331fd4f31ff4463b2c9136e -- test/workbench-docs06-conformance.census.ts
fced7bfda63e6975d331fd4f31ff4463b2c9136e:test/workbench-docs06-conformance.census.ts:304:const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };
```

The control output above is its first matching line, not its whole output. Pin docs09:688-693 and :787-790 are two-argument registrations, quoted verbatim:

```ts
  it.each(PINNED_HALVES.map(({ row, half }) => ({ key: halfKey(row, half), half })))("AC2 $key: every pinned case is collected once, passed and asserting in the default gate's own report", ({ key, half }) => {
    const verdicts = judge(REPORT, half.pins.map(entry => casePin(entry)));
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(`row ${key}`, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.cases)).toEqual(half.pins.map(entry => entry.each ?? 1));
  });

  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
    const verdicts = judge(REPORT, ALL_PINS.map(entry => casePin(entry)));
    expect(verdicts.map(verdict => verdict.code)).toEqual(ALL_PINS.map(() => "ok"));
  });
```

**CONFIRMED —** docs09 blob at the pin is `3f7db6021e7769a919378ffb6269b77549332603`, last source-touch commit `9f116fc 2026-10-21T08:02:18Z`. `git log --format='%h %cI %s' b1ce8c1..fced7bfda63e6975d331fd4f31ff4463b2c9136e -- test/workbench-docs09-readers-relationships.census.ts` printed no commits (rc 0). The cure's parent `b1ce8c1e0df944fd1fc4a9a8fb3b2d6fb5a863b2` closes landing 392 and is an ancestor of the pin (rc 0).

The remote cure `origin/machine/flywheel/wb-ro6u` resolves to `e5b10c5377169a4cb391ff17fbca46330a4dc7a1`; `git show --stat --format=''` reports one file, 14 insertions and 1 deletion. Its docs09 diff adds these lines (verbatim excerpt):

```diff
+   * wb-ro6u (owner tune M:16183): the explicit budget of the next case ALONE (the R546 sizing recipe, file-local); every
+   * other case, this file and the suite keep vitest's 5000 ms default. The case is one synchronous judge() over all 56
+   * pins of the table (15 files): judge() reads the default tier's whole report and analyses each pinned file with its
+   * relative import closure on the calling thread, so the case awaits nothing that a tighter setup could bound. vitest
+   * fails a synchronous body that returns after its budget but cannot interrupt one, so the budget moves only that
+   * duration verdict, never an assertion. Measured at base 4c97422 against a full default-tier report (17037 cases,
+   * written by `npm run test` at 8 workers), this file alone under vitest.census.config.ts at cap 1: 3635-5645 ms over
+   * 10 runs, 5 of them past 5000 ms. Sized as 5 x the costliest wall of record, the case at 11620 ms in the file-alone
+   * serial leg of the wb-sjx2 gate (cmd_d4fd9ea78492, 2026-10-24): 58100 ms, rounded up to a whole 5 s.
+  const WHOLE_TABLE_BUDGET_MS = 60_000;
-  });
+  }, WHOLE_TABLE_BUDGET_MS);
```

This is a selective diff excerpt, not a contiguous hunk. Cure source :798 defines the constant and :803 uses it. No claim here independently re-measures the comment's case timings. `git merge-base --is-ancestor e5b10c5377169a4cb391ff17fbca46330a4dc7a1 fced7bfda63e6975d331fd4f31ff4463b2c9136e` returned rc 1; armed ancestry control on its parent returned rc 0. It is not landed at the pin, and the cure itself leaves :688 unchanged.

## Finding 4 — the cure is recorded PASS but HELD for a register ruling; 61 docs09 legs / 29.8 min follow the hold — **CONFIRMED**

Producer records, not a new gate execution: M:19309 gate-start at 2026-10-25T07:11:59Z (before this window); M:19518 gate-pass at 08:42:07Z names `commit:e5b10c5377169a4cb391ff17fbca46330a4dc7a1`, `gatedCommit:e73a94f36a1bb0e4db438b76eef680cf4cc7938a`, `verdictClass:PASS-WITH-FINDING`, `needsRuling:true`, empty `registerHits` and `registerHitCount:0`. The gated commit is a PREP merge probe with parents `22a3a67c741e4421735da0b196b9ed0348f93ec7` and the cure, not the branch cut itself.

M:19524, entire raw hold row:

```json
{"kind":"gate-held","bead":"wb-ro6u","seat":"gate-prep-24","commit":"e5b10c5377169a4cb391ff17fbca46330a4dc7a1","entryCommit":"e5b10c5377169a4cb391ff17fbca46330a4dc7a1","verdict":"pass","gatePassRow":"M:19518","closureRow":"O:942","needsRuling":true,"reason":"PASS-KEEPS-ENTRY (rule of record 2026-10-16T21:41Z): queue entry state/gate-queue/wb-ro6u.json and gate lock gate-prep-24@g10-gate-s85 stay HELD until the owner landing relay; no dequeue, no unlock; landing waits on the owner F1 ruling (needsRuling TRUE)","idem":"gate-held-wb-ro6u-g10-gate-s85-e5b10c53","utc":"2026-10-25T08:44:06Z","run":"g10-gate-s85","gen":"g10","actor":"flywheel"}
```

O:942 `findings[0]`, verbatim producer text:

> - F1 LOW OWNER WEIGH-IN: (PREP F1 + GATE G2; mechanism CONFIRMED, an in-gate red PLAUSIBLE and not seen at H) register idx 13 (test/workbench-docs09-readers-relationships.census.ts:688 AC2 'RA1/a', R676 entry 28) and idx 11 (:787 whole-table, R653 entry 26) are keyed to blob 3f7db602, and the cut moves the file to d50e2984 (probe and cut tip d50e2984; cut merge-base b1ce8c1e, gateBase 22a3a67 and the BIND trunk 2982607 all 3f7db602), so under the bin/gate-judge.py blob rule any strict-marker :688 'RA1/a' timeout at land-prep or a later gate classes as a blob-changed REAL RED on byte-identical lines (lines 1-786 unchanged); PREP measured that row red in its census-tier mirror (6367 ms at load1 157) and 1 of 20 serial default-budget runs redded the unregistered :688 'RL3/a' (5776 ms, 0 AssertionErrors), while the gate of record cmd_7415aa7141c9 had 0 reds; ASK: an owner pre-bound ruling (R748 form) before or at land-prep on how a strict-marker :688 AC2 timing red at d50e2984 is judged - option (a) re-register or blob-refresh idx 13 at d50e2984 (R652 sightings, or the R780 blob-refresh precedent at the fold), option (b) a sibling owner-tune bead giving the AC2 it.each judging cases the R546 budget; this bead forbids a blanket raise, so the cut does neither (correct per scope); no pre-bound ruling was found in BOUNDARY (re-read at BIND) or in the bead notes.

O:942 `summary` opens, verbatim excerpt:

```text
BIND RECORD wb-ro6u - PASS. Seat gate-prep-24 (scheduler runner gate-2), run g10-gate-s85, gen g10. BIND start epoch 1792916567 (2026-10-25T08:22:47Z); rows written from 2026-10-25T08:40:47Z.
VERDICT: PASS. verdictClass PASS-WITH-FINDING (clean supervised gate of record, 0 reds, 0 register hits; ONE R694 carry at the landing, plus a by-hand register duty at the landing fold - see the Routing line). needsRuling TRUE, carried from PREP (the gate-side reading is FALSE; gate-judge 1.1.0 FALSE): the owner's pre-bound ruling on how land-prep judges a strict-marker :688 AC2 timing red at the new blob d50e2984 is asked before or at land-prep. ownerOption none (PASS; the g8 R17 discriminator applies to record-shaped refusals only). unmet none. PASS-KEEPS-ENTRY: the queue entry and the gate lock stay HELD until the owner's landing relay.
```

**CONFIRMED — temporal scope:** all 10 new-landing :787 reds in Finding 2 are stamped after 08:44:06Z; 61 of 62 docs09 legs total 1,785,663 ms = 29.8 min after the same stamp. Only M:19476 precedes it (30,463 ms at 08:20:35Z). No causal assertion that all of those legs disappear with :787's budget follows: :688 is a separate default-budget key, and per-file leg records cannot apportion case costs.

**CONFIRMED — live snapshot, not the window-close snapshot:** at 2026-10-26T08:15:41Z, the read-only listing contained 95 gate-queue JSON entries including `state/gate-queue/wb-ro6u.json`, which names the cure, its landing-392 base, and `enqueuedUtc:"2026-10-25T06:46:46Z"`. The active-file register snapshot contained 48 entries; docs09 indexes 11 (:787) and 13 (:688), zero-based, both still key blob `3f7db602`. The register entries have no `status` field, so this file does not infer status from a missing field. The hold is an owner decision about the unchanged :688 lines at a changed file blob and a landing relay; the clean gate is not blanket proof against all future :688 timing reds.

## Finding 5 — timing-note frequency changes but register hits retain the same file-level cost — **CONFIRMED**

Selected derivation output:

```text
gate-pass 90 verdictClass {'PASS-WITH-TIMING-NOTE': 54, 'PASS-WITH-FINDING': 36}
gate-pass registerHits nonempty 54 (all PASS-WITH-TIMING-NOTE: True); files named: [('test/workbench-docs09-readers-relationships.census.ts', 53), ('test/workbench-tool-exposure-census.census.ts', 7), ('test/workbench-compat-feature.census.ts', 6), ('test/workbench-inspector.test.ts', 6), ('test/workbench-w21-survivor-pins.census.ts', 3), ('test/workbench-risk-register.census.ts', 1), ('test/workbench-child-crash-faults.census.ts', 1)]
gate-held 90 verdictClass {'<absent>': 33, 'PASS-WITH-TIMING-NOTE': 27, 'PASS-WITH-FINDING': 30}
```

The `registerHits` fields are strings, not line-key arrays: they use `file#titleChain`, with `|` between hits. The 53-of-54 docs09 figure counts gate-pass rows naming that file, not 53 :787 failures; some name :688. All 90 gate-pass rows record vitestCap 8 and nproc 64; their loadAvgStart range is 43.17-451.07. All 103 serial legs record cap 1, load1 65.1-351.48. Shared-host load is observed context, not a measured causal decomposition.

## Re-check verdicts on the corroborated file

Original pin for every row: b887fa2e9f581f9a6b1e9d47cb723029aae353ae; new pin: fced7bfda63e6975d331fd4f31ff4463b2c9136e. Historical counts describe their own window and are not refuted by new counts.

| Target claim | Re-check verdict and evidence grade |
|---|---|
| Finding 1: 86 of 99 gate-pass timing-note | **CHANGED / CONFIRMED:** new window 54 of 90, other 36 PASS-WITH-FINDING; Finding 5 |
| Finding 2: 299 legs / 132.3 min, 285 zero-assert; docs09 119 / 66.1 min | **CHANGED / CONFIRMED:** 103 / 45.3 min, 101 zero-assert / 44.5 min; docs09 62 / 30.3 min. Attribution of the reduction to the detached cure is **UNDETERMINED** here: the missing comparison artifact is a complete prior-window per-file derivation (not performed here; the ledger is available, but the prior file printed only its top four); current complete list contains no detached-family file. No causality inferred |
| Finding 3: 61 landing-gate rows / 21 reds, strict timeouts distinguished from real assertions | **CHANGED / CONFIRMED:** 46 rows for 44 new landings, 30 reds, 26 strict-marker zero-assert and 4 marker-less assertion reds. Both real-red attempts held before legs; 7 historical correction entries are separately scoped |
| Finding 4: detached cure reaches six files / 12 occurrences, no census file | **CHANGED / CONFIRMED:** at the new pin test-side reach still five test/helper paths / 10 occurrences; whole-repo grep hits `.beads/issues.jsonl` 25 times (2 at b887fa2e, already inside the original's six-files / 12-occurrences count, its line 88) and now also three feedback files (8, 11, 1), none of which the b887fa2e grep hit. Both 7e9a1eb and 3114970d remain ancestors (rc 0). Runtime effectiveness not re-tested |
| Finding 5: 0 of 27 census-tier files have literal timeout options versus 89 of 104 default-tier census-named files | **CHANGED / CONFIRMED:** same regex at new pin returns 0 of 28 versus 91 of 106. The six-line census config still lacks testTimeout; docs09 still lacks timeout spellings / numeric trailing-budget closers. **UNDETERMINED:** the old register-files subset was not re-enumerated; missing artifact is a new per-key budget audit |
| Finding 6: :787 synchronous mechanism / prior case timings / cure delivered in flight | **STILL-TRUE / CONFIRMED** for the unchanged docs09 source and per-case cure scope; **CHANGED / CONFIRMED** for state: now recorded PASS and HELD. Prior case timings are producer evidence, not re-executed; fresh timing validity is **UNDETERMINED** without new case-level runs |
| Finding 7: workaround register 46 entries, 14 default + 32 census | **CHANGED / CONFIRMED:** live read has 48 entries, 15 default + 33 census; in-window grants M:20876 child-crash-faults:60 (47 after grant), M:21512 sanitizer-corpus:1477 (48). New docs09 keys retain old blob. Full old growth chronology not re-audited |
| Acceptance line 200: docs09:787/:688 and inspector:58 leave red list, zero timeout entries at those keys | **NOT MET / CONFIRMED:** new-landings count :787 10 and inspector:58 6; recording-time count including landing-382 correction :787 11, :688 1, inspector:58 7. Register departure also unmet in live snapshot; no newly observed :688 landing red in this closed set |

## Suggested fixes, cheapest first

These remain requests, not experimentally verified cures in this session.

1. **Owner decision first, no bypass:** resolve the already-recorded F1 at the changed docs09 blob using the owner's allowed re-key/budget route before the relay lands wb-ro6u. The source cut is a per-case :787 cure, not the census-tier floor. Preserve its explicit scope and record-honesty disclosure; do not claim it fixes :688.
2. **Re-weight the existing one-line census floor request:** evaluate `testTimeout: 60_000` in `vitest.census.config.ts`, keeping the include/allowOnly and report-mode split untouched, or named per-case budgets for the remaining registered census rows if a blanket floor conflicts with scope. The prior file's per-case measurements and cap-1 commands justify testing that value; this session did not run it. Size from case durations, never the whole 88-test file wall.
3. **Keep the default-tier ask separate:** inspector:58 remains unbudgeted at the pin (`it('window access reads only visible rows even after 100k updates and retains selected identity',()=>{`); the census config cannot reach it. Re-probe a measured per-it budget there rather than counting a census-floor change as its cure.

**Acceptance to re-probe:** in a comparable daily window after the owner-approved budget/re-key change, report row IDs and correction scope separately; count docs09:787/:688 and inspector:58 new-landing red entries (here 10/0/6), docs09 file legs (here 62, 30.3 min), all serial legs (here 103, 45.3 min, 101 zero-assert), and departure/refresh of the relevant register keys. Retain real-assert refusals and prove that an assertion mutant still reds. No numeric improvement is promised without that re-probe.

## Positives worth protecting

- **CONFIRMED — real-red separation:** landing 401 M:19749 held both marker-less assertion reds and the accompanying :787 timeout before serial proof (`serialLegRows:0`); landing 412 M:20402 likewise held its two real assertion reds. The two later clean passes do not erase the held attempts. Preserve that pre-leg fail-closed behavior while changing budgets.
- **CONFIRMED — honest scope of the per-case cure:** e5b10c53 explicitly leaves every other case at the default; O:942 carries `needsRuling:true` despite a clean gate. That disclosure protects against equating a PASS with resolved :688 register semantics.
- **CONFIRMED — report-mode isolation:** the pinned config's comments and include suffix keep census readers outside the report they judge. A budget fix need not merge the tiers or rerun the report-producing tests inside the census.

## Evidence

All M:n references are lines in `/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl`; O:942 is line 942 of sibling `outbox.jsonl`. These are producer-written artifacts, not echoed plan claims. Source quotes use explicit git objects in this seat's clone only. Live state reads use that machine's `state/gate-queue/` and `state/known-settled-rows.json`, read-only.

The compact derivation script and its captured output reside in `/tmp/c2-probe/derive.py` and `/tmp/c2-probe/derive.out` for immediate replay; a second, independently written pass (`/tmp/c2-fix-probe/rederive.py` and `afterleg.py`, `python3 -I`, the same inclusive bounds) reproduced the 3093-row window, the 62 docs09 values' two middle values and the post-window deltas quoted under "What I did not establish". All are scratch, not durable receipts. The file contains selected verbatim output and raw rows so its primary counts do not depend on scratch survival. No referenced live land-/gate- checkout was read.

## What I did not establish

- **UNDETERMINED:** installed pi-subagents binary/source identity beyond the dispatch pin; missing artifact: installed module provenance or build receipt. Source sha and vitest version are independently read as above.
- **UNDETERMINED:** every gate/serial log's true outcome or case-level cause. I read producer ledger fields, not all 103 logs. Missing artifacts: per-leg reports/logs with case keys. The 62-leg docs09 sum cannot be attributed wholly to :787 or wholly avoided by its cure.
- **UNDETERMINED:** effectiveness of 30_000 or 60_000 as a tier floor under current parallel load; missing artifact: a controlled before/after gate with assertion-mutant and timeout evidence. No runtime cure was tested here.
- **UNDETERMINED:** live queue at the exact window close; missing artifact: a 07:30Z queue snapshot. My 95-entry snapshot was later, at 08:15:41Z; it supports continued presence at read time, not an exact queue-size history.
- **PLAUSIBLE:** the orchestration packet gave 3118 window rows, 104 legs / 45.8 min, 92 gate-pass, 91 gate-held and 105 green rather than my 3093 / 103 / 90 / 90 / 104. Measured on the same ledger: the first 25 rows stamped after 07:30:00Z (M:22477..M:22501, 07:31:39Z..07:52:20Z) are serial-leg +1, gate-pass +2, gate-held +1, green +1 — exactly the packet's deltas (3093 + 25 = 3118) — and row 26 (M:22502, 07:54:51Z) is a further gate-held that would break the match; the one extra leg is M:22485 (docs09, 24,399 ms), and 2,720,965 + 24,399 = 2,745,364 ms = 45.76 min, which rounds to the packet's 45.8. So the packet most likely read the ledger with an open upper bound at about 07:52Z; its exact filter bounds remain the missing artifact that would make this CONFIRMED. Three local reads (file lengths 22524, 22530 and 22539) reproduced 3093 for the explicit inclusive bounds; the window itself stayed stable. The packet is not substituted for this derivation.
- **CONFIRMED probe limitation:** the first tally script failed after its serial/gate tallies on mixed string/int landing values (`TypeError: '<' not supported between instances of 'str' and 'int'`). A corrected independent compact pass coerced landing with int() and reproduced the earlier counts. No result is inferred from the failed landing section. One zsh `echo ===` failed during a help batch; lint help was rerun in bash. No probe was reported as a successful test run.
- **UNDETERMINED:** causal contribution of shared-host load or detached-family cure to the reduced count; missing artifact: comparable controlled execution and a complete prior per-file comparison derivation (not performed here). Current legs and loads establish cost and context, not causality.
