# `npm ci` in 25 gate worktrees cost 13098 s (3.6 h) in 24 h — median 398 s, max 1176 s, at load1 164-511 on the 12 rows that carry a load — so a shared offline cache or a `node_modules` snapshot would return about a seat-hour per gate lane per day

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-20
**`pi-subagents` revision:** trunk `workbench/implementation-program` at `ba3e4ff`; the 25 worktrees were detached at 25 cut tips based on `b21beb0` (15), `cc63071` (3), `1a36ece` (3), `83b85b1` (2), `758ec18` (1) and `d16537e` (1).
**Method:** read every `gate-start` row in the machine ledger over 24 h from 2026-10-19T08:00:34Z; each carries `installSeconds` as the gate seat measured `npm ci --prefer-offline --no-audit --no-fund` in a fresh detached worktree, and `load1AtStart` on 12 of the 25 rows (all 7 g9 rows and 4 of 17 g8 rows; the single g7 row carries none).
**Scope:** feedback about the `pi-subagents` repository's install cost as a gate experiences it (lockfile size, vendored artifacts, cache friendliness), not about `npm` and not about the host.
**Prior art:** none in `new-feedback/` at the fetched trunk on install time or `npm ci` (6 entries listed with `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/`: 5 feedback files plus `README.md`).

## Summary, with numbers

Every complete gate on this rig starts in a fresh detached worktree and runs `npm ci`. Over 24 h the machine recorded 25 `gate-start` rows: install walls summed to 13098 s (3.64 h), minimum 119 s, median 398 s, maximum 1176 s; the 12 rows that carry a load reading span load1 164-511. The gate step itself (forge, cap-8 vitest) took 419-788 s on the 9 gates that passed, so on the median gate the install is about 40 percent of the wall and on the worst it exceeds the gate step. Six gate runs contributed the 25 rows, 2 to 3 lanes concurrent at any time, so each lane spent roughly 1.2 to 1.8 h of its day installing, which is about one more gate per lane per day if returned. The install is pure repetition: the same `package-lock.json` resolved 25 times, with `--prefer-offline` already set.

## Finding 1 — the 25 install walls — **CONFIRMED**

Orchestrator query over `kind == "gate-start"`, 24 h:

```
n 25  sum 13098  min 119  median 398  max 1176  hours 3.64
```

Two rows, trimmed to the fields that carry the claim (all g9 rows and 4 of 17 g8 rows carry the load; the 1176 s maximum, `wb-drd`, is a g8 row at load1 363.96; 24 of the 25 rows are g8/g9 and one is a g7-gate-s8 row at 334 s):

```
{"kind":"gate-start","bead":"wb-5x0.2","commit":"3469e04...","base":"b21beb0...","installSeconds":648,"load1AtStart":"236.54","utc":"2026-10-20T06:48:04Z","run":"g9-gate-s1","gen":"g9"}
{"kind":"gate-start","bead":"wb-72c","commit":"bf0ff36...","base":"b21beb0...","installSeconds":404,"utc":"2026-10-20T07:03:40Z","run":"g8-gate-s4","gen":"g8"}
```

The command the seats run, from the gate procedure: `npm ci --prefer-offline --no-audit --no-fund` in `${FW}/worktrees/<seat>-<bead>` after `git worktree add --detach`, with `TMPDIR` pointed at a fresh `/var/tmp/fwg.XXXXXX`.

## Finding 2 — install wall tracks host load more than the gate step does — **PLAUSIBLE**

The 1176 s maximum and the 119 s minimum ran against the same lockfile; the spread is 10x where the gate step's spread over the same window is under 2x (419-788 s). The runtime state not exercised: the same tip installed twice at two loads. 13 of the 25 rows lack `load1AtStart`, so the correlation is read from the 12 that carry it (164-511) and the seats' narrative only; a day of g9 rows will carry both fields on every row.

## Suggested fixes, cheapest first

1. A shared `npm` cache directory on the gate host (`npm_config_cache=<shared>`) populated once per lockfile change, so `--prefer-offline` actually hits; today no `npm_config_cache` is set, so each install uses the default `~/.npm` cache while `TMPDIR` points at a fresh `/var/tmp/fwg.XXXXXX`.
2. A `node_modules` snapshot keyed by `package-lock.json` sha, restored by `cp -a` or a hardlink tree into the worktree before `npm ci` (which then verifies rather than fetches); the rig already vendors some artifacts under `vendor/`, so the pattern exists.
3. Pin the gate's install to `npm ci --offline` once the cache is warm, so a cache miss fails fast and loudly instead of fetching for 20 minutes under load.

## Positives worth protecting

- The install is CORRECT 25 of 25 times: every gate ran against the exact lockfile of its cut, and every PASS gate's test step was green, which includes the identity test (`test/workbench-identity.test.ts`, pinning `package.json`, `package-lock.json` and vendor bytes); the gate rows record the step verdict, not per-test results. Any cache or snapshot must keep that byte-identity property; a snapshot that drifts from the lockfile would fail that test, which is the right failure.
- `--prefer-offline --no-audit --no-fund` is already the right set of flags; the cost is the cache location and the scratch `TMPDIR`, not the command.
- Fresh detached worktrees per gate (never a shared checkout) are what make parallel gates safe; the fix must not reintroduce a shared `node_modules`.

## What I did not establish

- How much of each install is network versus disk: the seats record wall only; `npm ci --timing` on one install under load would split it.
- Whether the rig's `vendor/` artifacts are part of the `npm ci` cost or outside it.
