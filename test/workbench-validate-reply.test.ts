import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { inspectWorkflowSource, validateWorkflowSource, type WorkflowSource, type WorkflowValidation } from "../src/workbench/designer.js";
import {
  buildWorkflowValidateReply,
  VALIDATE_REPLY_CONTRACT_VERSION,
  VALIDATE_REPLY_DEFAULT_MAX_BYTES,
  VALIDATE_REPLY_MAX_BYTES,
  VALIDATE_REPLY_MIN_BYTES,
  type WorkflowValidateReply,
  type WorkflowValidateRequest,
} from "../src/workbench/validate-reply.js";

const roots: string[] = [];
function root(): string {
  const path = mkdtempSync(join(tmpdir(), "validate-reply-"));
  roots.push(path);
  return path;
}
afterEach(() => {
  for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true });
});
function source(body: string, meta = '{ name: "sample", description: "description" }'): WorkflowSource {
  const cwd = root();
  const path = join(cwd, "script.js");
  writeFileSync(path, `export const meta = ${meta};\n${body}`);
  return inspectWorkflowSource({ scriptPath: path }, cwd);
}
const DESIGN = ["workbench:design"];
function request(found: WorkflowSource, changes: Partial<WorkflowValidateRequest> = {}): WorkflowValidateRequest {
  return { sourceRef: found.sourceRef, digest: found.definition.artifactDigest, ...changes };
}
function build(found: WorkflowSource, changes: Partial<WorkflowValidateRequest> = {}, grants: readonly string[] | undefined = DESIGN, extra: { registry?: CapabilityRegistry; maxBytes?: number } = {}) {
  return buildWorkflowValidateReply({ request: request(found, changes), source: found, grants, ...extra });
}
function parse(text: string): WorkflowValidateReply {
  return JSON.parse(text) as WorkflowValidateReply;
}
function forbiddenValidate(): WorkflowValidation {
  throw new Error("the designer core must not run for a refused request");
}
const FIXTURE_REGISTRY = (): CapabilityRegistry => {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      id: "forge.gate.status",
      version: "1.0.0",
      description: "fixture",
      effectClass: "read",
      inputSchema: { type: "object", properties: { root: { type: "string" } }, required: ["root"], additionalProperties: false },
      permissions: ["forge:inspect"],
      supportedModes: ["invoke"],
    },
    invoke: async () => {
      throw new Error("NEVER INVOKE");
    },
  });
  return registry;
};

describe("W16 workflow_validate reply: accepted validation", () => {
  it("renders a clean valid source as compact bounded JSON with a digest-checked identity", () => {
    const found = source('await node("forge.gate.status", {root:"."}); return 1;');
    const result = build(found, {}, [...DESIGN, "forge:inspect", "discover:forge.gate.status"], { registry: FIXTURE_REGISTRY() });
    const reply = parse(result.text);
    expect(reply.contractVersion).toBe(VALIDATE_REPLY_CONTRACT_VERSION);
    expect(reply.status).toBe("valid");
    expect(reply.executed).toBe(false);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.source).toMatchObject({ sourceRef: found.sourceRef, artifactDigest: found.definition.artifactDigest, digestChecked: true });
    expect(reply.errors).toEqual([]);
    expect(reply.warnings).toEqual([]);
    expect(reply.uncertain).toEqual([]);
    expect(reply.syntax).toBe("valid");
    expect(reply.meta?.name).toBe("sample");
    expect(reply.possibleCalls[0]).toMatchObject({ primitive: "node", capabilityId: "forge.gate.status", provenance: "declared", line: 2 });
    expect(reply.deployment).toEqual({ registrySupplied: true, grantCount: 3 });
    expect(Buffer.byteLength(result.text)).toBeLessThanOrEqual(VALIDATE_REPLY_DEFAULT_MAX_BYTES);
    expect(result.truncated).toBe(false);
    expect(result.text).toBe(JSON.stringify(reply));
  });

  it("every count carries its own scope and offered/returned", () => {
    const reply = parse(build(source("return 1;")).text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    for (const key of ["errors", "warnings", "uncertain", "possibleCalls"] as const) {
      expect(reply.counts[key]).toMatchObject({ offered: 0, returned: 0 });
      expect(reply.counts[key].scope.length).toBeGreaterThan(10);
    }
    expect(new Set(Object.values(reply.counts).map(count => count.scope)).size).toBe(4);
  });

  it("never executes or writes the candidate source", () => {
    const body = 'throw Error("EXECUTED");';
    const found = source(body);
    const before = readFileSync(found.sourceRef, "utf8");
    const reply = parse(build(found).text);
    // The opaque Error(...) call is reported as uncertain; had the body run, the throw would have escaped.
    expect(reply.status).toBe("uncertain");
    expect(reply.executed).toBe(false);
    expect(readFileSync(found.sourceRef, "utf8")).toBe(before);
  });
});

