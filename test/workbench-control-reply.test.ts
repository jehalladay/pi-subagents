/** wb-752.4 (W16-F): the pure, bounded workflow_control reply builder. It renders a ControlDecision or a NativeControlReceipt and never decides. */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  acknowledge,
  CONTROL_PERMIT_POLICY,
  CONTROL_REF_NOT_ADMITTED_REASON,
  CONTROL_REF_REFUSAL_POLICY,
  CONTROL_WITHHELD_REF,
  type ControlDecision,
  type ControlDenyPolicy,
  DESTRUCTIVE_CONTROL_ACTIONS,
  decideControl,
  isCoreMintedDecision,
  type NativeControlReceipt,
  type NativeControlRequest,
  settle,
} from "../src/workbench/control.js";
import { buildControlReply, CONTROL_REPLY_CONTRACT_VERSION, DEFAULT_CONTROL_REPLY_BYTES, MAX_CONTROL_REPLY_BYTES, MIN_CONTROL_REPLY_BYTES } from "../src/workbench/control-reply.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";

const SCOPE: ObservationScope = { workspace: "/tmp/external-ws", principal: "tester" };
const AT = "2026-10-15T06:00:00Z";
const GRANT = "control:furnace.stop";
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: SCOPE.workspace };
const OWNS: Relation["provenance"] = { source: "furnace", observedAt: AT, nativeConfirmationRef: "req-attempts" };

