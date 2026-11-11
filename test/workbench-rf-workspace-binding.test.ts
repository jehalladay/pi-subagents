/**
 * workbench-rf-workspace-binding.test.ts — wb-v30k (DX P10) cut #1: EAT-R371 of the pi-system DX/UX/LX triage 2026-11-11
 * (claim C226), "The RF provider binding MUST use the canonical configured workspace identity and invalidate that binding
 * when the effective workspace setting changes." Its three criteria, quoted:
 *  1. "Assert realpath-equivalent RF roots (canonical, symlink and trailing slash) return the same authorized workspace identity."
 *  2. "Assert editing reactivefiberWorkspaceRoot in the same session changes the next binding or explicitly refuses with a
 *     restart-required message before invoking the old root; never silently render the old workspace." (This cut takes the
 *     first branch: the next binding changes.)
 *  3. "Assert a genuinely contradictory producer workspace is refused and scope containment is not weakened by normalization."
 *
 * Every row drives the real extension: src/index.ts boots behind a validated claude-backend workbench block, the registered
 * SubagentWorkflow tool launches a script, and the script's node() call reaches reactivefiber.render.preview through
 * registryFor. The rf on PATH is a stand-in that appends its argv to a log and answers with a full-shape envelope whose
 * workspace.root is the realpath of its --workspace argument and whose workspace.id is derived from that realpath (or, where a
 * row says so, names a fixed root or refuses with RF_WORKSPACE_INVALID).
 *
 * PINNED (each case names the falsifier that turns it red):
 *  B1a-B1d  a configured root spelled as its realpath, through a symlink, with a trailing slash, and through a symlink with a
 *      trailing slash: rf is spawned once with --workspace <realpath>, and the run returns the realpath as workspaceRoot and as
 *      workspace.root, with the realpath's workspace id. Falsifier: binding the setting as written (B1b-B1d spawn the spelling
 *      and the provider's workspace.root pin refuses the realpath answer 'transport').
 *  B2a  in one session: the setting names A, then is rewritten to B, then the key is removed: three runs spawn rf with
 *      --workspace A, B and the realpath project root, and each run returns the root it spawned. Falsifier: a registry bound
 *      once per scope (the second and third runs spawn A again).
 *  B2b  in one session: no key, then the key names A: two runs spawn the realpath project root, then A. Falsifier: the same
 *      once-per-scope registry (the second run spawns the project root again).
 *  B3a  the setting is a symlink to R and the producer names a third directory: the run is refused 'transport' with the
 *      provider's contradictory-envelope message after exactly one spawn. Falsifier: dropping the provider's workspace.root pin.
 *  B3b  the setting is a symlink to R and the producer names that symlink spelling: refused 'transport' after one spawn.
 *      Falsifier: admitting the setting's spelling as a second name, or normalizing the producer's text before the pin.
 *  B3c  the setting is a symlink to a directory outside the project: forge.gate.status reading that symlink is refused
 *      'authorization' with the forge scope message and no forge process starts. Falsifier: binding forge (or every provider)
 *      to the canonical RF root.
 *  B4a  a configured root that does not resolve (a missing directory spelled with a trailing slash) is passed to rf as written,
 *      and rf's RF_WORKSPACE_INVALID stays 'unavailable' after one spawn. Falsifier: throwing on the failed realpath, or
 *      rewriting the spelling (path.resolve strips the slash).
 *  B4b  a symlink whose realpath carries a control character (a form the setting validator refuses) is bound as written: rf
 *      is spawned once with the symlink spelling and its realpath answer is refused 'transport'. Falsifier: binding every
 *      realpath (the run passes with the control-character root).
 * NOT CLAIMED: the installed rf itself (the V6 tier); the RF calls of a workflow invocation already running when the setting
 * changes; the restart-required branch of criterion 2; the wording of the setting in docs; workspace roots named by a capability
 * input, a tool argument or an environment variable; and every other provider's binding.
 * Input-hygiene pins only: no security claim is made or tested here.
 */

import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const KEY = "reactivefiberWorkspaceRoot";
const RF_GRANTS = ["reactivefiber:render"];
const CONTRADICTORY = "RF preview returned an unrecognized or contradictory envelope.";
const FORGE_OUTSIDE = "Forge read denied outside the authorized workspace scope.";
/** The script every RF row runs: the reading's bound root, the producer's root and id, or the refusal's category and text. */
const RF_IDENTITY =
  'try { const r = await node("reactivefiber.render.preview",{model:"model",task:"task"},{label:"rf"}); return ["rf:ok", r.workspaceRoot, r.source.workspace.root, r.source.workspace.id].join("|"); } catch (e) { return "rf:" + e.category + ":" + e.message; }';

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A fresh tracked directory, as its realpath. */
function directory(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}

