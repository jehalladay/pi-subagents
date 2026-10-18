# wb-nl8.3: lazy/local getAgentDir so saved.ts and memory.ts stop importing the 21 MB pi-coding-agent entry in 158 test files, preserving the single-pi-ai-instance guarantee (wb-nl8.1 design Q12)

## 2026-10-18 delivery: a local getAgentDir in src/agent-dir.ts (machine cut on trunk 967f361, measured on 1e33c43, red-first)

Spec of record: the bead description and the owner review note of 2026-10-18 that released the hot-file hold (SONNET tier), bounds (1)-(5): (1) src changes confined to `src/workflow/saved.ts`, `src/memory.ts` and at most one new small module hosting the lazy/local getAgentDir; (2) the single-pi-ai-instance guarantee of `vitest.config.ts:4-13` preserved and pinned by a red-first row proving that importing saved.ts / memory.ts does not load the 21 MB agent entry, the existing instance guarantee staying green; (3) before/after measurements of record (aggregate import time from `.forge/vitest-report.json`, the cold start of `test/workbench-native-modules-failure.test.ts`) quoted here and in the delivery note; (4) no behavior change to getAgentDir's resolved value, value-equality pinned against the eager import in the same red-first file; (5) the complete gate on the exact cut (the gate lane's step; this work seat ran no complete gate).

Environment of record: node v24.20.0, vitest 4.1.10, `@earendil-works/pi-coding-agent` 1.1.0 (devDependency 1.1.0, peerDependency `>=1.1.0`), nproc 64, run-mode default 63 forks, a shared host (load1 recorded per run below). Base `967f361e6bfe7267deef424721338e2280dbd065` (trunk after LANDING 130, wb-ksz.6, taken by a fast-forward merge of the commit-free branch). The red, green and before/after measurements below were taken on the previous trunk `1e33c4339efc5e21bf0f6d7da712feff006c0ea5` plus this cut; the 1e33c43..967f361 delta is two added test files (`test/workbench-child-crash-faults.census.ts`, `test/workbench-child-crash-faults.test.ts`) and ledger rows, no src, qa, docs or config, and none of this cut's files. Files changed (`git diff --numstat` against the base, identical against 1e33c43, plus this receipt):

```
1	0	docs/workbench/receipts/INDEX.md
13	23	qa/workbench/headless-census-receipt.mjs
54	0	src/agent-dir.ts
1	1	src/memory.ts
1	1	src/workflow/saved.ts
205	0	test/agent-dir.test.ts
24	22	test/workbench-headless-census.test.ts
```

### What changed

- `src/agent-dir.ts` (new; imports `node:os`, `node:path`, `node:url` only): `getAgentDir()`, a local copy of pi-coding-agent 1.1.0's `getAgentDir` (`dist/config.js:491-497`) and of the `expandTildePath` it applies (`dist/utils/paths.js` `normalizePath` with default options): `PI_CODING_AGENT_DIR` when non-empty, expanded (`~`, `~/`, `~\` on win32, `file://` URLs through `fileURLToPath`, Git Bash / MSYS / Cygwin / WSL drive paths on win32), otherwise `join(homedir(), ".pi", "agent")`. Environment, home directory and platform are read at call time, as the package reads them. The cut is the local form, not a lazy `import()`: both call sites are synchronous (`savedWorkflowRoots`, the memory-directory resolvers), so a lazy import would either change their signatures or still load the entry on first call.
- `src/workflow/saved.ts:41` and `src/memory.ts:17`: the single `getAgentDir` import line in each now names the local module (`../agent-dir.js`, `./agent-dir.js`). No call site and no other src file changed.
- `vitest.config.ts` is byte-identical to the base: `server.deps.inline: [/@earendil-works\/pi-/]` and `resolve.dedupe: ["@earendil-works/pi-ai"]` (line 59) stay as they were.
- `test/agent-dir.test.ts` (new, 37 rows): three isolation rows (bound 2) and 34 value rows (bound 4), described below.
- `qa/workbench/headless-census-receipt.mjs` and `test/workbench-headless-census.test.ts`: the wb-cax.19 headless census pins the detached-host import closure, which includes `src/workflow/saved.ts` and `src/memory.ts` (landing-order registry entry for wb-cax.19, "closure-changing landers update EXPECTED_* in the landing commit itself"). The cut removes every `@earendil-works` package from that closure (measured below), so under the census's stale-row rule the `pi-coding-agent` row (via `dist/memory.js`, `dist/workflow/saved.js`), the `pi-tui` row reached through it and the four transitive rows (`pi-agent-core`, `pi-ai`, `pi-codemode`, `pi-mcp`) are trimmed in this commit: `EXPECTED_PI_CLOSURE` is now a frozen `{}`, `EXPECTED_PI_TRANSITIVE` a frozen `[]`, and the unused caveat constant is gone. The census test follows: H3 pins both tables empty and frozen; the default-allowlist row pins its exact findings (`unlisted-pi-package` for pi-ai, pi-coding-agent and pi-tui of the fixture closure) instead of `toContain("stale-allowlist-row")`, beside a paired control that the same closure passes under the fixture allowlist; the dist row's direct-importer pin is now `[]`; and the real-closure floor drops from `> 50` to `> 40` entries in the dist row and the F3 symlink row, compensated by content pins (`dist/workbench/claude-host.js`, `dist/workflow/saved.js`, `dist/memory.js` and `dist/agent-dir.js` must all be in the traced closure, the chain a trace stopping near the entry would not reach). That floor change is a re-pin forced by the measured closure (47 entries), disclosed here, not a weakening for its own sake.

