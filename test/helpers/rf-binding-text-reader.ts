/**
 * wb-jwc.13 (the rule-19 dependency-inversion child of wb-jwc.10; rulings R-B233 and R-B263): the binding text reader, moved
 * out of wb-jwc.10's FINAL cut #4 so that the sub-form census test/workbench-rf-binding-text-reader-subforms-census.test.ts
 * can pin it on trunk.
 *
 * WHAT MOVED. Every declaration below is the reader of wb-jwc.10's cut #4 (machine/flywheel/wb-jwc.10 tip
 * 7f3f46f9d7bea0f90f78fdd39960246e5c6efeeb, test/helpers/binding-text-reader.ts lines 189-482, BindingKind through once),
 * its code byte for byte. Eleven of its thirteen doc comments are reworded: four named the parent's claim parts
 * (BINDING_FORMS kinds, READING_FORMS properties, BINDING_FORMS const and kinds, BINDING_TEXT_CLAIM), and nine stated
 * readings (exact, registrations, sourceText, rendered, commandWords, Fields, its opaque map, bindingTextReader and once;
 * two of these also named a claim part); each now names what its declaration is and states no reading. The parent's claim parts, its MEMBERS, its census and its roster are not on trunk and are not moved: wb-jwc.10
 * stays parked until this lands, and its later re-cut can import this reader.
 *
 * WHAT IS CLAIMED. This file claims no reading, in its doc comments or elsewhere. The readings of record are
 * the pins of test/workbench-rf-binding-text-reader-subforms-census.test.ts, whose header names its pinned reader set, and
 * test/fixtures/rf-binding-text-reader-subforms-roster.json names each pin's page digest and the forms that page plants. A
 * reading of any page that is no pin there is NOT CLAIMED by this file or by that census.
 */
import ts from "typescript";

/** What a binding that does not resolve is. */
export type BindingKind =
  | "let"
  | "var"
  | "using"
  | "parameter"
  | "catch"
  | "destructuring"
  | "function"
  | "class"
  | "enum"
  | "namespace"
  | "import"
  | "no-initializer"
  | "ambient"
  | "merged"
  | "unbound"
  | "other";

/** What an identifier resolves to: a const and its initializer, or why it does not resolve. */
export type Resolution =
  | { readonly kind: "const"; readonly declaration: ts.VariableDeclaration; readonly initializer: ts.Expression }
  | { readonly kind: BindingKind | "with" | "eval" };

/** One alternative of an expression: an exact text, or an opaque part's label. */
export type Alternative = { readonly text: string } | { readonly opaque: string };

/** An object literal's fields, as fields() returns them. */
export interface Fields {
  readonly values: ReadonlyMap<string, ts.Expression>;
  /** The opaque members fields() records, by field name ("*" is a key of its own). */
  readonly opaque: ReadonlyMap<string, string>;
}

export interface BindingTextReader {
  readonly path: string;
  readonly source: ts.SourceFile;
  resolve(identifier: ts.Identifier): Resolution;
  alternatives(node: ts.Expression): readonly Alternative[];
  /** exact()'s texts, or undefined. */
  exact(node: ts.Expression): readonly string[] | undefined;
  words(node: ts.Expression): readonly string[] | undefined;
  program(node: ts.Expression): string;
  fields(object: ts.ObjectLiteralExpression): Fields;
  registration(object: ts.ObjectLiteralExpression): readonly string[] | undefined;
  /** registrations()'s entries for the module. */
  registrations(): readonly string[];
}

const MAX_COMBINATIONS = 64;
const MAX_DEPTH = 16;
const MAX_SPREADS = 8;

