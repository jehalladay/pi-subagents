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

  /** Layer walk (1): user dir alone, then +.agents, then +.pi; each step must pick the newest-precedence layer. */
  async function walkLayers(tag: string): Promise<void> {
    const r = roots();
    const name = `${SHARED_NAME}-${tag}`;
    writeWorkflow(r.user, name, USER_DIR);
    expect(startedName(await run(`${tag}-user`, { name }))).toBe(USER_DIR);

    writeWorkflow(r.agents, name, PROJECT_AGENTS);
    expect(startedName(await run(`${tag}-agents`, { name }))).toBe(PROJECT_AGENTS);

    writeWorkflow(r.pi, name, PROJECT_PI);
    const text = textOf(await run(`${tag}-pi`, { name }));
    expect(text).toMatch(new RegExp(`Workflow "${PROJECT_PI}" started`));
    expect(text).toContain(join(".pi", "workflows", `${name}.js`));
  }

  /** Explicit sources (2): inline script, then scriptPath, then both, all outranking a colliding .pi name. */
  async function checkExplicitSources(tag: string): Promise<void> {
    const name = `${SHARED_NAME}-explicit-${tag}`;
    writeWorkflow(roots().pi, name, PROJECT_PI);
    const explicit = join(hermetic.dir, `explicit-${tag}.js`);
    writeFileSync(explicit, script("from-script-path"));

    expect(startedName(await run(`${tag}-script`, { name, script: script("from-inline") }))).toBe("from-inline");
    expect(startedName(await run(`${tag}-path`, { name, scriptPath: explicit }))).toBe("from-script-path");
    expect(startedName(await run(`${tag}-both`, { name, script: script("from-inline"), scriptPath: explicit }))).toBe(
      "from-script-path",
    );
  }

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
    await walkLayers("first");
  });

  it("lets scriptPath and inline script both outrank a colliding name, scriptPath first", async () => {
    await boot();
    await checkExplicitSources("first");
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

  it("re-walks the full layer chain and the explicit-source rows after a second session_start, with tool surface and settings bytes unchanged", async () => {
    await boot();
    const toolNamesBefore = [...booted.tools.keys()].sort();
    await walkLayers("pre");
    await checkExplicitSources("pre");

    await booted.lifecycle.get("session_start")?.({}, workflowCtx());

    // Fresh names: the post-reload walk starts from empty roots for its own files.
    await walkLayers("post");
    await checkExplicitSources("post");
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
