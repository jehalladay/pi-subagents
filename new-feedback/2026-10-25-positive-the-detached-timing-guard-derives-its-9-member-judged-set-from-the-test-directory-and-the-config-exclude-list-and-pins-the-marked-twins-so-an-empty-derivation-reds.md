# positive - the detached-timing guard derives its 9-member judged set from the test directory and the config exclude list and pins the marked twins so an empty derivation reds

**From:** flywheel seat (Pi-Subagents Orchestration Engineer)
**Date:** 2026-10-25 (ledger numbers: window 2026-10-24T07:45Z to 2026-10-25T07:45Z)
**`pi-subagents` revision:** installed pin `workbench/implementation-program@b887fa2e9f581f9a6b1e9d47cb723029aae353ae`; every source byte below was read at that sha, not at the moving ref. The rig clone's reflog (`git reflog show --date=iso-strict origin/workbench/implementation-program`) holds the ref at `b887fa2` from the 2026-10-25T07:32:01Z fetch until the 08:27:50Z fetch moved it to `2982607784695e724024bbdc90d79a07199a359c` (landing 396; three commits past the pin, `e92e9599`, `f96c6d26`, `2982607`; `git diff --name-only b887fa2e 2982607` lists only `.beads/interactions.jsonl`, `.beads/issues.jsonl`, `test/fixtures/tsx-resource-closure-roster.json` and `test/workbench-tsx-resource-closure-census.test.ts`, so the guard, the helper, the sibling timing suite, `vitest.config.ts`, `src/workbench/hosts/local-detached.ts` and `new-feedback/` are byte-identical at pin and tip; `git merge-base --is-ancestor b887fa2e origin/workbench/implementation-program` returns 0). The rig clone's checked-out HEAD `188ae590` sits 550 commits behind the pin (`git rev-list --count HEAD..b887fa2e` = 550; 553 behind the live ref), so every quoted byte came from `git show` at `b887fa2e`, never from the working tree.
**Method:** read `test/workbench-detached-timing-guard.test.ts`, `test/helpers/detached-timing.ts` and `vitest.config.ts` with `git show` at `b887fa2e`; `git ls-tree` for the detached family; re-derived the detached `serial-leg`, `landing-gate` and wb-maza lifecycle rows read-only from the machine ledger `machines/flywheel/ledger/metrics.jsonl` with a bounded python pass over the window above. No test ran in this lane; the green and gate rows cited are the machine's own.
**Scope:** feedback about pi-subagents' own test and gate surface — the wb-maza detached-timing cure (landing 395) and the guard that keeps it — not about the workbench beads in its tracker. A positives file: it names the mechanisms a refactor would lose.
**Prior art:** none on this cure. Checked `git ls-tree -r --name-only b887fa2e -- new-feedback/` (15 entries, README.md included; 14 files without it) plus the branches `origin/machine/flywheel/feedback-2026-10-22` (tip `a02b6f1`; 15 entries incl. README) and `origin/machine/flywheel/feedback-2026-10-23` (tip `7aad71a`; 16 entries incl. README), 18 distinct names across the three refs: 0 filenames match detach, guard, twin or maza on any of them (nor at the live tip `2982607`, 15 entries). A body grep (`git grep -li detached <ref> -- new-feedback/`) hits 5 distinct files across the three refs (3 at `b887fa2e`, 2 on the 10-22 branch, 4 on the 10-23 branch): three use "detached" only for the detached worktree of the delivery and gate mechanics ("the 25 worktrees were detached at 25 cut tips", the 2026-10-20 npm-ci file, line 5; "in the detached worktree this file was written in", both 2026-10-23 files, line 5), the 2026-10-15 positive for "a prebuilt `dist` for the detached test" (line 20), and the 2026-10-24 CORROBORATION for `vitest.detached-control-live.config.ts` (line 146, beside its own worktree lines 5 and 170). None names pollFor, DetachedTimingLapse, the marked twins or wb-maza: `git grep -li -E 'pollFor|DetachedTimingLapse|DetachedMarked|wb-maza' <ref> -- new-feedback/` prints nothing on all three refs, and the same grep over `test/` at `b887fa2e` hits 5 files (the helper, the guard, the timing suite, socket-base, child-environ), so the instrument is armed. The timing-theme files (2026-10-20 five-trunk-tests, the 2026-10-21/23/24 census CORROBORATIONs) cover the census and default-tier 5000 ms reds, a surface this cure does not touch.

