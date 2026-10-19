/**
 * wb-5a7 (W16 control core hardening): ONE admission chokepoint in src/workbench/control.ts, used by acknowledge() and
 * settle(). Spec, the owner grooming order quoted verbatim from the bead brief: "control.ts gains the one admission
 * chokepoint in acknowledge()/settle() (ref admitted only when ref === sanitizeWorkbenchText(ref, 4096, "label"), otherwise
 * a TYPED refusal recorded on the decision, never a throw or a silent drop) ... Red-first with the 952 acceptance shapes
 * (glued token, split credential, U+200B-carrying ref, bidi) and one mutant per branch; no adapter edits, no UI".
 *
 * Measured input-hygiene behaviour of the decision core, nothing mocked:
 * - A present producer reference the chokepoint admits is recorded verbatim, exactly as before, with no refusal record.
 * - A present reference it does not admit never reaches a receipt. The phase is still recorded (the producer did answer),
 *   the reference's place holds the fixed marker CONTROL_WITHHELD_REF, and a frozen typed refusal naming only the field is
 *   recorded on the receipt the core mints. Nothing is thrown and nothing is dropped without a record.
 * - A missing reference (absent, not a string, or blank) is no reference: the core still refuses to mint the phase with its
 *   typed CapabilityError, as it does for a wrong phase, a wrong contract or a clock without a zone (the adapters'
 *   receipt-refused paths rest on those).
 * Every invisible or control code point is built with String.fromCodePoint; every credential-shaped literal is an obviously
 * fake placeholder.
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import * as control from "../src/workbench/control.js";
import {
  type AcknowledgedControlReceipt,
  acknowledge,
  type ControlDecision,
  decideControl,
  type NativeControlReceipt,
  type NativeControlRequest,
  type RequestedControlReceipt,
  type ResultControlReceipt,
  settle,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

const SCOPE: ObservationScope = { workspace: "/tmp/admission-ws", principal: "tester" };
const AT = "2026-10-15T06:00:00Z";
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: SCOPE.workspace };
const ACK = { acknowledgedAt: "2026-10-15T07:00:02Z", nativeAckRef: "frn-req-stop-1" };
const DONE = { outcome: "completed" as const, nativeResultRef: "frn-req-status-2", settledAt: "2026-10-15T07:00:09Z" };
/** The bound acknowledge() and settle() admit a reference within, in UTF-16 code units for the helper and in UTF-8 bytes. */
const BOUND = 4096;

type RefField = "nativeAckRef" | "nativeResultRef";

function projection(): ObservationProjection {
  const result = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) {
    result.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  result.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "req-attempts" } });
  return result;
}
function request(): NativeControlRequest {
  return { scope: { ...SCOPE }, principal: { id: SCOPE.principal }, grants: ["control:furnace.stop"], target: { ...RUN }, action: "stop",
    params: { confirmed: true }, invocationId: "inv-admission-1", requestedAt: "2026-10-15T07:00:00Z" };
}
/** A requested receipt the real core minted: acknowledge() is pure, so one receipt serves every row of a case. */
function requested(): RequestedControlReceipt {
  const decision: ControlDecision = decideControl(request(), { projection: projection(), now: () => "2026-10-15T07:00:01Z" });
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision.receipt;
}

const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
const NUL = cp(0x00);
const BEL = cp(0x07);
const TAB = cp(0x09);
const LF = cp(0x0a);
const ESC = cp(0x1b);
const SHY = cp(0xad);
const C1_ST = cp(0x9c);
const C1_OSC = cp(0x9d);
const ZWSP = cp(0x200b);
const LRM = cp(0x200e);
const RLO = cp(0x202e);
const LRI = cp(0x2066);
const PDI = cp(0x2069);
const HAN = cp(0x6f22);
const SMILE = cp(0x1f642);

/** Every string leaf of a value, keys included. */
function strings(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) for (const item of value) strings(item, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      into.push(key);
      strings(item, into);
    }
  }
  return into;
}

