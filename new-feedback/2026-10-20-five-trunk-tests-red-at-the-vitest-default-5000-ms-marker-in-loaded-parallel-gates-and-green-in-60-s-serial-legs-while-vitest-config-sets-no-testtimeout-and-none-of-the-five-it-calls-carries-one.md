# Five trunk tests red at the vitest default 5000 ms marker in loaded parallel gates and green in 60 s serial legs (per-test serial 3.5-24 s, two above 5 s even alone) — while `vitest.config.ts` sets no `testTimeout` and none of the five `it(...)` calls carries one

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-20
**`pi-subagents` revision:** trunk `workbench/implementation-program` at `ba3e4ff`; the five test blobs are pinned by sha in the machine's register (below).
**Method:** read the machine's known-settled-row register (`state/known-settled-rows.json`, 5 entries written from gate verdict rows and acknowledged by the rig owner; created 2026-10-19T23:46Z, extended 2026-10-20) and the gate verdict rows it cites (machine outbox rows 566, 567, 569, 571); read the five `it(...)` lines and the 80 lines after each at `ba3e4ff` for a timeout argument; read `vitest.config.ts` at `ba3e4ff` for `testTimeout` / `hookTimeout`.
**Scope:** feedback about the `pi-subagents` test configuration as the gates experience it, not about the five tests' logic and not about the machine's register (one of whose entries this file's verification showed to be mis-keyed; corrected on the machine side).
**Prior art:** none in `new-feedback/` at the fetched trunk on timeouts or the 5000 ms marker (6 entries listed with `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/`: 5 feedback files plus `README.md`).

## Summary, with numbers

Across the program's complete gates on a 64-core host at load1 roughly 160-690 (mostly 300-490), vitest capped at 8 workers, the same five trunk tests red with the default marker `Test timed out in 5000ms` often enough that the machine, with the owner's acknowledgement, registered them as known-settled rows. Each ran green in the gates' serial legs, which run with `--testTimeout=60000`; the per-test serial durations the gates recorded range from 3.5 s to 24 s, and two of the five exceed the 5 s default even when run alone (`identity:159` at 8.4-8.9 s, `saved-precedence:146` at 23.9 s). `vitest.config.ts` at `ba3e4ff` sets neither `testTimeout` nor `hookTimeout`, and none of the five `it(...)` calls passes a timeout argument, so the 5000 ms default governs all five in the parallel run. A sixth row in one of the same files reds on the 10000 ms hook default (`Hook timed out in 10000ms`, a `beforeEach` at 26.7 s). Cost: every gate that reds one of them must run a serial leg before it can pass, and `identity:159` failed once even in a 60 s serial leg (an IO stall), which the register's expiry clause counts against it.

## Finding 1 — the five rows, with the per-test serial durations the gates measured — **CONFIRMED**

From the register and the outbox rows it cites (durations in ms are the test's own time in the serial leg at `--testTimeout=60000`):

| file:line | title (first words) | marker in the parallel run | serial duration ms (source) | blob |
|---|---|---|---|---|
| `test/workbench-saved-precedence.test.ts:146` | re-walks the full layer chain and the explicit-source rows after a second session_start ... | Test timed out in 5000ms | 23949 (outbox 567) | b904d00d |
| `test/workbench-identity.test.ts:88` | pins actual package.json, package-lock.json and local vendor artifact bytes ... | Test timed out in 5000ms | 3545, 4629 (outbox 569); 36730 once at load1 417 (outbox 571) | d2f1e9ac |
| `test/workbench-identity.test.ts:159` | rejects lockfile changes, missing artifact and lockfile/manifest mismatch | Test timed out in 5000ms | 8363, 8872 (outbox 566, 569: "over the 5000 ms default even serially") | d2f1e9ac |
| `test/workflow-gate-worktree.test.ts:299` | runs the gate once, in the session's own tree | Test timed out in 5000ms (outbox 571) | serial-green; duration not recorded | 2d264f66 |
| `test/workbench-inspector.test.ts:58` | window access reads only visible rows even after 100k updates and retains selected identity | Test timed out in 5000ms | serial 133/133 green; duration not recorded | d792389d |

A sixth row in `test/workflow-gate-worktree.test.ts` is a hook, not a test: "skips the gate for a child that failed ..." (the `describe` at `:262`) red with `Hook timed out in 10000ms` on a `beforeEach` that ran 26722 ms serially (outbox 567). The machine's register had keyed that 26722 ms hook timeout to `:299`; this file's verification caught it and the register was corrected.

## Finding 2 — no timeout is configured at either level — **CONFIRMED**

```
$ git show ba3e4ff:vitest.config.ts | grep -n -i 'testTimeout\|hookTimeout'
(no output)
$ git show ba3e4ff:test/workbench-identity.test.ts | sed -n '159p'
  it("rejects lockfile changes, missing artifact and lockfile/manifest mismatch", () => {
$ git show ba3e4ff:test/workbench-saved-precedence.test.ts | sed -n '146p'
  it("re-walks the full layer chain and the explicit-source rows after a second session_start, with tool surface and settings bytes unchanged", async () => {
```

The same read for `:88`, `workflow-gate-worktree.test.ts:299` and `workbench-inspector.test.ts:58` shows two-argument `it(name, fn)` calls; no `{ timeout }` object and no numeric third argument appears within the 80 lines after any of the five. The `describe` at `workflow-gate-worktree.test.ts:282` has a `beforeEach` (`:286`) and an `afterEach`, no `beforeAll`.

## Finding 3 — the cost is one serial leg per red, and one row failed even there — **CONFIRMED**

The gates' rule (owner timing-class reading, recorded in the machine's BOUNDARY as R574): a measured timing red is timing-class only if the row runs green alone, so every one of these reds costs a serial leg at `--testTimeout=60000` plus the verdict bookkeeping. The register (created 2026-10-19T23:46Z, extended 2026-10-20) exists because the same rows kept re-paying that cost in different gates. Outbox 571 (the `wb-2j3.4` gate, 2026-10-20T00:30Z) records `identity:159` failing once in a serial leg (`Test timed out in 60000ms`, an IO stall) and names the register's expiry clause as met for it; the machine marks that entry expired as part of this file's correction.

## Suggested fixes, cheapest first

1. Per-test timeouts on the five rows (`it(name, fn, 30_000)` or `{ timeout: 30_000 }`) with the measured serial duration as the justification in a comment; the `beforeEach` under the `describe` at `workflow-gate-worktree.test.ts:262` gets a `hookTimeout` (the measured 26.7 s sits above the 10 s default).
2. A `testTimeout` in `vitest.config.ts` scaled by an environment variable the gates set (`PI_GATE_LOAD=1` -> 20000), so a loaded gate stops reading heavy-but-correct rows as failures.
3. A test tag or filename convention for load-sensitive rows (`*.heavy.test.ts`) that the gate runs serially after the parallel pass, which would also retire the machine's register.

## Positives worth protecting

- All five are REAL tests of real behaviour (100k-row window access, a full layer-chain re-walk, a gate in a session tree); none should be deleted or hollowed to fit 5 s. The fix is the budget, not the test.
- The suite's default-marker text is stable and greppable (`Test timed out in 5000ms`, `Hook timed out in 10000ms`), which is what let the machine key its register on marker class; keep the wording stable.
- Four of the five ran green in every serial leg the gates recorded; the fifth (`identity:159`) failed once on an IO stall at 60 s. The suite has slow rows in this class, and at most one that is also fragile under IO pressure.

## What I did not establish

- The per-test duration of `:299` and `:58` in the serial leg (the gates recorded only pass counts for those two); vitest's JSON reporter carries it.
- Whether other rows red at 5000 ms less often than these five; the register holds only rows that recurred and were acknowledged.
- Whether the `identity:159` IO stall at 60 s was host contention or a defect in the test's fixture setup; one occurrence, one host.
