/**
 * wb-o4h0.3 (RF-FEDERATED-WORKSPACES-R4): the pure readers and judged tables behind
 * test/workbench-rf-workspace-family-census.test.ts and the rf-preview tier's live registry row. The bead statement: "Pi shall
 * treat the proposed rf workspace link|links|inspect|exports|read|subscribe|unlink|invoke family as unregistered until the rf
 * registry serves it (gated FW-04b-1/FW-04b-2, open) - branching on the exit-2 pending/unknown-leaf refusal, never synthesizing
 * a federation envelope - and once any leaf serves, shall run rf workspace subscribe only as a supervised foreground process,
 * never requiring or spawning a resident daemon for a local snapshot read" (ReactiveFiberCLI
 * docs/programs/federated-workspaces-2026-10-18/04-cli-api.md:3@6a251bf73af5).
 *
 * Four readers, each pure over the text it is handed:
 *  - judgeFamilyLeaves (acceptance (a)): an `rf --json --version` stdout reads absent, re-triage or unreadable from the
 *    result.leaves path/served rows only; capabilities.leaves is never read.
 *  - scanFamilySource (acceptance (b)): a module's argv arrays and call argument lists holding "workspace" then a family leaf,
 *    and its string and template literals spelling `workspace <leaf>` or `workspace.<leaf>`.
 *  - scanRfLaunches (acceptance (c)/(d) posture): a module's launches of the rf binary, and which of them set detached: true or
 *    have their child unref'd.
 *  - scanEnvelopeModule / scanEnvelopeJson (acceptance (b)): the objects in a fixture that fabricate a family success envelope.
 *
 * The judged tables (LEAVES, SOURCES, LAUNCHES, ENVELOPES) are the census's rows. ROWS digests each case as written, and
 * test/fixtures/rf-workspace-family-roster.json is the out-of-file anchor ROWS is judged against (the hk9l/5jha/1xvp.4 roster
 * pattern). The residual families are named in RESIDUAL_FAMILIES, each with a pinned quiet row.
 *
 * Display paths added: none. This module is test-only.
 */
import { createHash } from "node:crypto";
import ts from "typescript";

/** The proposed leaf family, verbatim and in order from the bead statement. */
export const RF_WORKSPACE_FAMILY = ["link", "links", "inspect", "exports", "read", "subscribe", "unlink", "invoke"] as const;
const FAMILY = new Set<string>(RF_WORKSPACE_FAMILY);
/** A registry path or an envelope command in the family: the bare word workspace, or workspace then a dot or whitespace; any case. */
const FAMILY_PATH = /^workspace(?:[.\s]|$)/i;
/** A literal naming a leaf: the word workspace, then dots or whitespace, then one of the eight leaves as a whole word; any case. */
const FAMILY_LITERAL = new RegExp(`\\bworkspace[\\s.]+(?:${RF_WORKSPACE_FAMILY.join("|")})\\b`, "i");
const RF_SCHEMA = "reactive-fiber.cli/v1";

