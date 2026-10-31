/**
 * wb-tz2.17 (HX-ORIGINAL-GOALS-CLOSURE-R3, program-triage-2026-10-17; the rule-19 structural-exit child of wb-tz2.3,
 * orchestrator rulings R-B99 and R-B124): the RESOLUTION-BASED readers of wb-tz2.3's HyperUnix successor-gate census.
 * wb-tz2.3's census (cut #4 9686dce1, not on trunk; blocked by this bead under R-B124) reads its S row's IMPORT surface by
 * specifier SPELLING, its loader members by property access only, its census-tier collection by argv and a textual include
 * match, and its C scan over src/**\/*.ts only. These readers resolve, close and widen each one, so that census's re-cut can take
 * them in place of its own (R-B124: "the re-cut here is a mechanical restatement over the child's landed fix"). The falsifier
 * census is test/workbench-hyperunix-successor-gate-readers-census.test.ts. It holds every "- <word>: <claim>" line of this
 * header equal, in order and byte for byte, to the roster exported for its section, and gives every word a calibration plant.
 * Its TILE reads every claim here - each "- <word>: <claim>" line, and the text after the reader's name in a section heading -
 * split at ", ", ", or ", ", and ", ", nor ", "; ", " or ", " and " and " nor ", and holds each piece the quote of exactly one falsifier row (MEMBERS)
 * whose pins read what that piece says.
 *
 * RESOLUTION (resolveSpecifier; paths are root-relative with / separators; a path through a link reads as written rather than as its target):
 * - builtin: node: then any name, or a bare name node's module.isBuiltin accepts: a builtin module; a builtin is never read from a file
 * - relative: ., .., ./ or ../ then a path, joined to the importing file's directory; the path itself when it names a file; else the one file among the TypeScript source of a .js, .jsx, .mjs or .cjs path, the path with each EXTENSIONS entry added, and the index with each EXTENSIONS entry added of a directory that holds no package.json
 * - package: a bare <name> or @<scope>/<name>, then any /<subpath>; the first node_modules/<name> directory from the importing file's directory up to the root, skipping a directory named node_modules; a vitest home is a vitest module whatever the subpath; any other package resolves a subpath through its package.json exports (EXPORT_TARGETS); a package without exports reads a subpath as a relative path in it; with no subpath it reads its module entry, else its main entry, else index.js
 * - package imports: # then a key: the nearest package.json from the importing file's directory up to the root that holds an imports map, read like exports; a target that does not open with ./ resolves as a package from that package.json's directory
 * UNRESOLVED (resolveSpecifier; each reads unresolved naming its form with the reason):
 * - absolute path: a specifier opening with /
 * - url scheme: a specifier opening with a scheme such as file:, data: or http:
 * - query: a specifier holding ? anywhere (a vite query); a specifier holding # past its first character (a hash suffix)
 * - empty: an empty specifier
 * - outside the root: a relative path that leaves the root
 * - no file: a relative path that names no file; a package subpath that names no file
 * - ambiguous: more than one of the relative candidates is a file
 * - directory package: a relative path naming a directory that holds a package.json
 * - no package: a bare specifier whose node_modules/<name> directory is found nowhere up to the root
 * - no export: an exports map that holds no key for the subpath; an imports map that holds no key for the specifier; a map whose target resolves to nothing
 * - no imports map: a # specifier with no package.json holding an imports map up to the root
 * EXPORT_TARGETS (resolveSpecifier; an imports map reads with these forms as an exports map does):
 * - sugar: an exports string maps the subpath . alone; an exports array maps the subpath . alone; an exports object with no key opening with . maps the subpath . alone
 * - exact key: a key equal to the subpath, before any pattern key
 * - pattern key: a key holding one *, the matching key with the longest part before the *, its match put in place of each * of the target
 * - conditions: an object target is read in key order; its first condition key whose target maps to a string wins; the condition keys are import, module, node, and default
 * - array: an array target's first entry that maps to a string
 * - string: a string target opening with ./ is a file in the package, which must exist; any other string target resolves as a package specifier from the package's directory
 *
 * IDENTITY (ClosureReader.identity; a module is read once per reader; its identity is cached):
 * - vitest: a resolved file under a vitest home; a vitest home is a node_modules/vitest directory by its real path; a node_modules/@vitest/<name> directory by its real path; a package directory whose package.json name is vitest; a package directory whose package.json name opens with @vitest/
 * - carrier: a module that is no vitest module but has a load that resolves to a vitest module; one with a load that resolves to a carrier; one that holds a route ROUTE_FORMS reads in its scope
 * - builtin: a builtin module
 * - module: any other resolved module
 * SCOPES (scopeOf):
 * - suite: the cited suite itself
 * - local: any other module: its path passes through no node_modules directory; its real path passes through none
 * - package: a module whose path passes through a node_modules directory; a module whose real path passes through one
 * LOADS (loadsOf; each load is resolved from the module's own path; a .json file loads nothing; any other file not parsed as code loads nothing):
 * - import declaration: the specifier of an import declaration, type-only included
 * - export declaration: the specifier of an export declaration with a from clause, type-only included
 * - import-equals: the specifier of import <name> = require(<specifier>)
 * - import type: the specifier of an import type: import(<specifier>) in a type position
 * - dynamic import: the first argument of an import() call when it is a string literal; when it is a no-substitution template
 * - require call: the first argument of a call of an identifier require when it is a string literal; when it is a no-substitution template
 * ROUTES (routesOf; a module holding one is a carrier; each route of the cited suite is a CHANNEL finding):
 * - dynamic load: in every scope; an import() call whose first argument is no string literal (a no-substitution template counts as one); a call of an identifier require whose first argument is no string literal (a no-substitution template counts as one); either call with no argument
 * - loader name: in every scope; the loader names createRequire, getBuiltinModule; each read as an identifier, as a member name, as a whole string literal; the loader member names binding, dlopen, _linkedBinding; each read as a member name, as a string element key; an identifier require anywhere but as the callee of a call
 * - loader member: in every scope; the loader members importActual, importMock; each read as an identifier, as a member name, as a whole string literal; on any base
 * - vite name: in every scope; a name beginning __vite read as an identifier, as a member name, as a string literal, as a no-substitution template, as a template part; vite's injected loaders are such names; vitest's __vitest_index__ handle is one
 * - import meta: in every scope, import.meta read other than as the base of import.meta.url
 * - sensitive builtin: in every scope; a load that resolves to one of the builtins inspector, module, process, repl, vm; each named with node:; each named without node:
 * - global object: in every scope; a free globalThis, global, self, window, process; in a package module free means declared nowhere in the module; not when it is the base of a property access; not when it is the base of an element access keyed by a string literal; not when it is the base of an element access keyed by a numeric literal; read when that member names one of those five; read when that member names createRequire, getBuiltinModule, binding, dlopen, _linkedBinding; not as the operand of typeof; not as the first argument of an admitted spy in the suite
 * - dynamic code: read in the suite; read in local modules; never in a package module; a free eval; a free Function; an eval member of a free global object; a Function member of a free global object; a member constructor read on any base
 * WRITES (writesOf; the cited suite only; each is a CHANNEL finding):
 * - member write: an assignment of any operator to a property access; to an element access; ++ on such a target; -- on such a target; delete of such a target; such a target of a for-in; such a target of a for-of; such a target inside a destructuring assignment
 * - mutator member: __defineGetter__, __defineSetter__, __proto__, assign, defineProperties, defineProperty, deleteProperty, set, setPrototypeOf; each read as a member name, as a string element key, as a destructured key, as a whole string literal
 * - reflection: a free Reflect; a free Proxy; getOwnPropertyDescriptor, getOwnPropertyDescriptors, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf; each read as a mutator member is
 * - spy or mock member: spyOn read any way but as the callee of an admitted spy; an admitted spy is a call of a property access .spyOn with two arguments: a free identifier then a string literal not beginning __vite; doMock, doUnmock, hoisted, mock, mockImplementation, mockImplementationOnce, mockRejectedValue, mockRejectedValueOnce, mockResolvedValue, mockResolvedValueOnce, mockReturnValue, mockReturnValueOnce, stubEnv, stubGlobal, unmock, withImplementation; each read as a mutator member is
 * - computed member: an element access with a computed key; a string literal key is no computed key; a no-substitution template key is none; a numeric literal key is none; a computed key of an object binding pattern
 * CHANNEL (channelReading):
 * - tier config: the default test tier's one vitest config passes the landed census guard (censusGuard on the test tier) whose closed key lists refuse every key outside them; a resolver alias is refused (its landed row g-u62r5-alias); plugins are refused (its landed row g-u62r5-plugins); a refusal is a finding even when the guard names the config
 * - setup file: every setup file that config's test.setupFiles names is a closure root; a setup file that is a carrier is a finding; a setup file reaching a carrier is a finding; a setup file that is a vitest module is a finding; a setup file that names no file is a finding; a setup file whose closure holds a load that does not resolve is a finding
 * - cited suite: the suite's ROUTE_FORMS findings; its WRITE_FORMS findings; a sensitive builtin among its loads; the modules its loads reach are read by IMPORT
 * IMPORT (importReading; exactly one load of the suite resolves to a vitest module or to a carrier; it is an import declaration; every other load resolves to no vitest module and to no carrier; a load anywhere in the closure that does not resolve breaks; the listing names each load of the suite as written in source order; each listed load shows its form, its resolution and its identity):
 *
 * RUN (runReading):
 * - argv: the census tier resolves (the shared resolveTier) to exactly vitest run --config <file>
 * - statements: the config module holds only value import declarations of defineConfig from vitest/config, named and unaliased, and one default export
 * - default export: the default export is a call of that defineConfig with one object literal argument
 * - plain keys: every property of the config object is plain; every property of its test object is plain; a plain property has an identifier key with a value; a string key with a value is plain too; a spread is not plain; a computed key is not plain; a shorthand property is not plain; a method is not plain; an accessor is not plain; no key may appear twice
 * - top-level keys: the object holds test and no other key
 * - test keys: the test object holds allowOnly and include and no other key: dir, root, testNamePattern, passWithNoTests, exclude and every other key read as a break
 * - allowOnly: allowOnly is the literal false
 * - include: include is an array literal of string literals, one of whose globs matches the run pin: ** across directories, * within one, any other glob syntax unmatched
 *
 * C (srcSites; a tag is hyperunix.result/ then decimal digits):
 * - walk: every entry under src, in name order at each level: a directory is entered and every other entry is a file; a directory reached a second time by its real path reads as a break
 * - code: a file whose name ends .ts, .tsx, .mts, .cts, .js, .jsx, .mjs or .cjs is parsed as TypeScript by its extension, and every string literal, no-substitution template, template head, middle and tail and JSX text is read for a tag, never a comment or a regular expression
 * - text: any other file's whole text is read for a tag
 *
 * RESIDUALS (named families, each pinned by a quiet row in the census):
 * - R-PACKAGE-CODE: a package module's own dynamic code is no route (typebox builds validators through new (globalThis.Function)(...)), so a package that reaches vitest only through dynamic code reads as a module
 * - R-HELPER-PATCH: a local module the suite loads that patches a built-in at load while reaching no vitest module and holding no route reads as a module; the in-flight rewrite of a built-in is wb-tz2.3's R-RUNTIME family; the suite's own patch reads as a member write
 *
 * Not claimed: what a module does at run time beyond the forms above (a value assembled at run time and handed to a form these
 * readers do not name); a resolution vite performs that the default tier's vouched config cannot express (the census guard
 * refuses every key that may redirect a module); a package installed outside the lock. Display paths added: none. Test-only:
 * spawns nothing, writes nothing; reads files under the root through a host that may lay planted texts over the disk.
 */
import { readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isBuiltin } from "node:module";
import { join, posix } from "node:path";
import ts from "typescript";
import { censusGuard } from "./census.js";

// ---- rosters: each entry is one "- <word>: <claim>" line of the header, in order ----------------------------------------

export interface Claim<W extends string = string> {
  readonly word: W;
  readonly claim: string;
}
const roster = <W extends string>(entries: readonly (readonly [W, string])[]): readonly Claim<W>[] => entries.map(([word, claim]) => ({ word, claim }));

export const RESOLUTION_FORMS = roster([
  ["builtin", "node: then any name, or a bare name node's module.isBuiltin accepts: a builtin module; a builtin is never read from a file"],
  ["relative", "., .., ./ or ../ then a path, joined to the importing file's directory; the path itself when it names a file; else the one file among the TypeScript source of a .js, .jsx, .mjs or .cjs path, the path with each EXTENSIONS entry added, and the index with each EXTENSIONS entry added of a directory that holds no package.json"],
  ["package", "a bare <name> or @<scope>/<name>, then any /<subpath>; the first node_modules/<name> directory from the importing file's directory up to the root, skipping a directory named node_modules; a vitest home is a vitest module whatever the subpath; any other package resolves a subpath through its package.json exports (EXPORT_TARGETS); a package without exports reads a subpath as a relative path in it; with no subpath it reads its module entry, else its main entry, else index.js"],
  ["package imports", "# then a key: the nearest package.json from the importing file's directory up to the root that holds an imports map, read like exports; a target that does not open with ./ resolves as a package from that package.json's directory"],
] as const);
export type ResolutionForm = (typeof RESOLUTION_FORMS)[number]["word"];

export const UNRESOLVED_FORMS = roster([
  ["absolute path", "a specifier opening with /"],
  ["url scheme", "a specifier opening with a scheme such as file:, data: or http:"],
  ["query", "a specifier holding ? anywhere (a vite query); a specifier holding # past its first character (a hash suffix)"],
  ["empty", "an empty specifier"],
  ["outside the root", "a relative path that leaves the root"],
  ["no file", "a relative path that names no file; a package subpath that names no file"],
  ["ambiguous", "more than one of the relative candidates is a file"],
  ["directory package", "a relative path naming a directory that holds a package.json"],
  ["no package", "a bare specifier whose node_modules/<name> directory is found nowhere up to the root"],
  ["no export", "an exports map that holds no key for the subpath; an imports map that holds no key for the specifier; a map whose target resolves to nothing"],
  ["no imports map", "a # specifier with no package.json holding an imports map up to the root"],
] as const);
export type UnresolvedForm = (typeof UNRESOLVED_FORMS)[number]["word"];

export const EXPORT_TARGETS = roster([
  ["sugar", "an exports string maps the subpath . alone; an exports array maps the subpath . alone; an exports object with no key opening with . maps the subpath . alone"],
  ["exact key", "a key equal to the subpath, before any pattern key"],
  ["pattern key", "a key holding one *, the matching key with the longest part before the *, its match put in place of each * of the target"],
  ["conditions", "an object target is read in key order; its first condition key whose target maps to a string wins; the condition keys are import, module, node, and default"],
  ["array", "an array target's first entry that maps to a string"],
  ["string", "a string target opening with ./ is a file in the package, which must exist; any other string target resolves as a package specifier from the package's directory"],
] as const);
export type ExportTarget = (typeof EXPORT_TARGETS)[number]["word"];

export const IDENTITY_KINDS = roster([
  ["vitest", "a resolved file under a vitest home; a vitest home is a node_modules/vitest directory by its real path; a node_modules/@vitest/<name> directory by its real path; a package directory whose package.json name is vitest; a package directory whose package.json name opens with @vitest/"],
  ["carrier", "a module that is no vitest module but has a load that resolves to a vitest module; one with a load that resolves to a carrier; one that holds a route ROUTE_FORMS reads in its scope"],
  ["builtin", "a builtin module"],
  ["module", "any other resolved module"],
] as const);
export type IdentityKind = (typeof IDENTITY_KINDS)[number]["word"];

export const MODULE_SCOPES = roster([
  ["suite", "the cited suite itself"],
  ["local", "any other module: its path passes through no node_modules directory; its real path passes through none"],
  ["package", "a module whose path passes through a node_modules directory; a module whose real path passes through one"],
] as const);
export type ModuleScope = (typeof MODULE_SCOPES)[number]["word"];

export const LOAD_FORMS = roster([
  ["import declaration", "the specifier of an import declaration, type-only included"],
  ["export declaration", "the specifier of an export declaration with a from clause, type-only included"],
  ["import-equals", "the specifier of import <name> = require(<specifier>)"],
  ["import type", "the specifier of an import type: import(<specifier>) in a type position"],
  ["dynamic import", "the first argument of an import() call when it is a string literal; when it is a no-substitution template"],
  ["require call", "the first argument of a call of an identifier require when it is a string literal; when it is a no-substitution template"],
] as const);
export type LoadForm = (typeof LOAD_FORMS)[number]["word"];

export const ROUTE_FORMS = roster([
  ["dynamic load", "in every scope; an import() call whose first argument is no string literal (a no-substitution template counts as one); a call of an identifier require whose first argument is no string literal (a no-substitution template counts as one); either call with no argument"],
  ["loader name", "in every scope; the loader names createRequire, getBuiltinModule; each read as an identifier, as a member name, as a whole string literal; the loader member names binding, dlopen, _linkedBinding; each read as a member name, as a string element key; an identifier require anywhere but as the callee of a call"],
  ["loader member", "in every scope; the loader members importActual, importMock; each read as an identifier, as a member name, as a whole string literal; on any base"],
  ["vite name", "in every scope; a name beginning __vite read as an identifier, as a member name, as a string literal, as a no-substitution template, as a template part; vite's injected loaders are such names; vitest's __vitest_index__ handle is one"],
  ["import meta", "in every scope, import.meta read other than as the base of import.meta.url"],
  ["sensitive builtin", "in every scope; a load that resolves to one of the builtins inspector, module, process, repl, vm; each named with node:; each named without node:"],
  ["global object", "in every scope; a free globalThis, global, self, window, process; in a package module free means declared nowhere in the module; not when it is the base of a property access; not when it is the base of an element access keyed by a string literal; not when it is the base of an element access keyed by a numeric literal; read when that member names one of those five; read when that member names createRequire, getBuiltinModule, binding, dlopen, _linkedBinding; not as the operand of typeof; not as the first argument of an admitted spy in the suite"],
  ["dynamic code", "read in the suite; read in local modules; never in a package module; a free eval; a free Function; an eval member of a free global object; a Function member of a free global object; a member constructor read on any base"],
] as const);
export type RouteForm = (typeof ROUTE_FORMS)[number]["word"];

export const WRITE_FORMS = roster([
  ["member write", "an assignment of any operator to a property access; to an element access; ++ on such a target; -- on such a target; delete of such a target; such a target of a for-in; such a target of a for-of; such a target inside a destructuring assignment"],
  ["mutator member", "__defineGetter__, __defineSetter__, __proto__, assign, defineProperties, defineProperty, deleteProperty, set, setPrototypeOf; each read as a member name, as a string element key, as a destructured key, as a whole string literal"],
  ["reflection", "a free Reflect; a free Proxy; getOwnPropertyDescriptor, getOwnPropertyDescriptors, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf; each read as a mutator member is"],
  ["spy or mock member", "spyOn read any way but as the callee of an admitted spy; an admitted spy is a call of a property access .spyOn with two arguments: a free identifier then a string literal not beginning __vite; doMock, doUnmock, hoisted, mock, mockImplementation, mockImplementationOnce, mockRejectedValue, mockRejectedValueOnce, mockResolvedValue, mockResolvedValueOnce, mockReturnValue, mockReturnValueOnce, stubEnv, stubGlobal, unmock, withImplementation; each read as a mutator member is"],
  ["computed member", "an element access with a computed key; a string literal key is no computed key; a no-substitution template key is none; a numeric literal key is none; a computed key of an object binding pattern"],
] as const);
export type WriteForm = (typeof WRITE_FORMS)[number]["word"];

