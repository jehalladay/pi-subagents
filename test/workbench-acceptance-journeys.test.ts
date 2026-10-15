/**
 * wb-h8f.9: docs/11 "Acceptance journeys" census falsifier.
 *
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates": "All docs and status
 * tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass",
 * "scale benchmark pass"." and "Each major work package must have a falsifier: a negative test that
 * would fail if a critical guarantee was quietly weakened." This file binds the five docs/11
 * journey sentences to one truth label per evidence leg. It reads sources and docs statically,
 * never executes a journey, and never reports a live pass from a title's presence.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_11 = "docs/workbench/11-designer-and-operator.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";

/** The docs/14 closed label set, plus the explicit "not started" row the bead allows. */
const LABELS = ["code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass", "not started"] as const;
type Label = (typeof LABELS)[number];

interface CasePin {
  readonly file: string;
  readonly title: string;
}

type Evidence =
  | { readonly kind: "cases"; readonly pins: readonly CasePin[] }
  | { readonly kind: "receipt"; readonly commandId: string }
  | { readonly kind: "open"; readonly bead: string };

interface JourneyRow {
  readonly journey: number;
  readonly label: Label;
  readonly evidence: Evidence;
}

/** docs/11 "Acceptance journeys", verbatim and in document order (journey n is index n-1). */
const JOURNEY_QUOTES: readonly string[] = Object.freeze([
  "Pi reads saved script, opens inspector, executes it with Claude SDK; no Pi-owned subagent used for script agent().",
  "Pi inspects a MechanicalWorkflows ordinary function and its descriptor without executing it.",
  "Pi attaches to externally created Furnace Run, explains last-known state and observation freshness.",
  "Pi generates a source diff improving redundant task, validates it, executes reproducible comparison and cites native results.",
  "An observer-only Pi instance cannot stop the Run, even with a guessed action name.",
]);

const TRUTH_LABEL_SENTENCE =
  'All docs and status tables must distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass".';

function fixture(...pins: readonly CasePin[]): Evidence {
  return Object.freeze({ kind: "cases", pins: Object.freeze(pins.map(p => Object.freeze({ ...p }))) });
}

function receipt(commandId: string): Evidence {
  return Object.freeze({ kind: "receipt", commandId });
}

function open(bead: string): Evidence {
  return Object.freeze({ kind: "open", bead });
}

function row(journey: number, label: Label, evidence: Evidence): JourneyRow {
  return Object.freeze({ journey, label, evidence });
}

/**
 * One row per evidence leg. Tracking beads for OPEN rows (store status at cut time, 2026-10-15):
 * wb-a2g.3 open, wb-04s blocked, wb-752.3 in_progress, wb-h8f.2 open.
 */
const ROWS: readonly JourneyRow[] = Object.freeze([
  row(
    1,
    "fixture pass",
    fixture({
      file: "test/workbench-host-contract.test.ts",
      title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
    }),
  ),
  row(1, "live SDK pass", receipt("cmd_2a275dcbd6c6")),
  row(1, "code present", open("wb-a2g.3")),
  row(2, "not started", open("wb-04s")),
  row(
    3,
    "fixture pass",
    fixture(
      {
        file: "test/workbench-observation.test.ts",
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
      },
      {
        file: "test/workbench-furnace-observer.test.ts",
        title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING",
      },
    ),
  ),
  row(3, "code present", open("wb-752.3")),
  row(
    4,
    "fixture pass",
    fixture(
      {
        file: "test/workbench-patch-proposal.test.ts",
        title: "validates the candidate bytes exactly as the designer does and mirrors its status",
      },
      {
        file: "test/workbench-validate-reply.test.ts",
        title: "never executes or writes the candidate source",
      },
      {
        file: "test/workbench-designer.test.ts",
        title: "matched cohort yields measured deltas for every shared metric and states association, not causation",
      },
    ),
  ),
  row(4, "code present", open("wb-h8f.2")),
  row(
    5,
    "fixture pass",
    fixture(
      {
        file: "test/workbench-control.test.ts",
        title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
      },
      {
        file: "test/workbench-control.test.ts",
        title: "rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)",
      },
      {
        file: "test/workbench-native-details.test.ts",
        title: "preserves selected node on resize and closes without invoking any runtime controls",
      },
    ),
  ),
]);

interface CaseOccurrence {
  readonly title: string;
  /** "" for a plain case, otherwise the modifier (skip, todo, fails, only). */
  readonly modifier: string;
}

