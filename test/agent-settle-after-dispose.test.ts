/**
 * wb-nagx (DX P13; pi-system-dx-triage-2026-11-11, claim C023): EAT-R476 criterion 1, settling an in-flight agent after
 * the session that started it was disposed.
 *
 * EAT-R476 (requirements/.work/req-r-followon.md at Pi master 0a5ac3a3): "Settling an in-flight agent after session
 * disposal MUST produce no unhandled rejection or callback access through the disposed extension context." Criterion 1:
 * "both success and rejected agent settlement after disposal yield zero unhandledRejection events and zero accesses to the
 * stale ctx notify/ui getters." The triage baseline (probes/agents/out/p15-run.log at pin ce180d82) records the rejected
 * half: an agent stopped by session_shutdown settled through the manager's error path after pi had invalidated the
 * extension, the completion callback read the stale pi (src/index.ts onComplete, pi.events) and the throw surfaced as an
 * unhandled rejection.
 *
 * THE RULE THESE CASES PIN (src/agent-manager.ts): a run that settles after AgentManager.dispose() has returned reaches no
 * completion callback, on either settle path. D1 pins the error path at the manager; D3 pins the success path end to end
 * through the real print-mode host (test/helpers/print-mode-runner.ts), whose dispose() emits session_shutdown, in which the
 * extension disposes its manager, before session.dispose() invalidates the extension.
 *
 * PINNED READER SET (case id: what it asserts; the falsifier that turns it red):
 *  D1 rejected path, AgentManager with the real runAgent and a host double: a background run held inside runAgent's first
 *     host call (pi.exec, from detectEnv), then stopped by abortAll(), the manager disposed and the host double made stale,
 *     rejects at runAgent's next host read. Reading: status "stopped", the record's error the stale message (the error
 *     path), the record promise resolved "", zero completion-callback calls, the stale reads exactly ["getSystemPrompt"]
 *     (runAgent's own read, the rejection's cause; no read of the host's events or ui member) and zero unhandled
 *     rejections. Falsifier: a settleRun that calls the completion callback after dispose() (the base): one callback call,
 *     a stale "events" read, the promise rejected and one unhandled rejection.
 *  D2 control for D1: the same run rejecting before any dispose() (the live host refuses runAgent's read) reaches the
 *     completion callback once, with status "error", and the callback reads the live host's events member.
 *  D3 success path, end to end through the real print-mode host (faux model): a background agent whose child turn is held
 *     until after the run's dispose() settles "stopped" through the success path (no record error) and its record promise
 *     resolves; from the release through the settle no guard of the disposed parent extension throws (its runner's
 *     assertActive and its runtime's, the guards pi's ctx getters and API members call), and zero unhandled rejections are
 *     seen. Falsifier: the base, where the completion callback's pi.events read throws through the runtime guard.
 *  D4 control for D3: the same flow with the child released before dispose() reaches the completion callback: the
 *     runtime guard is called at least once between the release and the settle, and none of those calls throws.
 *
 * NOT CLAIMED by this file: EAT-R476 criteria 2 (the mention-clone fallback chain in src/index.ts) and 3
 * (test/subagents-print-mode-e2e.test.ts disposing while an agent is pending); a rejected settlement end to end through
 * the print-mode host (D1 pins that path at the manager, with a host double); a run that settles while dispose() is still
 * running, and so whether dispose() marks itself before or after it awaits child-session shutdowns (no case settles a run
 * inside dispose()); a host that invalidates the extension without emitting session_shutdown first; onStart and onCompact
 * after dispose(); a completion callback that throws while the session is live (the error path leaves that throw
 * unguarded, as before); EAT-R471 to EAT-R475 and EAT-R477.
 *
 * Display paths added: none.
 */
import { type Context, getCurrentTools } from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import { AgentManager } from "../src/agent-manager.js";
import type { AgentRecord } from "../src/types.js";
import { agentCall, agentToolResults, type FauxReply, runPrintMode } from "./helpers/print-mode-runner.js";

vi.setConfig({ testTimeout: 60_000 });

const STALE_MESSAGE = "This extension ctx is stale (host double)";

interface Deferred<T> {
  readonly promise: Promise<T>;
  readonly resolve: (value: T) => void;
}
function deferred<T = void>(): Deferred<T> {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(settle => {
    resolve = settle;
  });
  return { promise, resolve };
}

