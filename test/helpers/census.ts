/**
 * wb-u62: the shared title-census FLOOR helper (owner program ruling 2026-10-16 12:22Z; one helper,
 * never N per-census scanners - 15 scanner variants are 15 divergence surfaces, the GATE-STEER1 class).
 *
 * A census pins named test cases and docs sections and must go red, naming the pin and the cause,
 * when a pinned case would no longer EXIST, RUN where its tier label says, or ASSERT (the three legs).
 * Every text-reading scanner of that shape was refused at a gate (24 / 12 / 11 / 13 runner-verified
 * census-silent modes on 6hb.6 / 0kg.11 / h8f.9 / 752.10). This helper reads the runner instead:
 *
 * - "closed" (owner ruling on the 6ze.38 verdict): a pin counts only when it is COLLECTED EXACTLY ONCE
 *   (an it.each / it.for pin: once per table row, table non-empty) and its RESULT IS PASSED under the
 *   claimed tier ENTRYPOINT. judgePins therefore EXECUTES the tier's real command - the forge.toml step,
 *   through its npm script, with the config's setupFiles / globalSetup, testNamePattern, include/exclude
 *   and every CLI flag exactly as the gate runs them (never a reconstructed argv; owner ruling on the 6hb.7
 *   verdict) - narrowed to the pinned files only when the command has no positional filters of its own,
 *   with --reporter=census-reporter.ts, --includeTaskLocation and --expect.requireAssertions appended. The
 *   census reporter serializes the reported-task surface every reporter receives plus each case's result.
 * - inner legs (keep-or-match floors): a parse-aware TypeScript AST scan of the case the RUNNER located
 *   (its reported line:column, never a title search) - a reachable test-context skip in the case body or
 *   in a vitest hook of the pin's own enclosing call chain (never file-wide), fail-closed on context uses
 *   it cannot follow, and a bare expect(x) with no matcher (which the runtime assertion count accepts).
 * - docs: sections from the RENDERED view (marked's lexer, resolved through the pinned
 *   @earendil-works/pi-tui devDependency): unique heading, bounded at the next level-1/2 heading or EOF,
 *   bound to its normative parent heading path (D9), refusing an HTML comment or code fence inside the
 *   section that spans a heading boundary (D10).
 *
 * Fail-closed throughout: an unreadable or unparseable file, a run error, a tier command outside the
 * modelled grammar or an unanalysable case body is a red verdict naming its cause, never a pass.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";

/** The forge.toml command the complete gate runs for vitest (forge.toml [build] gate must list it). */
export const DEFAULT_GATE_TIER = "test";

export interface CasePin {
  /** Repository-relative test file. */
  readonly file: string;
  /** The case title exactly as registered (TestCase.name); for an it.each / it.for pin, the literal template. */
  readonly title: string;
  /** Optional exact enclosing describe path, outermost first. */
  readonly suite?: readonly string[];
  /** The forge.toml command whose run must execute the case: DEFAULT_GATE_TIER or a tier such as "native-read". */
  readonly tier: string;
  /**
   * Marks an it.each / it.for template pin: its call site must register each table row exactly once, at least
   * max(1, minCases) of them, and every one must pass.
   */
  readonly each?: { readonly minCases: number };
}

export type CensusLeg = "exists" | "runs-where" | "asserts";
export type CensusCode =
  | "ok"
  | "unreadable"
  | "unparseable"
  | "nested-run"
  | "run-error"
  | "collection-error"
  | "tier-unresolved"
  | "not-collected"
  | "also-default-gate"
  | "absent"
  | "duplicated"
  | "skipped"
  | "inverted"
  | "each-empty"
  | "unmapped-location"
  | "body-unresolved"
  | "context-skip"
  | "context-unknown"
  | "hook-skip"
  | "failed"
  | "no-assertion";

export interface PinVerdict {
  readonly pin: CasePin;
  readonly ok: boolean;
  /** The failing leg (for an ok verdict: "asserts", the last leg passed). */
  readonly leg: CensusLeg;
  readonly code: CensusCode;
  /** Names the pin (file, title, tier) and the cause: attribution IS the census row. */
  readonly why: string;
  /** Cases the tier run collected for the pin (an it.each / it.for pin: the cases from its call site). */
  readonly cases: number;
}

export interface TierResolution {
  readonly ok: boolean;
  readonly tier: string;
  /** The forge.toml command line itself: what judgePins executes (with its census arguments appended). */
  readonly command: string;
  /** Read-only analysis of the vitest argv the command reaches, e.g. ["run", "--config", "vitest.native.config.ts"]. */
  readonly argv: readonly string[];
  /** How the command resolves, one entry per hop (forge.toml step, npm script). */
  readonly chain: readonly string[];
  readonly why: string;
}

export interface JudgeOptions {
  /** Per tier run, default 300 s. */
  readonly timeoutMs?: number;
  /** vitest workers for each tier run, default 2. */
  readonly maxWorkers?: number;
}

export interface RenderedText {
  /** What a reader sees: inline markup and HTML comments removed, whitespace collapsed. */
  readonly text: string;
  /** The source markdown of the block, whitespace collapsed. */
  readonly markdown: string;
}
export type RenderedBlock =
  | { readonly kind: "heading"; readonly depth: number; readonly text: string }
  | { readonly kind: "paragraph"; readonly text: string; readonly markdown: string }
  | { readonly kind: "list"; readonly ordered: boolean; readonly items: readonly RenderedText[] }
  | { readonly kind: "code"; readonly text: string }
  | { readonly kind: "html"; readonly text: string }
  | { readonly kind: "other"; readonly type: string; readonly text: string };
export interface DocsSection {
  readonly ok: boolean;
  readonly why: string;
  /** The rendered blocks between the unique heading and the next level-1/2 heading (or EOF). */
  readonly blocks: readonly RenderedBlock[];
  /** True when any HTML (block or inline, comments included) sits inside the section. */
  readonly hasHtml: boolean;
}

// ---- run report protocol (written by census-reporter.ts) ----

export interface RunCase {
  readonly name: string;
  readonly suitePath: readonly string[];
  readonly mode: string;
  readonly fails: boolean;
  readonly each: boolean;
  readonly line: number;
  readonly column: number;
  /** The case's result state when the tier ran: passed, failed, skipped or pending. */
  readonly state: string;
  readonly errors: readonly string[];
}
export interface RunSuite {
  readonly name: string;
  readonly suitePath: readonly string[];
  readonly mode: string;
  readonly line: number;
  readonly column: number;
}
export interface RunModule {
  readonly file: string;
  readonly state: string;
  readonly errors: readonly string[];
  readonly tests: readonly RunCase[];
  readonly suites: readonly RunSuite[];
}
export interface RunReport {
  readonly complete: true;
  /** The test files the run scheduled when it started (onTestRunStart), absolute. */
  readonly scheduled: readonly string[];
  readonly modules: readonly RunModule[];
  readonly unhandledErrors: readonly string[];
}

const REPORTER = join(dirname(fileURLToPath(import.meta.url)), "census-reporter.ts");
const HOOKS = new Set(["beforeEach", "beforeAll", "aroundEach", "aroundAll"]);
const NODE_ASSERT = new Set(["node:assert", "node:assert/strict", "assert", "assert/strict"]);
const VITEST_BINARIES = new Set(["vitest", "./node_modules/.bin/vitest", "node_modules/.bin/vitest"]);

// ---------------------------------------------------------------------------------------------
// Tier resolution: forge.toml step -> npm script -> vitest argv (read-only, fail-closed grammar).
// ---------------------------------------------------------------------------------------------

type TomlValue = { readonly kind: "string"; readonly value: string } | { readonly kind: "strings"; readonly value: readonly string[] } | { readonly kind: "other" };
type TomlTables = ReadonlyMap<string, ReadonlyMap<string, TomlValue>>;
type Parsed<T> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly why: string };

/** Drops a # comment that is outside quotes. */
function stripTomlComment(line: string): string {
  let quote = "";
  for (let i = 0; i < line.length; i += 1) {
    const ch = line.charAt(i);
    if (quote === '"' && ch === "\\") {
      i += 1;
      continue;
    }
    if (quote !== "") {
      if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "#") return line.slice(0, i);
  }
  return line;
}

/** Brackets still open in an array value, ignoring brackets inside strings. */
function openBrackets(text: string): number {
  let depth = 0;
  let quote = "";
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charAt(i);
    if (quote === '"' && ch === "\\") {
      i += 1;
      continue;
    }
    if (quote !== "") {
      if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "[") depth += 1;
    else if (ch === "]") depth -= 1;
  }
  return depth;
}

function tomlString(text: string): string | undefined {
  if (/^"(?:[^"\\\u0000-\u001f]|\\["\\bfnrt/]|\\u[0-9A-Fa-f]{4})*"$/.test(text)) {
    const value: unknown = JSON.parse(text);
    return typeof value === "string" ? value : undefined;
  }
  if (/^'[^'\n]*'$/.test(text)) return text.slice(1, -1);
  return undefined;
}

