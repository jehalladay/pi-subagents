/**
 * wb-37o9 (the rule-19 structural-exit child of wb-5mco: ruling R-B290 deferred the recursive-flow cycle figures here at
 * wb-5mco's refusal #3, and ruling R-B297 folded refusal #4's members into its notes and parked the parent behind it): the
 * T-ARMS reader of wb-5mco's FINAL cut #4 (machine/flywheel/wb-5mco tip f0f84dbbcc4c8fbc2d1b3c5c51a947de5a736744, the same
 * path), which this cut lands first. Every line below this header is that tip's line 12 onward, byte for byte and in its order;
 * only the tip's own header (its lines 1-11), which pointed into wb-5mco's census, is replaced by this one. That census
 * (test/workbench-w10-tsx-judge-arms-census.test.ts at the tip) is not on trunk: where a doc comment below names "the census
 * header" or its READ, REFUSED or RESIDUAL list, it means that census at that tip, and it claims nothing here. What is claimed
 * about this module is stated by the census that reads it and never here: test/workbench-w10-tsx-judge-arms-recursion-census.test.ts
 * holds, probe by probe, the arm pattern sources and unread entries readJudgeArms() gives the recursive-flow probes it plants and
 * nothing wider. The parent stays parked until this lands, and its later re-cut can import this module. It imports only
 * typescript; it spawns, writes and reads nothing (the caller passes the source).
 */
import ts from "typescript";

/** `text` with every regular-expression metacharacter escaped. */
export const quotedPattern = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** The W10 stamped-claim guard, whose TSX-era judge T-ARMS reads (the judge is the source of truth for which diagnoses a pin must
 * draw): readJudgeArms() names the source it parses after it. */
export const SELF = "test/workbench-w10-stamped-claim-guard.test.ts";
/** The shared W10 view judgeTsxRow opens with (the module-level declaration of this name): its arms are judged by the guard's
 * stamped-claim tables, so T-ARMS never enters it. */
export const SHARED_VIEW = "w10View";
/** The name a direct eval is called by: T-ARMS refuses every call of it in the source it reads (the census header's REFUSED list),
 * since a direct eval can read and write any binding in scope, the lists and functions T-ARMS reads included. */
export const DIRECT_EVAL = "eval";

/** One diagnosis arm T-ARMS reads: its pattern (anchored at both ends, each substitution any text) and the literal pieces its
 * substitutions separate (T-ARMS-ANCHORED reads them). */
export interface JudgeArm {
  pattern: RegExp;
  pieces: readonly string[];
}

/** What T-ARMS reads from the judge's source: every arm in the judge's order, and every refusal the census header's REFUSED list
 * names, each as `<reason> (line <n>): <statement>`. */
export interface ArmsReading {
  arms: readonly JudgeArm[];
  unread: readonly string[];
}

/** A function T-ARMS enters: a function declaration with a body, or a const binding of an arrow or function expression. */
type ArmCallable = ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression;
/** A name as T-ARMS resolves it, from the one declaration the TypeScript checker binds the reference to: a function it enters, a
 * generator function (never entered), a const with its initializer and the top-level function declaring it (undefined at module
 * level), or anything else (a let, a var, a parameter, an import, a class, a destructured or undeclared name, a name with more
 * than one declaration). */
type ArmBinding =
  | { kind: "callable"; name: string; callable: ArmCallable }
  | { kind: "generator"; name: string }
  | { kind: "const"; name: string; declared: ts.Identifier; initializer: ts.Expression; scope: ArmCallable | undefined }
  | { kind: "other"; name: string };
/** A reader of one flow position: a diagnosis list or one diagnosis. */
type ArmFlow = (scope: ArmCallable | undefined, node: ts.Expression, path: readonly number[], chain: readonly ArmCallable[]) => void;

/** The methods T-ARMS reads as adding diagnoses to a list it traces; a use of such a list other than these calls, a spread or a
 * return the census header's REFUSED list's traced-list item admits is unread. */
export const ARM_ADDERS: readonly string[] = ["push", "unshift"];

