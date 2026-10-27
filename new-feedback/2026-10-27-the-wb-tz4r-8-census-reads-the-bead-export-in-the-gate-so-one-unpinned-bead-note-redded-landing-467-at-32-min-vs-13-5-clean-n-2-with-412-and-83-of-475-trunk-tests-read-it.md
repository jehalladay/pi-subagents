# the wb-tz4r.8 census reads the bead export in the gate so one unpinned bead note redded landing 467 at 32 min vs 13.5 clean, n=2 with 412, and 83 of 475 trunk tests read it

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the orchestrator seat whose machine staged, gated, cured and folded landing 467 under standing rule 22; that machine wrote the ledger rows and envelopes quoted below, and this agent re-read them read-only rather than re-running anything.
**Date:** 2026-10-27 (operation window 2026-10-26T07:30Z..2026-10-27T08:00Z; dispatch stamp 2026-10-27T08:02Z; every count below re-derived between 08:20Z and 08:45Z, then re-derived again at ~09:20Z after a two-lens verification pass that corrected two line anchors, one hop row, one offset distance, one line cite and split one compound finding — corrected in place, not appended, because this file was still uncommitted)
**`pi-subagents` revision:** installed tool pin `workbench/implementation-program@46ab74f5cc678e565fdc4d851f99e10d1f649309`, which is what `git rev-parse origin/workbench/implementation-program` printed after `git fetch -q origin` in the rig clone at ~08:20Z, so the installed pin and the source sha coincide; every source byte below was read with `git show 46ab74f5cc678e565fdc4d851f99e10d1f649309:<path>`, `git grep … 46ab74f5cc678e565fdc4d851f99e10d1f649309` or `git ls-tree … 46ab74f5cc678e565fdc4d851f99e10d1f649309`. The rig clone's checked-out HEAD is `188ae59` (2026-10-22T06:34:53Z), 886 commits behind the pin (`git rev-list --count HEAD..origin/workbench/implementation-program`). The remote-tracking ref kept moving while this file was written and reviewed, because land-prep lanes fetch into this clone's object store: `d183c0d098335dd42807805be88748427f5300bd` at ~08:45Z (3 commits past the pin; `git diff --stat` between the two over every file cited here named only `.beads/issues.jsonl`, 9+/8-), and `c612d801824ac77ba4312c94a0ffd45aae4f41c6` at 2026-10-27T09:27:34Z (10 commits past the pin, subject `ledger: close wb-h55d .. wb-dwa9 (landings 481..482, batch B481-482-6412809-t1, merge 4384ed95)`); `git diff --name-only 46ab74f5 c612d801` names 10 files — `.beads/interactions.jsonl`, `.beads/issues.jsonl` (the exports every landing rewrites, Finding 2; the rows this file quotes are read at `2ca729e`, `f49feada` and the pin, not at the moving ref) and `test/fixtures/rf-inclusion-diagnosis-roster.json`, `test/fixtures/rf-plan-basis-echo-roster.json`, `test/fixtures/rf-read-status-upgrade-roster.json`, `test/fixtures/rf-render-id-authority-roster.json`, `test/workbench-rf-inclusion-diagnosis.test.ts`, `test/workbench-rf-plan-basis-echo-census.test.ts`, `test/workbench-rf-read-status-upgrade-census.test.ts`, `test/workbench-rf-render-id-authority-census.test.ts` — none of the source files cited here (`forge.toml`, `package.json`, `package-lock.json`, `vitest.config.ts`, `AGENTS.md`, the two censuses) differs between the pin and that ref, and Finding 5's 475/83 counts are unchanged at `c612d801` (re-measured). The committer re-runs that one diff in the detached worktree at commit time and pastes the sha it held for.
**`forge` revision:** `0.2.1`, `envelope.provenance.revision` = `c0f93b3c5d18`, `contract_version` = `result-envelope/v1`, read from both landing-467 `gate.json` envelopes; `gate-judge` `1.1.0` from `judge.json`. Producer-recorded provenance, not a local harness run.
**`vitest` revision:** `4.1.10` — `package-lock.json:5281-5282` at the pin reads `"node_modules/vitest": {` / `"version": "4.1.10",`; the cure receipt `/tmp/fw-467-census-rerun.txt` reads `RUN  v4.1.10`; the rig clone's `./node_modules/.bin/vitest --version` printed `vitest/4.1.10 linux-x64 node-v24.20.0`.
**Machine evidence revision:** `machines/flywheel/ledger/metrics.jsonl` (24,781 rows at ~08:25Z; 24,933 at the ~09:20Z re-derivation, every window count identical) and `machines/flywheel/BOUNDARY.md` (8,330 lines) read read-only with `python3 -I`; the ledger's `landing` field is mixed str/int and was coerced with `int()`; `machines/flywheel/state/gate-queue/` (98 entries) read ~08:36Z.
**Method:** read-only re-derivation. `git show` / `git grep` / `git log` / `git ls-tree` at the pin in the rig clone after `git fetch -q origin`; `python3 -I` filters over the ledger and BOUNDARY.md with inclusive UTC bounds; `git show --name-only` on every in-window `fold-done` hop sha; `json.load` of the two landing-467 land-prep envelopes under `/tmp` and of the preserved landing-412 artifact under `~/s3/artifacts/flywheel/land-prep/2026-10-25-wb-48r6-try1/`; a Python port of the census's four mention regexes and its marker and pin regexes over one export row (the first family's variable-width lookbehind, which Python's `re` lacks, emulated by a prefix check on each candidate match). No `bd` command, no gate run, no test run against trunk; two probes of this draft itself in detached worktrees at the pin (the second over the corrected bytes, with a kept receipt) are reported in the Postscript.
**Scope:** feedback about pi-subagents' gate surface — the landed census `test/workbench-ri-decision-seed-claim-census.test.ts` (bead wb-tz4r.8) reading the tracked store export `.beads/issues.jsonl` inside the gate's default `test` step — not about the posture that census guards (which it guarded correctly here), not about the cut it redded (`wb-ilmy`, innocent), and not about the bead whose note it judged (`wb-5qrd`).
**Prior art:** none on this mechanism at the pin. `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` = 18 entries (README + 17 files). Filename greps at the ref: `export` 0, `note` 0, `unpinned` 0, `R796` 0, `R794` 0, `tz4r` 0, `issues` 0, `hop` 0, `census` 5, `bead` 3, `pin` 1, `marker` 2 (the `census`/`bead`/`pin`/`marker` hits are the docs09 timing family, the receipts-index file and the detached-timing positive — read by name, none about the export). Body grep `git grep -il -E 'tz4r|bead export|issues\.jsonl|unpinned|R796|R794|\.beads' origin/workbench/implementation-program -- new-feedback/` hits 5 files; contexts read at the lines it printed: the 2026-10-21 census-config file (:100, a path in a listing), the 2026-10-24 docs09 CORROBORATION (:41-46, a landings table naming wb-tz4r.3-.7 as landed beads), the 2026-10-25 detached-timing positive (:5, a revision line), the 2026-10-25 docs09 file (:88 a `git grep` count line, :215), and the 2026-10-25 a2-seam file (:7, :14, :103-114, :152, :172 — the export as a scanned surface of a different census, with wb-913h named as adjacent). None states that the export is a gate input rewritten per landing or that a foreign note reds a landing. The two files on the unmerged `origin/machine/flywheel/feedback-2026-10-26` (6855290, `git merge-base --is-ancestor` rc 1) are the docs09 n=44 CORROBORATION and a typed-record positive — other themes. Nearest sibling: the a2-seam file (a census red reaching a lander without naming its duty); same reader, different census, different surface, so this is a new finding, not a corroboration.
**Delivery:** pending — a docs-only one-file commit on `machine/flywheel/feedback-2026-10-27`, cut from a detached worktree of `origin/workbench/implementation-program`, header `docs(new-feedback): ` + this file's title + ` (pi-subagents)`, with the gate waiver (docs-only, no gate run) disclosed in the commit body as this directory's README and the standing operator direction require; the program owner lands it. At write time this draft sits uncommitted in the rig clone.