function projection(): ObservationProjection {
  const result = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) {
    result.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "furnace.snapshot",
      node: { title: `furnace ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  result.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: OWNS });
  return result;
}
function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return { scope: { ...SCOPE }, principal: { id: SCOPE.principal }, grants: [GRANT], target: { ...RUN }, action: "stop", params: { confirmed: true },
    invocationId: "inv-control-1", requestedAt: "2026-10-15T07:00:00Z", ...overrides };
}
const decide = (overrides: Partial<NativeControlRequest> = {}): ControlDecision =>
  decideControl(request(overrides), { projection: projection(), now: () => "2026-10-15T07:00:01Z" });
function requested(): NativeControlReceipt {
  const decision = decide();
  if (decision.decision !== "permitted") throw new Error("expected permit");
  return decision.receipt;
}
const ACK = { acknowledgedAt: "2026-10-15T07:00:02Z", nativeAckRef: "furnace-ack-7" };
const RESULT = { outcome: "completed" as const, nativeResultRef: "furnace-result-9", settledAt: "2026-10-15T07:00:03Z" };
const acked = (): NativeControlReceipt => acknowledge(requested(), ACK);
const settled = (): NativeControlReceipt => settle(acked(), RESULT);
const parse = (text: string): Record<string, JsonValue> => JSON.parse(text) as Record<string, JsonValue>;

describe("denied decisions render typed sanitized refusals", () => {
  const cases: readonly [ControlDenyPolicy, Partial<NativeControlRequest>][] = [
    ["observer-only", { grants: ["observe:furnace.run.inspect"] }],
    ["unknown-permission-data", { grants: ["*"] }],
    ["malformed-request", { invocationId: "" }],
    ["unknown-action", { action: "obliterate" }],
    ["missing-exact-grant", { grants: ["control:furnace.resume"] }],
    ["cross-scope", { target: { ...RUN, id: "frn-run-ghost" } }],
    ["operator-confirmation", { params: {} }],
  ];
  for (const [policy, overrides] of cases) {
    it(`renders ${policy} from the landed core with policy and category, no phase receipt`, () => {
      const decision = decide(overrides);
      expect(decision).toMatchObject({ decision: "denied", policy });
      const out = buildControlReply(decision);
      const body = parse(out.text);
      expect(body).toMatchObject({ contractVersion: CONTROL_REPLY_CONTRACT_VERSION, kind: "control-reply", status: "denied", policy, truncated: false });
      expect(body.category).toBe(decision.decision === "denied" ? decision.category : "");
      for (const phase of ["requested", "acknowledged", "result", "nativeAckRef", "nativeResultRef", "requestId"]) expect(body).not.toHaveProperty(phase);
      expect(out.reply).toEqual(body);
      expect(out.truncated).toBe(false);
    });
  }

  it("no-confirmed-ownership is a typed refusal too", () => {
    const empty = new ObservationProjection();
    empty.refresh({ source: RUN, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "furnace.snapshot",
      node: { title: "run", type: "workflow", statusText: "active", statusTone: "active" } });
    const decision = decideControl(request(), { projection: empty, now: () => "2026-10-15T07:00:01Z" });
    expect(parse(buildControlReply(decision).text)).toMatchObject({ status: "denied", policy: "no-confirmed-ownership", category: "authorization" });
  });

  it("names the exact grant only when it is an allowlisted provider.action, and never echoes caller text", () => {
    const missing = parse(buildControlReply(decide({ grants: ["control:furnace.resume"] })).text);
    expect(missing.requiredGrant).toBe(GRANT);
    const hostile: ControlDecision = { decision: "denied", category: "authorization", policy: "missing-exact-grant",
      reason: "missing exact grant control:evil.\u001b[31mrm -rf \u001b]0;pwn\u0007 caller-supplied-marker" };
    const text = buildControlReply(hostile).text;
    expect(text).not.toContain("caller-supplied-marker");
    expect(text).not.toContain("evil");
    expect(text).not.toContain("\u001b");
    expect(parse(text)).not.toHaveProperty("requiredGrant");
  });

  it("an operator-confirmation refusal states the exact literal the operator must set", () => {
    const body = parse(buildControlReply(decide({ params: {} })).text);
    expect(body.requiredParams).toEqual({ confirmed: true });
    expect(body.policy).toBe("operator-confirmation");
    expect(String(body.hint)).toContain("params.confirmed");
  });

  it("is a pure render: the same denied decision always renders identically", () => {
    const decision = decide({ params: {} });
    expect(buildControlReply(decision).text).toBe(buildControlReply(decision).text);
  });
});

describe("phase replies are three distinct shapes", () => {
  it("requested: carries the receipt audit core and its timestamps, no acknowledgement or result", () => {
    const receipt = requested();
    const body = parse(buildControlReply(receipt).text);
    expect(body).toMatchObject({ kind: "control-reply", status: "requested", phase: "requested", completionBasis: "not-established", verification: "not-performed", truncated: false });
    expect(body.requested).toMatchObject({
      requestId: (receipt as { requestId: string }).requestId, grant: GRANT, policy: receipt.policy, action: "stop", invocationId: "inv-control-1",
      requestedAt: "2026-10-15T07:00:00Z", decidedAt: "2026-10-15T07:00:01Z", ownershipConfirmationRef: "req-attempts",
      target: { provider: "furnace", type: "run", id: "frn-run-r1" },
    });
    expect(body.requested).toHaveProperty("destructive", DESTRUCTIVE_CONTROL_ACTIONS.includes("stop"));
    expect(body).not.toHaveProperty("acknowledged");
    expect(body).not.toHaveProperty("result");
  });

  it("acknowledged: native ack echo verbatim, completion explicitly not established, no result", () => {
    const body = parse(buildControlReply(acked()).text);
    expect(body).toMatchObject({ status: "acknowledged", phase: "acknowledged", completionBasis: "not-established", verification: "not-performed" });
    expect(body.acknowledged).toEqual({ acknowledgedAt: ACK.acknowledgedAt, nativeAckRef: ACK.nativeAckRef });
    expect(body.requested).toBeDefined();
    expect(body).not.toHaveProperty("result");
    expect(String(body.notice)).toMatch(/completion is not established/i);
  });

  it("result: the producer's own outcome and refs verbatim, labeled producer-reported and never verified", () => {
    const body = parse(buildControlReply(settled()).text);
    expect(body).toMatchObject({ status: "result", phase: "result", completionBasis: "producer-reported", verification: "not-performed" });
    expect(body.acknowledged).toEqual({ acknowledgedAt: ACK.acknowledgedAt, nativeAckRef: ACK.nativeAckRef });
    expect(body.result).toEqual({ outcome: "completed", nativeResultRef: RESULT.nativeResultRef, settledAt: RESULT.settledAt });
    expect(String(body.notice)).toMatch(/not verified|observed/i);
  });

  it("a failed or unknown outcome is carried, never upgraded to completion", () => {
    for (const outcome of ["failed", "cancelled", "unknown"] as const) {
      const receipt = settle(acked(), { ...RESULT, outcome });
      const body = parse(buildControlReply(receipt).text);
      expect((body.result as Record<string, JsonValue>).outcome).toBe(outcome);
      expect(body.verification).toBe("not-performed");
    }
  });

  it("the three phases render different status values and field sets", () => {
    const shapes = [requested(), acked(), settled()].map(receipt => Object.keys(parse(buildControlReply(receipt).text)).sort().join(","));
    expect(new Set(shapes).size).toBe(3);
  });

  it("destructive confirmation state is carried from the core receipt policy, never minted by the builder", () => {
    const body = parse(buildControlReply(requested()).text);
    const core = body.requested as Record<string, JsonValue>;
    expect(core.policy).toContain("operator-confirmed");
    // Without the core's permit, the builder has nothing to render but a refusal: it cannot produce a requested reply from a denial.
    const refused = parse(buildControlReply(decide({ params: { confirmed: "yes" } })).text);
    expect(refused.status).toBe("denied");
    expect(refused).not.toHaveProperty("requested");
  });

  it("refuses a malformed receipt with a typed reply instead of throwing or inventing a phase", () => {
    const bogus = { phase: "teleported", contractVersion: "workbench.control/v1" } as unknown as NativeControlReceipt;
    expect(parse(buildControlReply(bogus).text)).toMatchObject({ status: "denied", policy: "malformed-input", category: "validation" });
    const wrongVersion = { ...requested(), contractVersion: "other/v9" } as unknown as NativeControlReceipt;
    expect(parse(buildControlReply(wrongVersion).text)).toMatchObject({ status: "denied", policy: "malformed-input" });
    expect(parse(buildControlReply(null as unknown as ControlDecision).text)).toMatchObject({ policy: "malformed-input" });
  });

  it("does not mutate its input", () => {
    const receipt = settled();
    const before = JSON.stringify(receipt);
    buildControlReply(receipt);
    expect(JSON.stringify(receipt)).toBe(before);
  });
});

describe("sanitization", () => {
  it("neutralizes ANSI, OSC, C0, bidi and zero-width input carried in echo refs and titles of a hand-built receipt", () => {
    const hostileRef = "ack\u001b[2J\u001b]0;owned\u0007-\u0000\u202E\u2066-a\u200Bb\u200Dc\uFEFFd";
    const receipt = { ...acked(), nativeAckRef: hostileRef } as unknown as NativeControlReceipt;
    const out = buildControlReply(receipt);
    for (const bad of ["\u001b", "\u0007", "\u0000", "\u202E", "\u2066", "\u200B", "\u200D", "\uFEFF"]) {
      expect(out.text).not.toContain(bad);
      expect(JSON.stringify(out.reply)).not.toContain(bad);
    }
    expect(out.text).toContain("ack");
  });

  it("redacts credential-looking text in refs through the shared sanitizer", () => {
    const receipt = { ...acked(), nativeAckRef: "ref Bearer abc.def.ghi sk-ant-secretsecret" } as unknown as NativeControlReceipt;
    const text = buildControlReply(receipt).text;
    expect(text).not.toContain("abc.def.ghi");
    expect(text).not.toContain("sk-ant-secretsecret");
    expect(text).toContain("[REDACTED]");
  });

  it("does not let an adversarial title key or value break the compact JSON", () => {
    const base = requested() as unknown as Record<string, unknown>;
    const receipt = { ...base, action: "stop\n\"},\"injected\":{\"a\":1" } as unknown as NativeControlReceipt;
    const body = parse(buildControlReply(receipt).text);
    expect(body).not.toHaveProperty("injected");
  });
});

describe("byte cap", () => {
  const encoded = (text: string): number => Buffer.byteLength(text, "utf8");

  it("is compact JSON within the default budget with truncated:false for ordinary receipts", () => {
    const out = buildControlReply(settled());
    expect(out.text).toBe(JSON.stringify(JSON.parse(out.text)));
    expect(out.bytes).toBe(encoded(out.text));
    expect(out.bytes).toBeLessThanOrEqual(DEFAULT_CONTROL_REPLY_BYTES);
    expect(out.truncated).toBe(false);
    expect(parse(out.text).truncated).toBe(false);
  });

  it("degrades honestly under a small cap: valid JSON, truncated:true, never over budget, phase preserved", () => {
    const full = buildControlReply(settled());
    const cap = Math.max(MIN_CONTROL_REPLY_BYTES, Math.floor(full.bytes / 2));
    const out = buildControlReply(settled(), { maxBytes: cap });
    const body = parse(out.text);
    expect(out.truncated).toBe(true);
    expect(body.truncated).toBe(true);
    expect(out.bytes).toBeLessThanOrEqual(cap);
    expect(encoded(out.text)).toBeLessThanOrEqual(cap);
    expect(body).toMatchObject({ kind: "control-reply", status: "result", verification: "not-performed" });
    expect(body.truncation).toMatchObject({ reason: "byte-cap", maxBytes: cap });
  });

  it("truncates an oversize adversarial ref without collapsing the reply or exceeding the cap", () => {
    const receipt = { ...acked(), nativeAckRef: "x".repeat(4000) } as unknown as NativeControlReceipt;
    for (const maxBytes of [MIN_CONTROL_REPLY_BYTES, 700, 1024, 2048]) {
      const out = buildControlReply(receipt, { maxBytes });
      expect(out.bytes).toBeLessThanOrEqual(maxBytes);
      expect(out.truncated).toBe(true);
      expect(parse(out.text)).toMatchObject({ status: "acknowledged", truncated: true });
    }
  });

  it("clamps an out-of-range or invalid budget instead of throwing or going over", () => {
    expect(buildControlReply(requested(), { maxBytes: 1 }).bytes).toBeLessThanOrEqual(MIN_CONTROL_REPLY_BYTES);
    expect(buildControlReply(requested(), { maxBytes: Number.NaN }).bytes).toBeLessThanOrEqual(DEFAULT_CONTROL_REPLY_BYTES);
    expect(buildControlReply(requested(), { maxBytes: Number.POSITIVE_INFINITY }).bytes).toBeLessThanOrEqual(DEFAULT_CONTROL_REPLY_BYTES * 16);
  });

  it("caps denied replies as well", () => {
    const out = buildControlReply(decide({ params: {} }), { maxBytes: MIN_CONTROL_REPLY_BYTES });
    expect(out.bytes).toBeLessThanOrEqual(MIN_CONTROL_REPLY_BYTES);
    expect(parse(out.text).status).toBe("denied");
  });
});

const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
const NUL = cp(0x00);
const LF = cp(0x0a);
const ZWSP = cp(0x200b);
const LRM = cp(0x200e);
const RLM = cp(0x200f);
const ZWJ = cp(0x200d);
const WJ = cp(0x2060);
const BOM = cp(0xfeff);
const RLO = cp(0x202e);
/** Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates. */
const UNSAFE = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;
/** Every string leaf of a reply, keys included. */
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
/** The CapabilityError a core call throws, or undefined when it accepts. */
function refusalOf(run: () => unknown): CapabilityError | undefined {
  try {
    run();
  } catch (error) {
    if (error instanceof CapabilityError) return error;
    throw error;
  }
  return undefined;
}
/** Hand-built receipts: a core-minted receipt with one echo replaced by text the core itself would refuse to record. */
const withAck = (ref: string): NativeControlReceipt => ({ ...acknowledge(requested(), ACK), nativeAckRef: ref });
const withResult = (ref: string): NativeControlReceipt => ({ ...settle(acknowledge(requested(), ACK), RESULT), nativeResultRef: ref });
const withTarget = (id: string): NativeControlReceipt => ({ ...requested(), target: { ...RUN, id } });

describe("wb-752.4 U1: invisible characters never reassemble a redacted credential", () => {
  // Spec (14:17Z ruling U1, re-expressed per the 01:17Z verdict U2): seven within-token probe refs. Since wb-952 the landed core
  // reads every default-ignorable as an unsafe unit and REFUSES each of these refs (pinned below), so no core-minted receipt
  // carries one; the builder's own routing through the one helper is the only defense for a receipt the core did not mint.
  // Each shape is therefore a builder-defense probe on a HAND-BUILT receipt beside a pin of the core's refusal of that shape.
  // Since wb-5a7 the core refuses by withholding: the phase is recorded, the reference is the fixed marker, and a typed
  // refusal sits on the receipt it mints, never a throw.
  const probes: readonly [string, string, string][] = [
    ["ZWSP in sk-ant- prefix", `ref sk-ant-${ZWSP}api03-ZWSECRETAAAA`, "ZWSECRETAAAA"],
    ["LRM in sk-ant- prefix", `ref sk-ant-${LRM}api03-LRMSECRETAAAA`, "LRMSECRETAAAA"],
    ["RLM in ghp_ prefix", `ref ghp_${RLM}RLMSECRETAAAA`, "RLMSECRETAAAA"],
    ["ZWSP inside Bearer", `auth Bear${ZWSP}er abc123secret`, "abc123secret"],
    ["ZWJ inside password", `pass${ZWJ}word=hunter2`, "hunter2"],
    ["WJ inside api_key", `api${WJ}_key=xyz789secret`, "xyz789secret"],
    ["BOM inside github_pat_", `github${BOM}_pat_BOMSECRETAAAA`, "BOMSECRETAAAA"],
  ];
  for (const [label, ref, secret] of probes) {
    it(`acknowledged reply redacts ${label}`, () => {
      const hostile = withAck(ref);
      const out = buildControlReply(hostile);
      expect(out.text).not.toContain(secret);
      expect(out.text).toContain("[REDACTED]");
    });
    it(`result reply redacts ${label}`, () => {
      const hostile = withResult(ref);
      const out = buildControlReply(hostile);
      expect(out.text).not.toContain(secret);
      expect(out.text).toContain("[REDACTED]");
    });
    it(`the landed core refuses ${label} as an acknowledgement reference`, () => {
      expect(refusalOf(() => acknowledge(requested(), { ...ACK, nativeAckRef: ref }))).toBeUndefined();
      const receipt = acknowledge(requested(), { ...ACK, nativeAckRef: ref });
      expect(receipt).toMatchObject({ phase: "acknowledged", nativeAckRef: CONTROL_WITHHELD_REF,
        refusals: [{ policy: CONTROL_REF_REFUSAL_POLICY, category: "validation", field: "nativeAckRef", reason: CONTROL_REF_NOT_ADMITTED_REASON }] });
      expect(JSON.stringify(receipt)).not.toContain(secret);
      expect(buildControlReply(receipt).text).not.toContain(secret);
    });
    it(`the landed core refuses ${label} as a result reference`, () => {
      expect(refusalOf(() => settle(acked(), { ...RESULT, nativeResultRef: ref }))).toBeUndefined();
      const receipt = settle(acked(), { ...RESULT, nativeResultRef: ref });
      expect(receipt).toMatchObject({ phase: "result", nativeAckRef: ACK.nativeAckRef, nativeResultRef: CONTROL_WITHHELD_REF,
        refusals: [{ policy: CONTROL_REF_REFUSAL_POLICY, category: "validation", field: "nativeResultRef", reason: CONTROL_REF_NOT_ADMITTED_REASON }] });
      expect(JSON.stringify(receipt)).not.toContain(secret);
      expect(buildControlReply(receipt).text).not.toContain(secret);
    });
  }
  it("a bidi override inside a credential (hand-built receipt, the core refuses such refs) is redacted as one token by the one helper", () => {
    const hostile = { ...acked(), nativeAckRef: `ref sk-ant-${RLO}api03-BIDISECRETAAAA` } as unknown as NativeControlReceipt;
    const out = buildControlReply(hostile);
    expect(out.text).not.toContain("BIDISECRETAAAA");
    expect(out.text).toContain("[REDACTED]");
  });
  it("an unsplit control credential is redacted too (the probes are not vacuous)", () => {
    const out = buildControlReply(withAck("ref sk-ant-api03-PLAINSECRETAAAA"));
    expect(out.text).not.toContain("PLAINSECRETAAAA");
    expect(out.text).toContain("[REDACTED]");
    // wb-5a7: through the real core the same reference never reaches a receipt; the reply shows the withheld marker.
    const core = buildControlReply(acknowledge(requested(), { ...ACK, nativeAckRef: "ref sk-ant-api03-PLAINSECRETAAAA" }));
    expect(core.text).not.toContain("PLAINSECRETAAAA");
    expect((parse(core.text).acknowledged as Record<string, JsonValue>).nativeAckRef).toBe(CONTROL_WITHHELD_REF);
  });
});

/** The three echo paths of a hand-built receipt: what the control wiring could hand the builder that the core did not mint. */
const ECHO_PATHS: readonly (readonly [path: string, receipt: (raw: string) => NativeControlReceipt, field: (body: Record<string, JsonValue>) => JsonValue])[] = [
  ["acknowledged.nativeAckRef", withAck, body => (body.acknowledged as Record<string, JsonValue>).nativeAckRef],
  ["result.nativeResultRef", withResult, body => (body.result as Record<string, JsonValue>).nativeResultRef],
  ["requested.target.id", withTarget, body => ((body.requested as Record<string, JsonValue>).target as Record<string, JsonValue>).id],
];

describe("wb-752.4 respin U1: between-token separators reach the one helper untouched (F6 display-path rule, wb-952 site 13)", () => {
  // Spec (01:17Z verdict U1): drop the local invisible-deletion regex and the strip/redact pre-pass; route every display string
  // through sanitizeWorkbenchText(value, REF_TEXT_LIMIT, NAMED layout) exactly once; red-first BETWEEN-token shapes through
  // hand-built receipts ("key<U+200B>sk-ant-...", "Authorization: Bearer<U+FEFF>...", "x<NUL>Bearer ...", "first line<LF>sk-ant-...").
  // The table is the gate's seat separator corpus: 12 shapes x 28 separators + 3 plain rows = 339, of which the 32 rows with a
  // whitespace unit inside a keyword are control rows (whitespace always separates, wb-952 12:10Z, so the keyword is split).
  const separators: readonly (readonly [name: string, unit: string])[] = [
    ["NUL", cp(0x00)], ["BEL", cp(0x07)], ["BS", cp(0x08)], ["TAB", cp(0x09)], ["LF", cp(0x0a)], ["VT", cp(0x0b)], ["FF", cp(0x0c)],
    ["CR", cp(0x0d)], ["SGR", `${cp(0x1b)}[0m`], ["DEL", cp(0x7f)], ["NEL", cp(0x85)], ["CSI", cp(0x9b)], ["SHY", cp(0xad)], ["ALM", cp(0x61c)],
    ["MVS", cp(0x180e)], ["ZWSP", cp(0x200b)], ["ZWNJ", cp(0x200c)], ["ZWJ", cp(0x200d)], ["LRM", cp(0x200e)], ["RLM", cp(0x200f)],
    ["LS", cp(0x2028)], ["PS", cp(0x2029)], ["RLO", cp(0x202e)], ["LRI", cp(0x2066)], ["WJ", cp(0x2060)], ["BOM", cp(0xfeff)],
    ["CGJ", cp(0x34f)], ["VS16", cp(0xfe0f)],
  ];
  const whitespace: ReadonlySet<string> = new Set(["TAB", "LF", "VT", "FF", "CR", "NEL", "LS", "PS"]);
  type Shape = (unit: string, secret: string) => string;
  /** A unit between two tokens: before a boundary-anchored start, or as the space after a scheme. */
  const between: readonly (readonly [position: string, shape: Shape])[] = [
    ["before sk-ant-", (unit, secret) => `key${unit}sk-ant-api03-${secret}`],
    ["before sk-proj-", (unit, secret) => `key${unit}sk-proj-${secret}`],
    ["before ghp_", (unit, secret) => `see${unit}ghp_${secret}`],
    ["before github_pat_", (unit, secret) => `see${unit}github_pat_${secret}`],
    ["before Bearer", (unit, secret) => `x${unit}Bearer ${secret}`],
    ["before Basic", (unit, secret) => `x${unit}Basic ${secret}`],
    ["as the space after Bearer", (unit, secret) => `Authorization: Bearer${unit}${secret}`],
    ["as the space after Basic", (unit, secret) => `Authorization: Basic${unit}${secret}`],
  ];
  /** A unit inside a keyword or key prefix. */
  const inside: readonly (readonly [position: string, shape: Shape])[] = [
    ["inside Bearer", (unit, secret) => `Authorization: Bea${unit}rer ${secret}`],
    ["inside password", (unit, secret) => `pass${unit}word=${secret}`],
    ["inside api_key", (unit, secret) => `api${unit}_key=${secret}`],
    ["inside sk-ant-", (unit, secret) => `sk-a${unit}nt-${secret}`],
  ];
  interface SeparatorProbe {
    readonly id: string;
    readonly raw: string;
    readonly secret: string;
    /** A whitespace unit inside a keyword: the ruled reading splits the keyword, so the value is shown, not hidden. */
    readonly control: boolean;
  }
  const table: readonly SeparatorProbe[] = [
    ...separators.flatMap(([name, unit], u) => [
      ...between.map(([position, shape], s): SeparatorProbe => {
        const secret = `SEPARATOR${u}B${s}SECRET`;
        return { id: `${name} ${position}`, raw: shape(unit, secret), secret, control: false };
      }),
      ...inside.map(([position, shape], s): SeparatorProbe => {
        const secret = `SEPARATOR${u}I${s}SECRET`;
        return { id: `${name} ${position}`, raw: shape(unit, secret), secret, control: whitespace.has(name) };
      }),
    ]),
    { id: "plain sk-ant-", raw: "key sk-ant-api03-PLAINSEPARATORONE", secret: "PLAINSEPARATORONE", control: false },
    { id: "plain Bearer", raw: "Authorization: Bearer PLAINSEPARATORTWO", secret: "PLAINSEPARATORTWO", control: false },
    { id: "plain password", raw: "password=PLAINSEPARATORTHREE", secret: "PLAINSEPARATORTHREE", control: false },
  ];

  it("the table is the gate's 339 shapes with 32 whitespace-inside-keyword control rows", () => {
    expect(table.length).toBe(339);
    expect(table.filter(probe => probe.control).length).toBe(32);
  });
  for (const [path, build, field] of ECHO_PATHS) {
    it(`${path}: every separator shape is shown exactly as the one helper's text layout, redacted, with no unsafe unit kept`, () => {
      const failures: string[] = [];
      for (const probe of table) {
        const out = buildControlReply(build(probe.raw), { maxBytes: MAX_CONTROL_REPLY_BYTES });
        if (field(parse(out.text)) !== sanitizeWorkbenchText(probe.raw, Number.POSITIVE_INFINITY, "text")) failures.push(`${probe.id}: not the helper's text layout`);
        if (!probe.control && out.text.includes(probe.secret)) failures.push(`${probe.id}: leaked`);
        if (strings(out.reply).some(text => UNSAFE.test(text))) failures.push(`${probe.id}: kept an unsafe unit`);
      }
      expect(failures).toEqual([]);
    });
  }
  const named: readonly (readonly [label: string, raw: string, secret: string])[] = [
    ["ZWSP before sk-ant-", `key${ZWSP}sk-ant-api03-NAMEDSECRETONE`, "NAMEDSECRETONE"],
    ["BOM as the space after Bearer", `Authorization: Bearer${BOM}NAMEDSECRETTWO`, "NAMEDSECRETTWO"],
    ["NUL before Bearer", `x${NUL}Bearer NAMEDSECRETTHREE`, "NAMEDSECRETTHREE"],
    ["LF before sk-ant-", `first line${LF}sk-ant-api03-NAMEDSECRETFOUR`, "NAMEDSECRETFOUR"],
  ];
  for (const [label, raw, secret] of named) {
    it(`${label}: redacted in every echo of a hand-built receipt`, () => {
      for (const [path, build] of ECHO_PATHS) {
        const out = buildControlReply(build(raw), { maxBytes: MAX_CONTROL_REPLY_BYTES });
        expect(out.text, path).not.toContain(secret);
        expect(out.text, path).toContain("[REDACTED]");
      }
    });
  }
});

