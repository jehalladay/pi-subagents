/**
 * skills-index-inheritance-e2e.test.ts — wb-3o0a (DX P02), EAT-R318 criterion 1 of the pi-system DX/UX/LX
 * triage 2026-11-11 (claim C019): "Assert ... that an append-mode child's prompt contains exactly one
 * skills-index occurrence (descriptionOccurrences===1 for general-purpose)."
 *
 * An append-mode agent embeds the parent's rendered system prompt verbatim (src/prompts.ts), and that prompt
 * already carries pi's skills index whenever the parent loaded skills. The child's own resource loader loaded
 * the same skills again, so pi appended a second copy of the index to every such child: general-purpose
 * included, the type every unknown name falls back to.
 *
 * Driven through the real stack: the Agent tool the booted extension registers, the real runAgent, real pi
 * loaders and sessions, on a faux model (test/helpers/print-mode-runner.ts); I3 calls the real runAgent
 * directly. Every count is read from the system prompt a session's model call actually carried, as the number
 * of times one planted skill's description occurs in it.
 *
 * PINNED (each case names the falsifier that turns it red):
 *  I1  general-purpose (append mode, skills: true) under a parent whose prompt carries the index: the
 *      description occurs exactly once in the parent's prompt (the live precondition) and exactly once in the
 *      child's, and the child's prompt begins with the parent's byte for byte (the inherited prefix stays
 *      verbatim). Falsifier: the child's loader loading skills again (two occurrences), or the cure stripping
 *      the index from the inherited copy (the prefix breaks).
 *  I2  a replace-mode project agent keeps the one copy its own loader writes. Falsifier: suppressing the
 *      loader's skills for every child (zero occurrences).
 *  I3  general-purpose under a parent prompt that holds no index keeps its own loader's copy. Falsifier:
 *      suppressing the loader's skills for every append-mode child, index or not (zero occurrences).
 * NOT CLAIMED: agents whose skills is a list or false (the loader already skipped skills for both), the
 * inherit_context tail budget and its setting (EAT-R318 criteria 2 and 3), and any prompt section other than
 * the skills index.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Context, fauxAssistantMessage, fauxText, getCurrentSystemPrompt } from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runAgent } from "../src/agent-runner.js";
import { registerAgents } from "../src/agent-types.js";
import { fauxModelBackend } from "./helpers/faux-model-backend.js";
import { registerFauxProvider } from "./helpers/pi-ai.js";
import { agentCall, type PrintModeRun, routeBySession, runPrintMode } from "./helpers/print-mode-runner.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

// Real pi sessions (loader, dynamic extension import, parent and child) on a shared host: generous headroom,
// a genuine hang still fails.
vi.setConfig({ testTimeout: 120_000 });

/** The planted skill. Its description is the counted needle: one occurrence per copy of the index. */
const SKILL_NAME = "index-probe";
const DESCRIPTION = "INDEX-PROBE-C019 marks one copy of the skills index";
/** I3's parent prompt: no skills index at all. */
const PARENT_WITHOUT_INDEX = "You are the parent session. This prompt carries no skills index.";

/** How many times `needle` occurs in `text`. */
function occurrences(text: string, needle: string): number {
  return text.split(needle).length - 1;
}

/** A Pi-standard project skill (<cwd>/.pi/skills/<name>/SKILL.md) that both the parent's and the child's loader read. */
function plantSkill(cwd: string): void {
  const dir = join(cwd, ".pi", "skills", SKILL_NAME);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "SKILL.md"), `---\nname: ${SKILL_NAME}\ndescription: ${DESCRIPTION}\n---\nThe probe skill body.\n`);
}

/** A replace-mode project agent; skills is omitted, so it inherits every skill (skills: true). */
function plantReplacer(cwd: string): void {
  const dir = join(cwd, ".pi", "agents");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "replacer.md"), "---\ndescription: Replace-mode probe\nprompt_mode: replace\n---\nYou are the replace-mode probe.\n");
}

/** The prompts one print-mode run's model calls carried: the parent's first call and the child's. */
interface SeenPrompts {
  parent: string;
  child: string;
}