## Summary, with numbers

All 37 of 37 landings in the window (440-476) passed their land-prep gate, and the machine landed each itself (standing rule 22). One of the 37, landing 467 (`wb-ilmy`, a two-file test cut), first ran **REAL RED** on a test its cut did not touch: pin A3 of the landed wb-tz4r.8 census read `.beads/issues.jsonl` as of the landing-466 hop and failed with the single finding `wb-5qrd .notes: unpinned`. `wb-5qrd` is a bead another actor had created 14 min earlier (04:29:37Z) and a work seat had claimed (04:33:39Z); its 13,134-character notes field carried one mention of a guarded capability family and one marker word (`gated`) and no pin — the marker at offset 10,702, the mention 573 characters later at offset 11,275 of 13,134 — and the census judges the whole field as one window. The export the gate read was the one the landing-466 HOP committed at 04:40:58Z (`2ca729e`, `ledger: close wb-s4j3`); 37 of 37 in-window `fold-done` hop commits rewrite that file, so every landing's `test` step reads the store as the previous landing closed it, plus whatever any seat wrote in between.

Cost, from the producer's own rows: landing 467 took 32 min 15 s from `landing-staged` (M:24123, 04:41:13Z) to FOLD (M:24196, 05:13:28Z) against 13 min 30 s and 13 min 26 s for its clean neighbours 466 and 469 (468: 17 min 17 s, with a register-routed census red); one 10 min 16 s land-prep envelope was discarded, and the cure — one appended paragraph carrying the marker and the pin, `bd export`, a 2.65 s file-alone census re-run, a ledger hop `f49feada` touching only `.beads/issues.jsonl`, a hop-fold and a relaunch — took 7 min 40 s from the red envelope (04:54:06Z) to the relaunch (05:01:46Z). That hop is the only one of 76 first-parent trunk commits in the window that is neither a merge (38 by parent count: the nine for landings 440-448 carry `land-prep shadow merge: … (local object, never pushed)` subjects, the 29 for 449-477 `landing N:` subjects; landing 477's merge `d3bb37f` at 07:56:27Z is inside the window while its hop `f58ec15` at 08:07:23Z and its `fold-done` row are not, which is why 38 merges sit beside 37 landings) nor a `ledger: close` hop (37).

This is the second realized instance: landing 412 (2026-10-25) held REAL RED on the same pin with `wb-q9z5 .notes: unpinned` (preserved `gate.json`) and was cured by the owner's ledger hop `b7553f2`, also `.beads/issues.jsonl` only. The class is wider than one census: at the pin 83 of 475 `test/*.test.ts`/`*.census.ts` files name `issues.jsonl` on a code line and each carries a file-read call, 8 of those carry the `unpinned` verdict word, 21 walk `new-feedback/` (this file is a scanned surface), and 62 of the 98 gate-queue entries at 08:36Z touch an export-reading trunk test. The admitting form (marker + pin) is spelled in 24 tracked files at the pin — 23 under `test/` plus the export rows it already cured — and in 0 files under `docs/` or at the root; `AGENTS.md:191` calls the export "a passive export". The behaviour is the census's stated whole-tree discipline (:18), so this is filed as friction with a measured cost, not as a bug; Findings 1-5 and 7 are CONFIRMED (Finding 7 with an armed control), Finding 6 (that the other seven `unpinned` censuses gate foreign rows the way A3 does) is PLAUSIBLE, and Finding 8 (a docs-surface sibling at landing 401) is PLAUSIBLE.

