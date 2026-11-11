import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, "../src");
const repoRoot = join(here, "../../..");

/** The declared placement map (APO package-placement-boundaries, 04-hld-ownership.md): the coordination core is
 * dependency-free and package-internal, with exactly one named exception; the MicroPolicy adapter seam and the
 * Forge SDK live only at the edge (the rig). Changing this map is a placement decision, not a test fix. */
const IMPORT_ALLOWLIST: Readonly<Record<string, readonly string[]>> = { "canonical.ts": ["node:crypto"] };
const EDGE_MEMBERS = ["apps/development-rig"] as const;
const CORE_MEMBERS = ["packages/coordination", "packages/development"] as const;

const modules = readdirSync(srcDir).filter(name => name.endsWith(".ts"));
const sourceOf = (name: string): string => readFileSync(join(srcDir, name), "utf8");

/** Drop // and block comments while keeping string and template literals intact, so a comment naming a banned token
 * is not a violation and a banned token inside code is never hidden behind a "//" that sits in a string. */
export const stripComments = (source: string): string => {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i]!;
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i++;
    } else if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      i = end === -1 ? source.length : end + 2;
      out += " ";
    } else if (ch === '"' || ch === "'" || ch === "`") {
      out += ch;
      i++;
      while (i < source.length && source[i] !== ch) {
        if (source[i] === "\\") { out += source[i]!; i++; }
        if (i < source.length) { out += source[i]!; i++; }
      }
      if (i < source.length) { out += ch; i++; }
    } else {
      out += ch;
      i++;
    }
  }
  return out;
};

/** Every module specifier a source names: from-clauses and export-from in either quote style, side-effect imports and
 * dynamic import() calls. Comments are stripped first so a commented-out import does not count, and the clause is
 * anchored on statement context (a line start, a `;` or a closing or opening brace) so a quoted `from` property key never reads as a specifier. */
