/**
 * wb-1xvp.3 (RF-GRAPH-POLICY-MACHINE-CONTROL-R2): the judge behind test/workbench-gp-control-loop-audit.test.ts.
 *
 * Source program: ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md@6a251bf73af5.
 * :85 "Before changing behavior, determine how the machine currently operates." :89-99 name the eleven lifecycle stages
 * (LIFECYCLE_STAGES). :101 "Identify every meaningful decision currently made using fixed rules, thresholds, priorities,
 * or agent judgment." :103 "Record the existing policy, its inputs, decision authority, and available outcomes." :488
 * "Document actual entrypoints, runtime dependencies, configuration, and fallback behavior."
 *
 * Everything here is pure over injected inputs: a path -> text map of source modules, the audit document's text (or
 * undefined when there is none), and readers for module exports, the measured gp version and the settings schema keys.
 * The suite exercises every rule on synthetic inputs in memory, and reads the real tree only in its live rows.
 *
 * A gp CALL SITE is string text, read through the TypeScript parser (a comment, an identifier or a regular expression is
 * never string text), in one of three shapes:
 * - module: an import/export/require/import() specifier naming graphpolicy (graph-policy, graph_policy, graph.policy,
 *   graph policy; graph-policy-cli is the npm package GraphPolicyCLI ships, graphpolicy its Python mirror) or a package
 *   named gp;
 * - binary: the gp executable as a word, in any letter case: gp, gp.exe, gp.cmd or gp.ps1 (the shims npm installs on
 *   Windows). Before it stands the start of the text, whitespace, a path separator (/ or \), a shell separator or quote
 *   (; & | ( ` " ') or the = of an assignment; after it, the end of the text, whitespace, a backslash, or a shell
 *   separator, redirection or quote (; & | ) < > ` " '). So a bare name, a path, or a command line that runs gp at
 *   one of these boundaries: after a separator with or without a space, in a subshell, a $(...) or backtick
 *   substitution, quoted (shell grammar outside these sets is a named residual of the suite, never a claim here);
 * - named: any other text naming graphpolicy, or gp's measured wire vocabulary (gp 0.1.0: the graphpolicy.cli.v1 and
 *   graphpolicy.rpc.v1 protocol ids, the gp.rpc.reply/v1 and gp.rpc.error/v1 reply schemas, and the GP_CLI_, GP_RPC_
 *   and GP_E_ code families).
 * A call site names its audited decision point with a `gp-decision-point: <id>[, <id>...]` comment attached to the
 * statement, class member or object property that holds it: above it, inside it up to the literal's own line, or
 * trailing its end on that line. A comment inside a nested block, class body or object literal of that statement
 * annotates that block's own members, and one that trails a later statement on the same line annotates that statement.
 *
 * The audit document is read in its RENDERED view, through the landed census binding (test/helpers/census.ts
 * docsSection and sectionTables: one binding over marked's lexer). Each `## <name>` section must render exactly once,
 * under the level-1 title AUDIT_TITLE, and runs to the next level-1 or level-2 heading or the end. A section is
 * malformed when it carries HTML (a comment or a tag, in a table cell too), or when it does not render exactly one
 * top-level table: a table inside a code fence (nested or mismatched fences included), an indented code block or an
 * HTML comment renders none. A cell's VALUE is read as the cell renders on its own (the landed rule: inline markup
 * renders its text, HTML none): a reference-style link, whose definition lies outside the cell, reads as its source, so
 * a value written as one matches no id, stage, status, function name, key or path and fails closed. A field is EMPTY
 * when what it renders - on its own, or in the document, where the document's link reference definitions resolve its
 * reference-style links as the binding's own lex of the document does - holds no letter, number, punctuation or symbol
 * other than a blank-rendering filler (BLANK_FILLERS), each character reference read as the character it names (a
 * named one the landed rule does not decode as none); so an empty reference-style link or image is empty (wb-66f7).
 */
import { Lexer, type Links, marked, type Token } from "marked";
import ts from "typescript";
import { docsSection, sectionTables } from "./census.js";

/** README.md:89-99@6a251bf73af5, verbatim: the eleven lifecycle stages the audit's decision points range over. */
export const LIFECYCLE_STAGES: readonly string[] = [
  "Observation of ready, blocked, active, deferred, and completed beads.",
  "Discovery of candidate work.",
  "Assignment or claiming of tasks.",
  "Worker and model selection.",
  "Creation and execution of ClaudeAgentsSDK workflows.",
  "Concurrent worker scheduling and resource allocation.",
  "Progress observation and result collection.",
  "Verification, review, and correction.",
  "Integration, landing, and task completion.",
  "Failure recovery, retries, and relaunch.",
  "Machine shutdown or continuation.",
];

