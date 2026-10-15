/** wb-g8f part B.3: the registered workflow_reconcile tool path, isolated cwd/settings, mocked Furnace SDK. */
import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type * as FurnaceSdk from "@furnace/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { appendJournal, nodeJournalKey, readJournal } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const RUN_STATE = vi.hoisted(() => ({ workspace: "", state: "active" }));
vi.mock("@furnace/sdk", async importOriginal => {
  const original = await importOriginal<typeof FurnaceSdk>();
  return { ...original, Furnace: class {
    version = vi.fn(async () => ({ kind: "version", data: { furnace_version: "0.1.0" } }));
    runs = { get: (runId: string) => ({
      inspect: async () => ({ kind: "run_inspect", data: { run_id: runId, workspace: RUN_STATE.workspace, state: RUN_STATE.state } }),
      status: vi.fn(),
    }) };
    attempts = { list: vi.fn() };
    logs = { read: vi.fn() };
  } };
});

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; RUN_STATE.state = "active"; vi.restoreAllMocks(); });

async function boot(rights: string[]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: rights } } });
  RUN_STATE.workspace = realpathSync(sandbox.dir);
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, dir: sandbox.dir };
}

async function invoke(tool: { execute: (id: string, params: Record<string, unknown>, signal: undefined, update: undefined, context: ExtensionContext) => Promise<{ content: Array<{ type: string; text: string }> }> } | undefined, context: ExtensionContext, params: Record<string, unknown>) {
  if (tool === undefined) throw new Error("workflow_reconcile is not registered");
  return textOf(await tool.execute("b3-reconcile", params, undefined, undefined, context));
}

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 400; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

const PURE = 'export const meta={name:"reconcile-probe",description:"pure"}; return 1;';
const NODE_INPUT = { value: "x" };
const NODE_SCRIPT = 'export const meta={name:"reconcile-probe",description:"node"}; const v = await node("furnace.run.start", { value: "x" }); return v;';

/** Run a pure workflow to completion, then plant a journaled external effect at node position 0. */
async function journaledTask(pi: ReturnType<typeof makePi>, context: ExtensionContext, dir: string) {
  const launched = await pi.tools.get("SubagentWorkflow").execute("b3-run", { script: PURE }, undefined, undefined, context);
  const taskId = launched.details.taskId as string;
  await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId)));
  const journalPath = join(sessionTaskDir(dir, "s1"), `${taskId}.workflow.jsonl`);
  appendJournal(journalPath, {
    index: 0, key: nodeJournalKey("furnace.run.start", JSON.stringify(NODE_INPUT)), ok: true, kind: "node",
    capabilityId: "furnace.run.start", effectClass: "external",
    nativeRefs: [{ provider: "furnace", type: "run", id: "frn-run-r1" }],
  });
  return { taskId, journalPath };
}

describe("workflow_reconcile registration and authority", () => {
  it("registers only under the claude backend", async () => {
    sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "pi", capabilityGrants: [] } } });
    const pi = makePi();
    subagentsExtension(pi.pi);
    await pi.lifecycle.get("session_start")?.({}, ctx({ cwd: sandbox.dir }));
    expect(pi.tools.get("workflow_reconcile")).toBeUndefined();
    sandbox.restore(); sandbox = undefined;

    const booted = await boot([]);
    expect(booted.pi.tools.get("workflow_reconcile")).toBeDefined();
  });

  it("ignores forged grant/principal/workspace params and denies observer-only identically for unknown and foreign ids, leaving the journal bytes unchanged", async () => {
    const { pi, context, dir } = await boot(["workbench:observe"]);
    const { taskId, journalPath } = await journaledTask(pi, context, dir);
    const before = readFileSync(journalPath, "utf-8");
    const forged = { grants: ["*", "reconcile:furnace.acknowledge"], principal: "admin", workspace: "/foreign" };
    const known = await invoke(pi.tools.get("workflow_reconcile"), context, {
      taskId, action: "acknowledge", position: 0, reason: "forged", determination: "indeterminate", noEvidenceReason: "producer-unavailable", ...forged,
    });
    const unknown = await invoke(pi.tools.get("workflow_reconcile"), context, {
      taskId: "wf_nosuchtask", action: "acknowledge", position: 0, reason: "forged", determination: "indeterminate", noEvidenceReason: "producer-unavailable", ...forged,
    });
    expect(known).toContain("Permission denied");
    expect(known).not.toContain("furnace");
    expect(unknown).toBe(known);
    expect(readFileSync(journalPath, "utf-8")).toBe(before);
  });
});

