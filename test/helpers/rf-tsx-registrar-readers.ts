/**
 * wb-6fr4: the readers the C2 case of the wb-o4h0.4 rf TSX remote-hook census reads a tier module with, as wb-8avz's FINAL
 * cut #4 wrote them (machine/flywheel/wb-8avz tip b8cfd428dac615721006b468ce0984ceb6edc5a2,
 * test/workbench-rf-tsx-remote-hook-census.test.ts), moved here so that a census can hold their readings
 * (test/workbench-rf-tsx-registrar-readers-census.test.ts). Under the rule-19 dependency inversion R-B218 the parent wb-8avz
 * is parked and waits on wb-6fr4; its later re-cut can import these readers. Every declaration below is copied byte for
 * byte from that tip - lines 204, 233-236, 407-411, 485-490, 493-514, 680-687, 689-690, 694-712, 715-735, 751-780, 787-800,
 * 802-823, 825-830, 846-867, 869-874, 876-886 and 893-928 - and only this header, the import and the two export statements
 * at the end are added. The doc comments that precede those declarations at the tip are left out: they state the parent
 * census's own pins and NOT CLAIMED list, none of which is on trunk. What this module is held to is the readers census's
 * pinned probes. Test-only: no src, docs or receipt is read or written here.
 */
import ts from "typescript";

