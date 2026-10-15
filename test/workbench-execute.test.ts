/** wb-69g.5 (W16-E): the pure workflow_execute admission decision and launch-level reply. No TTY, provider, SDK or network. */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  buildWorkflowExecuteReply,
  decideExecute,
  EXECUTE_ADMISSION_POLICY,
  EXECUTE_CONTRACT_VERSION,
  EXECUTE_GRANT,
  EXECUTE_HOST_MODES,
  type ExecuteDecision,
  type ExecuteHostContext,
  type ExecuteRefusalPolicy,
  type LaunchOutcome,
  type WorkflowExecuteReply,
  type WorkflowExecuteRequest,
} from "../src/workbench/execute.js";
import type { NativeRef } from "../src/workbench/observation.js";

const DIGEST = `sha256:${"a".repeat(64)}`;
const INVOCATION = "inv-execute-1";
const DEFINITION = { kind: "script" as const, id: "/tmp/external-ws/.pi/workflows/review.js", schemaVersion: "workflow-script/v1", artifactDigest: DIGEST };

function request(overrides: Record<string, unknown> = {}): WorkflowExecuteRequest {
  return { definitionRef: { ...DEFINITION }, input: { topic: "review" }, hostMode: "embedded", ...overrides } as unknown as WorkflowExecuteRequest;
}
function host(overrides: Partial<ExecuteHostContext> = {}): ExecuteHostContext {
  return { grants: [EXECUTE_GRANT], invocationId: INVOCATION, ...overrides };
}
const refused = (policy: ExecuteRefusalPolicy, category: "authorization" | "validation", reason: string) => expect.objectContaining({ decision: "refused", category, reason, policy });
function admitted(decision: ExecuteDecision) {
  if (decision.decision !== "admitted") throw new Error(`expected an admitted decision, got ${JSON.stringify(decision)}`);
  return decision.admission;
}
function validationFailure(fn: () => unknown): void {
  let failure: unknown;
  try { fn(); } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(CapabilityError);
  expect((failure as CapabilityError).category).toBe("validation");
}
const REF: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: "/tmp/external-ws" };
const LAUNCHED: LaunchOutcome = { status: "launched", nativeRefs: [REF] };
const reply = (outcome: LaunchOutcome | undefined, decision: ExecuteDecision = decideExecute(request(), host()), maxBytes?: number): WorkflowExecuteReply =>
  buildWorkflowExecuteReply(decision, outcome, maxBytes);

afterEach(() => { vi.restoreAllMocks(); });