function tomlValue(text: string): TomlValue {
  const single = tomlString(text);
  if (single !== undefined) return { kind: "string", value: single };
  if (text.startsWith("[") && text.endsWith("]")) {
    const items: string[] = [];
    let current = "";
    let quote = "";
    for (const ch of text.slice(1, -1)) {
      if (quote !== "") {
        current += ch;
        if (ch === quote && !current.endsWith(`\\${quote}`)) quote = "";
        continue;
      }
      if (ch === '"' || ch === "'") quote = ch;
      if (ch === ",") {
        items.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    items.push(current.trim());
    const strings = items.filter(item => item !== "").map(tomlString);
    if (strings.every((item): item is string => item !== undefined)) return { kind: "strings", value: strings };
  }
  return { kind: "other" };
}

/** The TOML subset forge.toml uses: [tables], dotted or quoted keys, strings, string arrays. Anything structural outside it fails closed. */
function parseToml(text: string): Parsed<TomlTables> {
  const tables = new Map<string, Map<string, TomlValue>>();
  const tableOf = (name: string): Map<string, TomlValue> => {
    let table = tables.get(name);
    if (table === undefined) {
      table = new Map();
      tables.set(name, table);
    }
    return table;
  };
  let current = "";
  tableOf(current);
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = stripTomlComment(lines[index] ?? "").trim();
    if (line === "") continue;
    if (line.includes('"""') || line.includes("'''")) return { ok: false, why: `forge.toml line ${index + 1}: multi-line strings are outside the parsed subset` };
    const header = /^\[\s*([A-Za-z0-9_.-]+)\s*\]$/.exec(line);
    if (header?.[1] !== undefined) {
      current = header[1];
      if (tables.has(current) && (tables.get(current)?.size ?? 0) > 0) return { ok: false, why: `forge.toml line ${index + 1}: table [${current}] is declared twice` };
      tableOf(current);
      continue;
    }
    if (/^\[\[/.test(line)) {
      current = `${line}@${index}`;
      tableOf(current);
      continue;
    }
    const pair = /^((?:[A-Za-z0-9_-]+|"[^"]*")(?:\s*\.\s*(?:[A-Za-z0-9_-]+|"[^"]*"))*)\s*=\s*(.+)$/.exec(line);
    if (pair?.[1] === undefined || pair[2] === undefined) return { ok: false, why: `forge.toml line ${index + 1} is outside the parsed TOML subset: ${line.slice(0, 120)}` };
    const keys = pair[1].split(".").map(key => key.trim().replace(/^"|"$/g, ""));
    let valueText = pair[2].trim();
    while (valueText.startsWith("[") && openBrackets(valueText) > 0 && index + 1 < lines.length) {
      index += 1;
      valueText += ` ${stripTomlComment(lines[index] ?? "").trim()}`;
    }
    const key = keys[keys.length - 1] ?? "";
    const tableName = [current, ...keys.slice(0, -1)].filter(part => part !== "").join(".");
    const table = tableOf(tableName);
    if (table.has(key)) return { ok: false, why: `forge.toml line ${index + 1}: key ${key} is defined twice in [${tableName}]` };
    const value = tomlValue(valueText);
    if (value.kind === "other" && (valueText.startsWith('"') || valueText.startsWith("'") || valueText.startsWith("[")) && !/^\[.*\]$/.test(valueText)) {
      return { ok: false, why: `forge.toml line ${index + 1}: unterminated value for ${key}` };
    }
    if (value.kind === "other" && !/^(?:[+-]?\d[\d_]*(?:\.\d+)?|true|false|\[.*\]|\{.*\}|\d{4}-\d{2}-\d{2}.*)$/.test(valueText)) {
      return { ok: false, why: `forge.toml line ${index + 1}: value of ${key} is outside the parsed TOML subset: ${valueText.slice(0, 120)}` };
    }
    table.set(key, value);
  }
  return { ok: true, value: tables };
}

/** Shell-word split of a command line; anything a shell would interpret beyond words and quotes fails closed. */
function tokenize(command: string): Parsed<readonly string[]> {
  const words: string[] = [];
  let current = "";
  let started = false;
  let quote = "";
  for (let i = 0; i < command.length; i += 1) {
    const ch = command.charAt(i);
    if (quote === "'") {
      if (ch === "'") quote = "";
      else current += ch;
      continue;
    }
    if (quote === '"') {
      if (ch === '"') quote = "";
      else if (ch === "$" || ch === "`") return { ok: false, why: `the command expands ${ch} inside double quotes` };
      else if (ch === "\\") return { ok: false, why: "the command uses a shell escape inside double quotes" };
      else current += ch;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      started = true;
      continue;
    }
    if (ch === " " || ch === "\t") {
      if (started) words.push(current);
      current = "";
      started = false;
      continue;
    }
    if ("|&;<>()$`*?[]{}~!\n\r#".includes(ch)) return { ok: false, why: `the command uses the shell operator ${JSON.stringify(ch)}` };
    if (ch === "\\") return { ok: false, why: "the command uses a shell escape" };
    current += ch;
    started = true;
  }
  if (quote !== "") return { ok: false, why: "the command has an unterminated quote" };
  if (started) words.push(current);
  if (words.length === 0) return { ok: false, why: "the command is empty" };
  if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? "")) return { ok: false, why: "the command sets environment variables" };
  return { ok: true, value: words };
}

function readScripts(root: string): Parsed<Readonly<Record<string, string>>> {
  let value: unknown;
  try {
    value = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  } catch (error) {
    return { ok: false, why: `package.json is unreadable: ${String(error instanceof Error ? error.message : error)}` };
  }
  const scripts = typeof value === "object" && value !== null ? (value as { scripts?: unknown }).scripts : undefined;
  if (scripts === undefined) return { ok: true, value: {} };
  if (typeof scripts !== "object" || scripts === null) return { ok: false, why: "package.json scripts is not an object" };
  const out: Record<string, string> = {};
  for (const [name, body] of Object.entries(scripts)) if (typeof body === "string") out[name] = body;
  return { ok: true, value: out };
}

function resolveWords(words: readonly string[], scripts: Readonly<Record<string, string>>, chain: string[], depth: number): Parsed<readonly string[]> {
  const [head, ...rest] = words;
  if (head === "npm") {
    let script: string | undefined;
    let extra: readonly string[];
    if (rest[0] === "run" || rest[0] === "run-script") {
      script = rest[1];
      extra = rest.slice(2);
    } else if (rest[0] === "test" || rest[0] === "t") {
      script = "test";
      extra = rest.slice(1);
    } else return { ok: false, why: `npm ${rest[0] ?? ""} is not a modelled npm invocation` };
    if (script === undefined || script.startsWith("-")) return { ok: false, why: "npm run names no script" };
    if (extra.length > 0 && extra[0] !== "--") return { ok: false, why: `npm flag ${extra[0] ?? ""} before -- is not modelled` };
    const body = scripts[script];
    if (body === undefined) return { ok: false, why: `package.json declares no script ${script}` };
    if (depth > 4) return { ok: false, why: "npm scripts nest deeper than four levels" };
    chain.push(`package.json scripts.${script} = ${JSON.stringify(body)}`);
    const nested = tokenize(body);
    if (!nested.ok) return { ok: false, why: `package.json scripts.${script}: ${nested.why}` };
    return resolveWords([...nested.value, ...extra.slice(1)], scripts, chain, depth + 1);
  }
  const vitestArgs = head === "npx" && rest[0] === "vitest" ? rest.slice(1) : head !== undefined && VITEST_BINARIES.has(head) ? rest : undefined;
  if (vitestArgs === undefined) return { ok: false, why: `the tier runs ${head ?? "nothing"}, not vitest` };
  if (vitestArgs[0] !== "run" && !vitestArgs.includes("--run")) return { ok: false, why: "vitest without run is watch mode" };
  return { ok: true, value: vitestArgs };
}

/** Resolves a forge.toml command to the vitest argv it runs, read-only; anything outside the modelled grammar fails closed. */
export function resolveTier(root: string, tier: string): TierResolution {
  const fail = (why: string, chain: readonly string[] = [], command = ""): TierResolution => ({ ok: false, tier, command, argv: [], chain, why });
  let text: string;
  try {
    text = readFileSync(join(root, "forge.toml"), "utf8");
  } catch (error) {
    return fail(`forge.toml is unreadable: ${String(error instanceof Error ? error.message : error)}`);
  }
  const toml = parseToml(text);
  if (!toml.ok) return fail(toml.why);
  if (tier === DEFAULT_GATE_TIER) {
    const gate = toml.value.get("build")?.get("gate");
    if (gate?.kind !== "strings" || !gate.value.includes(tier)) return fail(`forge.toml [build] gate does not run the ${tier} step`);
  }
  const inline = toml.value.get("build.commands")?.get(tier);
  const block = toml.value.get(`build.commands.${tier}`)?.get("command");
  if (inline !== undefined && block !== undefined) return fail(`forge.toml declares ${tier} both inline and as a table`);
  const command = inline ?? block;
  if (command === undefined) return fail(`forge.toml declares no command ${tier}`);
  if (command.kind !== "string") return fail(`forge.toml command ${tier} is not a string`);
  const chain = [inline !== undefined ? `forge.toml [build.commands] ${tier} = ${JSON.stringify(command.value)}` : `forge.toml [build.commands.${tier}] command = ${JSON.stringify(command.value)}`];
  const words = tokenize(command.value);
  if (!words.ok) return fail(`forge.toml command ${tier}: ${words.why}`, chain, command.value);
  const scripts = readScripts(root);
  if (!scripts.ok) return fail(scripts.why, chain, command.value);
  const argv = resolveWords(words.value, scripts.value, chain, 0);
  if (!argv.ok) return fail(argv.why, chain, command.value);
  if (chain.length > 2) return fail("the command reaches vitest through more than one npm script; only one npm hop is executed faithfully", chain, command.value);
  return { ok: true, tier, command: command.value, argv: argv.value, chain, why: "" };
}
// ---------------------------------------------------------------------------------------------
// Execution: the tier's REAL entrypoint with the census reporter appended (owner rulings 13:20Z, 13:30Z).
// ---------------------------------------------------------------------------------------------

type TierRun = { readonly ok: true; readonly report: RunReport } | { readonly ok: false; readonly why: string };

/** Set in every tier run the helper starts: a census reached from inside one never starts another (recursion guard). */
const NESTED_ENV = "CENSUS_HELPER_NESTED";
const REPORT_ENV = "CENSUS_REPORT_OUT";
/** What a vitest worker adds to its own environment; a tier run started from inside a worker must not inherit it. */
const WORKER_ENV = new Set(["TEST", "BASE_URL", "MODE", "DEV", "PROD", "SSR", "FORCE_TTY"]);
const NO_ASSERTION = "expected any number of assertion, but got none";

function runEnv(out: string): NodeJS.ProcessEnv {
  const inWorker = process.env.VITEST !== undefined;
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || key.startsWith("VITEST") || (inWorker && WORKER_ENV.has(key))) continue;
    env[key] = value;
  }
  return { ...env, [REPORT_ENV]: out, [NESTED_ENV]: "1" };
}