/** A node's source text, after the replacement below. */
export function sourceText(node: ts.Node): string {
  return node.getText().replace(/\s+/g, " ");
}
/** An alternative list, rendered for a census reading. */
export function rendered(alternatives: readonly Alternative[]): string {
  return alternatives.map((alternative) => ("text" in alternative ? JSON.stringify(alternative.text) : `<opaque ${alternative.opaque}>`)).join(" | ");
}
/** A command line's words, as the split, cut and drop below make them. */
export function commandWords(command: string): string[] {
  return command
    .split(/[\s"'`;&|()<>]+/)
    .filter(Boolean)
    .map((word) => (word.split(/[\\/]/).pop() ?? word).replace(/\.(?:exe|cmd)$/i, ""));
}
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isParenthesizedExpression(at) || ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isNonNullExpression(at) || ts.isTypeAssertionExpression(at) || ts.isAwaitExpression(at))
    at = at.expression;
  return at;
}
function isAmbient(node: ts.Node): boolean {
  for (let at: ts.Node | undefined = node; at !== undefined; at = at.parent)
    if (ts.canHaveModifiers(at) && (ts.getModifiers(at) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.DeclareKeyword)) return true;
  return false;
}
function isExported(statement: ts.Node): boolean {
  return ts.canHaveModifiers(statement) && (ts.getModifiers(statement) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}
/** The kind of a single declaration an identifier binds to. */
export function bindingKindOf(declaration: ts.Declaration): BindingKind | "const" {
  if (ts.isVariableDeclaration(declaration)) {
    if (ts.isCatchClause(declaration.parent)) return "catch";
    const list = declaration.parent;
    if (!ts.isVariableDeclarationList(list)) return "other";
    const scoped = list.flags & ts.NodeFlags.BlockScoped;
    if (scoped === ts.NodeFlags.Let) return "let";
    if (scoped === 0) return "var";
    if (scoped !== ts.NodeFlags.Const) return "using";
    if (declaration.initializer === undefined) return "no-initializer";
    if (isAmbient(declaration)) return "ambient";
    if (ts.isVariableStatement(list.parent) && isExported(list.parent) && ts.isModuleBlock(list.parent.parent)) return "namespace";
    return "const";
  }
  if (ts.isParameter(declaration)) return "parameter";
  if (ts.isBindingElement(declaration)) return "destructuring";
  if (ts.isFunctionDeclaration(declaration) || ts.isFunctionExpression(declaration)) return "function";
  if (ts.isClassDeclaration(declaration) || ts.isClassExpression(declaration)) return "class";
  if (ts.isEnumDeclaration(declaration) || ts.isEnumMember(declaration)) return "enum";
  if (ts.isModuleDeclaration(declaration)) return "namespace";
  return "other";
}
function propertyText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isPrivateIdentifier(name) || ts.isNoSubstitutionTemplateLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) {
    const key = unwrapped(name.expression);
    return ts.isStringLiteralLike(key) ? key.text : undefined;
  }
  return undefined;
}
function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}

const readers = new Map<string, BindingTextReader>();

