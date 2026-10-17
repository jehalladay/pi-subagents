/**
 * wb-5x0.1 wiring falsifier: the extension's own journal seam (src/index.ts)
 * hands the runtime appendJournal's write report, so the fail-closed refusal
 * of a non-read dispatch whose marker row did not reach the journal file is
 * live in the product, not only under the test recorders. Owner ruling Q2 on
 * the bead: "for NON-READ classes a failed pre-call append REFUSES the call
 * fail-closed with a typed error naming the append failure".
 *
 * Nothing is mocked. The first case reads the run's real journal file. The
 * second makes the real write fail: the run's journal path is occupied by a
 * directory, so the filesystem refuses the append (EISDIR) inside the real
 * appendJournal, called through the real seam. That is the respin ruling's
 * honest fault route; no stub decides whether the row was written.
 *
 * Run ids are random, so the occupation needs a hook, and it goes through the
 * host's DI seam: the context double's session-id accessor. runWorkflowTask
 * reads the session id once the run's script is on disk and before anything
 * yields, so the accessor can occupy the journal path of each script it finds
 * before the run dispatches anything. The accessor records what it occupied,
 * so the case proves the arrangement happened, and for which run.
 *
 * The script calls a capability the registry does not declare, so its
 * current effect class is undefined, which the runtime treats as non-read
 * (wb-tu1 F3). A dispatched call then fails in the registry with its own
 * unknown-capability error; a refused one never gets that far.
 */

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { readJournal } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; vi.restoreAllMocks(); });

const SCRIPT = 'export const meta={name:"dispatch-probe",description:"node"}; return await node("effect.write", { value: "x" });';
const SESSION_ID = "s1";

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 400; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

/**
 * A session-id accessor for the context double that, on every call, occupies
 * the journal path of each run script already in the session's task directory
 * with an empty directory, and records the run ids it occupied.
 */
function occupyingJournalPaths(cwd: string, occupied: string[]) {
  return vi.fn(() => {
    const dir = sessionTaskDir(cwd, SESSION_ID);
    for (const name of readdirSync(dir)) {
      const runId = /^(wf_[a-z0-9]+)\.workflow\.js$/.exec(name)?.[1];
      if (runId === undefined || existsSync(join(dir, `${runId}.workflow.jsonl`))) continue;
      mkdirSync(join(dir, `${runId}.workflow.jsonl`));
      occupied.push(runId);
    }
    return SESSION_ID;
  });
}

/**
 * Boot the real extension under the Claude backend and run SCRIPT to its end
 * through SubagentWorkflow. `sessionManager` replaces the context double's
 * session manager when a case needs to arrange the filesystem through it.
 */
async function runThroughExtension(sessionManager?: (cwd: string) => Record<string, unknown>) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:observe"] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context: ExtensionContext = ctx({ cwd: sandbox.dir, ...(sessionManager ? { sessionManager: sessionManager(sandbox.dir) } : {}) });
  await pi.lifecycle.get("session_start")?.({}, context);
  const launched = await pi.tools.get("SubagentWorkflow").execute("dispatch-run", { script: SCRIPT }, undefined, undefined, context);
  const taskId = launched.details.taskId as string;
  await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId)));
  const observed = JSON.parse(textOf(await pi.tools.get("workflow_observe").execute("dispatch-observe", { taskId }, undefined, undefined, context)));
  const journalPath = join(sessionTaskDir(sandbox.dir, SESSION_ID), `${taskId}.workflow.jsonl`);
  const nodeRows = readJournal(journalPath).filter(entry => entry.kind === "node");
  return { taskId, observed, journalPath, nodeRows };
}

describe("the extension's journal seam reports a lost dispatched row (wb-5x0.1)", () => {
  it("writes the dispatched row to the run's journal file before the provider is called, then the settled row", async () => {
    const { observed, nodeRows } = await runThroughExtension();

    expect(observed.status).toBe("failed");
    expect(observed.error).toContain("Unknown or unavailable capability: effect.write");
    expect(nodeRows.map(row => row.dispatched === true)).toEqual([true, false]);
    expect(nodeRows[0]).toMatchObject({ kind: "node", index: 0, ok: false, capabilityId: "effect.write" });
    expect(nodeRows[0]).not.toHaveProperty("effectClass");
  }, 60_000);

  it("refuses the call fail-closed when the filesystem refuses that row, so the provider is never reached", async () => {
    const occupied: string[] = [];
    const { taskId, observed, journalPath, nodeRows } = await runThroughExtension(cwd => ({
      getSessionId: occupyingJournalPaths(cwd, occupied),
      getBranch: vi.fn(() => []),
    }));

    // The fault is the filesystem's, arranged for this run before it dispatched: its journal path is a directory, still empty.
    expect(occupied).toEqual([taskId]);
    expect(statSync(journalPath).isDirectory()).toBe(true);
    expect(readdirSync(journalPath)).toEqual([]);
    expect(observed.status).toBe("failed");
    expect(observed.error).toContain("node(effect.write) at position 0 was not dispatched: its dispatched journal row could not be written");
    expect(observed.error).not.toContain("Unknown or unavailable capability");
    expect(nodeRows).toEqual([]);
  }, 60_000);
});