/** vitest 4 CLI flags that take a required value (the word after them is never a file filter). */
const VALUE_FLAGS = new Set([
  "attachmentsDir",
  "bail",
  "browser",
  "config",
  "configLoader",
  "diff",
  "dir",
  "environment",
  "exclude",
  "execArgv",
  "experimental",
  "hookTimeout",
  "maxConcurrency",
  "maxWorkers",
  "mode",
  "outputFile",
  "pool",
  "project",
  "reporter",
  "retry",
  "root",
  "sequence",
  "shard",
  "slowTestThreshold",
  "tagsFilter",
  "teardownTimeout",
  "testNamePattern",
  "testTimeout",
  "vmMemoryLimit",
]);
const SHORT_VALUE_FLAGS: ReadonlyMap<string, string> = new Map([
  ["c", "config"],
  ["r", "root"],
  ["t", "testNamePattern"],
]);
/** vitest 4 CLI flags that take no value and leave the run's file set alone. */
const BOOLEAN_FLAGS = new Set([
  "allowOnly",
  "cache",
  "clearScreen",
  "color",
  "coverage",
  "dangerouslyIgnoreUnhandledErrors",
  "detectAsyncLeaks",
  "disableConsoleIntercept",
  "dom",
  "expandSnapshotDiff",
  "fileParallelism",
  "globals",
  "hideSkippedTests",
  "includeTaskLocation",
  "isolate",
  "logHeapUsage",
  "passWithNoTests",
  "printConsoleTrace",
  "run",
  "standalone",
  "strictTags",
  "typecheck",
]);

const camel = (flag: string): string => flag.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());

/**
 * May the census append the pinned files as filters? Only when the tier's own argv carries no file filter and
 * nothing whose meaning depends on the whole file set (--shard); any word it cannot classify keeps the full run.
 * Appended filters only narrow what the config's include/exclude already selects, so membership is unchanged.
 */
function narrowable(argv: readonly string[]): boolean {
  for (let index = argv[0] === "run" ? 1 : 0; index < argv.length; index += 1) {
    const word = argv[index] ?? "";
    if (!word.startsWith("-") || word === "--") return false;
    const long = word.startsWith("--");
    const body = word.slice(long ? 2 : 1);
    const equals = body.indexOf("=");
    const raw = equals === -1 ? body : body.slice(0, equals);
    const name = long ? camel(raw.startsWith("no-") ? raw.slice(3) : raw) : (SHORT_VALUE_FLAGS.get(raw) ?? "");
    if (name === "shard") return false;
    if (VALUE_FLAGS.has(name)) {
      if (equals === -1) index += 1;
      continue;
    }
    if (long && equals === -1 && BOOLEAN_FLAGS.has(name)) continue;
    return false;
  }
  return true;
}

const isStringArray = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(item => typeof item === "string");
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

function isRunCase(value: unknown): value is RunCase {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    isStringArray(value.suitePath) &&
    typeof value.mode === "string" &&
    typeof value.fails === "boolean" &&
    typeof value.each === "boolean" &&
    typeof value.line === "number" &&
    typeof value.column === "number" &&
    typeof value.state === "string" &&
    isStringArray(value.errors)
  );
}

const isRunSuite = (value: unknown): value is RunSuite =>
  isRecord(value) && typeof value.name === "string" && isStringArray(value.suitePath) && typeof value.mode === "string" && typeof value.line === "number" && typeof value.column === "number";

function isRunModule(value: unknown): value is RunModule {
  return (
    isRecord(value) &&
    typeof value.file === "string" &&
    typeof value.state === "string" &&
    isStringArray(value.errors) &&
    Array.isArray(value.tests) &&
    value.tests.every(isRunCase) &&
    Array.isArray(value.suites) &&
    value.suites.every(isRunSuite)
  );
}

function parseReport(text: string): TierRun {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return { ok: false, why: "the census reporter wrote malformed JSON" };
  }
  if (
    !isRecord(value) ||
    value.complete !== true ||
    !isStringArray(value.scheduled) ||
    !isStringArray(value.unhandledErrors) ||
    !Array.isArray(value.modules) ||
    !value.modules.every(isRunModule)
  ) {
    return { ok: false, why: "the census report does not have the reporter's shape" };
  }
  if (value.unhandledErrors.length > 0) return { ok: false, why: `the run reported unhandled errors: ${value.unhandledErrors[0] ?? ""}` };
  return { ok: true, report: { complete: true, scheduled: value.scheduled, modules: value.modules, unhandledErrors: value.unhandledErrors } };
}