/** A symlink (in its own tracked directory) that resolves to `target`. */
function symlinkTo(target: string): string {
  const link = join(directory("rf-binding-link-"), "workspace");
  symlinkSync(target, link);
  return link;
}

/** The workspace id the stand-in derives from a realpath. */
function workspaceIdOf(root: string): string {
  return `rfw_${createHash("sha256").update(root).digest("hex").slice(0, 26)}`;
}

/** What a passing RF run returns when rf rendered `root`. */
function identity(root: string): string {
  return ["rf:ok", root, root, workspaceIdOf(root)].join("|");
}

type Answer = { readonly kind: "realpath" } | { readonly kind: "named"; readonly root: string } | { readonly kind: "invalid" };

const INVALID_ENVELOPE = {
  schema: "reactive-fiber.cli/v1",
  ok: false,
  command: "context.render",
  operation_id: `rfo_${"a".repeat(22)}`,
  workspace: null,
  transaction_id: null,
  result: null,
  diagnostics: [{ code: "RF_WORKSPACE_INVALID", severity: "error", message: "workspace invalid", hint: null, source: "host", metadata: {} }],
};

/** Installs the stand-in rf first on PATH and returns its spawn log (one JSON argv line per spawn). */
function standInRf(answer: Answer): string {
  const folder = directory("rf-binding-standin-");
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      'const fs = require("node:fs");',
      'const crypto = require("node:crypto");',
      "const argv = process.argv.slice(2);",
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(argv) + "\\n");`,
      `const answer = ${JSON.stringify(answer)};`,
      `if (answer.kind === "invalid") { process.stdout.write(${JSON.stringify(JSON.stringify(INVALID_ENVELOPE))}); process.exit(3); }`,
      'const root = answer.kind === "named" ? answer.root : fs.realpathSync(argv[argv.indexOf("--workspace") + 1]);',
      `const envelope = JSON.parse(${JSON.stringify(JSON.stringify(fullShapeRf("/unset")))});`,
      'envelope.workspace = { id: "rfw_" + crypto.createHash("sha256").update(root).digest("hex").slice(0, 26), root };',
      "process.stdout.write(JSON.stringify(envelope));",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${process.env.PATH ?? ""}`;
  return log;
}

