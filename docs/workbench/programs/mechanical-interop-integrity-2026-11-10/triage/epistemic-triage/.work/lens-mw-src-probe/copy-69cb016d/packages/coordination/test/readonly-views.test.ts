import { strict as assert } from "node:assert";
import { test } from "node:test";
import { UNKNOWN, VIEW_KINDS, assertNoActuationPath, digest, exportView, snapshotView, whyNot } from "../dist/index.js";
import type { TraceInput, TraceRecord } from "../dist/index.js";

const record = (overrides: Partial<TraceRecord> = {}): TraceRecord => ({
  decisionId: "d:1",
  intentId: "intent:push",
  outcome: "refused",
  refusals: [{ code: "SCOPE_PROTECTED", subject: "scope:main" }, { code: "BUDGET_EXCEEDED", subject: "budget:lane-7" }],
  ...overrides,
});
const trace = (overrides: Partial<TraceInput> = {}): TraceInput => ({
  revision: "rev:42",
  records: [record(), record({ decisionId: "d:2", intentId: "intent:note", outcome: "admitted", refusals: [] })],
  ...overrides,
});

test("six read-only view kinds and nothing else; the table is frozen", () => {
  assert.deepEqual([...VIEW_KINDS], ["decision-graph", "why-not", "credit", "ancestry", "resource-pressure", "certificate-dependency"]);
  assert.ok(Object.isFrozen(VIEW_KINDS));
});

test("acceptance, snapshot not actuation: a view is frozen at every depth, so writes throw instead of taking effect, and it carries no function member", () => {
  const view = snapshotView("decision-graph", trace());
  assert.equal(view.schema, "mw.readonly-view.v0");
  assert.equal(view.kind, "decision-graph");
  assert.equal(view.revision, "rev:42");
  assert.ok(Object.isFrozen(view));
  assert.ok(Object.isFrozen(view.rows));
  assert.ok(Object.isFrozen(view.rows[0]));
  assert.ok(Object.isFrozen(view.rows[0]!.refusals));
  assert.ok(Object.isFrozen(view.rows[0]!.refusals[0]));
  assert.throws(() => { (view.rows[0] as { outcome: string }).outcome = "admitted"; }, TypeError);
  assert.throws(() => { (view.rows as unknown as unknown[]).push({}); }, TypeError);
  assert.throws(() => { (view.rows[0]!.refusals[0] as { code: string }).code = "NOTHING"; }, TypeError);
  assert.equal(view.rows[0]!.outcome, "refused");
  assert.deepEqual(assertNoActuationPath(view), { ok: true, refusals: [] });
});

test("actuation-shaped fields in the source are dropped from the snapshot and reported, never carried: actuate, submit, effects, intents", () => {
  const dirty = trace({ records: [{ ...record(), actuate: () => "pushed", submit: { intentId: "intent:push" }, effects: ["push"] } as unknown as TraceRecord] });
  const view = snapshotView("decision-graph", dirty);
  assert.deepEqual(Object.keys(view.rows[0]!).sort(), ["decisionId", "intentId", "outcome", "refusals"]);
  assert.deepEqual(view.dropped, ["actuate", "effects", "submit"]);
  assert.deepEqual(assertNoActuationPath(view), { ok: true, refusals: [] });
});

test("the view carries no secret data: members whose names look like secrets, tokens, passwords or credentials are redacted and listed", () => {
  const leaky = trace({ records: [{ ...record(), apiToken: "abc", password: "p", credentials: { user: "u" }, SECRET_KEY: "s" } as unknown as TraceRecord] });
  const view = snapshotView("decision-graph", leaky);
  assert.deepEqual(Object.keys(view.rows[0]!).sort(), ["decisionId", "intentId", "outcome", "refusals"]);
  assert.deepEqual(view.redacted, ["SECRET_KEY", "apiToken", "credentials", "password"]);
  assert.ok(!JSON.stringify(view).includes("abc"));
});

