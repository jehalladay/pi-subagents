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

## Matrix by subsystem evidence

Evidence of record for the thirteen "Matrix by subsystem" rows, one row per pinned case: each row names the subsystem, the half of its cell the case answers, the tier whose own report vouches for the case, and the case by file and verbatim title, with its bound describe path or its it.each minimum where one is bound. test/workbench-subsystem-matrix.census.ts judges the default-gate rows in the report of the default gate and checks the rows of the other tiers at tier level only; no row of this table is read as a live, native or scale pass, and a half no landed case binds is listed as unpinned with its open beads and is never counted as passed. The census judges this table against its own pins in both directions and in table order, so a pin dropped from the census, together with every census literal edited to match, still reads red against this table.

| Subsystem | Half | Tier | Pinned case |
| --- | --- | --- | --- |
| Claude SDK host | positive | default-gate | test/workbench-host-contract.test.ts: "L3: parallel schema agents return object values from native SDK structured_output" |
| Claude SDK host | positive | default-gate | test/workbench-claude-adverse-faults.test.ts: "control: a conforming structured_output succeeds and the text is its JSON" |
| Claude SDK host | negative | default-gate | test/workbench-host-contract.test.ts: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported" |
| Claude SDK host | negative | default-gate | test/workbench-claude-cancel-faults.test.ts: "F8 a killed run aborts exactly its in-flight agents, spawns nothing after, and leaves a concurrent run on the same host untouched" |
| Legacy scripts | positive | default-gate | test/workflow-claude-code-compat.test.ts: "runs the canonical review-changes example" |
| Legacy scripts | positive | default-gate | test/workflow-examples.test.ts: "ships at least the examples the guide links" |
| Legacy scripts | negative | default-gate | test/workflow-runtime.test.ts: "names a misspelt option rather than ignoring it" |
| node() | positive | default-gate | test/workbench-forge-observer.test.ts: "projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference" |
| node() | negative | default-gate | test/workbench-node-contract.test.ts: "L4: unknown capability and duplicate descriptor fail explicitly" |
| node() | negative | default-gate | test/workbench-node-contract.test.ts: "L4: unauthorized invocation denied at host even with known capability id" |
| node() | negative | default-gate | test/workbench-node-limits.test.ts: "refuses oversized input before native provider is called" |
| node() | negative | default-gate | test/workbench-control-degradation.test.ts: "a registry control-gated invocation refuses with a typed authorization error once the grant expires and never starts the provider" |
| MechanicalWorkflows | positive | none | unpinned: open beads wb-04s, wb-w12 |
| MechanicalWorkflows | negative | none | unpinned: open beads wb-04s, wb-w12 |
| Furnace | positive-observer | default-gate | test/workbench-furnace-observer.test.ts: "reads native Run, Attempt and bounded log reference without promoting output or owning the Run" |
| Furnace | positive-external | furnace-observe | test/workbench-external-furnace.test.ts: "attaches to the existing Run, retains native identities, and leaves both stores byte-identical" |
| Furnace | negative-close | default-gate | test/workbench-furnace-control.test.ts: "closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb" |
| Furnace | negative-start | default-gate | test/workbench-furnace-hosted.test.ts: "treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start" |
| Forge | positive | default-gate | test/workbench-forge-observer.test.ts: "F2: a current failed gate stays failed despite transport success, and current success is success" |
| Forge | negative | default-gate | test/workbench-forge-contract.test.ts: "preserves last_result as historical, not verified candidate" |
| Forge | negative | default-gate | test/workbench-forge-evidence.test.ts: "C2: authoritative_current=false stays historical and indeterminate, never current verification" |
| HX | positive | default-gate | test/workbench-hyperunix-observer.test.ts: "H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success" |
| HX | positive | default-gate | test/workbench-hyperunix-observer.test.ts: "keeps a provider-failed result failed and reads a runtime-licensed complete-empty result as the one known-empty success" |
| HX | negative | default-gate | test/workbench-hyperunix-observer.test.ts: "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty" |
| HX | negative-native | native-read | test/workbench-ecosystem-native.test.ts: "HX partial coverage remains incomplete and does not license absence" |
| HX | negative-native | native-read | test/workbench-native-ecosystem.test.ts: "HX typed query retains incomplete coverage and binary identity" |
| RF | positive-observer | default-gate | test/workbench-reactivefiber-observer.test.ts: "R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference" |
| RF | positive-preview | rf-preview | test/workbench-native-rf-preview.test.ts: "returns noncommitted text and graph provenance with no durable render ID" |
| RF | negative | default-gate | test/workbench-reactivefiber-observer.test.ts: "R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render" |
| Journal | positive | default-gate | test/workflow-journal.test.ts: "replays an identical run without spawning anything" |
| Journal | positive | default-gate | test/workflow-journal.test.ts: "stops replaying after a changed call even when a later one still matches" |
| Journal | negative | default-gate | test/workbench-local-detached-effects.test.ts: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect naming its producer" |
| Journal | negative | default-gate | test/workflow-effect-replay.test.ts: "journals a non-read node as the effect it was, without a replayable payload" |
| Journal | negative | default-gate | test/workflow-effect-replay.test.ts: "never re-runs a journaled write because the basis changed" |
| Observation | positive | default-gate | test/workbench-observation.test.ts: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot" |
| Observation | positive | default-gate | test/workbench-observation.test.ts: "uses provider-qualified native keys, preserves native failure and does not infer ownership" |
| Observation | negative | default-gate | test/workbench-observation.test.ts: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" |
| Observation | negative | default-gate | test/workbench-detached-observer.test.ts: "reports a host-lost reading as unknown and stale, never as a replayed terminal verdict" |
| Security | positive | default-gate | test/workbench-claude-role-tools.test.ts: "adds only curated role MCP tools to actual SDK options without provider auto-grants" |
| Security | positive | default-gate | test/workbench-registry-auth.test.ts: "inspect is independently granted and preserves native unknown fields" |
| Security | negative | default-gate | test/workbench-registry-auth.test.ts: "closes the script-side raw RPC vehicle while host authorization stays typed" |
| Security | negative | default-gate | test/workbench-registry-auth.test.ts: "copies caller grants before asynchronous dispatch and never escalates another caller" |
| Security | negative | default-gate | test/workflow-meta.test.ts: "cannot reach host globals from the meta fragment" |
| UI | positive-80x24 | default-gate | test/workbench-inspector.test.ts: "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18" |
| UI | positive-80x24 | default-gate | test/workbench-terminal-geometry.test.ts: "inspector truncation is explicit: a page larger than the viewport names its remainder" in "release checklist item 8: deterministic terminal geometry > 80 x 24" |
| UI | positive-120x40 | default-gate | test/workbench-terminal-geometry.test.ts: "inspector truncation is explicit: a page larger than the viewport names its remainder" in "release checklist item 8: deterministic terminal geometry > 120 x 40" |
| UI | negative | default-gate | test/workbench-evidence-loader.test.ts: "strips terminal escapes, bidi and zero-width characters from preview lines" |
| UI | negative | default-gate | test/workbench-control-degradation.test.ts: "adversarial ANSI, bidi and control characters in provider, action, target and invocation never reach a denial reason" |
| UI | negative | default-gate | test/workflow-dialog.test.ts: "counts wide characters rather than code points" |
| UI | negative | default-gate | test/workbench-timeline.test.ts: "keeps a credential glued to an escape redacted, never splits a surrogate pair and falls back to the reference for invisible text" |
| UI | negative | default-gate | test/workbench-inspector.test.ts: "caps viewport, terminal width and unsafe text, ASCII=%s", it.each, at least 2 rows |
| Designer | positive | default-gate | test/workbench-designer.test.ts: "source changes are explicit independent variables, not config confounds" |
| Designer | positive | default-gate | test/workbench-identity.test.ts: "separates definition, deployment, logical request, subject basis and native reference" |
| Designer | negative | default-gate | test/workbench-designer.test.ts: "names a mismatched subject basis (principal + workspace source) as a confound" |
| Designer | negative | default-gate | test/workbench-designer.test.ts: "an unmeasured workspace source state is a named confound even when subject basis digests coincide" |
| Designer | negative | default-gate | test/workbench-pi-designer.test.ts: "names an unmeasured workspace source state as a cohort confound through the real tool, never a matched basis" |

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

