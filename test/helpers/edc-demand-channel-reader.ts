/**
 * wb-pyel.8 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R2, program-triage-2026-10-18 child of wb-pyel; the rule-19 structural exit of
 * wb-pyel.2 under orchestrator rulings R-B122 and R-B156): the EDC demand-channel census's B1 reader at full surface - the demand
 * reading of one text, SENTENCES, LIVE QUIET's holding and the code reader with its as-written readings - which wb-pyel.2's census
 * (test/workbench-edc-demand-channel-census.test.ts, not yet landed) composes when it re-cuts. Its census is
 * test/workbench-edc-demand-channel-reader-census.test.ts: it claims COMMENTS (how bare() reads a comment's trivia run), the
 * as-written readings bare() takes, the cuts SENTENCES makes in them and LIVE QUIET's parted-carrier holding, each held to a planted
 * falsifier. The other readings here (WORDS, the demand reading of one sentence, CONSTANT, LEXEME, MEMBER and IMPORT) are wb-pyel.2
 * cut #5's (046a34d9), their code byte for byte but for the export keywords (the consumer's stem readers and the root predicates
 * stay in that census); they are claimed and pinned by the composing census, not by that one.
 */
import ts from "typescript";

export type Via = "lexeme" | "access" | "member" | "import";
export type FamilyId = "demand" | "precision" | "carrier";
export interface Vocabulary {
  readonly subject: readonly string[];
  readonly families: { readonly demand: readonly string[]; readonly precision: readonly string[] };
  readonly carrier: readonly (readonly [string, string])[];
  readonly markers: readonly string[];
  readonly stems: { readonly word: readonly string[]; readonly joined: readonly string[] };
}
/** The demand reading's vocabulary, wb-pyel.2 cut #5's byte for byte (that census holds its own copy to its roster): the subject,
 * the two families, the carrier pairs, the markers and the consumer's stems. */
export const VOCABULARY: Vocabulary = {
  subject: ["context", "contexts"],
  families: {
    demand: ["demand", "demands", "demanded", "demanding"],
    precision: ["precision", "precise", "precisely", "imprecise", "imprecisely", "imprecision"],
  },
  carrier: [
    ["projection", "requirement"],
    ["projection", "requirements"],
  ],
  markers: ["not", "no", "never", "nor", "neither", "without", "cannot", "none", "nothing"],
  stems: { word: ["edc", "edcs"], joined: ["evidencedirected"] },
};

