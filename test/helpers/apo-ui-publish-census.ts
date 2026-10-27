/**
 * wb-021.4 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R5, program-triage-2026-10-18): the judge, the tables and the plants of the
 * APO UI publish census (test/workbench-apo-ui-publish-census.test.ts, whose header states the claims). One module so the
 * census and its roster are written from the same rows. PER FORM: every reading below is falsified per form - by a pin of
 * its own, or by a file, a store or a member of its own inside a multi-form pin, each with its own expected finding or
 * inventory entry - and every pin's what names its forms. A plant spells each trigger once (one form, one source kind), or
 * gives each spelling a finding of its own (F-local's call and declaration each OFFER); a route plant's trigger is its edge
 * (STORE, the path module it reaches, is its target). So a reader blind to one form reds a pin that names it.
 *
 * THE JUDGE. wordsOf(text): default-ignorable code points are dropped, the text is NFKD-folded (a compatibility letter
 * reads as its plain letter) and its combining marks are dropped; then each run of letters and digits is split at a
 * lower-to-upper case change (camelCase and PascalCase), before the last capital of a capital run that a lower-case
 * letter follows (an acronym before a capitalized word), at a letter-digit and at a digit-letter boundary, and each part
 * is lower-cased. A PATH text holds a PROMOTE word, or a PUBLISH word beside an OBJECT word (the title's own vocabulary:
 * publish, publishes, publication; promotion; graph, manifest, checkpoint, each with its inflections). A ROLE text holds
 * the program's abbreviation as a word, or its slug's three words in order. A CLICK text holds a CLICK_WORDS word (a
 * pointer input; R0 pins that src holds none). Each of the three readings reads a module's names and its literals alike.
 * NAMES: a module's names are every identifier and every private name, a declaration's and a reference's alike. Every name
 * the judge matches - a name text, a declaration's name, a member, a receiver (a host UI handle, pi), a callee (matchesKey,
 * require, a write call), Key and its member - is read by nameOf: the name's source text with its unicode escapes decoded
 * (the four-digit form and the braced form; a code point above U+FFFF read as one character), the name the runtime reads,
 * for exactly the escape shapes ESCAPES PINNED lists below. No judge reader in this module matches a name by TypeScript's
 * node.text or ts.idText; the require leg reads node.text only to know whether the shared reader (test/helpers/census.ts),
 * which matches require by node.text, has read the call. Two readers outside the judge read names by node.text, each over
 * a fixed source: the census test's outside-anchor readers residualShapes (live src, which spells no name with an escape -
 * MEASURED) and sharedReaderKinds (test/helpers/census.ts). The write-call count (writes) is a live statistic the
 * R-UNNAMED-PATH anchor reads on live src, not a finding or an inventory: its callee read is the one matchesKey's plant
 * holds, and no plant holds an escaped write call's count. TypeScript 6.0.3's node.text drops the plain characters between
 * an escape and a later braced escape (the scanner shape: promote spelled with an escaped p, then romot, then a braced
 * escaped e, reads pe), so a name the runtime reads as pXi or plugini can read pi by node.text.
 * ESCAPES PINNED, in closed form (the escape claim is exactly these rows; any other escape shape is outside it):
 * F-escapes-runtime holds nameOf to the runtime (the spellings compiled in a fresh node:vm context), as an identifier and
 * as a private name, for every spelling of promote with each letter plain, a four-digit escape (zero-padded to four
 * digits) or a braced escape (its shortest hex), 3 ** 7 = 2187 spellings, and for its 20 named shapes: leading-4digit,
 * leading-braced, trailing-4digit, trailing-braced, middle-4digit, middle-braced, adjacent-4digit, adjacent-braced,
 * adjacent-4digit-braced, adjacent-braced-4digit, every-4digit, every-braced, later-4digit-after-4digit,
 * later-4digit-after-braced, scanner-after-4digit, scanner-after-braced, scanner-twice, braced-padded (four hex digits),
 * upper-hex-4digit and upper-hex-braced. F-escapes-runtime-padded does the same for a braced escape padded past four hex
 * digits: braced-padded-6, braced-padded-7, braced-padded-12, trailing-braced-padded-7 and trailing-braced-padded-12.
 * F-escapes-runtime-astral does the same for a name led by U+1D4C5 (MATHEMATICAL SCRIPT SMALL P): every spelling with that
 * letter plain or braced (no four-digit escape spells a code point above U+FFFF in a name) and each other letter in the
 * three spellings, 2 * 3 ** 6 = 1458 spellings, and for its named shapes astral-braced, astral-braced-padded-6 and
 * astral-braced-padded-8. The PATH reading of an escaped name is held, one plant per listed shape and each its trigger's
 * only spelling, by F-escaped-4digit, F-escaped-braced, F-escaped-scanner, F-escaped-scanner-braced, F-escaped-private,
 * F-escaped-padded (seven hex digits, leading), F-escaped-padded-long (twelve, after plain characters) and
 * F-escaped-astral (U+1D4C5, read as p once NFKD-folded). Every judge site that reads a name is held to nameOf by a plant
 * TypeScript's node.text misreads: the texts reader by F-escaped-scanner, F-escaped-scanner-braced and F-escaped-private;
 * a declaration's name, the shorthand and variable handler tests, memberOf (an assigned member, a host UI member, a pi
 * register member), receiverName (a receiver named with the word ui), the callee (matchesKey), Key and its member by
 * A-escaped-names (the scanner shape at each); the require test by F-require-escaped; and the pi receiver by A-pi-collapse
 * (a receiver whose node.text collapses to pi while its runtime name is pXi or plugini registers no pi surface).
 * LITERALS: a module's literals are every string literal and every no-substitution template by its value, every template
 * part (its head, each middle and its tail) by its text - each with its escapes decoded by TypeScript - every
 * regular-expression literal by its source (its escapes not decoded: R-REGEX-ESCAPE), and every chain of "+" whose
 * operands are all string literals, parenthesized or not, by its folded value (an operand behind a type assertion is not
 * one: R-FOLD-WRAPPED). Comments are never read.
 * EDGES: the shared reader's imports (test/helpers/census.ts sourceStructure: static, export-from, dynamic, require, each
 * with its typeOnly flag) plus what this module reads itself: an import-equals declaration (import x = require("y")), a
 * dynamic import or require whose specifier is not a string-like literal (computed, unresolvable by construction), and a
 * require the shared reader does not read - its callee wrapped (parentheses, a non-null assertion, as, satisfies or <T>:
 * (require)("y")) or its name spelled in a shape the shared reader's node.text misreads (the scanner shape) - read as a
 * require edge. A runtime edge is one that is not typeOnly
 * (an import type, an import whose every specifier is type-only, an export type, an import type x = require(...)). A
 * relative specifier resolves inside the judged tree (as written, .js to .ts, a bare path to .ts or to index.ts); one
 * that resolves nowhere, every computed one and a named entry missing from the tree are UNRESOLVED (fail-closed). A bare
 * specifier is a package: it is not followed, and its specifier's own words are judged.
 * AFFORDANCES: a module's UI interaction entry points - its matchesKey reads (a call of matchesKey or of a member of that
 * name; the key as a string literal or a no-substitution template, as Key.<member>, else <computed>), its handleInput
 * implementations (a method, a function declaration, an object property, a class field or a getter, each named by an
 * identifier, a string literal or a computed string literal; a shorthand property; a variable declared by that name; an
 * assignment to a member by =, ??=, ||= or &&=; a setter is not one: R-HANDLER-SETTER), its interactive host UI calls
 * (<handle>.<member>(...) with a member in UI_MEMBERS.interaction) and its extension interactions (registerCommand and
 * registerShortcut by their first argument - a string-like literal, else <computed> - and on("input")); a member reached
 * by an element access with a string literal reads as its property access.
 * A HOST UI HANDLE is a receiver whose name holds the word ui: an identifier (ui, hostUi), a property (ctx.ui, this.ui,
 * this.uiCtx - the src/ui/agent-widget.ts stored handle) or an element access by a string literal; the receiver and
 * every call's callee are read through parentheses, non-null assertions and type assertions (as, satisfies, <T>). A
 * receiver named with the word ui that is not the host's handle reads as one too (fail-closed: an unknown member reds
 * as UNCLASSIFIED); any other receiver (an alias named otherwise, a call result, a container element) and a member
 * reached indirectly (.call, .bind) is R-HOST-ALIAS. A pi surface is a register* or on call on the bare identifier pi, by
 * its nameOf name (a receiver whose node.text collapses to pi while its runtime name differs is not pi: A-pi-collapse);
 * any other receiver (an alias, this.pi, options.pi, pi behind a wrapper) is R-PI-ALIAS. A module with any affordance is
 * an AFFORDANCE module; the VIEW SURFACE is the affordance modules plus every module under src/ui/.
 * FINDINGS (fail-closed, each a line): REACH (an affordance module whose runtime closure holds a PATH module - itself
 * included - tagged [APO view] when the module holds a ROLE text), ENTRY (the entry's runtime closure holds a PATH module),
 * OFFER (a PATH text inside a view-surface module), PACKAGE (a package specifier in a judged closure whose words read as a
 * PATH or a ROLE), UNRESOLVED (a computed or unresolvable import in a judged closure, or a missing entry), UNREADABLE (a
 * judged file the readers cannot read or parse) and UNCLASSIFIED (a member called on a host UI handle, or a pi register/on
 * member, outside the classification). ROLE and CLICK modules are tags, not findings: L3 and R0 pin that src holds none.
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

/**
 * Every member src calls on a host UI handle (a receiver named with the word ui, see the module header), classified: an
 * interaction member makes an affordance, a display member does not; any other member called on a handle is UNCLASSIFIED.
 */