describe("E1 tool shape: exactly {definitionRef,input,hostMode,policy?}", () => {
  it("admits the documented request and carries an immutable admission record", () => {
    const decision = decideExecute(request({ policy: { reviewed: true } }), host());
    const admission = admitted(decision);
    expect(admission).toMatchObject({ contractVersion: EXECUTE_CONTRACT_VERSION, invocationId: INVOCATION, hostMode: "embedded", grant: EXECUTE_GRANT,
      admissionPolicy: EXECUTE_ADMISSION_POLICY, definition: DEFINITION, policy: { reviewed: true } });
    expect(admission.inputDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(Object.isFrozen(decision)).toBe(true);
    expect(Object.isFrozen(admission)).toBe(true);
    expect(Object.isFrozen(admission.definition)).toBe(true);
  });

  it("policy is optional and absent from the admission when not supplied", () => {
    const admission = admitted(decideExecute(request(), host()));
    expect("policy" in admission).toBe(false);
    expect(admitted(decideExecute(request({ policy: undefined }), host()))).not.toHaveProperty("policy");
  });

  it("any extra, missing or non-object request member is a typed malformed-request refusal", () => {
    const malformed = refused("malformed-request", "validation", "malformed execute request");
    expect(decideExecute(request({ extra: 1 }), host())).toStrictEqual(malformed);
    expect(decideExecute(request({ principal: { id: "x" } }), host())).toStrictEqual(malformed);
    for (const missing of ["definitionRef", "input", "hostMode"]) {
      const { [missing]: _omitted, ...rest } = request() as unknown as Record<string, unknown>;
      expect(decideExecute(rest as unknown as WorkflowExecuteRequest, host())).toStrictEqual(malformed);
    }
    for (const bad of [null, undefined, "x", 42, [], [request()]]) expect(decideExecute(bad as unknown as WorkflowExecuteRequest, host())).toStrictEqual(malformed);
  });

  it("the invocation reference is host-bound and must be clean bounded text", () => {
    const malformed = refused("malformed-request", "validation", "malformed execute request");
    for (const invocationId of ["", "  ", "inv\u001b[31m", "x".repeat(257), undefined, 7, "a\nb", "a\u202eb"]) {
      expect(decideExecute(request(), host({ invocationId: invocationId as string }))).toStrictEqual(malformed);
    }
  });

  it("input must be lossless bounded JSON: cycles, accessors, NaN, class instances and oversize input are refused", () => {
    const malformed = refused("malformed-request", "validation", "malformed execute request");
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    const accessor = Object.defineProperty({}, "x", { get: () => 1, enumerable: true });
    for (const input of [cyclic, accessor, Number.NaN, new Date(0), () => 1, { n: Number.POSITIVE_INFINITY }, undefined, "x".repeat(70_000)]) {
      expect(decideExecute(request({ input }), host())).toStrictEqual(malformed);
    }
    expect(decideExecute(request({ input: null }), host()).decision).toBe("admitted");
    expect(decideExecute(request({ input: [1, "a", { b: null }] }), host()).decision).toBe("admitted");
  });

  it("input is identified by a stable digest, never retained: same input, same digest; any change moves it", () => {
    const input = { b: 2, a: [1, 2] };
    const first = admitted(decideExecute(request({ input }), host())).inputDigest;
    expect(admitted(decideExecute(request({ input: { a: [1, 2], b: 2 } }), host())).inputDigest).toBe(first);
    expect(admitted(decideExecute(request({ input: { a: [2, 1], b: 2 } }), host())).inputDigest).not.toBe(first);
    expect(JSON.stringify(admitted(decideExecute(request({ input: { secret: "needle-9f3" } }), host())))).not.toContain("needle-9f3");
    expect(input).toStrictEqual({ b: 2, a: [1, 2] });
  });
});

describe("E2 immutable digest: a non-digest definitionRef is refused before any grant check consumes it", () => {
  const nonDigest = refused("non-digest-definition", "validation", "definitionRef must be digest-pinned");
  it("rejects every non-sha256 artifactDigest spelling", () => {
    const bad = ["", "main", "HEAD", "latest", "v1.2.3", "sha256:abc", `sha256:${"A".repeat(64)}`, `sha256:${"a".repeat(63)}`, `sha256:${"a".repeat(65)}`, `sha1:${"a".repeat(40)}`,
      "a".repeat(64), `${DIGEST} `, `${DIGEST}\n`, undefined, null, 7, { digest: DIGEST }];
    for (const artifactDigest of bad) {
      expect(decideExecute(request({ definitionRef: { ...DEFINITION, artifactDigest } }), host())).toStrictEqual(nonDigest);
    }
  });
  it("a bare string or non-object definitionRef (a name, path or version label) is not a pinned reference", () => {
    for (const definitionRef of ["review", "/tmp/external-ws/review.js", DIGEST, null, undefined, 3, [DEFINITION]]) {
      expect(decideExecute(request({ definitionRef }), host())).toStrictEqual(nonDigest);
    }
  });
  it("the digest check precedes the grant check: a bad ref with no grant at all is still the digest diagnostic", () => {
    for (const grants of [[], undefined, ["workbench:design"], [EXECUTE_GRANT]]) {
      expect(decideExecute(request({ definitionRef: { ...DEFINITION, artifactDigest: "main" } }), host({ grants }))).toStrictEqual(nonDigest);
    }
  });
  it("kind, id, schemaVersion and member set are otherwise validated; extra members are refused", () => {
    const malformed = refused("malformed-request", "validation", "malformed execute request");
    for (const patch of [{ kind: "shell" }, { kind: undefined }, { id: "" }, { id: "x\u001b[0m" }, { id: "x".repeat(257) }, { schemaVersion: "" }, { schemaVersion: 1 }, { extra: true }]) {
      expect(decideExecute(request({ definitionRef: { ...DEFINITION, ...patch } }), host())).toStrictEqual(malformed);
    }
    for (const kind of ["script", "function", "furnace-formula"]) expect(decideExecute(request({ definitionRef: { ...DEFINITION, kind } }), host()).decision).toBe("admitted");
  });
  it("the admitted definition is a fresh frozen copy, not the caller object", () => {
    const definitionRef = { ...DEFINITION };
    const admission = admitted(decideExecute(request({ definitionRef }), host()));
    expect(admission.definition).not.toBe(definitionRef);
    definitionRef.artifactDigest = `sha256:${"b".repeat(64)}`;
    expect(admission.definition.artifactDigest).toBe(DIGEST);
  });
});

describe("E3 exact execute authority, proven both ways", () => {
  it("grant present admits; grant absent refuses with a typed authorization denial naming the one literal", () => {
    expect(EXECUTE_GRANT).toBe("workbench:execute");
    expect(decideExecute(request(), host({ grants: [EXECUTE_GRANT] })).decision).toBe("admitted");
    expect(decideExecute(request(), host({ grants: ["observe:x", EXECUTE_GRANT, "workbench:design"] })).decision).toBe("admitted");
    expect(decideExecute(request(), host({ grants: [] }))).toStrictEqual(refused("missing-execute-grant", "authorization", "missing exact grant workbench:execute"));
  });
  it("FALSIFIER: no grant set made only of discover/inspect/design/observe/control/invoke/reconcile grants ever admits", () => {
    const other = ["workbench:design", "workbench:observe", "discover:furnace.run.inspect", "inspect:furnace.run.inspect", "observe:furnace.run.inspect",
      "control:furnace.stop", "invoke:furnace.run.start", "reconcile:furnace.run", "furnace:inspect", "workbench:execut", "workbench:executes", "workbench:execute.all"];
    for (const grant of other) expect(decideExecute(request(), host({ grants: [grant] })).decision).toBe("refused");
    expect(decideExecute(request(), host({ grants: other }))).toStrictEqual(refused("missing-execute-grant", "authorization", "missing exact grant workbench:execute"));
  });
  it("execute is its own authority: it does not imply and is not implied by design, observe or discover", () => {
    expect(EXECUTE_GRANT).not.toMatch(/^(?:discover|inspect|observe|control|reconcile|invoke):/);
    expect(EXECUTE_GRANT).not.toBe("workbench:design");
    expect(EXECUTE_GRANT).not.toBe("workbench:observe");
  });
  it("unknown permission data (non-array, non-string, wildcard, malformed entries) is an authorization denial, never an admission", () => {
    const unknown: unknown[] = [undefined, null, EXECUTE_GRANT, { 0: EXECUTE_GRANT, length: 1 }, [42], [EXECUTE_GRANT, 42], [EXECUTE_GRANT, null], ["workbench:*"], ["*"],
      [EXECUTE_GRANT, "*"], [""], [" workbench:execute"], ["WORKBENCH:EXECUTE"], [`${EXECUTE_GRANT}\n`]];
    for (const grants of unknown) {
      expect(decideExecute(request(), host({ grants: grants as readonly string[] }))).toStrictEqual(refused("unknown-permission-data", "authorization", "unknown permission data"));
    }
  });
  it("refusal reasons are constants and never echo caller text", () => {
    const probe = "needle-77b";
    const decisions = [
      decideExecute(request({ hostMode: probe }), host()),
      decideExecute(request({ definitionRef: { ...DEFINITION, artifactDigest: probe } }), host()),
      decideExecute(request({ policy: [probe] }), host()),
      decideExecute(request(), host({ grants: [probe] })),
      decideExecute(request(), host({ grants: [`workbench:${probe}`] })),
    ];
    for (const decision of decisions) {
      expect(decision.decision).toBe("refused");
      expect(JSON.stringify(decision)).not.toContain(probe);
    }
  });
  it("refusal is frozen and carries the host invocation reference when it is valid", () => {
    const decision = decideExecute(request(), host({ grants: [] }));
    expect(Object.isFrozen(decision)).toBe(true);
    expect(decision).toMatchObject({ invocationId: INVOCATION });
    expect(decideExecute(request(), host({ grants: [], invocationId: "" }))).not.toHaveProperty("invocationId");
  });
});

describe("E5 hostMode is a closed allowlist (embedded, detached)", () => {
  it("admits exactly the allowlisted modes", () => {
    expect([...EXECUTE_HOST_MODES]).toStrictEqual(["embedded", "detached"]);
    for (const hostMode of EXECUTE_HOST_MODES) expect(admitted(decideExecute(request({ hostMode }), host())).hostMode).toBe(hostMode);
  });
  it("an unknown or mis-spelled mode is a typed refusal, never a guessed default", () => {
    const unknown = refused("unknown-host-mode", "validation", "unknown hostMode");
    for (const hostMode of ["remote", "", "EMBEDDED", " embedded", "embedded\n", "attached", "__proto__", "constructor", "toString", "headless", 0, null, undefined, ["embedded"], { mode: "embedded" }]) {
      expect(decideExecute(request({ hostMode }), host())).toStrictEqual(unknown);
    }
  });
  it("a mode refusal does not depend on grants and a mode is validated before the grant gate", () => {
    expect(decideExecute(request({ hostMode: "remote" }), host({ grants: [] })).decision).toBe("refused");
    expect(decideExecute(request({ hostMode: "remote" }), host({ grants: [] }))).toStrictEqual(refused("unknown-host-mode", "validation", "unknown hostMode"));
  });
});

describe("policy is bounded plain JSON, echoed but never interpreted as node permission", () => {
  const malformed = refused("malformed-policy", "validation", "malformed execute policy");
  it("a malformed policy is a typed refusal", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    for (const policy of ["strict", 3, true, null, [1], cyclic, new Date(0), { big: "x".repeat(5000) }, { n: Number.NaN }, Object.defineProperty({}, "x", { get: () => 1, enumerable: true })]) {
      expect(decideExecute(request({ policy }), host())).toStrictEqual(malformed);
    }
  });
  it("a valid policy is a frozen deep copy of the caller's object", () => {
    const policy = { nested: { level: 1 }, list: [1, 2] };
    const admission = admitted(decideExecute(request({ policy }), host()));
    policy.nested.level = 2;
    expect(admission.policy).toStrictEqual({ nested: { level: 1 }, list: [1, 2] });
    expect(Object.isFrozen(admission.policy)).toBe(true);
  });
  it("E4: neither the admission nor the reply claims or implies node-level capability permissions", () => {
    const decision = decideExecute(request({ policy: { permissions: ["furnace:inspect"], grants: ["control:furnace.stop"] } }), host());
    const admission = admitted(decision);
    expect(Object.keys(admission).sort()).toStrictEqual(["admissionPolicy", "contractVersion", "definition", "grant", "hostMode", "inputDigest", "invocationId", "policy"]);
    expect(admission.grant).toBe(EXECUTE_GRANT);
    const built = reply(LAUNCHED, decision);
    expect(Object.keys(built)).not.toContain("permissions");
    expect(Object.keys(built)).not.toContain("grants");
    expect(built.policy).toStrictEqual({ permissions: ["furnace:inspect"], grants: ["control:furnace.stop"] });
    expect(JSON.stringify(built)).not.toMatch(/"(?:nodePermissions|admittedNodes|capabilitiesGranted)"/);
  });
});

