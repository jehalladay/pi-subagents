/**
 * wb-021.2 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2, program-triage-2026-10-18): the judge, the tables and the plants of the
 * APO snapshot census (test/workbench-apo-snapshot-census.test.ts, whose header states the claims). One module, so the
 * census and its roster are written from the same rows.
 *
 * FAIL-CLOSED CORE. The census admits an APO view only in one proven form and refuses every other form with a typed
 * finding (a red): it never reads an unknown form as quiet. Each finding kind below is held by a plant of its own.
 *
 * VIEWS. A module PRESENTS APO STATE (an APO view module) when the ROLE reading of test/helpers/apo-ui-publish-census.ts
 * (wb-021.4's moduleFacts roles: the program's abbreviation as a word, or its slug's three words in order, in any name
 * or literal, read through that module's nameOf and wordsOf) reads one of its texts. A module that presents APO state
 * without naming the program in a name or a literal (a comment naming it is never read) is not identified
 * (R-UNNAMED-VIEW).
 * CLOSURE. A view's runtime closure is the view plus every module reached by a runtime edge, from the edges wb-021.4's
 * moduleFacts reads (static, export-from, dynamic, require, import-equals; a type-only edge is erased and not followed).
 * Every module of the closure is judged whole: every handler path through the view's own code and the code it imports
 * runs inside it, and code no handler reaches is judged too (code handed in at run time is outside it: R-UNNAMED-EFFECT,
 * R-IMPLICIT-CALL).
 * FINDINGS (each a line; every one is a red):
 * - UNREADABLE: a file of the judged tree the readers cannot read or parse (it cannot be identified, so the tree reds).
 * - UNRESOLVED: a closure edge whose specifier is computed, or relative and resolving to no file of the tree.
 * - PACKAGE: a closure edge whose specifier is not relative (a package, a node builtin, an absolute path or a URL). No
 *   specifier is admitted: node:fs, node:child_process and every native client package refuse by this one rule.
 * - EFFECT: a closure text - every identifier and private name (nameOf), every string literal and no-substitution
 *   template (its value), every template head, middle and tail (its text), and every "+" chain whose operands are all
 *   string literals (parenthesized or not, folded) - holding a word of an EFFECT family (wordsOf: the statement's and the
 *   acceptance's verbs execute, retry, admit, mutate, invoke and write, each with its inflections), or whose whole text is
 *   a SEAM effect name (a member of Pi's effect seams, below). Regular-expression literals and comments are not read.
 * - GLOBAL: a closure identifier that names no binding declared in the tree (a free name, or a name only an ambient
 *   declaration declares - one under a declare modifier, its own or an enclosing one's), outside ADMITTED_FREE. Free names are resolved by the TypeScript checker over the closure
 *   files (noLib, noResolve): a property name, a qualified name's right side, a binding element's property name, an
 *   import specifier's imported name, an export-from specifier, a label, a meta-property name and an import attribute's
 *   name are not references; a shorthand property reads its value and a local export specifier its local name; type
 *   positions (and interfaces, type aliases and implements clauses) are skipped, a class's extends expression is a value.
 * - CONSTRUCTOR: a closure text whose whole text is constructor (the route to a code constructor through any object).
 * SEAMS. Pi's effect seams are read from src: ObservationProjection's public members (its six admission members admit an
 * event), CapabilityRegistry's and CapabilityProvider's (invoke, inspect, register) and src/workflow/journal.ts's exported
 * values (appendJournal writes the journal). seamMembers reads every member-name form (an identifier, a string, numeric
 * or no-substitution template literal, a computed literal; any other computed name reads <computed>, an index signature
 * <index>, a call signature <call>, a construct signature <new>, a re-export <re-export>, any other exported statement
 * it cannot name <export>; private members, constructors and static blocks are left out, and types are not values), so
 * a member of any form is classified or reds.
 * NOT CLAIMED (each a named residual with its pinned quiet row in row Q): R-UNNAMED-VIEW, R-UNNAMED-EFFECT,
 * R-IMPLICIT-CALL, R-FIELD-MUTATION, R-COMPUTED-TEXT, R-REFLECTIVE-REACH.
 *
 * Display paths added: none. This module is test-only.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import ts from "typescript";
import { type ModuleFacts, moduleFacts, nameOf, resolveRelative, wordsOf } from "./apo-ui-publish-census.js";

export const BEAD = "wb-021.2";
export const REQUIREMENT = "MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2";

/** The six APO-020 view classes, in the order the export title's parenthesis lists them. */
export const VIEW_CLASSES: readonly string[] = [
  "operational decision graph",
  "epistemic why-not/completeness",
  "policy gradient/credit",
  "developmental ancestry",
  "resource pressure",
  "certificate dependency",
];

/** The EFFECT families: the statement's and the acceptance's verbs, each with its inflections (wordsOf words). */
export const EFFECT_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  execute: ["execute", "executes", "executed", "executing", "execution", "executions"],
  retry: ["retry", "retries", "retried", "retrying"],
  admit: ["admit", "admits", "admitted", "admitting", "admission", "admissions"],
  mutate: ["mutate", "mutates", "mutated", "mutating", "mutation", "mutations"],
  invoke: ["invoke", "invokes", "invoked", "invoking", "invocation", "invocations"],
  write: ["write", "writes", "wrote", "written", "writing", "writer", "writers"],
};

/** One of Pi's effect seams: a src class, interface or module whose public members are classified read or effect. */
export interface Seam {
  readonly file: string;
  readonly kind: "class" | "interface" | "exports";
  /** The class or interface name; for an exports seam, the module's name. */
  readonly name: string;
  readonly read: readonly string[];
  readonly effect: readonly string[];
}
export const SEAMS: readonly Seam[] = [
  {
    file: "src/workbench/observation.ts",
    kind: "class",
    name: "ObservationProjection",
    read: ["aggregate", "aggregateStats", "events", "identityRefusals", "indexOf", "query", "relationRevision", "relations", "relationsPage", "stats", "truncation", "window"],
    effect: ["disconnect", "ingest", "markStale", "reconnect", "refresh", "relate"],
  },
  {
    file: "src/workbench/capability-registry.ts",
    kind: "class",
    name: "CapabilityRegistry",
    read: ["admission", "catalogSnapshot", "discover", "effectClassOf"],
    effect: ["inspect", "invoke", "register"],
  },
  { file: "src/workbench/capability-registry.ts", kind: "interface", name: "CapabilityProvider", read: ["descriptor"], effect: ["inspect", "invoke"] },
  { file: "src/workflow/journal.ts", kind: "exports", name: "journal", read: ["journalKey", "nodeJournalKey", "readJournal"], effect: ["appendJournal"] },
];
/** Every SEAM effect name, sorted and unique: an EFFECT text when it is a closure text's whole text. */
export const SEAM_EFFECTS: readonly string[] = [...new Set(SEAMS.flatMap(seam => seam.effect))].sort();

