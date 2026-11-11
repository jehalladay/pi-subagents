# wb-9x5: W21: Scaled swarms / profiling

## 2026-11-11 receipt: W21 parent acceptance read from seven grouped-10k bench receipt lines on one declared host (machine seat ws-13, run g10-work-s338, base ce180d8)

- Acceptance (bead description): "10k+ grouped operations measured; p50/p95 reducer/layout timings on declared host; memory bounded by active projection. Acceptance: measured runs, no invented numbers."
- What answers it: seven measured runs of four landed W21 bench CLIs, each over the deterministic grouped-10k fixture of `qa/workbench/grouped-fixture.mjs`, on one host at one clean trunk revision. R1 to R4 are the runs of record, one `forge run <bench>` each, taken in that order. X1 to X3 are direct `node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs` runs taken before them in the same clean worktree. They are kept because X1 reads a finding (clause A3 below). Each run's one JSON receipt line, as its bench printed it, is committed verbatim in `test/fixtures/w21-acceptance-receipt-lines.json` and bound to this entry by its SHA-256 (Receipt lines, below), and `test/workbench-w21-acceptance-receipt.test.ts` reads every table of this entry back: the falsifier table against the test's own falsifier list, every other table against those lines.
- Seat records, not read from any receipt line: the Command id and Start load1 cells of the runs table. A command id is the forge envelope's `ids.command_id`. A start load1 is the first field of `/proc/loadavg`, read just before the run started, on a host shared with other lanes. X1's load was not read.
- The bead's notes ask that no cap be raised blindly. This cut raises no cap and changes no file under `src/` or `qa/`.
- Revised at cut #2 by machine seat ws-07 (run g10-work-s338, base ce180d8) after the gate refused cut #1: the test's acceptance reader now reads this entry through the shared rendered view (`docsSection`), the test gained a bounds reader, a falsifier list and a reader of its table, and this revision adds this bullet and rewrites the What the test holds section, one item of NOT CLAIMED and one sentence of the bullet on what answers the acceptance. The runs, the receipt lines and every measured figure are cut #1's, unchanged; no run was repeated.
- Revised at cut #3 by machine seat ws-08 (run g10-work-s339, base ce180d8) after the gate refused cut #2: the acceptance reader now counts the acceptance sentence in every text the shared rendered view renders for this entry, requires that one occurrence to be quoted in a top-level paragraph or list item, and refuses HTML, characters outside printable ASCII and character references anywhere in this receipt and a table nested in a list item or block quote; the bounds reader refuses HTML in the Performance benchmark section of docs/14 and requires its target paragraph to read the same in its source. The test gained 17 falsifiers and a case, W21R-BITE, that runs every falsifier's assertions on the unedited inputs. This revision adds this bullet and the W21R-BITE item of What the test holds; rewrites that section's opening sentence, its W21R-BOUNDS and W21R-ACCEPTANCE items and the sentence above the falsifier table; extends the falsifier table (rows W21R-F39 to W21R-F55) and retitles five of its rows (W21R-F22, W21R-F23, W21R-F25, W21R-F26 and W21R-F30); rewrites one item of NOT CLAIMED and adds three; and rewords one phrase of the cut #2 bullet. The runs, the receipt lines and every measured figure are cut #1's, unchanged; no run was repeated.

### Runs