describe("launch honesty: a launch outcome is never a completion", () => {
  it("the reply status is launch-level only and carries the logical invocation and native references", () => {
    const built = reply(LAUNCHED);
    expect(built).toMatchObject({ contractVersion: EXECUTE_CONTRACT_VERSION, status: "launched", completion: "not-asserted", invocationId: INVOCATION, hostMode: "embedded",
      definition: DEFINITION, nativeRefs: [REF], truncated: false });
    expect(Object.isFrozen(built)).toBe(true);
    const accepted = reply({ status: "accepted" });
    expect(accepted).toMatchObject({ status: "accepted", completion: "not-asserted", nativeRefs: [] });
  });
  it("FALSIFIER: a terminal or unknown status cannot be asserted through a launch outcome", () => {
    for (const status of ["completed", "succeeded", "success", "failed", "done", "finished", "running", "ok", "", "LAUNCHED", undefined, null, 1]) {
      validationFailure(() => reply({ status, nativeRefs: [REF] } as unknown as LaunchOutcome));
    }
    for (const built of [reply(LAUNCHED), reply({ status: "accepted" }), reply({ status: "refused", reason: "host busy" })]) {
      expect(["accepted", "launched", "refused"]).toContain(built.status);
      expect(built.completion).toBe("not-asserted");
      expect(Object.keys(built)).not.toEqual(expect.arrayContaining(["outcome"]));
      expect(JSON.stringify(built)).not.toMatch(/"(?:completed|succeeded|success|result|exitCode)"/);
    }
  });
  it("extra outcome members cannot smuggle a completion claim: only known fields are copied", () => {
    const smuggled = { status: "launched", nativeRefs: [REF], completed: true, success: true, result: "needle-done", exitCode: 0 } as unknown as LaunchOutcome;
    const text = JSON.stringify(reply(smuggled));
    expect(text).not.toContain("needle-done");
    expect(text).not.toMatch(/"(?:completed|success|result|exitCode)"/);
  });
  it("launched demands a native reference; a refused launch carries none; an admitted decision demands an outcome", () => {
    validationFailure(() => reply({ status: "launched" }));
    validationFailure(() => reply({ status: "launched", nativeRefs: [] }));
    validationFailure(() => reply({ status: "refused", nativeRefs: [REF] }));
    validationFailure(() => reply(undefined));
    validationFailure(() => reply(null as unknown as LaunchOutcome));
  });
  it("malformed native references throw rather than being guessed or dropped", () => {
    const bad: unknown[] = [{ provider: "", type: "run", id: "x" }, { provider: "furnace", type: "run" }, { provider: "furnace", type: "run", id: "x\u001b[0m" }, { provider: "furnace", type: "run", id: "x", scope: 4 },
      { provider: "furnace", type: "run", id: "x".repeat(300) }, "frn-run-r1", null, [REF]];
    for (const ref of bad) validationFailure(() => reply({ status: "launched", nativeRefs: [ref as NativeRef] }));
    validationFailure(() => reply({ status: "launched", nativeRefs: "x" as unknown as readonly NativeRef[] }));
  });
  it("a refused decision builds a refused reply with its typed refusal and ignores any outcome", () => {
    const decision = decideExecute(request(), host({ grants: [] }));
    const built = reply({ status: "launched", nativeRefs: [REF] }, decision);
    expect(built).toMatchObject({ status: "refused", completion: "not-asserted", nativeRefs: [], invocationId: INVOCATION,
      refusal: { category: "authorization", policy: "missing-execute-grant", reason: "missing exact grant workbench:execute" } });
    expect(JSON.stringify(built)).not.toContain("frn-run-r1");
    expect(reply(undefined, decision).status).toBe("refused");
  });
  it("a host-refused launch keeps its sanitized reason, not a native reference", () => {
    const built = reply({ status: "refused", reason: "host busy" });
    expect(built).toMatchObject({ status: "refused", reason: "host busy", nativeRefs: [] });
  });
});