/** A forge stand-in first on PATH that records each spawn, so a refused read is seen to start no forge process. */
function standInForge(): string {
  const folder = directory("rf-binding-forge-");
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "forge");
  writeFileSync(script, `#!${process.execPath}\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.exit(1);\n`);
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${process.env.PATH ?? ""}`;
  return log;
}

function spawns(log: string): string[][] {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8")
    .trim()
    .split("\n")
    .map(line => JSON.parse(line) as string[]);
}

function workspaceArg(argv: readonly string[]): string | undefined {
  const at = argv.indexOf("--workspace");
  return at < 0 ? undefined : argv[at + 1];
}

function settingsWith(workbench: Record<string, unknown>): Record<string, unknown> {
  return { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", ...workbench } };
}

interface Host {
  readonly booted: ReturnType<typeof makePi>;
  readonly context: ReturnType<typeof ctx>;
  readonly projectRoot: string;
  readonly settingsFile: string;
}

/** Boot the real extension in claude mode over a hermetic project whose workbench block carries `workbench`. */
async function bootHost(workbench: Record<string, unknown>): Promise<Host> {
  sandbox = hermeticDir({ settings: settingsWith(workbench) });
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd: sandbox.dir });
  await booted.lifecycle.get("session_start")?.({}, context);
  return { booted, context, projectRoot: realpathSync(sandbox.dir), settingsFile: join(sandbox.dir, ".pi", "subagents.json") };
}

/** Rewrites the project's settings file in the same session (the operator editing .pi/subagents.json). */
function rewriteSettings(host: Host, workbench: Record<string, unknown>): void {
  writeFileSync(host.settingsFile, JSON.stringify(settingsWith(workbench)));
}

/** Launch one script through the registered SubagentWorkflow tool and return the completion notification's <result> text. */
async function runWorkflow(host: Host, body: string): Promise<string> {
  const script = `export const meta={name:"rf-workspace-binding",description:"local"}; ${body}`;
  const launched = await host.booted.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, host.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
  for (let i = 0; i < 9000; i++) {
    const sent = host.booted.pi.sendMessage.mock.calls.find(([item]: [unknown]) => JSON.stringify(item).includes(taskId));
    if (sent) {
      const content = String((sent[0] as { content?: unknown }).content);
      const result = /<result>([\s\S]*?)<\/result>/.exec(content);
      if (result?.[1] === undefined) throw new Error(`the completion notification carries no result: ${content.slice(0, 600)}`);
      return result[1];
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("workflow did not settle in the test window");
}

describe("EAT-R371 criterion 1 (wb-v30k B1): realpath-equivalent spellings of the configured RF root bind one workspace identity", () => {
  it("B1a (control): the realpath spelling spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: root });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1b: a symlink spelling spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1c: a trailing-slash spelling spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${root}/` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1d: a symlink spelling with a trailing slash spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${link}/` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);
});

describe("EAT-R371 criterion 2 (wb-v30k B2): an edited setting rebinds the next run in the same session", () => {
  it("B2a: A, then B, then the key removed: three runs spawn rf with A, B and the realpath project root", async () => {
    const first = directory("rf-binding-first-");
    const second = directory("rf-binding-second-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: first });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(first));
    rewriteSettings(host, { capabilityGrants: RF_GRANTS, [KEY]: second });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(second));
    rewriteSettings(host, { capabilityGrants: RF_GRANTS });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(host.projectRoot));
    expect(spawns(log).map(workspaceArg)).toEqual([first, second, host.projectRoot]);
  }, 180_000);

  it("B2b: no key, then the key names A: two runs spawn rf with the realpath project root, then A", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(host.projectRoot));
    rewriteSettings(host, { capabilityGrants: RF_GRANTS, [KEY]: root });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([host.projectRoot, root]);
  }, 180_000);
});

describe("EAT-R371 criterion 3 (wb-v30k B3): the canonical binding refuses a contradictory producer and keeps forge's scope", () => {
  it("B3a: with a symlink setting, a producer naming a third directory is refused 'transport' after one spawn", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const third = directory("rf-binding-third-");
    const log = standInRf({ kind: "named", root: third });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(`rf:transport:${CONTRADICTORY}`);
    expect(spawns(log)).toHaveLength(1);
  }, 120_000);

  it("B3b: with a symlink setting, a producer naming that symlink spelling is refused 'transport' after one spawn", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInRf({ kind: "named", root: link });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(`rf:transport:${CONTRADICTORY}`);
    expect(spawns(log)).toHaveLength(1);
  }, 120_000);

  it("B3c: with the setting a symlink to a directory outside the project, forge.gate.status reading it is refused 'authorization' and starts no forge", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInForge();
    const host = await bootHost({ capabilityGrants: ["forge:inspect", ...RF_GRANTS], [KEY]: link });
    const read = `try { await node("forge.gate.status",{target:${JSON.stringify(link)}},{label:"forge"}); return "forge:read"; } catch (e) { return "forge:" + e.category + ":" + e.message; }`;
    expect(await runWorkflow(host, read)).toBe(`forge:authorization:${FORGE_OUTSIDE}`);
    expect(spawns(log)).toEqual([]);
  }, 120_000);
});

describe("wb-v30k B4: a configured root whose realpath is not a validated form is bound as written", () => {
  it("B4a (control): a missing directory spelled with a trailing slash reaches rf as written, and RF_WORKSPACE_INVALID stays 'unavailable'", async () => {
    const missing = `${join(directory("rf-binding-missing-"), "absent")}/`;
    const log = standInRf({ kind: "invalid" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: missing });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe("rf:unavailable:RF render refused: RF_WORKSPACE_INVALID");
    expect(spawns(log).map(workspaceArg)).toEqual([missing]);
  }, 120_000);

  it("B4b: a symlink whose realpath carries a control character is bound as written, and the realpath answer is refused 'transport'", async () => {
    const target = join(directory("rf-binding-control-"), `ctl${String.fromCodePoint(0x01)}dir`);
    mkdirSync(target);
    const link = symlinkTo(target);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(`rf:transport:${CONTRADICTORY}`);
    expect(spawns(log).map(workspaceArg)).toEqual([link]);
  }, 120_000);
});
