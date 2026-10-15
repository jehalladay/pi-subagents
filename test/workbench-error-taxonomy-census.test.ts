/**
 * W05 / VC-2 (wb-6hb.7): docs/workbench/05 "Error taxonomy" census falsifier.
 *
 * docs/workbench/05 section "Error taxonomy" says: "Distinguish (a) syntax/validation error before
 * invocation, (b) capability unavailable, (c) permission denied, (d) transport/runtime failure, (e) producer
 * domain result unsuccessful, (f) uncertain external effect, (g) cancelled/aborted wait, (h) stale
 * observation. Expose typed diagnostics; do not silently return null for every failure." docs/workbench/14
 * section "Truth labels and release gates" requires that every major work package carries "a falsifier: a
 * negative test that would fail if a critical guarantee was quietly weakened".
 *
 * Cases embodying the categories exist, but nothing bound the eight categories or the never-silent-null
 * clause to them. This census does: a frozen table of nine rows, each pinned to landed cases by file and
 * verbatim title. A pinned case that is renamed, deleted, duplicated, commented out, or disabled (skip, todo,
 * fails, only, skipIf, runIf, or an enclosing disabled describe) fails the census naming the category.
 *
 * Truth label: "fixture pass" only. The census reads the pinned files as text; it never executes a pinned
 * case and it adds no behaviour test for a category.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type Tier = "default-gate";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface TaxonomyRow {
  readonly category: string;
  readonly label: string;
  /** The docs/05 fragment, verbatim. */
  readonly quote: string;
  readonly tier: Tier;
  readonly status: "pinned" | "unpinned";
  readonly reason?: string;
  readonly pins: readonly Pin[];
}

const DOC_05 = "docs/workbench/05-script-language-and-runtime.md";
const DOC_14 = "docs/workbench/14-qa-and-benchmarks.md";

const TAXONOMY_PARAGRAPH =
  "Distinguish (a) syntax/validation error before invocation, (b) capability unavailable, (c) permission denied, (d) transport/runtime failure, (e) producer domain result unsuccessful, (f) uncertain external effect, (g) cancelled/aborted wait, (h) stale observation. Expose typed diagnostics; do not silently return null for every failure.";

const BOUNDARY_SENTENCES: readonly string[] = [
  "The host now transports a typed `CapabilityError` with its category across worker RPC.",
  "fatal authorization, validation and uncertain-effect failures are not converted to ordinary null item failures by parallel composition.",
];

const FALSIFIER_SENTENCE =
  "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const NODE_CONTRACT = "test/workbench-node-contract.test.ts";
const REGISTRY_AUTH = "test/workbench-registry-auth.test.ts";
const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";

const ROWS: readonly TaxonomyRow[] = Object.freeze([
  {
    category: "a",
    label: "syntax/validation error before invocation",
    quote: "(a) syntax/validation error before invocation",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: NODE_CONTRACT, title: "L4: malformed input and non-JSON payload fail before provider effects" },
      { file: REGISTRY_AUTH, title: "rejects impersonation options before dispatch" },
    ],
  },
  {
    category: "b",
    label: "capability unavailable",
    quote: "(b) capability unavailable",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-registry-admission.test.ts",
        title: "reaches a workflow script as a typed unavailable CapabilityError while the provider sees only the slot holder",
      },
    ],
  },
  {
    category: "c",
    label: "permission denied",
    quote: "(c) permission denied",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-control.test.ts", title: "rule 4: the exact grant control:<provider>.<action> is required verbatim" },
      {
        file: "test/workbench-security-pi-tools.test.ts",
        title: "refuses the transcript read with a typed permission message when the grant is absent",
      },
    ],
  },
  {
    category: "d",
    label: "transport/runtime failure",
    quote: "(d) transport/runtime failure",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-furnace-evidence.test.ts",
        title: "an abort while the native read is pending rejects as transport, and the abandoned read can never resolve the content",
      },
    ],
  },
  {
    category: "e",
    label: "producer domain result unsuccessful",
    quote: "(e) producer domain result unsuccessful",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "F2: a current failed gate stays failed despite transport success, and current success is success",
      },
    ],
  },
  {
    category: "f",
    label: "uncertain external effect",
    quote: "(f) uncertain external effect",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: EFFECT_REPLAY, title: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect" },
      { file: NODE_CONTRACT, title: "L4: effectful invocation with lost response is reported uncertain, never automatically retried" },
    ],
  },
  {
    category: "g",
    label: "cancelled/aborted wait",
    quote: "(g) cancelled/aborted wait",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
      },
    ],
  },
  {
    category: "h",
    label: "stale observation",
    quote: "(h) stale observation",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: EFFECT_REPLAY, title: "marks a replayed read as stale, never fresh" },
      {
        file: "test/workbench-observation.test.ts",
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
      },
    ],
  },
  {
    category: "never-silent-null",
    label: "do not silently return null for every failure",
    quote: "Expose typed diagnostics; do not silently return null for every failure.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: REGISTRY_AUTH, title: "preserves category and instanceof CapabilityError in a real worker RPC" },
      { file: REGISTRY_AUTH, title: "reports typed terminal diagnostics and local validation is not swallowed by parallel" },
      { file: "test/workflow-runtime.test.ts", title: "does not let parallel fold a fatal nested error into a null" },
    ],
  },
]);