/** The TypeScript checker over `file` alone (no lib, no module resolution). T-ARMS asks it one thing: which declaration a name is
 * bound to at a reference (getSymbolAtLocation, a shorthand property's value symbol, an export specifier's local target) - the
 * checker's binding, which readJudgeArms() refuses where it is known not to be the run-time one (the header's PARAMETER SCOPE
 * item) and claims nothing about elsewhere (wb-m14y: its gates' G2, G2b, G6 family and G5). */
function bindingChecker(file: ts.SourceFile): ts.TypeChecker {
  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === file.fileName ? file : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "",
    getCanonicalFileName: (name) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === file.fileName,
    readFile: () => undefined,
  };
  return ts.createProgram({ rootNames: [file.fileName], options: { noLib: true, noResolve: true, types: [] }, host }).getTypeChecker();
}

/** T-ARMS's source (T-ARMS READING, wb-m14y cut #4, moved here by wb-5mco): the TSX-era judge's arms, read from `source` with the
 * TypeScript parser by following the diagnosis flow back from judgeTsxRow's return statements through exactly the forms the census
 * header's READ list names; and, as an unread entry, every construct its REFUSED list names. In the comments below, "the header"
 * is the census header. */
export function readJudgeArms(source: string): ArmsReading {
  const file = ts.createSourceFile(SELF, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const checker = bindingChecker(file);
  const unread = new Set<string>();
  const statementOf = (node: ts.Node): ts.Node => (node.parent === undefined || ts.isSourceFile(node.parent) || ts.isBlock(node.parent) ? node : statementOf(node.parent));
  const refuse = (node: ts.Node, why: string): void => {
    const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    unread.add(`${why} (line ${line}): ${statementOf(node).getText(file).replace(/\s+/g, " ").slice(0, 120)}`);
  };
  const isWrapper = (node: ts.Node): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion =>
    ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node);
  const unwrapped = (node: ts.Expression): ts.Expression => (isWrapper(node) ? unwrapped(node.expression) : node);
  const outer = (node: ts.Node): ts.Node => (node.parent !== undefined && isWrapper(node.parent) ? outer(node.parent) : node);
  const ownerOf = (node: ts.Node): ts.Node | undefined => (node.parent === undefined || ts.isFunctionLike(node.parent) ? node.parent : ownerOf(node.parent));
  // A TYPE POSITION: under a type node, except the operand of a class's extends clause or of an instantiation expression, a value
  // evaluated at run time (TypeScript parses both as type nodes); an implements clause and an interface's extends clause stay types.
  const inType = (node: ts.Node): boolean => {
    const parent = node.parent;
    if (parent === undefined) return false;
    if (ts.isExpressionWithTypeArguments(parent) && parent.expression === node) {
      const clause = parent.parent;
      return ts.isHeritageClause(clause) && (clause.token === ts.SyntaxKind.ImplementsKeyword || ts.isInterfaceDeclaration(clause.parent));
    }
    return ts.isTypeNode(parent) || inType(parent);
  };
  // The symbol the checker binds a name to: for a shorthand property its value's, never the property's own; for the local side of
  // an export specifier (its property name, or its one name) the local binding it exports, never the export alias (wb-m14y, its
  // second gate's G5).
  const symbolOf = (name: ts.Identifier): ts.Symbol | undefined => {
    const parent = name.parent;
    if (ts.isShorthandPropertyAssignment(parent) && parent.name === name) return checker.getShorthandAssignmentValueSymbol(parent);
    if (ts.isExportSpecifier(parent) && (parent.propertyName ?? parent.name) === name) return checker.getExportSpecifierLocalTargetSymbol(parent);
    return checker.getSymbolAtLocation(name);
  };
  // The outermost function T-ARMS could enter around `node`, or undefined at module level.
  const topOf = (node: ts.Node): ArmCallable | undefined => {
    let top: ArmCallable | undefined;
    for (let at = node.parent; at !== undefined; at = at.parent) {
      if (ts.isFunctionDeclaration(at) || ts.isArrowFunction(at) || ts.isFunctionExpression(at)) top = at;
    }
    return top;
  };
  const scopeOf = (callable: ArmCallable): ArmCallable => topOf(callable) ?? callable;
  const classify = (declarations: readonly ts.Declaration[], name: string): ArmBinding => {
    const [only] = declarations;
    if (declarations.length !== 1 || only === undefined) return { kind: "other", name };
    if (ts.isFunctionDeclaration(only) && only.body !== undefined) return only.asteriskToken === undefined ? { kind: "callable", name, callable: only } : { kind: "generator", name };
    if (!ts.isVariableDeclaration(only) || !ts.isIdentifier(only.name) || only.initializer === undefined || (ts.getCombinedNodeFlags(only) & ts.NodeFlags.BlockScoped) !== ts.NodeFlags.Const) {
      return { kind: "other", name };
    }
    const value = unwrapped(only.initializer);
    if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) return value.asteriskToken === undefined ? { kind: "callable", name, callable: value } : { kind: "generator", name };
    return { kind: "const", name, declared: only.name, initializer: only.initializer, scope: topOf(only) };
  };
  // Resolution: the declaration the checker binds the reference to (the checker's binding; index() refuses a parameter-list name
  // it binds into that function's body, the PARAMETER SCOPE item).
  const resolve = (reference: ts.Identifier): ArmBinding => classify(symbolOf(reference)?.declarations ?? [], reference.text);
  // A module-level name, resolved at its own declaration (judgeTsxRow and the shared W10 view).
  const atModule = (name: string): ArmBinding => {
    for (const statement of file.statements) {
      if (ts.isFunctionDeclaration(statement) && statement.name?.text === name) return resolve(statement.name);
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name) && declaration.name.text === name) return resolve(declaration.name);
      }
    }
    return { kind: "other", name };
  };
  // The shared W10 view is the module-level SHARED_VIEW declaration itself: a function of another scope sharing its name is entered like any other.
  const shared = atModule(SHARED_VIEW);
  const isShared = (bound: ArmBinding): boolean => bound.kind === "callable" && shared.kind === "callable" && bound.callable === shared.callable;
  // The body of a function-like declaration whose parameter list T-ARMS can meet (a function declaration or expression, an arrow,
  // a method, a constructor or an accessor, of which only a setter takes a parameter), or undefined.
  const bodyOf = (node: ts.Node): ts.Node | undefined =>
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node)
      ? node.body
      : undefined;
  // One walk of the file, in source order: every identifier by its text; every call of the name eval refused (a direct eval can
  // read and write any binding in scope); and PARAMETER SCOPE (wb-m14y, its second gate's G6 family): a name anywhere in a
  // parameter list - an initializer, the parameter's own or a binding element's, a computed key of its binding pattern, or a
  // closure created there, at any depth - that the checker binds to a declaration in that function's body is refused, its own
  // declaring name and type positions aside. At run time a parameter list with expressions has its own scope, which cannot see
  // the body's declarations, so there the checker's binding is not the run-time one. `bodies` holds the body of every function
  // whose parameter list encloses `node`.
  const named = new Map<string, ts.Identifier[]>();
  const index = (node: ts.Node, bodies: readonly ts.Node[]): void => {
    if (ts.isIdentifier(node)) {
      const same = named.get(node.text);
      if (same === undefined) named.set(node.text, [node]);
      else same.push(node);
      if (bodies.length > 0 && !inType(node)) {
        const declarations = symbolOf(node)?.declarations ?? [];
        const declaring = declarations.some((declaration) => ts.getNameOfDeclaration(declaration) === node);
        if (!declaring && declarations.some((declaration) => bodies.some((body) => declaration.pos >= body.pos && declaration.end <= body.end))) {
          refuse(node, `the name ${node.text} in a parameter list, bound by the checker to a declaration in that function's body, which the run-time parameter scope does not see`);
        }
      }
    } else if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      if (ts.isIdentifier(callee) && callee.text === DIRECT_EVAL) refuse(node, "a direct eval, whose code T-ARMS does not read");
    }
    const body = ts.isParameter(node) ? bodyOf(node.parent) : undefined;
    const enclosing = body === undefined ? bodies : [...bodies, body];
    ts.forEachChild(node, (child) => index(child, enclosing));
  };
  // Every reference the checker binds to the declaration `declared` names, inside `within` (type positions aside), in source order.
  const referencesOf = (within: ts.Node, declared: ts.Identifier): ts.Identifier[] => {
    const target = symbolOf(declared);
    if (target === undefined) return [];
    return (named.get(declared.text) ?? []).filter((node) => node !== declared && node.pos >= within.pos && node.end <= within.end && !inType(node) && symbolOf(node) === target);
  };
  // Every reference to a function declaration T-ARMS enters - an identifier the checker binds to it, or an export specifier whose
  // local target it is (symbolOf) - anywhere in the file outside type positions, other than as the callee of a call, is refused.
  const vetted = new Set<ArmCallable>();
  const vet = (callable: ArmCallable, name: string): void => {
    if (!ts.isFunctionDeclaration(callable) || callable.name === undefined || vetted.has(callable)) return;
    vetted.add(callable);
    for (const reference of referencesOf(file, callable.name)) {
      if (!ts.isCallExpression(reference.parent) || reference.parent.expression !== reference) refuse(reference, `the function ${name} referenced other than as the callee of a call`);
    }
  };
  const returnsOf = (callable: ArmCallable): ts.Expression[] => {
    const body = callable.body;
    if (body === undefined) return [];
    if (!ts.isBlock(body)) return [body];
    const found: ts.Expression[] = [];
    const walk = (node: ts.Node): void => {
      if (ts.isFunctionLike(node) || ts.isClassLike(node)) return;
      if (ts.isReturnStatement(node)) {
        if (node.expression === undefined) refuse(node, "a return without a value");
        else found.push(node.expression);
      }
      ts.forEachChild(node, walk);
    };
    ts.forEachChild(body, walk);
    return found;
  };
  // Two expressions naming the same traced value: one binding, or one property of one binding.
  const sameValue = (a: ts.Expression, b: ts.Expression): boolean => {
    const x = unwrapped(a);
    const y = unwrapped(b);
    if (ts.isIdentifier(x) && ts.isIdentifier(y)) return symbolOf(x) !== undefined && symbolOf(x) === symbolOf(y);
    return ts.isPropertyAccessExpression(x) && ts.isPropertyAccessExpression(y) && x.name.text === y.name.text && sameValue(x.expression, y.expression);
  };
  // A use where a list leaves unchanged: spread (a copy), or returned by the function that declares it - alone, or as the value of
  // the one member of a returned object literal that carries it (a second member carrying it is an alias); a closure handing it
  // out is an alias, never a return.
  const flowsOut = (node: ts.Expression, declared: ts.Node): boolean => {
    const at = outer(node);
    const parent = at.parent;
    if (ts.isSpreadElement(parent)) return true;
    const own = (returned: ts.Node): boolean => ownerOf(returned) === ownerOf(declared);
    if (ts.isReturnStatement(parent) || (ts.isArrowFunction(parent) && parent.body === at)) return own(at);
    const member = (ts.isShorthandPropertyAssignment(parent) && parent.name === at) || (ts.isPropertyAssignment(parent) && parent.initializer === at) ? parent : undefined;
    const object = member === undefined ? undefined : outer(member.parent);
    if (member === undefined || object === undefined || !(ts.isReturnStatement(object.parent) || (ts.isArrowFunction(object.parent) && object.parent.body === object)) || !own(object)) return false;
    const carriers = member.parent.properties.filter((other) => (ts.isShorthandPropertyAssignment(other) && sameValue(other.name, node)) || (ts.isPropertyAssignment(other) && sameValue(other.initializer, node)));
    return carriers.length === 1;
  };
  const leaves = new Map<ts.Node, { key: readonly number[]; literal: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateExpression }>();
  const before = (a: readonly number[], b: readonly number[]): number => {
    for (let index = 0; index < Math.min(a.length, b.length); index++) {
      const step = (a[index] ?? 0) - (b[index] ?? 0);
      if (step !== 0) return step;
    }
    return a.length - b.length;
  };
  const visiting = new Set<ts.Node>();
  const enter = (call: ts.CallExpression, callee: ts.Identifier, path: readonly number[], chain: readonly ArmCallable[], next: ArmFlow): void => {
    const bound = resolve(callee);
    if (bound.kind === "generator") {
      refuse(call, `a call of ${callee.text}, a generator function T-ARMS does not enter`);
      return;
    }
    if (bound.kind !== "callable" || isShared(bound)) {
      refuse(call, `a call of ${callee.text}, not a function of this file T-ARMS enters`);
      return;
    }
    if (chain.includes(bound.callable)) {
      refuse(call, `a recursive diagnosis flow through ${bound.name}`);
      return;
    }
    vet(bound.callable, bound.name);
    for (const returned of returnsOf(bound.callable)) next(scopeOf(bound.callable), returned, [...path, call.getStart(file)], [...chain, bound.callable]);
  };
  // A const list: its initializer, plus the arguments of every push() and unshift() on it; any other use but a flow out is unread.
  const variable = (scope: ArmCallable, bound: Extract<ArmBinding, { kind: "const" }>, path: readonly number[], chain: readonly ArmCallable[]): void => {
    if (visiting.has(bound.declared)) {
      refuse(bound.declared, `the diagnosis list ${bound.name} read inside its own flow`);
      return;
    }
    visiting.add(bound.declared);
    list(scope, bound.initializer, path, chain);
    for (const reference of referencesOf(scope, bound.declared)) {
      const access = reference.parent;
      const call = ts.isPropertyAccessExpression(access) && access.expression === reference && ARM_ADDERS.includes(access.name.text) ? access.parent : undefined;
      if (call !== undefined && ts.isCallExpression(call) && call.expression === access) {
        for (const argument of call.arguments) {
          if (ts.isSpreadElement(argument)) list(scope, argument.expression, path, chain);
          else item(scope, argument, path, chain);
        }
      } else if (!flowsOut(reference, bound.declared)) {
        refuse(reference, `the diagnosis list ${bound.name} used outside the forms T-ARMS reads`);
      }
    }
    visiting.delete(bound.declared);
  };
  // A list read as `holder.property`, the holder a const of the same top-level function bound to a call of a function T-ARMS
  // enters: that property of each of the callee's returned object literals. The holder is used only as the object of property
  // reads, and the property itself only where it flows out unchanged.
  const held = (scope: ArmCallable | undefined, access: ts.PropertyAccessExpression, holderName: ts.Identifier, path: readonly number[], chain: readonly ArmCallable[]): void => {
    const holder = resolve(holderName);
    const value = holder.kind === "const" && scope !== undefined && holder.scope === scope ? unwrapped(holder.initializer) : undefined;
    const callee = value !== undefined && ts.isCallExpression(value) && ts.isIdentifier(value.expression) ? resolve(value.expression) : undefined;
    if (holder.kind !== "const" || scope === undefined || value === undefined || callee?.kind !== "callable") {
      refuse(access, "a diagnosis list read from a value T-ARMS does not trace");
      return;
    }
    const property = access.name.text;
    for (const reference of referencesOf(scope, holder.declared)) {
      const read = reference.parent;
      if (!ts.isPropertyAccessExpression(read) || read.expression !== reference) refuse(reference, `the value ${holder.name} carrying a diagnosis list used outside a property read`);
      else if (read.name.text === property && !flowsOut(read, holder.declared)) refuse(read, `the diagnosis list ${holder.name}.${property} used outside the forms T-ARMS reads`);
    }
    if (isShared(callee)) {
      if (property !== "findings") refuse(access, `the shared W10 view's ${property} read as a diagnosis list`);
      return;
    }
    if (chain.includes(callee.callable)) {
      refuse(access, `a recursive diagnosis flow through ${callee.name}`);
      return;
    }
    vet(callee.callable, callee.name);
    for (const returned of returnsOf(callee.callable)) {
      const object = unwrapped(returned);
      const members: readonly ts.ObjectLiteralElementLike[] | undefined = ts.isObjectLiteralExpression(object) ? [...object.properties] : undefined;
      // Identifier-named property and shorthand assignments only: a spread, a computed or literal name, a method or an accessor can
      // put another value under the property.
      const plain = members?.every((member) => (ts.isPropertyAssignment(member) || ts.isShorthandPropertyAssignment(member)) && ts.isIdentifier(member.name)) === true;
      const matches: Array<ts.PropertyAssignment | ts.ShorthandPropertyAssignment> = [];
      for (const member of members ?? []) {
        if ((ts.isPropertyAssignment(member) || ts.isShorthandPropertyAssignment(member)) && ts.isIdentifier(member.name) && member.name.text === property) matches.push(member);
      }
      const [match] = matches;
      if (!plain || matches.length !== 1 || match === undefined) {
        refuse(returned, `a return of ${callee.name} that does not carry exactly one ${property}`);
        continue;
      }
      list(scopeOf(callee.callable), ts.isShorthandPropertyAssignment(match) ? match.name : match.initializer, [...path, value.getStart(file)], [...chain, callee.callable]);
    }
  };
  // A diagnosis list: an array literal (each element a diagnosis, each spread a list), a conditional of lists, a call of a
  // function T-ARMS enters (each of its returns a list), a const list of the same function, or a list a holder carries.
  const list: ArmFlow = (scope, node, path, chain) => {
    const expression = unwrapped(node);
    if (ts.isArrayLiteralExpression(expression)) {
      for (const element of expression.elements) {
        if (ts.isSpreadElement(element)) list(scope, element.expression, path, chain);
        else if (ts.isOmittedExpression(element)) refuse(element, "a hole in a diagnosis list");
        else item(scope, element, path, chain);
      }
    } else if (ts.isConditionalExpression(expression)) {
      list(scope, expression.whenTrue, path, chain);
      list(scope, expression.whenFalse, path, chain);
    } else if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      enter(expression, expression.expression, path, chain, list);
    } else if (ts.isIdentifier(expression)) {
      const bound = resolve(expression);
      if (bound.kind === "const" && scope !== undefined && bound.scope === scope) variable(scope, bound, path, chain);
      else refuse(expression, `a diagnosis list ${expression.text} that is not a const of the function returning it`);
    } else if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression)) {
      held(scope, expression, expression.expression, path, chain);
    } else {
      refuse(expression, "a diagnosis list in a form T-ARMS does not trace");
    }
  };
  // One diagnosis: a string, no-substitution template or template literal (an arm), a conditional of diagnoses, a const (of a
  // function or the module) whose initializer is one, or a call of a function T-ARMS enters (each of its returns one).
  const item: ArmFlow = (scope, node, path, chain) => {
    const expression = unwrapped(node);
    if (path.length > 64) {
      refuse(expression, "a diagnosis flow deeper than T-ARMS reads");
    } else if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression) || ts.isTemplateExpression(expression)) {
      const key = [...path, expression.getStart(file)];
      const known = leaves.get(expression);
      if (known === undefined || before(key, known.key) < 0) leaves.set(expression, { key, literal: expression });
    } else if (ts.isConditionalExpression(expression)) {
      item(scope, expression.whenTrue, path, chain);
      item(scope, expression.whenFalse, path, chain);
    } else if (ts.isIdentifier(expression)) {
      const bound = resolve(expression);
      if (bound.kind === "const") item(bound.scope, bound.initializer, [...path, expression.getStart(file)], chain);
      else refuse(expression, `a diagnosis read from ${expression.text}, which is not a const value`);
    } else if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      enter(expression, expression.expression, path, chain, item);
    } else {
      refuse(expression, "a diagnosis in a form T-ARMS does not read");
    }
  };
  index(file, []);
  const judge = atModule("judgeTsxRow");
  if (judge.kind === "callable") {
    vet(judge.callable, judge.name);
    for (const returned of returnsOf(judge.callable)) list(scopeOf(judge.callable), returned, [], [judge.callable]);
  } else {
    refuse(file, "no judgeTsxRow function");
  }
  const arms = [...leaves.values()]
    .sort((a, b) => before(a.key, b.key))
    .map(({ literal }) => {
      const pieces = ts.isTemplateExpression(literal) ? [literal.head.text, ...literal.templateSpans.map((span) => span.literal.text)] : [literal.text];
      return { pattern: new RegExp(`^${pieces.map(quotedPattern).join("[\\s\\S]*?")}$`), pieces };
    });
  return { arms, unread: [...unread] };
}
