import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "../../..");

/** TW boundary tw-no-global-event-store (MechanicalWorkflows-697m.3): adapter and core state stays
 * per-call; no module holds a shared mutable store. Module-level declarations start at column 0. */
const SCANNED_PACKAGES = ["packages/coordination", "packages/development"] as const;
const MUTABLE_BINDING = /^(?:export )?(?:let|var)\s/;
const MUTABLE_SINGLETON = /^(?:export )?const \S+(?:: (?!Readonly)[^=]+)? = (?:new (?:Map|Set|WeakMap|WeakSet)\b|\[\])/;

function sourcesOf(member: string): { name: string; lines: string[] }[] {
  const dir = join(repoRoot, member, "src");
  return readdirSync(dir).filter(name => name.endsWith(".ts")).map(name => ({ name: `${member}/src/${name}`, lines: readFileSync(join(dir, name), "utf8").split("\n") }));
}

test("no module-level let or var binding exists in either core package", () => {
  for (const member of SCANNED_PACKAGES) {
    for (const { name, lines } of sourcesOf(member)) {
      lines.forEach((line, index) => {
        assert.equal(MUTABLE_BINDING.test(line), false, `GLOBAL_MUTABLE_BINDING: ${name}:${index + 1} ${line.trim()}`);
      });
    }
  }
});

test("no module-level mutable singleton collection exists in either core package", () => {
  for (const member of SCANNED_PACKAGES) {
    for (const { name, lines } of sourcesOf(member)) {
      lines.forEach((line, index) => {
        assert.equal(MUTABLE_SINGLETON.test(line), false, `GLOBAL_EVENT_STORE: ${name}:${index + 1} ${line.trim()}`);
      });
    }
  }
});

test("the scan actually reads the core: both packages present with at least ten modules each scanned", () => {
  for (const member of SCANNED_PACKAGES) {
    const sources = sourcesOf(member === "packages/development" ? member : member);
    assert.ok(sources.length >= (member === "packages/coordination" ? 10 : 1), `SCAN_EMPTY: ${member}`);
    assert.ok(sources.every(source => source.lines.length > 0));
  }
});

test("the scan scope itself is pinned: exactly the two core packages", () => {
  assert.deepEqual([...SCANNED_PACKAGES], ["packages/coordination", "packages/development"]);
  assert.equal(String(MUTABLE_BINDING), "/^(?:export )?(?:let|var)\\s/");
  assert.ok(String(MUTABLE_SINGLETON).includes("(?!Readonly)"), "the singleton rule exempts Readonly-typed constants");
});

/** MechanicalWorkflows-cyk0: eight store shapes the line-based, depth-1 guard above misses. The strict scan below reads
 * every src/**\/*.ts module (the tsconfig include), joins each module-level or static declaration into one statement,
 * and exempts a collection by its declared readonly type, never by a name prefix. */
const DECLARATION_START = /^(?:export )?(?:declare )?const /;
const STATIC_START = /^\s+(?:(?:public|private|protected) )?static /;
const DECLARATION = /^(?:export )?(?:declare )?const (\S+?)(?:: (.+?))? = (.*)$/;
const STATIC_DECLARATION = /^(?:(?:public|private|protected) )?static (?:readonly )?(\S+?)(?:: (.+?))? = (.*)$/;
const READONLY_TYPE = /^(?:readonly\b|Readonly(?:Map|Set|Array)\b|Readonly<)/;
const MUTABLE_ARRAY_TYPE = /^(?:Array<.*>|.+\[\])$/;
const STORE_INITIALISER = /^(?:new (?:Map|Set|WeakMap|WeakSet)\b|\[\s*\]|\{\s*\})/;

function sourceFilesOf(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? sourceFilesOf(join(dir, entry.name)) : entry.name.endsWith(".ts") ? [join(dir, entry.name)] : []);
}

