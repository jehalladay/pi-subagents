/**
 * W15-B/VC-5 linked topology slice (wb-g1g.2). Every case pins a docs/workbench clause. The selector is a pure, read-only
 * view over observed typed relations: a missing relation is never invented, a cycle or unknown edge is a reference, and
 * fan-out beyond a cap collapses to a counted remainder. B4 is the fabrication falsifier: a seeded fixture checked
 * against an independent computation written here.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type NativeRef, ObservationProjection, type ObservationQuery, type ObservationScope, type ObservedNode, type Relation, type RelationKind,
} from "../src/workbench/observation.js";
import {selectLinkedTopology,
  TOPOLOGY_CONTRACT, TOPOLOGY_RELATION_CLASSES, type TopologyEdge, type TopologySlice, 
} from "../src/workbench/topology-slice.js";

const alice: ObservationScope = { workspace: "ws-topology", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-topology", principal: "bob" };
const T = "2026-10-15T12:00:00.000Z";
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202A-\u202E\u2066-\u2069]/;
const CAVEAT = "Observed typed relations only; missing edges do not imply independence.";

const ref = (id: string, provider = "furnace"): NativeRef => ({ provider, type: "operation", id });
function observe(view: ObservationProjection, id: string, scope = alice, provider = "furnace"): void {
  view.refresh({
    source: ref(id, provider), scope, capturedAt: T, observedAt: T,
    node: { title: `Operation ${id}`, type: "sdk-operation", statusText: "RUNNING", statusTone: "active" },
    trace: { invocationId: "inv-topology" },
  });
}
function relate(
  view: ObservationProjection, from: string, to: string, kind: RelationKind = "dependency", source = "declared workflow",
  extra: { scope?: ObservationScope; provider?: string; nativeConfirmationRef?: string; observedAt?: string } = {},
): void {
  const provider = extra.provider ?? "furnace";
  view.relate({
    scope: extra.scope ?? alice, from: ref(from, provider), to: ref(to, provider), kind,
    provenance: { source, observedAt: extra.observedAt ?? T, ...(extra.nativeConfirmationRef ? { nativeConfirmationRef: extra.nativeConfirmationRef } : {}) },
  });
}
const keyOf = (id: string, scope = alice, provider = "furnace"): string => JSON.stringify([scope.workspace, scope.principal, provider, "operation", "", id]);
const fixture = (ids: readonly string[]): ObservationProjection => {
  const view = new ObservationProjection();
  for (const id of ids) observe(view, id);
  return view;
};
const select = (view: Pick<ObservationProjection, "relations">, focus: string, caps: Parameters<typeof selectLinkedTopology>[2] = {}) =>
  selectLinkedTopology({ scope: alice, relations: view }, focus === "" ? "" : keyOf(focus), caps);
const ids = (slice: TopologySlice): string[] => slice.edges.map(edge => edge.nativeRef.id);

/** A structural stand-in for producer rows the real projection would refuse to store. */
function stand(edges: Relation[]): Pick<ObservationProjection, "relations"> {
  return {
    relations: input => edges
      .filter(edge => (input.from === undefined || edge.from === input.from) && (input.to === undefined || edge.to === input.to))
      .slice(0, input.limit ?? 100),
  };
}
const GOOD: Relation["provenance"] = { source: "declared workflow", observedAt: T };
/** `null` provenance models a producer row that stated none. */
const edgeRow = (from: string, to: string, kind: string, provenance: Relation["provenance"] | null = GOOD): Relation =>
  ({ from, to, kind: kind as RelationKind, provenance: provenance as Relation["provenance"] });