// ---------------------------------------------------------------------------------------------------------------- the reader
const SUBJECT = new Set(VOCABULARY.subject);
const DEMAND = new Set(VOCABULARY.families.demand);
const PRECISION = new Set(VOCABULARY.families.precision);
const MARKERS = new Set(VOCABULARY.markers);
/** Every vocabulary word: the subject, both families, the carrier pairs' words and the markers, in vocabulary order. */
export const VOCABULARY_WORDS: readonly string[] = [...VOCABULARY.subject, ...VOCABULARY.families.demand, ...VOCABULARY.families.precision, ...VOCABULARY.carrier.flat(), ...VOCABULARY.markers];
const CONTRACTION = /n['\u2019]t(?![a-z0-9])/;
/** NFKC with format controls and combining marks removed (a zero-width space never splits a word; fullwidth letters fold). */
export function normal(text: string): string {
  return text.normalize("NFKC").replace(/[\p{Cf}\p{Mn}\p{Me}]/gu, "");
}
/** The words of a text: an acronym's plural s split, a break at each case change and before an acronym's last capital. */
export function words(text: string): string[] {
  return normal(text)
    .replace(/([A-Z]{2,})s(?![a-z])/g, "$1 s")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
const hasPair = (tokens: readonly string[], pairs: readonly (readonly [string, string])[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
export interface Reading {
  readonly kind: "finding" | "marker" | "subjectless" | "none";
  readonly families: readonly FamilyId[];
  readonly reason: string;
}
/** One sentence: none, subjectless (a family word with no subject), quiet by a marker, or a finding naming its families. */
export function readSentence(text: string): Reading {
  const tokens = words(text);
  const families: FamilyId[] = [];
  if (tokens.some(word => DEMAND.has(word))) families.push("demand");
  if (tokens.some(word => PRECISION.has(word))) families.push("precision");
  if (hasPair(tokens, VOCABULARY.carrier)) families.push("carrier");
  if (families.length === 0) return { kind: "none", families: [], reason: "" };
  const named = families.includes("carrier") || tokens.some(word => SUBJECT.has(word));
  if (!named) return { kind: "subjectless", families, reason: families.join("+") };
  const marker = tokens.find(word => MARKERS.has(word)) ?? (CONTRACTION.test(normal(text).toLowerCase()) ? "n't" : undefined);
  if (marker !== undefined) return { kind: "marker", families, reason: marker };
  return { kind: "finding", families, reason: families.join("+") };
}
/** The verdict on one sentence: null (quiet) or its families joined by "+". */
export function verdict(text: string): string | null {
  const reading = readSentence(text);
  return reading.kind === "finding" ? reading.reason : null;
}

// ------------------------------------------------------------------------------------------------------------- the sentences
export const TABLE_ROW = /^\s*\|/;
export const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
export const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
export const TERMINATOR = /[.!?;](?=\s|$)/g;
export function sentences(text: string): { readonly line: number; readonly text: string }[] {
  const out: { line: number; text: string }[] = [];
  let buffer = "";
  let start = 0;
  const flush = (): void => {
    if (buffer !== "") out.push({ line: start, text: buffer });
    buffer = "";
  };
  const append = (piece: string, line: number): void => {
    const trimmed = piece.trim();
    if (trimmed === "") return;
    if (buffer === "") start = line;
    buffer = buffer === "" ? trimmed : `${buffer} ${trimmed}`;
  };
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = index + 1;
    if (raw.trim() === "") {
      flush();
      continue;
    }
    const whole = TABLE_ROW.test(raw) || HEADING.test(raw);
    if (whole || LIST_ITEM.test(raw)) flush();
    let from = 0;
    for (const match of raw.matchAll(TERMINATOR)) {
      const at = (match.index ?? 0) + 1;
      append(raw.slice(from, at), line);
      flush();
      from = at;
    }
    append(raw.slice(from), line);
    if (whole) flush();
  }
  flush();
  return out;
}
/** The vocabulary words that make a reading, in order: each family word and each carrier pair a text spells. */
export function familyWords(text: string): string[] {
  const tokens = words(text);
  return tokens.flatMap((word, index) => {
    if (DEMAND.has(word) || PRECISION.has(word)) return [word];
    const pair = VOCABULARY.carrier.find(([first, second]) => word === first && tokens[index + 1] === second);
    return pair === undefined ? [] : [pair.join(" ")];
  });
}
/** The carrier pairs a text's words spell, in order, each as its two words. */
export function carrierPairs(text: string): string[] {
  const tokens = words(text);
  return tokens.flatMap((word, index) => VOCABULARY.carrier.filter(([first, second]) => word === first && tokens[index + 1] === second).map(pair => pair.join(" ")));
}
/** CUT: the carrier pairs whose two words a sentence cut parts - each pair of the text that no one sentence of it spells. */
export function partedPairs(text: string): string[] {
  const pairs = carrierPairs(text);
  if (pairs.length === 0) return [];
  const within = sentences(text).flatMap(sentence => carrierPairs(sentence.text));
  return pairs.filter(pair => {
    const at = within.indexOf(pair);
    if (at === -1) return true;
    within.splice(at, 1);
    return false;
  });
}
/** LIVE QUIET: every quiet reading of one text, each occurrence, lines dropped: `<where> <kind>:<reason> <its family words>`; and
 * every carrier pair a cut parts: `<where> parted:carrier <pair>` (CUT). */
export function quietOf(where: string, text: string): string[] {
  const quiet = sentences(text).flatMap(sentence => {
    const reading = readSentence(sentence.text);
    return reading.kind === "subjectless" || reading.kind === "marker" ? [`${where} ${reading.kind}:${reading.reason} ${familyWords(sentence.text).join(" ")}`] : [];
  });
  return [...quiet, ...partedPairs(text).map(pair => `${where} parted:carrier ${pair}`)];
}
/** Every finding and every quieted reading of one text, each as `<where>:<sentence line> <reason>`. */
export function textReadings(where: string, text: string): { readonly findings: string[]; readonly quieted: string[] } {
  const findings: string[] = [];
  const quieted: string[] = [];
  for (const sentence of sentences(text)) {
    const reading = readSentence(sentence.text);
    if (reading.kind === "finding") findings.push(`${where}:${sentence.line} ${reading.reason}`);
    else if (reading.kind !== "none") quieted.push(`${where}:${sentence.line} ${reading.kind}:${reading.reason}`);
  }
  return { findings, quieted };
}

// -------------------------------------------------------------------------------------------------------------- the code reader
export interface Site {
  readonly line: number;
  readonly via: Via;
  readonly text: string;
}
/** An expression without the wrappers that keep its value, at any depth: parentheses, as, satisfies, a non-null "!" and a "<T>"
 * assertion (CONSTANT). */
function unwrapped(node: ts.Node): ts.Node {
  return ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node) ? unwrapped(node.expression) : node;
}
/** CONSTANT: a string literal or no-substitution template, a + concatenation or template expression whose every part is a
 * constant, each read through its value-keeping wrappers; undefined for anything else. */
function constant(node: ts.Node): string | undefined {
  const value = unwrapped(node);
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constant(value.left);
    const right = constant(value.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(value)) {
    let text = value.head.text;
    for (const span of value.templateSpans) {
      const part = constant(span.expression);
      if (part === undefined) return undefined;
      text += part + span.literal.text;
    }
    return text;
  }
  return undefined;
}
/** A template or concatenation as it is spelled: its literal parts in order, each non-constant part read as one space (each part
 * read through its value-keeping wrappers). */
function spelled(node: ts.Node): string {
  const value = constant(node);
  if (value !== undefined) return value;
  const inner = unwrapped(node);
  if (ts.isBinaryExpression(inner) && inner.operatorToken.kind === ts.SyntaxKind.PlusToken) return spelled(inner.left) + spelled(inner.right);
  if (ts.isTemplateExpression(inner)) return inner.head.text + inner.templateSpans.map(span => spelled(span.expression) + span.literal.text).join("");
  return " ";
}
/** A node's tokens in order (a JSDoc comment is trivia, never a token). */
function tokensOf(node: ts.Node, source: ts.SourceFile): ts.Node[] {
  const children = node.getChildren(source).filter(child => !ts.isJSDoc(child));
  return children.length === 0 ? [node] : children.flatMap(child => tokensOf(child, source));
}
/** A token text that ends in a sentence terminator: the ".", "?.", "!", "?", "??", ";" and "..." punctuators and a number written
 * with a trailing ".", where one space would end a sentence (SENTENCES' TERMINATOR). */
export const ENDS_IN_TERMINATOR = /[.!?;]$/;
/** A node as written (COMMENTS: a comment is no prompt): its tokens' own text in order, the trivia between two tokens kept as
 * written when it is white space alone. A trivia run that holds a comment (a line, block or JSDoc comment) is read whole - its
 * white space, line ends, blank and white-space-only lines with it - as one space, or as nothing right after a token whose text
 * ends in a terminator: so no comment, and no line boundary in a comment's run, cuts the reading. */
export function bare(node: ts.Node, source: ts.SourceFile): string {
  const written = node.getText(source);
  if (!written.includes("//") && !written.includes("/*")) return written;
  let text = "";
  let end: number | undefined;
  for (const token of tokensOf(node, source)) {
    const start = token.getStart(source);
    if (end !== undefined) {
      const trivia = source.text.slice(end, start);
      if (/^\s*$/.test(trivia)) text += trivia;
      else if (!ENDS_IN_TERMINATOR.test(text)) text += " ";
    }
    text += source.text.slice(start, token.getEnd());
    end = token.getEnd();
  }
  return text;
}
/** An indexed access type's index as its constant: a literal type, parenthesized or not; undefined for any other index type. */
function literalIndex(type: ts.TypeNode): string | undefined {
  if (ts.isParenthesizedTypeNode(type)) return literalIndex(type.type);
  return ts.isLiteralTypeNode(type) ? constant(type.literal) : undefined;
}
/** The declarations whose own name a member path joins (with a constructor parameter property, see nameOf). */
const NAMED_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.ClassExpression,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.EnumMember,
  ts.SyntaxKind.ModuleDeclaration,
]);
/** The member kinds of an object literal, a class, an interface or type literal and an enum. */
const MEMBER_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.EnumMember,
]);
/** The declaration kinds a namespace or module body holds as members. */
const NAMESPACE_MEMBER_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.ModuleDeclaration,
]);
/** A constructor parameter property (readonly, public, private, protected or override): a class member declared as a parameter. */
const isParameterProperty = (node: ts.Node): node is ts.ParameterDeclaration => ts.isParameter(node) && ts.isParameterPropertyDeclaration(node, node.parent);
/** A declaration directly in a namespace or module body: a variable named by an identifier whose statement sits in the body, or
 * a function, class, interface, type alias, enum or namespace in the body (a dotted namespace's inner name in its outer one). */
