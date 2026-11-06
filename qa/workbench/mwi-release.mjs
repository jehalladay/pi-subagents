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
 * THE RELEASE BLOCK. A release receipt is a per-bead receipt, docs/workbench/receipts/<bead-id>.md. Its release blocks are the
 * fenced code blocks (a backtick or a tilde fence) at the TOP LEVEL of its markdown whose info string, as marked reads it
 * (trimmed), is exactly `mwi-release`: a longer info string (`mwi-releases`, `mwi-release v2`) or another case (`MWI-RELEASE`)
 * is no release block, and a fenced block inside a list item or a blockquote is not read. Every release block is read; the
 * validator does not count blocks per receipt entry. Each non-blank line of a block is one `label: value` field whose label ends
 * at the first colon; blank lines are skipped, and a non-blank line without a label and a repeated label are kept as the block's
 * malformed entries. Its fields:
 *  - the claim: contract (workbench.mwi-release/v1), program, bead, slice (PI-0..PI-7), slice status (design-only, partial, live,
 *    closed), requirements (the EAT ids the cut serves) and real infrastructure gate (a gate name such as PI-DETACHED-GRANTS, or
 *    `none`); a named gate adds gate tier, gate result, gate commit and gate receipt;
 *  - the twelve lines of the program's handoff contract (04-agent-handoff.md, "Handoff contract for each change"); a leg that did
 *    not run says so (`not run: <why>`, or `none`) instead of being left out;
 *  - the red-first legs: red command, red result, first failing assertion, positive rerun, and one `mutant <EAT id>` line per
 *    listed requirement.
 *
 * THE RENDERED VIEW. Every docs rule reads markdown as marked's lexer renders it (renderedText): inline markup (code spans,
 * emphasis, links) reads as its text, the character references &#NN; &#xNN; &amp; &lt; &gt; &quot; &apos; &nbsp; read as the
 * characters they render, a whitespace run reads as one space, and raw HTML (an HTML comment included) reads as nothing. A section
 * is found by its heading's rendered text (markdownSection): an ATX heading with a closing sequence, an indented ATX heading and a
 * setext heading are the same heading, while a heading inside an HTML comment, a fenced block or an indented code block is none.
 *
 * CLI:
 *   node qa/workbench/mwi-release.mjs --base <rev> [--head <rev>] [--commit <rev>] [--gate-envelope <path>]
 * judges the cut <base>..<head> of the Git repository holding the current directory (any directory of its work tree) and prints
 * one workbench.mwi-release/v1 verdict as JSON on stdout. Without --head the head is the working tree, with the untracked files
 * that the repository's ignore rules do not exclude. --commit names the candidate commit, which is the cut's head commit: it needs
 * --head resolving to the same commit. --gate-envelope names the `forge build --json` envelope of the complete gate run on the
 * candidate and needs --commit (EAT-R084). Each flag is given at most once, each with a value.
 *   exit 0: no finding (closure may still be open; the verdict says why)
 *   exit 1: findings
 *   exit 2: a usage error (an unknown, repeated or valueless flag; no --base; --gate-envelope without --commit; --commit without
 *           --head or naming another commit; an unknown revision) or an unreadable input (the gate envelope, the bead export
 *           .beads/issues.jsonl, forge.toml's [build] gate when an envelope is judged)
 *
 * NOT CLAIMED: a live slice or any Mechanical invocation (the validator calls no Mechanical code); a count of release blocks per
 * receipt entry; rendering by any markdown engine other than marked; what a symlink under src/workbench/hosts/ points at (a host
 * file is read as the text Git or the file system gives); a gate envelope's selection accounting, replay or warm-memo state
 * (EAT-R084 reads the invocation's only, skip and path and each required leg's step; its keep_going and verb are not read); a
 * forge run tier declared other than as a [build] gate leg or a [build.commands.<tier>] table of forge.toml; a W11 absence
 * statement written in other words than "no binding host" or "no binding-host" (singular or plural).
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer } from "marked";
import { BEAD_ID, RECEIPT_FILE } from "./receipts-index.mjs";

