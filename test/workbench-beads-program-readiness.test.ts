/** wb-4nut.5 (TSX-HARNESS2-REACTIVE-EVOLUTION-R5): program dispatch readiness read from the shared bead store only.
 *
 * Spec lines pinned, quoted from the bead's acceptance (the judged set holds every row label to that text in .beads/issues.jsonl):
 * (a) "one open `related` premise leaves the child not ready; a closed premise or a ruling bead with landed text marks it
 *     ready; a child whose gate carries no ADOPT text is never ready";
 * (b) "over the pinned snapshot (L19-L29, L56) the ready set equals exactly {rftsx-auqdi, rftsx-rupqh}";
 * (c) "`bd dep list rftsx-bhmrd` shows related/parent-child edges only and a blocks edge between H2 beads is refused";
 * (d) "with the store unreachable Pi reports 'unknown (store unreachable)', never the snapshot's 'open'".
 * The merged duplicates are carried as instances: PERF-F (epic rftsx-sbyih, the BEADS snapshot written 2026-10-21T11:10:38Z,
 * related edges never blockers) and the component-assembly program (epic rftsx-fin7f, TSX-IO-03b only on gate rftsx-pgob0's exact
 * ADOPT marker).
 *
 * ANCHORS OUTSIDE THIS FILE. test/fixtures/beads-program-snapshots.json holds the three pinned rftsx bead maps byte-exact,
 * raw-deflated (a byte list, so the producer's prose never reads as Pi's own text to the censuses that walk the tree); the
 * judged set inflates each, holds its byte length, recomputes its git blob id, and each id equals
 * `git rev-parse 76bbbffd9d4a:<path>` in ReactiveFiberTSXSDK. Every
 * map's own "Ready at creation" line is the oracle a store modeled from that map must reproduce through the reader's seams.
 * The bead's acceptance text anchors the row labels, the row count and the sub-clauses the pins cover. The gate verdict forms
 * state the landed reference reading (owner ruling R727 on this bead's respin): wb-4nut.4's readGateVerdict, which
 * test/workbench-h2-bead-graph-census.test.ts holds this reader to under its rows A-D; wb-4nut.4's own filing in the tracked
 * export anchors the marker words.
 *
 * THE MODELED STORE. The live rftsx store is unreachable from this repo (the ReactiveFiberTSXSDK clone carries no .beads at
 * HEAD, origin/main or 76bbbffd9d4a; the bead note records 76bbbffd9d4a:.beads/issues.jsonl ABSENT), so each case reads a store
 * modeled from a map: every bead of the map reads `open` (each map's line 3: the read at 2026-10-21T10:47:28Z); an adopted bead
 * reads its "status at the read" column; a child (M1 and later) has a parent-child edge to the map's epic; a ruling row (M0,
 * not the epic) is bd type decision (Dispatch: "Ruling rows (M0) are decision beads") with a parent-child edge to the epic
 * unless the checker notes say "no parent"; each "depends on (related)" target is a related edge, a key resolving through the
 * WP column of the maps in play and otherwise kept as a stand-in id (another program's bead: outside this program, its status
 * unread). The rulings a map names as governing it (line 7, text in .planning/OWNER-RULINGS.md) are the host's landed-record
 * witnesses, matched to rows by their ruling: label. The reader never sees a map: only the fake bd seams answer it.
 *
 * WB-K888 (the R694 follow-up of this bead's landing 381: F2 leads; F14-F17 ride here, F18-F21 in the h2 bead-graph census).
 * The reader-hygiene block pins each catch arm and bound the landing gate's module mutants read green: a work-reader error that
 * is not unavailable propagates (GM14), an abort as or while the last seam call answers is transport (GM27), a child under two
 * epics is one child (GM28), a program epic is never a dispatched child (GM29), the 4,194,304-character read bound holds both
 * ways (GM30) and a self-edge is neither a premise nor a blocker (GM32). D3 adds the AST reach scan with its kill controls (GM33
 * and its class). Row B is held to the pinned maps: the B pin naming each map's epic witnessed that map's ready line as the
 * reader read it, and one B pin the maps' union, so a B body that only reaches its witness (the gate's B2 liveness-only witness)
 * reds, and so does removing B4.
 * WB-52TH (the R694 follow-up of wb-k888's landing 498: F1 leads in the h2 bead-graph census; F2 and F3 ride here). F2: three
 * GM33-class plants of the landing gate escaped D3's reach scan, and each is now a row of REACH_PLANTS with the reach it must
 * read. The scan resolves every name through the TypeScript binder over the module alone, so a parameter that shadows a built-in
 * hides only the reads inside its own function (L2-M33sh: a free globalThis read beside a parameter named globalThis, which the
 * file-wide declared set hid; L2-M33sh-quiet, the shadow alone, reads nothing); the name `constructor` spelled anywhere in the
 * code is a constructor read - dotted, by a literal key, as a destructured key or as a string handed to a descriptor or reflect
 * read (L2-M33p: Object.getOwnPropertyDescriptor with a 'constructor' argument; L2-M33d2: {constructor: door} =
 * Object.getPrototypeOf(() => 0)); a class's extends clause is a value read although TypeScript parses it as a type node (GM33f,
 * a class member this cut found: class Door extends Function reached the Function constructor unseen); and an import-require
 * declaration counts as an import() (GM33g: the binder binds the name it declares, which the file-wide scan had read as a free
 * name), while a shorthand property such as {globalThis} still reads the name (GM33h: the binder alone binds it to the property
 * it declares). The table's ids are pinned as a literal, and every L2 reach plant id the filing's first F2 bullet names in the tracked
 * export is one of its rows. F3: an abort before a seam call reaches no seam - aborted before the first call the read calls bd
 * never, and a read aborted as the gated child's work reading answers never reads the gate (L2-M27p: dropping seam()'s pre-call
 * abort check kept the transport category and called bd).
 * NAMED RESIDUALS (row R; each pin is the residual's quiet row, its quiet set derived from the run and pinned as its witness):
 *  R1 R-SHARED-SUBCLAUSE where pins share one acceptance sub-clause and none holds a pinned map or the maps' union, removing one
 *    from every literal at once (its pin, its ROWS entry, the frozen count) leaves the structural holds green. The quiet set is
 *    derived from the bead's acceptance text, so a pin whose only partner is gone leaves it: removing A3, A4, A5, A6, C1 or C3
 *    reds R1 through that text, while B5 (beside the four map-held B pins) and D1, D2 and D3 (one sub-clause, three pins) stay
 *    quiet.
 *  R2 R-REFLECTIVE-REACH a member or descriptor read keyed by a name bound to a composed string (the Function constructor
 *    reached as Object[door], or as Object.getOwnPropertyDescriptor(prototype, door)) is no reach to the scan.
 *  R3 R-WITNESS-ECHO outside row B's map hold no witnessed value has an anchor outside this file: a body swapped for a case that
 *    still reaches its witness stays green.
 * The gate form G08 stays this census's pin of R-NEGATED-PROSE.
 */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {inflateRawSync} from 'node:zlib';
import ts from 'typescript';
import {describe, expect, it} from 'vitest';
import {type BeadsShowCall, type BeadsShowResult, readBeadsWork} from '../src/workbench/beads-observer.js';
import {
  type BeadsProgram,
  type BeadsProgramClient,
  type BeadsProgramReadiness,
  type BeadsProgramWorkReader,
  readBeadsProgramReadiness,
  STORE_UNREACHABLE,
} from '../src/workbench/beads-program-readiness.js';
import {CapabilityError} from '../src/workbench/capability-registry.js';
import type {ObservationScope} from '../src/workbench/observation.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const BEAD = 'wb-4nut.5';
const PIN = '76bbbffd9d4a419f972d6fefc8b7f9dc524df8df';
const MODULE = join(REPO, 'src', 'workbench', 'beads-program-readiness.ts');

// ---------------------------------------------------------------------------------------------------------------------------
// The pinned maps (outside anchor) and the store modeled from them.

interface SnapshotFile {
  path: string;
  blob: string;
  text: string;
}
/** The fixture stores each map raw-deflated (its bytes as a number list), so the producer's prose never reads as Pi's own text. */
const STORED = JSON.parse(readFileSync(join(HERE, 'fixtures', 'beads-program-snapshots.json'), 'utf8')) as {
  repo: string;
  commit: string;
  snapshots: {path: string; blob: string; bytes: number; deflated: number[]}[];
};
const FIXTURE: {repo: string; commit: string; snapshots: SnapshotFile[]} = {
  repo: STORED.repo,
  commit: STORED.commit,
  snapshots: STORED.snapshots.map((file) => ({path: file.path, blob: file.blob, text: inflateRawSync(Buffer.from(file.deflated)).toString('utf8')})),
};
/** `git rev-parse 76bbbffd9d4a:<path>` in ReactiveFiberTSXSDK, for each pinned map. */
const BLOBS: Readonly<Record<string, string>> = {
  'docs/programs/harness2-reactive-evolution-2026-10-20/BEADS-2026-10-21.md': '80427fdf9c89958cce77f66cc3dfa481327400f7',
  'docs/programs/resource-efficiency-frontier-2026-10-17/BEADS-2026-10-21.md': 'ce1bd3522cf58b89000a7eb42f05db2aaf3b0c2b',
  'docs/programs/component-assembly-2026-10-18/BEADS-2026-10-21.md': 'cd19abd9e318a54f51415344d55269dda401c157',
};
const gitBlob = (text: string): string => {
  const bytes = Buffer.from(text, 'utf8');
  return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
};

interface MapRow {
  line: number;
  milestone: string;
  id: string;
  wp: string;
  title: string;
  priority: number;
  dependsOn: string[];
  labels: string[];
}
interface GatedRow {
  line: number;
  key: string;
  gates: string[];
}
interface ProgramMap {
  path: string;
  epic: string;
  rows: MapRow[];
  adopted: Map<string, string>;
  noParent: Set<string>;
  gated: GatedRow[];
  ready: {line: number; ids: string[]};
  rulings: string[];
  premiseSentence: boolean;
}
/** A GFM table row's cells: `\|` is a literal pipe inside a cell. */
const cells = (line: string): string[] =>
  line
    .split(/(?<!\\)\|/)
    .slice(1, -1)
    .map((cell) => cell.trim());