describe("E6 sanitized, bounded reply", () => {
  it("every reply string routes through the shared sanitizers", () => {
    const secretRef: NativeRef = { provider: "furnace", type: "run", id: "Bearer abc123def456", scope: "/tmp/ws" };
    const built = reply({ status: "launched", nativeRefs: [secretRef] }, decideExecute(request({ policy: { password: "opaque", note: "api_key=sk-ant-zzz999", ok: "fine" } }), host()));
    const text = JSON.stringify(built);
    expect(text).not.toContain("abc123def456");
    expect(text).not.toContain("opaque");
    expect(text).not.toContain("sk-ant-zzz999");
    expect(text).toContain("[REDACTED]");
    expect(built.policy).toMatchObject({ ok: "fine" });
  });
  it("definition id, hostMode and reason are redacted and stripped of terminal and bidi characters", () => {
    const decision = decideExecute(request({ definitionRef: { ...DEFINITION, id: "/ws/access_token=never-leak-me.js" } }), host());
    const built = reply({ status: "refused", reason: "bad\u001b[31m\u202e thing password=hunter2" }, decision);
    const text = JSON.stringify(built);
    expect(text).not.toContain("never-leak-me");
    expect(text).not.toContain("hunter2");
    expect(text).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/);
    expect(text).not.toContain("\\u001b");
  });
  it("the reply is byte-capped with a visible truncation marker; raw payloads are never retained", () => {
    const many: NativeRef[] = Array.from({ length: 200 }, (_, index) => ({ provider: "furnace", type: "attempt", id: `frn-atm-${index}-${"x".repeat(200)}`, scope: "/tmp/external-ws" }));
    const policy: JsonValue = { note: "y".repeat(3000) };
    const built = reply({ status: "launched", nativeRefs: many }, decideExecute(request({ policy }), host()), 4096);
    expect(Buffer.byteLength(JSON.stringify(built))).toBeLessThanOrEqual(4096);
    expect(built.truncated).toBe(true);
    expect(built.truncation).toContain("[truncated]");
    expect(built.nativeRefs.length).toBeGreaterThan(0);
    expect(built.nativeRefs.length).toBeLessThan(200);
    expect(built.status).toBe("launched");
  });
  it("a small reply is untruncated; a too-small cap is clamped so the invariant fields always survive", () => {
    expect(reply(LAUNCHED).truncated).toBe(false);
    expect(reply(LAUNCHED)).not.toHaveProperty("truncation");
    const tiny = reply(LAUNCHED, decideExecute(request({ policy: { note: "z".repeat(3000) } }), host()), 1);
    expect(tiny.invocationId).toBe(INVOCATION);
    expect(tiny.status).toBe("launched");
    expect(tiny.truncated).toBe(true);
  });
  it("an over-long reason is cut with a visible marker and flags the reply truncated", () => {
    const built = reply({ status: "refused", reason: "r".repeat(2000) });
    expect(built.reason).toContain("[truncated]");
    expect(built.truncated).toBe(true);
  });
  it("the reply holds no live reference to caller objects", () => {
    const refs: NativeRef[] = [{ ...REF }];
    const built = reply({ status: "launched", nativeRefs: refs });
    refs[0].id = "mutated";
    expect(built.nativeRefs[0].id).toBe("frn-run-r1");
    expect(Object.isFrozen(built.nativeRefs)).toBe(true);
    expect(Object.isFrozen(built.nativeRefs[0])).toBe(true);
  });
});

