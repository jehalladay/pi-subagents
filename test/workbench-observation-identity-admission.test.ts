/**
 * wb-0br (W09/W19 P1 security; the owner-filed F2 follow-up of the wb-6ze.21 gate cmd_d9dc4a482899): ObservationProjection
 * admission refuses a nativeRef identity string that carries an unsafe unit. Spec lines pinned, quoted from the bead:
 * - "refuse any nativeRef identity field (provider, type, id, scope if present) containing U+200B-200F, U+2060-2064,
 *   U+FEFF, U+00AD, U+0085, NUL, C0/C1 controls, bidi U+202A-202E and U+2066-2069"
 * - "the refusal is FAIL-CLOSED and TYPED (a recorded refusal row/reason the observe surface can show, never a throw that
 *   kills the ingest loop, never a silent drop)"
 * - "src/workbench/observation.ts ingest/refresh (and any other admission path, e.g. relations/markStale)"
 * - "Red-first: the gate's 4 admitted shapes + 2 clean controls + one mutant per class"
 * - Owner ruling R1(a), 2026-10-16 11:42Z, on the respin gate's measured 4-identity collapse: "U+2028/U+2029 JOIN the
 *   refused identity set ON THIS RESPIN (own spoofing class)", so the identity rule is redaction.ts's one unsafe set exactly.
 * The gate measured the four shapes (sanitizer corpus Y1, X1, X2, X6) admitted as nativeRef.provider by the REAL projection
 * and reaching selectAttention's provider columns. The panel sanitizer is wb-6ze.21's respin and is not touched here.
 * Seat rule F11: every invisible or control code point is built with String.fromCodePoint; none is typed raw or as a
 * four-digit escape.
 */