/** The command line judgePins executes: the forge.toml command itself, then (after an npm "--") the census arguments. */
function censusCommand(resolution: TierResolution, files: readonly string[], options: JudgeOptions): string | undefined {
  const words = tokenize(resolution.command);
  if (!words.ok) return undefined;
  const npm = words.value[0] === "npm" && !words.value.includes("--");
  const maxWorkers = resolution.argv.some(word => /^--max(?:Workers|-workers)(?:=|$)/.test(word));
  const extra = [
    ...(narrowable(resolution.argv) ? files : []),
    `--reporter=${REPORTER}`,
    "--includeTaskLocation",
    "--expect.requireAssertions",
    ...(maxWorkers ? [] : [`--maxWorkers=${options.maxWorkers ?? 2}`]),
  ];
  if (extra.some(word => /['\n\r]/.test(word))) return undefined;
  return [resolution.command, ...(npm ? ["--"] : []), ...extra.map(word => `'${word}'`)].join(" ");
}

async function runTier(root: string, resolution: TierResolution, files: readonly string[], options: JudgeOptions): Promise<TierRun> {
  const line = censusCommand(resolution, files, options);
  if (line === undefined) return { ok: false, why: "a pinned path or the reporter path cannot be quoted for the shell" };
  const dir = mkdtempSync(join(tmpdir(), "census-run."));
  const out = join(dir, "report.json");
  try {
    const timeoutMs = options.timeoutMs ?? 300_000;
    const exit = await new Promise<{ readonly code: number | null; readonly stderr: string; readonly timedOut: boolean }>(settle => {
      const child = spawn("bash", ["-c", line], { cwd: root, env: runEnv(out), stdio: ["ignore", "ignore", "pipe"], detached: true });
      let stderr = "";
      let timedOut = false;
      const timer = setTimeout(() => {
        timedOut = true;
        if (child.pid !== undefined) process.kill(-child.pid, "SIGKILL");
      }, timeoutMs);
      child.stderr.on("data", (chunk: Buffer) => {
        stderr = `${stderr}${chunk.toString("utf8")}`.slice(-16_000);
      });
      child.on("error", error => {
        clearTimeout(timer);
        settle({ code: null, stderr: `${stderr}${error.message}`, timedOut });
      });
      child.on("close", code => {
        clearTimeout(timer);
        settle({ code, stderr, timedOut });
      });
    });
    if (exit.timedOut) return { ok: false, why: `the tier run timed out after ${timeoutMs} ms` };
    if (!existsSync(out)) return { ok: false, why: `the tier run wrote no census report (exit ${String(exit.code)}): ${exit.stderr.trim().slice(-600)}` };
    return parseReport(readFileSync(out, "utf8"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function realOrSelf(path: string): string {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
}

// ---------------------------------------------------------------------------------------------
// Source analysis: parse-aware (TypeScript compiler API), one program per file, symbols bound.
// ---------------------------------------------------------------------------------------------

type FunctionLiteral = ts.ArrowFunction | ts.FunctionExpression;
type AnalysedFunction = FunctionLiteral | ts.FunctionDeclaration;
const isFunctionLiteral = (node: ts.Node): node is FunctionLiteral => ts.isArrowFunction(node) || ts.isFunctionExpression(node);

class SourceAnalysis {
  readonly file: string;
  readonly sf: ts.SourceFile;
  readonly checker: ts.TypeChecker;
  readonly syntaxError: string | undefined;

  constructor(file: string, text: string) {
    this.file = file;
    const kind = /\.[cm]?js$/.test(file) ? ts.ScriptKind.JS : file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    this.sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
    const sf = this.sf;
    const host: ts.CompilerHost = {
      getSourceFile: name => (name === file ? sf : undefined),
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => undefined,
      getCurrentDirectory: () => dirname(file),
      getCanonicalFileName: name => name,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      fileExists: name => name === file,
      readFile: name => (name === file ? text : undefined),
    };
    const program = ts.createProgram({ rootNames: [file], options: { noLib: true, noResolve: true, allowJs: true, types: [], target: ts.ScriptTarget.Latest, module: ts.ModuleKind.ESNext }, host });
    const diagnostic = program.getSyntacticDiagnostics(sf)[0];
    this.syntaxError = diagnostic === undefined ? undefined : `${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")} at ${this.where(diagnostic.start ?? 0)}`;
    this.checker = program.getTypeChecker();
  }

  where(node: ts.Node | number): string {
    const at = this.sf.getLineAndCharacterOfPosition(typeof node === "number" ? node : node.getStart(this.sf));
    return `line ${at.line + 1}:${at.character + 1}`;
  }

  key(position: number): string {
    const at = this.sf.getLineAndCharacterOfPosition(position);
    return `${at.line + 1}:${at.character + 1}`;
  }

  /** The source positions V8 can report for a call: callee start, member name, element key, the argument list's open paren. */
  callKeys(call: ts.CallExpression): string[] {
    const keys = [this.key(call.expression.getStart(this.sf)), this.key(call.arguments.pos - 1)];
    const callee = call.expression;
    if (ts.isPropertyAccessExpression(callee)) keys.push(this.key(callee.name.getStart(this.sf)));
    if (ts.isElementAccessExpression(callee)) {
      const start = callee.argumentExpression.getStart(this.sf);
      keys.push(this.key(start), this.key(start - 1));
    }
    return keys;
  }

  /** The outermost call expression at a runner-reported line:column. */
  callAt(line: number, column: number): ts.CallExpression | undefined {
    const wanted = `${line}:${column}`;
    let found: ts.CallExpression | undefined;
    const visit = (node: ts.Node): void => {
      if (found !== undefined) return;
      if (ts.isCallExpression(node) && this.callKeys(node).includes(wanted)) {
        found = node;
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(this.sf);
    return found;
  }

  /** it.each(table)(template, fn) / it.for(table)(template, fn) call sites whose literal template equals title. */
  eachSites(title: string): ts.CallExpression[] {
    const sites: ts.CallExpression[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isCallExpression(node.expression)) {
        const head = node.expression.expression;
        const first = node.arguments[0];
        if (ts.isPropertyAccessExpression(head) && (head.name.text === "each" || head.name.text === "for") && first !== undefined && ts.isStringLiteralLike(first) && first.text === title) sites.push(node);
      }
      ts.forEachChild(node, visit);
    };
    visit(this.sf);
    return sites;
  }
}

type LoadedSource = { readonly kind: "ok"; readonly analysis: SourceAnalysis } | { readonly kind: "unreadable" | "unparseable"; readonly why: string };

class SourceCache {
  private readonly loaded = new Map<string, LoadedSource>();

  get(file: string): LoadedSource {
    let entry = this.loaded.get(file);
    if (entry === undefined) {
      entry = this.load(file);
      this.loaded.set(file, entry);
    }
    return entry;
  }

  private load(file: string): LoadedSource {
    let text: string;
    try {
      text = readFileSync(file, "utf8");
    } catch (error) {
      return { kind: "unreadable", why: `the file is unreadable: ${String(error instanceof Error ? error.message : error)}` };
    }
    const analysis = new SourceAnalysis(file, text);
    if (analysis.syntaxError !== undefined) return { kind: "unparseable", why: `the file does not parse: ${analysis.syntaxError}` };
    return { kind: "ok", analysis };
  }

  /** A relative import's module file, mapping a .js specifier to its .ts source. */
  module(from: string, specifier: string): SourceAnalysis | undefined {
    if (!specifier.startsWith("./") && !specifier.startsWith("../")) return undefined;
    const base = resolve(dirname(from), specifier);
    const candidates = [base, base.replace(/\.js$/, ".ts"), base.replace(/\.mjs$/, ".mts"), base.replace(/\.js$/, ".tsx"), `${base}.ts`, join(base, "index.ts")];
    for (const candidate of candidates) {
      if (!existsSync(candidate)) continue;
      const loaded = this.get(candidate);
      return loaded.kind === "ok" ? loaded.analysis : undefined;
    }
    return undefined;
  }
}

// ---------------------------------------------------------------------------------------------
// Runtime skips: the test context's skip, reached from the case body or a hook of its own chain.
// ---------------------------------------------------------------------------------------------

interface Hazard {
  readonly kind: "skip" | "unknown";
  readonly detail: string;
}

const skipAt = (a: SourceAnalysis, node: ts.Node, what: string): Hazard => ({ kind: "skip", detail: `${what} at ${a.where(node)}` });
const unknownAt = (a: SourceAnalysis, node: ts.Node, what: string): Hazard => ({ kind: "unknown", detail: `${what} at ${a.where(node)}` });

function unwrap(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}

/** The key a binding element reads, or undefined for a computed non-literal key. */
function bindingKey(element: ts.BindingElement): string | undefined {
  const property = element.propertyName;
  if (property === undefined) return ts.isIdentifier(element.name) ? element.name.text : undefined;
  if (ts.isIdentifier(property) || ts.isStringLiteral(property) || ts.isNumericLiteral(property) || ts.isPrivateIdentifier(property)) return property.text;
  if (ts.isComputedPropertyName(property)) {
    const expression = unwrap(property.expression);
    return ts.isStringLiteralLike(expression) ? expression.text : undefined;
  }
  return undefined;
}

/** A destructuring of the context: skip is a hazard; task / context lead back to the context; a rest or computed key is unknowable. */
function bindingHazard(pattern: ts.ObjectBindingPattern, roots: Set<ts.Symbol>, a: SourceAnalysis): Hazard | undefined {
  for (const element of pattern.elements) {
    if (element.dotDotDotToken !== undefined) return unknownAt(a, element, "a rest element collects the test context");
    const key = bindingKey(element);
    if (key === undefined) return unknownAt(a, element, "a computed key destructures the test context");
    if (key === "skip") return skipAt(a, element, "the test context's skip is destructured");
    if (key !== "task" && key !== "context") continue;
    if (ts.isIdentifier(element.name)) {
      const symbol = a.checker.getSymbolAtLocation(element.name);
      if (symbol !== undefined) roots.add(symbol);
    } else if (ts.isObjectBindingPattern(element.name)) {
      const nested = bindingHazard(element.name, roots, a);
      if (nested !== undefined) return nested;
    } else return unknownAt(a, element, "the test context is destructured through an array pattern");
  }
  return undefined;
}

function memberHazard(access: ts.Expression, name: string, roots: Set<ts.Symbol>, a: SourceAnalysis): Hazard | undefined {
  if (name === "skip") return skipAt(a, access, `${access.getText(a.sf)} reaches the test context's skip`);
  if (name === "task" || name === "context") return useHazard(access, roots, a);
  return undefined;
}

/** How one reference to the context (or a value that leads back to it) is used. */
function useHazard(reference: ts.Expression, roots: Set<ts.Symbol>, a: SourceAnalysis): Hazard | undefined {
  let node: ts.Node = reference;
  while (
    ts.isParenthesizedExpression(node.parent) ||
    ts.isAsExpression(node.parent) ||
    ts.isSatisfiesExpression(node.parent) ||
    ts.isNonNullExpression(node.parent) ||
    ts.isTypeAssertionExpression(node.parent)
  ) {
    node = node.parent;
  }
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return memberHazard(parent, parent.name.text, roots, a);
  if (ts.isElementAccessExpression(parent) && parent.expression === node) {
    const key = unwrap(parent.argumentExpression);
    return ts.isStringLiteralLike(key) ? memberHazard(parent, key.text, roots, a) : unknownAt(a, parent, "the test context is read through a computed key");
  }
  if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
    if (ts.isIdentifier(parent.name)) {
      const symbol = a.checker.getSymbolAtLocation(parent.name);
      if (symbol !== undefined) roots.add(symbol);
      return undefined;
    }
    if (ts.isObjectBindingPattern(parent.name)) return bindingHazard(parent.name, roots, a);
    return unknownAt(a, parent, "the test context is destructured through an array pattern");
  }
  if (ts.isVoidExpression(parent) || ts.isTypeOfExpression(parent) || ts.isExpressionStatement(parent)) return undefined;
  if (ts.isCallExpression(parent) && parent.expression === node) return unknownAt(a, parent, "the test context is called");
  if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === node)) return unknownAt(a, parent, "the test context is handed to a call");
  return unknownAt(a, parent, `the test context is used as ${ts.SyntaxKind[parent.kind] ?? "an expression"}`);
}

/** Identifiers that read a binding (not declaration names, member names or object keys). */
function isReference(id: ts.Identifier): boolean {
  const parent = id.parent;
  if ((ts.isPropertyAccessExpression(parent) && parent.name === id) || (ts.isQualifiedName(parent) && parent.right === id)) return false;
  if ((ts.isPropertyAssignment(parent) || ts.isMethodDeclaration(parent) || ts.isPropertyDeclaration(parent)) && parent.name === id) return false;
  if ((ts.isBindingElement(parent) && (parent.name === id || parent.propertyName === id)) || (ts.isParameter(parent) && parent.name === id)) return false;
  if ((ts.isVariableDeclaration(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) && parent.name === id) return false;
  return !ts.isImportSpecifier(parent) && !ts.isImportClause(parent) && !ts.isLabeledStatement(parent) && !ts.isBreakOrContinueStatement(parent);
}

/** Does fn reach the vitest test context's skip through its context parameter (or the arguments object)? */
function contextHazard(fn: AnalysedFunction, index: number, a: SourceAnalysis): Hazard | undefined {
  const body = fn.body;
  if (body === undefined) return undefined;
  if (ts.isFunctionExpression(fn) || ts.isFunctionDeclaration(fn)) {
    let reads: ts.Identifier | undefined;
    const visit = (node: ts.Node): void => {
      if (reads !== undefined || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node)) return;
      if (ts.isIdentifier(node) && node.text === "arguments" && isReference(node)) reads = node;
      else ts.forEachChild(node, visit);
    };
    ts.forEachChild(body, visit);
    if (reads !== undefined) return unknownAt(a, reads, "the case reads the arguments object");
  }
  if (index < 0) return undefined;
  const parameter = fn.parameters[index];
  if (parameter === undefined) return undefined;
  if (parameter.dotDotDotToken !== undefined) return unknownAt(a, parameter, "a rest parameter collects the test context");
  const roots = new Set<ts.Symbol>();
  if (ts.isIdentifier(parameter.name)) {
    const symbol = a.checker.getSymbolAtLocation(parameter.name);
    if (symbol !== undefined) roots.add(symbol);
  } else if (ts.isObjectBindingPattern(parameter.name)) {
    const hazard = bindingHazard(parameter.name, roots, a);
    if (hazard !== undefined) return hazard;
  } else return unknownAt(a, parameter, "the test context is destructured through an array pattern");
  let known = -1;
  while (known !== roots.size) {
    known = roots.size;
    let hazard: Hazard | undefined;
    const visit = (node: ts.Node): void => {
      if (hazard !== undefined) return;
      if (ts.isShorthandPropertyAssignment(node)) {
        const value = a.checker.getShorthandAssignmentValueSymbol(node);
        if (value !== undefined && roots.has(value)) hazard = unknownAt(a, node, "the test context is placed into an object literal");
        return;
      }
      if (ts.isIdentifier(node) && isReference(node)) {
        const symbol = a.checker.getSymbolAtLocation(node);
        if (symbol !== undefined && roots.has(symbol)) hazard = useHazard(node, roots, a);
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(body);
    if (hazard !== undefined) return hazard;
  }
  return undefined;
}

function moduleOf(declaration: ts.Declaration): string | undefined {
  let node: ts.Node = declaration;
  while (!ts.isImportDeclaration(node)) {
    if (ts.isSourceFile(node)) return undefined;
    node = node.parent;
  }
  return ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : undefined;
}

/** The vitest export an expression names (through import aliases and const aliases), e.g. beforeEach. */
function vitestExport(expression: ts.Expression, a: SourceAnalysis, depth = 0): string | undefined {
  const target = unwrap(expression);
  if (ts.isPropertyAccessExpression(target) && ts.isIdentifier(target.expression)) {
    const declaration = a.checker.getSymbolAtLocation(target.expression)?.declarations?.[0];
    return declaration !== undefined && ts.isNamespaceImport(declaration) && moduleOf(declaration) === "vitest" ? target.name.text : undefined;
  }
  if (!ts.isIdentifier(target)) return undefined;
  const declaration = a.checker.getSymbolAtLocation(target)?.declarations?.[0];
  if (declaration === undefined) return undefined;
  if (ts.isImportSpecifier(declaration)) return moduleOf(declaration) === "vitest" ? (declaration.propertyName ?? declaration.name).text : undefined;
  if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined && depth < 6) return vitestExport(declaration.initializer, a, depth + 1);
  return undefined;
}

/** A same-file function an expression names (a function declaration or a const bound to a function literal). */
function localFunction(expression: ts.Expression, a: SourceAnalysis): AnalysedFunction | undefined {
  const target = unwrap(expression);
  if (isFunctionLiteral(target)) return target;
  if (!ts.isIdentifier(target)) return undefined;
  const declaration = a.checker.getSymbolAtLocation(target)?.declarations?.[0];
  if (declaration === undefined) return undefined;
  if (ts.isFunctionDeclaration(declaration) && declaration.body !== undefined) return declaration;
  if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined) {
    const initializer = unwrap(declaration.initializer);
    if (isFunctionLiteral(initializer)) return initializer;
  }
  return undefined;
}

/** Vitest hooks lexically in the pin's own enclosing call chain (enclosing function bodies up to the file), never siblings. */
function chainHazard(call: ts.CallExpression, a: SourceAnalysis, registered: ReadonlySet<string>): Hazard | undefined {
  const scopes: ts.Node[] = [];
  for (let node: ts.Node = call; node.parent !== undefined; node = node.parent) {
    const parent = node.parent;
    if (isFunctionLiteral(parent) || ts.isFunctionDeclaration(parent)) {
      if (parent.body !== undefined) scopes.push(parent.body);
    } else if (ts.isSourceFile(parent)) scopes.push(parent);
  }
  for (const scope of scopes) {
    let hazard: Hazard | undefined;
    const visit = (node: ts.Node): void => {
      if (hazard !== undefined || isFunctionLiteral(node) || ts.isFunctionDeclaration(node) || ts.isClassLike(node)) return;
      if (ts.isCallExpression(node)) {
        if (a.callKeys(node).some(key => registered.has(key))) return;
        const hook = vitestExport(node.expression, a);
        if (hook !== undefined && HOOKS.has(hook)) {
          // A vitest hook's callback is its first argument; a second argument is its timeout.
          const callback = node.arguments[0];
          const fn = callback === undefined ? undefined : localFunction(callback, a);
          if (callback !== undefined && fn === undefined) hazard = unknownAt(a, callback, `the ${hook} callback is not statically analysable`);
          const found = fn === undefined ? undefined : contextHazard(fn, 0, a);
          if (found !== undefined) hazard = { kind: found.kind, detail: `${hook} at ${a.where(node)}: ${found.detail}` };
          return;
        }
        for (const argument of node.arguments) {
          if (hazard !== undefined) return;
          if (isFunctionLiteral(unwrap(argument))) {
            const fn = unwrap(argument);
            if (isFunctionLiteral(fn) && fn.body !== undefined) visit(fn.body);
          } else visit(argument);
        }
        visit(node.expression);
        return;
      }
      ts.forEachChild(node, visit);
    };
    if (ts.isSourceFile(scope)) for (const statement of scope.statements) visit(statement);
    else visit(scope);
    if (hazard !== undefined) return hazard;
  }
  return undefined;
}

/** A registration through test.extend fixtures runs fixture code the census does not analyse. */
function extendHazard(call: ts.CallExpression, a: SourceAnalysis): Hazard | undefined {
  let head: ts.Expression = call.expression;
  for (;;) {
    head = unwrap(head);
    if (ts.isPropertyAccessExpression(head) || ts.isElementAccessExpression(head)) head = head.expression;
    else if (ts.isCallExpression(head)) head = head.expression;
    else break;
  }
  if (!ts.isIdentifier(head)) return undefined;
  for (let depth = 0, current: ts.Identifier = head; depth < 6; depth += 1) {
    const declaration = a.checker.getSymbolAtLocation(current)?.declarations?.[0];
    if (declaration === undefined || !ts.isVariableDeclaration(declaration) || declaration.initializer === undefined) return undefined;
    const initializer = unwrap(declaration.initializer);
    if (ts.isCallExpression(initializer) && ts.isPropertyAccessExpression(initializer.expression) && initializer.expression.name.text === "extend") {
      return unknownAt(a, call, "the case is registered through test.extend fixtures, which the census does not analyse");
    }
    if (!ts.isIdentifier(initializer)) return undefined;
    current = initializer;
  }
  return undefined;
}

// ---------------------------------------------------------------------------------------------
// The third leg: at least one REACHED vitest (or node:assert) assertion in the case body.
// ---------------------------------------------------------------------------------------------

interface EvidenceScope {
  readonly a: SourceAnalysis;
  readonly sources: SourceCache;
  /** Symbols bound to the case's test context object (ctx.expect is vitest's). */
  readonly contextRoots: ReadonlySet<ts.Symbol>;
  /** Symbols bound to the context's destructured expect. */
  readonly contextExpect: ReadonlySet<ts.Symbol>;
  readonly visited: Set<ts.Node>;
  readonly depth: number;
}
type Exit = "none" | "return" | "jump";
interface Walk {
  readonly evidence: string | undefined;
  readonly exit: Exit;
}
const CONTINUES: Walk = { evidence: undefined, exit: "none" };
const found = (evidence: string | undefined): Walk => ({ evidence, exit: "none" });

function literalTruth(expression: ts.Expression): boolean | undefined {
  const value = unwrap(expression);
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword || value.kind === ts.SyntaxKind.NullKeyword) return false;
  if (ts.isNumericLiteral(value)) return Number(value.text) !== 0;
  if (ts.isStringLiteralLike(value)) return value.text !== "";
  if (ts.isIdentifier(value) && value.text === "undefined") return false;
  if (ts.isPrefixUnaryExpression(value) && value.operator === ts.SyntaxKind.ExclamationToken) {
    const inner = literalTruth(value.operand);
    return inner === undefined ? undefined : !inner;
  }
  return undefined;
}

function isEmptyArray(expression: ts.Expression): boolean {
  const value = unwrap(expression);
  return ts.isArrayLiteralExpression(value) && value.elements.length === 0;
}

/** Is a function literal run when the code around it runs: a call argument (callback), or immediately invoked? */
function isInvoked(fn: ts.Node): boolean {
  let node = fn;
  for (;;) {
    const parent = node.parent;
    if (parent === undefined) return false;
    if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === node)) return true;
    if (ts.isCallExpression(parent) && parent.expression === node) return true;
    if (
      ts.isParenthesizedExpression(parent) ||
      ts.isAsExpression(parent) ||
      ts.isSatisfiesExpression(parent) ||
      ts.isNonNullExpression(parent) ||
      ts.isPropertyAssignment(parent) ||
      ts.isObjectLiteralExpression(parent) ||
      ts.isArrayLiteralExpression(parent) ||
      ts.isConditionalExpression(parent) ||
      ts.isBinaryExpression(parent)
    ) {
      node = parent;
      continue;
    }
    return false;
  }
}

type AssertionRoot = "expect" | "assert" | "context" | "namespace";

function assertionRoot(id: ts.Identifier, scope: EvidenceScope): AssertionRoot | undefined {
  const symbol = scope.a.checker.getSymbolAtLocation(id);
  if (symbol === undefined) return id.text === "expect" ? "expect" : id.text === "assert" ? "assert" : undefined;
  if (scope.contextRoots.has(symbol)) return "context";
  if (scope.contextExpect.has(symbol)) return "expect";
  const declaration = symbol.declarations?.[0];
  if (declaration === undefined) return undefined;
  const from = ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration) ? moduleOf(declaration) : undefined;
  if (from === undefined) return undefined;
  if (NODE_ASSERT.has(from)) return "assert";
  if (from !== "vitest") return undefined;
  if (ts.isNamespaceImport(declaration)) return "namespace";
  const name = ts.isImportSpecifier(declaration) ? (declaration.propertyName ?? declaration.name).text : "";
  return name === "expect" ? "expect" : name === "assert" ? "assert" : undefined;
}

/** expect(x).matcher(...), expect.soft/poll(...).matcher, ctx.expect(x).matcher, assert(...) / assert.equal(...). A bare expect(x) asserts nothing. */
function assertionEvidence(call: ts.CallExpression, scope: EvidenceScope): string | undefined {
  let members = 0;
  let nameAtRoot = "";
  let node: ts.Expression = call.expression;
  for (;;) {
    node = unwrap(node);
    if (ts.isPropertyAccessExpression(node)) {
      members += 1;
      nameAtRoot = node.name.text;
      node = node.expression;
    } else if (ts.isElementAccessExpression(node)) {
      members += 1;
      const key = unwrap(node.argumentExpression);
      nameAtRoot = ts.isStringLiteralLike(key) ? key.text : "";
      node = node.expression;
    } else if (ts.isCallExpression(node)) node = node.expression;
    else break;
  }
  if (!ts.isIdentifier(node)) return undefined;
  const root = assertionRoot(node, scope);
  const at = `${basename(scope.a.file)} ${scope.a.where(call)}`;
  if (root === "assert") return `assert at ${at}`;
  if (root === "expect" && members >= 1) return `expect at ${at}`;
  if ((root === "context" || root === "namespace") && members >= 2 && nameAtRoot === "expect") return `${root} expect at ${at}`;
  if (root === "namespace" && nameAtRoot === "assert") return `assert at ${at}`;
  return undefined;
}

/** A function a call reaches statically: same-file declarations, const-bound literals, relative-module exports. */
function calledFunction(call: ts.CallExpression, scope: EvidenceScope): { readonly fn: AnalysedFunction; readonly a: SourceAnalysis } | undefined {
  const callee = unwrap(call.expression);
  if (!ts.isIdentifier(callee)) return undefined;
  const local = localFunction(callee, scope.a);
  if (local !== undefined) return { fn: local, a: scope.a };
  const declaration = scope.a.checker.getSymbolAtLocation(callee)?.declarations?.[0];
  if (declaration === undefined || !ts.isImportSpecifier(declaration)) return undefined;
  const specifier = moduleOf(declaration);
  if (specifier === undefined) return undefined;
  const other = scope.sources.module(scope.a.file, specifier);
  if (other === undefined) return undefined;
  const exported = (declaration.propertyName ?? declaration.name).text;
  for (const statement of other.sf.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name?.text === exported && statement.body !== undefined) return { fn: statement, a: other };
    if (ts.isVariableStatement(statement)) {
      for (const variable of statement.declarationList.declarations) {
        if (!ts.isIdentifier(variable.name) || variable.name.text !== exported || variable.initializer === undefined) continue;
        const initializer = unwrap(variable.initializer);
        if (isFunctionLiteral(initializer)) return { fn: initializer, a: other };
      }
    }
  }
  return undefined;
}

