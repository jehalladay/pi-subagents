/**
 * wb-xeej (W17 remainder carved from wb-pno at the 2026-11-11 graph audit, R-B768 KEEP; the wb-69g.6 gate's F4 gap: "the
 * landed designer core has no input-schema or binding-argument validation"). workflow_validate's supplied inputs are judged
 * against the meta.inputSchema the source declares, and its supplied bindings against the authorized registry snapshot,
 * by the designer core (src/workbench/designer.ts checkWorkflowInputs and checkWorkflowBindings), rendered by the validate
 * reply builder (src/workbench/validate-reply.ts) and reached through the registered tool (src/index.ts).
 *
 * Bead acceptance, quoted: "supplied inputs and binding arguments are validated against the declared input schema; invalid
 * inputs produce a typed validation refusal (not INPUTS_UNCHECKED); the INPUTS_UNCHECKED emission is removed or demoted to
 * the no-schema-declared case only; gate-passing tests cover valid, invalid, and schema-absent paths."
 *
 * PINNED READER SET (this file, every case a row whose id leads its line; observed result = the row's expected value):
 *  - XI-A01..XI-A13 (checkWorkflowInputs verdict): conforms (A01), mismatch on a wrong type, a missing required member, an
 *    extra member, a non-object and a function the launch's args boundary refuses (A02-A06), undeclared without the member
 *    and with a meta that is not a pure literal (A07-A08), unusable for a string, an unknown type, an unresolved $ref, an
 *    invalid pattern and an array (A09-A13).
 *  - XI-B01..XI-B04 (validateWorkflowSource): META_INPUT_SCHEMA error and an invalid status only for an unusable declaration.
 *  - XI-C01..XI-C08 (buildWorkflowValidateReply inputs): refusal code or request-scope codes and the completed status.
 *  - XI-D01..XI-D12 (buildWorkflowValidateReply bindings): refusal code or request-scope codes and the completed status.
 *  - XI-E01..XI-E05 (registered workflow_validate): the tool-reply/v1 error code or request-scope codes and status.
 * Each table is held to a frozen id list declared above it. Every refusal reason, every new message and the tool
 * description phrase are pinned as literals. The reply never echoes a supplied input or binding value.
 *
 * NOT CLAIMED by this file: runtime enforcement of meta.inputSchema when a workflow runs (the runtime reads no meta beyond
 * name, description, whenToUse and phases); the SubagentWorkflow tool description (it does not advertise meta.inputSchema);
 * binding a capability the source never calls (only the version a supplied binding names is compared); JSON Schema keywords
 * outside the capability registry's supported set (they make a declaration unusable, never silently ignored).
 */
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import {
  checkWorkflowBindings,
  checkWorkflowInputs,
  validateWorkflowSource,
  type WorkflowSource,
  type WorkflowValidation,
} from "../src/workbench/designer.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { buildWorkflowValidateReply, type WorkflowValidateReply, type WorkflowValidateRequest } from "../src/workbench/validate-reply.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const CLAIM_CORE = "the designer core reads each supplied input against the declared meta.inputSchema as conforms, mismatch, undeclared or unusable";
const CLAIM_SOURCE = "a declared meta.inputSchema outside the supported JSON Schema set is the core error META_INPUT_SCHEMA";
const CLAIM_REPLY = "workflow_validate refuses inputs that miss the declared meta.inputSchema as INPUTS_SCHEMA_MISMATCH or INPUT_SCHEMA_UNUSABLE, and reports INPUTS_UNCHECKED only when no readable meta.inputSchema is declared";
const CLAIM_BINDINGS = "workflow_validate compares supplied bindings with the authorized registry snapshot: BINDINGS_MISMATCH, BINDINGS_MALFORMED or BINDINGS_UNCHECKED_ARGUMENT";
const CLAIM_TOOL = "the registered workflow_validate tool carries INPUTS_SCHEMA_MISMATCH, INPUTS_UNCHECKED and BINDINGS_MISMATCH unchanged";

