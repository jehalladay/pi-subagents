/**
 * wb-r5q2 [MWI-telemetry] (slice PI-7): the cost-figure judges of EAT-R164, from the mechanical-interoperability-audit-2026-11-06
 * delta (docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md
 * at pi-subagents master b8cd53aa36; program pins pi d7666a76 and mw 97e18068). EAT-R164 reads: "Every cost figure for tarball
 * packing, install, admission or QA stated in a program receipt or document MUST be a fresh measurement carrying date, host,
 * exact command, sample size and source pin; the 2026-10-20 (398 s median npm-ci) and 2026-11-02 (7 s median) feedback figures
 * MUST be cited only as dated history, never as a current estimate". Acceptance: "The receipt validator rejects a cost
 * sentence lacking date/host/command/sample fields; a docs census flags '398' or '7 s' used with a present-tense cost verb
 * outside a dated-history clause; the wb-r5q2 load receipt's cost table carries the fields for each measured stage (pack,
 * install, admission, gate)." Mutant: "Copy the October median into the receipt as 'current install cost'; the validator
 * flags it."
 *
 * THE COST TABLE. A receipt's cost table is its top-level fenced blocks whose info string, as marked reads it, is exactly
 * `mwi-cost`. Each non-blank line is one row, `<stage>: <fields>`, the stage ending at the first colon; the fields are
 * `key=value` pairs separated by "; ", the keys exactly COST_FIELDS, or the whole of `<fields>` is `not run: <why>`.
 *
 * THE CENSUS. historicalFigureFindings reads the rendered view of a markdown file (mwi-release.mjs renderedText, one line per
 * paragraph, heading, list item, table row and fenced block: a fenced block's lines are joined into one line, so the rows of
 * one block are judged together, R164-CENSUS-FENCED-BLOCK) and flags a line holding one of the two October figures in a pinned
 * spelling (HISTORICAL_FIGURES) beside a present-tense cost verb (PRESENT_COST_VERB) unless the line names that figure's own
 * report date. programCensusFiles lists what the census reads: every markdown file under docs/workbench/programs/ and every
 * per-bead receipt that carries an mwi-release block.
 *
 * RESIDUALS. EAT-R164 asks the census to flag either figure used with a present-tense cost verb "outside a dated-history
 * clause"; the census reads that as "on a rendered line that does not name the figure's own report date". Two escape families
 * that this reading leaves quiet are named here, each with pinned quiet rows and a live twin in the test (case ids
 * R164-RESIDUAL-*):
 *  - R164-RESIDUAL-DATE-ELSEWHERE: an October figure stated as a current cost on a rendered line that also names the figure's
 *    own report date in another clause (quiet: "The current install cost is 398 s, the same as the 2026-10-20 report.", and a
 *    fenced block whose one row states the figure as a current cost while another row names its report date; twin: the same
 *    sentence and the same block naming no report date, each flagged);
 *  - R164-RESIDUAL-HEADER-VERB: a table whose present-tense cost verb is in a header cell while the figure is in a body cell
 *    (quiet: a header cell "install now takes" over a body cell "398 s"; twin: the verb in the body cell beside the figure,
 *    flagged).
 *
 * Pure node, no src/ or dist/ import. What each judge refuses and passes is what test/workbench-mechanical-cost-figures.test.ts
 * pins (case ids R164-*); a form no case holds is NOT CLAIMED.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Lexer } from "marked";
import { parseReleaseBlocks, renderedText } from "./mwi-release.mjs";
import { RECEIPT_FILE } from "./receipts-index.mjs";

export const COST_BLOCK_INFO = "mwi-cost";
/** The measured stages EAT-R164 names, one row each. */
export const COST_STAGES = Object.freeze(["pack", "install", "admission", "gate"]);
/** The fields a measured row carries: EAT-R164's date, host, command and sample size, its source pin, and the figure. */
export const COST_FIELDS = Object.freeze(["date", "host", "command", "samples", "pin", "value"]);
/** The two October feedback figures, each with its own report's date and the spellings the census reads. */
export const HISTORICAL_FIGURES = Object.freeze([
  Object.freeze({ figure: "398 s", sourceDate: "2026-10-20", pattern: /(?<![0-9.,])398 ?(?:s|sec|seconds)\b/i }),
  Object.freeze({ figure: "7 s", sourceDate: "2026-11-02", pattern: /(?<![0-9.,])7 ?(?:s|sec|seconds)\b/i }),
]);
/** The present-tense cost verbs the census reads, as whole words. */
export const PRESENT_COST_VERB = /\b(?:is|are|costs|takes|lasts|runs|needs)\b/i;

const DATE = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?Z)?$/;
const SAMPLES = /^[1-9][0-9]*$/;
const SHA = /(?<![0-9a-f])[0-9a-f]{40}(?![0-9a-f])/;
const VALUE = /^[0-9]+(?:\.[0-9]+)? (?:ms|s|min|B|KiB|MiB)$/;
const NOT_RUN_PREFIX = "not run:";
const NOT_RUN = /^not run: \S/;

/**
 * @typedef {{ readonly rule: string, readonly stage: string, readonly detail: string }} CostFinding
 * @typedef {{ readonly rule: string, readonly figure: string, readonly line: string }} CensusFinding
 */