## Summary, with numbers

Landing 395 (wb-maza; merge `3114970d`, 5 files changed, 763 insertions, 62 deletions) gave the detached-* family strict timing markers and a guard that keeps the family on the cure's route. Four mechanisms earn a positive (five protected properties, listed under Positives worth protecting), each CONFIRMED from bytes at `b887fa2e`: (1) the guard derives its judged set — 9 of the family's 10 files at the ref — from `readdirSync` plus the `vitest.config.ts` exclude list, never a hand-typed roster; (2) it reads members as TypeScript syntax trees under rules G1-G4 and instrument-checks its own reader against a planted member that must yield exactly 7 findings; (3) the derivation is armed, so an empty read, a changed exclusion or a host-driving member that leaves the marked twins reds; (4) the lapse marker is judge-compatible by construction — a plain Error subclass, a `pollFor` whose lapse throws, and the product's two lapse sentences pinned verbatim and held against src by a sibling suite. The one thing not established is effect size: the merge commit was created 32 min before the window closed (committer date 2026-10-25T07:12:55Z against the 07:45:00Z close), and creation is not arrival on trunk — `landing-gate` row M:19361 at 07:30:42Z, hop `b887fa2e` at 07:31:29Z and the rig clone's reflog fast-forward to `3114970` at 07:31:32Z put the cure on trunk for the window's final ~13.5 min — so the window holds no post-landing gate activity: the two post-hop `gate-start` rows (M:19366 wb-yf50 07:33:20Z, M:19373 wb-wgsh 07:36:29Z) carry base `b1ce8c1e` (landing 392 hop) and the 07:31:10Z `gate-pass` M:19362 carries gateBase `44971fa9` (landing 390 hop), and `git merge-base --is-ancestor 3114970d <base>` returns 1 for both. In-window detached serial legs number 4 of 299 (socket-base n=3 totalling 136,180 ms; child-environ n=1 at 11,786 ms), and 0 of the 10 landing-gate rows with non-empty reds[] name a detached file — which the timeline keeps from being evidence either way.

## Finding 1 — the judged set is derived, never typed: 9 of 10 family files judged at `b887fa2e` — CONFIRMED

`test/workbench-detached-timing-guard.test.ts:41,55-57` at `b887fa2e` (the config import is line 37, `import config from "../vitest.config.js"`):

```
const FAMILY = /^workbench-detached-[a-z0-9-]+\.test\.ts$/;
...
const excluded = new Set((config as unknown as ConfigShape).test?.exclude ?? []);
const family = readdirSync(join(ROOT, "test")).filter(name => FAMILY.test(name)).sort();
const judged = family.filter(name => !excluded.has(`test/${name}`));
```

At the ref the family counts 10 files (`git ls-tree -r --name-only b887fa2e -- test/ | grep -c '^test/workbench-detached-'` prints `10`), and the default gate's exclude list (`vitest.config.ts:27`, 15 entries) holds exactly one of them, `test/workbench-detached-control-live.test.ts`, so the judged set holds 9. The header states the design at line 23: "The judged set is read from the test directory and the config, never typed here." A newly added `workbench-detached-*.test.ts` suite enters the judged set with no edit to the guard — unless it imports the marked twins, in which case the importers pin (lines 167-171) reds until the new member is added there; that exception is the arming Finding 3 depends on.

## Finding 2 — G1-G4 read each member as a TypeScript syntax tree, and an instrument check pins the reader to exactly 7 findings on a planted member — CONFIRMED