/** @typedef {{ readonly requirement: string, readonly rule: string, readonly detail: string, readonly receipt?: string }} Finding */
/** @typedef {{ readonly text: string, readonly fields: ReadonlyMap<string, string>, readonly malformed: ReadonlyArray<{ readonly kind: string, readonly line: string }> }} ReleaseBlock */
/** @typedef {{ readonly receiptBead?: string, readonly beadIds: ReadonlySet<string>, readonly fileExists: (path: string) => boolean, readonly forgeTiers: ReadonlySet<string>, readonly candidate?: string }} BlockContext */
/** @typedef {{ readonly path: string, readonly status: string }} Change */
/**
 * @typedef {{
 *   readonly changes: ReadonlyArray<Change>,
 *   readonly exists: { readonly base: (path: string) => boolean, readonly head: (path: string) => boolean },
 *   readonly text: { readonly base: (path: string) => string | undefined, readonly head: (path: string) => string | undefined },
 *   readonly beadIds: ReadonlySet<string>,
 *   readonly hostModules: ReadonlyArray<string>,
 *   readonly forgeTiers: ReadonlySet<string>,
 *   readonly requiredLegs: ReadonlyArray<string>,
 *   readonly candidate?: string,
 *   readonly envelope?: unknown,
 * }} Cut
 */
/** @typedef {{ readonly state: "closable" | "open", readonly reasons: ReadonlyArray<string> }} Closure */
/** @typedef {{ readonly receipts: ReadonlyArray<string>, readonly findings: ReadonlyArray<Finding>, readonly closure: Closure }} CutVerdict */
/** @typedef {{ readonly feature: string, readonly status: string }} W11Row */

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
/**
 * @param {string} item
 * @param {string} field
 * @returns {readonly [string, string]}
 */
