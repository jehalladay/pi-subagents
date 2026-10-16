/**
 * W14/VC-6 latency-decomposition selector (wb-h8f.5). Each case pins a docs/workbench clause. Mutation table (each
 * mutant fails the named case):
 *   summing open intervals ........................ L1 "counts open and missing intervals and never sums them"
 *   summing busy where union is reported .......... L2 "reports union below busy when same-class intervals overlap"
 *   defaulting an unknown provider to model ....... L2 "puts unknown and prototype-named providers in other"
 *   measuring overhead on a truncated page ........ L3 "declines overhead and downgrades coverage on a truncated page"
 *   minting tokens from node count ................ L2 "measures tokens only from usage matching an examined node"
 * The fixture is seeded by hand: no host clock or host randomness anywhere in the measured path.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { type CompareRun, compareWorkflowRuns } from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest } from "../src/workbench/identity.js";
import {
  LATENCY_CAVEAT, LATENCY_CLASSES, LATENCY_CONTRACT, LATENCY_PROVIDER_CLASSES, LATENCY_REASONS, type LatencyDecomposition, selectLatencyDecomposition, toMeasuredMetrics,
} from "../src/workbench/latency.js";
import {
  type Interval, type NativeRef, ObservationProjection, type ObservationQuery, type ObservationScope, type ObservedNode, type Presentation,
} from "../src/workbench/observation.js";

const alice: ObservationScope = { workspace: "ws-latency", principal: "alice" };
const INVOCATION = "inv-latency";
const T0 = Date.parse("2026-10-15T12:00:00.000Z");
const at = (seconds: number): string => new Date(T0 + seconds * 1000).toISOString();
const span = (start: number, end: number): Interval => ({ startedAt: at(start), endedAt: at(end) });
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "operation", id });

interface Seed { id: string; provider: string; interval?: Interval; type?: Presentation["type"]; evidence?: string[]; scope?: ObservationScope; invocationId?: string }
function observe(view: ObservationProjection, seed: Seed): void {
  view.refresh({
    source: ref(seed.provider, seed.id), scope: seed.scope ?? alice, capturedAt: at(0), observedAt: at(0),
    node: { title: `Operation ${seed.id}`, type: seed.type ?? "sdk-operation", statusText: "DONE", statusTone: "success" },
    trace: { invocationId: seed.invocationId ?? INVOCATION }, ...(seed.interval ? { interval: seed.interval } : {}),
    ...(seed.evidence ? { evidenceRefs: seed.evidence } : {}),
  });
}
/** Root [0,100] plus two overlapping builds, one turn, one context, one queue, one query and one unknown provider. */
function fixture(): ObservationProjection {
  const view = new ObservationProjection();
  observe(view, { id: "root", provider: "pi-workflow", type: "workflow", interval: span(0, 100), evidence: ["ev:root"] });
  observe(view, { id: "b1", provider: "forge", interval: span(10, 30), evidence: ["ev:b1"] });
  observe(view, { id: "b2", provider: "forge", interval: span(20, 40), evidence: ["ev:b2"] });
  observe(view, { id: "m1", provider: "claude-agent-sdk", interval: span(50, 60), evidence: ["ev:m1"] });
  observe(view, { id: "c1", provider: "reactivefiber", interval: span(0, 5), evidence: ["ev:c1"] });
  observe(view, { id: "q1", provider: "furnace", interval: span(60, 70), evidence: ["ev:q1"] });
  observe(view, { id: "x1", provider: "hyperunix", interval: span(90, 95), evidence: ["ev:x1"] });
  observe(view, { id: "o1", provider: "acme-thing", interval: span(5, 10), evidence: ["ev:o1"] });
  return view;
}
const decompose = (view: Pick<ObservationProjection, "query">, extra: Partial<Parameters<typeof selectLatencyDecomposition>[1]> = {}): LatencyDecomposition =>
  selectLatencyDecomposition(view, { scope: alice, invocationId: INVOCATION, ...extra });
const component = (report: LatencyDecomposition, name: string) => {
  const found = report.components.find(item => item.class === name);
  if (!found) throw new Error(`component ${name} absent`);
  return found;
};
function row(id: string, provider: string, extra: Partial<ObservedNode> = {}): ObservedNode {
  return {
    key: JSON.stringify([alice.workspace, alice.principal, provider, "operation", "", id]), nativeRef: ref(provider, id), scope: alice,
    sourceKind: "observed", observedAt: at(0), sourceConnectionState: "connected", freshness: "current", completeness: "complete",
    presentation: { title: id, type: "sdk-operation", statusText: "DONE", statusTone: "success" }, kind: "native.snapshot",
    invocationId: INVOCATION, evidenceRefs: [], interval: span(0, 10), ...extra,
  };
}
function stand(nodes: ObservedNode[]): Pick<ObservationProjection, "query"> {
  return { query: (filter: ObservationQuery) => ({ nodes: nodes.slice(0, filter.limit), examined: nodes.length, truncated: nodes.length > filter.limit }) };
}

