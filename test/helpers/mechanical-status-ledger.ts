/**
 * wb-hhxs (the structural-exit child of wb-mit9, ruling R-B759): the judge of the historical requirement status ledger
 * (EAT-R202) of the mechanical-native-interoperability-2026-11-09 program, and the readers of its inputs. The committed
 * ledger is LEDGER_PATH. ledgerFindings returns every finding the ledger draws in its context (the export records, a receipt
 * reader and a docs reader), each a string that starts with its rule id (L-SCHEMA, L-IDS, L-CLASS, L-PIN, L-BEAD, L-GROUP,
 * L-TESTED, L-PARTIAL, L-BLOCKED, L-EVIDENCE, L-AC2, L-CONTROL, L-BYTES, L-SUMMARY), in that order.
 *
 * This header claims nothing of its own: what each rule and each reader is held to read is stated only by the PINNED READER
 * SET of test/workbench-mechanical-status-ledger.test.ts, one line per claim, each naming the cases that pin it, beside that
 * file's NAMED RESIDUALS and NOT CLAIMED sentences; test/workbench-mechanical-status-ledger.census.ts judges the ledger's
 * tested forms in report mode. A reading no case of those files holds is NOT CLAIMED.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { MAIN_EXPORT, trackerExportText } from "../../qa/workbench/tracker-export.mjs";
import type { DocsSection, RenderedBlock } from "./census.js";

export const LEDGER_SCHEMA = "workbench.mechanical-status-ledger/v1";
export const LEDGER_PATH = "test/fixtures/mechanical-historical-status-ledger.json";
export const RECEIPTS_DIR = "docs/workbench/receipts";

export const TESTED = "already-implemented/tested";
export const PARTIAL = "partial/inert";
export const BLOCKED = "blocked";
/** EAT-R202 AC1: the three classes, spelled as the requirement spells them. */
export const CLASSES: readonly string[] = [TESTED, PARTIAL, BLOCKED];
/** The kinds a blocked row names: an external producer deliverable, an open Pi dependency, an unratified joint contract, or no open owner. */
export const BLOCKER_KINDS: readonly string[] = ["external", "dependency", "unratified", "unowned"];
/** EAT-R202 AC1: every identifier EAT-R001..EAT-R200, in order. */
export const HISTORICAL_IDS: readonly string[] = Array.from({ length: 200 }, (_, index) => `EAT-R${String(index + 1).padStart(3, "0")}`);
/** EAT-R202 AC2: the rows that separate their fixed, scoped forms from the pending parked per-agent skip/retry. */
export const AC2_ROWS: readonly string[] = ["EAT-R001", "EAT-R002", "EAT-R003", "EAT-R012", "EAT-R013", "EAT-R014"];
/** EAT-R202 AC2: the run-wide control that makes the same separation. */
export const AC2_CONTROL = "F10";
/** EAT-R202 AC2: the one pending sentence every AC2 row and the control carry. */
export const PENDING =
  "Pending, outside these fixed forms: a per-agent skip or retry issued while beforeDispatch is parked (EAT-R015, EAT-R016) is a witnessed open violation (wb-9v02 receipt, status pending); these fixed forms do not cover it.";
/** The receipt anchor that witnesses PENDING: the wb-9v02 experiment's observed violation, status pending. */
export const PENDING_WITNESS = {
  receipt: "wb-9v02",
  section: {
    heading:
      "2026-11-06 receipt: parked beforeDispatch experiment for EAT-R015 and EAT-R016, a violation witnessed in all four cells, status pending (machine seats ws-01 and ws-02)",
    depth: 2,
    parents: ["wb-9v02: [MWI-cancel-repro] Reproduce parked per-agent skip and retry before choosing a repair"],
  },
  anchor: "Status: pending. The red was witnessed, and this cut carries no fix",
} as const;
/** EAT-R202 AC2: the type no row may say contains byte data. */
export const TYPE_NAME = "WorktreePreservationFailedResult";