## Finding 1 — the gate's default `test` step runs the wb-tz4r.8 census, and its pin A3 asserts an empty finding list over every export row, not only the seven owner filing rows — **CONFIRMED**

The gate (`forge.toml:9` at the pin) is `gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]`; `forge.toml:16-17` reads `[build.commands.test]` / `command = "npm run test"`; `package.json` `scripts.test` is `vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions`; `vitest.config.ts:17` reads `include: ["test/**/*.test.ts"],` and its `exclude` list (:27) does not name the census. The census is `test/workbench-ri-decision-seed-claim-census.test.ts`, 1,247 lines, header `:2` containing `, the standing-posture census`. It reads the store export:

```
test/workbench-ri-decision-seed-claim-census.test.ts:145   const BEAD_EXPORT = ".beads/issues.jsonl";
test/workbench-ri-decision-seed-claim-census.test.ts:227   const EXPORT_FLOOR = 600;
test/workbench-ri-decision-seed-claim-census.test.ts:229   const FILING_ROWS: readonly string[] = ["wb-tz4r.1", "wb-tz4r.2", "wb-tz4r.3", "wb-tz4r.4", "wb-tz4r.5", "wb-tz4r.6", "wb-tz4r.8"];
```

The header states the pin (`:63`): `A3 every export string value naming a family admitted, and every filing row judged`. The reader (`:580-592`) walks every row and every string value, and judges the whole value as one window:

```
580  function exportFindings(data: BeadExport): { judged: Set<string>; findings: string[] } {
583    for (const row of data.rows) {
584      for (const value of row.values) {
585        if (mentionsOf(value.text).length === 0) continue;
586        judged.add(row.id);
587        const verdict = verdictOf(value.text);
588        if (verdict !== "admitted") findings.push(`${row.id} ${value.at}: ${verdict}`);
```

`:483` `type Verdict = "admitted" | "unmarked" | "unpinned";` and `:502-506`:

```
function verdictOf(window: string): Verdict {
  const marked = MARKER.test(window);
  if (marked && PIN.test(window)) return "admitted";
  return marked ? "unpinned" : "unmarked";
}
```

Pin A3 (`:1037-1044`) then requires every finding gone, whichever row produced it:

```
  A3: async () => {
    const { judged, findings } = exportFindings(beadExport());
    const reading = { filingRowsJudged: FILING_ROWS.filter(id => judged.has(id)), findings };
    expect(reading, "every export string value naming the capability carries a marker and the pin").toStrictEqual({
      filingRowsJudged: [...FILING_ROWS],
      findings: [],
    });
```

So a string value of any bead that names one of the four mention families (`:196-201`) with a marker word (`:203-205`: `"proposed", "seed only", "unshipped", "not shipped", "shipped: no", "gated", "unsupported", "not supported", "not runnable"`) and without the pin `485f3615db1e` (`:148`, `:208`) fails the gate's `test` step. The export at the pin has 879 rows (`git show …:.beads/issues.jsonl | wc -l`), 22 of which carry the pin string. The header says the whole-tree reading is the point (`:17-18`, one sentence wrapped over two comment lines: `:17` ends `so row` and `:18` reads `C's whole-tree scan holds over these two files with no path excluded (the wb-tz4r.1 discipline; R-COMPOSED names its cost).`).

## Finding 2 — every landing's HOP commit rewrites `.beads/issues.jsonl`, so each gate reads the store as the previous landing closed it, and any actor's field written in between is a gate input — **CONFIRMED**

Ledger `fold-done` rows in the window: 37, landings 440-476 (M:22834 to M:24652). For each row's `hop` sha, `git show --name-only` names `.beads/issues.jsonl`: **37 of 37** (every one also names `.beads/interactions.jsonl`). The first and last:

```
1fd34a3  2026-10-26T20:20:46Z  ledger: close wb-w3tz (landing 440, merge 20a13c55)
e811dbb  2026-10-27T07:20:34Z  ledger: close wb-w1kd (landing 476, merge 9466871f)
```

The hop landing 467's try 1 was gated against (`landing-gate-try` M:24157, field `hop`):

```
$ git show --stat 2ca729e31ecab9b5e3d5dfa97d3d3169d2465729
2ca729e31ecab9b5e3d5dfa97d3d3169d2465729 2026-10-27T04:40:58Z
ledger: close wb-s4j3 (landing 466, merge b084f54a)
 .beads/interactions.jsonl |  2 ++
 .beads/issues.jsonl       | 15 ++++++++-------
