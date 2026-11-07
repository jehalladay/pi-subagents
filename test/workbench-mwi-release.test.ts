/**
 * wb-j5y5 [MWI-release] (slice PI-7): red-first acceptance for qa/workbench/mwi-release.mjs, the release validator of the
 * mechanical-workflows-interop-2026-11-04 program, for requirements EAT-R082..EAT-R087 of
 * docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md at rig master
 * 0b25e14e084a5b1d612e780bc12a927b3a80dd62 (a master-only archive). The first block pins how a release block is read. Then comes
 * one describe block per requirement; each quotes the acceptance line it pins and feeds the requirement's own adversarial mutant
 * to the judge as an input the judge must refuse. The W11 block pins the rendered view the W11 rules read, and the receipt-scope
 * block pins which release blocks a cut adds. The CLI block runs
 * qa/workbench/mwi-release.mjs end to end over scratch Git repositories: a working-tree cut, a committed cut, the host-module
 * discovery, the revision spellings and the usage errors. The last block judges the real tree: its release receipts, the W11
 * section and the Not claimed W11 line of docs/workbench/feature-matrix.md, the matrix's status legend and forge.toml's declared
 * tiers.
 *
 * Cut #3 (refusal #2; the enumerate-the-resolvable form of rule 19(c) for the claim words frozen at R-B641, the rendered-view
 * words at rung 1): each "pinned ... forms" block enumerates, row by row, the forms one family of the module's claim words names
 * (the envelope predicates, the seam spellings, the witness forms, the absence spellings, the pointer statuses, the rendered
 * markup, and the field, forge.toml, heading and rendered-view forms a one-edit discovery battery left unpinned on cut #2); the
 * residual block names the escape families the validator is quiet on, each with its quiet rows at their exact readings and a
 * live twin, and holds the module header's RESIDUALS section to the same ids and families.
 *
 * NOT CLAIMED by this file: a live slice or any Mechanical invocation (the program has none); that every program bead's receipt
 * carries a release block (the real-tree block judges each receipt that carries one); rendering by a markdown engine other than
 * marked, the lexer the validator reads with; any form a block's title and rows do not name.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  BLOCK_INFO,
  CLOSING_STATUSES,
  CONTRACT,
  declaredForgeTiers,
  FEATURE_MATRIX_PATH,
  GATE_RESULTS,
  GATE_TIERS,
  gateEnvelopeFindings,
  HANDOFF_FIELDS,
  HOSTS_DIR,
  headingTexts,
  judgeCut,
  MATRIX_STATUSES,
  markdownSection,
  OPEN_REASONS,
  PROGRAM,
  PROGRAM_DOCS_DIR,
  parseReleaseBlocks,
  RECEIPT_ITEMS,
  RECEIPTS_DIR,
  readBeadIds,
  receiptBlockFindings,
  renderedText,
  requiredGateLegs,
  SKILL_PATH,
  SLICE_STATUSES,
  SLICES,
  TDD_FIELDS,
  TRACEABILITY_PATH,
  W11_HEADING,
  W11_TITLE,
  w11Findings,
  w11Headings,
  w11Html,
  w11Rows,
  w11Section,
  w11Statuses,
} from "../qa/workbench/mwi-release.mjs";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(REPO, "qa", "workbench", "mwi-release.mjs");

interface Finding {
  readonly requirement: string;
  readonly rule: string;
  readonly detail: string;
  readonly receipt?: string;
}
type Rows = ReadonlyArray<readonly [string, string]>;
type Tree = Readonly<Record<string, string>>;

const BASE = "814dcdd01bec171673ff17d085296276a140e15b";
const CANDIDATE = "ab".repeat(20);
const OLDER = "cd".repeat(20);
const SEAM = "test/workbench-example.test.ts";
const CENSUS_SEAM = "test/workbench-example.census.ts";
const COMMAND_ID = "cmd_0a1b2c3d4e5f";
const LEGS: readonly string[] = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"];
const LIVE_TIER = "furnace-hosted-live";
/** The forge run tiers the test's forge.toml declares: its seven [build] gate legs and one [build.commands.<tier>] table. */
const FORGE_TIERS: ReadonlySet<string> = new Set([...LEGS, LIVE_TIER]);
const BEADS: ReadonlySet<string> = new Set(["wb-good", "wb-other"]);
const RECEIPT = `${RECEIPTS_DIR}wb-good.md`;
const README = `${PROGRAM_DOCS_DIR}README.md`;
const DOCS_LINE = "docs, skill, source map, feature matrix and receipt updates";
const BLOCKERS_LINE = "remaining blockers and next safe independent cut";

/** The control release block: every judge accepts it (a slice cut that lands PI-7 explicitly partial). */
const GOOD_ROWS: Rows = [
  ["contract", CONTRACT],
  ["program", PROGRAM],
  ["bead", "wb-good"],
  ["slice", "PI-7"],
  ["slice status", "partial"],
  ["requirements", "EAT-R082, EAT-R083"],
  ["real infrastructure gate", "none"],
  ["baseline sha / source paths", `${BASE}; qa/workbench/example.mjs`],
  ["specific behavior to change", "the example judge refuses an unnamed gate"],
  ["owner repo and producer authority", "Pi (pi-subagents); no producer is called"],
  ["supported API/version confirmed by installed code", "not run: no installed producer API is used"],
  ["one negative reproducer and one positive journey", `the refusal and control rows of ${SEAM}`],
  ["observed code vs planned code", "observed: the example judge; planned: none"],
  ["permissions, effects, cancellation and retention", "none: a pure judge"],
  ["native evidence/identity and no-false-PASS predicate", "not run: no native identity is read"],
  ["timing/resource budget and control behavior", "not run: no timing claim"],
  ["Forge commands run and exact outcomes", "not run: the machine gate lane runs the complete gate"],
  ["docs, skill, source map, feature matrix and receipt updates", `${FEATURE_MATRIX_PATH} W11; ${SKILL_PATH}; ${README}; ${RECEIPT}`],
  ["remaining blockers and next safe independent cut", "none"],
  ["red command", `./node_modules/.bin/vitest run ${SEAM}`],
  ["red result", "9 failed | 3 passed (12)"],
  ["first failing assertion", "expected [] to deeply equal [ 'closing-gate-unnamed' ]"],
  ["positive rerun", `./node_modules/.bin/vitest run ${SEAM} -> 12 passed (12)`],
  ["mutant EAT-R082", "accept a W11 landed-gated status without a live gate -> 2 failed | 10 passed (12)"],
  ["mutant EAT-R083", "accept a red result without failures -> 1 failed | 11 passed (12)"],
];

function blockOf(rows: Rows, info = BLOCK_INFO): string {
  return [`\`\`\`${info}`, ...rows.map(([label, value]) => `${label}: ${value}`), "```"].join("\n");
}
function receiptOf(rows: Rows, bead = "wb-good"): string {
  return [`# ${bead}: a good bead`, "", "## 2026-11-06 cut", "", blockOf(rows), ""].join("\n");
}
/** rows with `label` set to `value` (appended when absent), or removed when `value` is undefined. */
function setRow(rows: Rows, label: string, value: string | undefined): Rows {
  if (value === undefined) return rows.filter(([name]) => name !== label);
  if (!rows.some(([name]) => name === label)) return [...rows, [label, value]];
  return rows.map((row) => (row[0] === label ? ([label, value] as const) : row));
}
function setRows(rows: Rows, changes: Rows): Rows {
  return changes.reduce((acc, [label, value]) => setRow(acc, label, value), rows);
}
const blockContext = { receiptBead: "wb-good", beadIds: BEADS, fileExists: (path: string) => path === SEAM || path === CENSUS_SEAM, forgeTiers: FORGE_TIERS };
function findingsOf(rows: Rows, extra: { readonly candidate?: string; readonly receiptBead?: string } = {}): Finding[] {
  const blocks = parseReleaseBlocks(receiptOf(rows));
  expect(blocks, "the receipt holds exactly one release block").toHaveLength(1);
  return [...receiptBlockFindings(blocks[0], { ...blockContext, ...extra })];
}
function rulesOf(rows: Rows, extra: { readonly candidate?: string; readonly receiptBead?: string } = {}): string[] {
  return findingsOf(rows, extra)
    .map((finding) => finding.rule)
    .sort();
}

describe("the release block (workbench.mwi-release/v1)", () => {
  it("is read from top-level fenced blocks whose info string is exactly mwi-release, one label: value line per field", () => {
    const text = [
      "# wb-good: x",
      "",
      "## 2026-11-06 a",
      "",
      "```mwi-release",
      "bead: wb-good",
      "first failing assertion: expected 'a: b' to be 'c'",
      "```",
      "",
      "```text",
      "bead: wb-other",
      "```",
      "",
      "- an item",
      "",
      "  ```mwi-release",
      "  bead: wb-nested",
      "  ```",
      "",
    ].join("\n");
    const blocks = parseReleaseBlocks(text);
    expect(blocks).toHaveLength(1);
    expect([...blocks[0].fields.entries()]).toEqual([
      ["bead", "wb-good"],
      ["first failing assertion", "expected 'a: b' to be 'c'"],
    ]);
    expect(blocks[0].malformed).toEqual([]);
  });

  it.each(["mwi-releases", "mwi-release extra", "mwi-release-v2", "xmwi-release", "MWI-RELEASE", "Mwi-Release"])("reads no release block from a fence whose info string is '%s'", (info) => {
    const text = ["# wb-good: x", "", "## 2026-11-06 a", "", `\`\`\`${info}`, "bead: wb-good", "```", ""].join("\n");
    expect(parseReleaseBlocks(text)).toEqual([]);
  });

  it("reads a tilde-fenced block and a fence whose info string has surrounding spaces, as marked trims it", () => {
    const blocks = parseReleaseBlocks(["~~~mwi-release", "bead: wb-tilde", "~~~", "", "```  mwi-release  ", "bead: wb-spaced", "```", ""].join("\n"));
    expect(blocks.map((block) => block.fields.get("bead"))).toEqual(["wb-tilde", "wb-spaced"]);
  });

  it.each([
    ["a blockquote", ["> ```mwi-release", "> bead: wb-quoted", "> ```"]],
    ["a blockquote nested in a blockquote", ["> > ```mwi-release", "> > bead: wb-quoted", "> > ```"]],
    ["a bulleted list item", ["- an item", "", "  ```mwi-release", "  bead: wb-listed", "  ```"]],
    ["an ordered list item", ["1. an item", "", "   ```mwi-release", "   bead: wb-listed", "   ```"]],
  ])("does not read a release block nested in %s", (_where, lines) => {
    expect(parseReleaseBlocks(["# wb-good: x", "", ...lines, ""].join("\n"))).toEqual([]);
  });

  it("skips blank lines inside a block and keeps every non-blank line without a label as a malformed entry", () => {
    const [block] = parseReleaseBlocks(["```mwi-release", "bead: wb-good", "", "   ", "slice: PI-7", "a line without a label", ": an empty label", "```", ""].join("\n"));
    expect([...block.fields.entries()]).toEqual([
      ["bead", "wb-good"],
      ["slice", "PI-7"],
    ]);
    expect(block.malformed).toEqual([
      { kind: "line", line: "a line without a label" },
      { kind: "line", line: ": an empty label" },
    ]);
  });

  it("accepts the control receipt", () => {
    expect(rulesOf(GOOD_ROWS)).toEqual([]);
  });

  it("refuses a malformed line and a repeated label instead of dropping either", () => {
    const text = receiptOf(GOOD_ROWS).replace("```\n", "a line without a label\nbead: wb-good\n```\n");
    const blocks = parseReleaseBlocks(text);
    const rules = receiptBlockFindings(blocks[0], blockContext)
      .map((finding) => finding.rule)
      .sort();
    expect(rules).toEqual(["field-duplicate", "line-malformed"]);
  });

  it("runs no CLI when the validator is imported as a module: the process exit code stays unset", () => {
    expect(process.exitCode ?? 0).toBe(0);
  });

  it("refuses a block of another contract or another program", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "contract", "workbench.mwi-release/v0"))).toEqual(["contract-mismatch"]);
    expect(rulesOf(setRow(GOOD_ROWS, "program", "cac-workflow-composition-2026-10-18"))).toEqual(["program-mismatch"]);
  });
});

describe("EAT-R086 each bead receipt preserves commands, versions, refs and actual results", () => {
  // Acceptance: "Validate receipt includes baseline/source, owner, supported installed API, positive/negative,
  // effects/cancel/retention, native IDs, timings, Forge outcomes, docs and blockers; missing real bead ID forbids creating wb
  // receipt." Adversarial mutant: "Generate a fabricated wb identifier or omit not-run labels."
  it("pins the twelve handoff-contract lines of the program's 04-agent-handoff.md and maps the ten acceptance items onto them", () => {
    expect([...HANDOFF_FIELDS]).toEqual([
      "baseline sha / source paths",
      "specific behavior to change",
      "owner repo and producer authority",
      "supported API/version confirmed by installed code",
      "one negative reproducer and one positive journey",
      "observed code vs planned code",
      "permissions, effects, cancellation and retention",
      "native evidence/identity and no-false-PASS predicate",
      "timing/resource budget and control behavior",
      "Forge commands run and exact outcomes",
      "docs, skill, source map, feature matrix and receipt updates",
      "remaining blockers and next safe independent cut",
    ]);
    expect(RECEIPT_ITEMS.map(([item, field]) => `${item} = ${field}`)).toEqual([
      "baseline/source = baseline sha / source paths",
      "owner = owner repo and producer authority",
      "supported installed API = supported API/version confirmed by installed code",
      "positive/negative = one negative reproducer and one positive journey",
      "effects/cancel/retention = permissions, effects, cancellation and retention",
      "native IDs = native evidence/identity and no-false-PASS predicate",
      "timings = timing/resource budget and control behavior",
      "Forge outcomes = Forge commands run and exact outcomes",
      "docs = docs, skill, source map, feature matrix and receipt updates",
      "blockers = remaining blockers and next safe independent cut",
    ]);
  });

  it.each([...HANDOFF_FIELDS])("refuses a receipt that omits the '%s' line", (field) => {
    const findings = findingsOf(setRow(GOOD_ROWS, field, undefined));
    expect(findings.filter((finding) => finding.rule === "field-missing").map((finding) => finding.detail)).toEqual([field]);
    expect(findings.every((finding) => finding.requirement === "EAT-R086" || finding.requirement === "EAT-R083")).toBe(true);
  });

  it.each([...HANDOFF_FIELDS])("refuses an empty '%s' value (mutant: an omitted not-run label)", (field) => {
    const findings = findingsOf(setRow(GOOD_ROWS, field, ""));
    expect(findings.filter((finding) => finding.rule === "field-empty").map((finding) => finding.detail)).toEqual([field]);
  });

  it("accepts an explicit not-run label in place of a result", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "one negative reproducer and one positive journey", "not run: the journey needs the installed host"))).toEqual([]);
  });

  it("refuses a fabricated wb identifier (mutant): a bead absent from the bead export forbids the receipt", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "bead", "wb-fabricated"), { receiptBead: "wb-fabricated" })).toEqual(["bead-not-real"]);
    expect(rulesOf(setRow(GOOD_ROWS, "bead", "not-a-bead"), { receiptBead: "wb-good" })).toEqual(["bead-missing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "bead", undefined))).toEqual(["bead-missing"]);
  });

  it("refuses a block whose bead is not its receipt file's bead", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "bead", "wb-other"))).toEqual(["bead-mismatch"]);
  });

  it("reads the real bead ids from the in-tree bead export: wb-j5y5 and its epic are real, a fabricated id is not", () => {
    const ids = readBeadIds(readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8"));
    expect(ids.has("wb-j5y5")).toBe(true);
    expect(ids.has("wb-1a3t")).toBe(true);
    expect(ids.has("wb-fabricated")).toBe(false);
    expect([...readBeadIds('{"id":"wb-a1"}\n\n{"id":"wb-a1.2","title":"t"}\n{"title":"no id"}\n')]).toEqual(["wb-a1", "wb-a1.2"]);
    expect(() => readBeadIds('{"id":"wb-a1"}\nnot json\n')).toThrow(/line 2/);
  });

  it("fails closed without a bead export instead of skipping the real-bead check", () => {
    const blocks = parseReleaseBlocks(receiptOf(GOOD_ROWS));
    const missing = undefined as unknown as ReadonlySet<string>;
    expect(() => receiptBlockFindings(blocks[0], { ...blockContext, beadIds: missing, fileExists: () => true })).toThrow(/bead export/);
  });
});

