/**
 * wb-021.4 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R5, program-triage-2026-10-18), the APO UI publish census: the standing absence
 * guard and the armed falsifier of a posture requirement whose program has no Pi surface yet.
 * Statement (the bead's tracker-export title, verbatim): "No Pi workbench UI interaction shall silently publish an APO graph
 * manifest or checkpoint: a view click, refresh, or keybinding never publishes ('No UI click silently publishes a graph'); if
 * a publish/promotion affordance ever appears it is an explicit, confirmed, governed operation outside the view surface,
 * delegating to the owner's revision-guarded CAS promotion ('publication is governed')."
 * Acceptance (the export notes, verbatim): "UI-affordance census plus a falsifier that no APO view handler reaches any
 * publish/promotion path."
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-27, at base bb193be): git lists 116 files under src/, all TypeScript. The
 * extension entry (package.json pi.extensions, ./src/index.ts) reaches 103 of them at run time; the 13 outside its closure
 * include src/workbench/patch-proposal.ts, the operator-only promotion record (recordPromotionDecision: "The workbench never
 * applies a promotion itself"), which no src module imports by any edge. No src text names the program. Nine modules hold UI
 * affordances (rows A and R); the view surface adds the three display modules of src/ui/. The judge, the edges, the
 * affordance readers and every finding are defined in test/helpers/apo-ui-publish-census.ts, beside the tables.
 *
 * ROWS (rows L, R and G tile the statement in order and rows A and F tile the acceptance, each label a verbatim segment held
 * to the export row by the outside-anchor case). L: the entry closure holds no PATH module and no UNRESOLVED or PACKAGE
 * finding (L1); src holds exactly the one PATH module, unreached by any edge (L2); no src text names the program (L3) -
 * ARMED: the first mention reds L3 and rows R, G and F bind it. R: the readers' classification is complete and no src text
 * holds a click word (R0); each affordance module's runtime closure, its render (refresh) path included, holds no PATH
 * module (one pin per module). G: no view-surface module holds a PATH text (G1); a planted promotion hint reds as OFFER
 * (G2); a planted governed publish operation outside every view reds the ENTRY leg, so it is re-judged here and never
 * admitted silently (G3). A: each affordance module's inventory (keys, handlers, interactive host calls, extension
 * interactions), one pin per module, and the readers' and the classification's planted entries. F: planted APO view
 * handlers reaching a path through every edge kind; the title's vocabulary words and the folded, template, regular-expression,
 * escaped-name, ignorable, mark and width readings; the fail-closed computed and missing imports and the package specifiers -
 * each named; the reading
 * pins (every member of the PUBLISH, PROMOTE and OBJECT lists and every slug form, each written out, and the near-words that
 * read nothing); and the quiet controls (type-only imports, a comment, a near-name, an unreached path module, a read-only
 * APO view). Q: the residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every row's id, label and pin digests, the
 * registered test titles and the residual families are held to the out-of-file roster
 * (test/fixtures/apo-ui-publish-roster.json).
 * OUTSIDE ANCHORS (their own case, plus the live pins): the export row - rows L, R and G tile its statement and rows A and F
 * its acceptance, its requirement id carries the slug and its statement the abbreviation, which is the slug's initials; the
 * title's words of the PATH families (measured: publish, publishes, publication, promotion, graph, manifest, checkpoint),
 * each in the judge's lists and each read by an F plant; package.json's entry; the shared reader's four SourceImport kinds,
 * each routed by an F plant; the src AST - the affordance set (the files of rows A and R), each inventory (row A), the view
 * surface (G1), the PATH set (L2) and every host UI member and pi surface src calls (classified, R0); and this header's
 * RESIDUALS line, parsed and held to the residual families. Anchored in this file and the roster only: the inflections the
 * word lists add beyond the title's words, the import-equals edge kind, the other F plants, the classified members src does
 * not call, and the residual quiet rows' contents (R-UNNAMED-PATH, R-PACKAGE and R-HELPER-KEY are also shown live in src).
 * NOT CLAIMED: the internals of a package (a package specifier is judged by its own words only); effects the vocabulary does
 * not name (R-UNNAMED-PATH); modules loaded at run time by a path or URL value (R-RUNTIME-LOAD); callbacks the host passes in
 * and any code outside src/.
 * RESIDUALS (named, each with its pinned quiet row in row Q): R-COMPUTED-TEXT, R-LOOKALIKE, R-UNNAMED-PATH, R-PACKAGE,
 * R-HELPER-KEY, R-RUNTIME-LOAD, R-HOST-ALIAS, R-PI-ALIAS.
 *
 * Display paths added: none. Test-only: no src change.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import {
  ABBREVIATION,
  EDGE_KINDS,
  ENTRY_FLOOR,
  inventoryOf,
  isLive,
  isPlant,
  isReading,
  type Judgment,
  judgeTree,
  type LivePin,
  type ModuleFacts,
  OBJECT,
  type PlantPin,
  PROMOTE,
  PUBLISH,
  pinDigest,
  RESIDUAL_FAMILIES,
  type ReadingPin,
  ROWS,
  type Row,
  readingsOf,
  resolveRelative,
  roleReading,
  SLUG,
  SRC_FLOOR,
  titleOf,
  wordsOf,
} from "./helpers/apo-ui-publish-census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-021.4";
const ROSTER = "test/fixtures/apo-ui-publish-roster.json";
const EXPORT = ".beads/issues.jsonl";
const SHARED_READER = "test/helpers/census.ts";
/** The live rows parse every src module twice (the shared reader and this census's own pass), so each carries this budget. */
const LIVE_BUDGET_MS = 60_000;

