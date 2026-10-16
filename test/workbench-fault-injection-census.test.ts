/**
 * VC-7 / W12 / W18 falsifier (wb-0kg.12): the docs/workbench/14 "Fault-injection
 * locations" census.
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly
 * weakened." and "All docs and status tables must distinguish "code present",
 * "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"".
 *
 * docs/14 "Fault-injection locations" lists the boundaries a fault must be injected
 * at. Nothing else binds those locations to a landed case, so a rename, deletion or
 * disabling of a fault case would leave the docs list intact with every suite green,
 * and a location that has NO case today would be indistinguishable from a covered
 * one. This file is that binding: a frozen table that ties each location to its
 * truth label, to the exact case title that proves it (read as TEXT from the file at
 * HEAD, exactly once, as the first argument of a describe/suite/it/test call, never
 * disabled), or to an OPEN row naming what is missing.
 *
 * It never executes a pinned case and never injects a fault. Rules it enforces:
 *   - parse-aware scanner (U1/U2): comments stripped string-aware, the title must be
 *     the first argument of exactly one registered call, with no skip/todo/fails/only
 *     modifier, no options-object modifier, no skipIf/runIf, no ctx.skip(), no
 *     conditional or unreachable registration, and no enclosing describe modifier; one
 *     file-wide hazard fails EVERY pin in that file by name. One falsifier per mode.
 *   - tier truth (U3): a default-gate pin file must be matched by the vitest.config.ts
 *     include globs and absent from its exclude globs; a forge-command tier names a
 *     forge.toml command block whose runner file exists; a static-text pin states
 *     which forge command really injects the fault.
 *   - docs exactness (U4): the WHOLE "## Fault-injection locations" section body is
 *     pinned line for line, so a sixth location in any list shape goes red.
 *   - half-coverage rule (O1): a location covered in part is SPLIT into a covered row
 *     (own proof, own truth note) and an uncovered row (own tier label and reason).
 *   - arithmetic (O2): docs/14 splits to fifteen clauses; the groom enumerates
 *     fourteen locations L1-L14 and merges the second clause of bullet five
 *     ("stopping one reader must not stop child without ownership") into L14. The L14
 *     rows name that merge, so the 15-vs-14 count is auditable from this file alone.
 *
 * A landing that renames a pinned case updates this table in the same commit
 * (pin-flip); a landing that closes an open row flips it to pinned here.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const VITEST_CONFIG = "vitest.config.ts";
const FORGE_TOML = "forge.toml";
const SECTION_HEADING = "Fault-injection locations";

type TruthLabel = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass" | "scale benchmark pass" | "not started";
type Tier = "default-gate" | "forge-command";
type RowStatus = "pinned" | "open";
type Half = "covered" | "uncovered";

interface Pin {
  file: string;
  title: string;
}

interface Row {
  /** Row id: the location id plus a split suffix when the location is half covered (L2a). */
  row: string;
  /** The groom's location id, L1..L14. */
  location: string;
  text: string;
  /** The docs/14 fragment this row covers, verbatim. */
  quote: string;
  label: TruthLabel;
  /** What runs the claimed proof: the default gate, or a named forge command. */
  tier: Tier;
  /** Forge command block (forge.toml) when tier is forge-command. */
  command?: string;
  /** Forge command that really injects the fault when the pin is a static-text check. */
  injectsAt?: string;
  pins: Pin[];
  status: RowStatus;
  /** Present on rows produced by the half-coverage split. */
  half?: Half;
  trackingBead?: string;
  /** An open row with no bead filed yet: listed for groom follow-up in the delivery note. */
  unfiled?: boolean;
  reason: string;
  /** Tier-truth note: what the pin does and does not prove. */
  truth?: string;
  /** The docs clause the groom enumeration merged into this location (O2). */
  merges?: string;
  receipt?: string;
}

const PASS_LABELS: readonly TruthLabel[] = ["fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"];
const RECEIPT_LABELS: readonly TruthLabel[] = ["live SDK pass", "adversarial pass", "scale benchmark pass"];
const OPEN_LABELS: readonly TruthLabel[] = ["code present", "not started"];

const CANCEL_FAULTS = "test/workbench-claude-cancel-faults.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const SHARED_CHILD = "test/workbench-detached-shared-child-receipt.test.ts";
const MERGED_CLAUSE = "stopping one reader must not stop child without ownership";

