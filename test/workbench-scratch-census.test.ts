/**
 * wb-e37: the scratch census, the owner-bound falsifier for program rule 11 (E37SCOPETOKEN, E37RECOUNT2TOKEN,
 * E37QALEGTOKEN).
 *
 * Rule 11 (owner, 2026-10-15T16:08Z; widened to the qa runners by this bead's qa leg) asks every scratch allocation
 * under test/ and qa/ to compose the guarded path: test/helpers/scratch.ts (makeScratch / trackScratch / removeScratch,
 * with installScratchLeakGuard at module scope) or test/helpers/non-repo-scratch.ts from a vitest suite, and
 * qa/workbench/scratch.mjs from a plain-node runner. Two named falsifiers (wb-g5o gate-3, appended to this bead) hold it:
 *  - G3 UNTRACKED DIRECT ALLOCATION: a raw mkdtemp / mkdtempSync / tmpdir() reference under test/ or qa/ that is not
 *    handed straight to trackScratch, in a file that is not on ALLOWLIST with its measured counts and a reason.
 *  - G2 GUARD-INSTALL DROPPED: a test file or qa module whose import closure allocates through the guarded path while
 *    no module in that closure installs the leak guard at module scope (test/helpers/boot-extension.ts and
 *    test/helpers/print-mode-runner.ts install it for their importers), unless it is on GUARD_ALLOWLIST with a reason.
 * The scan is syntactic: the TypeScript parser over every .ts/.mts/.cts/.js/.mjs/.cjs file under test/ and qa/
 * (node_modules, dist and .git skipped; a symlink is not followed). It sees named, renamed, default, namespace,
 * required and destructured bindings of node:fs and node:os, member access by name (fs.mkdtempSync,
 * fs["mkdtempSync"], os.tmpdir()) and re-exports. A member name computed at run time is beyond any syntactic scan.
 * G2's closure follows only the edges the runtime evaluates (runtimeEdges): in a .ts/.mts/.cts source the transform
 * erases `import type`, inline-typed specifiers, type-only re-exports and every import none of whose bindings a value
 * position reads (a type position, an ambient declaration or a shadowing local reads nothing), so such an import brings
 * in neither a guard nor an allocation; a side-effect import, `import {}`, a value re-export and every static import of
 * a plain .js/.mjs/.cjs module do. A dynamic load runs only when control reaches it: a require() or an awaited import()
 * at module scope runs while the file loads and is an edge like a static import; an import() or require() inside a
 * function or a class field initialiser, or an import() the module scope does not await, may run later or never
 * (deferredLoad), so G2 follows it for the allocations a run can reach and never for the guard. Both rules are the ones
 * measured on vitest 4.1.10 / vite 8.2.1 (the synthetic G2 tables). Control flow at module scope is not modelled.
 * The tree is walked once per run: census() keeps one census per walk root, taken in a beforeAll under an explicit
 * budget (CENSUS_WALK_BUDGET_MS, also the suite's per-row timeout), so no row pays the walk inside its own timeout.
 * Counts, not lines, are pinned: an edit that moves a raw site keeps the census green; one that adds a raw site to a
 * listed file, or cures one without updating its entry, turns it red. The allowlist is long because trunk is: wb-e37's
 * owner-named census is nine test files plus the qa leg (NAMED_CENSUS), so every other raw site on trunk is recorded
 * here as OUT-OF-SCOPE rather than cured. An owner-named file this cut leaves raw is listed DEFERRED-TO the queued cut
 * or filed follow-up that edits it (contact rule), or OWNER-RULING where composing it would move a pin another bead's
 * landed test holds or the cut it was deferred to closed without composing it.
 */
import { lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { beforeAll, describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TREES = ["test", "qa"] as const;
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
const SOURCE = /\.(?:[cm]?ts|[cm]?js)$/;
const FS_MODULES = new Set(["fs", "node:fs", "fs/promises", "node:fs/promises"]);
const OS_MODULES = new Set(["os", "node:os"]);
const MKDTEMP = new Set(["mkdtemp", "mkdtempSync"]);
const TMPDIR = "tmpdir";
/** The guarded path's allocators; a call to one (or to an import alias of one) is a guarded allocation. */
const ALLOCATORS = new Set(["makeScratch", "trackScratch", "nonRepoScratch"]);
const TRACKER = "trackScratch";
const GUARD = "installScratchLeakGuard";

type RawKind = "mkdtemp" | "tmpdir";
interface Counts {
  mkdtemp: number;
  tmpdir: number;
}

/** What one file references: its raw allocation counts, its use of the guarded path, and the modules it names. */
interface Scan extends Counts {
  /** Raw references of either kind inside a trackScratch argument: composed, so not counted as raw. */
  tracked: number;
  /** Calls a guarded allocator. */
  allocates: boolean;
  /** Installs the leak guard with a statement at module scope. */
  installsGuard: boolean;
  /** The modules loading the file evaluates: the relative specifiers of the static imports the runtime keeps
   * (runtimeEdges) and every module a require() or awaited import() at module scope names. */
  edges: string[];
  /** The modules an import() or require() call names where loading the file does not run the call (deferredLoad). */
  deferred: string[];
}

/** The text of a string literal (a module specifier or a member name), or undefined for anything computed. */
function literalText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}

/** The module a `require("x")` or `import("x")` call loads, through any `await` or parentheses. */
function loadedModule(node: ts.Node | undefined): string | undefined {
  let target = node;
  while (target !== undefined && (ts.isAwaitExpression(target) || ts.isParenthesizedExpression(target))) target = target.expression;
  if (target === undefined || !ts.isCallExpression(target) || target.arguments.length !== 1) return undefined;
  const callee = target.expression;
  const loads = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
  return loads ? literalText(target.arguments[0]) : undefined;
}

/** True when loading the file does not itself run this import() or require() call: it sits in a function (a hook or
 * test callback included) or a class field initialiser, or it is an import() the module scope does not await, whose
 * module evaluates after the file has loaded. */
function deferredLoad(call: ts.CallExpression): boolean {
  for (let up: ts.Node = call.parent; !ts.isSourceFile(up); up = up.parent) {
    if (ts.isFunctionLike(up) || ts.isPropertyDeclaration(up)) return true;
  }
  if (call.expression.kind !== ts.SyntaxKind.ImportKeyword) return false;
  let outer: ts.Node = call.parent;
  while (ts.isParenthesizedExpression(outer)) outer = outer.parent;
  return !ts.isAwaitExpression(outer);
}

/** The member a property or element access names, when it names one literally. */
function memberName(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  return ts.isPropertyAccessExpression(node) ? node.name.text : literalText(node.argumentExpression);
}

/** True when an identifier is read as a value: not a declaration, an object key, a member name or an import/export name. */
function isValueReference(id: ts.Identifier): boolean {
  const parent = id.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.expression === id;
  if (ts.isQualifiedName(parent) || ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return false;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isImportEqualsDeclaration(parent)) return false;
  if (ts.isExportSpecifier(parent) || ts.isNamespaceExport(parent)) return false;
  if (ts.isBindingElement(parent)) return parent.initializer === id;
  if ("name" in parent && parent.name === id) return ts.isShorthandPropertyAssignment(parent);
  return true;
}

/** Every name a binding declares: the identifier itself, or each identifier inside a destructuring pattern. */
function bindingNames(name: ts.BindingName, into: Set<string>): Set<string> {
  if (ts.isIdentifier(name)) into.add(name.text);
  else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bindingNames(element.name, into);
  return into;
}

/** The var names a function-like body hoists: out of nested blocks too, never out of a nested function, class or namespace. */
function varNames(node: ts.Node, into: Set<string>): Set<string> {
  ts.forEachChild(node, child => {
    if (ts.isFunctionLike(child) || ts.isClassLike(child) || ts.isModuleDeclaration(child)) return;
    if (ts.isVariableDeclarationList(child) && (child.flags & ts.NodeFlags.BlockScoped) === 0) {
      for (const declaration of child.declarations) bindingNames(declaration.name, into);
    }
    varNames(child, into);
  });
  return into;
}

/** The names a statement list declares for its own scope: let, const, using, class, function, enum, namespace and import alias. */
function lexicalNames(statements: readonly ts.Statement[], into: Set<string>): Set<string> {
  for (const statement of statements) {
    if (ts.isVariableStatement(statement)) {
      if ((statement.declarationList.flags & ts.NodeFlags.BlockScoped) !== 0) for (const declaration of statement.declarationList.declarations) bindingNames(declaration.name, into);
    } else if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement) || ts.isModuleDeclaration(statement) || ts.isImportEqualsDeclaration(statement)) {
      if (statement.name !== undefined && ts.isIdentifier(statement.name)) into.add(statement.name.text);
    }
  }
  return into;
}

/** The names a node declares for the code inside it when it opens a scope (function, class expression, static block,
 * namespace body, block, case block, for-let/const, catch), or undefined when it opens none. */
function scopeOf(node: ts.Node): ReadonlySet<string> | undefined {
  if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node) || ts.isConstructorDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)) {
    // A function expression's own name is bound inside it; parameters and hoisted vars are bound in its body.
    const names = new Set<string>(ts.isFunctionExpression(node) && node.name !== undefined ? [node.name.text] : []);
    for (const parameter of node.parameters) bindingNames(parameter.name, names);
    return node.body !== undefined && ts.isBlock(node.body) ? varNames(node.body, names) : names;
  }
  // A class expression's own name is bound inside its body (a class declaration's is bound by its statement list).
  if (ts.isClassExpression(node)) return new Set(node.name === undefined ? [] : [node.name.text]);
  if (ts.isClassStaticBlockDeclaration(node)) return varNames(node.body, new Set());
  if (ts.isModuleBlock(node)) return varNames(node, lexicalNames(node.statements, new Set()));
  if (ts.isBlock(node)) return lexicalNames(node.statements, new Set());
  if (ts.isCaseBlock(node)) return lexicalNames(node.clauses.flatMap(clause => clause.statements), new Set());
  if (ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)) {
    const initializer = node.initializer;
    if (initializer === undefined || !ts.isVariableDeclarationList(initializer) || (initializer.flags & ts.NodeFlags.BlockScoped) === 0) return undefined;
    const names = new Set<string>();
    for (const declaration of initializer.declarations) bindingNames(declaration.name, names);
    return names;
  }
  if (ts.isCatchClause(node)) return node.variableDeclaration === undefined ? undefined : bindingNames(node.variableDeclaration.name, new Set());
  return undefined;
}

