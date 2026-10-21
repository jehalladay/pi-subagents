# vitest 4.1.10's JSON report renders every timeout red as `Error: STACK_TRACE_ERROR` with no `Test timed out in` text — reproduced with a 50 ms probe and recorded in 10 of 43 kept gate summaries — so a marker reader must pair `--reporter=default --reporter=json` and read the default reporter's text, as `scripts.test` already does

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-21
**`pi-subagents` revision:** `origin/workbench/implementation-program` at `eaa5a46` (commit 2026-10-21T08:00:34Z); at the adversarial re-read the fetched ref had moved 34 commits to `eb4bfed` (2026-10-21T08:39:04Z) with none of the paths cited below changed; local clone HEAD `a67bc36`, 1,613 behind `eaa5a46`, porcelain 0 — all rig source read at `eaa5a46` with `git show`
**`vitest` revision:** 4.1.10 (`@vitest/runner` 4.1.10; `package-lock.json` at `eaa5a46` pins both; vite 8.2.1); node v24.20.0. The two vitest source lines quoted below come from the installed `dist` files in the rig clone, not from vitest's TypeScript or its upstream HEAD
**`forge` revision:** UNVERIFIED for the gates cited — 0 of the 125 kept gate-record JSON files under `/tmp/fw-gate-wb-*.json` carry a `forge_revision` field; the host's PATH `forge --version` at read time prints `forge 0.2.1 (rev d29a7df76185, built 2026-10-20)`, the install, not the gates' runs
**Method:** wrote a one-test file that sleeps 400 ms under a 50 ms budget into a throwaway `/tmp` tree holding the ref's configs and a symlinked 4.1.10 install; ran it twice (`--reporter=json` alone; `--reporter=default --reporter=json`), compared `failureMessages[0]` with the default reporter's stderr; read `@vitest/runner/dist/chunk-artifact.js:2404-2411` and `vitest/dist/chunks/index.UpGiHP7g.js:3573`; grepped the 43 kept gate summaries and the 1,056 in-window ledger rows for `STACK_TRACE_ERROR`; a second pass of the same seat re-ran the probe in a fresh tree and re-read every quoted line before filing
**Scope:** a test-infrastructure note for anyone in this repo who classifies reds from `.forge/vitest-report.json` (gate consumers, the census tier's neighbours, future tooling); the defect itself sits in vitest, not in the rig
**Prior art:** none at the fetched ref — `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/ | grep -iE 'reporter|json|stack|marker'` lists only the 2026-10-20 5000 ms file (its slug carries `marker`; its body says nothing about the JSON report); `git grep -li 'STACK_TRACE_ERROR' origin/workbench/implementation-program -- new-feedback/` returns nothing, as do the body greps for `failureMessages`, `reporter=json` and `makeTimeoutError`; the bead store at `eaa5a46` carries the string only inside gate notes on 7 of 519 beads (wb-973.5, wb-cvjm, wb-6hb.9, wb-h8f.9, wb-0kg.11, wb-4ap.18, wb-4ap.10), none titled about it

## Summary, with numbers

At vitest 4.1.10 a test that exceeds its budget gets an `Error` whose `message` reads `Test timed out in <n>ms.` but whose `stack` still begins `Error: STACK_TRACE_ERROR`, and the JSON reporter writes `e.stack || e.message` into `failureMessages`. So the JSON report carries no timeout marker at all: 0 occurrences of `timed out` anywhere in the json-alone run of a probe that timed out (reproduced twice, in two throwaway trees), and `Error: STACK_TRACE_ERROR` as the first line of every timeout red in 10 of 43 kept gate summaries and 9 of 1,056 in-window ledger rows. The marker lives only in the default reporter's text (`Error: Test timed out in 50ms.` on stderr in the paired run, with identical JSON content). Every gate seat that got it right read the default-reporter output or the forge operation log; a reader that classifies from the JSON alone finds 0 markers and would mis-grade every timing red as an unclassified failure. The rig's `scripts.test` already pairs both reporters and `test/helpers/census-reporter.ts` serialises `error.message`, so the two paths the gate depends on stay safe today; the ask comes to one doc line and a rule for future readers, plus (upstream, outside this repo) a one-line argument-order fix in vitest.

## Finding 1 — json-alone loses the marker; default+json keeps it only in the text — **CONFIRMED**

Probe file (`test/zz-fw-feedback-timeout-probe.test.ts`, removed afterwards):
```ts
import { expect, it } from "vitest";
it("fw-feedback probe: sleeps 400 ms under a 50 ms budget", async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  expect(true).toBe(true);
}, 50);
```
```
$ node node_modules/vitest/vitest.mjs run test/zz-fw-feedback-timeout-probe.test.ts --reporter=json --outputFile=out/c1.json
rc=1
stdout lines mentioning 'timed out': 0      stderr lines mentioning 'timed out': 0      out/c1.json: 0
status: failed
failureMessages[0] line 1: Error: STACK_TRACE_ERROR
contains "timed out": False
testResults[0].message: ''

$ node node_modules/vitest/vitest.mjs run test/zz-fw-feedback-timeout-probe.test.ts --reporter=default --reporter=json --outputFile=out/c2.json
rc=1
stderr (ANSI stripped):
 FAIL  test/zz-fw-feedback-timeout-probe.test.ts > fw-feedback probe: sleeps 400 ms under a 50 ms budget
Error: Test timed out in 50ms.
failureMessages[0] line 1: Error: STACK_TRACE_ERROR
contains "timed out": False
```
Pairing the reporters changes nothing inside the JSON; it adds the text channel that carries the marker. The file-level `testResults[0].message` field reads as the empty string in both runs, so it carries no marker either.

## Finding 2 — the mechanism at 4.1.10 — **CONFIRMED** at the installed dist; the reading of intent **PLAUSIBLE**

`node_modules/@vitest/runner/dist/chunk-artifact.js:2404-2411`:
```js
function makeTimeoutError(isHook, timeout, stackTraceError) {
	const message = `${isHook ? "Hook" : "Test"} timed out in ${timeout}ms.\nIf this is a long-running ${isHook ? "hook" : "test"}, pass a timeout value as the last argument or configure it globally with "${isHook ? "hookTimeout" : "testTimeout"}".`;
	const error = new Error(message);
	if (stackTraceError?.stack) {
		error.stack = stackTraceError.stack.replace(error.message, stackTraceError.message);
	}
	return error;
}
```
`stackTraceError` gets created as `new Error("STACK_TRACE_ERROR")` at registration time (`:670`, `:697`, `:719`, `:752`, `:1784` and more in the same file). Its `.stack` starts `Error: STACK_TRACE_ERROR` and never contains the timeout message, so `.replace(error.message, ...)` finds nothing: the new error's `stack` keeps the placeholder header while its `message` carries the marker. The arguments look swapped — `replace(stackTraceError.message, error.message)` would substitute the marker into the carried stack — but that reads as my inference of intent, not a verified upstream statement.

`node_modules/vitest/dist/chunks/index.UpGiHP7g.js:3573` (the JSON reporter):
```js
					failureMessages: t.result?.errors?.map((e) => e.stack || e.message) || [],
```
`e.stack` wins whenever present, so the JSON gets the placeholder. The default reporter prints `message` separately, which keeps the marker on the text channel. A gate BIND seat read the same lines independently (outbox row 622, 2026-10-20T23:36:45Z, wb-4ap.18: "G-F3: vitest 4.1.10 makeTimeoutError stack.replace no-op -> JSON failureMessages read 'Error: STACK_TRACE_ERROR' without the 'Test timed out in' marker; the marker lives in the forge operation log / envelope diagnostic only (BIND re-read source :2404-2410 and the run-1 report)").

## Finding 3 — the field record: 10 of 43 kept summaries, 9 of 1,056 ledger rows, every gate read the text — **CONFIRMED**

`/tmp/fw-gate-wb-hkq3.summary.txt:143`:

> B-F2 INFO CONFIRMED (instrument note, the 4ap.19 B-F1 class): in the run-1 vitest JSON report (sha256 6bfadeaf) the failureMessages of all three test reds read 'Error: STACK_TRACE_ERROR' with no marker text, and the serial-leg JSONs and the OOB census JSON read the same way. The vitest markers appear only in the default-reporter output: test-step-output.txt :1093 'Error: Hook timed out in 10000ms.' (strict-agent-files-wiring:114, pointing at afterEach :79), :1106 and :1119 'Error: Test timed out in 5000ms.' (inspector :58 and :926). The GATE read the default-reporter text, which is the correct source for R609 clause (a). A marker scan over the JSON report alone would miss the clause-(a) evidence.

`/tmp/fw-gate-wb-cvjm.summary.txt:160`:

> F-B1 INFO CONFIRMED (marker source): in both vitest JSON reports (.d/run1.vitest-report.json, .d/run2.vitest-report.json) the four timeout rows' failureMessages begin 'Error: STACK_TRACE_ERROR' and contain no 'timed out' text (0 matches each). The 'Test timed out in 5000ms' marker exists only in the default-reporter text output (run1.test-output.txt :995/:1008, run2.test-output.txt :977/:990). A marker check that reads only the JSON report would find 0 markers.

`/tmp/fw-gate-wb-4ap.10.summary.txt:111`:

> F-B2 INFO, CONFIRMED: the run-2 JSON report's failureMessages for all 6 reds begin 'Error: STACK_TRACE_ERROR' (vitest 4.1.10 makeTimeoutError copies the timeout wrapper's stack carrier, @vitest/runner chunk-artifact.js), so the marker text appears only in the console / operation log (6/6 there). A machine timing or register classifier reading markerClass from the JSON report would miss every timeout.

