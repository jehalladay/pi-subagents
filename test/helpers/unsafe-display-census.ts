/**
 * unsafe-display-census.ts - the structural census behind test/workbench-unsafe-display-oracle.test.ts (wb-8bi respin).
 *
 * The question: does any regular expression under test/ act as the display-safety oracle while being something other than the
 * one shared definition in test/helpers/unsafe-display.ts? The first cut asked by NAME, with a line regex over *.test.ts files.
 * The row-478 gate planted 17 shapes and found it blind to 9 (the names UNSAFE and UNSAFE_OUTCOME, let, var, new RegExp, a
 * trailing comment, no semicolon, a non-test helper, a second statement on the line) and red on 2 that are not code (a block
 * comment, a template literal). This census asks by BODY:
 *
 * - READ: every file under the root whose extension is in CENSUS_EXTENSIONS (TypeScript and JavaScript modules, test files or
 *   not, at any depth), parsed with the TypeScript compiler. Text inside a comment, a string or a template is never a pattern.
 * - PATTERNS: every regular-expression literal wherever it sits (any binding name, let/var/const, a property, a class field, an
 *   argument, no binding at all), and every RegExp(...) or new RegExp(...) call whose callee is RegExp or globalThis.RegExp.
 * - EVALUATOR for RegExp arguments (closed list): string literals; no-substitution templates; templates whose substitutions
 *   evaluate; String.raw templates; `+` concatenation; parentheses, type assertions, `as`, `satisfies` and `!`; an identifier
 *   with exactly one initialized variable declaration of that name in the same file; `.source` and `.flags` of an evaluable
 *   regular expression; `[...].join(separator)`; String.fromCodePoint and String.fromCharCode of numeric literals. Anything
 *   else is a HOLE and reads as empty text. A pattern with holes is PARTIAL and is still classified. A construction whose
 *   pattern is nothing but holes is OPAQUE: listed by file and line, never classified, because the census cannot see it.
 * - CLASSIFIER: a pattern is the display-safety oracle when it keeps every TEXT_PROBES code point and refuses every sample of
 *   at least ORACLE_CLASS_FLOOR of the five ORACLE_CLASSES (probed with its own flags, g, y and d dropped). The floor is four,
 *   so a copy that lost one whole class is still found. Patterns that refuse text (negated classes, empty matches) are never
 *   the oracle however many classes they refuse.
 * - VERDICT: an oracle DRIFTS unless its source and flags (g, y and d dropped) equal the shared oracle's byte for byte, and a
 *   PARTIAL oracle always drifts (a copy built from values the census cannot read is not pinned equal).
 *
 * Not read (named residuals): files outside the root or with another extension; symbolic links (not followed); patterns whose
 * text comes only from imports, parameters or call results (OPAQUE); a copy narrowed below ORACLE_CLASS_FLOOR classes (it no
 * longer behaves as this oracle). The falsifier table in the census test pins every mode above, the blind ones included.
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/** A code file the census reads: its path relative to the census root, with forward slashes, and its text. */
export interface CensusFile {
  readonly path: string;
  readonly text: string;
}

/** The extensions the census parses. */
export const CENSUS_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];

/** True when the census reads a file at this path. */
export const inCensusScope = (path: string): boolean => CENSUS_EXTENSIONS.includes(extname(path));

/** The directory of a module, from its import.meta.url, decoded (a percent-encoded pathname fails on a checkout path with a space). */
export const censusRoot = (moduleUrl: string): string => dirname(fileURLToPath(moduleUrl));

const byName = (left: { name: string }, right: { name: string }): number => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0);

/** Every in-scope file under the root, at any depth, in a stable order. Symbolic links are not followed. */
export function readCensusFiles(root: string): CensusFile[] {
  const files: CensusFile[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort(byName)) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && inCensusScope(entry.name)) files.push({ path: relative(root, full).split(sep).join("/"), text: readFileSync(full, "utf8") });
    }
  };
  walk(root);
  return files;
}

/** One unsafe class the shared oracle refuses, and the code points that sample it. A pattern refuses the class only when it refuses every sample. */
export interface OracleClass {
  readonly name: string;
  readonly samples: readonly number[];
}