/** The marker and the refusal text, read through the module so a missing export is an assertion failure, not a link error. */
function withheldMarker(): string {
  expect(control.CONTROL_WITHHELD_REF, "src/workbench/control.ts exports CONTROL_WITHHELD_REF").toBeTypeOf("string");
  return control.CONTROL_WITHHELD_REF;
}
function refusalFor(field: RefField): unknown {
  expect(control.CONTROL_REF_NOT_ADMITTED_REASON, "src/workbench/control.ts exports CONTROL_REF_NOT_ADMITTED_REASON").toBeTypeOf("string");
  expect(control.CONTROL_REF_REFUSAL_POLICY, "src/workbench/control.ts exports CONTROL_REF_REFUSAL_POLICY").toBeTypeOf("string");
  return { policy: control.CONTROL_REF_REFUSAL_POLICY, category: "validation", field, reason: control.CONTROL_REF_NOT_ADMITTED_REASON };
}
/** A CapabilityError the call throws, or undefined when it returns: "never a throw" is asserted as undefined. */
function thrown(run: () => unknown): unknown {
  try {
    run();
  } catch (error) {
    return error;
  }
  return undefined;
}

/**
 * The withheld record: every named field holds the marker, the refusals are exactly one frozen typed entry per named field in
 * field order, and no placeholder or unsafe unit of the refused text survives anywhere in the receipt.
 */
function expectWithheld(receipt: AcknowledgedControlReceipt | ResultControlReceipt, fields: readonly RefField[], placeholders: readonly string[], id: string): void {
  for (const field of fields) expect(receipt[field as keyof typeof receipt], `${id}: ${field} holds the withheld marker`).toBe(withheldMarker());
  expect(receipt.refusals, `${id}: one typed refusal per withheld field`).toStrictEqual(fields.map(refusalFor));
  expect(Object.isFrozen(receipt.refusals), `${id}: the refusal record is frozen`).toBe(true);
  for (const entry of receipt.refusals ?? []) expect(Object.isFrozen(entry), `${id}: each refusal is frozen`).toBe(true);
  const text = JSON.stringify(receipt);
  for (const placeholder of placeholders) expect(text, `${id}: the refused text never reaches the receipt`).not.toContain(placeholder);
  for (const value of strings(receipt)) expect(value, `${id}: no unsafe unit in the receipt`).not.toMatch(UNSAFE_DISPLAY);
}
/** Acknowledges `ref` against `receipt` without a throw and returns the acknowledged phase. */
function acknowledged(receipt: RequestedControlReceipt, ref: string, id: string): AcknowledgedControlReceipt {
  let result: AcknowledgedControlReceipt | undefined;
  expect(thrown(() => { result = acknowledge(receipt, { ...ACK, nativeAckRef: ref }); }), `${id}: acknowledge() never throws for a present reference`).toBeUndefined();
  if (result === undefined) throw new Error(`${id}: no acknowledged receipt`);
  expect(result.phase).toBe("acknowledged");
  return result;
}
/** Settles `ref` against `receipt` without a throw and returns the result phase. */
function settled(receipt: NativeControlReceipt, ref: string, id: string): ResultControlReceipt {
  let result: ResultControlReceipt | undefined;
  expect(thrown(() => { result = settle(receipt, { ...DONE, nativeResultRef: ref }); }), `${id}: settle() never throws for a present reference`).toBeUndefined();
  if (result === undefined) throw new Error(`${id}: no result receipt`);
  expect(result.phase).toBe("result");
  return result;
}

// ---------------------------------------------------------------------------------------------------------------------
// The wb-952 acceptance set, built as test/workbench-sanitizer-corpus.test.ts builds it: every unit the wb-952 gates
// measured, between two tokens and inside one, plus the 8-bit twin of every shape holding a 7-bit escape introducer or ST.
// The placeholder in each shape is obviously fake and starts with F, so no ESC before it opens an introducer.
// ---------------------------------------------------------------------------------------------------------------------