### Owner bounds, as met

1. `git diff --name-status` over src: `A src/agent-dir.ts`, `M src/memory.ts` (one line), `M src/workflow/saved.ts` (one line). Nothing else under src/.
2. Isolation rows: each imports the module in a fresh Node process (`--experimental-transform-types`, `HOME=/nonexistent-wb-nl8.3-home`) whose synchronous `module.registerHooks` resolve hook records every resolved URL, calls `savedWorkflowRoots(cwd)` / `resolveMemoryDir("probe", "user", cwd)`, and pins zero URLs under `node_modules/@earendil-works/` together with the resolved paths; a control row resolves `@earendil-works/pi-coding-agent` through the same probe and must record `dist/index.js`, so the empty result is not vacuous. A module that is never loaded cannot add a second pi-ai instance. The 15 test files that drive the faux provider through pi-ai (`agent-runner`, `agent-runner-e2e`, `ext-templates-e2e`, `foreground-concurrency-print-mode-e2e`, `nested-delegation-e2e`, `output-file-compaction-e2e`, `subagent-error-status-e2e`, `subagents-nested-print-mode-e2e`, `subagents-print-mode-e2e`, `worktree-isolation-e2e` and `e2e/` `isolated-provider`, `mention-clone-tool-reachability`, `tool-veto-reachability`, `usage-reaches-session-stats`, `workflow`) read 218 passed, 7 skipped, 0 failed in the base run B1 and in both cut runs A2 and A3.
3. Measurements below.
4. Value rows: 33 cases (18 posix, 15 win32) compare the local function with the package's own `getAgentDir`, imported eagerly in the same file, under the same `PI_CODING_AGENT_DIR` / `HOME` / `process.platform` (redefined for the call, restored after), including thrown errors (a `file://` URL with a host must throw the same code and message); one oracle row pins `VERSION` `1.1.0` and `CONFIG_DIR_NAME` `.pi`, so a package bump re-audits the copy.
5. Left to the gate lane.

### Red of record and green of record

