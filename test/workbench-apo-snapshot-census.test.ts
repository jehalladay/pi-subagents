/**
 * wb-021.2 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2, program-triage-2026-10-18), the APO snapshot census: the standing absence
 * guard and the armed per-view interaction falsifier of a posture requirement whose program has no Pi surface yet.
 * Statement (the bead's tracker-export title, verbatim): "When Pi presents any APO-020 view class (operational decision
 * graph, epistemic why-not/completeness, policy gradient/credit, developmental ancestry, resource pressure, certificate
 * dependency), the view renders read-only snapshots of recorded MW state and never actuates: no view interaction executes,
 * retries, admits an event, or mutates policy/organization state — acceptance gate 'snapshot not actuation'." (the
 * export title spells the dash as the six characters shown).
 * Acceptance (the owner filing's, verbatim): "per-view interaction falsifier - every handler path is projection-read-only
 * with zero capability invokes and zero journal/native writes." (the filing's dash is U+2014).
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-29, at trunk 04123dc): git lists 117 files under src/, all TypeScript,
 * and no src text names the program, so no src module presents APO state and no APO view closure exists to judge. Pi's
 * effect seams as src declares them: ObservationProjection's 18 public members (12 read, 6 admission), CapabilityRegistry's
 * 7, CapabilityProvider's 3 and src/workflow/journal.ts's 4 exported values (SEAMS classifies each).
 *
 * THE FALSIFIER (a fail-closed core; the judge, its readings and every finding are defined in
 * test/helpers/apo-snapshot-census.ts, whose header is the reading of record): an APO view module (a module the wb-021.4
 * ROLE reading reads as naming the program) is admitted only when its whole runtime closure holds no finding. Every other
 * form refuses with a typed finding - UNREADABLE, UNRESOLVED, PACKAGE (no specifier is admitted, so node:fs,
 * node:child_process and every native client package refuse), EFFECT (a text holding a statement or acceptance verb, or a
 * whole text that is a seam effect name), GLOBAL (a free name outside ADMITTED_FREE) and CONSTRUCTOR.
 *
 * ROWS (rows L, V and N tile the statement and rows P and Z tile the acceptance, each label a verbatim segment held to the
 * export row by the outside-anchor case). L: the src tree presents no APO state (L1 - ARMED: the first module that names
 * the program reds L1, and its closure is then judged here and must be pinned), and a module naming the program in a name
 * only (L2) or in a literal only (L3) presents APO state. V: the admitted form - one read-only view per APO-020 view class
 * (each reads the projection through read members only, or a recorded snapshot as plain data; two route their display
 * through the live sanitizeWorkbenchText, src/workbench/redaction.ts copied byte-for-byte into the planted tree), every
 * ADMITTED_FREE name, and every type-only edge form, each with no finding. N: a view interaction that executes, retries,
 * admits an event (by the word, and by the projection's admission member ingest) or mutates, each red. P: one actuating
 * view per view class, each reaching its effect through a different handler path - in the view itself, and through each
 * edge kind (static, export-from, dynamic, require, import-equals). Z: a capability invoke, inspect and registration, a
 * journal write handed in, a journal module in the closure, a native file write, a native process spawn and a native
 * client package, the free names process, fetch, Function, eval and globalThis, and the constructor route, each red. R:
 * every reading the judge claims, each held by a plant or a reading pin of its own: the EFFECT families and the seam names
 * written out with near-words that read nothing (R-families), the word splits and the family order (R-words), a name spelled
 * only with a four-digit escape and in the scanner shape TypeScript's node.text misreads, a private name, a string
 * literal, a no-substitution template, a template's head, middle and tail, a "+" chain (plain and parenthesized), a type
 * position, UNRESOLVED (a missing file, a computed import, a computed require), UNREADABLE, PACKAGE in a closure module,
 * GLOBAL through a shorthand property, a local export (plain and aliased), an ambient declaration (declare const and
 * declare global), an extends expression,
 * a closure module and a name in the scanner shape, the positions that are not binding references (quiet), and the texts
 * never read - a regular-expression literal and a comment (quiet). S: each seam's members read from src equal its classification (S-projection, S-registry, S-provider, S-journal;
 * the projection's read members read no EFFECT text), and the seam reader's member forms (S-reader-class,
 * S-reader-interface, S-reader-exports, S-reader-exports-unnamed, S-reader-missing). Q: the residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every row's id, label and pin digests, the
 * registered test titles and the residual families are held to the out-of-file roster (test/fixtures/apo-snapshot-roster.json).
 * OUTSIDE ANCHORS (their own case, plus the live pins): the export row - rows L, V and N tile its statement, rows P and Z
 * the owner filing's acceptance (read from the filing section alone, which holds exactly one Acceptance line), its
 * requirement id carries the program's slug, the statement's parenthesis is VIEW_CLASSES and rows V and P each plant every
 * class, every EFFECT family holds a verb of the statement or the acceptance and is read by an N, P or Z plant, and the
 * acceptance's projection, capability and journal each name a seam; the src AST - the live judgment (L1) and each seam's
 * members (S); wb-021.4's EDGE_KINDS, each routed by a P plant; the live redaction module, whose bytes two V plants judge;
 * and this header's RESIDUALS line, held to the residual families.
 * NOT CLAIMED: the internals of any package (none is admitted, so none is read); an effect performed by code handed in at
 * run time - a member called by a name outside the EFFECT families and the seam names (R-UNNAMED-EFFECT), or code reached
 * without a call site, through a coercion, a getter or a thenable (R-IMPLICIT-CALL); a write into a handed-in object's
 * fields or collections (R-FIELD-MUTATION); a module presenting APO state without naming the program in a name or a
 * literal - a comment naming it is never read (R-UNNAMED-VIEW); a
 * text built at run time (R-COMPUTED-TEXT); a code constructor reached by reflection over an admitted built-in with a
 * computed key (R-REFLECTIVE-REACH); regular-expression literals and comments (never read); any code outside src/.
 * RESIDUALS (named, each with its pinned quiet row in row Q): R-UNNAMED-VIEW, R-UNNAMED-EFFECT, R-IMPLICIT-CALL,
 * R-FIELD-MUTATION, R-COMPUTED-TEXT, R-REFLECTIVE-REACH.
 *
 * Display paths added: none. Test-only: no src change.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import {
  BEAD,
  EFFECT_FAMILIES,
  effectReading,
  type Judgment,
  judgeTree,
  type LivePin,
  liveSeamMembers,
  type PlantPin,
  pinDigest,
  REQUIREMENT,
  RESIDUAL_FAMILIES,
  type ReadingPin,
  ROWS,
  type Row,
  SEAM_EFFECTS,
  SEAMS,
  type SeamPin,
  SRC_FLOOR,
  seamMembers,
  titleOf,
  VIEW_CLASSES,
} from "./helpers/apo-snapshot-census.js";
import { EDGE_KINDS, roleReading } from "./helpers/apo-ui-publish-census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER = "test/fixtures/apo-snapshot-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The live row parses every src module twice (the shared reader and wb-021.4's own pass), so it carries this budget. */
const LIVE_BUDGET_MS = 120_000;
/** A plant writes its tree to scratch, reads every module and builds one checker program. */
const PLANT_BUDGET_MS = 60_000;

