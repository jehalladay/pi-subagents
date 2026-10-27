/**
 * wb-021.4 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R5, program-triage-2026-10-18): the judge, the tables and the plants of the
 * APO UI publish census (test/workbench-apo-ui-publish-census.test.ts, whose header states the claims). One module so the
 * census and its roster are written from the same rows.
 *
 * THE JUDGE. wordsOf(text): default-ignorable code points are dropped, the text is NFKD-folded and its combining marks are
 * dropped, then each run of letters and digits is split at a case change (camel, Pascal, an acronym before a capitalized
 * word) and at a letter-digit boundary, and lower-cased. A PATH text holds a PROMOTE word, or a PUBLISH word beside an
 * OBJECT word (the title's own vocabulary: publish, publishes, publication; promotion; graph, manifest, checkpoint, each
 * with its inflections). A ROLE text holds the program's abbreviation as a word, or its slug's three words in order. A
 * module's texts are every identifier (declarations and references, by their unescaped text), every string-like literal by
 * its cooked value, every template part by its cooked text, every regular-expression literal by its source, and every chain
 * of "+" whose operands are all string literals by its folded value. Comments are never read.
 * EDGES: the shared reader's imports (test/helpers/census.ts sourceStructure: static, export-from, dynamic, require, each
 * with its typeOnly flag) plus two this module reads itself: an import-equals declaration (import x = require("y")) and a
 * dynamic import or require whose specifier is not a string literal (computed, unresolvable by construction). A runtime
 * edge is one that is not typeOnly. A relative specifier resolves inside the judged tree (.js to .ts, a bare path to .ts or
 * to index.ts); one that resolves nowhere, and every computed one, is UNRESOLVED (fail-closed). A bare specifier is a
 * package: it is not followed, and its specifier's own words are judged.
 * AFFORDANCES: a module's UI interaction entry points - its matchesKey reads (the key as a literal, as Key.<member>, else
 * <computed>), its handleInput implementations (a method, a function, a property, a class field or a getter, named by an
 * identifier, a string literal or a computed string literal), its interactive host UI calls (<x>.ui.<member>(...) or
 * ui.<member>(...), members in UI_MEMBERS.interaction) and its extension interactions (registerCommand and registerShortcut
 * by literal name, on("input")); a member or the ui handle reached by an element access with a string literal reads as its
 * property access. A module with any of them is an AFFORDANCE module; the VIEW SURFACE is the affordance modules plus every
 * module under src/ui/.
 * FINDINGS (fail-closed, each a line): REACH (an affordance module whose runtime closure holds a PATH module - itself
 * included - tagged [APO view] when the module holds a ROLE text), ENTRY (the entry's runtime closure holds a PATH module),
 * OFFER (a PATH text inside a view-surface module), PACKAGE (a package specifier in a judged closure whose words read as a
 * PATH or a ROLE), UNRESOLVED (a computed or unresolvable import in a judged closure), UNREADABLE (a judged file the
 * readers cannot read or parse) and UNCLASSIFIED (a ui member or a pi register/on member outside the classification).
 *
 * Display paths added: none. This module is test-only.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, posix } from "node:path";
import ts from "typescript";
import { sourceStructure } from "./census.js";

export const PROMOTE: readonly string[] = ["promote", "promotes", "promoted", "promoting", "promotion", "promotions"];
export const PUBLISH: readonly string[] = ["publish", "publishes", "published", "publishing", "publication", "publications"];
export const OBJECT: readonly string[] = ["graph", "graphs", "manifest", "manifests", "checkpoint", "checkpoints"];
export const ABBREVIATION = "apo";
export const SLUG: readonly (readonly string[])[] = [["adaptive"], ["policy", "policies"], ["organization", "organizations", "organisation", "organisations"]];

/** The shared reader's import kinds plus the one this module reads itself; the census holds the first four to census.ts. */
export const EDGE_KINDS: readonly string[] = ["static", "export-from", "dynamic", "require", "import-equals"];

/** Every member a host UI handle is called with in src, classified; any other member is UNCLASSIFIED. */
export const UI_MEMBERS = {
  interaction: ["addAutocompleteProvider", "confirm", "custom", "editor", "input", "onTerminalInput", "select"],
  display: ["getEditorText", "notify", "setWidget"],
} as const;

/** Every surface the extension registers with the host through pi (register* members, on events), classified. */
export const PI_SURFACES = {
  interaction: ["on:input", "registerCommand", "registerShortcut"],
  other: ["on:session_before_switch", "on:session_shutdown", "on:session_start", "on:tool_execution_start", "registerEntryRenderer", "registerFlag", "registerMessageRenderer", "registerTool"],
} as const;

/** The words of a pointer (click) input: R0 pins that no src text holds one (Pi's TUI reads no pointer input). */
export const CLICK_WORDS: readonly string[] = ["click", "clicked", "clicking", "clicks", "mouse"];

/** File-system write calls: the R-UNNAMED-PATH anchor counts them inside the entry closure (effects the vocabulary does not name). */
export const WRITE_CALLS: readonly string[] = ["appendFile", "appendFileSync", "copyFileSync", "cpSync", "mkdirSync", "renameSync", "rmSync", "unlinkSync", "writeFile", "writeFileSync"];

const IGNORABLE = /\p{Default_Ignorable_Code_Point}/gu;
const MARKS = /\p{M}/gu;
const RUNS = /[\p{L}\p{N}]+/gu;
const SPLIT = /(?<=\p{Ll})(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})|(?<=\p{L})(?=\p{N})|(?<=\p{N})(?=\p{L})/u;

/** THE JUDGE, words: see the module header. */
export function wordsOf(text: string): string[] {
  const folded = text.replace(IGNORABLE, "").normalize("NFKD").replace(MARKS, "");
  const words: string[] = [];
  for (const run of folded.match(RUNS) ?? []) for (const part of run.split(SPLIT)) if (part !== "") words.push(part.toLowerCase());
  return words;
}