/** Where Pi's control-loop audit lives. The program text mandates the audit, not its home; this guard names one. */
export const AUDIT_DOC = "docs/workbench/control-loop-audit.md";

/** The audit document's level-1 title: the parent heading path every section is bound under. */
export const AUDIT_TITLE = "Pi control-loop audit";

/** Letters and symbols that render blank (the Hangul fillers and the blank Braille pattern): a field of only these is empty. */
export const BLANK_FILLERS: readonly number[] = [0x115f, 0x1160, 0x3164, 0xffa0, 0x2800];

/** README.md:103 plus :101's fixed rule: the five fields every audited decision point records. */
export const DECISION_POINT_FIELDS: readonly string[] = ["policy", "inputs", "authority", "outcomes", "current fixed rule"];

/** The audit's `## <name>` sections, in order, each holding one pipe table with exactly these columns. */
export const SECTION_COLUMNS: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Decision points", ["id", "stage", ...DECISION_POINT_FIELDS]],
  ["Entrypoints", ["module", "export"]],
  ["Dependencies", ["dependency", "version"]],
  ["Configuration", ["key"]],
  ["Fallback", ["call site", "fallback function"]],
  ["Inventory", ["feature", "status"]],
];

/** The implemented-versus-proposed inventory's two statuses (README.md:512). */
export const INVENTORY_STATUSES: readonly string[] = ["implemented", "proposed"];

/** Every finding class auditFindings emits: the prefix before the first colon of each finding. */
export const FINDING_CLASSES: readonly string[] = [
  "audit-missing",
  "section-missing",
  "section-malformed",
  "decision-point-invalid",
  "stage-uncovered",
  "call-site-unannotated",
  "call-site-cites-absent-id",
  "entrypoint-unresolved",
  "gp-version-missing",
  "gp-version-mismatch",
  "config-keys-mismatch",
  "fallback-missing",
  "inventory-empty",
  "inventory-status-invalid",
];

export type CallSiteShape = "module" | "binary" | "named";

export interface CallSite {
  /** Repo-relative path of the module, as keyed in the input map. */
  readonly file: string;
  /** 1-based line of the string text. */
  readonly line: number;
  readonly shape: CallSiteShape;
  /** The string text as the parser reads it. */
  readonly text: string;
  /** The decision-point ids its attached gp-decision-point comments name, in order. */
  readonly decisionPoints: readonly string[];
}

export interface AuditInputs {
  readonly callSites: readonly CallSite[];
  /** The audit document's text, or undefined when there is no audit document. */
  readonly doc: string | undefined;
  /** The export names of a module (repo-relative path), or undefined when no such module exists. */
  readonly exportsOf: (module: string) => ReadonlySet<string> | undefined;
  /** The measured `gp --version` line. Called only when the audit carries a well-formed Dependencies table. */
  readonly measuredGpVersion: () => string;
  /** The settings schema's dotted keys. Called only when the audit carries a well-formed Configuration table. */
  readonly settingsKeys: () => readonly string[];
}

