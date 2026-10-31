/**
 * wb-km7q.10 (SDK-DETERMINISTIC-REPLAY-R1; the rule-19 structural-exit child of wb-km7q.3, orchestrator rulings R-B110 and
 * R-B143): the full-surface readers of wb-km7q.3's query-evidence census, shared so its re-cut takes them in place of its own
 * notPlain, stringsOf, declaredViews, sizeMembers and DRAW (R-B143: "a mechanical restatement over the landed readers").
 *
 * Every reader's claim is composed from its roster (the forms it reads and the forms it fails closed on, in claim order), so
 * the claim text cannot name a form the roster lacks, and test/workbench-rc-query-evidence-readers-census.test.ts holds one
 * falsifier per roster form. The two AST readers and the tier reader never throw on a form they cannot read: they return it in
 * `unread`, and a census reading them fails closed on a non-empty `unread`.
 */
import ts from "typescript";
import type { InspectorSize } from "../../src/ui/workflow-inspector.js";

/** One form of a reader's roster: its id (a falsifier's key in the census) and its text as the claim lists it. */
export interface ReaderForm {
  readonly id: string;
  readonly text: string;
}
const listed = (forms: readonly ReaderForm[]): string => forms.map(form => form.text).join("; ");

// ------------------------------------------------------------------------------------------------- R14: the plain-data check
/** 2^32 - 1: an own key of an array is an array index only when it is a canonical numeric string whose value is below it. */
export const ARRAY_INDEX_LIMIT = 4_294_967_295;
/** Whether an own key of an array is an array index (ECMAScript: a canonical numeric string below 2^32 - 1). */
export const isArrayIndex = (key: string): boolean => /^(?:0|[1-9]\d*)$/.test(key) && Number(key) < ARRAY_INDEX_LIMIT;
/** The forms notPlain fails closed on, each with the message it returns (`<at>: <message>`, or `<at>.<key>: <message>`). */
export const NOT_PLAIN_FORMS: readonly (ReaderForm & { readonly message: string })[] = [
  { id: "object-prototype", text: "an object that is no array whose prototype is neither Object.prototype nor null (a Map, a Set, a class instance)", message: "no plain object" },
  { id: "array-prototype", text: "an array whose prototype is not Array.prototype (a class-instance array, whatever it inherits)", message: "no plain array" },
  { id: "symbol-key", text: "a symbol key", message: "a symbol key" },
  { id: "array-key", text: "on an array, an own key that is no array index: no canonical numeric string, or one at or above 4294967295 (a name, 01, 4294967295)", message: "a named property on an array" },
  { id: "not-enumerable", text: "a property that is not enumerable", message: "not enumerable" },
  { id: "accessor", text: "an accessor (a getter or a setter)", message: "an accessor" },
  { id: "type", text: "a value of type undefined, function, symbol or bigint", message: "a <type>" },
  { id: "not-finite", text: "a number that is not finite (NaN, an infinity)", message: "a number that is not finite" },
];
/** R14's claim, composed from NOT_PLAIN_FORMS. */
export const R14_CLAIM = `notPlain walks every own string-keyed property of every object and array (an array's length skipped), recursing into their data values at any depth, and fails closed on each of these forms: ${listed(NOT_PLAIN_FORMS)}. Null, strings, finite numbers and booleans pass, and so do plain and null-prototype objects and plain arrays whose properties pass. It reads a value through what reflection reports and only the keys the value lists: a proxy that reports another prototype, or answers or hides a key, is R-UNLISTED's (a residual of wb-km7q.3's census), and a value nested deeper than the stack throws, failing a census, never passing it.`;
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
  { id: "string", text: "a string itself" },
  { id: "element", text: "each own enumerable element of an array (its index keys)" },
  { id: "value", text: "the value of each own enumerable string-keyed property of an object" },
  { id: "key", text: "the name of each own enumerable string-keyed property of an object" },
  { id: "array-key", text: "the name and the value of each own enumerable key of an array that is no array index" },
];
/** READINGS' claim, composed from STRINGS_FORMS. */
export const STRINGS_CLAIM = `stringsOf reads every string a value lists, at any depth: ${listed(STRINGS_FORMS)}. Numbers, booleans, null and every other value read as nothing. Not read: what a value holds other than as an own enumerable string-keyed property or an array element - what it inherits, a Map's or a Set's entries, a symbol-keyed or non-enumerable property, what a proxy answers without listing it (R-UNLISTED, a residual) - and notPlain fails closed on a Map, a Set, a class instance, a class-instance array, a symbol key and a non-enumerable property.`;
/** The strings a value lists, in order. */
export function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value === null || typeof value !== "object") return [];
  const array = Array.isArray(value);
  return Object.keys(value).flatMap(key => [...(array && isArrayIndex(key) ? [] : [key]), ...stringsOf(Reflect.get(value, key))]);
}

// ------------------------------------------------------------------------------------------- the AST readers (src modules)
const parse = (path: string, text: string): ts.SourceFile => ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** What a module reader read: the members, and every form it could not read (a census fails closed on a non-empty `unread`). */
export interface ModuleReading<T> {
  readonly members: readonly T[];
  readonly unread: readonly string[];
}