/** A PATH reading: "promote:<word>", or "publish:<word>+<object>"; undefined when the text is not a PATH text. */
export function pathReading(text: string): string | undefined {
  const words = wordsOf(text);
  const promote = words.find(word => PROMOTE.includes(word));
  if (promote !== undefined) return `promote:${promote}`;
  const publish = words.find(word => PUBLISH.includes(word));
  const object = words.find(word => OBJECT.includes(word));
  return publish !== undefined && object !== undefined ? `publish:${publish}+${object}` : undefined;
}

/** A ROLE reading: "abbreviation:apo", or "slug:<three words>"; undefined when the text does not name the program. */
export function roleReading(text: string): string | undefined {
  const words = wordsOf(text);
  if (words.includes(ABBREVIATION)) return `abbreviation:${ABBREVIATION}`;
  for (let index = 0; index + SLUG.length <= words.length; index++) {
    if (SLUG.every((forms, offset) => forms.includes(words[index + offset] ?? ""))) return `slug:${words.slice(index, index + SLUG.length).join("-")}`;
  }
  return undefined;
}

export interface Reading {
  readonly line: number;
  readonly source: "name" | "literal";
  readonly text: string;
  readonly reading: string;
}
export interface Edge {
  readonly kind: string;
  /** undefined when the specifier is computed. */
  readonly specifier: string | undefined;
  readonly typeOnly: boolean;
  readonly line: number;
}
export interface ModuleFacts {
  readonly file: string;
  readonly ok: boolean;
  readonly why: string;
  readonly edges: readonly Edge[];
  readonly paths: readonly Reading[];
  readonly roles: readonly Reading[];
  /** Every text holding a CLICK_WORDS word. */
  readonly clicks: readonly Reading[];
  readonly keys: readonly string[];
  readonly handlers: number;
  /** Every host UI member called, with its count. */
  readonly host: Readonly<Record<string, number>>;
  readonly extension: readonly string[];
  /** Every pi register* member and on:<event> called. */
  readonly piSurfaces: readonly string[];
  readonly writes: number;
}

/** A member access: a property access by name, or an element access by a string literal (read as its property access). */
const memberOf = (node: ts.Expression): { readonly member: string; readonly receiver: ts.Expression } | undefined => {
  if (ts.isPropertyAccessExpression(node)) return { member: node.name.text, receiver: node.expression };
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return { member: node.argumentExpression.text, receiver: node.expression };
  return undefined;
};

const calleeName = (call: ts.CallExpression): string | undefined => (ts.isIdentifier(call.expression) ? call.expression.text : memberOf(call.expression)?.member);

const isUiHandle = (node: ts.Expression): boolean => (ts.isIdentifier(node) && node.text === "ui") || memberOf(node)?.member === "ui";

/** The folded value of a "+" chain whose operands are all string literals, else undefined. */
function foldedLiteral(node: ts.Expression): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return foldedLiteral(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = foldedLiteral(node.left);
    const right = foldedLiteral(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  return undefined;
}

const HANDLER = "handleInput";
/** A declaration's name as text: an identifier, a string literal or a computed string literal; else undefined. */
const nameText = (name: ts.PropertyName | undefined): string | undefined => {
  if (name === undefined) return undefined;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && ts.isStringLiteralLike(name.expression)) return name.expression.text;
  return undefined;
};
const isHandler = (node: ts.Node): boolean =>
  (ts.isMethodDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isPropertyAssignment(node) || ts.isPropertyDeclaration(node) || ts.isGetAccessorDeclaration(node)) && nameText(node.name) === HANDLER;

/** Every fact the census reads from one module (see the module header); an unreadable or unparseable module fails closed. */
export function moduleFacts(root: string, file: string): ModuleFacts {
  const empty = { edges: [], paths: [], roles: [], clicks: [], keys: [], handlers: 0, host: {}, extension: [], piSurfaces: [], writes: 0 };
  const structure = sourceStructure(root, file);
  if (!structure.ok) return { file, ok: false, why: structure.why, ...empty };
  let text: string;
  try {
    text = readFileSync(join(root, file), "utf8");
  } catch (error) {
    return { file, ok: false, why: `${file}: ${error instanceof Error ? error.message : String(error)}`, ...empty };
  }
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const lineOf = (node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const edges: Edge[] = structure.imports.map(entry => ({ kind: entry.kind, specifier: entry.module, typeOnly: entry.typeOnly, line: entry.line }));
  const paths: Reading[] = [];
  const roles: Reading[] = [];
  const clicks: Reading[] = [];
  const keys = new Set<string>();
  let handlers = 0;
  const host: Record<string, number> = {};
  const extension: string[] = [];
  const piSurfaces: string[] = [];
  let writes = 0;
  const read = (source: Reading["source"], value: string, node: ts.Node): void => {
    const path = pathReading(value);
    if (path !== undefined) paths.push({ line: lineOf(node), source, text: value, reading: path });
    const role = roleReading(value);
    if (role !== undefined) roles.push({ line: lineOf(node), source, text: value, reading: role });
    const click = wordsOf(value).find(word => CLICK_WORDS.includes(word));
    if (click !== undefined) clicks.push({ line: lineOf(node), source, text: value, reading: `click:${click}` });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) read("name", node.text, node);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) read("literal", node.text, node);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken && !(ts.isBinaryExpression(node.parent) && node.parent.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
      const folded = foldedLiteral(node);
      if (folded !== undefined) read("literal", folded, node);
    }
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      const target = node.moduleReference.expression;
      edges.push({ kind: "import-equals", specifier: ts.isStringLiteralLike(target) ? target.text : undefined, typeOnly: node.isTypeOnly, line: lineOf(node) });
    }
    if (isHandler(node)) handlers += 1;
    if (ts.isCallExpression(node)) {
      const name = calleeName(node);
      const first = node.arguments[0];
      const literal = first !== undefined && ts.isStringLiteralLike(first) ? first.text : undefined;
      const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      if ((dynamic || (ts.isIdentifier(node.expression) && node.expression.text === "require")) && literal === undefined) {
        edges.push({ kind: dynamic ? "dynamic" : "require", specifier: undefined, typeOnly: false, line: lineOf(node) });
      }
      if (name === "matchesKey") {
        const key = node.arguments[1];
        if (key !== undefined && ts.isStringLiteralLike(key)) keys.add(key.text);
        else if (key !== undefined && ts.isPropertyAccessExpression(key) && ts.isIdentifier(key.expression) && key.expression.text === "Key") keys.add(`Key.${key.name.text}`);
        else keys.add("<computed>");
      }
      const access = memberOf(node.expression);
      if (access !== undefined) {
        const { member, receiver } = access;
        if (isUiHandle(receiver)) host[member] = (host[member] ?? 0) + 1;
        if (member === "registerCommand") extension.push(`command:${literal ?? "<computed>"}`);
        if (member === "registerShortcut") extension.push(`shortcut:${literal ?? "<computed>"}`);
        if (member === "on" && literal === "input") extension.push("on:input");
        if (ts.isIdentifier(receiver) && receiver.text === "pi" && (member === "on" || member.startsWith("register"))) piSurfaces.push(member === "on" ? `on:${literal ?? "<computed>"}` : member);
      }
      if (name !== undefined && WRITE_CALLS.includes(name)) writes += 1;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { file, ok: true, why: "", edges, paths, roles, clicks, keys: [...keys].sort(), handlers, host, extension: extension.sort(), piSurfaces: piSurfaces.sort(), writes };
}