export const UI_MEMBERS = {
  interaction: ["addAutocompleteProvider", "confirm", "custom", "editor", "input", "onTerminalInput", "select"],
  display: ["getEditorText", "notify", "setStatus", "setWidget"],
} as const;

/** Every surface src registers with the host on the identifier pi (register* members, on events), classified; any other receiver is R-PI-ALIAS. */
export const PI_SURFACES = {
  interaction: ["on:input", "registerCommand", "registerShortcut"],
  other: ["on:session_before_switch", "on:session_shutdown", "on:session_start", "on:tool_execution_start", "registerEntryRenderer", "registerFlag", "registerMessageRenderer", "registerTool"],
} as const;

/** The words of a pointer (click) input: R0 pins that no src text holds one (Pi's TUI reads no pointer input); R0-click-words reads each. */
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

/** A CLICK reading: "click:<word>"; undefined when the text holds no CLICK_WORDS word. */
export function clickReading(text: string): string | undefined {
  const click = wordsOf(text).find(word => CLICK_WORDS.includes(word));
  return click === undefined ? undefined : `click:${click}`;
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
  /** Every member called on a host UI handle, with its count. */
  readonly host: Readonly<Record<string, number>>;
  /** The receiver names read as host UI handles (ui, uiCtx, ...). */
  readonly handles: readonly string[];
  readonly extension: readonly string[];
  /** Every pi register* member and on:<event> called. */
  readonly piSurfaces: readonly string[];
  readonly writes: number;
}

/** A four-digit (\uXXXX) or a braced (\u{...}) unicode escape: the only escapes a name may hold. */
const UNICODE_ESCAPE = /\\u(?:\{([0-9A-Fa-f]+)\}|([0-9A-Fa-f]{4}))/gu;

/** A name's source text with every unicode escape decoded, at any position and in any number (an out-of-range escape is kept as written). */
export function unescapeName(raw: string): string {
  return raw.replace(UNICODE_ESCAPE, (written: string, braced: string | undefined, fourDigit: string | undefined) => {
    const code = Number.parseInt(braced ?? fourDigit ?? "", 16);
    return code <= 0x10ffff ? String.fromCodePoint(code) : written;
  });
}

/** A name as the runtime reads it (see the module header: NAMES): its source text, unescaped; never TypeScript's node.text. */
export const nameOf = (node: ts.Identifier | ts.PrivateIdentifier): string => unescapeName(node.getText());

/** A member access: a property access by name, or an element access by a string literal (read as its property access). */
const memberOf = (node: ts.Expression): { readonly member: string; readonly receiver: ts.Expression } | undefined => {
  if (ts.isPropertyAccessExpression(node)) return { member: nameOf(node.name), receiver: node.expression };
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return { member: node.argumentExpression.text, receiver: node.expression };
  return undefined;
};

/** An expression without its parentheses, non-null assertions and type assertions (as, satisfies, <T>). */
export const unwrap = (node: ts.Expression): ts.Expression => {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
};

/** A receiver's name, read through wrappers: an identifier, or the member a property or string-literal element access reads. */
const receiverName = (node: ts.Expression): string | undefined => {
  const bare = unwrap(node);
  return ts.isIdentifier(bare) ? nameOf(bare) : memberOf(bare)?.member;
};

/** A host UI handle: a receiver whose name holds the word ui (see the module header). */
export const isUiHandle = (node: ts.Expression): boolean => wordsOf(receiverName(node) ?? "").includes("ui");

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
/** The assignments that implement a handler on a member: =, ??=, ||= and &&=. */
const ASSIGNMENTS: readonly ts.SyntaxKind[] = [ts.SyntaxKind.EqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken];
/** A declaration's name as text: an identifier, a string literal or a computed string literal; else undefined. */
const nameText = (name: ts.PropertyName | undefined): string | undefined => {
  if (name === undefined) return undefined;
  if (ts.isIdentifier(name)) return nameOf(name);
  if (ts.isStringLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && ts.isStringLiteralLike(name.expression)) return name.expression.text;
  return undefined;
};
/** A handleInput implementation (see the module header): a named method, function, object property, class field or getter, a shorthand property, a variable declared by that name, or an assignment to a member by =, ??=, ||= or &&=. */
const isHandler = (node: ts.Node): boolean => {
  if (ts.isMethodDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isPropertyAssignment(node) || ts.isPropertyDeclaration(node) || ts.isGetAccessorDeclaration(node)) return nameText(node.name) === HANDLER;
  if (ts.isShorthandPropertyAssignment(node)) return nameOf(node.name) === HANDLER;
  if (ts.isVariableDeclaration(node)) return ts.isIdentifier(node.name) && nameOf(node.name) === HANDLER;
  if (ts.isBinaryExpression(node) && ASSIGNMENTS.includes(node.operatorToken.kind)) return memberOf(node.left)?.member === HANDLER;
  return false;
};

