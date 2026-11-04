/**
 * wb-26dh: THE BINDINGS reader of the wb-tz4r.3 ri-decision-provenance-echo census, bindingsRead, as wb-5333's FINAL cut #4 wrote
 * it (machine/flywheel/wb-5333 tip bce0de7f9462269ac80b39fc31f771f65bdaf315, test/workbench-ri-decision-provenance-echo-census.test.ts),
 * moved here so that a census can hold its readings (test/workbench-ri-decision-provenance-echo-bindings-census.test.ts), with
 * THE FORM below in place of the tip's names test. Under the rule-19 dependency inversion R-B256 the parent wb-5333 was parked behind
 * wb-26dh until this landed (landing 860); its re-cut, wb-5333 cut #5, imports bindingsRead and IN_FILE_SIDES from here (and restates
 * this sentence). Copied byte for byte from that tip: lines 1272-1282 (boundNames), 1284-1289 (importedNames), 1291-1293 (declaredBy),
 * 1300-1309 (hoistedNames), 1334-1355 (IN_FILE_SIDES), 1357 (MUTABLE_BINDINGS) and 1377-1391 (bindingsRead) but line 1388, whose test
 * readNames(initializer) over LITERAL_READS becomes isLiteralSide(side, initializer). The tip's doc comments above those declarations
 * are left out: they state the parent census's own pins and NOT CLAIMED list at that tip, none of which was on trunk when this module
 * was cut. What this module is held to is the bindings census's pinned probes.
 * Test-only: no src, docs or receipt is read or written here.
 */
import ts from "typescript";

function boundNames(node: ts.Node): string[] {
  const names = (name: ts.BindingName): string[] => (ts.isIdentifier(name) ? [name.text] : name.elements.flatMap(element => (ts.isBindingElement(element) ? names(element.name) : [])));
  if (ts.isVariableDeclaration(node) || ts.isParameter(node)) return names(node.name);
  if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node)) return node.name === undefined ? [] : [node.name.text];
  // wb-5333 U1: the wb-5333 gate's G01, an enum INVOCATION frozen in the judged set, stood in for the edited constant at 18/18.
  if (ts.isEnumDeclaration(node) || ts.isImportEqualsDeclaration(node)) return [node.name.text];
  if (ts.isModuleDeclaration(node) && (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0) return node.body !== undefined && ts.isModuleBlock(node.body) ? node.body.statements.flatMap(declaredBy) : [];
  if (ts.isModuleDeclaration(node)) return ts.isIdentifier(node.name) ? [node.name.text] : [];
  if (ts.isImportDeclaration(node)) return importedNames(node);
  return [];
}
function importedNames(statement: ts.ImportDeclaration): string[] {
  const clause = statement.importClause;
  const bindings = clause?.namedBindings;
  const named = bindings === undefined ? [] : ts.isNamespaceImport(bindings) ? [bindings.name.text] : bindings.elements.map(element => element.name.text);
  return [...(clause?.name === undefined ? [] : [clause.name.text]), ...named];
}
function declaredBy(statement: ts.Statement): string[] {
  return ts.isVariableStatement(statement) ? statement.declarationList.declarations.flatMap(boundNames) : boundNames(statement);
}
function hoistedNames(statement: ts.Statement): string[] {
  const names: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionLike(node) || ts.isClassLike(node) || ts.isModuleDeclaration(node)) return;
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.BlockScoped) === 0) names.push(...node.declarations.flatMap(boundNames));
    ts.forEachChild(node, visit);
  };
  visit(statement);
  return names;
}
const IN_FILE_SIDES: readonly string[] = [
  "BEAD",
  "PROGRAM_TAG",
  "TRIGGER",
  "QUOTE_PIN",
  "QUOTE",
  "GATING_ARTIFACTS",
  "INVOCATION",
  "FIELDS",
  "REF_KIND",
  "MEMBER",
  "RI_ROOT",
  "FIELD_SPELLINGS",
  "REF_PREFIX",
  "JUDGED_TITLE",
  "RECORD_TITLE",
  "ROWS",
  "SEPARATOR",
  "HARNESS",
  "RECORD",
  "HOOKS",
];
const MUTABLE_BINDINGS: readonly string[] = ["nativeIds"];
/**
 * wb-26dh, THE FORM (in place of the tip's LITERAL_READS and readNames with their doc comments, :1358-1371; the cure (a) wb-5333's
 * refusal #3 names): an in-file side's initializer is read by its form, never only by the names it reads. It is a literal, or a call of
 * deepFrozen with one argument that is a literal. A literal is a string, a regular expression or a substitution-free template
 * literal; an array literal whose elements are literals (no spread and no hole); or an object literal whose properties are plain
 * property assignments - an identifier or a string key, never __proto__ - with literal values (no accessor, method, computed
 * key, shorthand or spread); each read through any `as` assertion around it, which emits no code. A template literal whose every
 * substitution is TRIGGER alone is a literal in one place only: the label of row A, the element of ROWS's array literal whose id
 * is the string "A". No other form is a literal: no other call, no await, import() or import.meta, no identifier, member or
 * element access, no operator, no new, class or function expression.
 */