export interface Group {
  readonly label: string;
  readonly bead: string;
  readonly tag: string;
}
/** The 25 planning groups of the 2026-11-04 BEAD-PLAN, each with its wb-1a3t child bead and that bead's title tag. */
export const PLAN_GROUPS: readonly Group[] = [
  { label: "B-preserve", bead: "wb-5ik5", tag: "[MWI-preserve]" },
  { label: "B-docs", bead: "wb-12x1", tag: "[MWI-docs]" },
  { label: "B-unknowns", bead: "wb-muip", tag: "[MWI-unknowns]" },
  { label: "B-release", bead: "wb-j5y5", tag: "[MWI-release]" },
  { label: "B-contract-choice", bead: "wb-w8fk", tag: "[MWI-contract-choice]" },
  { label: "B-descriptor", bead: "wb-ocie", tag: "[MWI-descriptor]" },
  { label: "B-source", bead: "wb-s8rm", tag: "[MWI-source]" },
  { label: "B-authority", bead: "wb-201v", tag: "[MWI-authority]" },
  { label: "B-detached-grants", bead: "wb-wupg", tag: "[MWI-detached-grants]" },
  { label: "B-replay", bead: "wb-413a", tag: "[MWI-replay]" },
  { label: "B-cancel-repro", bead: "wb-9v02", tag: "[MWI-cancel-repro]" },
  { label: "B-limits", bead: "wb-ny54", tag: "[MWI-limits]" },
  { label: "B-dispatch", bead: "wb-4bxo", tag: "[MWI-dispatch]" },
  { label: "B-outcomes", bead: "wb-9a1o", tag: "[MWI-outcomes]" },
  { label: "B-effects", bead: "wb-mwsy", tag: "[MWI-effects]" },
  { label: "B-controls", bead: "wb-5a7k", tag: "[MWI-controls]" },
  { label: "B-observe", bead: "wb-upad", tag: "[MWI-observe]" },
  { label: "B-telemetry", bead: "wb-r5q2", tag: "[MWI-telemetry]" },
  { label: "B-git-census", bead: "wb-p3i2", tag: "[MWI-git-census]" },
  { label: "B-hx-evidence", bead: "wb-f3wd", tag: "[MWI-hx-evidence]" },
  { label: "B-hx-admit", bead: "wb-pxvv", tag: "[MWI-hx-admit]" },
  { label: "B-rf-admit", bead: "wb-669r", tag: "[MWI-rf-admit]" },
  { label: "B-detached-function", bead: "wb-zswl", tag: "[MWI-detached-function]" },
  { label: "B-furnace-function", bead: "wb-dlc6", tag: "[MWI-furnace-function]" },
  { label: "B-coordination", bead: "wb-0gbh", tag: "[MWI-coordination]" },
];
/** The ledger's two other groups: the 11-06 delta's master reconciliation and the deferred MW tracks. */
export const EXTRA_GROUPS: readonly Group[] = [
  { label: "master-recon", bead: "wb-cbt4", tag: "[MWI-master-recon]" },
  { label: "mw-tracks", bead: "wb-1zn2", tag: "[MWI-external-gates]" },
];
/** The group table L-GROUP reads: the plan groups, then the other two. */
export const GROUPS: readonly Group[] = [...PLAN_GROUPS, ...EXTRA_GROUPS];

export interface BeadText {
  readonly title: string;
  readonly description: string;
  readonly notes: string;
}
export interface LedgerContext {
  /** The export records by id. */
  readonly beads: ReadonlyMap<string, BeadText>;
  /** A receipt's markdown by name (docs/workbench/receipts/<name>.md), or null when the directory does not list it. */
  readonly readReceipt: (name: string) => string | null;
  /** The docs reader: docsSection of test/helpers/census.ts, or a reader that gives what it gives. */
  readonly section: (markdown: string, heading: string, depth: number, parents: readonly string[]) => DocsSection;
}

type Obj = Record<string, unknown>;
const SHA = /^[0-9a-f]{40}$/;

const isObject = (value: unknown): value is Obj => typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";
const isSection = (value: unknown): value is { heading: string; depth: number; parents: string[] } =>
  isObject(value) &&
  isText(value.heading) &&
  Number.isInteger(value.depth) &&
  (value.depth as number) >= 1 &&
  (value.depth as number) <= 6 &&
  Array.isArray(value.parents) &&
  value.parents.every(isText);
const isForm = (value: unknown): boolean => isObject(value) && isText(value.file) && isText(value.title) && Array.isArray(value.suite) && value.suite.every(isText);