/** The interactive host UI members a module calls, with their counts (display members left out). */
export function interactions(facts: ModuleFacts): Record<string, number> {
  const interactive: readonly string[] = UI_MEMBERS.interaction;
  return Object.fromEntries(Object.entries(facts.host).filter(([member]) => interactive.includes(member)).sort(([a], [b]) => a.localeCompare(b)));
}

export const isAffordance = (facts: ModuleFacts): boolean => facts.keys.length > 0 || facts.handlers > 0 || Object.keys(interactions(facts)).length > 0 || facts.extension.length > 0;

/** One affordance module's inventory, as the census pins it. */
export interface Inventory {
  readonly file: string;
  readonly keys: readonly string[];
  readonly handlers: number;
  readonly host: Readonly<Record<string, number>>;
  readonly extension: readonly string[];
}
export const inventoryOf = (facts: ModuleFacts): Inventory => ({ file: facts.file, keys: facts.keys, handlers: facts.handlers, host: interactions(facts), extension: facts.extension });

/** A relative specifier resolved inside the judged tree, or undefined. */
export function resolveRelative(files: ReadonlySet<string>, from: string, specifier: string): string | undefined {
  const base = posix.normalize(posix.join(posix.dirname(from), specifier));
  const candidates = [base, base.endsWith(".js") ? `${base.slice(0, -3)}.ts` : undefined, `${base}.ts`, posix.join(base, "index.ts")];
  return candidates.find((candidate): candidate is string => candidate !== undefined && files.has(candidate));
}

export interface Tree {
  readonly root: string;
  /** Every file of the tree, relative to root (posix). */
  readonly files: readonly string[];
  /** The extension entry, judged by the ENTRY leg; omitted for a tree with none. */
  readonly entry?: string;
}
export interface Judgment {
  readonly facts: ReadonlyMap<string, ModuleFacts>;
  readonly affordances: readonly string[];
  readonly surface: readonly string[];
  readonly pathModules: readonly string[];
  readonly roleModules: readonly string[];
  readonly entryClosure: readonly string[];
  /** The bare specifiers the judged closures import (packages are never followed). */
  readonly packages: readonly string[];
  readonly findings: readonly string[];
}

const firstReading = (facts: ModuleFacts): string => facts.paths[0]?.reading ?? "";

/** THE CENSUS over one tree: see the module header for every finding. */
export function judgeTree(tree: Tree): Judgment {
  const files = [...tree.files].sort();
  const known = new Set(files);
  const facts = new Map(files.map(file => [file, moduleFacts(tree.root, file)] as const));
  const factsOf = (file: string): ModuleFacts => {
    const found = facts.get(file);
    if (found === undefined) throw new Error(`${file} is not in the judged tree`);
    return found;
  };
  const findings = new Set<string>();
  const packages = new Set<string>();
  for (const entry of facts.values()) if (!entry.ok) findings.add(`UNREADABLE ${entry.why}`);
  /** The runtime closure of one module: every module reached, with the route that first reached it. */
  const closure = (start: string): Map<string, string> => {
    const routes = new Map<string, string>([[start, start]]);
    const queue = [start];
    while (queue.length > 0) {
      const current = queue.shift() as string;
      const currentFacts = factsOf(current);
      for (const edge of currentFacts.edges) {
        if (edge.typeOnly) continue;
        if (edge.specifier === undefined) {
          findings.add(`UNRESOLVED ${current}:${edge.line} ${edge.kind} <computed>`);
          continue;
        }
        if (!edge.specifier.startsWith(".")) {
          packages.add(edge.specifier);
          const reading = pathReading(edge.specifier) ?? roleReading(edge.specifier);
          if (reading !== undefined) findings.add(`PACKAGE ${current}:${edge.line} ${edge.specifier} (${reading})`);
          continue;
        }
        const target = resolveRelative(known, current, edge.specifier);
        if (target === undefined) {
          findings.add(`UNRESOLVED ${current}:${edge.line} ${edge.kind} ${edge.specifier}`);
          continue;
        }
        if (!routes.has(target)) {
          routes.set(target, `${routes.get(current)} -${edge.kind}-> ${target}`);
          queue.push(target);
        }
      }
    }
    return routes;
  };
  const affordances = files.filter(file => isAffordance(factsOf(file)));
  const surface = files.filter(file => affordances.includes(file) || file.startsWith("src/ui/"));
  const pathModules = files.filter(file => factsOf(file).paths.length > 0);
  const roleModules = files.filter(file => factsOf(file).roles.length > 0);
  for (const start of affordances) {
    const role = factsOf(start).roles.length > 0 ? " [APO view]" : "";
    for (const [module, route] of closure(start)) {
      if (factsOf(module).paths.length > 0) findings.add(`REACH ${start}${role} -> ${module} (${firstReading(factsOf(module))}) via ${route}`);
    }
  }
  let entryClosure: string[] = [];
  if (tree.entry !== undefined) {
    if (!known.has(tree.entry)) findings.add(`UNRESOLVED entry ${tree.entry}`);
    else {
      const routes = closure(tree.entry);
      entryClosure = [...routes.keys()].sort();
      for (const [module, route] of routes) {
        if (factsOf(module).paths.length > 0) findings.add(`ENTRY ${tree.entry} -> ${module} (${firstReading(factsOf(module))}) via ${route}`);
      }
    }
  }
  for (const file of surface) for (const reading of factsOf(file).paths) findings.add(`OFFER ${file}:${reading.line} ${reading.source} ${JSON.stringify(reading.text)} (${reading.reading})`);
  const classifiedUi: readonly string[] = [...UI_MEMBERS.interaction, ...UI_MEMBERS.display];
  const classifiedPi: readonly string[] = [...PI_SURFACES.interaction, ...PI_SURFACES.other];
  for (const entry of facts.values()) {
    for (const member of Object.keys(entry.host)) if (!classifiedUi.includes(member)) findings.add(`UNCLASSIFIED ${entry.file} ui.${member}`);
    for (const surfaceName of entry.piSurfaces) if (!classifiedPi.includes(surfaceName)) findings.add(`UNCLASSIFIED ${entry.file} pi.${surfaceName}`);
  }
  return { facts, affordances, surface, pathModules, roleModules, entryClosure, packages: [...packages].sort(), findings: [...findings].sort() };
}

