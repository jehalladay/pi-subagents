/**
 * wb-h8f.11: the wb-h8f.6 PASS gate's carried survivors, pinned (owner routing at the h8f.6 landing, 2026-10-21T02:41:42Z,
 * on the wb-4ap.18 precedent). That gate's 24-mutant battery left five mutants alive on the h8f.6 wiring, each surviving
 * the full targeted suite and none blocking the landing under R591; G17 is cured by the landed byte-cap pin in
 * test/workbench-pi-validate-reply.test.ts:
 * - G14: the workflow_validate catch hands the raw error message to textResult, with no sanitizer;
 * - G15: the same catch renders the message with the "label" layout instead of "text";
 * - G16: workflowValidateToolText serializes the folded envelope with JSON.stringify instead of sanitizeWorkbenchJsonText;
 * - G20: workbench_catalog serializes the catalog reply with JSON.stringify instead of sanitizeWorkbenchJsonText;
 * - R9: CapabilityRegistry.register() refuses an outside-contract descriptor field without naming the field.
 *
 * Each SURVIVORS row is one survivor: the src obligation it pins, the gate battery's anchor text and replacement for its
 * mutant, the requirement it pins (quoted from the src doc comment that states it) and its pins. A pin is a probe the
 * REAL extension or registry runs, checked first by a liveness reading over the shipped helpers that the condition under
 * which it can tell the mutant from the shipped code holds, so an unrelated passing probe fails its own reading.
 *
 * G16 and G20 are told from the shipped code here where a per-field sanitizer's bound leaves text the shared serializer
 * reads again (the distinguishing inputs found: an assignment key left without its value, or a [REDACTED] marker the
 * bound split); ordinary hostile text is already settled by the builders' per-field sanitizers. The builders' records then
 * differ from their own serialization, and the wired reply must be the settled one.
 *
 * Anchors outside this file's literals: the set of rows is judged against the obligations the TypeScript AST of src
 * derives (every sanitizer call in the registerTool statements src/index.ts tags wb-h8f.6 and in the sibling functions
 * they call, a named layout argument counting as an obligation of its own, and register()'s interpolation of
 * descriptorFieldOutsideContract), the R9 pins against the fields that function returns, and every anchor text and quote
 * against its file. A row removed from every literal here, or an R9 pin, still reds against src; the pin sets of the four
 * wiring rows are held by this file's literals alone (AC1 and the reached total): the named residual L2-CP below. A later
 * cut that adds a sanitizer call to the tagged wiring reds here until it adds the row that pins it. The walk follows one
 * call level, so a sanitizer call in a same-block function the wiring reaches only through another reads quiet: the named
 * residual S7 below. Every control or invisible code point is built with String.fromCodePoint, and every assignment value
 * is obviously fake.
 *
 * wb-h8f.14 (the wb-h8f.11 gate's PREP F1, F2 and F7, one follow-up): every executor records its pin after its last
 * assertion, and a census row reads that record once every pin case has run, so a pin body that returns after its
 * liveness reading reds (F1: reached == registered == 12). Each residual this file names is a named family plus a pinned
 * quiet row (rule 19's definition, which the owner's F7 ruling applies to every cut that claims a residual). A quiet row
 * reds when its family's page stops reading quiet, or stops carrying the family's edit. Each family's members are judged
 * against a reading outside this file's literals, so a residual removed from every literal here still reds: S7 against
 * the walk's blind spots in src, L2-CP against the rows whose pin removal the outside readings cannot see.
 *
 * wb-vgke (the wb-h8f.14 gate's PREP F1, owner R666 (2), one follow-up): each residual quiet row leaves two records, read
 * through vitest's expect state, never the test context - the name vitest registered it under, when its body starts,
 * and one reached record per member, written after the member's last assertion. The last describe judges both records,
 * and the RESIDUALS rows themselves, against the out-of-file roster test/fixtures/h8f6-survivor-pins-residual-roster.json
 * (each residual's id, kind, family, requirement and members, and the suite and title its quiet row is registered under).
 * So a quiet row dropped from the loop, renamed, or hollowed after its liveness reading reds there (the gate's
 * l2-disp-res-cp, l2-disp-res-s7 and l2-hb-s7q forms), and a residual removed from every literal of this file reds
 * against the roster as well as against src.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityError, type CapabilityProvider, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { inspectWorkflowSource } from "../src/workbench/designer.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText, stripUnsafeText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import { buildWorkflowCatalogReply } from "../src/workbench/tool-replies.js";
import { buildWorkflowValidateReply, VALIDATE_REPLY_GRANT } from "../src/workbench/validate-reply.js";
import { ctx, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = "src/index.ts";
const REDACTION = "src/workbench/redaction.ts";
const REGISTRY = "src/workbench/capability-registry.ts";
/** The tag src/index.ts carries in the leading comments of the h8f.6 wiring. */
const TAG = "wb-h8f.6";
const SANITIZERS: ReadonlySet<string> = new Set(["sanitizeWorkbenchText", "sanitizeWorkbenchJsonText"]);