const GRAPH_POLICY_NAME = /graph[-_. ]?policy/i;
const GP_PACKAGE = /^gp(?:$|\/)/;
const GP_WIRE = /\bgp\.(?:rpc|cli)\b|\bGP_(?:CLI|RPC|E)_[A-Z0-9_]/;
const GP_BINARY = /(?:^|[\s\\/;&|(`"'=])gp(?:\.(?:exe|cmd|ps1))?(?=$|[\s\\;&|)<>`"'])/i;
const MARKER = /gp-decision-point:\s*([A-Za-z0-9][\w.-]*(?:\s*,\s*[A-Za-z0-9][\w.-]*)*)/g;
const DECISION_POINT_ID = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const FUNCTION_NAME = /^[A-Za-z_$][\w$]*$/;

type StringText = ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail;

function isStringText(node: ts.Node): node is StringText {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
}

function scriptKindOf(file: string): ts.ScriptKind {
  if (file.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (file.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return /\.[cm]?js$/.test(file) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}

function isModuleSpecifier(node: StringText): boolean {
  const parent = node.parent;
  if ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) && parent.moduleSpecifier === node) return true;
  if (ts.isExternalModuleReference(parent)) return true;
  if (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent)) return true;
  if (!ts.isCallExpression(parent) || parent.arguments[0] !== node) return false;
  return parent.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(parent.expression) && parent.expression.text === "require");
}

function shapeOf(node: StringText): CallSiteShape | undefined {
  const text = node.text;
  if ((GRAPH_POLICY_NAME.test(text) || GP_PACKAGE.test(text)) && isModuleSpecifier(node)) return "module";
  if (GP_BINARY.test(text)) return "binary";
  if (GRAPH_POLICY_NAME.test(text) || GP_WIRE.test(text)) return "named";
  return undefined;
}

/** Every comment the parser attaches to a node of the file (leading or trailing trivia), by position. */
function commentsOf(source: ts.SourceFile): ts.CommentRange[] {
  const found = new Map<number, ts.CommentRange>();
  const add = (ranges: readonly ts.CommentRange[] | undefined): void => {
    for (const range of ranges ?? []) found.set(range.pos, range);
  };
  const visit = (node: ts.Node): void => {
    add(ts.getLeadingCommentRanges(source.text, node.pos));
    add(ts.getTrailingCommentRanges(source.text, node.end));
    ts.forEachChild(node, visit);
  };
  visit(source);
  add(ts.getLeadingCommentRanges(source.text, source.endOfFileToken.pos));
  return [...found.values()].sort((a, b) => a.pos - b.pos);
}

function holdsMembers(node: ts.Node): boolean {
  return (
    ts.isSourceFile(node) ||
    ts.isBlock(node) ||
    ts.isModuleBlock(node) ||
    ts.isCaseClause(node) ||
    ts.isDefaultClause(node) ||
    ts.isClassLike(node) ||
    ts.isObjectLiteralExpression(node) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isTypeLiteralNode(node) ||
    ts.isEnumDeclaration(node)
  );
}

/** The statement, class member or object property that holds `node`: the unit a gp-decision-point comment attaches to. */
function anchorOf(node: ts.Node): ts.Node {
  let current = node;
  while (current.parent !== undefined && !holdsMembers(current.parent)) current = current.parent;
  return current;
}

/** The spans of the blocks, class bodies and object literals nested in `anchor`: a comment inside one annotates its members. */
function nestedMemberSpans(source: ts.SourceFile, anchor: ts.Node): (readonly [number, number])[] {
  const spans: (readonly [number, number])[] = [];
  const visit = (node: ts.Node): void => {
    if (holdsMembers(node)) spans.push([node.getStart(source), node.end]);
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(anchor, visit);
  return spans;
}

function decisionPointsOf(source: ts.SourceFile, comments: readonly ts.CommentRange[], node: ts.Node): string[] {
  const anchor = anchorOf(node);
  const lineOf = (pos: number): number => source.getLineAndCharacterOfPosition(pos).line;
  const literalLine = lineOf(node.getStart(source));
  const anchorLine = lineOf(anchor.getStart(source));
  const previousLine = lineOf(anchor.pos);
  const nested = nestedMemberSpans(source, anchor);
  const trailing = new Set((ts.getTrailingCommentRanges(source.text, anchor.end) ?? []).map((range) => range.pos));
  const ids: string[] = [];
  for (const range of comments) {
    const line = lineOf(range.pos);
    if (range.pos < anchor.pos || line > literalLine) continue;
    // A comment trailing the code of the previous statement's last line belongs to that statement.
    const before = source.text.slice(source.getPositionOfLineAndCharacter(line, 0), range.pos);
    if (line === previousLine && previousLine < anchorLine && before.trim() !== "") continue;
    // A comment inside a nested block, class body or object literal belongs to that block's own members.
    if (nested.some(([start, end]) => range.pos >= start && range.end <= end)) continue;
    // Past the anchor's end, only the anchor's own trailing comment counts: one after a later statement belongs to it.
    if (range.pos >= anchor.end && !trailing.has(range.pos)) continue;
    for (const match of source.text.slice(range.pos, range.end).matchAll(MARKER)) {
      ids.push(...(match[1] ?? "").split(",").map((id) => id.trim()));
    }
  }
  return ids;
}

/** Every gp call site in the given modules (repo-relative path -> text), ordered by path then line. */
export function callSites(files: ReadonlyMap<string, string>): CallSite[] {
  const sites: CallSite[] = [];
  for (const file of [...files.keys()].sort()) {
    const source = ts.createSourceFile(file, files.get(file) ?? "", ts.ScriptTarget.Latest, true, scriptKindOf(file));
    const comments = commentsOf(source);
    const visit = (node: ts.Node): void => {
      if (isStringText(node)) {
        const shape = shapeOf(node);
        if (shape !== undefined) {
          const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
          sites.push({ file, line, shape, text: node.text, decisionPoints: decisionPointsOf(source, comments, node) });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return sites.sort((a, b) => (a.file === b.file ? a.line - b.line : a.file < b.file ? -1 : 1));
}

function isExported(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}

function isDefaultExport(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword);
}

/**
 * The names a module exports by its own declarations: exported functions, classes, variables, interfaces, types and
 * enums, `export { a, b as c }` lists, and `default`. An `export * from` re-export is not followed.
 */
export function exportedNames(text: string, file: string): Set<string> {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKindOf(file));
  const names = new Set<string>();
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) names.add("default");
    else if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) names.add(element.name.text);
      }
    } else if (isExported(statement)) {
      if (isDefaultExport(statement)) names.add("default");
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name)) names.add(declaration.name.text);
      } else if (
        (ts.isFunctionDeclaration(statement) ||
          ts.isClassDeclaration(statement) ||
          ts.isInterfaceDeclaration(statement) ||
          ts.isTypeAliasDeclaration(statement) ||
          ts.isEnumDeclaration(statement)) &&
        statement.name !== undefined
      ) {
        names.add(statement.name.text);
      }
    }
  }
  return names;
}