/** The free names a closure may reference: built-ins that hold no capability, journal or native route. */
export const ADMITTED_FREE: readonly string[] = [
  "Array",
  "Boolean",
  "Date",
  "Error",
  "Infinity",
  "Int32Array",
  "Intl",
  "JSON",
  "Map",
  "Math",
  "NaN",
  "Number",
  "Object",
  "Promise",
  "RangeError",
  "RegExp",
  "Set",
  "String",
  "Symbol",
  "TypeError",
  "Uint8Array",
  "WeakMap",
  "WeakSet",
  "arguments",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "undefined",
];

/** An EFFECT reading: "<family>:<word>" for the first family (in EFFECT_FAMILIES order) a word of the text belongs to, else "seam:<name>" when the whole text is a SEAM effect name; undefined otherwise. */
export function effectReading(text: string): string | undefined {
  const words = wordsOf(text);
  for (const [family, forms] of Object.entries(EFFECT_FAMILIES)) {
    const word = words.find(candidate => forms.includes(candidate));
    if (word !== undefined) return `${family}:${word}`;
  }
  return SEAM_EFFECTS.includes(text) ? `seam:${text}` : undefined;
}

export interface Text {
  readonly line: number;
  readonly source: "name" | "literal";
  readonly text: string;
}

/** The folded value of a "+" chain whose operands are all string literals (parenthesized or not), else undefined. */
function folded(node: ts.Expression): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return folded(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = folded(node.left);
    const right = folded(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  return undefined;
}

const isPlusChain = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;

/** Every text the EFFECT and CONSTRUCTOR readings read in one parsed module (see the module header). */
export function textsOf(sf: ts.SourceFile): Text[] {
  const texts: Text[] = [];
  const lineOf = (node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) texts.push({ line: lineOf(node), source: "name", text: nameOf(node) });
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) texts.push({ line: lineOf(node), source: "literal", text: node.text });
    if (isPlusChain(node) && !isPlusChain(node.parent)) {
      const value = folded(node);
      if (value !== undefined) texts.push({ line: lineOf(node), source: "literal", text: value });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return texts;
}

/** An identifier that names a property, a label or a meta-property rather than a binding: never a free-name reference. */
function isPropertyName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isQualifiedName(parent) && parent.right === node) ||
    (ts.isBindingElement(parent) && parent.propertyName === node) ||
    (ts.isImportSpecifier(parent) && parent.propertyName === node) ||
    (ts.isLabeledStatement(parent) && parent.label === node) ||
    (ts.isBreakOrContinueStatement(parent) && parent.label === node) ||
    (ts.isMetaProperty(parent) && parent.name === node) ||
    (ts.isImportAttribute(parent) && parent.name === node)
  );
}

/** A declaration in an ambient context: under a declare modifier, its own or an enclosing node's. */
function isAmbient(declaration: ts.Node): boolean {
  for (let current: ts.Node | undefined = declaration; current !== undefined; current = current.parent) {
    if (ts.canHaveModifiers(current) && (ts.getModifiers(current) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword)) return true;
  }
  return false;
}

/** The free names of one module of a checked program (see the module header: GLOBAL), each with its line. */
function freeNamesOf(sf: ts.SourceFile, checker: ts.TypeChecker, tree: ReadonlySet<string>): { readonly line: number; readonly name: string }[] {
  const out: { readonly line: number; readonly name: string }[] = [];
  const declaredInTree = (symbol: ts.Symbol | undefined): boolean =>
    (symbol?.declarations ?? []).some(declaration => tree.has(resolve(declaration.getSourceFile().fileName)) && !isAmbient(declaration));
  const report = (node: ts.Identifier, symbol: ts.Symbol | undefined): void => {
    const name = nameOf(node);
    if (!declaredInTree(symbol) && !ADMITTED_FREE.includes(name)) out.push({ line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1, name });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(node.parent.parent) || ts.isClassExpression(node.parent.parent))) {
      visit(node.expression);
      return;
    }
    if (ts.isTypeNode(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || (ts.isHeritageClause(node) && node.token === ts.SyntaxKind.ImplementsKeyword)) return;
    if (ts.isExportSpecifier(node)) {
      // A local export reads its local name (the property name when aliased); an export-from names no local binding.
      const local = node.propertyName ?? node.name;
      if (node.parent.parent.moduleSpecifier === undefined && ts.isIdentifier(local)) report(local, checker.getExportSpecifierLocalTargetSymbol(node));
      return;
    }
    if (ts.isIdentifier(node) && !isPropertyName(node)) {
      const parent = node.parent;
      report(node, ts.isShorthandPropertyAssignment(parent) && parent.name === node ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(node));
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

export interface Tree {
  readonly root: string;
  /** Every file of the tree, relative to root (posix). */
  readonly files: readonly string[];
}
export interface Judgment {
  readonly facts: ReadonlyMap<string, ModuleFacts>;
  /** The APO view modules: the tree's modules whose ROLE reading reads a text. */
  readonly views: readonly string[];
  readonly findings: readonly string[];
}

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
  for (const entry of facts.values()) if (!entry.ok) findings.add(`UNREADABLE ${entry.why}`);
  const views = files.filter(file => factsOf(file).roles.length > 0);
  /** The runtime closure of one view: every module reached, with the route that first reached it. */
  const closure = (view: string): Map<string, string> => {
    const routes = new Map<string, string>([[view, view]]);
    const queue = [view];
    while (queue.length > 0) {
      const current = queue.shift() as string;
      const route = routes.get(current) ?? current;
      for (const edge of factsOf(current).edges) {
        if (edge.typeOnly) continue;
        if (edge.specifier === undefined) {
          findings.add(`UNRESOLVED ${view} -> ${current}:${edge.line} ${edge.kind} <computed> via ${route}`);
          continue;
        }
        if (!edge.specifier.startsWith(".")) {
          findings.add(`PACKAGE ${view} -> ${current}:${edge.line} ${edge.kind} ${edge.specifier} via ${route}`);
          continue;
        }
        const target = resolveRelative(known, current, edge.specifier);
        if (target === undefined) {
          findings.add(`UNRESOLVED ${view} -> ${current}:${edge.line} ${edge.kind} ${edge.specifier} via ${route}`);
          continue;
        }
        if (!routes.has(target)) {
          routes.set(target, `${route} -${edge.kind}-> ${target}`);
          queue.push(target);
        }
      }
    }
    return routes;
  };
  const closures = views.map(view => [view, closure(view)] as const);
  const judged = [...new Set(closures.flatMap(([, routes]) => [...routes.keys()]))].filter(file => factsOf(file).ok).sort();
  const treeFiles = new Set(judged.map(file => resolve(join(tree.root, file))));
  const program = ts.createProgram({
    rootNames: judged.map(file => join(tree.root, file)),
    options: { noLib: true, noResolve: true, types: [], noEmit: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  });
  const checker = program.getTypeChecker();
  const sourceOf = (file: string): ts.SourceFile => {
    const sf = program.getSourceFile(join(tree.root, file));
    if (sf === undefined) throw new Error(`${file} is not in the checked program`);
    return sf;
  };
  for (const [view, routes] of closures) {
    for (const [module, route] of routes) {
      if (!factsOf(module).ok) continue;
      const sf = sourceOf(module);
      for (const text of textsOf(sf)) {
        const reading = effectReading(text.text);
        if (reading !== undefined) findings.add(`EFFECT ${view} -> ${module}:${text.line} ${text.source} ${JSON.stringify(text.text)} (${reading}) via ${route}`);
        if (text.text === "constructor") findings.add(`CONSTRUCTOR ${view} -> ${module}:${text.line} ${text.source} via ${route}`);
      }
      for (const free of freeNamesOf(sf, checker, treeFiles)) findings.add(`GLOBAL ${view} -> ${module}:${free.line} ${free.name} via ${route}`);
    }
  }
  return { facts, views, findings: [...findings].sort() };
}

/** A member-name's text (see the module header: SEAMS): undefined for a private name, which the seam reader leaves out. */
function memberName(name: ts.PropertyName | undefined): string | undefined {
  if (name === undefined) return "<unnamed>";
  if (ts.isPrivateIdentifier(name)) return undefined;
  if (ts.isIdentifier(name)) return nameOf(name);
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && (ts.isStringLiteralLike(name.expression) || ts.isNumericLiteral(name.expression))) return name.expression.text;
  return "<computed>";
}

const isPrivate = (node: ts.Node): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword);
const isExported = (node: ts.Node): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);

