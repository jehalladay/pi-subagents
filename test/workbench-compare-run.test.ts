/**
 * wb-rz62 (the W17 remainder carved from wb-pno at the 2026-11-11 graph audit): native metric sourcing for comparison
 * receipts. The bead's acceptance, verbatim: "Done when: comparison receipts consumed by wb-h8f.2 draw their metrics from
 * the native workflow metric source, with a gate-passing test that fails if metrics are supplied inline rather than
 * natively sourced." The native workflow metric source is the latency decomposition of an invocation's observed source
 * intervals (src/workbench/latency.ts selectLatencyDecomposition, then toMeasuredMetrics: "MeasuredMetric rows for
 * compareWorkflowRuns"); the receipt builder is nativeCompareRun in src/workbench/compare-run.ts, and the registered
 * workflow_compare tool builds its two receipts through it (test/workbench-pi-compare-native-metrics.test.ts, NM-9).
 * docs/workbench/11-designer-and-operator.md section "Experimental read-only source tools": "Missing native measured
 * metrics yields unknown, not a claimed optimization."
 *
 * Pinned reader set (this file): NM-1..NM-8, each asserting nativeCompareRun's receipt (and, in NM-3, NM-5 and NM-7,
 * compareWorkflowRuns over it) against figures computed by hand from the seeded source intervals, never read back from
 * the builder's own sources. Falsifiers: NM-1 and NM-2 red when the receipt's metrics come from the input or a constant;
 * NM-3 reds when rows are minted without a workflow root; NM-4 reds when freshness is assumed current; NM-5 reds when a
 * host node's ref binds a metric; NM-6 reds when rows or refs leave the invocation's bounded page; NM-7 reds when the
 * two receipts' rows are crossed or summed; NM-8 reds when a captured digest is dropped or replaced.
 * NM-0 pins the reader set itself: the case ids NM-1 to NM-8 and their titles, in order (a case removed, renamed out of
 * the set or retitled reds it).
 * Native token usage metrics are NOT CLAIMED by this file: the builder supplies no usage rows, so tokens stay unmeasured.
 * A measured verdict through the registered tool is NOT CLAIMED by this file.
 * Every figure below is seeded by hand: no host clock or host randomness anywhere in the measured path.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { COMPARE_PAGE_LIMIT, type NativeCompareRunInput, nativeCompareRun } from "../src/workbench/compare-run.js";
import { type CompareRun, compareWorkflowRuns, type MeasuredMetric } from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest } from "../src/workbench/identity.js";
import { selectLatencyDecomposition, toMeasuredMetrics } from "../src/workbench/latency.js";
import { type Interval, type NativeRef, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";

const alice: ObservationScope = { workspace: "ws-compare-run", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-compare-run", principal: "bob" };
const T0 = Date.parse("2026-11-11T08:00:00.000Z");
const at = (seconds: number): string => new Date(T0 + seconds * 1000).toISOString();
const span = (start: number, end: number): Interval => ({ startedAt: at(start), endedAt: at(end) });
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "operation", id });

const SCRIPT = 'export const meta = { name: "compare", description: "native metrics" }; return 1;';
const SCRIPT_DIGEST = `sha256:${createHash("sha256").update(SCRIPT).digest("hex")}`;
const BASIS = identityDigest("compare-run-basis", {});
function snapshotOf(id: string): InvocationSnapshot {
  const definition = { kind: "script" as const, id: "compare.js", schemaVersion: "1", artifactDigest: SCRIPT_DIGEST };
  const pinned = { definition, dependencyDigest: BASIS, hostImplementationDigest: BASIS, runtimeArtifactDigest: BASIS, configurationDigest: BASIS, hostAbiDigest: BASIS, providerContractDigest: BASIS };
  return {
    identity: { logicalInvocationId: id, definition, deploymentDigest: identityDigest("deployment", pinned), subjectBasis: BASIS },
    scriptDigest: SCRIPT_DIGEST, scriptSource: SCRIPT, dependencyDigest: BASIS, hostImplementationDigest: BASIS, hostArtifacts: [], runtimeArtifacts: [], runtimeArtifactDigest: BASIS,
    configurationDigest: BASIS, hostAbiDigest: BASIS, providerContractDigest: BASIS, dependencyArtifacts: [],
  };
}
/** The host-captured half of a receipt: identity, the pinned digests a trusted producer measured, and the page to read. */
function input(invocationId: string, scope: ObservationScope = alice): NativeCompareRunInput {
  return {
    snapshot: snapshotOf(invocationId), scope, invocationId, inputDigest: BASIS, modelDigest: BASIS, toolsDigest: BASIS, environmentDigest: BASIS, cacheDigest: BASIS,
    workspaceSourceState: "measured",
  };
}