describe("wb-752.4 respin: the compact tier cuts only what the one helper already redacted", () => {
  // Deletion never precedes redaction (wb-952 16:44Z), and a cut is a deletion: cutting a raw ref first can drop the closing
  // quote of a quoted assignment, so the redactor reads an unquoted value that stops at the first space and the rest of the
  // secret shows. The core accepted such a ref until wb-5a7 (it carries no unsafe unit); it now withholds it, since the label
  // layout redacts it (pinned below), so a hand-built receipt is what reaches this tier.
  const secret = "QUOTEDPARTSECRET";
  const windows = Array.from({ length: secret.length - 3 }, (_, at) => secret.slice(at, at + 4));
  const exposes = (text: string): boolean => windows.some(window => text.includes(window));
  const quoted = (pad: number): string => `password="${"w ".repeat(pad)}${secret} ${"z".repeat(3600)}"`;
  const paths: readonly (readonly [path: string, receipt: (ref: string) => NativeControlReceipt])[] = [
    ["acknowledged.nativeAckRef of a hand-built receipt", withAck],
    ["result.nativeResultRef of a hand-built receipt", withResult],
    ["requested.target.id of a hand-built receipt", withTarget],
  ];
  it("the real core withholds every quoted-secret reference, so no part of the secret reaches a receipt or a reply (wb-5a7)", () => {
    for (const pad of [1, 2, 4, 8, 12, 16]) {
      const ack = acknowledge(requested(), { ...ACK, nativeAckRef: quoted(pad) });
      const result = settle(acked(), { ...RESULT, nativeResultRef: quoted(pad) });
      expect([ack.nativeAckRef, result.nativeResultRef]).toStrictEqual([CONTROL_WITHHELD_REF, CONTROL_WITHHELD_REF]);
      for (const receipt of [ack, result]) {
        expect(exposes(JSON.stringify(receipt))).toBe(false);
        expect(exposes(buildControlReply(receipt, { maxBytes: MAX_CONTROL_REPLY_BYTES }).text)).toBe(false);
      }
    }
  });
  for (const [path, build] of paths) {
    it(`${path}: no cap exposes any part of a quoted secret`, () => {
      const exposed: string[] = [];
      let compactEchoes = 0;
      for (const pad of [1, 2, 4, 8, 12, 16]) {
        const receipt = build(quoted(pad));
        const full = buildControlReply(receipt, { maxBytes: MAX_CONTROL_REPLY_BYTES });
        expect(exposes(full.text)).toBe(false);
        for (let maxBytes = MIN_CONTROL_REPLY_BYTES; maxBytes < full.bytes; maxBytes += 2) {
          const out = buildControlReply(receipt, { maxBytes });
          if (exposes(out.text)) exposed.push(`pad ${pad} maxBytes ${maxBytes}`);
          if (out.truncated && out.text.includes("password=")) compactEchoes += 1;
        }
      }
      expect(exposed).toEqual([]);
      // Not vacuous: the sweep reaches the compact tier with the echo still shown.
      expect(compactEchoes).toBeGreaterThan(0);
    });
  }
  it("the compact tier cuts every echo block at the compact width, and only past it", () => {
    const receipt: NativeControlReceipt = { ...settle(acknowledge(requested(), ACK), RESULT), target: { ...RUN, id: "t".repeat(65) }, nativeAckRef: "a".repeat(64), nativeResultRef: "r".repeat(300) };
    const full = buildControlReply(receipt, { maxBytes: MAX_CONTROL_REPLY_BYTES });
    const out = buildControlReply(receipt, { maxBytes: full.bytes - 1 });
    const body = parse(out.text);
    const block = (name: string): Record<string, JsonValue> => body[name] as Record<string, JsonValue>;
    expect(out.truncated).toBe(true);
    expect(body.truncation).toMatchObject({ reason: "byte-cap" });
    expect(block("requested")).not.toHaveProperty("invocationId");
    expect((block("requested").target as Record<string, JsonValue>).id).toBe(`${"t".repeat(52)} [truncated]`);
    expect(block("acknowledged").nativeAckRef).toBe("a".repeat(64));
    expect(block("result").nativeResultRef).toBe(`${"r".repeat(52)} [truncated]`);
  });
  it("the compact cut counts code points, so no surrogate pair is split and no lone surrogate reaches the reply", () => {
    const receipt = acknowledge(requested(), { ...ACK, nativeAckRef: `a${cp(0x1f642).repeat(300)}` });
    let cutEchoes = 0;
    for (let maxBytes = MIN_CONTROL_REPLY_BYTES; maxBytes <= 2048; maxBytes += 16) {
      const out = buildControlReply(receipt, { maxBytes });
      expect(out.bytes).toBeLessThanOrEqual(maxBytes);
      for (const text of strings(out.reply)) expect(text).not.toMatch(/[\u{d800}-\u{dfff}]/u);
      const acknowledged = parse(out.text).acknowledged;
      const ref = acknowledged !== null && typeof acknowledged === "object" && !Array.isArray(acknowledged) ? acknowledged.nativeAckRef : undefined;
      if (typeof ref === "string" && ref.endsWith(" [truncated]")) cutEchoes += 1;
    }
    expect(cutEchoes).toBeGreaterThan(0);
  });
});

