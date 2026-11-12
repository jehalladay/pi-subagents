/**
 * workflow-dx-p09-node-admission.test.ts — wb-q0on, EAT-R358 and EAT-R363 (program pi-system-dx-triage-2026-11-11,
 * requirements/.work/req-r-ops.md). The node admission path of the REAL createClaudeWorkflowHost over a REAL
 * CapabilityRegistry holding two fixture capabilities (a write stand-in and a read), driven by runWorkflow with an
 * in-memory journal recorder. The fixtures record every invocation; nothing native runs and no module is mocked.
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - R358-C1-UNKNOWN, R358-C1-SCHEMA, R358-C1-GRANT: an unknown capability id, an input the write fixture's schema
 *    refuses, and a missing invoke grant each settle the run failed with the registry's category (unavailable,
 *    validation, authorization), leave no node row of any kind in the journal (no dispatched marker, no settled row) and
 *    invoke no fixture.
 *  - R358-C1-DETACHED: the REAL deterministic local-detached host does the same for a capability outside its reviewed
 *    manifest (authorization) and an input the manifest capability's schema refuses (validation).
 *  - R358-C2-INPUT and R358-C2-GRANT: a resume handed the first run's journal, with the input corrected or the grant
 *    added, completes with one fixture invocation and no uncertain-effect refusal.
 *  - R358-C3-ORDER: an admitted write call journals its dispatched marker before the fixture runs (the fixture reads the
 *    recorder when invoked) and its settled row after.
 *  - R358-C3-LOST: an admitted write call whose marker append reports false is refused fail-closed, typed unavailable,
 *    with no fixture invocation.
 *  - R363-C1: wrong target type, missing target, a disallowed extra key and a null input each fail typed validation in
 *    the script realm (instanceof CapabilityError), name the capability id in the message, carry a JSON-pointer path and
 *    a constraint, and the four (path, constraint) pairs are distinct; no fixture runs.
 *  - R363-C2: a credential-shaped value under an extra key and under a wrong-typed target appears in no diagnostic field,
 *    control bytes in the extra key's name are stripped from the path, and an uncaught refusal reaches
 *    result.capabilityError with the same path and constraint.
 *  - R363-C2-SCHEMA-TEXT: an escape sequence the schema itself carries (a required property's name, a pattern the
 *    validator quotes in its constraint) is stripped from the path and from the constraint.
 * NOT CLAIMED by this file: the local-detached host's Claude backend, the booted extension's registered tools
 * (test/workflow-journal-dispatch-wiring.test.ts pins the extension seam), and the wording of keywords other than type,
 * required and additionalProperties.
 */

import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createDetachedWorkflowHost } from "../src/workbench/hosts/local-detached.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "dx-p09-admission", description: "node admission" };\n';
const TARGET_SCHEMA = {
  type: "object",
  properties: { target: { type: "string", minLength: 1 } },
  required: ["target"],
  additionalProperties: false,
};
const WRITE_GRANT = "fixture:write";
const READ_GRANT = "fixture:read";
/** Obviously fake, credential-shaped (standing rule 3). */
const FAKE_CREDENTIAL = "sk-ant-FAKEFAKEFAKEFAKE0000";

function fixtures(options: { onWrite?: () => void } = {}) {
  const invocations: string[] = [];
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: { id: "fixture.write", version: "1.0.0", description: "write FIXTURE, no real effect", inputSchema: TARGET_SCHEMA, effectClass: "write", permissions: [WRITE_GRANT], supportedModes: ["invoke"] },
    async invoke() {
      options.onWrite?.();
      invocations.push("fixture.write");
      return { written: true };
    },
  });
  registry.register({
    descriptor: { id: "fixture.target", version: "1.0.0", description: "read FIXTURE", inputSchema: TARGET_SCHEMA, effectClass: "read", permissions: [READ_GRANT], supportedModes: ["invoke"] },
    async invoke() {
      invocations.push("fixture.target");
      return { read: true };
    },
  });
  return { registry, invocations };
}

function host(registry: CapabilityRegistry, grants: readonly string[]) {
  return createClaudeWorkflowHost({
    cwd: process.cwd(), capabilities: registry, grants, invocationId: "dx-p09-admission",
    principal: { id: "local-operator:fixture", role: "local-operator" },
  });
}

function recorder(append: (entry: WorkflowJournalEntry) => boolean = () => true) {
  const entries: WorkflowJournalEntry[] = [];
  return { entries, journal: { append: (entry: WorkflowJournalEntry) => { entries.push(entry); return append(entry); } } };
}

const nodeRows = (entries: readonly WorkflowJournalEntry[]) => entries.filter(entry => entry.kind === "node");

