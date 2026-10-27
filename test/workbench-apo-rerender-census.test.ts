/**
 * wb-021.5 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7, program-triage-2026-10-18), the rerender-authority census: a Pi view
 * refresh or an observation re-projection is never authorization to trigger a decision or an effect.
 * Statement (the bead's tracker-export title, verbatim; the export spells the dash as the six characters backslash, u, 2, 0,
 * 1, 4, read here as DASH): "[MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7] (merge into R6) Rerender is not effect authorization: a Pi
 * view refresh or observation re-projection of APO/native state shall never be treated as authorization to trigger a
 * decision or effect DASH re-rendering recorded observations issues no event admission and no invocation; new decisions
 * arise only under the application-defined event admission and dwell rules on the MW side."
 * Acceptance (the export notes, verbatim): "Merged into R6's render/refresh purity falsifier (refresh N times yields zero
 * invocations/admissions and byte-identical projection reads); kept as its own row only to preserve the distinct authority
 * citation". The R6 draft was refuted at the triage's second-pass verify and stands only as an unvetted candidate in the
 * wb-xvey residual list (its title names MW-ADAPTIVE-POLICY-ORGANIZATIONS R4/R6/R9; no bead carries R6), so this row carries
 * the falsifier its notes name. The authority is the notes' citation (MechanicalWorkflows 03-operational-semantics.md:7 at
 * 4b8b974ca72b, "rerendering is not effect authorization"); this census reads it from the notes and never re-reads the
 * program. The statement's last clause ("new decisions arise only under the application-defined event admission and dwell
 * rules on the MW side") binds MW, not Pi, and is not judged here.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-27, at this census's base 215c025): src holds 116 TypeScript modules and
 * none spells the program (the mention judge below: 0 findings), so APO state has no Pi surface today and the posture binds
 * the surfaces that present native state. Eleven typed readers over ObservationProjection (Pick<ObservationProjection, ...>)
 * sit in eight modules (attention, evidence-wiring, graph-view, latency, observe-query, telemetry, timeline, topology-slice), each
 * keeping read members only; two src/ui modules hold the whole projection in a render model (workflow-inspector's
 * InspectorModel, workflow-menu's WorkflowMenuDeps). ObservationProjection's public methods are 18: twelve copy-out reads and
 * six admissions (disconnect, ingest, markStale, reconnect, refresh, relate). No src file is edited by this cut.
 *
 * THE WORLD. Every subject renders in a fresh world: a real ObservationProjection holding recorded observations (five
 * snapshots, one event-only node, five typed relations of every kind, a cycle among them) behind a recording proxy (the
 * tap: every member call and every property write through it is logged); a real CapabilityRegistry with one fixture
 * capability per declared effect class, behind its own tap (every call but its four read members is an invocation attempt);
 * a real EvidenceStore whose one loader invokes the read capability through that registry, behind a tap; and recorders for
 * every host effect the dialog seam can perform (each WorkflowDialogActions member's effect, the transcript viewer, notify).
 * THE JUDGE prepares a subject, marks every log, renders it N = RENDERS (4) times, settles microtasks and immediates, and
 * reads only what the renders did: admissions (admission members called through the tap, and set:<name> per write), the
 * registry's own admission count gained (admitted plus refused), invocation attempts and provider calls, effects (evidence
 * store calls other than get, and host effects), whether every render serialized to the same bytes, and whether the
 * projection's state digest (everything a reader could see, read on the untapped object) moved. QUIET is the reading every
 * view refresh owes: nothing admitted, nothing invoked, no effect, the same bytes, the same state. Two detectors read an
 * admission independently: the tap, and the digest (a write that bypasses the tap still moves the state).
 *
 * TABLES (each quotes the bead's own words; the anchor row holds every quote to the export and the quotes tile the statement
 * and the acceptance). SURFACES, "a Pi view refresh or observation re-projection": the real surfaces, each case judged
 * QUIET, with liveness (the renders read the projection and the first render shows the recorded observations): the graph
 * view (buildGraphView and the cached createGraphViewBuilder), the timeline lanes, the model-facing observe reply, the linked
 * topology slice, the attention report, the latency decomposition, the operations telemetry, the inspector layout of each of
 * the four views (its model built as the host builds it per redraw), the real host seam's dialog redraw of each view
 * (showWorkflowDialog over the tapped world, tab to the view, then N redraws: its held per-redraw builders and layoutInspector),
 * and each read member of the projection itself. ADMISSION, "re-rendering recorded observations issues no event admission":
 * a render calling each admission member is read by the tap and by the digest (each one moves the state), a write through
 * the tap and a write bypassing it are read. INVOCATION, "and no invocation": an invoke of each effect class, an
 * inspect, an invoke of an unregistered capability, an evidence load and an invoke deferred to the next immediate, each
 * started by a render, are read (the settle step is what reads the last). EFFECT, "shall never be
 * treated as authorization to trigger a decision or effect": each dialog action's host effect and each evidence abort are
 * read. IDENTITY, "and byte-identical projection reads": a frame counter, reordered keys and a random token are read as not
 * byte-identical. QUIET, "refresh N times yields zero invocations/admissions": a constant render, a window read and a render
 * calling every read member read QUIET, so the judge is not merely red. READERS, "Rerender is not effect authorization" (the
 * type half): a typed reader keeping an admission member, through Pick, Partial, an interface, a qualified name or an Omit,
 * is read as a writer, and keys that are not literals fail closed. ABSENCE, "of APO/native state": the mention judge finds
 * the program's abbreviation and slug in every spelling form and nothing else.
 * LIVE ROWS. READER WALK: every src module (git's list, held equal to a filesystem walk) is scanned, no typed reader keeps
 * a writer, at a site floor and through a liveness anchor (graph-view's reader). COVERAGE (the armed half): the modules that
 * declare a typed reader, plus the src/ui modules importing the projection, are exactly the SURFACES modules and the named
 * non-render reader (NON_RENDER), so the first new view surface (an APO view included) reds here until a SURFACES row judges
 * it. MEMBERS: the projection's public methods, read from src by the AST, are exactly READ_MEMBERS and ADMISSION_MEMBERS, the
 * ADMISSION row plants every admission member and REPROJECTION reads every read member. EFFECT CLASSES: the plants invoke
 * every effect class the registry's CapabilityDescriptor declares. DIALOG ACTIONS: the plants perform every
 * WorkflowDialogActions member. ABSENCE WALK: no src module (path and text) spells the program, at a file floor.
 * OUTSIDE ANCHORS (each a source of truth outside this file and its roster): src (COVERAGE, MEMBERS, EFFECT CLASSES,
 * DIALOG ACTIONS) and the bead's export row (every table quote, the two tilings, the program's two spellings in the title),
 * so a SURFACES row, an admission plant, an effect-class plant or a dialog-action plant removed from ROWS, the frozen literal
 * and the roster together still reds.
 * RESIDUALS (named, each with its pinned quiet row): R-DEFERRED-EFFECT an invocation a render schedules past the settle
 * window (INVOCATION); R-SIDE-CHANNEL an effect through a channel the world does not hold - a module global, a file, the
 * network (EFFECT); R-LATE-DRIFT drift that first appears after N renders (IDENTITY); R-FULL-TYPE a parameter typed as the
 * whole projection is not a typed reader to the scan - the two src/ui render models are judged by the SURFACES rows instead
 * (READERS); R-ALIASED-CLASS a Pick over an alias of the class is not read (READERS); R-PARAPHRASE a paraphrase of the program
 * or its abbreviation spelled with separators is not a mention (ABSENCE).
 * NOT CLAIMED (edits of this file, its helper and the roster together): a plant row of IDENTITY, QUIET, WRITE-ANY-ROUTE,
 * OTHER-ROUTES, EVIDENCE-ABORTS or a residual row removed with its frozen-literal element and roster entry (no outside anchor
 * names those plants); a case and its expected reading re-authored together; a judged-row assertion narrowed in this file
 * (the SURFACES rows' QUIET comparison cut to fewer fields stays green, since every real surface reads QUIET on every field:
 * the src plants recorded with the cut are that comparison's falsifiers); the legacy (non-inspector) dialog frame, whose
 * spinner and elapsed time read a clock by design and which reads no observation beyond the window total.
 * FROZEN SHAPE (standing rule 16): the rule-16 row pins `${table}/${id}:${pins.length}` for every judged row, the residual
 * families and the member sets as literals; test/fixtures/apo-rerender-roster.json holds every judged row (table, id, label,
 * SHA-256 of each case, test), every registered test title and the residual families, judged by this file's last row in
 * order and both ways.
 *
 * Display paths added: none (test-only; src is read and run, never edited). Scratch: none - every world is in memory.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ABSENCE,
  ACTION_EFFECTS,
  ADMISSION,
  ADMISSION_MEMBERS,
  type AdmissionMember,
  type DialogAction,
  EFFECT,
  EFFECT_CLASSES,
  type EffectClass,
  IDENTITY,
  INVOCATION,
  importsProjection,
  interfaceMembers,
  judgeRerender,
  mentions,
  NON_RENDER,
  PLANT_TABLES,
  plantSubject,
  propertyLiterals,
  publicMethods,
  QUIET,
  QUIETS,
  READ_MEMBERS,
  READERS,
  RENDERS,
  RESIDUAL_FAMILIES,
  ROWS,
  SURFACES,
  scanReaders,
  surfaceSubject,
  TABLE_QUOTES,
} from "./helpers/apo-rerender-census.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const ROSTER = "test/fixtures/apo-rerender-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-021.5";
/** The budget the walking and dialog rows register: each reads every src module or opens a real dialog per case. */
const WALK_BUDGET_MS = 60_000;
/** The src floor: 116 modules at the base; a walk narrowed below 100 reds. */
const SRC_FLOOR = 100;
/** The typed-reader floor: 11 sites at the base; a scan that loses two reds. */
const READER_FLOOR = 10;
/** The liveness anchor of the reader walk: graph-view's reader, as the scan writes it. */
const READER_ANCHOR = "src/workbench/graph-view.ts: relationRevision,relationsPage,window";
/** Shows the recorded observations: a fixture title, a native ref path, a native id as JSON, or the six recorded nodes examined. */
const SHOWS_FIXTURE = /Furnace attempt F|furnace\/operation\/F|"F"|"examined":\{"nodes":6,/;
const READER_WALK = "live: no typed reader in any src module keeps an admission member; the walk is every src module and reaches graph-view's reader";
const COVERAGE = "live (armed): every src module that reads the projection is a SURFACES row or a named non-render reader";
const MEMBERS = "live: the projection's public methods are exactly the read and admission members, each planted or re-projected";
const CLASSES = "live: the invocation plants invoke every effect class the registry's descriptor declares";
const ACTIONS = "live: the effect plants perform every WorkflowDialogActions member";
const ABSENCE_WALK = "live: no src module spells the program, by path or text; the walk is every src module";
const ANCHOR = "anchor: every table quote is the bead's own text and the quotes tile its statement and acceptance (.beads/issues.jsonl, wb-021.5)";
const SLOW = new Set(["SURFACES INSPECTOR", "SURFACES DIALOG", "SURFACES REPROJECTION", READER_WALK, COVERAGE, ABSENCE_WALK]);

interface Roster {
  readonly rows: unknown;
  readonly tests: readonly string[];
  readonly residuals: unknown;
}
interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
const read = (rel: string): string => readFileSync(join(ROOT, rel), "utf8");

/** git's tracked list of src/, held equal to an independent filesystem walk by the walking rows. */
function trackedSrc(): string[] {
  return execFileSync("git", ["ls-files", "--", "src"], { cwd: ROOT, encoding: "utf8" })
    .split("\n")
    .filter(line => line !== "")
    .sort();
}
function walkedSrc(): string[] {
  return readdirSync(join(ROOT, "src"), { recursive: true, encoding: "utf8" })
    .map(name => `src/${name.split("\\").join("/")}`)
    .filter(rel => statSync(join(ROOT, rel)).isFile())
    .sort();
}
function srcModules(): string[] {
  const files = trackedSrc();
  expect(files, "git's src list equals a filesystem walk of src/").toEqual(walkedSrc());
  expect(files.length >= SRC_FLOOR, `${files.length} src files, floor ${SRC_FLOOR}`).toBe(true);
  return files;
}

/** This bead's row in the tracked export: the owner filing's title and notes, an anchor outside this file and its roster. */
function exportRow(): ExportRow {
  for (const line of read(BEAD_EXPORT).split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (row !== null && typeof row === "object" && "id" in row && row.id === BEAD && "title" in row && typeof row.title === "string" && "notes" in row && typeof row.notes === "string") {
      return { title: row.title, notes: row.notes };
    }
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row with a title and notes`);
}

const plantMembers = (): AdmissionMember[] =>
  (ADMISSION.rows.find(row => row.id === "EVERY-ADMISSION-MEMBER")?.cases ?? []).flatMap(item => (item.subject.plant === "admit" ? [item.subject.member] : []));
const plantClasses = (): EffectClass[] =>
  (INVOCATION.rows.find(row => row.id === "EVERY-EFFECT-CLASS")?.cases ?? []).flatMap(item => (item.subject.plant === "invoke" ? [item.subject.effectClass] : []));
const plantActions = (): DialogAction[] =>
  (EFFECT.rows.find(row => row.id === "EVERY-DIALOG-ACTION")?.cases ?? []).flatMap(item => (item.subject.plant === "action" ? [item.subject.action] : []));

describe("rerender-authority census (wb-021.5, MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7)", () => {
  for (const entry of SURFACES.rows) {
    it(`SURFACES ${entry.id}`, { timeout: WALK_BUDGET_MS }, async () => {
      for (const item of entry.cases) {
        const judged = await judgeRerender(surfaceSubject(item));
        expect(judged.reading, JSON.stringify(item)).toEqual(QUIET);
        if (item.surface === "projection.read") expect(judged.reads, `${item.member}: the re-projection called its own member`).toEqual([item.member]);
        else {
          expect(judged.reads.length > 0, `${JSON.stringify(item)}: the renders read the projection`).toBe(true);
          expect(SHOWS_FIXTURE.test(judged.first), `${JSON.stringify(item)}: the first render shows the recorded observations`).toBe(true);
        }
      }
    });
  }
  for (const table of PLANT_TABLES) {
    for (const entry of table.rows) {
      it(`${table.name} ${entry.id}`, async () => {
        for (const item of entry.cases) expect((await judgeRerender(plantSubject(item.subject))).reading, JSON.stringify(item.subject)).toEqual(item.expect);
      });
    }
  }
  for (const entry of READERS.rows) {
    it(`READERS ${entry.id}`, () => {
      for (const item of entry.cases) {
        const scan = scanReaders("plant.ts", item.text);
        expect({ readers: scan.readers.length, writers: scan.writers }, item.text).toEqual(item.expect);
      }
    });
  }
  for (const entry of ABSENCE.rows) {
    it(`ABSENCE ${entry.id}`, () => {
      for (const item of entry.cases) expect(mentions(item.text), item.text).toEqual(item.expect);
    });
  }

  it(READER_WALK, { timeout: WALK_BUDGET_MS }, () => {
    const scans = srcModules().map(rel => ({ rel, ...scanReaders(rel, read(rel)) }));
    const sites = scans.flatMap(scan => scan.readers.map(reader => `${scan.rel}: ${reader}`));
    expect(scans.flatMap(scan => scan.writers.map(writer => `${scan.rel}: ${writer}`)), "typed readers keeping an admission member").toEqual([]);
    expect(sites.length >= READER_FLOOR, `${sites.length} typed reader sites, floor ${READER_FLOOR}`).toBe(true);
    expect(sites, "the walk reached graph-view's reader").toContain(READER_ANCHOR);
    // Non-vacuity: the same scan reads a writer in a planted module, after the real ones.
    expect(scanReaders("plant.ts", 'type R = Pick<ObservationProjection, "relate">;').writers).toEqual(["relate"]);
  });

  it(COVERAGE, { timeout: WALK_BUDGET_MS }, () => {
    const modules = srcModules().filter(rel => {
      const text = read(rel);
      return scanReaders(rel, text).readers.length > 0 || (rel.startsWith("src/ui/") && importsProjection(rel, text));
    });
    const judged = SURFACES.rows.map(row => row.module).filter(module => module !== "src/workbench/observation.ts");
    expect(modules, "the view modules src holds equal the SURFACES modules and the named non-render readers").toEqual([...judged, ...Object.keys(NON_RENDER)].sort());
    expect(SURFACES.rows.map(row => row.module).filter(module => !existsSync(join(ROOT, module))), "every SURFACES module exists").toEqual([]);
    // Non-vacuity: a planted src/ui module that imports the projection, and a planted typed reader, both read as view modules.
    expect(importsProjection("src/ui/plant.ts", 'import type { ObservationProjection } from "../workbench/observation.js";')).toBe(true);
    expect(scanReaders("src/workbench/plant.ts", 'type R = Pick<ObservationProjection, "query">;').readers).toHaveLength(1);
  });

  it(MEMBERS, () => {
    const methods = publicMethods("src/workbench/observation.ts", read("src/workbench/observation.ts"), "ObservationProjection");
    expect([...methods].sort(), "ObservationProjection's public methods are the read and admission members, exactly").toEqual([...READ_MEMBERS, ...ADMISSION_MEMBERS].sort());
    expect(plantMembers(), "the admission row plants every admission member, in order").toEqual([...ADMISSION_MEMBERS]);
    const reprojection = SURFACES.rows.find(row => row.id === "REPROJECTION")?.cases ?? [];
    expect(reprojection.flatMap(item => (item.surface === "projection.read" ? [item.member] : [])), "the re-projection row reads every read member, in order").toEqual([...READ_MEMBERS]);
  });

  it(CLASSES, () => {
    const declared = propertyLiterals("src/workbench/capability-registry.ts", read("src/workbench/capability-registry.ts"), "CapabilityDescriptor", "effectClass");
    expect(declared, "the registry's declared effect classes").toEqual([...EFFECT_CLASSES]);
    expect(plantClasses(), "the invocation row invokes every declared class, in order").toEqual(declared);
  });

  it(ACTIONS, () => {
    const declared = interfaceMembers("src/ui/workflow-dialog.ts", read("src/ui/workflow-dialog.ts"), "WorkflowDialogActions");
    expect(declared, "the dialog's declared actions").toEqual(Object.keys(ACTION_EFFECTS));
    expect(plantActions(), "the effect row performs every declared action, in order").toEqual(declared);
  });

  it(ABSENCE_WALK, { timeout: WALK_BUDGET_MS }, () => {
    const files = srcModules();
    expect(files.flatMap(rel => mentions(`${rel}\n${read(rel)}`).map(found => `${rel}: ${found}`)), "src modules that spell the program").toEqual([]);
    // Non-vacuity: the same judge, after the real modules, finds the program in a planted module path and text.
    expect(mentions("src/ui/apo-view.ts\nexport const view = 'adaptive policy organizations';")).toEqual(["apo", "adaptive policy organizations"]);
  });

  it(ANCHOR, () => {
    const row = exportRow();
    const text = `${row.title}\n${row.notes}`;
    for (const { table, quote } of TABLE_QUOTES) expect(text.includes(quote), `${table}: "${quote}" is the bead's own text`).toBe(true);
    expect(row.title, "the statement: surfaces, state, authorization").toContain(`${SURFACES.quote} ${ABSENCE.quote} ${EFFECT.quote}`);
    expect(row.title, "the statement: admission, invocation").toContain(`${ADMISSION.quote} ${INVOCATION.quote};`);
    expect(row.notes, "the acceptance: zero invocations and admissions, byte-identical reads").toContain(`(${QUIETS.quote} ${IDENTITY.quote})`);
    expect(row.title.startsWith("[MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7] (merge into R6) "), "the requirement id and the merge target").toBe(true);
    expect(row.title, "the type half's quote").toContain(READERS.quote);
    expect(mentions(row.title), "the title spells the program both ways the mention judge reads").toEqual(["adaptive policy organizations", "apo"]);
    expect(RENDERS >= 2, "N renders compare at least two").toBe(true);
  });

  it("rule 16: every judged row, the residual families and the member sets are frozen at their measured shape", () => {
    expect(ROWS.map(entry => `${entry.table}/${entry.id}:${entry.pins.length}`)).toEqual([
      "SURFACES/GRAPH-VIEW:3",
      "SURFACES/TIMELINE:2",
      "SURFACES/OBSERVE:2",
      "SURFACES/TOPOLOGY:2",
      "SURFACES/ATTENTION:2",
      "SURFACES/LATENCY:1",
      "SURFACES/TELEMETRY:1",
      "SURFACES/INSPECTOR:4",
      "SURFACES/DIALOG:4",
      "SURFACES/REPROJECTION:12",
      "ADMISSION/EVERY-ADMISSION-MEMBER:6",
      "ADMISSION/WRITE-ANY-ROUTE:2",
      "INVOCATION/EVERY-EFFECT-CLASS:4",
      "INVOCATION/OTHER-ROUTES:4",
      "INVOCATION/R-DEFERRED-EFFECT:1",
      "EFFECT/EVERY-DIALOG-ACTION:6",
      "EFFECT/EVIDENCE-ABORTS:2",
      "EFFECT/R-SIDE-CHANNEL:1",
      "IDENTITY/DRIFT-FOUND:3",
      "IDENTITY/R-LATE-DRIFT:1",
      "QUIET/READ-ONLY-RENDERS:3",
      "READERS/READ-ONLY-PICKS:3",
      "READERS/WRITER-PICKS:4",
      "READERS/OMIT-AND-UNRESOLVED:3",
      "READERS/R-FULL-TYPE:1",
      "READERS/R-ALIASED-CLASS:1",
      "ABSENCE/MENTION-FOUND:6",
      "ABSENCE/NOT-MENTIONS:3",
      "ABSENCE/R-PARAPHRASE:2",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-DEFERRED-EFFECT:INVOCATION R-DEFERRED-EFFECT",
      "R-SIDE-CHANNEL:EFFECT R-SIDE-CHANNEL",
      "R-LATE-DRIFT:IDENTITY R-LATE-DRIFT",
      "R-FULL-TYPE:READERS R-FULL-TYPE",
      "R-ALIASED-CLASS:READERS R-ALIASED-CLASS",
      "R-PARAPHRASE:ABSENCE R-PARAPHRASE",
    ]);
    expect([READ_MEMBERS.join(","), ADMISSION_MEMBERS.join(","), EFFECT_CLASSES.join(","), Object.keys(ACTION_EFFECTS).join(","), String(RENDERS)]).toEqual([
      "aggregate,aggregateStats,events,identityRefusals,indexOf,query,relationRevision,relations,relationsPage,stats,truncation,window",
      "disconnect,ingest,markStale,reconnect,refresh,relate",
      "read,write,external,unknown",
      "onKill,onPause,onResume,onSkipAgent,onRetryAgent,onOpenAgent",
      "4",
    ]);
  });

  it("roster: the judged rows, the registered tests and the residual families equal test/fixtures/apo-rerender-roster.json, in order and both ways", ({ task }) => {
    const roster = JSON.parse(read(ROSTER)) as Roster;
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    for (const member of Object.values(RESIDUAL_FAMILIES).flat()) expect(ROWS.some(entry => entry.test === member), `${member} is a judged row`).toBe(true);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly timeout: number; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, timeout: child.timeout, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    expect(roster.tests.slice(0, ROWS.length), "each judged row registers its own test, in row order").toEqual(ROWS.map(entry => entry.test));
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    expect(walked.filter(entry => entry.timeout === WALK_BUDGET_MS).map(entry => entry.name), "the walking and dialog rows, and only they, register the walk budget").toEqual(titles.filter(name => SLOW.has(name) || name.startsWith("SURFACES ")));
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const status = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(status), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