describe("EAT-R083 each behavior cut retains a preimplementation failing consumer test", () => {
  // Acceptance: "Receipt validator requires baseline SHA, real seam test command, first failing assertion, positive rerun and
  // adversarial mutant failure tied to the requirement. Missing leg rejects closure." Adversarial mutant: "Write only a passing
  // postimplementation test or change assertion to fit implementation."
  it("pins the red-first legs", () => {
    expect([...TDD_FIELDS]).toEqual(["red command", "red result", "first failing assertion", "positive rerun"]);
  });

  it.each([...TDD_FIELDS])("refuses a receipt missing the '%s' leg", (leg) => {
    const findings = findingsOf(setRow(GOOD_ROWS, leg, undefined));
    expect(findings.filter((finding) => finding.rule === "tdd-leg-missing").map((finding) => finding.detail)).toEqual([leg]);
    expect(findings.every((finding) => finding.requirement === "EAT-R083")).toBe(true);
  });

  it.each([...TDD_FIELDS])("refuses a '%s' leg labelled not run: a missing leg rejects closure", (leg) => {
    const findings = findingsOf(setRow(GOOD_ROWS, leg, "not run"));
    expect(findings.filter((finding) => finding.rule === "tdd-leg-not-run").map((finding) => finding.detail)).toEqual([leg]);
  });

  it("reads a not-run label in any case, as a whole word", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "red command", "Not Run: the seam needs the installed host"))).toEqual(["tdd-leg-not-run"]);
    expect(rulesOf(setRows(GOOD_ROWS, [["red command", "not running yet"], ["positive rerun", "not running yet -> 12 passed (12)"]]))).toEqual(["red-not-seam"]);
  });

  it("refuses a baseline without a full commit sha", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "baseline sha / source paths", "814dcdd; qa/workbench/example.mjs"))).toEqual(["baseline-sha-missing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "baseline sha / source paths", `${BASE}0; qa/workbench/example.mjs`))).toEqual(["baseline-sha-missing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "baseline sha / source paths", `${BASE.toUpperCase()}; qa/workbench/example.mjs`))).toEqual(["baseline-sha-missing"]);
  });

  it("refuses only a passing postimplementation test (mutant): the red result reports no failure", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "red result", "12 passed (12)"))).toEqual(["red-not-failing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "red result", "0 failed | 12 passed (12)"))).toEqual(["red-not-failing"]);
  });

  it("refuses a positive rerun of another test (mutant: an assertion changed elsewhere to fit the implementation)", () => {
    const rows = setRow(GOOD_ROWS, "positive rerun", "./node_modules/.bin/vitest run test/workbench-other.test.ts -> 3 passed (3)");
    expect(rulesOf(rows)).toEqual(["rerun-not-same-seam"]);
  });

  it("refuses a positive rerun that still fails or passes nothing", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "positive rerun", `./node_modules/.bin/vitest run ${SEAM} -> 1 failed | 11 passed (12)`))).toEqual(["rerun-not-green"]);
    expect(rulesOf(setRow(GOOD_ROWS, "positive rerun", `./node_modules/.bin/vitest run ${SEAM} -> no tests ran`))).toEqual(["rerun-not-green"]);
    expect(rulesOf(setRow(GOOD_ROWS, "positive rerun", `./node_modules/.bin/vitest run ${SEAM} -> 0 passed (0)`))).toEqual(["rerun-not-green"]);
  });

  it("refuses a red command that names no seam test file, or one the tree does not hold", () => {
    expect(rulesOf(setRows(GOOD_ROWS, [["red command", "npm test"], ["positive rerun", "npm test -> 12 passed (12)"]]))).toEqual(["red-not-seam"]);
    const absent = "test/workbench-absent.test.ts";
    const rows = setRows(GOOD_ROWS, [
      ["red command", `./node_modules/.bin/vitest run ${absent}`],
      ["positive rerun", `./node_modules/.bin/vitest run ${absent} -> 12 passed (12)`],
    ]);
    expect(rulesOf(rows)).toEqual(["seam-missing"]);
  });

  it("accepts a census file seam and a ./-prefixed test path the tree holds, and refuses a census file it does not hold", () => {
    const census = `./node_modules/.bin/vitest run --config vitest.census.config.ts ${CENSUS_SEAM}`;
    expect(rulesOf(setRows(GOOD_ROWS, [["red command", census], ["positive rerun", `${census} -> 4 passed (4)`]]))).toEqual([]);
    const dotted = `./node_modules/.bin/vitest run ./${SEAM}`;
    expect(rulesOf(setRows(GOOD_ROWS, [["red command", dotted], ["positive rerun", `${dotted} -> 12 passed (12)`]]))).toEqual([]);
    const absent = "./node_modules/.bin/vitest run test/workbench-absent.census.ts";
    expect(rulesOf(setRows(GOOD_ROWS, [["red command", absent], ["positive rerun", `${absent} -> 4 passed (4)`]]))).toEqual(["seam-missing"]);
  });

  it.each([
    ["a test path outside the repository's test/ directory", `./node_modules/.bin/vitest run src/${SEAM}`],
    ["a test path with a suffix after .test.ts", `./node_modules/.bin/vitest run ${SEAM}.bak`],
    ["forge run inside another word", "myforge run lint"],
  ])("names no seam with %s", (_form, command) => {
    expect(rulesOf(setRows(GOOD_ROWS, [["red command", command], ["positive rerun", `${command} -> 12 passed (12)`]]))).toEqual(["red-not-seam"]);
  });

  it("accepts a forge run tier that forge.toml declares, rerun as the same tier, and refuses an undeclared tier or a rerun of another tier", () => {
    const tier = setRows(GOOD_ROWS, [["red command", `forge run ${LIVE_TIER}`], ["positive rerun", `forge run ${LIVE_TIER} -> 2 passed (2)`]]);
    expect(rulesOf(tier)).toEqual([]);
    expect(rulesOf(setRows(tier, [["red command", "forge run no-such-tier"], ["positive rerun", "forge run no-such-tier -> 2 passed (2)"]]))).toEqual(["seam-missing"]);
    expect(rulesOf(setRow(tier, "positive rerun", "forge run test -> 2 passed (2)"))).toEqual(["rerun-not-same-seam"]);
  });

  it("fails closed without the declared forge run tiers instead of skipping the real-seam check", () => {
    const blocks = parseReleaseBlocks(receiptOf(GOOD_ROWS));
    const missing = undefined as unknown as ReadonlySet<string>;
    expect(() => receiptBlockFindings(blocks[0], { ...blockContext, forgeTiers: missing })).toThrow(/forge run tiers/);
  });

  it("requires one red mutant per listed requirement, each tied to a listed requirement", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "mutant EAT-R083", undefined))).toEqual(["mutant-missing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "mutant EAT-R083", "accept anything -> 12 passed (12)"))).toEqual(["mutant-not-red"]);
    expect(rulesOf(setRow(GOOD_ROWS, "mutant EAT-R099", "x -> 1 failed | 11 passed (12)"))).toEqual(["mutant-untied"]);
    expect(rulesOf(setRow(GOOD_ROWS, "requirements", "none"))).toEqual(["mutant-untied", "mutant-untied", "requirements-missing"]);
  });
});

/** Seams of the pinned spellings (refusal #2 U2, members GP5-GP7): a census file with a digit, a test in a subdirectory with an
 * inner dot, a test two subdirectories deep with digits, and a test with underscores in a subdirectory. */
const SPELLED_SEAMS: readonly string[] = ["test/workbench-docs12-example.census.ts", "test/e2e/workflow.e2e.test.ts", "test/unit/v2/a1.test.ts", "test/fixture_set/snake_case.test.ts"];
/** forge run tiers of the pinned spellings (refusal #2 U2, member GP8): tiers with a digit, as forge.toml declares furnace-vc4-live
 * and e2e, a tier that begins with a digit, and a one-character tier. */
const SPELLED_TIERS: readonly string[] = ["furnace-vc4-live", "e2e", "x", "2pass"];
const spelledContext = {
  ...blockContext,
  fileExists: (path: string) => path === SEAM || SPELLED_SEAMS.includes(path),
  forgeTiers: new Set([...FORGE_TIERS, ...SPELLED_TIERS]),
};
/** The findings of the control block whose red command is `command` and whose positive rerun reruns it, under spelledContext. */
function seamFindings(command: string): Finding[] {
  const [block] = parseReleaseBlocks(receiptOf(setRows(GOOD_ROWS, [["red command", command], ["positive rerun", `${command} -> 12 passed (12)`]])));
  return [...receiptBlockFindings(block, spelledContext)];
}
function seamRules(command: string): string[] {
  return seamFindings(command)
    .map((finding) => finding.rule)
    .sort();
}

describe("EAT-R083 pinned seam spellings (refusal #2 U2; the R-B641 set in the enumerate form)", () => {
  it.each(SPELLED_SEAMS)("reads the held test path %s as a real seam", (seam) => {
    expect(seamRules(`./node_modules/.bin/vitest run ${seam}`)).toEqual([]);
    expect(seamRules(`./node_modules/.bin/vitest run ./${seam}`)).toEqual([]);
  });

  it.each(SPELLED_TIERS)("reads forge run %s, a declared tier, as a real seam", (tier) => {
    expect(seamRules(`forge run ${tier}`)).toEqual([]);
  });

  it.each([
    ["a census file with a digit", "./node_modules/.bin/vitest run test/workbench-docs13-absent.census.ts", "test/workbench-docs13-absent.census.ts"],
    ["a test in a subdirectory with an inner dot", "./node_modules/.bin/vitest run test/e2e/absent.e2e.test.ts", "test/e2e/absent.e2e.test.ts"],
    ["a forge run tier with a digit", "forge run furnace-vc5-live", "forge run furnace-vc5-live"],
  ])("reads %s the tree does not hold as that whole seam, missing", (_form, command, seam) => {
    expect(seamFindings(command).map((finding) => `${finding.rule}: ${finding.detail}`)).toEqual([`seam-missing: ${seam}`]);
  });

  it.each([
    ["a letter", `./node_modules/.bin/vitest run con${SEAM}`],
    ["a digit", `./node_modules/.bin/vitest run v2${SEAM}`],
    ["an underscore", `./node_modules/.bin/vitest run my_${SEAM}`],
    ["a dot", `./node_modules/.bin/vitest run ../${SEAM}`],
    ["a slash", `./node_modules/.bin/vitest run src/${SEAM}`],
    ["a hyphen", `./node_modules/.bin/vitest run pre-${SEAM}`],
  ])("names no seam when the test/ path follows %s", (_char, command) => {
    expect(seamRules(command)).toEqual(["red-not-seam"]);
  });

  it.each([
    ["a letter", `./node_modules/.bin/vitest run ${SEAM}x`],
    ["a digit", `./node_modules/.bin/vitest run ${SEAM}2`],
    ["an underscore", `./node_modules/.bin/vitest run ${SEAM}_x`],
    ["a dot", `./node_modules/.bin/vitest run ${SEAM}.bak`],
    ["a slash", `./node_modules/.bin/vitest run ${SEAM}/`],
    ["a hyphen", `./node_modules/.bin/vitest run ${SEAM}-old`],
  ])("names no seam when the .test.ts path is followed by %s", (_char, command) => {
    expect(seamRules(command)).toEqual(["red-not-seam"]);
  });

  it.each([
    ["a letter before forge", "myforge run lint"],
    ["a digit before forge", "2forge run lint"],
    ["an underscore before forge", "_forge run lint"],
    ["two spaces after forge", "forge  run lint"],
    ["two spaces after run", "forge run  lint"],
  ])("names no forge run tier with %s", (_form, command) => {
    expect(seamRules(command)).toEqual(["red-not-seam"]);
  });

  it("reads the forge run tier after a hyphen, which is no word character", () => {
    expect(seamRules("-forge run lint")).toEqual([]);
  });

  it.each(["test/.test.ts", "test/.census.ts"])("names no seam for %s, a path with nothing between test/ and its suffix", (path) => {
    expect(seamRules(`./node_modules/.bin/vitest run ${path}`)).toEqual(["red-not-seam"]);
  });

  it.each([
    ["a colon and a line number", `./node_modules/.bin/vitest run ${SEAM}:12`],
    ["double quotes", `./node_modules/.bin/vitest run "${SEAM}"`],
    ["parentheses", `(./node_modules/.bin/vitest run ${SEAM})`],
    ["a space and a flag", `./node_modules/.bin/vitest run ${SEAM} --reporter=dot`],
  ])("reads the held seam when it is bounded by %s", (_bound, command) => {
    expect(seamRules(command)).toEqual([]);
  });
});

/** A forge build result envelope shaped like the gate of record's (result-envelope/v1, the seven [build] gate legs). */
function envelopeOf(mutate: (envelope: GateEnvelope) => void = () => {}): GateEnvelope {
  const envelope: GateEnvelope = {
    contract_version: "result-envelope/v1",
    command: "build",
    status: "success",
    ids: { command_id: COMMAND_ID },
    data: {
      gated_commit: CANDIDATE,
      gate_verdict: "PASS",
      gate_passed: true,
      gate_declared: [...LEGS],
      invocation: { keep_going: true, only: [], skip: [], verb: "build", path: "." },
      steps: LEGS.map((name) => ({ name, status: "passed", exit_code: 0 })),
    },
  };
  mutate(envelope);
  return envelope;
}
interface GateEnvelope {
  contract_version: string;
  command: string;
  status: string;
  ids: { command_id?: string };
  data: {
    gated_commit: string;
    gate_verdict: string;
    gate_passed: boolean;
    gate_declared: string[];
    invocation: { keep_going: boolean; only: string[]; skip: string[]; verb: string; path: string };
    steps: Array<{ name: string; status: string; exit_code: number }>;
  };
}
function gateRules(envelope: unknown): string[] {
  return gateEnvelopeFindings(envelope, { candidate: CANDIDATE, requiredLegs: LEGS })
    .map((finding) => finding.rule)
    .sort();
}
/** The control envelope with its data.invocation replaced by `invocation` (an absent field stays absent). */
function withInvocation(invocation: unknown): unknown {
  const { invocation: _control, ...data } = envelopeOf().data;
  return { ...envelopeOf(), data: invocation === undefined ? data : { ...data, invocation } };
}