interface Shape {
  readonly id: string;
  readonly raw: string;
  readonly placeholder: string;
}
const ACCEPTANCE_CODES = [
  0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
  0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
  0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0, 0xfff9, 0xfffa, 0xfffb, 0x13430, 0x13436, 0x1343f,
];
const ACCEPTANCE_UNITS: readonly (readonly [name: string, unit: string])[] = [
  ...ACCEPTANCE_CODES.map(code => [`U+${code.toString(16).toUpperCase().padStart(4, "0")}`, cp(code)] as const),
  ["SGR", `${ESC}[0m`],
  ["OSC", `${ESC}]0;t${BEL}`],
  ["DCS", `${ESC}Pq${ESC}\\`],
  ["OSC ended by the 8-bit ST", `${ESC}]0;t${C1_ST}`],
  ["8-bit OSC ended by the 7-bit ST", `${C1_OSC}0;t${ESC}\\`],
];
type Position = (unit: string, placeholder: string) => string;
const BETWEEN_TOKENS: readonly (readonly [position: string, shape: Position])[] = [
  ["before ghp_", (unit, fake) => `see${unit}ghp_${fake}`],
  ["before sk-ant-", (unit, fake) => `key${unit}sk-ant-${fake}`],
  ["before Bearer", (unit, fake) => `x${unit}Bearer ${fake}`],
  ["before Basic", (unit, fake) => `x${unit}Basic ${fake}`],
  ["as the space after Bearer", (unit, fake) => `Authorization: Bearer${unit}${fake}`],
  ["as the space after Basic", (unit, fake) => `Authorization: Basic${unit}${fake}`],
];
const WITHIN_TOKENS: readonly (readonly [position: string, shape: Position])[] = [
  ["inside Bearer", (unit, fake) => `Authorization: Bea${unit}rer ${fake}`],
  ["inside ghp_", (unit, fake) => `see gh${unit}p_${fake}`],
  ["inside a Bearer token", (unit, fake) => `Bearer SEC${unit}${fake}`],
  ["inside password", (unit, fake) => `pass${unit}word=${fake}`],
  ["before and inside Bearer", (unit, fake) => `x${unit}Bea${unit}rer ${fake}`],
  ["before and inside ghp_", (unit, fake) => `see${unit}gh${unit}p_${fake}`],
  ["inside and after Bearer", (unit, fake) => `Authorization: Bea${unit}rer${unit}${fake}`],
  ["before, inside and after Bearer", (unit, fake) => `x${unit}Bea${unit}rer${unit}${fake}`],
  ["after a key token and inside the next key name", (unit, fake) => `ghp_abc${unit}pass${unit}word=${fake}`],
];
const WHITESPACE_UNITS: ReadonlySet<string> = new Set([0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x85, 0x2028, 0x2029].map(code => cp(code)));
const EIGHT_BIT_FORMS: readonly (readonly [seven: string, eight: string])[] = [
  [`${ESC}[`, cp(0x9b)], [`${ESC}P`, cp(0x90)], [`${ESC}X`, cp(0x98)], [`${ESC}\\`, C1_ST], [`${ESC}]`, C1_OSC], [`${ESC}^`, cp(0x9e)], [`${ESC}_`, cp(0x9f)],
];
const eightBit = (raw: string): string => EIGHT_BIT_FORMS.reduce((text, [seven, eight]) => text.replaceAll(seven, eight), raw);
const BASE_SHAPES: readonly Shape[] = ACCEPTANCE_UNITS.flatMap(([name, unit], unitIndex) =>
  [...BETWEEN_TOKENS, ...(WHITESPACE_UNITS.has(unit) ? [] : WITHIN_TOKENS)].map(([position, shape], positionIndex) => {
    const placeholder = `FAKEPLACEHOLDER${unitIndex}X${positionIndex}`;
    return { id: `${name} ${position}`, raw: shape(unit, placeholder), placeholder };
  }),
);
const ACCEPTANCE: readonly Shape[] = [
  ...BASE_SHAPES,
  ...BASE_SHAPES.filter(shape => eightBit(shape.raw) !== shape.raw).map(shape => ({ ...shape, id: `${shape.id} (8-bit twin)`, raw: eightBit(shape.raw) })),
];

