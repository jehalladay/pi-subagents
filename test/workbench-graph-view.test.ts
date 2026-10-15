/** wb-6ze.32 (W15/VC-5): the pure graph-view model over ObservationProjection relation pages. Each describe block quotes the
 * docs/workbench/10 "Four views" Graph bullet or the "Rendering pipeline" graph sentences the bead's acceptance names, and the
 * F1-F5 falsifiers from the bead. Inspector rendering and wiring are out of scope, so every case reads a real
 * ObservationProjection and nothing else. */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  buildGraphView,
  createGraphViewBuilder,
  GRAPH_VIEW_CONTRACT,
  type GraphViewModel,
  type GraphViewRequest,
} from "../src/workbench/graph-view.js";
import {
  type NativeRef,
  type NativeSnapshot,
  ObservationProjection,
  type ObservationScope,
  type Presentation,
  type RelationKind,
} from "../src/workbench/observation.js";

// The model is a pure read: nothing this suite loads may reach a native producer SDK.
vi.mock("@anthropic-ai/claude-agent-sdk", () => {
  throw new Error("the graph view must not load the Claude Agent SDK");
});
vi.mock("@furnace/sdk", () => {
  throw new Error("the graph view must not load the Furnace SDK");
});
vi.mock("@forge/sdk", () => {
  throw new Error("the graph view must not load the Forge SDK");
});

afterEach(() => {
  vi.restoreAllMocks();
});

const scope: ObservationScope = { workspace: "ws-graph", principal: "operator" };
const INVOCATION = "inv-graph-A";
const AT = "2026-10-15T07:00:00Z";
const forge = (id: string): NativeRef => ({ provider: "forge", type: "operation", id });
const furnace = (id: string): NativeRef => ({ provider: "furnace", type: "attempt", id, scope: "/work/root" });
const claude = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
const keyOf = (ref: NativeRef, within: ObservationScope = scope): string =>
  JSON.stringify([within.workspace, within.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);
/** Payload-bearing snapshot fields no graph model may echo. */
const SECRETS = ["payload-SECRET", "ev-SECRET", "basis-SECRET", "digest-SECRET"] as const;

interface Seen {
  ref: NativeRef;
  title?: string;
  statusText?: string;
  tone?: Presentation["statusTone"];
  invocationId?: string | null;
}
function observe(projection: ObservationProjection, item: Seen, within: ObservationScope = scope): void {
  const snapshot: NativeSnapshot = {
    source: item.ref,
    scope: within,
    capturedAt: AT,
    observedAt: AT,
    kind: "fixture.snapshot",
    node: { title: item.title ?? `node ${item.ref.id}`, type: "sdk-operation", statusText: item.statusText ?? "running", statusTone: item.tone ?? "active" },
    ...(item.invocationId === null ? {} : { trace: { invocationId: item.invocationId ?? INVOCATION } }),
    nativePayloadRef: SECRETS[0],
    evidenceRefs: [SECRETS[1]],
    subjectBasis: SECRETS[2],
    definitionDigest: SECRETS[3],
  };
  expect(projection.refresh(snapshot)).toBe("applied");
}
function link(projection: ObservationProjection, from: NativeRef, to: NativeRef, kind: RelationKind = "dependency", source = "declared-by-producer"): void {
  projection.relate({
    scope,
    from,
    to,
    kind,
    provenance:
      kind === "ownership"
        ? { source: from.provider, observedAt: AT, nativeConfirmationRef: `${from.provider}:owner:${to.id}` }
        : { source, observedAt: AT },
  });
}
const request = (overrides: Partial<GraphViewRequest> = {}): GraphViewRequest => ({
  scope,
  invocationId: INVOCATION,
  viewport: { offset: 0, limit: 100 },
  ...overrides,
});
const edgeKeys = (model: GraphViewModel): string[] => model.edges.map(edge => `${edge.from}>${edge.to}:${edge.class}`);

describe("A1 docs/10 Graph: explicit dependency arrows and cross-provider nodes", () => {
  // "**Graph:** navigable DAG-ish projection, explicit dependency arrows, fan-out collapsing, cross-provider nodes, nested workflows."
  it("draws each acyclic relation as a typed arrow carrying its relation class and provenance source, across providers", () => {
    const projection = new ObservationProjection();
    for (const ref of [forge("op-1"), furnace("att-1"), claude("sess-1")]) observe(projection, { ref });
    link(projection, forge("op-1"), furnace("att-1"), "dependency", "forge-plan");
    link(projection, furnace("att-1"), claude("sess-1"), "ownership");
    const model = buildGraphView(projection, request());
    expect(model.contract).toBe(GRAPH_VIEW_CONTRACT);
    expect(model.contract).toBe("workbench.graph-view/v1");
    expect(model.complete).toBe(true);
    expect(model.partials).toEqual([]);
    expect(model.references).toEqual([]);
    expect(model.supernodes).toEqual([]);
    expect(model.nodes.map(node => node.provider).sort()).toEqual(["claude-agent-sdk", "forge", "furnace"]);
    expect(model.edges).toEqual([
      { from: keyOf(forge("op-1")), to: keyOf(furnace("att-1")), class: "dependency", source: "forge-plan", confirmed: false, crossProvider: true },
      { from: keyOf(furnace("att-1")), to: keyOf(claude("sess-1")), class: "ownership", source: "furnace", confirmed: true, crossProvider: true },
    ]);
  });

  it("keeps nested ownership between same-provider nodes as a confirmed, non-cross-provider arrow", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: furnace("run") });
    observe(projection, { ref: furnace("child") });
    link(projection, furnace("run"), furnace("child"), "ownership");
    const [edge] = buildGraphView(projection, request()).edges;
    expect(edge).toMatchObject({ class: "ownership", confirmed: true, crossProvider: false });
  });

  it("echoes the revision basis of the projection it read", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("op-1") });
    observe(projection, { ref: forge("op-2") });
    link(projection, forge("op-1"), forge("op-2"));
    const model = buildGraphView(projection, request());
    expect(model.revisionBasis).toEqual({ revision: projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 1 }).revision, topologyRevision: projection.relationRevision() });
  });
});