describe("EAT-R084 each code cut carries the machine-accepted Forge gate receipt", () => {
  // Acceptance: "Read machine receipt keyed to exact candidate commit with required Forge build legs; failed/not-run gate or
  // receipt for another commit refuses close. No CI substitution." Adversarial mutant: "Accept exit echo or an old commit gate
  // as this cut PASS."
  it("reads the required legs from forge.toml's [build] gate, the gate of record", () => {
    expect(requiredGateLegs(readFileSync(join(REPO, "forge.toml"), "utf8"))).toEqual([...LEGS]);
    expect(requiredGateLegs('[package]\ngate = ["x"]\n\n[build]\nbackend = "typescript"\ngate = ["lint", "test"]\n')).toEqual(["lint", "test"]);
    expect(() => requiredGateLegs('[package]\ngate = ["lint"]\n')).toThrow(/\[build\] gate/);
    expect(() => requiredGateLegs("[build]\ngate = []\n")).toThrow(/\[build\] gate/);
    expect(() => requiredGateLegs('[build.server]\ngate = ["lint"]\n')).toThrow(/\[build\] gate/);
  });

  it("accepts a passing complete-gate envelope keyed to the candidate commit", () => {
    expect(gateRules(envelopeOf())).toEqual([]);
  });

  it("refuses an old commit's gate as this cut's PASS (mutant)", () => {
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data, { gated_commit: OLDER })))).toEqual(["gate-other-commit"]);
  });

  it("refuses an exit echo or a CI record in place of the forge envelope (mutant; no CI substitution)", () => {
    for (const echo of ["exit 0", 0, null, { exit_code: 0 }, { status: "success" }, { conclusion: "success", head_sha: CANDIDATE }]) {
      expect(gateRules(echo), JSON.stringify(echo)).toEqual(["gate-not-forge-build"]);
    }
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope, { contract_version: "ci-run/v1" })))).toEqual(["gate-not-forge-build"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope, { command: "test" })))).toEqual(["gate-not-forge-build"]);
  });

  it("refuses a forge build envelope without a data record", () => {
    const { data: _data, ...withoutData } = envelopeOf();
    expect(gateRules(withoutData)).toEqual(["gate-not-forge-build"]);
    expect(gateRules({ ...withoutData, data: [envelopeOf().data] })).toEqual(["gate-not-forge-build"]);
  });

  it("refuses a failed gate", () => {
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope, { status: "failure" })))).toEqual(["gate-not-pass"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data, { gate_verdict: "FAIL" })))).toEqual(["gate-not-pass"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data, { gate_passed: false })))).toEqual(["gate-not-pass"]);
  });

  it.each([...LEGS])("refuses a gate whose '%s' leg is absent, skipped, not run or failed", (leg) => {
    const without = envelopeOf((envelope) => {
      envelope.data.steps = envelope.data.steps.filter((step) => step.name !== leg);
    });
    expect(gateRules(without)).toEqual(["gate-leg-missing"]);
    for (const status of ["skipped", "not_run", "failed"]) {
      const step = envelopeOf((envelope) => {
        envelope.data.steps = envelope.data.steps.map((each) => (each.name === leg ? { ...each, status } : each));
      });
      expect(gateRules(step), status).toEqual(["gate-leg-not-passed"]);
    }
  });

  it("refuses a required leg listed by more than one step, whichever step comes first", () => {
    const twice = (second: string) =>
      envelopeOf((envelope) => {
        envelope.data.steps = [...envelope.data.steps, { name: "test", status: second, exit_code: 0 }];
      });
    expect(gateRules(twice("failed"))).toEqual(["gate-leg-duplicated"]);
    expect(gateRules(twice("passed"))).toEqual(["gate-leg-duplicated"]);
    const failedFirst = envelopeOf((envelope) => {
      envelope.data.steps = [{ name: "test", status: "failed", exit_code: 1 }, ...envelope.data.steps];
    });
    expect(gateRules(failedFirst)).toEqual(["gate-leg-not-passed"]);
  });

  it("refuses every required leg of an envelope that lists no steps", () => {
    const { steps: _steps, ...data } = envelopeOf().data;
    expect(gateRules({ ...envelopeOf(), data })).toEqual(LEGS.map(() => "gate-leg-missing"));
    expect(gateRules({ ...envelopeOf(), data: { ...data, steps: { lint: "passed" } } })).toEqual(LEGS.map(() => "gate-leg-missing"));
  });

  it("refuses a narrowed gate and a gate without a command id", () => {
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data.invocation, { only: ["lint"] })))).toEqual(["gate-narrowed"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data.invocation, { skip: ["test"] })))).toEqual(["gate-narrowed"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope, { ids: {} })))).toEqual(["gate-no-command-id"]);
  });

  it("refuses an envelope whose invocation is absent or not a record, or whose only or skip is not an empty list", () => {
    const control = envelopeOf().data.invocation;
    expect(gateRules(withInvocation(undefined))).toEqual(["gate-narrowed"]);
    expect(gateRules(withInvocation(null))).toEqual(["gate-narrowed"]);
    expect(gateRules(withInvocation(["build"]))).toEqual(["gate-narrowed"]);
    expect(gateRules(withInvocation({ ...control, only: "lint" }))).toEqual(["gate-narrowed"]);
    expect(gateRules(withInvocation({ ...control, skip: "test" }))).toEqual(["gate-narrowed"]);
    const { only: _only, ...withoutOnly } = control;
    expect(gateRules(withInvocation(withoutOnly))).toEqual(["gate-narrowed"]);
    const { skip: _skip, ...withoutSkip } = control;
    expect(gateRules(withInvocation(withoutSkip))).toEqual(["gate-narrowed"]);
  });

  it("refuses a gate run at a path other than the package root .", () => {
    const control = envelopeOf().data.invocation;
    expect(gateRules(withInvocation({ ...control, path: "src" }))).toEqual(["gate-narrowed"]);
    const { path: _path, ...withoutPath } = control;
    expect(gateRules(withInvocation(withoutPath))).toEqual(["gate-narrowed"]);
  });

  it.each(["exit 0", "cmd_0A1B2C3D4E5F", "cmd_0a1b2c3d4e5", "cmd_0a1b2c3d4e5f0", "xcmd_0a1b2c3d4e5f", "cmd_0a1b2c3d4e5g", "0a1b2c3d4e5f"])("refuses the malformed command id '%s'", (id) => {
    expect(gateRules({ ...envelopeOf(), ids: { command_id: id } })).toEqual(["gate-no-command-id"]);
  });

  it("refuses a command id that is not a string", () => {
    expect(gateRules({ ...envelopeOf(), ids: { command_id: 12345 } })).toEqual(["gate-no-command-id"]);
    expect(gateRules({ ...envelopeOf(), ids: "cmd_0a1b2c3d4e5f" })).toEqual(["gate-no-command-id"]);
  });

  it("refuses to judge without a full candidate sha or without required legs", () => {
    expect(() => gateEnvelopeFindings(envelopeOf(), { candidate: "abab", requiredLegs: LEGS })).toThrow(/candidate/);
    expect(() => gateEnvelopeFindings(envelopeOf(), { candidate: CANDIDATE, requiredLegs: [] })).toThrow(/required legs/);
  });
});

/** A field planted as left out of the envelope (no JSON value is this symbol). */
const LEFT_OUT = Symbol("left out");
type PredicateField = "status" | "gate_verdict" | "gate_passed" | "step status";
/** Sets `key` of `target` to `value`, or removes the key when `value` is LEFT_OUT. */
function plant(target: Record<string, unknown>, key: string, value: unknown): void {
  if (value === LEFT_OUT) Reflect.deleteProperty(target, key);
  else target[key] = value;
}
/** The control envelope with one predicate field planted: its status, data.gate_verdict, data.gate_passed or the status of the
 * test leg's step. */
function envelopeWith(field: PredicateField, value: unknown): unknown {
  const envelope = JSON.parse(JSON.stringify(envelopeOf())) as Record<string, unknown> & { data: Record<string, unknown> & { steps: Array<Record<string, unknown>> } };
  if (field === "status") plant(envelope, "status", value);
  else if (field === "step status") {
    for (const step of envelope.data.steps) if (step.name === "test") plant(step, "status", value);
  } else plant(envelope.data, field, value);
  return envelope;
}
function shownValue(value: unknown): string {
  return value === LEFT_OUT ? "left out" : JSON.stringify(value);
}
/**
 * The pinned forms of EAT-R084's four predicates (refusal #2 U1, members GP1-GP4; the R-B641 set in the enumerate form): each
 * passes with exactly one value, and every form listed here is refused with the rule beside it. A form not listed is NOT CLAIMED.
 */
const PREDICATE_FORMS: ReadonlyArray<readonly [PredicateField, unknown, string, readonly unknown[]]> = [
  ["status", "success", "gate-not-pass", [LEFT_OUT, null, "", "failure", "cancelled", "skipped", "Success", "SUCCESS", " success", "success ", "successful", "unsuccessful", ["success"], true, 1]],
  ["gate_verdict", "PASS", "gate-not-pass", [LEFT_OUT, null, "", "FAIL", "pass", "Pass", " PASS", "PASS ", "PASSED", "NOPASS", ["PASS"], true, 1]],
  ["gate_passed", true, "gate-not-pass", [LEFT_OUT, null, false, 0, 1, "true", "TRUE", "1", "", [true], [1]]],
  ["step status", "passed", "gate-leg-not-passed", [LEFT_OUT, null, "", "failed", "skipped", "not_run", "success", "Passed", "PASSED", " passed", "passed ", "passed-with-warnings", "unpassed", "pass", ["passed"], true, 1]],
];

describe("EAT-R084 pinned predicate forms (refusal #2 U1; the R-B641 set in the enumerate form)", () => {
  it.each(PREDICATE_FORMS.map(([field, value]) => [field, shownValue(value), value] as const))("passes an envelope whose %s is %s, the one passing value", (field, _shown, value) => {
    expect(gateRules(envelopeWith(field, value))).toEqual([]);
  });

  it.each(PREDICATE_FORMS.flatMap(([field, , rule, values]) => values.map((value) => [field, shownValue(value), rule, value] as const)))("refuses an envelope whose %s is %s with %s", (field, _shown, rule, value) => {
    expect(gateRules(envelopeWith(field, value))).toEqual([rule]);
  });
});

const LIVE_GATE: Rows = [
  ["real infrastructure gate", "PI-DETACHED-GRANTS"],
  ["gate tier", "producer"],
  ["gate result", "pass"],
  ["gate commit", CANDIDATE],
  ["gate receipt", COMMAND_ID],
];
function claimOf(status: string, gate: Rows = LIVE_GATE): Rows {
  return setRows(setRow(GOOD_ROWS, "slice status", status), gate);
}

describe("EAT-R085 each live slice claim names its real infrastructure gate", () => {
  // Acceptance: "Status validator rejects live/closed when required producer tier is skipped, unavailable, fixture-only or a
  // historical component receipt; source/test-only cut may land explicitly partial." Adversarial mutant: "Silently mark live
  // producer tier skipped and close slice."
  it("pins the slice, status, tier and result vocabularies", () => {
    expect([...SLICES]).toEqual(["PI-0", "PI-1", "PI-2", "PI-3", "PI-4", "PI-5", "PI-6", "PI-7"]);
    expect([...SLICE_STATUSES]).toEqual(["design-only", "partial", "live", "closed"]);
    expect([...CLOSING_STATUSES]).toEqual(["live", "closed"]);
    expect([...GATE_TIERS]).toEqual(["producer", "fixture", "historical"]);
    expect([...GATE_RESULTS]).toEqual(["pass", "fail", "skipped", "unavailable", "not-run"]);
  });

  it("lands a source/test-only cut explicitly partial, with or without a named gate still to run", () => {
    expect(rulesOf(GOOD_ROWS)).toEqual([]);
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["gate result", "not-run"]])))).toEqual([]);
    expect(rulesOf(setRow(GOOD_ROWS, "slice status", "design-only"))).toEqual([]);
  });

  it.each([...CLOSING_STATUSES])("accepts a %s claim whose named producer gate passed at the candidate commit", (status) => {
    expect(rulesOf(claimOf(status), { candidate: CANDIDATE })).toEqual([]);
  });

  it.each([...CLOSING_STATUSES])("refuses a %s claim that names no real infrastructure gate", (status) => {
    expect(rulesOf(claimOf(status, [["real infrastructure gate", "none"]]))).toEqual(["closing-gate-unnamed"]);
  });

  it("refuses a closed slice whose live producer tier was silently skipped (mutant)", () => {
    expect(rulesOf(claimOf("closed", setRows(LIVE_GATE, [["gate result", "skipped"]])), { candidate: CANDIDATE })).toEqual(["closing-gate-skipped"]);
  });

  it.each(["fail", "unavailable", "not-run"])("refuses a live claim whose gate result is %s", (result) => {
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate result", result]])), { candidate: CANDIDATE })).toEqual([`closing-gate-${result}`]);
  });

  it("refuses a fixture-only gate and a historical component receipt", () => {
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate tier", "fixture"]])), { candidate: CANDIDATE })).toEqual(["closing-gate-fixture-only"]);
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate tier", "historical"]])), { candidate: CANDIDATE })).toEqual(["closing-gate-historical"]);
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate commit", OLDER]])), { candidate: CANDIDATE })).toEqual(["closing-gate-historical"]);
  });

  it("refuses a closing gate without a full commit or without a command receipt", () => {
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate commit", "abab"]])))).toEqual(["closing-gate-commit-missing"]);
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate commit", CANDIDATE.toUpperCase()]])))).toEqual(["closing-gate-commit-missing"]);
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate receipt", "exit 0"]])))).toEqual(["closing-gate-receipt-missing"]);
  });

  it("refuses a block that omits the gate line, an unknown slice or status, and gate fields that contradict their gate", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "real infrastructure gate", undefined))).toEqual(["gate-line-missing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "slice", "PI-8"))).toEqual(["slice-unknown"]);
    expect(rulesOf(setRow(GOOD_ROWS, "slice status", "shipped"))).toEqual(["status-unknown"]);
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["gate tier", "rumour"]])))).toEqual(["gate-tier-unknown"]);
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["gate result", "green"]])))).toEqual(["gate-result-unknown"]);
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["real infrastructure gate", "detached grants"]])))).toEqual(["gate-name-malformed"]);
    expect(rulesOf(setRow(GOOD_ROWS, "gate result", "pass"))).toEqual(["gate-fields-without-gate"]);
  });

  it.each(["PIDETACHED", "pi-detached-grants", "PI-", "-PI-DETACHED"])("refuses the malformed gate name '%s'", (name) => {
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["real infrastructure gate", name]])))).toEqual(["gate-name-malformed"]);
  });

  it.each([
    ["gate tier", "producer"],
    ["gate result", "pass"],
    ["gate commit", CANDIDATE],
    ["gate receipt", COMMAND_ID],
  ])("refuses a '%s' line under a block that names no gate", (label, value) => {
    expect(rulesOf(setRow(GOOD_ROWS, label, value))).toEqual(["gate-fields-without-gate"]);
  });
});

const TABLE_HEAD: readonly string[] = ["| Feature | Status | Evidence | Caveats |", "| --- | --- | --- | --- |"];
/** A feature matrix shaped like docs/workbench/feature-matrix.md: W10 before W11, W12 after. */
function featureMatrix(w11Row: string, w10Row = "| A W10 feature | landed-gated | e | c |"): string {
  return ["# Workbench release feature matrix", "", "## W10: ReactiveFiber", "", ...TABLE_HEAD, w10Row, "", W11_HEADING, "", ...TABLE_HEAD, w11Row, "", "## W12: Next", "", "text", ""].join("\n");
}
/** A feature matrix whose W11 section is `heading` then `body`; `before` lines precede the W11 heading, `after` lines follow W12. */
function matrixOf(body: readonly string[], parts: { readonly heading?: readonly string[]; readonly before?: readonly string[]; readonly after?: readonly string[] } = {}): string {
  const { heading = [W11_HEADING], before = [], after = [] } = parts;
  return ["# Workbench release feature matrix", "", "## W10: ReactiveFiber", "", ...TABLE_HEAD, "| A W10 feature | landed-gated | e | c |", "", ...before, ...heading, "", ...body, "", "## W12: Next", "", "text", "", ...after].join("\n");
}
const W11_PLANNED = "| Hosted develop() | planned | No binding host exists: no module under src/workbench/hosts/ names MechanicalWorkflows. | caveat |";
const W11_EVIDENCED = "| Hosted develop() | planned | No binding host exists: no module under src/workbench/hosts/ names MechanicalWorkflows; PI-7 partial. | caveat |";
const W11_LANDED = "| Hosted develop() | landed-gated | src/workbench/hosts/mechanical-functions.ts exists | caveat |";
const HOST_MODULE = `${HOSTS_DIR}mechanical-functions.ts`;
const BASE_TREE: Tree = {
  [TRACEABILITY_PATH]: "# Traceability\n\n| ID | Status |\n| --- | --- |\n| WB-001 | planned |\n",
  [FEATURE_MATRIX_PATH]: featureMatrix(W11_PLANNED),
  [SKILL_PATH]: "# skill\n\nstate: design only\n",
  [README]: "# program\n",
  "forge.toml": `[build]\ngate = [${LEGS.map((leg) => `"${leg}"`).join(", ")}]\n\n[build.commands.${LIVE_TIER}]\nrun = "x"\n`,
  [SEAM]: "the seam test\n",
  [`${HOSTS_DIR}local-detached.ts`]: "export const host = 1;\n",
};
/** BASE_TREE with each change applied (an undefined value deletes the path). */
function treeWith(changes: Readonly<Record<string, string | undefined>>, from: Tree = BASE_TREE): Tree {
  const merged: Record<string, string | undefined> = { ...from, ...changes };
  return Object.fromEntries(Object.entries(merged).filter((entry): entry is [string, string] => entry[1] !== undefined));
}
function treeWithout(tree: Tree, ...paths: string[]): Tree {
  return Object.fromEntries(Object.entries(tree).filter(([path]) => !paths.includes(path)));
}
function cutOf(base: Tree, head: Tree, extra: { readonly candidate?: string; readonly envelope?: unknown } = {}) {
  const paths = [...new Set([...Object.keys(base), ...Object.keys(head)])].sort();
  const changes = paths.flatMap((path) => (base[path] === head[path] ? [] : [{ path, status: base[path] === undefined ? "A" : head[path] === undefined ? "D" : "M" }]));
  const has = (tree: Tree) => (path: string) => (path.endsWith("/") ? Object.keys(tree).some((key) => key.startsWith(path)) : tree[path] !== undefined);
  const hostModules = Object.keys(head)
    .filter((path) => path.startsWith(HOSTS_DIR) && /mechanical/i.test(head[path] ?? ""))
    .sort();
  return { changes, exists: { base: has(base), head: has(head) }, text: { base: (path: string) => base[path], head: (path: string) => head[path] }, beadIds: BEADS, hostModules, forgeTiers: FORGE_TIERS, requiredLegs: LEGS, ...extra };
}
function cutRules(base: Tree, head: Tree, extra: { readonly candidate?: string; readonly envelope?: unknown } = {}): string[] {
  return judgeCut(cutOf(base, head, extra))
    .findings.map((finding) => finding.rule)
    .sort();
}
/** A slice cut that updates W11, the skill and the program docs in the same cut and names each in its receipt. */
const SLICE_CUT: Readonly<Record<string, string>> = {
  [RECEIPT]: receiptOf(GOOD_ROWS),
  [FEATURE_MATRIX_PATH]: featureMatrix(W11_EVIDENCED),
  [SKILL_PATH]: `${BASE_TREE[SKILL_PATH]}PI-7: partial\n`,
  [README]: `${BASE_TREE[README]}PI-7 partial\n`,
};
/** The rules of the slice cut whose feature matrix at head is `matrix`. */
function sliceRules(matrix: string, extra: { readonly candidate?: string } = {}): string[] {
  return cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [FEATURE_MATRIX_PATH]: matrix }), extra);
}

