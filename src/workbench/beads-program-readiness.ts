/** Program dispatch readiness over the shared bead store (wb-4nut.5).
 *
 * A program bead protocol (the producer's docs/programs/<program>/BEADS-2026-10-21.md, Dispatch, at 76bbbffd9d4a): "a child is
 * ready when every `related` premise of it inside this program has closed or is a ruling/ADR record whose text has landed, and
 * when its gate (if any) reads ADOPT". This reader holds that rule to the shared bead store and nothing else.
 * - Ids, statuses and edges arrive only through the injected seams: `bd show <id> --json`, read by readBeadsWork, and the bd
 *   dependents listing of an epic (dep list <epic> --direction=up --json), because the bd 1.1.0-rc.1 show envelope of an epic
 *   lists no dependents. A program's bead map file is a reader snapshot and is never an input: a store this reader cannot read
 *   reports STORE_UNREACHABLE, never a snapshot status. The ready listing is never the source: it reads blockers, and a
 *   premise is `related`.
 * - The program's beads are its epics and their dependents. A child is a parent-child dependent of an epic carrying a `wp:`
 *   work-package label; a ruling row is a decision record, never a dispatched child. Only an open child is taken.
 * - Premises are `related` edges, never blockers: a `blocks` edge between two program beads is refused; a `related` edge to a
 *   bead outside the program holds nothing; a `blocks` edge to an outside bead holds the child while that bead is open.
 * - No design doc is implementation: the host's landed-record witness satisfies only a premise the store types `decision`;
 *   any other premise is satisfied by its closure in the store alone.
 * - A gate reads its verdict from the gate bead's own text and nothing else: its title, description and notes (EAT-R575 puts
 *   the ruling in the title or body; an appended ruling lands in the notes), never its status, labels or closure. Across the
 *   three, the text must carry exactly one ruling marker: `ruled ADOPT` or `ruled REJECT` verbatim, starting a word and
 *   ending where no letter, digit, `_` or `-` follows, and never the first member of an alternative (the question form
 *   `(ruled ADOPT or REJECT)` asks, it does not answer). DEFER is no marker: `ruled DEFER` reads `no-verdict`, as do no
 *   marker and two. This is the reference reading the program's bead-graph census holds every Pi gate reader to.
 * The module never spawns a process and never issues a store mutation.
 */
import {type BeadsReadClient, type BeadsReadLimits, type BeadsShowCall, type BeadsShowResult, type BeadsWorkReading, readBeadsWork} from './beads-observer.js';
import {CapabilityError} from './capability-registry.js';
import type {ObservationScope} from './observation.js';

/** What the reader reports for a program, child or gate the store could not return: never a snapshot status. */
export const STORE_UNREACHABLE = 'unknown (store unreachable)';

/** The injected seams, both run with cwd = workspace root: `bd show <id> --json`, and the bd dependents listing of an id
 * (dep list <id> --direction=up --json). */
export interface BeadsProgramClient extends BeadsReadClient {
  dependents(id: string, call: BeadsShowCall): Promise<BeadsShowResult>;
}
export interface BeadsProgram {
  /** Every program epic the rule spans: one map's epic, or several programs' epics read together. */
  epics: readonly string[];
  /** A gated child's gate bead, keyed by child id; a child absent here has no gate. */
  gates?: Readonly<Record<string, string>>;
  /** Decision records whose ruling or ADR text the host witnessed landed. */
  landedRecords?: readonly string[];
}
export interface BeadsProgramReadOptions {
  program: BeadsProgram;
  workspaceRoot: string;
  scope: ObservationScope;
  limits: BeadsReadLimits;
  now: () => string;
  signal?: AbortSignal;
}
export type BeadsGateVerdict = 'ADOPT' | 'REJECT' | 'no-verdict' | typeof STORE_UNREACHABLE;
export interface BeadsProgramChild {
  id: string;
  /** The store's status of the child, or STORE_UNREACHABLE. */
  status: string;
  ready: boolean;
  /** The in-program `related` premises not yet satisfied and the open outside blockers, each once, in store order. */
  waitingOn: string[];
  /** The child's dependencies were cut at the read bound: an unread premise may be open, so it is never ready. */
  partial: boolean;
  /** Present for a gated child only. */
  gate?: {id: string; verdict: BeadsGateVerdict};
}
export interface BeadsProgramReadiness {
  /** STORE_UNREACHABLE when an epic's dependents could not be read: then nothing is listed and nothing is ready. */
  store: 'read' | typeof STORE_UNREACHABLE;
  ready: string[];
  children: BeadsProgramChild[];
}

