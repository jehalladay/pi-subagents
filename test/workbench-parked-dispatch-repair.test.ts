/**
 * wb-e9rw [MII REPAIR]: the parked-beforeDispatch skip/retry repair at the Claude host seam (src/workbench/claude-host.ts),
 * legs EAT-R213, EAT-R214 and EAT-R253, with EAT-R413 as the gate leg.
 *
 * Requirement text, quoted (the program trees stay master-only; read at pi-subagents master 53ac7f35):
 *  - EAT-R253 (mechanical-native-interoperability-2026-11-09, requirements/ATOMIC-REQUIREMENTS.md): "Pi MUST honor a
 *    per-agent skip or retry issued while `beforeDispatch` is parked (the witnessed wb-9v02 defect), so the pending cancel
 *    takes effect at the exact barrier and no late SDK query starts; this repair MUST land before any effectful function
 *    dispatch is enabled." AC3: "The repair takes the pending-abort-state shape required by prior EAT-R160, following only
 *    the reproduced red."
 *  - EAT-R160 (mechanical-interoperability-audit-2026-11-06, triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md): "(a) store
 *    pending per-agent abort state before `beforeDispatch` is awaited and (b) re-check it after the barrier so that no SDK
 *    query is issued for a skipped agent, while the F10 run-signal control and the one-call no-abort control stay green."
 *    Acceptance: "with `host.abortAgent("wf-agent-1")` issued while beforeDispatch is parked and then released,
 *    `sdk.calls` has length 0 and the settlement is `{ok:false, skipped:true}`".
 *  - EAT-R213 AC2: "Assert pending per-agent abort state survives the awaited barrier; mutating away the post-barrier
 *    per-agent check makes the R015 oracle fail while F10 workflow-wide abort and one-call no-control remain green."
 *  - EAT-R214 AC1: "the original attempt has zero SDK starts, the replacement has at most one start, and no later attempt
 *    starts without a new authorized retry."
 *  - EAT-R413 (mechanical-interop-integrity-2026-11-10): "Every effectful function arm, including a newly independent
 *    dispatch path, MUST remain gated on the source-pinned EAT-R213 / R214 / R253 repair receipt plus this EAT-R413 gate".
 * The witnessed red is wb-9v02's experiment (test/helpers/parked-dispatch-experiment.ts), whose live cells in
 * test/workbench-mwi-cancel-repro.test.ts this bead turns to the repaired readings through the runtime's own skip() and
 * retry(). This file pins the same repair at the host seam alone: the real createClaudeWorkflowHost driven directly through
 * its fixture query seam (FakeClaudeSdk), as the F10 suite of test/workbench-claude-cancel-faults.test.ts drives it. Every
 * wait is on a promise the fixture itself settles; no timer is armed. The receipt is docs/workbench/receipts/wb-e9rw.md.
 *
 * PINNED READER SET (every case of this file; each title names its case id before its claim):
 * - PR-SKIP-SPAWN: an abortAgent naming a fresh spawn while its beforeDispatch is parked, then the release: the fixture SDK
 *   records no query() and the spawn settles {ok:false, skipped:true, error:"Claude SDK query was cancelled."}.
 * - PR-SKIP-RESUME: the same abort at a resume of a completed session: no query beyond the origin's one, the same settlement.
 * - PR-NEXT-ATTEMPT: after an attempt stopped that way, the next attempt on the same agent id (the runtime's replacement: a
 *   spawn after a spawn, a resume after a resume) issues exactly one query and settles ok.
 * - PR-RUN-ABORT-FIRST: a run abort beside the per-agent abort, both while parked: no query, and the settlement is the F10
 *   one, {ok:false, skipped:true, error:"Workflow aborted."}. It passes before the repair too: it guards the order of the
 *   two checks after the await, not the repair itself.
 * - PR-BARRIER-EXIT: an attempt that ended at the barrier, refused by beforeDispatch or stopped there by a per-agent abort,
 *   leaves no controller behind: an abortAgent during a later resume's session lookup is still taken, and that resume
 *   settles {ok:false, skipped:true, error:"Claude SDK resume cancelled before query start."} with no query.
 * - PR-NO-ABORT (the positive control): the same parked spawn and resume with no abort each issue exactly one query and
 *   settle ok, so the zero counts above are the host's, not the fixture's.
 *
 * NOT CLAIMED by this file: the runtime's skip() and retry() surface (the live cells of
 * test/workbench-mwi-cancel-repro.test.ts read it over this host); the registered workflow_execute function route
 * (EAT-R253's V3 leg and EAT-R413 criteria 2 and 3: no function dispatch path exists at this tree, which still refuses
 * `kind: function` as unsupported-definition-kind); an abort issued at any other seam (the session lookup is read only as
 * PR-BARRIER-EXIT's probe); native SDK teardown; and production reachability of the parked window (both registered
 * beforeDispatch producers are synchronous at this tree).
 */