describe("wb-752.4 U3: truncation is honest on the final cut", () => {
  // Spec (gate verdict U3): truncated:true plus a marker whenever ANY text was cut, including the shared sanitizer's
  // text cap after redaction expansion, keyed on the final serialized reply.
  const expanding = (length: number): string => "Bearer x ".repeat(Math.ceil(length / 9)).slice(0, length);
  const cut = (text: string): boolean => text.includes("[truncated]");
  it("a 4094-char Bearer ref whose redaction expansion hits the text cap reports truncated:true at 65536 (ack and result)", () => {
    const ackRef = expanding(4094);
    // wb-5a7: the core now withholds such a ref (the label layout redacts it), so the builder's own cut is measured on a
    // hand-built receipt and the core path is pinned at the end.
    const ack = buildControlReply(withAck(ackRef), { maxBytes: 65536 });
    expect(cut(ack.text)).toBe(true);
    expect(ack.truncated).toBe(true);
    expect(parse(ack.text).truncated).toBe(true);
    expect(parse(ack.text)).toHaveProperty("truncation");
    const result = buildControlReply(withResult(ackRef), { maxBytes: 65536 });
    expect(cut(result.text)).toBe(true);
    expect(result.truncated).toBe(true);
    expect(parse(result.text)).toHaveProperty("truncation");
    expect(acknowledge(requested(), { ...ACK, nativeAckRef: ackRef }).nativeAckRef).toBe(CONTROL_WITHHELD_REF);
    expect(settle(acked(), { ...RESULT, nativeResultRef: ackRef }).nativeResultRef).toBe(CONTROL_WITHHELD_REF);
  });
  it("whenever the reply text carries a cut marker the flag is set, across caps and phases; never over the cap", () => {
    let cuts = 0;
    for (const length of [100, 3000, 4094]) {
      for (const maxBytes of [512, 1024, 4096, 5000, 16384, 65536]) {
        for (const build of [
          () => withAck(expanding(length)),
          () => withResult(expanding(length)),
          () => acknowledge(requested(), { ...ACK, nativeAckRef: expanding(length) }),
          () => settle(acked(), { ...RESULT, nativeResultRef: expanding(length) }),
        ]) {
          const out = buildControlReply(build(), { maxBytes });
          expect(out.bytes).toBeLessThanOrEqual(maxBytes);
          if (cut(out.text)) {
            cuts += 1;
            expect(out.truncated).toBe(true);
          }
          expect(parse(out.text).truncated).toBe(out.truncated);
        }
      }
    }
    // Not vacuous: the hand-built echoes still reach a cut (wb-5a7 moved the expanding refs off the core path).
    expect(cuts).toBeGreaterThan(0);
  });
  it("an ordinary ref is not flagged truncated", () => {
    const out = buildControlReply(acknowledge(requested(), { ...ACK, nativeAckRef: "furnace-ack-7" }), { maxBytes: 65536 });
    expect(out.truncated).toBe(false);
    expect(parse(out.text)).not.toHaveProperty("truncation");
  });
  it("M9: a cap between the compact and full sizes yields the compact tier with clipped echo refs", () => {
    const longId = "r".repeat(200);
    const receipt = { ...requested(), target: { ...RUN, id: longId } } as unknown as NativeControlReceipt;
    const full = buildControlReply(receipt, { maxBytes: 65536 });
    const out = buildControlReply(receipt, { maxBytes: full.bytes - 1 });
    const body = parse(out.text);
    expect(out.truncated).toBe(true);
    expect(out.bytes).toBeLessThan(full.bytes);
    const target = (body.requested as Record<string, JsonValue>).target as Record<string, string>;
    expect(target.id.length).toBe(64);
    expect(target.id.endsWith(" [truncated]")).toBe(true);
    expect(body.requested).not.toHaveProperty("invocationId");
    expect(body.truncation).toMatchObject({ reason: "byte-cap", maxBytes: full.bytes - 1 });
  });
  it("M15: the budget floor is the minimum, not the requested value", () => {
    const out = buildControlReply(settled(), { maxBytes: 1 });
    expect(parse(out.text).truncation).toMatchObject({ reason: "byte-cap", maxBytes: MIN_CONTROL_REPLY_BYTES });
    expect(out.bytes).toBeLessThanOrEqual(MIN_CONTROL_REPLY_BYTES);
    expect(out.truncated).toBe(true);
  });
  it("byte caps are UTF-8 bytes, never string length: CJK and emoji refs stay within every cap", () => {
    const encoder = new TextEncoder();
    const ref = `ack-${"\u6f22".repeat(300)}${"\u{1f642}".repeat(100)}`;
    for (const maxBytes of [MIN_CONTROL_REPLY_BYTES, 700, 1024, 2048, 4096]) {
      const out = buildControlReply(acknowledge(requested(), { ...ACK, nativeAckRef: ref }), { maxBytes });
      expect(encoder.encode(out.text).length).toBeLessThanOrEqual(maxBytes);
      expect(out.bytes).toBe(encoder.encode(out.text).length);
      expect(parse(out.text)).toMatchObject({ status: "acknowledged" });
    }
  });
  it("the smallest tier is reachable and fits the minimum cap for the largest legal receipt", () => {
    const hostile = { ...settled(), nativeAckRef: "a".repeat(4000), nativeResultRef: "b".repeat(4000), target: { ...RUN, id: "c".repeat(4000) } } as unknown as NativeControlReceipt;
    const out = buildControlReply(hostile, { maxBytes: MIN_CONTROL_REPLY_BYTES });
    expect(out.bytes).toBeLessThanOrEqual(MIN_CONTROL_REPLY_BYTES);
    expect(parse(out.text)).toMatchObject({ kind: "control-reply", status: "result", truncated: true, verification: "not-performed" });
    expect(parse(out.text).truncation).toMatchObject({ reason: "byte-cap", maxBytes: MIN_CONTROL_REPLY_BYTES });
  });
});