- Collection red on the base, before the module existed: `Cannot find module '../src/agent-dir.js'`, `Test Files 1 failed (1)`, `Tests no tests` (dc66745, log written 2026-10-18T06:01:04Z; src/, qa/ and the census test are byte-identical between dc66745 and 1e33c43, `git diff --quiet` rc 0).
- M0 red (the module present but re-exporting the package's `getAgentDir`), re-measured on 1e33c43 at 2026-10-18T07:03:02Z, load1 19.33: `Tests 2 failed | 35 passed (37)`; both isolation rows red with `expected { count: 1480, first: [ …(3) ] } to deeply equal { count: +0, first: [] }` (1480 `@earendil-works` resolutions each), the value rows and the control green.
- Census red (the base census test and base frozen tables against the cut's dist): `Tests 2 failed | 26 passed (28)`: `expected 47 to be greater than 50` (dist row) and the F3 row's six stale-row findings `expected [ { …(4) }, { …(4) }, { …(4) }, …(3) ] to deeply equal []` (census red log 2026-10-18T06:13:07Z).
- Green: `test/agent-dir.test.ts` 37/37; targeted run at 2026-10-18T07:06:41Z (load1 18.94) over agent-dir, headless census, git-stamp, receipts shape, receipts convention, native-modules failure, memory and memory legacy fallback: `Test Files 8 passed (8)`, `Tests 257 passed (257)`; full suite (`npm run test`) on the cut: `Test Files 314 passed (314)`, `Tests 12072 passed | 1 expected fail | 7 skipped (12080)` in both A2 and A3 (base: 313 files, 12035 passed, 1 expected fail, 7 skipped, 12043). `forge run lint` cmd_f9b5625cee6c exit 0 (`biome check src/ test/`, 476 files); `forge run typing` cmd_a24e0d368f98 exit 0 (`tsc --noEmit` and `tsc --noEmit -p tsconfig.test.json`).
- Re-verified on the merged tree (967f361 plus the cut) at 2026-10-18T07:13:40Z, load1 21.03: the same eight files plus child-crash faults, saved precedence, sandbox RPC census and security pi-tools, `Test Files 12 passed (12)`, `Tests 320 passed | 2 todo (322)` (the two todo rows are the landed child-crash-faults `it.todo` REAL rows, not this cut's); `forge run lint` cmd_45da02e2c834 exit 0 (478 files); `forge run typing` cmd_15ed6e23f0c4 exit 0. The full suite was not re-run on the merged tree (skipped: the delta adds only the two child-crash-faults files, run above; the complete gate of record belongs to the gate lane).

### Mutant battery (each applied to the module, run against the 37 rows, then restored and checksummed)

| Mutant | Result |
|---|---|
| V1 config dir `.pi-agent` | 6 failed |
| V2 no tilde expansion | 5 failed |
| V3 trims the value | 1 failed |
| V4 no `file://` branch | 4 failed |
| V5 no win32 branch | 7 failed |
| V6 home directory cached at load | 10 failed |
| V7 empty value counts as set | 1 failed |
| V8 any `~` prefix expands | 3 failed |
| V9 `~\` expands on posix too | 1 failed |
| V10 case-insensitive `file:` scheme | 1 failed |
| V11 wrong variable name (`PI_AGENT_DIR`) | 29 failed |
| V12 drive suffix keeps forward slashes | 2 failed |
| V13 no `//` guard | 0 failed: equivalent (the drive-path pattern cannot match a path whose second character is `/`, so the guard the package carries is redundant) |
| V14 lower-case drive letter | 5 failed |
| V15 shell drive paths rewritten on posix too | 1 failed |
| V16 `file://` decoded by hand, not `fileURLToPath` | 2 failed |
| I1 memory.ts keeps the package import | 2 failed (saved.ts reaches memory.ts) |
| I2 saved.ts keeps the package import | 1 failed |

17 of 18 red, 1 equivalent. V11's first run anchored on the docblock's mention of the variable and changed nothing (0 failed); re-anchored on the constant it reads 29 failed, the row above.

### Measurements of record

Cold start of `test/workbench-native-modules-failure.test.ts` (a fresh `npx vitest run <file>` per run, five runs per arm; the file has two rows at 1e33c43):

| Arm | load1 | Duration per run (s) | Median | Tests (median) | Transform | Wall (median) |
|---|---|---|---|---|---|---|
| Base 1e33c43 | 25.64-27.31 | 4.74, 4.63, 4.28, 4.33, 4.63 | 4.63 s | 4.40 s | 2.71-2.98 s | 5287 ms |
| Cut | 21.48-21.52 | 1.11, 1.04, 1.05, 1.02, 1.22 | 1.05 s | 0.89 s | 0.33-0.41 s | 1667 ms |
| Cut, second set | 18.44-18.53 | 1.06, 1.06, 1.00, 1.06, 0.99 | 1.06 s | 0.90 s | 0.32-0.37 s | 1628 ms |

Inside the full suite the same file's test time was 5054 ms and 10418 ms on the base (B1, B2) and 1037 ms and 1291 ms on the cut (A2, A3).

Aggregate import time: the json reporter's `.forge/vitest-report.json` (vitest 4.1.10) has no import or collect field (top level: `numFailedTestSuites` … `testResults`; per file: `assertionResults`, `endTime`, `message`, `name`, `startTime`, `status`), so the aggregate of record is the default reporter's `import` figure, which is the sum of the per-file `collectDuration` (equal to within 0.01 s in every run, e.g. A3: 1383835 ms summed against `import 1383.84s`), captured per file by a `/tmp` reporter module added to the same `npm run test` invocation (the report file is still written).

| Run | Tree | Start (UTC) | load1 start-end | Files | Duration | import |
|---|---|---|---|---|---|---|
| B1 | base | 06:29:11Z | 23.34-22.02 | 313 | 229.70 s | 1153.39 s |
| B2 | base | 06:36:32Z | 23.96-17.54 | 313 | 223.25 s | 1072.97 s |
| A2 | cut | 06:23:43Z | 22.27-27.27 | 314 | 236.98 s | 1196.37 s |
| A3 | cut | 06:40:58Z | 17.62-28.12 | 314 | 245.26 s | 1383.84 s |

The aggregate did not fall. By file set (sum of `collectDuration`, seconds):

| Set | B1 | B2 | A2 | A3 |
|---|---|---|---|---|
| 31 files whose only route to the agent entry was saved.ts / memory.ts | 165.5 | 138.9 | 41.1 | 50.4 |
| 282 files whose import closure the cut leaves unchanged | 987.9 | 934.1 | 1141.5 | 1317.6 |
| `test/agent-dir.test.ts` (new; imports the package for its oracle) | - | - | 13.8 | 15.8 |

The freed set fell 64-75%. The untouched set rose, together with signals the cut cannot reach: the median per-file import ratio of the untouched files against B1 was 1.132 (A2) and 1.152 (A3) against 0.934 (B2); their median per-file test-time ratio was 1.045 and 1.106 against 1.001; and the suite's critical path, `test/workbench-cap-saturation-remainder-label.test.ts` (whose closure reaches neither saved.ts, memory.ts nor the agent entry, and whose duration sets the suite's wall time in every run), took 225.9 and 219.5 s on the base and 233.0 and 241.4 s on the cut. The cut runs sat under heavier contention on this shared host (complete gates of other beads held gate slots from 06:13:05Z to 06:25:49Z and from 06:33:17Z to 06:48:58Z, and from 06:44:38Z). Four runs do not establish whether any residual effect on the untouched files' import time exists; it is named as a residual, not ruled out.

The 31 freed files alone (`npx vitest run` over the 31, three runs per arm, 641 tests): base import 121.91 / 123.11 / 121.58 s, Duration 10.08 / 10.05 / 10.15 s, transform 72.6-75.7 s (load1 27.3-30.9); cut import 38.62 / 41.38 / 41.99 s, Duration 6.23 / 6.24 / 6.07 s, transform 14.7-16.7 s (load1 28.7-30.5).

Headless census closure of the built dist: base 94 entries (39 packages, 6 of them `@earendil-works`, 20 first-party modules, 35 builtins); cut 47 entries (7 packages, none `@earendil-works`, 21 first-party modules, 19 builtins).

Static reach of the agent entry over the run's test files (value imports, static and literal dynamic, walked through repo sources): base 153 of 313 files, 31 of them only through saved.ts / memory.ts; cut 123 of 314, none through saved.ts / memory.ts, one of them the new test's oracle.

### Residuals

- Re-branded hosts and newer hosts: the package derives the variable name and the config directory from its own `package.json` `piConfig` (`APP_NAME`, `CONFIG_DIR_NAME`; `PI_PACKAGE_DIR` can point it at another package directory), and the extension takes pi-coding-agent as a peer dependency `>=1.1.0`. The local copy hard-codes the stock 1.1.0 values (`PI_CODING_AGENT_DIR`, `.pi`), so a re-branded or changed host package would resolve a different agent directory than saved.ts and memory.ts now do. The oracle row pins `VERSION` and `CONFIG_DIR_NAME`, so bumping the devDependency reddens it and forces a re-audit; it cannot see a host's installed copy at run time.
- The bead's "158 test files" overstates what this cut frees: 123 files still load the agent entry through 15 other src importers (`agent-types.ts` 101 files, `custom-agents.ts` 94, `enabled-models.ts` 91, `structured-output.ts`, `skill-loader.ts` and `nested-tools.ts` 89 each, `agent-runner.ts` 88, `workbench/control-tool.ts` 61, `ui/conversation-viewer.ts` 60, `settings.ts` 59, `agent-file-toggle.ts` 58, `mention-clone.ts` 57, `workbench/execute-tool.ts` 56, `index.ts` and `workbench/reconcile-tool.ts` 55 each) and test/helpers/print-mode-runner.ts (7). A follow-up bead would own those.
- `test/agent-dir.test.ts` imports the package for its oracle, so the file costs 13.8-15.8 s of import inside the suite (2.6-3.1 s of tests); it is not on the suite's critical path.
- Comments left stale by the cut, not edited because their files are outside this bead's scope: `test/workbench-native-modules-failure.test.ts:32` (the "~2.8 s of Vite-inlined pi-coding-agent reached through claude-host" rationale of wb-nl8.1's warm-up hook; the hook and the row stay correct), `test/memory.test.ts:9` and `test/memory-legacy-fallback.test.ts:8` (pi-coding-agent "evaluates getAgentDir() at module load"; memory.ts no longer loads it).
- Display paths added: none. Scratch: none (the probe's home directory is never created; both functions only read).