describe("the skills index reaches a child exactly once (EAT-R318 criterion 1)", () => {
  let run: PrintModeRun | undefined;
  const scratch: string[] = [];

  afterEach(async () => {
    await run?.dispose();
    run = undefined;
    for (const dir of scratch.splice(0)) removeScratch(dir);
  });

  /** Spawn `subagentType` once through the registered Agent tool and return the prompts both sessions carried. */
  async function spawnOnce(cwd: string, subagentType: string): Promise<SeenPrompts> {
    const seen: SeenPrompts = { parent: "", child: "" };
    run = await runPrintMode({
      prompt: "Delegate the probe.",
      cwd,
      live: false,
      timeoutMs: 110_000,
      respond: routeBySession({
        parentInitial: (ctx: Context) => {
          seen.parent = getCurrentSystemPrompt(ctx.messages);
          return agentCall({ subagent_type: subagentType, description: "probe", prompt: "Report.", run_in_background: false });
        },
        parentFinal: "done",
        subagent: (ctx: Context) => {
          seen.child = getCurrentSystemPrompt(ctx.messages);
          return "child done";
        },
      }),
    });
    return seen;
  }

  it("I1 general-purpose under a parent prompt carrying the index holds one copy and the verbatim parent prefix", async () => {
    const cwd = makeScratch("skills-index-i1-");
    scratch.push(cwd);
    plantSkill(cwd);
    const seen = await spawnOnce(cwd, "general-purpose");
    expect(occurrences(seen.parent, DESCRIPTION), "the parent's prompt carries the index (live precondition)").toBe(1);
    expect(occurrences(seen.child, DESCRIPTION), "the append-mode child's prompt carries the index once").toBe(1);
    expect(seen.child.startsWith(seen.parent), "the inherited parent prompt stays a verbatim prefix").toBe(true);
  });

  it("I2 a replace-mode child keeps the one copy its own loader writes", async () => {
    const cwd = makeScratch("skills-index-i2-");
    scratch.push(cwd);
    plantSkill(cwd);
    plantReplacer(cwd);
    const seen = await spawnOnce(cwd, "replacer");
    expect(seen.child, "the replace-mode body reached the child").toContain("You are the replace-mode probe.");
    expect(occurrences(seen.child, DESCRIPTION), "the replace-mode child's prompt carries the index once").toBe(1);
  });

  it("I3 general-purpose under a parent prompt with no index keeps its own loader's copy", async () => {
    const home = makeScratch("skills-index-i3-home-");
    const cwd = makeScratch("skills-index-i3-");
    scratch.push(home, cwd);
    plantSkill(cwd);
    const savedAgentDir = process.env.PI_CODING_AGENT_DIR;
    const savedHome = process.env.HOME;
    process.env.PI_CODING_AGENT_DIR = home;
    process.env.HOME = home;
    const faux = registerFauxProvider({ provider: "faux", models: [{ id: "faux-1", contextWindow: 200_000 }] });
    try {
      faux.setResponses([fauxAssistantMessage([fauxText("child done")])]);
      const model = faux.getModel();
      const { modelRegistry, modelRuntime } = fauxModelBackend(model);
      registerAgents(new Map());
      const ctx = { cwd, getSystemPrompt: () => PARENT_WITHOUT_INDEX, model, modelRegistry: { ...modelRegistry, runtime: modelRuntime } };
      const pi = { exec: async () => ({ code: 1, stdout: "", stderr: "", killed: false }) };
      let child = "";
      await runAgent(ctx as unknown as ExtensionContext, "general-purpose", "Report.", {
        pi: pi as unknown as ExtensionAPI,
        model,
        onSessionCreated: (session) => {
          child = session.systemPrompt;
        },
      });
      expect(child.startsWith(PARENT_WITHOUT_INDEX), "the child inherited the index-free parent prompt").toBe(true);
      expect(occurrences(child, DESCRIPTION), "the child's own loader wrote the one copy").toBe(1);
    } finally {
      faux.unregister();
      if (savedAgentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
      else process.env.PI_CODING_AGENT_DIR = savedAgentDir;
      if (savedHome === undefined) delete process.env.HOME;
      else process.env.HOME = savedHome;
    }
  });
});
