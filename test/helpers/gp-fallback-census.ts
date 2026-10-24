/**
 * wb-1xvp.4 (RF-GRAPH-POLICY-MACHINE-CONTROL-R3): the tables, the src scan and the two judges of the GraphPolicyCLI
 * call-site fallback census (test/workbench-gp-fallback-census.test.ts). The requirement, as the bead states it from
 * ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:270@6a251bf73af5: "every gp call
 * site shall have a deterministic fallback (the machine's existing rule or an L355 reference policy) used when gp is
 * absent, refuses (nonzero exit or ok:false), returns a stale basis or exceeds its runtime budget; the fallback is
 * recorded as fallback with the producer's refusal code echoed verbatim, never as a gp decision nor from partial gp
 * output".
 *
 * Every export except srcFiles is pure (no clock, environment, process or filesystem); srcFiles reads only the tree
 * it is handed. Every table is plain data, so ROWS (each row's id, label and the SHA-256 of each pin) is the same
 * wherever this module loads; test/fixtures/gp-fallback-roster.json is the out-of-file anchor ROWS is judged against.
 * Nothing here starts gp, fakes a gp binary or implements an adapter: the fake seams are data handed to a drive.
 *
 * wb-qxdr (the wb-1xvp.4 follow-up, PREP F1 of landing 252) adds a row for each mode the first cut claimed but no row
 * pinned: the WALKS table (srcFiles on synthetic trees), a MUTANTS row per claimed probability member, the J-FALLBACK
 * family half, an inherited-key row per contract field (the inherit edit), the cycle and array guards, and the WIRE
 * gp.cli and bare gp module pins. The F4 escapes ride as named residuals, each a pinned quiet row: R-BINARY-SPELLING
 * (the scan), R-UNWALKED-KEY and R-DERIVED-OUTPUT (the judge). editShapeFindings proves each structural edit
 * (inherit, hide, symbol, link) is the shape it names, so no row passes on an edit that degraded to a delete or a set.
 */
import { createHash } from "node:crypto";
import { readdirSync, realpathSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";

// ---- the src scan (acceptance (c)) ----

export type TouchpointKind = "CLI" | "SDK" | "WIRE";

export interface Touchpoint {
  readonly file: string;
  readonly line: number;
  readonly kind: TouchpointKind;
  readonly text: string;
}

export interface Scan {
  readonly touchpoints: readonly Touchpoint[];
  /** The first-argument string literal of every call expression: the command a spawning call site passes. */
  readonly commands: readonly string[];
}

/** The gp binary as a word: at the start of a literal, after whitespace or a path separator; ending it or before whitespace. */
const CLI_TEXT = /(?:^|[\s/\\])gp(?:\.exe)?(?:\s|$)/;
/** A GraphPolicyCLI package (graph-policy-cli, graphpolicy, @graphpolicy/..., graph_policy) or a package named gp. */
const SDK_SPECIFIER = /graph[-_. ]?policy|^gp(?:$|\/)/i;
/** The gp wire vocabulary: graphpolicy.* schema ids, the gp.rpc / gp.cli reply schemas, GP_CLI_ / GP_RPC_ / GP_E_ codes. */
const WIRE_TEXT = /graph[-_. ]?policy|\bgp\.(?:rpc|cli)\b|\bGP_(?:CLI|RPC|E)_/i;

function scriptKind(file: string): ts.ScriptKind {
  switch (extname(file).toLowerCase()) {
    case ".tsx":
      return ts.ScriptKind.TSX;
    case ".js":
    case ".mjs":
    case ".cjs":
      return ts.ScriptKind.JS;
    case ".jsx":
      return ts.ScriptKind.JSX;
    case ".json":
      return ts.ScriptKind.JSON;
    default:
      return ts.ScriptKind.TS;
  }
}

/** The string literal a node loads as a module: import/export from, import-equals, import type, import() or require(). */
function moduleSpecifier(node: ts.Node): ts.StringLiteralLike | undefined {
  if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) return node.moduleSpecifier;
  if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression)) return node.moduleReference.expression;
  if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteralLike(node.argument.literal)) return node.argument.literal;
  if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
    const first = node.arguments[0];
    if (first !== undefined && ts.isStringLiteralLike(first)) return first;
  }
  return undefined;
}

/** Every GraphPolicyCLI touchpoint in one module's text (comments are not code and are not read). */
export function scanSource(file: string, text: string): Scan {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const touchpoints: Touchpoint[] = [];
  const commands: string[] = [];
  const specifiers = new Set<ts.Node>();
  const report = (node: ts.Node, kind: TouchpointKind, value: string): void => {
    touchpoints.push({ file, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, kind, text: value });
  };
  const literal = (node: ts.Node, value: string): void => {
    if (CLI_TEXT.test(value)) report(node, "CLI", value);
    if (WIRE_TEXT.test(value)) report(node, "WIRE", value);
  };
  const visit = (node: ts.Node): void => {
    const specifier = moduleSpecifier(node);
    if (specifier !== undefined) {
      specifiers.add(specifier);
      if (SDK_SPECIFIER.test(specifier.text)) report(specifier, "SDK", specifier.text);
    }
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first)) commands.push(first.text);
    }
    if (ts.isStringLiteralLike(node) && !specifiers.has(node)) literal(node, node.text);
    if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) literal(node, node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { touchpoints, commands };
}

/**
 * Every regular file under `root`/`dir` (hidden, nested and extensionless paths included, symlinks followed, each real
 * directory walked once), as root-relative POSIX paths in sorted order. Any other entry fails closed.
 */
