/** Schema contracts fail closed at registration, before a provider can produce effects. */
import { describe, expect, it, vi } from "vitest";
import { CapabilityRegistry, type InvocationContext, type JsonValue } from "../src/workbench/capability-registry.js";

const malformed: Record<string, unknown>[] = [
  { required: "field" }, { required: [1] }, { required: ["field", "field"] },
  { oneOf: [{ type: "nonsense" }] }, { anyOf: {} }, { allOf: [] }, { not: { required: "field" } },
  { properties: { field: { enum: "value" } } }, { enum: [] }, { enum: [1, 1] },
  { additionalProperties: "false" }, { additionalProperties: { type: "nonsense" } },
  { items: { oneOf: [{ type: "nonsense" }] } }, { items: [] },
  { minLength: "1" }, { maxLength: -1 }, { minItems: 1.5 }, { uniqueItems: "true" },
  { minimum: "1" }, { exclusiveMaximum: true }, { multipleOf: 0 },
  { pattern: "[" }, { patternProperties: { "[": { type: "string" } } },
  { dependentRequired: { field: "other" } }, { contains: { type: "nonsense" } },
  JSON.parse('{"if":{"type":"nonsense"},"then":{}}'), { unknownValidationKeyword: true }, { $ref: "#/unknown" },
];
function provider(inputSchema: Record<string, unknown>, invoke: (input: JsonValue, context: InvocationContext) => Promise<JsonValue> = vi.fn(async () => null)) {
  return { descriptor: { id: "schema.check", version: "1.0.0", description: "Schema", inputSchema, effectClass: "read" as const, permissions: ["read"], supportedModes: ["invoke" as const] }, invoke };
}
const ctx = { grants: ["read"], signal: new AbortController().signal };

describe("capability registration schema contract", () => {
  it.each(malformed)("rejects malformed or unsupported schema %j without provider effects", async schema => {
    const registry = new CapabilityRegistry();
    const candidate = provider({ type: "object", ...schema });
    expect(() => registry.register(candidate)).toThrow(/schema/i);
    await expect(registry.invoke("schema.check", {}, ctx)).rejects.toMatchObject({ category: "unavailable" });
    expect(candidate.invoke).not.toHaveBeenCalled();
  });
  it("rejects malformed output contract before provider execution", () => {
    const registry = new CapabilityRegistry();
    const candidate = provider({ type: "object" });
    expect(() => registry.register({ ...candidate, descriptor: { ...candidate.descriptor, outputSchema: { oneOf: [{ type: "nonsense" }] } } })).toThrow(/schema/i);
    expect(candidate.invoke).not.toHaveBeenCalled();
  });
  it("enforces valid nested combinators and required fields before invocation", async () => {
    const registry = new CapabilityRegistry();
    const candidate = provider({ type: "object", required: ["field"], properties: { field: { oneOf: [{ type: "string", minLength: 2 }, { type: "integer", minimum: 2 }] } }, additionalProperties: false });
    registry.register(candidate);
    for (const input of [{}, { field: true }, { field: "x" }, { field: 1 }]) {
      await expect(registry.invoke("schema.check", input, ctx)).rejects.toMatchObject({ category: "validation" });
    }
    expect(candidate.invoke).not.toHaveBeenCalled();
    await expect(registry.invoke("schema.check", { field: "ok" }, ctx)).resolves.toBeNull();
    expect(candidate.invoke).toHaveBeenCalledTimes(1);
  });
});

describe("provider diagnostic redaction", () => {
  it("does not expose credential strings from provider exceptions", async () => {
    const registry = new CapabilityRegistry();
    registry.register(provider({ type: "object" }, vi.fn(async () => { throw new Error('Authorization: Bearer sk-ant-audit-fake-secret'); })));
    await expect(registry.invoke("schema.check", {}, ctx)).rejects.not.toThrow(/sk-ant-audit-fake-secret/);
  });
  it("bounds exception messages before they cross RPC or reach presentation", async () => {
    const registry = new CapabilityRegistry();
    registry.register(provider({ type: "object" }, vi.fn(async () => { throw new Error("x".repeat(300_000)); })));
    try { await registry.invoke("schema.check", {}, ctx); } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message.length).toBeLessThanOrEqual(8192);
      return;
    }
    throw new Error("Expected failed provider");
  });
});

describe("strict JSON snapshot serialization", () => {
  it("never evaluates inherited array serialization accessors or changes the validated payload", async () => {
    let getters = 0;
    let serializers = 0;
    class ExoticArray extends Array<string> {
      get toJSON() {
        getters++;
        return () => { serializers++; return "not-the-sent-array"; };
      }
    }
    const registry = new CapabilityRegistry();
    const invoke = vi.fn(async (input: JsonValue) => input);
    registry.register(provider({ type: "object", properties: { field: { type: "array", items: { type: "string" } } }, required: ["field"] }, invoke));
    await expect(registry.invoke("schema.check", { field: new ExoticArray("original") }, ctx)).resolves.toEqual({ field: ["original"] });
    expect(getters).toBe(0);
    expect(serializers).toBe(0);
    expect(invoke).toHaveBeenCalledWith({ field: ["original"] }, expect.anything());
  });
});