export const CHANNEL_ROOTS = roster([
  ["tier config", "the default test tier's one vitest config passes the landed census guard (censusGuard on the test tier) whose closed key lists refuse every key outside them; a resolver alias is refused (its landed row g-u62r5-alias); plugins are refused (its landed row g-u62r5-plugins); a refusal is a finding even when the guard names the config"],
  ["setup file", "every setup file that config's test.setupFiles names is a closure root; a setup file that is a carrier is a finding; a setup file reaching a carrier is a finding; a setup file that is a vitest module is a finding; a setup file that names no file is a finding; a setup file whose closure holds a load that does not resolve is a finding"],
  ["cited suite", "the suite's ROUTE_FORMS findings; its WRITE_FORMS findings; a sensitive builtin among its loads; the modules its loads reach are read by IMPORT"],
] as const);
export type ChannelRoot = (typeof CHANNEL_ROOTS)[number]["word"];

export const RUN_FORMS = roster([
  ["argv", "the census tier resolves (the shared resolveTier) to exactly vitest run --config <file>"],
  ["statements", "the config module holds only value import declarations of defineConfig from vitest/config, named and unaliased, and one default export"],
  ["default export", "the default export is a call of that defineConfig with one object literal argument"],
  ["plain keys", "every property of the config object is plain; every property of its test object is plain; a plain property has an identifier key with a value; a string key with a value is plain too; a spread is not plain; a computed key is not plain; a shorthand property is not plain; a method is not plain; an accessor is not plain; no key may appear twice"],
  ["top-level keys", "the object holds test and no other key"],
  ["test keys", "the test object holds allowOnly and include and no other key: dir, root, testNamePattern, passWithNoTests, exclude and every other key read as a break"],
  ["allowOnly", "allowOnly is the literal false"],
  ["include", "include is an array literal of string literals, one of whose globs matches the run pin: ** across directories, * within one, any other glob syntax unmatched"],
] as const);
export type RunForm = (typeof RUN_FORMS)[number]["word"];

export const C_FORMS = roster([
  ["walk", "every entry under src, in name order at each level: a directory is entered and every other entry is a file; a directory reached a second time by its real path reads as a break"],
  ["code", "a file whose name ends .ts, .tsx, .mts, .cts, .js, .jsx, .mjs or .cjs is parsed as TypeScript by its extension, and every string literal, no-substitution template, template head, middle and tail and JSX text is read for a tag, never a comment or a regular expression"],
  ["text", "any other file's whole text is read for a tag"],
] as const);
export type CForm = (typeof C_FORMS)[number]["word"];

export const RESIDUAL_FAMILIES = roster([
  ["R-PACKAGE-CODE", "a package module's own dynamic code is no route (typebox builds validators through new (globalThis.Function)(...)), so a package that reaches vitest only through dynamic code reads as a module"],
  ["R-HELPER-PATCH", "a local module the suite loads that patches a built-in at load while reaching no vitest module and holding no route reads as a module; the in-flight rewrite of a built-in is wb-tz2.3's R-RUNTIME family; the suite's own patch reads as a member write"],
] as const);

/** The header sections, in order, each with the roster its "- <word>: <claim>" lines equal. */
export const HEADER_SECTIONS: readonly (readonly [string, readonly Claim[]])[] = [
  ["RESOLUTION", RESOLUTION_FORMS],
  ["UNRESOLVED", UNRESOLVED_FORMS],
  ["EXPORT_TARGETS", EXPORT_TARGETS],
  ["IDENTITY", IDENTITY_KINDS],
  ["SCOPES", MODULE_SCOPES],
  ["LOADS", LOAD_FORMS],
  ["ROUTES", ROUTE_FORMS],
  ["WRITES", WRITE_FORMS],
  ["CHANNEL", CHANNEL_ROOTS],
  ["RUN", RUN_FORMS],
  ["C", C_FORMS],
  ["RESIDUALS", RESIDUAL_FAMILIES],
];