/** Every fact the census reads from one module (see the module header); an unreadable or unparseable module fails closed. */
export function moduleFacts(root: string, file: string): ModuleFacts {
  const empty = { edges: [], paths: [], roles: [], clicks: [], keys: [], handlers: 0, host: {}, handles: [], extension: [], piSurfaces: [], writes: 0 };
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
  const handles = new Set<string>();
  const extension: string[] = [];
  const piSurfaces: string[] = [];
  let writes = 0;
  const read = (source: Reading["source"], value: string, node: ts.Node): void => {
    const path = pathReading(value);
    if (path !== undefined) paths.push({ line: lineOf(node), source, text: value, reading: path });
    const role = roleReading(value);
    if (role !== undefined) roles.push({ line: lineOf(node), source, text: value, reading: role });
    const click = clickReading(value);
    if (click !== undefined) clicks.push({ line: lineOf(node), source, text: value, reading: click });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) read("name", nameOf(node), node);
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
      const callee = unwrap(node.expression);
      const name = ts.isIdentifier(callee) ? nameOf(callee) : memberOf(callee)?.member;
      const first = node.arguments[0];
      const literal = first !== undefined && ts.isStringLiteralLike(first) ? first.text : undefined;
      const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequire = ts.isIdentifier(callee) && nameOf(callee) === "require";
      // the shared reader's own test (a bare identifier whose node.text is require): a call it reads is not read twice
      const sharedRequire = ts.isIdentifier(node.expression) && node.expression.text === "require";
      if ((dynamic || isRequire) && literal === undefined) {
        edges.push({ kind: dynamic ? "dynamic" : "require", specifier: undefined, typeOnly: false, line: lineOf(node) });
      } else if (isRequire && !sharedRequire) {
        // a require the shared reader does not read: a wrapped callee ((require)("y")) or a name spelled with an escape
        edges.push({ kind: "require", specifier: literal, typeOnly: false, line: lineOf(node) });
      }
      if (name === "matchesKey") {
        const key = node.arguments[1];
        if (key !== undefined && ts.isStringLiteralLike(key)) keys.add(key.text);
        else if (key !== undefined && ts.isPropertyAccessExpression(key) && ts.isIdentifier(key.expression) && nameOf(key.expression) === "Key") keys.add(`Key.${nameOf(key.name)}`);
        else keys.add("<computed>");
      }
      const access = memberOf(callee);
      if (access !== undefined) {
        const { member, receiver } = access;
        if (isUiHandle(receiver)) {
          host[member] = (host[member] ?? 0) + 1;
          handles.add(receiverName(receiver) ?? "");
        }
        if (member === "registerCommand") extension.push(`command:${literal ?? "<computed>"}`);
        if (member === "registerShortcut") extension.push(`shortcut:${literal ?? "<computed>"}`);
        if (member === "on" && literal === "input") extension.push("on:input");
        if (ts.isIdentifier(receiver) && nameOf(receiver) === "pi" && (member === "on" || member.startsWith("register"))) piSurfaces.push(member === "on" ? `on:${literal ?? "<computed>"}` : member);
      }
      if (name !== undefined && WRITE_CALLS.includes(name)) writes += 1;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { file, ok: true, why: "", edges, paths, roles, clicks, keys: [...keys].sort(), handlers, host, handles: [...handles].sort(), extension: extension.sort(), piSurfaces: piSurfaces.sort(), writes };
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
  /** The modules holding a CLICK text (a tag, like roleModules: R0 pins src holds none). */
  readonly clickModules: readonly string[];
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
  const clickModules = files.filter(file => factsOf(file).clicks.length > 0);
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
  return { facts, affordances, surface, pathModules, roleModules, clickModules, entryClosure, packages: [...packages].sort(), findings: [...findings].sort() };
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
  /** The planted tree's CLICK modules (default: none). */
  readonly clicks?: readonly string[];
  /** The planted tree's affordance inventories (default: not judged). */
  readonly inventory?: readonly Inventory[];
}
/** A reading pin: texts judged by the word judge alone, each with its expected readings (PATH, ROLE then CLICK, joined) or null. */
export interface ReadingPin {
  readonly id: string;
  readonly what: string;
  readonly readings: Readonly<Record<string, string | null>>;
}
/** An escape pin: name spellings, each read by nameOf and by the runtime as an identifier and as a private name, every one expected to read `reads` - the named shapes, and every spelling of `reads` (spellingsOf). */
export interface EscapePin {
  readonly id: string;
  readonly what: string;
  readonly reads: string;
  readonly escapes: Readonly<Record<string, string>>;
}
export type Pin = LivePin | PlantPin | ReadingPin | EscapePin;
export const isLive = (pin: Pin): pin is LivePin => "live" in pin;
export const isReading = (pin: Pin): pin is ReadingPin => "readings" in pin;
export const isEscape = (pin: Pin): pin is EscapePin => "escapes" in pin;
export const isPlant = (pin: Pin): pin is PlantPin => !isLive(pin) && !isReading(pin) && !isEscape(pin);
/** The readings of one text as a reading pin holds them: the PATH, the ROLE and the CLICK reading, joined by a space, or null. */
export const readingsOf = (text: string): string | null => [pathReading(text), roleReading(text), clickReading(text)].filter((reading): reading is string => reading !== undefined).join(" ") || null;
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
/** A four-digit and a braced unicode escape of the given hex, the backslash built at run time (the file holds no escape). */
const u4 = (hex: string): string => `${BACKSLASH}u${hex}`;
const ub = (hex: string): string => `${BACKSLASH}u{${hex}}`;
const hexOf = (letter: string): string => (letter.codePointAt(0) ?? 0).toString(16);
/** One letter's spellings in a name: plain, a four-digit escape (up to U+FFFF: no four-digit escape spells an astral letter in a name) and a braced escape. */
const letterSpellings = (letter: string): string[] => {
  const hex = hexOf(letter);
  return hex.length <= 4 ? [letter, u4(hex.padStart(4, "0")), ub(hex)] : [letter, ub(hex)];
};
/** Every spelling of a word with each letter plain, a four-digit escape or a braced escape (an astral letter plain or braced): 3 ** length spellings for a word of letters up to U+FFFF, every escape shape. */
export function spellingsOf(word: string): string[] {
  let spellings = [""];
  for (const letter of word) spellings = spellings.flatMap(prefix => letterSpellings(letter).map(spelling => prefix + spelling));
  return spellings;
}
/** Names in the scanner shape (an escape, plain characters, a later braced escape), which TypeScript's node.text misreads. */
const HANDLE_INPUT_ESC = `h${u4("0061")}ndleInp${ub("75")}t`;
const SELECT_ESC = `s${u4("0065")}l${ub("65")}ct`;
const HOST_UI_ESC = `h${u4("006f")}stU${ub("69")}`;
const MATCHES_KEY_ESC = `m${u4("0061")}tchesK${ub("65")}y`;
const KEY_ESC = `${u4("004b")}e${ub("79")}`;
const TAB_ESC = `${u4("0074")}a${ub("62")}`;
const REQUIRE_ESC = `${u4("0072")}equir${ub("65")}`;
const REGISTER_PROVIDER_ESC = `r${u4("0065")}gisterProvid${ub("65")}r`;
/** Receivers TypeScript's node.text collapses to pi (the scanner shape), while the runtime and nameOf read pXi and plugini. */
const PI_COLLAPSE = `${u4("0070")}X${ub("69")}`;
const PI_COLLAPSE2 = `${ub("70")}lugin${ub("69")}`;
/** A planted extension module calling `call` on its parameter `receiver`. */
const piExt = (receiver: string, call: string): string =>
  `export function setup(${receiver}: { registerWidget(): void; on(event: string, fn: () => void): void }): void {\n  ${receiver}.${call};\n}\n`;