function statementsOf(source: string): { line: number; text: string }[] {
  const lines = source.split("\n");
  const out: { line: number; text: string }[] = [];
  lines.forEach((line, index) => {
    const isStatic = STATIC_START.test(line);
    if (!DECLARATION_START.test(line) && !isStatic) return;
    let text = line.trim();
    for (let next = index + 1; next < lines.length && next < index + 40; next++) {
      const following = lines[next]!;
      if (isStatic ? text.endsWith(";") : !/^(?:\s|[)\]}>])/.test(following) || following.trim() === "") break;
      text += ` ${following.trim()}`;
    }
    out.push({ line: index + 1, text: text.replace(/\s+/g, " ") });
  });
  return out;
}

function storeViolations(source: string): { line: number; text: string }[] {
  return statementsOf(source).filter(({ text }) => {
    const match = (STATIC_DECLARATION.exec(text) ?? DECLARATION.exec(text));
    if (!match) return false;
    const annotation = match[2];
    const initialiser = match[3]!;
    if (annotation !== undefined && READONLY_TYPE.test(annotation)) return false;
    if (/\sas const;?$/.test(initialiser)) return false;
    if (STORE_INITIALISER.test(initialiser)) return true;
    return initialiser.startsWith("[") && annotation !== undefined && MUTABLE_ARRAY_TYPE.test(annotation);
  });
}

function fixtureLines(source: string): string[] {
  return storeViolations(source).map(({ text }) => text);
}

test("cyk0 S1: a function-typed Map or Set annotation (its => contains =) is still a store", () => {
  assert.deepEqual(fixtureLines("const handlers: Map<string, (e: string) => void> = new Map();\n"), ["const handlers: Map<string, (e: string) => void> = new Map();"]);
  assert.equal(MUTABLE_SINGLETON.test("const handlers: Map<string, (e: string) => void> = new Map();"), false, "the landed rule misses it, so the strict scan carries the pin");
  assert.equal(fixtureLines("export const listeners: Set<() => void> = new Set();\n").length, 1);
});

test("cyk0 S2: an empty object-literal store is a store, a frozen readonly-typed one is not", () => {
  assert.equal(fixtureLines("const registry: Record<string, string[]> = {};\n").length, 1);
  assert.equal(fixtureLines("export const cache = {};\n").length, 1);
  assert.equal(fixtureLines("const frozen: Readonly<Record<string, string>> = {};\n").length, 0);
  assert.equal(MUTABLE_SINGLETON.test("const registry: Record<string, string[]> = {};"), false);
});