/** The public members of one seam in one parsed source (see the module header: SEAMS), sorted and unique; ["<missing>"] when the seam is not declared. */
export function seamMembers(sf: ts.SourceFile, seam: Pick<Seam, "kind" | "name">): string[] {
  const members = new Set<string>();
  let found = false;
  const add = (name: string | undefined): void => {
    if (name !== undefined) members.add(name);
  };
  const bindings = (name: ts.BindingName): void => {
    if (ts.isIdentifier(name)) add(nameOf(name));
    else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bindings(element.name);
  };
  for (const statement of sf.statements) {
    if (seam.kind === "class" && ts.isClassDeclaration(statement) && statement.name !== undefined && nameOf(statement.name) === seam.name) {
      found = true;
      for (const member of statement.members) {
        if (ts.isConstructorDeclaration(member) || ts.isSemicolonClassElement(member) || ts.isClassStaticBlockDeclaration(member) || isPrivate(member)) continue;
        if (ts.isIndexSignatureDeclaration(member)) add("<index>");
        else add(memberName(member.name));
      }
    }
    if (seam.kind === "interface" && ts.isInterfaceDeclaration(statement) && nameOf(statement.name) === seam.name) {
      found = true;
      for (const member of statement.members) {
        if (ts.isIndexSignatureDeclaration(member)) add("<index>");
        else if (ts.isCallSignatureDeclaration(member)) add("<call>");
        else if (ts.isConstructSignatureDeclaration(member)) add("<new>");
        else add(memberName(member.name));
      }
    }
    if (seam.kind === "exports") {
      found = true;
      if (ts.isExportAssignment(statement)) add("default");
      else if (ts.isExportDeclaration(statement)) {
        const clause = statement.exportClause;
        if (statement.isTypeOnly) continue;
        if (statement.moduleSpecifier !== undefined || clause === undefined || !ts.isNamedExports(clause)) add("<re-export>");
        else for (const element of clause.elements) if (!element.isTypeOnly) add(ts.isIdentifier(element.name) ? nameOf(element.name) : "<export>");
      } else if (isExported(statement)) {
        if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) continue;
        if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement)) && statement.name !== undefined) add(nameOf(statement.name));
        else if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) add("default");
        else if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) bindings(declaration.name);
        else add("<export>");
      }
    }
  }
  return found ? [...members].sort() : ["<missing>"];
}

