/**
 * VC-5/W15 (wb-6ze.38): docs/workbench/10-terminal-inspector.md "Failure and deception defenses" census falsifier.
 *
 * The five docs/10 honesty sentences are each bound to landed fixture cases by file + verbatim title. The census
 * reads the pinned test files as TEXT at HEAD and never executes a pinned case, so it claims only the docs/14
 * truth label "fixture pass". A rename, deletion, duplicate or it.skip / it.todo / it.fails / it.only of any
 * pinned case turns the defense's row red by name, so the docs/10 claim cannot be quietly weakened. A row with
 * no landed case is recorded 'unpinned' with a reason and is never counted as passed.
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test that
 * would fail if a critical guarantee was quietly weakened."
 */
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface DefenseRow {
  readonly defense: string;
  readonly quote: string;
  readonly tier: "default-gate";
  readonly truthLabel: "fixture pass";
  readonly status: "pinned" | "unpinned";
  readonly reason?: string;
  readonly pins: readonly Pin[];
}

interface CaseOccurrence {
  readonly modifier: string;
  readonly title: string;
}

interface Verdict {
  readonly ok: boolean;
  readonly problems: readonly string[];
}

const repoFile = (path: string): string => new URL(`../${path}`, import.meta.url).pathname;
const readRepo = (path: string): string | undefined => (existsSync(repoFile(path)) ? readFileSync(repoFile(path), "utf8") : undefined);

const DOCS_10 = "docs/workbench/10-terminal-inspector.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";

const DOCS_10_QUOTES: readonly string[] = [
  "STALLED vs WAITING vs STALE vs UNKNOWN must not be confused.",
  "Spinner should not imply work progressed.",
  "Node result with missing evidence is not marked verified merely because process exited 0.",
  "Cancel controls unavailable for observers without lifecycle authority.",
  "Historical reads with limited retention show missing details honestly.",
];

const DOCS_14_FALSIFIER =
  "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const DEFENSE_IDS: readonly string[] = [
  "D1 status axes never confused",
  "D2 spinner never implies progress",
  "D3 exit 0 never means verified",
  "D4 no cancel controls for observers",
  "D5 limited-retention reads honest",
];