## HX live-tier receipt falsifiers

The two live-binary HX tests of the native-read tier (vitest.native.config.ts) write their receipt line with process.stdout.write, because the vitest agent reporter drops the console output of passing tests. test/workbench-hx-live-tier-census.test.ts judges that write in the test sources and refuses every receipt shape below; each row names one falsifier row of the census and the refused shape, verbatim, and is fixture pass evidence only: the census case named for the row runs it over a synthetic probe, never the hx binary. The census reads this table and requires its own falsifier rows to equal these rows in both directions and in table order, so a falsifier dropped from the census, together with every census literal edited to match, still reads red against this table.

| Falsifier row | Refused receipt shape |
| --- | --- |
| `dead-write-if-false` | `a write inside if (false)` |
| `dead-write-after-return` | `a write unreached after return` |
| `dead-write-uninvoked-closure` | `a write inside an uninvoked closure` |
| `dead-write-after-block-return` | `a write unreached after an unconditional return in a prior plain block` |
| `dead-write-after-late-block-return` | `a write unreached after a prior plain block whose return follows another statement` |
| `dead-write-after-early-block-return` | `a write unreached after a prior plain block whose return precedes another statement` |
| `dead-write-nested-after-return` | `a write in a nested plain block unreached after an outer return` |
| `dead-write-inner-after-return` | `a write in a nested plain block unreached after a return inside that block` |
| `dead-write-else` | `a write in the untaken else branch of an if` |
| `dead-write-loop` | `a write inside a loop body that never runs` |
| `dead-write-ternary` | `a write in the untaken arm of a ternary` |
| `echo-element-access` | `console['log'] beside the stdout write` |
| `echo-globalThis-console` | `globalThis.console.log beside the stdout write` |
| `echo-globalThis-element-console` | `globalThis['console'].log beside the stdout write` |
| `echo-window-console` | `window.console.log beside the stdout write` |
| `echo-global-console` | `global.console.log beside the stdout write` |
| `echo-parenthesised-console` | `(console).log beside the stdout write` |
| `echo-nonnull-console` | `console!.log beside the stdout write` |
| `echo-as-console` | `(console as Console).log beside the stdout write` |
| `echo-satisfies-console` | `(console satisfies Console).log beside the stdout write` |
| `echo-angle-assertion-console` | `(<Console>console).log beside the stdout write` |
| `echo-any-member-console` | `console.table, a member of any name, beside the stdout write` |

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
| 3 | live SDK pass | forge-run receipt cmd_7cea2921543b |
| 4 | fixture pass | test/workbench-patch-proposal.test.ts: "validates the candidate bytes exactly as the designer does and mirrors its status" |
| 4 | fixture pass | test/workbench-validate-reply.test.ts: "never executes or writes the candidate source" |
| 4 | fixture pass | test/workbench-designer.test.ts: "matched cohort yields measured deltas for every shared metric and states association, not causation" |
| 4 | code present | open bead wb-h8f.2 |
| 5 | fixture pass | test/workbench-control.test.ts: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" |
| 5 | fixture pass | test/workbench-control.test.ts: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)" |
| 5 | fixture pass | test/workbench-native-details.test.ts: "preserves selected node on resize and closes without invoking any runtime controls" |

