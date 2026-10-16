/** wb-6ze.11 (W15-E/VC-5): the pure forge-operation evidence reader for the docs/20 producer-mapping row "forge operation".
 * Quotes are from docs/workbench on branch workbench/implementation-program. */
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ForgeEvidenceDeps, readForgeOperationEvidence } from "../src/workbench/forge-evidence.js";

type Json = { [key: string]: JsonValue };
const OPERATION = "op_8f2c41";
const SCOPE = { workspace: "/tmp/forge-ws", principal: "local-operator:tester" };
const CAPTURED = "2026-10-15T09:30:00Z";
const current = (ref: string, last_result: string): Json => ({ ref, last_result, authoritative_current: true, verification_ref: "cmd_current" });
const historical = (ref: string): Json => ({ ref, last_result: "success", authoritative_current: false, unverified_reason: "FORGE_CURRENT_STATE_UNVERIFIED" });
const reading = (packages: JsonValue[], over: Json = {}, operation: string | null = OPERATION): Json => ({
  contract: "forge.gate.status/v1",
  protocolMethod: "gate.status",
  source: { status: "success", ...(operation === null ? {} : { operation_id: operation }), envelope: { verdict: null, reason_code: "FORGE_OK" }, data: { packages }, ...over },
});
const GRANT = ["forge:inspect"];

function deps(overrides: Partial<ForgeEvidenceDeps> = {}, result: JsonValue = reading([current("code:a", "success")])) {
  const read = vi.fn(async (_request: { readonly target: string; readonly signal: AbortSignal | undefined }) => result);
  const base: ForgeEvidenceDeps = { grants: () => GRANT, scope: SCOPE, target: SCOPE.workspace, read, now: () => CAPTURED };
  return { read, deps: { ...base, ...overrides } satisfies ForgeEvidenceDeps };
}
async function refusal(promise: Promise<unknown>): Promise<CapabilityError> {
  try { await promise; } catch (error) {
    if (error instanceof CapabilityError) return error;
    throw error;
  }
  throw new Error("expected the reader to refuse");
}
const text = (lines: readonly string[]) => lines.join("\n");