describe("wb-752.4 folds: policy pin, completionBasis, dead-code removal, era hygiene", () => {
  it("F5: a receipt whose policy is not the core permit policy renders malformed-input", () => {
    expect(requested().policy).toBe(CONTROL_PERMIT_POLICY);
    const forged = { ...requested(), policy: "exact-grant" } as unknown as NativeControlReceipt;
    expect(parse(buildControlReply(forged).text)).toMatchObject({ status: "denied", policy: "malformed-input" });
  });
  it("F7: the field is completionBasis and is emitted for every outcome including failed, cancelled and unknown", () => {
    for (const outcome of ["completed", "failed", "cancelled", "unknown"] as const) {
      const body = parse(buildControlReply(settle(acked(), { ...RESULT, outcome })).text);
      expect(body.completionBasis).toBe("producer-reported");
      expect(body).not.toHaveProperty("completion");
    }
    expect(parse(buildControlReply(requested()).text).completionBasis).toBe("not-established");
    expect(parse(buildControlReply(acked()).text)).not.toHaveProperty("completion");
  });
  it("F6: the unreachable final stub is gone from the source", () => {
    const text = readFileSync(new URL("../src/workbench/control-reply.ts", import.meta.url), "utf8");
    expect(text).not.toMatch(/const stub\b/);
  });
  it("U2: neither file commits a raw bidi, zero-width or default-ignorable code point", () => {
    const guard = new RegExp(`[${cp(0x00ad)}${cp(0x061c)}${cp(0x180e)}${cp(0x200b)}-${cp(0x200f)}${cp(0x202a)}-${cp(0x202e)}${cp(0x2060)}-${cp(0x2069)}${cp(0xfeff)}]`);
    for (const file of ["../src/workbench/control-reply.ts", "./workbench-control-reply.test.ts"]) {
      expect(readFileSync(new URL(file, import.meta.url), "utf8")).not.toMatch(guard);
    }
  });
});

