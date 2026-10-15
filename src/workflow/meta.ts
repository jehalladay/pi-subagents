/**
 * Read workflow metadata without executing any part of the source. TypeScript's
 * JavaScript AST identifies the real exported declaration (not comment/string
 * decoys); only pure literal syntax is decoded. The script still runs in its
 * worker realm, with the actual export keyword replaced by equal-length spaces.
 */
import { Script } from "node:vm";
import ts from "typescript";
import { sanitizeWorkbenchText } from "../workbench/redaction.js";

/** A phase declared up front, so the UI can show it before any agent runs. */
export interface WorkflowPhaseMeta {
  title: string;
  detail?: string;
  /** Set when a phase pins a model; display-only, the runtime does not read it. */
  model?: string;
}

export interface WorkflowMeta {
  name: string;
  description: string;
  /** Shown in the saved-workflow listing. Not used by the runtime. */
  whenToUse?: string;
  phases?: WorkflowPhaseMeta[];
}

export interface MetaExtraction {
  meta: WorkflowMeta;
  /**
   * The script with the leading `export ` stripped, so `const meta = {...}`
   * compiles inside the vm. Byte offsets after the keyword are untouched, which
   * keeps stack-trace line numbers aligned with what the author wrote.
   */
  body: string;
}

export class WorkflowMetaError extends Error {}

const PURE_LITERAL_HINT =
  "The `meta` object must be a PURE LITERAL — no variables, function calls, spreads, or template interpolation.";
const MAX_META_SOURCE_LENGTH = 524_288;
export type WorkflowLiteral = null | boolean | number | string | WorkflowLiteral[] | { [key: string]: WorkflowLiteral };

/** Shared static literal decoder: never invokes getters, calls or computed keys. */
export function decodeWorkflowLiteral(node: ts.Node, depth = 0): WorkflowLiteral {
  if (depth > 64) fail(`Literal exceeds maximum nesting depth 64.\n${PURE_LITERAL_HINT}`);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) { const value = Number(node.text); if (Number.isFinite(value)) return value; }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
    const value = -Number(node.operand.text); if (Number.isFinite(value)) return value;
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(item => decodeWorkflowLiteral(item, depth + 1));
  if (ts.isObjectLiteralExpression(node)) {
    const result: { [key: string]: WorkflowLiteral } = Object.create(null);
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop) || !(ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) || ts.isNumericLiteral(prop.name))) fail(PURE_LITERAL_HINT);
      const key = prop.name.text;
      if (["__proto__", "constructor", "prototype"].includes(key) || Object.hasOwn(result,key)) fail(`Duplicate or prototype property is forbidden.\n${PURE_LITERAL_HINT}`);
      result[key] = decodeWorkflowLiteral(prop.initializer, depth + 1);
    }
    return result;
  }
  fail(PURE_LITERAL_HINT);
}
function declarations(ast: ts.SourceFile): {statement:ts.VariableStatement;declaration:ts.VariableDeclaration}[] {
  return ast.statements.filter(ts.isVariableStatement).flatMap(statement => statement.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword) && (statement.declarationList.flags & ts.NodeFlags.Const)
    ? statement.declarationList.declarations.filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === "meta").map(declaration => ({statement,declaration})) : []);
}

/** Listing checks actual AST declarations, without requiring valid metadata yet. */
export function hasMetaDeclaration(source: string): boolean {
  if (source.length > MAX_META_SOURCE_LENGTH) return false;
  return declarations(ts.createSourceFile("workflow.js",source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS)).length > 0;
}

function fail(message: string): never {
  throw new WorkflowMetaError(message);
}

function assertPhases(value: unknown): WorkflowPhaseMeta[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) fail("`meta.phases` must be an array of { title, detail?, model? } objects.");
  return value.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      fail(`\`meta.phases[${index}]\` must be an object with a \`title\`.`);
    }
    const { title, detail, model } = entry as Record<string, unknown>;
    if (typeof title !== "string" || title.trim() === "") {
      fail(`\`meta.phases[${index}].title\` must be a non-empty string.`);
    }
    if (detail !== undefined && typeof detail !== "string") {
      fail(`\`meta.phases[${index}].detail\` must be a string.`);
    }
    if (model !== undefined && typeof model !== "string") {
      fail(`\`meta.phases[${index}].model\` must be a string.`);
    }
    return { title, ...(detail !== undefined ? { detail } : {}), ...(model !== undefined ? { model } : {}) };
  });
}

