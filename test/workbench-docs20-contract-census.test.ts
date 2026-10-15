/** wb-6ze.40 (VC-5/W15): census falsifier for docs/workbench/20-evidence-loader-contract.md.
 * Binds each "Producer mapping" table row and each "Refusal and freshness rules" sentence to an existing case by
 * file, verbatim title and tier, or to an unpinned-with-reason entry. The census reads source text only: it never
 * executes a pinned case and never claims a pass (live or native) from a title being present. A rename, deletion
 * or skip of a pinned case goes red naming the row. */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");
const DOC = "docs/workbench/20-evidence-loader-contract.md";

/** Only offline tiers exist here: a pinned title proves a case is declared, never that it ran green, live or native. */
type Tier = "offline-unit" | "offline-wiring";
const TIERS: readonly Tier[] = ["offline-unit", "offline-wiring"];

interface Pin {
  readonly file: string;
  readonly title: string;
  readonly tier: Tier;
}
interface CensusRow {
  readonly id: string;
  /** Verbatim text the doc must still contain (first table cell for producer rows, the sentence for rules). */
  readonly quote: string;
  readonly pins: readonly Pin[];
  /** Present only when the row has no pin; a row with neither pins nor a reason fails. */
  readonly unpinned?: string;
}

const LOADER = "test/workbench-evidence-loader.test.ts";
const WIRING = "test/workbench-evidence-wiring.test.ts";
const FURNACE = "test/workbench-furnace-evidence.test.ts";
const FORGE = "test/workbench-forge-evidence.test.ts";
const INSPECTOR = "test/workbench-inspector.test.ts";

const PRODUCER_ROWS: readonly CensusRow[] = [
  {
    id: "producer:claude-agent-sdk-session",
    quote: "claude-agent-sdk session",
    pins: [
      { file: LOADER, title: "claude: with the grant it selects the row by uuid; a revoked grant refuses on the next load", tier: "offline-unit" },
      { file: LOADER, title: "claude: a uuid outside the bounded window is transport, never a fabricated row", tier: "offline-unit" },
      { file: WIRING, title: "loads a claude transcript row under the live grant and refuses after revocation", tier: "offline-wiring" },
    ],
  },
  {
    id: "producer:furnace-run",
    quote: "furnace run",
    pins: [
      { file: FURNACE, title: "loads a complete stderr read of a listed Attempt as furnace.attempt.log evidence with the producer receipt", tier: "offline-unit" },
      { file: LOADER, title: "furnace: lossy, incomplete or paged reads are loaded with truncated true", tier: "offline-unit" },
      { file: LOADER, title: "furnace: an attempt belonging to another run is unauthorized, without its text", tier: "offline-unit" },
    ],
  },
  {
    id: "producer:forge-operation",
    quote: "forge operation",
    pins: [
      { file: FORGE, title: "C1: a valid ref re-reads exactly once through the injected seam and loads EvidenceContent-shaped data", tier: "offline-unit" },
      { file: FORGE, title: "C2: a failed gate loads as its own failed status, never verified", tier: "offline-unit" },
      { file: LOADER, title: "forge: only validated forge-operation refs resolve; a partial read is truncated", tier: "offline-unit" },
    ],
  },
  {
    id: "producer:anything-else",
    quote: "anything else",
    pins: [
      { file: LOADER, title: "routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader", tier: "offline-unit" },
      { file: WIRING, title: "renders a forge operation ref as the visible no-loader unknown when the host supplies no registry", tier: "offline-wiring" },
    ],
  },
];
const RULE_ROWS: readonly CensusRow[] = [
  {
    id: "rule:no-loader",
    quote: "Unknown producer or ref kind: no-loader, ref stays listed sanitized.",
    pins: [
      { file: LOADER, title: "routes by nativeRef.provider first, then canLoad; anything else is a visible no-loader", tier: "offline-unit" },
      { file: WIRING, title: "renders a forge operation ref as the visible no-loader unknown when the host supplies no registry", tier: "offline-wiring" },
    ],
  },
  {
    id: "rule:unauthorized",
    quote: "Scope mismatch or missing/revoked exact grant: unauthorized.",
    pins: [
      { file: LOADER, title: "refuses a cross-scope ref as unauthorized without invoking any loader", tier: "offline-unit" },
      { file: LOADER, title: "builds a loader for each supplied reader; without its exact grant every load refuses unauthorized and reads nothing", tier: "offline-unit" },
      { file: FORGE, title: "C3: only the exact forge:inspect grant loads; everything else is an authorization denial with a spy-proven untouched seam", tier: "offline-unit" },
      { file: FORGE, title: "C3: the live grant set is re-read on every load, so mid-view revocation refuses", tier: "offline-unit" },
    ],
  },
  {
    id: "rule:stale-and-transport-plus-stale",
    quote: "Stale or disconnected owning nodes label loaded evidence stale; a failed read against a disconnected source is transport plus stale.",
    pins: [
      { file: INSPECTOR, title: "A14 a stale or disconnected owner labels loaded evidence stale and a failed read as transport plus stale", tier: "offline-unit" },
      { file: FORGE, title: "C2: a stale or disconnected owner labels loaded evidence stale; a current owner labels it current", tier: "offline-unit" },
      { file: FORGE, title: "C2: a failed read against a disconnected owner is transport plus stale", tier: "offline-unit" },
      { file: WIRING, title: "labels a forge read stale when the owning node is stale and truncated when the reader bounded it", tier: "offline-wiring" },
    ],
  },
  {
    id: "rule:loaded-never-upgrades-freshness",
    quote: "A loaded entry never upgrades projection freshness and never changes node status text or tone.",
    pins: [
      { file: INSPECTOR, title: "A6 a loaded entry never changes status text, tone glyph or the confirmed/definition lines", tier: "offline-unit" },
    ],
  },
  {
    id: "rule:transport-never-verification",
    quote: "Transport success never implies verification.",
    pins: [
      { file: FURNACE, title: "%s states no verdict, status, tone or outcome, and freshness only as current", tier: "offline-unit" },
      { file: FORGE, title: "C2: a failed gate loads as its own failed status, never verified", tier: "offline-unit" },
      { file: FORGE, title: "C2: a partial COULD_NOT_JUDGE verdict loads as its own partial status, never verified", tier: "offline-unit" },
    ],
  },
];

