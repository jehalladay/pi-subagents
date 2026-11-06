/**
 * wb-413a [MWI-replay] wiring: the registered SubagentWorkflow path (src/index.ts runWorkflowTask) hands the embedded
 * Claude host the readings it MEASURED, over a real Git repository, a real Claude config directory and the real
 * resumeFromRunId path. Program mechanical-workflows-interop-2026-11-04, slice PI-4, EAT-R017..EAT-R020
 * (ATOMIC-REQUIREMENTS.md@0b25e14e, pi-subagents master); the acceptance lines are quoted in
 * test/workbench-claude-replay-dependencies.test.ts.
 *
 * Nothing is mocked and no model is reached. Every agent call asks for worktree isolation, which the Claude host refuses
 * before any SDK query ("Claude SDK worktree isolation is unavailable; refusing to run in the shared cwd."), so a LIVE call
 * settles to null, and a recorded answer can only come back through the journal. The recorded answer is PLANTED: the
 * first run's own journal row - its real key and the basis its real host recorded - is rewritten as a settled answer
 * (the planted-row shape of test/workbench-pi-reconcile.test.ts). Each resume then reads "replayed" (the planted answer
 * returns, one call replayed) or "live" (null, nothing replayed), with the prompt held constant throughout. A resumed run
 * journals its own row under its own host's basis, so resumedWith also reads that row's readings and a row can say which
 * reading moved and which stayed equal.
 *
 * Claimed here, each by its rows, and nothing wider (cut #3: the enumerate form of the R-B646 claim set):
 *  - EAT-R017, the Git candidate forms that move the source reading at the registered path: a tracked file's working
 *    bytes at the top level (W-R017), one and two directories down (W-R017-NESTED), and dot-named at the top level, in a
 *    dot-named directory and in a subdirectory (W-R017-DOT); a tracked file deleted from the working tree
 *    (W-R017-NESTED); a staged change whose working bytes equal HEAD (W-R017-INDEX); a new untracked file Git does not
 *    ignore at the top level (W-R017), in a subdirectory (W-R017-NESTED) and dot-named (W-R017-DOT); a new commit over
 *    the same tree and a committed change (W-R017). A Git-ignored file leaves the source reading equal
 *    (W-R018-LOCAL-SOURCE, W-R018-PROJECT). The source reading is unknown outside Git (W-R020) and for a committed
 *    symlink (W-R020-CANDIDATE);
 *  - EAT-R018, the instruction reading at the registered path: a user skill and a user CLAUDE.md under CLAUDE_CONFIG_DIR
 *    (W-R018), a Git-ignored CLAUDE.local.md under the local source (W-R018-LOCAL, W-R018-LOCAL-SOURCE), a Git-ignored
 *    project skill (W-R018-PROJECT), a user CLAUDE.md under <home>/.claude with CLAUDE_CONFIG_DIR unset (W-R018-HOME)
 *    and under a relative CLAUDE_CONFIG_DIR resolved against the cwd (W-R018-RELATIVE-CONFIG);
 *  - EAT-R019, the provider reading at the registered path: the user settings.json and the local settings.local.json
 *    (W-R019), and the user settings.json under <home>/.claude (W-R018-HOME);
 *  - EAT-R020 at the registered path: an unknown source reading (W-R020, W-R020-CANDIDATE) and an unknown instruction
 *    reading (W-R020-INSTRUCTIONS) replay nothing.
 * RESIDUALS (named, each with its pinned quiet row): R-ENV-SELECTED-PROVIDER W-Q-ENV-PROVIDER; R-NESTED-MEMORY
 * W-Q-NESTED-MEMORY; R-IGNORED-SOURCE W-R018-LOCAL-SOURCE, W-R018-PROJECT.
 * NOT CLAIMED by this suite: which identity the registered path hands the provider reader (one test process cannot vary
 * its installed SDK artifacts or its registered provider contracts); Git candidate forms other than those listed above
 * (more than 2000 paths or 32 MiB, a path the survey cannot read, other path spellings); a live SDK session.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const PLANTED = "recorded verification answer";
const SCRIPT = 'export const meta={name:"replay-wiring",description:"measured replay basis"};\nreturn await agent("verify the candidate", { isolation: "worktree" });';
const CONFIG_ENV = "CLAUDE_CONFIG_DIR";
/** The provider-selection variables W-Q-ENV-PROVIDER sets (obviously fake values), restored after every row. */
const PROVIDER_ENV = ["ANTHROPIC_BASE_URL", "ANTHROPIC_MODEL"] as const;