describe("EAT-R358: a node refused before any provider runs records no dispatch", () => {
  it.each([
    { id: "R358-C1-UNKNOWN", body: 'return await node("fixture.typo", { target: "x" });', grants: [WRITE_GRANT], category: "unavailable" },
    { id: "R358-C1-SCHEMA", body: 'return await node("fixture.write", { target: 5 });', grants: [WRITE_GRANT], category: "validation" },
    { id: "R358-C1-GRANT", body: 'return await node("fixture.write", { target: "x" });', grants: [], category: "authorization" },
  ])("$id: refused typed $category, no node row is journaled and no fixture runs", async ({ body, grants, category }) => {
    const { registry, invocations } = fixtures();
    const { entries, journal } = recorder();
    const result = await runWorkflow({ script: `${HEAD}${body}`, host: host(registry, grants), journal });
    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe(category);
    expect(nodeRows(entries)).toEqual([]);
    expect(invocations).toEqual([]);
  });

  it("R358-C1-DETACHED: the deterministic local-detached host journals no node row for a manifest or schema refusal", async () => {
    const { registry, invocations } = fixtures();
    const host = createDetachedWorkflowHost({
      request: {
        backend: "deterministic", cwd: "/fixture/workspace", invocationId: "dx-p09-detached", providers: [], grants: [WRITE_GRANT],
        localProvider: { kind: "trusted-local", version: "1.0.0", modulePath: "/fixture/workspace/provider.mjs", digest: `sha256:${"a".repeat(64)}`, capabilities: ["fixture.write"] },
      },
      registry, principal: { id: "local-os:uid:4242", role: "local-operator" }, signal: new AbortController().signal, beforeDispatch: () => {},
    });
    for (const [body, category] of [['return await node("fixture.target", { target: "x" });', "authorization"], ['return await node("fixture.write", { target: 5 });', "validation"]] as const) {
      const { entries, journal } = recorder();
      const result = await runWorkflow({ script: `${HEAD}${body}`, host, journal });
      expect(result.status).toBe("failed");
      expect(result.capabilityError?.category).toBe(category);
      expect(nodeRows(entries)).toEqual([]);
    }
    expect(invocations).toEqual([]);
  });

  it("R358-C2-INPUT: a resume with the corrected input runs past the refused position with one invocation", async () => {
    const { registry, invocations } = fixtures();
    const first = recorder();
    const refused = await runWorkflow({ script: `${HEAD}return await node("fixture.write", { target: 5 });`, host: host(registry, [WRITE_GRANT]), journal: first.journal });
    expect(refused.capabilityError?.category).toBe("validation");
    const resumed = await runWorkflow({
      script: `${HEAD}return await node("fixture.write", { target: "x" });`, host: host(registry, [WRITE_GRANT]),
      journal: { entries: first.entries, append: () => true },
    });
    expect(resumed.status).toBe("completed");
    expect(resumed.capabilityError).toBeUndefined();
    expect(invocations).toEqual(["fixture.write"]);
  });

  it("R358-C2-GRANT: a resume under the added grant runs past the refused position with one invocation", async () => {
    const { registry, invocations } = fixtures();
    const first = recorder();
    const script = `${HEAD}return await node("fixture.write", { target: "x" });`;
    const refused = await runWorkflow({ script, host: host(registry, []), journal: first.journal });
    expect(refused.capabilityError?.category).toBe("authorization");
    const resumed = await runWorkflow({ script, host: host(registry, [WRITE_GRANT]), journal: { entries: first.entries, append: () => true } });
    expect(resumed.status).toBe("completed");
    expect(invocations).toEqual(["fixture.write"]);
  });

  it("R358-C3-ORDER: an admitted write journals its marker before the fixture runs and its settled row after", async () => {
    const { entries, journal } = recorder();
    const seenAtInvoke: (readonly WorkflowJournalEntry[])[] = [];
    const { registry, invocations } = fixtures({ onWrite: () => { seenAtInvoke.push([...entries]); } });
    const result = await runWorkflow({ script: `${HEAD}return await node("fixture.write", { target: "x" });`, host: host(registry, [WRITE_GRANT]), journal });
    expect(result.status).toBe("completed");
    expect(invocations).toEqual(["fixture.write"]);
    expect(seenAtInvoke).toHaveLength(1);
    expect(nodeRows(seenAtInvoke[0] ?? [])).toEqual([expect.objectContaining({ index: 0, dispatched: true, effectClass: "write", capabilityId: "fixture.write" })]);
    expect(nodeRows(entries).map(row => row.dispatched === true)).toEqual([true, false]);
  });

  it("R358-C3-LOST: a marker that does not reach the journal refuses the admitted write before the fixture runs", async () => {
    const { registry, invocations } = fixtures();
    const { journal } = recorder(entry => entry.dispatched !== true);
    const result = await runWorkflow({ script: `${HEAD}return await node("fixture.write", { target: "x" });`, host: host(registry, [WRITE_GRANT]), journal });
    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("unavailable");
    expect(result.error).toContain("was not dispatched: its dispatched journal row could not be written");
    expect(invocations).toEqual([]);
  });
});