Header, lines 11-13 (the quote opens with the "For" that ends line 11): "For every member the default gate runs (test/workbench-detached-*.test.ts minus the exclude list of vitest.config.ts, the config the gate loads), read as a TypeScript syntax tree so comments and strings never count". The four rules as the header states them (lines 14-22, trimmed): G1 "no value import of launchDetachedWorkflow or connectDetachedWorkflow from src/workbench/hosts/local-detached (named, default, namespace, dynamic or require): a member drives hosts only through the marked twins"; G2 "no raw timer (the three timer globals, or an import of the timers modules): a timed wait is pollFor, and a held window is holdOpen"; G3 "no poll loop of the pre-cure shape: a counted `for` whose condition joins a fixed numeric bound with `&&`, or a loop whose condition reads a clock"; G4 "a hook that stops hosts (an afterEach that calls process.kill) passes HOST_HOOK_TIMEOUT_MS and settles its waits through reportAfterCleanup". The visitor implements each rule on `ts.createSourceFile` output (lines 100-152: dynamic `import()`/`require` loads at 131-135, timer globals at 137, the counted-for shape at 138-140, clock-reading loop conditions at 146-147, the afterEach checks at 141-145).

The instrument check (lines 202-229) feeds the reader a 13-line planted member and pins the exact output:

```
expect(reading.findings.map(finding => `${finding.rule} ${finding.at}`)).toEqual([
  "G1 planted.test.ts:1",
  "G1 planted.test.ts:2",
  "G2 planted.test.ts:5",
  "G3 planted.test.ts:6",
  "G3 planted.test.ts:7",
  "G4 planted.test.ts:11",
  "G4 planted.test.ts:11",
]);
```

The plant includes a comment naming setInterval and the host module, a string literal `"setImmediate(launchDetachedWorkflow)"`, and a type-only import element — none may yield a finding, so "comments and strings never count" is itself tested rather than claimed. A reader regression reds here instead of silently passing the members.

## Finding 3 — the derivation is armed: an empty read, a changed exclusion or a member that leaves the twins reds — CONFIRMED

Lines 158-163:

```
expect(family.length, "the family glob matched no suite").toBeGreaterThan(0);
// The one member the default gate excludes runs only as its own forge command (vitest.detached-control-live.config.ts).
expect(family.filter(name => !judged.includes(name))).toEqual(["workbench-detached-control-live.test.ts"]);
expect(judged.length).toBe(family.length - 1);
```

Lines 165-172 pin the twin importers to exactly three members:

```
expect(importers).toEqual([
  "workbench-detached-child-environ.test.ts:launchDetachedMarked",
  "workbench-detached-socket-base.test.ts:connectDetachedMarked+launchDetachedMarked",
  "workbench-detached-timing.test.ts:connectDetachedMarked+launchDetachedMarked",
]);
```

Header lines 23-25: "The members importing the marked twins (the two suites that drive real hosts, and the helper's own unit rows) are pinned, so a derivation that reads nothing, or a member that leaves the twins, reds." The guard cannot green by reading an empty directory: the family assertion reds first, and the importers pin reds when the derivation reads nothing (an empty list differs from the pinned three) or when a host-driving suite drops the twins.

## Finding 4 — the marker mechanism is judge-compatible by construction, and the rejected alternatives are on record — CONFIRMED

`test/helpers/detached-timing.ts` at `b887fa2e`, added by `7e9a1eb` (2026-10-24T15:08:08Z, "test(workbench): give the detached-* waits and the product's two lapses strict timing markers - budgeted pollFor, marked launch/connect twins, family guard (wb-maza)"; `git merge-base --is-ancestor 7e9a1eb b887fa2e` returns 0). Lines 49-53:

```
/** A lapsed wait bound, named with the strict marker. A plain Error, never an AssertionError, since the judge reads no
 * marker inside an AssertionError. */
export class DetachedTimingLapse extends Error {
  override readonly name = "DetachedTimingLapse";
}
```

