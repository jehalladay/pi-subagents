/**
 * workbench-rf-workspace-binding.test.ts — wb-v30k (DX P10): EAT-R371 of the pi-system DX/UX/LX triage 2026-11-11 (claim
 * C226), "The RF provider binding MUST use the canonical configured workspace identity and invalidate that binding when the
 * effective workspace setting changes." Its three criteria, quoted:
 *  1. "Assert realpath-equivalent RF roots (canonical, symlink and trailing slash) return the same authorized workspace identity."
 *  2. "Assert editing reactivefiberWorkspaceRoot in the same session changes the next binding or explicitly refuses with a
 *     restart-required message before invoking the old root; never silently render the old workspace." (This cut takes the
 *     first branch: the next binding changes.)
 *  3. "Assert a genuinely contradictory producer workspace is refused and scope containment is not weakened by normalization."
 *
 * Every row drives the real extension: src/index.ts boots behind a validated claude-backend workbench block, the registered
 * SubagentWorkflow tool launches a script, and the script's node() call reaches its capability through registryFor
 * (reactivefiber.render.preview in every row but B3c, which reads forge.gate.status). The rf on PATH is a stand-in that appends
 * its argv to a log and answers with a full-shape envelope whose workspace.root is the realpath(3) of its --workspace argument
 * (fs.realpathSync.native) and whose workspace.id is derived from that realpath (or, where a row says so, names a fixed root or
 * refuses with RF_WORKSPACE_INVALID).
 *
 * PINNED READER SET (this file, case by case: the setting, what the case asserts, and the falsifier that turns it red). R is a
 * fresh directory spelled as its realpath; S is a second fresh directory beside it (the same parent).
 *  B1 (criterion 1): each of these settings spawns rf exactly once with --workspace R, and the run returns R as workspaceRoot
 *      and as workspace.root, with R's workspace id. B1a (control) R; B1b a final-component symlink to R; B1c R with one
 *      trailing slash; B1d a final-component symlink to R with one trailing slash; B1e <a symlink to R's parent>/<R's name>;
 *      B1f <R's parent>/./<R's name>; B1g <R's parent>//<R's name>; B1h <R's parent>/<S's name>/../<R's name>; B1i <a symlink
 *      to S>/../<R's name>; B1j a symlink to a final-component symlink to R; B1k a symlink whose target is R relative to the
 *      link's own directory.
 *      Falsifiers: binding the setting as written (B1b-B1k: the spelling is spawned and the provider's workspace.root pin
 *      refuses the realpath answer 'transport'); the gate's GM12, a final-component readlink after stripping trailing slashes
 *      (B1e-B1j); fs.realpathSync, which applies path.resolve before it reads a link (cut #1's call; B1i); readlinkSync without
 *      resolving a relative target (B1k).
 *  B2 (criterion 2, the rebind branch), each in one session: B2a the setting names A, is rewritten to B, then the key is
 *      removed: three runs spawn rf with --workspace A, B and the realpath project root, and each run returns the root it
 *      spawned. B2b no key, then the key names A: two runs spawn the realpath project root, then A. B2c the setting is a
 *      symlink to A, and between two runs that symlink is retargeted to B with the setting's text unchanged: the runs spawn A,
 *      then B, and each returns the root it spawned.
 *      Falsifiers: a registry bound once per scope (B2a-B2c: a later run spawns an earlier root); the gate's GM13, the rebind
 *      keyed by the setting's text instead of the RF root the registry was built with (B2c).
 *  B3 (criterion 3), each with the setting a final-component symlink to R: B3a a producer naming a third directory, B3b a
 *      producer naming the setting's symlink spelling, and B3d a producer naming R with one trailing slash are each refused
 *      'transport' with the provider's contradictory-envelope message after exactly one spawn; B3c (R outside the project)
 *      forge.gate.status reading the setting's symlink is refused 'authorization' with the forge scope message and no forge
 *      process starts.
 *      Falsifiers: dropping the provider's workspace.root pin (B3a, B3b, B3d); resolving the producer's root by realpath before
 *      the pin (B3b, B3d); stripping the producer root's trailing slash before the pin (B3d); binding forge (or every provider)
 *      to the canonical RF root (B3c).
 *  B4: each of these settings is bound as written, so rf is spawned exactly once with --workspace <the setting>. Settings whose
 *      realpath fails, with the stand-in answering RF_WORKSPACE_INVALID, which stays 'unavailable': B4a (control) a missing
 *      directory spelled with a trailing slash (ENOENT); B4c a path below a regular file (ENOTDIR); B4d a symlink to itself
 *      (ELOOP); B4e a missing directory whose name is 256 bytes long (ENAMETOOLONG); B4c, B4d and B4e also assert the code
 *      realpath(3) fails with. Symlinks whose realpath carries a character the setting validator refuses, with the stand-in
 *      answering that realpath, which the provider refuses 'transport': B4b 0x01; B4f DEL (0x7f).
 *      Falsifiers: throwing on the failed realpath (B4a, B4c, B4d, B4e); the gate's GM10, a catch that rethrows every
 *      non-ENOENT failure (B4c, B4d, B4e); a catch that rethrows every failure but ENOENT, ENOTDIR and ELOOP (B4e); rewriting
 *      the spelling (B4a: path.resolve strips the slash); binding every realpath (B4b, B4f); the gate's GM11, a guard testing
 *      only 0x00-0x1f instead of isCleanAbsolutePath (B4f).
 * NOT CLAIMED (scope sentences, not residuals): a spelling of the configured root other than B1a-B1k is NOT CLAIMED by this
 * census. A realpath failure other than ENOENT, ENOTDIR, ELOOP and ENAMETOOLONG (EACCES included) is NOT CLAIMED by this census.
 * A realpath other than the B1 rows' R (a fresh scratch directory) and the B4b and B4f targets is NOT CLAIMED by this census,
 * so a realpath carrying another C0 control character, or a character the setting validator admits that R does not carry, is
 * not claimed either. A setting change other than the B2a-B2c rewrites and retarget is NOT CLAIMED by this census. A producer
 * root other than the B3a, B3b and B3d ones is NOT CLAIMED by this census. The installed rf itself (the V6 tier), the RF calls
 * of a workflow invocation already running when the setting changes, the restart-required branch of criterion 2, the wording
 * of the setting in docs, workspace roots named by a capability input, a tool argument or an environment variable, and every
 * other provider's binding are NOT CLAIMED by this census.
 * Input-hygiene pins only: no security claim is made or tested here.
 */