/**
 * Pull `meta` off the front of a workflow script and hand back the runnable body.
 *
 * Throws {@link WorkflowMetaError} with author-facing guidance for every
 * rejection — these messages are shown verbatim to whoever wrote the script.
 */
export function extractMeta(source: string): MetaExtraction {
  if (source.length > MAX_META_SOURCE_LENGTH) fail(`Workflow source exceeds metadata source limit ${MAX_META_SOURCE_LENGTH}.`);
  const ast = ts.createSourceFile("workflow.js",source,ts.ScriptTarget.ESNext,true,ts.ScriptKind.JS);
  const declared = declarations(ast);
  if (declared.length === 0) fail(`A workflow script must begin with \`export const meta = { name, description }\`.\n${PURE_LITERAL_HINT}`);
  if (declared.length !== 1) fail("Exactly one export const meta declaration is required.");
  const {statement,declaration} = declared[0];
  const initializer = declaration.initializer;
  if (!initializer || !ts.isObjectLiteralExpression(initializer)) fail(`\`export const meta\` must be assigned an object literal.\n${PURE_LITERAL_HINT}`);
  if (source[initializer.end-1] !== "}") fail("`meta` object literal is never closed — check for an unbalanced `{`.");
  // Parsing just the literal catches malformed syntax that a tolerant SourceFile
  // AST might recover from. Compiling does not evaluate the expression or body.
  try { new Script(`(${initializer.getText(ast)})`, {filename:"workflow-meta.js"}); }
  catch { fail(`Metadata literal contains invalid syntax.\n${PURE_LITERAL_HINT}`); }
  const value = decodeWorkflowLiteral(initializer);

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail("`meta` must be an object literal.\n" + PURE_LITERAL_HINT);
  }
  const raw = value as Record<string, unknown>;

  if (typeof raw.name !== "string" || raw.name.trim() === "") {
    fail("`meta.name` is required and must be a non-empty string.");
  }
  if (typeof raw.description !== "string" || raw.description.trim() === "") {
    fail("`meta.description` is required and must be a non-empty string.");
  }
  if (raw.whenToUse !== undefined && typeof raw.whenToUse !== "string") {
    fail("`meta.whenToUse` must be a string.");
  }
  const phases = assertPhases(raw.phases);

  const meta: WorkflowMeta = {
    name: raw.name,
    description: raw.description,
    ...(raw.whenToUse !== undefined ? { whenToUse: raw.whenToUse as string } : {}),
    ...(phases !== undefined ? { phases } : {}),
  };

  // Strip only the `export ` keyword. Replacing it with spaces rather than
  // deleting it keeps every subsequent offset — and therefore every reported
  // line and column — identical to the source the author wrote.
  const exportToken = statement.modifiers?.find(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
  if (!exportToken) fail("Metadata export token is missing.");
  const exportAt = exportToken.getStart(ast);
  const body = `${source.slice(0, exportAt)}${" ".repeat(6)}${source.slice(exportAt + 6)}`;

  return { meta, body };
}

/**
 * `meta.name` for a call line, without re-parsing on every frame.
 *
 * `renderCall` runs on every repaint, and extraction parses a literal AST — cheap, but not free at that cadence. Keyed by the exact source, so an
 * edit-and-rerun cycle re-reads it and a hit is always the answer a fresh parse
 * would give.
 */
const workflowNames = new Map<string, string>();

/**
 * The label a `SubagentWorkflow` call renders under, from whichever field it carries.
 *
 * Every candidate is untrusted terminal text: `meta.name` is author source, and
 * the path or saved name is a model argument. Escapes, control and bidi marks
 * are stripped before the label can reach a call line.
 */
export function workflowCallName(args: { script?: string; scriptPath?: string; name?: string }): string {
  const source = args.script;
  if (source === undefined || source === "") {
    // A path-only call would need a synchronous file read per repaint to do
    // better than this, and the file name is what the author will recognize.
    if (args.scriptPath !== undefined) return sanitizeWorkbenchText(args.scriptPath.split(/[/\\]/).pop() ?? "workflow") || "workflow";
    // A saved workflow is already named by the caller; no read needed at all.
    return args.name !== undefined && args.name !== "" ? sanitizeWorkbenchText(args.name) || "workflow" : "workflow";
  }
  const cached = workflowNames.get(source);
  if (cached !== undefined) return cached;
  let name = "workflow";
  try {
    name = sanitizeWorkbenchText(extractMeta(source).meta.name) || "workflow";
  } catch {
    // An invalid script still gets a call line; `execute` reports why.
  }
  workflowNames.set(source, name);
  return name;
}