const utf8Bytes = (value: unknown): number => new TextEncoder().encode(JSON.stringify(value)).length;
const FLOOR = 2048;
/** Caps below the floor clamp to it; the rest are accepted as given. NaN and Infinity fall back to the default. */
const CAPS: readonly number[] = [1, 100, FLOOR, 2049, 3000, 4096, 6000, 8192, 1_000_000];
const effectiveCap = (cap: number): number => Math.max(FLOOR, cap);

/** Maxima shapes of every free-text member, as the wb-69g.5 gate measured them (P1-P3) plus multi-byte UTF-8 (P5). */
const MAXIMA: ReadonlyArray<{ name: string; unit: string; units: number }> = [
  { name: "P1 ascii", unit: "a", units: 256 },
  { name: "P2 quote-escaped", unit: "\"", units: 128 },
  { name: "P3 lone-surrogate", unit: "\ud800", units: 85 },
  { name: "P5 multi-byte", unit: "\u20ac", units: 85 },
];
function maximaScenario(unit: string, units: number, extraRefs = 0) {
  const text = unit.repeat(units);
  const definitionRef = { kind: "script" as const, id: text, schemaVersion: text, artifactDigest: DIGEST };
  const decision = decideExecute(request({ definitionRef, policy: { note: (unit === "\ud800" ? "a" : unit).repeat(unit === "\u20ac" ? 1200 : 1500) } }), host({ invocationId: text }));
  const maxRef: NativeRef = { provider: text, type: text, id: text, scope: text };
  const refs = Array.from({ length: 1 + extraRefs }, () => ({ ...maxRef }));
  return { decision, refs, reason: unit.repeat(2000) };
}

