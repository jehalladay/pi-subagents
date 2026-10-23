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
 * ADOPT line).
 *
 * ANCHORS OUTSIDE THIS FILE. test/fixtures/beads-program-snapshots.json holds the three pinned rftsx bead maps byte-exact,
 * raw-deflated (a byte list, so the producer's prose never reads as Pi's own text to the censuses that walk the tree); the
 * judged set inflates each, holds its byte length, recomputes its git blob id, and each id equals
 * `git rev-parse 76bbbffd9d4a:<path>` in ReactiveFiberTSXSDK. Every
 * map's own "Ready at creation" line is the oracle a store modeled from that map must reproduce through the reader's seams.
 * The bead's acceptance text anchors the row labels, the row count and the sub-clauses the pins cover.
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
 */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {inflateRawSync} from 'node:zlib';
import {describe, expect, it} from 'vitest';
import type {BeadsShowCall, BeadsShowResult} from '../src/workbench/beads-observer.js';
import {
  type BeadsProgram,
  type BeadsProgramClient,
  type BeadsProgramReadiness,
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
const read = (client: BeadsProgramClient, program: BeadsProgram, extra: {scope?: ObservationScope; signal?: AbortSignal; limits?: typeof LIMITS} = {}): Promise<BeadsProgramReadiness> =>
  readBeadsProgramReadiness(client, {program, workspaceRoot: SCOPE.workspace, scope: extra.scope ?? SCOPE, limits: extra.limits ?? LIMITS, now: NOW, ...(extra.signal ? {signal: extra.signal} : {})});
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
// verdict the reader must read; the gated child is ready exactly when that verdict is ADOPT.

type FormVerdict = 'ADOPT' | 'DEFER' | 'REJECT' | 'no-verdict';
interface GateForm {
  id: string;
  verdict: FormVerdict;
  why: string;
  apply: (gate: ModelBead) => Partial<ModelBead>;
}
const GATE_FORMS: readonly GateForm[] = [
  {id: 'G01', verdict: 'no-verdict', why: 'no appended notes', apply: () => ({})},
  {id: 'G02', verdict: 'ADOPT', why: 'one verdict line ruled ADOPT', apply: () => ({notes: 'ruled ADOPT'})},
  {id: 'G03', verdict: 'DEFER', why: 'one verdict line ruled DEFER', apply: () => ({notes: 'ruled DEFER'})},
  {id: 'G04', verdict: 'REJECT', why: 'one verdict line ruled REJECT', apply: () => ({notes: 'ruled REJECT'})},
  {id: 'G05', verdict: 'no-verdict', why: 'two ADOPT lines are two markers', apply: () => ({notes: 'ruled ADOPT\nruled ADOPT'})},
  {id: 'G06', verdict: 'no-verdict', why: 'an ADOPT and a REJECT line', apply: () => ({notes: 'ruled ADOPT\n\nruled REJECT'})},
  {id: 'G07', verdict: 'no-verdict', why: "the gate's own title template copied into its notes", apply: (gate) => ({notes: `Full statement: ${gate.title}`})},
  {id: 'G08', verdict: 'no-verdict', why: 'the marker inside prose', apply: () => ({notes: 'not yet ruled ADOPT'})},
  {id: 'G09', verdict: 'no-verdict', why: 'the marker in another case', apply: () => ({notes: 'ruled adopt'})},
  {id: 'G10', verdict: 'no-verdict', why: "another program's verdict word (the rftsx-atcqf.42 pattern)", apply: () => ({notes: 'ruled ADOPT-PROTOTYPE'})},
  {id: 'G11', verdict: 'no-verdict', why: 'the verdict in the title only', apply: (gate) => ({title: `${gate.title} - ruled ADOPT`})},
  {id: 'G12', verdict: 'no-verdict', why: 'the verdict in the description only', apply: () => ({description: 'ruled ADOPT'})},
  {id: 'G13', verdict: 'ADOPT', why: 'one verdict line among other notes, padded and CRLF-ended', apply: () => ({notes: 'Owner ruling recorded.\r\n  ruled ADOPT  \r\nAPI-PIN.md landed.'})},
  {id: 'G14', verdict: 'no-verdict', why: 'the marker with trailing punctuation', apply: () => ({notes: 'ruled ADOPT.'})},
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
];
const REGISTERED = new Map<string, string>();
/** The pins whose body reached its witness compare, in run order; the closing case holds every pin to it. */
const REACHED: string[] = [];
function witness(id: string, actual: unknown, expected: unknown): void {
  expect(actual).toEqual(expected);
  REACHED.push(id);
}
function pin(id: string, title: string, body: () => Promise<void> | void): void {
  if (REGISTERED.has(id)) throw new Error(`pin ${id} registered twice`);
  REGISTERED.set(id, title);
  it(`${id}: ${title}`, body);
}
let notesRead: string | undefined;
/** The bead's notes as the tracked export carries them, read once: only the lines naming the bead are parsed. */
function beadNotes(): string {
  if (notesRead !== undefined) return notesRead;
  const text = readFileSync(join(REPO, '.beads', 'issues.jsonl'), 'utf8');
  const key = `"id":"${BEAD}"`;
  for (let at = text.indexOf(key); at !== -1; at = text.indexOf(key, at + key.length)) {
    const end = text.indexOf('\n', at);
    const issue = JSON.parse(text.slice(text.lastIndexOf('\n', at) + 1, end === -1 ? undefined : end)) as {id?: unknown; notes?: unknown};
    if (issue.id === BEAD && typeof issue.notes === 'string') {
      notesRead = issue.notes;
      return notesRead;
    }
  }
  throw new Error(`.beads/issues.jsonl carries no notes for ${BEAD}`);
}
/** The owner filing: the notes through the merged-duplicates paragraph. Notes appended later (deliveries, gate verdicts) are
 * never an anchor, so a later note naming another bead cannot move the judged set. */
function ownerFiling(): string {
  const notes = beadNotes();
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
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(['A:6', 'B:5', 'C:3', 'D:3']);
    const clauses = acceptanceClauses();
    expect(ROWS.map((row) => row.label)).toEqual(clauses);
    for (const [index, row] of ROWS.entries()) {
      expect(sorted([...new Set(row.pins.map((entry) => entry.covers))])).toEqual(sorted(subClauses(clauses[index] ?? '')));
      for (const entry of row.pins) expect(entry.id.startsWith(row.id)).toBe(true);
    }
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
    // The gate forms: frozen shape, and each verdict word the H2 epic row rules over has its own one-line control.
    expect(GATE_FORMS.map((form) => `${form.id}:${form.verdict}`)).toEqual([
      'G01:no-verdict',
      'G02:ADOPT',
      'G03:DEFER',
      'G04:REJECT',
      'G05:no-verdict',
      'G06:no-verdict',
      'G07:no-verdict',
      'G08:no-verdict',
      'G09:no-verdict',
      'G10:no-verdict',
      'G11:no-verdict',
      'G12:no-verdict',
      'G13:ADOPT',
      'G14:no-verdict',
    ]);
    const epicRow = H2.rows.find((row) => row.id === H2.epic);
    const vocabulary = /ruled \(([A-Z/]+)\)/.exec(snapshot('harness2-reactive-evolution-2026-10-20').text.split('\n')[(epicRow?.line ?? 0) - 1] ?? '')?.[1]?.split('/');
    expect(vocabulary).toEqual(['ADOPT', 'DEFER', 'REJECT']);
    const blank: ModelBead = {id: 'rftsx-blank', title: 'blank gate', status: 'closed', issueType: 'decision', priority: 2, labels: [], related: [], blocks: []};
    for (const word of vocabulary ?? []) expect(GATE_FORMS.filter((form) => form.verdict === word && form.apply(blank).notes === `ruled ${word}`).map((form) => form.id)).toHaveLength(1);
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

  pin('A5', 'a gated child is ready only when its gate bead appends exactly one verdict line ruled ADOPT (rftsx-rupqh for TSX-H2-01, rftsx-pgob0 for TSX-IO-03b)', async () => {
    const failures: string[] = [];
    for (const {map, packet, label} of GATED) {
      for (const form of GATE_FORMS) {
        const {store, gate} = gatedStore(map, packet, label, form);
        const reading = await read(bd(store), programOf(map, {gates: {[packet]: gate}}));
        const entry = child(reading, packet);
        const want = {ready: form.verdict === 'ADOPT', gate: {id: gate, verdict: form.verdict}};
        if (entry.ready !== want.ready || JSON.stringify(entry.gate) !== JSON.stringify(want.gate)) failures.push(`${map.epic} ${packet} ${form.id} (${form.why}): ${JSON.stringify({ready: entry.ready, gate: entry.gate})}`);
        if (reading.ready.includes(packet) !== want.ready) failures.push(`${map.epic} ${packet} ${form.id}: ready set disagrees`);
      }
    }
    witness('A5', failures, []);
  });

  pin('A6', 'a gate the store cannot return reads unknown (store unreachable) and its child is never ready', async () => {
    const {store, gate} = gatedStore(H2, 'TSX-H2-01', 'wp:tsx-h2-01', GATE_FORMS[1] as GateForm);
    for (const fault of ['throw', missing(), {exit: 0, stdout: 'not json', stderr: ''}] as const) {
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
    witness('D1', absent, {store: STORE_UNREACHABLE, ready: [], children: []});
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
    witness('D3', specifiers, ['./beads-observer.js', './capability-registry.js', './observation.js']);
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

  it('every pin reached its witness compare, once, in roster order', () => {
    expect(REACHED).toEqual(ROWS.flatMap((row) => row.pins.map((entry) => entry.id)));
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
    expect(await category(read(bd(modelStore([H2])), programOf(H2), {signal: before.signal}))).toBe('transport');
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

  it('the reading is plain structured-cloneable data', async () => {
    const reading = await read(bd(modelStore(MAPS)), {epics: MAPS.map((map) => map.epic), landedRecords: MAPS.flatMap(landedRulings)});
    expect(structuredClone(reading)).toEqual(reading);
  });
});
