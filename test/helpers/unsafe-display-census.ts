/**
 * unsafe-display-census.ts - the structural census behind test/workbench-unsafe-display-oracle.test.ts (wb-8bi respin; the
 * enumeration below is wb-85h's, the row-514 follow-up, with the row-529 rows P1-P12 of its respin 1).
 *
 * The question: does any regular expression under test/ act as the display-safety oracle while being something other than the
 * one shared definition in test/helpers/unsafe-display.ts? The first cut asked by NAME, with a line regex over *.test.ts files.
 * The row-478 gate planted 17 shapes and found it blind to 9 (the names UNSAFE and UNSAFE_OUTCOME, let, var, new RegExp, a
 * trailing comment, no semicolon, a non-test helper, a second statement on the line) and red on 2 that are not code (a block
 * comment, a template literal). This census asks by BODY.
 *
 * WHAT THIS HEADER CLAIMS, AND ONLY THAT. Each PINNED MODE names the BATTERY rows of the census test that go red when the mode
 * breaks; each NAMED RESIDUAL is a mode the census does not catch, named with the rows that pin its silence, so the census
 * turning louder or quieter on it is seen either way. The census test checks this header against its table: every cited row
 * exists, every BATTERY row is cited, and each residual cites exactly the rows that carry it. A mode found later joins one of
 * the two lists; nothing outside them is claimed. Rows outside BATTERY are named by their test titles, in quotes.
 *
 * PINNED MODES
 * - READ: every file under the root, at any depth, whose extension is in CENSUS_EXTENSIONS (.ts .mts .cts .tsx .js .mjs .cjs
 *   .jsx), test files or not, in name order within each directory (rows F9, S15, S16, G1a, G1b, G1c, G1d, W1), pinned by value
 *   and over a planted tree and the live tree too ("the read extensions ...", "reads every census-extension file ...", "reads
 *   every module under test/ ..."); name order is by UTF-16 code unit, which a directory read's own byte order is not ("orders
 *   each directory by UTF-16 code unit ..."). Each file is parsed by the TypeScript compiler under its own script kind (.tsx,
 *   .jsx, .js, .mjs and .cjs with JSX; .ts, .mts and .cts without), so text in a comment, a string, a template or JSX is never
 *   a pattern and neither is a division (rows FR1, FR2, S24, S25, S26, N4, N5, N6, HR3, W2, W3, P3, P4), and a type assertion
 *   in a .ts, .mts or .cts module is not JSX (rows W4, P1, P2).
 * - PATTERNS: every regular-expression literal wherever it sits: any binding name, let, var or const, a property, a class
 *   field, an argument, a table, a wrapper, no binding at all (rows C1, C2, C3, C4, C5, F1, F2, F3, F4, F5, F7, F8, F10, S1, S2,
 *   S3, G17, G21, G22); and every RegExp(...) or new RegExp(...) call whose callee is RegExp or globalThis.RegExp, parenthesized
 *   or not (rows F6, S4, S5, W5), RegExp() with no argument reading as the empty pattern (rows W6).
 * - EVALUATOR, a closed list, for a construction's pattern and flags arguments: string literals (rows F6) and numeric literals
 *   (rows W7); no-substitution templates (rows G5); templates whose substitutions evaluate (rows G14); String.raw templates,
 *   read raw, with or without substitutions (rows S6, N2, W8); `+` concatenation (rows S8, N3); parentheses, type assertions,
 *   `as`, `satisfies` and `!` (rows W4); an identifier with exactly one initialized variable declaration of that name in the
 *   same file (rows S7, G6), a name declared twice being a hole (rows W9); `.source` and `.flags` of a readable regular
 *   expression (rows S9, S10, W10, W11); a readable regular expression (a literal, such a binding, or a construction) as the
 *   pattern argument, keeping its own flags when no flags argument is given (rows G16, W12) and taking the flags argument's
 *   when one is (rows P5); `[...].join(separator)` over an array literal without spreads, no separator reading as a comma
 *   (rows W13, W14), a spread making the whole join a hole (rows P7); String.fromCodePoint and String.fromCharCode of numeric
 *   literals (rows W15, W16), String.fromCodePoint reading an astral code point whole (rows P6). Anything else is a HOLE and
 *   reads as empty text, and so is any part nested more than eight levels deep: an eight-part `+` chain reads whole, a
 *   nine-part one loses two parts (rows W17, W18), and a literal reached through six aliases reads whole, through seven it is a
 *   hole and its construction OPAQUE (rows P9, P8).
 * - PARTIAL: a pattern read with holes is classified like any other, and a PARTIAL oracle always drifts, its detail naming the
 *   unread parts, even when its readable text equals the shared oracle's: a hole after, before or inside the shared body (rows
 *   G27, W19, W20), the same on the unwidened body (rows G24, G25, W21), a hole in the flags argument (rows W22), parts past the
 *   depth bound (rows W18).
 * - OPAQUE: a construction whose pattern argument is nothing but holes (a call result, an import, String.prototype.concat, join
 *   over a binding or with a spread, a parameter, .source of an import, a name declared twice, a literal aliased past the depth
 *   bound) is listed by file and line and never classified (rows S28, S29, G7, G8, G9, N1, W9, P7, P8).
 * - UNCOMPILED: a pattern whose read does not compile under its own flags is listed, never dropped (rows G18, G26), and the live
 *   census fails on any such site under test/ ("every pattern the census read compiles ...").
 * - CLASSIFIER: a pattern is the display-safety oracle when it keeps every TEXT_PROBES code point and refuses every sample of at
 *   least ORACLE_CLASS_FLOOR (four) of the five ORACLE_CLASSES, probed with its own flags, g, y and d dropped, so a global or
 *   sticky copy is read like any other (rows S18, P10, P12). The lists and the floor are pinned by value ("the classifier
 *   constants ...", "the read extensions, the text probes ..."); other flags (rows G2, G3) and another spelling of the same
 *   classes (rows G4) are read by behaviour; a copy drifts at four classes (rows S12, S13), stays quiet below the floor (rows
 *   S19, S20, S21, S30), and is never the oracle when it keeps no text (rows S22, S23).
 * - VERDICT: an oracle DRIFTS unless its source and flags (g, y and d dropped) equal the shared oracle's byte for byte: equal
 *   copies stay quiet, a g, y or d flag included (rows S17, S18, P11, P12), the same verdicts spelled or flagged differently
 *   drift (rows S14, W23), and a drift names what the copy accepts or refuses that the shared oracle does not (rows S11, G19,
 *   G20).
 * - BINDING AND IMPORTS: a pattern's binding is the variable, property, class field or assignment target it initializes,
 *   through wrappers, and none for an argument ("names the binding ..."); importsValue reads a value import under any alias and
 *   never a type-only one, another module, another name or a namespace import ("importsValue reads ...").
 *
 * NAMED RESIDUALS (known blind modes; each row pins today's silence)
 * - R1 the empty alternative (rows G23): a hole that forms a whole alternative reads as an EMPTY alternative, which matches
 *   every input, so the copy keeps no text and is never classified: not drifted, not opaque, not uncompiled (the owner default
 *   R1(a), standing per R484).
 * - R2 other constructor spellings (rows G10, G11, G15): Reflect.construct(RegExp, ...), an aliased constructor and
 *   globalThis["RegExp"] are not read at all, not even listed opaque.
 * - R3 over-strict copies (rows G13a, G13b, G13c): the unwidened body plus one alternative that refuses a text probe (combining
 *   marks, emoji, a CJK block) keeps no text, so it is never the oracle.
 * - R4 below the floor (rows S30, G12): a copy narrowed below four classes, or an oracle split across patterns that each refuse
 *   fewer, no longer behaves as this oracle.
 * - R5 opaque constructions (rows S28, S29, G7, G8, G9, N1, W9, P7, P8): listed, never classified, and the live census neither
 *   fails on them nor pins their roster, so a new opaque copy lands green.
 * - R6 over-refusal (rows G18): a legitimate partial read that does not compile (a regex-escape helper) is listed uncompiled,
 *   and the live census fails on it.
 * - R7 not read (rows S27): files with another extension; files outside the root and symbolic links ("reads every
 *   census-extension file ...").
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

/** Every in-scope file under the root, at any depth, in name order (by UTF-16 code unit) within each directory. Symbolic links are not followed. */
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