const MAX_STDOUT_CHARS = 4_194_304;
/** The bd id shape readBeadsWork admits. */
const WORK_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const WORK_PACKAGE = /^wp:./;
/** The gate bead's text a verdict is read from: its title, its body and the notes an appended ruling lands in. */
const TEXT_FIELDS = ['title', 'description', 'notes'] as const;
/** What follows a marker that is the first member of an alternative: separators, then at most one joining word. */
const SEPARATORS = "[\\s()\\[\\],;:/|'\"`]*";
/** A ruling marker: `ruled ADOPT` or `ruled REJECT` at a word start, the verdict word ending where no letter, digit, `_` or
 * `-` follows (ADOPTED and ADOPT-PROTOTYPE are not ADOPT), and not the first member of an alternative. */
const MARKER = new RegExp(`(?<![\\w-])ruled (ADOPT|REJECT)(?![\\w-])(?!${SEPARATORS}(?:(?:or|and|nor)(?![\\w-])${SEPARATORS})?(?:ADOPT|REJECT|DEFER)(?![\\w-]))`, 'g');

type JsonRecord = Record<string, unknown>;
const isRecord = (value: unknown): value is JsonRecord => value !== null && typeof value === 'object' && !Array.isArray(value);
const isStrings = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');
const unavailable = (message: string): CapabilityError => new CapabilityError('unavailable', message);
const aborted = (): CapabilityError => new CapabilityError('transport', 'Beads program read aborted.');
const refusedBlocks = (): CapabilityError => new CapabilityError('validation', 'A blocks edge between two program beads is refused: a premise is a related edge.');
const unreachable = (error: unknown): boolean => error instanceof CapabilityError && error.category === 'unavailable';

interface Member {
  id: string;
  dependencyType: string;
  issueType: string;
  labels: readonly string[];
}

function workId(value: unknown, field: string): string {
  if (typeof value !== 'string' || !WORK_ID.test(value)) throw new CapabilityError('validation', `Beads program ${field} is not a work id.`);
  return value;
}
function validate(options: BeadsProgramReadOptions): {epics: string[]; gates: Map<string, string>; landed: Set<string>} {
  const {program, workspaceRoot, scope, limits} = options;
  if (!workspaceRoot || scope.workspace !== workspaceRoot || !scope.principal) {
    throw new CapabilityError('authorization', 'Beads program reader requires a host-bound workspace and principal.');
  }
  for (const [key, value] of Object.entries(limits)) {
    if (!Number.isSafeInteger(value) || value < 1 || (key === 'timeoutMs' && value > 2_147_483_647)) throw new CapabilityError('validation', `Invalid Beads read budget: ${key}`);
  }
  if (!Array.isArray(program.epics) || program.epics.length === 0) throw new CapabilityError('validation', 'A Beads program names at least one epic.');
  const epics = [...new Set(program.epics.map((epic) => workId(epic, 'epic')))];
  const gates = new Map(Object.entries(program.gates ?? {}).map(([child, gate]) => [workId(child, 'gated child'), workId(gate, 'gate')] as const));
  const landed = new Set((program.landedRecords ?? []).map((id) => workId(id, 'landed record')));
  return {epics, gates, landed};
}

/** One seam call: an untrusted native failure surfaces no message, stack or argv; an abort is transport on either side. */
async function seam(signal: AbortSignal | undefined, call: () => Promise<BeadsShowResult>): Promise<BeadsShowResult> {
  if (signal?.aborted) throw aborted();
  let result: BeadsShowResult;
  try {
    result = await call();
  } catch {
    throw signal?.aborted ? aborted() : unavailable('bd could not be run.');
  }
  if (signal?.aborted) throw aborted();
  return result;
}
/** Every message is constant text: no seam value (exit code, output, stderr) reaches a diagnostic. */
function parseJson(result: BeadsShowResult, verb: string): unknown {
  if (result.exit !== 0) throw unavailable(`${verb} exited nonzero.`);
  if (typeof result.stdout !== 'string' || result.stdout.length > MAX_STDOUT_CHARS) throw unavailable(`${verb} output is missing or exceeds the read bound.`);
  try {
    return JSON.parse(result.stdout);
  } catch {
    throw unavailable(`${verb} output is not JSON.`);
  }
}
/** The dependents listing (dep list <epic> --direction=up --json): a flat record array, `[]` when the epic has none. */
function dependentsOf(result: BeadsShowResult): Member[] {
  const parsed = parseJson(result, 'bd dependents listing');
  if (!Array.isArray(parsed)) throw unavailable('bd dependents listing returned no record array.');
  return parsed.map((raw: unknown): Member => {
    if (!isRecord(raw) || typeof raw.id !== 'string' || !WORK_ID.test(raw.id)) throw unavailable('bd dependents listing record names no work id.');
    const {dependency_type: dependencyType, issue_type: issueType, labels} = raw;
    if (typeof dependencyType !== 'string' || typeof issueType !== 'string') throw unavailable('bd dependents listing record lacks its types.');
    if (labels !== undefined && labels !== null && !isStrings(labels)) throw unavailable('bd dependents listing record labels are not strings.');
    return {id: raw.id, dependencyType, issueType, labels: isStrings(labels) ? labels : []};
  });
}
/** The gate bead's verdict: exactly one ruling marker across its title, description and notes; no other field is read. A
 * text field that is present but not a string is a malformed reading of the store, never an empty one. */
