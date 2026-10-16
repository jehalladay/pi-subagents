/**
 * wb-752.2 (W16-B/VC-4): the pure, bounded workflow_observe reply builder. Each case quotes the docs/workbench text
 * it pins (all quotes are verified verbatim by the last case). Fixtures are real ObservationProjection instances; a
 * typed stub reader stands in only where a hostile or malformed reader must hand over what the projection itself
 * refuses at ingest (raw ESC/NUL/C1 text, foreign-scope rows, unknown enum values, invalid counters).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  ObservationProjection,
  type ObservationScope,
  type ObservedNode,
  type Presentation,
  type Relation,
} from "../src/workbench/observation.js";
import {
  OBSERVE_CONTRACT,
  type ObserveReader,
  type ObserveReply,
  type ObserveRequest,
  observeInvocation,
} from "../src/workbench/observe-query.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "../src/workbench/redaction.js";

const alice: ObservationScope = { workspace: "ws-1", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-1", principal: "bob" };
const clock = (second: number): string => new Date(Date.UTC(2026, 9, 15) + second * 1000).toISOString();
const ref = (provider: string, id: string, type = "run"): NativeRef => ({ provider, type, id });
const shown = (statusText: string, statusTone: Presentation["statusTone"], title = `Native ${statusText}`): Presentation => ({
  title,
  type: "sdk-operation",
  statusText,
  statusTone,
});
/** Control, bidi, zero-width/format and line-separator characters: none may reach any string of a reply. */
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u180e\u200b-\u200f\u2028-\u202e\u2060-\u2069\ufeff]/;
/** The literal acceptance regex of wb-752.2 (O5 and the scope's "No ANSI/control characters anywhere"). */
const SPEC_UNSAFE = /[\u0000-\u001f\u007f\u202e\u200b]/;

/** A read-current snapshot placing one node in an invocation viewport (current until its provider disconnects). */
function snapshot(
  view: ObservationProjection,
  source: NativeRef,
  invocationId: string,
  node: Presentation,
  sequence = 1,
  extra: Partial<NativeSnapshot> = {},
  scope: ObservationScope = alice,
): void {
  const applied = view.refresh({
    source,
    scope,
    capturedAt: clock(sequence),
    observedAt: clock(sequence),
    sequence,
    node,
    trace: { invocationId },
    ...extra,
  });
  expect(applied).toBe("applied");
}

interface Call {
  readonly method: string;
  readonly input: unknown;
  readonly output: unknown;
}

/** Record every member the builder touches on a real projection; methods still run against the real target. */
function spy(target: ObservationProjection): { reader: ObservationProjection; calls: Call[]; touched: Set<string> } {
  const calls: Call[] = [];
  const touched = new Set<string>();
  const reader = new Proxy(target, {
    get(object, property) {
      const method = String(property);
      touched.add(method);
      const value: unknown = Reflect.get(object, property, object);
      if (typeof value !== "function") return value;
      return (...args: unknown[]): unknown => {
        const output: unknown = Reflect.apply(value, object, args);
        calls.push({ method, input: args[0], output });
        return output;
      };
    },
  });
  return { reader, calls, touched };
}

/** Every key and string value of a JSON-like value. */
function strings(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) for (const child of value) strings(child, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      into.push(key);
      strings(child, into);
    }
  }
  return into;
}

function keysOf(value: unknown, into = new Set<string>()): Set<string> {
  if (Array.isArray(value)) for (const child of value) keysOf(child, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      into.add(key);
      keysOf(child, into);
    }
  }
  return into;
}

function expectDeepFrozen(value: unknown): void {
  if (value === null || typeof value !== "object") return;
  expect(Object.isFrozen(value)).toBe(true);
  for (const child of Object.values(value)) expectDeepFrozen(child);
}

function expectNoUndefined(value: unknown): void {
  if (value === null || typeof value !== "object") return;
  for (const child of Object.values(value)) {
    expect(child).not.toBeUndefined();
    expectNoUndefined(child);
  }
}

function expectRefused(run: () => unknown, message: RegExp, category = "validation", label = message.source): void {
  let caught: unknown;
  try {
    run();
  } catch (error) {
    caught = error;
  }
  expect(caught, label).toBeInstanceOf(CapabilityError);
  if (!(caught instanceof CapabilityError)) return;
  expect(caught.category, label).toBe(category);
  expect(caught.message, label).toMatch(message);
}

/** The decoded body of an issued cursor (opaque to callers; the tests tamper with it to probe validation). */
function cursorBody(cursor: string | null): Record<string, unknown> {
  if (cursor === null) throw new Error("expected an issued cursor");
  const body: unknown = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
  if (body === null || typeof body !== "object" || Array.isArray(body)) throw new Error("cursor body is not an object");
  return Object.fromEntries(Object.entries(body));
}
const encoded = (body: unknown): string => Buffer.from(JSON.stringify(body), "utf8").toString("base64url");

function onlyRelations(reply: ObserveReply): NonNullable<ObserveReply["relations"]> {
  if (!reply.relations) throw new Error("relations block missing");
  return reply.relations;
}

function onlyEvents(reply: ObserveReply): NonNullable<ObserveReply["events"]> {
  if (!reply.events) throw new Error("events block missing");
  return reply.events;
}

/** A typed node a stub reader hands over; its text is whatever the stub chooses. */
function stubNode(id: string, scope: ObservationScope = alice, presentation: Presentation = shown("PASSED", "success", `Forge ${id}`)): ObservedNode {
  return {
    key: JSON.stringify([scope.workspace, scope.principal, "forge", "run", "", id]),
    nativeRef: ref("forge", id),
    scope,
    sourceKind: "observed",
    observedAt: clock(1),
    sourceConnectionState: "connected",
    freshness: "current",
    completeness: "complete",
    presentation,
    kind: "forge.run",
    evidenceRefs: [],
  };
}