function parseMap(file: SnapshotFile): ProgramMap {
  const rows: MapRow[] = [];
  const adopted = new Map<string, string>();
  const noParent = new Set<string>();
  const gated: GatedRow[] = [];
  let ready: {line: number; ids: string[]} | undefined;
  let rulings: string[] | undefined;
  let section = '';
  file.text.split('\n').forEach((text, index) => {
    const line = index + 1;
    const heading = /^#{2,3} (.*)$/.exec(text);
    if (heading) {
      section = heading[1] ?? '';
      return;
    }
    const row = text.startsWith('| ') && !/^\| (bead id|existing bead|WP key) \|/.test(text);
    const milestone = /^(M\d+) - /.exec(section)?.[1];
    if (row && milestone !== undefined) {
      const c = cells(text);
      if (c.length !== 9) throw new Error(`${file.path}:${line} is not a 9-cell bead row`);
      rows.push({line, milestone, id: c[0], wp: c[1], title: c[2], priority: Number(c[3].slice(1)), dependsOn: c[5] === '-' ? [] : c[5].split(', '), labels: c[8].split(', ')});
    } else if (row && section.startsWith('Adopted beads')) {
      const c = cells(text);
      if (c.length !== 5) throw new Error(`${file.path}:${line} is not a 5-cell adopted row`);
      adopted.set(c[0], c[2]);
    } else if (row && section.startsWith('Gated work packages')) {
      const c = cells(text);
      if (c.length !== 7) throw new Error(`${file.path}:${line} is not a 7-cell gated row`);
      gated.push({line, key: c[0], gates: [...c[5].matchAll(/\((rftsx-[a-z0-9.]+)\)/g)].map((match) => match[1] ?? '')});
    }
    const checker = /^- `(rftsx-[a-z0-9.]+)` OK\*: .*\bno parent\b/.exec(text);
    if (checker?.[1]) noParent.add(checker[1]);
    const readyLine = /^Ready at creation \(M1\): (.*)$/.exec(text);
    if (readyLine) ready = {line, ids: [...(readyLine[1] ?? '').matchAll(/`(rftsx-[a-z0-9.]+)`/g)].map((match) => match[1] ?? '')};
    const rulingLine = /^Rulings that govern this map: ([^(]*)\(/.exec(text);
    if (rulingLine) rulings = [...new Set([...(rulingLine[1] ?? '').matchAll(/\bR-(\d+)\b/gi)].map((match) => `r-${match[1]}`))];
  });
  const epics = rows.filter((row) => row.milestone === 'M0' && row.labels.includes('epic'));
  if (epics.length !== 1 || epics[0] === undefined || ready === undefined || rulings === undefined) throw new Error(`${file.path} lacks an epic, a ready line or a rulings line`);
  const premiseSentence = file.text.includes('Every premise is a `related` edge, never a blocker.');
  return {path: file.path, epic: epics[0].id, rows, adopted, noParent, gated, ready, rulings, premiseSentence};
}
function snapshot(program: string): SnapshotFile {
  const found = FIXTURE.snapshots.find((file) => file.path === `docs/programs/${program}/BEADS-2026-10-21.md`);
  if (!found) throw new Error(`fixture lacks ${program}`);
  return found;
}
const H2 = parseMap(snapshot('harness2-reactive-evolution-2026-10-20'));
const PERF = parseMap(snapshot('resource-efficiency-frontier-2026-10-17'));
const ASSEMBLY = parseMap(snapshot('component-assembly-2026-10-18'));
const MAPS: readonly ProgramMap[] = [H2, PERF, ASSEMBLY];

interface ModelBead {
  id: string;
  title: string;
  status: string;
  issueType: string;
  priority: number;
  labels: string[];
  parent?: string;
  related: string[];
  blocks: string[];
  notes?: string;
  description?: string;
}
type Store = Map<string, ModelBead>;

function modelStore(maps: readonly ProgramMap[]): Store {
  const keys = new Map<string, string>();
  for (const map of maps) for (const row of map.rows) keys.set(row.wp.toUpperCase(), row.id);
  const resolve = (token: string): string => (token.startsWith('rftsx-') ? token : (keys.get(token.toUpperCase()) ?? token));
  const store: Store = new Map();
  for (const map of maps) {
    for (const [id, status] of map.adopted) if (!store.has(id)) store.set(id, {id, title: `adopted ${id}`, status, issueType: 'task', priority: 2, labels: [], related: [], blocks: []});
    for (const row of map.rows) {
      const epic = row.milestone === 'M0' && row.labels.includes('epic');
      const issueType = epic ? 'epic' : row.milestone === 'M0' || row.labels.includes('decision') ? 'decision' : 'task';
      const parent = epic || (row.milestone === 'M0' && map.noParent.has(row.id)) ? undefined : map.epic;
      const related = [...new Set([...(store.get(row.id)?.related ?? []), ...row.dependsOn.map(resolve)])];
      store.set(row.id, {id: row.id, title: row.title, status: 'open', issueType, priority: row.priority, labels: row.labels, ...(parent !== undefined ? {parent} : {}), related, blocks: []});
    }
  }
  return store;
}
/** The rows a map names as its governing rulings (line 7), by their ruling: label: the host's landed-record witnesses. */
const landedRulings = (map: ProgramMap): string[] =>
  map.rows
    .filter((row) =>
      row.labels.some((label) => {
        const match = /^ruling:(r-\d+)$/i.exec(label);
        return match !== null && map.rulings.includes((match[1] ?? '').toLowerCase());
      }),
    )
    .map((row) => row.id);
const edit = (store: Store, id: string, change: Partial<ModelBead>): Store => {
  const bead = store.get(id);
  if (!bead) throw new Error(`model lacks ${id}`);
  store.set(id, {...bead, ...change});
  return store;
};

// ---------------------------------------------------------------------------------------------------------------------------
// The fake bd seams over a modeled store, in the measured bd 1.1.0-rc.1 shapes (bd show prints an issue ARRAY with dependency
// records; bd dep list --direction=up --json prints a flat record array, `[]` for none; a missing id exits 1 with an error object).

const missing = (): BeadsShowResult => ({exit: 1, stdout: JSON.stringify({error: 'no issues found matching the provided IDs', schema_version: 1}), stderr: ''});
type Fault = BeadsShowResult | 'throw';
interface Seen {
  verb: 'show' | 'dependents';
  id: string;
  cwd: string;
  timeoutMs: number;
}
function bd(store: Store, faults: {dependents?: Fault; show?: ReadonlyMap<string, Fault>} = {}): BeadsProgramClient & {seen: Seen[]} {
  const seen: Seen[] = [];
  const record = (id: string, dependency_type: string): Record<string, unknown> => {
    const bead = store.get(id);
    return {id, title: bead?.title ?? id, status: bead?.status ?? 'open', issue_type: bead?.issueType ?? 'task', priority: bead?.priority ?? 2, dependency_type};
  };
  const answer = (fault: Fault | undefined): BeadsShowResult | undefined => {
    if (fault === 'throw') throw new Error('spawn bd ENOENT /secret/argv');
    return fault;
  };
  return {
    seen,
    async show(id: string, call: BeadsShowCall): Promise<BeadsShowResult> {
      seen.push({verb: 'show', id, cwd: call.cwd, timeoutMs: call.timeoutMs});
      const faulted = answer(faults.show?.get(id));
      if (faulted) return faulted;
      const bead = store.get(id);
      if (!bead) return missing();
      const dependencies = [...(bead.parent !== undefined ? [record(bead.parent, 'parent-child')] : []), ...bead.related.map((to) => record(to, 'related')), ...bead.blocks.map((to) => record(to, 'blocks'))];
      const issue = {
        id,
        title: bead.title,
        status: bead.status,
        issue_type: bead.issueType,
        priority: bead.priority,
        ...(bead.labels.length > 0 ? {labels: bead.labels} : {}),
        ...(bead.parent !== undefined ? {parent: bead.parent} : {}),
        dependencies,
        ...(bead.notes !== undefined ? {notes: bead.notes} : {}),
        ...(bead.description !== undefined ? {description: bead.description} : {}),
      };
      return {exit: 0, stdout: JSON.stringify([issue]), stderr: ''};
    },
    async dependents(id: string, call: BeadsShowCall): Promise<BeadsShowResult> {
      seen.push({verb: 'dependents', id, cwd: call.cwd, timeoutMs: call.timeoutMs});
      const faulted = answer(faults.dependents);
      if (faulted) return faulted;
      if (!store.has(id)) return missing();
      const records = [...store.values()].flatMap((bead) =>
        [...(bead.parent === id ? ['parent-child'] : []), ...bead.related.filter((to) => to === id).map(() => 'related'), ...bead.blocks.filter((to) => to === id).map(() => 'blocks')].map((type) => ({
          ...record(bead.id, type),
          ...(bead.labels.length > 0 ? {labels: bead.labels} : {}),
        })),
      );
      return {exit: 0, stdout: JSON.stringify(records), stderr: ''};
    },
  };
}

const SCOPE: ObservationScope = {workspace: '/fixture/rftsx-store', principal: 'operator'};
const LIMITS = {maxDependencies: 16, maxTitleChars: 120, timeoutMs: 5000};
const NOW = (): string => '2026-10-23T09:00:00.000Z';
/** The pin whose body is running (pin() sets it around the body), so each reading is filed under the pin that took it. */
let running: string | undefined;
/** Every reading a pin's body took, as its sorted ready set, in call order: row B's witnesses are held to them (wb-k888). */
const READINGS = new Map<string, string[][]>();
/** The host's binding of the work reader is wb-752.6's readBeadsWork: the module imports no Beads reader (the landed wb-kku9.3
 * claim re-check census holds that reader's importers under src, qa and examples to an empty set), so the host passes it in. */
const read = async (
  client: BeadsProgramClient,
  program: BeadsProgram,
  extra: {scope?: ObservationScope; signal?: AbortSignal; limits?: typeof LIMITS; readWork?: BeadsProgramWorkReader} = {},
): Promise<BeadsProgramReadiness> => {
  const reading = await readBeadsProgramReadiness(client, {
    program,
    workspaceRoot: SCOPE.workspace,
    scope: extra.scope ?? SCOPE,
    limits: extra.limits ?? LIMITS,
    now: NOW,
    readWork: extra.readWork ?? readBeadsWork,
    ...(extra.signal ? {signal: extra.signal} : {}),
  });
  if (running !== undefined) READINGS.set(running, [...(READINGS.get(running) ?? []), sorted(reading.ready)]);
  return reading;
};
const programOf = (map: ProgramMap, extra: Partial<BeadsProgram> = {}): BeadsProgram => ({epics: [map.epic], landedRecords: landedRulings(map), ...extra});
const sorted = (ids: readonly string[]): string[] => [...ids].sort();
const child = (reading: BeadsProgramReadiness, id: string) => {
  const found = reading.children.find((entry) => entry.id === id);
  if (!found) throw new Error(`reading lists no child ${id}`);
  return found;
};
async function category(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof CapabilityError) return error.category;
    throw error;
  }
  return 'resolved';
}

// ---------------------------------------------------------------------------------------------------------------------------
// The gate verdict forms (a gated packet is not created at the pin: each map's gated table names it by key, so the key is its
// stand-in id). Each form edits a CLOSED gate bead with no notes (EAT-R575: the ruling bead closes when ruled) and states the
// verdict the reader must read: the landed MARKER reading - exactly one 'ruled ADOPT' or 'ruled REJECT' marker, verbatim at word
// bounds and not the first member of an alternative, across the gate's title, description and notes; DEFER is no marker; no
// marker or two read no-verdict. The gated child is ready exactly when that verdict is ADOPT. G08 is the named residual
// R-NEGATED-PROSE: the reader parses no grammar, so a negated marker inside prose reads as the marker (pinned, not cured).

