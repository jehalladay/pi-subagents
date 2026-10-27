# 18 — Decisions, risks, deliberate defaults and re-evaluation triggers

## Adopted target decisions

D01: Pi remains primary interactive interface and workflow designer/observer/operator.  
D02: Claude Agent SDK executes workflow agent() calls; Pi AgentManager is not a hidden substitute.  
D03: Fork src/workflow interpreter rather than invent a new DSL.  
D04: node() adds host-side typed SDK-backed calls; script VM never imports privileged clients.  
D05: MechanicalWorkflows remains ordinary function composition, no mandatory graph IR.  
D06: Furnace owns durable Run/Work/Attempt, admission and recovery; Workbench does not duplicate.  
D07: Preserve Forge/Beads/HX/RF source contracts, partial states and provenance.  
D08: Workbench observation can attach to unrelated native operations with explicit read permissions.  
D09: Terminal-native Pi TUI first; Unicode/ASCII and keyboard, no browser prerequisite.  
D10: Projected graph is partial, evidence-labeled; source and actual execution remain distinct.  
D11: Side-effect retry is producer-specific, never generic.  
D12: Independent optional SDK adapters, no mandatory Library, Forge primary build and no GitHub CI.  
D13: Keep original Pi non-workflow subagent features unless separately migrated.  
D14: Do not automatically rewrite a pinned running workflow after designer changes source.

## Key risks and mitigations

| Risk | Impact | Mitigation and test |
| --- | --- | --- |
| Claude Agent SDK versions/messages evolve | lost session/tool/usage semantics | pin SDK; explicit message discriminant conformance; diagnostic on unknown |
| Pi extension API diverges from upstream | runtime/UI breakage | snapshot versions, overlay/command tests, upstream sync gate |
| Claude script language and fork drift | existing workflows break | unchanged real golden fixtures and documented parity deviations |
| VM escape into host | credential/data exposure | separate process isolation for untrusted source; host-side authorization and no secret injection |
| Effectful node replay duplicates work | duplicate Furnace Run/edit | native reconciliation, uncertain effect, no blanket retries |
| Source graph conflated with trace | misleading causality | provenance labels and unknown edges, distinguish declared/observed/inferred |
| UI recomputes full logs at scale | terminal lag and CPU | incremental indexes, viewport, coalesced render and benchmark |
| Interpreting provider statuses uniformly | false verified candidate | source-specific types and evidence, negative test |
| Furnace nested work capacity deadlock | stalled swarms | native scheduling/await policy; admission test |
| No RF typed render SDK in pinned revision | weak integration | explicit unavailable block, provider-owned SDK improvement |
| Detached mode confused with durability | silent loss after crash | explicit host guarantees and tests |
| Cross-scope observation leak | secret/unowned operation data | scope-aware provider read ACL and payload redaction |
| Upstream fork history accidentally rewritten | licensing/maintenance loss | preserve fork history/MIT, deliberate small commits |

## Decisions deferred, with recommended starting defaults

**Claude permission mode:** default least-privilege scoped tools; do not select broad bypass. Exact supported settings verified in implementation.

**Source parsing:** re-use current literal meta parser plus best-effort AST source projection; no dynamic eval during discovery.

**Error boundary for node():** throw distinct typed host errors for validation/auth/uncertain cases; return unsuccessful native domain result as a value. Preserve legacy agent() null semantics at compatibility layer.

**Worktree creation:** use reliable installed Forge capability if available; otherwise exact Git/worktree behavior under explicit isolation policy, not a claimed Forge family API.

**Detached persistence:** defer until real observer/reattach consumer, then prefer native Furnace Run where appropriate; do not introduce new general durable DB.

**Graph engine:** deterministic layered/hierarchical ASCII graph of observed edges, cached; don't ship arbitrary force-directed full graph first.

**Provider extensibility:** explicitly versioned capability contracts in local host; postpone dynamic remote provider marketplace.

## Revisit criteria

Any new abstraction that duplicates SDK authority must demonstrate a real second consumer and domain contract equivalence; otherwise remove it. Any broad subsystem not used by VC-1 through VC-5 should remain unimplemented, not treated as an architectural prerequisite.

## Library design programs

CAC is a Library design program — neither a provider, an authority nor an evidence source for Pi; its status words are not consumed.