/**
 * The settings schema's dotted keys, read from the interfaces of a settings module: every property of `root`, where a
 * property typed by another interface declared in the same module (or reached through `extends`) expands to that
 * interface's properties under `<property>.`. Any other type, a `Record<...>` included, is one leaf key.
 */
export function settingsKeys(text: string, root = "SubagentsSettings"): string[] {
  const source = ts.createSourceFile("settings.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const interfaces = new Map<string, ts.InterfaceDeclaration>();
  for (const statement of source.statements) if (ts.isInterfaceDeclaration(statement)) interfaces.set(statement.name.text, statement);
  const declared = interfaces.get(root);
  if (declared === undefined) throw new Error(`settings module declares no ${root} interface`);
  const keys: string[] = [];
  const walk = (declaration: ts.InterfaceDeclaration, prefix: string, seen: ReadonlySet<string>): void => {
    for (const clause of declaration.heritageClauses ?? []) {
      for (const type of clause.types) {
        const base = ts.isIdentifier(type.expression) ? interfaces.get(type.expression.text) : undefined;
        if (base !== undefined && !seen.has(base.name.text)) walk(base, prefix, new Set([...seen, base.name.text]));
      }
    }
    for (const member of declaration.members) {
      if (!ts.isPropertySignature(member)) continue;
      const name = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name) ? member.name.text : member.name.getText(source);
      const type = member.type;
      const nested = type !== undefined && ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName) ? interfaces.get(type.typeName.text) : undefined;
      if (nested !== undefined && !seen.has(nested.name.text)) walk(nested, `${prefix}${name}.`, new Set([...seen, nested.name.text]));
      else keys.push(`${prefix}${name}`);
    }
  };
  walk(declared, "", new Set([root]));
  return keys;
}

/** The first line of a `gp --version` stdout, trimmed: the producer's version string, echoed verbatim. */
export function firstLine(stdout: string): string {
  return (stdout.split("\n")[0] ?? "").trim();
}

/** A known section: missing, malformed, or its body rows read two ways, each value on its own and what it shows in the document. */
type Section =
  | { readonly kind: "missing" }
  | { readonly kind: "malformed"; readonly reason: string }
  | { readonly kind: "ok"; readonly rows: readonly (readonly string[])[]; readonly shown: readonly (readonly string[])[] };

const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const ENTITIES: Readonly<Record<string, string>> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&nbsp;": " " };
const decode = (text: string): string => text.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, (entity) => ENTITIES[entity] ?? entity);

/** What a reader sees of inline tokens: the landed census rendering rule (test/helpers/census.ts inlineText), verbatim. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") continue;
    if (token.type === "br") out += "\n";
    else if (token.type === "codespan" || token.type === "escape") out += decode(textOf(token));
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token));
    else out += decode(textOf(token));
  }
  return out;
}

/** A table cell, given as its source (sectionTables' grid), read as it renders on its own: its inline text, whitespace collapsed. */
const rendered = (cell: string): string => inlineText(Lexer.lexInline(cell)).replace(/\s+/g, " ").trim();

