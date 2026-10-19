# wb-nl8.1: load-sensitivity hardening for the three full-suite flake cases named by the wb-nl8 review (retry-fault member 18 timer delta, native-modules 20s concurrent-waiter, sandbox-rpc-census park row): re-measure budgets under the nl8 report flags, red-first, never weakening

## 2026-10-17 delivery: load-insensitive measurements for the three cases (owner worktree cut on trunk 03e2cce, red-first, src untouched)

Spec of record: /tmp/nl81-design.md as RULED by R480 (owner, 2026-10-17) and as CORRECTED by its fact-check (C1-C10; the corrections that changed what was done are named below). Owner rulings applied: Q1 the test-edit exception EXTENDS to `test/helpers/furnace-hosted-retry-journeys.ts` under P3-P5 (quiescent both-sided samples at the two censuses, churn knobs off by default, `armedAt`/`controlTimerExpiredBeforeCensus`), the five roster journeys and `RETRY_FAULT_JOURNEY_RUNNERS` byte-identical, the bead's "poll until delta >= 1" withdrawn as answer-seeking; Q2 hold released for the owner cut; Q3 the contention harness lives in /tmp and is quoted verbatim here, never committed; Q4 acceptance is the literal load1 >= 30 on this host, every record carrying load1 AND the oversubscription ratio (nproc, K, maxWorkers); Q5 `beforeAll` warm-up of exactly importAll steps 1-3, 60_000, `await import` inside the hook; Q6 the reply-side `repliesSettled` waits at the three flush sites in the same cut; Q7 `{ timeout: 20_000 }` kept with the re-measured comment; Q8 the `parkedReached` latch in the rig's spawnAgent mock is inside the disclosed vi.mock shape, SpyWorker untouched; Q9/Q12/Q13 are the sibling beads wb-nl8.2 / wb-nl8.3 / wb-nl8.4 (filed, not this cut; `{ retry: N }` rejected under never-weaken); Q10 this cut lands first; Q11 the attribution note is in this receipt (git history, not the comment); Q14 the bd title is byte-verbatim in this file's first line and in the INDEX line.

Environment of record: node v24.20.0, vitest/4.1.10 linux-x64 node-v24.20.0, nproc 64, host load1 23.56-54.01 across the recorded session (the harness records' extremes: 23.56 before `rf2b-red`, 54.01 before `m18-asyncdiag-b1`; a shared box with other work) and >= 31.24 throughout the acceptance loop (every counted run started at or above the 30 floor; recorded per run below). Files changed (`git diff --numstat` at receipt time; nothing committed by the implementer, nothing under src/):

```
1	0	docs/workbench/receipts/INDEX.md
4	0	docs/workbench/receipts/wb-nl8.md
93	4	test/helpers/furnace-hosted-retry-journeys.ts
44	2	test/workbench-furnace-hosted-retry-fault.test.ts
21	1	test/workbench-native-modules-failure.test.ts
58	7	test/workbench-sandbox-rpc-census.test.ts
```

### Facts of record (cited at 03e2cce)

- Case 1: `test/workbench-furnace-hosted-retry-fault.test.ts:187` `expect(observed.timeoutsAfterClose - observed.timeoutsBeforeClose).toBeGreaterThanOrEqual(1)` (member-18 row :180, no per-test timeout, the 5000 ms default), sibling :176 `toBeLessThanOrEqual(0)` (settled row :170). The measurement body is `measureSettledCloseTimers` in the FOURTH file `test/helpers/furnace-hosted-retry-journeys.ts:451` (:450 "ONE measurement body ... so the two cannot drift apart"): BEFORE instant sample :488, `await executor.close()` :489, AFTER instant sample :490, census `activeTimeouts` :432 = `process.getActiveResourcesInfo().filter(name => name === "Timeout").length`. The control timer is armed INSIDE close() (`src/workbench/hosts/furnace-hosted.ts:288` `this.closing.abort("host_closed")` -> helper `arm` :459-466), so AFTER always carries +1 from it; a 0 at :187 requires a different refed Timeout counted at BEFORE and gone by AFTER.
- Case 2: `test/workbench-native-modules-failure.test.ts:34` `{ timeout: 20_000 }` over a row whose first `loadWorkbenchNative()` cold-imports the loader's successful prefix (`src/workbench/native-modules.ts:53-55`: @furnace/sdk, ./claude-host.js, ./claude-transcript.js; ~3.4 s intrinsic, ~2.8 s of it the Vite-inlined pi-coding-agent graph reached through claude-host -> workflow/saved.ts) before the throw lands at step 4 (`:56` ./hosts/local-detached.js, whose :45 imports providers/hyperunix.js, the tripwire). The cap is bound at collection (`@vitest/runner/dist/chunk-artifact.js:1734`, applied :1787).
- Case 3: `test/workbench-sandbox-rpc-census.test.ts:574` `expect(rg.spawnAgent.mock.calls.map(([request]) => request.prompt)).toEqual([PARK])` (R2 :562; same sample at U2a :725). `park()` :140-152 sampled on a clock: one bare 40 ms `flush` (:95) after `runWorkflow`, then frames, one more flush, then `finish()` aborts; the park entry is produced only when the real worker thread boots and the host reaches `src/workflow/runtime.ts:1223` `await host.spawnAgent(...)`; after `finish` (:940-958, `settled = true` :942, `worker.terminate()` :957) a late agent frame is dropped at :1715 and the entry can never appear.
- Scheduling: `vitest.config.ts` sets no pool/maxWorkers/timeouts; run-mode default maxWorkers = `Math.max(numCpus - 1, 1)` = 63 forks here (`cli-api.BK8pd4xc.js:3765-3771`); `scripts.test` = `vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions` with `pretest` deleting the previous report.
- Field evidence (receipt wb-nl8.md:42-44 and the six /tmp/nl8-*.log runs): native-modules 1/6 red `Test timed out in 20000ms`; member 18 2/6 red `expected 0 to be greater than or equal to 1` (plus three consecutive hqa owner gates); rpc park 1/6 red `expected [] to deeply equal [ 'park' ]`.
- Fact-check corrections that changed this cut: C2 the throttle call is `chunk-artifact.js:2856` (not :2857); C3 the acceptance literal is `Test Files  303 passed (303)` (two spaces; 303 files at 03e2cce, five files landed after the nl8-era 298) and the criterion reads N from the report itself; C4 six assertions at :37-43 (not seven); C5 the receipt test's helper boundary pin `test/workbench-furnace-hosted-retry-fault-receipt.test.ts:708-715` (every non-`node:` import must be `import type`) — met: the helper gained no import; C6 the `await import` precedent is inside rows, the hook form is ruled by Q5; C8 the hook's static closure reaches no @hyperunix/sdk (14 src files; externals the Claude SDK, pi-coding-agent, typebox, typescript, zod).

### Root causes, as measured

1. Member 18 / settled row: an unattributed whole-process refed-Timeout census sampled at two instants. A refed transient alive at BEFORE and dead inside the close window masks the control timer's +1 (delta 0 at :187); one born inside the window reads +1 at :176. The masker is NAMED below (the runner's 100 ms task-update throttle), not inferred. The instrument fails, not the adapter: `controlTimerArmed` and the sensitivity layer are untouched by load.
2. Native-modules :34: one deadline covering two unrelated costs, the loader semantics the row proves and the cold import of the successful prefix, whose wall time is import work x oversubscription (every inlined module is an rpc.fetch to the one vitest main process while 63 forks compete). The cap cannot be re-sized at run time, so the only load-insensitive lever is relocating the import cost out of the measured window.
3. RPC park row: a sample taken on a clock (40 ms) for an event (the real worker reaching `host.spawnAgent`) whose arrival time is thread boot x oversubscription; once `finish()` aborted, the entry could never appear while every other R2 assertion still passed (refusals are synchronous host-side).

### What landed (test/ only; src/ untouched; roster journeys, `RETRY_FAULT_JOURNEY_RUNNERS`, the native-modules row :35-43 and the hyperunix tripwire byte-identical to 03e2cce, verified by region diff)

