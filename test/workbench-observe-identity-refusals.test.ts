/**
 * wb-86q (the wb-0br F5 follow-up): workflow_observe surfaces the projection's typed identity refusals behind the grant the
 * tool already checks. Quoted from the bead:
 *   "expose the typed identityRefusals() projection (0br's UNSAFE_IDENTITY_UNIT typed refusal rows, row 414 F1/C3) through
 *   the workflow_observe surface, gated by the existing grant mechanism; red-first rows through the real projection (typed
 *   identityRefusals row + absent row + secret absence), structural reader keeping presence/redaction assertions; W19
 *   input-hygiene wording only."
 * And from the wb-0br record it follows: "F2 the rows are not yet surfaced: workflow_observe (observe-query.ts ObserveReader
 * Pick) does not read identityRefusals(); wiring is a follow-up under the F6 rule (closed vocabulary, so no sanitizer site)."
 *
 * Three parts. R: the reply builder over REAL ObservationProjection instances, whose own admission refuses each hostile
 * identity (typed row, absent row, secret absence, scope isolation, paging, the byte cap). S: a typed structural reader
 * where a reader must hand over what the projection never produces (rows outside the closed vocabulary, broken counters).
 * T: the REGISTERED tool on the REAL extension: the grant gate, the advertised selector and one refusal read back. Every
 * credential-shaped literal is an obvious fake, and every invisible code point is built with String.fromCodePoint.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type IdentityRefusal,
  MAX_IDENTITY_REFUSALS,
  type NativeRef,
  type ObservationEvent,
  ObservationProjection,
  type ObservationScope,
  type ObservedNode,
  type Presentation,
} from "../src/workbench/observation.js";
import { OBSERVE_MAX_LIMIT, type ObserveReader, type ObserveReply, type ObserveRequest, observeInvocation } from "../src/workbench/observe-query.js";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const cp = (code: number): string => String.fromCodePoint(code);
const ZWSP = cp(0x200b);
const LS = cp(0x2028);
const BOM = cp(0xfeff);
const ESC = cp(0x1b);
/** An obviously fake credential marker: no reply text may ever carry it. */
const FAKE = "FAKE86QTOKENNOTREAL";
const BEARER = `Bearer ${FAKE}`;

const alice: ObservationScope = { workspace: "ws-86q", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-86q", principal: "bob" };
const INVOCATION = "inv-86q";
const clock = (second: number): string => new Date(Date.UTC(2026, 9, 26) + second * 1000).toISOString();
const ref = (provider: string, id: string, type = "run"): NativeRef => ({ provider, type, id });
const shown = (statusText: string, statusTone: Presentation["statusTone"]): Presentation => ({
  title: `Native ${statusText}`,
  type: "sdk-operation",
  statusText,
  statusTone,
});
const row = (path: IdentityRefusal["path"], at: IdentityRefusal["ref"], field: IdentityRefusal["field"], codePoint: string): IdentityRefusal => ({
  path,
  ref: at,
  field,
  codePoint,
  reason: "unsafe-identity",
});
/** Control, bidi, line-separator and default-ignorable units: none may reach any string of a reply. */
function keepsUnsafeUnit(text: string): boolean {
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (code < 0x20 || (code >= 0x7f && code <= 0x9f) || code === 0x2028 || code === 0x2029 || /\p{Default_Ignorable_Code_Point}/u.test(char)) return true;
  }
  return false;
}

/** One admitted node of the invocation, so its window is not empty. */
function admitted(view: ObservationProjection, id: string, scope: ObservationScope = alice, invocationId = INVOCATION): void {
  const outcome = view.refresh({
    source: ref("forge", id),
    scope,
    capturedAt: clock(1),
    observedAt: clock(1),
    sequence: 1,
    node: shown("RUNNING", "active"),
    trace: { invocationId },
  });
  expect(outcome).toBe("applied");
}

function hostileEvent(projectionEventId: string, source: NativeRef, scope: ObservationScope = alice, invocationId = INVOCATION): ObservationEvent {
  return {
    projectionEventId,
    source,
    scope,
    sourceSequence: 1,
    observedAt: clock(2),
    kind: "native.status",
    node: { presentation: shown("RUNNING", "active") },
    trace: { invocationId },
  };
}