/** Each refusal as the script realm sees it. */
const PROBE = `
const probes = [{ target: 5 }, {}, { target: "x", extra: 1 }, null];
const out = [];
for (const input of probes) {
  try { await node("fixture.target", input); out.push({ ok: true }); }
  catch (error) { out.push({ typed: error instanceof CapabilityError, category: error.category, message: error.message, path: error.path, constraint: error.constraint }); }
}
return out;`;

describe("EAT-R363: node input validation names the first failing path and constraint", () => {
  it("R363-C1: wrong type, missing key, extra key and null each name a distinct path and constraint, typed validation with the capability id", async () => {
    const { registry, invocations } = fixtures();
    const result = await runWorkflow({ script: `${HEAD}${PROBE}`, host: host(registry, [READ_GRANT]) });
    expect(result.status).toBe("completed");
    const rows = result.value as { typed: boolean; category: string; message: string; path: string; constraint: string }[];
    expect(rows).toHaveLength(4);
    for (const row of rows) {
      expect(row).toMatchObject({ typed: true, category: "validation" });
      expect(row.message).toContain("fixture.target");
      expect(typeof row.path).toBe("string");
      expect(typeof row.constraint).toBe("string");
    }
    expect(rows.map(row => [row.path, row.constraint])).toEqual([
      ["/target", expect.stringContaining("string")],
      ["/target", expect.stringContaining("required")],
      ["/extra", expect.stringContaining("not an allowed property")],
      ["", expect.stringContaining("object")],
    ]);
    expect(new Set(rows.map(row => `${row.path}|${row.constraint}`)).size).toBe(4);
    expect(invocations).toEqual([]);
  });

  it("R363-C2: credential-shaped values are never echoed, control bytes in a key are stripped, and the uncaught refusal keeps its path", async () => {
    const { registry, invocations } = fixtures();
    const esc = String.fromCodePoint(0x1b);
    const extraKey = `api${esc}[31mkey`;
    const script = `${HEAD}
const inputs = [{ target: "x", ${JSON.stringify(extraKey)}: ${JSON.stringify(FAKE_CREDENTIAL)} }, { target: { token: ${JSON.stringify(FAKE_CREDENTIAL)} } }];
const out = [];
for (const input of inputs) {
  try { await node("fixture.target", input); out.push({ ok: true }); }
  catch (error) { out.push({ message: error.message, path: error.path, constraint: error.constraint }); }
}
return out;`;
    const caught = await runWorkflow({ script, host: host(registry, [READ_GRANT]) });
    expect(caught.status).toBe("completed");
    const rows = caught.value as { message: string; path: string; constraint: string }[];
    expect(rows).toHaveLength(2);
    for (const row of rows) expect(JSON.stringify(row)).not.toContain(FAKE_CREDENTIAL);
    expect(rows[0]?.path).not.toContain(esc);
    expect(rows[0]?.path).toMatch(/^\/api/);
    expect(rows[1]).toMatchObject({ path: "/target", constraint: expect.stringContaining("string") });

    const uncaught = await runWorkflow({ script: `${HEAD}return await node("fixture.target", { target: 5 });`, host: host(registry, [READ_GRANT]) });
    expect(uncaught.status).toBe("failed");
    expect(uncaught.capabilityError).toMatchObject({ name: "CapabilityError", category: "validation", path: "/target", constraint: expect.stringContaining("string") });
    expect(invocations).toEqual([]);
  });

  it("R363-C2-SCHEMA-TEXT: an escape sequence the schema carries is stripped from the path and the constraint", async () => {
    const esc = String.fromCodePoint(0x1b);
    const registry = new CapabilityRegistry();
    let invoked = 0;
    const register = (id: string, inputSchema: Record<string, unknown>) => registry.register({
      descriptor: { id, version: "1.0.0", description: "schema-text FIXTURE", inputSchema, effectClass: "read", permissions: [READ_GRANT], supportedModes: ["invoke"] },
      async invoke() { invoked++; return { read: true }; },
    });
    register("fixture.named", { type: "object", properties: {}, required: [`tar${esc}[31mget`] });
    register("fixture.pattern", { type: "object", properties: { target: { type: "string", pattern: `^ok${esc}$` } }, required: ["target"] });
    const script = `${HEAD}
const out = [];
for (const [id, input] of [["fixture.named", {}], ["fixture.pattern", { target: "nope" }]]) {
  try { await node(id, input); out.push({ ok: true }); }
  catch (error) { out.push({ category: error.category, path: error.path, constraint: error.constraint }); }
}
return out;`;
    const result = await runWorkflow({ script, host: host(registry, [READ_GRANT]) });
    expect(result.status).toBe("completed");
    const [named, pattern] = result.value as { category: string; path: string; constraint: string }[];
    expect(named).toMatchObject({ category: "validation", path: "/target", constraint: "is required" });
    expect(pattern).toMatchObject({ category: "validation", path: "/target" });
    expect(pattern?.constraint).toMatch(/^must match pattern/);
    expect(JSON.stringify([named, pattern])).not.toContain(esc);
    expect(invoked).toBe(0);
  });
});
