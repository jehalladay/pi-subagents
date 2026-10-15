# 11 — Pi designer, operator tools and closed-loop experimentation

## Pi remains the intelligence

Pi's existing LLM harness is the interactive programmer, not a passive dashboard attached to an unrelated service. Register Pi-native tools and /workflows command backed by shared workbench services. These services must also be usable without TUI to support tests and optional detached hosting.

## First public Pi tools (proposed)

- workflow_catalog(filter?,limit?,cursor?): saved script sources, MechanicalWorkflows entrypoints, available SDK capabilities and contract references.
- workflow_inspect(target,view?): definition/source, static projection, native reference/evidence, operation details, never implicit invocation.
- workflow_validate(sourceRef,inputs?,bindings?,mode?): syntactic/metadata/schema/deployment capability checks with errors/warnings and uncertain conditions.
- workflow_execute(definitionRef,input,hostMode,policy?): authorized launch; returns logical invocation and native references, not false completion.
- workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event window, aggregates, freshness, anomaly evidence.
- workflow_control(ref,action,params?): explicit native action after permission/preconditions; returns requested/acknowledged/result distinct.
- workflow_reconcile(taskId,action,position?,…): experimental; inspect a resume-refusing journaled effect, gather one authorized producer read as a bound receipt, and record an operator acknowledgement or single-use override (exact reconcile:<producer>.<action> grant + confirmation); records decisions, never executes or resumes anything itself.
- workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis alignment, measured metrics and confidence/coverage limits.

Use compact structured schema, discover more capability detail on demand; do not insert all SDK method signatures into every Pi prompt.

## Workflow designer cycle

A. DISCOVER sources and capabilities; read code and policy.  
B. FORM an explicit hypothesis grounded in measured prior runs.  
C. DESIGN a source edit and corresponding validation plan.  
D. CHECK compile/types, SDK permission bindings and expected side effects.  
E. EXECUTE benchmark on pinned source/basis with authorization, ideally isolated Forge workspace.  
F. OBSERVE native execution and evidence; detect partial/stale coverage.  
G. COMPARE baseline/candidate with equivalent inputs, model/provider/config and cache conditions (or call out differences).  
H. REPORT diff, tests, effect assumptions, realized improvement and residual uncertainty. Human/operator promotes changes explicitly.

No automatic rewrite of live pinned scripts. Do not claim that source analysis recovers all dynamic branches. A static graph indicates possible calls; an observed graph indicates what actually happened.

## Workflow analysis capabilities

- Inspect AST call sites for known script primitives, imports/call graph for MechanicalWorkflows functions, provider references and Furnace formulas.
- Resolve available schemas and SDK contracts; identify incompatible input/output shapes and missing host bindings.
- Build projected dependency graph with provenance on each edge (declared, observed, inferred). Mark undecidable dynamic loops/branches as unknown.
- Use native observations to analyze fan-out, waiting, redundant context computation, Forge incremental reuse, retry churn, queue bottlenecks, expensive critical paths and unsafe retry boundaries.
- Generate precise source patches, code navigation refs, tests and developer feedback to owning products instead of patching internal SDK assumptions in Workbench.

## Operator actions versus designer edits

Tool invocation provenance records who requested operation and what authority was granted. Pi can *recommend* changes without permission to apply them. Design-time edits occur against versioned source; execution against immutable digest. Live control must be native-provider-specific and cannot be inferred from causal parenthood.

## Comparative experiment protocol

- Pin workload, input revisions, workspace basis, code digest, model config, SDK versions and permissions.
- Capture cold/warm cache state and environment differences.
- Establish baseline and candidate native evidence, not only elapsed wall clock.
- Use repeated runs where stochastic agent variation matters; report dispersion and budget.
- Separate model tokens, provider waiting, Forge build time, RF context time, external queue and overlay overhead when telemetry allows.
- Decline precise claim if trace coverage insufficient; include raw evidence references.

## Acceptance journeys

- Pi reads saved script, opens inspector, executes it with Claude SDK; no Pi-owned subagent used for script agent().
- Pi inspects a MechanicalWorkflows ordinary function and its descriptor without executing it.
- Pi attaches to externally created Furnace Run, explains last-known state and observation freshness.
- Pi generates a source diff improving redundant task, validates it, executes reproducible comparison and cites native results.
- An observer-only Pi instance cannot stop the Run, even with a guessed action name.
## Experimental read-only source tools

Explicit `workbench:design` enables registered `workflow_catalog` and `workflow_validate` tools. Catalog replies are bounded definition/source references without eagerly returning every source body. Validation reads exact authorized source bytes, checks their digest, uses an AST to establish literal metadata before the existing parser, and compiles syntax without execution. Possible calls are declared-source observations only; dynamic branches, aliases and unavailable bindings remain uncertain. No source is edited or promoted.

The experimental `workflow_compare` also requires `workbench:observe`. It compares only captured same-operator/workspace receipts. Input/model/tools/environment/cache and source cohorts must be established independently before reporting precise metric deltas. Missing native measured metrics yields unknown, not a claimed optimization. The function supports descriptive cohort dispersion but does not infer causation or critical path. A full evidence-linked native improvement experiment remains a separate acceptance journey.