function receiptItem(item, field) {
  return Object.freeze(/** @type {[string, string]} */ ([item, field]));
}
/** EAT-R086's ten receipt items, each read from the handoff line that carries it. */
export const RECEIPT_ITEMS = Object.freeze([
  receiptItem("baseline/source", HANDOFF_FIELDS[0]),
  receiptItem("owner", HANDOFF_FIELDS[2]),
  receiptItem("supported installed API", HANDOFF_FIELDS[3]),
  receiptItem("positive/negative", HANDOFF_FIELDS[4]),
  receiptItem("effects/cancel/retention", HANDOFF_FIELDS[6]),
  receiptItem("native IDs", HANDOFF_FIELDS[7]),
  receiptItem("timings", HANDOFF_FIELDS[8]),
  receiptItem("Forge outcomes", HANDOFF_FIELDS[9]),
  receiptItem("docs", HANDOFF_FIELDS[10]),
  receiptItem("blockers", HANDOFF_FIELDS[11]),
]);
/** EAT-R083's red-first legs; the mutant legs are one `mutant <EAT id>` line per listed requirement. */
export const TDD_FIELDS = Object.freeze(["red command", "red result", "first failing assertion", "positive rerun"]);
export const SKILL_PATH = ".agents/skills/pi-mechanical-interop/SKILL.md";
export const FEATURE_MATRIX_PATH = "docs/workbench/feature-matrix.md";
/** The rendered text of the W11 section's heading. */
export const W11_TITLE = "W11: MechanicalWorkflows binding host";
export const W11_HEADING = `## ${W11_TITLE}`;
/** The feature matrix's status vocabulary (its "Status legend": exactly one per row). */
export const MATRIX_STATUSES = Object.freeze(["landed-gated", "partial", "in-progress", "planned", "not-started"]);
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
const FORGE_RUN = "forge run ";
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
/** The plural spelling of the same absence statement. */
const ABSENCE_PLURAL = /\bno binding[- ]hosts\b/i;
/** A W11 heading: a heading whose rendered text begins with the word W11. */
const W11_LIKE = /^W11(?![A-Za-z0-9])/;
const NAMED_REFERENCES = Object.freeze({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " });
const CHARACTER_REFERENCE = /&(?:#([0-9]{1,7})|#[xX]([0-9a-fA-F]{1,6})|(amp|lt|gt|quot|apos|nbsp));/g;

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Every top-level fenced block of `markdown` whose info string is exactly BLOCK_INFO, read into its fields. A non-blank line
 * without a label and a repeated label are kept as the block's malformed entries, never silently dropped; blank lines are skipped.
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
    blocks.push(Object.freeze({ text: String(token.text), fields, malformed: Object.freeze(malformed) }));
  }
  return blocks;
}

/**
 * The seams a command names: each test file path under test/ that ends in .test.ts or .census.ts (an optional ./ prefix is
 * dropped) and each `forge run <tier>` with a lower-case tier name. A seam is real when the head tree holds its file, or when
 * forge.toml declares its tier (declaredForgeTiers).
 * @param {string} command
 * @returns {string[]}
 */
function seamsOf(command) {
  const seams = [...command.matchAll(SEAM_PATH)].map((match) => match[1]);
  for (const match of command.matchAll(FORGE_TIER)) seams.push(`forge run ${match[1]}`);
  return [...new Set(seams)];
}

/**
 * Judges one release block (EAT-R083, EAT-R085, EAT-R086). The bead export and the declared forge run tiers are required: the
 * real-bead and the real-seam checks are never skipped.
 * @param {ReleaseBlock} block
 * @param {BlockContext} ctx
 * @returns {Finding[]}
 */
export function receiptBlockFindings(block, ctx) {
  if (!(ctx?.beadIds instanceof Set)) throw new TypeError("receiptBlockFindings needs the bead export as a Set of real bead ids");
  if (typeof ctx.fileExists !== "function") throw new TypeError("receiptBlockFindings needs a fileExists reader for the seam paths");
  if (!(ctx.forgeTiers instanceof Set)) throw new TypeError("receiptBlockFindings needs the declared forge run tiers as a Set (declaredForgeTiers)");
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
    for (const seam of seams) {
      const real = seam.startsWith(FORGE_RUN) ? ctx.forgeTiers.has(seam.slice(FORGE_RUN.length)) : ctx.fileExists(seam);
      if (!real) add("EAT-R083", "seam-missing", seam);
    }
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
 * The legs of forge.toml's [build] gate: the one-line `gate = [...]` array of the [build] table itself (never of a [build.<x>]
 * table); [] when the table declares none.
 * @param {string} toml
 * @returns {string[]}
 */
function gateLegsOf(toml) {
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
    return [...match[1].matchAll(/"([^"]+)"/g)].map((leg) => leg[1]);
  }
  return [];
}

/**
 * The legs of forge.toml's [build] gate (gateLegsOf), the complete gate of record. Fails closed when none is declared.
 * @param {string} toml
 * @returns {string[]}
 */
export function requiredGateLegs(toml) {
  const legs = gateLegsOf(toml);
  if (legs.length === 0) throw new Error("forge.toml declares no [build] gate legs");
  return legs;
}

/**
 * The forge run tiers forge.toml declares: each leg of its [build] gate and each [build.commands.<tier>] table.
 * @param {string} toml
 * @returns {Set<string>}
 */