describe("B1 docs/workbench/09 § Relationships are typed and provenanced: a bounded linked slice with per-edge provenance", () => {
  it("lists upstream and downstream neighbors of the focus, each edge carrying class, timestamp and source", () => {
    const view = fixture(["A", "B", "C"]);
    relate(view, "A", "B", "dependency", "declared workflow", { observedAt: "2026-10-15T11:00:00.000Z" });
    relate(view, "B", "C", "causation", "tool call", { observedAt: "2026-10-15T11:30:00.000Z" });
    const slice = select(view, "B");
    expect(TOPOLOGY_CONTRACT).toBe("workbench.topology-slice/v1");
    expect(slice).toMatchObject({ contract: "workbench.topology-slice/v1", basis: "observed", focus: { key: keyOf("B"), nativeRef: ref("B"), label: "furnace:operation:B" } });
    expect(slice.upstream.edges).toEqual<TopologyEdge[]>([{
      key: keyOf("A"), nativeRef: ref("A"), label: "furnace:operation:A", relation: "declared-dependency", authoritative: true,
      provenance: { sourceLabel: "declared workflow", observedAt: "2026-10-15T11:00:00.000Z" },
    }]);
    expect(slice.downstream.edges).toEqual<TopologyEdge[]>([{
      key: keyOf("C"), nativeRef: ref("C"), label: "furnace:operation:C", relation: "observed-causal", authoritative: true,
      provenance: { sourceLabel: "tool call", observedAt: "2026-10-15T11:30:00.000Z" },
    }]);
    expect(slice.upstream.remainder).toEqual({ count: 0, atLeast: false, byClass: {} });
    expect(slice.trace).toEqual({ label: "observed", reasons: [], caveat: CAVEAT });
  });

  it("is read only and deterministic: the projection is untouched and a repeat call is deep-equal", () => {
    const view = fixture(["A", "B", "C"]);
    relate(view, "A", "B");
    relate(view, "B", "C");
    const before = { revision: view.relationRevision(), stats: view.stats() };
    const first = select(view, "B");
    expect(select(view, "B")).toEqual(first);
    expect({ revision: view.relationRevision(), stats: view.stats() }).toEqual(before);
  });

  it("keeps two sources for the same neighbor and class as two edges, ordered by neighbor key then source", () => {
    const view = fixture(["A", "B", "Z"]);
    relate(view, "Z", "B", "dependency", "source-two");
    relate(view, "A", "B", "dependency", "source-two");
    relate(view, "A", "B", "dependency", "source-one");
    expect(select(view, "B").upstream.edges.map(edge => [edge.nativeRef.id, edge.provenance.sourceLabel])).toEqual([
      ["A", "source-one"], ["A", "source-two"], ["Z", "source-two"],
    ]);
  });

  it("never reads another tenant's relations and refuses a focus key outside the caller scope", () => {
    const view = fixture(["A", "B"]);
    observe(view, "A", bob);
    observe(view, "B", bob);
    relate(view, "A", "B", "dependency", "bob-only", { scope: bob });
    expect(select(view, "B").upstream.edges).toEqual([]);
    expect(() => selectLinkedTopology({ scope: alice, relations: view }, keyOf("B", bob))).toThrow(CapabilityError);
    for (const bad of ["", "not json", "[]", JSON.stringify(["ws-topology", "alice", "furnace"])]) {
      expect(() => selectLinkedTopology({ scope: alice, relations: view }, bad)).toThrow(/Topology selection refused/);
    }
  });
});

describe("B2 docs/workbench/09 § Relationships are typed and provenanced: edge classes stay distinct and hypotheses are never authoritative", () => {
  it("separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis", () => {
    const view = fixture(["F", "d", "c", "o", "g", "h"]);
    relate(view, "d", "F", "dependency");
    relate(view, "c", "F", "causation", "tool call");
    relate(view, "o", "F", "ownership", "furnace", { nativeConfirmationRef: "furnace-run:run-1" });
    relate(view, "g", "F", "grouping", "display scope");
    relate(view, "h", "F", "hypothesis", "heuristic");
    const edges = select(view, "F").upstream.edges;
    expect(TOPOLOGY_RELATION_CLASSES).toEqual(["declared-dependency", "observed-causal", "lifecycle-ownership", "grouping", "inferred-hypothesis"]);
    expect(edges.map(edge => [edge.nativeRef.id, edge.relation, edge.authoritative])).toEqual([
      ["d", "declared-dependency", true], ["c", "observed-causal", true], ["o", "lifecycle-ownership", true], ["g", "grouping", true], ["h", "inferred-hypothesis", false],
    ]);
    expect(edges.find(edge => edge.relation === "lifecycle-ownership")?.provenance).toEqual({
      sourceLabel: "furnace", observedAt: T, nativeConfirmationRef: "furnace-run:run-1",
    });
    expect(edges.filter(edge => !edge.authoritative).map(edge => edge.relation)).toEqual(["inferred-hypothesis"]);
  });

  it("lets a hypothesis collapse into the remainder before any authoritative edge when a cap bites", () => {
    const view = fixture(["F", "h1", "h2", "a1", "a2"]);
    relate(view, "F", "h1", "hypothesis");
    relate(view, "F", "h2", "hypothesis");
    relate(view, "F", "a1", "dependency");
    relate(view, "F", "a2", "causation");
    const down = select(view, "F", { perDirection: 2 }).downstream;
    expect(ids(down)).toEqual(["a1", "a2"]);
    expect(down.remainder).toEqual({ count: 2, atLeast: false, byClass: { "inferred-hypothesis": 2 } });
  });

  it("does not present ownership without a native confirmation from the owning provider as lifecycle ownership", () => {
    const owner = (provenance: Relation["provenance"]) => stand([edgeRow(keyOf("O"), keyOf("F"), "ownership", provenance)]);
    for (const provenance of [
      { source: "furnace", observedAt: T },
      { source: "forge", observedAt: T, nativeConfirmationRef: "x" },
    ]) {
      const slice = select(owner(provenance), "F");
      expect(slice.upstream.edges).toEqual([]);
      expect(slice.references).toMatchObject([{ direction: "upstream", reason: "unconfirmed-ownership", key: keyOf("O") }]);
    }
    expect(select(owner({ source: "furnace", observedAt: T, nativeConfirmationRef: "run-1" }), "F").upstream.edges.map(edge => edge.relation)).toEqual(["lifecycle-ownership"]);
  });

  it("states a hypothesis-only focus as an incomplete trace, not as an authoritative neighborhood", () => {
    const view = fixture(["F", "h"]);
    relate(view, "h", "F", "hypothesis");
    const slice = select(view, "F");
    expect(slice.upstream.edges.map(edge => edge.authoritative)).toEqual([false]);
    expect(slice.trace).toMatchObject({ label: "incomplete-trace", reasons: ["hypothesis-only"] });
  });
});

