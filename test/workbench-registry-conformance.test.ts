/**
 * wb-6hb.6 (W06 / VC-2): docs/workbench/06 "Conformance tests" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a falsifier:
 * a negative test that would fail if a critical guarantee was quietly weakened." The five bullets of
 * docs/workbench/06-capability-registry.md "Conformance tests" are embodied by existing cases, but
 * nothing bound the sentences to them. This census freezes that binding: a rename, deletion or
 * disabling of a pinned case, or a docs edit that drops or rewrites a bullet, goes red naming the
 * bullet, file and title.
 *
 * It only READS the pinned files as text. It never executes the pinned cases and never claims a live,
 * native or scale pass from a title's presence: a title's presence proves a case is still named and
 * enabled, nothing more. Bullets (or halves of bullets) with no existing case are recorded as
 * 'partial' or 'unpinned' with a reason and are never counted as passed.
 *
 * Scanner strength (respin, gate U1): the pinned file is first MASKED (comments and the contents of
 * string, template and regex literals blanked; length and line structure preserved), so a commented-out
 * case is absent and a double slash inside a template literal is not a comment. On the masked text a pin
 * is refused when its case has a disabling modifier (skip, todo, fails, only, skipIf, runIf), carries an
 * options object { skip | todo | only | fails } (on the case or on an enclosing describe/suite), calls
 * skip() in its body, or is registered conditionally (if/else, logical operator, ternary). A describe or
 * suite skip, todo, fails, only, skipIf or runIf anywhere in a pinned file fails EVERY pin in that file by
 * name (fail-closed). Tier truth (folds O1/O2): every pin carries its own tier, checked against the default
 * vitest exclude list, and every live-tier pin file must be in the native config include.
 * Limitation (stated, not hidden): this is a static text census, not a reporter run; a skip routed through
 * a variable options object or through a helper that wraps the case registration is not seen.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_FILE = "docs/workbench/06-capability-registry.md";
const VITEST_CONFIG = "vitest.config.ts";
const NATIVE_CONFIG = "vitest.native.config.ts";

type Tier = "default-gate" | "live-tier";
type Status = "pinned" | "partial" | "unpinned";

interface Pin {
  readonly file: string;
  readonly title: string;
  /** 'live-tier' when this pin's file is excluded from the default vitest gate (it runs only in the native tier). */
  readonly tier: Tier;
}

interface ConformanceRow {
  readonly bullet: number;
  /** The docs/06 bullet, verbatim (without the list marker). */
  readonly quote: string;
  /** 'live-tier' when any pin is live-tier (derived from the per-pin tiers). */
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  readonly status: Status;
  /** Required for 'partial' and 'unpinned': names the unbound half and the owning bead where one exists. */
  readonly reason?: string;
}

const gate = (file: string, title: string): Pin => ({ file, title, tier: "default-gate" });
const live = (file: string, title: string): Pin => ({ file, title, tier: "live-tier" });