export function declaredForgeTiers(toml) {
  const tiers = new Set(gateLegsOf(toml));
  for (const raw of toml.split("\n")) {
    const match = /^\[build\.commands\.([A-Za-z0-9_-]+)\]\s*(?:#.*)?$/.exec(raw.trim());
    if (match !== null) tiers.add(match[1]);
  }
  return tiers;
}

/**
 * EAT-R084: "Read machine receipt keyed to exact candidate commit with required Forge build legs; failed/not-run gate or receipt
 * for another commit refuses close. No CI substitution." Mutant: "Accept exit echo or an old commit gate as this cut PASS."
 * `envelope` is the parsed `forge build --json` result envelope of the complete gate. It passes only when it is a forge build
 * result-envelope/v1 envelope with a data record, its data.gated_commit is the candidate, its status is success, its
 * data.gate_verdict is PASS and data.gate_passed is true, each required leg has exactly one step and its status is passed, its
 * data.invocation is present with only and skip as empty lists and path . (the package root), and ids.command_id is a cmd_ id
 * (cmd_ and twelve lower-case hex digits).
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
    add("gate-not-forge-build", `not a forge build ${FORGE_CONTRACT} envelope with a data record: an exit echo or a CI record is no machine gate receipt`);
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
    else if (steps.filter((each) => each.name === leg).length > 1) add("gate-leg-duplicated", `the required leg ${leg} has more than one step`);
  }
  const invocation = isRecord(data.invocation) ? data.invocation : undefined;
  const narrowed = (/** @type {string} */ key) => !Array.isArray(invocation?.[key]) || invocation[key].length > 0;
  if (invocation === undefined || narrowed("only") || narrowed("skip")) add("gate-narrowed", "the envelope shows no complete gate: data.invocation must be present with empty only and skip lists (no --only, no --skip)");
  else if (invocation.path !== ".") add("gate-narrowed", `the gate ran at path ${String(invocation.path)}, not at the package root .`);
  const commandId = isRecord(envelope.ids) ? envelope.ids.command_id : undefined;
  if (typeof commandId !== "string" || !COMMAND_ID.test(commandId)) add("gate-no-command-id", "the envelope carries no cmd_ command id (cmd_ and twelve lower-case hex digits)");
  return findings;
}

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>[]}
 */