The other seven summaries (`wb-0xjp:29`, `wb-4ap.18:153`, `wb-64x:98`, `wb-0kg.14:22`, `wb-4ap.19:171`, `wb-973.12:185`, `wb-h8f.9:422`) say the same in their own words; every one records that the marker got read from the default-reporter text, the forge operation log or `.forge/logs/last-build.log`. The machine's hkq3 serial legs ran as `npx vitest run <file> --testTimeout=60000 --expect.requireAssertions --includeTaskLocation --reporter=default --reporter=json --outputFile=<serial>/<tag>.try<n>.json` (outbox row 639, 2026-10-21T06:07:41Z) — the pairing this file asks every reader to keep.

## Suggested fixes, cheapest first

1. One documentation line beside `scripts.test` (README test section or `AGENTS.md`): the JSON report's `failureMessages` carry no timeout marker at vitest 4.1.10; classify timeouts from the default reporter's text (`Error: Test timed out in <n>ms.` / `Error: Hook timed out in <n>ms.`) or from `error.message`, never from the JSON alone; always pass `--reporter=default --reporter=json` together.
2. Any rig tool that will classify reds from the report (a register, a timing classifier, a census neighbour): read `error.message` through a reporter, the way `test/helpers/census-reporter.ts:23` does — `const message = (error: { readonly message?: unknown }): string => String(error.message ?? "").slice(0, 800);` — rather than `failureMessages`.
3. Upstream, outside this repo: file against vitest the `makeTimeoutError` argument order (`:2408`) with the 50 ms probe above as the reproduction; a fix there restores the marker in every JSON consumer at once.
4. Not recommended: parsing `failureMessages` for the stack frame of `withTimeout` to infer a timeout; brittle and version-bound.

