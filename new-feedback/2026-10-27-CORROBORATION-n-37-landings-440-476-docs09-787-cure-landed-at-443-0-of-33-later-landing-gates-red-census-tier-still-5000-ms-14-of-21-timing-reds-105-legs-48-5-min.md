# CORROBORATION, n=37 landings 440-476 (n counts landings, not independent hits): the docs09 whole-table cure landed at 443, its case red in 0 of 33 later landing gates, but the census tier still has the 5000 ms default; 14 of 21 timing red entries are census rows and 105 serial legs cost 48.5 min

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle with a new closed window, not an independent implementation or test run.
**Date:** 2026-10-27; window 2026-10-26T07:30:00Z..2026-10-27T08:00:00Z inclusive (24 h 30 min, not literally 24 h).
**`pi-subagents` revision:** installed-tool pin supplied by dispatch: `workbench/implementation-program@46ab74f5cc678e565fdc4d851f99e10d1f649309`; the rig clone's remote-tracking reflog (`git reflog show --date=iso origin/workbench/implementation-program`) shows that sha as the trunk tip from `2026-10-27 08:17:02 +0000` to `08:30:24 +0000` only. Every source quote below was read by explicit sha (`git show 46ab74f5cc678e565fdc4d851f99e10d1f649309:` plus the path; `git grep ... 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- ...`), never from a checked-out tree. This feedback worktree was created at 2026-10-27T08:43:11Z (first line of its `logs/HEAD`, epoch `1793090591`) on branch `machine/flywheel/feedback-2026-10-27` at 46ab74f5, after trunk had already moved on, so `git rev-parse origin/workbench/implementation-program` never printed 46ab74f5 while this worktree existed; an earlier draft of this line claimed that it had. Trunk at the re-check fetch (`git fetch -q origin && git rev-parse origin/workbench/implementation-program`, 2026-10-27T09:02:28Z): `6412809cf85ff6b65594163666669cb9d6e5a6f8` (`ledger: close wb-jze3 (landing 480, merge c5ec29bd)`), 6 commits past the pin (`git rev-list --count 46ab74f5..6412809c` prints `6`; `git merge-base --is-ancestor 46ab74f5 6412809c` rc 0; the six are landings 479 `wb-g81a` and 480 `wb-jze3`, their two lane tips and their two ledger hops). `git diff --name-status 46ab74f5..6412809c` lists six modified (`M`) paths: `.beads/interactions.jsonl`, `.beads/issues.jsonl`, `test/fixtures/rf-plan-basis-echo-roster.json`, `test/fixtures/rf-read-status-upgrade-roster.json`, `test/workbench-rf-plan-basis-echo-census.test.ts`, `test/workbench-rf-read-status-upgrade-census.test.ts`; none is a path quoted here. The 12 paths quoted or counted below (`vitest.census.config.ts`, `package.json`, `package-lock.json`, `forge.toml`, `test/helpers/detached-timing.ts`, `test/workbench-detached-child-environ.test.ts` and the docs09, w21-survivor-pins, tool-exposure, compat-feature, docs14-performance-benchmark and docs07-provider-rules `.census.ts` files) are blob-identical at both shas (`git rev-parse` of each path at each sha), the `new-feedback/` listing is identical at both (18 entries, `diff` empty), and the Finding 2 counts are 28 / 0 and 106 / 91 at both shas. Package identity at the pin: `package.json:2-3` prints `"name": "@tintinweb/pi-subagents"` and `"version": "0.20.0"`; `command -v pi-subagents` prints nothing (rc 1) while `command -v pi` prints `/home/jehallad/.local/bin/pi`, so no pi-subagents executable was run or provenance-checked in this seat and the relation between the package and that `pi` binary was not probed. The corroborated file pinned `b887fa2e9f581f9a6b1e9d47cb723029aae353ae`; the 2026-10-26 sibling pinned `fced7bfda63e6975d331fd4f31ff4463b2c9136e`. The main clone's checked-out HEAD was `188ae5901612801d87cc482c5e7851910eb82a1d` (886 commits behind the pin, 892 behind 6412809c), not used for source quotes.
**`vitest` revision:** `4.1.10` from `package-lock.json:5281-5282` at the fetched SHA; the landing-468 gate envelope's diagnostic also prints `RUN  v4.1.10`. This is a lockfile and producer-envelope pin, not a version command run here.
**Gate harness revision:** producer-recorded `forge 0.2.1 (rev c0f93b3c5d18)` on 15 of 37 in-window `gate-pass` rows, `(rev 1aba570e31dc)` on 5, 16 rows with no `harness` field and 1 provenance-only `c0f93b3c5d18` string. Landing-468's `gate.json.data.harness` prints `forge 0.2.1 (rev c0f93b3c5d18)` followed by its installed path; none was invoked by this seat.
**Method:** read-only `python3 -I` JSONL derivation of `/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl` (24,792 lines at the drafting read, 24,886 lines at the 2026-10-27T09:04Z re-derivation that produced the Evidence section; both reads yield the same 2,228 in-window rows M:22477..M:24704, bounded by M:22476 at `2026-10-26T07:25:40Z` and M:24705 at `2026-10-27T08:00:32Z`, and the same figures below), coercing mixed string/integer `landing`, `ms` and `realAssertions`; selected the 37 `landing-gate` rows for landings 440..476 and the 105 `serial-leg` rows by their UTC. Read producer-preserved landing-468 `gate.json`/`judge.json`, three preserved `wb-p46r` judge fixtures, the machine's active/expired register snapshots (read-only), and source blobs via `git show`/`git grep`/`git log` at the fetched SHA. No vitest, gate, `bd`, or product CLI command ran in this seat.
**Scope:** feedback about pi-subagents' vitest census-tier budget and gate re-proof cost; the machine's ledger, register, composer and landing workflow supply evidence, not a claim that they are pi-subagents defects. Serial-leg totals span both gate-prep and land-prep seats, not just the 37 landings.
**Corroborates:** [`2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md`](2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md) — verdict **STILL-TRUE** at `46ab74f5cc678e565fdc4d851f99e10d1f649309` for the title claim (the census tier still runs on the vitest 5000 ms default: the 6-line `vitest.census.config.ts` spells no `testTimeout`); the per-claim split — STILL-TRUE for the missing floor, FIXED for the docs09 whole-table case on landed trees, CHANGED for frequency, cost and register state — is in the re-check table below. Same seat, later cycle, not an independent hit.
**Prior art:** `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` at the fetched SHA lists 18 entries (README plus 17 files); keyword counts in filenames: `vitest` 6, `timeout` 5, `5000` 4, `census` 5, `docs09` 2, `787` 1, `serial` 3, `cure` 1, `e5b10c` 0. The same seat's 2026-10-26 corroboration exists on `origin/machine/flywheel/feedback-2026-10-26` (`68552907bede5b9a9a4d549c0ff196bb21651e6e`), not on fetched trunk: it reports a PASS-held, unlanded cure, unlike this re-check. This file does not duplicate its 44-landing window or the earlier budget recommendation.
**Delivery:** draft only on branch `machine/flywheel/feedback-2026-10-27` in a detached-from-trunk worktree; not committed, pushed, or landed by this seat. Docs-only gate waiver: no build/test/gate ran for this feedback draft; the main clone's `core.hooksPath` is unset (rc 1), and `.gitmessage`/`.githooks` are absent at the fetched ref. Any later one-file feedback commit must disclose the same waiver in its commit body, and that trunk had moved to `6412809c` (landings 479-480) before the commit while every quote stays pinned to `46ab74f5`. No protected branch push is authorized here.