/** A row's pin as the roster holds it: the SHA-256 of the pin as written (its JSON). */
export const pinDigest = (pin: unknown): string => createHash("sha256").update(JSON.stringify(pin)).digest("hex");

// ---------------------------------------------------------------------------------------------
// THE TABLES. Every judged row: its id, its label (rows L, R and G tile the bead's statement, rows A and F its
// acceptance; row Q is the named residuals), and its pins as written. A live pin judges the real tree; a plant pin
// judges a planted tree on rule-11 scratch through the same judgeTree.
// ---------------------------------------------------------------------------------------------

export interface LivePin {
  readonly id: string;
  readonly what: string;
  readonly live: true;
  readonly expect: unknown;
}
export interface PlantPin {
  readonly id: string;
  readonly what: string;
  readonly files: Readonly<Record<string, string>>;
  readonly entry?: string;
  readonly findings: readonly string[];
  /** The planted tree's ROLE modules (default: none). */
  readonly roles?: readonly string[];
  /** The planted tree's affordance inventories (default: not judged). */
  readonly inventory?: readonly Inventory[];
}
/** A reading pin: texts judged by the word judge alone, each with its expected readings (PATH then ROLE, joined) or null. */
export interface ReadingPin {
  readonly id: string;
  readonly what: string;
  readonly readings: Readonly<Record<string, string | null>>;
}
export type Pin = LivePin | PlantPin | ReadingPin;
export const isLive = (pin: Pin): pin is LivePin => "live" in pin;
export const isReading = (pin: Pin): pin is ReadingPin => "readings" in pin;
export const isPlant = (pin: Pin): pin is PlantPin => !isLive(pin) && !isReading(pin);
/** The readings of one text as a reading pin holds them: the PATH and the ROLE reading, joined by a space, or null. */
export const readingsOf = (text: string): string | null => [pathReading(text), roleReading(text)].filter((reading): reading is string => reading !== undefined).join(" ") || null;
export interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

const TUI = 'import { matchesKey } from "@earendil-works/pi-tui";';
const APO_TITLE = 'export const TITLE = "APO decision graph view";';
/** A planted affordance view: a matchesKey branch on "p" returning `call`, after `imports` and `extra` lines. */
const view = (imports: readonly string[], call: string, extra: readonly string[] = []): string =>
  [TUI, ...imports, ...extra, "export function handleKey(data: string): string {", `  if (matchesKey(data, "p")) return ${call};`, '  return "";', "}", ""].join("\n");
const asyncView = (imports: readonly string[], body: readonly string[], extra: readonly string[] = []): string =>
  [TUI, ...imports, ...extra, "export async function handleKey(data: string): Promise<string> {", '  if (matchesKey(data, "p")) {', ...body.map(line => `    ${line}`), "  }", '  return "";', "}", ""].join("\n");
/** The planted path module every route plant reaches: run() calls a promoteCheckpoint binding. */
const STORE = ["export function run(): string {", "  return promoteCheckpoint();", "}", "function promoteCheckpoint(): string {", '  return "done";', "}", ""].join("\n");
const store = (body: string): string => `${body}\n`;
const V = "src/ui/view.ts";
const AV = "src/ui/apo-view.ts";
const S = "src/ops/store.ts";
const ROUTE = (route: string, reading = "promote:promote"): string => `REACH ${AV} [APO view] -> ${S} (${reading}) via ${route}`;
const PLAIN = (reading: string): string => `REACH ${V} -> ${S} (${reading}) via ${V} -static-> ${S}`;
const ZWSP = String.fromCodePoint(0x200b);
const COMBINING_ACUTE = String.fromCodePoint(0x0301);
const FULLWIDTH_P = String.fromCodePoint(0xff50);
const CYRILLIC_I = String.fromCodePoint(0x0456);
const BACKSLASH = String.fromCodePoint(0x5c);