const ROWS: readonly Row[] = [
  {
    row: "L1",
    location: "L1",
    text: "before provider call",
    quote: "Before provider call",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: CANCEL_FAULTS,
        title: "F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted",
      },
    ],
    status: "pinned",
    reason: "fixture ClaudeQuery: abort during beforeDispatch means query() is never called",
  },
  {
    row: "L2a",
    location: "L2",
    text: "after provider side effect but before host result (resume refusal half)",
    quote: "after provider side effect but before host result",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workflow-effect-replay.test.ts",
        title: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
      },
    ],
    status: "pinned",
    half: "covered",
    reason: "a journaled non-read node is neither re-run nor replayed on resume; the resume surfaces a typed uncertain effect",
    truth: "runs fully inside the default gate against the in-process runtime fixture; no live provider",
  },
  {
    row: "L2b",
    location: "L2",
    text: "after provider side effect but before host result (detached-profile marker, static text)",
    quote: "after provider side effect but before host result",
    label: "code present",
    tier: "default-gate",
    injectsAt: "local-detached-faults",
    pins: [{ file: "test/workbench-detached-faults-receipt.test.ts", title: "writes exactly one marker before the kill and nothing after it" }],
    status: "pinned",
    half: "covered",
    reason: "the detached fault-provider source writes exactly one marker before it kills itself",
    truth:
      "the default-gate pin is a static text check of the generated fault-provider source; the real kill runs only under forge run local-detached-faults (no cmd_ receipt in TRACEABILITY at this base), so the label stays code present, never fixture pass",
  },
  {
    row: "L2c",
    location: "L2",
    text: "after provider side effect but before host result (runtime.ts dispatched-row-before-call half)",
    quote: "after provider side effect but before host result",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    half: "uncovered",
    trackingBead: "wb-5x0.1",
    reason: "runtime.ts journal gap: a non-read node leaves no journal row until it settles, so no case can inject a kill between the effect and the row yet",
  },
  {
    row: "L3",
    location: "L3",
    text: "after result before journal append",
    quote: "after result before journal append",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-5x0.1",
    reason: "runtime.ts journal gap: a non-read node leaves no journal row until it settles, so no case can inject here yet",
  },
  {
    row: "L4",
    location: "L4",
    text: "before event persist",
    quote: "before event persist",
    label: "fixture pass",
    tier: "default-gate",
    pins: [{ file: OBSERVATION, title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot" }],
    status: "pinned",
    reason: "observation projection dedupes ids, rejects old sequences and treats a cursor gap as stale until a snapshot",
  },
  {
    row: "L5",
    location: "L5",
    text: "after reconnect but before snapshot",
    quote: "after reconnect but before snapshot",
    label: "fixture pass",
    tier: "default-gate",
    pins: [{ file: OBSERVATION, title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" }],
    status: "pinned",
    reason: "reconnect alone never restores current without a snapshot",
  },
  {
    row: "L6",
    location: "L6",
    text: "before Claude SDK session ID first received",
    quote: "Before/after Claude SDK session ID first received",
    label: "fixture pass",
    tier: "default-gate",
    pins: [{ file: CANCEL_FAULTS, title: "F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort" }],
    status: "pinned",
    reason: "cancel before the init message leaves no session id",
  },
  {
    row: "L7",
    location: "L7",
    text: "after Claude SDK session ID first received",
    quote: "Before/after Claude SDK session ID first received",
    label: "fixture pass",
    tier: "default-gate",
    pins: [{ file: CANCEL_FAULTS, title: "F2 cancel during tool execution: the cancelled result keeps the session id init reported" }],
    status: "pinned",
    reason: "a cancel after init keeps the session id init reported",
  },
  {
    row: "L8",
    location: "L8",
    text: "during tool execution",
    quote: "during tool execution",
    label: "fixture pass",
    tier: "default-gate",
    pins: [{ file: CANCEL_FAULTS, title: "F2 cancel during tool execution: the cancelled result keeps the session id init reported" }],
    status: "pinned",
    reason: "cancel during tool execution settles cancelled",
  },
  {
    row: "L9",
    location: "L9",
    text: "after output tokens streamed but before final",
    quote: "after output tokens streamed but before final",
    label: "fixture pass",
    tier: "default-gate",
    pins: [{ file: CANCEL_FAULTS, title: "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure" }],
    status: "pinned",
    reason: "an SDK stream that ends on abort settles cancelled, never the missing-result failure",
  },
  {
    row: "L10",
    location: "L10",
    text: "inside worktree after edits but before Forge gate",
    quote: "Inside worktree after edits but before Forge gate",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-a2g.11",
    reason: "VC-1 worktree-isolation and gate-degradation conformance is in flight (unlanded at this base); pinned when it lands",
  },
  {
    row: "L11a",
    location: "L11",
    text: "after Forge evidence while workspace mutates (failed-gate observer half)",
    quote: "after Forge evidence while workspace mutates",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "reads Forge's own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace",
      },
    ],
    status: "pinned",
    half: "covered",
    reason: "the observer reads Forge's own failed-gate status as failure and never promotes a mixed or undecided reading",
    truth: "runs inside the default gate against a fixture Forge reading; it does not mutate a workspace",
  },
  {
    row: "L11b",
    location: "L11",
    text: "after Forge evidence while workspace mutates (forge-contract basis-change half)",
    quote: "after Forge evidence while workspace mutates",
    label: "not started",
    tier: "default-gate",
    pins: [],
    status: "open",
    half: "uncovered",
    unfiled: true,
    reason: "no forge-contract case changes the source basis after evidence (docs/14 matrix: source basis changed -> no PASS); no bead is filed yet, listed for groom follow-up",
  },
  {
    row: "L12",
    location: "L12",
    text: "after isolated cleanup",
    quote: "after isolated cleanup",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-a2g.11",
    reason: "VC-1 worktree-isolation and gate-degradation conformance is in flight (unlanded at this base); pinned when it lands",
  },
  {
    row: "L13",
    location: "L13",
    text: "Furnace Work retry while child Run establishment is uncertain",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-0kg.4",
    reason: "VC-7/W18-D Work-retry-while-establishment-uncertain conformance is in flight (unlanded at this base); pinned when it lands",
  },
  {
    row: "L14a",
    location: "L14",
    text: "concurrent readers with one shared child (judge and ownership half)",
    quote: "Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: SHARED_CHILD,
        title: "flags a reader close that took the child down (dead host, cancelled/unknown terminal or cancellationRequested)",
      },
      { file: SHARED_CHILD, title: "flags a non-owner stop that was accepted, untyped, or that disturbed the child" },
      { file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" },
    ],
    status: "pinned",
    half: "covered",
    merges: MERGED_CLAUSE,
    reason: "the pure shared-child judge flags a reader close that stops the child and a non-owner stop that is accepted; observer-only grants cannot control",
    truth: "the pins drive the pure judge and the control gate with fixtures inside the default gate; the real child processes are the L14b row",
  },
  {
    row: "L14b",
    location: "L14",
    text: "concurrent readers with one shared child (real-process realisation half)",
    quote: "Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
    label: "code present",
    tier: "forge-command",
    command: "local-detached-shared-child",
    pins: [],
    status: "open",
    half: "uncovered",
    unfiled: true,
    merges: MERGED_CLAUSE,
    reason:
      "real child processes and real reader exits run only under forge run local-detached-shared-child; TRACEABILITY carries no cmd_ receipt for it at this base, so no live label is earned; no bead is filed yet, listed for groom follow-up",
  },
];

const UNFILED_ROWS = ["L11b", "L14b"];

// ---- parse-aware scanner -------------------------------------------------------------------

/** The focus modifier, spelled indirectly so a text search for focused cases never matches this file. */
const FOCUS_MODIFIER = "on" + "ly";
const SKIP_MODIFIERS = new Set(["skip", "todo", "fails", "skipIf", "runIf", FOCUS_MODIFIER]);
const NOT_FOUND = "title not found as the first argument of a describe/suite/it/test call";

interface Lexed {
  /** Source with comments blanked (newlines kept); string literals intact. */
  code: string;
  /** Same length as code, with string, template and regex contents blanked too; quote characters kept. */
  bare: string;
}

function blank(text: string): string {
  return text.replace(/[^\n]/g, " ");
}

/** True when a "/" at this point opens a regex literal: the previous significant character cannot end an operand. */
function startsRegex(bareSoFar: string): boolean {
  const trimmed = bareSoFar.replace(/\s+$/, "");
  if (trimmed === "") return true;
  const last = trimmed.charAt(trimmed.length - 1);
  if ("(,=:[!&|?{};+-*%<>~^".includes(last)) return true;
  return /\breturn$/.test(trimmed);
}

/**
 * One string-aware pass over TypeScript text: blanks // and block comments outside string and template
 * literals, and separately blanks string and regex contents, keeping offsets identical so a literal found
 * in code can be judged structurally in bare. Disclosed limits: template-literal ${...} expressions are
 * treated as string text and a regex literal is recognised by its preceding token only; a mis-parse can
 * only hide or expose text, which the exactly-once title check then reports.
 */
