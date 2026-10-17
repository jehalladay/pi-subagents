/** wb-ea1: projection cap overflow renders a counted remainder, never a silent drop.
 * - ObservationProjection.truncation reads, read-only, what the maxNodes and maxEvents caps evicted for one scope or one
 *   invocation viewport and has not admitted again; no cap moves.
 * - The inspector overview renders one 'N nodes not shown: projection cap M' line at the end of the tree (with
 *   'K events not shown' when events were dropped), the details view renders the same line under its body, and the header
 *   gains ' · capped'. A projection that dropped nothing renders byte-identically.
 * - Remainder item 2 of the wb-6ze.16 gate (F5 marker family): the base details view (no topology model) renders
 *   'relations hidden: terminal height' where its Relations line does not fit, never a silent omission.
 */
import { createHash } from "node:crypto";
import { visibleWidth } from "@earendil-works/pi-tui";
import { describe, expect, it } from "vitest";
import { applyFixture, buildGroupedFixture, INVOCATION_ID, SCOPE } from "../qa/workbench/grouped-fixture.mjs";
import { type InspectorModel, type InspectorState, type InspectorView, initialInspectorState, layoutInspector } from "../src/ui/workflow-inspector.js";
import { EVICTION_MEMORY_PER_NODE, type NativeRef, type ObservationLimits, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const scope: ObservationScope = { workspace: "cap-workspace", principal: "cap-reader" };
const otherScope: ObservationScope = { workspace: "cap-workspace", principal: "another-reader" };
const INVOCATION = "cap-run";
const at = "2026-10-17T00:00:00Z";
const HINT = "Tab views · j/k · Esc back/close";
const MARKER = "relations hidden: terminal height";
const VIEWS: readonly InspectorView[] = ["overview", "graph", "timeline", "details"];
const ref = (id: number | string): NativeRef => ({ provider: "forge", type: "operation", id: String(id) });
const node = (title: string) => ({ title, type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const });
const modelOf = (projection: ObservationProjection, invocationId = INVOCATION): InspectorModel => ({
  projection,
  scope,
  invocationId,
  title: "Capped run",
  status: "running",
});
const frame = (model: InspectorModel, view: InspectorView, rows = 24, width = 80, ascii = false, extra: Partial<InspectorState> = {}): string[] =>
  layoutInspector(model, { ...initialInspectorState(), view, ...extra }, { width, rows, ascii });
const trimmed = (lines: readonly string[]): string[] => lines.map(line => line.trim());

/** One snapshot of operation `id`, inside `invocationId` unless it is null (an untraced snapshot). */
function snap(projection: ObservationProjection, id: number, invocationId: string | null = INVOCATION, on: ObservationScope = scope, evidenceRefs?: readonly string[]) {
  return projection.refresh({
    source: ref(id),
    scope: on,
    capturedAt: at,
    observedAt: at,
    node: node(`Operation ${id}`),
    ...(invocationId === null ? {} : { trace: { invocationId } }),
    ...(evidenceRefs === undefined ? {} : { evidenceRefs }),
  });
}
/** One status event for operation `id`, carrying a trace only when `invocationId` is given. */
function update(projection: ObservationProjection, id: number, sequence: number, invocationId?: string) {
  return projection.ingest({
    projectionEventId: `status-${id}-${sequence}`,
    source: ref(id),
    scope,
    sourceSequence: sequence,
    observedAt: at,
    kind: "native.status",
    node: { presentation: node(`Operation ${id}`) },
    ...(invocationId === undefined ? {} : { trace: { invocationId } }),
  });
}
/** Seven snapshots against a node cap of four (operations 0-2 evicted), then five events against an event cap of three. */
function capped(limits: ObservationLimits = { maxNodes: 4, maxEvents: 3 }): ObservationProjection {
  const projection = new ObservationProjection(limits);
  for (let id = 0; id < 7; id++) snap(projection, id);
  for (let sequence = 1; sequence <= 5; sequence++) update(projection, 6, sequence);
  return projection;
}

describe("wb-ea1 projection truncation counts (read-only, per scope and per invocation viewport)", () => {
  it("reads zero evictions and the projection's own caps when nothing was dropped", () => {
    const projection = new ObservationProjection();
    for (let id = 0; id < 5; id++) snap(projection, id);
    expect(projection.truncation({ scope, invocationId: INVOCATION })).toEqual({ nodes: 0, events: 0, maxNodes: 2_000, maxEvents: 20_000 });
    expect(projection.truncation({ scope })).toEqual({ nodes: 0, events: 0, maxNodes: 2_000, maxEvents: 20_000 });
  });

  it("counts the node cap's evictions exactly: offered minus retained, for the scope and for the invocation", () => {
    const projection = capped();
    expect(projection.stats().nodes).toBe(4);
    expect(projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 10 }).total).toBe(4);
    expect(projection.truncation({ scope, invocationId: INVOCATION })).toMatchObject({ nodes: 3, maxNodes: 4 });
    expect(projection.truncation({ scope }).nodes).toBe(3);
  });

  it("counts the event cap's evictions exactly, against the invocation the evicted event's node was shown in", () => {
    const projection = capped();
    expect(projection.stats().events).toBe(3);
    expect(projection.truncation({ scope, invocationId: INVOCATION })).toMatchObject({ events: 2, maxEvents: 3 });
    expect(projection.truncation({ scope }).events).toBe(2);
  });

  it("an evicted node admitted again leaves the count: the remainder is distinct nodes not retained, not evictions", () => {
    const projection = capped();
    // Operation 0 returns (evicting operation 3): 8 distinct offered, 4 retained.
    snap(projection, 0);
    expect(projection.truncation({ scope, invocationId: INVOCATION }).nodes).toBe(3);
    // Churn: every re-admission evicts another, and the count still equals distinct offered minus retained.
    for (let round = 0; round < 3; round++) for (let id = 0; id < 7; id++) snap(projection, id);
    expect(projection.stats().nodes).toBe(4);
    expect(projection.truncation({ scope, invocationId: INVOCATION }).nodes).toBe(3);
    snap(projection, 7);
    expect(projection.truncation({ scope, invocationId: INVOCATION }).nodes).toBe(4);
  });

  it("past maxNodes x EVICTION_MEMORY_PER_NODE remembered keys the oldest is forgotten and stays counted: over-states, never under-states", () => {
    const projection = new ObservationProjection({ maxNodes: 1 });
    const remembered = EVICTION_MEMORY_PER_NODE;
    expect(remembered).toBe(10);
    // 12 distinct snapshots through a one-node cap: 11 evictions, one more than the 10 keys remembered.
    for (let id = 0; id < 12; id++) snap(projection, id);
    expect(projection.truncation({ scope }).nodes).toBe(11);
    // Operation 0's key was forgotten, so its return cannot leave the count: 12 counted against 11 truly not retained.
    snap(projection, 0);
    expect(projection.truncation({ scope }).nodes).toBe(12);
    // Operation 5's key is still remembered, so its return leaves the count again.
    snap(projection, 5);
    expect(projection.truncation({ scope }).nodes).toBe(12);
    const truth = 12 - projection.stats().nodes;
    expect(projection.truncation({ scope }).nodes).toBeGreaterThanOrEqual(truth);
  });

  it("isolates scopes and invocations: another scope, another invocation and untraced nodes never show in this viewport", () => {
    const projection = new ObservationProjection({ maxNodes: 2 });
    snap(projection, 0, null);
    snap(projection, 1, "other-run");
    snap(projection, 2, INVOCATION, otherScope);
    snap(projection, 3);
    snap(projection, 4);
    // Evicted in order: 0 (untraced), 1 (other-run), 2 (other scope).
    expect(projection.truncation({ scope, invocationId: INVOCATION }).nodes).toBe(0);
    expect(projection.truncation({ scope, invocationId: "other-run" }).nodes).toBe(1);
    expect(projection.truncation({ scope }).nodes).toBe(2);
    expect(projection.truncation({ scope: otherScope }).nodes).toBe(1);
    expect(projection.truncation({ scope: otherScope, invocationId: INVOCATION }).nodes).toBe(1);
    expect(projection.truncation({ scope: { workspace: "nowhere", principal: "nobody" } })).toMatchObject({ nodes: 0, events: 0 });
  });

  it("attributes an untraced event to the invocation its node was already shown in", () => {
    const projection = new ObservationProjection({ maxEvents: 1 });
    snap(projection, 0);
    update(projection, 0, 1);
    update(projection, 0, 2);
    expect(projection.truncation({ scope, invocationId: INVOCATION }).events).toBe(1);
    update(projection, 0, 3, "other-run");
    expect(projection.truncation({ scope, invocationId: INVOCATION }).events).toBe(2);
    update(projection, 0, 4);
    expect(projection.truncation({ scope, invocationId: "other-run" }).events).toBe(1);
  });

  it("is read-only: a mutated result never reaches the next read, and reading changes no revision or stat", () => {
    const projection = capped();
    const before = { stats: projection.stats(), revision: projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 1 }).revision };
    const first = projection.truncation({ scope, invocationId: INVOCATION });
    first.nodes = 999;
    first.events = 999;
    first.maxNodes = 1;
    expect(projection.truncation({ scope, invocationId: INVOCATION })).toEqual({ nodes: 3, events: 2, maxNodes: 4, maxEvents: 3 });
    expect({ stats: projection.stats(), revision: projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 1 }).revision }).toEqual(before);
  });

  it("at bench scale (grouped-10k, node cap 1000, 100k+ updates that re-admit evicted nodes) the count is offered minus retained", () => {
    const fixture = buildGroupedFixture();
    const projection = new ObservationProjection({ maxNodes: 1_000, maxEdges: 2_000, maxEvents: 128, maxQuery: 40 });
    const applied = applyFixture(projection, fixture);
    const retained = projection.window({ scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1 }).total;
    const cut = projection.truncation({ scope: SCOPE, invocationId: INVOCATION_ID });
    expect(retained).toBe(1_000);
    expect(cut.nodes).toBe(fixture.snapshots.length - retained);
    expect(cut.events).toBe(applied.ingestApplied - projection.stats().events);
    expect(cut).toMatchObject({ maxNodes: 1_000, maxEvents: 128 });
  }, 60_000);
});