/**
 * The five classes. The default-ignorable samples span the property (Latin-1, combining, Arabic, Hangul fillers, Khmer, Mongolian,
 * general punctuation, variation selectors, specials, the astral format and tag ranges), so only a pattern carrying the property,
 * or listing all of it, refuses that class.
 */
export const ORACLE_CLASSES: readonly OracleClass[] = [
  { name: "C0 controls", samples: [0x00, 0x01, 0x07, 0x09, 0x0a, 0x0d, 0x1b, 0x1f] },
  { name: "DEL and C1 controls", samples: [0x7f, 0x80, 0x85, 0x9b, 0x9f] },
  { name: "line and paragraph separators", samples: [0x2028, 0x2029] },
  {
    name: "default-ignorable code points",
    samples: [0xad, 0x34f, 0x61c, 0x115f, 0x17b4, 0x180e, 0x200b, 0x200e, 0x202a, 0x2060, 0x2066, 0x3164, 0xfe00, 0xfeff, 0xffa0, 0xfff0, 0x1bca0,
      0x1d173, 0xe0001, 0xe0100, 0xe0fff],
  },
  { name: "lone surrogates", samples: [0xd800, 0xdbff, 0xdc00, 0xdfff] },
];

/** Text every display oracle keeps: ASCII letters, a digit, space and punctuation, a Latin-1 letter, a combining accent, Greek, CJK, an emoji. */
export const TEXT_PROBES: readonly number[] = [0x61, 0x5a, 0x30, 0x20, 0x2d, 0x7e, 0xe9, 0x301, 0x3b1, 0x4e2d, 0x1f600];

/** How many of the five classes a text-keeping pattern must refuse to count as the display-safety oracle. */
export const ORACLE_CLASS_FLOOR = 4;

/** The wb-rqd format controls the shared oracle refuses beyond the five classes, and the nearest code point past each range. */
export const WIDENING_UNITS: readonly number[] = [0xfff9, 0xfffa, 0xfffb, ...Array.from({ length: 16 }, (_, at) => 0x13430 + at)];
export const WIDENING_NEIGHBOURS: readonly number[] = [0xfffc, 0x1342f, 0x13440];

/** What a pattern does on the probes. */
export interface Reading {
  readonly refused: readonly string[];
  readonly keepsText: boolean;
}

const probeFlags = (flags: string): string => flags.replace(/[dgy]/g, "");
const compiled = (source: string, flags: string): RegExp | undefined => {
  try {
    return new RegExp(source, probeFlags(flags));
  } catch {
    return undefined;
  }
};
const hits = (pattern: RegExp, code: number): boolean => pattern.test(String.fromCodePoint(code));

/** The pattern's behaviour on the class samples and the text probes, or undefined when it does not compile. */
export function readPattern(source: string, flags: string): Reading | undefined {
  const pattern = compiled(source, flags);
  if (pattern === undefined) return undefined;
  return {
    refused: ORACLE_CLASSES.filter(oracleClass => oracleClass.samples.every(code => hits(pattern, code))).map(oracleClass => oracleClass.name),
    keepsText: TEXT_PROBES.every(code => !hits(pattern, code)),
  };
}

/** True when a reading is the display-safety oracle's. */
export const isDisplayOracle = (reading: Reading | undefined): boolean =>
  reading?.keepsText === true && reading.refused.length >= ORACLE_CLASS_FLOOR;

/** One pattern the census read. */
export interface PatternSite {
  readonly path: string;
  readonly line: number;
  /** The name the pattern initializes, when it initializes one (a variable, a property, a class field, an assignment target). */
  readonly binding: string | undefined;
  readonly via: "literal" | "RegExp";
  readonly source: string;
  readonly flags: string;
  /** Argument parts the evaluator could not read, each read as empty text. */
  readonly holes: number;
}

/** A RegExp construction whose pattern argument is nothing but holes. */
export interface OpaqueSite {
  readonly path: string;
  readonly line: number;
  readonly text: string;
}

interface Text {
  readonly text: string;
  readonly holes: number;
}