function inNamespaceBody(node: ts.Node): boolean {
  if (!NAMESPACE_MEMBER_KINDS.has(node.kind)) return false;
  if (ts.isVariableDeclaration(node)) {
    const statement = node.parent.parent;
    return ts.isIdentifier(node.name) && ts.isVariableStatement(statement) && ts.isModuleBlock(statement.parent);
  }
  return ts.isModuleBlock(node.parent) || ts.isModuleDeclaration(node.parent);
}
const isMember = (node: ts.Node): boolean => MEMBER_KINDS.has(node.kind) || isParameterProperty(node) || inNamespaceBody(node);
/** A name or key as text: an identifier, private name, string or number; a computed name's constant; undefined otherwise. */
function keyText(key: ts.Node): string | undefined {
  if (ts.isIdentifier(key) || ts.isPrivateIdentifier(key) || ts.isStringLiteralLike(key) || ts.isNumericLiteral(key)) return key.text;
  if (ts.isComputedPropertyName(key)) return constant(key.expression);
  return undefined;
}
function nameOf(node: ts.Node): string | undefined {
  if (!NAMED_KINDS.has(node.kind) && !isParameterProperty(node)) return undefined;
  const name = (node as ts.NamedDeclaration).name;
  return name === undefined ? undefined : keyText(name);
}
/** The receiver a binding pattern destructures: its declaration's initializer, else the iterated expression of the for-of or
 * for-in that declares it; its parameter's type annotation, else its default value; in a nested pattern, the enclosing element's
 * path, each as written (COMMENTS). undefined when there is none (an untyped parameter without a default value, a catch binding, an
 * ambient declaration's binding): R-UNREAD-FORM. */