| Run | Bench | Kind | Command id | Start load1 | Receipt utc | Exit | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | inspector-grouped-bench | forge run of record | cmd_aa210c53763d | 90.85 | 2026-11-11T05:40:48.603Z | 0 | within-target |
| R2 | reducer-selector-bench | forge run of record | cmd_212ffae2fba7 | 72.29 | 2026-11-11T05:41:44.616Z | 0 | measured on the W21 shape; every judged series is within its stated bound |
| R3 | timeline-grouped-bench | forge run of record | cmd_7f33ab70a5b4 | 97.24 | 2026-11-11T05:42:30.127Z | 0 | within-target |
| R4 | inspector-retained-memory-bench | forge run of record | cmd_d35ccae25640 | 114.67 | 2026-11-11T05:43:34.437Z | 0 | within-bound |
| X1 | inspector-retained-memory-bench | direct node run | none | not recorded | 2026-11-11T05:33:43.763Z | 1 | over-bound |
| X2 | inspector-retained-memory-bench | direct node run | none | 133.54 | 2026-11-11T05:35:12.244Z | 0 | within-bound |
| X3 | inspector-retained-memory-bench | direct node run | none | 184.42 | 2026-11-11T05:36:05.310Z | 0 | within-bound |

### Measured tree, declared host and toolchain

Every receipt line carries each value below, and the test holds each field in each line. The revision is trunk at this cut's base. The cut adds only this receipt, its test and the data file of receipt lines, so no measured input differs at the cut's commit: no file under `src/` (compiled to `dist/` by `npm run build` before the runs) and no bench module or fixture under `qa/workbench/`.

| Field | Value |
| --- | --- |
| revision | ce180d82f9385a315ff26bd8e7f9202cac19f5b3 |
| revisionSource | git |
| dirty | false |
| cpuModel | Intel(R) Xeon(R) Platinum 8488C |
| cpus | 64 |
| arch | x64 |
| platform | linux |
| node | v24.20.0 |
| toolchain.node | v24.20.0 |
| toolchain.typescript | 6.0.3 |
| toolchain.piTui | 1.1.0 |

### A1: "10k+ grouped operations measured"

| Clause | Run | Reading | Receipt field | Value |
| --- | --- | --- | --- | --- |
| A1 | R1 | operations | fixture.nodes | 10000 |
| A1 | R1 | groups | fixture.groups | 843 |
| A1 | R1 | deepest group nesting | fixture.depth | 5 |
| A1 | R1 | shallowest group nesting | fixture.minDepth | 5 |
| A1 | R1 | updates | fixture.updates | 101000 |
| A1 | R1 | ticks | fixture.ticks | 2000 |
| A1 | R1 | fewest changes in one tick | fixture.minChangesPerTick | 1 |
| A1 | R1 | most changes in one tick | fixture.maxChangesPerTick | 100 |

Every receipt line carries this same fixture (the test holds the eight fields in all seven lines), and each bench's own assessor reads each line as realised on the W21 shape (exit 0 or 1, never 2).

### A2: "p50/p95 reducer/layout timings on declared host"

| Clause | Run | Series | Receipt field | Samples | p50 ms | p95 ms | max ms |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A2 | R2 | ObservationProjection.ingest per update under churn (recorded, never judged) | reducer.all | 101000 | 0.1496 | 0.3994 | 44.5864 |
| A2 | R2 | layoutInspector per redraw under churn, overview view | selectors.overview | 2000 | 2.1423 | 5.7058 | 63.6412 |
| A2 | R2 | layoutInspector per redraw under churn, graph view | selectors.graph | 2000 | 1.2854 | 2.4702 | 61.2492 |
| A2 | R2 | layoutInspector per redraw under churn, timeline view | selectors.timeline | 2000 | 1.7278 | 3.9259 | 71.6102 |
| A2 | R2 | layoutInspector per redraw under churn, details view | selectors.details | 2000 | 0.298 | 0.4815 | 46.7019 |
| A2 | R1 | reduceInspectorKey per keypress | passes.bench-only-limits.navigation.reducer | 1600 | 0.0365 | 0.1 | 15.1097 |
| A2 | R1 | layoutInspector per keypress | passes.bench-only-limits.navigation.layout | 1600 | 0.2382 | 1.4587 | 15.6875 |
| A2 | R1 | reduceInspectorKey plus layoutInspector per keypress | passes.bench-only-limits.navigation.all | 1600 | 0.2751 | 1.5285 | 15.7512 |
| A2 | R1 | layoutInspector per resize | passes.bench-only-limits.navigation.resize | 216 | 0.4576 | 1.6488 | 28.3993 |
| A2 | R1 | reducer plus layout per keypress, overview view | passes.bench-only-limits.navigation.byView.overview | 400 | 0.3458 | 1.802 | 15.5058 |
| A2 | R1 | reducer plus layout per keypress, graph view | passes.bench-only-limits.navigation.byView.graph | 400 | 0.3529 | 1.1498 | 6.6159 |
| A2 | R1 | reducer plus layout per keypress, timeline view | passes.bench-only-limits.navigation.byView.timeline | 400 | 0.2849 | 1.7851 | 15.7512 |
| A2 | R1 | reducer plus layout per keypress, details view | passes.bench-only-limits.navigation.byView.details | 400 | 0.2103 | 0.345 | 0.6717 |
| A2 | R3 | buildTimelineLanes per call, maxQuery 40 pass | passes.maxQuery-40.build.overall | 2616 | 1.2068 | 2.114 | 25.7696 |
| A2 | R3 | buildTimelineLanes per call, maxQuery 100 pass | passes.maxQuery-100.build.overall | 2616 | 1.1699 | 1.6598 | 12.9953 |