describe("EAT-R082 each slice cut updates W11 and the project skill to its evidenced status", () => {
  // Acceptance: "qa/workbench status validator compares each changed slice to same-cut docs/skill/W11 evidence pointers. Missing
  // live gate leaves slice non-live; stale no-Mechanical-code assertion is removed without claiming invocation shipped."
  // Adversarial mutant: "Set W11 landed-gated from source existence or one fixture alone."
  it("pins the evidence pointers and the W11 heading", () => {
    expect(SKILL_PATH).toBe(".agents/skills/pi-mechanical-interop/SKILL.md");
    expect(FEATURE_MATRIX_PATH).toBe("docs/workbench/feature-matrix.md");
    expect(PROGRAM_DOCS_DIR).toBe("docs/workbench/programs/mechanical-workflows-interop-2026-11-04/");
    expect(W11_HEADING).toBe("## W11: MechanicalWorkflows binding host");
    expect(W11_TITLE).toBe("W11: MechanicalWorkflows binding host");
    expect(HOSTS_DIR).toBe("src/workbench/hosts/");
    expect(readFileSync(join(REPO, FEATURE_MATRIX_PATH), "utf8").split("\n")).toContain(W11_HEADING);
  });

  it("accepts a slice cut that updates W11, the skill and the program docs and names each pointer", () => {
    const verdict = judgeCut(cutOf(BASE_TREE, treeWith(SLICE_CUT)));
    expect(verdict.findings).toEqual([]);
    expect(verdict.receipts).toEqual([RECEIPT]);
    expect(verdict.closure).toEqual({ state: "open", reasons: [OPEN_REASONS.noEnvelope] });
  });

  it.each([
    ["skill", SKILL_PATH],
    ["docs", README],
  ])("refuses a slice cut that leaves the %s pointer unchanged while it exists at base", (key, path) => {
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [path]: BASE_TREE[path] }))).toEqual([`same-cut-${key}`]);
  });

  it("refuses a slice cut whose W11 section is unchanged, even when the feature matrix changed elsewhere", () => {
    const elsewhere = featureMatrix(W11_PLANNED, "| A W10 feature | landed-gated | e, re-measured | c |");
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [FEATURE_MATRIX_PATH]: elsewhere }))).toEqual(["same-cut-w11"]);
  });

  it("refuses a slice cut whose W11 edit changes no rendered text (whitespace only) as no W11 update", () => {
    const spaced = featureMatrix(W11_PLANNED.replace("| planned |", "|   planned   |"));
    expect(sliceRules(spaced)).toEqual(["same-cut-w11"]);
  });

  it("refuses a pointer the receipt's docs line does not name", () => {
    const rows = setRow(GOOD_ROWS, DOCS_LINE, `${FEATURE_MATRIX_PATH} W11; ${README}`);
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(rows) }))).toEqual(["pointer-unnamed-skill"]);
  });

  it.each([
    ["w11", `${SKILL_PATH}; ${README}; ${RECEIPT}`],
    ["skill", `${FEATURE_MATRIX_PATH} W11; ${README}; ${RECEIPT}`],
    ["docs", `${FEATURE_MATRIX_PATH} W11; ${SKILL_PATH}; ${RECEIPT}`],
  ])("refuses a slice cut whose docs line does not name its %s pointer", (key, docsLine) => {
    const rows = setRow(GOOD_ROWS, DOCS_LINE, docsLine);
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(rows) }))).toEqual([`pointer-unnamed-${key}`]);
  });

  it("records a skill and program docs absent at base and head as blockers of a partial claim and refuses a live one", () => {
    const base = treeWithout(BASE_TREE, SKILL_PATH, README);
    const head = (rows: Rows) => treeWith({ [RECEIPT]: receiptOf(rows), [FEATURE_MATRIX_PATH]: featureMatrix(W11_EVIDENCED) }, base);
    const disclosed = setRow(GOOD_ROWS, BLOCKERS_LINE, `${SKILL_PATH} and ${PROGRAM_DOCS_DIR} are absent at base`);
    expect(cutRules(base, head(disclosed))).toEqual([]);
    expect(cutRules(base, head(GOOD_ROWS))).toEqual(["docs-absent-undisclosed", "skill-absent-undisclosed"]);
    expect(cutRules(base, head(setRows(disclosed, claimOf("live"))), { candidate: CANDIDATE })).toEqual(["docs-absent", "skill-absent"]);
  });

  it.each([
    ["w11", FEATURE_MATRIX_PATH, FEATURE_MATRIX_PATH],
    ["skill", SKILL_PATH, SKILL_PATH],
    ["docs", README, PROGRAM_DOCS_DIR],
  ])("records the %s pointer absent at base and head as a blocker of a partial claim and refuses a live claim without it", (key, path, pointer) => {
    const base = treeWithout(BASE_TREE, path);
    const head = (rows: Rows) => treeWith({ ...treeWithout(SLICE_CUT, path), [RECEIPT]: receiptOf(rows) }, base);
    const disclosed = setRow(GOOD_ROWS, BLOCKERS_LINE, `${pointer} is absent at base`);
    expect(cutRules(base, head(disclosed))).toEqual([]);
    expect(cutRules(base, head(GOOD_ROWS))).toEqual([`${key}-absent-undisclosed`]);
    expect(cutRules(base, head(setRows(disclosed, claimOf("live"))), { candidate: CANDIDATE })).toEqual([`${key}-absent`]);
  });

  it("refuses a live claim without a gate: a missing live gate leaves the slice non-live", () => {
    const head = treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(setRow(GOOD_ROWS, "slice status", "live")) });
    expect(cutRules(BASE_TREE, head)).toEqual(["closing-gate-unnamed"]);
  });

  it("refuses W11 set landed-gated from source existence or one fixture alone (mutant)", () => {
    const landed = featureMatrix("| Hosted develop() | landed-gated | src/workbench/hosts/mechanical-functions.ts exists | caveat |");
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [FEATURE_MATRIX_PATH]: landed }))).toEqual(["w11-landed-gated-unwitnessed"]);
    const fixture = receiptOf(claimOf("live", setRows(LIVE_GATE, [["gate tier", "fixture"]])));
    const rules = cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: fixture, [FEATURE_MATRIX_PATH]: landed }), { candidate: CANDIDATE });
    expect(rules).toEqual(["closing-gate-fixture-only", "w11-landed-gated-unwitnessed"]);
  });

  it("accepts W11 landed-gated when the cut's live claim names a producer gate that passed at the candidate", () => {
    const landed = featureMatrix("| Hosted develop() | landed-gated | live gate PI-DETACHED-GRANTS | caveat |");
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(claimOf("live")), [FEATURE_MATRIX_PATH]: landed }), { candidate: CANDIDATE })).toEqual([]);
  });

  it("accepts W11 landed-gated when the cut's closed claim names a producer gate that passed at the candidate", () => {
    const landed = featureMatrix("| Hosted develop() | landed-gated | closed gate PI-DETACHED-GRANTS | caveat |");
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(claimOf("closed")), [FEATURE_MATRIX_PATH]: landed }), { candidate: CANDIDATE })).toEqual([]);
  });

  it("refuses W11 landed-gated on a live claim judged without a candidate commit: an unkeyed claim witnesses nothing", () => {
    const landed = featureMatrix("| Hosted develop() | landed-gated | live gate PI-DETACHED-GRANTS | caveat |");
    const verdict = judgeCut(cutOf(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(claimOf("live")), [FEATURE_MATRIX_PATH]: landed })));
    expect(verdict.findings.map((finding) => finding.rule)).toEqual(["w11-landed-gated-unwitnessed"]);
    expect(verdict.closure).toEqual({ state: "open", reasons: [OPEN_REASONS.noEnvelope, OPEN_REASONS.unkeyed] });
  });

  it("keeps a live claim judged without a candidate commit open with the unkeyed reason", () => {
    const verdict = judgeCut(cutOf(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(claimOf("live")) })));
    expect(verdict.findings).toEqual([]);
    expect(verdict.closure).toEqual({ state: "open", reasons: [OPEN_REASONS.noEnvelope, OPEN_REASONS.unkeyed] });
  });

  it("refuses a stale no-binding-host statement once a host module names MechanicalWorkflows", () => {
    const head = treeWith({ [`${HOSTS_DIR}mechanical-functions.ts`]: "// the MechanicalWorkflows function host\n" });
    expect(cutRules(BASE_TREE, head)).toEqual(["w11-absence-stale"]);
    const section = w11Section(featureMatrix(W11_PLANNED)) ?? "";
    expect(w11Findings({ baseSection: section, headSection: section, hostModules: [`${HOSTS_DIR}x.ts`], witnessed: false }).map((finding) => finding.rule)).toEqual(["w11-absence-stale"]);
    expect(w11Findings({ baseSection: section, headSection: section, hostModules: [], witnessed: false })).toEqual([]);
  });

  it.each([
    ["the hyphenated spelling", "| Hosted develop() | planned | No binding-host code or tests exist; only read-only discovery receipts. | caveat |"],
    ["upper case", "| Hosted develop() | planned | NO BINDING HOST EXISTS. | caveat |"],
    ["emphasis inside the phrase", "| Hosted develop() | planned | No *binding* host exists: no module names MechanicalWorkflows. | caveat |"],
    ["a non-breaking space reference", "| Hosted develop() | planned | No&nbsp;binding host exists. | caveat |"],
    ["the plural", "| Hosted develop() | planned | No binding hosts exist. | caveat |"],
    ["the hyphenated plural", "| Hosted develop() | planned | No binding-hosts exist. | caveat |"],
  ])("refuses a stale no-binding-host statement written in %s once a host module names MechanicalWorkflows", (_form, row) => {
    const base = treeWith({ [FEATURE_MATRIX_PATH]: featureMatrix(row) });
    expect(cutRules(base, treeWith({ [HOST_MODULE]: "// the MechanicalWorkflows function host\n" }, base))).toEqual(["w11-absence-stale"]);
  });

  it("reads the W11 section to the next level-2 heading and its status cells", () => {
    const section = w11Section(featureMatrix(W11_PLANNED)) ?? "";
    expect(section.startsWith(W11_HEADING)).toBe(true);
    expect(section).not.toContain("## W12");
    expect(section).not.toContain("A W10 feature");
    expect(w11Statuses(section)).toEqual(["planned"]);
    expect(w11Section("# no W11 here\n")).toBeUndefined();
  });

  it("closes no cut without a release receipt", () => {
    const verdict = judgeCut(cutOf(BASE_TREE, treeWith({ "src/x.ts": "x\n" })));
    expect(verdict.findings).toEqual([]);
    expect(verdict.closure.state).toBe("open");
    expect(verdict.closure.reasons).toEqual([OPEN_REASONS.noReceipt, OPEN_REASONS.noEnvelope]);
  });
});

const W11_LANDED_LIVE = featureMatrix("| Hosted develop() | landed-gated | live gate PI-DETACHED-GRANTS | caveat |");
/** The rules of a slice cut whose receipt holds `rows` and whose W11 row turns landed-gated, judged against the candidate. */
function landedRules(...blocks: Rows[]): string[] {
  const receipt = ["# wb-good: a good bead", "", ...blocks.flatMap((rows, index) => [`## 2026-11-06 cut ${index + 1}`, "", blockOf(rows), ""])].join("\n");
  return cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receipt, [FEATURE_MATRIX_PATH]: W11_LANDED_LIVE }), { candidate: CANDIDATE });
}

describe("EAT-R082 pinned witness forms (refusal #2 U3, member GP13; the R-B641 set in the enumerate form)", () => {
  // A live or closed claim witnesses W11 landed-gated when it is judged against a candidate commit and its block has no EAT-R085
  // finding. Pinned: each EAT-R085 finding a closing claim can carry leaves W11 unwitnessed; an EAT-R083 or EAT-R086 finding
  // alone does not; one clean closing claim beside a refused one witnesses.
  it.each([
    ["live", "an unknown slice", setRow(claimOf("live"), "slice", "PI-8"), ["slice-unknown"]],
    ["live", "a malformed gate name", claimOf("live", setRows(LIVE_GATE, [["real infrastructure gate", "PI-DETACHED-GRANTS-"]])), ["gate-name-malformed"]],
    ["live", "an unknown gate tier", claimOf("live", setRows(LIVE_GATE, [["gate tier", "rumour"]])), ["gate-tier-unknown"]],
    ["live", "no gate tier line", claimOf("live", setRow(LIVE_GATE, "gate tier", undefined)), ["gate-tier-unknown"]],
    ["live", "an unknown gate result", claimOf("live", setRows(LIVE_GATE, [["gate result", "green"]])), ["gate-result-unknown"]],
    ["live", "no gate result line", claimOf("live", setRow(LIVE_GATE, "gate result", undefined)), ["gate-result-unknown"]],
    ["live", "a fixture-only gate", claimOf("live", setRows(LIVE_GATE, [["gate tier", "fixture"]])), ["closing-gate-fixture-only"]],
    ["live", "a historical gate tier", claimOf("live", setRows(LIVE_GATE, [["gate tier", "historical"]])), ["closing-gate-historical"]],
    ["live", "a gate run at another commit", claimOf("live", setRows(LIVE_GATE, [["gate commit", OLDER]])), ["closing-gate-historical"]],
    ["live", "a failed gate", claimOf("live", setRows(LIVE_GATE, [["gate result", "fail"]])), ["closing-gate-fail"]],
    ["live", "a skipped gate", claimOf("live", setRows(LIVE_GATE, [["gate result", "skipped"]])), ["closing-gate-skipped"]],
    ["live", "an unavailable gate", claimOf("live", setRows(LIVE_GATE, [["gate result", "unavailable"]])), ["closing-gate-unavailable"]],
    ["live", "a gate not run", claimOf("live", setRows(LIVE_GATE, [["gate result", "not-run"]])), ["closing-gate-not-run"]],
    ["live", "no full gate commit", claimOf("live", setRows(LIVE_GATE, [["gate commit", "abab"]])), ["closing-gate-commit-missing"]],
    ["live", "no command receipt", claimOf("live", setRows(LIVE_GATE, [["gate receipt", "exit 0"]])), ["closing-gate-receipt-missing"]],
    ["live", "no named gate", claimOf("live", [["real infrastructure gate", "none"]]), ["closing-gate-unnamed"]],
    ["live", "no gate line", setRow(claimOf("live", []), "real infrastructure gate", undefined), ["closing-gate-unnamed", "gate-line-missing"]],
    ["closed", "an unknown gate tier", claimOf("closed", setRows(LIVE_GATE, [["gate tier", "rumour"]])), ["gate-tier-unknown"]],
    ["closed", "a malformed gate name", claimOf("closed", setRows(LIVE_GATE, [["real infrastructure gate", "PI-DETACHED-GRANTS-"]])), ["gate-name-malformed"]],
  ])("leaves W11 landed-gated unwitnessed by a %s claim with %s", (_status, _finding, rows, rules) => {
    expect(landedRules(rows)).toEqual([...rules, "w11-landed-gated-unwitnessed"].sort());
  });

  it.each([
    ["an EAT-R083 finding (a red result line left out)", setRow(claimOf("live"), "red result", undefined), ["tdd-leg-missing"]],
    ["an EAT-R086 finding (an empty owner line)", setRow(claimOf("live"), "owner repo and producer authority", ""), ["field-empty"]],
  ])("lets a live claim with %s alone witness W11 landed-gated", (_finding, rows, rules) => {
    expect(landedRules(rows)).toEqual(rules);
  });

  it("lets one clean live claim witness W11 landed-gated beside a live claim refused with an EAT-R085 finding, in either order", () => {
    const refused = claimOf("live", setRows(LIVE_GATE, [["gate tier", "rumour"]]));
    expect(landedRules(refused, claimOf("live"))).toEqual(["gate-tier-unknown"]);
    expect(landedRules(claimOf("live"), refused)).toEqual(["gate-tier-unknown"]);
  });
});