const CASE_CALL = /\b(?:it|test)(?:\.(skip|todo|fails|only))?\(\s*(["'`])((?:\\.|(?!\2)[^\\])*)\2/g;

function decodeEscapes(raw: string): string {
  return raw.replace(/\\(.)/g, (_all, ch: string) => ch);
}

function listCases(source: string): readonly CaseOccurrence[] {
  const found: CaseOccurrence[] = [];
  for (const match of source.matchAll(CASE_CALL)) {
    found.push({ title: decodeEscapes(match[3] ?? ""), modifier: match[1] ?? "" });
  }
  return found;
}

function judgePin(source: string, title: string): { readonly ok: boolean; readonly why: string } {
  const hits = listCases(source).filter(c => c.title === title);
  if (hits.length === 0) return { ok: false, why: "absent" };
  if (hits.length > 1) return { ok: false, why: `duplicated x${hits.length}` };
  const [only] = hits;
  if (only !== undefined && only.modifier !== "") return { ok: false, why: `modifier .${only.modifier}` };
  return { ok: true, why: "present" };
}

function readRepo(relative: string): string {
  return readFileSync(join(ROOT, relative), "utf8");
}

function sectionLines(doc: string, heading: string): readonly string[] {
  const lines = doc.split("\n");
  const start = lines.findIndex(l => l.trim() === heading);
  if (start < 0) return [];
  const out: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break;
    out.push(line);
  }
  return out;
}


const COMMAND_ID = /^cmd_[0-9a-f]{12}$/;
const BEAD_ID = /^wb-[a-z0-9]+(?:\.[0-9]+)?$/;

/** The label a row's evidence kind is allowed to carry. */
function allowedLabels(evidence: Evidence): readonly Label[] {
  if (evidence.kind === "cases") return ["fixture pass", "adversarial pass"];
  if (evidence.kind === "receipt") return ["live SDK pass"];
  return ["code present", "not started"];
}

function describeRow(r: JourneyRow, quotes: readonly string[]): string {
  return `journey ${r.journey} ("${quotes[r.journey - 1] ?? "?"}") [${r.label}]`;
}

interface Reader {
  readonly exists: (relative: string) => boolean;
  readonly read: (relative: string) => string;
}

const REPO_READER: Reader = {
  exists: relative => existsSync(join(ROOT, relative)),
  read: readRepo,
};

/** Every failure names the journey number and its quoted sentence. */
function auditRows(rows: readonly JourneyRow[], quotes: readonly string[], reader: Reader): readonly string[] {
  const failures: string[] = [];
  for (const r of rows) {
    const who = describeRow(r, quotes);
    if (!(LABELS as readonly string[]).includes(r.label)) failures.push(`${who}: label is outside the docs/14 closed set`);
    if (!allowedLabels(r.evidence).includes(r.label)) failures.push(`${who}: label does not match its ${r.evidence.kind} evidence`);
    const ev = r.evidence;
    if (ev.kind === "cases") {
      if (ev.pins.length === 0) failures.push(`${who}: fixture row has no pinned case`);
      for (const pin of ev.pins) {
        if (!reader.exists(pin.file)) {
          failures.push(`${who}: ${pin.file} is missing`);
          continue;
        }
        const verdict = judgePin(reader.read(pin.file), pin.title);
        if (!verdict.ok) failures.push(`${who}: "${pin.title}" in ${pin.file} is ${verdict.why}`);
      }
    } else if (ev.kind === "receipt") {
      if (!COMMAND_ID.test(ev.commandId)) failures.push(`${who}: ${ev.commandId} is not a command id`);
      else if (!reader.read(TRACEABILITY).includes(ev.commandId)) failures.push(`${who}: receipt ${ev.commandId} is not recorded in TRACEABILITY`);
    } else if (!BEAD_ID.test(ev.bead)) {
      failures.push(`${who}: open row names no tracking bead (${ev.bead})`);
    }
  }
  return failures;
}

/** Every quoted journey must own at least one evidence row. */
function auditCoverage(rows: readonly JourneyRow[], quotes: readonly string[]): readonly string[] {
  const failures: string[] = [];
  for (let n = 1; n <= quotes.length; n++) {
    if (!rows.some(r => r.journey === n)) failures.push(`journey ${n} ("${quotes[n - 1] ?? "?"}"): no evidence row`);
  }
  return failures;
}

function auditDocs(docs11: string, docs14: string, quotes: readonly string[]): readonly string[] {
  const failures: string[] = [];
  const section = sectionLines(docs11, "## Acceptance journeys").map(l => l.trim());
  quotes.forEach((quote, i) => {
    if (!section.includes(`- ${quote}`)) failures.push(`journey ${i + 1} ("${quote}"): sentence drifted in docs/11`);
  });
  if (!sectionLines(docs14, "## Truth labels and release gates").join("\n").includes(TRUTH_LABEL_SENTENCE)) {
    failures.push("docs/14 truth-label sentence drifted");
  }
  return failures;
}

function deepFrozen(rows: readonly JourneyRow[]): boolean {
  if (!Object.isFrozen(rows)) return false;
  return rows.every(r => {
    if (!Object.isFrozen(r) || !Object.isFrozen(r.evidence)) return false;
    return r.evidence.kind !== "cases" || (Object.isFrozen(r.evidence.pins) && r.evidence.pins.every(p => Object.isFrozen(p)));
  });
}

describe("docs/11 acceptance journeys census (wb-h8f.9)", () => {
  it("the table is frozen and covers exactly the five docs/11 journeys, each with at least one evidence row", () => {
    expect(deepFrozen(ROWS)).toBe(true);
    expect(Object.isFrozen(JOURNEY_QUOTES)).toBe(true);
    expect(JOURNEY_QUOTES).toHaveLength(5);
    expect([...new Set(ROWS.map(r => r.journey))].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(auditCoverage(ROWS, JOURNEY_QUOTES)).toEqual([]);
  });

  it("docs/11 and docs/14 still carry every quoted journey sentence and the truth-label sentence verbatim", () => {
    expect(auditDocs(readRepo(DOCS_11), readRepo(DOCS_14), JOURNEY_QUOTES)).toEqual([]);
  });

  for (let n = 1; n <= 5; n++) {
    it(`journey ${n}: every evidence row carries one honest label, its pinned cases exist exactly once and are not skipped`, () => {
      const rows = ROWS.filter(r => r.journey === n);
      expect(rows.length, `journey ${n} needs a row`).toBeGreaterThan(0);
      expect(auditRows(rows, JOURNEY_QUOTES, REPO_READER)).toEqual([]);
    });
  }

  it("only a receipt-backed row carries 'live SDK pass', and every receipt id is recorded in TRACEABILITY", () => {
    const live = ROWS.filter(r => r.label === "live SDK pass");
    expect(live.length).toBeGreaterThan(0);
    const traceability = readRepo(TRACEABILITY);
    for (const r of live) {
      expect(r.evidence.kind, describeRow(r, JOURNEY_QUOTES)).toBe("receipt");
      if (r.evidence.kind === "receipt") expect(traceability, describeRow(r, JOURNEY_QUOTES)).toContain(r.evidence.commandId);
    }
    for (const r of ROWS.filter(x => x.evidence.kind === "receipt")) expect(r.label).toBe("live SDK pass");
  });

  it("open rows name their tracking bead and never carry a pass label", () => {
    const openRows = ROWS.filter(r => r.evidence.kind === "open");
    expect(openRows.map(r => (r.evidence.kind === "open" ? r.evidence.bead : ""))).toEqual(["wb-a2g.3", "wb-04s", "wb-752.3", "wb-h8f.2"]);
    for (const r of openRows) expect(["code present", "not started"]).toContain(r.label);
  });
});

describe("journey census falsifiers (one mutant per failure mode)", () => {
  const SOURCES = new Map<string, string>([
    ["test/a.test.ts", [`describe("x", () => {`, `  it("keeps the journey case", () => {});`, `});`].join("\n")],
    [TRACEABILITY, "receipt cmd_aaaaaaaaaaaa recorded"],
  ]);
  const QUOTES = ["first sentence", "second sentence"];
  const reader = (sources: ReadonlyMap<string, string>): Reader => ({
    exists: relative => sources.has(relative),
    read: relative => sources.get(relative) ?? "",
  });
  const CASE_ROW = row(1, "fixture pass", fixture({ file: "test/a.test.ts", title: "keeps the journey case" }));
  const OTHER = row(2, "not started", open("wb-04s"));

  it("baseline: a healthy two-journey table audits clean", () => {
    expect(auditRows([CASE_ROW, OTHER], QUOTES, reader(SOURCES))).toEqual([]);
  });

  it("rename mutant: a renamed case fails naming the journey number and its sentence", () => {
    const mutant = new Map(SOURCES).set("test/a.test.ts", `it("keeps the case", () => {});`);
    const failures = auditRows([CASE_ROW, OTHER], QUOTES, reader(mutant));
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('journey 1 ("first sentence")');
    expect(failures[0]).toContain("absent");
  });

  it("delete mutant: a removed file fails naming the journey", () => {
    const mutant = new Map(SOURCES);
    mutant.delete("test/a.test.ts");
    expect(auditRows([CASE_ROW, OTHER], QUOTES, reader(mutant))[0]).toContain('journey 1 ("first sentence")');
  });

  it.each(["skip", "todo", "fails", "only"])("modifier mutant: it.%s fails naming the journey and the modifier", modifier => {
    const mutant = new Map(SOURCES).set("test/a.test.ts", `it.${modifier}("keeps the journey case", () => {});`);
    const failures = auditRows([CASE_ROW, OTHER], QUOTES, reader(mutant));
    expect(failures[0]).toContain('journey 1 ("first sentence")');
    expect(failures[0]).toContain(`modifier .${modifier}`);
  });

  it("duplicate mutant: a second identical title fails as duplicated", () => {
    const mutant = new Map(SOURCES).set("test/a.test.ts", `it("keeps the journey case", () => {});\nit("keeps the journey case", () => {});`);
    expect(auditRows([CASE_ROW, OTHER], QUOTES, reader(mutant))[0]).toContain("duplicated x2");
  });

  it("fabricated-receipt mutant: a command id absent from TRACEABILITY fails the live row", () => {
    const fabricated = row(1, "live SDK pass", receipt("cmd_bbbbbbbbbbbb"));
    const failures = auditRows([CASE_ROW, fabricated, OTHER], QUOTES, reader(SOURCES));
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain("cmd_bbbbbbbbbbbb is not recorded in TRACEABILITY");
  });

  it("unbacked-live mutant: 'live SDK pass' on an open row or a case row fails the label check", () => {
    const failures = auditRows([row(1, "live SDK pass", open("wb-a2g.3")), row(2, "live SDK pass", fixture({ file: "test/a.test.ts", title: "keeps the journey case" }))], QUOTES, reader(SOURCES));
    expect(failures.filter(f => f.includes("label does not match"))).toHaveLength(2);
  });

  it("pass-label-on-open mutant: an open row carrying 'fixture pass' fails", () => {
    expect(auditRows([CASE_ROW, row(2, "fixture pass", open("wb-04s"))], QUOTES, reader(SOURCES))[0]).toContain("label does not match its open evidence");
  });

  it("unknown-label mutant: a label outside the docs/14 closed set fails", () => {
    const bogus = Object.freeze({ journey: 2, label: "mostly works" as Label, evidence: open("wb-04s") });
    expect(auditRows([CASE_ROW, bogus], QUOTES, reader(SOURCES)).some(f => f.includes("outside the docs/14 closed set"))).toBe(true);
  });

  it("bead mutant: an open row without a bead id fails", () => {
    expect(auditRows([CASE_ROW, row(2, "not started", open("soon"))], QUOTES, reader(SOURCES))[0]).toContain("names no tracking bead");
  });

  it("coverage mutant: a journey with no row fails naming its sentence", () => {
    expect(auditCoverage([CASE_ROW], QUOTES)).toEqual(['journey 2 ("second sentence"): no evidence row']);
  });

  it("docs drift mutant: an edited journey sentence or truth-label sentence fails", () => {
    const docs11 = ["## Acceptance journeys", "", "- first sentence", "- second sentence changed"].join("\n");
    const docs14 = ["## Truth labels and release gates", "", TRUTH_LABEL_SENTENCE].join("\n");
    expect(auditDocs(docs11, docs14, QUOTES)).toEqual(['journey 2 ("second sentence"): sentence drifted in docs/11']);
    expect(auditDocs(docs11, docs14.replace("fixture pass", "fixture ok"), QUOTES)).toContain("docs/14 truth-label sentence drifted");
  });

  it("thaw mutant: an unfrozen table or row is detected", () => {
    expect(deepFrozen([...ROWS])).toBe(false);
    expect(deepFrozen([{ ...ROWS[0], journey: 1 } as JourneyRow])).toBe(false);
  });
});
