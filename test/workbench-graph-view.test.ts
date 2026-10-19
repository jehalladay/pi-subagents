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
import { sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";

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
  it("uses the shared sanitizers for labels: every display path shows the one helper's named label layout (a routing probe the real projection refuses as identity, typed, reaches the identity paths through the structural reader, wb-0br)", () => {
    // Respin U4 (gate-3 08:01Z): the source-text check this case held stayed green with the labels routed elsewhere and
    // pinned the forbidden local composition. The behaviour instead: on the real projection path every display string is
    // exactly what sanitizeWorkbenchText shows for the same producer text in its NAMED "label" layout (4 096-unit scan,
    // 80-unit bound), for text a local composition shows differently: a scheme glued to its token beside planted literal
    // markers (GATE-STEER1), an ignorable inside a key (the tie class), a C1 control (a space in the label layout, nothing
    // in "text"), a separator, runs of spaces (collapsed only by "label") and an over-long title.
    // wb-0br second-lander re-expression (known-conflicts entry 16): the real projection refuses four routing probes as
    // identity, typed, with nothing stored. Each of those pins that refusal (the absent rows, no routing marker in either
    // build) and reads its identity paths through the structural reader instead; the two it still admits keep the real
    // path, which the structural reader must read identically.
    const label = (raw: string): string => sanitizeWorkbenchText(raw.slice(0, 4_096), 80, "label");
    expect(ROUTING.map(unsafeIdentityAt)).toEqual(ROUTING_REFUSED_AT);
    for (const [index, raw] of ROUTING.entries()) {
      const text = textPaths(raw);
      const refusal = ROUTING_REFUSED_AT[index];
      const identity = refusal === undefined ? identityPaths(raw) : heldIdentityPaths(raw);
      if (text === "refused" || identity === "refused") expect.unreachable("the projection refused a routing probe");
      if (refusal === undefined) {
        expect(heldIdentityPaths(raw)).toEqual(identity);
      } else {
        const { rendered, ...refused } = refusedIdentityPaths(raw);
        expect(refused).toStrictEqual(refusedIdentityAt(refusal));
        expect(/ROUTE[A-Z]+/.test(rendered), `routing probe ${index} reached a build`).toBe(false);
      }
      const shown = label(raw);
      expect(shown).not.toBe("");
      expect(text).toEqual({
        label: [shown],
        status: [shown],
        "edge source": [shown, shown],
        "reference source": [shown],
        "supernode label": [`2 targets collapsed from ${shown} (fan-out above 1)`],
        "partial label": [`${shown}: showing 1 outgoing relations, more exist (page truncated)`],
      });
      expect(identity).toEqual({ provider: [shown, shown], "reference label": [label(`forge/operation/${raw}`)], "supernode provider": [shown] });
    }
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Respin U2/U3/U5 (gate-3 cmd_aed5234971f2, 08:01Z): the trunk separator corpus through the REAL ObservationProjection ->
// buildGraphView path on every display path. Between the two markers below sits test/workbench-sanitizer-corpus.test.ts
// lines 49-213 at 5516365 VERBATIM (that file's sha256 d52e78447c7fe5ba4bf88ea25670cf2b3cc28334aa1a6281fb83b2efe49f91f9;
// the same segment as lines 48-212 at e6f41be): copied, not imported, because importing a test module registers its
// suites in this file. One line has since moved past that copy: UNSAFE_DISPLAY (below) carries the wb-rqd format-control ranges
// the shared stripUnsafeText refuses (wb-19q member 29, wb-0br F2), as the corpus file's own copy now does; nothing else changed.
// ---------------------------------------------------------------------------------------------------------------------
// BEGIN verbatim corpus segment (test/workbench-sanitizer-corpus.test.ts:49-213 at 5516365)
const cp = (code: number): string => String.fromCodePoint(code);
const NUL = cp(0x00);
const BEL = cp(0x07);
const TAB = cp(0x09);
const LF = cp(0x0a);
const CR = cp(0x0d);
const ESC = cp(0x1b);
const NEL = cp(0x85);
const ZWSP = cp(0x200b);
const ZWJ = cp(0x200d);
const LRM = cp(0x200e);
const RLM = cp(0x200f);
const LS = cp(0x2028);
const RLO = cp(0x202e);
const WJ = cp(0x2060);
const BOM = cp(0xfeff);
const LONE_HIGH = cp(0xd800);

/** Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates, and
 * the format controls that defeat a reader (wb-rqd: the interlinear annotation controls and the Egyptian hieroglyph format
 * controls). */
const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secrets: readonly string[];
}

const IGNORABLES = [0xad, 0x2061, 0x180e, 0x34f, 0xfe0f, 0x200e, 0xe0041, 0x61c];

/** One code point or sequence of each gap class the helper may read as a separator or as glue. */
const CLASS_UNIT = { quiet: BOM, control: BEL, escape: `${ESC}[0m`, invisible: ZWSP } as const;
type GapClassName = keyof typeof CLASS_UNIT;
const GAP_CLASS_NAMES: readonly GapClassName[] = ["quiet", "control", "escape", "invisible"];
/** Every choice of at most two separator classes: a bearer credential forces a separator in at most two positions. */
const SEPARATOR_CHOICES: readonly (readonly GapClassName[])[] = [
  [],
  ...GAP_CLASS_NAMES.flatMap((first, index) => [[first], ...GAP_CLASS_NAMES.slice(index + 1).map(second => [first, second])]),
];
/**
 * A bearer credential exposed only when the chosen classes separate (the boundary before the scheme and the space after
 * it) while every other class sits glued inside the scheme, so no uniform choice for a class exposes the others.
 */
function classProbe(separators: readonly GapClassName[], index: number): Probe {
  const glue = GAP_CLASS_NAMES.filter(name => !separators.includes(name)).map(name => CLASS_UNIT[name]);
  const scheme = [..."Bearer"].map((letter, at) => `${letter}${glue[at] ?? ""}`).join("");
  const before = separators[0] === undefined ? "" : `x${CLASS_UNIT[separators[0]]}`;
  const after = separators[1] === undefined ? " " : CLASS_UNIT[separators[1]];
  return { id: `C${index} separators {${separators.join(",")}}`, raw: `${before}${scheme}${after}CLASSTOKEN${index}`, secrets: [`CLASSTOKEN${index}`] };
}

const CORPUS: readonly Probe[] = [
  // The seat probe corpus named by the gate (U4, /tmp/fw-g1r3-g1g1-scripts/redaction-probe.mjs).
  { id: "S1 bearer", raw: "Authorization: Bearer abc123", secrets: ["abc123"] },
  { id: "S2 bearer wrapped in SGR", raw: `Authorization: ${ESC}[1mBearer${ESC}[0m abc123`, secrets: ["abc123"] },
  { id: "S3 SGR after the scheme", raw: `Authorization: Bearer${ESC}[0m abc123`, secrets: ["abc123"] },
  { id: "S4 ZWSP inside the scheme", raw: `token: Bear${ZWSP}er abc123`, secrets: ["abc123"] },
  { id: "S5 json api_key", raw: '{"api_key":"xyz"}', secrets: ["xyz"] },
  { id: "S6 SGR around the keyword", raw: `${ESC}[33mapi_key${ESC}[0m=xyz`, secrets: ["xyz"] },
  // Split KEYWORD (gate U1/U3): an invisible inside the keyword itself.
  { id: "K1 BEL inside password", raw: `pass${BEL}word=hunter2`, secrets: ["hunter2"] },
  { id: "K2 RLO inside password", raw: `pass${RLO}word=hunter2`, secrets: ["hunter2"] },
  { id: "K3 BEL inside the scheme", raw: `Authorization: Bear${BEL}er abc123`, secrets: ["abc123"] },
  { id: "K4 ZWJ inside password", raw: `pass${ZWJ}word=hunter2`, secrets: ["hunter2"] },
  { id: "K5 WJ inside api_key", raw: `api${WJ}_key=xyz789`, secrets: ["xyz789"] },
  { id: "K6 BEL inside password, spaced colon", raw: `pass${BEL}word : SPACEDSECRET`, secrets: ["SPACEDSECRET"] },
  { id: "K7 ZWSP inside password, quoted value with a space", raw: `pass${ZWSP}word="two QUOTEDSECRET"`, secrets: ["QUOTEDSECRET"] },
  { id: "K8 ZWSP inside a JSON key", raw: `{"pass${ZWSP}word":"JSONSPLITSECRET"}`, secrets: ["JSONSPLITSECRET"] },
  // U5 glued-after-newline regressions of the first delivery (G1-G3, D1).
  { id: "G1 key after LF", raw: `first line${LF}sk-ant-api03-GLUEONE`, secrets: ["GLUEONE"] },
  { id: "G2 key after TAB", raw: `col1${TAB}ghp_GLUETWO`, secrets: ["GLUETWO"] },
  { id: "G3 key after CRLF", raw: `done${CR}${LF}github_pat_GLUETHREE`, secrets: ["GLUETHREE"] },
  { id: "D1 key after BEL", raw: `key${BEL}sk-ant-GLUEFOUR`, secrets: ["GLUEFOUR"] },
  // The three glue cases the wb-dc0.1 gate measured on d6446db (16:03Z F5).
  { id: "E1 token line then key", raw: `token: x${LF}sk-ant-api03-ENTRYONE`, secrets: ["ENTRYONE"] },
  { id: "E2 auth line then bearer", raw: `auth${LF}Bearer ENTRYTWO`, secrets: ["ENTRYTWO"] },
  { id: "E3 bearer TAB token", raw: `Bearer${TAB}ENTRYTHREE`, secrets: ["ENTRYTHREE"] },
  // 16:44Z separator policy (wb-752.2 gate F3).
  { id: "P1 BOM separator", raw: `Authorization: Bearer${BOM}SEPONE`, secrets: ["SEPONE"] },
  { id: "P2 NEL separator", raw: `Authorization: Bearer${NEL}SEPTWO`, secrets: ["SEPTWO"] },
  { id: "P3 NUL separator", raw: `Authorization: Bearer${NUL}SEPTHREE`, secrets: ["SEPTHREE"] },
  { id: "P4 line separator", raw: `token: x${LS}sk-ant-api03-SEPFOUR`, secrets: ["SEPFOUR"] },
  // U6: one input needing both readings at once; no count tie can pick one.
  { id: "U6 separator and glue together", raw: `x${BEL}sk-ant-TIESECRETAAAA pass${BEL}word=hunter2`, secrets: ["TIESECRETAAAA", "hunter2"] },
  // U7: default-ignorables inside a credential.
  ...IGNORABLES.map((code, index) => ({
    id: `I${index + 1} U+${code.toString(16).toUpperCase()} inside a key`,
    raw: `sk-ant-aaaa${cp(code)}TAILIGNORABLE${index + 1}`,
    secrets: [`TAILIGNORABLE${index + 1}`],
  })),
  // Prefix splits (wb-752.4 control-reply and wb-69g.5 execute reply probes).
  { id: "Z1 ZWSP after the prefix", raw: `sk-ant-${ZWSP}ZEROWIDTHSECRET`, secrets: ["ZEROWIDTHSECRET"] },
  { id: "Z2 LRM inside ghp_", raw: `gh${LRM}p_PREFIXSPLITSECRET`, secrets: ["PREFIXSPLITSECRET"] },
  { id: "Z3 RLM inside sk-ant-", raw: `sk-${RLM}ant-RLMSECRET`, secrets: ["RLMSECRET"] },
  { id: "Z4 BOM inside github_pat_", raw: `github${BOM}_pat_BOMSECRET`, secrets: ["BOMSECRET"] },
  { id: "Z5 lone surrogate inside a key", raw: `sk-ant-aaaa${LONE_HIGH}SURROGATETAIL`, secrets: ["SURROGATETAIL"] },
  // A separator and a glued keyword in one input.
  { id: "M1 LF then BEL inside the scheme", raw: `x${LF}Bear${BEL}er MIXEDSECRET`, secrets: ["MIXEDSECRET"] },
  // A zero-width space as a separator: base redacted it, deleting it first glues the key (16:44Z: it can split a token).
  { id: "Y1 ZWSP before a key", raw: `key${ZWSP}sk-ant-ZWSEPSECRET`, secrets: ["ZWSEPSECRET"] },
  // Position-aware (17:32Z): the SAME unit separates two tokens and sits glued inside a keyword, prefix, key or token, so no
  // uniform reading of its class exposes the credential.
  { id: "X1 ZWSP before and inside the scheme", raw: `x${ZWSP}Bea${ZWSP}rer MIXONESECRET`, secrets: ["MIXONESECRET"] },
  { id: "X2 ZWSP before and inside ghp_", raw: `see${ZWSP}gh${ZWSP}p_MIXTWOSECRET`, secrets: ["MIXTWOSECRET"] },
  { id: "X3 BOM inside the scheme and as its space", raw: `Authorization: Bea${BOM}rer${BOM}MIXTHREESECRET`, secrets: ["MIXTHREESECRET"] },
  { id: "X4 BEL before, inside and after the scheme", raw: `x${BEL}Bear${BEL}er${BEL}MIXFOURSECRET`, secrets: ["MIXFOURSECRET"] },
  { id: "X5 RLO before the scheme and inside its token", raw: `x${RLO}Bearer SEC${RLO}MIXFIVESECRET`, secrets: ["MIXFIVESECRET"] },
  { id: "X6 ZWSP ends a key token and splits the next key name", raw: `ghp_abc${ZWSP}pass${ZWSP}word=MIXSIXSECRET`, secrets: ["MIXSIXSECRET"] },
  { id: "X7 SGR before and inside sk-ant-", raw: `key${ESC}[0msk-${ESC}[0mant-MIXSEVENSECRET`, secrets: ["MIXSEVENSECRET"] },
  { id: "X8 NUL before and inside the scheme", raw: `x${NUL}Ba${NUL}sic MIXEIGHTSECRET`, secrets: ["MIXEIGHTSECRET"] },
  // Class-level probes: each choice of at most two separator classes, every other class glued inside the scheme.
  ...SEPARATOR_CHOICES.map(classProbe),
];

/**
 * The 17:32Z acceptance set. Units: every code point the wb-752.2 respin gate measured as the ONLY separator before
 * ghp_/sk-ant-/Bearer/Basic (G10 residual, G11 gains), the F2 correction (U+0085 and NUL before a \b prefix), the wb-0kg.6
 * known-residual code points (U+2061, U+2064, U+206A, U+115F, U+FFA0, U+E0020, U+1D173), the site-24 and timeline
 * real-path classes (U+0080, U+009F, U+202A, U+202C, U+2069 beside the rest), further default-ignorables, the bidi marks
 * and an SGR sequence. Positions: between two tokens (before each \b-anchored start, and as the space after a scheme),
 * inside a keyword, prefix, key or token (the G11 keyword splits and the U+202E in-token regression), and the
 * position-aware mixes.
 */
const ACCEPTANCE_CODES = [
  0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
  0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
  0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0,
];
const ACCEPTANCE_UNITS: readonly (readonly [name: string, unit: string])[] = [
  ...ACCEPTANCE_CODES.map(code => [`U+${code.toString(16).toUpperCase().padStart(4, "0")}`, cp(code)] as const),
  ["SGR", `${ESC}[0m`],
];
type Shape = (unit: string, secret: string) => string;
/** A unit here sits between two tokens: a separator reading exposes the credential. */
const BETWEEN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["before ghp_", (unit, secret) => `see${unit}ghp_${secret}`],
  ["before sk-ant-", (unit, secret) => `key${unit}sk-ant-${secret}`],
  ["before Bearer", (unit, secret) => `x${unit}Bearer ${secret}`],
  ["before Basic", (unit, secret) => `x${unit}Basic ${secret}`],
  ["as the space after Bearer", (unit, secret) => `Authorization: Bearer${unit}${secret}`],
  ["as the space after Basic", (unit, secret) => `Authorization: Basic${unit}${secret}`],
];
/** A unit here sits inside a keyword, prefix, key or token (and, in the mixes, between two tokens as well). */
const WITHIN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["inside Bearer", (unit, secret) => `Authorization: Bea${unit}rer ${secret}`],
  ["inside ghp_", (unit, secret) => `see gh${unit}p_${secret}`],
  ["inside a Bearer token", (unit, secret) => `Bearer SEC${unit}${secret}`],
  ["inside password", (unit, secret) => `pass${unit}word=${secret}`],
  ["before and inside Bearer", (unit, secret) => `x${unit}Bea${unit}rer ${secret}`],
  ["before and inside ghp_", (unit, secret) => `see${unit}gh${unit}p_${secret}`],
  ["inside and after Bearer", (unit, secret) => `Authorization: Bea${unit}rer${unit}${secret}`],
  ["before, inside and after Bearer", (unit, secret) => `x${unit}Bea${unit}rer${unit}${secret}`],
  ["after a key token and inside the next key name", (unit, secret) => `ghp_abc${unit}pass${unit}word=${secret}`],
];
/**
 * Whitespace always separates (12:10Z), so a whitespace unit inside a keyword ends it as it does for the plain redactor:
 * the helper's whitespace units (TAB, LF, VT, FF, CR, NEL, LS, PS), not JavaScript's \s, which holds the BOM and lacks NEL.
 */
