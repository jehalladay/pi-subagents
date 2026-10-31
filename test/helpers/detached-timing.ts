/**
 * Strict timing markers for the detached-* suites that drive REAL host processes (wb-maza; owner R721, R723).
 *
 * Under a loaded parallel full run these suites redded with no strict marker. The landing judge then cannot route the
 * red through the R609 serial leg or the register, and each instance costs an owner round-trip. The measured reds take
 * three shapes, and this module turns each one into a failure that NAMES its lapse with a strict marker the judge reads
 * ("... exceeded ... timeout"). vitest's own "Test timed out in <N>ms" stays the outer bound of every row.
 *  1. A test-side poll that gave up after a fixed count and fell through to a later read or assertion (the ENOENT
 *     receipt.json red): pollFor has a budget instead, and a lapse THROWS naming what it waited for.
 *  2. The launcher's fixed handshake poll lapsing: launchDetachedMarked rethrows it re-labelled.
 *  3. A host command's fixed socket timeout lapsing. A verb throws it, and inspect folds it into an unknown reading:
 *     connectDetachedMarked rethrows the first and raises the second, re-labelled.
 * Every other failure passes through unchanged, so a real defect still reds as itself, and the serial leg still judges
 * every timing red. This is test-side only: the product's bounds and messages are untouched, and
 * test/workbench-detached-timing.test.ts pins the two sentences against src/workbench/hosts/local-detached.ts.
 * vitest's own wait helpers are not used: vi.waitFor, vi.waitUntil and expect.poll lapse as "Timed out in waitFor!",
 * "Timed out in waitUntil!" or an AssertionError, and the judge reads none of them as a strict marker.
 */
import {
  connectDetachedWorkflow,
  type DetachedLaunchRequest,
  type DetachedReceipt,
  type DetachedSnapshot,
  type DetachedSocketPlacement,
  launchDetachedWorkflow,
} from "../../src/workbench/hosts/local-detached.js";

/** How often pollFor re-reads (ms): the cadence every detached-* poll had before this cure. */
export const POLL_MS = 20;
/** pollFor's default budget (ms): above the 2-5 s fixed counts it replaces, and below the 30 s timeout of the rows
 * that drive hosts, so a lapse names its wait before vitest's own test timeout would end the row. */
export const WAIT_BUDGET_MS = 20_000;
/** The timeout of a hook that waits on hosts (ms): its own pollFor lapse, and the cleanup run before that lapse is
 * reported, land before vitest's hook timeout would end it. */
export const HOST_HOOK_TIMEOUT_MS = WAIT_BUDGET_MS + 10_000;

/** The product's two fixed-bound lapse sentences, verbatim, each with the bound it reports as exceeded. */
export const DETACHED_TIMING_LAPSES = {
  handshake: {
    sentence: "Detached handshake timed out; invocation reserved and effects unknown. Do not automatically retry.",
    lapse: "the launcher's fixed handshake poll exceeded its timeout",
  },
  transport: {
    sentence: "Detached transport timeout; effects may be unresolved.",
    lapse: "a host command exceeded its fixed socket timeout",
  },
} as const;

/** A lapsed wait bound, named with the strict marker. A plain Error, never an AssertionError, since the judge reads no
 * marker inside an AssertionError. */
export class DetachedTimingLapse extends Error {
  override readonly name = "DetachedTimingLapse";
}

function lapseIn(text: string): (typeof DETACHED_TIMING_LAPSES)[keyof typeof DETACHED_TIMING_LAPSES] | undefined {
  return Object.values(DETACHED_TIMING_LAPSES).find(entry => text.includes(entry.sentence));
}

/** `error` re-labelled when its message carries one of the product's lapse sentences: a DetachedTimingLapse naming
 * `site` and the exceeded bound, the sentence verbatim, `error` as its cause. Any other value is returned as it is. */
export function markTimingLapse(site: string, error: unknown): unknown {
  if (!(error instanceof Error) || error instanceof DetachedTimingLapse) return error;
  const lapse = lapseIn(error.message);
  return lapse === undefined ? error : new DetachedTimingLapse(`${site}: ${lapse.lapse}: ${lapse.sentence}`, { cause: error });
}

