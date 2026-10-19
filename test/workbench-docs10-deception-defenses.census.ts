/**
 * wb-6ze.38 (VC-5/W15): census falsifier for the "Failure and deception defenses" section of
 * docs/workbench/10-terminal-inspector.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (the post-nl8
 * adoption cut: judge(.forge/vitest-report.json, pins) through the shared helper test/helpers/census.ts); it replaces the
 * hand-scanned test/workbench-deception-defenses-census.test.ts of the earlier cut.
 *
 * The section states five honesty defenses as five sentences of one paragraph. This leg binds each sentence to two
 * landed fixture cases by file and verbatim title. It executes no pinned case: judge() reads vitest's own JSON report of
 * the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pinned
 * case counts only when the gate's own run collected it exactly once, recorded it passed, and its body asserts - the
 * helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered
 * pinned case therefore reads red, naming the row, the file, the title and the cause, as far as the helper's
 * resolvable-construct roster and its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg
 * scans no test source for case calls itself, reads no forge.toml and spawns no process.
 *
 * Truth label: every pin claims only the docs/14 label "fixture pass" in the default gate. No live, pty or adversarial
 * pass is claimed from a title being present (the live four-view receipt stays with its own VC-5 residual bead).
 *
 * Docs: the section is judged through the helper's rendered view (docsSection / sectionMatches). Under its unique
 * level-2 heading of the level-1 parent heading and bounded at the next level-1/2 heading or EOF, it must render as
 * exactly its one frozen paragraph. A dropped, reworded or hidden sentence names its row; any other edit of the section
 * names the section. The drift falsifiers run over a SYNTHETIC document built from the frozen paragraph, never over the
 * live docs/10 text, so a legitimate edit of any other section can never redden a falsifier row. docs/14 "Truth labels
 * and release gates" must still render the falsifier sentence this census answers.
 *
 * Frozen shape (owner standing order 2026-10-18T18:14:19Z, rule 16): the table pins its own row/pin-level shape as a
 * literal (ROWS_SHAPE) and the exact ten file + title pairs (PIN_PAIRS), so deleting one pin of a two-pin row, shortening
 * a requirement label or swapping a pin for an unrelated passing case reds this leg.
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test that would
 * fail if a critical guarantee was quietly weakened."
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

interface Pin {
  readonly file: string;
  readonly title: string;
}
interface Row {
  /** The defense id, in the order the docs/10 sentences state them. */
  readonly id: string;
  /** The label the row answers, as the delivery note names it. */
  readonly label: string;
  /** The docs/10 sentence, verbatim in the rendered section. */
  readonly quote: string;
  readonly tier: "default-gate";
  readonly pins: readonly Pin[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs10-deception-defenses.census.ts";
const DOCS_10 = "docs/workbench/10-terminal-inspector.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_10_HEADING = "Failure and deception defenses";
const DOCS_10_PARENT = `10 ${EM_DASH} Terminal-native rich workflow inspector, interaction and performance`;
const DOCS_14_HEADING = "Truth labels and release gates";
const DOCS_14_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const DOCS_14_FALSIFIER = "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const ATTENTION = "test/workbench-attention.test.ts";
const CLAUDE_TOPOLOGY = "test/workbench-claude-topology.test.ts";
const INSPECTOR = "test/workbench-inspector.test.ts";
const FORGE_OBSERVER = "test/workbench-forge-observer.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const NATIVE_DETAILS = "test/workbench-native-details.test.ts";
const OBSERVATION = "test/workbench-observation.test.ts";
const FURNACE_EVIDENCE = "test/workbench-furnace-evidence.test.ts";

const QUOTES: readonly string[] = [
  "STALLED vs WAITING vs STALE vs UNKNOWN must not be confused.",
  "Spinner should not imply work progressed.",
  "Node result with missing evidence is not marked verified merely because process exited 0.",
  "Cancel controls unavailable for observers without lifecycle authority.",
  "Historical reads with limited retention show missing details honestly.",
];
const SECTION_PARAGRAPH = QUOTES.join(" ");
/** What a reader sees of the section: the one paragraph the rendered view must equal. */
const SECTION_BLOCKS: readonly RenderedBlock[] = [{ kind: "paragraph", text: SECTION_PARAGRAPH, markdown: SECTION_PARAGRAPH }];

const pin = (file: string, title: string): Pin => ({ file, title });

/** Freezes the table and everything it holds, so no row or pin can be edited at runtime. */
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    id: "D1",
    label: "status axes never confused",
    quote: QUOTES[0] ?? "",
    tier: "default-gate",
    pins: [
      pin(ATTENTION, "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone"),
      pin(CLAUDE_TOPOLOGY, "A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure"),
    ],
  },
  {
    id: "D2",
    label: "spinner never implies progress",
    quote: QUOTES[1] ?? "",
    tier: "default-gate",
    pins: [
      pin(CLAUDE_TOPOLOGY, "A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active"),
      pin(INSPECTOR, "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner"),
    ],
  },
  {
    id: "D3",
    label: "exit 0 never means verified",
    quote: QUOTES[2] ?? "",
    tier: "default-gate",
    pins: [
      pin(FORGE_OBSERVER, "withholds workspace success that the read status or a declared verdict does not support, and says so"),
      pin(FORGE_OBSERVER, "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone"),
    ],
  },
  {
    id: "D4",
    label: "no cancel controls for observers",
    quote: QUOTES[3] ?? "",
    tier: "default-gate",
    pins: [
      pin(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
      pin(NATIVE_DETAILS, "preserves selected node on resize and closes without invoking any runtime controls"),
    ],
  },
  {
    id: "D5",
    label: "limited-retention reads honest",
    quote: QUOTES[4] ?? "",
    tier: "default-gate",
    pins: [
      pin(OBSERVATION, "requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history"),
      pin(FURNACE_EVIDENCE, "an empty incomplete read still says it is truncated rather than presenting an empty log"),
    ],
  },
]);