const AFFORDANCE_FILES: readonly Inventory[] = [
  { file: "src/index.ts", keys: ["Key.enter", "down", "up"], handlers: 2, host: { addAutocompleteProvider: 1, confirm: 5, custom: 3, editor: 3, input: 8, select: 9 }, extension: ["command:agents", "on:input"] },
  { file: "src/ui/conversation-viewer.ts", keys: ["ctrl+c", "end", "enter", "escape", "home", "m", "q", "x"], handlers: 1, host: {}, extension: [] },
  { file: "src/ui/fleet-list.ts", keys: ["Key.enter", "down", "escape", "left", "up"], handlers: 0, host: { custom: 1, onTerminalInput: 1 }, extension: [] },
  { file: "src/ui/schedule-menu.ts", keys: [], handlers: 0, host: { confirm: 1 }, extension: [] },
  { file: "src/ui/select-item.ts", keys: [], handlers: 0, host: { select: 1 }, extension: [] },
  { file: "src/ui/viewer-keys.ts", keys: ["<computed>", "j", "k", "shift+down", "shift+up"], handlers: 0, host: {}, extension: [] },
  {
    file: "src/ui/workflow-dialog.ts",
    keys: ["c", "ctrl+c", "down", "e", "enter", "escape", "f", "g", "j", "k", "left", "p", "q", "r", "right", "s", "tab", "up", "x"],
    handlers: 1,
    host: {},
    extension: [],
  },
  {
    file: "src/ui/workflow-inspector.ts",
    keys: ["+", "-", "/", "=", "backspace", "c", "ctrl+c", "down", "e", "enter", "escape", "f", "h", "j", "k", "l", "left", "q", "right", "s", "tab", "up"],
    handlers: 0,
    host: {},
    extension: [],
  },
  { file: "src/ui/workflow-menu.ts", keys: [], handlers: 0, host: { custom: 1, select: 1 }, extension: [] },
];

export const ENTRY_FLOOR = 100;
export const SRC_FLOOR = 100;

