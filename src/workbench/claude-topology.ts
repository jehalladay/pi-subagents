/** Claude Agent SDK session reader adapter (docs/workbench/09 § Reader adapters: "Claude: SDK message events from sessions
 * controlled by Workbench"). It projects one bounded, payload-free ClaudeNativeObservation sample, as the observer in
 * claude-transcript.ts emits it for a workflow agent() call, into NativeSnapshots for the call, its SDK session and the
 * session's tool uses, plus only the edges the native stream confirms. Pure and synchronous: no clock, randomness, I/O, SDK
 * call or projection mutation. The caller supplies observedAt and sequence and applies the frozen result with
 * ObservationProjection.refresh and relate, the same way it applies FurnaceObserver.projectionTopology (wb-752.1).
 */
import type {ClaudeNativeObservation} from '../workflow/progress.js';
import {CapabilityError} from './capability-registry.js';
import type {ClaudeCallIdentity} from './claude-host.js';
import type {NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation} from './observation.js';
import {redactWorkbenchText, sanitizeWorkbenchText, stripUnsafeText} from './redaction.js';

/** Exactly the statement ObservationProjection.relate accepts; this adapter states ownership, causation and grouping only. */
export type ClaudeObservedRelation = Parameters<ObservationProjection['relate']>[0];
/** One observer sample for one workflow agent() call, with the host's own scope, invocation, clock reading and sequence. */
export interface ClaudeTopologyInput {
  call: ClaudeCallIdentity;
  snapshot: ClaudeNativeObservation;
  scope: ObservationScope;
  invocationId: string;
  observedAt: string;
  sequence: number;
  definitionDigest?: string;
  subjectBasis?: string;
}
/** Deeply frozen. truncated is true when a native node of the sample is absent here: a tool the observer evicted, one past
 * the observer's bound, or a session or tool whose native id cannot be used verbatim. Nothing absent is ever invented. */
export interface ClaudeProjectionTopology {snapshots: NativeSnapshot[]; relations: ClaudeObservedRelation[]; truncated: boolean}

type Terminal = NonNullable<ClaudeNativeObservation['terminal']>;
type ToolState = ClaudeNativeObservation['tools'][number]['state'];
type Status = Pick<Presentation, 'statusText' | 'statusTone'>;

/** The observer keeps at most 16 tool entries per call (claude-transcript.ts); a longer list is not one observer sample. */
const MAX_TOOLS = 16;
const MAX_IDENTITY_BYTES = 256;
/** ObservationProjection's default maxPayloadBytes, which bounds digest and basis text. */
const MAX_FIELD_BYTES = 4096;
const AGENT_TITLE = 120;
const TOOL_TITLE = 80;
const STATUS_TEXT = 40;
const SESSION_SUFFIX = ' · session';
const LIVE = 'observed-running';
const terminalTone: Readonly<Record<Terminal, Presentation['statusTone']>> = {succeeded: 'success', failed: 'failure', cancelled: 'unknown', observation_lost: 'unknown'};
const toolTone: Readonly<Record<ToolState, Presentation['statusTone']>> = {started: 'active', completed: 'success', failed: 'failure', refused: 'failure'};
/** A UTF-16 code unit orphaned when a length bound cuts through a surrogate pair. */
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;

const refused = (message: string): CapabilityError => new CapabilityError('validation', `Claude topology refused: ${message}.`);
const isTerminal = (value: unknown): value is Terminal => typeof value === 'string' && Object.hasOwn(terminalTone, value);
const isToolState = (value: unknown): value is ToolState => typeof value === 'string' && Object.hasOwn(toolTone, value);
/** Host text exactly as ObservationProjection accepts it: non-empty, bounded, no C0 control or DEL. */
const accepted = (value: unknown, bytes: number): value is string =>
  typeof value === 'string' && value.length > 0 && Buffer.byteLength(value) <= bytes && !/[\x00-\x1f\x7f]/.test(value);
const instant = (value: unknown): value is string =>
  typeof value === 'string' && value.length <= 64 && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