```

`git log --first-parent origin/workbench/implementation-program --since=2026-10-26T07:30:00Z --until=2026-10-27T08:00:00Z` lists 76 commits: 38 merges by parent count (nine whose subjects read `land-prep shadow merge: wb-… onto … (local object, never pushed)`, landings 440-448; 29 whose subjects read `landing N: wb-…`, landings 449-477 — landing 477's merge `d3bb37f` 07:56:27Z is in the window, its hop `f58ec15` 08:07:23Z is not), 37 single-parent `ledger: close …` hops, and 1 other single-parent commit — the cure hop `f49fead 2026-10-27T04:59:59Z ledger: pin wb-5qrd notes (R796 cure before landing 467: …)`. The bead whose field redded 467 did not exist in the export at the landing-465 hop (`570ebfd`) and is present at the landing-466 hop (`2ca729e`): `created_at` `2026-10-27T04:29:37Z`, `updated_at` `2026-10-27T04:33:39Z`, `status` `in_progress`, `assignee` `flywheel`; the seat's claim row is M:24101 (`kind` `claim`, `bead` `wb-5qrd`, `seat` `ws-04`, `utc` `2026-10-27T04:33:52Z`). The try-1 gate started 2 min 52 s after the hop that exported it. `AGENTS.md:191` at the pin describes the same file as `**Architecture in one line:** issues live in a local Dolt DB; sync uses \`refs/dolt/data\` on your git remote; \`.beads/issues.jsonl\` is a passive export.`

## Finding 3 — landing 467 ran REAL RED on an untouched test, was cured by one appended paragraph in a ledger hop, and cost 32 min 15 s staged-to-FOLD against 13.5 min for its clean neighbours — **CONFIRMED**

The cut: `wb-ilmy` tip `71527cfffe2cc888d27f1fedf849f54f4c7a178f`; `git diff --name-only $(git merge-base 71527cff… 2ca729e…) 71527cff…` prints exactly `test/fixtures/rf-assembly-handoff-roster.json` and `test/workbench-rf-assembly-handoff-census.test.ts` — neither the census nor the export. The census commit `86f44c6` (2026-10-25T07:49:40Z) is not in the cut's history (`git merge-base --is-ancestor 86f44c6 71527cff…` rc 1), though it is earlier by committer date than the tip (2026-10-25T11:39:18Z).

Try 1, envelope `/tmp/fw-landprep-wb-ilmy-20261027T044310Z-1441448/gate.json`: `status` `error`, `started_at` `2026-10-27T04:43:50.525253+00:00`, `completed_at` `2026-10-27T04:54:06.921510+00:00` (10 min 16 s); steps `lint 0 / 2,951 ms`, `typing 0 / 126,351`, `build 0 / 28,781`, **`test 1 / 385,164`**, `census 0 / 64,717`, `workbench-shell 0 / 910`, `package-smoke 0 / 4,229`. The reporter text inside it:

```
 FAIL  test/workbench-ri-decision-seed-claim-census.test.ts:1213:9 > wb-tz4r.8 … > A (a) census over docs/workbench (incl. feature-matrix.md, 06-capability-registry.md), receipts and beads: zero sentences claim RI <DI> runnable/supported; any mention carries 'proposed/seed-only' plus sha 485f3615db1e > A3
AssertionError: every export string value naming the capability carries a marker and the pin: expected { filingRowsJudged: [ …(7) ], …(1) } to strictly equal { filingRowsJudged: [ …(7) ], …(1) }

- Expected
+ Received

@@ -6,7 +6,9 @@
      "wb-tz4r.8",
    ],
-   "findings": [],
+   "findings": [
+     "wb-5qrd .notes: unpinned",
+   ],
  }

 ❯ A3 test/workbench-ri-decision-seed-claim-census.test.ts:1040:101
```