/** True when text spells a family leaf the way a literal would (`workspace <leaf>` or `workspace.<leaf>`, any case). */
export function spellsFamily(text: string): boolean {
  return FAMILY_LITERAL.test(text);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export type FamilyVerdict = "absent" | "re-triage" | "unreadable";

export interface FamilyLeaves {
  readonly verdict: FamilyVerdict;
  /** Rows in result.leaves (0 when unreadable). */
  readonly leaves: number;
  /** Family paths whose row states served: true. */
  readonly served: readonly string[];
  /** Family paths whose row states served: false (listed by the registry, not served). */
  readonly planned: readonly string[];
  readonly reason: string;
}

const unreadable = (reason: string): FamilyLeaves => ({ verdict: "unreadable", leaves: 0, served: [], planned: [], reason });

/**
 * Acceptance (a). Fails closed: anything but rf's version envelope (schema reactive-fiber.cli/v1, command version, ok true)
 * carrying a non-empty result.leaves of {path: string, served: boolean} rows reads unreadable, never absent.
 */
export function judgeFamilyLeaves(stdout: string): FamilyLeaves {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    return unreadable("stdout is not JSON");
  }
  if (!isRecord(parsed)) return unreadable("stdout is not a JSON object");
  if (parsed.schema !== RF_SCHEMA) return unreadable(`schema is not ${RF_SCHEMA}`);
  if (parsed.command !== "version") return unreadable("command is not version");
  if (parsed.ok !== true) return unreadable("ok is not true");
  const result = parsed.result;
  if (!isRecord(result)) return unreadable("result is not an object");
  const rows: unknown = result.leaves;
  if (!Array.isArray(rows)) return unreadable("result.leaves is not an array");
  const list: readonly unknown[] = rows;
  if (list.length === 0) return unreadable("result.leaves is empty");
  const served: string[] = [];
  const planned: string[] = [];
  for (const [index, row] of list.entries()) {
    if (!isRecord(row) || typeof row.path !== "string" || typeof row.served !== "boolean") return unreadable(`result.leaves[${index}] is not a path/served row`);
    if (!FAMILY_PATH.test(row.path)) continue;
    if (row.served) served.push(row.path);
    else planned.push(row.path);
  }
  if (served.length > 0) return { verdict: "re-triage", leaves: list.length, served, planned, reason: `the rf registry serves ${served.join(", ")}: re-triage wb-o4h0.3` };
  return { verdict: "absent", leaves: list.length, served, planned, reason: "the rf registry serves no workspace leaf" };
}

function scriptKind(fileName: string): ts.ScriptKind {
  return /\.[cm]?js$/.test(fileName) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}

function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKind(fileName));
}