test("why-not explains a refused intent from the trace's own refusal codes, reports an admitted intent as admitted with nothing to explain, and leaves an intent the trace never saw unknown", () => {
  const refused = whyNot(trace(), "intent:push");
  assert.equal(refused.schema, "mw.readonly-view.why-not.v0");
  assert.equal(refused.intentId, "intent:push");
  assert.equal(refused.status, "refused");
  assert.deepEqual(refused.reasons, [{ decisionId: "d:1", code: "BUDGET_EXCEEDED", subject: "budget:lane-7" }, { decisionId: "d:1", code: "SCOPE_PROTECTED", subject: "scope:main" }]);
  const admitted = whyNot(trace(), "intent:note");
  assert.equal(admitted.status, "admitted");
  assert.deepEqual(admitted.reasons, []);
  const never = whyNot(trace(), "intent:ghost");
  assert.equal(never.status, UNKNOWN);
  assert.deepEqual(never.reasons, []);
  assert.ok(Object.isFrozen(never) && Object.isFrozen(never.reasons));
});

test("the exported trace is reproducible: equal inputs give identical bytes and digest whatever the key order, and the export carries no secret", () => {
  const a = exportView(snapshotView("why-not", trace()));
  const reordered: TraceInput = { records: trace().records.map(r => ({ refusals: r.refusals, outcome: r.outcome, intentId: r.intentId, decisionId: r.decisionId })), revision: "rev:42" };
  const b = exportView(snapshotView("why-not", reordered));
  assert.equal(a.bytes, b.bytes);
  assert.equal(a.digest, b.digest);
  assert.equal(a.digest, digest(JSON.parse(a.bytes)));
  const c = exportView(snapshotView("why-not", trace({ revision: "rev:43" })));
  assert.notEqual(a.digest, c.digest);
});

test("assertNoActuationPath refuses a function member, an actuation field or an unfrozen depth in anything handed to it as a view", () => {
  const withFunction = Object.freeze({ schema: "mw.readonly-view.v0", kind: "credit", revision: "r", rows: Object.freeze([Object.freeze({ decisionId: "d", run: () => 1 })]), dropped: Object.freeze([]), redacted: Object.freeze([]) });
  assert.deepEqual(assertNoActuationPath(withFunction as never).refusals.map(r => [r.code, r.path]), [["VIEW_HAS_FUNCTION_MEMBER", "rows.0.run"]]);
  const withSubmit = Object.freeze({ schema: "mw.readonly-view.v0", kind: "credit", revision: "r", rows: Object.freeze([Object.freeze({ decisionId: "d", submit: Object.freeze({}) })]), dropped: Object.freeze([]), redacted: Object.freeze([]) });
  assert.deepEqual(assertNoActuationPath(withSubmit as never).refusals.map(r => [r.code, r.path]), [["VIEW_HAS_ACTUATION_FIELD", "rows.0.submit"]]);
  const thawed = Object.freeze({ schema: "mw.readonly-view.v0", kind: "credit", revision: "r", rows: [{ decisionId: "d" }], dropped: Object.freeze([]), redacted: Object.freeze([]) });
  assert.deepEqual(assertNoActuationPath(thawed as never).refusals.map(r => [r.code, r.path]), [["VIEW_NOT_FROZEN", "rows"], ["VIEW_NOT_FROZEN", "rows.0"]]);
});

const TEN_ACTUATION_NAMES = ["actuate", "submit", "effects", "effect", "intents", "intent", "execute", "apply", "commit", "push"];