## Summary, with numbers

**CONFIRMED —** the 37 landing-gate rows (one per landing 440..476, all `verdict:"pass"`, `furnaceMode:"supervised"`) include 9 rows with 21 timing red entries and 28 rows with `reds:[]`; 14 of those 21 entries name 6 `.census.ts` files, and 7 name 4 `.test.ts` files. The whole-table docs09 case, moved from source line 787 to line 800 by `e5b10c53`, is absent from the red entries of all 33 later landing-gate rows 444..476. The separate docs09 `:688` case still reds at landing 448. In the entire 24 h 30 min ledger window, 105 serial-leg rows sum to 2,910,828 ms (48.5 min); **95 of 105** have `realAssertions:"0"` and sum to 2,706,689 ms (45.1 min). The docs09 file takes 13 of 105 legs (519,774 ms = 8.7 min); file-level leg rows cannot apportion that wall to a single case.

## Why a second file rather than an edit

This seat's 2026-10-25 file recorded an unlanded per-case cure and the absent tier floor. The 2026-10-26 branch sibling measured another pre-landing window and a held cure. This later cycle observes the cure landed and re-checks both its intended case and the residual tier budget. Preserving both earlier files prevents a historical "held" claim from being silently rewritten into "landed"; it does not imply independent replication by a second seat.

## What this adds

**A re-check at a new revision — CONFIRMED:** the same probe against a later, landed trunk. At `46ab74f5cc678e565fdc4d851f99e10d1f649309` the per-case cure `e5b10c5377169a4cb391ff17fbca46330a4dc7a1` is an ancestor (`git merge-base --is-ancestor e5b10c53 46ab74f5` rc 0) and `git log -1 --format='%h %cI %s' f381c52a43fcecbd5c7e1fac907ed8756acff590` prints `f381c52 2026-10-26T21:38:52Z ledger: close wb-ro6u (landing 443, merge 59e9cb0b)`, the landing-443 hop. The evidence for the re-check: the cured whole-table case appears in **0 of 33** later landing-gate red lists (landings 444..476) on landed trees, while the tier config still spells no `testTimeout`, the different docs09 `:688` case plus 5 other census files account for 14 of the next 21 timing red entries, and the window's 105 serial legs cost 48.5 min (95 of them zero-assert, 45.1 min). The verdict words STILL-TRUE / FIXED / CHANGED in the table below carry the result per claim. This is a re-check, not a claim that a local 5000 ms run of the cured case was conducted or that it will never time out.