function at(source: ts.SourceFile, node: ts.Node): string {
  return `${source.fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
}

export interface FamilySourceScan {
  /** An array literal or call argument list holding the string "workspace" immediately followed by a family leaf string. */
  readonly argv: readonly string[];
  /** A string literal, or a template literal read with each substitution as one space, that spells a family leaf. */
  readonly literals: readonly string[];
  /** Array literals holding "context" immediately followed by "render" (the live floor: the rf preview's own argv). */
  readonly renderArgv: readonly string[];
}

/** Acceptance (b): a module's spellings of the family. Comments are not literals and are never read. */
export function scanFamilySource(fileName: string, text: string): FamilySourceScan {
  const source = parse(fileName, text);
  const argv: string[] = [];
  const literals: string[] = [];
  const renderArgv: string[] = [];
  const visit = (node: ts.Node): void => {
    const list = ts.isArrayLiteralExpression(node) ? node.elements : ts.isCallExpression(node) ? node.arguments : undefined;
    if (list !== undefined) {
      const strings = list.map(element => (ts.isStringLiteralLike(element) ? element.text : undefined));
      for (const [index, text] of strings.entries()) {
        const next = strings[index + 1];
        if (text === "workspace" && next !== undefined && FAMILY.has(next)) argv.push(`${at(source, node)} workspace ${next}`);
        if (ts.isArrayLiteralExpression(node) && text === "context" && next === "render") renderArgv.push(at(source, node));
      }
    }
    if (ts.isStringLiteralLike(node) && FAMILY_LITERAL.test(node.text)) literals.push(`${at(source, node)} ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const joined = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (FAMILY_LITERAL.test(joined)) literals.push(`${at(source, node)} ${joined}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { argv, literals, renderArgv };
}

/** child_process launchers, called bare (spawn(...)) or as a member (child_process.spawn(...)). */
const LAUNCHERS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
/**
 * The rf binary as a launch's first argument: rf, optionally after a path ending in / or \\ and optionally as rf.exe or rf.cmd,
 * any case, alone or followed by whitespace (the exec command-line form).
 */
const RF_BINARY = /^(?:\S*[\\/])?rf(?:\.(?:exe|cmd))?(?:\s|$)/i;

/** Strips parentheses and type-only wrappers (as, satisfies, !, <T>) from an expression. */
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}

function propertyName(name: ts.PropertyName): string | undefined {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined;
}

function isRfLaunch(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression;
  const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : undefined;
  const first = node.arguments[0];
  return name !== undefined && LAUNCHERS.has(name) && first !== undefined && ts.isStringLiteralLike(first) && RF_BINARY.test(first.text);
}

function setsDetached(call: ts.CallExpression): boolean {
  return call.arguments.slice(1).some(argument => {
    const options = unwrap(argument);
    return ts.isObjectLiteralExpression(options) && options.properties.some(property => ts.isPropertyAssignment(property) && propertyName(property.name) === "detached" && unwrap(property.initializer).kind === ts.SyntaxKind.TrueKeyword);
  });
}

export interface RfLaunchScan {
  /** Every call launching the rf binary. */
  readonly launches: readonly string[];
  /** Launches whose options object literal sets detached: true. */
  readonly detached: readonly string[];
  /** unref() called on an rf launch, or on a name a declaration or assignment in the module binds to one. */
  readonly unref: readonly string[];
}

/** Acceptance (c)/(d) posture: a foreground rf child is never detached and never unref'd. */
export function scanRfLaunches(fileName: string, text: string): RfLaunchScan {
  const source = parse(fileName, text);
  const bound = new Set<string>();
  const bind = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && isRfLaunch(unwrap(node.initializer))) bound.add(node.name.text);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(node.left) && isRfLaunch(unwrap(node.right))) bound.add(node.left.text);
    ts.forEachChild(node, bind);
  };
  bind(source);
  const launches: string[] = [];
  const detached: string[] = [];
  const unref: string[] = [];
  const visit = (node: ts.Node): void => {
    if (isRfLaunch(node)) {
      launches.push(at(source, node));
      if (setsDetached(node)) detached.push(at(source, node));
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "unref") {
      const receiver = unwrap(node.expression.expression);
      if (isRfLaunch(receiver) || (ts.isIdentifier(receiver) && bound.has(receiver.text))) unref.push(at(source, node));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { launches, detached, unref };
}

export interface EnvelopeScan {
  /** Objects whose ok is the literal true and whose command is a family command: the fabricated federation success envelopes. */
  readonly family: readonly string[];
  /** Every object whose ok is the literal true and whose command has static text, as `<location> <command>` (the walk's floor). */
  readonly successes: readonly string[];
}

/** A command's static text: a string or no-substitution template literal, or a template's head (its leading static text). */
function staticText(node: ts.Expression): string | undefined {
  const value = unwrap(node);
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isTemplateExpression(value)) return value.head.text;
  return undefined;
}

/** Acceptance (b): object literals in a TypeScript or JavaScript fixture module. */
export function scanEnvelopeModule(fileName: string, text: string): EnvelopeScan {
  const source = parse(fileName, text);
  const family: string[] = [];
  const successes: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node)) {
      let command: string | undefined;
      let ok = false;
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name = propertyName(property.name);
        if (name === "command") command = staticText(property.initializer);
        if (name === "ok") ok = unwrap(property.initializer).kind === ts.SyntaxKind.TrueKeyword;
      }
      if (ok && command !== undefined) {
        successes.push(`${at(source, node)} ${command}`);
        if (FAMILY_PATH.test(command)) family.push(at(source, node));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { family, successes };
}

/** Acceptance (b): every object at any depth of a JSON fixture. A fixture that does not parse throws (the walk fails closed). */
export function scanEnvelopeJson(fileName: string, text: string): EnvelopeScan {
  const family: string[] = [];
  const successes: string[] = [];
  const walk = (value: unknown, pointer: string): void => {
    if (Array.isArray(value)) {
      const items: readonly unknown[] = value;
      for (const [index, item] of items.entries()) walk(item, `${pointer}/${index}`);
      return;
    }
    if (!isRecord(value)) return;
    if (value.ok === true && typeof value.command === "string") {
      successes.push(`${fileName}#${pointer} ${value.command}`);
      if (FAMILY_PATH.test(value.command)) family.push(`${fileName}#${pointer}`);
    }
    for (const [key, child] of Object.entries(value)) walk(child, `${pointer}/${key}`);
  };
  walk(JSON.parse(text) as unknown, "");
  return { family, successes };
}

