/**
 * wb-km7q.10 (SDK-DETERMINISTIC-REPLAY-R1; the rule-19 structural-exit child of wb-km7q.3, orchestrator rulings R-B110 and
 * R-B143): the full-surface readers of wb-km7q.3's query-evidence census, shared so its re-cut takes them in place of its own
 * notPlain, stringsOf, declaredViews, sizeMembers and DRAW (R-B143: "a mechanical restatement over the landed readers").
 *
 * Every reader's claim is composed from its rosters. A roster form is a lead and the examples it lists in parentheses, so a
 * claim names exactly the examples its rosters hold, and test/workbench-rc-query-evidence-readers-census.test.ts holds one
 * falsifier per example, named by it, pinning the reader's whole reading of it. The module readers and the docs reader never
 * throw on a form they cannot read: they return it in `unread`, and a census reading them fails closed on a non-empty `unread`.
 */
import ts from "typescript";
import type { InspectorSize } from "../../src/ui/workflow-inspector.js";
import { docsSection } from "./census.js";

/** One form of a reader's roster: its id (its falsifiers' key in the census), its lead, and the examples it lists. */
export interface ReaderForm {
  readonly id: string;
  readonly lead: string;
  readonly examples: readonly string[];
}
/** A form as its claim lists it: the lead, then the examples in parentheses. */
export const formText = (form: ReaderForm): string => `${form.lead} (${form.examples.join(", ")})`;
const listed = (forms: readonly ReaderForm[]): string => forms.map(formText).join("; ");
/** R-UNLISTED, the named residual of notPlain and stringsOf, as both claims state it. */
export const UNLISTED_RESIDUAL =
  "a proxy that reports another prototype, or answers or hides a key, is R-UNLISTED, a named residual whose quiet row is the readers census's case 'R-UNLISTED quiet row'";