describe("L1 docs/workbench/09 § Aggregates and profiling: derive latency decomposition only with valid source intervals", () => {
  it("counts open and missing intervals and never sums them", () => {
    const report = decompose(stand([
      row("closed", "forge", { interval: span(0, 10) }),
      row("open", "forge", { interval: { startedAt: at(0) } }),
      row("absent", "forge", { interval: undefined }),
      row("bad-start", "forge", { interval: { startedAt: "not a time", endedAt: at(5) } }),
      row("bad-end", "forge", { interval: { startedAt: at(0), endedAt: "" } }),
      row("reversed", "forge", { interval: { startedAt: at(10), endedAt: at(5) } }),
      row("no-zone", "forge", { interval: { startedAt: "2026-10-15T12:00:00", endedAt: "2026-10-15T12:00:09" } }),
    ]));
    const build = component(report, "build");
    expect(build.intervals).toEqual({ closed: 1, open: 1, missing: 5 });
    expect(build.busyMs).toBe(10_000);
    expect(build.unionMs).toBe(10_000);
    expect(build.reasons).toEqual(expect.arrayContaining(["open-intervals", "missing-intervals"]));
    expect(report.overhead.measured).toBe(false);
  });
  it("reads no host clock and takes no clock parameter", () => {
    const source = readFileSync(new URL("../src/workbench/latency.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/Date\.now|Math\.random|new Date\(\)|\bnow\b/);
  });
});

describe("L2 docs/workbench/11 § Comparative experiment protocol: separate model tokens, provider waiting, build, context, queue and overhead", () => {
  it("emits one component per class with providers listed", () => {
    const report = decompose(fixture());
    expect(report.contract).toBe(LATENCY_CONTRACT);
    expect(report.basis).toBe("observed");
    expect(report.components.map(item => item.class)).toEqual([...LATENCY_CLASSES]);
    expect(component(report, "model").providers).toEqual(["claude-agent-sdk"]);
    expect(component(report, "build").providers).toEqual(["forge"]);
    expect(component(report, "context").providers).toEqual(["reactivefiber"]);
    expect(component(report, "queue").providers).toEqual(["furnace"]);
    expect(component(report, "query").providers).toEqual(["hyperunix"]);
    expect(component(report, "other").providers).toEqual(["acme-thing"]);
    expect(report.caveat).toBe(LATENCY_CAVEAT);
    expect(report.invocationId).toBe(INVOCATION);
  });
  it("reports union below busy when same-class intervals overlap", () => {
    const build = component(decompose(fixture()), "build");
    expect(build.nodes).toBe(2);
    expect(build.busyMs).toBe(40_000);
    expect(build.unionMs).toBe(30_000);
    expect(build.unionMs).toBeLessThan(build.busyMs);
    expect(component(decompose(fixture()), "model")).toMatchObject({ busyMs: 10_000, unionMs: 10_000, measured: true });
  });
  it("puts unknown and prototype-named providers in other, never model", () => {
    const report = decompose(stand([
      row("u1", "acme-thing"), row("u2", "__proto__"), row("u3", "constructor"), row("u4", "toString"),
    ]));
    expect(component(report, "other").nodes).toBe(4);
    expect(component(report, "model").nodes).toBe(0);
    expect(Object.isFrozen(LATENCY_PROVIDER_CLASSES)).toBe(true);
    expect(Object.isFrozen(LATENCY_CLASSES)).toBe(true);
  });
  it("reports waiting as unknown with the single-interval reason, never an estimate", () => {
    const report = decompose(fixture());
    expect(report.waiting.reasons).toEqual(["single-interval-per-node"]);
    expect(report.waiting.nodes).toBeGreaterThan(0);
    expect(JSON.stringify(report.waiting)).not.toMatch(/Ms/);
  });
  it("measures tokens only from usage matching an examined node", () => {
    const view = fixture();
    expect(decompose(view).tokens).toEqual({ measured: false, reasons: ["no-native-usage"] });
    const foreign = { source: ref("claude-agent-sdk", "not-examined"), inputTokens: 999, outputTokens: 999, evidenceRefs: ["usage:foreign"] };
    expect(decompose(view, { usage: [foreign] }).tokens).toEqual({ measured: false, reasons: ["no-native-usage"] });
    const match = { source: ref("claude-agent-sdk", "m1"), inputTokens: 100, outputTokens: 40, evidenceRefs: ["usage:m1"] };
    const measured = decompose(view, { usage: [foreign, match, match] }).tokens;
    expect(measured).toMatchObject({ measured: true, input: 100, output: 40 });
    if (measured.measured) expect(measured.sources).toEqual([ref("claude-agent-sdk", "m1")]);
    const invalid = { ...match, inputTokens: -1 };
    expect(decompose(view, { usage: [invalid] }).tokens.measured).toBe(false);
  });
});

describe("L3 docs/workbench/11: decline a precise claim if trace coverage is insufficient; missing metrics yield unknown", () => {
  it("measures wall from the closed root interval and overhead as wall minus the union of every component", () => {
    const report = decompose(fixture());
    expect(report.wall).toEqual({ measured: true, ms: 100_000, from: "root-interval" });
    expect(report.overhead).toEqual({ measured: true, ms: 35_000 });
    expect(report.examined).toEqual({ nodes: 8, truncated: false });
    expect(report.components.reduce((sum, item) => sum + item.nodes, 0)).toBe(7);
  });
  it("declines overhead and downgrades coverage on a truncated page", () => {
    const view = fixture();
    const report = decompose(view, { limit: 3 });
    expect(report.examined.truncated).toBe(true);
    for (const item of report.components) expect(item.reasons).toContain("page-truncated");
    expect(report.overhead.measured).toBe(false);
    if (!report.overhead.measured) expect(report.overhead.reasons).toContain("page-truncated");
    const rows = toMeasuredMetrics(report, { subjectBasis: "basis", freshness: "current" });
    expect(rows.every(item => item.coverage !== "complete")).toBe(true);
    expect(rows.some(item => item.name === "latency.overhead.ms")).toBe(false);
  });
  it("declines wall with no-root-interval when the root has no closed interval", () => {
    const noRoot = decompose(stand([row("a", "forge")]));
    expect(noRoot.wall).toEqual({ measured: false, reasons: ["no-root-interval"] });
    expect(noRoot.overhead.measured).toBe(false);
    const openRoot = decompose(stand([row("r", "pi-workflow", { interval: { startedAt: at(0) }, presentation: { title: "r", type: "workflow", statusText: "RUN", statusTone: "active" } })]));
    expect(openRoot.wall).toEqual({ measured: false, reasons: ["no-root-interval"] });
  });
  it("declines overhead when any examined interval is open", () => {
    const view = fixture();
    observe(view, { id: "open1", provider: "forge", interval: { startedAt: at(70) } });
    const report = decompose(view);
    expect(report.wall.measured).toBe(true);
    expect(report.overhead.measured).toBe(false);
    if (!report.overhead.measured) expect(report.overhead.reasons).toContain("open-intervals");
    expect(component(report, "build").intervals.open).toBe(1);
  });
  it("grades metric coverage complete, partial or unknown per component", () => {
    const view = fixture();
    observe(view, { id: "open1", provider: "forge", interval: { startedAt: at(70) } });
    observe(view, { id: "openq", provider: "furnace", interval: { startedAt: at(70) } });
    const report = decompose(stand([...view.query({ scope: alice, invocationId: INVOCATION, limit: 100 }).nodes, row("only-open", "hyperunix", { interval: { startedAt: at(1) } }), row("hx", "claude-agent-sdk", { interval: { startedAt: at(3) } })]));
    const byName = new Map(toMeasuredMetrics(report, { subjectBasis: "basis", freshness: "current" }).map(item => [item.name, item]));
    expect(byName.get("latency.model.unionMs")?.coverage).toBe("partial");
    expect(byName.get("latency.build.unionMs")?.coverage).toBe("partial");
    const clean = new Map(toMeasuredMetrics(decompose(fixture()), { subjectBasis: "basis", freshness: "current" }).map(item => [item.name, item]));
    expect(clean.get("latency.model.unionMs")?.coverage).toBe("complete");
    const unknownOnly = toMeasuredMetrics(decompose(stand([row("r", "pi-workflow", { presentation: { title: "r", type: "workflow", statusText: "DONE", statusTone: "success" }, interval: span(0, 50) }), row("o", "forge", { interval: { startedAt: at(1) } })])), { subjectBasis: "basis", freshness: "current" });
    expect(unknownOnly.find(item => item.name === "latency.build.unionMs")).toMatchObject({ coverage: "unknown", value: 0 });
  });
});

describe("L4 WB-038 / VC-6: metrics feed compareWorkflowRuns without any edit to designer.ts", () => {
  const scriptSource = 'export const meta = { name: "x", description: "y" }; return 1;';
  function compareRun(id: string, report: LatencyDecomposition, basisSeed = "fixture"): CompareRun {
    const digest = `sha256:${createHash("sha256").update(scriptSource).digest("hex")}`;
    const d = identityDigest(basisSeed, {});
    const definition = { kind: "script" as const, id: "fixture.js", schemaVersion: "1", artifactDigest: digest };
    const pinned = { definition, dependencyDigest: d, hostImplementationDigest: d, runtimeArtifactDigest: d, configurationDigest: d, hostAbiDigest: d, providerContractDigest: d };
    const snapshot: InvocationSnapshot = { identity: { logicalInvocationId: id, definition, deploymentDigest: identityDigest("deployment", pinned), subjectBasis: d }, scriptDigest: digest, scriptSource, dependencyDigest: d, hostImplementationDigest: d, hostArtifacts: [], runtimeArtifactDigest: d, runtimeArtifacts: [], configurationDigest: d, hostAbiDigest: d, providerContractDigest: d, dependencyArtifacts: [] };
    const metrics = toMeasuredMetrics(report, { subjectBasis: d, freshness: "current" });
    const roots = metrics.map(item => item.source);
    return { snapshot, inputDigest: d, modelDigest: d, toolsDigest: d, environmentDigest: d, cacheDigest: d, nativeRefs: roots.slice(0, 1), metrics };
  }
  it("emits designer-shaped rows named by class, with the root as source and bounded evidence", () => {
    const report = decompose(fixture());
    const rows = toMeasuredMetrics(report, { subjectBasis: "basis", freshness: "current" });
    const names = rows.map(item => item.name);
    expect(names).toEqual(expect.arrayContaining(["latency.build.unionMs", "latency.build.busyMs", "latency.model.unionMs", "latency.wall.ms", "latency.overhead.ms"]));
    for (const item of rows) {
      expect(item.unit).toBe("ms");
      expect(item.source).toEqual(ref("pi-workflow", "root"));
      expect(item.subjectBasis).toBe("basis");
      expect(item.freshness).toBe("current");
      expect(Number.isFinite(item.value)).toBe(true);
      expect(item.evidenceRefs.length).toBeGreaterThan(0);
      expect(item.evidenceRefs.length).toBeLessThanOrEqual(8);
    }
    expect(rows.find(item => item.name === "latency.build.busyMs")?.value).toBe(40_000);
    expect(rows.find(item => item.name === "latency.wall.ms")?.value).toBe(100_000);
    expect(rows.find(item => item.name === "latency.build.unionMs")?.evidenceRefs).toEqual(["ev:b1", "ev:b2"]);
  });
  it("emits no rows when no root node attributes the invocation", () => {
    expect(toMeasuredMetrics(decompose(stand([row("a", "forge")])), { subjectBasis: "basis", freshness: "current" })).toEqual([]);
  });
  it("reports latency metrics as measured for a reference and a candidate sharing one basis", () => {
    const reference = decompose(fixture());
    const faster = new ObservationProjection();
    observe(faster, { id: "root", provider: "pi-workflow", type: "workflow", interval: span(0, 80), evidence: ["ev:root2"] });
    observe(faster, { id: "b1", provider: "forge", interval: span(10, 30), evidence: ["ev:b1b"] });
    const result = compareWorkflowRuns([compareRun("ref", reference)], [compareRun("cand", decompose(faster))]);
    const wall = result.metrics.find(item => item.name === "latency.wall.ms");
    expect(wall?.reference.mean).toBe(100_000);
    expect(wall?.candidate.mean).toBe(80_000);
    expect(wall?.delta).toBe(-20_000);
    expect(result.perMetric.find(item => item.name === "latency.build.unionMs")?.verdict).toBe("measured");
  });
  it("leaves the confound behaviour of mismatched bases unchanged", () => {
    const result = compareWorkflowRuns([compareRun("ref", decompose(fixture()))], [compareRun("cand", decompose(fixture()), "different")]);
    expect(result.status).not.toBe("comparable");
    expect(result.metrics.find(item => item.name === "latency.wall.ms")?.delta).toBeUndefined();
  });
});

describe("L5 scope and bounds", () => {
  it("drops page rows from another scope or invocation and repeated keys", () => {
    const other: ObservationScope = { workspace: "ws-latency", principal: "bob" };
    const report = decompose(stand([
      row("mine", "forge"), row("mine-again", "forge", { key: row("mine", "forge").key }),
      row("foreign-scope", "forge", { scope: other }), row("foreign-inv", "forge", { invocationId: "inv-other" }),
    ]));
    expect(report.examined.nodes).toBe(1);
    expect(component(report, "build").nodes).toBe(1);
  });
  it("refuses a limit outside 1..100 with a typed validation error", () => {
    for (const limit of [0, -1, 101, 1.5, Number.NaN]) {
      try {
        decompose(fixture(), { limit });
        throw new Error(`limit ${limit} was accepted`);
      } catch (error) {
        expect(error).toBeInstanceOf(CapabilityError);
        expect((error as CapabilityError).category).toBe("validation");
      }
    }
    expect(() => decompose(fixture(), { invocationId: "" })).toThrow(CapabilityError);
  });
  it("serialises a 100-node report under 8 KiB even with long distinct providers and evidence", () => {
    const nodes: ObservedNode[] = [];
    for (let index = 0; index < 100; index += 1) {
      nodes.push(row(`n${index}`, `provider-${String(index).padStart(3, "0")}-${"x".repeat(80)}`, { evidenceRefs: [`ev:${index}-${"y".repeat(60)}`], interval: span(index, index + 2) }));
    }
    const report = decompose(stand(nodes));
    expect(report.examined.nodes).toBe(100);
    expect(JSON.stringify(report).length).toBeLessThan(8192);
  });
  it("strips terminal escapes, bidi controls and zero-width characters from providers and bounds them to 64 characters", () => {
    const hostile = `evil\u001b[31m${String.fromCodePoint(0x202e)}prov${String.fromCodePoint(0x200b)}ider${"z".repeat(100)} sk-ant-secret123`;
    const report = decompose(stand([row("h", hostile)]));
    const providers = component(report, "other").providers;
    expect(providers).toHaveLength(1);
    expect(providers[0].length).toBeLessThanOrEqual(64);
    expect(providers[0]).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069\u200b-\u200f\u2060-\u2064\ufeff]/);
    expect(providers[0]).toMatch(/^evil provider/);
    expect(JSON.stringify(report)).not.toContain("secret123");
  });
  it("carries no raw payloads, titles or evidence bodies", () => {
    const report = decompose(stand([row("t", "forge", { presentation: { title: "SECRET TITLE", type: "sdk-operation", statusText: "SECRET STATUS", statusTone: "success" }, payloadRef: "payload:secret" })]));
    const text = JSON.stringify(report);
    expect(text).not.toContain("SECRET");
    expect(text).not.toContain("payload:secret");
  });
});

