/**
 * wb-maza (owner R721, R723): test/helpers/detached-timing.ts, the strict timing markers of the detached-* suites.
 *
 * The owner's red-first order was "plant a slow stub to show the marker, then cure". Each row below plants the stub: a
 * reading that never becomes ready, a launch or host command that rejects with the product's own lapse sentence, or an
 * inspect that folds a socket-timeout lapse into an unknown reading. It then judges the failure the way the landing
 * judge reads a red. A strict marker is vitest's own "Test timed out in <N>ms" or "Hook timed out in <N>ms", or an error
 * line matching /exceeded.*timeout/. None of them counts inside an AssertionError. The controls show that the shapes the
 * cure replaces read marker-less: the fall-through read after a fixed-count poll (ENOENT), the product's bare lapse
 * sentences, and an AssertionError carrying the marker's words. vitest's own wait helpers lapse as "Timed out in
 * waitFor!", "Timed out in waitUntil!" or an AssertionError ("Matcher did not succeed in time."), none of them a strict
 * marker, which is why the cure carries its own.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { connectDetachedWorkflow, DetachedLaunchRequest, DetachedSnapshot, launchDetachedWorkflow } from "../src/workbench/hosts/local-detached.js";
import { redactWorkbenchText, sanitizeWorkbenchJsonText, sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import {
  connectDetachedMarked,
  DETACHED_TIMING_LAPSES,
  DetachedTimingLapse,
  HOST_HOOK_TIMEOUT_MS,
  holdOpen,
  launchDetachedMarked,
  marked,
  markTimingLapse,
  POLL_MS,
  pollFor,
  raiseTransportLapse,
  refusalOf,
  reportAfterCleanup,
  WAIT_BUDGET_MS,
} from "./helpers/detached-timing.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HANDSHAKE = DETACHED_TIMING_LAPSES.handshake.sentence;
const TRANSPORT = DETACHED_TIMING_LAPSES.transport.sentence;
/** The per-test timeout of the detached-* rows that drive real hosts. */
const HOST_TEST_TIMEOUT_MS = 30_000;

/** The strict markers as the landing judge reads them: vitest's test and hook timeout lines and /exceeded.*timeout/. */
const STRICT_MARKERS = [/\bTest timed out in \d+ms\b/, /\bHook timed out in \d+ms\b/, /exceeded.*timeout/] as const;
/** The strict marker a failure carries, or undefined. A line inside an AssertionError never counts. */
function strictMarker(error: unknown): string | undefined {
  if (!(error instanceof Error) || error.name === "AssertionError") return undefined;
  for (const line of `${error.name}: ${error.message}`.split("\n")) {
    for (const marker of STRICT_MARKERS) {
      const hit = marker.exec(line);
      if (hit) return hit[0];
    }
  }
  return undefined;
}
/** What `run` rejects with; a resolution fails the row, since every planted stub here must red. */
async function rejection(run: Promise<unknown>): Promise<unknown> {
  return run.then(
    value => {
      throw new Error(`expected a rejection, resolved ${JSON.stringify(value)}`);
    },
    (error: unknown) => error,
  );
}

describe("wb-maza: the strict-marker reading itself (controls)", () => {
  it("reads vitest's own timeout lines and an exceeded-timeout line as strict, and nothing else", () => {
    expect(strictMarker(new Error("Test timed out in 30000ms.\nIf this is a long-running test, pass a timeout value"))).toBe("Test timed out in 30000ms");
    expect(strictMarker(new Error("Hook timed out in 10000ms."))).toBe("Hook timed out in 10000ms");
    expect(strictMarker(new DetachedTimingLapse("a reading exceeded its 5 ms wait timeout"))).toBe("exceeded its 5 ms wait timeout");
    expect(strictMarker(new Error("Timed out in waitFor!"))).toBeUndefined();
    expect(strictMarker(new Error("Timed out in waitUntil!"))).toBeUndefined();
  });

  it("the shapes the cure replaces carry no strict marker: a fall-through read of an absent receipt, the bare lapse sentences, a marker inside an AssertionError", () => {
    let fallThrough: unknown;
    try {
      readFileSync(join(ROOT, "test", "never-written-wb-maza", "receipt.json"), "utf8");
    } catch (error) {
      fallThrough = error;
    }
    expect(fallThrough).toBeInstanceOf(Error);
    expect((fallThrough as Error).message).toMatch(/^ENOENT/);
    expect(strictMarker(fallThrough)).toBeUndefined();
    expect(strictMarker(new Error(HANDSHAKE))).toBeUndefined();
    expect(strictMarker(new Error(TRANSPORT))).toBeUndefined();
    let compared: unknown;
    try {
      expect("a reading exceeded its 5 ms wait timeout").toBe("Detached host exited before handshake");
    } catch (error) {
      compared = error;
    }
    expect((compared as Error).name).toBe("AssertionError");
    expect(strictMarker(compared)).toBeUndefined();
  });
});

