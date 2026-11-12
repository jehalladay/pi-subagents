/**
 * Show-only Beads work client and the wiring that resolves Furnace Attempt work ids into Beads Work nodes (wb-lkz7, VC-4: the
 * Beads half of wb-752.12, carved from wb-752.13 by ruling M:78809).
 *
 * THE B3 ANSWER (wb-kku9.3's census B3 asked whether a show-only observation importer of the Beads reader is admitted): this
 * module is that importer, and the only one. It imports the landed reader, src/workbench/beads-observer.ts (readBeadsWork,
 * projectBeadsWork), unchanged, and runs exactly one native verb: `bd show <id> --json`. It is an observation importer only:
 * it decides nothing about any task, starts or changes no work, and holds no reading across calls.
 *
 * - The client (createBeadsShowClient) launches the command bd with argv built by beadsShowArgv: the frozen verb and flag
 *   around an id the reader's grammar admits, checked before any launch, so no other verb is reachable from any input. The
 *   child runs in the call's cwd (the workspace root, where its store is found), with shell off, stdin ignored, an
 *   allowlist-only environment (BEADS_CHILD_ENV_ALLOWLIST, src/workbench/process-env.ts), the call's deadline and AbortSignal,
 *   and stdout and stderr each bounded: past a bound, the deadline or an abort the child is stopped and the read rejects, so a
 *   cut envelope is never parsed. A read resolves with the exit, stdout and stderr and no producer version (none is guessed).
 * - The wiring (observeAttemptWork) reads nothing without the exact grant literal BEADS_INSPECT_GRANT; no other grant implies
 *   it. Under it, each distinct work id the Attempts name is read once (at most BEADS_WIRING_MAX_WORK of them, in first-named
 *   order; the rest are counted as the remainder, never dropped silently), under BEADS_WIRING_LIMITS. A reading the projection
 *   applies reaches it exactly as projectBeadsWork states it (its Work snapshot, its dependency and grouping relations), and
 *   each Attempt naming that work id gains one causation edge to the Work node, provenance source furnace, its native
 *   confirmation the work id the Furnace Attempt record carries; a reading the projection does not apply (it holds a later
 *   reading of that Work) is counted as superseded and states no relation. A failed read (a nonzero exit, a deadline or abort,
 *   a body the reader refuses) marks that Work ref stale and projects nothing: no node is invented, and a Furnace node
 *   refreshed before the call reads the same after it. An id outside the reader's grammar is counted as refused and neither
 *   read nor marked.
 */
import { spawn } from "node:child_process";
import { type BeadsReadClient, type BeadsReadLimits, type BeadsShowCall, type BeadsShowResult, type BeadsWorkProjection, projectBeadsWork, readBeadsWork } from "../beads-observer.js";
import { CapabilityError } from "../capability-registry.js";
import type { NativeRef, NativeSnapshot, ObservationProjection, ObservationScope } from "../observation.js";
import { BEADS_CHILD_ENV_ALLOWLIST, scrubbedEnvironment } from "../process-env.js";

/** The grant that admits a Beads read; no other grant implies it, and it implies no other. */
export const BEADS_INSPECT_GRANT = "beads:inspect";
/** The distinct work ids one wiring call reads; the ids past it are counted as the remainder and never read. */
export const BEADS_WIRING_MAX_WORK = 8;
/** The reader limits every wiring read runs under. */
export const BEADS_WIRING_LIMITS: Readonly<BeadsReadLimits> = Object.freeze({ maxDependencies: 32, maxTitleChars: 160, timeoutMs: 5_000 });
/** The stdout bytes one read may receive; past them the child is stopped and the read rejects. */
export const BEADS_SHOW_STDOUT_BYTES = 1_048_576;
/** The stderr bytes one read may receive; past them the child is stopped and the read rejects. */
export const BEADS_SHOW_STDERR_BYTES = 65_536;

const BINARY = "bd";
const VERB = "show";
const FLAG = "--json";
/** The reader's work id grammar (beads-observer.ts): a leading letter or digit, so no id reads as a flag. */
const WORK_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
/** After SIGTERM, how long a child may take to exit before SIGKILL. */
const KILL_GRACE_MS = 500;

/** The one argv this client launches: the frozen verb, the id and the frozen flag. Any other input is refused here. */
export function beadsShowArgv(id: string): readonly string[] {
  if (typeof id !== "string" || !WORK_ID.test(id)) throw new CapabilityError("validation", "Beads work id is not a work id.");
  return Object.freeze([VERB, id, FLAG]);
}

