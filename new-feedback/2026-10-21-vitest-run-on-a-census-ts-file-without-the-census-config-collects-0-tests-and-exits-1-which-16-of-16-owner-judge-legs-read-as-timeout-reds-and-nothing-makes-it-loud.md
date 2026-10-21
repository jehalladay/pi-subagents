# `vitest run <file>.census.ts` without `--config vitest.census.config.ts` collects 0 tests and exits 1 — 16 of 16 owner judge-chain legs at landing 201 read that exit as a timeout red — and nothing in the rig makes the mistake loud, although `npm run test:census -- <file>` already runs one census file correctly

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator)
**Date:** 2026-10-21
**`pi-subagents` revision:** branch of record `origin/workbench/implementation-program` at `eaa5a46` (commit 2026-10-21T08:00:34Z). At the adversarial re-read the fetched ref had moved 34 commits to `eb4bfed` (2026-10-21T08:39:04Z); `git diff --stat eaa5a46 eb4bfed -- <every path cited below>` printed nothing, so each citation holds at both. The local clone's HEAD sits at `a67bc36`, 1,613 commits behind `eaa5a46` (porcelain 0), so every source line below was read with `git show eaa5a46:<path>`, never from the working tree
**`vitest` revision:** 4.1.10 (`node_modules/vitest/package.json` in the rig clone; `package-lock.json` at `eaa5a46` pins vitest 4.1.10, `@vitest/runner` 4.1.10 and vite 8.2.1, and the lock is unchanged at `eb4bfed`); node v24.20.0
**`forge` revision:** UNVERIFIED for the gates cited — 0 of the 125 kept gate-record JSON files under `/tmp/fw-gate-wb-*.json` carry a `forge_revision` field (grep over all 125 at read time); the host's PATH `forge --version` at read time prints `forge 0.2.1 (rev d29a7df76185, built 2026-10-20)`, which pins the install on this host, not the gates' runs
**Method:** read the two configs, `package.json`, `test/helpers/census.ts` and the 25 census files at `eaa5a46`; read the machine's BOUNDARY (landings 194-204), the g11 LAND-PREP design, the 43 gate summaries kept under `/tmp/fw-gate-*.summary.txt` and the 1,056 ledger rows in the window 2026-10-20T08:01:23Z to 2026-10-21T08:01:23Z; reproduced both sides in a throwaway tree under `/tmp` (the ref's files via `git archive eaa5a46`, `node_modules` as a directory of symlinks into the rig clone's 4.1.10 install, `TMPDIR` inside the tree, `CLAUDECODE` / `AI_AGENT` / `CLAUDE_CODE` unset) — three vitest runs, no write outside `/tmp`; a second pass of the same seat re-read every quote against its source and re-ran the reproduction in a fresh tree before filing
**Scope:** feedback about the rig's test infrastructure (how one census file gets run and how its empty run reads), not about any census's judgment and not about the owner's judge chain, which already carries its own cure
**Prior art:** none at the fetched ref — `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/ | grep -iE 'census|config|include|vacu|no-test'` lists only the 2026-10-20 5000 ms file, which is about `testTimeout`, not the include pattern; `git grep -li 'No test files found' origin/workbench/implementation-program -- new-feedback/` returns nothing, and the same body grep for `census.config`, `passWithNoTests` and `vacuous` returns nothing; in the bead store at `eaa5a46` the string `No test files found` sits in the notes of 21 of 519 beads and `vitest.census.config` in 43 (49 distinct beads), every one a gate note; no bead title names the trap

## Summary, with numbers

The default vitest config includes `test/**/*.test.ts`; the census tier lives behind a second config whose include is `test/**/*.census.ts`. So `vitest run test/<x>.census.ts` with no `--config` collects **0 tests** and exits 1 with `No test files found, exiting with code 1` (reproduced in two independent throwaway trees; vitest 4.1.10 prints the filter, the include and the exclude on the next lines). On the night of 2026-10-21 the owner's judge chain ran exactly that form on **16 of 16** census file-alone legs for landing 201 (wb-cax.15) and read `rc != 0` with zero assertions as timeout-class evidence — the owner's own disclosure, as the machine recorded the relay (`DESIGN-g11-landprep.md:41`); the verdict survived on a different rule (R573(a)), both sides bound a NO-EVIDENCE reading within the hour, and the machine's own exposure read **0 of 15** in-window `serial-leg` ledger rows carrying a `testsRun` field before that reading and **5 of 5** after it (3 of the 5 census legs, each with `config: vitest.census.config.ts`). The rig side shows three gaps, in cost order: (1) `npm run test:census -- <file>` already does the right thing (reproduced: 82 tests collected), but no README, AGENTS or docs line says so — the only mentions of the census config outside the census files and the bead store at `eaa5a46` are two receipts and `package.json`; (2) 23 of 25 census files name the config in their header comment, 2 do not; (3) a reader that keys on the exit code alone cannot tell "0 tests" from "N tests, 1 red" — both exit 1. The cheapest cure costs two documentation lines; the structural one costs the reader a `numTotalTests > 0` check, which the machine has now bound on its side.