const INPUT_ROW_IDS = ["XI-A01", "XI-A02", "XI-A03", "XI-A04", "XI-A05", "XI-A06", "XI-A07", "XI-A08", "XI-A09", "XI-A10", "XI-A11", "XI-A12", "XI-A13"];
const SOURCE_ROW_IDS = ["XI-B01", "XI-B02", "XI-B03", "XI-B04"];
const REPLY_ROW_IDS = ["XI-C01", "XI-C02", "XI-C03", "XI-C04", "XI-C05", "XI-C06", "XI-C07", "XI-C08"];
const BINDING_ROW_IDS = ["XI-D01", "XI-D02", "XI-D03", "XI-D04", "XI-D05", "XI-D06", "XI-D07", "XI-D08", "XI-D09", "XI-D10", "XI-D11", "XI-D12"];
const TOOL_ROW_IDS = ["XI-E01", "XI-E02", "XI-E03", "XI-E04", "XI-E05"];

/** The fixed typed reasons of the four new validation refusals; none carries caller text. */
const REASONS = {
  INPUTS_SCHEMA_MISMATCH: "supplied inputs do not match the source's declared meta.inputSchema",
  INPUT_SCHEMA_UNUSABLE: "the source's declared meta.inputSchema is not a JSON Schema this host can check",
  BINDINGS_MALFORMED: "bindings must be an object mapping capability ids to version strings",
  BINDINGS_MISMATCH: "a supplied binding names a version the authorized registry snapshot does not bind",
} as const;
type NewRefusal = keyof typeof REASONS;
const INPUTS_UNCHECKED_MESSAGE = "Supplied inputs were not validated: the source declares no readable meta.inputSchema.";
const BINDINGS_UNCHECKED_MESSAGE = "Supplied bindings were not validated: a named capability is not discoverable in the authorized registry snapshot, or no snapshot was supplied.";
const META_INPUT_SCHEMA_MESSAGE = "meta.inputSchema must be a JSON Schema object using only supported keywords.";
const DESCRIPTION_PHRASE = "inputs are checked against the source's declared meta.inputSchema";

const INPUT_MARKER = "xeej-obviously-fake-input-marker";
const BINDING_MARKER = "9.9.9-xeej-obviously-fake";
const SOURCE_REF = "/fixture/wb-xeej/script.js";
const DESIGN = ["workbench:design"];
const DISCOVER = [...DESIGN, "discover:forge.gate.status"];
const TOPIC_SCHEMA = '{ type: "object", properties: { topic: { type: "string", minLength: 1 } }, required: ["topic"], additionalProperties: false }';

