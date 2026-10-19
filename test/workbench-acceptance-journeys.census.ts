/**
 * wb-h8f.9 (VC-1..VC-7/docs-11): census falsifier for the "Acceptance journeys" section of
 * docs/workbench/11-designer-and-operator.md, a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE: judge(.forge/vitest-report.json, pins) through the shared helper
 * test/helpers/census.ts, after the owner's census-step commits landed (the post-u62 adoption cut; this bead's one cut).
 *
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates" requires that docs and status tables
 * "distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"" and that
 * "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly
 * weakened." This leg binds the five docs/11 journey sentences to one truth label per evidence leg. It executes no
 * journey and no pinned case: a "fixture pass" pin counts only when the default gate's own run (its vitest JSON
 * report, written by `npm run test` before the census step runs) collected the pinned case exactly once, recorded it
 * passed and its body asserts - the helper's three legs, fail-closed. A renamed, deleted, duplicated, skipped, todo,
 * inverted, excluded or unregistered pinned case therefore reads red naming the journey, its sentence, the file and
 * the title, as far as the helper's resolvable-construct roster and named residuals reach (test/helpers/census.ts,
 * receipts/wb-u62.md). This leg scans no test source for case calls, reads no vitest config and spawns no process.
 *
 * Evidence kinds (one label per leg, never a pass label from a title's presence alone):
 * - cases    "fixture pass" - judged by judge() over the default-gate report (tier "test").
 * - receipt  "live SDK pass" - the command id must sit in a TRACEABILITY paragraph that is not SUPERSEDED; this leg
 *            reads TRACEABILITY.md (frozen byte-exact) and never re-runs the receipt.
 * - artifact "code present" - a committed receipt file and the TRACEABILITY section that cites it (owner reading call:
 *            the wb-h7r v2 operator receipt is NOT labelled a live pass here).
 * - open     "code present" | "not started" - a tracking bead id; never a pass label.
 *
 * Docs: both sections are judged through the helper's rendered view (docsSection / sectionMatches). docs/11 must
 * render as exactly one five-item list under its unique level-2 heading of the level-1 parent, bounded at the next
 * level-1/2 heading or EOF, HTML-free; docs/14's first block under its unique heading must be the label paragraph
 * exactly. Drift falsifiers run over SYNTHETIC documents, never the live text, so an unrelated docs edit cannot redden
 * a falsifier row.
 *
 * Disclosed limits (never claimed as covered): an assertion reached only through a helper the helper's body leg does
 * not follow; the receipts and the OPEN beads' real status (no bead store is read here - the two OPEN rows record
 * their store status at the cut in the delivery note, and a seat that lands one flips the row consciously, the
 * pin-flip pattern); no journey is run.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-acceptance-journeys.census.ts";
const DOCS_11 = "docs/workbench/11-designer-and-operator.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_11_PARENT = `11 ${EM_DASH} Pi designer, operator tools and closed-loop experimentation`;
const DOCS_14_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const JOURNEYS_HEADING = "Acceptance journeys";
const TRUTH_HEADING = "Truth labels and release gates";
/** A file the default config excludes: never in the default report. */
const EXCLUDED_FILE = "test/workbench-native-rf-preview.test.ts";

/** The docs/14 closed label set, plus the explicit "not started" row the bead allows. */
const LABELS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass", "not started"] as const;
type Label = (typeof LABELS)[number];

interface Pin {
  readonly file: string;
  readonly title: string;
}

type Evidence =
  | { readonly kind: "cases"; readonly pins: readonly Pin[] }
  | { readonly kind: "receipt"; readonly commandId: string }
  | { readonly kind: "artifact"; readonly file: string; readonly heading: string }
  | { readonly kind: "open"; readonly bead: string };

interface JourneyRow {
  readonly journey: number;
  readonly label: Label;
  readonly evidence: Evidence;
}

/** docs/11 "Acceptance journeys", verbatim and in document order (journey n is index n-1). */
const JOURNEY_QUOTES: readonly string[] = [
  "Pi reads saved script, opens inspector, executes it with Claude SDK; no Pi-owned subagent used for script agent().",
  "Pi inspects a MechanicalWorkflows ordinary function and its descriptor without executing it.",
  "Pi attaches to externally created Furnace Run, explains last-known state and observation freshness.",
  "Pi generates a source diff improving redundant task, validates it, executes reproducible comparison and cites native results.",
  "An observer-only Pi instance cannot stop the Run, even with a guessed action name.",
];