## Finding 1 — the default include cannot select a `.census.ts` file, by design — **CONFIRMED**

`vitest.config.ts:17` at `eaa5a46`:
```
    include: ["test/**/*.test.ts"],
```
`vitest.census.config.ts:1-6` at `eaa5a46`, the whole file:
```
import { defineConfig } from "vitest/config";
// wb-nl8 census tier: census legs (test/**/*.census.ts) judge the gate's OWN report at
// .forge/vitest-report.json (written by the test step) and never re-execute it. The .census.ts
// suffix keeps them outside the default include test/**/*.test.ts, so the default report can
// never record a judging file (u62 p-in-run, census.ts judge()).
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
```
Reproduction in the throwaway tree (files from `eaa5a46`, vitest 4.1.10 / vite 8.2.1; stdout then stderr, ANSI stripped; the `exclude:` line cut after its first entry, nothing else cut):
```
$ node node_modules/vitest/vitest.mjs run test/workbench-docs09-readers-relationships.census.ts
 RUN  v4.1.10 /tmp/fw-verify-repro-1879398
(!) Your Vite config uses features that are unsupported by `configLoader: 'native'`, which is planned to become the default in a future major version of Vite:
  - ESM syntax in a file loaded as CommonJS (vitest.config.ts:1:1). Use a `.mjs` extension or set `"type": "module"` in the closest package.json
Set `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` to suppress this warning.
No test files found, exiting with code 1
filter: test/workbench-docs09-readers-relationships.census.ts
include: test/**/*.test.ts
exclude:  test/workbench-native-client.test.ts, [... 14 more]
rc=1
```
(The three Vite lines print on every config load in this package and belong to a sibling finding on the missing `"type"` field; they carry nothing about the include.) The message comes from `node_modules/vitest/dist/chunks/cli-api.BK8pd4xc.js:1969-1970` at 4.1.10:
```
		else if (config.passWithNoTests) this.log(`No ${config.mode} files found, exiting with code 0\n`);
		else this.error(c.red(`No ${config.mode} files found, exiting with code 1\n`));
```
Same file, same tree, the census config:
```
$ node node_modules/vitest/vitest.mjs run --config vitest.census.config.ts test/workbench-docs09-readers-relationships.census.ts --reporter=default --reporter=json --outputFile=out/b2.json
 Test Files  1 failed (1)
      Tests  37 failed | 45 passed (82)
rc=1
json: numTotalTests 82 failed 37 passed 45
```
First lines of the 37 `failureMessages`, grouped: 12 × `AssertionError: expected [ …(2) ] to deeply equal []`; 8 × `Error: ENOENT: no such file or directory, open '/tmp/fw-verify-repro-1879398/.forge/vitest-report.json'`; 7 × `AssertionError: expected [ Array(1) ] to deeply equal []`; 5 naming `report-unreadable` — `AssertionError: expected 'report-unreadable' to be 'absent' // Object.is equality` (2 rows), `... to be 'not-collected'`, `... to be 'tier-mismatch'`, and the whole-table row `AssertionError: expected [ 'report-unreadable', …(48) ] to deeply equal [ 'ok', 'ok', 'ok', 'ok', 'ok', …(44) ]`; the remaining 5 are smaller assertion diffs. Both exits read 1. One ran 0 tests; the other ran 82 and failed closed because the throwaway tree holds no `.forge/vitest-report.json`. The exit code alone cannot tell them apart; `numTotalTests` (JSON) or the `Tests` line (default reporter) can.

## Finding 2 — the trap fired on 16 of 16 owner judge legs at landing 201 — **CONFIRMED** from the owner's disclosure as the machine recorded it, not re-run by me

