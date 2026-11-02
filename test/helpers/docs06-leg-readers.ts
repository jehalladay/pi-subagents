/**
 * wb-mcoj (the rule-19 carrier child of wb-ouo3: structural exit R-B258 at refusal #4 M:44680, dependency inversion R-B309
 * at refusal #5 O:1738): two readers of the docs06 census's fail-closed leg, shared so that census can ride them instead
 * of carrying a copy - moduleImports (its "the modules loaded" reading) and propertyWrites (its "the property writes"
 * reading, which composes spelledAnywhere over WRITER_ROUTE). Their code is wb-ouo3 cut #5's (afda7b0d8d45,
 * test/workbench-docs06-conformance.census.ts :1487-1499, :1515-1540, :1554 and :1572-1603), byte for byte; this module
 * adds the exports and these docs and changes no reading.
 *
 * WHAT IS CLAIMED: each reader's reading of each planted text test/workbench-docs06-leg-readers-census.test.ts pins in
 * its MODULES and WRITES tables (held to test/fixtures/docs06-leg-readers-roster.json), exactly as pinned - every entry,
 * its text and its order. What a reader returns for a text those tables do not plant is NOT CLAIMED by this module: the
 * same form from another module, at another place in a text, in another combination or beside other code included. The
 * uses of expect (the docs06 census's own hookRoster reading) are not read here; the test context's own expect is the
 * named residual R-CTX-EXPECT of test/workbench-docs06-leg-readers-census.test.ts, whose quiet rows read the docs06
 * census file with two expect-member readers of their own.
 *
 * Test-only: this module parses source text and never runs it.
 */
import ts from "typescript";

/**
 * Every identifier and string-like literal (a string or a no-substitution template) whose text the pattern matches, in
 * source order, as "<text> at <line>:<column>", with " (a string)" after a literal. CLAIMED only as propertyWrites
 * composes it over WRITER_ROUTE, in the readings the census's WRITES table pins; with any other pattern it is NOT
 * CLAIMED by this module.
 */
export function spelledAnywhere(file: string, text: string, pattern: RegExp): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isIdentifier(node) || ts.isStringLiteralLike(node)) && pattern.test(node.text)) {
      const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
      out.push(`${node.text} at ${line + 1}:${character + 1}${ts.isIdentifier(node) ? "" : " (a string)"}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}
/**
 * The writer APIs propertyWrites reads by name - builtins that write a property with no member write in the source
 * (Object.assign, Reflect.set, Reflect.deleteProperty and the legacy accessor definers). A pattern, never strings, so the
 * list spells none of them.
 */
export const WRITER_ROUTE = /^(assign|set|deleteProperty|__defineGetter__|__defineSetter__)$/;
/**
 * A source's module loads, one entry per load in source order. The pinned readings hold these entry shapes: an import
 * declaration as "<module> | <what it binds>" (a default as "default as <name>", a namespace as "* as <name>" and each
 * named binding as written - "type " before an inline type-only one, "<name> as <local>" for an aliased one - joined by
 * ", "; "type " before a type-only clause; "(nothing bound)" for a bare import), an export declaration with a module as
 * "<module> | re-exports <its clause as written, or *>", and an import-equals declaration or an import() or require()
 * call as "<the code as written> | loaded at run time". CLAIMED: its reading of each text the census's MODULES table
 * plants (rows MI-DEFAULT-NAMED, MI-DEFAULT-NS, MI-NSEXPORT, MI-NODE-ALIAS, MI-NODE-TYPEONLY and MI-PLANTED), exactly as
 * pinned; the shapes above describe those readings, and what it returns for any other text is NOT CLAIMED.
 */
export function moduleImports(file: string, text: string): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const binds = (node: ts.ImportDeclaration): string => {
    const clause = node.importClause;
    const bound: string[] = [];
    if (clause?.name !== undefined) bound.push(`default as ${clause.name.text}`);
    const bindings = clause?.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) bound.push(`* as ${bindings.name.text}`);
    if (bindings !== undefined && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) bound.push(`${element.isTypeOnly ? "type " : ""}${element.propertyName === undefined ? element.name.text : `${element.propertyName.getText(sf)} as ${element.name.text}`}`);
    }
    return `${clause?.isTypeOnly === true ? "type " : ""}${bound.join(", ") || "(nothing bound)"}`;
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined) {
      const from = ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : node.moduleSpecifier.getText(sf);
      out.push(`${from} | ${ts.isImportDeclaration(node) ? binds(node) : `re-exports ${node.exportClause?.getText(sf) ?? "*"}`}`);
    } else if (ts.isImportEqualsDeclaration(node) || (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require")))) {
      out.push(`${node.getText(sf)} | loaded at run time`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}
/**
 * A source's member writes, each as "<the write> <the target as written> at <line:column>" in source order, then each
 * spelling of a writer API WRITER_ROUTE names, as "a writer named <spelledAnywhere's entry>". The pinned readings hold
 * these writes: "an assignment to" (through the operators the WRITES table plants: =, +=, ??= and ^=), "a delete of",
 * "an update of" (a postfix ++ and a prefix --, as planted) and "a loop head writing" (a for-of or for-in head that is
 * not a declaration), each target a property or element access, reached through the wrappers, patterns and pattern
 * defaults the WRITES table plants - an object pattern property with a computed key among them (row PW-COMPUTED-KEY).
 * CLAIMED: its reading of each text the census's WRITES table plants (rows PW-COMPUTED-KEY and PW-PLANTED), exactly as
 * pinned; what it returns for any other text is NOT CLAIMED.
 */
export function propertyWrites(file: string, text: string): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const place = (node: ts.Node): string => {
    const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    return `${line + 1}:${character + 1}`;
  };
  const isMember = (node: ts.Node): boolean => ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node);
  const targets = (node: ts.Node): readonly ts.Node[] => {
    if (isMember(node)) return [node];
    if (ts.isParenthesizedExpression(node) || ts.isSpreadElement(node) || ts.isSpreadAssignment(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node)) return targets(node.expression);
    if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap(targets);
    if (ts.isObjectLiteralExpression(node)) return node.properties.flatMap(targets);
    if (ts.isPropertyAssignment(node)) return targets(node.initializer);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) return targets(node.left);
    return [];
  };
  const visit = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      for (const target of targets(node.left)) out.push(`an assignment to ${target.getText(sf)} at ${place(node)}`);
    } else if (ts.isDeleteExpression(node)) {
      out.push(`a delete of ${node.expression.getText(sf)} at ${place(node)}`);
    } else if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
      for (const target of targets(node.operand)) out.push(`an update of ${target.getText(sf)} at ${place(node)}`);
    } else if ((ts.isForInStatement(node) || ts.isForOfStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) {
      for (const target of targets(node.initializer)) out.push(`a loop head writing ${target.getText(sf)} at ${place(node)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return [...out, ...spelledAnywhere(file, text, WRITER_ROUTE).map(entry => `a writer named ${entry}`)];
}