/** The four classes the owner order names, one explicit row each way they occur, so each class reads on its own. */
const NAMED_CLASSES: readonly Shape[] = [
  { id: "glued token: a key glued after a control", raw: `key${BEL}sk-ant-FAKE-GLUED-0001`, placeholder: "FAKE-GLUED-0001" },
  { id: "glued token: a key glued after a tab", raw: `col1${TAB}ghp_FAKEGLUED0002`, placeholder: "FAKEGLUED0002" },
  { id: "glued token: a key token glued to the next key name", raw: `ghp_FAKEabc${ZWSP}pass${ZWSP}word=FAKE-GLUED-0003`, placeholder: "FAKE-GLUED-0003" },
  { id: "split credential: a keyword split by an invisible", raw: `pass${ZWSP}word=FAKE-SPLIT-0001`, placeholder: "FAKE-SPLIT-0001" },
  { id: "split credential: a prefix split by a bidi mark", raw: `gh${LRM}p_FAKESPLIT0002`, placeholder: "FAKESPLIT0002" },
  { id: "split credential: a key split by a soft hyphen", raw: `sk-ant-aaaa${SHY}FAKESPLIT0003`, placeholder: "FAKESPLIT0003" },
  { id: "split credential: a scheme split by a control", raw: `Bear${BEL}er FAKE-SPLIT-0004`, placeholder: "FAKE-SPLIT-0004" },
  { id: "U+200B-carrying ref: before a key", raw: `see${ZWSP}ghp_FAKEZWSP0001`, placeholder: "FAKEZWSP0001" },
  { id: "U+200B-carrying ref: inside an ordinary reference", raw: `frn-req${ZWSP}-stop-1`, placeholder: `frn-req${ZWSP}` },
  { id: "U+200B-carrying ref: leading", raw: `${ZWSP}furnace-ack-7`, placeholder: ZWSP },
  { id: "bidi: an override inside an ordinary reference", raw: `ack${RLO}7`, placeholder: RLO },
  { id: "bidi: an override before a scheme", raw: `x${RLO}Bearer FAKE-BIDI-0001`, placeholder: "FAKE-BIDI-0001" },
  { id: "bidi: an isolate around an ordinary reference", raw: `${LRI}frn-req-stop-1${PDI}`, placeholder: LRI },
  { id: "bidi: a mark inside an ordinary reference", raw: `frn${LRM}-req`, placeholder: LRM },
  { id: "control: a NUL inside an ordinary reference", raw: `frn${NUL}-req`, placeholder: NUL },
  { id: "control: a line feed inside an ordinary reference", raw: `frn${LF}-req`, placeholder: LF },
];
/**
 * The core gap the wb-69g.9 gate measured (F3): credential-shaped references with no unsafe unit at all, which the strip-only
 * admission passed verbatim. The redacting helper changes every one of them.
 */
const PLAIN_CREDENTIAL_SHAPES: readonly Shape[] = [
  { id: "a key prefix after a word", raw: "ref sk-ant-NOT-A-REAL-KEY-0000", placeholder: "NOT-A-REAL-KEY-0000" },
  { id: "a bearer scheme and token", raw: "Bearer FAKE-TOKEN-0000", placeholder: "FAKE-TOKEN-0000" },
  { id: "a basic scheme and token", raw: "Basic FAKE-BASIC-0000", placeholder: "FAKE-BASIC-0000" },
  { id: "a whole ghp_ token", raw: "ghp_FAKE0TOKEN0FOR0TESTS", placeholder: "FAKE0TOKEN0FOR0TESTS" },
  { id: "a whole github_pat_ token", raw: "github_pat_FAKE_0000_PLACEHOLDER", placeholder: "FAKE_0000_PLACEHOLDER" },
  { id: "a password assignment", raw: "password=not-a-real-password", placeholder: "not-a-real-password" },
  { id: "an api_key assignment with a colon", raw: "api_key: FAKE-KEY-0000", placeholder: "FAKE-KEY-0000" },
  { id: "a key inside an otherwise ordinary reference", raw: "frn-req:sk-proj-FAKEPROJECT0000", placeholder: "FAKEPROJECT0000" },
];
/** Whitespace the label layout rewrites: no unsafe unit, so the strip-only admission passed each, but the label is not the reference. */
const LABEL_REWRITES: readonly Shape[] = [
  { id: "a leading space", raw: " furnace-ack-7", placeholder: " furnace" },
  { id: "a trailing space", raw: "furnace-ack-7 ", placeholder: "ack-7 " },
  { id: "two spaces inside", raw: "furnace  ack-7", placeholder: "furnace  ack" },
];
/** References the chokepoint admits verbatim: the shapes every landed adapter composes, a wide-character ref and one at the bound. */
const ADMITTED: readonly string[] = [
  "frn-req-stop-1",
  "furnace-ack-7",
  `run_stop:ctl_${"0a".repeat(16)}`,
  "forge-operation:op-1:operation.cancel:CANCEL_REQUESTED:ACCEPTED",
  "claude-agent-sdk:interrupt_receipt_v1:still_queued=0:cancelled=0",
  "inv-1:host-2:cancel:accepted",
  "furnace-run:frn-run-r1:stopped@2026-10-15T07:00:02.719135054+00:00",
  "secretary-7",
  `ack-${HAN.repeat(300)}${SMILE.repeat(100)}`,
  "a".repeat(BOUND),
  HAN.repeat(1365),
];