const words = <W extends string>(list: readonly Claim<W>[]): readonly W[] => list.map(entry => entry.word);
/** The relative candidates' extensions, in the order they are tried (the TypeScript source of a script path comes first). */
export const EXTENSIONS: readonly string[] = [".ts", ".tsx", ".mts", ".cts", ".d.ts", ".js", ".jsx", ".mjs", ".cjs", ".json"];
const TS_SOURCE: Readonly<Record<string, string>> = { ".js": ".ts", ".jsx": ".tsx", ".mjs": ".mts", ".cjs": ".cts" };
const CONDITIONS: readonly string[] = ["import", "module", "node", "default"];
const LOADER_NAMES: ReadonlySet<string> = new Set(["createRequire", "getBuiltinModule"]);
const LOADER_MEMBER_NAMES: ReadonlySet<string> = new Set(["binding", "dlopen", "_linkedBinding"]);
const SENSITIVE_BUILTINS: ReadonlySet<string> = new Set(["inspector", "module", "process", "repl", "vm"]);
const LOADER_MEMBERS: ReadonlySet<string> = new Set(["importActual", "importMock"]);
const VITE_PREFIX = "__vite";
const GLOBAL_OBJECTS: ReadonlySet<string> = new Set(["globalThis", "global", "self", "window", "process"]);
const CODE_NAMES: ReadonlySet<string> = new Set(["eval", "Function"]);
const MUTATORS: ReadonlySet<string> = new Set(["__defineGetter__", "__defineSetter__", "__proto__", "assign", "defineProperties", "defineProperty", "deleteProperty", "set", "setPrototypeOf"]);
const REFLECTION_GLOBALS: ReadonlySet<string> = new Set(["Reflect", "Proxy"]);
const REFLECTION_MEMBERS: ReadonlySet<string> = new Set(["getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "getOwnPropertyNames", "getOwnPropertySymbols", "getPrototypeOf"]);
const SPY_MEMBERS: ReadonlySet<string> = new Set([
  "doMock", "doUnmock", "hoisted", "mock", "mockImplementation", "mockImplementationOnce", "mockRejectedValue", "mockRejectedValueOnce", "mockResolvedValue",
  "mockResolvedValueOnce", "mockReturnValue", "mockReturnValueOnce", "stubEnv", "stubGlobal", "unmock", "withImplementation",
]);
const CODE_EXTENSIONS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS, ".mts": ts.ScriptKind.TS, ".cts": ts.ScriptKind.TS, ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS, ".mjs": ts.ScriptKind.JS, ".cjs": ts.ScriptKind.JS, ".jsx": ts.ScriptKind.JSX,
};
/** The representation tag C reads: hyperunix.result/<n>. */
export const REPRESENTATION_TAG = /hyperunix\.result\/\d+/g;

// ---- the host: files under the root, with planted texts laid over the disk -----------------------------------------------

export interface ModuleHost {
  /** The absolute root every path is relative to. */
  readonly root: string;
  /** A file's text, or undefined when the path names no file. */
  read(path: string): string | undefined;
  /** What a root-relative path names. */
  stat(path: string): "file" | "directory" | undefined;
  /** A directory's entry names, or undefined when the path names no directory. */
  list(path: string): readonly string[] | undefined;
  /** The real path (links followed, / separators) of a path that exists. */
  real(path: string): string;
}
const absolute = (root: string, path: string): string => (path === "" || path === "." ? root : join(root, path));
const toPosix = (path: string): string => path.split("\\").join("/");
type DiskKind = "file" | "directory" | "none";
const DISK_KIND = new Map<string, DiskKind>();
const DISK_TEXT = new Map<string, string | undefined>();
const DISK_LIST = new Map<string, readonly string[]>();
const DISK_REAL = new Map<string, string>();
function diskKind(path: string): DiskKind {
  let kind = DISK_KIND.get(path);
  if (kind === undefined) {
    try {
      const stats = statSync(path);
      kind = stats.isDirectory() ? "directory" : stats.isFile() ? "file" : "none";
    } catch {
      kind = "none";
    }
    DISK_KIND.set(path, kind);
  }
  return kind;
}
function diskText(path: string): string | undefined {
  if (!DISK_TEXT.has(path)) {
    let text: string | undefined;
    try {
      text = readFileSync(path, "utf8");
    } catch {
      text = undefined;
    }
    DISK_TEXT.set(path, text);
  }
  return DISK_TEXT.get(path);
}
function diskList(path: string): readonly string[] {
  let names = DISK_LIST.get(path);
  if (names === undefined) {
    names = readdirSync(path);
    DISK_LIST.set(path, names);
  }
  return names;
}
function diskReal(path: string): string {
  let real = DISK_REAL.get(path);
  if (real === undefined) {
    try {
      real = toPosix(realpathSync(path));
    } catch {
      real = toPosix(path);
    }
    DISK_REAL.set(path, real);
  }
  return real;
}
/**
 * The disk under `root`, with `planted` (root-relative path -> text) laid over it (a planted file exists, and its directories
 * too) and `links` (root-relative link path -> root-relative target) read as symbolic links: a path through a link reads its
 * target, and its real path is the target's.
 */
export function diskHost(root: string, planted: ReadonlyMap<string, string> = new Map(), links: ReadonlyMap<string, string> = new Map()): ModuleHost {
  const through = (path: string): string => {
    let current = path;
    for (let hop = 0; hop < 8; hop += 1) {
      const link = [...links.keys()].find(key => current === key || current.startsWith(`${key}/`));
      const target = link === undefined ? undefined : links.get(link);
      if (link === undefined || target === undefined) return current;
      current = normal(within(target, current.slice(link.length).replace(/^\//, "")));
    }
    return current;
  };
  const plantedDirectory = (path: string): boolean => {
    const prefix = path === "" || path === "." ? "" : `${path}/`;
    return [...planted.keys()].some(key => key.startsWith(prefix));
  };
  const onDisk = (path: string): "file" | "directory" | undefined => {
    const kind = diskKind(absolute(root, path));
    return kind === "none" ? undefined : kind;
  };
  const kindOf = (path: string): "file" | "directory" | undefined => (planted.has(path) ? "file" : (onDisk(path) ?? (plantedDirectory(path) ? "directory" : undefined)));
  return {
    root,
    read: path => {
      const mapped = through(path);
      const text = planted.get(path) ?? planted.get(mapped);
      if (text !== undefined) return text;
      return onDisk(mapped) === "file" ? diskText(absolute(root, mapped)) : undefined;
    },
    stat: path => (planted.has(path) ? "file" : kindOf(through(path))),
    list: path => {
      const mapped = through(path);
      if (kindOf(mapped) !== "directory") return undefined;
      const disk = onDisk(mapped) === "directory" ? diskList(absolute(root, mapped)) : [];
      const children = (directory: string): string[] => {
        const prefix = directory === "" || directory === "." ? "" : `${directory}/`;
        return [...planted.keys(), ...links.keys()].filter(key => key.startsWith(prefix)).map(key => key.slice(prefix.length).split("/")[0] ?? "");
      };
      return [...new Set([...disk, ...children(mapped), ...children(path)])].filter(name => name !== "").sort();
    },
    real: path => {
      const mapped = through(path);
      if (planted.has(path) || planted.has(mapped) || onDisk(mapped) === undefined) return toPosix(absolute(root, mapped));
      return diskReal(absolute(root, mapped));
    },
  };
}

// ---- parsed modules (cached by path and text) ----------------------------------------------------------------------------

const extensionOf = (path: string): string => {
  if (path.endsWith(".d.ts")) return ".ts";
  const base = posix.basename(path);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot);
};
/** The script kind a file parses as, or undefined for a file not parsed as code. */
export const scriptKindOf = (path: string): ts.ScriptKind | undefined => CODE_EXTENSIONS[extensionOf(path)];

interface Parsed {
  readonly source: ts.SourceFile;
  /** Whether an identifier binds to no declaration of its own file (a one-file program, no lib, no module resolution). */
  readonly free: (node: ts.Identifier) => boolean;
  /** Whether the file declares an identifier's name nowhere (the cheap reading used for package modules). */
  readonly undeclared: (node: ts.Identifier) => boolean;
}
const PARSED = new Map<string, Parsed>();
function parse(path: string, text: string, kind: ts.ScriptKind): Parsed {
  const key = `${path}\u0000${kind}\u0000${text}`;
  const cached = PARSED.get(key);
  if (cached !== undefined) return cached;
  const name = `/${path}`;
  const parsed = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
  let checker: ts.TypeChecker | undefined;
  let declared: ReadonlySet<string> | undefined;
  const host: ts.CompilerHost = {
    getSourceFile: file => (file === name ? parsed : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "/",
    getCanonicalFileName: file => file,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: file => file === name,
    readFile: file => (file === name ? text : undefined),
  };
  const free = (node: ts.Identifier): boolean => {
    checker ??= ts.createProgram({ rootNames: [name], options: { noLib: true, noResolve: true, types: [], allowJs: true }, host }).getTypeChecker();
    const parent = node.parent;
    const symbol = ts.isShorthandPropertyAssignment(parent) && parent.name === node ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(node);
    return symbol === undefined || (symbol.declarations ?? []).every(declaration => declaration.getSourceFile() !== parsed);
  };
  const undeclared = (node: ts.Identifier): boolean => {
    declared ??= declaredNames(parsed);
    return !declared.has(node.text);
  };
  const result: Parsed = { source: parsed, free, undeclared };
  PARSED.set(key, result);
  return result;
}
/** Every name a file declares anywhere (variables, parameters, functions, classes, imports, enums, namespaces, catch bindings). */
function declaredNames(source: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>();
  const bind = (name: ts.BindingName | undefined): void => {
    if (name === undefined) return;
    if (ts.isIdentifier(name)) names.add(name.text);
    else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bind(element.name);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) bind(node.name);
    else if ((ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node) || ts.isEnumDeclaration(node) ||
      ts.isImportClause(node) || ts.isImportSpecifier(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node)) && node.name !== undefined && ts.isIdentifier(node.name)) names.add(node.name.text);
    else if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name)) names.add(node.name.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return names;
}
const lineOf = (source: ts.SourceFile, node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
/** An expression through parentheses, as, satisfies, non-null and <T> assertions. */
function unwrap(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}
/** The node an expression stands in, climbing parentheses and assertions. */
function climb(node: ts.Node): ts.Node {
  let current = node;
  while (current.parent !== undefined && (ts.isParenthesizedExpression(current.parent) || ts.isAsExpression(current.parent) || ts.isSatisfiesExpression(current.parent) || ts.isNonNullExpression(current.parent) || ts.isTypeAssertionExpression(current.parent))) current = current.parent;
  return current;
}
const isStringKey = (node: ts.Node): node is ts.StringLiteralLike => ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node);
const literalKey = (node: ts.Expression): boolean => isStringKey(node) || ts.isNumericLiteral(node);
/** The name a property or element access reads, when its key is a name or a string literal. */
function accessName(node: ts.Node): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) {
    const key = unwrap(node.argumentExpression);
    return isStringKey(key) ? key.text : undefined;
  }
  return undefined;
}
/** Whether an identifier stands where a value is read (not a member name, a declared key, a label, a type or an import name). */
function isValueReference(node: ts.Identifier): boolean {
  const parent = node.parent;
  if ((ts.isPropertyAccessExpression(parent) && parent.name === node) || (ts.isQualifiedName(parent) && parent.right === node)) return false;
  if ((ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent) || ts.isMethodSignature(parent) ||
    ts.isGetAccessorDeclaration(parent) || ts.isSetAccessorDeclaration(parent) || ts.isEnumMember(parent)) && parent.name === node) return false;
  if (ts.isBindingElement(parent) && parent.propertyName === node) return false;
  if (ts.isTypeQueryNode(parent) || ts.isTypeReferenceNode(parent)) return false;
  if (ts.isLabeledStatement(parent) || ts.isBreakStatement(parent) || ts.isContinueStatement(parent) || ts.isJsxAttribute(parent) || ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
  if (ts.isExportSpecifier(parent)) return (parent.propertyName ?? parent.name) === node && parent.parent.parent.moduleSpecifier === undefined;
  return true;
}

// ---- resolution --------------------------------------------------------------------------------------------------------

export type Resolution =
  | { readonly kind: "builtin"; readonly form: "builtin"; readonly name: string }
  | { readonly kind: "file"; readonly form: ResolutionForm; readonly file: string; readonly home?: string }
  | { readonly kind: "unresolved"; readonly form: UnresolvedForm; readonly why: string };
export interface ResolveOptions {
  /** The resolution forms read (all by default); a specifier of another form reads as unresolved. */
  readonly forms?: readonly ResolutionForm[];
  /** The export-target forms read (all by default). */
  readonly targets?: readonly ExportTarget[];
}
const unresolved = (form: UnresolvedForm, why: string): Resolution => ({ kind: "unresolved", form, why });
const insideRoot = (path: string): boolean => path !== ".." && !path.startsWith("../") && !posix.isAbsolute(path);
const normal = (path: string): string => {
  const joined = posix.normalize(path);
  return joined === "." ? "" : joined.replace(/\/$/, "");
};
const within = (directory: string, path: string): string => normal(directory === "" ? path : `${directory}/${path}`);

/** The vitest home a file lives under, by its real path or its package's declared name, or undefined. */
export function vitestHome(host: ModuleHost, file: string): string | undefined {
  const byPath = (path: string): string | undefined => /(?:^|\/)node_modules\/(vitest|@vitest\/[^/]+)(?:\/|$)/.exec(path)?.[1];
  const real = host.real(file);
  const direct = byPath(file) ?? byPath(real);
  if (direct !== undefined) return direct;
  for (const path of [file, real]) {
    const at = path.lastIndexOf("node_modules/");
    if (at < 0) continue;
    const rest = path.slice(at + "node_modules/".length).split("/");
    const name = rest[0]?.startsWith("@") === true ? `${rest[0]}/${rest[1] ?? ""}` : rest[0];
    if (name === undefined || name === "") continue;
    const packageDir = path.slice(0, at + "node_modules/".length) + name;
    const manifest = path === real ? readOutside(packageDir) : host.read(`${packageDir}/package.json`);
    const declared = manifest === undefined ? undefined : manifestName(manifest);
    if (declared === "vitest" || declared?.startsWith("@vitest/") === true) return declared;
  }
  return undefined;
}
function readOutside(directory: string): string | undefined {
  try {
    return readFileSync(`${directory}/package.json`, "utf8");
  } catch {
    return undefined;
  }
}
function manifestName(text: string): string | undefined {
  try {
    const value: unknown = JSON.parse(text);
    return typeof value === "object" && value !== null && "name" in value && typeof value.name === "string" ? value.name : undefined;
  } catch {
    return undefined;
  }
}
function manifest(host: ModuleHost, directory: string): Record<string, unknown> | undefined {
  const text = host.read(within(directory, "package.json"));
  if (text === undefined) return undefined;
  try {
    const value: unknown = JSON.parse(text);
    return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
  } catch {
    return undefined;
  }
}

