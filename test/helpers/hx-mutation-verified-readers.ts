/**
 * wb-ts6.3 (TS6-R2, program-triage-2026-10-18; the rule-19 structural-exit child of wb-ts6.2, orchestrator rulings R-B112 and
 * R-B145): the full-surface readers for wb-ts6.2's HX mutation 'Verified' census (test/workbench-hx-mutation-verified-census.test.ts,
 * cut #4 618f99fe, not on trunk; wb-ts6.2 is blocked by this bead under R-B145). That cut restated each census claim to the
 * fail-closed core its own readers proved; these readers carry the coverage it narrowed out (the C4 entry-point spellings, the C1
 * link loads, the C2 computed-key and assignment destructures and every declaration of a symbol, the B2/Q3 registration call
 * forms, and an environment axis for row A), so its re-cut is a mechanical restatement over them. Each reader reads exactly what
 * its claim lines below say and nothing else is claimed for it: every claim line names its requirement (the bead's U1-U4 and
 * R-B145's U1-U2) and its falsifiers, and every residual line names the quiet rows that pin it. The falsifier census
 * (test/workbench-hx-mutation-verified-readers-census.test.ts) holds each line byte for byte and in order, runs each falsifier
 * (the gate's own plants verbatim among them: each reads as its claim says, and the unmodified wb-ts6.2 cut #4 reader did not)
 * and each quiet row (the residual's probe reads nothing while its loud twin reads).
 *
 * CLAIMS ("- <claim> (<requirement>) [<falsifiers>]: <the reading>"):
 * - EN-DIRECTORY (U1) [EN-WALK-TREE]: entriesBelow lists every entry below a directory, at any depth, as its path relative to that directory (/-separated) with the kind entryKind reads from the entry readdir reports, and descends into every directory entry.
 * - EN-MODULE (U1) [EN-WALK-MODULES]: a regular file whose name ends with a MODULE_EXTENSIONS member (.ts, .tsx, .mts, .cts, .js, .jsx, .mjs, .cjs) reads module.
 * - EN-JSON (U1) [L3-C4-JSON-CMD-ENTRY, G16-C5-DOTFILE-JSON-ENTRY]: a regular file whose name ends with .json in that letter case, a dot-named one included, reads json.
 * - EN-FILE (U1) [EN-WALK-FILES]: a regular file of any other name reads file.
 * - EN-LINK (U2) [L3-C1-SYMLINK-ENTRY, L3-C1-DIRLINK-CTRL-ENTRY, EN-WALK-DANGLING, EN-KIND-LINK-FIRST]: a symbolic link reads link whatever it points to (a file, a directory, nothing), and the walk never descends through one.
 * - EN-TARGET (U2) [EN-TARGET-REAL, EN-TARGET-DANGLING]: a link entry carries its target as realpathSync reads it (every link on the path followed), or <dangling> when that resolves to nothing.
 * - EN-OTHER (U1) [EN-KIND-OTHER]: any other entry (a FIFO, a socket, a device: no link, no directory, no regular file) reads other.
 * - ST-LITERAL (U1) [ST-LITERAL-STRING, ST-LITERAL-NOSUB, G16-C4-ESCAPED-STRINGS]: entryStrings reads a module entry's strings as the cooked text (escapes decoded) of each string literal and no-substitution template it holds.
 * - ST-TEMPLATE (U1) [ST-TEMPLATE-HEAD, L3-C4-TMPL-MIDDLE-STRINGS, ST-TEMPLATE-TAIL]: and as the cooked text of each template's head, middle and tail.
 * - ST-KIND-TS (U1) [ST-KIND-ASSERTION]: a module entry whose name ends with .ts, .mts or .cts parses as TypeScript, so an angle-bracket assertion's operand is read.
 * - ST-KIND-JSX (U1) [ST-KIND-JSX-TEXT]: any other module entry (.tsx, .jsx, .js, .mjs, .cjs) parses with JSX, so JSX text is no string.
 * - ST-JSON (U1) [L3-C4-JSON-CMD-STRINGS, ST-JSON-NESTED, ST-JSON-KEY, ST-JSON-ESCAPE]: a json entry's strings are, from JSON.parse of its text (escapes decoded), every string value and every object key at any depth.
 * - ST-JSON-UNPARSED (U1) [ST-JSON-INVALID]: a json entry whose text JSON.parse refuses reads undefined.
 * - ST-UNREAD (U1) [ST-OTHER-NAMES]: an entry of any other name reads undefined.
 * - ST-AT (U1) [ST-AT-FILE, ST-AT-LINKED-JSON, ST-AT-UNREAD]: stringsAt reads an entry by lstat: a regular file, and a link whose target is a regular file, by the entry's own name and the target's text; a directory, a link to a directory or to nothing, and any other entry read undefined.
 * - ID-REAL (U2) [L3-C1-SYMLINK-IDENTITY, L3-C1-DIRLINK-CTRL-IDENTITY, ID-REAL-BELOW, ID-REAL-LINKED, ID-REAL-SIBLING]: isSdkFile reads a path through every link on it (realpathSync): its real path below the package's real directory (that directory and a /, so a sibling sharing its prefix is not) is the SDK's.
 * - ID-MANIFEST (U2) [ID-MANIFEST-COPY, ID-MANIFEST-LINKED, ID-MANIFEST-NAMELESS, ID-MANIFEST-NONE]: so is a real path whose nearest package.json, read upward from that real path, names @hyperunix/sdk (a nearest manifest naming none, or no manifest, reads null).
 * - ID-DANGLING (U2) [ID-DANGLING-INSIDE]: a path that resolves to nothing is no SDK file.
 * - ID-RESOLVE (U2) [L3-C1-SYMLINK-RESOLVE, ID-RESOLVE-BARE, ID-RESOLVE-PLAIN]: resolvesIntoSdk resolves a specifier by ts.resolveModuleName from the importing file under the given options, and the resolved file is the SDK's as isSdkFile reads it.
 * - MB-DECLARATIONS (B145-U1) [G16-C2-INTERSECTION-LOCAL-FIRST, G16-C2-INTERSECTION-SDK-FIRST, G16-C2-INTERSECTION-DESTRUCTURE, MB-DECLARATIONS-LOCAL]: sdkDeclarations reads every declaration of a symbol, in the checker's order, that lies below the SDK's dist directory, as its path there - a property of an intersection whose local constituent comes first included.
 * - MB-ALIAS (B145-U1) [MB-ALIAS-IMPORT]: an alias symbol (an import binding) is read through checker.getAliasedSymbol.
 * - MB-KEY-NAME (U3) [MB-KEY-IDENTIFIER, MB-KEY-STRING, MB-KEY-SHORTHAND]: bindingKey reads an object binding element's key as its property name when that is an identifier or a string literal, and as its own name when it has none (shorthand).
 * - MB-KEY-NONE (U3) [MB-KEY-REST, MB-KEY-ARRAY]: a rest element and an array binding element read undefined.
 * - MB-KEY-COMPUTED (U3) [L3-C2-COMPUTED-DESTRUCTURE, L3-C2-CONSTKEY-DESTRUCTURE, MB-KEY-TEMPLATE]: a computed key whose expression the checker types as one string literal (a quoted literal in brackets, a const bound to one, a no-substitution template) reads that literal.
 * - MB-PATTERN (U3) [L3-C2-ASSIGN-DESTRUCTURE, MB-PATTERN-RENAMED, MB-PATTERN-STRING, MB-PATTERN-COMPUTED, MB-PATTERN-DEFAULTED]: assignmentPatternMembers reads every property of an object destructuring-assignment pattern - a shorthand (defaulted or not), an identifier, string-literal or computed key (one string literal) - with its name and the property symbol of the pattern's type (checker.getTypeOfAssignmentPattern).
 * - MB-PATTERN-PLACE (U3) [MB-PLACE-FOR-OF, MB-PLACE-NESTED, MB-PLACE-ARRAY, MB-PLACE-DEFAULT-TARGET, MB-PLACE-NOT-PATTERN]: a pattern is an object literal on the left of = (a default's target inside a pattern included), the initializer of a for-of, a property's value in a pattern, or an element of an array literal that is itself on the left of =, a for-of initializer or nested in a pattern; the reader reads no other object literal as one.
 * - RG-BINDING (B145-U2) [G16-B2-DIRECT-CALL-CTRL, RG-RENAMED-IMPORT, RG-NAMESPACE-MEMBER]: registrationReferences reads a reference as an identifier whose symbol is a target, an import binding read through checker.getAliasedSymbol (renamed, or a namespace's member) included.
 * - RG-ELEMENT-KEY (B145-U2) [RG-ELEMENT-CALL, RG-ELEMENT-TEMPLATE, RG-ELEMENT-CONST]: and as an element access whose key the checker types as one string literal (a string literal, a no-substitution template, a const bound to one), by the property of that name on its object's type.
 * - RG-CALL (B145-U2) [G16-B2-DIRECT-CALL-INPLACE-CTRL, RG-PARENTHESIZED-CALL, RG-ASSERTED-CALL]: a reference that is a call's callee (itself, or the member access or element access it names), read through parentheses and as, satisfies, non-null and angle-bracket assertions, reads call.
 * - RG-CALL-METHOD (B145-U2) [G16-B2-CALL-METHOD, G16-B2-CALL-METHOD-INPLACE, RG-APPLY, RG-METHOD-WRAPPED]: a reference that is the receiver of .call or .apply, that member (read through the same wrappers) being a call's callee, reads call-method.
 * - RG-ALIAS (B145-U2) [G16-B2-ALIAS-CALL, G16-B2-ALIAS-CALL-BLANK, RG-ALIAS-CHAIN, RG-ALIAS-EXPORTED, RG-ALIAS-WRAPPED, RG-OWN-DECLARATION]: a reference that initializes a const declaration of a name, read through the same wrappers, reads alias, and that name's own references read as the same target's, through any chain of such names across the given files in any order; a variable's or a function's own declared name is no reference.
 * - RG-SPECIFIER (B145-U2) [RG-IMPORT-SPECIFIER, RG-EXPORT-SPECIFIER]: a name of an import or export specifier reads specifier.
 * - RG-OTHER (B145-U2) [RG-LET-ALIAS, RG-ARGUMENT, RG-BIND, RG-METHOD-UNCALLED, RG-DESTRUCTURED, RG-PROPERTY-VALUE, RG-SHORTHAND-VALUE, RG-TYPE-QUERY]: any other reference reads reference (a let or var initializer, an argument, a .bind receiver, a .call or .apply member that is no call's callee, a destructured key, a property value, a shorthand property's value by its value symbol, a type query).
 * - EV-CLOSURE (U4) [EV-CLOSURE-CHAIN, EV-CLOSURE-TYPE-ONLY, EV-CLOSURE-FILTER]: importClosure reads the entry module and, transitively, every module a top-level import declaration (type-only included), export-from declaration or import-equals of an external module names, as the checker's module symbol resolves it, that the filter accepts, each once (an import cycle included).
 * - EV-READS (U4) [L3-A-ENV-READS, EV-GLOBAL-THIS, EV-ELEMENT, EV-IMPORTED-ENV, EV-REFLECT, EV-DESTRUCTURE-SOURCE, EV-LOCAL-PROCESSENV]: environmentReads reads every identifier other than a member access's name, and every member access, element access and call, that the checker types as the ProcessEnv interface @types/node declares, as <line>|<text>.
 *
 * RESIDUALS ("- <residual> [<quiet rows>]: <the family no claim reads>"):
 * - R-UNNARROWED-KEY [Q-KEY-UNION, Q-PATTERN-STRING-KEY]: a computed key typed as anything but one string literal (a union of literals, string, a keyof type) and a numeric key read no name (bindingKey undefined; a pattern member's name undefined).
 * - R-REST-PATTERN [Q-MB-REST-PATTERN]: an object pattern below an array rest element ([...{ length }] = list, [, ...[{ mutations }]] = list) reads no member: the checker types no such pattern (getTypeOfAssignmentPattern fails on it), so the reader never asks.
 * - R-COPIED-SDK [Q-ID-COPY]: a regular-file copy or a hard link of an SDK file outside the package, with no SDK manifest above it, is no SDK file.
 * - R-UNNAMED-REFERENCE [Q-RG-COMPUTED]: a registration reached without a name the checker resolves (an element key it does not type as one string literal, Object.values, an any-typed value) is no reference.
 * - R-UNTYPED-ENV [Q-EV-UNTYPED]: the environment read through a value the checker does not type as ProcessEnv (a cast through any or unknown, require's any result) is no environment read.
 * - R-RUNTIME-LOAD [Q-EV-DYNAMIC]: a module reached only at run time (import(), require(), a created require) is not in the closure.
 * - R-RELOCATED-SDK [Q-MB-RELOCATED]: an SDK declaration TypeScript reads at a file name with no /node_modules/@hyperunix/sdk/dist/ segment (a package linked from elsewhere, read by its real path) is no SDK declaration.
 * - R-AMBIENT-OTHER [Q-EV-AMBIENT]: an ambient input other than the environment (the clock, a random draw, process.argv, process.platform, module state) is no environment read.
 */
import { lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, join, sep } from "node:path";
import ts from "typescript";

/** The vendored SDK's package name. */
export const SDK = "@hyperunix/sdk";
/** The module file extensions (wb-ts6.2 cut #4's MODULE_EXTENSIONS, unchanged). */
export const MODULE_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"] as const;
/** The module file extensions that parse as TypeScript; every other module file parses with JSX. */
export const TYPESCRIPT_EXTENSIONS = [".ts", ".mts", ".cts"] as const;
/** The data entry extension whose strings entryStrings reads. */
export const JSON_EXTENSION = ".json";
/** A link entry's target when realpathSync resolves it to nothing. */
export const DANGLING = "<dangling>";
/** The path segment below which an SDK declaration file lies. */
export const SDK_DIST_MARKER = `/node_modules/${SDK}/dist/`;

function slash(path: string): string {
  return path.split(sep).join("/");
}

// ---- entries (EN) ----

/** A directory entry as readdir reports it: a link is never followed. */
export interface EntryLike {
  readonly name: string;
  isDirectory(): boolean;
  isFile(): boolean;
  isSymbolicLink(): boolean;
}
export type EntryKind = "directory" | "module" | "json" | "file" | "link" | "other";
/** Whether a name is a module file's: it ends with a MODULE_EXTENSIONS member. */
function isModuleName(name: string): boolean {
  return MODULE_EXTENSIONS.some(extension => name.endsWith(extension));
}
/** The kind of one entry (EN-MODULE, EN-JSON, EN-FILE, EN-LINK, EN-OTHER). */
export function entryKind(entry: EntryLike): EntryKind {
  if (entry.isSymbolicLink()) return "link";
  if (entry.isDirectory()) return "directory";
  if (!entry.isFile()) return "other";
  if (isModuleName(entry.name)) return "module";
  return entry.name.endsWith(JSON_EXTENSION) ? "json" : "file";
}
/** A path read through every link on it (realpathSync), /-separated, or undefined when it resolves to nothing. */
function realTarget(path: string): string | undefined {
  try {
    return slash(realpathSync(path));
  } catch {
    return undefined;
  }
}
export interface EntryReading {
  readonly path: string;
  readonly kind: EntryKind;
  readonly target?: string;
}
/** Every entry below a directory (EN-DIRECTORY), a link's target included (EN-TARGET). */
export function entriesBelow(directory: string): EntryReading[] {
  const found: EntryReading[] = [];
  const below = (relativePath: string): void => {
    for (const entry of readdirSync(join(directory, relativePath), { withFileTypes: true })) {
      const path = relativePath === "" ? entry.name : `${relativePath}/${entry.name}`;
      const kind = entryKind(entry);
      if (kind === "link") found.push({ path, kind, target: realTarget(join(directory, path)) ?? DANGLING });
      else found.push({ path, kind });
      if (kind === "directory") below(path);
    }
  };
  below("");
  return found;
}

