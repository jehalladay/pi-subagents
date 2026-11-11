# The default tier needs dist for its detached and runner suites while AGENTS.md line 56 says build only to verify output, and 5 of the 22 beads with a green row in the window named a no-dist red

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-11-11; observation window 2026-11-10T08:25Z to 2026-11-11T08:25Z.
**`pi-subagents` revision:** assigned installed-tool pin: trunk `origin/workbench/implementation-program`, resolved after fetch to `ce180d82f9385a315ff26bd8e7f9202cac19f5b3`; source read at that exact SHA; package version `0.20.0`. This is the workflow's source-based installed pin, not an independently attested binary build: no pi-subagents binary was invoked. The three delivered records quoted below name this same base; the additional two seat records do not carry a base field.
**Method:** `timeout 120 git fetch -q origin` (exit 0), `git rev-parse`, `git ls-tree`, `git show`, `git grep`, and `git log -S` in the OrchestrationEngineer rig clone. Parsed the read-only machine ledger by physical line number and JSON fields. Evaluated `existsSync` with Node v24.20.0 in an isolated detached checkout of the pin (draft) and again over a `git archive` extract of the pin (fix stage), without importing product code. No build or complete gate ran for this draft; the only Vitest run was the single census leg named in the last section (fix stage, not a suite).
**Scope:** friction in pi-subagents' default-tier build prerequisites and contributor instructions, not a defect in the machine's graph or gate scheduler. Counts from seat statements describe reported results, not independently replayed tests.
**Prior art:** searched all 41 entries (40 records plus README) under `new-feedback/` at the fetched program trunk, not the stale checkout's listing. Filename terms included dist/build/detached/compiled/agents/precondition/runner; body terms included `compiled distribution`, `npm run build`, `needing dist`, `pretest`, `no-dist` and `no dist`. No matching prerequisite finding found in those records. The October 21 package-type warning file concerns module parsing, not missing build output. The October 27 wb-tz4r.8 file's line 218 mentions `npm run build` incidentally; that positive search hit also controls the body-search instrument. Relevant prior implementation: commit `1fc74f087ea91f25955b10871eb902b492f67522` fixed the Forge gate's order on October 15, but not the npm scripts or contributor recipe. This file reports that remaining surface. The filename terms hit 5 of 41 names (the 10-15 positive on verifying closures without building, the 10-20 AGENTS.md Git-section push clause, the 10-21 package-type file and two 10-25 detached-timing files); none concerns the build prerequisite. The closest prior mention at trunk is `2026-10-15-positive-the-complete-gate-receipt-and-red-green-re-verification-discipline-let-an-orchestrator-verify-6-of-6-closures-without-building-and-the-owner-bounced-0.md:20`, where candidates gated before the gate-order change "declared their provisioning (`npm ci` plus a prebuilt `dist` for the detached test)": a base-skew positive, not a finding about the npm path or the contributor recipe. Ten more records sit on five pushed, unlanded day branches (`origin/machine/flywheel/feedback-2026-11-04`, `-05`, `-06`, `-09`, `-10`: 2, 1, 2, 2 and 3 files absent from the trunk listing); the body terms above plus `missing dist`, `dist-not-built`, `prebuilt`, `unbuilt`, `not built`, `build step`, `AGENTS.md:56`, `only when verifying`, `prepublishOnly` and `detached-grants` return 0 hits in those ten files and 22 hits in this file as the armed control. The November 10 ci.yml node-version file on the last of those branches records the same build-job step list and the master-only trigger (its line 36); it concerns the Node pin, not build output.

## Summary, with numbers