/** The one file a relative base path names, or why none does. */
function relativeFile(host: ModuleHost, base: string): string | Resolution {
  if (!insideRoot(base)) return unresolved("outside the root", `${base} leaves the root`);
  if (host.stat(base) === "file") return base;
  const candidates: string[] = [];
  const extension = extensionOf(base);
  const source = TS_SOURCE[extension];
  if (source !== undefined) candidates.push(base.slice(0, -extension.length) + source);
  for (const added of EXTENSIONS) candidates.push(base + added);
  if (host.stat(base) === "directory") {
    if (host.stat(within(base, "package.json")) === "file") return unresolved("directory package", `${base} is a directory holding a package.json`);
    for (const added of EXTENSIONS) candidates.push(within(base, `index${added}`));
  }
  const found = candidates.filter(candidate => host.stat(candidate) === "file");
  const [one] = found;
  if (one === undefined) return unresolved("no file", `${base} names no file`);
  if (found.length > 1) return unresolved("ambiguous", `${base} names ${found.length} files (${found.join(", ")})`);
  return one;
}
/** A target of an exports or imports map for a subpath, read with the export-target forms. */
function mapTarget(value: unknown, star: string | undefined, targets: ReadonlySet<ExportTarget>): string | undefined {
  if (typeof value === "string") return targets.has("string") ? (star === undefined ? value : value.split("*").join(star)) : undefined;
  if (Array.isArray(value)) {
    if (!targets.has("array")) return undefined;
    for (const entry of value) {
      const found = mapTarget(entry, star, targets);
      if (found !== undefined) return found;
    }
    return undefined;
  }
  if (typeof value === "object" && value !== null && targets.has("conditions")) {
    for (const [key, entry] of Object.entries(value)) {
      if (!CONDITIONS.includes(key)) continue;
      const found = mapTarget(entry, star, targets);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}
function mapEntry(map: unknown, subpath: string, targets: ReadonlySet<ExportTarget>, imports: boolean): string | undefined {
  const keyed = typeof map === "object" && map !== null && !Array.isArray(map) && Object.keys(map).some(key => key.startsWith(imports ? "#" : "."));
  if (!keyed) return !imports && targets.has("sugar") && subpath === "." ? mapTarget(map, undefined, targets) : undefined;
  const entries = Object.entries(map as Record<string, unknown>);
  if (targets.has("exact key")) {
    const exact = entries.find(([key]) => key === subpath);
    if (exact !== undefined) return mapTarget(exact[1], undefined, targets);
  }
  if (!targets.has("pattern key")) return undefined;
  let best: { readonly prefix: string; readonly value: unknown; readonly star: string } | undefined;
  for (const [key, value] of entries) {
    const at = key.indexOf("*");
    if (at < 0 || key.indexOf("*", at + 1) >= 0) continue;
    const prefix = key.slice(0, at);
    const suffix = key.slice(at + 1);
    if (!subpath.startsWith(prefix) || !subpath.endsWith(suffix) || subpath.length < key.length - 1) continue;
    if (best === undefined || prefix.length > best.prefix.length) best = { prefix, value, star: subpath.slice(prefix.length, subpath.length - suffix.length) };
  }
  return best === undefined ? undefined : mapTarget(best.value, best.star, targets);
}
function packageTarget(host: ModuleHost, directory: string, target: string, form: ResolutionForm, options: ResolveOptions, depth: number): Resolution {
  if (!target.startsWith("./")) return resolveFrom(host, within(directory, "package.json"), target, options, depth + 1);
  const file = within(directory, target);
  if (!insideRoot(file) || !file.startsWith(directory === "" ? "" : `${directory}/`)) return unresolved("outside the root", `the target ${target} leaves ${directory || "the root"}`);
  return host.stat(file) === "file" ? { kind: "file", form, file } : unresolved("no export", `the target ${target} of ${directory || "the root"} names no file`);
}

/** Resolves `specifier` as the module at root-relative `from` loads it, with the forms read (all by default). */
export function resolveSpecifier(host: ModuleHost, from: string, specifier: string, options: ResolveOptions = {}): Resolution {
  return resolveFrom(host, from, specifier, options, 0);
}
function resolveFrom(host: ModuleHost, from: string, specifier: string, options: ResolveOptions, depth: number): Resolution {
  const forms = new Set<ResolutionForm>(options.forms ?? words(RESOLUTION_FORMS));
  const targets = new Set<ExportTarget>(options.targets ?? words(EXPORT_TARGETS));
  if (depth > 8) return unresolved("no export", `${specifier} resolves through more than eight package hops`);
  if (specifier === "") return unresolved("empty", "an empty specifier");
  if (specifier.includes("?") || specifier.indexOf("#", 1) > 0) return unresolved("query", `${specifier} holds a query or hash suffix`);
  if (specifier.startsWith("/")) return unresolved("absolute path", `${specifier} is an absolute path`);
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(specifier) && !specifier.startsWith("node:")) return unresolved("url scheme", `${specifier} opens with a URL scheme`);
  const directory = posix.dirname(from) === "." ? "" : posix.dirname(from);
  if (specifier.startsWith("node:") || isBuiltin(specifier)) {
    return forms.has("builtin") ? { kind: "builtin", form: "builtin", name: specifier } : unresolved("no package", `${specifier} is a builtin, a form not read`);
  }
  if (specifier === "." || specifier === ".." || specifier.startsWith("./") || specifier.startsWith("../")) {
    if (!forms.has("relative")) return unresolved("no file", `${specifier} is a relative path, a form not read`);
    const file = relativeFile(host, within(directory, specifier));
    if (typeof file !== "string") return file;
    const home = vitestHome(host, file);
    return { kind: "file", form: "relative", file, ...(home === undefined ? {} : { home }) };
  }
  if (specifier.startsWith("#")) {
    if (!forms.has("package imports")) return unresolved("no imports map", `${specifier} is a package imports specifier, a form not read`);
    for (let at = directory; ; at = posix.dirname(at) === "." ? "" : posix.dirname(at)) {
      const found = manifest(host, at);
      if (found !== undefined && "imports" in found) {
        const target = mapEntry(found.imports, specifier, targets, true);
        if (target === undefined) return unresolved("no export", `the imports map of ${within(at, "package.json")} holds no target for ${specifier}`);
        const resolved = packageTarget(host, at, target, "package imports", options, depth);
        return resolved.kind === "file" ? { ...resolved, form: "package imports" } : resolved;
      }
      if (at === "") break;
    }
    return unresolved("no imports map", `no package.json up to the root holds an imports map for ${specifier}`);
  }
  if (!forms.has("package")) return unresolved("no package", `${specifier} is a bare specifier, a form not read`);
  const parts = specifier.split("/");
  const name = specifier.startsWith("@") ? parts.slice(0, 2).join("/") : (parts[0] ?? "");
  const subpath = `.${specifier.slice(name.length)}`;
  if (name === "" || (specifier.startsWith("@") && parts.length < 2)) return unresolved("no package", `${specifier} names no package`);
  for (let at = directory; ; at = posix.dirname(at) === "." ? "" : posix.dirname(at)) {
    if (posix.basename(at) !== "node_modules") {
      const packageDir = within(at, `node_modules/${name}`);
      if (host.stat(packageDir) === "directory") {
        const home = vitestHome(host, packageDir);
        if (home !== undefined) return { kind: "file", form: "package", file: packageDir, home };
        const found = manifest(host, packageDir) ?? {};
        if ("exports" in found && found.exports !== undefined) {
          const target = mapEntry(found.exports, subpath, targets, false);
          return target === undefined ? unresolved("no export", `the exports of ${packageDir} hold no target for ${subpath}`) : packageTarget(host, packageDir, target, "package", options, depth);
        }
        if (subpath !== ".") {
          const file = relativeFile(host, within(packageDir, subpath));
          return typeof file === "string" ? { kind: "file", form: "package", file } : file;
        }
        const entry = [found.module, found.main].find((value): value is string => typeof value === "string") ?? "index.js";
        const file = relativeFile(host, within(packageDir, entry));
        return typeof file === "string" ? { kind: "file", form: "package", file } : file;
      }
    }
    if (at === "") break;
  }
  return unresolved("no package", `no node_modules/${name} directory from ${directory || "the root"} up to the root`);
}

// ---- loads, routes and writes of one module --------------------------------------------------------------------------------

export interface Load {
  readonly form: LoadForm;
  readonly specifier: string;
  readonly line: number;
}
export interface Finding {
  readonly form: string;
  readonly what: string;
  readonly line: number;
}
export const scopeOf = (host: ModuleHost, file: string, suite: string): ModuleScope =>
  file === suite ? "suite" : /(?:^|\/)node_modules\//.test(file) || /(?:^|\/)node_modules\//.test(host.real(file)) ? "package" : "local";

const LOADS = new Map<string, { readonly text: string; readonly found: Load[] }>();
const ROUTES = new Map<string, { readonly text: string; readonly found: Finding[] }>();
function cached<T>(cache: Map<string, { readonly text: string; readonly found: T }>, key: string, text: string, compute: () => T): T {
  const hit = cache.get(key);
  if (hit !== undefined && hit.text === text) return hit.found;
  const found = compute();
  cache.set(key, { text, found });
  return found;
}
/** Every load a module's text spells, in source order (a file not parsed as code loads nothing). */
export function loadsOf(path: string, text: string, forms: readonly LoadForm[] = words(LOAD_FORMS)): Load[] {
  return cached(LOADS, `${path}\u0000${forms.join("|")}`, text, () => readLoads(path, text, forms));
}
function readLoads(path: string, text: string, forms: readonly LoadForm[]): Load[] {
  const kind = scriptKindOf(path);
  if (kind === undefined) return [];
  const { source } = parse(path, text, kind);
  const read = new Set(forms);
  const found: Load[] = [];
  const add = (form: LoadForm, node: ts.Node | undefined): void => {
    if (node !== undefined && isStringKey(node) && read.has(form)) found.push({ form, specifier: node.text, line: lineOf(source, node) });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) add("import declaration", node.moduleSpecifier);
    else if (ts.isExportDeclaration(node)) add("export declaration", node.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) add("import-equals", node.moduleReference.expression);
    else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) add("import type", node.argument.literal);
    else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) add("dynamic import", node.arguments[0]);
    else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require") add("require call", node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

