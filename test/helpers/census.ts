/**
 * wb-u62: the shared title-census FLOOR helper (owner program ruling 2026-10-16 12:22Z; one helper,
 * never N per-census scanners - 15 scanner variants are 15 divergence surfaces, the GATE-STEER1 class).
 *
 * A census pins named test cases and docs sections and must go red, naming the pin and the cause,
 * when a pinned case would no longer EXIST, RUN where its tier label says, or ASSERT (the three legs).
 * "Closed" (owner ruling on the 6ze.38 verdict): a pin counts only when it is COLLECTED EXACTLY ONCE (an
 * it.each / it.for pin: once per table row, table non-empty) and its RESULT IS PASSED under the claimed tier
 * ENTRYPOINT. Two modes read that, by the owner's three-stage ruling on the u62 gate-1 verdict (2026-10-16 16:12Z:
 * R1 = (b) as the architecture, (a) as the hardening):
 *
 * - REPORT MODE, the default-tier judgment: judge(reportPath, pins) reads vitest's own JSON report of the tier's run
 *   (per-file assertionResults: title, ancestorTitles, status, location) and NEVER re-executes it. The run judged is
 *   the gate's own run, so nothing the judged code can observe tells the judge from the gate (the fabricated-green
 *   class G29, closed by construction). The default tier's report is DEFAULT_TIER_REPORT, written by the gate's own test
 *   step (wb-nl8); a live tier is judged only over ITS OWN report by a census leg inside that tier (R2 = (i)). The report
 *   must carry task locations (includeTaskLocation): the runner-located call site anchors the AST legs. What the report
 *   cannot carry, report mode reads from the source and fails closed on: the fails inversion (an inverted case is
 *   recorded as passed) and the third leg (no runtime assertion count, so an exit reachable before the first assertion
 *   reddens, a break out of a labeled block included). A pinned file changed after the report, or a report that records
 *   the judging file itself, is refused. DESIGN INVARIANT (owner, 2026-10-16 21:29Z, the U1 lesson of record): every
 *   value flow report mode reads fails closed to options-unknown when it cannot resolve - the inversion is read only
 *   through a callee whose chain root is vitest's it / test (U1), inside callbacks held by vitest's describe / suite
 *   (I1), with same-file const options; anything else is options-unknown naming what it could not resolve.
 * - EXECUTING MODE, for fixtures and non-default tiers only (never the default tier once wb-nl8 lands): judgePins
 *   EXECUTES each claimed tier's real command - the forge.toml step through its npm script, with setupFiles /
 *   globalSetup, testNamePattern, include/exclude and every CLI flag as the gate runs them (owner ruling on the 6hb.7
 *   verdict) - with the census reporter, --includeTaskLocation and --expect.requireAssertions appended. The judged code's
 *   environment is the gate's: the helper adds NO name to it (the report path and the recursion guard travel on the
 *   run's command line) and strips only what vitest itself sets in a worker, so every operator name, VITEST_MAX_WORKERS
 *   included, passes through (J1-J4).
 *   NAMED RESIDUAL (executing mode): a judge that re-executes stays detectable through channels other than the
 *   environment - the parent-process argv (the per-run census reporter on the vitest command line, the very word the
 *   recursion guard reads), timing, and the narrowed file set. That is why executing mode is never the default-tier
 *   judgment: full closure is report mode, judging the gate's own run.
 * - inner legs (both modes; keep-or-match floors): a parse-aware TypeScript AST scan of the case the RUNNER located
 *   (its reported line:column, never a title search) - a reachable test-context skip in the case body or in a vitest
 *   hook of the pin's own enclosing call chain (never file-wide); the runner's public current-test routes
 *   (getCurrentTest / getCurrentSuite from vitest/suite or @vitest/runner, TestRunner from vitest) read as context
 *   references, fail-closed (J5, the test.extend precedent); fail-closed on context uses it cannot follow; and a bare
 *   expect(x) with no matcher, which the runtime assertion count accepts.
 * - docs: sections from the RENDERED view (marked's lexer, resolved through the pinned @earendil-works/pi-tui
 *   devDependency): unique heading, bounded at the next level-1/2 heading or EOF, bound to its normative parent heading
 *   path (D9), refusing an HTML comment or code fence inside the section that spans a heading boundary (D10). Adopt with
 *   sectionMatches - exact equality of the whole rendered block list, HTML-free (D1-D3); an html block exposes no
 *   rendered text, only its raw source (the D2 footgun).
 *
 * Fail-closed throughout: an unreadable or unparseable file or report, a run error, a tier command outside the
 * modelled grammar or an unanalysable case body is a red verdict naming its cause, never a pass.
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { expect } from "vitest";

/** The forge.toml command the complete gate runs for vitest (forge.toml [build] gate must list it). */
export const DEFAULT_GATE_TIER = "test";
/**
 * The default tier's report (the wb-nl8 interface, bound on the u62 respin spec): the gate's own test step writes
 * vitest's JSON report here, and every default-gate census judges it with judge() - never by executing the tier again.
 */
export const DEFAULT_TIER_REPORT = ".forge/vitest-report.json";


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
  | "no-assertion"
  | "report-unreadable"
  | "report-stale"
  | "report-unlocated"
  | "tier-mismatch"
  | "options-unknown";


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
  /**
   * vitest workers for each tier run, default 2. F2 cap fidelity holds through env fidelity: vitest 4 resolves maxWorkers
   * from VITEST_MAX_WORKERS OVER the CLI flag, so the operator's cap, passed through, bounds every run the helper starts.
   */
  readonly maxWorkers?: number;
}

/** Report mode's options: the report belongs to ONE tier's run, read relative to one repository root. */
export interface ReportOptions {
  /** The repository root the pins' files are relative to; default: the directory holding the report's .forge directory. */
  readonly root?: string;
  /** The tier whose own run wrote the report; default DEFAULT_GATE_TIER. A pin of any other tier is refused (R2 = (i)). */
  readonly tier?: string;
  /** A non-default tier's exclusivity is read from the default tier's report; default <root>/DEFAULT_TIER_REPORT. */
  readonly defaultReport?: string;
}

export interface RenderedText {
  /** What a reader sees: inline markup and HTML comments removed, whitespace collapsed. */
  readonly text: string;
  /** The source markdown of the block, whitespace collapsed. */
  readonly markdown: string;
}
/**
 * A rendered block. Every text field is what a READER sees: an html block renders none (its source is only under raw,
 * the D2 footgun closed), and an other block (a blockquote, a table) carries its rendered text, HTML excluded.
 */
export type RenderedBlock =
  | { readonly kind: "heading"; readonly depth: number; readonly text: string }
  | { readonly kind: "paragraph"; readonly text: string; readonly markdown: string }
  | { readonly kind: "list"; readonly ordered: boolean; readonly items: readonly RenderedText[] }
  | { readonly kind: "code"; readonly text: string }
  | { readonly kind: "html"; readonly text: ""; readonly raw: string }
  | { readonly kind: "other"; readonly type: string; readonly text: string };
/** The docs adoption verdict (sectionMatches). */
export interface SectionMatch {
  readonly ok: boolean;
  readonly why: string;
}

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
  /** The case's result state when the tier ran: passed, failed, skipped or pending (report mode: the report's status). */
  readonly state: string;
  readonly errors: readonly string[];
  /** Report mode only: the case's tags as the report records them (a config tag definition may set fails). */
  readonly tags?: readonly string[];
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

/**
 * What vitest itself sets in a worker's environment (measured on 4.1.10): a tier run started from inside a worker must
 * not inherit these, and NOTHING else is touched - every operator name (VITEST_MAX_WORKERS included) passes through and
 * the helper adds none, so the judged code sees the gate's environment (J1-J4).
 */
const VITEST_WORKER_ENV = new Set(["VITEST", "VITEST_MODE", "VITEST_POOL_ID", "VITEST_WORKER_ID", "TEST", "BASE_URL", "MODE", "DEV", "PROD", "SSR", "FORCE_TTY"]);
const NO_ASSERTION = "expected any number of assertion, but got none";

function runEnv(): NodeJS.ProcessEnv {
  const inWorker = process.env.VITEST !== undefined;
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || (inWorker && VITEST_WORKER_ENV.has(key))) continue;
    env[key] = value;
  }
  return env;
}

/**
 * Each tier run gets its own directory holding a generated reporter module that writes the run's report next to
 * itself, so the report path reaches the run only through its command line (--reporter=<that module>), never through
 * the environment the judged code reads. The same command-line word marks the run for the recursion guard.
 */
const RUN_DIR_PREFIX = "census-run.";
const RUN_REPORTER = "census-reporter-run.ts";
const RUN_MARKER = /census-run\.[^/\s]+\/census-reporter-run\.ts/;

const runReporterSource = (out: string): string =>
  [`import CensusReporter from ${JSON.stringify(REPORTER)};`, "", "export default class CensusRunReporter extends CensusReporter {", "  constructor() {", `    super(${JSON.stringify(out)});`, "  }", "}", ""].join("\n");