describe("U2 the reply never exceeds its byte cap for ANY accepted cap (TextEncoder UTF-8 bytes)", () => {
  for (const shape of MAXIMA) {
    it(`${shape.name}: serialized bytes <= the effective cap at every cap, for launched, accepted and refused launches`, () => {
      const { decision, refs, reason } = maximaScenario(shape.unit, shape.units, 40);
      expect(decision.decision).toBe("admitted");
      for (const cap of CAPS) {
        for (const outcome of [{ status: "launched" as const, nativeRefs: refs, reason }, { status: "accepted" as const, nativeRefs: refs, reason }, { status: "refused" as const, reason }]) {
          const built = reply(outcome, decision, cap);
          expect(utf8Bytes(built)).toBeLessThanOrEqual(effectiveCap(cap));
          expect(built.truncated).toBe(true);
          expect(built.status).toBe(outcome.status);
          expect(built.completion).toBe("not-asserted");
          expect(built.definition?.artifactDigest).toBe(DIGEST);
        }
      }
    });
    it(`${shape.name}: a refused decision's reply is within the floor even with a maximal invocation reference`, () => {
      const text = shape.unit.repeat(shape.units);
      const decision = decideExecute(request({ hostMode: "nowhere" }), host({ invocationId: text }));
      expect(decision.decision).toBe("refused");
      for (const cap of CAPS) expect(utf8Bytes(reply(undefined, decision, cap))).toBeLessThanOrEqual(effectiveCap(cap));
    });
  }
  it("non-finite and negative caps fall back to a cap the reply still honours", () => {
    const { decision, refs, reason } = maximaScenario("a", 256, 40);
    for (const cap of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, -5]) {
      expect(utf8Bytes(reply({ status: "launched", nativeRefs: refs, reason }, decision, cap))).toBeLessThanOrEqual(8192);
    }
  });
  it("native references are halved first, then text is trimmed deterministically, and the same inputs give the same bytes", () => {
    const { decision, refs, reason } = maximaScenario("a", 256, 40);
    const first = reply({ status: "launched", nativeRefs: refs, reason }, decision, FLOOR);
    const second = reply({ status: "launched", nativeRefs: refs, reason }, decision, FLOOR);
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
    expect(first.truncation).toContain("[truncated]");
    expect(first.nativeRefs.length).toBeLessThan(refs.length);
    expect(first.invocationId?.length ?? 0).toBeLessThanOrEqual(256);
  });
  it("the logical invocation reference and definition digest survive an ordinary squeeze untouched", () => {
    const many: NativeRef[] = Array.from({ length: 120 }, (_, index) => ({ provider: "furnace", type: "attempt", id: `frn-atm-${index}-${"x".repeat(120)}`, scope: "/tmp/external-ws" }));
    const built = reply({ status: "launched", nativeRefs: many, reason: "r".repeat(300) }, decideExecute(request(), host()), 4096);
    expect(utf8Bytes(built)).toBeLessThanOrEqual(4096);
    expect(built.invocationId).toBe(INVOCATION);
    expect(built.definition).toEqual(DEFINITION);
    expect(built.reason).toBe("r".repeat(300));
    expect(built.nativeRefs.length).toBeGreaterThan(0);
  });
  it("a cap measured in UTF-8 bytes, not UTF-16 units: three-byte text that is short in characters still obeys the cap", () => {
    const decision = decideExecute(request(), host());
    const built = reply({ status: "refused", reason: "\u20ac".repeat(500) }, decision, FLOOR);
    expect("\u20ac".repeat(500).length).toBeLessThan(FLOOR);
    expect(utf8Bytes(built)).toBeLessThanOrEqual(FLOOR);
    const wide = reply({ status: "refused", reason: "\u20ac".repeat(500) }, decision, 600);
    expect(utf8Bytes(wide)).toBeLessThanOrEqual(FLOOR);
  });
});

