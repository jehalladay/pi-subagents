/**
 * wb-6hb.6 (W06 / VC-2): docs/workbench/06 "Conformance tests" census falsifier.
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package must have a falsifier:
 * a negative test that would fail if a critical guarantee was quietly weakened." The five bullets of
 * docs/workbench/06-capability-registry.md "Conformance tests" are embodied by existing cases, but
 * nothing bound the sentences to them. This census freezes that binding: a rename, deletion or
 * .skip/.todo/.fails/.only of a pinned case, or a docs edit that drops or rewrites a bullet, goes red
 * naming the bullet, file and title.
 *
 * It only READS the pinned files as text. It never executes the pinned cases and never claims a live,
 * native or scale pass from a title's presence: a title's presence proves a case is still named and
 * enabled, nothing more. Bullets (or halves of bullets) with no existing case are recorded as
 * 'partial' or 'unpinned' with a reason and are never counted as passed.
 * Limitation (stated, not hidden): a describe-level skip is caught only as a blanket refusal of any
 * describe.skip/todo/fails/only in a pinned file; a skip inherited through other mechanisms is not.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_FILE = "docs/workbench/06-capability-registry.md";
const VITEST_CONFIG = "vitest.config.ts";

type Tier = "default-gate" | "live-tier";
type Status = "pinned" | "partial" | "unpinned";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface ConformanceRow {
  readonly bullet: number;
  /** The docs/06 bullet, verbatim (without the list marker). */
  readonly quote: string;
  /** 'live-tier' when any pinned file is excluded from the default vitest gate. */
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  readonly status: Status;
  /** Required for 'partial' and 'unpinned': names the unbound half and the owning bead where one exists. */
  readonly reason?: string;
}

const ROWS: readonly ConformanceRow[] = Object.freeze([
  {
    bullet: 1,
    quote: "Same capability in workflow node() and Pi invocation uses identical authorization and input contracts.",
    tier: "default-gate",
    status: "partial",
    reason:
      "cross-surface parity (one capability through node() and through Pi invocation, identical contracts) is the wb-6hb.4 falsifier (in flight, not on trunk); these pins bind each surface's authorization and input boundary separately, not their equality",
    pins: [
      { file: "test/workbench-node-contract.test.ts", title: "L4: unauthorized invocation denied at host even with known capability id" },
      { file: "test/workbench-registry-auth.test.ts", title: "copies caller grants before asynchronous dispatch and never escalates another caller" },
      { file: "test/workbench-registry-auth.test.ts", title: "closes the script-side raw RPC vehicle while host authorization stays typed" },
      { file: "test/workbench-security-workflow.test.ts", title: "node() refuses grant/identity options before dispatching to a host capability" },
    ],
  },
  {
    bullet: 2,
    quote: "Read-only agent cannot invoke write capability even if it knows ID.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-registry-auth.test.ts", title: "discovery alone exposes detached metadata but cannot invoke or inspect" },
      { file: "test/workbench-registry-auth.test.ts", title: "permission-free providers still require an explicit invocation grant" },
      { file: "test/workbench-security-capability.test.ts", title: "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused" },
      { file: "test/workbench-node-contract.test.ts", title: "L4: unauthorized invocation denied at host even with known capability id" },
    ],
  },
  {
    bullet: 3,
    quote: "Missing native SDK/provider is explicit error, not silent CLI fallback.",
    tier: "live-tier",
    status: "partial",
    reason:
      "the explicit-error half is pinned (the ecosystem-native case is excluded from the default gate and runs only in the native tier); the no-silent-CLI-fallback falsifier itself is wb-cax.5 (in flight, not on trunk), so that half is unpinned",
    pins: [
      { file: "test/workbench-ecosystem-native.test.ts", title: "Furnace inspect preserves a missing Run as a typed unavailable refusal" },
      { file: "test/workbench-furnace-hosted.test.ts", title: "refuses to start when the SDK cannot decode execution contexts, before any socket, client or Run exists" },
    ],
  },
  {
    bullet: 4,
    quote: "Unknown effects never auto-retry after disconnect.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-node-contract.test.ts", title: "L4: effectful invocation with lost response is reported uncertain, never automatically retried" },
      { file: "test/workbench-claude-capability-tools.test.ts", title: "explicit effectful fixture retains uncertain-effect on oversized output and never retries" },
      { file: "test/workbench-furnace-control.test.ts", title: "stops waiting at the bound, discards the late answer and never re-issues the verb" },
      { file: "test/workbench-detached-faults-receipt.test.ts", title: "requires the unknown inspection to carry source, observation and a never-retry reconcile hint" },
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
      { file: "test/workbench-validate-reply.test.ts", title: "a digest mismatch is its own typed refusal, never a warning, and the core never runs" },
      { file: "test/workbench-patch-proposal.test.ts", title: "pins the experiment to source digests and refuses a base that does not match its bytes first" },
      { file: "test/workbench-identity.test.ts", title: "rejects lockfile changes, missing artifact and lockfile/manifest mismatch" },
    ],
  },
]);