/** An identity used verbatim: non-empty, at most 256 UTF-8 bytes and already exactly what the shared sanitizers display (no
 * terminal sequence, control or bidi character, nothing the redactor rewrites). Anything else is withheld, never repaired. */
const exact = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0 && Buffer.byteLength(value) <= MAX_IDENTITY_BYTES && stripUnsafeText(redactWorkbenchText(value)) === value;

/** Script or producer text bound for display: the shared helper's label layout, then a code unit the bound orphaned is dropped.
 * Text that sanitizes to nothing shows a fixed placeholder, never an id. */
function shown(value: unknown, max: number, placeholder: string): string {
  if (typeof value !== 'string') return placeholder;
  return sanitizeWorkbenchText(value, max, 'label').replace(LONE_SURROGATE, '').trim() || placeholder;
}

/** The literal terminal, or observed-running while the call is live. Active needs a live call AND a current stream: a lost
 * stream is last-known, never progress (docs/workbench/10 § Failure and deception defenses). */
function callStatus(terminal: unknown, current: boolean): Status {
  if (terminal === undefined) return {statusText: LIVE, statusTone: current ? 'active' : 'unknown'};
  if (isTerminal(terminal)) return {statusText: terminal, statusTone: terminalTone[terminal]};
  return {statusText: shown(terminal, STATUS_TEXT, 'unknown'), statusTone: 'unknown'};
}

/** The literal native tool state. A tool still 'started' after its call settled, or once its stream is lost, is last-known. */
function toolStatus(state: unknown, live: boolean): Status {
  if (!isToolState(state)) return {statusText: shown(state, STATUS_TEXT, 'unknown'), statusTone: 'unknown'};
  return {statusText: state, statusTone: state === 'started' && !live ? 'unknown' : toolTone[state]};
}

/** Freezes a tree this module just built; nothing in it is shared with the caller's input. */
function frozen<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    const children: unknown[] = Object.values(value);
    for (const child of children) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/** The agent-call snapshot always; the session snapshot only once the SDK reported a session id, with one tool-use snapshot
 * per observed tool_use block of that session. Edges: agent-call -> session ownership, confirmed by the SDK session id the
 * call's own query() reported, and per tool a causation plus a grouping edge from the session, confirmed by the tool_use id.
 * No dependency or hypothesis edge, nothing inferred from timing or order, and no edge to a node absent from snapshots. */