/** The four admission paths, each refused for its identity by the real projection, each hostile part carrying the fake credential. */
function refuseOnEveryPath(view: ObservationProjection, scope: ObservationScope = alice): void {
  expect(view.ingest(hostileEvent("e-ingest", ref("forge", `run${ZWSP}${BEARER}`), scope))).toBe("refused");
  expect(
    view.refresh({
      source: ref(`forge${LS}${BEARER}`, "run-2"),
      scope,
      capturedAt: clock(3),
      observedAt: clock(3),
      sequence: 1,
      node: shown("RUNNING", "active"),
      trace: { invocationId: INVOCATION },
    }),
  ).toBe("refused");
  view.relate({ scope, from: ref("forge", "run-ok"), to: ref("forge", "run-3", `op${BOM}${BEARER}`), kind: "dependency", provenance: { source: "trace" } });
  view.markStale({ scope, ref: { provider: "forge", type: "run", id: "run-4", scope: `ws${ZWSP}${BEARER}` } });
}

const EVERY_PATH: readonly IdentityRefusal[] = [
  row("ingest", "source", "id", "U+200B"),
  row("refresh", "source", "provider", "U+2028"),
  row("relate", "to", "type", "U+FEFF"),
  row("markStale", "ref", "scope", "U+200B"),
];

function observe(reader: ObserveReader, request: Omit<ObserveRequest, "invocationId"> & { invocationId?: string }): ObserveReply {
  return observeInvocation(reader, { invocationId: INVOCATION, ...request });
}

/** Record every reader member the builder touches; methods still run against the real projection. */
function spied(target: ObservationProjection): { reader: ObservationProjection; touched: Set<string>; inputs: Map<string, unknown[]> } {
  const touched = new Set<string>();
  const inputs = new Map<string, unknown[]>();
  const reader = new Proxy(target, {
    get(object, property) {
      const member = String(property);
      touched.add(member);
      const value: unknown = Reflect.get(object, property, object);
      if (typeof value !== "function") return value;
      return (...args: unknown[]): unknown => {
        inputs.set(member, [...(inputs.get(member) ?? []), args[0]]);
        return Reflect.apply(value, object, args);
      };
    },
  });
  return { reader, touched, inputs };
}

function refusedWith(run: () => unknown, category: CapabilityError["category"], message: RegExp): void {
  let caught: unknown;
  try {
    run();
  } catch (error) {
    caught = error;
  }
  expect(caught, message.source).toBeInstanceOf(CapabilityError);
  if (!(caught instanceof CapabilityError)) return;
  expect(caught.category, message.source).toBe(category);
  expect(caught.message, message.source).toMatch(message);
}