export function srcFiles(root: string, dir = "src"): string[] {
  const files: string[] = [];
  const walked = new Set<string>();
  const walk = (rel: string): void => {
    const real = realpathSync(join(root, rel));
    if (walked.has(real)) return;
    walked.add(real);
    for (const name of readdirSync(join(root, rel)).sort()) {
      const child = `${rel}/${name}`;
      const info = statSync(join(root, child));
      if (info.isDirectory()) walk(child);
      else if (info.isFile()) files.push(child);
      else throw new Error(`${child}: neither a regular file nor a directory under the scan root`);
    }
  };
  walk(dir);
  return files;
}

/** The names a module exports: exported function, class and variable declarations and export { a, b as c } lists (re-exports included). */
export function exportedNames(file: string, text: string): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const names: string[] = [];
  const exported = (node: ts.Node): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
  for (const statement of source.statements) {
    if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && exported(statement) && statement.name !== undefined) names.push(statement.name.text);
    if (ts.isVariableStatement(statement) && exported(statement)) {
      for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name)) names.push(declaration.name.text);
    }
    if (ts.isExportDeclaration(statement) && !statement.isTypeOnly && statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
      for (const element of statement.exportClause.elements) names.push(element.name.text);
    }
  }
  return names;
}

// ---- the pairing (acceptance (c)) ----

/** Acceptance (c): the named deterministic fallbacks - the machine's existing rule or a README L355 reference policy. */
export const FAMILIES = ["existing-machine-rule", "ready-first", "priority-first", "critical-path-aware", "cost-aware"] as const;
export type Family = (typeof FAMILIES)[number];

const isFamily = (value: string): value is Family => (FAMILIES as readonly string[]).includes(value);

/** One src module that reaches GraphPolicyCLI, paired with the deterministic fallback it exports. */
export interface Pairing {
  /** The repo-relative src path of the module that carries the touchpoint. */
  readonly file: string;
  /** One of FAMILIES. */
  readonly family: string;
  /** The name of the deterministic fallback that module exports. */
  readonly fallback: string;
}

/** Each pairing finding names its rule: P-UNPAIRED, P-STALE, P-DUPLICATE, P-FAMILY or P-UNEXPORTED. */
export function pairingFindings(pairings: readonly Pairing[], touchpoints: readonly Touchpoint[], texts: ReadonlyMap<string, string>): string[] {
  const findings: string[] = [];
  const touched = [...new Set(touchpoints.map(point => point.file))].sort();
  const counts = new Map<string, number>();
  for (const pairing of pairings) counts.set(pairing.file, (counts.get(pairing.file) ?? 0) + 1);
  for (const file of touched) {
    const kinds = [...new Set(touchpoints.filter(point => point.file === file).map(point => point.kind))].join("+");
    if (!counts.has(file)) findings.push(`P-UNPAIRED ${file} reaches GraphPolicyCLI (${kinds}) with no paired deterministic fallback`);
  }
  for (const [file, count] of counts) if (count > 1) findings.push(`P-DUPLICATE ${file} is paired ${count} times`);
  for (const pairing of pairings) {
    if (!touched.includes(pairing.file)) findings.push(`P-STALE ${pairing.file} is paired but carries no GraphPolicyCLI touchpoint`);
    if (!isFamily(pairing.family)) findings.push(`P-FAMILY ${pairing.file} pairs with ${JSON.stringify(pairing.family)}, not a named deterministic fallback`);
    const text = texts.get(pairing.file);
    if (text === undefined || !exportedNames(pairing.file, text).includes(pairing.fallback)) findings.push(`P-UNEXPORTED ${pairing.file} does not export the fallback ${pairing.fallback}`);
  }
  return findings;
}

// ---- the fake seams and the record judge (acceptance (a) and (b)) ----

export type Reason = "absent" | "refused" | "stale" | "over-budget";

/** The policy output a fake seam carries where gp answered at all: no value of it may reach a fallback record. */
export const POLICY_OUTPUT = { action: { assign: "policy-candidate-7" }, score: 0.93, probability: 0.61 } as const;

/** One way the policy cannot be used, as data a call site's drive hands to its seam. */
export type FakeSeam =
  | { readonly kind: "absent"; readonly errno: "ENOENT" }
  | { readonly kind: "exit"; readonly exitCode: number; readonly stdout: string }
  | { readonly kind: "reply"; readonly reply: Readonly<Record<string, unknown>> }
  | { readonly kind: "basis"; readonly basisDigest: string; readonly currentDigest: string; readonly output: typeof POLICY_OUTPUT }
  | { readonly kind: "budget"; readonly budgetMs: number; readonly elapsedMs: number; readonly partial: typeof POLICY_OUTPUT };

export interface Unusable {
  readonly id: string;
  readonly label: string;
  readonly reason: Reason;
  /** The producer's refusal code when the producer sent one: the record echoes it verbatim, and carries none otherwise. */
  readonly code: string | undefined;
  readonly seam: FakeSeam;
}

/** README L270 and acceptance (a): absent, refused (nonzero exit or ok:false), a stale basis, over the runtime budget. */
export const UNUSABLE: readonly Unusable[] = [
  { id: "U-ABSENT", label: "gp is absent: the seam cannot start the binary", reason: "absent", code: undefined, seam: { kind: "absent", errno: "ENOENT" } },
  {
    id: "U-CLI-REFUSAL",
    label: "gp exits 2 with a graphpolicy.cli.v1 error envelope carrying a GP_CLI_ code",
    reason: "refused",
    code: "GP_CLI_EVAL_REJECTED",
    seam: { kind: "exit", exitCode: 2, stdout: `${JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, error: { code: "GP_CLI_EVAL_REJECTED", category: "invalid-input", retryable: false } })}\n` },
  },
  {
    id: "U-RPC-REFUSAL",
    label: "gp answers ok:false with a gp.rpc.reply/v1 error carrying a GP_RPC_ code",
    reason: "refused",
    code: "GP_RPC_METHOD_UNKNOWN",
    seam: { kind: "reply", reply: { schema: "gp.rpc.reply/v1", id: 1, ok: false, error: { schema: "gp.rpc.error/v1", code: "GP_RPC_METHOD_UNKNOWN", category: "unsupported", retryable: false, details: {} } } },
  },
  {
    id: "U-STALE-BASIS",
    label: "gp answers on a basis digest that is not the host's current basis",
    reason: "stale",
    code: undefined,
    seam: { kind: "basis", basisDigest: `sha256:${"a".repeat(64)}`, currentDigest: `sha256:${"b".repeat(64)}`, output: POLICY_OUTPUT },
  },
  {
    id: "U-OVER-BUDGET",
    label: "gp exceeds its runtime budget before it answers in full",
    reason: "over-budget",
    code: undefined,
    seam: { kind: "budget", budgetMs: 250, elapsedMs: 251, partial: POLICY_OUTPUT },
  },
];

