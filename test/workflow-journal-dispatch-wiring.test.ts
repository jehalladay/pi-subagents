/**
 * wb-5x0.1 wiring falsifier: the extension's own journal seam (src/index.ts)
 * hands the runtime appendJournal's write report, so the fail-closed refusal
 * of a non-read dispatch whose marker row did not reach the journal file is
 * live in the product, not only under the test recorders. Owner ruling Q2 on
 * the bead: "for NON-READ classes a failed pre-call append REFUSES the call
 * fail-closed with a typed error naming the append failure".
 *
 * The script calls a capability the registry does not declare, so its
 * current effect class is undefined, which the runtime treats as non-read
 * (wb-tu1 F3). A dispatched call then fails in the registry with its own
 * unknown-capability error; a refused one never gets that far.
 */

import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type * as FurnaceSdk from "@furnace/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import type * as JournalModule from "../src/workflow/journal.js";
import { readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

/** When false, every dispatched marker row "fails to write": appendJournal reports false and writes nothing. */
const DISK = vi.hoisted(() => ({ dispatchWrites: true }));
vi.mock("../src/workflow/journal.js", async importOriginal => {
  const original = await importOriginal<typeof JournalModule>();
  return {
    ...original,
    appendJournal: (path: string, entry: WorkflowJournalEntry) =>
      !DISK.dispatchWrites && entry.dispatched === true ? false : original.appendJournal(path, entry),
  };
});
// The Furnace provider registers at boot; keep it off any real Furnace state root.
vi.mock("@furnace/sdk", async importOriginal => {
  const original = await importOriginal<typeof FurnaceSdk>();
  return { ...original, Furnace: class {
    version = vi.fn(async () => ({ kind: "version", data: { furnace_version: "0.1.0" } }));
    runs = { get: () => ({ inspect: vi.fn(), status: vi.fn() }) };
    attempts = { list: vi.fn() };
    logs = { read: vi.fn() };
  } };
});

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; DISK.dispatchWrites = true; vi.restoreAllMocks(); });

const SCRIPT = 'export const meta={name:"dispatch-probe",description:"node"}; return await node("effect.write", { value: "x" });';

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 400; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

/** Boot the real extension under the Claude backend and run SCRIPT to its end through SubagentWorkflow. */
async function runThroughExtension() {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:observe"] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context: ExtensionContext = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const launched = await pi.tools.get("SubagentWorkflow").execute("dispatch-run", { script: SCRIPT }, undefined, undefined, context);
  const taskId = launched.details.taskId as string;
  await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId)));
  const observed = JSON.parse(textOf(await pi.tools.get("workflow_observe").execute("dispatch-observe", { taskId }, undefined, undefined, context)));
  const nodeRows = readJournal(join(sessionTaskDir(sandbox.dir, "s1"), `${taskId}.workflow.jsonl`)).filter(entry => entry.kind === "node");
  return { observed, nodeRows };
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

  it("refuses the call fail-closed when that row could not be written, so the provider is never reached", async () => {
    DISK.dispatchWrites = false;
    const { observed, nodeRows } = await runThroughExtension();

    expect(observed.status).toBe("failed");
    expect(observed.error).toContain("node(effect.write) at position 0 was not dispatched: its dispatched journal row could not be written");
    expect(observed.error).not.toContain("Unknown or unavailable capability");
    expect(nodeRows).toEqual([]);
  }, 60_000);
});