/** The spy the cited suite may hold: <base>.spyOn(<free identifier>, <string literal not beginning __vite>), the callee a property access. */
function admittedSpy(call: ts.Node | undefined, parsed: Parsed): boolean {
  if (call === undefined || !ts.isCallExpression(call) || call.arguments.length !== 2) return false;
  const callee = unwrap(call.expression);
  if (!ts.isPropertyAccessExpression(callee) || callee.name.text !== "spyOn") return false;
  const [target, key] = call.arguments;
  if (target === undefined || key === undefined) return false;
  const base = unwrap(target);
  return ts.isIdentifier(base) && parsed.free(base) && isStringKey(unwrap(key)) && !(unwrap(key) as ts.StringLiteralLike).text.startsWith(VITE_PREFIX);
}

/** Whether a resolved load names a sensitive builtin (ROUTE_FORMS sensitive builtin). */
const sensitiveBuiltin = (resolution: Resolution): boolean => resolution.kind === "builtin" && SENSITIVE_BUILTINS.has(resolution.name.replace(/^node:/, "").split("/")[0] ?? "");

/** Every route a module's text holds in its scope, in source order (sensitive builtins are read by the closure, from the loads). */
export function routesOf(path: string, text: string, scope: ModuleScope, forms: readonly RouteForm[] = words(ROUTE_FORMS)): Finding[] {
  return cached(ROUTES, `${path}\u0000${scope}\u0000${forms.join("|")}`, text, () => readRoutes(path, text, scope, forms));
}
function readRoutes(path: string, text: string, scope: ModuleScope, forms: readonly RouteForm[]): Finding[] {
  const kind = scriptKindOf(path);
  if (kind === undefined) return [];
  const parsed = parse(path, text, kind);
  const { source } = parsed;
  const read = new Set(forms);
  const found: Finding[] = [];
  const add = (form: RouteForm, what: string, node: ts.Node): void => {
    if (read.has(form)) found.push({ form, what, line: lineOf(source, node) });
  };
  const near = scope !== "package";
  const isFree = (node: ts.Identifier): boolean => (near ? parsed.free(node) : parsed.undeclared(node));
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      const [first] = node.arguments;
      if (first === undefined || !isStringKey(first)) add("dynamic load", `${node.expression.kind === ts.SyntaxKind.ImportKeyword ? "import()" : "require()"} of ${first === undefined ? "nothing" : `a ${ts.SyntaxKind[first.kind]}`}`, node);
    }
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      const name = node.text;
      if (LOADER_NAMES.has(name)) add("loader name", name, node);
      if (LOADER_MEMBER_NAMES.has(name) && ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) add("loader name", `.${name}`, node);
      if (name === "require" && ts.isIdentifier(node) && isValueReference(node)) {
        const parent = node.parent;
        if (!(ts.isCallExpression(parent) && parent.expression === node)) add("loader name", "require, not called", node);
      }
      if (LOADER_MEMBERS.has(name)) add("loader member", ts.isPropertyAccessExpression(node.parent) && node.parent.name === node ? `.${name}` : name, node);
      if (name.startsWith(VITE_PREFIX)) add("vite name", name, node);
    }
    if (isStringKey(node)) {
      const keyed = ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
      if (LOADER_NAMES.has(node.text) || (keyed && LOADER_MEMBER_NAMES.has(node.text))) add("loader name", `'${node.text}'`, node);
      if (LOADER_MEMBERS.has(node.text)) add("loader member", keyed ? `['${node.text}']` : `'${node.text}'`, node);
    }
    if ((isStringKey(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && node.text.startsWith(VITE_PREFIX)) add("vite name", `'${node.text}'`, node);
    if (ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword) {
      const parent = node.parent;
      const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : undefined;
      if (member !== "url") add("import meta", `import.meta${member === undefined ? "" : `.${member}`}`, node);
    }
    if (ts.isIdentifier(node) && isValueReference(node)) {
      if (GLOBAL_OBJECTS.has(node.text) && isFree(node)) {
        const outer = climb(node);
        const parent = outer.parent;
        const member = (ts.isPropertyAccessExpression(parent) && parent.expression === outer) || (ts.isElementAccessExpression(parent) && parent.expression === outer && literalKey(unwrap(parent.argumentExpression)))
          ? (accessName(parent) ?? "<number>") : undefined;
        const spied = scope === "suite" && ts.isCallExpression(parent) && parent.arguments[0] === outer && admittedSpy(parent, parsed);
        const typed = ts.isTypeOfExpression(parent);
        if ((member === undefined || GLOBAL_OBJECTS.has(member) || LOADER_NAMES.has(member) || LOADER_MEMBER_NAMES.has(member)) && !spied && !typed) {
          add("global object", member === undefined ? `${node.text} as a ${ts.SyntaxKind[parent.kind]}` : `${node.text}.${member}`, node);
        }
        if (near && member !== undefined && CODE_NAMES.has(member)) add("dynamic code", `${node.text}.${member}`, node);
      }
      if (near && CODE_NAMES.has(node.text) && parsed.free(node)) add("dynamic code", node.text, node);
    }
    if (near && accessName(node) === "constructor") add("dynamic code", ".constructor", node);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

/** A member target as a finding names it: .name, ['key'], [n] or [<computed>]. */
function memberLabel(node: ts.Expression): string {
  const target = unwrap(node);
  if (ts.isPropertyAccessExpression(target)) return `.${target.name.text}`;
  if (ts.isElementAccessExpression(target)) {
    const key = unwrap(target.argumentExpression);
    return isStringKey(key) ? `['${key.text}']` : ts.isNumericLiteral(key) ? `[${key.text}]` : "[<computed>]";
  }
  return "<member>";
}
/** Whether an expression is a member target (a property or element access, through parentheses and assertions). */
const isMemberTarget = (node: ts.Expression): boolean => {
  const target = unwrap(node);
  return ts.isPropertyAccessExpression(target) || ts.isElementAccessExpression(target);
};
/** The member targets inside a destructuring-assignment pattern, nested patterns, defaults, spreads and rests included. */
function patternTargets(node: ts.Expression): ts.Expression[] {
  const target = unwrap(node);
  if (ts.isArrayLiteralExpression(target)) return target.elements.flatMap(element => patternTargets(ts.isSpreadElement(element) ? element.expression : element));
  if (ts.isObjectLiteralExpression(target)) {
    return target.properties.flatMap(property => {
      if (ts.isPropertyAssignment(property)) return patternTargets(property.initializer);
      if (ts.isSpreadAssignment(property)) return patternTargets(property.expression);
      return [];
    });
  }
  if (ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.EqualsToken) return patternTargets(target.left);
  return isMemberTarget(target) ? [target] : [];
}
const isAssignment = (kind: ts.SyntaxKind): boolean => kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;

/** Every write the cited suite's text holds, in source order. */
export function writesOf(path: string, text: string, forms: readonly WriteForm[] = words(WRITE_FORMS)): Finding[] {
  const kind = scriptKindOf(path) ?? ts.ScriptKind.TS;
  const parsed = parse(path, text, kind);
  const { source } = parsed;
  const read = new Set(forms);
  const found: Finding[] = [];
  const add = (form: WriteForm, what: string, node: ts.Node): void => {
    if (read.has(form)) found.push({ form, what, line: lineOf(source, node) });
  };
  const named = (name: string, what: string, node: ts.Node, spy: boolean): void => {
    if (MUTATORS.has(name)) add("mutator member", what, node);
    if (REFLECTION_MEMBERS.has(name)) add("reflection", what, node);
    if (SPY_MEMBERS.has(name) || (name === "spyOn" && !spy)) add("spy or mock member", what, node);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node) && isAssignment(node.operatorToken.kind)) {
      const targets = node.operatorToken.kind === ts.SyntaxKind.EqualsToken && (ts.isObjectLiteralExpression(unwrap(node.left)) || ts.isArrayLiteralExpression(unwrap(node.left))) ? patternTargets(node.left) : isMemberTarget(node.left) ? [node.left] : [];
      for (const target of targets) add("member write", `${memberLabel(target)} by ${node.operatorToken.getText(source)}`, target);
    }
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) && isMemberTarget(node.operand)) {
      add("member write", `${memberLabel(node.operand)} by ${node.operator === ts.SyntaxKind.PlusPlusToken ? "++" : "--"}`, node);
    }
    if (ts.isDeleteExpression(node)) add("member write", `${memberLabel(node.expression)} by delete`, node);
    if ((ts.isForInStatement(node) || ts.isForOfStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) {
      for (const target of patternTargets(node.initializer)) add("member write", `${memberLabel(target)} by ${ts.isForInStatement(node) ? "for-in" : "for-of"}`, target);
    }
    if (ts.isPropertyAccessExpression(node)) named(node.name.text, `.${node.name.text}`, node, admittedSpy(node.parent, parsed) && ts.isCallExpression(node.parent) && node.parent.expression === node);
    if (ts.isElementAccessExpression(node)) {
      const key = unwrap(node.argumentExpression);
      if (isStringKey(key)) named(key.text, `['${key.text}']`, node, false);
      else if (!ts.isNumericLiteral(key)) add("computed member", `${node.getText(source).slice(0, 60)}`, node);
    }
    if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      if (ts.isIdentifier(key) || isStringKey(key)) named(key.text, `{${key.text}} destructured`, node, false);
      else if (ts.isComputedPropertyName(key)) add("computed member", `[${key.expression.getText(source).slice(0, 60)}] destructured`, node);
    }
    if (isStringKey(node) && !ts.isElementAccessExpression(node.parent) && (MUTATORS.has(node.text) || REFLECTION_MEMBERS.has(node.text) || SPY_MEMBERS.has(node.text) || node.text === "spyOn")) {
      named(node.text, `'${node.text}'`, node, false);
    }
    if (ts.isIdentifier(node) && REFLECTION_GLOBALS.has(node.text) && isValueReference(node) && parsed.free(node)) add("reflection", node.text, node);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