/** The fixture kinds the envelope walk reads: .json parsed as JSON; .ts/.mts/.cts/.js/.mjs/.cjs parsed as modules; others none. */
export function envelopeKind(fileName: string): "json" | "module" | undefined {
  if (fileName.endsWith(".json")) return "json";
  return /\.(?:[cm]?ts|[cm]?js)$/.test(fileName) ? "module" : undefined;
}

// ---------------------------------------------------------------------------------------------------------------------------
// Judged tables. Every case is pinned by its own row test; ROWS digests each case as written for the out-of-file roster.

export interface LeavesCase {
  readonly stdout: string;
  readonly expect: { readonly verdict: FamilyVerdict; readonly served: readonly string[]; readonly planned: readonly string[] };
}
export interface SourceCase {
  readonly file: string;
  readonly text: string;
  readonly expect: { readonly argv: number; readonly literals: number };
}
export interface LaunchCase {
  readonly file: string;
  readonly text: string;
  readonly expect: { readonly launches: number; readonly detached: number; readonly unref: number };
}
export interface EnvelopeCase {
  readonly file: string;
  readonly text: string;
  readonly expect: { readonly family: number; readonly successes: number };
}
export interface TableRow<C> {
  readonly id: string;
  readonly label: string;
  readonly cases: readonly C[];
}

/** One result.leaves row in the measured rf 0.1.832 shape (seven keys); a served row is served_reachable, an unserved one refusing. */
export function leaf(path: string, served: boolean): Record<string, unknown> {
  return { path, served, planned_slice: served ? null : 17, reachable: served, store_required: false, availability: served ? "served_reachable" : "refusing_slice", attach_required: true };
}

/** An `rf --json --version` stdout in the measured envelope shape over the given rows; extra merges into result. */
export function versionStdout(rows: readonly unknown[], extra: Record<string, unknown> = {}, top: Record<string, unknown> = {}): string {
  return JSON.stringify({ schema: RF_SCHEMA, ok: true, command: "version", operation_id: `rfo_${"a".repeat(26)}`, workspace: null, transaction_id: null, result: { version: "0.1.832", leaves: rows, ...extra }, diagnostics: [], ...top });
}

const REAL_ROWS = [leaf("context.render", true), leaf("graph.impact", false), leaf("storage.status", true)];
/** A template substitution as source text (dollar, brace, name, brace), built from parts so no string literal here holds one. */
const sub = (name: string): string => ["$", "{", name, "}"].join("");
const none = { served: [], planned: [] } as const;