function receiverOf(pattern: ts.BindingPattern, source: ts.SourceFile): string | undefined {
  const holder = pattern.parent;
  if (ts.isBindingElement(holder)) return elementPath(holder, source);
  if (ts.isParameter(holder)) {
    const receiver = holder.type ?? holder.initializer;
    return receiver === undefined ? undefined : bare(receiver, source);
  }
  if (!ts.isVariableDeclaration(holder)) return undefined;
  if (holder.initializer !== undefined) return bare(holder.initializer, source);
  const statement = holder.parent.parent;
  return ts.isForOfStatement(statement) || ts.isForInStatement(statement) ? bare(statement.expression, source) : undefined;
}
/** A binding element's path: its pattern's receiver joined with its key (an object pattern) or its index (an array pattern). */
function elementPath(element: ts.BindingElement, source: ts.SourceFile): string | undefined {
  const pattern = element.parent;
  const receiver = receiverOf(pattern, source);
  if (receiver === undefined) return undefined;
  const key = ts.isObjectBindingPattern(pattern) ? keyText(element.propertyName ?? element.name) : String(pattern.elements.indexOf(element));
  return `${receiver}.${key ?? "?"}`;
}
/** The keys of a destructuring assignment target after its receiver: each object literal property or shorthand as receiver.key
 * (a nested target deeper, an array literal's elements by index, a rest element's target at its place - an array literal's at its
 * index, an object literal's at the receiver, its name as the key when it is a name - and a target's default value skipped). */