- `test/helpers/furnace-hosted-retry-journeys.ts`: `quiescentTimeouts(quietMs = 150, deadlineMs = 1500)` beside `activeTimeouts` (two consecutive counts that agree across 150 ms; a transient shorter than 150 ms cannot sit in two consecutive samples; the deadline only bounds the wait, the row's assertion stays the sole judge, the poll never throws); both censuses of `measureSettledCloseTimers` are now `await quiescentTimeouts()` with the control's `clearTimeout` still after the after-census; `control.armedAt = Date.now()` in `arm` and `controlTimerExpiredBeforeCensus = control.armed && Date.now() - control.armedAt >= SETTLED_CLOSE_GRACE_MS` on `SettledCloseTimersControl`; off-by-default churn knobs `SettledCloseChurn { ambientBeforeMs?, ambientAtCloseMs?, controlSettleDelayMs? }` with a MEASURED receipt `churn: { ambientArmed, controlSettleDelayedMs }` on `SettledCloseTimers` (the hold is re-slept until the clock agrees, so the receipt is never the knob echoed); two exported runners `settledCloseTimersSensitivityUnderChurn` (ambientBeforeMs 100 + controlSettleDelayMs 150) and `settledCloseTimersUnderChurn` (ambientAtCloseMs 100). Erasable TypeScript, no new import, no new raw mkdtemp/tmpdir/writeFileSync/cpSync/spawn(/execFile( text; loads under plain node from /tmp (`RETRY_FAULT_JOURNEY_RUNNERS` still the five roster names).
- `test/workbench-furnace-hosted-retry-fault.test.ts`: `{ timeout: 15_000 }` declared on :170 and :180 with an instrument comment (derived worst case 5000 grace + 5000 close bound + 2 x 1500 quiescence + attempts); the member-18 row GAINS `expect(observed.controlTimerExpiredBeforeCensus).toBe(false)`; two new rows R1/R2 (titles `wb-nl8.1 churn: ...`) through the two runners, asserting the full member-18 / settled tuples plus the churn receipts (`churn.ambientArmed` true, `churn.controlSettleDelayedMs >= 150`). :176 stays `toBeLessThanOrEqual(0)`, :187 stays `toBeGreaterThanOrEqual(1)`; no field renamed.
- `test/workbench-native-modules-failure.test.ts`: `beforeAll(async () => { await import("@furnace/sdk"); await import("../src/workbench/claude-host.js"); await import("../src/workbench/claude-transcript.js"); expect(isWorkbenchNativeLoaded()).toBe(false); }, 60_000)` (sequential, as importAll is); the row and `{ timeout: 20_000 }` unchanged; the instrument comment gains a dated paragraph with the re-measured figures (below) recording the hoist and that the cap is kept.
- `test/workbench-sandbox-rpc-census.test.ts`: `Rig.parkedReached` resolved by the rig's spawnAgent mock when `request.prompt === PARK` (before it awaits `parked`); `park(rg, script?)` replaces its first `flush()` with `Promise.race([parkedReached -> "parked", run -> "settled-early:<status>"])` and GAINS `expect(outcome).toBe("parked")` (a worker that dies before parking is named by its status word instead of hanging to the cap); `rig(grants, { providerDelayMs? })` (off by default) delays the granted provider host-side; row H2 beside H1 (`rig(["fixture:read"], { providerDelayMs: 150 })`, script `await node(REGISTERED, {}); return await agent(PARK)`, expects `{ sample: [PARK], status: "killed", provided: 1 }`); `repliesSettled(parked, callIds, deadlineMs = 2000)` polls `parked.replies()` at 5 ms before the EXISTING flush at the three sites (withCraftedFrames: the injected frames' callIds; hostSurface: sentinels + verbs + non-string methods, typeIds excluded on purpose; malformedAgentFrames: the one callId), strictly longer waits, the existing reads and assertions unchanged. `flush` stays (:812 and the quiet windows). `vi.mock("node:worker_threads")` SpyWorker untouched; no new raw tmpdir/mkdtemp text (scratch census rows :560 `{ mkdtemp: 1, tmpdir: 0 }` and :609 `{ mkdtemp: 0, tmpdir: 1 }` unchanged).

### Red of record and green of record, per case (verbatim; red taken BEFORE the cure on the same new rows)

Case 1 (R1/R2 rows against the INSTANT samples, i.e. the knobs and rows landed first, the sample definition unchanged; three runs each):

```
× wb-nl8.1 churn: a 100 ms refed ambient timer armed before the before-census and a parked control Attempt that settles 150 ms after its abort still read a delta >= 1 (member-18 tuple unchanged) 201ms
× wb-nl8.1 churn: a 100 ms refed ambient timer armed inside the close window still reads a delta <= 0 for three settled Attempts (settled tuple unchanged) 35ms
AssertionError: expected 0 to be greater than or equal to 1
AssertionError: expected 1 to be less than or equal to 0
Tests  2 failed | 11 passed (13)
× wb-nl8.1 churn: a 100 ms refed ambient timer armed before the before-census and a parked control Attempt that settles 150 ms after its abort still read a delta >= 1 (member-18 tuple unchanged) 198ms
× wb-nl8.1 churn: a 100 ms refed ambient timer armed inside the close window still reads a delta <= 0 for three settled Attempts (settled tuple unchanged) 35ms
AssertionError: expected 0 to be greater than or equal to 1
AssertionError: expected 1 to be less than or equal to 0
Tests  2 failed | 11 passed (13)
× wb-nl8.1 churn: a 100 ms refed ambient timer armed before the before-census and a parked control Attempt that settles 150 ms after its abort still read a delta >= 1 (member-18 tuple unchanged) 196ms
× wb-nl8.1 churn: a 100 ms refed ambient timer armed inside the close window still reads a delta <= 0 for three settled Attempts (settled tuple unchanged) 34ms
AssertionError: expected 0 to be greater than or equal to 1
AssertionError: expected 1 to be less than or equal to 0
Tests  2 failed | 11 passed (13)
```

Green (quiescent samples in place; three runs): Tests  13 passed (13) / Tests  13 passed (13) / Tests  13 passed (13); durations Duration  3.50s (transform 124ms, setup 31ms, import 277ms, tests 3.08s, environment 0ms) / Duration  3.46s (transform 101ms, setup 22ms, import 241ms, tests 3.08s, environment 0ms) / Duration  3.57s (transform 128ms, setup 29ms, import 312ms, tests 3.08s, environment 0ms). Row times in the first green run: wb-21k: executor.close() leaves no grace timer armed for Attempts that already settled (3 settled success Attempts, default-sized grace)  486ms; wb-19q member 18 (wb-21k F2): the dangling-timer measurement is sensitive: a timer armed by close()'s abort of a parked fourth Attempt raises the after-close count, so a count taken before close() cannot pass as clean  502ms; wb-nl8.1 churn: a 100 ms refed ambient timer armed before the before-census and a parked control Attempt that settles 150 ms after its abort still read a delta >= 1 (member-18 tuple unchanged)  647ms; wb-nl8.1 churn: a 100 ms refed ambient timer armed inside the close window still reads a delta <= 0 for three settled Attempts (settled tuple unchanged)  637ms.

Case 2 (two recorded reproductions through the harness; a kept in-suite row cannot be red-first on a runner-timeout shape without staying red):

- RF2-A, deterministic producer delay (HEAD's verbatim row + `vi.mock("@furnace/sdk", async (importOriginal) => { await new Promise((resolve) => setTimeout(resolve, 25_000)); return { ...(await importOriginal()) }; })`, one worker, no pin): red `→ Test timed out in 20000ms.`, row 20009 ms, `Test Files  1 failed (1)`. The hooked row under the SAME delay: green, row 55 ms, wall 29.1 s (the hook absorbed the 25 s inside its own 60 s budget).
- RF2-B, the load-shaped pin (24 copies, `taskset -c 0-1` + `--maxWorkers=24`, 12x oversubscription): HEAD's verbatim row red 24/24 (`Test Files  24 failed (24)`, every message `Test timed out in 20000ms.`, rows min 20005 / median 20012 / max 20051 ms, `Duration  22.32s (transform 122.52s, setup 2.19s, import 8.09s, tests 480.55s, environment 2ms)`); the hooked row under the identical pin green 24/24 (`Test Files  24 passed (24)`, rows min 127 / median 239 / max 511 ms (true median of the 24; the test file's instrument comment quotes 248 ms, the upper middle value of the same 24), `Duration  27.59s (transform 127.30s, setup 2.42s, import 14.98s, tests 589.92s, environment 2ms)` — the `tests` aggregate / 24 puts the hook at ~24.6 s per copy under the pin, 2.4x inside its 60 s budget). Unpinned hooked copy: row 54 ms. In the worktree, the hooked file alone (three runs, default reporter file line, hook included): test/workbench-native-modules-failure.test.ts (1 test) 3777ms, test/workbench-native-modules-failure.test.ts (1 test) 3735ms, test/workbench-native-modules-failure.test.ts (1 test) 3669ms.

Case 3 (H2 against the clock-ordered `park()`, i.e. the rig/park seams and the row landed first; three runs):

```
× H2 (wb-nl8.1 red-first): the park sample is event-ordered: a 150 ms host-side provider delay before agent('park') is still sampled as exactly [park] 57ms
AssertionError: expected { sample: [], status: 'killed', …(1) } to deeply equal { sample: [ 'park' ], …(2) }
Tests  1 failed | 24 passed (25)
× H2 (wb-nl8.1 red-first): the park sample is event-ordered: a 150 ms host-side provider delay before agent('park') is still sampled as exactly [park] 54ms
AssertionError: expected { sample: [], status: 'killed', …(1) } to deeply equal { sample: [ 'park' ], …(2) }
Tests  1 failed | 24 passed (25)
× H2 (wb-nl8.1 red-first): the park sample is event-ordered: a 150 ms host-side provider delay before agent('park') is still sampled as exactly [park] 54ms
AssertionError: expected { sample: [], status: 'killed', …(1) } to deeply equal { sample: [ 'park' ], …(2) }
Tests  1 failed | 24 passed (25)
```

Green (event-ordered `park()`, latch, `repliesSettled`; three runs): Tests  25 passed (25) / Tests  25 passed (25) / Tests  25 passed (25); durations Duration  6.16s (transform 2.81s, setup 33ms, import 4.15s, tests 1.81s, environment 0ms) / Duration  5.78s (transform 2.60s, setup 23ms, import 3.89s, tests 1.75s, environment 0ms) / Duration  5.80s (transform 2.64s, setup 26ms, import 3.94s, tests 1.72s, environment 0ms).

### The masker, named (design F4 open point closed)

The design named the vitest runner's task-update throttle (`node_modules/@vitest/runner/dist/chunk-artifact.js:2852` `pendingCall ??= setTimeout(() => call.bind(this)(...args), ms)`, `throttle(sendTasksUpdate, 100)` at :2856, never unref'd) as the only refed un-unref'd ambient found in the runner path, "not proven to be THE timer". Measured here under the 2-core/24-worker pin with HEAD's instrument (instant samples) over the FULL HEAD file in two instrumented harness variants, each with a ledger snapshot taken at every `process.getActiveResourcesInfo()` call (the instrument's censuses) and an `afterAll` DIAG line per copy: (a) a ledger over the global `setTimeout`/`clearTimeout` (3 batches, 72 copies, 7 member-18 reds) saw in EVERY red copy exactly one refed Timeout counted at the BEFORE census that no global `setTimeout` call had created — consistent with the runner holding its own timer references (`@vitest/utils` safe timers) — and the control timer alone at AFTER; (b) a ledger over `async_hooks.createHook` (every Timeout resource at init, however created, with its creating stack; 3 batches, 72 copies, 5 member-18 reds) NAMED it in every red copy: ttl 100, created at `chunk-artifact.js:2852:19` (`call <- updateTask`), aged 96-112 ms at the BEFORE census (due, not yet run under the pin), gone by the AFTER census, which counted exactly one timer, the control (ttl 5000, `AbortSignal.arm` at the helper's arm site). Of the 67 green copies, 62 counted 0 at that BEFORE census; the other 5 (`m18-asyncdiag-23`, `-08`, `-24`, `-12`, `-15`, all in batch 1) counted the same throttle timer, aged 63-94 ms, young enough to survive the close window into the AFTER census (which read 2: throttle + control), so their delta stayed 1 and the rows passed — masking needs the throttle to die inside the window, which it did only at ages 96-112 ms. The three async_hooks batches ran 22:29:24-22:29:47Z, inside acceptance run 1's window (22:28:31-22:30:08Z) with its K = 6 spinners live: extra load only, but the masker evidence and acceptance run 1 are not independent host conditions. The 48 single-row diagnostic copies (2 batches, the member-18 body alone) never masked: the throttle is armed by the PRECEDING row's task update, which is why the row reds only inside a file run and never alone. The quiescent window (150 ms > the 100 ms TTL) excludes this class by construction. Residual, named: a refed transient with TTL > 150 ms that dies inside the close window is not excluded; no such timer appeared in any instrumented copy, and the 240 post-fix pinned copies read 0 red. The mirror of that construction is named too: a refed timer with TTL < 150 ms, of any origin (a future product leak of that class included), is invisible to BOTH censuses, where the instant AFTER sample of the previous instrument could have counted one; the leak class these rows exist for lives 5000 ms (M1.4 below reds `expected 3 to be less than or equal to 0` across the quiet window).

