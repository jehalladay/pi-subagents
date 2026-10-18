import { describe, expect, it } from "vitest";
import { type NativeRef, type ObservationEvent, ObservationProjection, type ObservationQuery } from "../src/workbench/observation.js";

const alice = { workspace: "ws-1", principal: "alice" };
const bob = { workspace: "ws-1", principal: "bob" };
const other = { workspace: "ws-2", principal: "alice" };
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "run", id });
const clock = (n: number) => `2026-10-15T00:00:${String(n).padStart(2, "0")}Z`;
const presentation = (statusText: string, statusTone: "active" | "failure" | "success" = "active") => ({ title: "Native run", type: "sdk-operation" as const, statusText, statusTone });
const event = (id: string, source: NativeRef, sequence: number, statusText: string, scope = alice): ObservationEvent => ({
  projectionEventId: id, source, scope, sourceSequence: sequence, observedAt: clock(sequence % 60),
  kind: "native.status", node: { presentation: presentation(statusText, statusText === "FAILED" ? "failure" : "active") },
});

describe("bounded, provenance-preserving observation projection", () => {
  it("uses provider-qualified native keys, preserves native failure and does not infer ownership", () => {
    const view = new ObservationProjection();
    view.ingest(event("a", ref("furnace", "same"), 1, "RUNNING"));
    view.ingest(event("a", ref("forge", "same"), 1, "FAILED"));
    const furnace = view.query({ scope: alice, ref: ref("furnace", "same"), limit: 1 });
    const forge = view.query({ scope: alice, ref: ref("forge", "same"), limit: 1 });
    expect(furnace.nodes[0].key).not.toBe(forge.nodes[0].key);
    expect(forge.nodes[0]).toMatchObject({ nativeRef: { provider: "forge", id: "same" }, presentation: { statusTone: "failure", statusText: "FAILED" } });
    expect(view.relations({scope:alice, from:furnace.nodes[0].key})).toEqual([]);
    expect(() => view.relate({scope:alice,from:ref("furnace","same"),to:ref("forge","same"),kind:"ownership",provenance:{source:"furnace"}})).toThrow(/confirmation/);
    expect(furnace.nodes[0].freshness).toBe("unknown");
  });

  it("deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot", () => {
    const view = new ObservationProjection({ maxEvents: 3 });
    const native = ref("furnace", "r1");
    expect(view.ingest(event("first", native, 1, "RUNNING"))).toBe("applied");
    expect(view.ingest(event("first", native, 2, "FAILED"))).toBe("duplicate");
    expect(view.ingest(event("late", native, 0, "FAILED"))).toBe("out-of-order");
    expect(view.ingest(event("gap", native, 3, "FAILED"))).toBe("applied");
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0]).toMatchObject({freshness:"stale", presentation:{statusText:"FAILED"}});
    view.refresh({source:native,scope:alice,capturedAt:clock(5),observedAt:clock(6),sequence:3,node:{...presentation("FAILED", "failure")}});
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0]).toMatchObject({freshness:"current",lastConfirmedAt:clock(5)});
    expect(view.ingest(event("older",native,2,"RUNNING"))).toBe("out-of-order");
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0].presentation.statusText).toBe("FAILED");
  });

  it("disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot", () => {
    const view = new ObservationProjection();
    const native = ref("furnace", "external");
    view.refresh({source:native,scope:alice,capturedAt:clock(1),observedAt:clock(2),sequence:1,node:presentation("RUNNING")});
    view.disconnect("furnace");
    view.reconnect("furnace");
    view.ingest(event("e2",native,2,"RUNNING"));
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0]).toMatchObject({ freshness:"stale", sourceConnectionState:"connected" });
    view.refresh({source:native,scope:alice,capturedAt:clock(3),observedAt:clock(4),sequence:2,node:presentation("FAILED","failure")});
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0].freshness).toBe("current");
    expect(view.refresh({source:native,scope:alice,capturedAt:clock(1),observedAt:clock(5),sequence:1,node:presentation("RUNNING")})).toBe("out-of-order");
  });

  it("updates all semantic indexes when a node changes and keeps edges typed, explicit, provenance-bearing", () => {
    const view = new ObservationProjection();
    const native = ref("forge","build-1");
    const parent = ref("furnace","r1");
    const dependency = ref("beads","b1");
    view.ingest({...event("e1",native,1,"RUNNING"), trace:{invocationId:"inv-1"},subjectBasis:"sha-old",evidenceRefs:["ev-old"],sourceVersion:"v1",interval:{startedAt:clock(1),endedAt:clock(2)}});
    const key = view.query({scope:alice,ref:native,limit:1}).nodes[0].key;
    view.relate({scope:alice,from:parent,to:native,kind:"causation",provenance:{source:"explicit trace",observedAt:clock(2)}});
    view.relate({scope:alice,from:dependency,to:native,kind:"dependency",provenance:{source:"declared workflow",observedAt:clock(2)}});
    expect(view.query({scope:alice,parent,limit:3}).nodes.map(n=>n.key)).toContain(key);
    expect(view.query({scope:alice,dependency,limit:3}).nodes.map(n=>n.key)).toContain(key);
    expect(view.relations({scope:alice,to:key}).map(e=>e.kind).sort()).toEqual(["causation","dependency"]);
    view.ingest({...event("e2",native,2,"FAILED"),trace:{invocationId:"inv-2"},subjectBasis:"sha-new",evidenceRefs:["ev-new"],sourceVersion:"v2",interval:{startedAt:clock(3),endedAt:clock(4)}});
    for (const filter of [{invocationId:"inv-1"},{basis:"sha-old"},{evidence:"ev-old"},{version:"v1"},{statusTone:"active"},{time:{from:clock(1),to:clock(2)}}] satisfies Array<Omit<ObservationQuery, "scope" | "limit">>) {
      expect(view.query({scope:alice,limit:5,...filter}).nodes).toEqual([]);
    }
    for (const filter of [{invocationId:"inv-2"},{basis:"sha-new"},{evidence:"ev-new"},{version:"v2"},{statusTone:"failure"},{kind:"native.status",statusTone:"failure"},{time:{from:clock(3),to:clock(4)}}] satisfies Array<Omit<ObservationQuery, "scope" | "limit">>) {
      expect(view.query({scope:alice,limit:5,...filter}).nodes.map(n=>n.key)).toEqual([key]);
    }
  });

  it("bounds event, node and edge capacity, keeps payload references instead of bodies, and denies cross-scope queries", () => {
    const view = new ObservationProjection({maxEvents:2,maxNodes:2,maxEdges:2,maxPayloadBytes:256});
    view.ingest({...event("a",ref("forge","1"),1,"RUNNING"),payloadRef:"artifact:1"});
    view.ingest(event("b",ref("forge","2"),1,"RUNNING",bob));
    view.ingest(event("c",ref("forge","3"),1,"RUNNING",other));
    expect(view.stats()).toMatchObject({nodes:2,events:2});
    expect(view.query({scope:alice,limit:5}).nodes).toEqual([]);
    expect(view.query({scope:bob,limit:5}).nodes).toHaveLength(1);
    expect(view.query({scope:other,limit:5}).nodes).toHaveLength(1);
    expect(view.events({scope:alice,limit:5}).events).toEqual([]);
    expect(() => view.ingest({...event("d",ref("forge","4"),1,"RUNNING"),node:{presentation:{...presentation("RUNNING"),title:"secret".repeat(100)}}})).toThrow(/payload|bytes|limit/i);
    expect(JSON.stringify(view.query({scope:bob,limit:5}))).not.toContain("artifact:1");
  });

  it("requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history",()=>{
    const view=new ObservationProjection({maxEvents:2});
    const first=ref("forge","same"), second=ref("furnace","same");
    view.ingest(event("shared",first,1,"RUNNING"));
    view.ingest(event("shared",second,1,"RUNNING"));
    view.ingest(event("later",first,2,"FAILED"));
    expect(view.events({scope:alice,limit:2,after:{source:first,projectionEventId:"shared"}})).toMatchObject({events:[],completeness:"partial-gap"});
    expect(view.events({scope:alice,limit:2,after:{source:second,projectionEventId:"shared"}})).toMatchObject({events:[{projectionEventId:"later"}],completeness:"complete"});
  });

  it("copies nested event metadata, prevents contradictory duplicate IDs and bounds relational reads", () => {
    const view = new ObservationProjection({maxEdges:2,maxEvents:4,maxQuery:2});
    const source=ref("forge","r1");
    const original={...event("reused",source,1,"RUNNING"),trace:{invocationId:"inv",correlationIds:{request:"initial"}},interval:{startedAt:clock(1),endedAt:clock(2)}};
    view.ingest(original);
    original.trace.correlationIds.request="mutated";
    original.interval.endedAt=clock(3);
    const first=view.events({scope:alice,limit:5}).events[0];
    expect(first.trace?.correlationIds?.request).toBe("initial");
    expect(first.interval?.endedAt).toBe(clock(2));
    if(first.trace?.correlationIds) (first.trace.correlationIds as Record<string,string>).request="client-mutated";
    expect(view.events({scope:alice,limit:5}).events[0].trace?.correlationIds?.request).toBe("initial");
    const next={...event("reused",ref("forge","r2"),1,"RUNNING")};
    expect(view.ingest(next)).toBe("applied");
    expect(view.events({scope:alice,limit:5}).events).toHaveLength(2);
    expect(view.ingest({...event("reused",source,2,"FAILED")})).toBe("duplicate");
    expect(view.relations({scope:other,limit:5})).toEqual([]);
  });

  it("does not fabricate stream ordering when sequence and cursor are absent", () => {
    const view = new ObservationProjection();
    const native=ref("furnace","r1");
    view.ingest({...event("one",native,1,"RUNNING"),sourceSequence:undefined});
    view.ingest({...event("two",native,2,"FAILED"),sourceSequence:undefined});
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0]).toMatchObject({freshness:"stale",presentation:{statusText:"RUNNING"}});
  });

  it("includes ongoing intervals in later time windows without converting missing end into an exact finish", () => {
    const view = new ObservationProjection();
    const native = ref("forge", "long-running");
    view.refresh({source:native, scope:alice, capturedAt:clock(10), observedAt:clock(11),
      node:presentation("RUNNING"), interval:{startedAt:clock(1)}});
    const window = view.query({scope:alice,limit:2,time:{from:clock(30),to:clock(40)}});
    expect(window.nodes).toMatchObject([{nativeRef:native,interval:{startedAt:clock(1)}}]);
    expect(window.nodes[0].interval?.endedAt).toBeUndefined();
    expect(view.query({scope:alice,limit:2,time:{from:clock(0),to:clock(0)}}).nodes).toEqual([]);
    view.refresh({source:native,scope:alice,capturedAt:clock(42),observedAt:clock(43),
      node:presentation("DONE","success"),interval:{startedAt:clock(1),endedAt:clock(42)}});
    expect(view.query({scope:alice,limit:2,time:{from:clock(45),to:clock(50)}}).nodes).toEqual([]);
  });

  it("refuses a sequence-less older snapshot after a newer sequenced stream update", () => {
    const view = new ObservationProjection();
    const native = ref("furnace", "run-1");
    view.refresh({source:native,scope:alice,capturedAt:clock(1),observedAt:clock(2),sequence:1,node:presentation("RUNNING")});
    view.ingest(event("failed",native,2,"FAILED"));
    expect(view.refresh({source:native,scope:alice,capturedAt:clock(1),observedAt:clock(4),node:presentation("RUNNING")})).toBe("out-of-order");
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0]).toMatchObject({presentation:{statusText:"FAILED"},freshness:"current",observedAt:clock(2)});
    view.refresh({source:native,scope:alice,capturedAt:clock(4),observedAt:clock(5),sequence:2,node:presentation("FAILED","failure")});
    expect(view.refresh({source:native,scope:alice,capturedAt:clock(3),observedAt:clock(6),node:presentation("RUNNING")})).toBe("out-of-order");
    expect(view.query({scope:alice,ref:native,limit:1}).nodes[0]).toMatchObject({presentation:{statusText:"FAILED"},freshness:"current"});
  });

  it("returns a child once when multiple proven relationship types share it, without false truncation", () => {
    const view = new ObservationProjection();
    const nativeParent=ref("furnace","parent");
    const child=ref("forge","shared-child");
    const sibling=ref("forge","sibling");
    view.ingest(event("first",child,1,"RUNNING"));
    view.ingest(event("second",sibling,1,"RUNNING"));
    for(const kind of ["causation","grouping","ownership"] as const) view.relate({scope:alice,from:nativeParent,to:child,kind,provenance:{source:kind==="ownership" ? "furnace" : "trace",nativeConfirmationRef:kind==="ownership" ? "native:run-parent" : undefined}});
    view.relate({scope:alice,from:nativeParent,to:sibling,kind:"causation",provenance:{source:"trace"}});
    const first=view.query({scope:alice,parent:nativeParent,limit:1});
    expect(first.nodes.map(n=>n.nativeRef.id)).toEqual(["shared-child"]);
    expect(first.truncated).toBe(true);
    const full=view.query({scope:alice,parent:nativeParent,limit:2});
    expect(full.nodes.map(n=>n.nativeRef.id)).toEqual(["shared-child","sibling"]);
    expect(full.truncated).toBe(false);
    const dependency=ref("beads","b1");
    view.relate({scope:alice,from:dependency,to:child,kind:"dependency",provenance:{source:"declared"}});
    view.relate({scope:alice,from:dependency,to:child,kind:"dependency",provenance:{source:"second declaration"}});
    expect(view.query({scope:alice,dependency,limit:1})).toMatchObject({nodes:[{nativeRef:child}],truncated:false});
    expect(view.relations({scope:alice,from:JSON.stringify([alice.workspace,alice.principal,nativeParent.provider,nativeParent.type,"",nativeParent.id])})).toHaveLength(4);
  });

  it("bounds query work and response size for 100k historical updates and 1000 live nodes", () => {
    const view = new ObservationProjection({maxNodes:1000,maxEvents:64});
    for(let i=0;i<1000;i++) view.ingest(event(`seed-${i}`,ref("forge",String(i)),1,"RUNNING"));
    for(let i=0;i<100_000;i++) view.ingest(event(`update-${i}`,ref("forge",String(i%1000)),2+Math.floor(i/1000),"RUNNING"));
    const result = view.query({scope:alice,ref:ref("forge","10"),limit:1});
    expect(result.nodes).toHaveLength(1);
    expect(result.examined).toBeLessThan(10);
    expect(view.stats()).toMatchObject({nodes:1000,events:64});
    expect(JSON.stringify(result).length).toBeLessThan(4000);
  }, 60_000);
});