/** True for a declaration with a `declare` modifier: the transform erases it, and everything inside it, whole. */
function ambient(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword) ?? false);
}

/** True when an identifier names a local binding (a variable, parameter, destructured name, function, class, enum,
 * namespace or import alias): the only declarations that can shadow an import. */
function bindsLocal(id: ts.Identifier): boolean {
  const parent = id.parent;
  if (ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent)) return parent.name === id;
  if (ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent) || ts.isClassDeclaration(parent) || ts.isClassExpression(parent)) return parent.name === id;
  return (ts.isEnumDeclaration(parent) || ts.isModuleDeclaration(parent) || ts.isImportEqualsDeclaration(parent)) && parent.name === id;
}

/**
 * The names in `imported` that a value position of `file` reads, and every name in `imported` a local binding also
 * declares. With `scoped`, each read resolves through the scopes enclosing it (scopeOf), so a read of a local that
 * shadows the import is no read; without, every value-position occurrence counts.
 */
function valueReads(file: ts.SourceFile, imported: ReadonlySet<string>, scoped: boolean): { read: Set<string>; declared: Set<string> } {
  const read = new Set<string>();
  const declared = new Set<string>();
  /** The names each enclosing scope declares: a name found here shadows the module-scope import of the same name. */
  const scopes: ReadonlySet<string>[] = [];
  const reads = (id: ts.Identifier): void => {
    if (imported.has(id.text) && !scopes.some(scope => scope.has(id.text))) read.add(id.text);
  };
  const visit = (node: ts.Node): void => {
    // The transform erases an ambient (`declare`) declaration and an interface whole, though either can hold an expression
    // (a declared class's `extends`, an interface's computed key). An import's own names are the bindings in question.
    if (ambient(node) || ts.isInterfaceDeclaration(node) || ts.isImportDeclaration(node)) return;
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) return;
    if (ts.isIdentifier(node)) {
      if (isValueReference(node)) reads(node);
      else if (imported.has(node.text) && bindsLocal(node)) declared.add(node.text);
      return;
    }
    if (ts.isExportDeclaration(node)) {
      // A local `export { x }` reads x unless the specifier or the clause is type-only; a re-export from a module reads no local.
      const clause = node.exportClause;
      if (node.moduleSpecifier === undefined && !node.isTypeOnly && clause !== undefined && ts.isNamedExports(clause)) {
        for (const element of clause.elements) {
          const local = element.propertyName ?? element.name;
          if (!element.isTypeOnly && ts.isIdentifier(local)) reads(local);
        }
      }
      return;
    }
    if (ts.isHeritageClause(node)) {
      // A class's `extends` operand is evaluated; `implements` is erased (an interface's clauses never reach here).
      if (node.token === ts.SyntaxKind.ExtendsKeyword) for (const type of node.types) visit(type.expression);
      return;
    }
    if (ts.isExpressionWithTypeArguments(node)) {
      // An instantiation expression (f<T>) reads its operand; the type arguments are erased.
      visit(node.expression);
      return;
    }
    if (ts.isTypeNode(node)) return;
    const opened = scoped ? scopeOf(node) : undefined;
    if (opened === undefined) {
      ts.forEachChild(node, visit);
      return;
    }
    ts.forEachChild(node, child => {
      // A computed member name is evaluated outside the scope its member opens.
      if (ts.isComputedPropertyName(child)) {
        visit(child);
        return;
      }
      scopes.push(opened);
      visit(child);
      scopes.pop();
    });
  };
  visit(file);
  return { read, declared };
}

/** The literal text of a relative module specifier: a package specifier never resolves to a scanned file. */
function relativeSpecifier(node: ts.Node | undefined): string | undefined {
  const text = literalText(node);
  return text?.startsWith(".") === true ? text : undefined;
}

/**
 * The relative specifiers of the static imports the runtime evaluates when it loads `file` (G2 adds the modules an
 * import() or require() call names, wherever the call appears, in scanSource). A plain .js/.mjs/.cjs module evaluates
 * every static import and re-export. In a .ts/.mts/.cts source the transform erases `import type`, inline-typed
 * specifiers and type-only re-exports, and an import none of whose local bindings a value position reads: a read in a
 * type position, an interface or an ambient declaration, or of a local that shadows the binding (parameter, var,
 * let/const, class, function, enum, catch or for binding, a function or class expression's own name) is no read. A
 * side-effect import, `import {}`, `export {} from` and a value or namespace re-export are kept whole; a local
 * `export { x }` or `export default x` reads x, and `import x = require()` is kept only when x is read.
 */
function runtimeEdges(file: ts.SourceFile, typescript: boolean): string[] {
  const edges: string[] = [];
  /** Static imports the runtime evaluates only when one of their local value bindings is read. */
  const pending: { from: string; names: string[] }[] = [];
  for (const statement of file.statements) {
    if (ts.isImportDeclaration(statement)) {
      const from = relativeSpecifier(statement.moduleSpecifier);
      const clause = statement.importClause;
      const named = clause?.namedBindings;
      if (from === undefined) continue;
      if (!typescript || clause === undefined) edges.push(from);
      else if (clause.phaseModifier !== ts.SyntaxKind.TypeKeyword) {
        if (clause.name === undefined && named !== undefined && ts.isNamedImports(named) && named.elements.length === 0) edges.push(from);
        else {
          const names = clause.name === undefined ? [] : [clause.name.text];
          if (named !== undefined && ts.isNamespaceImport(named)) names.push(named.name.text);
          if (named !== undefined && ts.isNamedImports(named)) for (const element of named.elements) if (!element.isTypeOnly) names.push(element.name.text);
          pending.push({ from, names });
        }
      }
    } else if (ts.isImportEqualsDeclaration(statement) && ts.isExternalModuleReference(statement.moduleReference)) {
      const from = relativeSpecifier(statement.moduleReference.expression);
      if (from === undefined) continue;
      if (!typescript) edges.push(from);
      else if (!statement.isTypeOnly) pending.push({ from, names: [statement.name.text] });
    } else if (ts.isExportDeclaration(statement)) {
      const from = relativeSpecifier(statement.moduleSpecifier);
      const clause = statement.exportClause;
      if (from === undefined) continue;
      const valued = clause === undefined || ts.isNamespaceExport(clause) || clause.elements.length === 0 || clause.elements.some(element => !element.isTypeOnly);
      if (!typescript || (!statement.isTypeOnly && valued)) edges.push(from);
    }
  }
  if (pending.length === 0) return edges;
  // A read of a name no local binding redeclares can only be the import's; a name a local also binds is resolved scope by
  // scope (rare, so the scoped walk runs only for those names).
  const unscoped = valueReads(file, new Set(pending.flatMap(entry => entry.names)), false);
  const doubtful = new Set([...unscoped.read].filter(name => unscoped.declared.has(name)));
  const read = doubtful.size === 0 ? unscoped.read : new Set([...[...unscoped.read].filter(name => !doubtful.has(name)), ...valueReads(file, doubtful, true).read]);
  for (const { from, names } of pending) if (names.some(name => read.has(name))) edges.push(from);
  return edges;
}

function kindOf(name: string): RawKind | undefined {
  if (MKDTEMP.has(name)) return "mkdtemp";
  return name === TMPDIR ? "tmpdir" : undefined;
}

