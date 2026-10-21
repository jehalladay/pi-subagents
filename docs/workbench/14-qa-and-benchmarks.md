# 14 — Test strategy, conformance suite, benchmark and adversarial controls

## Test classes

A. Pure unit: worker option validation, RPC JSON boundary, registry/version lookup, policy/grants, observation reducers, relationship provenance, layout and keyboard reducers.

B. Compatibility golden: actual upstream Claude-compatible scripts in examples/workflows plus docs/workflows.md semantics; compare stable result shape, phase grouping, parallel/pipeline ordering contract, failures, metadata, nested workflow resolution, JSON schema and budget behavior. Do not require arbitrary nondeterministic completion order to match.

C. Integration: real Claude Agent SDK in supported test environment, actual native SDK provider version and evidence; use fixture substitutes only in tests explicitly named fixture.

D. Fault: ambiguous write timeout, process kill at every side-effect boundary, transport disconnect, duplicated/out-of-order stream events, lost session refs, worktree cleanup gate race, version digest swap and cancellation race.

E. UI/performance: width/Unicode/ANSI safety, virtual scrolling, large update burst, event history, stale state and keyboard accessibility.

## Matrix by subsystem

| Subsystem | Positive proof | Negative control |
| --- | --- | --- |
| Claude SDK host | SDK message/session reference observed, schema result validated | Pi AgentManager not invoked for script agent() |
| Legacy scripts | unchanged script executes with same semantics | unsupported option fails at call |
| node() | authorized native SDK operation produces evidence | missing/unauthorized provider refuses |
| MechanicalWorkflows | actual develop() + actual bound services | fixture success not called real execution |
| Furnace | attached externally started native Run status/events | observer close issues no stop; ambiguous start no duplicate |
| Forge | gate on exact candidate/basis with producer verdict | source basis changed -> no PASS |
| HX | complete query and bounded result | partial/unknown not known-empty |
| RF | genuine context render and provenance | static substitute not misreported as render |
| Journal | safe matching prefix semantics | effectful SDK node not blindly replayed |
| Observation | snapshots, dedup, cursor resume, provenance | event loss -> stale and unknown |
| Security | authorized narrow provider tool used | script crafted RPC cannot escalate rights |
| UI | 80x24/120x40/very narrow layouts | overflowing escape/wide glyph no corruption |
| Designer | reproducible before/after with native references | changed model/basis flagged as confound |

## Fault-injection locations

- Before provider call; after provider side effect but before host result; after result before journal append; before event persist; after reconnect but before snapshot.
- Before/after Claude SDK session ID first received; during tool execution; after output tokens streamed but before final.
- Inside worktree after edits but before Forge gate; after Forge evidence while workspace mutates; after isolated cleanup.
- Parent Furnace Work retry while child Run establishment is uncertain.
- Concurrent readers with one shared child; stopping one reader must not stop child without ownership.

## Performance benchmark

Construct deterministic fixture with >=1000 nodes, >=100000 events, 1–100 active changes per tick, 5 nested groups depth, partial graph links, long Unicode paths and large transcript payload refs. Measure:
- observer ingest events/s and projection memory
- p50/p95 reducer update and UI selector time
- p50/p95 layout render/navigate/resize time
- number of visible rendered rows vs total nodes
- terminal bytes per update (with line diff)
- recover snapshot/cursor latency
- Pi model tool response size under bounded queries

Proposed responsive target <=20ms per navigation/layout calculation on declared reference host, redraw <=4Hz live; no full 100k-event fold per redraw; report measured hardware/toolchain and outliers. No invented pass numbers.

Every landed W21 bench is a CLI at `qa/workbench/*-bench.mjs` whose first line is a `// W21` comment. `test/helpers/w21-bench-clis.ts` exports that first-line rule (`W21_HEADER`, `isW21BenchHeader`) and enumerates the benches from it, the W21 falsifier suites read the enumeration instead of a hand-kept list, and the known-duration suite's header census reports a `// W21` header displaced below a shebang or licence line as misplaced rather than leaving the bench silently outside both censuses.

## Truth labels and release gates

Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.

Use Forge build/test/gates as primary interface; run local relevant Node tests through Forge-configured paths. Never introduce GitHub CI. Pin dependencies, lockfile and package exports.

## Acceptance journey evidence

Evidence of record for the five docs/workbench/11 acceptance journeys, one row per evidence leg. Each row carries one label from "Truth labels and release gates", or not started for a journey with no evidence yet: a fixture pass row names one pinned case by file and verbatim title, a live SDK pass row names its receipt, and an open row names its tracking bead. test/workbench-acceptance-journeys.census.ts judges this table against its own evidence rows in both directions, so a leg dropped from either side reads red.

| Journey | Label | Evidence |
| --- | --- | --- |
| 1 | fixture pass | test/workbench-host-contract.test.ts: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported" |
| 1 | live SDK pass | forge-run receipt cmd_2a275dcbd6c6 |
| 1 | live SDK pass | owner receipt qa/workbench/receipts/wb-a2g.3-operator-receipt.json at revision e07474a |
| 2 | not started | open bead wb-04s |
| 3 | fixture pass | test/workbench-observation.test.ts: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" |
| 3 | fixture pass | test/workbench-furnace-observer.test.ts: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING" |
| 3 | fixture pass | test/workbench-furnace-vc4-receipt.test.ts: "C2 falsifier: disconnect must make the reading and the nodes stale, keeping the last-known running label" |
| 4 | fixture pass | test/workbench-patch-proposal.test.ts: "validates the candidate bytes exactly as the designer does and mirrors its status" |
| 4 | fixture pass | test/workbench-validate-reply.test.ts: "never executes or writes the candidate source" |
| 4 | fixture pass | test/workbench-designer.test.ts: "matched cohort yields measured deltas for every shared metric and states association, not causation" |
| 4 | code present | open bead wb-h8f.2 |
| 5 | fixture pass | test/workbench-control.test.ts: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" |
| 5 | fixture pass | test/workbench-control.test.ts: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)" |
| 5 | fixture pass | test/workbench-native-details.test.ts: "preserves selected node on resize and closes without invoking any runtime controls" |