describe("workflow_observe identity refusals through the REAL projection (wb-86q)", () => {
  it("typed row: each admission path's refusal comes back as the projection's own typed row, oldest first, with the scope total", () => {
    const view = new ObservationProjection();
    admitted(view, "run-ok");
    refuseOnEveryPath(view);
    const reply = observe(view, { scope: alice, selectors: { identityRefusals: { limit: 10 } } });
    expect(reply.identityRefusals).toStrictEqual({ returned: 4, total: 4, truncated: false, unrecognized: 0, rows: EVERY_PATH, basis: "scope-refusal-window" });
    // The builder returns exactly the projection's rows: the same closed vocabulary, never a rewording of it.
    expect(reply.identityRefusals?.rows).toStrictEqual(view.identityRefusals({ scope: alice, limit: 10 }).refusals);
    // The refused inputs admitted nothing: the window holds the one clean node only.
    expect(reply.nodes.map(node => node.nativeRef.id)).toEqual(["run-ok"]);
    expect(reply.droppedForBytes).toStrictEqual({ events: false, identityRefusals: false, relations: false, nodes: 0 });
    expect(Object.isFrozen(reply.identityRefusals)).toBe(true);
    expect(Object.isFrozen(reply.identityRefusals?.rows[0])).toBe(true);
  });

  it("secret absence: no reply text carries the refused identity text, its fake credential or any unsafe unit, and the reply is a fixed point of the shared JSON sanitizer", () => {
    const view = new ObservationProjection();
    admitted(view, "run-ok");
    refuseOnEveryPath(view);
    const reply = observe(view, { scope: alice, selectors: { identityRefusals: { limit: 10 } } });
    const text = JSON.stringify(reply);
    expect(reply.identityRefusals?.returned).toBe(4);
    expect(text).not.toContain(FAKE);
    expect(text).not.toContain("Bearer");
    expect(keepsUnsafeUnit(text)).toBe(false);
    expect(sanitizeWorkbenchJsonText(reply)).toBe(text);
    expect(Buffer.byteLength(text, "utf8")).toBe(reply.bytes);
  });

  it("absent row: without the selector the reply is byte-identical to one over a projection that refused nothing, and the builder never reads the refusals", () => {
    const refusing = new ObservationProjection();
    admitted(refusing, "run-ok");
    refuseOnEveryPath(refusing);
    const clean = new ObservationProjection();
    admitted(clean, "run-ok");
    const { reader, touched } = spied(refusing);
    const request = { scope: alice, selectors: { relations: true, events: { limit: 5 } } } as const;
    const reply = observe(reader, request);
    expect(JSON.stringify(reply)).toBe(JSON.stringify(observe(clean, request)));
    expect("identityRefusals" in reply).toBe(false);
    expect("identityRefusals" in reply.droppedForBytes).toBe(false);
    expect(touched.has("identityRefusals")).toBe(false);
    expect(JSON.stringify(reply)).not.toContain(FAKE);
  });

  it("absent row: asked for in a scope that refused nothing, the section says so with zero counts and no rows", () => {
    const view = new ObservationProjection();
    admitted(view, "run-ok");
    const reply = observe(view, { scope: alice, selectors: { identityRefusals: { limit: 5 } } });
    expect(reply.identityRefusals).toStrictEqual({ returned: 0, total: 0, truncated: false, unrecognized: 0, rows: [], basis: "scope-refusal-window" });
  });

  it("scope isolation: one principal's refusals and total never show in another's reply, and the reader is asked for the request scope only", () => {
    const view = new ObservationProjection();
    admitted(view, "run-ok");
    admitted(view, "run-bob", bob);
    refuseOnEveryPath(view, bob);
    expect(view.ingest(hostileEvent("e-alice", ref(`forge${ESC}`, "run-5")))).toBe("refused");
    const { reader, inputs } = spied(view);
    const own = observe(reader, { scope: alice, selectors: { identityRefusals: { limit: 10 } } });
    expect(own.identityRefusals).toMatchObject({ returned: 1, total: 1, rows: [row("ingest", "source", "provider", "U+001B")] });
    expect(inputs.get("identityRefusals")).toEqual([{ scope: alice, limit: 10 }]);
    const theirs = observe(view, { scope: bob, selectors: { identityRefusals: { limit: 10 } } });
    expect(theirs.identityRefusals).toMatchObject({ returned: 4, total: 4, rows: EVERY_PATH });
  });

  it("an invocation whose every admission was refused still shows the rows that explain its empty window", () => {
    const view = new ObservationProjection();
    expect(view.ingest(hostileEvent("e-only", ref("forge", `run${ZWSP}${BEARER}`)))).toBe("refused");
    const reply = observe(view, { scope: alice, selectors: { identityRefusals: { limit: 5 } } });
    expect(reply.window).toMatchObject({ total: 0, returned: 0 });
    expect(reply.nodes).toEqual([]);
    expect(reply.identityRefusals).toMatchObject({ returned: 1, total: 1, rows: [row("ingest", "source", "id", "U+200B")] });
  });

  it("pages by the selector limit, and past the projection's retention the total keeps counting while the oldest retained rows come first", () => {
    const view = new ObservationProjection();
    admitted(view, "run-ok");
    refuseOnEveryPath(view);
    expect(observe(view, { scope: alice, selectors: { identityRefusals: { limit: 2 } } }).identityRefusals).toStrictEqual({
      returned: 2,
      total: 4,
      truncated: true,
      unrecognized: 0,
      rows: EVERY_PATH.slice(0, 2),
      basis: "scope-refusal-window",
    });
    const many = new ObservationProjection();
    admitted(many, "run-ok");
    const refused = MAX_IDENTITY_REFUSALS + 44;
    for (let index = 0; index < refused; index++) {
      const unit = index < 44 ? ZWSP : LS;
      expect(many.ingest(hostileEvent(`e-${index}`, ref("forge", `run-${index}${unit}`)))).toBe("refused");
    }
    const page = observe(many, { scope: alice, selectors: { identityRefusals: { limit: OBSERVE_MAX_LIMIT } } }).identityRefusals;
    expect(page).toMatchObject({ returned: OBSERVE_MAX_LIMIT, total: refused, truncated: true, unrecognized: 0 });
    // The 44 oldest (U+200B) rows were dropped by the projection's own bound; the oldest retained row leads the page.
    expect(page?.rows.every(entry => entry.codePoint === "U+2028")).toBe(true);
  });

  it("refuses a malformed identityRefusals selector typed, before any projection read", () => {
    const view = new ObservationProjection();
    admitted(view, "run-ok");
    for (const selector of [true, null, [], {}, { limit: 0 }, { limit: OBSERVE_MAX_LIMIT + 1 }, { limit: 1.5 }, { limit: "5" }, { limit: Number.NaN }]) {
      refusedWith(() => observe(view, { scope: alice, selectors: { identityRefusals: selector } as unknown as ObserveRequest["selectors"] }), "validation", /identityRefusals/);
    }
    refusedWith(
      () => observe(view, { scope: alice, selectors: { identityRefusals: { limit: 5, after: "x" } } as unknown as ObserveRequest["selectors"] }),
      "validation",
      /Unknown observe identity refusal selector field/,
    );
  });

  it("over the byte cap the reply drops events, then identity refusals, then relations, then nodes, and says so", () => {
    const view = new ObservationProjection({ maxEvents: 4_096 });
    for (let index = 0; index < 40; index++) admitted(view, `run-${String(index).padStart(2, "0")}`);
    for (let index = 0; index < 40; index++) {
      expect(view.ingest({ ...hostileEvent(`ok-${index}`, ref("forge", `run-${String(index).padStart(2, "0")}`)), sourceSequence: 2, kind: `native.kind-${index}` })).toBe("applied");
      expect(view.ingest(hostileEvent(`e-${index}`, ref("forge", `bad-${index}${ZWSP}`)))).toBe("refused");
    }
    const selectors = { relations: true, events: { limit: 40 }, identityRefusals: { limit: 40 } } as const;
    const roomy = observe(view, { scope: alice, limit: 40, maxBytes: 65_536, selectors });
    expect(roomy.truncatedForBytes).toBe(false);
    expect(roomy.identityRefusals?.returned).toBe(40);
    const sizes = (reply: ObserveReply) => ({ events: reply.events !== undefined, identityRefusals: reply.identityRefusals !== undefined, relations: reply.relations !== undefined });
    const withoutEvents = observe(view, { scope: alice, limit: 40, maxBytes: roomy.bytes - 1, selectors });
    expect(sizes(withoutEvents)).toEqual({ events: false, identityRefusals: true, relations: true });
    expect(withoutEvents.droppedForBytes).toStrictEqual({ events: true, identityRefusals: false, relations: false, nodes: 0 });
    const withoutRefusals = observe(view, { scope: alice, limit: 40, maxBytes: withoutEvents.bytes - 1, selectors });
    expect(sizes(withoutRefusals)).toEqual({ events: false, identityRefusals: false, relations: true });
    expect(withoutRefusals.droppedForBytes).toStrictEqual({ events: true, identityRefusals: true, relations: false, nodes: 0 });
    const withoutRelations = observe(view, { scope: alice, limit: 40, maxBytes: withoutRefusals.bytes - 1, selectors });
    expect(sizes(withoutRelations)).toEqual({ events: false, identityRefusals: false, relations: false });
    expect(withoutRelations.droppedForBytes).toStrictEqual({ events: true, identityRefusals: true, relations: true, nodes: 0 });
    const tight = observe(view, { scope: alice, limit: 40, maxBytes: 1_024, selectors });
    expect(tight.truncatedForBytes).toBe(true);
    expect(tight.droppedForBytes).toMatchObject({ events: true, identityRefusals: true, relations: true });
    expect(tight.droppedForBytes.nodes).toBeGreaterThan(0);
    // Refusals alone dropped, every node kept: the drop is still reported, never silent.
    const refusalsOnly = { identityRefusals: { limit: 40 } } as const;
    const whole = observe(view, { scope: alice, limit: 1, maxBytes: 65_536, selectors: refusalsOnly });
    const refusalsDropped = observe(view, { scope: alice, limit: 1, maxBytes: whole.bytes - 1, selectors: refusalsOnly });
    expect(whole.identityRefusals?.returned).toBe(40);
    expect(refusalsDropped.identityRefusals).toBeUndefined();
    expect(refusalsDropped.nodes).toHaveLength(1);
    expect(refusalsDropped.truncatedForBytes).toBe(true);
    expect(refusalsDropped.droppedForBytes).toStrictEqual({ events: false, identityRefusals: true, relations: false, nodes: 0 });
    expect(tight.bytes).toBeLessThanOrEqual(1_024);
  });

  it("the never-dropped skeleton still fits the smallest cap when the selector is given (worst-case invocation, counters and cursor)", () => {
    const huge = Number.MAX_SAFE_INTEGER;
    const worst = "i".repeat(94);
    const fat: ObservedNode = {
      key: JSON.stringify([alice.workspace, alice.principal, "forge", "run", "", "fat"]),
      nativeRef: ref("forge", "fat"),
      scope: alice,
      sourceKind: "observed",
      observedAt: clock(1),
      sourceConnectionState: "connected",
      freshness: "current",
      completeness: "complete",
      presentation: { ...shown("RUNNING", "active"), title: "t".repeat(200) },
      kind: "forge.run",
      evidenceRefs: [],
    };
    const stub: ObserveReader = {
      window: () => ({ nodes: [fat], total: huge, revision: huge }),
      relations: () => [],
      events: () => ({ events: [], truncated: true, completeness: "partial-gap" }),
      relationRevision: () => huge,
      stats: () => ({ nodes: 1, events: 0, edges: 0 }),
      identityRefusals: () => ({ refusals: Array.from({ length: 40 }, () => row("markStale", "source", "provider", "U+E0FFF")), total: huge, truncated: true }),
    };
    const opening = observeInvocation(stub, { scope: alice, invocationId: worst, maxBytes: 1_024 });
    const body: unknown = JSON.parse(Buffer.from(opening.window.nextCursor ?? "", "base64url").toString("utf8"));
    const far = Buffer.from(JSON.stringify({ ...(body as Record<string, unknown>), offset: huge - 41, revision: huge }), "utf8").toString("base64url");
    const skeleton = observeInvocation(stub, {
      scope: alice,
      invocationId: worst,
      cursor: far,
      limit: 40,
      maxBytes: 1_024,
      selectors: { relations: true, events: { limit: 40 }, identityRefusals: { limit: 40 } },
    });
    expect(skeleton.nodes).toEqual([]);
    expect(skeleton.identityRefusals).toBeUndefined();
    expect(skeleton.droppedForBytes).toStrictEqual({ events: true, identityRefusals: true, relations: true, nodes: 1 });
    expect(skeleton.bytes).toBeLessThanOrEqual(1_024);
    expect(Buffer.byteLength(JSON.stringify(skeleton))).toBe(skeleton.bytes);
  });
});