/** The docs/14 paragraph that carries the closed label set, verbatim: pinned exactly, never by substring. */
const TRUTH_TEXT =
  'Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output. All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass". Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.';

const OPERATOR_RECEIPT_FILE = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";
const OPERATOR_RECEIPT_HEADING = "## CORRECTION (wb-h7r): the wb-a2g.3 operator receipt, contract v2";

const fixture = (...pins: readonly Pin[]): Evidence => ({ kind: "cases", pins });
const receipt = (commandId: string): Evidence => ({ kind: "receipt", commandId });
const artifact = (file: string, heading: string): Evidence => ({ kind: "artifact", file, heading });
const open = (bead: string): Evidence => ({ kind: "open", bead });
const row = (journey: number, label: Label, evidence: Evidence): JourneyRow => ({ journey, label, evidence });

/** Freezes the table and everything it holds, so no row, evidence or pin can be edited at runtime. */
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

/**
 * One row per evidence leg. wb-a2g.3 is CLOSED (2026-10-15T21:22Z), so journey 1 no longer carries it as an OPEN row:
 * the operator leg is labelled "code present" on the committed wb-h7r v2 operator receipt, NOT "live SDK pass"
 * (whether that receipt evidences the operator leg as a live pass is an owner reading call). wb-752.3 is CLOSED too
 * (landed 2026-10-17, merge 24c8be2): journey 3 no longer carries it as an OPEN row, and no TRACEABILITY paragraph
 * records a live command id for it, so the census claims only what it can evidence - its vc4 receipt-builder
 * falsifier is a third "fixture pass" pin, and the live external-Furnace leg stays a visible gap (no live row).
 */
