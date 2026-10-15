/** W19: workflow-source control bytes and VM probes. VM is not a hostile-code security boundary. */
import { describe, expect, it, vi } from "vitest";
import { layoutWorkflowCard, plainWorkflowCardLines } from "../src/ui/workflow-card.js";
import { initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from "../src/ui/workflow-dialog.js";
import { workflowCallName } from "../src/workflow/meta.js";
import type { WorkflowAgentEntry } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";

const MARKER = "UNTRUSTED_SOURCE_DATA";
const META = (name: string, description = MARKER) => `export const meta={name:${JSON.stringify(name)},description:${JSON.stringify(description)}};\n`;
const host = (): WorkflowHost => ({ spawnAgent: vi.fn(async () => ({ ok: true })), abortAgent: vi.fn(), callNode: vi.fn(async () => ({ ok: true })) });
const suspicious = `${MARKER} \u001b[31mR\u001b[0m ‮BAD‬ ⁦override⁩`;

describe("workflow source and rendering", () => {
  it("rejects a raw ANSI escape in source before VM execution", async () => {
    const script = 'export const meta={name:"has-escape\u001b[31m",description:"local"}; return 1;';
    const calls = host();
    await expect(runWorkflow({ script, host: calls })).rejects.toThrow(/control characters/i);
    expect(calls.spawnAgent).not.toHaveBeenCalled();
  });
  it("node() refuses grant/identity options before dispatching to a host capability", async () => {
    const calls = host();
    for (const field of ["grants", "principal", "workspace", "scope"]) {
      const result = await runWorkflow({ script: META("option-forgery") + `return await node("fixture.security.read",{}, {${field}:"admin"});`, host: calls });
      expect(result).toMatchObject({ status: "failed", capabilityError: { category: "validation" } });
    }
    expect(calls.callNode).not.toHaveBeenCalled();
  });
  it("normal VM globals process and require are not directly bound", async () => {
    const calls = host();
    const result = await runWorkflow({ script: META("vm-visible") + "return {processType:typeof process,requireType:typeof require};", host: calls });
    expect(result).toMatchObject({ status: "completed", value: { processType: "undefined", requireType: "undefined" } });
    expect(calls.spawnAgent).not.toHaveBeenCalled();
  });
  it("dynamic import from the VM is refused rather than importing a host module", async () => {
    const calls = host();
    const result = await runWorkflow({ script: META("vm-import") + 'try { await import("node:process"); return "IMPORTED"; } catch(error) { return {error:String(error)}; }', host: calls });
    expect(result.status).toBe("completed");
    expect(JSON.stringify(result.value)).not.toContain("IMPORTED");
    expect(calls.spawnAgent).not.toHaveBeenCalled();
  });
  // The unguarded probe intentionally remains an expected failure; the caught probes below establish blocking.
  it.fails("host-closure Function escape must not reveal even a local canary env variable", async () => {
    const key = "W19_LOCAL_VM_CANARY";
    const prior = process.env[key]; process.env[key] = "W19_NOT_A_REAL_CREDENTIAL";
    try {
      const result = await runWorkflow({
        script: META("vm-escape") + `return {escaped:node.constructor("return require('node:process').env.${key}")()};`,
        host: host(),
      });
      expect(result.status).toBe("completed");
      expect(result.value).not.toMatchObject({ escaped: "W19_NOT_A_REAL_CREDENTIAL" });
    } finally {
      if (prior === undefined) delete process.env[key]; else process.env[key] = prior;
    }
  });
  it("caught Function escape probes are realm EvalErrors and never reveal the canary", async () => {
    const key = "W19_LOCAL_VM_CANARY";
    const canary = "W19_NOT_A_REAL_CREDENTIAL";
    const prior = process.env[key]; process.env[key] = canary;
    try {
      const result = await runWorkflow({
        script: META("vm-escape") + `
          const probe = fn => {
            try { return {escaped:fn()}; }
            catch(error) { return {error:error.name,realmError:error instanceof EvalError}; }
          };
          const body = "return require('node:process').env.${key}";
          const callables = [agent,node,parallel,pipeline,phase,log,workflow,
            budget.spent,budget.remaining,console.log,console.info,console.warn,console.error,console.debug];
          return [probe(() => Function(body)()), ...callables.flatMap(fn => [
            probe(() => fn.constructor(body)()),
            probe(() => fn.constructor.constructor(body)()),
            probe(() => Object.getPrototypeOf(fn).constructor(body)()),
          ])];`,
        host: host(),
      });
      expect(result.status).toBe("completed");
      expect(result.value).not.toContainEqual({ escaped: canary });
      expect(JSON.stringify(result.value)).not.toContain(canary);
      expect(result.value).toEqual(Array.from({ length: 43 }, () => ({ error: "EvalError", realmError: true })));
    } finally {
      if (prior === undefined) delete process.env[key]; else process.env[key] = prior;
    }
  });
  it("every injected callable, returned promise and caught error stays in the VM realm", async () => {
    const result = await runWorkflow({
      script: META("vm-bridges") + `
        const callables = [agent,node,parallel,pipeline,phase,log,workflow,
          budget.spent,budget.remaining,console.log,console.info,console.warn,console.error,console.debug];
        const constructors = callables.map(fn => fn.constructor === Function && Object.getPrototypeOf(fn) === Function.prototype);
        const pending = node("fixture.security.read", {});
        const promiseInRealm = pending instanceof Promise && pending.constructor.constructor === Function;
        const value = await pending;
        let errorInRealm = false;
        try { phase(42); } catch(error) { errorInRealm = error instanceof Error && error.constructor.constructor === Function; }
        const grouped = await parallel([() => value]);
        const piped = await pipeline([value], value => value);
        return {constructors,promiseInRealm,errorInRealm,
          objectInRealm:value instanceof Object,consoleInRealm:console instanceof Object,
          budgetInRealm:budget instanceof Object,globalConstructor:globalThis.constructor.constructor === Function,
          identity:grouped[0] === value && piped[0] === value};`,
      host: host(),
    });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ constructors: Array.from({ length: 14 }, () => true), promiseInRealm: true,
      errorInRealm: true, objectInRealm: true, consoleInRealm: true, budgetInRealm: true, globalConstructor: true, identity: true });
  });
  it("pipeline stages receive no host-realm array as their this receiver", async () => {
    const result = await runWorkflow({
      script: META("pipeline-receiver") + `return await pipeline([1], function (value) {
        return {value,realmReceiver:this === undefined || this.constructor.constructor === Function};
      });`, host: host(),
    });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual([{ value: 1, realmReceiver: true }]);
  });
  it("nested workflow closures use the same realm-bound bridges", async () => {
    const calls = host();
    calls.loadWorkflow = () => ({ ok: true, script: META("nested-bridge") + `
      return [agent,node,phase,log,workflow,console.log].map(fn => fn.constructor === Function);` });
    const result = await runWorkflow({ script: META("root-bridge") + 'return await workflow("nested-bridge");', host: calls });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual(Array.from({ length: 6 }, () => true));
  });
  it("the saved meta name used by renderCall must remove ANSI and bidi source escapes", () => {
    const name = workflowCallName({ script: META(suspicious) + "return 1;" });
    expect(name).toContain(MARKER);
    expect(name).not.toMatch(/[\u001b‪-‮⁦-⁩]/u);
  });
  it("a workflow card must strip source meta escapes before placing labels in its layout", () => {
    const rendered = plainWorkflowCardLines(layoutWorkflowCard({
      task: { status: "running", workflowName: suspicious, startTime: 1 },
      meta: { name: suspicious, description: suspicious, phases: [{ title: suspicious }] },
      progress: [], now: 2, width: 160,
    })).join("\n");
    expect(rendered).toContain(MARKER);
    expect(rendered).not.toMatch(/[\u001b‪-‮⁦-⁩]/u);
  });
});

