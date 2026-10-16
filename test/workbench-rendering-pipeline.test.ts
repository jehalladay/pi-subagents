/**
 * VC-5/W15 (wb-6ze.39): docs/workbench/10-terminal-inspector.md section "Rendering pipeline" census falsifier.
 *
 * Spec (verbatim): the nine "Rendering pipeline" bullets of docs/workbench/10, and
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds each bullet to existing cases by file and verbatim title. A rename, deletion, commented-out case,
 * or any way of switching a pinned case off that vitest honours (a skip/todo/only/fails/skipIf/runIf chain, an
 * options-object skip, a describe/suite-level marker including .concurrent/.sequential chains and the suite alias,
 * a dynamic ctx.skip(), a case hidden under if/for/&&) goes red naming the bullet, the file and the title. A docs edit
 * that drops, rewrites, or adds anything inside the "## Rendering pipeline" section goes red. A tier label is a claim
 * about the gate config and is verified against vitest.config.ts and forge.toml. A bullet (or half) with no existing
 * case is recorded unpinned with a reason and is never counted passed. Pinned cases are never executed here, and no
 * live cadence, scale or performance pass is claimed from a title's presence (the live redraw cadence is labelled
 * UNMEASURED by wb-9x5.15).
 *
 * Scanner: string-, template- and regex-aware comment strip, then bracket-balanced call parsing (the wb-gs2.2 recipe,
 * copied locally; wb-u62 owns the shared helper for LANDED censuses). The per-mode falsifiers at the bottom are
 * hand-written sources, authored independently of the scanner's own call pattern.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import config from "../vitest.config.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DOC_PATH = "docs/workbench/10-terminal-inspector.md";
const FORGE_TOML = "forge.toml";
const PACKAGE_JSON = "package.json";

type Tier = "default-gate" | "bench-receipt";
type Status = "pinned" | "partial" | "unpinned";

interface Companion {
  /** The forge.toml [build.commands.<command>] entry that runs the receipt, outside the default gate. */
  readonly command: string;
  /** The repo-relative script that command runs and that the pinned test file imports. */
  readonly script: string;
}

interface Pin {
  readonly file: string;
  readonly title: string;
  /** default-gate: run by `vitest run` under the gate's test step. bench-receipt: also has a receipt command outside the gate. */
  readonly tier: Tier;
  readonly companion?: Companion;
}

interface Row {
  readonly n: number;
  readonly quote: string;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const gatePin = (file: string, title: string): Pin => Object.freeze({ file, title, tier: "default-gate" as const });
const benchPin = (file: string, title: string, companion: Companion): Pin =>
  Object.freeze({ file, title, tier: "bench-receipt" as const, companion: Object.freeze({ ...companion }) });
const frozenRow = (row: Row): Row => Object.freeze({ ...row, pins: Object.freeze([...row.pins]) });

const INSPECTOR = "test/workbench-inspector.test.ts";
const WINDOW = "test/workbench-inspector-window.test.ts";
const BENCH = "test/workbench-reducer-selector-bench.test.ts";
const AGGREGATES = "test/workbench-observation-aggregates.test.ts";
const PERF = "test/workbench-observation-perf.test.ts";
const LOADER = "test/workbench-evidence-loader.test.ts";
const REPLIES = "test/workbench-tool-replies.test.ts";
const PI_REPLIES = "test/workbench-pi-tool-replies.test.ts";
const SECURITY_PI_TOOLS = "test/workbench-security-pi-tools.test.ts";
const ATTENTION = "test/workbench-attention.test.ts";
const REDUCER_BENCH: Companion = { command: "reducer-selector-bench", script: "qa/workbench/reducer-selector-bench.mjs" };

const CENSUS: readonly Row[] = Object.freeze([
  frozenRow({
    n: 1,
    quote: "Event burst coalescing (e.g. <=4 ordinary updates/s while active), not every token update.",
    status: "pinned",
    pins: [
      gatePin(INSPECTOR, "limits live ordinary redraw to four per second while native observations burst"),
      benchPin(BENCH, "keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock", REDUCER_BENCH),
    ],
    reason:
      "bench-receipt companion case: the cap never binds on 1s fixture ticks and the live scheduler is unmeasured (wb-9x5.15); presence-only, no live cadence claim",
  }),
  frozenRow({
    n: 2,
    quote: "Seconds-only clock tick <=1Hz and only for visible running rows.",
    status: "partial",
    pins: [gatePin(INSPECTOR, "does not ask TUI for a redraw on every one-second tick of a settled observed run")],
    reason: "only the settled-run half is pinned; no case binds the 'only for visible running rows' half",
  }),
  frozenRow({
    n: 3,
    quote: "No 80ms whole-dialog refresh under large-workload mode.",
    status: "unpinned",
    pins: [],
    reason:
      "no workbench falsifier exists (test/perf/widget.bench.ts is an upstream AgentWidget bench; test/workflow-dialog.test.ts has no large-workload refresh case)",
  }),
  frozenRow({
    n: 4,
    quote: "Pure layout and keyboard reducers are unit-tested without a TTY.",
    status: "pinned",
    pins: [
      gatePin(INSPECTOR, "Enter on the initially highlighted row collapses its observed relations; resize retains selected key"),
      gatePin(
        WINDOW,
        "paginates invocation-scoped nodes with total, monotonic revision, source-qualified identities and independent scope",
      ),
    ],
    reason: "both suites run under vitest with no pty",
  }),
  frozenRow({
    n: 5,
    quote: "Avoid O(allHistory) collapse per frame; maintain by-node last projection and ancestor aggregates incrementally.",
    status: "pinned",
    pins: [
      gatePin(AGGREGATES, "A8: 100,000 status ingests over a 2,000-node 5-level tree visit only their ancestors and never rebuild"),
      gatePin(INSPECTOR, "does not allocate a full latest-node array on every rich redraw or key"),
      gatePin(BENCH, "accounts reducer calls and bounded reads, and records no full fold per redraw"),
    ],
  }),
  frozenRow({
    n: 6,
    quote: "Virtualized visible rows + modest overscan; expensive Markdown syntax parsing only for selected transcript slice.",
    status: "partial",
    pins: [gatePin(INSPECTOR, "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18")],
    reason: "only the virtualized-rows half is pinned; no workbench case binds Markdown parsing to the selected transcript slice",
  }),
  frozenRow({
    n: 7,
    quote:
      "Graph layout cached by topology revision; no force-directed re-layout in render method. For large graphs show aggregate supernodes first.",
    status: "partial",
    pins: [
      gatePin(WINDOW, "keeps updates stable but increments topology revision only for proven relation mutation"),
      gatePin(INSPECTOR, "adds a new observed edge on topology revision and reflects its provenance"),
    ],
    reason: "'aggregate supernodes first' is unpinned: wb-6ze.32 / wb-6ze.34 open",
  }),
  frozenRow({
    n: 8,
    quote: "Bound memory: store highlights/current snapshots; stream older event/traces lazily.",
    status: "pinned",
    pins: [
      gatePin(PERF, "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history"),
      gatePin(LOADER, "loads one ref lazily and idempotently while loading"),
    ],
  }),
  frozenRow({
    n: 9,
    quote: "Pi observation tools paginate/filter/limit and return compact JSON, never rendered ANSI.",
    status: "partial",
    pins: [
      gatePin(REPLIES, "pages with a stable cursor and covers every row exactly once"),
      gatePin(ATTENTION, "examines one 100-node page of 1,000 and keeps the report compact"),
      gatePin(PI_REPLIES, "sanitizes hostile descriptor text: ANSI, bidi and secrets never reach the model (F3)"),
      gatePin(SECURITY_PI_TOOLS, "workflow_observe must strip bidi overrides in native operation labels"),
    ],
    reason:
      "paginate (catalog reply), compact (attention report) and ANSI-free halves are pinned on separate surfaces; no single case binds all of paginate/filter/limit plus compact JSON for the observation tools",
  }),
]);

/** The exact "## Rendering pipeline" section body: the diagram block, then the nine bullets, nothing else. */
const DIAGRAM: readonly string[] = Object.freeze([
  "    native events -> per-provider reducer -> stable projection indexes",
  "                  -> visible node selector -> cached layout + segments",
  "                  -> Pi TUI styled lines -> terminal line diff",
]);

const read = (file: string): string => readFileSync(resolve(ROOT, file), "utf8");
const existsRepo = (file: string): boolean => existsSync(resolve(ROOT, file));

const SPACE = /\s/;

/** Index of the closing quote of the string starting at `at` (a line break ends a quote that never closes). */
function skipString(text: string, at: number): number {
  const quote = text[at] as string;
  for (let i = at + 1; i < text.length; i += 1) {
    const ch = text[i] as string;
    if (ch === "\\") i += 1;
    else if (ch === quote) return i;
    else if (ch === "\n" && quote !== "`") return i;
  }
  return text.length - 1;
}

/** Index of the bracket closing the one at `open`, or -1 when the text never balances. */
function balancedEnd(text: string, open: number): number {
  const closers: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const stack: string[] = [];
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i] as string;
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(text, i);
      continue;
    }
    const closer = closers[ch];
    if (closer !== undefined) {
      stack.push(closer);
      continue;
    }
    if (ch === ")" || ch === "]" || ch === "}") {
      if (stack.pop() !== ch) return -1;
      if (stack.length === 0) return i;
    }
  }
  return -1;
}