// ---- strings (ST) ----

function moduleStrings(name: string, text: string): string[] {
  const kind = TYPESCRIPT_EXTENSIONS.some(extension => name.endsWith(extension)) ? ts.ScriptKind.TS : ts.ScriptKind.TSX;
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      found.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind));
  return found;
}
function jsonStrings(text: string): string[] | undefined {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return undefined;
  }
  const found: string[] = [];
  const visit = (inner: unknown): void => {
    if (typeof inner === "string") found.push(inner);
    else if (Array.isArray(inner)) for (const element of inner) visit(element);
    else if (typeof inner === "object" && inner !== null) {
      for (const [key, member] of Object.entries(inner)) {
        found.push(key);
        visit(member);
      }
    }
  };
  visit(value);
  return found;
}
/** The strings an entry of this name carries in this text (ST-LITERAL .. ST-UNREAD), or undefined for an unread entry. */
export function entryStrings(name: string, text: string): string[] | undefined {
  if (isModuleName(name)) return moduleStrings(name, text);
  return name.endsWith(JSON_EXTENSION) ? jsonStrings(text) : undefined;
}
/** One entry's strings read from the file system by lstat (ST-AT). */
export function stringsAt(path: string): string[] | undefined {
  const own = lstatSync(path);
  if (own.isFile()) return entryStrings(basename(path), readFileSync(path, "utf8"));
  if (!own.isSymbolicLink() || realTarget(path) === undefined || !statSync(path).isFile()) return undefined;
  return entryStrings(basename(path), readFileSync(path, "utf8"));
}