const cp = (code: number): string => String.fromCodePoint(code);
const ESC = cp(0x1b);
const BEL = cp(0x07);
const LF = cp(0x0a);
const RLO = cp(0x202e);
const LRI = cp(0x2066);
const ZWSP = cp(0x200b);
/**
 * One timeout for every pin case, a same-file const literal the retry census (wb-nl8.4) can read: booted pins drive the real
 * extension once each, and tenant load has pushed a boot past vitest's 5 s default before.
 */
const BOOTED_TIMEOUT_MS = 30_000;
/**
 * One timeout for the residual rows that parse src/index.ts (4800+ lines) more than once, a same-file const literal the
 * retry census (wb-nl8.4) can read: each such row parses it up to five times, and tenant load slows every parse.
 */
const PARSE_TIMEOUT_MS = 60_000;

type OutsideField = "description" | "effectClass" | "supportedModes" | "contractSource";
interface ScriptPathPin {
  readonly id: string;
  readonly scriptPath: string;
}
interface MetaPin {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}
interface FilterPin {
  readonly id: string;
  readonly filter: string;
}
interface FieldPin {
  readonly id: string;
  readonly field: OutsideField;
  readonly junk: unknown;
}
interface Row {
  /** The h8f.6 gate battery's mutant id. */
  readonly mutant: string;
  /** The src obligation this row pins, spelled as obligationsOf() derives it. */
  readonly obligation: string;
  /** The gate battery's anchor (the exact text its mutant replaces, kept once in its file so the battery replays) and replacement. */
  readonly site: { readonly file: string; readonly text: string; readonly mutation: string };
  /** The requirement this row pins, quoted from the doc comment that states it. */
  readonly requirement: { readonly file: string; readonly quote: string };
}
type Survivor =
  | (Row & { readonly kind: "catch-sanitized" | "catch-layout"; readonly pins: readonly ScriptPathPin[] })
  | (Row & { readonly kind: "validate-settled"; readonly pins: readonly MetaPin[] })
  | (Row & { readonly kind: "catalog-settled"; readonly pins: readonly FilterPin[] })
  | (Row & { readonly kind: "outside-field-named"; readonly pins: readonly FieldPin[] });

const SURVIVORS: readonly Survivor[] = [
  {
    mutant: "G14",
    obligation: "workflow_validate sanitizeWorkbenchText",
    site: {
      file: INDEX,
      text: 'return textResult(sanitizeWorkbenchText(error instanceof Error ? error.message : String(error), WORKBENCH_TEXT_LIMIT, "text")); }',
      mutation: "return textResult(error instanceof Error ? error.message : String(error)); }",
    },
    requirement: { file: REDACTION, quote: "Untrusted text bound for display, the ONE helper every display path uses: normalize once, redact once, strip once." },
    kind: "catch-sanitized",
    pins: [
      { id: "csi-and-bell", scriptPath: `h8f11-gone${ESC}[31m${BEL}-csi.js` },
      { id: "bidi-and-zero-width", scriptPath: `h8f11-gone${RLO}x${LRI}y${ZWSP}z.js` },
    ],
  },
  {
    mutant: "G15",
    obligation: 'workflow_validate sanitizeWorkbenchText layout "text"',
    site: { file: INDEX, text: 'String(error), WORKBENCH_TEXT_LIMIT, "text")); }', mutation: 'String(error), WORKBENCH_TEXT_LIMIT, "label")); }' },
    requirement: { file: REDACTION, quote: '"text": model-facing text. Whitespace controls become one space; every other unsafe unit vanishes.' },
    kind: "catch-layout",
    pins: [
      { id: "visible-double-space", scriptPath: "h8f11-gone  two  spaces.js" },
      { id: "bell-between-words", scriptPath: `h8f11-gone${BEL}bell.js` },
    ],
  },
  {
    mutant: "G16",
    obligation: "workflowValidateToolText sanitizeWorkbenchJsonText",
    site: { file: INDEX, text: "const text = sanitizeWorkbenchJsonText(workflowValidateToolReply(", mutation: "const text = JSON.stringify(workflowValidateToolReply(" },
    requirement: {
      file: INDEX,
      quote: "Every string is the builder's, already through its per-field sanitizers, and the folded envelope passes sanitizeWorkbenchJsonText again.",
    },
    kind: "validate-settled",
    pins: [
      // The description's 200-unit bound keeps the key and cuts its redacted value: the builder leaves "password: ... [truncated]".
      { id: "description-key-left-at-bound", name: "h8f11", description: `password:${" ".repeat(190)}h8f11-obviously-fake` },
      // The name's 128-unit bound splits the marker after the redacted value: the builder leaves "[REDACTE [truncated]".
      { id: "name-marker-split-at-bound", name: `${"n".repeat(90)} password=h8f11-obviously-fake ${"m".repeat(40)}`, description: "h8f11" },
    ],
  },
  {
    mutant: "G20",
    obligation: "workbench_catalog sanitizeWorkbenchJsonText",
    site: { file: INDEX, text: "textResult(sanitizeWorkbenchJsonText(buildWorkflowCatalogReply(", mutation: "textResult(JSON.stringify(buildWorkflowCatalogReply(" },
    requirement: { file: REDACTION, quote: "Serialize a tool result for the model after sanitizing every string in it." },
    kind: "catalog-settled",
    pins: [
      // The filter echo's 64-unit bound keeps the key and cuts its redacted value.
      { id: "filter-key-left-at-bound", filter: `password:${" ".repeat(60)}h8f11-obviously-fake` },
      // The filter echo's 64-unit bound splits the marker after the redacted value.
      { id: "filter-marker-split-at-bound", filter: `${"x".repeat(30)} password=h8f11-obviously-fake ${"y".repeat(40)}` },
    ],
  },
  {
    mutant: "R9",
    obligation: "CapabilityRegistry.register interpolates descriptorFieldOutsideContract",
    // The src template's own text: the escaped placeholders keep "${" literal here.
    site: { file: REGISTRY, text: `\`Invalid \${outside} for capability \${descriptor.id}.\``, mutation: `\`Invalid descriptor for capability \${descriptor.id}.\`` },
    requirement: { file: REGISTRY, quote: "The first descriptor field outside its declared type, or undefined." },
    kind: "outside-field-named",
    pins: [
      { id: "description-number", field: "description", junk: 42 },
      { id: "effect-class-uppercase", field: "effectClass", junk: "READ" },
      { id: "modes-unknown-member", field: "supportedModes", junk: ["invoke", "execute"] },
      { id: "contract-source-number", field: "contractSource", junk: 5 },
    ],
  },
];

