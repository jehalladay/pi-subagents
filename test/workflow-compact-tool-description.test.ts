/**
 * wb-9btr cut #5 ([DX P03] of the pi-system-dx-triage-2026-11-11 program, which lives on origin/master at 0a5ac3a3 and not in this
 * trunk's tree; its requirement rows are in that program's req-r-lx shard): EAT-R326, a compact SubagentWorkflow description
 * (docs/workbench/receipts/wb-9btr.md). Cuts #1 to #4 delivered EAT-R323 and EAT-R322 criteria 2 and 3 in
 * test/workflow-script-syntax-refusal.test.ts; that file's claim shape is closed (ruling M:78806) and this file does not read it.
 * The criterion lines these cases pin, quoted:
 *   EAT-R326 (1) "under the compact selection SubagentWorkflow's descriptionBytes ≤ 4,096 while full mode retains current
 *                content."
 *   EAT-R326 (2) "the compact text still names the script API surface, the caps/bounds, and one worked example; moved patterns
 *                live in docs/workflows.md."
 *   EAT-R326 (3) "README's toolDescriptionMode text is re-trued to its new scope (today it scopes the setting to the Agent
 *                description only)."
 *
 * Claims, each over exactly the cases it names. THE CLAIMS BLOCK is every line after this paragraph's last line, up to the next
 * blank comment line; C0 holds that block line for line to the rows of ROWS:
 * Booted with toolDescriptionMode "compact", the registered SubagentWorkflow description is compactWorkflowToolDescription and at most 4096 bytes of UTF-8; booted with "custom" and a project agent-tool-description.md, with "full", or with the setting absent, it is the full description with, in place of its {{typeList}} placeholder, the agent list the custom Agent description renders for that placeholder (R326-B1, R326-B2).
 * The compact description's Globals list has one bullet for each name the worker's sandbox setup installs (its Object.assign(sandbox, ...) keys and each sandbox.<name> assignment) and no other, and its agent() bullet lists every option of the runtime's AGENT_OPTIONS and no other, its EFFORT_LEVELS in order and, on its opts.resume sentence, every option the runtime's messages exclude from resume, and every opts.<name> it writes is in AGENT_OPTIONS (R326-A1, R326-A2).
 * The compact description's Caps line quotes the runtime's concurrency formula, WORKFLOW_AGENT_CAP, WORKFLOW_ITEM_CAP, WORKFLOW_NESTED_CAP and the registered script parameter's maxLength (R326-C1).
 * The compact description holds one example script, under its Example line, and that script runs to completion through runWorkflow with a stub host and two files as args, returning the stub's refutation of each file's finding (R326-E1).
 * Each of the thirteen lines of the full description's single-phase workflow and quality pattern lists is absent from the compact description and present in docs/workflows.md's Orchestration patterns section; the compact description names docs/workflows.md, and the Recipes introduction no longer says the patterns live in exactly one place (R326-P1).
 * README.md's toolDescriptionMode paragraph is exactly the re-trued line, which scopes the setting to the Agent and SubagentWorkflow descriptions and says custom leaves SubagentWorkflow full, and no README line keeps the old Agent-only wording (R326-R1).
 *
 * THE CENSUS, C0: registered last, at file scope, outside the describe that holds the eight pinned cases. C0 reads the cases from
 * vitest's collected task tree (task.file.tasks), never from this file's text. It finds itself by task identity as the last
 * registered test, and every other registered test must be exactly one pinned case (by its title's leading case id), in run mode,
 * not inverted, and run (pass or fail) before C0. A pinned case given a skip option, skipped at run time through its test context,
 * wrapped in a comment, deleted, inverted with the fails option, or held in a describe that is skipped therefore reds C0. C0 also
 * holds the frozen shape of ROWS (rule 16); the claims block to the row sentences, line for line and in order; the header lines
 * that end in a case citation and a period to the row sentences as well; no case id in the header outside the claims block; each
 * sentence to its pins; and the case ids src/workflow/tool-description.ts spells (its comment on compactWorkflowToolDescription
 * cites them) to exactly the pinned set (the anchor outside this file's literals). The file-end judge (afterAll) reds unless C0 ran to its last statement.
 * Run this file whole: C0 judges the run of every case, so a run filtered by name reds C0 or the file-end judge by design.
 * The tables a case iterates are derived from the runtime or the full description, and each case pins its table's shape (rule 16):
 * GLOBALS from the worker's sandbox, the option, effort and resume-exclusion lists from worker-source.ts, PATTERNS from the full
 * description's two pattern lists.
 * THE RUN PIN, test/workflow-compact-tool-description.census.ts (census tier): it reads the gate's own test report and reds unless
 * the report records this file once, passed, with exactly its nine titles under their describe paths, each passed. That covers the
 * one mode no case here can see: every registration of this file skipped at collection. C0 holds the run pin's bytes (sha256).
 *
 * Scope sentences (no residual, no follow-up):
 * What a case asserts is NOT CLAIMED by the census: a case hollowed while it still registers, runs and passes stays green there (the delivery note's mutant battery measures the bodies).
 * The truth of the compact description's other sentences (the opt-in rule, the background, saving and resume wording, the language rules and each bullet's prose) is NOT CLAIMED by this file; each restates a sentence of the full description.
 * The settings menu's toolDescriptionMode description in src/index.ts and the toolDescriptionMode comment in src/settings.ts are NOT CLAIMED by this file.
 * Header prose outside the claims block is NOT CLAIMED by the census: outside that block C0 reads only the lines that end in a case citation and a period, and the case ids named.
 * A retry option on a case is NOT CLAIMED by this census.
 * The run pin reads only the default test tier's report in the complete gate's census step; a targeted run of this file is NOT CLAIMED for a skip of every registration here.
 * EAT-R321, EAT-R322 criterion 1, EAT-R324, EAT-R325 and EAT-R327 are NOT CLAIMED by this file.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it, type RunnerTask, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import {
  runWorkflow,
  WORKFLOW_AGENT_CAP,
  WORKFLOW_ITEM_CAP,
  WORKFLOW_NESTED_CAP,
  type WorkflowHost,
  type WorkflowSpawnRequest,
  workflowConcurrency,
} from "../src/workflow/runtime.js";
import { compactWorkflowToolDescription, fullWorkflowToolDescription } from "../src/workflow/tool-description.js";
import { WORKER_SOURCE } from "../src/workflow/worker-source.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const SELF = readFileSync(fileURLToPath(import.meta.url), "utf8");
const HEADER = SELF.slice(0, SELF.indexOf("\nimport "));
/** The one header line that ends with this opens THE CLAIMS BLOCK. */
const CLAIMS_ANCHOR = " to the rows of ROWS:";
/**
 * THE CLAIMS BLOCK as a slice of the header: the comment lines after the one line that ends CLAIMS_ANCHOR, up to the next blank
 * comment line, each with its " * " prefix removed; outside holds every other header line. A missing or repeated anchor, or no
 * blank line after it, reads as one refusal line and an empty outside, so the block never reads as empty and passes.
 */