// ---- module identity (ID) ----

/** The name the package.json nearest above a file declares (null when that manifest names none, or no manifest is found). */
export function packageNameOf(file: string): string | null {
  for (let directory = dirname(file); ; directory = dirname(directory)) {
    let text: string | undefined;
    try {
      text = readFileSync(join(directory, "package.json"), "utf8");
    } catch {
      text = undefined;
    }
    if (text !== undefined) {
      const parsed: unknown = JSON.parse(text);
      return typeof parsed === "object" && parsed !== null && "name" in parsed && typeof parsed.name === "string" ? parsed.name : null;
    }
    if (dirname(directory) === directory) return null;
  }
}
/** Whether a file is the SDK's (ID-REAL, ID-MANIFEST, ID-DANGLING). */
export function isSdkFile(file: string, packageReal: string): boolean {
  const real = realTarget(file);
  if (real === undefined) return false;
  return real.startsWith(`${packageReal}/`) || packageNameOf(real) === SDK;
}
/** Whether a specifier imported from a file resolves into the SDK (ID-RESOLVE). */
export function resolvesIntoSdk(specifier: string, from: string, options: ts.CompilerOptions, packageReal: string): boolean {
  const resolved = ts.resolveModuleName(specifier, from, options, ts.sys).resolvedModule;
  return resolved !== undefined && isSdkFile(resolved.resolvedFileName, packageReal);
}