const read = (file: string): string => readFileSync(join(ROOT, file), "utf8");
const parse = (file: string, text: string): ts.SourceFile => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** A file's text with comment continuation markers and line breaks folded into single spaces, as a quote reads it. */
const flattened = (text: string): string => text.replace(/\n\s*(?:\*(?!\/)|\/\/)?/g, " ").replace(/\s+/g, " ");

/** Every node under `root`, root included, depth first. */
function nodesOf(root: ts.Node): ts.Node[] {
  const nodes: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    nodes.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return nodes;
}

/** The tool name of a `pi.registerTool(defineTool({ name: "<tool>", ... }))` statement, or undefined. */
function registeredToolName(statement: ts.Statement): string | undefined {
  if (!ts.isExpressionStatement(statement) || !ts.isCallExpression(statement.expression)) return undefined;
  const register = statement.expression;
  if (!ts.isPropertyAccessExpression(register.expression) || register.expression.name.text !== "registerTool") return undefined;
  const [defined] = register.arguments;
  if (!defined || !ts.isCallExpression(defined) || !ts.isIdentifier(defined.expression) || defined.expression.text !== "defineTool") return undefined;
  const [spec] = defined.arguments;
  if (!spec || !ts.isObjectLiteralExpression(spec)) return undefined;
  for (const property of spec.properties) {
    if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === "name" && ts.isStringLiteral(property.initializer)) {
      return property.initializer.text;
    }
  }
  return undefined;
}

const leadingComments = (source: ts.SourceFile, statement: ts.Statement): string =>
  (ts.getLeadingCommentRanges(source.text, statement.getFullStart()) ?? []).map(range => source.text.slice(range.pos, range.end)).join(LF);

interface Scope {
  readonly name: string;
  readonly node: ts.Node;
}
/**
 * The h8f.6 wiring as src/index.ts states it: every registerTool statement whose leading comment carries the tag, and
 * every function declared in the same block that one of those statements calls.
 */
function wiringScopes(text: string): Scope[] {
  const source = parse(INDEX, text);
  const scopes = new Map<string, Scope>();
  for (const block of nodesOf(source)) {
    if (!ts.isBlock(block) && !ts.isSourceFile(block)) continue;
    const tagged = block.statements.flatMap(statement => {
      const name = registeredToolName(statement);
      return name !== undefined && leadingComments(source, statement).includes(TAG) ? [{ name, node: statement }] : [];
    });
    const siblings = block.statements.flatMap(statement => (ts.isFunctionDeclaration(statement) && statement.name ? [{ name: statement.name.text, node: statement }] : []));
    for (const tool of tagged) {
      scopes.set(tool.name, tool);
      const called = new Set(nodesOf(tool.node).flatMap(node => (ts.isCallExpression(node) && ts.isIdentifier(node.expression) ? [node.expression.text] : [])));
      for (const sibling of siblings) if (called.has(sibling.name)) scopes.set(sibling.name, sibling);
    }
  }
  return [...scopes.values()];
}

/** One obligation per sanitizer call in the scopes, and one more per call that names its layout. */
function wiringObligations(scopes: readonly Scope[]): string[] {
  return scopes.flatMap(({ name, node }) =>
    nodesOf(node).flatMap(call => {
      if (!ts.isCallExpression(call) || !ts.isIdentifier(call.expression) || !SANITIZERS.has(call.expression.text)) return [];
      const site = `${name} ${call.expression.text}`;
      const layout = call.arguments[2];
      return layout && ts.isStringLiteral(layout) ? [site, `${site} layout ${JSON.stringify(layout.text)}`] : [site];
    }),
  );
}