// ------------------------------------------------------------------------------------------------- R14: the plain-data check
/** 2^32 - 1: an own key of an array is an array index only when it is a canonical numeric string whose value is below it. */
export const ARRAY_INDEX_LIMIT = 4_294_967_295;
/** Whether an own key of an array is an array index (ECMAScript: a canonical numeric string below 2^32 - 1). */
export const isArrayIndex = (key: string): boolean => /^(?:0|[1-9]\d*)$/.test(key) && Number(key) < ARRAY_INDEX_LIMIT;
/** What notPlain walks. */
export const NOT_PLAIN_WALK: readonly ReaderForm[] = [
  { id: "object-keys", lead: "every own string-keyed property of every object, whatever its name", examples: ["a name", "length", "a numeric name"] },
  { id: "array-keys", lead: "every own string-keyed property of every array but its length", examples: ["an index", "a named property"] },
  { id: "depth", lead: "the data value of every property it walks, at any depth", examples: ["64 levels down"] },
];
/** The forms notPlain fails closed on, each with the message it returns (`<at>: <message>`, or `<at>.<key>: <message>`). */
export const NOT_PLAIN_FORMS: readonly (ReaderForm & { readonly message: string })[] = [
  { id: "object-prototype", lead: "an object that is no array whose prototype is neither Object.prototype nor null", examples: ["a Map", "a Set", "a class instance", "an object inheriting a value"], message: "no plain object" },
  {
    id: "array-prototype",
    lead: "an array whose prototype is not Array.prototype, whatever it inherits",
    examples: ["the gate's class-instance array", "a class-instance array holding nothing of its own", "an array without a prototype"],
    message: "no plain array",
  },
  { id: "symbol-key", lead: "a symbol key", examples: ["on an object", "on an array"], message: "a symbol key" },
  {
    id: "array-key",
    lead: "on an array, an own key that is no array index: no canonical numeric string, or one at or above 4294967295",
    examples: ["a name", "01", "4294967295", "4294967296"],
    message: "a named property on an array",
  },
  { id: "not-enumerable", lead: "a property that is not enumerable", examples: ["on an object", "at an index of an array"], message: "not enumerable" },
  { id: "accessor", lead: "an accessor", examples: ["a getter", "a setter", "a getter at an index of an array"], message: "an accessor" },
  { id: "type", lead: "a value of type undefined, function, symbol or bigint", examples: ["undefined", "a function", "a symbol", "a bigint"], message: "a <type>" },
  { id: "not-finite", lead: "a number that is not finite", examples: ["NaN", "an infinity", "a negative infinity"], message: "a number that is not finite" },
];
/** What notPlain passes. */
export const NOT_PLAIN_PASS: readonly ReaderForm[] = [
  { id: "leaves", lead: "null, a string, a finite number and a boolean", examples: ["null", "a string", "an empty string", "0", "a negative fraction", "true", "false"] },
  { id: "objects", lead: "a plain or null-prototype object whose properties pass", examples: ["a plain object", "a null-prototype object", "an empty object", "an object with numeric length"] },
  { id: "arrays", lead: "a plain array whose properties pass, its length never read", examples: ["a plain array", "a sparse array", "an empty array", "nested arrays"] },
];
/** R14's claim, composed from NOT_PLAIN_WALK, NOT_PLAIN_FORMS and NOT_PLAIN_PASS. */
export const R14_CLAIM = `notPlain walks ${listed(NOT_PLAIN_WALK)}, and fails closed on each of these forms: ${listed(NOT_PLAIN_FORMS)}. It passes ${listed(NOT_PLAIN_PASS)}. It reads a value through what reflection reports and only the keys the value lists: ${UNLISTED_RESIDUAL}. A value nested deeper than the stack throws, failing a census, never passing it.`;
/** The plain-data check (R14), by `<at>: <form>`. */
export function notPlain(value: unknown, at: string): string[] {
  if (value === null || typeof value === "string" || typeof value === "boolean") return [];
  if (typeof value === "number") return Number.isFinite(value) ? [] : [`${at}: a number that is not finite`];
  if (typeof value !== "object") return [`${at}: a ${typeof value}`];
  const out: string[] = [];
  const array = Array.isArray(value);
  const prototype: unknown = Object.getPrototypeOf(value);
  if (array && prototype !== Array.prototype) out.push(`${at}: no plain array`);
  if (!array && prototype !== Object.prototype && prototype !== null) out.push(`${at}: no plain object`);
  if (Object.getOwnPropertySymbols(value).length > 0) out.push(`${at}: a symbol key`);
  for (const key of Object.getOwnPropertyNames(value)) {
    if (array && key === "length") continue;
    if (array && !isArrayIndex(key)) out.push(`${at}.${key}: a named property on an array`);
    const property = Object.getOwnPropertyDescriptor(value, key);
    if (property === undefined) continue;
    if (!property.enumerable) out.push(`${at}.${key}: not enumerable`);
    if (property.get !== undefined || property.set !== undefined) out.push(`${at}.${key}: an accessor`);
    else out.push(...notPlain(property.value, `${at}.${key}`));
  }
  return out;
}

// ---------------------------------------------------------------------------------------- READINGS: the string leaves read
/** The forms stringsOf reads. */
export const STRINGS_FORMS: readonly ReaderForm[] = [
  { id: "string", lead: "a string itself", examples: ["at the top", "64 arrays down"] },
  { id: "element", lead: "the value of each own enumerable index of an array, never the index itself", examples: ["an index", "the largest index"] },
  { id: "value", lead: "the value of each own enumerable string-keyed property of an object", examples: ["a data property", "a getter"] },
  { id: "key", lead: "the name of each own enumerable string-keyed property of an object", examples: ["a name", "a numeric name"] },
  { id: "array-key", lead: "the name and the value of each own enumerable key of an array that is no array index", examples: ["a name", "01", "4294967295", "4294967296"] },
];
/** What stringsOf leaves unread. */
export const STRINGS_UNREAD_FORMS: readonly ReaderForm[] = [
  { id: "other", lead: "any value that is no string, array or object, which reads as nothing", examples: ["a number", "a boolean", "null", "undefined", "a function", "a symbol", "a bigint"] },
  {
    id: "unlisted",
    lead: "what a value holds other than as an own enumerable string-keyed property",
    examples: ["what it inherits", "a Map's entries", "a Set's entries", "a symbol-keyed property", "a non-enumerable property", "an array's length"],
  },
];
/** What notPlain fails closed on among the values stringsOf leaves unread. */
export const STRINGS_GUARDED: readonly ReaderForm[] = [
  {
    id: "guarded",
    lead: "notPlain fails closed on each unread value that can hold a string",
    examples: ["what it inherits", "a Map's entries", "a Set's entries", "a symbol-keyed property", "a non-enumerable property", "a function"],
  },
];
/** READINGS' claim, composed from STRINGS_FORMS, STRINGS_UNREAD_FORMS and STRINGS_GUARDED. */
export const STRINGS_CLAIM = `stringsOf reads every string a value lists, in order: ${listed(STRINGS_FORMS)}. It leaves unread ${listed(STRINGS_UNREAD_FORMS)}; and ${listed(STRINGS_GUARDED)}. It reads a value through what reflection reports and only the keys the value lists: ${UNLISTED_RESIDUAL}.`;
/** The strings a value lists, in order. */
export function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value === null || typeof value !== "object") return [];
  const array = Array.isArray(value);
  return Object.keys(value).flatMap(key => [...(array && isArrayIndex(key) ? [] : [key]), ...stringsOf(Reflect.get(value, key))]);
}