- R1, R2 and R3 each exit 0: every p95 their benches judge is within the docs/14 target of 20 ms, as each bench's own assessor recomputes it from its line. The R2 ingest series has no documented target, and its bench records it without judging it.
- Outliers: the max column reads above 20 ms in several series. The benches judge p95 only, and docs/14 asks for outliers to be reported. R2's line lists the five slowest samples of each of its series, with tick and churn, under `outliers`.

### A3: "memory bounded by active projection"

| Clause | Run | Reading | Judged field | Measured | Bound | Within bound |
| --- | --- | --- | --- | --- | --- | --- |
| A3 | R4 | post-GC heap growth after warmup, bytes | judged.heapGrowthAfterWarmupBytes | 66952 | 16777216 | yes |
| A3 | R4 | post-GC ArrayBuffer growth over the baseline, bytes | judged.arrayBufferGrowthBytes | 0 | 1048576 | yes |
| A3 | R4 | payload bodies still reachable after blur | judged.reachableBodiesAfterBlur | 0 | 0 | yes |
| A3 | X1 | post-GC heap growth after warmup, bytes | judged.heapGrowthAfterWarmupBytes | 65816 | 16777216 | yes |
| A3 | X1 | post-GC ArrayBuffer growth over the baseline, bytes | judged.arrayBufferGrowthBytes | 4194304 | 1048576 | no |
| A3 | X1 | payload bodies still reachable after blur | judged.reachableBodiesAfterBlur | 0 | 0 | yes |
| A3 | X2 | post-GC heap growth after warmup, bytes | judged.heapGrowthAfterWarmupBytes | 63920 | 16777216 | yes |
| A3 | X2 | post-GC ArrayBuffer growth over the baseline, bytes | judged.arrayBufferGrowthBytes | 0 | 1048576 | yes |
| A3 | X2 | payload bodies still reachable after blur | judged.reachableBodiesAfterBlur | 0 | 0 | yes |
| A3 | X3 | post-GC heap growth after warmup, bytes | judged.heapGrowthAfterWarmupBytes | 65992 | 16777216 | yes |
| A3 | X3 | post-GC ArrayBuffer growth over the baseline, bytes | judged.arrayBufferGrowthBytes | 0 | 1048576 | yes |
| A3 | X3 | payload bodies still reachable after blur | judged.reachableBodiesAfterBlur | 0 | 0 | yes |