/** register()'s interpolations of a binding a same-file function answered, and the field names descriptorFieldOutsideContract returns. */
function registryReading(text: string): { readonly obligations: string[]; readonly fields: string[] } {
  const source = parse(REGISTRY, text);
  const functions = new Map(source.statements.flatMap(statement => (ts.isFunctionDeclaration(statement) && statement.name ? [[statement.name.text, statement] as const] : [])));
  const register = nodesOf(source).find(
    (node): node is ts.MethodDeclaration =>
      ts.isMethodDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "register" && ts.isClassDeclaration(node.parent) && node.parent.name?.text === "CapabilityRegistry",
  );
  const obligations: string[] = [];
  if (register) {
    const answered = new Map<string, string>();
    for (const node of nodesOf(register)) {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isCallExpression(node.initializer) && ts.isIdentifier(node.initializer.expression) && functions.has(node.initializer.expression.text)) {
        answered.set(node.name.text, node.initializer.expression.text);
      }
    }
    for (const node of nodesOf(register)) {
      if (!ts.isTemplateExpression(node)) continue;
      for (const span of node.templateSpans) {
        const producer = ts.isIdentifier(span.expression) ? answered.get(span.expression.text) : undefined;
        if (producer !== undefined) obligations.push(`CapabilityRegistry.register interpolates ${producer}`);
      }
    }
  }
  const outside = functions.get("descriptorFieldOutsideContract");
  const fields = outside ? nodesOf(outside).flatMap(node => (ts.isReturnStatement(node) && node.expression && ts.isStringLiteral(node.expression) ? [node.expression.text] : [])) : [];
  return { obligations, fields };
}

/** The obligations the AST of one census file's text derives. */
function obligationsOf(file: string, text: string): string[] {
  if (file === INDEX) return wiringObligations(wiringScopes(text));
  if (file === REGISTRY) return registryReading(text).obligations;
  return [];
}

let sandbox: Hermetic | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
});

interface Booted {
  readonly dir: string;
  readonly call: (tool: string, params: Record<string, unknown>) => Promise<string>;
}
/** Boots the real extension in claude mode with workbench:design, the one grant the validate tool asks for. */
async function boot(): Promise<Booted> {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [VALIDATE_REPLY_GRANT] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return {
    dir: sandbox.dir,
    call: async (tool, params) => {
      const registered = pi.tools.get(tool);
      expect(registered, `${tool} must be registered`).toBeDefined();
      return textOf(await registered.execute("h8f11", params, undefined, undefined, context));
    },
  };
}

/** The probe's visible stretches between its unsafe units, as every layout keeps them. */
const visibleStretches = (probe: string): string[] =>
  stripUnsafeText(probe, LF)
    .split(LF)
    .map(part => part.trim())
    .filter(part => part !== "");

/**
 * The pins whose executor ran past its last assertion, in run order (wb-h8f.14 F1). A liveness reading alone satisfies
 * --expect.requireAssertions, so a pin body that returned right after it would pass; the census reads this record.
 */
const reachedPins: string[] = [];

async function catchSanitized({ id, scriptPath }: ScriptPathPin): Promise<void> {
  // Liveness: the probe carries an unsafe unit, so a catch that skipped the helper would hand it to the model.
  expect(stripUnsafeText(scriptPath)).not.toBe(scriptPath);
  const text = await (await boot()).call("workflow_validate", { scriptPath });
  expect(stripUnsafeText(text)).toBe(text);
  for (const stretch of visibleStretches(scriptPath)) expect(text).toContain(stretch);
  reachedPins.push(id);
}

async function catchLayout({ id, scriptPath }: ScriptPathPin): Promise<void> {
  const modelText = sanitizeWorkbenchText(scriptPath, WORKBENCH_TEXT_LIMIT, "text");
  const labelText = sanitizeWorkbenchText(scriptPath, WORKBENCH_TEXT_LIMIT, "label");
  // Liveness: the two layouts render the probe apart, and neither rendering contains the other.
  expect(modelText.includes(labelText) || labelText.includes(modelText)).toBe(false);
  const text = await (await boot()).call("workflow_validate", { scriptPath });
  expect(text).toContain(modelText);
  expect(text).not.toContain(labelText);
  reachedPins.push(id);
}

async function validateSettled({ id, name, description }: MetaPin): Promise<void> {
  const booted = await boot();
  const workflows = join(booted.dir, ".pi", "workflows");
  mkdirSync(workflows, { recursive: true });
  writeFileSync(join(workflows, "h8f11.js"), `export const meta={name:${JSON.stringify(name)},description:${JSON.stringify(description)}};\nreturn 1;`);
  // Liveness: the builder's own record for this source is not settled by the shared serializer, so an envelope that
  // skipped it would read differently.
  const source = inspectWorkflowSource({ name: "h8f11" }, booted.dir);
  const { reply: record } = buildWorkflowValidateReply({ request: { sourceRef: source.sourceRef, digest: source.definition.artifactDigest }, source, grants: [VALIDATE_REPLY_GRANT] });
  expect(sanitizeWorkbenchJsonText(record)).not.toBe(JSON.stringify(record));
  const text = await booted.call("workflow_validate", { name: "h8f11" });
  const reply = JSON.parse(text) as { readonly status?: unknown; readonly meta?: Record<string, unknown> };
  expect(reply.status).toBe("valid");
  expect(Object.keys(reply.meta ?? {}).sort()).toEqual(["description", "name"]);
  expect(sanitizeWorkbenchJsonText(JSON.parse(text))).toBe(text);
  reachedPins.push(id);
}