/** What git would commit under src/: tracked or untracked, never ignored, and still on disk. */
function srcFiles(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
}

/** The extension entries package.json names (pi.extensions), as tree-relative paths. */
function packageEntries(): string[] {
  const manifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as { pi?: { extensions?: unknown } };
  const entries = manifest.pi?.extensions;
  return Array.isArray(entries) ? entries.map(entry => String(entry).replace(/^\.\//, "")) : [];
}

interface Live {
  readonly files: readonly string[];
  readonly judgment: Judgment;
}
let cached: Live | undefined;
/** The src tree as it stands, judged once per run from the package.json entry. */
function live(): Live {
  if (cached === undefined) {
    const files = srcFiles();
    const [entry] = packageEntries();
    cached = { files, judgment: judgeTree({ root: ROOT, files, entry }) };
  }
  return cached;
}

const factsOf = (judgment: Judgment, file: string): ModuleFacts => {
  const facts = judgment.facts.get(file);
  if (facts === undefined) throw new Error(`${file} is not in the judged tree`);
  return facts;
};

/** One planted tree, written to rule-11 scratch and judged through the same judgeTree as the real one. */
function judgePlant(pin: PlantPin): Judgment {
  const root = makeScratch("apo-ui-publish-");
  try {
    for (const [file, text] of Object.entries(pin.files)) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      writeFileSync(join(root, file), text);
    }
    return judgeTree({ root, files: Object.keys(pin.files), entry: pin.entry });
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

/** The owner filing's acceptance sentence: the text after the notes' first "Acceptance: ", to the end of its line. */
function acceptanceOf(notes: string): string {
  const marker = "Acceptance: ";
  const start = notes.indexOf(marker);
  if (start < 0) return "";
  const rest = notes.slice(start + marker.length);
  const end = rest.indexOf("\n");
  return end < 0 ? rest : rest.slice(0, end);
}

/** The shared reader's import kinds: the string-literal members of SourceImport.kind in test/helpers/census.ts. */
function sharedReaderKinds(): string[] {
  const sf = ts.createSourceFile(SHARED_READER, readFileSync(join(ROOT, SHARED_READER), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of sf.statements) {
    if (!ts.isInterfaceDeclaration(statement) || statement.name.text !== "SourceImport") continue;
    for (const member of statement.members) {
      if (!ts.isPropertySignature(member) || member.name === undefined || !ts.isIdentifier(member.name) || member.name.text !== "kind" || member.type === undefined) continue;
      const kinds = ts.isUnionTypeNode(member.type) ? member.type.types : [member.type];
      return kinds.flatMap(kind => (ts.isLiteralTypeNode(kind) && ts.isStringLiteral(kind.literal) ? [kind.literal.text] : []));
    }
  }
  return [];
}

const rowOf = (id: string): Row => {
  const row = ROWS.find(candidate => candidate.id === id);
  if (row === undefined) throw new Error(`no row ${id}`);
  return row;
};
const liveFiles = (id: string): string[] =>
  rowOf(id)
    .pins.filter(isLive)
    .flatMap(pin => {
      const file = (pin.expect as { file?: unknown }).file;
      return typeof file === "string" ? [file] : [];
    });
const plants = (id: string): PlantPin[] => rowOf(id).pins.filter(isPlant);

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
  const { files, judgment } = live();
  const expected = pin.expect as Record<string, unknown>;
  if (pin.id === "L1-entry") {
    expect(packageEntries(), "package.json names exactly one extension entry").toEqual([expected.entry]);
    expect(files.length).toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(files.filter(file => !file.endsWith(".ts")), "every src file is TypeScript, so every one is read").toEqual([]);
    expect(judgment.entryClosure.length, "the entry reaches at least the floor of modules").toBeGreaterThanOrEqual(ENTRY_FLOOR);
    expect(judgment.surface.filter(file => !judgment.entryClosure.includes(file)), "every view-surface module sits in the entry closure").toEqual([]);
    expect(judgment.findings, "no finding of any kind in the real tree").toEqual(expected.findings);
    return;
  }
  if (pin.id === "L2-paths") {
    const known = new Set(files);
    const [only] = judgment.pathModules;
    const importers = files.filter(file =>
      factsOf(judgment, file).edges.some(edge => edge.specifier?.startsWith(".") && only !== undefined && resolveRelative(known, file, edge.specifier) === only),
    );
    expect({
      pathModules: judgment.pathModules,
      first: only === undefined ? undefined : factsOf(judgment, only).paths[0]?.reading,
      importers,
      inEntry: only !== undefined && judgment.entryClosure.includes(only),
    }).toEqual(expected);
    return;
  }
  if (pin.id === "L3-roles") {
    expect({ roleModules: judgment.roleModules }).toEqual(expected);
    return;
  }
  if (pin.id === "R0-kinds") {
    expect({
      unclassified: judgment.findings.filter(finding => finding.startsWith("UNCLASSIFIED ")),
      clicks: files.flatMap(file => factsOf(judgment, file).clicks.map(click => `${file}:${click.line} ${click.reading}`)),
    }).toEqual(expected);
    expect(judgment.surface.filter(file => !judgment.entryClosure.includes(file))).toEqual([]);
    return;
  }
  if (pin.id === "G1-surface") {
    expect({ surface: judgment.surface, offers: judgment.findings.filter(finding => finding.startsWith("OFFER ")) }).toEqual(expected);
    return;
  }
  const file = expected.file;
  if (typeof file !== "string") throw new Error(`live pin ${pin.id} names no file`);
  expect(judgment.affordances, `${file} is an affordance module`).toContain(file);
  if (pin.id.startsWith("R-")) {
    expect(judgment.entryClosure, `${file} sits in the entry closure`).toContain(file);
    expect({ file, reach: judgment.findings.filter(finding => finding.startsWith(`REACH ${file} `)) }).toEqual(expected);
    return;
  }
  if (pin.id.startsWith("A-")) {
    expect(inventoryOf(factsOf(judgment, file))).toEqual(expected);
    return;
  }
  throw new Error(`live pin ${pin.id} has no check`);
}

function checkReading(pin: ReadingPin): void {
  expect(Object.fromEntries(Object.keys(pin.readings).map(text => [text, readingsOf(text)])), pin.what).toEqual(pin.readings);
}

function checkPlant(pin: PlantPin): void {
  const judgment = judgePlant(pin);
  // The planted tree is the shape its pin names: every planted file that dispatches a key is read as an affordance.
  const dispatching = Object.entries(pin.files)
    .filter(([, text]) => text.includes("matchesKey(data"))
    .map(([file]) => file)
    .sort();
  expect(dispatching.filter(file => !judgment.affordances.includes(file)), "every planted key dispatcher is an affordance module").toEqual([]);
  expect(judgment.findings, pin.what).toEqual([...pin.findings].sort());
  expect(judgment.roleModules, "the planted ROLE modules").toEqual(pin.roles ?? []);
  if (pin.inventory !== undefined) expect(judgment.affordances.map(file => inventoryOf(factsOf(judgment, file)))).toEqual(pin.inventory);
}

interface Roster {
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly { readonly id: string; readonly digest: string }[] }[];
  readonly tests: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
}
const readRoster = (): Roster => JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;

describe("APO UI publish census (wb-021.4, MW-ADAPTIVE-POLICY-ORGANIZATIONS-R5)", () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      if (isLive(pin)) it(titleOf(row, pin), { timeout: LIVE_BUDGET_MS }, () => checkLive(pin));
      else if (isReading(pin)) it(titleOf(row, pin), () => checkReading(pin));
      else it(titleOf(row, pin), () => checkPlant(pin));
    }
  }

  it("outside anchors: the export row, the title's vocabulary, the package.json entry, the shared reader's edge kinds and the live affordance set", { timeout: LIVE_BUDGET_MS }, () => {
    const row = exportRow();
    const requirement = /^\[([^\]]+)\] /.exec(row.title)?.[1] ?? "";
    const statement = row.title.replace(/^\[[^\]]+\] /, "");
    // Rows L, R and G tile the statement and rows A and F the acceptance, so a row or a label cut short reds here.
    expect(["L", "R", "G"].map(id => rowOf(id).label).join(" "), "rows L, R and G tile the export title's statement").toBe(statement);
    expect(["A", "F"].map(id => rowOf(id).label).join(" "), "rows A and F tile the export notes' acceptance").toBe(acceptanceOf(row.notes));
    // The role judge's vocabulary is the title's own: the requirement id carries the slug, the statement the abbreviation.
    expect(roleReading(requirement)).toBe(`slug:${SLUG.map(forms => forms.find(form => wordsOf(requirement).includes(form))).join("-")}`);
    expect(wordsOf(statement)).toContain(ABBREVIATION);
    expect(SLUG.map(forms => forms[0]?.charAt(0)).join("")).toBe(ABBREVIATION);
    // The PATH vocabulary covers the title's words, and an F plant reads each one.
    const titleWords = [...new Set(wordsOf(statement))];
    const families = titleWords.filter(word => /^(publi|promot|graph|manifest|checkpoint)/.test(word)).sort();
    expect(families.filter(word => ![...PUBLISH, ...PROMOTE, ...OBJECT].includes(word)), "every title word of the PATH families is in the judge's lists").toEqual([]);
    expect(families.length).toBeGreaterThanOrEqual(1);
    const read = new Set(plants("F").flatMap(pin => pin.findings.flatMap(finding => [...finding.matchAll(/\((?:promote|publish):([a-z]+)(?:\+([a-z]+))?\)/g)].flatMap(match => [match[1], match[2]]))));
    expect(families.filter(word => !read.has(word)), "every title word of the PATH families is read by an F plant").toEqual([]);
    // The entry is package.json's, and the edge kinds are the shared reader's plus import-equals, each routed by an F plant.
    expect(packageEntries()).toEqual(["src/index.ts"]);
    expect(sharedReaderKinds(), "the shared reader's SourceImport kinds").toEqual(EDGE_KINDS.filter(kind => kind !== "import-equals"));
    const routed = new Set(plants("F").flatMap(pin => pin.findings.flatMap(finding => [...finding.matchAll(/ -([a-z-]+)-> /g)].map(match => match[1]))));
    expect(EDGE_KINDS.filter(kind => !routed.has(kind)), "every edge kind is routed by an F plant").toEqual([]);
    // The live affordance set, read from the AST, is exactly the files of rows A and R.
    const { judgment } = live();
    expect(liveFiles("A"), "row A pins every live affordance module").toEqual(judgment.affordances);
    expect(liveFiles("R"), "row R pins every live affordance module").toEqual(judgment.affordances);
    // The residual families are the ones this header names; three of them are live in src today.
    expect(Object.keys(RESIDUAL_FAMILIES), "the residual families equal this header's RESIDUALS line").toEqual(headerResiduals());
    const facts = (file: string): ModuleFacts => factsOf(judgment, file);
    expect(judgment.entryClosure.filter(file => facts(file).writes > 0 && facts(file).paths.length === 0).length, "R-UNNAMED-PATH is live: the entry closure writes files under no PATH name").toBeGreaterThan(0);
    expect(judgment.packages.length, "R-PACKAGE is live: the judged closures import packages, none followed").toBeGreaterThan(0);
    expect(judgment.affordances.filter(file => facts(file).keys.includes("<computed>")).length, "R-HELPER-KEY is live: a src key reads computed").toBeGreaterThan(0);
  });

  it("rule 16: every judged row and the residual families are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["L:3", "R:10", "G:3", "A:11", "F:37", "Q:8"]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-COMPUTED-TEXT:Q R-COMPUTED-TEXT",
      "R-LOOKALIKE:Q R-LOOKALIKE",
      "R-UNNAMED-PATH:Q R-UNNAMED-PATH",
      "R-PACKAGE:Q R-PACKAGE",
      "R-HELPER-KEY:Q R-HELPER-KEY",
      "R-RUNTIME-LOAD:Q R-RUNTIME-LOAD",
      "R-HOST-ALIAS:Q R-HOST-ALIAS",
      "R-PI-ALIAS:Q R-PI-ALIAS",
    ]);
  });

  it("roster: the judged rows, the registered tests and the residual families equal test/fixtures/apo-ui-publish-roster.json, in order and both ways", ({ task }) => {
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
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