**CONFIRMED (source):** the default tier includes detached launch tests that require a compiled host, while `npm run check` and `npm test` do not build it. `AGENTS.md:56` limits when to build, and its release recipe runs checks before building. **CONFIRMED (record census):** 5 of 22 distinct beads represented by 23 `kind=green` rows in the observation window report missing-dist failures among their testing results. These are not five independently reproduced failures or five full-tier runs: wb-f5y's missing-dist failure came from a targeted set, and wb-x32's from a receipt-reading set. Three of those five beads also have collected `delivered` rows reporting the same incidents; those copies are not additional observations. The filename's "so" and this title's "and" name the mechanism only: a tier that needs dist, run before a build, reds. That `AGENTS.md:56` is why these five seats had not built is UNDETERMINED (last section): wb-dc0's record says "(no build step in a work worktree)", and 9 of the other 17 beads' `green` rows record `npm run build` or "dist built" beside their test command (wb-hhxs M:72695, wb-0b81 M:73113, wb-9b7e M:73627, wb-n40d M:74119, wb-c61s M:75187, wb-5uh M:75338, wb-79k.2 M:75386, wb-69g.7 M:75436, wb-79k.1 M:75513); wb-bau's second `green` row, M:75302, records `npm run build` too, so 10 of the 22 beads record a build before a test run. The machine's `machines/flywheel/state/standing-rules.md` (33 lines, read-only here) carries 0 `npm run build` lines and 0 standalone `dist` words; its two `build` mentions name the complete gate's command (rule 20) and step list (rule 22(e)), so no machine instruction told a seat to build before the default tier either.

The cheapest proposed cure is to document the build prerequisite before the default-tier commands and correct the recipe order. Keep real detached execution and its identity checks; do not silently turn an unbuilt checkout into a passing gate.

## Finding 1 — Default-tier prerequisites contradict the check/build instructions — **CONFIRMED**

All source citations in this section use `ce180d82f9385a315ff26bd8e7f9202cac19f5b3`.

`src/workbench/hosts/local-detached.ts:510-512`:

```typescript
  const root = packageRoot();
  const hostEntrypoint = join(root, "dist", "workbench", "hosts", "local-detached.js");
  if (!existsSync(hostEntrypoint) || realpathSync(hostEntrypoint) !== hostEntrypoint) throw new Error("Detached launch requires the compiled distribution; build it before launch.");
```

`packageRoot()` canonicalizes the package root with `realpathSync(root)` at line 349. The child spawn at line 549 uses this compiled entrypoint. This report concerns the absent-file arm, not a claim that any symlinked ancestor necessarily triggers the other arm.

`test/workbench-detached-grants.test.ts:23-25` explicitly describes its prerequisite:

```text
 * Every launch here is real and goes through the registered Pi tools only: the tool reaches the real preflight through
 * workbenchNative().launchDetachedWorkflow, and an admitted launch spawns the compiled child host (dist/, which the
 * gate's build step makes before its test step) and runs the reviewed pure script to completion. What a launch carried
```

`vitest.config.ts:17,27` includes `test/**/*.test.ts`; the exclude array includes the live control suite but not detached-grants. Another default-tier example, `test/workbench-furnace-vc4-receipt.test.ts:1137`, asserts the prerequisite directly:

```typescript
    expect(existsSync(join(repoRoot, "dist/workbench/providers/furnace.js")), "the runner drives dist/: run `npm run build` (the forge gate builds before test)").toBe(true);
```

However, `package.json:45-48,56` wires the commands this way:

```json
    "build": "node -e \"require('fs').rmSync('dist',{recursive:true,force:true})\" && tsc",
    "prepublishOnly": "npm run lint && npm run typecheck && npm run test && npm run build",
    "pretest": "node -e \"require('fs').rmSync('.forge/vitest-report.json',{force:true})\"",
    "test": "vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions",
```

```json
    "check": "npm run lint && npm run typecheck && npm run typecheck:test && npm run test",
```

These complete script values establish the missing build step; the adjacent `build` entry is a positive control, not an absent-key inference. `.github/workflows/ci.yml` at the pin (blob `8d55222fd3c0`, 80 lines, the only workflow file) is a fourth surface without a build step: its `build` job runs `npm ci`, `npm run lint`, `npm run typecheck`, `npm run typecheck:test` and `npm run test` (`:18-22`), its two compat jobs end in `npx vitest run --reporter=dot` (`:59`, `:80`), 0 lines run `npm run build`, it triggers only on `master` (`:5`, `:7`), and `AGENTS.md:44` calls `npm run check` "(what CI runs)". `AGENTS.md:56` says:

> - `npm run build` compiles with `tsc`; run it only when verifying the build output or when requested.

Its **Releasing** section, not its Git section, orders the commands at lines 140-142 as:

```bash
  npm run check                    # lint + typecheck + typecheck:test + test
  npm run test:e2e                 # faux/scripted e2e — no network, no keys
  npm run build
```

`CONTRIBUTING.md:47-50` likewise lists lint, typecheck, test, then build. `AGENTS.md:167`, in the fork's workbench section, does say "Use Forge for project build/test/package integration, do not add GitHub CI, and do not introduce Library as a dependency.", and the Forge gate builds before its test step (`forge.toml:9`, see Positives). The contradiction reported here is confined to the npm path that `AGENTS.md:42-56` and `CONTRIBUTING.md:44-51` prescribe. Thus a fresh checkout driven by that npm path needs knowledge from a test comment or an initial failure that `AGENTS.md:42-56` and `CONTRIBUTING.md:44-51` do not supply at the point of running checks.

**Bounded existence probe:** `git ls-tree -r --name-only` at the pin returned 0 tracked entries under `dist/`, versus 2 under `src/workbench/hosts/`; `.gitignore:5` contains `dist/`. The draft's probe ran in `/tmp/pi-feedback-c2-20261111-3H8f9b/tree`, a clean detached checkout of the pin that was removed after the probe with no transcript or artifact kept, so that run rests on this seat's word. At the fix stage the probe was re-run in the reproducible form: `git archive ce180d82f9385a315ff26bd8e7f9202cac19f5b3 package.json src/workbench/hosts | tar -x -C "$(mktemp -d)"` (rc 0; 3 files extracted), then a `node -e` one-liner under Node v24.20.0 printing `existsSync(join(root, "dist", "workbench", "hosts", "local-detached.js"))` and the same call for `src/workbench/hosts/local-detached.ts`, which printed:

```text
existsSync(<root>/dist/workbench/hosts/local-detached.js) = false
control existsSync(<root>/src/workbench/hosts/local-detached.ts) = true
```

The angle-bracket labels above were literal probe output, identical in both runs. That scratch tree was removed after the probe as well. This exercises only file existence, not product launch or the full npm lifecycle.

## Finding 2 — Five bead statements name missing-dist reds; mixed causes prevent a dist-only failure total — **CONFIRMED**

Ledger: `/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl`. `M:N` means physical line N. Parsing lines M:72035 through M:75570 yielded 3536 rows, including 23 `green` rows for 22 distinct beads. The first and last rows in that range have UTC values `2026-11-10T08:26:02Z` and `2026-11-11T08:23:47Z`. By `utc` the stated window also holds M:72033 (`gate-slot-released`) and M:72034 (`landing-gate`), both wb-7u0r at `2026-11-10T08:25:19Z`, 3538 rows in all; neither is a `green` row, so the 23 rows, 22 beads and 5 beads above do not move.

The following are verbatim substrings of JSON-decoded `result` or `green` values, not new test output from this filing seat. The wb-y0n6 quote joins two verbatim substrings of one sentence with a marked `[...]` elision; the other five quotes are single unbroken substrings.

| Bead | Producer `green` row | UTC | Collected `delivered` row quoted below |
|---|---|---|---|
| wb-bau | M:75112, ws-15, g10-work-s337 | 2026-11-11T04:24:31Z | M:75137 |
| wb-dc0 | M:75297, ws-03, g10-work-s338 | 2026-11-11T06:24:22Z | M:75358 |
| wb-f5y | M:75394, ws-02, g10-work-s338 | 2026-11-11T07:10:32Z | M:75402 |
| wb-x32 | M:75428, ws-01, g10-work-s338 | 2026-11-11T07:26:26Z | none in window (delivered later at M:75634, 2026-11-11T08:50:36Z, base `ce180d82`) |
| wb-y0n6 | M:75555, ws-08, g10-work-s338 | 2026-11-11T08:18:32Z | none in window (delivered later at M:75708, 2026-11-11T09:09:05Z, base `ce180d82`) |

**wb-bau — M:75137 `green` (also in M:75112 `result`):**