describe("inspect, evidence, acknowledge, resume", () => {
  it("walks the full acknowledge journey: pending roster, bound receipt, recorded decision, settled resume with applied carry", async () => {
    const { pi, context, dir } = await boot(["workbench:observe", "furnace:inspect", "reconcile:furnace.acknowledge"]);
    const { taskId, journalPath } = await journaledTask(pi, context, dir);
    const tool = pi.tools.get("workflow_reconcile");

    const roster = JSON.parse(await invoke(tool, context, { taskId, action: "inspect" }));
    expect(roster.positions[0]).toMatchObject({ position: 0, capabilityId: "furnace.run.start", producer: "furnace", state: "pending", evidenceReads: ["furnace.run.inspect"] });

    const evidence = JSON.parse(await invoke(tool, context, {
      taskId, action: "evidence", position: 0, evidence: { capabilityId: "furnace.run.inspect", input: { runId: "frn-run-r1" } },
    }));
    expect(evidence.receipt).toMatchObject({ producer: "furnace", capabilityId: "furnace.run.inspect", outcome: "returned", binding: "journal-recorded", domainStatus: "active" });
    expect(evidence.guidance.join(" ")).toContain("not evidence of absence");

    const wrong = JSON.parse(await invoke(tool, context, {
      taskId, action: "evidence", position: 0, evidence: { capabilityId: "furnace.run.inspect", input: { runId: "frn-run-OTHER" } },
    }));
    expect(wrong.receipt.binding).toBe("unbound");
    const mismatched = await invoke(tool, context, {
      taskId, action: "acknowledge", position: 0, reason: "wrong object", determination: "effect-confirmed", receiptIds: [wrong.receipt.receiptId],
    });
    expect(mismatched).toContain("native identity");

    const recorded = JSON.parse(await invoke(tool, context, {
      taskId, action: "acknowledge", position: 0, reason: "run frn-run-r1 exists and is active", determination: "effect-confirmed", receiptIds: [evidence.receipt.receiptId],
    }));
    expect(recorded).toMatchObject({ phase: "recorded", decision: "acknowledge", applied: false, alreadyRecorded: false, settlement: "envelope" });
    const journaled = readJournal(journalPath).find(entry => entry.kind === "acknowledge");
    expect(journaled?.reconcile).toMatchObject({
      decision: "acknowledge", grant: "reconcile:furnace.acknowledge", evidenceClass: "producer-confirmed",
      operator: { principal: expect.stringMatching(/^local-operator:\d+:s1$/) },
    });
    expect(journaled?.reconcile).not.toHaveProperty("applied");

    const resumed = await pi.tools.get("SubagentWorkflow").execute("b3-resume", { script: NODE_SCRIPT, resumeFromRunId: taskId }, undefined, undefined, context);
    const resumedId = resumed.details.taskId as string;
    await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(resumedId)));
    const observed = JSON.parse(await invoke(pi.tools.get("workflow_observe"), context, { taskId: resumedId }));
    expect(observed.status).toBe("completed");
    const carried = readJournal(join(sessionTaskDir(dir, "s1"), `${resumedId}.workflow.jsonl`));
    const applied = carried.find(entry => entry.kind === "acknowledge");
    expect(applied?.reconcile).toHaveProperty("applied");
    expect(carried.some(entry => entry.kind === "node" && entry.capabilityId === "furnace.run.start")).toBe(true);
  });

  it("strips hostile producer text from the evidence reply and refuses a control-byte reason as malformed", async () => {
    const { pi, context, dir } = await boot(["workbench:observe", "furnace:inspect", "reconcile:furnace.acknowledge"]);
    const { taskId } = await journaledTask(pi, context, dir);
    RUN_STATE.state = "active\u001b[31m ‮evil";
    const reply = await invoke(pi.tools.get("workflow_reconcile"), context, {
      taskId, action: "evidence", position: 0, evidence: { capabilityId: "furnace.run.inspect", input: { runId: "frn-run-r1" } },
    });
    expect(reply).not.toMatch(/[\u001b‪-‮⁦-⁩]/u);
    const malformed = await invoke(pi.tools.get("workflow_reconcile"), context, {
      taskId, action: "acknowledge", position: 0, reason: "bad \u001b[31m reason", determination: "indeterminate", noEvidenceReason: "producer-unavailable",
    });
    expect(malformed.toLowerCase()).toContain("malformed");
  });
});