describe("workflow_observe reply builder (workbench.observe/v1)", () => {
  it("O1 pages 95 nodes over 100,000 ingested updates with one bounded window() read per reply and refuses foreign, malformed, negative and oversize cursors", () => {
    // docs/workbench/10-terminal-inspector.md § "Rendering pipeline": "Pi observation tools paginate/filter/limit and return compact JSON, never rendered ANSI."
    // docs/workbench/02-atomic-requirements.md WB-018: "Pi can query bounded semantic observations without consuming raw event logs or terminal-rendered text."
    const view = new ObservationProjection({ maxEvents: 4_096 });
    const refs = Array.from({ length: 95 }, (_, index) => ref("forge", `op-${String(index).padStart(3, "0")}`, "operation"));
    for (const [index, source] of refs.entries()) {
      view.ingest({
        projectionEventId: `seed-${index}`,
        source,
        scope: alice,
        sourceSequence: 1,
        observedAt: clock(index),
        kind: "native.status",
        node: { presentation: shown("RUNNING", "active", `Operation ${index}`) },
        trace: { invocationId: "inv-o1" },
      });
    }
    for (let update = 0; update < 100_000; update++) {
      const running = update % 2 === 0;
      view.ingest({
        projectionEventId: `update-${update}`,
        source: refs[update % 95],
        scope: alice,
        sourceSequence: 2 + Math.floor(update / 95),
        observedAt: clock(update % 3_600),
        kind: "native.status",
        node: { presentation: shown(running ? "RUNNING" : "WAITING", running ? "active" : "waiting") },
      });
    }
    expect(view.stats()).toMatchObject({ nodes: 95, events: 4_096 });
    const viewport = view.window({ scope: alice, invocationId: "inv-o1", offset: 0, limit: 95 }).nodes.map((node) => node.key);
    expect(viewport).toHaveLength(95);

    const { reader, calls } = spy(view);
    const pages: ObserveReply[] = [];
    let cursor: string | undefined;
    do {
      const before = calls.length;
      const reply = observeInvocation(reader, { scope: alice, invocationId: "inv-o1", limit: 20, ...(cursor === undefined ? {} : { cursor }) });
      const made = calls.slice(before);
      expect(made.map((call) => call.method)).toEqual(["window"]);
      expect(made[0].input).toEqual({ scope: alice, invocationId: "inv-o1", offset: 20 * pages.length, limit: 20 });
      pages.push(reply);
      cursor = reply.window.nextCursor ?? undefined;
    } while (cursor !== undefined && pages.length < 10);

    expect(pages.map((page) => page.nodes.length)).toEqual([20, 20, 20, 20, 15]);
    expect(pages[0].contract).toBe(OBSERVE_CONTRACT);
    expect(OBSERVE_CONTRACT).toBe("workbench.observe/v1");
    expect(pages[0].window).toMatchObject({ offset: 0, limit: 20, scanned: 20, returned: 20, total: 95, truncated: true });
    expect(pages.map((page) => page.window.offset)).toEqual([0, 20, 40, 60, 80]);
    expect(pages.every((page) => page.window.total === 95)).toBe(true);
    expect(pages[4].window).toMatchObject({ scanned: 15, returned: 15, nextCursor: null, truncated: false });
    const keys = pages.flatMap((page) => page.nodes.map((node) => node.key));
    expect(keys).toEqual(viewport);
    expect(new Set(keys).size).toBe(95);
    expect(calls.filter((call) => call.method !== "window")).toEqual([]);

    // The issued cursor binds offset, invocation, a scope tag and the revision it was read at.
    const request = { scope: alice, invocationId: "inv-o1", limit: 20 };
    const body = cursorBody(pages[0].window.nextCursor);
    expect(Object.keys(body)).toEqual(["v", "offset", "invocationId", "scope", "revision"]);
    expect(body).toMatchObject({ v: 1, offset: 20, invocationId: "inv-o1", revision: pages[0].window.revision });
    expect(body.scope).toMatch(/^[0-9a-f]{8}$/);

    // A cursor minted for another invocation is refused, never replayed against this one.
    for (let index = 0; index < 21; index++) snapshot(view, ref("forge", `foreign-${index}`), "inv-o1-other", shown("PASSED", "success"));
    const foreign = observeInvocation(view, { scope: alice, invocationId: "inv-o1-other", limit: 20 }).window.nextCursor;
    expect(foreign).toEqual(expect.any(String));
    expectRefused(() => observeInvocation(view, { ...request, cursor: foreign ?? "" }), /another invocation/);
    // A cursor minted under another principal for the same invocation id is refused in both directions.
    for (let index = 0; index < 21; index++) snapshot(view, ref("forge", `bob-${index}`), "inv-o1", shown("PASSED", "success"), 1, {}, bob);
    const bobs = observeInvocation(view, { scope: bob, invocationId: "inv-o1", limit: 20 });
    expect(bobs.window.total).toBe(21);
    expectRefused(() => observeInvocation(view, { ...request, cursor: bobs.window.nextCursor ?? "" }), /another scope/);
    expectRefused(() => observeInvocation(view, { scope: bob, invocationId: "inv-o1", cursor: pages[0].window.nextCursor ?? "" }), /another scope/);
    const flipped = String(body.scope).replace(/^./, (digit) => (digit === "0" ? "1" : "0"));
    expectRefused(() => observeInvocation(view, { ...request, cursor: encoded({ ...body, scope: flipped }) }), /another scope/);

    const malformed: [string, string][] = [
      ["not base64url", "not a cursor!"],
      ["empty", ""],
      ["a JSON string", encoded("plain string")],
      ["a JSON array", encoded([1, 20, "inv-o1"])],
      ["the bare three-field body", encoded({ v: 1, offset: 20, invocationId: "inv-o1" })],
      ["version 2", encoded({ ...body, v: 2 })],
      ["an extra field", encoded({ ...body, extra: true })],
      ["reordered fields", encoded({ offset: body.offset, v: 1, invocationId: body.invocationId, scope: body.scope, revision: body.revision })],
      ["non-canonical base64url", `${encoded(body)}A`],
      ["padded base64url (decodes identically)", `${encoded(body)}=`],
      ["non-canonical JSON", Buffer.from(JSON.stringify(body, null, 1), "utf8").toString("base64url")],
    ];
    for (const [label, value] of malformed) expectRefused(() => observeInvocation(view, { ...request, cursor: value }), /Malformed observe cursor/, "validation", label);
    for (const offset of [-1, 1.5, "20", Number.MAX_SAFE_INTEGER + 2]) {
      expectRefused(() => observeInvocation(view, { ...request, cursor: encoded({ ...body, offset }) }), /offset/, "validation", `offset ${offset}`);
    }
    for (const revision of [-1, "7", 0.5]) {
      expectRefused(() => observeInvocation(view, { ...request, cursor: encoded({ ...body, revision }) }), /revision/, "validation", `revision ${revision}`);
    }
    expectRefused(() => observeInvocation(view, { ...request, cursor: "A".repeat(300) }), /256 bytes/);
    const padded = encoded({ ...body, invocationId: `inv-o1${" ".repeat(250)}` });
    expect(Buffer.byteLength(padded)).toBeGreaterThan(256);
    expectRefused(() => observeInvocation(view, { ...request, cursor: padded }), /256 bytes/);

    // A canonical cursor past the end is an honest empty page, not a silent restart at offset 0.
    const past = observeInvocation(view, { ...request, cursor: encoded({ ...body, offset: 500 }) });
    expect(past.nodes).toEqual([]);
    expect(past.window).toMatchObject({ offset: 500, scanned: 0, returned: 0, total: 95, nextCursor: null, truncated: false });
    // A cursor read at a revision this projection has not reached is out of order; an older one is the projection moving on.
    const current = observeInvocation(view, request).window.revision;
    expect(current).toBeGreaterThan(Number(body.revision));
    expectRefused(() => observeInvocation(view, { ...request, cursor: encoded({ ...body, revision: current + 1 }) }), /out-of-order/);
    expect(observeInvocation(view, { ...request, cursor: encoded({ ...body, revision: 0 }) }).window).toMatchObject({ offset: 20, returned: 20 });
  }, 60_000);

  it("O2 speaks last-known-running + stale after a Furnace disconnect and keeps native status text beside the tone", () => {
    // docs/workbench/09-observation-and-provenance.md § "Freshness and ambiguity": "A disconnected Furnace event stream must not make a
    // previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale. Pi tool summaries must communicate that nuance."
    // docs/workbench/13-contracts-and-config.md § "Observation projection": "Do not replace native status with presentation.statusTone. This is a read model only."
    const view = new ObservationProjection();
    const attempts = [1, 2, 3].map((index) => ref("furnace", `frn-att-${index}`, "attempt"));
    const gates = [1, 2].map((index) => ref("forge", `gate-${index}`, "operation"));
    const running = (source: NativeRef): Presentation => shown("RUNNING", "active", `Furnace Attempt ${source.id}`);
    for (const source of attempts) snapshot(view, source, "frn-run-1", running(source), 1, { kind: "furnace.attempt.snapshot" });
    for (const source of gates) snapshot(view, source, "frn-run-1", shown("PASSED", "success", `Forge gate ${source.id}`), 1, { kind: "forge.gate.snapshot" });
    const request: ObserveRequest = { scope: alice, invocationId: "frn-run-1" };
    expect(observeInvocation(view, request).freshness).toEqual({ current: 5, stale: 0, unknown: 0, lastKnownRunningStale: 0, summary: "all returned nodes current" });

    view.disconnect("furnace");
    const stale = observeInvocation(view, request);
    expect(stale.freshness).toEqual({
      current: 2,
      stale: 3,
      unknown: 0,
      lastKnownRunningStale: 3,
      summary: "3 last-known-running + stale (active, not current); 3 stale / 0 unknown",
    });
    expect(stale.freshness.summary).toContain("last-known-running + stale");
    const furnace = stale.nodes.filter((node) => node.nativeRef.provider === "furnace");
    expect(furnace).toHaveLength(3);
    for (const node of furnace) {
      expect(node.presentation.statusText).toContain("RUNNING");
      expect(node).toMatchObject({ presentation: { statusTone: "active" }, freshness: "stale", sourceConnectionState: "disconnected" });
    }
    expect(stale.anomalies.disconnectedProviders).toEqual(["furnace"]);

    // Reconnect alone restores no confirmation, so the spoken nuance is unchanged.
    view.reconnect("furnace");
    const reconnected = observeInvocation(view, request);
    expect(reconnected.freshness).toEqual(stale.freshness);
    expect(reconnected.anomalies.disconnectedProviders).toEqual([]);
    expect(reconnected.nodes.filter((node) => node.nativeRef.provider === "furnace").every((node) => node.freshness === "stale")).toBe(true);

    // Only a real read-current snapshot confirms one node again.
    snapshot(view, attempts[0], "frn-run-1", running(attempts[0]), 2, { kind: "furnace.attempt.snapshot" });
    expect(observeInvocation(view, request).freshness).toEqual({
      current: 3,
      stale: 2,
      unknown: 0,
      lastKnownRunningStale: 2,
      summary: "2 last-known-running + stale (active, not current); 2 stale / 0 unknown",
    });
    for (const source of attempts.slice(1)) snapshot(view, source, "frn-run-1", running(source), 2, { kind: "furnace.attempt.snapshot" });
    expect(observeInvocation(view, request).freshness.summary).toBe("all returned nodes current");

    // Stale finished work is reported as stale counts, without the running nuance, and its native text is untouched.
    view.disconnect("forge");
    const forgeStale = observeInvocation(view, request);
    expect(forgeStale.freshness).toEqual({ current: 3, stale: 2, unknown: 0, lastKnownRunningStale: 0, summary: "2 stale / 0 unknown" });
    expect(forgeStale.nodes.filter((node) => node.nativeRef.provider === "forge").map((node) => node.presentation)).toEqual([
      { title: "Forge gate gate-1", type: "sdk-operation", statusText: "PASSED", statusTone: "success" },
      { title: "Forge gate gate-2", type: "sdk-operation", statusText: "PASSED", statusTone: "success" },
    ]);
    // A RUNNING node never confirmed by a snapshot is not current either: unknown freshness counts as last-known-running.
    view.ingest({
      projectionEventId: "frn-att-4-started",
      source: ref("furnace", "frn-att-4", "attempt"),
      scope: alice,
      sourceSequence: 1,
      observedAt: clock(30),
      kind: "furnace.attempt.started",
      node: { presentation: shown("RUNNING", "active", "Furnace Attempt frn-att-4") },
      trace: { invocationId: "frn-run-1" },
    });
    expect(observeInvocation(view, request).freshness).toEqual({
      current: 3,
      stale: 2,
      unknown: 1,
      lastKnownRunningStale: 1,
      summary: "1 last-known-running + stale (active, not current); 2 stale / 1 unknown",
    });
  });

  it("O3 reports outgoing relation counts as returned-window metadata and labels a full 40-row page partial", () => {
    // docs/workbench/09-observation-and-provenance.md § "Relationships are typed and provenanced": "Missing edges do not imply independence."
    const view = new ObservationProjection();
    const run = ref("furnace", "frn-run-7");
    const hub = ref("forge", "hub", "operation");
    const leaf = ref("forge", "leaf", "operation");
    snapshot(view, run, "inv-o3", shown("RUNNING", "active", "Furnace Run frn-run-7"));
    snapshot(view, hub, "inv-o3", shown("RUNNING", "active", "Forge hub"));
    snapshot(view, leaf, "inv-o3", shown("PASSED", "success", "Forge leaf"));
    for (const index of [1, 2, 3]) view.relate({ scope: alice, from: run, to: ref("forge", `grouped-${index}`), kind: "grouping", provenance: { source: "workflow phase" } });
    view.relate({
      scope: alice,
      from: run,
      to: ref("furnace", "frn-att-1", "attempt"),
      kind: "ownership",
      provenance: { source: "furnace", nativeConfirmationRef: "furnace:attempts:req-1" },
    });
    view.relate({ scope: alice, from: run, to: ref("beads", "wb-1"), kind: "hypothesis", provenance: { source: "inferred" } });
    for (let index = 0; index < 150; index++) view.relate({ scope: alice, from: hub, to: ref("forge", `dep-${index}`), kind: "dependency", provenance: { source: "declared" } });

    const { reader, calls } = spy(view);
    const reply = observeInvocation(reader, { scope: alice, invocationId: "inv-o3", selectors: { relations: true } });
    const relations = onlyRelations(reply);
    expect(relations.basis).toBe("returned-window-only");
    expect(relations.revision).toBe(view.relationRevision());
    const keyOf = (id: string): string => {
      const node = reply.nodes.find((candidate) => candidate.nativeRef.id === id);
      if (!node) throw new Error(`node ${id} missing`);
      return node.key;
    };
    expect(relations.perNode).toEqual([
      { key: keyOf("frn-run-7"), outgoing: { dependency: 0, causation: 0, ownership: 1, grouping: 3, hypothesis: 1 }, partial: false },
      { key: keyOf("hub"), outgoing: { dependency: 40, causation: 0, ownership: 0, grouping: 0, hypothesis: 0 }, partial: true },
      { key: keyOf("leaf"), outgoing: { dependency: 0, causation: 0, ownership: 0, grouping: 0, hypothesis: 0 }, partial: false },
    ]);
    const relationCalls = calls.filter((call) => call.method === "relations");
    expect(relationCalls).toHaveLength(reply.nodes.length);
    for (const call of relationCalls) expect(call.input).toMatchObject({ scope: alice, limit: 40 });
    expect(calls.filter((call) => call.method === "window")).toHaveLength(1);
    expect(calls.filter((call) => call.method === "relationRevision")).toHaveLength(1);
    expect(calls.filter((call) => call.method === "events")).toEqual([]);
    expect(reply.anomalies.noRelationsAvailable).toBe(false);
    expect(JSON.stringify(relations)).not.toMatch(/presentation|provenance|nativeConfirmationRef|workflow phase|req-1/);

    // A window whose returned nodes carry no observed edge says so instead of implying independence.
    const isolated = new ObservationProjection();
    snapshot(isolated, ref("forge", "alone"), "inv-o3-alone", shown("PASSED", "success"));
    const alone = observeInvocation(isolated, { scope: alice, invocationId: "inv-o3-alone", selectors: { relations: true } });
    expect(onlyRelations(alone).perNode).toEqual([
      { key: alone.nodes[0].key, outgoing: { dependency: 0, causation: 0, ownership: 0, grouping: 0, hypothesis: 0 }, partial: false },
    ]);
    expect(alone.anomalies.noRelationsAvailable).toBe(true);
    // Relations not requested: nothing is read and nothing is claimed either way.
    const unrequested = observeInvocation(isolated, { scope: alice, invocationId: "inv-o3-alone" });
    expect(unrequested.relations).toBeUndefined();
    expect(unrequested.anomalies.noRelationsAvailable).toBe(false);
  });

  it("O3 summarizes a bounded event window as metadata only and surfaces an evicted after-cursor as partial-gap", () => {
    // docs/workbench/09-observation-and-provenance.md § "Experimental projection implementation": "Event queries expose metadata and
    // references without raw producer payloads. Source-qualified cursor retention loss is explicitly partial-gap."
    // docs/workbench/02-atomic-requirements.md WB-032: "Pi can use observer tools to inspect definition, retrieve bounded event windows,
    // source/evidence refs and compare two runs."
    const view = new ObservationProjection();
    for (let index = 0; index < 1_000; index++) {
      view.ingest({
        projectionEventId: `evt-${index}`,
        source: ref(index % 5 === 4 ? "furnace" : "forge", `job-${index % 5}`),
        scope: alice,
        sourceSequence: Math.floor(index / 5) + 1,
        observedAt: clock(index % 60),
        kind: index % 3 === 0 ? "native.progress" : "native.status",
        node: { presentation: shown("RUNNING", "active", "Hidden Event Title") },
        payloadRef: "payload://event-body-77",
        evidenceRefs: ["ev-event-1"],
        trace: { invocationId: "inv-o3e" },
      });
    }
    const { reader, calls } = spy(view);
    const reply = observeInvocation(reader, { scope: alice, invocationId: "inv-o3e", selectors: { events: { limit: 10 } } });
    expect(onlyEvents(reply)).toEqual({
      returned: 10,
      truncated: true,
      completeness: "complete",
      kinds: { "native.progress": 4, "native.status": 6 },
      providers: ["forge", "furnace"],
      basis: "scope-event-window",
    });
    const eventCalls = calls.filter((call) => call.method === "events");
    expect(eventCalls).toHaveLength(1);
    expect(eventCalls[0].input).toEqual({ scope: alice, limit: 10 });
    expect(calls.filter((call) => call.method === "relations")).toEqual([]);
    const text = JSON.stringify(reply.events);
    for (const forbidden of ["presentation", "payload", "Hidden Event Title", "event-body-77", "ev-event-1", "evt-"]) expect(text).not.toContain(forbidden);
    expect(reply.anomalies.eventGap).toBe(false);

    // Retention loss of the after-cursor is an explicit gap, never an empty "complete" history.
    const small = new ObservationProjection({ maxEvents: 5 });
    const job = ref("forge", "job");
    for (let index = 0; index < 10; index++) {
      small.ingest({
        projectionEventId: `e-${index}`,
        source: job,
        scope: alice,
        sourceSequence: index + 1,
        observedAt: clock(index),
        kind: "native.status",
        node: { presentation: shown("RUNNING", "active") },
        trace: { invocationId: "inv-gap" },
      });
    }
    const gap = observeInvocation(small, { scope: alice, invocationId: "inv-gap", selectors: { events: { limit: 5, after: { source: job, projectionEventId: "e-0" } } } });
    expect(onlyEvents(gap)).toMatchObject({ returned: 0, completeness: "partial-gap" });
    expect(gap.anomalies.eventGap).toBe(true);
    const retained = observeInvocation(small, { scope: alice, invocationId: "inv-gap", selectors: { events: { limit: 5, after: { source: job, projectionEventId: "e-6" } } } });
    expect(onlyEvents(retained)).toMatchObject({ returned: 3, truncated: false, completeness: "complete", kinds: { "native.status": 3 } });
    expect(retained.anomalies.eventGap).toBe(false);
  });

  it("O4 caps response bytes deterministically: events, then relations, then tail nodes, with the cursor at the first dropped node", () => {
    // docs/workbench/12-security.md § "Input and output hardening": "Bound recursively nested JSON, bytes, array length, call count, response size and event rate."
    // docs/workbench/14-qa-and-benchmarks.md § "Performance benchmark": "Pi model tool response size under bounded queries"
    const view = new ObservationProjection();
    const refs = Array.from({ length: 40 }, (_, index) => ref("forge", `wide-${String(index).padStart(2, "0")}`, "operation"));
    for (const [index, source] of refs.entries()) {
      const title = `${String(index).padStart(2, "0")} ${"t".repeat(187)}`;
      expect(title).toHaveLength(190);
      snapshot(view, source, "inv-o4", shown("RUNNING", "active", title));
    }
    for (let index = 0; index < 39; index++) view.relate({ scope: alice, from: refs[index], to: refs[index + 1], kind: "dependency", provenance: { source: "declared" } });
    for (let index = 0; index < 60; index++) {
      view.ingest({
        projectionEventId: `o4-${index}`,
        source: refs[index % 40],
        scope: alice,
        sourceSequence: 2 + Math.floor(index / 40),
        observedAt: clock(100 + index),
        kind: index % 2 === 0 ? "native.status" : "native.heartbeat",
      });
    }
    const request: ObserveRequest = { scope: alice, invocationId: "inv-o4", limit: 40, selectors: { relations: true, events: { limit: 40 } } };
    const roomy = observeInvocation(view, { ...request, maxBytes: 65_536 });
    expect(roomy.truncatedForBytes).toBe(false);
    expect(roomy.droppedForBytes).toEqual({ events: false, relations: false, nodes: 0 });
    expect(roomy.nodes).toHaveLength(40);
    expect(onlyRelations(roomy).perNode).toHaveLength(40);
    expect(onlyEvents(roomy).returned).toBe(40);
    expect(roomy.bytes).toBe(Buffer.byteLength(JSON.stringify(roomy)));
    expect(roomy.bytes).toBeLessThanOrEqual(65_536);

    const tight = observeInvocation(view, { ...request, maxBytes: 4_096 });
    expect(Buffer.byteLength(JSON.stringify(tight))).toBeLessThanOrEqual(4_096);
    expect(tight.bytes).toBe(Buffer.byteLength(JSON.stringify(tight)));
    expect(tight.truncatedForBytes).toBe(true);
    expect(tight.events).toBeUndefined();
    expect(tight.relations).toBeUndefined();
    expect(tight.nodes.length).toBeGreaterThan(0);
    expect(tight.nodes.length).toBeLessThan(40);
    expect(tight.droppedForBytes).toEqual({ events: true, relations: true, nodes: 40 - tight.nodes.length });
    expect(tight.window).toMatchObject({ returned: tight.nodes.length, scanned: tight.nodes.length, total: 40, truncated: true });
    expect(tight.nodes.map((node) => node.key)).toEqual(roomy.nodes.slice(0, tight.nodes.length).map((node) => node.key));
    for (const field of ["window", "freshness", "anomalies", "countsBasis", "aggregates"]) expect(tight).toHaveProperty(field);
    expect(tight.freshness).toMatchObject({ current: tight.nodes.length, lastKnownRunningStale: 0 });
    const following = observeInvocation(view, { ...request, maxBytes: 4_096, cursor: tight.window.nextCursor ?? "" });
    expect(following.nodes[0].key).toBe(roomy.nodes[tight.nodes.length].key);
    expect(following.window.offset).toBe(tight.nodes.length);

    // The order is observable: room for everything but events drops only events; room for bare nodes drops events and relations only.
    const withoutEvents = observeInvocation(view, { ...request, selectors: { relations: true }, maxBytes: 65_536 }).bytes;
    const bare = observeInvocation(view, { ...request, selectors: {}, maxBytes: 65_536 }).bytes;
    expect(withoutEvents).toBeLessThan(roomy.bytes);
    expect(bare).toBeLessThan(withoutEvents);
    const eventsDropped = observeInvocation(view, { ...request, maxBytes: withoutEvents });
    expect(eventsDropped.droppedForBytes).toEqual({ events: true, relations: false, nodes: 0 });
    expect(onlyRelations(eventsDropped).perNode).toHaveLength(40);
    expect(eventsDropped.bytes).toBeLessThanOrEqual(withoutEvents);
    const bothDropped = observeInvocation(view, { ...request, maxBytes: bare });
    expect(bothDropped.droppedForBytes).toEqual({ events: true, relations: true, nodes: 0 });
    expect(bothDropped.nodes).toHaveLength(40);
    expect(bothDropped.window.nextCursor).toBeNull();
    expect(bothDropped.bytes).toBeLessThanOrEqual(bare);

    for (const maxBytes of [512, 1_023, 65_537, 1_000_000, 2_048.5]) {
      expectRefused(() => observeInvocation(view, { ...request, maxBytes }), /maxBytes/, "validation", `maxBytes ${maxBytes}`);
    }
  });

  it("O5 sanitizes every string, caps evidence and never carries payload bodies, provider imports or filesystem access", () => {
    // docs/workbench/09-observation-and-provenance.md § "Acceptance/negative controls" item 10: "Large/secret payload does not leak into Pi tool result or screen by default."
    // docs/workbench/12-security.md § "Input and output hardening": "Treat observed tool outputs as data, not instructions for Pi designer."
    // docs/workbench/17-packaging-and-operations.md § "Operations telemetry": "Hide/redact prompt/tool bodies by default."
    const view = new ObservationProjection();
    const nasty = `\u202eevil\u200b Authorization: Bearer abc123 ${"x".repeat(300)}`;
    snapshot(view, ref("forge", "nasty"), "inv-o5", { title: nasty, type: "workflow", statusText: "RUNNING \u200bBear\u200ber abc123 \u2066iso\u2069", statusTone: "active" }, 1, {
      evidenceRefs: Array.from({ length: 32 }, (_, index) => `ev-${index}\u200b`),
      nativePayloadRef: "payload://secret-body-9",
    });
    // Control (C1), bidi and default-ignorable characters inside a keyword are glued back into it for redaction, so they cannot hide it.
    // wb-952 pin flip (site 22 routed through the one helper): U+0085 (NEL) is a separator under the 16:44Z policy, so it renders as one
    // space beside the space before it instead of being deleted first (deletion-first leaked "x"+NEL+"Bearer tok", 17:25Z gate F2).
    view.ingest({
      projectionEventId: "late",
      source: ref("forge", "body"),
      scope: alice,
      sourceSequence: 1,
      observedAt: clock(3),
      kind: "native.status",
      node: { presentation: shown("RUNNING \u0085Bear\u202eer abc123", "active", "Authorization: Bea\u2060rer abc123 \ufefftail\u2028") },
      payloadRef: "payload://secret-body-9",
      evidenceRefs: ["ev-a", "ev-b"],
      trace: { invocationId: "inv-o5" },
    });
    const reply = observeInvocation(view, { scope: alice, invocationId: "inv-o5", selectors: { relations: true, events: { limit: 5 } } });
    const [first, second] = reply.nodes;
    expect(first.presentation.title.length).toBeLessThanOrEqual(200);
    expect(first.presentation.title).toContain("[REDACTED]");
    expect(first.presentation.title.startsWith("evil Authorization: [REDACTED] xxx")).toBe(true);
    expect(first.presentation.statusText).toBe("RUNNING [REDACTED] iso");
    expect(first.presentation.statusTone).toBe("active");
    // The fixture's trailing U+2028 is a separator: it becomes one space (wb-752.2 respin) instead of vanishing.
    expect(second.presentation.title).toBe("Authorization: [REDACTED] tail ");
    expect(second.presentation.statusText).toBe("RUNNING  [REDACTED]");
    expect(first.evidenceRefs).toEqual(Array.from({ length: 20 }, (_, index) => `ev-${index}`));
    expect(first.evidenceTruncated).toBe(true);
    expect(second.evidenceRefs).toEqual(["ev-a", "ev-b"]);
    expect(second.evidenceTruncated).toBe(false);
    const text = JSON.stringify(reply);
    expect(text).not.toMatch(SPEC_UNSAFE);
    expect(text).not.toContain("abc123");
    expect(text).not.toContain("secret-body-9");
    expect(text).not.toContain("payload");
    for (const value of strings(reply)) expect(value).not.toMatch(UNSAFE);
    // Removed characters never spend the 200-character bound: removal runs before the bound is applied.
    snapshot(view, ref("forge", "padded"), "inv-o5-pad", shown("RUNNING", "active", `${"\u200b".repeat(150)}${"A".repeat(100)}`));
    expect(observeInvocation(view, { scope: alice, invocationId: "inv-o5-pad" }).nodes[0].presentation.title).toBe("A".repeat(100));

    // A hostile reader can hand over raw escapes the projection refuses ("\x1b[31m" included); they are removed, and a
    // credential keyword split by a NUL is redacted rather than revealed by the removal.
    const hostile: ObservedNode = {
      ...stubNode("frn-run-hostile"),
      nativeRef: { provider: "furnace", type: "run", id: "frn-run-\u001b[2Jhostile\u009b" },
      presentation: {
        title: "\u001b[31mRed\u001b[0m \u202eevil\u200b Authorization: Bearer abc123\u0007",
        type: "workflow",
        statusText: "RUNNING\u0000\u009b31m Bea\u0000rer abc123",
        statusTone: "active",
      },
      kind: "native\u001b]0;title\u0007.status",
      evidenceRefs: ["ev\u0000-1"],
      payloadRef: "payload://hostile-body",
      subjectBasis: "sha\u200b-1",
      interval: { startedAt: `${clock(1)}\u001b[K` },
    };
    const stub: ObserveReader = {
      window: (filter) => ({ nodes: [hostile].slice(filter.offset, filter.offset + filter.limit), total: 1, revision: 7 }),
      relations: () => [],
      events: () => ({ events: [], truncated: false, completeness: "complete" }),
      relationRevision: () => 0,
      stats: () => ({ nodes: 1, events: 0, edges: 0 }),
    };
    const sanitized = observeInvocation(stub, { scope: alice, invocationId: "frn-run-hostile" });
    expect(sanitized.nodes[0]).toMatchObject({
      nativeRef: { provider: "furnace", type: "run", id: "frn-run-hostile" },
      kind: "native.status",
      presentation: { title: "Red evil Authorization: [REDACTED]", statusText: "RUNNING31m [REDACTED]", statusTone: "active" },
      evidenceRefs: ["ev-1"],
      subjectBasis: "sha-1",
      interval: { startedAt: clock(1) },
    });
    const hostileText = JSON.stringify(sanitized);
    expect(hostileText).not.toMatch(SPEC_UNSAFE);
    expect(hostileText).not.toContain("abc123");
    expect(hostileText).not.toContain("hostile-body");
    for (const value of strings(sanitized)) expect(value).not.toMatch(UNSAFE);

    // The module is a pure read model: no filesystem, process, network, provider or inline import.
    const source = readFileSync(new URL("../src/workbench/observe-query.ts", import.meta.url), "utf8");
    const imports = [...source.matchAll(/^import\s[^;]*?from\s+["']([^"']+)["']/gms)].map((match) => match[1]).sort();
    expect(imports).toEqual(["./capability-registry.js", "./observation.js", "./redaction.js"]);
    expect(source).not.toMatch(/node:(?:fs|child_process|net)|providers\/|\brequire\(|\bimport\(/);
  });

  it("O6 keeps scope isolation and read-only purity, and returns frozen, repeatable replies", () => {
    // docs/workbench/09-observation-and-provenance.md § "Data retention and privacy": "Tenant/workspace boundaries apply at correlation queries,
    // not just at individual SDK calls."
    // docs/workbench/02-atomic-requirements.md WB-030: "Layout, reducers, status classification and control capabilities are pure/testable without a real terminal."
    // docs/workbench/03-architecture-and-ownership.md § "Design constraints": "An observation is a read, not a claim to cancel/control; explicit
    // auth scope required for mutations."
    const view = new ObservationProjection();
    const run = ref("furnace", "frn-run-6");
    snapshot(view, run, "inv-o6", shown("RUNNING", "active", "Furnace Run frn-run-6"));
    snapshot(view, ref("forge", "gate-6"), "inv-o6", shown("FAILED", "failure", "Forge gate"), 1, { coverage: "partial" });
    view.relate({ scope: alice, from: run, to: ref("forge", "gate-6"), kind: "causation", provenance: { source: "trace" } });
    view.ingest({
      projectionEventId: "o6-1",
      source: ref("forge", "gate-6"),
      scope: alice,
      sourceSequence: 2,
      observedAt: clock(9),
      kind: "native.status",
      trace: { invocationId: "inv-o6" },
    });
    const selectors = { relations: true, events: { limit: 5 } };
    const { reader, calls, touched } = spy(view);
    const foreign = observeInvocation(reader, { scope: bob, invocationId: "inv-o6", selectors });
    expect(foreign.window).toMatchObject({ total: 0, returned: 0, nextCursor: null });
    expect(foreign.nodes).toEqual([]);
    expect(foreign.relations).toBeUndefined();
    expect(foreign.events).toBeUndefined();
    expect(calls.map((call) => call.method)).toEqual(["window"]);
    expect(foreign.freshness.summary).toBe("no nodes returned");
    expect(JSON.stringify(foreign)).not.toMatch(/frn-run-6|gate-6|alice/);

    const first = observeInvocation(reader, { scope: alice, invocationId: "inv-o6", selectors });
    const second = observeInvocation(reader, { scope: alice, invocationId: "inv-o6", selectors });
    expect(second).toEqual(first);
    expect(JSON.stringify(second)).toBe(JSON.stringify(first));
    expect(first.nodes).toHaveLength(2);
    expect(first.anomalies).toEqual({ disconnectedProviders: [], partialCompleteness: 1, eventGap: false, noRelationsAvailable: false });
    const allowed = new Set(["window", "relations", "events", "relationRevision", "stats"]);
    expect([...touched].filter((member) => !allowed.has(member))).toEqual([]);
    for (const mutator of ["ingest", "refresh", "relate", "markStale", "disconnect", "reconnect", "query", "indexOf"]) expect(touched.has(mutator)).toBe(false);
    expect((calls[0].input as { scope: ObservationScope }).scope).toEqual(bob);
    for (const call of calls.slice(1)) if (call.input !== undefined) expect((call.input as { scope: ObservationScope }).scope).toEqual(alice);

    expectDeepFrozen(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.nodes)).toBe(true);
    expect(Object.isFrozen(first.anomalies.disconnectedProviders)).toBe(true);
    expect(Object.isFrozen(onlyEvents(first).providers)).toBe(true);
    expect(() => (first.nodes as unknown as unknown[]).push({})).toThrow(TypeError);
    // Observing never mutates the projection.
    expect(view.stats()).toEqual({ nodes: 2, events: 1, edges: 1 });
    expect(observeInvocation(view, { scope: alice, invocationId: "inv-o6", selectors })).toEqual(first);
  });

  it("O7 reports measured counts of the returned window only, never estimates", () => {
    // docs/workbench/09-observation-and-provenance.md § "Aggregates and profiling": "Distinguish measured actual from estimated projected metrics."
    // docs/workbench/11-designer-and-operator.md § "First public Pi tools (proposed)": "workflow_observe(ref,selectors?,cursor?,limit?): bounded native
    // snapshot, event window, aggregates, freshness, anomaly evidence." and "Use compact structured schema, discover more capability detail on demand"
    const view = new ObservationProjection();
    for (let index = 0; index < 7; index++) snapshot(view, ref("forge", `m-${index}`), "inv-o7", shown("PASSED", "success"));
    const { reader, calls } = spy(view);
    const reply = observeInvocation(reader, { scope: alice, invocationId: "inv-o7", limit: 3, selectors: { relations: true, events: { limit: 2 } } });
    expect(reply.countsBasis).toBe("returned-window");
    expect(reply.aggregates).toBe("not-wired");
    const keys = keysOf(reply);
    for (const forbidden of ["estimate", "estimated", "criticalPath", "tokens", "cost"]) expect(keys.has(forbidden)).toBe(false);
    const read = calls.find((call) => call.method === "window")?.output as { total: number; revision: number } | undefined;
    expect(read).toBeDefined();
    expect(reply.window.total).toBe(read?.total);
    expect(reply.window.revision).toBe(read?.revision);
    expect(reply.window.total).toBe(7);
    expect(reply.freshness).toMatchObject({ current: 3, stale: 0, unknown: 0 });
  });

  it("filters each scanned page by tone and kind without skipping or repeating viewport rows, also when bytes trim a filtered page", () => {
    const view = new ObservationProjection();
    for (let index = 0; index < 10; index++) {
      const failed = index % 3 === 0;
      snapshot(view, ref("forge", `t-${index}`), "inv-filter", shown(failed ? "FAILED" : "PASSED", failed ? "failure" : "success"), 1, {
        kind: index % 2 === 1 ? "forge.gate" : "forge.build",
      });
    }
    const collect = (selectors: ObserveRequest["selectors"]): { ids: string[]; pages: ObserveReply[] } => {
      const pages: ObserveReply[] = [];
      let cursor: string | undefined;
      do {
        const reply = observeInvocation(view, { scope: alice, invocationId: "inv-filter", limit: 4, selectors, ...(cursor === undefined ? {} : { cursor }) });
        pages.push(reply);
        cursor = reply.window.nextCursor ?? undefined;
      } while (cursor !== undefined && pages.length < 10);
      return { ids: pages.flatMap((page) => page.nodes.map((node) => node.nativeRef.id)), pages };
    };
    const failures = collect({ tone: "failure" });
    expect(failures.ids).toEqual(["t-0", "t-3", "t-6", "t-9"]);
    expect(failures.pages.map((page) => [page.window.scanned, page.window.returned])).toEqual([
      [4, 2],
      [4, 1],
      [2, 1],
    ]);
    expect(failures.pages.every((page) => page.window.total === 10)).toBe(true);
    expect(collect({ kind: "forge.gate" }).ids).toEqual(["t-1", "t-3", "t-5", "t-7", "t-9"]);
    expect(collect({ tone: "failure", kind: "forge.gate" }).ids).toEqual(["t-3", "t-9"]);
    expect(collect({ tone: "waiting" }).ids).toEqual([]);
    expect(collect(undefined).ids).toHaveLength(10);

    // A byte trim of a filtered page points the cursor at the dropped node's own viewport row, so the next page starts there.
    const wide = new ObservationProjection();
    for (let index = 0; index < 4; index++) {
      const failed = index === 0 || index === 3;
      snapshot(wide, ref("forge", `w-${index}`), "inv-trim", shown(failed ? "FAILED" : "PASSED", failed ? "failure" : "success", `${index} ${"w".repeat(188)}`));
    }
    const filtered = { scope: alice, invocationId: "inv-trim", limit: 4, selectors: { tone: "failure" as const } };
    const roomy = observeInvocation(wide, filtered);
    expect(roomy.nodes.map((node) => node.nativeRef.id)).toEqual(["w-0", "w-3"]);
    const oneNode = observeInvocation(wide, { ...filtered, limit: 1 }).bytes;
    expect(oneNode).toBeGreaterThanOrEqual(1_024);
    const trimmed = observeInvocation(wide, { ...filtered, maxBytes: oneNode + 64 });
    expect(trimmed.nodes.map((node) => node.nativeRef.id)).toEqual(["w-0"]);
    expect(trimmed.window).toMatchObject({ scanned: 3, returned: 1, truncated: true });
    expect(trimmed.droppedForBytes).toEqual({ events: false, relations: false, nodes: 1 });
    const resumed = observeInvocation(wide, { ...filtered, cursor: trimmed.window.nextCursor ?? "" });
    expect(resumed.window.offset).toBe(3);
    expect(resumed.nodes.map((node) => node.nativeRef.id)).toEqual(["w-3"]);
  });

  it("validates every request field with typed validation errors and bounds the invocation so its largest cursor fits 256 bytes", () => {
    const view = new ObservationProjection();
    snapshot(view, ref("forge", "v"), "inv-v", shown("PASSED", "success"));
    const base = { scope: alice, invocationId: "inv-v" };
    const source = ref("forge", "v");
    const cases: [string, unknown, RegExp][] = [
      ["null request", null, /request/],
      ["array request", [], /request/],
      ["unknown request field", { ...base, selector: { relations: true } }, /Unknown observe request field/],
      ["missing scope", { invocationId: "inv-v" }, /scope/],
      ["scope without principal", { scope: { workspace: "ws-1" }, invocationId: "inv-v" }, /scope/],
      ["scope with control text", { scope: { workspace: "ws\u0000", principal: "alice" }, invocationId: "inv-v" }, /scope/],
      ["empty invocation", { scope: alice, invocationId: "" }, /invocationId/],
      ["control invocation", { scope: alice, invocationId: "inv\u0007" }, /invocationId/],
      ["zero-width invocation", { scope: alice, invocationId: "inv\u200b" }, /invocationId/],
      ["redactable invocation", { scope: alice, invocationId: "inv Bearer abc123" }, /invocationId/],
      ["numeric invocation", { scope: alice, invocationId: 7 }, /invocationId/],
      ["invocation beyond the cursor bound", { scope: alice, invocationId: "i".repeat(95) }, /invocationId/],
      ["numeric cursor", { ...base, cursor: 20 }, /cursor/],
      ["limit 0", { ...base, limit: 0 }, /limit/],
      ["limit 41", { ...base, limit: 41 }, /limit/],
      ["limit 1.5", { ...base, limit: 1.5 }, /limit/],
      ["limit text", { ...base, limit: "20" }, /limit/],
      ["selectors array", { ...base, selectors: [] }, /selectors/],
      ["selectors null", { ...base, selectors: null }, /selectors/],
      ["unknown selector", { ...base, selectors: { tones: "active" } }, /Unknown observe selector field/],
      ["unknown tone", { ...base, selectors: { tone: "running" } }, /tone/],
      ["empty kind", { ...base, selectors: { kind: "" } }, /kind/],
      ["relations text", { ...base, selectors: { relations: "yes" } }, /relations/],
      ["events without limit", { ...base, selectors: { events: {} } }, /event limit/],
      ["events limit 0", { ...base, selectors: { events: { limit: 0 } } }, /event limit/],
      ["events limit 41", { ...base, selectors: { events: { limit: 41 } } }, /event limit/],
      ["unknown event field", { ...base, selectors: { events: { limit: 2, cursor: "x" } } }, /Unknown observe event selector field/],
      ["after without id", { ...base, selectors: { events: { limit: 2, after: { source } } } }, /event cursor/],
      ["after with unknown field", { ...base, selectors: { events: { limit: 2, after: { source, projectionEventId: "e", at: 1 } } } }, /Unknown observe event cursor field/],
      ["after source without id", { ...base, selectors: { events: { limit: 2, after: { source: { provider: "forge", type: "run" }, projectionEventId: "e" } } } }, /event cursor/],
      ["after source with unknown field", { ...base, selectors: { events: { limit: 2, after: { source: { ...source, extra: 1 }, projectionEventId: "e" } } } }, /Unknown observe event cursor source field/],
      ["maxBytes text", { ...base, maxBytes: "16384" }, /maxBytes/],
    ];
    for (const [label, request, message] of cases) expectRefused(() => observeInvocation(view, request as ObserveRequest), message, "validation", label);
    // The longest invocation whose largest cursor still fits 256 bytes is accepted.
    expect(observeInvocation(view, { scope: alice, invocationId: "i".repeat(94) }).window.total).toBe(0);
    // Absent optional fields and an extended host scope object are accepted; only workspace and principal are read.
    const extendedScope = { ...alice, sessionId: "session-1" };
    const reply = observeInvocation(view, { scope: extendedScope, invocationId: "inv-v", cursor: undefined, limit: undefined, selectors: undefined, maxBytes: undefined });
    expect(reply.window).toMatchObject({ offset: 0, limit: 20, total: 1, returned: 1 });
  });

  it("measures bytes exactly, round-trips JSON losslessly and is already a fixed point of the shared JSON sanitizer", () => {
    const view = new ObservationProjection();
    snapshot(view, ref("forge", "secretive"), "inv-fixed", shown("RUNNING \u200bpassword=hunter2", "active", `token sk-ant-${"a".repeat(30)} \u202e${"y".repeat(400)}`), 1, {
      subjectBasis: "basis Authorization: Bearer zzz999",
      interval: { startedAt: clock(1), endedAt: clock(2) },
    });
    for (let index = 0; index < 5; index++) {
      view.ingest({
        projectionEventId: `k-${index}`,
        source: ref("forge", "secretive"),
        scope: alice,
        sourceSequence: index + 2,
        observedAt: clock(10 + index),
        kind: ["password", "Authorization", "native.status", "1", "__proto__"][index],
      });
    }
    const reply = observeInvocation(view, { scope: alice, invocationId: "inv-fixed", selectors: { relations: true, events: { limit: 10 } } });
    const text = JSON.stringify(reply);
    expect(reply.bytes).toBe(Buffer.byteLength(text));
    expect(sanitizeWorkbenchJsonText(reply)).toBe(text);
    expect(JSON.parse(text)).toEqual(reply);
    expectNoUndefined(reply);
    expect(text).not.toContain("hunter2");
    expect(text).not.toContain("zzz999");
    expect(text).not.toContain(`sk-ant-${"a".repeat(30)}`);
    expect(reply.nodes[0].presentation.title.length).toBeLessThanOrEqual(200);
    expect(reply.nodes[0].subjectBasis).toBe("basis Authorization: [REDACTED]");
    expect(reply.nodes[0].interval).toEqual({ startedAt: clock(1), endedAt: clock(2) });
    // Secret-named event kinds are counted under a redacted label, so every count stays a number; "__proto__" stays a plain own key.
    const kinds = onlyEvents(reply).kinds;
    expect(Object.entries(kinds).sort()).toEqual([
      ["1", 1],
      ["[REDACTED]", 2],
      ["__proto__", 1],
      ["native.status", 1],
    ]);
    expect(Object.values(kinds).every((count) => typeof count === "number")).toBe(true);

    // The shared redactor's second pass keeps the marker of a JSON-shaped secret and otherwise only over-redacts (wb-3l3,
    // docs/20 ruling 2): each string is still repeated through it until it settles, so the reply stays a fixed point and its
    // byte count stays exact. A bound that cuts a surrogate pair drops the orphaned half instead of emitting it.
    const settled = new ObservationProjection();
    snapshot(settled, ref("forge", "json-secret"), "inv-settle", shown("RUNNING", "active", 'config {"password":"x"} end'));
    const pair = String.fromCodePoint(0x1f600);
    snapshot(settled, ref("forge", "split-pair"), "inv-settle", shown("RUNNING", "active", `${"x".repeat(179)}${pair}${"y".repeat(50)}`));
    const settledReply = observeInvocation(settled, { scope: alice, invocationId: "inv-settle" });
    expect(settledReply.nodes.map((node) => node.presentation.title)).toEqual(['config {"password":[REDACTED]} end', `${"x".repeat(179)} [truncated]`]);
    const settledText = JSON.stringify(settledReply);
    expect(sanitizeWorkbenchJsonText(settledReply)).toBe(settledText);
    expect(settledReply.bytes).toBe(Buffer.byteLength(settledText));
    for (const value of strings(settledReply)) expect(/[\u{d800}-\u{dfff}]/u.test(value)).toBe(false);
  });

  it("makes an oversized single node an explicit empty page whose cursor repeats its position, and the worst-case skeleton fits 1024 bytes", () => {
    const view = new ObservationProjection();
    const evidenceRefs = Array.from({ length: 20 }, (_, index) => `evidence-${index}-${"e".repeat(240)}`);
    snapshot(view, ref("forge", "fat"), "inv-fat", shown("RUNNING", "active", "t".repeat(200)), 1, { evidenceRefs });
    const tight = observeInvocation(view, { scope: alice, invocationId: "inv-fat", maxBytes: 1_024, selectors: { relations: true, events: { limit: 40 } } });
    expect(tight.nodes).toEqual([]);
    expect(tight.window).toMatchObject({ offset: 0, scanned: 0, returned: 0, total: 1, truncated: true });
    expect(tight.truncatedForBytes).toBe(true);
    expect(tight.droppedForBytes).toEqual({ events: true, relations: true, nodes: 1 });
    expect(tight.bytes).toBeLessThanOrEqual(1_024);
    expect(tight.freshness.summary).toBe("no nodes returned");
    expect(cursorBody(tight.window.nextCursor).offset).toBe(0);
    const roomy = observeInvocation(view, { scope: alice, invocationId: "inv-fat", cursor: tight.window.nextCursor ?? "", maxBytes: 16_384 });
    expect(roomy.nodes.map((node) => node.nativeRef.id)).toEqual(["fat"]);
    expect(roomy.truncatedForBytes).toBe(false);

    // Worst case for the part that is never dropped: the longest accepted invocation, every counter at its largest value, a
    // full-length next cursor, an event gap and every droppable part dropped still fits the smallest cap.
    const worst = "i".repeat(94);
    const huge = Number.MAX_SAFE_INTEGER;
    const fat: ObservedNode = { ...stubNode("fat"), presentation: shown("RUNNING", "active", "t".repeat(200)), evidenceRefs };
    const stub: ObserveReader = {
      window: () => ({ nodes: [fat], total: huge, revision: huge }),
      relations: () => [],
      events: () => ({ events: [], truncated: true, completeness: "partial-gap" }),
      relationRevision: () => huge,
      stats: () => ({ nodes: 1, events: 0, edges: 0 }),
    };
    const opening = observeInvocation(stub, { scope: alice, invocationId: worst, maxBytes: 1_024 });
    const far = encoded({ ...cursorBody(opening.window.nextCursor), offset: huge - 41, revision: huge });
    const skeleton = observeInvocation(stub, { scope: alice, invocationId: worst, cursor: far, limit: 40, maxBytes: 1_024, selectors: { relations: true, events: { limit: 40 } } });
    expect(skeleton.nodes).toEqual([]);
    expect(skeleton.window).toMatchObject({ offset: huge - 41, scanned: 0, total: huge, revision: huge, truncated: true });
    expect(Buffer.byteLength(skeleton.window.nextCursor ?? "")).toBeGreaterThan(240);
    expect(skeleton.anomalies.eventGap).toBe(true);
    expect(skeleton.droppedForBytes).toEqual({ events: true, relations: true, nodes: 1 });
    expect(skeleton.bytes).toBeLessThanOrEqual(1_024);
    expect(Buffer.byteLength(JSON.stringify(skeleton))).toBe(skeleton.bytes);
  });

  it("withholds what a malformed reader hands over: foreign-scope rows, unknown enum values and relation kinds, oversized pages and invalid counters", () => {
    const own = stubNode("own");
    const foreignNode = stubNode("foreign", bob);
    const odd = {
      ...stubNode("odd"),
      freshness: "fresh",
      completeness: "total",
      sourceConnectionState: "online",
      presentation: { title: "Odd", type: "pipeline", statusText: "GREEN", statusTone: "green" },
    } as unknown as ObservedNode;
    const event = (id: string, scope: ObservationScope, provider: string): ObservationEvent => ({
      projectionEventId: id,
      source: ref(provider, id),
      scope,
      observedAt: clock(2),
      kind: "native.status",
    });
    const strange = { from: own.key, to: odd.key, kind: "influence", provenance: { source: "x" } } as unknown as Relation;
    const stub: ObserveReader = {
      window: () => ({ nodes: [own, foreignNode, odd], total: 3, revision: 4 }),
      relations: (input) => (input.from === own.key ? [{ from: own.key, to: odd.key, kind: "dependency", provenance: { source: "declared" } }, strange] : []),
      events: () => ({ events: [event("a", alice, "forge"), event("b", bob, "furnace")], truncated: false, completeness: "complete" }),
      relationRevision: () => 2,
      stats: () => ({ nodes: 3, events: 2, edges: 2 }),
    };
    const reply = observeInvocation(stub, { scope: alice, invocationId: "inv-stub", selectors: { relations: true, events: { limit: 5 } } });
    expect(reply.nodes.map((node) => node.nativeRef.id)).toEqual(["own", "odd"]);
    expect(reply.window).toMatchObject({ scanned: 3, returned: 2, total: 3, revision: 4 });
    expect(reply.nodes[1]).toMatchObject({
      freshness: "unknown",
      completeness: "unknown",
      sourceConnectionState: "unknown",
      presentation: { title: "Odd", type: "sdk-operation", statusText: "GREEN", statusTone: "unknown" },
    });
    expect(onlyRelations(reply).perNode).toEqual([
      { key: own.key, outgoing: { dependency: 1, causation: 0, ownership: 0, grouping: 0, hypothesis: 0 }, partial: true },
      { key: odd.key, outgoing: { dependency: 0, causation: 0, ownership: 0, grouping: 0, hypothesis: 0 }, partial: false },
    ]);
    expect(onlyEvents(reply)).toMatchObject({ returned: 1, providers: ["forge"], kinds: { "native.status": 1 } });
    expect(JSON.stringify(reply)).not.toMatch(/foreign|furnace|"bob"/);
    expect(reply.anomalies.noRelationsAvailable).toBe(false);
    // Rows of a kind this contract does not know are never counted as absence: the node is partial, not edge-free.
    const opaque = observeInvocation({ ...stub, relations: () => [strange] }, { scope: alice, invocationId: "inv-stub", selectors: { relations: true } });
    expect(onlyRelations(opaque).perNode.map((entry) => entry.partial)).toEqual([true, true]);
    expect(opaque.anomalies.noRelationsAvailable).toBe(false);

    // A page longer than the requested limit is cut to the limit.
    const long: ObserveReader = { ...stub, window: () => ({ nodes: Array.from({ length: 50 }, (_, index) => stubNode(`n-${index}`)), total: 50, revision: 1 }) };
    const cut = observeInvocation(long, { scope: alice, invocationId: "inv-stub", limit: 5 });
    expect(cut.nodes).toHaveLength(5);
    expect(cut.window).toMatchObject({ scanned: 5, returned: 5, nextCursor: expect.any(String) });

    // Counters that cannot round-trip through JSON are a reader fault, never a reply.
    for (const broken of [{ total: Number.NaN }, { total: -1 }, { revision: 1.5 }, { total: Number.POSITIVE_INFINITY }]) {
      const bad: ObserveReader = { ...stub, window: () => ({ nodes: [], total: 0, revision: 0, ...broken }) };
      expectRefused(() => observeInvocation(bad, { scope: alice, invocationId: "inv-stub" }), /invalid window/, "unavailable", JSON.stringify(broken));
    }
    const badRevision: ObserveReader = { ...stub, relationRevision: () => Number.NaN };
    expectRefused(() => observeInvocation(badRevision, { scope: alice, invocationId: "inv-stub", selectors: { relations: true } }), /invalid relation revision/, "unavailable");
  });

  it("cites requirement text that exists verbatim in docs/workbench", () => {
    const anchors: [string, string][] = [
      ["10-terminal-inspector.md", "Pi observation tools paginate/filter/limit and return compact JSON, never rendered ANSI."],
      ["02-atomic-requirements.md", "Pi can query bounded semantic observations without consuming raw event logs or terminal-rendered text."],
      ["09-observation-and-provenance.md", "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING"],
      ["09-observation-and-provenance.md", "it becomes last-known-running + stale. Pi tool summaries must communicate that nuance."],
      ["13-contracts-and-config.md", "Do not replace native status with presentation.statusTone. This is a read model only."],
      ["09-observation-and-provenance.md", "Event queries expose metadata and references without raw producer payloads."],
      ["09-observation-and-provenance.md", "Source-qualified cursor retention loss is explicitly partial-gap."],
      ["09-observation-and-provenance.md", "Missing edges do not imply independence."],
      ["02-atomic-requirements.md", "retrieve bounded event windows, source/evidence refs and compare two runs."],
      ["12-security.md", "Bound recursively nested JSON, bytes, array length, call count, response size and event rate."],
      ["14-qa-and-benchmarks.md", "Pi model tool response size under bounded queries"],
      ["09-observation-and-provenance.md", "Large/secret payload does not leak into Pi tool result or screen by default."],
      ["12-security.md", "Treat observed tool outputs as data, not instructions for Pi designer."],
      ["17-packaging-and-operations.md", "Hide/redact prompt/tool bodies by default."],
      ["09-observation-and-provenance.md", "Tenant/workspace boundaries apply at correlation queries, not just at individual SDK calls."],
      ["02-atomic-requirements.md", "Layout, reducers, status classification and control capabilities are pure/testable without a real terminal."],
      ["03-architecture-and-ownership.md", "An observation is a read, not a claim to cancel/control; explicit auth scope required for mutations."],
      ["09-observation-and-provenance.md", "Distinguish measured actual from estimated projected metrics."],
      ["11-designer-and-operator.md", "workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event window, aggregates, freshness, anomaly evidence."],
      ["11-designer-and-operator.md", "Use compact structured schema, discover more capability detail on demand"],
      ["15-implementation-program.md", "compact bounded result and ACL"],
    ];
    for (const [file, quote] of anchors) expect(readFileSync(new URL(`../docs/workbench/${file}`, import.meta.url), "utf8"), file).toContain(quote);
  });
});

/**
 * wb-752.2 respin (owner ruling 16:43Z, gate verdict U1/U2/F5): separators are normalized to ONE space before any deletion, so
 * deletion never precedes redaction. Every invisible input is built with String.fromCharCode (F11 seat rule), never typed raw.
 */
describe("workflow_observe reply builder: separators normalize before redaction (wb-752.2 respin)", () => {
  const at = (code: number): string => String.fromCharCode(code);
  const LF = at(0x0a);
  const TAB = at(0x09);
  const VT = at(0x0b);
  const FF = at(0x0c);
  const CR = at(0x0d);
  const LS = at(0x2028);
  const PS = at(0x2029);
  const ZWSP = at(0x200b);
  const BEL = at(0x07);
  const ESC = at(0x1b);
  const NBSP = at(0xa0);
  const IDEOGRAPHIC = at(0x3000);
  const CANARY = "LEAKCANARY0123456789";
  const SK = `sk-ant-${CANARY}`;
  const GH = `ghp_${CANARY}`;
  const TOK = `tok${CANARY}`;

  /** Gate probe shapes: the text is what a producer hands over; none of them may reach the reply with the canary intact. */
  const gateProbes: readonly (readonly [label: string, text: string])[] = [
    ["P1", `token: x${LF}${SK}`],
    ["P2", `see${LF}${GH}`],
    ["P3", `auth${LF}Bearer ${TOK}`],
    ["P4", `Bearer${TAB}${TOK}`],
    ["P5", `Basic${VT}${TOK}`],
    ["P6", `Authorization: Bearer${LF}${TOK}`],
    ["P7", `first part${CR}${LF}${SK}`],
    ["P7b", `form${FF}feed${FF}${GH}`],
    ["U1", `Authorization: Bearer${LS}${TOK}`],
    ["U2", `Authorization: Bearer${PS}${TOK}`],
    ["U4", `line${LS}${SK}`],
    ["U5", `x${LS}Bearer ${TOK}`],
    ["U6", `see${PS}${GH}`],
  ];
  /** Compositions the old order already redacted; they stay redacted (and the plain single-line shape keeps its meaning). */
  const controls: readonly (readonly [label: string, text: string])[] = [
    ["P8", `Authorization: Bea${ZWSP}rer ${TOK}`],
    ["P10", `Authorization: Bea${BEL}rer ${TOK}`],
    ["P11", `Authorization: ${ESC}[1mBearer${ESC}[0m ${TOK}`],
    ["P12", `Authorization: Bearer ${TOK}`],
    ["NBSP", `Authorization: Bearer${NBSP}${TOK}`],
    ["U+3000", `Authorization: Bearer${IDEOGRAPHIC}${TOK}`],
  ];

  function stubReader(node: ObservedNode, events?: ReturnType<ObserveReader["events"]>): ObserveReader {
    return {
      window: (filter) => ({ nodes: [node].slice(filter.offset, filter.offset + filter.limit), total: 1, revision: 1 }),
      relations: () => [],
      events: () => events ?? { events: [], truncated: false, completeness: "complete" },
      relationRevision: () => 0,
      stats: () => ({ nodes: 1, events: events?.events.length ?? 0, edges: 0 }),
    };
  }

  it("redacts every gate probe through a stub-reader title, and the plain shared sanitizer is the oracle that already redacts them", () => {
    for (const [label, text] of [...gateProbes, ...controls]) {
      if (gateProbes.some(([probe]) => probe === label)) expect(sanitizeWorkbenchText(text), `${label} oracle`).not.toContain(CANARY);
      const reply = observeInvocation(stubReader(stubNode("frn-probe", alice, shown("RUNNING", "active", text))), { scope: alice, invocationId: "frn-probe" });
      const title = reply.nodes[0].presentation.title;
      expect(title, label).not.toContain(CANARY);
      expect(title, label).toContain("[REDACTED]");
      expect(JSON.stringify(reply), label).not.toContain(CANARY);
    }
  });

  it("redacts the C0-separator probes through the REAL projection's snapshot.kind and the U+2028/U+2029/U+FEFF-free probes through titles", () => {
    // refresh() never validates kind, so C0 whitespace reaches the reply there; validText refuses C0 in titles but lets U+2028/U+2029 through.
    for (const [label, text] of gateProbes) {
      const view = new ObservationProjection();
      const invocationId = `inv-${label}`;
      const carriesLineSeparator = text.includes(LS) || text.includes(PS);
      snapshot(view, ref("forge", `probe-${label}`), invocationId, carriesLineSeparator ? shown("RUNNING", "active", text) : shown("RUNNING", "active", "plain"), 1, carriesLineSeparator ? {} : { kind: text });
      const reply = observeInvocation(view, { scope: alice, invocationId });
      expect(JSON.stringify(reply), label).not.toContain(CANARY);
      const node = reply.nodes[0];
      expect(carriesLineSeparator ? node.presentation.title : node.kind, label).toContain("[REDACTED]");
    }
  });

  it("redacts a separator-split credential in evidenceRefs, subjectBasis, nativeRef.id, event kind and event provider", () => {
    // wb-0br (owner ruling R1(a)): the real projection now refuses a line separator in nativeRef.id and in the event provider
    // as identity (typed refusals pinned in the next case), so the stub reader hands over exactly what the projection held
    // before the widening; every assertion below is unchanged.
    const glued = `Authorization: Bearer${LS}${TOK}`;
    const held: ObservedNode = {
      ...stubNode(`run${LS}Bearer ${TOK}`, alice, shown("RUNNING", "active", "fields")),
      evidenceRefs: [glued, `see${LS}${GH}`],
      subjectBasis: `x${LS}Bearer ${TOK}`,
    };
    const event: ObservationEvent = {
      projectionEventId: "evt-kind",
      source: ref(`prov${LS}Bearer ${TOK}`, "job-1"),
      scope: alice,
      sourceSequence: 1,
      observedAt: clock(2),
      kind: `native${LS}${SK}`,
      node: { presentation: shown("RUNNING", "active", "event") },
      trace: { invocationId: "inv-fields" },
    };
    const reader = stubReader(held, { events: [event], truncated: false, completeness: "complete" });
    const reply = observeInvocation(reader, { scope: alice, invocationId: "inv-fields", selectors: { events: { limit: 5 } } });
    const node = reply.nodes[0];
    expect(node.evidenceRefs.every((value) => value.includes("[REDACTED]"))).toBe(true);
    expect(node.subjectBasis).toContain("[REDACTED]");
    expect(node.nativeRef.id).toContain("[REDACTED]");
    const events = onlyEvents(reply);
    expect(Object.keys(events.kinds).every((kind) => kind.includes("[REDACTED]"))).toBe(true);
    expect(events.providers.every((provider) => provider.includes("[REDACTED]"))).toBe(true);
    expect(JSON.stringify(reply)).not.toContain(CANARY);
  });

  it("refuses a line separator in nativeRef.id and in the event provider as identity through the REAL projection, typed, and still redacts the evidenceRefs, subjectBasis and event kind it admits (wb-0br)", () => {
    const view = new ObservationProjection();
    const refused = view.refresh({
      source: ref("forge", `run${LS}Bearer ${TOK}`),
      scope: alice,
      capturedAt: clock(1),
      observedAt: clock(1),
      sequence: 1,
      node: shown("RUNNING", "active", "fields"),
      trace: { invocationId: "inv-fields" },
    });
    const event = (provider: string, projectionEventId: string): ObservationEvent => ({
      projectionEventId,
      source: ref(provider, "job-1"),
      scope: alice,
      sourceSequence: 1,
      observedAt: clock(2),
      kind: `native${LS}${SK}`,
      node: { presentation: shown("RUNNING", "active", "event") },
      trace: { invocationId: "inv-fields" },
    });
    expect([refused, view.ingest(event(`prov${LS}Bearer ${TOK}`, "evt-kind"))]).toStrictEqual(["refused", "refused"]);
    expect(view.identityRefusals({ scope: alice, limit: 10 })).toStrictEqual({
      refusals: [
        { path: "refresh", ref: "source", field: "id", codePoint: "U+2028", reason: "unsafe-identity" },
        { path: "ingest", ref: "source", field: "provider", codePoint: "U+2028", reason: "unsafe-identity" },
      ],
      total: 2,
      truncated: false,
    });
    expect(view.stats()).toStrictEqual({ nodes: 0, events: 0, edges: 0 });
    // The same separator-split text outside identity still passes the real projection, and the reply still redacts it.
    snapshot(view, ref("forge", "run-clean"), "inv-fields", shown("RUNNING", "active", "fields"), 1, {
      evidenceRefs: [`Authorization: Bearer${LS}${TOK}`, `see${LS}${GH}`],
      subjectBasis: `x${LS}Bearer ${TOK}`,
    });
    expect(view.ingest(event("prov", "evt-kind-clean"))).toBe("applied");
    const reply = observeInvocation(view, { scope: alice, invocationId: "inv-fields", selectors: { events: { limit: 5 } } });
    const held = reply.nodes.find((node) => node.nativeRef.id === "run-clean");
    expect(held?.evidenceRefs.every((value) => value.includes("[REDACTED]"))).toBe(true);
    expect(held?.subjectBasis).toContain("[REDACTED]");
    expect(Object.keys(onlyEvents(reply).kinds).every((kind) => kind.includes("[REDACTED]"))).toBe(true);
    expect(JSON.stringify(reply)).not.toContain(CANARY);
  });

  it("maps a run of separators to one space so adjacent words are not fused (U2)", () => {
    const run = `${CR}${LF}${TAB}${VT}${FF}${LS}${PS}`;
    const reply = observeInvocation(stubReader(stubNode("frn-words", alice, shown("RUNNING", "active", `line one${LF}line two${run}line three`))), { scope: alice, invocationId: "frn-words" });
    expect(reply.nodes[0].presentation.title).toBe("line one line two line three");
  });

  it("keeps the deletion of zero-width and control characters inside a word (they are not separators)", () => {
    const reply = observeInvocation(stubReader(stubNode("frn-glue", alice, shown("RUNNING", "active", `ab${ZWSP}cd${BEL}ef`))), { scope: alice, invocationId: "frn-glue" });
    expect(reply.nodes[0].presentation.title).toBe("abcdef");
  });

  it("settles without a fallback: no MAX_PASSES withheld-whole branch exists and every output is a fixed point of the shared sanitizer", () => {
    const source = readFileSync(new URL("../src/workbench/observe-query.ts", import.meta.url), "utf8");
    expect(source).not.toContain("MAX_PASSES");
    const parts = ["Bearer", " ", LF, LS, ZWSP, "tok", "sk-ant-", "ghp_", "Bea", "rer", BEL, TAB, "password", ":", "=", "x", ESC, "[1m", "[0m", PS, "abc"];
    let seed = 0x2f6e2b1;
    const next = (): number => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed;
    };
    for (let trial = 0; trial < 1_500; trial++) {
      let text = "";
      for (let index = 0, length = 2 + (next() % 10); index < length; index++) text += parts[next() % parts.length];
      const title = observeInvocation(stubReader(stubNode("frn-fuzz", alice, shown("RUNNING", "active", text))), { scope: alice, invocationId: "frn-fuzz" }).nodes[0].presentation.title;
      expect(sanitizeWorkbenchText(title, 200), `trial ${trial}`).toBe(title);
    }
  });
});
