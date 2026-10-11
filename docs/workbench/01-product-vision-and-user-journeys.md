# 01 — Product goals, users, journeys, and exclusions

## Product mission

Give Pi a native workflow laboratory: it can *design*, *run*, *observe*, *debug* and *improve* both Claude-style scripts and real workflows assembled from MechanicalWorkflows and the broader SDK ecosystem. Scripted agent() calls execute through the **real Claude Agent SDK**. Deterministic SDK operations execute through narrow host-side providers. Workbench observation is a derived lens over native state, never a competing execution authority.

## Primary actors

- **Human operator** in Pi's terminal: browse, filter, compare, approve control operations and inspect evidence.
- **Pi designer agent**: read source, plan experiments, invoke workbench tools, reason over bounded structured observations, propose and apply versioned source edits.
- **Claude execution agent**: independent Claude Agent SDK session invoked by a workflow agent() call, with curated tools and native SDK hooks.
- **Provider operation**: MechanicalWorkflows function, Furnace Run, Forge build, HyperUnix query, ReactiveFiber render, etc.
- **Independent external producer**: a Furnace executor or bead machine not originally started by this workbench.

## Concrete user journeys

J01 — Open Pi, discover saved Claude Code-compatible scripts in .pi/workflows and .agents/workflows, inspect metadata, run one unchanged. Agent work must be traced to Claude SDK sessions, not Pi AgentManager.

J02 — Use a script with agent() and a new node("forge.*") call. Node invocation returns a correctly typed native result and evidence reference; models need not interpret a shell transcript to use it.

J03 — Bind an ordinary MechanicalWorkflows develop() function to its four application dependencies in the host and invoke it, preserving the producer's verified_candidate / verification_failed / needs_evidence / indeterminate outcome rather than collapsing to Boolean success.

J04 — In Pi, open /workflows: compact tree, grouped fan-out, timeline, critical path when known, completion/failure/unknown. Drill into Claude transcript, Forge evidence, Furnace event stream. Resize and SSH remain usable.

J05 — Attach by Furnace Run ID to work launched outside Pi; observer reconstructs only supported native relationships, explicitly marks missing causal links and staleness. Closing view does not cancel run.

J06 — Pi studies ten historical executions, identifies measured repeated context compilation, proposes a revision, runs controlled baseline/candidate experiments on pinned source bases and compares native evidence, latency and costs.

J07 — Pi launches an external execution, exits, reconnects to independent host and reattaches. If hosted under Furnace, Furnace owns recovery; no claim that arbitrary JS stack survives process loss.

J08 — Workflow invocation times out after a side effect. Workbench displays uncertain state and producer-specific reconcile actions; no blind replay or false PASS.

J09 — Restricted review agent receives read-only HX/Forge inspection tools, not stop/publish/edit permissions; invoking forbidden capability is rejected at the host boundary.

J10 — Thousands of nodes, 100k events: overview and selection remain responsive with bounded terminal rows and incremental view projection; Pi receives compact query results rather than entire logs.

## Outcome measures

- Legacy workflow golden fixtures produce compatible outputs and control flow with actual Claude SDK sessions.
- One real end-to-end path performs HX discovery -> RF context -> Claude implementation -> Forge verification; optional Furnace gate is native and independently identifiable.
- Clear evidence joins: from workflow node to source revision, native operation ID and terminal result; no fabricated producer result.
- Pi can attach to independent Run; parent/child observations do not imply lifecycle ownership.
- Inspector navigation targets <=20ms calculation under designated benchmark machine, 1000+ operations and 100k-event fixture; report actual measurements.
- Provider-neutral package has no mandatory import of all ecosystem SDKs and no Library dependency.
- At least one grounded before/after workflow optimization is demonstrated with reproducible workload and uncertainty annotations.

## Exclusions

Not a replacement for Furnace/Beads/Forge/HX/RF/RCP; not a mandatory universal workflow graph DSL; not a new job-queue/storage authority; not a web-first dashboard; not a claim of universal precisely-once effects, instantaneous recovery, perfect static graph extraction, or automated live-code replacement. No GitHub CI.