function findIn(root: ts.Node, scope: EvidenceScope): string | undefined {
  let result: string | undefined;
  const visit = (node: ts.Node): void => {
    if (result !== undefined) return;
    if (isFunctionLiteral(node)) {
      if (isInvoked(node)) result = functionEvidence(node, scope);
      return;
    }
    if (ts.isFunctionDeclaration(node) || ts.isClassLike(node)) return;
    if (ts.isCallExpression(node)) {
      result = assertionEvidence(node, scope);
      if (result !== undefined) return;
      const target = calledFunction(node, scope);
      if (target !== undefined) {
        result = functionEvidence(target.fn, { ...scope, a: target.a });
        if (result !== undefined) return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return result;
}

function walkBlock(statements: readonly ts.Statement[], scope: EvidenceScope): Walk {
  for (const statement of statements) {
    const step = walkStatement(statement, scope);
    if (step.evidence !== undefined) return step;
    if (step.exit !== "none") return { evidence: undefined, exit: step.exit };
  }
  return CONTINUES;
}

function walkStatement(statement: ts.Statement, scope: EvidenceScope): Walk {
  if (ts.isBlock(statement)) return walkBlock(statement.statements, scope);
  if (ts.isExpressionStatement(statement)) return found(findIn(statement.expression, scope));
  if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      const evidence = declaration.initializer === undefined ? undefined : findIn(declaration.initializer, scope);
      if (evidence !== undefined) return found(evidence);
    }
    return CONTINUES;
  }
  if (ts.isReturnStatement(statement)) return { evidence: statement.expression === undefined ? undefined : findIn(statement.expression, scope), exit: "return" };
  if (ts.isThrowStatement(statement)) return { evidence: findIn(statement.expression, scope), exit: "return" };
  if (ts.isBreakStatement(statement) || ts.isContinueStatement(statement)) return { evidence: undefined, exit: "jump" };
  if (ts.isIfStatement(statement)) {
    const condition = findIn(statement.expression, scope);
    if (condition !== undefined) return found(condition);
    const truth = literalTruth(statement.expression);
    const then = truth === false ? CONTINUES : walkStatement(statement.thenStatement, scope);
    if (then.evidence !== undefined) return found(then.evidence);
    const otherwise = truth === true || statement.elseStatement === undefined ? CONTINUES : walkStatement(statement.elseStatement, scope);
    if (otherwise.evidence !== undefined) return found(otherwise.evidence);
    if (truth === true) return then;
    if (truth === false) return otherwise;
    if (statement.elseStatement !== undefined && then.exit !== "none" && otherwise.exit !== "none") return { evidence: undefined, exit: then.exit === "return" && otherwise.exit === "return" ? "return" : "jump" };
    return CONTINUES;
  }
  if (ts.isForOfStatement(statement) || ts.isForInStatement(statement)) {
    const head = findIn(statement.expression, scope);
    if (head !== undefined) return found(head);
    return isEmptyArray(statement.expression) ? CONTINUES : found(walkStatement(statement.statement, scope).evidence);
  }
  if (ts.isForStatement(statement)) {
    const head = (statement.initializer === undefined ? undefined : findIn(statement.initializer, scope)) ?? (statement.condition === undefined ? undefined : findIn(statement.condition, scope));
    if (head !== undefined) return found(head);
    if (statement.condition !== undefined && literalTruth(statement.condition) === false) return CONTINUES;
    return found(walkStatement(statement.statement, scope).evidence ?? (statement.incrementor === undefined ? undefined : findIn(statement.incrementor, scope)));
  }
  if (ts.isWhileStatement(statement)) {
    const head = findIn(statement.expression, scope);
    if (head !== undefined) return found(head);
    return literalTruth(statement.expression) === false ? CONTINUES : found(walkStatement(statement.statement, scope).evidence);
  }
  if (ts.isDoStatement(statement)) return found(walkStatement(statement.statement, scope).evidence ?? findIn(statement.expression, scope));
  if (ts.isTryStatement(statement)) {
    const attempt = walkBlock(statement.tryBlock.statements, scope);
    if (attempt.evidence !== undefined) return attempt;
    const recovery = statement.catchClause === undefined ? CONTINUES : walkBlock(statement.catchClause.block.statements, scope);
    if (recovery.evidence !== undefined) return recovery;
    const final = statement.finallyBlock === undefined ? CONTINUES : walkBlock(statement.finallyBlock.statements, scope);
    if (final.evidence !== undefined || final.exit !== "none") return final;
    return attempt.exit === "return" && (statement.catchClause === undefined || recovery.exit === "return") ? { evidence: undefined, exit: "return" } : CONTINUES;
  }
  if (ts.isLabeledStatement(statement)) {
    const inner = walkStatement(statement.statement, scope);
    return inner.evidence !== undefined ? inner : { evidence: undefined, exit: inner.exit === "return" ? "return" : "none" };
  }
  if (ts.isSwitchStatement(statement)) {
    const head = findIn(statement.expression, scope);
    if (head !== undefined) return found(head);
    const discriminant = unwrap(statement.expression);
    const literal = ts.isNumericLiteral(discriminant) || ts.isStringLiteralLike(discriminant) ? discriminant.text : undefined;
    let live = false;
    for (const clause of statement.caseBlock.clauses) {
      if (ts.isCaseClause(clause)) {
        const label = findIn(clause.expression, scope);
        if (label !== undefined) return found(label);
        const value = unwrap(clause.expression);
        const matches = literal === undefined || !(ts.isNumericLiteral(value) || ts.isStringLiteralLike(value)) || value.text === literal;
        live = live || matches;
      } else live = true;
      if (!live) continue;
      const step = walkBlock(clause.statements, scope);
      if (step.evidence !== undefined) return step;
      if (step.exit !== "none") live = false;
    }
    return CONTINUES;
  }
  if (
    ts.isFunctionDeclaration(statement) ||
    ts.isClassDeclaration(statement) ||
    ts.isInterfaceDeclaration(statement) ||
    ts.isTypeAliasDeclaration(statement) ||
    ts.isEnumDeclaration(statement) ||
    ts.isModuleDeclaration(statement) ||
    ts.isImportDeclaration(statement) ||
    ts.isEmptyStatement(statement)
  ) {
    return CONTINUES;
  }
  return found(findIn(statement, scope));
}

function functionEvidence(fn: AnalysedFunction, scope: EvidenceScope): string | undefined {
  if (scope.visited.has(fn) || scope.depth > 8 || fn.body === undefined) return undefined;
  scope.visited.add(fn);
  const inner: EvidenceScope = { ...scope, depth: scope.depth + 1 };
  return ts.isBlock(fn.body) ? walkBlock(fn.body.statements, inner).evidence : findIn(fn.body, inner);
}

/** Symbols bound to the case's test context: the parameter itself, or its destructured expect. */
function contextSymbols(fn: AnalysedFunction, index: number, a: SourceAnalysis): { readonly roots: Set<ts.Symbol>; readonly expects: Set<ts.Symbol> } {
  const roots = new Set<ts.Symbol>();
  const expects = new Set<ts.Symbol>();
  const parameter = index < 0 ? undefined : fn.parameters[index];
  const symbolOf = (name: ts.BindingName): ts.Symbol | undefined => (ts.isIdentifier(name) ? a.checker.getSymbolAtLocation(name) : undefined);
  if (parameter !== undefined && ts.isIdentifier(parameter.name)) {
    const symbol = symbolOf(parameter.name);
    if (symbol !== undefined) roots.add(symbol);
  } else if (parameter !== undefined && ts.isObjectBindingPattern(parameter.name)) {
    for (const element of parameter.name.elements) {
      const symbol = bindingKey(element) === "expect" ? symbolOf(element.name) : undefined;
      if (symbol !== undefined) expects.add(symbol);
    }
  }
  return { roots, expects };
}

// ---------------------------------------------------------------------------------------------
// The judge: one verdict per pin, attribution in every red.
// ---------------------------------------------------------------------------------------------

function verdict(pin: CasePin, leg: CensusLeg, code: CensusCode, why: string, cases = 0): PinVerdict {
  return { pin, ok: code === "ok", leg, code, why: `${pin.file} "${pin.title}" [${pin.tier}]: ${why}`, cases };
}

const sameSuite = (pin: CasePin, path: readonly string[]): boolean => pin.suite === undefined || (pin.suite.length === path.length && pin.suite.every((name, index) => name === path[index]));
/** The case ran under the tier: registered to run and reached a result (passed or failed). */
const ran = (test: RunCase): boolean => test.mode === "run" && (test.state === "passed" || test.state === "failed");

/** The registration's test function: its last function argument, or a named same-file function. */
function caseFunction(call: ts.CallExpression, a: SourceAnalysis): AnalysedFunction | undefined {
  for (let index = call.arguments.length - 1; index >= 0; index -= 1) {
    const argument = call.arguments[index];
    if (argument === undefined) continue;
    const fn = localFunction(argument, a);
    if (fn !== undefined) return fn;
  }
  return undefined;
}

/** Index of the test context among the case function's parameters: it.for passes it second, it.each never. */
function contextIndex(call: ts.CallExpression): number {
  const callee = unwrap(call.expression);
  if (ts.isCallExpression(callee)) {
    const head = unwrap(callee.expression);
    if (ts.isPropertyAccessExpression(head) && head.name.text === "for") return 1;
    if (ts.isPropertyAccessExpression(head) && head.name.text === "each") return -1;
  }
  return 0;
}

/** The row count of an it.each / it.for table written as an array literal without spreads; undefined otherwise. */
function literalRows(site: ts.CallExpression): number | undefined {
  const head = unwrap(site.expression);
  const table = ts.isCallExpression(head) ? head.arguments[0] : undefined;
  if (table === undefined) return undefined;
  const value = unwrap(table);
  if (!ts.isArrayLiteralExpression(value) || value.elements.some(ts.isSpreadElement)) return undefined;
  return value.elements.length;
}

interface Located {
  readonly cases: readonly RunCase[];
  readonly call: ts.CallExpression | undefined;
}

/**
 * The pinned case as the runner reported it. "Collected exactly once" (owner ruling 13:30Z), and for an .each pin
 * exactly once PER TABLE ROW with the table non-empty (13:36Z amendment): one suite path, at least max(1, minCases)
 * cases, and exactly one case per row when the table is a literal.
 */
function locate(pin: CasePin, module: RunModule, a: SourceAnalysis): Located | PinVerdict {
  if (pin.each !== undefined) {
    const sites = a.eachSites(pin.title);
    if (sites.length === 0) return verdict(pin, "exists", "absent", "no it.each / it.for call site registers this template");
    if (sites.length > 1) return verdict(pin, "exists", "duplicated", `${sites.length} it.each / it.for call sites register this template`);
    const site = sites[0];
    if (site === undefined) return verdict(pin, "exists", "absent", "no call site");
    const keys = new Set(a.callKeys(site));
    const cases = module.tests.filter(test => keys.has(`${test.line}:${test.column}`) && sameSuite(pin, test.suitePath));
    const suites = new Set(cases.map(test => JSON.stringify(test.suitePath)));
    if (suites.size > 1) return verdict(pin, "exists", "duplicated", `the call site registers its table under ${suites.size} suites; each row must be collected exactly once`, cases.length);
    const minimum = Math.max(1, pin.each.minCases);
    if (cases.length < minimum) return verdict(pin, "exists", "each-empty", `the table registered ${cases.length} case(s); the census needs at least ${minimum}`, cases.length);
    const rows = literalRows(site);
    if (rows !== undefined && cases.length !== rows) {
      return verdict(pin, "exists", cases.length > rows ? "duplicated" : "each-empty", `the runner collected ${cases.length} case(s) for a ${rows}-row table; each row must be collected exactly once`, cases.length);
    }
    return { cases, call: site };
  }
  const cases = module.tests.filter(test => test.name === pin.title && sameSuite(pin, test.suitePath));
  if (cases.length === 0) return verdict(pin, "exists", "absent", "the runner collected no case with this title");
  if (cases.length > 1) return verdict(pin, "exists", "duplicated", `the runner collected ${cases.length} cases with this title`, cases.length);
  const only = cases[0];
  return { cases, call: only === undefined ? undefined : a.callAt(only.line, only.column) };
}

interface JudgeContext {
  readonly root: string;
  readonly tierOf: (tier: string) => TierResolution;
  readonly runs: ReadonlyMap<string, TierRun>;
  readonly sources: SourceCache;
}

function moduleIn(run: TierRun | undefined, absolute: string): RunModule | undefined {
  if (run === undefined || !run.ok) return undefined;
  const target = realOrSelf(absolute);
  return run.report.modules.find(module => realOrSelf(module.file) === target);
}

const scheduledIn = (run: TierRun, absolute: string): boolean => run.ok && run.report.scheduled.some(file => realOrSelf(file) === realOrSelf(absolute));

interface Cause {
  readonly code: CensusCode;
  readonly detail: string;
}

/** A skip reachable from the pin's own case function or from a hook of its own enclosing call chain (never file-wide). */
function chainCause(call: ts.CallExpression, fn: AnalysedFunction | undefined, a: SourceAnalysis, registered: ReadonlySet<string>): Cause | undefined {
  const hazard = extendHazard(call, a) ?? (fn === undefined ? undefined : contextHazard(fn, contextIndex(call), a));
  if (hazard !== undefined) return { code: hazard.kind === "skip" ? "context-skip" : "context-unknown", detail: hazard.detail };
  const hook = chainHazard(call, a, registered);
  if (hook !== undefined) return { code: hook.kind === "skip" ? "hook-skip" : "context-unknown", detail: hook.detail };
  return undefined;
}

function judgeOne(pin: CasePin, context: JudgeContext): PinVerdict {
  const resolution = context.tierOf(pin.tier);
  if (!resolution.ok) return verdict(pin, "runs-where", "tier-unresolved", resolution.why);
  const absolute = resolve(context.root, pin.file);
  const loaded = context.sources.get(absolute);
  if (loaded.kind !== "ok") return verdict(pin, "exists", loaded.kind, loaded.why);
  const a = loaded.analysis;
  const run = context.runs.get(pin.tier);
  if (run === undefined || !run.ok) return verdict(pin, "runs-where", "run-error", `the ${pin.tier} tier run failed: ${run?.why ?? "it never started"}`);
  const module = moduleIn(run, absolute);
  if (module === undefined) {
    if (scheduledIn(run, absolute)) return verdict(pin, "runs-where", "run-error", `the ${pin.tier} tier run scheduled this file but never ran it (its global setup or the run aborted first)`);
    return verdict(pin, "runs-where", "not-collected", `the ${pin.tier} tier run does not collect this file (${resolution.chain.join(" -> ")})`);
  }
  if (module.errors.length > 0) return verdict(pin, "exists", "collection-error", `the runner could not collect the file: ${module.errors[0] ?? ""}`);
  const located = locate(pin, module, a);
  if ("ok" in located) return located;
  const count = located.cases.length;
  const registered = new Set<string>();
  for (const test of module.tests) registered.add(`${test.line}:${test.column}`);
  for (const suite of module.suites) registered.add(`${suite.line}:${suite.column}`);
  const call = located.call;
  const fn = call === undefined ? undefined : caseFunction(call, a);
  for (const test of located.cases) {
    if (test.fails) return verdict(pin, "asserts", "inverted", "registered with fails: it passes only when its assertions fail", count);
    if (test.mode !== "run") {
      return verdict(pin, "runs-where", "skipped", `the ${pin.tier} run collected the case with mode ${test.mode}: a skip / todo modifier, a skipping options value or a name filter keeps it from running`, count);
    }
    if (test.state === "failed") {
      if (test.errors.some(error => error.includes(NO_ASSERTION))) return verdict(pin, "asserts", "no-assertion", `the case reached no assertion when ${pin.tier} ran it`, count);
      return verdict(pin, "asserts", "failed", `the case failed when ${pin.tier} ran it: ${test.errors[0] ?? "no error message"}`, count);
    }
    if (test.state !== "passed") {
      const cause = call === undefined ? undefined : chainCause(call, fn, a, registered);
      if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
      return verdict(pin, "runs-where", "skipped", `${pin.tier} ran the file but not the case (result ${test.state}); nothing in its own call chain skips it, so a setup file, a config filter or a CLI flag did`, count);
    }
  }
  if (pin.tier !== DEFAULT_GATE_TIER) {
    const gate = context.tierOf(DEFAULT_GATE_TIER);
    if (!gate.ok) return verdict(pin, "runs-where", "tier-unresolved", `exclusivity against the default gate is unverifiable: ${gate.why}`, count);
    const gateRun = context.runs.get(DEFAULT_GATE_TIER);
    if (gateRun === undefined || !gateRun.ok) return verdict(pin, "runs-where", "run-error", `exclusivity against the default gate is unverifiable: ${gateRun?.why ?? "the default gate never ran"}`, count);
    const gateModule = moduleIn(gateRun, absolute);
    if (gateModule !== undefined && gateModule.errors.length > 0) return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also collects the file (and fails to load it: ${gateModule.errors[0] ?? ""})`, count);
    const shared = gateModule?.tests.filter(test => ran(test) && located.cases.some(own => own.name === test.name && own.line === test.line && own.column === test.column));
    if (shared !== undefined && shared.length > 0) return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also runs it`, count);
  }
  if (call === undefined) return verdict(pin, "asserts", "unmapped-location", "the runner's location maps to no call expression", count);
  if (fn === undefined) return verdict(pin, "asserts", "body-unresolved", `the case function at ${a.where(call)} is not statically resolvable`, count);
  const cause = chainCause(call, fn, a, registered);
  if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
  const index = contextIndex(call);
  const symbols = contextSymbols(fn, index, a);
  const evidence = functionEvidence(fn, { a, sources: context.sources, contextRoots: symbols.roots, contextExpect: symbols.expects, visited: new Set(), depth: 0 });
  if (evidence === undefined) return verdict(pin, "asserts", "no-assertion", `the run counted an assertion, but no matcher-bearing vitest assertion is reachable in the case function at ${a.where(fn)} (a bare expect(x) asserts nothing)`, count);
  const runs = count === 1 ? "collected once" : `collected once per table row (${count} rows)`;
  return verdict(pin, "asserts", "ok", `${runs}, passed under ${pin.tier}, asserts (${evidence})`, count);
}