/**
 * Removes // and block comments. String-, template- (including ${} code) and regex-literal-aware, so a comment marker
 * inside a literal survives and a real comment never does. Regex literals become a neutral token. Line breaks are kept.
 */
function stripComments(source: string): string {
  let out = "";
  let at = 0;
  const copyQuoted = (): void => {
    const end = skipString(source, at);
    out += source.slice(at, end + 1);
    at = end + 1;
  };
  const copyRegex = (): void => {
    out += "/r/";
    at += 1;
    let inClass = false;
    while (at < source.length) {
      const ch = source[at] as string;
      if (ch === "\n") return;
      at += ch === "\\" ? 2 : 1;
      if (ch === "[") inClass = true;
      else if (ch === "]") inClass = false;
      else if (ch === "/" && !inClass) return;
    }
  };
  const copyTemplate = (): void => {
    out += "`";
    at += 1;
    while (at < source.length) {
      const ch = source[at] as string;
      if (ch === "\\") {
        out += source.slice(at, at + 2);
        at += 2;
      } else if (ch === "`") {
        out += ch;
        at += 1;
        return;
      } else if (ch === "$" && source[at + 1] === "{") {
        out += "${";
        at += 2;
        copyCode(true);
        out += "}";
      } else {
        out += ch;
        at += 1;
      }
    }
  };
  const copyCode = (untilBrace: boolean): void => {
    let depth = 0;
    let last = "";
    while (at < source.length) {
      const ch = source[at] as string;
      const next = source[at + 1];
      if (ch === "/" && next === "/") {
        while (at < source.length && source[at] !== "\n") at += 1;
      } else if (ch === "/" && next === "*") {
        const close = source.indexOf("*/", at + 2);
        const stop = close < 0 ? source.length : close + 2;
        out += `${source.slice(at, stop).replace(/[^\n]/g, "")} `;
        at = stop;
      } else if (ch === '"' || ch === "'") {
        copyQuoted();
        last = ch;
      } else if (ch === "`") {
        copyTemplate();
        last = ch;
      } else if (ch === "/" && (last === "" || "(,=:[!&|?{};><+-*%^~".includes(last))) {
        copyRegex();
        last = "/";
      } else {
        if (ch === "{") depth += 1;
        if (ch === "}") {
          if (untilBrace && depth === 0) {
            at += 1;
            return;
          }
          depth -= 1;
        }
        out += ch;
        at += 1;
        if (!SPACE.test(ch)) last = ch;
      }
    }
  };
  copyCode(false);
  return out;
}

/** Blanks the inside of every quoted string (quotes and line breaks kept) so words in titles and messages never read as code. */
function maskStrings(source: string): string {
  let out = "";
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i] as string;
    if (ch === '"' || ch === "'" || ch === "`") {
      const end = skipString(source, i);
      out += ch + source.slice(i + 1, end).replace(/[^\n]/g, " ") + (end > i ? (source[end] as string) : "");
      i = end;
    } else out += ch;
  }
  return out;
}