/**
 * The findings of one row's fields (`<fields>` of `<stage>: <fields>`).
 * @param {string} stage
 * @param {string} fields
 * @returns {CostFinding[]}
 */
function rowFindings(stage, fields) {
  /** @type {CostFinding[]} */
  const findings = [];
  const add = (/** @type {string} */ rule, /** @type {string} */ detail) => { findings.push(Object.freeze({ rule, stage, detail })); };
  if (fields.startsWith(NOT_RUN_PREFIX)) {
    if (!NOT_RUN.test(fields)) add("not-run-unexplained", fields);
    return findings;
  }
  /** @type {Map<string, string>} */
  const values = new Map();
  for (const part of fields.split("; ")) {
    const at = part.indexOf("=");
    if (at < 1) { add("field-malformed", part); continue; }
    const key = part.slice(0, at).trim();
    const value = part.slice(at + 1).trim();
    if (!COST_FIELDS.includes(key)) add("field-unknown", key);
    else if (values.has(key)) add("field-duplicate", key);
    else values.set(key, value);
  }
  for (const field of COST_FIELDS) {
    const value = values.get(field);
    if (value === undefined) add("field-missing", field);
    else if (value === "") add("field-empty", field);
  }
  const date = values.get("date");
  if (date && !DATE.test(date)) add("date-malformed", date);
  const samples = values.get("samples");
  if (samples && !SAMPLES.test(samples)) add("samples-malformed", samples);
  const pin = values.get("pin");
  if (pin && !SHA.test(pin)) add("pin-malformed", pin);
  const value = values.get("value");
  if (value && !VALUE.test(value)) add("value-malformed", value);
  for (const historical of HISTORICAL_FIGURES) {
    if (value && historical.pattern.test(value)) add("historical-figure-as-current", `${historical.figure} (${historical.sourceDate} history)`);
  }
  return findings;
}

/**
 * The findings of a receipt's cost table (THE COST TABLE above): each row's, then a stage row missing, repeated or unknown, and
 * a receipt with no table.
 * @param {string} markdown
 * @returns {CostFinding[]}
 */
export function costTableFindings(markdown) {
  /** @type {CostFinding[]} */
  const findings = [];
  /** @type {Set<string>} */
  const seen = new Set();
  let tables = 0;
  for (const token of Lexer.lex(markdown)) {
    if (token.type !== "code" || token.lang !== COST_BLOCK_INFO) continue;
    tables++;
    for (const raw of String(token.text).split("\n")) {
      const line = raw.trim();
      if (line === "") continue;
      const at = line.indexOf(":");
      const stage = at < 0 ? "" : line.slice(0, at).trim();
      const fields = at < 0 ? "" : line.slice(at + 1).trim();
      if (!COST_STAGES.includes(stage)) findings.push(Object.freeze({ rule: "stage-unknown", stage, detail: line }));
      else if (seen.has(stage)) findings.push(Object.freeze({ rule: "stage-duplicate", stage, detail: line }));
      seen.add(stage);
      findings.push(...rowFindings(stage, fields));
    }
  }
  if (tables === 0) return [Object.freeze({ rule: "cost-table-missing", stage: "", detail: `no top-level fenced block with info string ${COST_BLOCK_INFO}` })];
  for (const stage of COST_STAGES) {
    if (!seen.has(stage)) findings.push(Object.freeze({ rule: "stage-missing", stage, detail: `no ${stage} row` }));
  }
  return findings;
}

/**
 * The census (THE CENSUS above) over one markdown file.
 * @param {string} markdown
 * @returns {CensusFinding[]}
 */
export function historicalFigureFindings(markdown) {
  /** @type {CensusFinding[]} */
  const findings = [];
  for (const line of renderedText(markdown).split("\n")) {
    if (!PRESENT_COST_VERB.test(line)) continue;
    for (const historical of HISTORICAL_FIGURES) {
      if (historical.pattern.test(line) && !line.includes(historical.sourceDate)) {
        findings.push(Object.freeze({ rule: "historical-figure-as-current", figure: historical.figure, line }));
      }
    }
  }
  return findings;
}

/**
 * The repository-relative files the census reads, sorted: every .md file under docs/workbench/programs/ (none when that
 * directory is absent) and every docs/workbench/receipts/<bead>.md that carries an mwi-release block.
 * @param {string} repo
 * @returns {string[]}
 */
export function programCensusFiles(repo) {
  /** @type {string[]} */
  const files = [];
  const programs = join(repo, "docs/workbench/programs");
  if (existsSync(programs)) {
    for (const name of readdirSync(programs, { recursive: true, encoding: "utf8" })) {
      if (name.endsWith(".md")) files.push(`docs/workbench/programs/${name}`);
    }
  }
  const receipts = join(repo, "docs/workbench/receipts");
  for (const name of readdirSync(receipts)) {
    if (!RECEIPT_FILE.test(name)) continue;
    if (parseReleaseBlocks(readFileSync(join(receipts, name), "utf8")).length > 0) files.push(`docs/workbench/receipts/${name}`);
  }
  return files.sort();
}
