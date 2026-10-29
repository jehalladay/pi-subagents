/**
 * wb-tz2.3 (HX-ORIGINAL-GOALS-CLOSURE-R3): the HyperUnix result-representation successor gate, STANDING LEG AND RE-VENDOR
 * TRIPWIRE - the part of the bead that lands while no successor @hyperunix/sdk exists.
 *
 * OWNER FILING (the outside anchor): the tracked bead export .beads/issues.jsonl, row wb-tz2.3, read through its description
 * only, so a note a lane appends later changes nothing read. The export holds exactly one row whose id decodes to wb-tz2.3
 * (every row is parsed, so an id matches by value, never by spelling), and the description exactly one STATEMENT, ACCEPTANCE
 * and SURFACES line and one Standing item (FILING COUNTS), so no duplicate can take the reading over. Its STATEMENT ("When <trigger> (<cites>), Pi shall <duty>; until then <standing>.") gives clauses
 * statement.1-3; its ACCEPTANCE list gives acceptance.1 (the "Standing:" item) and acceptance.2.1-2.3 (the "On landing:" item
 * split at its semicolons). Each clause maps to exactly one judged row or to the PARKED remainder (CLAUSE_ROWS), and every
 * row's pins are generated from an anchor outside this file:
 *   T statement.1, the trigger: one pin per top-level declaration of the vendored SDK module that declares SDK_REPRESENTATION
 *     (resolved through the SDK's dist/index.js) and names it - today the constant, resultToJson and resultFromJson. The
 *     trigger has not fired while the vendored tag reads hyperunix.result/1.
 *   X statement.2, the duty to extend the reader adapter: one pin per src file of the filing's SURFACES - the registered
 *     hyperunix.find provider returns the SDK-stamped output under its contract, the reader adapter projects that output and
 *     native-evidence projects it. A re-vendor whose SDK tag moves reds T and X until the adapter moves with it: the tripwire.
 *   R statement.3, the standing refusal: one pin per family the clause names (contract, representation). The family's
 *     accepted tag (HYPERUNIX_FIND_CONTRACT, SDK_REPRESENTATION) is accepted on the same reading, and four neighbours are
 *     refused as validation with no evidence: its predecessor, its digit extension (a prefix comparison would admit it), its
 *     zero-padded spelling (a numeric comparison would admit it) and its truncation without a version number (a reverse
 *     prefix comparison would admit it). The vendored decoder refuses the representation neighbours too.
 *   S acceptance.1, the standing fixtures: one pin per tag the item names (hyperunix.find/v2, hyperunix.result/2) - each is
 *     the successor of its family's accepted tag and is refused as validation with no evidence (the decoder refuses the
 *     representation one) - and one pin per test file it cites (test/workbench-hyperunix-observer.test.ts, H5). The file pin
 *     reads that suite through a TypeScript type checker over the one file, so every name binds by scope, never by spelling:
 *     an it.each call counts only when its `it` resolves to the suite's vitest import; its describe path (each enclosing
 *     callback belongs to a plain vitest describe with a literal title and holds the statement directly - no skip, skipIf or
 *     other modifier, no if, loop or helper around it; otherwise the path names the break) and title are unique among the
 *     suite's it.each calls; its table is the array its argument resolves to by scope, with exactly one declaration, no
 *     redeclaration the checker reports for its name (nor for `it` or `describe`) and no reference but it.each arguments, so a
 *     same-name table in another scope binds to no call; a row names a standing tag by
 *     its first string and its reading sets the tag's family property (contract, representation) to that tag; and its
 *     callback is the one measured at the cut (sha256_16 of its text). The witness lists every call with a row naming a
 *     standing tag: path > title, binding, callback digest and rows. S BINDING runs the same reader over planted suites.
 *   C acceptance.2.2, the carrier: one pin per src file of the filing's SURFACES plus one for the rest of src. Every string
 *     token naming a hyperunix.result/<n> tag (whole or embedded: the TypeScript parser's string text, never a comment or a
 *     regular expression) sits at the carrier (hyperunix-observer.ts, the adapter's REPRESENTATION) or at the asserted
 *     exclusion (native-evidence.ts, its comparison), and each spells the vendored tag. The wb-cax.8 census cannot see this
 *     tag (its whole-id form ends in /v<digits>), so this row is its single-carrier check. A true single carrier is blocked by
 *     two landed guards this cut keeps: S4 of test/workbench-hx-evidence-standing.test.ts refuses an HX-module import into
 *     native-evidence.ts, and H7 of test/workbench-hyperunix-observer.test.ts pins the observer to its four imports. So the
 *     exclusion is asserted, never silent: a half-moved re-vendor reds C, and the exclusion row is deleted in the commit that
 *     relaxes a guard and composes the constant.
 *   PARKED acceptance.2.1 (one re-vendor commit moves the tarball bytes, the vendor/README.md sha table and package.json
 *     together) and acceptance.2.3 (the full observer suite re-runs green against the successor): the external remainder,
 *     owed once HX publishes a successor. T is their re-entry: it reds the moment the vendored tag moves.
 * GATE (re-measured read-only at the cut, no fetch): HyperUnix-CLI origin/main 481dcdd4 sdk/typescript/package.json version
 * 0.1.0, sdk/typescript/src/result.ts:157 SDK_REPRESENTATION "hyperunix.result/1"; no other hyperunix.result/<n> tag under
 * sdk/ or docs/programs; docs/programs/original-goals-closure-2026-10-16/requirements.jsonl:6 HXGC-EPI-002 status DESIGN,
 * graduated false. The successor is unpublished, so every row is green today and PARKED stays owed.
 * FROZEN SHAPE (standing rule 16): the row shape `${row}:${clause}:${pins}`, every clause key's row, and every pin's line
 * `${id} | ${requirement} | ${witness}` (PIN_LINES, the witness measured from the subject) are literals; one case per pin
 * runs against its line and the suite is held to one collected case per pin. Pins are generated from the anchors above, so a
 * member dropped from a table here leaves its generated pin without an entry, and a line dropped alone leaves a generated pin
 * without its line; both red.
 * Not claimed: an R neighbour derivation (predecessor, digit extension, zero padding, truncation) replaced by another
 * derivation together with its frozen witness; an edit of the judging code itself (a parser, the type checker's binding or a
 * comparison replaced by a constant); a representation tag assembled at run time instead of spelled in one string token
 * (concatenation, a template substitution), which C does not read; what the helpers and free variables of a cited callback do
 * (only the callback's own text is pinned) and whether a cited row's reading is otherwise valid; a case filtered out at run
 * time by the runner's configuration or command line (the gate's own run judges tier truth); an export row that repeats a JSON
 * key (a JSON reader keeps the last one).
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, allocates no scratch (WS is a string, never created);
 * reads the bead export, the src tree, the vendored SDK's dist/index.js and its declaring module, and the cited suite.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { resultFromJson, resultToJson, SDK_REPRESENTATION } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, expectTypeOf, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { HYPERUNIX_FIND_CONTRACT, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-tz2.3";
const SDK_DIST = join(ROOT, "node_modules/@hyperunix/sdk/dist");
/** A version tag of either family: hyperunix.find/v<n> (the provider contract) or hyperunix.result/<n> (the SDK representation). */
const VERSION_TAG = /hyperunix\.(?:find\/v\d+|result\/\d+)/g;
/** A representation tag anywhere inside string text, and the whole text of a token that is exactly one. */
const REPRESENTATION_TAG = /hyperunix\.result\/\d+/g;
const WHOLE_REPRESENTATION = /^hyperunix\.result\/\d+$/;
const WS = "/workspace/hx-successor-gate";
const BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:tester" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-28T04:00:00Z",
  observedAt: "2026-10-28T04:00:01Z",
};
/** Fixture source text for templates, spelled without a placeholder inside a plain string. */
const TICK = "`";
const slot = (expression: string): string => "$" + "{" + expression + "}";