`ledger/evolution/g11-land-prep/DESIGN-g11-landprep.md:41` (the machine's record of the owner relay):

> Owner judge chain for landing 201: the 16 census file-alone legs were VACUOUS - 'npx vitest run <file>.census.ts' under the default config found no test files (empty Tests line, exit 1) and the chain read rc!=0 with zero assertions as timeout class and pushed. Guard-reads-nothing class (STANDARDS.md, bound this morning), owner side. Verdict UNAFFECTED: the landing stands on R573(a) - the owner gate's 28 census reds were budget timeouts in the census STEP with the test step green, echo class by rule, no file-alone evidence owed. Owner fix: census files run with --config vitest.census.config.ts; an EMPTY Tests line is NO-EVIDENCE -> HOLD, never cleared; judge template regenerated for 4ap.19, drd, hkq3, h8f.11 before any judges; the 16 census files re-run file-alone under the census config in the cax.15 worktree, result pending the next relay.

`BOUNDARY.md:4724` (the landing-201 fold line, under the heading at `:4723` `## FOLD landing 201 (wb-cax.15) (2026-10-21T07:10:00Z, orchestrator via bin/fold.sh)`) carries the disclosure as first relayed:

> owner disclosure: their judge chain's file-alone legs on those census files also redded without assertions (a census file run outside the census step's config may not find the report), cause pending in the next relay, landing stands on R573(a)

`BOUNDARY.md:4727` (under the heading at `:4726`, 2026-10-21T07:13:30Z), the machine-side binding:

> (1) state/dispatch-policy/timing-confirmation gains the reading - *.census.ts file-alone runs use --config vitest.census.config.ts; an empty Tests line / testsRun 0 is NO-EVIDENCE, never a clear, never a REAL RED; the serial-leg row carries --testsRun and the verdict HOLDs with needsRuling [...] Machine exposure today: 0 of 15 g10 serial-leg rows carry testsRun (only hook clears required it); work seats already run census cuts under the census config (h8f.12 delivered red command).

Ledger `metrics.jsonl`, the 20 in-window rows with `"kind":"serial-leg"`: the 15 before 07:13:30Z carry no `testsRun` (0 of 15, my own count agreeing with the line above); the 5 after it all carry it, and the three census legs among them carry `config` too — row 8530 (2026-10-21T07:53:08Z, wb-72c.1, `"testsRun":"82","config":"vitest.census.config.ts"`), row 8537 (07:57:59Z, wb-hkq3, docs06 census, `"testsRun":"44"`), row 8538 (07:58:22Z, wb-hkq3, docs09 census, `"testsRun":"82"`); the two census legs before it (rows 8259-8260, 02:37:38Z, wb-tz2.10) carry neither field, so their config stays unrecorded. The owner's 16-leg re-run under the census config followed (`DESIGN-g11-landprep.md:56`): 12 of 16 files fully green, 4 files red with 8 rows total, every one `Error: Test timed out in 5000ms` — real evidence this time, carried in the sibling CORROBORATION file on the 5000 ms budget.

The same string appears in 10 of the 43 kept gate summaries for a legitimate reason — gate seats move a new file aside to show "red at base" (9 census files, 1 `.test.ts`), e.g. `/tmp/fw-gate-wb-6hb.6.summary.txt:77`:

> Census moved aside (= base a7fcfce, where the file is absent): vitest run --config vitest.census.config.ts test/workbench-docs06-conformance.census.ts -> 'No test files found, exiting with code 1' (rc 1); restored, sha256 2f83f105 identical, porcelain 0.

So the message by itself proves nothing about which config ran; only the `include:` echo line or a test count does.

## Finding 3 — the one-file form exists and nothing documents it — **CONFIRMED** for the script and the docs; **PLAUSIBLE** for the helper