const ROWS: readonly ConformanceRow[] = Object.freeze([
  {
    bullet: 1,
    quote: "Same capability in workflow node() and Pi invocation uses identical authorization and input contracts.",
    tier: "default-gate",
    status: "partial",
    reason:
      "cross-surface parity (one capability through node() and through Pi invocation, identical contracts) is the wb-6hb.4 falsifier (in flight, not on trunk); these pins bind each surface's authorization and input boundary separately, not their equality",
    pins: [
      gate("test/workbench-node-contract.test.ts", "L4: unauthorized invocation denied at host even with known capability id"),
      gate("test/workbench-registry-auth.test.ts", "copies caller grants before asynchronous dispatch and never escalates another caller"),
      gate("test/workbench-registry-auth.test.ts", "closes the script-side raw RPC vehicle while host authorization stays typed"),
      gate("test/workbench-security-workflow.test.ts", "node() refuses grant/identity options before dispatching to a host capability"),
    ],
  },
  {
    bullet: 2,
    quote: "Read-only agent cannot invoke write capability even if it knows ID.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      gate("test/workbench-registry-auth.test.ts", "discovery alone exposes detached metadata but cannot invoke or inspect"),
      gate("test/workbench-registry-auth.test.ts", "permission-free providers still require an explicit invocation grant"),
      gate("test/workbench-security-capability.test.ts", "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused"),
      gate("test/workbench-node-contract.test.ts", "L4: unauthorized invocation denied at host even with known capability id"),
    ],
  },
  {
    bullet: 3,
    quote: "Missing native SDK/provider is explicit error, not silent CLI fallback.",
    tier: "live-tier",
    status: "partial",
    reason:
      "the explicit-error half is pinned; the ecosystem-native pin is the LIVE-TIER one (its file is excluded from the default gate and runs only in the native tier) and the furnace-hosted pin is default-gate; the no-silent-CLI-fallback falsifier itself is wb-cax.5 (in flight, not on trunk), so that half is unpinned",
    pins: [
      live("test/workbench-ecosystem-native.test.ts", "Furnace inspect preserves a missing Run as a typed unavailable refusal"),
      gate("test/workbench-furnace-hosted.test.ts", "refuses to start when the SDK cannot decode execution contexts, before any socket, client or Run exists"),
    ],
  },
  {
    bullet: 4,
    quote: "Unknown effects never auto-retry after disconnect.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      gate("test/workbench-node-contract.test.ts", "L4: effectful invocation with lost response is reported uncertain, never automatically retried"),
      gate("test/workbench-claude-capability-tools.test.ts", "explicit effectful fixture retains uncertain-effect on oversized output and never retries"),
      gate("test/workbench-furnace-control.test.ts", "stops waiting at the bound, discards the late answer and never re-issues the verb"),
      gate("test/workbench-detached-faults-receipt.test.ts", "requires the unknown inspection to carry source, observation and a never-retry reconcile hint"),
    ],
  },
  {
    bullet: 5,
    quote:
      "Registry provider hot change does not silently alter a running pinned execution. Version/digest mismatch must fail or explicitly begin new invocation.",
    tier: "default-gate",
    status: "partial",
    reason:
      "the version/digest-mismatch-must-fail half is pinned; the hot change of a RUNNING pinned execution half has no case at this base (grep for hot change / pinned execution over test/ finds none): W06 wb-4ax scope, unpinned",
    pins: [
      gate("test/workbench-validate-reply.test.ts", "a digest mismatch is its own typed refusal, never a warning, and the core never runs"),
      gate("test/workbench-patch-proposal.test.ts", "pins the experiment to source digests and refuses a base that does not match its bytes first"),
      gate("test/workbench-identity.test.ts", "rejects lockfile changes, missing artifact and lockfile/manifest mismatch"),
    ],
  },
]);

type FileReader = (file: string) => string;
const readRepoFile: FileReader = (file) => readFileSync(join(ROOT, file), "utf8");

// ---- source masking: comments and literal contents blanked, indices and line structure preserved ----

interface Masked {
  /** Same length and newline positions as the source; comment text and literal contents are spaces. */
  readonly code: string;
  /** Index of every string/template literal's opening quote -> index of its closing quote. */
  readonly closeOf: ReadonlyMap<number, number>;
}

const REGEX_PRECEDERS = "(,=:[!&|?{};+-*%<>~^";
const REGEX_KEYWORDS: readonly string[] = ["return", "typeof", "case", "else", "do", "void", "delete", "in", "of"];

function maskSource(source: string): Masked {
  const out = source.split("");
  const length = source.length;
  const closeOf = new Map<number, number>();
  const pending: { readonly open: number; readonly depth: number }[] = [];
  let depth = 0;
  let prev = "";
  let word = "";
  let i = 0;

  const blank = (from: number, to: number): void => {
    for (let k = from; k < to; k += 1) if (out[k] !== "\n") out[k] = " ";
  };

  const template = (open: number, from: number): void => {
    let j = from;
    while (j < length) {
      const c = source[j];
      if (c === "\\") {
        j += 2;
        continue;
      }
      if (c === "`") {
        closeOf.set(open, j);
        blank(from, j);
        i = j + 1;
        prev = "`";
        return;
      }
      if (c === "$" && source[j + 1] === "{") {
        blank(from, j);
        pending.push({ open, depth });
        i = j + 2;
        prev = "{";
        return;
      }
      j += 1;
    }
    blank(from, length);
    i = length;
  };

  while (i < length) {
    const c = source[i] ?? "";
    const next = source[i + 1];
    if (c === "/" && next === "/") {
      const eol = source.indexOf("\n", i);
      const end = eol === -1 ? length : eol;
      blank(i, end);
      i = end;
      continue;
    }
    if (c === "/" && next === "*") {
      const close = source.indexOf("*/", i + 2);
      const end = close === -1 ? length : close + 2;
      blank(i, end);
      i = end;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < length && source[j] !== c && source[j] !== "\n") j += source[j] === "\\" ? 2 : 1;
      const end = Math.min(j, length);
      blank(i + 1, end);
      if (source[end] === c) {
        closeOf.set(i, end);
        i = end + 1;
      } else {
        i = end;
      }
      prev = c;
      continue;
    }
    if (c === "`") {
      template(i, i + 1);
      continue;
    }
    if (c === "/") {
      const regexAllowed = prev === "" || REGEX_PRECEDERS.includes(prev) || (prev === "a" && REGEX_KEYWORDS.includes(word));
      if (regexAllowed) {
        let j = i + 1;
        let inClass = false;
        while (j < length && source[j] !== "\n") {
          const rc = source[j];
          if (rc === "\\") {
            j += 2;
            continue;
          }
          if (rc === "[") inClass = true;
          else if (rc === "]") inClass = false;
          else if (rc === "/" && !inClass) break;
          j += 1;
        }
        if (source[j] === "/") {
          blank(i + 1, j);
          i = j + 1;
          prev = "a";
          continue;
        }
      }
      prev = "/";
      i += 1;
      continue;
    }
    if (/\s/.test(c)) {
      i += 1;
      continue;
    }
    if (/[A-Za-z0-9_$]/.test(c)) {
      let j = i + 1;
      while (j < length && /[A-Za-z0-9_$]/.test(source[j] ?? "")) j += 1;
      word = source.slice(i, j);
      prev = "a";
      i = j;
      continue;
    }
    if (c === "{") depth += 1;
    if (c === "}") {
      const top = pending[pending.length - 1];
      if (top !== undefined && top.depth === depth) {
        pending.pop();
        template(top.open, i + 1);
        continue;
      }
      depth = Math.max(0, depth - 1);
    }
    prev = c;
    i += 1;
  }
  return { code: out.join(""), closeOf };
}