describe("B3 docs/workbench/10 § Four views (Graph): cycles and unknown dynamic edges are references; fan-out collapses visibly", () => {
  it("returns a self loop, a two-cycle and a three-cycle through the focus as references, never as plain neighbors", () => {
    const self = fixture(["F"]);
    relate(self, "F", "F");
    const selfSlice = select(self, "F");
    expect(selfSlice.upstream.edges).toEqual([]);
    expect(selfSlice.downstream.edges).toEqual([]);
    expect(selfSlice.references).toMatchObject([{ direction: "self", reason: "cycle", key: keyOf("F") }]);

    const two = fixture(["F", "G", "P"]);
    relate(two, "F", "G");
    relate(two, "G", "F");
    relate(two, "P", "F");
    const twoSlice = select(two, "F");
    expect(ids(twoSlice.upstream)).toEqual(["P"]);
    expect(ids(twoSlice.downstream)).toEqual([]);
    expect(twoSlice.references.map(entry => [entry.direction, entry.reason, entry.nativeRef?.id]).sort()).toEqual([["downstream", "cycle", "G"], ["upstream", "cycle", "G"]]);

    const three = fixture(["F", "X", "Y", "S"]);
    relate(three, "F", "X");
    relate(three, "X", "Y");
    relate(three, "Y", "F");
    relate(three, "F", "S");
    const threeSlice = select(three, "F");
    expect(ids(threeSlice.downstream)).toEqual(["S"]);
    expect(ids(threeSlice.upstream)).toEqual([]);
    expect(threeSlice.references.map(entry => [entry.direction, entry.nativeRef?.id]).sort()).toEqual([["downstream", "X"], ["upstream", "Y"]]);
    expect(threeSlice.references.every(entry => entry.reason === "cycle" && entry.relation === "declared-dependency")).toBe(true);
    expect(threeSlice.references.every(entry => entry.edgeCount === 1 && entry.provenance?.sourceLabel === "declared workflow")).toBe(true);
  });

  it("does not treat a hypothesis edge as part of a cycle and labels an exhausted cycle search", () => {
    const hyp = fixture(["F", "G"]);
    relate(hyp, "F", "G");
    relate(hyp, "G", "F", "hypothesis");
    expect(ids(select(hyp, "F").downstream)).toEqual(["G"]);
    expect(select(hyp, "F").references).toEqual([]);

    const deep = fixture(["F", "N1", "N2", "N3"]);
    relate(deep, "F", "N1");
    relate(deep, "N1", "N2");
    relate(deep, "N2", "N3");
    relate(deep, "N3", "F");
    const cut = select(deep, "F", { cycleReads: 1 });
    expect(cut.trace).toMatchObject({ label: "incomplete-trace", reasons: ["cycle-search-truncated"] });
    // A cycle the search could not close is never guessed: no reference, and the trace says the search stopped.
    expect(cut.references).toEqual([]);
    expect(ids(cut.downstream)).toEqual(["N1"]);
    expect(select(deep, "F", { cycleReads: 0 }).trace.reasons).toContain("cycle-search-truncated");
    expect(select(deep, "F").references.map(entry => entry.nativeRef?.id).sort()).toEqual(["N1", "N3"]);
    expect(select(deep, "F").trace.reasons).toEqual([]);
  });

  it("does not claim a cycle search complete when a walked node's relation page was full", () => {
    const view = fixture(["F", "N1", "N2", "a", "b"]);
    relate(view, "F", "N1");
    relate(view, "N1", "N2");
    relate(view, "N1", "a");
    relate(view, "N1", "b");
    relate(view, "N2", "F");
    const slice = select(view, "F", { relationPage: 3 });
    expect(slice.trace).toMatchObject({ label: "incomplete-trace", reasons: ["cycle-search-truncated"] });
    expect(select(view, "F").trace.reasons).toEqual([]);
  });

  it("reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields", () => {
    const rows = stand([
      edgeRow(keyOf("F"), "<<opaque dynamic target>>", "dependency"),
      edgeRow(keyOf("F"), keyOf("K"), "teleport"),
      edgeRow(keyOf("F"), keyOf("M"), "dependency", { source: "" }),
      edgeRow(keyOf("F"), keyOf("N"), "dependency", null),
      edgeRow(keyOf("F"), keyOf("OK"), "dependency"),
      edgeRow(keyOf("F"), keyOf("X", bob), "dependency"),
    ]);
    const slice = select(rows, "F");
    expect(ids(slice.downstream)).toEqual(["OK"]);
    expect(slice.references.map(entry => [entry.reason, entry.key])).toEqual([
      ["missing-provenance", keyOf("M")], ["missing-provenance", keyOf("N")], ["unknown-endpoint", "<<opaque dynamic target>>"], ["unknown-relation-kind", keyOf("K")],
    ]);
    for (const entry of slice.references) {
      expect(entry).not.toHaveProperty("provenance");
      expect(entry).not.toHaveProperty("relation");
      expect(entry.edgeCount).toBe(1);
    }
    // A foreign-tenant endpoint is dropped, never echoed.
    expect(JSON.stringify(slice)).not.toContain("bob");
  });

  it("collapses fan-out beyond the cap into an exact counted remainder by class, and bounds references the same way", () => {
    const view = fixture(["F", ...Array.from({ length: 30 }, (_, i) => `n${String(i).padStart(2, "0")}`)]);
    for (let i = 0; i < 20; i++) relate(view, "F", `n${String(i).padStart(2, "0")}`, "dependency");
    for (let i = 20; i < 30; i++) relate(view, "F", `n${String(i).padStart(2, "0")}`, "grouping", "display scope");
    const slice = select(view, "F", { perDirection: 5 });
    expect(slice.downstream.edges).toHaveLength(5);
    expect(slice.downstream.remainder).toEqual({ count: 25, atLeast: false, byClass: { "declared-dependency": 15, grouping: 10 } });
    expect(slice.trace.reasons).toEqual([]);
    expect(select(view, "F", { perDirection: 0 }).downstream.remainder.count).toBe(30);

    const noisy = stand(Array.from({ length: 6 }, (_, i) => edgeRow(keyOf("F"), `<<unknown ${i}>>`, "dependency")));
    const refs = select(noisy, "F", { references: 2 });
    expect(refs.references).toHaveLength(2);
    expect(refs.referencesRemainder).toBe(4);
  });

  it("marks a full relation page as a lower bound and the trace incomplete", () => {
    const view = fixture(["F", ...Array.from({ length: 120 }, (_, i) => `m${i}`)]);
    for (let i = 0; i < 120; i++) relate(view, "F", `m${i}`);
    const slice = select(view, "F", { perDirection: 10 });
    expect(slice.downstream.edges).toHaveLength(10);
    expect(slice.downstream.remainder).toMatchObject({ count: 90, atLeast: true });
    expect(slice.trace).toMatchObject({ label: "incomplete-trace", reasons: ["relations-truncated"] });
    expect(select(view, "F", { relationPage: 12, perDirection: 10 }).downstream.remainder).toMatchObject({ count: 2, atLeast: true });
  });
});