/** The fallback a record must name and the action it must carry: the paired fallback's own decision for the drive's input. */
export interface Paired {
  readonly family: string;
  readonly name: string;
  readonly action: unknown;
}

const SCORE_KEY = /score/i;
const PROBABILITY_KEY = /prob|propensit|logit|likelihood|distribution/i;

/** Every own key path and leaf value of a record (cycles cut, each object read once). */
function walkRecord(value: unknown, onKey: (path: readonly string[]) => void, onLeaf: (leaf: unknown) => void): void {
  const seen = new Set<object>();
  const visit = (node: unknown, path: readonly string[]): void => {
    if (typeof node !== "object" || node === null) {
      onLeaf(node);
      return;
    }
    if (seen.has(node)) return;
    seen.add(node);
    for (const key of Object.keys(node)) {
      const next = [...path, key];
      onKey(next);
      visit((node as Readonly<Record<string, unknown>>)[key], next);
    }
  };
  visit(value, []);
}

const POLICY_LEAVES: readonly unknown[] = [POLICY_OUTPUT.action.assign, POLICY_OUTPUT.score, POLICY_OUTPUT.probability];

/**
 * Judge one fallback record written for one unusable shape. Each finding names its rule: J-RECORD (no record object),
 * J-SOURCE, J-ACTION, J-FALLBACK, J-REASON, J-CODE, J-SCORE, J-PROBABILITY or J-POLICY-OUTPUT. Contract fields are
 * read as OWN properties only, so an inherited decision_source is not a recorded one.
 */
export function judgeRecord(record: unknown, paired: Paired, shape: Unusable): string[] {
  if (typeof record !== "object" || record === null || Array.isArray(record)) return [`J-RECORD the drive returned ${record === null ? "null" : Array.isArray(record) ? "an array" : typeof record}, not a record object`];
  const own = (key: string): unknown => (Object.hasOwn(record, key) ? (record as Readonly<Record<string, unknown>>)[key] : undefined);
  const findings: string[] = [];
  if (own("decision_source") !== "fallback") findings.push(`J-SOURCE decision_source is ${JSON.stringify(own("decision_source")) ?? "absent"}, not "fallback"`);
  if (!Object.hasOwn(record, "action") || !isDeepStrictEqual(own("action"), paired.action)) findings.push("J-ACTION the action is absent or is not the paired fallback's own decision");
  const fallback = own("fallback");
  const names = typeof fallback === "object" && fallback !== null && Object.hasOwn(fallback, "family") && Object.hasOwn(fallback, "name") ? (fallback as Readonly<Record<string, unknown>>) : undefined;
  if (names?.family !== paired.family || names?.name !== paired.name) findings.push(`J-FALLBACK the record does not name the paired fallback ${paired.family}/${paired.name}`);
  if (own("reason") !== shape.reason) findings.push(`J-REASON reason is ${JSON.stringify(own("reason")) ?? "absent"}, not ${JSON.stringify(shape.reason)}`);
  if (shape.code !== undefined) {
    if (own("refusal_code") !== shape.code) findings.push(`J-CODE refusal_code ${JSON.stringify(own("refusal_code")) ?? "absent"} is not the producer's ${shape.code} verbatim`);
  } else if (Object.hasOwn(record, "refusal_code")) findings.push(`J-CODE refusal_code ${JSON.stringify(own("refusal_code"))} is recorded, but the producer sent no code`);
  let policyLeaf = false;
  walkRecord(
    record,
    path => {
      const key = path[path.length - 1] ?? "";
      if (SCORE_KEY.test(key)) findings.push(`J-SCORE a score key is written at ${path.join(".")} (absent, not zero)`);
      if (PROBABILITY_KEY.test(key)) findings.push(`J-PROBABILITY a probability key is written at ${path.join(".")}`);
      if (POLICY_LEAVES.includes(key)) policyLeaf = true;
    },
    leaf => {
      if (POLICY_LEAVES.includes(leaf)) policyLeaf = true;
    },
  );
  if (policyLeaf) findings.push("J-POLICY-OUTPUT the record carries a value of the fake seam's policy output");
  return findings;
}

/** The rule id each finding opens with. */
export const ruleOf = (finding: string): string => finding.split(" ", 1)[0] ?? "";

/** Run one drive on one unusable shape and judge what it records; a drive that throws or rejects records nothing (J-RECORD). */
export async function driveFindings(paired: Paired, drive: (seam: FakeSeam) => unknown, shape: Unusable): Promise<string[]> {
  let record: unknown;
  try {
    record = await drive(shape.seam);
  } catch (error) {
    return [`J-RECORD the drive threw: ${error instanceof Error ? error.message : String(error)}`];
  }
  return judgeRecord(record, paired, shape);
}

/** The reference fallback the conformance rows drive: the ready-first fallback of a two-candidate queue. */
export const REFERENCE: Paired = { family: "ready-first", name: "readyFirst", action: { assign: "bead-oldest-ready" } };