// ------------------------------------------------------------------------------------------- the AST readers (src modules)
const parse = (path: string, text: string): ts.SourceFile => ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** What a module or docs reader read: the members, and every form it could not read (a census fails closed on a non-empty
 * `unread`). */
export interface ModuleReading<T> {
  readonly members: readonly T[];
  readonly unread: readonly string[];
}

/** The forms declaredViews reads. */
export const VIEWS_FORMS: readonly ReaderForm[] = [
  { id: "literal", lead: "a string-literal member of the union, read once however often it is written", examples: ["the real union", "a repeated literal"] },
  {
    id: "alias",
    lead: "a bare name of a type alias the module declares once at top level without type parameters, read through its own members",
    examples: ["an alias chain", "a whole union behind one alias"],
  },
  { id: "parenthesized", lead: "a member written in parentheses", examples: ["a parenthesized union", "a parenthesized literal"] },
];
/** The forms declaredViews fails closed on. */
export const VIEWS_UNREAD_FORMS: readonly ReaderForm[] = [
  {
    id: "other-member",
    lead: "any other member",
    examples: ["a template literal type", "a keyword", "a number literal", "a boolean literal", "a qualified name", "type arguments on a plain alias", "type arguments on a generic alias", "an undeclared name"],
  },
  { id: "other-alias", lead: "a bare name the module declares other than once at top level as a type alias without type parameters", examples: ["a generic alias", "an alias declared twice", "an interface"] },
  { id: "circular", lead: "an alias that leads back to an alias on its own path", examples: ["back to InspectorView", "between two other aliases", "back to itself"] },
  {
    id: "declaration",
    lead: "InspectorView declared other than once at top level as a type alias, or beside it as an interface, a class or an enum",
    examples: ["no declaration", "two aliases", "an interface alone", "an alias beside an interface", "an alias beside a class", "an alias beside an enum"],
  },
];
/** The views claim (R13, SURFACES, D1, A1), composed from VIEWS_FORMS and VIEWS_UNREAD_FORMS. */
export const VIEWS_CLAIM = `declaredViews reads every member of the module's InspectorView union: ${listed(VIEWS_FORMS)}. It fails closed on ${listed(VIEWS_UNREAD_FORMS)}.`;
/** The inspector's views, read from the drawer module's `type InspectorView` union. */
export function declaredViews(text: string, path = "module.ts"): ModuleReading<string> {
  const source = parse(path, text);
  const aliases = new Map<string, ts.TypeAliasDeclaration[]>();
  for (const statement of source.statements) if (ts.isTypeAliasDeclaration(statement)) aliases.set(statement.name.text, [...(aliases.get(statement.name.text) ?? []), statement]);
  const declared = aliases.get("InspectorView") ?? [];
  const otherwise = otherDeclarations(source, "InspectorView", ts.isTypeAliasDeclaration);
  const view = declared[0];
  if (declared.length !== 1 || view === undefined || otherwise > 0) return { members: [], unread: [`InspectorView: declared ${declared.length} times as a top-level type alias and ${otherwise} times otherwise`] };
  const views: string[] = [];
  const unread: string[] = [];
  const visit = (node: ts.TypeNode, via: readonly string[]): void => {
    if (ts.isParenthesizedTypeNode(node)) {
      visit(node.type, via);
      return;
    }
    if (ts.isUnionTypeNode(node)) {
      for (const member of node.types) visit(member, via);
      return;
    }
    if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
      if (!views.includes(node.literal.text)) views.push(node.literal.text);
      return;
    }
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeArguments === undefined) {
      const name = node.typeName.text;
      const found = aliases.get(name) ?? [];
      const target = found[0];
      if (via.includes(name)) unread.push(`${name}: an alias that leads back to an alias on its own path`);
      else if (found.length === 1 && target !== undefined && target.typeParameters === undefined) visit(target.type, [...via, name]);
      else unread.push(`${name}: no type alias the module declares once at top level without type parameters`);
      return;
    }
    unread.push(`${node.getText(source)}: no member form the reader reads`);
  };
  visit(view.type, ["InspectorView"]);
  return { members: views, unread };
}
/** How many top-level type-space declarations named `name` are of another kind than `kind` (an interface, a class, an enum or a
 * type alias). */
