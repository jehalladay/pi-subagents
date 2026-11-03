# CORROBORATION, n=2: landings 685 and 692 refused pre-leg on 4 and 3 real-assertion census rows, and a 240000 ms beforeAll timeout in a pinned file reached w21-survivor-pins:62 as collection-error — a second route beside STACK_TRACE_ERROR, while gate.json alone carried the load (load1 90.58 to 405.04 and 125.7 to 296.79)

**From:** flywheel bead-machine orchestrator (Pi-Subagents) — the flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77), the same seat as the corroborated 2026-10-28 file and the 2026-10-29 docs14 CORROBORATION, a later cycle: a re-run of the mechanism at new sites, not an independent observer. The gates and rulings quoted are the machine's own artifacts, read, not produced, by this draft.
**Date:** 2026-10-30 (operation window 2026-10-29T07:22Z <= utc <= 2026-10-30T07:40Z; landing 685's judge at 00:40:22Z and landing 692's judge at 07:28:07Z sit inside it; 692's ruling R-B114 at 07:50:34Z sits 10 min 34 s past the window end and is marked where cited)
**`pi-subagents` revision:** every quoted `path:line` read at `a520cbdcf9b679fba36f07ddedf7afe3a0816b79`, landing 692's gated commit of record (`data.gated_commit` of its gate.json; tree `72cc800636a3a55a1ba00f2adaa3be47b0852200`; hop `242b275853ec69f101dd835cefff8ea0a47ca768` = `git rev-parse origin/workbench/implementation-program` at the fetch, 2026-10-30T07:01:12Z). Blob identity by `git rev-parse <sha>:<path>` at a520cbd and 242b275: `test/workbench-w21-survivor-pins.census.ts` fc6ccce, `test/workbench-adversarial-matrix.census.ts` 5e0936e, `test/workbench-cap-saturation-receipt.test.ts` 507907c, `test/workbench-scratch-census.test.ts` 472d56e, `test/helpers/census.ts` 51bc11a, `vitest.census.config.ts` e3c9aa2, `vitest.config.ts` cb1e695, `package.json` c6bc334 — identical at both; `test/workbench-tool-reply-bench.test.ts` ce5ec9e identical at a520cbd and at the 2026-10-29 file's pin e3022a139; `test/workbench-pi-detached.test.ts` 6c201b57 identical at a520cbd and at landing 685's gated commit `fe0a2e413169c5d4c577c15e6dc836a6676eee29`. The corroborated file pinned `99e1dfd254663c2ba60ebdba8a15ac90fa31934c`. Rig working tree: HEAD 188ae59 on `workbench/implementation-program`, 1700 commits behind 242b275; `git status --porcelain | wc -l` = 11, so dirty — all 11 untracked `new-feedback/*.md` leftovers of earlier delivery lanes, 0 tracked modifications; this file was drafted and committed in a detached worktree cut from 242b275.
**`vitest` revision:** 4.1.10 (`package-lock.json:5281-5283` at a520cbd: `"node_modules/vitest": {` / `"version": "4.1.10"`); not re-run by me.
**Installed binary:** none for this repo — `package.json` at a520cbd (`@tintinweb/pi-subagents` 0.20.0) declares no `bin` field; every claim here is about source and about the two kept gate reports.
**Machine-side producer pins (not this repo):** gate-judge 1.1.0 (`tool`/`version` top-level keys of both judge.json files); forge 0.2.1 rev `8a824e6a41e4` (`data.harness` of both gate.json files: `forge 0.2.1 (rev 8a824e6a41e4) at /local/home/jehallad/.local/share/agent-tools-update/uv-tools/forge-20261029T103003Z/...`); furnace supervised runs `frn-run-fw-wisp-5fy4i` / attempt `frn-atm-fw-wisp-t1c1t-1` (685 try 1) and `frn-run-fw-wisp-gpaxz` / `frn-atm-fw-wisp-drltt-1` (692 try 1), from each `context.json` `furnace` block.
**Method:** read-only `python3 -I` parses over the two kept land-prep artifact sets `/tmp/fw-landprep-wb-dpoo-20261030T001950Z-3589100/{gate,judge,context}.json` (landing 685, bead wb-dpoo, try 1) and `/tmp/fw-landprep-wb-fity-20261030T070147Z-646442/{gate,judge,context}.json` (landing 692, bead wb-fity, try 1), the judge-report sha256 of each matching its `context.json` (`2695ab33...` and `d4392df5...`); rows of `machines/flywheel/ledger/metrics.jsonl` (M:n = line n; 36,803 lines at my read, append-only); `git show` / `git grep` at a520cbd in the rig clone. Nothing was re-run; no file-alone leg was executed.
**Scope:** feedback about pi-subagents' census/test design — the report-mode verdict routes in `test/helpers/census.ts`, the real-work `beforeAll` hooks in two pinned test files, and the budgets the configs do not set — not about the flywheel machine's gate-judge or composer, whose classification of these rows is the machine's own record (`git ls-tree origin/workbench/implementation-program -- machines bin` prints 0 entries). The liveness-probe half of the same two refusals is the sibling 2026-10-30 finding in this directory and is not restated here.
**Corroborates:** [`2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h.md`](2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h.md) — verdict **STILL-TRUE** at `a520cbdcf9b679fba36f07ddedf7afe3a0816b79` for its Finding 1 mechanism (reproduced at three new census/primary pairs in this window) and **CHANGED** for its Finding 6 exposure statement (a second route, collection-error, now reaches a census that pins a file with a long hook); independent hits 2 (landings 685 and 692), the same seat as the original.
**Prior art:** checked at the fetched ref: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` at 242b275 = 18 entries; union over the 12 `origin/machine/flywheel/feedback-*` branches = 30 files. Name grep `report-mode|consequent|collection|beforeall|hook` over the 30 = the 2026-10-28 file and the 2026-10-21 / 2026-10-29 report-mode CORROBORATIONs only. Body greps (`git grep -l -i -E '<kw>' <ref> -- new-feedback/`) at the trunk ref and at `origin/machine/flywheel/feedback-2026-10-29`: `collection-error` 0 and 0 files — the route in Finding 1 is new to the directory; `survivor-pins` 3 and 4 files, every hit naming the w21 census as a census-tier file or a 5000 ms-default red carrier (quoted in the Postscript), none naming a hook timeout or the collection-error code. The load-scaled-timeout and in-suite-load-line ideas are already filed (2026-10-20 fix 2, 2026-10-24 fix 1, 2026-10-21 CORROBORATION fix 3) and are endorsed in the table below, not re-filed.

## Why a second file rather than an edit

The corroborated file belongs to an earlier cycle of this seat and is not edited. A separate file preserves its revision (99e1dfd2), its method and mine (a520cbd, two new kept artifact sets), which is what makes n=2 mean anything — an edit would fold two observations into one. It also spares every writer the merge conflict a shared file imposes under concurrent filing, which this directory's delivery lane (one file per commit on a per-day branch) exists to avoid.

## What this adds

- **A new mechanism:** the corroborated file describes one route from a pinned case's timeout to a real-assertion census red — the report's `failureMessages[0]` forwarded as `the case failed in the test report: Error: STACK_TRACE_ERROR` at `test/helpers/census.ts:5188`. This window shows a second route: a `beforeAll` hook timeout in a pinned *file* leaves the whole file uncollected, so the report carries a file-level `message` and `test/helpers/census.ts:5167` returns `collection-error` for every pin on that file — six pins at once at `test/workbench-w21-survivor-pins.census.ts:62`. Unlike the first route, this one's text names the file and the marker verbatim (the positive to protect below). The new sites of the first route (Finding 2), the realized cost (Finding 3), the load-figure placement (Finding 4) and the readbacks (Finding 6) are supporting sightings, not the addition.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| the STACK_TRACE_ERROR route end to end at source, and fixes 1-3 (timeout-shaped verdict at :5188; budget every pin; print the report duration) | [`2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h.md`](2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h.md) |
| the docs14 / tool-reply-bench pair with an explicit budget, and its two UNDETERMINED items (which primary each adversarial-matrix row named at landing 631; whether K9 classifies post-flip) | `2026-10-29-CORROBORATION-n-2-docs14-report-mode-rows-turned-a-60000-ms-tool-reply-bench-timeout-into-a-census-red-at-landings-627-and-650-despite-the-explicit-per-it-budget.md` |
| census rows' OWN 5000 ms-default timeouts (this window's docs09:769, docs20:550, tool-exposure:581, compat-feature:406/:416 belong there) | `2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md` (trunk), fix 3 of which already asks for load1 beside the census step |
| the census tier still on the vitest 5000 ms default after the detached-timing cure | `2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-which-burned-119-file-alone-legs-of-the-docs09-census-file-66-1-min-in-24-h.md` (trunk) — STILL-TRUE at a520cbd, Finding 6 |
| a load-scaled `testTimeout` (`PI_GATE_LOAD`) and load-scaled census budgets | `2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md` fix 2 (trunk); `2026-10-24-CORROBORATION-docs09-787-red-at-5000-ms-in-8-of-23-landings-315-337-four-more-register-rows-at-1-2-each-13-reds-0-asserts-12-of-12-legs-green-census-config-at-cbe3588-sets-no-testtimeout.md` fix 1 (trunk) — endorsed, not re-filed |
| why a timeout's report text reads `Error: STACK_TRACE_ERROR` | `2026-10-21-vitest-4-1-10-json-report-failuremessages-read-error-stack-trace-error-for-every-timeout-red-so-a-marker-reader-must-pair-reporter-default-with-reporter-json-n-10-gates.md` (trunk) |
| `package.json` without `"type"`, so vite warns `ESM syntax in a file loaded as CommonJS (vitest.census.config.ts:1:1)` on every census run | `2026-10-21-package-json-at-eaa5a46-carries-no-type-field-so-node-warns-module-typeless-package-json-on-dist-loads-and-vite-8-2-1-warns-on-every-vitest-config-load-n-1-on-the-census-config.md` (trunk) — STILL-TRUE, Finding 6 |

## Summary, with numbers

Two of the window's land-prep judge reports refused pre-leg on real-assertion census rows. Landing 685 (wb-dpoo, judge 2026-10-30T00:40:22Z): 14 reds — markers `Test timed out in 5000ms` 8, `Hook timed out in 60000ms` 1, none 5; `realAssertions` 0 for 10 rows and 1 for 4 census rows (`adversarial-matrix.census.ts:646` and `:666`, `compat-feature.census.ts:412`, `tool-exposure-census.census.ts:587`); the judge paired :646, :412 and :587 to primaries as `report-mode-consequent` (HOLD) and left :666 REAL RED, so `guard.legsOwed 11, legsRan false, preLegRealRed true`. Landing 692 (wb-fity, judge 07:28:07Z): 19 reds — `Test timed out in 5000ms` 11, `Hook timed out in 240000ms` 2, `exceeded its timeout` 3, `Test timed out in 120000ms` 1, none 2; `realAssertions` 0 for 16 rows and 1 for 3 census rows (`docs14-performance-benchmark.census.ts:553`, paired to `tool-reply-bench.test.ts:207` and held; `w21-survivor-pins.census.ts:62` and `:78`, REAL RED), `legsOwed 10`. The new mechanism is :62: the pinned file `test/workbench-cap-saturation-receipt.test.ts` runs a real bench in `beforeAll(() => { realRun(); }, 240_000);` (:216-218), the hook expired in the default test step (55 of 55 tests skipped), and every pin on that file read `the runner could not collect the file: Hook timed out in 240000ms.` (`census.ts:5167`). The known route reproduced at three new pairs (Finding 2), each row text still `the case failed in the test report: Error: STACK_TRACE_ERROR`. Cost: 685 took 59.6 min first-staged-to-fold (ruling R-B101, re-stage, 9 serial legs, PASS-WITH-TIMING-NOTE with 18 register rows) against a 23.9 min median for its 21 neighbours 669-690 (14.2-42.7); 692 was judged red at 07:28:07Z, ruled load-induced at 07:50:34Z (R-B114, past the window end), re-staged at 07:50:46Z, and at my read had judged red a second time at 08:18:27Z with no fold — a lower bound of 77 min open. The load figures that both rulings rest on live only in gate.json: `data.steps[3].load` `at_start`/`at_end` `load1` 90.58 → 405.04 (685) and 125.7 → 296.79 (692) on 64 cores; neither judge.json carries a load key, and the only `load` substring in either census output is the vite ESM warning. `vitest.census.config.ts` and `vitest.config.ts` still set no `testTimeout`/`hookTimeout` at a520cbd (grep -c 0 and 0).

## Finding 1 — the collection-error route: a pinned file's `beforeAll` timeout reaches every pin on that file as `collection-error`, with the file and the marker in the text — **CONFIRMED**

Source at a520cbd. The carrier hook, with its one real run shared by every case in the file:

```
$ git show a520cbdcf9b679fba36f07ddedf7afe3a0816b79:test/workbench-cap-saturation-receipt.test.ts | sed -n '178,179p;216,218p'
178: /** One real run of the whole plan over the default W21 fixture, with tiny sampling; shared by every case. */
179: const realRun = () => {
216: beforeAll(() => {
217:   realRun();
218: }, 240_000);
```

The route in the helper — the file-level `message` is checked before any title is located, and the `why` forwards it verbatim:

```
$ git show a520cbd...:test/helpers/census.ts | sed -n '5167p'
5167:   if (file.message !== undefined && file.message !== "") return verdict(pin, "exists", "collection-error", `the runner could not collect the file: ${file.message}`);
```

The pins: `test/workbench-w21-survivor-pins.census.ts:30` `const CAP_RECEIPT = "test/workbench-cap-saturation-receipt.test.ts";`, :37-45 one docs pin plus the D1/D2/D3/D9/D10 rows on `CAP_RECEIPT`, and :61-62 `const verdicts = judge(REPORT, DOCS_FLOOR_PINS);` / `expect(refusals(verdicts)).toEqual([]);`. Landing 692's gate envelope (`gate.json` `diagnostics[0].message`, the test step; `diagnostics[1].message`, the census step):

```
L5379:  ❯ test/workbench-cap-saturation-receipt.test.ts (55 tests | 55 skipped) 253385ms
L6042:  FAIL  test/workbench-cap-saturation-receipt.test.ts [ test/workbench-cap-saturation-receipt.test.ts ]
L6043: Error: Hook timed out in 240000ms.
L6045:  ❯ test/workbench-cap-saturation-receipt.test.ts:216:1
```

```
L96:  FAIL  test/workbench-w21-survivor-pins.census.ts > W21 survivor pins (wb-36l): the gate's own test report, judged in report mode > docs-floor class: the re-expressed docs pin and its D1/D2/D3/D9/D10 falsifier rows are each collected once, passed and asserting
L97: AssertionError: expected [ …(6) ] to deeply equal []
L104: +   "test/workbench-cap-saturation-receipt.test.ts \"quotes the two docs sections it answers verbatim, so doc drift fails here\" [test]: the runner could not collect the file: Hook timed out in 240000ms.
L105: + If this is a long-running hook, pass a timeout value as the last argument or configure it globally with \"hookTimeout\".",
L118:  ❯ test/workbench-w21-survivor-pins.census.ts:62:32
```

(L106-L115 repeat the same `why` for the five falsifier rows.) The judge: `reds[17]` `file test/workbench-w21-survivor-pins.census.ts, line 62, marker "Hook timed out in 240000ms", realAssertions 1, classification "REAL RED (realAssertions 1 > 0)"` — the marker it attributes to the census row is the one it read inside that row's text, which is the difference from the first route. Test-step summary (L5981-L5984): `Test Files  7 failed | 475 passed (482)`, `Tests  11 failed | 18946 passed | 1 expected fail | 62 skipped | 2 todo (19022)`, `Duration  834.48s`; census step (L19-L22): `Test Files  4 failed | 26 passed (30)`, `Tests  7 failed | 1677 passed (1684)`, `Duration  145.18s`. Landing 685's one hook red (`test/workbench-scratch-census.test.ts:713-715` `beforeAll(() => { census(); }, CENSUS_WALK_BUDGET_MS)` with `:510 const CENSUS_WALK_BUDGET_MS = 60_000;`, `diagnostics[0].message` L6143-L6146 `Error: Hook timed out in 60000ms.`, 164 tests / 8 skipped) did **not** take this route: `git grep -n 'scratch-census' a520cbd -- 'test/*.census.ts'` = 0 — no census pins that file — so it stayed a held hook red (`holds[0]`: `test/workbench-scratch-census.test.ts hook beforeAll@(file scope) not cleared: no green try`). The route needs a pinned file; the two conditions met at 692 and not at 685 are what bound n=1 for the mechanism and n=2 for the refusals.

## Finding 2 — the STACK_TRACE_ERROR route at three new census/primary pairs, all three paired by the judge as consequents — **CONFIRMED**; it settles one of the 2026-10-29 file's UNDETERMINED items for these two reports

Landing 685: `test/workbench-pi-client.test.ts:21` (`diagnostics[0].message` L6198-L6199: `FAIL  test/workbench-pi-client.test.ts:21:3 > Pi Workbench client > L2: an explicitly selected Claude backend launches a script through the registered Pi tool` / `Error: Test timed out in 5000ms.`) became two census reds, `compat-feature.census.ts:412` and `tool-exposure-census.census.ts:587`, each `realAssertions 1`, each with the first route's text (`diagnostics[1].message` L89):

```
L89: +   "row B1.1: failed: test/workbench-pi-client.test.ts \"L2: an explicitly selected Claude backend launches a script through the registered Pi tool\" [test]: the case failed in the test report: Error: STACK_TRACE_ERROR
```

Landing 692: `test/workbench-tool-reply-bench.test.ts:207` (`diagnostics[0].message` L6200-L6201: `FAIL  test/workbench-tool-reply-bench.test.ts:207:3 > W21 tool-reply receipt: contract and completeness (C1, C4) > emits host, toolchain, fixture shape, limits and one series per shape and cap` / `Error: Test timed out in 120000ms.`; the file's budget literals at a520cbd are `}, 120_000);` at :234/:245/:259/:277/:289 and `}, 60_000);` at :302) became `docs14-performance-benchmark.census.ts:553` (`expect(failures(row, half, verdicts)).toEqual([]);`), `diagnostics[1].message` L73: `row measure:pi-tool-response-size/guard: failed: test/workbench-tool-reply-bench.test.ts "emits host, toolchain, fixture shape, limits and one series per shape and cap" [test]: the case failed in the test report: Error: STACK_TRACE_ERROR`. This is the 2026-10-29 file's docs14 / tool-reply-bench pair through a different case of the same bench file (that file reported :291 with a 60_000 budget at e3022a139; the blob is identical at a520cbd, so this is a second case, whose 120_000 budget also expired). The judge paired all three (`judge.json` `consequents[]`, 685: `{"index": 9, "primaryIndexes": [4], "file": "test/workbench-compat-feature.census.ts", "line": 412, ...}` and `{"index": 12, "primaryIndexes": [4], "file": "test/workbench-tool-exposure-census.census.ts", "line": 587, ...}`; 692: `{"index": 16, "primaryIndexes": [11], "file": "test/workbench-docs14-performance-benchmark.census.ts", "line": 553, ...}`; `reportModeConsequent: {"knob": "FW_JUDGE_CONSEQUENT", "allowlist": {..., "loaded": true, "entries": 2}}`), so the 2026-10-29 file's "whether K9 classifies these events correctly post-flip" has two post-flip reports in which the pairing fired for every STACK_TRACE_ERROR-route row — that it paired them is CONFIRMED; that the pairing is *correct* is the machine's judgment, not this repo's. Its other UNDETERMINED item (which primary each adversarial-matrix row named at landing 631) is not settled here — landing 631's report was not read — but at landing 685 the same two rows named `test/workbench-pi-detached.test.ts:17` (:646, a `SyntaxError`, not a timeout) and :646 itself (:666), which is the sibling liveness finding.

## Finding 3 — realized cost: 59.6 min for 685 against a 23.9 min neighbour median, and 692 still open at my read — **CONFIRMED** for the timestamps; 692's figure a lower bound

From `metrics.jsonl` (first `landing-staged` to last `fold-done` per landing): 685 staged M:35584 00:19:40Z → judge rc 8 M:35615 00:40:22Z → R-B101 M:35616 00:41:19Z → re-staged M:35619 00:41:30Z → 9 `serial-leg` rows M:35684-M:35692 (01:06:04Z-01:06:11Z) → judge rc 0 M:35693 and `landing-gate` `PASS-WITH-TIMING-NOTE` M:35696 01:06:13Z (`reds` 18: 9 `hit` + 9 `candidate-sighting`, 0 with `realAssertions` above 0; route `R-T7(5) register (attention, compat, docs04, docs20, evidence, tool) + R609 serial-leg (others)`) → `fold-done` M:35733 01:19:18Z: 59.6 min. Neighbours 669-690 excluding 685: n=21, median 23.9 min, min 14.2 (675), max 42.7 (688); 691, outside that range, took 78.2 min for an unrelated hand cure named in R-B114. 692: staged M:36588 07:01:31Z → judge rc 8 M:36664 07:28:07Z → R-B114 M:36726 07:50:34Z (10 min 34 s past the window end) → re-staged in batch B692-694 M:36727 07:50:46Z → a second judge rc 8 at M:36786 08:18:27Z (report `/tmp/fw-landprep-wb-fity-20261030T075105Z-4000931/judge.json`, 1.67 MB, not parsed, outside the window) → re-staged M:36790 08:18:34Z; no `fold-done` for 692 at my read (M:36803), so its cost is at least 77 min and unbounded here.

## Finding 4 — the load figures exist only in gate.json; neither the judge report nor any suite output carries one — **CONFIRMED**; the rulings' own load figures **PLAUSIBLE**

```
685 gate.json data.steps[3] (test)   load.at_start {"load1": 90.58,  "load5": 102.2,  "load15": 124.48, "cores": 64, "observed": true}  at_end {"load1": 405.04, "load5": 364.37, "load15": 272.86}
685 gate.json data.steps[4] (census) load.at_start load1 405.04                                             at_end load1 276.09
692 gate.json data.steps[3] (test)   load.at_start {"load1": 125.7,  "load5": 178.55, "load15": 212.87, "cores": 64, "observed": true}  at_end {"load1": 296.79, "load5": 351.62, "load15": 305.05}
692 gate.json data.steps[4] (census) load.at_start load1 296.79                                             at_end load1 348.99
basis string on every sample: "the kernel's 1, 5 and 15 minute load-average windows"
```

`judge.json`, both reports: no key matching `load*`/`uptime` (the only match is `"loaded": true` under `reportModeConsequent.allowlist`); the substring `load` occurs 6 and 10 times, all inside test titles (`evidence-loader`, `payload`). Census output: the only `load` substring in 692's `diagnostics[1].message` is the vite warning at L24-L25 (`(!) Your Vite config uses features that are unsupported by ...` / `- ESM syntax in a file loaded as CommonJS (vitest.census.config.ts:1:1). Use a .mjs extension or set "type": "module" in the closest package.json`), and in 685's at L25-L26 plus a `docs/workbench/20 evidence-loader contract census` title at L120. The rulings' figures — R-B101 "at host load1 224-301 during the window", R-B114 "at host load1 220-302" — are producer text consistent with, but not derived from, the envelope's 90.58 → 405.04 and 125.7 → 296.79, so they stay PLAUSIBLE. An in-suite load line would duplicate what Forge already records per step; the gap is on the judge-report and ruling path, which is machine-side and noted here in one line only.

## Finding 5 — R-B101's text and the 685 judge disagree on the real-assertion count; both are quoted, neither reconciled — **CONFIRMED** (both quoted)

R-B101 (M:35616, 00:41:19Z): "all 14 reds are strict timeout markers (one 60000ms beforeAll hook, the rest 5000ms test timeouts) with 0 real AssertionErrors each, at host load1 224-301 during the window". The 685 `judge.json`: `reds` 14 with `marker` none for 5 (`pi-detached.test.ts:17`, `adversarial-matrix.census.ts:646` and `:666`, `compat-feature.census.ts:412`, `tool-exposure-census.census.ts:587`), `realAssertions 1` for the 4 census rows, `realReds: ["test/workbench-sanitizer-corpus.test.ts:1177 registered entry 26 blob changed", "test/workbench-adversarial-matrix.census.ts:666 realAssertions 1 (diagnostics[1].message#L55)"]`. R-B114 (M:36726) and the 692 judge agree on 19 reds and 3 real-assertion rows; R-B114's "14 timeout markers" is the judge's 11 + 2 + 1 strict `timed out in` markers, with the 3 `exceeded its timeout` reds counted separately by the judge (`markerClass "exceeded.*timeout"`).

## Finding 6 — readbacks at a520cbd — **STILL-TRUE**

- `test/helpers/census.ts:5188` is still the single failed-case shape: `if (test.state === "failed") return verdict(pin, "asserts", "failed", \`the case failed in the ${tier} report: ${test.errors[0] ?? "no error message"}\`, count);`; the string `timed out` occurs once in the file's 6,231 lines (`:1884`, the tier run itself); `STACK_TRACE` 0 times.
- `vitest.census.config.ts` (blob e3c9aa2, 6 lines) sets `{ test: { include: ["test/**/*.census.ts"], allowOnly: false } }` and nothing else — `grep -c -E 'testTimeout|hookTimeout'` = 0; `vitest.config.ts` (cb1e695) = 0.
- `package.json` (c6bc334) has no module `"type"` (its only `"type"` key is `"type": "git"` in the repository block at :11), so the vite warning above prints on every census run; `:48` still carries `--includeTaskLocation --expect.requireAssertions` on the test script and `:51` `"test:census": "vitest run --config vitest.census.config.ts"`.
- `DEFAULT_TIER_REPORT` is imported by 30 of 30 `test/*.census.ts` files.

## Evidence

Per-red tables, from `judge.json` `reds[]` (`file:line marker realAssertions classification`, classification abbreviated to its first clause).

Landing 685 (14):
```
[0]  test/workbench-scratch-census.test.ts:712 (hook :713)      Hook timed out in 60000ms   0  hook red not cleared (no green try) - HOLD
[1]  test/source-hygiene.test.ts:55                               Test timed out in 5000ms    0  not cleared (leg not-run (pre-leg REAL RED ...)) - HOLD
[2]  test/workbench-graph-view.test.ts:1055                       Test timed out in 5000ms    0  HOLD
[3]  test/workbench-observe-query.test.ts:1184                    Test timed out in 5000ms    0  HOLD
[4]  test/workbench-pi-client.test.ts:21                          Test timed out in 5000ms    0  HOLD
[5]  test/workbench-pi-detached.test.ts:17                        none                        0  HOLD
[6]  test/workbench-sanitizer-corpus.test.ts:1177                 Test timed out in 5000ms    0  REAL RED (registered key entry 26 but the blob changed ...)
[7]  test/workbench-adversarial-matrix.census.ts:646              none                        1  report-mode-consequent of reds[5] (test/workbench-pi-detached.test.ts:17) ... HOLD
[8]  test/workbench-adversarial-matrix.census.ts:666              none                        1  REAL RED (realAssertions 1 > 0)
[9]  test/workbench-compat-feature.census.ts:412                  none                        1  report-mode-consequent of reds[4] (test/workbench-pi-client.test.ts:21) ... HOLD
[10] test/workbench-docs09-readers-relationships.census.ts:769    Test timed out in 5000ms    0  HOLD
[11] test/workbench-docs20-contract.census.ts:550                 Test timed out in 5000ms    0  matched-active but not cleared ... HOLD
[12] test/workbench-tool-exposure-census.census.ts:587            none                        1  report-mode-consequent of reds[4] (test/workbench-pi-client.test.ts:21) ... HOLD
[13] test/workbench-tool-exposure-census.census.ts:581            Test timed out in 5000ms    0  matched-active but not cleared ... HOLD
```

Landing 692 (19):
```
[0]  test/workbench-cap-saturation-receipt.test.ts:216 (hook)    Hook timed out in 240000ms  0  uncertain (reporter not exhaustively parsed / no title) - clear prohibited
[1]  test/workbench-control-admission.test.ts:288                 Test timed out in 5000ms    0  HOLD
[2]  test/workbench-control-admission.test.ts:294                 Test timed out in 5000ms    0  HOLD
[3]  test/workbench-detached-hostile-child.test.ts:227            exceeded its timeout        0  HOLD
[4]  test/workbench-detached-hostile-child.test.ts:246            exceeded its timeout        0  HOLD
[5]  test/workbench-detached-hostile-child.test.ts:364            exceeded its timeout        0  HOLD
[6]  test/workbench-gp-snapshot-join-census.test.ts:315           Test timed out in 5000ms    0  HOLD
[7]  test/workbench-retained-memory.test.ts:559                   Test timed out in 5000ms    0  HOLD
[8]  test/workbench-retained-memory.test.ts:697                   Test timed out in 5000ms    0  HOLD
[9]  test/workbench-retained-memory.test.ts:697                   Test timed out in 5000ms    0  HOLD
[10] test/workbench-sanitizer-corpus.test.ts:1492                 Test timed out in 5000ms    0  REAL RED (registered key entry 44 but the blob changed ...)
[11] test/workbench-tool-reply-bench.test.ts:207                  Test timed out in 120000ms  0  HOLD
[12] test/workbench-compat-feature.census.ts:406                  Test timed out in 5000ms    0  matched-active but not cleared ... HOLD
[13] test/workbench-compat-feature.census.ts:406                  Test timed out in 5000ms    0  matched-active but not cleared ... HOLD
[14] test/workbench-compat-feature.census.ts:416                  Test timed out in 5000ms    0  matched-active but not cleared ... HOLD
[15] test/workbench-docs09-readers-relationships.census.ts:769    Test timed out in 5000ms    0  HOLD
[16] test/workbench-docs14-performance-benchmark.census.ts:553    none                        1  report-mode-consequent of reds[11] (test/workbench-tool-reply-bench.test.ts:207) ... HOLD
[17] test/workbench-w21-survivor-pins.census.ts:62                Hook timed out in 240000ms  1  REAL RED (realAssertions 1 > 0)
[18] test/workbench-w21-survivor-pins.census.ts:78                none                        1  REAL RED (realAssertions 1 > 0)
```

Gate timing: 685 `started_at` 00:20:38Z, `completed_at` 00:39:55Z, test step 00:21:54Z-00:37:37Z (`duration_ms` 943313, `timeout_seconds` 1200), census 00:37:37Z-00:39:44Z; 692 07:08:13Z-07:26:14Z, test 07:09:37Z-07:23:35Z (838055 ms), census 07:23:35Z-07:26:02Z. Both `data.exit_code 1`, `data.failed_step "test"`, `gate_verdict "FAIL"`; every `serialLegs[*].outcome` reads `not-run (pre-leg REAL RED: N red(s) carry real assertions; no leg runs, nothing is appended)` with N = 1 (685) and 2 (692).

## Re-check verdicts on the corroborated file

| Claim in the 2026-10-28 file | Verdict at `a520cbd` |
|---|---|
| Finding 1: a report-mode census row re-counts a pinned case's budget expiry as a real assertion whose text cannot name the cause (census.ts:5188 the only failed-case shape) | **STILL-TRUE** — :5188 unchanged; reproduced at three new pairs (pi-client:21 → compat-feature:412 and tool-exposure:587; tool-reply-bench:207 → docs14:553), each row text `the case failed in the test report: Error: STACK_TRACE_ERROR` |
| Finding 2: landing 587's refusal and its 76.3 min cost | **UNDETERMINED** here — not re-derived; its receipts stand unexamined by me |
| Finding 3: the consequents reproduce file-alone from the frozen report | **UNDETERMINED** here — no file-alone leg run this session |
| Finding 4: the wb-yght rendering-pipeline site | **UNDETERMINED** here — not re-read |
| Finding 5: the consequent class never reaches a final landing-gate row | **STILL-TRUE** for this window's two sites — both refusals ended in `landing-gate-try` rows with `judgeRc 8` and rulings; 685's final `landing-gate` row (M:35696) carries 18 timing reds and 0 real-assertion rows |
| Finding 6: static exposure = any report-mode pin on a default-budget case | **CHANGED** — a second route exists: any report-mode pin on a *file* whose hook can expire (cap-saturation's 240_000 `beforeAll`) reds every pin on that file as `collection-error`, budget or not |
| its fix 1 (timeout-shaped verdict at :5188) | **STILL-TRUE** as the cheapest cure for the first route; the second route already names file and marker, which is the shape fix 1 should give the first |
| its fix 2 (budget every report-mode pin) | **CHANGED**, as the 2026-10-29 file found — a 120_000 budget expired at 692 (tool-reply-bench:207) |
| its fix 3 (print the pinned case's report duration beside the failure) | **STILL-TRUE** — unapplied; the 692 row text carries no duration |
| its Positives: `--expect.requireAssertions --includeTaskLocation` make the triage mechanical | **STILL-TRUE** — `package.json:48` unchanged; `realAssertions` and `file:line` on every red here come from them |

## Recommendations, additive to the corroborated file's list

1. **Give the :5188 branch the shape :5167 already has** — the collection-error `why` names the file and the exact runner message; the failed-case `why` should carry the pinned case's `duration` and, when `test.errors[0]` is the vitest timeout residue, the word `timeout`. One branch, and it makes the first route read like the second.
2. **Size or lift the two real-work `beforeAll` hooks out of the default gate's test step** — `test/workbench-cap-saturation-receipt.test.ts:216-218` (`realRun()`, one real run of the whole plan, 240_000; the file ran 253,385 ms before its 55 cases were skipped) and `test/workbench-scratch-census.test.ts:713-715` (`census()`, a walk of `test/` and `qa/`, 60_000). Each runs real work under a fixed budget inside a 482-file parallel step whose own envelope recorded load1 rising from 125.7 to 296.79; a measured budget, or a tier of their own, removes the carrier rather than the symptom. (The sibling finding covers what the liveness probe on the same file should do; this item is about the hook.)
3. **No in-suite load line is requested here** — Forge 0.2.1 already records `load.at_start`/`at_end` per step in gate.json with its basis; what this window lacked was the figure on the judge-report and ruling path, which is the machine's own record and out of this repo's scope.

## What worked well

- **The collection-error `why` names the file and the marker verbatim** — `census.ts:5167` forwards `file.message`, so the 692 census block carried `the runner could not collect the file: Hook timed out in 240000ms.` six times with the pinned file's path (L104-L115); a reader needs no second artifact to find the carrier. Protect the forwarding in any verdict-text normalisation.
- **Forge's per-step load samples in gate.json** (`data.steps[i].load.at_start/at_end`, `load1/5/15`, `cores`, `observed`, the basis string) are what let these two refusals be bounded against host load after the fact, with no product change; they are the measurement the rulings should have quoted.
- **`--expect.requireAssertions --includeTaskLocation` on `package.json:48`** still give every red a `file:line` and an assertion count; the 10 / 16 zero-assertion rows and the 4 / 3 real-assertion rows above are legible only because of them.
- **The frozen-report census design kept attribution to one block per site** — the census diff names the pinned case and its file inside gate.json, as the corroborated file's Positives already say; this file adds that it does so for a file-level failure too.

## What I did not establish

- The rulings' host-load figures (224-301, 220-302): producer text, not measured by me; my load joins are the gate.json per-step samples only.
- A low-load counterfactual for either hook (not run); whether `realRun()` fits 240 s unloaded (the only reading here is 253,385 ms at load1 125.7 → 296.79).
- The second 692 try (`/tmp/fw-landprep-wb-fity-20261030T075105Z-4000931/judge.json`, 1.67 MB, 08:18:27Z): not parsed; whether it is the same class is open, and 692's final cost is unbounded here.
- The 2026-10-28 file's Findings 2-4 (landing 587, file-alone reproduction, wb-yght): not re-derived; UNDETERMINED in the table above.
- Whether the judge's pairing of the three STACK_TRACE_ERROR-route rows is correct (machine-side; only that it fired is established).
- Queue-depth normalisation of the neighbour durations (raw first-staged-to-fold minutes only).

## Postscript

Prior-art body hits for `survivor-pins` (3 trunk files, 4 on the feedback-2026-10-29 branch), characterised so the Prior art line above stays checkable: the 2026-10-21 report-mode CORROBORATION (trunk) lists `w21-survivor-pins :60` among eleven census rows red at the 5000 ms default and greps the file for `timeout` (its :33, :55, :64); the 2026-10-21 no-config file (trunk) names it as one of 2 census files lacking the config header line (:112); the 2026-10-25 detached-timing file (trunk) counts it among the census-tier files in a timeout-spelling census (:124); the 2026-10-29 docs14 CORROBORATION (branch) names it once in a window-scope sentence (:109). None mentions a hook timeout, the `collection-error` code, or a file-level `message` in the report.
