/**
 * wb-r5q2 [MWI-telemetry] (slice PI-7): red-first acceptance for EAT-R164 of the mechanical-interoperability-audit-2026-11-06
 * delta, docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md
 * at pi-subagents master b8cd53aa36 (lines 928-943; program pins pi d7666a76 and mw 97e18068), quoted:
 *
 * - EAT-R164 "Cost figures MUST be fresh measurements with date, host, command and sample size; October figures are history
 *   only." Acceptance: "The receipt validator rejects a cost sentence lacking date/host/command/sample fields; a docs census
 *   flags '398' or '7 s' used with a present-tense cost verb outside a dated-history clause; the wb-r5q2 load receipt's cost
 *   table carries the fields for each measured stage (pack, install, admission, gate)." Mutant: "Copy the October median into
 *   the receipt as 'current install cost'; the validator flags it."
 *
 * The judges are qa/workbench/mwi-cost-figures.mjs. A "cost sentence" here is one row of a receipt's fenced mwi-cost block
 * (that module's header gives the row form); cost prose outside such a block is judged only by the October-figure census.
 *
 * NOT CLAIMED by this suite: a cost sentence in free prose that names neither October figure; a command holding "; "; units
 * other than the module's VALUE forms; an October figure in another unit (398000 ms or 7000 ms in a row passes); the receipts of program beads that carry no mwi-release block; any October figure
 * spelling other than the pinned ones; whether a figure in a row is fresh beyond its fields being present and well formed.
 *
 * RESIDUALS of the October-figure census (named in the module header, each with pinned quiet rows and a live twin below):
 * R164-RESIDUAL-DATE-ELSEWHERE, a figure stated as a current cost on a rendered line that also names its own report date in
 * another clause; R164-RESIDUAL-HEADER-VERB, a table whose present-tense cost verb is in a header cell while the figure is in a
 * body cell.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  COST_FIELDS,
  COST_STAGES,
  costTableFindings,
  historicalFigureFindings,
  programCensusFiles,
} from "../qa/workbench/mwi-cost-figures.mjs";

const REPO = join(import.meta.dirname, "..");
const PIN = "8ed3a731106969798cd35ce5c16720a4a1aab307";
const FIELDS = `date=2026-11-07T21:40:00Z; host=the seat's build host; command=npm pack --dry-run --json; samples=3; pin=${PIN}; value=812 ms`;
const block = (...rows: string[]): string => ["# wb-x: receipt", "", "## 2026-11-07 entry", "", "```mwi-cost", ...rows, "```", ""].join("\n");
const fullTable = (overrides: Readonly<Record<string, string>> = {}): string =>
  block(...COST_STAGES.map(stage => `${stage}: ${overrides[stage] ?? FIELDS}`));
const rules = (markdown: string): string[] => costTableFindings(markdown).map(finding => finding.rule);
/** A markdown document of `lines` under a title, as the census reads one. */
const doc = (...lines: string[]): string => ["# wb-x: doc", "", ...lines, ""].join("\n");