export const LEAVES: readonly TableRow<LeavesCase>[] = [
  ...RF_WORKSPACE_FAMILY.map(name => ({
    id: `SERVED-${name.toUpperCase()}`,
    label: `a served workspace.${name} leaf flips the guard to re-triage`,
    cases: [
      { stdout: versionStdout([...REAL_ROWS, leaf(`workspace.${name}`, true)]), expect: { verdict: "re-triage", served: [`workspace.${name}`], planned: [] } },
      { stdout: versionStdout([leaf(`workspace.${name}`, true)]), expect: { verdict: "re-triage", served: [`workspace.${name}`], planned: [] } },
    ] satisfies LeavesCase[],
  })),
  {
    id: "SERVED-OTHER-SPELLINGS",
    label: "a served family path outside the named eight, bare, space-separated or upper case also flips to re-triage",
    cases: [
      { stdout: versionStdout([...REAL_ROWS, leaf("workspace.status", true)]), expect: { verdict: "re-triage", served: ["workspace.status"], planned: [] } },
      { stdout: versionStdout([...REAL_ROWS, leaf("workspace", true)]), expect: { verdict: "re-triage", served: ["workspace"], planned: [] } },
      { stdout: versionStdout([...REAL_ROWS, leaf("workspace link", true)]), expect: { verdict: "re-triage", served: ["workspace link"], planned: [] } },
      { stdout: versionStdout([...REAL_ROWS, leaf("WORKSPACE.LINK", true)]), expect: { verdict: "re-triage", served: ["WORKSPACE.LINK"], planned: [] } },
    ],
  },
  {
    id: "PLANNED-STAYS-ABSENT",
    label: "a family leaf the registry lists but does not serve stays absent and is recorded as planned; availability is not read",
    cases: [
      { stdout: versionStdout([...REAL_ROWS, leaf("workspace.subscribe", false)]), expect: { verdict: "absent", served: [], planned: ["workspace.subscribe"] } },
      { stdout: versionStdout([...REAL_ROWS, { ...leaf("workspace.invoke", false), availability: "served_reachable", reachable: true }]), expect: { verdict: "absent", served: [], planned: ["workspace.invoke"] } },
      { stdout: versionStdout([...REAL_ROWS, leaf("workspace.read", false), leaf("workspace.link", true)]), expect: { verdict: "re-triage", served: ["workspace.link"], planned: ["workspace.read"] } },
    ],
  },
  {
    id: "CAPABILITIES-NOT-READ",
    label: "capabilities.leaves is never read: only result.leaves decides",
    cases: [
      { stdout: versionStdout(REAL_ROWS, {}, { capabilities: { leaves: [leaf("workspace.link", true)] } }), expect: { verdict: "absent", ...none } },
      { stdout: versionStdout(REAL_ROWS, { capabilities: { leaves: [leaf("workspace.read", true)] } }), expect: { verdict: "absent", ...none } },
      { stdout: versionStdout([...REAL_ROWS, leaf("workspace.read", true)], { capabilities: { leaves: [] } }), expect: { verdict: "re-triage", served: ["workspace.read"], planned: [] } },
    ],
  },
  {
    id: "NOT-A-VERSION-ENVELOPE",
    label: "stdout that is not rf's ok version envelope reads unreadable, never absent",
    cases: [
      { stdout: "", expect: { verdict: "unreadable", ...none } },
      { stdout: "rf: command not found", expect: { verdict: "unreadable", ...none } },
      { stdout: "[]", expect: { verdict: "unreadable", ...none } },
      { stdout: "null", expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout(REAL_ROWS, {}, { schema: "reactive-fiber.cli/v2" }), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout(REAL_ROWS, {}, { command: "context.render" }), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout(REAL_ROWS, {}, { ok: false }), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout(REAL_ROWS, {}, { result: null }), expect: { verdict: "unreadable", ...none } },
    ],
  },
  {
    id: "NO-READABLE-ROWS",
    label: "a registry without readable path/served rows reads unreadable, never absent",
    cases: [
      { stdout: versionStdout(REAL_ROWS, { leaves: undefined }), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout(REAL_ROWS, { leaves: {} }), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout([]), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout([...REAL_ROWS, { served: true }]), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout([...REAL_ROWS, { path: "workspace.link", served: "true" }]), expect: { verdict: "unreadable", ...none } },
      { stdout: versionStdout([...REAL_ROWS, "workspace.link"]), expect: { verdict: "unreadable", ...none } },
    ],
  },
  {
    id: "NO-FAMILY-ROW",
    label: "a registry whose rows name no family path reads absent, near names included",
    cases: [
      { stdout: versionStdout(REAL_ROWS), expect: { verdict: "absent", ...none } },
      { stdout: versionStdout([...REAL_ROWS, leaf("workspaces.link", true), leaf("graph.workspace", true), leaf("workspace_link", true), leaf("context.read", true)]), expect: { verdict: "absent", ...none } },
    ],
  },
];

