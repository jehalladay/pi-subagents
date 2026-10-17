/**
 * wb-e37 qa leg (E37QALEGTOKEN): qa/workbench/scratch.mjs, the guarded scratch helper of the plain-node qa runners.
 * test/helpers/scratch.ts registers its guard through vitest's afterAll and reads encodeCwd from src/, so a .mjs runner
 * cannot load it; the runner-side twin must keep its semantics with node builtins only: encodeCwd byte for byte with
 * src/output-file.ts, removal of a directory AND every session tree keyed by it, removed paths still audited, and a
 * guard that names each survivor and turns a runner's clean exit into exit 1 - when the event loop drains, on
 * process.exit() and on an uncaught error. The guard rows drive it through an injected exit target; the runner rows
 * spawn real node processes with TMPDIR pinned to a tracked scratch directory.
 */
import { spawnSync } from "node:child_process";
import { EventEmitter } from "node:events";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import * as qa from "../qa/workbench/scratch.mjs";
import { encodeCwd } from "../src/output-file.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELPER = join(ROOT, "qa/workbench/scratch.mjs");
const uid = process.getuid?.() ?? 0;
const holders: string[] = [];
const savedTmpdir = process.env.TMPDIR;

/** A tracked holder for one row; when `pinTmpdir`, this process's TMPDIR points into it until the row ends. */
function holder(pinTmpdir = false): { root: string; tmp: string } {
  const root = makeScratch("qa-scratch-helper-");
  holders.push(root);
  const tmp = join(root, "tmp");
  mkdirSync(tmp);
  if (pinTmpdir) process.env.TMPDIR = tmp;
  return { root, tmp };
}