## Already filed — this corroborates, it does not restate

| Axis already filed | Where |
|---|---|
| The detached-timing helper does not set a census-tier budget; a separate testTimeout is needed | [2026-10-25 target](2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md), Findings 4-6 |
| Report-mode census budget at the 5000 ms default and the one-line config-floor proposal | [2026-10-21 corroboration](2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md), fix 1 |
| Pre-landing HOLD after the cure was gated, 62 docs09 legs / 30.3 min in its prior window | `origin/machine/flywheel/feedback-2026-10-26`: `2026-10-26-CORROBORATION-n-44-landings-396-439-at-fced7bfd-docs09-787-red-in-10-101-of-103-serial-legs-zero-assert-45-3-min-while-the-gated-60000-ms-cure-e5b10c53-stayed-pass-held.md` (pending branch, not on fetched trunk) |
| Five default-tier rows without testTimeout and the separate default-tier remedy | [2026-10-20 original](2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md) |

## Finding 1 — the per-case cure landed, and its whole-table case does not red in the 33 later landing-gate rows — **CONFIRMED**

`git show --stat --format='%H%n%ad%n%s' e5b10c5377169a4cb391ff17fbca46330a4dc7a1` identifies a one-file cut to `test/workbench-docs09-readers-relationships.census.ts` (+14/-1), dated 2026-10-25 06:46:27 +0000. Its source at the fetched SHA says:

`test/workbench-docs09-readers-relationships.census.ts:798-803` at the fetched SHA, verbatim:

```ts
  const WHOLE_TABLE_BUDGET_MS = 60_000;

  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
    const verdicts = judge(REPORT, ALL_PINS.map(entry => casePin(entry)));
    expect(verdicts.map(verdict => verdict.code)).toEqual(ALL_PINS.map(() => "ok"));
  }, WHOLE_TABLE_BUDGET_MS);
```

The same source at lines 787-796 explicitly limits the budget to "the next case ALONE" and says "every other case, this file and the suite keep vitest's 5000 ms default." This file's blob at the pin is `d50e29841b050d53122545d64ab3868b9c3aff36` (`git rev-parse 46ab74f5cc678e565fdc4d851f99e10d1f649309:test/workbench-docs09-readers-relationships.census.ts`); `git log fced7bfda63e6975d331fd4f31ff4463b2c9136e..46ab74f5cc678e565fdc4d851f99e10d1f649309 --` that path lists only `e5b10c53`.

Producer rows M:22940 (`landing-gate` 443, tip `e5b10c53`, `verdict:"pass"`, `reds:[]`, note `landing 443 wb-ro6u land-prep clean PASS: every step 0, no judge red - reds [] explicit (R770)`), M:22996 (`fold-done` 443, merge `59e9cb0bc2250aaa2d3597a38b409374ba871fe7`, hop `f381c52a43fcecbd5c7e1fac907ed8756acff590`) and `BOUNDARY.md:8032-8037` place the cure on trunk. Parsing every `reds[]` in the 33 subsequent landing-gate rows 444..476 finds exactly one docs09 entry: M:23212 at landing 448 names `test/workbench-docs09-readers-relationships.census.ts:688`; none names the old `:787` or cured `:800` whole-table case. **FIXED / CONFIRMED** for the targeted symptom in this defined landing-gate population; **STILL-TRUE / CONFIRMED** for the separate `:688` residual.

**Important scope limit — CONFIRMED:** a post-fold `gate-pass` row M:23134 for `wb-86q` (`utc` `2026-10-26T23:03:24Z`) *does* name a docs09 `:787` red, and M:23064 is its whole-file serial leg. The row has no `reds` key; the `:787` text sits in its `r609`, `findings`, `candidateSightings`, `green`, `needsRulingReasons`, `needsRulingBasis` and `ownerRulingAsks` fields. M:23134 records `base` = `entryBase` = `32e0e2d2e5142fd03eb594cb2fdc9aff01abd3ae` (landing 441), `gateBase` = `9f8e35e50e413907dfd2aaf674b72c62f57ae656` (landing 442) and `gatedCommit` = `3a57679f828010c285735638774245a79623d1c4`; its `baseNote` begins, verbatim: `entry base 32e0e2d = merge-base(tip, live trunk dc72a6d); base..tip = the cut (3 paths); gateBase 9f8e35e (landing 442) is the trunk the frozen probe merged`. `git merge-base --is-ancestor e5b10c5377169a4cb391ff17fbca46330a4dc7a1 X` returns rc 1 for each of X = 32e0e2d2, 9f8e35e5 and 3a57679f, and `git rev-parse X:test/workbench-docs09-readers-relationships.census.ts` prints the pre-cure blob `3f7db6021e7769a919378ffb6269b77549332603` (the blob at `e5b10c53^`) for all three; the row itself says `the probe carries the pre-cure blob 3f7db602`. The frozen probe's trunk is therefore the landing-442 hop, pre-cure. Thus "0 of 33 later **landing-gate** rows" is not "zero :787 reds in every gate stamped after the fold." No post-cure controlled case run was made here.

