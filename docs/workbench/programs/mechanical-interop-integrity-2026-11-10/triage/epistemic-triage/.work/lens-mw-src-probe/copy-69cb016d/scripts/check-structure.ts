import { existsSync, lstatSync, readFileSync, readlinkSync, readdirSync } from "node:fs";
import { join, sep } from "node:path";
import assert from "node:assert/strict";
const required = [
  "forge.toml", "forge.workspace.toml", "package.json",
  "packages/development/forge.toml", "packages/development/package.json",
  "packages/coordination/forge.toml", "packages/coordination/package.json",
  "apps/development-rig/forge.toml", "apps/development-rig/package.json",
  "docs/README.md", "contracts/entrypoints/development.v1.json",
];
for (const path of required) assert.ok(existsSync(path), `MISSING_REQUIRED_FILE: ${path}`);
const workspace = readFileSync("forge.workspace.toml", "utf8");
// Parse the three package table bodies rather than matching names in comments. An array-of-tables header counts the way
// TOML (and so Forge) reads it: any leading blanks, blanks inside the brackets, a bare, literal or basic-string key
// whose escapes decode (so `[["pack\u0061ges"]]` names `packages` like the plain spelling), a trailing comment, and a
// header on the last line with no newline (MechanicalWorkflows-hnz4: a spaced `[[ packages ]]` header used to fold
// into the previous member's body; MechanicalWorkflows-76a5: so did an escaped key, so a fourth member kept the
// three-member assert green). Every array-of-tables header ends the body before it, but only a header whose decoded
// key equals `packages` adds a member, so a foreign `[[x]]` can never fold into a member and never counts as one.
const TOML_KEY = String.raw`"((?:[^"\\\r\n]|\\.)*)"|'([^'\r\n]*)'|([A-Za-z0-9_-]+)`;
const TABLE_ARRAY_HEADER = new RegExp(String.raw`^[ \t]*\[\[[ \t]*(?:${TOML_KEY})[ \t]*\]\][^\r\n]*(?:\r?\n|(?![\s\S]))`, "gm");
const workspaceText = workspace.replace(/^\s*#.*$/gm, "");
const headers = [...workspaceText.matchAll(TABLE_ARRAY_HEADER)];
const members = headers
  .map((header, index) => ({ header, body: workspaceText.slice(header.index + header[0].length, headers[index + 1]?.index) }))
  .filter(({ header: [, basicKey, literalKey, bareKey] }) => (basicKey !== undefined ? decodeBasicString(basicKey, false) : (literalKey ?? bareKey)!) === "packages")
  .map(({ body }) => ({
    ref: body.match(/^\s*ref\s*=\s*"([^"]+)"/m)?.[1],
    path: body.match(/^\s*path\s*=\s*"([^"]+)"/m)?.[1],
  }));
