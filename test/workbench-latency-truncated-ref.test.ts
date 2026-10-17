/**
 * wb-9af latency.ts truncated-evidence-ref residual (from the wb-k10 gate-3 F1). A node evidence ref whose RAW length
 * exceeds the scan bound (512 UTF-16 units) is dropped from the report, never kept as its first 512 raw units after the
 * label layout: "a truncated ref is a wrong ref". Spec lines pinned (wb-9af description):
 *   "ANY ref longer than MAX_PROVIDER_SCAN whose first 512 raw units shrink to <= 120 under the label layout is KEPT TRUNCATED"
 *   "a plain 600-char ref is dropped (control)"
 * Mutation table (each mutant fails the named case):
 *   keeping the 512-unit pre-slice read of an over-bound ref ... T1..T4 "drops an over-bound ref whose first 512 units shrink"
 *   dropping refs at the scan bound itself (>= instead of >) .... T5 "keeps a ref of exactly the scan bound that shrinks"
 *   dropping every shrinking ref regardless of raw length ....... T5 "keeps a short ref that shrinks under the label layout"
 * wb-z2d test-strength rows (src/workbench/latency.ts untouched; each mutant is a throwaway copy of the module):
 *   measuring the bound in code points ([...raw].length) ........ HR1 "measures the bound in UTF-16 units" (root and rest path)
 *   an add-path (report root) call site bypassing evidenceText .. HR2 "drops an over-bound ref on the workflow root path"
 *   emptying the four-probe table ................................ HR4 "the four-probe table is not empty"
 */
import { describe, expect, it } from "vitest";
import { selectLatencyDecomposition } from "../src/workbench/latency.js";
import type { NativeRef, ObservationQuery, ObservationScope, ObservedNode } from "../src/workbench/observation.js";

const alice: ObservationScope = { workspace: "ws-latency-ref", principal: "alice" };
const INVOCATION = "inv-latency-ref";
const SCAN_BOUND = 512;
const ZWSP = "​";
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "operation", id });

function node(id: string, evidenceRefs: string[]): ObservedNode {
  return {
    key: JSON.stringify([alice.workspace, alice.principal, "forge", "operation", "", id]), nativeRef: ref("forge", id), scope: alice,
    sourceKind: "observed", observedAt: "2026-10-15T12:00:00.000Z", sourceConnectionState: "connected", freshness: "current", completeness: "complete",
    presentation: { title: id, type: "sdk-operation", statusText: "DONE", statusTone: "success" }, kind: "native.snapshot",
    invocationId: INVOCATION, evidenceRefs, interval: { startedAt: "2026-10-15T12:00:00.000Z", endedAt: "2026-10-15T12:00:10.000Z" },
  };
}
const TAG_A = String.fromCodePoint(0xe0041);
function rootNode(id: string, evidenceRefs: string[]): ObservedNode {
  const base = node(id, evidenceRefs);
  return { ...base, presentation: { ...base.presentation, type: "workflow" } };
}
function shownAtRoot(refs: string[]): string[] {
  const rows = [rootNode("root", refs)];
  const view = { query: (filter: ObservationQuery) => ({ nodes: rows.slice(0, filter.limit), examined: rows.length, truncated: rows.length > filter.limit }) };
  return selectLatencyDecomposition(view, { scope: alice, invocationId: INVOCATION }).evidenceRefs;
}
function shown(refs: string[]): string[] {
  const rows = [node("n1", refs)];
  const view = { query: (filter: ObservationQuery) => ({ nodes: rows.slice(0, filter.limit), examined: rows.length, truncated: rows.length > filter.limit }) };
  return selectLatencyDecomposition(view, { scope: alice, invocationId: INVOCATION }).evidenceRefs;
}

describe("wb-9af latency evidence refs: an over-bound ref is dropped, never kept truncated", () => {
  const probes: Array<[string, string]> = [
    ["T1 invisible-heavy prefix", `ev:${ZWSP.repeat(520)}TAILPART`],
    ["T2 credential-shrunk prefix", `ghp_${"a".repeat(600)}/TAILPART`],
    ["T3 whitespace-collapsed prefix", `ev:a${" ".repeat(560)}TAILPART`],
    ["T4 control-collapsed prefix", `ev:a${"\u0007".repeat(560)}TAILPART`],
  ];
  it("HR4 the four-probe table is not empty", () => {
    expect(probes.length).toBe(4);
  });

  for (const [name, raw] of probes) {
    it(`drops an over-bound ref whose first 512 units shrink: ${name}`, () => {
      expect(raw.length).toBeGreaterThan(SCAN_BOUND);
      expect(shown([raw, "ev:ok"])).toEqual(["ev:ok"]);
      expect(shown([raw])).toEqual([]);
    });
  }

  it("control: a plain 600-unit ref is dropped", () => {
    expect(shown(["a".repeat(600), "ev:ok"])).toEqual(["ev:ok"]);
  });

  it("T5 keeps a short ref that shrinks under the label layout", () => {
    expect(shown([`ev:${ZWSP.repeat(100)}ok`])).toEqual(["ev:ok"]);
  });

  it("T5 keeps a ref of exactly the scan bound that shrinks, and drops one unit more", () => {
    const exact = `ev:${ZWSP.repeat(SCAN_BOUND - 5)}ab`;
    expect(exact.length).toBe(SCAN_BOUND);
    expect(shown([exact])).toEqual(["ev:ab"]);
    expect(shown([`${exact}c`])).toEqual([]);
  });

  it("HR1 measures the bound in UTF-16 units, not code points (rest path)", () => {
    // 300 astral default-ignorable code points = 600 UTF-16 units: over the bound in units, under it in code points.
    const raw = `ev:${TAG_A.repeat(300)}TAILPART`;
    expect(raw.length).toBeGreaterThan(SCAN_BOUND);
    expect([...raw].length).toBeLessThanOrEqual(SCAN_BOUND);
    expect(shown([raw, "ev:ok"])).toEqual(["ev:ok"]);
    expect(shown([raw])).toEqual([]);
  });

  it("HR1 measures the bound in UTF-16 units, not code points (workflow root path)", () => {
    const raw = `ev:${TAG_A.repeat(300)}TAILPART`;
    expect(shownAtRoot([raw, "ev:ok"])).toEqual(["ev:ok"]);
    expect(shownAtRoot([raw])).toEqual([]);
  });

  it("HR2 drops an over-bound ref on the workflow root path (the add path)", () => {
    for (const [, raw] of probes) {
      expect(shownAtRoot([raw, "ev:ok"])).toEqual(["ev:ok"]);
      expect(shownAtRoot([raw])).toEqual([]);
    }
  });

  it("HR2 keeps a ref of exactly the scan bound that shrinks on the workflow root path, and drops one unit more", () => {
    const exact = `ev:${ZWSP.repeat(SCAN_BOUND - 5)}ab`;
    expect(exact.length).toBe(SCAN_BOUND);
    expect(shownAtRoot([exact])).toEqual(["ev:ab"]);
    expect(shownAtRoot([`${exact}c`])).toEqual([]);
  });

  it("HR3 applies to refs of a non-root node on the sorted rest path", () => {
    const rows = [node("n1", ["ev:first"]), node("n2", [`ev:${ZWSP.repeat(520)}TAILPART`, "ev:second"])];
    const view = { query: (filter: ObservationQuery) => ({ nodes: rows.slice(0, filter.limit), examined: rows.length, truncated: false }) };
    const report = selectLatencyDecomposition(view, { scope: alice, invocationId: INVOCATION });
    expect(report.evidenceRefs).toEqual(["ev:first", "ev:second"]);
  });
});