/** This process's command line and its ancestors', from /proc (or one ps listing where /proc is absent); undefined when neither answers. */
function ancestorCommandLines(): readonly string[] | undefined {
  try {
    const lines: string[] = [];
    let pid = process.pid;
    for (let depth = 0; depth < 64 && pid > 1; depth += 1) {
      lines.push(readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0").join(" "));
      const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
      const parent = Number(stat.slice(stat.lastIndexOf(")") + 2).split(" ")[1]);
      if (!Number.isInteger(parent) || parent < 1) break;
      pid = parent;
    }
    return lines;
  } catch {
    const listing = spawnSync("ps", ["-ww", "-A", "-o", "pid=,ppid=,args="], { encoding: "utf8" });
    if (listing.status !== 0) return undefined;
    const table = new Map<number, { readonly parent: number; readonly args: string }>();
    for (const row of listing.stdout.split("\n")) {
      const match = /^\s*(\d+)\s+(\d+)\s(.*)$/.exec(row);
      if (match?.[1] !== undefined && match[2] !== undefined) table.set(Number(match[1]), { parent: Number(match[2]), args: match[3] ?? "" });
    }
    const lines: string[] = [];
    for (let pid = process.pid, depth = 0; depth < 64 && pid > 1; depth += 1) {
      const entry = table.get(pid);
      if (entry === undefined) break;
      lines.push(entry.args);
      pid = entry.parent;
    }
    return lines.length > 0 ? lines : undefined;
  }
}

/**
 * The recursion guard, carried on the run's command line instead of the environment: is this process inside a tier run
 * the helper started (an ancestor's command line names a per-run census reporter)? Fail-closed: when the ancestry cannot
 * be read, the answer is yes, so the helper never starts a run it cannot bound.
 */
function insideCensusRun(): boolean {
  const lines = ancestorCommandLines();
  return lines === undefined || lines.some(line => RUN_MARKER.test(line));
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
function censusCommand(resolution: TierResolution, files: readonly string[], reporter: string, options: JudgeOptions): string | undefined {
  const words = tokenize(resolution.command);
  if (!words.ok) return undefined;
  const npm = words.value[0] === "npm" && !words.value.includes("--");
  const maxWorkers = resolution.argv.some(word => /^--max(?:Workers|-workers)(?:=|$)/.test(word));
  const extra = [
    ...(narrowable(resolution.argv) ? files : []),
    `--reporter=${reporter}`,

    "--includeTaskLocation",
    "--expect.requireAssertions",
    ...(maxWorkers ? [] : [`--maxWorkers=${options.maxWorkers ?? 2}`]),
  ];
  if (extra.some(word => /['\n\r]/.test(word))) return undefined;
  return [resolution.command, ...(npm ? ["--"] : []), ...extra.map(word => `'${word}'`)].join(" ");
}

async function runTier(root: string, resolution: TierResolution, files: readonly string[], options: JudgeOptions): Promise<TierRun> {
  const dir = mkdtempSync(join(tmpdir(), RUN_DIR_PREFIX));
  const out = join(dir, "report.json");
  const reporter = join(dir, RUN_REPORTER);
  try {
    writeFileSync(reporter, runReporterSource(out));
    const line = censusCommand(resolution, files, reporter, options);
    if (line === undefined) return { ok: false, why: "a pinned path or the reporter path cannot be quoted for the shell" };
    const timeoutMs = options.timeoutMs ?? 300_000;
    const exit = await new Promise<{ readonly code: number | null; readonly stderr: string; readonly timedOut: boolean }>(settle => {
      const child = spawn("bash", ["-c", line], { cwd: root, env: runEnv(), stdio: ["ignore", "ignore", "pipe"], detached: true });

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
  /** Files read since the last reset, cache hits included: report mode checks each is older than the report. */
  private readonly reads = new Set<string>();

  touched(): readonly string[] {
    return [...this.reads];
  }

  resetTouched(): void {
    this.reads.clear();
  }

  get(file: string): LoadedSource {
    this.reads.add(file);
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
function chainHazard(call: ts.CallExpression, a: SourceAnalysis, registered: ReadonlySet<string>, sources: SourceCache): Hazard | undefined {

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
        // A registration (located by the runner, or resolved to vitest's API) is a sibling test or suite, never a hook.
        if (a.callKeys(node).some(key => registered.has(key)) || registrationApi(node, a) !== undefined) return;
        const hook = vitestExport(node.expression, a);
        if (hook !== undefined && HOOKS.has(hook)) {
          // A vitest hook's callback is its first argument; a second argument is its timeout.
          const callback = node.arguments[0];
          const fn = callback === undefined ? undefined : localFunction(callback, a);
          if (callback !== undefined && fn === undefined) hazard = unknownAt(a, callback, `the ${hook} callback is not statically analysable`);
          const found = fn === undefined ? undefined : (contextHazard(fn, 0, a) ?? (fn.body === undefined ? undefined : runnerRoute(fn.body, a, sources, `the ${hook} callback`)));
          if (found !== undefined) hazard = { kind: found.kind, detail: `${hook} at ${a.where(node)}: ${found.detail}` };
          return;
        }
        // J5: a call of the pin's own chain that reaches the runner's current suite or test, e.g. getCurrentSuite().on(...).
        const runner = runnerRoute(node.expression, a, sources, "a call in the pin's own call chain");
        if (runner !== undefined) {
          hazard = runner;
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
// J5: the runner's public current-test routes are test-context references (the test.extend precedent).
// ---------------------------------------------------------------------------------------------

/** Modules whose exports reach the runner's current test or suite (vitest/suite re-exports @vitest/runner; vitest/runners). */
const RUNNER_MODULES = new Set(["vitest/suite", "@vitest/runner", "vitest/runners"]);
/** The vitest entry's runner classes: their statics reach the current test (TestRunner.getCurrentTest(), the 4.1 route). */
const RUNNER_CLASSES = new Set(["TestRunner", "VitestTestRunner"]);
/** Modules a dynamic import() or require() may load to reach the runner. */
const RUNNER_LOADS = new Set([...RUNNER_MODULES, "vitest"]);

/** What a reference reaches of the runner's internals: an import from a runner module, or the vitest entry's runner class. */
function runnerBinding(id: ts.Identifier, a: SourceAnalysis): string | undefined {
  const declaration = a.checker.getSymbolAtLocation(id)?.declarations?.[0];
  if (declaration === undefined || !(ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration))) return undefined;
  const from = moduleOf(declaration);
  if (from === undefined) return undefined;
  const imported = ts.isImportSpecifier(declaration) ? (declaration.propertyName ?? declaration.name).text : id.text;
  if (RUNNER_MODULES.has(from)) return `${imported} from ${from}`;
  if (from !== "vitest") return undefined;
  if (ts.isImportSpecifier(declaration)) return RUNNER_CLASSES.has(imported) ? `${imported} from vitest` : undefined;
  const parent = id.parent;
  if (ts.isNamespaceImport(declaration) && ts.isPropertyAccessExpression(parent) && parent.expression === id && RUNNER_CLASSES.has(parent.name.text)) return `${parent.name.text} from vitest`;
  return undefined;
}

/** The module a dynamic import() or require() names with a literal specifier. */
function loadedModule(node: ts.Node): string | undefined {
  if (!ts.isCallExpression(node)) return undefined;
  const first = node.arguments[0];
  if (first === undefined || !ts.isStringLiteralLike(first)) return undefined;
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword) return first.text;
  return ts.isIdentifier(node.expression) && node.expression.text === "require" ? first.text : undefined;
}

/**
 * Does code reach the runner's current test or suite (J5)? A reference to a runner binding - directly, through
 * same-file const aliases and functions, or through relative-module exports - or a dynamic load of a runner module.
 * Flow-insensitive on purpose: any reachable reference is a context reference the census cannot follow, so it fails
 * closed (context-unknown) instead of guessing whether the route skips.
 */
function runnerRoute(root: ts.Node, a: SourceAnalysis, sources: SourceCache, what: string): Hazard | undefined {
  const seen = new Set<ts.Node>();
  let hazard: Hazard | undefined;
  const follow = (declaration: ts.Declaration, at: SourceAnalysis, depth: number): void => {
    if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined) scan(declaration.initializer, at, depth + 1);
    else if (ts.isFunctionDeclaration(declaration) && declaration.body !== undefined) scan(declaration.body, at, depth + 1);
    else if (ts.isImportSpecifier(declaration)) {
      const specifier = moduleOf(declaration);
      const other = specifier === undefined ? undefined : sources.module(at.file, specifier);
      if (other === undefined) return;
      const exported = (declaration.propertyName ?? declaration.name).text;
      for (const statement of other.sf.statements) {
        if (ts.isFunctionDeclaration(statement) && statement.name?.text === exported && statement.body !== undefined) scan(statement.body, other, depth + 1);
        if (!ts.isVariableStatement(statement)) continue;
        for (const variable of statement.declarationList.declarations) {
          if (ts.isIdentifier(variable.name) && variable.name.text === exported && variable.initializer !== undefined) scan(variable.initializer, other, depth + 1);
        }
      }
    }
  };
  const scan = (node: ts.Node, at: SourceAnalysis, depth: number): void => {
    if (hazard !== undefined || depth > 8 || seen.has(node)) return;
    seen.add(node);
    const visit = (child: ts.Node): void => {
      if (hazard !== undefined) return;
      const loaded = loadedModule(child);
      if (loaded !== undefined && RUNNER_LOADS.has(loaded)) {
        hazard = unknownAt(at, child, `${what} imports ${loaded} dynamically, which reaches the runner's current test`);
        return;
      }
      if (ts.isIdentifier(child) && isReference(child)) {
        const binding = runnerBinding(child, at);
        if (binding !== undefined) {
          hazard = unknownAt(at, child, `${what} reaches the runner's current test through ${binding}`);
          return;
        }
        const declaration = at.checker.getSymbolAtLocation(child)?.declarations?.[0];
        if (declaration !== undefined) follow(declaration, at, depth);
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
  };
  scan(root, a, 0);
  return hazard;
}

/** vitest's registration APIs: a call starting from one registers a test or a suite, never a hook. */
const REGISTRATIONS = new Set(["describe", "suite", "it", "test"]);

/** The vitest registration API an expression's callee chain starts from (through const aliases, .each(table) heads, test.extend and namespace imports). */
function registrationRoot(expression: ts.Expression, a: SourceAnalysis, depth: number): string | undefined {
  let head = expression;
  for (let guard = 0; guard < 16; guard += 1) {
    head = unwrap(head);
    if (ts.isPropertyAccessExpression(head)) {
      const target = unwrap(head.expression);
      const declaration = ts.isIdentifier(target) ? a.checker.getSymbolAtLocation(target)?.declarations?.[0] : undefined;
      if (declaration !== undefined && ts.isNamespaceImport(declaration) && moduleOf(declaration) === "vitest") return REGISTRATIONS.has(head.name.text) ? head.name.text : undefined;
      head = head.expression;
    } else if (ts.isElementAccessExpression(head) || ts.isCallExpression(head)) head = head.expression;
    else break;
  }
  if (!ts.isIdentifier(head)) return undefined;
  const declaration = a.checker.getSymbolAtLocation(head)?.declarations?.[0];
  // no declaration at all: a vitest global (globals: true)
  if (declaration === undefined) return REGISTRATIONS.has(head.text) ? head.text : undefined;
  if (ts.isImportSpecifier(declaration)) {
    const name = (declaration.propertyName ?? declaration.name).text;
    return moduleOf(declaration) === "vitest" && REGISTRATIONS.has(name) ? name : undefined;
  }
  if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined && depth < 6) return registrationRoot(declaration.initializer, a, depth + 1);
  return undefined;
}

const registrationApi = (call: ts.CallExpression, a: SourceAnalysis): string | undefined => registrationRoot(call.expression, a, 0);

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
  /**
   * The STRICT reading (report mode, whose report records no assertion count): in the case function's own flow, the
   * first matcher-bearing assertion must be reached on every statically visible path - a return before it, or a branch,
   * short-circuit, catch or switch clause that routes around it, reddens even where the run did not take that path.
   */
  readonly strictExits: boolean;
  /** Strict reading only (U2): labeled statements whose body is read again with their own breaks as plain jumps. */
  readonly landed?: ReadonlySet<ts.LabeledStatement>;
}
type Exit = "none" | "return" | "jump";
/** An assertion the strict reading sees reached on SOME paths only, and the route around it. */
interface Conditional {
  readonly evidence: string;
  readonly route: string;
}
interface Walk {
  readonly evidence: string | undefined;
  readonly exit: Exit;
  /**
   * The return statement the walk may leave through before an assertion (never a throw: a throw fails the case); under
   * the strict reading also a break leaving a labeled non-loop statement (U2), which that statement resolves.
   */
  readonly exitAt?: ts.Node;
  /** Strict reading only: an assertion reached on some paths, while another path continues past it without one. */
  readonly conditional?: Conditional;
}
const CONTINUES: Walk = { evidence: undefined, exit: "none" };
const found = (evidence: string | undefined): Walk => ({ evidence, exit: "none" });
/** The strict reading applies to the case function's own flow (depth 1) only, never to the helpers or callbacks it reaches. */
const strict = (scope: EvidenceScope): boolean => scope.strictExits && scope.depth === 1;
const mayReturn = (exitAt: ts.Node): Walk => ({ evidence: undefined, exit: "return", exitAt });
const withConditional = (walk: Walk, conditional: Conditional | undefined): Walk =>
  conditional === undefined || walk.evidence !== undefined || walk.conditional !== undefined ? walk : { ...walk, conditional };
/** A loop body counts as reached (an iteration count is not static); under the strict reading its return or some-paths assertion carries out. */
function loopBody(body: Walk, scope: EvidenceScope): Walk {
  if (body.evidence !== undefined) return found(body.evidence);
  if (!strict(scope)) return CONTINUES;
  if (body.exitAt !== undefined) return mayReturn(body.exitAt);
  return withConditional(CONTINUES, body.conditional);
}


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

const SHORT_CIRCUITS: ReadonlyMap<ts.SyntaxKind, string> = new Map([
  [ts.SyntaxKind.AmpersandAmpersandToken, "&&"],
  [ts.SyntaxKind.BarBarToken, "||"],
  [ts.SyntaxKind.QuestionQuestionToken, "??"],
]);

/**
 * findIn under the strict reading: an assertion only in a short-circuit's right operand or in one arm of a conditional
 * expression is reached on some paths only. Calls, helpers and invoked callbacks read exactly as findIn reads them.
 */
function findStrict(root: ts.Node, scope: EvidenceScope): Walk {
  if (!strict(scope)) return found(findIn(root, scope));
  let conditional: Conditional | undefined;
  const visit = (node: ts.Node): string | undefined => {
    if (isFunctionLiteral(node) || ts.isFunctionDeclaration(node) || ts.isClassLike(node)) return findIn(node, scope);
    if (ts.isCallExpression(node)) {
      const direct = assertionEvidence(node, scope);
      if (direct !== undefined) return direct;
      const target = calledFunction(node, scope);
      const reached = target === undefined ? undefined : functionEvidence(target.fn, { ...scope, a: target.a });
      if (reached !== undefined) return reached;
    }
    const operator = ts.isBinaryExpression(node) ? SHORT_CIRCUITS.get(node.operatorToken.kind) : undefined;
    if (ts.isBinaryExpression(node) && operator !== undefined) {
      const left = visit(node.left);
      if (left !== undefined) return left;
      const right = visit(node.right);
      if (right !== undefined) conditional ??= { evidence: right, route: `the ${operator} at ${scope.a.where(node.operatorToken)} may short-circuit it` };
      return undefined;
    }
    if (ts.isConditionalExpression(node)) {
      const test = visit(node.condition);
      if (test !== undefined) return test;
      const yes = visit(node.whenTrue);
      const no = visit(node.whenFalse);
      if (yes !== undefined && no !== undefined) return yes;
      const arm = yes ?? no;
      if (arm !== undefined) conditional ??= { evidence: arm, route: `the conditional expression at ${scope.a.where(node)} may take the arm without it` };
      return undefined;
    }
    return ts.forEachChild(node, visit);
  };
  return withConditional(found(visit(root)), conditional);
}

function walkBlock(statements: readonly ts.Statement[], scope: EvidenceScope): Walk {
  let conditional: Conditional | undefined;
  for (const statement of statements) {
    const step = walkStatement(statement, scope);
    if (step.evidence !== undefined) return step;
    if (strict(scope) && step.exitAt !== undefined) return mayReturn(step.exitAt);
    conditional ??= step.conditional;
    if (step.exit !== "none") return { evidence: undefined, exit: step.exit, exitAt: step.exitAt, conditional };
  }
  return withConditional(CONTINUES, conditional);
}

/** A path that leaves by throwing fails the case, so it never hollows the pin. */
const throws = (walk: Walk): boolean => walk.evidence === undefined && walk.exit === "return" && walk.exitAt === undefined;

function walkIf(statement: ts.IfStatement, scope: EvidenceScope): Walk {
  const condition = findStrict(statement.expression, scope);
  if (condition.evidence !== undefined) return condition;
  const truth = literalTruth(statement.expression);
  const then = truth === false ? CONTINUES : walkStatement(statement.thenStatement, scope);
  const otherwise = truth === true || statement.elseStatement === undefined ? CONTINUES : walkStatement(statement.elseStatement, scope);
  if (!strict(scope)) {
    if (then.evidence !== undefined) return found(then.evidence);
    if (otherwise.evidence !== undefined) return found(otherwise.evidence);
    if (truth === true) return then;
    if (truth === false) return otherwise;
    if (statement.elseStatement !== undefined && then.exit !== "none" && otherwise.exit !== "none") return { evidence: undefined, exit: then.exit === "return" && otherwise.exit === "return" ? "return" : "jump" };
    return CONTINUES;
  }
  if (truth === true) return withConditional(then, condition.conditional);
  if (truth === false) return withConditional(otherwise, condition.conditional);
  const exitAt = (then.evidence === undefined ? then.exitAt : undefined) ?? (otherwise.evidence === undefined ? otherwise.exitAt : undefined);
  if (exitAt !== undefined) return mayReturn(exitAt);
  if (then.evidence !== undefined && (otherwise.evidence !== undefined || throws(otherwise))) return found(then.evidence);
  if (otherwise.evidence !== undefined && throws(then)) return found(otherwise.evidence);
  const arm = then.evidence ?? otherwise.evidence;
  if (arm !== undefined) return { ...CONTINUES, conditional: condition.conditional ?? { evidence: arm, route: `the if at ${scope.a.where(statement)} may take the branch without it` } };
  const inner = condition.conditional ?? then.conditional ?? otherwise.conditional;
  if (statement.elseStatement !== undefined && then.exit !== "none" && otherwise.exit !== "none") return { evidence: undefined, exit: then.exit === "return" && otherwise.exit === "return" ? "return" : "jump", conditional: inner };
  return withConditional(CONTINUES, inner);
}

function walkTry(statement: ts.TryStatement, scope: EvidenceScope): Walk {
  const attempt = walkBlock(statement.tryBlock.statements, scope);
  const handler = statement.catchClause;
  if (!strict(scope)) {
    if (attempt.evidence !== undefined) return attempt;
    const recovery = handler === undefined ? CONTINUES : walkBlock(handler.block.statements, scope);
    if (recovery.evidence !== undefined) return recovery;
    const final = statement.finallyBlock === undefined ? CONTINUES : walkBlock(statement.finallyBlock.statements, scope);
    if (final.evidence !== undefined || final.exit !== "none") return final;
    return attempt.exit === "return" && (handler === undefined || recovery.exit === "return") ? { evidence: undefined, exit: "return" } : CONTINUES;
  }
  if (attempt.evidence === undefined && attempt.exitAt !== undefined) return mayReturn(attempt.exitAt);
  const recovery = handler === undefined ? undefined : walkBlock(handler.block.statements, scope);
  if (recovery !== undefined && recovery.evidence === undefined && recovery.exitAt !== undefined) return mayReturn(recovery.exitAt);
  if (attempt.evidence !== undefined && (recovery === undefined || recovery.evidence !== undefined || throws(recovery))) return found(attempt.evidence);
  const final = statement.finallyBlock === undefined ? undefined : walkBlock(statement.finallyBlock.statements, scope);
  if (final?.evidence !== undefined) return found(final.evidence);
  if (final?.exitAt !== undefined) return mayReturn(final.exitAt);
  const at = handler === undefined ? "" : scope.a.where(handler);
  if (attempt.evidence !== undefined) return { ...CONTINUES, conditional: { evidence: attempt.evidence, route: `the catch at ${at} may swallow a throw that comes before it` } };
  if (recovery?.evidence !== undefined) return { ...CONTINUES, conditional: { evidence: recovery.evidence, route: `it runs only in the catch at ${at}, when the try block throws` } };
  const inner = attempt.conditional ?? recovery?.conditional ?? final?.conditional;
  if (final !== undefined && final.exit !== "none") return { evidence: undefined, exit: final.exit, conditional: inner };
  if (attempt.exit === "return" && (recovery === undefined || recovery.exit === "return")) return { evidence: undefined, exit: "return", conditional: inner };
  return withConditional(CONTINUES, inner);
}

function walkSwitch(statement: ts.SwitchStatement, scope: EvidenceScope): Walk {
  const head = findStrict(statement.expression, scope);
  if (head.evidence !== undefined) return head;
  const discriminant = unwrap(statement.expression);
  const literal = ts.isNumericLiteral(discriminant) || ts.isStringLiteralLike(discriminant) ? discriminant.text : undefined;
  const clauses = statement.caseBlock.clauses;
  for (const clause of clauses) {
    const label = ts.isCaseClause(clause) ? findIn(clause.expression, scope) : undefined;
    if (label !== undefined) return found(label);
  }
  if (!strict(scope) || literal !== undefined) {
    let live = false;
    for (const clause of clauses) {
      if (ts.isCaseClause(clause)) {
        const value = unwrap(clause.expression);
        const matches = literal === undefined || !(ts.isNumericLiteral(value) || ts.isStringLiteralLike(value)) || value.text === literal;
        live = live || matches;
      } else live = true;
      if (!live) continue;
      const step = walkBlock(clause.statements, scope);
      if (step.evidence !== undefined) return step;
      if (strict(scope) && step.exitAt !== undefined) return mayReturn(step.exitAt);
      if (step.exit !== "none") live = false;
    }
    return withConditional(CONTINUES, head.conditional);
  }
  // Strict, non-literal discriminant: every clause the switch may enter runs on to its first exit (fallthrough included).
  const runs = clauses.map((_clause, start) => {
    let conditional: Conditional | undefined;
    for (const clause of clauses.slice(start)) {
      const step = walkBlock(clause.statements, scope);
      if (step.evidence !== undefined || step.exitAt !== undefined || step.exit !== "none") return withConditional(step, conditional);
      conditional ??= step.conditional;
    }
    return withConditional(CONTINUES, conditional);
  });
  const exitAt = runs.find(run => run.evidence === undefined && run.exitAt !== undefined)?.exitAt;
  if (exitAt !== undefined) return mayReturn(exitAt);
  const first = runs.find(run => run.evidence !== undefined)?.evidence;
  const covered = clauses.some(ts.isDefaultClause) && runs.every(run => run.evidence !== undefined || throws(run));
  if (first !== undefined && covered) return found(first);
  if (first !== undefined) return { ...CONTINUES, conditional: head.conditional ?? { evidence: first, route: `the switch at ${scope.a.where(statement)} may take a clause without it` } };
  return withConditional(CONTINUES, head.conditional ?? runs.find(run => run.conditional !== undefined)?.conditional);
}

/** U2: the labeled statement a labeled break leaves, when it is not a loop (a loop's break is the loop-body residual's). */
function leftStatement(statement: ts.BreakStatement): ts.LabeledStatement | undefined {
  const label = statement.label?.text;
  for (let node: ts.Node = statement.parent; label !== undefined && !ts.isSourceFile(node) && !ts.isFunctionLike(node); node = node.parent) {
    if (ts.isLabeledStatement(node) && node.label.text === label) return ts.isIterationStatement(node.statement, false) ? undefined : node;
  }
  return undefined;
}

function walkStatement(statement: ts.Statement, scope: EvidenceScope): Walk {
  if (ts.isBlock(statement)) return walkBlock(statement.statements, scope);
  if (ts.isExpressionStatement(statement)) return findStrict(statement.expression, scope);
  if (ts.isVariableStatement(statement)) {
    let conditional: Conditional | undefined;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.initializer === undefined) continue;
      const step = findStrict(declaration.initializer, scope);
      if (step.evidence !== undefined) return step;
      conditional ??= step.conditional;
    }
    return withConditional(CONTINUES, conditional);
  }
  if (ts.isReturnStatement(statement)) {
    const value = statement.expression === undefined ? CONTINUES : findStrict(statement.expression, scope);
    return value.evidence !== undefined ? { evidence: value.evidence, exit: "return" } : { evidence: undefined, exit: "return", exitAt: statement, conditional: value.conditional };
  }
  if (ts.isThrowStatement(statement)) return { evidence: findIn(statement.expression, scope), exit: "return" };
  if (ts.isBreakStatement(statement) || ts.isContinueStatement(statement)) {
    // U2: under the strict reading a break leaving a labeled NON-loop statement is a strict exit of it (exitAt = the break)
    const left = strict(scope) && ts.isBreakStatement(statement) ? leftStatement(statement) : undefined;
    if (left !== undefined && scope.landed?.has(left) !== true) return mayReturn(statement);
    return { evidence: undefined, exit: "jump" };
  }
  if (ts.isIfStatement(statement)) return walkIf(statement, scope);
  if (ts.isForOfStatement(statement) || ts.isForInStatement(statement)) {
    const head = findStrict(statement.expression, scope);
    if (head.evidence !== undefined) return head;
    if (isEmptyArray(statement.expression)) return withConditional(CONTINUES, head.conditional);
    return withConditional(loopBody(walkStatement(statement.statement, scope), scope), head.conditional);
  }
  if (ts.isForStatement(statement)) {
    const initializer = statement.initializer === undefined ? CONTINUES : findStrict(statement.initializer, scope);
    if (initializer.evidence !== undefined) return initializer;
    const condition = statement.condition === undefined ? CONTINUES : findStrict(statement.condition, scope);
    if (condition.evidence !== undefined) return condition;
    const conditional = initializer.conditional ?? condition.conditional;
    if (statement.condition !== undefined && literalTruth(statement.condition) === false) return withConditional(CONTINUES, conditional);
    const body = walkStatement(statement.statement, scope);
    const incremented = body.evidence === undefined && !(strict(scope) && body.exitAt !== undefined) && statement.incrementor !== undefined ? findStrict(statement.incrementor, scope) : CONTINUES;
    return withConditional(loopBody(incremented.evidence !== undefined ? incremented : body, scope), conditional);
  }
  if (ts.isWhileStatement(statement)) {
    const head = findStrict(statement.expression, scope);
    if (head.evidence !== undefined) return head;
    if (literalTruth(statement.expression) === false) return withConditional(CONTINUES, head.conditional);
    return withConditional(loopBody(walkStatement(statement.statement, scope), scope), head.conditional);
  }
  if (ts.isDoStatement(statement)) {
    const body = walkStatement(statement.statement, scope);
    if (body.evidence !== undefined) return found(body.evidence);
    if (strict(scope) && body.exitAt !== undefined) return mayReturn(body.exitAt);
    const tail = findStrict(statement.expression, scope);
    if (tail.evidence !== undefined) return tail;
    return strict(scope) ? withConditional(CONTINUES, body.conditional ?? tail.conditional) : CONTINUES;
  }
  if (ts.isTryStatement(statement)) return walkTry(statement, scope);
  if (ts.isLabeledStatement(statement)) {
    const inner = walkStatement(statement.statement, scope);
    const exit = inner.evidence === undefined ? inner.exitAt : undefined;
    if (exit !== undefined && ts.isBreakStatement(exit) && leftStatement(exit) === statement) {
      // U2: the break lands right after this statement, so the walk resumes there. Its body is read again with its own
      // breaks as plain jumps: a return later in it still reddens, its assertion is reached only on some paths, and an
      // assertion after the statement still counts on every path (no false red).
      const rest = walkStatement(statement.statement, { ...scope, landed: new Set([...(scope.landed ?? []), statement]) });
      if (rest.evidence !== undefined) return { ...CONTINUES, conditional: { evidence: rest.evidence, route: `the break at ${scope.a.where(exit)} may leave the labeled block ${statement.label.text} before it` } };
      return { evidence: undefined, exit: rest.exit === "return" ? "return" : "none", exitAt: rest.exitAt, conditional: rest.conditional };
    }
    return inner.evidence !== undefined ? inner : { evidence: undefined, exit: inner.exit === "return" ? "return" : "none", exitAt: inner.exitAt, conditional: inner.conditional };
  }
  if (ts.isSwitchStatement(statement)) return walkSwitch(statement, scope);
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
  return findStrict(statement, scope);
}

function functionEvidence(fn: AnalysedFunction, scope: EvidenceScope): string | undefined {
  if (scope.visited.has(fn) || scope.depth > 8 || fn.body === undefined) return undefined;
  scope.visited.add(fn);
  const inner: EvidenceScope = { ...scope, depth: scope.depth + 1 };
  return ts.isBlock(fn.body) ? walkBlock(fn.body.statements, inner).evidence : findIn(fn.body, inner);
}

/** The case function's own walk (depth 1); under the strict reading it also names the return or some-paths assertion that hollows it. */
function caseEvidence(fn: AnalysedFunction, scope: EvidenceScope): Walk {
  if (fn.body === undefined) return CONTINUES;
  scope.visited.add(fn);
  const inner: EvidenceScope = { ...scope, depth: 1 };
  return ts.isBlock(fn.body) ? walkBlock(fn.body.statements, inner) : findStrict(fn.body, inner);
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

/**
 * A skip reachable from the pin's own case function or from a hook of its own enclosing call chain (never file-wide),
 * including the runner's public current-test routes the case or its chain reaches (J5).
 */
function chainCause(call: ts.CallExpression, fn: AnalysedFunction | undefined, a: SourceAnalysis, registered: ReadonlySet<string>, sources: SourceCache): Cause | undefined {
  const body = fn?.body;
  const hazard = extendHazard(call, a) ?? (fn === undefined ? undefined : contextHazard(fn, contextIndex(call), a)) ?? (body === undefined ? undefined : runnerRoute(body, a, sources, "the case"));
  if (hazard !== undefined) return { code: hazard.kind === "skip" ? "context-skip" : "context-unknown", detail: hazard.detail };
  const hook = chainHazard(call, a, registered, sources);

  if (hook !== undefined) return { code: hook.kind === "skip" ? "hook-skip" : "context-unknown", detail: hook.detail };
  return undefined;
}

/** U2: an elimination red names what the census observed and every route still open, never a guessed cause. */
const UNMODELLED = "nothing the census models in the case or its own call chain skips it; the remaining routes: a setup file, a config filter, a CLI flag, or a runtime skip through code the census does not follow";
const UNMODELLED_REPORT =
  "nothing the census models in the case or its own call chain skips it; the remaining routes: a skip / todo modifier or a skipping options value, a setup file, a config filter, a CLI flag, or a runtime skip through code the census does not follow";

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
      const cause = call === undefined ? undefined : chainCause(call, fn, a, registered, context.sources);
      if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
      return verdict(pin, "runs-where", "skipped", `${pin.tier} ran the file but not the case (result ${test.state}); ${UNMODELLED}`, count);
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
  const cause = chainCause(call, fn, a, registered, context.sources);
  if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
  const symbols = contextSymbols(fn, contextIndex(call), a);
  // The run carries --expect.requireAssertions, so the runtime count reads early exits; the AST reads the matcher.
  const evidence = caseEvidence(fn, { a, sources: context.sources, contextRoots: symbols.roots, contextExpect: symbols.expects, visited: new Set(), depth: 0, strictExits: false }).evidence;
  if (evidence === undefined) return verdict(pin, "asserts", "no-assertion", `the run counted an assertion, but no matcher-bearing vitest assertion is reachable in the case function at ${a.where(fn)} (a bare expect(x) asserts nothing)`, count);
  const runs = count === 1 ? "collected once" : `collected once per table row (${count} rows)`;
  return verdict(pin, "asserts", "ok", `${runs}, passed under ${pin.tier}, asserts (${evidence})`, count);
}


/**
 * EXECUTING MODE (fixtures and non-default tiers; never the default-tier judgment once wb-nl8 lands - use judge()):
 * judges every pin by EXECUTING each claimed tier's real entrypoint once (plus the default gate for the exclusivity of
 * non-default tiers), one tier after another, then the AST inner legs. Verdicts come back in pin order. Inside a tier
 * run the helper started (read from the ancestors' command lines, never the environment), it starts nothing and every
 * verdict is a nested-run red.
 */
export async function judgePins(root: string, pins: readonly CasePin[], options: JudgeOptions = {}): Promise<readonly PinVerdict[]> {
  if (insideCensusRun()) {
    return pins.map(pin => verdict(pin, "runs-where", "nested-run", "reached from inside a tier run the census helper started (an ancestor's command line names its per-run reporter); it never starts another one there (recursion guard)"));
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
// Report mode: judge(reportPath, pins) over vitest's own JSON report of the tier's run, never re-executed.
// ---------------------------------------------------------------------------------------------

interface JsonLocation {
  readonly line: number;
  readonly column: number;
}
/** One assertionResults entry of vitest's JSON reporter (4.1.10: ancestorTitles, title, status, failureMessages, location, tags). */
interface JsonCase {
  readonly ancestorTitles: readonly string[];
  readonly title: string;
  readonly status: string;
  readonly failureMessages: readonly string[];
  readonly location?: JsonLocation | null;
  readonly tags?: readonly string[];
}
interface JsonFile {
  readonly name: string;
  readonly status: string;
  readonly message?: string;
  readonly assertionResults: readonly JsonCase[];
}
type LoadedReport = { readonly ok: true; readonly files: readonly JsonFile[]; readonly mtimeMs: number } | { readonly ok: false; readonly why: string };
type ReadReport = Extract<LoadedReport, { readonly ok: true }>;

const isLocation = (value: unknown): value is JsonLocation => isRecord(value) && Number.isInteger(value.line) && Number.isInteger(value.column);
const isJsonCase = (value: unknown): value is JsonCase =>
  isRecord(value) &&
  isStringArray(value.ancestorTitles) &&
  typeof value.title === "string" &&
  typeof value.status === "string" &&
  isStringArray(value.failureMessages) &&
  (value.location === undefined || value.location === null || isLocation(value.location)) &&
  (value.tags === undefined || isStringArray(value.tags));
const isJsonFile = (value: unknown): value is JsonFile =>
  isRecord(value) &&
  typeof value.name === "string" &&
  typeof value.status === "string" &&
  (value.message === undefined || typeof value.message === "string") &&
  Array.isArray(value.assertionResults) &&
  value.assertionResults.every(isJsonCase);
const errorText = (error: unknown): string => String(error instanceof Error ? error.message : error);
const hasLocation = (entry: JsonCase): entry is JsonCase & { readonly location: JsonLocation } => entry.location !== undefined && entry.location !== null;

function loadReport(path: string): LoadedReport {
  let text: string;
  let mtimeMs: number;
  try {
    text = readFileSync(path, "utf8");
    mtimeMs = statSync(path).mtimeMs;
  } catch (error) {
    return { ok: false, why: `the report ${path} is unreadable: ${errorText(error)}` };
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    return { ok: false, why: `the report ${path} is not JSON: ${errorText(error)}` };
  }
  if (!isRecord(value) || typeof value.numTotalTests !== "number" || !Array.isArray(value.testResults) || !value.testResults.every(isJsonFile)) {
    return { ok: false, why: `the report ${path} does not have vitest's JSON reporter shape (numTotalTests and per-file testResults of assertionResults)` };
  }
  return { ok: true, files: value.testResults, mtimeMs };
}

/** The repository root a report's pins resolve against: named, or the directory holding the report's .forge directory. */
function reportRoot(path: string, options: ReportOptions): string | undefined {
  if (options.root !== undefined) return realOrSelf(resolve(options.root));
  const holder = dirname(resolve(path));
  return basename(holder) === ".forge" ? realOrSelf(dirname(holder)) : undefined;
}

/** The test file whose case is calling judge() (vitest's expect state names it), or undefined outside a vitest run. */
function judgingFile(): string | undefined {
  try {
    const path: unknown = expect.getState().testPath;
    return typeof path === "string" && path !== "" ? realOrSelf(path) : undefined;
  } catch {
    return undefined;
  }
}

function reportModule(report: ReadReport, absolute: string): JsonFile | undefined {
  const target = realOrSelf(absolute);
  return report.files.find(file => realOrSelf(file.name) === target);
}

/** A report file in the run-report shape, so locate() reads both modes alike (the report records no mode or fails flag). */
function toRunModule(file: JsonFile): RunModule {
  const tests: RunCase[] = file.assertionResults.filter(hasLocation).map(entry => ({
    name: entry.title,
    suitePath: entry.ancestorTitles,
    mode: "run",
    fails: false,
    each: false,
    line: entry.location.line,
    column: entry.location.column,
    state: entry.status,
    errors: entry.failureMessages,
    tags: entry.tags ?? [],
  }));
  return { file: file.name, state: file.status, errors: file.message === undefined || file.message === "" ? [] : [file.message], tests, suites: [] };
}

// ---- the fails inversion, read from the source: the report records an inverted case as passed ----

/** A const binding (a let or var may be reassigned, so its value is not static). */
const isConst = (declaration: ts.VariableDeclaration): boolean => (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.Const) !== 0;

/** The text a property name reads, or undefined for a computed non-literal key. */
function propertyKey(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isPrivateIdentifier(name)) return name.text;
  if (ts.isComputedPropertyName(name)) {
    const key = unwrap(name.expression);
    return ts.isStringLiteralLike(key) ? key.text : undefined;
  }
  return undefined;
}

/** A static truth value: a literal, or a same-file const bound to one; "unknown" otherwise. */
function constTruth(expression: ts.Expression, a: SourceAnalysis, depth = 0): boolean | "unknown" {
  const literal = literalTruth(expression);
  if (literal !== undefined) return literal;
  const value = unwrap(expression);
  if (!ts.isIdentifier(value) || depth >= 6) return "unknown";
  const declaration = a.checker.getSymbolAtLocation(value)?.declarations?.[0];
  if (declaration === undefined || !ts.isVariableDeclaration(declaration) || !isConst(declaration) || declaration.initializer === undefined) return "unknown";
  return constTruth(declaration.initializer, a, depth + 1);
}

/** Does a const-held options object escape anywhere in its file (written, deleted, aliased or handed to a non-registration call)? */
function escapes(declaration: ts.VariableDeclaration, a: SourceAnalysis): boolean {
  const symbol = ts.isIdentifier(declaration.name) ? a.checker.getSymbolAtLocation(declaration.name) : undefined;
  if (symbol === undefined) return true;
  let escaped = false;
  const visit = (node: ts.Node): void => {
    if (escaped) return;
    if (ts.isIdentifier(node) && node !== declaration.name && isReference(node) && a.checker.getSymbolAtLocation(node) === symbol) {
      const parent = node.parent;
      const read = (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node && !isWritten(parent);
      const passed = ts.isCallExpression(parent) && parent.arguments.some(argument => argument === node) && registrationApi(parent, a) !== undefined;
      if (!(read || passed || ts.isSpreadAssignment(parent) || ts.isTypeOfExpression(parent))) escaped = true;
    }
    ts.forEachChild(node, visit);
  };
  visit(a.sf);
  return escaped;
}

/** Is a member access the target of an assignment, a delete or an update? */
function isWritten(access: ts.Expression): boolean {
  const parent = access.parent;
  if (ts.isBinaryExpression(parent) && parent.left === access) return parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
  return ts.isDeleteExpression(parent) || ts.isPrefixUnaryExpression(parent) || ts.isPostfixUnaryExpression(parent);
}

type OptionsRead = { readonly fails: boolean | undefined } | { readonly unknown: string };

/** The fails an options value sets (true / false / absent), or why report mode cannot read it statically. */
function optionsFails(expression: ts.Expression, a: SourceAnalysis, depth = 0): OptionsRead {
  const value = unwrap(expression);
  if (ts.isNumericLiteral(value)) return { fails: undefined };
  if (ts.isIdentifier(value) && depth < 6) {
    const declaration = a.checker.getSymbolAtLocation(value)?.declarations?.[0];
    if (declaration !== undefined && ts.isVariableDeclaration(declaration) && isConst(declaration) && declaration.initializer !== undefined && !escapes(declaration, a)) return optionsFails(declaration.initializer, a, depth + 1);
  }
  if (!ts.isObjectLiteralExpression(value)) return { unknown: `the options at ${a.where(value)} are not a same-file const object literal, so report mode cannot read their fails (the report does not record it)` };
  let fails: boolean | undefined;
  for (const property of value.properties) {
    if (ts.isSpreadAssignment(property)) {
      const spread = optionsFails(property.expression, a, depth + 1);
      if ("unknown" in spread) return spread;
      if (spread.fails !== undefined) fails = spread.fails;
      continue;
    }
    const key = property.name === undefined ? undefined : propertyKey(property.name);
    if (key === undefined) return { unknown: `the options at ${a.where(property)} set a computed key, so report mode cannot read their fails` };
    if (key !== "fails") continue;
    const truth = ts.isPropertyAssignment(property) ? constTruth(property.initializer, a) : ts.isShorthandPropertyAssignment(property) ? constTruth(property.name, a) : "unknown";
    if (truth === "unknown") return { unknown: `the fails option at ${a.where(property)} is not a constant, so report mode cannot read it` };
    fails = truth;
  }
  return { fails };
}

/** The member names along a registration's callee chain (it.skip.fails: skip, fails), through const aliases, or why they are unreadable. */
function chainMembers(expression: ts.Expression, a: SourceAnalysis, depth = 0): { readonly names: readonly string[] } | { readonly unknown: string } {
  const names: string[] = [];
  let head = expression;
  for (let guard = 0; guard < 16; guard += 1) {
    head = unwrap(head);
    if (ts.isPropertyAccessExpression(head)) {
      names.unshift(head.name.text);
      head = head.expression;
    } else if (ts.isElementAccessExpression(head)) {
      const key = unwrap(head.argumentExpression);
      if (!ts.isStringLiteralLike(key)) return { unknown: `the registration at ${a.where(head)} reaches a computed member, so report mode cannot read its fails` };
      names.unshift(key.text);
      head = head.expression;
    } else if (ts.isCallExpression(head)) head = head.expression;
    else break;
  }
  if (!ts.isIdentifier(head) || depth >= 6) return { names };
  const declaration = a.checker.getSymbolAtLocation(head)?.declarations?.[0];
  if (declaration === undefined || !ts.isVariableDeclaration(declaration) || declaration.initializer === undefined) return { names };
  if (!isConst(declaration)) return { unknown: `the registration ${head.text} at ${a.where(head)} is not a const binding, so report mode cannot read its fails` };
  const inner = chainMembers(declaration.initializer, a, depth + 1);
  return "unknown" in inner ? inner : { names: [...inner.names, ...names] };
}

/** The options a registration passes (vitest 4: test(name, options, fn); a second argument that is the function passes none). */
function registrationOptions(call: ts.CallExpression, a: SourceAnalysis): ts.Expression | undefined {
  const second = call.arguments[1];
  return second === undefined || localFunction(second, a) !== undefined ? undefined : second;
}

/** The call a function literal is an argument of (through parentheses and assertions), or undefined. */
function callHolding(fn: FunctionLiteral): ts.CallExpression | undefined {
  let node: ts.Node = fn;
  while (ts.isParenthesizedExpression(node.parent) || ts.isAsExpression(node.parent) || ts.isSatisfiesExpression(node.parent)) node = node.parent;
  const parent = node.parent;
  return ts.isCallExpression(parent) && parent.arguments.some(argument => argument === node) ? parent : undefined;
}

/** A call's callee as written (whitespace collapsed, clipped), so an options-unknown red names what it could not resolve. */
function calleeText(call: ts.CallExpression, a: SourceAnalysis): string {
  const text = call.expression.getText(a.sf).replace(/\s+/g, " ");
  return text.length > 60 ? `${text.slice(0, 57)}...` : text;
}

/**
 * The fails flag the report cannot carry, read from the source the way vitest 4 merges it: the case's chain modifiers
 * (it.fails, through const aliases), then each enclosing suite's options outermost first and the case's own options last
 * (options override the chain). Fail-closed: options or enclosing suites it cannot read statically are unknown, an
 * enclosing callback whose holder is not vitest's describe / suite included (I1). judgeReported calls it only for a
 * callee whose chain root resolves to vitest's it / test (U1).
 */
function inversionHazard(call: ts.CallExpression, a: SourceAnalysis): { readonly kind: "inverted" | "unknown"; readonly detail: string } | undefined {
  const suites: ts.CallExpression[] = [];
  for (let node: ts.Node = call; node.parent !== undefined && !ts.isSourceFile(node.parent); node = node.parent) {
    const parent = node.parent;
    if (!(isFunctionLiteral(parent) || ts.isFunctionDeclaration(parent))) continue;
    const holder = ts.isFunctionDeclaration(parent) ? undefined : callHolding(parent);
    if (holder === undefined) return { kind: "unknown", detail: `the case is registered inside a function at ${a.where(parent)} that is not a suite callback, so report mode cannot read the enclosing suites' fails` };
    const api = registrationApi(holder, a);
    if (api === "describe" || api === "suite") suites.unshift(holder);
    // I1 (the design invariant): any other holder - a wrapper function, an object-held describe, an array's forEach - may
    // itself register a suite with fails that the source does not show, so the enclosing suites are unreadable.
    if (!suites.includes(holder)) {
      return { kind: "unknown", detail: `the case is registered inside a callback of ${calleeText(holder, a)} at ${a.where(holder)}, which does not resolve to vitest's describe / suite, so report mode cannot read whether it registers a suite with fails` };
    }
  }
  let state: boolean | "unknown" | undefined;
  let source = "";
  const sources: { readonly options: ts.Expression | undefined; readonly what: string }[] = [
    ...suites.map(suite => ({ options: registrationOptions(suite, a), what: `the options of the enclosing suite at ${a.where(suite)}` })),
    { options: registrationOptions(call, a), what: "its own options" },
  ];
  let unknown = "";
  for (const entry of sources) {
    if (entry.options === undefined) continue;
    const read = optionsFails(entry.options, a);
    if ("unknown" in read) {
      state = "unknown";
      unknown = read.unknown;
    } else if (read.fails !== undefined) {
      state = read.fails;
      source = entry.what;
    }
  }
  if (state === "unknown") return { kind: "unknown", detail: unknown };
  if (state === true) return { kind: "inverted", detail: `registered with fails through ${source}: it passes only when its assertions fail, and the report records it passed` };
  if (state === false) return undefined;
  const members = chainMembers(call.expression, a);
  if ("unknown" in members) return { kind: "unknown", detail: members.unknown };
  if (members.names.includes("fails")) return { kind: "inverted", detail: `registered with fails at ${a.where(call)}: it passes only when its assertions fail, and the report records it passed` };
  return undefined;
}

// ---- the report-mode judge ----

interface ReportContext {
  readonly root: string;
  readonly tier: string;
  readonly report: ReadReport;
  /** The default tier's report, read once, for a non-default pin's exclusivity. */
  readonly gateReport: () => LoadedReport;
  readonly sources: SourceCache;
}

/** Report mode's third leg: the strict reading's red names the return or the some-paths route that hollows the case. */
function thirdLeg(walk: Walk, fn: AnalysedFunction, a: SourceAnalysis): string {
  const reading = "report mode reads the third leg from the source, as the report records no assertion count; a bare expect(x) asserts nothing";
  if (walk.exitAt !== undefined) return `the case function at ${a.where(fn)} may return at ${a.where(walk.exitAt)} before its first matcher-bearing assertion (${reading})`;
  if (walk.conditional !== undefined) return `the first matcher-bearing assertion of the case function at ${a.where(fn)} (${walk.conditional.evidence}) is reached only on some paths: ${walk.conditional.route} (${reading})`;
  return `no matcher-bearing vitest assertion is reachable in the case function at ${a.where(fn)} (${reading})`;
}

function judgeReported(pin: CasePin, context: ReportContext): PinVerdict {
  const tier = context.tier;
  if (pin.tier !== tier) return verdict(pin, "runs-where", "tier-mismatch", `the report is the ${tier} tier's own run; a ${pin.tier} pin is judged only over its own tier's report, by a census leg inside that tier (R2 = (i))`);
  const absolute = resolve(context.root, pin.file);
  const loaded = context.sources.get(absolute);
  if (loaded.kind !== "ok") return verdict(pin, "exists", loaded.kind, loaded.why);
  const a = loaded.analysis;
  const file = reportModule(context.report, absolute);
  if (file === undefined) {
    // REPORT-MODE BOUNDARY: the JSON report records no scheduled files, so a run that aborted before any file ran (a
    // throwing global setup) reads like one that collected none; both are red, and the why names both routes.
    if (context.report.files.length === 0) {
      return verdict(pin, "runs-where", "not-collected", `the report records no test file for the ${tier} run: it collected none (its include / exclude or a filter) or aborted before running one (a throwing global setup), so it does not collect this file`);
    }
    return verdict(pin, "runs-where", "not-collected", `the ${tier} run the report records does not collect this file`);
  }
  if (file.message !== undefined && file.message !== "") return verdict(pin, "exists", "collection-error", `the runner could not collect the file: ${file.message}`);
  if (!file.assertionResults.every(hasLocation)) {
    return verdict(pin, "exists", "report-unlocated", "the report records no task locations: the tier's run must carry includeTaskLocation, since the census anchors its AST legs on the runner-located call (never a title search)");
  }
  const module = toRunModule(file);
  const place = locate(pin, module, a);
  if ("ok" in place) return place;
  const count = place.cases.length;
  const registered = new Set(module.tests.map(test => `${test.line}:${test.column}`));
  const call = place.call;
  const fn = call === undefined ? undefined : caseFunction(call, a);
  // U1 (the design invariant): the inversion is read only through a callee whose chain root resolves to vitest's it /
  // test; any other callee (object-held, destructured, function-returned, class-static, Object.assign-built ...) may
  // carry fails the source does not show, so it is options-unknown below, naming the callee - never read as no fails.
  const api = call === undefined ? undefined : registrationApi(call, a);
  const readable = api === "it" || api === "test";
  const inversion = call === undefined || !readable ? undefined : inversionHazard(call, a);
  if (inversion?.kind === "inverted") return verdict(pin, "asserts", "inverted", inversion.detail, count);
  for (const test of place.cases) {
    if (test.state === "failed") return verdict(pin, "asserts", "failed", `the case failed in the ${tier} report: ${test.errors[0] ?? "no error message"}`, count);
    if (test.state !== "passed") {
      const cause = call === undefined ? undefined : chainCause(call, fn, a, registered, context.sources);
      if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
      return verdict(pin, "runs-where", "skipped", `the ${tier} report records the case ${test.state}; ${UNMODELLED_REPORT}`, count);
    }
  }
  if (inversion !== undefined) return verdict(pin, "asserts", "options-unknown", inversion.detail, count);
  const tags = [...new Set(place.cases.flatMap(test => test.tags ?? []))];
  if (tags.length > 0) return verdict(pin, "asserts", "options-unknown", `the case carries the tags ${JSON.stringify(tags)}: a config tag definition may set fails, which the report does not record`, count);
  if (tier !== DEFAULT_GATE_TIER) {
    const gate = context.gateReport();
    if (!gate.ok) return verdict(pin, "runs-where", "run-error", `exclusivity against the default gate is unverifiable: ${gate.why}`, count);
    const gateFile = reportModule(gate, absolute);
    if (gateFile?.message !== undefined && gateFile.message !== "") return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also collects the file (and fails to load it: ${gateFile.message})`, count);
    if (gateFile !== undefined && !gateFile.assertionResults.every(hasLocation)) return verdict(pin, "runs-where", "run-error", "exclusivity against the default gate is unverifiable: the default tier's report records no task locations (includeTaskLocation)", count);
    const shared = gateFile?.assertionResults.filter(entry => (entry.status === "passed" || entry.status === "failed") && place.cases.some(own => own.name === entry.title && own.line === entry.location?.line && own.column === entry.location?.column));
    if (shared !== undefined && shared.length > 0) return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also runs it`, count);
  }
  if (call === undefined) return verdict(pin, "asserts", "unmapped-location", "the report's location maps to no call expression", count);
  if (fn === undefined) return verdict(pin, "asserts", "body-unresolved", `the case function at ${a.where(call)} is not statically resolvable`, count);
  if (!readable) {
    const route = "report mode follows const aliases, .each / .for heads, test.extend and namespace imports";
    return verdict(pin, "asserts", "options-unknown", `the registration ${calleeText(call, a)} at ${a.where(call)} does not resolve to vitest's it / test (${route}), so report mode cannot read its fails, which the report does not record`, count);
  }
  const cause = chainCause(call, fn, a, registered, context.sources);
  if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
  const symbols = contextSymbols(fn, contextIndex(call), a);
  const walk = caseEvidence(fn, { a, sources: context.sources, contextRoots: symbols.roots, contextExpect: symbols.expects, visited: new Set(), depth: 0, strictExits: true });
  if (walk.evidence === undefined) return verdict(pin, "asserts", "no-assertion", thirdLeg(walk, fn, a), count);
  const runs = count === 1 ? "collected once" : `collected once per table row (${count} rows)`;
  return verdict(pin, "asserts", "ok", `${runs}, passed in the ${tier} report, asserts (${walk.evidence})`, count);
}

/** A verdict over a report only holds for the source the report ran: any file the judgment read must be older than the report. */
function judgeFresh(pin: CasePin, context: ReportContext): PinVerdict {
  context.sources.resetTouched();
  const judged = judgeReported(pin, context);
  const gate = context.tier === DEFAULT_GATE_TIER ? undefined : context.gateReport();
  const written = Math.min(context.report.mtimeMs, gate?.ok === true ? gate.mtimeMs : Number.POSITIVE_INFINITY);
  for (const file of context.sources.touched()) {
    let mtimeMs: number;
    try {
      mtimeMs = statSync(file).mtimeMs;
    } catch {
      continue;
    }
    if (mtimeMs > written) return verdict(pin, "runs-where", "report-stale", `${relative(context.root, file)} changed after the report was written, so the report is not of the source the census reads`, judged.cases);
  }
  return judged;
}

/**
 * REPORT MODE, the default-tier judgment (owner three-stage ruling 2026-10-16 16:12Z; interface bound on the respin
 * spec): judges every pin over vitest's own JSON report of the tier's run and NEVER executes a test run. The report must
 * carry task locations (includeTaskLocation). A pin of any tier but the report's own (options.tier, default
 * DEFAULT_GATE_TIER) is refused: a live tier is judged only over its own report, by a census leg inside that tier
 * (R2 = (i)). A report that records the judging file itself is that run's previous report and is refused, as is a report
 * older than any file the judgment reads. Verdicts come back in pin order.
 */
export function judge(reportPath: string, pins: readonly CasePin[], options: ReportOptions = {}): readonly PinVerdict[] {
  const report = loadReport(reportPath);
  if (!report.ok) return pins.map(pin => verdict(pin, "runs-where", "report-unreadable", report.why));
  const root = reportRoot(reportPath, options);
  if (root === undefined) {
    return pins.map(pin => verdict(pin, "runs-where", "report-unreadable", `the report ${reportPath} lies outside a .forge directory and no root was named, so the pins' files cannot be resolved`));
  }
  const judging = judgingFile();
  if (judging !== undefined && reportModule(report, judging) !== undefined) {
    return pins.map(pin => verdict(pin, "runs-where", "report-stale", `the report records the judging file ${relative(root, judging)} itself: it is the report of a run this census sits in, so on disk it can only be that run's previous report`));
  }
  let gate: LoadedReport | undefined;
  const gateReport = (): LoadedReport => {
    gate ??= loadReport(options.defaultReport === undefined ? join(root, DEFAULT_TIER_REPORT) : resolve(options.defaultReport));
    return gate;
  };
  const context: ReportContext = { root, tier: options.tier ?? DEFAULT_GATE_TIER, report, gateReport, sources: new SourceCache() };
  return pins.map(pin => judgeFresh(pin, context));
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

const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** A table's cells as token lists (header first), so its rendered text and its HTML are read like any other block's. */
const cellsOf = (table: Tokens.Table): readonly (readonly Token[])[] => [...table.header, ...table.rows.flat()].map(cell => cell.tokens);

function containsHtml(tokens: readonly Token[]): boolean {
  return tokens.some(
    token =>
      token.type === "html" ||
      containsHtml(childrenOf(token)) ||
      (isList(token) && token.items.some(item => containsHtml(childrenOf(item)))) ||
      (isTable(token) && cellsOf(token).some(cell => containsHtml(cell))),
  );
}

/** What a reader sees of a block the census has no dedicated kind for (a blockquote, a table): its rendered text, HTML excluded. */
function renderedOther(token: Token): string {
  if (isTable(token)) return cellsOf(token).map(cell => inlineText(cell)).join(" ");
  const children = childrenOf(token);
  return children.length > 0 ? blockText(children) : token.type === "hr" ? "" : decode(textOf(token));
}

function toBlock(token: Token): RenderedBlock | undefined {
  if (token.type === "space") return undefined;
  if (isHeading(token)) return { kind: "heading", depth: token.depth, text: clean(inlineText(childrenOf(token))) };
  if (token.type === "paragraph") return { kind: "paragraph", text: clean(inlineText(childrenOf(token))), markdown: clean(textOf(token)) };
  if (isList(token)) return { kind: "list", ordered: token.ordered, items: token.items.map(item => ({ text: clean(blockText(childrenOf(item))), markdown: clean(item.text) })) };
  if (token.type === "code") return { kind: "code", text: textOf(token) };
  // D2: an HTML block renders no text a reader sees; its source is under raw only, so no text reader is fooled by it.
  if (token.type === "html") return { kind: "html", text: "", raw: clean(token.raw) };
  return { kind: "other", type: token.type, text: clean(renderedOther(token)) };
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

/** Every rendered heading at any nesting depth: a heading inside a list item or blockquote still renders as one. */
function headingsIn(tokens: readonly Token[]): Tokens.Heading[] {
  const out: Tokens.Heading[] = [];
  for (const token of tokens) {
    if (isHeading(token)) out.push(token);
    out.push(...headingsIn(isList(token) ? token.items.flatMap(item => childrenOf(item)) : childrenOf(token)));
  }
  return out;
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
  const matches = (token: Tokens.Heading): boolean => token.depth === depth && clean(inlineText(childrenOf(token))) === heading;
  // Uniqueness counts every RENDERED heading, a heading nested in a list item or blockquote included (752.15 M13).
  const rendered = headingsIn(tokens).filter(matches).length;
  if (rendered === 0) return refused(`the rendered view has no level-${depth} heading "${heading}"`);
  if (rendered > 1) return refused(`the heading "${heading}" occurs ${rendered} times in the rendered view; a pinned section needs it exactly once`);
  const starts = tokens.flatMap((token, index) => (isHeading(token) && matches(token) ? [index] : []));
  if (starts.length === 0) return refused(`the heading "${heading}" renders only nested inside a list item or blockquote, so no section is bounded under it`);
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

/** Key-order-independent JSON of a rendered block, so a census may write its pinned blocks by hand. */
const canonical = (value: unknown): string =>
  JSON.stringify(value, (_key, inner: unknown) => (isRecord(inner) && !Array.isArray(inner) ? Object.fromEntries(Object.entries(inner).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))) : inner));

/**
 * The docs ADOPTION form (wb-9x5.6 D1-D3): the pinned section's WHOLE rendered block list equals the census's, block by
 * block, and the section carries no HTML. Never an includes check: a clause moved out of the section (D1), wrapped in
 * an HTML comment (D2) or kept beside a withdrawn subsection (D3) each leaves a different list. A refused section
 * (docsSection's own red) never matches.
 */
export function sectionMatches(section: DocsSection, expected: readonly RenderedBlock[]): SectionMatch {
  if (!section.ok) return { ok: false, why: section.why };
  if (section.hasHtml) return { ok: false, why: "the section carries HTML (a comment or a tag), whose rendered text can hide what its source says; the adoption form refuses it" };
  const shared = Math.min(section.blocks.length, expected.length);
  for (let index = 0; index < shared; index += 1) {
    const actual = canonical(section.blocks[index]);
    const pinned = canonical(expected[index]);
    if (actual !== pinned) return { ok: false, why: `block ${index + 1} differs: the section renders ${actual}; the census pins ${pinned}` };
  }
  if (section.blocks.length !== expected.length) return { ok: false, why: `the section has ${section.blocks.length} blocks; the census pins ${expected.length}` };
  return { ok: true, why: "" };
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