/** A conforming drive: what a call site paired with REFERENCE records for each fake seam. */
export function referenceRecord(seam: FakeSeam): Readonly<Record<string, unknown>> {
  const base = { decision_source: "fallback", fallback: { family: REFERENCE.family, name: REFERENCE.name }, action: REFERENCE.action };
  switch (seam.kind) {
    case "absent":
      return { ...base, reason: "absent" };
    case "exit": {
      const envelope: unknown = JSON.parse(seam.stdout);
      const error = typeof envelope === "object" && envelope !== null ? (envelope as Readonly<Record<string, unknown>>).error : undefined;
      const code = typeof error === "object" && error !== null ? (error as Readonly<Record<string, unknown>>).code : undefined;
      return typeof code === "string" ? { ...base, reason: "refused", refusal_code: code } : { ...base, reason: "refused" };
    }
    case "reply": {
      const error = seam.reply.error;
      const code = typeof error === "object" && error !== null ? (error as Readonly<Record<string, unknown>>).code : undefined;
      return typeof code === "string" ? { ...base, reason: "refused", refusal_code: code } : { ...base, reason: "refused" };
    }
    case "basis":
      return { ...base, reason: "stale" };
    case "budget":
      return { ...base, reason: "over-budget" };
  }
}

/**
 * A data-only edit of the reference record (so the table digests the same everywhere): set, delete, or replace whole;
 * inherit moves the key at path off its holder onto the holder's prototype, hide writes it as a non-enumerable own key,
 * symbol writes the value under an own symbol key whose description is the last path segment, and link points the key
 * at the very object another path reaches (a cycle when that object holds the key).
 */
export type Edit =
  | { readonly op: "set"; readonly path: readonly string[]; readonly value: unknown }
  | { readonly op: "delete"; readonly path: readonly string[] }
  | { readonly op: "inherit"; readonly path: readonly string[] }
  | { readonly op: "hide"; readonly path: readonly string[]; readonly value: unknown }
  | { readonly op: "symbol"; readonly path: readonly string[]; readonly value: unknown }
  | { readonly op: "link"; readonly path: readonly string[]; readonly to: readonly string[] }
  | { readonly op: "replace"; readonly value: unknown }
  | { readonly op: "throw"; readonly message: string };

/** The value a path reaches through plain property reads (inherited keys included), or undefined. */
function valueAt(root: unknown, path: readonly string[]): unknown {
  let node = root;
  for (const key of path) node = typeof node === "object" && node !== null ? (node as Readonly<Record<string, unknown>>)[key] : undefined;
  return node;
}

export type StructuralEdit = Extract<Edit, { readonly op: "inherit" | "hide" | "symbol" | "link" }>;

/** The edits that give the record a structure a plain set or delete cannot (set, delete, replace and throw carry none). */
export const isStructuralEdit = (edit: Edit): edit is StructuralEdit => edit.op === "inherit" || edit.op === "hide" || edit.op === "symbol" || edit.op === "link";

/**
 * The structural edits whose shape the edited record does not carry, one finding each: an inherited key must read only
 * through its holder's prototype, a hidden key must be an own key that is not enumerable, a symbol key must be an own
 * symbol of that description, and a link must hold the very object its target path reaches. [] means every structural
 * edit is the shape it names.
 */
export function editShapeFindings(record: unknown, edits: readonly Edit[]): string[] {
  const findings: string[] = [];
  for (const edit of edits) {
    if (!isStructuralEdit(edit)) continue;
    const where = `${edit.op} ${edit.path.join(".")}`;
    const holder = valueAt(record, edit.path.slice(0, -1));
    const last = edit.path[edit.path.length - 1] ?? "";
    if (typeof holder !== "object" || holder === null) {
      findings.push(`${where}: no object holds the key`);
      continue;
    }
    if (edit.op === "inherit" && (Object.hasOwn(holder, last) || !(last in holder))) findings.push(`${where}: the key is not inherited through the prototype`);
    if (edit.op === "hide" && Object.getOwnPropertyDescriptor(holder, last)?.enumerable !== false) findings.push(`${where}: the key is not a non-enumerable own key`);
    if (edit.op === "symbol" && !Object.getOwnPropertySymbols(holder).some(symbol => symbol.description === last)) findings.push(`${where}: no own symbol key carries that description`);
    if (edit.op === "link") {
      const target = valueAt(record, edit.to);
      if (typeof target !== "object" || target === null || (holder as Readonly<Record<string, unknown>>)[last] !== target) findings.push(`${where}: the key does not hold the object ${edit.to.join(".")} reaches`);
    }
  }
  return findings;
}

/** The record a mutant drive returns: the reference record for the seam with each edit applied in order (or a throw). */
export function editedRecord(seam: FakeSeam, edits: readonly Edit[]): unknown {
  let record: unknown = structuredClone(referenceRecord(seam));
  for (const edit of edits) {
    if (edit.op === "throw") throw new Error(edit.message);
    if (edit.op === "replace") {
      record = structuredClone(edit.value);
      continue;
    }
    let target = record as Record<string, unknown>;
    for (const key of edit.path.slice(0, -1)) {
      const next = target[key];
      if (typeof next !== "object" || next === null) target[key] = {};
      target = target[key] as Record<string, unknown>;
    }
    const last = edit.path[edit.path.length - 1] ?? "";
    switch (edit.op) {
      case "set":
        target[last] = structuredClone(edit.value);
        break;
      case "delete":
        delete target[last];
        break;
      case "inherit": {
        const moved = target[last];
        delete target[last];
        Object.setPrototypeOf(target, Object.assign(Object.create(Object.getPrototypeOf(target)) as object, { [last]: moved }));
        break;
      }
      case "hide":
        Object.defineProperty(target, last, { value: structuredClone(edit.value), enumerable: false, writable: true, configurable: true });
        break;
      case "symbol":
        Object.defineProperty(target, Symbol(last), { value: structuredClone(edit.value), enumerable: true, writable: true, configurable: true });
        break;
      case "link":
        target[last] = valueAt(record, edit.to);
        break;
    }
  }
  return record;
}