describe("U2 truncated and the reason-cut note key on the redacted/final text", () => {
  it("P4a: a reason that redaction EXPANDS past the cap ends in the marker AND flags the reply truncated with a reason-cut note", () => {
    const raw = "Bearer a ".repeat(56);
    expect(raw.length).toBeLessThanOrEqual(512);
    const built = reply({ status: "refused", reason: raw });
    expect(built.reason).toContain("[truncated]");
    expect(built.truncated).toBe(true);
    expect(built.truncation).toContain("reason cut");
  });
  it("P4b: a long raw reason that redaction SHRINKS under the cap is not cut: no marker, no note, truncated false", () => {
    const raw = "Bearer abcdefghijklmnopq ".repeat(28);
    expect(raw.length).toBeGreaterThan(512);
    const built = reply({ status: "refused", reason: raw });
    expect(built.reason).not.toContain("[truncated]");
    expect(built.truncated).toBe(false);
    expect(built).not.toHaveProperty("truncation");
    expect(JSON.stringify(built)).not.toContain("abcdefghijklmnopq");
  });
  it("an untouched short reply stays truncated:false with no truncation member", () => {
    const built = reply({ status: "accepted", reason: "queued" });
    expect(built.truncated).toBe(false);
    expect(built).not.toHaveProperty("truncation");
    expect(built.reason).toBe("queued");
  });
  it("truncated is true exactly when the final reply dropped or cut something it was given", () => {
    const decision = decideExecute(request({ policy: { note: "y".repeat(3000) } }), host());
    const squeezed = reply({ status: "launched", nativeRefs: [REF], reason: "r".repeat(3000) }, decision, FLOOR);
    expect(squeezed.truncated).toBe(true);
    expect(squeezed.truncation).toContain("[truncated]");
    const roomy = reply({ status: "launched", nativeRefs: [REF] }, decideExecute(request({ policy: { note: "y".repeat(100) } }), host()), 1_000_000);
    expect(roomy.truncated).toBe(false);
  });
});