describe("wb-maza: pollFor, a wait whose lapse throws naming the wait", () => {
  it("returns the first reading that is done, re-reading until then", async () => {
    let reads = 0;
    const value = await pollFor("a reading ready at its third read", () => ++reads, read => read >= 3, 5_000);
    expect(value).toBe(3);
    expect(reads).toBe(3);
  });

  it("a planted never-ready reading lapses at its budget with a DetachedTimingLapse naming the wait and carrying the strict marker", async () => {
    let reads = 0;
    const error = await rejection(pollFor("a planted never-ready reading", () => ++reads, () => false, 40));
    expect(error).toBeInstanceOf(DetachedTimingLapse);
    expect((error as Error).message).toBe("a planted never-ready reading exceeded its 40 ms wait timeout");
    expect(strictMarker(error)).toBe("exceeded its 40 ms wait timeout");
    expect(reads, "it re-read until the budget lapsed").toBeGreaterThan(1);
  });

  it("a reading that throws ends the wait with that error, unchanged", async () => {
    const refused = new Error("Authorization: directory must be owned by uid 0 with exact private permissions: /x.");
    expect(
      await rejection(
        pollFor(
          "a reading that refuses",
          () => {
            throw refused;
          },
          () => false,
          5_000,
        ),
      ),
    ).toBe(refused);
  });

  it("re-reads at the cadence the detached-* polls always had, and holds its default budget inside the 30 s host-row timeout", () => {
    expect(POLL_MS).toBe(20);
    expect(WAIT_BUDGET_MS).toBeGreaterThan(5_000);
    expect(WAIT_BUDGET_MS).toBeLessThan(HOST_TEST_TIMEOUT_MS);
    expect(HOST_HOOK_TIMEOUT_MS, "a host-waiting hook's own lapse, and its cleanup, land before vitest's hook timeout").toBeGreaterThan(WAIT_BUDGET_MS);
  });

  it("holdOpen holds a window open for its full length (a window the test controls, never a wait for a condition)", async () => {
    const start = performance.now();
    await holdOpen(30);
    expect(performance.now() - start).toBeGreaterThanOrEqual(29);
  });
});

