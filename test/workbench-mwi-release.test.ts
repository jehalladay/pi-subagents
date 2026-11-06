/**
 * wb-j5y5 [MWI-release] (slice PI-7): red-first acceptance for qa/workbench/mwi-release.mjs, the release validator of the
 * mechanical-workflows-interop-2026-11-04 program. One describe block per requirement, EAT-R082..EAT-R087 of
 * docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md at rig master
 * 0b25e14e084a5b1d612e780bc12a927b3a80dd62 (a master-only archive). Each block quotes the acceptance line it pins and feeds the
 * requirement's own adversarial mutant to the judge as an input the judge must refuse. The last two blocks run the CLI end to
 * end over a scratch Git repository and judge the real tree: the release receipts it holds and the W11 row of
 * docs/workbench/feature-matrix.md.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  BLOCK_INFO,
  CLOSING_STATUSES,
  CONTRACT,
  FEATURE_MATRIX_PATH,
  GATE_RESULTS,
  GATE_TIERS,
  gateEnvelopeFindings,
  HANDOFF_FIELDS,
  HOSTS_DIR,
  judgeCut,
  OPEN_REASONS,
  PROGRAM,
  PROGRAM_DOCS_DIR,
  parseReleaseBlocks,
  RECEIPT_ITEMS,
  RECEIPTS_DIR,
  readBeadIds,
  receiptBlockFindings,
  requiredGateLegs,
  SKILL_PATH,
  SLICE_STATUSES,
  SLICES,
  TDD_FIELDS,
  TRACEABILITY_PATH,
  W11_HEADING,
  w11Findings,
  w11Section,
  w11Statuses,
} from "../qa/workbench/mwi-release.mjs";
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
const COMMAND_ID = "cmd_0a1b2c3d4e5f";
const LEGS: readonly string[] = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"];
const BEADS: ReadonlySet<string> = new Set(["wb-good", "wb-other"]);
const RECEIPT = `${RECEIPTS_DIR}wb-good.md`;
const README = `${PROGRAM_DOCS_DIR}README.md`;

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

function blockOf(rows: Rows): string {
  return [`\`\`\`${BLOCK_INFO}`, ...rows.map(([label, value]) => `${label}: ${value}`), "```"].join("\n");
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
function findingsOf(rows: Rows, extra: { readonly candidate?: string; readonly receiptBead?: string } = {}): Finding[] {
  const blocks = parseReleaseBlocks(receiptOf(rows));
  expect(blocks, "the receipt holds exactly one release block").toHaveLength(1);
  return [...receiptBlockFindings(blocks[0], { receiptBead: "wb-good", beadIds: BEADS, fileExists: (path: string) => path === SEAM, ...extra })];
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

  it("accepts the control receipt", () => {
    expect(rulesOf(GOOD_ROWS)).toEqual([]);
  });

  it("refuses a malformed line and a repeated label instead of dropping either", () => {
    const text = receiptOf(GOOD_ROWS).replace("```\n", "a line without a label\nbead: wb-good\n```\n");
    const blocks = parseReleaseBlocks(text);
    const rules = receiptBlockFindings(blocks[0], { receiptBead: "wb-good", beadIds: BEADS, fileExists: (path: string) => path === SEAM })
      .map((finding) => finding.rule)
      .sort();
    expect(rules).toEqual(["field-duplicate", "line-malformed"]);
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
    expect(() => receiptBlockFindings(blocks[0], { receiptBead: "wb-good", beadIds: missing, fileExists: () => true })).toThrow(/bead export/);
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

  it("refuses a baseline without a full commit sha", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "baseline sha / source paths", "814dcdd; qa/workbench/example.mjs"))).toEqual(["baseline-sha-missing"]);
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

  it("requires one red mutant per listed requirement, each tied to a listed requirement", () => {
    expect(rulesOf(setRow(GOOD_ROWS, "mutant EAT-R083", undefined))).toEqual(["mutant-missing"]);
    expect(rulesOf(setRow(GOOD_ROWS, "mutant EAT-R083", "accept anything -> 12 passed (12)"))).toEqual(["mutant-not-red"]);
    expect(rulesOf(setRow(GOOD_ROWS, "mutant EAT-R099", "x -> 1 failed | 11 passed (12)"))).toEqual(["mutant-untied"]);
    expect(rulesOf(setRow(GOOD_ROWS, "requirements", "none"))).toEqual(["mutant-untied", "mutant-untied", "requirements-missing"]);
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

describe("EAT-R084 each code cut carries the machine-accepted Forge gate receipt", () => {
  // Acceptance: "Read machine receipt keyed to exact candidate commit with required Forge build legs; failed/not-run gate or
  // receipt for another commit refuses close. No CI substitution." Adversarial mutant: "Accept exit echo or an old commit gate
  // as this cut PASS."
  it("reads the required legs from forge.toml's [build] gate, the gate of record", () => {
    expect(requiredGateLegs(readFileSync(join(REPO, "forge.toml"), "utf8"))).toEqual([...LEGS]);
    expect(requiredGateLegs('[package]\ngate = ["x"]\n\n[build]\nbackend = "typescript"\ngate = ["lint", "test"]\n')).toEqual(["lint", "test"]);
    expect(() => requiredGateLegs('[package]\ngate = ["lint"]\n')).toThrow(/\[build\] gate/);
    expect(() => requiredGateLegs("[build]\ngate = []\n")).toThrow(/\[build\] gate/);
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

  it("refuses a narrowed gate and a gate without a command id", () => {
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data.invocation, { only: ["lint"] })))).toEqual(["gate-narrowed"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope.data.invocation, { skip: ["test"] })))).toEqual(["gate-narrowed"]);
    expect(gateRules(envelopeOf((envelope) => Object.assign(envelope, { ids: {} })))).toEqual(["gate-no-command-id"]);
  });

  it("refuses to judge without a full candidate sha or without required legs", () => {
    expect(() => gateEnvelopeFindings(envelopeOf(), { candidate: "abab", requiredLegs: LEGS })).toThrow(/candidate/);
    expect(() => gateEnvelopeFindings(envelopeOf(), { candidate: CANDIDATE, requiredLegs: [] })).toThrow(/required legs/);
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
});

/** A feature matrix shaped like docs/workbench/feature-matrix.md: W10 before W11, W12 after. */
function featureMatrix(w11Row: string, w10Row = "| A W10 feature | landed-gated | e | c |"): string {
  const header = ["| Feature | Status | Evidence | Caveats |", "| --- | --- | --- | --- |"];
  return ["# Workbench release feature matrix", "", "## W10: ReactiveFiber", "", ...header, w10Row, "", W11_HEADING, "", ...header, w11Row, "", "## W12: Next", "", "text", ""].join("\n");
}
const W11_PLANNED = "| Hosted develop() | planned | No binding host exists: no module under src/workbench/hosts/ names MechanicalWorkflows. | caveat |";
const W11_EVIDENCED = "| Hosted develop() | planned | No binding host exists: no module under src/workbench/hosts/ names MechanicalWorkflows; PI-7 partial. | caveat |";
const BASE_TREE: Tree = {
  [TRACEABILITY_PATH]: "# Traceability\n\n| ID | Status |\n| --- | --- |\n| WB-001 | planned |\n",
  [FEATURE_MATRIX_PATH]: featureMatrix(W11_PLANNED),
  [SKILL_PATH]: "# skill\n\nstate: design only\n",
  [README]: "# program\n",
  "forge.toml": `[build]\ngate = [${LEGS.map((leg) => `"${leg}"`).join(", ")}]\n`,
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
  return { changes, exists: { base: has(base), head: has(head) }, text: { base: (path: string) => base[path], head: (path: string) => head[path] }, beadIds: BEADS, hostModules, requiredLegs: LEGS, ...extra };
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

describe("EAT-R082 each slice cut updates W11 and the project skill to its evidenced status", () => {
  // Acceptance: "qa/workbench status validator compares each changed slice to same-cut docs/skill/W11 evidence pointers. Missing
  // live gate leaves slice non-live; stale no-Mechanical-code assertion is removed without claiming invocation shipped."
  // Adversarial mutant: "Set W11 landed-gated from source existence or one fixture alone."
  it("pins the evidence pointers and the W11 heading", () => {
    expect(SKILL_PATH).toBe(".agents/skills/pi-mechanical-interop/SKILL.md");
    expect(FEATURE_MATRIX_PATH).toBe("docs/workbench/feature-matrix.md");
    expect(PROGRAM_DOCS_DIR).toBe("docs/workbench/programs/mechanical-workflows-interop-2026-11-04/");
    expect(W11_HEADING).toBe("## W11: MechanicalWorkflows binding host");
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

  it("refuses a pointer the receipt's docs line does not name", () => {
    const rows = setRow(GOOD_ROWS, "docs, skill, source map, feature matrix and receipt updates", `${FEATURE_MATRIX_PATH} W11; ${README}`);
    expect(cutRules(BASE_TREE, treeWith({ ...SLICE_CUT, [RECEIPT]: receiptOf(rows) }))).toEqual(["pointer-unnamed-skill"]);
  });

  it("records a skill and program docs absent at base and head as blockers of a partial claim and refuses a live one", () => {
    const base = treeWithout(BASE_TREE, SKILL_PATH, README);
    const head = (rows: Rows) => treeWith({ [RECEIPT]: receiptOf(rows), [FEATURE_MATRIX_PATH]: featureMatrix(W11_EVIDENCED) }, base);
    const disclosed = setRow(GOOD_ROWS, "remaining blockers and next safe independent cut", `${SKILL_PATH} and ${PROGRAM_DOCS_DIR} are absent at base`);
    expect(cutRules(base, head(disclosed))).toEqual([]);
    expect(cutRules(base, head(GOOD_ROWS))).toEqual(["docs-absent-undisclosed", "skill-absent-undisclosed"]);
    expect(cutRules(base, head(setRows(disclosed, claimOf("live"))), { candidate: CANDIDATE })).toEqual(["docs-absent", "skill-absent"]);
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

  it("refuses a stale no-binding-host statement once a host module names MechanicalWorkflows", () => {
    const head = treeWith({ [`${HOSTS_DIR}mechanical-functions.ts`]: "// the MechanicalWorkflows function host\n" });
    expect(cutRules(BASE_TREE, head)).toEqual(["w11-absence-stale"]);
    const section = w11Section(featureMatrix(W11_PLANNED)) ?? "";
    expect(w11Findings({ baseSection: section, headSection: section, hostModules: [`${HOSTS_DIR}x.ts`], witnessed: false }).map((finding) => finding.rule)).toEqual(["w11-absence-stale"]);
    expect(w11Findings({ baseSection: section, headSection: section, hostModules: [], witnessed: false })).toEqual([]);
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
  });

  it("refuses a receipts entry that is not a per-bead receipt, and a receipt for a fabricated bead", () => {
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}status.md`]: "| slice | status |\n" }))).toEqual(["receipt-not-per-bead"]);
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}mwi/wb-good.md`]: plainReceipt }))).toEqual(["receipt-not-per-bead"]);
    expect(cutRules(BASE_TREE, treeWith({ [`${RECEIPTS_DIR}wb-fabricated.md`]: "# wb-fabricated: x\n\n## 2026-11-06 r\n" }))).toEqual(["receipt-bead-not-real"]);
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
  readonly receipts: readonly string[];
  readonly findings: readonly Finding[];
  readonly closure: { readonly state: string; readonly reasons: readonly string[] };
}
function cli(cwd: string, ...args: string[]): { readonly status: number | null; readonly verdict?: CliVerdict; readonly stderr: string } {
  const result = spawnSync(process.execPath, [SCRIPT, ...args], { cwd, encoding: "utf8" });
  return { status: result.status, verdict: result.status === 2 ? undefined : (JSON.parse(result.stdout) as CliVerdict), stderr: result.stderr };
}

describe("the CLI judges a real Git cut (scratch repository)", () => {
  const roots: string[] = [];
  afterEach(() => removeScratch(...roots.splice(0)));
  function repoAtBase(): { readonly repo: string; readonly base: string } {
    const repo = makeScratch("mwi-release-repo-");
    roots.push(repo);
    git(repo, "init", "-q", "-b", "main");
    writeTree(repo, { ...BASE_TREE, ".beads/issues.jsonl": '{"id":"wb-good"}\n{"id":"wb-other"}\n' });
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "base");
    return { repo, base: git(repo, "rev-parse", "HEAD") };
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

  it("exits 1 on a global status row appended to TRACEABILITY in the working tree (mutant)", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, { ...SLICE_CUT, [TRACEABILITY_PATH]: `${BASE_TREE[TRACEABILITY_PATH]}| MWI-PI-7 | partial |\n` });
    const run = cli(repo, "--base", base);
    expect(run.status, run.stderr).toBe(1);
    expect(run.verdict?.findings.map((finding) => finding.rule)).toEqual(["traceability-changed"]);
  });

  it("closes a committed cut only on a passing gate envelope keyed to that commit", () => {
    const { repo, base } = repoAtBase();
    writeTree(repo, SLICE_CUT);
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "cut");
    const head = git(repo, "rev-parse", "HEAD");
    const outside = makeScratch("mwi-release-envelope-");
    roots.push(outside);
    const envelopePath = join(outside, "envelope.json");
    writeFileSync(envelopePath, JSON.stringify(envelopeOf((envelope) => Object.assign(envelope.data, { gated_commit: head }))));
    const closed = cli(repo, "--base", base, "--head", head, "--commit", head, "--gate-envelope", envelopePath);
    expect(closed.status, closed.stderr).toBe(0);
    expect(closed.verdict?.head).toBe(head);
    expect(closed.verdict?.closure).toEqual({ state: "closable", reasons: [] });
    writeFileSync(envelopePath, JSON.stringify(envelopeOf((envelope) => Object.assign(envelope.data, { gated_commit: base }))));
    const stale = cli(repo, "--base", base, "--head", head, "--commit", head, "--gate-envelope", envelopePath);
    expect(stale.status, stale.stderr).toBe(1);
    expect(stale.verdict?.findings.map((finding) => finding.rule)).toEqual(["gate-other-commit"]);
    expect(stale.verdict?.closure.state).toBe("open");
  });

  it("exits 2 on a usage error or an unreadable input", () => {
    const { repo, base } = repoAtBase();
    expect(cli(repo).status).toBe(2);
    expect(cli(repo, "--base", "no-such-revision").status).toBe(2);
    expect(cli(repo, "--base", base, "--gate-envelope", join(repo, "missing.json")).status).toBe(2);
    expect(cli(repo, "--base", base, "--commit", base, "--gate-envelope", join(repo, "missing.json")).status).toBe(2);
    expect(cli(repo, "--base", base, "--unknown-flag").status).toBe(2);
  });
});