// ---- the judged tables ----

export interface SourceRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** One row per touchpoint kind; every pin is a source the scan must report exactly once, under that kind only. */
export const TOUCHPOINTS: readonly (SourceRow & { readonly kind: TouchpointKind })[] = [
  {
    id: "CLI",
    kind: "CLI",
    label: "the gp binary named as a command: a literal that is gp or gp.exe, ends a path in it, or carries it as a shell word",
    pins: [
      'spawn("gp", ["graph", "check", "--json", path]);',
      'const out = execFileSync("gp", ["rpc", "--stdio"], { input });',
      'await pi.exec("gp", argv, { cwd, timeout: 5000 });',
      'const GP_BINARY = "/usr/local/bin/gp";',
      'const binary = "C:\\\\tools\\\\gp.exe";',
      ["execSync(`gp graph check $", "{file} --json`);"].join(""),
      'const shellLine = "nice -n 10 gp rpc --stdio";',
    ],
  },
  {
    id: "SDK",
    kind: "SDK",
    label: "a GraphPolicyCLI module specifier: an import, export, import-equals, import type, import() or require() of it",
    pins: [
      'import { evaluate } from "graph-policy-cli";',
      'import type { DecisionReceipt } from "graph-policy-cli/dist/sdk/index.js";',
      'const sdk = await import("@graphpolicy/sdk");',
      'export { score } from "graphpolicy";',
      'import gpCli = require("graph_policy");',
      'const client = require("gp/rpc");',
      'type Envelope = import("GraphPolicy").Envelope;',
      'import { connect } from "gp";',
    ],
  },
  {
    id: "WIRE",
    kind: "WIRE",
    label: "the gp wire vocabulary in a literal: a graphpolicy schema id, a gp.rpc or gp.cli schema, or a GP_CLI_, GP_RPC_ or GP_E_ code",
    pins: [
      'const SCHEMA = "graphpolicy.rpc.v1";',
      'if (envelope.schema === "graphpolicy.cli.v1") return envelope.error;',
      'const reply = { schema: "gp.rpc.reply/v1", id, ok: false };',
      'const refused = code === "GP_CLI_EVAL_REJECTED";',
      ["const code = `GP_RPC_$", "{name}`;"].join(""),
      'const failClosed = "GP_E_BACKEND_UNAVAILABLE";',
      'const observation = { schema: "graphpolicy.data.v1", nodes };',
      'const errorSchema = "gp.cli.error/v1";',
    ],
  },
];

/** Sources the scan must leave clean: Pi's own native CLIs, near names, and comments. */
export const CLEAN: readonly SourceRow[] = [
  {
    id: "C-NATIVE-CLI",
    label: "a native CLI Pi already runs, or a word that only starts with gp",
    pins: [
      'spawn("rf", ["context", "render", "--no-commit", "--json"]);',
      'execFileSync("git", ["-C", cwd, "rev-parse", "HEAD"]);',
      'const model = "gpt-5"; const device = "gpu";',
      'const flag = "--gp-mode=fast";',
      'const signer = "/usr/bin/gpg";',
    ],
  },
  {
    id: "C-NEAR-NAMES",
    label: "a module or literal that names a graph or a policy, but not GraphPolicyCLI",
    pins: [
      'import { renderGraph } from "./graph-view.js";',
      'import { resolvePolicy } from "./policy.js";',
      'const text = "the graph view and the retry policy";',
      'const schema = "workflow-script/v1";',
      'const code = "RF_USAGE_NOT_IMPLEMENTED";',
    ],
  },
  {
    id: "C-COMMENT",
    label: "a comment that names gp or GraphPolicyCLI is not code",
    pins: [
      '// spawn("gp", ["rpc", "--stdio"]) is how GraphPolicyCLI would be reached\nconst x = 1;',
      "/** graphpolicy.cli.v1 envelopes and GP_CLI_EVAL_REJECTED are read by the adapter, not here. */\nexport const y = 2;",
    ],
  },
];

/** Named residual families of the scan: each member is a pinned quiet row (the scan reports nothing for it). */
export const RESIDUALS: readonly SourceRow[] = [
  {
    id: "R-COMPUTED",
    label: "a binary or module name computed at runtime, so no literal spells it",
    pins: ['spawn(["g", "p"].join(""), argv);', 'const sdk = await import(["graph", "policy", "cli"].join("-"));'],
  },
  {
    id: "R-ENVIRONMENT",
    label: "a binary named only by the environment or a setting",
    pins: ["spawn(process.env.POLICY_BIN ?? fallbackBinary, argv);", 'spawn(settings.policyBinary, ["rpc", "--stdio"]);'],
  },
  {
    id: "R-TRANSITIVE",
    label: "a module that reaches GraphPolicyCLI only through another src module, which is the site and carries the pairing",
    pins: ['import { evaluate } from "./policy-client.js";\nawait evaluate(observation);'],
  },
  {
    id: "R-BINARY-SPELLING",
    label: "the gp binary spelled in another case or as a Windows command shim: the command word is gp or gp.exe exactly as written",
    pins: ['spawn("gp.cmd", argv);', 'spawn("GP", argv);', 'spawn("GP.EXE", argv);'],
  },
];

export interface MutantRow {
  readonly id: string;
  readonly label: string;
  /** The UNUSABLE shape the mutant drive answers. */
  readonly shape: string;
  readonly edits: readonly Edit[];
  /** The exact rule ids the judge must report, in order; [] marks a named residual of the judge (a quiet row). */
  readonly expect: readonly string[];
}

