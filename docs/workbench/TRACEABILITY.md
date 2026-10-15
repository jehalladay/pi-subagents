# Workbench requirement traceability and release evidence

This matrix is a test-first ledger of *claims*, not an issue tracker. Beads in `.beads/` owns task status and dependencies. Status here is evidential and must be updated when tests or native results change. `planned` never means implemented.

Baseline: fork `38034a043e63a65ec5a81544c7a81d0e6b76ebe3` at 2026-10-15. The pre-implementation upstream suite passed; the declared Forge gate passed lint, typing, tests and build at `cmd_65b034a22fb5`. This does not establish any Workbench behavior.

| ID | Priority | Requirement | Implementation evidence | L1 shell | L2 client | L3 integration | L4 unit/fault | Live/native evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WB-001 | P0 | Pi remains the interactive command/tool/TUI host; a script workflow can be initiated from Pi. | src/index.ts:2412 | test/workbench-pi-client.test.ts | test/workbench-pi-client.test.ts | — | test/workbench-pi-client.test.ts | — | fixture |
| WB-002 | P0 | Workflow agent() runs by @anthropic-ai/claude-agent-sdk; trace proves SDK messages and session identity; never silently uses Pi sessions. | src/workbench/claude-host.ts:78 | qa/workbench/live-claude.mjs | test/workbench-pi-client.test.ts | test/workbench-host-contract.test.ts | test/workbench-host-contract.test.ts | Direct real SDK events; Pi route fixture | experimental |
| WB-003 | P0 | Legacy script globals and meta parsing remain supported; baseline golden scripts execute without edits. | src/workflow/worker-source.ts:359 | test/workflow-claude-code-compat.test.ts | — | — | test/workflow-runtime.test.ts | — | fixture |
| WB-004 | P0 | Existing non-workflow Pi agent features are not deleted merely to migrate workflow agent(). | src/index.ts:2302 | test/workflow-tool.test.ts | — | — | test/workbench-host-contract.test.ts | — | fixture |
| WB-005 | P0 | Host-side node(id,input) is additive and executes without an LLM call for deterministic SDK nodes. | src/workflow/worker-source.ts:556 | qa/workbench/smoke.sh | — | test/workbench-node-contract.test.ts | test/workbench-node-contract.test.ts | — | fixture |
| WB-006 | P0 | node() input/output enforce JSON transport boundary; malformed/non-serializable payloads fail before provider effects where possible. | src/workbench/capability-registry.ts:44 | qa/workbench/smoke.sh | — | test/workbench-node-contract.test.ts | test/workbench-node-contract.test.ts | — | fixture |
| WB-007 | P0 | Missing provider, unknown capability ID, schema mismatch and unavailable binding fail explicitly, not as null success. | src/workbench/capability-registry.ts:83 | qa/workbench/smoke.sh | — | test/workbench-node-contract.test.ts | test/workbench-node-contract.test.ts | — | fixture |
| WB-008 | P0 | Capability discoverability and capability invocation authorization are independent. | src/workbench/capability-registry.ts | — | — | test/workbench-node-contract.test.ts | test/workbench-registry-auth.test.ts | — | fixture |
| WB-009 | P0 | Claude session IDs, input/output, tool events, native SDK failure and token usage are translated without invented values. | src/workbench/claude-host.ts:135 | qa/workbench/live-claude.mjs | test/workbench-pi-client.test.ts | test/workbench-host-contract.test.ts | test/workbench-host-contract.test.ts | Real SDK events; session UUIDs | live-sdk |
| WB-010 | P0 | Stopping the parent propagates cancellation only through established ownership and appropriate SDK API; stopping observation does not. | src/workbench/claude-host.ts:106 | — | — | — | test/workbench-host-contract.test.ts | — | experimental |
| WB-011 | P0 | The existing workflow tool remains available in Pi without collision or competing shadow tool names. | src/index.ts:2412 | test/workflow-tool.test.ts | test/workbench-pi-client.test.ts | — | test/workbench-pi-client.test.ts | — | fixture |
| WB-012 | P0 | Old workflow tests remain green under supported upstream mode and new executor-mode tests are added. | src/index.ts:2356 | qa/workbench/smoke.sh | — | — | test/workflow-claude-code-compat.test.ts | — | fixture |
| WB-013 | P0 | At least one real SDK node is proven end-to-end, plus explicit negative controls. | src/workbench/providers/forge.ts:60 | qa/workbench/native-forge.mjs | — | test/workbench-node-contract.test.ts | test/workbench-native-client.test.ts | Native Forge status envelope; Pi-client path test/workbench-pi-node-client.test.ts | experimental |
| WB-014 | P0 | Workflow invocation carries definition, immutable implementation basis and logical invocation ID; native refs remain intact. | src/workbench/identity.ts; src/index.ts (pending final integration receipt) | — | — | — | test/workbench-identity.test.ts | — | experimental |
| WB-015 | P0 | Workbench cannot turn absent/unknown/partial producer evidence into successful domain verdict. | src/workbench/providers/forge.ts:75 | qa/workbench/native-forge.mjs | — | test/workbench-node-contract.test.ts | test/workbench-forge-contract.test.ts | Native Forge status envelope | experimental |
| WB-016 | P0 | Existing Pi inline workflow card and inspector remain operational through migration. | src/ui/workflow-card.ts:301 | qa/workbench/smoke.sh | — | — | test/workbench-ui-contract.test.ts | — | fixture |
| WB-017 | P0 | Operator can view node type, name, native ID, current observation freshness, and last error in a terminal detail view. | src/ui/workflow-dialog.ts:805 | — | — | — | test/workbench-ui-contract.test.ts | — | experimental |
| WB-018 | P0 | Pi can query bounded semantic observations without consuming raw event logs or terminal-rendered text. | src/index.ts; src/workbench/observation.ts | test/workbench-observation-shell.test.ts | test/workbench-pi-entrypoint-identity.test.ts | — | test/workbench-observation.test.ts | Pending final integrated native receipt | experimental |
| WB-019 | P0 | Forge controls build/test/release verification; no GitHub CI added; no Library dependency. | forge.toml:8 | qa/workbench/smoke.sh | — | — | — | — | gate-pass |
| WB-020 | P0 | Upstream MIT license and original copyright retained. | LICENSE:1 | — | — | — | — | — | source-retained |
| WB-021 | P1 | Claude SDK resume reattaches to correct session; invalid or lost session yields explicit failure, never fresh-context masquerading as resume. | src/workbench/claude-host.ts:185 | qa/workbench/live-resume.mjs | — | test/workbench-host-contract.test.ts | test/workbench-host-contract.test.ts | Real SDK same-session UUID; missing-session fixture refusal | experimental |
| WB-022 | P1 | Sandbox worker and privileged providers communicate only via validated RPC; hostile scripts cannot acquire host SDK credentials through intended API. | — | — | — | — | — | — | planned |
| WB-023 | P1 | Provider nodes expose inspect/observe only where producer supports them, including event cursor or snapshot freshness. | — | — | — | — | — | — | planned |
| WB-024 | P1 | Pi attaches to an externally started Furnace Run with no causal assumption that Pi owns it. | src/workbench/furnace-observer.ts; src/index.ts | — | — | — | test/workbench-pi-furnace-real-client.test.ts | Real external completed Pi read and active observer close preserves controller | experimental |
| WB-025 | P1 | Workbench distinguishes Run/Work/Attempt, Forge operation and workspace basis, Claude session, HX coverage, RF provenance. | src/workbench/native-evidence.ts | — | — | — | test/workbench-native-evidence.test.ts | — | experimental |
| WB-026 | P1 | Interrupted effectful operation is reconciled through producer or marked uncertain; no automatic blind repeat. | src/workbench/capability-registry.ts | — | — | — | test/workbench-registry-auth.test.ts | — | fixture |
| WB-027 | P1 | Terminal inspector supports overview, tree/graph, timeline, detail and a keyboard-only navigation path. | src/ui/workflow-inspector.ts; src/ui/workflow-dialog.ts | — | — | — | test/workbench-inspector.test.ts | Compiled four-view client; live terminal/native topology acceptance open | experimental |
| WB-028 | P1 | Terminal inspector has plain ASCII tier, theme-aware color tier, and usable 80-column/24-row fallback. | src/ui/workflow-dialog.ts | — | — | — | test/workbench-native-details.test.ts | — | fixture |
| WB-029 | P1 | Over 1000 nodes: render cost scales with visible slice and changed ancestors; no full historical-log fold per frame. | src/workbench/observation.ts; src/ui/workflow-inspector.ts | — | — | — | qa/workbench/inspector-bench.mjs | 1000 nodes/100k history edge-free fixture; grouped native topology open | experimental |
| WB-030 | P1 | Layout, reducers, status classification and control capabilities are pure/testable without a real terminal. | src/ui/workflow-dialog.ts | — | — | — | test/workbench-native-details.test.ts | — | fixture |
| WB-031 | P1 | Running and settled Claude conversations can be opened from inspector through Claude transcript adapter. | — | — | — | — | — | — | planned |
| WB-032 | P1 | Pi can use observer tools to inspect definition, retrieve bounded event windows, source/evidence refs and compare two runs. | src/workbench/designer.ts; src/index.ts | — | — | — | test/workbench-pi-designer.test.ts | Registered read-only source tools; precise native comparison metrics unavailable | experimental |
| WB-033 | P1 | Hosted MechanicalWorkflows develop() executes actual exported function with explicitly bound native dependencies; fixture outputs cannot be presented as live. | — | — | — | — | — | — | planned |
| WB-034 | P1 | Claude agent receives only curated, authorized provider tool surfaces; list/inspect never grant invoke. | — | — | — | — | — | — | planned |
| WB-035 | P1 | Node events show result/effect distinction (transport, domain and authority-specific status). | src/ui/workflow-card.ts:394 | — | — | — | test/workbench-ui-contract.test.ts | — | fixture |
| WB-036 | P1 | Event ingestion can reconnect/deduplicate; gaps and stale timestamps are visible. | src/workbench/observation.ts | — | — | — | test/workbench-observation.test.ts | — | fixture |
| WB-037 | P1 | Source-defined edges, observed edges and inferred links are distinguishable. | src/workbench/observation.ts | — | — | — | test/workbench-observation.test.ts | — | fixture |
| WB-038 | P1 | Versioned plan/execute/observe comparison uses immutable source and config digest references. | — | — | — | — | — | — | planned |
| WB-039 | P1 | No automatic code-edit and live replacement of already pinned running execution. | — | — | — | — | — | — | planned |
| WB-040 | P1 | Control actions have native preconditions, permission checks, prompts/confirmations and acknowledgements. | — | — | — | — | — | — | planned |
| WB-041 | P2 | Optional detached workbench host permits Pi client disconnect/reconnect, without falsely claiming crash durability. | src/workbench/hosts/local-detached.ts; src/index.ts | — | — | — | test/workbench-pi-detached.test.ts | Actual local process survives Pi shutdown; native remote host not proved | experimental |
| WB-042 | P2 | Optional Furnace host uses native ExecutorApp/Run semantics, avoiding another durable scheduler. | — | — | — | — | — | — | planned |
| WB-043 | P2 | Optional HX-based cross-product provenance queries, without mandating HX as event store. | — | — | — | — | — | — | planned |
| WB-044 | P2 | RCP-assisted continuation only where explicitly supported and conformance-tested. | — | — | — | — | — | — | planned |
| WB-045 | P2 | Hierarchical agent-swarm aggregation and profile comparisons handle 10k+ nodes subject to benchmarked limits. | — | — | — | — | — | — | planned |
| WB-046 | P2 | Native capability-provider additions require no changes to interpreter core. | src/workbench/capability-registry.ts:68 | — | — | — | test/workbench-node-contract.test.ts | — | experimental |
| WB-047 | P2 | Workflow designer can generate tests, source diffs and evidence-linked performance recommendations. | — | — | — | — | — | — | planned |
| WB-048 | P2 | Artifact/host compatibility detects mismatched digest and rejects or explicitly migrates. | src/workbench/identity.ts | — | — | — | test/workbench-identity.test.ts | — | fixture |
| WB-049 | P2 | Workbench release supports reproducible install and bounded per-provider optional dependencies. | package.json; vendor/README.md | qa/workbench/install-smoke.mjs | — | — | qa/workbench/install-smoke.mjs | Clean npm consumer, compiled imports/runtime only | experimental |
| WB-050 | P2 | Agent-driven workflow optimization demonstrates measurable improvement without introducing unverified claims. | — | — | — | — | — | — | planned |

