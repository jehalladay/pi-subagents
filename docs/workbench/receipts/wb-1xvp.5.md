# wb-1xvp.5: [RF-GRAPH-POLICY-MACHINE-CONTROL-R4] If Pi ever calls gp in a decision loop (gated: deliverables 2 and 7, unshipped), the integration shall run under a declared budget and report its cost: p50/p95/p99 latency, CPU/memory/token/subprocess costs, model-load overhead, cache effectiveness; per-observation bd calls, latency, bytes receipted; bd reads within a declared budget, excess marked partial ... docs/programs/graph-policy-machine-control-2026-10-21/README.md:454@6a251bf73af5

## 2026-10-22 receipt: the gp decision-cost guard pins today's absence and refuses an unbound gp site (base 0b2a80f)

- Requirement (RF-GRAPH-POLICY-MACHINE-CONTROL-R4): ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:454 at 6a251bf73af5, "Measure p50, p95, and p99 decision latency; CPU, memory, token, and subprocess costs; model-load overhead; and cache effectiveness." Merged pins :153, :456, :469 and :471; authority :452.
- Gate: the duty binds once Pi calls gp in a decision loop. Its gating artifacts, the shared adapter (deliverable 2) and the evaluation (deliverable 7), are unshipped. At base 0b2a80f no src file names the gp binary, the graph-policy-cli package, a graphpolicy envelope schema or GraphDataIR. The guard pins that absence as a rule and refuses a site that lands without its cost evidence. It adds no gp code, no dependency and no settings key.
- Guard: `test/workbench-gp-decision-cost.test.ts`, in the default gate tier (`vitest.config.ts` includes `test/**/*.test.ts`).
  - G1 reads every string token and identifier of the 115 .ts files under src/ through the TypeScript parser (13,410 string tokens at base) and finds no site. Every file that holds a site must be bound in GP_COST_BINDINGS, which is empty. The same reader finds the rf spawn in src/workbench/providers/reactivefiber.ts and the git reads in src/index.ts.
  - G2: a binding names a registered case for each clause below. An unbound site, a stale binding, an empty clause, an absent file or title, and a case held by a skip, todo, only, skipIf, runIf or fails member each refuse.
  - G3 reads README.md, CHANGELOG.md and every .md file under docs/ (69 files with this receipt) and finds no cost claim. A line naming gp or GraphPolicyCLI beside a claim family below must cite an evaluation receipt under docs/workbench/receipts/ that states every figure below, or be one. This receipt states none of them.
- Producer interface, measured read-only on 2026-10-22: the installed gp prints "gp 0.1.0 (commands: graph check, inspect errors, rpc --stdio, skill install, skill provenance, skill plugin install; protocol: graphpolicy.rpc.v1)" for --version. GraphPolicyCLI's ts/package.json at c099413 names the package graph-policy-cli 0.1.0 with bin gp. Its ts/src spells the envelope schemas graphpolicy.rpc.v1, graphpolicy.cli.v1, graphpolicy.data.v1, graphpolicy.function.v1, graphpolicy.journal.v1, graphpolicy.limits.v1 and graphpolicy.error.v1, and the rpc refusal GP_RPC_METHOD_UNSUPPORTED, the unsupported-method refusal clause c names.
- Anchor listing. The guard's anchor row holds CLAUSES, MARKERS, CLAIM_FAMILIES, FIGURES and RESIDUALS to the lines below, in order, so a member removed from every literal of the guard is still red here. Each line is plain text.

