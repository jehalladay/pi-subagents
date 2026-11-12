/**
 * wb-5x0.1 wiring falsifier, re-anchored by wb-q0on (EAT-R358). Owner ruling Q2 on wb-5x0.1: "for NON-READ classes a
 * failed pre-call append REFUSES the call fail-closed with a typed error naming the append failure". EAT-R358
 * (program pi-system-dx-triage-2026-11-11): "The node admission path MUST distinguish refusals before provider
 * invocation from dispatched effects", its first acceptance criterion: an unknown id, an invalid schema and a missing
 * invoke grant "each record no dispatched-effect marker and invoke the provider zero times".
 *
 * Before wb-q0on these cases drove the dispatched marker through the extension with an UNDECLARED capability, which the
 * runtime then treated as non-read; that undeclared call is exactly what EAT-R358 forbids marking, so the extension
 * cases below now pin the admission refusal instead, and the marker properties are pinned at the journal seam the
 * extension hands the runtime (journalAppender in src/workflow/resume-admission.ts, the function src/index.ts's journal option calls), driven through the
 * REAL Claude host over a registry holding an admitted write FIXTURE. No shipped capability is non-read (every native
 * descriptor declares "read"), so no booted-extension path reaches a marker at all; the seam is where the product's
 * marker write lives.
 *
 * Nothing is mocked. The extension cases read the run's real journal file. The occupied case makes the real write
 * fail: the run's journal path is a directory, so the filesystem refuses the append (EISDIR). Run ids are random, so
 * the occupation goes through the host's DI seam, the context double's session-id accessor, which occupies the journal
 * path of each script it finds before the run dispatches anything and records what it occupied.
 *
 * PINNED READER SET:
 *  - EXT-UNDECLARED: through the booted extension an undeclared capability fails typed with the registry's
 *    unknown-capability refusal and the run's journal file holds no node row.
 *  - EXT-OCCUPIED: with the journal path occupied, the undeclared capability is still refused by admission (the
 *    unknown-capability text, never the unwritten-marker text) and the occupying directory stays empty.
 *  - SEAM-WIRED: src/index.ts's workflow journal option appends through journalAppender.
 *  - SEAM-MARKER: journalAppender on a real file puts the admitted write's dispatched marker on disk before the fixture
 *    runs (the fixture reads the file when invoked), then the settled row.
 *  - SEAM-OCCUPIED: journalAppender on an occupied path refuses the admitted write fail-closed, naming the unwritten
 *    dispatched row, and the fixture is never invoked.
 *  - SEAM-READBACK: on a path whose append succeeds but keeps nothing (/dev/null: appendJournal reports it written), the
 *    read-back refuses the admitted write fail-closed and the fixture is never invoked.
 *  - SEAM-PREMISE: every effectClass literal under src/workbench/providers/ is "read" (no shipped capability is non-read).
 * NOT CLAIMED: a native non-read capability (none ships, SEAM-PREMISE), and a marker the file holds but a later write
 * overwrites.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { appendJournal, readJournal } from "../src/workflow/journal.js";
import { journalAppender } from "../src/workflow/resume-admission.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const scratch: string[] = [];
afterEach(() => { sandbox?.restore(); sandbox = undefined; removeScratch(...scratch.splice(0)); vi.restoreAllMocks(); });

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

describe("the extension refuses an undeclared capability before dispatch (wb-5x0.1, EAT-R358)", () => {
  it("EXT-UNDECLARED: fails typed with the unknown-capability refusal and journals no node row", async () => {
    const { observed, nodeRows } = await runThroughExtension();

    expect(observed.status).toBe("failed");
    expect(observed.error).toContain("Unknown or unavailable capability: effect.write");
    expect(nodeRows).toEqual([]);
  }, 60_000);

  it("EXT-OCCUPIED: with the journal path occupied, admission still refuses first and nothing is written", async () => {
    const occupied: string[] = [];
    const { taskId, observed, journalPath, nodeRows } = await runThroughExtension(cwd => ({
      getSessionId: occupyingJournalPaths(cwd, occupied),
      getBranch: vi.fn(() => []),
    }));

    expect(occupied).toEqual([taskId]);
    expect(statSync(journalPath).isDirectory()).toBe(true);
    expect(readdirSync(journalPath)).toEqual([]);
    expect(observed.status).toBe("failed");
    expect(observed.error).toContain("Unknown or unavailable capability: effect.write");
    expect(observed.error).not.toContain("was not dispatched");
    expect(nodeRows).toEqual([]);
  }, 60_000);
});

const HEAD = 'export const meta={name:"seam-probe",description:"node"};\n';
const WRITE = 'return await node("fixture.write", { value: "x" });';

/** The REAL Claude host over a registry holding one admitted write FIXTURE that reads `journalPath` when invoked. */
function writeFixtureHost(journalPath: string) {
  const invocations: string[] = [];
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: { id: "fixture.write", version: "1.0.0", description: "write FIXTURE, no real effect", inputSchema: { type: "object" }, effectClass: "write", permissions: ["fixture:write"], supportedModes: ["invoke"] },
    async invoke() {
      invocations.push(statSync(journalPath).isFile() ? readFileSync(journalPath, "utf-8") : "<not a file>");
      return { written: true };
    },
  });
  const host = createClaudeWorkflowHost({ cwd: process.cwd(), capabilities: registry, grants: ["fixture:write"], invocationId: "seam-probe", principal: { id: "local-operator:fixture", role: "local-operator" } });
  return { host, invocations };
}