/** The public members of one seam as src declares them now. */
export function liveSeamMembers(root: string, seam: Seam): string[] {
  const sf = ts.createSourceFile(seam.file, readFileSync(join(root, seam.file), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return seamMembers(sf, seam);
}

/** A row's pin as the roster holds it: the SHA-256 of the pin as written (its JSON). */
export const pinDigest = (pin: unknown): string => createHash("sha256").update(JSON.stringify(pin)).digest("hex");

/** A live pin: judged on the repository as it stands. */
export interface LivePin {
  readonly kind: "live";
  readonly id: string;
  readonly what: string;
  readonly expect: unknown;
}
/** A plant pin: a planted tree (written to rule-11 scratch), judged through the same judgeTree as the real one. */
export interface PlantPin {
  readonly kind: "plant";
  readonly id: string;
  readonly what: string;
  readonly files: Readonly<Record<string, string>>;
  /** Repository files copied byte-for-byte into the planted tree, each judged as it stands. */
  readonly copies?: readonly string[];
  readonly views: readonly string[];
  readonly findings: readonly string[];
}
/** A reading pin: texts judged by effectReading alone, each with its expected reading or null. */
export interface ReadingPin {
  readonly kind: "reading";
  readonly id: string;
  readonly what: string;
  readonly readings: Readonly<Record<string, string | null>>;
}
/** A seam pin: one planted source, read by seamMembers for one seam, with the members expected. */
export interface SeamPin {
  readonly kind: "seam";
  readonly id: string;
  readonly what: string;
  readonly seam: Pick<Seam, "kind" | "name">;
  readonly source: string;
  readonly members: readonly string[];
}
export type Pin = LivePin | PlantPin | ReadingPin | SeamPin;
export interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

export const SRC_FLOOR = 100;

const HOST = 'import type { Host } from "./host.js";';
const PROJECTION = 'import type { ObservationProjection } from "../workbench/observation.js";';
const REDACTION = 'import { sanitizeWorkbenchText } from "../workbench/redaction.js";';
const REDACTION_FILE = "src/workbench/redaction.ts";
/** A planted APO view: its title names the program and the view class, its handler body runs on input. */
const view = (title: string, imports: readonly string[], body: readonly string[], extra: readonly string[] = []): string =>
  [
    ...imports,
    `export const VIEW_TITLE = ${JSON.stringify(title)};`,
    ...extra,
    "export class View {",
    "  private selected = 0;",
    "  constructor(private readonly host: Host) {}",
    "  handleInput(data: string): void {",
    ...body.map(line => `    ${line}`),
    "  }",
    "}",
    "",
  ].join("\n");
const V = "src/apo/view.ts";

/** The judged rows: L, V and N tile the export title's statement; P and Z tile the owner filing's acceptance; R holds the readings; S the seams; Q the residuals. */
export const ROWS: readonly Row[] = [
  {
    id: "L",
    label:
      "When Pi presents any APO-020 view class (operational decision graph, epistemic why-not/completeness, policy gradient/credit, developmental ancestry, resource pressure, certificate dependency),",
    pins: [
      {
        kind: "live",
        id: "L1-src",
        what: "the src tree: every git-listed src file is TypeScript and readable, at least the floor of them, and none presents APO state (ARMED: the first module that names the program reds here, and its view must then be pinned)",
        expect: { views: [], findings: [] },
      },
      {
        kind: "plant",
        id: "L2-name",
        what: "a module naming the program by the abbreviation in a name only presents APO state",
        files: { [V]: ["export const apoTitle = 1;", "export function render(): string {", '  return "decision graph";', "}", ""].join("\n") },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "L3-literal",
        what: "a module naming the program by its slug in a literal only presents APO state",
        files: { [V]: ["export function render(): string {", '  return "adaptive policy organizations: resource pressure";', "}", ""].join("\n") },
        views: [V],
        findings: [],
      },
    ],
  },
  {
    id: "V",
    label: "the view renders read-only snapshots of recorded MW state and never actuates:",
    pins: [
      {
        kind: "plant",
        id: "V-decision-graph",
        what: "an operational decision graph view reading the projection through window and relationsPage, display through sanitizeWorkbenchText, is admitted",
        copies: [REDACTION_FILE],
        files: {
          [V]: [
            PROJECTION,
            REDACTION,
            'export const VIEW_TITLE = "APO operational decision graph";',
            'type Reader = Pick<ObservationProjection, "window" | "relationsPage">;',
            "export class DecisionGraphView {",
            "  private selected = 0;",
            "  constructor(private readonly reader: Reader) {}",
            "  render(width: number): string[] {",
            "    const page = this.reader.window({});",
            `    const lines = page.nodes.map((node, index) => \`\${index === this.selected ? ">" : " "} \${node.label}\`);`,
            '    return lines.map(line => sanitizeWorkbenchText(line, width, "label"));',
            "  }",
            "  handleInput(data: string): void {",
            '    if (data === "j") this.selected = Math.min(this.selected + 1, 9);',
            '    if (data === "k") this.selected = Math.max(this.selected - 1, 0);',
            "  }",
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-why-not",
        what: "an epistemic why-not/completeness view over a recorded snapshot (plain data), display through sanitizeWorkbenchText, is admitted",
        copies: [REDACTION_FILE],
        files: {
          [V]: [
            REDACTION,
            'export const VIEW_TITLE = "APO epistemic why-not/completeness";',
            "export interface Snapshot {",
            "  readonly reasons: readonly { readonly claim: string; readonly because: string }[];",
            "  readonly complete: boolean;",
            "}",
            "export function render(snapshot: Snapshot, width: number): string[] {",
            '  const head = snapshot.complete ? "complete" : "incomplete";',
            `  const lines = [head, ...snapshot.reasons.map(reason => \`\${reason.claim}: \${reason.because}\`)];`,
            '  return lines.map(line => sanitizeWorkbenchText(line, width, "label"));',
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-gradient",
        what: "a policy gradient/credit view drawing bars from a recorded snapshot is admitted",
        files: {
          [V]: [
            'export const VIEW_TITLE = "APO policy gradient/credit";',
            "export function bars(credit: readonly number[], width: number): string[] {",
            "  const top = Math.max(1, ...credit.map(value => Math.abs(value)));",
            '  return credit.map(value => "#".repeat(Math.round((Math.abs(value) / top) * width)));',
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-ancestry",
        what: "a developmental ancestry view walking the projection's relations is admitted",
        files: {
          [V]: [
            PROJECTION,
            'export const VIEW_TITLE = "APO developmental ancestry";',
            'export function ancestry(reader: Pick<ObservationProjection, "relations">, id: string): string[] {',
            "  return reader.relations(id).map(relation => relation.from);",
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-pressure",
        what: "a resource pressure view reading the projection's stats is admitted",
        files: {
          [V]: [
            PROJECTION,
            'export const VIEW_TITLE = "APO resource pressure";',
            'export function pressure(reader: Pick<ObservationProjection, "stats">): string {',
            "  const stats = reader.stats();",
            `  return \`\${stats.nodes} nodes\`;`,
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-certificate",
        what: "a certificate dependency view reading the projection through query is admitted",
        files: {
          [V]: [
            PROJECTION,
            'export const VIEW_TITLE = "APO certificate dependency";',
            'export function dependencies(reader: Pick<ObservationProjection, "query">): number {',
            "  return reader.query({}).length;",
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-admitted-free",
        what: "every ADMITTED_FREE name referenced once by a view is admitted",
        files: {
          [V]: [
            'export const VIEW_TITLE = "APO resource pressure";',
            "export function builtins(): unknown[] {",
            "  return [",
            "    Array, Boolean, Date, Error, Infinity, Int32Array, Intl, JSON, Map, Math, NaN, Number, Object, Promise, RangeError,",
            "    RegExp, Set, String, Symbol, TypeError, Uint8Array, WeakMap, WeakSet, arguments, isFinite, isNaN, parseFloat,",
            "    parseInt, undefined,",
            "  ];",
            "}",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "V-type-only",
        what: "type-only edges are erased: an import type, an import whose every specifier is type-only, an export type and an import type x = require(...) are not followed (none of their targets is in the tree)",
        files: {
          [V]: [
            'import type { CapabilityRegistry } from "../workbench/capability-registry.js";',
            'import { type WorkflowJournalEntry } from "../workflow/journal.js";',
            'export type { ObservedNode } from "../workbench/observation.js";',
            'import type Native = require("../workbench/native-modules.js");',
            'export const VIEW_TITLE = "APO certificate dependency";',
            "export type Held = [CapabilityRegistry, WorkflowJournalEntry, Native];",
            "",
          ].join("\n"),
        },
        views: [V],
        findings: [],
      },
    ],
  },
  {
    id: "N",
    label: "no view interaction executes, retries, admits an event, or mutates policy/organization state \\u2014 acceptance gate 'snapshot not actuation'.",
    pins: [
      {
        kind: "plant",
        id: "N-execute",
        what: "a view interaction that executes reds (execute)",
        files: { [V]: view("APO operational decision graph", [HOST], ["this.host.executeDecision(this.selected);"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "executeDecision" (execute:execute) via ${V}`],
      },
      {
        kind: "plant",
        id: "N-retry",
        what: "a view interaction that retries reds (retry)",
        files: { [V]: view("APO developmental ancestry", [HOST], ["this.host.retries.push(this.selected);"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "retries" (retry:retries) via ${V}`],
      },
      {
        kind: "plant",
        id: "N-admit",
        what: "a view interaction that admits an event reds (admit)",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.admitEvent(data);"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "admitEvent" (admit:admit) via ${V}`],
      },
      {
        kind: "plant",
        id: "N-admit-projection",
        what: "a view interaction that admits an event through the projection's admission member reds (seam:ingest)",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.ingest({ kind: data });"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "ingest" (seam:ingest) via ${V}`],
      },
      {
        kind: "plant",
        id: "N-mutate",
        what: "a view interaction that mutates policy/organization state reds (mutate)",
        files: { [V]: view("APO policy gradient/credit", [HOST], ["this.host.mutated = true;"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "mutated" (mutate:mutated) via ${V}`],
      },
    ],
  },
  {
    id: "P",
    label: "per-view interaction falsifier — every handler path is projection-read-only",
    pins: [
      {
        kind: "plant",
        id: "P-decision-graph",
        what: "an operational decision graph view whose handler marks the projection stale in the view module itself reds (seam:markStale)",
        files: { [V]: view("APO operational decision graph", [HOST], ["this.host.projection.markStale(String(this.selected));"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "markStale" (seam:markStale) via ${V}`],
      },
      {
        kind: "plant",
        id: "P-why-not",
        what: "an epistemic why-not/completeness view whose handler reaches a capability invoke through a static import reds in the helper (invoke)",
        files: {
          [V]: view("APO epistemic why-not/completeness", [HOST, 'import { explain } from "./why-not-ops.js";'], ["explain(this.host);"]),
          "src/apo/why-not-ops.ts": ["export function explain(host: { call(id: string): void }): void {", '  host.call("invoke");', "}", ""].join("\n"),
        },
        views: [V],
        findings: [`EFFECT ${V} -> src/apo/why-not-ops.ts:2 literal "invoke" (invoke:invoke) via ${V} -static-> src/apo/why-not-ops.ts`],
      },
      {
        kind: "plant",
        id: "P-gradient",
        what: "a policy gradient/credit view whose handler reaches a retry through a re-export reds in the re-exported module (retry)",
        files: {
          [V]: view("APO policy gradient/credit", [HOST, 'import { credit } from "./barrel.js";'], ["credit();"]),
          "src/apo/barrel.ts": ['export { credit } from "./credit-ops.js";', ""].join("\n"),
          "src/apo/credit-ops.ts": ["export function credit(): string {", '  return "retrying";', "}", ""].join("\n"),
        },
        views: [V],
        findings: [`EFFECT ${V} -> src/apo/credit-ops.ts:2 literal "retrying" (retry:retrying) via ${V} -static-> src/apo/barrel.ts -export-from-> src/apo/credit-ops.ts`],
      },
      {
        kind: "plant",
        id: "P-ancestry",
        what: "a developmental ancestry view whose handler reaches a journal write through a dynamic import reds in the loaded module (write)",
        files: {
          [V]: view("APO developmental ancestry", [HOST], ['void import("./ancestry-ops.js");']),
          "src/apo/ancestry-ops.ts": ['export const NOTE = "journal writer";', ""].join("\n"),
        },
        views: [V],
        findings: [`EFFECT ${V} -> src/apo/ancestry-ops.ts:1 literal "journal writer" (write:writer) via ${V} -dynamic-> src/apo/ancestry-ops.ts`],
      },
      {
        kind: "plant",
        id: "P-pressure",
        what: "a resource pressure view whose handler reaches an admission through require reds in the required module (admit) and on the free name require",
        files: {
          [V]: view("APO resource pressure", [HOST], ['require("./pressure-ops.js");']),
          "src/apo/pressure-ops.ts": ['export const NOTE = "admitted";', ""].join("\n"),
        },
        views: [V],
        findings: [
          `EFFECT ${V} -> src/apo/pressure-ops.ts:1 literal "admitted" (admit:admitted) via ${V} -require-> src/apo/pressure-ops.ts`,
          `GLOBAL ${V} -> ${V}:7 require via ${V}`,
        ],
      },
      {
        kind: "plant",
        id: "P-certificate",
        what: "a certificate dependency view whose handler reaches a mutation through import x = require(...) reds in that module (mutate)",
        files: {
          [V]: view("APO certificate dependency", [HOST, 'import ops = require("./certificate-ops.js");'], ["void ops;"]),
          "src/apo/certificate-ops.ts": ['export const NOTE = "mutation";', ""].join("\n"),
        },
        views: [V],
        findings: [`EFFECT ${V} -> src/apo/certificate-ops.ts:1 literal "mutation" (mutate:mutation) via ${V} -import-equals-> src/apo/certificate-ops.ts`],
      },
    ],
  },
  {
    id: "Z",
    label: "with zero capability invokes and zero journal/native writes.",
    pins: [
      {
        kind: "plant",
        id: "Z-invoke",
        what: "a capability invoke reds (invoke)",
        files: { [V]: view("APO certificate dependency", [HOST], ['void this.host.registry.invoke("cap", {}, this.host.context);']) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "invoke" (invoke:invoke) via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-inspect",
        what: "a capability inspect reds (seam:inspect)",
        files: { [V]: view("APO certificate dependency", [HOST], ['void this.host.registry.inspect("cap", {});']) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "inspect" (seam:inspect) via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-register",
        what: "a capability registration reds (seam:register)",
        files: { [V]: view("APO certificate dependency", [HOST], ["this.host.registry.register(this.host.provider);"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "register" (seam:register) via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-journal",
        what: "a journal write handed in reds (seam:appendJournal)",
        files: { [V]: view("APO developmental ancestry", [HOST], ['this.host.appendJournal("journal.jsonl", data);']) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "appendJournal" (seam:appendJournal) via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-journal-module",
        what: "a journal module in the closure reds on its fs import alone, its writer named outside the EFFECT families",
        files: {
          [V]: view("APO developmental ancestry", [HOST, 'import { record } from "../workflow/journal.js";'], ["record(data);"]),
          "src/workflow/journal.ts": ['import { appendFileSync } from "node:fs";', "export function record(line: string): void {", '  appendFileSync("journal.jsonl", line);', "}", ""].join("\n"),
        },
        views: [V],
        findings: [`PACKAGE ${V} -> src/workflow/journal.ts:1 static node:fs via ${V} -static-> src/workflow/journal.ts`],
      },
      {
        kind: "plant",
        id: "Z-native-fs",
        what: "a native file write reds on the builtin import and on the writer's name (write)",
        files: { [V]: view("APO operational decision graph", [HOST, 'import { writeFileSync } from "node:fs";'], ['writeFileSync("out.txt", data);']) },
        views: [V],
        findings: [
          `EFFECT ${V} -> ${V}:2 name "writeFileSync" (write:write) via ${V}`,
          `EFFECT ${V} -> ${V}:8 name "writeFileSync" (write:write) via ${V}`,
          `PACKAGE ${V} -> ${V}:2 static node:fs via ${V}`,
        ],
      },
      {
        kind: "plant",
        id: "Z-native-child",
        what: "a native process spawn reds on the builtin import alone",
        files: { [V]: view("APO operational decision graph", [HOST, 'import { spawn } from "node:child_process";'], ['spawn("git", ["status"]);']) },
        views: [V],
        findings: [`PACKAGE ${V} -> ${V}:2 static node:child_process via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-native-client",
        what: "a native client package reds on its import alone",
        files: { [V]: view("APO operational decision graph", [HOST, 'import { FurnaceClient } from "@furnace/sdk";'], ["void FurnaceClient;"]) },
        views: [V],
        findings: [`PACKAGE ${V} -> ${V}:2 static @furnace/sdk via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-global-process",
        what: "a native signal through the free name process reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"]) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:7 process via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-global-fetch",
        what: "a network call through the free name fetch reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['void fetch("http://127.0.0.1:9/fake");']) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:7 fetch via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-global-code",
        what: "code built at run time through the free names Function and eval reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['new Function("return 1");', 'eval("1");']) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:7 Function via ${V}`, `GLOBAL ${V} -> ${V}:8 eval via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-global-this",
        what: "the global object through the free name globalThis reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void globalThis.navigator;"]) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:7 globalThis via ${V}`],
      },
      {
        kind: "plant",
        id: "Z-constructor",
        what: "a code constructor reached through constructor reds (CONSTRUCTOR)",
        files: { [V]: view("APO resource pressure", [HOST], ['void (() => 0).constructor("return 1");']) },
        views: [V],
        findings: [`CONSTRUCTOR ${V} -> ${V}:7 name via ${V}`],
      },
    ],
  },
  {
    id: "R",
    label: "the judge's readings, each failing closed",
    pins: [
      {
        kind: "reading",
        id: "R-families",
        what: "every member of every EFFECT family, and every SEAM effect name, written out; the near-words read nothing",
        readings: {
          execute: "execute:execute",
          executes: "execute:executes",
          executed: "execute:executed",
          executing: "execute:executing",
          execution: "execute:execution",
          executions: "execute:executions",
          retry: "retry:retry",
          retries: "retry:retries",
          retried: "retry:retried",
          retrying: "retry:retrying",
          admit: "admit:admit",
          admits: "admit:admits",
          admitted: "admit:admitted",
          admitting: "admit:admitting",
          admission: "admit:admission",
          admissions: "admit:admissions",
          mutate: "mutate:mutate",
          mutates: "mutate:mutates",
          mutated: "mutate:mutated",
          mutating: "mutate:mutating",
          mutation: "mutate:mutation",
          mutations: "mutate:mutations",
          invoke: "invoke:invoke",
          invokes: "invoke:invokes",
          invoked: "invoke:invoked",
          invoking: "invoke:invoking",
          invocation: "invoke:invocation",
          invocations: "invoke:invocations",
          write: "write:write",
          writes: "write:writes",
          wrote: "write:wrote",
          written: "write:written",
          writing: "write:writing",
          writer: "write:writer",
          writers: "write:writers",
          appendJournal: "seam:appendJournal",
          disconnect: "seam:disconnect",
          ingest: "seam:ingest",
          inspect: "seam:inspect",
          markStale: "seam:markStale",
          reconnect: "seam:reconnect",
          refresh: "seam:refresh",
          register: "seam:register",
          relate: "seam:relate",
          exec: null,
          rewrite: null,
          retryable: null,
          inspector: null,
          ingested: null,
          registerCommand: null,
          window: null,
        },
      },
      {
        kind: "reading",
        id: "R-words",
        what: "words are read by wordsOf (camelCase, acronym, digit and case splits); the first family in order wins; a seam name reads only as a whole text",
        readings: {
          retryAndWrite: "retry:retry",
          WRITEJournal: "write:write",
          node2invoke: "invoke:invoke",
          "markStale now": null,
          "refresh rate": null,
          "relate to": null,
          "Execute it": "execute:execute",
        },
      },
      {
        kind: "plant",
        id: "R-escaped",
        what: "a name is read by nameOf: an effect name spelled only with a four-digit escape reds",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.\\u0069nvoke();"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "invoke" (invoke:invoke) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-escaped-scanner",
        what: "a name is read by nameOf, not node.text: the scanner shape (a four-digit escape, plain letters, then a braced escape) reds",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.\\u0069nvok\\u{65}();"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 name "invoke" (invoke:invoke) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-private",
        what: "a private name holding an effect word reds",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ["class Holder {", "  #retryLater(): void {}", "}", "void Holder;"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:4 name "#retryLater" (retry:retry) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-literal",
        what: "a string literal (an element access key) holding an effect name reds",
        files: { [V]: view("APO resource pressure", [HOST], ['void this.host["markStale"];']) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 literal "markStale" (seam:markStale) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-template",
        what: "a no-substitution template holding an effect name reds",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.host[`relate`];"]) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 literal "relate" (seam:relate) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-template-parts",
        what: "a template's head, middle and tail are each read",
        files: { [V]: view("APO resource pressure", [HOST], [`void \`execute \${data} retry \${data} write\`;`]) },
        views: [V],
        findings: [
          `EFFECT ${V} -> ${V}:7 literal " retry " (retry:retry) via ${V}`,
          `EFFECT ${V} -> ${V}:7 literal " write" (write:write) via ${V}`,
          `EFFECT ${V} -> ${V}:7 literal "execute " (execute:execute) via ${V}`,
        ],
      },
      {
        kind: "plant",
        id: "R-folded",
        what: "a + chain of string literals is read folded",
        files: { [V]: view("APO resource pressure", [HOST], ['void this.host["re" + "connect"];']) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 literal "reconnect" (seam:reconnect) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-folded-parenthesized",
        what: "a + chain whose operands are parenthesized is read folded",
        files: { [V]: view("APO resource pressure", [HOST], ['void this.host[("dis") + ("connect")];']) },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:7 literal "disconnect" (seam:disconnect) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-type-position",
        what: "a type position is read: a reader picking an admission member holds an admission handle and reds",
        files: { [V]: [PROJECTION, 'export const VIEW_TITLE = "APO resource pressure";', 'export type Reader = Pick<ObservationProjection, "refresh">;', ""].join("\n") },
        views: [V],
        findings: [`EFFECT ${V} -> ${V}:3 literal "refresh" (seam:refresh) via ${V}`],
      },
      {
        kind: "plant",
        id: "R-unresolved",
        what: "a relative runtime edge resolving to no file of the tree reds (UNRESOLVED)",
        files: { [V]: view("APO resource pressure", [HOST, 'import { missing } from "./missing.js";'], ["void missing;"]) },
        views: [V],
        findings: [`UNRESOLVED ${V} -> ${V}:2 static ./missing.js via ${V}`],
      },
      {
        kind: "plant",
        id: "R-computed",
        what: "a computed dynamic import and a computed require each red (UNRESOLVED <computed>)",
        files: { [V]: view("APO resource pressure", [HOST], ["void import(data);", "require(data);"]) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:8 require via ${V}`, `UNRESOLVED ${V} -> ${V}:7 dynamic <computed> via ${V}`, `UNRESOLVED ${V} -> ${V}:8 require <computed> via ${V}`],
      },
      {
        kind: "plant",
        id: "R-unreadable",
        what: "a module of the tree that does not parse reds whether or not a view reaches it (UNREADABLE)",
        files: { "src/apo/broken.ts": ["export const = ;", ""].join("\n") },
        views: [],
        findings: ["UNREADABLE src/apo/broken.ts: the file does not parse: Variable declaration expected. at line 1:14"],
      },
      {
        kind: "plant",
        id: "R-closure-builtin",
        what: "a closure module importing a pure builtin reds (no specifier is admitted)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { label } from "./label.js";'], ["void label;"]),
          "src/apo/label.ts": ['import { basename } from "node:path";', 'export const label = basename("a/b");', ""].join("\n"),
        },
        views: [V],
        findings: [`PACKAGE ${V} -> src/apo/label.ts:1 static node:path via ${V} -static-> src/apo/label.ts`],
      },
      {
        kind: "plant",
        id: "R-shorthand",
        what: "a shorthand property reads its value: { process } reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void { process };"]) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:7 process via ${V}`],
      },
      {
        kind: "plant",
        id: "R-export-local",
        what: "a local export specifier reads its local name: export { process } and export { fetch as get } red on process and fetch (GLOBAL)",
        files: { [V]: [HOST, 'export const VIEW_TITLE = "APO resource pressure";', "export { process };", "export { fetch as get };", ""].join("\n") },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:3 process via ${V}`, `GLOBAL ${V} -> ${V}:4 fetch via ${V}`],
      },
      {
        kind: "plant",
        id: "R-ambient",
        what: "a name only an ambient declaration declares is free, under its own declare (declare const) or an enclosing one (declare global): each reds at the declaration and at the use, and the global augmentation itself reds (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["process.kill(1);", "nativeHook.kill(2);"],
            ["declare const process: { kill(pid: number): void };", "declare global {", "  const nativeHook: { kill(pid: number): void };", "}"],
          ),
        },
        views: [V],
        findings: [
          `GLOBAL ${V} -> ${V}:3 process via ${V}`,
          `GLOBAL ${V} -> ${V}:4 global via ${V}`,
          `GLOBAL ${V} -> ${V}:5 nativeHook via ${V}`,
          `GLOBAL ${V} -> ${V}:11 process via ${V}`,
          `GLOBAL ${V} -> ${V}:12 nativeHook via ${V}`,
        ],
      },
      {
        kind: "plant",
        id: "R-extends",
        what: "a class's extends expression is a value: class extends Function reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ["class Code extends Function {}", "void Code;"]) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:3 Function via ${V}`],
      },
      {
        kind: "plant",
        id: "R-closure-global",
        what: "a free name in a closure module (not the view) reds there (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { stop } from "./stop.js";'], ["stop();"]),
          "src/apo/stop.ts": ["export function stop(): void {", "  process.exitCode = 1;", "}", ""].join("\n"),
        },
        views: [V],
        findings: [`GLOBAL ${V} -> src/apo/stop.ts:2 process via ${V} -static-> src/apo/stop.ts`],
      },
      {
        kind: "plant",
        id: "R-global-escaped",
        what: "a free name is read by nameOf: process in the scanner shape reds as process (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void \\u0070roces\\u{73};"]) },
        views: [V],
        findings: [`GLOBAL ${V} -> ${V}:7 process via ${V}`],
      },
      {
        kind: "plant",
        id: "R-not-references",
        what: "names that are not binding references stay quiet: an import alias's imported name and an export-from specifier (each naming an export the module lacks, so neither resolves), an import attribute, a qualified name's right side, a binding element's property name, labels, and the meta-properties import.meta and new.target",
        files: {
          [V]: [
            HOST,
            'import { absent as title } from "./label-ops.js";',
            'import data from "./label-ops.js" with { type: "json" };',
            'export { absentToo as named } from "./label-ops.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "namespace Space {}",
            "import Kind = Space.Missing;",
            "export class View {",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(text: string): void {",
            "    const { kill: stop } = this.host;",
            "    outer: for (const step of [stop, title, data, Kind, text]) {",
            "      if (step === undefined) break outer;",
            "      continue outer;",
            "    }",
            "    void import.meta.url;",
            "  }",
            "  static make(): void {",
            "    void new.target;",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/label-ops.ts": ['export const label = "x";', "export default 1;", ""].join("\n"),
        },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "R-not-read",
        what: "a regular-expression literal and a comment holding effect words are not read",
        files: { [V]: view("APO resource pressure", [HOST], ["void /invoke|retry/.source;", "// write the journal"]) },
        views: [V],
        findings: [],
      },
    ],
  },
  {
    id: "S",
    label: "Pi's effect seams, read from src and classified",
    pins: [
      {
        kind: "live",
        id: "S-projection",
        what: "ObservationProjection's public members are exactly its read and admission members; every read member's name reads no EFFECT text",
        expect: { seam: "ObservationProjection" },
      },
      {
        kind: "live",
        id: "S-registry",
        what: "CapabilityRegistry's public members are exactly its classified members",
        expect: { seam: "CapabilityRegistry" },
      },
      {
        kind: "live",
        id: "S-provider",
        what: "CapabilityProvider's members are exactly its classified members",
        expect: { seam: "CapabilityProvider" },
      },
      {
        kind: "live",
        id: "S-journal",
        what: "src/workflow/journal.ts's exported values are exactly its classified members",
        expect: { seam: "journal" },
      },
      {
        kind: "seam",
        id: "S-reader-class",
        what: "the class reader reads every member-name form (an escaped name by nameOf, in the scanner shape), leaves out private members, the constructor, static blocks and semicolons (each would read <unnamed>), and fails closed on a computed name and an index signature",
        seam: { kind: "class", name: "Held" },
        source: [
          "export class Held {",
          "  [key: string]: unknown;",
          "  constructor() {}",
          "  static {}",
          "  plain(): void {}",
          '  "quoted"(): void {}',
          "  7(): void {}",
          "  [`template`](): void {}",
          '  ["computed"](): void {}',
          "  [Symbol.iterator](): void {}",
          "  arrow = (): void => {};",
          "  get reading(): number { return 1; }",
          "  set reading(value: number) {}",
          "  static shared(): void {}",
          "  overloaded(): void;",
          "  overloaded(value?: number): void {}",
          "  \\u0065scape\\u{64}(): void {}",
          ";",
          "  private hidden(): void {}",
          "  #secret(): void {}",
          "  protected guarded(): void {}",
          "  readonly field = 1;",
          "}",
          "",
        ].join("\n"),
        members: ["7", "<computed>", "<index>", "arrow", "computed", "escaped", "field", "guarded", "overloaded", "plain", "quoted", "reading", "shared", "template"],
      },
      {
        kind: "seam",
        id: "S-reader-interface",
        what: "the interface reader reads every member form and fails closed on index, call and construct signatures",
        seam: { kind: "interface", name: "Held" },
        source: ["export interface Held {", "  [key: string]: unknown;", "  (): void;", "  new (): Held;", "  plain(): void;", '  "quoted": number;', "  readonly field?: string;", "}", ""].join("\n"),
        members: ["<call>", "<index>", "<new>", "field", "plain", "quoted"],
      },
      {
        kind: "seam",
        id: "S-reader-exports",
        what: "the exports reader reads every exported value form, leaves out types (each would read <export>), and fails closed on a re-export (<re-export>)",
        seam: { kind: "exports", name: "journal" },
        source: [
          "export function one(): void {}",
          "export class Two {}",
          "export enum Three { A }",
          "export const four = 4, { five } = { five: 5 }, [six] = [6];",
          "const seven = 7;",
          "export { seven, seven as eight };",
          'export { nine } from "./nine.js";',
          "export default 10;",
          "export interface Hidden {}",
          "export type Gone = number;",
          "export type { Hidden as Again };",
          "",
        ].join("\n"),
        members: ["<re-export>", "Three", "Two", "default", "eight", "five", "four", "one", "seven", "six"],
      },
      {
        kind: "seam",
        id: "S-reader-exports-unnamed",
        what: "the exports reader fails closed on an exported statement it cannot name (<export>)",
        seam: { kind: "exports", name: "journal" },
        source: ["export namespace Ten {}", ""].join("\n"),
        members: ["<export>"],
      },
      {
        kind: "seam",
        id: "S-reader-missing",
        what: "a seam the source does not declare reads <missing>",
        seam: { kind: "class", name: "Held" },
        source: ["export class Other {", "  plain(): void {}", "}", ""].join("\n"),
        members: ["<missing>"],
      },
    ],
  },
  {
    id: "Q",
    label: "the named residuals",
    pins: [
      {
        kind: "plant",
        id: "R-UNNAMED-VIEW",
        what: "a module presenting a view class without naming the program in a name or a literal is not identified (a comment naming it is never read): its capability invoke stays quiet",
        files: {
          "src/apo/view.ts": ['export const VIEW_TITLE = "Operational decision graph";', "export function act(registry: { invoke(): void }): void {", "  registry.invoke();", "}", ""].join("\n"),
          "src/apo/commented.ts": ["// the APO resource pressure view", "export function act(registry: { invoke(): void }): void {", "  registry.invoke();", "}", ""].join("\n"),
        },
        views: [],
        findings: [],
      },
      {
        kind: "plant",
        id: "R-UNNAMED-EFFECT",
        what: "a member of a handed-in handle called by a name outside the EFFECT families and the seam names stays quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.go(this.selected);"]) },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "R-IMPLICIT-CALL",
        what: "handed-in code reached without a call site (a coercion calling toString, a getter, a thenable) stays quiet",
        files: { [V]: view("APO resource pressure", [HOST], [`void \`\${this.host}\`;`, "void this.host.lazy;", "void Promise.resolve(this.host);"]) },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "R-FIELD-MUTATION",
        what: "a write into a handed-in object's fields or collections stays quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.revision = 0;", "this.host.nodes.clear();", "delete this.host.cache;"]) },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "R-COMPUTED-TEXT",
        what: "a member name built at run time stays quiet",
        files: { [V]: view("APO resource pressure", [HOST], ['const key = ["in", "voke"].join("");', "void this.host[key];"]) },
        views: [V],
        findings: [],
      },
      {
        kind: "plant",
        id: "R-REFLECTIVE-REACH",
        what: "a code constructor reached by reflection over an admitted built-in with a computed key stays quiet",
        files: {
          [V]: view("APO resource pressure", [HOST], ["const proto = Object.getPrototypeOf(() => 0);", "const key = Object.getOwnPropertyNames(proto)[this.selected];", "void proto[key];"]),
        },
        views: [V],
        findings: [],
      },
    ],
  },
];

/** The residual families: each Q pin, by its id, with its pinned quiet row. */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = Object.fromEntries((ROWS.find(row => row.id === "Q")?.pins ?? []).map(pin => [pin.id, [`Q ${pin.id}`]]));

export const titleOf = (row: Row, pin: Pin): string => `${row.id} ${pin.id}`;