describe("A2 docs/10 Graph: cycles and unknown dynamic edges are explicit references, never a fake acyclic plan (F1)", () => {
  // "Cycles/unknown dynamic edges represented explicitly as 'references' rather than rendered as a fake acyclic plan."
  it("returns every edge of a cycle, and a self edge, as a cycle reference and never drops or draws it as an arrow", () => {
    const projection = new ObservationProjection();
    for (const id of ["a", "b", "c", "d"]) observe(projection, { ref: forge(id) });
    link(projection, forge("a"), forge("b"));
    link(projection, forge("b"), forge("c"));
    link(projection, forge("c"), forge("a"));
    link(projection, forge("d"), forge("d"));
    link(projection, forge("a"), forge("d"));
    const model = buildGraphView(projection, request());
    const cycle = model.references.filter(reference => reference.reason === "cycle").map(reference => `${reference.from}>${reference.to}`).sort();
    expect(cycle).toEqual(
      [
        [forge("a"), forge("b")],
        [forge("b"), forge("c")],
        [forge("c"), forge("a")],
        [forge("d"), forge("d")],
      ]
        .map(([from, to]) => `${keyOf(from as NativeRef)}>${keyOf(to as NativeRef)}`)
        .sort(),
    );
    expect(edgeKeys(model)).toEqual([`${keyOf(forge("a"))}>${keyOf(forge("d"))}:dependency`]);
    expect(model.complete).toBe(true);
  });

  it("represents an edge to an endpoint outside the view as an explicit reference carrying class and source", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("a") });
    link(projection, forge("a"), forge("never-observed"), "causation", "dynamic-spawn");
    observe(projection, { ref: forge("elsewhere"), invocationId: "inv-other" });
    link(projection, forge("a"), forge("elsewhere"));
    const model = buildGraphView(projection, request());
    expect(model.edges).toEqual([]);
    expect(model.references.map(reference => [reference.reason, reference.to, reference.class, reference.source]).sort()).toEqual(
      [
        ["endpoint-not-in-view", keyOf(forge("elsewhere")), "dependency", "declared-by-producer"],
        ["endpoint-not-in-view", keyOf(forge("never-observed")), "causation", "dynamic-spawn"],
      ].sort(),
    );
  });
});