/** A W11 section whose one row is neutral and whose `statement` lines follow its table. */
function w11With(statement: readonly string[]): string {
  return matrixOf([...TABLE_HEAD, "| Hosted develop() | planned | e | c |", "", ...statement]);
}
/** The W11 rules of a cut that adds a host module naming MechanicalWorkflows under a W11 section holding `statement`. */
function staleRules(statement: readonly string[]): string[] {
  const base = treeWith({ [FEATURE_MATRIX_PATH]: w11With(statement) });
  return cutRules(base, treeWith({ [HOST_MODULE]: "// the MechanicalWorkflows function host\n" }, base));
}

describe("EAT-R082 pinned absence spellings (refusal #2 U4, members GP11, GP12; the R-B641 set in the enumerate form)", () => {
  // The absence words are "no binding host" and "no binding-host", singular or plural, in any case, each a whole phrase: a word
  // character before "no" or after "host"/"hosts" makes it no absence statement. Pinned below on each side and each separator.
  it.each([
    ["a word ending in no before it (singular)", "An Arduino binding host is out of scope."],
    ["a word ending in no before it (plural)", "Arduino binding hosts are out of scope."],
    ["a word continuing host (singular)", "No binding hostname is configured."],
    ["a word continuing hosts (plural)", "No binding hostsfile is configured."],
    ["a word continuing host past ed", "No binding hosted copy exists."],
    ["an underscore between binding and host", "No binding_host exists."],
    ["no separator between binding and host", "No bindinghost exists."],
    ["two hyphens between binding and host", "No binding--host exists."],
    ["no space between no and binding", "Nobinding host exists."],
  ])("reads %s as no absence statement", (_form, line) => {
    expect(staleRules([line])).toEqual([]);
  });

  it.each([
    ["at a sentence end", "No binding host."],
    ["in parentheses", "(no binding host)"],
    ["before an apostrophe", "No binding host's code exists."],
    ["before a hyphenated word", "No binding host-side code exists."],
    ["with a whitespace run between its words", "No binding   host exists."],
    ["in the plural before an apostrophe", "No binding hosts' list exists."],
    ["in the hyphenated plural at a sentence end", "No binding-hosts."],
  ])("reads the absence words %s as a stale absence statement", (_form, line) => {
    expect(staleRules([line])).toEqual(["w11-absence-stale"]);
  });
});

describe("EAT-R082 pinned pointer statuses (refusal #2 U4, member GP14; the R-B641 set in the enumerate form)", () => {
  // A pointer absent at base and head refuses a live or closed claim (pinned above) and must be named on the blockers line of
  // every other claim. Pinned here: design-only, partial, an unknown status, a status in another case and a status line left out.
  const base = treeWithout(BASE_TREE, SKILL_PATH, README);
  const head = (rows: Rows) => treeWith({ [RECEIPT]: receiptOf(rows), [FEATURE_MATRIX_PATH]: featureMatrix(W11_EVIDENCED) }, base);
  const disclosedLine = `${SKILL_PATH} and ${PROGRAM_DOCS_DIR} are absent at base`;
  it.each([
    ["design-only", []],
    ["partial", []],
    ["shipped", ["status-unknown"]],
    ["Partial", ["status-unknown"]],
    [undefined, ["status-unknown"]],
  ])("refuses a claim of status %s whose blockers line names neither absent pointer, and accepts it once both are named", (status, statusRules) => {
    const rows = setRow(GOOD_ROWS, "slice status", status);
    expect(cutRules(base, head(rows))).toEqual(["docs-absent-undisclosed", "skill-absent-undisclosed", ...statusRules].sort());
    expect(cutRules(base, head(setRow(rows, BLOCKERS_LINE, disclosedLine)))).toEqual(statusRules);
  });

  it("accepts a slice cut that adds the skill and the program docs absent at base and names both on its docs line", () => {
    const base = treeWithout(BASE_TREE, SKILL_PATH, README);
    expect(cutRules(base, treeWith(SLICE_CUT, base))).toEqual([]);
  });

  it("reads a changed path that only begins with the skill path as no skill update", () => {
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [SKILL_PATH]: BASE_TREE[SKILL_PATH], [`${SKILL_PATH}.orig`]: "# a backup\n" }))).toEqual(["same-cut-skill"]);
  });

  it("reads a changed path that holds the program docs directory below another directory as no program docs update", () => {
    const nested = `archive/${README}`;
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [README]: BASE_TREE[README], [nested]: "# an archived copy\n" }))).toEqual(["same-cut-docs"]);
  });

  it.each(["design-only", "shipped"])("refuses a %s claim whose blockers line names the absent W11 matrix only when it does not", (status) => {
    const noMatrix = treeWithout(BASE_TREE, FEATURE_MATRIX_PATH);
    const rows = setRow(GOOD_ROWS, "slice status", status);
    const statusRules = status === "shipped" ? ["status-unknown"] : [];
    const cut = (blockers: string) => cutRules(noMatrix, treeWith({ ...treeWithout(SLICE_CUT, FEATURE_MATRIX_PATH), [RECEIPT]: receiptOf(setRow(rows, BLOCKERS_LINE, blockers)) }, noMatrix));
    expect(cut("none")).toEqual(["w11-absent-undisclosed", ...statusRules].sort());
    expect(cut(`${FEATURE_MATRIX_PATH} is absent at base`)).toEqual(statusRules);
  });
});

describe("the W11 section in the rendered view (the view every W11 rule reads)", () => {
  it("reads a level-3 subsection as part of the W11 section, so a landed-gated row under it is refused", () => {
    const matrix = matrixOf([...TABLE_HEAD, W11_EVIDENCED, "", "### Status update 2026-11-06", "", ...TABLE_HEAD, W11_LANDED]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
    expect(w11Statuses(w11Section(matrix) ?? "")).toEqual(["planned", "landed-gated"]);
  });

  it("ends the W11 section at a level-1 heading, so a table after it is no W11 row", () => {
    const matrix = matrixOf([...TABLE_HEAD, W11_EVIDENCED, "", "# Appendix", "", ...TABLE_HEAD, W11_LANDED]);
    expect(sliceRules(matrix)).toEqual([]);
    expect(w11Statuses(w11Section(matrix) ?? "")).toEqual(["planned"]);
  });

  it.each([
    ["an ATX heading with a closing sequence", [`${W11_HEADING} ##`]],
    ["an ATX heading indented by two spaces", [`  ${W11_HEADING}`]],
    ["a setext heading", [W11_TITLE, "---"]],
    ["a heading with emphasis in its text", ["## W11: *MechanicalWorkflows* binding host"]],
  ])("reads the W11 section under %s", (_form, heading) => {
    const matrix = matrixOf([...TABLE_HEAD, W11_LANDED], { heading });
    expect(w11Headings(matrix)).toEqual([W11_TITLE]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
  });

  it.each([
    ["a second W11 section after W12 (a duplicate heading)", { after: [W11_HEADING, "", ...TABLE_HEAD, W11_LANDED] }],
    ["a W11 heading inside a blockquote", { after: [`> ${W11_HEADING}`] }],
    ["a W11 heading at level 3 elsewhere", { after: [`### ${W11_TITLE}`] }],
    ["a second heading that begins with W11", { after: ["## W11 status update", "", ...TABLE_HEAD, W11_LANDED] }],
    ["a W11 heading renamed away from its title", { heading: ["## W11: Mechanical binding host"] }],
    ["its only W11 heading at level 3", { heading: [`### ${W11_TITLE}`] }],
  ])("refuses a feature matrix that holds %s: exactly one W11 heading, read in the same view", (_form, parts) => {
    const matrix = matrixOf([...TABLE_HEAD, W11_EVIDENCED], parts);
    expect(w11Section(matrix)).toBeUndefined();
    expect(sliceRules(matrix)).toEqual(["w11-heading-not-unique"]);
  });

  it("reads the visible W11 section, not a hidden copy of its heading inside an HTML comment before it", () => {
    const hidden = ["<!--", W11_HEADING, "", ...TABLE_HEAD, "| Hosted develop() | planned | hidden | c |", "-->", ""];
    const matrix = matrixOf([...TABLE_HEAD, W11_LANDED], { before: hidden });
    expect(w11Headings(matrix)).toEqual([W11_TITLE]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
  });

  it.each([
    ["a row without its leading and trailing pipes", "Hosted develop() | landed-gated | e | c"],
    ["a code span", "| Hosted develop() | `landed-gated` | e | c |"],
    ["strong emphasis", "| Hosted develop() | **landed-gated** | e | c |"],
    ["a decimal character reference", "| Hosted develop() | landed&#45;gated | e | c |"],
    ["a hexadecimal character reference", "| Hosted develop() | landed&#x2D;gated | e | c |"],
    ["a backslash escape", "| Hosted develop() | landed\\-gated | e | c |"],
  ])("reads a landed-gated status written as %s as landed-gated", (_form, row) => {
    const matrix = matrixOf([...TABLE_HEAD, row]);
    expect(w11Statuses(w11Section(matrix) ?? "")).toEqual(["landed-gated"]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
  });

  it("reads a table nested in a blockquote inside the W11 section as W11 rows", () => {
    const matrix = matrixOf([...TABLE_HEAD, W11_EVIDENCED, "", ...[...TABLE_HEAD, W11_LANDED].map((line) => `> ${line}`)]);
    expect(w11Statuses(w11Section(matrix) ?? "")).toEqual(["planned", "landed-gated"]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
  });

  it("refuses raw HTML inside the W11 section: a hidden row in a comment, and inline HTML in a status cell", () => {
    const commented = matrixOf([...TABLE_HEAD, W11_EVIDENCED, "", "<!-- | Hosted develop() | landed-gated | x | y | -->"]);
    expect(w11Html(w11Section(commented) ?? "")).toHaveLength(1);
    expect(sliceRules(commented)).toEqual(["w11-html"]);
    const inline = matrixOf([...TABLE_HEAD, "| Hosted develop() | <b>landed-gated</b> | e | c |"]);
    expect(sliceRules(inline)).toEqual(["w11-html", "w11-landed-gated-unwitnessed"]);
  });

  it("refuses a W11 edit that only adds an HTML comment as no rendered W11 update", () => {
    const base = treeWith({ [FEATURE_MATRIX_PATH]: matrixOf([...TABLE_HEAD, W11_EVIDENCED]) });
    const head = treeWith({ ...SLICE_CUT, [FEATURE_MATRIX_PATH]: matrixOf([...TABLE_HEAD, W11_EVIDENCED, "", "<!-- re-measured -->"]) }, base);
    expect(cutRules(base, head)).toEqual(["same-cut-w11", "w11-html"]);
  });

  it("reads a pipe row inside a fenced block as code, never as a W11 row", () => {
    const matrix = matrixOf([...TABLE_HEAD, W11_EVIDENCED, "", "```", W11_LANDED, "```"]);
    expect(w11Statuses(w11Section(matrix) ?? "")).toEqual(["planned"]);
    expect(sliceRules(matrix)).toEqual([]);
  });

  it("refuses a W11 status outside the matrix's status vocabulary, and a W11 table without a Status column", () => {
    expect(sliceRules(matrixOf([...TABLE_HEAD, "| Hosted develop() | shipped | e | c |"]))).toEqual(["w11-status-unknown"]);
    expect(sliceRules(matrixOf(["| Feature | State |", "| --- | --- |", "| Hosted develop() | landed-gated |"]))).toEqual(["w11-status-unknown"]);
    expect(w11Rows(w11Section(matrixOf(["| Feature | State |", "| --- | --- |", "| Hosted develop() | landed-gated |"])) ?? "")).toEqual([{ feature: "Hosted develop()", status: "" }]);
  });

  it("refuses a row that turns landed-gated beside a row that was landed-gated at base, and accepts an edit of that landed row", () => {
    const landedA = "| Feature A | landed-gated | witnessed earlier | c |";
    const base = treeWith({ [FEATURE_MATRIX_PATH]: matrixOf([...TABLE_HEAD, landedA, W11_PLANNED]) });
    const turned = treeWith({ ...SLICE_CUT, [FEATURE_MATRIX_PATH]: matrixOf([...TABLE_HEAD, landedA, W11_LANDED]) }, base);
    expect(cutRules(base, turned)).toEqual(["w11-landed-gated-unwitnessed"]);
    const edited = treeWith({ ...SLICE_CUT, [FEATURE_MATRIX_PATH]: matrixOf([...TABLE_HEAD, "| Feature A | landed-gated | witnessed earlier, re-measured | c |", W11_PLANNED]) }, base);
    expect(cutRules(base, edited)).toEqual([]);
  });

  it("renders markdown as its visible text: markup as text, references decoded, whitespace collapsed, HTML read as nothing", () => {
    expect(renderedText("No *binding*\nhost &amp; `a&amp;b` <!-- hidden --> end\n\n| Feature | Status |\n| --- | --- |\n| a | **b** |\n\n- one\n- two\n")).toBe(
      "No binding host & a&amp;b end\nFeature | Status\na | b\none\ntwo",
    );
    expect(renderedText("&lt;a&gt; &quot;q&quot; &apos;s&apos; &amp; x&nbsp;y &#x41;&#66; &#9999999; &#0; &copy;\n")).toBe(`<a> "q" 's' & x y AB &#9999999; &#0; &copy;`);
    expect(headingTexts(["## A ##", "", "> ## B", "", "<!--", "## C", "-->", "", "```", "## D", "```", "", "    ## E", "", "F", "---", ""].join("\n"))).toEqual(["A", "B", "F"]);
    expect(markdownSection(["# Top", "", "## Part", "", "text", "", "### Sub", "", "more", "", "## Next", ""].join("\n"), "Part")).toBe("## Part\n\ntext\n\n### Sub\n\nmore\n\n");
    expect(markdownSection(["## Part", "", "a", "", "## Part", "", "b", ""].join("\n"), "Part")).toBeUndefined();
  });
});

describe("the rendered view: pinned markup forms (refusal #2 U5, members GN1-GN3; the rendered-view set at rung 1)", () => {
  // Pinned: a hard line break (two trailing spaces or a backslash) and a soft one read as a space; a blockquote, a nested one and a
  // lazy continuation read as their lines; a link (inline, with a title, with a code-span text, full, collapsed and shortcut
  // reference with its definition in the same text) and an autolink read as their text. The rest of markdown is NOT CLAIMED
  // beyond the forms pinned in the block above.
  it.each([
    ["a hard line break of two trailing spaces", ["No binding  ", "host exists."]],
    ["a hard line break of a backslash", ["No binding\\", "host exists."]],
    ["a soft line break", ["No binding", "host exists."]],
    ["a blockquote", ["> No binding host exists."]],
    ["a blockquote nested in a blockquote", ["> > No binding host exists."]],
    ["a blockquote's lazy continuation line", ["> No binding", "host exists."]],
    ["an inline link with a code-span text", ["No [`binding`](#w11) host exists."]],
    ["an inline link with a title", ['No [binding](#w11 "the binding") host exists.']],
    ["a full reference link", ["No [binding][b] host exists.", "", "[b]: #w11"]],
    ["a collapsed reference link", ["No [binding][] host exists.", "", "[binding]: #w11"]],
    ["a shortcut reference link", ["No [binding] host exists.", "", "[binding]: #w11"]],
  ])("renders %s as one line of its text", (_form, lines) => {
    expect(renderedText(lines.join("\n"))).toBe("No binding host exists.");
  });

  it("renders an autolink as its URL text", () => {
    expect(renderedText("Ask <https://binding.example.invalid> first.\n")).toBe("Ask https://binding.example.invalid first.");
  });

  it.each([
    ["a hard line break of two trailing spaces", ["No binding  ", "host exists."]],
    ["a hard line break of a backslash", ["No binding\\", "host exists."]],
    ["a blockquote", ["> No binding host exists."]],
    ["a blockquote nested in a blockquote", ["> > No binding host exists."]],
    ["an inline link with a code-span text", ["No [`binding`](#w11) host exists."]],
    ["a full reference link defined inside the W11 section", ["No [binding][b] host exists.", "", "[b]: #w11"]],
  ])("refuses a stale no-binding-host statement written with %s once a host module names MechanicalWorkflows", (_form, statement) => {
    expect(staleRules(statement)).toEqual(["w11-absence-stale"]);
  });
});

describe("the release blocks a cut adds to a per-bead receipt", () => {
  const prose = "# wb-good: a good bead\n\n## 2026-11-05 first cut\n\nprose only\n";
  const entry = (rows: Rows) => `\n## 2026-11-06 next cut\n\n${blockOf(rows)}\n`;

  it("judges a block appended to a receipt the base already holds (the append-only shape of a later cut)", () => {
    const base = treeWith({ [RECEIPT]: prose });
    const verdict = judgeCut(cutOf(base, treeWith({ ...SLICE_CUT, [RECEIPT]: `${prose}${entry(setRow(GOOD_ROWS, "red result", undefined))}` }, base)));
    expect(verdict.findings.map((finding) => finding.rule)).toEqual(["tdd-leg-missing"]);
    expect(verdict.receipts).toEqual([RECEIPT]);
  });

  it("judges a block inserted before a block the base holds, and does not judge the base block again", () => {
    const old = `# wb-good: a good bead\n\n## 2026-11-05 first cut\n\n${blockOf(setRow(GOOD_ROWS, "red result", undefined))}\n`;
    const base = treeWith({ [RECEIPT]: old });
    const inserted = old.replace("## 2026-11-05 first cut", `## 2026-11-06 inserted cut\n\n${blockOf(GOOD_ROWS)}\n\n## 2026-11-05 first cut`);
    const verdict = judgeCut(cutOf(base, treeWith({ ...SLICE_CUT, [RECEIPT]: inserted }, base)));
    expect(verdict.findings).toEqual([]);
    expect(verdict.receipts).toEqual([RECEIPT]);
  });

  it("judges a block the cut edits in place", () => {
    const base = treeWith({ [RECEIPT]: receiptOf(GOOD_ROWS) });
    const edited = treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(setRow(GOOD_ROWS, "slice status", "live")) }, base);
    expect(cutRules(base, edited)).toEqual(["closing-gate-unnamed"]);
  });

  it("does not judge again a block the base holds when the cut appends prose only", () => {
    const old = receiptOf(setRow(GOOD_ROWS, "red result", undefined));
    const base = treeWith({ [RECEIPT]: old });
    const verdict = judgeCut(cutOf(base, treeWith({ [RECEIPT]: `${old}\n## 2026-11-06 note\n\nprose\n` }, base)));
    expect(verdict.findings).toEqual([]);
    expect(verdict.receipts).toEqual([]);
    expect(verdict.closure.reasons).toEqual([OPEN_REASONS.noReceipt, OPEN_REASONS.noEnvelope]);
  });

  it("judges no block of a receipts path that is not a per-bead receipt", () => {
    const nested = `${RECEIPTS_DIR}mwi/wb-good.md`;
    const base = treeWith({ [nested]: prose });
    const verdict = judgeCut(cutOf(base, treeWith({ [nested]: `${prose}${entry(setRow(GOOD_ROWS, "red result", undefined))}` }, base)));
    expect(verdict.findings).toEqual([]);
    expect(verdict.receipts).toEqual([]);
  });

  it("judges no block of a path outside docs/workbench/receipts/ whose name ends like a per-bead receipt's", () => {
    const outside = "docs/workbench/notes/xxxwb-good.md";
    expect(outside.slice(RECEIPTS_DIR.length)).toBe("wb-good.md");
    const verdict = judgeCut(cutOf(BASE_TREE, treeWith({ [outside]: receiptOf(setRow(GOOD_ROWS, "red result", undefined)) })));
    expect(verdict.findings).toEqual([]);
    expect(verdict.receipts).toEqual([]);
  });

  it("judges a second copy of a block the base holds once, as the one block the cut adds", () => {
    const base = treeWith({ [RECEIPT]: receiptOf(GOOD_ROWS) });
    const twice = treeWith({ ...SLICE_CUT, [RECEIPT]: `${receiptOf(GOOD_ROWS)}${entry(GOOD_ROWS)}` }, base);
    const verdict = judgeCut(cutOf(base, twice));
    expect(verdict.findings).toEqual([]);
    expect(verdict.receipts).toEqual([RECEIPT]);
  });
});

describe("EAT-R087 program cuts leave historical TRACEABILITY and shared receipt indexes unchanged", () => {
  // Acceptance: "Compare immutable path blob and added receipt paths against cut base; TRACEABILITY unchanged and no new shared
  // index; per-real-bead receipts allowed." Adversarial mutant: "Append a global status row to TRACEABILITY."
  const plainReceipt = "# wb-good: a good bead\n\n## 2026-11-06 receipt\n";

  it("pins the immutable path, and the path is the repository's frozen TRACEABILITY", () => {
    expect(TRACEABILITY_PATH).toBe("docs/workbench/TRACEABILITY.md");
    expect(RECEIPTS_DIR).toBe("docs/workbench/receipts/");
    expect(existsSync(join(REPO, TRACEABILITY_PATH))).toBe(true);
  });

  it("allows a per-real-bead receipt beside an unchanged TRACEABILITY", () => {
    expect(cutRules(BASE_TREE, treeWith({ [RECEIPT]: plainReceipt }))).toEqual([]);
  });

  it("refuses a global status row appended to TRACEABILITY (mutant), a rewrite and a deletion", () => {
    const appended = `${BASE_TREE[TRACEABILITY_PATH]}| MWI-PI-7 | partial |\n`;
    expect(cutRules(BASE_TREE, treeWith({ [RECEIPT]: plainReceipt, [TRACEABILITY_PATH]: appended }))).toEqual(["traceability-changed"]);
    expect(cutRules(BASE_TREE, treeWith({ [TRACEABILITY_PATH]: "# rewritten\n" }))).toEqual(["traceability-changed"]);
    expect(cutRules(BASE_TREE, treeWithout(BASE_TREE, TRACEABILITY_PATH))).toEqual(["traceability-changed"]);
  });

  it("refuses a new shared index under the receipts and anywhere under docs/", () => {
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}INDEX.md`]: "- [wb-good](wb-good.md)\n" }))).toEqual(["shared-index-added"]);
    expect(cutRules(BASE_TREE, treeWith({ "docs/workbench/programs/index.md": "- status\n" }))).toEqual(["shared-index-added"]);
    expect(cutRules(BASE_TREE, treeWith({ "docs/index.md": "- status\n" }))).toEqual(["shared-index-added"]);
    expect(cutRules(BASE_TREE, treeWith({ "docs/guides/Index.md": "- status\n" }))).toEqual(["shared-index-added"]);
  });

  it("refuses a receipts entry that is not a per-bead receipt, and a receipt for a fabricated bead", () => {
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}status.md`]: "| slice | status |\n" }))).toEqual(["receipt-not-per-bead"]);
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}mwi/wb-good.md`]: plainReceipt }))).toEqual(["receipt-not-per-bead"]);
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}wb-fabricated.md`]: "# wb-fabricated: x\n\n## 2026-11-06 r\n" }))).toEqual(["receipt-bead-not-real"]);
  });

  it("names the receipt on a finding of a receipt's block, and no receipt on a finding of the cut's paths", () => {
    const [blockFinding] = judgeCut(cutOf(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(setRow(GOOD_ROWS, "red result", undefined)) }))).findings;
    expect([blockFinding.rule, blockFinding.receipt]).toEqual(["tdd-leg-missing", RECEIPT]);
    const [pathFinding] = judgeCut(cutOf(BASE_TREE, treeWith({ [TRACEABILITY_PATH]: "# rewritten\n" }))).findings;
    expect(Object.keys(pathFinding)).toEqual(["requirement", "rule", "detail"]);
  });

  it("judges no added path that holds the receipts directory below another directory as a receipt", () => {
    expect(cutRules(BASE_TREE, treeWith({ [`archive/${RECEIPTS_DIR}status.md`]: "| slice | status |\n" }))).toEqual([]);
  });

  it("refuses to judge a gate envelope without a candidate commit", () => {
    expect(() => judgeCut(cutOf(BASE_TREE, treeWith(SLICE_CUT), { envelope: envelopeOf() }))).toThrow("a gate envelope is judged against a candidate commit");
  });

  it("names a deleted TRACEABILITY deleted and a rewritten one different from the cut base", () => {
    const details = (head: Tree) => judgeCut(cutOf(BASE_TREE, head)).findings.map((finding) => finding.detail);
    expect(details(treeWithout(BASE_TREE, TRACEABILITY_PATH))).toEqual([`${TRACEABILITY_PATH} is deleted: the historical record is frozen`]);
    expect(details(treeWith({ [TRACEABILITY_PATH]: "# rewritten\n" }))).toEqual([`${TRACEABILITY_PATH} differs from the cut base: the historical record is frozen`]);
  });

  it("refuses no index added outside docs/ at the repository root", () => {
    expect(cutRules(BASE_TREE, treeWith({ "src/docs/index.md": "- status\n", "examples/docs/INDEX.md": "- status\n" }))).toEqual([]);
  });
});

