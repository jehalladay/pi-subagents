# Census liveness probes red as real assertions that name no primary when a pinned file fails, refusing landings 685 and 692 pre-leg on adversarial-matrix:666 and w21-survivor-pins:78

**From:** flywheel bead-machine orchestrator (Pi-Subagents) — the flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77), the same seat that filed the 2026-10-28 and 2026-10-29 report-mode files; the gates and rulings quoted are the machine's own artifacts, read, not produced, by this draft.
**Date:** 2026-10-30 (operation window 2026-10-29T07:22Z <= utc <= 2026-10-30T07:40Z; landing 685's judge at 00:40:22Z and landing 692's judge at 07:28:07Z both sit inside it; the R-B114 ruling on 692 at 07:50:34Z sits 10 min 34 s past the window end and is disclosed where cited)
**`pi-subagents` revision:** every quoted `path:line` read at `a520cbdcf9b679fba36f07ddedf7afe3a0816b79`, landing 692's gated commit of record (`data.gated_commit` of its gate.json; tree `72cc800636a3a55a1ba00f2adaa3be47b0852200`; hop `242b275853ec69f101dd835cefff8ea0a47ca768` = `git rev-parse origin/workbench/implementation-program` at the fetch, 2026-10-30T07:01:12Z). Every cited file's blob is identical at a520cbd and 242b275 (`git rev-parse <sha>:<path>` at both: `test/workbench-w21-survivor-pins.census.ts` fc6ccce, `test/workbench-adversarial-matrix.census.ts` 5e0936e, `test/workbench-cap-saturation-receipt.test.ts` 507907c, `test/helpers/census.ts` 51bc11a, `package.json` c6bc334); `test/workbench-pi-detached.test.ts` is blob 6c201b57 at both a520cbd and landing 685's gated commit `fe0a2e413169c5d4c577c15e6dc836a6676eee29`. Rig working tree: HEAD 188ae59 on `workbench/implementation-program`, 1700 commits behind 242b275 (`git rev-list --count HEAD..origin/workbench/implementation-program`); `git status --porcelain | wc -l` = 11, so dirty — all 11 are untracked `new-feedback/*.md` leftovers of earlier delivery lanes, 0 tracked modifications; this file was drafted and committed in a detached worktree cut from 242b275, never in that tree.
**`vitest` revision:** 4.1.10 (`package-lock.json:5281-5283` at a520cbd: `"node_modules/vitest": { "version": "4.1.10"`); not re-run by me.
**Installed binary:** none for this repo — `package.json` at a520cbd (`@tintinweb/pi-subagents` 0.20.0) declares no `bin` field (`grep -n '"bin"'` prints nothing), so every claim here is about source and about the two gate reports, not about an installed command.
**Machine-side producer pins (not this repo):** gate-judge 1.1.0 (`tool`/`version` top-level keys of both judge.json files); forge 0.2.1 rev `8a824e6a41e4` (`data.harness` of both gate.json files); furnace supervised runs `frn-run-fw-wisp-5fy4i` / attempt `frn-atm-fw-wisp-t1c1t-1` (685 try 1) and `frn-run-fw-wisp-gpaxz` / `frn-atm-fw-wisp-drltt-1` (692 try 1), from each `context.json` `furnace` block.
**Method:** read-only `python3 -I` parses over the two kept land-prep artifact sets `/tmp/fw-landprep-wb-dpoo-20261030T001950Z-3589100/{gate,judge,context}.json` (landing 685, bead wb-dpoo) and `/tmp/fw-landprep-wb-fity-20261030T070147Z-646442/{gate,judge,context}.json` (landing 692, bead wb-fity); `git show` / `git grep` over `test/*.census.ts` and `test/helpers/census.ts` at a520cbd in the rig clone; rows of `machines/flywheel/ledger/metrics.jsonl` (M:n = line n; 36,803 lines at my read, append-only). Nothing was re-run; no file-alone census leg was executed.
**Scope:** feedback about pi-subagents' census design — the liveness probes in the `test/*.census.ts` files and the verdict codes `test/helpers/census.ts` returns to them — not about the flywheel machine's gate-judge, whose consequent predicate (what it can pair to a primary red) is machine-side: `git ls-tree origin/workbench/implementation-program -- machines bin` prints 0 entries, so the judge sits outside this repo's tree and is cited here only as the reader of the census output.
**Prior art:** checked at the fetched ref: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` at 242b275 = 18 entries, and the union over the 12 `origin/machine/flywheel/feedback-*` branches = 30 files; `grep -i -E 'liveness|collection-error|survivor'` over those 30 names = 0 hits; body greps (`git grep -l -i -E 'KEYWORD' REF -- new-feedback/`) at the trunk ref and at `origin/machine/flywheel/feedback-2026-10-29`: `collection-error` 0 and 0 files; `survivor-pins` 3 and 4 files, each naming the w21 census as a census-tier file or as a census row red at the 5000 ms default in an earlier window, none naming a hook timeout, the `collection-error` code or the liveness probe's `absent` assertion; `liveness` 1 and 5 files, none about a probe red for a pinned file's failure (the hit lines are characterised in the Postscript). Adjacent, not the same mechanism: the 2026-10-29 docs14 CORROBORATION (branch feedback-2026-10-29) names `adversarial-matrix.census.ts:646/:666` at landing 631 and leaves "which primary red each ... names" UNDETERMINED — this file settles that for landing 685, a different landing; the 2026-10-28 report-mode file and this window's sibling CORROBORATION cover the carrier timeouts themselves and not the probes.

## Summary, with numbers

15 of the 30 `test/*.census.ts` files at a520cbd carry 18 `it(...)` titles containing `liveness` (`git grep -n -i -E '^\s*it(\.each|\.for)?\(\s*["\x60].*liveness' a520cbd -- 'test/*.census.ts'`), and 23 of the 30 carry a `describe(...)` block titled on the pattern of `compat-feature.census.ts:459` — `wb-cax.27 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)` — whose `it(` titles do not repeat the word (its :467 `M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title` asserts `:471 expect(verdicts[0]?.code).toBe("absent")`); 29 of 30 files name liveness at one level or the other, and the word occurs in all 30 (108 lines by `git grep -n -i liveness`). Two shapes did the damage this window. Shape (a), 6 files: "a title the report cannot hold is red, naming it" — the probe judges a deliberately wrong title against a *real pinned file* and asserts `verdict.code` is exactly `"absent"`. Shape (b), 6 files: "AC2 each-liveness" — the probe compares the set of sibling AC2 rows that reached their last assertion against the frozen row list. Both are real assertions (`realAssertions 1` in the judge), and both red for a reason other than the one they were built to catch whenever the thing they lean on fails first — and their assertion text then names neither the pinned file's failure nor the sibling's primary. Landing 692: `w21-survivor-pins.census.ts:78` read `AssertionError: expected 'collection-error' to be 'absent'` because its pinned file `test/workbench-cap-saturation-receipt.test.ts` failed collection (`beforeAll(() => { realRun(); }, 240_000)` at :216-218 timed out; `census.ts:5167` returns `collection-error` before `:4561` can ever return `absent`). Landing 685: `adversarial-matrix.census.ts:666` read `expected [ 'S1', 'S2', 'S3', 'S5', 'S6', …(2) ] to deeply equal [ 'S1', 'S2', 'S3', 'S4', 'S5', …(3) ]` because scenario 4's own row (:646) failed on its pinned case `test/workbench-pi-detached.test.ts:17` (a `SyntaxError` at :23) and never reached `completed.add(row.scenario)` at :649. Cost: at 685 the :666 row was the *only* assertion-carrying red the judge could not pair to a primary (its sibling :646 was classed `report-mode-consequent of reds[5] (test/workbench-pi-detached.test.ts:17)`), so the pre-leg REAL RED rule withheld all 11 owed serial legs; at 692 :78 was one of 2 such reds (the other, :62, names its carrier in its text). Each landing then needed an orchestrator ruling (R-B101 at M:35616, R-B114 at M:36726) and a fresh PREP; 685 took 59.6 min first-staged-to-fold against a 23.9 min median for its 21 neighbours 669-690 (14.2-42.7). The fix is one argument on one `expect` per shape (fixes 1 and 2 below).

## Finding 1 — the shape-(a) probe asserts a code the judge cannot return once its pinned file failed collection: w21-survivor-pins:78 at landing 692 — **CONFIRMED**

The probe pins a wrong title onto the *docs pin*, whose file is the cap-saturation bench:

```
$ git show a520cbdcf9b679fba36f07ddedf7afe3a0816b79:test/workbench-w21-survivor-pins.census.ts | sed -n '30p;37p;75,80p'
30: const CAP_RECEIPT = "test/workbench-cap-saturation-receipt.test.ts";
37: const DOCS_PIN = pinned(CAP_RECEIPT, DOCS_PIN_SUITE, "quotes the two docs sections it answers verbatim, so doc drift fails here");
75:   it("liveness: a survivor pin the report cannot hold is red, naming it (an accept-all judge cannot pass this census)", () => {
76:     const [verdict] = judge(REPORT, [{ ...DOCS_PIN, title: "D0 no such survivor row" }]);
77:     expect(verdict?.ok).toBe(false);
78:     expect(verdict?.code).toBe("absent");
79:     expect(verdict?.why).toContain("D0 no such survivor row");
80:   });
```

In report mode the helper decides collection before it ever looks for the title — `collection-error` at :5167 precedes `locate()` at :5172, and `absent` is only reachable inside `locate()` at :4561:

```
$ git show a520cbd...:test/helpers/census.ts | sed -n '5167p;5172p;4561p'
5167:   if (file.message !== undefined && file.message !== "") return verdict(pin, "exists", "collection-error", `the runner could not collect the file: ${file.message}`);
5172:   const place = locate(pin, module, a);
4561:   if (cases.length === 0) return verdict(pin, "exists", "absent", "the runner collected no case with this title");
```

The pinned file's hook (`test/workbench-cap-saturation-receipt.test.ts:216-218`: `beforeAll(() => {` / `  realRun();` / `}, 240_000);`, where `:179 const realRun = () =>` is "One real run of the whole plan over the default W21 fixture") expired in landing 692's default test step, so the file was uncollected and every pin on it read `collection-error`. The gate envelope (`gate.json` `diagnostics[0].message`, the test step):

```
L5379:  ❯ test/workbench-cap-saturation-receipt.test.ts (55 tests | 55 skipped) 253385ms
L6042:  FAIL  test/workbench-cap-saturation-receipt.test.ts [ test/workbench-cap-saturation-receipt.test.ts ]
L6043: Error: Hook timed out in 240000ms.
L6045:  ❯ test/workbench-cap-saturation-receipt.test.ts:216:1
```

and the census step (`diagnostics[1].message`), where :78 reds with a text that names no file and no marker — the Expected/Received pair is all it carries:

```
L128:  FAIL  test/workbench-w21-survivor-pins.census.ts > W21 survivor pins (wb-36l): the gate's own test report, judged in report mode > liveness: a survivor pin the report cannot hold is red, naming it (an accept-all judge cannot pass this census)
L129: AssertionError: expected 'collection-error' to be 'absent' // Object.is equality
L131: Expected: "absent"
L132: Received: "collection-error"
L134:  ❯ test/workbench-w21-survivor-pins.census.ts:78:27
```

The judge read it as a real red (`judge.json` `reds[18]`: `file test/workbench-w21-survivor-pins.census.ts, line 78, marker none, realAssertions 1, classification "REAL RED (realAssertions 1 > 0)"`) and listed it in `needsRulingReasons`: `test/workbench-w21-survivor-pins.census.ts:78 realAssertions 1 (diagnostics[1].message#L129)`. Note :77 held (`ok` was `false`) — the probe's purpose survived; what failed is the exact-code assertion and its silence about why.

## Finding 2 — the shape-(b) each-liveness probe reds whenever any sibling row fails for any reason, and its text lists S-ids only: adversarial-matrix:666 at landing 685 — **CONFIRMED**

Each AC2 row adds itself to `completed` only after its own three asserts, so a failing row is absent from the set the each-liveness probe compares:

```
$ git show a520cbd...:test/workbench-adversarial-matrix.census.ts | sed -n '646,649p;663,666p;390p;373p'
646:     expect(bad, bad.join(" | ")).toEqual([]);
647:     expect(codes).toEqual(judgedKeys.map(() => "ok"));
648:     expect(judgedKeys, `${label(row)}: ...`).toEqual(EXPECTED_JUDGED.filter(key => key.startsWith(`S${row.scenario}|`)));
649:     completed.add(row.scenario);
663:     expect(
664:       [...completed].map(scenario => `S${scenario}`),
665:       "the AC2 cases that reached their last assertion this run",
666:     ).toEqual(EXPECTED_JUDGED_ROWS);
390: const EXPECTED_JUDGED_ROWS: readonly string[] = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S9"];
373:   "S4|pin|workbench-pi-detached.test.ts|launches reviewed pure computation outside Pi ownership and reattaches by stable invocation",
```

(:648 is abbreviated here at `...`; the file carries the full message.) At landing 685 scenario 4's pinned case threw, so :646 redded naming it, and :666 redded naming only the missing `S4` (`gate.json` `diagnostics[1].message`):

```
L42: +   "scenario 4/pin: failed: test/workbench-pi-detached.test.ts \"launches reviewed pure computation outside Pi ownership and reattaches by stable invocation\" [test]: the case failed in the test report: SyntaxError: Unexpected token 'D', \"Detached h\"... is 
L44: +     at /tmp/fw-landprep-wb-dpoo-Ah7Y/test/workbench-pi-detached.test.ts:23:21
L49:  ❯ test/workbench-adversarial-matrix.census.ts:646:34
L54:  FAIL  test/workbench-adversarial-matrix.census.ts > wb-0kg.11 docs/workbench/08 adversarial-matrix census (report mode) > AC2 each-liveness (rule 16, U1): the it.each registers one run-mode AC2 case per frozen judged scenario, in order and on the judging budg
L55: AssertionError: the AC2 cases that reached their last assertion this run: expected [ 'S1', 'S2', 'S3', 'S5', 'S6', …(2) ] to deeply equal [ 'S1', 'S2', 'S3', 'S4', 'S5', …(3) ]
L64: -   "S4",
L71:  ❯ test/workbench-adversarial-matrix.census.ts:666:7
```

The judge paired :646 but not :666 (`judge.json` `reds[7]`: `classification "report-mode-consequent of reds[5] (test/workbench-pi-detached.test.ts:17) - primary not cleared (...) - HOLD"`; `reds[8]`: `line 666, realAssertions 1, classification "REAL RED (realAssertions 1 > 0)"`), and the leg guard then read `guard: {"legsOwed": 11, "legsRan": false, "preLegRealRed": true}` with every `serialLegs[*].outcome` = `not-run (pre-leg REAL RED: 1 red(s) carry real assertions; no leg runs, nothing is appended)` — that one red is :666. The primary itself (`diagnostics[0].message` L6211-L6212: `FAIL  test/workbench-pi-detached.test.ts:17:1 > launches reviewed pure computation outside Pi ownership and reattaches by stable invocation` / `SyntaxError: Unexpected token 'D', "Detached h"... is not valid JSON`) is `JSON.parse(launched.content[0].text)` at `test/workbench-pi-detached.test.ts:23` receiving an error text instead of a receipt; the two strings in `src/` at fe0a2e41 that begin `Detached h` are `src/workbench/hosts/local-detached.ts:554` ("Detached host exited before handshake; invocation reserved, do not retry automatically") and `:568` ("Detached handshake timed out; invocation reserved and effects unknown. Do not automatically retry."). Which of the two fired is **UNDETERMINED** (V8 truncates the token; the report keeps no reply text — the artifact that would settle it is the tool reply, which neither gate.json nor judge.json holds); that it was load-shaped is **PLAUSIBLE** (both candidates are child-host handshake failures, and the step's `load.at_start`/`at_end` `load1` read 90.58 → 405.04 on 64 cores), not established.

## Finding 3 — exposure: the shape-(a) assertion `toBe("absent")` occurs 43 times in 27 of 30 census files, 23 of which carry a `liveness: the adopted judge is not accept-all` describe block; the 6 `it(`-titled liveness probes pin 6 different test files, of which exactly 1 carries a long `beforeAll` and redded in these two gates — **CONFIRMED** for the counts and the two gates; the other pinned files' history **UNDETERMINED**

```
$ git grep -l -i -E '^\s*it(\.each|\.for)?\(\s*["`].*liveness' a520cbd -- 'test/*.census.ts' | wc -l   # 15
$ git grep -n -i -E '^\s*it(\.each|\.for)?\(\s*["`].*liveness' a520cbd -- 'test/*.census.ts' | wc -l   # 18
$ git grep -n -E 'reached their last assertion' a520cbd -- 'test/*.census.ts' | wc -l                 # 6  (shape b)
$ git grep -l -E 'toBe\("absent"\)' a520cbd -- 'test/*.census.ts' | wc -l                             # 27 files, 43 assertions
$ git grep -l -i -E '^\s*describe(\.each)?\(\s*["`].*liveness' a520cbd -- 'test/*.census.ts' | wc -l   # 23 files (one block each), all 23 also in the 27 above
$ git grep -l -i liveness a520cbd -- 'test/*.census.ts' | wc -l                                       # 30 files, 108 lines (any mention)
```

Shape (a), what each pins (constant resolved at a520cbd): `census-gate.census.ts:42` → `SMOKE` = `test/workbench-census-helper-smoke.test.ts` (:22); `child-crash-faults.census.ts:69` → `OWN_FILE` = `test/workbench-child-crash-faults.test.ts` (:30); `hk9l-copy-window.census.ts:84` → `pin()` (:34) = `IDENTITY_FILE` = `test/workbench-identity.test.ts` (:29); `rf-external-authority-echo-run-pin.census.ts:141` → `CENSUS` = `test/workbench-rf-external-authority-echo-census.test.ts` (:29); `rf-tsx-worker-lifecycle-run-pin.census.ts:146` → `CENSUS` = `test/workbench-rf-tsx-worker-lifecycle-census.test.ts` (:29); `w21-survivor-pins.census.ts:75` → `DOCS_PIN` → `CAP_RECEIPT` (:30, :37). Of the 6 pinned files only the cap-saturation bench appears among the 14 + 19 red rows of the two judge reports; the other 5 appear in neither. Shape (b), the six each-liveness sites: `acceptance-journeys.census.ts:930`, `adversarial-matrix.census.ts:665`, `docs08-replay-reconcile.census.ts:567`, `docs19-scg-worker-role.census.ts:344`, `docs20-contract.census.ts:571`, `freshness-retention.census.ts:403` — each will red, with an S-id / row-id list and no cause, whenever any sibling AC2 row fails, since the sibling rows' failure texts live in a different `FAIL` block. The other 37 `toBe("absent")` assertions sit, by file-level co-occurrence (nesting not parsed), inside the 23 `liveness: the adopted judge is not accept-all` describe blocks as wrong-title probes over the census's own first judged pin — `compat-feature.census.ts:467-471` alters a real pinned title by one character (`agents` → `agentS`) and asserts `toBe("absent")` — and carry the same exposure whenever that pinned file fails collection; I did not resolve which file each pins (artifact: each census's judged-row / pin table).

## Evidence

- `judge.json` (692) `reds` tally: 19 reds; markers `Test timed out in 5000ms` 11, `Hook timed out in 240000ms` 2, `exceeded its timeout` 3, `Test timed out in 120000ms` 1, none 2; `realAssertions` 0 for 16, 1 for `docs14-performance-benchmark.census.ts:553` (classed consequent of `reds[11]` tool-reply-bench:207, HOLD), `w21-survivor-pins.census.ts:62` and `:78` (REAL RED); `guard: {"legsOwed": 10, "legsRan": false, "preLegRealRed": true}`; `exitCode 8`; `verdictClass "REAL-RED refusal"`; `route "full-rerun"`.
- `judge.json` (685) `reds` tally: 14 reds; markers `Test timed out in 5000ms` 8, `Hook timed out in 60000ms` 1, none 5; `realAssertions` 1 for `adversarial-matrix.census.ts:646` (consequent, HOLD), `:666` (REAL RED), `compat-feature.census.ts:412` and `tool-exposure-census.census.ts:587` (both consequents of `reds[4]` pi-client:21, HOLD); `guard: {"legsOwed": 11, ...}`; `exitCode 8`.
- Ledger rows (`metrics.jsonl`): 685 staged M:35584 00:19:40Z, judge rc 8 M:35615 00:40:22Z, ruling R-B101 M:35616 00:41:19Z, re-staged M:35619 00:41:30Z, 9 `serial-leg` rows M:35684-M:35692, judge rc 0 and `landing-gate` `PASS-WITH-TIMING-NOTE` M:35693/M:35696 01:06:13Z, `fold-done` M:35733 01:19:18Z (59.6 min); neighbours 669-690 excluding 685: n=21, median 23.9 min, min 14.2, max 42.7 (first `landing-staged` to last `fold-done` per landing). 692 staged M:36588 07:01:31Z, judge rc 8 M:36664 07:28:07Z, ruling R-B114 M:36726 07:50:34Z (outside the window), re-staged M:36727 07:50:46Z; at my read a second try had judged rc 8 at M:36786 08:18:27Z and 692 was re-staged again (M:36790), with no `fold-done` yet — outside the window, not analysed.
- Ruling texts, quoted as producer text: R-B114 (M:36726): "the 3 reds counted as real assertions are load-shaped (a 240000ms hook timeout in workbench-w21-survivor-pins.census.ts:62/:78 and the docs14 performance-benchmark census :553) at host load1 220-302"; R-B101 (M:35616): "all 14 reds are strict timeout markers (one 60000ms beforeAll hook, the rest 5000ms test timeouts) with 0 real AssertionErrors each, at host load1 224-301" — while the 685 judge.json counts `realAssertions 1` for 4 rows and lists :666 in `realReds`; both are quoted, not reconciled.

## Suggested fixes, cheapest first

1. **Carry the verdict's `why` into the exact-code assertion** — `expect(verdict?.code, verdict?.why).toBe("absent")` at `w21-survivor-pins.census.ts:78` (and the other 5 shape-(a) sites). One argument, no semantic change: a collection failure then reds with `the runner could not collect the file: Hook timed out in 240000ms.` in the assertion text, which names the pinned file's marker and lets a reader — or the machine's text predicate — pair it to the primary.
2. **Carry the siblings' causes into the each-liveness message** — keep each row's `bad` (already computed at :643) in a module-level map beside `completed`, and join the missing rows' entries into the :665 message, so the text reads `S4: scenario 4/pin: failed: test/workbench-pi-detached.test.ts ...` instead of a bare S-id diff. Two lines per each-liveness file.
3. **Anchor shape-(a) probes on a file with no hooks** — the probe needs only a real collected file to prove the judge will not accept a wrong title; pinning it on a heavy bench (`realRun()` under a 240 s hook) couples the probe's result to that bench's budget. A census-owned always-green anchor file, or the census's lightest pinned file, removes the coupling; costs one constant per census.

Not proposed: changing the judge's code precedence at `census.ts:5167` — `collection-error` before `absent` is the correct order (a file that was never collected has no titles to be absent from), and the `why` it emits is the positive below.

## Positives worth protecting

- **The collection-error `why` names the file and the marker verbatim** — `census.ts:5167` forwards `file.message`, so :62's refusals at 692 read `test/workbench-cap-saturation-receipt.test.ts "quotes the two docs sections ..." [test]: the runner could not collect the file: Hook timed out in 240000ms.` six times (gate.json `diagnostics[1].message` L104-L115). This is the opposite of the `STACK_TRACE_ERROR` route the 2026-10-28 file reports; a refactor that normalises verdict texts must keep this forwarding.
- **The probes' designs are sound for what they test** — :77 held (`ok` false) at 692, and `completed.add` after the asserts (:649) genuinely proves every row reached its last assertion; the defect is confined to the message and the exact-code choice.
- **`--includeTaskLocation --expect.requireAssertions` on the test script (`package.json:48`)** still give every census row a file:line and an assertion count — the `realAssertions 1` reading is what made both cases attributable at all.

## What I did not establish

- Which `Detached h...` message the pi-detached tool returned at 685, and whether that failure was load-induced (artifact: the tool reply text, not kept in either envelope).
- Whether any of the other 5 `it(`-titled shape-(a) pinned files, or any of the other 37 `toBe("absent")` sites' pinned files, has redded on timing or failed collection in a prior window (not swept; artifact: the prior windows' judge reports and each census's pin table).
- The counterfactual: that fix 1 applied at :78 would have let the machine's predicate class :78 a consequent — the predicate is machine-side and not re-run here.
- A file-alone reproduction of either red (not run; both kept worktrees were removed after the rulings).
- The second 692 try's judge report (`/tmp/fw-landprep-wb-fity-20261030T075105Z-4000931/judge.json`, 1.67 MB, 08:18Z): not parsed; outside the window.

## Postscript

Prior-art body hits, characterised so the Prior art line stays checkable. `survivor-pins`: the 2026-10-21 report-mode CORROBORATION (trunk) lists `w21-survivor-pins :60` among eleven census rows red at the 5000 ms default and greps the file for `timeout` (its :33, :55, :64); the 2026-10-21 no-config file (trunk) names it as one of 2 census files lacking the config header line (:112); the 2026-10-25 detached-timing file (trunk) counts it among the census-tier files in a timeout-spelling census (:124); the 2026-10-29 docs14 CORROBORATION (branch) names it once in a window-scope sentence (:109). `liveness`: the 2026-10-25 file quotes a docs09 row titled `wb-752.15 liveness: the adopted judge is not accept-all ...` red with `Test timed out in 5000ms`, `realAssertions 0` (:64) — a liveness-titled row's own timing red, not a probe red for a pinned file's failure; the 2026-10-26 positive and the 2026-10-28 file count the ledger kind `daemon-liveness`; the 2026-10-29 R515/R668 CORROBORATION and the 2026-10-29 docs14 CORROBORATION mention the word in refusal and red inventories (the latter at :105, landing 631's `adversarial-matrix.census.ts:646` and `:666`, whose primaries it left UNDETERMINED). The title-level grep (0 of 30 names) was run before drafting; the body greps were run while drafting. Machine-side, for the record and out of this repo's scope: the judge classed :646 a consequent and :666 REAL RED, which is correct under its text predicate — the pairing gap is half in the probe text (this file) and half in the predicate (the machine's own record).