## Evidence rules

No release claim moves to `shipped` until implementation paths, negative and integration tests, a Forge gate result, and native evidence are recorded where required. Fixture evidence is labeled `fixture`, and unavailable native APIs are `blocked`. L1 shells must exercise the compiled extension path rather than copy logic. L2 client tests must cross Pi or SDK boundaries without test-only production switches. An omitted test level needs an explicit reason; never imply it ran.

## Baseline receipt

- Source: `git rev-parse HEAD` reported `38034a043e63a65ec5a81544c7a81d0e6b76ebe3` before `bd init`. `bd init` committed its scaffold as `c0f775e9a48673b130e0028ee7d1d2303e155aaa` automatically; no implementation commit has been made.
- `npm test` (baseline): 106 files passed; 2139 tests passed and 7 skipped.
- `npm run typecheck` and `npm run lint` (baseline): both exit 0.
- Initial `forge build`: exit 69, `FORGE_TOOLCHAIN_MISSING` from the default pnpm shim. No code verdict.
- After declaring a complete npm-backed gate in `forge.toml`, `forge build --require-complete --json`: exit 0, `PASS`, lint/typing/test/build all passed; command `cmd_65b034a22fb5`. This is build evidence only, not live SDK proof.

## Open gaps

Every `planned`, `experimental`, `fixture`, or `blocked` row remains open. The full Beads graph (`bd ready`, `bd blocked`, `bd show`) records work and dependencies. The implementation program explicitly gates P0 Workbench release on live VC-1 and VC-2, not on this document.

