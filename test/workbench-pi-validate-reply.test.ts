/**
 * wb-h8f.6 (W16-Gw/VC-6): the registered workflow_validate Pi tool adopts the landed wb-69g.6 reply builder
 * (buildWorkflowValidateReply over inspectWorkflowSource, with the grant snapshot from grants(ctx) only) and shows the
 * model ONE dialect, workbench.tool-reply/v1. That is owner-bound wiring requirement (1) of the wb-69g.6 gate (F2,
 * 14:55Z): the envelope name, the error shape, the byte-cap reason and the clamping floor converge, and "two dialects never
 * both reach the model". Requirement (2) (F5): the tool schema pins digest beside sourceRef and mode "static".
 * Folded into the same src/index.ts touch on the owner's authority: workbench_catalog adopts buildWorkflowCatalogReply
 * under the same rule (wb-h8f.4 gate ruling R2, 15:40Z), and CapabilityRegistry.register() refuses the
 * contract-violating descriptor fields the wb-1q8 gate measured (F1/F3, bound onto this bead by name on 2026-10-16).
 *
 * Every case boots the REAL extension in claude mode through test/helpers/boot-extension.ts (or drives the real
 * registry) and quotes the docs/workbench text it pins. Fixture providers join the real registry through the same
 * call-through register() seam test/workbench-pi-tool-replies.test.ts uses: the real register() runs with its full
 * validation. Every control or invisible code point is built with String.fromCodePoint, and every credential-shaped
 * value is obviously fake.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { type CapabilityDescriptor, CapabilityError, type CapabilityProvider, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { stripUnsafeText } from "../src/workbench/redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION, TOOL_REPLY_DEFAULT_MAX_BYTES, TOOL_REPLY_MAX_LIMIT } from "../src/workbench/tool-replies.js";
import { VALIDATE_REPLY_CONTRACT_VERSION } from "../src/workbench/validate-reply.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const cp = (code: number): string => String.fromCodePoint(code);
const ESC = cp(0x1b);
const LF = cp(0x0a);
const HOSTILE = `${ESC}[31mred${ESC}[0m ${cp(0x202e)}evil${cp(0x202c)} ${cp(0x2066)}bidi${cp(0x2069)} zero${cp(0x200b)}width`;
const FAKE = "h8f6-obviously-fake-credential-value";
/** The 14:33Z required acceptance case: "Authorization: Bearer" with the value on the next line. */
const LINE_SPLIT = `Authorization: Bearer${LF}${FAKE}`;
const DESIGN_DENIAL = "Permission denied: workbench:design grant required.";
const OUTSIDE_DENIAL = "Source denied outside workspace.";

interface ReplyItem { readonly scope: string; readonly code: string; readonly message: string }
interface ReplyCount { readonly offered: number; readonly returned: number; readonly scope: string }
/** The registered tool's reply as the model reads it; members a refusal does not carry are absent. */
interface ValidateToolReply {
  readonly contract: string;
  readonly tool: string;
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly executed: boolean;
  readonly status: string;
  readonly syntax?: string;
  readonly source?: { readonly sourceRef: string; readonly artifactDigest: string; readonly digestChecked: boolean };
  readonly meta?: { readonly name?: string; readonly description?: string };
  readonly errors: readonly ReplyItem[];
  readonly warnings: readonly ReplyItem[];
  readonly uncertain: readonly ReplyItem[];
  readonly possibleCalls: readonly unknown[];
  readonly counts: Readonly<Record<string, ReplyCount>>;
  readonly deployment?: { readonly registrySupplied: boolean; readonly grantCount: number };
  readonly truncated?: { readonly reason: string; readonly maxBytes: number };
  readonly error?: { readonly code: string; readonly category: string; readonly message: string };
}
interface CatalogToolReply {
  readonly contract: string;
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly matched: number;
  readonly offered: number;
  readonly returned: number;
  readonly rows: readonly { readonly id: string; readonly description: string }[];
  readonly nextCursor?: string;
  readonly truncated?: { readonly reason: string; readonly maxBytes: number };
  readonly error?: { readonly code: string };
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const scratch: string[] = [];
/** Fixture ids the real register() refused with a typed validation error during this case. */
const refusedFixtures: string[] = [];
const providerCalls = { invoke: 0, inspect: 0 };
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  removeScratch(...scratch.splice(0));
  refusedFixtures.length = 0;
  vi.restoreAllMocks();
});

