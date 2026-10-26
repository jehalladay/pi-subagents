import { lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Options } from "@anthropic-ai/claude-agent-sdk";
import ts from "typescript";
import {afterEach,describe,expect,it} from "vitest";
import {loadSettings,type WorkbenchSettings} from "../src/settings.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createDetachedWorkflowHost, type DetachedHostRequest } from "../src/workbench/hosts/local-detached.js";
import { DETACHED_HOST_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import type { WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import {hermeticDir} from "./helpers/boot-extension.js";
import { docsSection, type RenderedBlock } from "./helpers/census.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

let sandbox:ReturnType<typeof hermeticDir>|undefined;
afterEach(()=>{sandbox?.restore();sandbox=undefined;});
it("pins finite Claude role provider allowlists without granting provider permission",()=>{
 sandbox=hermeticDir({settings:{workbench:{workflowAgentBackend:"claude",roles:{reviewer:{prompt:"Review",capabilities:["forge.gate.status"]}}}}});
 expect(loadSettings(sandbox.dir).workbench?.roles?.reviewer).toMatchObject({capabilities:["forge.gate.status"]});
 expect(loadSettings(sandbox.dir).workbench?.capabilityGrants).toBeUndefined();
});
it("rejects wildcard role capabilities",()=>{
 sandbox=hermeticDir({settings:{workbench:{workflowAgentBackend:"claude",roles:{reviewer:{prompt:"Review",capabilities:["*"]}}}}});
 expect(()=>loadSettings(sandbox!.dir)).toThrow(/roles|capabilities/);
});

// ---------------------------------------------------------------------------------------------
// wb-973.15 (SCG-R15): docs/workbench/19-worked-examples.md shows a Claude role configured as a swarm context graph
// worker. The cases below measure each sentence of that section through the settings loader and the REAL Claude hosts
// behind their documented SDK query fixture seam (FakeClaudeSdk: the SDK module is never mocked, no process is spawned,
// nothing touches the network). test/workbench-docs19-scg-worker-role.census.ts binds the section's sentences to the
// WORKER_SUITE cases by file, describe path and verbatim title; the NEGATIVES_SUITE cases are the bead's two negatives in
// force now ("Negative, in force now" in its acceptance), bound to no sentence.
// ---------------------------------------------------------------------------------------------
installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_FILE = "docs/workbench/19-worked-examples.md";
const DOCS_PARENT = "19 — Worked usage examples and expected outcomes";
const WORKER_SECTION = "Claude role as a swarm context graph worker";
const WORKER_SUITE = "wb-973.15 SCG-R15: the docs/19 swarm context graph worker role";
const NEGATIVES_SUITE = "wb-973.15 SCG-R15 negatives in force now";
/** Where rf install-skill --agent claude writes the skill (rf install-skill --list --json, rf 0.1.845, measured 2026-10-26). */
const INSTALLED_SKILL = "~/.claude/skills/rf";
/**
 * rf's top-level commands, measured with rf --json --version (cli 0.1.845: 79 leaves under 18 top-level commands,
 * 2026-10-26), less install-skill, the one command the page names. A rendered `rf <command>`, global flags allowed
 * before the command, is a recipe step.
 */
const RF_COMMANDS: readonly string[] = [
  "completion", "component", "config", "context", "doctor", "dolt", "graph", "inference", "init", "operation", "optic", "schema",
  "session", "state", "status", "storage", "view",
];
const RECIPE_STEP = new RegExp(`\\brf\\b(?:\\s+-\\S+(?:\\s+[^\\s-]\\S*)?)*\\s+(?:${RF_COMMANDS.join("|")})\\b`);
/** The four rf leaves the bead's negative names, in their spaced, dotted, hyphenated or underscored spellings. */
const NAMED_LEAF = /\b(?:graph[ ._-]impact|graph[ ._-]candidate|optic[ ._-]list|view[ ._-]list)\b/i;
const SERVED_WORD = /\bserv(?:ed|es|ing)\b/i;
/** Directories no repository walk below enters: dependencies, git internals and build or report output. */
const WALK_SKIP: ReadonlySet<string> = new Set(["node_modules", ".git", "dist", ".forge", "coverage"]);

const fakes: FakeClaudeSdk[] = [];
const plants: string[] = [];
afterEach(() => {
  for (const fake of fakes.splice(0)) fake.release();
  removeScratch(...plants.splice(0));
});

/** The worker section of docs/19 (the page read from its real path), refused loudly when absent or ambiguous. */
function workerSection(markdown = readFileSync(join(ROOT, DOCS_FILE), "utf8")): readonly RenderedBlock[] {
  const section = docsSection(markdown, WORKER_SECTION, 2, [DOCS_PARENT]);
  if (!section.ok) throw new Error(`${DOCS_FILE} § ${WORKER_SECTION}: ${section.why}`);
  return section.blocks;
}
/** What a reader sees of a block: a list's items joined, any other block's text. */
const shown = (block: RenderedBlock): string => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text);

/** The section's one JSON block, parsed: the `.pi/subagents.json` the page shows. */
function workerFile(): Record<string, unknown> {
  const code = workerSection().flatMap(block => (block.kind === "code" ? [block.text] : []));
  if (code.length !== 1) throw new Error(`${DOCS_FILE} § ${WORKER_SECTION} shows ${code.length} code blocks; it shows exactly one settings file`);
  const parsed: unknown = JSON.parse(code[0] ?? "");
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("the settings block is not a JSON object");
  return parsed as Record<string, unknown>;
}
/** The page's workbench object with `edit` applied to a copy, so a case can vary one key of the file the page shows. */
function editedFile(edit: (workbench: Record<string, unknown>) => void): Record<string, unknown> {
  const file = structuredClone(workerFile());
  const workbench = file.workbench;
  if (workbench === null || typeof workbench !== "object" || Array.isArray(workbench)) throw new Error("the settings block has no workbench object");
  edit(workbench as Record<string, unknown>);
  return file;
}
/** Loads a settings file through the real loader in a hermetic project; the top-level afterEach restores it. */
function loadWorkbench(file: Record<string, unknown>): WorkbenchSettings {
  // One hermetic project at a time: an earlier one is restored first, so the chdir/HOME chain unwinds in order.
  sandbox?.restore();
  sandbox = hermeticDir({ settings: file });
  const workbench = loadSettings(sandbox.dir).workbench;
  if (workbench === undefined) throw new Error("the settings file loaded no workbench settings");
  return workbench;
}
/** The one role the page's block declares, by name. */
function workerRole(workbench: WorkbenchSettings): { readonly name: string; readonly role: NonNullable<WorkbenchSettings["roles"]>[string] } {
  const names = Object.keys(workbench.roles ?? {});
  const [name] = names;
  const role = name === undefined ? undefined : workbench.roles?.[name];
  if (names.length !== 1 || name === undefined || role === undefined) throw new Error(`the block declares ${names.length} roles; the page shows exactly one`);
  return { name, role };
}
/** A fixture SDK whose every call completes at once, recorded so a case reads the Options the host handed it. */
function answeringSdk(): FakeClaudeSdk {
  const sdk = new FakeClaudeSdk({
    script: call => {
      call.push(...sdkSuccess(`sdk-${call.index}`, "done"));
      call.end();
    },
  });
  fakes.push(sdk);
  return sdk;
}
const spawnAs = (agentType: string): WorkflowSpawnRequest => ({ agentId: "wf-agent-0", index: 0, prompt: "Render the context of the bead.", label: "worker", agentType });
/** The registry the embedded host is handed, with the RF preview registered as on a real host, so an empty role is measured beside a provider it could reach. */
function providerRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("the worker-role cases never invoke the RF preview")), ROOT);
  return registry;
}
/**
 * One session of the embedded Claude host built from loaded workbench settings exactly as src/index.ts builds it
 * (settingSources ?? [], tools ?? [], roles, the provider registry, capabilityGrants ?? []), started as `agentType`;
 * returns the Options the host handed the SDK.
 */