// ---- identity over a closure ---------------------------------------------------------------------------------------------

export interface Identity {
  readonly kind: IdentityKind;
  /** For a carrier, how it reaches vitest (a load or a route); for an unresolved closure, why. */
  readonly why: string;
  /** A load somewhere in the closure that does not resolve, or undefined. */
  readonly broken?: string;
}
export interface ReadOptions extends ResolveOptions {
  readonly loads?: readonly LoadForm[];
  readonly routes?: readonly RouteForm[];
  readonly writes?: readonly WriteForm[];
  readonly kinds?: readonly IdentityKind[];
}
const routeRead = (options: ReadOptions, form: RouteForm): boolean => (options.routes ?? words(ROUTE_FORMS)).includes(form);
/** Reads module identities over one host; each module is read once. */
export class ClosureReader {
  private readonly memo = new Map<string, Identity>();
  private readonly active = new Set<string>();
  private readonly resolved = new Map<string, Resolution>();
  private readonly homes = new Map<string, string | undefined>();
  constructor(
    readonly host: ModuleHost,
    readonly suite: string,
    readonly options: ReadOptions = {},
  ) {}
  /** resolveSpecifier, cached per importing directory and specifier. */
  resolve(from: string, specifier: string): Resolution {
    const directory = posix.dirname(from);
    const key = `${directory}\u0000${specifier}`;
    let resolution = this.resolved.get(key);
    if (resolution === undefined) {
      resolution = resolveSpecifier(this.host, from, specifier, this.options);
      this.resolved.set(key, resolution);
    }
    return resolution;
  }
  private home(file: string): string | undefined {
    if (!this.homes.has(file)) this.homes.set(file, vitestHome(this.host, file));
    return this.homes.get(file);
  }
  /** The identity of what a resolution names. */
  identity(resolution: Resolution): Identity {
    if (resolution.kind === "unresolved") return { kind: "module", why: "", broken: resolution.why };
    const kinds = new Set(this.options.kinds ?? words(IDENTITY_KINDS));
    if (resolution.kind === "builtin") return kinds.has("builtin") ? { kind: "builtin", why: "" } : { kind: "module", why: "" };
    if (resolution.home !== undefined && kinds.has("vitest")) return { kind: "vitest", why: resolution.home };
    return this.module(resolution.file);
  }
  /** The identity of a resolved module file. */
  module(file: string): Identity {
    const kinds = new Set(this.options.kinds ?? words(IDENTITY_KINDS));
    const home = this.home(file);
    if (home !== undefined && kinds.has("vitest")) return { kind: "vitest", why: home };
    const cached = this.memo.get(file);
    if (cached !== undefined) return cached;
    if (this.active.has(file)) return { kind: "module", why: "" };
    this.active.add(file);
    const result = this.read(file, kinds);
    this.active.delete(file);
    this.memo.set(file, result);
    return result;
  }
  private read(file: string, kinds: ReadonlySet<IdentityKind>): Identity {
    const text = this.host.read(file) ?? "";
    const scope = scopeOf(this.host, file, this.suite);
    let broken: string | undefined;
    let reach: string | undefined;
    for (const load of loadsOf(file, text, this.options.loads)) {
      const resolution = this.resolve(file, load.specifier);
      const identity = this.identity(resolution);
      broken ??= identity.broken === undefined ? undefined : `${file}:${load.line} loads '${load.specifier}': ${identity.broken}`;
      if (reach === undefined && (identity.kind === "vitest" || identity.kind === "carrier")) reach = `${file}:${load.line} loads '${load.specifier}' (${identity.kind}${identity.why === "" ? "" : ` ${identity.why}`})`;
      if (reach === undefined && scope !== "suite" && sensitiveBuiltin(resolution) && routeRead(this.options, "sensitive builtin")) reach = `${file}:${load.line} holds a sensitive builtin route (loads '${load.specifier}')`;
    }
    if (reach === undefined && scope !== "suite") {
      const [route] = routesOf(file, text, scope, this.options.routes);
      if (route !== undefined) reach = `${file}:${route.line} holds a ${route.form} route (${route.what})`;
    }
    const result = reach !== undefined && kinds.has("carrier") ? { kind: "carrier" as const, why: reach } : { kind: "module" as const, why: "" };
    return broken === undefined ? result : { ...result, broken };
  }
}

// ---- the readings wb-tz2.3's census restates over -----------------------------------------------------------------------

export interface ListedLoad extends Load {
  readonly resolution: Resolution;
  readonly identity: Identity;
}
export interface ImportReading {
  /** Each load of the suite as written, in source order, with its resolution and identity. */
  readonly listing: readonly string[];
  /** The loads that resolve to a vitest module or a carrier. */
  readonly vitest: readonly ListedLoad[];
  /** The reading: sound (IMPORT ...) or a break (IMPORT <why>). */
  readonly section: string;
}
/** A resolution as the listing reads it. */
export const resolutionText = (resolution: Resolution): string =>
  resolution.kind === "builtin" ? "builtin" : resolution.kind === "file" ? `${resolution.form} ${resolution.file}` : `unresolved (${resolution.form}: ${resolution.why})`;
/** An identity as the listing reads it. */
export const identityText = (identity: Identity): string => (identity.kind === "carrier" || identity.kind === "vitest" ? `${identity.kind} (${identity.why})` : identity.kind);
/** IMPORT by resolution: every load of the suite resolved, and exactly one, an import declaration, reaching vitest. */
export function importReading(host: ModuleHost, suite: string, options: ReadOptions = {}): ImportReading {
  const text = host.read(suite);
  if (text === undefined) return { listing: [], vitest: [], section: `IMPORT <no file ${suite}>` };
  const reader = new ClosureReader(host, suite, options);
  const listed: ListedLoad[] = loadsOf(suite, text, options.loads).map(load => {
    const resolution = reader.resolve(suite, load.specifier);
    return { ...load, resolution, identity: reader.identity(resolution) };
  });
  const listing = listed.map(load => `${load.form} '${load.specifier}' at line ${load.line} -> ${resolutionText(load.resolution)} -> ${identityText(load.identity)}`);
  const vitest = listed.filter(load => load.identity.kind === "vitest" || load.identity.kind === "carrier");
  const broken = listed.find(load => load.identity.broken !== undefined || load.resolution.kind === "unresolved");
  const [one] = vitest;
  const section = broken !== undefined
    ? `IMPORT <a load does not resolve: ${broken.resolution.kind === "unresolved" ? `'${broken.specifier}' at line ${broken.line}: ${broken.resolution.why}` : broken.identity.broken ?? ""}>`
    : vitest.length !== 1 || one === undefined
      ? `IMPORT <${vitest.length} loads resolve to a vitest module or a carrier${vitest.length === 0 ? "" : `: ${vitest.map(load => `${load.form} '${load.specifier}' at line ${load.line} (${identityText(load.identity)})`).join(", ")}`}>`
      : one.form !== "import declaration"
        ? `IMPORT <the one load reaching vitest is a ${one.form}, not an import declaration: '${one.specifier}' at line ${one.line}>`
        : `IMPORT by resolution: the one load reaching vitest is the import declaration '${one.specifier}' at line ${one.line} (${identityText(one.identity)}); every other load resolves to a builtin or a module; loads: ${listing.join("; ")}`;
  return { listing, vitest, section };
}