/** MATHEMATICAL SCRIPT SMALL P (U+1D4C5), a letter above U+FFFF that NFKD folds to p. */
const SCRIPT_P = String.fromCodePoint(0x1d4c5);
/** The shared reader's reading of the F-unreadable store: TypeScript's own parse diagnostic at the first error. */
const UNREADABLE_STORE = `UNREADABLE ${S}: the file does not parse: Expression expected. at line 1:21`;

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
        what: "every member src calls on a host UI handle (src's handles are ui and uiCtx, the src/ui/agent-widget.ts stored handle) and every pi register/on surface src calls on pi is classified, no src text holds a click or mouse word (the view-click surface is empty), and every affordance and view-surface module sits in the entry closure, so its render (refresh) path is judged with the module",
        live: true,
        expect: { unclassified: [], clicks: [], handles: ["ui", "uiCtx"] },
      },
      {
        id: "R0-click-words",
        what: "every CLICK_WORDS word reads as a click, inside a name too, and near-words read nothing",
        readings: { click: "click:click", clicked: "click:clicked", clicking: "click:clicking", clicks: "click:clicks", mouse: "click:mouse", onDoubleClick: "click:click", clickable: null, mousetrap: null },
      },
      {
        id: "R0-click-name",
        what: "a planted pointer handler holding a click word in its name only (onMouseDown; no literal holds one) is read as a CLICK module, so the first click name in src reds R0",
        files: { [V]: view([], '"ok"', ['export const onMouseDown = (): string => "ok";']) },
        findings: [],
        clicks: [V],
      },
      {
        id: "R0-click-literal",
        what: "a planted hint holding a click word in a literal only (no name holds one) is read as a CLICK module, so the first click literal in src reds R0",
        files: { [V]: view([], '"ok"', ['export const hint = (): string => "double click to open";']) },
        findings: [],
        clicks: [V],
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
        what: "every affordance reader names its planted entry: a key as a string literal, as a no-substitution template, as a Key member and computed, a matchesKey member call, a handleInput method, getter and computed-literal method, an interactive ui call through ctx.ui, through ui and through element access, a command by a string literal, by element access, by a no-substitution template and computed, a shortcut by a string literal and computed, and the input event",
        files: {
          "src/ui/keys.ts": [
            TUI,
            'import { Key } from "@earendil-works/pi-tui";',
            "export const k = (d: string, x: string): boolean => matchesKey(d, \"a\") || matchesKey(d, Key.tab) || matchesKey(d, x) || matchesKey(d, `b`);",
            'export const m = (tui: { matchesKey(d: string, key: string): boolean }, d: string): boolean => tui.matchesKey(d, "c");',
            "",
          ].join("\n"),
          "src/ui/input.ts": "export class Box {\n  handleInput(data: string): string {\n    return data;\n  }\n}\n",
          "src/ui/accessor.ts": 'export class Lazy {\n  get handleInput(): (data: string) => string {\n    return data => data;\n  }\n}\nexport class Named {\n  ["handleInput"](data: string): string {\n    return data;\n  }\n}\n',
          "src/ui/host-element.ts": 'export async function pick(ctx: { ui: { select(t: string): Promise<string> } }): Promise<string> {\n  return ctx["ui"]["select"]("z");\n}\n',
          "src/ui/host.ts": 'export async function ask(ctx: { ui: { confirm(t: string): Promise<boolean> } }, ui: { select(t: string): Promise<string> }): Promise<unknown> {\n  return [await ctx.ui.confirm("x"), await ui.select("y")];\n}\n',
          "src/ext.ts":
            'export function wire(pi: { registerCommand(n: string): void; registerShortcut(n: string): void; on(e: string): void }, name: string): void {\n  pi.registerCommand("go");\n  pi["registerCommand"]("go-element");\n  pi.registerCommand(`go-template`);\n  pi.registerCommand(name);\n  pi.registerShortcut("ctrl+p");\n  pi.registerShortcut(name);\n  pi.on("input");\n}\n',
        },
        findings: [],
        inventory: [
          { file: "src/ext.ts", keys: [], handlers: 0, host: {}, extension: ["command:<computed>", "command:go", "command:go-element", "command:go-template", "on:input", "shortcut:<computed>", "shortcut:ctrl+p"] },
          { file: "src/ui/accessor.ts", keys: [], handlers: 2, host: {}, extension: [] },
          { file: "src/ui/host-element.ts", keys: [], handlers: 0, host: { select: 1 }, extension: [] },
          { file: "src/ui/host.ts", keys: [], handlers: 0, host: { confirm: 1, select: 1 }, extension: [] },
          { file: "src/ui/input.ts", keys: [], handlers: 1, host: {}, extension: [] },
          { file: "src/ui/keys.ts", keys: ["<computed>", "Key.tab", "a", "b", "c"], handlers: 0, host: {}, extension: [] },
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
      {
        id: "A-handler-kinds",
        what: "each handleInput kind and name form A-readers does not plant is read: a function declaration, a class field, an object property, an object property named by a string literal, a shorthand property, a variable declared by that name, and an assignment to a member by =, by ??=, by ||= and by &&=, and by = to a member reached by element access",
        files: {
          "src/ui/fn-handler.ts": "export function handleInput(data: string): string {\n  return data;\n}\n",
          "src/ui/field-handler.ts": "export class Field {\n  handleInput = (data: string): string => data;\n}\n",
          "src/ui/prop-handler.ts": "export const box = { handleInput: (data: string): string => data };\n",
          "src/ui/string-handler.ts": 'export const box = { "handleInput": (data: string): string => data };\n',
          "src/ui/shorthand-handler.ts": "export const wrap = (handleInput: (data: string) => string): { handleInput: (data: string) => string } => ({ handleInput });\n",
          "src/ui/const-handler.ts": "export const handleInput = (data: string): string => data;\n",
          "src/ui/assign-handler.ts": "export function attach(component: { handleInput?: (data: string) => string }): void {\n  component.handleInput = data => data;\n}\n",
          "src/ui/nullish-handler.ts": "export function attach(component: { handleInput?: (data: string) => string }): void {\n  component.handleInput ??= data => data;\n}\n",
          "src/ui/or-handler.ts": "export function attach(component: { handleInput?: (data: string) => string }): void {\n  component.handleInput ||= data => data;\n}\n",
          "src/ui/and-handler.ts": "export function attach(component: { handleInput?: (data: string) => string }): void {\n  component.handleInput &&= data => data;\n}\n",
          "src/ui/element-handler.ts": 'export function attach(component: { handleInput?: (data: string) => string }): void {\n  component["handleInput"] = data => data;\n}\n',
        },
        findings: [],
        inventory: [
          "src/ui/and-handler.ts",
          "src/ui/assign-handler.ts",
          "src/ui/const-handler.ts",
          "src/ui/element-handler.ts",
          "src/ui/field-handler.ts",
          "src/ui/fn-handler.ts",
          "src/ui/nullish-handler.ts",
          "src/ui/or-handler.ts",
          "src/ui/prop-handler.ts",
          "src/ui/shorthand-handler.ts",
          "src/ui/string-handler.ts",
        ].map((file): Inventory => ({ file, keys: [], handlers: 1, host: {}, extension: [] })),
      },
      {
        id: "A-handle-forms",
        what: "a host UI handle is read by the word ui in its name (a stored this.uiCtx field, a this.ui field, a hostUi binding) and through parentheses, a non-null assertion, as, satisfies and an angle-bracket assertion; and a call's callee is read through parentheses, a non-null assertion, as, satisfies and an angle-bracket assertion",
        files: {
          "src/ui/wrapped.ts": [
            "type Ui = { select(t: string): string; confirm(t: string): string; input(t: string): string; editor(t: string): string; custom(t: string): string; onTerminalInput(t: string): string };",
            "export function ask(ctx: { ui: Ui }): string[] {",
            '  return [ctx.ui!.select("a"), (ctx.ui).confirm("b"), (ctx.ui as Ui).input("c"), (ctx.ui satisfies Ui).editor("d"), (<Ui>ctx.ui).custom("e"), (ctx.ui.onTerminalInput)("f")];',
            "}",
            "",
          ].join("\n"),
          "src/ui/callee.ts": [
            "type Ask = (t: string) => string;",
            "type Ui = { select: Ask; confirm: Ask; input: Ask; editor: Ask };",
            "export function ask(ctx: { ui: Ui }): string[] {",
            '  return [ctx.ui.select!("a"), (ctx.ui.confirm as Ask)("b"), (ctx.ui.input satisfies Ask)("c"), (<Ask>ctx.ui.editor)("d")];',
            "}",
            "",
          ].join("\n"),
          "src/ui/stored.ts": [
            "type Ui = { select(t: string): string; confirm(t: string): string; input(t: string): string };",
            "export class Widget {",
            "  private uiCtx: Ui | undefined;",
            "  attach(ctx: Ui): void {",
            "    this.uiCtx = ctx;",
            "  }",
            "  ask(): string | undefined {",
            '    return this.uiCtx?.select("x");',
            "  }",
            "}",
            "export function confirmHost(ctx: { ui: Ui }): string {",
            "  const hostUi = ctx.ui;",
            '  return hostUi.confirm("y");',
            "}",
            "export class Panel {",
            "  private ui: Ui;",
            "  constructor(ui: Ui) {",
            "    this.ui = ui;",
            "  }",
            "  ask(): string {",
            '    return this.ui.input("z");',
            "  }",
            "}",
            "",
          ].join("\n"),
        },
        findings: [],
        inventory: [
          { file: "src/ui/callee.ts", keys: [], handlers: 0, host: { confirm: 1, editor: 1, input: 1, select: 1 }, extension: [] },
          { file: "src/ui/stored.ts", keys: [], handlers: 0, host: { confirm: 1, input: 1, select: 1 }, extension: [] },
          { file: "src/ui/wrapped.ts", keys: [], handlers: 0, host: { confirm: 1, custom: 1, editor: 1, input: 1, onTerminalInput: 1, select: 1 }, extension: [] },
        ],
      },
      {
        id: "A-stored-alias",
        what: "the src/ui/agent-widget.ts shape: a handle stored in a this.uiCtx field is read; its display members setStatus and setWidget stay quiet and an unclassified member reds as UNCLASSIFIED",
        files: {
          "src/ui/widget.ts": [
            "type UICtx = { setStatus(k: string, t: string | undefined): void; setWidget(k: string, c: undefined): void; setFooter(t: string): void };",
            "export class Widget {",
            "  private uiCtx: UICtx | undefined;",
            "  setUICtx(ctx: UICtx): void {",
            "    this.uiCtx = ctx;",
            "  }",
            "  clear(): void {",
            '    this.uiCtx?.setWidget("w", undefined);',
            '    this.uiCtx?.setStatus("s", undefined);',
            '    this.uiCtx?.setFooter("f");',
            "  }",
            "}",
            "",
          ].join("\n"),
        },
        findings: ["UNCLASSIFIED src/ui/widget.ts ui.setFooter"],
        inventory: [],
      },
      {
        id: "A-escaped-names",
        what: "every name an affordance reader matches is read by nameOf, so each spelled in the scanner shape (an escape, plain characters, a later braced escape) is read: a handleInput method name, a shorthand property, a variable and an assigned member; a host UI member and a receiver named with the word ui; a matchesKey callee, Key and its member; and a pi register member (an unclassified one reds)",
        files: {
          "src/ui/esc-method.ts": `export class Box {\n  ${HANDLE_INPUT_ESC}(data: string): string {\n    return data;\n  }\n}\n`,
          "src/ui/esc-shorthand.ts": `export const wrap = (${HANDLE_INPUT_ESC}: (data: string) => string): object => ({ ${HANDLE_INPUT_ESC} });\n`,
          "src/ui/esc-variable.ts": `export const ${HANDLE_INPUT_ESC} = (data: string): string => data;\n`,
          "src/ui/esc-assign.ts": `export function attach(component: { handleInput?: (data: string) => string }): void {\n  component.${HANDLE_INPUT_ESC} = data => data;\n}\n`,
          "src/ui/esc-host.ts": `type Ui = { select(t: string): string; confirm(t: string): string };\nexport function ask(ctx: { ui: Ui }, ${HOST_UI_ESC}: Ui): string[] {\n  return [ctx.ui.${SELECT_ESC}("x"), ${HOST_UI_ESC}.confirm("y")];\n}\n`,
          "src/ui/esc-keys.ts": `import { Key, matchesKey } from "@earendil-works/pi-tui";\nexport const k = (d: string): boolean => ${MATCHES_KEY_ESC}(d, "q") || matchesKey(d, ${KEY_ESC}.${TAB_ESC});\n`,
          "src/esc-ext.ts": `export function wire(pi: { registerProvider(n: string): void }): void {\n  pi.${REGISTER_PROVIDER_ESC}("x");\n}\n`,
        },
        findings: ["UNCLASSIFIED src/esc-ext.ts pi.registerProvider"],
        inventory: [
          { file: "src/ui/esc-assign.ts", keys: [], handlers: 1, host: {}, extension: [] },
          { file: "src/ui/esc-host.ts", keys: [], handlers: 0, host: { confirm: 1, select: 1 }, extension: [] },
          { file: "src/ui/esc-keys.ts", keys: ["Key.tab", "q"], handlers: 0, host: {}, extension: [] },
          { file: "src/ui/esc-method.ts", keys: [], handlers: 1, host: {}, extension: [] },
          { file: "src/ui/esc-shorthand.ts", keys: [], handlers: 1, host: {}, extension: [] },
          { file: "src/ui/esc-variable.ts", keys: [], handlers: 1, host: {}, extension: [] },
        ],
      },
      {
        id: "A-pi-collapse",
        what: "the pi receiver is read by its nameOf name, never by TypeScript's node.text: two receivers whose node.text collapses to pi while the runtime reads pXi and plugini - an escape, plain characters, a later braced escape, each its only spelling - register no pi surface, by register* (src/ext-collapse.ts, src/ext-collapse2.ts) or by on (src/ext-collapse-on.ts); the controls beside them: the bare pi's unclassified member reds (src/ext-pi.ts), a plain pXi stays quiet (src/ext-pxi.ts) and a receiver spelled Pi, another name to the runtime, stays quiet (src/ext-pi-case.ts)",
        files: {
          "src/ext-collapse.ts": piExt(PI_COLLAPSE, "registerWidget()"),
          "src/ext-collapse2.ts": piExt(PI_COLLAPSE2, "registerWidget()"),
          "src/ext-collapse-on.ts": piExt(PI_COLLAPSE, 'on("agent_end", () => {})'),
          "src/ext-pi.ts": piExt("pi", "registerWidget()"),
          "src/ext-pxi.ts": piExt("pXi", "registerWidget()"),
          "src/ext-pi-case.ts": piExt("Pi", "registerWidget()"),
        },
        findings: ["UNCLASSIFIED src/ext-pi.ts pi.registerWidget"],
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
        id: "F-template-specifier",
        what: "through a dynamic import whose specifier is a no-substitution template (a string-like literal, so not computed)",
        files: { [AV]: asyncView([], ["const mod = await import(`../ops/store.js`);", "return mod.run();"], [APO_TITLE]), [S]: STORE },
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
        id: "F-require-wrapped",
        what: "through a require whose callee is wrapped, one store per wrapper form: parentheses, a non-null assertion, as, satisfies and an angle-bracket assertion (the shared reader reads only the bare identifier)",
        files: {
          [AV]: [
            TUI,
            APO_TITLE,
            "type Store = { run(): string };",
            "type Load = (id: string) => Store;",
            "export function handleKey(data: string): string {",
            '  if (!matchesKey(data, "p")) return "";',
            '  const paren = (require)("../ops/paren.js") as Store;',
            '  const nonNull = require!("../ops/non-null.js") as Store;',
            '  const asserted = (require as Load)("../ops/as.js");',
            '  const satisfied = (require satisfies NodeRequire)("../ops/satisfies.js") as Store;',
            '  const angled = (<Load>require)("../ops/angle.js");',
            "  return [paren, nonNull, asserted, satisfied, angled].map(store => store.run()).join();",
            "}",
            "",
          ].join("\n"),
          "src/ops/paren.ts": STORE,
          "src/ops/non-null.ts": STORE,
          "src/ops/as.ts": STORE,
          "src/ops/satisfies.ts": STORE,
          "src/ops/angle.ts": STORE,
        },
        findings: ["src/ops/angle.ts", "src/ops/as.ts", "src/ops/non-null.ts", "src/ops/paren.ts", "src/ops/satisfies.ts"].map(store => `REACH ${AV} [APO view] -> ${store} (promote:promote) via ${AV} -require-> ${store}`),
        roles: [AV],
      },
      {
        id: "F-require-escaped",
        what: "through a require whose callee is spelled in the scanner shape (an escape, plain characters, a later braced escape): the shared reader's node.text misses it and nameOf reads it",
        files: { [AV]: view([], `(${REQUIRE_ESC}("../ops/store.js") as { run(): string }).run()`, [APO_TITLE]), [S]: STORE },
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
        id: "F-bare-paths",
        what: "a relative specifier resolves as written, as a bare path to its .ts file and as a directory to its index.ts",
        files: {
          [AV]: view(['import { run } from "../ops";', 'import { label } from "../ops/label.ts";'], "run() + label", [APO_TITLE]),
          "src/ops/index.ts": 'export * from "./store";\n',
          "src/ops/label.ts": 'export const label = "x";\n',
          [S]: STORE,
        },
        findings: [ROUTE(`${AV} -static-> src/ops/index.ts -export-from-> ${S}`)],
        roles: [AV],
      },
      {
        id: "F-unreadable",
        what: "a judged module that does not parse fails closed as UNREADABLE",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store("export const run = (: string => 1;") },
        findings: [UNREADABLE_STORE],
      },
      {
        id: "F-missing-entry",
        what: "a named entry missing from the tree fails closed as UNRESOLVED",
        files: { [V]: view([], '"ok"') },
        entry: "src/index.ts",
        findings: ["UNRESOLVED entry src/index.ts"],
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
        what: "the title's word publication beside manifest, in a name only, a declaration (no reference spells it)",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const publicationManifest = (): string => "x";\nexport const run = (): string => "y";') },
        findings: [PLAIN("publish:publication+manifest")],
      },
      {
        id: "F-word-promotion",
        what: "the title's word promotion, in a name only, a reference (no declaration spells it)",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store("export const run = (): string => String(promotionSlot);") },
        findings: [PLAIN("promote:promotion")],
      },
      {
        id: "F-folded",
        what: "a + chain of string literals is read by its folded value",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const run = (): string => "pub" + "lish " + "manifest";') },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-template-head",
        what: "a template head is read by its text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (n: number): string => \`promoted \${n}\`;`) },
        findings: [PLAIN("promote:promoted")],
      },
      {
        id: "F-template-middle",
        what: "a template middle is read by its text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (n: number): string => \`a \${n} promoted \${n} b\`;`) },
        findings: [PLAIN("promote:promoted")],
      },
      {
        id: "F-template-tail",
        what: "a template tail is read by its text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (n: number): string => \`a \${n} promoted\`;`) },
        findings: [PLAIN("promote:promoted")],
      },
      {
        id: "F-regex",
        what: "a regular-expression literal is read by its source",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store("export const run = (): string => /publish manifest/.source;") },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-escaped-4digit",
        what: "a name spelled with a four-digit unicode escape (its only spelling in the plant) is read by its unescaped text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const ${u4("0070")}romoteSlot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-braced",
        what: "a name spelled with a braced unicode escape (its only spelling in the plant) is read by its unescaped text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const ${ub("70")}romoteSlot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-scanner",
        what: "a name spelled in the scanner shape - a four-digit escape, plain characters, a later braced escape (its only spelling in the plant) - is read by its unescaped text, though TypeScript's node.text drops the plain characters",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const ${u4("0070")}romot${ub("65")}Slot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-scanner-braced",
        what: "a name spelled in the scanner shape with braced escapes only - a braced escape, plain characters, a later braced escape (its only spelling in the plant) - is read by its unescaped text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const ${ub("70")}romot${ub("65")}Slot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-private",
        what: "a private name spelled in the scanner shape (a private field, its only spelling in the plant) is read by its unescaped text",
        files: { [V]: view(['import { Store } from "../ops/store.js";'], "new Store().run()"), [S]: store(`export class Store {\n  #${u4("0070")}romot${ub("65")}Slot = 1;\n  run(): string {\n    return "x";\n  }\n}`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-padded",
        what: "a name spelled with a braced unicode escape padded to seven hex digits, past six - a leading escape, its only spelling in the plant - is read by its unescaped text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const ${ub("0000070")}romoteSlot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-padded-long",
        what: "a name spelled with a braced unicode escape padded to twelve hex digits, after plain characters (its only spelling in the plant), is read by its unescaped text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const promot${ub("000000000065")}Slot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escaped-astral",
        what: "a name whose braced unicode escape names U+1D4C5 - MATHEMATICAL SCRIPT SMALL P, a code point above U+FFFF that NFKD folds to p, its only spelling in the plant - is read by its unescaped text, one character",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "x";\nexport const ${ub("1d4c5")}romoteSlot = 1;`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-escapes-runtime",
        what: "nameOf reads every escape shape as the runtime does (the spellings compiled in a new node:vm context), as an identifier and as a private name: every spelling of promote with each letter plain, a four-digit escape or a braced escape (3 ** 7 = 2187 spellings, so every leading, trailing, middle, adjacent, mixed and scanner shape), and the named shapes - a leading, a trailing and a middle escape of each form; two adjacent escapes of each form and of both forms in each order; every letter escaped in each form; an escape then plain characters then a later four-digit escape, after each form; the scanner shape (an escape, plain characters, a later braced escape) after each form and twice in one name; a braced escape padded with zeros; upper-case hex in each form",
        reads: "promote",
        escapes: {
          "leading-4digit": `${u4("0070")}romote`,
          "leading-braced": `${ub("70")}romote`,
          "trailing-4digit": `promot${u4("0065")}`,
          "trailing-braced": `promot${ub("65")}`,
          "middle-4digit": `pro${u4("006d")}ote`,
          "middle-braced": `pro${ub("6d")}ote`,
          "adjacent-4digit": `pro${u4("006d")}${u4("006f")}te`,
          "adjacent-braced": `pro${ub("6d")}${ub("6f")}te`,
          "adjacent-4digit-braced": `pro${u4("006d")}${ub("6f")}te`,
          "adjacent-braced-4digit": `pro${ub("6d")}${u4("006f")}te`,
          "every-4digit": [..."promote"].map(letter => u4(hexOf(letter).padStart(4, "0"))).join(""),
          "every-braced": [..."promote"].map(letter => ub(hexOf(letter))).join(""),
          "later-4digit-after-4digit": `${u4("0070")}romot${u4("0065")}`,
          "later-4digit-after-braced": `${ub("70")}romot${u4("0065")}`,
          "scanner-after-4digit": `${u4("0070")}romot${ub("65")}`,
          "scanner-after-braced": `${ub("70")}romot${ub("65")}`,
          "scanner-twice": `${u4("0070")}ro${ub("6d")}ot${ub("65")}`,
          "braced-padded": `${ub("0070")}romote`,
          "upper-hex-4digit": `pro${u4("006D")}ote`,
          "upper-hex-braced": `pro${ub("6D")}ote`,
        },
      },
      {
        id: "F-escapes-runtime-padded",
        what: "nameOf reads a braced escape padded past four hex digits as the runtime does (the spellings compiled in a new node:vm context), as an identifier and as a private name: promote with its p braced and padded to six, to seven and to twelve hex digits (a leading escape) and with its e braced and padded to seven and to twelve (a trailing escape), beside every spelling of promote (spellingsOf)",
        reads: "promote",
        escapes: {
          "braced-padded-6": `${ub("000070")}romote`,
          "braced-padded-7": `${ub("0000070")}romote`,
          "braced-padded-12": `${ub("000000000070")}romote`,
          "trailing-braced-padded-7": `promot${ub("0000065")}`,
          "trailing-braced-padded-12": `promot${ub("000000000065")}`,
        },
      },
      {
        id: "F-escapes-runtime-astral",
        what: "nameOf reads the braced escape of U+1D4C5, a code point above U+FFFF, as one character, as the runtime does (the spellings compiled in a new node:vm context), as an identifier and as a private name: every spelling of a name led by U+1D4C5 with that letter plain or braced (no four-digit escape spells it in a name) and each other letter plain, a four-digit escape or a braced escape (2 * 3 ** 6 = 1458 spellings), and the named shapes - the astral letter braced, and padded to six and to eight hex digits",
        reads: `${SCRIPT_P}romote`,
        escapes: {
          "astral-braced": `${ub("1d4c5")}romote`,
          "astral-braced-padded-6": `${ub("01d4c5")}romote`,
          "astral-braced-padded-8": `${ub("0001d4c5")}romote`,
        },
      },
      {
        id: "F-digit-split",
        what: "a letter-digit boundary splits a name: publish2Graph (a declaration, its only spelling) reads publish beside graph",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const publish2Graph = (): string => "x";\nexport const run = (): string => "y";') },
        findings: [PLAIN("publish:publish+graph")],
      },
      {
        id: "F-acronym-split",
        what: "an acronym before a capitalized word splits: PUBLISHManifest (a declaration, its only spelling) reads publish beside manifest",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const PUBLISHManifest = "x";\nexport const run = (): string => "y";') },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-private-name",
        what: "a private name is read: #promoteSlot (a private field, its only spelling) reads promote",
        files: { [V]: view(['import { Store } from "../ops/store.js";'], "new Store().run()"), [S]: store('export class Store {\n  #promoteSlot = 1;\n  run(): string {\n    return "x";\n  }\n}') },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-nosub-template",
        what: "a template literal with no substitution is read by its cooked text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store("export const run = (): string => `publish manifest`;") },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-folded-parens",
        what: "a + chain of string literals is folded through its parentheses",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store('export const run = (): string => ("pub" + "lish") + " manifest";') },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-literal-escape",
        what: "a string literal is read by its value, its escape decoded: promote spelled with a four-digit escape",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => "${u4("0070")}romote";`) },
        findings: [PLAIN("promote:promote")],
      },
      {
        id: "F-nosub-escape",
        what: "a no-substitution template is read by its value, its escape decoded: publish spelled with a braced escape",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => \`${ub("70")}ublish manifest\`;`) },
        findings: [PLAIN("publish:publish+manifest")],
      },
      {
        id: "F-template-escape",
        what: "a template part is read by its text, its escape decoded: promoted spelled with a four-digit escape in a template head",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (n: number): string => \`${u4("0070")}romoted \${n}\`;`) },
        findings: [PLAIN("promote:promoted")],
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
        what: "the program's slug words in order, in a literal only, tag the view as an APO view",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()", ['export const TITLE = "adaptive-policy-organizations view";']), [S]: STORE },
        findings: [`REACH ${V} [APO view] -> ${S} (promote:promote) via ${V} -static-> ${S}`],
        roles: [V],
      },
      {
        id: "F-slug-name",
        what: "the program's slug words in order, in a name only, tag the view as an APO view",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()", ["export const adaptivePolicyOrganizationsPanel = 1;"]), [S]: STORE },
        findings: [`REACH ${V} [APO view] -> ${S} (promote:promote) via ${V} -static-> ${S}`],
        roles: [V],
      },
      {
        id: "F-role-literal",
        what: "the program's abbreviation, in a literal only, tags the view as an APO view",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()", ['export const TITLE = "APO panel";']), [S]: STORE },
        findings: [`REACH ${V} [APO view] -> ${S} (promote:promote) via ${V} -static-> ${S}`],
        roles: [V],
      },
      {
        id: "F-role-name",
        what: "the program's abbreviation, in a name only, tags the view as an APO view",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()", ["export const apoPanel = 1;"]), [S]: STORE },
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
        id: "F-lists-case",
        what: "each split reads alone: a lower-to-upper change (camelCase, PascalCase), an acronym before a capitalized word, a letter-digit boundary, a digit-letter boundary, and a capital run is lower-cased",
        readings: {
          publishManifest: "publish:publish+manifest",
          PublishManifest: "publish:publish+manifest",
          PUBLISHManifest: "publish:publish+manifest",
          promote2: "promote:promote",
          "2promote": "promote:promote",
          PROMOTE: "promote:promote",
        },
      },
      {
        id: "F-lists-near",
        what: "QUIET: near-words, words out of order, words inside longer words, a word broken by a digit or by punctuation, and a word run into the next in one case read nothing",
        readings: {
          "public graph": null,
          "publisher graph": null,
          "promo checkpoint": null,
          "publish graphic": null,
          "apology": null,
          "apostrophe view": null,
          "adaptive organizations policy": null,
          "publish": null,
          "pr0mote": null,
          "pro-mote": null,
          "PUBLISHMANIFEST": null,
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
        id: "F-quiet-type-export",
        what: "QUIET: an export type from a path module is erased at run time and reaches nothing",
        files: { [AV]: view(['export type { Receipt } from "../ops/store.js";'], '"ok"', [APO_TITLE]), [S]: `${STORE}export interface Receipt {\n  readonly at: string;\n}\n` },
        findings: [],
        roles: [AV],
      },
      {
        id: "F-quiet-type-import-equals",
        what: "QUIET: an import type x = require(...) of a path module is erased at run time and reaches nothing",
        files: { [AV]: view(['import type ops = require("../ops/store.js");'], '"ok"', [APO_TITLE, "export type Seen = ops.Receipt;"]), [S]: `${STORE}export interface Receipt {\n  readonly at: string;\n}\n` },
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
        what: "a module loaded at run time by a path or URL value - a worker, a fork, a vm script, a createRequire result - or through a require no reader names (behind a comma expression, through an alias) is not an edge",
        files: {
          [V]: [
            TUI,
            'import { fork } from "node:child_process";',
            'import { readFileSync } from "node:fs";',
            'import { createRequire } from "node:module";',
            'import { runInThisContext } from "node:vm";',
            'import { Worker } from "node:worker_threads";',
            "type Store = { run(): string };",
            "const load = require;",
            "export function handleKey(data: string): string {",
            '  if (!matchesKey(data, "p")) return "";',
            '  const worker = new Worker(new URL("../ops/store.js", import.meta.url));',
            '  const child = fork(new URL("../ops/store.js", import.meta.url));',
            '  const script = runInThisContext(readFileSync(new URL("../ops/store.js", import.meta.url), "utf8")) as Store;',
            '  const created = createRequire(import.meta.url)("../ops/store.js") as Store;',
            '  const viaComma = (0, require)("../ops/store.js") as Store;',
            '  const viaAlias = load("../ops/store.js") as Store;',
            "  return [String(worker.threadId), String(child.pid), script.run(), created.run(), viaComma.run(), viaAlias.run()].join();",
            "}",
            "",
          ].join("\n"),
          [S]: STORE,
        },
        findings: [],
      },
      {
        id: "R-HOST-ALIAS",
        what: "a host UI call through a receiver not named with the word ui (an alias named otherwise, a call result, a container element), or of a member reached indirectly (.call, .bind), is not read (the entry leg still judges its module)",
        files: {
          [V]: 'export async function pick(ctx: { ui: { select(t: string): Promise<string> } }): Promise<string[]> {\n  const handle = ctx.ui;\n  const current = () => ctx.ui;\n  const held = [ctx.ui];\n  const bound = ctx.ui.select.bind(ctx.ui);\n  return [await handle.select("x"), await current().select("y"), await held[0].select("z"), await ctx.ui.select.call(ctx.ui, "w"), await bound("v")];\n}\n',
        },
        findings: [],
        inventory: [],
      },
      {
        id: "R-PI-ALIAS",
        what: "a pi surface registered through any receiver but the bare identifier pi (an alias, this.pi, options.pi, and pi behind parentheses, a non-null assertion, as, satisfies or an angle-bracket assertion) is not classified, so an unknown one stays quiet",
        files: {
          "src/ext.ts":
            'type Pi = { registerProvider(n: string): void };\nexport class Wire {\n  private pi: Pi;\n  constructor(pi: Pi) {\n    this.pi = pi;\n  }\n  run(options: { pi: Pi }): void {\n    const api = this.pi;\n    api.registerProvider("x");\n    this.pi.registerProvider("y");\n    options.pi.registerProvider("z");\n  }\n}\nexport function wrapped(pi: Pi): void {\n  (pi).registerProvider("a");\n  pi!.registerProvider("b");\n  (pi as Pi).registerProvider("c");\n  (pi satisfies Pi).registerProvider("d");\n  (<Pi>pi).registerProvider("e");\n}\n',
        },
        findings: [],
      },
      {
        id: "R-HANDLER-FORM",
        what: "a handleInput defined through a call or an export alias (Object.defineProperty, Reflect.set, export { h as handleInput }) is not read as a handler (the entry leg still judges its module)",
        files: {
          "src/ui/define.ts": 'export function attach(component: object): void {\n  Object.defineProperty(component, "handleInput", { value: (data: string): string => data });\n  Reflect.set(component, "handleInput", (data: string): string => data);\n}\n',
          "src/ui/alias.ts": "const h = (data: string): string => data;\nexport { h as handleInput };\n",
        },
        findings: [],
        inventory: [],
      },
      {
        id: "R-HANDLER-SETTER",
        what: "a setter named handleInput (set handleInput(fn): it is assigned, never called with input) is not read as a handler",
        files: { "src/ui/setter.ts": "export class Box {\n  set handleInput(fn: (data: string) => string) {\n    void fn;\n  }\n}\n" },
        findings: [],
        inventory: [],
      },
      {
        id: "R-FOLD-WRAPPED",
        what: "a + chain whose operand sits behind a type assertion (as, satisfies) is not folded, so its parts are read alone and read no PATH text",
        files: {
          [V]: view(['import { also, run } from "../ops/store.js";'], "run() + also()"),
          [S]: store('export const run = (): string => ("pub" as string) + "lish manifest";\nexport const also = (): string => ("pro" satisfies string) + "mote";'),
        },
        findings: [],
      },
      {
        id: "R-REGEX-ESCAPE",
        what: "a PATH word spelled with an escape inside a regular-expression literal (a hex escape, a unicode escape) is read by the literal's source, its escape not decoded, so it reads no PATH text",
        files: { [V]: view(['import { run } from "../ops/store.js";'], "run()"), [S]: store(`export const run = (): string => /pro${BACKSLASH}x6dote/.source + /publish ${BACKSLASH}u006danifest/u.source;`) },
        findings: [],
      },
    ],
  },
];

/** The named residual families and their pinned quiet rows (test titles). */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = Object.fromEntries((ROWS.find(row => row.id === "Q")?.pins ?? []).map(pin => [pin.id, [`Q ${pin.id}`]]));

/** The test title each pin registers. */
export const titleOf = (row: Row, pin: Pin): string => `${row.id} ${pin.id}`;
