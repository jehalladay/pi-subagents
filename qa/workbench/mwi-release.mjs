/**
 * wb-j5y5 [MWI-release] (slice PI-7): the release validator of the mechanical-workflows-interop-2026-11-04 program.
 *
 * It implements EAT-R082..EAT-R087 of the program's triage/requirements/ATOMIC-REQUIREMENTS.md at rig master
 * 0b25e14e084a5b1d612e780bc12a927b3a80dd62 (the triage tree is a master-only evidence archive). Each judge quotes the acceptance
 * line it implements; test/workbench-mwi-release.test.ts feeds every requirement's adversarial mutant to the judges as an input
 * they must refuse.
 *
 * Pure node: no src/ or dist/ import. The judges are pure functions of their inputs; only readCutFromGit and the CLI read Git or
 * the file system.
 *
 * THE RELEASE BLOCK. A release receipt is a per-bead receipt, docs/workbench/receipts/<bead-id>.md, holding one TOP-LEVEL fenced
 * block per entry whose info string is exactly `mwi-release`, one `label: value` line per field (the label ends at the first
 * colon; a block nested in a list or a quote is not read). Its fields:
 *  - the claim: contract (workbench.mwi-release/v1), program, bead, slice (PI-0..PI-7), slice status (design-only, partial, live,
 *    closed), requirements (the EAT ids the cut serves) and real infrastructure gate (a gate name such as PI-DETACHED-GRANTS, or
 *    `none`); a named gate adds gate tier, gate result, gate commit and gate receipt;
 *  - the twelve lines of the program's handoff contract (04-agent-handoff.md, "Handoff contract for each change"); a leg that did
 *    not run says so (`not run: <why>`, or `none`) instead of being left out;
 *  - the red-first legs: red command, red result, first failing assertion, positive rerun, and one `mutant <EAT id>` line per
 *    listed requirement.
 *
 * CLI:
 *   node qa/workbench/mwi-release.mjs --base <rev> [--head <rev>] [--commit <rev>] [--gate-envelope <path>]
 * judges the cut <base>..<head> of the repository at the current directory (head defaults to the working tree, untracked files
 * included) and prints one workbench.mwi-release/v1 verdict as JSON on stdout. --gate-envelope names the `forge build --json`
 * envelope of the complete gate run on the candidate commit and needs --commit (EAT-R084).
 *   exit 0: no finding (closure may still be open; the verdict says why)
 *   exit 1: findings
 *   exit 2: a usage error or an unreadable input
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer } from "marked";
import { BEAD_ID, RECEIPT_FILE } from "./receipts-index.mjs";

/** @typedef {{ readonly requirement: string, readonly rule: string, readonly detail: string, readonly receipt?: string }} Finding */
/** @typedef {{ readonly fields: ReadonlyMap<string, string>, readonly malformed: ReadonlyArray<{ readonly kind: string, readonly line: string }> }} ReleaseBlock */
/** @typedef {{ readonly receiptBead?: string, readonly beadIds: ReadonlySet<string>, readonly fileExists: (path: string) => boolean, readonly candidate?: string }} BlockContext */
/** @typedef {{ readonly path: string, readonly status: string }} Change */
/**
 * @typedef {{
 *   readonly changes: ReadonlyArray<Change>,
 *   readonly exists: { readonly base: (path: string) => boolean, readonly head: (path: string) => boolean },
 *   readonly text: { readonly base: (path: string) => string | undefined, readonly head: (path: string) => string | undefined },
 *   readonly beadIds: ReadonlySet<string>,
 *   readonly hostModules: ReadonlyArray<string>,
 *   readonly requiredLegs: ReadonlyArray<string>,
 *   readonly candidate?: string,
 *   readonly envelope?: unknown,
 * }} Cut
 */
/** @typedef {{ readonly state: "closable" | "open", readonly reasons: ReadonlyArray<string> }} Closure */
/** @typedef {{ readonly receipts: ReadonlyArray<string>, readonly findings: ReadonlyArray<Finding>, readonly closure: Closure }} CutVerdict */