## Positives worth protecting

- `scripts.test` at `eaa5a46` already pairs the reporters: `vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions`. Every gate's marker reading in the window rests on the default reporter being present in that script (forge captures its text in the operation log). Keep both reporters there.
- `test/helpers/census-reporter.ts:23` serialises `error.message`, not `error.stack`, so the census frame keeps the marker text where the JSON report loses it.
- The marker text itself (`Test timed out in 5000ms.`, `Hook timed out in 10000ms.`) stayed stable across the window; 37 of 1,056 in-window ledger rows and 32 of 43 kept summaries key on it.

## What I did not establish

- Whether vitest upstream changed `makeTimeoutError` after 4.1.10; I read the installed dist only.
- The brief that seeded this file placed the observation on `docs09:567` in the hkq3 out-of-band census; the record I read puts hkq3's out-of-band census red at `docs09:642` (5148.2 ms; `/tmp/fw-gate-wb-hkq3.summary.txt:62`, `:125`) with the JSON/text split stated for the serial-leg and census JSONs generally (`:143`), while `docs09:567` appears in the 4ap.19 out-of-band census (`/tmp/fw-gate-wb-4ap.19.summary.txt:127`). The mechanism holds for both rows; the row attribution in the brief does not match the summary.
- The forge revision the cited gates ran under; the envelopes carry no `forge_revision` field.