> Pass 1 (no build, receipt untracked) had 127 failed of 29287, all artefacts: missing dist, untracked-file git-vs-walk censuses, load timeouts.

Those 127 cases are a mixed-cause total, not 127 missing-dist failures. The second pass also changed the receipt's index visibility, so it is not a build-only experiment. That cut (`28dbfe4d`) was later refused at prep (M:75230, class R668 delivered contradiction) for an unrelated figure in its added receipt, whose line 31 stated 44 SITES rows where 35 were measured; the quoted pass-1 statement was not the refused claim.

**wb-dc0 — M:75358 `green`:**

> full default tier 578 files: 527 passed, 51 failed (127 cases), each a host-load timeout (load1 160-420) or a runner needing dist/ (no build step in a work worktree), none naming or reading the new files (the new file passed in it); with dist built the 7 no-dist files re-ran 185/200, the other 15 all 5000 ms timeouts

The seven-file rerun's 185 of 200 passing cases and 15 remaining timeouts do not provide a dist-only count for the original 127 failed cases.

**M:75297 `result` (producer):**

> full default tier 578 files: 527 passed, 51 failed (127 cases) - every failure a host-load timeout (46) or no dist/ (detached and furnace-vc4 runners; after npm run build those 7 files re-ran 185/200 with the remaining 15 all 5000 ms timeouts)

This is the one record of the five that names both suites of Finding 1, the detached and the furnace-vc4 runners. The unit of its "(46)" is unstated (46 + 7 does not equal the 51 failed files), so it yields no dist-only count either.

**wb-f5y — M:75402 `green`:**

> Before a later one-line assertion-form edit of the new test (result.skipped read as not.toHaveProperty): the 62-file claude-host targeted set read 61 green and detached-grants red only on 'Detached launch requires the compiled distribution' (05:41-05:43Z), then 89/89 alone after npm run build (05:48-05:52Z)

This is one red file in a targeted set of 62 files, followed by 89 of 89 cases passing alone after building. The same record later reports 88 of 89 with one `DetachedTimingLapse`; building did not establish freedom from timing failures.

**wb-x32 — M:75428 `result`:**

> 82 receipt-reading files: the 7 that failed only on untracked paths/no dist/global testTimeout pass 287/287 with the paths staged and dist built

Again, the reported cure changes more than building. The seven files are a mixed-cause subset of 82, not seven independently attributed missing-dist files.

**wb-y0n6 — M:75555 `result`:**

> One full default tier pass (07:36-07:46Z, load1 200-400): 184 failed | 29047 passed - one defect of this cut [...], the rest load timeouts (STACK_TRACE_ERROR), dist-not-built detached launches and walk-vs-tracked censuses naming only the untracked receipt.

The `[...]` marks an omitted parenthetical that describes that cut's own defect; the row's full text stands at M:75555. It is omitted because the wb-pfxo.1 historical-claim census on trunk (pin A2) judges every line under this directory, and the parenthetical names the sibling tool as a standalone word beside a defect word with no release token, sha or receipt path on the line.

This reports mixed failures again. No count for its missing-dist subset is supplied. The five bead statements expand the initial three-bead lead; the denominator is specifically the 22 beads with `green` rows, not all active beads or all lane seats in the window.

## Suggested fixes, cheapest first

These are proposals, not claims of implemented or measured cures.

1. Update the Commands and Releasing guidance in `AGENTS.md`, plus `CONTRIBUTING.md`, to require `npm run build` before default-tier testing in fresh worktrees, or point the Commands section at the Forge gate that `AGENTS.md:167` already names (`forge.toml:9` builds before test). Remove or qualify the line-56 restriction. Explain that targeted detached/runner suites also need compiled output.
2. Make the npm check/test entrypoint either ensure current build output or fail early with one explicit prerequisite diagnostic. Avoid rebuilding on every source-only targeted test when it is unnecessary; avoid checking only existence if stale output would be misleading. Review `prepublishOnly` ordering too. If `check` changes, `.github/workflows/ci.yml:18-22` mirrors its steps one per line and would need the same edit.
3. Add a regression witness in an isolated fresh worktree: prerequisites satisfied, compiled output absent, then the documented command sequence. Verify that its first default-tier run reaches the real detached tests without a missing-dist failure. Preserve a negative control that rejects missing or invalid compiled-host identity. If maintainers choose a source-only mode, label omissions and keep the complete gate's real-host coverage mandatory; the live-tier precedent does not justify silent skips.