function scanSource(path: string, text: string): Scan {
  const typescript = /\.[cm]?ts$/.test(path);
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, typescript ? ts.ScriptKind.TS : ts.ScriptKind.JS);
  const rawNames: Record<RawKind, Set<string>> = { mkdtemp: new Set(), tmpdir: new Set() };
  /** Local names bound to the node:fs / node:os module object itself (default, namespace, require, import()). */
  const namespaces: Record<RawKind, Set<string>> = { mkdtemp: new Set(), tmpdir: new Set() };
  const moduleKind = (from: string): RawKind | undefined => {
    if (FS_MODULES.has(from)) return "mkdtemp";
    return OS_MODULES.has(from) ? "tmpdir" : undefined;
  };
  const allocators = new Set(ALLOCATORS);
  const trackers = new Set([TRACKER]);
  const guards = new Set([GUARD]);
  const scan: Scan = { mkdtemp: 0, tmpdir: 0, tracked: 0, allocates: false, installsGuard: false, edges: runtimeEdges(file, typescript), deferred: [] };

  // Pass 1: every local name a raw allocator or the guarded path is reachable through.
  const bind = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) {
      const from = literalText(node.moduleSpecifier) ?? "";
      const clause = node.importClause;
      const whole = moduleKind(from);
      if (clause?.name && whole !== undefined) namespaces[whole].add(clause.name.text);
      const named = clause?.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named) && whole !== undefined) namespaces[whole].add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named)) {
        for (const element of named.elements) {
          const imported = (element.propertyName ?? element.name).text;
          const local = element.name.text;
          const kind = kindOf(imported);
          if (kind === "mkdtemp" && FS_MODULES.has(from)) rawNames.mkdtemp.add(local);
          if (kind === "tmpdir" && OS_MODULES.has(from)) rawNames.tmpdir.add(local);
          if (from.startsWith(".")) {
            if (ALLOCATORS.has(imported)) allocators.add(local);
            if (imported === TRACKER) trackers.add(local);
            if (imported === GUARD) guards.add(local);
          }
        }
      }
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      const whole = moduleKind(literalText(node.moduleReference.expression) ?? "");
      if (whole !== undefined) namespaces[whole].add(node.name.text);
    } else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const whole = moduleKind(loadedModule(node.initializer) ?? "");
      if (whole !== undefined) namespaces[whole].add(node.name.text);
    } else if (ts.isBindingElement(node) && ts.isIdentifier(node.name)) {
      const property = node.propertyName === undefined ? node.name.text : (literalText(node.propertyName) ?? (ts.isIdentifier(node.propertyName) ? node.propertyName.text : ""));
      const kind = kindOf(property);
      if (kind !== undefined) rawNames[kind].add(node.name.text);
    }
    ts.forEachChild(node, bind);
  };
  bind(file);

  // Pass 2: every raw reference, counted as tracked when it sits inside a trackScratch argument.
  const insideTracker = (node: ts.Node): boolean => {
    let child: ts.Node = node;
    for (let parent: ts.Node | undefined = node.parent; parent !== undefined; parent = parent.parent) {
      if (ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && trackers.has(parent.expression.text) && parent.arguments.some(argument => argument === child)) return true;
      child = parent;
    }
    return false;
  };
  const record = (node: ts.Node, kind: RawKind): void => {
    if (insideTracker(node)) scan.tracked += 1;
    else scan[kind] += 1;
  };
  const isCallee = (node: ts.Node): boolean => ts.isCallExpression(node.parent) && node.parent.expression === node;
  const visit = (node: ts.Node): void => {
    if (ts.isTypeNode(node)) return;
    if (ts.isImportDeclaration(node) || ts.isImportEqualsDeclaration(node)) return;
    if (ts.isExportDeclaration(node)) {
      const from = literalText(node.moduleSpecifier);
      const clause = node.exportClause;
      if (from !== undefined && (clause === undefined || ts.isNamespaceExport(clause))) {
        // export * (as x) from "node:fs" re-exports mkdtempSync; from "node:os", tmpdir.
        if (FS_MODULES.has(from)) record(node, "mkdtemp");
        if (OS_MODULES.has(from)) record(node, "tmpdir");
      } else if (clause !== undefined && ts.isNamedExports(clause)) {
        for (const element of clause.elements) {
          const name = (element.propertyName ?? element.name).text;
          const kind = kindOf(name);
          if (from === undefined) {
            if (rawNames.mkdtemp.has(name)) record(element, "mkdtemp");
            if (rawNames.tmpdir.has(name)) record(element, "tmpdir");
          } else if ((kind === "mkdtemp" && FS_MODULES.has(from)) || (kind === "tmpdir" && OS_MODULES.has(from))) {
            record(element, kind);
          }
        }
      }
      return;
    }
    if (ts.isCallExpression(node)) {
      const loaded = loadedModule(node);
      if (loaded !== undefined) (deferredLoad(node) ? scan.deferred : scan.edges).push(loaded);
      if (ts.isIdentifier(node.expression) && allocators.has(node.expression.text)) scan.allocates = true;
    }
    if (ts.isIdentifier(node) && isValueReference(node)) {
      if (rawNames.mkdtemp.has(node.text)) record(node, "mkdtemp");
      if (rawNames.tmpdir.has(node.text)) record(node, "tmpdir");
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const member = memberName(node);
      const kind = member === undefined ? undefined : kindOf(member);
      // Called on anything (require("fs").mkdtempSync(...), os.tmpdir()), or read off the module object itself
      // (const make = fs.mkdtempSync); a record field that merely shares the name (counts.mkdtemp) is not a reference.
      const offModule = kind !== undefined && ts.isIdentifier(node.expression) && namespaces[kind].has(node.expression.text);
      if (kind !== undefined && (isCallee(node) || offModule)) record(node, kind);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);

  for (const statement of file.statements) {
    const call = ts.isExpressionStatement(statement) ? statement.expression : undefined;
    if (call !== undefined && ts.isCallExpression(call) && ts.isIdentifier(call.expression) && guards.has(call.expression.text)) scan.installsGuard = true;
  }
  return scan;
}

interface Census {
  scans: ReadonlyMap<string, Scan>;
  /** Every file with a raw reference, with its counts. */
  raw: ReadonlyMap<string, Counts>;
  /** G2: entry files whose closure allocates through the guarded path with no module-scope guard in it, to the allocating modules. */
  unguarded: ReadonlyMap<string, string[]>;
}

/** The scanned file a relative specifier names (".js" written for a ".ts" source included), or undefined. */
function resolveImport(from: string, specifier: string, known: ReadonlyMap<string, unknown>): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  const base = posix.normalize(posix.join(posix.dirname(from), specifier));
  const stem = base.replace(/\.[cm]?js$/, "");
  const candidates = [base, `${stem}.ts`, `${stem}.mts`, `${stem}.cts`, `${base}.ts`, `${base}.mjs`, `${base}.js`, posix.join(base, "index.ts"), posix.join(base, "index.js")];
  return candidates.find(candidate => known.has(candidate));
}

/** The file and every scanned module loading it evaluates (each scan's edges), plus, with `reach`, every module a run can
 * load later through a deferred import() or require() (each scan's deferred loads). */
function closureOf(path: string, scans: ReadonlyMap<string, Scan>, reach: boolean): string[] {
  const seen = new Set<string>();
  const pending = [path];
  for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
    if (seen.has(next)) continue;
    seen.add(next);
    const scan = scans.get(next);
    for (const specifier of [...(scan?.edges ?? []), ...(reach ? (scan?.deferred ?? []) : [])]) {
      const target = resolveImport(next, specifier, scans);
      if (target !== undefined) pending.push(target);
    }
  }
  return [...seen].sort();
}

/** The files G2 judges: every test file, and every qa module (a runner, or a qa library it loads). */
const isGuardEntry = (path: string): boolean => /^test\/.*\.test\.[cm]?ts$/.test(path) || path.startsWith("qa/");

function takeCensus(files: ReadonlyMap<string, string>): Census {
  const scans = new Map<string, Scan>();
  for (const [path, text] of files) scans.set(path, scanSource(path, text));
  const raw = new Map<string, Counts>();
  for (const [path, scan] of scans) if (scan.mkdtemp + scan.tmpdir > 0) raw.set(path, { mkdtemp: scan.mkdtemp, tmpdir: scan.tmpdir });
  const unguarded = new Map<string, string[]>();
  for (const path of scans.keys()) {
    if (!isGuardEntry(path)) continue;
    // Allocations: everything a run can reach. The guard: only what loading the entry evaluates, its module scope.
    const allocating = closureOf(path, scans, true).filter(member => scans.get(member)?.allocates === true);
    if (allocating.length > 0 && !closureOf(path, scans, false).some(member => scans.get(member)?.installsGuard === true)) unguarded.set(path, allocating);
  }
  return { scans, raw, unguarded };
}

function readTree(root: string): Map<string, string> {
  const files = new Map<string, string>();
  const walk = (directory: string): void => {
    for (const name of readdirSync(join(root, directory)).sort()) {
      if (SKIPPED_DIRS.has(name)) continue;
      const path = posix.join(directory, name);
      const info = lstatSync(join(root, path));
      if (info.isDirectory()) walk(path);
      else if (info.isFile() && SOURCE.test(name)) files.set(path, readFileSync(join(root, path), "utf8"));
    }
  };
  for (const tree of TREES) walk(tree);
  return files;
}

/** The walk's explicit budget: at least 3x the slowest walk measured under load (8.8 s, owner-side at the irx landing)
 * and the 60_000 ms the wb-e37 gate-2 verdict's cure names. The census suite takes the walk in a beforeAll under this
 * budget and runs every row under it, so the census never inherits vitest's 5000 ms default. */
const CENSUS_WALK_BUDGET_MS = 60_000;

/** ONE module-level cache for the run, keyed on the walk root: the first caller walks and parses test/ and qa/ once,
 * every later caller reads the census it took. */
const CENSUSES = new Map<string, Census>();
function census(root = ROOT): Census {
  let taken = CENSUSES.get(root);
  if (taken === undefined) {
    taken = takeCensus(readTree(root));
    CENSUSES.set(root, taken);
  }
  return taken;
}

interface Listed extends Counts {
  reason: string;
}

/** Reason classes. Every ALLOWLIST and GUARD_ALLOWLIST entry opens with one; a deferral names its bead. */
const REASON = /^(GUARDED-PATH|OUT-OF-SCOPE|TMPDIR-READ|DEFERRED-TO|OWNER-RULING)(?:-(wb-[a-z0-9.]+))?: \S/;
const GUARDED_PATH = "GUARDED-PATH: the guarded helper's own allocation, the raw site every other allocation routes through.";
const OUT_OF_SCOPE = "OUT-OF-SCOPE: a trunk raw site outside wb-e37's owner-named census; recorded here, not cured.";
const TMPDIR_READ = "TMPDIR-READ: reads tmpdir() and allocates nothing under it (read at the site by wb-e37).";
const ownerRuling = (landed: string, why: string): string =>
  `OWNER-RULING: in wb-e37's owner-named census and uncontended since ${landed} landed mid-cut, but ${why}; left for the owner's ruling (named in the wb-e37 delivery note).`;
const CRA_RETENTION =
  "OUT-OF-SCOPE: landed by wb-cra (70612b6) after wb-e37's claim-time census; four raw mkdtempSync sites in a new test file, recorded here and flagged in the wb-e37 delivery note, not cured.";
const VC4_RUNNER =
  "OUT-OF-SCOPE: landed by wb-752.3 (24c8be2) after wb-e37's claim-time census; a live furnace runner a machine seat never runs (standing rule 8), so its composition could not be verified here.";

