# 02 — Atomic, falsifiable requirements

Requirements are individually assignable and independently testable. P0 = first runnable vertical cut; P1 = next usable release; P2 = later. Each SHALL denotes a release obligation, not already shipped behavior.

| ID | Priority | Requirement / observable acceptance |
| --- | --- | --- |
| WB-001 | P0 | Pi remains the interactive command/tool/TUI host; a script workflow can be initiated from Pi. |
| WB-002 | P0 | Workflow agent() runs by @anthropic-ai/claude-agent-sdk; trace proves SDK messages and session identity; never silently uses Pi sessions. |
| WB-003 | P0 | Legacy script globals and meta parsing remain supported; baseline golden scripts execute without edits. |
| WB-004 | P0 | Existing non-workflow Pi agent features are not deleted merely to migrate workflow agent(). |
| WB-005 | P0 | Host-side node(id,input) is additive and executes without an LLM call for deterministic SDK nodes. |
| WB-006 | P0 | node() input/output enforce JSON transport boundary; malformed/non-serializable payloads fail before provider effects where possible. |
| WB-007 | P0 | Missing provider, unknown capability ID, schema mismatch and unavailable binding fail explicitly, not as null success. |
| WB-008 | P0 | Capability discoverability and capability invocation authorization are independent. |
| WB-009 | P0 | Claude session IDs, input/output, tool events, native SDK failure and token usage are translated without invented values. |
| WB-010 | P0 | Stopping the parent propagates cancellation only through established ownership and appropriate SDK API; stopping observation does not. |
| WB-011 | P0 | The existing workflow tool remains available in Pi without collision or competing shadow tool names. |
| WB-012 | P0 | Old workflow tests remain green under supported upstream mode and new executor-mode tests are added. |
| WB-013 | P0 | At least one real SDK node is proven end-to-end, plus explicit negative controls. |
| WB-014 | P0 | Workflow invocation carries definition, immutable implementation basis and logical invocation ID; native refs remain intact. |
| WB-015 | P0 | Workbench cannot turn absent/unknown/partial producer evidence into successful domain verdict. |
| WB-016 | P0 | Existing Pi inline workflow card and inspector remain operational through migration. |
| WB-017 | P0 | Operator can view node type, name, native ID, current observation freshness, and last error in a terminal detail view. |
| WB-018 | P0 | Pi can query bounded semantic observations without consuming raw event logs or terminal-rendered text. |
| WB-019 | P0 | Forge controls build/test/release verification; no GitHub CI added; no Library dependency. |
| WB-020 | P0 | Upstream MIT license and original copyright retained. |
| WB-021 | P1 | Claude SDK resume reattaches to correct session; invalid or lost session yields explicit failure, never fresh-context masquerading as resume. |
| WB-022 | P1 | Sandbox worker and privileged providers communicate only via validated RPC; hostile scripts cannot acquire host SDK credentials through intended API. |
| WB-023 | P1 | Provider nodes expose inspect/observe only where producer supports them, including event cursor or snapshot freshness. |
| WB-024 | P1 | Pi attaches to an externally started Furnace Run with no causal assumption that Pi owns it. |
| WB-025 | P1 | Workbench distinguishes Run/Work/Attempt, Forge operation and workspace basis, Claude session, HX coverage, RF provenance. |
| WB-026 | P1 | Interrupted effectful operation is reconciled through producer or marked uncertain; no automatic blind repeat. |
| WB-027 | P1 | Terminal inspector supports overview, tree/graph, timeline, detail and a keyboard-only navigation path. |
| WB-028 | P1 | Terminal inspector has plain ASCII tier, theme-aware color tier, and usable 80-column/24-row fallback. |
| WB-029 | P1 | Over 1000 nodes: render cost scales with visible slice and changed ancestors; no full historical-log fold per frame. |
| WB-030 | P1 | Layout, reducers, status classification and control capabilities are pure/testable without a real terminal. |
| WB-031 | P1 | Running and settled Claude conversations can be opened from inspector through Claude transcript adapter. |
| WB-032 | P1 | Pi can use observer tools to inspect definition, retrieve bounded event windows, source/evidence refs and compare two runs. |
| WB-033 | P1 | Hosted MechanicalWorkflows develop() executes actual exported function with explicitly bound native dependencies; fixture outputs cannot be presented as live. |
| WB-034 | P1 | Claude agent receives only curated, authorized provider tool surfaces; list/inspect never grant invoke. |
| WB-035 | P1 | Node events show result/effect distinction (transport, domain and authority-specific status). |
| WB-036 | P1 | Event ingestion can reconnect/deduplicate; gaps and stale timestamps are visible. |
| WB-037 | P1 | Source-defined edges, observed edges and inferred links are distinguishable. |
| WB-038 | P1 | Versioned plan/execute/observe comparison uses immutable source and config digest references. |
| WB-039 | P1 | No automatic code-edit and live replacement of already pinned running execution. |
| WB-040 | P1 | Control actions have native preconditions, permission checks, prompts/confirmations and acknowledgements. |
| WB-041 | P2 | Optional detached workbench host permits Pi client disconnect/reconnect, without falsely claiming crash durability. |
| WB-042 | P2 | Optional Furnace host uses the verified per-Attempt extension-driver semantics (one host session per Attempt; work_failure and resident-host indeterminate terminals park the Run for the operator ladder and are never auto-retried, while Furnace's own recorded retry.* policy admits automatic re-attempts for other classes — timeout under retry.retry_timeout, default false; infrastructure_failure under retry.retry_infrastructure_failure, default true, bounded by retry.max_attempts — per Furnace README.md:749-759@15fd6f8ee), avoiding another durable scheduler. |
| WB-043 | P2 | Optional HX-based cross-product provenance queries, without mandating HX as event store. |
| WB-044 | P2 | RCP-assisted continuation only where explicitly supported and conformance-tested. |
| WB-045 | P2 | Hierarchical agent-swarm aggregation and profile comparisons handle 10k+ nodes subject to benchmarked limits. |
| WB-046 | P2 | Native capability-provider additions require no changes to interpreter core. |
| WB-047 | P2 | Workflow designer can generate tests, source diffs and evidence-linked performance recommendations. |
| WB-048 | P2 | Artifact/host compatibility detects mismatched digest and rejects or explicitly migrates. |
| WB-049 | P2 | Workbench release supports reproducible install and bounded per-provider optional dependencies. |
| WB-050 | P2 | Agent-driven workflow optimization demonstrates measurable improvement without introducing unverified claims. |

## Nonfunctional invariants

NFR-01: No model/tool/scheduler produces a successful domain verdict without native evidence. NFR-02: No host auto-retry of ambiguous irreversible writes. NFR-03: No accidental escalation from observer to controller. NFR-04: All UI decisions have keyboard access; browser and graphics terminal support are optional, not required. NFR-05: Rendering and model observation are separate consumers of indexed projections. NFR-06: No Core Forge-Furnace coupling is introduced; adapters live at application edge. NFR-07: Every named acceptance claim records tested revision and environment. NFR-08: Every feature is labeled shipped, experimental, planned, or blocked with exact source of evidence.