describe("A3 docs/10 Graph: a truncated relation page is a counted partial label, never complete (F2)", () => {
  // wb-6ze.27 RelationPage.truncated: "never upgrade a truncated page to complete".
  it("labels the node whose page stopped at the limit and marks the whole model incomplete", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("root") });
    for (const id of ["t1", "t2", "t3", "t4", "t5"]) {
      observe(projection, { ref: forge(id) });
      link(projection, forge("root"), forge(id));
    }
    const model = buildGraphView(projection, request({ caps: { relationLimit: 2 } }));
    expect(model.complete).toBe(false);
    expect(model.partials).toEqual([
      expect.objectContaining({ scope: "relations", subject: keyOf(forge("root")), shown: 2, label: expect.stringMatching(/2.*relations.*more exist/i) }),
    ]);
    expect(model.edges).toHaveLength(2);
  });

  it("stays complete when a page ends exactly at the limit with no further edge", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("root") });
    for (const id of ["t1", "t2"]) {
      observe(projection, { ref: forge(id) });
      link(projection, forge("root"), forge(id));
    }
    const model = buildGraphView(projection, request({ caps: { relationLimit: 2 } }));
    expect(model.complete).toBe(true);
    expect(model.partials).toEqual([]);
  });

  it("labels a window that holds fewer rows than the invocation has", () => {
    const projection = new ObservationProjection();
    for (const id of ["a", "b", "c"]) observe(projection, { ref: forge(id) });
    const model = buildGraphView(projection, request({ viewport: { offset: 0, limit: 2 } }));
    expect(model.nodes).toHaveLength(2);
    expect(model.complete).toBe(false);
    expect(model.partials).toEqual([expect.objectContaining({ scope: "window", shown: 2, offered: 3 })]);
  });
});

describe("A4 docs/10 Rendering pipeline: fan-out past the cap collapses to a counted aggregate shown first (F4)", () => {
  // "For large graphs show aggregate supernodes first."
  function fanOut(count: number): ObservationProjection {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("hub") });
    for (let index = 0; index < count; index++) {
      const target = index % 2 === 0 ? furnace(`t${index}`) : claude(`t${index}`);
      observe(projection, { ref: target, tone: index % 4 === 0 ? "failure" : "success" });
      link(projection, forge("hub"), target);
    }
    return projection;
  }

  it("replaces the individual arrows and the absorbed target nodes with one supernode that counts them", () => {
    const model = buildGraphView(fanOut(20), request({ caps: { maxFanOut: 8 } }));
    expect(model.edges).toEqual([]);
    expect(model.nodes.map(node => node.key)).toEqual([keyOf(forge("hub"))]);
    expect(model.supernodes).toHaveLength(1);
    const [supernode] = model.supernodes;
    expect(supernode).toMatchObject({ from: keyOf(forge("hub")), count: 20, lowerBound: false });
    expect(supernode?.providers).toEqual([
      { provider: "claude-agent-sdk", count: 10 },
      { provider: "furnace", count: 10 },
    ]);
    expect(supernode?.tones).toEqual([
      { tone: "failure", count: 5 },
      { tone: "success", count: 15 },
    ]);
    expect(supernode?.classes).toEqual(["dependency"]);
  });

  it("lists the supernodes before the nodes in the model", () => {
    const model = buildGraphView(fanOut(20), request({ caps: { maxFanOut: 8 } }));
    const order = Object.keys(model);
    expect(order.indexOf("supernodes")).toBeGreaterThanOrEqual(0);
    expect(order.indexOf("supernodes")).toBeLessThan(order.indexOf("nodes"));
    expect(order.indexOf("nodes")).toBeLessThan(order.indexOf("edges"));
  });

  it("keeps individual arrows at or below the cap, so the boundary is exact", () => {
    const atCap = buildGraphView(fanOut(8), request({ caps: { maxFanOut: 8 } }));
    expect(atCap.supernodes).toEqual([]);
    expect(atCap.edges).toHaveLength(8);
    const past = buildGraphView(fanOut(9), request({ caps: { maxFanOut: 8 } }));
    expect(past.edges).toEqual([]);
    expect(past.supernodes[0]?.count).toBe(9);
  });

  it("never hides a cycle edge inside a supernode, and keeps a collapsed target that has another visible edge", () => {
    const projection = fanOut(10);
    link(projection, furnace("t0"), forge("hub"));
    link(projection, claude("t1"), claude("t3"), "dependency", "other");
    const model = buildGraphView(projection, request({ caps: { maxFanOut: 4 } }));
    expect(model.references.map(reference => reference.reason)).toEqual(["cycle", "cycle"]);
    expect(model.supernodes[0]?.count).toBe(9);
    const kept = model.nodes.map(node => node.key);
    expect(kept).toContain(keyOf(furnace("t0")));
    expect(kept).toContain(keyOf(claude("t3")));
    expect(kept).not.toContain(keyOf(furnace("t2")));
  });

  it("marks a supernode count as a lower bound when its page was truncated", () => {
    const model = buildGraphView(fanOut(20), request({ caps: { maxFanOut: 4, relationLimit: 10 } }));
    expect(model.supernodes[0]).toMatchObject({ count: 10, lowerBound: true });
    expect(model.complete).toBe(false);
  });

  it("caps the shown nodes and says how many rows the window held", () => {
    const projection = new ObservationProjection();
    for (let index = 0; index < 10; index++) observe(projection, { ref: forge(`n${index}`) });
    const model = buildGraphView(projection, request({ caps: { maxNodes: 4 } }));
    expect(model.nodes).toHaveLength(4);
    expect(model.partials).toEqual([expect.objectContaining({ scope: "window", shown: 4, offered: 10 })]);
  });

  it("caps the references and counts the remainder", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("a") });
    for (let index = 0; index < 12; index++) link(projection, forge("a"), forge(`ghost${index}`));
    const model = buildGraphView(projection, request({ caps: { maxReferences: 5 } }));
    expect(model.references).toHaveLength(5);
    expect(model.partials).toEqual([expect.objectContaining({ scope: "references", shown: 5, offered: 12 })]);
    expect(model.complete).toBe(false);
  });
});