type CaseState = "active" | "skipped" | "absent";

/** Local scanner: declared case titles of a vitest source, split into active and skipped declarations. */
function declaredTitles(source: string): { readonly active: ReadonlySet<string>; readonly skipped: ReadonlySet<string> } {
  const quoted = String.raw`(["'\x60])((?:\\.|(?!\1)[^\\\n])*)\1`;
  const active = new Set<string>();
  const skipped = new Set<string>();
  const grab = (pattern: RegExp, into: Set<string>): void => {
    for (const match of source.matchAll(pattern)) into.add(unescapeTitle(match[2] ?? ""));
  };
  grab(new RegExp(String.raw`\b(?:it|test)\(\s*${quoted}`, "g"), active);
  grab(new RegExp(String.raw`\)\(\s*${quoted}\s*,\s*(?:async\s*)?\(`, "g"), active);
  grab(new RegExp(String.raw`\b(?:it|test)\.(?:skip|todo|skipIf\([^)]*\)|fails)\(\s*${quoted}`, "g"), skipped);
  grab(new RegExp(String.raw`\b(?:it|test)\.(?:skip|todo)\.each\([\s\S]*?\)\(\s*${quoted}`, "g"), skipped);
  return { active, skipped };
}
function unescapeTitle(raw: string): string {
  return raw.replace(/\\(['"`\\])/g, "$1");
}
function stateOf(source: string, title: string): CaseState {
  const { active, skipped } = declaredTitles(source);
  if (skipped.has(title)) return "skipped";
  return active.has(title) ? "active" : "absent";
}

function section(markdown: string, heading: string): string {
  const start = markdown.indexOf(`\n## ${heading}\n`);
  if (start < 0) throw new Error(`docs/20 section missing: ${heading}`);
  const rest = markdown.slice(start + 1);
  const next = rest.indexOf("\n## ", 1);
  return next < 0 ? rest : rest.slice(0, next);
}
function producerCells(markdown: string): string[] {
  const rows = section(markdown, "Producer mapping")
    .split("\n")
    .filter(line => line.startsWith("|"))
    .slice(2);
  return rows.map(line => (line.split("|")[1] ?? "").trim());
}
function ruleSentences(markdown: string): string[] {
  const body = section(markdown, "Refusal and freshness rules").split("\n").slice(1).join(" ").trim();
  return body.split(/(?<=\.)\s+/).filter(sentence => sentence.length > 0);
}

/** Verdict for a row: every failure names the row id. Returns an empty list only when every pin is declared and active. */
function violations(row: CensusRow, read: (file: string) => string): string[] {
  const out: string[] = [];
  if (row.pins.length === 0) {
    if (!row.unpinned || row.unpinned.trim().length === 0) out.push(`${row.id}: neither a pin nor an unpinned reason`);
    return out;
  }
  if (row.unpinned) out.push(`${row.id}: carries both pins and an unpinned reason`);
  for (const pin of row.pins) {
    if (!TIERS.includes(pin.tier)) out.push(`${row.id}: tier ${String(pin.tier)} is not an offline tier`);
    if (!pin.file.startsWith("test/")) out.push(`${row.id}: ${pin.file} is not under test/`);
    const state = stateOf(read(pin.file), pin.title);
    if (state !== "active") out.push(`${row.id}: pinned case ${state} in ${pin.file}: ${pin.title}`);
  }
  return out;
}

const readRepo = (file: string): string => readFileSync(resolve(ROOT, file), "utf8");
const doc = readFileSync(resolve(ROOT, DOC), "utf8");

describe("docs/workbench/20 evidence-loader contract census (wb-6ze.40)", () => {
  it("the Producer mapping table still has exactly the four producer rows the census binds", () => {
    expect(producerCells(doc)).toEqual(["claude-agent-sdk session", "furnace run", "forge operation", "anything else"]);
    expect(PRODUCER_ROWS.map(row => row.quote)).toEqual(producerCells(doc));
  });

  it("Refusal and freshness rules still has exactly the five sentences the census binds", () => {
    expect(ruleSentences(doc)).toHaveLength(5);
    expect(RULE_ROWS.map(row => row.quote)).toEqual(ruleSentences(doc));
  });

  it.each([...PRODUCER_ROWS, ...RULE_ROWS].map(row => [row.id, row] as const))("%s is pinned to existing active cases or honestly unpinned", (_id, row) => {
    expect(violations(row, readRepo)).toEqual([]);
  });

  it("no row is counted as passed while unpinned, and the report claims presence only", () => {
    const rows = [...PRODUCER_ROWS, ...RULE_ROWS];
    const unpinned = rows.filter(row => row.pins.length === 0);
    const pinned = rows.filter(row => row.pins.length > 0);
    expect(pinned.length + unpinned.length).toBe(9);
    for (const row of unpinned) expect(row.unpinned?.length ?? 0).toBeGreaterThan(0);
    for (const row of pinned) for (const pin of row.pins) expect(TIERS).toContain(pin.tier);
  });

  describe("scanner mutants: a rename, deletion or skip of a pinned case goes red naming the row", () => {
    const source = [
      'describe("x", () => {',
      '  it("alpha case", () => {});',
      '  it.each([1])("beta %s case", () => {});',
      '  it("quoted \\"gamma\\" case", async () => {});',
      '  it.skip("delta case", () => {});',
      "  it.todo('epsilon case');",
      "});",
    ].join("\n");
    const read = (): string => source;
    const row = (title: string): CensusRow => ({ id: "row-x", quote: "q", pins: [{ file: "test/f.test.ts", title, tier: "offline-unit" }] });

    it("accepts declared active titles, including it.each and escaped quotes", () => {
      for (const title of ["alpha case", "beta %s case", 'quoted "gamma" case']) expect(violations(row(title), read)).toEqual([]);
    });
    it("a renamed or deleted case is absent and names the row", () => {
      expect(violations(row("alpha case renamed"), read)).toEqual(["row-x: pinned case absent in test/f.test.ts: alpha case renamed"]);
    });
    it("a skipped or todo case is red, never active", () => {
      expect(violations(row("delta case"), read)).toEqual(["row-x: pinned case skipped in test/f.test.ts: delta case"]);
      expect(stateOf(source, "epsilon case")).toBe("skipped");
    });
    it("a non-offline tier, a non-test file, and an empty row each fail", () => {
      const tier = { id: "r", quote: "q", pins: [{ file: "test/f.test.ts", title: "alpha case", tier: "live" as unknown as Tier }] } satisfies CensusRow;
      expect(violations(tier, read)).toEqual(["r: tier live is not an offline tier"]);
      const file = { id: "r", quote: "q", pins: [{ file: "src/f.ts", title: "alpha case", tier: "offline-unit" as const }] } satisfies CensusRow;
      expect(violations(file, read)).toEqual(["r: src/f.ts is not under test/"]);
      expect(violations({ id: "r", quote: "q", pins: [] }, read)).toEqual(["r: neither a pin nor an unpinned reason"]);
      expect(violations({ id: "r", quote: "q", pins: [], unpinned: "reason" }, read)).toEqual([]);
    });
  });

  it("reads the pinned files as text only", () => {
    expect([LOADER, WIRING, FURNACE, FORGE, INSPECTOR].every(file => readRepo(file).length > 0)).toBe(true);
  });
});