**The zero extends beyond landing-gate rows, with that same counterexample — CONFIRMED:** M:22996 (`fold-done` 443) carries `utc` `2026-10-26T22:08:08Z` (its hop commit f381c52a is dated `2026-10-26T21:38:52Z`). Of the 1,708 in-window rows stamped after M:22996, **0** carry a `reds[]` entry whose `file` names docs09 with `line` 787 or 800, and the 18 in-window `landing-gate-try` rows carry no reds at all. Searching those 1,708 rows' raw text for `docs09-readers-relationships.census.ts:787` or `:800` finds exactly two rows, both `wb-86q`: M:23082 (`gate-stage`, `2026-10-26T22:37:34Z`) and M:23134 above, the pre-cure-base gate. M:22996 itself names `:787` in its F7 duty text (the register expiry), not as a red entry.

## Finding 2 — nine of 37 landing gates carried timing reds, 14 of 21 in census files despite the per-case cure — **CONFIRMED**

The complete nine `landing-gate` rows with non-empty `reds` are M:23169 (447, 1 entry), M:23212 (448, 2), M:23386 (449, 1), M:23474 (451, 1), M:23964 (463, 6), M:24013 (464, 4), M:24241 (468, 4), M:24340 (470, 1), M:24566 (475, 1): **9 of 37** rows and **21** red entries. All 21 carry `realAssertions:0`; 19 markers are exactly `Test timed out in 5000ms`, and the other 2 entries at landing 464 carry `exceeded its timeout` for `test/workbench-detached-child-environ.test.ts:107/:121`. Do **not** call all 21 vitest-default reds. The 14 `.census.ts` entries comprise docs09:688 ×1 (448), w21-survivor-pins:60 ×3 (449/463/468), tool-exposure-census:581 ×2 (451/463), compat-feature:406 ×3 and :416 ×2 (463/468), docs14-performance-benchmark:547 ×2 (both 463), and docs07-provider-rules:930 ×1 (470). The remaining 7 `.test.ts` entries across 4 files include 5 strict 5000 ms markers and the 2 named-lapse markers. Every one of the 9 red-path rows has `verdictClass:"PASS-WITH-TIMING-NOTE"` and a corresponding `landable` row (M:23170, M:23213, M:23387, M:23475, M:23965, M:24014, M:24242, M:24341, M:24567); no claim is made that all 21 were registered hits: 14 carry `classification:"hit"`, 7 `"candidate-sighting"`.

The 6-line `vitest.census.config.ts:1-6` at `46ab74f5cc678e565fdc4d851f99e10d1f649309` ends verbatim:

```ts
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
```

It spells no `testTimeout`. `package.json:48,51` invokes `vitest run` and `vitest run --config vitest.census.config.ts`; `forge.toml:9,191-195` runs the census after test. At this SHA, `git grep -l -E '\{ *timeout: *[0-9_]+' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*.census.ts' | wc -l` prints `0` over the **28** census-tier files that `git grep -l -e '' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*.census.ts' | wc -l` counts, versus `91` with the pathspec `-- 'test/*census*.test.ts'` over its **106** default-tier census-named `.test.ts` files (the same two commands with that pathspec; verbatim outputs in Evidence), and the same four commands print 28 / 0 and 106 / 91 at `6412809c`; that literal regex misses named budgets such as docs09's trailing `WHOLE_TABLE_BUDGET_MS` and docs06's `JUDGING`, so it is not a claim that all 28 have no budget. The `:688` line at `test/workbench-docs09-readers-relationships.census.ts:688-692`, w21 `:60-61`, tool-exposure `:581-582`, compat `:406-407/:416-417`, docs14 `:547-548` and docs07 `:930-931` show the red cases' `it` declarations. The source+envelope together substantiate the residual default marker for the cited cases, not the cause of each delay.

The preserved `/tmp/fw-landprep-wb-pwlq-20261027T051352Z-900340/gate.json` for landing 468 records `status:"error"`, `contract_version:"result-envelope/v1"`, `data.steps[census].exit_code:1`, `duration_ms:105534` and `failure_line:"FAIL  test/workbench-compat-feature.census.ts > wb-cax.27 docs/16 compatibility feature census (report mode) > AC2 row 'B4.2': every pinned case is collected, passed and asserting in the default gate's own report"`. Its diagnostic contains `Error: Test timed out in 5000ms.` three times; `judge.json` (tool `gate-judge`, version `1.1.0`) names 4 `reds` (3 compat, 1 w21), route `R-T7(5) register`, `realReds:[]`, with 2 file-alone `serialLegs` marked `outcome:"green"`. M:24238/M:24239 carry those two legs at 32,904 / 6,375 ms, `realAssertions:"0"`; M:24241/M:24242 carry the 4-entry landing-gate/landable pair. The gate status `error` is not silently a successful forge test: the *judge's* pass-with-timing-note follows the separately recorded failed census step.

