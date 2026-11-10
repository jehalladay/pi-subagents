/**
 * wb-mit9 [MNI-2026-11-09 P00b]: the judges of the historical requirement status ledger (EAT-R202) and the re-pin record
 * (EAT-R201) of the mechanical-native-interoperability-2026-11-09 program. The requirement text is
 * docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents
 * master 18b016b2b3e4efd947d1afc817d5f37bd75952bc (blob 1fbe1b8e4eff; master only at the claim base).
 *
 * The committed data are test/fixtures/mechanical-historical-status-ledger.json (one row per EAT-R001..EAT-R200) and
 * test/fixtures/mechanical-repin-record.json. test/workbench-mechanical-status-ledger.test.ts runs these judges over both
 * files, over the repository tree and over the Beads export, and feeds each judge the planted inputs it must refuse; the
 * census leg test/workbench-mechanical-status-ledger.census.ts judges the ledger's tested forms over the gate's own test
 * report (wb-u62 report mode).
 *
 * Pure node: no src/ or dist/ import. The judges are pure functions of their inputs; only readBeadExport (through
 * qa/workbench/tracker-export.mjs), treeReader and the CLI touch the file system, and none of them writes.
 *
 * WHAT THE JUDGES READ. ledgerFindings reads a ledger, a map of Beads records (id -> title, text, parent), a reader of
 * repository files and a reader of rendered markdown sections (sectionReader over docsSection of test/helpers/census.ts,
 * the program's one docs reader). repinFindings reads a re-pin record. staleRepin compares a record with a measurement of
 * the same refs. Each finding is one string that starts with its rule id (L-* for the ledger, R-* for the record); no
 * finding means the input passes every rule listed at that function, read as that list words it.
 *
 * NOT CLAIMED by these judges: that a row's class is the true state of the program (the class is the ledger author's
 * reading of the receipts, tests and Beads records the row cites); that a tested form is a case the default tier registers,
 * runs, passes or asserts (no judge here reads a case; the census leg does, in report mode); that an anchor proves the
 * class it supports; that a markdown anchor is visible anywhere but in the rendered text of its named section; anything a
 * raw-text anchor of a file that is not markdown, or of a Beads record, means beyond its bytes being present; a re-run of
 * any cited test; the requirement titles against the master documents (those trees are not on trunk); any Beads state
 * beyond the export files this module reads.
 *
 * CLI:
 *   node qa/workbench/mechanical-status-ledger.mjs [--root <dir>]
 * judges the two committed files under <dir> (default: the repository holding this module) with the docs reader of the
 * test/helpers/census.ts beside this module, and prints one JSON object {ledger: [...findings], record: [...findings]};
 * exit 0 when both lists are empty, 1 otherwise, 2 on a usage error or an unreadable input.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MAIN_EXPORT, trackerExportText } from "./tracker-export.mjs";

export const LEDGER_SCHEMA = "workbench.mechanical-status-ledger/v1";
export const RECORD_SCHEMA = "workbench.mechanical-repin-record/v1";
export const LEDGER_PATH = "test/fixtures/mechanical-historical-status-ledger.json";
export const RECORD_PATH = "test/fixtures/mechanical-repin-record.json";

export const TESTED = "already-implemented/tested";
export const PARTIAL = "partial/inert";
export const BLOCKED = "blocked";
/** EAT-R202 AC1: the three classes, spelled as the requirement spells them. */
export const CLASSES = Object.freeze([TESTED, PARTIAL, BLOCKED]);
/** The kinds a blocked row names: an external producer deliverable, an open Pi dependency, an unratified joint contract, or no open owner. */
export const BLOCKER_KINDS = Object.freeze(["external", "dependency", "unratified", "unowned"]);
/** EAT-R201 AC2: the four change classes. */
export const CHANGE_CLASSES = Object.freeze(["merged", "machine-only", "historical", "proposed"]);

/** EAT-R202 AC1: every identifier EAT-R001..EAT-R200, in order. */
export const HISTORICAL_IDS = Object.freeze(Array.from({ length: 200 }, (_, i) => `EAT-R${String(i + 1).padStart(3, "0")}`));
/** EAT-R202 AC2: the rows that must separate their fixed, scoped forms from the pending parked per-agent skip/retry. */
export const AC2_ROWS = Object.freeze(["EAT-R001", "EAT-R002", "EAT-R003", "EAT-R012", "EAT-R013", "EAT-R014"]);
/** EAT-R202 AC2: the run-wide control that must make the same separation. */
export const AC2_CONTROL = "F10";
/** The epic whose children carry the BEAD-PLAN groups in the Beads export. */
export const GROUP_EPIC = "wb-1a3t";
/** The 25 planning groups of the 2026-11-04 BEAD-PLAN; the ledger's other groups are the delta's master-recon and the MW tracks. */
export const PLAN_GROUPS = Object.freeze([
  "B-preserve",
  "B-docs",
  "B-unknowns",
  "B-release",
  "B-contract-choice",
  "B-descriptor",
  "B-source",
  "B-authority",
  "B-detached-grants",
  "B-replay",
  "B-cancel-repro",
  "B-limits",
  "B-dispatch",
  "B-outcomes",
  "B-effects",
  "B-controls",
  "B-observe",
  "B-telemetry",
  "B-git-census",
  "B-hx-evidence",
  "B-hx-admit",
  "B-rf-admit",
  "B-detached-function",
  "B-furnace-function",
  "B-coordination",
]);
export const EXTRA_GROUPS = Object.freeze(["master-recon", "mw-tracks"]);