Post-implementation candidate gate: `forge build --require-complete --json` at command `cmd_026091faa1ac` exited 0, `gate_verdict: PASS` across lint/typing/test/build/workbench-shell; dirty overlay was in scope. Direct real Claude SDK probes `qa/workbench/live-claude.mjs` and `qa/workbench/live-resume.mjs` both exited 0, but are not part of the default offline Forge gate because they spend live model resources. Native Forge SDK `qa/workbench/native-forge.mjs` and explicit `forge run native-read` command `cmd_3f893144b661` reached the real app-server; the native tier returned `success` separately from the portable gate. The portable default suite excludes live-binary tests; do not count it as native evidence. Rows still marked planned/experimental are not release-qualified.

## Native ecosystem receipts at 2026-10-15

These receipts cover the experimental adapters, not the complete program.

| Claim | Receipt | Scope and limitations |
| --- | --- | --- |
| Provider custody and output limits | red `cmd_0509b89efbc7`; green `cmd_7e50a487da08` | HX SDK-owned binary discovery; bounded Furnace cancellation; RF malformed JSON, stdout/stderr caps and TERM/KILL cleanup. |
| Real installed HX/Furnace/RF reads | `cmd_17dff02550cf` | Native tier passed. HX incomplete coverage stays incomplete. Missing Furnace/RF stores refuse rather than become empty. |
| Real RF noncommitted context | `cmd_994da817d4cd` | Initialized disposable RF workspace returned output and graph provenance without durable render ID. |
| External completed Furnace Run | `cmd_119b38150276` | Real bd/Furnace Run launched outside Pi, two native inspection tests passed, both stores unchanged. No live event reconnect claim. |
| Explicit host grant settings | red `cmd_43fcb1b2f195`; green `cmd_5ccca66d2b41` | Selecting Claude does not manufacture capability grants. Finite exact permissions only. |
| Incremental task counters | red `cmd_29a9e7b2c580`; green `cmd_5117236dec1e` | Changed entries replace prior contributions without revisiting historical progress. Full viewport benchmark remains separate. |

