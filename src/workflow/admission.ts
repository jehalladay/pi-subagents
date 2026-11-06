/**
 * admission.ts — the host's admission budget, shared by every workflow run it starts at once (wb-ny54, MWI B-limits:
 * EAT-R073..EAT-R076 of the mechanical-workflows-interop-2026-11-04 triage, ATOMIC-REQUIREMENTS.md at pi-subagents master
 * 0b25e14e).
 *
 * A run's own semaphores bound one script and nothing else: runWorkflow builds a fresh pair per call, so two scripts running
 * at once each get their whole limit. A HostAdmission is built once by the host and handed to every run it starts, so its
 * pools are the one place the host's totals are counted. It is a counter and a first-in-first-out line per pool, not a
 * second scheduler: it never orders runs against each other, never prioritises, retries or starts work. A run asks for the
 * pools a dispatch is charged to immediately before that dispatch, and dispatches only once every pool has admitted it.
 *
 * Three pools, each with its own limit (see {@link dispatchPools} for the charge of each dispatch):
 *  - sdk-queries: owned agent queries, one per agent() dispatch;
 *  - child-processes: host children, one per agent dispatch and one per live node dispatch. The Claude Agent SDK runs a query
 *    in a child process and every native provider runs its CLI in one; a Pi-backend child runs in-process and is charged all
 *    the same, so the pool bounds what the host may start, not what an operating system counted;
 *  - forge-operations: native Forge operations, one per live node dispatch in the `forge.` capability namespace.
 * The queue deadline bounds the whole wait of one request. Past it the request is refused, typed, and leaves the line.
 *
 * Pools are taken one at a time in HOST_ADMISSION_POOLS order and held while the next is awaited, so two requests can never
 * wait on each other in a cycle. A cancelled or refused request leaves the line at once and hands back every pool it had
 * taken. A released slot passes straight to the oldest waiter, so the count never dips below what is running.
 */

import { performance } from "node:perf_hooks";

/** Every pool, in the order a request takes them. */
export const HOST_ADMISSION_POOLS = Object.freeze(["sdk-queries", "child-processes", "forge-operations"] as const);
export type HostAdmissionPool = (typeof HOST_ADMISSION_POOLS)[number];

/** setTimeout's own ceiling: a longer deadline would fire at once instead of late. */
export const HOST_ADMISSION_MAX_DEADLINE_MS = 2_147_483_647;

/** The separately configured limits; every one is a positive integer. */
export interface HostAdmissionLimits {
  /** Owned agent queries in flight across every run sharing the budget. */
  readonly sdkQueries: number;
  /** Host children in flight: agent dispatches and live node dispatches alike. */
  readonly childProcesses: number;
  /** Native Forge operations in flight: live node dispatches in the `forge.` namespace. */
  readonly forgeOperations: number;
  /** The longest one request may wait for admission before it is refused. */
  readonly queueDeadlineMs: number;
}

export type HostAdmissionErrorCode = "invalid-limit" | "unknown-pool" | "admission-deadline" | "admission-cancelled";

/** A typed refusal: an invalid limit or request, a wait past the queue deadline, or a wait cancelled by its caller. */
export class HostAdmissionError extends Error {
  constructor(
    readonly code: HostAdmissionErrorCode,
    message: string,
    /** The pool the request was waiting on when it was refused or cancelled. */
    readonly pool?: HostAdmissionPool,
  ) {
    super(message);
    this.name = "HostAdmissionError";
  }
}

/** Why a request is waiting: the pool with no room, that pool's limit and load, the line ahead of it, and for how long. */
export interface HostAdmissionWait {
  readonly pool: HostAdmissionPool;
  readonly limit: number;
  readonly inFlight: number;
  readonly ahead: number;
  readonly waitedMs: number;
}

/** Counts only, per pool: no ids, labels or payloads. */
export interface HostAdmissionPoolCounts {
  readonly limit: number;
  readonly inFlight: number;
  readonly peakInFlight: number;
  readonly queued: number;
  readonly admitted: number;
  readonly refused: number;
  readonly cancelledWhileQueued: number;
}

export interface HostAdmissionSnapshot {
  readonly queueDeadlineMs: number;
  readonly pools: Readonly<Record<HostAdmissionPool, HostAdmissionPoolCounts>>;
}

/** The pools one admitted request holds until it calls release(), once; a second call is a no-op. */
export interface HostAdmissionLease {
  readonly pools: readonly HostAdmissionPool[];
  /** Monotonic milliseconds from the request to its admission. */
  readonly waitedMs: number;
  release(): void;
}