async function catalogSettled({ id, filter }: FilterPin): Promise<void> {
  // Liveness: the builder's own reply for this filter is not settled by the shared serializer.
  const built = buildWorkflowCatalogReply([], [], { filter });
  expect(sanitizeWorkbenchJsonText(built)).not.toBe(JSON.stringify(built));
  const text = await (await boot()).call("workbench_catalog", { filter });
  const reply = JSON.parse(text) as { readonly ok?: unknown; readonly filter?: unknown };
  expect(reply.ok).toBe(true);
  expect(typeof reply.filter).toBe("string");
  expect(sanitizeWorkbenchJsonText(JSON.parse(text))).toBe(text);
  reachedPins.push(id);
}

function provider(id: string): CapabilityProvider {
  return {
    descriptor: { id, version: "1.0.0", description: "wb-h8f.11 fixture", inputSchema: { type: "object" }, effectClass: "read", permissions: [], supportedModes: ["invoke", "inspect"] },
    invoke: async () => null,
    inspect: async () => null,
  };
}

function outsideFieldNamed({ id, field, junk }: FieldPin): void {
  // Liveness: the same fixture registers whole without the junk field, so the refusal is the field's alone.
  expect(() => new CapabilityRegistry().register(provider("fixture.h8f11"))).not.toThrow();
  const registry = new CapabilityRegistry();
  const fixture = provider("fixture.h8f11");
  Reflect.set(fixture.descriptor, field, junk);
  let refusal: unknown;
  try {
    registry.register(fixture);
  } catch (error) {
    refusal = error;
  }
  expect(refusal).toBeInstanceOf(CapabilityError);
  expect(refusal instanceof CapabilityError ? [refusal.category, refusal.message] : []).toEqual(["validation", `Invalid ${field} for capability fixture.h8f11.`]);
  expect(registry.catalogSnapshot()).toEqual([]);
  reachedPins.push(id);
}

/** Pin cases registered below, so the census can tell a dropped executor from a dropped row. */
let registeredPins = 0;
function pinCase(title: string, run: () => Promise<void> | void): void {
  registeredPins += 1;
  // The case body is a function literal: vitest also takes options in that place, and the retry census (wb-nl8.4) reads
  // it only when it can see which of the two it is.
  it(title, () => run(), BOOTED_TIMEOUT_MS);
}

describe("wb-h8f.11 survivor pins: every pin runs through the real extension or registry", () => {
  for (const row of SURVIVORS) {
    switch (row.kind) {
      case "catch-sanitized":
        for (const pin of row.pins) pinCase(`${row.mutant} ${pin.id}: the workflow_validate catch shows no unsafe unit and keeps the probe's visible text`, () => catchSanitized(pin));
        break;
      case "catch-layout":
        for (const pin of row.pins) pinCase(`${row.mutant} ${pin.id}: the workflow_validate catch renders the error with the "text" layout, never "label"`, () => catchLayout(pin));
        break;
      case "validate-settled":
        for (const pin of row.pins) pinCase(`${row.mutant} ${pin.id}: the workflow_validate reply is settled - the shared serializer changes nothing in it`, () => validateSettled(pin));
        break;
      case "catalog-settled":
        for (const pin of row.pins) pinCase(`${row.mutant} ${pin.id}: the workbench_catalog reply is settled - the shared serializer changes nothing in it`, () => catalogSettled(pin));
        break;
      case "outside-field-named":
        for (const pin of row.pins) pinCase(`${row.mutant} ${pin.id}: register() refuses ${pin.field} as a typed validation error naming the field`, () => outsideFieldNamed(pin));
        break;
    }
  }
});

