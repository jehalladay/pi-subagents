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
 *    marker never reach a topology string; D2 a stated list of another shape is refused, never dropped - every JSON type at every
 *    position an inclusion record states a value at, the one rf states there admitted (wb-dwa9); D3 the inclusion note survives the
 *    diagnostics bound when every other leg notes too.
 *  Q, the residuals' pinned quiet rows, each carrying the counts of the input it read (wb-dwa9).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the whole judged set (every row's id, clause,
 * label and pins, every pin's witness) is held to the out-of-file roster test/fixtures/rf-inclusion-diagnosis-roster.json; the
 * acceptance clause letters of rows A-C are held to the bead's export row, the inclusion keys to the captured result roster,
 * and the D2 lattice's positions and JSON types to the wb-dwa9 export row's F1 line.
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
 *    block row (GM21) and its necessity twin, and a null row of either list. Each gate mutant the follow-up's finding names is
 *    refused through the D2 shapes that state what it admits (GATE_SHAPES named them by hand at landing 383; ADMITS reads them from
 *    the shapes' inputs since wb-dwa9 F5; GM15 one null list per inclusion key). The homogeneous shapes are cells of the wb-dwa9
 *    lattice now, and the heterogeneous ones are named by what their inputs state.
 *  F2 the anchors outside the cut (ANCHOR_TITLE): the wb-hs2j.1 row of the store export carries the landed delivery record, and
 *    its lines name every pin by its row - the ACCEPTANCE line each clause row's pins (B1-B4 a range), the RESIDUALS line each
 *    named residual with its quiet pin, the SRC MUTANTS line every pin that kills a landed src mutant - and the three together
 *    name the judged set exactly; the wb-v2um row's F1 line names the gate mutants ADMITS keeps. So a coordinated hollow of
 *    this file and its roster (the gate's CT6e A3, CT6r row Q, CT6d row D) reds against text no census cut edits.
 *  F3 the reached record (RECORD_TITLE, registered last): each pin's case counts its reads through the seams it judges (one per
 *    reader-adapter reading, per read of the captured result roster and per src walk) once its witness compare held, and the
 *    record holds the counts to the roster's reached list and refuses a pin that read nothing (the gate's GH1, a case returning
 *    its roster witness constant); no case may look up its own expected witness, and every value its seams produced must be
 *    carried by its witness. As landed that guard trusted every produce() call site, so a case could read and then hand produce()
 *    a literal of its own (the landing-383 gate's F3); wb-dwa9 F3 below closes it. The judged set, the anchors and the record walk
 *    the vitest task tree: the judged set runs first and sees every registered test collected in run mode, the record's own
 *    included (the wb-aff9 class), the anchors check the same, and the record sees every other test ran.
 *  F6 (optional rider) not taken: docs/workbench/09:43 stays as landed.
 *
 * FOLLOW-UP wb-dwa9 (R694, the landing-383 gate cmd_ebfffafa0ca0 PASS-WITH-FINDING; F1 leads, F2-F5 ride):
 *  F1 the JSON type lattice. D2 witnessed one bad value type per position, so four src mutants of its class survived at 18/18:
 *    Q-incnull (a decision row with include null), Q-incnum (a numeric include), Q-strrow (a string block row) and Q-boolrow (a
 *    boolean block row). D2 now reads every cell of the lattice the finding names - each position an inclusion record states a
 *    value at (blocks list, blocks row, necessity list, necessity row, include value) by each JSON type (null, boolean, number,
 *    string, array, object), 30 cells - and then the five heterogeneous shapes (a bad row last or inside either list, a decision
 *    row that states no include). A cell of the type rf states at its position holds the position's well-formed value, an array
 *    cell that value wrapped (the landed [[block]] and [[decision]] rows, so an unwrapping check such as P21n is refused), and
 *    every other cell SAMPLE's value of its type. Each shape is named by what its own input states at its position
 *    (`${position}: ${types}`, read back from the input, so no cell holds a value of another type); the roster witnesses each
 *    one, the anchors hold that witness to admit exactly the type rf states at each position and to refuse every other shape
 *    naming that position's list, and they hold the positions and the types to the wb-dwa9 row's F1 line.
 *  F2 the quiet rows carry their input. Q1 and Q2 shared one witness with each other and with the clean reading, so a case swap
 *    disarmed either residual pin. Each now produces the counts of the very result it read (blocks, judged candidates, judged
 *    candidates included) beside what that reaches, so a swap between them or to the clean reading reds, and RS-fix stays killed
 *    on Q1 and RB-fix on Q2. As landed, the result a reading registered aliased the case's own over arrays (a shallow
 *    { ...base, ...over }), so a case that read the other row's input and then edited its arrays before produce() carried the counts
 *    its own row names (the landing-482 gate's F1, L2-SWAPQ-MUTATE); wb-aodo F1 below closes it.
 *  F3 every produced value is derived from what the case read. produce(source, part) takes no value: source must be a value one
 *    of the seams (reading(), resultKeys(), srcFiles()) returned or threw during the running pin's case, and part names one PARTS
 *    derivation, computed from the source and the result it was read from. The seams keep their state in a closure, so a case
 *    reaches the record only through them and cannot hand it a literal of its own (the gate's L2-PRODLIT-A1 and L2-PRODLIT-B1).
 *    The record holds each pin's reads and produced parts to the roster's reached list (`${pin}:${reads}:${parts}`), so a part a
 *    case stops producing reds as well. As landed, the values the seams handed out stayed mutable and a witness needed only to carry
 *    its parts, so a case could edit a list a seam returned before produce() (the landing-482 gate's F1) or return its roster witness
 *    read directly beside padded parts (found by the wb-aodo seat); wb-aodo F1 below closes both.
 *  F4 the file-end judge. Before any case runs (beforeEach, once) the file reads which tests the collected tree selected; at the
 *    file's end (afterAll) it reds when the record was selected, or every pin reached its witness, yet the record neither finished
 *    nor failed - skipped at run time (the gate's L2-RECSKIP-RT, 17 passed | 1 skipped at rc 0) or at collection beside the judged
 *    set and the anchors (SK5, which the delivered-file marker backstop alone caught before), returned early or emptied. A
 *    test-name filter that deselects the record and some pin leaves the judge holding nothing. As landed, that read ran in the first
 *    beforeEach, and a hook registered ahead of it that skipped every case preempted it, so the judge held nothing (the landing-482
 *    gate's F2, L2-HOOKSKIP-RT-before, 0 passed | 18 skipped at rc 0); wb-aodo F2 below reds a run in which no case ran.
 *  F5 the gate mutants' shapes are read from the inputs. ADMITS states what each src mutant a follow-up's finding line names
 *    admits - a type at a lattice position, or mixed, a well-formed row beside an ill-formed one - and names no shape: refusedBy
 *    takes every D2 shape whose own input states that. Each mutant needs at least one such shape per admitted value, every one a
 *    refusal, and no shape stands for two mutants; the two lines name the mutant ids in ADMITS's order, and each mutant's own
 *    words on its line name the type ADMITS gives it. So the gate's L2-REPOINT16b (both mixed-blocks shapes deleted, GM16b
 *    repointed to a homogeneous shape) reds against text no census cut edits.
 *
 * FOLLOW-UP wb-aodo (R694, the landing-482 gate cmd_264895d0046c PASS-WITH-FINDING; F1 leads, F2 rides). Hop 3 of the chain
 * wb-hs2j.1 (landing 287) -> wb-v2um (383) -> wb-dwa9 (482), so it is cut in the R739 TERMINAL enumerate-the-resolvable form: the
 * criterion is the two resolvable classes below, every member named here is cured and measured, and a member outside them is a
 * NOT CLAIMED residual.
 *  F1 RESOLVABLE CLASS: a witness value or count that a case did not derive from what it read (the landing-383 F3 class the gate
 *    names), with every member the gate measured and every member the wb-aodo seat found. Members: a case that edits, between its
 *    read and produce(), a value a seam returned or threw - the captured result roster's key list (L2-C1-MUTATE-keys@RK-summary),
 *    the src walk (L2-C1-MUTATE-files@SRC-cbs), a refusal (M-ERR-MUTATE@MSG-swap) - or the input it handed reading() (its own
 *    over arrays: L2-SWAPQ-MUTATE@RS-fix, L2-SWAPQ-MUTATE-rev@RB-fix), or a part produce() derived (M-PART-MUTATE@RS-fix); a case
 *    that rewrites the roster witness it is compared against (M-ROSTER-WRITE@RS-fix), replaces a seam for a later case
 *    (M-SEAM-REPLACE@RS-fix) or swaps a PARTS derivation for its own produce() (M-PARTS-REPLACE@RS-fix); a case that re-enters
 *    run() so that its run counts only the reads made after (M-RUN-REENTRY@RS-fix); and a case whose witness holds a value no
 *    part it produced supplies, such as its roster witness read directly beside parts padded to their pinned count
 *    (M-PAD-ROSTER@RS-fix). Cure: every value a seam returns or throws and every part produce() derives is deep-frozen; each
 *    reading reads one frozen deep copy (structuredClone) of its result, taken at the read; every module-level value a case or a
 *    seam reads (the roster, the judged rows, the case table, the derivations, the host context, the shared inputs) and the seams
 *    object are frozen at load; run() refuses re-entry; and each pin's witness must be composed of the parts its case produced,
 *    by value - the witness is one of them, or an object each of whose entries is an entry of an object part or is itself so
 *    composed. Re-pinned, each true over this class: the seams() doc (a case reaches the record only through the seams and the
 *    pin harness, so it can neither hand it a value of its own nor move its counts, short of a NOT CLAIMED write of the file's
 *    own bookkeeping or edit of its environment); wb-dwa9 F2 (each quiet row produces the counts of the very result it read,
 *    whatever the case does to its own input after the read); and wb-v2um F3's lookup guard, which sees rosterWitness() only - a
 *    case can still read ROSTER directly, and what holds since wb-aodo is that a witness passes only when the case produced it.
 *  F2 RESOLVABLE CLASS: a run that selects this file yet runs no case, so the file-end judge holds nothing (the landing-383 F4
 *    runtime-skip class). Member: a hook registered ahead of the selection read that skips every case (L2-HOOKSKIP-RT-before; it
 *    adds no skip modifier to any test, so the delivered-file marker backstop cannot see it). Cure: every case body marks the run
 *    as started first thing, and the file-end judge reds when the file ran yet no case body started - a file a filter deselects
 *    entirely runs no hook, so a filtered run never reds there. A partial skip stays red as landed: the first case that runs
 *    reads the selection, in which every case skipped before it reads mode skip and every later one, the record included, still
 *    reads run, so a skipped record reds the judge and a record that runs reds on the skipped cases. The judge reads no runner
 *    binding (the census helper's context.runner-placed row reads one outside a case body or suite factory as an escape).
 * NOT CLAIMED: a src check that admits one value of a refused type other than the cell's own (include === 0 beside SAMPLE's 1:
 * the lattice holds one value per type); a heterogeneous shape deleted together with its roster witness and the D2 read and part
 * counts (the anchors need one mixed shape per mixed mutant, not both, and no mutant maps to the absent-include shape); an edit
 * of a seam, a PARTS derivation, the record or the file-end judge itself (in the source, or a case that rebinds one of the file's
 * own function declarations at run time). Outside wb-aodo's two classes: a run-time write of the file's own bookkeeping (the
 * reached list, the judge's flags, the run flag, the selection, the lookup counter) or of the vitest task tree (a task's mode or
 * result), which the record and the file-end judge trust; an edit of the environment the census runs in - a built-in or a global
 * (Object.freeze, structuredClone), or a src module's exported object or class - which the freezes and the snapshot rely on; and
 * which derivation supplied a witness entry, since the composition rule matches values.
 *
 * Display paths added: one, the inclusion leg's note, routed through the reader adapter's shown() helper, which is
 * sanitizeWorkbenchText(text, 200, 'label') with the NAMED label layout (the landed path of every other leg's note); it carries
 * only counts and fixed words. Test-only otherwise: no scratch, no spawn; src, the fixtures and the store export are only read.
 * The follow-ups wb-v2um, wb-dwa9 and wb-aodo add no display path: each is test-only (this census and, for the first two, its roster).
 */
import { type Dirent, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import ts from 'typescript';
import { afterAll, beforeEach, describe, expect, it, type TestContext } from 'vitest';
import { CapabilityError, type JsonValue } from '../src/workbench/capability-registry.js';
import { ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from '../src/workbench/providers/reactivefiber.js';
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from '../src/workbench/reactivefiber-observer.js';
import { fullShapeRf, type Json, readRfResultRoster, rfFixtureBlock, rfFixtureDecision } from './helpers/rf-render-fixture.js';

type JsonObject = { [key: string]: Json };
type Topology = ReactiveFiberProjectionTopology;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const ROSTER_PATH = join(HERE, 'fixtures', 'rf-inclusion-diagnosis-roster.json');
const EXPORT_PATH = join(REPO, '.beads', 'issues.jsonl');
const BEAD = 'wb-hs2j.1';
/** The workspace identity the readings and the host scope name: a string the observer compares, never a directory this file opens. */
const WS = '/workspace/rf-inclusion-diagnosis-census';
const scope: ObservationScope = frozen({ workspace: WS, principal: 'local-operator:census' });
const HOST: ReactiveFiberTopologyContext = frozen({ scope, seam: 'rf-cli', capturedAt: '2026-10-23T00:00:00Z', observedAt: '2026-10-23T00:00:01Z' });
/** The two inclusion records the reader adapter reads, each a result key of every --no-commit render the pinned rf emits. */
const INCLUSION_KEYS = frozen(['blocks', 'necessity']);
/** Obviously fake text placed in every block and decision field the leg must never surface (D1). */
const MARKER = 'CENSUS-PRIVATE-MARKER';
/** wb-v2um (R694 follow-up of landing 287): the bead whose export row names the gate mutants D2 refuses (F1). */
const FOLLOW_UP = 'wb-v2um';
/** wb-dwa9 (R694 follow-up of landing 383): the bead whose export row names the lattice D2 reads and four more src mutants (F1). */
const LATTICE_FOLLOW_UP = 'wb-dwa9';
/** The landed delivery record's lines in the wb-hs2j.1 export row and the follow-ups' lead finding lines, each found by its prefix. */
const DELIVERED_ACCEPTANCE = 'ACCEPTANCE: (a) ';
const DELIVERED_RESIDUALS = 'RESIDUALS (named, pinned quiet rows): ';
const DELIVERED_MUTANTS = 'SRC MUTANTS ';
const FOLLOW_UP_FINDING = '- F1 ';
/** The wb-dwa9 row's lead finding line as its filing wrote it, the filer's bracketed role first. */
const LATTICE_FINDING = '[leads] - F1 ';
const JUDGED_TITLE = 'the judged set: the frozen shape, the out-of-file roster, the export acceptance and the captured result roster agree';
const ANCHOR_TITLE =
  'the anchors outside the cut: the landed delivery record names every pin by its row, the follow-ups name the D2 lattice and the src mutants it refuses, and each mutant is refused by every D2 shape whose input states what it admits';
const RECORD_TITLE = 'the record: every registered test is in run mode and ran, and every pin reached its seams with its pinned read and part counts';

interface Row {
  readonly id: string;
  readonly clause: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and the bead's export row. */
const ROWS: readonly Row[] = frozen([
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
]);

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
  /** Each pin's reads and produced parts once its witness compare held, in row order: `${pin}:${reads}:${parts}` (wb-v2um F3,
   * wb-dwa9 F3). */
  readonly reached: readonly string[];
  /** Every test this file registers, in order (wb-v2um F3). */
  readonly tests: readonly string[];
}
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const isRecord = (value: Json): value is JsonObject => typeof value === 'object' && value !== null && !Array.isArray(value);
/** wb-aodo F1: deep-freezes a value in place and returns it. The seams freeze every value they return or throw, each reading's result
 * copy and every part produce() derives, and the file freezes every module-level value a case or a seam reads at load (the roster,
 * the judged rows, the case table, the derivations, the host context and the shared inputs), so a case can change nothing it read,
 * produced or is compared against. */
function frozen<T>(value: T, seen: WeakSet<object> = new WeakSet()): T {
  if (typeof value !== 'object' || value === null || seen.has(value)) return value;
  seen.add(value);
  Object.freeze(value);
  for (const key of Reflect.ownKeys(value)) {
    const entry: unknown = Object.getOwnPropertyDescriptor(value, key)?.value;
    frozen(entry, seen);
  }
  return value;
}
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
const ROSTER = frozen(readRoster());
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
/** A finding line cut at each id the pattern matches (wb-dwa9 F5): each id with its own words after it, up to the next id or the end
 * of its sentence, whichever comes first. */
function segmented(line: string, pattern: RegExp): (readonly [string, string])[] {
  const marks = [...line.matchAll(pattern)];
  return marks.map((mark, index) => {
    const start = (mark.index ?? 0) + mark[0].length;
    const next = marks[index + 1]?.index ?? line.length;
    const stop = line.indexOf('. ', start);
    return [mark[1] ?? '', line.slice(start, stop >= 0 && stop < next ? stop : next)] as const;
  });
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

const blockAt = (index: number, key = `fixture.component:main::block${index}`): JsonObject => ({ ...rfFixtureBlock(), final_index: index, candidate_key: key });
const keyAt = (index: number): string => `fixture.component:main::block${index}`;

/** wb-dwa9 F1: the JSON types (RFC 8259), the lattice's second axis, in the order the finding line names them. */
const JSON_TYPES = frozen(['null', 'boolean', 'number', 'string', 'array', 'object'] as const);
type JsonType = (typeof JSON_TYPES)[number];
/** What an input states at a lattice position: a value's JSON type, or absent for a decision row that states no include. */
type Stated = JsonType | 'absent';
function jsonType(value: unknown): JsonType {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'object') return 'object';
  throw new Error(`not a JSON value: ${typeof value}`);
}
/** The value each JSON type but array takes in a lattice cell ('false' spells a boolean, so a stringly include is a cell of its
 * own). A cell of the type rf states at its position holds the position's well-formed value instead, and an array cell holds that
 * well-formed value wrapped, so a check that unwraps or flattens an array (the landing-383 gate's P21n, P21flat) admits it. */
const SAMPLE: Readonly<Record<Exclude<JsonType, 'array'>, Json>> = frozen({ null: null, boolean: true, number: 1, string: 'false', object: {} });
/** A lattice position (wb-dwa9 F1): a place an inclusion record states a value at, the inclusion key whose refusal names it, and the
 * one JSON type rf states there (context.render.schema.json at 6a251bf73af5: result.blocks an array of block objects, :628-640;
 * result.necessity an array of decision records, each with a boolean include, :907-936). */
interface Position {
  readonly name: string;
  readonly key: string;
  readonly stated: JsonType;
  /** The position's well-formed value, the one cell of the position the leg admits. */
  readonly well: Json;
  /** The result overrides that state a value at this position, the rest of the reading well-formed. */
  readonly at: (value: Json) => JsonObject;
  /** What an input states at this position, read back from the input itself (wb-dwa9 F5). */
  readonly reads: (input: JsonObject) => Stated[];
}
const listOf = (input: JsonObject, key: string): Stated[] => (Object.hasOwn(input, key) ? [jsonType(input[key])] : []);
function rowsOf(input: JsonObject, key: string): Json[] {
  const list = input[key];
  return Array.isArray(list) ? list : [];
}
const POSITIONS: readonly Position[] = frozen([
  { name: 'blocks list', key: 'blocks', stated: 'array', well: [], at: value => ({ blocks: value }), reads: input => listOf(input, 'blocks') },
  { name: 'blocks row', key: 'blocks', stated: 'object', well: blockAt(0), at: value => ({ blocks: [value] }), reads: input => rowsOf(input, 'blocks').map(jsonType) },
  { name: 'necessity list', key: 'necessity', stated: 'array', well: [], at: value => ({ necessity: value }), reads: input => listOf(input, 'necessity') },
  { name: 'necessity row', key: 'necessity', stated: 'object', well: rfFixtureDecision(), at: value => ({ necessity: [value] }), reads: input => rowsOf(input, 'necessity').map(jsonType) },
  {
    name: 'include value',
    key: 'necessity',
    stated: 'boolean',
    well: true,
    at: value => ({ necessity: [{ ...rfFixtureDecision(), include: value }] }),
    reads: input => rowsOf(input, 'necessity').filter(isRecord).map(row => (Object.hasOwn(row, 'include') ? jsonType(row.include) : 'absent')),
  },
]);
/** wb-dwa9 F1: the lattice, every position by every JSON type, each cell named `${position}: ${type}`. */
const LATTICE: readonly (readonly [string, JsonObject])[] = frozen(
  POSITIONS.flatMap(position =>
    JSON_TYPES.map(type => {
      const value = type === position.stated ? position.well : type === 'array' ? [position.well] : SAMPLE[type];
      return [`${position.name}: ${type}`, position.at(structuredClone(value))] as const;
    }),
  ),
);
/** wb-v2um F1: beside the lattice, the heterogeneous shapes - a bad row last or inside either list, and a decision row that states no
 * include - each named, like a lattice cell, by what its input states at its position. */
const HETEROGENEOUS: readonly (readonly [string, JsonObject])[] = frozen([
  ['blocks row: object, number', { blocks: [blockAt(0), 1] }],
  ['blocks row: object, number, object', { blocks: [blockAt(0), 1, blockAt(1)] }],
  ['include value: boolean, absent', { necessity: [rfFixtureDecision(true, keyAt(0)), {}] }],
  ['include value: boolean, absent, boolean', { necessity: [rfFixtureDecision(true, keyAt(0)), {}, rfFixtureDecision(true, keyAt(1))] }],
  ['include value: absent', { necessity: [{}] }],
]);
/** Every shape D2 reads, in roster order. */
const D2_SHAPES: readonly (readonly [string, JsonObject])[] = frozen([...LATTICE, ...HETEROGENEOUS]);
/** The position a D2 shape's name opens with. */
const positionOf = (name: string): Position | undefined => POSITIONS.find(position => name.startsWith(`${position.name}: `));
/** What a D2 shape's input states at its position, spelled as its name must be. */
const statedBy = (position: Position, input: JsonObject): string => `${position.name}: ${position.reads(input).join(', ')}`;
/** What a src mutant a follow-up's finding line names admits (wb-dwa9 F5): a value of a type at a lattice position, or mixed - a
 * well-formed row beside an ill-formed one there. */
interface Admitted {
  readonly at: string;
  readonly type: Stated | 'mixed';
}
/** Each src mutant the follow-ups name, in their lines' order: the wb-v2um gate's GM ids (GM15 read a stated null list as absent, so
 * one null list per inclusion key) and the wb-dwa9 gate's four lattice survivors. No mutant's D2 shapes are named here: refusedBy
 * reads them from the shapes' inputs. */
const ADMITS: Readonly<Record<string, readonly Admitted[]>> = frozen({
  GM15: INCLUSION_KEYS.map((key): Admitted => ({ at: `${key} list`, type: 'null' })),
  GM16b: [{ at: 'blocks row', type: 'mixed' }],
  GM17b: [{ at: 'include value', type: 'mixed' }],
  GM21: [{ at: 'blocks row', type: 'array' }],
  'Q-incnull': [{ at: 'include value', type: 'null' }],
  'Q-incnum': [{ at: 'include value', type: 'number' }],
  'Q-strrow': [{ at: 'blocks row', type: 'string' }],
  'Q-boolrow': [{ at: 'blocks row', type: 'boolean' }],
});
/** The word a finding line uses for what a mutant admits. */
const ADMITS_WORD: Readonly<Record<Stated | 'mixed', string>> = frozen({
  null: 'null',
  boolean: 'boolean',
  number: 'numeric',
  string: 'string',
  array: 'array',
  object: 'object',
  absent: 'absent',
  mixed: 'mixed',
});
/** The D2 shapes whose own input states what a mutant admits at its position. */
function refusedBy(admitted: Admitted): string[] {
  const position = POSITIONS.find(entry => entry.name === admitted.at);
  if (position === undefined) return [];
  return D2_SHAPES.filter(([, input]) => {
    const states = position.reads(input);
    return admitted.type === 'mixed' ? states.includes(position.stated) && states.some(type => type !== position.stated) : states.includes(admitted.type);
  }).map(([name]) => name);
}
/** What a D2 witness reads: admitted, or the result key its refusal names. */
function outcomeOf(text: unknown): string {
  if (text === 'admitted') return 'admitted';
  return /^validation: ReactiveFiber topology refused: result\.([a-z]+) /.exec(typeof text === 'string' ? text : '')?.[1] ?? 'unread';
}

/** A value one of the seams returned or threw, with the pin whose case read it and the result it was read from (wb-dwa9 F3). */
interface SeamRead {
  readonly pin: string;
  readonly result: JsonObject | undefined;
}
/** A src module's code as the TypeScript printer emits it without comments, so a doc comment naming a field is not a reader of it. */
function codeOf(file: string): string {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  return ts.createPrinter({ removeComments: true }).printFile(source);
}
/** The derivations a witness part may be (wb-dwa9 F3): each computes its part from a value a pin's case read through a seam and the
 * result that value was read from. produce() names one; no case supplies a part's value. */
const PARTS = Object.freeze({
  /** What a reading reaches on the surfaces the bead names: the snapshot's coverage and tone, and its inclusion note. */
  reached: (topology: Topology): JsonObject => {
    const [snapshot] = topology.snapshots;
    if (snapshot === undefined) throw new Error('a preview reading projects one snapshot');
    return { coverage: snapshot.coverage ?? null, tone: snapshot.node.statusTone, inclusion: topology.diagnostics.filter(note => note.startsWith('inclusion')) };
  },
  /** The node a snapshot becomes under the observation projection, as a query lists it. */
  projected: (topology: Topology): JsonObject => {
    const [snapshot] = topology.snapshots;
    if (snapshot === undefined) throw new Error('a preview reading projects one snapshot');
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    const node = projection.query({ scope, limit: 10 }).nodes.find(item => item.nativeRef.id === snapshot.source.id);
    if (node === undefined) throw new Error('the refreshed snapshot must be queryable');
    return { completeness: node.completeness, tone: node.presentation.statusTone };
  },
  /** D2: a reading the leg took. */
  admitted: (_topology: Topology): string => 'admitted',
  /** D2: a reading the leg refused, as its error states it. */
  refused: (error: CapabilityError): string => `${error.category}: ${error.message}`,
  /** B3: the other legs' clean witnesses a reading states. */
  witnesses: (topology: Topology): string[] => topology.diagnostics.filter(note => note.startsWith('view contract') || note.startsWith('observations')),
  /** D1: whether a marked field reached the topology. */
  surfaced: (topology: Topology): boolean => JSON.stringify(topology).includes(MARKER),
  /** D3: the bounded diagnostics' length, and the inclusion note's place in them. */
  noteCount: (topology: Topology): number => topology.diagnostics.length,
  noteIndex: (topology: Topology): number => topology.diagnostics.findIndex(note => note.startsWith('inclusion')),
  /** wb-dwa9 F2: the counts of the very result a reading read - its blocks, judged candidates and judged candidates included (a
   * frozen copy taken at the read since wb-aodo F1). */
  input: (_topology: Topology, result: JsonObject | undefined): JsonObject => {
    const decisions = rowsOf(result ?? {}, 'necessity');
    return { blocks: rowsOf(result ?? {}, 'blocks').length, judged: decisions.length, judgedIncluded: decisions.filter(row => isRecord(row) && row.include === true).length };
  },
  /** C1: whether the captured result roster names a summary key, and every inclusion key. */
  summaryKey: (keys: readonly string[]): boolean => keys.includes('summary'),
  inclusionKeys: (keys: readonly string[]): boolean => INCLUSION_KEYS.every(key => keys.includes(key)),
  /** C1: the src modules whose comment-free code names counts_by_stage. */
  countsByStageReaders: (files: readonly string[]): string[] => files.filter(file => codeOf(file).includes('counts_by_stage')).map(file => relative(REPO, file)),
});
type Part = keyof typeof PARTS;
/** The seams a pin's case reads through, closed over what they record (wb-v2um F3, wb-dwa9 F3, wb-aodo F1): each reading, read of
 * the captured result roster and src walk counts once; every value one returns or throws is deep-frozen and registered under the
 * running pin with the result it was read from, itself a frozen copy taken at the read; produce() computes a part only from a value
 * so registered, and freezes it; and run() takes one case at a time. With the pin harness, which holds each witness to be composed
 * of the parts its case produced, a case reaches the record only through these, so it can neither hand it a value of its own nor
 * move its counts - short of a run-time write of the file's own bookkeeping or an edit of the environment it runs in (NOT
 * CLAIMED). */
function seams() {
  const origins = new WeakMap<object, SeamRead>();
  let pin = '';
  let reads = 0;
  const parts: Json[] = [];
  // wb-aodo F1: a value is frozen before it is registered, so a case can change nothing a seam handed it.
  const read = <T extends object>(value: T, result?: JsonObject): T => {
    origins.set(frozen(value), { pin, result });
    return value;
  };
  return {
    /** Runs one pin's case: its witness, the reads it made through the seams and every part it produced, in order. */
    run(id: string, body: () => Json): { readonly witness: Json; readonly reads: number; readonly parts: readonly Json[] } {
      // wb-aodo F1: one case at a time - a case that re-entered run() would reset the counts its own run keeps.
      if (pin !== '') throw new Error(`run: ${id} was entered while ${pin} runs`);
      pin = id;
      reads = 0;
      parts.splice(0);
      try {
        const witness = body();
        return { witness, reads, parts: [...parts] };
      } finally {
        pin = '';
      }
    },
    /** A full-shape preview reading with its result overridden key by key and, optionally, some result keys removed. */
    reading(over: JsonObject = {}, drop: readonly string[] = [], host: ReactiveFiberTopologyContext = HOST): Topology {
      reads += 1;
      const envelope = fullShapeRf(WS);
      const base = envelope.result;
      if (!isObject(base)) throw new Error('the full-shape fixture needs an object result');
      const stated: JsonObject = { ...(base as JsonObject), ...over };
      for (const key of drop) delete stated[key];
      // wb-aodo F1: the result the leg reads and the record counts is one frozen deep copy taken here, so it aliases none of the case's
      // own arrays (a shallow { ...base, ...over } did) and nothing the case does after the read reaches it.
      const result = frozen(structuredClone(stated));
      try {
        return read(reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: WS, source: { ...envelope, result } } as JsonValue, host), result);
      } catch (error) {
        if (error instanceof CapabilityError) read(error, result);
        throw error;
      }
    },
    /** The captured result roster's keys, a fresh list per read. */
    resultKeys(): readonly string[] {
      reads += 1;
      return read([...readRfResultRoster().resultKeys]);
    },
    /** Every src .ts module, sorted, a fresh list per walk. */
    srcFiles(): readonly string[] {
      reads += 1;
      const walk = (dir: string): string[] =>
        readdirSync(dir, { withFileTypes: true }).flatMap((entry: Dirent) => {
          const path = join(dir, entry.name);
          return entry.isDirectory() ? walk(path) : entry.name.endsWith('.ts') ? [path] : [];
        });
      return read(walk(join(REPO, 'src')).sort());
    },
    /** One witness part: PARTS[part] computed from a source the running pin's case read through a seam. */
    produce<P extends Part>(source: Parameters<(typeof PARTS)[P]>[0], part: P): ReturnType<(typeof PARTS)[P]> {
      const origin = origins.get(source as object);
      if (pin === '' || origin === undefined || origin.pin !== pin) throw new Error(`${part}: its source was not read through a seam by the running case (${pin || 'none'})`);
      const derive = PARTS[part] as (from: Parameters<(typeof PARTS)[P]>[0], result: JsonObject | undefined) => ReturnType<(typeof PARTS)[P]>;
      const value = frozen(derive(source, origin.result));
      parts.push(value as Json);
      return value;
    },
  };
}
const SEAMS = Object.freeze(seams());
const { reading, resultKeys, srcFiles, produce } = SEAMS;
const reached = (topology: Topology): JsonObject => produce(topology, 'reached');
const projected = (topology: Topology): JsonObject => produce(topology, 'projected');
/** D2: admitted when the leg takes the input, else the refusal it throws - a stated list of another shape is refused, never dropped. */
function refusal(over: JsonObject): string {
  let topology: Topology;
  try {
    topology = reading(over);
  } catch (error) {
    if (error instanceof CapabilityError) return produce(error, 'refused');
    throw error;
  }
  return produce(topology, 'admitted');
}
/** wb-dwa9 F2: a residual's quiet reading - what it reaches, beside the counts of the very result it read. */
function quiet(over: JsonObject): JsonObject {
  const topology = reading(over);
  return { ...reached(topology), input: produce(topology, 'input') };
}
/** A produced value is carried when the witness is it, holds it at any depth, or (an object) carries its every entry. */
function carries(witness: Json, value: Json): boolean {
  if (isDeepStrictEqual(witness, value)) return true;
  if (isObject(witness) && isObject(value) && Object.entries(value).every(([key, entry]) => Object.hasOwn(witness, key) && isDeepStrictEqual(witness[key], entry))) return true;
  const children: Json[] = Array.isArray(witness) ? witness : isObject(witness) ? Object.values(witness) : [];
  return children.some(child => carries(child, value));
}
/** wb-aodo F1: the paths of a witness no produced part supplies. A witness is composed of its parts when it is one of them, or an
 * object each of whose entries is an entry of an object part or is itself so composed - so a value the case did not produce, such as
 * its roster witness read directly beside parts padded to their pinned count, never passes. */
function uncomposed(witness: Json, parts: readonly Json[], path = '$'): string[] {
  if (parts.some(part => isDeepStrictEqual(part, witness))) return [];
  if (!isRecord(witness)) return [path];
  return Object.entries(witness).flatMap(([key, entry]) =>
    parts.some(part => isRecord(part) && Object.hasOwn(part, key) && isDeepStrictEqual(part[key], entry)) ? [] : uncomposed(entry, parts, `${path}.${key}`),
  );
}
/** The program's six withheld and one included candidate (02-swarm-usage-and-command-grammar.md:36). */
const PROGRAM_NECESSITY: Json[] = frozen([rfFixtureDecision(true, keyAt(0)), ...[1, 2, 3, 4, 5, 6].map(index => rfFixtureDecision(false, keyAt(index)))]);
/** rf-shaped counts (context.explain.schema.json summary) claiming every candidate reached the document. */
const FULL_SUMMARY: JsonObject = frozen({ counts_by_stage: { included: 1, host_visibility: 0, host_necessity: 0, sdk_assembly: 0 }, block_count: 1, included_blocks: 1 });
/** A satisfied --view contract and one fresh observed row: every other leg's clean witness (B3). */
const VIEW_CLEAN: JsonObject = frozen({
  view_id: 'ctx.dashboard', scope: null, view_contract: { view_id: 'ctx.dashboard', satisfied: true, degraded: false, failures: [] },
  observations: [{ status: 'observed', freshness: 'captured_at_render', replayed: false }],
});

/** Each pin's reads and produced parts once its witness compare held, in run order: `${pin}:${reads}:${parts}` (wb-v2um F3, wb-dwa9 F3). */
const REACHED: string[] = [];
/** The record's own run (wb-dwa9 F4): set when it finishes or fails; the file-end judge reads it. */
const JUDGE = { finished: false, failed: false };
/** The titles the collected task tree selected to run, read before any case runs (a test-name filter deselects the rest). */
const SELECTED: string[] = [];
/** wb-aodo F2: set first thing by every case body that starts - the judged set, the anchors, each pin and the record - so the
 * file-end judge can tell a run in which no case ran. */
const RUN = { started: false };

const IMPL: Readonly<Record<string, () => Json>> = Object.freeze({
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
    return { ...reached(topology), witnesses: produce(topology, 'witnesses') };
  },
  B4: () => ({ clean: reached(reading()), emptied: reached(reading({ blocks: [] })) }),
  C1: () => {
    const keys = resultKeys();
    return { rosterSummary: produce(keys, 'summaryKey'), inclusionKeysInRoster: produce(keys, 'inclusionKeys'), srcReaders: produce(srcFiles(), 'countsByStageReaders') };
  },
  C2: () => ({
    zeroBlocks: reached(reading({ blocks: [], summary: FULL_SUMMARY })),
    withheld: reached(reading({ blocks: [blockAt(0)], necessity: PROGRAM_NECESSITY, summary: FULL_SUMMARY })),
  }),
  D1: () => {
    const leaky: JsonObject = { candidate_key: MARKER, component_id: MARKER, final_index: 0, token_cost: { kind: MARKER, tokens: 7 }, token_cost_kind: MARKER };
    const decision = (include: boolean): JsonObject => ({ ...rfFixtureDecision(include, MARKER), reason: MARKER, judge_id: MARKER, metadata: { note: MARKER } });
    const topology = reading({ blocks: [leaky], necessity: [decision(true), decision(false)] });
    return { surfaced: produce(topology, 'surfaced'), ...reached(topology) };
  },
  // wb-dwa9 F1: every lattice cell, then the heterogeneous shapes, each read once and named by what its input states.
  D2: () => Object.fromEntries(D2_SHAPES.map(([name, over]) => [name, refusal(over)])),
  D3: () => {
    // Every other leg notes too: the fixture seam, reported errors, over budget, a failing contract, a demoting row, the release.
    const fixtureHost: ReactiveFiberTopologyContext = { ...HOST, seam: 'injected-fixture' };
    const topology = reading({
      blocks: [], necessity: PROGRAM_NECESSITY, diagnostics_summary: { errors: 1, warnings: 0, has_errors: true, has_warnings: false },
      budget: { formula_terms: { context_window: 100, output_reserve: 10, occupied_tokens: 120, overhead: 0, safety_margin: 0, available_context_tokens: -30 } },
      view_id: 'ctx.dashboard', scope: null, view_contract: { view_id: 'ctx.dashboard', satisfied: false, degraded: true, failures: [{ check: 'fixture' }] },
      observations: [{ status: 'unresolved', freshness: 'captured_at_render', replayed: false }],
    }, [], fixtureHost);
    return { count: produce(topology, 'noteCount'), index: produce(topology, 'noteIndex'), ...reached(topology) };
  },
  // wb-dwa9 F2: each quiet row carries the counts of the input it read, so the two rows and the clean reading never share a witness.
  Q1: () => quiet({ blocks: [blockAt(0)], necessity: [rfFixtureDecision(true, keyAt(0)), rfFixtureDecision(true, keyAt(1))] }),
  Q2: () => quiet({ blocks: [blockAt(0), blockAt(1)], necessity: [rfFixtureDecision(true, keyAt(0))] }),
});

// wb-dwa9 F4: the selection, read once from the collected tree before the first case runs (no case has run, so every mode is the
// collected one). wb-aodo F2: a hook registered ahead of this one can skip cases before it; then the first case that runs reads it,
// and a case skipped at run time reads mode skip while every later case still reads run - the record, registered last, included.
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registered(task).filter(entry => entry.mode === 'run').map(entry => entry.name));
});
// wb-dwa9 F4 (the landing-383 gate's L2-RECSKIP-RT: the record calling its own skip() at run time ended 17 passed | 1 skipped at rc
// 0): when the collected tree selected the record to run, or every pin reached its witness (an unfiltered run: a collected skip of
// the record beside the judged set and the anchors, the gate's SK5 shape), a record that neither finished nor failed - skipped at
// collection or at run time, returned early or emptied - reds the file here, outside the case. A test-name filter that deselects
// the record and some pin leaves this clause holding nothing.
afterAll(() => {
  // wb-aodo F2: the file ran (a file a filter deselects entirely runs no hook), yet no case body started - every selected case was
  // skipped at run time, by a hook calling skip() wherever it is registered (the landing-482 gate's L2-HOOKSKIP-RT-before).
  if (!RUN.started) throw new Error('the file ran, yet no registered test ran: every selected case was skipped at run time');
  const unfiltered = ROWS.flatMap(row => row.pins).every(pin => REACHED.some(entry => entry.split(':')[0] === pin));
  if ((SELECTED.includes(RECORD_TITLE) || unfiltered) && !JUDGE.finished && !JUDGE.failed) {
    throw new Error('the record neither finished nor failed in a run that selected it or reached every pin: it was skipped, returned early or emptied');
  }
});

describe('wb-hs2j.1 rf inclusion diagnosis census (RF-REACTIVE-CONTEXT-ASSEMBLY-R1)', () => {
  it(JUDGED_TITLE, ({ task }) => {
    RUN.started = true;
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
    // wb-dwa9 F1/F5: each D2 shape is named by what its own input states at its position, once, and each position's lattice cells
    // state every JSON type once, in order - so no cell holds a value of another type.
    expect(D2_SHAPES.filter(([name, input]) => {
      const position = positionOf(name);
      return position === undefined || statedBy(position, input) !== name;
    }).map(([name]) => name), 'a D2 shape whose name is not what its input states').toEqual([]);
    expect(new Set(D2_SHAPES.map(([name]) => name)).size, 'each D2 shape once').toBe(D2_SHAPES.length);
    expect(POSITIONS.map(position => LATTICE.filter(([name]) => positionOf(name) === position).map(([, input]) => position.reads(input).join(', ')))).toEqual(POSITIONS.map(() => [...JSON_TYPES]));
  });

  it(ANCHOR_TITLE, ({ task }) => {
    RUN.started = true;
    // The anchors check the collected modes too, so skipping both the judged set and the record still reds here.
    expect(notInRunMode(registered(task)), 'every registered test is collected in run mode, not inverted').toEqual([]);
    const notes = exportNotes([BEAD, FOLLOW_UP, LATTICE_FOLLOW_UP]);
    const landed = notes.get(BEAD) ?? '';
    const pins = ROWS.flatMap(row => row.pins);
    // The delivered acceptance line names each clause row's pins.
    const accepted = noteLine(landed, DELIVERED_ACCEPTANCE);
    const byClause = clausePins(accepted);
    expect(ROWS.filter(row => /^[a-z]$/.test(row.clause)).map(row => [row.clause, [...row.pins]]), accepted).toEqual(Object.entries(byClause));
    // The delivered residuals line names each residual with its pinned quiet row, and the residual row names each residual.
    const residualLine = noteLine(landed, DELIVERED_RESIDUALS);
    const residuals = residualPins(residualLine);
    const quietRows = ROWS.filter(row => row.clause === 'residual');
    expect(quietRows.flatMap(row => row.pins), residualLine).toEqual(residuals.map(([, pin]) => pin));
    expect(residuals.map(([name]) => name).filter(name => !quietRows.some(row => row.label.includes(name))), residualLine).toEqual([]);
    // The landed mutant record: every pin it names as killing a src mutant still judges.
    const mutantLine = noteLine(landed, DELIVERED_MUTANTS);
    const killers = killerPins(mutantLine);
    expect(killers.filter(pin => !pins.includes(pin)), mutantLine).toEqual([]);
    // Together the three landed lines name the judged set exactly.
    expect([...new Set([...Object.values(byClause).flat(), ...residuals.map(([, pin]) => pin), ...killers])].sort()).toEqual([...pins].sort());
    // wb-dwa9 F1: the lattice D2 reads is the one the follow-up's finding line names - its positions and its JSON types, in order.
    const lattice = noteLine(notes.get(LATTICE_FOLLOW_UP) ?? '', LATTICE_FINDING);
    const named = /refusal shapes \((.+?), each x ([a-z]+(?:\/[a-z]+)*)\)/.exec(lattice);
    expect({ positions: named?.[1]?.split(/, | and /) ?? [], types: named?.[2]?.split('/') ?? [] }, lattice).toEqual({
      positions: POSITIONS.map(position => position.name),
      types: [...JSON_TYPES],
    });
    // The roster's D2 witness admits exactly the type rf states at each position, and every other shape refuses, naming its list.
    const d2 = rosterWitness('D2');
    if (!isObject(d2)) throw new Error('the D2 witness must be an object of shapes');
    expect(D2_SHAPES.map(([name]) => [name, outcomeOf(d2[name])])).toEqual(
      D2_SHAPES.map(([name, input]) => {
        const position = positionOf(name);
        if (position === undefined) return [name, 'unpositioned'];
        return [name, position.reads(input).every(type => type === position.stated) ? 'admitted' : position.key];
      }),
    );
    // The follow-ups' lines name the src mutants D2 refuses, in ADMITS's order (wb-v2um's GM ids, then wb-dwa9's four survivors), and
    // each mutant's own words on its line name what ADMITS says it admits (wb-dwa9 F5).
    const finding = noteLine(notes.get(FOLLOW_UP) ?? '', FOLLOW_UP_FINDING);
    const mutants = [...segmented(finding, /\b(GM\d+[a-z]?):/g), ...segmented(lattice, /\b(Q-[a-z]+)\b/g)];
    expect(Object.keys(ADMITS), `${finding}\n${lattice}`).toEqual(mutants.map(([id]) => id));
    expect(
      mutants.filter(([id, words]) => !(ADMITS[id] ?? []).every(admitted => words.includes(ADMITS_WORD[admitted.type]))).map(([id, words]) => `${id}:${words}`),
      'a mutant whose own words do not name what ADMITS says it admits',
    ).toEqual([]);
    // wb-dwa9 F5: each mutant is refused by every D2 shape whose own input states what it admits - at least one per admitted value,
    // each a refusal - and no shape stands for two mutants.
    const refusing = Object.entries(ADMITS).map(([mutant, admits]) => [mutant, admits.map(refusedBy)] as const);
    expect(refusing.map(([mutant, sets]) => [mutant, sets.every(set => set.length > 0 && set.every(shape => !['admitted', 'unread'].includes(outcomeOf(d2[shape]))))])).toEqual(
      Object.keys(ADMITS).map(mutant => [mutant, true]),
    );
    const mapped = refusing.flatMap(([, sets]) => sets.flat());
    expect(new Set(mapped).size, 'each D2 shape stands for one gate mutant').toBe(mapped.length);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, () => {
          RUN.started = true;
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf('function');
          const looked = lookups;
          const { witness, reads, parts } = SEAMS.run(pin, () => (impl === undefined ? null : impl()));
          expect(lookups - looked, 'the case never looks up its own expected witness').toBe(0);
          expect(parts.length, 'the case produced its witness through its seams').toBeGreaterThan(0);
          expect(parts.filter(value => !carries(witness, value)), 'every part the case produced is carried by its witness').toEqual([]);
          // wb-aodo F1: and the witness is composed of those parts - no entry of it is a value the case did not produce.
          expect(uncomposed(witness, parts), 'every entry of the witness is a part the case produced').toEqual([]);
          expect(witness).toStrictEqual(rosterWitness(pin));
          // wb-v2um F3: recorded only once the compare held, with the reads the case made and (wb-dwa9 F3) the parts it produced.
          REACHED.push(`${pin}:${reads}:${parts.length}`);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task, onTestFailed }) => {
    RUN.started = true;
    onTestFailed(() => {
      JUDGE.failed = true;
    });
    const tests = registered(task);
    const titles = tests.map(entry => entry.name);
    expect(titles, 'every registered test of this file, exactly and in roster order').toEqual([...ROSTER.tests]);
    expect(titles, 'the judged set, the anchors, one test per pin in row order, then this record').toEqual([JUDGED_TITLE, ANCHOR_TITLE, ...ROWS.flatMap(row => row.pins), RECORD_TITLE]);
    const here = tests.findIndex(entry => entry.self);
    expect(here, 'this case finds itself by task identity, registered last').toBe(tests.length - 1);
    const ran = (state: string | undefined): boolean => state === 'pass' || state === 'fail';
    const read = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? '+fails' : ''} | ${ran(entry.state) ? 'ran' : (entry.state ?? 'no result')}`;
    expect(tests.filter((entry, index) => index !== here && (entry.mode !== 'run' || entry.fails || !ran(entry.state))).map(read), 'every other test is in run mode, not inverted, and ran before this case').toEqual([]);
    expect(REACHED, 'every pin reached its seams once its witness compare held, in row order, with its pinned read and part counts').toEqual([...ROSTER.reached]);
    expect(REACHED.filter(entry => entry.split(':')[1] === '0'), 'no pin case reads nothing').toEqual([]);
    JUDGE.finished = true;
  });
});