describe("pinned field forms of the release block judges (the discovery battery's survivors on cut #2, each now a row)", () => {
  it("reads a label with spaces before its colon as the trimmed label", () => {
    const [block] = parseReleaseBlocks(["```mwi-release", "bead : wb-good", "  slice:PI-7", "```", ""].join("\n"));
    expect([...block.fields.entries()]).toEqual([
      ["bead", "wb-good"],
      ["slice", "PI-7"],
    ]);
  });

  it("names a repeated label field-duplicate and a line without a label line-malformed, each alone", () => {
    const duplicate = receiptBlockFindings(parseReleaseBlocks(receiptOf(GOOD_ROWS).replace("```\n", "bead: wb-good\n```\n"))[0], blockContext);
    expect(duplicate.map((finding) => `${finding.rule}: ${finding.detail}`)).toEqual(["field-duplicate: bead"]);
    const malformed = receiptBlockFindings(parseReleaseBlocks(receiptOf(GOOD_ROWS).replace("```\n", "a line without a label\n```\n"))[0], blockContext);
    expect(malformed.map((finding) => `${finding.rule}: ${finding.detail}`)).toEqual(["line-malformed: a line without a label"]);
  });

  it.each([...TDD_FIELDS])("refuses an empty '%s' leg as not run", (leg) => {
    expect(rulesOf(setRow(GOOD_ROWS, leg, ""))).toEqual(["tdd-leg-not-run"]);
  });

  it("reads a not-run label only at the start of a leg's value", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "red result", "9 failed | 3 passed (12); two suites were not run"))).toEqual([]);
    expect(rulesOf(setRow(GOOD_ROWS, "first failing assertion", "the leg was not run: expected [] to equal [ 'x' ]"))).toEqual([]);
  });

  it.each([
    ["a count of 10", "10 failed | 2 passed (12)", []],
    ["a count of 100", "100 failed | 2 passed (102)", []],
    ["a count with a leading zero", "01 failed | 11 passed (12)", ["red-not-failing"]],
    ["the word failed run into another word", "1 failedover | 11 passed (12)", ["red-not-failing"]],
  ])("reads a red result with %s", (_form, result, rules) => {
    expect(rulesOf(setRow(GOOD_ROWS, "red result", result))).toEqual(rules);
  });

  it.each([
    ["a count of 10", "10 passed (10)", []],
    ["a count with a leading zero", "012 passed (12)", ["rerun-not-green"]],
    ["the word passed run into another word", "12 passedover (12)", ["rerun-not-green"]],
  ])("reads a positive rerun with %s", (_form, passed, rules) => {
    expect(rulesOf(setRow(GOOD_ROWS, "positive rerun", `./node_modules/.bin/vitest run ${SEAM} -> ${passed}`))).toEqual(rules);
  });

  it("reads a mutant count line whose label holds the word mutant after its start as no mutant line", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "surviving mutant count", "0"))).toEqual([]);
  });

  it.each([
    ["one character before a full sha", `x${CANDIDATE}`],
    ["one hex digit after a full sha", `${CANDIDATE}0`],
  ])("refuses a closing gate commit of %s as no full 40-hex commit", (_form, commit) => {
    expect(rulesOf(claimOf("live", setRows(LIVE_GATE, [["gate commit", commit]])))).toEqual(["closing-gate-commit-missing"]);
  });

  it.each([
    ["a leading upper-case letter before a full sha", `A${CANDIDATE}`],
    ["one hex digit after a full sha", `${CANDIDATE}0`],
  ])("refuses to judge a block against a candidate of %s", (_form, candidate) => {
    const [block] = parseReleaseBlocks(receiptOf(GOOD_ROWS));
    expect(() => receiptBlockFindings(block, { ...blockContext, candidate })).toThrow(/full 40-hex/);
    expect(() => gateEnvelopeFindings(envelopeOf(), { candidate, requiredLegs: LEGS })).toThrow(/candidate/);
  });

  it("fails closed without a fileExists reader instead of skipping the real-seam check, even for a block that names no seam", () => {
    const missing = undefined as unknown as (path: string) => boolean;
    for (const rows of [GOOD_ROWS, setRow(GOOD_ROWS, "red command", "not run: the seam needs the installed host")]) {
      const [block] = parseReleaseBlocks(receiptOf(rows));
      expect(() => receiptBlockFindings(block, { ...blockContext, fileExists: missing })).toThrow("receiptBlockFindings needs a fileExists reader for the seam paths");
    }
  });

  it("skips a bead export line that holds only whitespace", () => {
    expect([...readBeadIds('{"id":"wb-a1"}\n   \n\t\n{"id":"wb-a2"}\n')]).toEqual(["wb-a1", "wb-a2"]);
  });

  it.each(["PI2-GRANTS", "PI-V2", "A-1", "PI-DETACHED-GRANTS2"])("accepts the gate name %s (upper-case letters and digits in hyphenated parts)", (name) => {
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["real infrastructure gate", name]])))).toEqual([]);
  });

  it.each(["PI-DETACHED-GRANTSx", "2PI-GRANTS", "PI--GRANTS", "PI-DETACHED_GRANTS", "PI-DETACHED-GRANTS-"])("refuses the malformed gate name %s", (name) => {
    expect(rulesOf(claimOf("partial", setRows(LIVE_GATE, [["real infrastructure gate", name]])))).toEqual(["gate-name-malformed"]);
  });
});

describe("pinned forge.toml readings (the discovery battery's survivors on cut #2, each now a row)", () => {
  it.each([
    ["a gate line with a trailing comment", '[build]\ngate = ["lint", "test"] # the gate of record\n', ["lint", "test"]],
    ["a gate line after a line that only ends in gate =", '[build]\nxgate = ["a"]\ngate = ["lint"]\n', ["lint"]],
    ["an empty leg name in the gate array", '[build]\ngate = ["lint", ""]\n', ["lint"]],
  ])("reads the [build] gate legs of %s", (_form, toml, legs) => {
    expect(requiredGateLegs(toml)).toEqual(legs);
  });

  it("fails closed on a [build] gate line followed by text other than a comment", () => {
    expect(() => requiredGateLegs('[build]\ngate = ["lint"] trailing\n')).toThrow(/\[build\] gate/);
  });

  it("reads [build.commands.<tier>] tables written indented, with upper-case letters, digits or an underscore, and nothing else as a tier", () => {
    const toml = ['[build]', 'gate = ["lint"]', "", "  [build.commands.indented]", "[build.commands.Live2]", "[build.commands.a_b]", "x[build.commands.prefixed]", "[build.commands.suffixed] extra", "[build.commands.]", ""].join("\n");
    expect([...declaredForgeTiers(toml)].sort()).toEqual(["Live2", "a_b", "indented", "lint"]);
  });
});

