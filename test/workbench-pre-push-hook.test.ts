/** wb-vic (W22-H pre-push wiring follow-up to wb-a9s F9): the pre-push HOOK script at its entry point.
 * Owner-ruled contract (verbatim on the bead): "the scan takes a COMMIT RANGE, and a pre-push hook reads
 * `<local ref> <local sha> <remote ref> <remote sha>` lines on stdin and scans remote..local (every commit, not the
 * tip; all commits when the remote sha is all zeros)".
 * Every case spawns the hook as a child with controlled stdin and an explicit env, in a throwaway repository from the
 * scratch helper. The offending message is built with String.fromCodePoint from the CLI's GUARD_CODE_POINTS, so this file
 * carries no raw guard point.
 */
import { execFileSync, type SpawnSyncReturns, spawnSync } from "node:child_process";
import { mkdirSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { GUARD_CODE_POINTS } from "../qa/workbench/commit-message-scan.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const HOOK = join(process.cwd(), "qa/workbench/pre-push-commit-message-scan.mjs");
const ZEROS = "0".repeat(40);
/** U+202E, the trojan-source display vector, taken from the CLI's own guard set. */
const GUARD = String.fromCodePoint(GUARD_CODE_POINTS.find((point) => point === 0x202e) ?? 0);

/** Explicit env for every child: nothing inherited, so no GIT_DIR / GIT_WORK_TREE / config of the test runner leaks. */
function childEnv(home: string): NodeJS.ProcessEnv {
  return {
    PATH: process.env.PATH,
    HOME: home,
    LC_ALL: "C",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_AUTHOR_NAME: "t",
    GIT_AUTHOR_EMAIL: "t@example.invalid",
    GIT_COMMITTER_NAME: "t",
    GIT_COMMITTER_EMAIL: "t@example.invalid",
  };
}

interface Fixture {
  readonly dir: string;
  readonly home: string;
  commit(message: string): string;
  hook(stdin: string, script?: string): SpawnSyncReturns<string>;
}

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) removeScratch(dir);
});

function makeFixture(): Fixture {
  const root = makeScratch("vic-hook-");
  scratches.push(root);
  const dir = join(root, "repo");
  const home = join(root, "home");
  mkdirSync(dir);
  mkdirSync(home);
  const env = childEnv(home);
  const git = (...args: string[]): string => execFileSync("git", args, { cwd: dir, env, encoding: "utf8" }).trim();
  git("init", "-q");
  return {
    dir,
    home,
    commit: (message) => {
      git("commit", "--allow-empty", "-q", "-m", message);
      return git("rev-parse", "HEAD");
    },
    hook: (stdin, script = HOOK) => spawnSync(process.execPath, [script], { cwd: dir, env, input: stdin, encoding: "utf8" }),
  };
}

/** One `<local ref> <local sha> <remote ref> <remote sha>` stdin line, as git writes it to a pre-push hook. */
const refLine = (localSha: string, remoteSha: string, ref = "refs/heads/main"): string => `${ref} ${localSha} ${ref} ${remoteSha}\n`;