## W10 withdrawn-claim census residuals

Named residuals of test/workbench-w10-section-withdrawn-claim.test.ts, the section-level census over the feature-matrix W10 rows for the two withdrawn spellings: one row per residual family the census names and does not claim to catch. Each row names the census quiet row for that family, an exemplar its page carries exactly once and that reads quiet, and a clear form that undoes the family: with the exemplar replaced by the clear form, the page must read the withdrawn claim at the location given. The census judges this table against its quiet rows in both directions, so a family dropped, renamed or silenced on either side reads red. In a clear form, `\n` stands for a line break.

| Quiet row | Residual family | Exemplar | Clear form | Clear form reads |
| --- | --- | --- | --- | --- |
| ENUM0 | ASCII look-alikes | `zero durab1e writes` | `zero durable writes` | W10 table 1 row 2 Caveats: zero durable writes |
| ENUM1 | hyphenated paraphrases | `zero durable-writes` | `zero durable writes` | W10 table 1 row 2 Caveats: zero durable writes |
| ENUM2 | new paraphrases | `No persistent writes occur.` | `No durable writes occur.` | W10 table 1 row 2 Caveats: no durable write |
| ENUM3 | struck-through text | `~~zero durable writes~~` | `zero durable writes` | W10 table 1 row 2 Caveats: zero durable writes |
| ENUM4 | renamed relocated W10 keys | `RF renamed adapter` | `ReactiveFiber reader adapter` | outside W10 table 1 row 1 Caveats: zero durable writes |
| ENUM5 | relocated inline HTML including br-split claim | `zero durable<br>writes` | `zero durable writes` | outside W10 table 1 row 1 Caveats: zero durable writes |
| ENUM6 | W10 heading text | `## W10: ReactiveFiber provider/interop zero durable writes` | `## W10: ReactiveFiber provider/interop\n\nzero durable writes` | W10 paragraph: zero durable writes |