The prior complete gate does not certify source added afterward. Initial resumed gate `cmd_5cf8b5941d64` failed on import ordering and an unused type. Those defects were corrected; a new complete candidate gate must be recorded before committing.

## MechanicalWorkflows binding discovery

The separately installed checkout was inspected read-only at HEAD `2e1df0593adeda2b5a966b6d70208a5fe1b6a5c4`. Its immutable local `@mechanical/workflows-development@0.1.0` tarball has SHA-256 `651bdfd80d176a1bd9e590575dfd9d71aeed1dd04df1152d74aaec0f68b4b5e5` and exports ordinary `develop(services, request)`. The four injected callbacks are discover, compileContext, implement and verify. This package does not yet import or bind that function.

The entrypoint descriptor remains descriptor-only. The separate live rig uses a Git tracked-file census rather than task-scoped pinned HX discovery. Its HX filesystem query does not establish complete task scope. Therefore a narrower RF/Claude/Forge receipt cannot establish the required HX/RF/Claude/Forge composition. W11 and VC-3 remain blocked on a verified live task-discovery and service binding, not on absence of the core function. The separate checkout was changing concurrently; do not treat its mutable dist exports as the packed release.

## Package-content boundary

The external package smoke initially failed at `cmd_9da36fd585ef` because native producer state was included. `.npmignore` now excludes Beads, Forge, Furnace, HX and RF local stores. The package-content test passed at `cmd_ea0fdcdb11dc` while retaining compiled Workbench modules, Pi source entrypoint, native SDK artifacts and MIT license. This is artifact-content evidence, not clean install or live authentication proof.