/**
 * wb-h8f.10 (wb-h8f.5 gate cmd_526b2de7ee90 findings F1 and F2, owner rulings at the 895e26b landing):
 *   A1 (owner F1 ruling (b) at the wb-h8f.5 landing 895e26b; gate cmd_526b2de7ee90; wb-h8f.5 acceptance L5 quoted:
 *   "provider strings pass the shared sanitizers in src/workbench/redaction.ts (stripUnsafeText today; the single exported
 *   display helper once wb-952's respin lands)"): displayText calls sanitizeWorkbenchText(raw.slice(0, MAX_PROVIDER_SCAN),
 *   MAX_PROVIDER_SCAN, "label") before the 64/121/128 cuts; the local INVISIBLE constant and its deletion are removed
 *   (16:43Z rule: deletion never precedes redaction). Red-first acceptance: the 181 merged-tree separator-corpus shapes
 *   (13 templates x 40 gaps; leak = either 7-char half of a 14-char secret visible in JSON.stringify(report)) driven
 *   through the PUBLIC selectLatencyDecomposition on BOTH the provider path and the evidence path, red at f63fd79 and 0
 *   leaks after; plus the E5 pin (provider "Bearer <tok>" renders "[REDACTED]", kills gate mutant G14). displayText joins
 *   the SITES corpus in the same commit (owner F6 standing seat rule).
 *   A2 (owner F2 ruling (a); docs/workbench/09-observation-and-provenance.md section "Aggregates and profiling":
 *   "Distinguish measured actual from estimated projected metrics."): when the component union exceeds the root wall,
 *   overhead is {measured: false} with a NEW entry in the frozen LATENCY_REASONS vocabulary, never {measured: true, ms:
 *   0}; the latency.overhead.ms MeasuredMetric row is then declined for compareWorkflowRuns; red-first via the gate E3
 *   probe (root [10 s, 20 s], child [0 s, 30 s]) and the Math.max clamp is gone (gate mutant G1 dies).
 * wb-k10 (wb-h8f.10 gate F3(b)): the A1 text above is the bead acceptance criterion VERBATIM. The H1 corpus below is the
 * acceptance set of the sanitizer corpus (SHAPES, units by positions), not the 181-shape 13-template by 40-gap gate
 * reconstruction; wb-k10 adds the two templates H1 did not hold itself (T08 in-token prefixed, T13 after-prefix) so this file
 * carries the class on its own beside the SITES row.
 * Mutation table: dropping the label-layout call (local deletion before redaction) fails H1 provider and evidence paths;
 * re-adding the Math.max(0, ...) clamp fails H2 "declines overhead...". Every invisible unit is built with String.fromCodePoint.
 * wb-k10 mutation table: dropping the containment check fails H3 (outside-wall x5); cutting before the length check in evidenceText
 * fails H4 (astral at 120 and the over-120 sweep); "label" -> "terminal" fails H5 F4; the raw invocationId in the report fails H5 F5.
 */