- Heap growth after warmup and payload bodies reachable after blur are within their bounds in all four runs. ArrayBuffer growth is within its bound in R4, X2 and X3, and over it in X1 (exit 1, over-bound).
- X1's excess sits in one sample, its first measured cycle (`series`, cycle 8). There the ArrayBuffer total reads one payload stand-in body (`sampling.bodyBytesCap`) above the baseline, while that cycle's WeakRef probe recorded no reachable body. Every later sample of X1 reads the baseline. The cause is UNDETERMINED: this seat did not establish whether the process still held those bytes when the sample was taken, or had not yet released them after the collection.
- So clause A3 is measured, and its finding stands: the three bounds held in three of these four runs, and the ArrayBuffer bound failed once. No bound, bench or cap was changed to answer it.

### Commands

- Build, once, in the seat worktree at the base: `npm run build`.
- Runs of record, in order, each from the worktree root with its bench's receipt-file variable set; the committed line is that file's one line: `W21_BENCH_RECEIPT=<file> FORGE_JSON=1 forge run inspector-grouped-bench --json` (R1), `W21_REDUCER_RECEIPT=<file> FORGE_JSON=1 forge run reducer-selector-bench --json` (R2), `W21_TIMELINE_RECEIPT=<file> FORGE_JSON=1 forge run timeline-grouped-bench --json` (R3) and `W21_RETAINED_RECEIPT=<file> FORGE_JSON=1 forge run inspector-retained-memory-bench --json` (R4). Each forge envelope reads status success, and its `data.exit_code` equals its line's exitCode.
- Direct runs: X1 to X3 are `node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs`, with stdout's one line committed. Before X1 this seat also ran inspector-grouped-bench, reducer-selector-bench and timeline-grouped-bench once each, directly with node, and each exited 0. Those three lines are not committed, so no figure here is read from them.
- The test: `VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-w21-acceptance-receipt.test.ts --expect.requireAssertions`.

### What the test holds

`test/workbench-w21-acceptance-receipt.test.ts` lexes this receipt and docs/14 with marked, reads the data file and re-judges each receipt line with the pure assessor its bench module exports (`assessReceipt`, `assessReducerSelectorReceipt`, `assessTimelineReceipt`, `assessRetainedReceipt`). It runs no bench and spawns no process.

- W21R-SHAPE: the runs table, the receipt-lines table and the data file name exactly R1 to R4 and X1 to X3, in that order; each data line is one line, and its SHA-256 is the one the receipt-lines table lists.
- W21R-REJUDGE: each line carries its bench's contract and command, and re-judges to the exitCode, verdict and realised it records. Each one is realised.
- W21R-RUNS: each runs-table row matches its line's utc, exit code and verdict.
- W21R-TREE-HOST: every run has a parsed line, and the tree-and-host values above hold in every line.
- W21R-A1, W21R-A2 and W21R-A3: each clause table holds exactly its frozen rows, and every cell after the field column is read from the line. The within cells are recomputed from the line, never read from the table.
- W21R-BOUNDS: each line records the bound its bench's assessor judges, as the bench modules export it (`NAVIGATION_TARGET_MS` for R1 and R3, `SELECTOR_TARGET_MS`, `REDRAW_MAX_HZ` and `FOLD_THRESHOLD_EVENTS` for R2, `RETAINED_BOUNDS` for R4 and X1 to X3). In the shared rendered view (`docsSection` of `test/helpers/census.ts`), the Performance benchmark section of `docs/workbench/14-qa-and-benchmarks.md` carries no HTML, exactly one of its top-level paragraphs opens with the target sentence, that paragraph reads the same in its source, its millisecond figure equals `NAVIGATION_TARGET_MS` and `SELECTOR_TARGET_MS`, its hertz figure equals `REDRAW_MAX_HZ`, and its thousand-event figure times 1000 equals `FOLD_THRESHOLD_EVENTS`.
- W21R-ACCEPTANCE: this receipt carries no HTML, no character outside printable ASCII and the line feed, and no character reference, and this entry nests no table in a list item or block quote. In the shared rendered view (`docsSection`), the acceptance sentence occurs exactly once across every text the view renders for this entry (each heading, paragraph, list item, code block, block quote and table), and that occurrence is quoted between straight double quotes in a top-level paragraph or list item whose text reads the same in its source.
- W21R-FROZEN: the frozen-shape literals of the run set, the clause rows and the falsifier list (standing rule 16).
- W21R-EDITS: the falsifier table below lists the test's falsifiers exactly, in order, each with the input its edited copy changes and its case title.
- W21R-BITE: every falsifier's assertions, run on this receipt, the data file and docs/14 unedited, fail, so no falsifier's red rests on an assertion the unedited inputs also satisfy.