## HX graduation-vocabulary case roster

The standing wb-tz2.10 census tests the following reader cases and refusal branches. This table is the outside-census case inventory for its frozen-shape assertion: dropping a case and adjusting every literal inside the census must still disagree with this independent docs row. This is fixture coverage, not a graduation-state claim or proof that the upstream HX inventory has shipped.

| Case | Judged branch |
| --- | --- |
| R01 | the measured incomplete read, absence not licensed |
| R02 | complete, absence not licensed |
| R03 | complete with two rows, runtime-licensed |
| R04 | complete-empty, runtime-licensed |
| R05 | complete-empty, absence not licensed |
| R06 | budget-exhausted |
| R07 | cancelled |
| R08 | view-invalidated |
| R09 | provider-failed |
| R10 | schema-failed |
| R11 | internal-failed |
| R12 | protocol-failed |
| R13 | usage-error |
| R14 | rows not retained |
| R15 | a licence on an incomplete kind, not honoured |
| R16 | coverage batch ids withheld from the evidence references |
| R17 | coverage evidence references capped at 32 |
| R18 | the invoking operation named: one grouping edge |
| R19 | the injected read through registerHyperUnixFind, end to end |
| R20 | a native execution id and evidence handles |
| F01 | a host context that is not an object |
| F02 | a host scope without a principal |
| F03 | a read target with an empty kind |
| F04 | an unzoned capture time |
| F05 | an oversized invocation id |
| F06 | an operation reference without a type |
| F07 | another provider contract |
| F08 | another representation |
| F09 | an unregistered execution kind |
| F10 | a licence that is not a boolean |
| F11 | rows that are not an array |
| F12 | a missing operation |
| F13 | a short binary digest |
| F14 | a missing runtime version |
| F15 | a mutation-rejected outcome |
| F16 | a mutation-partial outcome |
| F17 | a complete-empty answer that carries rows |
| F18 | a reading of another workspace |
| F19 | an operation reference aliasing the query node itself |