describe("H1 wb-h8f.10 A1: provider and evidence strings pass the shared label-layout sanitizer, deletion never precedes redaction", () => {
  const cp = (code: number): string => String.fromCodePoint(code);
  const CODES = [
    0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
    0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
    0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0,
  ];
  const UNITS: readonly string[] = [...CODES.map(cp), `${cp(0x1b)}[0m`];
  const WHITESPACE = new Set([0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x85, 0x2028, 0x2029].map(cp));
  type Shape = (unit: string, secret: string) => string;
  const BETWEEN: readonly Shape[] = [
    (unit, secret) => `see${unit}ghp_${secret}`,
    (unit, secret) => `key${unit}sk-ant-${secret}`,
    (unit, secret) => `x${unit}Bearer ${secret}`,
    (unit, secret) => `x${unit}Basic ${secret}`,
    (unit, secret) => `Authorization: Bearer${unit}${secret}`,
    (unit, secret) => `Authorization: Basic${unit}${secret}`,
  ];
  const WITHIN: readonly Shape[] = [
    (unit, secret) => `Authorization: Bea${unit}rer ${secret}`,
    (unit, secret) => `see gh${unit}p_${secret}`,
    (unit, secret) => `Bearer SEC${unit}${secret}`,
    (unit, secret) => `pass${unit}word=${secret}`,
    (unit, secret) => `x${unit}Bea${unit}rer ${secret}`,
    (unit, secret) => `see${unit}gh${unit}p_${secret}`,
    (unit, secret) => `Authorization: Bea${unit}rer${unit}${secret}`,
    (unit, secret) => `x${unit}Bea${unit}rer${unit}${secret}`,
    (unit, secret) => `ghp_abc${unit}pass${unit}word=${secret}`,
    // wb-k10 F3(b): the two gate-reconstruction templates H1 did not hold on its own (T08 in-token prefixed, T13 after-prefix).
    (unit, secret) => `ghp_abc${unit}${secret}`,
    (unit, secret) => `ghp_${unit}${secret}`,
  ];
  interface Shaped { id: string; raw: string; halves: [string, string] }
  const SHAPES: Shaped[] = [];
  for (const [unitIndex, unit] of UNITS.entries()) {
    for (const [shapeIndex, shape] of [...BETWEEN, ...(WHITESPACE.has(unit) ? [] : WITHIN)].entries()) {
      const secret = `Zq${String(unitIndex).padStart(3, "0")}${String(shapeIndex).padStart(2, "0")}Kx${"v".repeat(5)}`;
      SHAPES.push({ id: `unit ${unitIndex} shape ${shapeIndex}`, raw: shape(unit, secret), halves: [secret.slice(0, 7), secret.slice(7)] });
    }
  }
  const leaks = (paths: (raw: string) => LatencyDecomposition): string[] =>
    SHAPES.filter(item => {
      const text = JSON.stringify(paths(item.raw));
      return text.includes(item.halves[0]) || text.includes(item.halves[1]);
    }).map(item => item.id);
  const secretLength = (item: Shaped): number => item.halves[0].length + item.halves[1].length;

  it("builds 14-character secrets so a half is seven characters", () => {
    expect(SHAPES.length).toBeGreaterThan(500);
    expect(SHAPES.every(item => secretLength(item) === 14)).toBe(true);
  });
  it("leaks no secret half through the provider path of selectLatencyDecomposition", () => {
    expect(leaks(raw => decompose(stand([row("p", raw)])))).toEqual([]);
  });
  it("leaks no secret half through the evidence path of selectLatencyDecomposition", () => {
    expect(leaks(raw => decompose(stand([row("e", "forge", { evidenceRefs: [raw] })])))).toEqual([]);
  });
  it("E5: a provider carrying Bearer <token> renders [REDACTED] (the display path redacts, not only the shape strip)", () => {
    const report = decompose(stand([row("b", "Bearer abcdef1234567890")]));
    expect(component(report, "other").providers).toEqual(["[REDACTED]"]);
  });
  it("keeps a long provider inside 64 characters without leaving half a surrogate pair", () => {
    const report = decompose(stand([row("l", `${"a".repeat(63)}${String.fromCodePoint(0x1f600)}tail`)]));
    const shown = component(report, "other").providers[0];
    expect(shown.length).toBeLessThanOrEqual(64);
    expect(shown).not.toMatch(/[\ud800-\udfff]/);
  });
});