describe("A5 docs/10 Rendering pipeline: layout cached by topology revision, no full recompute (F3)", () => {
  // "Graph layout cached by topology revision" / "Re-layout only changed neighborhood or viewport, not the complete graph for every event."
  function chain(): ObservationProjection {
    const projection = new ObservationProjection();
    for (const id of ["a", "b", "c", "d"]) observe(projection, { ref: forge(id) });
    link(projection, forge("a"), forge("b"));
    link(projection, forge("b"), forge("c"));
    link(projection, forge("c"), forge("d"));
    return projection;
  }

  it("returns the identical model with zero relation reads while neither revision moved", () => {
    const projection = chain();
    const reads = vi.spyOn(projection, "relationsPage");
    const builder = createGraphViewBuilder(projection);
    const first = builder.build(request());
    expect(reads).toHaveBeenCalledTimes(4);
    reads.mockClear();
    const second = builder.build(request());
    expect(second).toBe(first);
    expect(reads).not.toHaveBeenCalled();
    expect(builder.lastBuild).toMatchObject({ cacheHit: true, relationReads: 0, recomputed: [] });
  });

  it("re-reads no relations when only a node status changed, and shows the new status", () => {
    const projection = chain();
    const builder = createGraphViewBuilder(projection);
    const first = builder.build(request());
    const reads = vi.spyOn(projection, "relationsPage");
    observe(projection, { ref: forge("b"), tone: "failure", statusText: "failed" });
    const second = builder.build(request());
    expect(reads).not.toHaveBeenCalled();
    expect(second).not.toBe(first);
    expect(second.edges).toEqual(first.edges);
    expect(second.nodes.find(node => node.key === keyOf(forge("b")))).toMatchObject({ tone: "failure", status: "failed" });
    expect(builder.lastBuild).toMatchObject({ cacheHit: false, relationReads: 0 });
  });

  it("recomputes only the changed neighborhood after a topology change and reuses the rest by identity", () => {
    const projection = chain();
    const builder = createGraphViewBuilder(projection);
    builder.build(request());
    observe(projection, { ref: forge("e") });
    link(projection, forge("d"), forge("e"));
    const model = builder.build(request());
    const report = builder.lastBuild;
    expect(report?.recomputed).toEqual([`out:${keyOf(forge("d"))}`, `out:${keyOf(forge("e"))}`].sort());
    expect([...(report?.reused ?? [])].sort()).toEqual([`out:${keyOf(forge("a"))}`, `out:${keyOf(forge("b"))}`, `out:${keyOf(forge("c"))}`].sort());
    expect(edgeKeys(model)).toContain(`${keyOf(forge("d"))}>${keyOf(forge("e"))}:dependency`);
    expect(edgeKeys(model)).toHaveLength(4);
  });

  it("keys the cache by request, so a different viewport never serves another viewport's model", () => {
    const projection = chain();
    const builder = createGraphViewBuilder(projection);
    const wide = builder.build(request());
    const narrow = builder.build(request({ viewport: { offset: 0, limit: 2 } }));
    expect(narrow).not.toBe(wide);
    expect(narrow.nodes).toHaveLength(2);
    expect(builder.build(request())).not.toBe(narrow);
  });

  it("reads each node's page once per build, in key order of the window", () => {
    const projection = chain();
    const reads = vi.spyOn(projection, "relationsPage");
    buildGraphView(projection, request());
    expect(reads.mock.calls.map(([input]) => input.from)).toEqual(["a", "b", "c", "d"].map(id => keyOf(forge(id))));
  });
});