/** What the client reads of a launched child (node's ChildProcess satisfies it). */
export interface BeadsChildProcess {
  readonly stdout: { on(event: "data", listener: (chunk: Buffer) => void): unknown } | null;
  readonly stderr: { on(event: "data", listener: (chunk: Buffer) => void): unknown } | null;
  readonly exitCode: number | null;
  readonly signalCode: NodeJS.Signals | null;
  kill(signal?: NodeJS.Signals): boolean;
  once(event: "error", listener: (error: Error) => void): unknown;
  once(event: "close", listener: (code: number | null) => void): unknown;
}
/** The launch options the client always passes. */
export interface BeadsLaunchOptions {
  readonly cwd: string;
  readonly env: Record<string, string>;
  readonly shell: false;
  readonly stdio: ["ignore", "pipe", "pipe"];
  readonly windowsHide: true;
}
/** The launcher: node's spawn unless a caller hands one in (tests record through it, no module mock). */
export type BeadsLaunch = (command: typeof BINARY, args: readonly string[], options: BeadsLaunchOptions) => BeadsChildProcess;
/** Node's own launcher. It launches bd alone, whatever command it is handed, so the one native program is spelled at the call. */
const nodeLaunch: BeadsLaunch = (_command, args, options) =>
  spawn("bd", [...args], { cwd: options.cwd, env: options.env, shell: options.shell, stdio: options.stdio, windowsHide: options.windowsHide });

/** The show-only client the wiring reads through: one launch per read, nothing kept between reads. */
export function createBeadsShowClient(launch: BeadsLaunch = nodeLaunch): BeadsReadClient {
  return { show: (id, call) => showOnce(launch, id, call) };
}