async function embeddedSession(workbench: WorkbenchSettings, agentType: string): Promise<Options> {
  const sdk = answeringSdk();
  const host = createClaudeWorkflowHost({
    cwd: sandbox?.dir ?? ROOT,
    ...(workbench.model ? { model: workbench.model } : {}),
    ...(workbench.permissionMode ? { permissionMode: workbench.permissionMode } : {}),
    settingSources: workbench.settingSources ?? [],
    tools: workbench.tools ?? [],
    roles: workbench.roles,
    capabilities: providerRegistry(),
    grants: workbench.capabilityGrants ?? [],
    query: sdk.query,
  });
  const result = await host.spawnAgent(spawnAs(agentType));
  expect(result.ok, result.ok ? "" : result.error).toBe(true);
  expect(sdk.calls).toHaveLength(1);
  const [call] = sdk.calls;
  if (call === undefined) throw new Error("the host made no SDK query");
  return call.options;
}

/**
 * The initializer source of `key` in the object literal each call of a function named `callee` passes in `file`, read
 * from the AST (comments, strings and formatting never stand in for the call). It pins how src/index.ts wires the loaded
 * workbench settings into the embedded Claude host, whose `settings` is structuredClone(loadSettings(ctx.cwd).workbench)
 * under the claude backend (runWorkflowTask), so the sessions measured above are the sessions that file starts.
 */