// ---- members (MB) ----

export interface SdkDeclaration {
  readonly file: string;
  readonly declaration: ts.Declaration;
}
/** Every SDK declaration of a symbol (MB-DECLARATIONS, MB-ALIAS). */
export function sdkDeclarations(symbol: ts.Symbol | undefined, checker: ts.TypeChecker): SdkDeclaration[] {
  if (symbol === undefined) return [];
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  return (target.declarations ?? []).flatMap(declaration => {
    const fileName = slash(declaration.getSourceFile().fileName);
    const at = fileName.indexOf(SDK_DIST_MARKER);
    return at === -1 ? [] : [{ file: fileName.slice(at + SDK_DIST_MARKER.length), declaration }];
  });
}
/** A property name's key: an identifier or a string literal as written, a computed key typed as one string literal by its value. */
function keyOf(name: ts.PropertyName, checker: ts.TypeChecker): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  if (!ts.isComputedPropertyName(name)) return undefined;
  const type = checker.getTypeAtLocation(name.expression);
  return type.isStringLiteral() ? type.value : undefined;
}
/** An object binding element's key (MB-KEY-NAME, MB-KEY-COMPUTED), or undefined (MB-KEY-NONE). */
export function bindingKey(element: ts.BindingElement, checker: ts.TypeChecker): string | undefined {
  if (!ts.isObjectBindingPattern(element.parent) || element.dotDotDotToken !== undefined) return undefined;
  if (element.propertyName === undefined) return ts.isIdentifier(element.name) ? element.name.text : undefined;
  return keyOf(element.propertyName, checker);
}
/** Whether an object or array literal is a destructuring-assignment pattern (MB-PATTERN-PLACE). */
function isPattern(node: ts.ObjectLiteralExpression | ts.ArrayLiteralExpression): boolean {
  const parent = node.parent;
  if (ts.isBinaryExpression(parent)) return parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.left === node;
  if (ts.isForOfStatement(parent)) return parent.initializer === node;
  if (ts.isPropertyAssignment(parent)) return parent.initializer === node && isPattern(parent.parent);
  if (ts.isArrayLiteralExpression(parent)) return isPattern(parent);
  return false;
}
export interface PatternMember {
  readonly name: string | undefined;
  readonly symbol: ts.Symbol | undefined;
  readonly at: ts.Node;
}
/** Every property of every object destructuring-assignment pattern in a file (MB-PATTERN). */
export function assignmentPatternMembers(file: ts.SourceFile, checker: ts.TypeChecker): PatternMember[] {
  const found: PatternMember[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node) && isPattern(node)) {
      const type = checker.getTypeOfAssignmentPattern(node);
      for (const property of node.properties) {
        if (!ts.isShorthandPropertyAssignment(property) && !ts.isPropertyAssignment(property)) continue;
        const name = keyOf(property.name, checker);
        found.push({ name, symbol: name === undefined ? undefined : type.getProperty(name), at: property });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}

// ---- registration references (RG) ----

export interface ReferenceSource {
  readonly label: string;
  readonly file: ts.SourceFile;
}
type Wrapper = ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion;
/** Parentheses and as, satisfies, non-null and angle-bracket assertions: the wrappers a reference is read through. */
function isWrapper(node: ts.Node): node is Wrapper {
  return ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node);
}
function skipOuter(node: ts.Expression): ts.Expression {
  let outer = node;
  while (isWrapper(outer.parent)) outer = outer.parent;
  return outer;
}
function skipInner(node: ts.Expression): ts.Expression {
  let inner = node;
  while (isWrapper(inner)) inner = inner.expression;
  return inner;
}
function declaredName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (ts.isVariableDeclaration(parent) || ts.isFunctionDeclaration(parent)) && parent.name === node;
}
/** Every reference of a target in the given files, each read as label|form|target|text (RG-BINDING .. RG-OTHER). */
export function registrationReferences(sources: readonly ReferenceSource[], checker: ts.TypeChecker, targets: ReadonlyMap<ts.Symbol, string>): string[] {
  const aliases = new Map<ts.Symbol, string>();
  const targetOf = (symbol: ts.Symbol | undefined): string | undefined => {
    if (symbol === undefined) return undefined;
    const resolved = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
    return targets.get(resolved) ?? aliases.get(resolved);
  };
  const referenceOf = (node: ts.Expression): string | undefined => {
    if (ts.isIdentifier(node)) {
      const shorthand = ts.isShorthandPropertyAssignment(node.parent) && node.parent.name === node;
      return targetOf(shorthand ? checker.getShorthandAssignmentValueSymbol(node.parent) : checker.getSymbolAtLocation(node));
    }
    if (ts.isPropertyAccessExpression(node)) return targetOf(checker.getSymbolAtLocation(node.name));
    if (!ts.isElementAccessExpression(node)) return undefined;
    const key = checker.getTypeAtLocation(node.argumentExpression);
    return key.isStringLiteral() ? targetOf(checker.getTypeAtLocation(node.expression).getProperty(key.value)) : undefined;
  };
  const constAliases: ts.VariableDeclaration[] = [];
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const) constAliases.push(node);
    ts.forEachChild(node, collect);
  };
  for (const source of sources) collect(source.file);
  for (let grew = true; grew; ) {
    grew = false;
    for (const declaration of constAliases) {
      const symbol = checker.getSymbolAtLocation(declaration.name);
      const target = declaration.initializer === undefined ? undefined : referenceOf(skipInner(declaration.initializer));
      if (symbol !== undefined && target !== undefined && !aliases.has(symbol)) {
        aliases.set(symbol, target);
        grew = true;
      }
    }
  }
  const found: string[] = [];
  for (const { label, file } of sources) {
    const visit = (node: ts.Node): void => {
      ts.forEachChild(node, visit);
      let reference: ts.Expression | undefined;
      if (ts.isIdentifier(node) && !declaredName(node)) {
        reference = ts.isPropertyAccessExpression(node.parent) && node.parent.name === node ? node.parent : node;
      } else if (ts.isElementAccessExpression(node)) reference = node;
      if (reference === undefined) return;
      const target = referenceOf(reference);
      if (target === undefined) return;
      found.push(`${label}|${formOf(node, reference, aliases, checker)}|${target}|${reference.getText(file)}`);
    };
    visit(file);
  }
  return found;
}
function formOf(node: ts.Node, reference: ts.Expression, aliases: ReadonlyMap<ts.Symbol, string>, checker: ts.TypeChecker): string {
  if (ts.isImportSpecifier(node.parent) || ts.isExportSpecifier(node.parent)) return "specifier";
  const outer = skipOuter(reference);
  const parent = outer.parent;
  if (ts.isCallExpression(parent) && parent.expression === outer) return "call";
  if (ts.isPropertyAccessExpression(parent) && parent.expression === outer && (parent.name.text === "call" || parent.name.text === "apply")) {
    const method = skipOuter(parent);
    if (ts.isCallExpression(method.parent) && method.parent.expression === method) return "call-method";
  }
  if (ts.isVariableDeclaration(parent)) {
    const symbol = checker.getSymbolAtLocation(parent.name);
    if (symbol !== undefined && aliases.has(symbol)) return "alias";
  }
  return "reference";
}