export const SOURCES: readonly TableRow<SourceCase>[] = [
  {
    id: "ARGV-ADJACENT",
    label: "an argv array or call argument list holding workspace then a family leaf is found",
    cases: [
      { file: "a.ts", text: 'spawn("rf", ["workspace", "read", "--json"]);', expect: { argv: 1, literals: 0 } },
      { file: "a.ts", text: 'const argv = ["--json", "workspace", "subscribe", "--follow"];', expect: { argv: 1, literals: 0 } },
      { file: "a.ts", text: 'const argv = [...base, "workspace", "link"];', expect: { argv: 1, literals: 0 } },
      { file: "a.ts", text: 'argv.push("workspace", "invoke");', expect: { argv: 1, literals: 0 } },
      { file: "a.mjs", text: "execFileSync('rf', ['workspace', 'exports']);", expect: { argv: 1, literals: 0 } },
    ],
  },
  {
    id: "LITERAL-SPELLED",
    label: "a string or template literal spelling workspace then a family leaf is found",
    cases: [
      { file: "a.ts", text: 'const command = "rf workspace read --json";', expect: { argv: 0, literals: 1 } },
      { file: "a.ts", text: "const id = 'workspace.subscribe';", expect: { argv: 0, literals: 1 } },
      { file: "a.ts", text: "const command = `rf workspace  links " + sub("flag") + "`;", expect: { argv: 0, literals: 1 } },
      { file: "a.ts", text: "const command = `rf workspace " + sub("flag") + " unlink`;", expect: { argv: 0, literals: 1 } },
      { file: "a.ts", text: 'const label = "Workspace Inspect";', expect: { argv: 0, literals: 1 } },
      { file: "a.ts", text: "const command = `rf workspace invoke`;", expect: { argv: 0, literals: 1 } },
    ],
  },
  {
    id: "CLEAN-SHAPES",
    label: "the preview argv, a non-family workspace word, comments and a leaf or workspace inside a longer word stay clean",
    cases: [
      { file: "a.ts", text: 'const argv = ["--workspace", root, "context", "render", "--no-commit", "--json"];', expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: 'const argv = ["workspace", "status"]; const note = "the workspace root"; const plural = "workspaces.link";', expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: "// rf workspace read\n/* spawn(\"rf\", [\"workspace\", \"link\"]) */\nexport const x = 1;", expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: 'const note = "the workspace reader";', expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: 'const id = "subworkspace.read";', expect: { argv: 0, literals: 0 } },
    ],
  },
  {
    id: "R-SEPARATED-LEAF",
    label: "residual quiet row: a leaf separated from workspace by another element, or held in a second array, is not read",
    cases: [
      { file: "a.ts", text: 'const argv = ["workspace", "--json", "read"];', expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: 'const argv = ["workspace"].concat(["read"]);', expect: { argv: 0, literals: 0 } },
    ],
  },
  {
    id: "R-COMPUTED-LEAF",
    label: "residual quiet row: a leaf token or command built at run time is not read",
    cases: [
      { file: "a.ts", text: 'spawn("rf", ["workspace", leaf]);', expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: 'const command = "rf workspace" + " read";', expect: { argv: 0, literals: 0 } },
      { file: "a.ts", text: "const id = `workspace." + sub("leaf") + "`;", expect: { argv: 0, literals: 0 } },
    ],
  },
];