import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, realpathSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
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

/** The code realpath(3) fails with for `path` (the precondition a B4c-B4e row names), or "resolved". */
function realpathFailure(path: string): string {
  try {
    realpathSync.native(path);
    return "resolved";
  } catch (error) {
    return (error as NodeJS.ErrnoException).code ?? "unknown";
  }
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
      'const root = answer.kind === "named" ? answer.root : fs.realpathSync.native(argv[argv.indexOf("--workspace") + 1]);',
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

describe("EAT-R371 criterion 1 (wb-v30k B1): each B1a-B1k spelling of the configured RF root R spawns rf with --workspace R and returns R's identity", () => {
  it("B1a (control): the realpath spelling spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: root });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1b: a final-component symlink spelling spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1c: the realpath spelled with one trailing slash spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${root}/` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1d: a final-component symlink spelled with one trailing slash spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${link}/` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);
  it("B1e: <a symlink to R's parent>/<R's name> spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const spelled = join(symlinkTo(dirname(root)), basename(root));
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: spelled });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1f: <R's parent>/./<R's name> spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${dirname(root)}/./${basename(root)}` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1g: <R's parent>//<R's name> spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${dirname(root)}//${basename(root)}` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1h: <R's parent>/<a sibling's name>/../<R's name> spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const sibling = directory("rf-binding-sibling-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${dirname(root)}/${basename(sibling)}/../${basename(root)}` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1i: <a symlink to a sibling>/../<R's name> spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const sibling = directory("rf-binding-sibling-");
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: `${symlinkTo(sibling)}/../${basename(root)}` });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1j: a symlink to a final-component symlink to R spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const chained = symlinkTo(symlinkTo(root));
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: chained });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);

  it("B1k: a symlink whose target is R relative to the link's directory spawns rf with --workspace <realpath> and returns the realpath identity", async () => {
    const root = directory("rf-binding-root-");
    const folder = directory("rf-binding-link-");
    const link = join(folder, "workspace");
    symlinkSync(relative(folder, root), link);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(root));
    expect(spawns(log).map(workspaceArg)).toEqual([root]);
  }, 120_000);
});

describe("EAT-R371 criterion 2 (wb-v30k B2): a rewritten setting (B2a, B2b) and a symlink setting retargeted under unchanged text (B2c) bind the next run in the same session", () => {
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
  it("B2c: a symlink setting retargeted from A to B between two runs, its text unchanged: the runs spawn rf with A, then B", async () => {
    const first = directory("rf-binding-first-");
    const second = directory("rf-binding-second-");
    const link = symlinkTo(first);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(first));
    unlinkSync(link);
    symlinkSync(second, link);
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(identity(second));
    expect(spawns(log).map(workspaceArg)).toEqual([first, second]);
  }, 180_000);
});

