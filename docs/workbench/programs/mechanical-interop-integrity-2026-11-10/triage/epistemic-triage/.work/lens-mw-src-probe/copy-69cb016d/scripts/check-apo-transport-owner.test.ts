import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

// APO-EAT-R015 (MechanicalWorkflows-3o7k): checkpoint parameter remapping for
// rewrites belongs to MicroPolicyCli as a TARGET public API; MechanicalWorkflows
// emits only a named semantic parameter map and takes no @micro-policy dependency.
const root = resolve(import.meta.dirname, "..");
const programDir = join(root, "docs/programs/adaptive-policy-organizations-2026-10-18");

// 1-based line numbers named by the requirement's acceptance text.
const OWNER_LINES: ReadonlyArray<{ file: string; line: number; code: string }> = [
  { file: "README.md", line: 31, code: "README_L31_TRANSPORT_OWNER_UNLABELED" },
  { file: "07-rewrite-lifecycle.md", line: 13, code: "LIFECYCLE_L13_TRANSPORT_OWNER_UNLABELED" },
  { file: "14-worked-example.md", line: 13, code: "WORKED_EXAMPLE_L13_TRANSPORT_OWNER_UNLABELED" },
];

function ownerLineViolation(text: string, line: number, code: string): string[] {
  const row = text.split("\n")[line - 1] ?? "";
  const namesOwner = /MicroPolicyCli|\bMP\b/.test(row);
  const labelsTarget = /\bTARGET\b/.test(row);
  const namesRemap = /remap|transport/i.test(row);
  return namesOwner && labelsTarget && namesRemap ? [] : [code];
}

function docViolations(read: (file: string) => string): string[] {
  return OWNER_LINES.flatMap(({ file, line, code }) => ownerLineViolation(read(file), line, code));
}

const isSourceFile = (name: string): boolean => /\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(name);

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...sourceFiles(path));
    else if (isSourceFile(name)) out.push(path);
  }
  return out;
}

