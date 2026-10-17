/**
 * workbench-local-detached-effects.test.ts — node effect metadata on the
 * optional local detached host (wb-6hb.1, the W12 residual).
 *
 * The detached child runs its interpreter against the host that
 * createDetachedWorkflowHost builds. That host declares node effect metadata
 * from the pinned provider manifest — the enabled native adapters'
 * descriptors, or exactly the reviewed local manifest's allowlist — so a
 * journal recorded through it carries each producer's effect class, and a
 * resume stops on a journaled non-read effect with a typed uncertain-effect
 * instead of re-running it live. The host-agnostic contract is pinned in
 * workflow-effect-replay.test.ts; these cases drive the same admission through
 * the detached host's own construction.
 */

import { describe, expect, it } from "vitest";
import { CapabilityRegistry, type InvocationContext } from "../src/workbench/capability-registry.js";
import { createDetachedWorkflowHost, type DetachedHostRequest } from "../src/workbench/hosts/local-detached.js";
import { registerNativeForgeGateStatus } from "../src/workbench/providers/forge.js";
import { registerNativeFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { nodeJournalKey, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { type RunWorkflowOptions, runWorkflow, type WorkflowHost, type WorkflowRunResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "detached-effects", description: "detached effect probe" };\n';
const GRANT = "fixture:local";
const WORKSPACE = "/fixture/workspace";
const OPERATOR = { id: "local-os:uid:4242", role: "local-operator" } as const;
const SCHEMA = { type: "object", properties: { value: { type: "string" } }, required: ["value"], additionalProperties: false };

type Effect = "read" | "write" | "external" | "unknown";

interface Invocation {
  id: string;
  input: unknown;
  context: InvocationContext;
}

/** A controlled local provider (never native evidence): declared classes, recorded calls. */
function localProvider(effects: Readonly<Record<string, Effect>>, options: { lose?: boolean; version?: string } = {}) {
  const invocations: Invocation[] = [];
  const registry = new CapabilityRegistry();
  for (const [id, effectClass] of Object.entries(effects)) {
    registry.register({
      descriptor: {
        id,
        version: options.version ?? "1.0.0",
        description: "controlled local fixture, not native",
        inputSchema: SCHEMA,
        effectClass,
        permissions: [GRANT],
        supportedModes: ["invoke"],
        contractSource: "fixture:local",
      },
      async invoke(input, context) {
        invocations.push({ id, input, context });
        if (options.lose) throw new Error("fixture lost the producer's answer");
        return { id, echoed: input };
      },
    });
  }
  return { registry, invocations };
}

/** The reviewed local manifest an admitted deterministic request carries. */
function manifest(capabilities: readonly string[], digest = `sha256:${"a".repeat(64)}`): NonNullable<DetachedHostRequest["localProvider"]> {
  return { kind: "trusted-local", version: "1.0.0", modulePath: `${WORKSPACE}/provider.mjs`, digest, capabilities };
}

function localRequest(capabilities: readonly string[], overrides: Partial<DetachedHostRequest> = {}): DetachedHostRequest {
  return {
    backend: "deterministic",
    cwd: WORKSPACE,
    invocationId: "detached-effects",
    providers: [],
    grants: [GRANT],
    localProvider: manifest(capabilities),
    ...overrides,
  };
}

function detachedHost(registry: CapabilityRegistry, request: DetachedHostRequest, beforeDispatch: () => void = () => {}): WorkflowHost {
  return createDetachedWorkflowHost({ request, registry, principal: OPERATOR, signal: new AbortController().signal, beforeDispatch });
}

/** Record the journal a run writes, so the next run can resume from it. */
function recorder() {
  const entries: WorkflowJournalEntry[] = [];
  return { entries, append: (entry: WorkflowJournalEntry) => entries.push(entry) };
}

/**
 * The row a resume consults at a run's single node position: the last node
 * row there. A non-read node is journaled at dispatch and again once it
 * settles (wb-5x0.1), and runtime.ts keys node rows last-wins.
 */
function recordedNode(entries: readonly WorkflowJournalEntry[]): WorkflowJournalEntry | undefined {
  return entries.filter(entry => entry.kind === "node").at(-1);
}

const run = (body: string, host: WorkflowHost, journal?: RunWorkflowOptions["journal"]) =>
  runWorkflow({ script: HEAD + body, host, ...(journal ? { journal } : {}) });

const nodeRows = (result: WorkflowRunResult) =>
  result.progress.filter(
    (entry): entry is Extract<WorkflowRunResult["progress"][number], { type: "workflow_node" }> => entry.type === "workflow_node",
  );

describe("detached node effect metadata comes from the provider manifest", () => {
  it("declares each reviewed local capability's class and vouches for nothing outside the allowlist", () => {
    const { registry } = localProvider({ "local.fixture-read": "read", "local.fixture-write": "write", "local.fixture-unlisted": "write" });
    const host = detachedHost(registry, localRequest(["local.fixture-read", "local.fixture-write"]));

    expect(host.describeNodeEffect?.("local.fixture-read")).toBe("read");
    expect(host.describeNodeEffect?.("local.fixture-write")).toBe("write");
    // Registered but never reviewed: the manifest, not the registry, bounds what the host vouches for.
    expect(host.describeNodeEffect?.("local.fixture-unlisted")).toBeUndefined();
    expect(host.describeNodeEffect?.("local.fixture-absent")).toBeUndefined();
  });

  it("declares the native adapters' read class for exactly the providers the invocation enables", () => {
    const registry = new CapabilityRegistry();
    registerNativeForgeGateStatus(registry, WORKSPACE);
    registerNativeFurnaceRunInspect(registry, WORKSPACE);
    const host = detachedHost(registry, { backend: "deterministic", cwd: WORKSPACE, invocationId: "native", providers: ["forge"], grants: ["forge:inspect"] });

    expect(host.describeNodeEffect?.("forge.gate.status")).toBe("read");
    expect(host.describeNodeEffect?.("furnace.run.inspect")).toBeUndefined();
  });

  it("journals each detached node under its declared class and basis, keeping an answer only for a read", async () => {
    const { registry } = localProvider({ "local.fixture-read": "read", "local.fixture-write": "write" });
    const host = detachedHost(registry, localRequest(["local.fixture-read", "local.fixture-write"]));
    const journal = recorder();

    const result = await run('await node("local.fixture-read", { value: "x" });\nreturn await node("local.fixture-write", { value: "y" });', host, journal);

    expect(result.status).toBe("completed");
    expect(host.replayBasis).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(journal.entries).toEqual([
      {
        kind: "node",
        index: 0,
        key: nodeJournalKey("local.fixture-read", JSON.stringify({ value: "x" })),
        ok: true,
        capabilityId: "local.fixture-read",
        effectClass: "read",
        text: JSON.stringify({ id: "local.fixture-read", echoed: { value: "x" } }),
        basis: host.replayBasis,
      },
      // The write is on record from dispatch: its marker, then the settled row that supersedes it (wb-5x0.1).
      {
        kind: "node",
        index: 1,
        key: nodeJournalKey("local.fixture-write", JSON.stringify({ value: "y" })),
        ok: false,
        capabilityId: "local.fixture-write",
        effectClass: "write",
        basis: host.replayBasis,
        dispatched: true,
      },
      {
        kind: "node",
        index: 1,
        key: nodeJournalKey("local.fixture-write", JSON.stringify({ value: "y" })),
        ok: true,
        capabilityId: "local.fixture-write",
        effectClass: "write",
        basis: host.replayBasis,
      },
    ]);
  });
});

describe("a detached resume never re-runs a journaled effect", () => {
  const capabilities = ["local.fixture-write", "local.fixture-read"];
  const effects = { "local.fixture-write": "write", "local.fixture-read": "read" } as const;
  const script = 'await node("local.fixture-write", { value: "x" });\nreturn await node("local.fixture-read", { value: "after" });';

  it("neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect naming its producer", async () => {
    const first = localProvider(effects);
    const journal = recorder();
    const one = await run(script, detachedHost(first.registry, localRequest(capabilities)), journal);
    expect(one.status).toBe("completed");
    expect(first.invocations.map(call => call.id)).toEqual(["local.fixture-write", "local.fixture-read"]);

    const second = localProvider(effects);
    const result = await run(script, detachedHost(second.registry, localRequest(capabilities)), { entries: journal.entries });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(result.error).toContain("local.fixture-write");
    expect(result.error).toContain('producer "local"');
    expect(result.error).toContain("resumeFromRunId");
    // The write was not re-executed, and the run did not continue past it.
    expect(second.invocations).toHaveLength(0);
  });

  it.each(["external", "unknown"] as const)("refuses a journaled %s effect the same way", async effectClass => {
    const body = 'return await node("local.fixture-effect", { value: "x" });';
    const first = localProvider({ "local.fixture-effect": effectClass });
    const journal = recorder();
    expect((await run(body, detachedHost(first.registry, localRequest(["local.fixture-effect"])), journal)).status).toBe("completed");
    expect(recordedNode(journal.entries)).toMatchObject({ kind: "node", capabilityId: "local.fixture-effect", effectClass });
    expect(recordedNode(journal.entries)).not.toHaveProperty("dispatched");

    const second = localProvider({ "local.fixture-effect": effectClass });
    const result = await run(body, detachedHost(second.registry, localRequest(["local.fixture-effect"])), { entries: journal.entries });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(second.invocations).toHaveLength(0);
  });

  it("refuses even when the call at that position changed its input", async () => {
    // A different input is a different operation, but the journaled write at
    // this position still happened; the resume cannot step over it.
    const first = localProvider({ "local.fixture-write": "write" });
    const journal = recorder();
    await run('return await node("local.fixture-write", { value: "old" });', detachedHost(first.registry, localRequest(["local.fixture-write"])), journal);

    const second = localProvider({ "local.fixture-write": "write" });
    const result = await run('return await node("local.fixture-write", { value: "new" });', detachedHost(second.registry, localRequest(["local.fixture-write"])), {
      entries: journal.entries,
    });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(second.invocations).toHaveLength(0);
  });

  it("refuses a write whose first attempt lost its answer instead of retrying it", async () => {
    // The producer may have acted before the answer was lost. The registry
    // already reports that as uncertain; the journal must keep saying so.
    const body = 'return await node("local.fixture-write", { value: "x" });';
    const lost = localProvider({ "local.fixture-write": "write" }, { lose: true });
    const journal = recorder();
    const one = await run(body, detachedHost(lost.registry, localRequest(["local.fixture-write"])), journal);
    expect(one.status).toBe("failed");
    expect(one.capabilityError?.category).toBe("uncertain-effect");
    expect(lost.invocations).toHaveLength(1);
    expect(recordedNode(journal.entries)).toMatchObject({ kind: "node", ok: false, capabilityId: "local.fixture-write", effectClass: "write" });
    expect(recordedNode(journal.entries)).not.toHaveProperty("dispatched");

    const healthy = localProvider({ "local.fixture-write": "write" });
    const result = await run(body, detachedHost(healthy.registry, localRequest(["local.fixture-write"])), { entries: journal.entries });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(healthy.invocations).toHaveLength(0);
  });

  it("refuses a journaled read whose capability the manifest now declares as an effect", async () => {
    const body = 'return await node("local.fixture-sync", { value: "x" });';
    const before = localProvider({ "local.fixture-sync": "read" });
    const journal = recorder();
    await run(body, detachedHost(before.registry, localRequest(["local.fixture-sync"])), journal);
    expect(journal.entries[0]).toMatchObject({ kind: "node", effectClass: "read" });

    const after = localProvider({ "local.fixture-sync": "write" }, { version: "2.0.0" });
    const result = await run(body, detachedHost(after.registry, localRequest(["local.fixture-sync"])), { entries: journal.entries });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(after.invocations).toHaveLength(0);
  });

  it("carries the refused effect forward, so resuming the failed resume stays protected", async () => {
    const one = recorder();
    await run(script, detachedHost(localProvider(effects).registry, localRequest(capabilities)), one);

    const two = recorder();
    const refused = await run(script, detachedHost(localProvider(effects).registry, localRequest(capabilities)), {
      entries: one.entries,
      append: two.append,
    });
    expect(refused.status).toBe("failed");
    expect(two.entries.find(entry => entry.kind === "node")).toMatchObject({ kind: "node", capabilityId: "local.fixture-write", effectClass: "write" });

    const third = localProvider(effects);
    const again = await run(script, detachedHost(third.registry, localRequest(capabilities)), { entries: two.entries });
    expect(again.status).toBe("failed");
    expect(again.capabilityError?.category).toBe("uncertain-effect");
    expect(third.invocations).toHaveLength(0);
  });
});

describe("detached reads and the replay basis", () => {
  it("re-observes a journaled read live on the deterministic backend, which never replays", async () => {
    // The deterministic backend keeps its pre-policy stance: it has no settled
    // agents to reuse, and a resume re-observes its reads live (freshness
    // unknown) rather than handing back the earlier run's answer as stale, even
    // under an identical basis. A resume still never re-runs an effect.
    const body = 'return await node("local.fixture-read", { value: "x" });';
    const first = localProvider({ "local.fixture-read": "read" });
    const journal = recorder();
    const recording = detachedHost(first.registry, localRequest(["local.fixture-read"]));
    expect(recording.replaySafe).toBe(false);
    await run(body, recording, journal);
    expect(journal.entries[0]).toMatchObject({ kind: "node", effectClass: "read", basis: recording.replayBasis });

    const second = localProvider({ "local.fixture-read": "read" });
    const resuming = detachedHost(second.registry, localRequest(["local.fixture-read"]));
    expect(resuming.replayBasis).toBe(recording.replayBasis);
    const result = await run(body, resuming, { entries: journal.entries });

    expect(result.status).toBe("completed");
    expect(second.invocations).toHaveLength(1);
    expect(nodeRows(result).at(-1)).toMatchObject({ state: "done", freshness: "unknown" });
  });

  it("declares a replay basis scoped to the provider manifest and host policy, not to per-run identity", () => {
    const effects = { "local.fixture-read": "read", "local.fixture-write": "write" } as const;
    const ids = Object.keys(effects);
    const basis = (request: DetachedHostRequest, registry = localProvider(effects).registry) => detachedHost(registry, request).replayBasis;
    const pinned = basis(localRequest(ids));

    expect(pinned).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(basis(localRequest(ids))).toBe(pinned);
    // Per-run identity stays out of it, as it does for the Claude host's basis.
    expect(basis(localRequest(ids, { invocationId: "another-run" }))).toBe(pinned);
    // Grants are a set: their order decides nothing a provider sees.
    expect(basis(localRequest(ids, { grants: ["extra:grant", GRANT] }))).toBe(basis(localRequest(ids, { grants: [GRANT, "extra:grant"] })));
    // Everything a node answer depends on beyond its own payload moves it.
    expect(basis(localRequest(ids), localProvider({ ...effects, "local.fixture-read": "write" }).registry)).not.toBe(pinned);
    expect(basis(localRequest(ids), localProvider(effects, { version: "1.0.1" }).registry)).not.toBe(pinned);
    expect(basis(localRequest(ids, { localProvider: manifest(ids, `sha256:${"b".repeat(64)}`) }))).not.toBe(pinned);
    expect(basis(localRequest(ids, { cwd: "/fixture/elsewhere" }))).not.toBe(pinned);
    expect(basis(localRequest(ids, { grants: [GRANT, "extra:grant"] }))).not.toBe(pinned);
  });

  it("records the declared basis on the agent entries the runtime scopes by it", async () => {
    const host = detachedHost(localProvider({ "local.fixture-read": "read" }).registry, localRequest(["local.fixture-read"]));
    const journal = recorder();

    // The deterministic host never substitutes a fake model, so the agent is a null.
    const result = await run('const answer = await agent("probe");\nreturn answer === null;', host, journal);

    expect(result.status).toBe("completed");
    expect(result.value).toBe(true);
    expect(host.replayBasis).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(journal.entries).toEqual([expect.objectContaining({ index: 0, ok: false, basis: host.replayBasis })]);
  });
});

describe("the detached Claude backend replays a journaled read only under its own basis", () => {
  // A controlled fixture standing in for the native Forge adapter's descriptor
  // (never native evidence): the detached host reads only its metadata and
  // dispatches through the Claude host, so nothing here spawns Forge.
  function forgeFixture(version = "1.0.0") {
    const invocations: unknown[] = [];
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: {
        id: "forge.gate.status",
        version,
        description: "controlled fixture standing in for the native adapter, not native",
        inputSchema: SCHEMA,
        effectClass: "read",
        permissions: ["forge:inspect"],
        supportedModes: ["invoke"],
        contractSource: "fixture:native-stand-in",
      },
      async invoke(input) {
        invocations.push(input);
        return { version, echoed: input };
      },
    });
    return { registry, invocations };
  }
  const request: DetachedHostRequest = {
    backend: "claude",
    cwd: WORKSPACE,
    invocationId: "claude-replay",
    providers: ["forge"],
    grants: ["forge:inspect", "claude:invoke"],
    claude: { model: "claude-fixture" },
  };
  const body = 'return await node("forge.gate.status", { value: "x" });';

  it("hands back the recorded read, marked stale, under an identical basis", async () => {
    const first = forgeFixture();
    const recording = detachedHost(first.registry, request);
    expect(recording.replaySafe).toBe(true);
    const journal = recorder();
    expect((await run(body, recording, journal)).status).toBe("completed");
    expect(journal.entries[0]).toMatchObject({ kind: "node", capabilityId: "forge.gate.status", effectClass: "read", basis: recording.replayBasis });

    const second = forgeFixture();
    const result = await run(body, detachedHost(second.registry, request), { entries: journal.entries });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ version: "1.0.0", echoed: { value: "x" } });
    expect(second.invocations).toHaveLength(0);
    expect(nodeRows(result).at(-1)).toMatchObject({ state: "done", freshness: "stale" });
  });

  it("re-reads live when the provider manifest moved, though the Claude host's own policy did not", async () => {
    // The Claude host's basis covers model, permissions, tools, grants and cwd,
    // not the provider manifest; the detached basis adds it, and the runtime
    // now admits a node read only under the basis it was recorded with.
    const journal = recorder();
    await run(body, detachedHost(forgeFixture().registry, request), journal);

    const moved = forgeFixture("1.0.1");
    const resuming = detachedHost(moved.registry, request);
    expect(resuming.replayBasis).not.toBe(journal.entries[0].basis);
    const result = await run(body, resuming, { entries: journal.entries });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ version: "1.0.1", echoed: { value: "x" } });
    expect(moved.invocations).toEqual([{ value: "x" }]);
    expect(nodeRows(result).at(-1)).toMatchObject({ state: "done", freshness: "unknown" });
  });
});