The falsifiers W21R-F01 to W21R-F55 are edited copies, some with one edit and some with several. Each builds a copy of this receipt, of the data file, of both, or of `docs/workbench/14-qa-and-benchmarks.md` (docs/14), asserts that its copy changes exactly the input the table names, and reads the copy red through the reader its case title names.

| Falsifier | Edited copy of | Case title |
| --- | --- | --- |
| W21R-F01 | receipt | a timing cell edited away from its line is named by the A2 reader |
| W21R-F02 | data file | a p95 over 20 ms planted in R1's line under its recorded within-target verdict is caught by the re-judge |
| W21R-F03 | data file | a 9999-operation fixture in R1's line is not the W21 shape: the re-judge and the A1 floor both name it |
| W21R-F04 | data file | a dirty tree stamped in R3's line is named by the tree-and-host reader |
| W21R-F05 | data file | X1's line removed from the data file is named by the shape reader and by the runs reader |
| W21R-F06 | data file | another host's cpu count in R2's line is named by the tree-and-host reader |
| W21R-F07 | receipt | X1's finding claimed away in the runs table (exit 0, within-bound) is named by the runs reader |
| W21R-F08 | receipt | the acceptance quote without its declared-host words is named by the acceptance reader |
| W21R-F09 | receipt | X1's ArrayBuffer row dropped from the memory table is named by the A3 reader |
| W21R-F10 | receipt | X1's over-bound ArrayBuffer row marked within bound is named by the A3 reader |
| W21R-F11 | data file | a group count changed in X2's line breaks the one-fixture rule of the A1 reader |
| W21R-F12 | data file | an over-bound verdict recorded for R4's within-bound measurements is caught by the re-judge |
| W21R-F13 | receipt and data file | a tree stamped dirty in the table and in every line is named by the tree-and-host reader's clean-tree rule |
| W21R-F14 | receipt and data file | a caller-asserted short revision in the table and in every line is named by the git and full-sha rules |
| W21R-F15 | receipt | a host row dropped from the tree-and-host table is named by its field-list rule |
| W21R-F16 | receipt | a run of record without a cmd_ id and a direct run with one are both named by the runs reader |
| W21R-F17 | receipt | a runs-table utc cell one millisecond off its line is named by the runs reader |
| W21R-F18 | receipt | X3's row dropped from the runs table and from the receipt-lines table is named by the shape reader twice |
| W21R-F19 | data file | X2's line stored over several lines is named by the shape reader's one-line rule and its sha binding |
| W21R-F20 | data file | another contract, another command and an unmeasured flag in three lines are named by the re-judge |
| W21R-F21 | data file | a shallowest nesting of 4 in R1's line is named by the A1 depth floor |
| W21R-F22 | receipt | the acceptance sentence quoted again in a second top-level paragraph is named by the acceptance reader's count |
| W21R-F23 | receipt | the entry heading reworded leaves each of the eight readers of the entry without it: shape, runs, tree-and-host, A1, A2, A3, acceptance and falsifier table |
| W21R-F24 | receipt | a second tree-and-host table in the entry is named by the one-table rule |
| W21R-F25 | receipt | the acceptance quote hidden in an inline HTML comment inside its bullet (the gate's LEG2-P1 plant) is named by the no-HTML and count rules |
| W21R-F26 | receipt | the acceptance quote moved into an HTML comment block (the gate's LEG2-P2 plant) is named by the no-HTML and count rules |
| W21R-F27 | receipt | the acceptance quote inside a hidden span, whose text the rendered view keeps, is named by the no-HTML and plain-source rules |
| W21R-F28 | receipt | an HTML comment elsewhere in the entry, the quote left plain, is named by the no-HTML rule alone |
| W21R-F29 | receipt | the acceptance quote written as an image's alt text is named by the plain-source rule alone |
| W21R-F30 | receipt | the acceptance quote moved into a link title, which the page shows only as a tooltip, is named by the count rule alone |
| W21R-F31 | data file | R2's selector target loosened to 2000 ms in its line (the line edit of the gate's LEG2-P9 plant) re-judges as recorded and is named by the bounds reader |
| W21R-F32 | data file | a 25 ms overview p95 planted in R2's line under a 2000 ms target (the line edits of the gate's LEG2-P9b plant) re-judges as recorded and is named by the bounds reader |
| W21R-F33 | data file | X1's ArrayBuffer bound loosened to 8 MiB in its line (the bound edit of the gate's LEG2-P10 plant) is named by the bounds reader |
| W21R-F34 | data file | R1's and R3's recorded 20 ms targets raised to 200 ms in their lines are named by the bounds reader |
| W21R-F35 | docs/14 | the docs/14 target sentence edited from 20 ms to 200 ms is named by the bounds reader against both 20 ms constants |
| W21R-F36 | data file | an empty runs array in the data file (the gate's LEG2-P11 plant) is named by the tree-and-host reader for every run |
| W21R-F37 | receipt | a falsifier row dropped from the receipt's falsifier table is named by the falsifier-table reader |
| W21R-F38 | receipt | a falsifier's edited-copy cell changed from data file to receipt is named by the falsifier-table reader |
| W21R-F39 | docs/14 | the docs/14 target sentence wrapped in a hidden span (the gate's G01 plant) is named by the bounds reader's no-HTML and plain-source rules |
| W21R-F40 | docs/14 | the docs/14 paragraph that opens with the target sentence put inside a details block (the gate's G02 plant) is named by the bounds reader's no-HTML rule alone |
| W21R-F41 | docs/14 | the docs/14 target sentence struck through is named by the bounds reader's plain-source rule alone |
| W21R-F42 | receipt | a second copy of the acceptance quote in a block quote (the gate's G03 plant) is named by the acceptance reader's count |
| W21R-F43 | receipt | a second copy of the acceptance quote in a table cell (the gate's G04 plant) is named by the acceptance reader's count |
| W21R-F44 | receipt | a second copy of the acceptance quote as a level-3 heading (the gate's G05 plant) is named by the acceptance reader's count |
| W21R-F45 | receipt | a second copy of the acceptance quote in a fenced code block is named by the acceptance reader's count |
| W21R-F46 | receipt | the acceptance quote written twice in its own bullet is named by the acceptance reader's count |
| W21R-F47 | receipt | a second copy of the acceptance quote in a sub-bullet nested under the acceptance bullet is named by the acceptance reader's count |
| W21R-F48 | receipt | a second, unquoted copy of the acceptance sentence in a top-level paragraph is named by the acceptance reader's count |
| W21R-F49 | receipt | the acceptance bullet with its quote marks removed, its one copy unquoted, is named by the acceptance reader's quoted-carrier rule |
| W21R-F50 | receipt | the acceptance quote moved out of its bullet into a block quote, its one copy outside every top-level paragraph and list item, is named by the acceptance reader's quoted-carrier rule |
| W21R-F51 | receipt | a details element opened above the entry heading, outside the entry, is named by the acceptance reader's whole-receipt no-HTML rule |
| W21R-F52 | receipt | a second copy of the acceptance quote with one letter replaced by a Cyrillic look-alike is named by the acceptance reader's printable-ASCII rule |
| W21R-F53 | receipt | a right-to-left override and a pop directional formatting around the acceptance quote in its bullet (the gate's G07 plant) are named by the acceptance reader's printable-ASCII rule |
| W21R-F54 | receipt | a second copy of the acceptance quote with one letter written as a decimal character reference is named by the acceptance reader's character-reference rule |
| W21R-F55 | receipt | a second copy of the acceptance quote in a table nested in a list item, which the shared rendered view does not render, is named by the acceptance reader's nested-table rule |

### NOT CLAIMED by this entry

- That the runs ran as the runs table records. No reader resolves a forge command id or a load reading.
- That these figures reproduce on another host, at another load or at another revision.
- Anything about production caps. Every timed pass here runs at the bench-only limits each line records, which the retained bench labels non-comparable to production. R1's default-limits pass keeps the default caps, truncates by design and is judged on no timing.
- Render, navigate and resize across the four views, the graph-view build and the timeline honesty bundle: one receipt scope under wb-9x5.11 since the owner graph audit of 2026-11-11 merged wb-9x5.10 and wb-9x5.16 into it. Also a live terminal, live native topology, and the other docs/14 measures (terminal bytes per update, recovery latency, Pi tool reply size), each of which has its own bench or child bead.
- Any claim this entry's prose makes, but the acceptance quote. The test reads back only the tables, the quote and the receipt lines (it holds this whole receipt free of HTML, of characters outside printable ASCII and of character references, but reads no prose claim), so a rewrite of the A3 finding's prose (the gate's LEG2-P6 plant) reads green.
- How a renderer other than the shared rendered view draws this receipt. The acceptance reader counts what that view renders and refuses the constructs named in the W21R-ACCEPTANCE item above; no other construct is read as a copy of the acceptance sentence.
- A copy of the acceptance sentence outside this entry, under another level-1 or level-2 heading of this receipt, and inline markup in entry text that carries no copy of the sentence.
- docs/14 outside its Performance benchmark section (HTML there, such as an element opened above the section's heading, is not read), how a browser draws that section, and every paragraph, list and heading of the section but the one that opens with the target sentence, including one that reads like the target sentence on the page but not in the view's characters. The landed cap-saturation receipt test pins the whole section; that is program coverage, not a claim of this test.
- The bench-receipt halves of `test/workbench-docs14-performance-benchmark.census.ts`, which stay unpinned there.

### Receipt lines

The seven lines sit in `test/fixtures/w21-acceptance-receipt-lines.json`, one JSON string per run in the order of the runs table, outside `docs/` and `qa/`, whose word censuses would read them. Read as docs text, R2 and R3 match the docs-sentence rule (C2) of the wb-4wmu.1 status census through words in their bench labels, and the `src/` and `qa/` word count (D1) of `test/workbench-rf-federation-refusal-codes-census.test.ts` matches a key of the R3 line. Each line's SHA-256, over its UTF-8 bytes:

| Run | Bench | Line sha256 |
| --- | --- | --- |
| R1 | inspector-grouped-bench | f81881aea05ea6120b5b99ef89618181e6621dfb1dd400669eef8b52285bedaa |
| R2 | reducer-selector-bench | 3143dc30638291044d21340eb8fd7d1576a1aa6a721f6d323ab0461ede71c806 |
| R3 | timeline-grouped-bench | 85ae3b74d38839d8a494534ded5b3ac524869724c5cc94cc229e44b26afda189 |
| R4 | inspector-retained-memory-bench | 13a525ae294d41dc4ef74d7615f80902b586d993373596f57517da58bf288727 |
| X1 | inspector-retained-memory-bench | ac605a24cd67d1efc2e0a42535bb558b0624811c38a2110143fff627bc14f4f2 |
| X2 | inspector-retained-memory-bench | 9e7f35a6cf9f73433b2631db78d3bdd047fa5e8a1e0c1106ac80498fc6bb39ab |
| X3 | inspector-retained-memory-bench | fd18a3f7ed5232e3a41e232bd5c20bfff614dc5ef47d42fe363fc8efe8d717a3 |