// A quoted @micro-policy specifier: a from clause, a bare side-effect import, or a call form
// (require or dynamic import) with optional whitespace and block comments before the quote. The comment body
// (?:[^*]|\*(?!\/))* has one way to match each comment, so a run of comments with no specifier scans linearly.
const SOURCE_SPECIFIER = /from\s*["']@micro-policy|require\s*\(\s*(?:\/\*(?:[^*]|\*(?!\/))*\*\/\s*)*["'`]@micro-policy|\bimport\s*\(\s*(?:\/\*(?:[^*]|\*(?!\/))*\*\/\s*)*["'`]@micro-policy|\bimport\s*["']@micro-policy/;

function dependencyViolations(packageJsonTexts: readonly string[], sources: readonly string[]): string[] {
  const violations: string[] = [];
  for (const text of packageJsonTexts) {
    const pkg = JSON.parse(text) as Record<string, Record<string, string> | undefined>;
    const declared = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]
      .flatMap(key => Object.keys(pkg[key] ?? {}));
    if (declared.some(name => name.startsWith("@micro-policy/") || name === "@micro-policy")) violations.push("PACKAGE_DECLARES_MICRO_POLICY");
  }
  if (sources.some(text => SOURCE_SPECIFIER.test(text))) violations.push("SOURCE_IMPORTS_MICRO_POLICY");
  return violations;
}

const readProgram = (file: string): string => readFileSync(join(programDir, file), "utf8");

test("APO-EAT-R015: README L31, 07 L13 and 14 L13 name MP as the transport owner with the API labeled TARGET", () => {
  assert.deepEqual(docViolations(readProgram), []);
});

test("APO-EAT-R015: no package.json declares and no src file imports @micro-policy", () => {
  const packageJsons: string[] = [];
  const sources: string[] = [];
  for (const group of ["packages", "apps"]) {
    for (const name of readdirSync(join(root, group))) {
      const base = join(root, group, name);
      if (!statSync(base).isDirectory()) continue;
      try { packageJsons.push(readFileSync(join(base, "package.json"), "utf8")); } catch { /* member without a manifest */ }
      try { for (const file of sourceFiles(join(base, "src"))) sources.push(readFileSync(file, "utf8")); } catch { /* member without src */ }
    }
  }
  assert.ok(packageJsons.length >= 2, "expected at least two workspace manifests to be audited");
  assert.ok(sources.length >= 10, "expected the src audit to read real source files");
  assert.deepEqual(dependencyViolations(packageJsons, sources), []);
});

test("APO-EAT-R015 control: each owner line fails independently when only its clause is removed", () => {
  const swap = (file: string, from: RegExp, to: string) => (name: string) => name === file ? readProgram(name).split("\n").map((row, i) => i === OWNER_LINES.find(o => o.file === file)!.line - 1 ? row.replace(from, to) : row).join("\n") : readProgram(name);
  assert.deepEqual(docViolations(swap("README.md", /\(TARGET API\)/, "(API)")), ["README_L31_TRANSPORT_OWNER_UNLABELED"]);
  assert.deepEqual(docViolations(swap("14-worked-example.md", /\(TARGET; none at [0-9a-f]+\)/, "(none)")), ["WORKED_EXAMPLE_L13_TRANSPORT_OWNER_UNLABELED"]);
  assert.deepEqual(docViolations(swap("07-rewrite-lifecycle.md", /MicroPolicyCli/g, "the adapter")), ["LIFECYCLE_L13_TRANSPORT_OWNER_UNLABELED"]);
  assert.deepEqual(docViolations(swap("README.md", /remap|transport/gi, "carry")), ["README_L31_TRANSPORT_OWNER_UNLABELED"]);
  assert.deepEqual(docViolations(swap("07-rewrite-lifecycle.md", /remap|transport/gi, "carry")), ["LIFECYCLE_L13_TRANSPORT_OWNER_UNLABELED"]);
  assert.deepEqual(docViolations(swap("14-worked-example.md", /remap|transport/gi, "carry")), ["WORKED_EXAMPLE_L13_TRANSPORT_OWNER_UNLABELED"]);
});

test("APO-EAT-R015 control: a declared dependency and an import are each detected", () => {
  const clean = JSON.stringify({ name: "x", dependencies: { zod: "1.0.0" } });
  const dirty = JSON.stringify({ name: "x", dependencies: { "@micro-policy/core": "1.0.0" } });
  assert.deepEqual(dependencyViolations([clean], ['import { a } from "./a.js";']), []);
  assert.deepEqual(dependencyViolations([dirty], []), ["PACKAGE_DECLARES_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['import { mp } from "@micro-policy/core";']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['import "@micro-policy/core";']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ["import '@micro-policy/core';"]), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['void import(`@micro-policy/core`);']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['const m = require(`@micro-policy/core`);']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['import { mp } from"@micro-policy/core";']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['import type{ Checkpoint }from"@micro-policy/core";']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['import { a } from"./a.js";']), []);
  assert.deepEqual(dependencyViolations([clean], ['void import(`./lazy.js`);']), []);
  assert.deepEqual(dependencyViolations([clean], ['void import ("@micro-policy/core");']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['const m = require ("@micro-policy/core");']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['void import(/* lazy */ "@micro-policy/core");']), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  assert.deepEqual(dependencyViolations([clean], ['const a = require("./a.js");']), []);
  assert.deepEqual(dependencyViolations([clean], ['void import ("./b.js");']), []);
  // k consecutive block comments: the failing path (no specifier) must scan linearly, not backtrack.
  const comments = (k: number): string => "/** c **/ ".repeat(k);
  const SCAN_K = 28;
  const SCAN_BUDGET_MS = 500;
  for (const call of ["require", "import"]) {
    const started = performance.now();
    assert.deepEqual(dependencyViolations([clean], [`void ${call}(${comments(SCAN_K)}'other-pkg');`]), []);
    const elapsed = performance.now() - started;
    assert.ok(elapsed < SCAN_BUDGET_MS, `${call}( with ${SCAN_K} block comments and no specifier took ${elapsed.toFixed(1)} ms, budget ${SCAN_BUDGET_MS} ms`);
    assert.deepEqual(dependencyViolations([clean], [`void ${call}(${comments(SCAN_K)}'@micro-policy/core');`]), ["SOURCE_IMPORTS_MICRO_POLICY"]);
  }
  assert.ok(!SOURCE_SPECIFIER.source.includes("[\\s\\S]*?"), "the comment loop body must not use the ambiguous lazy any-character run");
  // Structural pin, independent of host speed: both comment loops keep the exact committed one-way body, so an ambiguous
  // body such as (?:.|\n)*? or [^]*? that a fast host could run under the timing budget still fails here.
  const commentLoop = String.raw`\/\*(?:[^*]|\*(?!\/))*\*\/\s*`;
  assert.equal(SOURCE_SPECIFIER.source.split(commentLoop).length - 1, 2, "both call forms must keep the exact committed comment loop");
  for (const name of ["x.ts", "x.tsx", "x.mts", "x.cts", "x.js", "x.mjs", "x.cjs"]) assert.ok(isSourceFile(name), `${name} is audited source`);
  for (const name of ["x.json", "x.md", "x.d.cts.map"]) assert.ok(!isSourceFile(name), `${name} is not audited source`);
});

test("APO-EAT-R015 control: the sourceFiles walker lists all seven source extensions, skips node_modules, dist and non-source names, and reads a planted .cts or .cjs violator", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-owner-audit-walk-"));
  try {
    mkdirSync(join(dir, "nested"));
    mkdirSync(join(dir, "node_modules"));
    mkdirSync(join(dir, "dist"));
    const sourceNames = ["x.ts", "x.tsx", "x.mts", "x.cts", "x.js", "x.mjs", "x.cjs", "nested/y.ts"];
    for (const name of [...sourceNames, "x.json", "x.md", "x.d.cts.map", "node_modules/z.ts", "dist/w.js"]) writeFileSync(join(dir, name), "export const clean = 1;\n");
    const listed = sourceFiles(dir).map(path => relative(dir, path)).sort();
    assert.deepEqual(listed, [...sourceNames].sort());
    const read = (): string[] => sourceFiles(dir).map(path => readFileSync(path, "utf8"));
    assert.deepEqual(dependencyViolations([], read()), []);
    for (const planted of ["x.cts", "x.cjs"]) {
      writeFileSync(join(dir, planted), 'const m = require("@micro-policy/core");\n');
      assert.deepEqual(dependencyViolations([], read()), ["SOURCE_IMPORTS_MICRO_POLICY"], `${planted} is read by the walk`);
      writeFileSync(join(dir, planted), "export const clean = 1;\n");
      assert.deepEqual(dependencyViolations([], read()), []);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
