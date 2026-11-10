/**
 * workbench-claude-host-revocation-falsifiers.test.ts - wb-7wkb (MNI-2026-11-09 P01). Two of the falsifiers that
 * docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md section P01 (pi-subagents
 * master 18b016b2; master-only) lists under "Expand falsifiers": "grants revoked during parked admission" and "final
 * write call never launches with stale principal", measured at the Claude host the registered workflow tools build and
 * read up to each trial's QUIESCENCE POINT below. So "never launches" is read here as "has not launched by that point";
 * a launch deferred past it is NOT CLAIMED.
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
 * THE QUIESCENCE POINT. Each trial reads its counts (beforeDispatch entries, query() calls, write dispatches) at its
 * quiescence point: once the agent has settled, the trial sets a QUIESCE_MS (50 ms) timer and reads the counts when that
 * timer has fired. So the words "no call", "no dispatch", "one entry", "two entries" and "exactly one" below are read at
 * that point; QUIESCE-PARK and QUIESCE-WRITE prove the reading.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - PARK-REVOKE-GRANT and PARK-CHANGE-PRINCIPAL: while the agent's beforeDispatch is parked, the operator fixture loses
 *    one grant or changes its principal id; once released, the host settles that agent as exactly
 *    { ok: false, error: IDENTITY_CONFLICT text }, and at the quiescence point beforeDispatch has one entry and query()
 *    has no call.
 *  - PARK-CONTROL: the same parked sequence with no change settles ok with the fixture's session id, and at the
 *    quiescence point beforeDispatch has one entry and query() exactly one call.
 *  - QUIESCE-PARK: the detector proof of the PARK rows' reading. In PARK-REVOKE-GRANT's trial the test itself calls
 *    query() from a timer of 50 ms (the header's value, written out apart from QUIESCE_MS) that it sets once the agent
 *    has settled, before the trial's own wait; at the quiescence point query() has that one call.
 *  - WRITE-REVOKE-GRANT and WRITE-CHANGE-PRINCIPAL: after the agent's query() started, the operator fixture loses the
 *    write's permission grant or changes its principal id; the agent's capability_invoke of the write fixture then
 *    replies isError with { kind: "rejected", category: "transport", diagnostic: IDENTITY_CONFLICT text }, the agent
 *    itself settles ok, and at the quiescence point the write fixture has received no dispatch and beforeDispatch has
 *    two entries (the agent's dispatch and the tool call).
 *  - WRITE-CONTROL: with no change the same call returns the fixture's value, and at the quiescence point the write
 *    fixture has received exactly one dispatch, carrying the principal and grants the host was built with.
 *  - QUIESCE-WRITE: the detector proof of the WRITE rows' reading. In WRITE-REVOKE-GRANT's trial the test itself
 *    dispatches the write fixture, through its registry under the grants and principal the host was built with, from a
 *    timer of 50 ms that it sets once the agent has settled, before the trial's own wait; at the quiescence point the
 *    write fixture has that one dispatch, carrying those grants.
 *  - ROSTER: the tests this file registers are exactly the ROSTER titles, in order, each in run mode and none marked to
 *    fail, the ROSTER case registered last; and the leading ids of their titles, each once in order, are exactly the ids
 *    that open the bullets of this PINNED READER SET, read from this file's own source (an anchor outside its literals).
 * NOT CLAIMED by this file: a query() call, a dispatch or a beforeDispatch entry made after a trial's quiescence point
 * (from a longer timer, at a later call or event, at the test's teardown or in another process, for example);
 * src/index.ts's own producer (its settings re-read and identity verification) and the registered workflow tools,
 * which reach this host only through the SDK module; the local-detached host and its basis() check; function authority
 * at the final dispatch boundary (test/workbench-function-authority.test.ts pins the standalone seam, and packet P03
 * owns the registered composition); per-agent skip or retry while parked (test/workbench-mwi-cancel-repro.test.ts); a
 * run abort while parked (F10 of test/workbench-claude-cancel-faults.test.ts); any other operator change, tool,
 * capability, role or SDK message sequence than the rows'.
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
  "'PARK-REVOKE-GRANT': settled as the IDENTITY_CONFLICT refusal; at the quiescence point one beforeDispatch entry and no query() call",
  "'PARK-CHANGE-PRINCIPAL': settled as the IDENTITY_CONFLICT refusal; at the quiescence point one beforeDispatch entry and no query() call",
  "PARK-CONTROL: the same parked sequence with no change settles ok; at the quiescence point one beforeDispatch entry and one query() call",
  "QUIESCE-PARK: a query() call from a 50 ms timer set once the agent settled is counted at the quiescence point",
  "'WRITE-REVOKE-GRANT': capability_invoke is rejected with the IDENTITY_CONFLICT text; at the quiescence point the write fixture has no dispatch",
  "'WRITE-CHANGE-PRINCIPAL': capability_invoke is rejected with the IDENTITY_CONFLICT text; at the quiescence point the write fixture has no dispatch",
  "WRITE-CONTROL: with no change the write returns; at the quiescence point exactly one dispatch, under the principal and grants the host was built with",
  "QUIESCE-WRITE: a write dispatch from a 50 ms timer set once the agent settled is counted at the quiescence point",
  "ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail",
] as const;

/** A trial's quiescence wait, set once its agent has settled (the header's QUIESCENCE POINT). */
const QUIESCE_MS = 50;