describe("wb-h8f.11 survivor census: the frozen rows, judged against src", () => {
  it("AC1 frozen shape: the five carried survivors in battery order, each with its pin count", () => {
    expect(SURVIVORS.map(row => `${row.mutant}:${row.pins.length}`)).toEqual(["G14:2", "G15:2", "G16:2", "G20:2", "R9:4"]);
  });

  it("AC1b frozen requirements: every row's quoted requirement, verbatim", () => {
    expect(SURVIVORS.map(row => `${row.mutant} ${row.requirement.quote}`)).toEqual([
      "G14 Untrusted text bound for display, the ONE helper every display path uses: normalize once, redact once, strip once.",
      'G15 "text": model-facing text. Whitespace controls become one space; every other unsafe unit vanishes.',
      "G16 Every string is the builder's, already through its per-field sanitizers, and the folded envelope passes sanitizeWorkbenchJsonText again.",
      "G20 Serialize a tool result for the model after sanitizing every string in it.",
      "R9 The first descriptor field outside its declared type, or undefined.",
    ]);
  });

  it("every obligation src derives for the tagged wiring and register() has exactly one row, and no row pins one src lacks", () => {
    const derived = [...obligationsOf(INDEX, read(INDEX)), ...obligationsOf(REGISTRY, read(REGISTRY))].sort();
    expect(SURVIVORS.map(row => row.obligation).sort()).toEqual(derived);
  });

  it("the R9 pins name exactly the fields descriptorFieldOutsideContract returns, in its order", () => {
    const pinned = SURVIVORS.flatMap(row => (row.kind === "outside-field-named" ? row.pins.map(pin => pin.field) : []));
    expect(pinned).toEqual(registryReading(read(REGISTRY)).fields);
  });

  it("every row's battery anchor occurs exactly once in its file, so the gate's battery still applies", () => {
    for (const { mutant, site } of SURVIVORS) expect(read(site.file).split(site.text).length - 1, mutant).toBe(1);
  });

  it("every row's requirement is quoted verbatim from its file", () => {
    for (const { mutant, requirement } of SURVIVORS) expect(flattened(read(requirement.file)), mutant).toContain(requirement.quote);
  });

  it("liveness: each row's battery mutation, applied in memory, takes its obligation out of the AST reading", () => {
    for (const { mutant, obligation, site } of SURVIVORS) {
      const text = read(site.file);
      expect(obligationsOf(site.file, text), mutant).toContain(obligation);
      expect(obligationsOf(site.file, text.split(site.text).join(site.mutation)), mutant).not.toContain(obligation);
    }
  });

  it("every pin of every row is registered as its own case", () => {
    expect(registeredPins).toBe(SURVIVORS.reduce((total, row) => total + row.pins.length, 0));
  });

  // vitest runs this file's cases one after another in the order they are registered, so every pin case has run here.
  it("assertion-reached (wb-h8f.14 F1): every registered pin ran past its executor's last assertion - reached == registered == 12, in run order", () => {
    expect(reachedPins).toEqual(SURVIVORS.flatMap(row => row.pins.map(pin => pin.id)));
    expect(reachedPins.length).toBe(registeredPins);
    expect(reachedPins.length).toBe(12);
  });
});

// ---- wb-h8f.14: the residuals this file names, each a named family plus a pinned quiet row ----

/** Which reading outside this file's literals judges a residual's members. */
type ResidualKind = "one-level-walk" | "coordinated-pin-removal";
interface Residual {
  /** The wb-h8f.11 gate probe that measured the family. */
  readonly id: string;
  readonly kind: ResidualKind;
  /** The family of edits this census reads quiet, named. */
  readonly family: string;
  /** What the family's quiet row pins. */
  readonly requirement: string;
  /** The family's members: functions src/index.ts declares (one-level-walk) or SURVIVORS rows (coordinated-pin-removal). */
  readonly members: readonly string[];
}

const RESIDUALS: readonly Residual[] = [
  {
    id: "S7",
    kind: "one-level-walk",
    family: "a sanitizer call in a same-block function the tagged wiring reaches only through another same-block function",
    requirement: "a sanitizeWorkbenchText call added at the head of each member's body leaves every obligation src derives unchanged",
    members: ["workflowValidateToolReply"],
  },
  {
    id: "L2-CP",
    kind: "coordinated-pin-removal",
    family: "a wiring row's pin removed together with its count in AC1 and the reached total",
    requirement: "removing one member's last pin changes no reading anchored outside this file's literals, while the same removal on the R9 row changes its fields reading",
    members: ["G14", "G15", "G16", "G20"],
  },
];

/** The names every call under `node` calls by identifier. */
const calledNames = (node: ts.Node): Set<string> =>
  new Set(nodesOf(node).flatMap(call => (ts.isCallExpression(call) && ts.isIdentifier(call.expression) ? [call.expression.text] : [])));

/**
 * The walk's blind spots in src/index.ts text: every same-block function the tagged registerTool statements reach
 * through same-block calls at any depth that wiringScopes() leaves out, in declaration order.
 */
function blindSpots(text: string): string[] {
  const source = parse(INDEX, text);
  const walked = new Set(wiringScopes(text).map(scope => scope.name));
  const blind: string[] = [];
  for (const block of nodesOf(source)) {
    if (!ts.isBlock(block) && !ts.isSourceFile(block)) continue;
    const siblings = new Map(block.statements.flatMap(statement => (ts.isFunctionDeclaration(statement) && statement.name ? [[statement.name.text, statement] as const] : [])));
    const frontier: ts.Node[] = block.statements.filter(statement => registeredToolName(statement) !== undefined && leadingComments(source, statement).includes(TAG));
    const reached = new Set<string>();
    for (let node = frontier.pop(); node !== undefined; node = frontier.pop()) {
      for (const name of calledNames(node)) {
        const sibling = siblings.get(name);
        if (sibling === undefined || reached.has(name)) continue;
        reached.add(name);
        frontier.push(sibling);
      }
    }
    for (const name of siblings.keys()) if (reached.has(name) && !walked.has(name)) blind.push(name);
  }
  return blind;
}

