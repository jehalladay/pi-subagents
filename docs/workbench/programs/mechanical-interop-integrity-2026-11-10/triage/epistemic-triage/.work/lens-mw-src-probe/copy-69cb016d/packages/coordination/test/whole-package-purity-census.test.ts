import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import childProcess from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// PIWBA MW-R7 EAT-R104 (MechanicalWorkflows-cp1xk): the whole coordination package, not one module at a time, performs no
// clock read, randomness, environment read or network call, and importing its entry point makes no filesystem or
// child-process call. The structure gate (scripts/check-structure.ts, COORDINATION_IO_IMPORT_FORBIDDEN) owns the import
// specifier census; this file owns the token census and the import-time spy.
const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, "../src");
const distDir = join(here, "../dist");

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}
const SIDE_EFFECT_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["process.", /(?<![\w$.])process\s*\./],
  ["Date.now", /(?<![\w$.])Date\s*\.\s*now\b/],
  ["new Date(", /\bnew\s+Date\s*\(/],
  ["Math.random", /(?<![\w$.])Math\s*\.\s*random\b/],
  ["fetch(", /(?<![\w$.])fetch\s*\(/],
];
function tokensIn(source: string): string[] {
  const code = stripComments(source);
  return SIDE_EFFECT_TOKENS.filter(([, pattern]) => pattern.test(code)).map(([name]) => name);
}
function walkTs(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts"))
    .map(entry => join(entry.parentPath, entry.name))
    .sort();
}

test("cp1xk census: no source module under packages/coordination/src holds process., Date.now, new Date(, Math.random or fetch( outside comments", () => {
  const files = walkTs(srcDir);
  assert.ok(files.length >= 80, `scanned ${files.length} source files`);
  assert.ok(files.some(file => file.endsWith("resolver.ts")) && files.some(file => file.endsWith("canonical.ts")));
  const found: string[] = [];
  for (const file of files) for (const token of tokensIn(readFileSync(file, "utf8"))) found.push(`${file}: ${token}`);
  assert.deepEqual(found, []);
});

test("cp1xk census: the token scan is not vacuous, since it names each forbidden token in a probe and ignores comments and look-alikes", () => {
  assert.deepEqual(tokensIn("const a = process.env.X;"), ["process."]);
  assert.deepEqual(tokensIn("const a = Date.now();"), ["Date.now"]);
  assert.deepEqual(tokensIn("const a = new Date(0);"), ["new Date("]);
  assert.deepEqual(tokensIn("const a = Math.random();"), ["Math.random"]);
  assert.deepEqual(tokensIn("const a = await fetch(url);"), ["fetch("]);
  assert.deepEqual(tokensIn("const a = process . env;\nconst b = Date\n.now();"), ["process.", "Date.now"]);
  assert.deepEqual(tokensIn("// process.env, Date.now(), fetch(x)\n/* Math.random() new Date(0) */\nexport const ok = 1;"), []);
  // Look-alikes: a property named fetch, a member called process, a Date type annotation and a prefetch identifier.
  assert.deepEqual(tokensIn("const a = cache.fetch(1);\nconst b = x.process.y;\nconst c: Date = d;\nprefetch(1);\nconst e = reprocess.x;"), []);
});

// Fresh module graph per attempt (a unique query string), patching the CommonJS objects behind the node:fs and node:child_process
// default exports and re-syncing the ES named exports; the spy only sees evaluation that happens after it is installed.
// readSync takes a file descriptor the loader opened itself; the package would need openSync (spied, path-keyed) to get one.
const SPIED_FS = ["readFileSync", "readdirSync", "statSync", "lstatSync", "existsSync", "openSync", "writeFileSync", "appendFileSync", "mkdirSync", "rmSync", "unlinkSync", "readFile", "writeFile", "readdir", "stat", "open", "createReadStream", "createWriteStream", "watch"] as const;
const SPIED_CP = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"] as const;
async function importCalls(entry: string, loaded: ReadonlyArray<string>): Promise<string[]> {
  const calls: string[] = [];
  const restore: Array<() => void> = [];
  const patch = (target: Record<string, unknown>, label: string, names: readonly string[]) => {
    for (const name of names) {
      const original = target[name];
      if (typeof original !== "function") continue;
      target[name] = function (this: unknown, ...args: unknown[]) {
        const first = args[0];
        const where = first instanceof URL ? fileURLToPath(first) : typeof first === "string" ? first : "";
        // The module loader's own reads of the module graph being imported are not the package's I/O.
        if (!loaded.includes(resolve(where))) calls.push(`${label}.${name}(${where})`);
        return (original as (...a: unknown[]) => unknown).apply(this, args);
      };
      restore.push(() => { target[name] = original; });
    }
  };
  patch(fs as unknown as Record<string, unknown>, "fs", SPIED_FS);
  patch(childProcess as unknown as Record<string, unknown>, "child_process", SPIED_CP);
  syncBuiltinESMExports();
  try { await import(`${pathToFileURL(entry).href}?spy=${calls.length}-${Date.now()}`); }
  finally { for (const undo of restore) undo(); syncBuiltinESMExports(); }
  return calls;
}

test("cp1xk census: importing packages/coordination/dist/index.js performs no filesystem or child-process call", async () => {
  const entry = join(distDir, "index.js");
  const loaded = readdirSync(distDir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".js"))
    .map(entry => resolve(entry.parentPath, entry.name));
  assert.ok(loaded.length >= 80, `dist holds ${loaded.length} modules`);
  assert.deepEqual(await importCalls(entry, loaded), []);
});

test("cp1xk census: the import spy is not vacuous, since it counts an import-time read and an import-time spawn in a probe module", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-coordination-spy-"));
  try {
    const probe = join(root, "probe.mjs");
    const data = join(root, "data.txt");
    writeFileSync(data, "x");
    writeFileSync(probe, `import { readFileSync } from "node:fs";\nimport { spawnSync } from "node:child_process";\nexport const a = readFileSync(${JSON.stringify(data)}, "utf8");\nexport const b = spawnSync(process.execPath, ["-e", "0"]).status;\n`);
    const calls = await importCalls(probe, [probe]);
    assert.ok(calls.some(call => call.startsWith(`fs.readFileSync(${data}`)), calls.join(" | "));
    assert.ok(calls.some(call => call.startsWith("child_process.spawnSync(")), calls.join(" | "));
    mkdirSync(join(root, "ok"));
    const quiet = join(root, "ok/quiet.mjs");
    writeFileSync(quiet, "export const q = 1;\n");
    assert.deepEqual(await importCalls(quiet, [quiet]), []);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