describe("wb-ea1 inspector remainder line and capped header", () => {
  it("overview: exactly one remainder line at the end of the tree, before the selected-node line", () => {
    const lines = trimmed(frame(modelOf(capped()), "overview"));
    const row = lines.indexOf("3 nodes not shown: projection cap 4 · 2 events not shown");
    expect(lines.filter(line => /not shown: projection/.test(line))).toHaveLength(1);
    expect(row).toBeGreaterThan(0);
    expect(lines[row - 1]).toMatch(/Operation 6/);
    expect(lines[row + 1]).toMatch(/^Selected/);
    expect(lines.at(-1)).toBe(HINT);
  });

  it("details: the same line under the node body, before the key hint", () => {
    const lines = trimmed(frame(modelOf(capped()), "details"));
    const row = lines.indexOf("3 nodes not shown: projection cap 4 · 2 events not shown");
    expect(lines.filter(line => /not shown: projection/.test(line))).toHaveLength(1);
    expect(row).toBeGreaterThan(lines.findIndex(line => line.startsWith("Evidence: ")));
    expect(lines.at(-1)).toBe(HINT);
  });

  it("names nodes alone, events alone (with the event cap) and singular counts in their own words", () => {
    const nodesOnly = new ObservationProjection({ maxNodes: 2 });
    for (let id = 0; id < 3; id++) snap(nodesOnly, id);
    expect(trimmed(frame(modelOf(nodesOnly), "overview"))).toContain("1 node not shown: projection cap 2");
    const eventsOnly = new ObservationProjection({ maxEvents: 2 });
    snap(eventsOnly, 0);
    for (let sequence = 1; sequence <= 5; sequence++) update(eventsOnly, 0, sequence);
    expect(trimmed(frame(modelOf(eventsOnly), "details"))).toContain("3 events not shown: projection event cap 2");
    // An evicted event hides no row of any view, so the header names node truncation only (wb-6ze.34 AC4 pins an event-capped graph frame).
    for (const view of VIEWS) expect(frame(modelOf(eventsOnly), view)[0]).toBe(" ╭ Capped run running ╮");
    expect(trimmed(frame(modelOf(eventsOnly), "details", 24, 80, true))).toContain("3 events not shown: projection event cap 2");
    expect(trimmed(frame(modelOf(capped()), "overview", 24, 80, true))).toContain("3 nodes not shown: projection cap 4 | 2 events not shown");
  });

  it("the header gains ' · capped' (ASCII ' | capped') in every view when the projection dropped nodes", () => {
    for (const view of VIEWS) {
      expect(frame(modelOf(capped()), view)[0]).toBe(" ╭ Capped run running · capped ╮");
      expect(frame(modelOf(capped()), view, 24, 80, true)[0]).toBe(" [ Capped run running | capped ]");
    }
  });

  it("the remainder line and the capped header never show for another invocation of the same projection", () => {
    const projection = capped();
    snap(projection, 50, "other-run");
    for (const view of VIEWS) {
      const lines = frame(modelOf(projection, "other-run"), view);
      expect(lines[0]).toBe(" ╭ Capped run running ╮");
      expect(lines.join("\n")).not.toMatch(/not shown: projection|capped/);
    }
  });

  it("stays one bounded line at every terminal height and width; the details key hint stays last", () => {
    const model = modelOf(capped());
    for (const width of [32, 60, 80, 120]) {
      for (let rows = 5; rows <= 24; rows++) {
        for (const view of ["overview", "details"] as const) {
          const lines = frame(model, view, rows, width);
          expect(lines.length).toBeLessThanOrEqual(rows);
          expect(lines.every(line => visibleWidth(line) <= width)).toBe(true);
          expect(lines.filter(line => /\d+ nodes? not/.test(line))).toHaveLength(1);
          if (view === "details") expect(lines.at(-1)?.trim().startsWith("Tab views")).toBe(true);
        }
      }
    }
  });
});