import { fileURLToPath } from "node:url";
import type { SDKSessionInfo } from "@anthropic-ai/claude-agent-sdk";
import { afterEach, describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowHost, WorkflowSpawnRequest, WorkflowSpawnResult } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";

/** claude-host.ts: every path that reports an SDK query the host stopped (the cancel-faults suite's CANCELLED). */
const CANCELLED = "Claude SDK query was cancelled.";
/** claude-host.ts: the post-await refusal a run abort produces (the F10 settlement). */
const WORKFLOW_ABORTED = "Workflow aborted.";
/** claude-host.ts: a resume stopped while its session lookup was pending. */
const LOOKUP_CANCELLED = "Claude SDK resume cancelled before query start.";
/** The refusal PR-BARRIER-EXIT's beforeDispatch throws. */
const REFUSED = "basis re-check refused this attempt";

/** Absolute and present, as the host requires; the fixture SDK never reads it. */
const CWD = fileURLToPath(new URL("..", import.meta.url));

const fakes: FakeClaudeSdk[] = [];
const runs: AbortController[] = [];
afterEach(() => {
  for (const fake of fakes.splice(0)) fake.release();
  for (const run of runs.splice(0)) run.abort();
});

/** A fixture SDK whose every query reports its session (the resumed one, when resuming) and answers at once. */
function answeringSdk(): FakeClaudeSdk {
  const sdk = new FakeClaudeSdk({
    script: call => {
      call.push(...sdkSuccess(call.options.resume ?? `sdk-repair-${call.index}`, `answer ${call.index}`));
      call.end();
    },
  });
  fakes.push(sdk);
  return sdk;
}

function runSignal(): AbortController {
  const run = new AbortController();
  runs.push(run);
  return run;
}

function spawn(agentId: string, index: number): WorkflowSpawnRequest {
  return { agentId, index, prompt: `prompt for ${agentId}`, label: agentId, agentType: "general-purpose" };
}

/** A session the fixture store holds, for the resume path's lookup. */
function stored(sessionId: string): SDKSessionInfo {
  return { sessionId, summary: "parked-dispatch repair fixture session", lastModified: 0 };
}

/**
 * Counted entries, holding the ones whose 1-based ordinals are given: enter() returns undefined for every other entry, and
 * for a held one a promise that settles when that ordinal is released. parked() resolves once a held entry is waiting.
 */
function holds(...held: number[]) {
  let entries = 0;
  const releases = new Map<number, () => void>();
  const arrivals = new Map<number, Promise<void>>();
  const arrive = new Map<number, () => void>();
  for (const ordinal of held) arrivals.set(ordinal, new Promise<void>(resolve => arrive.set(ordinal, resolve)));
  return {
    enter: (): Promise<void> | undefined => {
      entries += 1;
      const ordinal = entries;
      if (!held.includes(ordinal)) return undefined;
      return new Promise<void>(resolve => {
        releases.set(ordinal, resolve);
        arrive.get(ordinal)?.();
      });
    },
    parked(ordinal: number): Promise<void> {
      const arrival = arrivals.get(ordinal);
      if (arrival === undefined) throw new Error(`entry ${ordinal} is not held`);
      return arrival;
    },
    release(ordinal: number): void {
      const release = releases.get(ordinal);
      if (release === undefined) throw new Error(`entry ${ordinal} is not parked`);
      release();
    },
    entries: (): number => entries,
  };
}