function lex(source: string): Lexed {
  let code = "";
  let bare = "";
  let quote = "";
  let i = 0;
  while (i < source.length) {
    const ch = source.charAt(i);
    const next = source.charAt(i + 1);
    if (quote !== "") {
      if (ch === "\\") {
        code += ch + next;
        bare += "  ";
        i += 2;
        continue;
      }
      code += ch;
      if (ch === quote) {
        quote = "";
        bare += ch;
      } else {
        bare += ch === "\n" ? ch : " ";
      }
      i += 1;
      continue;
    }
    if (ch === "/" && next === "/") {
      const end = source.indexOf("\n", i);
      const stop = end === -1 ? source.length : end;
      code += blank(source.slice(i, stop));
      bare += blank(source.slice(i, stop));
      i = stop;
      continue;
    }
    if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const stop = end === -1 ? source.length : end + 2;
      code += blank(source.slice(i, stop));
      bare += blank(source.slice(i, stop));
      i = stop;
      continue;
    }
    if (ch === "/" && startsRegex(bare)) {
      let k = i + 1;
      let inClass = false;
      while (k < source.length && source.charAt(k) !== "\n") {
        const c = source.charAt(k);
        if (c === "\\") {
          k += 2;
          continue;
        }
        if (c === "[") inClass = true;
        else if (c === "]") inClass = false;
        else if (c === "/" && !inClass) break;
        k += 1;
      }
      if (source.charAt(k) === "/") {
        code += source.slice(i, k + 1);
        bare += `/${" ".repeat(Math.max(0, k - i - 1))}/`;
        i = k + 1;
        continue;
      }
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    code += ch;
    bare += ch;
    i += 1;
  }
  return { code, bare };
}

const CHAIN_TAIL = /(?<![\w$.])(describe|suite|it|test)((?:\.[A-Za-z]+)*)\s*$/;
/** An options-object member that skips, defers, inverts or isolates a case, unless it is literally false. */
const OPTION_MODIFIER = /\b(skip|todo|fails|only)\s*:\s*(?!false\b)(?=\S)/;
/**
 * Fail-closed file-wide hazards, judged on code with comments and literal contents blanked: any skip, todo, focus,
 * skipIf or runIf modifier chain on describe, suite, it or test (including .concurrent chains), any skip( call
 * (ctx.skip(), context.skip(), a destructured skip()), or an options member that skips, defers or isolates. One
 * hazard anywhere in a pinned file fails EVERY pin in that file by name, because vitest may then no longer run the
 * pinned case. The cost is deliberate over-breadth: a pin file may not carry these anywhere.
 */