## Registered Pi real Claude SDK proof

`forge run claude-live` passed at `cmd_b5f4df13dd3b` on 2026-10-15 using the deployed local Claude gateway. The registered `SubagentWorkflow` tool launched three actual SDK sessions, returned the schema values alpha/beta/gamma, read each persistent session through the SDK and retained bounded native tool/result observations. Instrumented Pi AgentManager spawn, spawnAndWait and resume recorded zero calls. SDK package: `0.3.300`.

Native session references: `0b01ae38-12f1-4785-9239-51823261de5e`, `f0d0b494-0319-42d0-a9dc-59a32f1b1c5d`, `b94defd0-212b-40a2-a67b-11eafd135947`. This is registered-tool/client acceptance with real SDK execution, not an actual terminal operator Ctrl-C journey. Invalid-model/permission and ownership cancellation remain fixture-verified. VC-1 stays experimental until its remaining live acceptance passes.

## Selectable native detail evidence

`test/workbench-native-details.test.ts` covers keyboard native-row selection, producer-qualified identity, transport/domain/freshness/evidence separation, node-only phases, terminal control sanitization, ASCII/Unicode widths and view-close without cancellation. The focused native/legacy dialog suite passed through Forge with the existing legacy key tests. This establishes the native detail increment, not the full four-view or scale-render acceptance.

## Clean external install

The external consumer gate initially failed at `cmd_8d6d9f378d88`: npm could not resolve local native SDK tarballs before extracting the parent package. The package now explicitly bundles the pinned Forge/Furnace/HX SDK dependencies. The clean install passed at `cmd_7ab930e0f018`, importing the compiled Claude host and registry and executing a compiled workflow in a separate npm consumer. Its worker uses a real ESM entry file, not inherited inline Node flags. No publication occurred.

## Bounded projection measurements

The focused Forge projection tier passed at `cmd_f23fb2f4e0e0`. The fixture ingested a history of 100,000 events over 1,000 native nodes while retaining a hot window of 100 events. Linux x64, Node v24.20.0. This benchmark exercises the read model, not terminal layout.

| Measurement | Observed value |
| --- | --- |
| Total ingestion | 1003.32 ms |
| Sampled ingestion p95 | 0.01562 ms |
| Exact invocation query p95 | 0.00270 ms |
| Maximum queried nodes examined | 1 |
| Maximum serialized one-node query | 535 bytes |
| Heap growth during fixture | 84,033,544 bytes |