### Pin batches (statistical, stated as such; `taskset -c 0-1` + `--maxWorkers=24`, 24 copies, one fork each)

- Member 18, pre-fix (HEAD test over HEAD helper, 23 copies + 1 diagnostic per batch): 4/69 member-18 rows red `expected 0 to be greater than or equal to 1` across 3 batches (plus the 12/144 instrumented copies above). Post-fix (the landed test over the landed helper): 0 red rows in 3120 rows across 10 batches; the four census rows ran min 410 / median 594 / max 670 ms under the pin (cap 15_000).
- RPC census, pre-fix (HEAD file): 80 rows red `expected [] to deeply equal [ 'park' ]` in 1152 rows across 2 batches (all 48 park-sample rows per batch are R2 + U2a). Post-fix: 0 red rows in 3000 rows across 5 batches; the three park-sample rows (R2, U2a, H2) ran min 389 / median 597 / max 1047 ms under the pin (cap 5000).
- Native modules: RF2-B above.

### Mutation checks (AGENTS.md:101; each: what was broken, the red, restored and sha-verified)

- M1.1 instant samples in place of `quiescentTimeouts()`: R1/R2 red with the field texts — this is the red of record above.
- M1.2 `arm` without its `setTimeout`/`armed = true`: member-18 row and R1 red `expected false to be true` (the `armed` tuple field), 2 failed | 11 passed.
- M1.3 after-census hoisted above `close()` WITH quiescence in place: member-18 row and R1 red `expected 0 to be greater than or equal to 1`.
- M1.4 `furnace-hosted.ts:425` `signal.removeEventListener("abort", armGrace)` removed (the wb-21k leak the settled row exists for): :176 and R2 red `expected 3 to be less than or equal to 0` (one leaked grace timer per settled Attempt, across the quiet window). The design's literal variant (M1.4b, remove the `clearTimeout` at :421) does NOT red :176: that timer belongs to the aborted control Attempt, so member 18 reads delta 2 and still passes (13 passed) — recorded as a correction to the design's M1.4.
- M1.5 `quietMs` 10: R1 red `expected -1 to be greater than or equal to 1`, R2 red `expected 1 to be less than or equal to 0` (the 100 ms transients bake into both samples).
- M2.1 no hook: RF2-A and RF2-B red above (HEAD's bytes). M2.2 the hook guard: flipping it to `toBe(true)` reds the hook `expected false to be true` (`Tests 1 skipped (1)`); a hook that additionally called `loadWorkbenchNative()` on THIS throwing path stays green (the loader rejects and stays unloaded), so the guard proves "nothing loaded through the loader" and would catch a successful load-through, not a failed one — recorded. M2.3 `loading = undefined` removed from `native-modules.ts:109`: the row stays GREEN (the cached rejection serves the same text), confirming the design's Q9 observation and contradicting its M2.3 prediction — the strengthening falsifier is wb-nl8.2. M2.4 `loaded` assigned in the failure branch: red `expected true to be false` at the row's `isWorkbenchNativeLoaded()` assertion.
- M3.1 `park()` back to `await flush()`: H2 red (`sample: []`). M3.2 `reached()` deleted: 13 park() consumers red `Test timed out in 5000ms.`, named rows. M3.3 `runtime.ts:1223` spawn call replaced by a local resolver: 13 rows red `expected 'settled-early:completed' to be 'parked'`. M3.4 a second spawn in the mock path: R2 and U2a red `expected [ 'park', 'park' ] to deeply equal [ 'park' ]`, H2 red `expected { sample: [ 'park', 'park' ], …(2) } ...` (count-sensitive).

### Acceptance: 10/10 full default-suite runs green under the literal floor (`npm run -s test` in the worktree, pretest included; floor load1 >= 30 at each start, met in every run; K = 6 detached `node -e 'for(;;){}'` spinners started before run 1 and stopped after run 10; the minimum load1 sampled inside any run was 31.24)

| run | utc start | load1 before / min inside / after | K | maxWorkers | (maxWorkers + K) / nproc | rc | Test Files | Tests | Duration | pass |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-17T22:28:31.356Z | 37.34 / 37.34 / 44.26 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  96.76s (transform 332.67s, setup 14.29s, import 1010.15s, tests 972.32s, environment 38ms)` | yes |
| 2 | 2026-10-17T22:30:08.754Z | 44.26 / 36.54 / 36.41 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  96.74s (transform 298.58s, setup 12.28s, import 965.12s, tests 917.38s, environment 38ms)` | yes |
| 3 | 2026-10-17T22:31:46.225Z | 36.41 / 36.41 / 38.17 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  105.31s (transform 382.56s, setup 14.09s, import 1159.89s, tests 1012.25s, environment 42ms)` | yes |
| 4 | 2026-10-17T22:33:32.207Z | 38.17 / 37.53 / 37.53 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  100.93s (transform 347.72s, setup 12.88s, import 1073.88s, tests 950.53s, environment 42ms)` | yes |
| 5 | 2026-10-17T22:35:14.083Z | 37.53 / 37.32 / 47.5 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  117.93s (transform 340.60s, setup 14.00s, import 1089.51s, tests 1003.64s, environment 39ms)` | yes |
| 6 | 2026-10-17T22:37:12.655Z | 47.5 / 40.81 / 40.81 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  102.67s (transform 424.29s, setup 14.26s, import 1289.99s, tests 1009.15s, environment 37ms)` | yes |
| 7 | 2026-10-17T22:38:55.998Z | 40.81 / 36.86 / 35.19 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  99.34s (transform 385.46s, setup 12.30s, import 1133.66s, tests 1006.87s, environment 53ms)` | yes |
| 8 | 2026-10-17T22:40:36.049Z | 35.19 / 32.05 / 31.24 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  96.81s (transform 303.76s, setup 12.23s, import 954.27s, tests 917.99s, environment 37ms)` | yes |
| 9 | 2026-10-17T22:42:13.494Z | 31.24 / 31.24 / 34.63 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  99.17s (transform 354.33s, setup 16.62s, import 1061.23s, tests 943.61s, environment 37ms)` | yes |
| 10 | 2026-10-17T22:43:53.396Z | 34.63 / 34.63 / 41.66 | 6 | 63 | 1.08 | 0 | `Test Files  303 passed (303)` | `Tests  11561 passed | 1 expected fail | 7 skipped (11569)` | `Duration  113.07s (transform 552.82s, setup 14.15s, import 1483.78s, tests 1096.66s, environment 39ms)` | yes |

Pass criterion, fail-closed: rc 0, a `.forge/vitest-report.json` written by the run (copied to /tmp/nl81-acc/report-N.json before the next pretest removed it), and the default reporter's `Test Files  N passed (N)` with N read from that report's own file count (303). Any red row, hook timeout, missing report or run started under the floor would have ended the sequence.

Budgets re-measured from the 10 acceptance reports (`assertionResults[].duration` by title; the hook from the default reporter's per-file line minus the row, since the JSON report's per-file times derive from the tests alone; median is the harness `budgets()` convention `sorted[Math.floor(n / 2)]`, the upper middle value for n = 10):

| row | cap ms | runs | min ms | median ms | max ms | headroom (cap / median) | median over 50% of cap |
|---|---|---|---|---|---|---|---|
| retry-fault :170 settled | 15000 | 10 | 488 | 494 | 509 | 30.4x | no |
| retry-fault :180 member 18 | 15000 | 10 | 506 | 512 | 520 | 29.3x | no |
| retry-fault R1 churn | 15000 | 10 | 656 | 664 | 678 | 22.6x | no |
| retry-fault R2 churn | 15000 | 10 | 642 | 653 | 678 | 23.0x | no |
| native-modules :34 row | 20000 | 10 | 46 | 71 | 98 | 280.8x | no |
| rpc-census H2 | 5000 | 10 | 198 | 213 | 234 | 23.4x | no |
| rpc-census R2 :562 | 5000 | 10 | 91 | 100 | 126 | 49.8x | no |
| rpc-census U2a | 5000 | 10 | 302 | 323 | 350 | 15.5x | no |
| native-modules hook (file line minus row) | 60000 | 10 | 8075 | 9689 | 15334 | 6.2x | no |


### Harness (home /tmp/nl81-harness, never committed; verbatim)

`/tmp/nl81-harness/harness.mjs` (the `budgets` renderer's rounding is the one edit made after the batches and the acceptance loop started; `prepare`, `replicate`, `run`, `spinners` and `acceptance` are byte-identical to what ran):

```js
#!/usr/bin/env node
// wb-nl8.1 contention harness. Lives in /tmp (never committed; quoted verbatim into docs/workbench/receipts/wb-nl8.1.md).
// Never runs forge or furnace. Every vitest run here uses a /tmp copy of the tree with every cache under /tmp, so nothing
// is written into the worktree or the shared node_modules/.vite; the acceptance loop alone runs `npm run -s test` in the
// worktree, exactly as the gate's test step does.
//   prepare <worktree>                       copy src/ test/ qa/ + configs to /tmp/nl81-harness/repo; symlink node_modules and dist
//   replicate <file> <case> <n>              n copies of one test file under test/harness/<case>-NN.test.ts (one fork each)
//   run --tag T --workers W [--cores C] [--filter F]   taskset -c 0-(C-1) + --maxWorkers=W (ALWAYS paired: taskset alone makes
//                                             vitest fall silently to 2 workers); appends one JSONL record to out/records.jsonl
//   spinners start K | spinners stop | spinners count   K detached `node -e 'for(;;){}'` load generators
//   acceptance --worktree W --runs N --floor 30         the bead's literal criterion, one JSONL record per run in /tmp/nl81-acc
//   budgets                                  min/median/max per re-measured row over the acceptance reports, against the caps
import { spawn, spawnSync } from "node:child_process";
import { appendFileSync, copyFileSync, cpSync, existsSync, mkdirSync, openSync, readdirSync, readFileSync, readlinkSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { cpus } from "node:os";
import { join, resolve } from "node:path";

const HOME = "/tmp/nl81-harness";
const REPO = join(HOME, "repo");
const OUT = join(HOME, "out");
const ACC = "/tmp/nl81-acc";
const PIDS = join(HOME, "spinners.pids");
const NPROC = cpus().length;
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !["CLAUDECODE", "AI_AGENT", "CLAUDE_CODE"].includes(key)));
const strip = (text) => text.replace(/\x1b\[[0-9;]*m/g, "");
const loadavg = () => readFileSync("/proc/loadavg", "utf8").trim().split(" ").slice(0, 3).map(Number);
const utc = () => new Date().toISOString();
const arg = (name, fallback) => { const at = process.argv.indexOf(`--${name}`); return at === -1 ? fallback : process.argv[at + 1]; };
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

// The rows whose budgets this cut re-measures, by title substring, with their declared caps (ms).
const NAMED_ROWS = [
  ["retry-fault :170 settled", "wb-21k: executor.close() leaves no grace timer armed", 15_000],
  ["retry-fault :180 member 18", "wb-19q member 18 (wb-21k F2)", 15_000],
  ["retry-fault R1 churn", "armed before the before-census", 15_000],
  ["retry-fault R2 churn", "armed inside the close window", 15_000],
  ["native-modules :34 row", "reports a failed load to every concurrent waiter", 20_000],
  ["rpc-census R2 :562", "R2 a crafted frame for an unregistered verb", 5000],
  ["rpc-census U2a", "U2a each malformed agent frame", 5000],
  ["rpc-census H2", "H2 (wb-nl8.1 red-first)", 5000],
];
const NATIVE_MODULES_FILE = "test/workbench-native-modules-failure.test.ts";

function prepare(worktree) {
  if (existsSync(REPO)) rmSync(REPO, { recursive: true, force: true });
  for (const dir of [REPO, OUT, ACC]) mkdirSync(dir, { recursive: true });
  for (const entry of ["src", "test", "qa", "vitest.config.ts", "package.json", "tsconfig.json", "tsconfig.test.json", "biome.json"]) cpSync(join(worktree, entry), join(REPO, entry), { recursive: true });
  symlinkSync(readlinkSync(join(worktree, "node_modules")), join(REPO, "node_modules"));
  symlinkSync(join(worktree, "dist"), join(REPO, "dist"));
  writeFileSync(join(REPO, "vitest.harness.config.ts"), [
    'import { defineConfig, mergeConfig } from "vitest/config";',
    'import base from "./vitest.config.ts";',
    "// Harness-only: the repo's test settings, with every cache under /tmp so nothing writes into the worktree or node_modules/.vite.",
    `export default mergeConfig(base, defineConfig({ cacheDir: "${HOME}/.vite", test: { cache: false } }));`,
    "",
  ].join("\n"));
  const head = spawnSync("git", ["-C", worktree, "rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
  console.log(JSON.stringify({ prepared: REPO, worktree, head, nproc: NPROC, node: process.version, vitest: strip(spawnSync(join(REPO, "node_modules/.bin/vitest"), ["--version"], { encoding: "utf8", cwd: REPO }).stdout).trim() }));
}

// Each copy is its own test file, so vitest gives it its own fork (isolate: true); imports are re-rooted one level deeper.
function replicate(source, name, count) {
  const dir = join(REPO, "test", "harness");
  mkdirSync(dir, { recursive: true });
  const text = readFileSync(source, "utf8").replaceAll('"../src/', '"../../src/').replaceAll('"../qa/', '"../../qa/').replaceAll('"./helpers/', '"../helpers/');
  for (let index = 1; index <= count; index++) writeFileSync(join(dir, `${name}-${String(index).padStart(2, "0")}.test.ts`), text);
  console.log(JSON.stringify({ replicated: name, copies: count, from: source }));
}

function parseReport(path) {
  const report = JSON.parse(readFileSync(path, "utf8"));
  const rows = {};
  const failures = [];
  for (const file of report.testResults) {
    const name = file.name.replace(`${REPO}/`, "");
    for (const row of file.assertionResults) {
      rows[`${name} > ${row.title}`] = { ms: row.duration ?? null, status: row.status };
      if (row.status === "failed") failures.push({ file: name, title: row.title, message: strip(row.failureMessages.join("\n")).split("\n")[0] });
    }
  }
  return { tests: report.numTotalTests, passed: report.numPassedTests, failed: report.numFailedTests, failures, rows };
}

const liveSpinners = () => (existsSync(PIDS) ? readFileSync(PIDS, "utf8").split("\n").filter(Boolean).map(Number) : []).filter((pid) => { try { process.kill(pid, 0); return true; } catch { return false; } });

function spinners(action, count) {
  if (action === "start") {
    const pids = [];
    for (let index = 0; index < count; index++) { const child = spawn("node", ["-e", "for(;;){}"], { detached: true, stdio: "ignore" }); child.unref(); pids.push(child.pid); }
    appendFileSync(PIDS, `${pids.join("\n")}\n`);
  }
  if (action === "stop") { for (const pid of liveSpinners()) process.kill(pid, "SIGKILL"); rmSync(PIDS, { force: true }); }
  console.log(JSON.stringify({ action, spinners: liveSpinners().length, loadavg: loadavg(), utc: utc() }));
}

function run() {
  const tag = arg("tag");
  const workers = Number(arg("workers"));
  const cores = Number(arg("cores", NPROC));
  const filter = arg("filter", "test/harness/");
  if (!tag || !Number.isInteger(workers)) throw new Error("run needs --tag and --workers");
  const report = join(OUT, `${tag}.json`);
  const vitest = ["node_modules/.bin/vitest", "run", "--config", "vitest.harness.config.ts", "--reporter=verbose", "--reporter=json", `--outputFile=${report}`, `--maxWorkers=${workers}`, filter];
  const command = cores < NPROC ? ["taskset", "-c", `0-${cores - 1}`, ...vitest] : vitest;
  const loadavgBefore = loadavg();
  const utcStart = utc();
  const started = Date.now();
  const result = spawnSync(command[0], command.slice(1), { cwd: REPO, env, encoding: "utf8", maxBuffer: 1 << 28 });
  writeFileSync(join(OUT, `${tag}.log`), `$ ${command.join(" ")}\n${result.stdout}${result.stderr}`);
  const parsed = existsSync(report) ? parseReport(report) : { failures: [{ file: "-", title: "-", message: "no report written" }], rows: {} };
  const record = { tag, utcStart, utcEnd: utc(), wallMs: Date.now() - started, rc: result.status, nproc: NPROC, cores, workers, K: liveSpinners().length, oversubscription: Number((workers / cores).toFixed(2)), loadavgBefore, loadavgAfter: loadavg(), command: command.join(" "), ...parsed };
  appendFileSync(join(OUT, "records.jsonl"), `${JSON.stringify(record)}\n`);
  const { rows, ...summary } = record;
  const ms = Object.values(rows).map((row) => row.ms).filter((value) => value !== null).sort((a, b) => a - b);
  console.log(JSON.stringify({ ...summary, failures: summary.failures.length, firstFailure: summary.failures[0] ?? null, rowMsMin: ms[0] ?? null, rowMsMax: ms[ms.length - 1] ?? null }));
}

function namedRows(report, logText) {
  const rows = {};
  for (const file of report.testResults) for (const row of file.assertionResults) for (const [name, needle] of NAMED_ROWS) if (row.title.includes(needle)) rows[name] = { ms: row.duration ?? null, status: row.status };
  // The hook is not in the JSON report (its per-file times derive from the tests alone); the default reporter's per-file line includes hooks.
  const fileLine = strip(logText).split("\n").map((line) => line.trim()).find((line) => /^✓ test\/workbench-native-modules-failure\.test\.ts \(1 test\) \d+ms$/.test(line));
  const fileMs = fileLine ? Number(/(\d+)ms$/.exec(fileLine)[1]) : null;
  const rowMs = rows["native-modules :34 row"]?.ms ?? null;
  rows["native-modules hook (file line minus row)"] = { ms: fileMs !== null && rowMs !== null ? Math.round(fileMs - rowMs) : null, status: fileLine ? "derived" : "no file line" };
  return rows;
}

// The bead's literal criterion: each counted run starts only once load1 >= floor (wait and re-read; never under the floor), runs
// `npm run -s test` in the worktree (pretest included), keeps .forge/vitest-report.json before the next pretest removes it,
// records load1 before / minimum inside / after, nproc, K (live spinners), maxWorkers (vitest's run-mode default nproc - 1)
// and the oversubscription ratio (maxWorkers + K) / nproc. Pass, fail-closed: rc 0, a report written, and the default
// reporter's `Test Files  N passed (N)` with N read from the report itself.
async function acceptance() {
  const worktree = resolve(arg("worktree"));
  const runs = Number(arg("runs", 10));
  const floor = Number(arg("floor", 30));
  const maxWorkers = NPROC - 1;
  mkdirSync(ACC, { recursive: true });
  for (let index = 1; index <= runs; index++) {
    let load = loadavg();
    while (load[0] < floor) { console.log(JSON.stringify({ run: index, waiting: true, load1: load[0], floor, utc: utc() })); await sleep(10_000); load = loadavg(); }
    const utcStart = utc();
    const started = Date.now();
    let load1Min = load[0];
    const sampler = setInterval(() => { load1Min = Math.min(load1Min, loadavg()[0]); }, 5000);
    const log = join(ACC, `run-${index}.log`);
    const rc = await new Promise((settle) => {
      const child = spawn("npm", ["run", "-s", "test"], { cwd: worktree, env, stdio: ["ignore", openSync(log, "w"), openSync(log, "a")] });
      child.on("exit", (code, signal) => settle(code ?? `signal:${signal}`));
    });
    clearInterval(sampler);
    const kept = join(ACC, `report-${index}.json`);
    const reportWritten = existsSync(join(worktree, ".forge", "vitest-report.json"));
    if (reportWritten) copyFileSync(join(worktree, ".forge", "vitest-report.json"), kept);
    const text = strip(readFileSync(log, "utf8"));
    const line = (label) => text.split("\n").map((entry) => entry.trim()).find((entry) => entry.startsWith(label)) ?? null;
    const report = reportWritten ? JSON.parse(readFileSync(kept, "utf8")) : null;
    const total = report ? report.testResults.length : null;
    const filesLine = line("Test Files");
    const K = liveSpinners().length;
    const record = {
      run: index, utcStart, utcEnd: utc(), wallMs: Date.now() - started, rc,
      load1Before: load[0], load1Min, load1After: loadavg()[0], floor, floorMet: load[0] >= floor,
      nproc: NPROC, K, maxWorkers, oversubscription: Number(((maxWorkers + K) / NPROC).toFixed(2)),
      filesLine, testsLine: line("Tests"), durationLine: line("Duration"), reportWritten, reportFiles: total,
      passed: rc === 0 && reportWritten && filesLine === `Test Files  ${total} passed (${total})`,
      rows: report ? namedRows(report, text) : null,
    };
    appendFileSync(join(ACC, "records.jsonl"), `${JSON.stringify(record)}\n`);
    console.log(JSON.stringify(record));
  }
}

function budgets() {
  const caps = Object.fromEntries(NAMED_ROWS.map(([name, , cap]) => [name, cap]));
  caps["native-modules hook (file line minus row)"] = 60_000;
  const samples = {};
  for (const name of readdirSync(ACC).filter((entry) => /^report-\d+\.json$/.test(entry)).sort((a, b) => Number(/\d+/.exec(a)[0]) - Number(/\d+/.exec(b)[0]))) {
    const log = join(ACC, name.replace("report-", "run-").replace(".json", ".log"));
    for (const [row, { ms }] of Object.entries(namedRows(JSON.parse(readFileSync(join(ACC, name), "utf8")), readFileSync(log, "utf8")))) if (ms !== null) (samples[row] ??= []).push(ms);
  }
  console.log("| row | cap ms | runs | min ms | median ms | max ms | headroom (cap / median) | median over 50% of cap |");
  console.log("|---|---|---|---|---|---|---|---|");
  for (const [row, values] of Object.entries(samples)) {
    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    console.log(`| ${row} | ${caps[row]} | ${sorted.length} | ${Math.round(sorted[0])} | ${Math.round(median)} | ${Math.round(sorted[sorted.length - 1])} | ${(caps[row] / median).toFixed(1)}x | ${median > caps[row] / 2 ? "FINDING" : "no"} |`);
  }
}

const [command, ...rest] = process.argv.slice(2);
if (command === "prepare") prepare(resolve(rest[0]));
else if (command === "replicate") replicate(resolve(rest[0]), rest[1], Number(rest[2]));
else if (command === "run") run();
else if (command === "spinners") spinners(rest[0], Number(rest[1] ?? 0));
else if (command === "acceptance") await acceptance();
else if (command === "budgets") budgets();
else throw new Error("usage: see the header comment");
```

`/tmp/nl81-harness/batches.sh`:

```bash
#!/bin/bash
# wb-nl8.1 pinned batches (sequential so the 2-core pin is never shared): 10 post-fix member-18 batches, 2 pre-fix + 5 post-fix rpc-census batches.
cd /tmp/nl81-harness || exit 1
for i in $(seq 1 10); do node harness.mjs run --tag m18-postfix-b$i --cores 2 --workers 24 --filter test/harness/m18-postfix- ; done
for i in 1 2; do node harness.mjs run --tag rpc-prefix-b$i --cores 2 --workers 24 --filter test/harness/rpc-prefix- ; done
for i in 1 2 3 4 5; do node harness.mjs run --tag rpc-postfix-b$i --cores 2 --workers 24 --filter test/harness/rpc-postfix- ; done
echo BATCHES-DONE
```

Harness variants (built by the implementer from `git show HEAD:<file>` or the edited file, then `replicate`d): `nm-verbatim` (HEAD row), `nm-delay` (HEAD row + the 25 s @furnace/sdk delay), `nm-hardened` (the landed file's code; when the copies were made its instrument comment still read the `RE_MEASURED_PLACEHOLDER` stand-in for the three re-measured lines now at test/workbench-native-modules-failure.test.ts:51-53 — the only textual difference from the landed bytes apart from the mechanical import re-rooting, so no behavioural claim moves), `nm-delay-hardened` (that copy plus the 25 s delay), `m18-prefix` (HEAD test over HEAD helper as `test/harness/journeys-head.ts`), `m18-postfix` (landed test over the landed helper), `m18-diag` (single member-18 row with a global-setTimeout ledger), `m18-fulldiag` / `m18-asyncdiag` (the full HEAD file with a global-setTimeout, then an async_hooks, ledger and `afterAll` DIAG line), `rpc-prefix` / `rpc-postfix` (HEAD / landed rpc census, `SRC` re-rooted one level deeper). Records (`/tmp/nl81-harness/out/records.jsonl`, 34 records). DEVIATION from design D4's "JSONL records quoted verbatim", named: `rows` (the per-row durations, 2,215,179 bytes in all) are elided here and `failures` is collapsed to message counts; every other field is value-equal to the file, record by record (the quoted lines are the renderer's re-serialisation, so byte-equality is not claimed). The per-row durations are summarised above; the full file persists only at that /tmp path, so the owner archives it with the landing or accepts the summary as the record:

```
{"tag":"rf2a-red","utcStart":"2026-10-17T22:16:39.275Z","utcEnd":"2026-10-17T22:16:59.757Z","wallMs":20478,"rc":1,"nproc":64,"cores":64,"workers":1,"K":0,"oversubscription":0.02,"loadavgBefore":[29.19,24.12,27.13],"loadavgAfter":[28.04,24.21,27.1],"command":"node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rf2a-red.json --maxWorkers=1 test/harness/nm-delay-01","tests":1,"passed":0,"failed":1,"failures":{"Error: STACK_TRACE_ERROR":1}}
{"tag":"rf2a-green","utcStart":"2026-10-17T22:16:59.792Z","utcEnd":"2026-10-17T22:17:28.905Z","wallMs":29109,"rc":0,"nproc":64,"cores":64,"workers":1,"K":0,"oversubscription":0.02,"loadavgBefore":[28.04,24.21,27.1],"loadavgAfter":[23.87,23.53,26.8],"command":"node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rf2a-green.json --maxWorkers=1 test/harness/nm-delay-hardened-01","tests":1,"passed":1,"failed":0,"failures":{}}
{"tag":"rf2b-red","utcStart":"2026-10-17T22:17:28.943Z","utcEnd":"2026-10-17T22:17:51.653Z","wallMs":22706,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[23.56,23.47,26.76],"loadavgAfter":[34.36,25.87,27.48],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rf2b-red.json --maxWorkers=24 test/harness/nm-verbatim-","tests":24,"passed":0,"failed":24,"failures":{"Error: STACK_TRACE_ERROR":24}}
{"tag":"rf2b-green","utcStart":"2026-10-17T22:17:51.689Z","utcEnd":"2026-10-17T22:18:19.716Z","wallMs":28023,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[34.36,25.87,27.48],"loadavgAfter":[35.33,26.99,27.8],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rf2b-green.json --maxWorkers=24 test/harness/nm-hardened-","tests":24,"passed":24,"failed":0,"failures":{}}
{"tag":"diag-alone","utcStart":"2026-10-17T22:19:35.521Z","utcEnd":"2026-10-17T22:19:36.291Z","wallMs":766,"rc":0,"nproc":64,"cores":64,"workers":1,"K":0,"oversubscription":0.02,"loadavgBefore":[50.4,33.33,29.93],"loadavgAfter":[50.4,33.33,29.93],"command":"node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/diag-alone.json --maxWorkers=1 test/harness/m18-prefix-diag","tests":1,"passed":1,"failed":0,"failures":{}}
{"tag":"nm-hardened-alone","utcStart":"2026-10-17T22:20:16.522Z","utcEnd":"2026-10-17T22:20:20.573Z","wallMs":4047,"rc":0,"nproc":64,"cores":64,"workers":1,"K":0,"oversubscription":0.02,"loadavgBefore":[36.37,31.72,29.52],"loadavgAfter":[34.9,31.49,29.46],"command":"node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/nm-hardened-alone.json --maxWorkers=1 test/harness/nm-hardened-01","tests":1,"passed":1,"failed":0,"failures":{}}
{"tag":"m18-prefix-b1","utcStart":"2026-10-17T22:20:20.614Z","utcEnd":"2026-10-17T22:20:27.956Z","wallMs":7337,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[34.9,31.49,29.46],"loadavgAfter":[35.55,31.68,29.53],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-prefix-b1.json --maxWorkers=24 test/harness/m18-prefix-","tests":254,"passed":252,"failed":2,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":2}}
{"tag":"m18-prefix-b2","utcStart":"2026-10-17T22:20:28.005Z","utcEnd":"2026-10-17T22:20:34.504Z","wallMs":6495,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[35.55,31.68,29.53],"loadavgAfter":[36.59,32.05,29.68],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-prefix-b2.json --maxWorkers=24 test/harness/m18-prefix-","tests":254,"passed":253,"failed":1,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":1}}
{"tag":"m18-prefix-b3","utcStart":"2026-10-17T22:20:34.551Z","utcEnd":"2026-10-17T22:20:41.079Z","wallMs":6524,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[36.59,32.05,29.68],"loadavgAfter":[36.3,32.06,29.69],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-prefix-b3.json --maxWorkers=24 test/harness/m18-prefix-","tests":254,"passed":253,"failed":1,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":1}}
{"tag":"m18-postfix-b1","utcStart":"2026-10-17T22:20:41.129Z","utcEnd":"2026-10-17T22:20:50.034Z","wallMs":8900,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[36.3,32.06,29.69],"loadavgAfter":[36.42,32.24,29.78],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b1.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b2","utcStart":"2026-10-17T22:20:50.070Z","utcEnd":"2026-10-17T22:20:58.825Z","wallMs":8751,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[36.42,32.24,29.78],"loadavgAfter":[36.38,32.3,29.81],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b2.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b3","utcStart":"2026-10-17T22:20:58.862Z","utcEnd":"2026-10-17T22:21:07.441Z","wallMs":8575,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[36.38,32.3,29.81],"loadavgAfter":[34.57,32.04,29.75],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b3.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b4","utcStart":"2026-10-17T22:21:07.479Z","utcEnd":"2026-10-17T22:21:16.186Z","wallMs":8703,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[34.57,32.04,29.75],"loadavgAfter":[33.72,31.96,29.75],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b4.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b5","utcStart":"2026-10-17T22:21:16.224Z","utcEnd":"2026-10-17T22:21:25.114Z","wallMs":8886,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[33.72,31.96,29.75],"loadavgAfter":[32.34,31.74,29.7],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b5.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b6","utcStart":"2026-10-17T22:21:25.150Z","utcEnd":"2026-10-17T22:21:34.643Z","wallMs":9488,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[32.34,31.74,29.7],"loadavgAfter":[32.27,31.75,29.73],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b6.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b7","utcStart":"2026-10-17T22:21:34.678Z","utcEnd":"2026-10-17T22:21:43.359Z","wallMs":8677,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[32.27,31.75,29.73],"loadavgAfter":[31.53,31.6,29.69],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b7.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b8","utcStart":"2026-10-17T22:21:43.393Z","utcEnd":"2026-10-17T22:21:52.159Z","wallMs":8762,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[31.53,31.6,29.69],"loadavgAfter":[31.62,31.64,29.73],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b8.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b9","utcStart":"2026-10-17T22:21:52.206Z","utcEnd":"2026-10-17T22:22:00.978Z","wallMs":8768,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[31.62,31.64,29.73],"loadavgAfter":[29.24,31.13,29.58],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b9.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"m18-postfix-b10","utcStart":"2026-10-17T22:22:01.017Z","utcEnd":"2026-10-17T22:22:09.720Z","wallMs":8699,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[29.24,31.13,29.58],"loadavgAfter":[30.41,31.32,29.66],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-postfix-b10.json --maxWorkers=24 test/harness/m18-postfix-","tests":312,"passed":312,"failed":0,"failures":{}}
{"tag":"rpc-prefix-b1","utcStart":"2026-10-17T22:22:09.759Z","utcEnd":"2026-10-17T22:22:47.238Z","wallMs":37475,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[30.41,31.32,29.66],"loadavgAfter":[35.63,32.43,30.09],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-prefix-b1.json --maxWorkers=24 test/harness/rpc-prefix-","tests":576,"passed":533,"failed":43,"failures":{"AssertionError: expected [] to deeply equal [ 'park' ]":43}}
{"tag":"rpc-prefix-b2","utcStart":"2026-10-17T22:22:47.275Z","utcEnd":"2026-10-17T22:23:24.617Z","wallMs":37338,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[35.63,32.43,30.09],"loadavgAfter":[37.54,33.17,30.42],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-prefix-b2.json --maxWorkers=24 test/harness/rpc-prefix-","tests":576,"passed":539,"failed":37,"failures":{"AssertionError: expected [] to deeply equal [ 'park' ]":37}}
{"tag":"rpc-postfix-b1","utcStart":"2026-10-17T22:23:24.655Z","utcEnd":"2026-10-17T22:24:03.150Z","wallMs":38491,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[35.57,32.83,30.32],"loadavgAfter":[38.57,33.77,30.72],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-postfix-b1.json --maxWorkers=24 test/harness/rpc-postfix-","tests":600,"passed":600,"failed":0,"failures":{}}
{"tag":"rpc-postfix-b2","utcStart":"2026-10-17T22:24:03.187Z","utcEnd":"2026-10-17T22:24:41.547Z","wallMs":38356,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[38.57,33.77,30.72],"loadavgAfter":[39.26,34.49,31.09],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-postfix-b2.json --maxWorkers=24 test/harness/rpc-postfix-","tests":600,"passed":600,"failed":0,"failures":{}}
{"tag":"rpc-postfix-b3","utcStart":"2026-10-17T22:24:41.584Z","utcEnd":"2026-10-17T22:25:19.323Z","wallMs":37735,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[39.26,34.49,31.09],"loadavgAfter":[41.42,35.39,31.51],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-postfix-b3.json --maxWorkers=24 test/harness/rpc-postfix-","tests":600,"passed":600,"failed":0,"failures":{}}
{"tag":"rpc-postfix-b4","utcStart":"2026-10-17T22:25:19.361Z","utcEnd":"2026-10-17T22:25:58.899Z","wallMs":39534,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[41.42,35.39,31.51],"loadavgAfter":[40.77,35.82,31.81],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-postfix-b4.json --maxWorkers=24 test/harness/rpc-postfix-","tests":600,"passed":600,"failed":0,"failures":{}}
{"tag":"rpc-postfix-b5","utcStart":"2026-10-17T22:25:58.937Z","utcEnd":"2026-10-17T22:26:38.595Z","wallMs":39653,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[40.77,35.82,31.81],"loadavgAfter":[46.14,37.82,32.65],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/rpc-postfix-b5.json --maxWorkers=24 test/harness/rpc-postfix-","tests":600,"passed":600,"failed":0,"failures":{}}
{"tag":"m18-diag-b1","utcStart":"2026-10-17T22:26:48.313Z","utcEnd":"2026-10-17T22:26:53.771Z","wallMs":5454,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[41.89,37.18,32.5],"loadavgAfter":[42.38,37.36,32.58],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-diag-b1.json --maxWorkers=24 test/harness/m18-diag-","tests":24,"passed":24,"failed":0,"failures":{}}
{"tag":"m18-diag-b2","utcStart":"2026-10-17T22:26:53.819Z","utcEnd":"2026-10-17T22:26:59.324Z","wallMs":5501,"rc":0,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[42.38,37.36,32.58],"loadavgAfter":[42.67,37.5,32.66],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-diag-b2.json --maxWorkers=24 test/harness/m18-diag-","tests":24,"passed":24,"failed":0,"failures":{}}
{"tag":"m18-fulldiag-b1","utcStart":"2026-10-17T22:27:42.182Z","utcEnd":"2026-10-17T22:27:49.685Z","wallMs":7499,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[28.08,34.49,31.87],"loadavgAfter":[32.96,35.4,32.18],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-fulldiag-b1.json --maxWorkers=24 test/harness/m18-fulldiag-","tests":264,"passed":262,"failed":2,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":2}}
{"tag":"m18-fulldiag-b2","utcStart":"2026-10-17T22:27:49.728Z","utcEnd":"2026-10-17T22:27:57.353Z","wallMs":7621,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[32.96,35.4,32.18],"loadavgAfter":[36.44,36.09,32.44],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-fulldiag-b2.json --maxWorkers=24 test/harness/m18-fulldiag-","tests":264,"passed":261,"failed":3,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":3}}
{"tag":"m18-fulldiag-b3","utcStart":"2026-10-17T22:27:57.394Z","utcEnd":"2026-10-17T22:28:04.829Z","wallMs":7431,"rc":1,"nproc":64,"cores":2,"workers":24,"K":0,"oversubscription":12,"loadavgBefore":[36.44,36.09,32.44],"loadavgAfter":[36.88,36.19,32.49],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-fulldiag-b3.json --maxWorkers=24 test/harness/m18-fulldiag-","tests":264,"passed":262,"failed":2,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":2}}
{"tag":"m18-asyncdiag-b1","utcStart":"2026-10-17T22:29:24.669Z","utcEnd":"2026-10-17T22:29:32.238Z","wallMs":7565,"rc":1,"nproc":64,"cores":2,"workers":24,"K":6,"oversubscription":12,"loadavgBefore":[54.01,42.75,35.14],"loadavgAfter":[52.74,42.84,35.26],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-asyncdiag-b1.json --maxWorkers=24 test/harness/m18-asyncdiag-","tests":264,"passed":263,"failed":1,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":1}}
{"tag":"m18-asyncdiag-b2","utcStart":"2026-10-17T22:29:32.276Z","utcEnd":"2026-10-17T22:29:39.838Z","wallMs":7558,"rc":1,"nproc":64,"cores":2,"workers":24,"K":6,"oversubscription":12,"loadavgBefore":[52.74,42.84,35.26],"loadavgAfter":[52.44,42.94,35.33],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-asyncdiag-b2.json --maxWorkers=24 test/harness/m18-asyncdiag-","tests":264,"passed":262,"failed":2,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":2}}
{"tag":"m18-asyncdiag-b3","utcStart":"2026-10-17T22:29:39.878Z","utcEnd":"2026-10-17T22:29:47.510Z","wallMs":7628,"rc":1,"nproc":64,"cores":2,"workers":24,"K":6,"oversubscription":12,"loadavgBefore":[52.44,42.94,35.33],"loadavgAfter":[52.15,43.18,35.49],"command":"taskset -c 0-1 node_modules/.bin/vitest run --config vitest.harness.config.ts --reporter=verbose --reporter=json --outputFile=/tmp/nl81-harness/out/m18-asyncdiag-b3.json --maxWorkers=24 test/harness/m18-asyncdiag-","tests":264,"passed":262,"failed":2,"failures":{"AssertionError: expected 0 to be greater than or equal to 1":2}}
```

Acceptance records (`/tmp/nl81-acc/records.jsonl`, verbatim, `rows` included so the budgets table reproduces from this file alone):

```
{"run":1,"utcStart":"2026-10-17T22:28:31.356Z","utcEnd":"2026-10-17T22:30:08.737Z","wallMs":97376,"rc":0,"load1Before":37.34,"load1Min":37.34,"load1After":44.26,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  96.76s (transform 332.67s, setup 14.29s, import 1010.15s, tests 972.32s, environment 38ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":492.0457839999999,"status":"passed"},"retry-fault :180 member 18":{"ms":508.2991109999998,"status":"passed"},"retry-fault R1 churn":{"ms":671.5153700000001,"status":"passed"},"retry-fault R2 churn":{"ms":643.6079089999994,"status":"passed"},"native-modules :34 row":{"ms":54.774335000000065,"status":"passed"},"rpc-census H2":{"ms":204.15040299999964,"status":"passed"},"rpc-census R2 :562":{"ms":100.3802539999997,"status":"passed"},"rpc-census U2a":{"ms":301.8635459999987,"status":"passed"},"native-modules hook (file line minus row)":{"ms":9636,"status":"derived"}}}
{"run":2,"utcStart":"2026-10-17T22:30:08.754Z","utcEnd":"2026-10-17T22:31:46.216Z","wallMs":97462,"rc":0,"load1Before":44.26,"load1Min":36.54,"load1After":36.41,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  96.74s (transform 298.58s, setup 12.28s, import 965.12s, tests 917.38s, environment 38ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":502.9929450000002,"status":"passed"},"retry-fault :180 member 18":{"ms":510.537229,"status":"passed"},"retry-fault R1 churn":{"ms":659.419508,"status":"passed"},"retry-fault R2 churn":{"ms":642.3348860000001,"status":"passed"},"native-modules :34 row":{"ms":64.18509399999857,"status":"passed"},"rpc-census H2":{"ms":213.27650700000004,"status":"passed"},"rpc-census R2 :562":{"ms":109.18446399999993,"status":"passed"},"rpc-census U2a":{"ms":328.4321719999998,"status":"passed"},"native-modules hook (file line minus row)":{"ms":8075,"status":"derived"}}}
{"run":3,"utcStart":"2026-10-17T22:31:46.225Z","utcEnd":"2026-10-17T22:33:32.191Z","wallMs":105966,"rc":0,"load1Before":36.41,"load1Min":36.41,"load1After":38.17,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  105.31s (transform 382.56s, setup 14.09s, import 1159.89s, tests 1012.25s, environment 42ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":488.08986400000003,"status":"passed"},"retry-fault :180 member 18":{"ms":511.9379180000001,"status":"passed"},"retry-fault R1 churn":{"ms":664.0995519999997,"status":"passed"},"retry-fault R2 churn":{"ms":678.3793599999999,"status":"passed"},"native-modules :34 row":{"ms":98.42006600000059,"status":"passed"},"rpc-census H2":{"ms":210.7493999999988,"status":"passed"},"rpc-census R2 :562":{"ms":125.95435899999939,"status":"passed"},"rpc-census U2a":{"ms":327.27180699999917,"status":"passed"},"native-modules hook (file line minus row)":{"ms":12145,"status":"derived"}}}
{"run":4,"utcStart":"2026-10-17T22:33:32.207Z","utcEnd":"2026-10-17T22:35:14.078Z","wallMs":101871,"rc":0,"load1Before":38.17,"load1Min":37.53,"load1After":37.53,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  100.93s (transform 347.72s, setup 12.88s, import 1073.88s, tests 950.53s, environment 42ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":499.137661,"status":"passed"},"retry-fault :180 member 18":{"ms":516.412667,"status":"passed"},"retry-fault R1 churn":{"ms":659.582249,"status":"passed"},"retry-fault R2 churn":{"ms":649.1476499999999,"status":"passed"},"native-modules :34 row":{"ms":63.43205599999965,"status":"passed"},"rpc-census H2":{"ms":208.81491499999993,"status":"passed"},"rpc-census R2 :562":{"ms":91.120363,"status":"passed"},"rpc-census U2a":{"ms":314.9707790000002,"status":"passed"},"native-modules hook (file line minus row)":{"ms":9154,"status":"derived"}}}
{"run":5,"utcStart":"2026-10-17T22:35:14.083Z","utcEnd":"2026-10-17T22:37:12.633Z","wallMs":118550,"rc":0,"load1Before":37.53,"load1Min":37.32,"load1After":47.5,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  117.93s (transform 340.60s, setup 14.00s, import 1089.51s, tests 1003.64s, environment 39ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":488.36245499999995,"status":"passed"},"retry-fault :180 member 18":{"ms":505.8714170000003,"status":"passed"},"retry-fault R1 churn":{"ms":667.0459199999996,"status":"passed"},"retry-fault R2 churn":{"ms":642.816092,"status":"passed"},"native-modules :34 row":{"ms":56.94128600000113,"status":"passed"},"rpc-census H2":{"ms":198.25441899999987,"status":"passed"},"rpc-census R2 :562":{"ms":102.01042599999982,"status":"passed"},"rpc-census U2a":{"ms":349.5578889999997,"status":"passed"},"native-modules hook (file line minus row)":{"ms":8324,"status":"derived"}}}
{"run":6,"utcStart":"2026-10-17T22:37:12.655Z","utcEnd":"2026-10-17T22:38:55.992Z","wallMs":103337,"rc":0,"load1Before":47.5,"load1Min":40.81,"load1After":40.81,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  102.67s (transform 424.29s, setup 14.26s, import 1289.99s, tests 1009.15s, environment 37ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":508.9048819999998,"status":"passed"},"retry-fault :180 member 18":{"ms":508.57028500000024,"status":"passed"},"retry-fault R1 churn":{"ms":663.7868170000002,"status":"passed"},"retry-fault R2 churn":{"ms":647.8743010000003,"status":"passed"},"native-modules :34 row":{"ms":93.45585699999901,"status":"passed"},"rpc-census H2":{"ms":222.23944500000016,"status":"passed"},"rpc-census R2 :562":{"ms":104.16526200000044,"status":"passed"},"rpc-census U2a":{"ms":317.938572,"status":"passed"},"native-modules hook (file line minus row)":{"ms":12043,"status":"derived"}}}
{"run":7,"utcStart":"2026-10-17T22:38:55.998Z","utcEnd":"2026-10-17T22:40:36.033Z","wallMs":100035,"rc":0,"load1Before":40.81,"load1Min":36.86,"load1After":35.19,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  99.34s (transform 385.46s, setup 12.30s, import 1133.66s, tests 1006.87s, environment 53ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":493.9257829999999,"status":"passed"},"retry-fault :180 member 18":{"ms":520.021634,"status":"passed"},"retry-fault R1 churn":{"ms":676.4231250000003,"status":"passed"},"retry-fault R2 churn":{"ms":655.620062,"status":"passed"},"native-modules :34 row":{"ms":96.36279300000024,"status":"passed"},"rpc-census H2":{"ms":225.86707000000024,"status":"passed"},"rpc-census R2 :562":{"ms":100.25892600000043,"status":"passed"},"rpc-census U2a":{"ms":307.4797949999993,"status":"passed"},"native-modules hook (file line minus row)":{"ms":11197,"status":"derived"}}}
{"run":8,"utcStart":"2026-10-17T22:40:36.049Z","utcEnd":"2026-10-17T22:42:13.489Z","wallMs":97440,"rc":0,"load1Before":35.19,"load1Min":32.05,"load1After":31.24,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  96.81s (transform 303.76s, setup 12.23s, import 954.27s, tests 917.99s, environment 37ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":491.12872300000026,"status":"passed"},"retry-fault :180 member 18":{"ms":512.7618579999998,"status":"passed"},"retry-fault R1 churn":{"ms":660.3329710000003,"status":"passed"},"retry-fault R2 churn":{"ms":656.1856349999998,"status":"passed"},"native-modules :34 row":{"ms":76.55048399999941,"status":"passed"},"rpc-census H2":{"ms":215.91081799999984,"status":"passed"},"rpc-census R2 :562":{"ms":92.99178200000006,"status":"passed"},"rpc-census U2a":{"ms":336.130854,"status":"passed"},"native-modules hook (file line minus row)":{"ms":8205,"status":"derived"}}}
{"run":9,"utcStart":"2026-10-17T22:42:13.494Z","utcEnd":"2026-10-17T22:43:53.383Z","wallMs":99889,"rc":0,"load1Before":31.24,"load1Min":31.24,"load1After":34.63,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  99.17s (transform 354.33s, setup 16.62s, import 1061.23s, tests 943.61s, environment 37ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":488.4606100000001,"status":"passed"},"retry-fault :180 member 18":{"ms":512.3282200000003,"status":"passed"},"retry-fault R1 churn":{"ms":656.4439439999996,"status":"passed"},"retry-fault R2 churn":{"ms":659.353153,"status":"passed"},"native-modules :34 row":{"ms":46.420028999998976,"status":"passed"},"rpc-census H2":{"ms":208.11632199999985,"status":"passed"},"rpc-census R2 :562":{"ms":92.54728900000009,"status":"passed"},"rpc-census U2a":{"ms":322.98789599999964,"status":"passed"},"native-modules hook (file line minus row)":{"ms":9689,"status":"derived"}}}
{"run":10,"utcStart":"2026-10-17T22:43:53.396Z","utcEnd":"2026-10-17T22:45:47.386Z","wallMs":113990,"rc":0,"load1Before":34.63,"load1Min":34.63,"load1After":41.66,"floor":30,"floorMet":true,"nproc":64,"K":6,"maxWorkers":63,"oversubscription":1.08,"filesLine":"Test Files  303 passed (303)","testsLine":"Tests  11561 passed | 1 expected fail | 7 skipped (11569)","durationLine":"Duration  113.07s (transform 552.82s, setup 14.15s, import 1483.78s, tests 1096.66s, environment 39ms)","reportWritten":true,"reportFiles":303,"passed":true,"rows":{"retry-fault :170 settled":{"ms":501.913505,"status":"passed"},"retry-fault :180 member 18":{"ms":514.7341160000001,"status":"passed"},"retry-fault R1 churn":{"ms":678.0916310000002,"status":"passed"},"retry-fault R2 churn":{"ms":652.8177889999997,"status":"passed"},"native-modules :34 row":{"ms":71.2155789999997,"status":"passed"},"rpc-census H2":{"ms":233.63465299999916,"status":"passed"},"rpc-census R2 :562":{"ms":93.74526499999956,"status":"passed"},"rpc-census U2a":{"ms":303.44110999999975,"status":"passed"},"native-modules hook (file line minus row)":{"ms":15334,"status":"derived"}}}
```

### Final checks on the final tree

- `biome check src/ test/`: rc=0.
- `tsc --noEmit`: rc=0.
- `tsc --noEmit -p tsconfig.test.json`: 4 rows, the pre-existing four only (test/workbench-cap-saturation-receipt.test.ts(140,13), test/workbench-forge-operation-observer.test.ts(9,15), test/workbench-forge-operation-observer.test.ts(266,164), test/workbench-forge-operation-observer.test.ts(269,242)); none added.
- Full default suite (`npm run -s test`, the gate's test step, rc 0 both times) twice on these code bytes. The implementer's run at 22:46:12Z finished before this file's last implementer write (its receipts-shape rows judged the pre-correction text; INDEX.md and wb-nl8.md predate it): Test Files  303 passed (303) | Tests  11561 passed | 1 expected fail | 7 skipped (11569) | Duration  92.21s (transform 247.14s, setup 13.41s, import 793.54s, tests 875.77s, environment 35ms) | JSON report written to /workplace/jehallad/pi-gates/owner-nl81/.forge/vitest-report.json. The fixer's run at 2026-10-17T23:19:23Z (load1 12.10 before / 20.97 after, no spinners — below the acceptance floor by design: it re-verifies the final tree and is not an eleventh acceptance run) came after every correction in this file except this bullet's own figures, which are the only text written after it (the receipts-shape pin judges line 1 and INDEX.md, both untouched by the paste; it was re-run on the final bytes afterwards and is recorded in the fixer's report): Test Files  303 passed (303) | Tests  11561 passed | 1 expected fail | 7 skipped (11569) | Duration  93.27s (transform 250.76s, setup 10.38s, import 881.87s, tests 852.23s, environment 37ms) | JSON report written to /workplace/jehallad/pi-gates/owner-nl81/.forge/vitest-report.json.

### Pins and constraints verified (P3-P10)

- Scratch census (`test/workbench-scratch-census.test.ts`): :560 `{ mkdtemp: 1, tmpdir: 0 }` and :609 `{ mkdtemp: 0, tmpdir: 1 }` unchanged; the retry-fault and native-modules files stay unlisted (G3); NAMED_CENSUS and `members: 18` unchanged — the edits add no mkdtemp/tmpdir text (the acceptance runs exercise the census).
- Receipt test (`test/workbench-furnace-hosted-retry-fault-receipt.test.ts`): :680-693 text pins hold (manifest/provenance paths, `createClient`, no writeFileSync/cpSync/doctor/spawn(/execFile(/`new Furnace(`), :685 runner import list unchanged, :708-715 erasable-TS and type-only-import pins hold (no import added).
- `qa/workbench/furnace-hosted-retry-fault.mjs:106` loads the edited helper under plain node (`node --input-type=module -e "await import(...)"` from /tmp: 16 exports, the five roster runners); the FIXTURE tier (forge.toml:36-38) is the owner's to re-run at landing; this cut ran no forge or furnace verb.
- No forge.toml, package.json, vitest.config.ts or census-helper edit; `--expect.requireAssertions` satisfied by every new row and the hook; no `any`; `flush` still used; no raw bidi text added.

### Fourth-file exception (Q1), attribution (Q11), non-claims and siblings

- Q1 as ruled: the member-18 body lives in the helper (:451), module-private seams (`harness`, `beginAttempt`, `withScratch`, `eventually`, `sleep`) made a test-file-only cure impossible without a new raw mkdtemp site; the helper edit is confined to the measurement section (:430 onward) and the two interfaces; everything above the measurement section is byte-identical.
- Q11 attribution note (append-only; wb-nl8.md:42 is not rewritten): the sentence "The file's own instrument comment records this same parallel-load mode cured once by raising the timeout to 20 s in `504e975`" attributes the sha to the comment; the comment at `test/workbench-native-modules-failure.test.ts:28-33` cites trunks 5516365 and 7346457 and never names a sha — `504e975` is the commit that INTRODUCED that comment and the 20 s cap (git history: `test(native-modules): declare the cax.10 suite's measured timeout (one-liner batch member)`, 2026-10-16).
- Non-claims: the acceptance table is a record of these 10 runs under the recorded load, not a stability guarantee for other hosts or loads; the pin batches are statistical and stated as such; the hook moves the prefix's import bound from the row's 20 s to its own 60 s (the success-path sibling still cold-loads everything at 60 s, so cold-import coverage is not lost); M2.2 records what the hook guard can and cannot see.
- Owner-owed at landing (the do-not-commit order leaves them open): the FIXTURE tier re-run named above; the commit sha — this receipt's heading and wb-nl8.md:50 read `owner worktree cut on trunk 03e2cce` where design D6 step 5 reads `realised by wb-nl8.1 (<commit>, 2026-10-XX)`, so the owner fills the landed sha (both entries are still uncommitted) or accepts the trunk reference; the full harness records file (D4 deviation above) archived with the landing or accepted as summarised.
- Siblings filed by the owner, not this cut: wb-nl8.2 (the :42 falsifier that distinguishes a fresh retry from the cached rejection; confirmed needed by M2.3), wb-nl8.3 (lazy/local `getAgentDir` so saved.ts/memory.ts stop importing the 21 MB pi-coding-agent entry in 158 test files), wb-nl8.4 (census pin forbidding silent vitest retry). wb-19q optional member 7 (exact-content pin of the rpc census file) re-pins against the landed bytes (Q10).