(the `…` between `wb-tz4r.8` and `> A (a)` elides only the describe title the census composes at run time, which this file does not spell; the lines quoted are verbatim.) `judge.json` in the same directory: `route` `full-rerun`, `verdictClass` `REAL-RED refusal`, `needsRuling` `true`, `exitCode` `8`, `realReds` = `["test/workbench-ri-decision-seed-claim-census.test.ts:1213 realAssertions 1 (diagnostics[0].message#L1462)", "test/workbench-ri-decision-seed-claim-census.test.ts:1223 realAssertions 1 (diagnostics[0].message#L1491)"]` (the `:1223` red is the census's own `records:` test, consequent on A3); the third red was a 5000 ms timeout in `test/workbench-inspector.test.ts:58`, held un-run (`holds`). Ledger M:24157 `landing-gate-try` `judgeRc` `"8"`, `route` `judged-rc-8`.

The field, measured by a Python port of the census's regexes over the `wb-5qrd` row at `2ca729e`: `notes` 13,134 characters, 1 mention (the fourth family, a hyphenated requirement-id prefix followed by a digit, `:199`) at offset 11,275, 1 marker word — `gated`, at offset 10,702 inside the phrase `local-only, not gated`, 573 characters before the mention — and no pin; `title` (300 characters) carries no mention. With the whole value as the window (`:587`) that is `unpinned`.

The cure, in the machine's own ruling (M:24177, `ruling-bound`, 05:02:01Z), quoted from the finding onward: `red with finding "wb-5qrd .notes: unpinned" - a later actor's note carried a marker but no pin; the wb-ilmy cut is innocent (its tip 71527cff predates the census commit 86f44c6 and touches neither file), so no park and no respin. Cure: one note line appended to wb-5qrd carrying the marker (proposed / seed only - unshipped) and the pin 485f3615db1e, bd export, census re-run green in the kept land-prep worktree (rc 0, receipt /tmp/fw-467-census-rerun.txt), ledger hop f49feada2bb8b1c82ccc0c04bc321444416a09f6 pushed fast-forward (remote verified), hop-fold M:24172 (CURRENT row 1006, base f49fead, rules-sha unchanged, pairwise all CLEAN), kept worktree removed; the loop relaunched and landing 467 re-PREPs on the cure base`. The receipt reads `Test Files  1 passed (1)` / `Tests  42 passed (42)` / `Start at  04:59:55` / `Duration  2.65s`. The hop:

```
$ git show --stat f49feada2bb8b1c82ccc0c04bc321444416a09f6
f49feada2bb8b1c82ccc0c04bc321444416a09f6 2026-10-27T04:59:59Z
ledger: pin wb-5qrd notes (R796 cure before landing 467: the landed wb-tz4r.8 census A3 read the export field as unpinned; marker + pin 485f3615db1e appended; standing rule 22 orchestrator cure)
 .beads/issues.jsonl | 11 ++++++-----
```

The appended text, read from the `wb-5qrd` row at `f49feada` (notes 13,489 characters, which end with it), closes `every capability mention in this bead's fields is proposed / seed only - unshipped; pin 485f3615db1e (wb-tz4r.8 census, A3 acceptance, R-FIELD whole-field form).`; at the pin the same row's notes have grown to 45,115 characters (`updated_at` 2026-10-27T08:08:27Z) and the phrase sits at offset 13,327, no longer at the end. Try 2, `/tmp/fw-landprep-wb-ilmy-20261027T050158Z-2153129/gate.json`: `status` `success`, 05:02:26Z to 05:12:44Z (10 min 18 s), steps `lint 0 / 1,981`, `typing 0 / 76,220`, `build 0 / 11,173`, `test 0 / 443,529`, `census 0 / 76,087`, `workbench-shell 0 / 1,115`, `package-smoke 0 / 5,618`; ledger M:24195 `landing-gate` `verdict` `pass`, `stageSeconds` `{"setup":12,"gate":660,"judge":0,"rows":0}`; M:24196 `gate-lock-released` `landing 467 folded: merge d14b1af + ledger cfb9e51`. BOUNDARY.md:8232 `## FOLD landing 467 (wb-ilmy) (2026-10-27T05:13:28Z, orchestrator via bin/fold.sh)`.

Timeline, all from ledger `utc` fields and envelope stamps:

| landing | staged (M:) | FOLD (gate-lock-released, M:) | staged to FOLD | land-prep envelope |
|---|---|---|---|---|
| 466 `wb-s4j3` | 04:27:37Z (M:24074) | 04:41:07Z (M:24121) | 13 min 30 s | 04:29:35Z-04:39:59Z, 10 min 24 s, success |
| **467 `wb-ilmy`** | 04:41:13Z (M:24123); relaunch 05:01:46Z (M:24175) | 05:13:28Z (M:24196) | **32 min 15 s** | try 1 10 min 16 s error; try 2 10 min 18 s success |
| 468 `wb-pwlq` | 05:13:36Z (M:24199) | 05:30:53Z (M:24257) | 17 min 17 s | 05:15:43Z-05:27:14Z, census step 1, judged `R-T7(5) register`, 41 s judge |
| 469 `wb-s6jw` | 05:31:00Z (M:24259) | 05:44:26Z (M:24300) | 13 min 26 s | 05:32:16Z-05:43:53Z, 11 min 37 s, success |

Red envelope completed 04:54:06Z, judge 04:54:15Z, census re-run 04:59:55Z, cure hop 04:59:59Z, hop-fold M:24172 05:00:22Z, relaunch M:24175 05:01:46Z: 7 min 40 s of cure on top of the discarded 10 min 16 s run.

## Finding 4 — n=2: landing 412 held on the same pin two days earlier with `wb-q9z5 .notes: unpinned`, cured by an owner ledger hop touching only the export — **CONFIRMED**

Ledger M:20402 (`landing-gate`, `bead` `wb-48r6`, `landing` `"412"`, `verdict` `held`, `verdictClass` `REAL-RED refusal`, `route` `full-rerun`, `steps` `lint=0,typing=0,build=0,test=1,census=0,workbench-shell=0,package-smoke=0`, `cutSurface` `['test/fixtures/ri-emitted-reference-roster.json', 'test/workbench-ri-emitted-reference-census.test.ts']`, first red `file` `test/workbench-ri-decision-seed-claim-census.test.ts` `line` `1112`). The preserved envelope `~/s3/artifacts/flywheel/land-prep/2026-10-25-wb-48r6-try1/gate.json` (135,660 bytes) contains the assertion message `every export string value naming the capability carries a marker and the pin: expected { filingRowsJudged: ` and exactly one finding string, `wb-q9z5 .notes: unpinned` (`grep -o … | sort | uniq -c` = 1). The cure:

```
$ git show --stat b7553f2
b7553f2cd64d5e6f306597c4517ee4c4b98577cd 2026-10-25T13:58:02Z
ledger: wb-q9z5 seed-claim marker+pin cure (R796, landing-412 hold)
 .beads/issues.jsonl | 17 +++++++++--------
```

BOUNDARY.md:7704 records it: `NEW BASE b7553f2 (owner ledger hop, no bead, no queue entry - owner ledger hop after landing 411 (R796 cure, pre-412): one note line appended to wb-q9z5 carrying the seed-claim census's marker + pin 485f3615db1e (R-FIELD admits the whole field), exported and pushed; the landing-412 take-1 REAL RED (hold M:20402, R794(a) class: a later actor's unpinned store write read by the landed wb-tz4r.8 census) was this export row, not the wb-48r6 cut; …)`. Two instances, two different beads, two different cuts, the same pin and the same one-line cure. Between the two gates the census moved under the pin: the judge's red anchor, the `it(pin, { timeout: 120_000 }, async () => {` registration line, sits at `:1112` in `86f44c6^` (the line M:20402 names) and at `:1213` at the pin; the A3 `expect(reading, "every export string value naming the capability carries a marker and the pin")` line moved from `:952` to `:1040` (both pairs by `git show <rev>:<file> | grep -n`). The mover is commit `86f44c6` (authored 2026-10-25T07:49:40Z, the wb-p46r follow-up), landed as the second parent of landing 449's merge `955897a` at 2026-10-27T00:25:31Z — after landing 412 and before 467.

## Finding 5 — at the pin 83 of 475 trunk test files name `issues.jsonl` on a code line and carry a file-read call, 8 of the 83 carry the `unpinned` verdict word, 21 walk `new-feedback/`, and 62 of 98 queued cuts (08:36Z) touch one of the 83 — **CONFIRMED**

At the pin, `git grep -l 'issues\.jsonl' 46ab74f5… -- 'test/*.test.ts' 'test/*.census.ts'` lists **83** files of **475** (`git ls-tree -r --name-only … -- test/ | grep -E '\.(test|census)\.ts$' | wc -l`). The instrument is a name match, so two checks bound what the title's `read it` rests on: in **83 of 83** the first `issues\.jsonl` line survives `grep -vE '^\s*(//|\*|/\*)'`, so the name sits on a non-comment line, and **83 of 83** also contain a file-read call (`readFileSync`, `readFile(`, `createReadStream`, `textOf(` or `readdirSync`). None of the 83 was run here. Of the 83, **8** also contain the word `unpinned`:

```
test/workbench-observation-class-census.test.ts
test/workbench-receipt-composition-census.test.ts
test/workbench-rf-graph-mutation-census.test.ts
test/workbench-rf-proposed-surface-census.test.ts
test/workbench-rf-tsx-worker-lifecycle-census.test.ts
test/workbench-ri-decision-seed-claim-census.test.ts
test/workbench-ri-inference-execution-census.test.ts
test/workbench-trainingworks-status-census.test.ts
```

`git grep -l 'new-feedback' … -- 'test/*.test.ts' 'test/*.census.ts' 'test/helpers/*.ts'` lists **21** files; the wb-tz4r.8 census is one (`:215` `const DOC_DIRS: readonly string[] = ["docs", "new-feedback", ".agents", ".pi", ".beads", "examples", "vendor"];`), so this feedback file is itself a surface its rows A and B read. Of the **98** entries in `machines/flywheel/state/gate-queue/` at 08:36Z, **62** have a cut surface (`git diff --name-only $(git merge-base <commit> origin/…) <commit>`) that touches at least one of the 83 export-reading trunk tests — the entries most likely to be re-cut if an export-reading census moves.

## Finding 6 — each of the other 7 `unpinned` censuses hard-asserts over export rows outside its own filing set the way A3 does — **PLAUSIBLE**

I read only the wb-tz4r.8 reader (`:580-592`, `:1037-1044`). The seven siblings share the verdict word and name the export (Finding 5), which is consistent with the same reader shape but is not the reader; which rows each asserts over, and whether a row outside its filing set fails its gate, is the artifact a consumer would check (each file's export reader). The runtime state not exercised: of the window's 18 `landing-gate-try` rows, 17 carry `judgeRc` 0 and one, M:24157 (wb-ilmy), carries 8 — the A3 red of Finding 3 — so no sibling census produced a judged non-zero red in the window, and both realized instances (467 and 412) are A3.

## Finding 7 — the admitting form a seat must write lives only in the census source and in the export rows already cured; the agent-facing doc calls the export passive — **CONFIRMED** (armed)

Arming control: `git grep -c '485f3615db1e' 46ab74f5…` lists **24** tracked files — `.beads/issues.jsonl` (22 rows) and 23 files under `test/` (the census, 11 sibling census tests, 11 roster fixtures). The same grep restricted to `-- 'docs/**' '*.md'` lists **0** files. `git grep -l -i 'seed only - unshipped'` outside `test/` hits only `.beads/issues.jsonl`. `AGENTS.md` at the pin mentions the export twice (:191, :248), both times as `a passive export`, and never as a gate input. So a seat that writes a note naming a guarded capability learns the required form only from a red gate (as both instances show), or from reading a 1,247-line test.

## Finding 8 — a docs-surface sibling: landing 401 held REAL RED on the H2 proposed-API census reading a `new-feedback/` file, cured by an owner docs hop — **PLAUSIBLE**

BOUNDARY.md:7628: `NEW BASE 4fdfe40 (owner docs hop, no bead, no queue entry - owner docs hop after landing 400 (R794 cure, pre-401): the a2-seam dogfooding feedback file's line 27 reworded per the H2 proposed-API census's another-phrasing rule + a dated SELF-REVISION block; the landing-401 REAL RED (hold M:19749) was this trunk doc, not the wb-ykl9 cut; 15/15 green file-alone on the cure tree owner-side)`. `git show --stat 4fdfe40` names one file (`new-feedback/2026-10-25-the-by-design-a2-seam-…md`, 6+/1-) with subject `docs(new-feedback): rephrase the a2-seam file so the H2 proposed-API census reads it clean (owner self-revision, landing-hold 401)`. Same shape — a landed census reading a non-code surface a later actor wrote, failing an innocent cut's landing, cured by a one-file trunk hop — on `new-feedback/` instead of the export. PLAUSIBLE because I did not read the landing-401 envelope (hold M:19749) or run that census.

## Evidence

- Source at `46ab74f5cc678e565fdc4d851f99e10d1f649309`: `forge.toml:9,16-17`; `package.json` `scripts.test`; `vitest.config.ts:17,27`; `test/workbench-ri-decision-seed-claim-census.test.ts:2,17-18,63,145,148,196-208,215,227,229,483,502-506,580-592,1037-1044,1195,1213-1223`; `.beads/issues.jsonl` (879 rows, 22 with the pin; the `wb-5qrd` row); `AGENTS.md:191,248`; `git log` of the census: `86f44c6` 2026-10-25, `ee9d31d` 2026-10-24, `63dcda1` 2026-10-23.
- Hop commits: `2ca729e31ecab9b5e3d5dfa97d3d3169d2465729` (landing 466), `f49feada2bb8b1c82ccc0c04bc321444416a09f6` (cure), `cfb9e516d618dff2d746137454e4190c2e535431` (landing 467, `.beads/interactions.jsonl` +1, `.beads/issues.jsonl` 2 lines), `b7553f2cd64d5e6f306597c4517ee4c4b98577cd` (412 cure), `4fdfe401a85d9e0f07e29d2a9b7e2f10c044560f` (401 cure), `e811dbb54347746f81a01eebe1aad41a74e013e0` (landing 476, the last in-window hop), `d3bb37feae6f5e89071974ded0c29e45c1c06513` (landing 477 merge, in window), `f58ec15dfb1572dc7bb34c2a23197f38d9b04dda` (landing 477 hop, after the window), `955897a2b2f2ea9fecd9781f359c6e76585dd622` (landing 449 merge, second parent `86f44c6`); 37 of 37 in-window `fold-done` hops name `.beads/issues.jsonl`.
- Envelopes: `/tmp/fw-landprep-wb-ilmy-20261027T044310Z-1441448/{gate.json,judge.json}` (try 1), `/tmp/fw-landprep-wb-ilmy-20261027T050158Z-2153129/{gate.json,landing-gate-payload.json}` (try 2), `/tmp/fw-467-census-rerun.txt` (cure receipt), `~/s3/artifacts/flywheel/land-prep/2026-10-25-wb-48r6-try1/gate.json` (412).
- Ledger rows (`machines/flywheel/ledger/metrics.jsonl`, line = M number): M:20402, M:22834, M:24019, M:24065, M:24074, M:24101, M:24116, M:24121, M:24123, M:24139, M:24157, M:24172, M:24175, M:24177, M:24195, M:24196, M:24199, M:24241, M:24255, M:24257, M:24259, M:24297, M:24300, M:24652. Window row kinds: `landing-gate` 37 (all `pass`), `landing-gate-try` 18, `landing-staged` 48, `fold-done` 37, `hop-fold` 1, `ruling-bound` 19.
- BOUNDARY.md: 7628, 7704, 8226 (`NEW BASE f49fead … R796 cure hop before landing 467 …`), 8232-8233.
- Live state: `machines/flywheel/state/gate-queue/` 98 entries at 08:36Z; 62 touch an export-reading trunk test.
- Probe receipt for this file's own scan (Postscript): `~/s3/artifacts/flywheel/feedback/2026-10-27-wb-tz4r8-export-census-feedback-probe/` — `vitest-21-files.txt`, `probed-draft.md`, `sha256.txt`, `probe-meta.txt`.

## Suggested fixes, cheapest first

1. **Let the A3 finding name its own cure.** The finding string (`:588`) already names the row and field; add the admitting form to it or to the assertion message at `:1040` — e.g. that the field needs one marker word from `MARKERS` and the pin `485f3615db1e`, in the same string value. Both cures so far were discovered by reading the census source; a lander who reads only the reporter block (the shape the a2-seam file already asked for) would then cure in one `bd` note without opening the 1,247-line file. No behaviour change.
2. **Say where seats read that the export is a gate input.** `AGENTS.md:191/:248` describe `.beads/issues.jsonl` as a passive export; one sentence there — any bead field that names a guarded capability carries a marker and that capability's pin, because landed censuses read the tracked export inside the gate — plus the list of the 8 `unpinned` censuses (or the grep that finds them) would reach every seat that loads the context file. Docs only.
3. **Make the foreign-row assertion a named residual instead of a hard red.** Keep A3 strict over `FILING_ROWS` (the owner filings, which the census controls) and report findings on other rows under a pinned quiet row, in the pattern the census already uses for its residuals (`:10-12`, R-RENDERED and R-COORDINATED), so a seat note degrades the posture record and is cured on the next landing instead of failing an innocent cut's landing. Alternatively read the export at the cut's merge-base rather than the live hop. This is an owner decision: it relaxes the whole-tree discipline (`:17-18`) the census was filed to enforce, and the same question applies to the other 7 `unpinned` censuses.
4. **Producer-side, for completeness (not a pi-subagents change):** the landing lane can run the 8 `unpinned` censuses file-alone on the hop before PREP — this one takes 2.65 s — and cure before spending a 10-minute gate. Named so the consumer knows the producer can absorb the cost if the repo chooses to keep the discipline as is.

## Positives worth protecting

- **The finding names the row and the field verbatim, and the vocabulary separates `unmarked` from `unpinned`** (`:483`, `:502-506`, `:588`: `wb-5qrd .notes: unpinned`). That is why the cure was one appended paragraph verified in 2.65 s, and why the machine could rule the cut innocent in the same breath (M:24177). A refactor that collapses findings to a count, or drops the field path, turns a 6-minute cure into a 13,134-character read.
- **R-FIELD whole-field admission.** The pin anywhere in the value admits every mention in it (`:587`: one `verdictOf` per value), so a cure never has to find the offending sentence; the two cures appended one line each (`b7553f2`, `f49feada`). Keep the window at the value, not the sentence, for export fields.
- **The census is a plain `.test.ts` that runs file-alone under the default config in 2.65 s** (receipt: `Test Files  1 passed (1)`, `Tests  42 passed (42)`, `Duration  2.65s`). A move into a census-config-only tier (the 2026-10-21 file in this directory records what a config-less run of a `.census.ts` does) would take away the fast verification that made the 7 min 40 s cure possible.
- **The discipline worked.** The field did name a guarded capability with a marker and no pin, written 14 minutes before the gate read it; the census caught it on the first landing after the export carried it, exactly as `:17-18` promise. This file asks for the cost to move, not for the reading to stop.
- **Hop subjects carry the landing and the bead** (`ledger: close wb-s4j3 (landing 466, merge b084f54a)`), which let me attribute every export state to a landing with one `git show` per hop and verify the 37-of-37 count without the ledger.

## What I did not establish

- I ran no gate and no trunk test; every duration is the producer's envelope or ledger stamp, and the 32-min and 13.5-min figures are staged-to-FOLD spans, not gate time alone (gate stage seconds: 466 743 s, 467 try 2 660 s, 468 819 s, 469 772 s).
- Which sentence of the `wb-5qrd` notes carried the mention and which actor wrote it (the row was created 04:29:37Z and updated 04:33:39Z by two different actions). My Python port of the census regexes found one fourth-family mention at offset 11,275 and the marker `gated` at `local-only, not gated`; I did not run the census's own `mentionsOf` over the field. Artifact: the census run against the `2ca729e` export.
- Whether the other 7 `unpinned` censuses and the other 75 export-reading tests assert over foreign rows (Finding 6). Artifact: each file's export reader.
- Landing 401's envelope (hold M:19749) for Finding 8; only BOUNDARY.md:7628 and commit `4fdfe40` were read.
- The gate-queue count (62 of 98) is a live directory read at one instant; the queue changed during this run (97 entries at the dispatch's scout, 98 at 08:36Z).
- No installed `pi-subagents` binary ran in this lane; the installed pin is the trunk sha the dispatch named and `git rev-parse` confirmed, not a `--version` print.

## Postscript — this file is itself a scanned surface

21 trunk tests at the pin read `new-feedback/`, the wb-tz4r.8 census among them (`:215`), and the landing-401 hold (Finding 8) was a feedback file. This file therefore avoids spelling the census's four mention families and the H2 census's seven name families (`test/workbench-tsx-h2-proposed-api-census.test.ts:167-175` at the pin), and names the guarded capability only as "the guarded capability" or by its pin. Probe: a detached worktree of this clone at the pin (`/tmp/fw-fb-c2-probe-a8ddce77-20261027`, `node_modules` linked from the rig clone, removed after the run) with this draft copied into its `new-feedback/` (19 entries there, 18 at the pin plus this one). `npm run build` in that worktree exited 2 on one type error (`src/workbench/hosts/furnace-hosted.ts(349,128): error TS2339`, the rig clone's `node_modules` being older than the pin's lock), so the probe is not a gate run. `vitest run test/workbench-ri-decision-seed-claim-census.test.ts test/workbench-tsx-h2-proposed-api-census.test.ts --expect.requireAssertions` (the two censuses that have held landings on these surfaces, env `VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 NO_COLOR=1`, `CLAUDECODE` unset) printed `Test Files  2 passed (2)` / `Tests  57 passed (57)` / `Duration  17.26s`, with `A1`, `A3`, `A4` and `C1` of the wb-tz4r.8 census green (42 tests, 3108 ms) and the H2 census 15 of 15. The other 19 `new-feedback/`-walking `.test.ts` files, run the same way on an earlier revision of this draft, printed `Test Files  19 passed (19)` / `Tests  745 passed (745)` / `Duration  25.44s`; after the two edits this draft then received (the Delivery line's header spelling, and this paragraph), all 21 files were re-run on the bytes whose sha256 begins `3b9eca4772616dbf`: `Test Files  21 passed (21)` / `Tests  802 passed (802)` / `Duration  24.57s`, 0 `AssertionError` lines, no line naming this file. Those three runs kept no artifact (that worktree was removed), so their counts rest on this seat's word. After the verification pass that corrected this file (Date line), the same 21 files ran once more over the corrected bytes, sha256 `c0502f6ec8422ca3…`, in a fresh detached worktree at the pin (`/tmp/fw-fb-fix-probe-a8ddce77-1793093321`, `node_modules` linked from the rig clone, no build, the same env), 09:28:42Z-09:29:09Z: `Test Files  21 passed (21)` / `Tests  802 passed (802)` / `Duration  26.24s`, 0 `AssertionError` lines, 0 ` FAIL ` lines, no line naming this file, vitest rc 0. That run's receipt — the vitest output, the probed bytes, their sha256, and the command with its file list — is kept at `~/s3/artifacts/flywheel/feedback/2026-10-27-wb-tz4r8-export-census-feedback-probe/` (`vitest-21-files.txt`, `probed-draft.md`, `sha256.txt`, `probe-meta.txt`). The bytes of this file that no run read are this paragraph from `Those three runs` to its end (the tail they did read said the same of its own last sentence), and the same 11 needle regexes (the four wb-tz4r.8 mention families, the seven H2 name families) match them 0 times and the whole file 0 times. Each probe worktree was removed after its run; a probe on a stale `node_modules` with a failed `tsc` (the first probe's `npm run build`; the second ran no build) is evidence that these 21 docs-walking files admit this text, not that the gate would pass. The remote-tracking ref moved 3 commits during the first run and 10 by the last re-derivation (revision line), and a sibling lane wrote a second 2026-10-27 file into the same clone's `new-feedback/` while this one was being drafted; neither was touched.