/**
 * Judges every pin by EXECUTING each claimed tier's real entrypoint once (plus the default gate for the
 * exclusivity of non-default tiers), one tier after another, then the AST inner legs. Verdicts come back in pin
 * order. Inside a tier run the helper started, it starts nothing and every verdict is a nested-run red.
 */
export async function judgePins(root: string, pins: readonly CasePin[], options: JudgeOptions = {}): Promise<readonly PinVerdict[]> {
  if (process.env[NESTED_ENV] === "1") {
    return pins.map(pin => verdict(pin, "runs-where", "nested-run", "reached from inside a tier run the census helper started; it never starts another one there (recursion guard)"));
  }
  const realRoot = realpathSync(root);
  const resolutions = new Map<string, TierResolution>();
  const tierOf = (tier: string): TierResolution => {
    let resolution = resolutions.get(tier);
    if (resolution === undefined) {
      resolution = resolveTier(realRoot, tier);
      resolutions.set(tier, resolution);
    }
    return resolution;
  };
  const filesByTier = new Map<string, Set<string>>();
  const add = (tier: string, file: string): void => {
    let files = filesByTier.get(tier);
    if (files === undefined) {
      files = new Set();
      filesByTier.set(tier, files);
    }
    files.add(file);
  };
  for (const pin of pins) {
    add(pin.tier, pin.file);
    if (pin.tier !== DEFAULT_GATE_TIER) add(DEFAULT_GATE_TIER, pin.file);
  }
  const runs = new Map<string, TierRun>();
  for (const [tier, files] of filesByTier) {
    const resolution = tierOf(tier);
    if (resolution.ok) runs.set(tier, await runTier(realRoot, resolution, [...files].sort(), options));
  }
  const context: JudgeContext = { root: realRoot, tierOf, runs, sources: new SourceCache() };
  return pins.map(pin => judgeOne(pin, context));
}