type Json = { [key: string]: JsonValue };
type RowId = "T" | "X" | "R" | "S" | "C";
interface Pin {
  readonly id: string;
  readonly requirement: string;
  readonly witness: () => Promise<string>;
}
interface Row {
  readonly id: RowId;
  readonly clause: string;
  readonly pins: readonly Pin[];
}
/** What the census reads of the owner filing. */
interface Filing {
  /** Clause key (statement.1-3, acceptance.<item>[.<part>]) -> its text, in filing order. */
  readonly clauses: ReadonlyMap<string, string>;
  /** The version tags the standing item names, and the test files it cites. */
  readonly standingTags: readonly string[];
  readonly standingFixtures: readonly string[];
  /** The families statement.3 names ("unknown <a>/<b> versions"). */
  readonly families: readonly string[];
  /** The src files of the SURFACES line, in filing order. */
  readonly srcSurfaces: readonly string[];
  /** How many export rows carry the bead's id, and how many times the description holds each heading the reading uses. */
  readonly counts: Readonly<Record<string, number>>;
}
interface Site {
  readonly file: string;
  readonly tag: string;
  readonly whole: boolean;
  readonly context: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const jsonRecord = (value: JsonValue | undefined): Json | undefined =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;

/** The descriptions of every row of the tracker export whose id is the bead's: every row is parsed, so an id matches by value, never by spelling. */
function filingRows(exported: string): string[] {
  const rows: string[] = [];
  for (const line of exported.split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === BEAD) rows.push(typeof row.description === "string" ? row.description : "");
  }
  return rows;
}
function readFiling(rows: readonly string[]): Filing {
  const text = rows[0] ?? "";
  const statement = /^STATEMENT: When (.+?) \([^)]*\), Pi shall (.+?); until then (.+?)\.$/m.exec(text);
  const parts = statement === null ? [] : statement.slice(1);
  const items = [...(/^ACCEPTANCE: \[(.+)\]$/m.exec(text)?.[1] ?? "").matchAll(/(["'])((?:Standing|On landing): .*?)\1(?=, |$)/g)].map(match => match[2] ?? "");
  const clauses = new Map<string, string>(parts.map((part, index) => [`statement.${index + 1}`, part]));
  for (const [index, item] of items.entries()) {
    if (item.startsWith("Standing: ")) clauses.set(`acceptance.${index + 1}`, item.slice("Standing: ".length));
    else for (const [part, clause] of item.slice("On landing: ".length).replace(/\.$/, "").split("; ").entries()) clauses.set(`acceptance.${index + 1}.${part + 1}`, clause);
  }
  const standing = items.find(item => item.startsWith("Standing: ")) ?? "";
  const headings = (heading: string): number => text.split("\n").filter(line => line.startsWith(`${heading}: `)).length;
  return {
    clauses,
    standingTags: [...standing.matchAll(VERSION_TAG)].map(match => match[0]),
    standingFixtures: [...standing.matchAll(/test\/[\w.-]+\.test\.ts/g)].map(match => match[0]),
    families: /unknown (\S+) versions/.exec(parts[2] ?? "")?.[1]?.split("/") ?? [],
    srcSurfaces: (/^SURFACES: (.+)$/m.exec(text)?.[1] ?? "").split(", ").map(entry => entry.split(":")[0] ?? "").filter(path => path.startsWith("src/")),
    counts: {
      rows: rows.length, STATEMENT: headings("STATEMENT"), ACCEPTANCE: headings("ACCEPTANCE"), SURFACES: headings("SURFACES"),
      Standing: items.filter(item => item.startsWith("Standing: ")).length,
    },
  };
}
const FILING_ROWS = filingRows(readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8"));
const FILING = readFiling(FILING_ROWS);

/** The tag each family accepts today, from its source of truth: the registered provider's contract and the vendored SDK's tag. */
const FAMILY_TAGS: Readonly<Record<string, string>> = { contract: HYPERUNIX_FIND_CONTRACT, representation: SDK_REPRESENTATION };
const versioned = (tag: string): RegExpExecArray | null => /^(.*?)(\d+)$/.exec(tag);
const unversioned = (tag: string): string => `<${tag} carries no version>`;
/** The tag with its trailing version number moved by `step`. */
function shifted(tag: string, step: number): string {
  const match = versioned(tag);
  return match === null ? unversioned(tag) : `${match[1]}${Number(match[2]) + step}`;
}
const successor = (tag: string): string => shifted(tag, 1);
const predecessor = (tag: string): string => shifted(tag, -1);
/** The tag with one more digit: a prefix comparison would still admit it. */
const extension = (tag: string): string => `${tag}0`;
/** The tag with a leading zero on its version number: a numeric comparison would still admit it. */
function zeroPadded(tag: string): string {
  const match = versioned(tag);
  return match === null ? unversioned(tag) : `${match[1]}0${match[2]}`;
}
/** The tag without its version number: a reverse prefix comparison (the accepted tag starts with it) would admit it. */
const truncated = (tag: string): string => versioned(tag)?.[1] ?? unversioned(tag);
/** The family whose accepted tag carries the same name before its version number. */
const familyOf = (tag: string): string | undefined =>
  Object.keys(FAMILY_TAGS).find(family => versioned(FAMILY_TAGS[family] ?? "")?.[1] === versioned(tag)?.[1]);

/** A minimal SDK result document under `representation`: an unlicensed incomplete find with no rows. */
function sdkDocument(representation: string = SDK_REPRESENTATION): Json {
  return {
    representation, operation: "find", rows: [], rows_retained: true, coverage: [],
    status: { exit_code: 0, signal: null, streams: [], terminal_reached: true, frames_total: 0 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [], view: null, cost: null,
    transport: { started_at: "2026-10-28T04:00:00.000Z", startup_latency_s: 0, process_duration_s: 0, stdout_bytes: 0, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 0 },
    workspace_root: WS, terminal: "partial", truth: null,
    coverage_summary: { modes: [], completeness: "incomplete", licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: 0 },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null, digest_source: "absent", execution_id: null, budget_dimension: null, extensions: {},
  };
}
/** What the registered hyperunix.find provider returns for the SDK-decoded document, through the capability registry. */
async function providerOutput(): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  const native = resultFromJson(sdkDocument());
  registerHyperUnixFind(registry, { find: async () => native, runtime: async () => ({ version: "0.1.0", binarySha256: BINARY }), close: async () => {} }, WS);
  return registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, { grants: ["hyperunix:read"], signal: new AbortController().signal });
}
/** The provider output with one family's tag replaced. */
function withTag(reading: JsonValue, family: string, tag: string): JsonValue {
  const value = jsonRecord(reading);
  const source = jsonRecord(value?.source);
  if (value === undefined || source === undefined) throw new Error("the provider output carries no source object");
  return family === "contract" ? { ...value, contract: tag } : { ...value, source: { ...source, representation: tag } };
}
/** How a call refuses: the error's name and message, or that it did not refuse. */
function refusal(run: () => unknown): string {
  try {
    run();
  } catch (error) {
    return error instanceof Error ? `${error.name}: ${error.message}` : `non-error ${String(error)}`;
  }
  return "no refusal";
}
/** The reader adapter's verdict on a reading: accepted with its snapshot count, or the category of its typed refusal. */
function adapterOutcome(reading: JsonValue): string {
  try {
    return `accepted(${hyperunixTopology(reading, CONTEXT).snapshots.length})`;
  } catch (error) {
    return error instanceof CapabilityError ? error.category : `untyped ${String(error)}`;
  }
}
const evidenceOutcome = (reading: JsonValue): string => JSON.stringify(nativeEvidence("hyperunix.find", reading));
function decoderOutcome(tag: string): string {
  const refused = refusal(() => resultFromJson(sdkDocument(tag)));
  return refused === "no refusal" ? "decoded" : refused.startsWith("TypeError: ") ? "decoder-refused" : refused;
}
/** One family tag on the provider's own output: the adapter's verdict, the evidence projection and, for a representation, the decoder. */
async function probe(family: string, tag: string): Promise<string> {
  const reading = withTag(await providerOutput(), family, tag);
  return `${tag}|${adapterOutcome(reading)}|${evidenceOutcome(reading)}${family === "representation" ? `|${decoderOutcome(tag)}` : ""}`;
}

/** Every identifier named `name` under `node`. */
function mentions(node: ts.Node, name: string): boolean {
  if (ts.isIdentifier(node) && node.text === name) return true;
  return ts.forEachChild(node, child => (mentions(child, name) ? true : undefined)) === true;
}
function declarationName(statement: ts.Statement): string {
  if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) return statement.name?.text ?? "<anonymous>";
  if (ts.isVariableStatement(statement)) {
    const [first] = statement.declarationList.declarations;
    if (first !== undefined && ts.isIdentifier(first.name)) return first.name.text;
  }
  return `<${ts.SyntaxKind[statement.kind]}>`;
}
const parse = (path: string, kind: ts.ScriptKind): ts.SourceFile => ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, kind);
/** The top-level declarations of the vendored SDK module that declares SDK_REPRESENTATION which name it, in source order. */
function sdkTagSites(): string[] {
  const declaring = parse(join(SDK_DIST, "index.js"), ts.ScriptKind.JS).statements.filter(ts.isExportDeclaration)
    .filter(declaration => declaration.exportClause !== undefined && ts.isNamedExports(declaration.exportClause) &&
      declaration.exportClause.elements.some(element => element.name.text === "SDK_REPRESENTATION"))
    .flatMap(declaration => (declaration.moduleSpecifier !== undefined && ts.isStringLiteral(declaration.moduleSpecifier) ? [declaration.moduleSpecifier.text] : []));
  if (declaring.length !== 1) return [`<${declaring.length} modules export SDK_REPRESENTATION>`];
  return parse(join(SDK_DIST, declaring[0] ?? ""), ts.ScriptKind.JS).statements.filter(statement => mentions(statement, "SDK_REPRESENTATION")).map(declarationName);
}

/** A string-text node's kind by name (ts.SyntaxKind's reverse map reads TemplateTail as its alias LastTemplateToken). */
function textKind(node: ts.Node): string {
  if (ts.isStringLiteral(node)) return "StringLiteral";
  if (ts.isNoSubstitutionTemplateLiteral(node)) return "NoSubstitutionTemplateLiteral";
  if (ts.isTemplateHead(node)) return "TemplateHead";
  if (ts.isTemplateMiddle(node)) return "TemplateMiddle";
  return ts.isTemplateTail(node) ? "TemplateTail" : ts.SyntaxKind[node.kind];
}
/** The tag's syntactic place: a whole token by what binds or compares it, an embedded one by its string-text node kind. */
function siteContext(node: ts.Node, whole: boolean, source: ts.SourceFile): string {
  if (!whole) return textKind(node);
  const parent = node.parent;
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) return `const ${parent.name.text}`;
  if (ts.isBinaryExpression(parent)) return `${parent.operatorToken.getText(source)} ${(parent.left === node ? parent.right : parent.left).getText(source)}`;
  return ts.SyntaxKind[parent.kind];
}
/** Every representation tag in the string text of the given path -> source map, in file then source order. */
function tagSites(files: ReadonlyMap<string, string>): Site[] {
  const sites: Site[] = [];
  for (const [file, text] of files) {
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        const whole = (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && WHOLE_REPRESENTATION.test(node.text);
        for (const match of node.text.matchAll(REPRESENTATION_TAG)) sites.push({ file, tag: match[0], whole, context: siteContext(node, whole, source) });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return sites;
}
const describeSite = (site: Site): string =>
  `${site.whole ? "whole" : "embedded"} ${site.tag}${site.tag === SDK_REPRESENTATION ? "" : " (not the vendored tag)"} @ ${site.context}`;
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).sort().flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : [];
  });
}
let srcSites: Site[] | undefined;
/** Every representation tag in src, read once. */
function srcTagSites(): Site[] {
  srcSites ??= tagSites(new Map(sourceFiles(join(ROOT, "src")).map(path => [relative(ROOT, path), readFileSync(path, "utf8")])));
  return srcSites;
}