describe("H2 wb-h8f.10 A2: overhead declines when the component union exceeds the root wall", () => {
  const rootRow = (start: number, end: number): ObservedNode =>
    row("root", "pi-workflow", { interval: span(start, end), presentation: { title: "root", type: "workflow", statusText: "DONE", statusTone: "success" } });
  it("declares a new frozen reason", () => {
    expect(LATENCY_REASONS).toContain("components-exceed-wall");
    expect(Object.isFrozen(LATENCY_REASONS)).toBe(true);
  });
  it("E3: root [10 s, 20 s] with a child [0 s, 30 s] declines overhead, never a measured zero", () => {
    const report = decompose(stand([rootRow(10, 20), row("child", "forge", { interval: span(0, 30) })]));
    expect(report.wall).toEqual({ measured: true, ms: 10_000, from: "root-interval" });
    expect(report.overhead).toEqual({ measured: false, reasons: ["components-exceed-wall"] });
    const rows = toMeasuredMetrics(report, { subjectBasis: "basis", freshness: "current" });
    expect(rows.some(item => item.name === "latency.overhead.ms")).toBe(false);
  });
  it("still measures a genuine zero when the union equals the wall exactly", () => {
    const report = decompose(stand([rootRow(0, 10), row("child", "forge", { interval: span(0, 10) })]));
    expect(report.overhead).toEqual({ measured: true, ms: 0 });
    expect(toMeasuredMetrics(report, { subjectBasis: "basis", freshness: "current" }).find(item => item.name === "latency.overhead.ms")?.value).toBe(0);
  });
  it("keeps measuring a positive overhead unchanged", () => {
    const report = decompose(stand([rootRow(0, 100), row("child", "forge", { interval: span(10, 40) })]));
    expect(report.overhead).toEqual({ measured: true, ms: 70_000 });
  });
});