// ---------------------------------------------------------------------------------------------
// Docs: the rendered view (marked's lexer), one view for uniqueness and extraction.
// ---------------------------------------------------------------------------------------------

const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const clean = (text: string): string => text.replace(/\s+/g, " ").trim();
const ENTITIES: Readonly<Record<string, string>> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&nbsp;": " " };
const decode = (text: string): string => text.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, entity => ENTITIES[entity] ?? entity);

/** What a reader sees of inline tokens: markup and HTML (comments included) render no text. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") continue;
    if (token.type === "br") out += "\n";
    else if (token.type === "codespan" || token.type === "escape") out += decode(textOf(token));
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token));
    else out += decode(textOf(token));
  }
  return out;
}

function blockText(tokens: readonly Token[]): string {
  return tokens
    .map(token => {
      if (token.type === "html") return "";
      if (token.type === "code") return textOf(token);
      if (isList(token)) return token.items.map(item => blockText(childrenOf(item))).join(" ");
      return childrenOf(token).length > 0 ? inlineText(childrenOf(token)) : decode(textOf(token));
    })
    .join(" ");
}

function containsHtml(tokens: readonly Token[]): boolean {
  return tokens.some(token => token.type === "html" || containsHtml(childrenOf(token)) || (isList(token) && token.items.some(item => containsHtml(childrenOf(item)))));
}

function toBlock(token: Token): RenderedBlock | undefined {
  if (token.type === "space") return undefined;
  if (isHeading(token)) return { kind: "heading", depth: token.depth, text: clean(inlineText(childrenOf(token))) };
  if (token.type === "paragraph") return { kind: "paragraph", text: clean(inlineText(childrenOf(token))), markdown: clean(textOf(token)) };
  if (isList(token)) return { kind: "list", ordered: token.ordered, items: token.items.map(item => ({ text: clean(blockText(childrenOf(item))), markdown: clean(item.text) })) };
  if (token.type === "code") return { kind: "code", text: textOf(token) };
  if (token.type === "html") return { kind: "html", text: textOf(token) };
  return { kind: "other", type: token.type, text: clean(textOf(token)) };
}

/** A source line the markdown grammar renders as an ATX heading wherever nothing hides it. */
const HEADING_LINE = /^ {0,3}#{1,6}(?:[ \t]|$)/;