/** TypeScript diagnostics that mean a name is declared twice in one scope: a duplicate identifier, a redeclared block-scoped variable, an import
 * conflicting with a local declaration, a var initialised beside a block-scoped declaration, a duplicate function implementation. */
const REDECLARATION_CODES: ReadonlySet<number> = new Set([2300, 2393, 2440, 2451, 2481]);
interface CheckedSuite {
  readonly source: ts.SourceFile;
  readonly checker: ts.TypeChecker;
  /** The lines where the checker reports `name` declared twice in one scope (the binder keeps a redeclared block-scoped name as its own symbol). */
  readonly redeclared: (name: string) => number[];
}
/** A suite read by a type checker over that one file (no lib, no module resolution), so a name binds to its declaration by scope. */
function checkedSuite(file: string, text: string): CheckedSuite {
  const parsed = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const host: ts.CompilerHost = {
    getSourceFile: name => (name === file ? parsed : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "/",
    getCanonicalFileName: name => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === file,
    readFile: name => (name === file ? text : undefined),
  };
  const program = ts.createProgram({ rootNames: [file], options: { noLib: true, noResolve: true, types: [] }, host });
  const source = program.getSourceFile(file) ?? parsed;
  let redeclarations: readonly ts.Diagnostic[] | undefined;
  const redeclared = (name: string): number[] => {
    redeclarations ??= program.getSemanticDiagnostics(source).filter(diagnostic => REDECLARATION_CODES.has(diagnostic.code));
    return redeclarations.flatMap(diagnostic => (diagnostic.start !== undefined && text.slice(diagnostic.start, diagnostic.start + (diagnostic.length ?? 0)) === name
      ? [source.getLineAndCharacterOfPosition(diagnostic.start).line + 1] : [])).sort((left, right) => left - right);
  };
  return { source, checker: program.getTypeChecker(), redeclared };
}
/** Whether `node` is the suite's binding of vitest's export `name`: an identifier the checker resolves to a value import from "vitest", never redeclared. */
function isVitest(suite: CheckedSuite, node: ts.Node, name: string): boolean {
  if (!ts.isIdentifier(node) || suite.redeclared(node.text).length > 0) return false;
  const declarations = suite.checker.getSymbolAtLocation(node)?.declarations ?? [];
  const [specifier] = declarations;
  if (declarations.length !== 1 || specifier === undefined || !ts.isImportSpecifier(specifier) || specifier.isTypeOnly) return false;
  const clause = specifier.parent.parent;
  const from = clause.parent.moduleSpecifier;
  return clause.phaseModifier !== ts.SyntaxKind.TypeKeyword && (specifier.propertyName ?? specifier.name).text === name && ts.isStringLiteral(from) &&
    from.text === "vitest";
}
/** The plain vitest describe titles that register a call's statement unconditionally at collection, outermost first, or the break. */
function registrationPath(checked: CheckedSuite, call: ts.CallExpression): string {
  const titles: string[] = [];
  let statement: ts.Node = call.parent;
  while (ts.isExpressionStatement(statement) && !ts.isSourceFile(statement.parent)) {
    const body = statement.parent;
    const callback = body.parent;
    const describeCall = callback?.parent;
    if (!ts.isBlock(body) || callback === undefined || !(ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) || callback.body !== body ||
      describeCall === undefined || !ts.isCallExpression(describeCall) || describeCall.arguments[1] !== callback) {
      return "<registered inside a block that is not a describe callback>";
    }
    const [title] = describeCall.arguments;
    if (!isVitest(checked, describeCall.expression, "describe") || title === undefined || !ts.isStringLiteralLike(title)) {
      return `<registered under ${describeCall.expression.getText(checked.source)}>`;
    }
    titles.unshift(title.text);
    statement = describeCall.parent;
  }
  return ts.isExpressionStatement(statement) ? titles.join(" > ") : "<not registered by a statement of its own>";
}
/** The array literal an expression stands for, through `as const`, `satisfies` and parentheses. */
function arrayLiteral(expression: ts.Expression | undefined): ts.ArrayLiteralExpression | undefined {
  let current = expression;
  while (current !== undefined && (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current))) current = current.expression;
  return current !== undefined && ts.isArrayLiteralExpression(current) ? current : undefined;
}
/** Every identifier the checker binds to `symbol` (shorthand properties and export specifiers included), its declaration's name too. */
function references(checker: ts.TypeChecker, source: ts.SourceFile, symbol: ts.Symbol): ts.Identifier[] {
  const found: ts.Identifier[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === symbol.name) {
      const parent = node.parent;
      const bound = ts.isShorthandPropertyAssignment(parent) && parent.name === node ? checker.getShorthandAssignmentValueSymbol(parent)
        : ts.isExportSpecifier(parent) ? checker.getExportSpecifierLocalTargetSymbol(parent) : checker.getSymbolAtLocation(node);
      if (bound === symbol) found.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** The rows an it.each table argument iterates and how it binds: an inline array, or an identifier with one array declaration read nowhere else. */
function tableBinding(suite: CheckedSuite, table: ts.Expression, tableArguments: ReadonlySet<ts.Node>): { readonly rows: readonly ts.Expression[]; readonly binding: string } {
  const { checker, source } = suite;
  const inline = arrayLiteral(table);
  if (inline !== undefined) return { rows: inline.elements, binding: "inline table" };
  if (!ts.isIdentifier(table)) return { rows: [], binding: `<table ${table.getText(source)}>` };
  const symbol = checker.getSymbolAtLocation(table);
  const declarations = symbol?.declarations ?? [];
  const rows = declarations.flatMap(declaration => (ts.isVariableDeclaration(declaration) ? arrayLiteral(declaration.initializer)?.elements ?? [] : []));
  const [declaration] = declarations;
  if (symbol === undefined || declaration === undefined || declarations.length !== 1) return { rows, binding: `<table ${table.text}: ${declarations.length} declarations>` };
  const redeclared = suite.redeclared(table.text);
  if (redeclared.length > 0) return { rows, binding: `<table ${table.text} redeclared in its scope at line ${redeclared.join(", ")}>` };
  const elsewhere = references(checker, source, symbol).filter(reference => reference.parent !== declaration && !tableArguments.has(reference))
    .map(reference => source.getLineAndCharacterOfPosition(reference.getStart(source)).line + 1);
  return { rows, binding: elsewhere.length === 0 ? `table ${table.text}` : `<table ${table.text} also referenced at line ${elsewhere.join(", ")}>` };
}
/** Every value a reading sets a property named `family` to, in source order. */
function familyValues(reading: ts.Node | undefined, family: string, source: ts.SourceFile): string[] {
  const values: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === family)
      values.push(ts.isStringLiteralLike(node.initializer) ? node.initializer.text : `<${node.initializer.getText(source)}>`);
    ts.forEachChild(node, visit);
  };
  if (reading !== undefined) visit(reading);
  return values;
}
/** A table row naming a standing tag (its first string ends with " <tag>"), with what its reading sets the tag's family property to. */
function standingRows(row: ts.Expression, tags: readonly string[], source: ts.SourceFile): string[] {
  const [name, reading] = arrayLiteral(row)?.elements ?? [];
  if (name === undefined || !ts.isStringLiteralLike(name)) return [];
  return tags.filter(tag => name.text.endsWith(` ${tag}`)).map(tag => {
    const family = familyOf(tag) ?? "<no family>";
    return `${name.text} (${family}: ${familyValues(reading, family, source).join(" | ") || "not set"})`;
  });
}
/** The S file pin's witness over a cited suite: every vitest it.each call whose table carries a row naming a standing tag. */
function standingFixtureLines(file: string, text: string, tags: readonly string[]): string[] {
  const suite = checkedSuite(file, text);
  const { source } = suite;
  const calls: { readonly key: string; readonly table: ts.Expression; readonly callback: ts.Expression | undefined }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isCallExpression(node.expression)) {
      const each = node.expression;
      const [table] = each.arguments;
      const [title, callback] = node.arguments;
      if (ts.isPropertyAccessExpression(each.expression) && each.expression.name.text === "each" && isVitest(suite, each.expression.expression, "it") &&
        table !== undefined && title !== undefined && ts.isStringLiteralLike(title)) {
        const path = registrationPath(suite, node);
        calls.push({ key: path === "" ? title.text : `${path} > ${title.text}`, table, callback });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  const tableArguments = new Set<ts.Node>(calls.map(call => call.table));
  return calls.flatMap(call => {
    const { rows, binding } = tableBinding(suite, call.table, tableArguments);
    const named = rows.flatMap(row => standingRows(row, tags, source));
    if (named.length === 0) return [];
    const shared = calls.filter(other => other.key === call.key).length > 1 ? " <title shared by another it.each call>" : "";
    const digest = call.callback === undefined ? "<no callback>" : createHash("sha256").update(call.callback.getText(source)).digest("hex").slice(0, 16);
    return [`${call.key}${shared} {${binding}, callback sha256_16 ${digest}}: ${named.join(", ")}`];
  });
}

/** T: what each SDK declaration that names SDK_REPRESENTATION does with the tag. */
const T_SITES: Readonly<Record<string, { readonly requirement: string; readonly witness: () => string }>> = {
  SDK_REPRESENTATION: { requirement: "the vendored SDK exports its representation tag", witness: () => SDK_REPRESENTATION },
  resultToJson: { requirement: "the vendored SDK serialiser stamps the tag on a decoded result", witness: () => String(resultToJson(resultFromJson(sdkDocument())).representation) },
  resultFromJson: {
    requirement: "the vendored SDK decoder refuses a document under the tag's successor",
    witness: () => refusal(() => resultFromJson(sdkDocument(successor(SDK_REPRESENTATION)))),
  },
};
/** X: each SURFACES src file's consumer of the registered provider's output. */
const X_CONSUMERS: Readonly<Record<string, { readonly requirement: string; readonly witness: () => Promise<string> }>> = {
  "src/workbench/hyperunix-observer.ts": {
    requirement: "the reader adapter projects the registered provider's output",
    witness: async () => hyperunixTopology(await providerOutput(), CONTEXT).snapshots.map(snapshot => `${snapshot.kind}|${snapshot.coverage}|${snapshot.node.statusTone}`).join("; "),
  },
  "src/workbench/native-evidence.ts": {
    requirement: "native-evidence projects the registered provider's output as HyperUnix evidence",
    witness: async () => JSON.stringify(nativeEvidence("hyperunix.find", await providerOutput())),
  },
  "src/workbench/providers/hyperunix.ts": {
    requirement: "the registered hyperunix.find provider returns the SDK-stamped output under its contract",
    witness: async () => {
      const output = jsonRecord(await providerOutput());
      return `${String(output?.contract)}|${String(jsonRecord(output?.source)?.representation)}`;
    },
  },
};
/** C: the role each SURFACES src file plays for the representation tag. */
const CARRIER_ROLES: Readonly<Record<string, string>> = {
  "src/workbench/hyperunix-observer.ts": "carrier",
  "src/workbench/native-evidence.ts": "asserted exclusion (S4 refuses an HX import here; H7 pins the observer's four imports)",
  "src/workbench/providers/hyperunix.ts": "no tag (the source is resultToJson's output, stamped by the SDK)",
};
/** Which judged row answers each clause of the owner filing, or PARKED for the external remainder. */
const CLAUSE_ROWS: Readonly<Record<string, RowId | "PARKED">> = {
  "statement.1": "T", "statement.2": "X", "statement.3": "R", "acceptance.1": "S", "acceptance.2.1": "PARKED", "acceptance.2.2": "C", "acceptance.2.3": "PARKED",
};

const missing = (what: string): Promise<string> => Promise.resolve(`<no entry for ${what}>`);
const ROWS: readonly Row[] = [
  { id: "T", clause: "statement.1", pins: sdkTagSites().map(site => ({
    id: `T ${site}`, requirement: T_SITES[site]?.requirement ?? "<none>",
    witness: () => { const entry = T_SITES[site]; return entry === undefined ? missing(site) : Promise.resolve(entry.witness()); },
  })) },
  { id: "X", clause: "statement.2", pins: FILING.srcSurfaces.map(file => ({
    id: `X ${file}`, requirement: X_CONSUMERS[file]?.requirement ?? "<none>", witness: () => X_CONSUMERS[file]?.witness() ?? missing(file),
  })) },
  { id: "R", clause: "statement.3", pins: FILING.families.map(family => ({
    id: `R ${family}`,
    requirement: `the accepted ${family} tag is accepted; its predecessor, digit extension, zero-padded spelling and truncation are refused as validation with no evidence`,
    witness: async () => {
      const accepted = FAMILY_TAGS[family];
      if (accepted === undefined) return missing(family);
      return (await Promise.all([accepted, predecessor(accepted), extension(accepted), zeroPadded(accepted), truncated(accepted)].map(tag => probe(family, tag)))).join("; ");
    },
  })) },
  { id: "S", clause: "acceptance.1", pins: [
    ...FILING.standingTags.map(tag => ({
      id: `S ${tag}`, requirement: "the standing tag succeeds its family's accepted tag and is refused as validation with no evidence",
      witness: async () => {
        const family = familyOf(tag);
        const accepted = family === undefined ? undefined : FAMILY_TAGS[family];
        if (family === undefined || accepted === undefined) return missing(tag);
        return `${family}: successor of ${accepted} ${successor(accepted) === tag}; ${await probe(family, tag)}`;
      },
    })),
    ...FILING.standingFixtures.map(file => ({
      id: `S ${file}`,
      requirement: "the cited suite registers it.each cases, each bound by scope to its one table, whose rows name and set every standing tag",
      witness: () => Promise.resolve(standingFixtureLines(file, readFileSync(join(ROOT, file), "utf8"), FILING.standingTags).join("; ")),
    })),
  ] },
  { id: "C", clause: "acceptance.2.2", pins: [
    ...FILING.srcSurfaces.map(file => ({
      id: `C ${file}`, requirement: "the file's representation-tag spellings and its role",
      witness: () => Promise.resolve(`${CARRIER_ROLES[file] ?? "<no role>"}: ${srcTagSites().filter(site => site.file === file).map(describeSite).join("; ") || "no site"}`),
    })),
    {
      id: "C src", requirement: "no representation-tag spelling outside the filing's surfaces",
      witness: () => Promise.resolve(srcTagSites().filter(site => !FILING.srcSurfaces.includes(site.file)).map(site => `${site.file} ${describeSite(site)}`).join("; ") || "no site"),
    },
  ] },
];
const PINS: readonly Pin[] = ROWS.flatMap(row => row.pins);

/** Every pin's frozen line: id | requirement | the witness measured from the subject. */
const PIN_LINES: readonly string[] = [
  "T SDK_REPRESENTATION | the vendored SDK exports its representation tag | hyperunix.result/1",
  "T resultToJson | the vendored SDK serialiser stamps the tag on a decoded result | hyperunix.result/1",
  "T resultFromJson | the vendored SDK decoder refuses a document under the tag's successor | TypeError: not a hyperunix.result/1 document",
  "X src/workbench/hyperunix-observer.ts | the reader adapter projects the registered provider's output | hyperunix.query.snapshot|partial|unknown",
  "X src/workbench/native-evidence.ts | native-evidence projects the registered provider's output as HyperUnix evidence | {\"provider\":\"hyperunix\",\"domainStatus\":\"incomplete\"}",
  "X src/workbench/providers/hyperunix.ts | the registered hyperunix.find provider returns the SDK-stamped output under its contract | hyperunix.find/v1|hyperunix.result/1",
  "R contract | the accepted contract tag is accepted; its predecessor, digit extension, zero-padded spelling and truncation are refused as validation " +
    "with no evidence | hyperunix.find/v1|accepted(1)|{\"provider\":\"hyperunix\",\"domainStatus\":\"incomplete\"}; hyperunix.find/v0|validation|{}; " +
    "hyperunix.find/v10|validation|{}; hyperunix.find/v01|validation|{}; hyperunix.find/v|validation|{}",
  "R representation | the accepted representation tag is accepted; its predecessor, digit extension, zero-padded spelling and truncation are refused " +
    "as validation with no evidence | hyperunix.result/1|accepted(1)|{\"provider\":\"hyperunix\",\"domainStatus\":\"incomplete\"}|decoded; " +
    "hyperunix.result/0|validation|{}|decoder-refused; hyperunix.result/10|validation|{}|decoder-refused; hyperunix.result/01|validation|{}|decoder-refused; " +
    "hyperunix.result/|validation|{}|decoder-refused",
  "S hyperunix.find/v2 | the standing tag succeeds its family's accepted tag and is refused as validation with no evidence | " +
    "contract: successor of hyperunix.find/v1 true; hyperunix.find/v2|validation|{}",
  "S hyperunix.result/2 | the standing tag succeeds its family's accepted tag and is refused as validation with no evidence | " +
    "representation: successor of hyperunix.result/1 true; hyperunix.result/2|validation|{}|decoder-refused",
  "S test/workbench-hyperunix-observer.test.ts | the cited suite registers it.each cases, each bound by scope to its one table, whose rows name and set " +
    "every standing tag | HyperUnix hyperunix.find reader adapter > H5: refuses %s with a typed validation error and no snapshot " +
    "{table refusals, callback sha256_16 3432302a94aedb5f}: contract hyperunix.find/v2 (contract: hyperunix.find/v2), " +
    "representation hyperunix.result/2 (representation: hyperunix.result/2)",
  "C src/workbench/hyperunix-observer.ts | the file's representation-tag spellings and its role | carrier: whole hyperunix.result/1 @ const REPRESENTATION",
  "C src/workbench/native-evidence.ts | the file's representation-tag spellings and its role | " +
    "asserted exclusion (S4 refuses an HX import here; H7 pins the observer's four imports): whole hyperunix.result/1 @ !== source.representation",
  "C src/workbench/providers/hyperunix.ts | the file's representation-tag spellings and its role | " +
    "no tag (the source is resultToJson's output, stamped by the SDK): no site",
  "C src | no representation-tag spelling outside the filing's surfaces | no site",
];
const FROZEN = new Map(PIN_LINES.map(line => [line.split(" | ")[0] ?? "", line]));

describe("HyperUnix result-representation successor gate (wb-tz2.3 R3, standing leg and re-vendor tripwire)", () => {
  it("FROZEN SHAPE (standing rule 16): the rows, every clause's row and every pin's id are their frozen literals", () => {
    expect(ROWS.map(row => `${row.id}:${row.clause}:${row.pins.length}`)).toEqual([
      "T:statement.1:3", "X:statement.2:3", "R:statement.3:2", "S:acceptance.1:3", "C:acceptance.2.2:4",
    ]);
    expect([...FILING.clauses.keys()].map(key => `${key}>${CLAUSE_ROWS[key] ?? "<unmapped>"}`)).toEqual([
      "statement.1>T", "statement.2>X", "statement.3>R", "acceptance.1>S", "acceptance.2.1>PARKED", "acceptance.2.2>C", "acceptance.2.3>PARKED",
    ]);
    expect(PINS.map(pin => pin.id)).toEqual(PIN_LINES.map(line => line.split(" | ")[0]));
    expect(FROZEN.size).toBe(PIN_LINES.length);
  });

  it("CLAUSES: every clause of the owner filing maps to one row or to PARKED, and every row answers exactly one clause", () => {
    const keys = [...FILING.clauses.keys()];
    expect(keys.filter(key => (FILING.clauses.get(key) ?? "").trim() === "")).toEqual([]);
    expect(Object.keys(CLAUSE_ROWS)).toEqual(keys);
    const answered = keys.filter(key => CLAUSE_ROWS[key] !== "PARKED");
    expect(ROWS.map(row => row.clause)).toEqual(answered);
    expect(answered.map(key => CLAUSE_ROWS[key])).toEqual(ROWS.map(row => row.id));
    for (const row of ROWS) expect(row.pins.length, row.id).toBeGreaterThan(0);
  });

  it("FILING COUNTS: the export holds one wb-tz2.3 row, and its description one STATEMENT, ACCEPTANCE and SURFACES line and one Standing item", () => {
    expect(FILING.counts).toEqual({ rows: 1, STATEMENT: 1, ACCEPTANCE: 1, SURFACES: 1, Standing: 1 });
    // A second row, a repeated heading line and a second Standing item are what the counts would then show.
    const [description = ""] = FILING_ROWS;
    const repeated = description.replace(/^(?:STATEMENT|ACCEPTANCE|SURFACES): .*$/gm, line => `${line}\n${line}`);
    expect(readFiling([description, description]).counts).toEqual({ rows: 2, STATEMENT: 1, ACCEPTANCE: 1, SURFACES: 1, Standing: 1 });
    expect(readFiling([repeated]).counts).toEqual({ rows: 1, STATEMENT: 2, ACCEPTANCE: 2, SURFACES: 2, Standing: 1 });
    expect(readFiling([description.replace('["Standing: ', '["Standing: a second item.", "Standing: ')]).counts.Standing).toBe(2);
    // Every export row is decoded, so an id spelled with a JSON escape is the same id; a row with another id is not.
    const escaped = JSON.stringify({ id: BEAD, description: "escaped" }).replace(`"${BEAD}"`, `"${BEAD.replace(".", "\\u002e")}"`);
    expect(escaped).not.toContain(`"${BEAD}"`);
    expect(filingRows([JSON.stringify({ id: BEAD, description: "plain" }), escaped, JSON.stringify({ id: `${BEAD}.1`, description: "child" }), ""].join("\n"))).toEqual(["plain", "escaped"]);
  });

  it("ANCHORS: the filing names the two standing tags, their fixture suite, the two families and the three src surfaces", () => {
    expect(FILING.standingTags).toEqual(["hyperunix.find/v2", "hyperunix.result/2"]);
    expect(FILING.standingFixtures).toEqual(["test/workbench-hyperunix-observer.test.ts"]);
    expect(FILING.families).toEqual(Object.keys(FAMILY_TAGS));
    expect(FILING.srcSurfaces).toEqual(Object.keys(X_CONSUMERS));
    expect(FILING.srcSurfaces).toEqual(Object.keys(CARRIER_ROLES));
    expect(sdkTagSites()).toEqual(Object.keys(T_SITES));
  });

  it("PARKED: the two on-landing clauses that need a published successor stay owed, and the trigger row is their re-entry", () => {
    expect([...FILING.clauses].filter(([key]) => CLAUSE_ROWS[key] === "PARKED").map(([key, text]) => `${key}: ${text}`)).toEqual([
      "acceptance.2.1: one re-vendor commit updates tarball bytes + vendor/README.md:9 sha table + package.json:39 together " +
        "(wb-x7m.2 falsifier and wb-cax.20 census green)",
      "acceptance.2.3: the full observer suite re-runs green against the successor",
    ]);
    expect(ROWS[0]?.id).toBe("T");
    expect(FROZEN.get("T SDK_REPRESENTATION")).toBe(`T SDK_REPRESENTATION | the vendored SDK exports its representation tag | ${SDK_REPRESENTATION}`);
  });

  it("T TYPE: the vendored SDK types SDK_REPRESENTATION as the literal it holds, so moving the tag also reds typecheck:test", () => {
    expectTypeOf<typeof SDK_REPRESENTATION>().toEqualTypeOf<"hyperunix.result/1">();
    expect(SDK_REPRESENTATION).toBe("hyperunix.result/1");
  });

  it.each(PINS.map(pin => [pin.id, pin] as const))("PIN %s holds its frozen line", async (_id, pin) => {
    expect(`${pin.id} | ${pin.requirement} | ${await pin.witness()}`).toBe(FROZEN.get(pin.id));
  });

  it("LIVENESS: the suite collected exactly one PIN case per pin, in pin order", ({ task }) => {
    const collected = (task.suite?.tasks ?? []).map(sibling => sibling.name);
    expect(collected).toContain(task.name);
    expect(collected.filter(name => name.startsWith("PIN "))).toEqual(PINS.map(pin => `PIN ${pin.id} holds its frozen line`));
  });

  it("S BINDING: the file pin binds a call to its own table by scope, and shows every way a call or a row stops being the cited fixture", () => {
    const callback = "(_name, value) => { check(value); }";
    const digest = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
    const v2 = "['contract hyperunix.find/v2', {...reading(), contract: 'hyperunix.find/v2'}],";
    const r2 = "['representation hyperunix.result/2', reading({representation: 'hyperunix.result/2'})],";
    const call = `  it.each(rows)('refuses %s', ${callback});`;
    const base = ["import {describe, it} from 'vitest';", "describe('suite', () => {", "  const rows = [", `    ${v2}`, `    ${r2}`, "    ['a null reading', null],", "  ];", call, "});", ""].join("\n");
    const lines = (text: string): string[] => standingFixtureLines("test/planted.test.ts", text, ["hyperunix.find/v2", "hyperunix.result/2"]);
    const named = "contract hyperunix.find/v2 (contract: hyperunix.find/v2), representation hyperunix.result/2 (representation: hyperunix.result/2)";
    const sound = (path: string, binding = "table rows", body = callback): string => `${path} > refuses %s {${binding}, callback sha256_16 ${digest(body)}}: ${named}`;
    const deleted = base.replace(`    ${v2}\n`, "").replace(`    ${r2}\n`, "");
    const decoy = "const rows = [['contract hyperunix.find/v2', null], ['representation hyperunix.result/2', null]];";
    expect(lines(base)).toEqual([sound("suite")]);
    // G16: the cited table loses both rows and a same-name table in another scope carries them; G16b the decoy alone; G16d the decoy before.
    expect(lines(`${deleted}describe('decoy', () => {\n  ${decoy}\n  it('holds two rows', () => { check(rows); });\n});\n`)).toEqual([]);
    expect(lines(`${base}describe('decoy', () => {\n  ${decoy}\n  it('holds two rows', () => { check(rows); });\n});\n`)).toEqual([sound("suite")]);
    expect(lines(deleted.replace("describe('suite'", `${decoy}\ndescribe('suite'`))).toEqual([]);
    // One table read two ways: a same-scope redeclaration, or a reference that is not an it.each argument.
    expect(lines(base.replace("  const rows = [", "  var rows = [").replace(call, `  var rows = [];\n${call}`))).toEqual([sound("suite", "<table rows: 2 declarations>")]);
    expect(lines(base.replace(call, `  rows.splice(0, 2);\n${call}`))).toEqual([sound("suite", "<table rows also referenced at line 8>")]);
    expect(lines(base.replace(call, `  const rows = [];\n${call}`))).toEqual([sound("suite", "<table rows redeclared in its scope at line 3, 8>")]);
    // A call vitest never registers as the cited case: another `it`, a modified describe, a conditional registration.
    expect(lines(base.replace("import {describe, it} from 'vitest';", "import {describe} from 'vitest';\nconst it = Object.assign(() => undefined, {each: () => () => undefined});"))).toEqual([]);
    expect(lines(base.replace("import {describe, it} from 'vitest';", "import {describe, it} from 'vitest';\nconst it = 0;"))).toEqual([]);
    // The modifier is spelled through a helper, so this file carries no focus or skip marker of its own.
    const modified = (modifier: string): string => `describe.${modifier}`;
    expect(lines(base.replace("describe('suite',", `${modified("skip")}('suite',`))).toEqual([sound(`<registered under ${modified("skip")}>`)]);
    expect(lines(base.replace("describe('suite',", `${modified("skipIf")}(true)('suite',`))).toEqual([sound(`<registered under ${modified("skipIf")}(true)>`)]);
    expect(lines(base.replace(call, `  if (enabled) {\n  ${call}\n  }`))).toEqual([sound("<registered inside a block that is not a describe callback>")]);
    // A row that names a tag its reading does not set, and a reading that sets the family property to another tag.
    expect(lines(base.replace(v2, "['contract hyperunix.find/v2', null],"))).toEqual([
      `suite > refuses %s {table rows, callback sha256_16 ${digest(callback)}}: contract hyperunix.find/v2 (contract: not set), ` +
        "representation hyperunix.result/2 (representation: hyperunix.result/2)",
    ]);
    expect(lines(base.replace("contract: 'hyperunix.find/v2'}", "note: 'hyperunix.find/v2', contract: 'hyperunix.find/v3'}"))[0]).toContain("(contract: hyperunix.find/v3)");
    // A second it.each call under the same path and title, and a cited callback whose body returns before it asserts.
    const twin = "  it.each([['contract hyperunix.find/v2', {contract: 'hyperunix.find/v2'}]])('refuses %s', () => {});";
    expect(lines(base.replace(call, `${call}\n${twin}`))).toEqual([
      `suite > refuses %s <title shared by another it.each call> {table rows, callback sha256_16 ${digest(callback)}}: ${named}`,
      `suite > refuses %s <title shared by another it.each call> {inline table, callback sha256_16 ${digest("() => {}")}}: contract hyperunix.find/v2 (contract: hyperunix.find/v2)`,
    ]);
    const hollowed = "(_name, value) => { return; check(value); }";
    expect(lines(base.replace(callback, hollowed))).toEqual([sound("suite", "table rows", hollowed)]);
    expect(digest(hollowed)).not.toBe(digest(callback));
  });

  it("C COLLECTOR: the scan reads every string-text node kind, whole and embedded, and never a comment or a regular expression", () => {
    const control = [
      'const A = "hyperunix.result/1";',
      "const B = 'hyperunix.result/2';",
      `const C = ${TICK}hyperunix.result/3${TICK};`,
      `const D = ${TICK}hyperunix.result/4 ${slot("A")} hyperunix.result/5 ${slot("B")} hyperunix.result/6${TICK};`,
      'const E = "not a hyperunix.result/7 document";',
      "// hyperunix.result/8 in a comment",
      "const F = /hyperunix\\.result\\/9/;",
      'const G = left !== "hyperunix.result/1";',
    ].join("\n");
    expect(tagSites(new Map([["src/control.ts", control]])).map(describeSite)).toEqual([
      "whole hyperunix.result/1 @ const A",
      "whole hyperunix.result/2 (not the vendored tag) @ const B",
      "whole hyperunix.result/3 (not the vendored tag) @ const C",
      "embedded hyperunix.result/4 (not the vendored tag) @ TemplateHead",
      "embedded hyperunix.result/5 (not the vendored tag) @ TemplateMiddle",
      "embedded hyperunix.result/6 (not the vendored tag) @ TemplateTail",
      "embedded hyperunix.result/7 (not the vendored tag) @ StringLiteral",
      "whole hyperunix.result/1 @ !== left",
    ]);
    // A planted third site and a half-moved re-vendor are what the C pins would then show.
    const planted = new Map([["src/workbench/other.ts", 'export const TAG = "hyperunix.result/1";'], ["src/workbench/native-evidence.ts", 'if (x !== "hyperunix.result/2") {}']]);
    expect(tagSites(planted).map(site => `${site.file} ${describeSite(site)}`)).toEqual([
      "src/workbench/other.ts whole hyperunix.result/1 @ const TAG",
      "src/workbench/native-evidence.ts whole hyperunix.result/2 (not the vendored tag) @ !== x",
    ]);
  });
});