test("all ten actuation names are dropped from a snapshot and reported, and the checker refuses each of the ten with its dotted path", () => {
  const extras = Object.fromEntries(TEN_ACTUATION_NAMES.map(name => [name, { value: name }]));
  const view = snapshotView("decision-graph", trace({ records: [{ ...record(), ...extras } as unknown as TraceRecord] }));
  assert.deepEqual(view.dropped, [...TEN_ACTUATION_NAMES].sort());
  assert.deepEqual(Object.keys(view.rows[0]!).sort(), ["decisionId", "intentId", "outcome", "refusals"]);
  assert.deepEqual(assertNoActuationPath(view), { ok: true, refusals: [] });
  const carrying = Object.freeze({
    schema: "mw.readonly-view.v0", kind: "credit", revision: "r", dropped: Object.freeze([]), redacted: Object.freeze([]),
    rows: Object.freeze([Object.freeze(Object.fromEntries(TEN_ACTUATION_NAMES.map(name => [name, Object.freeze({})])))]),
  });
  const check = assertNoActuationPath(carrying as never);
  assert.equal(check.ok, false);
  assert.deepEqual(check.refusals.map(r => [r.code, r.path]).sort(), TEN_ACTUATION_NAMES.map(name => ["VIEW_HAS_ACTUATION_FIELD", `rows.0.${name}`]).sort());
});

test("a function member with an ordinary name is dropped from the snapshot, listed in dropped[], and absent from the row at root and nested depth", () => {
  const dirty = trace({ records: [{ ...record(), run: () => "go", refusals: [{ code: "SCOPE_PROTECTED", subject: "scope:main", helper: () => 1 }] } as unknown as TraceRecord] });
  const view = snapshotView("decision-graph", dirty);
  assert.deepEqual(view.dropped, ["helper", "run"]);
  assert.ok(!Object.prototype.hasOwnProperty.call(view.rows[0]!, "run"));
  assert.ok(!Object.prototype.hasOwnProperty.call(view.rows[0]!.refusals[0]!, "helper"));
  assert.deepEqual(Object.keys(view.rows[0]!.refusals[0]!).sort(), ["code", "subject"]);
  assert.deepEqual(assertNoActuationPath(view), { ok: true, refusals: [] });
});

test("members named apikey, API_KEY and api_key are redacted and listed at root and nested depth", () => {
  const leaky = trace({ records: [{ ...record(), apikey: "k1", API_KEY: "k2", refusals: [{ code: "SCOPE_PROTECTED", subject: "scope:main", api_key: "k3", apikey: "k4" }] } as unknown as TraceRecord] });
  const view = snapshotView("decision-graph", leaky);
  assert.deepEqual(view.redacted, ["API_KEY", "api_key", "apikey"]);
  assert.deepEqual(Object.keys(view.rows[0]!).sort(), ["decisionId", "intentId", "outcome", "refusals"]);
  assert.deepEqual(Object.keys(view.rows[0]!.refusals[0]!).sort(), ["code", "subject"]);
  const bytes = JSON.stringify(view);
  for (const secret of ["k1", "k2", "k3", "k4"]) assert.ok(!bytes.includes(secret));
});

test("why-not carries the trace revision verbatim on every path: refused, admitted and unknown, and a changed revision changes the view", () => {
  const at = (revision: string) => trace({ revision });
  for (const intentId of ["intent:push", "intent:note", "intent:ghost"]) {
    assert.equal(whyNot(at("rev:42"), intentId).revision, "rev:42");
    assert.equal(whyNot(at("rev:99"), intentId).revision, "rev:99");
    assert.notEqual(exportView(whyNot(at("rev:42"), intentId)).digest, exportView(whyNot(at("rev:99"), intentId)).digest);
  }
});

test("why-not orders reasons by decisionId first and code second across two decisions that refuse one intent", () => {
  const two = trace({
    records: [
      record({ decisionId: "d:2", refusals: [{ code: "AAA_FIRST", subject: "s:a" }] }),
      record({ decisionId: "d:1", refusals: [{ code: "ZZZ_LAST", subject: "s:z" }, { code: "MMM_MID", subject: "s:m" }] }),
    ],
  });
  const view = whyNot(two, "intent:push");
  assert.equal(view.status, "refused");
  assert.deepEqual(view.reasons.map(r => [r.decisionId, r.code]), [["d:1", "MMM_MID"], ["d:1", "ZZZ_LAST"], ["d:2", "AAA_FIRST"]]);
});