describe("untrusted workflow terminal rows", () => {
  const hostile = `row \u001b[31mred\u001b[0m \u202eevil\u202c \u2066bidi\u2069 api_key=w19-terminal-secret`;
  it("sanitizes dialog agent labels and phase titles in overview and drill-down headers", () => {
    for (const level of ["phases", "agent"] as const) {
      const rendered = plainWorkflowDialogLines(layoutWorkflowDialog({
        state: { ...initialWorkflowDialogState(), level }, width: 240, now: 2,
        task: { status: "running", workflowName: "safe", startTime: 1 },
        progress: [{ type: "workflow_phase", index: 0, title: hostile },
          { type: "workflow_agent", index: 0, label: hostile, state: "start", phaseIndex: 0, phaseTitle: hostile }],
      })).join("\n");
      expect(rendered).toContain("row");
      expect(rendered).not.toMatch(/[\u001b\u202a-\u202e\u2066-\u2069]/u);
      expect(rendered).not.toContain("w19-terminal-secret");
      expect(rendered).toContain("[REDACTED]");
    }
  });
  const agent = (state: "done" | "error", extra: Partial<WorkflowAgentEntry> = {}): WorkflowAgentEntry => ({
    type: "workflow_agent", index: 0, label: "safe", state, phaseIndex: 0, phaseTitle: "safe",
    promptPreview: `${hostile}\nline two ${hostile}`, model: hostile, modelId: hostile, fallbackModel: `fb ${hostile}`, requestedModel: hostile,
    thinking: hostile, requestedThinking: hostile, sessionId: hostile, tokens: 12, toolCalls: 2, durationMs: 1500, ...extra,
  });
  const dialog = (entry: WorkflowAgentEntry, level: "phases" | "agent") => plainWorkflowDialogLines(layoutWorkflowDialog({
    state: { ...initialWorkflowDialogState(), level, promptExpanded: true }, width: 240, now: 2,
    task: { status: "running", workflowName: "safe", startTime: 1 },
    progress: [{ type: "workflow_phase", index: 0, title: "safe" }, entry],
  }));
  it("sanitizes the agent detail pane: prompt lines, outcome, error, model and native session strings", () => {
    const cases: Array<[WorkflowAgentEntry, string]> = [
      [agent("done", { resultPreview: `${hostile}\noutcome two ${hostile}` }), "outcome two"],
      [agent("error", { error: `${hostile}\nerror two ${hostile}` }), "error two"],
    ];
    for (const [entry, bodyLine] of cases) {
      for (const level of ["phases", "agent"] as const) {
        const lines = dialog(entry, level); const rendered = lines.join("\n");
        expect(rendered).toContain("row");
        expect(rendered).not.toMatch(/[\u001b\u202a-\u202e\u2066-\u2069]/u);
        expect(rendered).not.toContain("w19-terminal-secret");
        expect(rendered).toContain("[REDACTED]");
        if (level === "agent") {
          // Sanitizing must not flatten the author's line structure: each prompt and outcome line stays its own row.
          expect(lines.some(line => /line two row/.test(line))).toBe(true);
          expect(lines.some(line => new RegExp(`${bodyLine} row`).test(line))).toBe(true);
        }
      }
    }
  });
  it("sanitizes the inline card agent-row stat tail: agent type and model strings", () => {
    const rendered = plainWorkflowCardLines(layoutWorkflowCard({
      task: { status: "running", workflowName: "safe", startTime: 1 }, now: 2, width: 240,
      progress: [{ type: "workflow_phase", index: 0, title: "safe" }, agent("done", { agentType: hostile, resultPreview: "ok" })],
    })).join("\n");
    expect(rendered).toContain("row");
    expect(rendered).not.toMatch(/[\u001b\u202a-\u202e\u2066-\u2069]/u);
    expect(rendered).not.toContain("w19-terminal-secret");
    expect(rendered).toContain("[REDACTED]");
  });
  it("sanitizes every card log line while preserving multiline layout", () => {
    const rendered = plainWorkflowCardLines(layoutWorkflowCard({
      task: { status: "running", workflowName: "safe", startTime: 1 }, now: 2, width: 240,
      progress: [{ type: "workflow_log", message: `${hostile}\nsecond ${hostile}` }],
    }));
    expect(rendered.some(line => line.startsWith("  ⎿  row"))).toBe(true);
    expect(rendered.some(line => line.startsWith("     second row"))).toBe(true);
    expect(rendered.join("\n")).not.toMatch(/[\u001b\u202a-\u202e\u2066-\u2069]/u);
    expect(rendered.join("\n")).not.toContain("w19-terminal-secret");
    expect(rendered.join("\n")).toContain("[REDACTED]");
  });
});