/** The text of each block of a bound section: one entry per block, one per list item for a list. */
export function blockTexts(blocks: readonly RenderedBlock[]): string[] {
  return blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : [block.text]));
}

/** Every string at any depth of a value, with its path: each member name, each member value and each array entry. */
function stringsOf(value: unknown, at: string): [string, string][] {
  if (typeof value === "string") return [[at, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => stringsOf(item, `${at}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]): [string, string][] => [[`${at}.${key} (member name)`, key], ...stringsOf(item, `${at}.${key}`)]);
  return [];
}

/** The findings of one evidence item, each starting with `rule`. */
function itemFindings(item: unknown, where: string, rule: string, context: LedgerContext): string[] {
  if (!isObject(item) || !isText(item.anchor)) return [`${rule}: ${where} has no anchor`];
  const anchor = item.anchor;
  if (typeof item.receipt === "string") {
    const markdown = context.readReceipt(item.receipt);
    if (markdown === null) return [`${rule}: ${where} names the receipt ${item.receipt}, which ${RECEIPTS_DIR} does not list`];
    const section = item.section;
    if (!isSection(section)) return [`${rule}: ${where} names no section: a heading, a depth from 1 to 6 and parent headings`];
    const bound = context.section(markdown, section.heading, section.depth, section.parents);
    if (!bound.ok) return [`${rule}: ${where} section is not bound: ${bound.why}`];
    return blockTexts(bound.blocks).some(text => text.includes(anchor)) ? [] : [`${rule}: ${where} anchor is in no block of the rendered section: ${anchor}`];
  }
  if (typeof item.bead === "string") {
    const record = context.beads.get(item.bead);
    if (record === undefined) return [`${rule}: ${where} names ${item.bead}, which the export does not hold`];
    return record.description.includes(anchor) || record.notes.includes(anchor) ? [] : [`${rule}: ${where} anchor is in neither the description nor the notes of ${item.bead}: ${anchor}`];
  }
  return [`${rule}: ${where} names neither a receipt nor a bead`];
}

/** L-TESTED over one owner's tested forms; `tested` says whether the owner is tested. */
function formFindings(forms: unknown, where: string, tested: boolean): string[] {
  if (!Array.isArray(forms)) return [`L-TESTED: ${where} testedForms is not an array`];
  const findings: string[] = [];
  if (tested && forms.length === 0) findings.push(`L-TESTED: ${where} is tested but names no tested form`);
  if (!tested && forms.length > 0) findings.push(`L-TESTED: ${where} is not tested but names a tested form`);
  forms.forEach((form, index) => {
    if (!isForm(form)) findings.push(`L-TESTED: ${where} testedForms[${index}] is not an object with a non-empty string file and title and a suite of non-empty strings`);
  });
  return findings;
}

/** L-AC2 over one owner. */
function ac2Findings(owner: Obj, where: string): string[] {
  const findings: string[] = [];
  const fixed = owner.fixedForms;
  if (!Array.isArray(fixed) || fixed.length === 0 || !fixed.every(isText)) findings.push(`L-AC2: ${where} fixedForms is not a non-empty array of non-empty strings`);
  else {
    fixed.forEach((form, index) => {
      const lower = String(form).toLowerCase();
      if (lower.includes("skip") || lower.includes("retry")) findings.push(`L-AC2: ${where} fixedForms[${index}] names skip or retry`);
    });
  }
  if (owner.pending !== PENDING) findings.push(`L-AC2: ${where} pending is not the pending sentence`);
  return findings;
}

/** L-BYTES over one owner. */
function bytesFindings(owner: Obj, where: string): string[] {
  const type = TYPE_NAME.toLowerCase();
  return stringsOf(owner, where)
    .filter(([, text]) => {
      const lower = text.toLowerCase();
      return lower.includes(type) && lower.includes("byte");
    })
    .map(([at]) => `L-BYTES: ${at} names ${TYPE_NAME} and byte data`);
}

/** Every finding the ledger draws in its context, in rule order (see the module header). */
export function ledgerFindings(ledger: unknown, context: LedgerContext): string[] {
  if (!isObject(ledger)) return ["L-SCHEMA: the ledger is not an object"];
  const findings: string[] = [];
  if (ledger.schema !== LEDGER_SCHEMA) findings.push(`L-SCHEMA: schema is not ${LEDGER_SCHEMA}`);
  const pins = ledger.pins as Obj | null | undefined;
  const piPin = (pins?.pi as Obj | null | undefined)?.commit;
  const mwPin = (pins?.mw as Obj | null | undefined)?.commit;
  if (typeof piPin !== "string" || !SHA.test(piPin)) findings.push("L-SCHEMA: pins.pi.commit is not 40 lower-case hex");
  if (typeof mwPin !== "string" || !SHA.test(mwPin)) findings.push("L-SCHEMA: pins.mw.commit is not 40 lower-case hex");
  if (!Array.isArray(ledger.rows)) return [...findings, "L-SCHEMA: rows is not an array"];
  if (!Array.isArray(ledger.controls)) return [...findings, "L-SCHEMA: controls is not an array"];
  ledger.rows.forEach((row, index) => {
    if (!isObject(row)) findings.push(`L-SCHEMA: rows[${index}] is not an object`);
  });
  ledger.controls.forEach((control, index) => {
    if (!isObject(control)) findings.push(`L-SCHEMA: controls[${index}] is not an object`);
  });
  const rows = ledger.rows.filter(isObject);
  const controls = ledger.controls.filter(isObject);

  if (!isDeepStrictEqual(rows.map(row => row.id), HISTORICAL_IDS)) findings.push(`L-IDS: the row ids are not EAT-R001..EAT-R200, each once, in order (${rows.length} rows)`);

  for (const group of GROUPS) {
    const record = context.beads.get(group.bead);
    if (record === undefined) findings.push(`L-GROUP: the export does not hold ${group.bead}, the bead of ${group.label}`);
    else if (!record.title.startsWith(group.tag)) findings.push(`L-GROUP: the export title of ${group.bead} does not start with ${group.tag}`);
  }

  const held = context.beads as ReadonlyMap<unknown, BeadText>;
  for (const row of rows) {
    const id = String(row.id);
    if (!CLASSES.includes(row.class as string)) findings.push(`L-CLASS: ${id} class is not one of ${CLASSES.join(", ")}`);
    const pin = row.pin as Obj | null | undefined;
    if (pin?.pi !== piPin) findings.push(`L-PIN: ${id} pin.pi is not the ledger's pins.pi.commit`);
    if (pin?.mw !== mwPin) findings.push(`L-PIN: ${id} pin.mw is not the ledger's pins.mw.commit`);
    if (row.bead !== "none" && !held.has(row.bead)) findings.push(`L-BEAD: ${id} bead ${String(row.bead)} is neither none nor an id the export holds`);
    const group = GROUPS.find(item => item.label === row.group);
    if (group === undefined) findings.push(`L-GROUP: ${id} group ${String(row.group)} is not a mapped label`);
    else if (row.bead !== "none" && row.bead !== group.bead) findings.push(`L-GROUP: ${id} bead ${String(row.bead)} is neither none nor the bead ${group.bead} of its group ${group.label}`);

    findings.push(...formFindings(row.testedForms, id, row.class === TESTED));

    if (row.class === PARTIAL) {
      const because = row.partialBecause;
      if (!isObject(because)) findings.push(`L-PARTIAL: ${id} is partial/inert without partialBecause`);
      else {
        if (!isText(because.text)) findings.push(`L-PARTIAL: ${id} partialBecause.text is not a non-empty string`);
        findings.push(...itemFindings(because.source, `${id} partialBecause.source`, "L-PARTIAL", context));
      }
    } else if (row.partialBecause !== undefined) findings.push(`L-PARTIAL: ${id} is not partial/inert but carries partialBecause`);

    if (row.class === BLOCKED) {
      const blocker = row.blockedBy;
      if (!isObject(blocker)) findings.push(`L-BLOCKED: ${id} is blocked without blockedBy`);
      else {
        if (!BLOCKER_KINDS.includes(blocker.kind as string)) findings.push(`L-BLOCKED: ${id} blockedBy.kind is not one of ${BLOCKER_KINDS.join(", ")}`);
        if (!isText(blocker.detail)) findings.push(`L-BLOCKED: ${id} blockedBy.detail is not a non-empty string`);
      }
    } else if (row.blockedBy !== undefined) findings.push(`L-BLOCKED: ${id} is not blocked but carries blockedBy`);

    const evidence = row.evidence;
    if (!Array.isArray(evidence) || evidence.length === 0) findings.push(`L-EVIDENCE: ${id} evidence is not a non-empty array`);
    else for (const [index, item] of evidence.entries()) findings.push(...itemFindings(item, `${id} evidence[${index}]`, "L-EVIDENCE", context));
  }

  const byId = new Map(rows.map(row => [row.id, row]));
  for (const id of AC2_ROWS) {
    const row = byId.get(id);
    if (row !== undefined) findings.push(...ac2Findings(row, id));
  }
  if (!isDeepStrictEqual(controls.map(control => control.id), [AC2_CONTROL])) findings.push(`L-CONTROL: the control ids are not exactly ${AC2_CONTROL}`);
  const control = controls.find(item => item.id === AC2_CONTROL);
  if (control !== undefined) {
    const where = `control ${AC2_CONTROL}`;
    if (control.class !== TESTED) findings.push(`L-CONTROL: ${where} class is not ${TESTED}`);
    findings.push(...formFindings(control.testedForms, where, true));
    findings.push(...ac2Findings(control, where));
  }
  findings.push(...itemFindings(PENDING_WITNESS, "the pending witness", "L-AC2", context));

  for (const row of rows) findings.push(...bytesFindings(row, String(row.id)));
  for (const item of controls) findings.push(...bytesFindings(item, `control ${String(item.id)}`));

  const summary = ledger.summary;
  if (!isObject(summary)) return [...findings, "L-SUMMARY: summary is not an object"];
  if (summary.rows !== rows.length) findings.push(`L-SUMMARY: summary.rows is not ${rows.length}`);
  const byClass = Object.fromEntries(CLASSES.map(cls => [cls, rows.filter(row => row.class === cls).length]));
  if (!isDeepStrictEqual(summary.byClass, byClass)) findings.push(`L-SUMMARY: summary.byClass is not ${JSON.stringify(byClass)}`);
  if (summary.planGroups !== PLAN_GROUPS.length) findings.push(`L-SUMMARY: summary.planGroups is not ${PLAN_GROUPS.length}`);
  const complete = PLAN_GROUPS.filter(group => {
    const members = rows.filter(row => row.group === group.label);
    return members.length > 0 && members.every(row => row.class === TESTED);
  }).map(group => group.label);
  if (!isDeepStrictEqual(summary.planGroupsComplete, complete)) findings.push(`L-SUMMARY: summary.planGroupsComplete is not ${JSON.stringify(complete)}`);
  return findings;
}

/**
 * The export records of a full export text: each line holding a character other than white space is parsed whole (one that
 * does not parse throws a SyntaxError, and one that is not an object or whose id is not a string throws this module's
 * refusal); title, description and notes are read as strings, a member that is not one as empty; a later line of an id
 * replaces an earlier one.
 */
export function beadsFromExport(text: string): Map<string, BeadText> {
  const beads = new Map<string, BeadText>();
  const textOf = (value: unknown): string => (typeof value === "string" ? value : "");
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    const record: unknown = JSON.parse(line);
    if (!isObject(record) || typeof record.id !== "string") throw new Error(`an export line carries no string id: ${line.slice(0, 80)}`);
    beads.set(record.id, { title: textOf(record.title), description: textOf(record.description), notes: textOf(record.notes) });
  }
  return beads;
}

/** The committed export records: MAIN_EXPORT under root, rehydrated from its archive shards by trackerExportText. */
export function readBeads(root: string): Map<string, BeadText> {
  return beadsFromExport(trackerExportText(join(root, MAIN_EXPORT)));
}

/** A reader of the receipts under root: a name reads RECEIPTS_DIR/<name>.md when the directory lists the entry <name>.md, else null. */
export function receiptReader(root: string): (name: string) => string | null {
  const dir = join(root, RECEIPTS_DIR);
  const listed = new Set(readdirSync(dir));
  return name => (listed.has(`${name}.md`) ? readFileSync(join(dir, `${name}.md`), "utf8") : null);
}

/** The committed ledger under root, parsed. */
export function readLedger(root: string): unknown {
  return JSON.parse(readFileSync(join(root, LEDGER_PATH), "utf8"));
}