describe("pinned W11 heading and rendered-view forms (the discovery battery's survivors on cut #2, each now a row)", () => {
  it.each([
    ["a heading beginning W110", "## W110: Another feature"],
    ["a heading beginning W11a", "## W11a: Another feature"],
    ["a heading naming W11 after its first word", "## Notes on W11"],
  ])("reads %s as no W11 heading, so the W11 section is still found", (_form, heading) => {
    const matrix = matrixOf([...TABLE_HEAD, W11_LANDED], { after: [heading, "", "text"] });
    expect(w11Headings(matrix)).toEqual([W11_TITLE]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
  });

  it("reads a heading beginning W11 and a hyphen as a second W11 heading", () => {
    const matrix = matrixOf([...TABLE_HEAD, W11_EVIDENCED], { after: ["## W11-extra: more", "", "text"] });
    expect(w11Headings(matrix)).toEqual([W11_TITLE, "W11-extra: more"]);
    expect(sliceRules(matrix)).toEqual(["w11-heading-not-unique"]);
  });

  it.each([
    ["inline HTML before the text", "<i></i> No binding host exists."],
    ["inline HTML after the text", "No binding host exists. <i></i>"],
  ])("renders a paragraph with %s without the space the HTML leaves", (_form, line) => {
    expect(renderedText(line)).toBe("No binding host exists.");
  });

  it("reads the Status and Feature cells of a W11 table whose first column is Status", () => {
    const matrix = matrixOf(["| Status | Feature |", "| --- | --- |", "| landed-gated | Hosted develop() |"]);
    expect(w11Rows(w11Section(matrix) ?? "")).toEqual([{ feature: "Hosted develop()", status: "landed-gated" }]);
    expect(sliceRules(matrix)).toEqual(["w11-landed-gated-unwitnessed"]);
  });

  it("reads a W11 status cell that begins with inline HTML as its status", () => {
    const matrix = matrixOf([...TABLE_HEAD, "| Hosted develop() | <i></i> landed-gated | e | c |"]);
    expect(w11Statuses(w11Section(matrix) ?? "")).toEqual(["landed-gated"]);
  });

  it.each([
    ["an upper-case hexadecimal reference", "&#X41;", "A"],
    ["an upper-case hexadecimal digit", "&#x4A;", "J"],
    ["a decimal reference of seven digits", "&#0000065;", "A"],
  ])("decodes %s", (_form, reference, character) => {
    expect(renderedText(`x${reference}y\n`)).toBe(`x${character}y`);
  });

  it.each(["&#00000065;", "&#x0000041;"])("keeps %s, a reference with more digits than its form allows, as written", (reference) => {
    expect(renderedText(`x${reference}y\n`)).toBe(`x${reference}y`);
  });

  it("decodes the smallest decimal reference above 0, and keeps &#0; as written", () => {
    expect(renderedText("x&#1;y &#0;\n")).toBe(`x${String.fromCodePoint(1)}y &#0;`);
  });

  it("finds a section whose heading is the first token of the markdown", () => {
    expect(markdownSection("## Part\n\ntext\n\n## Next\n", "Part")).toBe("## Part\n\ntext\n\n");
  });

  it.each([
    ["a fenced code block", ["```", "No binding host exists.", "```"]],
    ["an indented code block", ["    No binding host exists."]],
    ["an ATX heading", ["### No binding host exists."]],
    ["a setext heading", ["No binding host exists.", "---"]],
  ])("renders %s as one line of its text", (_form, lines) => {
    expect(renderedText(lines.join("\n"))).toBe("No binding host exists.");
  });
});

function git(cwd: string, ...args: string[]): string {
  const result = spawnSync("git", ["-c", "user.name=mwi-release", "-c", "user.email=mwi-release@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", ...args], { cwd, encoding: "utf8" });
  expect(result.status, `git ${args.join(" ")}: ${result.stderr}`).toBe(0);
  return result.stdout.trim();
}
function writeTree(root: string, files: Readonly<Record<string, string>>): void {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}
interface CliVerdict {
  readonly contract: string;
  readonly base: string;
  readonly head: string;
  readonly candidate: string | null;
  readonly receipts: readonly string[];
  readonly findings: readonly Finding[];
  readonly closure: { readonly state: string; readonly reasons: readonly string[] };
}
function cli(cwd: string, ...args: string[]): { readonly status: number | null; readonly verdict?: CliVerdict; readonly stderr: string } {
  const result = spawnSync(process.execPath, [SCRIPT, ...args], { cwd, encoding: "utf8" });
  return { status: result.status, verdict: result.status === 2 ? undefined : (JSON.parse(result.stdout) as CliVerdict), stderr: result.stderr };
}
const NAMES_MECHANICAL = "// the MechanicalWorkflows function host\n";

describe("the CLI judges a real Git cut (scratch repository)", () => {
  const roots: string[] = [];
  afterEach(() => removeScratch(...roots.splice(0)));
  function repoAtBase(extra: Tree = {}): { readonly repo: string; readonly base: string } {
    const repo = makeScratch("mwi-release-repo-");
    roots.push(repo);
    git(repo, "init", "-q", "-b", "main");
    writeTree(repo, { ...BASE_TREE, ".beads/issues.jsonl": '{"id":"wb-good"}\n{"id":"wb-other"}\n', ...extra });
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "base");
    return { repo, base: git(repo, "rev-parse", "HEAD") };
  }
  function commitAll(repo: string): string {
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "cut");
    return git(repo, "rev-parse", "HEAD");
  }
  function envelopeFile(gatedCommit: string): string {
    const outside = makeScratch("mwi-release-envelope-");
    roots.push(outside);
    const path = join(outside, "envelope.json");
    writeFileSync(path, JSON.stringify(envelopeOf((envelope) => Object.assign(envelope.data, { gated_commit: gatedCommit }))));
    return path;
  }

  it("judges an uncommitted slice cut in the working tree: exit 0, no finding, closure open without an envelope", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const run = cli(repo, "--base", base);
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.contract).toBe(CONTRACT);
    expect(run.verdict?.base).toBe(base);
    expect(run.verdict?.head).toBe("working-tree");
    expect(run.verdict?.receipts).toEqual([RECEIPT]);
    expect(run.verdict?.findings).toEqual([]);
    expect(run.verdict?.closure).toEqual({ state: "open", reasons: [OPEN_REASONS.noEnvelope] });
  });

  it("judges the same cut from a subdirectory of the work tree", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const root = cli(repo, "--base", base);
    const nested = cli(join(repo, "docs", "workbench"), "--base", base);
    expect(nested.status, nested.stderr).toBe(0);
    expect(nested.verdict).toEqual(root.verdict);
  });

  it("exits 1 on a global status row appended to TRACEABILITY in the working tree (mutant)", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { ...SLICE_CUT, [TRACEABILITY_PATH]: `${BASE_TREE[TRACEABILITY_PATH]}| MWI-PI-7 | partial |\n` });
    const run = cli(repo, "--base", base);
    expect(run.status, run.stderr).toBe(1);
    expect(run.verdict?.findings.map((finding) => finding.rule)).toEqual(["traceability-changed"]);
  });

  it("exits 1 when the working tree adds a host module naming MechanicalWorkflows under a no-binding-host W11 row", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { [HOST_MODULE]: NAMES_MECHANICAL });
    const run = cli(repo, "--base", base);
    expect(run.status, run.stderr).toBe(1);
    expect(run.verdict?.findings.map((finding) => finding.rule)).toEqual(["w11-absence-stale"]);
  });

  it("exits 1 when a commit adds a host module naming MechanicalWorkflows under a no-binding-host W11 row, judged at that head and in the working tree", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { [HOST_MODULE]: NAMES_MECHANICAL });
    const head = commitAll(repo);
    const run = cli(repo, "--base", base, "--head", head);
    expect(run.status, run.stderr).toBe(1);
    expect(run.verdict?.findings.map((finding) => finding.rule)).toEqual(["w11-absence-stale"]);
    const tracked = cli(repo, "--base", base);
    expect(tracked.status, tracked.stderr).toBe(1);
    expect(tracked.verdict?.findings.map((finding) => finding.rule)).toEqual(["w11-absence-stale"]);
  });

  it("finds a host module at any depth under src/workbench/hosts/ and in any case of the word mechanical, in the working tree and at a committed head", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { [`${HOSTS_DIR}mechanical/develop.ts`]: 'import { develop } from "@mechanical/workflows-development";\n' });
    const working = cli(repo, "--base", base);
    expect(working.status, working.stderr).toBe(1);
    expect(working.verdict?.findings.map((finding) => finding.detail)).toEqual([`W11 states that no binding host exists while ${HOSTS_DIR}mechanical/develop.ts names MechanicalWorkflows`]);
    const head = commitAll(repo);
    const committed = cli(repo, "--base", base, "--head", head);
    expect(committed.status, committed.stderr).toBe(1);
    expect(committed.verdict?.findings.map((finding) => finding.rule)).toEqual(["w11-absence-stale"]);
  });

  it("reads no ignored file: no host module under src/workbench/hosts/ and no added path of the cut", () => {
    const { repo, base } = repoAtBase({ ".gitignore": "*.log\nscratch/\n" });
    writeTree(repo, { [`${HOSTS_DIR}debug.log`]: NAMES_MECHANICAL, "docs/scratch/index.md": "- a local note\n" });
    const run = cli(repo, "--base", base);
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.findings).toEqual([]);
  });

  it("refuses a forge run tier its forge.toml does not declare, and accepts one it declares", () => {
    const { repo, base } = repoAtBase();
    const tierRows = (tier: string) => setRows(GOOD_ROWS, [["red command", `forge run ${tier}`], ["positive rerun", `forge run ${tier} -> 2 passed (2)`]]);
    writeTree(repo, { ...SLICE_CUT, [RECEIPT]: receiptOf(tierRows(LIVE_TIER)) });
    const declared = cli(repo, "--base", base);
    expect(declared.status, declared.stderr).toBe(0);
    writeTree(repo, { [RECEIPT]: receiptOf(tierRows("no-such-tier")) });
    const undeclared = cli(repo, "--base", base);
    expect(undeclared.status, undeclared.stderr).toBe(1);
    expect(undeclared.verdict?.findings.map((finding) => finding.rule)).toEqual(["seam-missing"]);
  });

  it("closes a committed cut only on a passing gate envelope keyed to that commit", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const envelopePath = envelopeFile(head);
    const closed = cli(repo, "--base", base, "--head", head, "--commit", head, "--gate-envelope", envelopePath);
    expect(closed.status, closed.stderr).toBe(0);
    expect(closed.verdict?.head).toBe(head);
    expect(closed.verdict?.candidate).toBe(head);
    expect(closed.verdict?.closure).toEqual({ state: "closable", reasons: [] });
    writeFileSync(envelopePath, JSON.stringify(envelopeOf((envelope) => Object.assign(envelope.data, { gated_commit: base }))));
    const stale = cli(repo, "--base", base, "--head", head, "--commit", head, "--gate-envelope", envelopePath);
    expect(stale.status, stale.stderr).toBe(1);
    expect(stale.verdict?.findings.map((finding) => finding.rule)).toEqual(["gate-other-commit"]);
    expect(stale.verdict?.closure.state).toBe("open");
  });

  it("refuses a candidate commit that is not the cut's head commit (exit 2): another commit, or no --head", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const other = cli(repo, "--base", base, "--head", head, "--commit", base, "--gate-envelope", envelopeFile(base));
    expect(other.status).toBe(2);
    expect(other.stderr).toMatch(/is not the cut's head commit/);
    const headless = cli(repo, "--base", base, "--commit", head, "--gate-envelope", envelopeFile(head));
    expect(headless.status).toBe(2);
    expect(headless.stderr).toMatch(/is not the cut's head commit/);
  });

  it("exits 2 on a usage error or an unreadable input", () => {
    const { repo, base } = repoAtBase();
    expect(cli(repo).status).toBe(2);
    expect(cli(repo, "--base", "no-such-revision").status).toBe(2);
    const noCommit = cli(repo, "--base", base, "--gate-envelope", join(repo, "missing.json"));
    expect(noCommit.status).toBe(2);
    expect(noCommit.stderr).toMatch(/--gate-envelope needs --commit/);
    const unreadable = cli(repo, "--base", base, "--head", base, "--commit", base, "--gate-envelope", join(repo, "missing.json"));
    expect(unreadable.status).toBe(2);
    expect(unreadable.stderr).toMatch(/unreadable gate envelope/);
    expect(cli(repo, "--base", base, "--unknown-flag").status).toBe(2);
    const valueless = cli(repo, "--base");
    expect(valueless.status).toBe(2);
    expect(valueless.stderr).toMatch(/--base needs a value/);
    const flagValue = cli(repo, "--base", "--head", base);
    expect(flagValue.status).toBe(2);
    expect(flagValue.stderr).toMatch(/--base needs a value/);
  });

  it("exits 2 outside a Git work tree, with git's message on the first stderr line and the usage on the second", () => {
    const outside = nonRepoScratch("mwi-release-outside-");
    try {
      const run = cli(outside.dir, "--base", "HEAD");
      expect(run.status).toBe(2);
      const lines = run.stderr.split("\n");
      expect(lines[0]).toMatch(/^mwi-release: not inside a Git work tree: \S/);
      expect(lines.slice(1)).toEqual(["usage: node qa/workbench/mwi-release.mjs --base <rev> [--head <rev>] [--commit <rev>] [--gate-envelope <path>]", ""]);
    } finally {
      outside.dispose();
    }
  });

  it("exits 2 without a bead export, and on an envelope judged against a forge.toml that declares no [build] gate", () => {
    const { repo, base } = repoAtBase();
    rmSync(join(repo, ".beads", "issues.jsonl"));
    const noExport = cli(repo, "--base", base);
    expect(noExport.status).toBe(2);
    expect(noExport.stderr).toMatch(/no bead export at \.beads\/issues\.jsonl/);
    git(repo, "checkout", "--", ".beads/issues.jsonl");
    writeTree(repo, { "forge.toml": "[package]\nname = \"x\"\n" });
    const head = commitAll(repo);
    const noGate = cli(repo, "--base", base, "--head", head, "--commit", head, "--gate-envelope", envelopeFile(head));
    expect(noGate.status).toBe(2);
    expect(noGate.stderr).toMatch(/declares no \[build\] gate legs/);
  });

  it.each([
    ["--base", (base: string) => ["--base", base, "--base", base]],
    ["--head", (base: string) => ["--base", base, "--head", base, "--head", base]],
    ["--commit", (base: string) => ["--base", base, "--head", base, "--commit", base, "--commit", base]],
    ["--gate-envelope", (base: string) => ["--base", base, "--head", base, "--commit", base, "--gate-envelope", "e.json", "--gate-envelope", "e.json"]],
  ])("exits 2 when %s is given twice", (flag, argv) => {
    const { repo, base } = repoAtBase();
    const run = cli(repo, ...argv(base));
    expect(run.status).toBe(2);
    expect(run.stderr).toContain(`${flag} given twice`);
  });

  // Refusal #2 U3 (members GP9, GP10; the R-B641 set in the enumerate form): the pinned revision spellings of --base, --head and
  // --commit are a full sha, a 12-hex abbreviation and HEAD (HEAD~1 for --base); each is resolved by git before it is compared or
  // printed. Other spellings are NOT CLAIMED.
  it.each([
    ["HEAD", (head: string) => ["--head", head, "--commit", "HEAD"]],
    ["a 12-hex abbreviation", (head: string) => ["--head", head, "--commit", head.slice(0, 12)]],
  ])("resolves --commit written as %s to the cut's head commit and closes the cut on its gate envelope", (_spelling, argv) => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const run = cli(repo, "--base", base, ...argv(head), "--gate-envelope", envelopeFile(head));
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.candidate).toBe(head);
    expect(run.verdict?.closure).toEqual({ state: "closable", reasons: [] });
  });

  it.each([
    ["HEAD", (head: string) => ["--head", "HEAD", "--commit", head]],
    ["a 12-hex abbreviation", (head: string) => ["--head", head.slice(0, 12), "--commit", "HEAD"]],
  ])("resolves --head written as %s to the commit it names, and closes the cut on its gate envelope", (_spelling, argv) => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const run = cli(repo, "--base", base, ...argv(head), "--gate-envelope", envelopeFile(head));
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.head).toBe(head);
    expect(run.verdict?.candidate).toBe(head);
    expect(run.verdict?.closure).toEqual({ state: "closable", reasons: [] });
  });

  it("prints the resolved commits of --base HEAD~1 and --head HEAD, never the spellings", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const run = cli(repo, "--base", "HEAD~1", "--head", "HEAD");
    expect(run.status, run.stderr).toBe(0);
    expect([run.verdict?.base, run.verdict?.head, run.verdict?.candidate]).toEqual([base, head, null]);
    expect(run.verdict?.receipts).toEqual([RECEIPT]);
  });

  it.each(["--head", "--commit"])("exits 2 on an unknown revision given to %s", (flag) => {
    const { repo, base } = repoAtBase();
    const argv = flag === "--head" ? ["--head", "no-such-revision"] : ["--head", base, "--commit", "no-such-revision"];
    const run = cli(repo, "--base", base, ...argv);
    expect(run.status).toBe(2);
    expect(run.stderr).toContain("unknown revision no-such-revision");
  });

  // The discovery battery's CLI survivors on cut #2 (each now a row): the candidate error's wording, the change letters of a real
  // Git cut (an added shared index, a receipt the base holds that the cut appends to), untracked files beside a committed head,
  // an unknown flag given a value, and the missing --base message.
  it("names the --head it compared, or that no --head names one, when --commit is not the cut's head commit", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const other = cli(repo, "--base", base, "--head", head, "--commit", base, "--gate-envelope", envelopeFile(base));
    expect(other.stderr.split("\n")[0]).toBe(`mwi-release: --commit ${base} is not the cut's head commit (--head ${head}): the candidate is the head of the cut`);
    const headless = cli(repo, "--base", base, "--commit", head, "--gate-envelope", envelopeFile(head));
    expect(headless.stderr.split("\n")[0]).toBe(`mwi-release: --commit ${head} is not the cut's head commit (no --head names one): the candidate is the head of the cut`);
  });

  it("refuses a shared index the cut adds, committed or in the working tree", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { [`${RECEIPTS_DIR}INDEX.md`]: "- [wb-good](wb-good.md)\n" });
    const working = cli(repo, "--base", base);
    expect(working.status, working.stderr).toBe(1);
    expect(working.verdict?.findings.map((finding) => finding.rule)).toEqual(["shared-index-added"]);
    const head = commitAll(repo);
    const committed = cli(repo, "--base", base, "--head", head);
    expect(committed.status, committed.stderr).toBe(1);
    expect(committed.verdict?.findings.map((finding) => finding.rule)).toEqual(["shared-index-added"]);
  });

  it("judges only the block a cut appends to a receipt the base holds, and refuses a bad appended block", () => {
    const old = receiptOf(setRow(GOOD_ROWS, "red result", undefined));
    const { repo, base } = repoAtBase({ [RECEIPT]: old });
    writeTree(repo, { ...SLICE_CUT, [RECEIPT]: `${old}\n## 2026-11-07 next cut\n\n${blockOf(GOOD_ROWS)}\n` });
    const good = commitAll(repo);
    const run = cli(repo, "--base", base, "--head", good);
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.receipts).toEqual([RECEIPT]);
    expect(run.verdict?.findings).toEqual([]);
    writeTree(repo, { [RECEIPT]: `${old}\n## 2026-11-07 next cut\n\n${blockOf(setRow(GOOD_ROWS, "positive rerun", undefined))}\n` });
    const bad = commitAll(repo);
    const refused = cli(repo, "--base", base, "--head", bad);
    expect(refused.status, refused.stderr).toBe(1);
    expect(refused.verdict?.findings.map((finding) => finding.rule)).toEqual(["tdd-leg-missing"]);
  });

  it("judges a committed head without the untracked files of the working tree", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    writeTree(repo, { [`${RECEIPTS_DIR}INDEX.md`]: "- [wb-good](wb-good.md)\n" });
    const run = cli(repo, "--base", base, "--head", head);
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.findings).toEqual([]);
  });

  it("reads a flag value that holds two hyphens after its start as the value", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    const head = commitAll(repo);
    const outside = makeScratch("mwi-release-envelope-");
    roots.push(outside);
    const path = join(outside, "gate--envelope.json");
    writeFileSync(path, JSON.stringify(envelopeOf((envelope) => Object.assign(envelope.data, { gated_commit: head }))));
    const run = cli(repo, "--base", base, "--head", head, "--commit", head, "--gate-envelope", path);
    expect(run.status, run.stderr).toBe(0);
    expect(run.verdict?.closure).toEqual({ state: "closable", reasons: [] });
  });

  it("exits 2 on an unknown flag given a value, and names a missing --base", () => {
    const { repo, base } = repoAtBase();
    const unknown = cli(repo, "--base", base, "--unknown", "x");
    expect(unknown.status).toBe(2);
    expect(unknown.stderr.split("\n")[0]).toBe("mwi-release: unknown argument --unknown");
    const noBase = cli(repo, "--head", base);
    expect(noBase.status).toBe(2);
    expect(noBase.stderr.split("\n")[0]).toBe("mwi-release: --base is required");
  });

  it("finds a host module whose text holds the letters mechanical inside another word, in any case (biomechanical, MECHANICALLY)", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { [`${HOSTS_DIR}motion.ts`]: "// a biomechanical model\n", [`${HOSTS_DIR}deep/x.ts`]: "// MECHANICALLY generated\n" });
    const run = cli(repo, "--base", base);
    expect(run.status, run.stderr).toBe(1);
    expect(run.verdict?.findings.map((finding) => finding.detail)).toEqual([`W11 states that no binding host exists while ${HOSTS_DIR}deep/x.ts, ${HOSTS_DIR}motion.ts names MechanicalWorkflows`]);
  });
});