const ROWS: readonly JourneyRow[] = freezeDeep<readonly JourneyRow[]>([
  row(1, "fixture pass", fixture({ file: "test/workbench-host-contract.test.ts", title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported" })),
  row(1, "live SDK pass", receipt("cmd_2a275dcbd6c6")),
  row(1, "code present", artifact(OPERATOR_RECEIPT_FILE, OPERATOR_RECEIPT_HEADING)),
  row(2, "not started", open("wb-04s")),
  row(
    3,
    "fixture pass",
    fixture(
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
      { file: "test/workbench-furnace-observer.test.ts", title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING" },
      { file: "test/workbench-furnace-vc4-receipt.test.ts", title: "C2 falsifier: disconnect must make the reading and the nodes stale, keeping the last-known running label" },
    ),
  ),
  row(
    4,
    "fixture pass",
    fixture(
      { file: "test/workbench-patch-proposal.test.ts", title: "validates the candidate bytes exactly as the designer does and mirrors its status" },
      { file: "test/workbench-validate-reply.test.ts", title: "never executes or writes the candidate source" },
      { file: "test/workbench-designer.test.ts", title: "matched cohort yields measured deltas for every shared metric and states association, not causation" },
    ),
  ),
  row(4, "code present", open("wb-h8f.2")),
  row(
    5,
    "fixture pass",
    fixture(
      { file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" },
      { file: "test/workbench-control.test.ts", title: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)" },
      { file: "test/workbench-native-details.test.ts", title: "preserves selected node on resize and closes without invoking any runtime controls" },
    ),
  ),
]);

/** The frozen row/pin shape (rule 16, owner standing order 2026-10-18T18:14:19Z): journey:label:kind:pin-count, derived from the table at the cut's base. */
const EXPECTED_SHAPE: readonly string[] = [
  "1:fixture pass:cases:1",
  "1:live SDK pass:receipt:0",
  "1:code present:artifact:0",
  "2:not started:open:0",
  "3:fixture pass:cases:3",
  "4:fixture pass:cases:3",
  "4:code present:open:0",
  "5:fixture pass:cases:3",
];
const shapeOf = (rows: readonly JourneyRow[]): string[] => rows.map(r => `${r.journey}:${r.label}:${r.evidence.kind}:${r.evidence.kind === "cases" ? r.evidence.pins.length : 0}`);

/** O2 row-set pin: the exact ten (journey, file, title) pairs, in table order; deleting any pin row (the J5 security row included) reads red. */
const EXPECTED_PINS: readonly string[] = [
  "1|test/workbench-host-contract.test.ts|L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
  "3|test/workbench-observation.test.ts|disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
  "3|test/workbench-furnace-observer.test.ts|reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
  "3|test/workbench-furnace-vc4-receipt.test.ts|C2 falsifier: disconnect must make the reading and the nodes stale, keeping the last-known running label",
  "4|test/workbench-patch-proposal.test.ts|validates the candidate bytes exactly as the designer does and mirrors its status",
  "4|test/workbench-validate-reply.test.ts|never executes or writes the candidate source",
  "4|test/workbench-designer.test.ts|matched cohort yields measured deltas for every shared metric and states association, not causation",
  "5|test/workbench-control.test.ts|rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
  "5|test/workbench-control.test.ts|rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)",
  "5|test/workbench-native-details.test.ts|preserves selected node on resize and closes without invoking any runtime controls",
];
const pinKeys = (rows: readonly JourneyRow[]): string[] => rows.flatMap(r => (r.evidence.kind === "cases" ? r.evidence.pins.map(p => `${r.journey}|${p.file}|${p.title}`) : []));

interface Reader {
  readonly exists: (relative: string) => boolean;
  readonly read: (relative: string) => string;
}
const REPO_READER: Reader = {
  exists: relative => existsSync(join(ROOT, relative)),
  read: relative => readFileSync(join(ROOT, relative), "utf8"),
};

const COMMAND_ID = /^cmd_[0-9a-f]{12}$/;
const BEAD_ID = /^wb-[a-z0-9]+(?:\.[0-9]+)?$/;

/** The labels a row's evidence kind is allowed to carry. */
function allowedLabels(evidence: Evidence): readonly Label[] {
  if (evidence.kind === "cases") return ["fixture pass", "adversarial pass"];
  if (evidence.kind === "receipt") return ["live SDK pass"];
  if (evidence.kind === "artifact") return ["code present"];
  return ["code present", "not started"];
}

const describeRow = (r: JourneyRow, quotes: readonly string[]): string => `journey ${r.journey} ("${quotes[r.journey - 1] ?? "?"}") [${r.label}]`;

/** A receipt id must sit in a TRACEABILITY paragraph that is not itself SUPERSEDED. */
function receiptProblem(traceability: string, commandId: string): string | undefined {
  const blocks = traceability.split(/\n\s*\n/).filter(block => block.includes(commandId));
  if (blocks.length === 0) return `receipt ${commandId} is not recorded in TRACEABILITY`;
  if (blocks.every(block => /^\s*SUPERSEDED\b/.test(block))) return `receipt ${commandId} survives only inside a SUPERSEDED TRACEABILITY paragraph`;
  return undefined;
}

/** Every non-case failure names the journey number and its quoted sentence plus the label; a case row's pins are judged by judge(), not here. */
function auditRows(rows: readonly JourneyRow[], quotes: readonly string[], reader: Reader): readonly string[] {
  const failures: string[] = [];
  for (const r of rows) {
    const who = describeRow(r, quotes);
    if (!(LABELS as readonly string[]).includes(r.label)) failures.push(`${who}: label is outside the docs/14 closed set`);
    if (!allowedLabels(r.evidence).includes(r.label)) failures.push(`${who}: label does not match its ${r.evidence.kind} evidence`);
    const ev = r.evidence;
    if (ev.kind === "cases") {
      if (ev.pins.length === 0) failures.push(`${who}: fixture row has no pinned case`);
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
      if (!traceability.split("\n").some(line => line.trim() === ev.heading)) failures.push(`${who}: TRACEABILITY lost the section "${ev.heading}"`);
    } else if (!BEAD_ID.test(ev.bead)) {
      failures.push(`${who}: open row names no tracking bead (${ev.bead})`);
    }
  }
  return failures;
}

/** Every quoted journey must own at least one evidence row. */
function auditCoverage(rows: readonly JourneyRow[], quotes: readonly string[]): readonly string[] {
  const failures: string[] = [];
  for (let n = 1; n <= quotes.length; n += 1) {
    if (!rows.some(r => r.journey === n)) failures.push(`journey ${n} ("${quotes[n - 1] ?? "?"}"): no evidence row`);
  }
  return failures;
}

/** The one list block docs/11's section must render as: the five quoted sentences, in order. */
const JOURNEY_BLOCKS: readonly RenderedBlock[] = [{ kind: "list", ordered: false, items: JOURNEY_QUOTES.map(quote => ({ text: quote, markdown: quote })) }];

/** Every docs/11 drift, each naming the journey or the section it breaks. */
function docs11Failures(markdown: string): string[] {
  const out: string[] = [];
  const section = docsSection(markdown, JOURNEYS_HEADING, 2, [DOCS_11_PARENT]);
  if (!section.ok) return [`${DOCS_11} § ${JOURNEYS_HEADING}: the section is refused: ${section.why}`];
  JOURNEY_QUOTES.forEach((quote, index) => {
    if (!section.blocks.some(block => block.kind === "list" && block.items.some(item => item.text === quote))) out.push(`journey ${index + 1} ("${quote}"): sentence drifted in docs/11`);
  });
  const exact = sectionMatches(section, JOURNEY_BLOCKS);
  if (!exact.ok) out.push(`${DOCS_11} § ${JOURNEYS_HEADING} is not exactly its five frozen journey bullets: ${exact.why}`);
  return out;
}

/** Every docs/14 drift: the unique section, its first block exactly the label paragraph (text and source). */
function docs14Failures(markdown: string): string[] {
  const section = docsSection(markdown, TRUTH_HEADING, 2, [DOCS_14_PARENT]);
  if (!section.ok) return [`${DOCS_14} § ${TRUTH_HEADING}: the section is refused: ${section.why}`];
  const [first] = section.blocks;
  if (first === undefined || first.kind !== "paragraph") return [`${DOCS_14} § ${TRUTH_HEADING}: its first block is not the truth-label paragraph`];
  if (first.text !== TRUTH_TEXT || first.markdown !== TRUTH_TEXT) return [`${DOCS_14} § ${TRUTH_HEADING}: the truth-label paragraph drifted from its frozen text`];
  return [];
}

const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER });

/** The case rows, flattened to [row, pin] pairs for the per-pin judging. */
const REAL_PINS: readonly { readonly row: JourneyRow; readonly pin: Pin }[] = ROWS.flatMap(r => (r.evidence.kind === "cases" ? r.evidence.pins.map(pin => ({ row: r, pin })) : []));
const CASE_ROWS = ROWS.filter(r => r.evidence.kind === "cases");

/** One line per pin that is not ok, naming the journey, its sentence and label; the helper's why names the file, title, tier and cause. */
const failures = (r: JourneyRow, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `${describeRow(r, JOURNEY_QUOTES)}: ${verdict.code}: ${verdict.why}`);

/** The synthetic docs/11 the drift falsifiers run over: the frozen bullets under the real heading shape, never the live text. */
const synthetic11 = (bullets: readonly string[] = JOURNEY_QUOTES, tail = ""): string =>
  `# ${DOCS_11_PARENT}\n\n## Workflow designer cycle\n\nRows.\n\n## ${JOURNEYS_HEADING}\n\n${bullets.map(item => `- ${item}`).join("\n")}\n${tail}\n## Experimental read-only source tools\n\nText.\n`;
/** The synthetic docs/14 under the real heading shape. */
const synthetic14 = (truth: string = TRUTH_TEXT, tail = ""): string => `# ${DOCS_14_PARENT}\n\n## Matrix by subsystem\n\nRows.\n\n## ${TRUTH_HEADING}\n\n${truth}\n\nUse Forge build/test/gates as primary interface.\n${tail}`;

const synthTraceability = (...blocks: readonly string[]): string => `# Workbench requirement traceability\n\n${blocks.join("\n\n")}\n`;
const readerOf = (files: Readonly<Record<string, string>>): Reader => ({
  exists: relative => relative in files,
  read: relative => files[relative] ?? "",
});

describe("wb-h8f.9 docs/workbench/11 acceptance-journeys census (report mode)", () => {
  it("AC1: the table holds the eight frozen rows in order (journey:label:kind:pins), deeply frozen, covering all five journeys", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(isDeepFrozen(JOURNEY_QUOTES)).toBe(false);
    expect(JOURNEY_QUOTES).toHaveLength(5);
    expect(shapeOf(ROWS)).toEqual(EXPECTED_SHAPE);
    expect(ROWS).toHaveLength(8);
    expect([...new Set(ROWS.map(r => r.journey))].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(auditCoverage(ROWS, JOURNEY_QUOTES)).toEqual([]);
  });

  it("AC1: the ten (journey, file, title) pin pairs are exactly the frozen list, in order (the J5 security pins included)", () => {
    expect(pinKeys(ROWS)).toEqual(EXPECTED_PINS);
    expect(REAL_PINS).toHaveLength(10);
  });

  it("AC1: docs/11 renders exactly its five frozen journey bullets and docs/14 carries the truth-label paragraph exactly", () => {
    expect(docs11Failures(REPO_READER.read(DOCS_11))).toEqual([]);
    expect(docs14Failures(REPO_READER.read(DOCS_14))).toEqual([]);
    const section = docsSection(REPO_READER.read(DOCS_11), JOURNEYS_HEADING, 2, [DOCS_11_PARENT]);
    expect(sectionMatches(section, JOURNEY_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(section.blocks).toHaveLength(1);
  });

  it.each(CASE_ROWS.map(r => ({ r, journey: r.journey })))("AC2 journey $journey: every pinned case is collected once, passed and asserting in the default gate's own report", ({ r }) => {
    const pins = r.evidence.kind === "cases" ? r.evidence.pins : [];
    const verdicts = judge(
      REPORT,
      pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(pins.length);
    expect(failures(r, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(pins.map(() => "ok"));
  });

  it("AC3: every row carries one honest label for its evidence kind: receipts and artifacts resolve in TRACEABILITY, open rows name a bead", () => {
    expect(auditRows(ROWS, JOURNEY_QUOTES, REPO_READER)).toEqual([]);
  });

  it("AC3: only a receipt-backed row carries 'live SDK pass', and every receipt id is recorded in a live TRACEABILITY paragraph", () => {
    const live = ROWS.filter(r => r.label === "live SDK pass");
    expect(live.length).toBeGreaterThan(0);
    const traceability = REPO_READER.read(TRACEABILITY);
    for (const r of live) {
      expect(r.evidence.kind, describeRow(r, JOURNEY_QUOTES)).toBe("receipt");
      if (r.evidence.kind === "receipt") expect(receiptProblem(traceability, r.evidence.commandId), describeRow(r, JOURNEY_QUOTES)).toBeUndefined();
    }
    for (const r of ROWS.filter(x => x.evidence.kind === "receipt")) expect(r.label).toBe("live SDK pass");
  });

  it("AC3: the operator leg of journey 1 stays 'code present' on the committed receipt artifact (never a live pass without an owner ruling)", () => {
    expect(ROWS.filter(r => r.evidence.kind === "artifact").map(r => [r.journey, r.label])).toEqual([[1, "code present"]]);
  });

  it("AC3: open rows name their tracking bead and never carry a pass label", () => {
    const openRows = ROWS.filter(r => r.evidence.kind === "open");
    expect(openRows.map(r => (r.evidence.kind === "open" ? r.evidence.bead : ""))).toEqual(["wb-04s", "wb-h8f.2"]);
    for (const r of openRows) expect(["code present", "not started"]).toContain(r.label);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, reads no config and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.filter(entry => entry.module === "node:child_process" || entry.module === "child_process")).toEqual([]);
    const pinned = REAL_PINS.map(({ pin }) => basename(pin.file, ".ts"));
    expect(own.imports.filter(entry => pinned.some(name => entry.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(REPO_READER.read("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-h8f.9 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  it.each(REAL_PINS.map(({ row: r, pin }) => ({ journey: r.journey, file: pin.file, title: pin.title, r, pin })))(
    "journey $journey per-pin mutants on $file: a renamed title, a borrowed file and a relabelled tier are each red naming the journey, the file and the title",
    ({ r, pin }) => {
      const renamed = { ...pin, title: `${pin.title} (renamed)` };
      const [gone] = judge(REPORT, [casePin(renamed)]);
      expect(gone?.code).toBe("absent");
      const [renamedLine] = failures(r, judge(REPORT, [casePin(renamed)]));
      expect(renamedLine).toContain(`journey ${r.journey}`);
      expect(renamedLine).toContain(JOURNEY_QUOTES[r.journey - 1] ?? "?");
      expect(renamedLine).toContain(renamed.file);
      expect(renamedLine).toContain(renamed.title);
      const other = REAL_PINS.find(candidate => candidate.pin.file !== pin.file);
      expect(other).toBeDefined();
      const [borrowed] = judge(REPORT, [casePin({ file: other?.pin.file ?? "", title: pin.title })]);
      expect(borrowed?.ok).toBe(false);
      const [mislabelled] = judge(REPORT, [{ ...casePin(pin), tier: "bench-receipt" }]);
      expect(mislabelled?.code).toBe("tier-mismatch");
    },
  );

  it("M1: a pin with no title is red (the judge finds no such case)", () => {
    const first = REAL_PINS[0];
    expect(first).toBeDefined();
    const [verdict] = judge(REPORT, [casePin({ file: first?.pin.file ?? "", title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M2: a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [casePin({ file: EXCLUDED_FILE, title: "any title" })]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("M3: a pinned title that two rows share is judged once per row, so the J5 control file keeps both of its pins live", () => {
    const control = REAL_PINS.filter(({ pin }) => pin.file === "test/workbench-control.test.ts");
    expect(control.map(({ row: r }) => r.journey)).toEqual([5, 5]);
    expect(new Set(control.map(({ pin }) => pin.title)).size).toBe(2);
  });

  it("M4: deleting a row, a pin or a pin-row from the frozen table changes the frozen shape or the pin-pair list", () => {
    expect(shapeOf(ROWS.filter(r => r.journey !== 5))).not.toEqual(EXPECTED_SHAPE);
    const noSecurity = ROWS.filter(r => !(r.journey === 5 && r.evidence.kind === "cases"));
    expect(shapeOf(noSecurity)).not.toEqual(EXPECTED_SHAPE);
    expect(pinKeys(noSecurity)).not.toEqual(EXPECTED_PINS);
    const shorter = ROWS.map(r => (r.journey === 4 && r.evidence.kind === "cases" ? row(4, r.label, fixture(...r.evidence.pins.slice(1))) : r));
    expect(shapeOf(shorter)).not.toEqual(EXPECTED_SHAPE);
    expect(pinKeys(shorter)).not.toEqual(EXPECTED_PINS);
    const swapped = ROWS.map(r => (r.journey === 5 && r.evidence.kind === "cases" ? row(5, r.label, fixture(...r.evidence.pins.map(pin => ({ ...pin, title: "a passing case that pins nothing here" })))) : r));
    expect(pinKeys(swapped)).not.toEqual(EXPECTED_PINS);
  });
});

describe("wb-h8f.9 receipt, artifact, label and coverage falsifiers (synthetic TRACEABILITY, rendered docs)", () => {
  const goodRows = (): readonly JourneyRow[] => [row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa")), row(2, "code present", artifact("qa/x.json", "## Section")), row(3, "not started", open("wb-1"))];
  const goodTrace = synthTraceability("Live receipt cmd_aaaaaaaaaaaa here.", "See qa/x.json\n\n## Section\n\nBody.");
  const goodFiles = { [TRACEABILITY]: goodTrace, "qa/x.json": "{}" };

  it("baseline: a healthy table audits clean (no false positive)", () => {
    expect(auditRows(goodRows(), JOURNEY_QUOTES, readerOf(goodFiles))).toEqual([]);
  });

  it("fabricated-receipt mutant: a command id absent from TRACEABILITY fails the live row naming the journey", () => {
    const lines = auditRows([row(1, "live SDK pass", receipt("cmd_bbbbbbbbbbbb"))], JOURNEY_QUOTES, readerOf(goodFiles));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("journey 1");
    expect(lines[0]).toContain("is not recorded in TRACEABILITY");
  });

  it("malformed-receipt mutant: an id that is not a command id fails", () => {
    expect(auditRows([row(1, "live SDK pass", receipt("cmd_short"))], JOURNEY_QUOTES, readerOf(goodFiles))[0]).toContain("is not a command id");
  });

  it("superseded-receipt mutant: a command id that survives only in a SUPERSEDED paragraph fails the live row", () => {
    const files = { ...goodFiles, [TRACEABILITY]: synthTraceability("SUPERSEDED cmd_aaaaaaaaaaaa was withdrawn.") };
    expect(auditRows([row(1, "live SDK pass", receipt("cmd_aaaaaaaaaaaa"))], JOURNEY_QUOTES, readerOf(files))[0]).toContain("SUPERSEDED");
  });

  it("artifact mutant: a missing receipt file, an uncited file or a lost TRACEABILITY section fails the operator row", () => {
    const op = [row(1, "code present", artifact("qa/x.json", "## Section"))];
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ [TRACEABILITY]: goodTrace }))[0]).toContain("is missing");
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ ...goodFiles, [TRACEABILITY]: synthTraceability("See qa/x.json only.") })).some(line => line.includes("lost the section"))).toBe(true);
    expect(auditRows(op, JOURNEY_QUOTES, readerOf({ ...goodFiles, [TRACEABILITY]: synthTraceability("## Section", "Nothing cites the file.") })).some(line => line.includes("is not cited in TRACEABILITY"))).toBe(true);
  });

  it("unbacked-live mutant: 'live SDK pass' on an open row or a case row fails the label check", () => {
    expect(auditRows([row(1, "live SDK pass", open("wb-1"))], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("does not match its open evidence"))).toBe(true);
    expect(auditRows([row(1, "live SDK pass", fixture({ file: "a", title: "b" }))], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("does not match its cases evidence"))).toBe(true);
  });

  it("pass-label-on-open mutant: an open row carrying 'fixture pass' fails", () => {
    expect(auditRows([row(1, "fixture pass", open("wb-1"))], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("does not match its open evidence"))).toBe(true);
  });

  it("unknown-label mutant: a label outside the docs/14 closed set fails", () => {
    const bogus = { journey: 1, label: "very green", evidence: open("wb-1") } as unknown as JourneyRow;
    expect(auditRows([bogus], JOURNEY_QUOTES, readerOf(goodFiles)).some(line => line.includes("outside the docs/14 closed set"))).toBe(true);
  });

  it("bead mutant: an open row without a bead id fails", () => {
    expect(auditRows([row(1, "not started", open("soon"))], JOURNEY_QUOTES, readerOf(goodFiles))[0]).toContain("names no tracking bead");
  });

  it("empty-fixture mutant: a fixture row with no pinned case fails", () => {
    expect(auditRows([row(1, "fixture pass", fixture())], JOURNEY_QUOTES, readerOf(goodFiles))[0]).toContain("fixture row has no pinned case");
  });

  it("coverage mutant: a journey with no row fails naming its sentence", () => {
    const lines = auditCoverage(ROWS.filter(r => r.journey !== 2), JOURNEY_QUOTES);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("journey 2");
    expect(lines[0]).toContain(JOURNEY_QUOTES[1] ?? "?");
  });

  it("thaw mutant: an unfrozen table or row is detected", () => {
    expect(isDeepFrozen([row(1, "not started", open("wb-1"))])).toBe(false);
    expect(isDeepFrozen(JSON.parse(JSON.stringify(ROWS)))).toBe(false);
  });
});

describe("wb-h8f.9 docs drift names the journey or the section (synthetic documents, rendered view)", () => {
  const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("journey ")).map(line => line.slice(0, line.indexOf(" (")));

  it("accepts docs/11 exactly as written, at EOF and bounded by the following level-2 heading, and docs/14 exactly as written", () => {
    expect(docs11Failures(synthetic11())).toEqual([]);
    expect(docs11Failures(`# ${DOCS_11_PARENT}\n\n## ${JOURNEYS_HEADING}\n\n${JOURNEY_QUOTES.map(item => `- ${item}`).join("\n")}\n`)).toEqual([]);
    expect(docs14Failures(synthetic14())).toEqual([]);
  });

  it("an edited journey sentence names exactly that journey, plus the section exactness", () => {
    const edited = JOURNEY_QUOTES.map((quote, index) => (index === 2 ? quote.replace("last-known state", "current state") : quote));
    const lines = docs11Failures(synthetic11(edited));
    expect(named(lines)).toEqual(["journey 3"]);
    expect(lines.some(line => line.includes("is not exactly its five frozen journey bullets"))).toBe(true);
  });

  it("D1: a sixth weakening bullet goes red on the section, naming no journey", () => {
    const lines = docs11Failures(synthetic11([...JOURNEY_QUOTES, "Journeys 2-4 are aspirational and are not release gates."]));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("is not exactly its five frozen journey bullets");
  });

  it("D1: two journey bullets swapped go red on the section, naming no journey", () => {
    const reordered = [JOURNEY_QUOTES[1] ?? "", JOURNEY_QUOTES[0] ?? "", ...JOURNEY_QUOTES.slice(2)];
    const lines = docs11Failures(synthetic11(reordered));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("block 1 differs");
  });

  it("D1: a stray line or a ### subsection appended inside the docs/11 section goes red", () => {
    expect(docs11Failures(synthetic11(JOURNEY_QUOTES, "\nAll of the above are optional.\n")).length).toBeGreaterThan(0);
    expect(docs11Failures(synthetic11(JOURNEY_QUOTES, "\n### Exceptions\n\nA host may skip these.\n")).length).toBeGreaterThan(0);
  });

  it("D1b: the section heading renamed away is refused", () => {
    const lines = docs11Failures(synthetic11().replace(`## ${JOURNEYS_HEADING}`, "## Acceptance notes"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D3: a journey hidden in an HTML comment names that journey and the section refuses the HTML", () => {
    const hidden = JOURNEY_QUOTES.map((quote, index) => (index === 1 ? `<!-- ${quote} -->` : quote));
    const lines = docs11Failures(synthetic11(hidden));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.startsWith("journey 2"))).toBe(true);
  });

  it("D4: a duplicated heading at EOF is refused (the section needs its heading exactly once)", () => {
    const lines = docs11Failures(`${synthetic11()}\n## ${JOURNEYS_HEADING}\n\n- Journeys are advisory.\n`);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("occurs 2 times");
  });

  it("D5: a level-1 heading inserted above re-homes the section and is refused", () => {
    const lines = docs11Failures(synthetic11().replace(`## ${JOURNEYS_HEADING}`, `# Appendix\n\n## ${JOURNEYS_HEADING}`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D2: a sentence appended to, or substituted in, the docs/14 truth-label paragraph goes red", () => {
    expect(docs14Failures(synthetic14(`${TRUTH_TEXT} These labels are advisory and may be omitted.`))).toHaveLength(1);
    expect(docs14Failures(synthetic14(TRUTH_TEXT.replace('"fixture pass", ', "")))).toHaveLength(1);
    expect(docs14Failures(synthetic14(TRUTH_TEXT.replace("quietly weakened", "weakened")))).toHaveLength(1);
  });

  it("D2: a docs/14 heading renamed away, duplicated or re-homed is refused, and an unrelated paragraph edit stays green", () => {
    expect(docs14Failures(synthetic14().replace(`## ${TRUTH_HEADING}`, "## Labels"))[0]).toContain("the section is refused");
    expect(docs14Failures(`${synthetic14()}\n## ${TRUTH_HEADING}\n\nAgain.\n`)[0]).toContain("occurs 2 times");
    expect(docs14Failures(synthetic14().replace(`## ${TRUTH_HEADING}`, `# Appendix\n\n## ${TRUTH_HEADING}`))[0]).toContain("the section is refused");
    expect(docs14Failures(synthetic14().replace("Use Forge build/test/gates as primary interface.", "Different second paragraph."))).toEqual([]);
  });

  it("an edit of any other docs/11 section never reddens a journey: the neighbouring sections are free to change", () => {
    expect(docs11Failures(synthetic11().replace("Rows.", "Rows, changed.").replace("Text.", "Different text."))).toEqual([]);
  });
});