const WHITESPACE_UNITS: ReadonlySet<string> = new Set([0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x85, 0x2028, 0x2029].map(cp));
const isWhitespace = (unit: string): boolean => WHITESPACE_UNITS.has(unit);
const ACCEPTANCE: readonly Probe[] = ACCEPTANCE_UNITS.flatMap(([name, unit]) =>
  [...BETWEEN_TOKENS, ...(isWhitespace(unit) ? [] : WITHIN_TOKENS)].map(([position, shape]) => {
    const secret = `ACCEPT${name.replace(/[^A-Z0-9]/g, "")}${position.replace(/[^a-z]/g, "").slice(0, 24)}`;
    return { id: `${name} ${position}`, raw: shape(unit, secret), secrets: [secret] };
  }),
);
// END verbatim corpus segment

/** The gate's own probes (gate-3 verdict 08:01Z). GATE-STEER1 plants literal markers so a sanitizer that keeps whichever
 * reading redacted more would keep the one gluing the scheme to its token: producer text must never pick the reading.
 * GATE-TIE1 and GATE-MIX1 are the tie and the mixed classes. */
const GATE_PROBES: readonly Probe[] = [
  { id: "GATE-STEER1 count-steered deletion reading", raw: `Bearer${ZWSP}STEERSECRETONE [REDAC${ZWSP}TED] [REDAC${ZWSP}TED]`, secrets: ["STEERSECRETONE"] },
  { id: "GATE-TIE1 ZWSP inside an sk-ant- key (tie)", raw: `sk-ant-aaaa${ZWSP}TIETAILONE`, secrets: ["TIETAILONE"] },
  { id: "GATE-MIX1 tie key plus in-token scheme", raw: `sk-ant-AAA${ZWSP}MIXTAILONE x${ZWSP}Bea${ZWSP}rer MIXBEARERONE`, secrets: ["MIXTAILONE", "MIXBEARERONE"] },
];
/** A9 case 3's routing probes: text that a composition other than the one helper's label layout shows differently. */
const ROUTING: readonly string[] = [
  `Bearer${ZWSP}ROUTESTEER [REDAC${ZWSP}TED] [REDAC${ZWSP}TED]`,
  `sk-ant-aaaa${cp(0xad)}ROUTETIE`,
  `x${cp(0x9b)}Bearer ROUTECONTROL`,
  `Authorization: Bearer${NEL}ROUTESEPARATOR`,
  // Runs of spaces: the label layout collapses them, the terminal layout keeps them.
  "spaced  out   label  ROUTESPACES",
  // 220 bytes: past the 80-unit label bound, inside the projection's 256-byte identity bound.
  "long title ".repeat(20),
];
/** Each table's size and how many of its shapes the real projection admits (it refuses only C0 controls and DEL). */
const TABLES = [
  { name: "CORPUS", probes: CORPUS, shapes: 60, admitted: 30 },
  { name: "ACCEPTANCE", probes: ACCEPTANCE, shapes: 696, admitted: 606 },
  { name: "GATE", probes: GATE_PROBES, shapes: 3, admitted: 3 },
] as const;