test("x1f1 Q1: a function as an array element is refused by the checker with its index path, recorded in dropped[] under that path, and the sanitized snapshot exports cleanly", () => {
  const fn = () => "pushed";
  const dirty = trace({ records: [{ ...record(), notes: ["keep", fn, "tail"] } as unknown as TraceRecord] });
  const view = snapshotView("decision-graph", dirty);
  assert.deepEqual(view.dropped, ["rows.0.notes.1"]);
  assert.deepEqual((view.rows[0] as unknown as { notes: string[] }).notes, ["keep", "tail"]);
  assert.deepEqual(assertNoActuationPath(view), { ok: true, refusals: [] });
  assert.doesNotThrow(() => exportView(view));
  const raw = Object.freeze({ schema: "mw.readonly-view.v0", kind: "credit", revision: "r", dropped: Object.freeze([]), redacted: Object.freeze([]), rows: Object.freeze([Object.freeze({ notes: Object.freeze(["keep", fn]) })]) });
  assert.deepEqual(assertNoActuationPath(raw as never).refusals.map(r => [r.code, r.path]), [["VIEW_HAS_FUNCTION_MEMBER", "rows.0.notes.1"]]);
});

test("x1f1 Q2: a symbol-keyed function is refused by the checker with a [Symbol(desc)] path, and the snapshot drops every symbol-keyed member and records it in dropped[]", () => {
  const hook = Symbol("hook");
  const tag = Symbol("tag");
  const row = { ...record(), [hook]: () => "pushed", [tag]: "plain" } as unknown as TraceRecord;
  const view = snapshotView("decision-graph", trace({ records: [row] }));
  assert.deepEqual(view.dropped, ["[Symbol(hook)]", "[Symbol(tag)]"]);
  assert.deepEqual(Reflect.ownKeys(view.rows[0]!).sort(), ["decisionId", "intentId", "outcome", "refusals"]);
  assert.deepEqual(assertNoActuationPath(view), { ok: true, refusals: [] });
  assert.ok(exportView(view).bytes.length > 0);
  const raw = Object.freeze({ schema: "mw.readonly-view.v0", kind: "credit", revision: "r", dropped: Object.freeze([]), redacted: Object.freeze([]), rows: Object.freeze([Object.freeze({ decisionId: "d", [hook]: () => 1 })]) });
  assert.deepEqual(assertNoActuationPath(raw as never).refusals.map(r => [r.code, r.path]), [["VIEW_HAS_FUNCTION_MEMBER", "rows.0.[Symbol(hook)]"]]);
  const atRoot = Object.freeze({ [hook]: () => 1 });
  assert.deepEqual(assertNoActuationPath(atRoot as never).refusals.map(r => [r.code, r.path]), [["VIEW_HAS_FUNCTION_MEMBER", "[Symbol(hook)]"]]);
});

test("x1f1 Q3: an object-valued refusal subject yields VIEW_SUBJECT_NOT_STRING with the typeof as subject; the caller's object stays unfrozen and unreferenced and the bytes carry no apiKey", () => {
  const subject = { name: "scope:main", apiKey: "sk-live-123" };
  const withObject = trace({ records: [record({ refusals: [{ code: "SCOPE_PROTECTED", subject: subject as unknown as string }, { code: "BUDGET_EXCEEDED", subject: "budget:lane-7" }] })] });
  const view = whyNot(withObject, "intent:push");
  assert.deepEqual(view.reasons, [
    { decisionId: "d:1", code: "BUDGET_EXCEEDED", subject: "budget:lane-7" },
    { decisionId: "d:1", code: "VIEW_SUBJECT_NOT_STRING", subject: "object" },
  ]);
  assert.ok(!Object.isFrozen(subject));
  assert.ok(!view.reasons.some(reason => (reason as { subject: unknown }).subject === subject));
  const bytes = exportView(view).bytes;
  assert.ok(!bytes.includes("apiKey") && !bytes.includes("sk-live-123"));
  const other = whyNot(trace({ records: [record({ refusals: [{ code: "X", subject: 7 as unknown as string }, { code: "Y", subject: undefined as unknown as string }] })] }), "intent:push");
  assert.deepEqual(other.reasons.map(r => [r.code, r.subject]), [["VIEW_SUBJECT_NOT_STRING", "number"], ["VIEW_SUBJECT_NOT_STRING", "undefined"]]);
});