describe("H3 wb-k10 F1: overhead declines when a component interval lies outside the root interval", () => {
  const rootRow = (start: number, end: number): ObservedNode =>
    row("root", "pi-workflow", { interval: span(start, end), presentation: { title: "root", type: "workflow", statusText: "DONE", statusTone: "success" } });
  const overheadRow = (report: LatencyDecomposition) => toMeasuredMetrics(report, { subjectBasis: "basis", freshness: "current" }).find(item => item.name === "latency.overhead.ms");
  it("declares a new frozen reason after components-exceed-wall", () => {
    expect(LATENCY_REASONS).toContain("components-outside-wall");
    expect(LATENCY_REASONS.indexOf("components-outside-wall")).toBeGreaterThan(LATENCY_REASONS.indexOf("components-exceed-wall"));
  });
  it.each([
    ["straddling the end: child [15 s, 25 s] in root [10 s, 20 s]", 15, 25],
    ["before the root: child [0 s, 5 s]", 0, 5],
    ["after the root: child [25 s, 30 s]", 25, 30],
    ["straddling the start: child [5 s, 12 s]", 5, 12],
  ])("declines overhead with components-outside-wall, never a measured figure: %s", (_label, start, end) => {
    const report = decompose(stand([rootRow(10, 20), row("child", "forge", { interval: span(start, end) })]));
    expect(report.wall).toEqual({ measured: true, ms: 10_000, from: "root-interval" });
    expect(report.overhead).toEqual({ measured: false, reasons: ["components-outside-wall"] });
    expect(overheadRow(report)).toBeUndefined();
  });
  it("declines when only one of several components is outside the root", () => {
    const report = decompose(stand([rootRow(10, 20), row("in", "forge", { interval: span(11, 14) }), row("out", "furnace", { interval: span(25, 26) })]));
    expect(report.overhead).toEqual({ measured: false, reasons: ["components-outside-wall"] });
  });
  it("keeps E3 as delivered: a union above the wall reports components-exceed-wall alone", () => {
    const report = decompose(stand([rootRow(10, 20), row("child", "forge", { interval: span(0, 30) })]));
    expect(report.overhead).toEqual({ measured: false, reasons: ["components-exceed-wall"] });
  });
  it("measures a component that fills the root exactly (closed containment) and a contained one unchanged", () => {
    expect(decompose(stand([rootRow(10, 20), row("child", "forge", { interval: span(10, 20) })])).overhead).toEqual({ measured: true, ms: 0 });
    expect(decompose(stand([rootRow(10, 20), row("child", "forge", { interval: span(12, 18) })])).overhead).toEqual({ measured: true, ms: 4000 });
  });
  it("reports the earlier overhead reasons alone when the page is not whole, never adding an outside-wall guess", () => {
    const report = decompose(stand([rootRow(10, 20), row("out", "forge", { interval: span(0, 5) }), row("open", "furnace", { interval: { startedAt: at(11) } })]));
    expect(report.overhead).toEqual({ measured: false, reasons: ["open-intervals"] });
  });
});