/** An options-object key that disables or focuses a case: skip, todo or only with any value but a literal false. */
const OPTION_MODIFIER = /[{,]\s*["']?(?:skip|todo|only)["']?\s*(?::(?!\s*false\b)|(?=[,}]))/;
/** A static modifier chained onto describe, suite, it or test, with or without further chain links (.concurrent.skip). */
const CHAIN_MODIFIER = /\b(?:describe|suite|it|test)(?:\s*\.\s*[A-Za-z]+)*?\s*\.\s*(?:skip|todo|only|skipIf|runIf)\b/g;
const SUITE_CALL = /\b(?:describe|suite)(?:\s*\.\s*[A-Za-z]+)*\s*\(/g;
/** A suite call head, tested against the text before an opening paren. */
const SUITE_HEAD = /(?:^|[^\w$.])(?:describe|suite)(?:\s*\.\s*[A-Za-z]+)*\s*$/;
/** What may sit between a describe call's "(" and the "{" of its callback: optional title, optional options, a no-arg callback head. */
const CALLBACK_HEAD =
  /^\s*(?:(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)\s*,\s*)?(?:\{[^{}]*\}\s*,\s*)?(?:async\s+)?(?:\(\s*\)\s*=>|function\s*\w*\s*\(\s*\))\s*$/;
/** A dynamic skip from inside a case body: ctx.skip(), context.skip(), t.skip(), or a destructured skip(). */
const BODY_SKIP = /\bskip\s*\(/;
const CASE_HEAD = /(?:^|[\s;{}(])(?:it|test)\s*$/;

/** The top-level `{...}` options arguments of the call whose opening paren is at `open`, plus the whole argument text. */
function callArguments(source: string, open: number): { readonly options: string[]; readonly text: string } | undefined {
  const end = balancedEnd(source, open);
  if (end < 0) return undefined;
  const options: string[] = [];
  let previous = "";
  for (let i = open + 1; i < end; i += 1) {
    const ch = source[i] as string;
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(source, i);
      previous = ch;
    } else if ("([{".includes(ch)) {
      const close = balancedEnd(source, i);
      if (close < 0) return undefined;
      if (ch === "{" && previous === ",") options.push(source.slice(i, close + 1));
      i = close;
      previous = ")";
    } else if (!SPACE.test(ch)) previous = ch;
  }
  return { options, text: source.slice(open + 1, end) };
}

/** Whole-file hazards that can switch off any case in the file; each fails every pin in it. Input is comment-stripped source. */
function fileHazards(stripped: string): string[] {
  const masked = maskStrings(stripped);
  const hazards = [...masked.matchAll(CHAIN_MODIFIER)].map(hit => hit[0].replace(/\s/g, ""));
  for (const hit of masked.matchAll(SUITE_CALL)) {
    const args = callArguments(stripped, hit.index + hit[0].length - 1);
    if (args === undefined) hazards.push(`${hit[0].trim()} with unparseable arguments`);
    else if (args.options.some(option => OPTION_MODIFIER.test(option))) hazards.push(`${hit[0].trim()} options object skip/todo/only`);
  }
  return [...new Set(hazards)];
}

/** The brackets still open at `at`, outermost first. */
function enclosing(stripped: string, at: number): { readonly ch: string; readonly at: number }[] {
  const stack: { readonly ch: string; readonly at: number }[] = [];
  for (let i = 0; i < at; i += 1) {
    const ch = stripped[i] as string;
    if (ch === '"' || ch === "'" || ch === "`") i = skipString(stripped, i);
    else if (ch === "(" || ch === "[" || ch === "{") stack.push({ ch, at: i });
    else if (ch === ")" || ch === "]" || ch === "}") stack.pop();
  }
  return stack;
}

/** Why the case call at `callAt` is not a direct statement of a describe/suite callback (under if/for/&&/else/helper), or undefined. */
function placementProblem(stripped: string, callAt: number): string | undefined {
  const before = stripped.slice(0, callAt).trimEnd();
  const previous = before.slice(-1);
  if (previous !== "" && !"{};".includes(previous)) return `case call is not a standalone statement (preceded by "${before.slice(-24)}")`;
  const stack = enclosing(stripped, callAt);
  for (const [index, bracket] of stack.entries()) {
    if (bracket.ch === "[") return "case call sits inside an array literal";
    if (bracket.ch === "(") {
      if (!SUITE_HEAD.test(stripped.slice(0, bracket.at))) return "case call sits inside a call that is not a describe/suite callback";
    } else {
      const parent = stack[index - 1];
      if (parent === undefined || parent.ch !== "(") return "case call sits inside a block that is not a describe/suite callback (conditional, loop, else or object)";
      if (!CALLBACK_HEAD.test(stripped.slice(parent.at + 1, bracket.at))) return "case call sits inside a describe/suite callback with an unrecognised head";
    }
  }
  return undefined;
}

/** Why the pinned case is not a live case, or undefined. Input is comment-stripped source. */
function caseProblem(stripped: string, title: string): string | undefined {
  const sites: number[] = [];
  for (const quote of ['"', "'", "`"]) {
    const needle = `${quote}${title}${quote}`;
    for (let at = stripped.indexOf(needle); at >= 0; at = stripped.indexOf(needle, at + 1)) sites.push(at);
  }
  if (sites.length === 0) return "title not found (renamed, deleted or commented out)";
  if (sites.length > 1) return `title appears ${sites.length} times, expected exactly once`;
  const at = sites[0] as number;
  const head = stripped.slice(0, at).trimEnd();
  if (!head.endsWith("(")) return `expected a plain it()/test() call (found "${head.slice(-24)}")`;
  const open = head.length - 1;
  const callee = CASE_HEAD.exec(stripped.slice(0, open));
  if (callee === null) return `expected a plain it()/test() call (found "${stripped.slice(Math.max(0, open - 24), open + 1).trim()}")`;
  const args = callArguments(stripped, open);
  if (args === undefined) return "case call could not be parsed";
  if (args.options.some(option => OPTION_MODIFIER.test(option))) return "case carries an options object skip/todo/only";
  if (BODY_SKIP.test(maskStrings(args.text))) return "case body calls skip() (dynamic skip)";
  return placementProblem(stripped, open - (callee[0].trimStart().length));
}

/** One failure string per violated clause, naming bullet, file and title; empty when the pin holds. */
function pinProblems(row: Row, pin: Pin, source: string): string[] {
  const where = `bullet ${row.n} ${pin.file} "${pin.title}"`;
  const stripped = stripComments(source);
  const problems: string[] = [];
  const issue = caseProblem(stripped, pin.title);
  if (issue !== undefined) problems.push(`${where}: ${issue}`);
  for (const hazard of fileHazards(stripped)) problems.push(`${where}: file hides cases behind ${hazard}`);
  return problems;
}

function globToRegExp(glob: string): RegExp {
  let pattern = "";
  for (let i = 0; i < glob.length; i += 1) {
    if (glob.startsWith("**/", i)) {
      pattern += "(?:.*/)?";
      i += 2;
    } else if (glob.startsWith("**", i)) {
      pattern += ".*";
      i += 1;
    } else if (glob[i] === "*") pattern += "[^/]*";
    else pattern += (glob[i] as string).replace(/[.+^${}()|[\]\\?]/g, "\\$&");
  }
  return new RegExp(`^${pattern}$`);
}

interface VitestConfigShape {
  readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}

/** Why vitest would not run `file` under the config's test.include / test.exclude, or undefined. */
function runnerProblem(loaded: VitestConfigShape, file: string): string | undefined {
  const include = loaded.test?.include;
  if (include === undefined) return file.endsWith(".test.ts") ? undefined : "no test.include and not a *.test.ts file";
  if (!include.some(glob => globToRegExp(glob).test(file))) return `not matched by vitest.config.ts test.include (${include.join(", ")})`;
  const excluded = (loaded.test?.exclude ?? []).find(glob => globToRegExp(glob).test(file));
  return excluded === undefined ? undefined : `excluded by vitest.config.ts test.exclude (${excluded})`;
}

/** The text of a forge.toml table, from its header line to the next header, or undefined when absent. */
function tomlTable(toml: string, name: string): string | undefined {
  const header = new RegExp(`^\\[${name.replace(/[.\\]/g, "\\$&")}\\][ \\t]*$`, "m").exec(toml);
  if (header === null) return undefined;
  const rest = toml.slice(header.index + header[0].length);
  const next = rest.search(/\n\[/);
  return next < 0 ? rest : rest.slice(0, next);
}

const tomlString = (table: string, key: string): string | undefined => new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(table)?.[1];

function gateSteps(toml: string): string[] | undefined {
  const build = tomlTable(toml, "build");
  const list = build === undefined ? null : /^gate\s*=\s*\[([^\]]*)\]/m.exec(build);
  return list === null ? undefined : [...(list[1] ?? "").matchAll(/"([^"]+)"/g)].map(hit => hit[1] as string);
}

/** Why the forge gate would not run `vitest run` (the config module the pins are checked against), or undefined. */
function gateProblem(toml: string, packageJson: string): string | undefined {
  const steps = gateSteps(toml);
  if (steps === undefined || !steps.includes("test")) return "forge.toml [build] gate does not include the test step";
  const commands = tomlTable(toml, "build.commands");
  if (commands === undefined || tomlString(commands, "test") !== "npm run test") return 'forge.toml [build.commands] test is not "npm run test"';
  const scripts = (JSON.parse(packageJson) as { scripts?: Record<string, string> }).scripts;
  return scripts?.test === "vitest run" ? undefined : 'package.json scripts.test is not "vitest run"';
}

/** Why a bench-receipt label is not true: its forge.toml command, its script, its place outside the gate, its import by the pinned file. */
function companionProblem(toml: string, companion: Companion, pinnedSource: string, scriptExists: boolean): string | undefined {
  const table = tomlTable(toml, `build.commands.${companion.command}`);
  if (table === undefined) return `forge.toml has no [build.commands.${companion.command}] entry`;
  if (!(tomlString(table, "command") ?? "").includes(companion.script)) return `forge.toml command ${companion.command} does not run ${companion.script}`;
  if ((gateSteps(toml) ?? []).includes(companion.command)) return `${companion.command} is inside the default gate, not a bench-receipt command outside it`;
  if (!scriptExists) return `${companion.script} does not exist`;
  return stripComments(pinnedSource).includes(`../${companion.script}`) ? undefined : `pinned file does not import ../${companion.script}`;
}

/** Why the pin's tier label is false against the gate config, or undefined. */
function tierProblems(row: Row, pin: Pin, loaded: VitestConfigShape, toml: string, packageJson: string, pinnedSource: string, scriptExists: boolean): string[] {
  const where = `bullet ${row.n} ${pin.file} "${pin.title}" tier ${pin.tier}`;
  const problems: string[] = [];
  const runner = runnerProblem(loaded, pin.file);
  if (runner !== undefined) problems.push(`${where}: ${runner}`);
  const gate = gateProblem(toml, packageJson);
  if (gate !== undefined) problems.push(`${where}: ${gate}`);
  if (pin.tier === "bench-receipt") {
    if (pin.companion === undefined) problems.push(`${where}: bench-receipt pin names no companion command`);
    else {
      const companion = companionProblem(toml, pin.companion, pinnedSource, scriptExists);
      if (companion !== undefined) problems.push(`${where}: ${companion}`);
    }
  } else if (pin.companion !== undefined) problems.push(`${where}: default-gate pin must not claim a bench companion`);
  return problems;
}

/** The "## Rendering pipeline" section lines (heading to the next H2 or EOF), blank lines dropped and trailing space trimmed only. */
function pipelineLines(doc: string): string[] | undefined {
  const headings = [...doc.matchAll(/^## Rendering pipeline[ \t]*$/gm)];
  if (headings.length !== 1) return undefined;
  const heading = headings[0] as RegExpMatchArray;
  const rest = doc.slice((heading.index ?? 0) + heading[0].length);
  const next = rest.search(/\n## /);
  return (next < 0 ? rest : rest.slice(0, next))
    .split("\n")
    .map(line => line.trimEnd())
    .filter(line => line !== "");
}

/** Why the section is not exactly the pinned diagram plus the nine bullets, naming each dropped or foreign line. */
function docsProblems(doc: string, rows: readonly Row[]): string[] {
  const lines = pipelineLines(doc);
  if (lines === undefined) return ['docs/10 does not carry exactly one exact "## Rendering pipeline" heading line'];
  const expected = [...DIAGRAM, ...rows.map(row => `- ${row.quote}`)];
  if (lines.length === expected.length && lines.every((line, index) => line === expected[index])) return [];
  const problems: string[] = [];
  for (const row of rows) if (!lines.includes(`- ${row.quote}`)) problems.push(`bullet ${row.n} dropped or rewritten: ${row.quote}`);
  for (const line of DIAGRAM) if (!lines.includes(line)) problems.push(`pipeline diagram line dropped or rewritten: ${line.trim()}`);
  for (const line of lines) if (!expected.includes(line)) problems.push(`foreign line inside the Rendering pipeline section: ${line.trim()}`);
  if (problems.length === 0) problems.push("Rendering pipeline section lines are duplicated or out of order");
  return problems;
}

const CALL = /\b(?:it|test)((?:\.[A-Za-z]+(?:\([^)]*\))?)*)\(\s*(['"`])((?:\\.|(?!\2)[^\\\n])*)\2/g;

/** Rewrite the single call carrying `title` in a copy of the source: new modifier chain and new title text. */
function rewriteCall(source: string, title: string, mutate: (chain: string) => { chain: string; title: string }): string {
  for (const match of source.matchAll(CALL)) {
    if ((match[3] ?? "").replace(/\\(['"`\\])/g, "$1") !== title) continue;
    const head = match[0];
    const fn = /^(?:it|test)/.exec(head)?.[0] ?? "it";
    const quote = match[2] ?? "'";
    const next = mutate(match[1] ?? "");
    const at = match.index ?? 0;
    return source.slice(0, at) + `${fn}${next.chain}(${quote}${next.title}${quote}` + source.slice(at + head.length);
  }
  return source;
}

const pinSource = (pin: Pin): string => read(pin.file);
const allPins = (): { readonly row: Row; readonly pin: Pin }[] => CENSUS.flatMap(row => row.pins.map(pin => ({ row, pin })));

describe("VC-5/W15 docs/workbench/10 'Rendering pipeline' census (wb-6ze.39)", () => {
  it("the census table is deeply frozen at nine rows with the verbatim bullet quotes in docs order", () => {
    expect(Object.isFrozen(CENSUS)).toBe(true);
    for (const row of CENSUS) {
      expect(Object.isFrozen(row), `bullet ${row.n} row frozen`).toBe(true);
      expect(Object.isFrozen(row.pins), `bullet ${row.n} pins frozen`).toBe(true);
      for (const pin of row.pins) expect(Object.isFrozen(pin), `bullet ${row.n} pin frozen`).toBe(true);
    }
    expect(CENSUS.map(row => row.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const lines = pipelineLines(read(DOC_PATH)) ?? [];
    expect(CENSUS.map(row => `- ${row.quote}`)).toEqual(lines.filter(line => line.startsWith("- ")));
  });

  it("docs/workbench/10 section Rendering pipeline is exactly the pinned diagram plus the nine bullets, naming any dropped, rewritten or foreign line", () => {
    expect(docsProblems(read(DOC_PATH), CENSUS)).toEqual([]);
  });

  it("every row is pinned, partial or unpinned; unpinned and partial rows state a reason", () => {
    for (const row of CENSUS) {
      if (row.status === "unpinned") {
        expect(row.pins, `bullet ${row.n} unpinned rows carry no pins`).toEqual([]);
        expect((row.reason ?? "").length, `bullet ${row.n} needs a reason`).toBeGreaterThan(0);
      } else {
        expect(row.pins.length, `bullet ${row.n} ${row.status} rows carry pins`).toBeGreaterThan(0);
      }
      if (row.status === "partial") {
        expect((row.reason ?? "").length, `bullet ${row.n} partial rows state the unpinned half`).toBeGreaterThan(0);
      }
    }
  });

  it("today's honest shape: unpinned bullet 3 and partial bullets 2, 6, 7, 9 are never counted passed", () => {
    const status = Object.fromEntries(CENSUS.map(row => [row.n, row.status]));
    expect(status).toEqual({ 1: "pinned", 2: "partial", 3: "unpinned", 4: "pinned", 5: "pinned", 6: "partial", 7: "partial", 8: "pinned", 9: "partial" });
    const fullyPassed = CENSUS.filter(row => row.status === "pinned").map(row => row.n);
    expect(fullyPassed).toEqual([1, 4, 5, 8]);
  });

  describe("every pinned title exists exactly once, live, in its file at HEAD", () => {
    for (const { row, pin } of allPins()) {
      it(`bullet ${row.n}: ${pin.file} "${pin.title}"`, () => {
        expect(pinProblems(row, pin, pinSource(pin))).toEqual([]);
      });
    }
  });

  describe("every tier label is true against the gate config", () => {
    it("the forge gate runs `vitest run` and every pinned file is matched by the shared vitest config and not excluded", () => {
      const problems = allPins().flatMap(({ row, pin }) =>
        tierProblems(row, pin, config as unknown as VitestConfigShape, read(FORGE_TOML), read(PACKAGE_JSON), pinSource(pin), pin.companion === undefined ? true : existsRepo(pin.companion.script)),
      );
      expect(problems).toEqual([]);
    });

    it("the census file itself is run by the same config", () => {
      expect(runnerProblem(config as unknown as VitestConfigShape, "test/workbench-rendering-pipeline.test.ts")).toBeUndefined();
    });
  });

  describe("mutation table: each pinned row goes red naming bullet, file and title under rename, delete, skip and only", () => {
    for (const { row, pin } of allPins()) {
      const source = pinSource(pin);
      const mutants = [
        ["renamed", rewriteCall(source, pin.title, () => ({ chain: "", title: "renamed away" }))],
        ["deleted", rewriteCall(source, pin.title, () => ({ chain: "", title: "" }))],
        ["skipped", rewriteCall(source, pin.title, () => ({ chain: ".skip", title: pin.title }))],
        ["only", rewriteCall(source, pin.title, () => ({ chain: ".only", title: pin.title }))],
      ] as const;
      for (const [label, mutated] of mutants) {
        it(`bullet ${row.n} ${label}: ${pin.file} "${pin.title.slice(0, 48)}"`, () => {
          expect(mutated).not.toBe(source);
          const problems = pinProblems(row, pin, mutated);
          expect(problems.length).toBeGreaterThan(0);
          expect(problems.join("\n")).toContain(`bullet ${row.n} ${pin.file} "${pin.title}"`);
        });
      }
    }
  });

  describe("scanner self-checks on synthetic sources", () => {
    const row: Row = { n: 0, quote: "q", status: "pinned", pins: [] };
    const pin: Pin = { file: "x.test.ts", title: "keeps the cap", tier: "default-gate" };
    const wrap = (body: string): string => `describe("suite", () => {\n${body}\n});\n`;
    it("accepts one enabled case in any quote style and rejects duplicates, markers and suite-level skips", () => {
      expect(pinProblems(row, pin, wrap(`it('keeps the cap',()=>{});`))).toEqual([]);
      expect(pinProblems(row, pin, wrap(`test("keeps the cap", () => {});`))).toEqual([]);
      expect(pinProblems(row, pin, wrap("it(`keeps the cap`, () => {});"))).toEqual([]);
      expect(pinProblems(row, pin, wrap(`it("keeps the cap",()=>{});it("keeps the cap",()=>{});`))[0]).toContain("2 times");
      expect(pinProblems(row, pin, wrap(`it.fails("keeps the cap",()=>{});`))[0]).toContain(".fails");
      expect(pinProblems(row, pin, wrap(`it.todo("keeps the cap");`))[0]).toContain(".todo");
      expect(pinProblems(row, pin, wrap(`it.skipIf(true)("keeps the cap",()=>{});`))[0]).toContain(".skipIf");
      expect(pinProblems(row, pin, `describe.skip("s",()=>{it("keeps the cap",()=>{});});`).join("\n")).toContain("describe.skip");
      expect(pinProblems(row, pin, wrap(`it("keeps the cap too",()=>{});`))[0]).toContain("renamed, deleted or commented out");
    });
  });
});

/*
 * Per-mode falsifiers (wb-6ze.39 respin U1-U3). Every source below is written by hand, never produced by the scanner's
 * own call pattern, so a scanner blind spot cannot hide itself. Each non-control mode must come back red naming the
 * bullet, file and title; each control must stay green.
 */
const T = "keeps the cap";
const fixtureRow: Row = { n: 9, quote: "q", status: "pinned", pins: [] };
const fixturePin: Pin = { file: "fixture.test.ts", title: T, tier: "default-gate" };
const problemsOf = (source: string): string => pinProblems(fixtureRow, fixturePin, source).join("\n");
const CASE = `it("${T}", () => {\n    expect(1).toBe(1);\n  });`;
const inSuite = (body: string): string => `import { describe, expect, it } from "vitest";\ndescribe("suite", () => {\n  ${body}\n});\n`;
const WHERE = `bullet 9 fixture.test.ts "${T}"`;

interface Mode {
  readonly id: string;
  readonly label: string;
  readonly source: string;
  readonly want: string;
}

const RED_MODES: readonly Mode[] = [
  { id: "S1", label: "line-commented case", source: inSuite(`// ${CASE.replace(/\n/g, " ")}`), want: "title not found" },
  { id: "S2", label: "block-commented case", source: inSuite(`/* ${CASE} */`), want: "title not found" },
  { id: "S2b", label: "block comment opened before and closed after the case line", source: inSuite(`/*\n  ${CASE}\n*/`), want: "title not found" },
  { id: "S4", label: "options { skip: true }", source: inSuite(`it("${T}", { skip: true }, () => {\n    expect(1).toBe(1);\n  });`), want: "options object" },
  { id: "S4t", label: "options { todo: true }", source: inSuite(`it("${T}", { todo: true }, () => {\n    expect(1).toBe(1);\n  });`), want: "options object" },
  { id: "S4o", label: "options { only: true }", source: inSuite(`it("${T}", { only: true }, () => {\n    expect(1).toBe(1);\n  });`), want: "options object" },
  { id: "S4q", label: 'options { "skip": true } with a quoted key', source: inSuite(`it("${T}", { "skip": true }, () => {});`), want: "options object" },
  { id: "S4s", label: "options { skip } shorthand", source: inSuite(`const skip = true;\n  it("${T}", { skip }, () => {});`), want: "options object" },
  { id: "S10", label: "describe options { skip: true }", source: `describe("suite", { skip: true }, () => {\n  ${CASE}\n});\n`, want: "options object" },
  { id: "S10t", label: "describe options { todo: true }", source: `describe("suite", { todo: true }, () => {\n  ${CASE}\n});\n`, want: "options object" },
  { id: "G11", label: "describe.skip", source: `describe.skip("suite", () => {\n  ${CASE}\n});\n`, want: "describe.skip" },
  { id: "G11t", label: "describe.todo", source: `describe.todo("suite", () => {\n  ${CASE}\n});\n`, want: "describe.todo" },
  { id: "G11c", label: "describe.concurrent.skip", source: `describe.concurrent.skip("suite", () => {\n  ${CASE}\n});\n`, want: "describe.concurrent.skip" },
  { id: "G11q", label: "describe.sequential.skip", source: `describe.sequential.skip("suite", () => {\n  ${CASE}\n});\n`, want: "describe.sequential.skip" },
  { id: "G11o", label: "describe.only", source: `describe.only("suite", () => {\n  ${CASE}\n});\n`, want: "describe.only" },
  { id: "S3", label: "describe.skipIf(true)", source: `describe.skipIf(true)("suite", () => {\n  ${CASE}\n});\n`, want: "describe.skipIf" },
  { id: "S3r", label: "describe.runIf(false)", source: `describe.runIf(false)("suite", () => {\n  ${CASE}\n});\n`, want: "describe.runIf" },
  { id: "S11", label: "suite alias .skip", source: `import { suite } from "vitest";\nsuite.skip("suite", () => {\n  ${CASE}\n});\n`, want: "suite.skip" },
  { id: "S11b", label: "suite alias options { skip: true }", source: `import { suite } from "vitest";\nsuite("suite", { skip: true }, () => {\n  ${CASE}\n});\n`, want: "options object" },
  { id: "S6", label: "it.skipIf(true)(title)", source: inSuite(`it.skipIf(true)("${T}", () => {});`), want: ".skipIf" },
  { id: "S6r", label: "it.runIf(false)(title)", source: inSuite(`it.runIf(false)("${T}", () => {});`), want: ".runIf" },
  { id: "R1", label: "renamed case", source: inSuite(`it("${T} renamed", () => {});`), want: "title not found" },
  { id: "R2", label: "deleted case", source: inSuite(""), want: "title not found" },
  { id: "R3", label: "it.skip", source: inSuite(`it.skip("${T}", () => {});`), want: ".skip" },
  { id: "R4", label: "it.todo", source: inSuite(`it.todo("${T}");`), want: ".todo" },
  { id: "R5", label: "it.fails", source: inSuite(`it.fails("${T}", () => {});`), want: ".fails" },
  { id: "R6", label: "it.only", source: inSuite(`it.only("${T}", () => {});`), want: ".only" },
  { id: "R7", label: "duplicate title", source: inSuite(`${CASE}\n  ${CASE}`), want: "2 times" },
  { id: "S5", label: "ctx.skip() in the body", source: inSuite(`it("${T}", ctx => {\n    ctx.skip();\n    expect(1).toBe(1);\n  });`), want: "dynamic skip" },
  { id: "S5t", label: "t.skip() in an async function body", source: inSuite(`it("${T}", async function (t) {\n    t.skip();\n  });`), want: "dynamic skip" },
  { id: "S5d", label: "destructured skip() in the body", source: inSuite(`it("${T}", ({ skip }) => {\n    skip();\n  });`), want: "dynamic skip" },
  { id: "COND", label: "case under if (process.env.FLAG)", source: inSuite(`if (process.env.WB_GATE_NEVER_SET_FLAG) {\n    ${CASE}\n  }`), want: "not a describe/suite callback" },
  { id: "CONDe", label: "case under else", source: inSuite(`if (process.env.WB_GATE_NEVER_SET_FLAG) {\n    expect(1).toBe(1);\n  } else {\n    ${CASE}\n  }`), want: "not a describe/suite callback" },
  { id: "CONDf", label: "case under for-of", source: inSuite(`for (const x of []) {\n    ${CASE}\n  }`), want: "not a describe/suite callback" },
  { id: "CONDb", label: "case braceless under if", source: inSuite(`if (process.env.WB_GATE_NEVER_SET_FLAG)\n    ${CASE}`), want: "standalone statement" },
  { id: "CONDa", label: "case behind &&", source: inSuite(`process.env.WB_GATE_NEVER_SET_FLAG && ${CASE}`), want: "standalone statement" },
  { id: "CONDt", label: "case in a ternary", source: inSuite(`process.env.WB_GATE_NEVER_SET_FLAG ? ${CASE} : undefined;`), want: "standalone statement" },
  { id: "CONDh", label: "case passed to a helper callback", source: inSuite(`wrapper(() => {\n    ${CASE}\n  });`), want: "not a describe/suite callback" },
  { id: "CONDtop", label: "case under a top-level if", source: `if (process.env.WB_GATE_NEVER_SET_FLAG) {\n  ${CASE}\n}\n`, want: "not a describe/suite callback" },
  { id: "G12", label: "sibling it.only elsewhere in the file", source: inSuite(`${CASE}\n  it.only("another case", () => {});`), want: "it.only" },
  { id: "G12t", label: "sibling test.only elsewhere in the file", source: inSuite(`${CASE}\n  test.only("another case", () => {});`), want: "test.only" },
  { id: "G12d", label: "sibling describe.only elsewhere in the file", source: `${inSuite(CASE)}describe.only("other", () => {\n  it("x", () => {});\n});\n`, want: "describe.only" },
  { id: "G12c", label: "sibling it.concurrent.skip elsewhere in the file", source: inSuite(`${CASE}\n  it.concurrent.skip("another case", () => {});`), want: "it.concurrent.skip" },
];

const GREEN_CONTROLS: readonly { readonly id: string; readonly label: string; readonly source: string }[] = [
  { id: "C1", label: "plain live case", source: inSuite(CASE) },
  { id: "C2", label: "comment markers inside strings before the case", source: inSuite(`const url = "http://example.test//path"; // trailing\n  const glob = '/* not a comment */';\n  ${CASE}`) },
  { id: "C3", label: "a regex literal with quotes and slashes before the case", source: inSuite(`const pattern = /["'\\/]+\\/\\*/;\n  ${CASE}`) },
  { id: "C4", label: "template literal whose substitution holds a // string", source: inSuite(`${["const label = `a $", '{"//x"} b`;'].join("")}\n  ${CASE}`) },
  { id: "C5", label: "describe options { timeout } and case options { timeout }", source: `describe("suite", { timeout: 5000 }, () => {\n  it("${T}", { timeout: 1000 }, () => {});\n});\n` },
  { id: "C6", label: "options { skip: false } is not a modifier", source: inSuite(`it("${T}", { skip: false }, () => {});`) },
  { id: "C7", label: "the words skip( and .only inside strings", source: inSuite(`it("${T}", () => {\n    expect("skip(1) adv.only it.skip(2)").toContain("skip");\n  });`) },
  { id: "C8", label: "nested describes with async callbacks", source: `describe("outer", () => {\n  describe("inner", async () => {\n    ${CASE}\n  });\n});\n` },
  { id: "C9", label: "function-expression describe callback", source: `describe("suite", function () {\n  ${CASE}\n});\n` },
  { id: "C10", label: "case at the top level of the file", source: `${CASE}\n` },
  { id: "C11", label: "a sibling case with a skipped-looking identifier name", source: inSuite(`const skipped = (value: number) => value;\n  ${CASE}\n  it("another", () => {\n    expect(skipped(1)).toBe(1);\n  });`) },
  { id: "C12", label: "title in single quotes and in a template", source: inSuite(`it('${T}', () => {});`) },
];

describe("per-mode census-silence falsifiers (wb-6ze.39 U1): every way of switching a pinned case off goes red", () => {
  for (const mode of RED_MODES) {
    it(`${mode.id}: ${mode.label} goes red naming bullet, file and title`, () => {
      const out = problemsOf(mode.source);
      expect(out, `${mode.id} must be red`).not.toBe("");
      expect(out).toContain(WHERE);
      expect(out).toContain(mode.want);
    });
  }

  for (const control of GREEN_CONTROLS) {
    it(`${control.id}: ${control.label} stays green`, () => {
      expect(problemsOf(control.source)).toBe("");
    });
  }

  it("breadth: every real pinned file goes red under a file-wide hazard injected after its last line, for each pinned title in it", () => {
    for (const { row, pin } of allPins()) {
      for (const hazard of ["describe.skip('x', () => {});", "suite.todo('x', () => {});", "it.only('x', () => {});", "describe('x', { skip: true }, () => {});"]) {
        const problems = pinProblems(row, pin, `${pinSource(pin)}\n${hazard}\n`);
        expect(problems.join("\n"), `bullet ${row.n} ${pin.file} under ${hazard}`).toContain(`bullet ${row.n} ${pin.file} "${pin.title}"`);
      }
    }
  });
});

describe("tier-truth falsifiers (wb-6ze.39 U2): a tier label is a claim about the gate config", () => {
  const livePin = gatePin("test/a.test.ts", T);
  const benchRow: Row = { n: 1, quote: "q", status: "pinned", pins: [] };
  const GOOD_TOML = [
    "[build]",
    'gate = ["lint", "typing", "build", "test"]',
    "",
    "[build.commands]",
    'test = "npm run test"',
    "",
    "[build.commands.some-bench]",
    'command = "node qa/workbench/some-bench.mjs"',
    "timeout = 300",
    "",
  ].join("\n");
  const GOOD_PKG = JSON.stringify({ scripts: { test: "vitest run" } });
  const GOOD_CFG: VitestConfigShape = { test: { include: ["test/**/*.test.ts"], exclude: ["test/other.test.ts"] } };
  const COMPANION: Companion = { command: "some-bench", script: "qa/workbench/some-bench.mjs" };
  const benchPinOf = benchPin("test/b.test.ts", T, COMPANION);
  const IMPORTING = `import { x } from "../qa/workbench/some-bench.mjs";\ndescribe("s", () => { it("${T}", () => {}); });\n`;
  const tier = (pin: Pin, cfg: VitestConfigShape, toml: string, pkg: string, source: string, exists = true): string =>
    tierProblems(benchRow, pin, cfg, toml, pkg, source, exists).join("\n");

  it("controls stay green: a default-gate pin and a bench-receipt pin against a truthful config", () => {
    expect(tier(livePin, GOOD_CFG, GOOD_TOML, GOOD_PKG, "")).toBe("");
    expect(tier(benchPinOf, GOOD_CFG, GOOD_TOML, GOOD_PKG, IMPORTING)).toBe("");
  });

  it("T1: a pinned file added to test.exclude goes red", () => {
    const out = tier(livePin, { test: { include: ["test/**/*.test.ts"], exclude: ["test/a.test.ts"] } }, GOOD_TOML, GOOD_PKG, "");
    expect(out).toContain("excluded by vitest.config.ts test.exclude");
    expect(out).toContain('bullet 1 test/a.test.ts "keeps the cap" tier default-gate');
  });

  it("T1all: every pinned file excluded goes red for each pin; a narrowed include and a missing glob match go red too", () => {
    const excludeAll: VitestConfigShape = { test: { include: ["test/**/*.test.ts"], exclude: allPins().map(({ pin }) => pin.file) } };
    for (const { row, pin } of allPins()) {
      const out = tierProblems(row, pin, excludeAll, read(FORGE_TOML), read(PACKAGE_JSON), pinSource(pin), true).join("\n");
      expect(out, `${row.n} ${pin.file}`).toContain("excluded by vitest.config.ts test.exclude");
    }
    expect(tier(livePin, { test: { include: ["test/only-this.test.ts"] } }, GOOD_TOML, GOOD_PKG, "")).toContain("not matched by vitest.config.ts test.include");
  });

  it("T2: a forge gate that drops the test step, rewires it, or a package.json test script that is not vitest run goes red", () => {
    expect(tier(livePin, GOOD_CFG, GOOD_TOML.replace('"test"]', '"build"]'), GOOD_PKG, "")).toContain("does not include the test step");
    expect(tier(livePin, GOOD_CFG, GOOD_TOML.replace('test = "npm run test"', 'test = "echo ok"'), GOOD_PKG, "")).toContain('is not "npm run test"');
    expect(tier(livePin, GOOD_CFG, GOOD_TOML, JSON.stringify({ scripts: { test: "vitest run --config other.ts" } }), "")).toContain('scripts.test is not "vitest run"');
  });

  it("T3: a bench-receipt label with no forge.toml command, a command running another script, a command inside the gate, a missing script or a non-importing test goes red", () => {
    expect(tier(benchPinOf, GOOD_CFG, GOOD_TOML.replace("[build.commands.some-bench]", "[build.commands.renamed-bench]"), GOOD_PKG, IMPORTING)).toContain("has no [build.commands.some-bench] entry");
    expect(tier(benchPinOf, GOOD_CFG, GOOD_TOML.replace("some-bench.mjs", "elsewhere.mjs"), GOOD_PKG, IMPORTING)).toContain("does not run qa/workbench/some-bench.mjs");
    expect(tier(benchPinOf, GOOD_CFG, GOOD_TOML.replace('"test"]', '"test", "some-bench"]'), GOOD_PKG, IMPORTING)).toContain("inside the default gate");
    expect(tier(benchPinOf, GOOD_CFG, GOOD_TOML, GOOD_PKG, IMPORTING, false)).toContain("does not exist");
    expect(tier(benchPinOf, GOOD_CFG, GOOD_TOML, GOOD_PKG, `describe("s", () => { it("${T}", () => {}); });\n`)).toContain("does not import ../qa/workbench/some-bench.mjs");
    expect(tier({ ...benchPinOf, companion: undefined }, GOOD_CFG, GOOD_TOML, GOOD_PKG, IMPORTING)).toContain("names no companion command");
    expect(tier({ ...livePin, companion: COMPANION }, GOOD_CFG, GOOD_TOML, GOOD_PKG, "")).toContain("must not claim a bench companion");
  });

  it("the real repo: bullet 1's bench label resolves to the reducer-selector-bench forge command outside the gate", () => {
    const bench = CENSUS.flatMap(row => row.pins).filter(pin => pin.tier === "bench-receipt");
    expect(bench.map(pin => pin.companion?.command)).toEqual(["reducer-selector-bench"]);
  });
});

describe("docs-exactness falsifiers (wb-6ze.39 U3): the whole Rendering pipeline section is pinned, bounded at the next H2", () => {
  const DOC = read(DOC_PATH);
  const BULLET_3 = "- No 80ms whole-dialog refresh under large-workload mode.";
  const docsOut = (doc: string): string => docsProblems(doc, CENSUS).join("\n");
  const LAST_BULLET = `- ${CENSUS[8]?.quote}`;

  it("the real docs file is green and each control below starts from it", () => {
    expect(docsOut(DOC)).toBe("");
  });

  it("D1: a weakening sentence inside the section goes red", () => {
    expect(docsOut(DOC.replace(BULLET_3, `${BULLET_3}\n- Limits are advisory and may be exceeded.`))).toContain("foreign line inside the Rendering pipeline section");
  });

  it("D2: an 'Advisory only' prefix line goes red", () => {
    expect(docsOut(DOC.replace("\n- Event burst coalescing", "\nAdvisory only, never enforced:\n- Event burst coalescing"))).toContain("foreign line inside the Rendering pipeline section");
  });

  it("D3: an H3 above the bullets goes red", () => {
    expect(docsOut(DOC.replace("\n- Event burst coalescing", "\n### Superseded notes (historical, non-binding)\n- Event burst coalescing"))).toContain("foreign line inside the Rendering pipeline section");
  });

  it("D7: an indented sub-bullet qualifier under bullet 3 goes red", () => {
    expect(docsOut(DOC.replace(BULLET_3, `${BULLET_3}\n  - Only when the host terminal supports it.`))).toContain("foreign line inside the Rendering pipeline section");
  });

  it("D8: a rewritten pipeline diagram goes red", () => {
    const out = docsOut(DOC.replace("per-provider reducer", "per-provider reducer (best effort)"));
    expect(out).toContain("pipeline diagram line dropped or rewritten");
    expect(out).toContain("foreign line inside the Rendering pipeline section");
  });

  it("D9: a deleted diagram line and a trailing paragraph after the last bullet go red", () => {
    expect(docsOut(DOC.replace("                  -> Pi TUI styled lines -> terminal line diff\n", ""))).toContain("pipeline diagram line dropped or rewritten");
    expect(docsOut(DOC.replace(LAST_BULLET, `${LAST_BULLET}\n\nThis section is advisory.`))).toContain("foreign line inside the Rendering pipeline section");
  });

  it("D3ctl: an H2 inserted inside the section ends it early and goes red naming the cut-off bullets", () => {
    expect(docsOut(DOC.replace("\n- Avoid O(allHistory)", "\n## Insert\n- Avoid O(allHistory)"))).toContain("bullet 5 dropped or rewritten");
  });

  it("D5ctl: a changed bullet value goes red naming the bullet", () => {
    expect(docsOut(DOC.replace("<=4 ordinary updates/s", "<=8 ordinary updates/s"))).toContain("bullet 1 dropped or rewritten");
  });

  it("D6ctl: a heading suffix goes red because the exact heading line is gone", () => {
    expect(docsOut(DOC.replace("## Rendering pipeline\n", "## Rendering pipeline (draft, non-binding)\n"))).toContain('exact "## Rendering pipeline" heading');
  });

  it("D10: a second Rendering pipeline heading goes red", () => {
    expect(docsOut(`${DOC}\n## Rendering pipeline\n\n- Elsewhere.\n`)).toContain('exact "## Rendering pipeline" heading');
  });

  it("controls stay green: a new H2 right after the bullets (the wb-2t2 shape), blank-line and trailing-space differences", () => {
    expect(docsOut(DOC.replace(LAST_BULLET, `${LAST_BULLET}\n\n## Cancelling a background workflow\n\nText.`))).toBe("");
    expect(docsOut(DOC.replace(BULLET_3, `${BULLET_3}   `).replace("\n- Pure layout", "\n\n- Pure layout"))).toBe("");
  });
});