function assignmentPaths(target: ts.Expression, receiver: string): { readonly node: ts.Node; readonly path: string }[] {
  if (ts.isParenthesizedExpression(target)) return assignmentPaths(target.expression, receiver);
  if (ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.EqualsToken) return assignmentPaths(target.left, receiver);
  if (ts.isSpreadElement(target)) return assignmentPaths(target.expression, receiver);
  if (ts.isArrayLiteralExpression(target)) return target.elements.flatMap((element, index) => assignmentPaths(element, `${receiver}.${index}`));
  if (!ts.isObjectLiteralExpression(target)) return [];
  return target.properties.flatMap(property => {
    if (ts.isSpreadAssignment(property)) return ts.isIdentifier(property.expression) ? [{ node: property, path: `${receiver}.${property.expression.text}` }] : assignmentPaths(property.expression, receiver);
    if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) return [];
    const path = `${receiver}.${keyText(property.name) ?? "?"}`;
    return [{ node: property, path }, ...(ts.isPropertyAssignment(property) ? assignmentPaths(property.initializer, path) : [])];
  });
}
const isLiteralTarget = (node: ts.Node | undefined): node is ts.ObjectLiteralExpression | ts.ArrayLiteralExpression => node !== undefined && (ts.isObjectLiteralExpression(node) || ts.isArrayLiteralExpression(node));
/** The parse kind of a module: TSX for .tsx, JSX for .jsx, TS for the other TS extensions, JS (which parses JSX) otherwise. */
export function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return /\.(?:ts|mts|cts)$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS;
}
/** Every code reading of one module (never a comment: every as-written text through bare): lexemes, accesses, member paths and
 * imports, each with its line - exactly the forms the header's B1 paragraph claims, each pinned by its FORMS row. */
