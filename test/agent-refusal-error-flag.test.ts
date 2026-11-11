/**
 * agent-refusal-error-flag.test.ts — EAT-R311 (wb-wkqp, DX P01) for what a real
 * session never reaches: the registered Agent tool booted with no session (the
 * scheduler is not started), a project that disabled scheduling while a stale
 * call still carries `schedule`, a caller-supplied model outside
 * `enabledModels` under `scopeModels` — and the renderer, which now receives
 * this tool's own failed run with the error flag set.
 *
 * test/agent-refusal-error-flag-e2e.test.ts reads the flag pi RECORDS in a real
 * session; these rows read it off the registered tool's own result, which is the
 * field pi's agent loop reads (`result.isError === true`).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { setScopeModelsEnabled } from "../src/model-scope.js";
import { ctx, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

let hermetic: Hermetic | undefined;

afterEach(() => {
  setScopeModelsEnabled(false);
  Reflect.deleteProperty(globalThis, Symbol.for("pi-subagents:manager"));
  hermetic?.restore();
  hermetic = undefined;
});

/** Boot the real extension in a hermetic dir and hand back its registered tools. */
function boot(settings?: Record<string, unknown>) {
  hermetic = hermeticDir({ settings });
  const { pi, tools } = makePi();
  subagentsExtension(pi);
  return { tools, dir: hermetic.dir };
}

/** One call through the registered Agent tool. */
async function callAgent(params: Record<string, unknown>, opts: { settings?: Record<string, unknown>; enabledModels?: string[]; modelRegistry?: unknown } = {}) {
  const { tools, dir } = boot(opts.settings);
  if (opts.enabledModels) {
    mkdirSync(join(dir, ".pi"), { recursive: true });
    writeFileSync(join(dir, ".pi", "settings.json"), JSON.stringify({ enabledModels: opts.enabledModels }));
  }
  const context = opts.modelRegistry ? ctx({ modelRegistry: opts.modelRegistry }) : ctx();
  return tools.get("Agent").execute("tc-r311", { subagent_type: "general-purpose", description: "r311", prompt: "x", ...params }, undefined, undefined, context);
}

const MODELS = [
  { id: "allowed", name: "Allowed", provider: "anthropic" },
  { id: "blocked", name: "Blocked", provider: "anthropic" },
];

/** A theme that renders plain text, so the collapsed row reads as what the operator sees. */
const theme = {
  fg: (_color: string, text: string) => text,
  bold: (text: string) => text,
};

describe("EAT-R311 on the registered Agent tool booted without a live session: 3 refusals a session never reaches return isError:true, and a flagged failed run keeps its error card", () => {
  it("D01 scheduler not active yet: the refusal is flagged", async () => {
    const result = await callAgent({ schedule: "5m" });

    expect(textOf(result)).toMatch(/^Scheduler is not active in this session yet\./);
    expect(result.isError).toBe(true);
  });

  it("D02 scheduling disabled in this project: the refusal is flagged", async () => {
    const result = await callAgent({ schedule: "5m" }, { settings: { schedulingEnabled: false } });

    expect(textOf(result)).toMatch(/^Scheduling is disabled in this project\./);
    expect(result.isError).toBe(true);
  });

  it("D03 caller-supplied model outside enabledModels (scopeModels on): the refusal is flagged", async () => {
    const result = await callAgent(
      { model: "anthropic/blocked" },
      {
        settings: { scopeModels: true },
        enabledModels: ["anthropic/allowed"],
        modelRegistry: { find: (provider: string, id: string) => ({ provider, id }), getAvailable: () => MODELS, getAll: () => MODELS },
      },
    );

    expect(textOf(result)).toMatch(/^Model not in scope: "anthropic\/blocked"/);
    expect(result.isError).toBe(true);
  });

  // The tool now flags its own failed run, so `Agent failed: …` reaches the
  // renderer with isError set AND the run's real status details. It keeps the
  // compact error card it always had: the text fallback is for flagged results
  // with no status of their own (#199), and would dump the whole salvaged partial
  // output into the collapsed row.
  it("D04 a flagged failed run keeps its error card, not the salvaged partial output", () => {
    const { tools } = boot();
    const output = tools
      .get("Agent")
      .renderResult(
        {
          content: [{ type: "text", text: "Agent failed: provider rejected the prompt\n\nPartial output before the failure:\nSALVAGED-PARTIAL-LINE" }],
          details: { status: "error", error: "provider rejected the prompt", toolUses: 2, tokens: "", durationMs: 5 },
        },
        { expanded: false, isPartial: false },
        theme,
        { isError: true },
      )
      .render(120)
      .join("\n");

    expect(output).toContain("Error: provider rejected the prompt");
    expect(output).toContain("2 tool uses");
    expect(output).not.toContain("SALVAGED-PARTIAL-LINE");
  });

  // Frozen shape: the header names the judged cases and its count is theirs.
  it("frozen shape: the header and the judged cases", ({ task }) => {
    const header = task.suite?.name ?? "";
    expect(header).toBe("EAT-R311 on the registered Agent tool booted without a live session: 3 refusals a session never reaches return isError:true, and a flagged failed run keeps its error card");
    const names = (task.suite?.tasks ?? []).map((entry) => entry.name);
    expect(names.filter((name) => / the refusal is flagged$/.test(name))).toHaveLength(Number(/: (\d+) refusals /.exec(header)?.[1]));
    expect(names).toEqual([
      "D01 scheduler not active yet: the refusal is flagged",
      "D02 scheduling disabled in this project: the refusal is flagged",
      "D03 caller-supplied model outside enabledModels (scopeModels on): the refusal is flagged",
      "D04 a flagged failed run keeps its error card, not the salvaged partial output",
      "frozen shape: the header and the judged cases",
    ]);
  });
});