assert.deepEqual(members, [
  { ref: "library:workflows-development", path: "packages/development" },
  { ref: "code:development-rig", path: "apps/development-rig" },
  { ref: "library:workflows-coordination", path: "packages/coordination" },
], "INVALID_WORKSPACE_MEMBERS: exactly three named non-root package members required");
const packageJson = JSON.parse(readFileSync("package.json","utf8"));
assert.deepEqual(packageJson.workspaces, ["packages/*", "apps/*"]);
for (const path of ["packages/development/package.json", "packages/coordination/package.json", "apps/development-rig/package.json"]) {
  const member = JSON.parse(readFileSync(path, "utf8"));
  assert.ok(member.scripts?.build && member.scripts?.test, `MISSING_MEMBER_GATE: ${path}`);
  for (const step of ["build", "test"]) {
    assert.ok(!/^\s*(?:echo|true|:|exit\s+0)(?:\s|$)/.test(member.scripts[step]),
      `ECHO_ONLY_MEMBER_GATE: ${path} ${step}`);
  }
}
// The root build and test scripts must run every declared member through its own --workspace leg: a member whose
// leg is dropped keeps this gate green while its tests and compile never run (a resolver defect could then ship).
// Match whole `&&`-separated commands so a name that merely prefixes another member's name does not count.
const memberNames: string[] = [];
for (const path of ["packages/development/package.json", "packages/coordination/package.json", "apps/development-rig/package.json"]) {
  const name: unknown = JSON.parse(readFileSync(path, "utf8")).name;
  assert.equal(typeof name, "string", `MISSING_MEMBER_NAME: ${path}`);
  memberNames.push(name as string);
  for (const step of ["build", "test"]) {
    const legs = String(packageJson.scripts?.[step] ?? "").split("&&").map(segment => segment.trim());
    assert.ok(legs.includes(`npm run ${step} --workspace ${name}`),
      `MISSING_ROOT_WORKSPACE_LEG: package.json scripts.${step} lacks --workspace ${name} (${path})`);
  }
}
// The root test script must also run the repository scripts' own tests (`node --test scripts/*.test.ts`): the
// gates themselves (check-structure, check-docs) are only as good as their tests, and a dropped leg keeps this
// gate green while those tests never run. Same whole-command rule as the workspace legs above. It must likewise end
// in the declared-versus-reported TAP plan check (`node scripts/check-tap-plan.ts`): a dropped leg keeps all six gate
// steps green while a test file that declares more tests than it reports goes unnoticed.
// Each segment must also be a known leg (allowlist below the two checks): the whole-segment rule alone accepted spellings
// that keep the exact leg yet never run or never gate it.
const rootTestLegs = String(packageJson.scripts?.test ?? "").split("&&").map(segment => segment.trim());
assert.ok(rootTestLegs.includes("node --test scripts/*.test.ts"),
  "MISSING_ROOT_SCRIPTS_LEG: package.json scripts.test lacks node --test scripts/*.test.ts");
assert.ok(rootTestLegs.includes("node scripts/check-tap-plan.ts"),
  "MISSING_ROOT_TAP_PLAN_LEG: package.json scripts.test lacks node scripts/check-tap-plan.ts");
