/** wb-752.4 (W16-F): the pure, bounded workflow_control reply builder. It renders a ControlDecision or a NativeControlReceipt and never decides. */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import {
  acknowledge,
  CONTROL_PERMIT_POLICY,
  type ControlDecision,
  type ControlDenyPolicy,
  DESTRUCTIVE_CONTROL_ACTIONS,
  decideControl,
  type NativeControlReceipt,
  type NativeControlRequest,
  settle,
} from "../src/workbench/control.js";
import { buildControlReply, CONTROL_REPLY_CONTRACT_VERSION, DEFAULT_CONTROL_REPLY_BYTES, MIN_CONTROL_REPLY_BYTES } from "../src/workbench/control-reply.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation } from "../src/workbench/observation.js";

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

const cp = (...codes: number[]): string => String.fromCharCode(...codes);
const ZWSP = cp(0x200b);
const LRM = cp(0x200e);
const RLM = cp(0x200f);
const ZWJ = cp(0x200d);
const WJ = cp(0x2060);
const BOM = cp(0xfeff);
const RLO = cp(0x202e);

describe("wb-752.4 U1: invisible characters never reassemble a redacted credential", () => {
  // Spec (gate verdict U1): delete the zero-width / default-ignorable set BEFORE the shared sanitizer, so a credential
  // split by an invisible character is redacted as one token. Seven probe refs, each accepted by the landed core.
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
      const out = buildControlReply(acknowledge(requested(), { ...ACK, nativeAckRef: ref }));
      expect(out.text).not.toContain(secret);
      expect(out.text).toContain("[REDACTED]");
    });
    it(`result reply redacts ${label}`, () => {
      const out = buildControlReply(settle(acked(), { ...RESULT, nativeResultRef: ref }));
      expect(out.text).not.toContain(secret);
      expect(out.text).toContain("[REDACTED]");
    });
  }
  it("a bidi override inside a credential (hand-built receipt, the core refuses such refs) is stripped before redaction", () => {
    const hostile = { ...acked(), nativeAckRef: `ref sk-ant-${RLO}api03-BIDISECRETAAAA` } as unknown as NativeControlReceipt;
    const out = buildControlReply(hostile);
    expect(out.text).not.toContain("BIDISECRETAAAA");
    expect(out.text).toContain("[REDACTED]");
  });
  it("an unsplit control credential is redacted too (the probes are not vacuous)", () => {
    const out = buildControlReply(acknowledge(requested(), { ...ACK, nativeAckRef: "ref sk-ant-api03-PLAINSECRETAAAA" }));
    expect(out.text).not.toContain("PLAINSECRETAAAA");
    expect(out.text).toContain("[REDACTED]");
  });
});

describe("wb-752.4 U3: truncation is honest on the final cut", () => {
  // Spec (gate verdict U3): truncated:true plus a marker whenever ANY text was cut, including the shared sanitizer's
  // text cap after redaction expansion, keyed on the final serialized reply.
  const expanding = (length: number): string => "Bearer x ".repeat(Math.ceil(length / 9)).slice(0, length);
  const cut = (text: string): boolean => text.includes("[truncated]");
  it("a 4094-char Bearer ref whose redaction expansion hits the text cap reports truncated:true at 65536 (ack and result)", () => {
    const ackRef = expanding(4094);
    const ack = buildControlReply(acknowledge(requested(), { ...ACK, nativeAckRef: ackRef }), { maxBytes: 65536 });
    expect(cut(ack.text)).toBe(true);
    expect(ack.truncated).toBe(true);
    expect(parse(ack.text).truncated).toBe(true);
    expect(parse(ack.text)).toHaveProperty("truncation");
    const result = buildControlReply(settle(acked(), { ...RESULT, nativeResultRef: ackRef }), { maxBytes: 65536 });
    expect(cut(result.text)).toBe(true);
    expect(result.truncated).toBe(true);
    expect(parse(result.text)).toHaveProperty("truncation");
  });
  it("whenever the reply text carries a cut marker the flag is set, across caps and phases; never over the cap", () => {
    for (const length of [100, 3000, 4094]) {
      for (const maxBytes of [512, 1024, 4096, 5000, 16384, 65536]) {
        for (const build of [
          () => acknowledge(requested(), { ...ACK, nativeAckRef: expanding(length) }),
          () => settle(acked(), { ...RESULT, nativeResultRef: expanding(length) }),
        ]) {
          const out = buildControlReply(build(), { maxBytes });
          expect(out.bytes).toBeLessThanOrEqual(maxBytes);
          if (cut(out.text)) expect(out.truncated).toBe(true);
          expect(parse(out.text).truncated).toBe(out.truncated);
        }
      }
    }
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
});