function provider(id: string, description: string): CapabilityProvider {
  return {
    descriptor: { id, version: "1.0.0", description, inputSchema: { type: "object" }, effectClass: "read", permissions: [], supportedModes: ["invoke", "inspect"] },
    invoke: async () => { providerCalls.invoke++; return null; },
    inspect: async () => { providerCalls.inspect++; return null; },
  };
}

/** Boots the real extension; `fixtures` join the real registry right after forge.gate.status, through the real register(). */
async function boot(rights: readonly string[], fixtures: () => CapabilityProvider[] = () => []) {
  providerCalls.invoke = 0;
  providerCalls.inspect = 0;
  const original = CapabilityRegistry.prototype.register;
  vi.spyOn(CapabilityRegistry.prototype, "register").mockImplementation(function (this: CapabilityRegistry, registered: CapabilityProvider) {
    original.call(this, registered);
    if (registered.descriptor.id !== "forge.gate.status") return;
    for (const fixture of fixtures()) {
      try {
        original.call(this, fixture);
      } catch (error) {
        if (!(error instanceof CapabilityError) || error.category !== "validation") throw error;
        refusedFixtures.push(String(fixture.descriptor.id));
      }
    }
  });
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, dir: sandbox.dir };
}
type Booted = Awaited<ReturnType<typeof boot>>;

const digestOf = (source: string): string => `sha256:${createHash("sha256").update(source, "utf8").digest("hex")}`;

/** Saves a workflow under .pi/workflows and returns the identity the designer resolves for it. */
function save(booted: Booted, name: string, source: string): { readonly sourceRef: string; readonly digest: string } {
  const dir = join(booted.dir, ".pi", "workflows");
  mkdirSync(dir, { recursive: true });
  const path = join(dir, `${name}.js`);
  writeFileSync(path, source);
  return { sourceRef: realpathSync(path), digest: digestOf(source) };
}

async function toolText(booted: Booted, name: string, params: Record<string, unknown>): Promise<string> {
  const tool = booted.pi.tools.get(name);
  expect(tool, `${name} must be registered`).toBeDefined();
  return textOf(await tool.execute("h8f6", params, undefined, undefined, booted.context));
}
const validateText = (booted: Booted, params: Record<string, unknown>) => toolText(booted, "workflow_validate", params);
const validate = async (booted: Booted, params: Record<string, unknown>) => JSON.parse(await validateText(booted, params)) as ValidateToolReply;
const catalogText = (booted: Booted, params: Record<string, unknown>) => toolText(booted, "workbench_catalog", params);
const catalog = async (booted: Booted, params: Record<string, unknown>) => JSON.parse(await catalogText(booted, params)) as CatalogToolReply;