/** A reader over one module. */
export function bindingTextReader(path: string, text: string): BindingTextReader {
  const key = `${path}\n${text}`;
  const known = readers.get(key);
  if (known !== undefined) return known;
  const extension = /\.(?:[cm]?[jt]s|[jt]sx)$/i.exec(path)?.[0]?.toLowerCase() ?? ".ts";
  const name = `binding-text-reader-module${extension}`;
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true);
  const options: ts.CompilerOptions = { noLib: true, noResolve: true, allowJs: true, types: [], target: ts.ScriptTarget.Latest };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (file) => (file === name ? source : undefined);
  host.fileExists = (file) => file === name;
  host.readFile = (file) => (file === name ? text : undefined);
  const checker = ts.createProgram({ rootNames: [name], options, host }).getTypeChecker();
  let evaluates = false;
  visit(source, (node) => {
    if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      if (ts.isIdentifier(callee) && callee.text === "eval") evaluates = true;
    }
  });

  const resolve = (identifier: ts.Identifier): Resolution => {
    if (evaluates) return { kind: "eval" };
    let child: ts.Node = identifier;
    for (let at: ts.Node | undefined = identifier.parent; at !== undefined; at = at.parent) {
      if (ts.isWithStatement(at) && at.statement === child) return { kind: "with" };
      child = at;
    }
    const parent = identifier.parent;
    const symbol = parent !== undefined && ts.isShorthandPropertyAssignment(parent) && parent.name === identifier ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(identifier);
    if (symbol === undefined) return { kind: "unbound" };
    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) return { kind: "import" };
    const declarations = symbol.declarations ?? [];
    if (declarations.length === 0) return { kind: "unbound" };
    if (declarations.length > 1) return { kind: "merged" };
    const declaration = declarations[0];
    const kind = bindingKindOf(declaration);
    if (kind === "const" && ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined) return { kind, declaration, initializer: declaration.initializer };
    return { kind: kind === "const" ? "other" : kind };
  };

  const alternativesAt = (node: ts.Expression, depth: number, active: ReadonlySet<ts.Declaration>): Alternative[] => {
    if (depth > MAX_DEPTH) return [{ opaque: `${sourceText(node)}:bound` }];
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node) || ts.isAwaitExpression(node))
      return alternativesAt(node.expression, depth + 1, active);
    if (ts.isStringLiteralLike(node)) return [{ text: node.text }];
    if (ts.isIdentifier(node)) {
      const resolution = resolve(node);
      if (resolution.kind !== "const") return [{ opaque: `${node.text}:${resolution.kind}` }];
      if (active.has(resolution.declaration)) return [{ opaque: `${node.text}:cycle` }];
      return alternativesAt(resolution.initializer, depth + 1, new Set([...active, resolution.declaration]));
    }
    const combined = (parts: readonly (readonly Alternative[])[]): Alternative[] => {
      let combinations: Alternative[][] = [[]];
      for (const part of parts) {
        combinations = combinations.flatMap((prefix) => part.map((alternative) => [...prefix, alternative]));
        if (combinations.length > MAX_COMBINATIONS) return [{ opaque: `${sourceText(node)}:bound` }];
      }
      return once(combinations.map((combination) => combination.find((alternative) => "opaque" in alternative) ?? { text: combination.map((alternative) => ("text" in alternative ? alternative.text : "")).join("") }));
    };
    if (ts.isTemplateExpression(node))
      return combined([[{ text: node.head.text }], ...node.templateSpans.flatMap((span) => [alternativesAt(span.expression, depth + 1, active), [{ text: span.literal.text }]])]);
    if (ts.isConditionalExpression(node)) return once([...alternativesAt(node.whenTrue, depth + 1, active), ...alternativesAt(node.whenFalse, depth + 1, active)]);
    if (ts.isBinaryExpression(node)) {
      const operator = node.operatorToken.kind;
      if (operator === ts.SyntaxKind.PlusToken) return combined([alternativesAt(node.left, depth + 1, active), alternativesAt(node.right, depth + 1, active)]);
      if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken || operator === ts.SyntaxKind.AmpersandAmpersandToken)
        return once([...alternativesAt(node.left, depth + 1, active), ...alternativesAt(node.right, depth + 1, active)]);
    }
    return [{ opaque: sourceText(node) }];
  };
  const alternatives = (node: ts.Expression): readonly Alternative[] => alternativesAt(node, 0, new Set());

  const fieldsAt = (object: ts.ObjectLiteralExpression, depth: number): Fields => {
    const values = new Map<string, ts.Expression>();
    const opaque = new Map<string, string>();
    const set = (name: string, value: ts.Expression): void => {
      values.set(name, value);
      opaque.delete(name);
    };
    const everyField = (label: string): void => {
      for (const name of [...values.keys(), ...opaque.keys()]) if (name !== "*") opaque.set(name, label);
      opaque.set("*", label);
    };
    for (const member of object.properties) {
      if (ts.isSpreadAssignment(member)) {
        const spread = unwrapped(member.expression);
        const resolution = ts.isIdentifier(spread) ? resolve(spread) : undefined;
        const literal = resolution?.kind === "const" ? unwrapped(resolution.initializer) : undefined;
        const inner = literal !== undefined && ts.isObjectLiteralExpression(literal) && depth < MAX_SPREADS ? fieldsAt(literal, depth + 1) : undefined;
        if (inner === undefined || inner.opaque.size > 0) everyField(`...${sourceText(member.expression)}`);
        else for (const [name, value] of inner.values) set(name, value);
      } else if (ts.isShorthandPropertyAssignment(member)) set(member.name.text, member.name);
      else {
        const name = member.name === undefined ? undefined : propertyText(member.name);
        if (ts.isPropertyAssignment(member)) {
          if (name === undefined) everyField(sourceText(member.name));
          else set(name, member.initializer);
        } else {
          const label = `${ts.isGetAccessorDeclaration(member) ? "get " : ts.isSetAccessorDeclaration(member) ? "set " : ""}${name ?? sourceText(member.name)}${ts.isMethodDeclaration(member) ? "()" : ""}`;
          if (name === undefined) everyField(label);
          else opaque.set(name, label);
        }
      }
    }
    return { values, opaque };
  };
  const fields = (object: ts.ObjectLiteralExpression): Fields => fieldsAt(object, 0);

  const registration = (object: ts.ObjectLiteralExpression): readonly string[] | undefined => {
    const read = fields(object);
    const id = read.values.get("id");
    const ids = id === undefined ? [] : alternatives(id);
    if (!ids.some((alternative) => "text" in alternative && alternative.text.startsWith("reactivefiber."))) return undefined;
    const label = (field: string): string | undefined => read.opaque.get(field) ?? (read.values.has(field) ? undefined : read.opaque.get("*"));
    const idLabel = label("id");
    const idEntries =
      idLabel !== undefined
        ? [`<opaque ${idLabel}>`]
        : ids.flatMap((alternative) => ("opaque" in alternative ? [`<opaque ${alternative.opaque}>`] : alternative.text.startsWith("reactivefiber.") ? [alternative.text] : []));
    const effectLabel = label("effectClass");
    const effect = read.values.get("effectClass");
    const effectText =
      effectLabel !== undefined
        ? `<opaque ${effectLabel}>`
        : effect === undefined
          ? "<none>"
          : [...new Set(alternatives(effect).map((alternative) => ("text" in alternative ? alternative.text : `<opaque ${alternative.opaque}>`)))].sort().join("|");
    return [...new Set(idEntries)].sort().map((entry) => `${entry}:${effectText}`);
  };

  const reader: BindingTextReader = {
    path,
    source,
    resolve,
    alternatives,
    exact: (node) => {
      const read = alternatives(node);
      return read.every((alternative) => "text" in alternative) ? read.map((alternative) => ("text" in alternative ? alternative.text : "")) : undefined;
    },
    words: (node) => {
      const read = alternatives(node);
      if (read.some((alternative) => "opaque" in alternative)) return undefined;
      return [...new Set(read.flatMap((alternative) => ("text" in alternative ? commandWords(alternative.text) : [])))];
    },
    program: (node) => {
      const firsts = alternatives(node).map((alternative) => ("text" in alternative ? commandWords(alternative.text)[0] : undefined));
      return firsts.some((first) => first === undefined) ? `<opaque ${sourceText(node)}>` : [...new Set(firsts)].sort().join("|");
    },
    fields,
    registration,
    registrations: () => {
      const entries: string[] = [];
      visit(source, (node) => {
        if (ts.isObjectLiteralExpression(node)) entries.push(...(registration(node) ?? []));
      });
      return entries.sort();
    },
  };
  readers.set(key, reader);
  return reader;
}

/** The alternatives, less the duplicates the key below finds. */
function once(alternatives: readonly Alternative[]): Alternative[] {
  const seen = new Set<string>();
  return alternatives.filter((alternative) => {
    const key = "text" in alternative ? `t${alternative.text}` : `o${alternative.opaque}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