const HOLE: Text = { text: "", holes: 1 };
const known = (text: string): Text => ({ text, holes: 0 });
const joined = (parts: readonly Text[]): Text => ({ text: parts.map(part => part.text).join(""), holes: parts.reduce((sum, part) => sum + part.holes, 0) });
const MAX_DEPTH = 8;

const scriptKind = (path: string): ts.ScriptKind => {
  switch (extname(path)) {
    case ".tsx":
      return ts.ScriptKind.TSX;
    case ".jsx":
      return ts.ScriptKind.JSX;
    case ".js":
    case ".mjs":
    case ".cjs":
      return ts.ScriptKind.JS;
    default:
      return ts.ScriptKind.TS;
  }
};

/** The file parsed by the TypeScript compiler, parent links set. */
export const parseCensusFile = (file: CensusFile): ts.SourceFile =>
  ts.createSourceFile(file.path, file.text, ts.ScriptTarget.Latest, true, scriptKind(file.path));

const unwrap = (node: ts.Expression): ts.Expression => {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isNonNullExpression(current)
  ) {
    current = current.expression;
  }
  return current;
};

const isRegExpCallee = (callee: ts.Expression): boolean => {
  const target = unwrap(callee);
  if (ts.isIdentifier(target)) return target.text === "RegExp";
  return ts.isPropertyAccessExpression(target) && target.name.text === "RegExp" && ts.isIdentifier(target.expression) && target.expression.text === "globalThis";
};

const isConstruction = (node: ts.Node): node is ts.NewExpression | ts.CallExpression =>
  (ts.isNewExpression(node) || ts.isCallExpression(node)) && isRegExpCallee(node.expression);

const isStringMember = (callee: ts.Expression, member: string): boolean =>
  ts.isPropertyAccessExpression(callee) && callee.name.text === member && ts.isIdentifier(callee.expression) && callee.expression.text === "String";

const isStringRaw = (tag: ts.Expression): boolean => isStringMember(unwrap(tag), "raw");

/** Reads constant text out of one file's expressions. */
class Evaluator {
  private readonly bindings = new Map<string, ts.VariableDeclaration[]>();

  constructor(file: ts.SourceFile) {
    const visit = (node: ts.Node): void => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        const list = this.bindings.get(node.name.text) ?? [];
        list.push(node);
        this.bindings.set(node.name.text, list);
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
  }

  private initializerOf(name: string): ts.Expression | undefined {
    const declarations = this.bindings.get(name);
    if (declarations === undefined || declarations.length !== 1) return undefined;
    return declarations[0]?.initializer;
  }