afterEach(() => {
  if (savedTmpdir === undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = savedTmpdir;
  removeScratch(...holders.splice(0));
});

/** A stand-in for the process: the guard listens on it and sets its exitCode. */
class ExitTarget extends EventEmitter {
  exitCode: number | undefined = undefined;
}
const settled = (): Promise<void> => new Promise(resolve => setTimeout(resolve, qa.SCRATCH_SETTLE_MS + 100));

describe("qa/workbench/scratch.mjs: the runner-side guarded scratch helper (wb-e37 qa leg)", () => {
  it("imports node builtins only, so a plain-node runner can load it (no vitest, no src/)", () => {
    const source = readFileSync(HELPER, "utf8");
    const specifiers = [...source.matchAll(/^import\s[^;]*?from\s+'([^']+)';$/gm)].map(match => match[1]);
    expect(specifiers).toEqual(["node:fs", "node:os", "node:path"]);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
  });

  it("mirrors src/output-file.ts encodeCwd byte for byte", () => {
    const corpus = ["/tmp/a/b", "/", "", "relative/dir", "C:\\Users\\dev\\proj", "c:/x/y", "\\\\server\\share\\x", "//double//slash", "/trailing/", "a\\b/c", "/caf\u00e9/d\u00efr", "-leading", "--x/y"];
    expect(corpus.map(cwd => qa.encodeCwd(cwd))).toEqual(corpus.map(cwd => encodeCwd(cwd)));
  });

  it("allocates under tmpdir() and removes the directory with every session tree keyed by it or a cwd beneath it, and nothing else", () => {
    const { tmp } = holder(true);
    const dir = qa.makeScratch("qa-a-");
    expect(dir.startsWith(join(tmp, "qa-a-"))).toBe(true);
    const root = qa.sessionScratchRoot();
    expect(root).toBe(join(tmp, `pi-subagents-${uid}`));
    const own = [encodeCwd(dir), `${encodeCwd(dir)}-session`, encodeCwd(join(dir, "nested"))].map(name => join(root, name));
    const other = join(root, encodeCwd(join(tmp, "qa-b-unrelated")));
    for (const path of [...own, other]) mkdirSync(path, { recursive: true });
    expect(qa.sessionScratchFor(dir).sort()).toEqual([...own].sort());
    qa.removeScratch(dir);
    expect([dir, ...own].filter(path => existsSync(path))).toEqual([]);
    expect(existsSync(other)).toBe(true);
    expect(qa.drainLeaks()).toEqual([]);
  });

  it("trackScratch registers a directory made elsewhere, so removeScratch and the leak audit reach it", () => {
    const { tmp } = holder(true);
    const made = join(tmp, "made-by-the-code-under-test");
    mkdirSync(made);
    expect(qa.trackScratch(made)).toBe(made);
    expect(qa.drainLeaks()).toEqual([made]);
    expect(existsSync(made)).toBe(false);
  });

  it("names a survivor once the event loop drains, removes it and turns a clean exit into exit 1", async () => {
    holder(true);
    const target = new ExitTarget();
    const reports: string[] = [];
    qa.installScratchLeakGuard({ target, report: text => reports.push(text) });
    const leaked = qa.makeScratch("qa-leak-");
    target.emit("beforeExit");
    expect(reports).toEqual([]);
    await settled();
    expect(reports).toHaveLength(1);
    expect(reports[0]).toContain(leaked);
    expect(target.exitCode).toBe(1);
    expect(existsSync(leaked)).toBe(false);
    target.emit("exit");
    expect(reports).toHaveLength(1);
  });

  it("reports nothing for a clean run and keeps a failing exit code the runner already set", async () => {
    holder(true);
    const clean = new ExitTarget();
    const cleanReports: string[] = [];
    qa.installScratchLeakGuard({ target: clean, report: text => cleanReports.push(text) });
    qa.removeScratch(qa.makeScratch("qa-clean-"));
    clean.emit("beforeExit");
    await settled();
    expect({ reports: cleanReports, exitCode: clean.exitCode }).toEqual({ reports: [], exitCode: undefined });
    const failing = new ExitTarget();
    failing.exitCode = 3;
    qa.installScratchLeakGuard({ target: failing, report: () => {} });
    qa.makeScratch("qa-failing-");
    failing.emit("exit");
    expect(failing.exitCode).toBe(3);
  });

  it("audits at once on exit, and names a path re-created after its removal", () => {
    holder(true);
    const target = new ExitTarget();
    const reports: string[] = [];
    qa.installScratchLeakGuard({ target, report: text => reports.push(text) });
    const dir = qa.makeScratch("qa-recreated-");
    qa.removeScratch(dir);
    mkdirSync(dir);
    target.emit("exit");
    expect(reports).toHaveLength(1);
    expect(reports[0]).toContain(dir);
    expect(target.exitCode).toBe(1);
    expect(existsSync(dir)).toBe(false);
  });
});

describe("a plain-node runner composed on qa/workbench/scratch.mjs (spawned)", () => {
  const runner = (body: string): string =>
    [
      'import { mkdirSync } from "node:fs";',
      `import { installScratchLeakGuard, makeScratch, removeScratch } from ${JSON.stringify(pathToFileURL(HELPER).href)};`,
      "installScratchLeakGuard();",
      'const dir = makeScratch("qa-run-");',
      "process.stdout.write(dir);",
      body,
      "",
    ].join("\n");

  it.each([
    ["exits 1 naming a directory it never removed", "", 1],
    ["exits 0 when it removes its scratch", "removeScratch(dir);", 0],
    ["exits 1 when it calls process.exit(0) with scratch left", "process.exit(0);", 1],
    ["exits 1 naming the scratch when it dies on an uncaught error", 'throw new Error("runner failed (fixture)");', 1],
    ["exits 1 naming a directory re-created after its removal", "removeScratch(dir);\nsetTimeout(() => mkdirSync(dir), 20);", 1],
  ])("%s", (_shape, body, status) => {
    const { root, tmp } = holder();
    const script = join(root, "runner.mjs");
    writeFileSync(script, runner(body));
    const run = spawnSync(process.execPath, [script], { encoding: "utf8", env: { ...process.env, TMPDIR: tmp }, timeout: 30_000 });
    const dir = run.stdout;
    expect(dir.startsWith(join(tmp, "qa-run-"))).toBe(true);
    expect(run.status).toBe(status);
    if (status === 0) expect(run.stderr).not.toContain("scratch leaked");
    else expect(run.stderr).toContain(`scratch leaked under ${tmp} (1):\n  ${dir}`);
    expect(readdirSync(tmp).filter(name => name.startsWith("qa-run-"))).toEqual([]);
  });
});