## Positives worth protecting

- **CONFIRMED (source):** `forge.toml:9` already orders `gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]`. Commit `1fc74f087ea91f25955b10871eb902b492f67522` changed that order on October 15. Its body states: "Building before testing makes the gate self-sufficient on clean checkouts without weakening or skipping any test." This is useful precedent for the npm path, not proof that every gate now passes.
- **CONFIRMED (source):** the excluded live suite's `test/workbench-detached-control-live.test.ts:56` error says `run npm run build first (honest unavailability, not a skip)`. It names the next action while refusing to manufacture coverage.
- **CONFIRMED (source):** detached-grants deliberately runs a compiled child rather than replacing execution with a mocked success. Its header quoted above identifies the real execution to retain.

## What I did not establish

- **UNDETERMINED:** independent installed-binary reproduction and exact runtime-byte identity. Missing evidence: a launch/test transcript from an attested built installation at the pin. The assigned source pin and package version are disclosed separately from that proof.
- **UNDETERMINED:** exact per-case missing-dist counts, total wasted time, and whether the seats omitted the build because they followed `AGENTS.md`. Missing evidence: original per-case reports and command transcripts with the seats' build decisions. Ledger summaries confirm what was reported, not that causal attribution.
- **UNDETERMINED:** whether CI encountered this failure. `.github/workflows/ci.yml` at the pin (blob `8d55222fd3c0`, 80 lines) triggers only on `master` (`:5`, `:7`), not on the program trunk, and carries no build step in 3 of 3 jobs: 0 `npm run build` lines; `npm run test` at `:22` after `npm ci`, `npm run lint`, `npm run typecheck` and `npm run typecheck:test` (`:18-21`); `npx vitest run --reporter=dot` at `:59` and `:80` in the two compat jobs (`:53-59`, `:74-80`); while `AGENTS.md:44` labels `npm run check` "(what CI runs)". I infer no CI outcome from that shape; the missing artifact is the fork's Actions run list for `master`. The read-only `gh run list` attempt failed at exit 127 because `gh` was absent (`command -v gh` rc 1 again at the fix stage).
- No symlink explanation for wb-lri is claimed. `packageRoot()` resolves the root; the candidate's broad symlink-path explanation was not established. No count of all dist-dependent tests is claimed: text matches include passive rosters and fixtures. Some tests deliberately handle an absent dist, such as the virtual overlay documented at `test/workbench-env-scrub-census.test.ts:95-97` and the `it.skipIf(!built)` cases in `test/workbench-headless-census.test.ts:411,420,438`.
- Docs-only draft; no build or complete gate run. The feedback linter checks filing shape, not claim correctness (`feedback-lint.py --strict` on this text: 0 findings, 0 warnings, rc 0). Census effect was checked only for pin A2 of the wb-pfxo.1 historical-claim census, which judges every line under this directory. At the fix stage, in a detached worktree of the pin with this file copied in and intent-to-added (the rig clone's `node_modules` symlinked in, vitest 4.1.10, because `npm ci` did not finish inside a 120 s box at load1 above 1000), that leg read `Tests 1 passed | 26 skipped (27)`, rc 0, over this text at 2026-11-11T10:17Z, and `Tests 1 failed | 26 skipped (27)`, rc 1, with the finding at `new-feedback/<this file>:120` and verdict `unidentified`, over the pre-fix draft that still carried the unelided parenthetical, so the leg did read the file; the workflow's verify stage had measured the same pair on the elided line in a private `npm ci` clone of the pin. The other censuses that read this directory and the full default tier did not run on this text. Nothing staged, committed, or pushed. Delivery remains the later workflow stage's responsibility on `machine/flywheel/feedback-2026-11-11`, never directly to program trunk.