/** `call`'s value, or its rejection with a lapse re-labelled (markTimingLapse). */
export async function marked<T>(site: string, call: () => Promise<T>): Promise<T> {
  try {
    return await call();
  } catch (error) {
    throw markTimingLapse(site, error);
  }
}

/** `reading` as read, unless it is the client's own unknown for a lapsed socket timeout (inspect folds a transport
 * failure into an unknown reading), which is raised as the lapse it is. A host that is gone (a refused connect, an
 * absent socket) stays a reading: the suites assert on it. */
export function raiseTransportLapse<T extends { readonly source?: unknown; readonly diagnostic?: unknown }>(site: string, reading: T): T {
  const { transport } = DETACHED_TIMING_LAPSES;
  if (reading.source === "local-client-transport" && typeof reading.diagnostic === "string" && reading.diagnostic.includes(transport.sentence)) {
    throw new DetachedTimingLapse(`${site}: ${transport.lapse}: ${transport.sentence}`);
  }
  return reading;
}

/** A window held open for `ms` under the test's own control. It is never a wait for a condition, which is pollFor. */
export function holdOpen(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

/** Read until `done` holds and return that reading, re-reading every POLL_MS. A lapse of `budgetMs` THROWS a
 * DetachedTimingLapse naming `what` ("<what> exceeded its <N> ms wait timeout"), never a fall-through to a later read
 * or assertion. A read that throws ends the wait with that error. */
export async function pollFor<T>(what: string, read: () => T | Promise<T>, done: (reading: T) => boolean, budgetMs = WAIT_BUDGET_MS): Promise<T> {
  const deadline = performance.now() + budgetMs;
  let reading = await read();
  while (!done(reading)) {
    if (performance.now() >= deadline) throw new DetachedTimingLapse(`${what} exceeded its ${budgetMs} ms wait timeout`);
    await holdOpen(POLL_MS);
    reading = await read();
  }
  return reading;
}

/** What a launch rejects with, for a row to compare, or undefined when it succeeds. A lapse is rethrown instead: it is
 * never a refusal a row compares, because inside an AssertionError the judge reads no marker. */
export async function refusalOf(launch: Promise<unknown>): Promise<unknown> {
  try {
    await launch;
    return undefined;
  } catch (error) {
    if (error instanceof DetachedTimingLapse) throw error;
    return error;
  }
}

/** Settle every wait, run `cleanup` once, and only then report the first rejection. A hook's cleanup never waits on a
 * lapse it will report, and never runs while a wait is still pending. */
export async function reportAfterCleanup(waits: readonly Promise<unknown>[], cleanup: () => void): Promise<void> {
  const settled = await Promise.allSettled(waits);
  cleanup();
  const lapse = settled.find((outcome): outcome is PromiseRejectedResult => outcome.status === "rejected");
  if (lapse !== undefined) throw lapse.reason;
}

/** launchDetachedWorkflow with a lapse re-labelled: the launcher's handshake poll, or the hello's socket timeout.
 * `launch` is the product's own; a row that plants a lapse passes a stand-in. */
export function launchDetachedMarked(request: DetachedLaunchRequest, placement?: DetachedSocketPlacement, launch: typeof launchDetachedWorkflow = launchDetachedWorkflow): Promise<DetachedReceipt> {
  return marked(`launch of ${request.invocationId}`, () => launch(request, placement));
}

/** connectDetachedWorkflow with every verb's socket-timeout lapse re-labelled, inspect's folded one included.
 * `connect` is the product's own; a row that plants a lapse passes a stand-in. */
export function connectDetachedMarked(root: string, id: string, connect: typeof connectDetachedWorkflow = connectDetachedWorkflow) {
  const handle = connect(root, id);
  return {
    inspect: (): Promise<DetachedSnapshot> => marked(`inspect of ${id}`, async () => raiseTransportLapse(`inspect of ${id}`, await handle.inspect())),
    execute: (): Promise<{ started: boolean }> => marked(`execute of ${id}`, () => handle.execute()),
    cancel: (reason: string): Promise<{ accepted: boolean; terminalConfirmed: boolean }> => marked(`cancel of ${id}`, () => handle.cancel(reason)),
    shutdown: (reason: string): Promise<{ accepted: boolean; unresolvedEffects: boolean }> => marked(`shutdown of ${id}`, () => handle.shutdown(reason)),
  };
}