test("cyk0 S3: the scan recurses into src subdirectories like the tsconfig include src/**/*.ts", () => {
  for (const member of SCANNED_PACKAGES) {
    const tsconfig = JSON.parse(readFileSync(join(repoRoot, member, "tsconfig.json"), "utf8")) as { include: string[] };
    assert.deepEqual(tsconfig.include, ["src/**/*.ts"], `INCLUDE_DRIFT: ${member}`);
    const flat = sourcesOf(member).map(source => source.name);
    const deep = sourceFilesOf(join(repoRoot, member, "src")).map(file => relative(repoRoot, file));
    assert.ok(flat.every(name => deep.includes(name)), `RECURSION_SUBSET: ${member}`);
  }
  const root = mkdtempSync(join(tmpdir(), "cyk0-s3-"));
  try {
    mkdirSync(join(root, "src", "stores"), { recursive: true });
    writeFileSync(join(root, "src", "index.ts"), "export const ok = 1;\n");
    writeFileSync(join(root, "src", "stores", "registry.ts"), "export const live = new Map<string, string>();\n");
    const files = sourceFilesOf(join(root, "src")).map(file => relative(root, file)).sort();
    assert.deepEqual(files, ["src/index.ts", "src/stores/registry.ts"]);
    const hits = files.filter(file => storeViolations(readFileSync(join(root, file), "utf8")).length > 0);
    assert.deepEqual(hits, ["src/stores/registry.ts"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("cyk0 S4: a multi-line type annotation is joined into one statement before the rule runs", () => {
  const source = "const pending: Map<\n  string,\n  string[]\n> = new Map();\nconst after = 1;\n";
  assert.equal(storeViolations(source).length, 1);
  assert.equal(storeViolations(source)[0]!.line, 1);
  assert.equal(source.split("\n").some(line => MUTABLE_SINGLETON.test(line)), false, "no single line of it matches the landed rule");
  assert.equal(fixtureLines("const names: readonly string[] = [\n  \"a\",\n  \"b\",\n];\n").length, 0);
});

test("cyk0 S5: a non-empty array literal with a mutable array annotation is a store", () => {
  assert.equal(fixtureLines("const queue: string[] = [\"boot\"];\n").length, 1);
  assert.equal(fixtureLines("const queue: Array<string> = [\"boot\"];\n").length, 1);
  assert.equal(fixtureLines("const queue: readonly string[] = [\"boot\"];\n").length, 0);
  assert.equal(fixtureLines("const KEYS = [\"a\", \"b\"] as const;\n").length, 0);
  assert.equal(MUTABLE_SINGLETON.test("const queue: string[] = [\"boot\"];"), false);
});

test("cyk0 S6: an indented class static mutable store is a store even when marked readonly", () => {
  assert.equal(fixtureLines("class Bus {\n  static readonly entries: string[] = [];\n}\n").length, 1);
  assert.equal(fixtureLines("class Bus {\n  private static seen = new Set<string>();\n}\n").length, 1);
  assert.equal(fixtureLines("class Bus {\n  static readonly NAMES: readonly string[] = [];\n}\n").length, 0);
  assert.equal(MUTABLE_SINGLETON.test("  static readonly entries: string[] = [];"), false);
});

test("cyk0 S7: the landed MUTABLE_SINGLETON rule is pinned by source and by a must-match table", () => {
  assert.equal(String(MUTABLE_SINGLETON), "/^(?:export )?const \\S+(?:: (?!Readonly)[^=]+)? = (?:new (?:Map|Set|WeakMap|WeakSet)\\b|\\[\\])/");
  const mustMatch = ["const a = new Map();", "export const b = new Set();", "const c = new WeakMap();", "const d = new WeakSet();", "const e = [];", "export const f: string[] = [];", "const g: Map<string, string> = new Map();"];
  const mustNotMatch = ["const a: ReadonlyMap<string, string> = new Map();", "const b = 1;", "const c = [1];", "let d = new Map();", "  const e = new Map();"];
  for (const line of mustMatch) assert.equal(MUTABLE_SINGLETON.test(line), true, `RULE_DROPPED: ${line}`);
  for (const line of mustNotMatch) assert.equal(MUTABLE_SINGLETON.test(line), false, `RULE_WIDENED: ${line}`);
});

test("cyk0 S10: a Readonly-prefixed alias over a mutable collection is exempt by type, not by name prefix", () => {
  const source = "type ReadonlyStore = Map<string, string>;\nconst store: ReadonlyStore = new Map();\n";
  assert.equal(MUTABLE_SINGLETON.test("const store: ReadonlyStore = new Map();"), false, "the landed rule exempts the alias by its name prefix");
  assert.deepEqual(fixtureLines(source), ["const store: ReadonlyStore = new Map();"]);
  assert.equal(fixtureLines("const store: ReadonlyMap<string, string> = new Map();\n").length, 0);
  assert.equal(fixtureLines("const store: ReadonlySet<string> = new Set();\n").length, 0);
});

test("cyk0 strict scan: no module under src/** of either core package declares a store the strict rule recognises", () => {
  for (const member of SCANNED_PACKAGES) {
    for (const file of sourceFilesOf(join(repoRoot, member, "src"))) {
      const hits = storeViolations(readFileSync(file, "utf8"));
      assert.deepEqual(hits, [], `GLOBAL_EVENT_STORE_STRICT: ${relative(repoRoot, file)}:${hits[0]?.line} ${hits[0]?.text}`);
    }
  }
});