/** The forms declaredViews reads. */
export const VIEWS_FORMS: readonly ReaderForm[] = [
  { id: "literal", text: "a string-literal member of the union" },
  { id: "alias", text: "a type reference to a type alias the module declares at top level without type parameters, read through its own members" },
  { id: "parenthesized", text: "a member written in parentheses" },
];
/** The forms declaredViews fails closed on. */
export const VIEWS_UNREAD_FORMS: readonly ReaderForm[] = [
  { id: "other-member", text: "any other member (a template literal type, a keyword, another kind of literal, a qualified, generic or undeclared name)" },
  { id: "circular", text: "an alias that leads back to an alias on its own path (a cycle)" },
  { id: "declaration", text: "InspectorView declared other than exactly once as a top-level type alias" },
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
/** A member's name as written: an identifier, a string, numeric or template literal, or a computed name holding one of those
 * literals; undefined for a private name or another computed name. */
function memberName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && (ts.isStringLiteral(name.expression) || ts.isNumericLiteral(name.expression) || ts.isNoSubstitutionTemplateLiteral(name.expression))) return name.expression.text;
  return undefined;
}

/** One draw option the drawer module declares: its name, whether it is optional, its declared type as spelled, and the
 * interface that declares it. */
export interface SizeMember {
  readonly name: string;
  readonly optional: boolean;
  readonly type: string;
  readonly from: string;
}
/** The forms sizeMembers reads. */
export const SIZE_FORMS: readonly ReaderForm[] = [
  { id: "merged", text: "every member of every top-level interface InspectorSize declaration of the module (merged declarations included)" },
  { id: "names", text: "a member named by an identifier or by a string, numeric or no-substitution template literal, written as the name or inside a computed name" },
  { id: "heritage", text: "every member of every interface an extends clause names that the module declares at top level, recursively" },
];
/** The forms sizeMembers fails closed on. */
export const SIZE_UNREAD_FORMS: readonly ReaderForm[] = [
  { id: "member-kind", text: "a member that is no property signature (a method, an index, call or construct signature)" },
  { id: "member-name", text: "any other member name (a private name, another computed name)" },
  { id: "heritage-other", text: "an extends clause naming anything else (a type alias, a type argument, a qualified or undeclared name)" },
  { id: "circular", text: "an extends clause that leads back to an interface on its own path (a cycle)" },
  { id: "declaration", text: "InspectorSize declared other than as top-level interfaces (a type alias, a class) or not at all" },
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
        else if (!members.some(found => found.name === spelled)) members.push({ name: spelled, optional: member.questionToken !== undefined, type: member.type?.getText(source) ?? "", from: name });
      }
    }
  };
  readInterface("InspectorSize", ["InspectorSize"]);
  return { members: [...members].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)), unread };
}

// --------------------------------------------------------------------------------------- R13 / D1-F3: every declared tier
/** One band of docs/10's "Layout responsiveness": its bullet as written, the lowest column count it states (`from`), and the
 * bounds it states below (`columnsBelow`, `rowsBelow`: a band written "<80 columns or <20 rows"). */
export interface LayoutBand {
  readonly text: string;
  readonly from: number | undefined;
  readonly columnsBelow: number | undefined;
  readonly rowsBelow: number | undefined;
}
/** The bands of docs/10's "## Layout responsiveness" section: each bullet that opens with a column range. */
export function layoutBands(doc: string): ModuleReading<LayoutBand> {
  const section = doc.split(/^## /m).find(part => part.startsWith("Layout responsiveness\n"));
  if (section === undefined) return { members: [], unread: ["docs/10 holds no Layout responsiveness section"] };
  const bands: LayoutBand[] = [];
  const unread: string[] = [];
  for (const line of section.split("\n").filter(line => line.startsWith("- "))) {
    const lead = line.slice(2).split(":")[0] ?? "";
    const below = /^<(\d+) columns(?: or <(\d+) rows)?$/.exec(lead);
    const range = /^(\d+)–(\d+)$/.exec(lead) ?? /^>=(\d+)$/.exec(lead);
    if (below !== null) bands.push({ text: line, from: undefined, columnsBelow: Number(below[1]), rowsBelow: below[2] === undefined ? undefined : Number(below[2]) });
    else if (range !== null) bands.push({ text: line, from: Number(range[1]), columnsBelow: undefined, rowsBelow: undefined });
    else if (/^(?:[<>]=?)?\d/.test(lead)) unread.push(`${lead}: a band the reader cannot read`);
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
  { id: "default", text: "the default tier: no draw option given" },
  { id: "options", text: "each optional boolean draw option sizeMembers reads absent, false and true, in every combination (the ASCII tier and the pane tiers among them)" },
  { id: "widths", text: "each combination at a width inside every band of docs/10's Layout responsiveness (the band's lowest stated column count, or one below the column bound it states)" },
  { id: "rows", text: "each width at the census's row count and at one below every row bound a band states" },
];
/** The forms tierDraws fails closed on. */
export const TIER_UNREAD_FORMS: readonly ReaderForm[] = [
  { id: "option-kind", text: "a draw option that is neither an optional boolean nor a required number named width or rows" },
  { id: "unread-input", text: "a draw option or a band its readers could not read, or no band at all" },
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