function otherDeclarations(source: ts.SourceFile, name: string, kind: (node: ts.Node) => boolean): number {
  return source.statements.filter(
    statement => !kind(statement) && (ts.isInterfaceDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) && statement.name?.text === name,
  ).length;
}
/** A member's name as written: an identifier, a string or numeric literal, or a computed name holding a string, numeric or
 * no-substitution template literal; undefined for any other name (a private name, a bigint literal, another computed name). */
function memberName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && (ts.isStringLiteral(name.expression) || ts.isNumericLiteral(name.expression) || ts.isNoSubstitutionTemplateLiteral(name.expression))) return name.expression.text;
  return undefined;
}

/** One draw option the drawer module declares: its name, whether it is optional, its declared type as spelled (empty when none is
 * written), and the interface that declares it. */
export interface SizeMember {
  readonly name: string;
  readonly optional: boolean;
  readonly type: string;
  readonly from: string;
}
/** The forms sizeMembers reads. */
export const SIZE_FORMS: readonly ReaderForm[] = [
  { id: "merged", lead: "every member of every top-level interface InspectorSize declaration of the module", examples: ["one declaration", "merged declarations"] },
  {
    id: "names",
    lead: "a member named by an identifier, a string or numeric literal, or a computed name holding a string, numeric or no-substitution template literal",
    examples: ["an identifier", "a string", "a number", "a computed string", "a computed number", "a computed template literal"],
  },
  {
    id: "heritage",
    lead: "every member of every interface an extends clause names by a bare name the module declares at top level, recursively",
    examples: ["an extended interface", "an interface an extended one extends", "two interfaces one clause names", "a merged extended interface", "one interface two paths reach"],
  },
  {
    id: "fields",
    lead: "each member's name, whether it is optional, its type as spelled and the interface that declares it",
    examples: ["a member of InspectorSize", "a member an extended interface declares", "a member with no type written"],
  },
];
/** The forms sizeMembers fails closed on. */
export const SIZE_UNREAD_FORMS: readonly ReaderForm[] = [
  { id: "member-kind", lead: "a member that is no property signature", examples: ["a method", "an index signature", "a call signature", "a construct signature", "a get accessor", "a set accessor"] },
  { id: "member-name", lead: "any other member name", examples: ["a private name", "a bigint literal", "another computed name"] },
  { id: "type-parameters", lead: "an interface it reads that declares type parameters", examples: ["InspectorSize", "an extended interface"] },
  { id: "heritage-other", lead: "an extends clause naming anything else", examples: ["a type alias", "type arguments on a declared interface", "type arguments on an undeclared name", "a qualified name", "an undeclared name"] },
  { id: "circular", lead: "an extends clause that leads back to an interface on its own path", examples: ["back to InspectorSize", "between two other interfaces"] },
  { id: "redeclared", lead: "a member name two of the declarations it reads both declare", examples: ["an override in InspectorSize", "a member two merged declarations repeat"] },
  {
    id: "declaration",
    lead: "InspectorSize declared nowhere at top level as an interface, or beside one as a type alias, a class or an enum",
    examples: ["no declaration", "a type alias alone", "a class alone", "an interface beside a class", "an interface beside a type alias", "an interface beside an enum"],
  },
];
/** The draw-option claim (Q25), composed from SIZE_FORMS and SIZE_UNREAD_FORMS. */
export const SIZE_CLAIM = `sizeMembers reads the drawer module's draw options: ${listed(SIZE_FORMS)}. It fails closed on ${listed(SIZE_UNREAD_FORMS)}.`;
/** The draw options of the drawer module's `interface InspectorSize`, by name, read by the TypeScript AST. */
export function sizeMembers(text: string, path = "module.ts"): ModuleReading<SizeMember> {
  const source = parse(path, text);
  const interfaces = new Map<string, ts.InterfaceDeclaration[]>();
  for (const statement of source.statements) if (ts.isInterfaceDeclaration(statement)) interfaces.set(statement.name.text, [...(interfaces.get(statement.name.text) ?? []), statement]);
  const declared = interfaces.get("InspectorSize")?.length ?? 0;
  const otherwise = otherDeclarations(source, "InspectorSize", ts.isInterfaceDeclaration);
  if (declared === 0 || otherwise > 0) return { members: [], unread: [`InspectorSize: declared ${declared} times as a top-level interface and ${otherwise} times otherwise`] };
  const members: SizeMember[] = [];
  const unread: string[] = [];
  const read = new Set<string>();
  const readInterface = (name: string, via: readonly string[]): void => {
    if (read.has(name)) return;
    read.add(name);
    for (const declaration of interfaces.get(name) ?? []) {
      if (declaration.typeParameters !== undefined) unread.push(`${name}: type parameters`);
      for (const type of (declaration.heritageClauses ?? []).flatMap(clause => clause.types)) {
        const base = ts.isIdentifier(type.expression) && type.typeArguments === undefined ? type.expression.text : undefined;
        if (base !== undefined && via.includes(base)) unread.push(`${name} extends ${base}: an extends clause that leads back to an interface on its own path`);
        else if (base !== undefined && interfaces.has(base)) readInterface(base, [...via, base]);
        else unread.push(`${name} extends ${type.getText(source)}: no interface the module declares at top level`);
      }
      for (const member of declaration.members) {
        const spelled = member.name === undefined ? undefined : memberName(member.name);
        if (!ts.isPropertySignature(member)) unread.push(`${name}: a ${ts.SyntaxKind[member.kind]}`);
        else if (spelled === undefined) unread.push(`${name}: the member name ${member.name.getText(source)}`);
        else if (members.some(found => found.name === spelled)) unread.push(`${name}: the member ${spelled}, declared before`);
        else members.push({ name: spelled, optional: member.questionToken !== undefined, type: member.type?.getText(source) ?? "", from: name });
      }
    }
  };
  readInterface("InspectorSize", ["InspectorSize"]);
  return { members: [...members].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)), unread };
}

