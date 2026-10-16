/**
 * wb-h8f.9: docs/11 "Acceptance journeys" census falsifier.
 *
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates": "All docs and status
 * tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass",
 * "scale benchmark pass"." and "Each major work package must have a falsifier: a negative test that
 * would fail if a critical guarantee was quietly weakened." This file binds the five docs/11
 * journey sentences to one truth label per evidence leg. It reads sources and docs statically,
 * never executes a journey, and never reports a live pass from a title's presence.
 *
 * Scanner strength (00:31Z standing program rule for a new title census): the pinned-case scanner is
 * parse-aware (string, template and regex aware comment strip; options objects; describe/suite
 * modifiers; skipIf/runIf; ctx.skip; direct-statement placement), with ONE synthetic falsifier per
 * skip mode below, plus tier-truth (every fixture pin's file is run by vitest.config.ts) and
 * docs-exactness (the docs/11 section is exactly the five bullets, the docs/14 paragraph is exact).
 * This scanner hardens itself only; the shared program-wide helper is owned by wb-u62.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_11 = "docs/workbench/11-designer-and-operator.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const VITEST_CONFIG = "vitest.config.ts";
const JOURNEYS_HEADING = "## Acceptance journeys";
const TRUTH_HEADING = "## Truth labels and release gates";

/** The docs/14 closed label set, plus the explicit "not started" row the bead allows. */
const LABELS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass", "not started"] as const;
type Label = (typeof LABELS)[number];

interface CasePin {
  readonly file: string;
  readonly title: string;
}

type Evidence =
  | { readonly kind: "cases"; readonly pins: readonly CasePin[] }
  | { readonly kind: "receipt"; readonly commandId: string }
  | { readonly kind: "artifact"; readonly file: string; readonly heading: string }
  | { readonly kind: "open"; readonly bead: string };

interface JourneyRow {
  readonly journey: number;
  readonly label: Label;
  readonly evidence: Evidence;
}

/** docs/11 "Acceptance journeys", verbatim and in document order (journey n is index n-1). */
const JOURNEY_QUOTES: readonly string[] = Object.freeze([
  "Pi reads saved script, opens inspector, executes it with Claude SDK; no Pi-owned subagent used for script agent().",
  "Pi inspects a MechanicalWorkflows ordinary function and its descriptor without executing it.",
  "Pi attaches to externally created Furnace Run, explains last-known state and observation freshness.",
  "Pi generates a source diff improving redundant task, validates it, executes reproducible comparison and cites native results.",
  "An observer-only Pi instance cannot stop the Run, even with a guessed action name.",
]);

/** The docs/14 paragraph that carries the closed label set, verbatim: pinned exactly, never by substring. */
const TRUTH_PARAGRAPH =
  'Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.';

const OPERATOR_RECEIPT_FILE = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";
const OPERATOR_RECEIPT_HEADING = "## CORRECTION (wb-h7r): the wb-a2g.3 operator receipt, contract v2";

function fixture(...pins: readonly CasePin[]): Evidence {
  return Object.freeze({ kind: "cases", pins: Object.freeze(pins.map(p => Object.freeze({ ...p }))) });
}

function receipt(commandId: string): Evidence {
  return Object.freeze({ kind: "receipt", commandId });
}

function artifact(file: string, heading: string): Evidence {
  return Object.freeze({ kind: "artifact", file, heading });
}

function open(bead: string): Evidence {
  return Object.freeze({ kind: "open", bead });
}

function row(journey: number, label: Label, evidence: Evidence): JourneyRow {
  return Object.freeze({ journey, label, evidence });
}

/**
 * One row per evidence leg. Tracking beads for OPEN rows (store status at the respin cut,
 * 2026-10-16): wb-04s blocked, wb-752.3 in_progress, wb-h8f.2 open. wb-a2g.3 is CLOSED
 * (2026-10-15T21:22Z), so journey 1 no longer carries it as an OPEN row: the operator leg is
 * labelled "code present" on the committed wb-h7r v2 operator receipt, NOT "live SDK pass" (whether
 * that receipt evidences the operator leg as a live pass is an owner reading call; requested alias
 * claude-opus-5-5, native model served openai.gpt-6.1-sol).
 */
const ROWS: readonly JourneyRow[] = Object.freeze([
  row(
    1,
    "fixture pass",
    fixture({
      file: "test/workbench-host-contract.test.ts",
      title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
    }),
  ),
  row(1, "live SDK pass", receipt("cmd_2a275dcbd6c6")),
  row(1, "code present", artifact(OPERATOR_RECEIPT_FILE, OPERATOR_RECEIPT_HEADING)),
  row(2, "not started", open("wb-04s")),
  row(
    3,
    "fixture pass",
    fixture(
      {
        file: "test/workbench-observation.test.ts",
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
      },
      {
        file: "test/workbench-furnace-observer.test.ts",
        title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
      },
    ),
  ),
  row(3, "code present", open("wb-752.3")),
  row(
    4,
    "fixture pass",
    fixture(
      {
        file: "test/workbench-patch-proposal.test.ts",
        title: "validates the candidate bytes exactly as the designer does and mirrors its status",
      },
      {
        file: "test/workbench-validate-reply.test.ts",
        title: "never executes or writes the candidate source",
      },
      {
        file: "test/workbench-designer.test.ts",
        title: "matched cohort yields measured deltas for every shared metric and states association, not causation",
      },
    ),
  ),
  row(4, "code present", open("wb-h8f.2")),
  row(
    5,
    "fixture pass",
    fixture(
      {
        file: "test/workbench-control.test.ts",
        title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
      },
      {
        file: "test/workbench-control.test.ts",
        title: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)",
      },
      {
        file: "test/workbench-native-details.test.ts",
        title: "preserves selected node on resize and closes without invoking any runtime controls",
      },
    ),
  ),
]);