`pollFor` (lines 95-104) throws its lapse — line 99, `throw new DetachedTimingLapse(` followed by a template string reading `exceeded its ... ms wait timeout` with the wait's name and budget interpolated — never a fall-through to a later read or assertion, which removes the pre-cure ENOENT-receipt shape the header describes at lines 8-9. `DETACHED_TIMING_LAPSES` (lines 38-47) pins the product's two lapse sentences verbatim ("Detached handshake timed out; invocation reserved and effects unknown. Do not automatically retry." and "Detached transport timeout; effects may be unresolved."), and line 15 states where they are held against the product: "test/workbench-detached-timing.test.ts pins the two sentences against src/workbench/hosts/local-detached.ts". The bytes that make that true, `test/workbench-detached-timing.test.ts:285-287` at `b887fa2e`:

```
it.each(["handshake", "transport"] as const)("the %s sentence is thrown verbatim by src/workbench/hosts/local-detached.ts, exactly once", kind => {
  const source = readFileSync(join(ROOT, "src", "workbench", "hosts", "local-detached.ts"), "utf8");
  expect(source.split(`new Error(${JSON.stringify(DETACHED_TIMING_LAPSES[kind].sentence)})`)).toHaveLength(2);
```

Each sentence occurs exactly once in `src/workbench/hosts/local-detached.ts` at `b887fa2e`: the handshake sentence at line 568, the transport sentence at line 594. Lines 16-17 of the helper record why vitest's own wait helpers were rejected, verbatim (the source's double quotes kept):

```
 * vitest's own wait helpers are not used: vi.waitFor, vi.waitUntil and expect.poll lapse as "Timed out in waitFor!",
 * "Timed out in waitUntil!" or an AssertionError, and the judge reads none of them as a strict marker.
```

The judge those comments name is the machine's reader, not the repo's: `machines/flywheel/bin/gate-judge.py` (machine repo HEAD `2400719`, file clean; last changed in `4d9602e`, 2026-10-22T03:10:16Z) states at lines 18-19 that a red is TIMING class "iff a strict text marker ('Test timed out in', 'Hook timed out in', exceeded.*timeout) sits in THAT red's failure block (never inside an AssertionError)", and its `MARKER_RES` list (lines 67-72) compiles exactly those three, the third as `re.compile(r"exceeded.*timeout")` — the shape `pollFor`'s lapse message carries (`exceeded its ${budgetMs} ms wait timeout`, helper line 99). A refactor that swaps the error class, edits a sentence, or moves the family onto vi.waitFor breaks exactly the property that judge routes on — and each such break lands on a pinned assertion rather than on silence.

## Finding 5 — the cure's effect size (a detached red-rate delta before and after landing) — UNDETERMINED

The measured timeline (ledger rows cited by M-number; commit stamps from `git log -1 --format='%H %cI %s'`):

- cut `7e9a1eb` committed 2026-10-24T15:08:08Z; wb-maza `delivered` row M:16767 at 15:08:18Z; complete `gate-pass` row M:17568 at 20:18:28Z;
- merge `3114970d` ("detached-* tests: vitest strict timeouts for bare waits (R721 systemic cure) (wb-maza)") carries committer date 2026-10-25T07:12:55Z; `landing-gate` row M:19361 at 07:30:42Z; hop `b887fa2e` ("ledger: close wb-maza (landing 395, merge 3114970d)") at 07:31:29Z; `landable` row M:19364 at 07:32:51Z.