`package.json` scripts at `eaa5a46` (the three that matter):
```
pretest      => node -e "require('fs').rmSync('.forge/vitest-report.json',{force:true})"
test         => vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions
test:census  => vitest run --config vitest.census.config.ts
```
npm forwards arguments after `--`, so the one-file form already works (throwaway tree, no report present):
```
$ npm run -s test:census -- test/workbench-docs09-readers-relationships.census.ts
 Test Files  1 failed (1)
      Tests  37 failed | 45 passed (82)
rc=1
```
Where the census config gets mentioned at `eaa5a46` outside the census files themselves (armed: the grep finds `package.json`, so it would find a README line):
```
$ git grep -l -E "vitest\.census\.config" eaa5a46 -- . ':!test/*.census.ts'
.beads/interactions.jsonl
.beads/issues.jsonl
docs/workbench/receipts/wb-nl8.md
docs/workbench/receipts/wb-zsv.md
package.json
```
No README, AGENTS.md, CONTRIBUTING or `docs/workbench/*.md` outside two receipts names it (`git grep -n -E 'test:census|census\.config' eaa5a46 -- README.md AGENTS.md 'docs/workbench/*.md'` prints only the two receipts). Inside the tier: 23 of 25 census files name `vitest.census.config.ts` or `--config` in their first 12 lines (the two that do not: `test/workbench-child-crash-faults.census.ts`, `test/workbench-w21-survivor-pins.census.ts`). The header comment did not stop a judge chain that never opened the file.

PLAUSIBLE part: `test/helpers/census.ts` (6,196 lines at `eaa5a46`) analyses the GATE's command line and config (`:672` "Read-only analysis of the vitest argv the command reaches", `:1275` `const CONFIG_FILES = ["vitest.config", "vite.config"].flatMap(...)`). A grep over it finds `passWithNoTests` 3 times (`:1277`, `:1300`, `:1747`, each inside a closed list of flags the guard tolerates on the gate's command line), `include` 12 times and `No test files` 0 times; none of those is a check that the process now running a census file started under the census config. A grep over 6,196 lines, not a read — and such a check could not fire anyway when the file never gets collected: the vacuous run executes no code of the rig's. The loud guard has to live in the reader or the invocation.

## Suggested fixes, cheapest first

1. One line in the README (or the `AGENTS.md` test section) and one comment beside the `test:census` script: `npm run test:census -- test/<x>.census.ts` runs one census file; a bare `vitest run test/<x>.census.ts` prints `No test files found, exiting with code 1` and ran nothing. Cost: two lines.
2. Add the header line to the 2 of 25 census files that lack it (`child-crash-faults`, `w21-survivor-pins`), so every census file's first screen names its config.
3. For any reader of a census leg (judge chain, orchestrator, CI): treat an absent `Tests` line / JSON `numTotalTests: 0` as NO-EVIDENCE, never as red or green — the reading both sides bound on 2026-10-21T07:13:30Z; a `scripts/census-file.sh <file>` that runs the census config, then asserts `numTotalTests > 0` from a `--reporter=json` output file, would make the rule executable in the rig rather than in each consumer's policy file.
4. Do not cure this by widening the default include or setting `passWithNoTests`: the suffix split exists so the default report can never record a judging file (the config's own comment), and `passWithNoTests` would turn the loud exit 1 into a silent green.

## Positives worth protecting

- The `.census.ts` / `.test.ts` split with the reason written into `vitest.census.config.ts:2-5` — the invariant that the default report never records a judging file — and `allowOnly: false` in both configs.
- The census fails closed without its input: 37 of 82 docs09 rows red in a tree with no report (reproduced above) — 5 of the 37 naming `report-unreadable`, among them the whole-table row `expected [ 'report-unreadable', …(48) ] to deeply equal [ 'ok', 'ok', 'ok', 'ok', 'ok', …(44) ]`, 8 failing on `ENOENT` for `.forge/vitest-report.json`, the rest on assertion diffs against an empty verdict table; none green. A missing report never reads as green.
- `pretest` removes the previous report before every `npm test` (receipt `docs/workbench/receipts/wb-nl8.md:9`: "a run that never writes (crash, refused flag, timeout) leaves no report and the census step reds `report-unreadable` instead of judging the previous run").
- vitest's `No test files found, exiting with code 1` plus the `include:` echo line say exactly what happened; `passWithNoTests` stays unset. Keep both.
- `npm run test:census -- <file>` already works; the one-file form needs no code change.

## What I did not establish

- The owner's judge template after regeneration (`DESIGN-g11-landprep.md:41` says it was regenerated for 4ap.19, drd, hkq3, h8f.11); I read the machine's record of the relay, not the template.
- The full 6,196 lines of `test/helpers/census.ts`; the "no active-config self-check" claim rests on a grep.
- Whether any census leg outside the machine's ledger ran under the default config before 2026-10-21; the ledger shows only the two unlabeled census legs (rows 8259-8260) whose config the row does not record.
- The forge revision the cited gates ran under; the envelopes carry no `forge_revision` field and no forge verb ran for this file.