export const LAUNCHES: readonly TableRow<LaunchCase>[] = [
  {
    id: "DETACHED-FOUND",
    label: "an rf launch whose options literal sets detached: true is found",
    cases: [
      { file: "a.ts", text: 'spawn("rf", argv, { detached: true });', expect: { launches: 1, detached: 1, unref: 0 } },
      { file: "a.ts", text: 'child_process.spawn("rf", argv, { stdio: "ignore", "detached": true });', expect: { launches: 1, detached: 1, unref: 0 } },
      { file: "a.ts", text: 'execFile("rf", argv, { detached: true } as const, done);', expect: { launches: 1, detached: 1, unref: 0 } },
      { file: "a.ts", text: 'exec("rf workspace subscribe", { detached: true });', expect: { launches: 1, detached: 1, unref: 0 } },
      { file: "a.ts", text: 'spawn("/home/user/.local/bin/rf", argv, { detached: true });\nspawn("rf.exe", argv, { detached: true });', expect: { launches: 2, detached: 2, unref: 0 } },
    ],
  },
  {
    id: "UNREF-FOUND",
    label: "unref() on an rf child, chained or through the name a declaration or assignment binds, is found",
    cases: [
      { file: "a.ts", text: 'const child = spawn("rf", argv);\nchild.unref();', expect: { launches: 1, detached: 0, unref: 1 } },
      { file: "a.ts", text: 'spawn("rf", argv).unref();', expect: { launches: 1, detached: 0, unref: 1 } },
      { file: "a.ts", text: 'let child;\nchild = spawn("rf", argv);\nchild.unref();', expect: { launches: 1, detached: 0, unref: 1 } },
      { file: "a.ts", text: 'const child = (spawn("rf", argv) as ChildProcess);\n(child as ChildProcess).unref();', expect: { launches: 1, detached: 0, unref: 1 } },
    ],
  },
  {
    id: "FOREGROUND-CLEAN",
    label: "a foreground rf launch, a timer unref and a non-rf detached launch stay clean",
    cases: [
      { file: "a.ts", text: 'const child = spawn("rf", argv, { stdio: ["ignore", "pipe", "pipe"], env });', expect: { launches: 1, detached: 0, unref: 0 } },
      { file: "a.ts", text: 'spawn("rf", argv, { detached: false });\nspawnSync("rf", ["--json", "--version"]);', expect: { launches: 2, detached: 0, unref: 0 } },
      { file: "a.ts", text: 'const child = spawn("rf", argv);\nsetTimeout(stop, 500).unref();\ntimer.unref();', expect: { launches: 1, detached: 0, unref: 0 } },
      { file: "a.ts", text: 'const host = spawn("claude", argv, { detached: true });\nhost.unref();\nspawn("rfx", argv, { detached: true });', expect: { launches: 0, detached: 0, unref: 0 } },
    ],
  },
  {
    id: "R-INDIRECT-LAUNCH",
    label: "residual quiet row: options, child or binary reached through another name are not read",
    cases: [
      { file: "a.ts", text: 'const options = { detached: true };\nspawn("rf", argv, options);', expect: { launches: 1, detached: 0, unref: 0 } },
      { file: "a.ts", text: 'const child = spawn("rf", argv);\nconst alias = child;\nalias.unref();', expect: { launches: 1, detached: 0, unref: 0 } },
      { file: "a.ts", text: 'const binary = "rf";\nspawn(binary, argv, { detached: true });', expect: { launches: 0, detached: 0, unref: 0 } },
      { file: "a.ts", text: 'exec("cd /work && rf workspace subscribe", { detached: true });', expect: { launches: 0, detached: 0, unref: 0 } },
    ],
  },
];