function callObjectProperty(file: string, callee: string, key: string): string[] {
  const source = ts.createSourceFile(file, readFileSync(join(ROOT, file), "utf8"), ts.ScriptTarget.ES2022, true);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : ts.isIdentifier(node.expression) ? node.expression.text : "";
      const [argument] = node.arguments;
      if (name === callee && argument !== undefined && ts.isObjectLiteralExpression(argument)) {
        for (const property of argument.properties) {
          if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === key) found.push(property.initializer.getText(source));
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

/** Every regular file (or link) below `dir` of `base`, outside WALK_SKIP, as a sorted `/`-joined path; links are never entered. */
function filesBelow(base: string, dir = ""): string[] {
  const out: string[] = [];
  for (const name of readdirSync(join(base, dir)).sort()) {
    if (WALK_SKIP.has(name)) continue;
    const path = dir === "" ? name : `${dir}/${name}`;
    if (lstatSync(join(base, path)).isDirectory()) out.push(...filesBelow(base, path));
    else out.push(path);
  }
  return out;
}
/** The YAML front matter of a markdown text, or "" when it has none. */
const frontMatter = (text: string): string => /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
/** Why a path below `base` is a copy of the rf skill, or undefined: an rf directory under a skills directory, the recipe file, or a SKILL.md whose front matter names rf. */
function skillCopy(base: string, path: string): string | undefined {
  const parts = path.toLowerCase().split("/");
  if (parts.some((part, index) => part === "skills" && parts[index + 1] === "rf")) return "an rf directory under a skills directory";
  const name = parts.at(-1) ?? "";
  if (name === "swarm-integration.md") return "the swarm recipe file";
  if (name === "skill.md" && /^name:\s*["']?rf["']?\s*$/m.test(frontMatter(readFileSync(join(base, path), "utf8")))) return "a SKILL.md whose front matter names rf";
  return undefined;
}
/** Every rf skill copy below `base`, as `<path>: <why>`. */
const skillCopies = (base: string): string[] =>
  filesBelow(base).flatMap(path => {
    const why = skillCopy(base, path);
    return why === undefined ? [] : [`${path}: ${why}`];
  });
/** A line that starts a markdown block of its own: a list item, a heading, a table row, a quote or a fence. */
const BLOCK_START = /^\s*(?:[-*+]\s|\d+[.)]\s|#{1,6}\s|\||>|```)/;
/**
 * The sentences of a text: each paragraph, list item, table row, heading or fence line with its continuation lines joined
 * (a wrapped sentence stays whole, two list items never merge), split after `.`, `!` or `?` that whitespace follows.
 */
function sentencesIn(text: string): string[] {
  const units: string[] = [];
  let current = "";
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "" || BLOCK_START.test(line) || current === "") {
      if (current !== "") units.push(current);
      current = trimmed;
    } else current = `${current} ${trimmed}`;
  }
  if (current !== "") units.push(current);
  return units.flatMap(unit => unit.split(/(?<=[.!?])\s+/)).filter(sentence => sentence !== "");
}
/** Every sentence of every file below `dir` that names one of the four leaves and a served word, as `<path>: <sentence>`. */
const servedLeafSentences = (base: string, dir: string): string[] =>
  filesBelow(base, dir).flatMap(path =>
    sentencesIn(readFileSync(join(base, path), "utf8")).filter(sentence => NAMED_LEAF.test(sentence) && SERVED_WORD.test(sentence)).map(sentence => `${path}: ${sentence}`),
  );
function plantFile(base: string, path: string, text: string): void {
  mkdirSync(dirname(join(base, path)), { recursive: true });
  writeFileSync(join(base, path), text);
}
function plantRoot(prefix: string): string {
  const base = makeScratch(prefix);
  plants.push(base);
  return base;
}

describe(WORKER_SUITE, () => {
  it("SCG-R15 R1: the page's block declares exactly one Claude role, whose tools carry Bash and whose prompt names the installed rf skill and SWARM_RF_WORKSPACE", () => {
    const workbench = loadWorkbench(workerFile());
    expect(workbench.workflowAgentBackend).toBe("claude");
    const { role } = workerRole(workbench);
    expect(role.tools).toContain("Bash");
    expect(role.prompt).toContain(INSTALLED_SKILL);
    expect(role.prompt).toContain("SWARM_RF_WORKSPACE");
  });

  it("SCG-R15 R3a: the section names the installed skill's location and restates no recipe step: no rendered rf command beyond rf install-skill", () => {
    const texts = workerSection().map(shown);
    expect(texts.join(" ")).toContain(INSTALLED_SKILL);
    expect(texts.join(" ")).toContain("rf install-skill");
    expect(texts.filter(text => RECIPE_STEP.test(text))).toEqual([]);
    // The step reader is live: each served step of the swarm recipe reads as a step, the page's own rf words do not.
    const steps = ["rf init --backend jsonl --no-input --json", "rf context render --model m --task t --json", "rf graph candidate create --scope private --json", "rf --json context explain rfr_x", "rf --workspace /srv/rf context replay rfr_x"];
    expect(steps.filter(step => !RECIPE_STEP.test(step))).toEqual([]);
    const quiet = ["runs rf through its shell tool", "rf install-skill --agent claude writes the skill", "the installed rf skill", "every rf command"];
    expect(quiet.filter(text => RECIPE_STEP.test(text))).toEqual([]);
  });

  it("SCG-R15 R3b: the repository tracks no copy of the rf skill: no rf directory under a skills directory, no recipe file and no SKILL.md naming rf", () => {
    expect(skillCopies(ROOT)).toEqual([]);
    // The walk read the repository: the tracked beads skill is seen and judged quiet.
    expect(filesBelow(ROOT)).toContain(".agents/skills/beads/SKILL.md");
    expect(skillCopy(ROOT, ".agents/skills/beads/SKILL.md")).toBeUndefined();
    // The same walk and judge flag each copy shape planted in scratch, and only those.
    const base = plantRoot("scg-r15-skill-copy-");
    plantFile(base, "a/.claude/skills/rf/references/commands.md", "# commands\n");
    plantFile(base, "docs/swarm-integration.md", "# swarm\n");
    plantFile(base, "b/SKILL.md", "---\nname: rf\ndescription: x\n---\n# rf\n");
    plantFile(base, "c/skills/beads/SKILL.md", "---\nname: beads\n---\n# beads\n");
    plantFile(base, "node_modules/x/skills/rf/SKILL.md", "---\nname: rf\n---\n");
    expect(skillCopies(base)).toEqual([
      "a/.claude/skills/rf/references/commands.md: an rf directory under a skills directory",
      "b/SKILL.md: a SKILL.md whose front matter names rf",
      "docs/swarm-integration.md: the swarm recipe file",
    ]);
  });

  it("SCG-R15 R4a: Pi loads the page's .pi/subagents.json as written, settingSources a workbench key", () => {
    const file = workerFile();
    const workbench = loadWorkbench(file);
    expect(workbench).toStrictEqual(file.workbench);
    expect(workbench.settingSources).toEqual(["user"]);
  });

  it("SCG-R15 R4b: a role that declares settingSources itself is refused, never read", () => {
    const file = editedFile(workbench => {
      const roles = workbench.roles as Record<string, Record<string, unknown>>;
      for (const role of Object.values(roles)) role.settingSources = ["user"];
    });
    expect(() => loadWorkbench(file)).toThrow(/workbench\.roles\.[\w-]+ must declare prompt with optional tools\/capabilities\/model\/effort\./);
  });

  it("SCG-R15 R5: the Claude host passes every session the configured settingSources, the page's user, and [] when the key is absent", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name } = workerRole(workbench);
    expect((await embeddedSession(workbench, name)).settingSources).toEqual(["user"]);
    expect((await embeddedSession(workbench, "general-purpose")).settingSources).toEqual(["user"]);
    const without = loadWorkbench(editedFile(file => { Reflect.deleteProperty(file, "settingSources"); }));
    expect(without.settingSources).toBeUndefined();
    expect((await embeddedSession(without, name)).settingSources).toEqual([]);
    // The embedded host is built from the loaded settings this way, its one call site in src/index.ts.
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "settingSources")).toEqual(["settings.settingSources ?? []"]);
  });

  it("SCG-R15 R6: the installed Agent SDK documents user as the global ~/.claude/settings.json source and [] as disabling filesystem settings", () => {
    const pinned = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as { dependencies: Record<string, string> };
    const installed = JSON.parse(readFileSync(join(ROOT, "node_modules/@anthropic-ai/claude-agent-sdk/package.json"), "utf8")) as { version: string };
    expect(installed.version).toBe(pinned.dependencies["@anthropic-ai/claude-agent-sdk"]);
    const types = readFileSync(join(ROOT, "node_modules/@anthropic-ai/claude-agent-sdk/sdk.d.ts"), "utf8");
    expect(types).toContain("- `'user'` - Global user settings (`~/.claude/settings.json`)");
    expect(types).toContain("Pass `[]` to disable filesystem settings (SDK isolation mode).");
    expect(types).toContain("export declare type SettingSource = 'user' | 'project' | 'local';");
  });

  it("SCG-R15 R7: the role's tools replace the workbench-wide tools for its sessions, so Bash reaches the worker", async () => {
    const workbench = loadWorkbench(editedFile(file => { file.tools = ["Read", "Grep"]; }));
    const { name, role } = workerRole(workbench);
    const options = await embeddedSession(workbench, name);
    expect(options.tools).toEqual(role.tools);
    expect(options.tools).toContain("Bash");
    // A session outside the role keeps the workbench-wide list, so the role's list is a replacement, not a merge.
    expect((await embeddedSession(workbench, "general-purpose")).tools).toEqual(["Read", "Grep"]);
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "tools")).toEqual(["settings.tools ?? []"]);
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "roles")).toEqual(["settings.roles"]);
  });

  it("SCG-R15 R8: the role declares no capabilities, so its sessions expose no Pi provider tool and the file needs no capability grant", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name, role } = workerRole(workbench);
    expect(role.capabilities).toBeUndefined();
    expect(workbench.capabilityGrants).toBeUndefined();
    const options = await embeddedSession(workbench, name);
    expect(options.mcpServers).toBeUndefined();
    expect(options.allowedTools).toBeUndefined();
    // The same registry does expose the provider to a role that names it, so the empty role is what withholds it.
    const named = loadWorkbench(editedFile(file => {
      const roles = file.roles as Record<string, Record<string, unknown>>;
      for (const entry of Object.values(roles)) entry.capabilities = ["reactivefiber.render.preview"];
    }));
    expect(Object.keys((await embeddedSession(named, name)).mcpServers ?? {})).toEqual(["workbench"]);
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "grants")).toEqual(["settings.capabilityGrants ?? []"]);
  });

  it("SCG-R15 R9: the role adds no environment of its own: its sessions get no env override, the detached allowlist carries RF_WORKSPACE and SWARM_RF_WORKSPACE, and a role env is refused", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name } = workerRole(workbench);
    expect(Object.hasOwn(await embeddedSession(workbench, name), "env")).toBe(false);
    expect(DETACHED_HOST_ENV_ALLOWLIST).toEqual(expect.arrayContaining(["RF_WORKSPACE", "SWARM_RF_WORKSPACE"]));
    const withEnv = editedFile(file => {
      const roles = file.roles as Record<string, Record<string, unknown>>;
      for (const entry of Object.values(roles)) entry.env = { SWARM_RF_WORKSPACE: "/srv/swarm/rf" };
    });
    expect(() => loadWorkbench(withEnv)).toThrow(/workbench\.roles\.[\w-]+ must declare prompt with optional tools\/capabilities\/model\/effort\./);
  });

  it("SCG-R15 R10: the detached host starts its Claude sessions with settingSources [] whatever reaches it", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name, role } = workerRole(workbench);
    const sdk = answeringSdk();
    // The documented fixture seam (ClaudeWorkflowHostOptions.query) and a user source ride the request's claude object,
    // which createDetachedWorkflowHost spreads into the Claude host before its own settingSources: the production child
    // admits only model/tools/roles there (validateRequest), so this is the one way a case reaches that line.
    const claude = { tools: role.tools ?? [], roles: workbench.roles, settingSources: ["user"], query: sdk.query };
    const request: DetachedHostRequest = {
      backend: "claude", cwd: sandbox?.dir ?? ROOT, invocationId: "scg-r15-detached", providers: [],
      grants: ["claude:invoke", ...(role.tools ?? []).map(tool => `claude:tool:${tool}`)], claude,
    };
    const host = createDetachedWorkflowHost({ request, registry: new CapabilityRegistry(), principal: { id: "local-operator", role: "local-operator" }, signal: new AbortController().signal, beforeDispatch: () => {} });
    const result = await host.spawnAgent(spawnAs(name));
    expect(result.ok, result.ok ? "" : result.error).toBe(true);
    expect(sdk.calls.map(call => call.options.settingSources)).toEqual([[]]);
  });
});