// --------------------------------------------------------------------------------------- R13 / D1-F3: every declared tier
/** docs/10's title: the one parent heading docsSection binds "## Layout responsiveness" under. */
export const DOCS10_TITLE = `10 ${String.fromCodePoint(0x2014)} Terminal-native rich workflow inspector, interaction and performance`;
/** One band of docs/10's "Layout responsiveness": its item's rendered text, the lowest column count it states (`from`), and the
 * bounds it states below (`columnsBelow`, `rowsBelow`: a band written "<80 columns or <20 rows"). */
export interface LayoutBand {
  readonly text: string;
  readonly from: number | undefined;
  readonly columnsBelow: number | undefined;
  readonly rowsBelow: number | undefined;
}
/** The forms layoutBands reads. */
export const LAYOUT_FORMS: readonly ReaderForm[] = [
  {
    id: "binding",
    lead: "the section docsSection (test/helpers/census.ts) binds as docs/10's '## Layout responsiveness' under its title: that heading rendered exactly once, the section running to the next level-1 or level-2 heading or the end",
    examples: ["the real section", "a level-1 heading after its list"],
  },
  { id: "lists", lead: "each item of each list in the section, by its rendered text, whatever the list's marker", examples: ["a - item", "a * item", "a + item", "a 1. item", "a 1) item"] },
  {
    id: "bands",
    lead: "as a band, an item whose rendered text opens with one of these leads, N and M whole numbers from 1 written without a leading zero, then ': ' and a description holding no digit",
    examples: ["<N columns or <M rows", "<N columns", "N to M with an en dash and N at most M", ">=N", "a lead in bold"],
  },
  { id: "prose", lead: "as prose and no band, an item whose rendered text holds no digit", examples: ["the resize item alone", "a note with a colon"] },
];
/** The forms layoutBands fails closed on. */
export const LAYOUT_UNREAD_FORMS: readonly ReaderForm[] = [
  { id: "refused", lead: "a section docsSection refuses", examples: ["a missing heading", "a heading rendered twice", "the heading under another parent", "a code fence hiding a heading line"] },
  { id: "html", lead: "a section that carries HTML", examples: ["a comment", "a tag"] },
  { id: "block", lead: "a block in the section that is no list", examples: ["a paragraph", "a code block", "a heading", "a blockquote", "a table"] },
  {
    id: "item",
    lead: "an item holding a digit outside a lead it reads",
    examples: ["a lead it cannot read", "a range from more to less", "a zero", "a leading zero", "a greater-than-or-equal sign", "a greater-than sign that opens a quote", "a band nested under another band", "a digit in a band's description", "no space after the colon"],
  },
];
/** The bands claim (R13, D1-F3), composed from LAYOUT_FORMS and LAYOUT_UNREAD_FORMS. */
export const LAYOUT_CLAIM = `layoutBands reads the bands of ${listed(LAYOUT_FORMS)}. It fails closed on ${listed(LAYOUT_UNREAD_FORMS)}.`;
const COUNT = "([1-9]\\d*)";
const BELOW = new RegExp(`^<${COUNT} columns(?: or <${COUNT} rows)?$`);
const RANGE = new RegExp(`^${COUNT}${String.fromCodePoint(0x2013)}${COUNT}$`);
const FROM = new RegExp(`^>=${COUNT}$`);
/** An item's band, when its rendered text is one. */
function bandOf(text: string): LayoutBand | undefined {
  const colon = text.indexOf(": ");
  if (colon < 0 || /\d/.test(text.slice(colon + 2))) return undefined;
  const lead = text.slice(0, colon);
  const below = BELOW.exec(lead);
  if (below !== null) return { text, from: undefined, columnsBelow: Number(below[1]), rowsBelow: below[2] === undefined ? undefined : Number(below[2]) };
  const range = RANGE.exec(lead);
  if (range !== null && Number(range[1]) <= Number(range[2])) return { text, from: Number(range[1]), columnsBelow: undefined, rowsBelow: undefined };
  const from = FROM.exec(lead);
  if (from !== null) return { text, from: Number(from[1]), columnsBelow: undefined, rowsBelow: undefined };
  return undefined;
}
/** The bands of docs/10's "## Layout responsiveness" section, read through the rendered docs binding. */
export function layoutBands(doc: string): ModuleReading<LayoutBand> {
  const section = docsSection(doc, "Layout responsiveness", 2, [DOCS10_TITLE]);
  if (!section.ok) return { members: [], unread: [`docs/10: ${section.why}`] };
  if (section.hasHtml) return { members: [], unread: ["docs/10: the section carries HTML"] };
  const bands: LayoutBand[] = [];
  const unread: string[] = [];
  for (const block of section.blocks) {
    if (block.kind !== "list") {
      unread.push(`docs/10: a ${block.kind === "other" ? block.type : block.kind} block in the section`);
      continue;
    }
    for (const item of block.items) {
      const band = bandOf(item.text);
      if (band !== undefined) bands.push(band);
      else if (/\d/.test(item.text)) unread.push(`docs/10: "${item.text.split(": ")[0] ?? ""}" holds a digit outside a band lead the reader reads`);
    }
  }
  return { members: bands, unread };
}
/** One tier draw: an id naming its size and every option given, and the size it is drawn at. */
export interface TierDraw {
  readonly id: string;
  readonly size: InspectorSize;
}
/** The forms tierDraws draws. */
export const TIER_FORMS: readonly ReaderForm[] = [
  { id: "default", lead: "the default tier, no draw option given", examples: ["at 120x40", "at every width and row count"] },
  {
    id: "options",
    lead: "each draw option sizeMembers reads that is optional with its type spelled boolean, absent, false and true, in every combination",
    examples: ["the real ascii and panes", "a third option"],
  },
  {
    id: "widths",
    lead: "each combination at one width inside every band layoutBands reads, the band's lowest stated column count or one below the column bound it states, in band order",
    examples: ["the real three bands", "a fourth band", "a band listed first", "two bands sharing a width"],
  },
  { id: "rows", lead: "each width at the census's row count and at one below every row bound a band states, ascending", examples: ["the real row bound", "no row bound", "a row bound at the census's row count"] },
  {
    id: "ids",
    lead: "each draw named <width>x<rows>, then per option in name order -<option> for false or +<option> for true, the first option varying fastest",
    examples: ["the real 54 draws"],
  },
];
/** The forms tierDraws fails closed on. */
export const TIER_UNREAD_FORMS: readonly ReaderForm[] = [
  {
    id: "option-kind",
    lead: "a draw option that is neither optional with its type spelled boolean nor required with its type spelled number and named width or rows",
    examples: ["a union type", "a required number of another name", "a required boolean", "a width spelled string", "an optional width", "an optional rows", "a boolean spelled with undefined"],
  },
  { id: "required", lead: "a module that declares no width or no rows draw option", examples: ["no width", "no rows"] },
  { id: "unread-input", lead: "anything sizeMembers or layoutBands leave unread", examples: ["a method member", "a band lead it cannot read", "a refused section"] },
  { id: "no-band", lead: "no band at all", examples: ["a section with no band item"] },
];
/** The tier claim (R13, D1-F3), composed from TIER_FORMS and TIER_UNREAD_FORMS. */
export const TIER_CLAIM = `tierDraws draws every declared tier of the inspector: ${listed(TIER_FORMS)}. It fails closed on ${listed(TIER_UNREAD_FORMS)}.`;
/** The draws that cover every declared tier; none when anything is unread. A draw's id is `<width>x<rows>`, then per option in
 * name order nothing (absent), `-<option>` (false) or `+<option>` (true); widths in band order, rows ascending, options' states in
 * that order (the first option varying fastest). */
