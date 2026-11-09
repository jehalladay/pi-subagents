/**
 * workbench-claude-host-revocation-falsifiers.test.ts - wb-7wkb (MNI-2026-11-09 P01). Two of the falsifiers that
 * docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md section P01 (pi-subagents
 * master 18b016b2; master-only) lists under "Expand falsifiers": "grants revoked during parked admission" and "final
 * write call never launches with stale principal", measured at the Claude host the registered workflow tools build.
 *
 * The REAL createClaudeWorkflowHost is driven through its documented fixture query seam (FakeClaudeSdk; the SDK module
 * is never mocked). The host's beforeDispatch option is the host-owned basis check: here it re-reads an operator
 * fixture (its grant list and principal) and throws IDENTITY_CONFLICT when that differs from the reading taken when the
 * host was built, as src/index.ts's producer re-reads the operator settings and verifies the invocation identity. The
 * host is built with copies of that first reading as its grants and principal, so a later change to the operator
 * fixture leaves the host's own copies stale. The final write is a call of the curated capability_invoke tool, through
 * a real MCP client connected to the in-process workbench server the host handed query(), on a write fixture
 * capability that records each dispatch it receives.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - PARK-REVOKE-GRANT and PARK-CHANGE-PRINCIPAL: while the agent's beforeDispatch is parked, the operator fixture loses
 *    one grant or changes its principal id; once released, the host settles that agent as exactly
 *    { ok: false, error: IDENTITY_CONFLICT text } after one beforeDispatch entry, and query() is never called.
 *  - PARK-CONTROL: the same parked sequence with no change settles ok with the fixture's session id after one query().
 *  - WRITE-REVOKE-GRANT and WRITE-CHANGE-PRINCIPAL: after the agent's query() started, the operator fixture loses the
 *    write's permission grant or changes its principal id; the agent's capability_invoke of the write fixture then
 *    replies isError with { kind: "rejected", category: "transport", diagnostic: IDENTITY_CONFLICT text }, the write
 *    fixture receives no dispatch, beforeDispatch was entered twice (the agent's dispatch and the tool call), and the
 *    agent itself settles ok.
 *  - WRITE-CONTROL: with no change the same call returns the fixture's value, and the write fixture receives exactly
 *    one dispatch carrying the principal and grants the host was built with.
 *  - ROSTER: the tests this file registers are exactly the ROSTER titles, in order, each in run mode and none marked to
 *    fail, the ROSTER case registered last; and the leading ids of their titles, each once in order, are exactly the ids
 *    that open the bullets of this PINNED READER SET, read from this file's own source (an anchor outside its literals).
 * NOT CLAIMED by this file: src/index.ts's own producer (its settings re-read and identity verification) and the
 * registered workflow tools, which reach this host only through the SDK module; the local-detached host and its
 * basis() check; function authority at the final dispatch boundary (test/workbench-function-authority.test.ts pins
 * the standalone seam, and packet P03 owns the registered composition); per-agent skip or retry while parked
 * (test/workbench-mwi-cancel-repro.test.ts); a run abort while parked (F10 of test/workbench-claude-cancel-faults.test.ts);
 * any other operator change, tool, capability, role or SDK message sequence than the rows'.
 * RESIDUAL: none claimed.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { McpSdkServerConfigWithInstance } from "@anthropic-ai/claude-agent-sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry, type InvocationContext } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, type FakeSdkCall, sdkSuccess } from "./helpers/claude-sdk-stream.js";

/** What the operator fixture's re-read throws once the reading differs from the one taken at host construction. */
const CONFLICT = "IDENTITY_CONFLICT: invocation basis changed after admission";
const WRITE_ID = "fixture.write";
const WRITE_GRANTS = [`invoke:${WRITE_ID}`, "fixture:write"] as const;
const PRINCIPAL = { id: "local-operator:1000", role: "local-operator" } as const;

/** The ids that open this header's PINNED READER SET bullets, in order, read from this file's own source text. */
function headerIds(): string[] {
  const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const ids: string[] = [];
  for (const line of text.slice(0, text.indexOf("*/")).split("\n")) {
    const bullet = /^ \* {2}- ([A-Z][A-Z0-9-]*(?:(?:, | and )[A-Z][A-Z0-9-]*)*):/.exec(line);
    if (bullet) ids.push(...bullet[1].split(/, | and /));
  }
  return ids;
}

/** A registered title's leading id: its first token, without the quotes it.each puts around a $id. */
function titleId(name: string): string {
  return /^'?([A-Z][A-Z0-9-]*)/.exec(name)?.[1] ?? name;
}