function claimsBlock(lines: readonly string[]): { readonly block: readonly string[]; readonly outside: readonly string[] } {
  const anchors = lines.flatMap((line, index) => (line.endsWith(CLAIMS_ANCHOR) ? [index] : []));
  if (anchors.length !== 1) return { block: [`the header holds ${anchors.length} lines ending "${CLAIMS_ANCHOR}", not one`], outside: [] };
  const end = lines.findIndex((line, index) => index > anchors[0] && line === " *");
  if (end === -1) return { block: ["no blank comment line closes the claims block"], outside: [] };
  return { block: lines.slice(anchors[0] + 1, end).map(line => line.replace(/^ \* /, "")), outside: [...lines.slice(0, anchors[0] + 1), ...lines.slice(end)] };
}

/** The repository root: C0 reads the src comment that cites these cases, and the cases read README.md and docs/workflows.md. */
const ROOT = fileURLToPath(new URL("..", import.meta.url));
interface CensusRow {
  readonly id: string;
  readonly sentence: string;
  readonly pins: readonly string[];
}
/** The census rows: each claim sentence of the header, verbatim, and the cases it pins. C0 holds the header, this file's case titles and the src citations to them. */
const ROWS: readonly CensusRow[] = [
  {
    id: "EAT-R326(1)",
    sentence: 'Booted with toolDescriptionMode "compact", the registered SubagentWorkflow description is compactWorkflowToolDescription and at most 4096 bytes of UTF-8; booted with "custom" and a project agent-tool-description.md, with "full", or with the setting absent, it is the full description with, in place of its {{typeList}} placeholder, the agent list the custom Agent description renders for that placeholder (R326-B1, R326-B2).',
    pins: ["R326-B1", "R326-B2"],
  },
  {
    id: "EAT-R326(2)-api",
    sentence: "The compact description's Globals list has one bullet for each name the worker's sandbox setup installs (its Object.assign(sandbox, ...) keys and each sandbox.<name> assignment) and no other, and its agent() bullet lists every option of the runtime's AGENT_OPTIONS and no other, its EFFORT_LEVELS in order and, on its opts.resume sentence, every option the runtime's messages exclude from resume, and every opts.<name> it writes is in AGENT_OPTIONS (R326-A1, R326-A2).",
    pins: ["R326-A1", "R326-A2"],
  },
  {
    id: "EAT-R326(2)-caps",
    sentence: "The compact description's Caps line quotes the runtime's concurrency formula, WORKFLOW_AGENT_CAP, WORKFLOW_ITEM_CAP, WORKFLOW_NESTED_CAP and the registered script parameter's maxLength (R326-C1).",
    pins: ["R326-C1"],
  },
  {
    id: "EAT-R326(2)-example",
    sentence: "The compact description holds one example script, under its Example line, and that script runs to completion through runWorkflow with a stub host and two files as args, returning the stub's refutation of each file's finding (R326-E1).",
    pins: ["R326-E1"],
  },
  {
    id: "EAT-R326(2)-patterns",
    sentence: "Each of the thirteen lines of the full description's single-phase workflow and quality pattern lists is absent from the compact description and present in docs/workflows.md's Orchestration patterns section; the compact description names docs/workflows.md, and the Recipes introduction no longer says the patterns live in exactly one place (R326-P1).",
    pins: ["R326-P1"],
  },
  {
    id: "EAT-R326(3)",
    sentence: "README.md's toolDescriptionMode paragraph is exactly the re-trued line, which scopes the setting to the Agent and SubagentWorkflow descriptions and says custom leaves SubagentWorkflow full, and no README line keeps the old Agent-only wording (R326-R1).",
    pins: ["R326-R1"],
  },
];
/** The src module whose comment on compactWorkflowToolDescription cites the cases that pin it: the census's anchor outside its own literals. */
const CITING_SRC = "src/workflow/tool-description.ts";
/** A case id as the header, the titles and the src comment spell it. */
const CASE_ID = /\bR326-[A-Z]\d\b/g;
/** The census-tier run pin, this file's anchor for a skip of every registration here at once; C0 holds its bytes. */
const RUN_PIN = "test/workflow-compact-tool-description.census.ts";
const RUN_PIN_SHA256 = "f46169c9798dffc6abc414240066098965c243f8e42456a410998443a189a307";
/** C0's last statement records it here, and the file-end judge holds it. */
const CENSUS_END: string[] = [];