const FILE_HAZARD = new RegExp(
  `(?<![\\w$.])(?:describe|suite|it|test)(?:\\.[A-Za-z]+)*\\.(?:${FOCUS_MODIFIER}|skip|todo|skipIf|runIf)\\b|(?<![\\w$])(?:[A-Za-z_$][\\w$]*\\.)?skip\\s*\\(|\\b(?:skip|todo|${FOCUS_MODIFIER})\\s*:\\s*(?!false\\b)(?=\\S)`,
);
/** The head of a describe/suite call whose callback body opens at the end of the text: captures the modifier chain. */
const DESCRIBE_BODY =
  /(?<![\w$.])(?:describe|suite)((?:\.[A-Za-z]+)*)\s*(?:\((?:[^()]|\([^()]*\))*\)\s*)?\(\s*(?:"[ \n]*"|'[ \n]*'|`[ \n]*`)\s*(?:,\s*\{[^{}]*\})?\s*,\s*(?:async\s+)?(?:function\s*\w*\s*\([^()]*\)|\([^()]*\)\s*=>|\w+\s*=>)\s*$/;

function matchingOpenParen(bare: string, closeIndex: number): number {
  let depth = 0;
  for (let k = closeIndex; k >= 0; k -= 1) {
    const c = bare.charAt(k);
    if (c === ")") depth += 1;
    else if (c === "(") {
      depth -= 1;
      if (depth === 0) return k;
    }
  }
  return -1;
}

function balancedBraces(bare: string, start: number): string {
  let depth = 0;
  for (let k = start; k < bare.length; k += 1) {
    const c = bare.charAt(k);
    if (c === "{") depth += 1;
    else if (c === "}") {
      depth -= 1;
      if (depth === 0) return bare.slice(start, k + 1);
    }
  }
  return "";
}

interface CallSite {
  start: number;
  modifiers: string[];
  options: string;
}

/** Resolves a literal at `from` as the FIRST argument of a describe/suite/it/test call, directly or through an .each(...)/.skipIf(...) head. */
function callSiteAt(lexed: Lexed, from: number, literalLength: number, quoteChar: string): CallSite | undefined {
  const { bare } = lexed;
  if (bare.charAt(from) !== quoteChar) return undefined;
  let i = from - 1;
  while (i >= 0 && /\s/.test(bare.charAt(i))) i -= 1;
  if (bare.charAt(i) !== "(") return undefined;
  let headEnd = i;
  let j = i - 1;
  while (j >= 0 && /\s/.test(bare.charAt(j))) j -= 1;
  if (bare.charAt(j) === ")") {
    const open = matchingOpenParen(bare, j);
    if (open < 0) return undefined;
    headEnd = open;
  }
  const window = Math.max(0, headEnd - 96);
  const head = CHAIN_TAIL.exec(bare.slice(window, headEnd));
  if (head === null) return undefined;
  let k = from + literalLength;
  while (k < bare.length && /\s/.test(bare.charAt(k))) k += 1;
  let options = "";
  if (bare.charAt(k) === ",") {
    k += 1;
    while (k < bare.length && /\s/.test(bare.charAt(k))) k += 1;
    if (bare.charAt(k) === "{") options = balancedBraces(bare, k);
  }
  return { start: window + head.index, modifiers: (head[2] ?? "").split(".").filter(Boolean), options };
}

/**
 * Walks the open braces that enclose `position` (outermost first) and reports why the call there is not a plain
 * registration: an enclosing block that is not a describe/suite callback body (if, loop, function or wrapper that may
 * never run) or an enclosing describe/suite modifier that skips, defers or isolates.
 */
function enclosingProblem(bare: string, position: number): string | undefined {
  const open: number[] = [];
  for (let k = 0; k < position; k += 1) {
    const c = bare.charAt(k);
    if (c === "{") open.push(k);
    else if (c === "}") open.pop();
  }
  for (const brace of open) {
    const tail = bare.slice(Math.max(0, brace - 400), brace);
    const describeHead = DESCRIBE_BODY.exec(tail);
    if (describeHead === null) return "registered inside a block that is not a describe/suite callback (conditional or unreachable registration)";
    const blocked = (describeHead[1] ?? "").split(".").filter((modifier) => SKIP_MODIFIERS.has(modifier));
    if (blocked.length > 0) return `enclosing describe is .${blocked.join(".")}`;
  }
  return undefined;
}

function literalFor(title: string, quoteChar: string): string {
  const escaped = title.replace(/\\/g, "\\\\").split(quoteChar).join(`\\${quoteChar}`);
  return `${quoteChar}${escaped}${quoteChar}`;
}

/**
 * Verdict for one pinned title in one suite's text: undefined when sound, otherwise the reason. Comments are stripped
 * string-aware first. The title must be the first argument of exactly one describe/suite/it/test call, registered
 * only inside describe/suite callbacks, with no skip/todo/fails/focus/skipIf/runIf modifier, no options-object
 * modifier and no enclosing describe modifier, and the file must carry no fail-closed hazard anywhere.
 */
function checkPin(source: string, title: string): string | undefined {
  const lexed = lex(source);
  const sites: CallSite[] = [];
  for (const quoteChar of ['"', "'", "`"]) {
    const literal = literalFor(title, quoteChar);
    let from = lexed.code.indexOf(literal);
    while (from !== -1) {
      const site = callSiteAt(lexed, from, literal.length, quoteChar);
      if (site !== undefined) sites.push(site);
      from = lexed.code.indexOf(literal, from + literal.length);
    }
  }
  const site = sites[0];
  if (site === undefined) return NOT_FOUND;
  if (sites.length > 1) return `case title occurs ${sites.length} times, not exactly once`;
  const blocked = site.modifiers.filter((modifier) => SKIP_MODIFIERS.has(modifier));
  if (blocked.length > 0) return `case is disabled via .${blocked.join(".")}`;
  const option = OPTION_MODIFIER.exec(site.options)?.[1];
  if (option !== undefined) return `case has option ${option}`;
  const enclosing = enclosingProblem(lexed.bare, site.start);
  if (enclosing !== undefined) return enclosing;
  const hazard = FILE_HAZARD.exec(lexed.bare)?.[0];
  if (hazard !== undefined) return `file hazard ${hazard.replace(/\s+/g, "")}`;
  return undefined;
}

// ---- tier truth ----------------------------------------------------------------------------

/** Compiles a vitest glob (** any depth, * within a segment) to an anchored regular expression. */
function globToRegExp(glob: string): RegExp {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/\*\*\//g, "(?:.*/)?").replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*")}$`);
}

/** A default-gate pin file must be matched by the vitest include globs and absent from the exclude globs, read from the config text. */
function vitestProblem(config: string, file: string): string | undefined {
  const text = lex(config).code;
  const list = (key: string): string[] =>
    [...(new RegExp(`\\b${key}\\s*:\\s*\\[([^\\]]*)\\]`).exec(text)?.[1] ?? "").matchAll(/"([^"]+)"|'([^']+)'/g)].map((match) => match[1] ?? match[2] ?? "");
  const includes = list("include");
  if (includes.length === 0) return "vitest include list is missing or empty";
  if (!includes.some((glob) => globToRegExp(glob).test(file))) return `${file} is outside the vitest include globs, so the default gate never runs it`;
  if (list("exclude").some((glob) => globToRegExp(glob).test(file))) return `${file} is excluded by vitest.config.ts exclude, so the default gate never runs it`;
  return undefined;
}

/** A named forge command must have a [build.commands.<name>] block in forge.toml whose runner file exists. */
function forgeCommandProblem(toml: string, name: string, exists: (file: string) => boolean): string | undefined {
  const header = new RegExp(`^\\[build\\.commands\\.${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\][ \\t]*$`, "m").exec(toml);
  if (header === null) return `forge.toml has no [build.commands.${name}] block`;
  const rest = toml.slice(header.index + header[0].length);
  const next = /^\[/m.exec(rest);
  const block = next === null ? rest : rest.slice(0, next.index);
  const runner = /^command\s*=\s*"[^"]*?(qa\/[^\s"]+)/m.exec(block)?.[1];
  if (runner === undefined) return `[build.commands.${name}] names no qa/ runner file`;
  if (!exists(runner)) return `[build.commands.${name}] runner ${runner} does not exist`;
  return undefined;
}

// ---- row audit -----------------------------------------------------------------------------

type Reader = (file: string) => string;

const readHead: Reader = (file) => readFileSync(resolve(repo, file), "utf8");

function existsAtHead(read: Reader): (file: string) => boolean {
  return (file) => {
    try {
      read(file);
      return true;
    } catch {
      return false;
    }
  };
}

function auditRow(row: Row, read: Reader): string[] {
  const problems: string[] = [];
  const fail = (detail: string): void => {
    problems.push(`${row.row} ${row.text}: ${detail}`);
  };
  for (const pin of row.pins) {
    const problem = checkPin(read(pin.file), pin.title);
    if (problem !== undefined) fail(`${pin.file} "${pin.title}": ${problem}`);
    const tier = vitestProblem(read(VITEST_CONFIG), pin.file);
    if (tier !== undefined) fail(`tier truth: ${tier}`);
  }
  if (row.status === "pinned") {
    if (row.pins.length === 0) fail("pinned row carries no pin");
    if (row.injectsAt !== undefined) {
      if (row.label !== "code present") fail(`a static-text pin whose real injection runs under forge run ${row.injectsAt} is code present, not "${row.label}"`);
    } else if (!PASS_LABELS.includes(row.label)) {
      fail(`pinned row carries non-pass label "${row.label}"`);
    }
  } else {
    if (row.unfiled === true) {
      if (row.trackingBead !== undefined) fail("open row is both unfiled and names a tracking bead");
    } else if (row.trackingBead === undefined || !/^wb-[a-z0-9]+(\.[0-9]+)*$/.test(row.trackingBead)) {
      fail("open row names no tracking bead");
    }
    if (!OPEN_LABELS.includes(row.label)) fail(`open row carries label "${row.label}"; it is never counted passed`);
  }
  if (row.reason.length === 0) fail("row states no reason");
  if (row.label === "fixture pass" && (row.tier !== "default-gate" || row.pins.length === 0 || row.injectsAt !== undefined)) {
    fail("fixture pass requires a pinned default-gate case that is not a static-text stand-in for a forge-command injection");
  }
  if (row.tier === "forge-command") {
    if (row.command === undefined) fail("forge-command tier names no command");
    else {
      const problem = forgeCommandProblem(read(FORGE_TOML), row.command, existsAtHead(read));
      if (problem !== undefined) fail(`tier truth: ${problem}`);
    }
  }
  if (row.injectsAt !== undefined) {
    const problem = forgeCommandProblem(read(FORGE_TOML), row.injectsAt, existsAtHead(read));
    if (problem !== undefined) fail(`tier truth: ${problem}`);
    if (row.truth === undefined || !row.truth.includes(`forge run ${row.injectsAt}`)) fail(`truth note does not say the real injection runs under forge run ${row.injectsAt}`);
  }
  if (RECEIPT_LABELS.includes(row.label)) {
    if (row.receipt === undefined || !/^cmd_[0-9a-f]{12}$/.test(row.receipt)) fail(`${row.label} requires a cmd_ receipt id`);
    else if (!read(TRACEABILITY).includes(row.receipt)) fail(`receipt ${row.receipt} is not present in TRACEABILITY`);
  }
  return problems;
}

function auditAll(rows: readonly Row[], read: Reader): string[] {
  return rows.flatMap((row) => auditRow(row, read));
}

// ---- docs exactness ------------------------------------------------------------------------

const BULLETS = [
  "Before provider call; after provider side effect but before host result; after result before journal append; before event persist; after reconnect but before snapshot.",
  "Before/after Claude SDK session ID first received; during tool execution; after output tokens streamed but before final.",
  "Inside worktree after edits but before Forge gate; after Forge evidence while workspace mutates; after isolated cleanup.",
  "Parent Furnace Work retry while child Run establishment is uncertain.",
  "Concurrent readers with one shared child; stopping one reader must not stop child without ownership.",
];
const EXPECTED_BODY = BULLETS.map((bullet) => `- ${bullet}`).join("\n");

/** The body under the section heading, bounded by the next level-1 or level-2 heading or EOF, with edge blank lines trimmed; undefined unless the heading occurs exactly once. */
function sectionBody(docs: string): string | undefined {
  const normalized = docs.replace(/\r\n/g, "\n");
  const headings = [...normalized.matchAll(new RegExp(`^##[ \\t]+${SECTION_HEADING}[ \\t]*$`, "gm"))];
  const heading = headings[0];
  if (headings.length !== 1 || heading === undefined) return undefined;
  const rest = normalized.slice(heading.index + heading[0].length);
  const next = /^#{1,2}[ \t]/m.exec(rest);
  return (next === null ? rest : rest.slice(0, next.index)).replace(/^\n+|\n+$/g, "");
}

/** Every docs drift: the heading is missing or duplicated, or the whole section body differs from the five frozen bullets, line for line. */
function docsProblems(docs: string): string[] {
  const body = sectionBody(docs);
  if (body === undefined) return [`${DOCS_14}: the "## ${SECTION_HEADING}" heading is missing or occurs more than once`];
  if (body === EXPECTED_BODY) return [];
  const lines = body.split("\n");
  const expected = EXPECTED_BODY.split("\n");
  const first = lines.findIndex((line, index) => line !== expected[index]);
  const at = first === -1 ? Math.min(lines.length, expected.length) : first;
  return [
    `${DOCS_14}: the "## ${SECTION_HEADING}" section drifted at line ${at + 1} (expected ${JSON.stringify(expected[at] ?? "<end of section>")}, found ${JSON.stringify(lines[at] ?? "<end of section>")})`,
  ];
}

/** The docs clauses, split at the semicolons, with "Before/after X" counted as two. */
function docsClauses(): string[] {
  return BULLETS.flatMap((bullet) =>
    bullet
      .replace(/\.$/, "")
      .split(";")
      .map((part) => part.trim())
      .flatMap((clause) => (clause.startsWith("Before/after ") ? [`Before ${clause.slice("Before/after ".length)}`, `after ${clause.slice("Before/after ".length)}`] : [clause])),
  );
}

// ---- tests ---------------------------------------------------------------------------------

const rowNames = (rows: readonly Row[]): string => rows.map((row) => row.row).join(",");

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function covers(row: Row, clause: string): boolean {
  if (row.quote.includes(clause)) return true;
  const match = /^(Before|after) (.+)$/.exec(clause);
  return match !== null && row.quote.includes(`Before/after ${match[2] ?? ""}`);
}

describe("docs/14 fault-injection locations census (wb-0kg.12)", () => {
  it("A1: the whole Fault-injection locations section is exactly the five frozen bullets, line for line", () => {
    expect(docsProblems(readHead(DOCS_14))).toEqual([]);
    expect(sectionBody(readHead(DOCS_14))).toBe(EXPECTED_BODY);
  });

  it("A1: the section is bounded, so every row quote is verbatim inside it and nowhere else in docs/14 counts", () => {
    const body = sectionBody(readHead(DOCS_14)) ?? "";
    for (const row of ROWS) {
      expect(row.quote.length, row.row).toBeGreaterThan(0);
      expect(body.includes(row.quote), `${row.row}: quote is not verbatim inside the section body`).toBe(true);
    }
  });

  it("A1/O2: docs/14 splits to fifteen clauses, the table enumerates fourteen locations L1-L14, and the one merged clause is named by the L14 rows", () => {
    const clauses = docsClauses();
    expect(clauses.length).toBe(15);
    const locations = [...new Set(ROWS.map((row) => row.location))];
    expect(locations).toEqual(Array.from({ length: 14 }, (_, index) => `L${index + 1}`));
    const merging = ROWS.filter((row) => row.merges !== undefined);
    expect(rowNames(merging)).toBe("L14a,L14b");
    expect(new Set(merging.map((row) => row.merges))).toEqual(new Set([MERGED_CLAUSE]));
    expect(clauses).toContain(MERGED_CLAUSE);
    expect(clauses.length).toBe(locations.length + 1);
  });

  it("A1: every docs/14 clause is covered by a row quote, so a new docs location goes red", () => {
    for (const clause of docsClauses()) {
      expect(
        ROWS.some((row) => covers(row, clause)),
        `docs/14 clause has no census row: "${clause}"`,
      ).toBe(true);
    }
  });

  it("A1: row ids are unique and the table is frozen to the eighteen rows that split the half-covered locations", () => {
    expect(new Set(ROWS.map((row) => row.row)).size).toBe(ROWS.length);
    expect(rowNames(ROWS)).toBe("L1,L2a,L2b,L2c,L3,L4,L5,L6,L7,L8,L9,L10,L11a,L11b,L12,L13,L14a,L14b");
  });

  it("O1: every half-covered location is split into a covered row with its own proof and an uncovered open row with its own tier label and reason", () => {
    const splitLocations = [...new Set(ROWS.filter((row) => row.half !== undefined).map((row) => row.location))];
    expect(splitLocations).toEqual(["L2", "L11", "L14"]);
    for (const location of splitLocations) {
      const rows = ROWS.filter((row) => row.location === location);
      expect(
        rows.every((row) => row.half !== undefined),
        `${location}: a split location must not mix split and unsplit rows`,
      ).toBe(true);
      const covered = rows.filter((row) => row.half === "covered");
      const uncovered = rows.filter((row) => row.half === "uncovered");
      expect(covered.length, `${location} covered`).toBeGreaterThan(0);
      expect(uncovered.length, `${location} uncovered`).toBeGreaterThan(0);
      for (const row of covered) {
        expect(row.status, row.row).toBe("pinned");
        expect(row.pins.length, row.row).toBeGreaterThan(0);
        expect(row.truth?.length ?? 0, `${row.row} carries no truth note`).toBeGreaterThan(0);
      }
      for (const row of uncovered) {
        expect(row.status, row.row).toBe("open");
        expect(OPEN_LABELS, row.row).toContain(row.label);
        expect(row.reason.length, row.row).toBeGreaterThan(0);
      }
    }
    for (const row of ROWS.filter((candidate) => candidate.half === undefined)) expect(row.merges, row.row).toBeUndefined();
  });

  it("A2/A3/U3: every row is pinned to a case that is registered exactly once, enabled and run by the default gate, or is an honest open row", () => {
    expect(auditAll(ROWS, readHead)).toEqual([]);
  });

  it("A3: no open row is counted passed, every pinned row without an injection stand-in carries a pass label, and unfiled gaps are exactly the listed ones", () => {
    const open = ROWS.filter((row) => row.status === "open");
    const pinned = ROWS.filter((row) => row.status === "pinned");
    expect(open.length + pinned.length).toBe(ROWS.length);
    for (const row of open) expect(OPEN_LABELS).toContain(row.label);
    for (const row of pinned) {
      if (row.injectsAt === undefined) expect(PASS_LABELS).toContain(row.label);
      else expect(row.label).toBe("code present");
    }
    expect(open.filter((row) => row.unfiled === true).map((row) => row.row)).toEqual(UNFILED_ROWS);
  });

  describe("tier truth (U3): the tier a row claims is the tier that really runs it", () => {
    const configWith = (transform: (config: string) => string): Reader => {
      return (file) => (file === VITEST_CONFIG ? transform(readHead(file)) : readHead(file));
    };

    it("T1: a pin file added to the vitest.config.ts exclude list goes red naming every row that pins it", () => {
      const reader = configWith((config) => config.replace('exclude: ["', `exclude: ["${OBSERVATION}", "`));
      expect(reader(VITEST_CONFIG)).not.toBe(readHead(VITEST_CONFIG));
      const problems = auditAll(ROWS, reader);
      for (const name of ["L4 ", "L5 "]) expect(problems.join("\n"), name).toContain(name);
      expect(problems.join("\n")).toContain("excluded by vitest.config.ts exclude");
      expect(problems.some((line) => line.startsWith("L1 "))).toBe(false);
    });

    it("T2: a narrowed include glob goes red for every pinned row", () => {
      const reader = configWith((config) => config.replace('include: ["test/**/*.test.ts"]', 'include: ["test/elsewhere/**/*.test.ts"]'));
      expect(reader(VITEST_CONFIG)).not.toBe(readHead(VITEST_CONFIG));
      const problems = auditAll(ROWS, reader).join("\n");
      for (const row of ROWS.filter((candidate) => candidate.pins.length > 0)) expect(problems, row.row).toContain(`${row.row} `);
      expect(problems).toContain("outside the vitest include globs");
    });

    it("T3: a missing or empty include list goes red instead of passing vacuously", () => {
      expect(vitestProblem("export default {};", OBSERVATION)).toContain("include list is missing");
    });

    it("T4: a forge command block that is renamed, or whose runner file is missing, goes red for the row that claims it", () => {
      const renamed: Reader = (file) => (file === FORGE_TOML ? readHead(file).replace("[build.commands.local-detached-faults]", "[build.commands.local-detached-faults-x]") : readHead(file));
      expect(auditRow(requireRow("L2b"), renamed).join("\n")).toContain("no [build.commands.local-detached-faults] block");
      const noRunner: Reader = (file) => {
        if (file === "qa/workbench/local-detached-shared-child.mjs") throw new Error("ENOENT");
        return readHead(file);
      };
      expect(auditRow(requireRow("L14b"), noRunner).join("\n")).toContain("runner qa/workbench/local-detached-shared-child.mjs does not exist");
    });

    it("T5: a static-text pin must say which forge command really injects, and may not claim fixture pass", () => {
      const l2b = requireRow("L2b");
      expect(auditRow(l2b, readHead)).toEqual([]);
      expect(auditRow({ ...l2b, truth: "static check" }, readHead).join("\n")).toContain("does not say the real injection runs under forge run local-detached-faults");
      expect(auditRow({ ...l2b, label: "fixture pass" }, readHead).join("\n")).toContain("is code present");
    });

    it("T6: the two forge-command rows name blocks that exist today", () => {
      expect(forgeCommandProblem(readHead(FORGE_TOML), "local-detached-faults", existsAtHead(readHead))).toBeUndefined();
      expect(forgeCommandProblem(readHead(FORGE_TOML), "local-detached-shared-child", existsAtHead(readHead))).toBeUndefined();
    });
  });

  describe("docs exactness (U4): the whole section body is pinned, so no list shape slips a sixth location in", () => {
    const docs = readHead(DOCS_14);
    const lastBullet = BULLETS[BULLETS.length - 1] ?? "";
    const withExtra = (extra: string): string => docs.replace(`- ${lastBullet}`, `- ${lastBullet}\n${extra}`);

    it("D1: a star bullet, D2: an indented dash, D3: a numbered item and D4: a prose line each go red", () => {
      for (const [mode, extra] of [
        ["D1", "* After the final snapshot"],
        ["D2", "  - After the final snapshot"],
        ["D3", "1. After the final snapshot"],
        ["D4", "After the final snapshot."],
      ] as const) {
        const mutated = withExtra(extra);
        expect(mutated, mode).not.toBe(docs);
        expect(docsProblems(mutated).join("\n"), mode).toContain("section drifted");
      }
    });

    it("D5: a blank line inside the list, D6: a sub-heading, D7: a reworded, reordered or deleted bullet each go red", () => {
      const mutations: Record<string, string> = {
        D5: docs.replace(`- ${BULLETS[0] ?? ""}\n`, `- ${BULLETS[0] ?? ""}\n\n`),
        D6: withExtra("### Appendix"),
        D7a: docs.replace("Before provider call", "Before the provider call"),
        D7b: docs.replace(`- ${BULLETS[0] ?? ""}\n- ${BULLETS[1] ?? ""}`, `- ${BULLETS[1] ?? ""}\n- ${BULLETS[0] ?? ""}`),
        D7c: docs.replace(`- ${BULLETS[3] ?? ""}\n`, ""),
      };
      for (const [mode, mutated] of Object.entries(mutations)) {
        expect(mutated, mode).not.toBe(docs);
        expect(docsProblems(mutated).length, mode).toBeGreaterThan(0);
      }
    });

    it("D8: a renamed or duplicated heading goes red", () => {
      expect(docsProblems(docs.replace("## Fault-injection locations", "## Fault injection locations")).join("\n")).toContain("missing or occurs more than once");
      expect(docsProblems(`${docs}\n## Fault-injection locations\n\n- extra\n`).join("\n")).toContain("missing or occurs more than once");
    });

    it("D9: text after the next heading does not count as part of the section", () => {
      expect(docsProblems(`${docs}\n\nTrailing prose under another heading is outside the section.\n`)).toEqual([]);
    });
  });

  describe("real-pin falsifiers: the census goes red, naming the row, when a landed pinned case is weakened", () => {
    const pinnedPairs = ROWS.flatMap((row) => row.pins.map((pin) => ({ row, pin })));

    it("covers every pinned case", () => {
      expect(pinnedPairs.length).toBe(ROWS.reduce((total, row) => total + row.pins.length, 0));
      expect(pinnedPairs.length).toBeGreaterThan(0);
    });

    for (const { row, pin } of pinnedPairs) {
      const quoted = JSON.stringify(pin.title);
      const single = `'${pin.title.replace(/'/g, "\\'")}'`;
      const callPattern = new RegExp(`\\b(it|test)(\\(\\s*)(${escapeRegExp(quoted)}|${escapeRegExp(single)})`);
      const mutate = (source: string, build: (fn: string, open: string, original: string) => string): string =>
        source.replace(callPattern, (_whole, fn: string, open: string, original: string) => build(fn, open, original));
      const reader = (transform: (source: string) => string): Reader => {
        return (file) => (file === pin.file ? transform(readHead(file)) : readHead(file));
      };
      const label = `${row.row}: ${pin.file} "${pin.title.slice(0, 40)}"`;
      const detects = (mode: string, transform: (source: string) => string): void => {
        const mutated = reader(transform);
        expect(mutated(pin.file) === readHead(pin.file), `${mode} mutation did not change the source`).toBe(false);
        expect(auditRow(row, mutated).join("\n"), mode).toContain(`${row.row} `);
      };

      it(`${label}: rename, deletion and duplication are detected`, () => {
        detects("rename", (source) => mutate(source, (fn, open) => `${fn}${open}${JSON.stringify(`${pin.title} (renamed)`)}`));
        detects("delete", (source) => mutate(source, (fn, open) => `${fn}${open}"a deleted case"`));
        detects("duplicate", (source) => `${source}\nit(${quoted}, () => {});\n`);
      });

      it(`${label}: every dot modifier (skip, todo, fails, focus) is detected`, () => {
        for (const modifier of ["skip", "todo", "fails", FOCUS_MODIFIER]) detects(modifier, (source) => mutate(source, (fn, open, original) => `${fn}.${modifier}${open}${original}`));
      });

      it(`${label}: a line comment-out, an options-object skip and a file hazard are detected`, () => {
        detects("comment-out", (source) => mutate(source, (fn, open, original) => `// ${fn}${open}${original}`));
        detects("options skip", (source) => mutate(source, (fn, open, original) => `${fn}${open}${original}, { skip: true }`));
        detects("describe.skip elsewhere", (source) => `${source}\ndescribe.skip("hazard", () => {});\n`);
        detects("ctx.skip", (source) => `${source}\nit("hazard", (ctx) => { ctx.skip(); });\n`);
      });
    }
  });

  describe("scanner falsifiers: one per skip mode, each red on a case vitest would no longer run", () => {
    const T = "keeps the guarantee";
    const U = "keeps the other guarantee";
    const suite = (inner: string): string => `describe("suite", () => {\n${inner}\n});\n`;
    const plain = `  it("${T}", () => {});`;

    it("controls: the plain case, a single-quoted case, a backtick case, an it.each case and an explicit skip false stay green", () => {
      expect(checkPin(suite(plain), T)).toBeUndefined();
      expect(checkPin(suite(`  it('${T}', () => {});`), T)).toBeUndefined();
      expect(checkPin(suite(`  it(\`${T}\`, () => {});`), T)).toBeUndefined();
      expect(checkPin(suite(`  it.each([1])("${T}", () => {});`), T)).toBeUndefined();
      expect(checkPin(suite(`  it("${T}", { skip: false }, () => {});`), T)).toBeUndefined();
      expect(checkPin(`it("${T}", () => {});\n`, T)).toBeUndefined();
      expect(checkPin(suite(`  it('it\\'s ${T}', () => {});`), `it's ${T}`)).toBeUndefined();
    });

    it("P1 rename and P2 deletion are NOT_FOUND and P3 a duplicate title is not exactly once", () => {
      expect(checkPin(suite(`  it("${T} renamed", () => {});`), T)).toBe(NOT_FOUND);
      expect(checkPin(suite(`  it("${U}", () => {});`), T)).toBe(NOT_FOUND);
      expect(checkPin(suite(`${plain}\n${plain}`), T)).toContain("2 times");
    });

    it("C1 it.skip, C2 it.concurrent.skip and C3 a focused case are caught as dot modifiers", () => {
      expect(checkPin(suite(`  it.skip("${T}", () => {});`), T)).toContain(".skip");
      expect(checkPin(suite(`  it.concurrent.skip("${T}", () => {});`), T)).toBe("case is disabled via .skip");
      expect(checkPin(suite(`  test.${FOCUS_MODIFIER}("${T}", () => {});`), T)).toContain(`.${FOCUS_MODIFIER}`);
      expect(checkPin(suite(`  it.todo("${T}");`), T)).toContain(".todo");
      expect(checkPin(suite(`  it.fails("${T}", () => {});`), T)).toContain(".fails");
    });

    it("S1 a line comment-out and S2 a block comment-out hide the case", () => {
      expect(checkPin(suite(`  // it("${T}", () => {});`), T)).toBe(NOT_FOUND);
      expect(checkPin(suite(`  /* it("${T}", () => {}); */`), T)).toBe(NOT_FOUND);
    });

    it("S3 { skip: true }, S4 { todo: true } and S5 { fails: true } options on the case are caught", () => {
      for (const option of ["skip", "todo", "fails"]) expect(checkPin(suite(`  it("${T}", { ${option}: true }, () => {});`), T), option).toContain(`option ${option}`);
    });

    it("S6 describe.skip, S7 describe.todo, S8 describe.skipIf(true) and S9 describe.runIf(false) around the case are caught", () => {
      for (const head of ["describe.skip", "describe.todo", "describe.skipIf(true)", "describe.runIf(false)"]) {
        const source = `${head}("wrapped", () => {\n${plain}\n});\n`;
        expect(checkPin(source, T), head).not.toBeUndefined();
      }
    });

    it("S6-S9 name the enclosing describe modifier, not only the file hazard", () => {
      expect(checkPin(`describe.skip("wrapped", () => {\n${plain}\n});\n`, T)).toBe("enclosing describe is .skip");
      expect(checkPin(`describe.skipIf(true)("wrapped", () => {\n${plain}\n});\n`, T)).toBe("enclosing describe is .skipIf");
      expect(checkPin(`describe.fails("wrapped", () => {\n${plain}\n});\n`, T)).toBe("enclosing describe is .fails");
    });

    it("S10 an options-object skip on the enclosing describe is caught, and fails every pin in that describe by name", () => {
      const source = `describe("wrapped", { skip: true }, () => {\n${plain}\n  it("${U}", () => {});\n});\n`;
      expect(checkPin(source, T)).toContain("skip:");
      expect(checkPin(source, U)).toContain("skip:");
    });

    it("S11 it.skipIf(true) and S12 it.runIf(false) are named skip modes on the pinned call itself", () => {
      expect(checkPin(suite(`  it.skipIf(true)("${T}", () => {});`), T)).toBe("case is disabled via .skipIf");
      expect(checkPin(suite(`  it.runIf(false)("${T}", () => {});`), T)).toBe("case is disabled via .runIf");
    });

    it("S13 ctx.skip(), a destructured skip() and context.skip() in a body fail every pin in the file", () => {
      for (const body of ["(ctx) => { ctx.skip(); }", "({ skip }) => { skip(); }", "(context) => { context.skip(); }"]) {
        const source = suite(`  it("${T}", ${body});\n  it("${U}", () => {});`);
        expect(checkPin(source, T), body).toContain("file hazard");
        expect(checkPin(source, U), body).toContain("file hazard");
      }
    });

    it("S14 a conditional registration is caught as a block that is not a describe callback", () => {
      expect(checkPin(suite(`  if (process.env.RUN_IT) {\n${plain}\n  }`), T)).toContain("conditional or unreachable registration");
      expect(checkPin(suite(`  for (const n of [1]) {\n${plain}\n  }`), T)).toContain("conditional or unreachable registration");
    });

    it("S15 a registration inside a wrapper that is never called is caught", () => {
      expect(checkPin(suite(`  const register = () => {\n${plain}\n  };`), T)).toContain("conditional or unreachable registration");
      expect(checkPin(`function register() {\n${plain}\n}\n`, T)).toContain("conditional or unreachable registration");
    });

    it("S16 a deleted case kept as a string-literal decoy, a title inside another case, or a title as a later argument is not a registration", () => {
      expect(checkPin(suite(`  const decoy = "${T}";\n  it("${U}", () => {});`), T)).toBe(NOT_FOUND);
      expect(checkPin(suite(`  it("${U}", () => { expect(log).toContain("${T}"); });`), T)).toBe(NOT_FOUND);
      expect(checkPin(suite(`  helper(1, "${T}");\n  it("${U}", () => {});`), T)).toBe(NOT_FOUND);
    });

    it("stays green for hazard words only in comments or strings, // inside a string, and a quote inside a regex literal", () => {
      expect(checkPin(suite(`  // describe.skip and ctx.skip() and it.${FOCUS_MODIFIER} are mentioned here\n${plain}`), T)).toBeUndefined();
      expect(checkPin(suite(`  const note = "it.skip( // not a comment";\n${plain}`), T)).toBeUndefined();
      expect(checkPin(suite(`  const quoteRegex = /["']/;\n${plain}`), T)).toBeUndefined();
      expect(checkPin(suite(`  /* it.${FOCUS_MODIFIER}("${T}") */\n${plain}`), T)).toBeUndefined();
    });

    it("a describe.each callback, an async callback and a function callback still count as registration scopes", () => {
      expect(checkPin(`describe.each([1])("scope %s", (n) => {\n${plain}\n});\n`, T)).toBeUndefined();
      expect(checkPin(`describe("scope", async () => {\n${plain}\n});\n`, T)).toBeUndefined();
      expect(checkPin(`describe("scope", function () {\n${plain}\n});\n`, T)).toBeUndefined();
      expect(checkPin(`describe("outer", () => {\n  describe("inner", () => {\n${plain}\n  });\n});\n`, T)).toBeUndefined();
    });
  });

  describe("table-level falsifiers: synthetic rows go red naming the row", () => {
    const base: Row = {
      row: "LX",
      location: "LX",
      text: "synthetic",
      quote: "x",
      label: "code present",
      tier: "default-gate",
      pins: [],
      status: "open",
      trackingBead: "wb-0kg.12",
      reason: "synthetic",
    };
    const livePin: Pin = { file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" };

    it("a pass label on an open row, a missing tracking bead, an unreceipted live label and an absent receipt each fail", () => {
      expect(auditRow(base, readHead)).toEqual([]);
      expect(auditRow({ ...base, label: "fixture pass" }, readHead).join("\n")).toContain("LX synthetic");
      expect(auditRow({ ...base, trackingBead: undefined }, readHead).join("\n")).toContain("no tracking bead");
      expect(auditRow({ ...base, unfiled: true }, readHead).join("\n")).toContain("both unfiled and names a tracking bead");
      expect(auditRow({ ...base, trackingBead: undefined, unfiled: true }, readHead)).toEqual([]);
      expect(auditRow({ ...base, reason: "" }, readHead).join("\n")).toContain("states no reason");
      expect(auditRow({ ...base, status: "pinned", label: "live SDK pass", pins: [livePin] }, readHead).join("\n")).toContain("cmd_ receipt");
      expect(auditRow({ ...base, status: "pinned", label: "live SDK pass", receipt: "cmd_000000000000", pins: [livePin] }, readHead).join("\n")).toContain("not present in TRACEABILITY");
    });

    it("a pinned row with no pin, a forge-command tier with no command, and a fixture pass on a forge-command tier each fail", () => {
      expect(auditRow({ ...base, status: "pinned", label: "fixture pass", trackingBead: undefined }, readHead).join("\n")).toContain("carries no pin");
      expect(auditRow({ ...base, tier: "forge-command" }, readHead).join("\n")).toContain("names no command");
      expect(auditRow({ ...base, status: "pinned", label: "fixture pass", tier: "forge-command", command: "local-detached-faults", pins: [livePin] }, readHead).join("\n")).toContain("fixture pass requires");
    });

    it("scanner reads a title written with a backslash and a quote inside the quoted form", () => {
      expect(checkPin('describe("s", () => {\n  it("say \\"hi\\" ok", () => {});\n});\n', 'say "hi" ok')).toBeUndefined();
    });
  });
});

function requireRow(id: string): Row {
  const found = ROWS.find((row) => row.row === id);
  if (found === undefined) throw new Error(`no census row ${id}`);
  return found;
}