describe("wb-maza: the product's two fixed-bound lapses, re-labelled with the strict marker", () => {
  it.each([
    ["handshake", HANDSHAKE, "the launcher's fixed handshake poll exceeded its timeout"],
    ["transport", TRANSPORT, "a host command exceeded its fixed socket timeout"],
  ] as const)("the %s lapse becomes a DetachedTimingLapse naming the site and the bound, the product sentence verbatim, the original as its cause", (_kind, sentence, lapse) => {
    const original = new Error(sentence);
    const relabelled = markTimingLapse("launch of pf4-graceful", original);
    expect(relabelled).toBeInstanceOf(DetachedTimingLapse);
    expect((relabelled as Error).message).toBe(`launch of pf4-graceful: ${lapse}: ${sentence}`);
    expect((relabelled as Error).cause).toBe(original);
    expect(strictMarker(relabelled)).toMatch(/^exceeded/);
  });

  it("finds a lapse sentence inside a longer failure (a reply parser's message) and leaves every other failure as it was", () => {
    const parse = new Error(`launch receipt: expected a JSON reply, received: ${HANDSHAKE}`);
    expect(markTimingLapse("launch receipt", parse)).toBeInstanceOf(DetachedTimingLapse);
    const refusal = new Error("Detached host exited before handshake; invocation reserved, do not retry automatically.");
    expect(markTimingLapse("launch of mid-bind", refusal)).toBe(refusal);
    expect(markTimingLapse("launch of x", HANDSHAKE)).toBe(HANDSHAKE);
    const already = new DetachedTimingLapse("a reading exceeded its 5 ms wait timeout");
    expect(markTimingLapse("launch of x", already)).toBe(already);
  });

  it("marked passes a value through, re-labels a lapse rejection and leaves any other rejection unchanged", async () => {
    expect(await marked("inspect of a", async () => 42)).toBe(42);
    const lapse = await rejection(
      marked("shutdown of pf4t-graceful", async () => {
        throw new Error(TRANSPORT);
      }),
    );
    expect(lapse).toBeInstanceOf(DetachedTimingLapse);
    expect((lapse as Error).message).toBe(`shutdown of pf4t-graceful: a host command exceeded its fixed socket timeout: ${TRANSPORT}`);
    const conflict = new Error("Invocation reserved-one conflicts with its existing reservation.");
    expect(
      await rejection(
        marked("launch of reserved-one", async () => {
          throw conflict;
        }),
      ),
    ).toBe(conflict);
  });

  it("raiseTransportLapse raises the client's own unknown for a lapsed socket timeout and returns every other reading as read", () => {
    const lapsed = { source: "local-client-transport", observation: "unknown", terminal: "unknown", diagnostic: TRANSPORT };
    let raised: unknown;
    try {
      raiseTransportLapse("inspect of pf4-graceful", lapsed);
    } catch (error) {
      raised = error;
    }
    expect(raised).toBeInstanceOf(DetachedTimingLapse);
    expect((raised as Error).message).toBe(`inspect of pf4-graceful: a host command exceeded its fixed socket timeout: ${TRANSPORT}`);
    // The judge's /exceeded.*timeout/ is greedy: on this line it runs on to the product sentence's own "timeout".
    expect(strictMarker(raised)).toMatch(/^exceeded its fixed socket timeout/);
    // A host that is gone is a verdict the suites assert on (the crash rows), never a lapse.
    const lost = { source: "local-client-transport", observation: "unknown", terminal: "unknown", diagnostic: "connect ECONNREFUSED /tmp/x.sock" };
    expect(raiseTransportLapse("inspect of pf4-crashed", lost)).toBe(lost);
    const live = { source: "live-detached-host", observation: "observed-terminal", terminal: "completed", diagnostic: TRANSPORT };
    expect(raiseTransportLapse("inspect of pf4-graceful", live)).toBe(live);
  });

  it("refusalOf returns a refusal for comparison but rethrows a lapse, so a lapse never reaches an assertion", async () => {
    expect(await refusalOf(Promise.resolve({ pid: 7 }))).toBeUndefined();
    const conflict = new Error("conflict");
    expect(await refusalOf(Promise.reject(conflict))).toBe(conflict);
    const lapse = markTimingLapse("launch of mid-bind", new Error(HANDSHAKE));
    expect(await rejection(refusalOf(Promise.reject(lapse)))).toBe(lapse);
  });

  it("reportAfterCleanup runs the cleanup once, after every wait settles, and only then reports the first lapse", async () => {
    const order: string[] = [];
    const lapse = new DetachedTimingLapse("the exit of host pid 1 exceeded its 5 ms wait timeout");
    const slow = holdOpen(20).then(() => {
      order.push("slow wait settled");
    });
    const reported = await rejection(
      reportAfterCleanup([Promise.reject(lapse), slow], () => {
        order.push("cleanup");
      }),
    );
    expect(reported).toBe(lapse);
    expect(order).toEqual(["slow wait settled", "cleanup"]);
    const clean: string[] = [];
    await reportAfterCleanup([Promise.resolve()], () => {
      clean.push("cleanup");
    });
    expect(clean).toEqual(["cleanup"]);
  });
});

/** A launch request whose only read field here is its id (the stand-in launchers below never look further). */
const REQUEST = { invocationId: "pf4-graceful" } as unknown as DetachedLaunchRequest;
/** A stand-in for the product's launcher that rejects with `error`. */
const rejectingLaunch = (error: Error): typeof launchDetachedWorkflow => async () => {
  throw error;
};
/** A stand-in for the product's connect whose inspect answers `reading` and whose shutdown rejects with `shutdown`. */
function standInConnect(reading: Record<string, unknown>, shutdown: Error): typeof connectDetachedWorkflow {
  return () => ({
    inspect: async () => reading as unknown as DetachedSnapshot,
    execute: async () => ({ started: true }),
    cancel: async () => ({ accepted: true, terminalConfirmed: false }),
    shutdown: async () => {
      throw shutdown;
    },
  });
}