/** A test as vitest's collected task tree holds it; self marks C0. */
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test of a collected task tree, in registration order (the walk of test/workflow-script-syntax-refusal.test.ts). */
function registered(tasks: readonly RunnerTask[], self: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registered(child.tasks, self));
  }
  return walked;
}
/** In run mode, not inverted, and run (pass or fail) before C0 reads it. */
const ranInRunMode = (entry: Registered): boolean => entry.mode === "run" && !entry.fails && (entry.state === "pass" || entry.state === "fail");
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`;

/** The full description's {{typeList}} placeholder, which the registration fills with the live agent list. */
const TYPE_LIST = "{{typeList}}";
/** The opening of the custom Agent template R326-B2 writes; the rest of the template is the agent-list placeholder. */
const CUSTOM_PREFIX = "CUSTOM AGENT TEXT\n";
/** README.md's toolDescriptionMode paragraph as this cut re-trues it (EAT-R326 (3)). */
const README_LINE = "**Tool description** (`toolDescriptionMode`, default `\"full\"`): which Agent and `SubagentWorkflow` tool descriptions the LLM sees. `\"full\"` is the rich Claude Code-style prompt for both (~1,400 tokens for the Agent tool with the default agents); `\"compact\"` is ~75% smaller for the Agent tool — one-line agent type list, terse usage notes — and gives `SubagentWorkflow` a description of at most 4,096 bytes (the script API, the caps and one example; the orchestration patterns it leaves out are in [docs/workflows.md](docs/workflows.md#orchestration-patterns)), for small/local models where tool-spec tokens are expensive. `\"custom\"` replaces the Agent description only: `SubagentWorkflow` keeps its full description. Per-option details stay in the parameter descriptions in every mode (the parameter schema is never customizable). Applies on the next pi session.";
/** The paragraph's opening, which finds it in README.md. */
const README_OPENING = "**Tool description** (`toolDescriptionMode`";
/** The pre-cut wording that scoped the setting to the Agent description only. */
const AGENT_ONLY = "which Agent tool description the LLM sees";
/** The docs/workflows.md heading the moved patterns live under. */
const PATTERNS_HEADING = "### Orchestration patterns";
/** The pre-cut Recipes wording that said the patterns live only in the tool description. */
const ONE_PLACE = "live in exactly one place";
/** The two lists of the full description whose lines the compact description leaves to docs/workflows.md. */
const PATTERN_LISTS = ["Common single-phase workflows you can chain across turns:", "Quality patterns — common shapes; pick by task and compose freely:"];