import { describe, expect, it } from "vitest";
import { selectAttention } from "../src/workbench/attention.js";
import {
  type IdentityRefusal,
  MAX_IDENTITY_REFUSALS,
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  ObservationProjection,
  type ObservationScope,
  unsafeIdentityUnit,
} from "../src/workbench/observation.js";
import { sanitizeWorkbenchText, stripUnsafeText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import { buildOperationsTelemetry } from "../src/workbench/telemetry.js";

const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
const ZWSP = cp(0x200b);
const NUL = cp(0x00);
const BEL = cp(0x07);
/** How a refusal row spells a code point. */
const codePointOf = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;

const alice: ObservationScope = { workspace: "ws-0br", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-0br", principal: "bob" };
const NOW = "2026-10-15T12:00:00.000Z";
const STARTED = "2026-10-15T11:59:00.000Z";
const INVOCATION = "inv-0br";
const PRESENTATION = { title: "identity probe", type: "sdk-operation", statusText: "RUNNING", statusTone: "active" } as const;

/** The wb-6ze.21 gate's four shapes the REAL projection admitted as a provider (sanitizer corpus ids and raw text). */
const GATE_ADMITTED = [
  { id: "Y1", provider: `key${ZWSP}sk-ant-ZWSEPSECRET`, secret: "ZWSEPSECRET" },
  { id: "X1", provider: `x${ZWSP}Bea${ZWSP}rer MIXONESECRET`, secret: "MIXONESECRET" },
  { id: "X2", provider: `see${ZWSP}gh${ZWSP}p_MIXTWOSECRET`, secret: "MIXTWOSECRET" },
  { id: "X6", provider: `ghp_abc${ZWSP}pass${ZWSP}word=MIXSIXSECRET`, secret: "MIXSIXSECRET" },
] as const;

/**
 * The two clean controls, admitted unchanged before and after the fix: a production-shaped identity with a native scope and
 * visible non-ASCII letters, and Y1's clean twin (its zero-width space replaced by a visible space). Together they prove the
 * refusal reads unsafe units only: never visible Unicode, never credential-looking text (redaction stays with each view).
 */
const CLEAN_CONTROLS: readonly NativeRef[] = [
  { provider: "claude-agent-sdk", type: "session", id: "sess-é-日本-0br", scope: "/tmp/ws-0br" },
  { provider: "key sk-ant-ZWSEPSECRET", type: "operation", id: "op-y1-twin" },
];

/** One mutant per class of the bead's list: one code point of the class, inside an otherwise clean identity part. */
const CLASS_MUTANTS = [
  { name: "zero-width U+200B-U+200F", code: 0x200d },
  { name: "word joiner and invisible operators U+2060-U+2064", code: 0x2063 },
  { name: "BOM U+FEFF", code: 0xfeff },
  { name: "soft hyphen U+00AD", code: 0xad },
  { name: "NEL U+0085", code: 0x85 },
  { name: "NUL", code: 0x00 },
  { name: "C0 control", code: 0x07 },
  { name: "C1 control", code: 0x9b },
  { name: "bidi embedding or override U+202A-U+202E", code: 0x202e },
  { name: "bidi isolate U+2066-U+2069", code: 0x2066 },
  // Owner ruling R1(a): the line and paragraph separators joined the refused set on this respin.
  { name: "line or paragraph separator U+2028-U+2029", code: 0x2029 },
] as const;
const FIELDS = ["provider", "type", "id", "scope"] as const;
const CLEAN: Required<NativeRef> = { provider: "forge", type: "operation", id: "op-0br", scope: "/tmp/ws-0br" };
/** CLEAN with one unsafe code point inside one identity part. */
function mutant(field: (typeof FIELDS)[number], code: number): NativeRef {
  const ref: NativeRef = { ...CLEAN };
  ref[field] = `${CLEAN[field].slice(0, 2)}${cp(code)}${CLEAN[field].slice(2)}`;
  return ref;
}

let serial = 0;
function event(source: NativeRef, scope: ObservationScope = alice): ObservationEvent {
  serial += 1;
  return {
    projectionEventId: `ev-${serial}`, source, scope, sourceSequence: 1, observedAt: NOW, kind: "native.status",
    node: { presentation: { ...PRESENTATION } }, trace: { invocationId: INVOCATION }, interval: { startedAt: STARTED },
  };
}
function snapshot(source: NativeRef, scope: ObservationScope = alice): NativeSnapshot {
  return {
    source, scope, capturedAt: NOW, observedAt: NOW, sequence: 1, node: { ...PRESENTATION },
    trace: { invocationId: INVOCATION }, interval: { startedAt: STARTED },
  };
}
const row = (path: IdentityRefusal["path"], ref: IdentityRefusal["ref"], field: IdentityRefusal["field"], code: number): IdentityRefusal =>
  ({ path, ref, field, codePoint: codePointOf(code), reason: "unsafe-identity" });
/** Everything a refused input could have changed; fail-closed means none of it moves. */
const stateOf = (view: ObservationProjection) => ({
  stats: view.stats(),
  revision: view.window({ scope: alice, invocationId: INVOCATION, offset: 0, limit: 100 }).revision,
  topology: view.relationRevision(),
  events: view.events({ scope: alice, limit: 100 }).events.length,
  edges: view.relations({ scope: alice }).length,
});
/** The outcome of one call, a throw included, so one census reports every case. */
function outcomeOf(call: () => string): string {
  try {
    return call();
  } catch (error) {
    return `threw: ${error instanceof Error ? error.message : String(error)}`;
  }
}

describe("wb-0br admission refuses unsafe nativeRef identity: the gate's shapes, the clean controls, one mutant per class", () => {
  it("refuses the wb-6ze.21 gate's four admitted provider shapes on ingest and refresh: typed, recorded, nothing admitted", () => {
    for (const shape of GATE_ADMITTED) {
      const view = new ObservationProjection();
      const before = stateOf(view);
      const source: NativeRef = { provider: shape.provider, type: "operation", id: `op-${shape.id}` };
      expect(view.ingest(event(source)), shape.id).toBe("refused");
      expect(view.refresh(snapshot(source)), shape.id).toBe("refused");
      expect(stateOf(view), shape.id).toStrictEqual(before);
      expect(view.query({ scope: alice, ref: source, limit: 1 }).nodes, shape.id).toStrictEqual([]);
      expect(view.identityRefusals({ scope: alice, limit: 10 }), shape.id).toStrictEqual({
        refusals: [row("ingest", "source", "provider", 0x200b), row("refresh", "source", "provider", 0x200b)],
        total: 2,
        truncated: false,
      });
    }
  });

  it("admits the two clean controls unchanged on ingest, refresh and relate (a control: green before and after the fix)", () => {
    const view = new ObservationProjection();
    for (const source of CLEAN_CONTROLS) {
      expect(view.ingest(event(source))).toBe("applied");
      expect(view.refresh(snapshot(source))).toBe("applied");
      expect(view.query({ scope: alice, ref: source, limit: 1 }).nodes[0]?.nativeRef).toStrictEqual(source);
    }
    view.relate({ scope: alice, from: CLEAN_CONTROLS[0], to: CLEAN_CONTROLS[1], kind: "dependency", provenance: { source: "declared", observedAt: NOW } });
    expect(view.stats()).toStrictEqual({ nodes: 2, events: 2, edges: 1 });
  });

  it("records no refusal row for the clean controls", () => {
    const view = new ObservationProjection();
    for (const source of CLEAN_CONTROLS) {
      view.ingest(event(source));
      view.refresh(snapshot(source));
    }
    expect(view.identityRefusals({ scope: alice, limit: 10 })).toStrictEqual({ refusals: [], total: 0, truncated: false });
  });

  for (const path of ["ingest", "refresh"] as const) {
    it(`one mutant per class: ${path} refuses one code point of every listed class in every identity part, typed and recorded`, () => {
      const failures: string[] = [];
      for (const { name, code } of CLASS_MUTANTS) {
        for (const field of FIELDS) {
          const view = new ObservationProjection();
          const source = mutant(field, code);
          const label = `${name} in ${field}`;
          const outcome = outcomeOf(() => (path === "ingest" ? view.ingest(event(source)) : view.refresh(snapshot(source))));
          if (outcome !== "refused") failures.push(`${label}: ${outcome}`);
          const page = outcomeOf(() => JSON.stringify(view.identityRefusals({ scope: alice, limit: 10 })));
          const expected = JSON.stringify({ refusals: [row(path, "source", field, code)], total: 1, truncated: false });
          if (page !== expected) failures.push(`${label}: rows ${page}`);
          if (view.stats().nodes !== 0 || view.stats().events !== 0) failures.push(`${label}: admitted`);
        }
      }
      expect(failures).toStrictEqual([]);
    });
  }

  it("relate refuses an edge whose from or to end carries an unsafe unit: no edge, no topology change, a row naming the end", () => {
    const view = new ObservationProjection();
    const clean = CLEAN_CONTROLS[0];
    const spoof: NativeRef = { provider: GATE_ADMITTED[0].provider, type: "operation", id: "op-y1" };
    const nul: NativeRef = { provider: "forge", type: "operation", id: `op${NUL}1` };
    const before = stateOf(view);
    view.relate({ scope: alice, from: spoof, to: clean, kind: "dependency", provenance: { source: "declared", observedAt: NOW } });
    view.relate({ scope: alice, from: clean, to: nul, kind: "grouping", provenance: { source: "declared", observedAt: NOW } });
    // Ownership from a spoofed provider is refused as identity before the owner-confirmation rule is read: typed, no throw.
    view.relate({ scope: alice, from: spoof, to: clean, kind: "ownership", provenance: { source: spoof.provider, observedAt: NOW, nativeConfirmationRef: "y1:owner" } });
    expect(stateOf(view)).toStrictEqual(before);
    expect(view.identityRefusals({ scope: alice, limit: 10 }).refusals).toStrictEqual([
      row("relate", "from", "provider", 0x200b),
      row("relate", "to", "id", 0x00),
      row("relate", "from", "provider", 0x200b),
    ]);
  });

  it("markStale refuses a ref carrying an unsafe unit with a row and leaves every node as it was", () => {
    const view = new ObservationProjection();
    const clean = CLEAN_CONTROLS[0];
    view.refresh(snapshot(clean));
    const before = view.query({ scope: alice, ref: clean, limit: 1 }).nodes[0];
    view.markStale({ scope: alice, ref: { ...clean, id: `${clean.id}${cp(0x2060)}` } });
    expect(view.query({ scope: alice, ref: clean, limit: 1 }).nodes[0]).toStrictEqual(before);
    expect(view.identityRefusals({ scope: alice, limit: 10 }).refusals).toStrictEqual([row("markStale", "ref", "id", 0x2060)]);
  });

  it("never kills the ingest loop: refused events between clean ones return refused and the loop runs on (no try/catch)", () => {
    const view = new ObservationProjection();
    // The corpus's control-carrying shapes X8 (NUL) and X4 (BEL) threw at the base; as identity they are typed refusals now.
    const stream: NativeRef[] = [
      CLEAN_CONTROLS[0],
      { provider: `x${NUL}Ba${NUL}sic MIXEIGHTSECRET`, type: "operation", id: "op-x8" },
      { provider: "forge", type: "operation", id: `x${BEL}Bear${BEL}er${BEL}MIXFOURSECRET` },
      CLEAN_CONTROLS[1],
    ];
    const outcomes = stream.map(source => view.ingest(event(source)));
    expect(outcomes).toStrictEqual(["applied", "refused", "refused", "applied"]);
    expect(view.stats()).toMatchObject({ nodes: 2, events: 2 });
    expect(view.identityRefusals({ scope: alice, limit: 10 }).refusals).toStrictEqual([
      row("ingest", "source", "provider", 0x00),
      row("ingest", "source", "id", 0x07),
    ]);
  });

  it("REAL path: the gate's shapes never reach selectAttention's provider columns, while the clean provider still does", () => {
    const view = new ObservationProjection();
    const clean: NativeRef = { provider: "forge", type: "operation", id: "op-clean" };
    for (const shape of GATE_ADMITTED) view.ingest(event({ provider: shape.provider, type: "operation", id: `op-${shape.id}` }));
    view.ingest(event(clean));
    for (const provider of [clean.provider, ...GATE_ADMITTED.map(shape => shape.provider)]) view.disconnect(provider);
    const report = selectAttention(view, { scope: alice, invocationId: INVOCATION, now: NOW });
    const providers = [...report.disconnectedProviders, ...report.bottlenecks.map(bottleneck => bottleneck.nativeRef.provider)];
    expect(providers).toStrictEqual(["forge", "forge"]);
    const text = JSON.stringify(report);
    expect(stripUnsafeText(text)).toBe(text);
    for (const shape of GATE_ADMITTED) expect(text, shape.id).not.toContain(shape.secret);
    expect(view.identityRefusals({ scope: alice, limit: 10 }).total).toBe(GATE_ADMITTED.length);
  });
});

describe("wb-0br the identity rule restates redaction.ts's one unsafe set, because observation.ts imports nothing", () => {
  it("is exactly the shared set on all 1,114,112 code points, U+2028 and U+2029 included (R1(a)), reporting each unsafe one as itself", () => {
    // Every unit of the shared set starts with one of its single code points (escape sequences start with ESC), so
    // agreement on every code point is agreement on every string and on its first unsafe position.
    const outsideShared: string[] = [];
    const sharedOnly: string[] = [];
    const misreported: string[] = [];
    let refused = 0;
    for (let code = 0; code <= 0x10ffff; code += 1) {
      const unit = cp(code);
      const shared = stripUnsafeText(unit) !== unit;
      const reported = unsafeIdentityUnit(unit);
      if (reported !== undefined) refused += 1;
      if (reported !== undefined && !shared) outsideShared.push(codePointOf(code));
      if (reported === undefined && shared) sharedOnly.push(codePointOf(code));
      if (reported !== undefined && reported !== codePointOf(code)) misreported.push(codePointOf(code));
    }
    expect(outsideShared).toStrictEqual([]);
    // Pin flip naming wb-0br, owner ruling R1(a): the line and paragraph separators, admitted at the first cut (its finding F1),
    // JOIN the refused set. The label layout renders a separator as a space and trims it, so "forge" with one is a distinct
    // identity shown as "forge" (the gate's measured 4-identity collapse, pinned below). Nothing is shared-only now.
    expect(sharedOnly).toStrictEqual([]);
    expect(unsafeIdentityUnit(cp(0x2028)), "line separator").toBe("U+2028");
    expect(unsafeIdentityUnit(cp(0x2029)), "paragraph separator").toBe("U+2029");
    expect(misreported).toStrictEqual([]);
    expect(refused).toBeGreaterThan(4_096);
    for (const { name, code } of CLASS_MUTANTS) expect(unsafeIdentityUnit(cp(code)), name).toBe(codePointOf(code));
    expect(unsafeIdentityUnit(cp(0xd800)), "lone surrogate").toBe("U+D800");
  });
});

describe("wb-0br R1(a): U+2028 and U+2029 join the refused identity set (owner ruling 2026-10-16 11:42Z)", () => {
  const LS = cp(0x2028);
  const PS = cp(0x2029);
  /** The respin gate's measured collapse (gate-1 2026-10-16T11:37Z, the 1312c35 landing merge): four identities, one label. */
  const COLLAPSE = ["forge", `forge${LS}`, `forge${PS}`, `${LS}forge`] as const;
  /** An event the telemetry report samples: its producer timestamp is a minute before it was observed. */
  const sampled = (provider: string): ObservationEvent => ({ ...event({ provider, type: "operation", id: "op-collapse" }), sourceTimestamp: STARTED });

  it("refuses the 4-identity telemetry collapse: the three separator spoofs of forge are typed refusals, never forge's samples", () => {
    // Red-first, as the gate measured it before the widening: all four applied as distinct identities, every label rendered
    // "forge", and buildOperationsTelemetry reported ONE provider ["forge"] over FOUR samples with no refusal row.
    for (const provider of COLLAPSE) expect(sanitizeWorkbenchText(provider, WORKBENCH_TEXT_LIMIT, "label"), JSON.stringify(provider)).toBe("forge");
    const view = new ObservationProjection();
    expect(COLLAPSE.map(provider => view.ingest(sampled(provider)))).toStrictEqual(["applied", "refused", "refused", "refused"]);
    const lag = buildOperationsTelemetry(view, { scope: alice, now: NOW }).eventLag;
    if (lag.state !== "measured") throw new Error(`expected a measured event lag, saw unknown(${lag.reason})`);
    expect([lag.value.samples, lag.value.providers]).toStrictEqual([1, ["forge"]]);
    expect(view.stats()).toStrictEqual({ nodes: 1, events: 1, edges: 0 });
    for (const provider of COLLAPSE.slice(1)) {
      expect(view.query({ scope: alice, ref: { provider, type: "operation", id: "op-collapse" }, limit: 1 }).nodes, JSON.stringify(provider)).toStrictEqual([]);
    }
    expect(view.identityRefusals({ scope: alice, limit: 10 })).toStrictEqual({
      refusals: [row("ingest", "source", "provider", 0x2028), row("ingest", "source", "provider", 0x2029), row("ingest", "source", "provider", 0x2028)],
      total: 3,
      truncated: false,
    });
  });

  it("refuses a separator on relate and markStale as well: no edge, no stale mark, one row naming the end and the part", () => {
    const view = new ObservationProjection();
    const clean = CLEAN_CONTROLS[0];
    view.refresh(snapshot(clean));
    const before = view.query({ scope: alice, ref: clean, limit: 1 }).nodes[0];
    view.relate({ scope: alice, from: clean, to: { ...clean, id: `${clean.id}${PS}` }, kind: "dependency", provenance: { source: "declared", observedAt: NOW } });
    view.markStale({ scope: alice, ref: { ...clean, provider: `${clean.provider}${LS}` } });
    expect(view.stats()).toStrictEqual({ nodes: 1, events: 0, edges: 0 });
    expect(view.query({ scope: alice, ref: clean, limit: 1 }).nodes[0]).toStrictEqual(before);
    expect(view.identityRefusals({ scope: alice, limit: 10 }).refusals).toStrictEqual([row("relate", "to", "id", 0x2029), row("markStale", "ref", "provider", 0x2028)]);
  });
});

describe("wb-0br refusal rows: typed, text-free, scope-isolated and bounded", () => {
  it("a row carries closed vocabulary and the code point only, never the refused text, and reads as a copy", () => {
    const view = new ObservationProjection();
    for (const shape of GATE_ADMITTED) view.ingest(event({ provider: shape.provider, type: "operation", id: `op-${shape.id}` }));
    const page = view.identityRefusals({ scope: alice, limit: 10 });
    const text = JSON.stringify(page);
    expect(stripUnsafeText(text)).toBe(text);
    for (const shape of GATE_ADMITTED) expect(text, shape.id).not.toContain(shape.secret);
    expect(page.refusals).toHaveLength(GATE_ADMITTED.length);
    for (const refusal of page.refusals) {
      expect(Object.keys(refusal)).toStrictEqual(["path", "ref", "field", "codePoint", "reason"]);
      expect(refusal.codePoint).toMatch(/^U\+[0-9A-F]{4,6}$/);
    }
    page.refusals[0].field = "id";
    expect(view.identityRefusals({ scope: alice, limit: 1 }).refusals[0].field).toBe("provider");
  });

  it("names the first unsafe part in provider, type, id, scope order and its first unsafe code point exactly", () => {
    const view = new ObservationProjection();
    view.ingest(event({ provider: "forge", type: `op${cp(0x200d)}`, id: `op${cp(0x202e)}`, scope: `/tmp${NUL}` }));
    // The shared set's astral default-ignorables report the whole code point, even beside a visible letter that shares
    // their high surrogate (U+1BCA0 then U+1BC00), and an escape sequence reports its ESC.
    view.ingest(event({ provider: "forge", type: "operation", id: `op-${cp(0x1bca0, 0x1bc00)}` }));
    view.ingest(event({ provider: "forge", type: "operation", id: `op-${cp(0xe0001)}` }));
    view.ingest(event({ provider: "forge", type: "operation", id: `op-${cp(0x1b)}[31m` }));
    // An unsafe unit is a typed refusal whatever the part's length; the byte bound never turns it into a throw.
    view.ingest(event({ provider: "forge", type: "operation", id: `${"x".repeat(300)}${ZWSP}` }));
    expect(view.identityRefusals({ scope: alice, limit: 10 }).refusals.map(refusal => `${refusal.field} ${refusal.codePoint}`)).toStrictEqual([
      "type U+200D",
      "id U+1BCA0",
      "id U+E0001",
      "id U+001B",
      "id U+200B",
    ]);
  });

  it("is scope-isolated: another principal reads no row and a zero total", () => {
    const view = new ObservationProjection();
    view.ingest(event({ provider: GATE_ADMITTED[0].provider, type: "operation", id: "op-y1" }, alice));
    expect(view.identityRefusals({ scope: bob, limit: 10 })).toStrictEqual({ refusals: [], total: 0, truncated: false });
    expect(view.identityRefusals({ scope: alice, limit: 10 }).total).toBe(1);
  });

  it("is bounded: keeps the newest MAX_IDENTITY_REFUSALS rows, counts past them, pages by limit and refuses an invalid limit", () => {
    expect(MAX_IDENTITY_REFUSALS).toBe(256);
    const view = new ObservationProjection({ maxQuery: 1_000 });
    for (let i = 0; i < 5; i += 1) view.ingest(event({ provider: `fo${ZWSP}rge`, type: "operation", id: `old-${i}` }));
    for (let i = 0; i < MAX_IDENTITY_REFUSALS; i += 1) view.ingest(event({ provider: "forge", type: "operation", id: `new-${i}${cp(0xfeff)}` }));
    const all = view.identityRefusals({ scope: alice, limit: 1_000 });
    expect(all.total).toBe(MAX_IDENTITY_REFUSALS + 5);
    expect(all.refusals).toHaveLength(MAX_IDENTITY_REFUSALS);
    expect(all.truncated).toBe(false);
    expect(all.refusals.every(refusal => refusal.field === "id" && refusal.codePoint === "U+FEFF")).toBe(true);
    const page = view.identityRefusals({ scope: alice, limit: 3 });
    expect(page.refusals).toHaveLength(3);
    expect(page).toMatchObject({ total: MAX_IDENTITY_REFUSALS + 5, truncated: true });
    for (const limit of [0, -1, 1.5, Number.NaN]) {
      expect(() => view.identityRefusals({ scope: alice, limit }), String(limit)).toThrow(/Invalid identity refusal query limit\./);
    }
  });

  it("leaves the structural refusals as they were: empty, oversize or unsafe-scope inputs and unsafe titles still throw", () => {
    const view = new ObservationProjection();
    expect(() => view.ingest(event({ provider: "", type: "operation", id: "op" }))).toThrow(/provider is empty, unsafe or exceeds payload limit/);
    expect(() => view.ingest(event({ provider: "forge", type: "operation", id: "x".repeat(257) }))).toThrow(/id is empty, unsafe or exceeds payload limit/);
    expect(() => view.ingest(event(CLEAN_CONTROLS[0], { workspace: `ws${NUL}`, principal: "alice" }))).toThrow(/workspace is empty, unsafe/);
    expect(() => view.ingest({ ...event(CLEAN_CONTROLS[0]), node: { presentation: { ...PRESENTATION, title: `t${BEL}` } } })).toThrow(/title is empty, unsafe/);
    // A subject scope outside the text rule keeps its own refusal even beside an unsafe identity: no row is keyed by it.
    const unsafeScope: ObservationScope = { workspace: `ws${NUL}`, principal: "alice" };
    const spoof: NativeRef = { provider: `fo${ZWSP}rge`, type: "operation", id: "op" };
    expect(() => view.ingest(event(spoof, unsafeScope))).toThrow(/workspace is empty, unsafe/);
    view.markStale({ scope: unsafeScope, ref: spoof });
    expect(view.identityRefusals({ scope: unsafeScope, limit: 10 }).total).toBe(0);
    expect(view.stats()).toStrictEqual({ nodes: 0, events: 0, edges: 0 });
    expect(view.identityRefusals({ scope: alice, limit: 10 }).total).toBe(0);
  });
});