// Case declarations: it("..."), test('...'), it.skip(`...`), it.each(...)("...") is not a plain case and is not matched.
const CASE_PATTERN = /\b(it|test)((?:\.[A-Za-z]+)*)\s*\(\s*(["'`])((?:\\.|(?!\3)[^\\\n])*)\3/g;

const unescapeTitle = (raw: string): string => raw.replace(/\\(["'`\\])/g, "$1");

const casesIn = (source: string): readonly CaseOccurrence[] => {
  const out: CaseOccurrence[] = [];
  for (const match of source.matchAll(CASE_PATTERN)) {
    out.push({ modifier: match[2] ?? "", title: unescapeTitle(match[4] ?? "") });
  }
  return out;
};

const verifyPin = (source: string | undefined, pin: Pin): Verdict => {
  if (source === undefined) return { ok: false, problems: [`${pin.file}: file is missing`] };
  const hits = casesIn(source).filter((c) => c.title === pin.title);
  const problems: string[] = [];
  if (hits.length === 0) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} not found (renamed or deleted)`);
  if (hits.length > 1) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} occurs ${hits.length} times, expected exactly once`);
  for (const hit of hits) {
    if (hit.modifier !== "") problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} is declared with modifier ${hit.modifier}`);
  }
  return { ok: problems.length === 0, problems };
};

const evaluateRow = (row: DefenseRow, read: (path: string) => string | undefined): Verdict => {
  const problems: string[] = [];
  if (row.status === "pinned") {
    if (row.pins.length === 0) problems.push(`${row.defense}: pinned row has zero pins`);
    for (const pin of row.pins) {
      for (const problem of verifyPin(read(pin.file), pin).problems) problems.push(`${row.defense}: ${problem}`);
    }
  } else {
    if (row.reason === undefined || row.reason.trim() === "") problems.push(`${row.defense}: unpinned row has no reason`);
    if (row.pins.length > 0) problems.push(`${row.defense}: unpinned row carries pins`);
  }
  return { ok: problems.length === 0, problems };
};

const ROWS: readonly DefenseRow[] = [
  {
    defense: DEFENSE_IDS[0] ?? "",
    quote: DOCS_10_QUOTES[0] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-attention.test.ts",
        title: "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone",
      },
      {
        file: "test/workbench-claude-topology.test.ts",
        title: "A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[1] ?? "",
    quote: DOCS_10_QUOTES[1] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-claude-topology.test.ts",
        title: "A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active",
      },
      {
        file: "test/workbench-inspector.test.ts",
        title: "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[2] ?? "",
    quote: DOCS_10_QUOTES[2] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "withholds workspace success that the read status or a declared verdict does not support, and says so",
      },
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[3] ?? "",
    quote: DOCS_10_QUOTES[3] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-control.test.ts",
        title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
      },
      {
        file: "test/workbench-native-details.test.ts",
        title: "preserves selected node on resize and closes without invoking any runtime controls",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[4] ?? "",
    quote: DOCS_10_QUOTES[4] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history",
      },
      {
        file: "test/workbench-furnace-evidence.test.ts",
        title: "an empty incomplete read still says it is truncated rather than presenting an empty log",
      },
    ],
  },
];

describe("docs/10 failure-and-deception defenses census (VC-5/W15, wb-6ze.38)", () => {
  it("docs/10 still carries the five defense sentences verbatim as one paragraph", () => {
    const docs = readRepo(DOCS_10);
    expect(docs).toBeDefined();
    expect(docs).toContain("## Failure and deception defenses");
    expect(docs).toContain(DOCS_10_QUOTES.join(" "));
  });

  it("docs/14 still carries the falsifier requirement verbatim", () => {
    expect(readRepo(DOCS_14)).toContain(DOCS_14_FALSIFIER);
  });

  it("holds exactly five rows, one per docs/10 sentence, in order", () => {
    expect(ROWS.map((r) => r.defense)).toEqual([...DEFENSE_IDS]);
    expect(ROWS.map((r) => r.quote)).toEqual([...DOCS_10_QUOTES]);
  });

  it("every row is default-gate tier and claims only the fixture-pass truth label", () => {
    for (const row of ROWS) {
      expect(row.tier, row.defense).toBe("default-gate");
      expect(row.truthLabel, row.defense).toBe("fixture pass");
    }
  });

  it("no unpinned row is counted as passed: the pinned count equals the rows that carry pins", () => {
    const pinned = ROWS.filter((r) => r.status === "pinned");
    expect(pinned.every((r) => r.pins.length > 0)).toBe(true);
    expect(ROWS.filter((r) => r.status === "unpinned").every((r) => r.pins.length === 0)).toBe(true);
  });

  describe("every row's pins are present exactly once and live", () => {
    for (const row of ROWS) {
      it(`${row.defense}`, () => {
        const verdict = evaluateRow(row, readRepo);
        expect(verdict.problems).toEqual([]);
      });
    }
  });

  describe("falsifier: a quietly weakened pin turns its own defense red by name", () => {
    for (const row of ROWS.filter((r) => r.status === "pinned")) {
      for (const pin of row.pins) {
        const source = readRepo(pin.file) ?? "";
        const quoted = (q: string): string => `${q}${pin.title}${q}`;
        const declared = ["\"", "'", "`"].map(quoted).find((candidate) => source.includes(candidate)) ?? quoted("\"");
        const escaped = declared.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const mutants: ReadonlyArray<readonly [string, string]> = [
          ["rename", source.split(declared).join(`${declared.slice(0, -1)} (renamed)${declared.slice(-1)}`)],
          ["delete", source.split("\n").filter((line) => !line.includes(declared)).join("\n")],
          ["skip", source.replace(new RegExp(`\\b(it|test)(\\s*\\(\\s*)${escaped}`), (_m, fn: string, open: string) => `${fn}.skip${open}${declared}`)],
          ["duplicate", `${source}\nit(${declared}, () => {});\n`],
        ];
        for (const [kind, mutated] of mutants) {
          it(`${row.defense}: ${kind} of ${JSON.stringify(pin.title.slice(0, 48))} is red`, () => {
            const verdict = evaluateRow(row, (path) => (path === pin.file ? mutated : readRepo(path)));
            expect(verdict.ok).toBe(false);
            expect(verdict.problems.join("\n")).toContain(row.defense);
          });
        }
      }
    }
  });

  describe("scanner and row evaluation reject every weakening on synthetic sources", () => {
    const pin: Pin = { file: "test/x.test.ts", title: "a case's title" };
    const row = (over: Partial<DefenseRow>): DefenseRow => ({
      defense: "Dx",
      quote: "q",
      tier: "default-gate",
      truthLabel: "fixture pass",
      status: "pinned",
      pins: [pin],
      ...over,
    });
    const readWith = (source: string | undefined) => (path: string) => (path === pin.file ? source : undefined);

    it("accepts a single plain declaration in any quote style", () => {
      expect(evaluateRow(row({}), readWith(`it("a case's title", () => {});`)).ok).toBe(true);
      expect(evaluateRow(row({}), readWith(`test('a case\\'s title', () => {});`)).ok).toBe(true);
    });

    it.each([
      ["a missing file", undefined],
      ["a deleted case", `it("another title", () => {});`],
      ["a renamed case", `it("a case's title renamed", () => {});`],
      ["a skipped case", `it.skip("a case's title", () => {});`],
      ["a todo case", `it.todo("a case's title");`],
      ["a fails case", `it.fails("a case's title", () => {});`],
      ["an only case", `test.only("a case's title", () => {});`],
      ["a duplicate", `it("a case's title", () => {});\nit("a case's title", () => {});`],
    ])("rejects %s", (_label, source) => {
      const verdict = evaluateRow(row({}), readWith(source));
      expect(verdict.ok).toBe(false);
      expect(verdict.problems.join("\n")).toContain("Dx");
    });

    it("rejects a pinned row with zero pins and an unpinned row without a reason or with pins", () => {
      expect(evaluateRow(row({ pins: [] }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [] }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [], reason: "  " }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [pin], reason: "r" }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [], reason: "no landed case" }), readWith("")).ok).toBe(true);
    });
  });
});