describe("the detached host's construction", () => {
  it("declares the same manifest metadata through the Claude backend", () => {
    const registry = new CapabilityRegistry();
    registerNativeForgeGateStatus(registry, WORKSPACE);
    const request: DetachedHostRequest = {
      backend: "claude",
      cwd: WORKSPACE,
      invocationId: "claude-backend",
      providers: ["forge"],
      grants: ["forge:inspect", "claude:invoke"],
      claude: { model: "claude-fixture" },
    };
    const host = detachedHost(registry, request);

    expect(host.describeNodeEffect?.("forge.gate.status")).toBe("read");
    expect(host.replayBasis).toMatch(/^sha256:[a-f0-9]{64}$/);
    // The Claude host's own policy, model pin included, still scopes the basis.
    expect(detachedHost(registry, { ...request, claude: { model: "claude-other" } }).replayBasis).not.toBe(host.replayBasis);
  });

  it("refuses nested workflow resolution on both backends", () => {
    for (const backend of ["deterministic", "claude"] as const) {
      const host = detachedHost(new CapabilityRegistry(), { backend, cwd: WORKSPACE, invocationId: "nested", providers: [], grants: [] });
      // Nested filesystem resolution would load mutable, unpinned source.
      expect(host.loadWorkflow).toBeUndefined();
    }
  });

  it("re-checks the pinned basis before every dispatch and binds operator and workspace host-side", async () => {
    const body = 'return await node("local.fixture-read", { value: "x" });';
    const fixture = localProvider({ "local.fixture-read": "read" });
    let checks = 0;
    const result = await run(
      body,
      detachedHost(fixture.registry, localRequest(["local.fixture-read"]), () => {
        checks++;
      }),
    );

    expect(result.status).toBe("completed");
    expect(checks).toBe(1);
    expect(fixture.invocations[0].context).toMatchObject({ invocationId: "detached-effects", workspace: WORKSPACE, principal: OPERATOR });

    const conflicted = localProvider({ "local.fixture-read": "read" });
    const refused = await run(
      body,
      detachedHost(conflicted.registry, localRequest(["local.fixture-read"]), () => {
        throw new Error("IDENTITY_CONFLICT: implementation/config/source changed.");
      }),
    );

    expect(refused.status).toBe("failed");
    expect(refused.error).toContain("IDENTITY_CONFLICT");
    expect(conflicted.invocations).toHaveLength(0);
  });

  it("refuses a capability outside the reviewed local manifest before it reaches the provider", async () => {
    const fixture = localProvider({ "local.fixture-read": "read", "local.fixture-unlisted": "read" });

    const result = await run('return await node("local.fixture-unlisted", { value: "x" });', detachedHost(fixture.registry, localRequest(["local.fixture-read"])));

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("authorization");
    expect(fixture.invocations).toHaveLength(0);
  });
});
