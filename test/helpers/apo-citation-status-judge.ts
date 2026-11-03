/**
 * wb-021.11 (the rule-19 dependency-inversion child of wb-021.9, rulings R-B289 and R-B293; wb-021.6's APO citation-status
 * judge): the judge of wb-021.9's FINAL cut #4 (machine/flywheel/wb-021.9 tip 4334fecdaddbce1494c859d7d312a00d27c66b74,
 * test/helpers/apo-citation-status-judge.ts), moved here so that a census can hold its readings
 * (test/workbench-apo-citation-status-judge-members-census.test.ts). Under R-B293 the parent wb-021.9 is parked and waits on
 * wb-021.11; its later re-cut can import this judge. Every non-blank line below this header is copied byte for byte from that
 * tip, in its order - lines 16-18, 21, 23-24, 26-27, 30-38, 40-41, 44-58, 60, 62, 64-71, 73-79, 81, 83, 85, 88-100, 102-110,
 * 112-127, 129-141, 143-156, 158-160, 162-205, 207-225, 227-243, 246-265, 267-281, 283-309, 312, 315-345, 347-349, 351-354 -
 * and only this header is added. Left out are the tip's own header (lines 1-15) and its 25 doc comments (lines 20, 29, 39, 43,
 * 61, 63, 72, 80, 82, 84, 87, 101, 111, 128, 142, 157, 161, 206, 226, 245, 266, 311, 314, 346, 350): several state what
 * wb-021.9's census holds, and that census is not on trunk. What this module is held to is the members census's pinned probes.
 * Nothing here reads the file system: callers pass each file's path and text. Display paths added: none (test-only; no src,
 * docs or receipt is read or written here).
 */
import { Lexer, type Links, marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { roleReading } from "./apo-ui-publish-census.js";

export const LOCKS: readonly string[] = ["package-lock.json", "vendor/dependency-lock.json"];

export const EFFECT_PROPERTY = "effectClass";
export const READ = "read";

export const cp = (...points: number[]): string => String.fromCodePoint(...points);
export const NUL = cp(0);

export const STATUS_WORD = "design-stage";
export const SCOPE_WORD = "non-effectful";
export const STATUS_LITERAL = "accepted design direction; documentation only";
export function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export const STATUS_PATTERN = new RegExp(`(?<![\\w-])${escaped(STATUS_WORD)}(?![\\w-])`, "gi");
export const SCOPE_PATTERN = new RegExp(`(?<![\\w-])${escaped(SCOPE_WORD)}(?![\\w-])`, "gi");
export const STATUS_LITERAL_PATTERN = new RegExp(`(?<![\\w-])${STATUS_LITERAL.split(/\s+/).map(escaped).join("\\s+")}(?![\\w-])`, "gi");
export const NEGATION_BEFORE = /\b(?:not|never|nor|no|isn't|aren't|wasn't|weren't|formerly|previously)\b/i;
export const NEGATION_AFTER = /^\W*(?:no\s+longer|no\s+more|any\s*more)\b/i;

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
export const OWES: readonly UnitKind[] = ["block", "line", "string"];
export interface CarrierView {
  readonly text: string;
  readonly opaque: boolean;
}
export interface Unit {
  readonly line: number;
  readonly kind: UnitKind;
  readonly text: string;
  readonly view?: () => CarrierView;
}
export const BLANK = /^\s*(?:>\s*)*$/;
export const LIST_ITEM = /^\s*(?:>\s*)*(?:[-*+]|\d{1,9}[.)])\s+/;
export const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
export const TABLE_ROW = /^\s*\|/;
export const FENCE = /^\s{0,3}(?:`{3,}|~{3,})/;
export const UNSHOWN: readonly string[] = ["html", "image", "def", "del", "space", "hr"];
export const ELEMENT = /^<\/?[A-Za-z]/;
export const FOOTNOTE = { reference: /\[\^[^\]\n]+\]/g, definition: /^\s*(?:>\s*)*\[\^[^\]\n]+\]:/ };

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
export function spansBlankLine(token: Token): boolean {
  return childrenOf(token).some(child => (child.type === "html" && /\n[\s>]*\n/.test(child.raw)) || spansBlankLine(child));
}
export function placeOf(token: Token, line: string): LineShow {
  if (token.type === "html" || token.type === "def") return "hidden";
  if (token.type === "code") return FENCE.test(line) ? "hidden" : "code";
  if ((token.type === "list" || token.type === "blockquote") && spansBlankLine(token)) return "opaque";
  return "rendered";
}
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
export function markdownUnits(text: string): Unit[] {
  const units: Unit[] = [];
  let document: ReturnType<typeof documentView> | undefined;
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

export const READS = { calls: 0 };

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
export function causesOf(path: string, text: string): string[] {
  return judgeFiles([{ path, text }]).findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
}
export function bindingOf(citing: readonly Citing[], bound: readonly string[]): string[] {
  const keys = citing.map(entry => entry.key);
  return [...citing.filter(entry => !bound.includes(entry.key)).map(entry => `${entry.at} unbound`), ...bound.filter(entry => !keys.includes(entry)).map(entry => `${entry} stale`)];
}
