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

  it("applies to refs of non-first nodes too (the sorted rest path)", () => {
    const rows = [node("n1", ["ev:first"]), node("n2", [`ev:${ZWSP.repeat(520)}TAILPART`, "ev:second"])];
    const view = { query: (filter: ObservationQuery) => ({ nodes: rows.slice(0, filter.limit), examined: rows.length, truncated: false }) };
    const report = selectLatencyDecomposition(view, { scope: alice, invocationId: INVOCATION });
    expect(report.evidenceRefs).toEqual(["ev:first", "ev:second"]);
  });
});