const CLAIM_FAMILY = /federat|use[_.-]*remote[_.-]*resources?|network|read[\s_-]*set|resolved[\s_-]*revision|imported[\s_-]*dependenc/i;
const ROW_REGISTRARS = ["it", "test"];
const SUITE_REGISTRARS = ["describe", "suite"];
const TABLE_FACTORIES = ["each", "for"];
const API_FACTORIES = ["extend", "scoped"];
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node)) {
    return fold(node.expression);
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken) return fold(node.right);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
interface TierReading {
  /** The one-row registrations, by title (a title that does not fold reads as COMPUTED). */
  readonly titles: string[];
  /** Every other reference to a row registrar, with why it is no one-row registration: each is a finding. */
  readonly unaccounted: string[];
  /** The literals that name a claim of (b) or (c). */
  readonly claims: string[];
}
const COMPUTED = "<computed>";
type HeadStep = { readonly member: string } | { readonly call: ts.CallExpression };
function headOf(reference: ts.Expression): HeadStep[] {
  const steps: HeadStep[] = [];
  let current = reference;
  for (;;) {
    const parent = current.parent;
    if ((ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent) || ts.isAsExpression(parent) || ts.isSatisfiesExpression(parent) || ts.isTypeAssertionExpression(parent)) && parent.expression === current) {
      current = parent;
    } else if (ts.isPropertyAccessExpression(parent) && parent.expression === current) {
      steps.push({ member: parent.name.text });
      current = parent;
    } else if (ts.isElementAccessExpression(parent) && parent.expression === current) {
      steps.push({ member: fold(parent.argumentExpression) ?? COMPUTED });
      current = parent;
    } else if (ts.isCallExpression(parent) && parent.expression === current) {
      steps.push({ call: parent });
      current = parent;
    } else return steps;
  }
}
function headReading(steps: readonly HeadStep[]): { readonly call: ts.CallExpression } | { readonly reason: string } {
  const last = steps.at(-1);
  if (last === undefined || !("call" in last)) return { reason: "a registrar referenced outside a call (an alias, an argument, an export)" };
  for (const [index, step] of steps.entries()) {
    if ("member" in step) {
      if (step.member === COMPUTED) return { reason: "a computed member" };
      if (TABLE_FACTORIES.includes(step.member)) return { reason: `a table factory (${step.member}: one row per entry)` };
      if (API_FACTORIES.includes(step.member)) return { reason: `an API factory (${step.member}: a further registrar)` };
    } else if (index < steps.length - 1) {
      // An earlier call is a condition's only when a member names it; a call of a call's result registers nothing known.
      const before = index > 0 ? steps[index - 1] : undefined;
      if (before === undefined || !("member" in before)) return { reason: "a call of a registration's result" };
    }
  }
  return { call: last.call };
}
interface RegistrarBindings {
  readonly rows: ReadonlySet<string>;
  readonly suites: ReadonlySet<string>;
  readonly namespaces: ReadonlySet<string>;
}
function registrarBindings(file: ts.SourceFile): RegistrarBindings {
  const rows = new Set(ROW_REGISTRARS);
  const suites = new Set(SUITE_REGISTRARS);
  const namespaces = new Set<string>();
  // A local name a value import of a vitest import declaration binds leaves the own-name readings first: the import is
  // what it reads as.
  const shadow = (local: ts.Identifier): string => {
    rows.delete(local.text);
    suites.delete(local.text);
    return local.text;
  };
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
    const clause = statement.importClause;
    if (clause === undefined || clause.isTypeOnly) continue;
    if (clause.name !== undefined) shadow(clause.name);
    const bindings = clause.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) namespaces.add(shadow(bindings.name));
    else if (bindings !== undefined) {
      for (const element of bindings.elements) {
        if (element.isTypeOnly) continue;
        const imported = (element.propertyName ?? element.name).text;
        const local = shadow(element.name);
        if (ROW_REGISTRARS.includes(imported)) rows.add(local);
        if (SUITE_REGISTRARS.includes(imported)) suites.add(local);
      }
    }
  }
  return { rows, suites, namespaces };
}
function refusedVitestImports(file: ts.SourceFile): ts.ImportDeclaration[] {
  const refused: ts.ImportDeclaration[] = [];
  let leading = true;
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") {
      leading = false;
      continue;
    }
    const clause = statement.importClause;
    const mixed = clause !== undefined && clause.name !== undefined && clause.namedBindings !== undefined;
    if (!leading || mixed) refused.push(statement);
  }
  return refused;
}
function isReference(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name !== node;
  if (ts.isQualifiedName(parent)) return parent.right !== node;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isImportEqualsDeclaration(parent)) return false;
  if (ts.isBindingElement(parent)) return parent.propertyName !== node;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return parent.label !== node;
  if (
    ts.isPropertyAssignment(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isEnumMember(parent) ||
    ts.isJsxAttribute(parent)
  ) {
    return parent.name !== node;
  }
  return true;
}
function memberOf(node: ts.Identifier): { readonly access: ts.Expression; readonly name: string } | undefined {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return { access: parent, name: parent.name.text };
  if (ts.isElementAccessExpression(parent) && parent.expression === node) return { access: parent, name: fold(parent.argumentExpression) ?? COMPUTED };
  return undefined;
}
function suiteReference(callee: ts.Expression, bindings: RegistrarBindings): ts.Expression | undefined {
  let current = callee;
  for (;;) {
    if (ts.isIdentifier(current)) return bindings.suites.has(current.text) ? current : undefined;
    if ((ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current)) && ts.isIdentifier(current.expression) && bindings.namespaces.has(current.expression.text)) {
      const member = memberOf(current.expression);
      return member !== undefined && SUITE_REGISTRARS.includes(member.name) ? current : undefined;
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current) ||
      ts.isCallExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isNonNullExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isTypeAssertionExpression(current)
    ) {
      current = current.expression;
    } else return undefined;
  }
}
function isOneRowSuite(call: ts.CallExpression, bindings: RegistrarBindings): boolean {
  const reference = suiteReference(call.expression, bindings);
  if (reference === undefined) return false;
  const reading = headReading(headOf(reference));
  return "call" in reading && reading.call === call;
}
function runsOnce(call: ts.CallExpression, bindings: RegistrarBindings): boolean {
  let node: ts.Node = call;
  for (;;) {
    const parent = node.parent;
    if (ts.isSourceFile(parent)) return true;
    if (ts.isExpressionStatement(parent) || ts.isBlock(parent)) node = parent;
    else if ((ts.isArrowFunction(parent) || ts.isFunctionExpression(parent)) && ts.isCallExpression(parent.parent) && parent.parent.arguments.some(argument => argument === parent) && isOneRowSuite(parent.parent, bindings)) {
      node = parent.parent;
    } else return false;
  }
}
function tierReadingOf(path: string, source: string): TierReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const bindings = registrarBindings(file);
  const titles: string[] = [];
  const unaccounted: string[] = [];
  const claims: string[] = [];
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  for (const declaration of refusedVitestImports(file)) {
    unaccounted.push(`${path}:${line(declaration)} a vitest import declaration C2 refuses (after the leading run, or a default import beside other bindings): NOT CLAIMED, wb-6fr4`);
  }
  const row = (reference: ts.Expression): void => {
    const reading = headReading(headOf(reference));
    if ("reason" in reading) unaccounted.push(`${path}:${line(reference)} ${reading.reason}`);
    else if (!runsOnce(reading.call, bindings)) unaccounted.push(`${path}:${line(reference)} a row in a loop, a branch, a table suite, a row's callback or another function`);
    else {
      const title = reading.call.arguments[0];
      titles.push((title === undefined ? undefined : fold(title)) ?? COMPUTED);
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && isReference(node)) {
      if (bindings.rows.has(node.text)) row(node);
      else if (bindings.namespaces.has(node.text)) {
        const member = memberOf(node);
        if (member === undefined) unaccounted.push(`${path}:${line(node)} a vitest namespace referenced whole`);
        else if (ROW_REGISTRARS.includes(member.name)) row(member.access);
      }
    }
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (CLAIM_FAMILY.test(node.text)) claims.push(`${path}: ${node.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { titles, unaccounted, claims };
}

export type { HeadStep, RegistrarBindings, TierReading };
export {
  API_FACTORIES,
  CLAIM_FAMILY,
  COMPUTED,
  extensionOf,
  fold,
  headOf,
  headReading,
  isOneRowSuite,
  isReference,
  memberOf,
  ROW_REGISTRARS,
  refusedVitestImports,
  registrarBindings,
  runsOnce,
  SUITE_REGISTRARS,
  scriptKindOf,
  suiteReference,
  TABLE_FACTORIES,
  tierReadingOf,
};