const ALLOWLIST: Record<string, Listed> = {
  "test/agent-file-bom.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-file-toggle.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/agent-manager.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-model-display.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-runner-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/agent-runner.test.ts": { mkdtemp: 4, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/background-resume-wiring.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/cross-extension-rpc.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/custom-agents.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/e2e/isolated-provider.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/mention-clone-tool-reachability.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/tool-veto-reachability.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/usage-reaches-session-stats.e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/e2e/workflow.e2e.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/enabled-models.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/env.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/ext-templates-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/foreground-concurrency-print-mode-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/helpers/detached-peer.ts": { mkdtemp: 1, tmpdir: 0, reason: OUT_OF_SCOPE },
  "test/helpers/furnace-hosted-retry-journeys.ts": { mkdtemp: 1, tmpdir: 0, reason: ownerRuling("wb-zby (2022ddd)", "the plain-node runner qa/workbench/furnace-hosted-retry-fault.mjs loads it and the retry-fault receipt test pins its imports, so composing it moves a pin that test holds; wb-zby.2 edits those pins and keeps the journeys byte-identical") },
  "test/helpers/scratch.ts": { mkdtemp: 1, tmpdir: 3, reason: GUARDED_PATH },
  "test/memory-legacy-fallback.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/memory.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/model-scope.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/nested-delegation-e2e.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/nested-tools.test.ts": { mkdtemp: 3, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/non-repo-scratch.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/output-file-compaction-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/output-file-path.test.ts": { mkdtemp: 1, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/output-file.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/output-transcript-wiring.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/perf/ab.mjs": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/perf/spawn.bench.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/rpc-lifecycle-gating.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/rpc-result-consumption.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/schedule-e2e.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/schedule-menu.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/schedule-store.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/schedule.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/scratch-helper.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/settings.test.ts": { mkdtemp: 2, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/skill-loader.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-claude-abort-ack-grace.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-claude-adverse-faults.test.ts": { mkdtemp: 1, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-claude-adverse-receipt.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-claude-cancel-faults.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-claude-host-control-retention.test.ts": { mkdtemp: 4, tmpdir: 4, reason: CRA_RETENTION },
  "test/workbench-claude-host-degradation.test.ts": { mkdtemp: 1, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-claude-served-model.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-contract-literals.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-degradation-policy.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-designer.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-detached-socket-base.test.ts": { mkdtemp: 0, tmpdir: 2, reason: TMPDIR_READ },
  "test/workbench-env-scrub-census.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-executable-identity.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-forge-observer.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-hosted-real.test.ts": { mkdtemp: 1, tmpdir: 0, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-hosted-retry-fault-receipt.test.ts": { mkdtemp: 1, tmpdir: 1, reason: ownerRuling("wb-zby.2 (d233eb0)", "wb-zby.2 closed without composing its one raw site (the pf04-runner stage), and the row-455 restore (F8) re-classes the hold here rather than widen this respin's cut") },
  "test/workbench-furnace-hosted.test.ts": { mkdtemp: 1, tmpdir: 0, reason: OUT_OF_SCOPE },
  "test/workbench-furnace-vc4-receipt.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/workbench-host-contract.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-identity-shell.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-identity.test.ts": { mkdtemp: 3, tmpdir: 3, reason: OUT_OF_SCOPE },
  "test/workbench-patch-proposal.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-provider-envelope-audit.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-provider-lifecycle.test.ts": { mkdtemp: 4, tmpdir: 4, reason: OUT_OF_SCOPE },
  "test/workbench-release-checklist.test.ts": { mkdtemp: 0, tmpdir: 1, reason: TMPDIR_READ },
  "test/workbench-retained-memory.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-sandbox-rpc-census.test.ts": { mkdtemp: 0, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-security-capability.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workbench-security-pi-tools.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-status-ledger.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workbench-validate-reply.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-examples-claude-backend.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-gate-worktree.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-journal-compat.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "test/workflow-journal.test.ts": { mkdtemp: 2, tmpdir: 2, reason: OUT_OF_SCOPE },
  "test/workflow-tool.test.ts": { mkdtemp: 3, tmpdir: 3, reason: OUT_OF_SCOPE },
  "test/worktree.test.ts": { mkdtemp: 1, tmpdir: 1, reason: OUT_OF_SCOPE },
  "qa/workbench/install-minimal.mjs": {
    mkdtemp: 1,
    tmpdir: 1,
    reason: ownerRuling("wb-vko (bb7d5eb)", "test/workbench-git-stamp.test.ts stages this member from a closed file list (install-minimal.mjs, install-minimal-lib.mjs, git-stamp.mjs), so a composition must widen that list"),
  },
  "qa/workbench/live-furnace-vc4-launch.mjs": { mkdtemp: 1, tmpdir: 0, reason: VC4_RUNNER },
  "qa/workbench/live-furnace-vc4.mjs": { mkdtemp: 1, tmpdir: 1, reason: VC4_RUNNER },
  "qa/workbench/live-operator-receipt.mjs": {
    mkdtemp: 3,
    tmpdir: 5,
    reason: ownerRuling("wb-vko (bb7d5eb)", "it drives a real pi terminal session this cut cannot re-run, and test/workbench-git-stamp.test.ts stages it from a closed file list (live-operator-receipt.mjs, git-stamp.mjs)"),
  },
  "qa/workbench/local-detached-faults.mjs": {
    mkdtemp: 1,
    tmpdir: 1,
    reason: ownerRuling("wb-vko (bb7d5eb)", "test/workbench-detached-faults-receipt.test.ts admits only node: builtins and two named modules among its imports and pins rmSync( in it, so a composition must widen that guard"),
  },
  "qa/workbench/local-detached-shared-child.mjs": {
    mkdtemp: 2,
    tmpdir: 2,
    reason: ownerRuling("wb-vko (bb7d5eb)", "test/workbench-detached-shared-child-receipt.test.ts pins rmSync( in it and test/workbench-git-stamp.test.ts stages it from a closed file list (local-detached-shared-child.mjs, local-detached-shared-child-receipt.mjs, local-detached-faults-receipt.mjs)"),
  },
  "qa/workbench/release-checklist-receipt.mjs": {
    mkdtemp: 1,
    tmpdir: 1,
    reason: ownerRuling("wb-cax.23 (b4723ab)", "test/workbench-release-checklist.test.ts pins rmSync(scratch, { recursive: true, force: true }) in it and runs a staged copy of this one file"),
  },
  "qa/workbench/scratch.mjs": { mkdtemp: 1, tmpdir: 3, reason: GUARDED_PATH },
};

const LISTED = new Map(Object.entries(ALLOWLIST));

/** G2 exemptions: suites that allocate through the guarded path with no guard in their closure, with the reason. */
const NON_REPO_UNGUARDED = "OUT-OF-SCOPE: allocates through nonRepoScratch (test/helpers/non-repo-scratch.ts calls makeScratch) with no guard in its closure; outside wb-e37's owner-named census.";
const GUARD_ALLOWLIST: Record<string, string> = {
  "test/env.test.ts": NON_REPO_UNGUARDED,
  "test/non-repo-scratch.test.ts": NON_REPO_UNGUARDED,
  "test/workbench-claude-adverse-receipt.test.ts": NON_REPO_UNGUARDED,
  "test/workbench-dependency-census.test.ts": NON_REPO_UNGUARDED,
};

const GUARD_EXEMPT = new Map(Object.entries(GUARD_ALLOWLIST));

/** Composed onto the guarded path by wb-e37: each installs the guard at module scope and keeps no raw mkdtemp. */
const CURED = [
  "qa/workbench/designer-client.mjs",
  "qa/workbench/install-smoke.mjs",
  "qa/workbench/local-detached-client.mjs",
  "qa/workbench/package-smoke.mjs",
  "test/workbench-cap-saturation-receipt.test.ts",
  "test/workbench-commit-message-scan.test.ts",
  "test/workbench-detached-socket-base.test.ts",
  "test/workbench-headless-census.test.ts",
  "test/workbench-reducer-selector-bench.test.ts",
  "test/workbench-tool-reply-bench.test.ts",
  "test/workbench-topology-slice-grouped-bench.test.ts",
] as const;

/** The owner-named census at claim time: nine test files (E37SCOPETOKEN, E37RECOUNT2TOKEN) and the qa runners with a
 * mkdtempSync the qa leg names (E37QALEGTOKEN: nine on trunk at the ruling, plus wb-cax.23's reporter-output runner,
 * which landed mid-cut at b4723ab), less each member DISCHARGED since (wb-zby.2 deleted the repaired-SDK loader). */
const NAMED_CENSUS = [
  "test/helpers/furnace-hosted-retry-journeys.ts",
  "test/workbench-furnace-hosted-retry-fault-receipt.test.ts",
  "test/workbench-headless-census.test.ts",
  "test/workbench-detached-socket-base.test.ts",
  "test/workbench-reducer-selector-bench.test.ts",
  "test/workbench-topology-slice-grouped-bench.test.ts",
  "test/workbench-commit-message-scan.test.ts",
  "test/workbench-cap-saturation-receipt.test.ts",
  "test/workbench-tool-reply-bench.test.ts",
  "qa/workbench/designer-client.mjs",
  "qa/workbench/install-minimal.mjs",
  "qa/workbench/install-smoke.mjs",
  "qa/workbench/live-operator-receipt.mjs",
  "qa/workbench/local-detached-client.mjs",
  "qa/workbench/local-detached-faults.mjs",
  "qa/workbench/local-detached-shared-child.mjs",
  "qa/workbench/package-smoke.mjs",
  "qa/workbench/release-checklist-receipt.mjs",
] as const;

/** Owner-named members discharged since the claim-time census, by name, with the landing that removed each: they leave
 * NAMED_CENSUS and the allowlist, and a row keeps them out of the tree as well (wb-e37 respin 1, contact L1). */
const DISCHARGED: Record<string, string> = {
  "qa/workbench/furnace-hosted-repaired-sdk.mjs": "deleted by wb-zby.2 at d233eb0 (landing 74), which retired the repaired-SDK copy",
};

const show = (path: string, counts: Counts): string => `${JSON.stringify(path)}: { mkdtemp: ${counts.mkdtemp}, tmpdir: ${counts.tmpdir} }`;
/** An assertion message that names every offender on its own line (the default one truncates a long list). */
const naming = (what: string, offenders: readonly string[]): string => (offenders.length === 0 ? what : `${what} (${offenders.length}):\n  ${offenders.join("\n  ")}\n`);

describe("scratch census over test/ and qa/ (wb-e37, rule 11)", { timeout: CENSUS_WALK_BUDGET_MS }, () => {
  beforeAll(() => {
    census();
  }, CENSUS_WALK_BUDGET_MS);

  it("G3: every raw mkdtemp / tmpdir() reference sits in a file on the reasoned allowlist", () => {
    const unlisted = [...census().raw].filter(([path]) => !LISTED.has(path)).map(([path, counts]) => show(path, counts));
    expect(unlisted, naming("compose the guarded path (rule 11), or list the file with its counts and a reason", unlisted)).toEqual([]);
  });

  it("each listed file's counts match the scan: a new raw site in a listed file, or a cure that keeps its entry, is red", () => {
    const drift = [...LISTED].flatMap(([path, entry]) => {
      const scan = census().scans.get(path);
      if (scan === undefined) return [`${path}: listed, but absent from the tree (drop the entry)`];
      if (scan.mkdtemp === entry.mkdtemp && scan.tmpdir === entry.tmpdir) return [];
      return [`${path}: listed ${entry.mkdtemp} mkdtemp / ${entry.tmpdir} tmpdir, scanned ${scan.mkdtemp} / ${scan.tmpdir}`];
    });
    expect(drift, naming("allowlist counts drifted from the tree", drift)).toEqual([]);
  });

  it("every allowlist entry opens with a reason class, counts at least one raw reference, and a deferral names its bead", () => {
    const malformed = [...LISTED].flatMap(([path, entry]) => {
      const problems: string[] = [];
      const reason = REASON.exec(entry.reason);
      const klass = reason?.[1];
      const bead = reason?.[2];
      if (reason === null) problems.push("its reason opens with no class");
      if (!Number.isInteger(entry.mkdtemp) || !Number.isInteger(entry.tmpdir) || entry.mkdtemp < 0 || entry.tmpdir < 0 || entry.mkdtemp + entry.tmpdir === 0) problems.push("its counts name no raw reference");
      if ((klass === "DEFERRED-TO") !== (bead !== undefined)) problems.push("a bead is named exactly for DEFERRED-TO");
      return problems.map(problem => `${path}: ${problem}`);
    });
    expect(malformed, naming("malformed allowlist entries", malformed)).toEqual([]);
  });

  it("G2: every test file and qa module whose closure allocates through the guarded path installs the leak guard at module scope in that closure", () => {
    const unguarded = [...census().unguarded].filter(([path]) => !GUARD_EXEMPT.has(path)).map(([path, allocating]) => `${path} <- ${allocating.join(", ")}`);
    expect(unguarded, naming("call installScratchLeakGuard() at module scope (or import a helper that does)", unguarded)).toEqual([]);
  });

  it("every guard-allowlist entry still allocates without a guard, and carries a reason class", () => {
    const stale = [...GUARD_EXEMPT.keys()].filter(path => !census().unguarded.has(path));
    const unreasoned = [...GUARD_EXEMPT].filter(([, reason]) => !REASON.test(reason)).map(([path]) => path);
    expect({ stale, unreasoned }, naming("stale or unreasoned guard-allowlist entries", [...stale, ...unreasoned])).toEqual({ stale: [], unreasoned: [] });
  });

  it("the cured set composes the guarded path, installs the guard at module scope and keeps no raw mkdtemp", () => {
    const problems = CURED.flatMap(path => {
      const scan = census().scans.get(path);
      if (scan === undefined) return [`${path}: absent from the tree`];
      const found: string[] = [];
      if (scan.mkdtemp > 0) found.push(`${scan.mkdtemp} raw mkdtemp`);
      if (scan.tmpdir > 0 && !(LISTED.get(path)?.reason ?? "").startsWith("TMPDIR-READ")) found.push(`${scan.tmpdir} raw tmpdir() outside a TMPDIR-READ entry`);
      if (!scan.allocates) found.push("no guarded allocation");
      if (!scan.installsGuard) found.push("no module-scope installScratchLeakGuard()");
      return found.map(problem => `${path}: ${problem}`);
    });
    expect(problems, naming("cured files that are not composed", problems)).toEqual([]);
  });

  it("reconciles the owner-named census by name: every member is cured here or listed with its deferral or owner-ruling hold", () => {
    const cured = new Set<string>(CURED);
    const unreconciled = NAMED_CENSUS.filter(path => !cured.has(path) && !/^(?:DEFERRED-TO-wb-|OWNER-RULING: )/.test(LISTED.get(path)?.reason ?? ""));
    expect({ members: NAMED_CENSUS.length, unreconciled }, naming("owner-named census members neither cured nor held", unreconciled)).toEqual({ members: 18, unreconciled: [] });
  });

  it("records each discharged owner-named member by name: gone from the named census, the allowlist and the tree", () => {
    const named = new Set<string>(NAMED_CENSUS);
    const present = Object.keys(DISCHARGED).flatMap(path => [
      ...(named.has(path) ? [`${path}: still a NAMED_CENSUS member`] : []),
      ...(LISTED.has(path) ? [`${path}: still listed`] : []),
      ...(census().scans.has(path) ? [`${path}: back in the tree`] : []),
    ]);
    expect(present, naming("discharged owner-named members still present", present)).toEqual([]);
  });
});

describe("the census scanner (synthetic sources)", () => {
  const counted = (source: string, path = "test/synthetic.test.ts"): Counts & { tracked: number } => {
    const scan = scanSource(path, source);
    return { mkdtemp: scan.mkdtemp, tmpdir: scan.tmpdir, tracked: scan.tracked };
  };

  it.each([
    ["a named import", 'import { mkdtempSync } from "node:fs"; import { tmpdir } from "node:os"; mkdtempSync(join(tmpdir(), "x-"));', 1, 1],
    ["a renamed import", 'import { mkdtempSync as fresh } from "fs"; import { tmpdir as base } from "os"; fresh(join(base(), "x-"));', 1, 1],
    ["a namespace import", 'import * as fs from "node:fs"; import * as os from "node:os"; fs.mkdtempSync(join(os.tmpdir(), "x-"));', 1, 1],
    ["a default import", 'import fs from "node:fs"; import os from "node:os"; fs.mkdtempSync(join(os.tmpdir(), "x-"));', 1, 1],
    ["element access by a literal name", 'import fs from "node:fs"; import os from "node:os"; fs["mkdtempSync"](join(os["tmpdir"](), "x-"));', 1, 1],
    ["require", 'const fs = require("fs"); const os = require("os"); fs.mkdtempSync(join(os.tmpdir(), "x-"));', 1, 1],
    ["a destructured dynamic import", 'const { mkdtempSync } = await import("node:fs"); const { tmpdir: where } = await import("node:os"); mkdtempSync(join(where(), "x-"));', 1, 1],
    ["the promises API", 'import { mkdtemp } from "node:fs/promises"; import { tmpdir } from "node:os"; await mkdtemp(join(tmpdir(), "x-"));', 1, 1],
    ["a function value taken off the module", 'import fs from "node:fs"; import os from "node:os"; const make = fs.mkdtempSync; const where = os.tmpdir; make(join(where(), "x-"));', 1, 1],
    ["a shorthand property hand-off", 'import { tmpdir } from "node:os"; resolveSocket({ tmpdir });', 0, 1],
    ["a re-export from the module", 'export { mkdtempSync as fresh } from "node:fs"; export { tmpdir } from "node:os";', 1, 1],
    ["a local re-export of an alias", 'import { mkdtempSync as fresh } from "node:fs"; export { fresh };', 1, 0],
    ["a star re-export", 'export * from "node:fs"; export * as os from "node:os";', 1, 1],
  ])("counts %s as raw", (_shape, source, mkdtemp, tmpdir) => {
    expect(counted(source)).toEqual({ mkdtemp, tmpdir, tracked: 0 });
  });

  it.each([
    ["strings and comments", '// mkdtempSync(join(tmpdir(), "x"))\nconst label = "mkdtempSync tmpdir()";', 0],
    ["object keys and other objects' tmpdir members", 'const options = { tmpdir: "/short", mkdtempSync: 1 }; use(options.tmpdir, placement.tmpdir);', 0],
    ["record fields that share the names", 'const counts = { mkdtemp: 0, tmpdir: 0 }; counts.mkdtemp += 1; report(counts.tmpdir, counts["mkdtemp"]);', 0],
    ["an import that is never used", 'import { mkdtempSync } from "node:fs"; import { tmpdir } from "node:os";', 0],
    ["a type position", 'import type * as os from "node:os"; type Where = typeof os.tmpdir;', 0],
    ["a mkdtemp handed straight to trackScratch", 'import { mkdtempSync, realpathSync } from "node:fs"; import { tmpdir } from "node:os"; import { trackScratch } from "./helpers/scratch.js"; trackScratch(realpathSync(mkdtempSync(join(tmpdir(), "x-"))));', 2],
    ["a mkdtemp handed to an alias of trackScratch", 'import fs from "node:fs"; import { trackScratch as keep } from "./helpers/scratch.js"; keep(fs.mkdtempSync("/tmp/x-"));', 1],
  ])("does not count %s as raw", (_shape, source, tracked) => {
    expect(counted(source)).toEqual({ mkdtemp: 0, tmpdir: 0, tracked });
  });

  it("does not exempt a mkdtemp that only sits near trackScratch: the callee of the tracked argument is still raw", () => {
    expect(counted('import { mkdtempSync } from "node:fs"; import { trackScratch } from "./helpers/scratch.js"; const made = mkdtempSync("/tmp/x-"); trackScratch(made);')).toEqual({ mkdtemp: 1, tmpdir: 0, tracked: 0 });
  });

  const HELPER = 'export function makeScratch(prefix) { return prefix; }\nexport function installScratchLeakGuard() {}\n';
  const tree = (files: Record<string, string>): Census => takeCensus(new Map(Object.entries(files)));

  it.each([
    ["a suite that calls makeScratch with no guard", { "test/a.test.ts": 'import { makeScratch } from "./helpers/scratch.js";\nmakeScratch("a-");\n' }, ["test/a.test.ts"]],
    ["a suite whose guard is installed inside a function only", { "test/a.test.ts": 'import { installScratchLeakGuard, makeScratch } from "./helpers/scratch.js";\nfunction setup() { installScratchLeakGuard(); }\nmakeScratch("a-");\n' }, ["test/a.test.ts"]],
    ["a suite that allocates through an imported helper", { "test/helpers/fixture.ts": 'import { makeScratch } from "./scratch.js";\nexport const fixture = () => makeScratch("f-");\n', "test/a.test.ts": 'import { fixture } from "./helpers/fixture.js";\nfixture();\n' }, ["test/helpers/fixture.ts"]],
    ["a suite that renames the allocator", { "test/a.test.ts": 'import { makeScratch as fresh } from "./helpers/scratch.js";\nfresh("a-");\n' }, ["test/a.test.ts"]],
    ["a qa runner that allocates with no guard", { "qa/workbench/run.mjs": "import { makeScratch } from './scratch.mjs';\nmakeScratch('r-');\n", "qa/workbench/scratch.mjs": HELPER }, ["qa/workbench/run.mjs"]],
  ])("G2 reports %s", (_shape, files, allocating) => {
    const result = tree({ "test/helpers/scratch.ts": HELPER, ...files });
    const entry = Object.keys(files).find(path => path.endsWith(".test.ts") || path === "qa/workbench/run.mjs") ?? "";
    expect(result.unguarded.get(entry)).toEqual(allocating);
  });

  it.each([
    ["a module-scope guard in the suite", { "test/a.test.ts": 'import { installScratchLeakGuard, makeScratch } from "./helpers/scratch.js";\ninstallScratchLeakGuard();\nmakeScratch("a-");\n' }],
    ["a module-scope guard in a helper the suite imports", { "test/helpers/boot.ts": 'import { installScratchLeakGuard } from "./scratch.js";\ninstallScratchLeakGuard();\n', "test/a.test.ts": 'import "./helpers/boot.js";\nimport { makeScratch } from "./helpers/scratch.js";\nmakeScratch("a-");\n' }],
    ["a renamed guard at module scope", { "test/a.test.ts": 'import { installScratchLeakGuard as guard, makeScratch } from "./helpers/scratch.js";\nguard();\nmakeScratch("a-");\n' }],
    ["a qa runner with its guard", { "qa/workbench/run.mjs": "import { installScratchLeakGuard, makeScratch } from './scratch.mjs';\ninstallScratchLeakGuard();\nmakeScratch('r-');\n", "qa/workbench/scratch.mjs": HELPER }],
  ])("G2 accepts %s", (_shape, files) => {
    expect([...tree({ "test/helpers/scratch.ts": HELPER, ...files }).unguarded.keys()]).toEqual([]);
  });

  /** test/helpers/boot-extension.ts in miniature: installs the guard at module scope and exports a value, a type, a class and a default. */
  const GUARDED = 'import { installScratchLeakGuard } from "./scratch.js";\ninstallScratchLeakGuard();\nexport const hermeticDir = (): string => "";\nexport interface Hermetic {\n  dir: string;\n}\nexport class Base {}\nexport default hermeticDir;\n';
  /** A suite that leaks one makeScratch allocation unless the guard runs, and reaches the guarded helper only through `form`. */
  const behind = (form: string, extra: Record<string, string> = {}): Census =>
    tree({ "test/helpers/scratch.ts": HELPER, "test/helpers/guarded.ts": GUARDED, ...extra, "test/a.test.ts": `${form}\nimport { makeScratch } from "./helpers/scratch.js";\nmakeScratch("zz-g2-");\n` });

  // G2 follows only the static edges the runtime evaluates. Measured 2026-10-17 on vitest 4.1.10 / vite 8.2.1 (its Oxc
  // transform of .ts sources) with one marker module per form, flagged when the runtime evaluated it: the transform erases
  // a type-only import, an import whose bindings no kept identifier reads (type positions, type-only declarations, ambient
  // declarations and shadowing scopes read nothing; an import-equals require included), and a type-only re-export, so a
  // guard reached only that way never installs. The first table lists forms the runtime did NOT evaluate; the second,
  // forms it did.
  it.each([
    ["an import type declaration", 'import type { Hermetic } from "./helpers/guarded.js";'],
    ["an import whose only specifier is inline-typed", 'import { type Hermetic } from "./helpers/guarded.js";'],
    ["import type with an empty brace list", 'import type {} from "./helpers/guarded.js";'],
    ["a named value import that is never read", 'import { hermeticDir } from "./helpers/guarded.js";'],
    ["a default import that is never read", 'import guarded from "./helpers/guarded.js";'],
    ["a namespace import that is never read", 'import * as guarded from "./helpers/guarded.js";'],
    ["an unread value specifier beside an inline-typed one", 'import { hermeticDir, type Hermetic } from "./helpers/guarded.js";'],
    ["an unread default beside an inline-typed specifier", 'import guarded, { type Hermetic } from "./helpers/guarded.js";'],
    ["an unread default beside an empty brace list", 'import guarded, {} from "./helpers/guarded.js";'],
    ["a value import read only by typeof in a type position", 'import { hermeticDir } from "./helpers/guarded.js";\nlet dir: ReturnType<typeof hermeticDir> | undefined;\nvoid dir;'],
    ["a namespace import read only by typeof in a type alias", 'import * as guarded from "./helpers/guarded.js";\ntype Guarded = typeof guarded;'],
    ["a value-syntax import of an interface used only as a type", 'import { Hermetic } from "./helpers/guarded.js";\nconst seen: Hermetic | undefined = undefined;\nvoid seen;'],
    ["an import used only in a type assertion", 'import { Hermetic } from "./helpers/guarded.js";\nconst seen = {} as Hermetic;\nvoid seen;'],
    ["an import used only as a call's type argument", 'import { Hermetic } from "./helpers/guarded.js";\nconst keep = <X,>(x: X): X => x;\nkeep<Hermetic>({ dir: "" });'],
    ["an import read only in a this-parameter type", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction bound(this: typeof hermeticDir): number {\n  return 1;\n}\nvoid bound;'],
    ["an import used only as a class member's type", 'import { Base } from "./helpers/guarded.js";\nclass Holder {\n  base?: Base;\n}\nvoid Holder;'],
    ["an import used only in an implements clause", 'import { Hermetic } from "./helpers/guarded.js";\nclass Probe implements Hermetic {\n  dir = "";\n}\nvoid Probe;'],
    ["an import used only in an interface extends clause", 'import { Hermetic } from "./helpers/guarded.js";\ninterface Wider extends Hermetic {\n  more: string;\n}'],
    ["an import read only in an abstract method signature", 'import { hermeticDir } from "./helpers/guarded.js";\nabstract class Shape {\n  abstract read(dir: typeof hermeticDir): void;\n}\nvoid Shape;'],
    ["an import read only in overload signatures", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction pick(): void;\nfunction pick(dir?: typeof hermeticDir): void {\n  void dir;\n}\npick();'],
    ["an import read only inside a declare statement", 'import { hermeticDir } from "./helpers/guarded.js";\ndeclare const dir: ReturnType<typeof hermeticDir>;'],
    ["an import read only by an export declare", 'import { hermeticDir } from "./helpers/guarded.js";\nexport declare const dir: ReturnType<typeof hermeticDir>;'],
    ["an import read only by a declare class field", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Holder {\n  declare dir: ReturnType<typeof hermeticDir>;\n}\nvoid Holder;'],
    ["a declare class that extends an import", 'import { Base } from "./helpers/guarded.js";\ndeclare class Ambient extends Base {}'],
    ["an import read only inside a declare namespace", 'import { hermeticDir } from "./helpers/guarded.js";\ndeclare namespace Ambient {\n  const dir: ReturnType<typeof hermeticDir>;\n}'],
    ["an import read only inside declare global", 'import { hermeticDir } from "./helpers/guarded.js";\ndeclare global {\n  var guardedDir: ReturnType<typeof hermeticDir>;\n}'],
    ["an export type re-export", 'export type { Hermetic } from "./helpers/guarded.js";'],
    ["a re-export whose every specifier is inline-typed", 'export { type Hermetic } from "./helpers/guarded.js";'],
    ["an export type star re-export", 'export type * from "./helpers/guarded.js";'],
    ["a local export of the import marked type-only", 'import { hermeticDir } from "./helpers/guarded.js";\nexport { type hermeticDir };'],
    ["an object key that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nconst keys = { hermeticDir: 1 };\nvoid keys;'],
    ["an object method that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nconst methods = {\n  hermeticDir(): number {\n    return 1;\n  },\n};\nvoid methods;'],
    ["an object getter that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nconst getters = {\n  get hermeticDir(): number {\n    return 1;\n  },\n};\nvoid getters;'],
    ["a class field that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Fields {\n  hermeticDir = 1;\n}\nvoid Fields;'],
    ["a parameter property that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Props {\n  constructor(readonly hermeticDir: number) {}\n}\nvoid Props;'],
    ["an enum member that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nenum Names {\n  hermeticDir = 1,\n}\nvoid Names;'],
    ["a destructuring property name that only shares the import's name", 'import { hermeticDir } from "./helpers/guarded.js";\nconst { hermeticDir: dir } = { hermeticDir: "" };\nvoid dir;'],
    ["a read shadowed by a function parameter", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction readDir(hermeticDir: string): string {\n  return hermeticDir;\n}\nreadDir("x");'],
    ["a read shadowed by an arrow parameter", 'import { hermeticDir } from "./helpers/guarded.js";\nconst dirs = ["x"].map(hermeticDir => hermeticDir);\nvoid dirs;'],
    ["a read shadowed by a destructured parameter", 'import { hermeticDir } from "./helpers/guarded.js";\nconst read = ({ hermeticDir }: { hermeticDir: string }): string => hermeticDir;\nvoid read;'],
    ["a read shadowed by a method parameter", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Reader {\n  read(hermeticDir: string): string {\n    return hermeticDir;\n  }\n}\nvoid Reader;'],
    ["a read shadowed by a function expression's own name", 'import { hermeticDir } from "./helpers/guarded.js";\nconst self = function hermeticDir(): unknown {\n  return hermeticDir;\n};\nvoid self;'],
    ["a read shadowed by a class expression's own name", 'import { hermeticDir } from "./helpers/guarded.js";\nconst Self = class hermeticDir {\n  read(): unknown {\n    return hermeticDir;\n  }\n};\nvoid Self;'],
    ["a read shadowed by a block const", 'import { hermeticDir } from "./helpers/guarded.js";\n{\n  const hermeticDir = "x";\n  void hermeticDir;\n}'],
    ["a read shadowed by a block class declaration", 'import { hermeticDir } from "./helpers/guarded.js";\n{\n  class hermeticDir {}\n  void hermeticDir;\n}'],
    ["a read shadowed by a block function declaration", 'import { hermeticDir } from "./helpers/guarded.js";\n{\n  function hermeticDir(): void {}\n  void hermeticDir;\n}'],
    ["a read shadowed by a function-scoped var", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction local(): string {\n  var hermeticDir = "x";\n  return hermeticDir;\n}\nlocal();'],
    ["a read shadowed by a var hoisted out of a nested block", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction local(): string {\n  {\n    var hermeticDir = "x";\n  }\n  return hermeticDir;\n}\nlocal();'],
    ["a read shadowed by a for-of const", 'import { hermeticDir } from "./helpers/guarded.js";\nfor (const hermeticDir of ["x"]) void hermeticDir;'],
    ["a read shadowed by a for-in let", 'import { hermeticDir } from "./helpers/guarded.js";\nfor (let hermeticDir in {}) void hermeticDir;'],
    ["a read shadowed by a for-loop let", 'import { hermeticDir } from "./helpers/guarded.js";\nfor (let hermeticDir = 0; hermeticDir < 1; hermeticDir++) void hermeticDir;'],
    ["a read shadowed by a catch parameter", 'import { hermeticDir } from "./helpers/guarded.js";\ntry {\n  void 0;\n} catch (hermeticDir) {\n  void hermeticDir;\n}'],
    ["a read shadowed by a case-clause const", 'import { hermeticDir } from "./helpers/guarded.js";\nswitch (1) {\n  case 1:\n    const hermeticDir = "x";\n    void hermeticDir;\n}'],
    ["a read shadowed by a const in a class static block", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Holder {\n  static {\n    const hermeticDir = "x";\n    void hermeticDir;\n  }\n}\nvoid Holder;'],
    ["a read shadowed by a var in a class static block", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Holder {\n  static {\n    var hermeticDir = "x";\n    void hermeticDir;\n  }\n}\nvoid Holder;'],
    ["a read shadowed by a namespace-local const", 'import { hermeticDir } from "./helpers/guarded.js";\nnamespace Local {\n  const hermeticDir = "x";\n  void hermeticDir;\n}'],
    ["a read shadowed by a namespace-local var", 'import { hermeticDir } from "./helpers/guarded.js";\nnamespace Local {\n  var hermeticDir = "x";\n  void hermeticDir;\n}'],
    ["a read shadowed by a constructor parameter", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Holder {\n  constructor(hermeticDir: string) {\n    void hermeticDir;\n  }\n}\nvoid Holder;'],
    ["a read shadowed by a setter parameter", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Holder {\n  set dir(hermeticDir: string) {\n    void hermeticDir;\n  }\n}\nvoid Holder;'],
    ["a read shadowed by a var in a getter", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Holder {\n  get dir(): string {\n    var hermeticDir = "x";\n    return hermeticDir;\n  }\n}\nvoid Holder;'],
    ["a read shadowed by an enum declared in a function", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction local(): unknown {\n  enum hermeticDir {\n    A,\n  }\n  return hermeticDir;\n}\nlocal();'],
    ["an import read only in an interface's computed key", 'import { hermeticDir } from "./helpers/guarded.js";\ninterface Keyed {\n  [hermeticDir]: string;\n}'],
    ["an import type binding re-exported locally", 'import type { Hermetic } from "./helpers/guarded.js";\nexport { Hermetic };'],
    ["an inline-typed binding re-exported locally", 'import { type Hermetic } from "./helpers/guarded.js";\nexport { Hermetic };'],
    ["an import type namespace re-exported locally", 'import type * as guarded from "./helpers/guarded.js";\nexport { guarded };'],
    ["a local export type of the import", 'import { hermeticDir } from "./helpers/guarded.js";\nexport type { hermeticDir };'],
    ["an import-equals require whose alias is never read", 'import guarded = require("./helpers/guarded.js");'],
  ])("G2 reports a suite whose only path to the guard is %s: the transform erases it", (_shape, form) => {
    expect(behind(form).unguarded.get("test/a.test.ts")).toEqual(["test/a.test.ts"]);
  });

  it.each([
    ["a side-effect import", 'import "./helpers/guarded.js";'],
    ["an empty brace list (kept as a side-effect import)", 'import {} from "./helpers/guarded.js";'],
    ["a value import read as a statement", 'import { hermeticDir } from "./helpers/guarded.js";\nvoid hermeticDir;'],
    ["a value import read by typeof in a value position", 'import { hermeticDir } from "./helpers/guarded.js";\nconst kind = typeof hermeticDir;\nvoid kind;'],
    ["a renamed import that is read", 'import { hermeticDir as dir } from "./helpers/guarded.js";\nvoid dir;'],
    ["a read default beside an unread named import", 'import guarded, { Base } from "./helpers/guarded.js";\nvoid guarded;'],
    ["a namespace import whose member is read", 'import * as guarded from "./helpers/guarded.js";\nvoid guarded.hermeticDir;'],
    ["a read inside a function", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction read(): string {\n  return hermeticDir();\n}\nread();'],
    ["a read inside an anonymous function expression", 'import { hermeticDir } from "./helpers/guarded.js";\nconst read = function (): string {\n  return hermeticDir();\n};\nvoid read;'],
    ["a read in a nested arrow", 'import { hermeticDir } from "./helpers/guarded.js";\n{\n  const read = (): string => hermeticDir();\n  void read;\n}'],
    ["a read in a template literal", `import { hermeticDir } from "./helpers/guarded.js";\nconst text = \`\${hermeticDir()}\`;\nvoid text;`],
    ["a read in an as-expression operand", 'import { hermeticDir } from "./helpers/guarded.js";\nconst read = hermeticDir as () => string;\nvoid read;'],
    ["a read in a satisfies expression", 'import { hermeticDir } from "./helpers/guarded.js";\nconst read = hermeticDir satisfies () => string;\nvoid read;'],
    ["a read through a non-null assertion", 'import { hermeticDir } from "./helpers/guarded.js";\nconst read = hermeticDir!;\nvoid read;'],
    ["a read as an instantiation expression", 'import { hermeticDir } from "./helpers/guarded.js";\nconst read = hermeticDir<never>;\nvoid read;'],
    ["a shorthand property", 'import { hermeticDir } from "./helpers/guarded.js";\nconst bag = { hermeticDir };\nvoid bag;'],
    ["a computed object key", 'import { hermeticDir } from "./helpers/guarded.js";\nconst bag = { [hermeticDir()]: 1 };\nvoid bag;'],
    ["a computed class property key", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Keyed {\n  [hermeticDir()] = 1;\n}\nvoid Keyed;'],
    ["a parameter default", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction pick(dir = hermeticDir()): string {\n  return dir;\n}\npick();'],
    ["a destructuring-assignment default", 'import { hermeticDir } from "./helpers/guarded.js";\nlet dir = "";\n({ dir = hermeticDir() } = {} as { dir?: string });\nvoid dir;'],
    ["a class that extends an import", 'import { Base } from "./helpers/guarded.js";\nclass Probe extends Base {}\nvoid Probe;'],
    ["a class expression that extends an import", 'import { Base } from "./helpers/guarded.js";\nconst Probe = class extends Base {};\nvoid Probe;'],
    ["an enum member initialiser", 'import { hermeticDir } from "./helpers/guarded.js";\nenum Width {\n  Dir = hermeticDir().length,\n}\nvoid Width;'],
    ["a read inside a namespace", 'import { hermeticDir } from "./helpers/guarded.js";\nnamespace Local {\n  export const dir = hermeticDir();\n}\nvoid Local;'],
    ["a local re-export of the import", 'import { hermeticDir } from "./helpers/guarded.js";\nexport { hermeticDir };'],
    ["a renamed local re-export", 'import { hermeticDir } from "./helpers/guarded.js";\nexport { hermeticDir as dir };'],
    ["a default export of the import", 'import { hermeticDir } from "./helpers/guarded.js";\nexport default hermeticDir;'],
    ["a read in an anonymous default export function", 'import { hermeticDir } from "./helpers/guarded.js";\nexport default function (): string {\n  return hermeticDir();\n}'],
    ["a value re-export from the helper", 'export { hermeticDir } from "./helpers/guarded.js";'],
    ["a star re-export from the helper", 'export * from "./helpers/guarded.js";'],
    ["an empty re-export (kept as a side-effect import)", 'export {} from "./helpers/guarded.js";'],
    ["a namespace re-export from the helper", 'export * as guarded from "./helpers/guarded.js";'],
    ["a computed method key read beside a parameter of the same name", 'import { hermeticDir } from "./helpers/guarded.js";\nclass Keyed {\n  [hermeticDir()](hermeticDir: string): string {\n    return hermeticDir;\n  }\n}\nvoid Keyed;'],
    ["a read beside a nested function's var of the same name", 'import { hermeticDir } from "./helpers/guarded.js";\nfunction outer(): string {\n  function inner(): void {\n    var hermeticDir = "x";\n    void hermeticDir;\n  }\n  inner();\n  return hermeticDir();\n}\nouter();'],
    ["a top-level dynamic import", 'await import("./helpers/guarded.js");'],
    ["a top-level awaited import() bound to a name", 'const guarded = await import("./helpers/guarded.js");\nvoid guarded;'],
    ["an awaited import() in a top-level block", '{\n  await import("./helpers/guarded.js");\n}'],
    ["an awaited import() in parentheses", 'await (import("./helpers/guarded.js"));'],
  ])("G2 accepts a suite whose guard arrives through %s: the runtime evaluates it", (_shape, form) => {
    expect(behind(form).unguarded.has("test/a.test.ts")).toBe(false);
  });

  it("G2 follows the runtime edge rule at every hop: a helper read by value whose own path to the guard is import type adds no guard", () => {
    const hop = { "test/helpers/hop.ts": 'import type { Hermetic } from "./guarded.js";\nexport const hop = 1;\nexport type Dir = Hermetic;\n' };
    expect(behind('import { hop } from "./helpers/hop.js";\nvoid hop;', hop).unguarded.get("test/a.test.ts")).toEqual(["test/a.test.ts"]);
  });

  it("G2 follows the runtime edge rule at every hop: a helper read by value whose own path to the guard is a side-effect import installs it", () => {
    const hop = { "test/helpers/hop.ts": 'import "./guarded.js";\nexport const hop = 1;\n' };
    expect(behind('import { hop } from "./helpers/hop.js";\nvoid hop;', hop).unguarded.has("test/a.test.ts")).toBe(false);
  });

  it("G2 keeps every static import of a plain .mjs module: node evaluates an unread import, so the guard it brings installs", () => {
    const guarded = "import { installScratchLeakGuard } from './scratch.mjs';\ninstallScratchLeakGuard();\nexport const hermeticDir = () => '';\n";
    const runner = "import { hermeticDir } from './guarded.mjs';\nimport { makeScratch } from './scratch.mjs';\nmakeScratch('r-');\n";
    expect([...tree({ "qa/workbench/scratch.mjs": HELPER, "qa/workbench/guarded.mjs": guarded, "qa/workbench/run.mjs": runner }).unguarded.keys()]).toEqual([]);
  });

  // A dynamic load runs when control reaches it, so loading a suite runs only the require() calls and the awaited
  // import() calls at its module scope. Measured 2026-10-17 on vitest 4.1.10 with the real guard of
  // test/helpers/boot-extension.ts and one makeScratch leak per suite: each form below passed with its scratch left
  // behind (the guard never audited it, even when a hook or a test ran the load), while a top-level await import() of
  // the helper (bare, bound to a name, in a block or in parentheses) failed on the guard. G2 still follows these loads
  // for the allocations a run can reach (the last two rows below).
  it.each([
    ["an import() inside a function that is never called", 'async function never(): Promise<void> {\n  await import("./helpers/guarded.js");\n}\nvoid never;'],
    ["an import() returned by an arrow function", 'const load = (): Promise<unknown> => import("./helpers/guarded.js");\nvoid load;'],
    ["an import() inside a method", 'class Loader {\n  load(): Promise<unknown> {\n    return import("./helpers/guarded.js");\n  }\n}\nvoid Loader;'],
    ["an awaited import() inside a beforeAll hook", 'import { beforeAll } from "vitest";\nbeforeAll(async () => {\n  await import("./helpers/guarded.js");\n});'],
    ["an awaited import() inside a test body", 'import { it } from "vitest";\nit("loads", async () => {\n  await import("./helpers/guarded.js");\n});'],
    ["a top-level import() that is not awaited", 'void import("./helpers/guarded.js");'],
    ["a require() in a class field initialiser", 'class Holder {\n  loaded = require("./helpers/guarded.js");\n}\nvoid Holder;'],
    ["an import() in a parameter default", 'async function pick(loaded = import("./helpers/guarded.js")): Promise<unknown> {\n  return loaded;\n}\nvoid pick;'],
    ["a require() inside a function", 'function load(): unknown {\n  return require("./helpers/guarded.js");\n}\nvoid load;'],
  ])("G2 reports a suite whose only path to the guard is %s: loading the suite does not run it", (_shape, form) => {
    expect(behind(form).unguarded.get("test/a.test.ts")).toEqual(["test/a.test.ts"]);
  });

  it("G2 follows the dynamic-load rule at every hop: a helper read by value whose own path to the guard is an import() it never awaits adds no guard", () => {
    const hop = { "test/helpers/hop.ts": 'export const hop = 1;\nexport const later = (): Promise<unknown> => import("./guarded.js");\n' };
    expect(behind('import { hop } from "./helpers/hop.js";\nvoid hop;', hop).unguarded.get("test/a.test.ts")).toEqual(["test/a.test.ts"]);
  });

  const LAZY_FIXTURE = 'import { makeScratch } from "./scratch.js";\nexport const fixture = (): string => makeScratch("f-");\n';
  const LAZY_SUITE = 'import { it } from "vitest";\nit("loads", async () => {\n  const { fixture } = await import("./helpers/fixture.js");\n  fixture();\n});\n';

  it("G2 follows a dynamic load for the allocations a run can reach: an allocating helper imported only inside a test still needs a module-scope guard", () => {
    const result = tree({ "test/helpers/scratch.ts": HELPER, "test/helpers/fixture.ts": LAZY_FIXTURE, "test/a.test.ts": LAZY_SUITE });
    expect(result.unguarded.get("test/a.test.ts")).toEqual(["test/helpers/fixture.ts"]);
  });

  it("G2 accepts that suite once a guard is installed at its module scope", () => {
    const guarded = `import { installScratchLeakGuard } from "./helpers/scratch.js";\ninstallScratchLeakGuard();\n${LAZY_SUITE}`;
    expect(tree({ "test/helpers/scratch.ts": HELPER, "test/helpers/fixture.ts": LAZY_FIXTURE, "test/a.test.ts": guarded }).unguarded.has("test/a.test.ts")).toBe(false);
  });

  // The gate's own falsifiers (wb-e37 gate-2, row 455) against the real helpers: test/helpers/boot-extension.ts installs
  // the guard at module scope and exports the interface Hermetic and the function hermeticDir. Measured on vitest
  // 4.1.10 with one makeScratch leak per suite: F-a, F-b and N passed with their scratch left behind; C and the
  // side-effect import failed on the guard.
  const againstBootExtension = (form: string): Census =>
    tree({
      "test/helpers/scratch.ts": readFileSync(join(ROOT, "test/helpers/scratch.ts"), "utf8"),
      "test/helpers/boot-extension.ts": readFileSync(join(ROOT, "test/helpers/boot-extension.ts"), "utf8"),
      "test/a.test.ts": `${form}\nimport { makeScratch } from "./helpers/scratch.js";\nmakeScratch("zz-g2a-");\n`,
    });

  it.each([
    ["F-a, an import type of Hermetic", 'import type { Hermetic } from "./helpers/boot-extension.js";'],
    ["F-b, a value import of hermeticDir that is never read", 'import { hermeticDir } from "./helpers/boot-extension.js";'],
    ["N, no path to the guard at all", ""],
  ])("G2 reports the gate falsifier %s against the real test/helpers/boot-extension.ts", (_shape, form) => {
    expect(againstBootExtension(form).unguarded.has("test/a.test.ts")).toBe(true);
  });

  it.each([
    ["C, a value import of hermeticDir read by typeof in a value position", 'import { hermeticDir } from "./helpers/boot-extension.js";\nconst kind = typeof hermeticDir;\nvoid kind;'],
    ["a side-effect import of the helper", 'import "./helpers/boot-extension.js";'],
  ])("G2 accepts the gate control %s against the real test/helpers/boot-extension.ts", (_shape, form) => {
    expect(againstBootExtension(form).unguarded.has("test/a.test.ts")).toBe(false);
  });

  it("G3 reports an untracked direct allocation in a file of the scanned tree", () => {
    const result = tree({ "test/a.test.ts": 'import { mkdtempSync } from "node:fs";\nimport { tmpdir } from "node:os";\nmkdtempSync(join(tmpdir(), "a-"));\n', "qa/workbench/run.mjs": "import os from 'node:os';\nconsole.log(os.tmpdir());\n" });
    expect(Object.fromEntries(result.raw)).toEqual({ "qa/workbench/run.mjs": { mkdtemp: 0, tmpdir: 1 }, "test/a.test.ts": { mkdtemp: 1, tmpdir: 1 } });
  });
});