describe("A6 docs/10 Graph: focus reads one node's neighborhood", () => {
  it("shows the focus, its successors and predecessors, with the focus's incoming and outgoing pages only", () => {
    const projection = new ObservationProjection();
    for (const id of ["p", "f", "s", "far"]) observe(projection, { ref: forge(id) });
    link(projection, forge("p"), forge("f"));
    link(projection, forge("f"), forge("s"));
    link(projection, forge("s"), forge("far"));
    const reads = vi.spyOn(projection, "relationsPage");
    const model = buildGraphView(projection, request({ focus: keyOf(forge("f")) }));
    expect(reads).toHaveBeenCalledTimes(2);
    expect(model.nodes.map(node => node.key).sort()).toEqual([keyOf(forge("f")), keyOf(forge("p")), keyOf(forge("s"))].sort());
    expect(edgeKeys(model).sort()).toEqual([`${keyOf(forge("f"))}>${keyOf(forge("s"))}:dependency`, `${keyOf(forge("p"))}>${keyOf(forge("f"))}:dependency`].sort());
  });

  it("refuses a focus that is not a row of the viewport", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("a") });
    expect(() => buildGraphView(projection, request({ focus: keyOf(forge("missing")) }))).toThrow(CapabilityError);
  });
});

describe("A7 docs/10 sanitization: every label is producer text and passes the shared sanitizers (F5)", () => {
  const hostile = [
    `\u009b[31mred\u009b[0m Bearer sk-ant-api03-SECRETTOKEN`,
    `token:\u0085Bearer\u0085sk-proj-SECRETTOKEN`,
    `password\u202e= hunter2-SECRET`,
    `api_key\u0085=\u0085SECRETVALUE`,
    `authBearer\ufeff sk-ant-GLUED`,
    `x\u2028Bearer\u2029sk-ant-SPLITLINE`,
    `Bea\u200brer sk-ant-INTOKEN`,
    `Bearer\u0085GLUEDSEP`,
    `x\ufeffBearer PREFIXED`,
    `Bea\u200brer INTOKENBEARER`,
  ];

  it("redacts and strips node titles, statuses, provenance sources and provider names", () => {
    const projection = new ObservationProjection();
    hostile.forEach((text, index) => {
      observe(projection, { ref: { provider: "forge", type: "operation", id: `h${index}` }, title: text, statusText: text });
    });
    observe(projection, { ref: forge("sink") });
    for (const [index, text] of hostile.entries()) link(projection, { provider: "forge", type: "operation", id: `h${index}` }, forge("sink"), "dependency", text);
    const model = buildGraphView(projection, request());
    const json = JSON.stringify(model);
    for (const secret of ["SECRETTOKEN", "hunter2", "SECRETVALUE", "GLUED", "SPLITLINE", "INTOKEN", "GLUEDSEP", "PREFIXED", "INTOKENBEARER"]) expect(json).not.toContain(secret);
    // eslint-disable-next-line no-control-regex
    expect(json).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069\u2028\u2029\ufeff\u200b]/);
    expect(model.nodes.find(node => node.key === keyOf({ provider: "forge", type: "operation", id: "h0" }))?.label).toContain("[REDACTED]");
  });

  it("bounds a long title and never returns an empty label for a node whose title sanitizes to nothing", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("long"), title: "x".repeat(3000) });
    observe(projection, { ref: forge("blank"), title: "\u200b\u202e \u0085" });
    const model = buildGraphView(projection, request());
    const long = model.nodes.find(node => node.key === keyOf(forge("long")));
    const blank = model.nodes.find(node => node.key === keyOf(forge("blank")));
    expect((long?.label.length ?? 0) <= 80).toBe(true);
    expect(blank?.label).toBe("forge/operation/blank");
  });

  it("never echoes payload references, evidence references, subject bases or definition digests", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("a") });
    observe(projection, { ref: forge("b") });
    link(projection, forge("a"), forge("b"));
    const json = JSON.stringify(buildGraphView(projection, request()));
    for (const secret of SECRETS) expect(json).not.toContain(secret);
  });

  it("never echoes the native confirmation reference, only whether the edge carries one", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: furnace("run") });
    observe(projection, { ref: furnace("child") });
    link(projection, furnace("run"), furnace("child"), "ownership");
    expect(JSON.stringify(buildGraphView(projection, request()))).not.toContain("owner:");
  });
});