/** An HTML block or code fence inside the section whose source carries a heading line (D10). */
function spanningBlock(tokens: readonly Token[]): { readonly kind: string; readonly line: string } | undefined {
  for (const token of tokens) {
    if (token.type === "html" || token.type === "code") {
      const line = token.raw.split("\n").find(candidate => HEADING_LINE.test(candidate));
      if (line !== undefined) return { kind: token.type === "html" ? "an HTML block" : "a code block", line: line.trim() };
    }
    const nested = spanningBlock(isList(token) ? token.items.flatMap(item => childrenOf(item)) : childrenOf(token));
    if (nested !== undefined) return nested;
  }
  return undefined;
}

/** The rendered headings enclosing the heading at index, outermost first. */
function parentPath(tokens: readonly Token[], index: number): string[] {
  const stack: { readonly depth: number; readonly text: string }[] = [];
  for (const token of tokens.slice(0, index)) {
    if (!isHeading(token)) continue;
    while (stack.length > 0 && (stack[stack.length - 1]?.depth ?? 0) >= token.depth) stack.pop();
    stack.push({ depth: token.depth, text: clean(inlineText(childrenOf(token))) });
  }
  const own = tokens[index];
  const depth = own !== undefined && isHeading(own) ? own.depth : 7;
  return stack.filter(entry => entry.depth < depth).map(entry => entry.text);
}

const refused = (why: string): DocsSection => ({ ok: false, why, blocks: [], hasHtml: false });

/**
 * The rendered section under a heading. The heading must occur exactly once in the rendered view (a copy hidden
 * in a comment or a code fence is not a heading) under exactly the parent heading path the census binds (D9: a
 * level-1 heading inserted above re-homes the section, so it reddens), and the section runs to the next heading
 * of level 1 or 2 (or of the pinned level, if deeper) or EOF, so a ### subsection belongs to it (FOLD-1). An HTML
 * block or code fence inside the section that carries a heading line hides a heading boundary from the rendered
 * view (D10, the same-view straddle) and reddens the section, as the hidden heading's own section is absent.
 */
export function docsSection(markdown: string, heading: string, depth: number, parents: readonly string[]): DocsSection {
  const tokens = marked.lexer(markdown);
  const starts = tokens.flatMap((token, index) => (isHeading(token) && token.depth === depth && clean(inlineText(childrenOf(token))) === heading ? [index] : []));
  if (starts.length === 0) return refused(`the rendered view has no level-${depth} heading "${heading}"`);
  if (starts.length > 1) return refused(`the heading "${heading}" occurs ${starts.length} times in the rendered view; a pinned section needs it exactly once`);
  const start = starts[0] ?? 0;
  const path = parentPath(tokens, start);
  if (path.length !== parents.length || path.some((text, index) => text !== parents[index])) {
    return refused(`the heading "${heading}" sits under the parent heading path ${JSON.stringify(path)}; the census binds it under ${JSON.stringify(parents)}`);
  }
  const bound = Math.max(2, depth);
  const section: Token[] = [];
  for (const token of tokens.slice(start + 1)) {
    if (isHeading(token) && token.depth <= bound) break;
    section.push(token);
  }
  const spanning = spanningBlock(section);
  if (spanning !== undefined) return refused(`${spanning.kind} inside the section spans the heading line ${JSON.stringify(spanning.line)}, hiding a heading boundary from the rendered view`);
  const blocks = section.map(toBlock).filter((block): block is RenderedBlock => block !== undefined);
  return { ok: true, why: "", blocks, hasHtml: containsHtml(section) };
}

// ---------------------------------------------------------------------------------------------
// Source structure: imports and top-level declarations from the AST (comment- and string-blind by
// construction), for pins such as "reuses the shared fixture and defines no second one" (0kg.7 F10 / X16).
// ---------------------------------------------------------------------------------------------

export interface SourceImport {
  readonly module: string;
  /** Imported binding names as exported by the module ("default", "*" for a namespace); [] for a side-effect import. */
  readonly names: readonly string[];
  /** static import / export-from (load at module evaluation), dynamic import(), or require(). */
  readonly kind: "static" | "export-from" | "dynamic" | "require";
  /** True when the declaration is erased at runtime (import type / all specifiers type-only): it loads nothing. */
  readonly typeOnly: boolean;
  readonly line: number;
}
export interface SourceStructure {
  readonly ok: boolean;
  readonly why: string;
  readonly imports: readonly SourceImport[];
  /** Names declared at the top level: functions, classes, enums and every const/let/var binding. */
  readonly declarations: readonly string[];
}

function bindingNames(name: ts.BindingName, out: string[]): void {
  if (ts.isIdentifier(name)) out.push(name.text);
  else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bindingNames(element.name, out);
}

/** Imports and top-level declarations of one file, read from its AST; an unreadable or unparseable file fails closed. */
export function sourceStructure(root: string, file: string): SourceStructure {
  const loaded = new SourceCache().get(resolve(root, file));
  if (loaded.kind !== "ok") return { ok: false, why: `${file}: ${loaded.why}`, imports: [], declarations: [] };
  const a = loaded.analysis;
  const imports: SourceImport[] = [];
  const declarations: string[] = [];
  const line = (node: ts.Node): number => a.sf.getLineAndCharacterOfPosition(node.getStart(a.sf)).line + 1;
  for (const statement of a.sf.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      const names: string[] = [];
      let typeOnly = clause?.isTypeOnly === true;
      if (clause?.name !== undefined) names.push("default");
      const bindings = clause?.namedBindings;
      if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push("*");
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
        if (clause?.name === undefined && bindings.elements.length > 0 && bindings.elements.every(element => element.isTypeOnly)) typeOnly = true;
      }
      imports.push({ module: statement.moduleSpecifier.text, names, kind: "static", typeOnly, line: line(statement) });
    } else if (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.exportClause;
      const names = clause === undefined ? ["*"] : ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text) : ["*"];
      imports.push({ module: statement.moduleSpecifier.text, names, kind: "export-from", typeOnly: statement.isTypeOnly, line: line(statement) });
    } else if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement)) && statement.name !== undefined) {
      declarations.push(statement.name.text);
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) bindingNames(declaration.name, declarations);
    }
  }
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      const literal = first !== undefined && ts.isStringLiteralLike(first) ? first.text : undefined;
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword && literal !== undefined) imports.push({ module: literal, names: ["*"], kind: "dynamic", typeOnly: false, line: line(node) });
      if (ts.isIdentifier(node.expression) && node.expression.text === "require" && literal !== undefined) imports.push({ module: literal, names: ["*"], kind: "require", typeOnly: false, line: line(node) });
    }
    ts.forEachChild(node, visit);
  };
  visit(a.sf);
  return { ok: true, why: "", imports, declarations };
}