describe("the real tree", () => {
  it("every release receipt under docs/workbench/receipts/ passes the receipt judges, wb-j5y5's own among them", () => {
    const beadIds = readBeadIds(readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8"));
    const judged: string[] = [];
    for (const name of readdirSync(join(REPO, RECEIPTS_DIR)).sort()) {
      const blocks = parseReleaseBlocks(readFileSync(join(REPO, RECEIPTS_DIR, name), "utf8"));
      if (blocks.length === 0) continue;
      judged.push(name);
      for (const block of blocks) {
        const findings = receiptBlockFindings(block, { receiptBead: name.replace(/\.md$/, ""), beadIds, fileExists: (path: string) => existsSync(join(REPO, path)) });
        expect(findings, name).toEqual([]);
      }
    }
    expect(judged).toContain("wb-j5y5.md");
  });

  it("wb-j5y5's receipt lands slice PI-7 explicitly partial with all six requirements tied to red mutants", () => {
    const blocks = parseReleaseBlocks(readFileSync(join(REPO, RECEIPTS_DIR, "wb-j5y5.md"), "utf8"));
    expect(blocks).toHaveLength(1);
    const fields = blocks[0].fields;
    expect([fields.get("bead"), fields.get("slice"), fields.get("slice status"), fields.get("real infrastructure gate")]).toEqual(["wb-j5y5", "PI-7", "partial", "none"]);
    expect(fields.get("requirements")).toBe("EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087");
    expect([...fields.keys()].filter((label) => label.startsWith("mutant "))).toEqual(["mutant EAT-R082", "mutant EAT-R083", "mutant EAT-R084", "mutant EAT-R085", "mutant EAT-R086", "mutant EAT-R087"]);
  });

  it("the W11 row no longer carries the retired detection sentence (the stale no-Mechanical-code assertion)", () => {
    const section = w11Section(readFileSync(join(REPO, FEATURE_MATRIX_PATH), "utf8")) ?? "";
    expect(section.startsWith(W11_HEADING)).toBe(true);
    expect(section).not.toContain("grep -ril mechanical over src/ and test/");
    expect(section).not.toContain("matches only an incidental word");
    expect(section).not.toContain("no src/workbench module, no test file");
  });

  it("the W11 row claims no shipped invocation: its no-binding-host statement holds of src/workbench/hosts/ and it is not landed-gated", () => {
    const section = w11Section(readFileSync(join(REPO, FEATURE_MATRIX_PATH), "utf8")) ?? "";
    const hostModules = readdirSync(join(REPO, HOSTS_DIR))
      .filter((name) => /mechanical/i.test(readFileSync(join(REPO, HOSTS_DIR, name), "utf8")))
      .map((name) => `${HOSTS_DIR}${name}`);
    expect(w11Findings({ baseSection: section, headSection: section, hostModules, witnessed: false })).toEqual([]);
    expect(/\bno binding[- ]host\b/i.test(section)).toBe(hostModules.length === 0);
    expect(w11Statuses(section).length).toBeGreaterThan(0);
    expect(w11Statuses(section).includes("landed-gated") && hostModules.length === 0).toBe(false);
  });

  it("the W11 row names the release validator that governs the program's slice claims", () => {
    const section = w11Section(readFileSync(join(REPO, FEATURE_MATRIX_PATH), "utf8")) ?? "";
    expect(section).toContain("qa/workbench/mwi-release.mjs");
    expect(section).toContain("wb-j5y5");
  });
});
