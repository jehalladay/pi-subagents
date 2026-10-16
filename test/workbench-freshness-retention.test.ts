import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import vitestConfig from "../vitest.config";

/**
 * Census falsifier for the docs/workbench/09 sections "Freshness and ambiguity"
 * and "Data retention and privacy" (wb-752.14, VC-4/W14).
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package
 * must have a falsifier: a negative test that would fail if a critical guarantee
 * was quietly weakened."
 *
 * The eight docs/09 sentences are bound, as one frozen table, to the existing
 * cases that carry them: by repo-relative file and VERBATIM it()/test() title.
 *
 * Detection is reporter-verified, not text-matched. The pinned suites are loaded
 * by a COLLECT-ONLY child run (vitest list --json=<outfile>, which executes no
 * case); a pinned title must appear in that listing exactly once. The reporter
 * drops a case that is commented out, renamed, deleted, skipped, todo'd, parked
 * behind a describe modifier, conditionally registered, shadowed or wrapped in
 * an empty table, so none of those can leave this census green. The listing
 * carries no mode, so three things a collect-only run cannot see are checked
 * lexically on the located call: a dotted or expression call head, a skip/todo/
 * fails/only OPTION in an options argument, and a skip call in the case body.
 *
 * Disclosed limits (never claimed as covered): a skip reached through a dynamic
 * alias the lexical body check does not spell (for example a computed property
 * name), a sentence that stays in the docs paragraph but is qualified by a NEW
 * following paragraph in docs/14, and everything this file does not execute: it
 * never runs a pinned case and claims no live, native or scale pass from a title
 * being present. A sentence (or half) with no case is recorded unpinned or
 * partial with its reason and is never counted as passed.
 */

type Section = "Freshness and ambiguity" | "Data retention and privacy";
type Tier = "default-gate" | "bench-receipt";
type Status = "pinned" | "unpinned" | "partial";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface Row {
  readonly n: number;
  readonly section: Section;
  readonly quote: string;
  readonly tier: Tier;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly reason?: string;
  /** For tier bench-receipt only: the forge.toml [build.commands.<name>] that runs the pins. */
  readonly command?: string;
}

const DOC_09 = "docs/workbench/09-observation-and-provenance.md";
const DOC_14 = "docs/workbench/14-qa-and-benchmarks.md";
const DOC_14_SECTION = "Truth labels and release gates";
const FALSIFIER_QUOTE =
  "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const ROWS: readonly Row[] = Object.freeze([
  {
    n: 1,
    section: "Freshness and ambiguity",
    quote: "Each projection node includes lastConfirmedAt, observedAt, sourceConnectionState, sourceCursor and completeness label.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-observation.test.ts", title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot" },
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
      { file: "test/workbench-detached-observer.test.ts", title: "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference" },
    ],
    reason:
      "No single case names all five fields. Covered: freshness and lastConfirmedAt (observation :29), sourceConnectionState (observation :43), observedAt and the coverage/completeness value on a detached reading (detached-observer :49). sourceCursor on a projection node has no asserting case at the re-cut base (its only test mention is a forbidden-term list in test/workbench-timeline.test.ts), so the five-field claim stays partial.",
  },
  {
    n: 2,
    section: "Freshness and ambiguity",
    quote: "UI shows STALE/UNKNOWN visibly.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-inspector.test.ts", title: "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner" },
      { file: "test/workbench-attention.test.ts", title: "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone" },
    ],
  },
  {
    n: 3,
    section: "Freshness and ambiguity",
    quote: "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-furnace-observer.test.ts", title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING" },
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
    ],
  },
  {
    n: 4,
    section: "Freshness and ambiguity",
    quote: "Pi tool summaries must communicate that nuance.",
    tier: "default-gate",
    status: "partial",
    pins: [
      {
        file: "test/workbench-observe-query.test.ts",
        title: "O2 speaks last-known-running + stale after a Furnace disconnect and keeps native status text beside the tone",
      },
    ],
    reason:
      "The pure reply builder (wb-752.2, closed) is pinned by its O2 case, which cites this very sentence. The Pi tool wiring half is unpinned: at the re-cut base wb-752.9 is in_progress and wb-752.13 is open, and test/workbench-security-pi-tools.test.ts holds no stale-summary assertion. Flip the wiring half to pinned in the same commit that lands its first case.",
  },
  {
    n: 5,
    section: "Data retention and privacy",
    quote: "Short hot window in memory (configurable); optional local/private disk cache for diagnostics and reattachment.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-observation-perf.test.ts", title: "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history" },
      { file: "test/workbench-observation-recovery-receipt.test.ts", title: "keeps the only maxNodes literal inside the bench-only pass object, so the default pass never raises a cap" },
    ],
    reason:
      "The in-memory hot window is pinned by two default-gate vitest cases (both files are matched by the vitest include and not excluded, verified by the tier-truth pin below; the nearby forge.toml command observation-recovery-bench is a separate bench-receipt run these rows do not claim). The optional local/private disk cache half is unpinned: optional, no disk-cache code exists under src/workbench at the re-cut base, so no case exists to bind.",
  },
  {
    n: 6,
    section: "Data retention and privacy",
    quote: "Avoid raw prompts/tool bodies by default; store reference/short redacted preview, encrypt where required by deployment.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-hyperunix-observer.test.ts", title: "H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references" },
      { file: "test/workbench-forge-evidence.test.ts", title: "C4: producer text is redacted and stripped, and no raw payload member is retained" },
      { file: "test/workbench-detached-observer.test.ts", title: "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference" },
    ],
    reason:
      "Reference-not-body and redacted preview are pinned for the HyperUnix, Forge-evidence and detached readers. test/workbench-claude-observer.test.ts registers two cases at the re-cut base and neither asserts that bodies are never retained, so the Claude observer stays unpinned; the encrypt-where-required clause is deployment-owned with no case.",
  },
  {
    n: 7,
    section: "Data retention and privacy",
    quote: "Providers own transcript/artifact retention; UI fetches full text lazily subject to permission.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-evidence-loader.test.ts", title: "loads one ref lazily and idempotently while loading" },
      { file: "test/workbench-evidence-loader.test.ts", title: "claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves" },
    ],
  },
  {
    n: 8,
    section: "Data retention and privacy",
    quote: "Tenant/workspace boundaries apply at correlation queries, not just at individual SDK calls.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-topology-slice.test.ts", title: "never reads another tenant's relations and refuses a focus key outside the caller scope" },
      { file: "test/workbench-security-capability.test.ts", title: "Furnace provider must not return a foreign workspace's Run record" },
      { file: "test/workbench-reconcile-decision.test.ts", title: "denies cross-scope with the observe tool's exact text for a missing task and a foreign scope alike" },
    ],
  },
]);

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const VITEST_BIN = resolve(REPO_ROOT, "node_modules/vitest/vitest.mjs");
const SPAWN_TIMEOUT_MS = 90_000;