- Clause a: each gp call and observation records latency, subprocess count, beads_calls (= fake seam invocations), latency_ms and serialized_bytes; a receipt missing them is refused.
- Clause b: read budget N -> the fake bd seam sees at most N calls and the receipt marks completeness 'partial'; an over-budget telemetry cycle is cut and marked partial; budgets are declared settings.
- Clause c: fake rpc seam: N decisions in one run open one session, not N processes; a verb rpc refuses (unsupported-method) is recorded transport='cli', never relabelled.
- Clause d: an evaluation receipt aggregates p50/p95/p99 from recorded per-call values, instrumentation overhead apart from inference.
- Marker binary: a word of a string token whose basename is gp: the bare name, a path ending in /gp, an argv word, or a word of a shell line.
- Marker namespace: a string token naming the producer: the graph-policy-cli package, a graphpolicy envelope schema such as graphpolicy.rpc.v1, or GraphDataIR.
- Marker identifier: an identifier naming GraphPolicy or GraphDataIR, such as a client class, a binding or a type.
- Claim family bottleneck: a bottleneck denied: no bottleneck, not a bottleneck, never a bottleneck, without a new bottleneck.
- Claim family percentile: a p50, p95 or p99 figure: the percentile, then a number and a time unit within forty characters.
- Claim family negligible: a cost called negligible, cheap, zero or low: negligible, cheap, zero-cost, low-latency, low-overhead.
- Figure p50: p50, the median decision latency.
- Figure p95: p95, the 95th percentile decision latency.
- Figure p99: p99, the 99th percentile decision latency.
- Figure inference: inference, the time spent in gp inference.
- Figure instrumentation-overhead: instrumentation overhead, the instrumentation cost, apart from inference.
- Residual R-RUNTIME: a binary name built at run time or read from settings or the environment is no string token, so its spawn is no site.
- Residual R-SCOPE: only the .ts files under src/ are read; qa/, examples/ and test/ hold tooling and evaluation, never the machine's decision loop.
- Residual R-REPORT: a bound case is found in its test source, never in vitest's report, so a case that fails, never collects or asserts nothing still binds; the census tier's judge() reads those legs once a binding exists.
- Residual R-LINE: a cost claim whose subject is named on another line is not read as a gp claim.
- Residual R-FIGURES: an evaluation receipt is admitted by the shape of its figures, never by recomputing them from per-call records.

- Red first: the guard's final bytes, with this receipt moved aside, read 2 failed | 54 passed (56). The two red rows were the anchor row (ENOENT on this file) and the G3 rule row (this file absent from the docs reading). The first draft read 2 failed | 51 passed (53) on the same two rows.
- Green: 56 of 56 (`vitest run test/workbench-gp-decision-cost.test.ts`); the slowest case took 967 ms.
- Falsifiers on the real tree, each temporary file removed after its run:
  - F1, a temporary src file that spawns gp: 1 failed | 55 passed (56), the G1 rule row.
  - F2, a temporary docs file with an unbacked cost claim: 1 failed | 55 passed (56), the G3 rule row.
  - F3, that claim citing a temporary receipt that states all five figures: 0 failed | 56 passed (56).
  - F4, the F1 spawn bound in a throwaway copy of the guard to four registered cases: 0 failed | 56 passed (56).
- CT battery (standing rule 16, v2), each member on a throwaway copy of the guard, removed after its run: CT-BATTERY v2: CT1 red=1; CT1b red=1; CT2 red=2; CT3 red=1; CT4 red=2; CT5 red=1; CT6 red=1.
  - CT1 deletes the binary fixture path and CT1b the namespace fixture schema; the frozen-shape row reads red. CT2 shortens clause b; the frozen-shape and anchor rows read red. CT3 swaps the binary fixture path for a passing snippet with no site; the per-marker row reads red. CT4 deletes the identifier marker row; the frozen-shape and anchor rows read red. CT5 deletes it with its frozen-shape element; the anchor row alone reads red.
  - CT6 removes clause c from every literal of the guard (its row, its frozen element, its pins, and its binding case with the case count); the anchor row alone reads red. The same coordinated removal of the identifier marker (with its type member and its reader branch), of a claim family, of the inference figure and of the R-LINE residual each read 1 red, the anchor row alone.
- Seat probes beyond the battery, each killed: a whitespace-only word split (2 red), a case-sensitive namespace marker (2), a held case read as registered (1), a held suite read as registered (1), any cited receipt accepted (6), no self-evidence (1), the subject narrowed to the bare word (3), a substring binary match (2), the stale-binding check removed (1).
- Contacts: a probe commit of this cut was merged with merge-tree against each gate-queue entry (wb-1xvp.4 81723fc, wb-a9l2.2 fc616bd, wb-ouo3 e555304), and each returned rc 0. No entry touches src/, docs/, README.md or CHANGELOG.md, the files this guard reads. The wb-1xvp.4 census reads src/ only.
- Non-claims: no gp process ran in Pi and no decision cost was measured; this entry states no latency figure. A later binding is held here by registered titles only (R-REPORT); whether those cases run, pass and assert is the census tier's judgment.