Heap growth includes transient allocations and garbage collection behavior; it is not a retained-size or memory-ceiling proof. Full four-view navigation, grouped ancestor layout and terminal-byte cost remain unmeasured. The projection has independent provider-qualified deduplication, sequence regression and cursor-gap tests. An evicted event cursor yields partial-gap rather than falsely complete empty history.

The existing scripted extension end-to-end tier passed through `forge run e2e` at `cmd_3b63148b6fd2`. It remains a compatibility/client check, not a live terminal operator proof.

## Independent audit corrections

Independent executable negative controls found malformed schema acceptance, stale snapshot regression, missing open-interval queries, duplicated relation results, unsupported native envelope acceptance, and credential-preview leakage. Corrections are test-first and require another complete gate. Credential redaction first failed on JSON-quoted keys at `cmd_041dcea56ae9` and passed the corrected focused suite at `cmd_bc0cd1b3cfdf`. Do not reuse a gate from before these corrections.

## Feedback delivery status

Verified tool feedback was prepared in each owning repository using its local conventions. No feedback delivery is claimed until its commit lands remotely. Required full gates currently block delivery: RF's native test lock belongs to another running controller, HX's recovery-custody compile fixture fails, and Furnace compilation rejects missing domain types even with its exact consumed Forge pin. Forge's own full feedback gate remains running. The Pi program must not bypass those gates or stage sibling implementation changes to deliver a report.

A live registered Pi rerun failed task completion at `cmd_77883141b0e9` while the native journal recorded all schema answers successfully. The original task error was not captured, so concurrent identity drift is plausible, not established. Diagnostic-enhanced unchanged assertions subsequently passed at `cmd_aad02248b8ad`. Final native acceptance must be measured on stable source after all audit corrections rather than treating either historical result as final.

The corrected native envelope and diagnostic suite passed at `cmd_386a32a0323b`. Forge rejects unsupported result-envelope versions and wrong command identity through its own SDK decoder. RF requires an actual operation/workspace identity, structured graph provenance and zero noncommitted storage writes. Genuine native refusals remain separate unavailable outcomes rather than malformed-success substitutes.

## Audited candidate checkpoint

The complete no-replay Forge gate passed at `cmd_a227a5a2114e` with all six declared steps answered: lint, typing, portable tests, compilation, compiled workflow smoke and package-content smoke. The dirty overlay did not move during the run; it was not an isolated clean-tree release measurement. Forge separately reported its implicit workspace-root lock rewrite.

The final integrated native-read tier passed at `cmd_c584f4f2966a`. Real registered Pi/Claude SDK parallel-schema acceptance passed at `cmd_a76cf7a24d65`. Clean external npm installation including the packaged identity lock passed at `cmd_a3b6cb72595d`. External completed Furnace inspection passed at `cmd_c762b93756fb` and initialized RF noncommitted preview at `cmd_05eea8407a4a`. These establish the experimental embedded cut only. Full TUI operator, native executable identity, live reconnect, four-view scale, designer, MechanicalWorkflows live binding and detached release claims remain open.

The pushed embedded checkpoint `43ad58b` also passed a clean-source no-replay Forge gate at `cmd_f8b07a961042`. The measured source tree was `e126c49ba24c605a4c644a62eb24960170bdf6fc` with stable clean observed boundaries. This gate does not waive open program acceptance. Further inspector/designer/external-live-observer work changes the candidate and requires new gates.

## Source designer increment

Registered Pi source validation was red at `cmd_491d5d54787f` before its tool existed and passed at `cmd_7fcdf7518d74` after integration. The compiled external client passed at `cmd_fdf5d9317a3b`, proving source digests, AST possible-call projection and no source execution/edit. Canonical input receipts are separately pinned, including absent-versus-null distinction. The actual compare tool refuses to manufacture metrics or environment/cache identity. Full live improvement experiments remain open.

## Rich inspector increment under development