function readRepoFile(relative: string): string {
  return readFileSync(resolve(REPO_ROOT, relative), "utf8");
}

/* ------------------------------------------------------------------ */
/* Collect-only reporter                                               */
/* ------------------------------------------------------------------ */

interface ListedCase {
  readonly name: string;
  readonly file: string;
}

interface ListResult {
  readonly status: number | null;
  readonly stderr: string;
  readonly cases: readonly ListedCase[];
}

function isListedCase(value: unknown): value is ListedCase {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.file === "string";
}

function childEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith("VITEST")) env[key] = value;
  }
  return env;
}

let listCounter = 0;

/**
 * Runs `vitest list --json=<outfile>` (the = form: a space-separated path is written
 * into by the CLI) in a child process. Collect-only: no case body is executed.
 */
function vitestList(outDir: string, cwd: string, filters: readonly string[], extra: readonly string[]): ListResult {
  listCounter += 1;
  const outFile = join(outDir, `list-${listCounter}.json`);
  const run = spawnSync(process.execPath, [VITEST_BIN, "list", ...filters, ...extra, `--json=${outFile}`], {
    cwd,
    env: childEnv(),
    encoding: "utf8",
    timeout: SPAWN_TIMEOUT_MS,
  });
  let cases: ListedCase[] = [];
  try {
    const parsed: unknown = JSON.parse(readFileSync(outFile, "utf8"));
    if (Array.isArray(parsed)) cases = parsed.filter(isListedCase);
  } catch {
    cases = [];
  }
  return { status: run.status, stderr: `${run.stderr ?? ""}${run.error ? String(run.error) : ""}`, cases };
}

/* ------------------------------------------------------------------ */
/* Lexical scanner for the located call (string, template and comment aware) */
/* ------------------------------------------------------------------ */

const REGEX_PREFIX = "(,=:[!&|?{};";

function skipQuoted(s: string, at: number): number {
  const quote = s[at];
  let i = at + 1;
  while (i < s.length) {
    if (s[i] === "\\") i += 2;
    else if (s[i] === quote) return i + 1;
    else i += 1;
  }
  return s.length;
}

