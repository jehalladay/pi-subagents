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
import { fileURLToPath } from "node:url";
import ts from "typescript";
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

/**
 * Explicit per-row budgets for the layer-walk rows (wb-cvjm), file-local so no other suite's budget moves. A row that
 * boots the REAL extension and walks saved-workflow layers through SubagentWorkflow spawns real session/config work, so
 * its wall time is set by host contention rather than by precedence logic: under tenant load it exceeded vitest's default
 * 5000 ms budget and reddened the row as a lottery victim across landings 158-164. The walls the budgets are sized against
 * come from the wb-6hb.9 gate's run 1 (cmd_ba592c183b09, outbox row 567): a complete gate at vitest cap 8, load1 425.27 ->
 * 383.74, in which both rows timed out against the 5000 ms default - the scriptPath/inline row (mode 'pi') at 8832 ms and
 * the re-walk row (mode 'claude') at 23949 ms; that gate's serial leg passed the file. Same cure shape as wb-gy0 and
 * wb-hk9l: an explicit measured budget, assertions unchanged, never a retry. A row's synchronous work cannot be interrupted,
 * so a budget only decides when a finished row is failed.
 */
const WALK_ROW_BUDGET_MS = 30_000;
/** The re-walk row runs the whole chain twice around a second session_start (12 runs), so it carries the larger budget. */
const REWALK_ROW_BUDGET_MS = 60_000;
/** The worst measured walls the budgets are sized against (wb-6hb.9 gate run 1, cmd_ba592c183b09: a complete gate at cap 8, load1 425.27 -> 383.74, both rows timed out). */
const WORST_MEASURED_WALK_MS = 8_832;
const WORST_MEASURED_REWALK_MS = 23_949;
const WALK_ROW: { readonly timeout: number } = { timeout: WALK_ROW_BUDGET_MS };
const REWALK_ROW: { readonly timeout: number } = { timeout: REWALK_ROW_BUDGET_MS };
/** The rows carrying each budget, in file order: every row whose body calls walkLayers or checkExplicitSources. */
const WALK_ROWS = [
  "resolves a colliding name .pi/workflows -> .agents/workflows -> user agent dir, one layer at a time",
  "lets scriptPath and inline script both outrank a colliding name, scriptPath first",
];
const REWALK_ROWS = [
  "re-walks the full layer chain and the explicit-source rows after a second session_start, with tool surface and settings bytes unchanged",
];
const NON_LITERAL_TITLE = "<a row with a non-literal title>";
/** Every it() row of this file in source order: the budget identifier it carries (if any) and whether its body walks layers (the wb-cvjm pin). */
function sourceRows(): { title: string; budget: string | undefined; walks: boolean }[] {
  const file = fileURLToPath(import.meta.url);
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const callsWalk = (node: ts.Node): boolean =>
    (ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === "walkLayers" || node.expression.text === "checkExplicitSources")) ||
    ts.forEachChild(node, child => (callsWalk(child) ? true : undefined)) === true;
  const rows: { title: string; budget: string | undefined; walks: boolean }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "it") {
      const [title, second] = node.arguments;
      const body = node.arguments[node.arguments.length - 1];
      rows.push({
        title: title !== undefined && ts.isStringLiteralLike(title) ? title.text : NON_LITERAL_TITLE,
        budget: node.arguments.length === 3 && second !== undefined && ts.isIdentifier(second) ? second.text : undefined,
        walks: body !== undefined && callsWalk(body),
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return rows;
}

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

  it("resolves a colliding name .pi/workflows -> .agents/workflows -> user agent dir, one layer at a time", WALK_ROW, async () => {
    await boot();
    await walkLayers("first");
  });

  it("lets scriptPath and inline script both outrank a colliding name, scriptPath first", WALK_ROW, async () => {
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

  it("re-walks the full layer chain and the explicit-source rows after a second session_start, with tool surface and settings bytes unchanged", REWALK_ROW, async () => {
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

describe("saved-workflow precedence — wb-cvjm explicit row budgets", () => {
  it("wb-cvjm: every layer-walk row runs under an explicit file-local budget, none rides the 5000 ms default", ({ task }) => {
    // Runtime truth (the wb-gy0 leg): every case this file registers, with the timeout and retry the runner resolved for it.
    const registered: { title: string; timeout: number; retry: unknown }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ title: child.name, timeout: child.timeout, retry: child.retry });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const rows = sourceRows();
    const perMode = (titles: readonly string[]): string[] => MODES.flatMap(() => titles);
    const walkRuns = registered.filter(entry => entry.timeout === WALK_ROW_BUDGET_MS).map(entry => entry.title);
    const rewalkRuns = registered.filter(entry => entry.timeout === REWALK_ROW_BUDGET_MS).map(entry => entry.title);
    expect([...new Set(registered.map(entry => entry.title))], "the source scan classifies every registered case").toEqual(
      rows.map(row => row.title),
    );
    expect(walkRuns, "the registered cases that run under WALK_ROW_BUDGET_MS, once per mode").toEqual(perMode(WALK_ROWS));
    expect(rewalkRuns, "the registered cases that run under REWALK_ROW_BUDGET_MS, once per mode").toEqual(perMode(REWALK_ROWS));
    // FROZEN SHAPE (rule 16), as this cut registers them: 3 modes x 2 walk rows and 3 modes x 1 re-walk row carry a budget.
    expect([walkRuns.length, rewalkRuns.length], "budgeted registrations [walk, re-walk]").toEqual([6, 3]);
    expect(
      registered.filter(entry => entry.retry !== undefined && entry.retry !== 0).map(entry => entry.title),
      "the registered cases that carry a retry",
    ).toEqual([]);
    // The source scan: the budget identifier each it() row passes, and which row bodies walk layers.
    expect(rows.filter(row => row.budget === "WALK_ROW").map(row => row.title)).toEqual(WALK_ROWS);
    expect(rows.filter(row => row.budget === "REWALK_ROW").map(row => row.title)).toEqual(REWALK_ROWS);
    expect(rows.filter(row => row.walks).map(row => row.title)).toEqual([...WALK_ROWS, ...REWALK_ROWS]);
    expect(rows.filter(row => row.title === NON_LITERAL_TITLE)).toEqual([]);
    expect(WALK_ROW_BUDGET_MS).toBeGreaterThanOrEqual(20_000);
    expect(WALK_ROW_BUDGET_MS).toBeGreaterThan(2 * WORST_MEASURED_WALK_MS);
    expect(REWALK_ROW_BUDGET_MS).toBeGreaterThanOrEqual(48_000);
    expect(REWALK_ROW_BUDGET_MS).toBeGreaterThan(2 * WORST_MEASURED_REWALK_MS);
    expect(WORST_MEASURED_WALK_MS).toBeGreaterThan(5_000);
    expect(WORST_MEASURED_REWALK_MS).toBeGreaterThan(5_000);
  });
});