/** The permitted decision decideControl minted for this file's request: the one value the builder renders as a permit. */
function permit(): Extract<ControlDecision, { decision: "permitted" }> {
  const decision = decide();
  if (decision.decision !== "permitted") throw new Error("expected permit");
  return decision;
}
/** Freezes every nested object, so a copy is exactly as frozen as the genuine permit. */
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key));
    Object.freeze(value);
  }
  return value;
}

describe("wb-5a7: a permit renders only when the decision core minted that very decision", () => {
  // Spec (owner ruling on the wb-752.4 gate F5, appended to wb-5a7 verbatim): "control-reply builder accepts only core-minted
  // decisions (isCoreMintedDecision), typed malformed-input refusal otherwise, red-first with a forged structurally identical
  // receipt". Each forgery carries a receipt structurally identical to the genuine permit's (the provenance suite's set).
  const forgeries = (genuine: ReturnType<typeof permit>): readonly (readonly [string, unknown])[] => [
    ["deep-frozen structural copy", deepFreeze(structuredClone(genuine))],
    ["deep-frozen JSON round-trip", deepFreeze(JSON.parse(JSON.stringify(genuine)))],
    ["hand-built permit carrying the genuine field values", deepFreeze({ decision: "permitted", receipt: { ...genuine.receipt, scope: { ...genuine.receipt.scope },
      principal: { ...genuine.receipt.principal }, target: { ...genuine.receipt.target } } })],
    ["frozen re-wrap of the genuine receipt", Object.freeze({ decision: "permitted", receipt: genuine.receipt })],
    ["forwarding proxy over the genuine permit", new Proxy(genuine, {})],
  ];

  it("positive control: the genuine permit renders the requested phase, and every forgery serializes exactly as it does", () => {
    const genuine = permit();
    expect(isCoreMintedDecision(genuine)).toBe(true);
    const body = parse(buildControlReply(genuine).text);
    expect(body).toMatchObject({ status: "requested", phase: "requested" });
    expect((body.requested as Record<string, JsonValue>).requestId).toBe(genuine.receipt.requestId);
    for (const [label, forged] of forgeries(genuine)) {
      expect(JSON.stringify(forged), label).toBe(JSON.stringify(genuine));
      expect(isCoreMintedDecision(forged), label).toBe(false);
    }
  });
  it("renders every structurally identical forged permit as the typed malformed-input refusal: no phase and nothing of the receipt", () => {
    const genuine = permit();
    for (const [label, forged] of forgeries(genuine)) {
      const out = buildControlReply(forged as ControlDecision);
      expect(parse(out.text), label).toStrictEqual({ contractVersion: CONTROL_REPLY_CONTRACT_VERSION, kind: "control-reply", status: "denied",
        category: "validation", policy: "malformed-input", effect: "none", reason: "The reply input is not a control decision or receipt.", truncated: false });
      for (const echo of [genuine.receipt.requestId, genuine.receipt.invocationId, genuine.receipt.target.id]) expect(out.text, label).not.toContain(echo);
    }
  });
  it("denials and bare receipts carry no permit: they render exactly as before (positive controls)", () => {
    expect(parse(buildControlReply(decide({ params: {} })).text)).toMatchObject({ status: "denied", policy: "operator-confirmation", category: "validation" });
    expect(parse(buildControlReply(permit().receipt).text)).toMatchObject({ status: "requested", phase: "requested" });
    expect(parse(buildControlReply(acked()).text)).toMatchObject({ status: "acknowledged", phase: "acknowledged" });
    expect(parse(buildControlReply(settled()).text)).toMatchObject({ status: "result", phase: "result" });
  });
  it("the permit branch asks the core's own predicate, imported as a value, and the builder keeps no registry of its own", () => {
    const source = readFileSync(new URL("../src/workbench/control-reply.ts", import.meta.url), "utf8");
    const fromControl = /import\s*\{([^}]*)\}\s*from\s*["']\.\/control\.js["']/.exec(source)?.[1] ?? "";
    expect(fromControl.split(",").map(name => name.trim())).toContain("isCoreMintedDecision");
    expect(source).toMatch(/isCoreMintedDecision\(source\)/);
    expect(source).not.toMatch(/function isCoreMintedDecision|\bWeakSet\b|\bWeakMap\b/);
  });
});