/** Mutant drives: the reference record edited one way each; the judge must refuse each with exactly its rules. */
export const MUTANTS: readonly MutantRow[] = [
  { id: "M-SOURCE-GP", label: "the fallback is recorded as a gp decision", shape: "U-CLI-REFUSAL", edits: [{ op: "set", path: ["decision_source"], value: "gp" }], expect: ["J-SOURCE"] },
  { id: "M-SOURCE-MISSING", label: "no decision_source is recorded", shape: "U-ABSENT", edits: [{ op: "delete", path: ["decision_source"] }], expect: ["J-SOURCE"] },
  {
    id: "M-ACTION-POLICY",
    label: "the action is taken from the stale gp output, not from the fallback",
    shape: "U-STALE-BASIS",
    edits: [{ op: "set", path: ["action"], value: { assign: "policy-candidate-7" } }],
    expect: ["J-ACTION", "J-POLICY-OUTPUT"],
  },
  { id: "M-FALLBACK-NAME", label: "the record names another fallback", shape: "U-OVER-BUDGET", edits: [{ op: "set", path: ["fallback", "name"], value: "priorityFirst" }], expect: ["J-FALLBACK"] },
  { id: "M-REASON", label: "an over-budget answer is recorded as an absent binary", shape: "U-OVER-BUDGET", edits: [{ op: "set", path: ["reason"], value: "absent" }], expect: ["J-REASON"] },
  { id: "M-CODE-RECASED", label: "the producer's refusal code is re-cased", shape: "U-CLI-REFUSAL", edits: [{ op: "set", path: ["refusal_code"], value: "gp_cli_eval_rejected" }], expect: ["J-CODE"] },
  { id: "M-CODE-RELABELLED", label: "the producer's refusal code is relabelled", shape: "U-RPC-REFUSAL", edits: [{ op: "set", path: ["refusal_code"], value: "refused" }], expect: ["J-CODE"] },
  { id: "M-CODE-MISSING", label: "the producer's refusal code is dropped", shape: "U-CLI-REFUSAL", edits: [{ op: "delete", path: ["refusal_code"] }], expect: ["J-CODE"] },
  { id: "M-CODE-FABRICATED", label: "a refusal code is invented for an absent binary", shape: "U-ABSENT", edits: [{ op: "set", path: ["refusal_code"], value: "GP_CLI_INTERNAL" }], expect: ["J-CODE"] },
  { id: "M-SCORE-ZERO", label: "a zero score is written on a refusal", shape: "U-CLI-REFUSAL", edits: [{ op: "set", path: ["score"], value: 0 }], expect: ["J-SCORE"] },
  { id: "M-SCORE-NESTED", label: "an empty score list is written under a detail key", shape: "U-STALE-BASIS", edits: [{ op: "set", path: ["detail", "scores"], value: [] }], expect: ["J-SCORE"] },
  { id: "M-PROBABILITY", label: "a zero probability is written on a refusal", shape: "U-RPC-REFUSAL", edits: [{ op: "set", path: ["probability"], value: 0 }], expect: ["J-PROBABILITY"] },
  { id: "M-LOGPROB-NESTED", label: "a log-probability is written under a detail key", shape: "U-OVER-BUDGET", edits: [{ op: "set", path: ["detail", "logprob"], value: -1.25 }], expect: ["J-PROBABILITY"] },
  { id: "M-PARTIAL-OUTPUT", label: "the partial gp output rides along under an unnamed key", shape: "U-OVER-BUDGET", edits: [{ op: "set", path: ["detail", "gp"], value: { assign: "policy-candidate-7" } }], expect: ["J-POLICY-OUTPUT"] },
  { id: "M-PARTIAL-KEY", label: "the stale gp candidate is recorded as a key", shape: "U-STALE-BASIS", edits: [{ op: "set", path: ["detail", "policy-candidate-7"], value: true }], expect: ["J-POLICY-OUTPUT"] },
  { id: "M-NOT-A-RECORD", label: "the drive returns no record object", shape: "U-ABSENT", edits: [{ op: "replace", value: null }], expect: ["J-RECORD"] },
  { id: "M-DRIVE-THROWS", label: "the drive throws instead of falling back", shape: "U-RPC-REFUSAL", edits: [{ op: "throw", message: "gp refused" }], expect: ["J-RECORD"] },
  {
    id: "R-UNNAMED-NUMBER",
    label: "a number the fake seam did not produce, under a key that names neither a score nor a probability",
    shape: "U-STALE-BASIS",
    edits: [{ op: "set", path: ["detail", "weight"], value: 0.5 }],
    expect: [],
  },
  // wb-qxdr (iii): each claimed probability member, the J-FALLBACK family half, an OWN read of every contract field,
  // the cycle guard and the array guard.
  { id: "M-PROPENSITY", label: "a propensity is written on an absent binary", shape: "U-ABSENT", edits: [{ op: "set", path: ["propensity"], value: 0 }], expect: ["J-PROBABILITY"] },
  { id: "M-LOGIT-NESTED", label: "a logit is written under a detail key", shape: "U-RPC-REFUSAL", edits: [{ op: "set", path: ["detail", "logit"], value: -0.4 }], expect: ["J-PROBABILITY"] },
  { id: "M-LIKELIHOOD", label: "a likelihood is written on a stale basis", shape: "U-STALE-BASIS", edits: [{ op: "set", path: ["likelihood"], value: 0 }], expect: ["J-PROBABILITY"] },
  { id: "M-DISTRIBUTION-NESTED", label: "a distribution is written under a detail key", shape: "U-OVER-BUDGET", edits: [{ op: "set", path: ["detail", "distribution"], value: [] }], expect: ["J-PROBABILITY"] },
  {
    id: "M-FALLBACK-FAMILY",
    label: "the record names the paired fallback's name under another named family",
    shape: "U-CLI-REFUSAL",
    edits: [{ op: "set", path: ["fallback", "family"], value: "priority-first" }],
    expect: ["J-FALLBACK"],
  },
  { id: "M-SOURCE-INHERITED", label: "decision_source is inherited through the prototype, not an own key", shape: "U-ABSENT", edits: [{ op: "inherit", path: ["decision_source"] }], expect: ["J-SOURCE"] },
  { id: "M-ACTION-INHERITED", label: "the action is inherited through the prototype, not an own key", shape: "U-RPC-REFUSAL", edits: [{ op: "inherit", path: ["action"] }], expect: ["J-ACTION"] },
  { id: "M-FALLBACK-INHERITED", label: "the fallback object is inherited through the prototype, not an own key", shape: "U-STALE-BASIS", edits: [{ op: "inherit", path: ["fallback"] }], expect: ["J-FALLBACK"] },
  {
    id: "M-FALLBACK-NAME-INHERITED",
    label: "the fallback's name is inherited inside an own fallback object",
    shape: "U-OVER-BUDGET",
    edits: [{ op: "inherit", path: ["fallback", "name"] }],
    expect: ["J-FALLBACK"],
  },
  { id: "M-REASON-INHERITED", label: "the reason is inherited through the prototype, not an own key", shape: "U-OVER-BUDGET", edits: [{ op: "inherit", path: ["reason"] }], expect: ["J-REASON"] },
  {
    id: "M-CODE-INHERITED",
    label: "the producer's refusal code is inherited through the prototype, not an own key",
    shape: "U-CLI-REFUSAL",
    edits: [{ op: "inherit", path: ["refusal_code"] }],
    expect: ["J-CODE"],
  },
  {
    id: "M-SCORE-BESIDE-CYCLE",
    label: "a score is written beside a cycle in the record: the walk cuts the cycle and still finds the key",
    shape: "U-STALE-BASIS",
    edits: [
      { op: "set", path: ["detail", "score"], value: 0 },
      { op: "link", path: ["detail", "self"], to: ["detail"] },
    ],
    expect: ["J-SCORE"],
  },
  { id: "M-ARRAY-RECORD", label: "the drive returns an array, not a record object", shape: "U-CLI-REFUSAL", edits: [{ op: "replace", value: [] }], expect: ["J-RECORD"] },
  // wb-qxdr F4 escapes, named residuals of the judge (quiet rows): keys Object.keys does not list, and a derived copy
  // of a policy-output string.
  { id: "R-HIDDEN-SCORE", label: "a score written as a non-enumerable own key", shape: "U-CLI-REFUSAL", edits: [{ op: "hide", path: ["score"], value: 0 }], expect: [] },
  { id: "R-SYMBOL-SCORE", label: "a score written under a symbol key", shape: "U-RPC-REFUSAL", edits: [{ op: "symbol", path: ["score"], value: 0 }], expect: [] },
  {
    id: "R-DERIVED-OUTPUT",
    label: "a re-cased copy of the fake seam's policy candidate under an unnamed key",
    shape: "U-STALE-BASIS",
    edits: [{ op: "set", path: ["detail", "note"], value: "POLICY-CANDIDATE-7" }],
    expect: [],
  },
];