describe("override: confirmed, single-use, spent at resume start", () => {
  it("refuses an unconfirmed override, records a confirmed one, spends it at the next resume, and refuses the resume after that", async () => {
    const { pi, context, dir } = await boot(["workbench:observe", "furnace:inspect", "reconcile:furnace.acknowledge", "reconcile:furnace.override"]);
    const { taskId, journalPath } = await journaledTask(pi, context, dir);
    const tool = pi.tools.get("workflow_reconcile");

    const absent = JSON.parse(await invoke(tool, context, {
      taskId, action: "acknowledge", position: 0, reason: "nothing exists under that reference", determination: "effect-absent", noEvidenceReason: "producer-unavailable",
    }));
    expect(absent).toMatchObject({ decision: "acknowledge", settlement: "none" });
    const ackId = absent.acknowledgementId as string;

    const unconfirmed = await invoke(tool, context, {
      taskId, action: "override", position: 0, reason: "re-run it", acknowledgementId: ackId,
      confirmed: true, confirmPosition: 0, confirmCapabilityId: "furnace.run.start",
    });
    expect(unconfirmed).toContain("Duplicate risk");

    const recorded = JSON.parse(await invoke(tool, context, {
      taskId, action: "override", position: 0, reason: "re-run it once", acknowledgementId: ackId,
      confirmed: true, confirmPosition: 0, confirmCapabilityId: "furnace.run.start", acceptDuplicateRisk: true,
    }));
    expect(recorded).toMatchObject({ phase: "recorded", decision: "override", alreadyRecorded: false });
    expect(recorded.warning).toContain("once");

    const resumed = await pi.tools.get("SubagentWorkflow").execute("b3-override", { script: NODE_SCRIPT, resumeFromRunId: taskId }, undefined, undefined, context);
    const resumedId = resumed.details.taskId as string;
    await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(resumedId)));
    // The authorization is spent in the SOURCE journal before anything runs.
    const spent = readJournal(journalPath).filter(entry => entry.kind === "override" && entry.reconcile?.decision === "override" && entry.reconcile.consumed !== undefined);
    expect(spent).toHaveLength(1);
    expect(spent[0]?.reconcile).toMatchObject({ consumed: { outcome: "spent-at-resume-start", byRunId: resumedId } });

    const again = await pi.tools.get("SubagentWorkflow").execute("b3-again", { script: NODE_SCRIPT, resumeFromRunId: taskId }, undefined, undefined, context);
    const againId = again.details.taskId as string;
    await waitFor(() => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(againId)));
    const observed = JSON.parse(await invoke(pi.tools.get("workflow_observe"), context, { taskId: againId }));
    expect(observed.status).toBe("failed");
    expect(observed.error).toContain("consumed");
  });
});
