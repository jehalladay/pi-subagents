# wb-f3wd: [MWI-hx-evidence] Measure installed HX task-scope capability before certifying it

## 2026-11-06 receipt: the installed-HX task-scope probe and its census, cut 1 (machine seat ws-02)

- Surface: test and qa only, no src change. Measured on base trunk `75b12d6f58d3` and merged forward to trunk `4fb0e090022f` (landings 1009 and 1010, five paths this cut does not touch) before handoff. `test/workbench-hx-task-scope-probe.test.ts` is the census (29 rows: 24 cases and 5 shape and anchor rows), `qa/workbench/hx-task-scope-judge.mjs` the pure judge (no I/O, no clock), `qa/workbench/hx-task-scope-probe.mjs` the native probe and `qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json` its committed record. `test/fixtures/mwi-hx-evidence-requirements-roster.json` vendors the requirement block (pi-subagents master `0b25e14e`, `triage/requirements/ATOMIC-REQUIREMENTS.md` lines 1212-1220, held to its SHA-256).
- EAT-R057 (triage: C03114 PLAUSIBLE, C0242 ESTABLISHED, C0243 ESTABLISHED). The probe commits a two-file Git repository in a guarded scratch directory (fixed identity and dates, Git configuration isolated, so the base revision `ac25292057ec` is reproducible) and asks the installed producer, through `@hyperunix/sdk`, for the task the MW rig's discovery asks: the regular files under the workspace root (`hx.fs/regular-file`, root `.`) at that revision. Task digest `sha256:40e694cc6de6`, the SHA-256 of the task's canonical JSON.
- Version pin, measured 2026-11-06: the runtime hx 0.1.0, binary SHA-256 `e0efc5f18763678ba82707c869c886dbdea8317e4dcfd704522fd6157354c690`, resolved from PATH, HXS 1.0, protocol hxs/1.0; `@hyperunix/sdk` 0.1.0, which is the installed package, the runtime-reported SDK and the vendored tarball `package.json` names. The runtime lists 84 capabilities and none of them names a task.
- The three legs, as the producer answered:
  - filesystem-live (the rig's default query, strict coverage): exit 3, terminal partial, coverage incomplete (HX-COVERAGE-INCOMPLETE), absence unlicensed, view `hx.view/workspace-head`, no revision resolution and no runtime query digest. Its coverage scopes are `fs:<workspace>` and the certificate scope fs-subtree.
  - filesystem-live-best-effort (Pi's hyperunix.find coverage policy): exit 0 and terminal complete, over the same incomplete coverage with absence unlicensed. An exit of 0 is not complete coverage.
  - revision-pinned (GitView of the base revision, the SDK's only revision binding): refused with exit 4 (provider_failed), HX-RUNTIME-INTERNAL-FAILURE, reason view-binding-pending (the runtime says find binds no view in this build, HX-VIEW-013), zero frames.
- Verdict: task-scope-unsupported. No leg is task-scope proof. No leg asks a task scope, none carries a revision resolution or a runtime query digest, and none has complete coverage. The blocker is recorded on gate HX-TASK-SCOPE-PROBE and scoped to native-task-scope only. Git-census mode is named not blocked (claim C03113).
- What the record is: producer evidence for C03114 at the recorded binary. It measures a capability and certifies nothing, and this cut edits no triage grading. The closure of HX-TASK-SCOPE-PROBE is not claimed: the slice is not claimed live or closed (EAT-R085).
- Record command: `node qa/workbench/hx-task-scope-probe.mjs --write qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json` (2026-11-06). The record is tied to the probe and the judge by their SHA-256, so an edit to either reds S-RECORD-TIED until the record is regenerated with this command. Two runs differ only in `utc`.
- NOT CLAIMED: a workspace-defined named query carrying a task scope; hx verbs other than find (show under a view, git tree, git index and git diff); hx builds other than the recorded binary; Pi's registered hyperunix.find tool; the hx-admit guardrails EAT-R058 and EAT-R059.
- Residuals, each named and pinned by a quiet row (the residual table below): R-DECLARED-SCOPE and R-REQUESTED-SPELLING.
- Frozen shape (standing rule 16): one row pins STATEMENT:5, A1:3, A2:2, A3:5, A4:4, MUTANT:3 and the two residual families. Outside anchors: the roster's Statement, Acceptance (tiled by A1-A4) and Adversarial mutant; this bead's row of `.beads/issues.jsonl` (EAT-R057, gate HX-TASK-SCOPE-PROBE); and the two tables below, which the census reads row by row (append-only, standing rule 15).
- CT battery (v2), each member applied in place and restored byte-identical: CT1 red=3; CT1b red=3; CT2 red=1; CT3 red=2; CT4 red=3; CT5 red=2; CT6 red=1. CT2 is killed by the roster's Acceptance tiling alone. CT5 is killed by the roster and the receipt's pin table, both outside the census. CT6 takes the pin A3-TASK-DIGEST out of its case, its row and the frozen literal together and is killed by the receipt's pin table alone. The same coordinated hollow of the residual R-REQUESTED-SPELLING reds 1 (the residual table), and of the whole row A2 reds 2 (the roster and the pin table).
- Red: the census against the judge's red-first stub (exported API and vocabulary, blind bodies), with no committed record, gave 21 failed | 8 passed (29). The 8 that pass are S-VOCABULARY, A4-SCOPE-ONLY and QUIET-REQUESTED-SPELLING, which a blind judge satisfies, and the 5 shape and anchor rows, which do not read the judge.
- Green: 29 of 29.
- Mutants: 40 of 40 killed, each applied in place and restored byte-identical (SHA-256 checked), with 1 to 7 failures each. 30 are on the judge. They cover the vendored mutant (the scope check removed, which reds M-COMPLETE-FILESYSTEM, M-TERMINAL-COMPLETE and S-ONE-CONDITION-EACH), each of the nine conditions, the blocker's scope, its Git census exemption and its witness word, the supported rule, the task digest, the workspace scrub and each observation field. Every judge mutant is also red on a row other than S-RECORD-TIED, which any judge edit reds through the record's judge SHA-256. 9 are on the committed record: a refused leg edited to exit 0, the verdict flipped, a leg relabelled task scope, the binary pin removed, the Git census exemption removed, a host path leaked, the task moved to another revision, the strict leg's coverage edited complete and a task-named capability planted. 1 is on the probe, an edit after the record, which reds S-RECORD-TIED.

### Judged pins, wb-f3wd cut 1

| Row | Pin |
| --- | --- |
| STATEMENT | S-TASK-CAPABLE |
| STATEMENT | S-ONE-CONDITION-EACH |
| STATEMENT | S-VOCABULARY |
| STATEMENT | S-RECORD-FOLLOWS-JUDGE |
| STATEMENT | S-RECORD-TIED |
| A1 | A1-PRODUCER-PIN |
| A1 | A1-SDK-PIN |
| A1 | A1-CAPABILITIES |
| A2 | A2-PROBE-LEGS |
| A2 | A2-RECORDED-TASK |
| A3 | A3-OBSERVATION-OF-RESULT |
| A3 | A3-OBSERVATION-OF-FAILURE |
| A3 | A3-TASK-DIGEST |
| A3 | A3-RECORDED-RESPONSES |
| A3 | A3-NO-HOST-PATH |
| A4 | A4-MISSING-WITNESS |
| A4 | A4-UNSUPPORTED-WITNESS |
| A4 | A4-SCOPE-ONLY |
| A4 | A4-RECORDED-BLOCKER |
| MUTANT | M-COMPLETE-FILESYSTEM |
| MUTANT | M-TERMINAL-COMPLETE |
| MUTANT | M-SCOPE-OF-KIND |

### Residuals, wb-f3wd cut 1

| Residual | Quiet row |
| --- | --- |
| R-DECLARED-SCOPE | QUIET-DECLARED-SCOPE |
| R-REQUESTED-SPELLING | QUIET-REQUESTED-SPELLING |

## 2026-11-07 receipt: the committed record's measurement and every row's end, held outside the census (follow-up wb-d6m1 of landing 1013; machine seat ws-11)

- Surface: test and docs only, no src change: `test/workbench-hx-task-scope-probe.test.ts`, now 32 rows (the registration row, 24 cases, 6 shape and anchor rows and the liveness row), and this entry. The judge, the probe and the committed record are unchanged, so S-RECORD-TIED holds as before. Base trunk `fd90f9d3a9c7` (landing 1014).
- It answers the findings the landing-1013 gate (cmd_36aaa1a52535) carried into bead wb-d6m1: F1 leads (five edits to the committed record kept the census at 29 of 29), F2 rides (no case fed observationOf a completeness of unknown) and F3 rides (a case returning early, hollowed, skipped or dropped from the registration loop kept the census green).
- Re-measured first-hand on 2026-11-07: `node qa/workbench/hx-task-scope-probe.mjs` (stdout only, nothing written) against the installed hx, binary SHA-256 `e0efc5f18763678ba82707c869c886dbdea8317e4dcfd704522fd6157354c690` (the version pin of the first entry), reproduced the committed record exactly but `utc`, so its measurement SHA-256 is the committed record's.
- Measured record (the first table below): nine reproducible literals of the committed record by field, and the SHA-256 of its measurement, which is the record's canonical JSON (object keys in code-point order, no whitespace) without `utc`, the run's clock, and `probe`, the script tie S-RECORD-TIED computes. A1-PRODUCER-PIN reads the binary SHA-256 and origin from it, A1-CAPABILITIES the capability count, A2-RECORDED-TASK the base revision, and A3-RECORDED-RESPONSES the task digest and each live leg's answer and frame counts. ANCHOR-MEASUREMENT holds the table's fields and the measurement's SHA-256, the table's binary SHA-256 and capability count to the first entry's version pin, and its base revision and task digest to the 12-digit abbreviations the first entry's EAT-R057 item names.
- Reached ends (the second table below): every registered row of the census in run order, with vitest's count of its assertions at its end. Each row records its end after its last assertion. The registration row, registered first, holds the collected task tree: exactly these rows, in order, each set to run and not inverted. The liveness row, registered last, holds the tree again, every other row run before it, and the record of ends to this table; the file-end judge holds the liveness row's own end; ANCHOR-RECEIPT-TABLES holds this table's rows to every row id of the census.
- A3-OBSERVATION-OF-RESULT now feeds observationOf a completeness of `unknown` (kept, never read as complete, and read coverage-not-complete, beside a complete control) and seven other readings (`partial`, `Complete`, the empty string, 1, true, null and undefined), each read null.
- Red first: the cut census against the trunk receipt, without this entry, gave 7 failed | 25 passed (32) and a red file-end judge; the 7 are the rows that read this entry's tables.
- Mutants, each on a throwaway hardlinked tree (never the seat's checkout), the trunk census against the cut census, as failed and passed counts. Every cut count includes the liveness row, which reds whenever a row fails before its end, and the file-end judge reds with it. F1: the gate's five record edits, E06 (a live answer count 14 to 15), E07 (live frames 166 to 1), E08 (another 64-hex binary SHA-256), E09 (84 to 85 capabilities) and E11 (the base revision moved with the task digest and the pinned leg's view, argv and reason), read 0|29 on trunk and 3|29, 3|29, 3|29, 3|29 and 4|28 on the cut. The same move to a revision sharing the 12-digit abbreviation reads 0|29 and 4|28. Six further record edits (the origin, the best-effort answer and frame counts, a live argv token, a diagnostic severity, a diagnostic reason) read 0|29 on trunk and 3 or 2 failed on the cut, the last three through the measurement SHA-256 alone. F2: the judge mapping unknown to complete (the gate's J21) reds S-RECORD-TIED alone on trunk and adds A3-OBSERVATION-OF-RESULT on the cut. With the record's judge SHA-256 restored (a regenerated record is byte-identical), unknown read as complete, unknown read as null and every string kept read 0|29 on trunk and 2|30 on the cut. F3: A3-RECORDED-RESPONSES returning after its first assertion, M-COMPLETE-FILESYSTEM hollowed to one unrelated assertion and ANCHOR-EXPORT returning after its first assertion read 0|29 on trunk and 1|31 on the cut. A4-SCOPE-ONLY skipped reads 0|28 with 1 skipped on trunk and 2|29 on the cut (the registration and liveness rows); A4-SCOPE-ONLY dropped by a loop filter reads 0|28 and 2|29; a return before any assertion reads 0|29 on trunk without `--expect.requireAssertions` and 1|31 on the cut.
- The record of ends' guards one at a time: the liveness row skipped reds the registration row; the registration row skipped reds the liveness row; the liveness row cut short before its record check reds the file-end judge; a row's end left unrecorded, or a count edited in this table, reds the liveness row. Coherent edits of the record and this table together (the binary SHA-256, the capability count, or the base revision, each with the measurement SHA-256 recomputed) red ANCHOR-MEASUREMENT through the first entry alone. Controls: `utc` moved, the record's keys reordered and a later entry appended each read 32 of 32.
- NOT CLAIMED: the record's `utc` beyond its format; a live re-measure (the census reads the committed record); a row whose assertions are replaced one for one, keeping its count; two of the record of ends' guards disabled together (the registration and liveness rows both skipped, or the liveness row cut short with the file-end judge deleted), under which a case returning early reads green (measured).
- CT battery (v2), each member on a throwaway tree: CT1 red=4; CT1b red=4; CT2 red=2; CT3 red=3; CT4 red=4; CT5 red=3; CT6 red=2, each with the file-end judge. CT6 takes the pin A3-TASK-DIGEST out of its case, its row and the frozen literal together and is killed by the first entry's pin table and this entry's Reached ends table alone. The same coordinated hollow of the measured field producer.binaryOrigin reds 2 (the Measured record table), and of the residual R-REQUESTED-SPELLING reds 2 (the residual table and the Reached ends table).
- Green: 32 of 32.

### Measured record, wb-d6m1

| Field | Value |
| --- | --- |
| task.baseRevision | ac25292057ece4fc0e361eb806c0abe26ccd60e6 |
| task.digest | sha256:40e694cc6de6e3bf7db7ca4d6d300a10a8d818cd94a1308c898539355939e908 |
| producer.binarySha256 | e0efc5f18763678ba82707c869c886dbdea8317e4dcfd704522fd6157354c690 |
| producer.binaryOrigin | path |
| producer.capabilities.count | 84 |
| filesystem-live.answerCount | 14 |
| filesystem-live.frames | 166 |
| filesystem-live-best-effort.answerCount | 14 |
| filesystem-live-best-effort.frames | 166 |
| measurement.sha256 | 47604bc7a407563d3a40147f4f96ecfb8d8248add73e4f9ed8d92eab630c9055 |

### Reached ends, wb-d6m1

| Row | Assertions |
| --- | --- |
| REGISTRATION | 3 |
| S-TASK-CAPABLE | 2 |
| S-ONE-CONDITION-EACH | 26 |
| S-VOCABULARY | 3 |
| S-RECORD-FOLLOWS-JUDGE | 2 |
| S-RECORD-TIED | 5 |
| A1-PRODUCER-PIN | 8 |
| A1-SDK-PIN | 5 |
| A1-CAPABILITIES | 4 |
| A2-PROBE-LEGS | 2 |
| A2-RECORDED-TASK | 21 |
| A3-OBSERVATION-OF-RESULT | 13 |
| A3-OBSERVATION-OF-FAILURE | 3 |
| A3-TASK-DIGEST | 3 |
| A3-RECORDED-RESPONSES | 21 |
| A3-NO-HOST-PATH | 12 |
| A4-MISSING-WITNESS | 1 |
| A4-UNSUPPORTED-WITNESS | 2 |
| A4-SCOPE-ONLY | 12 |
| A4-RECORDED-BLOCKER | 3 |
| M-COMPLETE-FILESYSTEM | 3 |
| M-TERMINAL-COMPLETE | 2 |
| M-SCOPE-OF-KIND | 14 |
| QUIET-DECLARED-SCOPE | 1 |
| QUIET-REQUESTED-SPELLING | 2 |
| FROZEN-SHAPE | 4 |
| TILING | 51 |
| ANCHOR-ROSTER | 15 |
| ANCHOR-EXPORT | 4 |
| ANCHOR-RECEIPT-TABLES | 4 |
| ANCHOR-MEASUREMENT | 8 |
| LIVENESS | 4 |