function verdictOf(result: BeadsShowResult, gate: string): Exclude<BeadsGateVerdict, typeof STORE_UNREACHABLE> {
  const parsed = parseJson(result, 'bd show');
  if (!Array.isArray(parsed) || parsed.length === 0) throw unavailable('bd show returned no issue array.');
  const first: unknown = parsed[0];
  if (!isRecord(first) || first.id !== gate) throw unavailable('bd show returned a different work id than requested.');
  const markers = TEXT_FIELDS.flatMap((field) => {
    const text = first[field];
    if (text === undefined || text === null) return [];
    if (typeof text !== 'string') throw unavailable('Beads gate text is not a string.');
    return [...text.matchAll(MARKER)].map((match) => match[1]);
  });
  const [only] = markers;
  return markers.length === 1 && (only === 'ADOPT' || only === 'REJECT') ? only : 'no-verdict';
}

export async function readBeadsProgramReadiness(client: BeadsProgramClient, options: BeadsProgramReadOptions): Promise<BeadsProgramReadiness> {
  const {epics, gates, landed} = validate(options);
  const {workspaceRoot, scope, limits, now, signal} = options;
  const call = (): BeadsShowCall => ({cwd: workspaceRoot, timeoutMs: limits.timeoutMs, ...(signal ? {signal} : {})});

  const program = new Set<string>(epics);
  const decisions = new Set<string>();
  const childIds: string[] = [];
  for (const epic of epics) {
    let listed: Member[];
    try {
      listed = dependentsOf(await seam(signal, () => client.dependents(epic, call())));
    } catch (error) {
      if (unreachable(error)) return {store: STORE_UNREACHABLE, ready: [], children: []};
      throw error;
    }
    for (const member of listed) {
      if (member.dependencyType === 'blocks') throw refusedBlocks();
      program.add(member.id);
      if (member.issueType === 'decision') decisions.add(member.id);
      const workPackage = member.labels.some((label) => WORK_PACKAGE.test(label));
      if (member.dependencyType === 'parent-child' && workPackage && !epics.includes(member.id) && !childIds.includes(member.id)) childIds.push(member.id);
    }
  }

  const readGate = async (gate: string): Promise<BeadsGateVerdict> => {
    try {
      return verdictOf(await seam(signal, () => client.show(gate, call())), gate);
    } catch (error) {
      if (unreachable(error)) return STORE_UNREACHABLE;
      throw error;
    }
  };
  const children: BeadsProgramChild[] = [];
  for (const id of childIds) {
    let reading: BeadsWorkReading;
    try {
      reading = await readBeadsWork(client, {workId: id, workspaceRoot, scope, limits, now, ...(signal ? {signal} : {})});
    } catch (error) {
      if (!unreachable(error)) throw error;
      children.push({id, status: STORE_UNREACHABLE, ready: false, waitingOn: [], partial: false});
      continue;
    }
    const waitingOn: string[] = [];
    const wait = (premise: string): void => {
      if (!waitingOn.includes(premise)) waitingOn.push(premise);
    };
    for (const item of reading.dependencies.items) {
      if (item.id === id) continue;
      // Every entry is judged: a premise already waited on never hides a blocks edge to the same bead.
      if (item.dependencyType === 'blocks') {
        if (program.has(item.id)) throw refusedBlocks();
        if (item.status !== 'closed') wait(item.id);
      } else if (item.dependencyType === 'related' && program.has(item.id)) {
        const satisfied = item.status === 'closed' || (decisions.has(item.id) && landed.has(item.id));
        if (!satisfied) wait(item.id);
      }
    }
    const partial = reading.completeness === 'partial';
    const gateId = gates.get(id);
    const gate = gateId === undefined ? undefined : {id: gateId, verdict: await readGate(gateId)};
    const ready = reading.work.status === 'open' && !partial && waitingOn.length === 0 && (gate === undefined || gate.verdict === 'ADOPT');
    children.push({id, status: reading.work.status, ready, waitingOn, partial, ...(gate ? {gate} : {})});
  }
  return {store: 'read', ready: children.filter((entry) => entry.ready).map((entry) => entry.id), children};
}
