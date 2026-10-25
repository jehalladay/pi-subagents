/**
 * wb-hs2j.1 (RF-REACTIVE-CONTEXT-ASSEMBLY-R1). Statement (bead title): "No Pi surface shall treat an rf render's exit 0 as document
 * completeness; Pi shall diagnose inclusion/suppression (context explain counts today; render result.summary.counts_by_stage when
 * RFCLI rfc-s24ro.2 ships - open at the pin, unshipped) before claiming a complete document - pin
 * docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:36@6a251bf73af5". Acceptance (bead
 * notes, read from the committed store export .beads/issues.jsonl, row ACCEPTANCE below): "(a) a Pi consumer of a render whose
 * explain counts show suppressed blocks (host_necessity > 0) projects coverage partial / non-success until the inclusion counts
 * are read, never complete on exit 0 alone; (b) a fixture render with exit 0 and zero included blocks is never surfaced as a
 * complete document; (c) when summary.counts_by_stage ships, the Pi adapter carries it verbatim and asserts it reconciles with
 * context explain for the same render id."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): 02-swarm-usage-and-command-
 * grammar.md:36 "A render executed seven components, but six candidate blocks were excluded under default task-conditional
 * necessity; only `context explain` reported `host_necessity:6`." and "A dashboard tick thus requires render + inclusion
 * diagnosis rather than treating exit 0 as document completeness."; BEADS-2026-10-21.md:14 rfc-s24ro.2 "context render
 * summary.counts_by_stage reports inclusion/suppression equal to context explain", open; context.explain.schema.json closes
 * summary.counts_by_stage to included, host_visibility, host_necessity and sdk_assembly; context.render.schema.json states
 * result.blocks, the final document's blocks (:628-640), and result.necessity, one decision record per judged candidate with a
 * boolean include (:907-936); integrations/components.py:3015-3060 (_judged_outcome) and domain/rendering.py:806-822
 * (exclusion_stage_for): a judged candidate decided include false is the one explain counts at host_necessity, a candidate
 * dropped before judgement is host_visibility and a judged one the budget cut is sdk_assembly. The installed rf 0.1.832 help:
 * `rf context explain RENDER` "Explain a recorded render." - a --no-commit preview records none (render_id null), so Pi's one
 * rf arm can never be explained. Pi at base 3c3be9d: the reader adapter projected every clean exit-0 preview as coverage
 * complete, tone success, whatever its blocks and necessity stated (the shared full-shape fixture, blocks [] and necessity [],
 * read complete), and no src module read either list or spelled counts_by_stage.
 *
 * THE CUT (src/workbench/reactivefiber-observer.ts): inclusionLeg, beside the observation and view_contract legs, reads the two
 * inclusion records the preview itself carries and can only demote: a render that does not state both lists has not been
 * diagnosed, zero included blocks is never a complete document and one withheld candidate holds the preview at partial; only counts
 * (blocks included, candidates withheld and judged) reach its one note. The shared full-shape fixture and the observer suite's base result now carry the one block and
 * judged decision a real render of their context text carries, so their landed clean pins keep their meaning unchanged.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the program's own shape (seven judged, six withheld at host_necessity, one block included, exit 0, no
 *    diagnostics) reads partial and unknown with the counted note; A2 one withheld candidate among included blocks is enough;
 *    A3 exit 0 alone: a clean render stating neither list, or only one of them, reads partial with the not-diagnosed note; A4
 *    the projection surface: the withheld snapshot is a partial node under ObservationProjection, the clean full-shape one
 *    complete.
 *  B, acceptance (b). B1 zero blocks and zero judged candidates; B2 zero blocks although every judged candidate was included (the
 *    budget cut them all); B3 zero blocks beside every other clean witness (a satisfied --view contract and fresh observation
 *    rows) still reads partial and states neither witness; B4 the shared full-shape fixture: complete with its block, partial
 *    with its blocks emptied.
 *  C, acceptance (c), gated on rfc-s24ro.2. C1 the armed half: the captured result roster (test/fixtures/rf-result-keys.json)
 *    has no summary key and no src module's code (comments removed) names counts_by_stage, so no producer counts exist to carry
 *    or reconcile yet; it reds
 *    when either appears, and the carry-verbatim/reconcile half is due then (the roster's exhaustive diff reds the rf-preview
 *    tier on the new key the same day). C2 a stated result.summary never upgrades: a zero-block or a withheld render that
 *    states rf-shaped counts claiming a full document still reads partial, so Pi never adopts the unshipped shape.
 *  D, the leg's discipline. D1 only counts surface: candidate keys, component ids, reasons, judge ids and token costs carrying a
 *    marker never reach a topology string; D2 a stated list of another shape is refused, never dropped; D3 the inclusion note
 *    survives the diagnostics bound when every other leg notes too.
 *  Q, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the whole judged set (every row's id, clause,
 * label and pins, every pin's witness) is held to the out-of-file roster test/fixtures/rf-inclusion-diagnosis-roster.json; the
 * acceptance clause letters of rows A-C are held to the bead's export row, and the inclusion keys to the captured result roster.
 * RESIDUALS (named, each with a pinned quiet row): R-STAGES the leg counts lengths only, so the host_visibility stage (a candidate
 * dropped before judgement, stated by neither list) and the sdk_assembly stage (a judged candidate the budget cut, told apart only
 * by a candidate_key join whose occurrence keys, rfc-s24ro.17, the reader does not pin) are uncounted: a render whose budget cut a
 * judged candidate reads complete when one block is included and none is withheld (Q1); R-BYPASS an included block rf did not
 * judge (the ASM-PROV-A48 necessity bypass) has no decision row and counts as included (Q2). Both wait on summary.counts_by_stage
 * (rfc-s24ro.2).
 *
 * FOLLOW-UP wb-v2um (R694, the landing-287 gate cmd_2113ea645399 PASS-WITH-FINDING; F1 leads, F2 and F3 ride):
 *  F1 D2 refuses the heterogeneous shapes beside the homogeneous six: a stated null list (GM15 read it as absent), a mixed blocks
 *    list with its bad row last or inside (GM16b admitted it), a mixed necessity list the same two ways (GM17b), an array-valued
 *    block row (GM21) and its necessity twin, and a null row of either list. GATE_SHAPES maps each gate mutant the follow-up's
 *    finding names to the D2 shape that refuses what it admits (GM15 one null list per inclusion key); the bad-row-inside,
 *    null-row and array-decision shapes are hardening beyond the four and are held by this file and its roster only.
 *  F2 the anchors outside the cut (ANCHOR_TITLE): the wb-hs2j.1 row of the store export carries the landed delivery record, and
 *    its lines name every pin by its row - the ACCEPTANCE line each clause row's pins (B1-B4 a range), the RESIDUALS line each
 *    named residual with its quiet pin, the SRC MUTANTS line every pin that kills a landed src mutant - and the three together
 *    name the judged set exactly; the wb-v2um row's F1 line names the gate mutants GATE_SHAPES keeps. So a coordinated hollow of
 *    this file and its roster (the gate's CT6e A3, CT6r row Q, CT6d row D) reds against text no census cut edits.
 *  F3 the reached record (RECORD_TITLE, registered last): each pin's case counts its reads through the seams it judges (one per
 *    reader-adapter reading, per read of the captured result roster and per src walk) once its witness compare held, and the
 *    record holds the counts to the roster's reached list and refuses a pin that read nothing (the gate's GH1, a case returning
 *    its roster witness constant); no case may look up its own expected witness, and every value its seam helpers produced (each
 *    reached, projected or refused reading and each computed part) must be carried by its witness, so a case cannot read and
 *    then return text of its own. The judged set, the anchors and the record walk the vitest task tree: the judged set runs
 *    first and sees every registered test collected in run mode, the record's own included (the wb-aff9 class), the anchors
 *    check the same, and the record sees every other test ran.
 *  F6 (optional rider) not taken: docs/workbench/09:43 stays as landed.
 *
 * Display paths added: one, the inclusion leg's note, routed through the reader adapter's shown() helper, which is
 * sanitizeWorkbenchText(text, 200, 'label') with the NAMED label layout (the landed path of every other leg's note); it carries
 * only counts and fixed words. Test-only otherwise: no scratch, no spawn; src, the fixtures and the store export are only read.
 */