type FileReader = (file: string) => string;
const readRepoFile: FileReader = (file) => readFileSync(join(ROOT, file), "utf8");

// ---- pure census core (exercised against the real files and against in-memory mutants) ----

const CASE_CALL = /\b(?:it|test)((?:\.[A-Za-z]+)*)\(\s*(["'`])/g;
const DISABLING = ["skip", "todo", "fails", "only"] as const;
const DISABLED_DESCRIBE = /\bdescribe\.(?:skip|todo|fails|only)\b/;

interface CaseHit {
  readonly modifiers: readonly string[];
  /** Index of the first character of the title literal. */
  readonly titleStart: number;
  /** Index of the first character of the callee ("it" or "test"). */
  readonly calleeStart: number;
  /** Index just after the callee name, where a modifier would be spliced. */
  readonly calleeEnd: number;
}

function literalAt(source: string, start: number, quote: string): string {
  let end = start;
  while (end < source.length && source[end] !== quote) end += source[end] === "\\" ? 2 : 1;
  return source.slice(start, end);
}

function findCases(source: string, title: string): CaseHit[] {
  const hits: CaseHit[] = [];
  for (const match of source.matchAll(CASE_CALL)) {
    const quote = match[2] ?? "";
    const titleStart = match.index + match[0].length;
    if (literalAt(source, titleStart, quote) !== title) continue;
    const modifiers = (match[1] ?? "").split(".").filter((part) => part.length > 0);
    const calleeLength = match[0].search(/[.(]/);
    hits.push({ modifiers, titleStart, calleeStart: match.index, calleeEnd: match.index + calleeLength });
  }
  return hits;
}

/** Why a pin no longer binds, or undefined when it still names exactly one enabled case. */
function pinProblem(source: string, title: string): string | undefined {
  const hits = findCases(source, title);
  if (hits.length === 0) return "title is absent (renamed or deleted)";
  if (hits.length > 1) return `title occurs ${hits.length} times (must be exactly once)`;
  const disabled = (hits[0]?.modifiers ?? []).filter((modifier) => (DISABLING as readonly string[]).includes(modifier));
  if (disabled.length > 0) return `case is disabled by .${disabled.join(".")}`;
  if (DISABLED_DESCRIBE.test(source)) return "pinned file contains a describe.skip/todo/fails/only";
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

type Mutation = "rename" | "delete" | "skip";

function mutate(source: string, title: string, mutation: Mutation): string {
  const hit = findCases(source, title)[0];
  if (hit === undefined) throw new Error(`cannot mutate absent title: ${title}`);
  if (mutation === "rename") return `${source.slice(0, hit.titleStart)}RENAMED ${source.slice(hit.titleStart)}`;
  if (mutation === "skip") return `${source.slice(0, hit.calleeEnd)}.skip${source.slice(hit.calleeEnd)}`;
  const lineStart = source.lastIndexOf("\n", hit.calleeStart) + 1;
  const lineEnd = source.indexOf("\n", hit.titleStart);
  return `${source.slice(0, lineStart)}${source.slice(lineEnd === -1 ? source.length : lineEnd)}`;
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
    const config = readRepoFile(VITEST_CONFIG);
    for (const row of ROWS) {
      const outside = row.pins.some((pin) => config.includes(`"${pin.file}"`));
      expect(row.tier, `bullet ${row.bullet}: tier must reflect default-gate membership of its pinned files`).toBe(outside ? "live-tier" : "default-gate");
    }
  });

  it("keeps every pinned case present exactly once and enabled in its file at HEAD", () => {
    const problems = ROWS.flatMap((row) => rowProblems(row, readRepoFile));
    expect(problems).toEqual([]);
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
