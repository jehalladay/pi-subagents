# 11 — Decisions, alternatives and limits

These decisions are adopted for the **initial MechanicalWorkflows architecture**. They do not amend the core products' requirements.

| ID | Decision | Why | Reconsider only when |
| --- | --- | --- | --- |
| D-01 | Ordinary TS/Python functions are the workflow unit | Native language composition beats an invented DSL | A real consumer demonstrates a missing primitive |
| D-02 | Library is absent from build/runtime/test/deploy graph | Avoid bulky swarms and historical coupling | Not a soft preference; preserve exclusion |
| D-03 | Root Forge workspace with independent library and app | Independent deployable units and first-class Forge dogfooding | Existing Forge contracts require changed layout |
| D-04 | Two members initially, no `workflow-core` | Avoid premature abstraction and package overhead | Shared implementation repeated by actual consumers |
| D-05 | Direct native SDKs preferred | Products own rich semantics and results | Only where a semantic boundary needs adaptation |
| D-06 | Agents' tool provider conversions live in provider adapters | No Claude-specific `asTools` in generic core | A tiny common descriptor seam emerges from multiple real products |
| D-07 | No generic execution handle/status | Furnace, Forge, models and local Promises differ | Proven cross-provider semantic equivalence |
| D-08 | Hostable entrypoints optional and descriptor-first | Local functions shouldn't require deployment ceremony | A second host reveals real duplicate binding/validation code |
| D-09 | Furnace is optional and owns durability | No second Run/Work/Attempt or scheduler | Never replace Furnace authority |
| D-10 | Beads owns work readiness | No second workflow DAG authority | Beads product contract changes |
| D-11 | Keep effects uncertain after ambiguous timeout | Avoid duplicate Runs/edits/publications | Producer supplies native idempotency/reconciliation |
| D-12 | One writer initially | Safe without unavailable child workspace guarantees | Forge Workspace Families tested live |
| D-13 | No globally portable agent interface required | Preserve provider-specific agent capabilities | Workflows prove real interchangeability need |
| D-14 | Application-level outcome types may be specific | Avoid universal Result/Task enums | Real cross-package reuse demonstrates common domain |
| D-15 | Python parity at product SDK contracts, not all workflow implementations | Avoid maintaining duplicate application algorithms | A real Python consumer requires a particular workflow |
| D-16 | No GitHub CI; use Forge/local QA | Align with Forge dogfooding | User changes direction |

## Rejected initial alternatives

- Put scripts under Library and ask every worker to clone it: rejected due to size and dependency pollution.
- Build a MechanicalWorkflows scheduler/registry/recovery engine: rejected; would overlap Furnace/Beads.
- Make every function `defineWorkflow({ nodes, edges, policy })`: rejected; direct code is richer, less ceremony.
- Turn all SDK methods into Claude Agent SDK tools: rejected; provider-specific adapter and curated intent-based tool surfaces are preferred.
- Deploy a common runtime on every worker: rejected; host-native entrypoints should load separately packaged functions.
- Automatically cascade cancellation through causal children: rejected; causal origin does not imply lifecycle authority.
- Default to splitting many workflow packages: rejected until real reuse.
- Assume a Furnace executor is automatically checkpointable or exactly once: rejected; durable state and effects have specific native contracts.

## Scope checks for future additions

Ask: Does the behavior belong to the workflow's application policy, or is it generic execution/query/build/context logic that should improve the native product? Can the caller already write an ordinary function? Does a real second consumer need this package extraction? Do we have a negative-control test against false success? Does the design introduce a runtime dependency on a provider not used in this deployment?

If an item cannot be justified with those questions, leave it as a user-land function or a documented target. Favor composition through existing SDKs, not another layer.