/** The lines of a text from the line after `opening` up to the next blank line, or "" when `opening` is not exactly one line. */
function sectionAfter(text: string, opening: string): readonly string[] {
  const lines = text.split("\n");
  const at = lines.flatMap((line, index) => (line === opening ? [index] : []));
  if (at.length !== 1) return [];
  const end = lines.findIndex((line, index) => index > at[0] && line === "");
  return lines.slice(at[0] + 1, end === -1 ? lines.length : end);
}
/** A list item's name: the bold run of "- **Name** — ...", else the text before the first ": " of "- Name: ...". */
const patternName = (line: string): string => /^- \*\*([^*]+)\*\*/.exec(line)?.[1] ?? /^- ([^:]+):/.exec(line)?.[1] ?? `unnamed: ${line}`;
/** The lines of the full description's two pattern lists: every top-level "- " item of each, in order. */
function patternLines(): string[] {
  return PATTERN_LISTS.flatMap(opening => sectionAfter(fullWorkflowToolDescription, opening).filter(line => line.startsWith("- ")));
}

/** Every global the workflow worker installs in the script's realm: the keys of its Object.assign(sandbox, ...), then each sandbox.<name> = assignment. */
function workerGlobals(): string[] {
  const assigned = /Object\.assign\(sandbox, \{([\s\S]*?)\}\);/.exec(WORKER_SOURCE)?.[1] ?? "";
  return [
    ...[...assigned.matchAll(/(?:^|,)\s*(\w+):/g)].map(m => m[1]),
    ...[...WORKER_SOURCE.matchAll(/^\s*sandbox\.(\w+) = /gm)].map(m => m[1]),
  ];
}
/** The literal string array `name` that worker-source.ts validates against, read from its source text. */
function workerArray(name: string): string[] {
  const match = new RegExp(`const ${name} = \\[(.*?)\\];`, "s").exec(WORKER_SOURCE);
  return match ? [...match[1].matchAll(/"(\w+)"/g)].map(m => m[1]) : [];
}
/** Options the runtime refuses to combine with resume, per its own messages. */
function resumeExclusions(): string[] {
  return [
    ...new Set([
      ...[...WORKER_SOURCE.matchAll(/opts\.resume and opts\.(\w+) are mutually exclusive/g)].map(m => m[1]),
      ...(WORKER_SOURCE.includes("opts.gate cannot be combined with opts.resume") ? ["gate"] : []),
    ]),
  ];
}
/** The compact description's Globals list: its "- " lines after the line "Globals:". */
const globalsList = (text: string): readonly string[] => sectionAfter(text, "Globals:").filter(line => line.startsWith("- "));
/** The bullet's leading name: the identifier right after "- ". */
const bulletName = (line: string): string => /^- ([A-Za-z_$][\w$]*)/.exec(line)?.[1] ?? `unnamed: ${line}`;

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
});