/** The projection's refusal rule (observation.ts validText): a C0 control or DEL anywhere in the text. */
const carriesC0OrDel = (raw: string): boolean =>
  [...raw].some(unit => {
    const code = unit.codePointAt(0) ?? 0;
    return code <= 0x1f || code === 0x7f;
  });
function snapshotOf(ref: NativeRef, title: string, statusText: string): NativeSnapshot {
  return { source: ref, scope, capturedAt: AT, observedAt: AT, kind: "fixture.snapshot", node: { title, type: "sdk-operation", statusText, statusTone: "active" }, trace: { invocationId: INVOCATION } };
}
/** The first snapshot carrying the probe: true when the projection applied it, false when it refused it (a throw). */
function admit(projection: ObservationProjection, ref: NativeRef, title: string, statusText: string): boolean {
  let result: string;
  try {
    result = projection.refresh(snapshotOf(ref, title, statusText));
  } catch {
    return false;
  }
  expect(result).toBe("applied");
  return true;
}
const providerRef = (raw: string, id: string): NativeRef => ({ provider: raw, type: "operation", id });
const idRef = (raw: string): NativeRef => ({ provider: "forge", type: "operation", id: raw });

/** The text display paths and how many strings each renders: the hostile node's label and status, the provenance source
 * of its two arrows and of its reference, the supernode its fan-out collapses to, the partial label of its truncated page. */