const digestOf = (text: string): string => `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
const scriptText = (meta: string): string => `export const meta = ${meta};\nreturn 1;`;
function scriptWith(meta: string): WorkflowSource {
  const source = scriptText(meta);
  return { definition: { kind: "script", id: SOURCE_REF, schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest: digestOf(source) }, sourceRef: SOURCE_REF, source };
}
const DECLARING_META = (schema: string): string => `{ name: "xeej", description: "declares its inputs", inputSchema: ${schema} }`;
const UNDECLARED_META = '{ name: "xeej", description: "declares no inputs" }';
const UNREADABLE_META = '{ name: NAME, description: "not a pure literal" }';
const declaring = (schema: string): WorkflowSource => scriptWith(DECLARING_META(schema));
const undeclared = (): WorkflowSource => scriptWith(UNDECLARED_META);
const unreadable = (): WorkflowSource => scriptWith(UNREADABLE_META);

function fixtureRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      id: "forge.gate.status",
      version: "1.0.0",
      description: "wb-xeej fixture",
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
}
function forbiddenValidate(): WorkflowValidation {
  throw new Error("the designer core must not run for a refused request");
}
function request(found: WorkflowSource, changes: Partial<WorkflowValidateRequest> = {}): WorkflowValidateRequest {
  return { sourceRef: found.sourceRef, digest: found.definition.artifactDigest, ...changes };
}
function parse(text: string): WorkflowValidateReply {
  return JSON.parse(text) as WorkflowValidateReply;
}
function requestCodes(reply: WorkflowValidateReply): string[] {
  return reply.status === "refused" ? [] : reply.uncertain.filter(item => item.scope === "request").map(item => item.code);
}
/** The tokens a claim header does not name. */
function missingTokens(header: string, tokens: readonly string[]): string[] {
  return [...new Set(tokens)].filter(token => !header.includes(token));
}

type InputVerdict = "conforms" | "mismatch" | "undeclared" | "unusable";
interface InputRow { readonly id: string; readonly source: () => WorkflowSource; readonly inputs: unknown; readonly verdict: InputVerdict }
const INPUT_ROWS: readonly InputRow[] = [
  { id: "XI-A01", source: () => declaring(TOPIC_SCHEMA), inputs: { topic: "auth" }, verdict: "conforms" },
  { id: "XI-A02", source: () => declaring(TOPIC_SCHEMA), inputs: { topic: 7 }, verdict: "mismatch" },
  { id: "XI-A03", source: () => declaring(TOPIC_SCHEMA), inputs: {}, verdict: "mismatch" },
  { id: "XI-A04", source: () => declaring(TOPIC_SCHEMA), inputs: { topic: "auth", extra: true }, verdict: "mismatch" },
  { id: "XI-A05", source: () => declaring(TOPIC_SCHEMA), inputs: "auth", verdict: "mismatch" },
  { id: "XI-A06", source: () => declaring("{}"), inputs: () => "not a JSON value", verdict: "mismatch" },
  { id: "XI-A07", source: undeclared, inputs: { topic: "auth" }, verdict: "undeclared" },
  { id: "XI-A08", source: unreadable, inputs: { topic: "auth" }, verdict: "undeclared" },
  { id: "XI-A09", source: () => declaring('"object"'), inputs: { topic: "auth" }, verdict: "unusable" },
  { id: "XI-A10", source: () => declaring('{ type: "nonsense" }'), inputs: { topic: "auth" }, verdict: "unusable" },
  { id: "XI-A11", source: () => declaring('{ $ref: "#/definitions/topic" }'), inputs: { topic: "auth" }, verdict: "unusable" },
  { id: "XI-A12", source: () => declaring('{ type: "string", pattern: "(" }'), inputs: "auth", verdict: "unusable" },
  { id: "XI-A13", source: () => declaring('[{ type: "object" }]'), inputs: { topic: "auth" }, verdict: "unusable" },
];

interface SourceRow { readonly id: string; readonly source: () => WorkflowSource; readonly status: WorkflowValidation["status"]; readonly flagged: boolean }
const SOURCE_ROWS: readonly SourceRow[] = [
  { id: "XI-B01", source: () => declaring(TOPIC_SCHEMA), status: "valid", flagged: false },
  { id: "XI-B02", source: () => declaring('"object"'), status: "invalid", flagged: true },
  { id: "XI-B03", source: () => declaring('{ type: "nonsense" }'), status: "invalid", flagged: true },
  { id: "XI-B04", source: undeclared, status: "valid", flagged: false },
];

type Outcome = { readonly refused: NewRefusal } | { readonly status: "valid" | "invalid" | "uncertain"; readonly codes: readonly string[] };
interface ReplyRow { readonly id: string; readonly source: () => WorkflowSource; readonly inputs?: unknown; readonly outcome: Outcome }
const REPLY_ROWS: readonly ReplyRow[] = [
  { id: "XI-C01", source: () => declaring(TOPIC_SCHEMA), inputs: { topic: "auth" }, outcome: { status: "valid", codes: [] } },
  { id: "XI-C02", source: () => declaring(TOPIC_SCHEMA), inputs: { topic: 7 }, outcome: { refused: "INPUTS_SCHEMA_MISMATCH" } },
  { id: "XI-C03", source: () => declaring(TOPIC_SCHEMA), inputs: {}, outcome: { refused: "INPUTS_SCHEMA_MISMATCH" } },
  { id: "XI-C04", source: undeclared, inputs: { topic: "auth" }, outcome: { status: "uncertain", codes: ["INPUTS_UNCHECKED"] } },
  { id: "XI-C05", source: unreadable, inputs: { topic: "auth" }, outcome: { status: "invalid", codes: ["INPUTS_UNCHECKED"] } },
  { id: "XI-C06", source: () => declaring('{ type: "nonsense" }'), inputs: { topic: "auth" }, outcome: { refused: "INPUT_SCHEMA_UNUSABLE" } },
  { id: "XI-C07", source: () => declaring(TOPIC_SCHEMA), outcome: { status: "valid", codes: [] } },
  { id: "XI-C08", source: undeclared, outcome: { status: "valid", codes: [] } },
];

interface BindingRow { readonly id: string; readonly bindings: unknown; readonly registry: boolean; readonly grants: readonly string[]; readonly outcome: Outcome }
const BINDING_ROWS: readonly BindingRow[] = [
  { id: "XI-D01", bindings: { "forge.gate.status": "1.0.0" }, registry: true, grants: DISCOVER, outcome: { status: "valid", codes: [] } },
  { id: "XI-D02", bindings: { "forge.gate.status": "2.0.0" }, registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MISMATCH" } },
  { id: "XI-D03", bindings: { "forge.gate.status": "2.0.0", "fixture.unseen": "1.0.0" }, registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MISMATCH" } },
  { id: "XI-D04", bindings: { "fixture.unseen": "1.0.0" }, registry: true, grants: DISCOVER, outcome: { status: "uncertain", codes: ["BINDINGS_UNCHECKED_ARGUMENT"] } },
  { id: "XI-D05", bindings: { "forge.gate.status": "1.0.0" }, registry: false, grants: DISCOVER, outcome: { status: "uncertain", codes: ["BINDINGS_UNCHECKED_ARGUMENT"] } },
  { id: "XI-D06", bindings: { "forge.gate.status": "1.0.0" }, registry: true, grants: DESIGN, outcome: { status: "uncertain", codes: ["BINDINGS_UNCHECKED_ARGUMENT"] } },
  { id: "XI-D07", bindings: null, registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MALFORMED" } },
  { id: "XI-D08", bindings: ["forge.gate.status"], registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MALFORMED" } },
  { id: "XI-D09", bindings: "forge.gate.status", registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MALFORMED" } },
  { id: "XI-D10", bindings: { "forge.gate.status": 1 }, registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MALFORMED" } },
  { id: "XI-D11", bindings: { "forge.gate.status": "" }, registry: true, grants: DISCOVER, outcome: { refused: "BINDINGS_MALFORMED" } },
  { id: "XI-D12", bindings: {}, registry: true, grants: DISCOVER, outcome: { status: "valid", codes: [] } },
];

/** The registered tool's reply as the model reads it; members a reply does not carry are absent. */
interface ToolReply {
  readonly ok: boolean;
  readonly status: string;
  readonly uncertain?: readonly { readonly scope: string; readonly code: string }[];
  readonly error?: { readonly code: string; readonly category: string; readonly message: string };
}
type ToolOutcome = { readonly refused: NewRefusal } | { readonly status: "valid" | "uncertain"; readonly codes: readonly string[] };
interface ToolRow { readonly id: string; readonly grants: readonly string[]; readonly meta: string; readonly params: Record<string, unknown>; readonly outcome: ToolOutcome }
const TOOL_ROWS: readonly ToolRow[] = [
  { id: "XI-E01", grants: DESIGN, meta: DECLARING_META(TOPIC_SCHEMA), params: { inputs: { topic: "auth" } }, outcome: { status: "valid", codes: [] } },
  { id: "XI-E02", grants: DESIGN, meta: DECLARING_META(TOPIC_SCHEMA), params: { inputs: { topic: 7, marker: INPUT_MARKER } }, outcome: { refused: "INPUTS_SCHEMA_MISMATCH" } },
  { id: "XI-E03", grants: DESIGN, meta: UNDECLARED_META, params: { inputs: { topic: "auth" } }, outcome: { status: "uncertain", codes: ["INPUTS_UNCHECKED"] } },
  { id: "XI-E04", grants: DISCOVER, meta: DECLARING_META(TOPIC_SCHEMA), params: { bindings: { "forge.gate.status": "1.0.0" } }, outcome: { status: "valid", codes: [] } },
  { id: "XI-E05", grants: DISCOVER, meta: DECLARING_META(TOPIC_SCHEMA), params: { bindings: { "forge.gate.status": BINDING_MARKER } }, outcome: { refused: "BINDINGS_MISMATCH" } },
];

function expectOutcome(reply: WorkflowValidateReply, text: string, outcome: Outcome): void {
  if ("refused" in outcome) {
    expect(reply).toEqual({ contractVersion: expect.any(String), status: "refused", refusal: { code: outcome.refused, category: "validation", reason: REASONS[outcome.refused] }, executed: false });
    expect(Object.keys(reply).sort()).toEqual(["contractVersion", "executed", "refusal", "status"]);
  } else {
    expect(reply.status).toBe(outcome.status);
    expect(requestCodes(reply)).toEqual(outcome.codes);
  }
  expect(text).not.toContain(INPUT_MARKER);
  expect(text).not.toContain(BINDING_MARKER);
}

describe("wb-xeej frozen shape: every table holds exactly its listed rows, and each claim header names what its rows assert", () => {
  it("the five tables hold their frozen id lists in order", () => {
    expect(INPUT_ROWS.map(row => row.id)).toEqual(INPUT_ROW_IDS);
    expect(SOURCE_ROWS.map(row => row.id)).toEqual(SOURCE_ROW_IDS);
    expect(REPLY_ROWS.map(row => row.id)).toEqual(REPLY_ROW_IDS);
    expect(BINDING_ROWS.map(row => row.id)).toEqual(BINDING_ROW_IDS);
    expect(TOOL_ROWS.map(row => row.id)).toEqual(TOOL_ROW_IDS);
  });

  it("each claim header names every verdict, code or refusal its rows assert", () => {
    const named = (outcome: Outcome | ToolOutcome): string[] => ("refused" in outcome ? [outcome.refused] : [...outcome.codes]);
    expect(missingTokens(CLAIM_CORE, ["meta.inputSchema", ...INPUT_ROWS.map(row => row.verdict)])).toEqual([]);
    expect(missingTokens(CLAIM_SOURCE, ["meta.inputSchema", "META_INPUT_SCHEMA"])).toEqual([]);
    expect(missingTokens(CLAIM_REPLY, ["meta.inputSchema", ...REPLY_ROWS.flatMap(row => named(row.outcome))])).toEqual([]);
    expect(missingTokens(CLAIM_BINDINGS, BINDING_ROWS.flatMap(row => named(row.outcome)))).toEqual([]);
    expect(missingTokens(CLAIM_TOOL, TOOL_ROWS.flatMap(row => named(row.outcome)))).toEqual([]);
  });
});

describe(CLAIM_CORE, () => {
  it.each(INPUT_ROWS)("$id reads $verdict", row => {
    expect(checkWorkflowInputs(row.source(), row.inputs)).toBe(row.verdict);
  });

  it("a value the launch's args boundary refuses never conforms, even to the empty schema", () => {
    for (const inputs of [{ topic: "auth", absent: undefined }, { topic: Number.NaN }, { topic: 1n }]) {
      expect(checkWorkflowInputs(declaring("{}"), inputs)).toBe("mismatch");
    }
    expect(checkWorkflowInputs(declaring("{}"), { topic: "auth" })).toBe("conforms");
  });
});

describe(CLAIM_SOURCE, () => {
  it.each(SOURCE_ROWS)("$id reads $status", row => {
    const result = validateWorkflowSource(row.source());
    expect(result.status).toBe(row.status);
    const flagged = result.diagnostics.filter(item => item.code === "META_INPUT_SCHEMA");
    expect(flagged).toEqual(row.flagged ? [{ code: "META_INPUT_SCHEMA", message: META_INPUT_SCHEMA_MESSAGE, severity: "error" }] : []);
  });
});

describe(CLAIM_REPLY, () => {
  it.each(REPLY_ROWS)("$id", row => {
    const found = row.source();
    const result = buildWorkflowValidateReply({ request: request(found, row.inputs === undefined ? {} : { inputs: row.inputs }), source: found, grants: DESIGN });
    expectOutcome(parse(result.text), result.text, row.outcome);
  });

  it("a refused input never enters the designer core and never echoes the supplied value", () => {
    const found = declaring(TOPIC_SCHEMA);
    const result = buildWorkflowValidateReply({ request: request(found, { inputs: { topic: 7, marker: INPUT_MARKER } }), source: found, grants: DESIGN, validate: forbiddenValidate });
    expectOutcome(parse(result.text), result.text, { refused: "INPUTS_SCHEMA_MISMATCH" });
  });

  it("INPUTS_UNCHECKED is offered for every undeclared row and for no other row of the core table", () => {
    for (const row of INPUT_ROWS) {
      const found = row.source();
      const reply = parse(buildWorkflowValidateReply({ request: request(found, { inputs: row.inputs }), source: found, grants: DESIGN }).text);
      expect(requestCodes(reply).includes("INPUTS_UNCHECKED"), row.id).toBe(row.verdict === "undeclared");
      if (reply.status !== "refused") {
        const item = reply.uncertain.find(entry => entry.code === "INPUTS_UNCHECKED");
        if (item) expect(item.message).toBe(INPUTS_UNCHECKED_MESSAGE);
      }
    }
  });

  it("authorization and the source identity still refuse first: the grant, then the digest, before any input is judged", () => {
    const found = declaring(TOPIC_SCHEMA);
    const mismatched = { inputs: { topic: 7 } };
    const ungranted = parse(buildWorkflowValidateReply({ request: request(found, mismatched), source: found, grants: [], validate: forbiddenValidate }).text);
    expect(ungranted.status === "refused" ? ungranted.refusal.code : ungranted.status).toBe("MISSING_DESIGN_GRANT");
    const wrongDigest = parse(buildWorkflowValidateReply({ request: request(found, { ...mismatched, digest: `sha256:${"0".repeat(64)}` }), source: found, grants: DESIGN, validate: forbiddenValidate }).text);
    expect(wrongDigest.status === "refused" ? wrongDigest.refusal.code : wrongDigest.status).toBe("DIGEST_MISMATCH");
  });
});

describe(CLAIM_BINDINGS, () => {
  it.each(BINDING_ROWS)("$id", row => {
    const found = undeclared();
    const result = buildWorkflowValidateReply({ request: request(found, { bindings: row.bindings }), source: found, grants: row.grants, ...(row.registry ? { registry: fixtureRegistry() } : {}) });
    expectOutcome(parse(result.text), result.text, row.outcome);
  });

  it("the core verdicts behind the rows: matches, mismatch, malformed and unestablished", () => {
    const registry = fixtureRegistry();
    expect(checkWorkflowBindings({ "forge.gate.status": "1.0.0" }, { registry, grants: DISCOVER })).toBe("matches");
    expect(checkWorkflowBindings({ "forge.gate.status": BINDING_MARKER }, { registry, grants: DISCOVER })).toBe("mismatch");
    expect(checkWorkflowBindings([], { registry, grants: DISCOVER })).toBe("malformed");
    expect(checkWorkflowBindings({ "forge.gate.status": "1.0.0" }, { grants: DISCOVER })).toBe("unestablished");
  });

  it("BINDINGS_UNCHECKED_ARGUMENT carries the demoted message, and a mismatching version is never echoed", () => {
    const found = undeclared();
    const unchecked = parse(buildWorkflowValidateReply({ request: request(found, { bindings: { "forge.gate.status": "1.0.0" } }), source: found, grants: DISCOVER }).text);
    if (unchecked.status === "refused") throw new Error("expected a completed reply");
    expect(unchecked.uncertain.find(item => item.code === "BINDINGS_UNCHECKED_ARGUMENT")?.message).toBe(BINDINGS_UNCHECKED_MESSAGE);
    const result = buildWorkflowValidateReply({ request: request(found, { bindings: { "forge.gate.status": BINDING_MARKER } }), source: found, grants: DISCOVER, registry: fixtureRegistry(), validate: forbiddenValidate });
    expectOutcome(parse(result.text), result.text, { refused: "BINDINGS_MISMATCH" });
  });
});

/** Each tool row boots the real extension; under a loaded host that outlasts vitest's 5000 ms default (the sibling suite allows 60_000). */
const BOOT_TIMEOUT_MS = 60_000;
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
});

async function boot(rights: readonly string[]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, dir: sandbox.dir };
}

describe(CLAIM_TOOL, () => {
  it.each(TOOL_ROWS)("$id", async row => {
    const booted = await boot(row.grants);
    const workflows = join(booted.dir, ".pi", "workflows");
    mkdirSync(workflows, { recursive: true });
    writeFileSync(join(workflows, "xeej.js"), scriptText(row.meta));
    const tool = booted.pi.tools.get("workflow_validate");
    expect(tool, "workflow_validate must be registered").toBeDefined();
    const text = textOf(await tool.execute("xeej", { name: "xeej", ...row.params }, undefined, undefined, booted.context));
    const reply = JSON.parse(text) as ToolReply;
    if ("refused" in row.outcome) {
      expect(reply).toMatchObject({ ok: false, status: "refused", error: { code: row.outcome.refused, category: "validation", message: REASONS[row.outcome.refused] } });
    } else {
      expect(reply).toMatchObject({ ok: true, status: row.outcome.status });
      expect((reply.uncertain ?? []).filter(item => item.scope === "request").map(item => item.code)).toEqual(row.outcome.codes);
    }
    expect(text).not.toContain(INPUT_MARKER);
    expect(text).not.toContain(BINDING_MARKER);
  }, BOOT_TIMEOUT_MS);

  it("the tool description says how supplied inputs and bindings are checked", async () => {
    const booted = await boot([]);
    const tool = booted.pi.tools.get("workflow_validate");
    expect(tool.description).toContain(DESCRIPTION_PHRASE);
    expect(tool.description).not.toContain("inputs and bindings are accepted and reported as uncertain");
  }, BOOT_TIMEOUT_MS);
});