describe("wb-5a7 admission chokepoint: what acknowledge() and settle() record", () => {
  it("exports the fixed marker and refusal text, and the marker is itself a displayable label", () => {
    expect(withheldMarker()).toBe("[withheld]");
    expect(control.CONTROL_REF_NOT_ADMITTED_REASON).toBe("native reference was not admitted");
    expect(control.CONTROL_REF_REFUSAL_POLICY).toBe("native-ref-not-admitted");
    // Positive control: the marker survives the helper unchanged, so a receipt carrying it can still be settled and rendered.
    expect(sanitizeWorkbenchText(withheldMarker(), BOUND, "label")).toBe(withheldMarker());
  });

  it("admits a displayable reference verbatim in both phases and records no refusal (positive controls)", () => {
    const receipt = requested();
    for (const ref of ADMITTED) {
      // Not vacuous: each ref is exactly what the helper leaves unchanged within the byte bound.
      expect(sanitizeWorkbenchText(ref, BOUND, "label"), ref.slice(0, 40)).toBe(ref);
      expect(Buffer.byteLength(ref), ref.slice(0, 40)).toBeLessThanOrEqual(BOUND);
      const ack = acknowledged(receipt, ref, ref.slice(0, 40));
      expect(ack.nativeAckRef).toBe(ref);
      expect(ack).not.toHaveProperty("refusals");
      const result = settled(ack, ref, ref.slice(0, 40));
      expect([result.nativeAckRef, result.nativeResultRef]).toStrictEqual([ref, ref]);
      expect(result).not.toHaveProperty("refusals");
    }
  });

  it(`withholds every wb-952 acceptance shape as an acknowledgement reference, typed and recorded, never a throw (${ACCEPTANCE.length} shapes)`, () => {
    expect(ACCEPTANCE).toHaveLength(921);
    const receipt = requested();
    for (const shape of ACCEPTANCE) expectWithheld(acknowledged(receipt, shape.raw, shape.id), ["nativeAckRef"], [shape.placeholder], shape.id);
  });

  it(`withholds every wb-952 acceptance shape as a result reference, typed and recorded, never a throw (${ACCEPTANCE.length} shapes)`, () => {
    const ack = acknowledge(requested(), ACK);
    for (const shape of ACCEPTANCE) {
      const result = settled(ack, shape.raw, shape.id);
      expectWithheld(result, ["nativeResultRef"], [shape.placeholder], shape.id);
      expect(result.nativeAckRef, `${shape.id}: the admitted acknowledgement reference is carried verbatim`).toBe(ACK.nativeAckRef);
    }
  });

  it("the four named classes (glued token, split credential, U+200B-carrying ref, bidi) are withheld in both phases", () => {
    const receipt = requested();
    for (const shape of NAMED_CLASSES) {
      const ack = acknowledged(receipt, shape.raw, shape.id);
      expectWithheld(ack, ["nativeAckRef"], [shape.placeholder], shape.id);
      expectWithheld(settled(acknowledge(receipt, ACK), shape.raw, shape.id), ["nativeResultRef"], [shape.placeholder], shape.id);
    }
  });

  it("withholds a credential-shaped reference that carries no unsafe unit (the F3 gap: the strip-only admission passed it verbatim)", () => {
    const receipt = requested();
    for (const shape of PLAIN_CREDENTIAL_SHAPES) {
      // The rows exercise exactly the gap: no unsafe unit to strip, yet the helper redacts.
      expect(stripUnsafeText(shape.raw), shape.id).toBe(shape.raw);
      expect(sanitizeWorkbenchText(shape.raw, BOUND, "label"), shape.id).toContain("[REDACTED]");
      expectWithheld(acknowledged(receipt, shape.raw, shape.id), ["nativeAckRef"], [shape.placeholder], shape.id);
      expectWithheld(settled(acknowledge(receipt, ACK), shape.raw, shape.id), ["nativeResultRef"], [shape.placeholder], shape.id);
    }
  });

  it("withholds what the label layout rewrites (surrounding or repeated whitespace), which the strip-only admission passed", () => {
    const receipt = requested();
    for (const shape of LABEL_REWRITES) {
      expect(stripUnsafeText(shape.raw), shape.id).toBe(shape.raw);
      // The model-facing text layout keeps these unchanged; only the label layout the order names rewrites them.
      expect(sanitizeWorkbenchText(shape.raw, BOUND, "text"), shape.id).toBe(shape.raw);
      expectWithheld(acknowledged(receipt, shape.raw, shape.id), ["nativeAckRef"], [shape.placeholder], shape.id);
      expectWithheld(settled(acknowledge(receipt, ACK), shape.raw, shape.id), ["nativeResultRef"], [shape.placeholder], shape.id);
    }
  });

  it("withholds a reference past the bound, by UTF-16 length or by UTF-8 bytes, without a throw", () => {
    const receipt = requested();
    const long = "a".repeat(BOUND + 1);
    expectWithheld(acknowledged(receipt, long, "4097 code units"), ["nativeAckRef"], [long], "4097 code units");
    // 1366 wide characters: the helper leaves them unchanged, so only the byte bound refuses them.
    const wide = HAN.repeat(1366);
    expect(sanitizeWorkbenchText(wide, BOUND, "label")).toBe(wide);
    expect(Buffer.byteLength(wide)).toBe(4098);
    expectWithheld(acknowledged(receipt, wide, "4098 bytes"), ["nativeAckRef"], [wide], "4098 bytes");
    expectWithheld(settled(acknowledge(receipt, ACK), wide, "4098 bytes"), ["nativeResultRef"], [wide], "4098 bytes");
  });

  it("withholds a producer reference that spells the marker, so the marker in a receipt always means withheld", () => {
    const receipt = requested();
    expectWithheld(acknowledged(receipt, "[withheld]", "marker as ack ref"), ["nativeAckRef"], [], "marker as ack ref");
    expectWithheld(settled(acknowledge(receipt, ACK), "[withheld]", "marker as result ref"), ["nativeResultRef"], [], "marker as result ref");
  });

  it("settle() carries a withheld acknowledgement forward and adds its own refusal, in field order", () => {
    const withheldAck = acknowledged(requested(), "ref ghp_FAKEFORWARD0000", "withheld ack");
    const carried = settled(withheldAck, DONE.nativeResultRef, "withheld ack, admitted result");
    expectWithheld(carried, ["nativeAckRef"], ["FAKEFORWARD0000"], "withheld ack, admitted result");
    expect(carried.nativeResultRef).toBe(DONE.nativeResultRef);
    const both = settled(withheldAck, "Bearer FAKE-BOTH-0000", "withheld ack, withheld result");
    expectWithheld(both, ["nativeAckRef", "nativeResultRef"], ["FAKEFORWARD0000", "FAKE-BOTH-0000"], "withheld ack, withheld result");
  });

  it("settle() admits the acknowledgement reference it carries, so a hand-built acknowledged receipt carries nothing the core would not record", () => {
    const base = acknowledge(requested(), ACK);
    for (const [id, ref, placeholder] of [
      ["a credential-shaped carried reference", "ref ghp_FAKECARRIED0000", "FAKECARRIED0000"],
      ["a carried reference holding an invisible", `frn${ZWSP}-ack`, ZWSP],
      ["a carried reference holding a bidi override", `frn${RLO}-ack`, RLO],
    ] as const) {
      const handBuilt = { ...base, nativeAckRef: ref } as NativeControlReceipt;
      const result = settled(handBuilt, DONE.nativeResultRef, id);
      expectWithheld(result, ["nativeAckRef"], [placeholder], id);
    }
  });

  it("settle() records refusals from the references it saw, never from a refusals field it was handed", () => {
    const forged = { ...acknowledge(requested(), ACK), refusals: Object.freeze([Object.freeze({ policy: "native-ref-not-admitted", category: "validation",
      field: "nativeAckRef", reason: "FAKE-FORGED-REASON-TEXT" })]) } as unknown as NativeControlReceipt;
    const result = settled(forged, DONE.nativeResultRef, "forged refusal record");
    expect(result).not.toHaveProperty("refusals");
    expect(result.nativeAckRef).toBe(ACK.nativeAckRef);
    expect(JSON.stringify(result)).not.toContain("FAKE-FORGED-REASON-TEXT");
  });

  it("a missing reference is no reference: the phase is refused with the typed CapabilityError, as before, and so is a bad clock", () => {
    const receipt = requested();
    const ack = acknowledge(receipt, ACK);
    const expectRefused = (run: () => unknown, message: string): void => {
      const error = thrown(run);
      expect(error).toBeInstanceOf(CapabilityError);
      expect((error as CapabilityError).category).toBe("validation");
      expect((error as CapabilityError).message).toBe(message);
    };
    for (const missing of ["", "   ", undefined, null, 42, {}]) {
      expectRefused(() => acknowledge(receipt, { ...ACK, nativeAckRef: missing as string }), "Control acknowledgement requires a native acknowledgement reference.");
      expectRefused(() => settle(ack, { ...DONE, nativeResultRef: missing as string }), "Control result requires a native result reference.");
      expectRefused(() => settle({ ...ack, nativeAckRef: missing } as NativeControlReceipt, DONE), "Only an acknowledged control receipt can be settled.");
    }
    expectRefused(() => acknowledge(receipt, { ...ACK, acknowledgedAt: "later" }), "Control acknowledgement requires a timezone-qualified acknowledgedAt.");
    expectRefused(() => settle(ack, { ...DONE, settledAt: "2026-10-15T07:00:09" }), "Control result requires a timezone-qualified settledAt.");
  });

  it("one chokepoint: control.ts calls the shared helper once, inside the one admission acknowledge() and settle() both call", () => {
    const text = readFileSync(new URL("../src/workbench/control.ts", import.meta.url), "utf8");
    const file = ts.createSourceFile("control.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const calls: { callee: string; inside: string | undefined }[] = [];
    const visit = (node: ts.Node, inside: string | undefined): void => {
      const here = ts.isFunctionDeclaration(node) && node.name ? node.name.text : inside;
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) calls.push({ callee: node.expression.text, inside: here });
      ts.forEachChild(node, child => visit(child, here));
    };
    visit(file, undefined);
    const helper = calls.filter(call => call.callee === "sanitizeWorkbenchText");
    expect(helper, "exactly one sanitizeWorkbenchText call in control.ts").toHaveLength(1);
    const chokepoint = helper[0].inside;
    expect(chokepoint, "the call sits inside a named module function").toBeTypeOf("string");
    const callsIn = (name: string): string[] => calls.filter(call => call.inside === name).map(call => call.callee);
    expect(callsIn("acknowledge").filter(callee => callee === chokepoint)).toHaveLength(1);
    expect(callsIn("settle").filter(callee => callee === chokepoint)).toHaveLength(2);
    // Neither records a reference through the strip-only check any more.
    expect(callsIn("acknowledge")).not.toContain("cleanText");
    expect(callsIn("settle")).not.toContain("cleanText");
  });
});