So the merge commit was created at most 32 min before the window closed (07:45:00Z minus 07:12:55Z = 32.08 min), it was on trunk for the final 13.5 min (hop `b887fa2e` at 07:31:29Z; the rig clone's reflog fast-forwarded `origin/workbench/implementation-program` to `3114970` at 07:31:32Z and to `b887fa2` at 07:32:01Z), and the window holds no post-landing gate activity to compare: the two `gate-start` rows after the hop (M:19366 wb-yf50 at 07:33:20Z, M:19373 wb-wgsh at 07:36:29Z) both carry base `b1ce8c1e0df944fd1fc4a9a8fb3b2d6fb5a863b2` (landing 392 hop) and the 07:31:10Z `gate-pass` M:19362 (wb-jdpn) carries gateBase `44971fa977154eb8eb8c9adff59e1f59b65e2147` (landing 390 hop); `git merge-base --is-ancestor 3114970d b1ce8c1e` and `git merge-base --is-ancestor 3114970d 44971fa9` both return 1, so no gate in the window ran on a tree containing the cure. What the window and the same ledger file do hold, by this seat's bounded re-derivation (window rows 3705 — rows whose `utc` key falls in [2026-10-24T07:45:00Z, 2026-10-25T07:45:00Z); 79 rows of the file carry no `utc` key, all at lines 68-430: 42 early rows stamp `ts` instead and 37 — 30 delivered, 2 blocked, 2 red, 1 gap, 1 claimed, 1 claim-skipped — carry no time key, so all 79 fall outside any utc filter; the dispatch packet's 3717 rows and 298 serial legs for the same window did not reproduce under this filter, so the numbers here are this seat's own. Serial-leg rows 299 summing 7,939,227 ms, 132.3 min — `ms`, `try` and `realAssertions` are JSON strings in all 299 serial-leg rows, so every sum below is after numeric coercion and an `isinstance` number filter sees 0 of them):

- in-window detached serial legs, 4 of 299: `test/workbench-detached-socket-base.test.ts` n=3 summing 136,180 ms (M:16912 at 57,093 ms, M:16983 at 44,586 ms, M:17585 at 34,501 ms; realAssertions=0 and try=1 on all three), and `test/workbench-detached-child-environ.test.ts` n=1 at 11,786 ms (M:18090, 2026-10-25T00:18:14Z);
- pre-window rows in the same ledger file: socket-base n=3 summing 129,627 ms, child-environ n=2 summing 24,485 ms;
- 0 of the 10 in-window `landing-gate` rows with non-empty reds[] name a detached file (their red files: censuses, the inspector suite, one attention bench), and 0 window rows carry "detached" anywhere in reds[].

Given the timeline, the absence from the red lists is NOT evidence of the cure's effect. The missing artifact: a post-landing ledger slice — the next 24 h window's serial-leg and landing-gate rows over the detached family, set against the two slices above.

## Suggested fixes, cheapest first

1. **None for the guard itself.** This file exists so the four mechanisms survive refactors; nothing here asks for a change to them.
2. **Settle Finding 5 in the next sweep.** After 24 h of post-landing operation, re-derive the detached serial-leg and reds[] rows and file the re-check; the delta needs only the two slices above plus the new one.

A request to extend the helper (or a load-scaled timeout) to the census files that dominate this window's red lists is a separate surface and a separate filing; this cure does not touch them.

## Positives worth protecting

- **The derived judged set** (`readdirSync` plus the real `vitest.config.js` import) — a refactor that inlines a hand-typed member list would silently skip every suite added after it.
- **The armed derivation** (family non-empty, the exclusion pinned to exactly one named file, the twin importers pinned to exactly three entries) — dropping any pin lets a derivation that reads nothing go green.
- **The plain-Error `DetachedTimingLapse` and the verbatim sentence pins** held against `src/workbench/hosts/local-detached.ts` by `test/workbench-detached-timing.test.ts` — an error-class swap or a sentence edit breaks the judge's routing, and these pins make it break loudly.
- **The instrument check** — the guard tests its own reader on a planted member, so a reader regression reds instead of passing the family vacuously.
- **The recorded rejections** (vi.waitFor, vi.waitUntil, expect.poll, each with the reason it fails the judge) — the header keeps the next well-meaning refactor from reintroducing them.

## What I did not establish

- Finding 5's delta; the missing artifact is named there (a post-landing ledger slice).
- No test ran in this lane (a docs-only filing seat). Every code claim rests on bytes read at `b887fa2e` via `git show`; the guard's green comes from the machine's own rows (wb-maza `green` M:16711, `gate-pass` M:17568), not from a run of mine.
- The guard's named residuals (header lines 26-30: a wait loop built on holdOpen or on an awaited read with no delay, a host call reached through a re-export or through the Pi tool, and the excluded control-live suite) — disclosed by the guard itself; whether any member exploits them went unprobed here.
- Whether the census files in this window's landing-gate red lists could use this helper, or need a different cure — not examined here; it belongs to the separate extension request.