/** The host's resumeAgent; the Claude host always carries one. */
function resume(host: WorkflowHost, agentId: string, prompt: string): Promise<WorkflowSpawnResult> {
  if (host.resumeAgent === undefined) throw new Error("the Claude host carries no resumeAgent");
  return host.resumeAgent(agentId, prompt);
}

describe("wb-e9rw EAT-R213/R214/R253: a per-agent abort that lands while the host's beforeDispatch is parked (the EAT-R160 pending-abort shape)", () => {
  it("PR-SKIP-SPAWN abortAgent issued while a fresh spawn is parked in beforeDispatch, then released: no SDK query, settled skipped as a cancelled query", async () => {
    const sdk = answeringSdk();
    const dispatch = holds(1);
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query, beforeDispatch: dispatch.enter });
    const settled = host.spawnAgent(spawn("wf-agent-1", 1));
    await dispatch.parked(1);

    host.abortAgent("wf-agent-1");
    dispatch.release(1);

    expect(await settled).toEqual({ ok: false, skipped: true, error: CANCELLED });
    expect(sdk.calls).toHaveLength(0);
    expect(dispatch.entries()).toBe(1);
  });

  it("PR-SKIP-RESUME the same abort on a resume parked in beforeDispatch: no query beyond the origin's one, settled skipped as a cancelled query", async () => {
    const sdk = answeringSdk();
    const dispatch = holds(2);
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query, beforeDispatch: dispatch.enter, getSession: async sessionId => stored(sessionId) });
    expect(await host.spawnAgent(spawn("wf-agent-0", 0))).toMatchObject({ ok: true, text: "answer 0", sessionId: "sdk-repair-0" });

    const resumed = resume(host, "wf-agent-0", "continue");
    await dispatch.parked(2);
    host.abortAgent("wf-agent-0");
    dispatch.release(2);

    expect(await resumed).toEqual({ ok: false, skipped: true, error: CANCELLED });
    expect(sdk.calls).toHaveLength(1);
    expect(dispatch.entries()).toBe(2);
  });

  it("PR-NEXT-ATTEMPT the attempt after one stopped at the barrier, on the same agent id, issues exactly one query and settles ok, after a spawn and after a resume", async () => {
    const spawnSdk = answeringSdk();
    const spawnDispatch = holds(1);
    const spawnHost = createClaudeWorkflowHost({ cwd: CWD, query: spawnSdk.query, beforeDispatch: spawnDispatch.enter });
    const original = spawnHost.spawnAgent(spawn("wf-agent-1", 1));
    await spawnDispatch.parked(1);
    spawnHost.abortAgent("wf-agent-1");
    spawnDispatch.release(1);
    expect(await original).toEqual({ ok: false, skipped: true, error: CANCELLED });
    expect(await spawnHost.spawnAgent(spawn("wf-agent-1", 1))).toMatchObject({ ok: true, text: "answer 0", sessionId: "sdk-repair-0" });
    expect(spawnSdk.calls.map(call => call.prompt)).toEqual(["prompt for wf-agent-1"]);

    const resumeSdk = answeringSdk();
    const resumeDispatch = holds(2);
    const resumeHost = createClaudeWorkflowHost({ cwd: CWD, query: resumeSdk.query, beforeDispatch: resumeDispatch.enter, getSession: async sessionId => stored(sessionId) });
    expect(await resumeHost.spawnAgent(spawn("wf-agent-0", 0))).toMatchObject({ ok: true, sessionId: "sdk-repair-0" });
    const stopped = resume(resumeHost, "wf-agent-0", "continue");
    await resumeDispatch.parked(2);
    resumeHost.abortAgent("wf-agent-0");
    resumeDispatch.release(2);
    expect(await stopped).toEqual({ ok: false, skipped: true, error: CANCELLED });
    expect(await resume(resumeHost, "wf-agent-0", "again")).toMatchObject({ ok: true, text: "answer 1", sessionId: "sdk-repair-0" });
    expect(resumeSdk.calls.map(call => call.prompt)).toEqual(["prompt for wf-agent-0", "again"]);
  });

  it("PR-RUN-ABORT-FIRST a run abort beside a per-agent abort, both while parked: no SDK query, settled as the F10 run abort (Workflow aborted.)", async () => {
    const sdk = answeringSdk();
    const run = runSignal();
    const dispatch = holds(1);
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query, signal: run.signal, beforeDispatch: dispatch.enter });
    const settled = host.spawnAgent(spawn("wf-agent-1", 1));
    await dispatch.parked(1);

    host.abortAgent("wf-agent-1");
    run.abort();
    dispatch.release(1);

    expect(await settled).toEqual({ ok: false, skipped: true, error: WORKFLOW_ABORTED });
    expect(sdk.calls).toHaveLength(0);
  });

  it("PR-BARRIER-EXIT an attempt that ended at the barrier (refused by beforeDispatch, or stopped there by abortAgent) leaves no controller: a later resume's lookup-window abort is still taken, with no query", async () => {
    // Refused at the barrier: the second beforeDispatch entry (the first resume) throws.
    const refusedSdk = answeringSdk();
    let refusedEntries = 0;
    const refusedLookup = holds(2);
    const refusedHost = createClaudeWorkflowHost({
      cwd: CWD,
      query: refusedSdk.query,
      beforeDispatch: () => {
        refusedEntries += 1;
        if (refusedEntries === 2) throw new Error(REFUSED);
      },
      getSession: async sessionId => {
        await refusedLookup.enter();
        return stored(sessionId);
      },
    });
    expect(await refusedHost.spawnAgent(spawn("wf-agent-0", 0))).toMatchObject({ ok: true, sessionId: "sdk-repair-0" });
    expect(await resume(refusedHost, "wf-agent-0", "continue")).toEqual({ ok: false, error: REFUSED });
    const afterRefusal = resume(refusedHost, "wf-agent-0", "again");
    await refusedLookup.parked(2);
    refusedHost.abortAgent("wf-agent-0");
    refusedLookup.release(2);
    expect(await afterRefusal).toEqual({ ok: false, skipped: true, error: LOOKUP_CANCELLED });
    expect(refusedSdk.calls).toHaveLength(1);
    expect(refusedEntries).toBe(2);

    // Stopped at the barrier: the first resume parks in beforeDispatch and takes the abort there.
    const stoppedSdk = answeringSdk();
    const stoppedDispatch = holds(2);
    const stoppedLookup = holds(2);
    const stoppedHost = createClaudeWorkflowHost({
      cwd: CWD,
      query: stoppedSdk.query,
      beforeDispatch: stoppedDispatch.enter,
      getSession: async sessionId => {
        await stoppedLookup.enter();
        return stored(sessionId);
      },
    });
    expect(await stoppedHost.spawnAgent(spawn("wf-agent-0", 0))).toMatchObject({ ok: true, sessionId: "sdk-repair-0" });
    const stopped = resume(stoppedHost, "wf-agent-0", "continue");
    await stoppedDispatch.parked(2);
    stoppedHost.abortAgent("wf-agent-0");
    stoppedDispatch.release(2);
    expect(await stopped).toEqual({ ok: false, skipped: true, error: CANCELLED });
    const afterStop = resume(stoppedHost, "wf-agent-0", "again");
    await stoppedLookup.parked(2);
    stoppedHost.abortAgent("wf-agent-0");
    stoppedLookup.release(2);
    expect(await afterStop).toEqual({ ok: false, skipped: true, error: LOOKUP_CANCELLED });
    expect(stoppedSdk.calls).toHaveLength(1);
    expect(stoppedDispatch.entries()).toBe(2);
  });

  it("PR-NO-ABORT control: the same parked spawn and parked resume with no abort each issue exactly one query and settle ok", async () => {
    const sdk = answeringSdk();
    const dispatch = holds(1, 2);
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query, beforeDispatch: dispatch.enter, getSession: async sessionId => stored(sessionId) });
    const spawned = host.spawnAgent(spawn("wf-agent-0", 0));
    await dispatch.parked(1);
    dispatch.release(1);
    expect(await spawned).toMatchObject({ ok: true, text: "answer 0", sessionId: "sdk-repair-0" });
    expect(sdk.calls).toHaveLength(1);

    const resumed = resume(host, "wf-agent-0", "continue");
    await dispatch.parked(2);
    dispatch.release(2);
    expect(await resumed).toMatchObject({ ok: true, text: "answer 1", sessionId: "sdk-repair-0" });
    expect(sdk.calls).toHaveLength(2);
  });
});