/** The function `name` declares in src/index.ts text, or undefined. */
const declarationOf = (text: string, name: string): ts.FunctionDeclaration | undefined =>
  nodesOf(parse(INDEX, text)).find((node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === name);

/** How many sanitizer calls the function `name` declares, or -1 when src/index.ts text declares no such function. */
function sanitizerCallsIn(text: string, name: string): number {
  const declaration = declarationOf(text, name);
  if (declaration === undefined) return -1;
  return nodesOf(declaration).filter(node => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && SANITIZERS.has(node.expression.text)).length;
}

/** src/index.ts text with one sanitizer call added at the head of the body of the function `name` declares: S7's edit class. */
function withSanitizerAtHead(text: string, name: string): string {
  const body = declarationOf(text, name)?.body;
  if (body === undefined) return text;
  const at = body.getStart() + 1;
  return `${text.slice(0, at)} sanitizeWorkbenchText("h8f14-probe", WORKBENCH_TEXT_LIMIT, "text");${text.slice(at)}`;
}

const obligationMemo = new Map<string, readonly string[]>();
/** obligationsOf(), once per distinct file text: the residual rows read the same src texts many times. */
function obligationsOnce(file: string, text: string): readonly string[] {
  const key = `${file}${LF}${text}`;
  const known = obligationMemo.get(key);
  if (known !== undefined) return known;
  const reading = obligationsOf(file, text);
  obligationMemo.set(key, reading);
  return reading;
}

/**
 * The readings this file anchors outside its own literals, applied to a survivor table: the name of each reading the
 * table fails, so a table that holds every one reads []. The census rows above apply the same readings to SURVIVORS;
 * this lets a residual's quiet row apply them to a hollowed table.
 */
function outsideReadings(rows: readonly Survivor[]): string[] {
  const derived = [...obligationsOnce(INDEX, read(INDEX)), ...obligationsOnce(REGISTRY, read(REGISTRY))].sort();
  const fields = rows.flatMap(row => (row.kind === "outside-field-named" ? row.pins.map(pin => pin.field) : []));
  const live = ({ obligation, site }: Survivor): boolean => {
    const text = read(site.file);
    return obligationsOnce(site.file, text).includes(obligation) && !obligationsOnce(site.file, text.split(site.text).join(site.mutation)).includes(obligation);
  };
  const readings: readonly (readonly [string, boolean])[] = [
    ["obligations", isDeepStrictEqual(rows.map(row => row.obligation).sort(), derived)],
    ["R9 fields", isDeepStrictEqual(fields, registryReading(read(REGISTRY)).fields)],
    ["anchors", rows.every(({ site }) => read(site.file).split(site.text).length - 1 === 1)],
    ["quotes", rows.every(({ requirement }) => flattened(read(requirement.file)).includes(requirement.quote))],
    ["liveness", rows.every(live)],
  ];
  return readings.flatMap(([name, holds]) => (holds ? [] : [name]));
}

/** One row without its last pin, its kind kept. */
function lastPinDropped(row: Survivor): Survivor {
  switch (row.kind) {
    case "catch-sanitized":
    case "catch-layout":
      return { ...row, pins: row.pins.slice(0, -1) };
    case "validate-settled":
      return { ...row, pins: row.pins.slice(0, -1) };
    case "catalog-settled":
      return { ...row, pins: row.pins.slice(0, -1) };
    case "outside-field-named":
      return { ...row, pins: row.pins.slice(0, -1) };
  }
}

/** The table with one row's last pin removed: the page a coordinated pin removal leaves once every literal that counts pins agrees. */
const withoutLastPin = (rows: readonly Survivor[], mutant: string): Survivor[] => rows.map(row => (row.mutant === mutant ? lastPinDropped(row) : row));

/**
 * The outside readings that removing one row's last pin changes, judged against the frozen table's own readings, so a
 * src drift elsewhere (which moves both alike) never reads as the removal: [] when the removal is invisible to them.
 */
function changedByRemoval(mutant: string): string[] {
  const frozen = outsideReadings(SURVIVORS);
  const hollowed = outsideReadings(withoutLastPin(SURVIVORS, mutant));
  return [...hollowed.filter(name => !frozen.includes(name)), ...frozen.filter(name => !hollowed.includes(name))];
}

/**
 * The records the residual quiet rows leave (wb-vgke, R666 F1), judged against the out-of-file roster by the last describe:
 * quietStarted holds the name each quiet row ran under, written when its body starts; quietReached holds one entry per
 * member, written after the member's last assertion, so a quiet row that returns or skips after its liveness reading
 * leaves its member unreached.
 */
const quietStarted: string[] = [];
const quietReached: string[] = [];
/** The running case's registered name (its describe chain and title), read through the expect state, never the test context. */
const runningCase = (): string => expect.getState().currentTestName ?? "<no running case>";

function quietRow(residual: Residual): void {
  quietStarted.push(runningCase());
  switch (residual.kind) {
    case "one-level-walk": {
      const text = read(INDEX);
      const before = obligationsOnce(INDEX, text);
      for (const member of residual.members) {
        const page = withSanitizerAtHead(text, member);
        // Liveness: the page carries the family's edit, one more sanitizer call inside the member, so a walk that
        // followed the member would derive an obligation from it.
        expect(sanitizerCallsIn(page, member), member).toBe(sanitizerCallsIn(text, member) + 1);
        expect(obligationsOf(INDEX, page), member).toEqual(before);
        quietReached.push(`${runningCase()} | one-level-walk | ${member}`);
      }
      break;
    }
    case "coordinated-pin-removal":
      // A member's removal changes no outside reading; the same removal on the R9 row (the analog) changes its fields reading.
      for (const row of SURVIVORS) expect(changedByRemoval(row.mutant), row.mutant).toEqual(residual.members.includes(row.mutant) ? [] : ["R9 fields"]);
      for (const member of residual.members) quietReached.push(`${runningCase()} | coordinated-pin-removal | ${member}`);
      break;
  }
}

describe("wb-h8f.14 named residuals: each a named family plus a pinned quiet row, its members judged outside this file's literals", () => {
  it("S-SHAPE frozen residuals: each residual's id, kind, family, requirement and members, verbatim", () => {
    expect(RESIDUALS.map(residual => [residual.id, residual.kind, residual.family, residual.requirement, residual.members.join(" ")])).toEqual([
      [
        "S7",
        "one-level-walk",
        "a sanitizer call in a same-block function the tagged wiring reaches only through another same-block function",
        "a sanitizeWorkbenchText call added at the head of each member's body leaves every obligation src derives unchanged",
        "workflowValidateToolReply",
      ],
      [
        "L2-CP",
        "coordinated-pin-removal",
        "a wiring row's pin removed together with its count in AC1 and the reached total",
        "removing one member's last pin changes no reading anchored outside this file's literals, while the same removal on the R9 row changes its fields reading",
        "G14 G15 G16 G20",
      ],
    ]);
  });

  it("the outside readings hold for the frozen table, as the census rows above read it", () => {
    expect(outsideReadings(SURVIVORS)).toEqual([]);
  }, PARSE_TIMEOUT_MS);

  for (const residual of RESIDUALS) it(`${residual.id} quiet row (${residual.family}): ${residual.requirement}`, () => quietRow(residual), PARSE_TIMEOUT_MS);

  it("the one-level-walk members are exactly the walk's blind spots src derives", () => {
    expect(RESIDUALS.filter(residual => residual.kind === "one-level-walk").flatMap(residual => residual.members)).toEqual(blindSpots(read(INDEX)));
  }, PARSE_TIMEOUT_MS);

  it("the coordinated-pin-removal members are exactly the rows whose last-pin removal changes no outside reading", () => {
    const invisible = SURVIVORS.filter(row => changedByRemoval(row.mutant).length === 0).map(row => row.mutant);
    expect(RESIDUALS.filter(residual => residual.kind === "coordinated-pin-removal").flatMap(residual => residual.members)).toEqual(invisible);
  }, PARSE_TIMEOUT_MS);
});

// ---- wb-vgke: the residual quiet rows' registration and reached records, judged against an out-of-file roster ----

/** The out-of-file roster of the named residual quiet rows (R666 F1): one row per residual, in RESIDUALS order. */
const ROSTER = "test/fixtures/h8f6-survivor-pins-residual-roster.json";
interface RosterRow extends Residual {
  /** The describe vitest registers the residual's quiet row under. */
  readonly suite: string;
  /** The title vitest registers the residual's quiet row under. */
  readonly test: string;
}
const rosterRows = (): readonly RosterRow[] => (JSON.parse(read(ROSTER)) as { readonly residuals: readonly RosterRow[] }).residuals;
/** One residual's identity, for an in-file RESIDUALS row and a roster row alike. */
const residualLine = ({ id, kind, family, requirement, members }: Residual): string => [id, kind, family, requirement, members.join(" ")].join(" | ");

// vitest runs this file's cases one after another in the order they are registered, so every quiet row has run here.
describe("wb-vgke residual quiet-row records: each quiet row registered and reached, judged against the out-of-file roster", () => {
  it("R-ROSTER: the in-file RESIDUALS rows equal the out-of-file roster's rows exactly, in order, both ways", () => {
    expect(RESIDUALS.map(residualLine)).toEqual(rosterRows().map(residualLine));
  });

  it("R-SHAPE frozen roster (rule 16): the roster's residuals by id and member count, as read at the cut base", () => {
    expect(rosterRows().map(row => `${row.id}:${row.members.length}`)).toEqual(["S7:1", "L2-CP:4"]);
  });

  it("R-REGISTERED (wb-vgke (a)): every roster residual's quiet row ran under the suite and title the roster registers for it, once each, in roster order", () => {
    expect(quietStarted).toEqual(rosterRows().map(row => `${row.suite} > ${row.test}`));
  });

  it("R-REACHED (wb-vgke (b)): every roster member's quiet-row judgement ran past its last assertion, under its residual's registered name and kind, in run order", () => {
    expect(quietReached).toEqual(rosterRows().flatMap(row => row.members.map(member => `${row.suite} > ${row.test} | ${row.kind} | ${member}`)));
  });
});
