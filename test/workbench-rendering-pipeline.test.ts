/**
 * VC-5/W15 (wb-6ze.39): docs/workbench/10-terminal-inspector.md section "Rendering pipeline" census falsifier.
 *
 * Spec (verbatim): the nine "Rendering pipeline" bullets of docs/workbench/10, and
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates": "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 *
 * This file binds each bullet to existing cases by file and verbatim title. A rename, deletion, or skip/todo/only/fails
 * marker on a pinned case goes red naming the bullet, the file and the title; a docs edit that drops or rewrites a bullet
 * goes red naming it. A bullet (or half) with no existing case is recorded unpinned with a reason and is never counted
 * passed. Pinned cases are never executed here, and no live cadence, scale or performance pass is claimed from a title's
 * presence (the live redraw cadence is labelled UNMEASURED by wb-9x5.15).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DOC_PATH = "docs/workbench/10-terminal-inspector.md";

type Tier = "vitest" | "bench-receipt";
type Status = "pinned" | "partial" | "unpinned";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface Row {
  readonly n: number;
  readonly quote: string;
  readonly tier: Tier;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const INSPECTOR = "test/workbench-inspector.test.ts";
const WINDOW = "test/workbench-inspector-window.test.ts";
const BENCH = "test/workbench-reducer-selector-bench.test.ts";
const AGGREGATES = "test/workbench-observation-aggregates.test.ts";
const PERF = "test/workbench-observation-perf.test.ts";
const LOADER = "test/workbench-evidence-loader.test.ts";
const REPLIES = "test/workbench-tool-replies.test.ts";
const PI_REPLIES = "test/workbench-pi-tool-replies.test.ts";
const ATTENTION = "test/workbench-attention.test.ts";

const CENSUS: readonly Row[] = Object.freeze([
  {
    n: 1,
    quote: "Event burst coalescing (e.g. <=4 ordinary updates/s while active), not every token update.",
    tier: "vitest",
    status: "pinned",
    pins: [
      { file: INSPECTOR, title: "limits live ordinary redraw to four per second while native observations burst" },
      { file: BENCH, title: "keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock" },
    ],
    reason:
      "bench-receipt companion case: the cap never binds on 1s fixture ticks and the live scheduler is unmeasured (wb-9x5.15); presence-only, no live cadence claim",
  },
  {
    n: 2,
    quote: "Seconds-only clock tick <=1Hz and only for visible running rows.",
    tier: "vitest",
    status: "partial",
    pins: [{ file: INSPECTOR, title: "does not ask TUI for a redraw on every one-second tick of a settled observed run" }],
    reason: "only the settled-run half is pinned; no case binds the 'only for visible running rows' half",
  },
  {
    n: 3,
    quote: "No 80ms whole-dialog refresh under large-workload mode.",
    tier: "vitest",
    status: "unpinned",
    pins: [],
    reason: "no workbench falsifier exists (test/perf/widget.bench.ts is an upstream AgentWidget bench; test/workflow-dialog.test.ts has no large-workload refresh case)",
  },
  {
    n: 4,
    quote: "Pure layout and keyboard reducers are unit-tested without a TTY.",
    tier: "vitest",
    status: "pinned",
    pins: [
      { file: INSPECTOR, title: "Enter on the initially highlighted row collapses its observed relations; resize retains selected key" },
      {
        file: WINDOW,
        title: "paginates invocation-scoped nodes with total, monotonic revision, source-qualified identities and independent scope",
      },
    ],
    reason: "both suites run under vitest with no pty",
  },
  {
    n: 5,
    quote: "Avoid O(allHistory) collapse per frame; maintain by-node last projection and ancestor aggregates incrementally.",
    tier: "vitest",
    status: "pinned",
    pins: [
      { file: AGGREGATES, title: "A8: 100,000 status ingests over a 2,000-node 5-level tree visit only their ancestors and never rebuild" },
      { file: INSPECTOR, title: "does not allocate a full latest-node array on every rich redraw or key" },
      { file: BENCH, title: "accounts reducer calls and bounded reads, and records no full fold per redraw" },
    ],
  },
  {
    n: 6,
    quote: "Virtualized visible rows + modest overscan; expensive Markdown syntax parsing only for selected transcript slice.",
    tier: "vitest",
    status: "partial",
    pins: [{ file: INSPECTOR, title: "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18" }],
    reason: "only the virtualized-rows half is pinned; no workbench case binds Markdown parsing to the selected transcript slice",
  },
  {
    n: 7,
    quote: "Graph layout cached by topology revision; no force-directed re-layout in render method. For large graphs show aggregate supernodes first.",
    tier: "vitest",
    status: "partial",
    pins: [
      { file: WINDOW, title: "keeps updates stable but increments topology revision only for proven relation mutation" },
      { file: INSPECTOR, title: "adds a new observed edge on topology revision and reflects its provenance" },
    ],
    reason: "'aggregate supernodes first' is unpinned: wb-6ze.32 / wb-6ze.34 open",
  },
  {
    n: 8,
    quote: "Bound memory: store highlights/current snapshots; stream older event/traces lazily.",
    tier: "vitest",
    status: "pinned",
    pins: [
      { file: PERF, title: "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history" },
      { file: LOADER, title: "loads one ref lazily and idempotently while loading" },
    ],
  },
  {
    n: 9,
    quote: "Pi observation tools paginate/filter/limit and return compact JSON, never rendered ANSI.",
    tier: "vitest",
    status: "partial",
    pins: [
      { file: REPLIES, title: "pages with a stable cursor and covers every row exactly once" },
      { file: ATTENTION, title: "examines one 100-node page of 1,000 and keeps the report compact" },
      { file: PI_REPLIES, title: "sanitizes hostile descriptor text: ANSI, bidi and secrets never reach the model (F3)" },
    ],
    reason: "paginate (catalog reply), compact (attention report) and ANSI-free halves are pinned on separate surfaces; no single case binds all of paginate/filter/limit plus compact JSON for the observation tools",
  },
]);

type Marker = "skip" | "todo" | "only" | "fails" | "skipIf" | "runIf";

interface Occurrence {
  readonly marker: Marker | null;
}

const CALL = /\b(?:it|test)((?:\.[A-Za-z]+(?:\([^)]*\))?)*)\(\s*(['"`])((?:\\.|(?!\2)[^\\\n])*)\2/g;

function unescapeTitle(raw: string): string {
  return raw.replace(/\\(['"`\\])/g, "$1");
}

function markerOf(chain: string): Marker | null {
  const match = /\.(skip|todo|only|fails|skipIf|runIf)\b/.exec(chain);
  return match ? (match[1] as Marker) : null;
}

function locateCases(source: string, title: string): Occurrence[] {
  const found: Occurrence[] = [];
  for (const match of source.matchAll(CALL)) {
    if (unescapeTitle(match[3] ?? "") === title) {
      found.push({ marker: markerOf(match[1] ?? "") });
    }
  }
  return found;
}

function describeDisabling(source: string): string[] {
  return source
    .split("\n")
    .filter(line => /\bdescribe\.(?:skip|todo|only|fails|skipIf|runIf)\b/.test(line))
    .map(line => line.trim());
}

/** Rewrite the single call carrying `title` in a copy of the source: new modifier chain and new title text. */
function rewriteCall(
  source: string,
  title: string,
  mutate: (chain: string, quote: string) => { chain: string; title: string },
): string {
  for (const match of source.matchAll(CALL)) {
    if (unescapeTitle(match[3] ?? "") !== title) continue;
    const head = match[0];
    const fn = /^(?:it|test)/.exec(head)?.[0] ?? "it";
    const quote = match[2] ?? "'";
    const next = mutate(match[1] ?? "", quote);
    const replaced = `${fn}${next.chain}(${quote}${next.title}${quote}`;
    const at = match.index ?? 0;
    return source.slice(0, at) + replaced + source.slice(at + head.length);
  }
  return source;
}

