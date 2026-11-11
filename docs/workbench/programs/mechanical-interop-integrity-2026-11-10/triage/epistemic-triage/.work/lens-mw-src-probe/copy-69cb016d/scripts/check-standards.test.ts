import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, cpSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const source = resolve(import.meta.dirname, "..");
function fixture<T>(fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-standards-check-"));
  try {
    for (const file of [
      "forge.toml", "forge.workspace.toml", "package.json",
      "packages/development/forge.toml", "packages/development/package.json",
      "packages/coordination/forge.toml", "packages/coordination/package.json",
      "apps/development-rig/forge.toml", "apps/development-rig/package.json",
      "packages/development/src/contracts.ts",
      "docs/README.md", "docs/01-product-goals-and-user-journeys.md",
    ]) {
      const dest = join(root, file);
      mkdirSync(resolve(dest, ".."), { recursive: true });
      cpSync(join(source, file), dest);
    }
    cpSync(join(source, "scripts/check-standards.ts"), join(root, "check-standards.ts"));
    return fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function check(root: string) { return spawnSync(process.execPath, [join(root, "check-standards.ts")], { cwd: root, encoding: "utf8" }); }

test("standards gate accepts the committed tree subset", () => fixture(root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate rejects a non-kebab-case TypeScript filename", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/MyModule.ts"), "export const x = 1;\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /NON_KEBAB_TS_FILENAME: packages\/development\/src\/MyModule\.ts/);
}));
test("standards gate rejects a default export in library code", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/leak.ts"), "const x = 1;\nexport default x;\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DEFAULT_EXPORT_FORBIDDEN: packages\/development\/src\/leak\.ts:2/);
}));
test("standards gate rejects an extensionless relative import", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/bare.ts"), 'import { digest } from "./con' + 'tracts";\nexport const d = digest;\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /RELATIVE_IMPORT_WITHOUT_EXTENSION: packages\/development\/src\/bare\.ts:1/);
}));
test("standards gate accepts explicit .js and .ts relative imports", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/ok.ts"), 'import type { SubjectBasis } from "./contracts.js";\nexport type B = SubjectBasis;\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate rejects an extensionless dynamic import", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/dynamic.ts"), 'export const load = () => import("./con' + 'tracts");\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /RELATIVE_IMPORT_WITHOUT_EXTENSION: packages\/development\/src\/dynamic\.ts:1/);
}));
test("standards gate rejects an extensionless side-effect import", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/effect.ts"), 'import "./con' + 'tracts";\nexport const e = 1;\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /RELATIVE_IMPORT_WITHOUT_EXTENSION: packages\/development\/src\/effect\.ts:1/);
}));
test("standards gate accepts an explicit .ts relative import", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/typed.ts"), 'import type { SubjectBasis } from "./contracts.ts";\nexport type B = SubjectBasis;\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate accepts an explicit .json relative import", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/data.json"), "{}\n");
  writeFileSync(join(root, "packages/development/src/loader.ts"), 'import data from "./data.json" with { type: "json" };\nexport const d = data;\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate accepts dot-suffixed kebab-case filenames", () => fixture(root => {
  writeFileSync(join(root, "packages/development/src/widget.test.ts"), "export const t = 1;\n");
  writeFileSync(join(root, "packages/development/src/widget.v1.ts"), "export const v = 1;\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate rejects a forge build leg that declares no inputs", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  writeFileSync(file, readFileSync(file, "utf8").replace(/^typing = .*$/m, 'typing = "npm run build"'));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml typing/);
}));
test("standards gate rejects a sub-table forge build leg that declares no inputs", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^typing = .*\r?\n/m, "");
  writeFileSync(file, `${manifest}\n[build.commands.typing]\ncommand = "npm run build"\n`);
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml typing/);
}));
test("standards gate rejects a manifest whose every leg is a sub-table without inputs", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^\[build\.commands\]\r?\n[\s\S]*$/m, "");
  writeFileSync(file, `${manifest}[build.commands.typing]\ncommand = "npm run build"\n\n[build.commands.test]\ncommand = "npm test"\n`);
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml typing/);
  assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml test/);
}));
test("standards gate accepts sub-table forge build legs that declare inputs", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^\[build\.commands\]\r?\n[\s\S]*$/m, "");
  writeFileSync(file, `${manifest}[build.commands.typing]\ncommand = "npm run build"\ninputs = ["src/**/*.ts"]\n`);
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
// TOML allows indentation before a table header, spaces inside the brackets, and a trailing comment; R4 must
// still see the leg behind each of those adornments (a leg it cannot see silently escapes the inputs contract).
function plantSubTableLegs(root: string, headers: string[]) {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^\[build\.commands\]\r?\n[\s\S]*$/m, "");
  const legs = headers.map(header => `${header}\ncommand = "npm run build"\n`).join("\n");
  writeFileSync(file, `${manifest}${legs}`);
}
const adorned: Array<[string, string]> = [
  ["a trailing comment", "[build.commands.typing] # why"],
  ["inner bracket spaces", "[ build.commands.typing ]"],
  ["spaces around the dots", "[build . commands . typing]"],
  ["leading whitespace", "  [build.commands.typing]"],
  ["leading tab, inner spaces and a trailing comment", "\t[ build.commands.typing ]   # why"],
];
for (const [label, header] of adorned) {
  test(`standards gate rejects a sub-table leg whose header carries ${label} and no inputs`, () => fixture(root => {
    plantSubTableLegs(root, [header]);
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml typing/);
  }));
}
test("standards gate accepts an adorned sub-table leg header that declares inputs", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^\[build\.commands\]\r?\n[\s\S]*$/m, "");
  writeFileSync(file, `${manifest}  [ build.commands.typing ] # ok\ncommand = "npm run build"\ninputs = ["src/**/*.ts"]\n`);
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
for (const [label, header] of [
  ["a trailing comment", "[build.commands] # legs"],
  ["inner bracket spaces", "[ build.commands ]"],
  ["leading whitespace", "  [build.commands]"],
] as Array<[string, string]>) {
  test(`standards gate rejects a flat-table leg without inputs when the header carries ${label}`, () => fixture(root => {
    const file = join(root, "packages/development/forge.toml");
    const manifest = readFileSync(file, "utf8").replace(/^typing = .*\r?\n/m, "typing = { command = \"npm run build\" }\n");
    writeFileSync(file, manifest.replace(/^\[build\.commands\]/m, header));
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml typing/);
  }));
}
test("standards gate ends a flat-table body at an indented or commented following header", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8");
  writeFileSync(file, `${manifest}\n  [build.commands.extra] # tail\ncommand = "npm run build"\n`);
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml extra/);
}));
// A quoted key may hold a closing bracket (`[tool."a]b"]` is a legal header), so a body ends at any line that is
// a bracket-closed header, not only at one whose bracket content is free of `]`.
test("standards gate ends a sub-table leg body at a header whose quoted key holds a closing bracket", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^\[build\.commands\]\r?\n[\s\S]*$/m, "");
  writeFileSync(file, `${manifest}[build.commands.typing]\ncommand = "npm run build"\n\n[tool."a]b"]\ninputs = ["src/**/*.ts"]\n`);
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /FORGE_LEG_WITHOUT_INPUTS: packages\/development\/forge\.toml typing/);
}));
test("standards gate flags exactly the real leg when a flat-table body meets a quoted-bracket header", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^typing = .*\r?\n/m, "typing = { command = \"npm run build\" }\n");
  writeFileSync(file, `${manifest}\n[tool."a]b"]\ninputs = ["src/**/*.ts"]\n`);
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(p.stderr.split("\n").filter(line => line.startsWith("FORGE_LEG_WITHOUT_INPUTS")), ["FORGE_LEG_WITHOUT_INPUTS: packages/development/forge.toml typing"]);
}));
// A bracket-only line inside a multi-line array or string is a VALUE row, not a table header: R4 must neither
// truncate the leg body there (false FAIL on an inputs-bearing leg) nor let it hide a later inputs-less leg.
function plantLegBody(root: string, body: string) {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^\[build\.commands\]\r?\n[\s\S]*$/m, "");
  writeFileSync(file, `${manifest}[build.commands.typing]\ncommand = "npm run build"\n${body}`);
}
const valueRows: Array<[string, string]> = [
  ["an indented final array element", 'env = [\n  ["A", "b"]\n]\ninputs = ["src/**/*.ts"]\n'],
  ["a lone quoted element with a trailing comment", 'env = [\n  ["A"] # why\n]\ninputs = ["src/**/*.ts"]\n'],
  ["an element that closes the array on its own line", 'env = [\n  ["a", "b"]]\ninputs = ["src/**/*.ts"]\n'],
  ["a header-shaped row inside a multi-line string", 'note = """\n[build.commands.fake]\n"""\ninputs = ["src/**/*.ts"]\n'],
];
for (const [label, body] of valueRows) {
  test(`standards gate keeps reading a leg body past ${label}`, () => fixture(root => {
    plantLegBody(root, body);
    const p = check(root);
    assert.equal(p.status, 0, p.stderr);
  }));
}
test("standards gate still flags an inputs-less leg whose body holds a bracket-only array element", () => fixture(root => {
  plantLegBody(root, 'env = [\n  ["A", "b"]\n]\n\n[tool.other]\ninputs = ["src/**/*.ts"]\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(p.stderr.split("\n").filter(line => line.startsWith("FORGE_LEG_WITHOUT_INPUTS")), ["FORGE_LEG_WITHOUT_INPUTS: packages/development/forge.toml typing"]);
}));
test("standards gate flags only the inputs-less leg when a bracket-only element precedes two legs", () => fixture(root => {
  plantLegBody(root, 'env = [\n  ["A"]\n]\ninputs = ["src/**/*.ts"]\n\n[build.commands.lint]\ncommand = "npm run lint"\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(p.stderr.split("\n").filter(line => line.startsWith("FORGE_LEG_WITHOUT_INPUTS")), ["FORGE_LEG_WITHOUT_INPUTS: packages/development/forge.toml lint"]);
}));
// The table scanner must keep its string, comment and multi-line state exact: a closed string, an unbalanced
// bracket inside a comment, or a bracket inside a quoted value must not swallow the next real leg header.
const flaggedLegs = (stderr: string) => stderr.split("\n").filter(line => line.startsWith("FORGE_LEG_WITHOUT_INPUTS"));
const lintOnly = ["FORGE_LEG_WITHOUT_INPUTS: packages/development/forge.toml lint"];
const lexingRows: Array<[string, string]> = [
  ["a closed multi-line basic string", 'note = """\nabout\n"""\ninputs = ["src/**/*.ts"]\n'],
  ["a closed multi-line literal string holding a header-shaped row", "note = '''\n[build.commands.fake]\n'''\ninputs = [\"src/**/*.ts\"]\n"],
  ["a value comment holding an unbalanced opening bracket", 'timeout = 600 # [legacy\ninputs = ["src/**/*.ts"]\n'],
  ["a basic string holding an opening bracket and a hash", 'note = "echo [#1"\ninputs = ["src/**/*.ts"]\n'],
  ["a literal string holding an opening bracket and a hash", "note = 'echo [#1'\ninputs = [\"src/**/*.ts\"]\n"],
  ["a basic string whose escaped quote precedes a bracket", 'note = "a\\" [b"\ninputs = ["src/**/*.ts"]\n'],
  ["a multi-line basic string holding an escaped triple quote", 'note = """\nabc \\""" still\ninside\n"""\ninputs = ["src/**/*.ts"]\n'],
  ["a multi-line literal string holding a backslash before its closing quotes", "note = '''\nabc \\'''\ninputs = [\"src/**/*.ts\"]\n"],
  ["a multi-line basic string holding an escaped backslash before its closing quotes", 'note = """\nabc \\\\"""\ninputs = ["src/**/*.ts"]\n'],
];
for (const [label, body] of lexingRows) {
  test(`standards gate still sees the next leg header after ${label}`, () => fixture(root => {
    plantLegBody(root, `${body}\n[build.commands.lint]\ncommand = "npm run lint"\n`);
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.deepEqual(flaggedLegs(p.stderr), lintOnly);
  }));
}
test("standards gate flags an inputs-less flat leg under a header with spaces around the dot", () => fixture(root => {
  for (const header of ["[build . commands]", "[ build . commands ]"]) {
    const file = join(root, "packages/development/forge.toml");
    const manifest = readFileSync(file, "utf8").replace(/^(\[ ?build ?\. ?commands ?\]|\[build\.commands\])/m, header).replace(/^typing = .*\r?\n/m, "typing = { command = \"npm run build\" }\n");
    writeFileSync(file, manifest);
    const p = check(root);
    assert.notEqual(p.status, 0, header);
    assert.deepEqual(flaggedLegs(p.stderr), ["FORGE_LEG_WITHOUT_INPUTS: packages/development/forge.toml typing"], header);
  }
}));
// Reading zero legs is indistinguishable from "every leg has inputs", so prove each committed manifest that
// declares build.commands yields legs: hiding every inputs key must flag at least one leg in that manifest.
test("standards gate reads at least one leg from every committed manifest that declares build.commands", () => fixture(root => {
  let declared = 0;
  for (const rel of ["forge.toml", "packages/development/forge.toml", "packages/coordination/forge.toml", "apps/development-rig/forge.toml"]) {
    const file = join(root, rel);
    const manifest = readFileSync(file, "utf8");
    if (!/^\s*\[\s*build\s*\.\s*commands/m.test(manifest)) continue;
    declared++;
    writeFileSync(file, manifest.replace(/\binputs(\s*=)/g, "xinputs$1"));
    const p = check(root);
    writeFileSync(file, manifest);
    assert.notEqual(p.status, 0, rel);
    assert.match(p.stderr, new RegExp(`FORGE_LEG_WITHOUT_INPUTS: ${rel.replace(/[.\\/]/g, "\\$&")} `), rel);
  }
  assert.ok(declared >= 1, "no committed manifest declares build.commands");
}));
// R4 body forms (MechanicalWorkflows-7m9e): a flat-table leg may be written as dotted keys (`typing.command = ...`),
// and an inline-table leg declares inputs only through a real top-level `inputs` key, never through text inside
// a string value or a nested inline table.
function plantFlatLegs(root: string, legs: string) {
  const file = join(root, "packages/development/forge.toml");
  const manifest = readFileSync(file, "utf8").replace(/^typing = .*\r?\n/m, "");
  writeFileSync(file, manifest.replace(/^\[build\.commands\]\r?\n/m, `[build.commands]\n${legs}\n`));
}
function legFailures(stderr: string): string[] {
  return stderr.split("\n").filter(line => line.startsWith("FORGE_LEG_WITHOUT_INPUTS")).map(line => line.replace(/^.*forge\.toml /, ""));
}
test("standards gate rejects a dotted-key flat leg that declares no inputs", () => fixture(root => {
  plantFlatLegs(root, 'typing.command = "npm run build"');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing"]);
}));
test("standards gate examines every dotted-key leg and flags only the one without inputs", () => fixture(root => {
  plantFlatLegs(root, 'typing.command = "npm run build"\ntyping.inputs = ["src/**/*.ts"]\nlint.command = "npm run lint"');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["lint"]);
}));
test("standards gate accepts a dotted-key flat leg that declares inputs, spaces around the dots included", () => fixture(root => {
  plantFlatLegs(root, 'typing.command = "npm run build"\ntyping . inputs = ["src/**/*.ts"]\nlint . command = "npm run lint"\nlint.inputs = ["src/**/*.ts"]');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate does not count a nested dotted key named inputs as the leg's inputs", () => fixture(root => {
  plantFlatLegs(root, 'typing.command = "npm run build"\ntyping.env.inputs = "x"');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing"]);
}));
test("standards gate rejects a dotted-key flat leg under a CRLF manifest", () => fixture(root => {
  const file = join(root, "packages/development/forge.toml");
  plantFlatLegs(root, 'typing.command = "npm run build"');
  writeFileSync(file, readFileSync(file, "utf8").replace(/\n/g, "\r\n"));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing"]);
}));
test("standards gate rejects an inline leg whose command text contains inputs = ", () => fixture(root => {
  plantFlatLegs(root, 'typing = { command = "echo inputs = none" }');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing"]);
}));
test("standards gate rejects an inline leg whose only inputs key sits in a nested inline table", () => fixture(root => {
  plantFlatLegs(root, 'typing = { command = "npm run build", env = { inputs = "x" } }\nlint = { command = "npm run lint", env = { A = "1", inputs = "x" } }');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing", "lint"]);
}));
test("standards gate rejects an inline leg whose literal-string or array value mentions inputs = ", () => fixture(root => {
  plantFlatLegs(root, "typing = { command = 'echo inputs = none' }\nlint = { command = \"npm run lint\", args = [\"inputs = 1\"] }\ndocs = { command = \"echo a, inputs = none\" }\nquote = { command = \"echo \\\" , inputs = none\" }");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing", "lint", "docs", "quote"]);
}));
test("standards gate accepts an inline leg whose real inputs key follows strings holding commas, braces and inputs = ", () => fixture(root => {
  plantFlatLegs(root, 'typing = { command = "echo a, {b}, inputs = none", inputs = ["src/**/*.ts"] }\nlint = { command = "echo }]", inputs = ["src/**/*.ts"] } # why\ndocs = { inputs = ["src/**/*.ts"], command = "npm run docs" }\ncheck = { "inputs" = ["src/**/*.ts"], command = "npm run check" }');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("standards gate keeps rejecting a sub-table leg whose command text contains inputs = ", () => fixture(root => {
  plantLegBody(root, "");
  const file = join(root, "packages/development/forge.toml");
  writeFileSync(file, readFileSync(file, "utf8").replace('command = "npm run build"', 'command = "echo inputs = none"'));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.deepEqual(legFailures(p.stderr), ["typing"]);
}));
test("standards gate rejects a stray unnumbered top-level doc", () => fixture(root => {
  writeFileSync(join(root, "docs/notes.md"), "# Notes\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DOC_FILENAME_NOT_NUMBERED_KEBAB: docs\/notes\.md/);
}));