export const ROWS: readonly Row[] = [
  {
    id: "L",
    label: "No Pi workbench UI interaction shall silently publish an APO graph manifest or checkpoint:",
    pins: [
      {
        id: "L1-entry",
        what: "the runtime closure of the package.json pi.extensions entry holds no PATH module, no UNRESOLVED import and no PACKAGE finding, at a floor, holding every affordance and view-surface module",
        live: true,
        expect: { entry: "src/index.ts", floor: ENTRY_FLOOR, findings: [] },
      },
      {
        id: "L2-paths",
        what: "src holds exactly one PATH module today, the operator-only patch promotion record, which no src module imports by any edge (type-only included) and the entry closure leaves out",
        live: true,
        expect: { pathModules: ["src/workbench/patch-proposal.ts"], first: "promote:promotion", importers: [], inEntry: false },
      },
      {
        id: "L3-roles",
        what: "no src module holds a ROLE text: the program has no Pi surface yet, so the first mention reds here and arms rows R, G and F as binding",
        live: true,
        expect: { roleModules: [] },
      },
    ],
  },
  {
    id: "R",
    label: "a view click, refresh, or keybinding never publishes ('No UI click silently publishes a graph');",
    pins: [
      {
        id: "R0-kinds",
        what: "every host UI member and every pi register/on surface src calls is classified, no src text holds a click or mouse word (the view-click surface is empty), and every affordance and view-surface module sits in the entry closure, so its render (refresh) path is judged with the module",
        live: true,
        expect: { unclassified: [], clicks: [] },
      },
      ...AFFORDANCE_FILES.map((inventory): LivePin => ({ id: `R-${inventory.file}`, what: `the runtime closure of ${inventory.file} holds no PATH module (no REACH finding)`, live: true, expect: { file: inventory.file, reach: [] } })),
    ],
  },
  {
    id: "G",
    label: "if a publish/promotion affordance ever appears it is an explicit, confirmed, governed operation outside the view surface, delegating to the owner's revision-guarded CAS promotion ('publication is governed').",
    pins: [
      {
        id: "G1-surface",
        what: "no view-surface module (the affordance modules and every module under src/ui/) holds a PATH text: no publish or promotion affordance is offered today",
        live: true,
        expect: {
          surface: [
            "src/index.ts",
            "src/ui/agent-mention.ts",
            "src/ui/agent-widget.ts",
            "src/ui/conversation-viewer.ts",
            "src/ui/fleet-list.ts",
            "src/ui/schedule-menu.ts",
            "src/ui/select-item.ts",
            "src/ui/viewer-keys.ts",
            "src/ui/workflow-card.ts",
            "src/ui/workflow-dialog.ts",
            "src/ui/workflow-inspector.ts",
            "src/ui/workflow-menu.ts",
          ],
          offers: [],
        },
      },
      {
        id: "G2-offer",
        what: "a planted key hint offering promotion inside a view reds as an OFFER and as the view reaching itself",
        files: { [V]: view([], "HINT", ['export const HINT = "p promote checkpoint";']) },
        findings: [`OFFER ${V}:2 literal "p promote checkpoint" (promote:promote)`, `REACH ${V} -> ${V} (promote:promote) via ${V}`],
      },
      {
        id: "G3-outside",
        what: "a planted governed publish module outside every view, reached only from the entry, reds the ENTRY leg (a governed operation is re-judged here, never silently admitted) and no REACH",
        files: {
          "src/index.ts": ['import { handleKey } from "./ui/view.js";', 'import { send } from "./ops/governed.js";', "export const wire = [handleKey, send];", ""].join("\n"),
          [V]: view([], '"ok"'),
          "src/ops/governed.ts": 'export const send = (): string => "confirmed publication of the graph manifest";\n',
        },
        entry: "src/index.ts",
        findings: ["ENTRY src/index.ts -> src/ops/governed.ts (publish:publication+graph) via src/index.ts -static-> src/ops/governed.ts"],
      },
    ],
  },
  {
    id: "A",
    label: "UI-affordance census",
    pins: [
      ...AFFORDANCE_FILES.map((inventory): LivePin => ({ id: `A-${inventory.file}`, what: `the affordance inventory of ${inventory.file}`, live: true, expect: inventory })),
      {
        id: "A-readers",
        what: "every affordance reader names its planted entry: a literal key, a Key member, a computed key, a handleInput method, getter and computed-literal method, an interactive ui call through ctx.ui, through ui and through element access, a command (by property and by element access), a shortcut and the input event",
        files: {
          "src/ui/keys.ts": [TUI, 'import { Key } from "@earendil-works/pi-tui";', "export const k = (d: string, x: string): boolean => matchesKey(d, \"a\") || matchesKey(d, Key.tab) || matchesKey(d, x);", ""].join("\n"),
          "src/ui/input.ts": "export class Box {\n  handleInput(data: string): string {\n    return data;\n  }\n}\n",
          "src/ui/accessor.ts": 'export class Lazy {\n  get handleInput(): (data: string) => string {\n    return data => data;\n  }\n}\nexport class Named {\n  ["handleInput"](data: string): string {\n    return data;\n  }\n}\n',
          "src/ui/host-element.ts": 'export async function pick(ctx: { ui: { select(t: string): Promise<string> } }): Promise<string> {\n  return ctx["ui"]["select"]("z");\n}\n',
          "src/ui/host.ts": 'export async function ask(ctx: { ui: { confirm(t: string): Promise<boolean> } }, ui: { select(t: string): Promise<string> }): Promise<unknown> {\n  return [await ctx.ui.confirm("x"), await ui.select("y")];\n}\n',
          "src/ext.ts": 'export function wire(pi: { registerCommand(n: string): void; registerShortcut(n: string): void; on(e: string): void }): void {\n  pi.registerCommand("go");\n  pi["registerCommand"]("go-element");\n  pi.registerShortcut("ctrl+p");\n  pi.on("input");\n}\n',
        },
        findings: [],
        inventory: [
          { file: "src/ext.ts", keys: [], handlers: 0, host: {}, extension: ["command:go", "command:go-element", "on:input", "shortcut:ctrl+p"] },
          { file: "src/ui/accessor.ts", keys: [], handlers: 2, host: {}, extension: [] },
          { file: "src/ui/host-element.ts", keys: [], handlers: 0, host: { select: 1 }, extension: [] },
          { file: "src/ui/host.ts", keys: [], handlers: 0, host: { confirm: 1, select: 1 }, extension: [] },
          { file: "src/ui/input.ts", keys: [], handlers: 1, host: {}, extension: [] },
          { file: "src/ui/keys.ts", keys: ["<computed>", "Key.tab", "a"], handlers: 0, host: {}, extension: [] },
        ],
      },
      {
        id: "A-unclassified",
        what: "a host UI member and a pi register surface outside the classification each red as UNCLASSIFIED, while display members stay quiet",
        files: {
          "src/ui/footer.ts": 'export function show(ctx: { ui: { setFooter(t: string): void; notify(t: string): void } }): void {\n  ctx.ui.setFooter("x");\n  ctx.ui.notify("y");\n}\n',
          "src/ext.ts": 'export function wire(pi: { registerProvider(n: string): void; on(e: string): void }): void {\n  pi.registerProvider("x");\n  pi.on("model_select");\n}\n',
        },
        findings: ["UNCLASSIFIED src/ext.ts pi.on:model_select", "UNCLASSIFIED src/ext.ts pi.registerProvider", "UNCLASSIFIED src/ui/footer.ts ui.setFooter"],
      },
    ],
  },
  {
    id: "F",
    label: "plus a falsifier that no APO view handler reaches any publish/promotion path.",
    pins: [
      {
        id: "F-static",
        what: "an APO view importing a path module statically",
        files: { [AV]: view(['import { run } from "../ops/store.js";'], "run()", [APO_TITLE]), [S]: STORE },
        findings: [ROUTE(`${AV} -static-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-reexport-star",
        what: "through an export-star barrel",
        files: { [AV]: view(['import { run } from "../ops/index.js";'], "run()", [APO_TITLE]), "src/ops/index.ts": 'export * from "./store.js";\n', [S]: STORE },
        findings: [ROUTE(`${AV} -static-> src/ops/index.ts -export-from-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-reexport-named",
        what: "through a named re-export",
        files: { [AV]: view(['import { run } from "../ops/index.js";'], "run()", [APO_TITLE]), "src/ops/index.ts": 'export { run } from "./store.js";\n', [S]: STORE },
        findings: [ROUTE(`${AV} -static-> src/ops/index.ts -export-from-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-dynamic",
        what: "through a dynamic import inside the key branch",
        files: { [AV]: asyncView([], ['const mod = await import("../ops/store.js");', "return mod.run();"], [APO_TITLE]), [S]: STORE },
        findings: [ROUTE(`${AV} -dynamic-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-require",
        what: "through require",
        files: { [AV]: view([], '(require("../ops/store.js") as { run(): string }).run()', [APO_TITLE]), [S]: STORE },
        findings: [ROUTE(`${AV} -require-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-import-equals",
        what: "through an import-equals declaration",
        files: { [AV]: view(['import ops = require("../ops/store.js");'], "ops.run()", [APO_TITLE]), [S]: STORE },
        findings: [ROUTE(`${AV} -import-equals-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-side-effect",
        what: "through a side-effect import with no bindings",
        files: { [AV]: view(['import "../ops/store.js";'], '"ok"', [APO_TITLE]), [S]: STORE },
        findings: [ROUTE(`${AV} -static-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-transitive",
        what: "two hops through a helper that names no path",
        files: {
          [AV]: view(['import { run } from "../ops/helper.js";'], "run()", [APO_TITLE]),
          "src/ops/helper.ts": 'import { run as inner } from "./store.js";\nexport const run = (): string => inner();\n',
          [S]: STORE,
        },
        findings: [ROUTE(`${AV} -static-> src/ops/helper.ts -static-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-local",
        what: "the APO view declaring its own publish binding reaches itself and offers it",
        files: { [AV]: [TUI, APO_TITLE, "export function handleKey(data: string): string {", '  if (matchesKey(data, "p")) return publishManifest();', '  return "";', "}", "function publishManifest(): string {", '  return "sent";', "}", ""].join("\n") },
        findings: [
          `OFFER ${AV}:4 name "publishManifest" (publish:publish+manifest)`,
          `OFFER ${AV}:7 name "publishManifest" (publish:publish+manifest)`,
          `REACH ${AV} [APO view] -> ${AV} (publish:publish+manifest) via ${AV}`,
        ],
        roles: [AV],
      },
      {
        id: "F-computed-import",
        what: "a dynamic import with a computed specifier fails closed as UNRESOLVED",
        files: { [AV]: asyncView([], ['const target = ["..", "ops", "store.js"].join("/");', "const mod = (await import(target)) as { run(): string };", "return mod.run();"], [APO_TITLE]), [S]: STORE },
        findings: [`UNRESOLVED ${AV}:6 dynamic <computed>`],
        roles: [AV],
      },
      {
        id: "F-computed-require",
        what: "a require with a computed specifier fails closed as UNRESOLVED",
        files: { [AV]: view(['const target = ["..", "ops", "store.js"].join("/");'], "(require(target) as { run(): string }).run()", [APO_TITLE]), [S]: STORE },
        findings: [`UNRESOLVED ${AV}:5 require <computed>`],
        roles: [AV],
      },
      {
        id: "F-missing",
        what: "a relative import that resolves to no file fails closed as UNRESOLVED",
        files: { [AV]: view(['import { run } from "../ops/missing.js";'], "run()", [APO_TITLE]) },
        findings: [`UNRESOLVED ${AV}:2 static ../ops/missing.js`],
        roles: [AV],
      },
      {
        id: "F-package-path",
        what: "a package whose specifier names a publication is a PACKAGE finding, and the module naming it a path module",
        files: { [V]: view(['import { run } from "../ops/client.js";'], "run()"), "src/ops/client.ts": 'export { run } from "@mw/graph-publish";\n' },
        findings: ["PACKAGE src/ops/client.ts:1 @mw/graph-publish (publish:publish+graph)", `REACH ${V} -> src/ops/client.ts (publish:publish+graph) via ${V} -static-> src/ops/client.ts`],
      },
      {
        id: "F-package-role",
        what: "a package whose specifier names the program is a PACKAGE finding (its internals are not read)",
        files: { [V]: view(['import { run } from "@mw/apo-coordination";'], "run()") },
        findings: [`PACKAGE ${V}:2 @mw/apo-coordination (abbreviation:apo)`],
        roles: [V],
      },
      {
        id: "F-word-publish",
        what: "the title's word publish beside checkpoint, in a literal",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const run = (): string => "publish checkpoint";') },
        findings: [PLAIN("publish:publish+checkpoint")],
      },
      {
        id: "F-word-publishes",
        what: "the title's word publishes beside graph, in a literal",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const run = (): string => "the view publishes a graph";') },
        findings: [PLAIN("publish:publishes+graph")],
      },
      {
        id: "F-word-publication",
        what: "the title's word publication beside manifest, in a name",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const publicationManifest = (): string => "x";\nexport const run = publicationManifest;') },
        findings: [PLAIN("publish:publication+manifest")],
      },
      {
        id: "F-word-promotion",
        what: "the title's word promotion, in a name",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const promotionSlot = "open";\nexport const run = (): string => promotionSlot;') },
        findings: [PLAIN("promote:promotion")],
      },
      {
        id: "F-folded",
        what: "a + chain of string literals is read by its folded value",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const run = (): string => "pub" + "lish " + "manifest";') },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-template-part",
        what: "a template part is read by its cooked text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (n: number): string => \`promoted \${n}\`;`) },
        findings: [PLAIN("promote:promoted")],
      },
      {
        id: "F-regex",
        what: "a regular-expression literal is read by its source",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store("export const run = (): string => /publish manifest/.source;") },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-escaped-name",
        what: "an identifier written with a unicode escape is read by its unescaped text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => ${BACKSLASH}u0070ublishManifest();\nfunction publishManifest(): string {\n  return "x";\n}`) },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-ignorable",
        what: "a default-ignorable code point inside a word does not hide it",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "pub${ZWSP}lish checkpoint";`) },
        findings: [PLAIN("publish:publish+checkpoint")],
      },
      {
        id: "F-mark",
        what: "a combining mark inside a word does not hide it",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "pro${COMBINING_ACUTE}mote";`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-width",
        what: "a compatibility (fullwidth) letter inside a word does not hide it",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "${FULLWIDTH_P}ublish graph";`) },
        findings: [PLAIN("publish:publish+graph")],
      },
      {
        id: "F-slug",
        what: "the program's slug words in order tag the view as an APO view",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()", ['export const TITLE = "adaptive-policy-organizations view";']), [S]: STORE },
        findings: [`REACH ${V} [APO view] -> ${S} (promote:promote) via ${V} -static-> ${S}`],
        roles: [V],
      },
      {
        id: "F-lists-publish",
        what: "every PUBLISH word reads beside an object word",
        readings: {
          "publish manifest": "publish:publish+manifest",
          "publishes manifest": "publish:publishes+manifest",
          "published manifest": "publish:published+manifest",
          "publishing manifest": "publish:publishing+manifest",
          "publication manifest": "publish:publication+manifest",
          "publications manifest": "publish:publications+manifest",
        },
      },
      {
        id: "F-lists-promote",
        what: "every PROMOTE word reads alone",
        readings: { promote: "promote:promote", promotes: "promote:promotes", promoted: "promote:promoted", promoting: "promote:promoting", promotion: "promote:promotion", promotions: "promote:promotions" },
      },
      {
        id: "F-lists-object",
        what: "every OBJECT word reads beside a publish word, and alone reads nothing",
        readings: {
          "publish graph": "publish:publish+graph",
          "publish graphs": "publish:publish+graphs",
          "publish manifests": "publish:publish+manifests",
          "publish checkpoint": "publish:publish+checkpoint",
          "publish checkpoints": "publish:publish+checkpoints",
          "graph manifest checkpoint": null,
        },
      },
      {
        id: "F-lists-role",
        what: "the abbreviation as a word and every slug form in order read as the program",
        readings: {
          "APO view": "abbreviation:apo",
          "adaptive policy organization": "slug:adaptive-policy-organization",
          "adaptive policy organizations": "slug:adaptive-policy-organizations",
          "adaptive policies organisation": "slug:adaptive-policies-organisation",
          "adaptive policies organisations": "slug:adaptive-policies-organisations",
          "AdaptivePolicyOrganizations": "slug:adaptive-policy-organizations",
        },
      },
      {
        id: "F-lists-near",
        what: "QUIET: near-words, words out of order and words inside longer words read nothing",
        readings: {
          "public graph": null,
          "publisher graph": null,
          "promo checkpoint": null,
          "publish graphic": null,
          "apology": null,
          "apostrophe view": null,
          "adaptive organizations policy": null,
          "publish": null,
        },
      },
      {
        id: "F-quiet-type-only",
        what: "QUIET: an import type is erased at run time and reaches nothing",
        files: { [AV]: view(['import type { Receipt } from "../ops/store.js";'], '"ok"', [APO_TITLE, "export type Seen = Receipt;"]), [S]: `${STORE}export interface Receipt {\n  readonly at: string;\n}\n` },
        findings: [],
        roles: [AV],
      },
      {
        id: "F-quiet-type-specifiers",
        what: "QUIET: an import whose every specifier is type-only reaches nothing",
        files: { [AV]: view(['import { type Receipt } from "../ops/store.js";'], '"ok"', [APO_TITLE, "export type Seen = Receipt;"]), [S]: `${STORE}export interface Receipt {\n  readonly at: string;\n}\n` },
        findings: [],
        roles: [AV],
      },
      {
        id: "F-quiet-comment",
        what: "QUIET: a comment naming a publication is never read",
        files: { [AV]: view([], '"ok"', [APO_TITLE, "// publish the graph manifest here, once promotion is governed"]) },
        findings: [],
        roles: [AV],
      },
      {
        id: "F-quiet-near-name",
        what: "QUIET: a publish word with no object word (an in-process emit, the src/workbench/claude-transcript.ts shape)",
        files: { [AV]: view([], 'publish("entry")', [APO_TITLE, "const publish = (entry: string): string => entry;"]) },
        findings: [],
        roles: [AV],
      },
      {
        id: "F-quiet-unreached",
        what: "QUIET: a path module no affordance module reaches is a PATH module, not a finding",
        files: { [AV]: view([], '"ok"', [APO_TITLE]), [S]: STORE },
        findings: [],
        roles: [AV],
      },
      {
        id: "F-quiet-read-only-view",
        what: "QUIET: an APO view that reaches no path is admitted (a read-only APO view is not a finding)",
        files: { [AV]: view(['import { title } from "../ops/label.js";'], "title()", [APO_TITLE]), "src/ops/label.ts": 'export const title = (): string => "APO graph";\n' },
        findings: [],
        roles: ["src/ops/label.ts", AV],
      },
    ],
  },
  {
    id: "Q",
    label: "named residuals, each a family with its pinned quiet row (outside the bead's text)",
    pins: [
      {
        id: "R-COMPUTED-TEXT",
        what: "a PATH text assembled at run time (a template substitution between parts, a runtime join) is not read",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`const verb = "publish";\nexport const run = (): string => \`\${verb} checkpoint\` + ["pro", "mote"].join("");`) },
        findings: [],
      },
      {
        id: "R-LOOKALIKE",
        what: "a look-alike letter from another script inside a word hides it",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "publ${CYRILLIC_I}sh checkpoint";`) },
        findings: [],
      },
      {
        id: "R-UNNAMED-PATH",
        what: "an effect the vocabulary does not name (a save, a file write) is not a path to this census",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('import { writeFileSync } from "node:fs";\nexport const run = (): string => saveCheckpoint();\nfunction saveCheckpoint(): string {\n  writeFileSync("graph.json", "{}");\n  return "x";\n}') },
        findings: [],
      },
      {
        id: "R-PACKAGE",
        what: "a package whose specifier names no path and no role is not followed: its internals are not read",
        files: { [V]: view(['import { run } from "@mw/coordination";'], "run()") },
        findings: [],
      },
      {
        id: "R-HELPER-KEY",
        what: "keys forwarded through a local helper read as one computed key (the src/ui/viewer-keys.ts shape)",
        files: { [V]: [TUI, "const press = (data: string, key: string): boolean => matchesKey(data, key);", 'export const handleKey = (data: string): boolean => press(data, "p");', ""].join("\n") },
        findings: [],
        inventory: [{ file: V, keys: ["<computed>"], handlers: 0, host: {}, extension: [] }],
      },
      {
        id: "R-RUNTIME-LOAD",
        what: "a module loaded at run time by a path or URL value (a worker, a fork, a vm script) is not an edge",
        files: { [V]: view(['import { Worker } from "node:worker_threads";'], 'String(new Worker(new URL("../ops/store.js", import.meta.url)).threadId)'), [S]: STORE },
        findings: [],
      },
      {
        id: "R-HOST-ALIAS",
        what: "a host UI call through an alias of the ui handle is not an affordance read (the entry leg still judges its module)",
        files: { [V]: 'export async function pick(ctx: { ui: { select(t: string): Promise<string> } }): Promise<string> {\n  const handle = ctx.ui;\n  return handle.select("x");\n}\n' },
        findings: [],
        inventory: [],
      },
      {
        id: "R-PI-ALIAS",
        what: "a pi surface registered through an alias of pi is not classified, so an unknown one stays quiet",
        files: { "src/ext.ts": 'export function wire(pi: { registerProvider(n: string): void }): void {\n  const api = pi;\n  api.registerProvider("x");\n}\n' },
        findings: [],
      },
    ],
  },
];

/** The named residual families and their pinned quiet rows (test titles). */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = Object.fromEntries((ROWS.find(row => row.id === "Q")?.pins ?? []).map(pin => [pin.id, [`Q ${pin.id}`]]));

/** The test title each pin registers. */
export const titleOf = (row: Row, pin: Pin): string => `${row.id} ${pin.id}`;
