/**
 * workbench-saved-precedence.test.ts — saved-workflow file precedence and
 * config-migration parity across the three settings modes (wb-cax.11).
 *
 * Spec lines pinned (docs/workbench/16-repository-refactor.md):
 *   "Compatibility feature control": "Preserve original config migration and
 *   saved-workflow file precedence." and "Tests must run in both upstream/Pi and
 *   new/Claude workbench modes until a documented deprecation is approved."
 *   "Migration acceptance": "Existing upstream Pi agent workflows, script saved
 *   paths and UI work after extension reload."
 *
 * Test-only and hermetic: every case boots the REAL extension (src/index.ts)
 * inside a temp cwd with a temp agent dir, so nothing of the developer's tree or
 * home can reach the resolution chain. Measured results are recorded as they
 * are; a green assertion is reported green, never reshaped into a defect.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { loadSettings } from "../src/settings.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

type Mode = "legacy" | "pi" | "claude";

/** The three settings shapes the precedence chain must be identical across. */
const MODES: readonly { mode: Mode; workbench?: { workflowAgentBackend: "pi" | "claude" } }[] = [
  { mode: "legacy" },
  { mode: "pi", workbench: { workflowAgentBackend: "pi" } },
  { mode: "claude", workbench: { workflowAgentBackend: "claude" } },
];

const script = (name: string): string => `export const meta = { name: "${name}", description: "${name} source" };\n`;

const SHARED_NAME = "shared";
const PROJECT_PI = "from-project-pi";
const PROJECT_AGENTS = "from-project-agents";
const USER_DIR = "from-user-agent-dir";

function writeWorkflow(root: string, file: string, name: string): void {
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, `${file}.js`), script(name));
}