const OPENERS = "([{";
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
 * Removes // and block comments. String-, template- (including ${} code) and
 * regex-literal-aware, so a comment marker inside a literal survives and a real
 * comment never does. Regex literals become a neutral token. Line breaks are preserved.
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
    // A regex literal is replaced by a neutral token: its brackets and quotes must never reach bracket or string matching.
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
      } else if (ch === "/" && (last === "" || "(,=:[!&|?{};".includes(last))) {
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

/** An options-object key that disables or focuses a case: skip, todo or only with any value but a literal false. */
const OPTION_MODIFIER = /[{,]\s*["']?(?:skip|todo|only)["']?\s*(?::(?!\s*false\b)|(?=[,}]))/;
/** A static modifier chained onto describe, suite, it or test, with or without further chain links (.concurrent.skip). */
const CHAIN_MODIFIER = /\b(?:describe|suite|it|test)(?:\s*\.\s*[A-Za-z]+)*?\s*\.\s*(?:skip|todo|only|skipIf|runIf)\b/g;
const SUITE_CALL = /\b(?:describe|suite)(?:\s*\.\s*[A-Za-z]+)*\s*\(/g;
/** A dynamic skip from inside a case body: ctx.skip(), context.skip(), t.skip(), or a destructured skip(). */
const BODY_SKIP = /\bskip\s*\(/;

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
    } else if (OPENERS.includes(ch)) {
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
  const hazards = [...stripped.matchAll(CHAIN_MODIFIER)].map(hit => hit[0].replace(SPACE, ""));
  for (const hit of stripped.matchAll(SUITE_CALL)) {
    const args = callArguments(stripped, hit.index + hit[0].length - 1);
    if (args === undefined) hazards.push(`${hit[0].trim()} with unparseable arguments`);
    else if (args.options.some(option => OPTION_MODIFIER.test(option))) hazards.push(`${hit[0].trim()} options object skip/todo/only`);
  }
  return [...new Set(hazards)];
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

function stringList(block: string, key: string): string[] | undefined {
  const hit = new RegExp(`\\b${key}\\s*:\\s*\\[`).exec(block);
  if (hit === null) return undefined;
  const open = hit.index + hit[0].length - 1;
  const close = balancedEnd(block, open);
  return [...block.slice(open, close < 0 ? block.length : close).matchAll(/"([^"]*)"|'([^']*)'/g)].map(literal => literal[1] ?? literal[2] ?? "");
}

/** Why vitest would not run `file` under the config's test.include / test.exclude, or undefined. */
function configProblem(config: string, file: string): string | undefined {
  const stripped = stripComments(config);
  const testAt = stripped.search(/\btest\s*:\s*\{/);
  if (testAt < 0) return undefined;
  const open = stripped.indexOf("{", testAt);
  const close = balancedEnd(stripped, open);
  let block = stripped.slice(open, close < 0 ? stripped.length : close + 1);
  const coverageAt = block.search(/\bcoverage\s*:\s*\{/);
  if (coverageAt >= 0) {
    const coverageClose = balancedEnd(block, block.indexOf("{", coverageAt));
    block = block.slice(0, coverageAt) + (coverageClose < 0 ? "" : block.slice(coverageClose + 1));
  }
  const include = stringList(block, "include");
  if (include !== undefined && !include.some(glob => globToRegExp(glob).test(file))) return `not matched by vitest.config.ts test.include (${include.join(", ")})`;
  const excluded = (stringList(block, "exclude") ?? []).find(glob => globToRegExp(glob).test(file));
  return excluded === undefined ? undefined : `excluded by vitest.config.ts test.exclude (${excluded})`;
}

interface CaseCall {
  /** Index of the it/test identifier. */
  readonly start: number;
  /** Index of the call's opening paren. */
  readonly open: number;
  /** The callee as spelled without whitespace: it, test, it.skip, test.fails, ... */
  readonly callee: string;
}

const CASE_CALLEE = /^(?:it|test)(?:\.[A-Za-z]+)*$/;

/** Every it()/test() call (any chain) whose first argument is the literal title, in comment-stripped source. */
function caseCalls(stripped: string, title: string): readonly CaseCall[] {
  const found: CaseCall[] = [];
  for (const quote of ['"', "'", "`"]) {
    const needle = `${quote}${title}${quote}`;
    for (let at = stripped.indexOf(needle); at >= 0; at = stripped.indexOf(needle, at + 1)) {
      let open = at - 1;
      while (open >= 0 && SPACE.test(stripped.charAt(open))) open -= 1;
      if (open < 0 || stripped.charAt(open) !== "(") continue;
      const from = Math.max(0, open - 60);
      const head = stripped.slice(from, open).trimEnd();
      const callee = /([A-Za-z_$][\w$]*(?:\s*\.\s*[A-Za-z_$][\w$]*)*)$/.exec(head)?.[1];
      if (callee === undefined) continue;
      const spelled = callee.replace(/\s/g, "");
      if (!CASE_CALLEE.test(spelled)) continue;
      found.push({ start: from + head.length - callee.length, open, callee: spelled });
    }
  }
  return found;
}

/**
 * Why a call is not a direct statement of a describe/suite callback chain (or of the file's top
 * level): conditional registration (if/for/&&/ternary/else, or a wrapper function) leaves the
 * title present in the source while vitest never registers the case. Input is comment-stripped.
 */
function placementProblem(stripped: string, start: number): string | undefined {
  let back = start - 1;
  while (back >= 0 && SPACE.test(stripped.charAt(back))) back -= 1;
  const before = back >= 0 ? stripped.charAt(back) : "";
  if (before !== "" && !";{}".includes(before)) return `follows "${before}", not a statement boundary (conditional registration)`;
  const stack: { readonly ch: string; readonly at: number }[] = [];
  for (let i = 0; i < start; i += 1) {
    const ch = stripped.charAt(i);
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(stripped, i);
    } else if (OPENERS.includes(ch)) {
      stack.push({ ch, at: i });
    } else if (ch === ")" || ch === "]" || ch === "}") {
      stack.pop();
    }
  }
  for (let k = 0; k < stack.length; k += 2) {
    const paren = stack[k];
    const brace = stack[k + 1];
    if (paren === undefined || brace === undefined || paren.ch !== "(" || brace.ch !== "{") {
      return "is not directly inside a describe/suite callback (conditional registration)";
    }
    if (!/(?:^|[^\w$.])(?:describe|suite)(?:\s*\.\s*[A-Za-z]+)*\s*$/.test(stripped.slice(0, paren.at))) {
      return "is not directly inside a describe/suite callback (conditional registration)";
    }
    const between = stripped.slice(paren.at + 1, brace.at).trim();
    if (!(between.endsWith("=>") || /\bfunction\b[^{}]*\)$/.test(between))) {
      return "sits under a block that is not a describe/suite callback (conditional registration)";
    }
  }
  return undefined;
}

/**
 * Why the pinned title is not exactly one live, unconditional, plain it()/test() case in this
 * source, or undefined. Fail-closed: any whole-file skip/todo/only/skipIf/runIf hazard fails the pin.
 */
function pinProblem(source: string, title: string): string | undefined {
  const stripped = stripComments(source);
  const notes: string[] = [];
  const hazards = fileHazards(stripped);
  if (hazards.length > 0) notes.push(`file hides cases behind ${hazards.join(", ")}`);
  const calls = caseCalls(stripped, title);
  if (calls.length === 0) notes.push("title not found (renamed, deleted or commented out)");
  else if (calls.length > 1) notes.push(`duplicated x${calls.length}`);
  else {
    const [call] = calls;
    if (call !== undefined) {
      if (call.callee !== "it" && call.callee !== "test") notes.push(`declared ${call.callee}, not a plain it()/test() call`);
      const args = callArguments(stripped, call.open);
      if (args === undefined) notes.push("case call could not be parsed");
      else if (args.options.some(option => OPTION_MODIFIER.test(option))) notes.push("case carries an options object skip/todo/only");
      else if (BODY_SKIP.test(args.text)) notes.push("case body calls skip() (dynamic skip)");
      const placement = placementProblem(stripped, call.start);
      if (placement !== undefined) notes.push(`case ${placement}`);
    }
  }
  return notes.length === 0 ? undefined : notes.join(" | ");
}

interface Reader {
  readonly exists: (relative: string) => boolean;
  readonly read: (relative: string) => string;
}

const REPO_READER: Reader = {
  exists: relative => existsSync(join(ROOT, relative)),
  read: relative => readFileSync(join(ROOT, relative), "utf8"),
};

/** The body of a level-2 section: from its heading line to the next level-2 heading (or EOF). */
function sectionBody(doc: string, heading: string): string | undefined {
  const lines = doc.split("\n");
  const start = lines.findIndex(l => l.trim() === heading);
  if (start < 0) return undefined;
  const out: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break;
    out.push(line);
  }
  return out.join("\n");
}

const COMMAND_ID = /^cmd_[0-9a-f]{12}$/;
const BEAD_ID = /^wb-[a-z0-9]+(?:\.[0-9]+)?$/;

/** The labels a row's evidence kind is allowed to carry. */
function allowedLabels(evidence: Evidence): readonly Label[] {
  if (evidence.kind === "cases") return ["fixture pass", "adversarial pass"];
  if (evidence.kind === "receipt") return ["live SDK pass"];
  if (evidence.kind === "artifact") return ["code present"];
  return ["code present", "not started"];
}

function describeRow(r: JourneyRow, quotes: readonly string[]): string {
  return `journey ${r.journey} ("${quotes[r.journey - 1] ?? "?"}") [${r.label}]`;
}

/** A receipt id must sit in a TRACEABILITY paragraph that is not itself SUPERSEDED. */
function receiptProblem(traceability: string, commandId: string): string | undefined {
  const blocks = traceability.split(/\n\s*\n/).filter(b => b.includes(commandId));
  if (blocks.length === 0) return `receipt ${commandId} is not recorded in TRACEABILITY`;
  if (blocks.every(b => /^\s*SUPERSEDED\b/.test(b))) return `receipt ${commandId} survives only inside a SUPERSEDED TRACEABILITY paragraph`;
  return undefined;
}

/** Every failure names the journey number and its quoted sentence, plus label, file and title. */
function auditRows(rows: readonly JourneyRow[], quotes: readonly string[], reader: Reader): readonly string[] {
  const failures: string[] = [];
  for (const r of rows) {
    const who = describeRow(r, quotes);
    if (!(LABELS as readonly string[]).includes(r.label)) failures.push(`${who}: label is outside the docs/14 closed set`);
    if (!allowedLabels(r.evidence).includes(r.label)) failures.push(`${who}: label does not match its ${r.evidence.kind} evidence`);
    const ev = r.evidence;
    if (ev.kind === "cases") {
      if (ev.pins.length === 0) failures.push(`${who}: fixture row has no pinned case`);
      for (const pin of ev.pins) {
        if (!reader.exists(pin.file)) {
          failures.push(`${who}: "${pin.title}" in ${pin.file}: file is missing`);
          continue;
        }
        const problem = pinProblem(reader.read(pin.file), pin.title);
        if (problem !== undefined) failures.push(`${who}: "${pin.title}" in ${pin.file}: ${problem}`);
        const tier = configProblem(reader.read(VITEST_CONFIG), pin.file);
        if (tier !== undefined) failures.push(`${who}: "${pin.title}" in ${pin.file}: ${tier}`);
      }
    } else if (ev.kind === "receipt") {
      if (!COMMAND_ID.test(ev.commandId)) failures.push(`${who}: ${ev.commandId} is not a command id`);
      else {
        const problem = receiptProblem(reader.read(TRACEABILITY), ev.commandId);
        if (problem !== undefined) failures.push(`${who}: ${problem}`);
      }
    } else if (ev.kind === "artifact") {
      if (!reader.exists(ev.file)) failures.push(`${who}: artifact ${ev.file} is missing`);
      const traceability = reader.read(TRACEABILITY);
      if (!traceability.includes(ev.file)) failures.push(`${who}: artifact ${ev.file} is not cited in TRACEABILITY`);
      if (!traceability.split("\n").some(l => l.trim() === ev.heading)) failures.push(`${who}: TRACEABILITY lost the section "${ev.heading}"`);
    } else if (!BEAD_ID.test(ev.bead)) {
      failures.push(`${who}: open row names no tracking bead (${ev.bead})`);
    }
  }
  return failures;
}

/** Every quoted journey must own at least one evidence row. */
function auditCoverage(rows: readonly JourneyRow[], quotes: readonly string[]): readonly string[] {
  const failures: string[] = [];
  for (let n = 1; n <= quotes.length; n++) {
    if (!rows.some(r => r.journey === n)) failures.push(`journey ${n} ("${quotes[n - 1] ?? "?"}"): no evidence row`);
  }
  return failures;
}

/** docs/11 must carry EXACTLY the quoted bullets; docs/14 must carry the label paragraph exactly. */
function auditDocs(docs11: string, docs14: string, quotes: readonly string[], truthParagraph: string): readonly string[] {
  const failures: string[] = [];
  const section = sectionBody(docs11, JOURNEYS_HEADING);
  if (section === undefined) failures.push(`docs/11 lost its "${JOURNEYS_HEADING}" heading`);
  else {
    const found = section
      .split("\n")
      .map(l => l.trim())
      .filter(l => l !== "");
    const wanted = quotes.map(q => `- ${q}`);
    quotes.forEach((quote, i) => {
      if (!found.includes(`- ${quote}`)) failures.push(`journey ${i + 1} ("${quote}"): sentence drifted in docs/11`);
    });
    if (failures.length === 0 && JSON.stringify(found) !== JSON.stringify(wanted)) {
      failures.push(`docs/11 acceptance section is not exactly the ${quotes.length} journey bullets (found ${found.length} lines)`);
    }
  }
  const truth = sectionBody(docs14, TRUTH_HEADING);
  if (truth === undefined) failures.push(`docs/14 lost its "${TRUTH_HEADING}" heading`);
  else if (truth.trim().split(/\n\s*\n/)[0]?.trim() !== truthParagraph) failures.push("docs/14 truth-label paragraph drifted");
  return failures;
}

function deepFrozen(rows: readonly JourneyRow[]): boolean {
  if (!Object.isFrozen(rows)) return false;
  return rows.every(r => {
    if (!Object.isFrozen(r) || !Object.isFrozen(r.evidence)) return false;
    return r.evidence.kind !== "cases" || (Object.isFrozen(r.evidence.pins) && r.evidence.pins.every(p => Object.isFrozen(p)));
  });
}

describe("docs/11 acceptance journeys census (wb-h8f.9)", () => {
  it("the table is frozen and covers exactly the five docs/11 journeys, each with at least one evidence row", () => {
    expect(deepFrozen(ROWS)).toBe(true);
    expect(Object.isFrozen(JOURNEY_QUOTES)).toBe(true);
    expect(JOURNEY_QUOTES).toHaveLength(5);
    expect([...new Set(ROWS.map(r => r.journey))].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(auditCoverage(ROWS, JOURNEY_QUOTES)).toEqual([]);
  });

  it("docs/11 carries exactly the five journey bullets and docs/14 carries the truth-label paragraph exactly", () => {
    expect(auditDocs(REPO_READER.read(DOCS_11), REPO_READER.read(DOCS_14), JOURNEY_QUOTES, TRUTH_PARAGRAPH)).toEqual([]);
  });

  for (let n = 1; n <= 5; n++) {
    it(`journey ${n}: every evidence row carries one honest label, its pinned cases are live, unconditional and run by vitest`, () => {
      const rows = ROWS.filter(r => r.journey === n);
      expect(rows.length, `journey ${n} needs a row`).toBeGreaterThan(0);
      expect(auditRows(rows, JOURNEY_QUOTES, REPO_READER)).toEqual([]);
    });
  }

  it("only a receipt-backed row carries 'live SDK pass', and every receipt id is recorded in a live TRACEABILITY paragraph", () => {
    const live = ROWS.filter(r => r.label === "live SDK pass");
    expect(live.length).toBeGreaterThan(0);
    const traceability = REPO_READER.read(TRACEABILITY);
    for (const r of live) {
      expect(r.evidence.kind, describeRow(r, JOURNEY_QUOTES)).toBe("receipt");
      if (r.evidence.kind === "receipt") expect(receiptProblem(traceability, r.evidence.commandId), describeRow(r, JOURNEY_QUOTES)).toBeUndefined();
    }
    for (const r of ROWS.filter(x => x.evidence.kind === "receipt")) expect(r.label).toBe("live SDK pass");
  });

  it("the operator leg of journey 1 stays 'code present' on the committed receipt artifact (never a live pass without an owner ruling)", () => {
    const operator = ROWS.filter(r => r.evidence.kind === "artifact");
    expect(operator.map(r => [r.journey, r.label])).toEqual([[1, "code present"]]);
  });

  it("open rows name their tracking bead and never carry a pass label", () => {
    const openRows = ROWS.filter(r => r.evidence.kind === "open");
    expect(openRows.map(r => (r.evidence.kind === "open" ? r.evidence.bead : ""))).toEqual(["wb-04s", "wb-752.3", "wb-h8f.2"]);
    for (const r of openRows) expect(["code present", "not started"]).toContain(r.label);
  });
});

/** The nine real pins as [row, pin] pairs, for the per-pin mutant matrix. */
const REAL_PINS: readonly { readonly row: JourneyRow; readonly pin: CasePin }[] = ROWS.flatMap(r =>
  r.evidence.kind === "cases" ? r.evidence.pins.map(pin => ({ row: r, pin })) : [],
);

/** Applies a one-point mutation to the raw source of a real pinned file. */
function mutateCase(source: string, title: string, mode: "rename" | "delete" | "skip"): string {
  const needle = ["\"", "'", "`"].map(q => `${q}${title}${q}`).find(n => source.includes(n));
  if (needle === undefined) return source;
  const at = source.indexOf(needle);
  let paren = at - 1;
  while (paren >= 0 && SPACE.test(source.charAt(paren))) paren -= 1;
  if (mode === "rename") return `${source.slice(0, at)}${needle.charAt(0)}${title} (renamed)${needle.charAt(0)}${source.slice(at + needle.length)}`;
  if (mode === "skip") return `${source.slice(0, paren)}.skip${source.slice(paren)}`;
  const end = balancedEnd(source, paren);
  const head = source.slice(0, paren).replace(/[\w$.]+\s*$/, "");
  return `${head}${source.slice(end + 1).replace(/^;/, "")}`;
}

describe("journey census per-pin mutants (rename, delete, .skip on every real pin)", () => {
  const readerWith = (file: string, mutated: string): Reader => ({
    exists: REPO_READER.exists,
    read: relative => (relative === file ? mutated : REPO_READER.read(relative)),
  });

  for (const { row: r, pin } of REAL_PINS) {
    for (const mode of ["rename", "delete", "skip"] as const) {
      it(`journey ${r.journey} ${mode} mutant of "${pin.title.slice(0, 48)}" in ${pin.file} fails naming journey, sentence, label, title and file`, () => {
        const original = REPO_READER.read(pin.file);
        const mutated = mutateCase(original, pin.title, mode);
        expect(mutated, "the mutation must change the file").not.toBe(original);
        const failures = auditRows([r], JOURNEY_QUOTES, readerWith(pin.file, mutated));
        expect(failures.length).toBeGreaterThan(0);
        const first = failures.find(f => f.includes(`"${pin.title}" in ${pin.file}`));
        expect(first, failures.join("\n")).toBeDefined();
        expect(first).toContain(`journey ${r.journey} ("${JOURNEY_QUOTES[r.journey - 1]}") [${r.label}]`);
      });
    }
  }
});

describe("journey census falsifiers (one mutant per failure mode)", () => {
  const TITLE = "keeps the journey case";
  const FILE = "test/a.test.ts";
  const lines = (...rows: string[]): string => rows.join("\n");
  const HEALTHY = lines('import { describe, expect, it } from "vitest";', 'describe("group", () => {', `  it("${TITLE}", () => {`, "    expect(1).toBe(1);", "  });", "});");
  const CONFIG = 'export default { test: { include: ["test/**/*.test.ts"], exclude: ["test/other.test.ts"], coverage: { include: ["src/**/*.ts"] } } };';
  const BASE: ReadonlyMap<string, string> = new Map([
    [FILE, HEALTHY],
    [VITEST_CONFIG, CONFIG],
    [TRACEABILITY, "receipt cmd_aaaaaaaaaaaa recorded"],
  ]);
  const QUOTES = ["first sentence", "second sentence"];
  const reader = (sources: ReadonlyMap<string, string>): Reader => ({
    exists: relative => sources.has(relative),
    read: relative => sources.get(relative) ?? "",
  });
  const CASE_ROW = row(1, "fixture pass", fixture({ file: FILE, title: TITLE }));
  const OTHER = row(2, "not started", open("wb-04s"));
  const withFile = (source: string): ReadonlyMap<string, string> => new Map(BASE).set(FILE, source);
  const failuresFor = (source: string): readonly string[] => auditRows([CASE_ROW, OTHER], QUOTES, reader(withFile(source)));

  it("baseline: a healthy two-journey table audits clean (no false positive)", () => {
    expect(auditRows([CASE_ROW, OTHER], QUOTES, reader(BASE))).toEqual([]);
  });

  it("comment markers inside strings, templates and regexes do not hide a real case", () => {
    const source = lines('const url = "http://example.test/a";', "const glob = `src/**/*.ts // not a comment`;", "const rx = /a\\/\\/b/;", `it("${TITLE}", () => {});`);
    expect(failuresFor(source)).toEqual([]);
  });

  it("rename mutant: a renamed case fails naming the journey number, sentence, file and title", () => {
    const failures = failuresFor(HEALTHY.replace(TITLE, "keeps the case"));
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('journey 1 ("first sentence") [fixture pass]');
    expect(failures[0]).toContain(`"${TITLE}" in ${FILE}`);
    expect(failures[0]).toContain("not found");
  });

  it("delete mutant: a removed file fails naming the journey", () => {
    const sources = new Map(BASE);
    sources.delete(FILE);
    const failures = auditRows([CASE_ROW, OTHER], QUOTES, reader(sources));
    expect(failures[0]).toContain('journey 1 ("first sentence")');
    expect(failures[0]).toContain("file is missing");
  });

  it("duplicate mutant: a second identical title fails as duplicated", () => {
    expect(failuresFor(lines(HEALTHY, `it("${TITLE}", () => {});`))[0]).toContain("duplicated x2");
  });

  /** One synthetic falsifier per skip mode: each must go red naming the journey, file and title. */
  const MODES: readonly { readonly id: string; readonly why: RegExp; readonly source: string }[] = [
    { id: "S1 line-commented case", why: /not found/, source: lines('// describe("group", () => {', `//   it("${TITLE}", () => {});`, "// });") },
    { id: "S2 block-commented case", why: /not found/, source: lines("/*", `it("${TITLE}", () => {});`, "*/") },
    { id: "S4 options skip on the case", why: /options object/, source: `it("${TITLE}", { skip: true }, () => {});` },
    { id: "S4t options todo on the case", why: /options object/, source: `it("${TITLE}", { todo: true }, () => {});` },
    { id: "S4o options only on the case", why: /options object/, source: `it("${TITLE}", () => {}, { only: true });` },
    { id: "S4c computed options skip on the case", why: /options object/, source: `it("${TITLE}", { skip: process.env.CI === "1" }, () => {});` },
    { id: "S10 options skip on the enclosing describe", why: /options object skip/, source: lines('describe("group", { skip: true }, () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "S10t options todo on the enclosing suite", why: /options object skip/, source: lines('suite("group", { todo: true }, () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "G11 describe.skip", why: /describe\.skip/, source: lines('describe.skip("group", () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "G11c describe.concurrent.skip", why: /describe\.concurrent\.skip/, source: lines('describe.concurrent.skip("group", () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "G11t describe.todo", why: /describe\.todo/, source: lines('describe.todo("group", () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "S3 describe.skipIf", why: /describe\.skipIf/, source: lines('describe.skipIf(true)("group", () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "S3r describe.runIf", why: /describe\.runIf/, source: lines('describe.runIf(false)("group", () => {', `  it("${TITLE}", () => {});`, "});") },
    { id: "S3i it.skipIf on a sibling", why: /it\.skipIf/, source: lines(HEALTHY, 'it.skipIf(true)("sibling", () => {});') },
    { id: "S5 ctx.skip() in the body", why: /dynamic skip/, source: `it("${TITLE}", ctx => { ctx.skip(); });` },
    { id: "S5d destructured skip() in the body", why: /dynamic skip/, source: `it("${TITLE}", ({ skip }) => { skip(); });` },
    { id: "COND if-wrapped registration", why: /conditional registration/, source: lines("if (process.env.RUN_JOURNEYS) {", `  it("${TITLE}", () => {});`, "}") },
    { id: "COND2 && registration", why: /conditional registration/, source: `process.env.RUN_JOURNEYS && it("${TITLE}", () => {});` },
    { id: "COND3 unbraced if registration", why: /conditional registration/, source: lines("if (process.env.RUN_JOURNEYS)", `  it("${TITLE}", () => {});`) },
    { id: "COND4 loop-wrapped registration", why: /conditional registration/, source: lines("for (const n of []) {", `  it("${TITLE}", () => {});`, "}") },
    { id: "COND5 if-wrapped inside a describe", why: /conditional registration/, source: lines('describe("group", () => {', "  if (process.env.RUN_JOURNEYS) {", `    it("${TITLE}", () => {});`, "  }", "});") },
    { id: "G12 stray .only on a sibling", why: /it\.only/, source: lines(HEALTHY, `${["it", "only"].join(".")}("sibling", () => {});`) },
    { id: "G13 it.skip on the case", why: /it\.skip/, source: `it.skip("${TITLE}", () => {});` },
    { id: "G13t it.todo on the case", why: /it\.todo/, source: `it.todo("${TITLE}");` },
    { id: "G13f it.fails on the case", why: /it\.fails/, source: `it.fails("${TITLE}", () => {});` },
  ];

  it.each(MODES)("skip mode $id fails naming the journey, file and title", ({ source, why }) => {
    const failures = failuresFor(source);
    expect(failures.length).toBeGreaterThan(0);
    const named = failures.find(f => f.includes(`"${TITLE}" in ${FILE}`) && f.includes('journey 1 ("first sentence")'));
    expect(named, failures.join("\n")).toBeDefined();
    expect(named).toMatch(why);
  });

  it("T1 tier truth: a pinned file excluded from, or never matched by, vitest test.include fails the pin", () => {
    const excluded = new Map(BASE).set(VITEST_CONFIG, `export default { test: { include: ["test/**/*.test.ts"], exclude: ["${FILE}"] } };`);
    expect(auditRows([CASE_ROW], QUOTES, reader(excluded))[0]).toContain("excluded by vitest.config.ts test.exclude");
    const globbed = new Map(BASE).set(VITEST_CONFIG, 'export default { test: { include: ["test/**/*.test.ts"], exclude: ["test/*.test.ts"] } };');
    expect(auditRows([CASE_ROW], QUOTES, reader(globbed))[0]).toContain("excluded by vitest.config.ts test.exclude");
    const unmatched = new Map(BASE).set(VITEST_CONFIG, 'export default { test: { include: ["src/**/*.test.ts"] } };');
    expect(auditRows([CASE_ROW], QUOTES, reader(unmatched))[0]).toContain("not matched by vitest.config.ts test.include");
    const commented = new Map(BASE).set(VITEST_CONFIG, `export default { test: { include: ["test/**/*.test.ts"], /* exclude: ["${FILE}"], */ } };`);
    expect(auditRows([CASE_ROW], QUOTES, reader(commented))).toEqual([]);
  });

  it("fabricated-receipt mutant: a command id absent from TRACEABILITY fails the live row", () => {
    const fabricated = row(1, "live SDK pass", receipt("cmd_bbbbbbbbbbbb"));
    const failures = auditRows([CASE_ROW, fabricated, OTHER], QUOTES, reader(BASE));
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain("cmd_bbbbbbbbbbbb is not recorded in TRACEABILITY");
  });

  it("superseded-receipt mutant: a command id that survives only in a SUPERSEDED paragraph fails the live row", () => {
    const sources = new Map(BASE).set(TRACEABILITY, "## Section\n\nSUPERSEDED (wb-h7r): the claims of cmd_aaaaaaaaaaaa were unevidenced.\n\nOther paragraph.");
    const failures = auditRows([row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa"))], QUOTES, reader(sources));
    expect(failures[0]).toContain("SUPERSEDED");
    const live = new Map(BASE).set(TRACEABILITY, "SUPERSEDED (x): cmd_aaaaaaaaaaaa old.\n\nRe-proof of cmd_aaaaaaaaaaaa stands.");
    expect(auditRows([row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa"))], QUOTES, reader(live))).toEqual([]);
  });

  it("artifact mutant: a missing receipt file or a lost TRACEABILITY section fails the operator row", () => {
    const heading = "## CORRECTION (x): the receipt";
    const artifactRow = row(1, "code present", artifact("qa/receipt.json", heading));
    const healthy = new Map(BASE).set("qa/receipt.json", "{}").set(TRACEABILITY, `${heading}\n\ncited qa/receipt.json here`);
    expect(auditRows([artifactRow], QUOTES, reader(healthy))).toEqual([]);
    const noFile = new Map(healthy);
    noFile.delete("qa/receipt.json");
    expect(auditRows([artifactRow], QUOTES, reader(noFile))[0]).toContain("is missing");
    const noHeading = new Map(healthy).set(TRACEABILITY, "cited qa/receipt.json here");
    expect(auditRows([artifactRow], QUOTES, reader(noHeading))[0]).toContain("lost the section");
    expect(auditRows([row(1, "live SDK pass", artifact("qa/receipt.json", heading))], QUOTES, reader(healthy))[0]).toContain("label does not match its artifact evidence");
  });

  it("unbacked-live mutant: 'live SDK pass' on an open row or a case row fails the label check", () => {
    const failures = auditRows([row(1, "live SDK pass", open("wb-a2g.3")), row(2, "live SDK pass", fixture({ file: FILE, title: TITLE }))], QUOTES, reader(BASE));
    expect(failures.filter(f => f.includes("label does not match"))).toHaveLength(2);
  });

  it("pass-label-on-open mutant: an open row carrying 'fixture pass' fails", () => {
    expect(auditRows([CASE_ROW, row(2, "fixture pass", open("wb-04s"))], QUOTES, reader(BASE))[0]).toContain("label does not match its open evidence");
  });

  it("unknown-label mutant: a label outside the docs/14 closed set fails", () => {
    const bogus = Object.freeze({ journey: 2, label: "mostly works" as Label, evidence: open("wb-04s") });
    expect(auditRows([CASE_ROW, bogus], QUOTES, reader(BASE)).some(f => f.includes("outside the docs/14 closed set"))).toBe(true);
  });

  it("bead mutant: an open row without a bead id fails", () => {
    expect(auditRows([CASE_ROW, row(2, "not started", open("soon"))], QUOTES, reader(BASE))[0]).toContain("names no tracking bead");
  });

  it("coverage mutant: a journey with no row fails naming its sentence", () => {
    expect(auditCoverage([CASE_ROW], QUOTES)).toEqual(['journey 2 ("second sentence"): no evidence row']);
  });

  const PARA = "Label paragraph. Falsifier sentence.";
  const docs11 = (...bullets: string[]): string => ["# 11", "", "## Acceptance journeys", "", ...bullets, "## Next section"].join("\n");
  const docs14 = (body: string): string => ["# 14", "", "## Truth labels and release gates", "", body, "", "Another paragraph.", "## Tail"].join("\n");

  it("docs drift mutant: an edited journey sentence or heading fails", () => {
    expect(auditDocs(docs11("- first sentence", "- second sentence"), docs14(PARA), QUOTES, PARA)).toEqual([]);
    expect(auditDocs(docs11("- first sentence", "- second sentence changed"), docs14(PARA), QUOTES, PARA)).toEqual(['journey 2 ("second sentence"): sentence drifted in docs/11']);
    expect(auditDocs("# 11\n\nno section\n", docs14(PARA), QUOTES, PARA)).toEqual(['docs/11 lost its "## Acceptance journeys" heading']);
  });

  it("D1 docs exactness: a sixth weakening bullet, a reorder or a stray line in the docs/11 section fails", () => {
    const sixth = auditDocs(docs11("- first sentence", "- second sentence", "- Journeys 2-4 are aspirational and are not release gates."), docs14(PARA), QUOTES, PARA);
    expect(sixth).toHaveLength(1);
    expect(sixth[0]).toContain("not exactly the 2 journey bullets");
    expect(auditDocs(docs11("- second sentence", "- first sentence"), docs14(PARA), QUOTES, PARA)[0]).toContain("not exactly");
    expect(auditDocs(docs11("- first sentence", "<!-- advisory -->", "- second sentence"), docs14(PARA), QUOTES, PARA)[0]).toContain("not exactly");
  });

  it("D2 docs exactness: a sentence appended to, or substituted in, the docs/14 truth-label paragraph fails", () => {
    expect(auditDocs(docs11("- first sentence", "- second sentence"), docs14(`${PARA} These labels are advisory and may be omitted.`), QUOTES, PARA)).toEqual(["docs/14 truth-label paragraph drifted"]);
    expect(auditDocs(docs11("- first sentence", "- second sentence"), docs14(PARA.replace("Label", "Lab")), QUOTES, PARA)).toEqual(["docs/14 truth-label paragraph drifted"]);
    expect(auditDocs(docs11("- first sentence", "- second sentence"), "# 14\n\nnone\n", QUOTES, PARA)).toEqual(['docs/14 lost its "## Truth labels and release gates" heading']);
  });

  it("thaw mutant: an unfrozen table or row is detected", () => {
    expect(deepFrozen([...ROWS])).toBe(false);
    expect(deepFrozen([{ ...ROWS[0], journey: 1 } as JourneyRow])).toBe(false);
  });
});
