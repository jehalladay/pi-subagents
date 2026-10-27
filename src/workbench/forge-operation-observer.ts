/**
 * forge-operation-observer.ts — a Forge operation this Pi host starts becomes an observed node of the session projection
 * (wb-a3s), so the registered workflow_control tool admits it the way it admits a Furnace Run or a detached invocation.
 *
 * Everything here is read off the issuing connection's own frames and reply (measured against forge 0.2.1 app-server,
 * 2026-10-17): `operation.started {operation_id, request_id}` names the operation (request_id is the client's JSON-RPC id
 * echoed back, so it confirms nothing about ownership and is not used); `gate.step_started {operation_id, seq, step}` and
 * `gate.step_finished {operation_id, seq, step, outcome, exit_code, duration_ms}` are the server's own statements that a
 * step runs under the operation, so each one is the native confirmation of an ownership edge operation -> step
 * (docs/workbench/08 § "Cancellation and ownership": ownership is stated by the producer, never inferred); the end of the
 * operation is the `gate.run` reply (`operation_id`, `status`, `terminal_disposition`), never a notification. Nothing is
 * minted: an id is used verbatim or the frame is ignored, a disposition is echoed as text and mapped to a tone only.
 * The reply's own selected-versus-complete universe (wb-6ps1.2: `data.selection_accounting` for the declared steps or
 * members, `data.selection` for the tests) travels beside the disposition as its own facet whenever the reply publishes it,
 * and a published selection short of complete, or one that is not well formed, never settles with a success tone: a selected
 * or partial run is never a full-gate PASS. A gate-step node carries only its own step's outcome, never the operation's verdict.
 *
 * Retention: the started operation's connection is handed to the caller's `retain` seam (the wb-cra.1 registry), re-stated
 * on every frame of the operation so an active operation keeps its cancel offer past the registry TTL, and released on the
 * operation's own terminal. This module never issues a control verb (no cancel, no close of a foreign process): `close()`
 * only stops observing and marks the node stale; `dispose()` additionally releases the retention and closes the connection
 * this host owns, which reaps the spawned app-server and so ends the operation's transport — process ownership at session
 * teardown, documented here so nobody reads it as a cancel.
 */