/** Every test this file registers, in registration order (the ROSTER case reads vitest's task tree against it). */
const ROSTER = [
  "'PARK-REVOKE-GRANT': settled as the IDENTITY_CONFLICT refusal after one beforeDispatch entry, with no query()",
  "'PARK-CHANGE-PRINCIPAL': settled as the IDENTITY_CONFLICT refusal after one beforeDispatch entry, with no query()",
  "PARK-CONTROL: the same parked sequence with no change settles ok after exactly one query()",
  "'WRITE-REVOKE-GRANT': capability_invoke is rejected with the IDENTITY_CONFLICT text and the write fixture receives no dispatch",
  "'WRITE-CHANGE-PRINCIPAL': capability_invoke is rejected with the IDENTITY_CONFLICT text and the write fixture receives no dispatch",
  "WRITE-CONTROL: with no change the write dispatches exactly once under the principal and grants the host was built with",
  "ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail",
] as const;

/** The operator the host-owned basis check re-reads: its grants and principal, both changed by the rows. */
interface Operator {
  grants: string[];
  principal: { id: string; role: string };
}

function operator(): Operator {
  return { grants: [...WRITE_GRANTS], principal: { ...PRINCIPAL } };
}

function basisOf(state: Operator): string {
  return JSON.stringify({ grants: [...state.grants].sort(), principal: { id: state.principal.id, role: state.principal.role } });
}

/** The basis check: throws when the operator's current reading differs from the reading the host was built under. */
function reobserve(state: Operator, admitted: string): void {
  if (basisOf(state) !== admitted) throw new Error(CONFLICT);
}

const fakes: FakeClaudeSdk[] = [];
const cleanups: Array<() => Promise<void>> = [];
afterEach(async () => {
  for (const fake of fakes.splice(0)) fake.release();
  for (const close of cleanups.splice(0)) await close();
});

function fakeSdk(script?: (call: FakeSdkCall) => void): FakeClaudeSdk {
  const fake = new FakeClaudeSdk({ policy: "reject", ...(script ? { script } : {}) });
  fakes.push(fake);
  return fake;
}

function spawn(agentType: string): WorkflowSpawnRequest {
  return { agentId: "wf-agent-0", index: 0, prompt: "write the fixture", label: "writer", agentType };
}

/** A host-owned admission whose basis check is parked until release(); entered resolves at its first entry. */
function parkedAdmission(state: Operator, admitted: string) {
  let release: () => void = () => {};
  let markEntered: () => void = () => {};
  const gate = new Promise<void>(resolve => {
    release = resolve;
  });
  const entered = new Promise<void>(resolve => {
    markEntered = resolve;
  });
  const counts = { entries: 0 };
  const beforeDispatch = async () => {
    counts.entries++;
    markEntered();
    await gate;
    reobserve(state, admitted);
  };
  return { beforeDispatch, entered, counts, release: () => release() };
}

describe("a basis change while the agent's admission is parked refuses the agent before query()", () => {
  const rows = [
    { id: "PARK-REVOKE-GRANT", change: (state: Operator) => { state.grants = state.grants.filter(grant => grant !== "fixture:write"); } },
    { id: "PARK-CHANGE-PRINCIPAL", change: (state: Operator) => { state.principal.id = "local-operator:2000"; } },
  ];
  it.each(rows)("$id: settled as the IDENTITY_CONFLICT refusal after one beforeDispatch entry, with no query()", async row => {
    const state = operator();
    const admitted = basisOf(state);
    const sdk = fakeSdk();
    const admission = parkedAdmission(state, admitted);
    const host = createClaudeWorkflowHost({ cwd: process.cwd(), query: sdk.query, grants: [...state.grants], principal: { ...state.principal }, beforeDispatch: admission.beforeDispatch });
    const settled = host.spawnAgent(spawn("general-purpose"));
    await admission.entered;
    row.change(state);
    admission.release();
    // Raced against the first query(), as F10 of test/workbench-claude-cancel-faults.test.ts does: a host that started
    // the SDK before its admission settled reads as query-started here instead of waiting on a stream nobody ends.
    const outcome = await Promise.race([settled, sdk.call(0).then(() => "query-started" as const)]);
    expect(outcome).toEqual({ ok: false, error: CONFLICT });
    expect(admission.counts.entries).toBe(1);
    expect(sdk.calls).toHaveLength(0);
  });

  it("PARK-CONTROL: the same parked sequence with no change settles ok after exactly one query()", async () => {
    const state = operator();
    const sdk = fakeSdk(call => {
      call.push(...sdkSuccess("sdk-park-control", "done"));
      call.end();
    });
    const admission = parkedAdmission(state, basisOf(state));
    const host = createClaudeWorkflowHost({ cwd: process.cwd(), query: sdk.query, grants: [...state.grants], principal: { ...state.principal }, beforeDispatch: admission.beforeDispatch });
    const settled = host.spawnAgent(spawn("general-purpose"));
    await admission.entered;
    admission.release();
    expect(await settled).toMatchObject({ ok: true, sessionId: "sdk-park-control" });
    expect(admission.counts.entries).toBe(1);
    expect(sdk.calls).toHaveLength(1);
  });
});