describe("EAT-R371 criterion 3 (wb-v30k B3): with a symlink setting, the B3a, B3b and B3d producer roots are refused 'transport' and forge.gate.status refuses the setting's symlink outside the project (B3c)", () => {
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
  it("B3d: with a symlink setting, a producer naming the realpath with one trailing slash is refused 'transport' after one spawn", async () => {
    const root = directory("rf-binding-root-");
    const link = symlinkTo(root);
    const log = standInRf({ kind: "named", root: `${root}/` });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(`rf:transport:${CONTRADICTORY}`);
    expect(spawns(log)).toHaveLength(1);
  }, 120_000);
});

describe("wb-v30k B4: the B4a-B4f settings (a realpath that fails with ENOENT, ENOTDIR, ELOOP or ENAMETOOLONG, or a realpath carrying 0x01 or DEL) are bound as written", () => {
  it("B4a (control): a missing directory spelled with a trailing slash reaches rf as written, and RF_WORKSPACE_INVALID stays 'unavailable'", async () => {
    const missing = `${join(directory("rf-binding-missing-"), "absent")}/`;
    const log = standInRf({ kind: "invalid" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: missing });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe("rf:unavailable:RF render refused: RF_WORKSPACE_INVALID");
    expect(spawns(log).map(workspaceArg)).toEqual([missing]);
  }, 120_000);

  it("B4b: a symlink whose realpath carries 0x01 is bound as written, and the realpath answer is refused 'transport'", async () => {
    const target = join(directory("rf-binding-control-"), `ctl${String.fromCodePoint(0x01)}dir`);
    mkdirSync(target);
    const link = symlinkTo(target);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(`rf:transport:${CONTRADICTORY}`);
    expect(spawns(log).map(workspaceArg)).toEqual([link]);
  }, 120_000);
  it("B4c: a setting below a regular file (realpath ENOTDIR) reaches rf as written, and RF_WORKSPACE_INVALID stays 'unavailable'", async () => {
    const file = join(directory("rf-binding-notdir-"), "file");
    writeFileSync(file, "x");
    const below = join(file, "sub");
    expect(realpathFailure(below)).toBe("ENOTDIR");
    const log = standInRf({ kind: "invalid" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: below });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe("rf:unavailable:RF render refused: RF_WORKSPACE_INVALID");
    expect(spawns(log).map(workspaceArg)).toEqual([below]);
  }, 120_000);

  it("B4d: a setting that is a symlink to itself (realpath ELOOP) reaches rf as written, and RF_WORKSPACE_INVALID stays 'unavailable'", async () => {
    const loop = join(directory("rf-binding-loop-"), "loop");
    symlinkSync(loop, loop);
    expect(realpathFailure(loop)).toBe("ELOOP");
    const log = standInRf({ kind: "invalid" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: loop });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe("rf:unavailable:RF render refused: RF_WORKSPACE_INVALID");
    expect(spawns(log).map(workspaceArg)).toEqual([loop]);
  }, 120_000);

  it("B4e: a missing directory with a 256-byte name (realpath ENAMETOOLONG) reaches rf as written, and RF_WORKSPACE_INVALID stays 'unavailable'", async () => {
    const overlong = join(directory("rf-binding-long-"), "n".repeat(256));
    expect(realpathFailure(overlong)).toBe("ENAMETOOLONG");
    const log = standInRf({ kind: "invalid" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: overlong });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe("rf:unavailable:RF render refused: RF_WORKSPACE_INVALID");
    expect(spawns(log).map(workspaceArg)).toEqual([overlong]);
  }, 120_000);

  it("B4f: a symlink whose realpath carries DEL (0x7f) is bound as written, and the realpath answer is refused 'transport'", async () => {
    const target = join(directory("rf-binding-del-"), `del${String.fromCodePoint(0x7f)}dir`);
    mkdirSync(target);
    const link = symlinkTo(target);
    const log = standInRf({ kind: "realpath" });
    const host = await bootHost({ capabilityGrants: RF_GRANTS, [KEY]: link });
    expect(await runWorkflow(host, RF_IDENTITY)).toBe(`rf:transport:${CONTRADICTORY}`);
    expect(spawns(log).map(workspaceArg)).toEqual([link]);
  }, 120_000);
});
