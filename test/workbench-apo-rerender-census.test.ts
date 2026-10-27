/**
 * wb-021.5 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7, program-triage-2026-10-18), the rerender-authority census: a Pi view
 * refresh or an observation re-projection is never authorization to trigger a decision or an effect.
 * Statement (the bead's tracker-export title, verbatim; the export spells the dash as the six characters backslash, u, 2, 0,
 * 1, 4, read here as DASH): "[MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7] (merge into R6) Rerender is not effect authorization: a Pi
 * view refresh or observation re-projection of APO/native state shall never be treated as authorization to trigger a
 * decision or effect DASH re-rendering recorded observations issues no event admission and no invocation; new decisions
 * arise only under the application-defined event admission and dwell rules on the MW side."
 * Acceptance (the owner filing, verbatim: the export notes' first two paragraphs, filed at the program-triage-2026-10-18
 * export b21beb0): "Merged into R6's render/refresh purity falsifier (refresh N times yields zero invocations/admissions and
 * byte-identical projection reads); kept as its own row only to preserve the distinct authority citation". The R6 draft was
 * refuted at the triage's second-pass verify and stands only as an unvetted candidate in the wb-xvey residual list (its
 * title names MW-ADAPTIVE-POLICY-ORGANIZATIONS R4/R6/R9; no bead carries R6), so this row carries the falsifier its filing
 * names. The authority is the filing's citation (MechanicalWorkflows 03-operational-semantics.md:7 at 4b8b974ca72b,
 * "rerendering is not effect authorization"); this census reads it from the filing and never re-reads the program. The
 * statement's last clause ("new decisions arise only under the application-defined event admission and dwell rules on the
 * MW side") binds MW, not Pi, and is not judged here.
 *
 * CUT #2 (the respin of refusal #1, gate run g10-gate-s115). U1: COVERAGE reads every src module that reaches the
 * projection as the TypeScript checker resolves its names (cut #1 read the modules with a Pick or Omit reader plus the
 * src/ui modules importing the class by name); the fourteen modules that reach it off the render path are named, measured
 * and reasoned in NON_RENDER. U2: the member readers are the checker's (every member kind and name form, inherited, merged
 * and augmented members; signatures fail closed). U3: the acceptance and every quote are read from one section (the
 * title, or the owner filing) and held to one occurrence there, the filing pinned byte for byte. F2 (arrow-function members)
 * is closed by U2's reader, F3 (identity read through JSON only) by the structural encoding, F4 (indexed-access readers) by
 * the type scan; F1 is the base below.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-27, at trunk 3223843; the later trunk merges up to the base this cut
 * records change no src file, and that src tree differs from e811dbb, cut #1's base, only by the wb-86q landing, which
 * adds observe-query's identityRefusals reader): src holds 116 TypeScript modules and none spells the program (the mention judge below:
 * 0 findings), so APO state has no Pi surface today and the posture binds the surfaces that present native state. 24 src
 * modules reach the projection as the checker resolves their names: the 10 SURFACES modules and the 14 NON_RENDER readers
 * (the extension entry, the control decision, the control tool and the detached control seam, and the observers and
 * adapters that state what the host admits), none of which a SURFACES module runs. Twelve typed readers (Pick<ObservationProjection,
 * ...>) sit in eight modules, each keeping read members only, and the eight indexed accesses into the class in src are each
 * the argument of Parameters or ReturnType (a statement or a result type: the type scan reads them as keeping no member,
 * the reach scan as type references of relate and refresh). ObservationProjection's public
 * instance members are its 18 methods: twelve copy-out reads and six admissions (disconnect, ingest, markStale, reconnect,
 * refresh, relate). No src file is edited by this cut.
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
 * store calls other than get, and host effects), whether every render encoded to the same JSON bytes AND the same structure
 * (node:util inspect with hidden properties shown and no getter invoked: a Map, a Set, a WeakMap, a symbol-keyed or
 * non-enumerable property, an undefined field, -0, NaN, a bigint and a class name are all encoded), and whether the
 * projection's state digest (everything a reader could see, read on the untapped object) moved. QUIET is the reading every
 * view refresh owes: nothing admitted, nothing invoked, no effect, the same bytes and structure, the same state.
 *
 * TABLES (each quotes the bead's own words; the anchor row holds every quote to one occurrence in its section). SURFACES, "a
 * Pi view refresh or observation re-projection": the real surfaces, each case judged QUIET, with liveness (the renders read
 * the projection and the first render shows the recorded observations): the graph view (buildGraphView and the cached
 * createGraphViewBuilder), the timeline lanes, the model-facing observe reply, the linked topology slice, the attention
 * report, the latency decomposition, the operations telemetry, the inspector layout of each of the four views (its model
 * built as the host builds it per redraw), the real host seam's dialog redraw of each view (showWorkflowDialog over the
 * tapped world, tab to the view, then N redraws: its held per-redraw builders and layoutInspector, WorkflowDialog.render
 * included), and each read member of the projection itself. ADMISSION, "re-rendering recorded observations issues no event
 * admission": a render calling each admission member is read by the tap and by the digest, a write through the tap and a
 * write bypassing it are read. INVOCATION, "and no invocation": an invoke of each effect class, an inspect, an invoke of an
 * unregistered capability, an evidence load and an invoke deferred to the next immediate are read. EFFECT, "shall never be
 * treated as authorization to trigger a decision or effect": each dialog action's host effect and each evidence abort are
 * read. IDENTITY, "and byte-identical projection reads": a frame counter, reordered keys and a random token are read, and
 * so is drift JSON does not encode (HIDDEN-DRIFT). QUIET, "refresh N times yields zero invocations/admissions": a constant
 * render, a window read and a render calling every read member read QUIET, so the judge is not merely red. READERS, "Rerender
 * is not effect authorization" (the type half, syntactic): a Pick or an Omit over the class (in a type or a heritage clause,
 * the class through parentheses, an import type or an intersection) or an indexed access into it, keeping an admission
 * member, is read as a writer; non-literal keys fail closed; a member's Parameters or ReturnType keeps none. ABSENCE, "of
 * APO/native state": the mention judge finds the program's abbreviation and slug in every spelling form and nothing else.
 * REACH, "observation re-projection of APO/native state": planted modules (held in memory, never on disk) prove the reach
 * scan follows every import form, every carrier (a render model, a container, a function, a getter) and every access form,
 * statement and result types included. NAMES, "issues no event admission and no invocation": planted classes and interfaces prove the member readers
 * read every name form and member kind and fail closed on signatures.
 * LIVE ROWS. READER WALK: every src module (git's list, held equal to a filesystem walk) is scanned by the type scan, no
 * typed reader keeps a writer, at a site floor and through a liveness anchor (graph-view's reader). COVERAGE (armed): the
 * src modules that reach the projection, as the checker resolves their names (they name the class, reference a public
 * member of it in a value or a type position, or declare or reference a declaration that carries it: typed as it, as a
 * reader of it, or as a container, a getter, a method or a function that yields it), are exactly the SURFACES modules
 * and the NON_RENDER readers, so the first new module that reaches the projection through a typed name (an APO view
 * included) reds here until a SURFACES row judges it or NON_RENDER names and reasons it. NON-RENDER (armed): each
 * NON_RENDER reader references exactly the members its entry names, and none is in the runtime import closure of the
 * SURFACES modules (the imports that run a module, static or literal dynamic, followed transitively; type-only ones run
 * nothing). RENDER TOUCHES: the SURFACES modules reference read members only, in value and type positions, as the checker
 * resolves them (the static half of the SURFACES rows' runtime reading). MEMBERS: the projection's public instance members,
 * as the checker reads the class, are exactly READ_MEMBERS and ADMISSION_MEMBERS, the ADMISSION row plants every admission
 * member and REPROJECTION reads every read member. EFFECT CLASSES: the plants invoke every effect class the registry's
 * CapabilityDescriptor declares (its union read literally; any other shape reads none and reds). DIALOG ACTIONS: the plants
 * perform every WorkflowDialogActions member, as the checker reads the interface. ABSENCE WALK: no src module (path and
 * text) spells the program, at a file floor.
 * OUTSIDE ANCHORS (each a source of truth outside this file and its roster): src (COVERAGE, NON-RENDER, RENDER TOUCHES,
 * MEMBERS, EFFECT CLASSES, DIALOG ACTIONS) and the bead's export row (every table quote, the filing's bytes, the two tilings,
 * the program's two spellings in the title), so a SURFACES row, a NON_RENDER entry, an admission plant, an effect-class
 * plant or a dialog-action plant removed from the helper, the frozen literal and the roster together still reds.
 * RESIDUALS (named, each with its pinned quiet row): R-DEFERRED-EFFECT an invocation a render schedules past the settle
 * window (INVOCATION); R-SIDE-CHANNEL an effect through a channel the world does not hold - a module global, a file,
 * the network, or the body of a real host callback the census world replaces with a recorder or a stub (the DIALOG
 * row's deps; the host's own wiring in src/index.ts is not rendered) (EFFECT); R-LATE-DRIFT drift that first appears
 * after N renders (IDENTITY); R-OPAQUE-STATE drift held where neither encoding reads - behind a getter neither invokes
 * (a prototype accessor, a non-enumerable own accessor), in a closure's captured state (IDENTITY); R-FULL-TYPE a
 * parameter typed as the whole projection, or a typeof query over a value that holds it, is not a typed reader to the
 * type scan - COVERAGE and RENDER TOUCHES read such modules instead (READERS); R-ALIASED-CLASS a Pick over an alias of
 * the class or its instance type, or through an alias of the utility, is not read by the type scan (READERS);
 * R-PARAPHRASE a paraphrase of the program or its abbreviation spelled with separators is not a mention (ABSENCE);
 * R-ERASED-ACCESS a module that reaches the projection only through an erased or structural type - a cast from unknown,
 * a structural interface of its own, Reflect, an any - reads as reaching nothing to the reach scan (REACH): COVERAGE
 * does not list it, and only a SURFACES row's runtime reading would judge it; R-RUNTIME-MEMBER a member patched onto
 * the class's prototype at run time is not read by the member readers, which read the declared class and interface
 * (NAMES).
 * NOT CLAIMED (edits of this file, its helper and the roster together): a plant row of IDENTITY, QUIET,
 * WRITE-ANY-ROUTE, OTHER-ROUTES, EVIDENCE-ABORTS, a READERS, REACH or NAMES row or a residual row removed with its
 * frozen-literal element and roster entry (no outside anchor names those plants); a case and its expected reading
 * re-authored together; an assertion narrowed in this file (the SURFACES rows' QUIET comparison cut to fewer fields
 * stays green, since every real surface reads QUIET on every field, and the anchor's section reading widened back to
 * the whole row stays green on the clean export: the src and export plants recorded with the cut are those readings'
 * falsifiers); a NON_RENDER reason's prose (its member references and the closure are measured, its words are not); the
 * legacy (non-inspector) dialog frame, whose spinner and elapsed time read a clock by design and which reads no
 * observation beyond the window total.
 * FROZEN SHAPE (standing rule 16): the rule-16 row pins `${table}/${id}:${pins.length}` for every judged row, the NON_RENDER
 * entries, the residual families and the member sets as literals; test/fixtures/apo-rerender-roster.json holds every judged
 * row (table, id, label, SHA-256 of each case, test), the NON_RENDER entries, every registered test title and the residual
 * families, judged by this file's last row in order and both ways.
 *
 * Display paths added: none (test-only; src is read and run, never edited). Scratch: none - every world and every planted
 * module is in memory.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
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
  classMembers,
  type DialogAction,
  EFFECT,
  EFFECT_CLASSES,
  type EffectClass,
  IDENTITY,
  INVOCATION,
  interfaceMembers,
  judgeRerender,
  mentions,
  moduleClosure,
  NAMES,
  NON_RENDER,
  PLANT_TABLES,
  plantSubject,
  projectionReach,
  propertyLiterals,
  QUIET,
  QUIETS,
  REACH,
  READ_MEMBERS,
  READERS,
  RENDERS,
  RESIDUAL_FAMILIES,
  type Reach,
  ROWS,
  SURFACES,
  scanReaders,
  sourceProgram,
  surfaceSubject,
  TABLE_QUOTES,
} from "./helpers/apo-rerender-census.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const ROSTER = "test/fixtures/apo-rerender-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-021.5";
const CLASS_MODULE = "src/workbench/observation.ts";
const CLASS_NAME = "ObservationProjection";
/** The budget the walking, checker and dialog rows register: each reads every src module, builds a checker program or opens a real dialog per case. */
const WALK_BUDGET_MS = 120_000;
/** The src floor: 116 modules at the base; a walk narrowed below 100 reds. */
const SRC_FLOOR = 100;
/** The typed-reader floor: 12 sites at the base (11 before the wb-86q landing); a scan that loses three reds. */
const READER_FLOOR = 10;
/** The liveness anchor of the reader walk: graph-view's reader, as the scan writes it. */
const READER_ANCHOR = "src/workbench/graph-view.ts: relationRevision,relationsPage,window";
/** Shows the recorded observations: a fixture title, a native ref path, a native id as JSON, or the six recorded nodes examined. */
const SHOWS_FIXTURE = /Furnace attempt F|furnace\/operation\/F|"F"|"examined":\{"nodes":6,/;
/** The owner filing's two paragraphs open with these, and its bytes digest to FILING_SHA256 (as filed at b21beb0). */
const FILING_HEADER = "Owner filing (2026-10-19, program-triage-2026-10-18; ";
const FILING_CITATION = "03-operational-semantics.md:7@4b8b974ca72b ";
const FILING_SHA256 = "cf70b312fb62e564f1deb2b2bdcf983af326e7a2eef87961372b066bc3d35008";
const READER_WALK =
  "live: no typed reader (a Pick, an Omit or an indexed access over the class) in any src module keeps an admission member; the walk is every src module and reaches graph-view's reader";
const COVERAGE =
  "live (armed): every src module that reaches the projection - it names the class, references a member or holds a declaration that carries it, as the checker resolves names - is a SURFACES module or a named non-render reader";
const NON_RENDER_ROW = "live (armed): each named non-render reader references exactly the members its entry names, and none is in the runtime import closure of the SURFACES modules";
const RENDER_TOUCHES = "live: the SURFACES modules reference read members of the projection only, in value and type positions, as the checker resolves them";
const MEMBERS =
  "live: the projection's public instance members, as the checker reads the class (every member kind and name form), are exactly the read and admission members, each planted or re-projected";
const CLASSES = "live: the invocation plants invoke every effect class the registry's descriptor declares";
const ACTIONS = "live: the effect plants perform every WorkflowDialogActions member, as the checker reads the interface (every name form, inherited and merged members; signatures fail closed)";
const ABSENCE_WALK = "live: no src module spells the program, by path or text; the walk is every src module";
const ANCHOR =
  "anchor: every table quote stands once in its section of the bead's export row (the title, or the owner filing, pinned byte for byte) and the quotes tile its statement and acceptance (.beads/issues.jsonl, wb-021.5)";
const SLOW = new Set(["SURFACES INSPECTOR", "SURFACES DIALOG", "SURFACES REPROJECTION", READER_WALK, COVERAGE, NON_RENDER_ROW, RENDER_TOUCHES, MEMBERS, ACTIONS, ABSENCE_WALK]);
const READ_SET: ReadonlySet<string> = new Set(READ_MEMBERS);

interface Roster {
  readonly rows: unknown;
  readonly nonRender: unknown;
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

/** The checker program over every src module, built once per file run for the checker rows. */
let liveProgram: ReturnType<typeof sourceProgram> | undefined;
const live = (): ReturnType<typeof sourceProgram> => {
  liveProgram ??= sourceProgram(ROOT, srcModules());
  return liveProgram;
};
let liveReachMemo: Map<string, Reach> | undefined;
const liveReach = (): Map<string, Reach> => {
  liveReachMemo ??= projectionReach(live(), ROOT, CLASS_MODULE, CLASS_NAME, srcModules());
  return liveReachMemo;
};
/** Every REACH and NAMES plant, by repo-relative path: one program holds them all, in memory. */
function plantModules(): Record<string, string> {
  const plants: Record<string, string> = {};
  for (const item of [...REACH.rows.flatMap(row => row.cases), ...NAMES.rows.flatMap(row => row.cases)]) {
    for (const [rel, text] of Object.entries(item.plants)) {
      if (rel in plants) throw new Error(`two plants claim ${rel}`);
      plants[rel] = text;
    }
  }
  return plants;
}
let plantProgram: ReturnType<typeof sourceProgram> | undefined;
const planted = (): ReturnType<typeof sourceProgram> => {
  plantProgram ??= sourceProgram(ROOT, [], plantModules());
  return plantProgram;
};

/** This bead's row in the tracked export: the owner filing's title and notes, an anchor outside this file and its roster. */
function exportRow(): ExportRow {
  const rows: ExportRow[] = [];
  for (const line of read(BEAD_EXPORT).split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (row === null || typeof row !== "object" || !("id" in row) || row.id !== BEAD) continue;
    if (!("title" in row) || typeof row.title !== "string" || !("notes" in row) || typeof row.notes !== "string") throw new Error(`the ${BEAD} export row has no title or notes`);
    rows.push({ title: row.title, notes: row.notes });
  }
  const [only] = rows;
  if (rows.length !== 1 || !only) throw new Error(`the tracked bead export holds ${rows.length} ${BEAD} rows; the anchor reads exactly one`);
  return only;
}
/** The owner filing: the export notes' first two paragraphs (the filing's header and its acceptance); later notes are never read for a quote. */
function filingOf(notes: string): string {
  const [header = "", acceptance = ""] = notes.split("\n\n");
  return `${header}\n\n${acceptance}`;
}
const occurrences = (text: string, quote: string): number => text.split(quote).length - 1;

const plantMembers = (): AdmissionMember[] =>
  (ADMISSION.rows.find(row => row.id === "EVERY-ADMISSION-MEMBER")?.cases ?? []).flatMap(item => (item.subject.plant === "admit" ? [item.subject.member] : []));
const plantClasses = (): EffectClass[] =>
  (INVOCATION.rows.find(row => row.id === "EVERY-EFFECT-CLASS")?.cases ?? []).flatMap(item => (item.subject.plant === "invoke" ? [item.subject.effectClass] : []));
const plantActions = (): DialogAction[] =>
  (EFFECT.rows.find(row => row.id === "EVERY-DIALOG-ACTION")?.cases ?? []).flatMap(item => (item.subject.plant === "action" ? [item.subject.action] : []));
const surfaceModules = (): string[] => SURFACES.rows.flatMap(row => row.modules);

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
  for (const entry of REACH.rows) {
    it(`REACH ${entry.id}`, { timeout: WALK_BUDGET_MS }, () => {
      for (const item of entry.cases) expect(projectionReach(planted(), ROOT, CLASS_MODULE, CLASS_NAME, [item.module]).get(item.module) ?? null, item.module).toEqual(item.expect);
    });
  }
  for (const entry of NAMES.rows) {
    it(`NAMES ${entry.id}`, { timeout: WALK_BUDGET_MS }, () => {
      for (const item of entry.cases) {
        const names = item.kind === "class" ? classMembers(planted(), ROOT, item.module, CLASS_NAME) : interfaceMembers(planted(), ROOT, item.module, "WorkflowDialogActions");
        expect(names, item.module).toEqual(item.expect);
      }
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
    const reach = liveReach();
    const judged = surfaceModules().filter(module => module !== CLASS_MODULE);
    expect([...reach.keys()].sort(), "the src modules that reach the projection equal the SURFACES modules and the named non-render readers").toEqual([...judged, ...Object.keys(NON_RENDER)].sort());
    expect(surfaceModules().filter(module => !existsSync(join(ROOT, module))), "every SURFACES module exists").toEqual([]);
    // Liveness: the dialog reaches the projection through the inspector model's holder only (it never names the class), and graph-view through its typed reader.
    expect(reach.get("src/ui/workflow-dialog.ts"), "the dialog's reach").toEqual({ names: false, value: ["window"], type: [], holders: ["projection"] });
    expect(reach.get("src/workbench/graph-view.ts")?.value, "graph-view's member references").toEqual(["relationRevision", "relationsPage", "window"]);
  });

  it(NON_RENDER_ROW, { timeout: WALK_BUDGET_MS }, () => {
    const reach = liveReach();
    const measured = (module: string): string => {
      const found = reach.get(module);
      return found ? `${module}: ${found.value.join(",")} | ${found.type.join(",")}` : `${module}: <reaches nothing>`;
    };
    expect(Object.keys(NON_RENDER).map(measured), "each non-render reader's member references (value | type), as measured").toEqual(
      Object.entries(NON_RENDER).map(([module, entry]) => `${module}: ${entry.value.join(",")} | ${entry.type.join(",")}`),
    );
    const roots = [...new Set(surfaceModules())];
    const runtime = moduleClosure(live(), ROOT, roots, false);
    expect(Object.keys(NON_RENDER).filter(module => runtime.includes(module)), "non-render readers a SURFACES module runs").toEqual([]);
    // Liveness: the runtime closure follows imports past its roots, and the type-only skip is live (followed with types, control.ts enters through task.ts's import type).
    expect(runtime, "the runtime closure reaches what the roots run").toContain("src/workbench/redaction.ts");
    expect(moduleClosure(live(), ROOT, roots, true), "the closure with type-only edges").toContain("src/workbench/control.ts");
  });

  it(RENDER_TOUCHES, { timeout: WALK_BUDGET_MS }, () => {
    const reach = liveReach();
    const judged = surfaceModules().filter(module => module !== CLASS_MODULE);
    const references = judged.flatMap(module => {
      const found = reach.get(module);
      return [...(found?.value ?? []), ...(found?.type ?? [])].filter(member => !READ_SET.has(member)).map(member => `${module}: ${member}`);
    });
    expect(references, "admission members a render module references").toEqual([]);
    // Non-vacuity: every render module references some read member in a value position.
    expect(judged.filter(module => (reach.get(module)?.value.length ?? 0) === 0), "render modules referencing no member").toEqual([]);
  });

  it(MEMBERS, { timeout: WALK_BUDGET_MS }, () => {
    expect(classMembers(live(), ROOT, CLASS_MODULE, CLASS_NAME), "ObservationProjection's public instance members are the read and admission members, exactly").toEqual(
      [...READ_MEMBERS, ...ADMISSION_MEMBERS].sort(),
    );
    expect(plantMembers(), "the admission row plants every admission member, in order").toEqual([...ADMISSION_MEMBERS]);
    const reprojection = SURFACES.rows.find(row => row.id === "REPROJECTION")?.cases ?? [];
    expect(reprojection.flatMap(item => (item.surface === "projection.read" ? [item.member] : [])), "the re-projection row reads every read member, in order").toEqual([...READ_MEMBERS]);
  });

  it(CLASSES, () => {
    const declared = propertyLiterals("src/workbench/capability-registry.ts", read("src/workbench/capability-registry.ts"), "CapabilityDescriptor", "effectClass");
    expect(declared, "the registry's declared effect classes").toEqual([...EFFECT_CLASSES]);
    expect(plantClasses(), "the invocation row invokes every declared class, in order").toEqual(declared);
  });

  it(ACTIONS, { timeout: WALK_BUDGET_MS }, () => {
    expect(interfaceMembers(live(), ROOT, "src/ui/workflow-dialog.ts", "WorkflowDialogActions"), "the dialog's declared actions").toEqual(Object.keys(ACTION_EFFECTS).sort());
    expect(plantActions(), "the effect row performs every declared action, in the census's order").toEqual(Object.keys(ACTION_EFFECTS));
  });

  it(ABSENCE_WALK, { timeout: WALK_BUDGET_MS }, () => {
    const files = srcModules();
    expect(files.flatMap(rel => mentions(`${rel}\n${read(rel)}`).map(found => `${rel}: ${found}`)), "src modules that spell the program").toEqual([]);
    // Non-vacuity: the same judge, after the real modules, finds the program in a planted module path and text.
    expect(mentions("src/ui/apo-view.ts\nexport const view = 'adaptive policy organizations';")).toEqual(["apo", "adaptive policy organizations"]);
  });

  it(ANCHOR, () => {
    const row = exportRow();
    const filing = filingOf(row.notes);
    expect(filing.startsWith(FILING_HEADER), "the owner filing's header paragraph opens the notes").toBe(true);
    expect(filing.split("\n\n")[1]?.startsWith(FILING_CITATION), "its second paragraph is the acceptance, opened by the authority citation").toBe(true);
    expect(createHash("sha256").update(filing).digest("hex"), "the owner filing, byte for byte as filed").toBe(FILING_SHA256);
    const sections = { title: row.title, filing };
    for (const { table, source, quote } of TABLE_QUOTES) expect(occurrences(sections[source], quote), `${table}: "${quote}" stands once in the ${source}`).toBe(1);
    expect(occurrences(row.title, `${SURFACES.quote} ${ABSENCE.quote} ${EFFECT.quote}`), "the statement: surfaces, state, authorization").toBe(1);
    expect(occurrences(row.title, `${ADMISSION.quote} ${INVOCATION.quote};`), "the statement: admission, invocation").toBe(1);
    expect(occurrences(filing, `(${QUIETS.quote} ${IDENTITY.quote})`), "the acceptance: zero invocations and admissions, byte-identical reads, once in the owner filing").toBe(1);
    expect(row.title.startsWith("[MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7] (merge into R6) "), "the requirement id and the merge target").toBe(true);
    expect(mentions(row.title), "the title spells the program both ways the mention judge reads").toEqual(["adaptive policy organizations", "apo"]);
    expect(RENDERS >= 2, "N renders compare at least two").toBe(true);
    // Non-vacuity: a weakened filing whose acceptance a later note re-quotes reads as weakened - the re-quote is outside the filing.
    const weakened = `${FILING_HEADER}plant).\n\n${FILING_CITATION}(refresh N times yields zero admissions)\n\nLATER NOTE (${QUIETS.quote} ${IDENTITY.quote})`;
    expect(occurrences(filingOf(weakened), `(${QUIETS.quote} ${IDENTITY.quote})`), "a later note's re-quote").toBe(0);
  });

  it("rule 16: every judged row, the non-render readers, the residual families and the member sets are frozen at their measured shape", () => {
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
      "IDENTITY/HIDDEN-DRIFT:10",
      "IDENTITY/R-LATE-DRIFT:1",
      "IDENTITY/R-OPAQUE-STATE:3",
      "QUIET/READ-ONLY-RENDERS:3",
      "READERS/READ-ONLY-PICKS:3",
      "READERS/WRITER-PICKS:4",
      "READERS/OMIT-AND-UNRESOLVED:3",
      "READERS/INDEXED-ACCESS:5",
      "READERS/HERITAGE-AND-WRAPPED:5",
      "READERS/R-FULL-TYPE:2",
      "READERS/R-ALIASED-CLASS:3",
      "ABSENCE/MENTION-FOUND:6",
      "ABSENCE/NOT-MENTIONS:3",
      "ABSENCE/R-PARAPHRASE:2",
      "REACH/IMPORT-FORMS:4",
      "REACH/RENDER-MODELS:8",
      "REACH/ACCESS-FORMS:6",
      "REACH/R-ERASED-ACCESS:4",
      "NAMES/CLASS-NAME-FORMS:6",
      "NAMES/CLASS-MEMBER-KINDS:9",
      "NAMES/INTERFACE-FORMS:10",
      "NAMES/R-RUNTIME-MEMBER:1",
    ]);
    expect(Object.entries(NON_RENDER).map(([module, entry]) => `${module}:${entry.value.length}+${entry.type.length}`)).toEqual([
      "src/index.ts:4+0",
      "src/workbench/beads-observer.ts:0+1",
      "src/workbench/claude-control-observer.ts:2+0",
      "src/workbench/claude-topology.ts:0+1",
      "src/workbench/control-tool.ts:2+0",
      "src/workbench/control.ts:2+0",
      "src/workbench/detached-control.ts:0+0",
      "src/workbench/detached-observer.ts:3+2",
      "src/workbench/evidence-wiring.ts:1+0",
      "src/workbench/forge-observer.ts:0+1",
      "src/workbench/forge-operation-observer.ts:3+0",
      "src/workbench/furnace-observer.ts:0+1",
      "src/workbench/hyperunix-observer.ts:0+1",
      "src/workbench/reactivefiber-observer.ts:0+1",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-DEFERRED-EFFECT:INVOCATION R-DEFERRED-EFFECT",
      "R-SIDE-CHANNEL:EFFECT R-SIDE-CHANNEL",
      "R-LATE-DRIFT:IDENTITY R-LATE-DRIFT",
      "R-OPAQUE-STATE:IDENTITY R-OPAQUE-STATE",
      "R-FULL-TYPE:READERS R-FULL-TYPE",
      "R-ALIASED-CLASS:READERS R-ALIASED-CLASS",
      "R-PARAPHRASE:ABSENCE R-PARAPHRASE",
      "R-ERASED-ACCESS:REACH R-ERASED-ACCESS",
      "R-RUNTIME-MEMBER:NAMES R-RUNTIME-MEMBER",
    ]);
    expect([READ_MEMBERS.join(","), ADMISSION_MEMBERS.join(","), EFFECT_CLASSES.join(","), Object.keys(ACTION_EFFECTS).join(","), String(RENDERS)]).toEqual([
      "aggregate,aggregateStats,events,identityRefusals,indexOf,query,relationRevision,relations,relationsPage,stats,truncation,window",
      "disconnect,ingest,markStale,reconnect,refresh,relate",
      "read,write,external,unknown",
      "onKill,onPause,onResume,onSkipAgent,onRetryAgent,onOpenAgent",
      "4",
    ]);
  });

  it("roster: the judged rows, the non-render readers, the registered tests and the residual families equal test/fixtures/apo-rerender-roster.json, in order and both ways", ({ task }) => {
    const roster = JSON.parse(read(ROSTER)) as Roster;
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(NON_RENDER, "the named non-render readers equal the roster's").toEqual(roster.nonRender);
    expect(Object.keys(NON_RENDER), "the non-render readers, in module order").toEqual(Object.keys(NON_RENDER).sort());
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
    expect(walked.filter(entry => entry.timeout === WALK_BUDGET_MS).map(entry => entry.name), "the walking, checker and dialog rows, and only they, register the walk budget").toEqual(
      titles.filter(name => SLOW.has(name) || name.startsWith("SURFACES ") || name.startsWith("REACH ") || name.startsWith("NAMES ")),
    );
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const status = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(status), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
