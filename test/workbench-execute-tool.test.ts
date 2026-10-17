/**
 * wb-syh (W16, OWNER-RESERVED): the workflow_execute Pi tool wired over the landed pure admission module.
 *
 * Bound constraints from the wb-69g.5 gate verdict and the owner's rulings:
 *   F3  one dialect reaches the model: the envelope is workbench.tool-reply/v1; the pure module's
 *       workbench.execute/v1 contract string never appears in the text the model reads.
 *   F6  detached hostMode needs BOTH workbench:execute AND workbench:detach; execute alone never launches detached.
 *   F7  principal {id, role:"local-operator"} and workspace scope arrive at the launcher on every invoke.
 *   re-decide  the admission is decided from host context at dispatch time on every call, never cached.
 *   one-liner  a trimmed native identity is not an addressable reference: trimmed refs are dropped and named.
 * Authority (grants, principal, workspace, session) comes only from host-bound context, never from params.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import type { WorkflowSource } from "../src/workbench/designer.js";
import { EXECUTE_CONTRACT_VERSION, EXECUTE_GRANT } from "../src/workbench/execute.js";
import { createWorkflowExecuteTool, DETACH_GRANT, type WorkflowExecuteDeps } from "../src/workbench/execute-tool.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";

const DIGEST = `sha256:${"ab".repeat(32)}`;
const OTHER_DIGEST = `sha256:${"cd".repeat(32)}`;
const INVOCATION = "wf_abcdef123456";
const SOURCE: WorkflowSource = Object.freeze({
  definition: Object.freeze({ kind: "script" as const, id: "/ws/.pi/workflows/demo.js", schemaVersion: "workflow-script/v1", artifactDigest: DIGEST }),
  sourceRef: "/ws/.pi/workflows/demo.js",
  source: "export const meta = { name: 'demo', description: 'd' }\nreturn 1\n",
});
const ctx = { cwd: "/ws" } as unknown as ExtensionContext;

type Reply = Record<string, unknown> & { error?: { code: string; message: string }; nativeRefs: NativeRef[] };

function definition(over: Record<string, unknown> = {}) {
  return { kind: "script", id: SOURCE.sourceRef, schemaVersion: "workflow-script/v1", artifactDigest: DIGEST, ...over };
}
function harness(over: Partial<WorkflowExecuteDeps> & { rights?: readonly string[] } = {}) {
  const { rights, ...rest } = over;
  const launchEmbedded = vi.fn(async (_ctx: ExtensionContext, launch: { invocationId: string }): Promise<readonly NativeRef[]> =>
    [{ provider: "pi-workflow", type: "task", id: launch.invocationId, scope: "/ws" }]);
  const launchDetached = vi.fn(async (_ctx: ExtensionContext, launch: { invocationId: string }): Promise<readonly NativeRef[]> =>
    [{ provider: "local-detached", type: "invocation", id: launch.invocationId }]);
  const grants = vi.fn((): readonly string[] => rights ?? [EXECUTE_GRANT]);
  const deps: WorkflowExecuteDeps = {
    grants,
    observerScope: () => ({ workspace: "/ws", principal: "local-operator:1000:s1" }),
    localPrincipal: () => "local-operator:1000:s1",
    sessionIdOf: () => "s1",
    mintInvocationId: () => INVOCATION,
    resolveSource: () => SOURCE,
    launchEmbedded,
    launchDetached,
    ...rest,
  };
  const tool = createWorkflowExecuteTool(deps);
  const run = async (params: Record<string, unknown>): Promise<{ text: string; reply: Reply }> => {
    const result = await tool.execute("call-1", params as never, undefined, undefined, ctx as never);
    const text = result.content[0]?.type === "text" ? result.content[0].text : "";
    return { text, reply: JSON.parse(text) as Reply };
  };
  return { tool, run, launchEmbedded, launchDetached, grants };
}
const embedded = (over: Record<string, unknown> = {}) => ({ definitionRef: definition(), input: { n: 1 }, hostMode: "embedded", ...over });

describe("workflow_execute wiring: admission refusals (wb-syh)", () => {
  it("is registered under the documented name and refuses a non-digest definition as a tool-reply/v1 error without launching", async () => {
    const h = harness();
    expect(h.tool.name).toBe("workflow_execute");
    const { reply } = await h.run(embedded({ definitionRef: definition({ artifactDigest: "main" }) }));
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_execute", ok: false, invoked: false, status: "refused", completion: "not-asserted" });
    expect(reply.error).toMatchObject({ code: "non-digest-definition" });
    expect(reply.nativeRefs).toEqual([]);
    // Nothing addressable was launched, so a refusal names no invocation reference.
    expect(reply).not.toHaveProperty("invocationId");
    expect(h.launchEmbedded).not.toHaveBeenCalled();
    expect(h.launchDetached).not.toHaveBeenCalled();
  });
  it("refuses without the exact execute grant; design, observe and detach grants never admit a launch", async () => {
    const h = harness({ rights: ["workbench:design", "workbench:observe", DETACH_GRANT] });
    const { reply } = await h.run(embedded());
    expect(reply.ok).toBe(false);
    expect(reply.error?.code).toBe("missing-execute-grant");
    expect(h.launchEmbedded).not.toHaveBeenCalled();
  });
  it("reads no authority from params: grants or principal supplied by the caller are ignored", async () => {
    const h = harness({ rights: [] });
    const { reply } = await h.run(embedded({ grants: [EXECUTE_GRANT], principal: { id: "root", role: "operator" } }));
    expect(reply.error?.code).toBe("missing-execute-grant");
    expect(h.launchEmbedded).not.toHaveBeenCalled();
  });
  it("re-decides at dispatch time: grants are read from host context on every call and a revocation refuses the next one", async () => {
    let rights: readonly string[] = [EXECUTE_GRANT];
    const h = harness({ grants: () => rights });
    expect((await h.run(embedded())).reply.ok).toBe(true);
    rights = [];
    const second = await h.run(embedded());
    expect(second.reply.ok).toBe(false);
    expect(second.reply.error?.code).toBe("missing-execute-grant");
    expect(h.launchEmbedded).toHaveBeenCalledTimes(1);
  });
});

describe("workflow_execute wiring: launches", () => {
  it("admits an embedded launch, reports launched with the host's native reference and never asserts completion", async () => {
    const h = harness();
    const { reply } = await h.run(embedded());
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_execute", ok: true, invoked: true, status: "launched", completion: "not-asserted", invocationId: INVOCATION, hostMode: "embedded" });
    expect(reply.definition).toEqual(definition());
    expect(reply.nativeRefs).toEqual([{ provider: "pi-workflow", type: "task", id: INVOCATION, scope: "/ws" }]);
    expect(reply).not.toHaveProperty("error");
    expect(h.launchEmbedded).toHaveBeenCalledTimes(1);
    expect(h.launchDetached).not.toHaveBeenCalled();
  });
  it("F7: the launcher receives the host principal, workspace scope, session and the admission on every invoke, never caller text", async () => {
    const h = harness();
    await h.run(embedded({ input: { n: 2 } }));
    const [, launch] = h.launchEmbedded.mock.calls[0] as unknown as [ExtensionContext, Record<string, unknown>];
    expect(launch).toMatchObject({
      invocationId: INVOCATION,
      principal: { id: "local-operator:1000:s1", role: "local-operator" },
      scope: { workspace: "/ws", principal: "local-operator:1000:s1", sessionId: "s1" },
      grant: EXECUTE_GRANT,
      admissionPolicy: "digest-pinned+exact-execute-grant",
      input: { n: 2 },
      toolCallId: "call-1",
    });
    expect(launch.source).toBe(SOURCE);
  });
  it("F6: detached hostMode with execute alone is refused before any launch; execute AND detach together launch detached", async () => {
    const alone = harness({ rights: [EXECUTE_GRANT] });
    const refused = await alone.run(embedded({ hostMode: "detached" }));
    expect(refused.reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(refused.reply.error?.code).toBe("missing-detach-grant");
    expect(refused.reply.error?.message).toContain("workbench:detach");
    expect(alone.launchDetached).not.toHaveBeenCalled();
    expect(alone.launchEmbedded).not.toHaveBeenCalled();

    const both = harness({ rights: [EXECUTE_GRANT, DETACH_GRANT] });
    const launched = await both.run(embedded({ hostMode: "detached" }));
    expect(launched.reply).toMatchObject({ ok: true, invoked: true, status: "launched", hostMode: "detached" });
    expect(launched.reply.nativeRefs).toEqual([{ provider: "local-detached", type: "invocation", id: INVOCATION }]);
    expect(both.launchDetached).toHaveBeenCalledTimes(1);
    expect(both.launchEmbedded).not.toHaveBeenCalled();
  });
  it("a detach grant without the execute grant is refused by the admission, not by the launcher", async () => {
    const h = harness({ rights: [DETACH_GRANT] });
    const { reply } = await h.run(embedded({ hostMode: "detached" }));
    expect(reply.error?.code).toBe("missing-execute-grant");
    expect(h.launchDetached).not.toHaveBeenCalled();
  });
});

describe("workflow_execute wiring: the saved source must be the pinned one", () => {
  it("refuses a digest that does not match the saved source bytes and launches nothing", async () => {
    const h = harness();
    const { reply } = await h.run(embedded({ definitionRef: definition({ artifactDigest: OTHER_DIGEST }) }));
    expect(reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(reply.error?.code).toBe("definition-digest-mismatch");
    expect(h.launchEmbedded).not.toHaveBeenCalled();
  });
  it("refuses a schemaVersion the saved source does not carry", async () => {
    const h = harness();
    const { reply } = await h.run(embedded({ definitionRef: definition({ schemaVersion: "workflow-script/v9" }) }));
    expect(reply.error?.code).toBe("definition-schema-mismatch");
    expect(h.launchEmbedded).not.toHaveBeenCalled();
  });
  it("refuses an unavailable source with a host reason and no caller text", async () => {
    const h = harness({ resolveSource: () => { throw new Error("Workflow scriptPath is outside project source scope."); } });
    const { reply } = await h.run(embedded());
    expect(reply.error?.code).toBe("source-unavailable");
    expect(reply.error?.message).toContain("outside project source scope");
    expect(h.launchEmbedded).not.toHaveBeenCalled();
  });
  it("refuses function and furnace-formula definitions in this host without resolving or launching", async () => {
    const resolveSource = vi.fn(() => SOURCE);
    const h = harness({ resolveSource });
    for (const kind of ["function", "furnace-formula"]) {
      const { reply } = await h.run(embedded({ definitionRef: definition({ kind }) }));
      expect(reply.error?.code).toBe("unsupported-definition-kind");
    }
    expect(resolveSource).not.toHaveBeenCalled();
    expect(h.launchEmbedded).not.toHaveBeenCalled();
  });
});

describe("workflow_execute wiring: the envelope", () => {
  it("F3: exactly one dialect reaches the model; the pure module's contract string is absent from the text", async () => {
    const h = harness();
    for (const params of [embedded(), embedded({ definitionRef: definition({ artifactDigest: "main" }) })]) {
      const { text, reply } = await h.run(params);
      expect(reply.contract).toBe(TOOL_REPLY_CONTRACT_VERSION);
      expect(text).not.toContain(EXECUTE_CONTRACT_VERSION);
      expect(text).not.toContain("contractVersion");
    }
  });
  it("a launcher failure is a refused launch with a sanitized reason, never a thrown error or a raw escape", async () => {
    const h = harness({ launchEmbedded: async () => { throw new Error("spawn failed \u001b[31mred\u001b[0m"); } });
    const { text, reply } = await h.run(embedded());
    expect(reply).toMatchObject({ ok: false, invoked: false, status: "refused" });
    expect(reply.error?.code).toBe("launch-failed");
    expect(text).not.toContain("\u001b");
  });
  it("one-liner: trimmed native identity text is dropped, never presented as an addressable reference", async () => {
    const long = (fill: string) => fill.repeat(256);
    const h = harness({
      replyMaxBytes: 2048,
      mintInvocationId: () => "w".repeat(256),
      resolveSource: () => ({ ...SOURCE, definition: { ...SOURCE.definition, id: long("i"), schemaVersion: long("s") } }),
      launchEmbedded: async (_c, launch) => [{ provider: long("p"), type: long("t"), id: `${launch.invocationId}${long("x")}`.slice(0, 256), scope: long("w") }],
    });
    const { reply } = await h.run(embedded({ definitionRef: definition({ id: long("i"), schemaVersion: long("s") }) }));
    expect(reply.ok).toBe(true);
    expect(reply.truncated).toMatchObject({ reason: "byte-cap", maxBytes: 2048 });
    expect(String(reply.truncation)).toMatch(/trimmed/);
    expect(reply.nativeRefs).toEqual([]);
    expect(reply.nativeRefsOmitted).toMatchObject({ count: 1 });
    expect(String((reply.nativeRefsOmitted as { reason: string }).reason)).toMatch(/not an addressable reference/);
  });
  it("an untrimmed reply carries no truncation members", async () => {
    const { reply } = await harness().run(embedded());
    expect(reply).not.toHaveProperty("truncated");
    expect(reply).not.toHaveProperty("truncation");
    expect(reply).not.toHaveProperty("nativeRefsOmitted");
  });
});