/** Rule 16 (frozen shape): the table's own row/pin-level shape as a literal, derived from the TABLE at the cut base. */
const ROWS_SHAPE: readonly string[] = ["D1:2", "D2:2", "D3:2", "D4:2", "D5:2"];
const ROW_LABELS: readonly string[] = [
  "status axes never confused",
  "spinner never implies progress",
  "exit 0 never means verified",
  "no cancel controls for observers",
  "limited-retention reads honest",
];
/** The exact ten file + title pairs the five rows bind (the row-set pin: deleting or swapping any one reds). */
const PIN_PAIRS: readonly string[] = [
  `D1|${ATTENTION}|a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone`,
  `D1|${CLAUDE_TOPOLOGY}|A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure`,
  `D2|${CLAUDE_TOPOLOGY}|A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active`,
  `D2|${INSPECTOR}|a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner`,
  `D3|${FORGE_OBSERVER}|withholds workspace success that the read status or a declared verdict does not support, and says so`,
  `D3|${FORGE_OBSERVER}|F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone`,
  `D4|${CONTROL}|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing`,
  `D4|${NATIVE_DETAILS}|preserves selected node on resize and closes without invoking any runtime controls`,
  `D5|${OBSERVATION}|requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history`,
  `D5|${FURNACE_EVIDENCE}|an empty incomplete read still says it is truncated rather than presenting an empty log`,
];
const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.id}:${row.pins.length}`);
const labelsOf = (rows: readonly Row[]): string[] => rows.map(row => row.label);
const pairsOf = (rows: readonly Row[]): string[] => rows.flatMap(row => row.pins.map(entry => `${row.id}|${entry.file}|${entry.title}`));

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);

/** Every docs/10 drift, each naming the row or the section it breaks; the per-row checks run independently of the exactness check. */
function docs10Failures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, DOCS_10_HEADING, 2, [DOCS_10_PARENT]);
  if (!section.ok) {
    out.push(`${DOCS_10} § ${DOCS_10_HEADING}: the section is refused: ${section.why}`);
    return out;
  }
  for (const row of ROWS) {
    if (!section.blocks.some(block => block.kind === "paragraph" && block.text.includes(row.quote))) out.push(`row ${row.id}: its sentence "${row.quote}" no longer renders in ${DOCS_10} § ${DOCS_10_HEADING}`);
  }
  const exact = sectionMatches(section, SECTION_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_10} § ${DOCS_10_HEADING} is not exactly its frozen paragraph: ${exact.why}`);
  return out;
}