export function tierDraws(size: ModuleReading<SizeMember>, bands: ModuleReading<LayoutBand>, rows: number): ModuleReading<TierDraw> {
  const unread = [...size.unread, ...bands.unread];
  const options: string[] = [];
  for (const member of size.members) {
    if (!member.optional && member.type === "number" && (member.name === "width" || member.name === "rows")) continue;
    if (member.optional && member.type === "boolean") options.push(member.name);
    else unread.push(`${member.name}: a draw option that is neither an optional boolean nor a required number named width or rows`);
  }
  for (const required of ["width", "rows"]) if (!size.members.some(member => member.name === required)) unread.push(`${required}: no draw option the module declares`);
  if (bands.members.length === 0) unread.push("docs/10: no band");
  if (unread.length > 0) return { members: [], unread };
  const widths = [...new Set(bands.members.map(band => band.from ?? (band.columnsBelow ?? 1) - 1))];
  const heights = [...new Set([rows, ...bands.members.flatMap(band => (band.rowsBelow === undefined ? [] : [band.rowsBelow - 1]))])].sort((a, b) => a - b);
  const sorted = [...options].sort();
  const draws: TierDraw[] = [];
  for (const width of widths) {
    for (const height of heights) {
      for (let code = 0; code < 3 ** sorted.length; code++) {
        const drawn: InspectorSize = { width, rows: height };
        let id = `${width}x${height}`;
        sorted.forEach((option, at) => {
          const state = Math.floor(code / 3 ** at) % 3;
          if (state === 0) return;
          Object.assign(drawn, { [option]: state === 2 });
          id += `${state === 2 ? "+" : "-"}${option}`;
        });
        draws.push({ id, size: drawn });
      }
    }
  }
  return { members: draws, unread: [] };
}