describe("H4 wb-k10 F2: an evidence ref over 120 characters is dropped on its sanitized length before any cut", () => {
  const astral = String.fromCodePoint(0x1f600);
  const kept = (ref: string): string[] => component(decompose(stand([row("e", "forge", { evidenceRefs: [ref] })])), "build").evidenceRefs;
  const reportKept = (ref: string): string[] => decompose(stand([row("e", "forge", { evidenceRefs: [ref] })])).evidenceRefs;
  it("drops a 126-character ref whose astral character starts at index 120, never a truncated 120-unit ref", () => {
    const ref = `${"e".repeat(120)}${astral}tail`;
    expect(ref.length).toBe(126);
    expect(ref.charCodeAt(120)).toBeGreaterThanOrEqual(0xd800);
    expect(kept(ref)).toEqual([]);
    expect(reportKept(ref)).toEqual([]);
  });
  it("drops every over-120 length whatever character sits at the cut", () => {
    for (const ref of ["e".repeat(121), "e".repeat(126), `${"e".repeat(119)}${astral}`, `${"e".repeat(120)}${astral}`, `${"e".repeat(121)}${astral}`]) {
      expect(kept(ref), `${ref.length} units`).toEqual([]);
    }
  });
  it("keeps a ref of exactly 120 units, with or without an astral character at the end", () => {
    const plain = "e".repeat(120);
    const wide = `${"e".repeat(118)}${astral}`;
    expect(wide.length).toBe(120);
    expect(kept(plain)).toEqual([plain]);
    expect(kept(wide)).toEqual([wide]);
  });
  it("measures the sanitized length: a raw ref over 120 units that sanitizes to 100 is kept whole", () => {
    const ref = `${"e".repeat(100)}${String.fromCodePoint(0x200b).repeat(40)}`;
    expect(ref.length).toBe(140);
    expect(kept(ref)).toEqual(["e".repeat(100)]);
  });
});