describe("W16 workflow_validate reply: errors, warnings and uncertain stay distinct", () => {
  it("a syntax error is an error and invalid, never uncertain or valid", () => {
    const reply = parse(build(source("const = ;")).text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("invalid");
    expect(reply.syntax).toBe("invalid");
    expect(reply.errors.map(item => item.code)).toContain("SCRIPT_SYNTAX");
    expect(reply.warnings).toEqual([]);
  });

  it("dynamic branches, aliases and dynamic node ids are uncertain and never reported as pass", () => {
    const reply = parse(build(source('if (args.x) await agent("review");\nconst alias = agent; await alias("opaque");\nawait node(args.id, {});')).text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("uncertain");
    expect(reply.errors).toEqual([]);
    expect(reply.uncertain.length).toBeGreaterThanOrEqual(3);
    expect(reply.uncertain.every(item => item.scope === "projection" || item.scope === "diagnostic")).toBe(true);
    expect(reply.warnings).toEqual([]);
  });

  it("a dynamic branch alone keeps the verdict uncertain even if the core status is valid", () => {
    const found = source('if (args.x) await agent("review");');
    expect(validateWorkflowSource(found).status).toBe("valid");
    const reply = parse(build(found).text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("uncertain");
    expect(reply.coreStatus).toBe("valid");
  });

  it("unavailable bindings and unchecked registry surface as uncertain, not as warnings", () => {
    const found = source('await node("missing.capability", {});');
    const withRegistry = parse(build(found, {}, DESIGN, { registry: new CapabilityRegistry() }).text);
    const without = parse(build(found).text);
    for (const reply of [withRegistry, without]) {
      if (reply.status === "refused") throw new Error("unexpected refusal");
      expect(reply.status).toBe("uncertain");
      expect(reply.warnings).toEqual([]);
      expect(reply.uncertain.some(item => item.code === "NODE_UNAVAILABLE" || item.code === "BINDINGS_UNCHECKED")).toBe(true);
    }
    if (without.status === "refused") throw new Error("unexpected refusal");
    expect(without.deployment.registrySupplied).toBe(false);
  });

  it("an error and an uncertain item land in their own arrays exactly once", () => {
    const found = source('if (args.x) await agent("a");\nawait node("forge.gate.status", {root:2});');
    const reply = parse(build(found, {}, [...DESIGN, "forge:inspect", "discover:forge.gate.status"], { registry: FIXTURE_REGISTRY() }).text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("invalid");
    expect(reply.errors.map(item => item.code)).toEqual(["NODE_INPUT_SCHEMA"]);
    expect(reply.uncertain.length).toBeGreaterThan(0);
    const codes = [...reply.errors, ...reply.warnings, ...reply.uncertain].map(item => `${item.scope}:${item.code}:${item.message}`);
    expect(new Set(codes).size).toBe(codes.length);
    expect(reply.counts.errors).toMatchObject({ offered: 1, returned: 1 });
  });

  it("deployment capability availability comes only from the supplied grant snapshot, exact string, deny by default", () => {
    const found = source('await node("forge.gate.status", {root:"."});');
    const registry = FIXTURE_REGISTRY();
    const denied = parse(build(found, {}, [...DESIGN, "discover:forge.gate.status"], { registry }).text);
    if (denied.status === "refused") throw new Error("unexpected refusal");
    expect(denied.status).toBe("invalid");
    expect(denied.errors.map(item => item.code)).toContain("NODE_UNAUTHORIZED");
    const wildcard = parse(build(found, {}, [...DESIGN, "forge:inspect-x", "forge:inspect.extra"], { registry }).text);
    if (wildcard.status === "refused") throw new Error("unexpected refusal");
    expect(wildcard.uncertain.some(item => item.code === "NODE_UNAVAILABLE")).toBe(true);
    const allowed = parse(build(found, {}, [...DESIGN, "forge:inspect", "discover:forge.gate.status"], { registry }).text);
    expect(allowed.status).toBe("valid");
  });

  it("supplied inputs and bindings are reported as unchecked uncertainty and never echoed", () => {
    const found = source("return 1;");
    const result = build(found, { inputs: { secret: "TOPSECRETVALUE" }, bindings: { token: "BINDINGSECRET" } });
    const reply = parse(result.text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("uncertain");
    expect(reply.uncertain.filter(item => item.scope === "request").map(item => item.code).sort()).toEqual(["BINDINGS_UNCHECKED_ARGUMENT", "INPUTS_UNCHECKED"]);
    expect(result.text).not.toContain("TOPSECRETVALUE");
    expect(result.text).not.toContain("BINDINGSECRET");
  });
});

describe("W16 workflow_validate reply: typed refusals before any content assembly", () => {
  it("a digest mismatch is its own typed refusal, never a warning, and the core never runs", () => {
    const found = source("return 1;");
    const wrong = `sha256:${"0".repeat(64)}`;
    const result = buildWorkflowValidateReply({ request: request(found, { digest: wrong }), source: found, grants: DESIGN, validate: forbiddenValidate });
    const reply = parse(result.text);
    expect(reply.status).toBe("refused");
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("DIGEST_MISMATCH");
    expect(reply.refusal.category).toBe("validation");
    expect(Object.keys(reply).sort()).toEqual(["contractVersion", "executed", "refusal", "status"]);
    expect(result.text).not.toContain(wrong);
  });

  it.each([
    ["not a string", undefined],
    ["wrong algorithm", `md5:${"a".repeat(32)}`],
    ["uppercase hex", `sha256:${"A".repeat(64)}`],
    ["injected text", "Bearer abc\u001b[31m sha256:zz"],
  ])("a malformed digest (%s) is refused without echoing caller text", (_label, digest) => {
    const found = source("return 1;");
    const result = buildWorkflowValidateReply({ request: { sourceRef: found.sourceRef, digest: digest as string }, source: found, grants: DESIGN, validate: forbiddenValidate });
    const reply = parse(result.text);
    expect(reply.status).toBe("refused");
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(["DIGEST_MALFORMED", "DIGEST_MISMATCH"]).toContain(reply.refusal.code);
    expect(result.text).not.toContain("Bearer");
    expect(result.text).not.toContain("\u001b");
  });

  it("a sourceRef that is not the resolved source identity is refused", () => {
    const found = source("return 1;");
    const result = buildWorkflowValidateReply({ request: request(found, { sourceRef: "/etc/other.js" }), source: found, grants: DESIGN, validate: forbiddenValidate });
    const reply = parse(result.text);
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("SOURCE_REF_MISMATCH");
    expect(result.text).not.toContain("/etc/other.js");
  });

  it("source bytes that do not match their pinned definition digest are refused with their own code", () => {
    const found = source("return 1;");
    const tampered = { ...found, source: `${found.source}\n// changed` };
    const result = buildWorkflowValidateReply({ request: request(found), source: tampered, grants: DESIGN, validate: forbiddenValidate });
    const reply = parse(result.text);
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("SOURCE_BYTES_MISMATCH");
  });

  it.each([
    ["no grants", []],
    ["observer grants only", ["discover:forge.gate.status", "observe:forge"]],
    ["prefix of the design grant", ["workbench:design.extra", "workbench:desig"]],
  ])("deny by default: %s", (_label, grants) => {
    const found = source("return 1;");
    const result = buildWorkflowValidateReply({ request: request(found), source: found, grants, validate: forbiddenValidate });
    const reply = parse(result.text);
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("MISSING_DESIGN_GRANT");
    expect(reply.refusal.category).toBe("authorization");
  });

  it.each([
    ["undefined", undefined],
    ["a non-string entry", ["workbench:design", 7]],
    ["a malformed entry", ["workbench:design", "NOT A GRANT"]],
    ["a wildcard", ["workbench:design", "workbench:*"]],
  ])("unknown permission data (%s) is treated as deny", (_label, grants) => {
    const found = source("return 1;");
    const result = buildWorkflowValidateReply({ request: request(found), source: found, grants: grants as readonly string[] | undefined, validate: forbiddenValidate });
    const reply = parse(result.text);
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("UNKNOWN_PERMISSION_DATA");
  });

  it("authorization is decided before the digest, so an observer learns nothing about the source", () => {
    const found = source("return 1;");
    const result = buildWorkflowValidateReply({ request: request(found, { digest: `sha256:${"0".repeat(64)}` }), source: found, grants: [], validate: forbiddenValidate });
    const reply = parse(result.text);
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("MISSING_DESIGN_GRANT");
  });

  it.each(["compile", "", "STATIC"])("an unsupported mode %j is refused", mode => {
    const found = source("return 1;");
    const result = buildWorkflowValidateReply({ request: request(found, { mode: mode as "static" }), source: found, grants: DESIGN, validate: forbiddenValidate });
    const reply = parse(result.text);
    if (reply.status !== "refused") throw new Error("expected refusal");
    expect(reply.refusal.code).toBe("UNSUPPORTED_MODE");
    expect(result.text).not.toContain("STATIC");
  });

  it("the static mode is accepted", () => {
    expect(parse(build(source("return 1;"), { mode: "static" }).text).status).toBe("valid");
  });
});

describe("W16 workflow_validate reply: sanitization", () => {
  it("routes author-controlled metadata and messages through the shared sanitizers", () => {
    const found = source("return 1;", '{ name: "sam\\u001b[31mple", description: "password=hunter2 Bearer abc.def \\u202e" }');
    const result = build(found);
    expect(result.text).not.toContain("\u001b");
    expect(result.text).not.toContain("‮");
    expect(result.text).not.toContain("hunter2");
    expect(result.text).not.toContain("abc.def");
  });

  it("a diagnostic that quotes author source is sanitized", () => {
    const result = build(source('const secret = ; // api_key=ABCSECRET‮'));
    expect(result.text).not.toContain("ABCSECRET");
    expect(result.text).not.toContain("‮");
  });
});

describe("W16 workflow_validate reply: byte cap", () => {
  const manyBranches = (count: number): string => Array.from({ length: count }, (_, index) => `if (args.v${index}) await agent("p${index}");`).join("\n");

  it("never exceeds its byte cap and marks truncation visibly with offered vs returned counts", () => {
    const found = source(manyBranches(400));
    const result = build(found, {}, DESIGN, { maxBytes: VALIDATE_REPLY_MIN_BYTES });
    expect(Buffer.byteLength(result.text)).toBeLessThanOrEqual(VALIDATE_REPLY_MIN_BYTES);
    expect(result.truncated).toBe(true);
    const reply = parse(result.text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.truncation?.truncated).toBe(true);
    expect(reply.truncation?.marker).toContain("truncated");
    expect(reply.counts.uncertain.offered).toBeGreaterThan(reply.counts.uncertain.returned);
    expect(reply.counts.uncertain.returned).toBe(reply.uncertain.length);
    expect(reply.status).toBe("uncertain");
  });

  it("a full reply under the cap carries no truncation block", () => {
    const reply = parse(build(source(manyBranches(3))).text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.truncation).toBeUndefined();
  });

  it("errors are dropped last and the verdict is computed from offered counts, never returned ones", () => {
    const found = source(`${manyBranches(300)}\nconst = ;`);
    const result = build(found, {}, DESIGN, { maxBytes: VALIDATE_REPLY_MIN_BYTES });
    const reply = parse(result.text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("invalid");
    expect(reply.errors.map(item => item.code)).toContain("SCRIPT_SYNTAX");
  });

  it("a verdict stays uncertain when truncation dropped every uncertain item", () => {
    const found = source(manyBranches(2000));
    const result = build(found, {}, DESIGN, { maxBytes: VALIDATE_REPLY_MIN_BYTES });
    expect(Buffer.byteLength(result.text)).toBeLessThanOrEqual(VALIDATE_REPLY_MIN_BYTES);
    const reply = parse(result.text);
    if (reply.status === "refused") throw new Error("unexpected refusal");
    expect(reply.status).toBe("uncertain");
    expect(reply.counts.uncertain.offered).toBeGreaterThan(1000);
  });

  it("holds the cap for multibyte and hostile metadata", () => {
    const found = source(manyBranches(50), `{ name: "${"中".repeat(300)}", description: "${"é".repeat(900)}" }`);
    const result = build(found, {}, DESIGN, { maxBytes: VALIDATE_REPLY_MIN_BYTES });
    expect(Buffer.byteLength(result.text)).toBeLessThanOrEqual(VALIDATE_REPLY_MIN_BYTES);
  });

  it.each([0, 1, VALIDATE_REPLY_MIN_BYTES - 1, VALIDATE_REPLY_MAX_BYTES + 1, 1.5, Number.NaN])("rejects the invalid cap %s", maxBytes => {
    expect(() => build(source("return 1;"), {}, DESIGN, { maxBytes })).toThrow(/maxBytes/);
  });

  it("a refusal also honours its cap", () => {
    const found = source("return 1;");
    const result = build(found, {}, [], { maxBytes: VALIDATE_REPLY_MIN_BYTES });
    expect(Buffer.byteLength(result.text)).toBeLessThanOrEqual(VALIDATE_REPLY_MIN_BYTES);
  });
});
