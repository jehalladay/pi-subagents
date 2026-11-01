/**
 * THE APO CITATION-STATUS JUDGE (wb-021.9, the rule-19 structural-exit child of wb-021.6): the judge of the wb-021.6 APO
 * citation-status census, moved here from that bead's FINAL cut #5 (cdea135d4932a0bfdec599c6f2e43b3fd40e85e1,
 * test/workbench-apo-citation-status-census.test.ts) so the child's census (test/workbench-apo-citation-status-judge-census.test.ts)
 * can hold the judge under the one-edit mutants the wb-021.6 gates named, and the parent's re-cut can read the landed judge.
 * The code below is that cut's lines 362-363, 368-369, 371-372, 398-410, 551-566, 568-789, 804-830, 833-834 and 841-882,
 * each top-level declaration gaining `export `. Of the 23 one-edit mutants the wb-021.6 gates authored over that cut's
 * readers (gate-prep-16's 12, gate-prep-18's 11), 22 find their text here exactly once; the 23rd, GP18-RG-beadrow-uncounted,
 * edits the export reader beadRow, which was not moved. Cut #2 of this bead narrowed four comments to what this code reads
 * (LOCKS, the carriers, THE EFFECT CLASS, the run guard's counter) and changed no code line; cut #3 narrowed two more to the forms
 * the census holds (shownText's links, unwrapped's assertions) and changed no code line.
 * Display paths added: none (test-only; nothing here renders, it reads texts handed to it).
 */