/** A promise's settlement as a reading: "resolved <value>" or "rejected <message>" (attaching it handles the promise). */
const settlementOf = (pending: Promise<unknown>): Promise<string> =>
  pending.then(
    value => `resolved ${String(value)}`,
    (error: unknown) => `rejected ${error instanceof Error ? error.message : String(error)}`,
  );

/**
 * The unhandled rejections seen while `body` runs and one macrotask after it (Node reports them after the microtask queue
 * drains). Vitest installs its own listener, so the existing listeners are lifted for the block and put back after it.
 */
async function unhandledDuring(body: () => Promise<void>): Promise<unknown[]> {
  const seen: unknown[] = [];
  const prior = process.listeners("unhandledRejection");
  process.removeAllListeners("unhandledRejection");
  const capture = (reason: unknown): void => {
    seen.push(reason);
  };
  process.on("unhandledRejection", capture);
  try {
    await body();
    await new Promise(resolve => setTimeout(resolve, 20));
  } finally {
    process.off("unhandledRejection", capture);
    for (const listener of prior) process.on("unhandledRejection", listener as never);
  }
  return seen;
}

/** What a host double saw: every member read, and the member reads made while it was stale (each threw, as pi's guards do). */
interface HostReads {
  stale: boolean;
  readonly reads: string[];
  readonly staleReads: string[];
}
/** A pi or ctx double over `members`: a read of any member while `reads.stale` holds is recorded and throws. */
function hostDouble(members: Record<string, unknown>, reads: HostReads): object {
  return new Proxy(members, {
    get(target, key, receiver) {
      if (typeof key === "string") {
        reads.reads.push(key);
        if (reads.stale) {
          reads.staleReads.push(key);
          throw new Error(STALE_MESSAGE);
        }
      }
      return Reflect.get(target, key, receiver);
    },
  });
}

/** One background run on the real runAgent against a host double whose pi.exec (runAgent's first host call) is held. */
function heldRun(getSystemPrompt: () => string) {
  const reads: HostReads = { stale: false, reads: [], staleReads: [] };
  const entered = deferred();
  const release = deferred();
  const pi = hostDouble(
    {
      exec: async () => {
        entered.resolve();
        await release.promise;
        return { code: 1, stdout: "", stderr: "", killed: false };
      },
      events: { emit: () => true },
    },
    reads,
  );
  const ctx = hostDouble({ cwd: "/wb-nagx-host-double", getSystemPrompt }, reads);
  const completions: string[] = [];
  const manager = new AgentManager(record => {
    completions.push(record.status);
    // The host's own first read in its completion callback (src/index.ts onComplete emits on pi.events).
    (pi as { readonly events: { emit(name: string, data: unknown): boolean } }).events.emit("subagents:failed", { id: record.id });
  });
  const id = manager.spawn(pi as ExtensionAPI, ctx as ExtensionContext, "general-purpose", "Wait for the host.", {
    description: "settle after dispose",
    isBackground: true,
  });
  const record = manager.getRecord(id) as AgentRecord;
  return { reads, entered, release, manager, completions, record };
}

describe("wb-nagx EAT-R476 criterion 1: a run that settles after AgentManager.dispose() reaches no completion callback", () => {
  it("D1 rejected path: a run stopped by abortAll() that rejects after dispose() and the host's invalidation settles stopped through the error path with zero completion-callback calls, no stale read but runAgent's own getSystemPrompt and zero unhandled rejections", async () => {
    const run = heldRun(() => "");
    await run.entered.promise;
    let promise = "";
    const unhandled = await unhandledDuring(async () => {
      run.manager.abortAll();
      await run.manager.dispose();
      run.reads.stale = true;
      run.release.resolve();
      await new Promise(resolve => setImmediate(resolve));
    });
    promise = await settlementOf(run.record.promise ?? Promise.reject(new Error("no record promise")));
    expect({
      status: run.record.status,
      error: run.record.error,
      promise,
      completions: run.completions,
      staleReads: run.reads.staleReads,
      unhandled: unhandled.length,
    }).toEqual({ status: "stopped", error: STALE_MESSAGE, promise: "resolved ", completions: [], staleReads: ["getSystemPrompt"], unhandled: 0 });
  });

  it("D2 control: the same run rejecting before any dispose() reaches the completion callback once, with status error, and the callback reads the live host's events member", async () => {
    const run = heldRun(() => {
      throw new Error("the host refused the read");
    });
    await run.entered.promise;
    const unhandled = await unhandledDuring(async () => {
      run.release.resolve();
      await settlementOf(run.record.promise ?? Promise.reject(new Error("no record promise")));
    });
    await run.manager.dispose();
    const afterPrompt = run.reads.reads.slice(run.reads.reads.lastIndexOf("getSystemPrompt"));
    expect({ completions: run.completions, readsEvents: afterPrompt.includes("events"), staleReads: run.reads.staleReads, unhandled: unhandled.length }).toEqual({
      completions: ["error"],
      readsEvents: true,
      staleReads: [],
      unhandled: 0,
    });
  });
});