describe("the journal seam the extension hands the runtime (journalAppender)", () => {
  it("SEAM-WIRED: src/index.ts appends workflow journal rows through journalAppender", () => {
    expect(readFileSync(new URL("../src/index.ts", import.meta.url), "utf8")).toMatch(/append: journalAppender\(task\.journalPath\)/);
  });

  it("SEAM-MARKER: the dispatched marker is on disk before the fixture runs, then the settled row follows", async () => {
    const dir = makeScratch("dispatch-seam-");
    scratch.push(dir);
    const journalPath = join(dir, "run.workflow.jsonl");
    const { host, invocations } = writeFixtureHost(journalPath);
    const result = await runWorkflow({ script: `${HEAD}${WRITE}`, host, journal: { append: journalAppender(journalPath) } });

    expect(result.status).toBe("completed");
    expect(invocations).toHaveLength(1);
    const atInvoke = (invocations[0] ?? "").split("\n").filter(line => line !== "").map(line => JSON.parse(line) as Record<string, unknown>);
    expect(atInvoke).toEqual([expect.objectContaining({ kind: "node", index: 0, dispatched: true, capabilityId: "fixture.write", effectClass: "write" })]);
    expect(readJournal(journalPath).filter(entry => entry.kind === "node").map(row => row.dispatched === true)).toEqual([true, false]);
  });

  it("SEAM-OCCUPIED: an occupied journal path refuses the admitted write fail-closed and the fixture never runs", async () => {
    const dir = makeScratch("dispatch-seam-");
    scratch.push(dir);
    const journalPath = join(dir, "run.workflow.jsonl");
    mkdirSync(journalPath);
    const { host, invocations } = writeFixtureHost(journalPath);
    const result = await runWorkflow({ script: `${HEAD}${WRITE}`, host, journal: { append: journalAppender(journalPath) } });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("unavailable");
    expect(result.error).toContain("node(fixture.write) at position 0 was not dispatched: its dispatched journal row could not be written");
    expect(invocations).toEqual([]);
    expect(readdirSync(journalPath)).toEqual([]);
  });

  it("SEAM-READBACK: an append the filesystem accepts but does not keep is refused by the read-back", async () => {
    const sink = "/dev/null";
    expect(appendJournal(sink, { index: 0, key: "k", ok: false, kind: "node", capabilityId: "fixture.write", dispatched: true })).toBe(true);
    const invocations: string[] = [];
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: { id: "fixture.write", version: "1.0.0", description: "write FIXTURE, no real effect", inputSchema: { type: "object" }, effectClass: "write", permissions: ["fixture:write"], supportedModes: ["invoke"] },
      async invoke() { invocations.push("invoked"); return { written: true }; },
    });
    const host = createClaudeWorkflowHost({ cwd: process.cwd(), capabilities: registry, grants: ["fixture:write"], invocationId: "seam-readback", principal: { id: "local-operator:fixture", role: "local-operator" } });
    const result = await runWorkflow({ script: `${HEAD}${WRITE}`, host, journal: { append: journalAppender(sink) } });

    expect(result.status).toBe("failed");
    expect(result.error).toContain("node(fixture.write) at position 0 was not dispatched: its dispatched journal row could not be written");
    expect(invocations).toEqual([]);
  });

  it("SEAM-PREMISE: every effectClass literal under src/workbench/providers/ declares read", () => {
    const dir = new URL("../src/workbench/providers/", import.meta.url);
    const classes = readdirSync(dir).filter(name => name.endsWith(".ts")).flatMap(name =>
      [...readFileSync(new URL(name, dir), "utf8").matchAll(/effectClass\s*:\s*"([a-z]+)"/g)].map(match => `${name}:${match[1]}`));
    expect(classes.length).toBeGreaterThanOrEqual(4);
    expect(classes.filter(entry => !entry.endsWith(":read"))).toEqual([]);
  });
});