interface Seed { id: string; provider: string; interval?: Interval; type?: Presentation["type"]; evidence?: string; invocationId: string; scope?: ObservationScope }
/** A read-current native snapshot (freshness current unless its provider is disconnected). */
function observe(view: ObservationProjection, seed: Seed): void {
  const outcome = view.refresh({
    source: ref(seed.provider, seed.id), scope: seed.scope ?? alice, capturedAt: at(0), observedAt: at(0),
    node: { title: `Operation ${seed.id}`, type: seed.type ?? "sdk-operation", statusText: "DONE", statusTone: "success" },
    trace: { invocationId: seed.invocationId }, ...(seed.interval ? { interval: seed.interval } : {}), ...(seed.evidence ? { evidenceRefs: [seed.evidence] } : {}),
  });
  expect(outcome).toBe("applied");
}
/** One invocation: a Forge workflow root over [0, wall], one Claude turn over [10, turnEnd] and one Forge build over [50, 60]. */
function seedInvocation(view: ObservationProjection, invocationId: string, wall: number, turnEnd: number, rootProvider = "forge"): void {
  observe(view, { id: `${invocationId}-root`, provider: rootProvider, type: "workflow", interval: span(0, wall), evidence: `ev:${invocationId}-root`, invocationId });
  observe(view, { id: `${invocationId}-turn`, provider: "claude-agent-sdk", interval: span(10, turnEnd), evidence: `ev:${invocationId}-turn`, invocationId });
  observe(view, { id: `${invocationId}-build`, provider: "forge", interval: span(50, 60), evidence: `ev:${invocationId}-build`, invocationId });
}
const shape = (rows: readonly MeasuredMetric[]) => rows.map(row => [row.name, row.value, row.coverage, row.freshness]);
const byName = (rows: readonly MeasuredMetric[], name: string): MeasuredMetric => {
  const found = rows.find(row => row.name === name);
  if (!found) throw new Error(`metric ${name} absent`);
  return found;
};