/** A rich projection that dropped nothing: relations, evidence, intervals and retained events under both caps. */
function uncapped(limits?: ObservationLimits): InspectorModel {
  const projection = limits === undefined ? new ObservationProjection() : new ObservationProjection(limits);
  for (let id = 0; id < 30; id++) {
    projection.refresh({
      source: ref(id),
      scope,
      capturedAt: at,
      observedAt: at,
      node: node(`Operation ${id}`),
      trace: { invocationId: INVOCATION },
      ...(id % 3 === 0 ? { evidenceRefs: [`forge-ev-${id}`] } : {}),
      ...(id < 4 ? { interval: { startedAt: at, endedAt: "2026-10-17T00:00:03Z" } } : {}),
    });
  }
  for (let id = 1; id < 30; id += 2) projection.relate({ scope, from: ref(id - 1), to: ref(id), kind: "dependency", provenance: { source: "forge", observedAt: at } });
  for (let sequence = 1; sequence <= 20; sequence++) update(projection, sequence % 5, sequence);
  return modelOf(projection);
}
const SIZES = [
  { width: 80, rows: 24 },
  { width: 120, rows: 40 },
  { width: 100, rows: 30 },
] as const;
const digest = (model: InspectorModel, view: InspectorView): string => {
  const hash = createHash("sha256");
  for (const size of SIZES) for (const ascii of [false, true]) for (const index of [0, 7]) hash.update(`${frame(model, view, size.rows, size.width, ascii, { index }).join("\n")}\n--\n`);
  return hash.digest("hex");
};
/** Recorded on the base tree 68245b0 (before wb-ea1) with this file's uncapped() fixture. */
const UNCAPPED_FRAMES: Record<InspectorView, string> = {
  overview: "664f2ba8c327c094b829faf661ddc418a5c0f970bd47f2c2f0477e96e18a26ae",
  graph: "c817383343379b9b3ed6801fbe151f8fb9a4041e7153a9c1e315c1b47ccb41fe",
  timeline: "34fed144510d230b623ada704c9da14f4a2e9c513e06bf883812da6ac23bea58",
  details: "02c83e3b39317380e316507be9070f012bfe0cc052d52f00500c1bf16ccf9919",
};