test("x1f1 Q4: snapshotView refuses an unknown view kind at runtime with VIEW_KIND_UNKNOWN naming the value: a trailing space and a number are both refused, every pinned kind passes", () => {
  assert.throws(() => snapshotView("mutation-trace " as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN:") && error.message.includes('"mutation-trace "'));
  assert.throws(() => snapshotView(42 as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN:") && error.message.includes("42"));
  assert.throws(() => snapshotView(Symbol("k") as never, trace()), /VIEW_KIND_UNKNOWN: .*Symbol\(k\)/);
  for (const kind of VIEW_KINDS) assert.equal(snapshotView(kind, trace()).kind, kind);
});

test("t8cz Q4a: snapshotView refuses a trailing-space REAL kind ('credit ') and names it in the VIEW_KIND_UNKNOWN detail", () => {
  assert.ok(VIEW_KINDS.includes("credit"));
  assert.throws(() => snapshotView("credit " as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN:") && error.message.includes('"credit "'));
});

test("t8cz Q4b: snapshotView refuses an absent kind (undefined, as decoded JSON without the member) and the detail names the word undefined", () => {
  assert.throws(() => snapshotView(undefined as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN: undefined is not one of "));
});

test("ed0k W1: a leading-space REAL kind (' credit') is refused with VIEW_KIND_UNKNOWN and the detail quotes the space-led value", () => {
  assert.ok(VIEW_KINDS.includes("credit"));
  assert.throws(() => snapshotView(" credit" as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN:") && error.message.includes('" credit"'));
});

test("ed0k W2: a case-variant REAL kind ('Credit') is refused with VIEW_KIND_UNKNOWN and the detail quotes the capitalised value", () => {
  assert.ok(VIEW_KINDS.includes("credit"));
  assert.throws(() => snapshotView("Credit" as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN:") && error.message.includes('"Credit"'));
});

test("ed0k W3: a function-valued kind is refused with VIEW_KIND_UNKNOWN and the detail names the word function (JSON renders no text for it)", () => {
  assert.throws(() => snapshotView((() => "credit") as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN: function is not one of "));
});

test("ed0k W4: a kind JSON cannot render (a bigint, a cyclic object) is still refused with RangeError VIEW_KIND_UNKNOWN naming its typeof", () => {
  assert.throws(() => snapshotView(10n as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN: bigint is not one of "));
  const cyclic: { self?: unknown } = {};
  cyclic.self = cyclic;
  assert.throws(() => snapshotView(cyclic as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN: object is not one of "));
});

test("ed0k W5: the VIEW_KIND_UNKNOWN detail ends with the six pinned kinds in table order, comma-and-space separated", () => {
  assert.throws(() => snapshotView("nope" as never, trace()), (error: unknown) => error instanceof RangeError && error.message === 'VIEW_KIND_UNKNOWN: "nope" is not one of decision-graph, why-not, credit, ancestry, resource-pressure, certificate-dependency');
});

test("tw2r G1: a coercible array kind (['credit']) is refused by identity with VIEW_KIND_UNKNOWN quoting the JSON array, so loose-equality and String-coerced guards cannot pass it", () => {
  assert.ok(VIEW_KINDS.includes("credit"));
  assert.throws(() => snapshotView(["credit"] as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith('VIEW_KIND_UNKNOWN: ["credit"] is not one of '));
});

test("tw2r G2: a boxed String('credit') and an object whose toString() returns 'credit' are refused by identity with VIEW_KIND_UNKNOWN naming their JSON rendering", () => {
  assert.throws(() => snapshotView(new String("credit") as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith('VIEW_KIND_UNKNOWN: "credit" is not one of '));
  const stringy = { toString: () => "credit" };
  assert.throws(() => snapshotView(stringy as never, trace()), (error: unknown) => error instanceof RangeError && error.message.startsWith("VIEW_KIND_UNKNOWN: {} is not one of "));
});