describe.each(MODES)("saved-workflow precedence and config parity — mode $mode", ({ workbench }) => {
  let hermetic: Hermetic;
  let booted: ReturnType<typeof makePi>;
  let settingsText: string;

  const roots = () => ({
    pi: join(hermetic.dir, ".pi", "workflows"),
    agents: join(hermetic.dir, ".agents", "workflows"),
    user: join(process.env.PI_CODING_AGENT_DIR as string, "workflows"),
  });
  const workflowCtx = () => ctx({ cwd: hermetic.dir });
  const run = (id: string, params: Record<string, unknown>) =>
    booted.tools.get("SubagentWorkflow").execute(id, params, undefined, undefined, workflowCtx());
  const startedName = (result: unknown): string | undefined => /Workflow "([^"]+)" started/.exec(textOf(result))?.[1];

  async function boot(): Promise<void> {
    hermetic = hermeticDir({
      settings: {
        schedulingEnabled: false,
        workflowsEnabled: true,
        maxConcurrent: 7,
        ...(workbench ? { workbench } : {}),
      },
    });
    settingsText = readFileSync(join(hermetic.dir, ".pi", "subagents.json"), "utf-8");
    booted = makePi();
    subagentsExtension(booted.pi);
    await booted.lifecycle.get("session_start")?.({}, workflowCtx());
  }

  afterEach(async () => {
    await flush();
    hermetic.restore();
    vi.restoreAllMocks();
  });

  it("resolves a colliding name .pi/workflows -> .agents/workflows -> user agent dir, one layer at a time", async () => {
    await boot();
    const r = roots();
    writeWorkflow(r.user, SHARED_NAME, USER_DIR);
    expect(startedName(await run("t-user", { name: SHARED_NAME }))).toBe(USER_DIR);

    writeWorkflow(r.agents, SHARED_NAME, PROJECT_AGENTS);
    expect(startedName(await run("t-agents", { name: SHARED_NAME }))).toBe(PROJECT_AGENTS);

    writeWorkflow(r.pi, SHARED_NAME, PROJECT_PI);
    const text = textOf(await run("t-pi", { name: SHARED_NAME }));
    expect(text).toMatch(new RegExp(`Workflow "${PROJECT_PI}" started`));
    expect(text).toContain(join(".pi", "workflows", `${SHARED_NAME}.js`));
  });

  it("lets scriptPath and inline script both outrank a colliding name, scriptPath first", async () => {
    await boot();
    writeWorkflow(roots().pi, SHARED_NAME, PROJECT_PI);
    const explicit = join(hermetic.dir, "explicit.js");
    writeFileSync(explicit, script("from-script-path"));

    expect(startedName(await run("t-script", { name: SHARED_NAME, script: script("from-inline") }))).toBe("from-inline");
    expect(startedName(await run("t-path", { name: SHARED_NAME, scriptPath: explicit }))).toBe("from-script-path");
    expect(
      startedName(await run("t-both", { name: SHARED_NAME, script: script("from-inline"), scriptPath: explicit })),
    ).toBe("from-script-path");
  });

  it("reports the same unknown-name diagnostic naming the three searched roots", async () => {
    await boot();
    writeWorkflow(roots().agents, "known", PROJECT_AGENTS);
    const text = textOf(await run("t-missing", { name: "absent" }));
    expect(text).toMatch(/No saved workflow named "absent"/);
    for (const root of Object.values(roots())) expect(text).toContain(root);
    expect(text).toMatch(/Available: known\./);
    expect(text).not.toMatch(/started/);
  });

  it("loads the settings file without rewriting it, and a legacy file selects upstream behavior", async () => {
    await boot();
    expect(readFileSync(join(hermetic.dir, ".pi", "subagents.json"), "utf-8")).toBe(settingsText);
    const loaded = loadSettings(hermetic.dir);
    expect(loaded.maxConcurrent).toBe(7);
    if (workbench === undefined) {
      expect(loaded).not.toHaveProperty("workbench");
      // Upstream behavior: no workbench tool beyond the original four.
      expect([...booted.tools.keys()].sort()).toEqual(["Agent", "SubagentWorkflow", "get_subagent_result", "steer_subagent"]);
    } else {
      expect(loaded.workbench?.workflowAgentBackend).toBe(workbench.workflowAgentBackend);
    }
  });

  it("keeps resolution, precedence and the settings file unchanged across a second session_start", async () => {
    await boot();
    const r = roots();
    writeWorkflow(r.user, SHARED_NAME, USER_DIR);
    writeWorkflow(r.agents, SHARED_NAME, PROJECT_AGENTS);
    writeWorkflow(r.pi, SHARED_NAME, PROJECT_PI);
    const toolNamesBefore = [...booted.tools.keys()].sort();
    const before = startedName(await run("t-before", { name: SHARED_NAME }));

    await booted.lifecycle.get("session_start")?.({}, workflowCtx());

    expect(startedName(await run("t-after", { name: SHARED_NAME }))).toBe(before);
    expect(before).toBe(PROJECT_PI);
    expect([...booted.tools.keys()].sort()).toEqual(toolNamesBefore);
    expect(readFileSync(join(hermetic.dir, ".pi", "subagents.json"), "utf-8")).toBe(settingsText);
  });
});

describe("saved-workflow precedence — cross-mode parity", () => {
  it("picks the identical file in all three modes for the same tree", async () => {
    const picks: Record<string, string | undefined> = {};
    for (const { mode, workbench } of MODES) {
      const hermetic = hermeticDir({
        settings: { schedulingEnabled: false, workflowsEnabled: true, ...(workbench ? { workbench } : {}) },
      });
      try {
        writeWorkflow(join(process.env.PI_CODING_AGENT_DIR as string, "workflows"), SHARED_NAME, USER_DIR);
        writeWorkflow(join(hermetic.dir, ".agents", "workflows"), SHARED_NAME, PROJECT_AGENTS);
        const booted = makePi();
        subagentsExtension(booted.pi);
        const context = ctx({ cwd: hermetic.dir });
        await booted.lifecycle.get("session_start")?.({}, context);
        const result = await booted.tools.get("SubagentWorkflow").execute("t-x", { name: SHARED_NAME }, undefined, undefined, context);
        picks[mode] = /Workflow "([^"]+)" started/.exec(textOf(result))?.[1];
        await flush();
      } finally {
        hermetic.restore();
      }
    }
    expect(picks).toEqual({ legacy: PROJECT_AGENTS, pi: PROJECT_AGENTS, claude: PROJECT_AGENTS });
  });
});