describe("EAT-R164: a cost row carries date, host, command, sample size, source pin and value, and a row valued at an October figure spelled 398 s or 7 s is refused", () => {
  it("R164-ROW-COMPLETE: a table whose four stage rows each carry the six fields well formed has no finding", () => {
    expect(COST_STAGES).toEqual(["pack", "install", "admission", "gate"]);
    expect(COST_FIELDS).toEqual(["date", "host", "command", "samples", "pin", "value"]);
    expect(costTableFindings(fullTable())).toEqual([]);
  }, 5_000);

  it.each(["date", "host", "command", "samples", "pin", "value"])("R164-ROW-FIELDS: a row without its %s field is refused as field-missing naming the field and the stage", field => {
    const row = FIELDS.split("; ").filter(part => !part.startsWith(`${field}=`)).join("; ");
    expect(costTableFindings(fullTable({ install: row }))).toEqual([{ rule: "field-missing", stage: "install", detail: field }]);
  }, 5_000);

  it("R164-ROW-FORMS: a malformed date, sample size, pin or value is refused by its own rule, and an empty or unknown field by its", () => {
    const swap = (field: string, value: string): string => FIELDS.replace(new RegExp(`${field}=[^;]*`), `${field}=${value}`);
    expect(rules(fullTable({ pack: swap("date", "yesterday") }))).toEqual(["date-malformed"]);
    expect(rules(fullTable({ pack: swap("samples", "0") }))).toEqual(["samples-malformed"]);
    expect(rules(fullTable({ pack: swap("samples", "three") }))).toEqual(["samples-malformed"]);
    expect(rules(fullTable({ pack: swap("samples", "1.5") }))).toEqual(["samples-malformed"]);
    expect(rules(fullTable({ pack: swap("pin", "the base commit") }))).toEqual(["pin-malformed"]);
    expect(rules(fullTable({ pack: swap("value", "812") }))).toEqual(["value-malformed"]);
    expect(rules(fullTable({ pack: swap("value", "fast") }))).toEqual(["value-malformed"]);
    expect(rules(fullTable({ pack: swap("host", "") }))).toEqual(["field-empty"]);
    expect(rules(fullTable({ pack: `${FIELDS}; cache=warm` }))).toEqual(["field-unknown"]);
    expect(rules(fullTable({ pack: `${FIELDS}; samples=4` }))).toEqual(["field-duplicate"]);
    expect(rules(fullTable({ pack: `${FIELDS}; stray` }))).toEqual(["field-malformed"]);
    expect(rules(fullTable({ pack: swap("date", "2026-11-07") }))).toEqual([]);
    expect(rules(fullTable({ pack: swap("value", "1.25 s") }))).toEqual([]);
  }, 5_000);

  it("R164-NOT-RUN: a stage row reading 'not run: <why>' needs no field, and one without its reason is refused", () => {
    expect(costTableFindings(fullTable({ gate: "not run: the complete gate of record belongs to the gate lane" }))).toEqual([]);
    expect(costTableFindings(fullTable({ gate: "not run:" }))).toEqual([{ rule: "not-run-unexplained", stage: "gate", detail: "not run:" }]);
  }, 5_000);

  it("R164-OCTOBER-AS-CURRENT: the October median copied into a row as the current install cost is refused, at 398 s and at 7 s, while a fresh 7012 ms is not", () => {
    const value = (figure: string): string => FIELDS.replace(/value=[^;]*/, `value=${figure}`);
    expect(costTableFindings(fullTable({ install: value("398 s") }))).toEqual([{ rule: "historical-figure-as-current", stage: "install", detail: "398 s (2026-10-20 history)" }]);
    expect(costTableFindings(fullTable({ install: value("7 s") }))).toEqual([{ rule: "historical-figure-as-current", stage: "install", detail: "7 s (2026-11-02 history)" }]);
    expect(costTableFindings(fullTable({ install: value("7012 ms") }))).toEqual([]);
  }, 5_000);

  it("R164-TABLE-STAGES: a table without a stage, with a stage twice, or with an unknown stage is refused, and a receipt with no table is refused", () => {
    expect(rules(block(...COST_STAGES.filter(stage => stage !== "gate").map(stage => `${stage}: ${FIELDS}`)))).toEqual(["stage-missing"]);
    expect(costTableFindings(block(...COST_STAGES.filter(stage => stage !== "gate").map(stage => `${stage}: ${FIELDS}`)))[0]?.stage).toBe("gate");
    expect(rules(block(...COST_STAGES.map(stage => `${stage}: ${FIELDS}`), `pack: ${FIELDS}`))).toEqual(["stage-duplicate"]);
    expect(rules(block(...COST_STAGES.map(stage => `${stage}: ${FIELDS}`), `deploy: ${FIELDS}`))).toEqual(["stage-unknown"]);
    expect(rules("# wb-x: receipt\n\n## 2026-11-07 entry\n\nno table here\n")).toEqual(["cost-table-missing"]);
    expect(rules("# wb-x: receipt\n\n```mwi-costs\npack: x\n```\n")).toEqual(["cost-table-missing"]);
  }, 5_000);
});

describe("EAT-R164: the docs census flags 398 s or 7 s with a present-tense cost verb on a rendered line that does not name the figure's own report date", () => {
  it.each([
    ["The current install cost is 398 s.", "398 s"],
    ["npm ci takes 7 s on the shared cache.", "7 s"],
    ["Admission costs 7s per run.", "7 s"],
    ["A gate run lasts 398 seconds.", "398 s"],
    ["Install is 398 s, per the 2026-11-02 report.", "398 s"],
  ])("R164-CENSUS-FLAGS: %j is flagged as the %s October figure stated as current", (line, figure) => {
    expect(historicalFigureFindings(`# wb-x: doc\n\n${line}\n`)).toEqual([{ rule: "historical-figure-as-current", figure, line }]);
  }, 5_000);

  it.each([
    "The 2026-10-20 report measured a 398 s median npm-ci across gate worktrees.",
    "The 2026-11-02 shared-cache report's median is 7 s.",
    "A run of 17 s is not the figure, and neither is 1.7 s or 398.5 s.",
    "The 398 s figure was measured long ago.",
    "Install took 7 s yesterday.",
  ])("R164-CENSUS-QUIET: %j is not flagged", line => {
    expect(historicalFigureFindings(`# wb-x: doc\n\n${line}\n`)).toEqual([]);
  }, 5_000);

  it("R164-CENSUS-RENDERED: a figure inside a list item, a table cell and a fenced block is read on its rendered line", () => {
    const markdown = ["# wb-x: doc", "", "- install is 398 s", "", "| stage | cost |", "|---|---|", "| pack | runs 7 s |", "", "```text", "gate takes 7 s", "```", ""].join("\n");
    expect(historicalFigureFindings(markdown).map(finding => finding.line)).toEqual(["install is 398 s", "pack | runs 7 s", "gate takes 7 s"]);
  }, 5_000);

  it("R164-CENSUS-FENCED-BLOCK: a fenced block is read as one line, its rows joined by single spaces, so a figure on one row and a present-tense cost verb on another are flagged together", () => {
    expect(historicalFigureFindings(doc("```text", "pack: 398 s", "install runs", "```"))).toEqual([{ rule: "historical-figure-as-current", figure: "398 s", line: "pack: 398 s install runs" }]);
  }, 5_000);
});