describe("workflow_observe identity refusals through a structural reader (wb-86q)", () => {
  const node: ObservedNode = {
    key: JSON.stringify([alice.workspace, alice.principal, "forge", "run", "", "run-ok"]),
    nativeRef: ref("forge", "run-ok"),
    scope: alice,
    sourceKind: "observed",
    observedAt: clock(1),
    sourceConnectionState: "connected",
    freshness: "current",
    completeness: "complete",
    presentation: shown("RUNNING", "active"),
    kind: "forge.run",
    evidenceRefs: [],
  };
  const base: ObserveReader = {
    window: () => ({ nodes: [node], total: 1, revision: 1 }),
    relations: () => [],
    events: () => ({ events: [], truncated: false, completeness: "complete" }),
    relationRevision: () => 0,
    stats: () => ({ nodes: 1, events: 0, edges: 0 }),
  };
  const reading = (refusals: unknown, total: unknown = Array.isArray(refusals) ? refusals.length : 0, truncated: unknown = false): ObserveReader => ({
    ...base,
    identityRefusals: () => ({ refusals, total, truncated }) as unknown as ReturnType<ObservationProjection["identityRefusals"]>,
  });

  it("presence: rows outside the closed vocabulary are withheld and counted, never repaired, and nothing they carry reaches the reply", () => {
    const valid = row("ingest", "source", "id", "U+200B");
    const hostile: unknown[] = [
      { ...valid, path: `ingest${ESC}[31m` },
      { ...valid, ref: BEARER },
      { ...valid, field: "password" },
      { ...valid, codePoint: "U+0041" },
      { ...valid, codePoint: `U+200B ${BEARER}` },
      { ...valid, codePoint: "U+0200B" },
      { ...valid, codePoint: "U+110000" },
      { ...valid, codePoint: "u+200b" },
      { ...valid, reason: `unsafe-identity ${BEARER}` },
      null,
      `${BEARER}`,
      [valid],
    ];
    const extra = { ...row("relate", "from", "scope", "U+D800"), text: `${ZWSP}${BEARER}` };
    const reply = observe(reading([valid, ...hostile, extra], 20), { scope: alice, selectors: { identityRefusals: { limit: 20 } } });
    expect(reply.identityRefusals).toStrictEqual({
      returned: 2,
      total: 20,
      truncated: false,
      unrecognized: hostile.length,
      rows: [valid, row("relate", "from", "scope", "U+D800")],
      basis: "scope-refusal-window",
    });
    const text = JSON.stringify(reply);
    expect(text).not.toContain(FAKE);
    expect(text).not.toContain("password");
    expect(keepsUnsafeUnit(text)).toBe(false);
    expect(sanitizeWorkbenchJsonText(reply)).toBe(text);
  });

  it("an oversized page is cut to the selector limit and reported truncated; a reader's own truncated flag is carried", () => {
    const rows = Array.from({ length: 50 }, () => row("refresh", "source", "type", "U+2066"));
    expect(observe(reading(rows, 50), { scope: alice, selectors: { identityRefusals: { limit: 5 } } }).identityRefusals).toMatchObject({ returned: 5, total: 50, truncated: true });
    expect(observe(reading(rows.slice(0, 3), 9, true), { scope: alice, selectors: { identityRefusals: { limit: 5 } } }).identityRefusals).toMatchObject({ returned: 3, total: 9, truncated: true });
    expect(observe(reading(rows.slice(0, 3), 3, "yes"), { scope: alice, selectors: { identityRefusals: { limit: 5 } } }).identityRefusals).toMatchObject({ truncated: false });
  });

  it("a reader that cannot answer, or answers counters JSON cannot carry, is refused typed unavailable; without the selector the same reader still serves", () => {
    refusedWith(() => observe(base, { scope: alice, selectors: { identityRefusals: { limit: 5 } } }), "unavailable", /identity refusal/);
    expect(observe(base, { scope: alice }).nodes).toHaveLength(1);
    const two = [row("ingest", "source", "id", "U+200B"), row("ingest", "source", "id", "U+200B")];
    for (const total of [Number.NaN, -1, 1.5, "2", null, 1]) {
      refusedWith(() => observe(reading(two, total), { scope: alice, selectors: { identityRefusals: { limit: 5 } } }), "unavailable", /identity refusal total/);
    }
    for (const refusals of [undefined, null, "rows", { length: 1 }]) {
      refusedWith(() => observe(reading(refusals, 0), { scope: alice, selectors: { identityRefusals: { limit: 5 } } }), "unavailable", /identity refusal page/);
    }
  });
});

