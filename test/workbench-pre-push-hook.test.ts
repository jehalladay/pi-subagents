/** wb-vic (W22-H pre-push wiring follow-up to wb-a9s F9): the pre-push HOOK script at its entry point.
 * Owner-ruled contract (verbatim on the bead): "the scan takes a COMMIT RANGE, and a pre-push hook reads
 * `<local ref> <local sha> <remote ref> <remote sha>` lines on stdin and scans remote..local (every commit, not the
 * tip; all commits when the remote sha is all zeros)".
 * Every case spawns the hook as a child with controlled stdin and an explicit env, in a throwaway repository from the
 * scratch helper. The offending message is built with String.fromCodePoint from the CLI's GUARD_CODE_POINTS, so this file
 * carries no raw guard point.
 */
import { execFileSync, type SpawnSyncReturns, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { GUARD_CODE_POINTS } from "../qa/workbench/commit-message-scan.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const HOOK = join(process.cwd(), "qa/workbench/pre-push-commit-message-scan.mjs");
const ZEROS = "0".repeat(40);
/** U+202E RIGHT-TO-LEFT OVERRIDE, a guard-set point, taken from the CLI's own guard set. */
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
  readonly root: string;
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
    root,
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

const DOCS_17 = "docs/workbench/17-packaging-and-operations.md";
const INSTALL_HEADING = "## Pre-push commit-message scan (per-clone install)";
const SCAN_FILES = ["qa/workbench/pre-push-commit-message-scan.mjs", "qa/workbench/commit-message-scan.mjs"];

/** The shell block under the install heading in docs/17, exactly as a reader would paste it. */
function documentedInstallBlock(): string {
  const doc = readFileSync(join(process.cwd(), DOCS_17), "utf8");
  const section = doc.slice(doc.indexOf(INSTALL_HEADING) + INSTALL_HEADING.length);
  const match = /```sh\n([\s\S]*?)\n```/.exec(section.slice(0, section.indexOf("\n## ") >= 0 ? section.indexOf("\n## ") : undefined));
  return match?.[1] ?? "";
}

interface Pushable {
  readonly pkg: string;
  readonly remote: string;
  push(): SpawnSyncReturns<string>;
  remoteHas(ref: string): boolean;
}

/**
 * Install the DOCUMENTED line into a fixture repository, from a scratch copy of the scan files under `pkgName` (so the install
 * target can be removed without touching the real package, and the clone path can carry characters sh treats specially), and
 * wire a bare scratch remote to push to through real `git push`.
 */
function installDocumented(fx: Fixture, pkgName = "pkg"): Pushable {
  const pkg = join(fx.root, pkgName);
  const remote = join(fx.root, "remote.git");
  for (const file of SCAN_FILES) {
    mkdirSync(join(pkg, dirname(file)), { recursive: true });
    copyFileSync(join(process.cwd(), file), join(pkg, file));
  }
  const env = { ...childEnv(fx.home), PATH: `${dirname(process.execPath)}:${process.env.PATH ?? ""}` };
  execFileSync("git", ["init", "--bare", "-q", remote], { env });
  const gitDir = join(fx.dir, ".git");
  mkdirSync(join(gitDir, "hooks"), { recursive: true });
  const block = documentedInstallBlock();
  expect(block, "the install heading in docs/17 carries a sh block").not.toBe("");
  execFileSync("sh", ["-c", block], { cwd: pkg, env: { ...env, GIT_DIR: gitDir } });
  return {
    pkg,
    remote,
    push: () => spawnSync("git", ["push", "-q", remote, "HEAD:refs/heads/main"], { cwd: fx.dir, env, encoding: "utf8" }),
    remoteHas: (ref) => spawnSync("git", ["--git-dir", remote, "rev-parse", "--verify", "-q", ref], { env, encoding: "utf8" }).status === 0,
  };
}

/** U+0085 NEXT LINE, a C1 control unit that is not an ASCII line break. */
const NEXT_LINE = String.fromCodePoint(0x85);

/** Every unit of `text` outside printable ASCII (a line feed is allowed), as code point labels. */
function nonPrintableAscii(text: string): string[] {
  return [...text].filter((ch) => ch !== "\n" && (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) > 0x7e)).map((ch) => `U+${(ch.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`);
}

interface HeadSnapshot {
  readonly head: string;
  readonly count: string;
}