/** docs/14: the falsifier sentence this census answers must still render in a paragraph of its section, HTML-free. */
function docs14Failures(markdown: string): string[] {
  const section = docsSection(markdown, DOCS_14_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [`${DOCS_14} § ${DOCS_14_HEADING}: the section is refused: ${section.why}`];
  const out: string[] = [];
  if (section.hasHtml) out.push(`${DOCS_14} § ${DOCS_14_HEADING} carries HTML, whose rendered text can hide what its source says`);
  if (!section.blocks.some(block => block.kind === "paragraph" && block.text.includes(DOCS_14_FALSIFIER))) {
    out.push(`${DOCS_14} § ${DOCS_14_HEADING}: the falsifier sentence no longer renders in a paragraph of its section`);
  }
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen paragraph under the real heading shape, never the live text. */
const synthetic = (edit: (paragraph: string) => string = paragraph => paragraph, tail = ""): string =>
  `# ${DOCS_10_PARENT}\n\n## Navigation\n\nText.\n\n## ${DOCS_10_HEADING}\n\n${edit(SECTION_PARAGRAPH)}\n${tail}\n## Implemented experimental native details at 2026-10-15\n\nMore text.\n`;
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(": ")));

describe("wb-6ze.38 docs/workbench/10 failure-and-deception-defenses census (report mode)", () => {
  it("AC1: the table holds the five frozen rows in order, deeply frozen, each sentence rendered in its section", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS.map(row => row.id)).toEqual(["D1", "D2", "D3", "D4", "D5"]);
    expect(ROWS.map(row => row.quote)).toEqual([...QUOTES]);
    expect(ROWS.every(row => row.tier === "default-gate")).toBe(true);
    expect(docs10Failures(readRepo(DOCS_10))).toEqual([]);
  });

  it("AC1 (rule 16): the table pins its own shape as a literal: rows, pins per row, labels and the exact ten file + title pairs", () => {
    expect(shapeOf(ROWS)).toEqual(ROWS_SHAPE);
    expect(labelsOf(ROWS)).toEqual(ROW_LABELS);
    expect(pairsOf(ROWS)).toEqual(PIN_PAIRS);
    expect(PIN_PAIRS).toHaveLength(10);
  });

  it("AC1 (rule 16): each hollowing of a copy of the table changes its shape, so the literal pins would red it", () => {
    const withoutPin = (id: string, at: number): readonly Row[] => ROWS.map(row => (row.id === id ? { ...row, pins: row.pins.filter((_, index) => index !== at) } : row));
    const swapped: readonly Row[] = ROWS.map(row => (row.id === "D2" ? { ...row, pins: [row.pins[0] as Pin, pin(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing")] } : row));
    expect(shapeOf(withoutPin("D1", 1))).not.toEqual(ROWS_SHAPE);
    expect(shapeOf(withoutPin("D4", 1))).not.toEqual(ROWS_SHAPE);
    expect(pairsOf(swapped)).not.toEqual(PIN_PAIRS);
    expect(labelsOf(ROWS.map(row => (row.id === "D5" ? { ...row, label: "limited retention" } : row)))).not.toEqual(ROW_LABELS);
    expect(shapeOf([])).not.toEqual(ROWS_SHAPE);
  });

  it("AC1: the live section renders exactly its one frozen paragraph of five sentences, HTML-free", () => {
    const section = docsSection(readRepo(DOCS_10), DOCS_10_HEADING, 2, [DOCS_10_PARENT]);
    expect(sectionMatches(section, SECTION_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
    expect(QUOTES).toHaveLength(5);
  });

  it("AC1: docs/14 still renders the falsifier requirement this census answers", () => {
    expect(docs14Failures(readRepo(DOCS_14))).toEqual([]);
  });

  it.each(ROWS)("AC2 row $id ($label): every pinned case is collected once, passed and asserting in the default gate's own report", row => {
    const verdicts = judge(REPORT, row.pins.map(casePin));
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, reads no forge.toml and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinnedBase = ROWS.flatMap(row => row.pins.map(entry => entry.file.replace(/^test\//u, "./").replace(/\.test\.ts$/u, "")));
    expect(own.imports.filter(entry => pinnedBase.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-6ze.38 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstPin = (id: string): { row: Row; entry: Pin } => {
    const row = ROWS.find(candidate => candidate.id === id);
    const entry = row?.pins[0];
    if (row === undefined || entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstPin("D3");
    const wrong = { ...entry, title: entry.title.replace("withholds", "withholdS") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row D3");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a pin with no title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("D1");
    const [verdict] = judge(REPORT, [casePin({ file: entry.file, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M3: a pin that names the right title in the wrong file is red, never borrowed from a neighbour", () => {
    const { entry } = firstPin("D5");
    const [verdict] = judge(REPORT, [casePin({ file: CONTROL, title: entry.title })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a pin judged under a tier the default report does not vouch for is refused, not counted", () => {
    const { entry } = firstPin("D4");
    const [verdict] = judge(REPORT, [{ ...casePin(entry), tier: "native-read" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M5: a file no default report collects is not-collected, never an empty pass", () => {
    const [verdict] = judge(REPORT, [{ file: "test/workbench-no-such-file.test.ts", title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.ok).toBe(false);
  });
});

describe("wb-6ze.38 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the section exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docs10Failures(synthetic())).toEqual([]);
    expect(docs10Failures(`# ${DOCS_10_PARENT}\n\n## ${DOCS_10_HEADING}\n\n${SECTION_PARAGRAPH}\n`)).toEqual([]);
  });

  it.each(ROWS)("K-$id names row $id (and only it) when its sentence is dropped from the paragraph", row => {
    const lines = docs10Failures(synthetic(paragraph => paragraph.replace(`${row.quote} `, "").replace(` ${row.quote}`, "")));
    expect(named(lines)).toEqual([`row ${row.id}`]);
    expect(lines.some(line => line.includes("is not exactly its frozen paragraph"))).toBe(true);
  });

  it("D1 goes red on the section, naming no row, when a weakening qualifier is appended to the paragraph", () => {
    const lines = docs10Failures(synthetic(paragraph => `${paragraph} Unless a provider says otherwise.`));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its frozen paragraph");
  });

  it("D2 goes red on the section when two sentences swap places, naming no row", () => {
    const lines = docs10Failures(synthetic(() => [QUOTES[1], QUOTES[0], ...QUOTES.slice(2)].join(" ")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("D3 goes red when the section heading is renamed away", () => {
    const lines = docs10Failures(synthetic().replace(`## ${DOCS_10_HEADING}`, "## Failure notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain(`${DOCS_10_HEADING}: the section is refused`);
  });

  it("D4 (FOLD-1) goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docs10Failures(synthetic(paragraph => paragraph, "\n### Exceptions\n\nA host may relax these defenses.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.every(line => line.includes("is not exactly its frozen paragraph"))).toBe(true);
  });

  it("D5 names the spinner row when its sentence is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docs10Failures(synthetic(paragraph => paragraph.replace(QUOTES[1] ?? "", `<!-- ${QUOTES[1]} -->`)));
    expect(named(lines)).toEqual(["row D2"]);
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D6 goes red when a level-1 heading inserted above re-homes the section", () => {
    const lines = docs10Failures(synthetic().replace(`## ${DOCS_10_HEADING}`, `# Appendix\n\n## ${DOCS_10_HEADING}`));
    expect(lines.some(line => line.includes(`${DOCS_10_HEADING}: the section is refused`))).toBe(true);
  });

  it("D7 names the exit-0 row when its sentence is relocated to an EOF appendix, and the section no longer matches", () => {
    const quote = QUOTES[2] ?? "";
    const lines = docs10Failures(synthetic(paragraph => paragraph.replace(` ${quote}`, ""), `\n## Appendix\n\n${quote}\n`));
    expect(named(lines)).toEqual(["row D3"]);
  });

  it("an edit of any other section never reddens a row: the neighbouring sections are free to change", () => {
    expect(docs10Failures(synthetic().replace("Text.", "Different text.").replace("More text.", "Other text."))).toEqual([]);
  });

  it("docs/14: the falsifier sentence dropped or hidden in an HTML comment is red, naming docs/14", () => {
    const base = (body: string): string => `# ${DOCS_14_PARENT}\n\n## ${DOCS_14_HEADING}\n\n${body}\n`;
    expect(docs14Failures(base(`Intro. ${DOCS_14_FALSIFIER}`))).toEqual([]);
    expect(docs14Failures(base("Intro. No falsifier here.")).some(line => line.includes("falsifier sentence no longer renders"))).toBe(true);
    expect(docs14Failures(base(`Intro. <!-- ${DOCS_14_FALSIFIER} -->`)).length).toBeGreaterThan(0);
  });
});