export interface HostAdmissionRequest {
  /** Cancels the wait: the request leaves the line and hands back what it had taken. */
  readonly signal?: AbortSignal;
  /** Told once per pool the request has to queue on, at the moment it queues. */
  onQueued?(wait: HostAdmissionWait): void;
}

/** A dispatch the workflow runtime is about to hand its host. */
export type AdmittedDispatch = { readonly kind: "agent" } | { readonly kind: "node"; readonly capabilityId: string };

const AGENT_POOLS: readonly HostAdmissionPool[] = Object.freeze(["sdk-queries", "child-processes"]);
const FORGE_NODE_POOLS: readonly HostAdmissionPool[] = Object.freeze(["child-processes", "forge-operations"]);
const NODE_POOLS: readonly HostAdmissionPool[] = Object.freeze(["child-processes"]);

/**
 * The pools a dispatch is charged to: an agent is an owned SDK query and a host child; a node is a host child, and a node in
 * the `forge.` capability namespace is a native Forge operation as well.
 */
export function dispatchPools(dispatch: AdmittedDispatch): readonly HostAdmissionPool[] {
  if (dispatch.kind === "agent") return AGENT_POOLS;
  return dispatch.capabilityId.startsWith("forge.") ? FORGE_NODE_POOLS : NODE_POOLS;
}

interface Waiter {
  readonly queuedAt: number;
  /** Hands this waiter a slot a release passed on; the slot is already counted in flight. */
  readonly admit: () => void;
}

class Pool {
  inFlight = 0;
  peakInFlight = 0;
  admitted = 0;
  refused = 0;
  cancelledWhileQueued = 0;
  /** Oldest first. */
  readonly line: Waiter[] = [];

  constructor(
    readonly name: HostAdmissionPool,
    readonly limit: number,
  ) {}

  counts(): HostAdmissionPoolCounts {
    return Object.freeze({
      limit: this.limit, inFlight: this.inFlight, peakInFlight: this.peakInFlight, queued: this.line.length,
      admitted: this.admitted, refused: this.refused, cancelledWhileQueued: this.cancelledWhileQueued,
    });
  }
}

function positiveLimit(name: keyof HostAdmissionLimits, value: unknown, ceiling: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1 || value > ceiling) {
    const bound = ceiling === Number.MAX_SAFE_INTEGER ? "" : ` no greater than ${ceiling}`;
    throw new HostAdmissionError("invalid-limit", `Invalid host admission limit ${name}: a positive integer${bound} is required.`);
  }
  return value;
}

function cancelled(pool: HostAdmissionPool): HostAdmissionError {
  return new HostAdmissionError("admission-cancelled", `Host admission for ${pool} was cancelled while queued.`, pool);
}

export class HostAdmission {
  readonly queueDeadlineMs: number;
  private readonly pools: ReadonlyMap<HostAdmissionPool, Pool>;

  constructor(limits: HostAdmissionLimits) {
    const sdkQueries = positiveLimit("sdkQueries", limits.sdkQueries, Number.MAX_SAFE_INTEGER);
    const childProcesses = positiveLimit("childProcesses", limits.childProcesses, Number.MAX_SAFE_INTEGER);
    const forgeOperations = positiveLimit("forgeOperations", limits.forgeOperations, Number.MAX_SAFE_INTEGER);
    this.queueDeadlineMs = positiveLimit("queueDeadlineMs", limits.queueDeadlineMs, HOST_ADMISSION_MAX_DEADLINE_MS);
    this.pools = new Map<HostAdmissionPool, Pool>([
      ["sdk-queries", new Pool("sdk-queries", sdkQueries)],
      ["child-processes", new Pool("child-processes", childProcesses)],
      ["forge-operations", new Pool("forge-operations", forgeOperations)],
    ]);
  }

  /**
   * Admit one request to every pool it names, or refuse it typed: at the queue deadline (admission-deadline), on its signal
   * (admission-cancelled), or for naming no pool or an unknown one (unknown-pool). A refused or cancelled request holds
   * nothing afterwards.
   */
  async acquire(requested: readonly HostAdmissionPool[], request: HostAdmissionRequest = {}): Promise<HostAdmissionLease> {
    const wanted = this.ordered(requested);
    const startedAt = performance.now();
    const deadlineAt = startedAt + this.queueDeadlineMs;
    const taken: Pool[] = [];
    try {
      for (const pool of wanted) {
        await this.take(pool, deadlineAt, request);
        taken.push(pool);
      }
    } catch (error) {
      for (const pool of taken.reverse()) this.give(pool);
      throw error;
    }
    const waitedMs = performance.now() - startedAt;
    let released = false;
    return Object.freeze({
      pools: Object.freeze(wanted.map(pool => pool.name)),
      waitedMs,
      release: () => {
        if (released) return;
        released = true;
        for (const pool of [...wanted].reverse()) this.give(pool);
      },
    });
  }