/** HEAD sha and commit count of the repository `git` resolves from `cwd` under `env` (an inherited GIT_DIR wins over cwd). */
function snapshotHead(cwd: string, env: NodeJS.ProcessEnv): HeadSnapshot {
  const run = (...args: string[]): string => {
    const r = spawnSync("git", args, { cwd, env, encoding: "utf8" });
    return `${r.status}:${r.stdout.trim()}`;
  };
  return { head: run("rev-parse", "HEAD"), count: run("rev-list", "--count", "HEAD") };
}

/** The repository the test runner itself sits in (or inherited through GIT_DIR), captured at collection time, before any row runs. */
const OUTER_BEFORE = snapshotHead(process.cwd(), process.env);

/** A scratch repository with one commit, standing in for a repository the fixture must never write into. */
function makeSentinel(): { readonly dir: string; readonly env: NodeJS.ProcessEnv } {
  const root = makeScratch("vic-sentinel-");
  scratches.push(root);
  const dir = join(root, "sentinel");
  const home = join(root, "home");
  mkdirSync(dir);
  mkdirSync(home);
  const env = childEnv(home);
  execFileSync("git", ["init", "-q"], { cwd: dir, env });
  execFileSync("git", ["commit", "--allow-empty", "-q", "-m", "sentinel base"], { cwd: dir, env });
  return { dir, env };
}

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
    const nonHexRemote = fx.hook(`refs/heads/${GUARD}x ${tip} refs/heads/main --upload-pack=x\n`);
    expect(nonHexRemote.status).toBe(2);
    expect(nonHexRemote.stderr).not.toContain(GUARD);
  });

  it("R6b (wb-vic row-428 F3) the refusal line says why: an unresolvable remote sha refuses (2) saying its commits could not be scanned, never that offenders are listed above; an offender keeps the listed-above line", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const tip = fx.commit("feat: clean");
    const r = fx.hook(refLine(tip, "1".repeat(40)));
    expect(r.status).toBe(2);
    expect(r.stderr).not.toContain("offending commits are listed above");
    expect(r.stderr).toMatch(/could not be scanned|nothing was scanned/);
    expect(r.stderr).toContain("push of refs/heads/main refused; its commits could not be scanned (scan exit 2)");
    const dirty = fx.commit(`feat: dirty${GUARD}`);
    const offender = fx.hook(refLine(dirty, remote));
    expect(offender.status).toBe(3);
    expect(offender.stderr).toContain("push of refs/heads/main refused (scan exit 3); offending commits are listed above");
  });

  it("R7 an empty stdin (nothing to push) passes", () => {
    const fx = makeFixture();
    fx.commit("base commit");
    expect(fx.hook("").status).toBe(0);
  });

  it("R8 a symlink named pre-push in the git hooks dir (not an install form: the entry guard resolves the link) runs the hook and refuses", () => {
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

  it("R8b (wb-vic row-428 F1) the hook's entry-guard comment and docs/17 present the wrapper as the only install form (anti-revert wording pin)", () => {
    const retired = /alternative to the wrapper install|supported way to place the hook/;
    expect(readFileSync(HOOK, "utf8")).not.toMatch(retired);
    expect(readFileSync(join(process.cwd(), DOCS_17), "utf8")).not.toMatch(retired);
  });

  it("O1a an inherited GIT_DIR / GIT_WORK_TREE never lets the fixture or the hook write into that repository (sentinel HEAD and commit count unchanged)", () => {
    const sentinel = makeSentinel();
    const before = snapshotHead(sentinel.dir, sentinel.env);
    expect(before.count).toBe("0:1");
    const saved = { GIT_DIR: process.env.GIT_DIR, GIT_WORK_TREE: process.env.GIT_WORK_TREE };
    process.env.GIT_DIR = join(sentinel.dir, ".git");
    process.env.GIT_WORK_TREE = sentinel.dir;
    let status: number | null = null;
    try {
      const fx = makeFixture();
      const remote = fx.commit("base commit");
      fx.commit(`fix: bad${GUARD}message`);
      const tip = fx.commit("feat: clean tip");
      status = fx.hook(refLine(tip, remote)).status;
    } finally {
      for (const [name, value] of Object.entries(saved)) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
    expect(snapshotHead(sentinel.dir, sentinel.env)).toEqual(before);
    expect(status).toBe(3);
  });

  it("R9 the documented wrapper install, run by a real git push, refuses a NON-TIP offender and the remote receives nothing", () => {
    const fx = makeFixture();
    fx.commit("base commit");
    const bad = fx.commit(`fix: bad${GUARD}message`);
    fx.commit("feat: clean tip");
    const pushable = installDocumented(fx);
    const r = pushable.push();
    expect(r.status).not.toBe(0);
    expect(r.stdout + r.stderr).toContain(`${bad} line 1`);
    expect(pushable.remoteHas("refs/heads/main")).toBe(false);
  });

  it("R9b the same install lets a clean push through (the wrapper really runs the scan, and the ref arrives)", () => {
    const fx = makeFixture();
    fx.commit("base commit");
    const tip = fx.commit("feat: clean tip");
    const pushable = installDocumented(fx);
    const r = pushable.push();
    expect(r.status).toBe(0);
    expect(r.stdout + r.stderr).toContain("commit-message-scan: 2 commits, 0 offenders");
    expect(pushable.remoteHas(`${tip}^{commit}`)).toBe(true);
    expect(pushable.remoteHas("refs/heads/main")).toBe(true);
  });

  it("R9c a MISSING hook target fails the push closed: the install is moved away after it was made and the remote still receives nothing", () => {
    const fx = makeFixture();
    fx.commit("base commit");
    fx.commit("feat: clean tip");
    const pushable = installDocumented(fx);
    rmSync(join(pushable.pkg, "qa"), { recursive: true });
    const r = pushable.push();
    expect(r.status).not.toBe(0);
    expect(pushable.remoteHas("refs/heads/main")).toBe(false);
  });

  for (const [label, name] of [
    ["a double quote and a dollar sign", 'pk"g$X'],
    ["a backtick", "pk`g"],
    ["an apostrophe (the '\\'' escape in the documented printf)", "it's"],
  ] as const) {
    it(`R9d (wb-vic row-428 F2) the documented install quotes the clone path for sh: a package dir with ${label} still runs the scan and lets a clean push through`, () => {
      const fx = makeFixture();
      fx.commit("base commit");
      const tip = fx.commit("feat: clean tip");
      const pushable = installDocumented(fx, name);
      const r = pushable.push();
      expect(r.status).toBe(0);
      expect(r.stdout + r.stderr).toContain("commit-message-scan: 2 commits, 0 offenders");
      expect(pushable.remoteHas(`${tip}^{commit}`)).toBe(true);
      expect(pushable.remoteHas("refs/heads/main")).toBe(true);
    });
  }

  it("U2 a valid push line whose LOCAL REF carries U+202E and U+0085 refuses (3) and echoes the ref as printable ASCII only", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    fx.commit(`fix: bad${GUARD}message`);
    const tip = fx.commit("feat: clean tip");
    const r = fx.hook(`refs/heads/x${GUARD}y${NEXT_LINE}z ${tip} refs/heads/main ${remote}\n`);
    expect(r.status).toBe(3);
    expect(r.stderr).toContain("push of refs/heads/x?y?z refused");
    expect(nonPrintableAscii(r.stdout)).toEqual([]);
    expect(nonPrintableAscii(r.stderr)).toEqual([]);
  });

  it("U3 a sha that is not 40 or 64 hex digits (HEAD, which the scan CLI would resolve) is refused as malformed before the CLI runs", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const tip = fx.commit("feat: clean tip");
    for (const line of [`refs/heads/main ${tip} refs/heads/main HEAD\n`, `refs/heads/main HEAD refs/heads/main ${remote}\n`]) {
      const r = fx.hook(line);
      expect(r.status).toBe(2);
      expect(r.stderr).toContain("malformed ref line refused");
      expect(r.stdout).not.toContain("commit-message-scan:");
    }
  });

  it("U4 exit precedence: an offender (3) outranks an unscannable line (2) in either order, for a malformed line and an unresolvable sha", () => {
    const fx = makeFixture();
    const remote = fx.commit("base commit");
    const dirty = fx.commit(`feat: dirty${GUARD}tip`);
    const offending = refLine(dirty, remote, "refs/heads/bad");
    const unscannable = ["refs/heads/main only-two-fields\n", refLine(dirty, "1".repeat(40), "refs/heads/unknown")];
    for (const line of unscannable) {
      expect(fx.hook(line).status).toBe(2);
      expect(fx.hook(line + offending).status).toBe(3);
      expect(fx.hook(offending + line).status).toBe(3);
    }
  });

  it("O1b the OUTER repository (the runner's own HEAD, or the one an inherited GIT_DIR names) has the same HEAD and commit count after every row above", () => {
    expect(snapshotHead(process.cwd(), process.env)).toEqual(OUTER_BEFORE);
  });
});