describe("wb-ea1 byte-identical rendering when nothing was dropped", () => {
  it.each(VIEWS)("%s frames of an uncapped projection equal the pre-wb-ea1 frames byte for byte", view => {
    expect(digest(uncapped(), view)).toBe(UNCAPPED_FRAMES[view]);
  });

  it("a projection filled exactly to both caps (zero evictions) renders as if it had no caps at all", () => {
    const atCap = uncapped({ maxNodes: 30, maxEvents: 20 });
    expect(atCap.projection.stats()).toMatchObject({ nodes: 30, events: 20 });
    const free = uncapped();
    for (const view of VIEWS) {
      for (const size of SIZES) {
        for (const ascii of [false, true]) expect(frame(atCap, view, size.rows, size.width, ascii)).toEqual(frame(free, view, size.rows, size.width, ascii));
      }
    }
  });
});

/** The base details view with no topology model: operation 0 has two observed relations and `evidence` references. */
function relationsModel(evidence: number, count: number): InspectorModel {
  const projection = new ObservationProjection();
  for (let id = 0; id < count; id++) snap(projection, id, INVOCATION, scope, id === 0 ? Array.from({ length: evidence }, (_, n) => `forge-ev-${n}`) : undefined);
  projection.relate({ scope, from: ref(0), to: ref(1), kind: "dependency", provenance: { source: "forge", observedAt: at } });
  projection.relate({ scope, from: ref(1), to: ref(0), kind: "causation", provenance: { source: "forge", observedAt: at } });
  return modelOf(projection);
}
const VARIANTS = [0, 1, 3].flatMap(evidence =>
  [2, 40].flatMap(count => [{}, { filter: "operation" }, { focused: "focus" }].map(state => ({ evidence, count, state }))),
);