/** The setup files the default tier's vouched config names (censusGuard by default), or why they cannot be read. */
/** The guard setupFiles consults for the default test tier (censusGuard unless one is injected). */
export type GuardOf = (root: string, tier: string) => { readonly ok: boolean; readonly config?: string; readonly why: string };
export function setupFiles(root: string, guardOf: GuardOf = censusGuard): { readonly files: readonly string[] } | { readonly why: string } {
  const guard = guardOf(root, "test");
  if (!guard.ok || guard.config === undefined) return { why: guard.why };
  const config = guard.config;
  const text = readFileSync(config, "utf8");
  const source = ts.createSourceFile(config, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const files: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || isStringKey(node.name)) && node.name.text === "setupFiles") {
      const value = unwrap(node.initializer);
      if (isStringKey(value)) files.push(value.text);
      else if (ts.isArrayLiteralExpression(value)) for (const element of value.elements) if (isStringKey(element)) files.push(element.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  const directory = posix.dirname(toPosix(config).slice(toPosix(root).length + 1));
  return { files: files.map(file => within(directory === "." ? "" : directory, file)) };
}

/** What reaches the registration of the suite's cases (CHANNEL_ROOTS): each finding is a break, none is sound. */
export function channelReading(
  host: ModuleHost,
  suite: string,
  options: ReadOptions & { readonly roots?: readonly ChannelRoot[]; readonly setup?: readonly string[] | string; readonly guard?: GuardOf } = {},
): string[] {
  const roots = new Set(options.roots ?? words(CHANNEL_ROOTS));
  const findings: string[] = [];
  if (roots.has("tier config") || roots.has("setup file")) {
    const setup = options.setup ?? (() => {
      const read = setupFiles(host.root, options.guard);
      return "why" in read ? read.why : read.files;
    })();
    if (typeof setup === "string") {
      if (roots.has("tier config")) findings.push(`tier config: ${setup}`);
    } else if (roots.has("setup file")) {
      const reader = new ClosureReader(host, suite, options);
      for (const file of setup) {
        const identity = host.stat(file) === "file" ? reader.module(file) : { kind: "module" as const, why: "", broken: `${file} names no file` };
        if (identity.broken !== undefined) findings.push(`setup file ${file}: a load does not resolve: ${identity.broken}`);
        else if (identity.kind === "vitest" || identity.kind === "carrier") findings.push(`setup file ${file}: ${identityText(identity)}`);
      }
    }
  }
  if (roots.has("cited suite")) {
    const text = host.read(suite) ?? "";
    if (routeRead(options, "sensitive builtin")) {
      for (const load of loadsOf(suite, text, options.loads)) {
        if (sensitiveBuiltin(resolveSpecifier(host, suite, load.specifier, options))) findings.push(`cited suite: sensitive builtin '${load.specifier}' at line ${load.line}`);
      }
    }
    for (const route of routesOf(suite, text, "suite", options.routes)) findings.push(`cited suite: ${route.form} ${route.what} at line ${route.line}`);
    for (const write of writesOf(suite, text, options.writes)) findings.push(`cited suite: ${write.form} ${write.what} at line ${write.line}`);
  }
  return findings;
}

// ---- RUN: the census tier collects the run pin, read against closed key lists -------------------------------------------

/** A config glob as a whole-path pattern: ** across directories, * within one; any other glob syntax reads as unmatched. */
export function globMatches(glob: string, path: string): boolean {
  if (/[?[\]{}!]/.test(glob)) return false;
  const parts = glob.split("/");
  const pattern = parts.map((part, index) => {
    if (part === "**") return "(?:[^/]+/)*";
    const escaped = part.replace(/[.+^$()|\\]/g, "\\$&").replace(/\*/g, "[^/]*");
    return index === parts.length - 1 ? escaped : `${escaped}/`;
  }).join("");
  return new RegExp(`^${pattern}$`).test(path);
}
/** An object literal's plain properties by key, or why it holds another form. */
function plainProperties(literal: ts.ObjectLiteralExpression, where: string): Map<string, ts.Expression> | string {
  const keys = new Map<string, ts.Expression>();
  for (const property of literal.properties) {
    if (ts.isSpreadAssignment(property)) return `${where} spreads a value`;
    if (!ts.isPropertyAssignment(property)) return `${where} holds a ${ts.isShorthandPropertyAssignment(property) ? "shorthand property" : "method or accessor"}`;
    if (!ts.isIdentifier(property.name) && !isStringKey(property.name)) return `${where} holds a ${ts.isComputedPropertyName(property.name) ? "computed" : "non-plain"} key`;
    if (keys.has(property.name.text)) return `${where} holds the key ${property.name.text} twice`;
    keys.set(property.name.text, property.initializer);
  }
  return keys;
}
/** How the census tier collects the run pin (RUN_FORMS), or the first form outside the pinned set. */
export function runReading(runPin: string, argv: readonly string[] | string, readConfig: (file: string) => string | undefined, forms: readonly RunForm[] = words(RUN_FORMS)): string {
  const read = new Set(forms);
  const broken = (why: string): string => `<${why}>`;
  if (typeof argv === "string") return broken(`the census tier does not resolve: ${argv}`);
  const [verb, flag, file, ...rest] = argv;
  if (read.has("argv") && (verb !== "run" || flag !== "--config" || file === undefined || rest.length > 0)) return broken(`the census tier runs vitest ${argv.join(" ")}`);
  if (file === undefined) return broken("the census tier names no config");
  const text = readConfig(file);
  if (text === undefined) return broken(`no ${file}`);
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const imported = new Set<string>();
  const defaults: ts.ExportAssignment[] = [];
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement) && statement.isExportEquals !== true) {
      defaults.push(statement);
      continue;
    }
    const clause = ts.isImportDeclaration(statement) ? statement.importClause : undefined;
    const named = clause?.namedBindings;
    const plain = ts.isImportDeclaration(statement) && isStringKey(statement.moduleSpecifier) && statement.moduleSpecifier.text === "vitest/config" && clause !== undefined &&
      clause.phaseModifier !== ts.SyntaxKind.TypeKeyword && clause.name === undefined && named !== undefined && ts.isNamedImports(named) &&
      named.elements.every(element => !element.isTypeOnly && element.propertyName === undefined && element.name.text === "defineConfig");
    if (plain && named !== undefined && ts.isNamedImports(named)) {
      for (const element of named.elements) imported.add(element.name.text);
      continue;
    }
    if (read.has("statements")) return broken(`${file}: a statement other than the defineConfig import and the default export at line ${lineOf(source, statement)}`);
  }
  const [exported] = defaults;
  if (exported === undefined || defaults.length !== 1) return broken(`${file}: ${defaults.length} default exports`);
  const call = unwrap(exported.expression);
  const [argument] = ts.isCallExpression(call) ? call.arguments : [];
  const callee = ts.isCallExpression(call) ? unwrap(call.expression) : undefined;
  const config = ts.isCallExpression(call) ? (argument === undefined ? undefined : unwrap(argument)) : call;
  if (read.has("default export") && (!ts.isCallExpression(call) || call.arguments.length !== 1 || config === undefined || !ts.isObjectLiteralExpression(config) || callee === undefined || !ts.isIdentifier(callee) || !imported.has(callee.text))) {
    return broken(`${file}: the default export is not a call of the imported defineConfig with one object literal`);
  }
  if (config === undefined || !ts.isObjectLiteralExpression(config)) return broken(`${file}: the default export holds no object literal`);
  const top = plainProperties(config, `${file}'s config`);
  if (typeof top === "string") {
    if (read.has("plain keys")) return broken(top);
    return broken(`${file}: the config is not read`);
  }
  const outsideTop = [...top.keys()].filter(key => key !== "test");
  if (read.has("top-level keys") && outsideTop.length > 0) return broken(`${file}: the config sets the top-level ${outsideTop.length === 1 ? "key" : "keys"} ${outsideTop.join(", ")}`);
  const testValue = top.get("test");
  const test = testValue === undefined ? undefined : unwrap(testValue);
  if (test === undefined || !ts.isObjectLiteralExpression(test)) return broken(`${file}: the config holds no test object literal`);
  const keys = plainProperties(test, `${file}'s test object`);
  if (typeof keys === "string") {
    if (read.has("plain keys")) return broken(keys);
    return broken(`${file}: the test object is not read`);
  }
  const outsideTest = [...keys.keys()].filter(key => key !== "allowOnly" && key !== "include");
  if (read.has("test keys") && outsideTest.length > 0) return broken(`${file}: the test object sets ${outsideTest.join(", ")}`);
  const allowOnly = keys.get("allowOnly");
  if (read.has("allowOnly") && (allowOnly === undefined || unwrap(allowOnly).kind !== ts.SyntaxKind.FalseKeyword)) return broken(`${file}: allowOnly is not the literal false`);
  const includeValue = keys.get("include");
  const include = includeValue === undefined ? undefined : unwrap(includeValue);
  const globs = include !== undefined && ts.isArrayLiteralExpression(include) ? include.elements.filter(isStringKey).map(element => element.text) : undefined;
  if (read.has("include")) {
    if (include === undefined || !ts.isArrayLiteralExpression(include) || globs === undefined || globs.length !== include.elements.length) return broken(`${file}: include is not an array literal of string literals`);
    if (!globs.some(glob => globMatches(glob, runPin))) return broken(`${file}: no glob of include ${JSON.stringify(globs)} matches ${runPin}`);
  }
  return `the census tier runs vitest run --config ${file}, whose config holds only the defineConfig import and its default export, a test object of allowOnly false and include ${JSON.stringify(globs ?? [])}, one glob matching ${runPin}`;
}

// ---- C: every representation tag under src ---------------------------------------------------------------------------------

export interface Site {
  readonly file: string;
  readonly form: "code" | "text";
  readonly tag: string;
  /** Whether the token (code) is exactly the tag; a text file's site is never whole. */
  readonly whole: boolean;
  readonly line: number;
}
export interface SrcScan {
  /** Every file under the directory, root-relative, in walk order. */
  readonly files: readonly string[];
  readonly sites: readonly Site[];
  /** Directories reached a second time by their real path (a break). */
  readonly breaks: readonly string[];
}
/** Every file under `directory` (default src) and every representation tag in it, read with the C forms. */
export function srcSites(host: ModuleHost, directory = "src", forms: readonly CForm[] = words(C_FORMS)): SrcScan {
  const read = new Set(forms);
  const files: string[] = [];
  const breaks: string[] = [];
  const seen = new Set<string>();
  const walk = (path: string): void => {
    const real = host.real(path);
    if (seen.has(real) && read.has("walk")) {
      const root = toPosix(host.root);
      const shown = real === root ? "the root" : real.startsWith(`${root}/`) ? real.slice(root.length + 1) : "a directory outside the root";
      breaks.push(`${path} reaches ${shown}, a directory already read`);
      return;
    }
    seen.add(real);
    for (const name of [...(host.list(path) ?? [])].sort()) {
      const entry = within(path, name);
      if (host.stat(entry) === "directory") {
        if (read.has("walk")) walk(entry);
      } else files.push(entry);
    }
  };
  walk(directory);
  const sites: Site[] = [];
  for (const file of files) {
    const text = host.read(file) ?? "";
    const kind = scriptKindOf(file);
    if (kind !== undefined) {
      if (read.has("code")) sites.push(...cached(CODE_SITES, file, text, () => codeSites(file, text, kind)));
    } else if (read.has("text")) {
      for (const match of text.matchAll(REPRESENTATION_TAG)) sites.push({ file, form: "text", tag: match[0], whole: false, line: text.slice(0, match.index).split("\n").length });
    }
  }
  return { files, sites, breaks };
}
const CODE_SITES = new Map<string, { readonly text: string; readonly found: Site[] }>();
function codeSites(file: string, text: string, kind: ts.ScriptKind): Site[] {
  const sites: Site[] = [];
  const source = ts.createSourceFile(`/${file}`, text, ts.ScriptTarget.Latest, true, kind);
  const visit = (node: ts.Node): void => {
    if (isStringKey(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node)) {
      for (const match of node.text.matchAll(REPRESENTATION_TAG)) sites.push({ file, form: "code", tag: match[0], whole: match[0] === node.text, line: lineOf(source, node) });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