export function codeSites(path: string, text: string): Site[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const sites: Site[] = [];
  const lineOf = (position: number): number => source.getLineAndCharacterOfPosition(position).line + 1;
  const visit = (node: ts.Node): void => {
    const at = (): number => lineOf(node.getStart(source));
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isJsxText(node)) {
      if (!node.containsOnlyTriviaWhiteSpaces) sites.push({ line: at(), via: "lexeme", text: node.text });
    } else if (ts.isTemplateLiteralTypeNode(node)) sites.push({ line: at(), via: "lexeme", text: node.head.text + node.templateSpans.map(span => ` ${span.literal.text}`).join("") });
    else if (ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
      const value = spelled(node);
      if (value.trim() !== "") sites.push({ line: at(), via: "lexeme", text: value });
    } else if (ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node)) sites.push({ line: at(), via: "access", text: bare(node, source) });
    else if (ts.isElementAccessExpression(node)) sites.push({ line: at(), via: "access", text: `${bare(node.expression, source)}.${constant(node.argumentExpression) ?? "?"}` });
    else if (ts.isIndexedAccessTypeNode(node)) sites.push({ line: at(), via: "access", text: `${bare(node.objectType, source)}.${literalIndex(node.indexType) ?? "?"}` });
    else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const elementAt = elementPath(node, source);
      if (elementAt !== undefined) sites.push({ line: at(), via: "access", text: elementAt });
    } else if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      const from = node.moduleSpecifier.text;
      const names: string[] = [];
      const specifier = (element: ts.ImportSpecifier | ts.ExportSpecifier): void => {
        if (element.propertyName !== undefined) names.push(element.propertyName.text);
        names.push(element.name.text);
      };
      if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (clause?.name !== undefined) names.push(clause.name.text);
        const bindings = clause?.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) specifier(element);
      } else if (node.exportClause !== undefined && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) specifier(element);
      } else if (node.exportClause !== undefined && ts.isNamespaceExport(node.exportClause)) names.push(node.exportClause.name.text);
      for (const name of names) sites.push({ line: at(), via: "import", text: `${from}.${name}` });
    } else if (ts.isImportEqualsDeclaration(node)) {
      const reference = node.moduleReference;
      const from = ts.isExternalModuleReference(reference) && ts.isStringLiteralLike(reference.expression) ? reference.expression.text : bare(reference, source);
      sites.push({ line: at(), via: "import", text: `${from}.${node.name.text}` });
    }
    const assigned = ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && isLiteralTarget(node.left) ? { target: node.left, receiver: node.right } : (ts.isForOfStatement(node) || ts.isForInStatement(node)) && isLiteralTarget(node.initializer) ? { target: node.initializer, receiver: node.expression } : undefined;
    if (assigned !== undefined) for (const key of assignmentPaths(assigned.target, bare(assigned.receiver, source))) sites.push({ line: lineOf(key.node.getStart(source)), via: "access", text: key.path });
    if (isMember(node)) {
      const own = nameOf(node);
      const path: string[] = [];
      for (let parent: ts.Node | undefined = node.parent; parent !== undefined; parent = parent.parent) {
        const name = nameOf(parent);
        if (name !== undefined) path.unshift(name);
      }
      if (own !== undefined && path.length > 0) sites.push({ line: at(), via: "member", text: [...path, own].join(".") });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
export interface Survey {
  readonly code: string[];
  readonly pages: string[];
  readonly findings: string[];
  readonly quieted: string[];
  /** Every quiet reading, each occurrence, lines dropped (quietOf), in name order. */
  readonly quiet: string[];
  readonly readings: number;
}
export const isModule = (path: string): boolean => /\.(?:ts|tsx|mts|cts|js|mjs|cjs|jsx)$/.test(path);
/** One pass over (path, text) pairs: code modules by the code reader, pages by the sentence reader. */
export function survey(texts: readonly (readonly [string, string])[]): Survey {
  const code: string[] = [];
  const pages: string[] = [];
  const findings: string[] = [];
  const quieted: string[] = [];
  const quiet: string[] = [];
  let readings = 0;
  for (const [path, text] of texts) {
    if (isModule(path)) {
      code.push(path);
      for (const site of codeSites(path, text)) {
        readings += 1;
        const one = textReadings(`${path}:${site.line} ${site.via}`, site.text);
        findings.push(...one.findings);
        quieted.push(...one.quieted);
        quiet.push(...quietOf(`${path} ${site.via}`, site.text));
      }
    } else {
      pages.push(path);
      const one = textReadings(path, text);
      readings += sentences(text).length;
      findings.push(...one.findings);
      quieted.push(...one.quieted);
      quiet.push(...quietOf(path, text));
    }
  }
  return { code, pages, findings: [...new Set(findings)], quieted: [...new Set(quieted)], quiet: quiet.sort(byName), readings };
}
export const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