export const IMPORT_CLAUSE = /(?:^|[;{}])[ \t]*(?:import|export)\b[^;"'`]*?\bfrom\s*(["'])([^"'\n]+)\1|(?:^|[;{}])[ \t]*import\s*(["'])([^"'\n]+)\3|\bimport\s*\(\s*(["'])([^"'\n]+)\5/gm;
export const importsOf = (source: string): string[] =>
  [...stripComments(source).matchAll(IMPORT_CLAUSE)].map(match => match[2] ?? match[4] ?? match[6]!);

/** The effect, network, process, clock, timer and randomness surfaces the core must never reach (comments excluded).
 * node: specifiers are policed by the import allowlist, and import( is a dynamic-import escape. */
export const EFFECT_PATTERNS: readonly RegExp[] = [
  /\bprocess\s*(?:\?\.|[.[])/, /\bfetch\s*\(/, /\bwriteFile/, /\bchild_process\b/, /\bDate\.now\b/, /\bMath\.random\b/, /\bnew\s+Date\b/, /\brequire\s*\(/,
  /\bimport\s*\(/, /\bsetTimeout\b/, /\bsetInterval\b/, /\bsetImmediate\b/, /\bperformance\./, /(?<![\w.$])crypto\./,
  /(?<!\bnew\s+)\bDate\s*\(/
];
export const effectsOf = (source: string): string[] => {
  const code = stripComments(source);
  return EFFECT_PATTERNS.filter(pattern => pattern.test(code)).map(String);
};

const DEPENDENCY_FIELDS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
type Manifest = Partial<Record<(typeof DEPENDENCY_FIELDS)[number], Record<string, string>>> & { bundleDependencies?: string[] | boolean; bundledDependencies?: string[] | boolean };
/** Every dependency name a manifest declares in any of its dependency-bearing fields, bundle lists included. */
export const declaredNames = (pkg: Manifest): string[] => [
  ...DEPENDENCY_FIELDS.flatMap(field => Object.keys(pkg[field] ?? {})),
  ...[pkg.bundleDependencies, pkg.bundledDependencies].flatMap(list => (Array.isArray(list) ? list : []))
];

test("every coordination module imports only package-internal ./module.js files, except the declared allowlist", () => {
  assert.ok(modules.length >= 10, "the core has modules to check");
  for (const name of modules) {
    const allowed = IMPORT_ALLOWLIST[name] ?? [];
    for (const specifier of importsOf(sourceOf(name))) {
      if (allowed.includes(specifier)) continue;
      assert.match(specifier, /^\.\/[a-z-]+\.js$/, `PLACEMENT_IMPORT_ESCAPES_CORE: ${name} imports ${specifier}`);
    }
  }
});

test("no coordination module reaches an effect, network, process, clock, timer or dynamic-import surface", () => {
  for (const name of modules) {
    const hits = effectsOf(sourceOf(name));
    assert.deepEqual(hits, [], `PLACEMENT_EFFECT_IN_CORE: ${name} matches ${hits.join(", ")}`);
  }
});

test("the coordination package declares no dependencies of any kind: the core is intact by declaration", () => {
  const pkg = JSON.parse(readFileSync(join(here, "../package.json"), "utf8")) as Manifest;
  assert.deepEqual(pkg.dependencies ?? {}, {}, "PLACEMENT_CORE_DEPENDENCY_DECLARED");
  assert.deepEqual(pkg.devDependencies ?? {}, {}, "PLACEMENT_CORE_DEV_DEPENDENCY_DECLARED");
  assert.deepEqual(pkg.optionalDependencies ?? {}, {}, "PLACEMENT_CORE_OPTIONAL_DEPENDENCY_DECLARED");
  assert.deepEqual(pkg.peerDependencies ?? {}, {}, "PLACEMENT_CORE_PEER_DEPENDENCY_DECLARED");
  assert.deepEqual(declaredNames(pkg), [], "PLACEMENT_CORE_BUNDLE_DEPENDENCY_DECLARED");
});

test("the MicroPolicy seam and the Forge SDK stay at the edge: no core member names or imports them", () => {
  for (const member of [...CORE_MEMBERS, ...EDGE_MEMBERS]) {
    const pkg = JSON.parse(readFileSync(join(repoRoot, member, "package.json"), "utf8")) as Manifest;
    const declared = declaredNames(pkg);
    assert.equal(declared.some(name => name.startsWith("@micro-policy")), false, `PLACEMENT_MICROPOLICY_DECLARED: ${member}`);
    assert.equal(declared.some(name => name.startsWith("@forge/")), false, `PLACEMENT_SDK_DECLARED: ${member} (the rig installs it per-run with --no-save, never as a manifest dependency)`);
  }
  for (const member of CORE_MEMBERS) {
    const dir = join(repoRoot, member, "src");
    for (const name of readdirSync(dir).filter(file => file.endsWith(".ts"))) {
      const specifiers = importsOf(readFileSync(join(dir, name), "utf8"));
      assert.equal(specifiers.some(specifier => specifier.startsWith("@micro-policy") || specifier.startsWith("@forge/")), false,
        `PLACEMENT_EDGE_IMPORT_IN_CORE: ${member}/src/${name}`);
    }
  }
});

test("index.ts re-exports only package-internal modules and covers every non-index module", () => {
  const index = sourceOf("index.ts");
  const specifiers = importsOf(index);
  assert.ok(specifiers.length > 0);
  for (const specifier of specifiers) assert.match(specifier, /^\.\/[a-z-]+\.js$/, `PLACEMENT_INDEX_ESCAPES_CORE: ${specifier}`);
  for (const name of modules.filter(module => module !== "index.ts")) {
    const asJs = "./" + name.replace(/\.ts$/, ".js");
    assert.ok(specifiers.includes(asJs), `PLACEMENT_MODULE_UNEXPORTED: ${name} is not re-exported by index.ts`);
  }
});

test("the placement map itself is pinned: one allowlisted module, the rig as the only edge member", () => {
  assert.deepEqual(Object.keys(IMPORT_ALLOWLIST), ["canonical.ts"]);
  assert.deepEqual(IMPORT_ALLOWLIST["canonical.ts"], ["node:crypto"]);
  assert.deepEqual([...EDGE_MEMBERS], ["apps/development-rig"]);
  assert.deepEqual([...CORE_MEMBERS], ["packages/coordination", "packages/development"]);
  const rigSrc = join(repoRoot, "apps/development-rig/src");
  const seamHosts = readdirSync(rigSrc).filter(name => name.endsWith(".ts") && readFileSync(join(rigSrc, name), "utf8").includes("@forge/sdk"));
  assert.ok(seamHosts.length >= 1, "the edge actually hosts the SDK seam: no rig module names @forge/sdk");
});

test("the matchers catch every shape the literal scan once missed, on in-memory negative sources", () => {
  const specifiers = (source: string): string[] => importsOf(source);
  assert.deepEqual(specifiers("import { a } from './a.js';"), ["./a.js"], "single-quoted import");
  assert.deepEqual(specifiers('import "node:fs";'), ["node:fs"], "side-effect import");
  assert.deepEqual(specifiers("import './boot.js';"), ["./boot.js"], "single-quoted side-effect import");
  assert.deepEqual(specifiers('const fs = await import("node:fs");'), ["node:fs"], "dynamic import");
  assert.deepEqual(specifiers("export * from 'node:crypto';"), ["node:crypto"], "single-quoted export-from");
  assert.deepEqual(specifiers('export { x } from "./x.js";'), ["./x.js"], "double-quoted export-from");
  assert.deepEqual(specifiers('// import "node:fs";\n/* from "node:os" */ const a = 1;'), [], "commented-out imports do not count");
  // A quoted `from` property key is not an import clause (cqc9 repair: the scan once read ["from", "to"] and edge["from"] as specifiers).
  assert.deepEqual(specifiers('const keys = ["from", "to"];'), [], "a quoted from key in an array literal");
  assert.deepEqual(specifiers('const ok = !ids.has(edge["from"]) || !ids.has(edge["to"]);'), [], "a quoted from key in an index expression");
  assert.deepEqual(specifiers("const t = `${edge[\"from\"]} -> ${edge[\"to\"]}`;"), [], "a quoted from key inside a template substitution");
  assert.deepEqual(specifiers('export {\n  a,\n  b\n} from "./multi.js";\nconst keys = ["from", "to"];'), ["./multi.js"], "a multi-line re-export still counts");
  // ufhd follow-up: a module clause that follows a closing brace on the same line is still a statement, and the matcher layers stay pinned.
  assert.deepEqual(specifiers('function f() { return 1 } export type { S } from "node:fs";'), ["node:fs"], "a type re-export after a closing brace");
  assert.deepEqual(specifiers('function f() { return 1 } export { a } from "node:fs";'), ["node:fs"], "a value re-export after a closing brace");
  assert.deepEqual(specifiers('function f() { return 1 } import "node:fs";'), ["node:fs"], "a side-effect import after a closing brace");
  // fwxn: the opening-brace half of the statement anchor is pinned too, in both the from-clause and the side-effect alternatives.
  assert.deepEqual(specifiers('declare module "m" { export * from "node:fs"; }'), ["node:fs"], "a from-clause re-export after an opening brace in an ambient module body");
  assert.deepEqual(specifiers('declare module "m" { import "node:fs"; }'), ["node:fs"], "a side-effect import after an opening brace in an ambient module body");
  assert.deepEqual(specifiers('const u = "http://x.test"; import "./a.js";'), ["./a.js"], "a string holding a url does not hide a later side-effect import");
  // 10kv (fwxn follow-up): the semicolon half of the statement anchor is pinned too, in both the from-clause and the side-effect alternatives.
  assert.deepEqual(specifiers('const a = 1; export { b } from "node:fs";'), ["node:fs"], "a from-clause re-export after a semicolon on the same line");
  assert.deepEqual(specifiers('const a = 1; import "node:fs";'), ["node:fs"], "a side-effect import after a semicolon on the same line");
  assert.deepEqual(specifiers('/*\nimport y from "./elsewhere.js";\n*/\nconst x = 1;'), [], "a multi-line block comment whose inner line starts with an import");
  assert.deepEqual(specifiers('// import("./elsewhere.js")\nconst x = 1;'), [], "a line comment naming a dynamic import");
  assert.deepEqual(specifiers("const s = 'import y from \"./elsewhere.js\"';"), [], "a string literal holding a whole from-clause");
  assert.deepEqual(specifiers("const s = 'import \"./elsewhere.js\"';"), [], "a string literal holding a side-effect import");
  for (const [source, token] of [
    ['const a = process["argv"];', "indexed process"],
    ["const t = performance.now();", "performance clock"],
    ["setTimeout(() => 1, 0);", "setTimeout"],
    ["setInterval(() => 1, 0);", "setInterval"],
    ["const id = crypto.randomUUID();", "global crypto"],
    ['await import("./late.js");', "dynamic import"],
    ["const d = Date.now();", "Date.now"],
    // kwuw (cqc9 follow-up): one in-memory row for every remaining EFFECT_PATTERNS alternative, so dropping any token fails here.
    ["const a = process.argv;", "dotted process"],
    ['const r = await fetch("x");', "fetch"],
    ['writeFile("x", "y");', "writeFile"],
    ['const cp = child_process;', "child_process"],
    ["const r = Math.random();", "Math.random"],
    ["const d = new Date(0);", "new Date"],
    ['const m = require("x");', "require"],
    ["setImmediate(() => 1, 0);", "setImmediate"],
    // A Date call made without `new` returns the current time, so it needs its own token.
    ["const s = Date();", "Date call without new"],
    // 7ubw (kwuw follow-up): a whitespace run after new, optional chaining on process, and whitespace before the Date call parenthesis.
    ["const d = new  Date(0);", "new Date with a whitespace run"],
    ["const e = process?.env;", "optional-chained process"],
    ["const s = Date ();", "Date call with whitespace before the parenthesis"]
  ] as const) {
    assert.ok(effectsOf(source).length > 0, `PLACEMENT_MATCHER_MISSES: ${token}`);
  }
  assert.deepEqual(effectsOf("// Date.now() is banned here\n/* setTimeout */ const a = 1;"), [], "a comment naming a banned token is not a violation");
  assert.deepEqual(effectsOf('const url = "http://x.test/a"; const note = "performance is fine";'), [], "strings with slashes or prose are not effects");
  assert.ok(effectsOf('const s = "//"; const t = Date.now();').length > 0, "a // inside a string does not hide a later call");
  assert.deepEqual(effectsOf("const x = mycrypto.hash(); const y = a.crypto.z;"), [], "a member or longer identifier named crypto is not the global");
  assert.deepEqual(effectsOf("const ok = isDate(v) || toDate(v) || dateOf(v);"), [], "an identifier that merely ends in Date is not the Date call");
  assert.equal(effectsOf("const s = Date();").length, 1, "a Date call without new matches exactly the new token and no other");
  assert.equal(effectsOf("const d = new Date(0);").length, 1, "new Date keeps matching exactly its own token and not the Date call token");
  assert.equal(effectsOf("const d = new  Date(0);").length, 1, "new Date with a whitespace run matches exactly its own token and not the Date call token");
  assert.equal(effectsOf("const s = Date ();").length, 1, "a Date call with whitespace before the parenthesis matches exactly the Date call token");
  // vn1d (7ubw follow-up): the whitespace and quantifier classes the rows above leave open.
  assert.equal(effectsOf("const d = new\tDate(0);").length, 1, "new Date with a tab after new matches exactly its own token and not the Date call token");
  assert.equal(effectsOf("const d = new\nDate(0);").length, 1, "new Date with a line break after new matches exactly its own token and not the Date call token");
  assert.deepEqual(effectsOf("const newDate = 1; const renewDate = newDate;"), [], "an identifier that merely contains newDate is not the new Date token");
  assert.ok(effectsOf("const e = process\n  ?.env;").length > 0, "optional-chained process with a line break before the chain still reads as the process surface");
  // avz0 (vn1d follow-up): whitespace at the five remaining EFFECT_PATTERNS spots.
  assert.ok(effectsOf("const e = process\n  .env;").length > 0, "process with a line break before a plain dot still reads as the process surface");
  assert.ok(effectsOf('const a = process\n  ["argv"];').length > 0, "process with a line break before an index still reads as the process surface");
  assert.equal(effectsOf("const s = Date\t();").length, 1, "a Date call with a tab before the parenthesis matches exactly the Date call token");
  assert.ok(effectsOf('const r = fetch ("x");').length > 0, "fetch with whitespace before the parenthesis still reads as a network call");
  assert.ok(effectsOf('const m = require ("x");').length > 0, "require with whitespace before the parenthesis still reads as a module load");
  assert.ok(effectsOf('await import ("./late.js");').length > 0, "a dynamic import with whitespace before the parenthesis still reads as an escape");
  // e6yj (avz0 follow-up): the second whitespace class at each of the same five spots.
  assert.ok(effectsOf("const e = process\t.env;").length > 0, "e6yj WG1: process with a tab before a plain dot still reads as the process surface");
  assert.ok(effectsOf('const r = fetch\t("x");').length > 0, "e6yj WG2: fetch with a tab before the parenthesis still reads as a network call");
  assert.ok(effectsOf('const m = require\n("x");').length > 0, "e6yj WG3: require with a line break before the parenthesis still reads as a module load");
  assert.ok(effectsOf('await import\t("./late.js");').length > 0, "e6yj WG4: a dynamic import with a tab before the parenthesis still reads as an escape");
  assert.equal(effectsOf("const s = Date\n();").length, 1, "e6yj WG5: a Date call with a line break before the parenthesis matches exactly the Date call token");
  // ks1d (e6yj follow-up): one run of every code point JS \s matches at each of the five spots, so no further one-shape lane is needed.
  const WS = "\t\n\v\f\r                  　﻿";
  const bmpWhitespace = Array.from({ length: 0x10000 }, (_, i) => i).filter(i => /\s/.test(String.fromCharCode(i)));
  assert.deepEqual(Array.from(WS, ch => ch.charCodeAt(0)), bmpWhitespace, "ks1d WU0: the constant holds exactly the BMP code points the live \\s matches, in order");
  assert.equal(bmpWhitespace.length, 25, "ks1d WU0: the live \\s matches 25 BMP code points");
  assert.ok(effectsOf("const e = process" + WS + ".env;").length > 0, "ks1d WU1: process followed by every whitespace code point before a plain dot still reads as the process surface");
  assert.ok(effectsOf('const r = fetch' + WS + '("x");').length > 0, "ks1d WU2: fetch followed by every whitespace code point before the parenthesis still reads as a network call");
  assert.ok(effectsOf('const m = require' + WS + '("x");').length > 0, "ks1d WU3: require followed by every whitespace code point before the parenthesis still reads as a module load");
  assert.ok(effectsOf('await import' + WS + '("./late.js");').length > 0, "ks1d WU4: a dynamic import followed by every whitespace code point before the parenthesis still reads as an escape");
  assert.equal(effectsOf("const s = Date" + WS + "();").length, 1, "ks1d WU5: a Date call with every whitespace code point before the parenthesis matches exactly the Date call token");
});

test("the manifest reader sees every dependency-bearing field", () => {
  assert.deepEqual(declaredNames({}), []);
  assert.deepEqual(declaredNames({ optionalDependencies: { "@micro-policy/core": "1" } }), ["@micro-policy/core"]);
  assert.deepEqual(declaredNames({ peerDependencies: { "@forge/sdk": "1" } }), ["@forge/sdk"]);
  assert.deepEqual(declaredNames({ bundleDependencies: ["a"], bundledDependencies: ["b"] }), ["a", "b"]);
  assert.deepEqual(declaredNames({ bundleDependencies: true }), []);
  assert.deepEqual(declaredNames({ dependencies: { a: "1" }, devDependencies: { b: "1" } }), ["a", "b"]);
});