describe("U3 native-reference ceiling and policy-echo fallback are pinned", () => {
  it("M20/M28: more than 256 native references keep exactly 256 and name the omitted count in the truncation note", () => {
    const refs: NativeRef[] = Array.from({ length: 300 }, (_, index) => ({ provider: "f", type: "r", id: `i${index}` }));
    const built = reply({ status: "launched", nativeRefs: refs }, decideExecute(request(), host()), 10_000_000);
    expect(built.nativeRefs).toHaveLength(256);
    expect(built.nativeRefs[255].id).toBe("i255");
    expect(built.truncated).toBe(true);
    expect(built.truncation).toContain("44 native references omitted");
  });
  it("exactly 256 native references are not a truncation", () => {
    const refs: NativeRef[] = Array.from({ length: 256 }, (_, index) => ({ provider: "f", type: "r", id: `i${index}` }));
    const built = reply({ status: "launched", nativeRefs: refs }, decideExecute(request(), host()), 10_000_000);
    expect(built.nativeRefs).toHaveLength(256);
    expect(built.truncated).toBe(false);
  });
  it("M22: an over-cap policy echo is omitted with a visible note, and an in-cap echo is kept without one", () => {
    const policy: JsonValue = { note: "p".repeat(1900) };
    const squeezed = reply({ status: "launched", nativeRefs: [REF] }, decideExecute(request({ policy }), host()), FLOOR);
    expect(squeezed).not.toHaveProperty("policy");
    expect(squeezed.truncated).toBe(true);
    expect(squeezed.truncation).toContain("policy echo omitted");
    const roomy = reply({ status: "launched", nativeRefs: [REF] }, decideExecute(request({ policy }), host()), 10_000);
    expect(roomy.policy).toEqual(policy);
    expect(roomy.truncated).toBe(false);
  });
  it("a policy string the shared sanitizer cuts is flagged: the echo is not silently shortened", () => {
    const built = reply({ status: "launched", nativeRefs: [REF] }, decideExecute(request({ policy: { note: "p".repeat(3500) } }), host()), 10_000);
    expect(built.policy).toBeDefined();
    expect(built.truncated).toBe(true);
    expect(built.truncation).toContain("policy echo cut");
  });
  it("an empty reason is kept as given and is not a truncation", () => {
    const built = reply({ status: "accepted", reason: "" });
    expect(built.reason).toBe("");
    expect(built.truncated).toBe(false);
  });
  it("an admitted decision without a policy never reports a policy-echo omission", () => {
    const built = reply({ status: "launched", nativeRefs: Array.from({ length: 100 }, (_, i) => ({ provider: "f", type: "r", id: `${"x".repeat(100)}${i}` })) }, decideExecute(request(), host()), FLOOR);
    expect(built.truncation ?? "").not.toContain("policy echo omitted");
  });
});

describe("E7 purity", () => {
  it("performs no clock, random, network or process access", () => {
    const spies = [vi.spyOn(Date, "now"), vi.spyOn(Math, "random"), vi.spyOn(globalThis, "fetch")];
    const decision = decideExecute(request({ policy: { a: 1 } }), host());
    reply(LAUNCHED, decision);
    reply(undefined, decideExecute(request(), host({ grants: [] })));
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
  });
  it("is deterministic: the same request and host context give structurally identical decisions and replies", () => {
    expect(decideExecute(request({ policy: { a: 1 } }), host())).toStrictEqual(decideExecute(request({ policy: { a: 1 } }), host()));
    expect(reply(LAUNCHED)).toStrictEqual(reply(LAUNCHED));
  });
  it("does not mutate the request, the host context or the grant list", () => {
    const req = request({ policy: { a: [1] } });
    const grants = [EXECUTE_GRANT];
    const context = host({ grants });
    const before = JSON.stringify([req, context]);
    reply(LAUNCHED, decideExecute(req, context));
    expect(JSON.stringify([req, context])).toBe(before);
    expect(grants).toStrictEqual([EXECUTE_GRANT]);
  });
  it("is launch-free by construction: only the registry error type, identity, observation types and sanitizers are imported", () => {
    const source = readFileSync(new URL("../src/workbench/execute.ts", import.meta.url), "utf8");
    const imports = new Set([...source.matchAll(/^(?:import|export)\s[^;]*?\sfrom\s+["']([^"']+)["']/gm), ...source.matchAll(/^import\s+["']([^"']+)["']/gm)].map(match => match[1]));
    expect([...imports].sort()).toStrictEqual(["./capability-registry.js", "./identity.js", "./observation.js", "./redaction.js"]);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(source).not.toMatch(/\b(?:Date\.now|Math\.random|process\.|child_process|node:fs|fetch\s*\(|new Date\()/);
    expect(source).not.toMatch(/@anthropic|@furnace|claude-agent-sdk|\.invoke\s*\(|\.discover\s*\(/);
  });
  it("does not register itself in the pinned workbench tool census (registration is a separate bead)", () => {
    const index = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
    expect(index).not.toContain("workflow_execute");
  });
});
