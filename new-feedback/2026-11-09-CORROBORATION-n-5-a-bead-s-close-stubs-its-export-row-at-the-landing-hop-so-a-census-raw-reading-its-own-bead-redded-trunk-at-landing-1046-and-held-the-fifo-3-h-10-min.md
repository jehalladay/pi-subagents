# CORROBORATION, n=5: a bead's close stubs its export row at the landing hop, so a census raw-reading its own bead redded trunk at landing 1046 and occupied the L1046 landing slot 3 h 10 min, 2 h 14 min of it under the R-B736 FIFO hold

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle; this draft reads producer records, not a new independent test execution.
**Date:** 2026-11-09 (dispatch stamp 08:25Z; evidence window 2026-11-06T07:52:00Z inclusive to 2026-11-09T08:25:00Z exclusive).
**`pi-subagents` revision:** installed operational tool pin, as assigned, = fetch-fresh trunk `origin/workbench/implementation-program` at `b8778933cba36a0be756cdc9172dd74ed040e83d`; source read at that same sha. `git fetch -q origin` exited 0; `git log -1` printed `2026-11-09T08:46:13Z ledger: close wb-uqax (landing 1071, merge 78abe8e5)`. No installed binary ran or printed a version in this draft lane: the operational pin is a trunk pin, not binary-build attestation. The clone's checked-out HEAD `188ae59016` was 4,761 commits behind the pin; it was neither advanced nor checked out anew.
**Earlier source pins:** the corroborated 10-27 file read `46ab74f5cc678e565fdc4d851f99e10d1f649309`; the 11-02 file read `5779ecaf116178b603edd10e40655bd3acf7c2a5`; the scout read `a70b3578ae49f67652a19c5861603b7157a9aba1`. Historical failure source = L1045 hop `e8a14621cad5c726bfff236f06e60fdca247fd88`.
**Method:** read-only re-derivation, window 72 h (the 11-07 and 11-08 dogfooding runs did not fire during the export-wall campaign; this is the catch-up window, not a 24 h sample). `git show`, `git grep`, `git ls-tree`, `git log`, `git rev-parse`, `git diff` at the explicit shas in my rig clone; `python3 -I` parses of the tracked export and shard, and the machine ledger; read-only land-prep reports and landchain receipts. No test, gate, bd command or store write ran. Strict feedback lint and a raw-bidi scan ran on this one draft file only. Two internal referents used below: *the packet* = the orchestrator's dispatch evidence packet for this cycle (Workflow task text, not a repo artifact; it is where the 107-file count and the M:60597..M:68732 bounds were stated); *the scout* = the read-only scout stage of this same dogfooding Workflow, whose draft of this finding read trunk at `a70b3578ae` (not a repo artifact; this file supersedes it, and Finding 4 corrects its introduction story).
**Machine evidence:** `/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/` is the read-only evidence root below. `ledger/metrics.jsonl` line number = `M:n`. At the window pass the ledger had 68,876 lines; the bounds re-derived to M:60594..M:68737, 8,144 rows, 60 `fold-done` rows, distinct landings 1005..1070. The packet (the orchestrator's dispatch evidence packet, defined in Method) stated M:60597..M:68732 / 8,136 rows and asked for the bounds to be recomputed; those stated bounds are not this filter's output. Source pin L1071 lies after the evidence window.
**Scope:** feedback about pi-subagents' test-time export-reader convention and landing compatibility, not about the guarded program, Workflow-tool replay semantics or the machine's state. The machine records supply realized consequences; the requested changes belong in this repo's contributor docs and test hygiene.
**Corroborates:** [`2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md`](2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md) — **STILL-TRUE** at `b8778933cb`, bounded to the export-moving/read-surface mechanism; other axes have individual verdicts below. `n=5` denotes the thread's recorded incidents: 412 and 467 (10-27), 754 and 755 (11-01), plus 1046 here, not five independent reproductions by this draft agent.
**Prior art:** fetched-ref listing at `b8778933cb` = 41 entries (40 files + README). Filename scan used `stub|compact|shard|export|issues-jsonl|reader|raw-read|fifo|1046|slu6|pl64|trackerexport|rehydrat|anchor|its-own-bead|close`; body scans for `stub row`, `STUB_FIELDS`, `trackerExportText`, `rehydrateTrackerExport`, `wb-slu6`, `wb-pl64`, `wb-00si`, `wb-tt43`, `landing 1046`, `tracker-export`, `issues-closed-2026`, `compaction`, `R-B736`, `e8a14621` each found 0 files in fetched `new-feedback/`. The one `own bead` hit concerned pending machine rule edits, not export compaction. Read the 10-27 and 11-02 thread files, plus headings and relevant mechanisms on the unlanded 11-04, 11-05 and 11-06 branches. Also scanned another seat's unlanded branch `origin/feedback/shift-left-research-engineer-2026-11-07` (`5e463083cf`): 4 `new-feedback/` files beyond the pin's listing (the 11-04 EISDIR, 11-04 n-4 refusal-ladder, 11-05 seat-token and 11-07 README-file-map files); `git grep -l -E 'stub row|STUB_FIELDS|trackerExportText|rehydrateTrackerExport|wb-slu6|landing 1046|compaction' origin/feedback/shift-left-research-engineer-2026-11-07 -- new-feedback/` printed 0 files, and the armed control (the same tokens over `qa/*` at the pin) printed 1 file, the module. No prior file states this close-to-stub mechanism. The sibling 11-09 positive draft concerns compaction receipts, not the census regression; it is not edited here.
**Ref drift:** by 09:20:43Z the ref had moved to `360fa73471bed51f7efe154e24a2b436fb398f33` (L1072). `git diff --name-only b8778933cb 360fa73471` lists the main export, November shard, interactions and a mechanical-descriptor test only. No `new-feedback/` change; the cited module, census and AGENTS blobs stay identical, as do 191/618, 107 and 188 reader instruments. This file retains its explicit launch pin.
**Delivery:** draft only, uncommitted and unpushed, as assigned. This one file lives under the rig's `new-feedback/`; a later delivery must use `machine/flywheel/feedback-2026-11-09` cut from a detached worktree, never check out or push trunk. Gate waiver disclosure for that later commit: docs-only, no forge gate run, no tests run, no hook bypassed. `core.hooksPath` unset; `.githooks` and `.gitmessage` absent in this clone.

## Why a second file rather than an edit

The earlier revision and its evidence remain untouched. This file adds exactly one thing, a new mechanism: a census's own anchor bead closes at its landing hop, losing body fields from the main export immediately after the gate admitted its full row. The thread already describes foreign-note changes; this episode needs no foreign writer. The realized slot-occupancy span (Finding 3) and the import-versus-raw-read reclassification of the packet's 107 files (Finding 5) are supporting measurements of that mechanism's cost and remaining surface, not further additions, and neither proposes the already-completed blanket reader swap again.

## What this adds

- **A new mechanism — CONFIRMED:** a non-stub-field anchor raw-reading its own bead becomes incompatible with the closed-row projection at its own closing hop. The cost and revision counts below characterize this mechanism, rather than restating the thread's foreign-note findings.

## Already filed — this corroborates, it does not restate

| Axis | Prior file and this file's addition |
|---|---|
| Export state changes beneath landed censuses; incidents 412/467 | Corroborated 10-27 file; here the change is row shape at the anchor's own close. |
| Note quotations also become mention rows; incidents 754/755 | `2026-11-01-CORROBORATION-n-4-the-skip-cache-census-makes-any-note-naming-a-family-a-mention-row-quotes-included-so-trunk-red-twice-in-24-h-and-5-held-gates-burned-16-648-gate-seconds.md`; not re-probed here. |
| 141 of 545 export-name test files; no realized cost in its 11-01..11-02 window | `2026-11-02-CORROBORATION-export-readers-grew-83-of-475-to-141-of-545-in-6-days-a-landed-census-reads-the-installed-tree-and-41-of-41-sweeps-say-unflagged-red-none.md`; a later window now has realized cost, not a refutation of that historical zero. |
| 175 of 585 export-name files and note-token parsing | `2026-11-05-CORROBORATION-a-landed-census-parses-the-seat-token-grammar-from-bead-notes-by-a-u1-medium-confirmed-literal-and-175-of-585-tests-read-the-export.md` on unlanded `origin/machine/flywheel/feedback-2026-11-05`; here 191 of 618 name the export, not all necessarily raw-read it. |
| Export approaches the GitHub wall | The 11-06 export-size file on unlanded `origin/machine/flywheel/feedback-2026-11-06`; this file does not repeat its size-rate projections. |

## Summary, with numbers

**CONFIRMED as recorded:** the L1045 hop closed wb-12x1 and replaced its 18-key full row (with description) by an 8-key stub (without description). The landed census required that description and raw-read the main export: its three outside-anchor cases failed, with 119 other cases passing. Two landing preps recorded `judgeRc` `8`; R-B736 ordered six held passes not to land before the cure. The L1046 slot ran from the first staging at 19:43:42Z to the cure's fold at 22:53:55Z: **3 h 10 min 13 s**, not three hours of test execution and not a controlled estimate of regression-only overhead. The explicit FIFO hold under the R-B736 `doNotLand` markers ran **2 h 14 min 8 s** of that span (M:66819 20:39:47Z to M:67273 22:53:55Z); first rc-8 prep to fold was 2 h 58 min 11 s. The cure merge changed one file, 3 insertions / 1 deletion, replacing the raw read with `trackerExportText`.

**CONFIRMED at source pin:** 1,238 of 1,238 closed rows in the 1,357-row main export hold only keys in the eight-name `STUB_FIELDS` allowlist (not every stub has eight keys). The packet's 107 alleged raw-reader files are 107 of 107 module importers: 69 name `trackerExportText`, 38 instead name `rehydrateTrackerExport`. Import presence does not prove all their read sites rehydrate: an aliased raw read still exists in the CAC-absence census but consumes only `id` and `title`, both retained fields. One closure receipt documents the route; no contributor convention statement was found by the armed route grep. A comprehensive raw-reader census or proof that no drift guard exists remains **UNDETERMINED / PLAUSIBLE**, not a zero extrapolated from import counts.

## Finding 1 — closing the anchor changes the row shape after admission — **CONFIRMED**

At `b8778933cb`, `qa/workbench/tracker-export.mjs:352`:

```js
export const STUB_FIELDS = Object.freeze(["_type", "id", "title", "status", "updated_at", "closed_at", "close_reason", "dependencies"]);
```

`:490-495` projects only those keys that the input row already has:

```js
function stubOf(value) {
  /** @type {Record<string, unknown>} */
  const stub = {};
  for (const key of Object.keys(value)) if (STUB_FIELDS.includes(key)) stub[key] = value[key];
  return stub;
}
```

`python3 -I` JSON parsing of `git show b8778933cb:.beads/issues.jsonl` printed:

```text
rows=1357 unparsed=0 closed=1238 closed_stub_only=1238 closed_nonstub=0
```

The scout sha `a70b3578ae` precedes one closure; this draft's count is not its 1,237. wb-slu6's current main row has seven keys (no dependencies key) and its full body is in the November shard. The exact transition responsible for this episode, parsed from `git show` at the two historical shas:

| Source state | wb-12x1 row | Description |
|---|---|---|
| L1045 merge `c9f9088fa5cd3281e7b25dbb786a6a8a0ea3b1c6` before the hop | `.beads/issues.jsonl:200`, 18 keys, status `in_progress` | String, 1,630 characters |
| L1045 hop `e8a14621cad5c726bfff236f06e60fdca247fd88` | `.beads/issues.jsonl:201`, eight keys, status `closed` | Absent |

The hop adds one wb-12x1 full row to `.beads/archive/issues-closed-2026-11.jsonl`; its main-row `closed_at` is `2026-11-08T19:41:57Z`. This is the specified projection, not loss of the archived body. M:61843 (`ruling-received`, shape) says, excerpt verbatim:

> every closed bead becomes a STUB row (id, title, status, closed stamp, close reason, dep edges - no description/notes bodies) so the graph stays resolvable in-repo

## Finding 2 — the landed census treats that stub as no anchor row — **CONFIRMED** source; **CONFIRMED as recorded** failure

Path spelling in this file uses `test/workbench-[mwi-docs remediation census].test.ts` for the literal producer path. This bracketed descriptive form avoids admitting a new literal census-name site into doc-walking tests. The ledger and artifacts retain the literal path. Source excerpts and error bytes below are otherwise verbatim.

At `e8a14621ca`, that census `:1272-1280`:

```ts
function exportRowOf(jsonl: string): ExportRow {
  for (const line of jsonl.split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; description?: unknown };
    if (row.id === BEAD && typeof row.title === "string" && typeof row.description === "string") return { title: row.title, description: row.description };
  }
  throw new Error(`${EXPORT} holds no ${BEAD} row`);
}
const exportText = (): string => readFileSync(join(ROOT, EXPORT), "utf8");
```

`:351` binds `BEAD = "wb-12x1"`, `:352` binds `EXPORT = ".beads/issues.jsonl"`. Cases at `:1614`, `:1618`, `:1660` call `exportText()` (respectively `exportAnchor(exportText())` and two `exportRowOf(exportText())` calls). A stub lacking description fails that return condition even though its id is present.

M:66740 (`red`, wb-js9a, ws-15, 20:04:42Z), verbatim result excerpt:

> Three outside anchor cases throw '.beads/issues.jsonl holds no wb-12x1 row': at e8a14621 the export keeps the closed wb-12x1 as a stub row with no description, and its full row sits in .beads/archive/issues-closed-2026-11.jsonl. The census as landed reads the same 3 failed | 119 passed at that tip.

M:66831 (`red`, wb-slu6, ws-09, 20:44:17Z) records a bare-trunk run, tree unchanged, with `3 failed | 119 passed (122)`. These are producer runs, not this draft agent's executions. A direct read of the r7th `judge.json` confirms its `realReds` array lists the three case lines as `serial red twice`; its `judge.serial-mwi-try2.log`, ANSI removed only for readability, says (excerpt: the `Error` line prints three times in that log, once per failed case; one is shown):

```text
Test Files  1 failed (1)
Tests  3 failed | 119 passed (122)
Error: .beads/issues.jsonl holds no wb-12x1 row
```

## Finding 3 — two rc-8 preps and a six-pass hold occupy a 3 h 10 min staged-to-fold span — **CONFIRMED as recorded**

The two `landing-gate-try` rows, field projections read directly:

| Row | UTC 2026-11-08 | Bead | Command id | judgeRc | hop |
|---|---|---|---|---|---|
| M:66717 | 19:55:44Z | wb-r7th | `cmd_835762b73984` | `"8"` | `e8a14621ca` |
| M:66811 | 20:36:35Z | wb-mqpz | `cmd_6c4be428166c` | `"8"` | `e8a14621ca` |

Their preserved `envelopePath` / `judgeReport` live under the machine evidence root:

```text
runtime/landprep/fw-landprep-wb-r7th-20261108T194353Z-516658/gate.json
runtime/landprep/fw-landprep-wb-r7th-20261108T194353Z-516658/judge.json
runtime/landprep/fw-landprep-wb-mqpz-20261108T202222Z-16040/gate.json
runtime/landprep/fw-landprep-wb-mqpz-20261108T202222Z-16040/judge.json
```

I read the r7th report and serial logs; the mqpz path and rc are read from M:66811, not independently re-parsed from that report. M:66819 (`ruling-bound`, R-B736, 20:39:47Z), verbatim excerpts:

> Reproduced serial-twice by two independent landing preps (mqpz cmd_6c4be428166c, r7th cmd_835762b73984)

> the 6 held passes (mqpz, 9v02, 6b3z, m83p, eiwp, jwc.7) carry doNotLand markers so the cure lands first; markers clear at its fold

M:66820 (`daemon-relaunch`, 20:40:25Z) says:

> relaunch under R-B736: the 6 held passes are marked, the loop idles until the census-reader cure (wb-slu6) passes its gate, then lands it first

Re-derived timestamp subtraction (`datetime.strptime`, no rounded input times):

| Measured span | Endpoints | Duration |
|---|---|---|
| L1046 first staging to cure fold (the title's span: slot occupancy) | M:66681 `landing-staged` wb-r7th 19:43:42Z → M:67273 `fold-done` wb-slu6 22:53:55Z | 3 h 10 min 13 s |
| R-B736 marker hold (the explicit FIFO hold on six passes) | M:66819 `ruling-bound` wb-slu6 20:39:47Z → M:67273 `fold-done` wb-slu6 22:53:55Z | 2 h 14 min 8 s |
| First rc-8 prep to cure fold | M:66717 `landing-gate-try` wb-r7th 19:55:44Z → M:67273 `fold-done` wb-slu6 22:53:55Z | 2 h 58 min 11 s |
| L1045 hop to L1046 fold | `e8a14621ca` committer 19:42:08Z → M:67273 | 3 h 11 min 47 s |
| Preceding hop gap | `0ba683612c97058782b0ecc97c9b9971e46818d3` 19:17:31Z → `16a699f789f4cef7978df532f73b23c499f22873` 19:29:30Z | 11 min 59 s |
| Next preceding hop gap | `16a699f789` → `e8a14621ca` | 12 min 38 s |

These spans have different endpoints; the neighbour rows are context, not controlled overhead baselines. The staged-to-fold span includes diagnosis, a superseded load-shaped ruling, cure authorship, gate, landing and fold work. R-B736 records six other timeout reds that cleared at load 74, so the whole span cannot be assigned exclusively to this regression. The causal FIFO hold is established by the explicit ruling and daemon rows, not by subtracting neighbour durations. The six held passes subsequently appear in batch merge `0ebfd9ce085b05374bde22d31332f7ec3026d0e6` (L1047..1053, seven beads including wb-dq2f), after the cure.

## Finding 4 — the one-file reader cure passed; a one-time sweep missed a still-unlanded branch — **CONFIRMED** source and **CONFIRMED as recorded** checks

```text
$ git diff --stat b007c0304e^1 b007c0304e
 <census file> | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

The first output line's path is elided as `<census file>` (the literal census path, per the convention stated in Finding 2); the `| 4 +++-` count and the summary line are verbatim. The changed code:

```diff
-const exportText = (): string => readFileSync(join(ROOT, EXPORT), "utf8");
+const exportText = (): string => trackerExportText(join(ROOT, EXPORT));
+
+import { trackerExportText } from "../qa/workbench/tracker-export.mjs";
```

Cure commit `525c39ae954dda6014b36ad588d49ce90fb80bcd` is the second parent of L1046 merge `b007c0304efe80159357b26a35d141fac4e8e17b`; first parent = `e8a14621ca`. M:66874 (`green`, ws-09, 21:05:29Z), excerpt:

> 1 file passed; 122 passed (122): :1614 outside anchor, :1618 outside anchor twins, :1660 outside anchor segments flip failed->passed (line numbers unchanged by the EOF import); the same 122 titles as the red run, the other 119 passed in both

M:67122 records `gate-pass` for the cure; envelope mirror `/var/tmp/fw-gate1-slu6-run/fw-gate-wb-slu6.run1.json`, SHA-256 `bcedba83875322f15aab889c9f01ab033924c32589c4e9dc254cbe3ace35ca39`. M:67162 (`landing-gate`, 22:26:29Z) says `every step 0, no judge red - reds [] explicit (R770)`. The current census uses the reader at `:1419`, import at `:2396`; it has changed since the cure, so those are current lines, not the historical failure anchors.

The reader sweep commit `78f8c9209dd905c82f6bcf0bc1a7a7b749320917` (2026-11-07T04:09:31Z) changed 188 files, including 183 `test/*.ts` files. It landed at L1038 merge `108ec170d00a7eb421f765522e218a95fecc25a6`, 2026-11-08T05:51:59Z; its hop is `5da3f5c4e0d4f248c7bf027923ce7db712a2c66e`. The mwi-docs census did not exist at that trunk hop, and the sweep touched none of it.

Correction to the scout stage's introduction story: the raw read already existed in cut #1 `4706e8616fcd2048ee6a3fb72a00eea58ad6f04c` (2026-11-06T09:38:27Z), `:831`, directly inside export-row iteration. Cut #2 `c508359fb9df6b85a7be2ce2f6eef5767f78e1a5` (2026-11-07T05:03:11Z, 53 min 40 s after the sweep's authoring) extracted it into `exportText` at `:1004`; it did not introduce the first raw read. The sweep is not an ancestor of final cut #8 `5fe133e6b6bfe7a994ccd6b5d90f5235221c1052`; its module is absent even at that cut's parent. The gate's merge probe does carry the module: M:65341 PASS has `gateBase` `5da3f5c4e0d4...` and seven of seven steps exiting zero. The open row therefore passed against the new reader-bearing trunk, then its own close changed the shape.

Seven `gate-refused` records (M:61148, M:62325, M:63165, M:63754, M:64217, M:64543, M:64949) and one `gate-pass` (M:65341) were searched case-insensitively (`python3 -I`, `re.compile(pattern, re.I)` over each raw ledger line) using `readFileSync|raw[- ]read|rehydrat|trackerExportText|stub row|exportText`. The only matching records are M:61148's `RAW-READER-HTML` token (docs HTML, not the export; its `RAW-READ` substring matches only under `re.I`) and M:62325's `exportRowOf/exportText/exportAnchor/EXPORT_TWINS` hunk mapping (`exportText`, the one case-sensitive hit over all eight rows). None of those eight records names the close-to-stub hazard with that instrument. That is a bounded text search, not proof the hazard was unknown: wb-12x1's archived cut #4 handoff explicitly says:

> This census reads the main export directly for the wb-12x1 row; compaction keeps a non-closed bead's full row in the main export, so the outside anchor holds while wb-12x1 stays open (F7); a later cut moves the read to trackerExportText if the row is ever stubbed.

This passage is a note disclosure, not prevention. A pre-close execution against the full row cannot by itself exercise this post-close state; a synthetic closure-state control could.

## Finding 5 — the 107-file instrument measures imports, not 107 raw readers — **CONFIRMED**, bounded

Commands run at the explicit pin, with outputs:

```text
$ git grep -l 'issues\.jsonl' b8778933cba36a0be756cdc9172dd74ed040e83d -- 'test/*.test.ts' 'test/*.census.ts' | wc -l
191
$ git ls-tree -r --name-only b8778933cba36a0be756cdc9172dd74ed040e83d -- test/ | grep -cE '\.(test|census)\.ts$'
618
$ git grep -lE 'EXPORT = "\.beads/issues\.jsonl"' b8778933cba36a0be756cdc9172dd74ed040e83d -- 'test/*.ts' | wc -l
107
$ git grep -l 'tracker-export\.mjs' b8778933cba36a0be756cdc9172dd74ed040e83d -- 'test/*.ts' | wc -l
188
```

A per-file `git show` pass over the 107 selects **107 of 107** containing the module import, **69 of 107** naming `trackerExportText`, **38 of 107** naming `rehydrateTrackerExport` instead, **0 of 107** neither. Git's pathspec here also traverses subdirectories: it is not a shell top-level glob. The earlier thread's tighter instrument (top-level `.test.ts`, a non-comment export-name line and `readFileSync` anywhere in the file) selects **182 of 578**, as run:

```text
$ git ls-tree --name-only $P -- test/ | grep -c '\.test\.ts$'
578
$ git ls-tree --name-only $P -- test/ | grep '\.test\.ts$' | while read -r f; do git show "$P:$f" | grep -q readFileSync && git show "$P:$f" | grep -E 'issues\.jsonl' | grep -vqE '^\s*(//|\*|/\*)' && echo "$f"; done | wc -l
182
```

(non-comment = a line naming `issues.jsonl` whose first non-blank characters are not `//`, `*` or `/*`), whereas the name-only instrument selects **191 of 618** test-tree `.test.ts`/`.census.ts` files. These are file-level co-occurrences, not proofs of dataflow; after the sweep, many reads route through the imported reader. The same values reproduce at scout sha `a70b3578ae`.

My exact literal instrument over `test/*.ts`, with its two per-file filters, as run (`P=b8778933cba36a0be756cdc9172dd74ed040e83d`):

```text
$ git grep -l -F '.beads/issues.jsonl' $P -- 'test/*.ts' | wc -l
189
$ git grep -l -F '.beads/issues.jsonl' $P -- 'test/*.ts' | sed "s/^$P://" | while read -r f; do git show "$P:$f" | grep -q readFileSync && echo "$f"; done | wc -l
182
$ git grep -l -F '.beads/issues.jsonl' $P -- 'test/*.ts' | sed "s/^$P://" | while read -r f; do git show "$P:$f" | grep -q readFileSync && git show "$P:$f" | grep -q 'tracker-export\.mjs' && echo "$f"; done | wc -l
178
```

It selects 189 files, 182 also containing `readFileSync`, 178 of those importing the module (the double-quoted form `-F '".beads/issues.jsonl"'` selects 138 instead; the bare single-quoted literal is the instrument here). The four other files are: a provenance helper's pins list; a function-authority header comment; a package-boundary denied-prefix table; a Deno-provisioning header comment. None of those four literal occurrences is an export read.

The proposed broad raw-call grep also needed correction: without case-insensitive matching it cannot find uppercase `EXPORT` in the known `:1280` raw read. Run with `-i`:

```text
$ git grep -n -i -E 'readFileSync\([^)]*(export|issues|jsonl)[^)]*\)' e8a14621cad5c726bfff236f06e60fdca247fd88 -- 'test/*.ts' | wc -l
14
$ git grep -n -i -E 'readFileSync\([^)]*(export|issues|jsonl)[^)]*\)' b8778933cba36a0be756cdc9172dd74ed040e83d -- 'test/*.ts' | wc -l
13
```

The positive control is the historical census's `:1280` line quoted in Finding 2. The other thirteen lines are eight compaction-fixture reads and five planted source-string lines. This only excludes additional live *single-line calls naming the path inline or an export-named argument*. It does not exclude aliased paths.

A separate heuristic derives constants equal to the double-quoted export literal, path variables assigned by `join`/`resolve` using them, and `readFileSync` calls on those variables. Armed at `e8a14621ca`, it finds two files: the mwi-docs direct call and an aliased CAC-absence call. At the pin it finds only the latter. Source at the pin, `test/workbench-[cac absence census].test.ts:810-817`:

```ts
function exportTitles(root: string): Titles {
  const file = join(root, EXPORT_FILE);
  const rows = new Map<string, string[]>();
  if (existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      if (line.trim() === "") continue;
      const row = JSON.parse(line) as { readonly id?: unknown; readonly title?: unknown };
      if (typeof row.id === "string" && typeof row.title === "string") rows.set(row.id, [...(rows.get(row.id) ?? []), row.title]);
```

That file's body-field read routes through `trackerExportText` at `:642`, but this second site reads raw and uses only retained `id`/`title`. Hence neither “all imports eliminate raw reads” nor “107 raw readers remain” follows. A zero of all raw readers is specifically **not** claimed. The wb-pl64 NO DELTA note agrees with the named-file routing and records this retained-field exception; it is supporting producer evidence, not a new test execution here. The notes' first carrier clause:

> each named census that reads export rows already reads them through the rehydrating reader of qa/workbench/tracker-export.mjs

## Finding 6 — contributor convention docs omit the route; one closure receipt records it — **CONFIRMED**, armed scope; a missing drift guard remains **PLAUSIBLE**

At the pin, `git grep -l -E 'trackerExportText|rehydrateTrackerExport|rehydrating reader|tracker-export' b8778933cb -- . ':!test' ':!qa' ':!.beads'` finds **one file**, not zero: `docs/workbench/receipts/wb-12x1.md`. Its `:537` records the already-realized cure, excerpt verbatim:

> The anchor now reads the export as qa/workbench/tracker-export.mjs rehydrates it, and wb-12x1's full row comes from .beads/archive/issues-closed-2026-11.jsonl. Landing 1046 (wb-slu6) landed the same read first, and the re-cut keeps the landed line.

No other file in that scoped grep names the route. Positive control: the same module-name instrument selects 188 test files and the module itself under `qa/`, so it is traversing a known-positive corpus. This supports “no contributor convention statement naming this route,” not “no documentation anywhere.” `AGENTS.md:191` and `:248` still say:

> `.beads/issues.jsonl` is a passive export.

Its blob `f5cc15f2b467ff3264fca397849bcef274255a47` is identical at the 10-27, scout and fresh pins. `.beads/README.md` has 81 lines and zero case-insensitive `archive|stub|shard|compact|rehydrat` hits; its positive control is six `jsonl|export|dolt` lines. `CONTRIBUTING.md` has zero `issues\.jsonl|bead export` hits. The complete reader contract is in the module header `:89-124`, and its implementation `:649-650`:

```js
export function trackerExportText(mainPath) {
  return rehydrateTrackerExport(readFileSync(mainPath, "utf8"), mainPath);
}
```

**PLAUSIBLE:** no source-hygiene guard currently checks every test's body-field export read. A search for reader-function/module names in quoted/regex forms found import-roster pins and the compaction/guard/layout suites, not such a scanner. The reader suite's `:1094-1610` checks fixture behaviour, not a test-tree walk; the existing scratch census explicitly scans `test/` and `qa/` for raw allocation sites (`test/workbench-[scratch census].test.ts:712-722`), but names neither the export nor its reader. This is an armed search with a scanner precedent, not exhaustive semantic analysis. A differently named or indirect scanner could escape it; full source-hygiene audit is the missing artifact for a confirmed absence.

## Evidence

Evidence is quoted under each Finding above: commands as run with their output, ledger rows by `M:n`, and `path:line` at the named shas. No separate block repeats it.

## Re-check verdicts on the corroborated files

Both earlier pins are in the metadata. New re-check pin = `b8778933cb`. Partial re-checks below do not inherit whole findings as true.

| 10-27 claim | Verdict and extent |
|---|---|
| Finding 1 — gate step and A3 whole-export assertion | **UNDETERMINED**: those historical gate/A3 details were not re-run or re-read here. |
| Finding 2 — hops rewrite export, so later state is gate input | **STILL-TRUE, CONFIRMED** at 19 of 19 first-parent close hops L1042..L1071: all touch main export and archive; here closing also changes shape. No all-time “every hop” assertion. |
| Finding 3 — historical L467 cost | **UNDETERMINED**: historical envelope and rows not re-read. |
| Finding 4 — historical L412 red | **UNDETERMINED**: historical envelope not re-read. |
| Finding 5 — 83 of 475 reader-name files and other queue/doc-walk subcounts | **CHANGED, CONFIRMED** for the same name instrument: 191 of 618 now; reader-route introduction makes “raw reads” an invalid inference. Historical 83/475, queue overlaps and doc-walk subcounts not independently re-run, **UNDETERMINED**. |
| Finding 6 — sibling foreign-row assertions | **UNDETERMINED**: individual assertions not audited. |
| Finding 7 — admitting form and passive-export docs | **STILL-TRUE, CONFIRMED** only for the two passive-export lines; admitting-form count and other clauses **UNDETERMINED**. |
| Finding 8 — docs-surface red L401 | **UNDETERMINED**: missing historical envelope re-check. |

| 11-02 claim | Verdict and extent |
|---|---|
| Finding 1 — export reader-name growth | **CHANGED, CONFIRMED**: 141/545 at its pin → 191/618 at this pin; tighter current instrument 182/578, not identical to name set. |
| Finding 2 — installed-tree counts | **UNDETERMINED**: not measured here. |
| Finding 3 — landing-810 installed-tree reader | **UNDETERMINED**: its source not audited here. |
| Finding 4 — no contributor convention for test-time read classes | **STILL-TRUE** for the route-name convention gap in this file's armed scope; receipt exception disclosed. Installed-tree half **UNDETERMINED**. |
| Finding 5 — lock/re-vendor movement | **UNDETERMINED**: no such probe here. |
| Finding 6 — its window had no realized cost | **CHANGED** in the later window: L1046 cost now recorded. Its historical zero remains unrefuted, not independently re-derived here. |

## Suggested fixes, cheapest first

These are recommendations, not claims of measured implementation cost or completed work.

1. Add one contributor sentence beside AGENTS' export description: a closed row may contain only retained stub fields; tests needing description/notes must use the rehydrating reader. Link the header contract and explain that the landing hop closes the anchor after admission. A closure receipt alone did not prevent this episode.
2. Adopt a census-author compatibility rule: an anchor on a bead's non-stub fields must survive that bead's closure. Add a synthetic full-row → stub-plus-shard control to exercise this state before admission; require it to fail under the raw read and pass under the reader. Do not relax the anchor assertions or revert compaction.
3. Add a narrowly scoped drift guard for body-field export reads, with positive/negative controls including an aliased path. Import-only checks miss a second raw site in an importing file. Allow explicit retained-field and compaction-fixture exceptions; a blanket ban would flag the harmless `id`/`title` reader above. Avoid filing another bulk reader swap from the 107-file import census: wb-pl64 already records NO DELTA on that proposal.

## Positives worth protecting

- **CONFIRMED source / CONFIRMED as recorded:** reader R2 preserves the same path-taking API and replaces each closed stub by its latest archived full line. The cure needed only 3 insertions and 1 deletion; producer records preserve the same 122 case titles and all 119 other passes. Keep this interface and full-body semantics through future shard changes.
- **CONFIRMED:** stub projection retains identity, title, closure metadata and dependencies when present, rather than deleting closed ids. Preserve graph resolvability while excluding description/notes from the main file; not every row needs all eight allowed keys.
- **CONFIRMED as recorded:** error text names the main export and missing bead id verbatim, while judge artifacts retain exact case lines and serial-red classification. Keep those diagnostics; the wording “no row” can be supplemented to distinguish a body-less stub, not replaced by a count.
- **CONFIRMED as recorded, window bound:** 17 of 17 preserved `hop-compact.receipt` files dated L1043..L1070 in the evidence window say `roundTrip:true` and `sealedUnchanged:true`. L1042's git subject separately says `roundTrip true`; no L1042 file of that receipt name was found. L1071's eighteenth receipt is outside the window. The sibling positive file owns this theme's fuller measurements; here it is the invariant the reader-route remedy must preserve.

## What I did not establish

- **UNDETERMINED:** installed-binary equivalence to the assigned trunk pin. Missing artifact: installed binary build provenance or a version/provenance execution. No binary, test or gate ran in this lane.
- **UNDETERMINED:** regression-only incremental cost. The 3 h 10 min 13 s figure is observed staging-to-fold wall time, including other diagnosis/operational work; controlled replay without this defect was not performed.
- **UNDETERMINED:** absence of all remaining body-field raw readers, or all compatibility guards. Greps and the aliased-path heuristic are bounded static instruments, not a full AST/dataflow audit or runtime sweep.
- **UNDETERMINED:** the mqpz serial report independently of its ledger receipt. I read the r7th report and logs and the mqpz `landing-gate-try` row. Producer statements of two independent preps are explicitly labelled as recorded.
- **UNDETERMINED:** current truth of historical claims not rechecked in the verdict tables, including the original A3 admitting-form count and historical durations. The n=5 series follows prior thread records; it does not inflate this lane's one observed incident into independent runs.
- No EISDIR/symlink claim is filed here; no Workflow-tool semantics claim is routed into pi-subagents. No ledger, machine state, tracker store, code, test or existing feedback file was modified. No commit or push was made.