/** The guards of a disposed parent extension: its runner's (pi's ctx getters call it) and its runtime's (pi's API members call it). */
interface ExtensionGuards {
  assertActive(): void;
  readonly runtime: { assertActive(): void };
}
interface SettlingRecord {
  readonly status: string;
  readonly error?: string;
  readonly promise?: Promise<string>;
}

/** A print-mode run whose parent starts one background agent and whose child turn waits on `childGate`. */
async function heldChildRun() {
  const childEntered = deferred();
  const childGate = deferred();
  const respond = async (context: Context): Promise<FauxReply> => {
    const isParent = getCurrentTools(context.messages).some(tool => tool.name === "Agent");
    if (!isParent) {
      childEntered.resolve();
      await childGate.promise;
      return "CHILD_DONE";
    }
    const spawned = context.messages.some(message => message.role === "toolResult" && (message as { toolName?: string }).toolName === "Agent");
    return spawned ? "PARENT_DONE" : agentCall({ description: "settle after dispose", prompt: "Wait.", run_in_background: true });
  };
  const run = await runPrintMode({ prompt: "Start one background agent.", hold: false, live: false, respond });
  await childEntered.promise;
  const id = /Agent ID: (\S+)/.exec(agentToolResults(run.parentSession)[0] ?? "")?.[1] ?? "";
  const record = run.manager?.getRecord(id) as SettlingRecord | undefined;
  if (record?.promise === undefined) throw new Error("the background agent's record holds no promise");
  const guards = run.parentSession.extensionRunner as unknown as ExtensionGuards;
  return { run, childGate, record, settled: record.promise, guards };
}

const throwsOf = (...spies: { readonly mock: { readonly results: readonly { readonly type: string }[] } }[]): number =>
  spies.reduce((count, spy) => count + spy.mock.results.filter(result => result.type === "throw").length, 0);

describe("wb-nagx EAT-R476 criterion 1 end to end: the print-mode host's agent settling after dispose()", () => {
  it("D3 success path: a background agent whose child turn ends after the run's dispose() settles stopped through the success path, its promise resolves, no guard of the disposed parent extension throws through the settle and zero unhandled rejections are seen", async () => {
    const held = await heldChildRun();
    try {
      await held.run.dispose();
      const runnerGuard = vi.spyOn(held.guards, "assertActive");
      const runtimeGuard = vi.spyOn(held.guards.runtime, "assertActive");
      let promise = "";
      const unhandled = await unhandledDuring(async () => {
        held.childGate.resolve();
        promise = await settlementOf(held.settled);
        await new Promise(resolve => setImmediate(resolve));
      });
      const throws = throwsOf(runnerGuard, runtimeGuard);
      runnerGuard.mockRestore();
      runtimeGuard.mockRestore();
      expect({ status: held.record.status, error: held.record.error, resolved: promise.startsWith("resolved"), throws, unhandled: unhandled.length }).toEqual({
        status: "stopped",
        error: undefined,
        resolved: true,
        throws: 0,
        unhandled: 0,
      });
    } finally {
      held.childGate.resolve();
    }
  });

  it("D4 control: the same flow with the child released before dispose() reaches the completion callback, which reads the live pi through the runtime guard without a throw", async () => {
    const held = await heldChildRun();
    try {
      const runtimeGuard = vi.spyOn(held.guards.runtime, "assertActive");
      held.childGate.resolve();
      await settlementOf(held.settled);
      const calls = runtimeGuard.mock.calls.length;
      const throws = throwsOf(runtimeGuard);
      runtimeGuard.mockRestore();
      expect({ called: calls > 0, throws }).toEqual({ called: true, throws: 0 });
    } finally {
      held.childGate.resolve();
      await held.run.dispose();
    }
  });
});