/** What git would commit under src/: tracked or untracked, never ignored, and still on disk. */
function srcFiles(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
}

let cached: { readonly files: readonly string[]; readonly judgment: Judgment } | undefined;
/** The src tree as it stands, judged once per run. */
function live(): { readonly files: readonly string[]; readonly judgment: Judgment } {
  if (cached === undefined) {
    const files = srcFiles();
    cached = { files, judgment: judgeTree({ root: ROOT, files }) };
  }
  return cached;
}

/** One planted tree, written to rule-11 scratch (its copies byte-for-byte from the repository) and judged through the same judgeTree as the real one. */
function judgePlant(pin: PlantPin): Judgment {
  const root = makeScratch("apo-snapshot-");
  try {
    for (const file of pin.copies ?? []) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      copyFileSync(join(ROOT, file), join(root, file));
    }
    for (const [file, text] of Object.entries(pin.files)) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      writeFileSync(join(root, file), text);
    }
    return judgeTree({ root, files: [...(pin.copies ?? []), ...Object.keys(pin.files)] });
  } finally {
    removeScratch(root);
  }
}

interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
/** The bead's own row in the tracker export. */
function exportRow(): ExportRow {
  for (const line of readFileSync(join(ROOT, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; notes?: unknown };
    if (row.id === BEAD && typeof row.title === "string") return { title: row.title, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`${EXPORT} holds no ${BEAD} row`);
}

const MARKER = "Acceptance: ";
/** The owner filing section (the notes from their start through the line holding the first acceptance marker) and its acceptance sentence. */
function ownerFiling(notes: string): { readonly section: string; readonly acceptance: string } {
  const start = notes.indexOf(MARKER);
  if (start < 0) return { section: "", acceptance: "" };
  const lineEnd = notes.indexOf("\n", start);
  const section = lineEnd < 0 ? notes : notes.slice(0, lineEnd);
  return { section, acceptance: section.slice(start + MARKER.length) };
}

const rowOf = (id: string): Row => {
  const row = ROWS.find(candidate => candidate.id === id);
  if (row === undefined) throw new Error(`no row ${id}`);
  return row;
};
const plants = (id: string): PlantPin[] => rowOf(id).pins.filter((pin): pin is PlantPin => pin.kind === "plant");
const seamOf = (name: string) => {
  const seam = SEAMS.find(candidate => candidate.name === name);
  if (seam === undefined) throw new Error(`no seam ${name}`);
  return seam;
};

/** The residual families this file's header names: the R- tokens of its RESIDUALS paragraph. */
function headerResiduals(): string[] {
  const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const header = text.slice(0, text.indexOf("*/"));
  const start = header.indexOf(" * RESIDUALS (");
  if (start < 0) return [];
  const paragraph = header.slice(start, header.indexOf("\n *\n", start));
  return [...paragraph.slice(paragraph.indexOf("):") + 2).matchAll(/R-[A-Z]+(?:-[A-Z]+)*/g)].map(match => match[0]);
}

function checkLive(pin: LivePin): void {
  if (pin.id === "L1-src") {
    const { files, judgment } = live();
    expect(files.length, "git lists at least the floor of src files").toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(files.filter(file => !file.endsWith(".ts")), "every src file is TypeScript, so every one is read").toEqual([]);
    expect({ views: judgment.views, findings: judgment.findings }, pin.what).toEqual(pin.expect);
    return;
  }
  const name = (pin.expect as { seam?: unknown }).seam;
  if (typeof name !== "string") throw new Error(`live pin ${pin.id} names no seam`);
  const seam = seamOf(name);
  expect(seam.read.filter(member => seam.effect.includes(member)), "no member is classified both read and effect").toEqual([]);
  expect(liveSeamMembers(ROOT, seam), pin.what).toEqual([...seam.read, ...seam.effect].sort());
  if (pin.id === "S-projection") expect(seam.read.filter(member => effectReading(member) !== undefined), "every read member of the projection reads no EFFECT text").toEqual([]);
}

function checkPlant(pin: PlantPin): void {
  const judgment = judgePlant(pin);
  expect(judgment.findings, pin.what).toEqual([...pin.findings].sort());
  expect(judgment.views, "the planted APO view modules").toEqual(pin.views);
}

function checkReading(pin: ReadingPin): void {
  expect(Object.fromEntries(Object.keys(pin.readings).map(text => [text, effectReading(text) ?? null])), pin.what).toEqual(pin.readings);
}

function checkSeam(pin: SeamPin): void {
  const sf = ts.createSourceFile("seam.ts", pin.source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  expect(seamMembers(sf, pin.seam), pin.what).toEqual(pin.members);
}

interface Roster {
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly { readonly id: string; readonly digest: string }[] }[];
  readonly tests: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
}
const readRoster = (): Roster => JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;

describe("APO snapshot census (wb-021.2, MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2)", () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      if (pin.kind === "live") it(titleOf(row, pin), { timeout: LIVE_BUDGET_MS }, () => checkLive(pin));
      else if (pin.kind === "plant") it(titleOf(row, pin), { timeout: PLANT_BUDGET_MS }, () => checkPlant(pin));
      else if (pin.kind === "reading") it(titleOf(row, pin), () => checkReading(pin));
      else it(titleOf(row, pin), () => checkSeam(pin));
    }
  }

  it("outside anchors: the export row, its view classes and verbs, the seams it names, the shared edge kinds and the residual families", () => {
    const row = exportRow();
    const requirement = /^\[([^\]]+)\] /.exec(row.title)?.[1] ?? "";
    const statement = row.title.replace(/^\[[^\]]+\] /, "");
    expect(requirement, "the export row's requirement id").toBe(REQUIREMENT);
    expect(roleReading(requirement), "the requirement id carries the program's slug").toBe("slug:adaptive-policy-organizations");
    // Rows L, V and N tile the statement; rows P and Z tile the owner filing's acceptance, read from the filing alone.
    expect(["L", "V", "N"].map(id => rowOf(id).label).join(" "), "rows L, V and N tile the export title's statement").toBe(statement);
    expect(row.notes.startsWith("Owner filing ("), "the notes open with the owner filing").toBe(true);
    const filing = ownerFiling(row.notes);
    expect(filing.section.split(MARKER).length - 1, "the owner filing section holds exactly one acceptance line").toBe(1);
    expect(["P", "Z"].map(id => rowOf(id).label).join(" "), "rows P and Z tile the owner filing's acceptance").toBe(filing.acceptance);
    // The view classes are the statement's parenthesis, and rows V and P each plant every class.
    expect(/view class \(([^)]*)\)/.exec(statement)?.[1]?.split(", "), "VIEW_CLASSES is the statement's parenthesis").toEqual(VIEW_CLASSES);
    for (const id of ["V", "P"]) {
      const planted = VIEW_CLASSES.filter(viewClass => plants(id).some(pin => Object.values(pin.files).some(text => text.includes(`"APO ${viewClass}"`))));
      expect(planted, `row ${id} plants a view of every class`).toEqual(VIEW_CLASSES);
    }
    // Every EFFECT family holds a verb of the export text, and an N, P or Z plant reads each family.
    const exportWords = new Set(`${statement} ${filing.acceptance}`.toLowerCase().match(/[a-z]+/g) ?? []);
    expect(Object.entries(EFFECT_FAMILIES).filter(([, forms]) => !forms.some(form => exportWords.has(form))).map(([family]) => family), "every EFFECT family holds a verb of the export text").toEqual([]);
    const read = new Set(["N", "P", "Z"].flatMap(id => plants(id).flatMap(pin => pin.findings.flatMap(finding => [...finding.matchAll(/\(([a-z]+):[A-Za-z]+\)/g)].map(match => match[1])))));
    expect(Object.keys(EFFECT_FAMILIES).filter(family => !read.has(family)), "every EFFECT family is read by an N, P or Z plant").toEqual([]);
    // The acceptance's projection, capability and journal each name a seam, and every seam is a live S pin.
    for (const noun of ["projection", "capability", "journal"]) {
      expect(exportWords.has(noun), `the acceptance names the ${noun}`).toBe(true);
      expect(SEAMS.filter(seam => `${seam.name} ${seam.file}`.toLowerCase().includes(noun)).length, `the acceptance's ${noun} names a seam`).toBeGreaterThan(0);
    }
    const liveSeams = rowOf("S").pins.flatMap(pin => (pin.kind === "live" ? [(pin.expect as { seam?: unknown }).seam] : []));
    expect(liveSeams, "every seam is held to src by a live S pin, in SEAMS order").toEqual(SEAMS.map(seam => seam.name));
    expect(SEAM_EFFECTS, "the seam effect names are every seam's effect members").toEqual([...new Set(SEAMS.flatMap(seam => seam.effect))].sort());
    // wb-021.4's edge kinds, each routed by a P plant.
    const routed = new Set(plants("P").flatMap(pin => pin.findings.flatMap(finding => [...finding.matchAll(/ -([a-z-]+)-> /g)].map(match => match[1]))));
    expect(EDGE_KINDS.filter(kind => !routed.has(kind)), "every edge kind is routed by a P plant").toEqual([]);
    // Every finding kind is planted, and the residual families are the ones this header names.
    const kinds = new Set(ROWS.flatMap(candidate => candidate.pins.flatMap(pin => (pin.kind === "plant" ? pin.findings.map(finding => finding.split(" ")[0]) : []))));
    expect([...kinds].sort(), "every finding kind is held by a plant").toEqual(["CONSTRUCTOR", "EFFECT", "GLOBAL", "PACKAGE", "UNREADABLE", "UNRESOLVED"]);
    expect(Object.keys(RESIDUAL_FAMILIES), "the residual families equal this header's RESIDUALS line").toEqual(headerResiduals());
  });

  it("rule 16: every judged row and the residual families are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["L:3", "V:8", "N:5", "P:6", "Z:13", "R:23", "S:9", "Q:6"]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-UNNAMED-VIEW:Q R-UNNAMED-VIEW",
      "R-UNNAMED-EFFECT:Q R-UNNAMED-EFFECT",
      "R-IMPLICIT-CALL:Q R-IMPLICIT-CALL",
      "R-FIELD-MUTATION:Q R-FIELD-MUTATION",
      "R-COMPUTED-TEXT:Q R-COMPUTED-TEXT",
      "R-REFLECTIVE-REACH:Q R-REFLECTIVE-REACH",
    ]);
  });

  it("roster: the judged rows, the registered tests and the residual families equal test/fixtures/apo-snapshot-roster.json, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(
      ROWS.map(row => ({ id: row.id, label: row.label, pins: row.pins.map(pin => ({ id: pin.id, digest: pinDigest(pin) })) })),
      "the judged rows, read now, equal the roster rows exactly and in order",
    ).toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    const pinTitles = ROWS.flatMap(row => row.pins.map(pin => titleOf(row, pin)));
    expect(roster.tests.slice(0, pinTitles.length), "each pin registers its own test, in row order").toEqual(pinTitles);
    for (const member of Object.values(roster.residuals).flat()) expect(pinTitles, `${member} is a judged pin`).toContain(member);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const readEntry = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(readEntry), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