const readRepoText = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

interface CaseScan {
  /** Occurrences of the exact title registered by a plain it()/test() call. */
  readonly live: number;
  /** Occurrences that are disabled, each named by its modifier (".skip", "describe.todo", ...). */
  readonly disabled: readonly string[];
}

const CASE_CALL = /^[ \t]*(?:it|test)((?:\.[A-Za-z]+(?:\([^)\n]*\))?)*)\([ \t\r\n]*(["'`])/gm;
const DESCRIBE_CALL = /^[ \t]*describe((?:\.[A-Za-z]+)*)\(/;

/** Blank every line that sits in a block comment so a commented-out case is not counted. Line indexes are preserved. */
const withoutBlockComments = (source: string): string => {
  let inBlock = false;
  return source
    .split("\n")
    .map(line => {
      if (inBlock) {
        if (line.includes("*/")) inBlock = false;
        return "";
      }
      const trimmed = line.trimStart();
      if (trimmed.startsWith("/*")) {
        if (!trimmed.includes("*/")) inBlock = true;
        return "";
      }
      return line;
    })
    .join("\n");
};

const indentOf = (line: string): number => line.length - line.trimStart().length;

/** Modifiers of every enclosing describe, found by walking up to each shallower describe line. */
const enclosingDescribeModifiers = (lines: readonly string[], lineIndex: number): readonly string[] => {
  const found: string[] = [];
  let threshold = indentOf(lines[lineIndex] ?? "");
  for (let index = lineIndex - 1; index >= 0 && threshold > 0; index -= 1) {
    const line = lines[index] ?? "";
    if (line.trim() === "" || indentOf(line) >= threshold) continue;
    threshold = indentOf(line);
    const match = DESCRIBE_CALL.exec(line);
    if (match !== null && (match[1] ?? "") !== "") found.push(`describe${match[1]}`);
  }
  return found;
};

/**
 * Count the registrations of one exact case title in a test file. A registration is an it()/test() call at the
 * start of a line whose first argument is the title as a complete string literal. A modifier on the call, or on
 * any enclosing describe, makes the occurrence disabled. Line and block comments are not registrations.
 */
const scanCases = (source: string, title: string): CaseScan => {
  const code = withoutBlockComments(source);
  const lines = code.split("\n");
  let live = 0;
  const disabled: string[] = [];
  for (const match of code.matchAll(CASE_CALL)) {
    const quote = match[2] ?? "";
    const rest = code.slice((match.index ?? 0) + match[0].length);
    if (!rest.startsWith(`${title}${quote}`)) continue;
    const lineIndex = code.slice(0, match.index ?? 0).split("\n").length - 1;
    const modifier = match[1] ?? "";
    const enclosing = enclosingDescribeModifiers(lines, lineIndex);
    if (modifier === "" && enclosing.length === 0) live += 1;
    else disabled.push(...(modifier === "" ? [] : [modifier]), ...enclosing);
  }
  return { live, disabled };
};

const tag = (row: Pick<TaxonomyRow, "category" | "label">): string => `docs/05 category (${row.category}) "${row.label}"`;

const scanProblem = (scan: CaseScan): string | null => {
  const total = scan.live + scan.disabled.length;
  if (scan.disabled.length > 0) return `is disabled (${scan.disabled.join(", ")})`;
  if (total === 0) return "occurs 0 times (renamed, deleted or commented out)";
  if (total > 1) return `occurs ${total} times, expected exactly once`;
  return null;
};

/** Every problem the row has against the files the reader returns; empty means the row holds. */
const auditRow = (row: TaxonomyRow, read: (path: string) => string): readonly string[] => {
  const problems: string[] = [];
  const name = tag(row);
  if (row.tier !== "default-gate") problems.push(`${name}: tier must be default-gate`);
  if (row.status === "pinned" && row.pins.length === 0) problems.push(`${name}: a pinned row has zero pins`);
  if (row.status === "unpinned") {
    if (row.pins.length > 0) problems.push(`${name}: an unpinned row must carry no pins`);
    if (row.reason === undefined || row.reason.trim() === "") problems.push(`${name}: an unpinned row must name its reason`);
  }
  for (const pin of row.pins) {
    let source: string;
    try {
      source = read(pin.file);
    } catch {
      problems.push(`${name}: pinned file ${pin.file} cannot be read`);
      continue;
    }
    const problem = scanProblem(scanCases(source, pin.title));
    if (problem !== null) problems.push(`${name}: ${pin.file} :: "${pin.title}" ${problem}`);
  }
  return problems;
};

/** Rows that hold. An unpinned row is never counted as passed. */
const passedCategories = (rows: readonly TaxonomyRow[], read: (path: string) => string): readonly string[] =>
  rows.filter(row => row.status === "pinned" && auditRow(row, read).length === 0).map(row => row.category);

/** Quote problems against a docs text; each names the category whose fragment is missing. */
const auditQuotes = (rows: readonly TaxonomyRow[], doc: string): readonly string[] =>
  rows.filter(row => !doc.includes(row.quote)).map(row => `${tag(row)}: quote is not verbatim in ${DOC_05}`);

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("docs/05 Error taxonomy census: drift guard", () => {
  const doc05 = readRepoText(DOC_05);

  it("holds the Error taxonomy paragraph verbatim", () => {
    expect(doc05.includes(TAXONOMY_PARAGRAPH), "docs/05 'Error taxonomy' paragraph changed; re-pin the census").toBe(true);
  });

  it("holds both 'Implemented node error boundary' sentences verbatim", () => {
    for (const sentence of BOUNDARY_SENTENCES) {
      expect(doc05.includes(sentence), `docs/05 sentence changed: ${sentence}`).toBe(true);
    }
  });

  it("holds the docs/14 falsifier requirement verbatim", () => {
    expect(readRepoText(DOC_14).includes(FALSIFIER_SENTENCE)).toBe(true);
  });

  it("has exactly nine rows: categories a-h in order, then the never-silent-null clause", () => {
    expect(ROWS.map(row => row.category)).toEqual(["a", "b", "c", "d", "e", "f", "g", "h", "never-silent-null"]);
  });

  it("quotes every row verbatim from docs/05, in taxonomy order", () => {
    expect(auditQuotes(ROWS, doc05)).toEqual([]);
    const paragraph = TAXONOMY_PARAGRAPH;
    let cursor = -1;
    for (const row of ROWS) {
      const at = paragraph.indexOf(row.quote);
      expect(at, `${tag(row)}: quote is not inside the taxonomy paragraph`).toBeGreaterThan(cursor);
      cursor = at;
    }
  });

  it("goes red naming the category when a quote is paraphrased", () => {
    const paraphrased = doc05.replace("(c) permission denied", "(c) access refused");
    const problems = auditQuotes(ROWS, paraphrased);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('category (c) "permission denied"');
  });
});

describe("docs/05 Error taxonomy census: every row is pinned to landed cases", () => {
  for (const row of ROWS) {
    it(`${tag(row)} holds at HEAD`, () => {
      expect(row.status, `${tag(row)} is unpinned (${row.reason ?? "no reason"}); an unpinned row is never counted passed`).toBe("pinned");
      expect(auditRow(row, readRepoText), `${tag(row)} lost a pinned case`).toEqual([]);
    });
  }

  it("counts all nine rows as passed at HEAD", () => {
    expect(passedCategories(ROWS, readRepoText)).toEqual(ROWS.map(row => row.category));
  });
});

describe("docs/05 Error taxonomy census: real-file mutants go red naming the category", () => {
  const mutants: readonly {
    readonly kind: string;
    readonly mutate: (source: string, pin: Pin) => string;
  }[] = [
    { kind: "rename", mutate: (source, pin) => source.split(pin.title).join(`${pin.title} (renamed)`) },
    { kind: "delete", mutate: (source, pin) => source.split(pin.title).join("") },
    {
      kind: ".skip",
      mutate: (source, pin) =>
        source.replace(new RegExp(`\\b(it|test)(\\(\\s*["'\`]${escapeRegExp(pin.title)})`), "$1.skip$2"),
    },
    {
      kind: ".todo",
      mutate: (source, pin) =>
        source.replace(new RegExp(`\\b(it|test)(\\(\\s*["'\`]${escapeRegExp(pin.title)})`), "$1.todo$2"),
    },
  ];

  for (const row of ROWS) {
    for (const pin of row.pins) {
      for (const mutant of mutants) {
        it(`${tag(row)}: ${mutant.kind} of "${pin.title}"`, () => {
          const original = readRepoText(pin.file);
          const mutated = mutant.mutate(original, pin);
          expect(mutated, "the mutant must change the pinned file").not.toBe(original);
          const problems = auditRow(row, path => (path === pin.file ? mutated : readRepoText(path)));
          expect(problems.length).toBeGreaterThan(0);
          expect(problems[0]).toContain(`category (${row.category})`);
        });
      }
    }
  }
});

describe("docs/05 Error taxonomy census: scanner and row rules on synthetic sources", () => {
  const TITLE = "marks a replayed read as stale";
  const wrap = (body: string): string => `describe("suite", () => {\n${body}\n});\n`;
  const caseAt = (header: string, title: string = TITLE): string => `  ${header}("${title}", () => {\n    expect(1).toBe(1);\n  });`;
  const demo: TaxonomyRow = {
    category: "x",
    label: "demo",
    quote: "(x) demo",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: "fake.test.ts", title: TITLE }],
  };
  const auditSource = (source: string): readonly string[] => auditRow(demo, () => source);

  it("accepts it, test, single quotes, backticks and a formatter-wrapped call", () => {
    expect(auditSource(wrap(caseAt("it")))).toEqual([]);
    expect(auditSource(wrap(caseAt("test")))).toEqual([]);
    expect(auditSource(wrap(`  it('${TITLE}', () => {});`))).toEqual([]);
    expect(auditSource(wrap(`  it(\`${TITLE}\`, () => {});`))).toEqual([]);
    expect(auditSource(wrap(`  it(\n    "${TITLE}",\n    () => {},\n  );`))).toEqual([]);
  });

  it("goes red naming the category for a rename, a deletion, a prefix-only title and a comment", () => {
    for (const source of [
      wrap(caseAt("it", `${TITLE} now`)),
      wrap(caseAt("it", "something else")),
      wrap(""),
      wrap(`  // it("${TITLE}", () => {});`),
      wrap(`  /*\n  it("${TITLE}", () => {});\n  */`),
    ]) {
      const problems = auditSource(source);
      expect(problems).toHaveLength(1);
      expect(problems[0]).toContain('category (x) "demo"');
    }
  });

  it("goes red for every disabling modifier on the case", () => {
    for (const header of ["it.skip", "it.todo", "it.fails", "it.only", "it.skipIf(true)", "it.runIf(false)", "test.skip", "test.only"]) {
      const problems = auditSource(wrap(caseAt(header)));
      expect(problems, header).toHaveLength(1);
      expect(problems[0]).toContain("is disabled");
    }
  });

  it("goes red for an enclosing disabled describe but not for a disabled sibling", () => {
    const enclosed = `describe.skip("suite", () => {\n${caseAt("it")}\n});\n`;
    expect(auditSource(enclosed)[0]).toContain("is disabled (describe.skip)");
    const nested = `describe("outer", () => {\n  describe.todo("inner", () => {\n  ${caseAt("it")}\n  });\n});\n`;
    expect(auditSource(nested)[0]).toContain("is disabled (describe.todo)");
    const sibling = `describe.skip("other", () => {\n  it("unrelated", () => {});\n});\n${wrap(caseAt("it"))}`;
    expect(auditSource(sibling)).toEqual([]);
  });

  it("goes red when the title occurs twice", () => {
    const problems = auditSource(wrap(`${caseAt("it")}\n${caseAt("it")}`));
    expect(problems[0]).toContain("occurs 2 times, expected exactly once");
  });

  it("goes red when the pinned file cannot be read", () => {
    const problems = auditRow(demo, () => {
      throw new Error("ENOENT");
    });
    expect(problems[0]).toContain("cannot be read");
  });

  it("goes red for a pinned row with zero pins and for an unpinned row without a reason", () => {
    expect(auditRow({ ...demo, pins: [] }, () => "")[0]).toContain("a pinned row has zero pins");
    expect(auditRow({ ...demo, status: "unpinned", pins: [] }, () => "")[0]).toContain("must name its reason");
    expect(auditRow({ ...demo, status: "unpinned", reason: "no typed case yet", pins: [] }, () => "")).toEqual([]);
  });

  it("never counts an unpinned row as passed", () => {
    const unpinned: TaxonomyRow = { ...demo, category: "y", status: "unpinned", reason: "no typed case yet", pins: [] };
    const read = () => wrap(caseAt("it"));
    expect(passedCategories([demo, unpinned], read)).toEqual(["x"]);
  });
});