/** The registered tool's reply: the task-level envelope beside the builder's ObserveReply. */
interface ObservedReply extends ObserveReply {
  readonly taskId: string;
  readonly status: string;
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
});

const TIMEOUT = 60_000;

async function boot(rights: string[]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: rights } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context };
}
type Booted = Awaited<ReturnType<typeof boot>>;

async function waitFor(predicate: () => boolean): Promise<void> {
  for (let i = 0; i < 600; i++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("workflow did not settle in the test window");
}

/** One failing-but-journaled forge node run to completion through the registered SubagentWorkflow; returns its task id. */
async function oneNodeRun(booted: Booted): Promise<string> {
  const script = 'export const meta={name:"refusal-probe",description:"local"}; try { await node("forge.gate.status",{}, {label:"n0"}); } catch (e) {}';
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, booted.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
  await waitFor(() => booted.pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId)));
  return taskId;
}

async function observeText(booted: Booted, params: Record<string, unknown>): Promise<string> {
  return textOf(await booted.pi.tools.get("workflow_observe").execute("o", params, undefined, undefined, booted.context as ExtensionContext));
}

describe("the registered workflow_observe tool surfaces identity refusals under its existing grant (wb-86q)", () => {
  it(
    "denied: without workbench:observe the selector answers the unchanged permission refusal and the projection's refusals are never read",
    async () => {
      // docs/workbench/12-security.md § "Authorization design": "Separate discover, inspect, observe, invoke and control grants."
      const reads = vi.spyOn(ObservationProjection.prototype, "identityRefusals");
      const denied = await boot([]);
      expect(await observeText(denied, { taskId: "wf_abcdef123456", selectors: { identityRefusals: { limit: 5 } } })).toBe("Permission denied: workbench:observe grant required.");
      expect(reads).not.toHaveBeenCalled();
    },
    TIMEOUT,
  );

  it(
    "granted: a refusal admitted by the extension's own projection comes back typed through the registered tool, its refused text absent",
    async () => {
      const booted = await boot(["workbench:observe", "furnace:inspect"]);
      const id = await oneNodeRun(booted);
      // The projection the registered tool reads, reached through a call-through spy's recorded receiver: no stub, no replaced module.
      const windows = vi.spyOn(ObservationProjection.prototype, "window");
      const before = JSON.parse(await observeText(booted, { taskId: id })) as ObservedReply;
      expect(before).not.toHaveProperty("identityRefusals");
      const projection: unknown = windows.mock.contexts[0];
      const scope = windows.mock.calls[0]?.[0].scope;
      if (!(projection instanceof ObservationProjection) || scope === undefined) throw new Error("the registered tool read no projection window");
      expect(projection.ingest(hostileEvent("e-tool", ref("forge", `op${ZWSP}${BEARER}`), scope, id))).toBe("refused");
      const text = await observeText(booted, { taskId: id, selectors: { identityRefusals: { limit: 5 } } });
      const reply = JSON.parse(text) as ObservedReply;
      expect(reply).toMatchObject({ contract: "workbench.observe/v1", taskId: id });
      expect(reply.identityRefusals).toStrictEqual({ returned: 1, total: 1, truncated: false, unrecognized: 0, rows: [row("ingest", "source", "id", "U+200B")], basis: "scope-refusal-window" });
      expect(text).not.toContain(FAKE);
      expect(keepsUnsafeUnit(text)).toBe(false);
      // Absent row through the tool: the same task read without the selector carries no section.
      expect(JSON.parse(await observeText(booted, { taskId: id })) as ObservedReply).not.toHaveProperty("identityRefusals");
      expect(await observeText(booted, { taskId: id, selectors: { identityRefusals: { limit: OBSERVE_MAX_LIMIT + 1 } } })).toMatch(/^Invalid observe request: /);
    },
    TIMEOUT,
  );

  it(
    "the registration advertises selectors.identityRefusals with its limit bound from OBSERVE_MAX_LIMIT",
    async () => {
      const booted = await boot(["workbench:observe"]);
      const parameters: unknown = booted.pi.tools.get("workflow_observe")?.parameters;
      const selectors = (parameters as { properties?: { selectors?: { properties?: Record<string, unknown> } } } | undefined)?.properties?.selectors;
      expect(selectors?.properties?.identityRefusals).toMatchObject({
        type: "object",
        properties: { limit: { type: "integer", minimum: 1, maximum: OBSERVE_MAX_LIMIT } },
        required: ["limit"],
      });
    },
    TIMEOUT,
  );
});