describe("A8 request validation, isolation and immutability", () => {
  it("refuses a malformed request with a typed validation error", () => {
    const projection = new ObservationProjection();
    const bad: unknown[] = [
      { ...request(), scope: { workspace: "", principal: "x" } },
      { ...request(), invocationId: "" },
      { ...request(), viewport: { offset: -1, limit: 10 } },
      { ...request(), viewport: { offset: 0, limit: 101 } },
      { ...request(), viewport: { offset: 0, limit: 0 } },
      { ...request(), caps: { maxFanOut: 0 } },
      { ...request(), caps: { maxFanOut: 41 } },
      { ...request(), caps: { maxNodes: 101 } },
      { ...request(), caps: { relationLimit: 0.5 } },
      { ...request(), caps: { maxReferences: 201 } },
      null,
    ];
    for (const input of bad) {
      expect(() => buildGraphView(projection, input as GraphViewRequest)).toThrow(CapabilityError);
    }
  });

  it("reads nothing across a scope: a different principal sees no node and no edge", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("a") });
    observe(projection, { ref: forge("b") });
    link(projection, forge("a"), forge("b"));
    const model = buildGraphView(projection, request({ scope: { workspace: scope.workspace, principal: "intruder" } }));
    expect(model.nodes).toEqual([]);
    expect(model.edges).toEqual([]);
    expect(model.references).toEqual([]);
  });

  it("is deeply frozen, JSON-lossless and leaves the projection untouched", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: forge("a") });
    observe(projection, { ref: forge("b") });
    link(projection, forge("a"), forge("b"));
    const before = [projection.relationRevision(), projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 10 }).revision];
    const model = buildGraphView(projection, request());
    expect(Object.isFrozen(model)).toBe(true);
    expect(Object.isFrozen(model.nodes)).toBe(true);
    expect(Object.isFrozen(model.nodes[0])).toBe(true);
    expect(Object.isFrozen(model.edges[0])).toBe(true);
    expect(JSON.parse(JSON.stringify(model))).toEqual(model);
    expect([projection.relationRevision(), projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 10 }).revision]).toEqual(before);
  });

  it("is deterministic: the same projection yields byte-identical models from two builders", () => {
    const projection = new ObservationProjection();
    for (const id of ["z", "y", "x"]) observe(projection, { ref: forge(id) });
    link(projection, forge("z"), forge("y"));
    link(projection, forge("y"), forge("x"));
    expect(JSON.stringify(buildGraphView(projection, request()))).toBe(JSON.stringify(createGraphViewBuilder(projection).build(request())));
  });
});

describe("A9 purity: the module reads no clock, producer, SDK or UI", () => {
  const source = readFileSync(new URL("../src/workbench/graph-view.ts", import.meta.url), "utf8");
  it("imports only observation types, the capability error and the shared sanitizers", () => {
    const imports = [...source.matchAll(/^import[^;]*from\s+"([^"]+)";/gm)].map(match => match[1]);
    expect(imports.sort()).toEqual(["./capability-registry.js", "./observation.js", "./redaction.js"]);
  });
  it("calls no clock, timer, random or process API", () => {
    expect(source).not.toMatch(/Date\.now|new Date\(|Math\.random|setTimeout|setInterval|process\./);
  });
  it("uses the shared sanitizers for labels", () => {
    expect(source).toContain("redactWorkbenchText");
    expect(source).toContain("stripUnsafeText");
  });
});