describe("wb-rz62 native metric sourcing: a comparison receipt's metrics come from the invocation's observed source intervals, never from its input", () => {
  it("NM-0 pins this file's reader set: exactly the cases NM-1 to NM-8, in order, each under its claim title", () => {
    // Frozen shape (standing rule 16 form): a case removed, renamed out of the set or retitled reds here.
    const cases = [...readFileSync(fileURLToPath(import.meta.url), "utf8").matchAll(/\bit\("(NM-[1-9] [^"]+)"/g)].map(match => match[1]);
    expect(cases).toEqual([
      "NM-1 draws every metric row from the invocation's latency decomposition: the observed intervals' figures, the workflow root as source and the observed evidence",
      "NM-2 ignores a metrics list carried on its input: a forged inline row never reaches the receipt",
      "NM-3 yields no metric rows when the invocation's page holds no workflow root, so the comparison reads unknown rather than a claimed optimization",
      "NM-4 reads freshness from the examined nodes: current only when every node is current, stale when one is stale, unknown for event-ingested nodes",
      "NM-5 binds native refs as the registered tool read them: the page's refs without host nodes, so a host-rooted decomposition is never receipt-bound",
      "NM-6 reads only the invocation's bounded page: another invocation's or principal's nodes change nothing, and a page past COMPARE_PAGE_LIMIT reads partial",
      "NM-7 two receipts sharing one basis compare as a measured native latency delta: each side's rows are its own invocation's",
      "NM-8 carries the host-captured identity receipt, digests and workspace label verbatim",
    ]);
  });

  it("NM-1 draws every metric row from the invocation's latency decomposition: the observed intervals' figures, the workflow root as source and the observed evidence", () => {
    const view = new ObservationProjection();
    seedInvocation(view, "ref", 100, 40);
    const run = nativeCompareRun(view, input("ref"));
    // Turn [10,40] = 30 s of model; build [50,60] = 10 s; wall [0,100]; overhead = 100 s - union(30 s + 10 s) = 60 s.
    expect(shape(run.metrics)).toEqual([
      ["latency.model.unionMs", 30_000, "complete", "current"],
      ["latency.model.busyMs", 30_000, "complete", "current"],
      ["latency.build.unionMs", 10_000, "complete", "current"],
      ["latency.build.busyMs", 10_000, "complete", "current"],
      ["latency.wall.ms", 100_000, "complete", "current"],
      ["latency.overhead.ms", 60_000, "complete", "current"],
    ]);
    for (const row of run.metrics) {
      expect(row.unit).toBe("ms");
      expect(row.source).toEqual(ref("forge", "ref-root"));
      expect(row.subjectBasis).toBe(BASIS);
    }
    expect(byName(run.metrics, "latency.model.unionMs").evidenceRefs).toEqual(["ev:ref-turn"]);
    expect(byName(run.metrics, "latency.wall.ms").evidenceRefs).toEqual(["ev:ref-root", "ev:ref-build", "ev:ref-turn"]);
    // The same rows the native source states for this page, composed independently of the builder.
    expect(run.metrics).toEqual(toMeasuredMetrics(selectLatencyDecomposition(view, { scope: alice, invocationId: "ref", limit: COMPARE_PAGE_LIMIT }), { subjectBasis: BASIS, freshness: "current" }));
  });

  it("NM-2 ignores a metrics list carried on its input: a forged inline row never reaches the receipt", () => {
    const view = new ObservationProjection();
    seedInvocation(view, "ref", 100, 40);
    const forgedRow: MeasuredMetric = { name: "latency.wall.ms", unit: "ms", value: 1, source: ref("forge", "ref-root"), evidenceRefs: ["ev:forged-inline"], subjectBasis: BASIS, coverage: "complete", freshness: "current" };
    const forged = { ...input("ref"), metrics: [forgedRow], nativeRefs: [ref("forge", "forged-inline")] };
    const run = nativeCompareRun(view, forged);
    expect(byName(run.metrics, "latency.wall.ms").value).toBe(100_000);
    expect(JSON.stringify(run)).not.toContain("forged-inline");
    // With nothing observed for the invocation, the forged row is still absent: the receipt carries no metric at all.
    expect(nativeCompareRun(new ObservationProjection(), forged).metrics).toEqual([]);
  });

  it("NM-3 yields no metric rows when the invocation's page holds no workflow root, so the comparison reads unknown rather than a claimed optimization", () => {
    const view = new ObservationProjection();
    observe(view, { id: "ref-turn", provider: "claude-agent-sdk", interval: span(10, 40), evidence: "ev:ref-turn", invocationId: "ref" });
    observe(view, { id: "cand-turn", provider: "claude-agent-sdk", interval: span(10, 20), evidence: "ev:cand-turn", invocationId: "cand" });
    const reference = nativeCompareRun(view, input("ref"));
    const candidate = nativeCompareRun(view, input("cand"));
    expect(reference.metrics).toEqual([]);
    expect(candidate.metrics).toEqual([]);
    const result = compareWorkflowRuns([reference], [candidate]);
    expect(result.status).toBe("unknown");
    expect(result.diagnostics.map(item => item.message)).toContain("No measured metrics were supplied.");
    expect(result.metrics).toEqual([]);
    expect(result.perMetric).toEqual([]);
    expect(result.claim).toBe("none");
  });

  it("NM-4 reads freshness from the examined nodes: current only when every node is current, stale when one is stale, unknown for event-ingested nodes", () => {
    const current = new ObservationProjection();
    seedInvocation(current, "ref", 100, 40);
    expect(new Set(nativeCompareRun(current, input("ref")).metrics.map(row => row.freshness))).toEqual(new Set(["current"]));
    current.markStale({ scope: alice, ref: ref("claude-agent-sdk", "ref-turn") });
    const stale = nativeCompareRun(current, input("ref")).metrics;
    expect(stale.length).toBeGreaterThan(0);
    expect(new Set(stale.map(row => row.freshness))).toEqual(new Set(["stale"]));
    // Event-ingested nodes (the workflow lifecycle's own path) carry no read-current confirmation: freshness unknown.
    const ingested = new ObservationProjection();
    const seeds = [
      { id: "ref-root", provider: "forge", type: "workflow" as const, interval: span(0, 100), invocationId: "ref" },
      { id: "ref-turn", provider: "claude-agent-sdk", type: "sdk-operation" as const, interval: span(10, 40), invocationId: "ref" },
      { id: "cand-root", provider: "forge", type: "workflow" as const, interval: span(0, 80), invocationId: "cand" },
      { id: "cand-turn", provider: "claude-agent-sdk", type: "sdk-operation" as const, interval: span(10, 30), invocationId: "cand" },
    ];
    for (const [index, seed] of seeds.entries()) {
      expect(ingested.ingest({
        projectionEventId: `event-${index}`, source: ref(seed.provider, seed.id), scope: alice, sourceSequence: 1, observedAt: at(0), kind: "native.node",
        node: { presentation: { title: seed.id, type: seed.type, statusText: "DONE", statusTone: "success" } }, trace: { invocationId: seed.invocationId }, evidenceRefs: [`ev:${seed.id}`], interval: seed.interval,
      })).toBe("applied");
    }
    const reference = nativeCompareRun(ingested, input("ref"));
    expect(byName(reference.metrics, "latency.wall.ms").value).toBe(100_000);
    expect(new Set(reference.metrics.map(row => row.freshness))).toEqual(new Set(["unknown"]));
    // The comparison withholds every row it cannot call current: no summary, no delta, no measured verdict.
    const result = compareWorkflowRuns([reference], [nativeCompareRun(ingested, input("cand"))]);
    expect(result.perMetric.length).toBe(4);
    for (const item of result.perMetric) {
      expect(item.verdict).toBe("unknown");
      expect(item.reasons.some(reason => reason.includes("lacks finite, complete, current, receipt-bound native evidence"))).toBe(true);
    }
    expect(result.metrics).toEqual([]);
  });

  it("NM-5 binds native refs as the registered tool read them: the page's refs without host nodes, so a host-rooted decomposition is never receipt-bound", () => {
    const view = new ObservationProjection();
    seedInvocation(view, "ref", 100, 40, "pi-workflow");
    seedInvocation(view, "cand", 80, 30, "pi-workflow");
    const reference = nativeCompareRun(view, input("ref"));
    const candidate = nativeCompareRun(view, input("cand"));
    expect(reference.nativeRefs).toEqual([ref("claude-agent-sdk", "ref-turn"), ref("forge", "ref-build")]);
    expect(byName(reference.metrics, "latency.wall.ms").source).toEqual(ref("pi-workflow", "ref-root"));
    const result = compareWorkflowRuns([reference], [candidate]);
    expect(result.perMetric.length).toBe(6);
    for (const item of result.perMetric) {
      expect(item.verdict).toBe("unknown");
      expect(item.reasons.some(reason => reason.includes("lacks finite, complete, current, receipt-bound native evidence"))).toBe(true);
    }
    expect(result.metrics).toEqual([]);
    expect(result.claim).toBe("none");
  });

  it("NM-6 reads only the invocation's bounded page: another invocation's or principal's nodes change nothing, and a page past COMPARE_PAGE_LIMIT reads partial", () => {
    const alone = new ObservationProjection();
    seedInvocation(alone, "ref", 100, 40);
    const crowded = new ObservationProjection();
    seedInvocation(crowded, "ref", 100, 40);
    seedInvocation(crowded, "other", 500, 400);
    observe(crowded, { id: "ref-foreign", provider: "forge", interval: span(0, 900), evidence: "ev:foreign", invocationId: "ref", scope: bob });
    expect(nativeCompareRun(crowded, input("ref"))).toEqual(nativeCompareRun(alone, input("ref")));
    const full = new ObservationProjection();
    observe(full, { id: "big-root", provider: "forge", type: "workflow", interval: span(0, 100), evidence: "ev:big-root", invocationId: "big" });
    for (let index = 0; index < COMPARE_PAGE_LIMIT; index++) observe(full, { id: `big-${index}`, provider: "claude-agent-sdk", interval: span(10, 20), evidence: `ev:big-${index}`, invocationId: "big" });
    const run = nativeCompareRun(full, input("big"));
    expect(COMPARE_PAGE_LIMIT).toBe(40);
    expect(run.nativeRefs).toHaveLength(COMPARE_PAGE_LIMIT);
    expect(shape(run.metrics)).toEqual([
      ["latency.model.unionMs", 10_000, "partial", "current"],
      ["latency.model.busyMs", 390_000, "partial", "current"],
      ["latency.wall.ms", 100_000, "partial", "current"],
    ]);
  });

  it("NM-7 two receipts sharing one basis compare as a measured native latency delta: each side's rows are its own invocation's", () => {
    const view = new ObservationProjection();
    seedInvocation(view, "ref", 100, 40);
    seedInvocation(view, "cand", 80, 30);
    const result = compareWorkflowRuns([nativeCompareRun(view, input("ref"))], [nativeCompareRun(view, input("cand"))]);
    expect(result.status).toBe("comparable");
    const figures = Object.fromEntries(result.metrics.map(item => [item.name, [item.reference.mean, item.candidate.mean, item.delta]]));
    // Candidate: turn [10,30] = 20 s, build 10 s, wall 80 s, overhead 80 - 30 = 50 s.
    expect(figures).toEqual({
      "latency.model.unionMs": [30_000, 20_000, -10_000],
      "latency.model.busyMs": [30_000, 20_000, -10_000],
      "latency.build.unionMs": [10_000, 10_000, 0],
      "latency.build.busyMs": [10_000, 10_000, 0],
      "latency.wall.ms": [100_000, 80_000, -20_000],
      "latency.overhead.ms": [60_000, 50_000, -10_000],
    });
    expect(result.perMetric.map(item => item.verdict)).toEqual(Array(6).fill("measured"));
    expect(result.claim).toBe("association");
    expect(result.metrics.find(item => item.name === "latency.wall.ms")?.evidenceRefs).toEqual(["ev:ref-root", "ev:ref-build", "ev:ref-turn", "ev:cand-root", "ev:cand-build", "ev:cand-turn"]);
  });

  it("NM-8 carries the host-captured identity receipt, digests and workspace label verbatim", () => {
    const view = new ObservationProjection();
    seedInvocation(view, "ref", 100, 40);
    const captured = input("ref");
    const run: CompareRun = nativeCompareRun(view, { ...captured, workspaceSourceState: "unknown", inputDigest: identityDigest("input", { supplied: false }) });
    expect(run.snapshot).toBe(captured.snapshot);
    expect(run.inputDigest).toBe(identityDigest("input", { supplied: false }));
    expect([run.modelDigest, run.toolsDigest, run.environmentDigest, run.cacheDigest]).toEqual([BASIS, BASIS, BASIS, BASIS]);
    expect(run.workspaceSourceState).toBe("unknown");
    const bare = nativeCompareRun(view, { snapshot: captured.snapshot, scope: alice, invocationId: "ref" });
    expect([bare.inputDigest, bare.modelDigest, bare.toolsDigest, bare.environmentDigest, bare.cacheDigest, bare.workspaceSourceState]).toEqual([undefined, undefined, undefined, undefined, undefined, undefined]);
  });
});