const SHA = /^[0-9a-f]{40}$/;
const BEAD_ID = /^wb-[0-9a-z]+(?:\.[0-9]+)*$/;
const SUCCESSOR = /^EAT-R(\d{3})$/;
/**
 * EAT-R202 AC2: "no row says that WorktreePreservationFailedResult contains byte data". A string is refused when, within one
 * run of text without a period, it names the type, then one of the containing verbs of BYTES_VERBS, then byte or bytes. A
 * verb outside BYTES_VERBS is not read.
 */
export const BYTES_VERBS = Object.freeze(["contain", "contains", "embed", "embeds", "carry", "carries", "hold", "holds", "include", "includes", "store", "stores", "pack", "packs", "wrap", "wraps"]);
export const BYTES_CLAIM = new RegExp(`WorktreePreservationFailedResult\\b[^.]*\\b(?:${BYTES_VERBS.join("|")})\\b[^.]*\\bbytes?\\b`, "i");

/** @param {unknown} value @returns {value is Record<string, unknown>} */
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** @param {unknown} value @returns {value is string} */
function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/** Every string inside a value, depth first, with its key path. @param {unknown} value @param {string} at @returns {Array<[string, string]>} */
function strings(value, at) {
  if (typeof value === "string") return [[at, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => strings(item, `${at}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => strings(item, `${at}.${key}`));
  return [];
}

/** @param {unknown} value @returns {value is {heading: string, depth: number, parents: string[]}} */
function isSection(value) {
  return (
    isObject(value) &&
    isText(value.heading) &&
    Number.isInteger(value.depth) &&
    /** @type {number} */ (value.depth) >= 1 &&
    /** @type {number} */ (value.depth) <= 6 &&
    Array.isArray(value.parents) &&
    value.parents.every(isText)
  );
}

/**
 * An evidence or source item: {path, section, anchor} names a markdown file and one of its sections, whose rendered text
 * holds the anchor; {path, anchor} names any other repository file, whose raw text holds it; {bead, anchor} names a Beads
 * record whose description or notes hold it as raw text.
 * @param {unknown} item @param {string} where @param {LedgerContext} context @returns {string[]}
 */
function anchorFindings(item, where, context) {
  if (!isObject(item) || !isText(item.anchor)) return [`L-EVIDENCE: ${where} has no anchor`];
  const anchor = /** @type {string} */ (item.anchor);
  if (isText(item.path)) {
    const path = /** @type {string} */ (item.path);
    const text = context.readFile(path);
    if (text === null) return [`L-EVIDENCE: ${where} names ${path}, which the tree does not hold`];
    if (!path.endsWith(".md")) return text.includes(anchor) ? [] : [`L-EVIDENCE: ${where} anchor not found in ${path}: ${anchor}`];
    if (!isSection(item.section)) return [`L-EVIDENCE: ${where} names the markdown file ${path} without a section (heading, depth and parent headings)`];
    const section = context.readSection(text, item.section);
    if (!section.ok) return [`L-EVIDENCE: ${where} section of ${path} is not bound: ${section.why}`];
    return section.text.includes(anchor) ? [] : [`L-EVIDENCE: ${where} anchor not found in the rendered section "${item.section.heading}" of ${path}: ${anchor}`];
  }
  if (isText(item.bead)) {
    const record = context.beads.get(/** @type {string} */ (item.bead));
    if (record === undefined) return [`L-EVIDENCE: ${where} names ${item.bead}, which the Beads export does not hold`];
    return record.text.includes(anchor) ? [] : [`L-EVIDENCE: ${where} anchor not found in ${item.bead}: ${anchor}`];
  }
  return [`L-EVIDENCE: ${where} names neither a path nor a bead`];
}

/**
 * A reader of one rendered markdown section through docsSection(markdown, heading, depth, parents) of
 * test/helpers/census.ts: the section binds when docsSection binds it, and its text is its heading, then the rendered text
 * of each block docsSection returns (a paragraph: its text; a list: its items' text; never a block's markdown source, so
 * an inline HTML comment inside a paragraph or a list item renders nothing, and an HTML block renders nothing).
 * @param {(markdown: string, heading: string, depth: number, parents: readonly string[]) => {ok: boolean, why: string, blocks: ReadonlyArray<{kind: string, text?: string, items?: ReadonlyArray<{text: string}>}>}} docsSection
 * @returns {(markdown: string, section: {heading: string, depth: number, parents: string[]}) => {ok: boolean, text: string, why: string}}
 */
export function sectionReader(docsSection) {
  /** One reading per markdown text and section: a section is read again only when its file's text differs. @type {Map<string, Map<string, {ok: boolean, text: string, why: string}>>} */
  const read = new Map();
  return (markdown, section) => {
    const key = JSON.stringify([section.heading, section.depth, section.parents]);
    const known = read.get(markdown)?.get(key);
    if (known !== undefined) return known;
    const bound = docsSection(markdown, section.heading, section.depth, section.parents);
    const blocks = bound.ok ? bound.blocks.map(block => (block.kind === "list" ? (block.items ?? []).map(entry => entry.text).join("\n") : (block.text ?? ""))) : [];
    const reading = bound.ok ? { ok: true, text: [section.heading, ...blocks].join("\n"), why: "" } : { ok: false, text: "", why: bound.why };
    if (!read.has(markdown)) read.set(markdown, new Map());
    read.get(markdown)?.set(key, reading);
    return reading;
  };
}

/**
 * @typedef {{
 *   beads: Map<string, {title: string, text: string, parent: string | null}>,
 *   readFile: (path: string) => string | null,
 *   readSection: (markdown: string, section: {heading: string, depth: number, parents: string[]}) => {ok: boolean, text: string, why: string},
 * }} LedgerContext
 */

/**
 * The ledger's rule groups, each finding prefixed with its rule (each line says exactly what its rule reads):
 *  L-SCHEMA   the schema string is LEDGER_SCHEMA; pins.pi.commit and pins.mw.commit are 40-hex; rows is an array of objects;
 *  L-IDS      the row ids are HISTORICAL_IDS exactly: each once, in order, none missing, none extra; the order finding is
 *             given only when no other L-IDS finding is;
 *  L-EXPORT   every id the description or notes of a GROUP_EPIC child in the Beads export names, written EAT-R and three
 *             digits not followed by a fourth, whose number is 1 to 200, has a row;
 *  L-CLASS    each row's class is one of CLASSES;
 *  L-PIN      each row's pin.pi and pin.mw are 40-hex and equal the ledger's pins.pi.commit and pins.mw.commit;
 *  L-BEAD     each row's bead is "none" (L-BEAD reads no further; L-GROUP still asks for the group's bead) or a wb- id the
 *             Beads export holds, and that record's description or notes hold the row id as text;
 *  L-GROUP    each row's group is a label of ledger.groups, whose bead it carries; each ledger group is a PLAN_GROUPS or EXTRA_GROUPS
 *             label, its bead is held by the export, its tag starts that bead's export title, and its tag is the [MWI-*] title
 *             tag of a GROUP_EPIC child in the export; every PLAN_GROUPS label has a ledger group (a GROUP_EPIC child filed later,
 *             with a tag no ledger group carries, is not read);
 *  L-TESTED   a tested row (and a tested control) names at least one tested form, and each form is an object whose file is a
 *             path the tree holds, whose title is a non-empty string and whose suite is an array of non-empty strings; no case
 *             text is read here (the census leg judges each form in report mode);
 *  L-PARTIAL  a partial/inert row carries partialBecause with a non-empty text and a source item that resolves as L-EVIDENCE reads one;
 *  L-BLOCKED  a blocked row carries blockedBy with a kind of BLOCKER_KINDS and a non-empty detail;
 *  L-EVIDENCE each row cites at least one evidence item and every item resolves: its anchor is a non-empty string; a path ending
 *             in .md names a section (heading, depth 1-6, parent headings) that readSection binds and whose rendered text holds
 *             the anchor; a path to any other file names a file the tree holds whose raw text holds it; a bead names a record the
 *             export holds whose description or notes hold it as raw text; an item naming neither a path nor a bead is refused;
 *  L-AC2      each AC2_ROWS row and the AC2_CONTROL control carry a non-empty fixedForms entry and a pending sentence holding the
 *             words parked, skip or retry and pending (lower case, each a whole word) and the text wb-9v02, and the control
 *             exists;
 *  L-BYTES    no string member of a row or of a control, at any depth, matches BYTES_CLAIM;
 *  L-SUMMARY  summary.rows and summary.byClass equal the rows; summary.planGroups is 25; summary.planGroupsComplete and
 *             planGroupsCompleteLabels equal the plan groups whose every row is already-implemented/tested;
 *  L-SUCCESSORS each row's successors is an array, each successor an EAT-R201..EAT-R310 id, none twice.
 * @param {unknown} ledger
 * @param {LedgerContext} context
 * @returns {string[]}
 */
export function ledgerFindings(ledger, context) {
  const { beads, readFile } = context;
  if (!isObject(ledger)) return ["L-SCHEMA: the ledger is not an object"];
  const findings = [];
  if (ledger.schema !== LEDGER_SCHEMA) findings.push(`L-SCHEMA: schema is not ${LEDGER_SCHEMA}`);
  const pins = isObject(ledger.pins) ? ledger.pins : {};
  const piPin = isObject(pins.pi) ? pins.pi.commit : undefined;
  const mwPin = isObject(pins.mw) ? pins.mw.commit : undefined;
  if (typeof piPin !== "string" || !SHA.test(piPin)) findings.push("L-SCHEMA: pins.pi.commit is not a 40-hex commit");
  if (typeof mwPin !== "string" || !SHA.test(mwPin)) findings.push("L-SCHEMA: pins.mw.commit is not a 40-hex commit");
  if (!Array.isArray(ledger.rows)) return [...findings, "L-SCHEMA: rows is not an array"];
  const rows = ledger.rows.filter(isObject);
  if (rows.length !== ledger.rows.length) findings.push("L-SCHEMA: a row is not an object");

  const ids = rows.map(row => row.id);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) findings.push(`L-IDS: ${id} has more than one row`);
    seen.add(id);
  }
  for (const id of HISTORICAL_IDS) if (!seen.has(id)) findings.push(`L-IDS: ${id} has no row`);
  for (const id of ids) if (!HISTORICAL_IDS.includes(/** @type {string} */ (id))) findings.push(`L-IDS: ${id} is not EAT-R001..EAT-R200`);
  if (findings.every(finding => !finding.startsWith("L-IDS")) && ids.some((id, index) => id !== HISTORICAL_IDS[index])) {
    findings.push("L-IDS: the rows are not in EAT-R001..EAT-R200 order");
  }
  const named = new Set();
  for (const record of beads.values()) {
    if (record.parent !== GROUP_EPIC) continue;
    for (const match of record.text.matchAll(/EAT-R(\d{3})(?!\d)/g)) if (Number(match[1]) >= 1 && Number(match[1]) <= 200) named.add(match[0]);
  }
  for (const id of [...named].sort()) if (!seen.has(id)) findings.push(`L-EXPORT: ${id} is named by a ${GROUP_EPIC} child in the Beads export but has no row`);

  const groups = Array.isArray(ledger.groups) ? ledger.groups.filter(isObject) : [];
  const groupByLabel = new Map(groups.map(group => [group.label, group]));
  for (const group of groups) {
    const label = group.label;
    if (!PLAN_GROUPS.includes(/** @type {string} */ (label)) && !EXTRA_GROUPS.includes(/** @type {string} */ (label))) {
      findings.push(`L-GROUP: ${label} is not a BEAD-PLAN group or a delta group`);
    }
    const record = typeof group.bead === "string" ? beads.get(group.bead) : undefined;
    if (record === undefined) findings.push(`L-GROUP: ${label} names ${group.bead}, which the Beads export does not hold`);
    else if (!isText(group.tag) || !record.title.startsWith(/** @type {string} */ (group.tag))) {
      findings.push(`L-GROUP: ${label}'s tag ${group.tag} does not start the title of ${group.bead}`);
    }
  }
  const exportTags = new Set();
  for (const record of beads.values()) {
    if (record.parent !== GROUP_EPIC) continue;
    const tag = /^\[MWI-[a-z-]+\]/.exec(record.title);
    if (tag) exportTags.add(tag[0]);
  }
  for (const group of groups) {
    if (!exportTags.has(group.tag)) findings.push(`L-GROUP: the ledger tag ${group.tag} is no ${GROUP_EPIC} child tag in the export`);
  }
  for (const label of PLAN_GROUPS) if (!groupByLabel.has(label)) findings.push(`L-GROUP: the BEAD-PLAN group ${label} has no ledger group`);

  for (const row of rows) {
    const id = String(row.id);
    if (!CLASSES.includes(/** @type {string} */ (row.class))) findings.push(`L-CLASS: ${id} class ${row.class} is not one of the three`);
    const pin = isObject(row.pin) ? row.pin : {};
    if (pin.pi !== piPin || typeof pin.pi !== "string" || !SHA.test(pin.pi)) findings.push(`L-PIN: ${id} pin.pi is not the ledger's Pi pin`);
    if (pin.mw !== mwPin || typeof pin.mw !== "string" || !SHA.test(pin.mw)) findings.push(`L-PIN: ${id} pin.mw is not the ledger's MW pin`);

    if (row.bead !== "none") {
      if (typeof row.bead !== "string" || !BEAD_ID.test(row.bead)) findings.push(`L-BEAD: ${id} bead ${row.bead} is not a wb- id or none`);
      else {
        const record = beads.get(row.bead);
        if (record === undefined) findings.push(`L-BEAD: ${id} names ${row.bead}, a fabricated id the Beads export does not hold`);
        else if (!record.text.includes(id)) findings.push(`L-BEAD: ${id} is not named by the description or notes of ${row.bead}`);
      }
    }
    const group = groupByLabel.get(row.group);
    if (group === undefined) findings.push(`L-GROUP: ${id} group ${row.group} is an unmapped label`);
    else if (group.bead !== row.bead) findings.push(`L-GROUP: ${id} bead ${row.bead} is not its group's bead ${group.bead}`);

    const forms = Array.isArray(row.testedForms) ? row.testedForms : [];
    if (row.class === TESTED && forms.length === 0) findings.push(`L-TESTED: ${id} is tested but names no tested form`);
    findings.push(...formFindings(forms, id, readFile));

    if (row.class === PARTIAL) {
      const because = isObject(row.partialBecause) ? row.partialBecause : null;
      if (because === null || !isText(because.text)) findings.push(`L-PARTIAL: ${id} is partial/inert without a reason`);
      else findings.push(...anchorFindings(because.source, `${id} partialBecause.source`, context).map(f => f.replace("L-EVIDENCE", "L-PARTIAL")));
    }
    if (row.class === BLOCKED) {
      const blocker = isObject(row.blockedBy) ? row.blockedBy : null;
      if (blocker === null || !BLOCKER_KINDS.includes(/** @type {string} */ (blocker.kind)) || !isText(blocker.detail)) {
        findings.push(`L-BLOCKED: ${id} is blocked without a blocker kind and detail`);
      }
    }
    const evidence = Array.isArray(row.evidence) ? row.evidence : [];
    if (evidence.length === 0) findings.push(`L-EVIDENCE: ${id} cites no evidence`);
    evidence.forEach((item, index) => {
      findings.push(...anchorFindings(item, `${id} evidence[${index}]`, context));
    });

    const successors = Array.isArray(row.successors) ? row.successors : [];
    if (!Array.isArray(row.successors)) findings.push(`L-SUCCESSORS: ${id} successors is not an array`);
    for (const successor of successors) {
      const match = typeof successor === "string" ? SUCCESSOR.exec(successor) : null;
      const number = match ? Number(match[1]) : 0;
      if (number < 201 || number > 310) findings.push(`L-SUCCESSORS: ${id} successor ${successor} is not EAT-R201..EAT-R310`);
    }
    if (new Set(successors).size !== successors.length) findings.push(`L-SUCCESSORS: ${id} names a successor twice`);
  }

  const controls = Array.isArray(ledger.controls) ? ledger.controls.filter(isObject) : [];
  for (const control of controls) {
    const forms = Array.isArray(control.testedForms) ? control.testedForms : [];
    if (control.class === TESTED && forms.length === 0) findings.push(`L-TESTED: control ${control.id} is tested but names no tested form`);
    findings.push(...formFindings(forms, `control ${control.id}`, readFile));
  }
  const byId = new Map(rows.map(row => [row.id, row]));
  const control = controls.find(item => item.id === AC2_CONTROL);
  if (control === undefined) findings.push(`L-AC2: the ${AC2_CONTROL} control has no entry`);
  /** @type {Array<[string, Record<string, unknown> | undefined]>} */
  const ac2Entries = [...AC2_ROWS.map(id => /** @type {[string, Record<string, unknown> | undefined]} */ ([id, byId.get(id)])), [`control ${AC2_CONTROL}`, control]];
  for (const [where, entry] of ac2Entries) {
    if (entry === undefined) continue;
    const fixed = Array.isArray(entry.fixedForms) ? entry.fixedForms.filter(isText) : [];
    if (fixed.length === 0) findings.push(`L-AC2: ${where} names no fixed, scoped form`);
    const pending = typeof entry.pending === "string" ? entry.pending : "";
    if (!/\bparked\b/.test(pending) || !/\bskip or retry\b/.test(pending) || !pending.includes("wb-9v02") || !/\bpending\b/.test(pending)) {
      findings.push(`L-AC2: ${where} does not separate the pending parked per-agent skip or retry (witness wb-9v02)`);
    }
  }
  for (const [where, text] of [...rows.flatMap(row => strings(row, String(row.id))), ...controls.flatMap(item => strings(item, `control ${item.id}`))]) {
    if (BYTES_CLAIM.test(text)) findings.push(`L-BYTES: ${where} says WorktreePreservationFailedResult contains byte data`);
  }

  const summary = isObject(ledger.summary) ? ledger.summary : {};
  if (summary.rows !== rows.length) findings.push(`L-SUMMARY: summary.rows ${summary.rows} is not the ${rows.length} rows`);
  const byClass = isObject(summary.byClass) ? summary.byClass : {};
  for (const cls of CLASSES) {
    const count = rows.filter(row => row.class === cls).length;
    if (byClass[cls] !== count) findings.push(`L-SUMMARY: summary.byClass ${cls} ${byClass[cls]} is not ${count}`);
  }
  if (summary.planGroups !== PLAN_GROUPS.length) findings.push(`L-SUMMARY: summary.planGroups ${summary.planGroups} is not ${PLAN_GROUPS.length}`);
  const complete = PLAN_GROUPS.filter(label => {
    const members = rows.filter(row => row.group === label);
    return members.length > 0 && members.every(row => row.class === TESTED);
  });
  if (summary.planGroupsComplete !== complete.length) {
    findings.push(`L-SUMMARY: summary.planGroupsComplete ${summary.planGroupsComplete} is not the ${complete.length} groups whose every row is tested`);
  }
  const labels = Array.isArray(summary.planGroupsCompleteLabels) ? [...summary.planGroupsCompleteLabels].sort() : null;
  if (labels === null || JSON.stringify(labels) !== JSON.stringify([...complete].sort())) {
    findings.push("L-SUMMARY: summary.planGroupsCompleteLabels is not the groups whose every row is tested");
  }
  return findings;
}

/**
 * The shape of each tested form; no case text is read (the census leg judges each form in report mode).
 * @param {unknown[]} forms @param {string} where @param {(path: string) => string | null} readFile @returns {string[]}
 */
function formFindings(forms, where, readFile) {
  /** @type {string[]} */
  const findings = [];
  forms.forEach((item, index) => {
    if (!isObject(item) || !isText(item.file) || !isText(item.title) || !Array.isArray(item.suite) || !item.suite.every(isText)) {
      findings.push(`L-TESTED: ${where} testedForms[${index}] lacks a file, a title or a suite path`);
      return;
    }
    if (readFile(/** @type {string} */ (item.file)) === null) findings.push(`L-TESTED: ${where} names ${item.file}, which the tree does not hold`);
  });
  return findings;
}

/**
 * The record's rules, each finding prefixed with its rule (each line says exactly what its rule reads):
 *  R-SCHEMA   the record is an object whose schema string is RECORD_SCHEMA, with pi, mw and beads objects and an
 *             implicatedChanges array;
 *  R-SHA      every string member anywhere in the record whose key is commit, tree or blob is 40 lower-case hex;
 *  R-REFS     pi.defaultBranch and pi.machineBranch are named; pi.refs holds a ref of each name exactly once, and each such ref
 *             has a non-empty package name and version, a commit and a tree, a beadsExport.blob and a feedback.tree; pi.mergeBase
 *             has a commit and a tree; mw.refs is non-empty and each ref has a commit, a tree and at least one package, every
 *             package with a non-empty name and version;
 *  R-DEFAULT  certifiedDefault's name is pi.defaultBranch and its commit is the default ref's commit; it is never the machine
 *             ref's commit while divergence.machineOnlyCommits is not 0;
 *  R-BEADS    beads.store is non-empty and beads.epics holds at least one epic, each with a non-empty status and a children object;
 *  R-CHANGES  each implicated change has a class of CHANGE_CLASSES that agrees with its two ancestry flags (merged: both true;
 *             machine-only: inDefault false and inMachine true; proposed: inDefault true and inMachine false; historical: a
 *             non-empty role that historicalPins names for the same commit), and no commit is listed twice.
 * @param {unknown} record @returns {string[]}
 */
export function repinFindings(record) {
  if (!isObject(record)) return ["R-SCHEMA: the record is not an object"];
  const findings = [];
  if (record.schema !== RECORD_SCHEMA) findings.push(`R-SCHEMA: schema is not ${RECORD_SCHEMA}`);
  for (const key of ["pi", "mw", "beads"]) if (!isObject(record[key])) findings.push(`R-SCHEMA: ${key} is missing`);
  if (!Array.isArray(record.implicatedChanges)) findings.push("R-SCHEMA: implicatedChanges is missing");
  for (const [where, text] of strings(record, "record")) {
    if (/\.(?:commit|tree|blob)$/.test(where) && !SHA.test(text)) findings.push(`R-SHA: ${where} is not a 40-hex id`);
  }
  const pi = isObject(record.pi) ? record.pi : {};
  const refs = Array.isArray(pi.refs) ? pi.refs.filter(isObject) : [];
  /** @param {unknown} name */
  const refNamed = name => refs.filter(ref => ref.name === name);
  for (const name of [pi.defaultBranch, pi.machineBranch]) {
    if (!isText(name)) {
      findings.push("R-REFS: the default or the machine branch is not named");
      continue;
    }
    const named = refNamed(name);
    if (named.length !== 1) findings.push(`R-REFS: pi.refs holds ${named.length} refs named ${name}`);
    for (const ref of named) {
      const pkg = isObject(ref.package) ? ref.package : {};
      if (!isText(pkg.name) || !isText(pkg.version)) findings.push(`R-REFS: ${name} has no package name and version`);
      if (typeof ref.commit !== "string" || typeof ref.tree !== "string") findings.push(`R-REFS: ${name} has no commit and tree`);
      if (!isObject(ref.beadsExport) || typeof ref.beadsExport.blob !== "string") findings.push(`R-REFS: ${name} has no Beads export blob`);
      if (!isObject(ref.feedback) || typeof ref.feedback.tree !== "string") findings.push(`R-REFS: ${name} has no feedback snapshot`);
    }
  }
  const mergeBase = isObject(pi.mergeBase) ? pi.mergeBase : {};
  if (typeof mergeBase.commit !== "string" || typeof mergeBase.tree !== "string") findings.push("R-REFS: pi.mergeBase has no commit and tree");
  const mw = isObject(record.mw) ? record.mw : {};
  const mwRefs = Array.isArray(mw.refs) ? mw.refs.filter(isObject) : [];
  if (mwRefs.length === 0) findings.push("R-REFS: mw.refs is empty");
  for (const ref of mwRefs) {
    const packages = Array.isArray(ref.packages) ? ref.packages.filter(isObject) : [];
    if (typeof ref.commit !== "string" || typeof ref.tree !== "string") findings.push(`R-REFS: mw ${ref.name} has no commit and tree`);
    if (packages.length === 0 || packages.some(pkg => !isText(pkg.name) || !isText(pkg.version))) {
      findings.push(`R-REFS: mw ${ref.name} has no package names and versions`);
    }
  }

  const certified = isObject(pi.certifiedDefault) ? pi.certifiedDefault : {};
  const defaultRef = refNamed(pi.defaultBranch)[0];
  const machineRef = refNamed(pi.machineBranch)[0];
  if (certified.name !== pi.defaultBranch || defaultRef === undefined || certified.commit !== defaultRef.commit) {
    findings.push("R-DEFAULT: certifiedDefault is not the default branch's own commit");
  }
  const divergence = isObject(pi.divergence) ? pi.divergence : {};
  if (machineRef !== undefined && certified.commit === machineRef.commit && divergence.machineOnlyCommits !== 0) {
    findings.push("R-DEFAULT: the machine branch's unmerged tip is certified as the default branch");
  }

  const beads = isObject(record.beads) ? record.beads : {};
  const epics = isObject(beads.epics) ? Object.values(beads.epics).filter(isObject) : [];
  if (!isText(beads.store) || epics.length === 0 || epics.some(epic => !isText(epic.status) || !isObject(epic.children))) {
    findings.push("R-BEADS: the Beads snapshot has no store, epic status or children");
  }

  const pinRoles = new Set(
    (Array.isArray(record.historicalPins) ? record.historicalPins.filter(isObject) : []).map(item => `${item.commit} ${item.role}`),
  );
  const seen = new Set();
  for (const change of Array.isArray(record.implicatedChanges) ? record.implicatedChanges.filter(isObject) : []) {
    const where = `implicated ${change.commit}`;
    if (seen.has(change.commit)) findings.push(`R-CHANGES: ${where} is listed twice`);
    seen.add(change.commit);
    const cls = change.class;
    if (!CHANGE_CLASSES.includes(/** @type {string} */ (cls))) {
      findings.push(`R-CHANGES: ${where} class ${cls} is not one of the four`);
      continue;
    }
    const both = change.inDefault === true && change.inMachine === true;
    const machineOnly = change.inDefault === false && change.inMachine === true;
    const defaultOnly = change.inDefault === true && change.inMachine === false;
    if (cls === "merged" && !both) findings.push(`R-CHANGES: ${where} is merged but not on both branches`);
    if (cls === "machine-only" && !machineOnly) findings.push(`R-CHANGES: ${where} is machine-only but not on the machine branch alone`);
    if (cls === "proposed" && !defaultOnly) findings.push(`R-CHANGES: ${where} is proposed but not on the default branch alone`);
    if (cls === "historical" && (!isText(change.role) || !pinRoles.has(`${change.commit} ${change.role}`))) {
      findings.push(`R-CHANGES: ${where} is historical without a role historicalPins names`);
    }
  }
  return findings;
}

/**
 * EAT-R201 AC3: what changed between a record and a measurement of the same refs. The measurement lists, per side, the refs
 * with their commit and package versions: {pi: [{name, commit, package: {name, version}}], mw: [{name, commit, packages:
 * [{name, version}]}]}. Each change is one string: a record without pi and mw refs; per recorded ref, a ref the measurement
 * lacks (not measured), a moved commit, and for Pi a changed package name or version, for MW each recorded package removed
 * or at another version and each measured package added. An empty list means the record still pins the measured state; any
 * entry means the cut's final-tree acceptance is invalid until a re-pin and a rerun. No ref is measured here: the caller
 * supplies the measurement.
 * @param {unknown} record @param {{pi: Array<Record<string, unknown>>, mw: Array<Record<string, unknown>>}} measured @returns {string[]}
 */
export function staleRepin(record, measured) {
  if (!isObject(record) || !isObject(record.pi) || !isObject(record.mw)) return ["the record has no pi and mw refs"];
  const changes = [];
  const piRefs = Array.isArray(record.pi.refs) ? record.pi.refs.filter(isObject) : [];
  for (const ref of piRefs) {
    const now = measured.pi.find(item => item.name === ref.name);
    if (now === undefined) {
      changes.push(`pi ${ref.name}: not measured`);
      continue;
    }
    if (now.commit !== ref.commit) changes.push(`pi ${ref.name}: commit ${ref.commit} -> ${now.commit}`);
    const was = isObject(ref.package) ? ref.package : {};
    const is = isObject(now.package) ? now.package : {};
    if (was.name !== is.name || was.version !== is.version) {
      changes.push(`pi ${ref.name}: package ${was.name}@${was.version} -> ${is.name}@${is.version}`);
    }
  }
  const mwRefs = Array.isArray(record.mw.refs) ? record.mw.refs.filter(isObject) : [];
  for (const ref of mwRefs) {
    const now = measured.mw.find(item => item.name === ref.name);
    if (now === undefined) {
      changes.push(`mw ${ref.name}: not measured`);
      continue;
    }
    if (now.commit !== ref.commit) changes.push(`mw ${ref.name}: commit ${ref.commit} -> ${now.commit}`);
    /** @param {unknown} list */
    const versions = list =>
      new Map((Array.isArray(list) ? list.filter(isObject) : []).map(pkg => [String(pkg.name), String(pkg.version)]));
    const was = versions(ref.packages);
    const is = versions(now.packages);
    for (const [name, version] of was) {
      if (!is.has(name)) changes.push(`mw ${ref.name}: package ${name} removed`);
      else if (is.get(name) !== version) changes.push(`mw ${ref.name}: package ${name}@${version} -> ${name}@${is.get(name)}`);
    }
    for (const name of is.keys()) if (!was.has(name)) changes.push(`mw ${ref.name}: package ${name} added`);
  }
  return changes;
}

/**
 * The Beads export of a repository, read read-only through the tracker export's one reader (qa/workbench/tracker-export.mjs
 * trackerExportText over .beads/issues.jsonl, which substitutes each closed bead's stub row with its latest archived row from the
 * shards under .beads/archive). A record's text is its description and notes; its parent is the depends_on_id of its parent-child
 * dependency. This module writes no bead store.
 * @param {string} root @returns {Map<string, {title: string, text: string, parent: string | null}>}
 */
export function readBeadExport(root) {
  /** @type {Map<string, {title: string, text: string, parent: string | null}>} */
  const records = new Map();
  for (const line of trackerExportText(join(root, MAIN_EXPORT)).split("\n")) {
    if (line.trim() === "") continue;
    const item = JSON.parse(line);
    if (!isObject(item) || typeof item.id !== "string") continue;
    const deps = Array.isArray(item.dependencies) ? item.dependencies.filter(isObject) : [];
    const parent = deps.find(dep => dep.type === "parent-child");
    records.set(item.id, {
      title: typeof item.title === "string" ? item.title : "",
      text: ["description", "notes"].map(key => (typeof item[key] === "string" ? item[key] : "")).join("\n"),
      parent: parent !== undefined && typeof parent.depends_on_id === "string" ? parent.depends_on_id : null,
    });
  }
  return records;
}

/**
 * A reader of repository-relative files under root: the file's text, or null when it cannot be read; an absolute path or a
 * path with a .. segment is never read. @param {string} root
 */
export function treeReader(root) {
  /** @param {string} path @returns {string | null} */
  return path => {
    if (path.startsWith("/") || path.split("/").includes("..")) return null;
    try {
      return readFileSync(join(root, path), "utf8");
    } catch {
      return null;
    }
  };
}

/** The docs reader of the test/helpers/census.ts beside this module (node strips its types when it loads it). */
async function censusSectionReader() {
  const census = await import("../../test/helpers/census.ts");
  return sectionReader(census.docsSection);
}

/** @param {string[]} argv @returns {Promise<number>} */
async function main(argv) {
  let root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  if (argv.length === 2 && argv[0] === "--root") root = argv[1];
  else if (argv.length !== 0) {
    process.stderr.write("usage: node qa/workbench/mechanical-status-ledger.mjs [--root <dir>]\n");
    return 2;
  }
  let ledger;
  let record;
  let beads;
  let readSection;
  try {
    ledger = JSON.parse(readFileSync(join(root, LEDGER_PATH), "utf8"));
    record = JSON.parse(readFileSync(join(root, RECORD_PATH), "utf8"));
    beads = readBeadExport(root);
    readSection = await censusSectionReader();
  } catch (error) {
    process.stderr.write(`unreadable input: ${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }
  const verdict = { ledger: ledgerFindings(ledger, { beads, readFile: treeReader(root), readSection }), record: repinFindings(record) };
  process.stdout.write(`${JSON.stringify(verdict)}\n`);
  return verdict.ledger.length === 0 && verdict.record.length === 0 ? 0 : 1;
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv.slice(2)).then(code => {
    process.exitCode = code;
  });
}