export const ENVELOPES: readonly TableRow<EnvelopeCase>[] = [
  {
    id: "MODULE-FABRICATION-FOUND",
    label: "a module object literal with ok true and a family command is found",
    cases: [
      { file: "a.ts", text: 'const envelope = { schema: "reactive-fiber.cli/v1", ok: true, command: "workspace.read", result: {} };', expect: { family: 1, successes: 1 } },
      { file: "a.ts", text: 'const rows = [{ "ok": true, "command": "workspace.subscribe" }];', expect: { family: 1, successes: 1 } },
      { file: "a.mjs", text: "export const reply = { ok: true, command: `workspace." + sub("leaf") + "` };", expect: { family: 1, successes: 1 } },
      { file: "a.ts", text: 'const envelope = { ok: true as const, command: "workspace" };', expect: { family: 1, successes: 1 } },
    ],
  },
  {
    id: "JSON-FABRICATION-FOUND",
    label: "a JSON object with ok true and a family command is found at any depth",
    cases: [
      { file: "a.json", text: '{"ok": true, "command": "workspace.links"}', expect: { family: 1, successes: 1 } },
      { file: "a.json", text: '{"cases": [{"reply": {"ok": true, "command": "Workspace Invoke"}}]}', expect: { family: 1, successes: 1 } },
    ],
  },
  {
    id: "REFUSALS-AND-OTHERS-CLEAN",
    label: "a family refusal, a context render success and a version envelope listing a leaf are not fabrications",
    cases: [
      { file: "a.ts", text: 'const refusal = { ok: false, command: "workspace.read", result: null };', expect: { family: 0, successes: 0 } },
      { file: "a.ts", text: 'const envelope = { ok: true, command: "context.render" };', expect: { family: 0, successes: 1 } },
      { file: "a.json", text: '{"ok": true, "command": "version", "result": {"leaves": [{"path": "workspace.link", "served": true}]}}', expect: { family: 0, successes: 1 } },
      { file: "a.json", text: '{"ok": false, "command": null, "diagnostics": [{"code": "RF_USAGE_UNKNOWN_COMMAND", "metadata": {"command": "workspace"}}]}', expect: { family: 0, successes: 0 } },
      { file: "a.ts", text: 'const text = \'{"ok": true, "command": "workspace.read"}\';', expect: { family: 0, successes: 0 } },
    ],
  },
  {
    id: "R-INDIRECT-ENVELOPE",
    label: "residual quiet row: a command or ok reached through a name, a spread or an expression is not read",
    cases: [
      { file: "a.ts", text: 'const command = "workspace.read";\nconst envelope = { ok: true, command };', expect: { family: 0, successes: 0 } },
      { file: "a.ts", text: 'const envelope = { ...base, ok: true, command: name };', expect: { family: 0, successes: 0 } },
      { file: "a.ts", text: 'const envelope = { ok: !false, command: "workspace.read" };', expect: { family: 0, successes: 0 } },
    ],
  },
  {
    id: "R-UNREAD-KIND",
    label: "residual quiet row: a Markdown or shell file is not read, even when it holds a fabrication a module scan would find",
    cases: [
      { file: "a.md", text: 'const reply = { ok: true, command: "workspace.read" };\n', expect: { family: 0, successes: 0 } },
      { file: "a.sh", text: 'const reply = { ok: true, command: "workspace.read" };\n', expect: { family: 0, successes: 0 } },
    ],
  },
];

export interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly label: string;
  /** SHA-256 of each case as written (JSON). */
  readonly pins: readonly string[];
  readonly test: string;
}

const digest = (value: string): string => createHash("sha256").update(value).digest("hex");
const row = <C>(table: string, entry: TableRow<C>): JudgedRow => ({ table, id: entry.id, label: entry.label, pins: entry.cases.map(item => digest(JSON.stringify(item))), test: `${table} ${entry.id}` });

export const ROWS: readonly JudgedRow[] = [
  ...LEAVES.map(entry => row("LEAVES", entry)),
  ...SOURCES.map(entry => row("SOURCES", entry)),
  ...LAUNCHES.map(entry => row("LAUNCHES", entry)),
  ...ENVELOPES.map(entry => row("ENVELOPES", entry)),
];

/** The named residual families and their pinned quiet rows. */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  "R-COMPUTED-LEAF": ["SOURCES R-COMPUTED-LEAF"],
  "R-SEPARATED-LEAF": ["SOURCES R-SEPARATED-LEAF"],
  "R-INDIRECT-LAUNCH": ["LAUNCHES R-INDIRECT-LAUNCH"],
  "R-INDIRECT-ENVELOPE": ["ENVELOPES R-INDIRECT-ENVELOPE"],
  "R-UNREAD-KIND": ["ENVELOPES R-UNREAD-KIND"],
};