// ---- environment (EV) ----

function moduleSpecifierOf(statement: ts.Statement): ts.Expression | undefined {
  if (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) return statement.moduleSpecifier;
  return ts.isImportEqualsDeclaration(statement) && ts.isExternalModuleReference(statement.moduleReference) ? statement.moduleReference.expression : undefined;
}
/** The entry module and every module its static imports reach that the filter accepts (EV-CLOSURE). */
export function importClosure(entry: ts.SourceFile, checker: ts.TypeChecker, accepts: (fileName: string) => boolean): ts.SourceFile[] {
  const closure = new Map<string, ts.SourceFile>([[entry.fileName, entry]]);
  const queue: ts.SourceFile[] = [entry];
  for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
    for (const statement of file.statements) {
      const specifier = moduleSpecifierOf(statement);
      const declaration = specifier === undefined ? undefined : checker.getSymbolAtLocation(specifier)?.declarations?.find(ts.isSourceFile);
      if (declaration === undefined || closure.has(declaration.fileName) || !accepts(declaration.fileName)) continue;
      closure.set(declaration.fileName, declaration);
      queue.push(declaration);
    }
  }
  return [...closure.values()];
}
function processEnvTyped(node: ts.Node, checker: ts.TypeChecker): boolean {
  const declarations = checker.getTypeAtLocation(node).getSymbol()?.declarations ?? [];
  return declarations.some(declaration => ts.isInterfaceDeclaration(declaration) && declaration.name.text === "ProcessEnv" && slash(declaration.getSourceFile().fileName).includes("/node_modules/@types/node/"));
}
/** Every environment read in a file (EV-READS). */
export function environmentReads(file: ts.SourceFile, checker: ts.TypeChecker): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    const candidate =
      (ts.isIdentifier(node) && !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node)) ||
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node) ||
      ts.isCallExpression(node);
    if (candidate && processEnvTyped(node, checker)) found.push(`${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}|${node.getText(file)}`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