export function projectClaudeTopology(input: ClaudeTopologyInput): ClaudeProjectionTopology {
  const {call, snapshot, scope, invocationId, observedAt, sequence, definitionDigest, subjectBasis} = input;
  if (!scope || !accepted(scope.workspace, MAX_IDENTITY_BYTES) || !accepted(scope.principal, MAX_IDENTITY_BYTES)) throw refused('the host scope needs a bounded workspace and principal');
  if (!instant(observedAt)) throw refused('observedAt must be a timezone-qualified instant');
  if (!Number.isSafeInteger(sequence) || sequence < 0) throw refused('the sequence must be a nonnegative safe integer');
  if (!exact(invocationId)) throw refused('the invocation id must be a bounded, displayable identity');
  if (!call || !Number.isSafeInteger(call.index) || call.index < 0) throw refused('the call index must be a nonnegative safe integer');
  for (const [name, value] of [['definition digest', definitionDigest], ['subject basis', subjectBasis]] as const) {
    if (value !== undefined && !accepted(value, MAX_FIELD_BYTES)) throw refused(`the ${name} must be bounded text without control characters`);
  }
  if (!snapshot || snapshot.provider !== 'claude-agent-sdk') throw refused('the sample must be a claude-agent-sdk observation');
  // The same key src/index.ts gives the call before init, so an existing row keeps its key and selection (09 § Derived view indexes).
  const agentId = `${invocationId}:${call.index}`;
  if (!exact(agentId)) throw refused('the agent-call id exceeds the identity bound');

  const owned = (): ObservationScope => ({workspace: scope.workspace, principal: scope.principal});
  const current = snapshot.freshness === 'current';
  const live = snapshot.terminal === undefined && current;
  const status = callStatus(snapshot.terminal, current);
  const node = (source: NativeRef, kind: string, coverage: 'partial' | 'unknown', presentation: Presentation): NativeSnapshot =>
    ({source, scope: owned(), capturedAt: observedAt, observedAt, sequence, coverage, node: presentation, kind, trace: {invocationId}});
  const agent: NativeRef = {provider: 'pi-workflow', type: 'agent-call', id: agentId};
  // Partial: the observer samples at most 64 snapshots per call. The digest and basis belong to the host-owned call only.
  const snapshots: NativeSnapshot[] = [{...node(agent, 'claude.call', 'partial', {title: shown(call.label, AGENT_TITLE, 'agent'), type: 'agent', ...status}),
    ...(definitionDigest !== undefined ? {definitionDigest} : {}), ...(subjectBasis !== undefined ? {subjectBasis} : {})}];
  const relations: ClaudeObservedRelation[] = [];
  const tools = Array.isArray(snapshot.tools) ? snapshot.tools : [];
  let truncated = snapshot.toolsTruncated === true || snapshot.tools !== undefined && !Array.isArray(snapshot.tools);
  const sessionId: unknown = snapshot.sessionId;
  if (!exact(sessionId)) {
    // Never synthesized from the agent id, label or index: without a usable SDK session id the call stays a local row and
    // its tools stay unattached. A reported id that cannot be used verbatim, or a tool without a session, is withheld.
    if (sessionId !== undefined && sessionId !== '' || tools.length > 0) truncated = true;
    return frozen({snapshots, relations, truncated});
  }
  const session: NativeRef = {provider: 'claude-agent-sdk', type: 'session', id: sessionId};
  const coverage = current ? 'partial' : 'unknown';
  // docs/workbench/20: the session loader resolves claude-message:<uuid> by uuid, so the ref is listed only when exact.
  const message = typeof snapshot.lastMessageId === 'string' && snapshot.lastMessageId !== '' ? `claude-message:${snapshot.lastMessageId}` : undefined;
  snapshots.push({...node(session, 'claude.session', coverage,
    {title: `${shown(call.label, AGENT_TITLE - SESSION_SUFFIX.length, 'agent')}${SESSION_SUFFIX}`, type: 'agent', ...status}),
  ...(message !== undefined && exact(message) ? {evidenceRefs: [message]} : {})});
  // The workflow host that launched query() owns exactly the session the SDK reported to that call; its id confirms ownership.
  relations.push({scope: owned(), from: {...agent}, to: {...session}, kind: 'ownership', provenance: {source: 'pi-workflow', observedAt, nativeConfirmationRef: sessionId}});
  // One node per toolUseId, folded as the observer folds its own list: first position and name, latest state.
  const folded = new Map<string, {name: unknown; state: unknown}>();
  for (const entry of tools) {
    if (!entry || !exact(entry.toolUseId)) {truncated = true; continue;}
    const prior = folded.get(entry.toolUseId);
    folded.set(entry.toolUseId, {name: prior ? prior.name : entry.name, state: entry.state});
  }
  const kept = [...folded].slice(-MAX_TOOLS);
  if (kept.length < folded.size) truncated = true;
  for (const [toolUseId, entry] of kept) {
    const used: NativeRef = {provider: 'claude-agent-sdk', type: 'tool-use', id: toolUseId};
    snapshots.push(node(used, 'claude.tool-use', coverage, {title: shown(entry.name, TOOL_TITLE, 'unknown'), type: 'sdk-operation', ...toolStatus(entry.state, live)}));
    // The tool_use block was observed inside this session's own messages, so its id confirms both edges. Grouping restates
    // that observation for display nesting (wb-6ze.1 nests on ownership and grouping only), never timing or order.
    relations.push(
      {scope: owned(), from: {...session}, to: {...used}, kind: 'causation', provenance: {source: 'claude-observer', observedAt, nativeConfirmationRef: toolUseId}},
      {scope: owned(), from: {...session}, to: {...used}, kind: 'grouping', provenance: {source: 'claude-observer', observedAt, nativeConfirmationRef: toolUseId}},
    );
  }
  return frozen({snapshots, relations, truncated});
}