/** Scans from `start` to the unmatched closer at depth 0; records top-level commas in `commas`. */
function skipCode(s: string, start: number, commas?: number[]): number | undefined {
  let depth = 0;
  let prev = "";
  let i = start;
  while (i < s.length) {
    const c = s[i] ?? "";
    const next = s[i + 1] ?? "";
    if (c === "/" && next === "/") {
      const eol = s.indexOf("\n", i);
      i = eol < 0 ? s.length : eol;
      continue;
    }
    if (c === "/" && next === "*") {
      const end = s.indexOf("*/", i + 2);
      i = end < 0 ? s.length : end + 2;
      continue;
    }
    if (c === "'" || c === '"') {
      i = skipQuoted(s, i);
      prev = c;
      continue;
    }
    if (c === "`") {
      i += 1;
      while (i < s.length) {
        if (s[i] === "\\") i += 2;
        else if (s[i] === "`") {
          i += 1;
          break;
        } else if (s[i] === "$" && s[i + 1] === "{") {
          const close = skipCode(s, i + 2);
          if (close === undefined) return undefined;
          i = close + 1;
        } else i += 1;
      }
      prev = "`";
      continue;
    }
    if (c === "/" && (prev === "" || REGEX_PREFIX.includes(prev))) {
      i += 1;
      let inClass = false;
      while (i < s.length) {
        if (s[i] === "\\") i += 2;
        else if (s[i] === "[") {
          inClass = true;
          i += 1;
        } else if (s[i] === "]") {
          inClass = false;
          i += 1;
        } else if (s[i] === "/" && !inClass) {
          i += 1;
          break;
        } else i += 1;
      }
      prev = "/";
      continue;
    }
    if (c === "(" || c === "[" || c === "{") depth += 1;
    else if (c === ")" || c === "]" || c === "}") {
      if (depth === 0) return i;
      depth -= 1;
    } else if (c === "," && depth === 0 && commas) commas.push(i);
    if (!/\s/u.test(c)) prev = c;
    i += 1;
  }
  return undefined;
}

/** Top-level argument texts of the call whose "(" is at `open`; undefined when unbalanced. */
function callArguments(source: string, open: number): readonly string[] | undefined {
  const commas: number[] = [];
  const end = skipCode(source, open + 1, commas);
  if (end === undefined) return undefined;
  const bounds = [open, ...commas, end];
  const args: string[] = [];
  for (let k = 0; k + 1 < bounds.length; k += 1) args.push(source.slice((bounds[k] ?? 0) + 1, bounds[k + 1]));
  return args;
}

/* ------------------------------------------------------------------ */
/* Pin audit                                                           */
/* ------------------------------------------------------------------ */

const OPTION_MODIFIER = /\b(skip|todo|fails|only)\b\s*(?::\s*(?!false\b)|[,}])/u;
const RUNTIME_SKIP = /\bskip\s*\(|\[\s*["']skip["']\s*\]/u;
const HEAD_MODIFIER = /\b(?:it|test)((?:\s*\.\s*[A-Za-z]+)*)$/u;
const ALLOWED_HEAD_MODIFIERS = new Set(["concurrent", "sequential"]);

/** Blanks every comment (same length, so offsets survive) so a commented-out call is never located. */
function maskComments(s: string): string {
  let out = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i] ?? "";
    const next = s[i + 1] ?? "";
    if (c === "/" && next === "/") {
      const eol = s.indexOf("\n", i);
      const end = eol < 0 ? s.length : eol;
      out += " ".repeat(end - i);
      i = end;
    } else if (c === "/" && next === "*") {
      const close = s.indexOf("*/", i + 2);
      const end = close < 0 ? s.length : close + 2;
      out += s.slice(i, end).replace(/[^\n]/gu, " ");
      i = end;
    } else if (c === "'" || c === '"' || c === "`") {
      let j = i + 1;
      while (j < s.length && s[j] !== c) j += s[j] === "\\" ? 2 : 1;
      out += s.slice(i, j + 1);
      i = j + 1;
    } else {
      out += c;
      i += 1;
    }
  }
  return out;
}

function titleLiterals(title: string): string[] {
  return ["'", '"', "`"].map((quote) => `${quote}${title}${quote}`);
}

/**
 * Returns a problem string beginning with a [category] tag for one pinned title, or
 * undefined when the reporter lists it exactly once and the located call is a plain,
 * undisabled it()/test(). `file` is the real path the reporter prints.
 */
function auditPin(listing: readonly ListedCase[], file: string, source: string, title: string): string | undefined {
  const listed = listing.filter((entry) => entry.file === file && (entry.name === title || entry.name.endsWith(` > ${title}`)));
  if (listed.length === 0) {
    return "[not-registered] the collect-only listing has no such case (renamed, deleted, commented out, skipped, todo'd, parked behind a describe modifier, conditionally registered, shadowed or wrapped in an empty table)";
  }
  if (listed.length > 1) return `[duplicate] the collect-only listing has ${listed.length} such cases, expected exactly one`;

  const code = maskComments(source);
  const opens: number[] = [];
  for (const literal of titleLiterals(title)) {
    let from = 0;
    for (;;) {
      const at = code.indexOf(literal, from);
      if (at < 0) break;
      from = at + literal.length;
      const before = code.slice(0, at).trimEnd();
      if (before.endsWith("(")) opens.push(before.length - 1);
    }
  }
  if (opens.length !== 1) return `[source-unlocated] the title is a call argument ${opens.length} times in the source, expected exactly once`;
  const open = opens[0] ?? 0;
  const head = code.slice(0, open).trimEnd();
  if (/[)\]]$/u.test(head)) return "[call-head-modifier] the call head is a modifier expression, not a plain it()/test()";
  const headMatch = HEAD_MODIFIER.exec(head);
  if (!headMatch) return "[call-head] the call head is not a plain it()/test() (aliased or shadowed binding)";
  const modifiers = (headMatch[1] ?? "").split(".").map((part) => part.trim()).filter((part) => part.length > 0);
  const blocked = modifiers.filter((part) => !ALLOWED_HEAD_MODIFIERS.has(part));
  if (blocked.length > 0) return `[call-head-modifier] the call head carries .${blocked.join(".")}`;

  const args = callArguments(code, open);
  if (!args) return "[source-unbalanced] the pinned call could not be scanned to its closing parenthesis";
  for (const arg of args.slice(1)) {
    const text = arg.trim();
    if (text.startsWith("{")) {
      const option = OPTION_MODIFIER.exec(text);
      if (option) return `[options-modifier] the options argument sets ${option[1]}`;
    } else if (RUNTIME_SKIP.test(text)) {
      return "[runtime-skip] the case body calls skip() (a runtime skip the collect-only run cannot see)";
    }
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Tier truth                                                          */
/* ------------------------------------------------------------------ */

interface GateConfig {
  readonly include: readonly string[];
  readonly exclude: readonly string[];
}

function globToRegExp(glob: string): RegExp {
  let out = "";
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i] ?? "";
    if (c === "*" && glob[i + 1] === "*") {
      if (glob[i + 2] === "/") {
        out += "(?:.*/)?";
        i += 2;
      } else {
        out += ".*";
        i += 1;
      }
    } else if (c === "*") out += "[^/]*";
    else out += c.replace(/[.+^${}()|[\]\\?]/gu, "\\$&");
  }
  return new RegExp(`^${out}$`, "u");
}