The inspector adds read-only overview, observed-reference graph, interval timeline and evidence/detail views over a scoped viewport projection. Native edges and intervals are displayed only when present; unlinked nodes and absent source timing remain unknown. Legacy control navigation remains reachable and view closure does not borrow native lifecycle authority. Snapshot-cursor byte limits were independently re-probed and corrected before this increment. Full native evidence content loaders remain limited to verified session/read APIs.

An independently launched real-Beads active Furnace Run was observed in a disposable fixture. Closing the local observer left its native controller live and its Attempt running. The reader offers bounded polling because native lifecycle cursor events are unavailable in this installed SDK. This strengthens external observation without granting Run ownership; the complete live Pi attachment receipt and final candidate gate remain required for the increment.

## External active Furnace and Pi reader receipts

The bounded `furnace-observe` tier passed at `cmd_9e36a2e8b1fb`, including the actual registered Pi tool and unchanged native Run-record bytes. The separate `furnace-active-observe` tier passed at `cmd_7b1487d9a348` while an independently launched disposable real-Beads Run remained active with a live controller after local observer closure. This proves read-only live attachment, not a native lifecycle cursor stream. Native status/attempt/log snapshots remain sequential and non-atomic.

## Source/runtime metadata alignment

An independent audit found the old runtime scanner could treat metadata text inside comments as the exported declaration while designer validation selected the actual AST. The runtime now uses the same pure AST literal decoder. New regressions were red at `cmd_5ccee3f800cb` and green at `cmd_241ddb08d9ee`; the actual harmless-decoy workflow returns its expected value without executing the commented expression. Existing script/golden metadata compatibility tests remain the governing checks. Metadata expressions now refuse before evaluation instead of relying on an empty-VM timeout.

## Additional compiled-client evidence

Read-only source designer client passed at `cmd_01ea531ff355`; compiled four-view inspector client passed at `cmd_c56ed87b3eee`. Inspector benchmark passed at `cmd_9572ac580306`: 100k synthetic updates/1000 native-qualified fixture nodes, no relation edges, 1000 navigation samples, p95 0.389 ms, maximum 17.69 ms and at most 40 rendered rows on Linux x64 Node24.20.0. This is not live native topology or grouped10k acceptance.

Optional same-machine detached shell passed at `cmd_c56e8a3abe1f`. Actual registered Pi pure-computation launch, Pi shutdown and reattachment passed at `cmd_bc6534564612`, returning the expected result while marking native executable identity unsupported. The profile is private Unix DAC only, not remote auth or host-crash durability.

## Second audited embedded/local-host checkpoint

The complete no-replay gate passed at `cmd_8b82057e039a` with all six declared steps answered and an unmoved dirty overlay. Portable suite: 142 files passed, 2436 tests passed and 7 skipped. Native-read passed at `cmd_09fd284346c2`; real registered Pi Claude SDK passed at `cmd_1463b8944ac8`; registered external Furnace tier passed at `cmd_5b01b7861f35`; detached lifecycle shell passed at `cmd_b21303c30b15`. Local-provider results in that shell are explicitly fixture-only and cannot establish native model or remote-host success.

Independent audit corrections in this increment cover metadata/runtime AST agreement, scoped stale projection after failed native reads, and transitive trusted-local-provider source pins. The whole W01–W22 program is not release-complete: MechanicalWorkflows live binding, native lifecycle cursor surface, full native evidence loaders, actual Pi live terminal acceptance, cross-host authentication, Furnace-hosted execution and grouped10k profiling remain open or blocked.

Clean pushed checkpoint `41eb061f461ecec5c3fae1042d13b9083fcc17a9` passed the complete no-replay Forge gate `cmd_ac084bb98d2f` on stable clean tree `3ffbf97e3e05d8e6cddefba0187ac6cfc1d4c8da`. These receipts establish the two published development checkpoints, not full Workbench release completion.

Final compiled viewport benchmark recheck `cmd_4ff4ffabcbe0` measured p95 navigation 0.358 ms and maximum 17.69 ms over the same edge-free1000-node/100k-update fixture. It retains the same native-topology, memory and actual-terminal limitations. The benchmark uses top-level imports and does not change production behavior.