/** Index of the bracket that closes the one at `open` (all three bracket kinds), or -1. */
function matchClose(code: string, open: number): number {
  let depth = 0;
  for (let k = open; k < code.length; k += 1) {
    const c = code[k] ?? "";
    if ("([{".includes(c)) depth += 1;
    else if (")]}".includes(c)) {
      depth -= 1;
      if (depth === 0) return k;
    }
  }
  return -1;
}

/** The comma-separated top-level arguments between a call's open and close parenthesis. */
function topLevelArgs(code: string, open: number, close: number): string[] {
  const args: string[] = [];
  let depth = 0;
  let start = open + 1;
  for (let k = open + 1; k < close; k += 1) {
    const c = code[k] ?? "";
    if ("([{".includes(c)) depth += 1;
    else if (")]}".includes(c)) depth -= 1;
    else if (c === "," && depth === 0) {
      args.push(code.slice(start, k));
      start = k + 1;
    }
  }
  args.push(code.slice(start, close));
  return args;
}

// ---- pure census core (exercised against the real files and against in-memory mutants) ----

const DISABLING = ["skip", "todo", "fails", "only"] as const;
/** Case-level modifiers that stop a case from running as written. */
const CASE_DISABLERS: readonly string[] = [...DISABLING, "skipIf", "runIf"];
const CASE_HEAD = /(?<![\w$.])(it|test)((?:\s*\.\s*[A-Za-z]+(?:\s*\([^()]*\))?)*)\s*\(\s*(["'`])/g;
const DESCRIBE_HEAD = /(?<![\w$.])(?:describe|suite)((?:\s*\.\s*[A-Za-z]+(?:\s*\([^()]*\))?)*)\s*\(/g;
const DISABLED_DESCRIBE = /(?<![\w$.])(?:describe|suite)\s*\.\s*(?:[A-Za-z]+(?:\s*\([^()]*\))?\s*\.\s*)*(?:skip|todo|fails|only|skipIf|runIf)\b/;
const OPTION_DISABLER = /\b(skip|todo|only|fails)\b\s*(?::(?!\s*false\b)|[,}])/;
const BODY_SKIP = /\.\s*skip\b|\bskip\s*\(/;
const CONDITIONAL_PREFIX = /\b(?:if|else|while|do|switch)\b|&&|\|\||\?/;

interface CaseHit {
  readonly modifiers: readonly string[];
  /** Index of the first character of the callee ("it" or "test"). */
  readonly calleeStart: number;
  /** Index just after the callee name, where a modifier would be spliced. */
  readonly calleeEnd: number;
  /** Index of the call's opening parenthesis. */
  readonly callOpen: number;
  /** Index of the first character of the title literal. */
  readonly titleStart: number;
}

function findCases(masked: Masked, source: string, title: string): CaseHit[] {
  const hits: CaseHit[] = [];
  for (const match of masked.code.matchAll(CASE_HEAD)) {
    const quoteIndex = match.index + match[0].length - 1;
    const close = masked.closeOf.get(quoteIndex);
    if (close === undefined || source.slice(quoteIndex + 1, close) !== title) continue;
    const modifiers = [...(match[2] ?? "").matchAll(/\.\s*([A-Za-z]+)(?:\s*\([^()]*\))?/g)].map((part) => part[1] ?? "");
    hits.push({
      modifiers,
      calleeStart: match.index,
      calleeEnd: match.index + (match[1] ?? "").length,
      callOpen: match.index + match[0].lastIndexOf("("),
      titleStart: quoteIndex + 1,
    });
  }
  return hits;
}

/** The disabling key of an options-object argument ({ skip: true }, { todo }, ...), if any argument carries one. */
function optionsDisabler(args: readonly string[]): string | undefined {
  for (const arg of args.slice(1)) {
    const text = arg.trim();
    if (!text.startsWith("{")) continue;
    const found = OPTION_DISABLER.exec(text);
    if (found !== null) return found[1];
  }
  return undefined;
}

/** True when the registration at `at` sits behind an if/else/while, a logical operator or a ternary. */
function conditionalRegistration(code: string, at: number): boolean {
  const boundary = Math.max(code.lastIndexOf(";", at - 1), code.lastIndexOf("{", at - 1), code.lastIndexOf("}", at - 1));
  if (CONDITIONAL_PREFIX.test(code.slice(boundary + 1, at))) return true;
  for (const found of code.matchAll(/\b(?:if|while)\s*\(/g)) {
    const condClose = matchClose(code, found.index + found[0].length - 1);
    if (condClose === -1) continue;
    let bodyStart = condClose + 1;
    while (/\s/.test(code[bodyStart] ?? "")) bodyStart += 1;
    const bodyEnd = code[bodyStart] === "{" ? matchClose(code, bodyStart) : code.indexOf(";", bodyStart);
    if (bodyEnd !== -1 && at > bodyStart && at < bodyEnd) return true;
  }
  for (const found of code.matchAll(/\belse\b\s*\{/g)) {
    const open = found.index + found[0].length - 1;
    const close = matchClose(code, open);
    if (close !== -1 && at > open && at < close) return true;
  }
  return false;
}

/** The disabling option of a describe/suite call whose callback encloses `at`, if any. */
function enclosingDescribeDisabler(code: string, at: number): string | undefined {
  for (const found of code.matchAll(DESCRIBE_HEAD)) {
    const open = found.index + found[0].length - 1;
    const close = matchClose(code, open);
    if (close === -1 || at < open || at > close) continue;
    const flag = optionsDisabler(topLevelArgs(code, open, close));
    if (flag !== undefined) return flag;
  }
  return undefined;
}

/** Why a pin no longer binds, or undefined when it still names exactly one enabled case. */
function pinProblem(source: string, title: string): string | undefined {
  const masked = maskSource(source);
  const hits = findCases(masked, source, title);
  if (hits.length === 0) return "title is absent (renamed, deleted or commented out)";
  if (hits.length > 1) return `title occurs ${hits.length} times (must be exactly once)`;
  const hit = hits[0];
  if (hit === undefined) return "title is absent (renamed, deleted or commented out)";
  const disabled = hit.modifiers.filter((modifier) => CASE_DISABLERS.includes(modifier));
  if (disabled.length > 0) return `case is disabled by .${disabled.join(".")}`;
  const close = matchClose(masked.code, hit.callOpen);
  if (close === -1) return "case call is unbalanced and cannot be parsed";
  const option = optionsDisabler(topLevelArgs(masked.code, hit.callOpen, close));
  if (option !== undefined) return `case is disabled by the options object { ${option} }`;
  if (BODY_SKIP.test(masked.code.slice(hit.callOpen, close + 1))) return "case body calls skip() (runtime skip)";
  if (conditionalRegistration(masked.code, hit.calleeStart)) return "case registration is conditional (if/else, logical operator or ternary)";
  if (DISABLED_DESCRIBE.test(masked.code)) return "pinned file contains a describe.skip/todo/fails/only/skipIf/runIf (or the suite.* form), which can disable any pin";
  const enclosing = enclosingDescribeDisabler(masked.code, hit.calleeStart);
  if (enclosing !== undefined) return `an enclosing describe/suite is disabled by the options object { ${enclosing} }`;
  return undefined;
}

function rowProblems(row: ConformanceRow, read: FileReader): string[] {
  return row.pins.flatMap((pin) => {
    const problem = pinProblem(read(pin.file), pin.title);
    return problem === undefined ? [] : [`bullet ${row.bullet}: ${pin.file} :: "${pin.title}" -> ${problem}`];
  });
}

function docsProblems(docs: string, rows: readonly ConformanceRow[]): string[] {
  const problems: string[] = [];
  const section = docs.split(/^## Conformance tests\s*$/m)[1]?.split(/^## /m)[0];
  if (section === undefined) return ['docs/06 section "## Conformance tests" is missing'];
  const bullets = section
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
  for (const row of rows) {
    if (!bullets.includes(row.quote)) problems.push(`bullet ${row.bullet}: docs/06 no longer carries this bullet verbatim: "${row.quote}"`);
  }
  if (bullets.length !== rows.length) problems.push(`docs/06 lists ${bullets.length} conformance bullets, the census binds ${rows.length}`);
  return problems;
}

/** Entries of the first `exclude: [...]` array (the test-level default-gate exclusions) in a vitest config. */
function excludedFiles(config: string): string[] {
  const list = /exclude:\s*\[([^\]]*)\]/.exec(config)?.[1] ?? "";
  return [...list.matchAll(/"([^"]+)"/g)].map((entry) => entry[1] ?? "");
}

/** Entries of the first `include: [...]` array in a vitest config. */
function includedFiles(config: string): string[] {
  const list = /include:\s*\[([^\]]*)\]/.exec(config)?.[1] ?? "";
  return [...list.matchAll(/"([^"]+)"/g)].map((entry) => entry[1] ?? "");
}

/** Tier truth per pin and per row, plus: a live-tier pin file must be in the native config include (it would never run otherwise). */
function tierProblems(rows: readonly ConformanceRow[], defaultConfig: string, nativeConfig: string): string[] {
  const excluded = new Set(excludedFiles(defaultConfig));
  const nativeIncluded = new Set(includedFiles(nativeConfig));
  const problems: string[] = [];
  for (const row of rows) {
    for (const pin of row.pins) {
      const actual: Tier = excluded.has(pin.file) ? "live-tier" : "default-gate";
      if (pin.tier !== actual) problems.push(`bullet ${row.bullet}: ${pin.file} is declared ${pin.tier} but the default vitest gate makes it ${actual}`);
      if (pin.tier === "live-tier" && !nativeIncluded.has(pin.file)) {
        problems.push(`bullet ${row.bullet}: live-tier pin file ${pin.file} is not in the ${NATIVE_CONFIG} include, so no tier would run it`);
      }
    }
    const rowTier: Tier = row.pins.some((pin) => pin.tier === "live-tier") ? "live-tier" : "default-gate";
    if (row.tier !== rowTier) problems.push(`bullet ${row.bullet}: row tier ${row.tier} disagrees with its pins (${rowTier})`);
  }
  return problems;
}

// ---- in-memory mutants of a pinned file (the real file is never written) ----

type Mutation =
  | "rename"
  | "delete"
  | "skip"
  | "todo"
  | "fails"
  | "only"
  | "skipIf"
  | "runIf"
  | "duplicate"
  | "comment-line"
  | "comment-block"
  | "options-skip"
  | "options-todo"
  | "describe-options"
  | "describe-skipIf"
  | "describe-runIf"
  | "ctx-skip"
  | "conditional";

interface CaseSpan {
  readonly hit: CaseHit;
  readonly masked: Masked;
  /** Start of the line holding the callee. */
  readonly start: number;
  /** End (exclusive, before the newline) of the line holding the call's closing parenthesis. */
  readonly end: number;
}

function caseSpan(source: string, title: string): CaseSpan {
  const masked = maskSource(source);
  const hit = findCases(masked, source, title)[0];
  if (hit === undefined) throw new Error(`cannot mutate absent title: ${title}`);
  const close = matchClose(masked.code, hit.callOpen);
  const eol = source.indexOf("\n", close);
  return { hit, masked, start: source.lastIndexOf("\n", hit.calleeStart) + 1, end: eol === -1 ? source.length : eol };
}

function wrap(source: string, span: CaseSpan, opening: string, closing: string): string {
  return `${source.slice(0, span.start)}${opening}\n${source.slice(span.start, span.end)}\n${closing}${source.slice(span.end)}`;
}

function mutate(source: string, title: string, mutation: Mutation): string {
  const span = caseSpan(source, title);
  const { hit } = span;
  switch (mutation) {
    case "rename":
      return `${source.slice(0, hit.titleStart)}RENAMED ${source.slice(hit.titleStart)}`;
    case "delete":
      return `${source.slice(0, span.start)}${source.slice(span.end)}`;
    case "skip":
    case "todo":
    case "fails":
    case "only":
      return `${source.slice(0, hit.calleeEnd)}.${mutation}${source.slice(hit.calleeEnd)}`;
    case "skipIf":
      return `${source.slice(0, hit.calleeEnd)}.skipIf(true)${source.slice(hit.calleeEnd)}`;
    case "runIf":
      return `${source.slice(0, hit.calleeEnd)}.runIf(false)${source.slice(hit.calleeEnd)}`;
    case "duplicate":
      return `${source}\n${source.slice(span.start, span.end)}\n`;
    case "comment-line": {
      const commented = source
        .slice(span.start, span.end)
        .split("\n")
        .map((line) => `// ${line}`)
        .join("\n");
      return `${source.slice(0, span.start)}${commented}${source.slice(span.end)}`;
    }
    case "comment-block":
      return wrap(source, span, "/*", "*/");
    case "options-skip":
    case "options-todo": {
      const key = mutation === "options-skip" ? "skip" : "todo";
      const titleEnd = span.masked.closeOf.get(hit.titleStart - 1) ?? hit.titleStart;
      return `${source.slice(0, titleEnd + 1)}, { ${key}: true }${source.slice(titleEnd + 1)}`;
    }
    case "describe-options":
      return wrap(source, span, 'describe("wrapper", { skip: true }, () => {', "});");
    case "describe-skipIf":
      return wrap(source, span, 'describe.skipIf(true)("wrapper", () => {', "});");
    case "describe-runIf":
      return wrap(source, span, 'describe.runIf(false)("wrapper", () => {', "});");
    case "ctx-skip": {
      const rest = span.masked.code.slice(hit.titleStart);
      const body = /=>\s*\{|function\s*\([^)]*\)\s*\{/.exec(rest);
      if (body === null) throw new Error(`pin has no block body to inject into: ${title}`);
      const at = hit.titleStart + body.index + body[0].length;
      return `${source.slice(0, at)} ctx.skip(); ${source.slice(at)}`;
    }
    case "conditional":
      return wrap(source, span, "if (false) {", "}");
  }
}

// ---- the census ----

describe("docs/workbench/06 conformance census (wb-6hb.6)", () => {
  it("binds all five docs/06 Conformance tests bullets verbatim and names any drift", () => {
    expect(docsProblems(readRepoFile(DOCS_FILE), ROWS)).toEqual([]);
  });

  it("holds a frozen five-row table with a reason on every partial or unpinned row and never a passed label", () => {
    expect(Object.isFrozen(ROWS)).toBe(true);
    expect(ROWS.map((row) => row.bullet)).toEqual([1, 2, 3, 4, 5]);
    expect(new Set(ROWS.map((row) => row.quote)).size).toBe(5);
    for (const row of ROWS) {
      const label = `bullet ${row.bullet}`;
      if (row.status === "pinned") {
        expect(row.reason, `${label}: a fully pinned row carries no reason`).toBeUndefined();
        expect(row.pins.length, `${label}: pinned rows bind at least one case`).toBeGreaterThan(0);
      } else {
        expect((row.reason ?? "").trim().length, `${label}: ${row.status} rows must say what is unbound`).toBeGreaterThan(20);
      }
      if (row.status === "partial") expect(row.pins.length, `${label}: partial rows bind at least one case`).toBeGreaterThan(0);
      if (row.status === "unpinned") expect(row.pins, `${label}: unpinned rows bind nothing`).toEqual([]);
      const keys = row.pins.map((pin) => `${pin.file}\n${pin.title}`);
      expect(new Set(keys).size, `${label}: duplicate pin`).toBe(keys.length);
    }
  });

  it("declares live-tier exactly when a pinned file is excluded from the default vitest gate", () => {
    expect(tierProblems(ROWS, readRepoFile(VITEST_CONFIG), readRepoFile(NATIVE_CONFIG))).toEqual([]);
  });

  it("keeps every pinned case present exactly once and enabled in its file at HEAD", () => {
    const problems = ROWS.flatMap((row) => rowProblems(row, readRepoFile));
    expect(problems).toEqual([]);
  });

  it("masks every pinned file without moving a character, and the masker finds all 16 unique pins through it", () => {
    const files = [...new Set(ROWS.flatMap((row) => row.pins.map((pin) => pin.file)))];
    for (const file of files) {
      const source = readRepoFile(file);
      const masked = maskSource(source);
      expect(masked.code.length, `${file}: mask must preserve length`).toBe(source.length);
      expect(masked.code.split("\n").length, `${file}: mask must preserve line structure`).toBe(source.split("\n").length);
    }
    const unique = new Set(ROWS.flatMap((row) => row.pins.map((pin) => `${pin.file}\n${pin.title}`)));
    expect(unique.size).toBe(16);
  });
});

describe("census falsifiers: a quietly weakened guarantee goes red naming bullet, file and title", () => {
  const mutations: readonly Mutation[] = ["rename", "delete", "skip"];

  for (const row of ROWS) {
    for (const mutation of mutations) {
      it(`bullet ${row.bullet}: a ${mutation} of any pinned case is refused`, () => {
        for (const pin of row.pins) {
          const mutated = mutate(readRepoFile(pin.file), pin.title, mutation);
          const read: FileReader = (file) => (file === pin.file ? mutated : readRepoFile(file));
          const problems = rowProblems(row, read);
          expect(problems.length, `${mutation} of "${pin.title}" must be caught`).toBeGreaterThan(0);
          expect(problems.join("\n")).toContain(`bullet ${row.bullet}`);
          expect(problems.join("\n")).toContain(pin.file);
          expect(problems.join("\n")).toContain(pin.title);
        }
      });
    }
  }

  it("refuses a duplicated title and every disabling modifier", () => {
    const source = 'it("a", () => {});\nit("a", () => {});\n';
    expect(pinProblem(source, "a")).toContain("2 times");
    for (const modifier of DISABLING) {
      expect(pinProblem(`it.${modifier}("a", () => {});\n`, "a")).toContain(`.${modifier}`);
      expect(pinProblem(`test.${modifier}('a', () => {});\n`, "a")).toContain(`.${modifier}`);
    }
    expect(pinProblem('describe.skip("d", () => { it("a", () => {}); });\n', "a")).toContain("describe.skip");
    expect(pinProblem('it("a", () => {});\n', "a")).toBeUndefined();
    expect(pinProblem("it('a',async()=>{});\n", "a")).toBeUndefined();
  });

  it("names the bullet when docs/06 drops or rewrites one", () => {
    const docs = readRepoFile(DOCS_FILE);
    for (const row of ROWS) {
      const dropped = docs.replace(`- ${row.quote}\n`, "");
      expect(dropped).not.toBe(docs);
      expect(docsProblems(dropped, ROWS).join("\n")).toContain(`bullet ${row.bullet}`);
      const rewritten = docs.replace(row.quote, `${row.quote} (weakened)`);
      expect(docsProblems(rewritten, ROWS).join("\n")).toContain(`bullet ${row.bullet}`);
    }
    expect(docsProblems("# nothing here\n", ROWS)).toEqual(['docs/06 section "## Conformance tests" is missing']);
  });
});

describe("census falsifiers: modes that used to leave the census green while the case never ran (gate U1)", () => {
  /** [mutation, text the problem must carry]. One synthetic falsifier per mode, run against every real pin. */
  const modes: readonly (readonly [Mutation, string])[] = [
    ["todo", ".todo"],
    ["fails", ".fails"],
    ["only", ".only"],
    ["skipIf", ".skipIf"],
    ["runIf", ".runIf"],
    ["duplicate", "2 times"],
    ["comment-line", "absent"],
    ["comment-block", "absent"],
    ["options-skip", "options object { skip }"],
    ["options-todo", "options object { todo }"],
    ["describe-options", "enclosing describe/suite is disabled by the options object { skip }"],
    ["describe-skipIf", "describe.skip/todo/fails/only/skipIf/runIf"],
    ["describe-runIf", "describe.skip/todo/fails/only/skipIf/runIf"],
    ["ctx-skip", "skip()"],
    ["conditional", "conditional"],
  ];

  for (const [mutation, expected] of modes) {
    it(`${mutation}: every pinned case is refused naming bullet, file and title (${expected})`, () => {
      for (const row of ROWS) {
        for (const pin of row.pins) {
          const mutated = mutate(readRepoFile(pin.file), pin.title, mutation);
          const read: FileReader = (file) => (file === pin.file ? mutated : readRepoFile(file));
          const problems = rowProblems(row, read).filter((line) => line.includes(pin.title) && line.includes(pin.file));
          expect(problems.length, `${mutation} of bullet ${row.bullet} "${pin.title}" must be caught`).toBeGreaterThan(0);
          expect(problems.join("\n")).toContain(`bullet ${row.bullet}`);
          expect(problems.join("\n")).toContain(expected);
        }
      }
    });
  }

  it("a describe-level skip fails EVERY pin in that file by name, not only the wrapped ones", () => {
    const file = "test/workbench-registry-auth.test.ts";
    const source = `${readRepoFile(file)}\ndescribe.skipIf(true)("unrelated", () => { it("x", () => {}); });\n`;
    const read: FileReader = (name) => (name === file ? source : readRepoFile(name));
    const named = ROWS.flatMap((row) => rowProblems(row, read)).filter((line) => line.includes(file));
    const pinnedHere = new Set(ROWS.flatMap((row) => row.pins.filter((pin) => pin.file === file).map((pin) => `${row.bullet}\n${pin.title}`)));
    expect(pinnedHere.size).toBeGreaterThan(1);
    expect(named.length).toBe(pinnedHere.size);
  });

  it("is string-, template- and regex-aware: slashes inside literals are not comments and commented titles are absent", () => {
    const withSlashes = [
      ["const url = `http://example.test/", "$", "{'a'}//b`;"].join(""),
      'const text = "// not a comment";',
      "const re = /\\/\\/ not a comment/;",
      'it("a", () => {});',
      "",
    ].join("\n");
    expect(pinProblem(withSlashes, "a")).toBeUndefined();
    expect(pinProblem('// it("a", () => {});\n', "a")).toContain("absent");
    expect(pinProblem('/* it("a", () => {}); */\n', "a")).toContain("absent");
    expect(pinProblem('const t = `it("a", () => {})`;\n', "a")).toContain("absent");
    expect(pinProblem('it("a", () => { const s = "skip("; });\n', "a")).toBeUndefined();
  });

  it("refuses the body, option and registration shapes directly", () => {
    expect(pinProblem('it("a", (ctx) => { ctx.skip(); });\n', "a")).toContain("skip()");
    expect(pinProblem('it("a", ({ skip }) => { skip("why"); });\n', "a")).toContain("skip()");
    expect(pinProblem('it("a", { todo: true }, () => {});\n', "a")).toContain("{ todo }");
    expect(pinProblem('it("a", { skip: false }, () => {});\n', "a")).toBeUndefined();
    expect(pinProblem('it("a", () => {}, { skip: true });\n', "a")).toContain("{ skip }");
    expect(pinProblem('if (cond) { it("a", () => {}); }\n', "a")).toContain("conditional");
    expect(pinProblem('if (cond) {} else { it("a", () => {}); }\n', "a")).toContain("conditional");
    expect(pinProblem('cond && it("a", () => {});\n', "a")).toContain("conditional");
    expect(pinProblem('cond ? it("a", () => {}) : undefined;\n', "a")).toContain("conditional");
    expect(pinProblem('suite.skip("s", () => { it("a", () => {}); });\n', "a")).toContain("describe.skip");
    expect(pinProblem('describe.concurrent.skip("s", () => { it("a", () => {}); });\n', "a")).toContain("describe.skip");
    expect(pinProblem('describe("s", { todo: true }, () => { it("a", () => {}); });\n', "a")).toContain("{ todo }");
    expect(pinProblem('describe("s", () => { it("a", () => {}); });\n', "a")).toBeUndefined();
  });
});

describe("census falsifiers: tier truth (folds O1, O2; gate mutants T1-T3)", () => {
  const defaultConfig = readRepoFile(VITEST_CONFIG);
  const nativeConfig = readRepoFile(NATIVE_CONFIG);
  const livePins = ROWS.flatMap((row) => row.pins.filter((pin) => pin.tier === "live-tier").map((pin) => ({ row, pin })));

  it("classifies the tier of each pin, not just the row: bullet 3 mixes one live-tier and one default-gate pin", () => {
    const bullet3 = ROWS.find((row) => row.bullet === 3);
    expect(bullet3?.tier).toBe("live-tier");
    expect(bullet3?.pins.map((pin) => pin.tier)).toEqual(["live-tier", "default-gate"]);
    expect(bullet3?.reason).toContain("LIVE-TIER");
    expect(livePins.length).toBeGreaterThan(0);
  });

  it("T1: a default-gate pin file added to the default exclude list is refused naming bullet and file", () => {
    for (const row of ROWS) {
      for (const pin of row.pins.filter((candidate) => candidate.tier === "default-gate")) {
        const mutated = defaultConfig.replace("exclude: [", `exclude: ["${pin.file}", `);
        expect(mutated).not.toBe(defaultConfig);
        const problems = tierProblems(ROWS, mutated, nativeConfig).join("\n");
        expect(problems).toContain(`bullet ${row.bullet}`);
        expect(problems).toContain(pin.file);
      }
    }
  });

  it("T2: a live-tier pin file dropped from the native config include is refused (no tier would run it)", () => {
    for (const { row, pin } of livePins) {
      const mutated = nativeConfig.replace(`"${pin.file}",`, "").replace(`,"${pin.file}"`, "");
      expect(mutated).not.toBe(nativeConfig);
      const problems = tierProblems(ROWS, defaultConfig, mutated).join("\n");
      expect(problems).toContain(`bullet ${row.bullet}`);
      expect(problems).toContain(pin.file);
      expect(problems).toContain(NATIVE_CONFIG);
    }
  });

  it("T3: a live-tier pin file moved back into the default gate is refused naming bullet and file", () => {
    for (const { row, pin } of livePins) {
      const mutated = defaultConfig.replace(`"${pin.file}", `, "");
      expect(mutated).not.toBe(defaultConfig);
      const problems = tierProblems(ROWS, mutated, nativeConfig).join("\n");
      expect(problems).toContain(`bullet ${row.bullet}`);
      expect(problems).toContain(pin.file);
    }
  });

  it("a row whose tier label disagrees with its pins is refused", () => {
    const flipped = ROWS.map((row) => (row.bullet === 3 ? { ...row, tier: "default-gate" as const } : row));
    expect(tierProblems(flipped, defaultConfig, nativeConfig).join("\n")).toContain("bullet 3: row tier default-gate disagrees");
  });
});