describe("B4 docs/workbench/09 § Acceptance/negative controls: no fabricated dependency edge when a relation is missing", () => {
  it("returns empty slices labeled incomplete-trace for a node with no observed relations", () => {
    const view = fixture(["A", "B", "C"]);
    relate(view, "A", "B");
    const slice = select(view, "C");
    expect(slice.upstream).toEqual({ edges: [], remainder: { count: 0, atLeast: false, byClass: {} } });
    expect(slice.downstream).toEqual({ edges: [], remainder: { count: 0, atLeast: false, byClass: {} } });
    expect(slice.references).toEqual([]);
    expect(slice.trace).toEqual({ label: "incomplete-trace", reasons: ["no-observed-relations"], caveat: CAVEAT });
    // A nodes' independence is never implied either: B's neighborhood is only what was observed.
    expect(ids(select(view, "B").upstream)).toEqual(["A"]);
  });

  it("matches an independent brute-force computation on a seeded fixture: nothing listed that was not observed, nothing lost silently", () => {
    let seed = 20261015;
    const rand = (): number => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 2 ** 32;
    };
    const names = Array.from({ length: 24 }, (_, i) => `q${i}`);
    const view = fixture(names);
    const kinds: RelationKind[] = ["dependency", "causation", "grouping", "hypothesis"];
    const observed: { from: string; to: string; kind: RelationKind; source: string }[] = [];
    for (let i = 0; i < 90; i++) {
      const from = names[Math.floor(rand() * names.length)];
      const to = names[Math.floor(rand() * names.length)];
      const kind = kinds[Math.floor(rand() * kinds.length)];
      const source = `src-${Math.floor(rand() * 3)}`;
      if (observed.some(row => row.from === from && row.to === to && row.kind === kind && row.source === source)) continue;
      relate(view, from, to, kind, source);
      observed.push({ from, to, kind, source });
    }
    const rowClass: Record<RelationKind, string> = { dependency: "declared-dependency", causation: "observed-causal", ownership: "lifecycle-ownership", grouping: "grouping", hypothesis: "inferred-hypothesis" };
    const perDirection = 4;
    for (const focus of names) {
      const slice = select(view, focus, { perDirection, references: 50, cycleReads: 256 });
      const seen = new Set(slice.references.map(entry => `${entry.direction}|${entry.key}`));
      for (const [direction, listed, mine] of [
        ["upstream", slice.upstream, observed.filter(row => row.to === focus && row.from !== focus)],
        ["downstream", slice.downstream, observed.filter(row => row.from === focus && row.to !== focus)],
      ] as const) {
        const cyclic = mine.filter(row => seen.has(`${direction}|${keyOf(direction === "upstream" ? row.from : row.to)}`) && row.kind !== "hypothesis");
        const plain = mine.filter(row => !cyclic.includes(row));
        const truth = new Set(plain.map(row => `${direction === "upstream" ? row.from : row.to}|${rowClass[row.kind]}|${row.source}`));
        const got = listed.edges.map(edge => `${edge.nativeRef.id}|${edge.relation}|${edge.provenance.sourceLabel}`);
        for (const line of got) expect(truth.has(line), `${focus} ${direction} invented ${line}`).toBe(true);
        expect(new Set(got).size).toBe(got.length);
        expect(got.length + listed.remainder.count).toBe(truth.size);
        expect(listed.remainder.atLeast).toBe(false);
        expect(got.length).toBeLessThanOrEqual(perDirection);
      }
      // Independent reachability over authoritative edges: a cycle reference is listed exactly when focus lies on a cycle through it.
      const succ = (node: string): string[] => observed.filter(row => row.from === node && row.kind !== "hypothesis").map(row => row.to);
      const reach = new Set<string>();
      for (let todo = [focus]; todo.length > 0;) {
        const node = todo.pop() as string;
        for (const next of succ(node)) if (next !== focus && !reach.has(next)) { reach.add(next); todo.push(next); }
      }
      const reachesFocus = (start: string): boolean => {
        const visited = new Set<string>();
        for (let todo = [start]; todo.length > 0;) {
          const node = todo.pop() as string;
          if (succ(node).includes(focus)) return true;
          for (const next of succ(node)) if (next !== focus && !visited.has(next)) { visited.add(next); todo.push(next); }
        }
        return false;
      };
      expect(slice.trace.reasons).not.toContain("cycle-search-truncated");
      const expectedCycle = [
        ...succ(focus).filter(h => h !== focus && reachesFocus(h)).map(h => `downstream|${h}`),
        ...observed.filter(row => row.to === focus && row.from !== focus && row.kind !== "hypothesis" && reach.has(row.from)).map(row => `upstream|${row.from}`),
        ...(observed.some(row => row.from === focus && row.to === focus) ? [`self|${focus}`] : []),
      ];
      const gotCycle = slice.references.filter(entry => entry.reason === "cycle").map(entry => `${entry.direction}|${entry.nativeRef?.id}`);
      expect([...new Set(gotCycle)].sort()).toEqual([...new Set(expectedCycle)].sort());
      // A node with no observed relation of any kind is labeled, not given a neighborhood.
      const touches = observed.some(row => row.from === focus || row.to === focus);
      expect(slice.trace.label === "incomplete-trace" && slice.trace.reasons.includes("no-observed-relations")).toBe(!touches);
    }
  });
});