import { Lexer, type Links, marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { roleReading } from "./apo-ui-publish-census.js";

/** The two dependency locks, set aside by exact path: an integrity value can split into the word apo (package-lock.json's do; R-LOCKFILE). */
export const LOCKS: readonly string[] = ["package-lock.json", "vendor/dependency-lock.json"];

export const EFFECT_PROPERTY = "effectClass";
export const READ = "read";

export const cp = (...points: number[]): string => String.fromCodePoint(...points);
export const NUL = cp(0);

/** The statement's two carriers (the parent census's anchor case derived both words from the wb-021.6 title) and the producer's own status sentence. */
export const STATUS_WORD = "design-stage";
export const SCOPE_WORD = "non-effectful";
export const STATUS_LITERAL = "accepted design direction; documentation only";
export function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export const STATUS_PATTERN = new RegExp(`(?<![\\w-])${escaped(STATUS_WORD)}(?![\\w-])`, "gi");
export const SCOPE_PATTERN = new RegExp(`(?<![\\w-])${escaped(SCOPE_WORD)}(?![\\w-])`, "gi");
export const STATUS_LITERAL_PATTERN = new RegExp(`(?<![\\w-])${STATUS_LITERAL.split(/\s+/).map(escaped).join("\\s+")}(?![\\w-])`, "gi");
/** A carrier is cancelled by one of these in the two words before it, or by these right after it. */
export const NEGATION_BEFORE = /\b(?:not|never|nor|no|isn't|aren't|wasn't|weren't|formerly|previously)\b/i;
export const NEGATION_AFTER = /^\W*(?:no\s+longer|no\s+more|any\s*more)\b/i;

/** THE CITATION: the shared ROLE reading of the program family (test/helpers/apo-ui-publish-census.ts, wb-021.4). */
export const cites = (text: string): boolean => roleReading(text) !== undefined;
export function carried(text: string, pattern: RegExp): boolean {
  for (const hit of text.matchAll(pattern)) {
    const before = text
      .slice(0, hit.index)
      .split(/\s+/)
      .filter(word => word.length > 0)
      .slice(-2)
      .join(" ");
    if (!NEGATION_BEFORE.test(before) && !NEGATION_AFTER.test(text.slice(hit.index + hit[0].length))) return true;
  }
  return false;
}
export const carriesStatus = (text: string): boolean => carried(text, STATUS_PATTERN) || carried(text, STATUS_LITERAL_PATTERN);
export const carriesScope = (text: string): boolean => carried(text, SCOPE_PATTERN);

export type UnitKind = "block" | "line" | "string" | "comment" | "code" | "text";
/** The units that owe both carriers: a markdown unit (a Pi doc's) and a script's string (a surfaced string). */
export const OWES: readonly UnitKind[] = ["block", "line", "string"];
/** What a reader sees of a unit, as a carrier: an opaque view carries nothing. */
export interface CarrierView {
  readonly text: string;
  readonly opaque: boolean;
}
export interface Unit {
  readonly line: number;
  readonly kind: UnitKind;
  readonly text: string;
  /** A markdown unit's carrier view (THE CARRIER VIEW), read lazily; a unit without one is shown as its text. */
  readonly view?: () => CarrierView;
}
export const BLANK = /^\s*(?:>\s*)*$/;
export const LIST_ITEM = /^\s*(?:>\s*)*(?:[-*+]|\d{1,9}[.)])\s+/;
export const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
export const TABLE_ROW = /^\s*\|/;
export const FENCE = /^\s{0,3}(?:`{3,}|~{3,})/;
/** The carrier view: marked token types whose text no reader of the rendered page sees as a carrier. */
export const UNSHOWN: readonly string[] = ["html", "image", "def", "del", "space", "hr"];
/** An html token opening or closing an element: an attribute or a style can hide the text between its tags, so its view is opaque. */
export const ELEMENT = /^<\/?[A-Za-z]/;
/** Footnote syntax shows no carrier: a reference renders as a number (never its label), a definition apart from its paragraph. */
export const FOOTNOTE = { reference: /\[\^[^\]\n]+\]/g, definition: /^\s*(?:>\s*)*\[\^[^\]\n]+\]:/ };

/** A markdown line's place in its document's own rendering: rendered with its unit, shown verbatim as code, hidden, or opaque. */
export type LineShow = "rendered" | "code" | "hidden" | "opaque";
export const SHOW_RANK: Readonly<Record<LineShow, number>> = { rendered: 0, code: 1, hidden: 2, opaque: 3 };
export const isList = (token: Token): token is Tokens.List => token.type === "list";
export const isTable = (token: Token): token is Tokens.Table => token.type === "table";
export function childrenOf(token: Token): readonly Token[] {
  if (isList(token)) return token.items.flatMap(item => item.tokens);
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
export function textField(token: Token): string {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
}
/** A list or quote whose raw HTML crosses a blank line (a line of white space and '>' marks only, as BLANK reads it): the census's units cannot see where that HTML ends. */
export function spansBlankLine(token: Token): boolean {
  return childrenOf(token).some(child => (child.type === "html" && /\n[\s>]*\n/.test(child.raw)) || spansBlankLine(child));
}
export function placeOf(token: Token, line: string): LineShow {
  if (token.type === "html" || token.type === "def") return "hidden";
  if (token.type === "code") return FENCE.test(line) ? "hidden" : "code";
  if ((token.type === "list" || token.type === "blockquote") && spansBlankLine(token)) return "opaque";
  return "rendered";
}
/** Each line's place, read from marked's top-level tokens of the whole document (their raws tile its source), and its link definitions. */
export function documentView(text: string): { readonly places: readonly LineShow[]; readonly links: Links } {
  const source = text.split("\n");
  const places: LineShow[] = source.map(() => "rendered");
  const tokens = marked.lexer(text);
  let line = 0;
  for (const token of tokens) {
    const breaks = token.raw.split("\n").length - 1;
    const last = token.raw.endsWith("\n") ? line + breaks - 1 : line + breaks;
    for (let at = line; at <= last && at < source.length; at += 1) {
      const place = placeOf(token, source[at] ?? "");
      if (SHOW_RANK[place] > SHOW_RANK[places[at] ?? "rendered"]) places[at] = place;
    }
    line += breaks;
  }
  return { places, links: tokens.links };
}
/** What a reader sees of marked tokens as a carrier: unshown types and an inline link's destination and title show nothing (an autolink shows its address, its text). */
export function shownText(tokens: readonly Token[], separator: string, view: { opaque: boolean }): string {
  return tokens
    .map(token => {
      if (token.type === "html" && ELEMENT.test(token.raw.trim())) view.opaque = true;
      if (UNSHOWN.includes(token.type)) return "";
      if (token.type === "br") return "\n";
      if (isList(token)) return token.items.map(item => shownText(item.tokens, "\n", view)).join("\n");
      if (isTable(token)) return [...token.header, ...token.rows.flat()].map(cell => shownText(cell.tokens, "", view)).join(" ");
      const children = childrenOf(token);
      return children.length > 0 ? shownText(children, token.type === "blockquote" ? "\n" : "", view) : textField(token);
    })
    .join(separator);
}
/** A unit's carrier view: opaque when any line is; else its hidden lines dropped, shown verbatim when every line is code or hidden, and otherwise rendered on its own (indentation of spaces and tabs removed, footnote syntax removed, the document's definitions preloaded). */
export function carrierView(lines: readonly string[], places: readonly LineShow[], links: Links): CarrierView {
  if (places.includes("opaque")) return { text: "", opaque: true };
  const kept = lines.filter((_, index) => places[index] !== "hidden");
  if (places.every(place => place === "code" || place === "hidden")) return { text: kept.join("\n"), opaque: false };
  const markdown = kept
    .filter(line => !FOOTNOTE.definition.test(line))
    .map(line => line.replace(/^[ \t]+/, "").replace(FOOTNOTE.reference, ""))
    .join("\n");
  const lexer = new Lexer();
  Object.assign(lexer.tokens.links, links);
  const view = { opaque: false };
  const text = shownText(lexer.lex(markdown), "\n", view);
  return { text, opaque: view.opaque };
}
/** Markdown units by THE UNITS' five patterns: a line FENCE, HEADING or TABLE_ROW reads and every line of an open fence is a unit of its own, BLANK ends a block and LIST_ITEM opens one; any other heading, row or fence line is read inside its block (R-UNCUT). */
export function markdownUnits(text: string): Unit[] {
  const units: Unit[] = [];
  let document: ReturnType<typeof documentView> | undefined;
  /** The document's own rendering, read once and only when a citing unit asks for its view. */
  const read = (): ReturnType<typeof documentView> => {
    document ??= documentView(text);
    return document;
  };
  const push = (line: number, kind: UnitKind, lines: readonly string[]): void => {
    const view = (): CarrierView => {
      const { places, links } = read();
      return carrierView(
        lines,
        lines.map((_, offset) => places[line - 1 + offset] ?? "rendered"),
        links,
      );
    };
    units.push({ line, kind, text: lines.join("\n"), view });
  };
  let open: { line: number; lines: string[] } | undefined;
  let fenced = false;
  const flush = (): void => {
    if (open !== undefined) push(open.line, "block", open.lines);
    open = undefined;
  };
  for (const [index, line] of text.split("\n").entries()) {
    const at = index + 1;
    if (FENCE.test(line)) {
      flush();
      fenced = !fenced;
      push(at, "line", [line]);
    } else if (fenced) push(at, "line", [line]);
    else if (BLANK.test(line)) flush();
    else if (HEADING.test(line) || TABLE_ROW.test(line)) {
      flush();
      push(at, "line", [line]);
    } else if (LIST_ITEM.test(line) || open === undefined) {
      flush();
      open = { line: at, lines: [line] };
    } else open.lines.push(line);
  }
  flush();
  return units;
}
export function scriptKindOf(path: string): ts.ScriptKind {
  if (/\.[cm]?jsx?$/.test(path)) return path.endsWith("x") ? ts.ScriptKind.JSX : ts.ScriptKind.JS;
  return path.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
}
/** Script units through the TypeScript AST: strings (cooked), templates, comments (leading and same-line trailing ranges), and identifiers as code. */
export function sourceUnits(path: string, text: string): Unit[] {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const units: Unit[] = [];
  const seen = new Set<number>();
  const lineOf = (position: number): number => file.getLineAndCharacterOfPosition(position).line + 1;
  const comments = (start: number, end: number): void => {
    for (const range of [...(ts.getLeadingCommentRanges(text, start) ?? []), ...(ts.getTrailingCommentRanges(text, end) ?? [])]) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      units.push({ line: lineOf(range.pos), kind: "comment", text: text.slice(range.pos, range.end) });
    }
  };
  const visit = (node: ts.Node): void => {
    if (node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode) return;
    comments(node.getFullStart(), node.getEnd());
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isRegularExpressionLiteral(node)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: node.text });
    } else if (ts.isTemplateExpression(node)) {
      const body = node.head.text + node.templateSpans.map(span => `\${${span.expression.getText(file)}}${span.literal.text}`).join("");
      /** THE CARRIER VIEW of a template: its cooked parts, each substitution shown as nothing. */
      const shown = node.head.text + node.templateSpans.map(span => span.literal.text).join("");
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: body, view: () => ({ text: shown, opaque: false }) });
    } else if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "code", text: node.text });
    }
    for (const child of node.getChildren(file)) visit(child);
  };
  visit(file);
  return units;
}
export const MARKDOWN = /\.md$/;
export const SCRIPT = /\.[cm]?[jt]sx?$/;
export function unitsOf(path: string, text: string): Unit[] {
  if (MARKDOWN.test(path)) return markdownUnits(text);
  if (SCRIPT.test(path)) return sourceUnits(path, text);
  return text.split("\n").flatMap((line, index) => (line.trim() === "" ? [] : [{ line: index + 1, kind: "text" as const, text: line }]));
}

/** An expression with its parentheses, non-null assertions, as and angle-bracket assertions and satisfies clauses removed (of an as, angle-bracket or satisfies wrapper the census holds the string keyword, const and a literal type). */
export function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isParenthesizedExpression(at) || ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isNonNullExpression(at) || ts.isTypeAssertionExpression(at)) at = at.expression;
  return at;
}
export function literalOf(node: ts.Expression): string | undefined {
  const at = unwrapped(node);
  return ts.isStringLiteral(at) || ts.isNoSubstitutionTemplateLiteral(at) ? at.text : undefined;
}
export function propertyNameOf(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) return literalOf(name.expression);
  return undefined;
}
export function accessNameOf(node: ts.Expression): string | undefined {
  const at = unwrapped(node);
  if (ts.isPropertyAccessExpression(at)) return at.name.text;
  if (ts.isElementAccessExpression(at)) return literalOf(at.argumentExpression);
  return undefined;
}
/** THE EFFECT CLASS: each effectClass this reader finds a module setting (a property assignment or a shorthand property, a class field with an initializer, or a plain `=` assignment to a property or element access) whose value is not the literal "read"; a compound assignment, and a key or element argument that does not unwrap to a string or plain template literal, are not read. */
export function effectClasses(path: string, text: string): { line: number; value: string }[] {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: { line: number; value: string }[] = [];
  const visit = (node: ts.Node): void => {
    let value: string | undefined;
    if (ts.isPropertyAssignment(node) && propertyNameOf(node.name) === EFFECT_PROPERTY) value = literalOf(node.initializer) ?? "non-literal";
    else if (ts.isPropertyDeclaration(node) && node.initializer !== undefined && propertyNameOf(node.name) === EFFECT_PROPERTY) value = literalOf(node.initializer) ?? "non-literal";
    else if (ts.isShorthandPropertyAssignment(node) && node.name.text === EFFECT_PROPERTY) value = "non-literal";
    else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && accessNameOf(node.left) === EFFECT_PROPERTY) value = literalOf(node.right) ?? "non-literal";
    if (value !== undefined && value !== READ) found.push({ line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1, value });
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}

export type FileKind = "lock" | "binary" | "markdown" | "script" | "text";
export interface FileText {
  readonly path: string;
  readonly text: string;
}
export function fileKindOf(path: string, text: string): FileKind {
  if (LOCKS.includes(path)) return "lock";
  if (text.includes(NUL)) return "binary";
  if (MARKDOWN.test(path)) return "markdown";
  if (SCRIPT.test(path)) return "script";
  return "text";
}
export interface Citing {
  readonly at: string;
  readonly key: string;
}
export interface Judgement {
  readonly kinds: Readonly<Record<FileKind, number>>;
  readonly units: number;
  readonly strings: number;
  readonly citing: readonly Citing[];
  readonly banner: readonly string[];
  readonly findings: readonly string[];
}
export function squeezed(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** The run guard's counter: each judgeFiles call raises it by one (THE RUN GUARD; the parent's export reader, not moved here, raised it too). */
export const READS = { calls: 0 };

/** THE JUDGE: every unit of every file, the carriers a citing doc unit or string owes, then each banner module's effect classes. */
export function judgeFiles(files: readonly FileText[]): Judgement {
  READS.calls += 1;
  const kinds: Record<FileKind, number> = { lock: 0, binary: 0, markdown: 0, script: 0, text: 0 };
  let units = 0;
  let strings = 0;
  const citing: Citing[] = [];
  const banner: string[] = [];
  const findings: string[] = [];
  for (const file of files) {
    const kind = fileKindOf(file.path, file.text);
    kinds[kind] += 1;
    if (kind === "lock" || kind === "binary") continue;
    let cited = false;
    for (const unit of unitsOf(file.path, file.text)) {
      units += 1;
      if (unit.kind === "string") strings += 1;
      if (!cites(unit.text)) continue;
      cited = true;
      citing.push({ at: `${file.path}:${unit.line}`, key: `${file.path} ${squeezed(unit.text)}` });
      if (!OWES.includes(unit.kind)) continue;
      const view = unit.view?.() ?? { text: unit.text, opaque: false };
      if (view.opaque || !carriesStatus(view.text)) findings.push(`${file.path}:${unit.line} status`);
      if (view.opaque || !carriesScope(view.text)) findings.push(`${file.path}:${unit.line} scope`);
    }
    if (cited && kind === "script" && file.path.startsWith("src/")) {
      banner.push(file.path);
      for (const effect of effectClasses(file.path, file.text)) findings.push(`${file.path}:${effect.line} effect-class:${effect.value}`);
    }
  }
  return { kinds, units, strings, citing, banner, findings };
}
/** Causes of one control text read as a whole file at a path. */
export function causesOf(path: string, text: string): string[] {
  return judgeFiles([{ path, text }]).findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
}
/** THE BINDING: a citing unit no BOUND entry names is unbound; a BOUND entry no citing unit carries is stale. */
export function bindingOf(citing: readonly Citing[], bound: readonly string[]): string[] {
  const keys = citing.map(entry => entry.key);
  return [...citing.filter(entry => !bound.includes(entry.key)).map(entry => `${entry.at} unbound`), ...bound.filter(entry => !keys.includes(entry)).map(entry => `${entry} stale`)];
}