describe("wb-5a7: a reference the core withheld renders exactly as the core recorded it", () => {
  // The core records a reference it does not admit as CONTROL_WITHHELD_REF with one typed refusal per withheld field. The reply
  // shows the marker in the echo block and a fixed withheld record built from module constants; it never echoes the refusal
  // record's own text, and a record that does not match the receipt's withheld fields is not a core product.
  const withheldAck = (): NativeControlReceipt => acknowledge(requested(), { ...ACK, nativeAckRef: "ref ghp_FAKE0WITHHELD0ACK0REF" });
  const withheldBoth = (): NativeControlReceipt => settle(withheldAck(), { ...RESULT, nativeResultRef: "Bearer FAKE-WITHHELD-RESULT-REF" });
  const record = (fields: readonly string[]): JsonValue => ({ policy: CONTROL_REF_REFUSAL_POLICY, category: "validation", fields: [...fields], reason: CONTROL_REF_NOT_ADMITTED_REASON });
  const entry = (field: string): Record<string, string> => ({ policy: CONTROL_REF_REFUSAL_POLICY, category: "validation", field, reason: CONTROL_REF_NOT_ADMITTED_REASON });

  it("an acknowledgement the core withheld renders the marker and the typed record at every cap, never the refused text", () => {
    const full = parse(buildControlReply(withheldAck()).text);
    expect(full).toMatchObject({ status: "acknowledged", phase: "acknowledged", acknowledged: { acknowledgedAt: ACK.acknowledgedAt, nativeAckRef: CONTROL_WITHHELD_REF } });
    expect(full.withheld).toStrictEqual(record(["nativeAckRef"]));
    for (const maxBytes of [MIN_CONTROL_REPLY_BYTES, 700, 1024, DEFAULT_CONTROL_REPLY_BYTES, MAX_CONTROL_REPLY_BYTES]) {
      const out = buildControlReply(withheldAck(), { maxBytes });
      expect(out.bytes, `maxBytes ${maxBytes}`).toBeLessThanOrEqual(maxBytes);
      expect(out.text, `maxBytes ${maxBytes}`).not.toContain("FAKE0WITHHELD0ACK0REF");
      expect(parse(out.text).withheld, `maxBytes ${maxBytes}`).toStrictEqual(record(["nativeAckRef"]));
    }
  });
  it("a result whose two references were withheld renders both fields in the record, in field order", () => {
    const out = buildControlReply(withheldBoth());
    const body = parse(out.text);
    expect(body).toMatchObject({ status: "result", acknowledged: { nativeAckRef: CONTROL_WITHHELD_REF },
      result: { outcome: RESULT.outcome, nativeResultRef: CONTROL_WITHHELD_REF, settledAt: RESULT.settledAt } });
    expect(body.withheld).toStrictEqual(record(["nativeAckRef", "nativeResultRef"]));
    for (const secret of ["FAKE0WITHHELD0ACK0REF", "FAKE-WITHHELD-RESULT-REF"]) expect(out.text).not.toContain(secret);
    // Only the result withheld: the admitted acknowledgement is echoed verbatim.
    const resultOnly = parse(buildControlReply(settle(acked(), { ...RESULT, nativeResultRef: "Bearer FAKE-WITHHELD-RESULT-REF" })).text);
    expect(resultOnly).toMatchObject({ acknowledged: { nativeAckRef: ACK.nativeAckRef }, result: { nativeResultRef: CONTROL_WITHHELD_REF } });
    expect(resultOnly.withheld).toStrictEqual(record(["nativeResultRef"]));
  });
  it("the smallest tier keeps the withheld record and fits the minimum cap even for the largest withheld receipt", () => {
    const largest = { ...withheldBoth(), target: { ...RUN, id: "c".repeat(4000) } } as unknown as NativeControlReceipt;
    const out = buildControlReply(largest, { maxBytes: MIN_CONTROL_REPLY_BYTES });
    const body = parse(out.text);
    expect(out.bytes).toBeLessThanOrEqual(MIN_CONTROL_REPLY_BYTES);
    expect(Object.keys(body)).toStrictEqual(["contractVersion", "kind", "status", "phase", "completionBasis", "verification", "withheld", "truncated", "truncation"]);
    expect(body.withheld).toStrictEqual(record(["nativeAckRef", "nativeResultRef"]));
  });
  it("an admitted reference renders no withheld record (positive control)", () => {
    for (const receipt of [requested(), acked(), settled()]) expect(parse(buildControlReply(receipt).text)).not.toHaveProperty("withheld");
  });
  it("a refusal record that does not match the receipt's withheld fields is not a core product: typed malformed-input", () => {
    const cases: readonly (readonly [string, unknown])[] = [
      ["the marker without a refusal record", { ...acked(), nativeAckRef: CONTROL_WITHHELD_REF }],
      ["a refusal record without the marker", { ...acked(), refusals: [entry("nativeAckRef")] }],
      ["an empty refusal record", { ...acked(), refusals: [] }],
      ["a record that is not an array", { ...withheldAck(), refusals: { 0: entry("nativeAckRef"), length: 1 } }],
      ["a record naming the wrong field", { ...withheldAck(), refusals: [entry("nativeResultRef")] }],
      ["a record with a foreign reason", { ...withheldAck(), refusals: [{ ...entry("nativeAckRef"), reason: "FAKE-FOREIGN-REASON-TEXT" }] }],
      ["a record with a foreign policy", { ...withheldAck(), refusals: [{ ...entry("nativeAckRef"), policy: "FAKE-FOREIGN-POLICY" }] }],
      ["a record with a foreign category", { ...withheldAck(), refusals: [{ ...entry("nativeAckRef"), category: "authorization" }] }],
      ["a record entry with an extra key", { ...withheldAck(), refusals: [{ ...entry("nativeAckRef"), note: "FAKE-EXTRA-NOTE-TEXT" }] }],
      ["a duplicated record entry", { ...withheldAck(), refusals: [entry("nativeAckRef"), entry("nativeAckRef")] }],
      ["a requested receipt carrying a record", { ...requested(), refusals: [entry("nativeAckRef")] }],
      ["a result record out of field order", { ...withheldBoth(), refusals: [entry("nativeResultRef"), entry("nativeAckRef")] }],
      ["a result record missing one withheld field", { ...withheldBoth(), refusals: [entry("nativeAckRef")] }],
      ["a result whose withheld field has no record entry", { ...settled(), nativeResultRef: CONTROL_WITHHELD_REF }],
    ];
    // Positive controls: the receipts the core minted with withheld references render their phase.
    expect(parse(buildControlReply(withheldAck()).text).status).toBe("acknowledged");
    expect(parse(buildControlReply(withheldBoth()).text).status).toBe("result");
    for (const [label, receipt] of cases) {
      const out = buildControlReply(receipt as NativeControlReceipt);
      expect(parse(out.text), label).toMatchObject({ status: "denied", policy: "malformed-input", category: "validation" });
      expect(out.text, label).not.toMatch(/FAKE-FOREIGN|FAKE-EXTRA/);
    }
  });
});

