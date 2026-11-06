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