function showOnce(launch: BeadsLaunch, id: string, call: BeadsShowCall): Promise<BeadsShowResult> {
  let argv: readonly string[];
  try {
    argv = beadsShowArgv(id);
  } catch (error) {
    return Promise.reject(error);
  }
  if (call.signal?.aborted) return Promise.reject(new CapabilityError("transport", "Beads read aborted before launch."));
  let child: BeadsChildProcess;
  try {
    child = launch(BINARY, argv, {
      cwd: call.cwd,
      env: scrubbedEnvironment(process.env, BEADS_CHILD_ENV_ALLOWLIST),
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
  } catch {
    return Promise.reject(new CapabilityError("unavailable", "The Beads CLI could not be launched."));
  }
  return new Promise<BeadsShowResult>((resolve, reject) => {
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let stopped: "deadline" | "stdout" | "stderr" | "aborted" | undefined;
    let settled = false;
    let escalation: NodeJS.Timeout | undefined;
    const stop = (reason: "deadline" | "stdout" | "stderr" | "aborted"): void => {
      stopped ??= reason;
      if (settled || child.exitCode !== null || child.signalCode !== null || escalation !== undefined) return;
      escalation = setTimeout(() => {
        if (!settled && child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
      }, KILL_GRACE_MS);
      child.kill("SIGTERM");
    };
    const onAbort = (): void => stop("aborted");
    const timer = setTimeout(() => stop("deadline"), call.timeoutMs);
    call.signal?.addEventListener("abort", onAbort, { once: true });
    const settle = (): boolean => {
      if (settled) return false;
      settled = true;
      clearTimeout(timer);
      if (escalation !== undefined) clearTimeout(escalation);
      call.signal?.removeEventListener("abort", onAbort);
      return true;
    };
    child.stdout?.on("data", chunk => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > BEADS_SHOW_STDOUT_BYTES) stop("stdout");
      else stdout.push(chunk);
    });
    child.stderr?.on("data", chunk => {
      stderrBytes += chunk.length;
      if (stderrBytes > BEADS_SHOW_STDERR_BYTES) stop("stderr");
      else stderr.push(chunk);
    });
    child.once("error", () => {
      if (settle()) reject(new CapabilityError("unavailable", "The Beads CLI could not be launched."));
    });
    child.once("close", code => {
      if (!settle()) return;
      if (stopped === "aborted") reject(new CapabilityError("transport", "Beads read aborted."));
      else if (stopped === "deadline") reject(new CapabilityError("transport", "Beads read exceeded its deadline."));
      else if (stopped !== undefined) reject(new CapabilityError("unavailable", `Beads read exceeded the bounded ${stopped} size.`));
      else resolve({ exit: code ?? -1, stdout: Buffer.concat(stdout).toString("utf8"), stderr: Buffer.concat(stderr).toString("utf8") });
    });
  });
}

/** One Attempt's native reference and the work id its Furnace record carries. */
export interface AttemptWork {
  readonly attempt: NativeRef;
  readonly workId: string;
}
/** The (Attempt, work id) pairs a Furnace topology's Attempt snapshots carry (FurnaceObserver.projectionTopology puts the
 * record's work id in trace.correlationIds.workId); a snapshot of any other provider or type, or without that id, yields none. */
export function attemptWorkOf(snapshots: readonly NativeSnapshot[]): AttemptWork[] {
  return snapshots.flatMap(snapshot => {
    const workId = snapshot.trace?.correlationIds?.workId;
    return snapshot.source.provider === "furnace" && snapshot.source.type === "attempt" && typeof workId === "string" ? [{ attempt: { ...snapshot.source }, workId }] : [];
  });
}

/** What one wiring call did, as counts (no id or text from the reading is echoed). */
export interface BeadsWorkWiring {
  /** Whether the grant set held BEADS_INSPECT_GRANT; when it did not, nothing was read and the projection is untouched. */
  readonly granted: boolean;
  /** The distinct work ids the Attempts name. */
  readonly offered: number;
  /** Ids whose reading the projection applied, with its relations and the Attempts' edges. */
  readonly resolved: number;
  /** Ids whose reading the projection did not apply (it holds a later reading of that Work): no relation stated. */
  readonly superseded: number;
  /** Ids whose read failed: each Work ref was marked stale, no node was invented. */
  readonly stale: number;
  /** Ids outside the reader's grammar: never read, never marked. */
  readonly refused: number;
  /** Ids in the grammar past BEADS_WIRING_MAX_WORK: counted, never read. */
  readonly remainder: number;
}
export interface BeadsWorkWiringOptions {
  readonly projection: ObservationProjection;
  readonly scope: ObservationScope;
  readonly grants: readonly string[];
  readonly client: BeadsReadClient;
  readonly attempts: readonly AttemptWork[];
  readonly now: () => string;
  readonly signal?: AbortSignal;
}

/** Resolve the Attempts' work ids into Beads Work nodes on the projection, under the exact grant (see the module comment). */
export async function observeAttemptWork(options: BeadsWorkWiringOptions): Promise<BeadsWorkWiring> {
  const { projection, scope, grants, client, attempts, now, signal } = options;
  const ids = [...new Set(attempts.map(entry => entry.workId))];
  if (!grants.includes(BEADS_INSPECT_GRANT)) return { granted: false, offered: ids.length, resolved: 0, superseded: 0, stale: 0, refused: 0, remainder: 0 };
  const admissible = ids.filter(id => typeof id === "string" && WORK_ID.test(id));
  const admitted = admissible.slice(0, BEADS_WIRING_MAX_WORK);
  let resolved = 0;
  let superseded = 0;
  let stale = 0;
  for (const workId of admitted) {
    const work: NativeRef = { provider: "beads", type: "work", id: workId, scope: scope.workspace };
    let projected: BeadsWorkProjection;
    let observedAt: string;
    try {
      const reading = await readBeadsWork(client, { workId, workspaceRoot: scope.workspace, scope, limits: BEADS_WIRING_LIMITS, now, ...(signal === undefined ? {} : { signal }) });
      projected = projectBeadsWork(reading, scope);
      observedAt = reading.observedAt;
    } catch {
      projection.markStale({ scope, ref: work });
      stale += 1;
      continue;
    }
    if (projection.refresh(projected.snapshot) !== "applied") {
      superseded += 1;
      continue;
    }
    for (const relation of projected.relations) projection.relate(relation);
    for (const entry of attempts) {
      if (entry.workId !== workId) continue;
      projection.relate({ scope: { ...scope }, from: { ...entry.attempt }, to: { ...work }, kind: "causation", provenance: { source: "furnace", observedAt, nativeConfirmationRef: workId } });
    }
    resolved += 1;
  }
  return { granted: true, offered: ids.length, resolved, superseded, stale, refused: ids.length - admissible.length, remainder: admissible.length - admitted.length };
}