// Presence is not enough (MechanicalWorkflows-5p8u): a segment that keeps the TAP-plan leg as its own `&&` piece can still
// stop it from running (`echo # && ...`, the leg quoted inside echo, a `node() { :; }` function, an `exit 0` head) or from
// gating (a `&& true || true`, `&& true; true`, `&& true<newline>exit 0` or `&& true & wait` tail masks the exit status).
// So every `&&`-separated segment of scripts.test must itself be one of the known legs, and anything else is refused.
const knownRootTestLegs = new Set([
  "npm run build", "node --test scripts/*.test.ts", "node scripts/check-tap-plan.ts",
  ...memberNames.map(name => `npm run test --workspace ${name}`),
]);
for (const segment of rootTestLegs) {
  assert.ok(knownRootTestLegs.has(segment),
    `UNKNOWN_ROOT_TEST_SEGMENT: package.json scripts.test segment ${JSON.stringify(segment)} is not a known leg`);
}
// Refuse Library as a declared package, module, or executable dependency — in every scope npm reads,
// including overrides, resolutions and bundle(d)Dependencies, whose values nest objects and arrays
// (MechanicalWorkflows-3has: overrides {"innocuous-name": "file:../../Library"} previously exited 0).
function manifestStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) manifestStrings(member, out);
  else if (value !== null && typeof value === "object") {
    for (const [key, member] of Object.entries(value as Record<string, unknown>)) {
      out.push(key);
      manifestStrings(member, out);
    }
  }
  return out;
}
for (const path of ["package.json", "packages/development/package.json", "packages/coordination/package.json", "apps/development-rig/package.json"]) {
  const pkg = JSON.parse(readFileSync(path, "utf8"));
  for (const scope of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    for (const [name, version] of Object.entries((pkg[scope] ?? {}) as Record<string, unknown>)) {
      assert.ok(!/library/i.test(name + String(version)), `LIBRARY_DEPENDENCY_FORBIDDEN: ${path} ${scope} ${name}`);
    }
  }
  for (const scope of ["overrides", "resolutions", "bundleDependencies", "bundledDependencies"]) {
    for (const text of manifestStrings(pkg[scope] ?? {})) {
      assert.ok(!/library/i.test(text), `LIBRARY_DEPENDENCY_FORBIDDEN: ${path} ${scope} ${text}`);
    }
  }
}
// Decode the TOML escapes of a basic string (\b \t \n \f \r \" \\ \xHH \uXXXX \UXXXXXXXX, and TOML 1.1 \e); a
// backslash at a line end (multi-line basic strings only) swallows the newline and the whitespace after it, and
// blanks or tabs may sit between that backslash and its newline (MechanicalWorkflows-ifpm). An escape that is not
// valid TOML stays verbatim, so a malformed spelling can only be refused for what it literally says. The TOML 1.1
// escapes decode under cpython 3.15 tomllib and raise under 3.12; reading them as 1.1 keeps the ban conservative.
function decodeBasicString(raw: string, multiline: boolean): string {
  const simple: Record<string, string> = { b: "\b", t: "\t", n: "\n", f: "\f", r: "\r", e: "\u001b", '"': '"', "\\": "\\" };
  return raw.replace(/\\(?:u([0-9A-Fa-f]{4})|U([0-9A-Fa-f]{8})|x([0-9A-Fa-f]{2})|([btnfre"\\])|([ \t]*\r?\n[ \t\r\n]*))/g,
    (whole, short?: string, long?: string, hex?: string, one?: string, lineEnd?: string) => {
      if (lineEnd !== undefined) return multiline ? "" : whole;
      if (one !== undefined) return simple[one]!;
      const code = Number.parseInt((short ?? long ?? hex)!, 16);
      return code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : whole;
    });
}
// Every decoded value assigned to a key named `ref` in a forge manifest, whatever its TOML spelling: bare,
// double-quoted or single-quoted key (the key may itself carry escapes), and a basic, literal, multi-line
// basic or multi-line literal string value. The scan is text-level, like the ban it serves: it also reads a
// `ref` key inside an inline table.
const TOML_STRING = String.raw`"""([\s\S]*?)"""|'''([\s\S]*?)'''|"((?:[^"\\\r\n]|\\[^\r\n]|\\\r?\n)*)"|'([^'\r\n]*)'`;
// Drop every `#` comment that sits outside a string (MechanicalWorkflows-ifpm). A comment such as `# see = "\\` or
// `# open = '''` would otherwise open a string for the pair scan and swallow the next real `ref` line, and a commented-out
// `# ref = "../library"` is no edge at all. One left-to-right pass tries the four string forms before a comment at each
// position, so a `#` inside a string, a quoted key or an inline-table value stays where it is; the newline that ends a
// comment stays too.
function stripTomlComments(text: string): string {
  return text.replace(new RegExp(`(${TOML_STRING})|#[^\\r\\n]*`, "g"), (whole, string?: string) => string !== undefined ? whole : "");
}
function tomlValues(rawText: string, keySuffix: string): string[] {
  const values: string[] = [];
  const text = stripTomlComments(rawText);
  const pair = new RegExp(`(?:${TOML_KEY})\\s*=\\s*(?:${TOML_STRING})`, "g");
  for (const match of text.matchAll(pair)) {
    const [, basicKey, literalKey, bareKey, multiBasic, multiLiteral, basic, literal] = match;
    const key = basicKey !== undefined ? decodeBasicString(basicKey, false) : (literalKey ?? bareKey)!;
    if (!key.toLowerCase().endsWith(keySuffix)) continue;
    const trimmed = (body: string) => body.replace(/^\r?\n/, "");
    values.push(
      multiBasic !== undefined ? decodeBasicString(trimmed(multiBasic), true)
        : multiLiteral !== undefined ? trimmed(multiLiteral)
        : basic !== undefined ? decodeBasicString(basic, false)
        : literal!,
    );
  }
  return values;
}
// Every key of a `[dependencies]` table, in each spelling Forge reads: the table body, a dotted key inside it, a
// dotted sub-table header (`[dependencies."library:shared-kit"]`) and a top-level dotted key
// (`dependencies."library:shared-kit" = {}`). Keys decode like the `ref` scan (quoted, escaped). A comment line never
// opens a key (`#` is outside the key alphabet); the scan is line-based, so a multi-line value could still shadow a key
// (text-level, like the ban).
function tomlDependencyKeys(text: string): string[] {
  const keys: string[] = [];
  const decodeKeys = (fragment: string) => [...fragment.matchAll(new RegExp(TOML_KEY, "g"))]
    .map(([, basicKey, literalKey, bareKey]) => basicKey !== undefined ? decodeBasicString(basicKey, false) : (literalKey ?? bareKey)!);
  const keyLine = new RegExp(String.raw`^[ \t]*((?:"(?:[^"\\\r\n]|\\.)*"|'[^'\r\n]*'|[A-Za-z0-9_.\- \t])+?)[ \t]*=`);
  let beforeFirstHeader = true;
  let inTable = false;
  for (const line of text.split(/\r?\n/)) {
    const header = line.match(/^[ \t]*\[(?!\[)[ \t]*([^\]]*?)[ \t]*\]/);
    if (header || /^[ \t]*\[\[/.test(line)) {
      beforeFirstHeader = false;
      const parts = header ? decodeKeys(header[1]!) : [];
      inTable = parts[0]?.toLowerCase() === "dependencies";
      if (inTable) keys.push(...parts.slice(1));
      continue;
    }
    const parts = decodeKeys(line.match(keyLine)?.[1] ?? "");
    if (inTable) keys.push(...parts);
    else if (beforeFirstHeader && parts[0]?.toLowerCase() === "dependencies") keys.push(...parts.slice(1));
  }
  return keys;
}
const memberRefs = new Set(members.map(member => member.ref));
const manifestPaths = [
  "forge.toml", "forge.workspace.toml",
  "packages/development/forge.toml", "packages/coordination/forge.toml", "apps/development-rig/forge.toml",
];
for (const path of manifestPaths) {
  const contents = readFileSync(path, "utf8");
  // Refuse any ref whose PATH portion contains a `library` segment, normalised: case-insensitive, with or
  // without a trailing slash or subpath (MechanicalWorkflows-3has: "../library/" previously exited 0). The
  // `library:` ref SCHEME of the committed workspace members stays legitimate — only the part after the
  // first ":" (or the whole value when there is no scheme) is read as a path. Every TOML spelling of the key
  // and the value is decoded first (MechanicalWorkflows-lpcq): quoted keys, \u and \U escapes, and the four
  // string forms, because tomllib reads each of them as the same refused shape.
  for (const value of tomlValues(contents, "ref")) {
    const refPath = value.includes(":") ? value.slice(value.indexOf(":") + 1) : value;
    const segments = refPath.split("/").map(segment => segment.toLowerCase());
    assert.ok(!segments.includes("library"), `LIBRARY_MEMBER_FORBIDDEN: ${path} (ref ${value})`);
  }
  // A registry entry's `path` value is the edge Forge resolves, whatever its ref says (MechanicalWorkflows-hnz4: a
  // `code:` or `library:` ref at path ../library kept the ref scan green). Same decoding; split on both separators.
  for (const value of tomlValues(contents, "path")) {
    const segments = value.split(/[\\/]/).map(segment => segment.toLowerCase());
    assert.ok(!segments.includes("library"), `LIBRARY_MEMBER_FORBIDDEN: ${path} (path ${value})`);
  }
  // A `[dependencies]` key names an edge too. The `library:` scheme stays legitimate for the three declared members
  // (the rig depends on "library:workflows-development"); any other `library:` key, or a key whose path portion has a
  // library segment, is a Library edge.
  for (const key of tomlDependencyKeys(contents)) {
    const keyPath = key.includes(":") ? key.slice(key.indexOf(":") + 1) : key;
    const library = keyPath.split(/[\\/]/).some(segment => segment.toLowerCase() === "library")
      || (/^library:/i.test(key) && !memberRefs.has(key));
    assert.ok(!library, `LIBRARY_DEPENDENCY_FORBIDDEN: ${path} [dependencies] ${key}`);
  }
}
const typecheckedRoots = ["scripts", "qa", "apps", "packages", "examples"];
// The source walk never follows a symlink (EAT-R115, MechanicalWorkflows-869cl.3). Node's recursive readdir follows symlinked
// directories: a cycle multiplied the scanned set (41 paths for 1 real file at the ELOOP depth) and a symlinked tree outside the
// workspace entered the scan as workspace source. The walk reads one directory at a time through Dirent, descends only into real
// directories, skips node_modules and dist by segment name before anything else (a symlinked node_modules stays tolerated), and
// records every other symlink so the gate refuses it below instead of silently following or dropping it.
const skippedSourceSegments = new Set(["node_modules", "dist"]);
function walkSources(dir: string, files: string[], links: string[]): void {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    if (skippedSourceSegments.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isSymbolicLink()) links.push(`${path.split(sep).join("/")} -> ${readlinkSync(path)}`);
    else if (entry.isDirectory()) walkSources(path, files, links);
    else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) files.push(path);
  }
}
function tsSources(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  walkSources(dir, files, []);
  return files;
}
const symlinksInTypecheckedRoots: string[] = [];
for (const root of typecheckedRoots) {
  if (!existsSync(root)) continue;
  if (lstatSync(root).isSymbolicLink()) symlinksInTypecheckedRoots.push(`${root} -> ${readlinkSync(root)}`);
  else walkSources(root, [], symlinksInTypecheckedRoots);
}
assert.equal(symlinksInTypecheckedRoots.length, 0, `STRUCTURE_SYMLINK_IN_TYPECHECKED_ROOT: ${symlinksInTypecheckedRoots.join(", ")} (a symlink under a typechecked root is never followed; a source reachable only through one would evade every scan below)`);
// The development and coordination libraries stay SDK-free and provider-neutral (MW-009, MW-026, WP-A,
// MWCOL-001): no Forge, Furnace, HyperUnix, ReactiveFiber, Pi or model-provider package may be imported under
// packages/development/src or packages/coordination/src. The Pi module family is named explicitly (EAT-R020, remediation
// M029): the @earendil-works/pi-* packages and the pi-subagents companion (@tintinweb/pi-subagents, or the bare spelling),
// pinned to the pi-subagents 278c8f79 package.json; a later rename adds a prefix and never removes one. The rig's provider
// edge (apps/development-rig) stays outside this scan and the optionalSdks list below is not widened.
// The import clauses below read a specifier-normalised view (MechanicalWorkflows-71lui.2, EAT-R020 + EAT-R104): the whole
// source is scanned, not one physical line at a time, so a specifier that starts on a later line than its from, import( or
// require( keyword, follows a comment or sits in a template literal is still read. A bare from or import needs one gap before its
// specifier, so a string that merely ends in the word, such as "from", never opens a specifier at its closing quote. A site is
// reported on the line where its keyword begins. A comment between keyword and specifier is skipped; the sources themselves
// are not comment-blanked here, so a commented-out import still counts as it did on the line-based scan.
// Each gap alternative has exactly one way to match a given span (EAT-R115, MechanicalWorkflows-71lui.3): the block body consumes
// every non-star character or a star not starting the terminator, and the line comment must reach the line end, so adjacent comments
// after a keyword with no closing string fail in linear time instead of doubling the work per comment.
const IMPORT_GAP = String.raw`(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/|\/\/[^\r\n]*(?![^\r\n]))`;
const IMPORT_KEYWORD = String.raw`(?:\b(?:import|require)${IMPORT_GAP}*\(${IMPORT_GAP}*|\b(?:from|import)${IMPORT_GAP}+)`;
function importSites(text: string): { line: number; specifier: string }[] {
  const sites: { line: number; specifier: string }[] = [];
  for (const match of text.matchAll(new RegExp(IMPORT_KEYWORD + String.raw`(["'\`])((?:(?!\1)[^\r\n])*)\1`, "g"))) {
    sites.push({ line: text.slice(0, match.index).split("\n").length, specifier: match[2]! });
  }
  return sites;
}
const providerSpecifiers = /^(?:@forge\/|@furnace\/|@hyperunix\/|@anthropic-ai\/|openai|@openai\/|reactive-fiber|@reactive-fiber\/|@earendil-works\/pi-|@tintinweb\/pi-subagents|pi-subagents)/;
const providerImports: string[] = [];
for (const file of [...tsSources("packages/development/src"), ...tsSources("packages/coordination/src")]) {
  for (const site of importSites(readFileSync(file, "utf8"))) {
    if (providerSpecifiers.test(site.specifier)) providerImports.push(`${file}:${site.line}`);
  }
}
assert.equal(providerImports.length, 0, `LIBRARY_PROVIDER_IMPORT_FORBIDDEN: ${providerImports.join(", ")} (the development and coordination libraries must stay SDK-free and provider-neutral)`);
// CAC metadata stays an optional view (CACWC-EAT-R016): neither provider-neutral library may import a CAC checker
// module, so develop() and the coordination combinators behave identically with or without CAC reference fields.
// A specifier counts when one path segment is `cac` (alone or hyphen/underscore/dot-suffixed) or names a cac checker;
// a name that merely begins with those letters, such as `./cache.js`, does not.
const cacCheckerSpecifier = /(?:^|[/@])cac(?:[-_.][^/]*)?(?:\/|$)|cac[-_]?checker/i;
const cacCheckerImports: string[] = [];
for (const file of [...tsSources("packages/development/src"), ...tsSources("packages/coordination/src")]) {
  for (const site of importSites(readFileSync(file, "utf8"))) {
    if (cacCheckerSpecifier.test(site.specifier)) cacCheckerImports.push(`${file}:${site.line}`);
  }
}
assert.equal(cacCheckerImports.length, 0, `CAC_CHECKER_IMPORT_FORBIDDEN: ${cacCheckerImports.join(", ")} (CAC metadata is an optional view; the development and coordination libraries must not import a CAC checker)`);
// The coordination library is a pure package (PIWBA MW-R7, EAT-R104): its whole src tree is census-checked on every cut
// against a closed specifier allowlist, so a Node builtin such as node:fs, node:child_process, node:net or node:http (in any
// import, re-export, dynamic import or require spelling, prefixed or not) cannot enter unnoticed. The one sanctioned builtin is
// node:crypto, the sha256 digest in canonical.ts; every other specifier must be a relative module. A dynamic import or
// require whose argument is not a string literal cannot be censused, so it counts as a violation too. Comments are blanked
// first, keeping line numbers, so a commented-out import never reads as one.
const coordinationAllowedSpecifiers = new Set(["node:crypto"]);
const coordinationSpecifier = new RegExp(IMPORT_KEYWORD + String.raw`(["'\`])([^"'\`\r\n]*)\1`, "g");
const coordinationNonLiteralLoad = /\b(?:import|require)\s*\(\s*(?!["'`\s])/g;
function blankComments(text: string): string {
  const blank = (match: string) => match.replace(/[^\r\n]/g, " ");
  return text.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/^[ \t]*\/\/.*$/gm, blank);
}
// The same whole-tree census backs both pure libraries (PIWBA cross-cutting EAT-R046 + EAT-R124, MechanicalWorkflows-fwexf.2):
// one scan body takes the package source directory and its closed allowlist, so the coordination output stays byte-identical.
function ioCensus(srcDir: string, allowed: ReadonlySet<string>): string[] {
  const violations: string[] = [];
  for (const file of tsSources(srcDir)) {
    // The scan runs over the whole blanked file, not line by line, so a specifier that starts on a later line than its
    // from, import( or require( keyword is still seen; a specifier is reported on its own line, a non-literal import( or require( on the line of its keyword.
    const text = blankComments(readFileSync(file, "utf8"));
    const lineOf = (offset: number) => text.slice(0, offset).split("\n").length;
    for (const match of text.matchAll(coordinationSpecifier)) {
      const specifier = match[2]!;
      if (!(/^\.{1,2}\//.test(specifier) && !specifier.includes("${")) && !allowed.has(specifier)) {
        violations.push(`${file}:${lineOf(match.index! + match[0].length)} (${specifier})`);
      }
    }
    for (const match of text.matchAll(coordinationNonLiteralLoad)) violations.push(`${file}:${lineOf(match.index!)} (non-literal specifier)`);
  }
  return violations;
}
function runtimeDependencyScopes(manifestPath: string): Array<[string, string[]]> {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return ["dependencies", "peerDependencies", "optionalDependencies"].map(scope => [scope, Object.keys((manifest[scope] ?? {}) as Record<string, unknown>)]);
}
const coordinationIo = ioCensus("packages/coordination/src", coordinationAllowedSpecifiers);
assert.equal(coordinationIo.length, 0, `COORDINATION_IO_IMPORT_FORBIDDEN: ${coordinationIo.join(", ")} (the pure coordination library may import only relative modules and ${[...coordinationAllowedSpecifiers].join(", ")})`);
// The pure library also declares no runtime dependency of its own: a manifest dependency would let a package outside the
// closed specifier allowlist reach the build while the import census above stays green on relative modules only.
for (const [scope, names] of runtimeDependencyScopes("packages/coordination/package.json")) {
  assert.equal(names.length, 0, `COORDINATION_RUNTIME_DEPENDENCY_FORBIDDEN: packages/coordination/package.json ${scope} ${names.join(", ")}`);
}
// The development library gets the same census with an EMPTY allowlist (relative modules only; add node:crypto here only when a
// committed source needs it, with the rationale in this comment). Today it imports relative specifiers only and declares no
// dependency scope, so the gate was green by accident; this makes it green by assertion. A node:fs or node:child_process import is
// the only route by which a workspace-bytes cleanup path (the Pi worktree data-loss hazard, EAT-R046 / EAT-R124) could enter the
// library, and the delivery program forbids it (docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md:23).
const developmentAllowedSpecifiers = new Set<string>();
const developmentIo = ioCensus("packages/development/src", developmentAllowedSpecifiers);
assert.equal(developmentIo.length, 0, `DEVELOPMENT_IO_IMPORT_FORBIDDEN: ${developmentIo.join(", ")} (the development library may import only relative modules${developmentAllowedSpecifiers.size ? ` and ${[...developmentAllowedSpecifiers].join(", ")}` : ""})`);
for (const [scope, names] of runtimeDependencyScopes("packages/development/package.json")) {
  assert.equal(names.length, 0, `DEVELOPMENT_RUNTIME_DEPENDENCY_FORBIDDEN: packages/development/package.json ${scope} ${names.join(", ")}`);
}
// Refuse string-literal imports of the optional provider SDKs anywhere the gate compiles or type-checks:
// a fresh clone has none of them installed, and tsc resolves a literal specifier (TS2307) even inside a
// dynamic import() fallback. Live code must load them through a non-literal specifier and refuse with
// *_SDK_NOT_INSTALLED when absent (docs/12, fresh-clone reproducibility).
const optionalSdks = ["@forge/sdk", "@anthropic-ai/claude-agent-sdk", "@hyperunix/sdk", "@furnace/sdk"];
const literalImports: string[] = [];
for (const file of typecheckedRoots.flatMap(tsSources)) {
  for (const site of importSites(readFileSync(file, "utf8"))) {
    if (optionalSdks.includes(site.specifier)) literalImports.push(`${file}:${site.line}`);
  }
}
assert.equal(literalImports.length, 0, `OPTIONAL_SDK_LITERAL_IMPORT: ${literalImports.join(", ")} must load the optional SDK through a non-literal specifier`);
// The external installed-consumer smoke (qa/integration/installed-consumer.sh/.ts) is wired into no forge gate step, so
// nothing else notices when the rig gains a dependency (MechanicalWorkflows-bul9n, EAT-R017 pre-condition: it drifted at
// the coordination edge and stayed stale). Static guard: the shell installs one packed tarball per rig dependency plus
// the rig itself and refuses with PACKAGE_TARBALLS_MISSING, and the .ts keeps a literal EXPECTED_RIG_DEPENDENCIES list
// equal to the rig manifest's dependency keys.
{
  const smokeSh = "qa/integration/installed-consumer.sh";
  const smokeTs = "qa/integration/installed-consumer.ts";
  const stale = (detail: string): never => assert.fail(`INSTALLED_CONSUMER_SMOKE_STALE: ${detail}`);
  for (const file of [smokeSh, smokeTs]) if (!existsSync(file)) stale(`${file} is missing`);
  const rigManifest = JSON.parse(readFileSync("apps/development-rig/package.json", "utf8"));
  const rigDependencies = (rigManifest.dependencies ?? {}) as Record<string, string>;
  const versions = new Map<string, string>();
  for (const parent of ["packages", "apps"]) {
    if (!existsSync(parent)) continue;
    for (const entry of readdirSync(parent, { withFileTypes: true })) {
      const manifestPath = join(parent, entry.name, "package.json");
      if (!entry.isDirectory() || !existsSync(manifestPath)) continue;
      const member = JSON.parse(readFileSync(manifestPath, "utf8"));
      if (typeof member.name === "string" && typeof member.version === "string") versions.set(member.name, member.version);
    }
  }
  // npm pack names a tarball <scope>-<name>-<version>.tgz with the leading @ dropped and the scope slash a hyphen.
  const tarballName = (name: string, version: string) => `${name.replace(/^@/, "").replace("/", "-")}-${version}.tgz`;
  const shellText = readFileSync(smokeSh, "utf8");
  for (const name of [...Object.keys(rigDependencies), rigManifest.name as string]) {
    const tarball = tarballName(name, versions.get(name) ?? String(rigDependencies[name] ?? rigManifest.version));
    if (!shellText.includes(tarball)) stale(`${smokeSh} never installs ${tarball} (rig dependency or rig ${name})`);
  }
  if (!shellText.includes("PACKAGE_TARBALLS_MISSING")) stale(`${smokeSh} lost its PACKAGE_TARBALLS_MISSING refusal`);
  const listed = /EXPECTED_RIG_DEPENDENCIES\s*=\s*\[([^\]]*)\]/.exec(readFileSync(smokeTs, "utf8"));
  if (listed === null) stale(`${smokeTs} declares no EXPECTED_RIG_DEPENDENCIES list`);
  const asserted = [...listed![1]!.matchAll(/"([^"]+)"/g)].map(match => match[1]!).sort();
  const declared = Object.keys(rigDependencies).sort();
  if (JSON.stringify(asserted) !== JSON.stringify(declared)) {
    stale(`${smokeTs} EXPECTED_RIG_DEPENDENCIES ${JSON.stringify(asserted)} differs from apps/development-rig/package.json dependencies ${JSON.stringify(declared)} (missing ${JSON.stringify(declared.filter(name => !asserted.includes(name)))}, extra ${JSON.stringify(asserted.filter(name => !declared.includes(name)))})`);
  }
}
console.log("structure: pass");
