/**
 * telemetry.ts — a byte bound on the progress a workflow run retains, and the stage records a run reports
 * (wb-r5q2 [MWI-telemetry], slice PI-7: EAT-R077 and EAT-R078 of the mechanical-workflows-interop-2026-11-04 program's
 * triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e084a5b1d612e780bc12a927b3a80dd62).
 *
 * Opt-in: a run given `RunWorkflowOptions.telemetry` (runtime.ts) holds its progress log in a {@link ByteBoundedLog} and
 * reports its stages through `onStage`; a run without it keeps every entry, as before (R077-UNSET).
 *
 * What each claim here covers is what test/workbench-mechanical-telemetry.test.ts pins, named per sentence by case id; a form
 * a sentence does not name is NOT CLAIMED.
 */

/** UTF-8 bytes of `value`'s JSON text: the measure a retained progress entry is charged (R077-PROGRESS-FLOOD's multi-byte rows). */
export function jsonBytes(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value) ?? "", "utf8");
}

/** UTF-8 bytes of `text`: the measure a stage record's `bytes` is given (R078-NATIVE-IDS's multi-byte answers). */
export function textBytes(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

/** What a {@link ByteBoundedLog} has been offered, holds and has dropped, in items and in bytes. */
export interface RetentionCounts {
  /** The bound, in bytes. */
  readonly limitBytes: number;
  readonly offeredEvents: number;
  readonly offeredBytes: number;
  readonly heldEvents: number;
  readonly heldBytes: number;
  /** Items no longer held: evicted, or refused because one alone exceeds the bound. Always offeredEvents - heldEvents. */
  readonly droppedEvents: number;
  /** Always offeredBytes - heldBytes. */
  readonly droppedBytes: number;
}

/**
 * A first-in-first-out log that holds at most `limitBytes` bytes of the items offered to it, each charged `measure(item)`.
 * An item that fits after evicting the oldest held items is kept and they are dropped; an item larger than the bound on its
 * own is dropped and evicts nothing. Every drop is counted (R077-LOG-BOUND). A bound of 0, -1, 0.5, NaN, Infinity or 2^53 is
 * refused with a RangeError, and 1 and Number.MAX_SAFE_INTEGER are accepted (R077-LOG-LIMIT).
 */
export class ByteBoundedLog<T> {
  readonly #limit: number;
  readonly #measure: (item: T) => number;
  readonly #held: { readonly item: T; readonly bytes: number }[] = [];
  #heldBytes = 0;
  #offeredEvents = 0;
  #offeredBytes = 0;

  constructor(limitBytes: number, measure: (item: T) => number) {
    if (typeof limitBytes !== "number" || !Number.isSafeInteger(limitBytes) || limitBytes < 1) {
      throw new RangeError(`ByteBoundedLog limitBytes must be a positive safe integer, got ${String(limitBytes)}.`);
    }
    this.#limit = limitBytes;
    this.#measure = measure;
  }

  /** Offers one item; true when it is held. */
  offer(item: T): boolean {
    const bytes = this.#measure(item);
    this.#offeredEvents++;
    this.#offeredBytes += bytes;
    if (bytes > this.#limit) return false;
    while (this.#heldBytes + bytes > this.#limit) {
      const evicted = this.#held.shift();
      if (evicted === undefined) break;
      this.#heldBytes -= evicted.bytes;
    }
    this.#held.push({ item, bytes });
    this.#heldBytes += bytes;
    return true;
  }

  /** The held items, oldest first. */
  entries(): T[] {
    return this.#held.map(held => held.item);
  }

  counts(): RetentionCounts {
    return {
      limitBytes: this.#limit,
      offeredEvents: this.#offeredEvents,
      offeredBytes: this.#offeredBytes,
      heldEvents: this.#held.length,
      heldBytes: this.#heldBytes,
      droppedEvents: this.#offeredEvents - this.#held.length,
      droppedBytes: this.#offeredBytes - this.#heldBytes,
    };
  }
}

/** The stage names a record carries (R078-STAGE-NAMES). */
export const WORKFLOW_STAGES = Object.freeze(["admission", "load", "sdk", "gate", "node"] as const);
export type WorkflowStage = (typeof WORKFLOW_STAGES)[number];

/**
 * One measured stage of a run (runtime.ts reports one as each stage ends, through `telemetry.onStage`):
 *  - admission: an agent's or a node's wait on the host's shared admission that ended with a lease; durationMs is the lease's
 *    own monotonic wait (admission.ts `waitedMs`) and bytes is 0 (R078-ADMISSION-ROLLBACK, for an agent);
 *  - load: a nested `workflow()` call's `host.loadWorkflow`; bytes are the UTF-8 bytes of the script it returned, of the message
 *    of the refusal it returned, or of the message it threw (R078-LOAD-ROLLBACK);
 *  - sdk: an agent's `host.spawnAgent` call, up to its answer; bytes are the UTF-8 bytes of the answer's text, of its error when
 *    it answered not ok, or of the message the call threw, and nativeId is the answer's `sessionId` when the host reported one
 *    (R078-SDK-ROLLBACK, R078-NATIVE-IDS, R078-FAILED-SDK); a later throw on the same dispatch (its gate) adds no second sdk
 *    record (R078-GATE-THROWS);
 *  - gate: an agent's gate command when the runtime runs it through `host.runGate` and the call answers; bytes are the UTF-8
 *    bytes of its output (R078-GATE-ROLLBACK); a call that throws reports no gate stage (R078-GATE-THROWS);
 *  - node: a capability node's `host.callNode`, up to its answer; bytes are the UTF-8 bytes of the answer's JSON text, or of the
 *    message the call rejected with, and nativeId is the producer id native-evidence.ts reads from the answer, when it reads one
 *    (R078-NODE-ROLLBACK, R078-NODE-NO-NATIVE); a non-read node refused because its dispatched journal row could not be
 *    written reports no node stage (R078-NODE-NOT-DISPATCHED).
 */
export interface WorkflowStageRecord {
  readonly stage: WorkflowStage;
  /** "agent" or "node" with the call's position among the run's agents or nodes; "workflow" with the nested load's order in the run. */
  readonly kind: "agent" | "node" | "workflow";
  readonly index: number;
  /** Milliseconds on the monotonic clock (performance.now()), not a wall-clock delta (the R078-*-ROLLBACK cases). */
  readonly durationMs: number;
  readonly bytes: number;
  /** The provider's own id for what the stage ran, as the provider reported it; absent when it reported none. */
  readonly nativeId?: string;
}

/** `RunWorkflowOptions.telemetry`: what a run is asked to bound and to report. */
export interface WorkflowTelemetryOptions {
  /**
   * Bytes of progress entries the run retains in `WorkflowRunResult.progress`, each entry charged {@link jsonBytes}, the oldest
   * evicted first (R077-PROGRESS-FLOOD, R077-PROVIDER-FLOOD, R077-OVERSIZED). Each of 0, -1, 0.5, NaN, Infinity and 2^53 makes
   * runWorkflow reject with a WorkflowRuntimeError and dispatch nothing, and Number.MAX_SAFE_INTEGER is accepted
   * (R077-INVALID); which other values are refused is NOT CLAIMED. `onProgress` is still handed every entry
   * (R077-PROGRESS-FLOOD).
   */
  readonly progressBytes: number;
  /** Told of each stage as it ends; a reporter that throws leaves the run's status and value as they are (R078-THROWING-REPORT). */
  onStage?(record: WorkflowStageRecord): void;
}

/** `WorkflowRunResult.telemetry`: present when the run was given telemetry options. */
export interface WorkflowTelemetryReport {
  /** The retained progress log's counts (R077-PROGRESS-FLOOD). */
  readonly progress: RetentionCounts;
}