  text(node: ts.Expression, depth = 0): Text {
    if (depth > MAX_DEPTH) return HOLE;
    const expression = unwrap(node);
    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression) || ts.isNumericLiteral(expression)) return known(expression.text);
    if (ts.isTemplateExpression(expression)) {
      return joined([known(expression.head.text), ...expression.templateSpans.flatMap(span => [this.text(span.expression, depth + 1), known(span.literal.text)])]);
    }
    if (ts.isTaggedTemplateExpression(expression) && isStringRaw(expression.tag)) {
      const template = expression.template;
      if (ts.isNoSubstitutionTemplateLiteral(template)) return known(template.rawText ?? template.text);
      return joined([
        known(template.head.rawText ?? template.head.text),
        ...template.templateSpans.flatMap(span => [this.text(span.expression, depth + 1), known(span.literal.rawText ?? span.literal.text)]),
      ]);
    }
    if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      return joined([this.text(expression.left, depth + 1), this.text(expression.right, depth + 1)]);
    }
    if (ts.isIdentifier(expression)) {
      const initializer = this.initializerOf(expression.text);
      return initializer === undefined ? HOLE : this.text(initializer, depth + 1);
    }
    if (ts.isPropertyAccessExpression(expression) && (expression.name.text === "source" || expression.name.text === "flags")) {
      const pattern = this.regex(expression.expression, depth + 1);
      if (pattern === undefined) return HOLE;
      return expression.name.text === "source" ? pattern.source : pattern.flags;
    }
    if (ts.isCallExpression(expression)) return this.callText(expression, depth);
    return HOLE;
  }

  private callText(call: ts.CallExpression, depth: number): Text {
    const callee = unwrap(call.expression);
    if (isStringMember(callee, "fromCodePoint") || isStringMember(callee, "fromCharCode")) {
      const codes = call.arguments.map(argument => unwrap(argument));
      if (!codes.every(ts.isNumericLiteral)) return HOLE;
      const values = codes.map(code => Number(code.text));
      return known(isStringMember(callee, "fromCodePoint") ? String.fromCodePoint(...values) : String.fromCharCode(...values));
    }
    if (ts.isPropertyAccessExpression(callee) && callee.name.text === "join") {
      const array = unwrap(callee.expression);
      if (!ts.isArrayLiteralExpression(array) || array.elements.some(ts.isSpreadElement)) return HOLE;
      const separator = call.arguments[0] === undefined ? known(",") : this.text(call.arguments[0], depth + 1);
      const parts = array.elements.map(element => this.text(element, depth + 1));
      return joined(parts.flatMap((part, at) => (at === 0 ? [part] : [separator, part])));
    }
    return HOLE;
  }

  /** The source and flags of an expression that is a regular expression, or undefined when it is not one the evaluator can read. */
  regex(node: ts.Expression, depth = 0): { readonly source: Text; readonly flags: Text } | undefined {
    if (depth > MAX_DEPTH) return undefined;
    const expression = unwrap(node);
    if (ts.isRegularExpressionLiteral(expression)) {
      const closing = expression.text.lastIndexOf("/");
      return { source: known(expression.text.slice(1, closing)), flags: known(expression.text.slice(closing + 1)) };
    }
    if (ts.isIdentifier(expression)) {
      const initializer = this.initializerOf(expression.text);
      return initializer === undefined ? undefined : this.regex(initializer, depth + 1);
    }
    if (isConstruction(expression)) return this.construction(expression, depth + 1);
    return undefined;
  }

  construction(call: ts.NewExpression | ts.CallExpression, depth = 0): { readonly source: Text; readonly flags: Text } {
    const [patternArgument, flagsArgument] = call.arguments ?? [];
    const flags = flagsArgument === undefined ? undefined : this.text(flagsArgument, depth + 1);
    if (patternArgument === undefined) return { source: known("(?:)"), flags: flags ?? known("") };
    const inner = this.regex(patternArgument, depth + 1);
    if (inner !== undefined) return { source: inner.source, flags: flags ?? inner.flags };
    return { source: this.text(patternArgument, depth + 1), flags: flags ?? known("") };
  }
}

const bindingOf = (node: ts.Node, file: ts.SourceFile): string | undefined => {
  let current: ts.Node = node;
  let parent = current.parent;
  while (
    parent !== undefined &&
    (ts.isParenthesizedExpression(parent) ||
      ts.isAsExpression(parent) ||
      ts.isSatisfiesExpression(parent) ||
      ts.isTypeAssertionExpression(parent) ||
      ts.isNonNullExpression(parent))
  ) {
    current = parent;
    parent = current.parent;
  }
  if (parent === undefined) return undefined;
  if ((ts.isVariableDeclaration(parent) || ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent)) && parent.initializer === current) {
    return parent.name.getText(file);
  }
  if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.right === current) return parent.left.getText(file);
  return undefined;
};

/** One file's patterns and opaque constructions. */
export interface FileScan {
  readonly patterns: readonly PatternSite[];
  readonly opaque: readonly OpaqueSite[];
}