import { CapabilityError } from "./capability-registry.js";
import type { ForgeCancelOperations, ForgeCapabilitySource } from "./forge-control.js";
import type { NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const FORGE_OPERATION_KIND = "forge.operation.snapshot";
export const FORGE_GATE_STEP_KIND = "forge.gate-step.snapshot";
export const FORGE_OPERATION_STARTED_METHOD = "operation.started";
export const FORGE_GATE_STEP_STARTED_METHOD = "gate.step_started";
export const FORGE_GATE_STEP_FINISHED_METHOD = "gate.step_finished";
export const FORGE_GATE_RUN_METHOD = "gate.run";
/** The reply field the SDK's delivery policy reads as the end of an operation (event_delivery_policy.d.ts TERMINAL_DISPOSITION_FIELD). */
export const FORGE_TERMINAL_DISPOSITION_FIELD = "terminal_disposition";
/** The reply `data` key of the declared-versus-selected unit universe (Forge docs/agent-interface.md § data.selection_accounting). */
export const FORGE_SELECTION_ACCOUNTING_FIELD = "selection_accounting";
/** The reply `data` key of the test universe a narrowed run selected from (Forge docs/cli-reference.md, "Explicit narrowing"). */
export const FORGE_TEST_SELECTION_FIELD = "selection";
/** Native identifiers are used verbatim within the projection's text bound; longer or empty values are not repaired. */
const NATIVE_TEXT_BYTES = 256;
/** The closed selection axis of a selection_accounting row; a row outside it withholds the whole block. */
const SELECTION_STATES: ReadonlySet<string> = new Set(["selected", "unaffected", "explicitly_narrowed", "unknown"]);

/** One notification as the connection delivers it; a real SDK Notification satisfies it unchanged. */
export interface ForgeOperationFrame {
  readonly method: string;
  readonly params: unknown;
}
/**
 * The issuing connection as this observer needs it. providers/forge.ts openForgeOperationConnection builds it over a real
 * ServerConnection and OperationClient.over(connection); tests inject a fake that records frames and verbs.
 */
export interface ForgeOperationConnection extends ForgeCapabilitySource {
  onNotification(sink: (frame: ForgeOperationFrame) => void): () => void;
  request(method: typeof FORGE_GATE_RUN_METHOD, params: { readonly root: string }): Promise<unknown>;
  readonly operations: ForgeCancelOperations;
  close(): Promise<void>;
}

export interface ForgeTopologyOptions {
  readonly scope: ObservationScope;
  readonly invocationId?: string;
}
export interface ForgeOperationStart {
  readonly operationId: string;
  readonly observedAt: string;
}
export interface ForgeGateStep {
  readonly operationId: string;
  readonly step: string;
  readonly seq: number;
  readonly observedAt: string;
  /** Present on a finished frame only: the server's own outcome word, echoed. */
  readonly outcome?: string;
}
/** A reply's unit universe as published: what the gate declared (steps, or members of a fan-out) and how many it selected. */
export interface ForgeUnitSelection {
  readonly unit: "step" | "member";
  readonly selected: number;
  readonly declared: number;
}
/** A reply's test universe as published: whether the run narrowed the tests it ran. */
export interface ForgeTestSelection {
  readonly narrowed: boolean;
}
/**
 * The selected-versus-complete universe a gate.run reply publishes beside its verdict (wb-6ps1.2). Each half is present only
 * when the reply published its block, and reads "withheld" when the block is published but not well formed.
 */
export interface ForgeRunSelection {
  readonly units?: ForgeUnitSelection | "withheld";
  readonly tests?: ForgeTestSelection | "withheld";
}
export interface ForgeOperationTerminal {
  readonly operationId: string;
  readonly status: string;
  readonly terminalDisposition: string;
  readonly observedAt: string;
  /** Present only when the reply published a selection block. */
  readonly selection?: ForgeRunSelection;
}
export interface ForgeObservedRelation {
  readonly scope: ObservationScope;
  readonly from: NativeRef;
  readonly to: NativeRef;
  readonly kind: "ownership";
  readonly provenance: { readonly source: "forge"; readonly observedAt: string; readonly nativeConfirmationRef: string };
}
export interface ForgeGateStepTopology {
  readonly snapshot: NativeSnapshot;
  readonly relation: ForgeObservedRelation;
}

export function forgeOperationRef(operationId: string): NativeRef {
  return { provider: "forge", type: "operation", id: operationId };
}
/** A step's identity is the server's (operation_id, step) pair, both halves verbatim, joined so two operations never share a step node. */
export function forgeGateStepRef(operationId: string, step: string): NativeRef {
  return { provider: "forge", type: "gate-step", id: `${operationId}/${step}` };
}
/** The server's own statement that `step` runs under the operation: the step frame, named by its sequence number. */
export function forgeStepConfirmationRef(operationId: string, method: string, seq: number): string {
  return `${operationId}/${method}/${seq}`;
}

function nativeText(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 && Buffer.byteLength(value, "utf8") <= NATIVE_TEXT_BYTES ? value : undefined;
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** An own data field only: an inherited value is never read as a producer statement. */
function own(value: Record<string, unknown>, key: string): unknown {
  return Object.hasOwn(value, key) ? value[key] : undefined;
}
function list(value: unknown): readonly unknown[] | undefined {
  return Array.isArray(value) ? value : undefined;
}
function trace(options: ForgeTopologyOptions, correlationIds?: Readonly<Record<string, string>>): NativeSnapshot["trace"] {
  if (options.invocationId === undefined && correlationIds === undefined) return undefined;
  return { ...(options.invocationId !== undefined ? { invocationId: options.invocationId } : {}), ...(correlationIds !== undefined ? { correlationIds } : {}) };
}
function withTrace(snapshot: NativeSnapshot, value: NativeSnapshot["trace"]): NativeSnapshot {
  return value === undefined ? snapshot : { ...snapshot, trace: value };
}

/** The operation node as the started frame states it: running, nothing more claimed. */
export function forgeOperationStartedSnapshot(start: ForgeOperationStart, options: ForgeTopologyOptions): NativeSnapshot {
  const operationId = nativeText(start.operationId);
  if (operationId === undefined) throw new CapabilityError("validation", "Forge named no usable operation identifier; nothing is observed in its place.");
  return withTrace({
    source: forgeOperationRef(operationId), scope: { ...options.scope }, capturedAt: start.observedAt, observedAt: start.observedAt, sequence: 0,
    kind: FORGE_OPERATION_KIND, evidenceRefs: [`forge-operation:${operationId}`],
    node: { title: `Forge operation ${operationId}`, type: "workflow", statusText: "running", statusTone: "active" },
  }, trace(options));
}

const STEP_TONES: Readonly<Record<string, Presentation["statusTone"]>> = Object.freeze({ passed: "success", failed: "failure", cancelled: "unknown" });

/** One step node plus the operation -> step ownership edge the frame confirms. */
export function forgeGateStepTopology(step: ForgeGateStep, options: ForgeTopologyOptions): ForgeGateStepTopology {
  const operationId = nativeText(step.operationId);
  const name = nativeText(step.step);
  if (operationId === undefined || name === undefined || !Number.isSafeInteger(step.seq) || step.seq < 0) {
    throw new CapabilityError("validation", "Forge step frame names no usable operation and step; nothing is observed in its place.");
  }
  const finished = step.outcome !== undefined;
  const outcome = finished ? nativeText(step.outcome) : undefined;
  const method = finished ? FORGE_GATE_STEP_FINISHED_METHOD : FORGE_GATE_STEP_STARTED_METHOD;
  const source = forgeGateStepRef(operationId, name);
  const snapshot = withTrace({
    source, scope: { ...options.scope }, capturedAt: step.observedAt, observedAt: step.observedAt, sequence: step.seq, kind: FORGE_GATE_STEP_KIND,
    node: {
      title: `Forge gate step ${name}`, type: "sdk-operation",
      statusText: finished ? (outcome ?? "finished") : "running",
      statusTone: finished ? (outcome !== undefined && Object.hasOwn(STEP_TONES, outcome) ? STEP_TONES[outcome] : "unknown") : "active",
    },
  }, trace(options, { operationId, step: name, seq: String(step.seq) }));
  const relation: ForgeObservedRelation = {
    scope: { ...options.scope }, from: forgeOperationRef(operationId), to: source, kind: "ownership",
    provenance: { source: "forge", observedAt: step.observedAt, nativeConfirmationRef: forgeStepConfirmationRef(operationId, method, step.seq) },
  };
  return { snapshot, relation };
}

const TERMINAL_TONES: Readonly<Record<string, Presentation["statusTone"]>> = Object.freeze({ success: "success", error: "failure", usage_error: "failure" });

/** An empty declared universe judges nothing, so it is never complete. */
const unitsComplete = (units: ForgeUnitSelection): boolean => units.declared > 0 && units.selected === units.declared;
/** A unit universe's own facet: fixed words and the producer's counts, never producer text. */
function unitFacet(units: ForgeUnitSelection | "withheld"): string {
  if (units === "withheld") return "selection UNKNOWN";
  const noun = units.declared === 1 ? units.unit : `${units.unit}s`;
  return `selection ${unitsComplete(units) ? "complete" : "partial"}: ${units.selected} of ${units.declared} ${noun} selected`;
}
function testFacet(tests: ForgeTestSelection | "withheld"): string {
  return tests === "withheld" ? "tests UNKNOWN" : tests.narrowed ? "tests narrowed" : "tests not narrowed";
}
/**
 * A published selection's coverage: partial when either universe is short of complete; complete only on a complete unit
 * universe whose test universe is unnarrowed or unpublished; otherwise (a withheld block, or no unit universe) unknown.
 */
function selectionCoverage(selection: ForgeRunSelection): "complete" | "partial" | "unknown" {
  const { units, tests } = selection;
  if ((typeof units === "object" && !unitsComplete(units)) || (typeof tests === "object" && tests.narrowed)) return "partial";
  return typeof units === "object" && tests !== "withheld" ? "complete" : "unknown";
}

/**
 * The operation's end as its own reply states it: the disposition echoed as text through the shared label layout, the command
 * status mapped to a tone, and a published selection carried after the disposition as its own facet with the coverage it
 * states. Success needs a complete published universe: a selection short of complete, or one that is not well formed, turns a
 * success tone to unknown (a failure stays a failure), while a reply that publishes no selection keeps the command's tone.
 */
export function forgeOperationTerminalSnapshot(terminal: ForgeOperationTerminal, options: ForgeTopologyOptions): NativeSnapshot {
  const operationId = nativeText(terminal.operationId);
  const disposition = nativeText(terminal.terminalDisposition);
  if (operationId === undefined || disposition === undefined) {
    throw new CapabilityError("validation", "Forge reply names no usable operation and disposition; nothing is settled in its place.");
  }
  const selection = terminal.selection;
  const coverage = selection === undefined ? undefined : selectionCoverage(selection);
  const commandTone: Presentation["statusTone"] = Object.hasOwn(TERMINAL_TONES, terminal.status) ? TERMINAL_TONES[terminal.status] : "unknown";
  const statusTone: Presentation["statusTone"] = commandTone === "success" && coverage !== undefined && coverage !== "complete" ? "unknown" : commandTone;
  // A disposition is at most NATIVE_TEXT_BYTES bytes, so the label bound never truncates it; one that displays as nothing is named.
  const shown = sanitizeWorkbenchText(disposition, NATIVE_TEXT_BYTES, "label") || "unprintable terminal_disposition";
  const facets = selection === undefined ? [] : [
    ...(selection.units !== undefined ? [unitFacet(selection.units)] : []),
    ...(selection.tests !== undefined ? [testFacet(selection.tests)] : []),
  ];
  return withTrace({
    source: forgeOperationRef(operationId), scope: { ...options.scope }, capturedAt: terminal.observedAt, observedAt: terminal.observedAt,
    sequence: Number.MAX_SAFE_INTEGER, kind: FORGE_OPERATION_KIND, evidenceRefs: [`forge-operation:${operationId}:${FORGE_TERMINAL_DISPOSITION_FIELD}=${disposition}`],
    ...(coverage !== undefined ? { coverage } : {}),
    node: { title: `Forge operation ${operationId}`, type: "workflow", statusText: [shown, ...facets].join(" · "), statusTone },
  }, trace(options));
}

export type ForgeOperationEvent =
  | { readonly kind: "started"; readonly operationId: string }
  | { readonly kind: "step"; readonly step: ForgeGateStep };

/** Reads one frame into an event, or undefined for a frame this observer has no use for. Nothing is repaired. */
export function decodeForgeOperationFrame(frame: ForgeOperationFrame, observedAt: string): ForgeOperationEvent | undefined {
  if (!record(frame.params)) return undefined;
  const operationId = nativeText(frame.params.operation_id);
  if (operationId === undefined) return undefined;
  if (frame.method === FORGE_OPERATION_STARTED_METHOD) return { kind: "started", operationId };
  if (frame.method !== FORGE_GATE_STEP_STARTED_METHOD && frame.method !== FORGE_GATE_STEP_FINISHED_METHOD) return undefined;
  const step = nativeText(frame.params.step);
  const seq = frame.params.seq;
  if (step === undefined || typeof seq !== "number" || !Number.isSafeInteger(seq) || seq < 0) return undefined;
  const outcome = frame.method === FORGE_GATE_STEP_FINISHED_METHOD ? (nativeText(frame.params.outcome) ?? "finished") : undefined;
  return { kind: "step", step: { operationId, step, seq, observedAt, ...(outcome !== undefined ? { outcome } : {}) } };
}

/**
 * A published selection_accounting block read for its unit universe only. The unit kind and every row's selection come from
 * closed sets, and the producer's own count identities are re-checked rather than trusted: counts.declared is the row count and
 * counts.selected the number of selected rows. Anything else is not well formed and the whole block is withheld.
 */
function decodeUnitSelection(block: unknown): ForgeUnitSelection | "withheld" {
  if (!record(block)) return "withheld";
  const unit = own(block, "unit");
  const rows = list(own(block, "units"));
  const counts = own(block, "counts");
  if ((unit !== "step" && unit !== "member") || rows === undefined || !record(counts)) return "withheld";
  let selected = 0;
  for (const row of rows) {
    const state = record(row) ? own(row, "selection") : undefined;
    if (typeof state !== "string" || !SELECTION_STATES.has(state)) return "withheld";
    if (state === "selected") selected += 1;
  }
  if (own(counts, "declared") !== rows.length || own(counts, "selected") !== selected) return "withheld";
  return { unit, selected, declared: rows.length };
}

/** A published data.selection block read for one fact: whether the run narrowed its tests (narrowed, or an incomplete denominator). */
function decodeTestSelection(block: unknown): ForgeTestSelection | "withheld" {
  if (!record(block)) return "withheld";
  const narrowed = own(block, "narrowed");
  const complete = own(block, "denominator_complete");
  if (typeof narrowed !== "boolean" || (complete !== undefined && complete !== null && typeof complete !== "boolean")) return "withheld";
  return { narrowed: narrowed || complete === false };
}

/**
 * The selection blocks a reply's data publishes, or undefined when it publishes neither (a reply with no data block included).
 * An unnarrowed run publishes no `data.selection` key (measured, forge 0.2.1: absent, not null); a null one decodes the same, to no test universe.
 */
function decodeForgeRunSelection(data: unknown): ForgeRunSelection | undefined {
  if (!record(data)) return undefined;
  const accounting = own(data, FORGE_SELECTION_ACCOUNTING_FIELD);
  const tests = own(data, FORGE_TEST_SELECTION_FIELD);
  if (accounting === undefined && (tests === undefined || tests === null)) return undefined;
  return {
    ...(accounting !== undefined ? { units: decodeUnitSelection(accounting) } : {}),
    ...(tests !== undefined && tests !== null ? { tests: decodeTestSelection(tests) } : {}),
  };
}

/** The reply's own terminal statement for the operation, or undefined when it echoes a different operation or no disposition. */
export function decodeForgeOperationTerminal(reply: unknown, operationId: string, observedAt: string): ForgeOperationTerminal | undefined {
  if (!record(reply) || reply.operation_id !== operationId) return undefined;
  const disposition = nativeText(reply[FORGE_TERMINAL_DISPOSITION_FIELD]);
  const status = nativeText(reply.status);
  if (disposition === undefined || status === undefined) return undefined;
  const selection = decodeForgeRunSelection(own(reply, "data"));
  return { operationId, status, terminalDisposition: disposition, observedAt, ...(selection !== undefined ? { selection } : {}) };
}

export interface ForgeOperationObserverDeps {
  /** The absolute package root gate.run runs on; the caller has already bound it to the workspace. */
  readonly root: string;
  readonly projection: ObservationProjection;
  readonly scope: ObservationScope;
  readonly invocationId?: string;
  readonly now: () => string;
  /** Bound on waiting for the server to name the operation. */
  readonly timeoutMs: number;
  /** The retention seam (wb-cra.1 retainForgeOperation): returns the disposer of the entry it made. */
  readonly retain: (operationId: string, connection: ForgeOperationConnection) => () => void;
}
export type ForgeOperationSettlement = "settled" | "transport-ended";
export interface ForgeOperationObserver {
  readonly operationId: string;
  readonly startedAt: string;
  /** Resolves when the operation's own reply settled it or its transport ended; never rejects, never minted early. */
  readonly settled: Promise<ForgeOperationSettlement>;
  /** Stops observing and marks the operation stale. Cancels nothing; the connection and its retention stay. */
  close(): void;
  /** close(), then releases the retention and closes the owned connection (reaping the spawned server). Issues no control verb. */
  dispose(): Promise<void>;
}

/**
 * Subscribes BEFORE the request is written (frames that arrive with no sink are dropped, transport.d.ts), starts gate.run on
 * `deps.root`, waits for the server to name the operation, retains the connection under that id and projects every frame
 * of the operation; the reply settles the node. The connection must be dedicated to this one gate.run (the caller opened it
 * for the purpose): the first started frame it carries is the operation's name, since a started frame carries no link the
 * client can match to its own request. The returned observer owns the connection.
 */
export async function observeForgeGateRun(connection: ForgeOperationConnection, deps: ForgeOperationObserverDeps): Promise<ForgeOperationObserver> {
  const options: ForgeTopologyOptions = { scope: deps.scope, ...(deps.invocationId !== undefined ? { invocationId: deps.invocationId } : {}) };
  let operationId: string | undefined;
  let startedAt: string | undefined;
  let release: (() => void) | undefined;
  let observing = true;
  let nameOperation: (id: string) => void = () => {};
  const named = new Promise<string>(resolve => { nameOperation = resolve; });
  const retain = (id: string): void => {
    const next = deps.retain(id, connection);
    // The newest retention is the live one; the previous disposer only ever dropped its own entry and is now inert.
    release = next;
  };
  const sink = (frame: ForgeOperationFrame): void => {
    if (!observing) return;
    const event = decodeForgeOperationFrame(frame, deps.now());
    if (event === undefined) return;
    if (operationId === undefined) {
      if (event.kind !== "started") return;
      operationId = event.operationId;
      startedAt = deps.now();
      retain(operationId);
      deps.projection.refresh(forgeOperationStartedSnapshot({ operationId, observedAt: startedAt }, options));
      nameOperation(operationId);
      return;
    }
    if (event.kind === "started" || event.step.operationId !== operationId) return;
    retain(operationId);
    const { snapshot, relation } = forgeGateStepTopology(event.step, options);
    if (deps.projection.refresh(snapshot) === "refused") return;
    deps.projection.relate(relation);
  };
  const unsubscribe = connection.onNotification(sink);
  const reply = connection.request(FORGE_GATE_RUN_METHOD, { root: deps.root });
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      named,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(new CapabilityError("unavailable", "Forge named no operation within the start bound; nothing is observed in its place.")), deps.timeoutMs);
      }),
    ]);
  } catch (error) {
    observing = false;
    unsubscribe();
    reply.catch(() => undefined);
    await connection.close();
    throw error;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
  const id = operationId as string;
  const at = startedAt as string;
  const settled = reply.then(
    (result): ForgeOperationSettlement => {
      const terminal = decodeForgeOperationTerminal(result, id, deps.now());
      if (terminal === undefined) deps.projection.markStale({ scope: deps.scope, ref: forgeOperationRef(id) });
      else deps.projection.refresh(forgeOperationTerminalSnapshot(terminal, options));
      observing = false;
      unsubscribe();
      release?.();
      return "settled";
    },
    (): ForgeOperationSettlement => {
      deps.projection.markStale({ scope: deps.scope, ref: forgeOperationRef(id) });
      observing = false;
      unsubscribe();
      release?.();
      return "transport-ended";
    },
  );
  // The reply's settlement also releases the owned connection; a terminal reply has nothing left to carry.
  void settled.then(() => connection.close().catch(() => undefined));
  const close = (): void => {
    if (!observing) return;
    observing = false;
    unsubscribe();
    deps.projection.markStale({ scope: deps.scope, ref: forgeOperationRef(id) });
  };
  return {
    operationId: id,
    startedAt: at,
    settled,
    close,
    async dispose(): Promise<void> {
      close();
      release?.();
      await connection.close();
    },
  };
}