/**
 * What a table cell shows in the document: its source lexed inline with the document's link reference definitions
 * (`links`, as marked's lexer records them over the whole document), the way the census binding's own lex of the
 * document renders the bound section's cells, so a reference-style link resolves to its text. Whitespace collapsed.
 */
function shownIn(links: Links): (cell: string) => string {
  return (cell) => {
    const lexer = new Lexer();
    lexer.tokens.links = links;
    return inlineText(lexer.inlineTokens(cell)).replace(/\s+/g, " ").trim();
  };
}

const REFERENCE = /&(?:#[xX]([0-9a-fA-F]{1,6})|#(\d{1,7})|[A-Za-z][A-Za-z0-9]*);/g;
const VISIBLE = /[\p{L}\p{N}\p{P}\p{S}]/u;

/**
 * True when a rendered field shows nothing: no letter, number, punctuation or symbol other than a BLANK_FILLERS
 * character, once each character reference left undecoded is read as the character it names (a named one as none).
 */
function blank(field: string): boolean {
  const read = field.replace(REFERENCE, (_reference: string, hex: string | undefined, decimal: string | undefined) => {
    const point = hex !== undefined ? Number.parseInt(hex, 16) : decimal !== undefined ? Number(decimal) : 0;
    return point > 0 && point <= 0x10ffff && (point < 0xd800 || point > 0xdfff) ? String.fromCodePoint(point) : "";
  });
  return ![...read].some((character) => VISIBLE.test(character) && !BLANK_FILLERS.includes(character.codePointAt(0) ?? 0));
}

/** docsSection's refusal when the rendered view has no such heading (a missing section), and when it has more than one. */
const NO_HEADING = /^the rendered view has no level-2 heading /;
const DUPLICATE_HEADING = /^the heading ".*" occurs \d+ times in the rendered view/;

/**
 * One known section in the rendered view, through the landed census binding (docsSection and sectionTables share one
 * binding): the heading renders exactly once at level 2 under AUDIT_TITLE, the section runs to the next level-1 or
 * level-2 heading, carries no HTML, and renders exactly one top-level table whose header is `columns`. Each body cell is
 * read on its own (its value) and as it shows in the document under the document's link reference definitions `links`.
 */
function readSection(doc: string, name: string, columns: readonly string[], links: Links): Section {
  const parents = [AUDIT_TITLE];
  const section = docsSection(doc, name, 2, parents);
  if (!section.ok) {
    if (NO_HEADING.test(section.why)) return { kind: "missing" };
    return { kind: "malformed", reason: DUPLICATE_HEADING.test(section.why) ? "duplicate heading" : section.why };
  }
  if (section.hasHtml) return { kind: "malformed", reason: "carries HTML, a comment or a tag, which can hide its source from the rendered view" };
  const { grids } = sectionTables(doc, name, 2, parents);
  if (grids.length === 0) return { kind: "malformed", reason: "no table" };
  if (grids.length > 1) return { kind: "malformed", reason: "more than one table" };
  const grid = grids[0] ?? [];
  const [header = [], ...rows] = grid.map((cells) => cells.map(rendered));
  if (header.map((cell) => cell.toLowerCase()).join(" | ") !== columns.join(" | ")) return { kind: "malformed", reason: `columns: ${header.join(" | ")}` };
  return { kind: "ok", rows, shown: grid.slice(1).map((cells) => cells.map(shownIn(links))) };
}

/**
 * The audit's known sections, each read as the one table its rendered `## <name>` section shows. The link reference
 * definitions are the whole document's, from the same marked.lexer call the census binding makes (a definition is
 * document-wide wherever it stands; one hidden in an HTML comment or a code block defines nothing).
 */
function readSections(doc: string): Map<string, Section> {
  const { links } = marked.lexer(doc);
  return new Map(SECTION_COLUMNS.map(([name, columns]) => [name, readSection(doc, name, columns, links)]));
}

/**
 * The guard's findings, ordered: sections, decision points, stage coverage, call sites, entrypoints, dependencies,
 * configuration, fallback, inventory. Without an audit document every call site is an `audit-missing` finding and
 * nothing else is read. A missing or malformed section reports once and is not judged row by row.
 */
export function auditFindings(inputs: AuditInputs): string[] {
  const where = (site: CallSite): string => `${site.file}:${site.line}`;
  if (inputs.doc === undefined) return inputs.callSites.map((site) => `audit-missing: ${where(site)} (${site.shape}) has no ${AUDIT_DOC}`);
  const findings: string[] = [];
  const sections = readSections(inputs.doc);
  const rowsOf = (name: string): readonly (readonly string[])[] | undefined => {
    const section = sections.get(name);
    return section?.kind === "ok" ? section.rows : undefined;
  };
  for (const [name, section] of sections) {
    if (section.kind === "missing") findings.push(`section-missing: ${name}`);
    else if (section.kind === "malformed") findings.push(`section-malformed: ${name} (${section.reason})`);
  }

  const decisionSection = sections.get("Decision points");
  const decisionPoints = decisionSection?.kind === "ok" ? decisionSection.rows : undefined;
  const decisionShown = decisionSection?.kind === "ok" ? decisionSection.shown : [];
  const ids = new Set<string>();
  if (decisionPoints !== undefined) {
    const covered = new Set<number>();
    decisionPoints.forEach((row, index) => {
      const [id = "", stage = "", ...fields] = row;
      // What each field shows in the document: a field empty either way is empty (an empty reference-style link included).
      const shownFields = (decisionShown[index] ?? []).slice(2);
      const reasons: string[] = [];
      if (!DECISION_POINT_ID.test(id)) reasons.push("id is not [A-Za-z0-9][A-Za-z0-9._-]*");
      else if (ids.has(id)) reasons.push("duplicate id");
      const stageNumber = /^[1-9]\d*$/.test(stage) ? Number(stage) : Number.NaN;
      if (!(stageNumber >= 1 && stageNumber <= LIFECYCLE_STAGES.length)) reasons.push(`stage "${stage}" is not 1-${LIFECYCLE_STAGES.length}`);
      DECISION_POINT_FIELDS.forEach((field, offset) => {
        if (blank(fields[offset] ?? "") || blank(shownFields[offset] ?? "")) reasons.push(`empty ${field}`);
      });
      if (reasons.length > 0) findings.push(`decision-point-invalid: ${id === "" ? `row ${index + 1}` : id} (${reasons.join(", ")})`);
      else {
        ids.add(id);
        covered.add(stageNumber);
      }
    });
    LIFECYCLE_STAGES.forEach((stage, index) => {
      if (!covered.has(index + 1)) findings.push(`stage-uncovered: ${index + 1} ${stage}`);
    });
  }

  for (const site of inputs.callSites) {
    if (site.decisionPoints.length === 0) findings.push(`call-site-unannotated: ${where(site)} names no gp-decision-point`);
    for (const id of site.decisionPoints) if (!ids.has(id)) findings.push(`call-site-cites-absent-id: ${where(site)} -> ${id}`);
  }

  for (const [module = "", name = ""] of rowsOf("Entrypoints") ?? []) {
    if (inputs.exportsOf(module)?.has(name) !== true) findings.push(`entrypoint-unresolved: ${module}#${name}`);
  }

  const dependencies = rowsOf("Dependencies");
  if (dependencies !== undefined) {
    const gp = dependencies.filter(([dependency]) => dependency === "gp");
    if (gp.length === 0) findings.push("gp-version-missing: no gp row in Dependencies");
    else {
      const measured = inputs.measuredGpVersion();
      for (const [, version = ""] of gp) if (version !== measured) findings.push(`gp-version-mismatch: documented "${version}" measured "${measured}"`);
    }
  }

  const configuration = rowsOf("Configuration");
  if (configuration !== undefined) {
    const documented = configuration.map(([key = ""]) => key);
    const schema = inputs.settingsKeys();
    const undocumented = schema.filter((key) => !documented.includes(key));
    const unknown = documented.filter((key) => !schema.includes(key));
    if (undocumented.length > 0 || unknown.length > 0) findings.push(`config-keys-mismatch: undocumented [${undocumented.join(", ")}] unknown [${unknown.join(", ")}]`);
  }

  const fallback = rowsOf("Fallback");
  if (fallback !== undefined) {
    for (const site of inputs.callSites) {
      for (const id of site.decisionPoints) {
        const key = `${site.file}#${id}`;
        const named = fallback.some(([callSite, fn = ""]) => callSite === key && FUNCTION_NAME.test(fn));
        if (!named) findings.push(`fallback-missing: ${key}`);
      }
    }
  }

  const inventory = rowsOf("Inventory");
  if (inventory !== undefined) {
    if (inventory.length === 0) findings.push("inventory-empty");
    for (const [feature = "", status = ""] of inventory) if (!INVENTORY_STATUSES.includes(status)) findings.push(`inventory-status-invalid: ${feature} -> ${status}`);
  }
  return findings;
}