/** Every pattern in one file, read through the TypeScript AST. */
export function scanFile(file: CensusFile): FileScan {
  const source = parseCensusFile(file);
  const evaluator = new Evaluator(source);
  const patterns: PatternSite[] = [];
  const opaque: OpaqueSite[] = [];
  const lineOf = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const visit = (node: ts.Node): void => {
    if (ts.isRegularExpressionLiteral(node)) {
      const closing = node.text.lastIndexOf("/");
      patterns.push({ path: file.path, line: lineOf(node), binding: bindingOf(node, source), via: "literal", source: node.text.slice(1, closing), flags: node.text.slice(closing + 1), holes: 0 });
    } else if (isConstruction(node)) {
      const read = evaluator.construction(node);
      if (read.source.text === "" && read.source.holes > 0) opaque.push({ path: file.path, line: lineOf(node), text: node.getText(source) });
      else patterns.push({ path: file.path, line: lineOf(node), binding: bindingOf(node, source), via: "RegExp", source: read.source.text, flags: read.flags.text, holes: read.source.holes + read.flags.holes });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { patterns, opaque };
}

/** True when the file imports `name` as a value, under any local alias, from the module `specifier`. */
export function importsValue(file: CensusFile, specifier: string, name: string): boolean {
  return parseCensusFile(file).statements.some(statement => {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== specifier) return false;
    const clause = statement.importClause;
    if (clause === undefined || clause.isTypeOnly || clause.namedBindings === undefined || !ts.isNamedImports(clause.namedBindings)) return false;
    return clause.namedBindings.elements.some(element => !element.isTypeOnly && (element.propertyName ?? element.name).text === name);
  });
}

/** A pattern the classifier read as the display-safety oracle. */
export interface OracleSite extends PatternSite {
  readonly reading: Reading;
}

/** An oracle that is not the shared one, and how it differs. */
export interface Drift {
  readonly site: OracleSite;
  readonly detail: string;
}

/** The census over a set of files. */
export interface OracleCensus {
  readonly files: readonly string[];
  readonly patterns: readonly PatternSite[];
  readonly oracles: readonly OracleSite[];
  readonly drifted: readonly Drift[];
  readonly opaque: readonly OpaqueSite[];
  /** Patterns that do not compile under their own flags (only partial constructions can land here; a literal that fails would fail its own file). */
  readonly uncompiled: readonly PatternSite[];
}

const pinned = (source: string, flags: string): string | undefined => {
  try {
    const pattern = new RegExp(source, flags);
    return `/${pattern.source}/${probeFlags(pattern.flags)}`;
  } catch {
    return undefined;
  }
};

const named = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
const DIFF_PROBES: readonly number[] = [...ORACLE_CLASSES.flatMap(oracleClass => oracleClass.samples), ...TEXT_PROBES, ...WIDENING_UNITS, ...WIDENING_NEIGHBOURS];

function differences(site: PatternSite, shared: RegExp): string {
  const copy = compiled(site.source, site.flags);
  const reference = compiled(shared.source, shared.flags);
  if (copy === undefined || reference === undefined) return "does not compile";
  const accepts = DIFF_PROBES.filter(code => hits(reference, code) && !hits(copy, code)).map(named);
  const refuses = DIFF_PROBES.filter(code => !hits(reference, code) && hits(copy, code)).map(named);
  const parts = [
    ...(accepts.length > 0 ? [`accepts ${accepts.join(" ")} (the shared oracle refuses them)`] : []),
    ...(refuses.length > 0 ? [`refuses ${refuses.join(" ")} (the shared oracle keeps them)`] : []),
  ];
  const spelled = parts.length > 0 ? parts.join("; ") : "same verdict on every probe, spelled differently";
  return site.holes > 0 ? `${spelled}; partial: ${site.holes} unread part(s) read as empty text` : spelled;
}

/** Classifies every pattern in the files and lists every display-safety oracle that is not byte-equal to `shared`. */
export function censusOracles(files: readonly CensusFile[], shared: RegExp): OracleCensus {
  const scans = files.map(scanFile);
  const patterns = scans.flatMap(scan => scan.patterns);
  const sharedPin = pinned(shared.source, shared.flags);
  const oracles: OracleSite[] = [];
  const uncompiled: PatternSite[] = [];
  for (const site of patterns) {
    const reading = readPattern(site.source, site.flags);
    if (reading === undefined) uncompiled.push(site);
    else if (isDisplayOracle(reading)) oracles.push({ ...site, reading });
  }
  const drifted = oracles
    .filter(site => site.holes > 0 || pinned(site.source, site.flags) !== sharedPin)
    .map(site => ({ site, detail: differences(site, shared) }));
  return { files: files.map(file => file.path), patterns, oracles, drifted, opaque: scans.flatMap(scan => scan.opaque), uncompiled };
}