let sandbox: ReturnType<typeof hermeticDir> | undefined;
let configDir: string | undefined;
const priorConfig = process.env[CONFIG_ENV];
const priorProvider = PROVIDER_ENV.map(name => process.env[name]);
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  removeScratch(configDir);
  configDir = undefined;
  if (priorConfig === undefined) delete process.env[CONFIG_ENV];
  else process.env[CONFIG_ENV] = priorConfig;
  PROVIDER_ENV.forEach((name, index) => {
    const prior = priorProvider[index];
    if (prior === undefined) delete process.env[name];
    else process.env[name] = prior;
  });
});

interface Booted {
  pi: ReturnType<typeof makePi>;
  context: ReturnType<typeof ctx>;
  dir: string;
}

async function boot(workbench: Record<string, unknown>, nonRepo = false): Promise<Booted> {
  sandbox = hermeticDir({ nonRepo, settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", ...workbench } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, dir: sandbox.dir };
}

/** A fresh Claude config directory the SDK child would read (CLAUDE_CONFIG_DIR), set for this row only. */
function claudeConfig(): string {
  configDir = makeScratch("replay-wiring-config-");
  process.env[CONFIG_ENV] = configDir;
  return configDir;
}

function git(dir: string, ...args: string[]): void {
  execFileSync("git", ["-C", dir, "-c", "user.name=Test Operator", "-c", "user.email=operator@example.invalid", ...args], { stdio: ["ignore", "pipe", "pipe"] });
}
function initRepo(dir: string, ignored: readonly string[] = []): string {
  const candidate = join(dir, "candidate.ts");
  execFileSync("git", ["init", "-q", dir]);
  writeFileSync(candidate, "export const candidate = 1;\n");
  writeFileSync(join(dir, ".gitignore"), ignored.map(path => `${path}\n`).join(""));
  git(dir, "add", "candidate.ts", ".gitignore");
  git(dir, "commit", "-qm", "baseline");
  return candidate;
}
function write(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

/** Launch one SubagentWorkflow run and wait for its completion notice; returns the task id and the notice text. */
async function launch(booted: Booted, params: Record<string, unknown>): Promise<{ taskId: string; notice: string }> {
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("replay-wiring", params, undefined, undefined, booted.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error(`SubagentWorkflow returned no task id: ${JSON.stringify(launched.content)}`);
  for (let i = 0; i < 1000; i++) {
    const notice = booted.pi.pi.sendMessage.mock.calls
      .map(([message]: [{ content?: unknown }]) => message?.content)
      .find((content: unknown): content is string => typeof content === "string" && content.includes(`<task-id>${taskId}</task-id>`));
    if (notice !== undefined) return { taskId, notice };
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("workflow did not settle in the test window");
}

/** Rewrite the recording run's one journal row as a settled answer, keeping its real key and basis. */
function plant(booted: Booted, taskId: string): WorkflowJournalEntry {
  const path = join(sessionTaskDir(booted.dir, "s1"), `${taskId}.workflow.jsonl`);
  const rows = readJournal(path);
  expect(rows).toEqual([expect.objectContaining({ index: 0, ok: false, basis: expect.any(String) })]);
  const planted: WorkflowJournalEntry = { ...rows[0]!, ok: true, text: PLANTED };
  writeFileSync(path, `${JSON.stringify(planted)}\n`);
  return planted;
}

/** The last element of a recorded basis: the readings object the embedded host appended. */
function readingsOf(entry: WorkflowJournalEntry): Record<string, { state: string; digest?: string; reason?: string }> {
  const basis: unknown = JSON.parse(entry.basis ?? "null");
  if (!Array.isArray(basis)) throw new Error("the recorded basis is not an array");
  expect(basis).toHaveLength(9);
  return basis[8] as Record<string, { state: string; digest?: string; reason?: string }>;
}

/** What a resume's completion notice reads as: the planted answer with one call replayed, or null with nothing replayed. */
function outcomeOf(notice: string, from: string): "replayed" | "live" {
  const result = /<result>([\s\S]*?)<\/result>/.exec(notice)?.[1];
  const summary = /<summary>([\s\S]*?)<\/summary>/.exec(notice)?.[1] ?? "";
  if (result === PLANTED && summary.includes(`1 replayed from ${from}`)) return "replayed";
  if (result === "null" && !summary.includes("replayed")) return "live";
  throw new Error(`resume read neither replayed nor live: result ${JSON.stringify(result)}, summary ${JSON.stringify(summary)}`);
}

/** Resume the recording run with the same script and prompt, and read what came back. */
async function resumed(booted: Booted, from: string): Promise<"replayed" | "live"> {
  const { notice } = await launch(booted, { script: SCRIPT, resumeFromRunId: from });
  return outcomeOf(notice, from);
}

/** Resume as `resumed` does, and also read the readings the resumed run's own journal row was recorded under. */
async function resumedWith(booted: Booted, from: string): Promise<{ outcome: "replayed" | "live"; readings: ReturnType<typeof readingsOf> }> {
  const { taskId, notice } = await launch(booted, { script: SCRIPT, resumeFromRunId: from });
  const rows = readJournal(join(sessionTaskDir(booted.dir, "s1"), `${taskId}.workflow.jsonl`));
  expect(rows).toHaveLength(1);
  return { outcome: outcomeOf(notice, from), readings: readingsOf(rows[0]!) };
}

const MEASURED = { state: "measured", digest: expect.stringMatching(/^sha256:[0-9a-f]{64}$/) };

describe("wb-413a wiring: the embedded host's replay basis carries the measured readings", () => {
  it("W-R017: a top-level tracked file's bytes, a new top-level untracked file, a new commit over the same tree and a committed change each decline the recorded answer; the unchanged and the restored repository replay", async () => {
    const booted = await boot({});
    const candidate = initRepo(booted.dir);
    const recording = await launch(booted, { script: SCRIPT });
    const planted = plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    // A dirty tracked file (the dirty-file digest), then its bytes restored.
    writeFileSync(candidate, "export const candidate = 2;\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    writeFileSync(candidate, "export const candidate = 1;\n");
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    // A new untracked file Git sees, then removed.
    writeFileSync(join(booted.dir, "untracked.ts"), "export const extra = true;\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    unlinkSync(join(booted.dir, "untracked.ts"));
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    // A new commit over the same tree, the index and the bytes unchanged (the commit alone), then HEAD moved back.
    git(booted.dir, "commit", "--allow-empty", "-qm", "same tree");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    git(booted.dir, "reset", "-q", "--soft", "HEAD~1");
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    // A committed change: a new tree under a new commit.
    writeFileSync(candidate, "export const candidate = 3;\n");
    git(booted.dir, "commit", "-qam", "tree change");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    // The recorded basis names all three readings, each measured.
    expect(readingsOf(planted)).toEqual({ source: MEASURED, instructions: MEASURED, provider: MEASURED });
  }, 60_000);

  it("W-R018: under the user setting source, a skill's and a memory file's bytes in the Claude config directory are in the reading", async () => {
    const config = claudeConfig();
    const skill = join(config, "skills", "review", "SKILL.md");
    write(skill, "review skill v1\n");
    const booted = await boot({ settingSources: ["user"] });
    initRepo(booted.dir);
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(skill, "review skill v2\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    write(skill, "review skill v1\n");
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(join(config, "CLAUDE.md"), "Answer tersely.\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
  }, 60_000);

  it("W-R018-LOCAL: under the local source, a Git-ignored CLAUDE.local.md moves the reading the source reading cannot see", async () => {
    claudeConfig();
    const booted = await boot({ settingSources: ["local"] });
    initRepo(booted.dir, ["CLAUDE.local.md", ".claude/settings.local.json"]);
    const memory = join(booted.dir, "CLAUDE.local.md");
    write(memory, "local memory v1\n");
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(memory, "local memory v2\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
  }, 60_000);

  it("W-R019: under the user and local sources, the user settings.json and the local settings.local.json each decline the recorded answer", async () => {
    const config = claudeConfig();
    const user = join(config, "settings.json");
    write(user, '{"model":"claude-opus-5-5"}\n');
    const booted = await boot({ settingSources: ["user", "local"] });
    initRepo(booted.dir, ["CLAUDE.local.md", ".claude/settings.local.json"]);
    const local = join(booted.dir, ".claude", "settings.local.json");
    write(local, '{"outputStyle":"default"}\n');
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(user, '{"model":"claude-haiku-5-5"}\n');
    expect(await resumed(booted, recording.taskId)).toBe("live");
    write(user, '{"model":"claude-opus-5-5"}\n');
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(local, '{"outputStyle":"explanatory"}\n');
    expect(await resumed(booted, recording.taskId)).toBe("live");
  }, 60_000);

  it("W-R020: outside any Git repository the source reading is unknown, so the same prompt over an unchanged directory replays nothing", async () => {
    const booted = await boot({}, true);
    const recording = await launch(booted, { script: SCRIPT });
    const planted = plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("live");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    // The recorded basis names the source reading unknown, with a reason and no digest coerced in its place.
    expect(readingsOf(planted)).toEqual({ source: { state: "unknown", reason: expect.any(String) }, instructions: MEASURED, provider: MEASURED });
    expect(readingsOf(planted).source).not.toHaveProperty("digest");
  }, 60_000);

  it("W-R020-CANDIDATE: a committed symlink makes the source reading unknown although HEAD reads, so the recorded answer is not replayed", async () => {
    const booted = await boot({});
    initRepo(booted.dir);
    symlinkSync("candidate.ts", join(booted.dir, "alias.ts"));
    git(booted.dir, "add", "alias.ts");
    git(booted.dir, "commit", "-qm", "symlinked path");
    const recording = await launch(booted, { script: SCRIPT });
    const planted = plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("live");
    expect(readingsOf(planted).source).toEqual({ state: "unknown", reason: expect.any(String) });
  }, 60_000);

  it("W-R017-INDEX: a staged change whose working-tree bytes equal HEAD moves the source reading alone (the index), and unstaging it replays again", async () => {
    const booted = await boot({});
    const candidate = initRepo(booted.dir);
    const recording = await launch(booted, { script: SCRIPT });
    const recorded = readingsOf(plant(booted, recording.taskId));

    writeFileSync(candidate, "export const candidate = 2;\n");
    git(booted.dir, "add", "candidate.ts");
    writeFileSync(candidate, "export const candidate = 1;\n");
    const staged = await resumedWith(booted, recording.taskId);
    expect(staged.outcome).toBe("live");
    expect(staged.readings.source).toEqual(MEASURED);
    expect(staged.readings.source).not.toEqual(recorded.source);
    expect(staged.readings.instructions).toEqual(recorded.instructions);
    expect(staged.readings.provider).toEqual(recorded.provider);

    git(booted.dir, "reset", "-q", "--", "candidate.ts");
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
  }, 60_000);

  it("W-R018-LOCAL-SOURCE: the Git-ignored CLAUDE.local.md moves the instruction reading, while the source reading, which cannot see it, stays equal", async () => {
    claudeConfig();
    const booted = await boot({ settingSources: ["local"] });
    initRepo(booted.dir, ["CLAUDE.local.md", ".claude/settings.local.json"]);
    const memory = join(booted.dir, "CLAUDE.local.md");
    write(memory, "local memory v1\n");
    const recording = await launch(booted, { script: SCRIPT });
    const recorded = readingsOf(plant(booted, recording.taskId));

    write(memory, "local memory v2\n");
    const moved = await resumedWith(booted, recording.taskId);
    expect(moved.outcome).toBe("live");
    expect(moved.readings.instructions).not.toEqual(recorded.instructions);
    expect(moved.readings.source).toEqual(recorded.source);
    expect(moved.readings.provider).toEqual(recorded.provider);
  }, 60_000);

  it("W-R018-PROJECT: under the project source, a Git-ignored skill below the cwd moves the instruction reading alone", async () => {
    const booted = await boot({ settingSources: ["project"] });
    initRepo(booted.dir, [".claude/skills/"]);
    const skill = join(booted.dir, ".claude", "skills", "review", "SKILL.md");
    write(skill, "project skill v1\n");
    const recording = await launch(booted, { script: SCRIPT });
    const recorded = readingsOf(plant(booted, recording.taskId));

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(skill, "project skill v2\n");
    const moved = await resumedWith(booted, recording.taskId);
    expect(moved.outcome).toBe("live");
    expect(moved.readings.instructions).not.toEqual(recorded.instructions);
    expect(moved.readings.source).toEqual(recorded.source);
    expect(moved.readings.provider).toEqual(recorded.provider);
  }, 60_000);

  it("W-R018-HOME: with CLAUDE_CONFIG_DIR unset the user source reads <home>/.claude, so a memory file there moves the instruction reading", async () => {
    delete process.env[CONFIG_ENV];
    const booted = await boot({ settingSources: ["user"] });
    const home = process.env.HOME;
    if (home === undefined) throw new Error("the hermetic sandbox sets HOME");
    initRepo(booted.dir);
    const memory = join(home, ".claude", "CLAUDE.md");
    write(memory, "home memory v1\n");
    const recording = await launch(booted, { script: SCRIPT });
    const recorded = readingsOf(plant(booted, recording.taskId));

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(memory, "home memory v2\n");
    const moved = await resumedWith(booted, recording.taskId);
    expect(moved.outcome).toBe("live");
    expect(moved.readings.instructions).not.toEqual(recorded.instructions);
    expect(moved.readings.source).toEqual(recorded.source);
    expect(moved.readings.provider).toEqual(recorded.provider);
    // The provider reading reads its user setting file under the same directory.
    write(memory, "home memory v1\n");
    write(join(home, ".claude", "settings.json"), '{"model":"claude-haiku-5-5"}\n');
    const settings = await resumedWith(booted, recording.taskId);
    expect(settings.outcome).toBe("live");
    expect(settings.readings.provider).not.toEqual(recorded.provider);
    expect(settings.readings.instructions).toEqual(recorded.instructions);
  }, 60_000);

  it("W-R018-RELATIVE-CONFIG: a relative CLAUDE_CONFIG_DIR is resolved against the run's cwd, so a memory file there moves the instruction reading", async () => {
    process.env[CONFIG_ENV] = "profile";
    const booted = await boot({ settingSources: ["user"] });
    initRepo(booted.dir, ["profile/"]);
    const memory = join(booted.dir, "profile", "CLAUDE.md");
    write(memory, "profile memory v1\n");
    const recording = await launch(booted, { script: SCRIPT });
    const recorded = readingsOf(plant(booted, recording.taskId));

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(memory, "profile memory v2\n");
    const moved = await resumedWith(booted, recording.taskId);
    expect(moved.outcome).toBe("live");
    expect(moved.readings.instructions).not.toEqual(recorded.instructions);
    expect(moved.readings.source).toEqual(recorded.source);
  }, 60_000);

  it("W-R020-INSTRUCTIONS: under the user source a FIFO among the skills makes the instruction reading unknown, so the same prompt over unchanged files replays nothing", async () => {
    const config = claudeConfig();
    mkdirSync(join(config, "skills"), { recursive: true });
    execFileSync("mkfifo", [join(config, "skills", "pipe")]);
    const booted = await boot({ settingSources: ["user"] });
    initRepo(booted.dir);
    const recording = await launch(booted, { script: SCRIPT });
    const planted = plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("live");
    expect(readingsOf(planted)).toEqual({ source: MEASURED, instructions: { state: "unknown", reason: "dependency-not-a-file" }, provider: MEASURED });
  }, 60_000);

  it("W-R017-NESTED: a tracked file one and two directories down, a tracked file deleted from the working tree and a new untracked file in a subdirectory each decline the recorded answer, and restoring each replays again", async () => {
    const booted = await boot({});
    initRepo(booted.dir);
    const inner = join(booted.dir, "src", "inner.ts");
    const core = join(booted.dir, "src", "deep", "core.ts");
    write(inner, "export const inner = 1;\n");
    write(core, "export const core = 1;\n");
    git(booted.dir, "add", "src/inner.ts", "src/deep/core.ts");
    git(booted.dir, "commit", "-qm", "nested files");
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    for (const [path, bytes] of [[inner, "export const inner = 1;\n"], [core, "export const core = 1;\n"]] as const) {
      writeFileSync(path, `${bytes}// dirty\n`);
      expect(await resumed(booted, recording.taskId), path).toBe("live");
      writeFileSync(path, bytes);
      expect(await resumed(booted, recording.taskId), path).toBe("replayed");
    }
    unlinkSync(core);
    expect(await resumed(booted, recording.taskId)).toBe("live");
    writeFileSync(core, "export const core = 1;\n");
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(join(booted.dir, "src", "deep", "extra.ts"), "export const extra = true;\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    unlinkSync(join(booted.dir, "src", "deep", "extra.ts"));
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
  }, 120_000);

  it("W-R017-DOT: a tracked dot-named file at the top level, a tracked file in a dot-named directory, a tracked dot-named file in a subdirectory and a new untracked dot-named file each decline the recorded answer, and restoring each replays again", async () => {
    const booted = await boot({});
    initRepo(booted.dir);
    const dotted = [join(booted.dir, ".tool-config.json"), join(booted.dir, ".config", "tool.json"), join(booted.dir, "src", ".inner-config.json")];
    for (const path of dotted) write(path, '{"level":1}\n');
    git(booted.dir, "add", ".tool-config.json", ".config/tool.json", "src/.inner-config.json");
    git(booted.dir, "commit", "-qm", "dot-named files");
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    for (const path of dotted) {
      writeFileSync(path, '{"level":2}\n');
      expect(await resumed(booted, recording.taskId), path).toBe("live");
      writeFileSync(path, '{"level":1}\n');
      expect(await resumed(booted, recording.taskId), path).toBe("replayed");
    }
    writeFileSync(join(booted.dir, ".scratch-notes.md"), "untracked\n");
    expect(await resumed(booted, recording.taskId)).toBe("live");
    unlinkSync(join(booted.dir, ".scratch-notes.md"));
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
  }, 120_000);
});

describe("wb-413a wiring: named residuals at the registered path, each quiet row reds when its escape stops being quiet", () => {
  it("W-Q-ENV-PROVIDER (R-ENV-SELECTED-PROVIDER): no reading reads ANTHROPIC_BASE_URL or ANTHROPIC_MODEL, so changing both between the recording and the resume replays the recorded answer", async () => {
    const booted = await boot({});
    initRepo(booted.dir);
    process.env.ANTHROPIC_BASE_URL = "https://provider-a.example.invalid";
    process.env.ANTHROPIC_MODEL = "fake-model-a";
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    process.env.ANTHROPIC_BASE_URL = "https://provider-b.example.invalid";
    process.env.ANTHROPIC_MODEL = "fake-model-b";
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
  }, 60_000);

  it("W-Q-NESTED-MEMORY (R-NESTED-MEMORY): under the project source, a Git-ignored CLAUDE.md in a directory below the cwd is read by neither the source nor the instruction reading, so changing it replays the recorded answer", async () => {
    const booted = await boot({ settingSources: ["project"] });
    initRepo(booted.dir, ["sub/CLAUDE.md"]);
    const memory = join(booted.dir, "sub", "CLAUDE.md");
    write(memory, "nested memory v1\n");
    const recording = await launch(booted, { script: SCRIPT });
    plant(booted, recording.taskId);

    expect(await resumed(booted, recording.taskId)).toBe("replayed");
    write(memory, "nested memory v2\n");
    expect(await resumed(booted, recording.taskId)).toBe("replayed");
  }, 60_000);
});