describe("B5 gate: labels pass the shared sanitizers; nothing outside the pure selector is edited", () => {
  it("redacts and strips producer-controlled source labels and identity labels", () => {
    const token = "sk-ant-api03-abcdefghijklmnopqrstuvwxyz";
    const dirty = `\u001b[31mdeclared\u001b[0m by Bearer ${token}\u202e\u0007`;
    const edge = select(stand([edgeRow(keyOf("A"), keyOf("F"), "dependency", { source: dirty, observedAt: T })]), "F").upstream.edges[0];
    expect(edge.provenance.sourceLabel).not.toMatch(UNSAFE);
    expect(edge.provenance.sourceLabel).not.toContain(token);
    expect(edge.provenance.sourceLabel).toContain("[REDACTED]");

    const evil = `\u001b]0;pwn\u0007id-${token}\u202E`;
    const rows = stand([edgeRow(keyOf("F"), JSON.stringify([alice.workspace, alice.principal, "furnace", "operation", "", evil]), "dependency")]);
    const out = select(rows, "F").downstream.edges[0];
    expect(out.label).not.toMatch(UNSAFE);
    expect(out.label).not.toContain(token);
    expect(out.label).not.toContain("pwn");
    expect(out.label).toContain("[REDACTED]");
  });

  it("bounds an oversized label and rejects bad caps with a validation refusal", () => {
    const long = "x".repeat(5_000);
    const rows = stand([edgeRow(keyOf("F"), keyOf("A"), "dependency", { source: long, observedAt: T })]);
    expect(select(rows, "F").downstream.edges[0].provenance.sourceLabel.length).toBeLessThanOrEqual(120);
    const view = fixture(["F"]);
    for (const caps of [{ perDirection: -1 }, { perDirection: 1.5 }, { perDirection: 51 }, { references: 51 }, { relationPage: 0 }, { relationPage: 101 }, { cycleReads: 257 }, { cycleReads: Number.NaN }]) {
      expect(() => select(view, "F", caps), JSON.stringify(caps)).toThrow(/Topology selection refused/);
    }
    try {
      select(view, "F", { perDirection: -1 });
    } catch (error) {
      expect(error).toBeInstanceOf(CapabilityError);
      expect((error as CapabilityError).category).toBe("validation");
    }
  });

  it("drops an unreadable timestamp rather than echoing it, and keeps the module free of host clocks, inspector wiring and mutation", () => {
    const rows = stand([edgeRow(keyOf("F"), keyOf("A"), "dependency", { source: "declared workflow", observedAt: "yesterday-ish" })]);
    expect(select(rows, "F").downstream.edges[0].provenance).toEqual({ sourceLabel: "declared workflow" });
    const source = readFileSync(new URL("../src/workbench/topology-slice.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/Date\.now|new Date\(|Math\.random|performance\.now/);
    expect(source).not.toMatch(/workflow-inspector|\.relate\(|\.refresh\(|\.ingest\(/);
    expect(source).toMatch(/from "\.\/redaction\.js"/);
  });
});

describe("falsifier hygiene: the fixtures themselves", () => {
  it("the real projection stores what the fixtures claim (guards against vacuous green)", () => {
    const view = fixture(["A", "B"]);
    relate(view, "A", "B");
    expect(view.relations({ scope: alice, from: keyOf("A") })).toHaveLength(1);
    const node: ObservedNode | undefined = view.query({ scope: alice, ref: ref("A"), limit: 1 } satisfies ObservationQuery).nodes[0];
    expect(node?.key).toBe(keyOf("A"));
  });
});
