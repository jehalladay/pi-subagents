/**
 * wb-e66.5 (MW-GRAPH-POLICY-COORDINATION-R10): the tables, the readers and the judges of the GP-coordination adoption
 * census, test/workbench-mw-gp-coordination-census.test.ts (its header states the bead, the measured facts and every
 * reading). Everything here is pure over the inputs it is handed except the four listers (gitList, walkList,
 * ignoredOf, pinTree), which read only the repository they are given through git and the filesystem. Nothing here
 * starts gp or mp, fakes a GraphPolicyCLI binary, adds a dependency or implements an adapter: the planted modules and
 * receipts are text handed to the judges. wb-5esj (the landing-542 verdict's F2 and F3): the means reader reads a program,
 * a const's binding and a require or import() specifier through its wrappers, and the admission judge reads a receipt's
 * rendered view and matches the record's path as a whole path. wb-5esj cut #2 (its refusal #1): an entry ends at a heading
 * of level 1 or 2 at any depth, or at a block holding an HTML <h1> or <h2> start tag (U1), and opens only on a real
 * calendar date; a launcher's or a require's callee and a version probe's argument list are read through their wrappers
 * and the comma form (F1, F2).
 */
import { execFileSync, spawnSync } from "node:child_process";
import { lstatSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";

// ---- the vocabulary (the statement's "GraphPolicy/GraphDataIR/mw.training-export" and the filing grep's four words) ----

export interface Word {
  readonly id: string;
  /** The spelling the bead text uses. */
  readonly spelling: string;
  /** The spelling read case-insensitively, any run of space, tab, dot, underscore or hyphen allowed between its parts. */
  readonly pattern: RegExp;
}

/** The parts of a spelling: split at dots, underscores and hyphens, then at camel-case humps ("GraphDataIR" -> graph, data, ir). */
export function partsOf(spelling: string): string[] {
  return spelling
    .split(/[._-]+/)
    .flatMap(piece => piece.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? [])
    .map(part => part.toLowerCase());
}

const SEPARATORS = "[ \\t._-]*";
const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordOf = (id: string, spelling: string): Word => ({ id, spelling, pattern: new RegExp(partsOf(spelling).map(escaped).join(SEPARATORS), "i") });

/** The four words, in the filing grep's order: 'GraphPolicy|GraphDataIR|MicroPolicy|mw.training-export'. */
export const VOCABULARY: readonly Word[] = [wordOf("V1", "GraphPolicy"), wordOf("V2", "GraphDataIR"), wordOf("V3", "MicroPolicy"), wordOf("V4", "mw.training-export")];

/** The words a text names, in VOCABULARY order, each once. */
export function namedWords(text: string): string[] {
  return VOCABULARY.filter(word => word.pattern.test(text)).map(word => word.spelling);
}

// ---- the means reader: a GraphPolicyCLI or MicroPolicyCLI import, or a launch of their binaries ----

/** The child_process launchers, called bare or as a member. */
export const LAUNCHERS: readonly string[] = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** The launchers whose first argument is a shell line (its program is the line's first word). */
const SHELL_LAUNCHERS = new Set(["exec", "execSync"]);
/** The two binaries: GraphPolicyCLI's gp and MicroPolicyCLI's mp. */
export const PROGRAMS: readonly string[] = ["gp", "mp"];
/** A bare gp or mp package specifier (gp, gp/<subpath>, mp, mp/<subpath>). */
const BARE_SPECIFIER = /^(?:gp|mp)(?:\/|$)/i;

const CODE_EXTENSIONS = new Set([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"]);

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extname(path).toLowerCase();
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

/** The program a launch names: the file argument's last path segment (or a shell line's first word's), lower-cased, with a Windows launcher extension dropped. */
export function programOf(launcher: string, argument: string): string {
  const trimmed = argument.trim();
  const word = SHELL_LAUNCHERS.has(launcher) ? (trimmed.split(/\s+/)[0] ?? "") : trimmed;
  const segment = word.split(/[/\\]/).pop() ?? "";
  return segment.toLowerCase().replace(/\.(?:exe|cmd|bat|ps1)$/, "");
}

/**
 * A version probe: `gp --version` as the whole argv. The shell form: the line's words after the program are exactly
 * --version. The file form: the second argument is an array literal of exactly one element, the string --version, the
 * list and the element each read through their wrappers (wb-5esj cut #2, refusal #1 F2: (["--version"]), ["--version"] as
 * const and [("--version")] are probes); a list bound to a name, a spread or a second element is no probe.
 */
function isVersionProbe(launcher: string, call: ts.CallExpression, argument: string): boolean {
  if (SHELL_LAUNCHERS.has(launcher)) return argument.trim().split(/\s+/).slice(1).join(" ") === "--version";
  const list = call.arguments[1] === undefined ? undefined : unwrapped(call.arguments[1]);
  if (list === undefined || !ts.isArrayLiteralExpression(list) || list.elements.length !== 1) return false;
  const only = unwrapped(list.elements[0] as ts.Expression);
  return ts.isStringLiteralLike(only) && only.text === "--version";
}

export interface Means {
  readonly kind: "imports" | "launches";
  /** The specifier, or the launch's program argument as read. */
  readonly text: string;
  readonly versionProbe: boolean;
}

/** A comma expression (a, b): its value is its last operand. */
const isCommaExpression = (node: ts.Expression): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken;

/**
 * An expression read through its wrappers: parentheses, the as, satisfies, angle-bracket and non-null assertions, and a
 * comma expression's last operand, none of which changes the value (wb-5esj F2: "gp" as const, ("gp"), "gp" as string and
 * "gp" satisfies string are "gp"; cut #2, refusal #1 F1: (spawn), spawn!, (cp.spawn as typeof cp.spawn) and the comma
 * form (0, cp.spawn) of a CommonJS emit are the launcher they wrap).
 */
function unwrapped(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current) || ts.isNonNullExpression(current) || isCommaExpression(current)) {
    current = isCommaExpression(current) ? current.right : current.expression;
  }
  return current;
}

/** The string a first argument reads as, through its wrappers: a string literal, a template's literal head, or a same-file const bound to a string literal. */
function argumentText(node: ts.Expression | undefined, consts: ReadonlyMap<string, string>): string | undefined {
  if (node === undefined) return undefined;
  const value = unwrapped(node);
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isTemplateExpression(value)) return value.head.text;
  if (ts.isIdentifier(value)) return consts.get(value.text);
  return undefined;
}

/** Every const of the file bound to a string literal (read through its wrappers), by name (the first binding of a name wins). */
function stringConsts(source: ts.SourceFile): Map<string, string> {
  const consts = new Map<string, string>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.Const) !== 0) {
      for (const declaration of node.declarations) {
        const value = declaration.initializer === undefined ? undefined : unwrapped(declaration.initializer);
        if (ts.isIdentifier(declaration.name) && value !== undefined && ts.isStringLiteralLike(value) && !consts.has(declaration.name.text)) {
          consts.set(declaration.name.text, value.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return consts;
}

const isGpSpecifier = (specifier: string): boolean => BARE_SPECIFIER.test(specifier) || namedWords(specifier).length > 0;
const isGpProgram = (launcher: string, argument: string): boolean => PROGRAMS.includes(programOf(launcher, argument)) || namedWords(argument).length > 0;

/** The GP means a source file carries, in source order: imports of a GP or MP package and launches of gp or mp. */
export function meansOf(path: string, text: string): Means[] {
  if (!CODE_EXTENSIONS.has(extname(path).toLowerCase())) return [];
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const consts = stringConsts(source);
  const found: Means[] = [];
  const specifier = (node: ts.Expression | undefined): void => {
    const value = node === undefined ? undefined : unwrapped(node);
    if (value !== undefined && ts.isStringLiteralLike(value) && isGpSpecifier(value.text)) found.push({ kind: "imports", text: value.text, versionProbe: false });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) specifier(node.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) specifier(node.moduleReference.expression);
    else if (ts.isCallExpression(node)) {
      // wb-5esj cut #2 (refusal #1 F1): the callee is read through its wrappers and the comma form too.
      const callee = unwrapped(node.expression);
      if (callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require")) specifier(node.arguments[0]);
      const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : "";
      if (LAUNCHERS.includes(name)) {
        const argument = argumentText(node.arguments[0], consts);
        if (argument !== undefined && isGpProgram(name, argument)) found.push({ kind: "launches", text: argument.trim(), versionProbe: isVersionProbe(name, node, argument) });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

// ---- the judges ----

export type Leg = "src" | "test";

/**
 * One file's findings. src: every vocabulary word it names (any position, the filing grep's reading), then every GP
 * means. test: every GP means except a version probe; a test file naming the vocabulary is a posture guard's text
 * (the residual R-TEST-MENTION), never a finding.
 */
export function fileFindings(leg: Leg, path: string, text: string): string[] {
  const words = leg === "src" ? namedWords(text).map(word => `${path}: names ${word}`) : [];
  const means = meansOf(path, text)
    .filter(entry => leg === "src" || !entry.versionProbe)
    .map(entry => `${path}: ${entry.kind} ${entry.text}`);
  return [...words, ...means];
}

export interface Adoption {
  /** The src module or test file the allowlist admits. */
  readonly path: string;
  /** shadow: the shadow-mode adapter (or its tests); canary: the opt-in canary. */
  readonly kind: "shadow" | "canary";
  /** The receipt holding the dated adoption record. */
  readonly receipt: string;
}

/** The receipts route (standing rule 13 / R539): TRACEABILITY.md is frozen, a record lands as a dated receipt entry. */
export const RECEIPT_ROUTE = /^docs\/workbench\/receipts\/wb-[a-z0-9]+(?:\.[0-9]+)*\.md$/;
/** A receipt reference: a Forge command id or a commit pin (<anything>@<7-40 hex>). */
export const REFERENCE = /\bcmd_[0-9a-f]{12}\b|@[0-9a-f]{7,40}\b/;
/** The eight acceptance terms, README.md:23@4b8b974ca72b, as the bead lists them. */
export const TERMS: readonly string[] = [
  "original Policy/reconcile laws unchanged",
  "pure GP call",
  "exact source ID mapping",
  "original behavior probability",
  "no native-effect bypass",
  "stale result rejection",
  "evidence sidecar parity",
  "Forge-installed integration tests",
];
/** The shadow-mode run as clause (b) names it. */
export const SHADOW_RUN: readonly string[] = ["shadow-mode run", "zero control decisions issued", "zero native verbs reached"];
/** The canary's recorded rollback path as clause (c) names it. */
export const ROLLBACK = "rollback path";

export interface DatedEntry {
  readonly date: string;
  readonly text: string;
}

// ---- the rendered view of a receipt (wb-5esj F3: marked's token tree, the docs censuses' binding; cut #2: its bounds) ----

const tokenText = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const tokenChildren = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";

/**
 * What a reader sees of inline tokens: HTML (a comment, or a tag with its attributes) and an image (its alt text too) show
 * no text; a hard line break ends a line; a token with children shows what its children show (a link its text, never its
 * target or title; an emphasis, so a comment inside it stays hidden); every other token shows its text (a code span's, an
 * autolink's URL, an escaped character).
 */
function shownInline(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html" || token.type === "image") continue;
    if (token.type === "br") out += "\n";
    else if (tokenChildren(token).length > 0) out += shownInline(tokenChildren(token));
    else out += tokenText(token);
  }
  return out;
}

/** An HTML start tag of a level-1 or level-2 heading: <h1 or <h2, in any case, then whitespace, a slash or >. */
const HEADING_TAG = /<h[12](?=[\s/>])/i;
/** HTML comments, closed or running to the end of the text. */
const COMMENTS = /<!--[\s\S]*?(?:-->|$)/g;
/** Whether raw HTML holds a level-1 or level-2 heading start tag outside its comments. */
const holdsHeadingTag = (html: string): boolean => HEADING_TAG.test(html.replace(COMMENTS, ""));
/** Whether inline tokens hold, at any depth, inline HTML with a level-1 or level-2 heading start tag outside its comments. */
const inlineHoldsHeadingTag = (tokens: readonly Token[]): boolean => tokens.some(token => (token.type === "html" && holdsHeadingTag(token.raw)) || inlineHoldsHeadingTag(tokenChildren(token)));

/**
 * The date an entry opens with: the heading's source starts, in the first column, with '## ' (two number signs and a
 * space), and its shown text begins with a real calendar date YYYY-MM-DD (2026-02-29 is none, 2028-02-29 is one) followed
 * by whitespace or the text's end.
 */
function openingDate(raw: string, shown: string): string | undefined {
  if (!raw.startsWith("## ")) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:\s|$)/.exec(shown);
  if (match === null) return undefined;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const calendar = new Date(0);
  calendar.setUTCFullYear(year, month - 1, day);
  const real = calendar.getUTCFullYear() === year && calendar.getUTCMonth() === month - 1 && calendar.getUTCDate() === day;
  return real ? `${match[1]}-${match[2]}-${match[3]}` : undefined;
}

/** One step of a receipt's rendered view, in document order: a shown line, or a bound (the open entry ends; a dated heading opens the next). */
type ViewStep = { readonly kind: "line"; readonly text: string } | { readonly kind: "bound"; readonly opens: { readonly date: string; readonly line: string } | undefined };

/**
 * The rendered view's steps over block tokens (wb-5esj cut #2, refusal #1 U1: a bound at any depth). Code (fenced, an
 * unclosed fence or indented), blank space, a thematic break and a link reference definition show nothing. An HTML block
 * shows nothing, whole (text after a comment's close on its last line too), and is a bound when it holds a level-1 or
 * level-2 heading start tag outside its comments. A block quote and a list item show their blocks, at any nesting. A
 * table row is one line, its cells joined by ' | '. A heading of level 1 or 2 is a bound at any depth, ATX or setext,
 * top-level or nested; only a top-level one holding no heading tag can open an entry (openingDate). Any other block
 * holding an inline heading tag is a bound before it, so none of its text joins the entry it ends; a block's shown text
 * is one line per line, a soft or a hard line break ending each.
 */
function* viewSteps(tokens: readonly Token[], top: boolean): Generator<ViewStep> {
  for (const token of tokens) {
    if (token.type === "code" || token.type === "space" || token.type === "hr" || token.type === "def") continue;
    if (token.type === "html") {
      if (holdsHeadingTag(token.raw)) yield { kind: "bound", opens: undefined };
    } else if (isList(token)) {
      for (const item of token.items) yield* viewSteps(item.tokens, false);
    } else if (token.type === "blockquote") {
      yield* viewSteps(tokenChildren(token), false);
    } else if (isTable(token)) {
      const rows = [token.header, ...token.rows];
      if (rows.some(cells => cells.some(cell => inlineHoldsHeadingTag(cell.tokens)))) yield { kind: "bound", opens: undefined };
      for (const cells of rows) yield { kind: "line", text: cells.map(cell => shownInline(cell.tokens)).join(" | ") };
    } else {
      const inline = tokenChildren(token);
      const tagged = inlineHoldsHeadingTag(inline);
      if (isHeading(token) && token.depth <= 2) {
        const shown = shownInline(token.tokens);
        const date = top && !tagged ? openingDate(token.raw, shown) : undefined;
        yield { kind: "bound", opens: date === undefined ? undefined : { date, line: `## ${shown}` } };
      } else {
        if (tagged) yield { kind: "bound", opens: undefined };
        for (const text of (inline.length > 0 ? shownInline(inline) : tokenText(token)).split("\n")) yield { kind: "line", text };
      }
    }
  }
}

/**
 * A receipt's dated entries, read from its rendered view (marked's token tree; wb-5esj F3 and cut #2): an entry opens at a
 * top-level '## ' heading whose shown text begins with a real date (openingDate) and runs to the next bound (viewSteps: a
 * heading of level 1 or 2 at any depth, or a block holding an HTML <h1> or <h2> start tag); its text is its heading's line
 * ('## ' and the shown text) and the shown lines up to that bound, so what HTML or a code block holds is never part of a
 * record.
 */
export function datedEntries(text: string): DatedEntry[] {
  const entries: DatedEntry[] = [];
  let current: { date: string; lines: string[] } | undefined;
  const close = (): void => {
    if (current !== undefined) entries.push({ date: current.date, text: current.lines.join("\n") });
    current = undefined;
  };
  for (const step of viewSteps(marked.lexer(text), true)) {
    if (step.kind === "line") current?.lines.push(step.text);
    else {
      close();
      if (step.opens !== undefined) current = { date: step.opens.date, lines: [step.opens.line] };
    }
  }
  close();
  return entries;
}

/**
 * A path's characters (ASCII letters, digits and _ . / ~ + -): a record names a path only as a whole run of them, its
 * closing dots (a sentence's end) dropped, so a character outside the run (é, a comma, #, @) ends a run.
 */
const PATH_RUN = /[A-Za-z0-9_./~+-]+/g;
/** Whether a text names a path as a whole path (wb-5esj F3: src/workbench/gp-shadow.tsx names no src/workbench/gp-shadow.ts). */
export function namesPath(text: string, path: string): boolean {
  return (text.match(PATH_RUN) ?? []).some(run => run.replace(/\.+$/, "") === path);
}

/**
 * Why an adoption is not admitted: empty when its receipt's one dated record (read from the rendered view, naming the
 * adoption's path as a whole path) cites every term (each on a line of its own), the shadow-mode run (both zero phrases on
 * one line) and, for a canary, the rollback path, each line carrying a reference the rendered view shows.
 */
export function admissionFindings(adoption: Adoption, receipt: (path: string) => string | undefined): string[] {
  const at = adoption.path;
  if (!RECEIPT_ROUTE.test(adoption.receipt)) return [`${at}: receipt-route ${adoption.receipt}`];
  const text = receipt(adoption.receipt);
  if (text === undefined) return [`${at}: receipt-missing ${adoption.receipt}`];
  const records = datedEntries(text).filter(entry => namesPath(entry.text, at));
  if (records.length === 0) return [`${at}: record-missing ${adoption.receipt}`];
  if (records.length > 1) return [`${at}: record-duplicate ${adoption.receipt}`];
  const lines = (records[0]?.text ?? "").split("\n");
  const names = (line: string, needle: string): boolean => line.toLowerCase().includes(needle.toLowerCase());
  const cited = (needles: readonly string[]): boolean => lines.some(line => REFERENCE.test(line) && needles.every(needle => names(line, needle)));
  // Each term is its own gate receipt: a line counts for a term only when it names no other term.
  const citedAlone = (term: string): boolean => lines.some(line => REFERENCE.test(line) && names(line, term) && TERMS.every(other => other === term || !names(line, other)));
  const findings = TERMS.filter(term => !citedAlone(term)).map(term => `${at}: term-uncited ${term}`);
  if (!cited(SHADOW_RUN)) findings.push(`${at}: shadow-run-uncited`);
  if (adoption.kind === "canary" && !cited([ROLLBACK])) findings.push(`${at}: canary-rollback-unrecorded`);
  return findings;
}

export interface Entry {
  readonly path: string;
  readonly text: string;
}

/**
 * A leg's findings over its files and the allowlist: a file with findings and no adoption keeps them; a file with one
 * admitted adoption is admitted; a file with an unadmitted adoption keeps its findings plus the admission findings; two
 * adoptions of one path, or an adoption of a path of this leg that carries no finding (stale), are findings too.
 */
export function legFindings(leg: Leg, entries: readonly Entry[], adoptions: readonly Adoption[], receipt: (path: string) => string | undefined): string[] {
  const findings: string[] = [];
  const touched = new Set<string>();
  for (const entry of entries) {
    const own = fileFindings(leg, entry.path, entry.text);
    if (own.length === 0) continue;
    touched.add(entry.path);
    const listed = adoptions.filter(adoption => adoption.path === entry.path);
    if (listed.length > 1) findings.push(...own, `${entry.path}: adoption-duplicate`);
    else if (listed.length === 0) findings.push(...own);
    else {
      const admission = admissionFindings(listed[0] as Adoption, receipt);
      if (admission.length > 0) findings.push(...own, ...admission);
    }
  }
  for (const adoption of adoptions) {
    if (adoption.path.startsWith(`${leg}/`) && !touched.has(adoption.path)) findings.push(`${adoption.path}: adoption-stale`);
  }
  return findings;
}

// ---- the listers ----

/** What git would commit under a scope: tracked or untracked, never ignored, a regular file on disk (the walk's exact-set anchor). */
export function gitList(root: string, scope: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", scope], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
  const regular = (path: string): boolean => {
    try {
      return lstatSync(join(root, path)).isFile();
    } catch {
      return false;
    }
  };
  return [...new Set(out.split("\0").filter(path => path !== "" && regular(path)))].sort();
}

/** Every regular file under a scope by a filesystem walk; symbolic links are never followed (they are not regular files). */
export function walkList(root: string, scope: string): string[] {
  const files: string[] = [];
  const walk = (relative: string): void => {
    for (const name of readdirSync(join(root, relative)).sort()) {
      const path = `${relative}/${name}`;
      const info = lstatSync(join(root, path));
      if (info.isDirectory()) walk(path);
      else if (info.isFile()) files.push(path);
    }
  };
  walk(scope);
  return files.sort();
}

/** The paths among `paths` that git ignores. */
export function ignoredOf(root: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: root, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore exited ${String(result.status)}: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}

/** Every blob under the scopes at a commit, read from git's objects (git ls-tree, then one git cat-file --batch). */
export function pinTree(root: string, commit: string, scopes: readonly string[]): Entry[] {
  const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", commit, "--", ...scopes], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
  const blobs: { readonly path: string; readonly object: string }[] = [];
  for (const record of listing.split("\0")) {
    const match = /^\d+ blob ([0-9a-f]{40})\t(.+)$/s.exec(record);
    if (match !== null) blobs.push({ object: match[1] ?? "", path: match[2] ?? "" });
  }
  const batch = execFileSync("git", ["cat-file", "--batch"], { cwd: root, input: blobs.map(blob => blob.object).join("\n") + "\n", maxBuffer: 1 << 28 });
  const entries: Entry[] = [];
  let at = 0;
  for (const blob of blobs) {
    const newline = batch.indexOf(0x0a, at);
    const header = batch.subarray(at, newline).toString("utf8");
    const match = /^([0-9a-f]{40}) blob (\d+)$/.exec(header);
    if (match === null || match[1] !== blob.object) throw new Error(`git cat-file --batch: unexpected header '${header}' for ${blob.path}`);
    const size = Number(match[2]);
    entries.push({ path: blob.path, text: batch.subarray(newline + 1, newline + 1 + size).toString("utf8") });
    at = newline + 1 + size + 1;
  }
  return entries;
}

// ---- the tracker export (the outside anchor) ----

export interface BeadRow {
  readonly title: string;
  readonly notes: string;
}

/** The bead's own row in the tracker export text. */
export function beadRow(exportText: string, bead: string): BeadRow | undefined {
  for (const line of exportText.split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null) continue;
    const { id, title, notes } = row as { readonly id?: unknown; readonly title?: unknown; readonly notes?: unknown };
    if (id === bead && typeof title === "string" && typeof notes === "string") return { title, notes };
  }
  return undefined;
}

/** The owner filing's acceptance clauses: the first "Acceptance shape: " sentence to its line end, split at "; ", the final period dropped. */
export function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance shape: ");
  if (start === -1) return [];
  const end = notes.indexOf("\n", start);
  const body = notes.slice(start + "Acceptance shape: ".length, end === -1 ? undefined : end).trim();
  return body.replace(/\.$/, "").split("; ");
}

/** The quotes tile the clause in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses) between. */
export function tiles(clause: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = clause.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()]*$/.test(clause.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(clause.slice(at));
}

// ---- the judged rows (rule 16) ----

export interface Row {
  readonly id: string;
  /** An acceptance clause verbatim (A, B, C), a slice of the statement (S) or the residual families (Q). */
  readonly label: string;
  readonly pins: readonly string[];
}

/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
export const QUOTES: Readonly<Record<string, string>> = {
  A1: "one vitest census (wb-cax.25 style)",
  A2: "pins that grep at 0",
  A3: "and names this bead",
  B1: "any future adoption must first add a dated TRACEABILITY row",
  B2: "citing each of the eight gate receipts",
  B3: "and the shadow-mode run (zero control decisions issued, zero native verbs reached)",
  B4: "before the census allowlist widens",
  C1: "a canary without a recorded rollback path is refused by the same census",
  S1: "one census pins zero GraphPolicy/GraphDataIR/mw.training-export references",
  S2: "in src",
  S3: "and test",
  Q1: "R-COMPOSED",
  Q2: "R-COMPUTED-LAUNCH",
  Q3: "R-WRAPPED-LAUNCH",
  Q4: "R-OTHER-LAUNCHER",
  Q5: "R-TEST-MENTION",
  Q6: "R-LOCAL-SCORER",
  Q7: "R-COORDINATED",
};

export const ROWS: readonly Row[] = [
  { id: "A", label: "one vitest census (wb-cax.25 style) pins that grep at 0 and names this bead", pins: ["A1", "A2", "A3"] },
  {
    id: "B",
    label: "any future adoption must first add a dated TRACEABILITY row citing each of the eight gate receipts and the shadow-mode run (zero control decisions issued, zero native verbs reached) before the census allowlist widens",
    pins: ["B1", "B2", "B3", "B4"],
  },
  { id: "C", label: "a canary without a recorded rollback path is refused by the same census", pins: ["C1"] },
  { id: "S", label: "one census pins zero GraphPolicy/GraphDataIR/mw.training-export references in src and test", pins: ["S1", "S2", "S3"] },
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];

/**
 * The named residual families: what no reading here claims, each member a quiet row (the reader reports nothing for it).
 * R-COORDINATED (Q7), whose members are hollows of the judged set rather than texts, lives beside the outside anchors in the
 * census file.
 */
export const RESIDUALS: Readonly<Record<string, readonly { readonly leg: Leg; readonly path: string; readonly text: string }[]>> = {
  // A vocabulary word built at run time, spelled through an escape, or split by a separator outside space, tab, dot,
  // underscore and hyphen (a no-break space): the text reader reads source characters only.
  Q1: [
    { leg: "src", path: "src/workbench/q1-concat.ts", text: 'export const NAME = "Graph" + "Policy";\n' },
    { leg: "src", path: "src/workbench/q1-escape.ts", text: 'export const NAME = "\\u0047raphDataIR";\n' },
    { leg: "src", path: "src/workbench/q1-codes.ts", text: 'export const NAME = String.fromCharCode(71, 114, 97, 112, 104) + "Policy";\n' },
    { leg: "src", path: "src/workbench/q1-nbsp.ts", text: `export const NAME = "Graph${String.fromCodePoint(0xa0)}Policy";\n` },
  ],
  // A launch whose program is computed (a joined name, an environment value, a let binding, a const bound to another
  // const) or whose launcher is reached indirectly (an alias, an element access, Function.prototype.call, .apply or .bind,
  // Reflect.apply); wb-5esj cut #2 adds the const chain (the landing-542 respin gate's W6) and the last three.
  Q2: [
    { leg: "src", path: "src/workbench/q2-joined.ts", text: 'import { spawn } from "node:child_process";\nconst bin = ["g", "p"].join("");\nspawn(bin, ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-env.ts", text: 'import { spawn } from "node:child_process";\nspawn(process.env.SCORER ?? "", ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-alias.ts", text: 'import { spawnSync } from "node:child_process";\nconst run = spawnSync;\nrun("gp", ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-let.ts", text: 'import { spawn } from "node:child_process";\nlet bin = "gp";\nspawn(bin, ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-element.ts", text: 'import * as cp from "node:child_process";\ncp["spawn"]("gp", ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-call.ts", text: 'import * as cp from "node:child_process";\ncp.spawnSync.call(undefined, "gp", ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-const-chain.ts", text: 'import { spawn } from "node:child_process";\nconst A = "gp";\nconst B = A;\nspawn(B, ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-apply.ts", text: 'import * as cp from "node:child_process";\ncp.spawn.apply(undefined, ["gp", ["sample"]]);\n' },
    { leg: "src", path: "src/workbench/q2-bind.ts", text: 'import * as cp from "node:child_process";\ncp.spawn.bind(undefined)("gp", ["sample"]);\n' },
    { leg: "src", path: "src/workbench/q2-reflect.ts", text: 'import * as cp from "node:child_process";\nReflect.apply(cp.spawn, undefined, ["gp", ["sample"]]);\n' },
  ],
  // gp anywhere but a shell line's bare first word: a later command, an env prefix, a quoted or grouped program word, or
  // an argument of another program.
  Q3: [
    { leg: "src", path: "src/workbench/q3-env.ts", text: 'import { execSync } from "node:child_process";\nexecSync("env A=1 gp sample");\n' },
    { leg: "src", path: "src/workbench/q3-chain.ts", text: 'import { execSync } from "node:child_process";\nexecSync("cd /tmp && gp sample");\n' },
    { leg: "src", path: "src/workbench/q3-npx.ts", text: 'import { spawn } from "node:child_process";\nspawn("npx", ["gp", "sample"]);\n' },
    { leg: "src", path: "src/workbench/q3-quoted.ts", text: 'import { execSync } from "node:child_process";\nexecSync("\'gp\' sample");\n' },
    { leg: "src", path: "src/workbench/q3-group.ts", text: 'import { execSync } from "node:child_process";\nexecSync("(gp sample)");\n' },
  ],
  // A launch or a load outside node:child_process's seven launchers and the five import forms.
  Q4: [
    { leg: "src", path: "src/workbench/q4-worker.ts", text: 'import { Worker } from "node:worker_threads";\nnew Worker("./gp.js");\n' },
    { leg: "src", path: "src/workbench/q4-execa.ts", text: 'declare const execa: (file: string, args: string[]) => void;\nexeca("gp", ["sample"]);\n' },
    { leg: "test", path: "test/q4-loader.test.ts", text: 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nload("graph-policy-cli");\n' },
  ],
  // A test file naming the vocabulary as text or as a name, importing and launching nothing of GP.
  Q5: [
    { leg: "test", path: "test/q5-guard.test.ts", text: 'const GRAPH_POLICY_NAME = "GraphPolicyCLI";\nexport const words = [GRAPH_POLICY_NAME, "GraphDataIR", "MicroPolicy", "mw.training-export.v1"];\n' },
    { leg: "test", path: "test/fixtures/q5-roster.json", text: '{ "graphDataIR": "mw.training-export.v1" }\n' },
  ],
  // Scoring or assignment code that names none of the words and launches nothing.
  Q6: [{ leg: "src", path: "src/workbench/q6-scorer.ts", text: "export function assign(pairs: readonly { agent: string; logit: number }[]): string | undefined {\n  return [...pairs].sort((a, b) => b.logit - a.logit)[0]?.agent;\n}\n" }],
};
