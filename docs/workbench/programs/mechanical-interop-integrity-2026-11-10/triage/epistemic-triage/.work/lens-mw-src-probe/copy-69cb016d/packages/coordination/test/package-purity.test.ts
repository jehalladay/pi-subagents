import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { reconcile } from "../dist/index.js";
import type { Basis, Budget, Intent, Proposal, ResourceClaim } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, "../src");
const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 10, workers: 2, queue: 4, latencyMs: 1000 };
const zero: ResourceClaim = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };

// The single sanctioned non-relative module: a pure sha256 digest with no I/O.
const SANCTIONED: ReadonlyMap<string, readonly string[]> = new Map([["canonical.ts", ["node:crypto"]]]);
const EFFECT_TOKEN = /\bimport\s*\(|\brequire\s*\(|\bprocess\s*\.|\bfetch\s*\(|\bglobalThis\b|\bsetTimeout\b|\bsetInterval\b|\bspawn\s*\(|(?<![\w$])exec(?:FileSync|File|Sync)\s*\(|(?<![\w.$])exec\s*\(/;

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}
// Anchored on statement context so a quoted `from` property key never reads as a specifier: an `import`/`export ... from`
// clause that starts a line or follows a `;`, `{` or `}` (multi-line clauses allowed), or a side-effect `import "x"`.
const IMPORT_CLAUSE = /(?:^|[;{}])[ \t]*(?:import|export)\b[^;"'`]*?\bfrom\s*(["'])([^"'\n]*)\1|(?:^|[;{}])[ \t]*import\s*(["'])([^"'\n]*)\3/gm;
function specifiersOf(source: string): string[] {
  return [...source.matchAll(IMPORT_CLAUSE)].map(match => match[2] ?? match[4]!);
}
function violations(file: string, source: string): string[] {
  const code = stripComments(source);
  const allowed = SANCTIONED.get(file) ?? [];
  const found: string[] = [];
  for (const specifier of specifiersOf(code)) {
    if (!/^\.\.?\//.test(specifier) && !allowed.includes(specifier)) found.push(`specifier ${specifier}`);
  }
  const token = EFFECT_TOKEN.exec(code);
  if (token !== null) found.push(`token ${token[0]}`);
  return found;
}
function intent(overrides: Partial<Intent> & { intentId: string }): Intent {
  return {
    policyId: "gp-host-adapter", target: { kind: "candidate", uri: "cand:a" }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 10 }, evidenceRefs: [], writeScopes: ["main"], readScopes: [],
    ...overrides,
  };
}
function proposal(...intents: Intent[]): Proposal<Intent, null> { return { intents, memory: null, trace: [] }; }

test("pin gutu p1: every coordination source file imports only relative modules plus the one sanctioned pure digest builtin and holds no effect token", () => {
  const files = readdirSync(srcDir).filter(name => name.endsWith(".ts")).sort();
  assert.ok(files.length >= 15, `scanned ${files.length} source files`);
  assert.ok(files.includes("canonical.ts") && files.includes("resolver.ts") && files.includes("index.ts"));
  for (const file of files) assert.deepEqual(violations(file, readFileSync(join(srcDir, file), "utf8")), [], file);
  assert.deepEqual(specifiersOf(stripComments(readFileSync(join(srcDir, "canonical.ts"), "utf8"))), ["node:crypto"]);
});

test("pin gutu p2: the scan is not vacuous, since it refuses each forbidden builtin, bare package, dynamic import and effect call in a probe source", () => {
  for (const specifier of ["node:child_process", "node:fs", "node:net", "node:http", "node:https", "node:worker_threads", "child_process", "fs", "left-pad", "@mechanical/workflows-library"]) {
    assert.deepEqual(violations("resolver.ts", `import x from "${specifier}";`), [`specifier ${specifier}`], specifier);
    assert.deepEqual(violations("resolver.ts", `import y from '${specifier}';`), [`specifier ${specifier}`], specifier);
  }
  assert.deepEqual(violations("resolver.ts", `import { a } from "./canonical.js";`), []);
  assert.deepEqual(violations("resolver.ts", `import { createHash } from "node:crypto";`), ["specifier node:crypto"]);
  assert.deepEqual(violations("canonical.ts", `import { createHash } from "node:crypto";`), []);
  assert.deepEqual(violations("canonical.ts", `import { exec } from "node:child_process";`), ["specifier node:child_process"]);
  for (const probe of ['await import("x");', 'require("x");', "process.env.X;", "fetch(url);", "spawn(cmd);", "execFile(cmd);", "setTimeout(f, 1);", "exec(cmd);", "execSync(cmd);", "execFileSync(cmd);", "globalThis.x;", "setInterval(f, 1);"]) {
    assert.equal(violations("resolver.ts", probe).length, 1, probe);
  }
  // gutu follow-up (G01): the exec family is one rule, so a bare exec, execSync or execFileSync call reports its own token.
  assert.deepEqual(violations("resolver.ts", "exec(cmd);"), ["token exec("]);
  assert.deepEqual(violations("resolver.ts", "execSync(cmd);"), ["token execSync("]);
  assert.deepEqual(violations("resolver.ts", "execFileSync(cmd);"), ["token execFileSync("]);
  // Negative controls: a RegExp .exec call (graph-reader.ts and elastic-landing.ts carry such sites) is not an exec-family effect.
  assert.deepEqual(violations("resolver.ts", "/x/.exec(s);"), []);
  assert.deepEqual(violations("resolver.ts", "const m = pattern.exec(s);"), []);
  // ibdh follow-up (W1): the rule exempts only a RegExp .exec call, so a member execFile or execSync call (cp.execFile) still reports its token.
  assert.deepEqual(violations("resolver.ts", "cp.execFile(cmd);"), ["token execFile("]);
  assert.deepEqual(violations("resolver.ts", "cp.execSync(cmd);"), ["token execSync("]);
  // ibdh follow-up (W2): a dollar or word character before exec belongs to another identifier ($exec, reexec), which is no exec-family call.
  assert.deepEqual(violations("resolver.ts", "$exec(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "reexec(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "$execFile(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "reexecSync(cmd);"), []);
  // ibdh follow-up (W3): whitespace between the name and the parenthesis does not hide a bare exec call.
  assert.deepEqual(violations("resolver.ts", "exec (cmd);"), ["token exec ("]);
  // c0c3 (ibdh follow-up): the exec-family alternative allows whitespace too, a second space is read as whitespace, and the word-class lookbehinds hold for underscore and uppercase.
  assert.deepEqual(violations("resolver.ts", "execFile (cmd);"), ["token execFile ("]);
  assert.deepEqual(violations("resolver.ts", "cp.execSync (cmd);"), ["token execSync ("]);
  assert.deepEqual(violations("resolver.ts", "exec  (cmd);"), ["token exec  ("]);
  assert.deepEqual(violations("resolver.ts", "_exec(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "X_execFile(cmd);"), []);
  // dl40 (c0c3 follow-up): an uppercase or digit directly before exec or execFile belongs to another identifier too, and the exec-family alternative reads two spaces as whitespace.
  assert.deepEqual(violations("resolver.ts", "Xexec(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "XexecFile(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "execFile  (cmd);"), ["token execFile  ("]);
  assert.deepEqual(violations("resolver.ts", "v1exec(cmd);"), []);
  assert.deepEqual(violations("resolver.ts", "v1execSync(cmd);"), []);
  // u5jq (dl40 follow-up): a tab between the name and the parenthesis is whitespace to both exec alternatives, so neither narrows to a space run.
  assert.deepEqual(violations("resolver.ts", "execFile\t(cmd);"), ["token execFile\t("]);
  assert.deepEqual(violations("resolver.ts", "exec\t(cmd);"), ["token exec\t("]);
  // n0u6 (u5jq follow-up): a newline and a no-break space (U+00A0) between the name and the parenthesis are whitespace to both exec alternatives too, so neither narrows to a space-and-tab run; these four rows pin space, tab, newline and no-break space; the full class is pinned by the uv7v rows below.
  assert.deepEqual(violations("resolver.ts", "execFile\n(cmd);"), ["token execFile\n("]);
  assert.deepEqual(violations("resolver.ts", "exec\n(cmd);"), ["token exec\n("]);
  assert.deepEqual(violations("resolver.ts", "execFile\u00a0(cmd);"), ["token execFile\u00a0("]);
  assert.deepEqual(violations("resolver.ts", "exec\u00a0(cmd);"), ["token exec\u00a0("]);
  // uv7v (n0u6 follow-up): one run of every code point JS \s matches at each of the seven \s* spots of EFFECT_TOKEN, so no further one-shape lane is needed.
  const WS = "\t\n\v\f\r                  　﻿";
  const bmpWhitespace = Array.from({ length: 0x10000 }, (_, i) => i).filter(i => /\s/.test(String.fromCharCode(i)));
  assert.deepEqual(Array.from(WS, ch => ch.charCodeAt(0)), bmpWhitespace, "uv7v WU0: the constant holds exactly the BMP code points the live \\s matches, in order");
  assert.equal(bmpWhitespace.length, 25, "uv7v WU0: the live \\s matches 25 BMP code points");
  assert.deepEqual(violations("resolver.ts", "execFile" + WS + "(cmd);"), ["token execFile" + WS + "("], "uv7v WU1: execFile followed by every whitespace code point still reports its token");
  assert.deepEqual(violations("resolver.ts", "exec" + WS + "(cmd);"), ["token exec" + WS + "("], "uv7v WU2: a bare exec followed by every whitespace code point still reports its token");
  assert.deepEqual(violations("resolver.ts", 'await import' + WS + '("x");'), ["token import" + WS + "("], "uv7v WI1: a dynamic import followed by every whitespace code point still reports its token");
  assert.deepEqual(violations("resolver.ts", 'require' + WS + '("x");'), ["token require" + WS + "("], "uv7v WQ1: require followed by every whitespace code point still reports its token");
  assert.deepEqual(violations("resolver.ts", "process" + WS + ".env.X;"), ["token process" + WS + "."], "uv7v WP1: process followed by every whitespace code point before a dot still reports its token");
  assert.deepEqual(violations("resolver.ts", "fetch" + WS + "(url);"), ["token fetch" + WS + "("], "uv7v WF1: fetch followed by every whitespace code point still reports its token");
  assert.deepEqual(violations("resolver.ts", "spawn" + WS + "(cmd);"), ["token spawn" + WS + "("], "uv7v WS1: spawn followed by every whitespace code point still reports its token");
  // gutu follow-up (T01): a side-effect `import "x"` clause, in either quote style, is read as a specifier.
  assert.deepEqual(violations("resolver.ts", 'import "node:fs";'), ["specifier node:fs"]);
  assert.deepEqual(violations("resolver.ts", "import 'node:fs';"), ["specifier node:fs"]);
  assert.deepEqual(violations("resolver.ts", '// import x from "node:fs";\n/* process.env */\nconst ok = 1;'), []);
  // A quoted `from` property key is not an import clause (gutu repair: the scan once read ["from", "to"] and edge["from"] as specifiers).
  assert.deepEqual(violations("resolver.ts", 'const keys = ["from", "to"];'), []);
  assert.deepEqual(violations("resolver.ts", 'const ok = !ids.has(edge["from"]) || !ids.has(edge["to"]);'), []);
  assert.deepEqual(violations("resolver.ts", "const t = `${edge[\"from\"]} -> ${edge[\"to\"]}`;"), []);
  assert.deepEqual(violations("resolver.ts", 'import {\n  a,\n  b\n} from "node:fs";\nconst keys = ["from", "to"];'), ["specifier node:fs"]);
  // ufhd follow-up: a module clause after a closing brace on the same line still counts.
  assert.deepEqual(violations("resolver.ts", 'function f() { return 1 } export { a } from "node:fs";'), ["specifier node:fs"]);
  assert.deepEqual(violations("resolver.ts", 'function f() { return 1 } import "node:fs";'), ["specifier node:fs"]);
  // fwxn: the opening-brace half of the statement anchor is pinned too, in both the from-clause and the side-effect alternatives.
  assert.deepEqual(violations("resolver.ts", 'declare module "m" { export * from "node:fs"; }'), ["specifier node:fs"]);
  assert.deepEqual(violations("resolver.ts", 'declare module "m" { import "node:fs"; }'), ["specifier node:fs"]);
  // 10kv (fwxn follow-up): the semicolon half of the statement anchor is pinned too, in both the from-clause and the side-effect alternatives.
  assert.deepEqual(violations("resolver.ts", 'const a = 1; export { b } from "node:fs";'), ["specifier node:fs"]);
  assert.deepEqual(violations("resolver.ts", 'const a = 1; import "node:fs";'), ["specifier node:fs"]);
});

test("pin gutu p3: the coordination package declares no runtime, peer or optional dependency", () => {
  const manifest = JSON.parse(readFileSync(join(here, "../package.json"), "utf8")) as Record<string, unknown>;
  for (const key of ["dependencies", "peerDependencies", "optionalDependencies", "bundledDependencies"]) assert.equal(manifest[key], undefined, key);
});

test("pin gutu p4: reconcile rejects an adapter intent carrying authorized-effect with INTENT_AUTHORITY_EXCEEDED, so it is absent from admitted and consumes no budget", () => {
  const host = intent({ intentId: "gp:1", authority: "authorized-effect" } as Partial<Intent> & { intentId: string });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(host)] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(r.rejected.map(x => `${x.intent.intentId}:${x.code}`), ["gp:1:INTENT_AUTHORITY_EXCEEDED"]);
  assert.deepEqual(r.conflicts, []);
  assert.deepEqual(r.budgetUsed, zero);
});