/** One failure string per violated clause, naming bullet, file and title; empty when the pin holds. */
function checkPin(row: Row, pin: Pin, source: string): string[] {
  const where = `bullet ${row.n} ${pin.file} "${pin.title}"`;
  const found = locateCases(source, pin.title);
  if (found.length === 0) return [`${where}: no it()/test() with this exact title (renamed or deleted)`];
  if (found.length > 1) return [`${where}: title appears ${found.length} times, expected exactly once`];
  const marker = found[0]?.marker ?? null;
  const problems: string[] = [];
  if (marker) problems.push(`${where}: case is marked .${marker}`);
  const suiteLevel = describeDisabling(source);
  if (suiteLevel.length > 0) problems.push(`${where}: suite carries a disabling describe marker (${suiteLevel[0]})`);
  return problems;
}

function readRepo(path: string): string {
  return readFileSync(`${ROOT}${path}`, "utf8");
}

function renderingPipelineBullets(doc: string): string[] {
  const start = doc.indexOf("\n## Rendering pipeline\n");
  if (start < 0) return [];
  const rest = doc.slice(start + 1);
  const next = rest.indexOf("\n## ", 4);
  const section = next < 0 ? rest : rest.slice(0, next);
  return section
    .split("\n")
    .filter(line => line.startsWith("- "))
    .map(line => line.slice(2).trimEnd());
}