describe("wb-vic pre-push hook: remote..local scan at the hook entry point", () => {
  it("R1 refuses a NON-TIP offender inside remote..local (an offending commit followed by a clean tip commit)", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const bad = fx.commit(`fix: bad${GUARD}message`);
    const tip = fx.commit("feat: clean tip");
    const r = fx.hook(refLine(tip, remote));
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(`${bad} line 1`);
    expect(r.stdout).toContain("U+202E");
    expect(r.stdout).not.toContain(`${tip} line`);
    expect(r.stdout).toContain("commit-message-scan: 2 commits, 1 offenders");
    expect(r.stdout).not.toContain(GUARD);
    expect(r.stderr).not.toContain(GUARD);
  });

  it("R2 scans ALL commits when the remote sha is all zeros (an offender at the root is caught)", () => {
    const fx = makeFixture();
    const root = fx.commit(`root${GUARD}commit`);
    fx.commit("middle commit");
    const tip = fx.commit("feat: clean tip");
    const r = fx.hook(refLine(tip, ZEROS));
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(`${root} line 1`);
    expect(r.stdout).toContain("commit-message-scan: 3 commits, 1 offenders");
  });

  it("R3 passes a clean push (exit 0) and says how many commits it scanned", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    fx.commit("fix: clean one");
    const tip = fx.commit("feat: clean two");
    const r = fx.hook(refLine(tip, remote));
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("commit-message-scan: 2 commits, 0 offenders");
  });

  it("R4 skips a deleted-ref line (local sha all zeros) without invoking the scan", () => {
    const fx = makeFixture();
    const remote = fx.commit(`old${GUARD}history`);
    const r = fx.hook(`(delete) ${ZEROS} refs/heads/gone ${remote}\n`);
    expect(r.status).toBe(0);
    expect(r.stdout).toBe("");
  });

  it("R4b a deleted-ref line beside a clean line still passes, and beside an offending line still refuses", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const clean = fx.commit("feat: clean tip");
    const del = `(delete) ${ZEROS} refs/heads/gone ${remote}\n`;
    expect(fx.hook(del + refLine(clean, remote)).status).toBe(0);
    const dirty = fx.commit(`feat: dirty${GUARD}tip`);
    expect(fx.hook(del + refLine(dirty, clean)).status).toBe(3);
  });

  it("R5 scans EVERY stdin line: a clean first ref does not hide an offending second ref", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const clean = fx.commit("feat: clean");
    const dirty = fx.commit(`feat: dirty${GUARD}`);
    const r = fx.hook(refLine(clean, remote, "refs/heads/a") + refLine(dirty, clean, "refs/heads/b"));
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(`${dirty} line 1`);
    expect(r.stderr).toContain("refs/heads/b");
    expect(r.stderr).not.toContain("refs/heads/a");
  });

  it("R5b reports EVERY offending ref, not just the first one it finds", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const first = fx.commit(`feat: first${GUARD}`);
    const second = fx.commit(`feat: second${GUARD}`);
    const r = fx.hook(refLine(first, remote, "refs/heads/a") + refLine(second, first, "refs/heads/b"));
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(`${first} line 1`);
    expect(r.stdout).toContain(`${second} line 1`);
    expect(r.stderr).toContain("refs/heads/a");
    expect(r.stderr).toContain("refs/heads/b");
  });

  it("R6 fails closed: an unresolvable remote sha, a malformed line and a non-hex sha each refuse (non-zero), never a silent pass", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const tip = fx.commit("feat: clean");
    const unknown = "1".repeat(40);
    expect(fx.hook(refLine(tip, unknown)).status).toBe(2);
    expect(fx.hook("refs/heads/main only-two-fields\n").status).toBe(2);
    expect(fx.hook(`refs/heads/main --not-a-sha refs/heads/main ${remote}\n`).status).toBe(2);
    const hostile = fx.hook(`refs/heads/${GUARD}x ${tip} refs/heads/main --upload-pack=x\n`);
    expect(hostile.status).toBe(2);
    expect(hostile.stderr).not.toContain(GUARD);
  });

  it("R7 an empty stdin (nothing to push) passes", () => {
    const fx = makeFixture();
    fx.commit("base commit");
    expect(fx.hook("").status).toBe(0);
  });

  it("R8 the documented install line (a symlink named pre-push in the git hooks dir) runs the hook and refuses", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    fx.commit(`fix: bad${GUARD}`);
    const tip = fx.commit("feat: clean tip");
    const hooksDir = execFileSync("git", ["rev-parse", "--git-path", "hooks"], { cwd: fx.dir, env: childEnv(fx.home), encoding: "utf8" }).trim();
    mkdirSync(join(fx.dir, hooksDir), { recursive: true });
    const installed = join(fx.dir, hooksDir, "pre-push");
    symlinkSync(HOOK, installed);
    const r = fx.hook(refLine(tip, remote), installed);
    expect(r.status).toBe(3);
    expect(r.stdout).toContain("commit-message-scan: 2 commits, 1 offenders");
  });
});