function matchesAny(patterns: readonly string[], file: string): boolean {
  return patterns.some((pattern) => globToRegExp(pattern).test(file));
}

function gateConfigOf(config: unknown): GateConfig {
  const test = (config as { test?: { include?: unknown; exclude?: unknown } }).test ?? {};
  const strings = (value: unknown): readonly string[] => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
  return { include: strings(test.include), exclude: strings(test.exclude) };
}

/** A tier label is a claim about the gate config: verify it, never carry it from prose. */
function auditTier(row: Row, gate: GateConfig, forgeToml: string): string | undefined {
  if (row.tier === "default-gate") {
    for (const pin of row.pins) {
      if (!matchesAny(gate.include, pin.file)) return `[tier-truth] sentence ${row.n} is labelled default-gate but ${pin.file} is not matched by the vitest include`;
      if (matchesAny(gate.exclude, pin.file)) return `[tier-truth] sentence ${row.n} is labelled default-gate but ${pin.file} is excluded from the vitest run`;
    }
    return undefined;
  }
  if (!row.command) return `[tier-truth] sentence ${row.n} is labelled bench-receipt but names no forge.toml command`;
  if (!forgeToml.includes(`[build.commands.${row.command}]`)) return `[tier-truth] sentence ${row.n} names forge.toml command ${row.command}, which does not exist`;
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Docs exactness                                                      */
/* ------------------------------------------------------------------ */

function sectionLines(doc: string, heading: string): string[] | undefined {
  const lines = doc.split("\n");
  const at = lines.findIndex((line) => line === `## ${heading}`);
  if (at < 0) return undefined;
  const rest = lines.slice(at + 1);
  const next = rest.findIndex((line) => line.startsWith("## "));
  return next < 0 ? rest : rest.slice(0, next);
}

/** The exact non-blank body of a docs/09 section, derived from the frozen sentence table. */
function expectedBody(section: Section): string {
  return ROWS.filter((row) => row.section === section).map((row) => row.quote).join(" ");
}

function auditDocs(doc09: string, doc14: string): string[] {
  const problems: string[] = [];
  for (const section of ["Freshness and ambiguity", "Data retention and privacy"] as const) {
    const lines = sectionLines(doc09, section);
    if (!lines) {
      problems.push(`[docs-heading] ${DOC_09} has no line exactly "## ${section}"`);
      continue;
    }
    const body = lines.filter((line) => line.trim().length > 0).join("\n");
    if (body !== expectedBody(section)) problems.push(`[docs-section] ${DOC_09} section "${section}" is not the exact frozen sentence body`);
  }
  const falsifier = sectionLines(doc14, DOC_14_SECTION);
  if (!falsifier) problems.push(`[docs-heading] ${DOC_14} has no line exactly "## ${DOC_14_SECTION}"`);
  else {
    const paragraphs = falsifier.join("\n").split(/\n\s*\n/u).map((paragraph) => paragraph.trim());
    const home = paragraphs.find((paragraph) => paragraph.includes(FALSIFIER_QUOTE));
    if (!home) problems.push(`[docs-falsifier] ${DOC_14} section "${DOC_14_SECTION}" no longer carries the falsifier sentence`);
    else if (!(home === FALSIFIER_QUOTE || home.endsWith(`. ${FALSIFIER_QUOTE}`))) {
      problems.push(`[docs-falsifier] the falsifier sentence is no longer a whole, paragraph-final sentence (qualified before or after) in ${DOC_14}`);
    }
  }
  return problems;
}

/* ------------------------------------------------------------------ */
/* Shared fixtures                                                     */
/* ------------------------------------------------------------------ */

const PINNED_FILES = [...new Set(ROWS.flatMap((row) => row.pins.map((pin) => pin.file)))].sort();
let scratchDir = "";
let realListing: ListResult | undefined;

beforeAll(() => {
  scratchDir = mkdtempSync(join(tmpdir(), "fr752-"));
  realListing = vitestList(scratchDir, REPO_ROOT, PINNED_FILES, []);
}, SPAWN_TIMEOUT_MS + 10_000);

afterAll(() => {
  if (scratchDir) rmSync(scratchDir, { recursive: true, force: true });
});

describe("docs/09 freshness-and-retention census (wb-752.14)", () => {
  it("freezes exactly eight rows numbered 1..8 in docs order, two sections, valid tier and status", () => {
    expect(Object.isFrozen(ROWS)).toBe(true);
    expect(ROWS.map((row) => row.n)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(ROWS.filter((row) => row.section === "Freshness and ambiguity").map((row) => row.n)).toStrictEqual([1, 2, 3, 4]);
    expect(ROWS.filter((row) => row.section === "Data retention and privacy").map((row) => row.n)).toStrictEqual([5, 6, 7, 8]);
    for (const row of ROWS) {
      expect(["default-gate", "bench-receipt"], `sentence ${row.n} tier`).toContain(row.tier);
      expect(["pinned", "unpinned", "partial"], `sentence ${row.n} status`).toContain(row.status);
    }
  });

  it("classifies honestly: pinned rows carry pins and no reason, partial rows carry both, unpinned rows carry a reason and no pin", () => {
    for (const row of ROWS) {
      if (row.status === "pinned") {
        expect(row.pins.length, `sentence ${row.n} is pinned and needs at least one pin`).toBeGreaterThan(0);
        expect(row.reason, `sentence ${row.n} is pinned and must not carry a reason`).toBeUndefined();
      } else if (row.status === "partial") {
        expect(row.pins.length, `sentence ${row.n} is partial and needs at least one pin`).toBeGreaterThan(0);
        expect((row.reason ?? "").length, `sentence ${row.n} is partial and needs a reason`).toBeGreaterThan(40);
      } else {
        expect(row.pins, `sentence ${row.n} is unpinned and must carry no pin`).toStrictEqual([]);
        expect((row.reason ?? "").length, `sentence ${row.n} is unpinned and needs a reason`).toBeGreaterThan(40);
      }
    }
    expect(ROWS.filter((row) => row.status !== "pinned").map((row) => row.n)).toStrictEqual([1, 4, 5, 6]);
  });

  describe("docs exactness", () => {
    it("docs/09 sections are the exact frozen sentence bodies and docs/14 keeps the falsifier sentence whole inside its section", () => {
      expect(auditDocs(readRepoFile(DOC_09), readRepoFile(DOC_14))).toStrictEqual([]);
    });

    for (const row of ROWS) {
      it(`sentence ${row.n} is a whole sentence of the "${row.section}" frozen body`, () => {
        const body = expectedBody(row.section);
        expect(body.startsWith(row.quote) || body.includes(`. ${row.quote}`), `sentence ${row.n} is not at a sentence boundary of its section`).toBe(true);
      });
    }
  });

  describe("tier truth", () => {
    it("every row's tier label is verified against the vitest config (include/exclude) and forge.toml", () => {
      const gate = gateConfigOf(vitestConfig);
      expect(gate.include.length, "vitest include must be readable from vitest.config.ts").toBeGreaterThan(0);
      const forgeToml = readRepoFile("forge.toml");
      for (const row of ROWS) {
        const problem = auditTier(row, gate, forgeToml);
        expect(problem, `${problem ?? ""}`).toBeUndefined();
      }
    });
  });

  describe("pinned cases (collect-only reporter)", () => {
    it("the collect-only child run over every pinned suite succeeds", () => {
      expect(realListing, "beforeAll did not run").toBeDefined();
      expect(realListing?.status, `vitest list failed (a focused .only under allowOnly:false fails it): ${realListing?.stderr.slice(-400) ?? ""}`).toBe(0);
      expect(realListing?.cases.length ?? 0).toBeGreaterThan(0);
    });

    for (const row of ROWS) {
      for (const pin of row.pins) {
        it(`sentence ${row.n} (${row.tier}, ${row.status}): ${pin.file} lists one live case "${pin.title}"`, () => {
          const listing = realListing;
          expect(listing, "beforeAll did not run").toBeDefined();
          const absolute = realpathSync(resolve(REPO_ROOT, pin.file));
          const problem = auditPin(listing?.cases ?? [], absolute, readRepoFile(pin.file), pin.title);
          expect(problem, `sentence ${row.n}: ${pin.file} :: ${pin.title}: ${problem ?? ""}`).toBeUndefined();
        });
      }
    }
  });

  describe("the scanner is falsifiable: one realistic in-file mutant per skip mode, run through the real collect-only reporter", () => {
    interface Mutant {
      readonly id: string;
      readonly label: string;
      readonly source: string;
      /** undefined = must stay green; otherwise the [category] the audit must name. */
      readonly red: string | undefined;
    }

    const T = "pinned case";
    const body = "() => { expect(1).toBe(1); }";
    const wrap = (inner: string): string => `describe("suite", () => {\n${inner}\n});\n`;
    const intact = wrap(`  it("${T}", ${body});\n  it("sibling", ${body});`);

    const MUTANTS: readonly Mutant[] = [
      { id: "C0", label: "intact control", source: intact, red: undefined },
      { id: "C1", label: "rename", source: wrap(`  it("${T} renamed", ${body});`), red: "not-registered" },
      { id: "C2", label: "delete", source: wrap(`  it("sibling", ${body});`), red: "not-registered" },
      { id: "C3", label: "it.skip", source: wrap(`  it.skip("${T}", ${body});`), red: "not-registered" },
      { id: "C4", label: "it.todo", source: wrap(`  it.todo("${T}");`), red: "not-registered" },
      { id: "C5", label: "it.skipIf(true)", source: wrap(`  it.skipIf(true)("${T}", ${body});`), red: "not-registered" },
      { id: "C6", label: "describe.skip", source: `describe.skip("suite", () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "C7", label: "multi-line it newline .skip", source: wrap(`  it\n    .skip("${T}", ${body});`), red: "not-registered" },
      { id: "C8", label: "it.runIf(false)", source: wrap(`  it.runIf(false)("${T}", ${body});`), red: "not-registered" },
      { id: "C10", label: 'it["skip"]', source: wrap(`  it["skip"]("${T}", ${body});`), red: "not-registered" },
      { id: "S1", label: "line comment-out of the whole case", source: wrap(`  // it("${T}", ${body});\n  it("sibling", ${body});`), red: "not-registered" },
      { id: "S2", label: "block comment around the case", source: wrap(`  /* it("${T}", ${body}); */\n  it("sibling", ${body});`), red: "not-registered" },
      { id: "S3", label: "options { skip: true }", source: wrap(`  it("${T}", { skip: true }, ${body});`), red: "not-registered" },
      { id: "S4", label: "options { todo: true }", source: wrap(`  it("${T}", { todo: true }, ${body});`), red: "not-registered" },
      { id: "S5", label: "options { fails: true } as the second argument (polarity inverted)", source: wrap(`  it("${T}", { fails: true }, ${body});`), red: "options-modifier" },
      { id: "S5b", label: "options { fails: true } on a failing body (the broken case reports PASS)", source: wrap(`  it("${T}", { fails: true }, () => { expect(1).toBe(2); });`), red: "options-modifier" },
      { id: "S6", label: "enclosing describe options { skip: true }", source: `describe("suite", { skip: true }, () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "S7", label: "describe.skipIf(true)", source: `describe.skipIf(true)("suite", () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "S8", label: "describe.runIf(false)", source: `describe.runIf(false)("suite", () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "S9", label: "suite.skip alias", source: `suite.skip("suite", () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "S10", label: "aliased describe parked on skip", source: `const parked = describe["skip"];\nparked("suite", () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "S11", label: "ctx.skip() inside the body", source: wrap(`  it("${T}", (ctx) => { ctx.skip(); });`), red: "runtime-skip" },
      { id: "S12", label: "destructured skip() inside the body", source: wrap(`  it("${T}", ({ skip }) => { skip(); });`), red: "runtime-skip" },
      { id: "S13", label: "conditional registration behind a never-set env var", source: wrap(`  if (process.env.FR752_NEVER_SET_FLAG) {\n    it("${T}", ${body});\n  }`), red: "not-registered" },
      { id: "S14", label: "registration inside a never-called wrapper", source: wrap(`  const register = () => {\n    it("${T}", ${body});\n  };\n  void register;`), red: "not-registered" },
      { id: "S15", label: "case deleted behind a template-literal title decoy", source: wrap(`  const decoy = \`${T}\`;\n  void decoy;\n  it("sibling", ${body});`), red: "not-registered" },
      { id: "S16", label: "shadowed it binding parked on skip", source: wrap(`  const it = test["skip"];\n  it("${T}", ${body});`), red: "not-registered" },
      { id: "S17", label: "enclosing describe.each([]) with an empty table", source: `describe.each([])("suite %s", () => {\n  it("${T}", ${body});\n});\n`, red: "not-registered" },
      { id: "P1", label: "it.concurrent still runs (precision control, stays green)", source: wrap(`  it.concurrent("${T}", ${body});`), red: undefined },
      { id: "P3", label: "a comment that mentions it.skip while the case runs (precision control, stays green)", source: wrap(`  // note: this was once it.skip("${T}")\n  it("${T}", ${body});`), red: undefined },
      { id: "P2", label: "it.runIf(true) runs but is refused conservatively (safe direction)", source: wrap(`  it.runIf(true)("${T}", ${body});`), red: "call-head-modifier" },
      { id: "D1", label: "duplicated registration", source: wrap(`  it("${T}", ${body});\n  it("${T}", ${body});`), red: "duplicate" },
    ];

    const ONLY_MUTANTS: readonly Mutant[] = [
      { id: "C9", label: "sibling it.only", source: wrap(`  it("${T}", ${body});\n  it.only("sibling", ${body});`), red: "listing-failed" },
      { id: "C9b", label: "describe.only around a sibling suite", source: `describe("suite", () => {\n  it("${T}", ${body});\n});\ndescribe.only("other", () => {\n  it("x", ${body});\n});\n`, red: "listing-failed" },
    ];

    const outcomes = new Map<string, string | undefined>();

    function scratchRun(dir: string, files: readonly string[]): ListResult {
      writeFileSync(join(dir, "vitest.config.mjs"), 'export default { test: { globals: true, allowOnly: false, include: ["**/*.test.ts"] } };\n');
      return vitestList(dir, dir, files, [`--config=${join(dir, "vitest.config.mjs")}`, `--root=${dir}`]);
    }

    beforeAll(() => {
      const dir = join(scratchDir, "mutants");
      mkdirSync(dir, { recursive: true });
      for (const mutant of MUTANTS) writeFileSync(join(dir, `m-${mutant.id}.test.ts`), mutant.source);
      const batch = scratchRun(dir, MUTANTS.map((mutant) => `m-${mutant.id}.test.ts`));
      if (batch.status !== 0) throw new Error(`mutant collect-only run failed: ${batch.stderr.slice(-400)}`);
      for (const mutant of MUTANTS) {
        const file = join(realpathSync(dir), `m-${mutant.id}.test.ts`);
        outcomes.set(mutant.id, auditPin(batch.cases, file, mutant.source, T));
      }
      for (const mutant of ONLY_MUTANTS) {
        const solo = join(scratchDir, `only-${mutant.id}`);
        mkdirSync(solo, { recursive: true });
        writeFileSync(join(solo, `m-${mutant.id}.test.ts`), mutant.source);
        const run = scratchRun(solo, [`m-${mutant.id}.test.ts`]);
        outcomes.set(mutant.id, run.status === 0 ? undefined : "[listing-failed] the collect-only run failed under allowOnly:false");
      }
    }, SPAWN_TIMEOUT_MS * 2 + 20_000);

    for (const mutant of [...MUTANTS, ...ONLY_MUTANTS]) {
      it(`${mutant.id} ${mutant.label}: ${mutant.red === undefined ? "stays green" : `goes red as [${mutant.red}]`}`, () => {
        expect(outcomes.has(mutant.id), "mutant was not executed").toBe(true);
        const problem = outcomes.get(mutant.id);
        if (mutant.red === undefined) expect(problem, `${mutant.id} must stay green`).toBeUndefined();
        else {
          expect(problem, `${mutant.id} must go red as [${mutant.red}]`).toBeDefined();
          expect(problem ?? "", `${mutant.id} must name its category`).toContain(`[${mutant.red}]`);
        }
      });
    }

    it("the scratch harness really executed nothing: mutant sources never ran a case (collect-only)", () => {
      expect(outcomes.size).toBe(MUTANTS.length + ONLY_MUTANTS.length);
    });
  });

  describe("tier-truth mutants (the label is verified, not enumerated)", () => {
    const gate = gateConfigOf(vitestConfig);
    const forgeToml = readRepoFile("forge.toml");
    const row5 = ROWS[4] as Row;

    it("T0 the real row 5 passes", () => {
      expect(auditTier(row5, gate, forgeToml)).toBeUndefined();
    });

    it("T1 a pinned file added to the vitest exclude list goes red [tier-truth]", () => {
      const pinned = row5.pins[0]?.file ?? "";
      expect(auditTier(row5, { include: gate.include, exclude: [...gate.exclude, pinned] }, forgeToml)).toContain("[tier-truth]");
    });

    it("T1b a pinned file outside the vitest include goes red [tier-truth]", () => {
      expect(auditTier(row5, { include: ["qa/**/*.test.ts"], exclude: gate.exclude }, forgeToml)).toContain("[tier-truth]");
    });

    it("T2 a default-gate row flipped to bench-receipt with no forge.toml command goes red [tier-truth]", () => {
      expect(auditTier({ ...row5, tier: "bench-receipt" }, gate, forgeToml)).toContain("[tier-truth]");
    });

    it("T2b a bench-receipt row naming a command that does not exist goes red [tier-truth]", () => {
      expect(auditTier({ ...row5, tier: "bench-receipt", command: "no-such-command" }, gate, forgeToml)).toContain("[tier-truth]");
    });

    it("T2c a bench-receipt row naming a real forge.toml command is accepted", () => {
      expect(auditTier({ ...row5, tier: "bench-receipt", command: "observation-recovery-bench" }, gate, forgeToml)).toBeUndefined();
    });
  });

  describe("docs mutants (slice equality, not sentence presence)", () => {
    const doc09 = readRepoFile(DOC_09);
    const doc14 = readRepoFile(DOC_14);
    const quote = (n: number): string => (ROWS[n - 1] as Row).quote;

    interface DocMutant {
      readonly id: string;
      readonly label: string;
      readonly doc: 9 | 14;
      readonly mutate: (text: string) => string;
      readonly tag: string;
    }

    const DOC_MUTANTS: readonly DocMutant[] = [
      { id: "D1", label: "qualifier sentence inserted after sentence 2", doc: 9, mutate: (t) => t.replace(quote(2), `${quote(2)} Except where space is tight.`), tag: "docs-section" },
      { id: "D2", label: "trailing scope-weakening sentence after sentence 8", doc: 9, mutate: (t) => t.replace(quote(8), `${quote(8)} This applies to hosted deployments only.`), tag: "docs-section" },
      { id: "D3", label: 'heading suffix "(non-normative)"', doc: 9, mutate: (t) => t.replace("## Freshness and ambiguity", "## Freshness and ambiguity (non-normative)"), tag: "docs-heading" },
      { id: "D4", label: "heading demoted to ###", doc: 9, mutate: (t) => t.replace("## Data retention and privacy", "### Data retention and privacy"), tag: "docs-heading" },
      {
        id: "D5",
        label: "contradicting paragraph appended to the Freshness section",
        doc: 9,
        mutate: (t) => t.replace("\n## Aggregates and profiling", "\nLive nodes need not carry freshness fields.\n\n## Aggregates and profiling"),
        tag: "docs-section",
      },
      {
        id: "D6",
        label: "sentence 3 negated by a trailing clause",
        doc: 9,
        mutate: (t) => t.replace("it becomes last-known-running + stale.", "it becomes last-known-running + stale, unless a newer snapshot is pending."),
        tag: "docs-section",
      },
      { id: "D7", label: "docs/14 falsifier rule qualified by a following sentence", doc: 14, mutate: (t) => t.replace(FALSIFIER_QUOTE, `${FALSIFIER_QUOTE} Waived for docs-only packages.`), tag: "docs-falsifier" },
      {
        id: "D8",
        label: "docs/14 falsifier rule moved out of its section to an appendix",
        doc: 14,
        mutate: (t) => `${t.replace(` ${FALSIFIER_QUOTE}`, "")}\n## Appendix\n\n${FALSIFIER_QUOTE}\n`,
        tag: "docs-falsifier",
      },
      { id: "DC1", label: "control: sentence 2 deleted", doc: 9, mutate: (t) => t.replace(` ${quote(2)}`, ""), tag: "docs-section" },
      { id: "DC2", label: "control: sentence 2 prefixed", doc: 9, mutate: (t) => t.replace(quote(2), `Usually, ${quote(2)}`), tag: "docs-section" },
      {
        id: "DC3",
        label: "control: sentence 8 moved into the other section",
        doc: 9,
        mutate: (t) => t.replace(` ${quote(8)}`, "").replace(quote(4), `${quote(4)} ${quote(8)}`),
        tag: "docs-section",
      },
    ];

    it("the unmutated docs are green (control)", () => {
      expect(auditDocs(doc09, doc14)).toStrictEqual([]);
    });

    for (const mutant of DOC_MUTANTS) {
      it(`${mutant.id} ${mutant.label} goes red [${mutant.tag}]`, () => {
        const original = mutant.doc === 9 ? doc09 : doc14;
        const mutated = mutant.mutate(original);
        expect(mutated, `${mutant.id} must actually change the docs text`).not.toBe(original);
        const problems = mutant.doc === 9 ? auditDocs(mutated, doc14) : auditDocs(doc09, mutated);
        expect(problems.length, `${mutant.id} must go red`).toBeGreaterThan(0);
        expect(problems.join("\n"), `${mutant.id} must name its category`).toContain(`[${mutant.tag}]`);
      });
    }
  });
});