type FormVerdict = 'ADOPT' | 'REJECT' | 'no-verdict';
interface GateForm {
  id: string;
  verdict: FormVerdict;
  why: string;
  apply: (gate: ModelBead) => Partial<ModelBead>;
}
const GATE_FORMS: readonly GateForm[] = [
  {id: 'G01', verdict: 'no-verdict', why: 'no appended notes and no marker in the title', apply: () => ({})},
  {id: 'G02', verdict: 'ADOPT', why: 'one marker ruled ADOPT in the notes', apply: () => ({notes: 'ruled ADOPT'})},
  {id: 'G03', verdict: 'no-verdict', why: 'ruled DEFER is no verdict marker', apply: () => ({notes: 'ruled DEFER'})},
  {id: 'G04', verdict: 'REJECT', why: 'one marker ruled REJECT in the notes', apply: () => ({notes: 'ruled REJECT'})},
  {id: 'G05', verdict: 'no-verdict', why: 'two ADOPT lines are two markers', apply: () => ({notes: 'ruled ADOPT\nruled ADOPT'})},
  {id: 'G06', verdict: 'no-verdict', why: 'an ADOPT and a REJECT line', apply: () => ({notes: 'ruled ADOPT\n\nruled REJECT'})},
  {id: 'G07', verdict: 'no-verdict', why: "the gate's own title template copied into its notes: the question form is no marker", apply: (gate) => ({notes: `Full statement: ${gate.title}`})},
  {id: 'G08', verdict: 'ADOPT', why: 'a marker inside prose reads, negated or not (residual R-NEGATED-PROSE)', apply: () => ({notes: 'not yet ruled ADOPT'})},
  {id: 'G09', verdict: 'no-verdict', why: 'the marker in another case', apply: () => ({notes: 'ruled adopt'})},
  {id: 'G10', verdict: 'no-verdict', why: "another program's verdict word (the rftsx-atcqf.42 pattern)", apply: () => ({notes: 'ruled ADOPT-PROTOTYPE'})},
  {id: 'G11', verdict: 'ADOPT', why: 'the marker in the title alone: the title is a text field', apply: (gate) => ({title: `${gate.title} - ruled ADOPT`})},
  {id: 'G12', verdict: 'ADOPT', why: 'the marker in the description alone: the body is a text field', apply: () => ({description: 'ruled ADOPT'})},
  {id: 'G13', verdict: 'ADOPT', why: 'one marker among other notes, padded and CRLF-ended', apply: () => ({notes: 'Owner ruling recorded.\r\n  ruled ADOPT  \r\nAPI-PIN.md landed.'})},
  {id: 'G14', verdict: 'ADOPT', why: 'trailing punctuation ends the verdict word', apply: () => ({notes: 'ruled ADOPT.'})},
  {id: 'G15', verdict: 'no-verdict', why: 'a ruled ADOPT line beside a REJECT marker inside prose: two markers', apply: () => ({notes: 'ruled ADOPT\nan earlier draft was ruled REJECT and withdrawn'})},
  {id: 'G16', verdict: 'no-verdict', why: 'ADOPT in the notes and REJECT in the description: two markers across fields', apply: () => ({description: 'ruled REJECT', notes: 'ruled ADOPT'})},
  {id: 'G17', verdict: 'no-verdict', why: 'ADOPT in the title and in the notes: two markers across fields', apply: (gate) => ({title: `${gate.title} - ruled ADOPT`, notes: 'ruled ADOPT'})},
  {id: 'G18', verdict: 'ADOPT', why: 'a ruled ADOPT line beside a ruled DEFER line: DEFER is no marker', apply: () => ({notes: 'ruled ADOPT\nruled DEFER'})},
  {id: 'G19', verdict: 'no-verdict', why: 'the alternation form in the notes is the question, not its answer', apply: () => ({notes: 'ruled ADOPT or REJECT'})},
  {id: 'G20', verdict: 'no-verdict', why: 'a marker in a label: labels are never read', apply: (gate) => ({labels: [...gate.labels, 'ruled ADOPT']})},
  {id: 'G21', verdict: 'no-verdict', why: 'an alternative joined by nor is no marker', apply: () => ({notes: 'neither ruled ADOPT nor REJECT yet'})},
  {id: 'G22', verdict: 'no-verdict', why: 'an alternative joined by and is no marker', apply: () => ({notes: 'ruled ADOPT and REJECT'})},
  {id: 'G23', verdict: 'no-verdict', why: 'the word ruled in another case', apply: () => ({notes: 'Ruled ADOPT'})},
];
/** The H2 gated packet and the component-assembly one the merged TSX-CA-R5 duplicate names, each with its map's gate bead. */
const GATED: readonly {map: ProgramMap; packet: string; label: string}[] = [
  {map: H2, packet: 'TSX-H2-01', label: 'wp:tsx-h2-01'},
  {map: ASSEMBLY, packet: 'TSX-IO-03b', label: 'wp:TSX-IO-03b'},
];
function gatedStore(map: ProgramMap, packet: string, label: string, form: GateForm): {store: Store; gate: string} {
  const row = map.gated.find((entry) => entry.key === packet);
  const gate = row?.gates[0];
  if (row === undefined || gate === undefined || row.gates.length !== 1) throw new Error(`${map.path} gates ${packet} with no single gate bead`);
  const store = modelStore([map]);
  const base = store.get(gate);
  if (!base) throw new Error(`model lacks gate ${gate}`);
  edit(store, gate, {status: 'closed', ...form.apply(base)});
  store.set(packet, {id: packet, title: `gated packet ${packet}`, status: 'open', issueType: 'feature', priority: 3, labels: [label], parent: map.epic, related: [gate], blocks: []});
  return {store, gate};
}

// ---------------------------------------------------------------------------------------------------------------------------
// D3's reach scan (wb-k888, the F17 class): what the module's code can touch beyond its two imports, read from the TypeScript
// AST. Comments and type positions never execute, so neither is read. A text ban misses a builtin reached without an import
// (process.getBuiltinModule through globalThis, the Function constructor, a computed import()), so the scan names them.

/** The language built-ins the reader's code names today; none reaches the host (no process, file system, network or evaluator). */
const ALLOWED_GLOBALS: readonly string[] = ['Array', 'JSON', 'Map', 'Number', 'Object', 'RegExp', 'Set', 'undefined'];
interface Reach {
  /** Every free value name the code reads (no declaration in the file binds it where it is read), sorted. */
  globals: string[];
  /** import() calls, import.meta reads and import-require declarations. */
  dynamicImports: number;
  /** The name `constructor` spelled in the code (wb-52th F2): a member read dotted or by a literal key, a destructured key, or a
   * string anywhere, a descriptor or reflect read's argument included - the door to the Function constructor. */
  constructorReads: number;
  /** Member reads whose key is computed from anything but a literal or a name. */
  computedKeys: number;
}
/** A name the node binds (a declaration's own name), never a read. */
function declaresName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isVariableDeclaration(parent) ||
      ts.isFunctionDeclaration(parent) ||
      ts.isFunctionExpression(parent) ||
      ts.isClassDeclaration(parent) ||
      ts.isParameter(parent) ||
      ts.isBindingElement(parent) ||
      ts.isImportSpecifier(parent) ||
      ts.isImportClause(parent) ||
      ts.isNamespaceImport(parent) ||
      ts.isTypeParameterDeclaration(parent)) &&
    parent.name === node
  );
}
/** A name that keys a member or a label, never a value read: `a.name`, `{name: v}`, a method name, an import alias. */
function keysMember(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isPropertyAssignment(parent) && parent.name === node) ||
    (ts.isMethodDeclaration(parent) && parent.name === node) ||
    (ts.isBindingElement(parent) && parent.propertyName === node) ||
    (ts.isImportSpecifier(parent) && parent.propertyName === node) ||
    ts.isLabeledStatement(parent) ||
    ts.isBreakOrContinueStatement(parent)
  );
}
/** The free-read test for one module, from the TypeScript binder over that file alone (no lib, nothing resolved; wb-52th F2): a
 * name is free where no declaration in the file is its symbol's, so a parameter that shadows a built-in binds only the reads
 * inside its own function, never a read elsewhere in the file (the L2-M33sh door of a file-wide declared set). */
function freeReads(file: ts.SourceFile): (node: ts.Identifier) => boolean {
  const options: ts.CompilerOptions = {noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.Latest};
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (name) => (name === file.fileName ? file : undefined);
  const checker = ts.createProgram([file.fileName], options, host).getTypeChecker();
  return (node) => {
    const parent = node.parent;
    // A shorthand property's name is the property's own declaration; the value it reads is the name's symbol (GM33h).
    const symbol = ts.isShorthandPropertyAssignment(parent) && parent.name === node ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(node);
    return (symbol?.declarations ?? []).every((declaration) => declaration.getSourceFile() !== file);
  };
}
/** A class's extends clause: TypeScript parses it as a type node, but the class evaluates it (wb-52th GM33f). */
const extendsValue = (node: ts.Node): boolean =>
  ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && ts.isClassLike(node.parent.parent);