## Finding 3 — 105 serial legs across all gate seats cost 48.5 min; 95 of 105 carry zero real assertions — **CONFIRMED**

A `kind=="serial-leg"` filter inside 2026-10-26T07:30:00Z..2026-10-27T08:00:00Z yields **105** rows (M:22485..M:24579) over 28 files, sum `float(ms)` = **2,910,828 ms = 48.5 min**. `float(realAssertions)==0` holds on **95 of 105**, sum **2,706,689 ms = 45.1 min**. The other **10 of 105** have `realAssertions:"2"`: M:23367/23368/23399/23400/23402/23403 are report-consequent probes on docs08/docs04, and M:24356/24359/24395/24396 have `outcome:"red"` on `test/workbench-ri-decision-seed-claim-census.test.ts`. The dispatch brief handed to the drafting seat stated a 101 of 105 zero-assert figure; that brief is in neither the repo nor the ledger and is not quoted here, so the attribution is **UNDETERMINED** (missing artifact: the brief's text). The live JSONL gives **95 of 105** (sum 2,706,689 ms), so 95 is the figure this file carries; the only 101 in the record this seat can point to is the 2026-10-26 sibling's own-window `101 of 103` in its title. The 19 legs with `legSource:"by hand: gate-judge exit 8 withheld its legs (pre-leg REAL RED); judge serial command law"` are included, as are 4 other rows whose `source` mentions a by-hand probe; those are not evidence of a successfully returned judge leg.

By file, measured over the 105 rows: docs07-provider-rules 6 legs / 9.5 min; docs09 13 / 8.7 min (519,774 ms; M:22485, M:22859, M:22882, M:23064, M:23208, M:23267, M:23278, M:23309, M:23349, M:23404, M:23417, M:24141, M:24229); tool-exposure 11 / 4.3 min; compat-feature 6 / 3.5 min; docs04 6 / 3.3 min; inspector 10 / 3.1 min. The docs09 leg rows all carry `testsRun:"88"`, `realAssertions:"0"`, `try:"1"`; 7 of those 13 have `run:"gate-judge"` (including a gate-seat run, not necessarily land-prep), 3 `g10-gate-s111`, 2 `g10-gate-s112`, 1 `g10-gate-s100`. For the entire 105-row population, **32** have `seat:"land-prep"` (12.3 min) and **73** a `gate-prep-*` seat (36.2 min). All 105 have `file`, none has `line`, and all have `vitestCap:1`: the docs09 8.7 min is a *file* cost, not the cure's case-only residual. The land-prep `landing-gate.serialLegRows` fields sum to 21 over the 37 landings; 105 is **not** a 37-landing-only count.

Example raw producer row M:23208:

```json
{"kind":"serial-leg","bead":"wb-4nvi","seat":"land-prep","file":"test/workbench-docs09-readers-relationships.census.ts","ms":"76189","realAssertions":"0","try":"1","tree":"08ead4044abd853f554bc17c143f4c33c05e544a","load1":"314.88","vitestCap":1,"testsRun":"88","utc":"2026-10-26T23:37:51Z","run":"gate-judge","gen":"g10","actor":"flywheel"}
```

The earlier file's 299 legs / 132.3 min (119 docs09 / 66.1 min) and 2026-10-26 sibling's 103 / 45.3 min (62 docs09 / 30.3 min) are different measured windows. This file's 105 / 48.5 min and 13 docs09 / 8.7 min show a **CHANGED** cost profile; attribution of the change to the per-case cure, changing work mix, or load is **UNDETERMINED** without controlled comparable gates. No serial-leg test was run locally.

## Finding 4 — the live register reflects the cure's bounded scope, not a tier-wide fix — **CONFIRMED**

At read time, the machine's `state/known-settled-rows.json` (live snapshot, not source pinned to the fetched ref) has **47** list entries: **32** `.census.ts` and **15** `.test.ts`; markerClass counts are 46 `Test timed out in` and 1 `Hook timed out in`. The prior file recorded 46 (32/14); the 2026-10-26 sibling read 48 (33/15) at its later-than-window snapshot. `state/known-settled-rows.expired.json` now holds the docs09 old `:787` key (blob `3f7db602`) with `"expiredUtc":"2026-10-26T21:56:06Z"` and `"evictionClass":"BLOB-CHANGE"`; the active list contains **0** docs09 `:787` keys and **1** docs09 `:688` key (blob `d50e2984`). M:22979 (`register-refresh`) quotes: `the :688 RA1/a row (R676 entry 28) was keyed to blob 3f7db602; landing 443 (wb-ro6u merge 59e9cb0b) moved the file to d50e2984 without touching the row lines (byte-identical per the GATE NOTE); re-keyed so a cold-judge timing red stays a registered hit for the R705(b) composer`. This demonstrates the intended per-case cure/register retirement plus a residual `:688` key; it does not prove the tier floor was fixed. These are read-time state claims, not a snapshot at 08:00Z.

## Evidence

The ledger derivation as run on 2026-10-27 (read-only, `python3 -I`; `M:n` is the 1-based line number of `machines/flywheel/ledger/metrics.jsonl`; `landing`, `ms` and `realAssertions` arrive as strings or integers and are coerced with `float()`):

```
P  = .../OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl
LO = "2026-10-26T07:30:00Z"; HI = "2026-10-27T08:00:00Z"      # in-window: LO <= row["utc"] <= HI
landing-gate = kind == "landing-gate" and 440 <= float(landing) <= 476
serial-leg   = kind == "serial-leg"; cost = sum(float(ms)); zero-assert = float(realAssertions) == 0
gate-pass    = kind == "gate-pass"
--- printed ---
lines=24886 parsed=24886 unparsable=0
in-window rows=2228 M:22477..M:24704; M:22476 utc=2026-10-26T07:25:40Z; M:24705 utc=2026-10-27T08:00:32Z
landing-gate rows 440..476: 37; landings=True
 verdict: Counter({'pass': 37})  furnaceMode: Counter({'supervised': 37})  realReds==[]: 37
 rows with reds: [(23169, 447, 1), (23212, 448, 2), (23386, 449, 1), (23474, 451, 1), (23964, 463, 6), (24013, 464, 4), (24241, 468, 4), (24340, 470, 1), (24566, 475, 1)]  rows reds==[]: 28
 red entries: 21
 markers: Counter({'Test timed out in 5000ms': 19, 'exceeded its timeout': 2})
 classification: Counter({'hit': 14, 'candidate-sighting': 7})
 realAssertions: Counter({'0': 21})
 verdictClass (9 red rows): Counter({'PASS-WITH-TIMING-NOTE': 9})
 serialLegRows sum: 21
 census entries=14 files=6; test entries=7 files=4
 later rows 444..476: 33; docs09 entries: [(23212, 448, 688)]
M:22996 utc (443 fold stamp)= 2026-10-26T22:08:08Z
 rows after stamp=1708; red entries naming docs09 :787/:800 = 0 []
 raw-text mentions of docs09 :787/:800 after stamp: [(23082, 'gate-stage', 'wb-86q'), (23134, 'gate-pass', 'wb-86q')]
 landing-gate-try rows=18 with non-empty reds=0
serial-leg rows=105 M:22485..M:24579 files=28 sum_ms=2910828 (48.5 min)
 realAssertions==0: 95 sum_ms=2706689 (45.1 min)
 realAssertions!=0: [(23367, '2', 'workbench-docs08-replay-reconcile.census.ts', None), (23368, '2', 'workbench-docs08-replay-reconcile.census.ts', None), (23399, '2', 'workbench-docs04-tests-census.census.ts', None), (23400, '2', 'workbench-docs04-tests-census.census.ts', None), (23402, '2', 'workbench-docs08-replay-reconcile.census.ts', None), (23403, '2', 'workbench-docs08-replay-reconcile.census.ts', None), (24356, '2', 'workbench-ri-decision-seed-claim-census.test.ts', 'red'), (24359, '2', 'workbench-ri-decision-seed-claim-census.test.ts', 'red'), (24395, '2', 'workbench-ri-decision-seed-claim-census.test.ts', 'red'), (24396, '2', 'workbench-ri-decision-seed-claim-census.test.ts', 'red')]
 legSource by-hand rows=19
 seat land-prep=32 ms=12.3 min; gate-prep-*=73 ms=36.2 min; other=0
 have file=105 have line=0 vitestCap==1=105
gate-pass rows=37; harness: Counter({'None': 16, 'forge 0.2.1 (rev c0f93b3c5d18)': 15, 'forge 0.2.1 (rev 1aba570e31dc)': 5, 'forge (envelope provenance revision c0f9': 1}) ; verdictClass: Counter({'PASS-WITH-FINDING': 19, 'PASS-WITH-TIMING-NOTE': 18})
```

The git commands, run in the detached feedback worktree (shares the rig clone's object store), with their verbatim outputs:

```
$ git fetch -q origin && git rev-parse origin/workbench/implementation-program     # 2026-10-27T09:02:28Z
6412809cf85ff6b65594163666669cb9d6e5a6f8
$ git merge-base --is-ancestor 46ab74f5cc678e565fdc4d851f99e10d1f649309 6412809cf85ff6b65594163666669cb9d6e5a6f8; echo rc=$?
rc=0
$ git rev-list --count 46ab74f5cc678e565fdc4d851f99e10d1f649309..6412809cf85ff6b65594163666669cb9d6e5a6f8
6
$ git merge-base --is-ancestor e5b10c5377169a4cb391ff17fbca46330a4dc7a1 46ab74f5cc678e565fdc4d851f99e10d1f649309; echo rc=$?
rc=0
$ git log -1 --format='%h %cI %s' f381c52a43fcecbd5c7e1fac907ed8756acff590
f381c52 2026-10-26T21:38:52Z ledger: close wb-ro6u (landing 443, merge 59e9cb0b)
$ for s in 32e0e2d2e5142fd03eb594cb2fdc9aff01abd3ae 9f8e35e50e413907dfd2aaf674b72c62f57ae656 3a57679f828010c285735638774245a79623d1c4; do git merge-base --is-ancestor e5b10c5377169a4cb391ff17fbca46330a4dc7a1 $s; echo "$s rc=$?"; git rev-parse $s:test/workbench-docs09-readers-relationships.census.ts; done
32e0e2d2e5142fd03eb594cb2fdc9aff01abd3ae rc=1
3f7db6021e7769a919378ffb6269b77549332603
9f8e35e50e413907dfd2aaf674b72c62f57ae656 rc=1
3f7db6021e7769a919378ffb6269b77549332603
3a57679f828010c285735638774245a79623d1c4 rc=1
3f7db6021e7769a919378ffb6269b77549332603
$ git rev-parse 46ab74f5cc678e565fdc4d851f99e10d1f649309:test/workbench-docs09-readers-relationships.census.ts
d50e29841b050d53122545d64ab3868b9c3aff36
$ git grep -l -E '\{ *timeout: *[0-9_]+' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*.census.ts' | wc -l
0
$ git grep -l -e '' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*.census.ts' | wc -l
28
$ git grep -l -E '\{ *timeout: *[0-9_]+' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*census*.test.ts' | wc -l
91
$ git grep -l -e '' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*census*.test.ts' | wc -l
106
$ git ls-tree -r --name-only 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- new-feedback/ | wc -l
18
$ head -1 "$(git rev-parse --git-dir)/logs/HEAD"
0000000000000000000000000000000000000000 46ab74f5cc678e565fdc4d851f99e10d1f649309 James Halladay <jehallad@amazon.com> 1793090591 +0000
```

`git show 46ab74f5cc678e565fdc4d851f99e10d1f649309:test/workbench-docs09-readers-relationships.census.ts | sed -n '787,803p'` is quoted in Finding 1 and `git show 46ab74f5cc678e565fdc4d851f99e10d1f649309:vitest.census.config.ts` (6 lines) in Finding 2. The register counts in Finding 4 come from `python3 -I` over `machines/flywheel/state/known-settled-rows.json` and `known-settled-rows.expired.json` (list entries; `file`, `line`, `markerClass`, `fileBlobSha`, `expiredUtc`, `evictionClass` fields), read-only.

## Re-check verdicts on the corroborated file

Original pin `b887fa2e9f581f9a6b1e9d47cb723029aae353ae`; new source pin `46ab74f5cc678e565fdc4d851f99e10d1f649309`. Historical original-window measurements remain historical facts; the verdicts describe the new window or new source.

| Original claim | Re-check verdict and evidence grade |
|---|---|
| Finding 1, 86 of 99 gate-pass timing-note vs 13 finding | **CHANGED / CONFIRMED:** new window 18 of 37 `gate-pass` timing-note, 19 of 37 PASS-WITH-FINDING (separate from 9 of 37 landing-gate red paths) |
| Finding 2, 299 legs / 132.3 min, 285 zero-assert, docs09 119 / 66.1 min | **CHANGED / CONFIRMED:** new window 105 / 48.5 min, 95 zero-assert / 45.1 min, docs09 13 / 8.7 min. Original window untouched; causal reason **UNDETERMINED** without comparable controlled execution |
| Finding 3, 10 of 61 landing-gate rows / 21 reds, real-assert reds withheld | **CHANGED / CONFIRMED:** new set 9 of 37 rows / 21 timing red entries, 19 strict 5000 ms and 2 named-lapse, all `realAssertions:0` and all 9 judged pass-with-timing-note. Real-red refusal behavior **UNDETERMINED** from these 37 landing-gate rows (no real-red row in them); missing artifact: a same-scope real-red landing-gate attempt |
| Finding 4, 7e9a1eb detached helper (6 files / 12 occurrences then, none census) | **STILL-TRUE / CONFIRMED** for the mechanism's scope: at the new SHA `test/helpers/detached-timing.ts:41` names the launcher's timeout; the helper remains distinct from census config. The exact former six-file occurrence count and helper runtime effectiveness **UNDETERMINED** here (no new complete grep or runtime probe) |
| Finding 5, missing census floor and 0/27 literal-budget files vs 89/104 default-tier census-named files | **STILL-TRUE / CONFIRMED** for missing `testTimeout` at the new SHA; **CHANGED / CONFIRMED** for the literal regex: 0/28 vs 91/106. The cured docs09 case has a named trailing budget, so the regex is explicitly not a full budget census |
| Finding 6, docs09 synchronous `judge()` and the in-flight per-case cure | **FIXED / CONFIRMED** for the landed cure and 0/33 targeted landing-gate reds; the past 10-run per-case timing range was not remeasured (**UNDETERMINED** for new runtime range). The 2026-10-26 sibling's pre-landing HOLD is superseded at landing 443, not false in its own window |
| Finding 7, workaround register 46 (32 census + 14 default) | **CHANGED / CONFIRMED** at read time: 47 (32 + 15), docs09 `:787` expired on blob change and `:688` refreshed. Former 43→44→46 in-window grant sequence not re-audited (**UNDETERMINED** for a new comparable growth sequence) |
| Acceptance: docs09 `:787/:688`, inspector `:58` leave red lists and the register | **PARTIAL / CONFIRMED:** `:787` absent in 33 post-cure landing-gate rows and the active register; `:688` remains at landing 448 and in the register; inspector `:58` has no entry in those 37 landing-gate reds but 3 gate-pass entries and 10 file-alone legs in the wider window; full acceptance not met |

## Suggested fixes, cheapest first

1. **Re-evaluate the already-filed one-line `testTimeout` floor in `vitest.census.config.ts` for the report-mode tier.** The cited 6-line config still has no floor and 14 of 21 landing-gate timing entries this window hit `.census.ts`. The 2026-10-21 file proposes the form; the 2026-10-25 target sizes a 60_000 ms candidate from *case* walls. Treat this as a request, **PLAUSIBLE**, not a tested cure here. Preserve explicit per-case budgets (including docs09 `WHOLE_TABLE_BUDGET_MS`) when adding a floor. Acceptance probe: on the same source plus config change, run the default complete gate under representative load, require zero `Test timed out in 5000ms` census reds on previously observed rows while an injected assertion still reds, and compare per-step durations; do not infer success from the machine register passing a timeout.
2. **If a tier floor is too broad, copy the measured per-case R546 budget pattern to residual report-mode rows.** Start with docs09 `:688` and the five other census files cited in Finding 2, with per-case measurements and explicit scope. This alternative is **PLAUSIBLE**, not locally exercised. Do not apply the census config to unrelated default-tier `*.test.ts` rows; their budgets are a separate request.
3. **Retain the producer-envelope and register distinction while curing.** An exit-1 census step plus green file-alone proof can produce PASS-WITH-TIMING-NOTE under the judge, but a red that asserts a real failure must remain a refusal. Acceptance requires both a timeout-row probe and a real-assertion control, not a shorter ledger.

## Positives worth protecting

- **CONFIRMED — a deliberately narrow fix can be audited:** `test/workbench-docs09-readers-relationships.census.ts:787-803` states both the 60_000 ms case budget and that the rest of the file retains the 5000 ms default. M:22940's `reds:[]` and M:22979's `:688` refresh make the no-overclaim boundary visible. Preserve that case-local clarity in later budget work.
- **CONFIRMED — producer-side, typed evidence retains the failed step:** landing 468's `gate.json` reports `census` exit 1 and 105,534 ms; `judge.json` identifies four zero-assert timing reds and `realReds:[]`; M:24241/M:24242 record the landable PASS-WITH-TIMING-NOTE with the four entries and their serial-leg references. Preserve those separate fields rather than flattening a judged timing note into an unqualified green gate.
- **CONFIRMED — file-level cost can be scoped honestly:** `serial-leg` rows report `file`, `ms`, `realAssertions`, `try`, `testsRun` and `vitestCap`; because they do not report `line`, the 8.7 min docs09 attribution stays at the file boundary instead of falsely claiming savings from one case.

## What I did not establish

- **UNDETERMINED:** installed pi-subagents binary provenance beyond the supplied dispatch pin; missing artifact: an installed module/build receipt. The fetched source SHA was independently read, not an execution proof.
- **UNDETERMINED:** controlled efficacy of a 30_000 or 60_000 ms census floor under the current gate's parallel load; missing artifact: a before/after complete gate with a genuine assertion-mutant control. No runtime budget change or vitest run occurred here.
- **UNDETERMINED:** whether the same cured case might red under a different, more loaded post-cure gate. The precise zero is 0 of 33 post-cure **landing-gate** rows; M:23134's later-stamped but pre-cure-base gate explicitly remains a counterexample to any broader timestamp-only zero.
- **UNDETERMINED:** whether all 105 serial legs were necessary, whether their underlying test logs all ended green, and how many minutes the per-case cure saved. Four legs have `outcome:"red"`, six other legs have `realAssertions:"2"`, 19 were recorded by hand after judge exit 8, and the producer ledger does not apportion file walls to test cases. Missing artifacts: complete leg logs plus matched, controlled pre/post gates.
- **UNDETERMINED:** exact queue size and register contents at 08:00Z; the active/expired JSON files are later live snapshots and can change independently of the closed ledger window. No `bd` writes or machine-state mutations were made.
- **UNDETERMINED:** the dispatch brief's 101 of 105 zero-assert figure, which this seat could not quote; missing artifact: the brief's text (not in the repo, the ledger or the cited files). The measured 95 of 105 stands on its own.
