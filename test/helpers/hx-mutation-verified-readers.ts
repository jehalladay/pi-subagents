/**
 * wb-ts6.3 (TS6-R2, program-triage-2026-10-18; the rule-19 structural-exit child of wb-ts6.2, orchestrator rulings R-B112 and
 * R-B145): the full-surface readers for wb-ts6.2's HX mutation 'Verified' census (test/workbench-hx-mutation-verified-census.test.ts,
 * cut #4 618f99fe, not on trunk; wb-ts6.2 is blocked by this bead under R-B145). That cut restated each census claim to the
 * fail-closed core its own readers proved; these readers carry the coverage it narrowed out (the C4 entry-point spellings, the C1
 * link loads, the C2 computed-key and assignment destructures and the declarations of a merged symbol, the B2/Q3 registration
 * call forms, and an environment axis for row A), so its re-cut is a mechanical restatement over them. Each claim line below
 * names its requirement (the bead's U1-U4 and R-B145's U1-U2), the falsifier rows that pin it and the reading they pin, scoped
 * to the inputs those rows plant: its reading is claimed for those inputs only (the enumerate-the-resolvable form ruling R-B239
 * binds), so a form, position, depth, name, key, statement or file shape that no row of a line plants is NOT CLAIMED by that
 * line. Each *-WITHIN line names the node kinds (ts.SyntaxKind) its rows plant a read form within, one row per kind and in row
 * order. Each residual line names the quiet rows that pin it. The falsifier census
 * (test/workbench-hx-mutation-verified-readers-census.test.ts) holds this whole header line for line (each heading once in the
 * file), runs each falsifier (the gate's own plants and paired twins among them) and each quiet row (the residual's probe reads
 * nothing while its loud twin reads), checks that each *-WITHIN row plants its read forms within a node of its kind, and pins
 * each row's reader calls and reading by digest.
 *
 * CLAIMS ("- <claim> (<requirement>) [<falsifiers>]: <the reading>"):
 * - EN-DIRECTORY (U1) [EN-WALK-TREE, P21-EN-DEPTH4]: entriesBelow lists the entries its rows plant below a directory (a tree three levels deep with two subdirectories at its top, and a chain four levels deep), each as its path relative to that directory (/-separated) with the kind entryKind reads from the entry readdir reports, and descends into each directory entry they plant; an entry more than four levels below the directory is NOT CLAIMED.
 * - EN-MODULE (U1) [EN-WALK-MODULES]: the regular files its row plants, one named by each MODULE_EXTENSIONS member (a.ts, b.tsx, c.mts, d.cts, e.js, f.jsx, g.mjs, h.cjs), read module.
 * - EN-JSON (U1) [L3-C4-JSON-CMD-ENTRY, G16-C5-DOTFILE-JSON-ENTRY]: the regular files its rows plant named hx-launch.json and .hx-launch.json (.json in that letter case, the second dot-named) read json.
 * - EN-FILE (U1) [EN-WALK-FILES]: the regular files its row plants under seven other names (README, hxjson, launch.json.bak, map.ts.map, notes.md, upper.JSON, upper.TS) read file.
 * - EN-LINK (U2) [L3-C1-SYMLINK-ENTRY, L3-C1-DIRLINK-CTRL-ENTRY, EN-WALK-DANGLING, EN-KIND-LINK-FIRST]: the symbolic links its rows plant read link - a link to a file, one to a directory and one to nothing, which the walk lists without descending through any of them, and a synthetic entry that reports both a directory and a link.
 * - EN-TARGET (U2) [EN-TARGET-REAL, EN-TARGET-DANGLING, EN-TARGET-CHAIN]: the link entries its rows plant carry their targets as realpathSync reads them (each link on the path followed: a link to the SDK's mutation module, a link to that link, and one below a subdirectory), and its link to a missing file carries <dangling>.
 * - EN-OTHER (U1) [EN-KIND-OTHER]: the synthetic entries its row plants that report no link, no directory and no regular file (named fifo, hx.sock and hx.json) read other.
 * - ST-LITERAL (U1) [ST-LITERAL-STRING, ST-LITERAL-NOSUB, G16-C4-ESCAPED-STRINGS, ST-LITERAL-NOSUB-ESCAPED, ST-LITERAL-TYPE-AND-ATTRIBUTE]: entryStrings reads the strings of the module entries its rows plant as the cooked text (a hex escape decoded) of the string literals and no-substitution templates they hold: in a top-level const, an import's module name, a call's argument and array elements in an arrow function's body, a type alias and a JSX attribute.
 * - ST-TEMPLATE (U1) [ST-TEMPLATE-HEAD, L3-C4-TMPL-MIDDLE-STRINGS, ST-TEMPLATE-TAIL, ST-TEMPLATE-ESCAPED]: and, for the templates its rows plant (with one or two substitutions, in an arrow function's body or a function's return statement, one with hex escapes), the cooked text of their heads, middles and tails.
 * - ST-WITHIN (U1) [P21-ST-ARROW, P21-ST-FUNCTION-EXPRESSION, P21-ST-CLASS, P21-ST-IF, P21-ST-FOR-OF, P21-ST-RETURN, P21-ST-TRY, P21-ST-CASE, P21-ST-CONDITIONAL, P21-ST-AWAIT, P21-ST-NEW, P21-ST-TAGGED, P21-ST-OBJECT, P21-ST-EXPORT-FROM, P21-ST-TYPE-LITERAL, P21-ST-TYPE-REF]: entryStrings reads the string literals and no-substitution templates its rows plant, one row within a node of each of these kinds (ts.SyntaxKind), in row order: ArrowFunction, FunctionExpression, ClassDeclaration, IfStatement, ForOfStatement, ReturnStatement, TryStatement, CaseClause, ConditionalExpression, AwaitExpression, NewExpression, TaggedTemplateExpression, ObjectLiteralExpression, ExportDeclaration, TypeLiteral, TypeReference; a literal within any other node kind is NOT CLAIMED by this line.
 * - ST-KIND-TS (U1) [ST-KIND-ASSERTION]: its row's module entries named a.ts, a.mts and a.cts parse as TypeScript, so an angle-bracket assertion's operand is read.
 * - ST-KIND-JSX (U1) [ST-KIND-JSX-TEXT]: its row's module entries named a.tsx, a.jsx, a.js, a.mjs and a.cjs parse with JSX, so JSX text is no string.
 * - ST-JSON (U1) [L3-C4-JSON-CMD-STRINGS, ST-JSON-NESTED, ST-JSON-KEY, ST-JSON-ESCAPE, ST-JSON-TOP, P21-JSON-EMPTY-VALUE, P21-JSON-EMPTY-KEY]: the json entries its rows plant read, from JSON.parse of their text (escapes decoded), the string values and object keys they hold: nested in objects and arrays to five levels, at the top level (a string, an array), beside values that are no string, an empty value and an empty key.
 * - ST-JSON-UNPARSED (U1) [ST-JSON-INVALID]: its row's json entry whose text JSON.parse refuses (an unquoted value) reads undefined.
 * - ST-UNREAD (U1) [ST-OTHER-NAMES]: its row's entries of seven other names (README, notes.md, map.ts.map, upper.TS, upper.JSON, launch.json.bak, hxjson) read undefined.
 * - ST-AT (U1) [ST-AT-FILE, ST-AT-LINKED-JSON, ST-AT-UNREAD]: stringsAt reads the entries its rows plant by lstat: a regular file, and a link whose target is a regular file, by the entry's own name and the target's text; a directory, a link to a directory and a link to nothing read undefined.
 * - ID-REAL (U2) [L3-C1-SYMLINK-IDENTITY, L3-C1-DIRLINK-CTRL-IDENTITY, ID-REAL-BELOW, ID-REAL-LINKED, ID-REAL-SIBLING, ID-REAL-OUTSIDE-DIST, ID-REAL-PACKAGE-ITSELF]: isSdkFile reads the paths its rows plant through the links on them (realpathSync: a file link and a directory link below a src tree, a linked package directory): a real path below the package's real directory (that directory and a /: the SDK's dist/protocol/mutation.js, and a package's dist/x.js and root.js) is the SDK's, and neither a sibling sharing its prefix nor the directory itself is.
 * - ID-MANIFEST (U2) [ID-MANIFEST-COPY, ID-MANIFEST-LINKED, ID-MANIFEST-NAMELESS, ID-MANIFEST-NONE, ID-MANIFEST-OTHER-NAME]: so is a real path its rows plant whose nearest package.json, read upward from that real path, names @hyperunix/sdk exactly (a copy's dist/x.js, and a link to it); of the paths its rows plant, one whose nearest manifest has no name, one whose manifest's name is a number and one with no manifest above it read null, and one whose manifest names @hyperunix/sdk-tools reads that name and is no SDK file.
 * - ID-DANGLING (U2) [ID-DANGLING-INSIDE]: its row's link inside a package's dist directory that resolves to nothing is no SDK file.
 * - ID-RESOLVE (U2) [L3-C1-SYMLINK-RESOLVE, ID-RESOLVE-BARE, ID-RESOLVE-PLAIN, ID-RESOLVE-OPTIONS]: resolvesIntoSdk resolves the specifiers its rows plant (a relative one to a link into the SDK, the bare package name, a plain relative module, a missing one, and a paths alias under options that carry it and options that do not) by ts.resolveModuleName from the importing file under the given options, and the resolved file is the SDK's as isSdkFile reads it.
 * - MB-DECLARATIONS (B145-U1) [G16-C2-INTERSECTION-LOCAL-FIRST, G16-C2-INTERSECTION-SDK-FIRST, G16-C2-INTERSECTION-DESTRUCTURE, MB-DECLARATIONS-LOCAL, MB-DECLARATIONS-TWO-SDK, MB-DECLARATIONS-TWO-SDK-REVERSED, MB-DECLARATIONS-NESTED-PATH]: sdkDeclarations reads, for the symbols its rows plant, the declarations that lie below the SDK's dist directory, in the checker's order (the symbol's declarations), as their paths there: an intersection's mutations property with its local constituent first or last and destructured, the mutations of HyperUnix & Workspace in both orders, a Frame's seq (protocol/query.d.ts), and none for a local object's property and for no symbol.
 * - MB-ALIAS (B145-U1) [MB-ALIAS-IMPORT]: its row's alias symbol (an import binding of HyperUnix) is read through checker.getAliasedSymbol.
 * - MB-KEY-NAME (U3) [MB-KEY-IDENTIFIER, MB-KEY-STRING, MB-KEY-SHORTHAND]: bindingKey reads the keys of its rows' object binding elements as the property name when that is an identifier or a string literal, and as the element's own name when it has none (shorthand).
 * - MB-KEY-NONE (U3) [MB-KEY-REST, MB-KEY-ARRAY]: its rows' rest element and array binding element read undefined.
 * - MB-KEY-COMPUTED (U3) [L3-C2-COMPUTED-DESTRUCTURE, L3-C2-CONSTKEY-DESTRUCTURE, MB-KEY-TEMPLATE]: its rows' computed keys whose expression the checker types as one string literal (a quoted literal in brackets, a const bound to one, a no-substitution template) read that literal.
 * - MB-PATTERN (U3) [L3-C2-ASSIGN-DESTRUCTURE, MB-PATTERN-RENAMED, MB-PATTERN-STRING, MB-PATTERN-COMPUTED, MB-PATTERN-DEFAULTED, MB-PATTERN-TWO, MB-PATTERN-REST]: assignmentPatternMembers reads the properties of the object destructuring-assignment patterns its rows plant, in order - a shorthand (defaulted or not), an identifier, string-literal or computed key (one string literal), and two shorthands in one pattern - with their names and the property symbols of the pattern's type (checker.getTypeOfAssignmentPattern); their rest element reads nothing.
 * - MB-PATTERN-PLACE (U3) [MB-PLACE-FOR-OF, MB-PLACE-NESTED, MB-PLACE-ARRAY, MB-PLACE-DEFAULT-TARGET, MB-PLACE-NOT-PATTERN, MB-PLACE-FOR-OF-ARRAY, MB-PLACE-NESTED-ARRAY, MB-PLACE-RHS-ARRAY]: in its rows a pattern is an object literal on the left of = (a default's target inside a pattern included), the initializer of a for-of, a property's value in a pattern, or an element of an array literal that is itself on the left of =, a for-of initializer or nested in a pattern; the other object literals its rows plant (a const's initializer and a value nested in one, an array element, an operand of ||, the right of =, an element of a for-of's iterable and of an array on the right of =) read as none.
 * - MB-PATTERN-WITHIN (U3) [P21-AP-ARROW, P21-AP-FUNCTION-EXPRESSION, P21-AP-CLASS, P21-AP-IF, P21-AP-RETURN, P21-AP-TRY, P21-AP-CASE, P21-AP-CONDITIONAL, P21-AP-AWAIT, P21-AP-NEW, P21-AP-TAGGED]: assignmentPatternMembers reads the patterns its rows plant, one row within a node of each of these kinds (ts.SyntaxKind), in row order: ArrowFunction, FunctionExpression, ClassDeclaration, IfStatement, ReturnStatement, TryStatement, CaseClause, ConditionalExpression, AwaitExpression, NewExpression, TaggedTemplateExpression; a pattern within any other node kind is NOT CLAIMED by this line.
 * - RG-BINDING (B145-U2) [G16-B2-DIRECT-CALL-CTRL, RG-RENAMED-IMPORT, RG-NAMESPACE-MEMBER]: registrationReferences reads, in the modules its rows plant, a reference as an identifier whose symbol is a target, an import binding read through checker.getAliasedSymbol (renamed, or a namespace's member) included.
 * - RG-ELEMENT-KEY (B145-U2) [RG-ELEMENT-CALL, RG-ELEMENT-TEMPLATE, RG-ELEMENT-CONST]: and, in its rows, as an element access whose key the checker types as one string literal (a string literal, a no-substitution template, a const bound to one), by the property of that name on its object's type.
 * - RG-CALL (B145-U2) [G16-B2-DIRECT-CALL-INPLACE-CTRL, RG-PARENTHESIZED-CALL, RG-ASSERTED-CALL, RG-WRAPPED-MEMBER-CALL]: a reference its rows plant as a call's callee (itself, or the member access or element access it names), bare or read through the wrappers they plant (parentheses; an as, satisfies or angle-bracket assertion in parentheses; a non-null assertion), reads call.
 * - RG-CALL-METHOD (B145-U2) [G16-B2-CALL-METHOD, G16-B2-CALL-METHOD-INPLACE, RG-APPLY, RG-METHOD-WRAPPED, RG-METHOD-RECEIVER]: a reference its rows plant as the receiver of .call or .apply (itself, or the member access or element access it names, bare or in an as assertion in parentheses), that member (bare, in parentheses or non-null asserted) being a call's callee, reads call-method.
 * - RG-ALIAS (B145-U2) [G16-B2-ALIAS-CALL, G16-B2-ALIAS-CALL-BLANK, RG-ALIAS-CHAIN, RG-ALIAS-EXPORTED, RG-ALIAS-WRAPPED, RG-OWN-DECLARATION, RG-ALIAS-LOCAL, RG-ALIAS-MEMBER, RG-ALIAS-ELEMENT, RG-ALIAS-FORMS]: a reference its rows plant (an identifier, a member access or an element access) that initializes a const declaration of a name, at the top level or in a function declaration's body, bare or read through the wrappers they plant (parentheses, an as, satisfies, non-null or angle-bracket assertion, and four nested in one), reads alias, and that name's own references read as the same target's, each in its own form (a call, a .call receiver, an argument), through the chains they plant (two names in one file; an exported alias imported and re-aliased in a second file, the importing file given first); a variable's or a function's own declared name is no reference.
 * - RG-ALIAS-WITHIN (B145-U2) [P21-CA-ARROW, P21-CA-FUNCTION-EXPRESSION, P21-CA-CLASS, P21-CA-IF, P21-CA-FOR-OF, P21-CA-RETURN-IIFE, P21-CA-TRY, P21-CA-CASE, RG-ALIAS-WITHIN-CONDITIONAL, RG-ALIAS-WITHIN-AWAIT, RG-ALIAS-WITHIN-NEW, RG-ALIAS-WITHIN-TAGGED, P21-CA-OBJECT-METHOD]: a const alias of a target that its rows plant is collected (its initializer reads alias, and its call reads as the target's), one row within a node of each of these kinds (ts.SyntaxKind), in row order: ArrowFunction, FunctionExpression, ClassDeclaration, IfStatement, ForOfStatement, ReturnStatement, TryStatement, CaseClause, ConditionalExpression, AwaitExpression, NewExpression, TaggedTemplateExpression, ObjectLiteralExpression; a const alias within any other node kind is NOT CLAIMED by this line.
 * - RG-SPECIFIER (B145-U2) [RG-IMPORT-SPECIFIER, RG-EXPORT-SPECIFIER]: the names of the import and export specifiers its rows plant (an import's, and a renamed export-from's two names) read specifier.
 * - RG-OTHER (B145-U2) [RG-LET-ALIAS, RG-ARGUMENT, RG-BIND, RG-METHOD-UNCALLED, RG-DESTRUCTURED, RG-PROPERTY-VALUE, RG-SHORTHAND-VALUE, RG-TYPE-QUERY, RG-VAR-ALIAS, P21-RG-NEW]: the other references its rows plant read reference: a let or var initializer and the right side of a let's reassignment, an argument, a .bind receiver, a .call or .apply member that is no call's callee, a destructured key, a property value, a shorthand property's value by its value symbol (a default's included), a type query and a new expression's callee.
 * - RG-WITHIN (B145-U2) [P21-RG-ARROW, P21-RG-FUNCTION-EXPRESSION, P21-RG-CLASS, P21-RG-IF, P21-RG-FOR-OF, P21-RG-RETURN, P21-RG-TRY, P21-RG-CASE, P21-RG-CONDITIONAL, P21-RG-AWAIT, RG-WITHIN-NEW, P21-RG-TAGGED, P21-RG-TYPE-LITERAL, P21-RG-TYPE-REF]: registrationReferences reads the target references its rows plant, each in its own form (a call; a reference in the tagged template, the type literal and the type reference), one row within a node of each of these kinds (ts.SyntaxKind), in row order: ArrowFunction, FunctionExpression, ClassDeclaration, IfStatement, ForOfStatement, ReturnStatement, TryStatement, CaseClause, ConditionalExpression, AwaitExpression, NewExpression, TaggedTemplateExpression, TypeLiteral, TypeReference; a reference within any other node kind is NOT CLAIMED by this line.
 * - EV-CLOSURE (U4) [EV-CLOSURE-CHAIN, EV-CLOSURE-TYPE-ONLY, EV-CLOSURE-FILTER, EV-CLOSURE-EXPORT-FROM, EV-CLOSURE-ORDER, P21-EV-SIDE-EFFECT, P21-EV-CYCLE-NOT-ENTRY]: importClosure reads, from the entry modules its rows plant, the entry and, transitively, the modules named by the top-level statements they plant (an import declaration with named bindings, a type-only one and one with no clause; export *, a named and a type-only export-from; an import-equals of an external module) as the checker's module symbol resolves them, that the filter accepts, each once (a cycle back to the entry, and one between two modules below it, included), in breadth-first order (a module's names in statement order).
 * - EV-READS (U4) [L3-A-ENV-READS, EV-GLOBAL-THIS, EV-ELEMENT, EV-IMPORTED-ENV, EV-REFLECT, EV-DESTRUCTURE-SOURCE, EV-LOCAL-PROCESSENV, EV-LINE-START, EV-NESTED, EV-OTHER-PACKAGE-PROCESSENV, EV-SHORTHAND]: environmentReads reads, in the modules its rows plant, the identifiers other than a member access's name (an import specifier's and a shorthand property's included), and the member accesses, element accesses and calls, that the checker types as the ProcessEnv interface @types/node declares (an interface of that name declared locally or by another package is none), a read inside a read included, as <line>|<text> (<line> the 1-based line its first character is on).
 * - EV-WITHIN (U4) [P21-EV-ARROW, P21-EV-FUNCTION-EXPRESSION, P21-EV-CLASS, P21-EV-IF, P21-EV-FOR-OF, P21-EV-RETURN, P21-EV-TRY, P21-EV-CASE, P21-EV-CONDITIONAL, P21-EV-AWAIT, P21-EV-NEW, P21-EV-TAGGED, P21-EV-EXPORT-FROM, P21-EV-TYPE-LITERAL, EV-WITHIN-TYPE-REF]: environmentReads reads the environment reads its rows plant, one row within a node of each of these kinds (ts.SyntaxKind), in row order: ArrowFunction, FunctionExpression, ClassDeclaration, IfStatement, ForOfStatement, ReturnStatement, TryStatement, CaseClause, ConditionalExpression, AwaitExpression, NewExpression, TaggedTemplateExpression, ExportDeclaration, TypeLiteral, TypeReference; a read within any other node kind is NOT CLAIMED by this line.
 *
 * RESIDUALS ("- <residual> [<quiet rows>]: <the family no claim reads>"):
 * - R-UNNARROWED-KEY [Q-KEY-UNION, Q-PATTERN-STRING-KEY]: a computed key typed as anything but one string literal (a union of literals, string, a keyof type) and a numeric key read no name (bindingKey undefined; a pattern member's name undefined).
 * - R-REST-PATTERN [Q-MB-REST-PATTERN]: an object pattern below an array rest element ([...{ length }] = list, [, ...[{ mutations }]] = list) reads no member: the checker types no such pattern (getTypeOfAssignmentPattern fails on it), so the reader never asks.
 * - R-COPIED-SDK [Q-ID-COPY]: a regular-file copy or a hard link of an SDK file outside the package, with no SDK manifest above it, is no SDK file.
 * - R-UNNAMED-REFERENCE [Q-RG-COMPUTED]: a registration reached without a name the checker resolves (an element key it does not type as one string literal, Object.values, an any-typed value) is no reference.
 * - R-UNTYPED-ENV [Q-EV-UNTYPED]: the environment read through a value the checker does not type as ProcessEnv (a cast through any or unknown, require's any result) is no environment read.
 * - R-RUNTIME-LOAD [Q-EV-DYNAMIC]: a module reached only at run time (import(), require(), a created require) is not in the closure.
 * - R-RELOCATED-SDK [Q-MB-RELOCATED]: an SDK declaration TypeScript reads at a file name with no /node_modules/@hyperunix/sdk/dist/ segment (a package linked from elsewhere, read by its real path, or vendored below a directory named @hyperunix/sdk) is no SDK declaration.
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