export interface PairingRow {
  readonly id: string;
  readonly label: string;
  readonly pairings: readonly Pairing[];
  readonly files: Readonly<Record<string, string>>;
  readonly expect: readonly string[];
}

/** A synthetic gp call site that exports the ready-first fallback readyFirst. */
export const SYNTHETIC_SITE = 'import { spawn } from "node:child_process";\nexport function readyFirst(queue: string[]): string | undefined {\n  return queue[0];\n}\nexport const evaluate = () => spawn("gp", ["rpc", "--stdio"]);\n';

/** Synthetic trees for the pairing judge: each row's files are scanned and its pairings judged against them. */
export const PAIRING_CASES: readonly PairingRow[] = [
  { id: "P-PAIRED", label: "a site paired with a named fallback it exports", pairings: [{ file: "src/policy.ts", family: "ready-first", fallback: "readyFirst" }], files: { "src/policy.ts": SYNTHETIC_SITE }, expect: [] },
  {
    id: "P-REEXPORTED",
    label: "a site paired with a named fallback it re-exports from another module",
    pairings: [{ file: "src/policy.ts", family: "ready-first", fallback: "readyFirst" }],
    files: { "src/policy.ts": 'export { readyFirst } from "./fallbacks.js";\nexport const evaluate = () => spawn("gp", ["rpc", "--stdio"]);\n' },
    expect: [],
  },
  { id: "P-UNPAIRED", label: "a site with no pairing", pairings: [], files: { "src/policy.ts": SYNTHETIC_SITE }, expect: ["P-UNPAIRED"] },
  {
    id: "P-STALE",
    label: "a pairing whose file reaches no GraphPolicyCLI touchpoint",
    pairings: [{ file: "src/plain.ts", family: "ready-first", fallback: "readyFirst" }],
    files: { "src/plain.ts": "export function readyFirst(queue: string[]): string | undefined {\n  return queue[0];\n}\n" },
    expect: ["P-STALE"],
  },
  {
    id: "P-DUPLICATE",
    label: "one site paired twice",
    pairings: [
      { file: "src/policy.ts", family: "ready-first", fallback: "readyFirst" },
      { file: "src/policy.ts", family: "priority-first", fallback: "readyFirst" },
    ],
    files: { "src/policy.ts": SYNTHETIC_SITE },
    expect: ["P-DUPLICATE"],
  },
  { id: "P-FAMILY", label: "a pairing with a family outside the named fallbacks", pairings: [{ file: "src/policy.ts", family: "random", fallback: "readyFirst" }], files: { "src/policy.ts": SYNTHETIC_SITE }, expect: ["P-FAMILY"] },
  {
    id: "P-UNEXPORTED",
    label: "a pairing whose fallback the site declares but does not export",
    pairings: [{ file: "src/policy.ts", family: "ready-first", fallback: "readyFirst" }],
    files: { "src/policy.ts": SYNTHETIC_SITE.replace("export function readyFirst", "function readyFirst") },
    expect: ["P-UNEXPORTED"],
  },
];