describe("VC-5/W15 docs/workbench/10 'Rendering pipeline' census (wb-6ze.39)", () => {
  it("the census table is frozen at nine rows with the verbatim bullet quotes in docs order", () => {
    expect(Object.isFrozen(CENSUS)).toBe(true);
    expect(CENSUS.map(row => row.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(CENSUS.map(row => row.quote)).toEqual(renderingPipelineBullets(readRepo(DOC_PATH)));
  });

  it("docs/workbench/10 still states exactly the nine bullets verbatim, naming any dropped or rewritten one", () => {
    const bullets = renderingPipelineBullets(readRepo(DOC_PATH));
    const missing = CENSUS.filter(row => !bullets.includes(row.quote)).map(row => `bullet ${row.n}: ${row.quote}`);
    expect(missing).toEqual([]);
    expect(bullets).toHaveLength(9);
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

  describe("every pinned title exists exactly once, enabled, in its file at HEAD", () => {
    for (const row of CENSUS) {
      for (const pin of row.pins) {
        it(`bullet ${row.n}: ${pin.file} "${pin.title}"`, () => {
          expect(checkPin(row, pin, readRepo(pin.file))).toEqual([]);
        });
      }
    }
  });

  describe("mutation table: each pinned row goes red naming bullet, file and title under rename, delete and skip", () => {
    for (const row of CENSUS) {
      for (const pin of row.pins) {
        const source = readRepo(pin.file);
        const renamed = rewriteCall(source, pin.title, () => ({ chain: "", title: "renamed away" }));
        const deleted = rewriteCall(source, pin.title, () => ({ chain: "", title: "" }));
        const skipped = rewriteCall(source, pin.title, () => ({ chain: ".skip", title: pin.title }));
        const only = rewriteCall(source, pin.title, () => ({ chain: ".only", title: pin.title }));
        for (const [label, mutated] of [
          ["renamed", renamed],
          ["deleted", deleted],
          ["skipped", skipped],
          ["only", only],
        ] as const) {
          it(`bullet ${row.n} ${label}: ${pin.file} "${pin.title.slice(0, 48)}"`, () => {
            expect(mutated).not.toBe(source);
            const problems = checkPin(row, pin, mutated);
            expect(problems.length).toBeGreaterThan(0);
            expect(problems.join("\n")).toContain(`bullet ${row.n} ${pin.file} "${pin.title}"`);
          });
        }
      }
    }
  });

  describe("scanner self-checks on synthetic sources", () => {
    const row: Row = { n: 0, quote: "q", tier: "vitest", status: "pinned", pins: [] };
    const pin: Pin = { file: "x.test.ts", title: "keeps the cap" };
    it("accepts one enabled case in any quote style and rejects duplicates, markers and suite-level skips", () => {
      expect(checkPin(row, pin, `it('keeps the cap',()=>{});`)).toEqual([]);
      expect(checkPin(row, pin, `test("keeps the cap", () => {});`)).toEqual([]);
      expect(checkPin(row, pin, "it(`keeps the cap`, () => {});")).toEqual([]);
      expect(checkPin(row, pin, `it("keeps the cap",()=>{});it("keeps the cap",()=>{});`)[0]).toContain("2 times");
      expect(checkPin(row, pin, `it.fails("keeps the cap",()=>{});`)[0]).toContain(".fails");
      expect(checkPin(row, pin, `it.todo("keeps the cap");`)[0]).toContain(".todo");
      expect(checkPin(row, pin, `it.skipIf(true)("keeps the cap",()=>{});`)[0]).toContain(".skipIf");
      expect(checkPin(row, pin, `describe.skip("s",()=>{it("keeps the cap",()=>{});});`)[0]).toContain("describe marker");
      expect(checkPin(row, pin, `it("keeps the cap too",()=>{});`)[0]).toContain("renamed or deleted");
    });
  });
});