describe("H5 wb-k10 F4/F5: the label layout and the invocation display path are pinned", () => {
  const BEL = String.fromCodePoint(0x07);
  it("F4: a provider with a leading control and an internal double space renders trimmed and collapsed (label, not terminal)", () => {
    const report = decompose(stand([row("p", `${BEL}acme  thing `)]));
    expect(component(report, "other").providers).toEqual(["acme thing"]);
  });
  it("F4: a provider with an internal control renders one space between its words", () => {
    const report = decompose(stand([row("p", `acme${BEL}${BEL}thing`)]));
    expect(component(report, "other").providers).toEqual(["acme thing"]);
  });
  it("F5: the invocation id passes the shared label layout before it appears in the report", () => {
    const raw = `inv${BEL}one  two Bearer abcdef1234567890`;
    const report = decompose(stand([row("n", "forge", { invocationId: raw })]), { invocationId: raw });
    expect(report.invocationId).toBe("inv one two [REDACTED]");
    expect(JSON.stringify(report)).not.toContain("abcdef1234567890");
  });
  it("F5: a long invocation id is cut at 128 characters without half a surrogate pair", () => {
    const raw = `${"i".repeat(127)}${String.fromCodePoint(0x1f600)}tail`;
    const report = decompose(stand([row("n", "forge", { invocationId: raw })]), { invocationId: raw });
    expect(report.invocationId).toBe("i".repeat(127));
  });
});