describe("forge-operation evidence reader", () => {
  // docs/20 "Producer mapping", forge operation: "re-read through the registered read capability".
  it("C1: a valid ref re-reads exactly once through the injected seam and loads EvidenceContent-shaped data", async () => {
    const { read, deps: d } = deps();
    const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, d);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read.mock.calls[0]?.[0].target).toBe(SCOPE.workspace);
    expect(content).toMatchObject({ kind: "forge-operation", provider: "forge", capturedAt: CAPTURED, truncated: false, freshness: "current" });
    expect(content.bytes).toBe(Buffer.byteLength(text(content.preview)));
    expect(content.producerReceipt).toStrictEqual({ requestedOperationId: OPERATION, readOperationId: OPERATION, sameOperation: true });
    expect(text(content.preview)).toContain(`forge-operation:${OPERATION}`);
    expect(content.statusText).toBe("success · FORGE_OK · current gate passed");
  });

  it("C1: refs that are not a validated forge-operation:<id> refuse validation and never reach the seam", async () => {
    const refs = ["", "forge-operation:", "forge-operation: x", "forge-operation:a b", "forge-operation:\u001b[31mx", "forge-operation:x\u202Ey", `forge-operation:${"a".repeat(257)}`,
      "claude-message:abc", "forge:gate.status:FORGE_OK", "FORGE-OPERATION:abc", "forge-operation", " forge-operation:abc"];
    for (const ref of refs) {
      const { read, deps: d } = deps();
      const error = await refusal(readForgeOperationEvidence(ref, d));
      expect(error.category, ref).toBe("validation");
      expect(read, ref).not.toHaveBeenCalled();
    }
  });

  it("C1: an id mismatch between ref and reading, or a reading naming no operation, is a validation refusal never a substituted result", async () => {
    const other = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading([current("code:a", "success")], {}, "op_other")).deps));
    expect(other.category).toBe("validation");
    const anonymous = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading([current("code:a", "success")], {}, null)).deps));
    expect(anonymous.category).toBe("validation");
    expect(other.message).not.toContain("op_other");
  });

  // docs/20 "Refusal and freshness rules": "Transport success never implies verification."
  it("C2: a failed gate loads as its own failed status, never verified", async () => {
    const { deps: d } = deps({}, reading([current("code:a", "failure"), current("code:b", "success")], { status: "error", envelope: { verdict: "FAIL", reason_code: "FORGE_GATE_FAILED" } }));
    const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, d);
    expect(content.statusText).toMatch(/error/);
    expect(content.statusText).toMatch(/FAIL/);
    expect(content.statusText).toMatch(/current gate failed/);
    expect(text(content.preview)).not.toMatch(/\bverified\b/i);
    expect(text(content.preview)).toContain("failure (current)");
  });

  it("C2: a partial COULD_NOT_JUDGE verdict loads as its own partial status, never verified", async () => {
    const { deps: d } = deps({}, reading([current("code:a", "success")], { status: "partial", envelope: { verdict: "COULD_NOT_JUDGE", reason_code: "FORGE_DEGRADED" } }));
    const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, d);
    expect(content.statusText).toMatch(/partial/);
    expect(content.statusText).toMatch(/COULD_NOT_JUDGE/);
    expect(content.statusText).toMatch(/verification indeterminate/);
    expect(text([content.statusText, ...content.preview])).not.toMatch(/\bverified\b|gate passed/i);
  });

  it("C2: authoritative_current=false stays historical and indeterminate, never current verification", async () => {
    const { deps: d } = deps({}, reading([historical("code:a")]));
    const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, d);
    expect(content.statusText).toMatch(/historical/);
    expect(content.statusText).toMatch(/indeterminate/);
    expect(content.statusText).not.toMatch(/passed|\bverified\b/i);
    expect(text(content.preview)).toMatch(/authoritative_current=false/);
    expect(text(content.preview)).not.toMatch(/gate passed|\bverified\b/i);
  });

  it("C2: an empty package list judges nothing", async () => {
    const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading([])).deps);
    expect(content.statusText).toMatch(/indeterminate/);
    expect(content.statusText).not.toMatch(/passed/);
  });

  it("C2: a seam failure maps to transport with no preview, whatever it threw, and its text never enters the error", async () => {
    for (const failure of [new Error("ECONNRESET /home/secret/token=abc123"), new CapabilityError("unavailable", "forge server missing"), "boom"]) {
      const { deps: d } = deps({ read: vi.fn(async () => { throw failure; }) });
      const error = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, d));
      expect(error.category).toBe("transport");
      expect(error.message).not.toMatch(/ECONNRESET|secret|abc123|boom/);
      expect("preview" in error).toBe(false);
    }
  });

  it("C2: a reading that is not the forge.gate.status/v1 contract is transport, never fabricated", async () => {
    for (const bad of [null, "text", { contract: "other/v1", source: {} }, { contract: "forge.gate.status/v1", protocolMethod: "other", source: { operation_id: OPERATION, status: "success", envelope: { reason_code: "X" }, data: { packages: [] } } },
      { contract: "forge.gate.status/v1", protocolMethod: "gate.status", source: { operation_id: OPERATION, status: "success", envelope: { reason_code: "X" }, data: {} } }] as JsonValue[]) {
      const error = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, bad).deps));
      expect(error.category).toBe("transport");
    }
  });

  it("C2: a failed read against a disconnected owner is transport plus stale", async () => {
    const { deps: d } = deps({ owner: "disconnected", read: vi.fn(async () => { throw new Error("gone"); }) });
    const error = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, d));
    expect(error).toMatchObject({ category: "transport", freshness: "stale" });
  });

  it("C2: a stale or disconnected owner labels loaded evidence stale; a current owner labels it current", async () => {
    for (const owner of ["stale", "disconnected"] as const) {
      const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({ owner }).deps);
      expect(content.freshness).toBe("stale");
    }
    expect((await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({ owner: "current" }).deps)).freshness).toBe("current");
  });

  // docs/20 "Refusal and freshness rules": "Scope mismatch or missing/revoked exact grant: unauthorized."
  it("C3: only the exact forge:inspect grant loads; everything else is an authorization denial with a spy-proven untouched seam", async () => {
    const insufficient: string[][] = [[], ["forge:*"], ["*"], ["forge"], ["forge:inspect:extra"], ["forge:inspec"], ["FORGE:INSPECT"], [" forge:inspect"], ["forge:inspect "], ["claude:transcript", "furnace:inspect"], ["forge:control"]];
    for (const grants of insufficient) {
      const { read, deps: d } = deps({ grants: () => grants });
      const error = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, d));
      expect(error.category, grants.join(",")).toBe("authorization");
      expect(read, grants.join(",")).not.toHaveBeenCalled();
    }
    for (const grants of [["forge:inspect"], ["claude:transcript", "forge:inspect"]]) {
      expect((await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({ grants: () => grants }).deps)).provider).toBe("forge");
    }
  });

  it("C3: the live grant set is re-read on every load, so mid-view revocation refuses", async () => {
    let granted = true;
    const { read, deps: d } = deps({ grants: () => (granted ? GRANT : []) });
    await readForgeOperationEvidence(`forge-operation:${OPERATION}`, d);
    granted = false;
    expect((await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, d))).category).toBe("authorization");
    expect(read).toHaveBeenCalledTimes(1);
  });

  it("C3: a malformed ref refuses before the grant is consulted, so a foreign ref does not probe the grant set", async () => {
    const grants = vi.fn(() => GRANT);
    const error = await refusal(readForgeOperationEvidence("claude-message:abc", deps({ grants }).deps));
    expect(error.category).toBe("validation");
    expect(grants).not.toHaveBeenCalled();
  });

  // docs/09 "Data retention and privacy": "Avoid raw prompts/tool bodies by default; store reference/short redacted preview".
  it("C4: producer text is redacted and stripped, and no raw payload member is retained", async () => {
    const planted = "Bearer SECRET-TOKEN-123";
    const source = reading([{ ...current("code:a", "success"), unverified_reason: "password=hunter2", raw_body: "RAW-BODY-MARKER".repeat(100), nested: { secret: "RAW-NESTED" } },
      { ...historical("code:\u001b[31mred"), unverified_reason: `${planted} \u001b[2Jwipe\u202E` }]);
    const content = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, source).deps).catch((error: unknown) => error);
    // An unprintable package ref is a producer-identity violation: refused, never mangled into a different identity.
    expect(content).toBeInstanceOf(CapabilityError);
    expect((content as CapabilityError).category).toBe("transport"); // measured: a malformed producer reading is a transport-class failure
    const clean = reading([{ ...current("code:a", "success"), unverified_reason: "password=hunter2", raw_body: "RAW-BODY-MARKER".repeat(100), nested: { secret: "RAW-NESTED" } },
      { ...historical("code:b"), unverified_reason: `${planted} \u001b[2Jwipe\u202E\u200B` }]);
    const loaded = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, clean).deps);
    const everything = JSON.stringify(loaded);
    expect(everything).not.toMatch(/hunter2|SECRET-TOKEN|RAW-BODY|RAW-NESTED|wipe\u202E/);
    for (const line of loaded.preview) expect(line).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u200B-\u200F\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/);
    expect(Object.keys(loaded).sort()).toStrictEqual(["bytes", "capturedAt", "freshness", "kind", "preview", "producerReceipt", "provider", "statusText", "truncated"]);
  });

  it("C4: previews are bounded in line count, line width and total bytes, with a visible truncation marker and honest bytes", async () => {
    const packages = Array.from({ length: 300 }, (_, index) => current(`code:package-${index}`, "success"));
    const big = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading(packages)).deps);
    expect(big.truncated).toBe(true);
    expect(big.preview.length).toBeLessThanOrEqual(40);
    expect(big.preview.at(-1)).toMatch(/\[truncated\]/);
    expect(Buffer.byteLength(text(big.preview))).toBeLessThanOrEqual(4096);
    expect(big.bytes).toBeGreaterThan(Buffer.byteLength(text(big.preview)));
    for (const line of big.preview) expect(line.length).toBeLessThanOrEqual(220);

    const tight = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({ maxBytes: 160 }, reading(packages)).deps);
    expect(tight.truncated).toBe(true);
    expect(Buffer.byteLength(text(tight.preview))).toBeLessThanOrEqual(160);
    expect(tight.preview.at(-1)).toMatch(/\[truncated\]/);

    const wide = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading([current(`code:${"w".repeat(240)}`, "success")])).deps).catch((error: unknown) => error);
    // Measured: an over-wide ref is loaded, never refused; every preview line is clamped to the 220-character bound.
    expect(wide).not.toBeInstanceOf(CapabilityError);
    if (wide instanceof CapabilityError) throw wide;
    expect(wide.preview.length).toBeGreaterThan(0);
    expect(Math.max(...wide.preview.map((line) => line.length))).toBeLessThanOrEqual(220);
  });

  it("C4: an invalid byte budget refuses validation before the seam runs", async () => {
    for (const maxBytes of [0, -1, 8, 1.5, Number.NaN, 1_000_000]) {
      const { read, deps: d } = deps({ maxBytes });
      expect((await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, d))).category, String(maxBytes)).toBe("validation");
      expect(read).not.toHaveBeenCalled();
    }
  });

  it("C4: the seam receives the target and abort signal only, and the deps surface exposes no control verb", async () => {
    const controller = new AbortController();
    const { read, deps: d } = deps({ signal: controller.signal });
    await readForgeOperationEvidence(`forge-operation:${OPERATION}`, d);
    expect(read.mock.calls[0]?.[0]).toStrictEqual({ target: SCOPE.workspace, signal: controller.signal });
    expectTypeOf<keyof ForgeEvidenceDeps>().toEqualTypeOf<"grants" | "scope" | "target" | "read" | "now" | "maxBytes" | "signal" | "owner">();
    controller.abort();
    const { read: spy, deps: aborted } = deps({ signal: controller.signal });
    expect((await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, aborted))).category).toBe("transport");
    expect(spy).not.toHaveBeenCalled();
  });

  it("C4: sourceBasis is digest-shaped only", async () => {
    const digest = `sha256:${"a".repeat(64)}`;
    const withBasis = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading([current("code:a", "success")], { data: { packages: [current("code:a", "success")], source_snapshot_id: digest } })).deps);
    expect(withBasis.sourceBasis).toBe(digest);
    const bogus = await readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({}, reading([current("code:a", "success")], { data: { packages: [current("code:a", "success")], source_snapshot_id: "/home/me/workspace" } })).deps);
    expect(bogus.sourceBasis).toBeUndefined();
  });

  it("C4: the capture time is the host clock and must be a timezone-qualified instant", async () => {
    const error = await refusal(readForgeOperationEvidence(`forge-operation:${OPERATION}`, deps({ now: () => "yesterday" }).deps));
    expect(error.category).toBe("validation");
  });
});