interface Booted {
  readonly workflow: { readonly description: string; readonly scriptMaxLength: unknown };
  readonly agentDescription: string;
}
/** Boots the REAL extension with `settings` in its project subagents.json (and an agent-tool-description.md when given) and reads the registered tools. */
async function boot(settings: Record<string, unknown>, agentTemplate?: string): Promise<Booted> {
  sandbox = hermeticDir({ settings });
  if (agentTemplate !== undefined) writeFileSync(join(sandbox.dir, ".pi", "agent-tool-description.md"), agentTemplate);
  const booted = makePi();
  subagentsExtension(booted.pi);
  const workflow = booted.tools.get("SubagentWorkflow");
  const agent = booted.tools.get("Agent");
  await booted.lifecycle.get("session_shutdown")?.({}, ctx({ cwd: sandbox.dir }));
  return {
    workflow: { description: String(workflow?.description), scriptMaxLength: workflow?.parameters?.properties?.script?.maxLength },
    agentDescription: String(agent?.description),
  };
}
/** The registered SubagentWorkflow description under toolDescriptionMode "compact". */
async function compactDescription(): Promise<string> {
  return (await boot({ workflowsEnabled: true, toolDescriptionMode: "compact" })).workflow.description;
}

describe("wb-9btr EAT-R326: a compact SubagentWorkflow description under toolDescriptionMode compact", () => {
  it("R326-B1 under toolDescriptionMode compact the registered SubagentWorkflow description is compactWorkflowToolDescription and at most 4096 bytes", async () => {
    const description = await compactDescription();
    expect(description, "the compact selection registers compactWorkflowToolDescription").toBe(compactWorkflowToolDescription);
    expect(Buffer.byteLength(description, "utf8"), "descriptionBytes under the compact selection").toBeLessThanOrEqual(4096);
  }, 60_000);

  it("R326-B2 under custom with a project template, full and an absent setting the registered SubagentWorkflow description is the full one with the custom Agent description's agent list in its placeholder", async () => {
    const parts = fullWorkflowToolDescription.split(TYPE_LIST);
    expect(parts.length, "the full description holds its agent-list placeholder once").toBe(2);
    const [head, tail] = parts;
    const selections: readonly [string, Record<string, unknown>, string | undefined][] = [
      ["custom", { workflowsEnabled: true, toolDescriptionMode: "custom" }, `${CUSTOM_PREFIX}${TYPE_LIST}`],
      ["full", { workflowsEnabled: true, toolDescriptionMode: "full" }, undefined],
      ["absent", { workflowsEnabled: true }, undefined],
    ];
    let agentList: string | undefined;
    for (const [selection, settings, template] of selections) {
      const booted = await boot(settings, template);
      if (selection === "custom") {
        expect(booted.agentDescription.startsWith(CUSTOM_PREFIX), "custom: the Agent tool took the project template").toBe(true);
        agentList = booted.agentDescription.slice(CUSTOM_PREFIX.length);
        expect(agentList.length, "custom: the template's placeholder rendered a non-empty agent list").toBeGreaterThan(0);
      }
      const description = booted.workflow.description;
      expect(description.startsWith(head), `${selection}: the full description's text before the placeholder`).toBe(true);
      expect(description.endsWith(tail), `${selection}: the full description's text after the placeholder`).toBe(true);
      expect(description.slice(head.length, description.length - tail.length), `${selection}: the placeholder holds the agent list the custom Agent description renders`).toBe(agentList);
      sandbox?.restore();
      sandbox = undefined;
    }
  }, 90_000);

  it("R326-A1 the compact Globals list has one bullet per name the worker's sandbox setup installs, and no other bullet", async () => {
    const globals = workerGlobals();
    expect(globals, "GLOBALS's shape (rule 16): the worker's sandbox keys, then its direct assignments").toEqual(["agent", "node", "parallel", "pipeline", "phase", "log", "workflow", "budget", "console", "CapabilityError", "meta", "args"]);
    const bullets = globalsList(await compactDescription());
    expect(bullets.map(bulletName).sort(), "one Globals bullet per worker global, and no other").toEqual([...globals].sort());
  }, 60_000);

  it("R326-A2 the compact agent() bullet lists every accepted option and no other, the effort levels in order and every resume exclusion, and writes no rejected opts.<name>", async () => {
    const options = workerArray("AGENT_OPTIONS");
    const efforts = workerArray("EFFORT_LEVELS");
    const exclusions = resumeExclusions();
    expect(options, "AGENT_OPTIONS's shape (rule 16)").toEqual(["label", "phase", "model", "agentType", "isolation", "gate", "resume", "effort", "schema"]);
    expect(efforts, "EFFORT_LEVELS's shape (rule 16)").toEqual(["minimal", "low", "medium", "high", "xhigh", "max"]);
    expect(exclusions, "the resume exclusions' shape (rule 16)").toEqual(["agentType", "model", "isolation", "effort", "schema", "gate"]);
    const description = await compactDescription();
    const agentBullet = globalsList(description).filter(line => line.startsWith("- agent("));
    expect(agentBullet.length, "one agent() bullet").toBe(1);
    const bullet = agentBullet[0] ?? "";
    const listed = /opts: (.*?)\. /.exec(bullet)?.[1].split(", ").map(item => /^(\w+)/.exec(item)?.[1] ?? `unnamed: ${item}`) ?? [];
    const resumeSentence = /opts\.resume: [^.]*?cannot be combined with ([^.]*)\./.exec(bullet);
    expect([...listed, ...(resumeSentence ? ["resume"] : [])].sort(), "the opts list and the opts.resume sentence name every accepted option, and no other").toEqual([...options].sort());
    expect([.../effort \(([^)]*)\)/.exec(bullet)?.[1].matchAll(/'(\w+)'/g) ?? []].map(m => m[1]), "the effort levels, in the runtime's order").toEqual(efforts);
    expect(resumeSentence?.[1].split(/, | or /).sort(), "the opts.resume sentence names every option resume cannot be combined with").toEqual([...exclusions].sort());
    expect([...new Set([...description.matchAll(/opts\.(\w+)/g)].map(m => m[1]))].filter(name => !options.includes(name)), "every opts.<name> written is an accepted option").toEqual([]);
  }, 60_000);

  it("R326-C1 the compact Caps line quotes the concurrency formula, the agent, item and nested caps and the registered script maxLength", async () => {
    const booted = await boot({ workflowsEnabled: true, toolDescriptionMode: "compact" });
    const caps = booted.workflow.description.split("\n").filter(line => line.startsWith("Caps: "));
    expect(caps.length, "one Caps line").toBe(1);
    const line = caps[0] ?? "";
    expect(workflowConcurrency(8), "the formula as the runtime applies it, 8 CPUs").toBe(6);
    expect(workflowConcurrency(64), "the formula as the runtime applies it, 64 CPUs").toBe(16);
    expect(line).toContain("min(16, available CPUs - 2)");
    expect(line).toContain(`capped at ${WORKFLOW_AGENT_CAP} per run`);
    expect(line).toContain(`at most ${WORKFLOW_ITEM_CAP} items per parallel()/pipeline() call`);
    expect(line).toContain(`${WORKFLOW_NESTED_CAP} nested workflow() calls per run`);
    expect(typeof booted.workflow.scriptMaxLength, "the registered script parameter carries a maxLength").toBe("number");
    expect(line).toContain(`an inline script up to ${String(booted.workflow.scriptMaxLength)} characters`);
  }, 60_000);

  it("R326-E1 the compact description holds one example script, and it runs to completion through runWorkflow with a stub host and two files", async () => {
    const description = await compactDescription();
    const lines = description.split("\n");
    expect(lines.filter(line => line === "Example:").length, "one Example line").toBe(1);
    expect(lines.filter(line => line.startsWith("  export const meta")).length, "one example script in the description").toBe(1);
    const example = sectionAfter(description, "Example:");
    expect(example.length > 0 && example.every(line => line.startsWith("  ")), "the example is the indented block under the Example line").toBe(true);
    expect(example[0]?.startsWith("  export const meta"), "the example begins with its meta literal").toBe(true);
    const spawned: WorkflowSpawnRequest[] = [];
    const host: WorkflowHost = {
      async spawnAgent(request) {
        spawned.push(request);
        if (request.schema !== undefined) return { ok: true, text: JSON.stringify({ findings: [`finding in ${request.label}`] }), outputTokens: 1 };
        return { ok: true, text: `refuted: ${request.prompt}`, outputTokens: 1 };
      },
      abortAgent() {},
      loadWorkflow() {
        return { ok: false, message: "no saved workflows here" };
      },
    };
    const run = await runWorkflow({ script: example.map(line => line.slice(2)).join("\n"), args: { files: ["a.ts", "b.ts"] }, host });
    expect(run.error, "the example runs without an error").toBeUndefined();
    expect(run.status).toBe("completed");
    expect(run.value, "each file's finding comes back refuted by the stub").toEqual([
      ["refuted: Try to refute: finding in review:a.ts"],
      ["refuted: Try to refute: finding in review:b.ts"],
    ]);
    expect(spawned.map(request => `${request.label}${request.schema === undefined ? "" : "+schema"}${request.effort ? `+${request.effort}` : ""}`).sort(), "the example's two agent() shapes, each spawned for both files").toEqual(["refute:0+low", "refute:0+low", "review:a.ts+schema", "review:b.ts+schema"]);
  }, 90_000);

  it("R326-P1 the thirteen pattern lines of the full description are left out of the compact one and kept in docs/workflows.md's Orchestration patterns section", async () => {
    const patterns = patternLines();
    expect(patterns.map(patternName), "PATTERNS's shape (rule 16): the two lists' items, in order").toEqual([
      "Understand", "Design", "Review", "Research", "Migrate",
      "Adversarial verify", "Verify by running, not by asking", "Perspective-diverse verify", "Judge panel", "Loop-until-dry", "Multi-modal sweep", "Completeness critic", "No silent caps",
    ]);
    const description = await compactDescription();
    expect(patterns.filter(line => description.includes(line)), "no pattern line stays in the compact description").toEqual([]);
    expect(description, "the compact description names where the patterns are").toContain("docs/workflows.md");
    const docs = readFileSync(join(ROOT, "docs/workflows.md"), "utf8");
    const docLines = docs.split("\n");
    const at = docLines.flatMap((line, index) => (line === PATTERNS_HEADING ? [index] : []));
    expect(at.length, "docs/workflows.md has one Orchestration patterns heading").toBe(1);
    const next = docLines.findIndex((line, index) => index > (at[0] ?? 0) && line.startsWith("#"));
    const section = docLines.slice((at[0] ?? 0) + 1, next === -1 ? docLines.length : next);
    expect(patterns.filter(line => !section.includes(line)), "every pattern line, verbatim, in the Orchestration patterns section").toEqual([]);
    expect(docs, "the Recipes introduction no longer says the patterns live in exactly one place").not.toContain(ONE_PLACE);
  }, 60_000);

  it("R326-R1 README.md's toolDescriptionMode paragraph is the re-trued line, and no README line keeps the Agent-only wording", () => {
    const readme = readFileSync(join(ROOT, "README.md"), "utf8").split("\n");
    expect(readme.filter(line => line.startsWith(README_OPENING)), "the paragraph, exactly").toEqual([README_LINE]);
    expect(readme.filter(line => line.includes(AGENT_ONLY)), "no README line scopes the setting to the Agent description only").toEqual([]);
  });
});

