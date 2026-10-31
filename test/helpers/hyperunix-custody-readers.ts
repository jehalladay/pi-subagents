/**
 * wb-tz2.16 (HX-ORIGINAL-GOALS-CLOSURE-R11, program-triage-2026-10-17; the rule-19 structural-exit child of wb-tz2.11,
 * orchestrator rulings R-B83 and R-B98): the BINDING-AWARE HyperUnix custody readers. wb-tz2.11's custody-claims census (cut
 * #4 b7c2de1e, not on trunk; blocked by this bead under R-B98) defines its C2 tamper reader and its C7 driver, falsifier-shape,
 * command-head and prefilter readers locally and reads a name by its spelling file-wide: a const name reads every const
 * declaration of it, and a root reads as a local wherever the file declares that name in any scope. These readers resolve every
 * name in its own scope instead, so that census's final core re-cut can take them in place of its own (R-B98: "claims
 * unchanged from cut #4 except where the child's falsifiers pin them"). The falsifier census is
 * test/workbench-hyperunix-custody-readers-census.test.ts. It holds every "- <word>:" line of this header equal, in order, to
 * the roster exported for its section, gives every word a calibration plant, and reds when the reader for a word is removed.
 *
 * BINDINGS (bindingOf): an identifier resolves through the TypeScript binder's own symbol at its use site, in a one-file
 * program over the very source (no lib, no module resolution, nothing emitted), so a same-named declaration in another scope
 * never answers for it (refusal #3 U1, refusal #4 U1); an expando entry the binder records for a property write (f.tag = v)
 * is no declaration, nor is a type-only one (an interface or a type alias). BINDING_KINDS:
 * - import: the symbol is declared in the file by an import (named, default or namespace) or an import-equals
 * - global: the symbol has no declaration in the file, or only declarations in an ambient context
 * - local: any other declaration in the file
 * VALUES (stringValues): a string literal or a no-substitution template, or an identifier whose own binding is a local const
 * declaration of that name initialized by one (its one variable declaration: a namespace merged with it holds no value), through a chain of such names (a cycle reads no value); parentheses, as,
 * satisfies, non-null and <T> assertions are read through. Any other value (a let or var binding, an ambient const, a member,
 * a parameter, an imported name, a computed string) is no value.
 * CHAINS (calleeChains): a member, or an element whose key has a value (any other key reads <computed>), as dotted text, with
 * a leading globalThis. or global. dropped; a root identifier reads as its own spelling and, when its own binding is a const
 * initialized by a member chain or a name, as that chain's spellings too.
 * ROOTS (outsideChains): a chain is OUTSIDE when its root is an import binding or a global (a call, a this, a literal or any
 * other root is not); a local root reads, as candidates, the chains of every value its own binding may hold. ROOT_FORMS:
 * - initializer: a variable's initializer
 * - reassignment: for a let or var, every value assigned to it in the file through its own name by =, ||=, &&= or ??=
 * - destructured: a destructured binding's source chain (its declaration's initializer) with its keys (an array element by its index; a rest element holds a copy and reads nothing), and its own default
 * - for-of element: a for-of variable's elements when the iterable is an array literal, directly or through a const name
 * - parameter default: a parameter's default value
 * - call argument: the argument at a parameter's position in every call of its function through a name whose own binding is the function's declaration or a variable initialized by the function (read through parentheses and assertions); a rest parameter reads nothing
 * - immediately invoked: the argument at a parameter's position when its function is itself the callee
 * - call() argument: the argument one place later in a call() of the function by either route
 * A chain under process.env is the environment, which the stubbed HyperUnix.open makes inert, and is not read, unless it
 * leaves the environment object through constructor, __proto__ or prototype (refusal #4 F3).
 *
 * C2 TAMPER FORMS (tampersIn, C2_FORMS; each finding is "<what> :<line>"):
 * - spy: a vi.spyOn call other than the custody stub vi.spyOn(HyperUnix, "open"), whose receiver is a name bound to a named import (aliased or not) of CUSTODY_EXPORT from an HX module (importsCustodyExport) and whose "open" is a value
 * - global stub: a GLOBAL_STUBS call
 * - watched reference: a WATCHED callee chain read other than as a call's callee (an argument, an alias, call / apply / bind of it)
 * - destructured watched: a WATCHED member destructured from its owner (the declaration's initializer) in a declaration (a rest element holds every member)
 * - destructuring-assigned watched: a WATCHED member destructured from its owner by a destructuring assignment (a rest element holds every member)
 * - assignment: = on an outside target, every element of an array or object destructuring-assignment pattern included (nested, spread and rest)
 * - compound operator: an assignment by any other assignment operator (+=, &&=, ??= and the rest) on an outside target
 * - for-of target: an outside for-of assignment target
 * - for-in target: an outside for-in assignment target
 * - delete: delete of an outside chain
 * - update: ++ or -- (prefix or postfix) of an outside chain
 * - mutator call: a MUTATORS call (read through calleeChains) whose first argument is outside
 * - legacy accessor definer: __defineGetter__ or __defineSetter__ called as a member of an outside chain (refusal #4 F4)
 * A write whose target is a bare name bound to a local declaration rebinds that local and reaches no value it held or receives
 * (writtenChains), so the assignment, compound operator, for-of target, for-in target, delete and update forms read nothing for it.
 * MOCKS (moduleMockSpecifiers): every call whose callee chains hold a MODULE_MOCKS name, with each value of its first argument,
 * or of the import() its first argument is.
 *
 * C7 DRIVER FORMS (hxDrivers, DRIVER_FORMS; the DRIVER_REASONS reason in brackets; an HX module is read by HX_MODULE):
 * - value import [import]: an import declaration of an HX module with a clause that is not type-only
 * - side-effect import [import]: an import declaration of an HX module with no clause
 * - export-from [import]: an export declaration from an HX module that is not type-only, named or namespace
 * - import-equals [import]: an import-equals of an HX module value that is not type-only
 * - dynamic import [import]: an import() call whose first argument is an HX module value
 * - loader call [import]: a LOADERS call (read through calleeChains) whose first argument is an HX module value
 * - created require [import]: a call of a call, or of a name whose own binding is a const initialized by a call, whose first argument is an HX module value (refusal #4 F2)
 * - invoke [invoke]: a call whose callee chains end .invoke and whose first argument's value is hyperunix.find
 * - override member [override]: HYPERUNIX_HX as a member name, an element key value or a type member on any receiver
 * - override destructuring [override]: HYPERUNIX_HX as a destructuring key
 * - override destructuring assignment [override]: HYPERUNIX_HX as a destructuring-assignment key
 * - override object key [override]: HYPERUNIX_HX as a key of an object literal that is no destructuring-assignment target
 * - override in [override]: HYPERUNIX_HX as the value of the left operand of in
 * - override env call [override]: HYPERUNIX_HX as an argument value of an ENV_CALLS call
 * - override env method [override]: HYPERUNIX_HX as an argument value of an ENV_METHODS method call
 * C7 SHAPE FORMS (falsifierShapes, SHAPE_FORMS; a member form's shape is its name's MEMBER_SHAPES entry, or F4 for a name holding the ESRCH word; a member key is the key a member form reads, never a binding element's or an import's local name or an export's exported name; a plain text is a string or template part that is no key and holds neither the ESRCH word nor a /proc path):
 * - member: a member name read as .name, called or not
 * - element key: an element key value read as ["name"]
 * - type member: the right side of a qualified name in a type
 * - destructuring: a destructuring key
 * - destructuring assignment: a destructuring-assignment key (a shorthand's default value is no target)
 * - import: an import or export specifier's imported name
 * - bare call: a call of the bare name kill
 * - identifier: an identifier holding the ESRCH word that is no member key
 * - regular expression: a regular expression holding the ESRCH word (regexText)
 * - key: a key literal holding the ESRCH word that is no member key
 * - literal: a string or template part that is no key and holds the ESRCH word
 * - /proc path: a /proc path (PROC_PATH) in a string, a template part, a key or a regular expression, unless the literal, key or regular expression form reads it as holding the ESRCH word
 * - kill name literal: a plain text kill (trimmed) outside a spawner's argument or argv array (a call whose callee is a SPAWNERS name or a member named one)
 * - pid name literal: a plain text pid (trimmed)
 * - process-table command: any other plain text whose command heads (commandHeads) hold a PROCESS_TABLE tool
 * F3 COMMAND HEADS (commandHeads): the modelled heads (modelledCommandHeads) together with cut #4's fail-closed spelling read
 * (failClosedCommandHeads: every fragment of every word past a WRAPPERS wrapper or a SHELLS shell in head position). The
 * modelled reader splits a text at COMMAND_SEPARATOR, reads each piece as shell words (shellWords: single quotes literal,
 * double quotes and a backslash escaping the next character, the quotes removed), passes VAR=value words and SHELL_KEYWORDS, and
 * reads a command head by basename through these flag forms. WRAPPER_FLAG_FORMS:
 * - lone dash: a lone "-" among a wrapper's options is a flag (su's --login, env's -i)
 * - options end: "--" ends a wrapper's options, so a dash word after it is the command head
 * - option argument: an option of a wrapper's table taking an argument takes the next word
 * - attached argument: a short option taking an argument takes the rest of its word when the word continues (-uroot)
 * - long value: a long option written --name=value carries its value in its word
 * - short cluster: a word of short flags is read letter by letter, an option taking an argument or a command ending it
 * - command option: an option of a wrapper's command table reads its argument, attached or the next word, as a command
 * - shell command flag: a shell's first command flag (a dash word holding c, --command, or --command=) reads the first operand after the shell's options as a command
 * - shell options end: "--" or a lone "-" among a shell's options ends them, so the next word is the command even when it starts with a dash
 * - shell option argument: a shell's -o, +o, -O, +O, --rcfile and --init-file take the next word
 * PREFILTER (passesPrefilter): a source is parsed when its text, raw or unescaped, holds DRIVER_NEEDLE (hyperunix, any case).
 * unescaped decodes, in one pass, UNESCAPE_FORMS:
 * - hex escape: a backslash, x and two hex digits
 * - unicode escape: a backslash, u and four hex digits
 * - braced unicode escape: a backslash, u and one to six hex digits in braces
 * - legacy octal escape: a backslash and one to three octal digits
 * - line continuation: a backslash before a line terminator, which reads as nothing
 * - escaped character: a backslash before any other character, which reads as that character (b, f, n, r, t and v as their controls)
 * - percent escape: a percent sign and two hex digits, decoded after the backslash escapes
 * A hex escape run that names no Unicode scalar value (zero, a surrogate, or above U+10FFFF) reads as U+FFFD (codePoint).
 * RESIDUALS (RESIDUAL_FAMILIES; families these readers do not read, each with a pinned quiet row and a loud control in the census):
 * - R-WRAPPER: a process-table tool run through a word outside WRAPPERS, SHELL_KEYWORDS and SHELLS (a leading redirection included), by a script file a shell runs, or inside another language's inline program reads as no command head
 * - R-INDIRECT: a module specifier, override name or capability id reached through anything but a literal or a const chain to one (a let or var binding, an object member, a parameter, an imported name), or an environment call reached through call, apply or Reflect.apply, reads as no value
 * - R-FLOW: a local root whose value arrives through a flow ROOT_FORMS does not follow (a parameter of a function the file only passes on as a value, such as a callback, or reaches only through a parameter default; a catch variable; a destructured for-of binding; a return value; an object member) reads as no outside chain, and a WATCHED member destructured in a for-of binding reads as no reference
 *
 * Display paths added: none. Test-only: spawns nothing and writes nothing; it parses the text it is given.
 */