function quiescence(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, QUIESCE_MS));
}

/** The operator the host-owned basis check re-reads: its grants and principal, both changed by the rows. */
interface Operator {
  grants: string[];
  principal: { id: string; role: string };
}

function operator(): Operator {
  return { grants: [...WRITE_GRANTS], principal: { ...PRINCIPAL } };
}

/** The two operator changes every stage's rows apply: the write's permission grant revoked, or the principal id changed. */
function revokeWriteGrant(state: Operator): void {
  state.grants = state.grants.filter(grant => grant !== "fixture:write");
}

function changePrincipal(state: Operator): void {
  state.principal.id = "local-operator:2000";
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

/**
 * Park the agent's admission, apply `change` while it is parked, release it, and once the agent has settled read the
 * counts at the quiescence point; `plant` runs once the agent has settled, before the quiescence wait is set.
 */
async function parkedTrial(change: (state: Operator) => void, options: { script?: (call: FakeSdkCall) => void; plant?: (sdk: FakeClaudeSdk) => void } = {}) {
  const state = operator();
  const sdk = fakeSdk(options.script);
  const admission = parkedAdmission(state, basisOf(state));
  const host = createClaudeWorkflowHost({ cwd: process.cwd(), query: sdk.query, grants: [...state.grants], principal: { ...state.principal }, beforeDispatch: admission.beforeDispatch });
  const settled = host.spawnAgent(spawn("general-purpose"));
  await admission.entered;
  change(state);
  admission.release();
  // With no script nothing ends a stream, so the settlement is raced against the first query(), as F10 of
  // test/workbench-claude-cancel-faults.test.ts does: a host that started the SDK before its admission settled reads as
  // query-started here instead of waiting on a stream nobody ends.
  const outcome = options.script ? await settled : await Promise.race([settled, sdk.call(0).then(() => "query-started" as const)]);
  options.plant?.(sdk);
  await quiescence();
  return { outcome, atQuiescence: { entries: admission.counts.entries, calls: sdk.calls.length } };
}

describe("a basis change while the agent's admission is parked refuses the agent, and at the quiescence point query() has no call", () => {
  const rows = [
    { id: "PARK-REVOKE-GRANT", change: revokeWriteGrant },
    { id: "PARK-CHANGE-PRINCIPAL", change: changePrincipal },
  ];
  it.each(rows)("$id: settled as the IDENTITY_CONFLICT refusal; at the quiescence point one beforeDispatch entry and no query() call", async row => {
    const trial = await parkedTrial(row.change);
    expect(trial.outcome).toEqual({ ok: false, error: CONFLICT });
    expect(trial.atQuiescence).toEqual({ entries: 1, calls: 0 });
  });

  it("PARK-CONTROL: the same parked sequence with no change settles ok; at the quiescence point one beforeDispatch entry and one query() call", async () => {
    const trial = await parkedTrial(() => {}, {
      script: call => {
        call.push(...sdkSuccess("sdk-park-control", "done"));
        call.end();
      },
    });
    expect(trial.outcome).toMatchObject({ ok: true, sessionId: "sdk-park-control" });
    expect(trial.atQuiescence).toEqual({ entries: 1, calls: 1 });
  });

  it("QUIESCE-PARK: a query() call from a 50 ms timer set once the agent settled is counted at the quiescence point", async () => {
    const trial = await parkedTrial(revokeWriteGrant, {
      plant: sdk => {
        setTimeout(() => {
          sdk.query({ prompt: "planted once the agent settled", options: { abortController: new AbortController() } });
        }, 50);
      },
    });
    expect(trial.outcome).toEqual({ ok: false, error: CONFLICT });
    expect(trial.atQuiescence).toEqual({ entries: 1, calls: 1 });
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

/**
 * Start the writer agent, apply `change` once its query() is live, make the final write call and end the stream, and
 * once the agent has settled read the counts at the quiescence point; `plant` runs once the agent has settled, before
 * the quiescence wait is set.
 */
async function finalWrite(change: (state: Operator) => void, plant?: (registry: CapabilityRegistry) => void) {
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
  plant?.(registry);
  await quiescence();
  const content = reply.content as Array<{ type: string; text: string }>;
  return { reply, payload: JSON.parse(content[0].text) as Record<string, unknown>, result, atQuiescence: { entries, writes: [...writes] } };
}

describe("the final write call of a live session re-reads the basis, and at the quiescence point no dispatch ran under a stale principal or grant", () => {
  const rows = [
    { id: "WRITE-REVOKE-GRANT", change: revokeWriteGrant },
    { id: "WRITE-CHANGE-PRINCIPAL", change: changePrincipal },
  ];
  it.each(rows)("$id: capability_invoke is rejected with the IDENTITY_CONFLICT text; at the quiescence point the write fixture has no dispatch", async row => {
    const trial = await finalWrite(row.change);
    expect(trial.reply.isError).toBe(true);
    expect(trial.payload).toEqual({ kind: "rejected", category: "transport", diagnostic: CONFLICT });
    expect(trial.result).toMatchObject({ ok: true, sessionId: "sdk-final-write" });
    expect(trial.atQuiescence.writes).toHaveLength(0);
    expect(trial.atQuiescence.entries).toBe(2);
  });

  it("WRITE-CONTROL: with no change the write returns; at the quiescence point exactly one dispatch, under the principal and grants the host was built with", async () => {
    const trial = await finalWrite(() => {});
    expect(trial.reply.isError).not.toBe(true);
    expect(trial.payload).toEqual({ kind: "returned", value: { status: "WRITTEN" } });
    expect(trial.result).toMatchObject({ ok: true, sessionId: "sdk-final-write" });
    expect(trial.atQuiescence.writes).toHaveLength(1);
    expect(trial.atQuiescence.writes[0].principal).toEqual(PRINCIPAL);
    expect(trial.atQuiescence.writes[0].grants).toEqual([...WRITE_GRANTS]);
    expect(trial.atQuiescence.entries).toBe(2);
  });

  it("QUIESCE-WRITE: a write dispatch from a 50 ms timer set once the agent settled is counted at the quiescence point", async () => {
    const trial = await finalWrite(revokeWriteGrant, registry => {
      setTimeout(() => {
        void registry.invoke(WRITE_ID, {}, { grants: [...WRITE_GRANTS], principal: { ...PRINCIPAL }, signal: new AbortController().signal });
      }, 50);
    });
    expect(trial.payload).toEqual({ kind: "rejected", category: "transport", diagnostic: CONFLICT });
    expect(trial.atQuiescence.writes.map(write => write.grants)).toEqual([[...WRITE_GRANTS]]);
    expect(trial.atQuiescence.entries).toBe(2);
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