// C0 sits at file scope, registered last and outside the describe, so a skip that reaches every pinned case still leaves C0 to read it.
it("C0 census over ROWS, registered last at file scope: the header's claims block is exactly the row sentences, each row's sentence cites exactly its pins, the case ids src/workflow/tool-description.ts spells are exactly that set, every other test vitest registered here is one pinned case that ran before C0 in run mode and not inverted, and the run pin's bytes are held", ({ task }) => {
  expect(ROWS.map(row => `${row.id}:${row.pins.length}`), "frozen shape (rule 16)").toEqual(["EAT-R326(1):2", "EAT-R326(2)-api:2", "EAT-R326(2)-caps:1", "EAT-R326(2)-example:1", "EAT-R326(2)-patterns:1", "EAT-R326(3):1"]);
  const header = claimsBlock(HEADER.split("\n"));
  expect(header.block, "the claims block is exactly the row sentences, line for line, in order").toEqual(ROWS.map(row => row.sentence));
  const claimLines = HEADER.split("\n").map(line => line.replace(/^ \* /, "")).filter(line => /\((?:R326-[A-Z]\d, )*R326-[A-Z]\d\)\.$/.test(line));
  expect(claimLines, "the header lines that end in a case citation and a period are exactly the row sentences, in order").toEqual(ROWS.map(row => row.sentence));
  expect(header.outside.flatMap(line => line.match(CASE_ID) ?? []), "outside the claims block the header names no case id").toEqual([]);
  for (const row of ROWS) expect(/\(([^()]+)\)\.$/.exec(row.sentence)?.[1].split(", "), `${row.id}'s sentence cites exactly its pins`).toEqual([...row.pins]);
  const pinned = ROWS.flatMap(row => row.pins).sort();
  const cited = new Set(readFileSync(join(ROOT, CITING_SRC), "utf8").match(CASE_ID) ?? []);
  expect([...cited].sort(), "the src comment cites exactly the pinned cases, so a case taken out of every literal here still reds").toEqual(pinned);
  const walked = registered(task.file.tasks, task);
  expect(walked.findIndex(entry => entry.self), "C0 finds itself by task identity, registered last").toBe(walked.length - 1);
  const others = walked.filter(entry => !entry.self);
  expect(others.map(entry => /^(R326-[A-Z]\d) /.exec(entry.name)?.[1] ?? `not a pinned case: ${entry.name}`).sort(), "every other registered test is one pinned case, and each pinned case is registered exactly once").toEqual(pinned);
  expect(others.filter(entry => !ranInRunMode(entry)).map(modeLine), "every pinned case is in run mode, not inverted, and ran before C0").toEqual([]);
  expect(createHash("sha256").update(readFileSync(join(ROOT, RUN_PIN))).digest("hex"), "the run pin's bytes, so it is never edited or deleted alone").toBe(RUN_PIN_SHA256);
  CENSUS_END.push("C0");
});

// The file-end judge: C0 ran to its last statement.
afterAll(() => {
  expect(CENSUS_END, "C0 ran to its last statement (a red C0 reds here too; C0 skipped at collection or at run time, inverted with a hollow body, returning before its end marker or deleted reds only here)").toEqual(["C0"]);
});