  /** Every request waiting now, by the pool it waits on: counts and pool names only. */
  waiting(): readonly HostAdmissionWait[] {
    const at = performance.now();
    return Object.freeze([...this.pools.values()].flatMap(pool => pool.line.map((waiter, ahead) =>
      Object.freeze({ pool: pool.name, limit: pool.limit, inFlight: pool.inFlight, ahead, waitedMs: at - waiter.queuedAt }))));
  }

  snapshot(): HostAdmissionSnapshot {
    return Object.freeze({
      queueDeadlineMs: this.queueDeadlineMs,
      pools: Object.freeze({
        "sdk-queries": this.pool("sdk-queries").counts(),
        "child-processes": this.pool("child-processes").counts(),
        "forge-operations": this.pool("forge-operations").counts(),
      }),
    });
  }

  private pool(name: HostAdmissionPool): Pool {
    const pool = this.pools.get(name);
    if (pool === undefined) throw new HostAdmissionError("unknown-pool", "Unknown host admission pool.");
    return pool;
  }

  /** The named pools, deduplicated, in HOST_ADMISSION_POOLS order. */
  private ordered(requested: readonly HostAdmissionPool[]): Pool[] {
    if (!Array.isArray(requested) || requested.length === 0) {
      throw new HostAdmissionError("unknown-pool", "A host admission request must name at least one pool.");
    }
    const known: readonly string[] = HOST_ADMISSION_POOLS;
    if (requested.some(name => !known.includes(name))) throw new HostAdmissionError("unknown-pool", "Unknown host admission pool.");
    return HOST_ADMISSION_POOLS.filter(name => requested.includes(name)).map(name => this.pool(name));
  }

  /** One slot of `pool`, now or in line, before `deadlineAt`. */
  private take(pool: Pool, deadlineAt: number, request: HostAdmissionRequest): Promise<void> {
    const { signal } = request;
    if (signal?.aborted) return Promise.reject(cancelled(pool.name));
    if (pool.line.length === 0 && pool.inFlight < pool.limit) {
      pool.inFlight++;
      pool.peakInFlight = Math.max(pool.peakInFlight, pool.inFlight);
      pool.admitted++;
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      /** Out of the line, once: false when a release, the deadline or the signal already took it out. */
      const leave = (): boolean => {
        const at = pool.line.indexOf(waiter);
        if (at < 0) return false;
        pool.line.splice(at, 1);
        clearTimeout(timer);
        signal?.removeEventListener("abort", onAbort);
        return true;
      };
      const onAbort = (): void => {
        if (!leave()) return;
        pool.cancelledWhileQueued++;
        reject(cancelled(pool.name));
      };
      const waiter: Waiter = {
        queuedAt: performance.now(),
        admit: () => {
          clearTimeout(timer);
          signal?.removeEventListener("abort", onAbort);
          pool.admitted++;
          resolve();
        },
      };
      pool.line.push(waiter);
      timer = setTimeout(() => {
        if (!leave()) return;
        pool.refused++;
        reject(new HostAdmissionError(
          "admission-deadline",
          `Host admission refused: the ${this.queueDeadlineMs}ms queue deadline passed while waiting for ${pool.name} (limit ${pool.limit}, ${pool.inFlight} in flight).`,
          pool.name,
        ));
      }, Math.max(0, deadlineAt - waiter.queuedAt));
      signal?.addEventListener("abort", onAbort, { once: true });
      try {
        request.onQueued?.(Object.freeze({ pool: pool.name, limit: pool.limit, inFlight: pool.inFlight, ahead: pool.line.length - 1, waitedMs: 0 }));
      } catch {
        // A report that throws must not strand the request it reports on: the wait stands, bounded as ever.
      }
    });
  }

  /** A slot of `pool` back: to the oldest waiter, still counted, or freed. */
  private give(pool: Pool): void {
    const next = pool.line.shift();
    if (next !== undefined) next.admit();
    else pool.inFlight--;
  }
}