import { posix } from "node:path";
import ts from "typescript";

// ---- syntax -----------------------------------------------------------------------------------------------------------

/** The node and every node under it, in source order. */
export function descendants(root: ts.Node): ts.Node[] {
  const out: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    out.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}
/** A source parsed with parent links; the script kind follows the path's extension. */
export function parseText(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.ESNext, true);
}
export function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}
/** An expression read through its parentheses and its as, satisfies, non-null and <T> assertions. */
export function bare(node: ts.Node): ts.Node {
  return ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node) ? bare(node.expression) : node;
}
const CALLS = new WeakMap<ts.SourceFile, readonly ts.CallExpression[]>();
/** Every call of a source, in source order. */
export function callsIn(source: ts.SourceFile): readonly ts.CallExpression[] {
  const cached = CALLS.get(source);
  if (cached !== undefined) return cached;
  const calls = descendants(source).filter(ts.isCallExpression);
  CALLS.set(source, calls);
  return calls;
}
/** The character a decoded escape names: the code point itself when it is a Unicode scalar value, else U+FFFD. */
export function codePoint(value: number): string {
  return Number.isSafeInteger(value) && value > 0 && value <= 0x10ffff && (value < 0xd800 || value > 0xdfff) ? String.fromCodePoint(value) : String.fromCodePoint(0xfffd);
}
/** A regular-expression literal as the pattern it matches: \xHH, \uHHHH and \u{H...} decoded (codePoint), a backslash before any other character dropped. */
export function regexText(literal: string): string {
  return literal.replace(/\\(?:x([0-9A-Fa-f]{2})|u\{([0-9A-Fa-f]{1,6})\}|u([0-9A-Fa-f]{4})|([\s\S]))/g, (_whole: string, hex: string | undefined, braced: string | undefined, unicode: string | undefined, other: string | undefined) => {
    const digits = hex ?? braced ?? unicode;
    return digits === undefined ? (other ?? "") : codePoint(Number.parseInt(digits, 16));
  });
}
/** An identifier read as words: split at camelCase humps (a lowercase letter or a digit before a capital), before a capital that starts a lowercase run, and at underscores and dollar signs. */
export function identifierWords(name: string): string {
  return name
    .replace(/^#/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_$]+/g, " ")
    .trim();
}
/**
 * A source's text with its JavaScript string escapes decoded (\xHH, \uHHHH, \u{H...}, a legacy octal escape, a line
 * continuation, and any other escaped character read as itself) and every %HH escape decoded.
 */
export function unescaped(text: string): string {
  const controls: Readonly<Record<string, string>> = { b: "\b", f: "\f", n: "\n", r: "\r", t: "\t", v: "\v" };
  const decoded = text.replace(
    /\\(?:x([0-9A-Fa-f]{2})|u\{([0-9A-Fa-f]{1,6})\}|u([0-9A-Fa-f]{4})|([0-7]{1,3})|(\r\n|[\n\r\u2028\u2029])|([\s\S]))/g,
    (_whole: string, hex: string | undefined, braced: string | undefined, unicode: string | undefined, octal: string | undefined, continuation: string | undefined, other: string | undefined) => {
      const digits = hex ?? braced ?? unicode;
      if (digits !== undefined) return codePoint(Number.parseInt(digits, 16));
      if (octal !== undefined) return String.fromCharCode(Number.parseInt(octal, 8));
      if (continuation !== undefined) return "";
      return controls[other ?? ""] ?? other ?? "";
    },
  );
  return decoded.replace(/%([0-9A-Fa-f]{2})/g, (_whole: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));
}

// ---- bindings ---------------------------------------------------------------------------------------------------------

export const BINDING_KINDS = ["import", "global", "local"] as const;
export type BindingKind = (typeof BINDING_KINDS)[number];
export interface Binding {
  readonly kind: BindingKind;
  /** The declarations of the identifier's own symbol in its file (none for a global the file never declares). */
  readonly declarations: readonly ts.Declaration[];
}
/** A binding program: the one file, no lib, no module resolution, nothing emitted (a checked JavaScript file is not needed). */
const BINDING_OPTIONS: ts.CompilerOptions = { noLib: true, noResolve: true, types: [], allowJs: true, checkJs: false, noEmit: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext };
const CHECKERS = new WeakMap<ts.SourceFile, ts.TypeChecker>();
/** The checker of a one-file program over the very source object, so its symbols answer for the caller's own nodes. */
function checkerOf(source: ts.SourceFile): ts.TypeChecker {
  const cached = CHECKERS.get(source);
  if (cached !== undefined) return cached;
  const host: ts.CompilerHost = {
    getSourceFile: name => (name === source.fileName ? source : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "",
    getCanonicalFileName: name => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === source.fileName,
    readFile: () => undefined,
  };
  const program = ts.createProgram({ rootNames: [source.fileName], options: BINDING_OPTIONS, host });
  if (!program.getSourceFiles().includes(source)) throw new Error(`the binding program does not hold ${source.fileName}`);
  const checker = program.getTypeChecker();
  CHECKERS.set(source, checker);
  return checker;
}
const isImportBinding = (node: ts.Node): boolean => ts.isImportSpecifier(node) || ts.isImportClause(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node);
/** Whether a declaration sits in an ambient context: a declaration file, or under a declaration carrying declare (a declare module or namespace included). */
const isAmbient = (node: ts.Node): boolean => {
  if (node.getSourceFile().isDeclarationFile) return true;
  for (let link: ts.Node = node; !ts.isSourceFile(link); link = link.parent) {
    if (
      (ts.isVariableDeclaration(link) || ts.isFunctionDeclaration(link) || ts.isClassDeclaration(link) || ts.isEnumDeclaration(link) || ts.isModuleDeclaration(link)) &&
      (ts.getCombinedModifierFlags(link) & ts.ModifierFlags.Ambient) !== 0
    ) {
      return true;
    }
  }
  return false;
};
/** A binder entry that is no declaration: an expando property write (f.tag = v or f["tag"] = v) records the written name itself, an identifier, among the name's declarations. */
const isExpando = (declaration: ts.Node): boolean => ts.isIdentifier(declaration);
/** A type-only declaration (an interface or a type alias) declares no value, so no value read answers to it (a const or a declare const merged with one keeps its own kind). */
const isTypeOnly = (declaration: ts.Node): boolean => ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration);
/** The binding an identifier resolves to at its use site (BINDINGS above); a shorthand property's value symbol for its name. */
export function bindingOf(identifier: ts.Identifier): Binding {
  const source = identifier.getSourceFile();
  const checker = checkerOf(source);
  const parent = identifier.parent;
  const symbol = ts.isShorthandPropertyAssignment(parent) && parent.name === identifier ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(identifier);
  const declarations = (symbol?.declarations ?? []).filter(declaration => declaration.getSourceFile() === source && !isExpando(declaration) && !isTypeOnly(declaration));
  if (declarations.some(isImportBinding)) return { kind: "import", declarations };
  if (declarations.every(isAmbient)) return { kind: "global", declarations };
  return { kind: "local", declarations };
}
/** Whether a node is a const declaration of a name (not a pattern). */
export const isConstDeclaration = (declaration: ts.Node): boolean =>
  ts.isVariableDeclaration(declaration) && ts.isIdentifier(declaration.name) && ts.isVariableDeclarationList(declaration.parent) && (declaration.parent.flags & ts.NodeFlags.Const) !== 0;
/** The initializer of an identifier's own binding when that binding's one variable declaration is a const declaration of the name with one (a namespace merged with it holds no value of its own). */
export function constInitializer(identifier: ts.Identifier): ts.Expression | undefined {
  const { kind, declarations } = bindingOf(identifier);
  const variables = declarations.filter(ts.isVariableDeclaration);
  const [declaration] = variables;
  return kind === "local" && variables.length === 1 && declaration !== undefined && isConstDeclaration(declaration) ? declaration.initializer : undefined;
}

// ---- values and chains ------------------------------------------------------------------------------------------------

/** The value a node spells (VALUES above): its one string, or none. */
export function stringValues(node: ts.Node | undefined): readonly string[] {
  const visit = (current: ts.Node | undefined, seen: ReadonlySet<ts.Node>): readonly string[] => {
    if (current === undefined) return [];
    const inner = bare(current);
    if (ts.isStringLiteralLike(inner)) return [inner.text];
    if (!ts.isIdentifier(inner)) return [];
    const initializer = constInitializer(inner);
    return initializer === undefined || seen.has(initializer) ? [] : visit(initializer, new Set([...seen, initializer]));
  };
  return visit(node, new Set());
}
/** The one string a node spells, or undefined. */
export function stringValue(node: ts.Node | undefined): string | undefined {
  const [value, ...more] = stringValues(node);
  return more.length === 0 ? value : undefined;
}
/** A leading read of the global object through itself (globalThis. or global.), which a callee chain drops. */
const GLOBAL_PREFIX = /^(?:(?:globalThis|global)\.)+/;
export const unglobal = (chain: string): string => chain.replace(GLOBAL_PREFIX, "");
export const isChainExpression = (node: ts.Node): boolean => {
  const inner = bare(node);
  return ts.isIdentifier(inner) || ts.isPropertyAccessExpression(inner) || ts.isElementAccessExpression(inner);
};
const CHAINS = new WeakMap<ts.Node, readonly string[]>();
/** Every dotted spelling a callee may have (CHAINS above). */
export function calleeChains(expression: ts.Node): readonly string[] {
  const cached = CHAINS.get(expression);
  if (cached !== undefined) return cached;
  const visit = (current: ts.Node, seen: ReadonlySet<ts.Node>): readonly string[] => {
    const inner = bare(current);
    if (ts.isPropertyAccessExpression(inner)) return visit(inner.expression, seen).map(base => `${base}.${inner.name.text}`);
    if (ts.isElementAccessExpression(inner)) {
      const keys = stringValues(inner.argumentExpression);
      const bases = visit(inner.expression, seen);
      return (keys.length > 0 ? keys : ["<computed>"]).flatMap(key => bases.map(base => `${base}.${key}`));
    }
    if (ts.isIdentifier(inner)) {
      const initializer = constInitializer(inner);
      const alias = initializer !== undefined && !seen.has(initializer) && isChainExpression(initializer) ? visit(initializer, new Set([...seen, initializer])) : [];
      return [inner.text, ...alias];
    }
    return [`<${ts.SyntaxKind[inner.kind]}>`];
  };
  const chains = [...new Set(visit(expression, new Set()).map(unglobal))];
  CHAINS.set(expression, chains);
  return chains;
}
/** The names a property, binding or member key may spell: its own text, or a computed key's values (stringValues). */
export function keyTexts(name: ts.Node | undefined): readonly string[] {
  if (name === undefined) return [];
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return [name.text];
  return ts.isComputedPropertyName(name) ? stringValues(name.expression) : [];
}

// ---- roots --------------------------------------------------------------------------------------------------------------

export const ROOT_FORMS = ["initializer", "reassignment", "destructured", "for-of element", "parameter default", "call argument", "immediately invoked", "call() argument"] as const;
export type RootForm = (typeof ROOT_FORMS)[number];
/** A value a local binding may hold: a node read as a chain, with the keys that lead from it to the binding. */
interface Candidate {
  readonly form: RootForm;
  readonly node: ts.Node;
  readonly keys: readonly string[];
}
type FunctionValue = ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction;
const isFunctionValue = (node: ts.Node): node is FunctionValue => ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node);
const LOGICAL_ASSIGNMENTS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.EqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken]);
/** Whether an identifier's own binding is the declaration. */
const boundTo = (identifier: ts.Identifier, declaration: ts.Declaration): boolean => {
  const binding = bindingOf(identifier);
  return binding.kind === "local" && binding.declarations.includes(declaration);
};
/** The array-literal elements an iterable spells, directly or through const names (spread and holes left out). */
function arrayElements(iterable: ts.Node, seen: ReadonlySet<ts.Node> = new Set()): readonly ts.Expression[] {
  const inner = bare(iterable);
  if (ts.isArrayLiteralExpression(inner)) return inner.elements.filter(element => !ts.isSpreadElement(element) && !ts.isOmittedExpression(element));
  if (!ts.isIdentifier(inner)) return [];
  const initializer = constInitializer(inner);
  return initializer === undefined || seen.has(initializer) ? [] : arrayElements(initializer, new Set([...seen, initializer]));
}
/** The calls a function receives, each with the place its first parameter's argument takes: through a name bound to it, as the callee itself, or by call(). */
function callsOf(fn: FunctionValue): { readonly call: ts.CallExpression; readonly offset: number; readonly form: RootForm }[] {
  const declarations: ts.Declaration[] = ts.isFunctionDeclaration(fn) || (ts.isFunctionExpression(fn) && fn.name !== undefined) ? [fn] : [];
  let holder: ts.Node = fn.parent;
  while (ts.isParenthesizedExpression(holder) || ts.isAsExpression(holder) || ts.isSatisfiesExpression(holder) || ts.isNonNullExpression(holder) || ts.isTypeAssertionExpression(holder)) holder = holder.parent;
  if (ts.isVariableDeclaration(holder) && ts.isIdentifier(holder.name) && holder.initializer !== undefined && bare(holder.initializer) === fn) declarations.push(holder);
  const targets = (callee: ts.Node): RootForm | undefined => {
    const inner = bare(callee);
    if (inner === fn) return "immediately invoked";
    return ts.isIdentifier(inner) && declarations.some(declaration => boundTo(inner, declaration)) ? "call argument" : undefined;
  };
  return callsIn(fn.getSourceFile()).flatMap(call => {
    const callee = bare(call.expression);
    const direct = targets(callee);
    if (direct !== undefined) return [{ call, offset: 0, form: direct }];
    if (ts.isPropertyAccessExpression(callee) && callee.name.text === "call" && targets(callee.expression) !== undefined) return [{ call, offset: 1, form: "call() argument" as const }];
    return [];
  });
}
function parameterCandidates(parameter: ts.ParameterDeclaration): Candidate[] {
  const own: Candidate[] = parameter.initializer === undefined ? [] : [{ form: "parameter default", node: parameter.initializer, keys: [] }];
  const fn = parameter.parent;
  if (!isFunctionValue(fn) || parameter.dotDotDotToken !== undefined) return own;
  const index = fn.parameters.filter(entry => !(ts.isIdentifier(entry.name) && entry.name.text === "this")).indexOf(parameter);
  if (index < 0) return own;
  return [
    ...own,
    ...callsOf(fn).flatMap(({ call, offset, form }): Candidate[] => {
      const argument = call.arguments[index + offset];
      return argument === undefined || ts.isSpreadElement(argument) ? [] : [{ form, node: argument, keys: [] }];
    }),
  ];
}
function bindingElementCandidates(element: ts.BindingElement): Candidate[] {
  const own: Candidate[] = element.initializer === undefined ? [] : [{ form: "destructured", node: element.initializer, keys: [] }];
  const keys: string[] = [];
  let link: ts.Node = element;
  while (ts.isBindingElement(link)) {
    if (link.dotDotDotToken !== undefined) return own;
    const pattern: ts.Node = link.parent;
    if (ts.isObjectBindingPattern(pattern)) keys.unshift(keyTexts(link.propertyName ?? link.name)[0] ?? "<computed>");
    else if (ts.isArrayBindingPattern(pattern)) keys.unshift(String(pattern.elements.indexOf(link)));
    link = pattern.parent;
  }
  if (ts.isVariableDeclaration(link)) return [...own, ...(link.initializer === undefined ? [] : [{ form: "destructured" as const, node: link.initializer, keys }])];
  if (ts.isParameter(link)) return [...own, ...parameterCandidates(link).map(candidate => ({ ...candidate, keys: [...candidate.keys, ...keys] }))];
  return own;
}
const ASSIGNMENTS = new WeakMap<ts.SourceFile, readonly ts.BinaryExpression[]>();
function assignmentsIn(source: ts.SourceFile): readonly ts.BinaryExpression[] {
  const cached = ASSIGNMENTS.get(source);
  if (cached !== undefined) return cached;
  const assignments = descendants(source).filter((node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && LOGICAL_ASSIGNMENTS.has(node.operatorToken.kind));
  ASSIGNMENTS.set(source, assignments);
  return assignments;
}
/** The values a local declaration's binding may hold (ROOT_FORMS above). */
function candidatesOf(declaration: ts.Declaration): Candidate[] {
  if (ts.isBindingElement(declaration)) return bindingElementCandidates(declaration);
  if (ts.isParameter(declaration)) return parameterCandidates(declaration);
  if (!ts.isVariableDeclaration(declaration) || !ts.isIdentifier(declaration.name)) return [];
  const initializer: Candidate[] = declaration.initializer === undefined ? [] : [{ form: "initializer", node: declaration.initializer, keys: [] }];
  const list = declaration.parent;
  const loop = ts.isVariableDeclarationList(list) ? list.parent : undefined;
  const elements: Candidate[] = loop !== undefined && ts.isForOfStatement(loop) ? arrayElements(loop.expression).map(node => ({ form: "for-of element", node, keys: [] })) : [];
  const reassigned: Candidate[] = isConstDeclaration(declaration)
    ? []
    : assignmentsIn(declaration.getSourceFile()).flatMap((assignment): Candidate[] => {
        const target = bare(assignment.left);
        return ts.isIdentifier(target) && boundTo(target, declaration) ? [{ form: "reassignment", node: assignment.right, keys: [] }] : [];
      });
  return [...initializer, ...elements, ...reassigned];
}
const OUTSIDE = new WeakMap<ts.Node, readonly string[]>();
/** Every outside chain a node may write (ROOTS above), as dotted text; a key read through its values (any other reads <computed>). */
export function outsideChains(node: ts.Node, forms: readonly RootForm[] = ROOT_FORMS): readonly string[] {
  const full = forms === ROOT_FORMS;
  if (full) {
    const cached = OUTSIDE.get(node);
    if (cached !== undefined) return cached;
  }
  const visit = (current: ts.Node, seen: ReadonlySet<ts.Node>): readonly string[] => {
    const inner = bare(current);
    if (ts.isPropertyAccessExpression(inner) || ts.isElementAccessExpression(inner)) {
      const keys = ts.isPropertyAccessExpression(inner) ? [inner.name.text] : stringValues(inner.argumentExpression);
      return visit(inner.expression, seen).flatMap(base => (keys.length > 0 ? keys : ["<computed>"]).map(key => `${base}.${key}`));
    }
    if (!ts.isIdentifier(inner)) return [];
    const binding = bindingOf(inner);
    if (binding.kind !== "local") return [inner.text];
    return binding.declarations
      .flatMap(candidatesOf)
      .filter(candidate => forms.includes(candidate.form) && !seen.has(candidate.node))
      .flatMap(candidate => visit(candidate.node, new Set([...seen, candidate.node])).map(base => [base, ...candidate.keys].join(".")));
  };
  const chains = [...new Set(visit(node, new Set()))];
  if (full) OUTSIDE.set(node, chains);
  return chains;
}
/** The process environment: a chain under it is not read unless it leaves the environment object through a PROTOTYPE_LINKS member. */
export const ENVIRONMENT = "process.env";
export const PROTOTYPE_LINKS: ReadonlySet<string> = new Set(["constructor", "__proto__", "prototype"]);
export const isEnvironment = (chain: string): boolean => {
  const path = unglobal(chain);
  if (path === ENVIRONMENT) return true;
  return path.startsWith(`${ENVIRONMENT}.`) && !path.slice(ENVIRONMENT.length + 1).split(".").some(part => PROTOTYPE_LINKS.has(part));
};

// ---- C2: tampers --------------------------------------------------------------------------------------------------------

/** The vitest calls that stub a global; vi.stubEnv sets the environment and is read with process.env. */
export const GLOBAL_STUBS: ReadonlySet<string> = new Set(["vi.stubGlobal", "vi.useFakeTimers", "vi.setSystemTime"]);
/** The Object / Reflect calls that mutate the object their first argument names. */
export const MUTATORS: ReadonlySet<string> = new Set(["Object.assign", "Object.defineProperty", "Object.defineProperties", "Object.setPrototypeOf", "Reflect.set", "Reflect.defineProperty", "Reflect.deleteProperty", "Reflect.setPrototypeOf"]);
/** The module-mock calls (assembled, so this file spells none). */
export const MODULE_MOCKS: ReadonlySet<string> = new Set(["vi", "vitest"].flatMap(owner => ["mock", "doMock"].map(member => `${owner}.${member}`)));
/** The callees whose reference anywhere but as a call's callee is itself a tamper. */
export const WATCHED: ReadonlySet<string> = new Set(["vi.spyOn", ...GLOBAL_STUBS, ...MUTATORS, ...MODULE_MOCKS]);
/** The legacy accessor definers, which define a getter or a setter on their receiver. */
export const ACCESSOR_DEFINERS: ReadonlySet<string> = new Set(["__defineGetter__", "__defineSetter__"]);
/**
 * The targets a write names: the expression itself, or every element of an array or object destructuring-assignment pattern
 * (nested, spread / rest included; a shorthand property's own name). A default inside a pattern (x = v) is an assignment the
 * walk reads by itself, so it adds nothing here.
 */
export function assignmentTargets(target: ts.Node): ts.Node[] {
  const inner = bare(target);
  if (ts.isArrayLiteralExpression(inner)) return inner.elements.flatMap(element => (ts.isOmittedExpression(element) ? [] : assignmentTargets(ts.isSpreadElement(element) ? element.expression : element)));
  if (ts.isObjectLiteralExpression(inner)) {
    return inner.properties.flatMap((property): ts.Node[] => {
      if (ts.isPropertyAssignment(property)) return assignmentTargets(property.initializer);
      if (ts.isShorthandPropertyAssignment(property)) return [property.name];
      return ts.isSpreadAssignment(property) ? assignmentTargets(property.expression) : [];
    });
  }
  if (ts.isBinaryExpression(inner) && inner.operatorToken.kind === ts.SyntaxKind.EqualsToken) return [];
  return [inner];
}
/** The member chains a destructuring pattern reads from the chains its source spells: each key under each base (a rest element reads base.*), nested patterns followed. */
export function patternMembers(pattern: ts.Node, bases: readonly string[]): string[] {
  const inner = bare(pattern);
  const under = (keys: readonly string[]): string[] => keys.flatMap(key => bases.map(base => `${base}.${key}`));
  if (ts.isObjectBindingPattern(inner)) {
    return inner.elements.flatMap(element => (element.dotDotDotToken !== undefined ? under(["*"]) : patternMembers(element.name, under(keyTexts(element.propertyName ?? element.name)))));
  }
  if (ts.isObjectLiteralExpression(inner)) {
    return inner.properties.flatMap((property): string[] => {
      if (ts.isSpreadAssignment(property)) return under(["*"]);
      if (ts.isPropertyAssignment(property)) return patternMembers(property.initializer, under(keyTexts(property.name)));
      return ts.isShorthandPropertyAssignment(property) ? under([property.name.text]) : [];
    });
  }
  return [...bases];
}
/** The WATCHED names a list of member chains holds; a rest read (base.*) holds every WATCHED name under its base. */
export const watchedIn = (members: readonly string[]): string[] =>
  members.map(unglobal).flatMap(member => (member.endsWith(".*") ? [...WATCHED].filter(name => name.startsWith(member.slice(0, -1))) : WATCHED.has(member) ? [member] : []));
const isAssignment = (node: ts.Node): node is ts.BinaryExpression =>
  ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
/**
 * The outside chains a write to a target names: none when the target is a bare name bound to a local declaration (the write
 * rebinds that local and reaches no value it held or receives), else the target's outside chains.
 */
const writtenChains = (target: ts.Node, outside: (node: ts.Node) => readonly string[]): readonly string[] => {
  const inner = bare(target);
  return ts.isIdentifier(inner) && bindingOf(inner).kind === "local" ? [] : outside(target);
};
const isGlobalStubCall = (call: ts.CallExpression): boolean => calleeChains(call.expression).some(name => GLOBAL_STUBS.has(name));
const isSpyCall = (call: ts.CallExpression): boolean => !isGlobalStubCall(call) && calleeChains(call.expression).includes("vi.spyOn");
/** The SDK export the custody stub spies on. */
export const CUSTODY_EXPORT = "HyperUnix";
/** Whether a name's own binding is a named import (aliased or not) of CUSTODY_EXPORT from an HX module (HX_MODULE). */
export function importsCustodyExport(identifier: ts.Identifier): boolean {
  const { kind, declarations } = bindingOf(identifier);
  return (
    kind === "import" &&
    declarations.some(declaration => {
      if (!ts.isImportSpecifier(declaration) || (declaration.propertyName ?? declaration.name).text !== CUSTODY_EXPORT) return false;
      const statement = declaration.parent.parent.parent;
      return ts.isStringLiteralLike(statement.moduleSpecifier) && HX_MODULE(statement.moduleSpecifier.text);
    })
  );
}
/** The custody stub the census allows: vi.spyOn(HyperUnix, "open"), its receiver a name that importsCustodyExport, its "open" a value. */
const isCustodySpy = (call: ts.CallExpression): boolean => {
  const [target, method] = call.arguments;
  const inner = target === undefined ? undefined : bare(target);
  return inner !== undefined && ts.isIdentifier(inner) && importsCustodyExport(inner) && stringValue(method) === "open";
};
const memberNames = (callee: ts.Node): readonly string[] => {
  const inner = bare(callee);
  if (ts.isPropertyAccessExpression(inner)) return [inner.name.text];
  return ts.isElementAccessExpression(inner) ? stringValues(inner.argumentExpression) : [];
};
export interface TamperForm {
  readonly word: string;
  /** What the form reads at a node, each read through outside (outsideChains, the environment left out). */
  readonly read: (node: ts.Node, outside: (target: ts.Node) => readonly string[]) => readonly string[];
}
export const C2_FORMS: readonly TamperForm[] = [
  { word: "spy", read: node => (ts.isCallExpression(node) && isSpyCall(node) && !isCustodySpy(node) ? [`vi.spyOn(${node.arguments[0]?.getText() ?? ""})`] : []) },
  {
    word: "global stub",
    read: node => {
      const stub = ts.isCallExpression(node) ? calleeChains(node.expression).find(name => GLOBAL_STUBS.has(name)) : undefined;
      return stub === undefined ? [] : [stub];
    },
  },
  {
    word: "watched reference",
    read: node => {
      if (!ts.isPropertyAccessExpression(node) && !ts.isElementAccessExpression(node)) return [];
      const watched = calleeChains(node).find(name => WATCHED.has(name));
      if (watched === undefined) return [];
      let link: ts.Node = node;
      while (ts.isParenthesizedExpression(link.parent)) link = link.parent;
      return ts.isCallExpression(link.parent) && link.parent.expression === link ? [] : [`${watched} referenced as a value`];
    },
  },
  {
    word: "destructured watched",
    read: node => (ts.isVariableDeclaration(node) && !ts.isIdentifier(node.name) && node.initializer !== undefined ? watchedIn(patternMembers(node.name, calleeChains(node.initializer))).map(name => `${name} referenced as a value`) : []),
  },
  {
    word: "destructuring-assigned watched",
    read: node =>
      isAssignment(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && !isChainExpression(node.left) ? watchedIn(patternMembers(node.left, calleeChains(node.right))).map(name => `${name} referenced as a value`) : [],
  },
  {
    word: "assignment",
    read: (node, outside) => (isAssignment(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken ? assignmentTargets(node.left).flatMap(target => writtenChains(target, outside)).map(chain => `${chain} assigned`) : []),
  },
  {
    word: "compound operator",
    read: (node, outside) => (isAssignment(node) && node.operatorToken.kind !== ts.SyntaxKind.EqualsToken ? assignmentTargets(node.left).flatMap(target => writtenChains(target, outside)).map(chain => `${chain} assigned`) : []),
  },
  {
    word: "for-of target",
    read: (node, outside) => (ts.isForOfStatement(node) && !ts.isVariableDeclarationList(node.initializer) ? assignmentTargets(node.initializer).flatMap(target => writtenChains(target, outside)).map(chain => `${chain} assigned`) : []),
  },
  {
    word: "for-in target",
    read: (node, outside) => (ts.isForInStatement(node) && !ts.isVariableDeclarationList(node.initializer) ? assignmentTargets(node.initializer).flatMap(target => writtenChains(target, outside)).map(chain => `${chain} assigned`) : []),
  },
  { word: "delete", read: (node, outside) => (ts.isDeleteExpression(node) ? writtenChains(node.expression, outside).map(chain => `${chain} deleted`) : []) },
  {
    word: "update",
    read: (node, outside) =>
      (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) ? writtenChains(node.operand, outside).map(chain => `${chain} updated`) : [],
  },
  {
    word: "mutator call",
    read: (node, outside) => {
      if (!ts.isCallExpression(node) || isGlobalStubCall(node) || isSpyCall(node)) return [];
      const mutator = calleeChains(node.expression).find(name => MUTATORS.has(name));
      return mutator === undefined ? [] : outside(node.arguments[0] ?? node).map(chain => `${mutator}(${chain})`);
    },
  },
  {
    word: "legacy accessor definer",
    read: (node, outside) => {
      if (!ts.isCallExpression(node)) return [];
      const callee = bare(node.expression);
      const definer = memberNames(callee).find(name => ACCESSOR_DEFINERS.has(name));
      return definer === undefined || !(ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee)) ? [] : outside(callee.expression).map(chain => `${definer}(${chain})`);
    },
  },
];
/** Every tamper a source holds (C2 TAMPER FORMS above), in source order; a roster passed in reads only its own forms. */
export function tampersIn(source: ts.SourceFile, forms: readonly TamperForm[] = C2_FORMS): string[] {
  const outside = (node: ts.Node): readonly string[] => outsideChains(node).filter(chain => !isEnvironment(chain));
  return descendants(source).flatMap(node => forms.flatMap(form => form.read(node, outside).map(what => `${what} :${lineOf(source, node)}`)));
}
export interface ModuleMock {
  readonly mock: string;
  readonly specifier: string;
  readonly line: number;
}
/** Every module mock and each specifier value it names (MOCKS above). */
export function moduleMockSpecifiers(source: ts.SourceFile): ModuleMock[] {
  return callsIn(source).flatMap(call => {
    const mock = calleeChains(call.expression).find(name => MODULE_MOCKS.has(name));
    if (mock === undefined) return [];
    const first = call.arguments[0] === undefined ? undefined : bare(call.arguments[0]);
    const values = first !== undefined && ts.isCallExpression(first) && first.expression.kind === ts.SyntaxKind.ImportKeyword ? stringValues(first.arguments[0]) : stringValues(first);
    return values.map(specifier => ({ mock, specifier, line: lineOf(source, call) }));
  });
}

// ---- C7: falsifier shapes -----------------------------------------------------------------------------------------------

export const SHAPES = ["F1", "F2", "F3", "F4"] as const;
export type Shape = (typeof SHAPES)[number];
export interface ShapeHit {
  readonly shape: Shape;
  readonly line: number;
  readonly form: string;
}
/** The member names whose read is a falsifier shape (a Map: a plain object would answer inherited names such as toString). */
export const MEMBER_SHAPES: ReadonlyMap<string, Shape> = new Map<string, Shape>([
  ["kill", "F1"],
  ["pid", "F2"],
  ["ESRCH", "F4"],
]);
/** Process-table tools: a command headed by one probes whether a process still runs. */
export const PROCESS_TABLE = ["ps", "pgrep", "pkill", "kill", "killall", "pidof", "pstree", "pwdx", "lsof", "fuser"] as const;
const PROCESS_TABLE_SET: ReadonlySet<string> = new Set(PROCESS_TABLE);
/** A wrapper's option table: the options that take a separate argument, the positional words before its command, and the options whose argument is itself a command. */
export interface WrapperRule {
  readonly arguments: readonly string[];
  readonly positionals: number;
  readonly commands: readonly string[];
}
const rule = (args: readonly string[], positionals = 0, commands: readonly string[] = []): WrapperRule => ({ arguments: args, positionals, commands });
/** The command wrappers F3 reads through, each with its option table (wb-tz2.11 cut #4's table, unchanged). */
export const WRAPPER_RULES: ReadonlyArray<readonly [string, WrapperRule]> = [
  ["env", rule(["-u", "--unset", "-C", "--chdir"], 0, ["-S", "--split-string"])],
  ["exec", rule(["-a"])],
  ["command", rule([])],
  ["builtin", rule([])],
  ["nohup", rule([])],
  ["setsid", rule([])],
  ["sudo", rule(["-u", "--user", "-g", "--group", "-h", "--host", "-p", "--prompt", "-C", "--close-from", "-D", "--chdir", "-r", "--role", "-t", "--type", "-U", "--other-user", "-T", "--command-timeout", "-R", "--chroot"])],
  ["doas", rule(["-u", "-C", "-a"])],
  ["su", rule(["-s", "--shell", "-g", "--group", "-G", "--supp-group", "-w", "--whitelist-environment"], 1, ["-c", "--command"])],
  ["runuser", rule(["-u", "--user", "-g", "--group", "-G", "--supp-group", "-s", "--shell", "-w", "--whitelist-environment"], 0, ["-c", "--command"])],
  ["nice", rule(["-n", "--adjustment"])],
  ["ionice", rule(["-c", "--class", "-n", "--classdata"])],
  ["chrt", rule(["-T", "--sched-runtime", "-P", "--sched-period", "-D", "--sched-deadline"], 1)],
  ["taskset", rule([], 1)],
  ["timeout", rule(["-s", "--signal", "-k", "--kill-after"], 1)],
  ["stdbuf", rule(["-i", "--input", "-o", "--output", "-e", "--error"])],
  ["unbuffer", rule([])],
  ["chroot", rule(["--userspec", "--groups"], 1)],
  ["flock", rule(["-w", "--timeout", "-E", "--conflict-exit-code"], 1, ["-c", "--command"])],
  ["watch", rule(["-n", "--interval", "-q", "--equexit"])],
  ["strace", rule(["-e", "-o", "-p", "-s", "-u", "-E", "-a", "-b", "-I", "-O", "-S", "-X", "-P"])],
  ["xargs", rule(["-a", "--arg-file", "-d", "--delimiter", "-E", "-e", "--eof", "-I", "-i", "--replace", "-L", "-l", "--max-lines", "-n", "--max-args", "-P", "--max-procs", "-s", "--max-chars", "--process-slot-var"])],
  ["busybox", rule([])],
  ["time", rule(["-f", "--format", "-o", "--output"])],
];
export const WRAPPERS: ReadonlyMap<string, WrapperRule> = new Map(WRAPPER_RULES);
/** Shell reserved words after which the next word is a command head. */
export const SHELL_KEYWORDS = ["!", "if", "then", "else", "elif", "do", "while", "until", "coproc", "eval"] as const;
const SHELL_KEYWORD_SET: ReadonlySet<string> = new Set(SHELL_KEYWORDS);
/** Shells: the first operand after a shell's options, once a command flag is among them, is a command. */
export const SHELLS = ["sh", "bash", "dash", "zsh", "ksh", "mksh", "ash", "fish", "csh", "tcsh"] as const;
const SHELL_SET: ReadonlySet<string> = new Set(SHELLS);
export const SHELL_COMMAND_FLAG = /^(?:-[A-Za-z]*c[A-Za-z]*|--command)$/;
/** The shell options that take the next word as their argument. */
export const SHELL_ARGUMENT_OPTIONS: ReadonlySet<string> = new Set(["-o", "+o", "-O", "+O", "--rcfile", "--init-file"]);
/** Shell separators: each piece between them is its own command. */
export const COMMAND_SEPARATOR = /\$\(|[;&|\n`(){}]/;
/** Process-spawning calls: a literal in their arguments (or in an argv array they are given) is a command. */
export const SPAWNERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"] as const;
const SPAWNER_SET: ReadonlySet<string> = new Set(SPAWNERS);
export const PROC_PATH = /(?:^|\/)proc(?:\/|$)/i;
/** Case-insensitive, so a regular expression with the i flag (/esrch/i) still reads. */
export const ESRCH_WORD = /(?<![A-Za-z0-9_])esrch(?![A-Za-z0-9_])/i;
const ASSIGNMENT_WORD = /^[A-Za-z_][A-Za-z0-9_]*=/;
const basename = (word: string): string => word.slice(word.lastIndexOf("/") + 1);

/** Whether an object-literal property is part of a destructuring-assignment target ({ pid } = child, for ({ pid } of list)); a shorthand's default ({ a = { pid } } = child) is a value, not a target. */
export function inAssignmentTarget(property: ts.Node): boolean {
  let link: ts.Node = property.parent;
  while (
    link.parent !== undefined &&
    (ts.isPropertyAssignment(link.parent) ||
      ts.isSpreadAssignment(link.parent) ||
      ts.isObjectLiteralExpression(link.parent) ||
      ts.isArrayLiteralExpression(link.parent) ||
      ts.isSpreadElement(link.parent) ||
      ts.isParenthesizedExpression(link.parent))
  ) {
    link = link.parent;
  }
  const parent = link.parent;
  if (parent === undefined) return false;
  if (ts.isBinaryExpression(parent)) return parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.left === link;
  return (ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.initializer === link;
}
/** The member a node reads - every name its key may spell - and the form it reads it in (the six member forms). */
export function memberRead(node: ts.Node): { readonly names: readonly string[]; readonly form: string } | undefined {
  const read = (names: readonly string[], form: string): { readonly names: readonly string[]; readonly form: string } | undefined => (names.length === 0 ? undefined : { names, form });
  if (ts.isPropertyAccessExpression(node)) return read([node.name.text], "member");
  if (ts.isElementAccessExpression(node)) return read(stringValues(node.argumentExpression), "element key");
  if (ts.isQualifiedName(node)) return read([node.right.text], "type member");
  if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) return read(keyTexts(node.propertyName ?? node.name), "destructuring");
  if ((ts.isShorthandPropertyAssignment(node) || ts.isPropertyAssignment(node)) && ts.isObjectLiteralExpression(node.parent) && inAssignmentTarget(node)) return read(keyTexts(node.name), "destructuring assignment");
  if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) return read([(node.propertyName ?? node.name).text], "import");
  return undefined;
}
/**
 * Whether a name or key literal is the very key its parent's member read reads (memberRead): a member or qualified name's
 * right side, an element's literal key, a binding element's or specifier's key (its property name, else its name) and a
 * destructuring-assignment property's name - so a binding element's local name, an import's local name and an export's
 * exported name are no member key.
 */
function isMemberKey(node: ts.Node): boolean {
  const parent = node.parent;
  if (parent === undefined || memberRead(parent) === undefined) return false;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
  if (ts.isElementAccessExpression(parent)) return parent.argumentExpression === node && ts.isStringLiteralLike(node);
  if (ts.isQualifiedName(parent)) return parent.right === node;
  if (ts.isBindingElement(parent) || ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) return (parent.propertyName ?? parent.name) === node;
  return (ts.isShorthandPropertyAssignment(parent) || ts.isPropertyAssignment(parent)) && parent.name === node;
}
/** Whether a string literal is a member key (an element-access key, or a property, binding, computed or import key). */
function isKeyLiteral(node: ts.Node): boolean {
  const parent = node.parent;
  if (parent === undefined) return false;
  if (ts.isElementAccessExpression(parent)) return parent.argumentExpression === node;
  if (ts.isComputedPropertyName(parent) || ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) return true;
  if (ts.isBindingElement(parent)) return parent.propertyName === node;
  if (ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isPropertyDeclaration(parent) || ts.isMethodDeclaration(parent)) return parent.name === node;
  return false;
}
/** Whether a literal sits where a process-spawning call reads a command: an argument, or an element of an argv array given to it, of a call whose callee is a SPAWNERS name or a member named one. */
function inSpawnPosition(node: ts.Node): boolean {
  const link: ts.Node = ts.isArrayLiteralExpression(node.parent) ? node.parent : node;
  const call = link.parent;
  if (call === undefined || !ts.isCallExpression(call) || !call.arguments.some(argument => argument === link)) return false;
  const callee = call.expression;
  const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : "";
  return SPAWNER_SET.has(name);
}
type TextLiteral = ts.StringLiteralLike | ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail;
const isTextLiteral = (node: ts.Node): node is TextLiteral => ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
/** A plain text: a string or template part that is no key and holds neither the ESRCH word nor a /proc path; the literal-word and command forms read it. */
const plainText = (node: ts.Node): node is TextLiteral => isTextLiteral(node) && !isKeyLiteral(node) && !ESRCH_WORD.test(node.text) && !PROC_PATH.test(node.text);
const isKillLiteral = (node: TextLiteral): boolean => node.text.trim() === "kill" && !inSpawnPosition(node);
const memberShape =
  (form: string) =>
  (node: ts.Node): readonly Shape[] => {
    const member = memberRead(node);
    if (member === undefined || member.form !== form) return [];
    const shape = member.names.map(name => MEMBER_SHAPES.get(name) ?? (ESRCH_WORD.test(identifierWords(name)) ? "F4" : undefined)).find(found => found !== undefined);
    return shape === undefined ? [] : [shape];
  };
export interface ShapeForm {
  readonly word: string;
  readonly read: (node: ts.Node) => readonly Shape[];
}
export const SHAPE_FORMS: readonly ShapeForm[] = [
  { word: "member", read: memberShape("member") },
  { word: "element key", read: memberShape("element key") },
  { word: "type member", read: memberShape("type member") },
  { word: "destructuring", read: memberShape("destructuring") },
  { word: "destructuring assignment", read: memberShape("destructuring assignment") },
  { word: "import", read: memberShape("import") },
  { word: "bare call", read: node => (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "kill" ? ["F1"] : []) },
  {
    word: "identifier",
    read: node => ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && ESRCH_WORD.test(identifierWords(node.text)) && !isMemberKey(node) ? ["F4"] : []),
  },
  { word: "regular expression", read: node => (ts.isRegularExpressionLiteral(node) && ESRCH_WORD.test(regexText(node.text)) ? ["F4"] : []) },
  { word: "key", read: node => (isTextLiteral(node) && isKeyLiteral(node) && ESRCH_WORD.test(identifierWords(node.text)) && !isMemberKey(node) ? ["F4"] : []) },
  { word: "literal", read: node => (isTextLiteral(node) && !isKeyLiteral(node) && ESRCH_WORD.test(node.text) ? ["F4"] : []) },
  {
    word: "/proc path",
    read: node => {
      if (ts.isRegularExpressionLiteral(node)) {
        const text = regexText(node.text);
        return !ESRCH_WORD.test(text) && PROC_PATH.test(text) ? ["F3"] : [];
      }
      if (!isTextLiteral(node)) return [];
      const esrch = isKeyLiteral(node) ? ESRCH_WORD.test(identifierWords(node.text)) && !isMemberKey(node) : ESRCH_WORD.test(node.text);
      return !esrch && PROC_PATH.test(node.text) ? ["F3"] : [];
    },
  },
  { word: "kill name literal", read: node => (plainText(node) && isKillLiteral(node) ? ["F1"] : []) },
  { word: "pid name literal", read: node => (plainText(node) && node.text.trim() === "pid" ? ["F2"] : []) },
  {
    word: "process-table command",
    read: node => (plainText(node) && !isKillLiteral(node) && node.text.trim() !== "pid" && commandHeads(node.text).some(head => PROCESS_TABLE_SET.has(head)) ? ["F3"] : []),
  },
];
/** Every falsifier shape a source holds (C7 SHAPE FORMS above), in source order; a roster passed in reads only its own forms. */
export function falsifierShapes(source: ts.SourceFile, forms: readonly ShapeForm[] = SHAPE_FORMS): ShapeHit[] {
  return descendants(source).flatMap(node => forms.flatMap(form => form.read(node).map(shape => ({ shape, line: lineOf(source, node), form: form.word }))));
}
export const shapeForms = (hits: readonly ShapeHit[]): string[] => hits.map(hit => `${hit.shape}:${hit.form}`).sort();

// ---- F3: command heads --------------------------------------------------------------------------------------------------

export const WRAPPER_FLAG_FORMS = [
  "lone dash",
  "options end",
  "option argument",
  "attached argument",
  "long value",
  "short cluster",
  "command option",
  "shell command flag",
  "shell options end",
  "shell option argument",
] as const;
/** A text's shell words: single quotes literal, double quotes and a backslash escaping the next character, the quotes removed. */
export function shellWords(text: string): string[] {
  const words: string[] = [];
  let word = "";
  let open = false;
  let quote: string | undefined;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index] ?? "";
    if (quote === "'") {
      if (char === "'") quote = undefined;
      else word += char;
    } else if (char === "\\" && index + 1 < text.length) {
      index += 1;
      word += text[index] ?? "";
      open = true;
    } else if (quote === '"') {
      if (char === '"') quote = undefined;
      else word += char;
    } else if (char === "'" || char === '"') {
      quote = char;
      open = true;
    } else if (/\s/.test(char)) {
      if (open) words.push(word);
      word = "";
      open = false;
    } else {
      word += char;
      open = true;
    }
  }
  if (open) words.push(word);
  return words;
}
/** A short-option word read letter by letter against a wrapper's tables: a command option or an option taking an argument ends it. */
function shortCluster(word: string, wrapper: WrapperRule): { readonly command: string | undefined; readonly takesNext: boolean } {
  for (let index = 1; index < word.length; index += 1) {
    const option = `-${word[index] ?? ""}`;
    const rest = word.slice(index + 1);
    if (wrapper.commands.includes(option)) return { command: rest, takesNext: false };
    if (wrapper.arguments.includes(option)) return { command: undefined, takesNext: rest.length === 0 };
  }
  return { command: undefined, takesNext: false };
}
/** The words after a wrapper, past its options (WRAPPER_FLAG_FORMS) and its positionals: the rest from the command head on, or the command an option of its command table carries. */
export function pastWrapper(words: readonly string[], wrapper: WrapperRule): { readonly rest: readonly string[]; readonly command: string | undefined } {
  let index = 0;
  let positionals = wrapper.positionals;
  let options = true;
  while (index < words.length) {
    const word = words[index] ?? "";
    if (options && word === "--") {
      options = false;
      index += 1;
    } else if (options && word.startsWith("--")) {
      const equals = word.indexOf("=");
      const name = equals < 0 ? word : word.slice(0, equals);
      const attached = equals < 0 ? undefined : word.slice(equals + 1);
      if (wrapper.commands.includes(name)) return { rest: [], command: attached ?? words[index + 1] ?? "" };
      index += wrapper.arguments.includes(name) && attached === undefined ? 2 : 1;
    } else if (options && word.startsWith("-")) {
      // A short-option word, a lone "-" included: a cluster with no letters is a flag (lone dash).
      const cluster = shortCluster(word, wrapper);
      if (cluster.command !== undefined) return { rest: [], command: cluster.command.length > 0 ? cluster.command : (words[index + 1] ?? "") };
      index += cluster.takesNext ? 2 : 1;
    } else if (positionals > 0) {
      positionals -= 1;
      index += 1;
    } else {
      break;
    }
  }
  return { rest: words.slice(index), command: undefined };
}
/** The command a shell runs: once a command flag is among its options, the first operand after them. */
export function shellCommand(words: readonly string[]): string | undefined {
  let command = false;
  let index = 0;
  while (index < words.length) {
    const word = words[index] ?? "";
    if (word.startsWith("--command=")) return word.slice("--command=".length);
    if (word === "--" || word === "-") {
      index += 1;
      break;
    }
    if (SHELL_ARGUMENT_OPTIONS.has(word)) index += 2;
    else if (SHELL_COMMAND_FLAG.test(word)) {
      command = true;
      index += 1;
    } else if (word.length > 1 && (word.startsWith("-") || word.startsWith("+"))) index += 1;
    else break;
  }
  return command ? words[index] : undefined;
}
function headsOf(words: readonly string[]): string[] {
  let rest = words;
  while (rest.length > 0) {
    const [first = "", ...after] = rest;
    if (ASSIGNMENT_WORD.test(first) || SHELL_KEYWORD_SET.has(first)) {
      rest = after;
      continue;
    }
    const base = basename(first);
    const wrapper = WRAPPERS.get(base);
    if (wrapper !== undefined) {
      const past = pastWrapper(after, wrapper);
      if (past.command !== undefined) return modelledCommandHeads(past.command);
      rest = past.rest;
      continue;
    }
    if (SHELL_SET.has(base)) {
      const command = shellCommand(after);
      return command === undefined ? [] : modelledCommandHeads(command);
    }
    return [base];
  }
  return [];
}
/** The head (by basename) of every command a text spells, through WRAPPER_FLAG_FORMS (F3 COMMAND HEADS above). */
export function modelledCommandHeads(text: string): string[] {
  return text.split(COMMAND_SEPARATOR).flatMap(piece => headsOf(shellWords(piece)));
}
/** Where a word splits into the fragments the fail-closed read checks: an attached option argument (-S'ps or --command=ps) is its own fragment. */
const ATTACHED_SPLIT = /['"=]/;
function wrappedWords(words: readonly string[]): string[] {
  return words
    .flatMap(word => word.split(ATTACHED_SPLIT))
    .filter(fragment => fragment.length > 0)
    .map(basename);
}
/** wb-tz2.11 cut #4's command-head read, unchanged: its option tables, and every fragment of every word past a wrapper or a shell in head position. */
export function failClosedCommandHeads(text: string): string[] {
  const heads: string[] = [];
  for (const command of text.split(COMMAND_SEPARATOR)) {
    let words: readonly string[] = command
      .trim()
      .split(/\s+/)
      .map(word => word.replace(/^['"]+|['"]+$/g, ""))
      .filter(word => word.length > 0);
    while (words.length > 0) {
      const [first = "", ...rest] = words;
      const base = basename(first);
      if (ASSIGNMENT_WORD.test(first) || SHELL_KEYWORD_SET.has(first)) {
        words = rest;
        continue;
      }
      const wrapper = WRAPPERS.get(base);
      if (wrapper !== undefined || SHELL_SET.has(base)) heads.push(...wrappedWords(rest));
      if (wrapper !== undefined) {
        const after = cutFourPastWrapper(rest, wrapper);
        if (after.command !== undefined) {
          heads.push(...failClosedCommandHeads(after.command));
          break;
        }
        words = after.rest;
        continue;
      }
      if (SHELL_SET.has(base)) {
        const flag = rest.findIndex(word => SHELL_COMMAND_FLAG.test(word));
        if (flag >= 0) heads.push(...failClosedCommandHeads(rest.slice(flag + 1).join(" ")));
        break;
      }
      heads.push(base);
      break;
    }
  }
  return heads;
}
/** wb-tz2.11 cut #4's wrapper read, unchanged (the fail-closed read's own model). */
function cutFourPastWrapper(words: readonly string[], wrapper: WrapperRule): { readonly rest: readonly string[]; readonly command: string | undefined } {
  let index = 0;
  let positionals = wrapper.positionals;
  let options = true;
  while (index < words.length) {
    const word = words[index] ?? "";
    if (options && word === "--") {
      options = false;
      index += 1;
    } else if (options && wrapper.commands.includes(word)) {
      return { rest: [], command: words.slice(index + 1).join(" ") };
    } else if (options && word.length > 1 && word.startsWith("-")) {
      index += wrapper.arguments.includes(word) ? 2 : 1;
    } else if (positionals > 0) {
      positionals -= 1;
      index += 1;
    } else {
      break;
    }
  }
  return { rest: words.slice(index), command: undefined };
}
/** Every command head a text spells: the modelled heads, then the fail-closed heads (F3 COMMAND HEADS above). */
export function commandHeads(text: string): string[] {
  return [...modelledCommandHeads(text), ...failClosedCommandHeads(text)];
}

// ---- C7: drivers ----------------------------------------------------------------------------------------------------------

export const SDK_MODULE = "@hyperunix/sdk";
export const MODULE_NEEDLES = ["providers/hyperunix", "hyperunix-observer"] as const;
export const CAPABILITY_ID = "hyperunix.find";
export const OVERRIDE = "HYPERUNIX_HX";
const escaped = (text: string): string => text.replace(/[./-]/g, match => `\\${match}`);
const MODULE_PATTERNS: readonly RegExp[] = MODULE_NEEDLES.map(needle => new RegExp(`(?:^|/)${escaped(needle)}(?:\\.[cm]?[jt]s)?$`));
/** A path into the installed SDK package. */
const SDK_PATH = new RegExp(`(?:^|/)node_modules/${escaped(SDK_MODULE)}(?:/|$)`);
/** A specifier as a resolver may read it: every %HH escape decoded and the path normalized (posix). */
export function normalizedSpecifier(specifier: string): string {
  const decoded = specifier.replace(/%([0-9A-Fa-f]{2})/g, (_whole: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)));
  return decoded.length === 0 ? decoded : posix.normalize(decoded);
}
/** An HX module: the SDK package or a subpath of it, a path into node_modules/@hyperunix/sdk, or a path ending providers/hyperunix or hyperunix-observer at a segment boundary (the path's start or a /; a .js, .ts, .mjs, .mts, .cjs or .cts extension allowed) - read after normalizedSpecifier, which drops a leading ./ (cut #3 reads that start as a boundary). */
export const HX_MODULE = (specifier: string): boolean => {
  const path = normalizedSpecifier(specifier);
  return path === SDK_MODULE || path.startsWith(`${SDK_MODULE}/`) || SDK_PATH.test(path) || MODULE_PATTERNS.some(pattern => pattern.test(path));
};
/** The calls that load a module, read through calleeChains. */
export const LOADERS: ReadonlySet<string> = new Set(["require", "module.require", "vi.importActual", "vi.importMock"]);
/** The calls that read or set an environment variable named by an argument. */
export const ENV_CALLS: ReadonlySet<string> = new Set([
  "vi.stubEnv",
  "Reflect.get",
  "Reflect.set",
  "Reflect.has",
  "Reflect.deleteProperty",
  "Reflect.defineProperty",
  "Reflect.getOwnPropertyDescriptor",
  "Object.defineProperty",
  "Object.getOwnPropertyDescriptor",
  "Object.hasOwn",
]);
/** The methods that test for an environment variable named by an argument. */
export const ENV_METHODS: ReadonlySet<string> = new Set(["hasOwnProperty", "propertyIsEnumerable"]);
/** The classifier's own tokens: every one holds DRIVER_NEEDLE, so every driving form's text does. */
export const DRIVER_TOKENS: readonly string[] = [SDK_MODULE, ...MODULE_NEEDLES, CAPABILITY_ID, OVERRIDE];
/** Text every HX driver carries, in any case: a source is parsed only when its text, raw or unescaped, holds it (passesPrefilter). */
export const DRIVER_NEEDLE = /hyperunix/i;
export const DRIVER_REASONS = ["import", "invoke", "override"] as const;
export type DriverReason = (typeof DRIVER_REASONS)[number];
const hxSpecifier = (node: ts.ImportDeclaration | ts.ExportDeclaration): boolean => node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) && HX_MODULE(node.moduleSpecifier.text);
/** A clause erased at compile time: import type, or named bindings every one of which is marked type (no default or namespace binding). */
function isTypeOnlyClause(clause: ts.ImportClause): boolean {
  if (clause.isTypeOnly) return true;
  const named = clause.namedBindings;
  return clause.name === undefined && named !== undefined && ts.isNamedImports(named) && named.elements.length > 0 && named.elements.every(element => element.isTypeOnly);
}
function isTypeOnlyExport(node: ts.ExportDeclaration): boolean {
  const clause = node.exportClause;
  return node.isTypeOnly || (clause !== undefined && ts.isNamedExports(clause) && clause.elements.length > 0 && clause.elements.every(element => element.isTypeOnly));
}
const firstHxModule = (call: ts.CallExpression): boolean => stringValues(call.arguments[0]).some(HX_MODULE);
/** A created require: a call of a call, or of a name whose own binding is a const initialized by a call. */
function isCreatedRequire(call: ts.CallExpression): boolean {
  const callee = bare(call.expression);
  if (ts.isCallExpression(callee)) return true;
  if (!ts.isIdentifier(callee)) return false;
  const initializer = constInitializer(callee);
  return initializer !== undefined && ts.isCallExpression(bare(initializer));
}
const overrideMember = (forms: readonly string[]) => (node: ts.Node) => {
  const member = memberRead(node);
  return member !== undefined && forms.includes(member.form) && member.names.includes(OVERRIDE);
};
const overrideArgument = (call: ts.CallExpression): boolean => call.arguments.some(argument => stringValues(argument).includes(OVERRIDE));
export interface DriverForm {
  readonly word: string;
  readonly reason: DriverReason;
  readonly read: (node: ts.Node) => boolean;
}
export const DRIVER_FORMS: readonly DriverForm[] = [
  { word: "value import", reason: "import", read: node => ts.isImportDeclaration(node) && hxSpecifier(node) && node.importClause !== undefined && !isTypeOnlyClause(node.importClause) },
  { word: "side-effect import", reason: "import", read: node => ts.isImportDeclaration(node) && hxSpecifier(node) && node.importClause === undefined },
  { word: "export-from", reason: "import", read: node => ts.isExportDeclaration(node) && hxSpecifier(node) && !isTypeOnlyExport(node) },
  {
    word: "import-equals",
    reason: "import",
    read: node => ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference) && stringValues(node.moduleReference.expression).some(HX_MODULE),
  },
  { word: "dynamic import", reason: "import", read: node => ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && firstHxModule(node) },
  { word: "loader call", reason: "import", read: node => ts.isCallExpression(node) && calleeChains(node.expression).some(name => LOADERS.has(name)) && firstHxModule(node) },
  { word: "created require", reason: "import", read: node => ts.isCallExpression(node) && isCreatedRequire(node) && firstHxModule(node) },
  { word: "invoke", reason: "invoke", read: node => ts.isCallExpression(node) && calleeChains(node.expression).some(callee => callee.endsWith(".invoke")) && stringValues(node.arguments[0]).includes(CAPABILITY_ID) },
  { word: "override member", reason: "override", read: overrideMember(["member", "element key", "type member"]) },
  { word: "override destructuring", reason: "override", read: overrideMember(["destructuring"]) },
  { word: "override destructuring assignment", reason: "override", read: overrideMember(["destructuring assignment"]) },
  {
    word: "override object key",
    reason: "override",
    read: node =>
      ts.isObjectLiteralExpression(node) &&
      node.properties.some(property => !ts.isSpreadAssignment(property) && !inAssignmentTarget(property) && keyTexts(property.name).includes(OVERRIDE)),
  },
  { word: "override in", reason: "override", read: node => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.InKeyword && stringValues(node.left).includes(OVERRIDE) },
  { word: "override env call", reason: "override", read: node => ts.isCallExpression(node) && calleeChains(node.expression).some(callee => ENV_CALLS.has(callee)) && overrideArgument(node) },
  {
    word: "override env method",
    reason: "override",
    read: node =>
      ts.isCallExpression(node) &&
      !calleeChains(node.expression).some(callee => ENV_CALLS.has(callee)) &&
      calleeChains(node.expression).some(callee => ENV_METHODS.has(callee.slice(callee.lastIndexOf(".") + 1))) &&
      overrideArgument(node),
  },
];
/** How a source drives HX (C7 DRIVER FORMS above): its reasons, sorted; a roster passed in reads only its own forms. */
export function hxDrivers(source: ts.SourceFile, forms: readonly DriverForm[] = DRIVER_FORMS): string[] {
  const reasons = new Set<string>();
  for (const node of descendants(source)) for (const form of forms) if (form.read(node)) reasons.add(form.reason);
  return [...reasons].sort();
}
/** Whether C7 parses a source: its text, raw or unescaped, holds DRIVER_NEEDLE. */
export const passesPrefilter = (text: string): boolean => DRIVER_NEEDLE.test(text) || DRIVER_NEEDLE.test(unescaped(text));
/** The escape forms unescaped decodes (PREFILTER above). */
export const UNESCAPE_FORMS = ["hex escape", "unicode escape", "braced unicode escape", "legacy octal escape", "line continuation", "escaped character", "percent escape"] as const;

// ---- residuals ------------------------------------------------------------------------------------------------------------

export interface ResidualFamily {
  readonly id: string;
  readonly family: string;
}
/** The named families these readers do not read (RESIDUALS above), each pinned by a quiet row and a loud control in the census. */
export const RESIDUAL_FAMILIES: readonly ResidualFamily[] = [
  {
    id: "R-WRAPPER",
    family:
      "a process-table tool run through a word outside WRAPPERS, SHELL_KEYWORDS and SHELLS (a leading redirection included), by a script file a shell runs, or inside another language's inline program reads as no command head",
  },
  {
    id: "R-INDIRECT",
    family:
      "a module specifier, override name or capability id reached through anything but a literal or a const chain to one (a let or var binding, an object member, a parameter, an imported name), or an environment call reached through call, apply or Reflect.apply, reads as no value",
  },
  {
    id: "R-FLOW",
    family:
      "a local root whose value arrives through a flow ROOT_FORMS does not follow (a parameter of a function the file only passes on as a value, such as a callback, or reaches only through a parameter default; a catch variable; a destructured for-of binding; a return value; an object member) reads as no outside chain, and a WATCHED member destructured in a for-of binding reads as no reference",
  },
];