/** Every string in a parsed reply, keys included. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => [key, ...stringsOf(child)]);
  return [];
}

const PLAIN = 'export const meta={name:"design",description:"local"};\nreturn 1;';

describe("V1 docs/11 'workflow_validate(sourceRef,inputs?,bindings?,mode?): ... errors/warnings and uncertain conditions': the builder's reply in the one dialect", () => {
  it("a saved source validates into the tool-reply/v1 envelope with three distinct arrays and scoped counts, and the builder's own contract string never reaches the model", async () => {
    const booted = await boot(["workbench:design"]);
    const { sourceRef, digest } = save(booted, "design", PLAIN);
    const text = await validateText(booted, { name: "design" });
    const reply = JSON.parse(text) as ValidateToolReply;
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_validate", ok: true, invoked: false, executed: false, status: "valid", syntax: "valid" });
    expect(reply.source).toMatchObject({ sourceRef, artifactDigest: digest, digestChecked: true });
    for (const list of [reply.errors, reply.warnings, reply.uncertain]) expect(Array.isArray(list)).toBe(true);
    expect(Object.keys(reply.counts).sort()).toEqual(["errors", "possibleCalls", "uncertain", "warnings"]);
    expect(new Set(Object.values(reply.counts).map(count => count.scope)).size).toBe(4);
    expect(text).not.toContain(VALIDATE_REPLY_CONTRACT_VERSION);
    expect(reply).not.toHaveProperty("contractVersion");
    expect(reply).not.toHaveProperty("truncation");
  });

  it("a dynamic binding yields an uncertain entry and a status that is never valid", async () => {
    const booted = await boot(["workbench:design"]);
    save(booted, "dynamic", 'export const meta={name:"dynamic",description:"d"};\nconst id = "forge." + "gate.status";\nawait node(id, {});\nreturn 1;');
    const reply = await validate(booted, { name: "dynamic" });
    expect(reply.ok).toBe(true);
    expect(reply.status).toBe("uncertain");
    expect(reply.uncertain.some(item => item.code === "DYNAMIC_OR_OPAQUE")).toBe(true);
    expect(reply.counts.uncertain?.offered).toBe(reply.uncertain.length);
  });

  it("a digest mismatch is the builder's typed error in the tool-reply error shape, never a warning, and nothing of the source is assembled", async () => {
    const booted = await boot(["workbench:design"]);
    const { sourceRef, digest } = save(booted, "pinned", 'export const meta={name:"PINNED-META",description:"pinned"};\nreturn 1;');
    const wrong = `sha256:${"0".repeat(64)}`;
    const text = await validateText(booted, { sourceRef, digest: wrong });
    expect(JSON.parse(text)).toEqual({
      contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_validate", ok: false, invoked: false, executed: false, status: "refused",
      error: { code: "DIGEST_MISMATCH", category: "validation", message: "submitted digest does not match the validated source identity" },
    });
    expect(text).not.toContain("PINNED-META");
    expect(text).not.toContain(wrong);
    expect(await validate(booted, { sourceRef, digest })).toMatchObject({ ok: true, status: "valid", source: { sourceRef, artifactDigest: digest } });
  });

  it("a malformed digest, a sourceRef that is not the resolved source and an unsupported mode are typed refusals too", async () => {
    const booted = await boot(["workbench:design"]);
    const alpha = save(booted, "alpha", PLAIN);
    const beta = save(booted, "beta", 'export const meta={name:"beta",description:"b"};\nreturn 2;');
    expect((await validate(booted, { sourceRef: alpha.sourceRef, digest: "sha256:not-hex" })).error?.code).toBe("DIGEST_MALFORMED");
    expect((await validate(booted, { name: "alpha", sourceRef: beta.sourceRef })).error?.code).toBe("SOURCE_REF_MISMATCH");
    expect((await validate(booted, { name: "alpha", mode: "execute" })).error?.code).toBe("UNSUPPORTED_MODE");
    expect(await validate(booted, { name: "alpha", sourceRef: alpha.sourceRef, digest: alpha.digest, mode: "static" })).toMatchObject({ ok: true, status: "valid" });
  });

  it("supplied inputs and bindings are accepted and reported uncertain, never validated", async () => {
    const booted = await boot(["workbench:design"]);
    save(booted, "design", PLAIN);
    const reply = await validate(booted, { name: "design", inputs: { topic: "x" }, bindings: { node: "y" } });
    expect(reply.status).toBe("uncertain");
    expect(reply.uncertain.filter(item => item.scope === "request").map(item => item.code)).toEqual(["INPUTS_UNCHECKED", "BINDINGS_UNCHECKED_ARGUMENT"]);
  });
});

describe("V2 docs/11 'Explicit workbench:design enables registered workflow_catalog and workflow_validate tools' / 'Validation reads exact authorized source bytes, checks their digest ... and compiles syntax without execution'", () => {
  it("without workbench:design the reply is today's refusal byte for byte, whatever the params carry", async () => {
    const booted = await boot([]);
    for (const params of [{ name: "any" }, { scriptPath: "x.js", grants: ["workbench:design", "*"] }, { sourceRef: "/etc/x.js", digest: `sha256:${"0".repeat(64)}`, mode: "static" }]) {
      expect(await validateText(booted, params)).toBe(DESIGN_DENIAL);
    }
  });

  it("a scriptPath or a sourceRef resolving outside ctx.cwd is today's outside-workspace denial", async () => {
    const booted = await boot(["workbench:design"]);
    const outside = makeScratch("pi-h8f6-outside-");
    scratch.push(outside);
    const foreign = join(outside, "foreign.js");
    writeFileSync(foreign, 'export const meta={name:"OUTSIDE-PRIVATE",description:"o"};\nreturn 1;');
    symlinkSync(foreign, join(booted.dir, "escape.js"));
    expect(await validateText(booted, { scriptPath: "escape.js" })).toBe(OUTSIDE_DENIAL);
    expect(await validateText(booted, { sourceRef: realpathSync(foreign), digest: digestOf("x") })).toBe(OUTSIDE_DENIAL);
  });

  it("a source whose top level would write a marker file is validated with the marker absent afterwards (zero execution)", async () => {
    const booted = await boot(["workbench:design"]);
    const marker = join(booted.dir, "executed.marker");
    save(booted, "marker", `export const meta={name:"marker",description:"m"};\nconst fs = await import("node:fs");\nfs.writeFileSync(${JSON.stringify(marker)}, "ran");\nreturn 1;`);
    expect(await validate(booted, { name: "marker" })).toMatchObject({ ok: true, executed: false, syntax: "valid" });
    expect(existsSync(marker)).toBe(false);
  });
});

describe("V3 docs/12 'Policy enforced in privileged host after receiving RPC' / 'Treat unknown permission data as deny.'", () => {
  it("deployment availability derives from grants(ctx) only: grants smuggled in params are ignored and an unknown grant string grants nothing", async () => {
    const booted = await boot(["workbench:design", "discover:forge.gate.status", "invoke:forge.gate.statuz"]);
    save(booted, "call", 'export const meta={name:"call",description:"c"};\nawait node("forge.gate.status", {});\nreturn 1;');
    const reply = await validate(booted, { name: "call", grants: ["*", "invoke:forge.gate.status"], capabilityGrants: ["invoke:forge.gate.status"] });
    expect(reply.ok).toBe(true);
    expect(reply.status).toBe("invalid");
    expect(reply.errors.map(item => item.code)).toContain("NODE_UNAUTHORIZED");
    expect(reply.deployment).toEqual({ registrySupplied: true, grantCount: 3 });
  });
});

describe("V4 docs/15 W16 'compact bounded result and ACL'", () => {
  it("reply bytes never exceed the byte cap, and the cut is marked in the tool-reply byte-cap shape with offered beside returned", async () => {
    const booted = await boot(["workbench:design"]);
    const calls = Array.from({ length: 400 }, (_, index) => `await agent("p${index}");`).join("\n");
    save(booted, "wide", `export const meta={name:"wide",description:"w"};\n${calls}\nreturn 1;`);
    const text = await validateText(booted, { name: "wide" });
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(TOOL_REPLY_DEFAULT_MAX_BYTES);
    const reply = JSON.parse(text) as ValidateToolReply;
    expect(reply.truncated).toEqual({ reason: "byte-cap", maxBytes: TOOL_REPLY_DEFAULT_MAX_BYTES });
    expect(reply.counts.possibleCalls).toMatchObject({ offered: 400, returned: reply.possibleCalls.length });
    expect(reply.possibleCalls.length).toBeLessThan(400);
    expect(reply).not.toHaveProperty("truncation");
  });

  // Calibration measured on this tree: with 174 possible calls the folded envelope grows one byte per description
  // character and crosses the 16 KiB cap near length 147, about 42 bytes before the builder's own record would. Past the
  // crossing only the wiring's rebuild under the measured overshoot keeps the text inside the cap.
  it("the cap holds for the folded envelope at every size, and the marker appears exactly when something was cut", async () => {
    const booted = await boot(["workbench:design"]);
    const calls = Array.from({ length: 174 }, (_, index) => `await agent("p${index}");`).join("\n");
    let cut = 0;
    let whole = 0;
    for (let length = 100; length < 200; length += 1) {
      save(booted, "sweep", `export const meta={name:"sweep",description:${JSON.stringify("d".repeat(length))}};\n${calls}\nreturn 1;`);
      const text = await validateText(booted, { name: "sweep" });
      expect(Buffer.byteLength(text), `description length ${length}`).toBeLessThanOrEqual(TOOL_REPLY_DEFAULT_MAX_BYTES);
      const reply = JSON.parse(text) as ValidateToolReply;
      const dropped = Object.values(reply.counts).some(count => count.returned < count.offered);
      expect(reply.truncated, `description length ${length}`).toEqual(dropped ? { reason: "byte-cap", maxBytes: TOOL_REPLY_DEFAULT_MAX_BYTES } : undefined);
      if (dropped) cut += 1;
      else whole += 1;
    }
    // The sweep crosses the cap: some sizes fit whole and some are cut, so both branches of the marker are exercised.
    expect(cut).toBeGreaterThan(0);
    expect(whole).toBeGreaterThan(0);
  }, 60_000);

  // Respin U2 (the g9-gate-s1 G17 probe, kept as the gate wrote it): the cap counts UTF-8 bytes, not UTF-16 units. A
  // description of U+4E2D takes three bytes per unit, so with 174 possible calls the folded envelope crosses the cap near
  // length 49, and an overshoot measured as text.length undercounts by two bytes per unit: that mutant let 14 of these 200
  // replies past the cap. Every size is measured and every size over the cap is listed, never only the first.
  it("the cap counts bytes: a multibyte description at every length from 1 to 200 keeps the folded envelope inside it", async () => {
    const booted = await boot(["workbench:design"]);
    const calls = Array.from({ length: 174 }, (_, index) => `await agent("p${index}");`).join("\n");
    const wide = cp(0x4e2d);
    const over: string[] = [];
    let cut = 0;
    let whole = 0;
    for (let length = 1; length <= 200; length += 1) {
      const description = wide.repeat(length);
      save(booted, "multibyte", `export const meta={name:"multibyte",description:${JSON.stringify(description)}};\n${calls}\nreturn 1;`);
      const text = await validateText(booted, { name: "multibyte" });
      const bytes = Buffer.byteLength(text);
      if (bytes > TOOL_REPLY_DEFAULT_MAX_BYTES) over.push(`length ${length}: ${bytes} bytes`);
      const reply = JSON.parse(text) as ValidateToolReply;
      // Not vacuous: the description reaches the model whole at every length, so the text carries at least two more bytes
      // than UTF-16 units per description unit, the very surplus a length-measured overshoot never sees.
      expect(reply.meta?.description, `description length ${length}`).toBe(description);
      expect(bytes - text.length, `description length ${length}`).toBeGreaterThanOrEqual(2 * length);
      const dropped = Object.values(reply.counts).some(count => count.returned < count.offered);
      expect(reply.truncated, `description length ${length}`).toEqual(dropped ? { reason: "byte-cap", maxBytes: TOOL_REPLY_DEFAULT_MAX_BYTES } : undefined);
      if (dropped) cut += 1;
      else whole += 1;
    }
    expect(over).toEqual([]);
    // The sweep crosses the cap in bytes: some lengths fit whole and some are cut.
    expect(cut).toBeGreaterThan(0);
    expect(whole).toBeGreaterThan(0);
  }, 180_000);

  it("adversarial ANSI, bidi and zero-width metadata and a line-split credential render sanitized", async () => {
    const booted = await boot(["workbench:design"]);
    save(booted, "hostile", `export const meta={name:${JSON.stringify(`name ${HOSTILE}`)},description:${JSON.stringify(`desc ${HOSTILE} ${LINE_SPLIT}`)}};\nreturn 1;`);
    const text = await validateText(booted, { name: "hostile" });
    const reply = JSON.parse(text) as ValidateToolReply;
    expect(reply.ok).toBe(true);
    for (const value of stringsOf(reply)) expect(stripUnsafeText(value)).toBe(value);
    expect(text).not.toContain(FAKE);
    expect(reply.meta?.description).toContain("[REDACTED]");
  });
});

describe("V5 docs/16 'no accidental duplication of tools or permission escalation' / F5 schema pins", () => {
  it("the tool name stays workflow_validate and a second session_start registers nothing twice", async () => {
    const booted = await boot([]);
    const registrations = () => (booted.pi.pi.registerTool.mock.calls as Array<[{ name: string }]>).filter(([tool]) => tool.name === "workflow_validate").length;
    expect(registrations()).toBe(1);
    await booted.pi.lifecycle.get("session_start")?.({}, booted.context);
    expect(registrations()).toBe(1);
  });

  it("the schema pins digest beside sourceRef and mode \"static\", keeps name and scriptPath, accepts inputs and bindings, and the description says so", async () => {
    const booted = await boot([]);
    const tool = booted.pi.tools.get("workflow_validate");
    const schema = JSON.parse(JSON.stringify(tool.parameters));
    expect(Object.keys(schema.properties).sort()).toEqual(["bindings", "digest", "inputs", "mode", "name", "scriptPath", "sourceRef"]);
    expect(schema.properties.sourceRef).toMatchObject({ type: "string" });
    expect(schema.properties.digest).toMatchObject({ type: "string" });
    expect(schema.properties.mode).toMatchObject({ const: "static" });
    expect(schema.required ?? []).toEqual([]);
    for (const phrase of ["workbench:design", "sourceRef", "digest", '"static"']) expect(tool.description).toContain(phrase);
  });
});

describe("workbench_catalog adopts buildWorkflowCatalogReply under the same tool-reply/v1 rule (wb-h8f.4 gate R2, folded into wb-h8f.6)", () => {
  const three = () => [provider("fixture.alpha", "alpha"), provider("fixture.beta", "beta"), provider("fixture.gamma", "gamma")];

  it("lists only capabilities whose exact discover:<id> grant is held, in the tool-reply/v1 envelope, without calling any provider", async () => {
    const booted = await boot(["discover:fixture.alpha", "discover:fixture.gamma", "inspect:fixture.beta"], three);
    const reply = await catalog(booted, { grants: ["*", "discover:fixture.beta"] });
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, ok: true, invoked: false, matched: 2, offered: 2, returned: 2 });
    expect(reply.rows.map(row => row.id)).toEqual(["fixture.alpha", "fixture.gamma"]);
    expect(providerCalls).toEqual({ invoke: 0, inspect: 0 });
  });

  it("filter, limit and cursor page the catalog as the builder defines, and an invalid cursor is a typed error, never a throw", async () => {
    const booted = await boot(["discover:fixture.alpha", "discover:fixture.beta", "discover:fixture.gamma"], three);
    const first = await catalog(booted, { limit: 2 });
    expect(first.rows.map(row => row.id)).toEqual(["fixture.alpha", "fixture.beta"]);
    expect(typeof first.nextCursor).toBe("string");
    const second = await catalog(booted, { limit: 2, cursor: first.nextCursor });
    expect(second.rows.map(row => row.id)).toEqual(["fixture.gamma"]);
    expect(second.nextCursor).toBeUndefined();
    expect((await catalog(booted, { filter: "gamma" })).rows.map(row => row.id)).toEqual(["fixture.gamma"]);
    expect(await catalog(booted, { cursor: "not a cursor" })).toMatchObject({ ok: false, invoked: false, error: { code: "invalid-cursor" } });
  });

  it("the limit bound derives from TOOL_REPLY_MAX_LIMIT and filter, limit and cursor are optional", async () => {
    const booted = await boot([]);
    const schema = JSON.parse(JSON.stringify(booted.pi.tools.get("workbench_catalog").parameters));
    expect(Object.keys(schema.properties).sort()).toEqual(["cursor", "filter", "limit"]);
    expect(schema.properties.limit).toMatchObject({ type: "integer", minimum: 1, maximum: TOOL_REPLY_MAX_LIMIT });
    expect(schema.properties.filter).toMatchObject({ type: "string" });
    expect(schema.properties.cursor).toMatchObject({ type: "string" });
    expect(schema.required ?? []).toEqual([]);
  });

  it("hostile descriptor text and a line-split credential come out sanitized and redacted through the wired catalog reply", async () => {
    const booted = await boot(["discover:fixture.hostile"], () => [provider("fixture.hostile", `hostile ${HOSTILE} ${LINE_SPLIT}`)]);
    const text = await catalogText(booted, {});
    const reply = JSON.parse(text) as CatalogToolReply;
    expect(reply.rows.map(row => row.id)).toEqual(["fixture.hostile"]);
    for (const value of stringsOf(reply)) expect(stripUnsafeText(value)).toBe(value);
    expect(text).not.toContain(FAKE);
    expect(reply.rows[0]?.description).toContain("[REDACTED]");
  });

  it("reply bytes never exceed the byte cap and a page the cap cut carries the marker and a cursor", async () => {
    const bulk = () => Array.from({ length: 60 }, (_, index) => provider(`fixture.bulk.n${String(index).padStart(3, "0")}`, `bulk ${"d".repeat(180)}`));
    const booted = await boot(bulk().map(fixture => `discover:${fixture.descriptor.id}`), bulk);
    const text = await catalogText(booted, { limit: TOOL_REPLY_MAX_LIMIT });
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(TOOL_REPLY_DEFAULT_MAX_BYTES);
    const reply = JSON.parse(text) as CatalogToolReply;
    expect(reply.truncated).toEqual({ reason: "byte-cap", maxBytes: TOOL_REPLY_DEFAULT_MAX_BYTES });
    expect(reply.matched).toBe(60);
    expect(reply.returned).toBeLessThan(60);
    expect(typeof reply.nextCursor).toBe("string");
  });
});

describe("CapabilityRegistry.register() refuses contract-violating descriptor fields (wb-1q8 gate F1/F3, bound onto wb-h8f.6 by name)", () => {
  const JUNK: ReadonlyArray<readonly [field: keyof CapabilityDescriptor, value: unknown]> = [
    ["description", undefined],
    ["description", 42],
    ["effectClass", 7],
    ["effectClass", "READ"],
    ["supportedModes", [{ x: 1 }]],
    ["supportedModes", ["invoke", "execute"]],
    ["supportedModes", "invoke"],
    ["contractSource", 5],
    ["version", ["1.0.0"]],
    ["id", ["fixture.junk"]],
  ];

  it.each(JUNK)("refuses %s = %j as a typed validation error and keeps it out of every snapshot", (field, value) => {
    const registry = new CapabilityRegistry();
    const junk = provider("fixture.junk", "junk");
    Reflect.set(junk.descriptor, field, value);
    let refusal: unknown;
    try {
      registry.register(junk);
    } catch (error) {
      refusal = error;
    }
    expect(refusal).toBeInstanceOf(CapabilityError);
    expect(refusal instanceof CapabilityError ? refusal.category : undefined).toBe("validation");
    expect(registry.catalogSnapshot()).toEqual([]);
  });

  it("still admits every shape the descriptor contract allows", () => {
    const registry = new CapabilityRegistry();
    const sourced = provider("fixture.sourced", "");
    Reflect.set(sourced.descriptor, "contractSource", "docs/workbench/06-capability-registry.md");
    Reflect.set(sourced.descriptor, "supportedModes", ["invoke", "inspect", "observe"]);
    registry.register(sourced);
    for (const effectClass of ["read", "write", "external", "unknown"]) {
      const fixture = provider(`fixture.effect.${effectClass}`, effectClass);
      Reflect.set(fixture.descriptor, "effectClass", effectClass);
      registry.register(fixture);
    }
    expect(registry.catalogSnapshot().map(entry => entry.descriptor.id)).toEqual(["fixture.sourced", "fixture.effect.read", "fixture.effect.write", "fixture.effect.external", "fixture.effect.unknown"]);
  });

  it("the two measured throw paths are closed: register-admitted junk never reaches the wired catalog or inspect reply, and both answer typed", async () => {
    const junk = (): CapabilityProvider[] => {
      const numeric = provider("fixture.numeric", "numeric");
      Reflect.set(numeric.descriptor, "description", 42);
      // Over the 16 KiB inspect cap with description undefined: the eager sort comparator measured byteLength(undefined).
      const missing = provider("fixture.missing", "missing");
      Reflect.set(missing.descriptor, "description", undefined);
      Reflect.set(missing.descriptor, "supportedModes", ["invoke", "inspect", ...Array.from({ length: 100 }, () => "m".repeat(200))]);
      return [numeric, missing];
    };
    const booted = await boot(["discover:fixture.numeric", "discover:fixture.missing", "inspect:fixture.missing"], junk);
    const listed = await catalog(booted, {});
    expect([...refusedFixtures].sort()).toEqual(["fixture.missing", "fixture.numeric"]);
    expect(listed).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, ok: true, rows: [] });
    const inspected = JSON.parse(await toolText(booted, "workflow_inspect", { target: "fixture.missing" }));
    expect(inspected).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, ok: false, error: { code: "unknown-target" } });
  });
});