/** One entry of a synthetic tree: a regular file, a symbolic link (its target relative to the link's directory), or a FIFO. */
export type WalkEntry = { readonly kind: "file"; readonly text: string } | { readonly kind: "symlink"; readonly target: string } | { readonly kind: "fifo" };

export interface WalkRow {
  readonly id: string;
  readonly label: string;
  /** The tree a test plants under a scratch root, keyed by root-relative POSIX path. */
  readonly tree: Readonly<Record<string, WalkEntry>>;
  /** What srcFiles(root) must return, in order, or the message it must throw. */
  readonly expect: { readonly files: readonly string[] } | { readonly throws: string };
}

const PLAIN: WalkEntry = { kind: "file", text: "export const plain = 1;\n" };

/** wb-qxdr (ii): every property srcFiles claims, each on a synthetic tree planted on rule-11 scratch. */
export const WALKS: readonly WalkRow[] = [
  { id: "W-HIDDEN", label: "a hidden file is walked", tree: { "src/.hidden.ts": PLAIN, "src/plain.ts": PLAIN }, expect: { files: ["src/.hidden.ts", "src/plain.ts"] } },
  {
    id: "W-EXTENSIONLESS",
    label: "an extensionless file in a nested directory is walked",
    tree: { "src/nested/deeper/noext": PLAIN, "src/plain.ts": PLAIN },
    expect: { files: ["src/nested/deeper/noext", "src/plain.ts"] },
  },
  {
    id: "W-SYMLINKED-FILE",
    label: "a symlinked file is followed and listed under its link path, beside its target",
    tree: { "src/link.ts": { kind: "symlink", target: "real/target.ts" }, "src/real/target.ts": PLAIN },
    expect: { files: ["src/link.ts", "src/real/target.ts"] },
  },
  {
    id: "W-DIRECTORY-ALIAS",
    label: "a second link to a real directory already walked is not walked again",
    tree: { "src/real/b.ts": PLAIN, "src/zalias": { kind: "symlink", target: "real" } },
    expect: { files: ["src/real/b.ts"] },
  },
  {
    id: "W-DIRECTORY-LOOP",
    label: "a directory symlink back to the walked directory ends the walk",
    tree: { "src/a.ts": PLAIN, "src/loop": { kind: "symlink", target: "." } },
    expect: { files: ["src/a.ts"] },
  },
  {
    id: "W-FIFO",
    label: "a FIFO is neither a regular file nor a directory, so the walk fails closed",
    tree: { "src/a.ts": PLAIN, "src/pipe": { kind: "fifo" } },
    expect: { throws: "src/pipe: neither a regular file nor a directory under the scan root" },
  },
];

// ---- ROWS: every judged row, in census order, as the roster carries it ----

export interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly label: string;
  /** The SHA-256 of each pin as written (a source, a fake seam, a mutant's shape, edits and rules, or a pairing case). */
  readonly pins: readonly string[];
  /** The registered test of this row. */
  readonly test: string;
}

const digest = (value: string): string => createHash("sha256").update(value).digest("hex");
const row = (table: string, id: string, label: string, pins: readonly string[]): JudgedRow => ({ table, id, label, pins: pins.map(digest), test: `${table} ${id}` });

export const ROWS: readonly JudgedRow[] = [
  ...TOUCHPOINTS.map(entry => row("TOUCHPOINTS", entry.id, entry.label, entry.pins)),
  ...CLEAN.map(entry => row("CLEAN", entry.id, entry.label, entry.pins)),
  ...RESIDUALS.map(entry => row("RESIDUALS", entry.id, entry.label, entry.pins)),
  ...FAMILIES.map(family => row("FAMILIES", family, `the named deterministic fallback ${family}`, [])),
  ...UNUSABLE.map(entry => row("UNUSABLE", entry.id, entry.label, [JSON.stringify({ reason: entry.reason, code: entry.code ?? null, seam: entry.seam })])),
  ...MUTANTS.map(entry => row("MUTANTS", entry.id, entry.label, [JSON.stringify({ shape: entry.shape, edits: entry.edits, expect: entry.expect })])),
  ...PAIRING_CASES.map(entry => row("PAIRING_CASES", entry.id, entry.label, [JSON.stringify({ pairings: entry.pairings, files: entry.files, expect: entry.expect })])),
  ...WALKS.map(entry => row("WALKS", entry.id, entry.label, [JSON.stringify({ tree: entry.tree, expect: entry.expect })])),
];

/** The named residual families and their quiet-row members (the scan's, then the judge's). */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  "R-COMPUTED": ["RESIDUALS R-COMPUTED"],
  "R-ENVIRONMENT": ["RESIDUALS R-ENVIRONMENT"],
  "R-TRANSITIVE": ["RESIDUALS R-TRANSITIVE"],
  "R-BINARY-SPELLING": ["RESIDUALS R-BINARY-SPELLING"],
  "R-UNNAMED-NUMBER": ["MUTANTS R-UNNAMED-NUMBER"],
  "R-UNWALKED-KEY": ["MUTANTS R-HIDDEN-SCORE", "MUTANTS R-SYMBOL-SCORE"],
  "R-DERIVED-OUTPUT": ["MUTANTS R-DERIVED-OUTPUT"],
};