describe("wb-ea1 remainder item 2: the base Relations line is never omitted silently (wb-6ze.16 F5 marker family)", () => {
  it.each(VARIANTS)("evidence $evidence, $count operations, state $state: Relations or one marker at 80x5..80x24, hint last", ({ evidence, count, state }) => {
    const model = relationsModel(evidence, count);
    const focusKey = model.projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 1 }).nodes[0]?.key ?? null;
    const extra: Partial<InspectorState> = "focused" in state ? { focused: focusKey } : state;
    for (let rows = 5; rows <= 24; rows++) {
      const lines = trimmed(frame(model, "details", rows, 80, false, extra));
      const relations = lines.filter(line => line.startsWith("Relations: "));
      const markers = lines.filter(line => line === MARKER);
      expect(lines.length).toBeLessThanOrEqual(rows);
      expect(relations.length + markers.length).toBe(1);
      expect(lines.at(-1)).toBe(HINT);
    }
  });

  it("renders no marker when the node has no observed relations: no section exists to hide", () => {
    const projection = new ObservationProjection();
    snap(projection, 0);
    for (let rows = 5; rows <= 24; rows++) expect(trimmed(frame(modelOf(projection), "details", rows))).not.toContain(MARKER);
  });

  it("keeps the Relations line, and draws no marker, wherever it fits with the key hint", () => {
    const lines = trimmed(frame(relationsModel(0, 2), "details", 24));
    expect(lines).toContain("Relations: dependency, causation");
    expect(lines).not.toContain(MARKER);
  });
});