function tokenList(value) {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

/**
 * Every token under `tokens`, depth first: nested block and inline tokens, list items and table cells included.
 * @param {unknown} tokens
 * @returns {Generator<Record<string, unknown>, void, undefined>}
 */
function* walkTokens(tokens) {
  for (const token of tokenList(tokens)) {
    yield token;
    yield* walkTokens(token.tokens);
    yield* walkTokens(token.items);
    if (token.type === "table") {
      for (const cell of tokenList(token.header)) yield* walkTokens(cell.tokens);
      for (const row of Array.isArray(token.rows) ? token.rows : []) for (const cell of tokenList(row)) yield* walkTokens(cell.tokens);
    }
  }
}

/**
 * Text with its character references read as the characters they render (an out-of-range number is kept as written).
 * @param {string} text
 * @returns {string}
 */
function decodeReferences(text) {
  return text.replace(CHARACTER_REFERENCE, (whole, decimal, hex, name) => {
    if (name !== undefined) return NAMED_REFERENCES[/** @type {keyof typeof NAMED_REFERENCES} */ (name)];
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : Number.parseInt(hex, 16);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
  });
}

/** @param {string} text */
const oneLine = (text) => text.replace(/\s+/g, " ").trim();

/**
 * The rendered text of inline tokens: markup reads as its text, raw HTML as nothing, a line break as a space; character references
 * are decoded in text, never in a code span.
 * @param {unknown} tokens
 * @returns {string}
 */
function inlineText(tokens) {
  let text = "";
  for (const token of tokenList(tokens)) {
    if (token.type === "html") continue;
    if (token.type === "br") text += " ";
    else if (token.type === "codespan" || token.type === "escape") text += String(token.text ?? "");
    else if (Array.isArray(token.tokens)) text += inlineText(token.tokens);
    else text += decodeReferences(String(token.text ?? ""));
  }
  return text;
}

/**
 * The rendered cells of a table token, one array per row: its header row first, then every body row.
 * @param {Record<string, unknown>} table
 * @returns {string[][]}
 */
function tableCells(table) {
  const cells = (/** @type {unknown} */ row) => tokenList(row).map((cell) => oneLine(inlineText(cell.tokens)));
  return [cells(table.header), ...(Array.isArray(table.rows) ? table.rows : []).map(cells)];
}

/**
 * The rendered lines of block tokens: one line per heading, paragraph, code block, table row (its cells joined by " | ") and
 * list item; a blockquote's lines are its blocks' lines; raw HTML gives none.
 * @param {unknown} tokens
 * @returns {string[]}
 */
function blockLines(tokens) {
  /** @type {string[]} */
  const lines = [];
  for (const token of tokenList(tokens)) {
    if (token.type === "table") lines.push(...tableCells(token).map((row) => row.join(" | ")));
    else if (token.type === "list") lines.push(...tokenList(token.items).map((item) => blockLines(item.tokens).join(" ")));
    else if (token.type === "blockquote") lines.push(...blockLines(token.tokens));
    else if (token.type === "code") lines.push(String(token.text ?? ""));
    else if (token.type === "heading" || token.type === "paragraph" || token.type === "text") lines.push(Array.isArray(token.tokens) ? inlineText(token.tokens) : decodeReferences(String(token.text ?? "")));
  }
  return lines.map(oneLine).filter((line) => line !== "");
}

/**
 * The rendered view of markdown as text (THE RENDERED VIEW above): one line per block, table row and list item.
 * @param {string} markdown
 * @returns {string}
 */
export function renderedText(markdown) {
  return blockLines(Lexer.lex(markdown)).join("\n");
}

/**
 * The rendered text of every heading of markdown, at any depth and at any nesting (a heading in a blockquote or a list item too).
 * @param {string} markdown
 * @returns {string[]}
 */
export function headingTexts(markdown) {
  /** @type {string[]} */
  const texts = [];
  for (const token of walkTokens(Lexer.lex(markdown))) if (token.type === "heading") texts.push(oneLine(inlineText(token.tokens)));
  return texts;
}

/**
 * The section of markdown under the one heading whose rendered text is `title`: that heading's markdown and every top-level
 * token after it up to the next top-level level-1 or level-2 heading (a level-3 or deeper heading belongs to the section). It is
 * undefined unless exactly one heading of markdown (headingTexts) reads `title` and that heading is a top-level level-2 heading.
 * @param {string} markdown
 * @param {string} title
 * @returns {string | undefined}
 */
export function markdownSection(markdown, title) {
  if (headingTexts(markdown).filter((text) => text === title).length !== 1) return undefined;
  const tokens = tokenList(Lexer.lex(markdown));
  /** @param {Record<string, unknown> | undefined} token */
  const depthOf = (token) => (token?.type === "heading" && typeof token.depth === "number" ? token.depth : Number.POSITIVE_INFINITY);
  const start = tokens.findIndex((token) => depthOf(token) === 2 && oneLine(inlineText(token.tokens)) === title);
  if (start < 0) return undefined;
  let end = start + 1;
  while (end < tokens.length && depthOf(tokens[end]) > 2) end += 1;
  return tokens
    .slice(start, end)
    .map((token) => String(token.raw ?? ""))
    .join("");
}

/**
 * The rendered text of every W11 heading of the feature matrix: each heading (any depth, any nesting) whose rendered text begins
 * with the word W11.
 * @param {string} matrix
 * @returns {string[]}
 */
export function w11Headings(matrix) {
  return headingTexts(matrix).filter((text) => W11_LIKE.test(text));
}

/**
 * The W11 section of the feature matrix: markdownSection(matrix, W11_TITLE) when the matrix holds exactly one W11 heading
 * (w11Headings), undefined otherwise.
 * @param {string} matrix
 * @returns {string | undefined}
 */
export function w11Section(matrix) {
  return w11Headings(matrix).length === 1 ? markdownSection(matrix, W11_TITLE) : undefined;
}

/**
 * Every body row of every table of a W11 section (a table nested in a blockquote or a list item too), in the rendered view: the
 * cells under its header cells reading Feature and Status ("" when the table has no such header cell).
 * @param {string} section
 * @returns {W11Row[]}
 */
export function w11Rows(section) {
  /** @type {W11Row[]} */
  const rows = [];
  for (const token of walkTokens(Lexer.lex(section))) {
    if (token.type !== "table") continue;
    const [header = [], ...body] = tableCells(token);
    const feature = header.indexOf("Feature");
    const status = header.indexOf("Status");
    for (const cells of body) rows.push(Object.freeze({ feature: feature < 0 ? "" : (cells[feature] ?? ""), status: status < 0 ? "" : (cells[status] ?? "") }));
  }
  return rows;
}

/**
 * The Status cell of every row of a W11 section's tables (w11Rows).
 * @param {string} section
 * @returns {string[]}
 */
export function w11Statuses(section) {
  return w11Rows(section).map((row) => row.status);
}

/**
 * The raw HTML a W11 section holds: block HTML, HTML comments and inline HTML alike.
 * @param {string} section
 * @returns {string[]}
 */
export function w11Html(section) {
  /** @type {string[]} */
  const html = [];
  for (const token of walkTokens(Lexer.lex(section))) if (token.type === "html") html.push(String(token.raw ?? ""));
  return html;
}

/**
 * EAT-R082's W11 rules over the base and head W11 sections (w11Section), each read in the rendered view. `witnessed` is true when
 * the cut holds a live or closed slice claim judged against a candidate commit whose named producer gate passed at that candidate
 * (the claim has no EAT-R085 finding).
 *  - w11-landed-gated-unwitnessed: a head row reads landed-gated while no base row with the same Feature cell does, unwitnessed;
 *  - w11-status-unknown: a head row's Status cell is none of MATRIX_STATUSES ("" when its table has no Status column);
 *  - w11-html: the head section holds raw HTML (its rendered view would not be its whole text);
 *  - w11-absence-stale: the head section states that no binding host exists (the words "no binding host" or "no binding-host",
 *    singular or plural, in any case) while a host module names MechanicalWorkflows.
 * @param {{ readonly baseSection?: string, readonly headSection?: string, readonly hostModules: ReadonlyArray<string>, readonly witnessed: boolean }} input
 * @returns {Finding[]}
 */
export function w11Findings(input) {
  /** @type {Finding[]} */
  const findings = [];
  const head = input.headSection ?? "";
  const baseRows = w11Rows(input.baseSection ?? "");
  const headRows = w11Rows(head);
  const turnedLanded = headRows.some((row) => row.status === "landed-gated" && !baseRows.some((was) => was.feature === row.feature && was.status === "landed-gated"));
  if (turnedLanded && !input.witnessed) {
    findings.push(Object.freeze({ requirement: "EAT-R082", rule: "w11-landed-gated-unwitnessed", detail: "W11 turned landed-gated without a live or closed slice claim whose producer gate passed at the candidate: source existence or one fixture alone never lands W11" }));
  }
  for (const row of headRows) {
    if (!MATRIX_STATUSES.includes(row.status)) findings.push(Object.freeze({ requirement: "EAT-R082", rule: "w11-status-unknown", detail: `W11 row '${row.feature}' reads status '${row.status}', none of ${MATRIX_STATUSES.join(", ")}` }));
  }
  const html = w11Html(head);
  if (html.length > 0) findings.push(Object.freeze({ requirement: "EAT-R082", rule: "w11-html", detail: `the W11 section holds raw HTML (${html.length} token(s)), so its rendered view is not its whole text` }));
  const headText = renderedText(head);
  if (input.hostModules.length > 0 && (ABSENCE.test(headText) || ABSENCE_PLURAL.test(headText))) {
    findings.push(Object.freeze({ requirement: "EAT-R082", rule: "w11-absence-stale", detail: `W11 states that no binding host exists while ${input.hostModules.join(", ")} names MechanicalWorkflows` }));
  }
  return findings;
}

/**
 * Judges a cut base..head: EAT-R087 over its added and immutable paths; EAT-R082/R083/R085/R086 over each release block of a
 * changed per-bead receipt that the receipt did not already hold at the cut base, text for text (an appended, an inserted and an
 * edited block alike; a block the base already holds is not judged again); the W11 rules and the W11 heading's uniqueness; and
 * EAT-R084 over the machine gate envelope when one is supplied.
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
  // Each pointer of each judged block: a pointer present at base or head must change in the cut (W11: its rendered section, so an
  // edit that changes no rendered text is no update; the skill: its file; the program docs: any path under the directory) and be
  // named on the block's docs line; a pointer absent at base and head refuses a live or closed claim and must be named on the
  // blockers line of any other claim.
  const headMatrix = cut.text.head(FEATURE_MATRIX_PATH);
  const sections = { base: w11Section(cut.text.base(FEATURE_MATRIX_PATH) ?? ""), head: w11Section(headMatrix ?? "") };
  const w11 = { base: sections.base === undefined ? undefined : renderedText(sections.base), head: sections.head === undefined ? undefined : renderedText(sections.head) };
  let witnessed = false;
  let unkeyed = false;
  for (const change of cut.changes) {
    if (change.status === "D" || !change.path.startsWith(RECEIPTS_DIR)) continue;
    const match = RECEIPT_FILE.exec(change.path.slice(RECEIPTS_DIR.length));
    if (match === null) continue;
    const before = change.status === "A" ? [] : parseReleaseBlocks(cut.text.base(change.path) ?? "").map((block) => block.text);
    const added = parseReleaseBlocks(cut.text.head(change.path) ?? "").filter((block) => {
      const at = before.indexOf(block.text);
      if (at >= 0) before.splice(at, 1);
      return at < 0;
    });
    if (added.length === 0) continue;
    receipts.push(change.path);
    for (const block of added) {
      const blockFindings = receiptBlockFindings(block, { receiptBead: match[1], beadIds: cut.beadIds, fileExists: (path) => cut.exists.head(path), forgeTiers: cut.forgeTiers, candidate: cut.candidate });
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
  for (const finding of w11Findings({ baseSection: sections.base, headSection: sections.head, hostModules: cut.hostModules, witnessed })) keep(finding, undefined);
  if (headMatrix !== undefined && sections.head === undefined) {
    keep({ requirement: "EAT-R082", rule: "w11-heading-not-unique", detail: `${FEATURE_MATRIX_PATH} must hold exactly one W11 heading, the level-2 heading '${W11_TITLE}'; it holds ${JSON.stringify(w11Headings(headMatrix))}` }, undefined);
  }

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
 * Reads the cut <base>..<head> (head undefined: the working tree, untracked files included unless ignored) of the repository
 * holding `repo`. The host modules are the files under src/workbench/hosts/, at any depth (the working tree: every tracked and
 * every untracked, not ignored file; a committed head: every blob git ls-tree -r lists), whose text holds the word mechanical in
 * any case: a host module that names MechanicalWorkflows (MechanicalWorkflows, @mechanical/workflows-development).
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
  if (candidate !== undefined && candidate !== head) throw new UsageError(`--commit ${options.candidate} is not the cut's head commit (${options.head === undefined ? "no --head names one" : `--head ${options.head}`}): the candidate is the head of the cut`);
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
  const hostListing = head === undefined ? ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", HOSTS_DIR] : ["ls-tree", "-r", "-z", "--name-only", head, "--", HOSTS_DIR];
  const hostNames = gitOut(top, hostListing, "git host listing")
    .split("\0")
    .filter((path) => path !== "");
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
    forgeTiers: declaredForgeTiers(forgeToml ?? ""),
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