describe("wb-maza: the marked twins wire the re-labelling into the launch and every host verb (planted lapses)", () => {
  it("launchDetachedMarked re-labels a planted handshake lapse and a planted hello socket-timeout lapse, naming the launch", async () => {
    for (const [sentence, lapse] of [
      [HANDSHAKE, "the launcher's fixed handshake poll exceeded its timeout"],
      [TRANSPORT, "a host command exceeded its fixed socket timeout"],
    ] as const) {
      const error = await rejection(launchDetachedMarked(REQUEST, undefined, rejectingLaunch(new Error(sentence))));
      expect(error).toBeInstanceOf(DetachedTimingLapse);
      expect((error as Error).message).toBe(`launch of pf4-graceful: ${lapse}: ${sentence}`);
    }
    const refused = new Error("Detached host exited before handshake; invocation reserved, do not retry automatically.");
    expect(await rejection(launchDetachedMarked(REQUEST, undefined, rejectingLaunch(refused)))).toBe(refused);
  });

  it("connectDetachedMarked raises inspect's folded socket-timeout unknown and re-labels a verb's lapse, naming the verb and the id", async () => {
    const lapsedReading = { source: "local-client-transport", observation: "unknown", terminal: "unknown", diagnostic: TRANSPORT };
    const lapsed = connectDetachedMarked("/root", "pf4t-graceful", standInConnect(lapsedReading, new Error(TRANSPORT)));
    const inspected = await rejection(lapsed.inspect());
    expect(inspected).toBeInstanceOf(DetachedTimingLapse);
    expect((inspected as Error).message).toBe(`inspect of pf4t-graceful: a host command exceeded its fixed socket timeout: ${TRANSPORT}`);
    const stopped = await rejection(lapsed.shutdown("wb-70b PF4 graceful stop"));
    expect(stopped).toBeInstanceOf(DetachedTimingLapse);
    expect((stopped as Error).message).toBe(`shutdown of pf4t-graceful: a host command exceeded its fixed socket timeout: ${TRANSPORT}`);
    const lostReading = { source: "local-client-transport", observation: "unknown", terminal: "unknown", diagnostic: "connect ECONNREFUSED /tmp/x.sock" };
    const refusedStop = new Error("Authorization: shutdown requires the shutdown permission.");
    const lost = connectDetachedMarked("/root", "pf4-crashed", standInConnect(lostReading, refusedStop));
    expect(await lost.inspect()).toEqual(lostReading);
    expect(await rejection(lost.shutdown("stop"))).toBe(refusedStop);
  });
});

describe("wb-maza: the lapse sentences are the product's own and survive every path the suites read them through", () => {
  it.each(["handshake", "transport"] as const)("the %s sentence is thrown verbatim by src/workbench/hosts/local-detached.ts, exactly once", kind => {
    const source = readFileSync(join(ROOT, "src", "workbench", "hosts", "local-detached.ts"), "utf8");
    expect(source.split(`new Error(${JSON.stringify(DETACHED_TIMING_LAPSES[kind].sentence)})`)).toHaveLength(2);
  });

  it.each(["handshake", "transport"] as const)("the %s sentence survives the tool reply, the reply parser's terminal layout, the inspect diagnostic and the tool's inspect JSON", kind => {
    const sentence = DETACHED_TIMING_LAPSES[kind].sentence;
    expect(sanitizeWorkbenchText(sentence)).toContain(sentence);
    expect(sanitizeWorkbenchText(sentence, WORKBENCH_TEXT_LIMIT, "terminal")).toContain(sentence);
    expect(redactWorkbenchText(sentence)).toContain(sentence);
    const reading = JSON.parse(sanitizeWorkbenchJsonText({ source: "local-client-transport", diagnostic: redactWorkbenchText(sentence) }, 4096)) as { diagnostic: string };
    expect(reading.diagnostic).toContain(sentence);
  });
});