const TEXT_PATHS = [
  ["label", 1],
  ["status", 1],
  ["edge source", 2],
  ["reference source", 1],
  ["supernode label", 1],
  ["partial label", 1],
] as const;
type TextPath = (typeof TEXT_PATHS)[number][0];
/** The identity display paths: two nodes whose provider is the probe, one whose id is (its title sanitizes to nothing, so the
 * label falls back to the reference form provider/type/id), and the provider tally of the supernode their fan-out makes. */
const IDENTITY_PATHS = [
  ["provider", 2],
  ["reference label", 1],
  ["supernode provider", 1],
] as const;
type IdentityPath = (typeof IDENTITY_PATHS)[number][0];

/** The probe as title, status and provenance source through the real projection, read by three real builds: plain, fan-out
 * collapsed (maxFanOut 1) and page truncated (relationLimit 1). */
function textPaths(raw: string): Record<TextPath, string[]> | "refused" {
  const projection = new ObservationProjection();
  if (!admit(projection, forge("hostile"), raw, raw)) return "refused";
  observe(projection, { ref: forge("t1"), title: "target one" });
  observe(projection, { ref: forge("t2"), title: "target two" });
  for (const target of [forge("t1"), forge("t2"), forge("ghost")]) link(projection, forge("hostile"), target, "dependency", raw);
  const hostile = keyOf(forge("hostile"));
  const plain = buildGraphView(projection, request());
  const collapsed = buildGraphView(projection, request({ caps: { maxFanOut: 1 } }));
  const truncated = buildGraphView(projection, request({ caps: { relationLimit: 1 } }));
  const nodes = plain.nodes.filter(node => node.key === hostile);
  return {
    label: nodes.map(node => node.label),
    status: nodes.map(node => node.status),
    "edge source": plain.edges.filter(edge => edge.from === hostile).map(edge => edge.source),
    "reference source": plain.references.filter(entry => entry.from === hostile).map(entry => entry.source),
    "supernode label": collapsed.supernodes.filter(entry => entry.from === hostile).map(entry => entry.label),
    "partial label": truncated.partials.filter(entry => entry.scope === "relations" && entry.subject === hostile).map(entry => entry.label),
  };
}
/** The probe as nativeRef provider and id through the real projection, read by a plain and a fan-out collapsed build. */
function identityPaths(raw: string): Record<IdentityPath, string[]> | "refused" {
  const projection = new ObservationProjection();
  if (!admit(projection, providerRef(raw, "p"), "provider node", "running")) return "refused";
  observe(projection, { ref: providerRef(raw, "q"), title: "provider node too" });
  observe(projection, { ref: idRef(raw), title: ZWSP });
  observe(projection, { ref: forge("hub"), title: "hub" });
  for (const id of ["p", "q"]) link(projection, forge("hub"), providerRef(raw, id));
  const plain = buildGraphView(projection, request());
  const collapsed = buildGraphView(projection, request({ caps: { maxFanOut: 1 } }));
  const providers = new Set([keyOf(providerRef(raw, "p")), keyOf(providerRef(raw, "q"))]);
  return {
    provider: plain.nodes.filter(node => providers.has(node.key)).map(node => node.provider),
    "reference label": plain.nodes.filter(node => node.key === keyOf(idRef(raw))).map(node => node.label),
    "supernode provider": collapsed.supernodes.filter(entry => entry.from === keyOf(forge("hub"))).flatMap(entry => entry.providers.map(row => row.provider)),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// wb-0br second-lander re-expression (known-conflicts entry 16, owner 2026-10-16T20:51Z; gate-3 row 378 U1). The real
// projection's typed identity admission refuses a nativeRef provider, type, id or scope carrying an unsafe unit, so it
// stores nothing of identityPaths' fixture for such a probe and the five identity rows no longer reach their display
// paths through it. Each of those rows now pins, through the REAL projection, the typed refusal (closed-vocabulary rows
// naming the first refused unit), the absent rows and the secret's absence; then the structural reader feeds the fixture
// as the projection held it before the widening to the REAL builder, where every presence and redaction assertion of the
// original row is unchanged. A probe the real projection still admits as identity keeps its real path, and there the
// structural reader must read the same strings.
// ---------------------------------------------------------------------------------------------------------------------

/** The first unit the projection's identity admission refuses (observation.ts, wb-0br), as "U+XXXX": it refuses every
 * unit a display string must never carry (UNSAFE_DISPLAY above), and no probe in these tables carries any other unit it
 * refuses. */
function unsafeIdentityAt(raw: string): string | undefined {
  const code = UNSAFE_DISPLAY.exec(raw)?.[0].codePointAt(0);
  return code === undefined ? undefined : `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
}
/** The first unit the real projection's typed identity refusal names for each routing probe, read off the probes: the two
 * without one (runs of spaces, an over-long title) are still admitted as identity. */
const ROUTING_REFUSED_AT: readonly (string | undefined)[] = ["U+200B", "U+00AD", "U+009B", "U+0085", undefined, undefined];
/** Shapes of each table carrying no unit the identity admission refuses: only these still reach the real identity path. */
const IDENTITY_ADMITTED: Readonly<Record<(typeof TABLES)[number]["name"], number>> = { CORPUS: 2, ACCEPTANCE: 0, GATE: 0 };

/** One snapshot carrying the probe as its provider, through the REAL projection: true when the projection applied it;
 * otherwise its typed identity admission refused it with exactly one row naming the first refused unit, and it stored
 * nothing (wb-0br). */
function admittedAsIdentity(raw: string): boolean {
  const projection = new ObservationProjection();
  const outcome = projection.refresh(snapshotOf(providerRef(raw, "p"), "provider node", "running"));
  const codePoint = unsafeIdentityAt(raw);
  if (codePoint === undefined) {
    expect(outcome).toBe("applied");
    return true;
  }
  expect({ outcome, refusals: projection.identityRefusals({ scope, limit: 10 }), stats: projection.stats() }).toStrictEqual({
    outcome: "refused",
    refusals: { refusals: [{ path: "refresh", ref: "source", field: "provider", codePoint, reason: "unsafe-identity" }], total: 1, truncated: false },
    stats: { nodes: 0, events: 0, edges: 0 },
  });
  return false;
}

/** The three identity display paths identityPaths reads, from a plain and a fan-out collapsed build of the probe's fixture. */
function identityShown(raw: string, plain: GraphViewModel, collapsed: GraphViewModel): Record<IdentityPath, string[]> {
  const providers = new Set([keyOf(providerRef(raw, "p")), keyOf(providerRef(raw, "q"))]);
  return {
    provider: plain.nodes.filter(node => providers.has(node.key)).map(node => node.provider),
    "reference label": plain.nodes.filter(node => node.key === keyOf(idRef(raw))).map(node => node.label),
    "supernode provider": collapsed.supernodes.filter(entry => entry.from === keyOf(forge("hub"))).flatMap(entry => entry.providers.map(row => row.provider)),
  };
}

/** identityPaths' fixture through the REAL projection for a probe its identity admission refuses: the same three snapshots
 * carrying the probe, then the hub and the two hub relations, in the same order. Every admission carrying the probe comes
 * back a typed refusal and stores nothing, so both builds hold the hub alone. `rendered` is both builds as JSON, read for
 * the secret's absence only. */
function refusedIdentityPaths(raw: string) {
  const projection = new ObservationProjection();
  const outcomes = [
    projection.refresh(snapshotOf(providerRef(raw, "p"), "provider node", "running")),
    projection.refresh(snapshotOf(providerRef(raw, "q"), "provider node too", "running")),
    projection.refresh(snapshotOf(idRef(raw), ZWSP, "running")),
  ];
  observe(projection, { ref: forge("hub"), title: "hub" });
  for (const id of ["p", "q"]) link(projection, forge("hub"), providerRef(raw, id));
  const plain = buildGraphView(projection, request());
  const collapsed = buildGraphView(projection, request({ caps: { maxFanOut: 1 } }));
  return {
    outcomes,
    refusals: projection.identityRefusals({ scope, limit: 10 }),
    stats: projection.stats(),
    built: {
      nodes: plain.nodes.map(node => node.label),
      edges: plain.edges.length,
      references: plain.references.length,
      supernodes: collapsed.supernodes.length,
      complete: plain.complete && collapsed.complete,
    },
    shown: identityShown(raw, plain, collapsed),
    rendered: JSON.stringify([plain, collapsed]),
  };
}
/** The one outcome refusedIdentityPaths may have for a probe whose first refused unit is `codePoint`: all three snapshots
 * refused, five rows (each provider node's provider, the reference node's id, the `to` end's provider of both hub
 * relations), only the hub stored and drawn (so the absent rows are never vacuous), every identity display path empty. */
function refusedIdentityAt(codePoint: string) {
  const row = (path: string, ref: string, field: string) => ({ path, ref, field, codePoint, reason: "unsafe-identity" });
  return {
    outcomes: ["refused", "refused", "refused"],
    refusals: {
      refusals: [row("refresh", "source", "provider"), row("refresh", "source", "provider"), row("refresh", "source", "id"), row("relate", "to", "provider"), row("relate", "to", "provider")],
      total: 5,
      truncated: false,
    },
    stats: { nodes: 1, events: 0, edges: 0 },
    built: { nodes: ["hub"], edges: 0, references: 0, supernodes: 0, complete: true },
    shown: { provider: [], "reference label": [], "supernode provider": [] },
  };
}

/** The builder's declared reader input (graph-view.ts GraphReader). */
type Reader = Parameters<typeof buildGraphView>[0];
/** The placeholder the structural twin carries where identityPaths' fixture carries the probe. */
const TWIN = "identity-twin";
/** identityPaths' fixture as the real projection held it before its typed identity admission (wb-0br), as a plain reader.
 * The fixture's clean twin (TWIN in place of the probe) goes through a real projection; the reader serves that
 * projection's own window rows and relation pages with the probe put back into every provider, id and key, so the REAL
 * builder and every display path meet the hostile identity where the projection stored it before the widening. */
function heldReader(raw: string): Reader {
  const twin = new ObservationProjection();
  if (!admit(twin, providerRef(TWIN, "p"), "provider node", "running")) expect.unreachable("the projection refused the clean twin");
  observe(twin, { ref: providerRef(TWIN, "q"), title: "provider node too" });
  observe(twin, { ref: idRef(TWIN), title: ZWSP });
  observe(twin, { ref: forge("hub"), title: "hub" });
  for (const id of ["p", "q"]) link(twin, forge("hub"), providerRef(TWIN, id));
  const held = (ref: NativeRef): NativeRef => ({ ...ref, provider: ref.provider === TWIN ? raw : ref.provider, id: ref.id === TWIN ? raw : ref.id });
  const heldKeys = new Map(twin.window({ scope, invocationId: INVOCATION, offset: 0, limit: 100 }).nodes.map(node => [node.key, keyOf(held(node.nativeRef))]));
  const twinKeys = new Map([...heldKeys].map(([key, heldKey]) => [heldKey, key]));
  const toHeld = (key: string): string => heldKeys.get(key) ?? key;
  const toTwin = (key: string): string => twinKeys.get(key) ?? key;
  return {
    window: input => {
      const page = twin.window(input);
      return { ...page, nodes: page.nodes.map(node => ({ ...node, key: toHeld(node.key), nativeRef: held(node.nativeRef) })) };
    },
    relationsPage: input => {
      const page = twin.relationsPage({
        ...input,
        ...(input.from === undefined ? {} : { from: toTwin(input.from) }),
        ...(input.to === undefined ? {} : { to: toTwin(input.to) }),
      });
      return { ...page, relations: page.relations.map(relation => ({ ...relation, from: toHeld(relation.from), to: toHeld(relation.to) })) };
    },
    relationRevision: () => twin.relationRevision(),
  };
}
/** identityPaths through the structural reader: the probe as nativeRef provider and id where the projection stored it before
 * wb-0br, read by a plain and a fan-out collapsed build of the REAL builder. Before wb-0br an identity part met only the
 * projection's text rule (carriesC0OrDel; every probe here is within its 256-byte identity bound), so a probe carrying a
 * C0 control or DEL is refused here as it was there. */
function heldIdentityPaths(raw: string): Record<IdentityPath, string[]> | "refused" {
  if (carriesC0OrDel(raw)) return "refused";
  const reader = heldReader(raw);
  return identityShown(raw, buildGraphView(reader, request()), buildGraphView(reader, request({ caps: { maxFanOut: 1 } })));
}

interface Finding {
  readonly id: string;
  readonly path: string;
  readonly problem: string;
}
/** Every admitted probe on every path: the strings are all there, each shows the redaction marker, and none carries a secret
 * or an unsafe code point. Only probe ids, path names and fixture secret names are reported, never the rendered text. */
function judge<P extends string>(
  probes: readonly Probe[],
  drive: (raw: string) => Record<P, string[]> | "refused",
  paths: readonly (readonly [P, number])[],
): { admitted: number; findings: Finding[] } {
  let admitted = 0;
  const findings: Finding[] = [];
  for (const probe of probes) {
    const shown = drive(probe.raw);
    if (shown === "refused") continue;
    admitted++;
    for (const [path, count] of paths) {
      const texts = shown[path];
      if (texts.length !== count) findings.push({ id: probe.id, path, problem: `rendered ${texts.length} of ${count} strings` });
      for (const text of texts) {
        for (const secret of probe.secrets) if (text.includes(secret)) findings.push({ id: probe.id, path, problem: `leaked ${secret}` });
        if (UNSAFE_DISPLAY.test(text)) findings.push({ id: probe.id, path, problem: "kept an unsafe code point" });
        if (!text.includes("[REDACTED]")) findings.push({ id: probe.id, path, problem: "shows no [REDACTED] marker" });
      }
    }
  }
  return { admitted, findings };
}
const failing = (findings: readonly Finding[]): number => new Set(findings.map(finding => finding.id)).size;

describe("A10 the trunk separator corpus through the real ObservationProjection -> buildGraphView path, every display path (respin U2/U3/U5)", () => {
  // Bead falsifier F5: "hostile node label must pass redaction". 16:43Z: "DELETION NEVER PRECEDES REDACTION". 21:00Z F6: every
  // display path calls sanitizeWorkbenchText with a NAMED layout (here "label").
  it("keeps the tables live: 60 CORPUS, 696 ACCEPTANCE and 3 gate shapes, distinct ids, every secret inside its raw text", () => {
    expect(TABLES.map(table => [table.name, table.probes.length])).toEqual([
      ["CORPUS", 60],
      ["ACCEPTANCE", 696],
      ["GATE", 3],
    ]);
    for (const table of TABLES) {
      expect(table.probes).toHaveLength(table.shapes);
      expect(new Set(table.probes.map(probe => probe.id)).size).toBe(table.shapes);
      for (const probe of table.probes) {
        expect(probe.secrets.length).toBeGreaterThan(0);
        for (const secret of probe.secrets) expect(probe.raw.includes(secret)).toBe(true);
      }
    }
  });

  it("admits through the real projection exactly the shapes without a C0 control or DEL as text (30 of 60, 606 of 696, 3 of 3), and as identity only the shapes without a unit its identity admission refuses (2 of 60, 0 of 696, 0 of 3), refusing every other one typed with nothing stored (wb-0br)", () => {
    // wb-0br second-lander re-expression (known-conflicts entry 16): an identity part no longer meets the text rule alone.
    // Every shape carrying a unit the identity admission refuses (a C0 control or DEL included, now a typed refusal instead of
    // a throw) is refused with exactly one row naming its first such unit and nothing stored. The shapes the projection held
    // as identity before wb-0br are the text-admitted ones, which the identity rows read through the structural reader.
    for (const table of TABLES) {
      const asText = table.probes.filter(probe => admit(new ObservationProjection(), forge("hostile"), probe.raw, probe.raw));
      const asIdentity = table.probes.filter(probe => admittedAsIdentity(probe.raw));
      expect([table.name, asText.length, asIdentity.length]).toEqual([table.name, table.admitted, IDENTITY_ADMITTED[table.name]]);
      for (const probe of table.probes) expect(asText.includes(probe), probe.id).toBe(!carriesC0OrDel(probe.raw));
    }
  });

  for (const table of TABLES) {
    it(`${table.name}: every admitted shape is redacted and stripped on the six text display paths (label, status, edge and reference source, supernode and partial labels)`, () => {
      const { admitted, findings } = judge(table.probes, textPaths, TEXT_PATHS);
      expect(admitted).toBe(table.admitted);
      expect(findings, `${failing(findings)} of ${admitted} admitted ${table.name} shapes fail a text display path`).toEqual([]);
    });
    it(`${table.name}: every admitted shape is redacted and stripped on the three identity display paths (provider, reference label, supernode provider), through the structural reader where the real projection now refuses it as identity, typed, with no row and no secret (wb-0br)`, () => {
      // wb-0br second-lander re-expression (known-conflicts entry 16): every shape carrying a unit the identity admission
      // refuses is refused typed by the real projection (five rows naming that unit, only the hub stored and drawn, every
      // identity path empty, no secret in either build); a shape it still admits keeps the real path, where the structural
      // reader must read the same strings; and every shape the projection held before wb-0br reaches the three paths through
      // the structural reader, judged exactly as before.
      const real: Probe[] = [];
      for (const probe of table.probes) {
        const codePoint = unsafeIdentityAt(probe.raw);
        if (codePoint === undefined) {
          real.push(probe);
          continue;
        }
        const { rendered, ...refused } = refusedIdentityPaths(probe.raw);
        expect(refused, probe.id).toStrictEqual(refusedIdentityAt(codePoint));
        for (const secret of probe.secrets) expect(rendered.includes(secret), `${probe.id} leaked ${secret}`).toBe(false);
      }
      expect(real).toHaveLength(IDENTITY_ADMITTED[table.name]);
      const viaReal = judge(real, identityPaths, IDENTITY_PATHS);
      expect(viaReal.admitted).toBe(real.length);
      expect(viaReal.findings).toEqual([]);
      for (const probe of real) expect(heldIdentityPaths(probe.raw), probe.id).toEqual(identityPaths(probe.raw));
      const { admitted, findings } = judge(table.probes, heldIdentityPaths, IDENTITY_PATHS);
      expect(admitted).toBe(table.admitted);
      expect(findings, `${failing(findings)} of ${admitted} admitted ${table.name} shapes fail an identity display path`).toEqual([]);
    });
  }

  it("scans at most 4 096 units of producer text: text past the scan is never shown, even where the projection admits it", () => {
    // A payload bound past the scan admits the title; the label shows what the scanned prefix shows (here nothing, so it
    // falls back to the reference form) and the status shows nothing.
    const projection = new ObservationProjection({ maxPayloadBytes: 8_192 });
    observe(projection, { ref: forge("late"), title: `${" ".repeat(4_096)}LATETITLE`, statusText: `${" ".repeat(4_096)}LATESTATUS` });
    const [node] = buildGraphView(projection, request()).nodes;
    expect(node?.label).toBe("forge/operation/late");
    expect(node?.status).toBe("");
  });

  it("never leaves half of a surrogate pair where the 80-unit bound cuts one (the post-pass runs after the one helper)", () => {
    const raw = `${"x".repeat(59)}${cp(0x1f600)}${"y".repeat(40)}`;
    const text = textPaths(raw);
    const identity = identityPaths(raw);
    if (text === "refused" || identity === "refused") expect.unreachable("the projection refused the surrogate probe");
    expect(text.label).toEqual([`${"x".repeat(59)} [truncated]`]);
    const rendered = [...Object.values(text).flat(), ...Object.values(identity).flat()];
    expect(rendered).toHaveLength(11);
    for (const shown of rendered) expect(UNSAFE_DISPLAY.test(shown), shown).toBe(false);
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// wb-19q member 29 (wb-0br F2): the display oracle above must carry every unit the shared stripUnsafeText refuses, or a
// renderer keeping one of the wb-rqd format controls would pass every oracle check in this file unseen. The 19 units are
// the ones redaction.ts added for wb-rqd (landed 845de98): the interlinear annotation anchor, separator and terminator
// (U+FFF9-U+FFFB) and the Egyptian hieroglyph format controls (U+13430-U+1343F). The three neighbours are the nearest code
// point outside each range that is text to both (U+FFF8 is default-ignorable, so no control sits before U+FFF9).
// ---------------------------------------------------------------------------------------------------------------------
const named = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
/** The 19 wb-rqd format-control units, each as [name, code point]. */
const RQD_UNITS: readonly (readonly [string, number])[] = [0xfff9, 0xfffa, 0xfffb, ...Array.from({ length: 16 }, (_, at) => 0x13430 + at)].map(
  code => [named(code), code] as const,
);
/** The nearest code point past each range on the side where text begins again. */
const RQD_NEIGHBOURS: readonly (readonly [string, number])[] = [
  [`${named(0xfffc)} after FFF9-FFFB`, 0xfffc],
  [`${named(0x1342f)} before 13430-1343F`, 0x1342f],
  [`${named(0x13440)} after 13430-1343F`, 0x13440],
];

describe("A11 oracle parity: UNSAFE_DISPLAY carries every wb-rqd format control the shared stripUnsafeText refuses (wb-0br F2)", () => {
  it("names all 19 units", () => {
    expect(RQD_UNITS).toHaveLength(19);
    expect(RQD_NEIGHBOURS).toHaveLength(3);
  });

  it.each(RQD_UNITS)("%s: the oracle flags it and stripUnsafeText drops it", (_, code) => {
    expect(UNSAFE_DISPLAY.test(cp(code))).toBe(true);
    expect(stripUnsafeText(cp(code))).toBe("");
  });

  it.each(RQD_NEIGHBOURS)("%s: the oracle and stripUnsafeText both keep it as text", (_, code) => {
    expect(UNSAFE_DISPLAY.test(cp(code))).toBe(false);
    expect(stripUnsafeText(cp(code))).toBe(cp(code));
  });
});