const FREEZER = "deepFrozen";
const COMPOSED = "TRIGGER";
const COMPOSING_SIDE = "ROWS";
/** A node under the `as` assertions around it, which emit no code. */
function bare(node: ts.Expression): ts.Expression {
  return ts.isAsExpression(node) ? bare(node.expression) : node;
}
/** A plain property assignment's key - an identifier or a string, never __proto__ - or undefined for any other. */
function plainKey(property: ts.PropertyAssignment): string | undefined {
  if (!(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) return undefined;
  return property.name.text === "__proto__" ? undefined : property.name.text;
}
/** Whether a node is a literal (THE FORM); `label` admits a template literal composing TRIGGER alone, row A's label. */
function isLiteral(node: ts.Expression, label = false): boolean {
  const form = bare(node);
  if (ts.isStringLiteral(form) || ts.isNoSubstitutionTemplateLiteral(form) || ts.isRegularExpressionLiteral(form)) return true;
  if (ts.isTemplateExpression(form)) return label && form.templateSpans.every(span => ts.isIdentifier(span.expression) && span.expression.text === COMPOSED);
  if (ts.isArrayLiteralExpression(form)) return form.elements.every(element => isLiteral(element));
  if (ts.isObjectLiteralExpression(form)) return form.properties.every(property => ts.isPropertyAssignment(property) && plainKey(property) !== undefined && isLiteral(property.initializer));
  return false;
}
/** Row A: an element of ROWS's array literal that is an object literal whose id is the string "A". */
function rowA(node: ts.Expression): ts.ObjectLiteralExpression | undefined {
  const form = bare(node);
  if (!ts.isObjectLiteralExpression(form)) return undefined;
  const id = form.properties.some(property => ts.isPropertyAssignment(property) && plainKey(property) === "id" && ts.isStringLiteral(property.initializer) && property.initializer.text === "A");
  return id ? form : undefined;
}
/** Whether ROWS's initializer is a literal in which row A's label alone composes TRIGGER (THE FORM). */
function isRowsLiteral(node: ts.Expression): boolean {
  const form = bare(node);
  if (!ts.isArrayLiteralExpression(form)) return isLiteral(form);
  return form.elements.every(element => {
    const row = rowA(element);
    if (row === undefined) return isLiteral(element);
    return row.properties.every(property => ts.isPropertyAssignment(property) && plainKey(property) !== undefined && isLiteral(property.initializer, plainKey(property) === "label"));
  });
}
/** THE FORM over one in-file side's initializer: a literal, or deepFrozen called with one literal (ROWS's row A label may compose TRIGGER). */
function isLiteralSide(side: string, initializer: ts.Expression): boolean {
  const body = ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) && initializer.expression.text === FREEZER && initializer.arguments.length === 1 ? initializer.arguments[0] : initializer;
  return body !== undefined && (side === COMPOSING_SIDE ? isRowsLiteral(body) : isLiteral(body));
}
function bindingsRead(file: ts.SourceFile): string[] {
  const found: string[] = [];
  const blockScope = (statement: ts.VariableStatement): number => statement.declarationList.flags & ts.NodeFlags.BlockScoped;
  const lets = (statement: ts.Statement): string[] => (ts.isVariableStatement(statement) && blockScope(statement) === ts.NodeFlags.Let ? declaredBy(statement) : []);
  for (const name of file.statements.flatMap(statement => [...lets(statement), ...hoistedNames(statement)])) if (!MUTABLE_BINDINGS.includes(name)) found.push(`${name} is bound by let or var`);
  const consts = file.statements.flatMap(statement =>
    ts.isVariableStatement(statement) && blockScope(statement) === ts.NodeFlags.Const && !statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword) ? statement.declarationList.declarations : [],
  );
  for (const side of IN_FILE_SIDES) {
    const declared = consts.filter(entry => ts.isIdentifier(entry.name) && entry.name.text === side);
    const initializer = declared.length === 1 ? declared[0]?.initializer : undefined;
    if (initializer === undefined || !isLiteralSide(side, initializer)) found.push(`${side} is not one top-level const of literals`);
  }
  return found;
}

export { bindingsRead, IN_FILE_SIDES };