export const CONTRACT = "workbench.mwi-release/v1";
export const PROGRAM = "mechanical-workflows-interop-2026-11-04";
export const BLOCK_INFO = "mwi-release";
/** The program's release slices (03-implementation-and-qa.md, "Release slices"). */
export const SLICES = Object.freeze(["PI-0", "PI-1", "PI-2", "PI-3", "PI-4", "PI-5", "PI-6", "PI-7"]);
/** design-only: nothing of the slice landed; partial: a source/test-only cut landed, explicitly partial (EAT-R085); live, closed: claims that need a passing producer gate. */
export const SLICE_STATUSES = Object.freeze(["design-only", "partial", "live", "closed"]);
export const CLOSING_STATUSES = Object.freeze(["live", "closed"]);
/** producer: a producer-tier run of the named gate; fixture: a fixture-only run; historical: a historical component receipt. */
export const GATE_TIERS = Object.freeze(["producer", "fixture", "historical"]);
export const GATE_RESULTS = Object.freeze(["pass", "fail", "skipped", "unavailable", "not-run"]);
export const NO_GATE = "none";
/** The twelve lines of the handoff contract, docs/workbench/programs/<PROGRAM>/04-agent-handoff.md "Handoff contract for each change". */
export const HANDOFF_FIELDS = Object.freeze([
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
/** EAT-R086's ten receipt items, each read from the handoff line that carries it. @type {ReadonlyArray<readonly [string, string]>} */
export const RECEIPT_ITEMS = Object.freeze([
  Object.freeze(["baseline/source", HANDOFF_FIELDS[0]]),
  Object.freeze(["owner", HANDOFF_FIELDS[2]]),
  Object.freeze(["supported installed API", HANDOFF_FIELDS[3]]),
  Object.freeze(["positive/negative", HANDOFF_FIELDS[4]]),
  Object.freeze(["effects/cancel/retention", HANDOFF_FIELDS[6]]),
  Object.freeze(["native IDs", HANDOFF_FIELDS[7]]),
  Object.freeze(["timings", HANDOFF_FIELDS[8]]),
  Object.freeze(["Forge outcomes", HANDOFF_FIELDS[9]]),
  Object.freeze(["docs", HANDOFF_FIELDS[10]]),
  Object.freeze(["blockers", HANDOFF_FIELDS[11]]),
]);
/** EAT-R083's red-first legs; the mutant legs are one `mutant <EAT id>` line per listed requirement. */
export const TDD_FIELDS = Object.freeze(["red command", "red result", "first failing assertion", "positive rerun"]);
export const SKILL_PATH = ".agents/skills/pi-mechanical-interop/SKILL.md";
export const FEATURE_MATRIX_PATH = "docs/workbench/feature-matrix.md";
export const W11_HEADING = "## W11: MechanicalWorkflows binding host";
export const PROGRAM_DOCS_DIR = `docs/workbench/programs/${PROGRAM}/`;
export const TRACEABILITY_PATH = "docs/workbench/TRACEABILITY.md";
/** EAT-R087's immutable paths: their bytes at the head equal their bytes at the cut base. */
export const IMMUTABLE_PATHS = Object.freeze([TRACEABILITY_PATH]);
export const RECEIPTS_DIR = "docs/workbench/receipts/";
export const HOSTS_DIR = "src/workbench/hosts/";
export const FORGE_CONTRACT = "result-envelope/v1";
export const OPEN_REASONS = Object.freeze({
  noReceipt: "no release receipt in the cut",
  noEnvelope: "no machine gate envelope supplied (EAT-R084)",
  unkeyed: "a live or closed claim is not keyed to a candidate commit (EAT-R085)",
});

/** The same-cut evidence pointers of EAT-R082: the W11 section, the project skill and the program docs. */
const POINTERS = Object.freeze([
  Object.freeze({ key: "w11", path: FEATURE_MATRIX_PATH }),
  Object.freeze({ key: "skill", path: SKILL_PATH }),
  Object.freeze({ key: "docs", path: PROGRAM_DOCS_DIR }),
]);
const GATE_DETAIL_FIELDS = Object.freeze(["gate tier", "gate result", "gate commit", "gate receipt"]);
const MUTANT_PREFIX = "mutant ";
const BEAD = new RegExp(`^${BEAD_ID}$`);
const SHA = /^[0-9a-f]{40}$/;
const SHA_IN_TEXT = /(?<![0-9a-f])[0-9a-f]{40}(?![0-9a-f])/;
const COMMAND_ID = /^cmd_[0-9a-f]{12}$/;
const GATE_NAME = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/;
const REQUIREMENT = /EAT-R\d{3}/g;
const NOT_RUN = /^not run\b/i;
const FAILED = /(?<![0-9])[1-9][0-9]* failed\b/;
const PASSED = /(?<![0-9])[1-9][0-9]* passed\b/;
const SEAM_PATH = /(?<![A-Za-z0-9_./-])(?:\.\/)?(test\/[A-Za-z0-9_./-]+\.(?:test|census)\.ts)(?![A-Za-z0-9_./-])/g;
const FORGE_TIER = /\bforge run ([a-z0-9][a-z0-9-]*)/g;
const ABSENCE = /\bno binding[- ]host\b/i;

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Every top-level fenced block of `markdown` whose info string is exactly BLOCK_INFO, read into its fields. A line without a
 * label and a repeated label are kept as the block's malformed entries, never silently dropped.
 * @param {string} markdown
 * @returns {ReleaseBlock[]}
 */
export function parseReleaseBlocks(markdown) {
  /** @type {ReleaseBlock[]} */
  const blocks = [];
  for (const token of Lexer.lex(markdown)) {
    if (token.type !== "code" || token.lang !== BLOCK_INFO) continue;
    /** @type {Map<string, string>} */
    const fields = new Map();
    /** @type {Array<{ readonly kind: string, readonly line: string }>} */
    const malformed = [];
    for (const raw of String(token.text).split("\n")) {
      const line = raw.trim();
      if (line === "") continue;
      const at = line.indexOf(":");
      const label = at < 0 ? "" : line.slice(0, at).trim();
      if (label === "") malformed.push(Object.freeze({ kind: "line", line }));
      else if (fields.has(label)) malformed.push(Object.freeze({ kind: "duplicate", line: label }));
      else fields.set(label, line.slice(at + 1).trim());
    }
    blocks.push(Object.freeze({ fields, malformed: Object.freeze(malformed) }));
  }
  return blocks;
}

/**
 * The seams a command names: each test file path and each `forge run <tier>`.
 * @param {string} command
 * @returns {string[]}
 */
function seamsOf(command) {
  const seams = [...command.matchAll(SEAM_PATH)].map((match) => match[1]);
  for (const match of command.matchAll(FORGE_TIER)) seams.push(`forge run ${match[1]}`);
  return [...new Set(seams)];
}

/**
 * Judges one release block (EAT-R083, EAT-R085, EAT-R086). The bead export is required: the real-bead check is never skipped.
 * @param {ReleaseBlock} block
 * @param {BlockContext} ctx
 * @returns {Finding[]}
 */
export function receiptBlockFindings(block, ctx) {
  if (!(ctx?.beadIds instanceof Set)) throw new TypeError("receiptBlockFindings needs the bead export as a Set of real bead ids");
  if (typeof ctx.fileExists !== "function") throw new TypeError("receiptBlockFindings needs a fileExists reader for the seam paths");
  if (ctx.candidate !== undefined && !SHA.test(ctx.candidate)) throw new TypeError("the candidate must be a full 40-hex commit sha");
  /** @type {Finding[]} */
  const findings = [];
  /** @param {string} requirement @param {string} rule @param {string} detail */
  const add = (requirement, rule, detail) => {
    findings.push(Object.freeze({ requirement, rule, detail }));
  };
  /** @param {string} label */
  const get = (label) => block.fields.get(label);
  /** A leg's value when it ran: present, non-empty and not labelled not run. @param {string} label */
  const ran = (label) => {
    const value = get(label);
    return value === undefined || value === "" || NOT_RUN.test(value) ? undefined : value;
  };

  // EAT-R086: "Validate receipt includes baseline/source, owner, supported installed API, positive/negative,
  // effects/cancel/retention, native IDs, timings, Forge outcomes, docs and blockers; missing real bead ID forbids creating wb
  // receipt." Mutant: "Generate a fabricated wb identifier or omit not-run labels."
  for (const entry of block.malformed) add("EAT-R086", entry.kind === "duplicate" ? "field-duplicate" : "line-malformed", entry.line);
  if (get("contract") !== CONTRACT) add("EAT-R086", "contract-mismatch", `contract ${get("contract") ?? "(absent)"} is not ${CONTRACT}`);
  if (get("program") !== PROGRAM) add("EAT-R086", "program-mismatch", `program ${get("program") ?? "(absent)"} is not ${PROGRAM}`);
  const bead = get("bead");
  if (bead === undefined || !BEAD.test(bead)) add("EAT-R086", "bead-missing", `bead ${bead ?? "(absent)"} is not a wb- bead id`);
  else if (ctx.receiptBead !== undefined && bead !== ctx.receiptBead) add("EAT-R086", "bead-mismatch", `bead ${bead} is not the receipt file's bead ${ctx.receiptBead}`);
  else if (!ctx.beadIds.has(bead)) add("EAT-R086", "bead-not-real", `${bead} is absent from the bead export: a missing real bead ID forbids the receipt`);
  for (const label of HANDOFF_FIELDS) {
    const value = get(label);
    if (value === undefined) add("EAT-R086", "field-missing", label);
    else if (value === "") add("EAT-R086", "field-empty", label);
  }

  // EAT-R083: "Receipt validator requires baseline SHA, real seam test command, first failing assertion, positive rerun and
  // adversarial mutant failure tied to the requirement. Missing leg rejects closure." Mutant: "Write only a passing
  // postimplementation test or change assertion to fit implementation."
  if (!SHA_IN_TEXT.test(get(HANDOFF_FIELDS[0]) ?? "")) add("EAT-R083", "baseline-sha-missing", "the baseline line names no full 40-hex commit sha");
  for (const leg of TDD_FIELDS) {
    const value = get(leg);
    if (value === undefined) add("EAT-R083", "tdd-leg-missing", leg);
    else if (ran(leg) === undefined) add("EAT-R083", "tdd-leg-not-run", leg);
  }
  const redResult = ran("red result");
  if (redResult !== undefined && !FAILED.test(redResult)) add("EAT-R083", "red-not-failing", `red result '${redResult}' reports no failure: a passing postimplementation test is not a red`);
  const rerun = ran("positive rerun");
  if (rerun !== undefined && (FAILED.test(rerun) || !PASSED.test(rerun))) add("EAT-R083", "rerun-not-green", `positive rerun '${rerun}' does not report a green run`);
  const red = ran("red command");
  if (red !== undefined) {
    const seams = seamsOf(red);
    if (seams.length === 0) add("EAT-R083", "red-not-seam", `red command '${red}' names no seam test file and no forge run tier`);
    for (const seam of seams) if (seam.startsWith("test/") && !ctx.fileExists(seam)) add("EAT-R083", "seam-missing", seam);
    if (rerun !== undefined) {
      const rerunSeams = new Set(seamsOf(rerun));
      const missing = seams.filter((seam) => !rerunSeams.has(seam));
      if (missing.length > 0) add("EAT-R083", "rerun-not-same-seam", `the positive rerun does not rerun ${missing.join(", ")}`);
    }
  }
  const requirements = [...new Set(get("requirements")?.match(REQUIREMENT) ?? [])];
  if (requirements.length === 0) add("EAT-R083", "requirements-missing", "the block lists no EAT requirement id");
  for (const id of requirements) {
    const mutant = get(`${MUTANT_PREFIX}${id}`);
    if (mutant === undefined || mutant === "") add("EAT-R083", "mutant-missing", id);
    else if (!FAILED.test(mutant)) add("EAT-R083", "mutant-not-red", `${id}: '${mutant}' reports no failure`);
  }
  for (const label of block.fields.keys()) {
    if (label.startsWith(MUTANT_PREFIX) && !requirements.includes(label.slice(MUTANT_PREFIX.length))) add("EAT-R083", "mutant-untied", `${label} names no listed requirement`);
  }

  // EAT-R085: "Status validator rejects live/closed when required producer tier is skipped, unavailable, fixture-only or a
  // historical component receipt; source/test-only cut may land explicitly partial." Mutant: "Silently mark live producer tier
  // skipped and close slice."
  const slice = get("slice");
  if (!SLICES.includes(slice ?? "")) add("EAT-R085", "slice-unknown", `slice ${slice ?? "(absent)"} is not one of ${SLICES.join(", ")}`);
  const status = get("slice status");
  if (!SLICE_STATUSES.includes(status ?? "")) add("EAT-R085", "status-unknown", `slice status ${status ?? "(absent)"} is not one of ${SLICE_STATUSES.join(", ")}`);
  const gate = get("real infrastructure gate");
  if (gate === undefined || gate === "") add("EAT-R085", "gate-line-missing", `the block neither names its real infrastructure gate nor says ${NO_GATE}: a gate is never silently skipped`);
  const named = gate !== undefined && gate !== "" && gate !== NO_GATE;
  const tier = get("gate tier");
  const result = get("gate result");
  if (named) {
    if (!GATE_NAME.test(gate)) add("EAT-R085", "gate-name-malformed", `gate '${gate}' is not an upper-case hyphenated gate name`);
    if (!GATE_TIERS.includes(tier ?? "")) add("EAT-R085", "gate-tier-unknown", `gate tier ${tier ?? "(absent)"} is not one of ${GATE_TIERS.join(", ")}`);
    if (!GATE_RESULTS.includes(result ?? "")) add("EAT-R085", "gate-result-unknown", `gate result ${result ?? "(absent)"} is not one of ${GATE_RESULTS.join(", ")}`);
  } else if (GATE_DETAIL_FIELDS.some((label) => block.fields.has(label))) {
    add("EAT-R085", "gate-fields-without-gate", "gate tier, result, commit or receipt lines under a block that names no gate");
  }
  if (CLOSING_STATUSES.includes(status ?? "")) {
    if (!named) add("EAT-R085", "closing-gate-unnamed", `a ${status} claim names no real infrastructure gate: a missing live gate leaves the slice non-live`);
    else {
      if (tier === "fixture") add("EAT-R085", "closing-gate-fixture-only", `${gate} ran fixture-only`);
      if (tier === "historical") add("EAT-R085", "closing-gate-historical", `${gate} is a historical component receipt`);
      if (result !== "pass" && GATE_RESULTS.includes(result ?? "")) add("EAT-R085", `closing-gate-${result}`, `${gate} result ${result}`);
      const commit = get("gate commit") ?? "";
      if (!SHA.test(commit)) add("EAT-R085", "closing-gate-commit-missing", `${gate} names no full 40-hex gate commit`);
      else if (ctx.candidate !== undefined && commit !== ctx.candidate) add("EAT-R085", "closing-gate-historical", `${gate} ran at ${commit}, not at the candidate ${ctx.candidate}`);
      if (!COMMAND_ID.test(get("gate receipt") ?? "")) add("EAT-R085", "closing-gate-receipt-missing", `${gate} names no cmd_ receipt`);
    }
  }
  return findings;
}

/**
 * Real bead ids from a bead export (.beads/issues.jsonl): one JSON object per non-blank line.
 * @param {string} jsonl
 * @returns {Set<string>}
 */
export function readBeadIds(jsonl) {
  /** @type {Set<string>} */
  const ids = new Set();
  jsonl.split("\n").forEach((line, index) => {
    if (line.trim() === "") return;
    /** @type {unknown} */
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      throw new Error(`bead export line ${index + 1} is not JSON`);
    }
    if (isRecord(row) && typeof row.id === "string" && row.id !== "") ids.add(row.id);
  });
  return ids;
}

/**
 * The legs of forge.toml's [build] gate (one-line array), the complete gate of record. Fails closed when none is declared.
 * @param {string} toml
 * @returns {string[]}
 */
export function requiredGateLegs(toml) {
  let inBuild = false;
  for (const raw of toml.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("[")) {
      inBuild = line === "[build]";
      continue;
    }
    if (!inBuild) continue;
    const match = /^gate\s*=\s*\[(.*)\]\s*(?:#.*)?$/.exec(line);
    if (match === null) continue;
    const legs = [...match[1].matchAll(/"([^"]+)"/g)].map((leg) => leg[1]);
    if (legs.length > 0) return legs;
    break;
  }
  throw new Error("forge.toml declares no [build] gate legs");
}

/**
 * EAT-R084: "Read machine receipt keyed to exact candidate commit with required Forge build legs; failed/not-run gate or receipt
 * for another commit refuses close. No CI substitution." Mutant: "Accept exit echo or an old commit gate as this cut PASS."
 * `envelope` is the parsed `forge build --json` result envelope of the complete gate.
 * @param {unknown} envelope
 * @param {{ readonly candidate: string, readonly requiredLegs: ReadonlyArray<string> }} options
 * @returns {Finding[]}
 */
export function gateEnvelopeFindings(envelope, options) {
  if (typeof options?.candidate !== "string" || !SHA.test(options.candidate)) throw new TypeError("gateEnvelopeFindings needs the full 40-hex candidate commit");
  if (!Array.isArray(options.requiredLegs) || options.requiredLegs.length === 0) throw new TypeError("gateEnvelopeFindings needs the required legs of the [build] gate");
  /** @type {Finding[]} */
  const findings = [];
  /** @param {string} rule @param {string} detail */
  const add = (rule, detail) => {
    findings.push(Object.freeze({ requirement: "EAT-R084", rule, detail }));
  };
  if (!isRecord(envelope) || envelope.contract_version !== FORGE_CONTRACT || envelope.command !== "build" || !isRecord(envelope.data)) {
    add("gate-not-forge-build", `not a forge build ${FORGE_CONTRACT} envelope: an exit echo or a CI record is no machine gate receipt`);
    return findings;
  }
  const data = envelope.data;
  if (data.gated_commit !== options.candidate) add("gate-other-commit", `the gate ran at ${String(data.gated_commit)}, not at the candidate ${options.candidate}`);
  if (envelope.status !== "success" || data.gate_verdict !== "PASS" || data.gate_passed !== true) {
    add("gate-not-pass", `status ${String(envelope.status)}, verdict ${String(data.gate_verdict)}, gate_passed ${String(data.gate_passed)}`);
  }
  const steps = Array.isArray(data.steps) ? data.steps.filter(isRecord) : [];
  for (const leg of options.requiredLegs) {
    const step = steps.find((each) => each.name === leg);
    if (step === undefined) add("gate-leg-missing", `the required leg ${leg} is not in the envelope`);
    else if (step.status !== "passed") add("gate-leg-not-passed", `the required leg ${leg} is ${String(step.status)}`);
  }
  const invocation = isRecord(data.invocation) ? data.invocation : undefined;
  const narrowed = (/** @type {string} */ key) => !Array.isArray(invocation?.[key]) || invocation[key].length > 0;
  if (invocation === undefined || narrowed("only") || narrowed("skip")) add("gate-narrowed", "the gate ran narrowed (--only or --skip), not complete");
  const commandId = isRecord(envelope.ids) ? envelope.ids.command_id : undefined;
  if (typeof commandId !== "string" || !COMMAND_ID.test(commandId)) add("gate-no-command-id", "the envelope carries no cmd_ command id");
  return findings;
}

/**
 * The W11 section of the feature matrix: its heading line up to the next level-1 or level-2 heading.
 * @param {string} matrix
 * @returns {string | undefined}
 */
export function w11Section(matrix) {
  const lines = matrix.split("\n");
  const start = lines.findIndex((line) => line.trimEnd() === W11_HEADING);
  if (start < 0) return undefined;
  let end = start + 1;
  while (end < lines.length && !/^#{1,2} /.test(lines[end])) end += 1;
  return lines.slice(start, end).join("\n");
}

/**
 * The Status cell of every feature row of a W11 section's table.
 * @param {string} section
 * @returns {string[]}
 */
export function w11Statuses(section) {
  /** @type {string[]} */
  const statuses = [];
  for (const raw of section.split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("|") || /^\|[\s:|-]+\|?$/.test(line)) continue;
    const cells = line
      .slice(1, line.endsWith("|") ? -1 : undefined)
      .split("|")
      .map((cell) => cell.trim());
    if (cells[0] === "Feature" || cells[1] === undefined) continue;
    statuses.push(cells[1]);
  }
  return statuses;
}

/**
 * EAT-R082's W11 rules. `witnessed` is true when the cut holds a live or closed slice claim whose named producer gate passed at the
 * candidate commit.
 * @param {{ readonly baseSection?: string, readonly headSection?: string, readonly hostModules: ReadonlyArray<string>, readonly witnessed: boolean }} input
 * @returns {Finding[]}
 */
export function w11Findings(input) {
  /** @type {Finding[]} */
  const findings = [];
  const head = input.headSection ?? "";
  const turnedLanded = w11Statuses(head).includes("landed-gated") && !w11Statuses(input.baseSection ?? "").includes("landed-gated");
  if (turnedLanded && !input.witnessed) {
    findings.push(Object.freeze({ requirement: "EAT-R082", rule: "w11-landed-gated-unwitnessed", detail: "W11 turned landed-gated without a live or closed slice claim whose producer gate passed at the candidate: source existence or one fixture alone never lands W11" }));
  }
  if (input.hostModules.length > 0 && ABSENCE.test(head)) {
    findings.push(Object.freeze({ requirement: "EAT-R082", rule: "w11-absence-stale", detail: `W11 states that no binding host exists while ${input.hostModules.join(", ")} names MechanicalWorkflows` }));
  }
  return findings;
}

/**
 * Judges a cut base..head: EAT-R087 over its added and immutable paths, EAT-R082/R083/R085/R086 over the release blocks it adds
 * to per-bead receipts, the W11 rules, and EAT-R084 over the machine gate envelope when one is supplied.
 * @param {Cut} cut
 * @returns {CutVerdict}
 */
export function judgeCut(cut) {
  /** @type {Finding[]} */
  const findings = [];
  /** @type {string[]} */
  const receipts = [];
  /** @type {string[]} */
  const reasons = [];
  /** @param {Finding} finding @param {string | undefined} receipt */
  const keep = (finding, receipt) => {
    findings.push(Object.freeze(receipt === undefined ? { ...finding } : { ...finding, receipt }));
  };

  // EAT-R087: "Compare immutable path blob and added receipt paths against cut base; TRACEABILITY unchanged and no new shared
  // index; per-real-bead receipts allowed." Mutant: "Append a global status row to TRACEABILITY."
  for (const path of IMMUTABLE_PATHS) {
    const after = cut.text.head(path);
    if (cut.text.base(path) !== after) keep({ requirement: "EAT-R087", rule: "traceability-changed", detail: `${path} ${after === undefined ? "is deleted" : "differs from the cut base"}: the historical record is frozen` }, undefined);
  }
  for (const change of cut.changes) {
    if (change.status !== "A") continue;
    const name = change.path.slice(change.path.lastIndexOf("/") + 1);
    if (change.path.startsWith("docs/") && name.toLowerCase() === "index.md") {
      keep({ requirement: "EAT-R087", rule: "shared-index-added", detail: `${change.path}: no new shared index` }, undefined);
      continue;
    }
    if (!change.path.startsWith(RECEIPTS_DIR)) continue;
    const rest = change.path.slice(RECEIPTS_DIR.length);
    const match = RECEIPT_FILE.exec(rest);
    if (rest.includes("/") || match === null) keep({ requirement: "EAT-R087", rule: "receipt-not-per-bead", detail: `${change.path}: a receipt is one per-bead file, docs/workbench/receipts/<bead-id>.md` }, undefined);
    else if (!cut.beadIds.has(match[1])) keep({ requirement: "EAT-R087", rule: "receipt-bead-not-real", detail: `${change.path}: ${match[1]} is absent from the bead export` }, undefined);
  }

  // EAT-R082: "qa/workbench status validator compares each changed slice to same-cut docs/skill/W11 evidence pointers. Missing
  // live gate leaves slice non-live; stale no-Mechanical-code assertion is removed without claiming invocation shipped."
  // Mutant: "Set W11 landed-gated from source existence or one fixture alone."
  const w11 = { base: w11Section(cut.text.base(FEATURE_MATRIX_PATH) ?? ""), head: w11Section(cut.text.head(FEATURE_MATRIX_PATH) ?? "") };
  let witnessed = false;
  let unkeyed = false;
  for (const change of cut.changes) {
    if (change.status === "D" || !change.path.startsWith(RECEIPTS_DIR)) continue;
    const match = RECEIPT_FILE.exec(change.path.slice(RECEIPTS_DIR.length));
    if (match === null) continue;
    const before = change.status === "A" ? [] : parseReleaseBlocks(cut.text.base(change.path) ?? "");
    const added = parseReleaseBlocks(cut.text.head(change.path) ?? "").slice(before.length);
    if (added.length === 0) continue;
    receipts.push(change.path);
    for (const block of added) {
      const blockFindings = receiptBlockFindings(block, { receiptBead: match[1], beadIds: cut.beadIds, fileExists: (path) => cut.exists.head(path), candidate: cut.candidate });
      for (const finding of blockFindings) keep(finding, change.path);
      const status = block.fields.get("slice status") ?? "";
      const closing = CLOSING_STATUSES.includes(status);
      if (closing && !blockFindings.some((finding) => finding.requirement === "EAT-R085")) {
        if (cut.candidate === undefined) unkeyed = true;
        else witnessed = true;
      }
      const docsLine = block.fields.get(HANDOFF_FIELDS[10]) ?? "";
      const blockersLine = block.fields.get(HANDOFF_FIELDS[11]) ?? "";
      for (const pointer of POINTERS) {
        if (cut.exists.base(pointer.path) || cut.exists.head(pointer.path)) {
          const changed = pointer.key === "w11" ? w11.base !== w11.head : cut.changes.some((each) => (pointer.path.endsWith("/") ? each.path.startsWith(pointer.path) : each.path === pointer.path));
          if (!changed) keep({ requirement: "EAT-R082", rule: `same-cut-${pointer.key}`, detail: `${pointer.path} is not updated in the same cut as this slice claim` }, change.path);
          else if (!docsLine.includes(pointer.path)) keep({ requirement: "EAT-R082", rule: `pointer-unnamed-${pointer.key}`, detail: `the docs line does not name ${pointer.path}` }, change.path);
        } else if (closing) {
          keep({ requirement: "EAT-R082", rule: `${pointer.key}-absent`, detail: `${pointer.path} is absent at base and head: a ${status} claim needs it` }, change.path);
        } else if (!blockersLine.includes(pointer.path)) {
          keep({ requirement: "EAT-R082", rule: `${pointer.key}-absent-undisclosed`, detail: `${pointer.path} is absent at base and head and the blockers line does not name it` }, change.path);
        }
      }
    }
  }
  for (const finding of w11Findings({ baseSection: w11.base, headSection: w11.head, hostModules: cut.hostModules, witnessed })) keep(finding, undefined);

  if (receipts.length === 0) reasons.push(OPEN_REASONS.noReceipt);
  if (cut.envelope === undefined) reasons.push(OPEN_REASONS.noEnvelope);
  else {
    if (cut.candidate === undefined) throw new TypeError("a gate envelope is judged against a candidate commit");
    for (const finding of gateEnvelopeFindings(cut.envelope, { candidate: cut.candidate, requiredLegs: cut.requiredLegs })) keep(finding, undefined);
  }
  if (unkeyed) reasons.push(OPEN_REASONS.unkeyed);
  /** @type {"closable" | "open"} */
  const state = findings.length === 0 && reasons.length === 0 ? "closable" : "open";
  return { receipts, findings, closure: Object.freeze({ state, reasons }) };
}

class UsageError extends Error {}

/**
 * @param {string} cwd
 * @param {readonly string[]} args
 */
function git(cwd, args) {
  return spawnSync("git", [...args], { cwd, encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
}

/**
 * @param {string} cwd
 * @param {readonly string[]} args
 * @param {string} what
 * @returns {string}
 */
function gitOut(cwd, args, what) {
  const result = git(cwd, args);
  if (result.status !== 0) throw new UsageError(`${what}${result.stderr ? `: ${result.stderr.trim()}` : ""}`);
  return result.stdout;
}

/**
 * Reads the cut <base>..<head> (head undefined: the working tree, untracked files included) of the repository holding `repo`.
 * @param {{ readonly repo: string, readonly base: string, readonly head?: string, readonly candidate?: string, readonly envelopePath?: string }} options
 * @returns {Cut & { readonly base: string, readonly head?: string }}
 */
export function readCutFromGit(options) {
  const top = gitOut(options.repo, ["rev-parse", "--show-toplevel"], "not inside a Git work tree").trim();
  /** @param {string} rev */
  const commit = (rev) => gitOut(top, ["rev-parse", "--verify", "--quiet", `${rev}^{commit}`], `unknown revision ${rev}`).trim();
  const base = commit(options.base);
  const head = options.head === undefined ? undefined : commit(options.head);
  const candidate = options.candidate === undefined ? undefined : commit(options.candidate);
  /** @type {Map<string, Change>} */
  const changes = new Map();
  const diff = gitOut(top, ["diff", "--name-status", "--no-renames", "-z", base, ...(head === undefined ? [] : [head]), "--"], "git diff").split("\0");
  for (let at = 0; at + 1 < diff.length; at += 2) {
    const letter = diff[at].charAt(0);
    if (letter !== "") changes.set(diff[at + 1], { path: diff[at + 1], status: letter === "A" ? "A" : letter === "D" ? "D" : "M" });
  }
  if (head === undefined) {
    for (const path of gitOut(top, ["ls-files", "--others", "--exclude-standard", "-z"], "git ls-files").split("\0")) {
      if (path !== "" && !changes.has(path)) changes.set(path, { path, status: "A" });
    }
  }
  /** @param {string} rev @returns {(path: string) => string | undefined} */
  const blobAt = (rev) => (path) => {
    const result = git(top, ["cat-file", "blob", `${rev}:${path}`]);
    return result.status === 0 ? result.stdout : undefined;
  };
  /** @param {string} rev @returns {(path: string) => boolean} */
  const existsAt = (rev) => (path) => git(top, ["cat-file", "-e", `${rev}:${path.replace(/\/$/, "")}`]).status === 0;
  /** @param {string} path @returns {string | undefined} */
  const workTreeText = (path) => {
    const absolute = join(top, path);
    return existsSync(absolute) && statSync(absolute).isFile() ? readFileSync(absolute, "utf8") : undefined;
  };
  const textHead = head === undefined ? workTreeText : blobAt(head);
  const existsHead = head === undefined ? (/** @type {string} */ path) => existsSync(join(top, path)) : existsAt(head);
  const beadExport = textHead(".beads/issues.jsonl");
  if (beadExport === undefined) throw new UsageError("no bead export at .beads/issues.jsonl: the real-bead check needs it");
  const hostNames =
    head === undefined
      ? existsSync(join(top, HOSTS_DIR))
        ? readdirSync(join(top, HOSTS_DIR), { withFileTypes: true })
            .filter((entry) => entry.isFile())
            .map((entry) => `${HOSTS_DIR}${entry.name}`)
        : []
      : gitOut(top, ["ls-tree", "-r", "--name-only", head, "--", HOSTS_DIR], "git ls-tree")
          .split("\n")
          .filter((path) => path !== "" && !path.slice(HOSTS_DIR.length).includes("/"));
  const hostModules = hostNames.filter((path) => /mechanical/i.test(textHead(path) ?? "")).sort();
  /** @type {unknown} */
  let envelope;
  if (options.envelopePath !== undefined) {
    try {
      envelope = JSON.parse(readFileSync(options.envelopePath, "utf8"));
    } catch (error) {
      throw new UsageError(`unreadable gate envelope ${options.envelopePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  const forgeToml = textHead("forge.toml");
  const requiredLegs = options.envelopePath === undefined ? [] : requiredGateLegs(forgeToml ?? "");
  return {
    base,
    head,
    changes: [...changes.values()].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)),
    exists: { base: existsAt(base), head: existsHead },
    text: { base: blobAt(base), head: textHead },
    beadIds: readBeadIds(beadExport),
    hostModules,
    requiredLegs,
    candidate,
    envelope,
  };
}

const USAGE = "usage: node qa/workbench/mwi-release.mjs --base <rev> [--head <rev>] [--commit <rev>] [--gate-envelope <path>]";
const FLAGS = Object.freeze({ "--base": "base", "--head": "head", "--commit": "candidate", "--gate-envelope": "envelopePath" });

/**
 * @param {readonly string[]} argv
 * @returns {{ base: string, head?: string, candidate?: string, envelopePath?: string }}
 */
function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const options = {};
  for (let at = 0; at < argv.length; at += 2) {
    const key = Object.hasOwn(FLAGS, argv[at]) ? FLAGS[/** @type {keyof typeof FLAGS} */ (argv[at])] : undefined;
    const value = argv[at + 1];
    if (key === undefined) throw new UsageError(`unknown argument ${argv[at]}`);
    if (value === undefined || value.startsWith("--")) throw new UsageError(`${argv[at]} needs a value`);
    if (Object.hasOwn(options, key)) throw new UsageError(`${argv[at]} given twice`);
    options[key] = value;
  }
  if (options.base === undefined) throw new UsageError("--base is required");
  if (options.envelopePath !== undefined && options.candidate === undefined) throw new UsageError("--gate-envelope needs --commit");
  return { base: options.base, head: options.head, candidate: options.candidate, envelopePath: options.envelopePath };
}

/**
 * @param {readonly string[]} argv
 * @param {string} [cwd]
 * @returns {number}
 */
export function runCli(argv, cwd = process.cwd()) {
  let cut;
  let verdict;
  try {
    cut = readCutFromGit({ repo: cwd, ...parseArgs(argv) });
    verdict = judgeCut(cut);
  } catch (error) {
    process.stderr.write(`mwi-release: ${error instanceof Error ? error.message : String(error)}\n${USAGE}\n`);
    return 2;
  }
  process.stdout.write(`${JSON.stringify({ contract: CONTRACT, base: cut.base, head: cut.head ?? "working-tree", candidate: cut.candidate ?? null, ...verdict }, null, 2)}\n`);
  return verdict.findings.length > 0 ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = runCli(process.argv.slice(2));
}