describe("purity falsifier", () => {
  const source = readFileSync(new URL("../src/workbench/control-reply.ts", import.meta.url), "utf8");
  const specifiers = [...source.matchAll(/(?:from|import)\s+["']([^"']+)["']/g)].map(match => match[1]);

  it("imports only the decision core, the capability types and the shared sanitizers", () => {
    for (const specifier of specifiers) expect(["./control.js", "./capability-registry.js", "./redaction.js"]).toContain(specifier);
    expect(specifiers).toContain("./redaction.js");
  });
  it("names no SDK, host, UI or workflow module and never calls the core's deciding functions", () => {
    expect(source).not.toMatch(/@furnace\/sdk|@anthropic|\.\.\/index|\.\.\/ui\/|\.\.\/workflow\/|node:child_process|node:fs|node:net/);
    expect(source).not.toMatch(/\b(?:decideControl|acknowledge|settle)\s*\(/);
    expect(source).not.toMatch(/\bnew Date\b|Date\.now|process\.|await |fetch\(/);
  });
  it("takes only the one display helper from the shared sanitizers: no local strip or redact composition and no local deletion (F6)", () => {
    const fromRedaction = [...source.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']\.\/redaction\.js["']/g)].flatMap(match =>
      match[1]
        .split(",")
        .map(name => name.trim())
        .filter(name => name !== ""),
    );
    expect(fromRedaction.sort()).toEqual(["sanitizeWorkbenchText", "type WorkbenchTextLayout"]);
    expect(source).not.toMatch(/\.replace\(/);
  });
});