describe("EAT-R164 residuals: escape families the October-figure census leaves quiet, each with pinned quiet rows and a live twin", () => {
  it("R164-RESIDUAL-DATE-ELSEWHERE quiet rows: an October figure stated as a current cost on a line that also names its own report date in another clause is not flagged, in a sentence and across the rows of one fenced block", () => {
    expect(historicalFigureFindings(doc("The current install cost is 398 s, the same as the 2026-10-20 report."))).toEqual([]);
    expect(historicalFigureFindings(doc("```text", "install takes 398 s", "per the 2026-10-20 report", "```"))).toEqual([]);
  }, 5_000);

  it("R164-RESIDUAL-DATE-ELSEWHERE live twin: the same sentence and the same block naming no report date are each flagged", () => {
    const line = "The current install cost is 398 s, the same as the last report.";
    expect(historicalFigureFindings(doc(line))).toEqual([{ rule: "historical-figure-as-current", figure: "398 s", line }]);
    expect(historicalFigureFindings(doc("```text", "install takes 398 s", "per the last report", "```"))).toEqual([{ rule: "historical-figure-as-current", figure: "398 s", line: "install takes 398 s per the last report" }]);
  }, 5_000);

  it("R164-RESIDUAL-HEADER-VERB quiet row: a table whose present-tense cost verb is in a header cell while the figure is in a body cell is not flagged", () => {
    expect(historicalFigureFindings(doc("| stage | install now takes |", "|---|---|", "| ci | 398 s |"))).toEqual([]);
  }, 5_000);

  it("R164-RESIDUAL-HEADER-VERB live twin: the verb in the body cell beside the figure is flagged", () => {
    expect(historicalFigureFindings(doc("| stage | install |", "|---|---|", "| ci | now takes 398 s |"))).toEqual([{ rule: "historical-figure-as-current", figure: "398 s", line: "ci | now takes 398 s" }]);
  }, 5_000);
});

describe("EAT-R164 on the real tree", () => {
  it("R164-CENSUS-FILES: the census reads every markdown file under docs/workbench/programs/ and every receipt that carries an mwi-release block, wb-j5y5's and wb-r5q2's among them", () => {
    const files = programCensusFiles(REPO);
    const receipts = readdirSync(join(REPO, "docs/workbench/receipts")).filter(name => /^wb-[a-z0-9.]+\.md$/.test(name))
      .filter(name => /^ {0,3}(`{3,}|~{3,}) *mwi-release *$/m.test(readFileSync(join(REPO, "docs/workbench/receipts", name), "utf8")))
      .map(name => `docs/workbench/receipts/${name}`);
    expect(files.filter(file => file.startsWith("docs/workbench/receipts/"))).toEqual(receipts.sort());
    expect(files).toContain("docs/workbench/receipts/wb-j5y5.md");
    expect(files).toContain("docs/workbench/receipts/wb-r5q2.md");
    const programs = join(REPO, "docs/workbench/programs");
    const programFiles = existsSync(programs) ? readdirSync(programs, { recursive: true, encoding: "utf8" }).filter(name => name.endsWith(".md")).map(name => `docs/workbench/programs/${name}`) : [];
    expect(files.filter(file => file.startsWith("docs/workbench/programs/"))).toEqual(programFiles.sort());
  }, 10_000);

  it("R164-CENSUS-TREE: no file the census reads states an October figure as a current cost", () => {
    const findings = programCensusFiles(REPO).flatMap(file => historicalFigureFindings(readFileSync(join(REPO, file), "utf8")).map(finding => ({ file, ...finding })));
    expect(findings).toEqual([]);
  }, 10_000);

  it("R164-RECEIPT-TABLE: the wb-r5q2 receipt's cost table carries a row for each of pack, install, admission and gate, each well formed or not run with its reason", () => {
    expect(costTableFindings(readFileSync(join(REPO, "docs/workbench/receipts/wb-r5q2.md"), "utf8"))).toEqual([]);
  }, 10_000);
});
