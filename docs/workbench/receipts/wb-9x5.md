# wb-9x5: W21: Scaled swarms / profiling

## 2026-11-11 receipt: W21 parent acceptance read from seven grouped-10k bench receipt lines on one declared host (machine seat ws-13, run g10-work-s338, base ce180d8)

- Acceptance (bead description): "10k+ grouped operations measured; p50/p95 reducer/layout timings on declared host; memory bounded by active projection. Acceptance: measured runs, no invented numbers."
- What answers it: seven measured runs of four landed W21 bench CLIs, each over the deterministic grouped-10k fixture of `qa/workbench/grouped-fixture.mjs`, on one host at one clean trunk revision. R1 to R4 are the runs of record, one `forge run <bench>` each, taken in that order. X1 to X3 are direct `node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs` runs taken before them in the same clean worktree. They are kept because X1 reads a finding (clause A3 below). Each run's one JSON receipt line, as its bench printed it, is committed verbatim in `test/fixtures/w21-acceptance-receipt-lines.json` and bound to this entry by its SHA-256 (Receipt lines, below), and `test/workbench-w21-acceptance-receipt.test.ts` reads every table of this entry back against those lines.
- Seat records, not read from any receipt line: the Command id and Start load1 cells of the runs table. A command id is the forge envelope's `ids.command_id`. A start load1 is the first field of `/proc/loadavg`, read just before the run started, on a host shared with other lanes. X1's load was not read.
- The bead's notes ask that no cap be raised blindly. This cut raises no cap and changes no file under `src/` or `qa/`.

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

`test/workbench-w21-acceptance-receipt.test.ts` lexes this entry with marked, reads the data file and re-judges each receipt line with the pure assessor its bench module exports (`assessReceipt`, `assessReducerSelectorReceipt`, `assessTimelineReceipt`, `assessRetainedReceipt`). It runs no bench and spawns no process.

- W21R-SHAPE: the runs table, the receipt-lines table and the data file name exactly R1 to R4 and X1 to X3, in that order; each data line is one line, and its SHA-256 is the one the receipt-lines table lists.
- W21R-REJUDGE: each line carries its bench's contract and command, and re-judges to the exitCode, verdict and realised it records. Each one is realised.
- W21R-RUNS: each runs-table row matches its line's utc, exit code and verdict.
- W21R-TREE-HOST: the tree-and-host values above hold in every line.
- W21R-A1, W21R-A2 and W21R-A3: each clause table holds exactly its frozen rows, and every cell after the field column is read from the line. The within cells are recomputed from the line, never read from the table.
- W21R-ACCEPTANCE: the acceptance sentence is quoted once, verbatim.
- W21R-FROZEN: the frozen-shape literals of the run set and the clause rows (standing rule 16).
- W21R-F01 to W21R-F12: one-edit copies of this receipt, each read red: a timing cell, a planted p95 over 20 ms, a 9999-operation fixture, a dirty stamp, a dropped data line, another cpu count, X1's finding claimed away, the declared-host words dropped, a dropped memory row, a flipped memory row, another group count, and a recorded verdict its measurements contradict.

### NOT CLAIMED by this entry

- That the runs ran as the runs table records. No reader resolves a forge command id or a load reading.
- That these figures reproduce on another host, at another load or at another revision.
- Anything about production caps. Every timed pass here runs at the bench-only limits each line records, which the retained bench labels non-comparable to production. R1's default-limits pass keeps the default caps, truncates by design and is judged on no timing.
- Render, navigate and resize across the four views, the graph-view build and the timeline honesty bundle: one receipt scope under wb-9x5.11 since the owner graph audit of 2026-11-11 merged wb-9x5.10 and wb-9x5.16 into it. Also a live terminal, live native topology, and the other docs/14 measures (terminal bytes per update, recovery latency, Pi tool reply size), each of which has its own bench or child bead.
- Any figure stated in this entry's prose. Only the tables and the receipt lines are read back.
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