/** The write fixture: an explicit local write capability that records each dispatch it receives. */
function writeRegistry() {
  const registry = new CapabilityRegistry();
  const writes: InvocationContext[] = [];
  registry.register({
    descriptor: { id: WRITE_ID, version: "1.0.0", description: "Explicit write FIXTURE, no real external effect", effectClass: "write", permissions: ["fixture:write"], supportedModes: ["invoke"], inputSchema: { type: "object" } },
    async invoke(_input, context) {
      writes.push(context);
      return { status: "WRITTEN" };
    },
  });
  return { registry, writes };
}

/** A real MCP client on the in-process workbench server the host handed this query() call. */
async function connectWorkbench(call: FakeSdkCall): Promise<Client> {
  const server = call.options.mcpServers?.workbench;
  if (server === undefined || server.type !== "sdk" || !("instance" in server)) throw new Error("query() was handed no in-process workbench MCP server.");
  const instance = (server as McpSdkServerConfigWithInstance).instance;
  const client = new Client({ name: "p01-final-write-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await instance.connect(serverTransport);
  await client.connect(clientTransport);
  cleanups.push(async () => {
    await client.close();
    await instance.close();
  });
  return client;
}

/** Start the writer agent, apply `change` once its query() is live, then make the final write call and end the stream. */
async function finalWrite(change: (state: Operator) => void) {
  const state = operator();
  const admitted = basisOf(state);
  const { registry, writes } = writeRegistry();
  const sdk = fakeSdk();
  let entries = 0;
  const host = createClaudeWorkflowHost({
    cwd: process.cwd(),
    query: sdk.query,
    capabilities: registry,
    roles: { writer: { prompt: "Write the fixture.", capabilities: [WRITE_ID] } },
    grants: [...state.grants],
    principal: { ...state.principal },
    invocationId: "p01-final-write",
    beforeDispatch: () => {
      entries++;
      reobserve(state, admitted);
    },
  });
  const settled = host.spawnAgent(spawn("writer"));
  const call = await sdk.call(0);
  const client = await connectWorkbench(call);
  change(state);
  const reply = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: WRITE_ID, capabilityVersion: "1.0.0", input: {} } });
  call.push(...sdkSuccess("sdk-final-write", "done"));
  call.end();
  const result = await settled;
  const content = reply.content as Array<{ type: string; text: string }>;
  return { reply, payload: JSON.parse(content[0].text) as Record<string, unknown>, writes, entries, result };
}

describe("the final write call of a live session re-reads the basis and never dispatches under a stale principal or grant", () => {
  const rows = [
    { id: "WRITE-REVOKE-GRANT", change: (state: Operator) => { state.grants = state.grants.filter(grant => grant !== "fixture:write"); } },
    { id: "WRITE-CHANGE-PRINCIPAL", change: (state: Operator) => { state.principal.id = "local-operator:2000"; } },
  ];
  it.each(rows)("$id: capability_invoke is rejected with the IDENTITY_CONFLICT text and the write fixture receives no dispatch", async row => {
    const trial = await finalWrite(row.change);
    expect(trial.reply.isError).toBe(true);
    expect(trial.payload).toEqual({ kind: "rejected", category: "transport", diagnostic: CONFLICT });
    expect(trial.writes).toHaveLength(0);
    expect(trial.entries).toBe(2);
    expect(trial.result).toMatchObject({ ok: true, sessionId: "sdk-final-write" });
  });

  it("WRITE-CONTROL: with no change the write dispatches exactly once under the principal and grants the host was built with", async () => {
    const trial = await finalWrite(() => {});
    expect(trial.reply.isError).not.toBe(true);
    expect(trial.payload).toEqual({ kind: "returned", value: { status: "WRITTEN" } });
    expect(trial.writes).toHaveLength(1);
    expect(trial.writes[0].principal).toEqual(PRINCIPAL);
    expect(trial.writes[0].grants).toEqual([...WRITE_GRANTS]);
    expect(trial.entries).toBe(2);
    expect(trial.result).toMatchObject({ ok: true, sessionId: "sdk-final-write" });
  });
});

it("ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail", ({ task }) => {
  const registered: Array<{ name: string; mode: string; fails: boolean; self: boolean }> = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  expect(registered.map(entry => entry.name)).toEqual([...ROSTER]);
  expect(registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => entry.name)).toEqual([]);
  expect(registered.findIndex(entry => entry.self)).toBe(registered.length - 1);
  expect([...new Set(registered.map(entry => titleId(entry.name)))]).toEqual(headerIds());
});