import { type Dirent, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import ts from 'typescript';
import { describe, expect, it, type TestContext } from 'vitest';
import { CapabilityError, type JsonValue } from '../src/workbench/capability-registry.js';
import { ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from '../src/workbench/providers/reactivefiber.js';
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from '../src/workbench/reactivefiber-observer.js';
import { fullShapeRf, type Json, readRfResultRoster, rfFixtureBlock, rfFixtureDecision } from './helpers/rf-render-fixture.js';

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const ROSTER_PATH = join(HERE, 'fixtures', 'rf-inclusion-diagnosis-roster.json');
const EXPORT_PATH = join(REPO, '.beads', 'issues.jsonl');
const BEAD = 'wb-hs2j.1';
/** The workspace identity the readings and the host scope name: a string the observer compares, never a directory this file opens. */
const WS = '/workspace/rf-inclusion-diagnosis-census';
const scope: ObservationScope = { workspace: WS, principal: 'local-operator:census' };
const HOST: ReactiveFiberTopologyContext = { scope, seam: 'rf-cli', capturedAt: '2026-10-23T00:00:00Z', observedAt: '2026-10-23T00:00:01Z' };
/** The two inclusion records the reader adapter reads, each a result key of every --no-commit render the pinned rf emits. */
const INCLUSION_KEYS = ['blocks', 'necessity'];
/** Obviously fake text placed in every block and decision field the leg must never surface (D1). */
const MARKER = 'CENSUS-PRIVATE-MARKER';
/** wb-v2um (R694 follow-up of landing 287): the bead whose export row names the gate mutants D2 refuses (F1). */
const FOLLOW_UP = 'wb-v2um';
/** The landed delivery record's lines in the wb-hs2j.1 export row and the follow-up's lead finding line, each found by its prefix. */
const DELIVERED_ACCEPTANCE = 'ACCEPTANCE: (a) ';
const DELIVERED_RESIDUALS = 'RESIDUALS (named, pinned quiet rows): ';
const DELIVERED_MUTANTS = 'SRC MUTANTS ';
const FOLLOW_UP_FINDING = '- F1 ';
/** wb-v2um F1: each gate mutant the follow-up names (gate cmd_2113ea645399 LEG 2) with the D2 shape that refuses what it admits;
 * GM15 read a stated null list as absent, so it needs one null list per inclusion key. */
const GATE_SHAPES: Readonly<Record<string, readonly string[]>> = {
  GM15: INCLUSION_KEYS.map(key => `${key}Null`),
  GM16b: ['blocksMixedRows'],
  GM17b: ['necessityMixedRows'],
  GM21: ['blocksArrayRow'],
};
const JUDGED_TITLE = 'the judged set: the frozen shape, the out-of-file roster, the export acceptance and the captured result roster agree';
const ANCHOR_TITLE = 'the anchors outside the cut: the landed delivery record names every pin by its row, and every gate mutant the follow-up names has D2 shapes that refuse it';
const RECORD_TITLE = 'the record: every registered test is in run mode and ran, and every pin reached its seams with its pinned read count';

interface Row {
  readonly id: string;
  readonly clause: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and the bead's export row. */
const ROWS: readonly Row[] = [
  {
    id: 'A',
    clause: 'a',
    label: '(a) a render whose necessity decisions withhold a candidate (explain host_necessity > 0) projects coverage partial and a non-success tone, and exit 0 alone is never complete',
    pins: ['A1', 'A2', 'A3', 'A4'],
  },
  {
    id: 'B',
    clause: 'b',
    label: '(b) a render with exit 0 and zero included blocks is never surfaced as a complete document',
    pins: ['B1', 'B2', 'B3', 'B4'],
  },
  {
    id: 'C',
    clause: 'c',
    label: '(c) gated on rfc-s24ro.2: no summary.counts_by_stage exists to carry or reconcile yet, and a stated summary never upgrades a render',
    pins: ['C1', 'C2'],
  },
  {
    id: 'D',
    clause: 'discipline',
    label: 'the inclusion leg surfaces only counts, refuses a stated list of another shape and keeps its note inside the diagnostics bound',
    pins: ['D1', 'D2', 'D3'],
  },
  {
    id: 'Q',
    clause: 'residual',
    label: 'the named residuals R-STAGES and R-BYPASS stay pinned quiet',
    pins: ['Q1', 'Q2'],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly clause: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly RosterRow[];
  /** Each pin's read count once its witness compare held, in row order: `${pin}:${reads}` (wb-v2um F3). */
  readonly reached: readonly string[];
  /** Every test this file registers, in order (wb-v2um F3). */
  readonly tests: readonly string[];
}
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
function stringList(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === 'string' && item.length > 0)) throw new Error(`the roster ${field} must be a list of non-empty strings`);
  return value.map(item => String(item));
}
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, 'utf8'));
  if (!isObject(raw) || typeof raw.bead !== 'string' || !Array.isArray(raw.rows)) throw new Error('the roster needs a bead and rows');
  const rows = raw.rows.map((row: unknown): RosterRow => {
    if (!isObject(row) || typeof row.id !== 'string' || typeof row.clause !== 'string' || typeof row.label !== 'string' || !Array.isArray(row.pins)) {
      throw new Error('every roster row needs an id, a clause, a label and pins');
    }
    const pins = row.pins.map((pin: unknown): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== 'string' || !Object.hasOwn(pin, 'witness')) throw new Error('every roster pin needs an id and a witness');
      return { id: pin.id, witness: pin.witness as Json };
    });
    return { id: row.id, clause: row.clause, label: row.label, pins };
  });
  return { bead: raw.bead, rows, reached: stringList(raw.reached, 'reached'), tests: stringList(raw.tests, 'tests') };
}
const ROSTER = readRoster();
/** Every roster witness lookup; a pin's case never looks up its own expected witness (wb-v2um F3). */
let lookups = 0;
function rosterWitness(pin: string): Json {
  lookups += 1;
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster has no witness for ${pin}`);
  return found.witness;
}

/** The notes of each named bead's row in the committed store export, read in one pass: the anchor outside this census and its roster. */
function exportNotes(beads: readonly string[]): ReadonlyMap<string, string> {
  const notes = new Map<string, string>();
  for (const line of readFileSync(EXPORT_PATH, 'utf8').split('\n')) {
    const bead = beads.find(id => line.includes(`"id":"${id}"`) || line.includes(`"id": "${id}"`));
    if (bead === undefined || notes.has(bead)) continue;
    const entry: unknown = JSON.parse(line);
    if (isObject(entry) && entry.id === bead && typeof entry.notes === 'string') notes.set(bead, entry.notes);
  }
  const missing = beads.filter(bead => !notes.has(bead));
  if (missing.length > 0) throw new Error(`the store export has no row with notes for ${missing.join(', ')}`);
  return notes;
}
/** The bead's acceptance line in the committed store export, and the clause letters it states in order. */
function exportAcceptance(): { line: string; letters: string[] } {
  const notes = exportNotes([BEAD]).get(BEAD) ?? '';
  const start = notes.indexOf('Acceptance:');
  if (start < 0) throw new Error(`the ${BEAD} notes state no acceptance`);
  const end = notes.indexOf('\n', start);
  const line = notes.slice(start, end < 0 ? undefined : end);
  return { line, letters: [...line.matchAll(/\(([a-z])\) /g)].map(match => match[1] ?? '') };
}
/** The first notes line that starts with the prefix; the notes are append-only, so the first such line stays the landed one. */
function noteLine(notes: string, prefix: string): string {
  const line = notes.split('\n').find(entry => entry.startsWith(prefix));
  if (line === undefined) throw new Error(`no notes line starts with ${JSON.stringify(prefix)}`);
  return line;
}
/** The pin ids a landed note fragment names, a range such as B1-B4 expanded, each once in order of first mention. */
function pinsNamed(text: string): string[] {
  const named: string[] = [];
  for (const [, letter = '', from = '', to = from] of text.matchAll(/\b([A-Z])([1-9])(?:-\1([1-9]))?\b/g)) {
    for (let index = Number(from); index <= Number(to); index += 1) {
      const pin = `${letter}${index}`;
      if (!named.includes(pin)) named.push(pin);
    }
  }
  return named;
}
/** The delivered acceptance line's pins by clause letter: each (x) segment up to the next one. */
function clausePins(line: string): Record<string, string[]> {
  const marks = [...line.matchAll(/\(([a-z])\) /g)];
  return Object.fromEntries(marks.map((mark, index) => [mark[1] ?? '', pinsNamed(line.slice((mark.index ?? 0) + mark[0].length, marks[index + 1]?.index ?? line.length))]));
}
/** The delivered residuals line's named residuals, each with the quiet pin the line binds to it. */
function residualPins(line: string): (readonly [string, string])[] {
  return [...line.matchAll(/\b(R-[A-Z]+) ([A-Z][1-9])\b/g)].map(match => [match[1] ?? '', match[2] ?? ''] as const);
}
/** The landed mutant record's killing pins: every parenthesized list of pin ids on the line, in order, each once. */
function killerPins(line: string): string[] {
  const lists = [...line.matchAll(/\(([A-Z][1-9](?:-[A-Z][1-9])?(?:,[A-Z][1-9](?:-[A-Z][1-9])?)*)\)/g)].map(match => match[1] ?? '');
  return [...new Set(lists.flatMap(list => pinsNamed(list)))];
}
/** Every registered test not collected in run mode, or inverted (it.fails). */
const notInRunMode = (tests: readonly Registered[]): string[] => tests.filter(entry => entry.mode !== 'run' || entry.fails).map(entry => `${entry.name} | ${entry.mode}${entry.fails ? '+fails' : ''}`);
type Registered = { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean };
/** Every test this file registered (the vitest task tree), in order, with its collected mode and, once it ran, its state. */
function registered(task: TestContext['task']): Registered[] {
  const walked: Registered[] = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === 'test') walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === 'suite') walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  return walked;
}

/** Every read a pin's case makes through the seams it judges (wb-v2um F3): one per reader-adapter reading, one per read of the
 * captured result roster and one per src walk. Each pin's test records how many its case made. */
let reads = 0;
const resultKeys = (): readonly string[] => {
  reads += 1;
  return readRfResultRoster().resultKeys;
};
/** What the seam helpers produced during the current case (wb-v2um F3): every reached(), projected() and refusal() result and each
 * computed part of a witness. A pin's witness must carry every one of them, so a case that reads and then returns text of its own
 * reds, and a case that computes a part and returns another keeps the kill a src mutant of that part needs. */
const produced: Json[] = [];
function produce<T extends Json>(value: T): T {
  produced.push(value);
  return value;
}
/** A produced value is carried when the witness is it, holds it at any depth, or (an object) carries its every entry. */
function carries(witness: Json, value: Json): boolean {
  if (isDeepStrictEqual(witness, value)) return true;
  if (isObject(witness) && isObject(value) && Object.entries(value).every(([key, entry]) => Object.hasOwn(witness, key) && isDeepStrictEqual(witness[key], entry))) return true;
  const children: Json[] = Array.isArray(witness) ? witness : isObject(witness) ? Object.values(witness) : [];
  return children.some(child => carries(child, value));
}
const blockAt = (index: number, key = `fixture.component:main::block${index}`): JsonObject => ({ ...rfFixtureBlock(), final_index: index, candidate_key: key });
const keyAt = (index: number): string => `fixture.component:main::block${index}`;
/** A full-shape preview reading with its result overridden key by key and, optionally, some result keys removed. */
function reading(over: JsonObject = {}, drop: readonly string[] = [], host: ReactiveFiberTopologyContext = HOST): ReactiveFiberProjectionTopology {
  reads += 1;
  const envelope = fullShapeRf(WS);
  const base = envelope.result;
  if (!isObject(base)) throw new Error('the full-shape fixture needs an object result');
  const result: JsonObject = { ...(base as JsonObject), ...over };
  for (const key of drop) delete result[key];
  return reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: WS, source: { ...envelope, result } } as JsonValue, host);
}
/** What a reading reaches on the surfaces the bead names: the snapshot's coverage and tone, and its inclusion note. */
function reached(topology: ReactiveFiberProjectionTopology): Json {
  const [snapshot] = topology.snapshots;
  if (snapshot === undefined) throw new Error('a preview reading projects one snapshot');
  return produce({ coverage: snapshot.coverage ?? null, tone: snapshot.node.statusTone, inclusion: topology.diagnostics.filter(note => note.startsWith('inclusion')) });
}
function refusal(run: () => unknown): string {
  try {
    run();
  } catch (error) {
    if (error instanceof CapabilityError) return produce(`${error.category}: ${error.message}`);
    throw error;
  }
  return produce('admitted');
}
/** The node a snapshot becomes under the observation projection, as a query lists it. */
function projected(topology: ReactiveFiberProjectionTopology): Json {
  const [snapshot] = topology.snapshots;
  if (snapshot === undefined) throw new Error('a preview reading projects one snapshot');
  const projection = new ObservationProjection();
  expect(projection.refresh(snapshot)).toBe('applied');
  const node = projection.query({ scope, limit: 10 }).nodes.find(item => item.nativeRef.id === snapshot.source.id);
  if (node === undefined) throw new Error('the refreshed snapshot must be queryable');
  return produce({ completeness: node.completeness, tone: node.presentation.statusTone });
}
/** The program's six withheld and one included candidate (02-swarm-usage-and-command-grammar.md:36). */
const PROGRAM_NECESSITY: Json[] = [rfFixtureDecision(true, keyAt(0)), ...[1, 2, 3, 4, 5, 6].map(index => rfFixtureDecision(false, keyAt(index)))];
/** rf-shaped counts (context.explain.schema.json summary) claiming every candidate reached the document. */
const FULL_SUMMARY: JsonObject = { counts_by_stage: { included: 1, host_visibility: 0, host_necessity: 0, sdk_assembly: 0 }, block_count: 1, included_blocks: 1 };
/** A satisfied --view contract and one fresh observed row: every other leg's clean witness (B3). */
const VIEW_CLEAN: JsonObject = {
  view_id: 'ctx.dashboard', scope: null, view_contract: { view_id: 'ctx.dashboard', satisfied: true, degraded: false, failures: [] },
  observations: [{ status: 'observed', freshness: 'captured_at_render', replayed: false }],
};

function srcFiles(): string[] {
  reads += 1;
  const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap((entry: Dirent) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : entry.name.endsWith('.ts') ? [path] : [];
  });
  return walk(join(REPO, 'src')).sort();
}
/** A src module's code as the TypeScript printer emits it without comments, so a doc comment naming a field is not a reader of it. */
function codeOf(file: string): string {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  return ts.createPrinter({ removeComments: true }).printFile(source);
}

/** Each pin's reads once its witness compare held, in run order: `${pin}:${reads}` (wb-v2um F3). */
const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => reached(reading({ blocks: [blockAt(0)], necessity: PROGRAM_NECESSITY })),
  A2: () => reached(reading({ blocks: [blockAt(0), blockAt(1), blockAt(2)], necessity: [0, 1, 2].map(index => rfFixtureDecision(true, keyAt(index))).concat([rfFixtureDecision(false, keyAt(3))]) })),
  A3: () => ({
    neither: reached(reading({}, INCLUSION_KEYS)),
    noBlocks: reached(reading({}, ['blocks'])),
    noNecessity: reached(reading({}, ['necessity'])),
  }),
  A4: () => ({
    withheld: projected(reading({ blocks: [blockAt(0)], necessity: PROGRAM_NECESSITY })),
    undiagnosed: projected(reading({}, INCLUSION_KEYS)),
    clean: projected(reading()),
  }),
  B1: () => reached(reading({ blocks: [], necessity: [] })),
  B2: () => reached(reading({ blocks: [], necessity: [rfFixtureDecision(true, keyAt(0)), rfFixtureDecision(true, keyAt(1))] })),
  B3: () => {
    const topology = reading({ ...VIEW_CLEAN, blocks: [] });
    return { ...(reached(topology) as JsonObject), witnesses: produce(topology.diagnostics.filter(note => note.startsWith('view contract') || note.startsWith('observations'))) };
  },
  B4: () => ({ clean: reached(reading()), emptied: reached(reading({ blocks: [] })) }),
  C1: () => ({
    rosterSummary: produce(resultKeys().includes('summary')),
    inclusionKeysInRoster: produce(INCLUSION_KEYS.every(key => resultKeys().includes(key))),
    srcReaders: produce(srcFiles().filter(file => codeOf(file).includes('counts_by_stage')).map(file => relative(REPO, file))),
  }),
  C2: () => ({
    zeroBlocks: reached(reading({ blocks: [], summary: FULL_SUMMARY })),
    withheld: reached(reading({ blocks: [blockAt(0)], necessity: PROGRAM_NECESSITY, summary: FULL_SUMMARY })),
  }),
  D1: () => {
    const leaky: JsonObject = { candidate_key: MARKER, component_id: MARKER, final_index: 0, token_cost: { kind: MARKER, tokens: 7 }, token_cost_kind: MARKER };
    const decision = (include: boolean): JsonObject => ({ ...rfFixtureDecision(include, MARKER), reason: MARKER, judge_id: MARKER, metadata: { note: MARKER } });
    const topology = reading({ blocks: [leaky], necessity: [decision(true), decision(false)] });
    return { surfaced: produce(JSON.stringify(topology).includes(MARKER)), ...(reached(topology) as JsonObject) };
  },
  D2: () => ({
    blocksObject: refusal(() => reading({ blocks: {} })),
    blocksText: refusal(() => reading({ blocks: 'one block' })),
    blocksNonObjectRow: refusal(() => reading({ blocks: [1] })),
    necessityObject: refusal(() => reading({ necessity: {} })),
    necessityTextInclude: refusal(() => reading({ necessity: [{ ...rfFixtureDecision(), include: 'false' }] })),
    necessityRowWithoutInclude: refusal(() => reading({ necessity: [{}] })),
    // wb-v2um F1: the heterogeneous shapes beside the homogeneous six - first the four gate mutants' own (GATE_SHAPES)...
    blocksNull: refusal(() => reading({ blocks: null })),
    necessityNull: refusal(() => reading({ necessity: null })),
    blocksMixedRows: refusal(() => reading({ blocks: [blockAt(0), 1] })),
    necessityMixedRows: refusal(() => reading({ necessity: [rfFixtureDecision(true, keyAt(0)), {}] })),
    blocksArrayRow: refusal(() => reading({ blocks: [[blockAt(0)]] })),
    // ...then a bad row inside a list, which a first- or a last-row-only check admits, a null row of either list and an
    // array-valued decision row (GM21's necessity twin).
    blocksMixedInteriorRow: refusal(() => reading({ blocks: [blockAt(0), 1, blockAt(1)] })),
    necessityMixedInteriorRow: refusal(() => reading({ necessity: [rfFixtureDecision(true, keyAt(0)), {}, rfFixtureDecision(true, keyAt(1))] })),
    blocksNullRow: refusal(() => reading({ blocks: [null] })),
    necessityNullRow: refusal(() => reading({ necessity: [null] })),
    necessityArrayRow: refusal(() => reading({ necessity: [[rfFixtureDecision()]] })),
  }),
  D3: () => {
    // Every other leg notes too: the fixture seam, reported errors, over budget, a failing contract, a demoting row, the release.
    const fixtureHost: ReactiveFiberTopologyContext = { ...HOST, seam: 'injected-fixture' };
    const topology = reading({
      blocks: [], necessity: PROGRAM_NECESSITY, diagnostics_summary: { errors: 1, warnings: 0, has_errors: true, has_warnings: false },
      budget: { formula_terms: { context_window: 100, output_reserve: 10, occupied_tokens: 120, overhead: 0, safety_margin: 0, available_context_tokens: -30 } },
      view_id: 'ctx.dashboard', scope: null, view_contract: { view_id: 'ctx.dashboard', satisfied: false, degraded: true, failures: [{ check: 'fixture' }] },
      observations: [{ status: 'unresolved', freshness: 'captured_at_render', replayed: false }],
    }, [], fixtureHost);
    return { count: produce(topology.diagnostics.length), index: produce(topology.diagnostics.findIndex(note => note.startsWith('inclusion'))), ...(reached(topology) as JsonObject) };
  },
  Q1: () => reached(reading({ blocks: [blockAt(0)], necessity: [rfFixtureDecision(true, keyAt(0)), rfFixtureDecision(true, keyAt(1))] })),
  Q2: () => reached(reading({ blocks: [blockAt(0), blockAt(1)], necessity: [rfFixtureDecision(true, keyAt(0))] })),
};

describe('wb-hs2j.1 rf inclusion diagnosis census (RF-REACTIVE-CONTEXT-ASSEMBLY-R1)', () => {
  it(JUDGED_TITLE, ({ task }) => {
    // wb-v2um F3: this case runs first, so it sees every registered test's collected mode - the record's own included.
    const tests = registered(task);
    expect(tests.map(entry => entry.name), 'every registered test, in order').toEqual([JUDGED_TITLE, ANCHOR_TITLE, ...ROWS.flatMap(row => row.pins), RECORD_TITLE]);
    expect(notInRunMode(tests), 'every registered test is collected in run mode, not inverted').toEqual([]);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(['A:4', 'B:4', 'C:2', 'D:3', 'Q:2']);
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROWS.map(({ id, clause, label, pins }) => ({ id, clause, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, clause, label, pins }) => ({ id, clause, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const { line, letters } = exportAcceptance();
    expect(letters, line).toEqual(['a', 'b', 'c']);
    expect(ROWS.filter(row => /^[a-z]$/.test(row.clause)).map(row => row.clause)).toEqual(letters);
    expect(INCLUSION_KEYS.filter(key => !readRfResultRoster().resultKeys.includes(key))).toEqual([]);
  });

  it(ANCHOR_TITLE, ({ task }) => {
    // The anchors check the collected modes too, so skipping both the judged set and the record still reds here.
    expect(notInRunMode(registered(task)), 'every registered test is collected in run mode, not inverted').toEqual([]);
    const notes = exportNotes([BEAD, FOLLOW_UP]);
    const landed = notes.get(BEAD) ?? '';
    const pins = ROWS.flatMap(row => row.pins);
    // The delivered acceptance line names each clause row's pins.
    const accepted = noteLine(landed, DELIVERED_ACCEPTANCE);
    const byClause = clausePins(accepted);
    expect(ROWS.filter(row => /^[a-z]$/.test(row.clause)).map(row => [row.clause, [...row.pins]]), accepted).toEqual(Object.entries(byClause));
    // The delivered residuals line names each residual with its pinned quiet row, and the residual row names each residual.
    const residualLine = noteLine(landed, DELIVERED_RESIDUALS);
    const residuals = residualPins(residualLine);
    const quiet = ROWS.filter(row => row.clause === 'residual');
    expect(quiet.flatMap(row => row.pins), residualLine).toEqual(residuals.map(([, pin]) => pin));
    expect(residuals.map(([name]) => name).filter(name => !quiet.some(row => row.label.includes(name))), residualLine).toEqual([]);
    // The landed mutant record: every pin it names as killing a src mutant still judges.
    const mutantLine = noteLine(landed, DELIVERED_MUTANTS);
    const killers = killerPins(mutantLine);
    expect(killers.filter(pin => !pins.includes(pin)), mutantLine).toEqual([]);
    // Together the three landed lines name the judged set exactly.
    expect([...new Set([...Object.values(byClause).flat(), ...residuals.map(([, pin]) => pin), ...killers])].sort()).toEqual([...pins].sort());
    // The follow-up's finding names the gate mutants; each keeps D2 shapes the roster witnesses as refusals.
    const finding = noteLine(notes.get(FOLLOW_UP) ?? '', FOLLOW_UP_FINDING);
    expect(Object.keys(GATE_SHAPES), finding).toEqual([...finding.matchAll(/\b(GM\d+[a-z]?):/g)].map(match => match[1]));
    const d2 = rosterWitness('D2');
    if (!isObject(d2)) throw new Error('the D2 witness must be an object of shapes');
    const refusing = (shape: string): boolean => typeof d2[shape] === 'string' && String(d2[shape]).startsWith('validation: ');
    expect(Object.entries(GATE_SHAPES).map(([mutant, shapes]) => [mutant, shapes.length > 0 && shapes.every(refusing)])).toEqual(Object.keys(GATE_SHAPES).map(mutant => [mutant, true]));
    const mapped = Object.values(GATE_SHAPES).flat();
    expect(new Set(mapped).size, 'each D2 shape stands for one gate mutant').toBe(mapped.length);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf('function');
          produced.splice(0);
          const before = reads;
          const looked = lookups;
          const witness = impl === undefined ? null : impl();
          expect(lookups - looked, 'the case never looks up its own expected witness').toBe(0);
          expect(produced.length, 'the case produced its witness through its seams').toBeGreaterThan(0);
          expect(produced.filter(value => !carries(witness, value)), 'every value the case produced is carried by its witness').toEqual([]);
          expect(witness).toStrictEqual(rosterWitness(pin));
          // wb-v2um F3: recorded only once the compare held; a case that returns a constant reads nothing.
          REACHED.push(`${pin}:${reads - before}`);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
    const tests = registered(task);
    const titles = tests.map(entry => entry.name);
    expect(titles, 'every registered test of this file, exactly and in roster order').toEqual([...ROSTER.tests]);
    expect(titles, 'the judged set, the anchors, one test per pin in row order, then this record').toEqual([JUDGED_TITLE, ANCHOR_TITLE, ...ROWS.flatMap(row => row.pins), RECORD_TITLE]);
    const here = tests.findIndex(entry => entry.self);
    expect(here, 'this case finds itself by task identity, registered last').toBe(tests.length - 1);
    const ran = (state: string | undefined): boolean => state === 'pass' || state === 'fail';
    const read = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? '+fails' : ''} | ${ran(entry.state) ? 'ran' : (entry.state ?? 'no result')}`;
    expect(tests.filter((entry, index) => index !== here && (entry.mode !== 'run' || entry.fails || !ran(entry.state))).map(read), 'every other test is in run mode, not inverted, and ran before this case').toEqual([]);
    expect(REACHED, 'every pin reached its seams once its witness compare held, in row order, with its pinned read count').toEqual([...ROSTER.reached]);
    expect(REACHED.filter(entry => entry.endsWith(':0')), 'no pin case reads nothing').toEqual([]);
  });
});