const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const CYRILLIC_O = String.fromCodePoint(0x043e);
interface Residual {
  readonly id: string;
  readonly family: string;
  /** The quiet rows: inputs of the family and the exact reading the validator gives each, without the rule the family escapes. */
  readonly quiet: ReadonlyArray<readonly [string, () => string[], readonly string[]]>;
  /** The live twin: the nearest pinned input, which the validator refuses with that rule. */
  readonly twin: readonly [string, () => string[]];
  readonly rule: string;
}
/** A slice-cut red command `command` rerun as the same command, judged under the control context. */
function tierRules(command: string): string[] {
  return rulesOf(setRows(GOOD_ROWS, [["red command", command], ["positive rerun", `${command} -> 2 passed (2)`]]));
}
/**
 * The named RESIDUALS of the validator (the enumerate form of rule 19(c)): escape families inside the claimed subject that the
 * validator is quiet on, each with pinned quiet rows and a live twin. The module header's RESIDUALS section names the same ids in
 * the same order (the last row below reads it).
 */
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-ABSENCE-OTHER-WORDS",
    family: "a W11 absence statement not written with the absence words in one rendered line",
    rule: "w11-absence-stale",
    quiet: [
      ["a paraphrase", () => staleRules(["There is no host that binds MechanicalWorkflows."]), []],
      ["the words split across two table cells", () => staleRules([...TABLE_HEAD, "| Hosted develop() | planned | No binding | host exists. |"]), []],
      ["the words split across two paragraphs", () => staleRules(["No binding", "", "host exists."]), []],
      ["a zero-width space inside a word", () => staleRules([`No bind${ZERO_WIDTH_SPACE}ing host exists.`]), []],
      ["a Cyrillic letter in place of a Latin one", () => staleRules([`N${CYRILLIC_O} binding host exists.`]), []],
    ],
    twin: ["the absence words in one line", () => staleRules(["No binding host exists."])],
  },
  {
    id: "R-REFDEF-OUTSIDE",
    family: "a reference link in the W11 section whose definition lies outside the section (the section is lexed alone)",
    rule: "w11-absence-stale",
    quiet: [["its definition after the W12 section", () => {
      const matrix = matrixOf([...TABLE_HEAD, "| Hosted develop() | planned | e | c |", "", "No [binding][b] host exists."], { after: ["[b]: #w11"] });
      const base = treeWith({ [FEATURE_MATRIX_PATH]: matrix });
      return cutRules(base, treeWith({ [HOST_MODULE]: "// the MechanicalWorkflows function host\n" }, base));
    }, []]],
    twin: ["its definition inside the W11 section", () => staleRules(["No [binding][b] host exists.", "", "[b]: #w11"])],
  },
  {
    id: "R-TIER-TRUNCATED",
    family: "a forge run tier spelled with a character other than a lower-case ASCII letter, a digit or a hyphen, read only up to that character",
    rule: "seam-missing",
    quiet: [
      ["an underscore after a declared tier", () => tierRules("forge run test_extra"), []],
      ["an upper-case letter after a declared tier", () => tierRules("forge run testX"), []],
      ["a dot after a declared tier", () => tierRules("forge run test.extra"), []],
    ],
    twin: ["a hyphen after a declared tier", () => tierRules("forge run test-extra")],
  },
];

describe("the named residuals (rule 19(c), the enumerate form): each family's quiet rows and its live twin", () => {
  it.each(RESIDUALS.flatMap((residual) => residual.quiet.map(([form, read, reading]) => [residual.id, form, residual.rule, read, reading] as const)))("residual %s quiet row (%s): read without %s, as its pinned reading", (_id, _form, rule, read, reading) => {
    expect(reading).not.toContain(rule);
    expect(read()).toEqual(reading);
  });

  it.each(RESIDUALS.map((residual) => [residual.id, residual.twin[0], residual.rule, residual.twin[1]] as const))("residual %s live twin (%s): refused with %s", (_id, _form, rule, read) => {
    expect(read()).toEqual([rule]);
  });

  it("the module header names exactly these residuals, in order, each with its family", () => {
    const header = readFileSync(SCRIPT, "utf8").split("*/")[0];
    const section = header.slice(header.indexOf(" * RESIDUALS"));
    expect(header.indexOf(" * RESIDUALS")).toBeGreaterThan(0);
    expect([...section.matchAll(/\bR-[A-Z0-9]+(?:-[A-Z0-9]+)+\b/g)].map((match) => match[0])).toEqual(RESIDUALS.map((residual) => residual.id));
    const flat = section.replace(/\s*\n \*\s*/g, " ");
    for (const residual of RESIDUALS) expect(flat, residual.id).toContain(`${residual.id}: ${residual.family}`);
  });
});

/** Every file under `dir` of the repository's working tree, recursively, as a repository-relative path. */
function filesUnder(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(join(REPO, dir), { withFileTypes: true })) {
    const path = `${dir}${entry.name}`;
    if (entry.isDirectory()) files.push(...filesUnder(`${path}/`));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}
/** The real tree's host modules: the files under src/workbench/hosts/, at any depth, whose text holds the word mechanical. */
function realHostModules(): string[] {
  return filesUnder(HOSTS_DIR).filter((path) => /mechanical/i.test(readFileSync(join(REPO, path), "utf8")));
}
function realMatrix(): string {
  return readFileSync(join(REPO, FEATURE_MATRIX_PATH), "utf8");
}
function realW11(): { readonly raw: string; readonly text: string } {
  const raw = w11Section(realMatrix()) ?? "";
  return { raw, text: renderedText(raw) };
}

describe("the real tree", () => {
  it("every release receipt under docs/workbench/receipts/ passes the receipt judges, wb-j5y5's own among them", () => {
    const beadIds = readBeadIds(readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8"));
    const forgeTiers = declaredForgeTiers(readFileSync(join(REPO, "forge.toml"), "utf8"));
    const judged: string[] = [];
    for (const name of readdirSync(join(REPO, RECEIPTS_DIR)).sort()) {
      const blocks = parseReleaseBlocks(readFileSync(join(REPO, RECEIPTS_DIR, name), "utf8"));
      if (blocks.length === 0) continue;
      judged.push(name);
      for (const block of blocks) {
        const findings = receiptBlockFindings(block, { receiptBead: name.replace(/\.md$/, ""), beadIds, fileExists: (path: string) => existsSync(join(REPO, path)), forgeTiers });
        expect(findings, name).toEqual([]);
      }
    }
    expect(judged).toContain("wb-j5y5.md");
  });

  it("wb-j5y5's receipt lands slice PI-7 explicitly partial with all six requirements tied to red mutants", () => {
    const blocks = parseReleaseBlocks(readFileSync(join(REPO, RECEIPTS_DIR, "wb-j5y5.md"), "utf8"));
    // One release block per cut entry: cut #1 (9c3cd835), cut #2 (the respin of refusal #1) and cut #3 (the respin of refusal #2).
    expect(blocks).toHaveLength(3);
    for (const { fields } of blocks) {
      expect([fields.get("bead"), fields.get("slice"), fields.get("slice status"), fields.get("real infrastructure gate")]).toEqual(["wb-j5y5", "PI-7", "partial", "none"]);
      expect(fields.get("requirements")).toBe("EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087");
      expect([...fields.keys()].filter((label) => label.startsWith("mutant "))).toEqual(["mutant EAT-R082", "mutant EAT-R083", "mutant EAT-R084", "mutant EAT-R085", "mutant EAT-R086", "mutant EAT-R087"]);
    }
  });

  it("forge.toml declares the seven [build] gate legs and its [build.commands.<tier>] tables as forge run tiers", () => {
    const toml = readFileSync(join(REPO, "forge.toml"), "utf8");
    const tiers = declaredForgeTiers(toml);
    for (const leg of LEGS) expect(tiers.has(leg), leg).toBe(true);
    const tables = toml.split("\n").flatMap((line) => /^\[build\.commands\.([a-z0-9-]+)\]$/.exec(line)?.slice(1) ?? []);
    expect(tables).toContain(LIVE_TIER);
    expect([...tiers].sort()).toEqual([...new Set([...LEGS, ...tables])].sort());
    expect([...declaredForgeTiers('[build]\ngate = ["lint"]\n\n[build.commands.x]\n[build.commands.y] # a comment\n[build.server]\ngate = ["z"]\n')].sort()).toEqual(["lint", "x", "y"]);
  });

  it("the feature matrix holds exactly one W11 heading, and its W11 section holds no raw HTML", () => {
    expect(w11Headings(realMatrix())).toEqual([W11_TITLE]);
    expect(realW11().raw.startsWith(W11_HEADING)).toBe(true);
    expect(w11Html(realW11().raw)).toEqual([]);
  });

  it("the matrix's status legend lists exactly the status vocabulary the W11 rules read", () => {
    const legend = renderedText(markdownSection(realMatrix(), "Status legend") ?? "").split("\n");
    expect(legend.flatMap((line) => /^([a-z-]+): /.exec(line)?.slice(1) ?? [])).toEqual([...MATRIX_STATUSES]);
  });

  it("the W11 row no longer carries the retired detection sentence (the stale no-Mechanical-code assertion)", () => {
    const { raw, text } = realW11();
    expect(raw.startsWith(W11_HEADING)).toBe(true);
    for (const view of [raw, text]) {
      expect(view).not.toContain("grep -ril mechanical over src/ and test/");
      expect(view).not.toContain("matches only an incidental word");
      expect(view).not.toContain("no src/workbench module, no test file");
    }
  });

  it("the W11 row claims no shipped invocation: its no-binding-host statement holds of src/workbench/hosts/ and it is not landed-gated", () => {
    const { raw, text } = realW11();
    const hostModules = realHostModules();
    expect(w11Findings({ baseSection: raw, headSection: raw, hostModules, witnessed: false })).toEqual([]);
    expect(/\bno binding[- ]host\b/i.test(text)).toBe(hostModules.length === 0);
    expect(w11Statuses(raw).length).toBeGreaterThan(0);
    expect(w11Statuses(raw).includes("landed-gated") && hostModules.length === 0).toBe(false);
  });

  it("the W11 row names the release validator that governs the program's slice claims", () => {
    const { raw, text } = realW11();
    for (const view of [raw, text]) {
      expect(view).toContain("qa/workbench/mwi-release.mjs");
      expect(view).toContain("wb-j5y5");
    }
  });

  it("the Not claimed W11 line is dated, points at the W11 row, and its no-binding-host statement holds of src/workbench/hosts/", () => {
    const lines = renderedText(markdownSection(realMatrix(), "Not claimed") ?? "").split("\n");
    const w11Lines = lines.filter((line) => line.startsWith("W11:"));
    expect(w11Lines).toHaveLength(1);
    const [line] = w11Lines;
    expect(line).toContain("re-measured 2026-11-06");
    expect(line).toContain("see the W11 row");
    expect(/\bno binding[- ]host\b/i.test(line)).toBe(realHostModules().length === 0);
  });
});