function reachOf(source: string): Reach {
  const file = ts.createSourceFile('reader.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const free = freeReads(file);
  const used = new Set<string>();
  const reach = {dynamicImports: 0, constructorReads: 0, computedKeys: 0};
  const visit = (node: ts.Node): void => {
    if ((ts.isTypeNode(node) && !extendsValue(node)) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return;
    if (ts.isIdentifier(node) && !declaresName(node) && !keysMember(node) && free(node)) used.add(node.text);
    if ((ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) || ts.isMetaProperty(node) || ts.isExternalModuleReference(node)) reach.dynamicImports += 1;
    if ((ts.isIdentifier(node) || ts.isStringLiteralLike(node)) && node.text === 'constructor') reach.constructorReads += 1;
    if (ts.isElementAccessExpression(node)) {
      const key = node.argumentExpression;
      if (!ts.isStringLiteralLike(key) && !ts.isNumericLiteral(key) && !ts.isIdentifier(key)) reach.computedKeys += 1;
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return {globals: [...used].sort(), ...reach};
}
/** The reach a code text has beyond the allowed built-ins, one entry per kind. */
function reachViolations(reach: Reach): string[] {
  return [
    ...reach.globals.filter((name) => !ALLOWED_GLOBALS.includes(name)).map((name) => `global ${name}`),
    ...(reach.dynamicImports > 0 ? [`import() x${reach.dynamicImports}`] : []),
    ...(reach.constructorReads > 0 ? [`constructor read x${reach.constructorReads}`] : []),
    ...(reach.computedKeys > 0 ? [`computed key x${reach.computedKeys}`] : []),
  ];
}
/** A plant as a module of its own (an exported function holding the code), so each control judges the scan alone. */
const planted = (code: string): string => `export async function plantedReach(): Promise<void> {\n${code}}\n`;
interface ReachPlant {
  id: string;
  code: string;
  reads: string;
  /** The code is a whole module (a declaration only the top level admits), never wrapped. */
  module?: true;
}
const plantText = (plant: ReachPlant): string => (plant.module === true ? plant.code : planted(plant.code));
/** The gate's GM33 (wb-4nut.5 cut #1, landing-381 F17) and the class members this cut found, each with the reach it must read;
 * GM34 is the gate's control the text bans already killed. Every plant discards its result: the scan reads reach, not use. */
const REACH_PLANTS: readonly ReachPlant[] = [
  {
    id: 'GM33',
    code: "  try {\n    const host = (globalThis as {process?: {getBuiltinModule?: (id: string) => Record<string, (path: string) => unknown> | undefined}}).process;\n    host?.getBuiltinModule?.(['f', 's'].join(''))?.[['read', 'File', 'Sync'].join('')]?.('package.json');\n  } catch {}\n",
    reads: 'global globalThis, computed key x1',
  },
  {id: 'GM33b', code: '  void (globalThis as {process?: {env?: Record<string, string | undefined>}}).process?.env?.HOME;\n', reads: 'global globalThis'},
  {id: 'GM33c', code: "  try {\n    void new Function(['return ', 'glob', 'alThis'].join(''))();\n  } catch {}\n", reads: 'global Function'},
  {id: 'GM33d', code: "  try {\n    void ([] as unknown as {constructor: {constructor: (code: string) => () => unknown}}).constructor.constructor('return this')();\n  } catch {}\n", reads: 'constructor read x2'},
  {id: 'GM33e', code: "  await import(['node', 'fs'].join(':')).catch(() => undefined);\n", reads: 'import() x1'},
  // wb-52th (F2): the landing gate's three plants, the shadow alone (a quiet control: a parameter is no read), the class member
  // this cut found, the import-require declaration the binder binds and a shorthand property, which reads its name.
  {
    id: 'L2-M33p',
    code: "  try {\n    void (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(() => 0), 'constructor')?.value as ((code: string) => () => unknown) | undefined)?.('return this')();\n  } catch {}\n",
    reads: 'constructor read x1',
  },
  {id: 'L2-M33d2', code: "  try {\n    const {constructor: door} = Object.getPrototypeOf(() => 0) as {constructor: (code: string) => () => unknown};\n    void door('return this')();\n  } catch {}\n", reads: 'constructor read x1'},
  {id: 'L2-M33sh', code: '  const shadow = (globalThis: {process?: unknown}): unknown => globalThis.process;\n  void shadow({});\n  void (globalThis as {process?: {env?: unknown}}).process?.env;\n', reads: 'global globalThis'},
  {id: 'L2-M33sh-quiet', code: '  const shadow = (globalThis: {process?: unknown}): unknown => globalThis.process;\n  void shadow({});\n', reads: ''},
  {id: 'GM33f', code: "  try {\n    class Door extends Function {}\n    void new Door('return this')();\n  } catch {}\n", reads: 'global Function'},
  {id: 'GM33g', code: "import door = require('node:os');\nexport const home = (): unknown => door;\n", reads: 'import() x1', module: true},
  {id: 'GM33h', code: '  void {globalThis};\n', reads: 'global globalThis'},
  {id: 'GM34', code: "  await import('node:fs').catch(() => undefined);\n", reads: 'import() x1'},
];
/** The bead whose filing names the L2 reach plants (wb-k888's landing-498 R694 follow-up). */
const FOLLOW_UP = 'wb-52th';
/** The L2 reach plants the follow-up's filing names: the L2-M33 ids of the first F2 bullet in its notes in the tracked export. */
function filedReachPlants(): string[] {
  const bullet = /^\[rides\] - F2 (.*)$/m.exec(notesOf(FOLLOW_UP))?.[1] ?? '';
  return [...new Set(bullet.match(/(?<![\w-])L2-M33\w*(?![\w-])/g) ?? [])];
}
/** R2's quiet row: a member read keyed by a name bound to a composed string reads no reach (R-REFLECTIVE-REACH). */
const REFLECTIVE_DOOR = "  try {\n    const door = ['constr', 'uctor'].join('');\n    void (Object as unknown as Record<string, (code: string) => () => unknown>)[door]('return this')();\n  } catch {}\n";
/** R2's second door (wb-52th F2): the same composed name handed to a descriptor read, now that a 'constructor' string is a read. */
const DESCRIPTOR_DOOR =
  "  try {\n    const door = ['constr', 'uctor'].join('');\n    void (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(() => 0), door)?.value as ((code: string) => () => unknown) | undefined)?.('return this')();\n  } catch {}\n";

// ---------------------------------------------------------------------------------------------------------------------------
// The judged set: rows A-D quote the bead's acceptance; every pin covers one of its sub-clauses and is registered exactly once.

interface Pin {
  id: string;
  covers: string;
}
interface Row {
  id: string;
  label: string;
  pins: readonly Pin[];
}
/** The bead's acceptance sub-clauses, verbatim: each row label joins its own and each pin covers one. */
const AC_OPEN = 'one open `related` premise leaves the child not ready';
const AC_CLOSED = 'a closed premise';
const AC_LANDED = 'a ruling bead with landed text marks it ready';
const AC_GATE = 'a child whose gate carries no ADOPT text is never ready';
const AC_SNAPSHOT = 'over the pinned snapshot (L19-L29, L56) the ready set equals exactly {rftsx-auqdi, rftsx-rupqh}';
const AC_EDGES = '`bd dep list rftsx-bhmrd` shows related/parent-child edges only';
const AC_BLOCKS = 'a blocks edge between H2 beads is refused';
const AC_UNREACHABLE = "with the store unreachable Pi reports 'unknown (store unreachable)', never the snapshot's 'open'";
/** Row R (wb-k888): the named residuals, each one pin covering its own name, each named in this file's header with its row. */
const R_SHARED = 'R-SHARED-SUBCLAUSE';
const R_REFLECTIVE = 'R-REFLECTIVE-REACH';
const R_ECHO = 'R-WITNESS-ECHO';
const RESIDUALS_LABEL = 'the named residuals R1-R3 stay pinned quiet';
const ROWS: readonly Row[] = [
  {
    id: 'A',
    label: `${AC_OPEN}; ${AC_CLOSED} or ${AC_LANDED}; ${AC_GATE}`,
    pins: [
      {id: 'A1', covers: AC_OPEN},
      {id: 'A2', covers: AC_CLOSED},
      {id: 'A3', covers: AC_LANDED},
      {id: 'A4', covers: AC_LANDED},
      {id: 'A5', covers: AC_GATE},
      {id: 'A6', covers: AC_GATE},
    ],
  },
  {
    id: 'B',
    label: AC_SNAPSHOT,
    pins: [
      {id: 'B1', covers: AC_SNAPSHOT},
      {id: 'B2', covers: AC_SNAPSHOT},
      {id: 'B3', covers: AC_SNAPSHOT},
      {id: 'B4', covers: AC_SNAPSHOT},
      {id: 'B5', covers: AC_SNAPSHOT},
    ],
  },
  {
    id: 'C',
    label: `${AC_EDGES} and ${AC_BLOCKS}`,
    pins: [
      {id: 'C1', covers: AC_EDGES},
      {id: 'C2', covers: AC_BLOCKS},
      {id: 'C3', covers: AC_EDGES},
    ],
  },
  {
    id: 'D',
    label: AC_UNREACHABLE,
    pins: [
      {id: 'D1', covers: AC_UNREACHABLE},
      {id: 'D2', covers: AC_UNREACHABLE},
      {id: 'D3', covers: AC_UNREACHABLE},
    ],
  },
  {
    id: 'R',
    label: RESIDUALS_LABEL,
    pins: [
      {id: 'R1', covers: R_SHARED},
      {id: 'R2', covers: R_REFLECTIVE},
      {id: 'R3', covers: R_ECHO},
    ],
  },
];
/** The judged rows that quote the bead's acceptance (a)-(d); row R holds the named residuals. */
const acceptanceRows = (): readonly Row[] => ROWS.filter((row) => row.id !== 'R');
const REGISTERED = new Map<string, string>();
/** The pins whose body reached its witness compare, in run order; the closing case holds every pin to it. */
const REACHED: string[] = [];
/** What each pin's witness compare held (wb-k888): row B's closing case holds these to the pinned maps' ready lines. */
const WITNESSED = new Map<string, {actual: unknown; expected: unknown}>();
function witness(id: string, actual: unknown, expected: unknown): void {
  expect(actual).toEqual(expected);
  REACHED.push(id);
  WITNESSED.set(id, {actual, expected});
}
function pin(id: string, title: string, body: () => Promise<void> | void): void {
  if (REGISTERED.has(id)) throw new Error(`pin ${id} registered twice`);
  REGISTERED.set(id, title);
  it(`${id}: ${title}`, async () => {
    running = id;
    try {
      await body();
    } finally {
      running = undefined;
    }
  });
}
/** A pin's witness held `ids` exactly as the reader read them during that pin (wb-k888): the witnessed actual and expected both
 * equal the sorted set, and one of the pin's own readings read it. A body that only reaches its witness holds nothing. */
function heldTo(id: string, ids: readonly string[], witnessed: ReadonlyMap<string, {actual: unknown; expected: unknown}> = WITNESSED, readings: ReadonlyMap<string, string[][]> = READINGS): boolean {
  const want = JSON.stringify(sorted(ids));
  const seen = witnessed.get(id);
  return seen !== undefined && JSON.stringify(seen.actual) === want && JSON.stringify(seen.expected) === want && (readings.get(id) ?? []).some((ready) => JSON.stringify(ready) === want);
}
/** Row B's map hold: the B pins whose registered title names a pinned map's epic, and the B pins holding the maps' union. */
const mapNamed = (map: ProgramMap): string[] => [...REGISTERED].filter(([id, title]) => id.startsWith('B') && title.includes(map.epic)).map(([id]) => id);
const unionHolders = (): string[] => [...REGISTERED.keys()].filter((id) => id.startsWith('B') && heldTo(id, MAPS.flatMap((map) => map.ready.ids)));
const notesRead = new Map<string, string>();
/** A bead's notes as the tracked export carries them, read once per bead: only the lines naming the bead are parsed. */
function notesOf(bead: string): string {
  const cached = notesRead.get(bead);
  if (cached !== undefined) return cached;
  const text = readFileSync(join(REPO, '.beads', 'issues.jsonl'), 'utf8');
  const key = `"id":"${bead}"`;
  for (let at = text.indexOf(key); at !== -1; at = text.indexOf(key, at + key.length)) {
    const end = text.indexOf('\n', at);
    const issue = JSON.parse(text.slice(text.lastIndexOf('\n', at) + 1, end === -1 ? undefined : end)) as {id?: unknown; notes?: unknown};
    if (issue.id === bead && typeof issue.notes === 'string') {
      notesRead.set(bead, issue.notes);
      return issue.notes;
    }
  }
  throw new Error(`.beads/issues.jsonl carries no notes for ${bead}`);
}
/** The owner filing: the notes through the merged-duplicates paragraph. Notes appended later (deliveries, gate verdicts) are
 * never an anchor, so a later note naming another bead cannot move the judged set. */
function ownerFiling(): string {
  const notes = notesOf(BEAD);
  const merged = notes.indexOf('Cross-program duplicates merged here');
  if (merged === -1) throw new Error(`${BEAD} notes carry no merged-duplicates paragraph`);
  const end = notes.indexOf('\n\n', merged);
  return notes.slice(0, end === -1 ? notes.length : end);
}
function acceptanceClauses(): string[] {
  const match = /Acceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?); \(d\) (.+?)\.\n/.exec(ownerFiling());
  if (!match) throw new Error(`${BEAD} notes carry no (a)-(d) acceptance`);
  return match.slice(1, 5).map((clause) => clause ?? '');
}
const subClauses = (clause: string): string[] => clause.split(/; | (?:and|or) (?=a )/);

describe('wb-4nut.5 program dispatch readiness over the shared bead store (TSX-HARNESS2-REACTIVE-EVOLUTION-R5)', () => {
  it('the judged set: frozen shape, the bead acceptance text, the registered pins and the pinned maps agree', () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(['A:6', 'B:5', 'C:3', 'D:3', 'R:3']);
    const clauses = acceptanceClauses();
    expect(acceptanceRows().map((row) => row.label)).toEqual(clauses);
    for (const [index, row] of acceptanceRows().entries()) {
      expect(sorted([...new Set(row.pins.map((entry) => entry.covers))])).toEqual(sorted(subClauses(clauses[index] ?? '')));
      for (const entry of row.pins) expect(entry.id.startsWith(row.id)).toBe(true);
    }
    // Row R: one pin per named residual, covering its own name, each named with its pin in this file's header comment.
    const residuals = ROWS.find((row) => row.id === 'R');
    expect([residuals?.label, residuals?.pins.map((entry) => `${entry.id} ${entry.covers}`)]).toEqual([RESIDUALS_LABEL, [`R1 ${R_SHARED}`, `R2 ${R_REFLECTIVE}`, `R3 ${R_ECHO}`]]);
    const header = readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0] ?? '';
    expect((residuals?.pins ?? []).filter((entry) => !header.includes(`${entry.id} ${entry.covers}`))).toEqual([]);
    expect(sorted([...REGISTERED.keys()])).toEqual(sorted(ROWS.flatMap((row) => row.pins.map((entry) => entry.id))));
    expect(FIXTURE.commit).toBe(PIN);
    expect(FIXTURE.snapshots.map((file) => [file.path, gitBlob(file.text)])).toEqual(Object.entries(BLOBS));
    expect(FIXTURE.snapshots.map((file) => file.blob)).toEqual(Object.values(BLOBS));
    // Each inflated map is exactly the byte length the fixture records beside its blob id.
    expect(STORED.snapshots.map((file) => file.bytes)).toEqual(FIXTURE.snapshots.map((file) => Buffer.byteLength(file.text, 'utf8')));
    expect(STORED.snapshots.map((file) => file.bytes)).toEqual([11514, 17124, 15565]);
    // Each pinned map is judged by exactly one B pin naming its epic, and the owner filing names every one of those epics.
    expect(MAPS.map((map) => map.epic)).toEqual(['rftsx-bhmrd', 'rftsx-sbyih', 'rftsx-fin7f']);
    const filing = ownerFiling();
    for (const map of MAPS) {
      expect(filing).toContain(map.epic);
      expect([...REGISTERED].filter(([id, title]) => id.startsWith('B') && title.includes(map.epic)).map(([id]) => id)).toHaveLength(1);
    }
    // And the other way: every rftsx bead the owner filing names is a row of one of the pinned maps.
    const named = [...new Set(filing.match(/rftsx-[a-z0-9]{5}(?:\.\d+)?/g) ?? [])];
    expect(named.length).toBeGreaterThan(0);
    const mapped = new Set(MAPS.flatMap((map) => map.rows.map((row) => row.id)));
    expect(named.filter((id) => !mapped.has(id))).toEqual([]);
    // The gate forms: frozen shape, and each verdict word the H2 epic row rules over has its own one-line control, reading itself
    // when it is a marker word (wb-4nut.4's filing: 'ruled ADOPT'/'ruled REJECT') and no-verdict otherwise (DEFER).
    expect(GATE_FORMS.map((form) => `${form.id}:${form.verdict}`)).toEqual([
      'G01:no-verdict',
      'G02:ADOPT',
      'G03:no-verdict',
      'G04:REJECT',
      'G05:no-verdict',
      'G06:no-verdict',
      'G07:no-verdict',
      'G08:ADOPT',
      'G09:no-verdict',
      'G10:no-verdict',
      'G11:ADOPT',
      'G12:ADOPT',
      'G13:ADOPT',
      'G14:ADOPT',
      'G15:no-verdict',
      'G16:no-verdict',
      'G17:no-verdict',
      'G18:ADOPT',
      'G19:no-verdict',
      'G20:no-verdict',
      'G21:no-verdict',
      'G22:no-verdict',
      'G23:no-verdict',
    ]);
    const epicRow = H2.rows.find((row) => row.id === H2.epic);
    const vocabulary = /ruled \(([A-Z/]+)\)/.exec(snapshot('harness2-reactive-evolution-2026-10-20').text.split('\n')[(epicRow?.line ?? 0) - 1] ?? '')?.[1]?.split('/');
    expect(vocabulary).toEqual(['ADOPT', 'DEFER', 'REJECT']);
    const markerWords = /exactly one of 'ruled ([A-Z]+)'\/'ruled ([A-Z]+)' in the bead's text/.exec(notesOf('wb-4nut.4'))?.slice(1, 3);
    expect(markerWords).toEqual(['ADOPT', 'REJECT']);
    const blank: ModelBead = {id: 'rftsx-blank', title: 'blank gate', status: 'closed', issueType: 'decision', priority: 2, labels: [], related: [], blocks: []};
    for (const word of vocabulary ?? []) {
      const controls = GATE_FORMS.filter((form) => JSON.stringify(form.apply(blank)) === JSON.stringify({notes: `ruled ${word}`}));
      expect(controls.map((form) => form.verdict)).toEqual([markerWords?.includes(word) ? word : 'no-verdict']);
    }
    // The gated packets A5 judges every form over, by map: H2's TSX-H2-01 and the merged TSX-CA-R5 duplicate's TSX-IO-03b.
    expect(GATED.map((entry) => `${entry.map.epic} ${entry.packet} ${entry.label}`)).toEqual(['rftsx-bhmrd TSX-H2-01 wp:tsx-h2-01', 'rftsx-fin7f TSX-IO-03b wp:TSX-IO-03b']);
  });

  pin('A1', 'one open related premise inside the program leaves the child not ready (the PERF-F M2-M4 children wait on their M1/M2 premises)', async () => {
    const reading = await read(bd(modelStore([PERF])), programOf(PERF));
    const waiting = Object.fromEntries(reading.children.filter((entry) => !entry.ready).map((entry) => [entry.id, entry.waitingOn]));
    witness('A1', waiting, {
      'rftsx-it5ry': ['rftsx-qjxf1', 'rftsx-nwut7'],
      'rftsx-nwut7': ['rftsx-m69sf', 'rftsx-qjxf1'],
      'rftsx-qjxf1': ['rftsx-m69sf'],
      'rftsx-zblcp': ['rftsx-abin9'],
    });
    // One open premise is enough: an H2 child related to the open rftsx-auqdi waits on it and on nothing else.
    const store = modelStore([H2]);
    store.set('rftsx-h2one', {id: 'rftsx-h2one', title: 'H2 child with one premise', status: 'open', issueType: 'task', priority: 3, labels: ['wp:tsx-h2-99'], parent: H2.epic, related: ['rftsx-auqdi'], blocks: []});
    const one = child(await read(bd(store), programOf(H2)), 'rftsx-h2one');
    expect(one).toMatchObject({ready: false, waitingOn: ['rftsx-auqdi'], status: 'open'});
  });

  pin('A2', 'a closed premise marks the child ready (closing rftsx-m69sf frees rftsx-qjxf1; closing rftsx-abin9 frees rftsx-zblcp)', async () => {
    const store = edit(edit(modelStore([PERF]), 'rftsx-m69sf', {status: 'closed'}), 'rftsx-abin9', {status: 'closed'});
    const reading = await read(bd(store), programOf(PERF));
    witness('A2', [child(reading, 'rftsx-qjxf1'), child(reading, 'rftsx-zblcp')].map((entry) => [entry.id, entry.ready, entry.waitingOn]), [
      ['rftsx-qjxf1', true, []],
      ['rftsx-zblcp', true, []],
    ]);
    // rftsx-nwut7 still waits on the open rftsx-qjxf1 (an M2 child), and rftsx-it5ry on both open M2/M3 children.
    expect(child(reading, 'rftsx-nwut7')).toMatchObject({ready: false, waitingOn: ['rftsx-qjxf1']});
    expect(child(reading, 'rftsx-it5ry')).toMatchObject({ready: false, waitingOn: ['rftsx-qjxf1', 'rftsx-nwut7']});
  });

  pin('A3', 'a ruling bead with landed text marks the child ready although it is open (rftsx-j83yd on R-04 rftsx-bge18, rftsx-pgob0 on R-01 rftsx-8mhri)', async () => {
    const perf = await read(bd(modelStore([PERF])), programOf(PERF));
    expect(child(perf, 'rftsx-j83yd')).toMatchObject({ready: true, waitingOn: [], status: 'open'});
    const assembly = await read(bd(modelStore([ASSEMBLY])), programOf(ASSEMBLY));
    expect(child(assembly, 'rftsx-pgob0')).toMatchObject({ready: true, waitingOn: []});
    // Without the witness the same open ruling holds each child: the store's status alone never reads as landed text.
    const bare = await read(bd(modelStore([PERF])), programOf(PERF, {landedRecords: []}));
    expect(child(bare, 'rftsx-j83yd')).toMatchObject({ready: false, waitingOn: ['rftsx-bge18']});
    const bareAssembly = await read(bd(modelStore([ASSEMBLY])), programOf(ASSEMBLY, {landedRecords: []}));
    expect(child(bareAssembly, 'rftsx-pgob0')).toMatchObject({ready: false, waitingOn: ['rftsx-8mhri']});
    witness('A3', [perf, assembly, bare, bareAssembly].map((reading) => reading.ready.includes('rftsx-j83yd') || reading.ready.includes('rftsx-pgob0')), [true, true, false, false]);
  });

  pin('A4', 'no design doc is implementation: a landed witness never satisfies a premise the store does not type decision', async () => {
    // rftsx-m69sf (a task) and rftsx-pgob0 (an ADR work package the store types task) stay premises until they close.
    const perf = await read(bd(modelStore([PERF])), programOf(PERF, {landedRecords: [...landedRulings(PERF), 'rftsx-m69sf', 'rftsx-abin9']}));
    expect(child(perf, 'rftsx-qjxf1')).toMatchObject({ready: false, waitingOn: ['rftsx-m69sf']});
    expect(child(perf, 'rftsx-zblcp')).toMatchObject({ready: false, waitingOn: ['rftsx-abin9']});
    const assembly = await read(bd(modelStore([ASSEMBLY])), programOf(ASSEMBLY, {landedRecords: [...landedRulings(ASSEMBLY), 'rftsx-pgob0']}));
    for (const id of ['rftsx-d46cz', 'rftsx-2w3pj', 'rftsx-o78c7']) expect(child(assembly, id)).toMatchObject({ready: false, waitingOn: ['rftsx-pgob0']});
    witness('A4', [...perf.ready, ...assembly.ready].filter((id) => ['rftsx-qjxf1', 'rftsx-zblcp', 'rftsx-d46cz', 'rftsx-2w3pj', 'rftsx-o78c7'].includes(id)), []);
  });

  pin('A5', "a gated child is ready only when its gate bead's title, description and notes carry exactly one ruling marker and it is ruled ADOPT (rftsx-rupqh for TSX-H2-01, rftsx-pgob0 for TSX-IO-03b)", async () => {
    const failures: string[] = [];
    let judged = 0;
    for (const {map, packet, label} of GATED) {
      for (const form of GATE_FORMS) {
        const {store, gate} = gatedStore(map, packet, label, form);
        const reading = await read(bd(store), programOf(map, {gates: {[packet]: gate}}));
        const entry = child(reading, packet);
        judged += 1;
        const want = {ready: form.verdict === 'ADOPT', gate: {id: gate, verdict: form.verdict}};
        if (entry.ready !== want.ready || JSON.stringify(entry.gate) !== JSON.stringify(want.gate)) failures.push(`${map.epic} ${packet} ${form.id} (${form.why}): ${JSON.stringify({ready: entry.ready, gate: entry.gate})}`);
        if (reading.ready.includes(packet) !== want.ready) failures.push(`${map.epic} ${packet} ${form.id}: ready set disagrees`);
      }
    }
    witness('A5', {judged, failures}, {judged: 46, failures: []});
  });

  pin('A6', 'a gate the store cannot return reads unknown (store unreachable) and its child is never ready', async () => {
    const {store, gate} = gatedStore(H2, 'TSX-H2-01', 'wp:tsx-h2-01', GATE_FORMS[1] as GateForm);
    const gateFaults = ['throw', missing(), {exit: 0, stdout: 'not json', stderr: ''}] as const;
    expect(gateFaults).toHaveLength(3);
    for (const fault of gateFaults) {
      const reading = await read(bd(store, {show: new Map([[gate, fault]])}), programOf(H2, {gates: {'TSX-H2-01': gate}}));
      expect(child(reading, 'TSX-H2-01')).toMatchObject({ready: false, gate: {id: gate, verdict: STORE_UNREACHABLE}});
      expect(reading.ready).not.toContain('TSX-H2-01');
    }
    // A gate naming a child the store does not list gates nothing and reads nothing.
    const client = bd(modelStore([H2]));
    const reading = await read(client, programOf(H2, {gates: {'TSX-H2-02': 'rftsx-rupqh'}}));
    expect(sorted(reading.ready)).toEqual(sorted(H2.ready.ids));
    witness('A6', client.seen.filter((call) => call.id === 'rftsx-rupqh' && call.verb === 'show'), [{verb: 'show', id: 'rftsx-rupqh', cwd: SCOPE.workspace, timeoutMs: 5000}]);
  });

  pin('B1', 'the H2 map (epic rftsx-bhmrd, L19-L29) reads exactly its L56 ready set {rftsx-auqdi, rftsx-rupqh}', async () => {
    expect(H2.ready).toEqual({line: 56, ids: ['rftsx-auqdi', 'rftsx-rupqh']});
    expect(H2.rows.map((row) => `${row.line}:${row.id}`)).toEqual(['19:rftsx-bhmrd', '20:rftsx-7sy4c', '21:rftsx-8er6b', '22:rftsx-e9a5e', '28:rftsx-auqdi', '29:rftsx-rupqh']);
    const reading = await read(bd(modelStore([H2])), programOf(H2));
    expect(reading.store).toBe('read');
    witness('B1', sorted(reading.ready), sorted(H2.ready.ids));
    expect(sorted(reading.children.map((entry) => entry.id))).toEqual(sorted(H2.ready.ids));
    // The children's only premises (TSX-EVID-PIN, TSX-ADAPT-ADR) sit outside this program, so nothing holds them.
    for (const entry of reading.children) expect(entry).toMatchObject({status: 'open', waitingOn: [], partial: false});
    // With no ruling witnessed the set is the same: no H2 child relates to an H2 ruling.
    const bare = await read(bd(modelStore([H2])), programOf(H2, {landedRecords: []}));
    expect(sorted(bare.ready)).toEqual(sorted(H2.ready.ids));
  });

  pin('B2', 'the PERF-F map (epic rftsx-sbyih, snapshot written 2026-10-21T11:10:38Z) reads exactly its L82 ready set', async () => {
    expect(snapshot('resource-efficiency-frontier-2026-10-17').text).toContain('this file is a reader snapshot written 2026-10-21T11:10:38Z');
    expect(PERF.ready.line).toBe(82);
    expect(PERF.ready.ids).toHaveLength(6);
    const reading = await read(bd(modelStore([PERF])), programOf(PERF));
    witness('B2', sorted(reading.ready), sorted(PERF.ready.ids));
    expect(reading.children.map((entry) => entry.id)).toHaveLength(10);
  });

  pin('B3', 'the component-assembly map (epic rftsx-fin7f, gate rftsx-pgob0 for TSX-IO-03b) reads exactly its L79 ready set', async () => {
    expect(ASSEMBLY.ready.line).toBe(79);
    expect(ASSEMBLY.gated).toEqual([{line: 73, key: 'TSX-IO-03b', gates: ['rftsx-pgob0']}]);
    const reading = await read(bd(modelStore([ASSEMBLY])), programOf(ASSEMBLY));
    witness('B3', sorted(reading.ready), sorted(ASSEMBLY.ready.ids));
    expect(reading.children.map((entry) => entry.id)).toHaveLength(8);
  });

  pin('B4', 'the three program epics read together give exactly the union of the three ready lines, each child once', async () => {
    const program: BeadsProgram = {epics: MAPS.map((map) => map.epic), landedRecords: MAPS.flatMap(landedRulings)};
    const reading = await read(bd(modelStore(MAPS)), program);
    witness('B4', sorted(reading.ready), sorted(MAPS.flatMap((map) => map.ready.ids)));
    const ids = reading.children.map((entry) => entry.id);
    expect(ids).toHaveLength(new Set(ids).size);
    expect(ids).toHaveLength(2 + 10 + 8);
  });

  pin('B5', 'children are the parent-child work packages (wp: label) of an epic: ruling rows, related records and the adopted beads never dispatch', async () => {
    const store = modelStore([H2]);
    // rftsx-e9a5e is a ruling row under the epic (no "no parent" note) with no premise: it is a record, never a child.
    expect(store.get('rftsx-e9a5e')).toMatchObject({parent: 'rftsx-bhmrd', issueType: 'decision', related: []});
    // A wp-labelled bead wired to the epic by a related edge only is not a child either.
    store.set('rftsx-wired', {id: 'rftsx-wired', title: 'related work package', status: 'open', issueType: 'task', priority: 2, labels: ['wp:tsx-h2-98'], related: ['rftsx-bhmrd'], blocks: []});
    const reading = await read(bd(store), programOf(H2));
    witness('B5', sorted(reading.children.map((entry) => entry.id)), sorted(H2.ready.ids));
    for (const id of ['rftsx-bhmrd', 'rftsx-7sy4c', 'rftsx-8er6b', 'rftsx-e9a5e', 'rftsx-wired', 'rftsx-9ofwd', 'rftsx-koy9c.4']) expect(reading.ready).not.toContain(id);
  });

  pin('C1', 'the modeled bd dep list rftsx-bhmrd carries related and parent-child edges only, as each map states, and reads unrefused', async () => {
    for (const map of MAPS) expect(map.premiseSentence).toBe(true);
    const store = modelStore([H2]);
    const client = bd(store);
    const down = JSON.parse((await client.show('rftsx-bhmrd', {cwd: SCOPE.workspace, timeoutMs: 5000})).stdout) as {dependencies: {dependency_type: string}[]}[];
    const up = JSON.parse((await client.dependents('rftsx-bhmrd', {cwd: SCOPE.workspace, timeoutMs: 5000})).stdout) as {id: string; dependency_type: string}[];
    witness('C1', sorted([...new Set([...(down[0]?.dependencies ?? []).map((entry) => entry.dependency_type), ...up.map((entry) => entry.dependency_type)])]), ['parent-child', 'related']);
    expect(sorted(up.map((entry) => `${entry.dependency_type} ${entry.id}`))).toEqual(['parent-child rftsx-auqdi', 'parent-child rftsx-e9a5e', 'parent-child rftsx-rupqh', 'related rftsx-7sy4c', 'related rftsx-8er6b']);
    expect(await category(read(bd(store), programOf(H2)))).toBe('resolved');
  });

  pin('C2', 'a blocks edge between two program beads is refused, in a child and in an epic member list, never read as a premise', async () => {
    const inChild = edit(modelStore([H2]), 'rftsx-rupqh', {blocks: ['rftsx-auqdi']});
    expect(await category(read(bd(inChild), programOf(H2)))).toBe('validation');
    const toRuling = edit(modelStore([PERF]), 'rftsx-j83yd', {blocks: ['rftsx-bge18']});
    expect(await category(read(bd(toRuling), programOf(PERF)))).toBe('validation');
    const onEpic = edit(modelStore([H2]), 'rftsx-7sy4c', {blocks: ['rftsx-bhmrd']});
    expect(await category(read(bd(onEpic), programOf(H2)))).toBe('validation');
    // The same program bead as an open related premise AND a blocker: the premise wait never hides the refusal.
    const alsoPremise = edit(modelStore([PERF]), 'rftsx-qjxf1', {blocks: ['rftsx-m69sf']});
    witness('C2', await category(read(bd(alsoPremise), programOf(PERF))), 'validation');
  });

  pin('C3', 'a related edge is never promoted to a blocker: outside related premises never hold a child; an outside blocks edge holds it only while open', async () => {
    // rftsx-rupqh relates to the open adopted rftsx-9ofwd (outside the program): still ready, nothing to wait on.
    const related = edit(modelStore([H2]), 'rftsx-rupqh', {related: ['TSX-ADAPT-ADR', 'rftsx-9ofwd']});
    expect(child(await read(bd(related), programOf(H2)), 'rftsx-rupqh')).toMatchObject({ready: true, waitingOn: []});
    // A blocks edge to a bead outside the program is not between program beads: no refusal, the child waits while it is open.
    const outside = edit(modelStore([H2]), 'rftsx-rupqh', {blocks: ['rftsx-9ofwd']});
    expect(child(await read(bd(outside), programOf(H2)), 'rftsx-rupqh')).toMatchObject({ready: false, waitingOn: ['rftsx-9ofwd']});
    const closed = edit(edit(modelStore([H2]), 'rftsx-rupqh', {blocks: ['rftsx-9ofwd']}), 'rftsx-9ofwd', {status: 'closed'});
    const freed = child(await read(bd(closed), programOf(H2)), 'rftsx-rupqh');
    witness('C3', [freed.ready, freed.waitingOn], [true, []]);
  });

  pin('D1', "an unreachable store (bd exits nonzero, cannot run, prints no JSON, lacks the epic) reads 'unknown (store unreachable)' with nothing listed or ready", async () => {
    expect(STORE_UNREACHABLE).toBe('unknown (store unreachable)');
    const store = modelStore([H2]);
    const faults: Fault[] = [{exit: 1, stdout: '', stderr: 'no beads database found'}, 'throw', {exit: 0, stdout: 'not json', stderr: ''}, {exit: 0, stdout: '{"error":"x"}', stderr: ''}];
    for (const fault of faults) {
      const reading = await read(bd(store, {dependents: fault}), programOf(H2));
      expect(reading).toEqual({store: STORE_UNREACHABLE, ready: [], children: []});
      expect(JSON.stringify(reading)).not.toContain('open');
      expect(JSON.stringify(reading)).not.toContain('secret');
    }
    const absent = await read(bd(store), {epics: ['rftsx-sbyih']});
    witness('D1', {faults: faults.length, absent}, {faults: 4, absent: {store: STORE_UNREACHABLE, ready: [], children: []}});
  });

  pin('D2', "a child the store cannot return reads 'unknown (store unreachable)', is never ready, and never borrows the snapshot's 'open'", async () => {
    const store = modelStore([H2]);
    const reading = await read(bd(store, {show: new Map<string, Fault>([['rftsx-auqdi', {exit: 1, stdout: '', stderr: 'database is locked'}]])}), programOf(H2));
    witness('D2', child(reading, 'rftsx-auqdi'), {id: 'rftsx-auqdi', status: STORE_UNREACHABLE, ready: false, waitingOn: [], partial: false});
    expect(reading.ready).toEqual(['rftsx-rupqh']);
    const thrown = await read(bd(store, {show: new Map<string, Fault>([['rftsx-rupqh', 'throw']])}), programOf(H2));
    expect(child(thrown, 'rftsx-rupqh')).toMatchObject({status: STORE_UNREACHABLE, ready: false});
    expect(JSON.stringify(thrown)).not.toContain('secret');
  });

  pin('D3', 'the reader never reads a snapshot: no file system or process import, no map path, only its two bd seams', async () => {
    // Comments may cite the maps and the verbs the reader refuses; the scan judges the code only.
    const source = readFileSync(MODULE, 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    const specifiers = [...source.matchAll(/^import .* from '([^']+)';$/gm)].map((match) => match[1]);
    // wb-k888 (F17): nor is a builtin reached without an import. The AST reach scan holds the code's free names to the language
    // built-ins it names today, with no import(), no constructor read and no computed member key ...
    const code = readFileSync(MODULE, 'utf8');
    expect(reachOf(code)).toEqual({globals: [...ALLOWED_GLOBALS], dynamicImports: 0, constructorReads: 0, computedKeys: 0});
    // ... and each GM33-class plant reads as the reach it has: the scan's kill controls.
    expect(REACH_PLANTS.map((plant) => `${plant.id}: ${reachViolations(reachOf(plantText(plant))).join(', ')}`)).toEqual(REACH_PLANTS.map((plant) => `${plant.id}: ${plant.reads}`));
    // wb-52th (F2): the plant table's frozen shape, and every L2 reach plant the follow-up's filing names is one of its rows.
    expect(REACH_PLANTS.map((plant) => plant.id)).toEqual(['GM33', 'GM33b', 'GM33c', 'GM33d', 'GM33e', 'L2-M33p', 'L2-M33d2', 'L2-M33sh', 'L2-M33sh-quiet', 'GM33f', 'GM33g', 'GM33h', 'GM34']);
    const filed = filedReachPlants();
    expect(filed, `the L2 reach plants ${FOLLOW_UP}'s filing names`).toEqual(['L2-M33p', 'L2-M33d2', 'L2-M33sh']);
    expect(filed.filter((id) => !REACH_PLANTS.some((plant) => plant.id === id))).toEqual([]);
    // No Beads reader is imported in any form: the work reader arrives injected (the wb-kku9.3 claim re-check census contract).
    witness('D3', specifiers, ['./capability-registry.js', './observation.js']);
    for (const banned of [/node:/, /readFile|readdir|existsSync/, /BEADS-|\.md\b/, /child_process|spawn|exec\(/, /\bbd ready\b/]) expect(source).not.toMatch(banned);
    // The seams the reader drives: dependents once per epic, show once per child; no other call.
    const client = bd(modelStore([H2]));
    await read(client, programOf(H2));
    expect(client.seen.map((call) => `${call.verb} ${call.id} ${call.cwd} ${call.timeoutMs}`)).toEqual([
      `dependents rftsx-bhmrd ${SCOPE.workspace} 5000`,
      `show rftsx-auqdi ${SCOPE.workspace} 5000`,
      `show rftsx-rupqh ${SCOPE.workspace} 5000`,
    ]);
  });

  pin('R1', `${R_SHARED}: a pin that shares its acceptance sub-clause with another pin and holds no pinned map or their union leaves every structural hold green when it is gone; the quiet set is derived from the acceptance text`, () => {
    const clauses = acceptanceClauses();
    const stillHolds = (gone: string): boolean =>
      acceptanceRows().every((row, index) => JSON.stringify(sorted([...new Set(row.pins.filter((entry) => entry.id !== gone).map((entry) => entry.covers))])) === JSON.stringify(sorted(subClauses(clauses[index] ?? '')))) &&
      MAPS.every((map) => mapNamed(map).some((id) => id !== gone)) &&
      unionHolders().some((id) => id !== gone);
    witness('R1', acceptanceRows().flatMap((row) => row.pins.map((entry) => entry.id)).filter(stillHolds), ['A3', 'A4', 'A5', 'A6', 'B5', 'C1', 'C3', 'D1', 'D2', 'D3']);
  });

  pin('R2', `${R_REFLECTIVE}: a member or descriptor read keyed by a name bound to a composed string reaches past the reach scan; each door, planted, reads no reach`, () => {
    witness(
      'R2',
      [REFLECTIVE_DOOR, DESCRIPTOR_DOOR].map((door) => reachViolations(reachOf(planted(door)))),
      [[], []],
    );
  });

  pin('R3', `${R_ECHO}: outside row B's map hold no pin's witnessed value has an anchor outside this file, so a body swapped for a case that still reaches its witness stays green; the unheld pins are derived from the hold`, () => {
    const held = new Set([...MAPS.flatMap(mapNamed), ...unionHolders()]);
    witness('R3', acceptanceRows().flatMap((row) => row.pins.map((entry) => entry.id)).filter((id) => !held.has(id)), ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B5', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3']);
  });

  it('every pin reached its witness compare, once, in roster order', () => {
    expect(REACHED).toEqual(ROWS.flatMap((row) => row.pins.map((entry) => entry.id)));
  });

  it("row B is held to the pinned maps (wb-k888): the B pin naming each map's epic witnessed that map's ready line as the reader read it, and one B pin the maps' union", () => {
    expect(MAPS.map((map) => mapNamed(map).map((id) => `${id} ${heldTo(id, map.ready.ids)}`))).toEqual(MAPS.map((map) => mapNamed(map).map((id) => `${id} true`)));
    expect(MAPS.map((map) => mapNamed(map).length)).toEqual(MAPS.map(() => 1));
    expect(unionHolders()).toHaveLength(1);
    // Negative controls: no B pin holds another map's line, and no pin outside row B holds a ready line it never witnessed.
    expect([heldTo('B1', PERF.ready.ids), heldTo('B2', H2.ready.ids), heldTo('A1', H2.ready.ids)]).toEqual([false, false, false]);
    // ... and a witness the pin's own readings never read holds nothing: B1's compare, with no reading recorded for it.
    expect([heldTo('B1', H2.ready.ids), heldTo('B1', H2.ready.ids, WITNESSED, new Map())]).toEqual([true, false]);
  });
});

describe('wb-4nut.5 reader hygiene', () => {
  it('runs only host-bound: a scope for another workspace is authorization and bd is never called', async () => {
    const client = bd(modelStore([H2]));
    expect(await category(read(client, programOf(H2), {scope: {workspace: '/elsewhere', principal: 'operator'}}))).toBe('authorization');
    expect(await category(read(client, programOf(H2), {scope: {workspace: SCOPE.workspace, principal: ''}}))).toBe('authorization');
    expect(client.seen).toEqual([]);
  });

  it('validates its program: no epic, a non-id epic, gate or landed record, and an invalid budget are validation', async () => {
    const client = bd(modelStore([H2]));
    for (const program of [{epics: []}, {epics: ['not an id']}, {epics: [H2.epic], gates: {'rftsx-auqdi': 'bad id!'}}, {epics: [H2.epic], gates: {'bad id!': 'rftsx-rupqh'}}, {epics: [H2.epic], landedRecords: ['bad id!']}] as BeadsProgram[]) {
      expect(await category(read(client, program))).toBe('validation');
    }
    expect(await category(read(client, programOf(H2), {limits: {...LIMITS, maxDependencies: 0}}))).toBe('validation');
    expect(client.seen).toEqual([]);
  });

  it('an aborted signal is transport, before the first call and between calls', async () => {
    const before = new AbortController();
    before.abort();
    // wb-52th (F3, L2-M27p): aborted before the first call, the read reaches no seam - bd is never called.
    const untouched = bd(modelStore([H2]));
    expect(await category(read(untouched, programOf(H2), {signal: before.signal}))).toBe('transport');
    expect(untouched.seen).toEqual([]);
    const between = new AbortController();
    const store = modelStore([H2]);
    const inner = bd(store);
    const client: BeadsProgramClient = {
      show: inner.show,
      async dependents(id, call) {
        const result = await inner.dependents(id, call);
        between.abort();
        return result;
      },
    };
    expect(await category(read(client, programOf(H2), {signal: between.signal}))).toBe('transport');
  });

  it('a child whose dependencies were cut at the read bound is never ready: an unread premise may be open', async () => {
    const store = edit(modelStore([H2]), 'rftsx-rupqh', {related: ['TSX-ADAPT-ADR', 'rftsx-9ofwd', 'rftsx-flynt']});
    const reading = await read(bd(store), programOf(H2), {limits: {...LIMITS, maxDependencies: 2}});
    expect(child(reading, 'rftsx-rupqh')).toMatchObject({ready: false, partial: true});
    expect(child(reading, 'rftsx-auqdi')).toMatchObject({ready: true, partial: false});
  });

  it('only an open child is taken: a closed, in-progress, blocked or deferred child is not ready', async () => {
    for (const status of ['closed', 'in_progress', 'blocked', 'deferred']) {
      const reading = await read(bd(edit(modelStore([H2]), 'rftsx-auqdi', {status})), programOf(H2));
      expect(child(reading, 'rftsx-auqdi')).toMatchObject({status, ready: false, waitingOn: []});
      expect(reading.ready).toEqual(['rftsx-rupqh']);
    }
  });

  it('a gate whose title, description or notes is present and not a string reads unknown (store unreachable), never an empty text', async () => {
    for (const field of ['title', 'description', 'notes'] as const) {
      const {store, gate} = gatedStore(H2, 'TSX-H2-01', 'wp:tsx-h2-01', GATE_FORMS[1] as GateForm);
      const inner = bd(store);
      const client: BeadsProgramClient = {
        dependents: inner.dependents,
        async show(id, call) {
          const result = await inner.show(id, call);
          if (id !== gate) return result;
          const [issue] = JSON.parse(result.stdout) as Record<string, unknown>[];
          return {...result, stdout: JSON.stringify([{...issue, [field]: 7}])};
        },
      };
      const reading = await read(client, programOf(H2, {gates: {'TSX-H2-01': gate}}));
      expect(child(reading, 'TSX-H2-01')).toMatchObject({ready: false, gate: {id: gate, verdict: STORE_UNREACHABLE}});
    }
  });

  it('a gate show that answers for another work id reads unknown (store unreachable)', async () => {
    const {store, gate} = gatedStore(H2, 'TSX-H2-01', 'wp:tsx-h2-01', GATE_FORMS[1] as GateForm);
    const inner = bd(store);
    const client: BeadsProgramClient = {
      dependents: inner.dependents,
      show: (id, call) => inner.show(id === gate ? 'rftsx-auqdi' : id, call),
    };
    const reading = await read(client, programOf(H2, {gates: {'TSX-H2-01': gate}}));
    expect(child(reading, 'TSX-H2-01')).toMatchObject({ready: false, gate: {id: gate, verdict: STORE_UNREACHABLE}});
  });

  it('reads each child only through the injected work reader: once per child, over the same seam and a host-bound request, and that reading decides', async () => {
    const client = bd(modelStore([H2]));
    const requests: string[] = [];
    const recording: BeadsProgramWorkReader = (seam, request) => {
      requests.push([seam === client, request.workId, request.workspaceRoot, request.scope.workspace, request.limits.timeoutMs, request.now()].join(' '));
      return readBeadsWork(seam, request);
    };
    const reading = await read(client, programOf(H2), {readWork: recording});
    expect(sorted(reading.ready)).toEqual(sorted(H2.ready.ids));
    expect(requests).toEqual(['rftsx-auqdi', 'rftsx-rupqh'].map((id) => ['true', id, SCOPE.workspace, SCOPE.workspace, 5000, NOW()].join(' ')));
    // The injected reading alone decides: a reader that reads rftsx-auqdi in progress leaves it unready.
    const inProgress: BeadsProgramWorkReader = async (seam, request) => {
      const work = await readBeadsWork(seam, request);
      return request.workId === 'rftsx-auqdi' ? {...work, work: {...work.work, status: 'in_progress'}} : work;
    };
    const held = await read(bd(modelStore([H2])), programOf(H2), {readWork: inProgress});
    expect(child(held, 'rftsx-auqdi')).toMatchObject({status: 'in_progress', ready: false});
    expect(held.ready).toEqual(['rftsx-rupqh']);
  });

  it('a work reading that names another id or another workspace reads unknown (store unreachable), never that reading', async () => {
    const lies: readonly BeadsProgramWorkReader[] = [
      // Asked for rftsx-auqdi, the reader returns the reading of rftsx-rupqh (open, nothing to wait on).
      (seam, request) => readBeadsWork(seam, request.workId === 'rftsx-auqdi' ? {...request, workId: 'rftsx-rupqh'} : request),
      // Asked for rftsx-auqdi, the reader returns its reading stamped with another store's workspace.
      async (seam, request) => {
        const work = await readBeadsWork(seam, request);
        return request.workId === 'rftsx-auqdi' ? {...work, source: {...work.source, workspaceRoot: '/elsewhere'}} : work;
      },
    ];
    for (const lie of lies) {
      const reading = await read(bd(modelStore([H2])), programOf(H2), {readWork: lie});
      expect(child(reading, 'rftsx-auqdi')).toEqual({id: 'rftsx-auqdi', status: STORE_UNREACHABLE, ready: false, waitingOn: [], partial: false});
      expect(reading.ready).toEqual(['rftsx-rupqh']);
    }
  });

  it('the reading is plain structured-cloneable data', async () => {
    const reading = await read(bd(modelStore(MAPS)), {epics: MAPS.map((map) => map.epic), landedRecords: MAPS.flatMap(landedRulings)});
    expect(structuredClone(reading)).toEqual(reading);
  });

  // wb-k888 (R694 follow-up of wb-4nut.5 landing 381): F2 leads - the gate's GM14 read every work-reader error as
  // STORE_UNREACHABLE and stayed green; F16 rides - GM27-GM30 and GM32 stayed green. Each case below kills one of them.
  it('a work reader error that is not unavailable propagates: the reader re-throws it and never reads it as unknown (store unreachable)', async () => {
    const refused = new CapabilityError('validation', 'the work reader refused the request');
    const defect = new TypeError('the work reader failed');
    for (const thrown of [refused, defect]) {
      const failing: BeadsProgramWorkReader = (seam, request) => (request.workId === 'rftsx-auqdi' ? Promise.reject(thrown) : readBeadsWork(seam, request));
      await expect(read(bd(modelStore([H2])), programOf(H2), {readWork: failing})).rejects.toBe(thrown);
    }
    // Only a store the work reader could not read is unknown: the unavailable arm still reads the child unknown, never ready.
    const gone: BeadsProgramWorkReader = (seam, request) => (request.workId === 'rftsx-auqdi' ? Promise.reject(new CapabilityError('unavailable', 'the store is gone')) : readBeadsWork(seam, request));
    const reading = await read(bd(modelStore([H2])), programOf(H2), {readWork: gone});
    expect(child(reading, 'rftsx-auqdi')).toEqual({id: 'rftsx-auqdi', status: STORE_UNREACHABLE, ready: false, waitingOn: [], partial: false});
    expect(reading.ready).toEqual(['rftsx-rupqh']);
  });

  it('a gate read cut short by an abort is transport, never an unknown gate: the seam reads the signal after the call and while it runs', async () => {
    const {store} = gatedStore(H2, 'TSX-H2-01', 'wp:tsx-h2-01', GATE_FORMS[1] as GateForm);
    // A gate bead outside the program, so its show is the gate read alone and the last seam call of the read.
    store.set('rftsx-xgate', {id: 'rftsx-xgate', title: 'outside gate', status: 'closed', issueType: 'decision', priority: 2, labels: [], related: [], blocks: [], notes: 'ruled ADOPT'});
    for (const during of [false, true]) {
      const controller = new AbortController();
      const inner = bd(store);
      const client: BeadsProgramClient = {
        dependents: inner.dependents,
        async show(id, call) {
          const result = await inner.show(id, call);
          if (id !== 'rftsx-xgate') return result;
          controller.abort();
          if (during) throw new Error('the gate show was interrupted');
          return result;
        },
      };
      expect(await category(read(client, programOf(H2, {gates: {'TSX-H2-01': 'rftsx-xgate'}}), {signal: controller.signal})), during ? 'aborted while the gate show runs' : 'aborted as the gate show answers').toBe('transport');
      expect(inner.seen.filter((entry) => entry.id === 'rftsx-xgate')).toHaveLength(1);
    }
  });

  it('an abort as the gated child is read reaches no later seam call: the gate is never read and the read is transport (wb-52th F3, L2-M27p)', async () => {
    const {store} = gatedStore(H2, 'TSX-H2-01', 'wp:tsx-h2-01', GATE_FORMS[1] as GateForm);
    // A gate bead outside the program, so its show is the gate read alone: the seam call right after the child's work reading.
    store.set('rftsx-xgate', {id: 'rftsx-xgate', title: 'outside gate', status: 'closed', issueType: 'decision', priority: 2, labels: [], related: [], blocks: [], notes: 'ruled ADOPT'});
    const program = programOf(H2, {gates: {'TSX-H2-01': 'rftsx-xgate'}});
    // The control: unaborted, the read reads that gate once.
    const calm = bd(store);
    expect(child(await read(calm, program), 'TSX-H2-01')).toMatchObject({gate: {id: 'rftsx-xgate', verdict: 'ADOPT'}});
    expect(calm.seen.filter((entry) => entry.id === 'rftsx-xgate')).toHaveLength(1);
    const controller = new AbortController();
    const inner = bd(store);
    const aborting: BeadsProgramWorkReader = async (seam, request) => {
      const work = await readBeadsWork(seam, request);
      if (request.workId === 'TSX-H2-01') controller.abort();
      return work;
    };
    expect(await category(read(inner, program, {signal: controller.signal, readWork: aborting}))).toBe('transport');
    expect(inner.seen.filter((entry) => entry.id === 'rftsx-xgate')).toEqual([]);
  });

  it('an abort as the last seam call answers is transport: an epic with no dependents', async () => {
    const store = modelStore([H2]);
    store.set('rftsx-lone', {id: 'rftsx-lone', title: 'an epic with no dependents', status: 'open', issueType: 'epic', priority: 2, labels: ['epic'], related: [], blocks: []});
    const controller = new AbortController();
    const inner = bd(store);
    const client: BeadsProgramClient = {
      show: inner.show,
      async dependents(id, call) {
        const result = await inner.dependents(id, call);
        controller.abort();
        return result;
      },
    };
    expect(JSON.parse((await inner.dependents('rftsx-lone', {cwd: SCOPE.workspace, timeoutMs: 5000})).stdout)).toEqual([]);
    expect(await category(read(client, {epics: ['rftsx-lone']}, {signal: controller.signal}))).toBe('transport');
  });

  it('a child listed under two program epics is one child: read once, listed once and ready once', async () => {
    const store = modelStore([H2, PERF]);
    const inner = bd(store);
    const shared = store.get('rftsx-auqdi');
    const client: BeadsProgramClient = {
      show: inner.show,
      async dependents(id, call) {
        const result = await inner.dependents(id, call);
        if (id !== PERF.epic) return result;
        // The PERF-F epic also lists rftsx-auqdi as one of its parent-child work packages.
        const listed = JSON.parse(result.stdout) as Record<string, unknown>[];
        const twin = {id: 'rftsx-auqdi', title: shared?.title, status: 'open', issue_type: 'task', priority: 2, dependency_type: 'parent-child', labels: shared?.labels};
        return {...result, stdout: JSON.stringify([...listed, twin])};
      },
    };
    const reading = await read(client, {epics: [H2.epic, PERF.epic], landedRecords: [...landedRulings(H2), ...landedRulings(PERF)]});
    expect(reading.children.filter((entry) => entry.id === 'rftsx-auqdi')).toHaveLength(1);
    expect(reading.ready.filter((id) => id === 'rftsx-auqdi')).toEqual(['rftsx-auqdi']);
    expect(inner.seen.filter((entry) => entry.verb === 'show' && entry.id === 'rftsx-auqdi')).toHaveLength(1);
  });

  it('a program epic that is also a wp-labelled parent-child dependent of another program epic stays an epic, never a dispatched child', async () => {
    const store = modelStore([H2]);
    store.set('rftsx-subep', {id: 'rftsx-subep', title: 'an H2 sub-epic', status: 'open', issueType: 'epic', priority: 2, labels: ['wp:tsx-h2-sub', 'epic'], parent: H2.epic, related: [], blocks: []});
    const reading = await read(bd(store), {epics: [H2.epic, 'rftsx-subep'], landedRecords: landedRulings(H2)});
    expect(sorted(reading.children.map((entry) => entry.id))).toEqual(sorted(H2.ready.ids));
    expect(sorted(reading.ready)).toEqual(sorted(H2.ready.ids));
  });

  it('a seam answer past the read bound of 4,194,304 characters reads unknown (store unreachable); an answer at the bound is read', async () => {
    const bound = 4_194_304;
    const padded = (length: number): Fault => ({exit: 0, stdout: `${' '.repeat(length - 2)}[]`, stderr: ''});
    const store = modelStore([H2]);
    expect(await read(bd(store, {dependents: padded(bound)}), programOf(H2))).toEqual({store: 'read', ready: [], children: []});
    expect(await read(bd(store, {dependents: padded(bound + 1)}), programOf(H2))).toEqual({store: STORE_UNREACHABLE, ready: [], children: []});
  });

  it("a child's dependency on itself is neither a premise nor a blocker", async () => {
    const base = modelStore([H2]).get('rftsx-rupqh');
    const related = edit(modelStore([H2]), 'rftsx-rupqh', {related: [...(base?.related ?? []), 'rftsx-rupqh']});
    expect(child(await read(bd(related), programOf(H2)), 'rftsx-rupqh')).toMatchObject({ready: true, waitingOn: []});
    const blocks = edit(modelStore([H2]), 'rftsx-rupqh', {blocks: ['rftsx-rupqh']});
    expect(child(await read(bd(blocks), programOf(H2)), 'rftsx-rupqh')).toMatchObject({ready: true, waitingOn: []});
  });
});
