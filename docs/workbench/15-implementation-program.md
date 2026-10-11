# 15 — Full implementation program and vertical-cut acceptance

The work below is deliberately decomposed into independently assignable work packages (WPs). It is *not* a request to implement the entire architecture as one PR. Ship and validate vertical cuts. Every WP requires source, tests, docs/status changes and native evidence when relevant.

## Vertical cuts

**VC-1: Pi -> Claude SDK workflow** (P0)
- Keep Pi extension loaded, /agents and legacy workflow interaction working.
- Forked WorkflowHost uses actual Claude Agent SDK for agent(), streaming/session refs; legacy script fixtures unchanged.
- Terminal card displays live actual Claude execution. An explicit test asserts Pi AgentManager is not called for script agent().
- Ctrl-C/cancel and invalid model/permission failures behave explicitly.
- Success proof: real Claude SDK script with parallel agents and structured schema, inspected in Pi.

**VC-2: node() + real SDK operation** (P0/P1)
- Add sandboxed node() RPC and capability registry with read/invoke permissions.
- One real HyperUnix query *or* Forge read/verification call; do not invent API.
- Show native evidence in Pi terminal and structured Pi tool query.
- Negative: forbidden SDK write, invalid schema, stale/partial evidence, lost-result ambiguity.

**VC-3: MechanicalWorkflows native composition** (P1, contingent on live bindings)
- Discover descriptor, pin package and host, construct real services, invoke develop() and preserve domain outcomes.
- Demonstrate HX->RF->Claude SDK->Forge pipeline when those APIs actually deliver. Document blockers honestly.
- An optional Furnace gate uses Furnace native Work/Attempt identity, not a second scheduler.

**VC-4: Externally launched Furnace observation** (P1)
- Attach by Run ID without invoking parent workflow.
- Snapshot/events, freshness, unknown gaps, selected evidence; no change to Run on view close.
- Derived tree/timeline shows observed rather than invented edges.

**VC-5: Rich terminal inspector** (P1)
- Four views: overview/tree, graph, timeline, evidence; hierarchical aggregation; key navigation; responsive 80x24.
- Benchmark >=1000 nodes/100k events with measured <=20ms navigation target and no full-log redraw fold.

**VC-6: Pi design/compare loop** (P1/P2)
- Pi reads source and capability catalog; proposes patch; validates against pinned artifact; executes comparison with real native evidence; reports gains/confounders.
- No automatic live implementation replacement.

**VC-7: Detached and Furnace-hosted execution** (P2)
- Remote host authentication, reattachment, native immutable deployment refs, crash/uncertain-operation conformance.
- Pi exits without stopping execution. Furnace remains durable authority only when Furnace host chosen.

## Independently assignable packages

| WP | Dependency | Implementation scope | Acceptance |
| --- | --- | --- | --- |
| W01 | none | Baseline tests, upstream snapshots, Forge packaging | recorded baseline; no regressions |
| W02 | W01 | Claude SDK host replacing workflow spawn path | SDK trace, Pi manager not called |
| W03 | W02 | Role/tool/model config and permissions | rejected disallowed access |
| W04 | W02 | Structured output, usage, transcript, resume | native session continuation proof |
| W05 | W01 | node() language/RPC, error semantics | script returns typed node value |
| W06 | W05 | Provider registry and permissions | deny crafted unauthorized RPC |
| W07 | W06 | HyperUnix provider | real query coverage and source basis |
| W08 | W06 | Forge provider | real typed gate and evidence |
| W09 | W06 | Furnace invoke/inspect/observe provider | externally started Run observable |
| W10 | W06 | RF provider/interop | real render or honest blocker |
| W11 | W06 | MechanicalWorkflows binding host | actual develop() with real services |
| W12 | W02,W05 | Workflow task/journal split and side-effect policy | no blind replay |
| W13 | W02,W06 | Event collector and native observation adapters | reconnect/dedup/stale |
| W14 | W13 | Incremental projection + typed relationship indexes | no full event fold |
| W15 | W14 | Rich TUI tree/timeline/graph/details | keyboard and benchmark passes |
| W16 | W13 | Pi catalog/inspect/observe/control tools | compact bounded result and ACL |
| W17 | W16 | Source-aware designer, static projection and comparison | evidence-linked experiment |
| W18 | W02,W12 | Detached host, optional Furnace ExecutorApp | Pi exit/reconnect, semantic safety |
| W19 | ongoing | Security/prompt injection/privacy tests | negative controls |
| W20 | ongoing | SDK usage feedback to upstream products | precise version/reproducer/owner |
| W21 | W15,W18 | Scaled swarms / profiling | 10k+ grouped operations measured |
| W22 | ongoing | Packaging/docs/install/compat migration | reproducible Forge gate |

## Gating policy

P0 release cannot claim working workbench unless VC-1 and VC-2 **live** pass. P1 inspector release requires VC-4/VC-5 with real native source and scale benchmark. MechanicalWorkflows integration status must be independently reported; it cannot hold basic Pi/Claude execution hostage, nor can unfinished dependencies be represented as shipped.

Do not cross dependencies improperly: W11 may consume SDKs and a MechanicalWorkflows package; MechanicalWorkflows core does not import W11 or Workbench. W18 may consume Furnace; Furnace does not import Workbench.

## Upstream feedback

When an SDK blocks work, file a requirement in owning package with concrete method/version, repro, contract mismatch, latency measurement if relevant and falsifiable acceptance. Prioritize improving native SDK instead of permanent local shims.

## Agent handoff

Every work item assignment must include: baseline SHA, required docs, target file list, expected public contract, integration fixture/test, negative controls, Forge gate, upstream blocker reporting, and independent outcome evidence. Implementation agents should update docs/00-current-state-and-source-map.md and this plan as shipped behavior changes.