describe(NEGATIVES_SUITE, () => {
  it("SCG-R15 negative: no docs/workbench sentence lists graph impact, graph candidate, optic list or view list as served", () => {
    expect(servedLeafSentences(ROOT, "docs/workbench")).toEqual([]);
    // The reader is live on the real pages: a receipt that names a leaf is read, and quiet.
    const named = filesBelow(ROOT, "docs/workbench").filter(path => sentencesIn(readFileSync(join(ROOT, path), "utf8")).some(sentence => NAMED_LEAF.test(sentence)));
    expect(named).toContain("docs/workbench/receipts/wb-a9l2.8.md");
    const base = plantRoot("scg-r15-served-leaf-");
    plantFile(base, "docs/a.md", "The rf graph impact leaf is served.\n");
    plantFile(base, "docs/b.md", "Here graph.candidate.create\nis served by this build.\n");
    plantFile(base, "docs/c.md", "The view list leaf serves rows. Optic-list serving is next.\n");
    plantFile(base, "docs/d.md", "rf graph impact refuses with RF_USAGE_NOT_IMPLEMENTED. The preview is served. Leaf graph.impact: reads.\n");
    expect(servedLeafSentences(base, "docs")).toEqual([
      "docs/a.md: The rf graph impact leaf is served.",
      "docs/b.md: Here graph.candidate.create is served by this build.",
      "docs/c.md: The view list leaf serves rows.",
      "docs/c.md: Optic-list serving is next.",
    ]);
  });
});
