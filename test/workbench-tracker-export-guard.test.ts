/**
 * wb-294d (g10.24-K1): the pre-push size guard over the tracker export family of qa/workbench/tracker-export.mjs.
 *
 * Bead acceptance (1), quoted: "at FW_EXPORT_SOFT_CEILING bytes (default 95 MiB) the push path refuses rc 2 BEFORE any git push with ONE
 * typed line naming the blob path and byte size; selftest leg plants a scratch repo with an oversized tracked blob and asserts the typed
 * refusal". Owner shape element 4: the guard "covers the MAIN export AND each shard". The family judged is exactly .beads/issues.jsonl
 * and every blob under .beads/archive/; the objects judged are the ones a push of <tip> would send: `git rev-list --objects <tip>
 * --not <excluded...>`. The hook excludes each line's remote sha when this repository has that commit (G10) and every
 * remote-tracking ref of the remote it is called for (G11), so a blob the remote already holds is not judged again, and it prints one
 * typed line per oversized blob however many of its lines would push that blob (G12). A large blob outside the family is NOT
 * CLAIMED by this guard (G6 pins that boundary). Wiring the guard into the machine's collect and land-chain push paths lives outside
 * this repository; here the push path is git itself, through the hook (G7).
 * Every case runs in a throwaway repository from the scratch helper with an explicit child environment, with the ceiling lowered
 * through FW_EXPORT_SOFT_CEILING so no case writes a 95 MiB file.
 */
import { execFileSync, type SpawnSyncReturns, spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CEILING_ENV, DEFAULT_SOFT_CEILING, softCeiling } from "../qa/workbench/tracker-export.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const TOOL = join(process.cwd(), "qa", "workbench", "tracker-export.mjs");
const MAIN = ".beads/issues.jsonl";
const SHARD = ".beads/archive/issues-closed-2026-11.jsonl";

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) removeScratch(dir);
});

/** Explicit env for every child: nothing inherited, so no GIT_DIR / GIT_WORK_TREE / config of the test runner leaks. */
function childEnv(home: string, extra: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return {
    PATH: `${dirname(process.execPath)}:${process.env.PATH ?? ""}`,
    HOME: home,
    LC_ALL: "C",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_AUTHOR_NAME: "t",
    GIT_AUTHOR_EMAIL: "t@example.invalid",
    GIT_COMMITTER_NAME: "t",
    GIT_COMMITTER_EMAIL: "t@example.invalid",
    ...extra,
  };
}

interface Repo {
  readonly dir: string;
  readonly home: string;
  readonly remote: string;
  git(...args: string[]): string;
  /** Writes `files` (path -> byte count, filled with "x"), commits them, returns the commit sha. */
  commit(files: Readonly<Record<string, number>>, message: string): string;
  blobOf(rev: string, path: string): string;
  guard(args: readonly string[], ceiling?: string): SpawnSyncReturns<string>;
}

function makeRepo(): Repo {
  const root = makeScratch("tracker-export-guard-");
  scratches.push(root);
  const dir = join(root, "repo");
  const home = join(root, "home");
  const remote = join(root, "remote.git");
  mkdirSync(dir);
  mkdirSync(home);
  const env = childEnv(home);
  const git = (...args: string[]): string => execFileSync("git", args, { cwd: dir, env, encoding: "utf8" }).trim();
  git("init", "-q", "-b", "main");
  execFileSync("git", ["init", "--bare", "-q", remote], { env });
  git("remote", "add", "origin", remote);
  return {
    dir,
    home,
    remote,
    git,
    commit: (files, message) => {
      for (const [path, bytes] of Object.entries(files)) {
        mkdirSync(dirname(join(dir, path)), { recursive: true });
        writeFileSync(join(dir, path), "x".repeat(bytes));
        git("add", "--", path);
      }
      git("commit", "-q", "--allow-empty", "-m", message);
      return git("rev-parse", "HEAD");
    },
    blobOf: (rev, path) => git("rev-parse", `${rev}:${path}`),
    guard: (args, ceiling) => spawnSync(process.execPath, [TOOL, "guard", ...args], { cwd: dir, env: childEnv(home, ceiling === undefined ? {} : { [CEILING_ENV]: ceiling }), encoding: "utf8" }),
  };
}

/** The typed refusal line for one blob. */
const refusal = (path: string, blob: string, bytes: number, ceiling: number): string =>
  `tracker-export: REFUSED ${path} blob ${blob.slice(0, 12)} is ${bytes} bytes, at or over the soft ceiling of ${ceiling} bytes (${CEILING_ENV}); nothing is pushed`;

const stderrLines = (r: SpawnSyncReturns<string>): string[] => r.stderr.split("\n").filter(line => line.length > 0);

describe("wb-294d export-size guard: the soft ceiling", () => {
  it("G1 the default is 95 MiB = 99,614,720 bytes; a positive whole number in FW_EXPORT_SOFT_CEILING replaces it; zero, a negative, a fraction, a word, an exponent, a padded or zero-led number and one past 2^53 refuse (rc 3 at the CLI)", () => {
    expect(DEFAULT_SOFT_CEILING).toBe(99_614_720);
    expect(softCeiling({})).toEqual({ ok: true, bytes: 99_614_720 });
    expect(softCeiling({ [CEILING_ENV]: "" })).toEqual({ ok: true, bytes: 99_614_720 });
    expect(softCeiling({ [CEILING_ENV]: "4096" })).toEqual({ ok: true, bytes: 4096 });
    for (const bad of ["0", "-5", "1.5", "abc", "1e3", " 12", "012", "9007199254740993"]) {
      const result = softCeiling({ [CEILING_ENV]: bad });
      expect(result.ok, bad).toBe(false);
    }
    const repo = makeRepo();
    const tip = repo.commit({ [MAIN]: 10 }, "base");
    const r = repo.guard([tip], "ten");
    expect(r.status).toBe(3);
    expect(stderrLines(r)).toEqual([`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "ten"); nothing is pushed`]);
  });
});

describe("wb-294d export-size guard: the CLI a push path calls before git push", () => {
  it("G2 the main export AT the ceiling refuses rc 2 with exactly one typed line naming path, blob and bytes; one byte under passes rc 0 silently", () => {
    const repo = makeRepo();
    const tip = repo.commit({ [MAIN]: 300, "src/a.ts": 10 }, "export at 300 bytes");
    const at = repo.guard([tip], "300");
    expect(at.status).toBe(2);
    expect(stderrLines(at)).toEqual([refusal(MAIN, repo.blobOf(tip, MAIN), 300, 300)]);
    expect(at.stdout).toBe("");
    const under = repo.guard([tip], "301");
    expect(under.status).toBe(0);
    expect(under.stderr).toBe("");
    expect(under.stdout).toBe("");
  });

  it("G3 a shard under .beads/archive/ is judged like the main export: an oversized shard refuses, naming the shard's path", () => {
    const repo = makeRepo();
    const tip = repo.commit({ [MAIN]: 10, [SHARD]: 500 }, "a large shard");
    const r = repo.guard([tip], "400");
    expect(r.status).toBe(2);
    expect(stderrLines(r)).toEqual([refusal(SHARD, repo.blobOf(tip, SHARD), 500, 400)]);
  });

  it("G4 every oversized blob in the pushed range gets its own line - an intermediate commit's blob is caught though the tip shrank it", () => {
    const repo = makeRepo();
    const big = repo.commit({ [MAIN]: 900 }, "a big export");
    const tip = repo.commit({ [MAIN]: 20, [SHARD]: 700 }, "export shrunk, shard large");
    const r = repo.guard([tip], "600");
    expect(r.status).toBe(2);
    expect(stderrLines(r).sort()).toEqual([refusal(MAIN, repo.blobOf(big, MAIN), 900, 600), refusal(SHARD, repo.blobOf(tip, SHARD), 700, 600)].sort());
  });

  it("G5 objects reachable from a --not <rev> are not judged: an oversized export blob only an excluded commit holds passes", () => {
    const repo = makeRepo();
    const old = repo.commit({ [MAIN]: 900 }, "already on the remote");
    const tip = repo.commit({ "src/b.ts": 5 }, "a later commit that does not touch the export");
    expect(repo.guard([tip, "--not", old], "600").status).toBe(0);
    expect(repo.guard([tip], "600").status).toBe(2);
  });

  it("G6 NOT CLAIMED: a large blob outside the tracker export family is not judged by this guard", () => {
    const repo = makeRepo();
    const tip = repo.commit({ "media/large.bin": 5000, ".beads/interactions.jsonl": 5000, [MAIN]: 10 }, "large blobs outside the family");
    const r = repo.guard([tip], "600");
    expect(r.status).toBe(0);
    expect(r.stderr).toBe("");
  });

  it("G8 an unresolvable tip cannot be judged and refuses rc 3 (never passes open)", () => {
    const repo = makeRepo();
    repo.commit({ [MAIN]: 10 }, "base");
    const r = repo.guard(["0123456789abcdef0123456789abcdef01234567"], "600");
    expect(r.status).toBe(3);
    expect(stderrLines(r)).toHaveLength(1);
    expect(r.stderr).toContain("nothing is pushed");
  });
});

describe("wb-294d export-size guard as the git pre-push hook (the push itself never reaches the remote)", () => {
  function install(repo: Repo): void {
    const hook = join(repo.dir, ".git", "hooks", "pre-push");
    mkdirSync(dirname(hook), { recursive: true });
    writeFileSync(hook, `#!/bin/sh\nexec '${process.execPath}' '${TOOL}' pre-push "$@"\n`);
    chmodSync(hook, 0o755);
  }
  const push = (repo: Repo, ceiling: string): SpawnSyncReturns<string> =>
    spawnSync("git", ["push", "-q", "origin", "HEAD:refs/heads/main"], { cwd: repo.dir, env: childEnv(repo.home, { [CEILING_ENV]: ceiling }), encoding: "utf8" });
  const remoteHead = (repo: Repo): string | undefined => {
    const r = spawnSync("git", ["--git-dir", repo.remote, "rev-parse", "--verify", "-q", "refs/heads/main"], { env: childEnv(repo.home), encoding: "utf8" });
    return r.status === 0 ? r.stdout.trim() : undefined;
  };

  it("G7 an oversized export refuses the push with the typed line and the remote stays without the ref; under the ceiling the same push lands the commit unchanged", () => {
    const repo = makeRepo();
    install(repo);
    const tip = repo.commit({ [MAIN]: 800 }, "oversized export");
    const refused = push(repo, "700");
    expect(refused.status).not.toBe(0);
    expect(refused.stderr).toContain(refusal(MAIN, repo.blobOf(tip, MAIN), 800, 700));
    expect(remoteHead(repo)).toBeUndefined();
    const landed = push(repo, "801");
    expect(landed.status).toBe(0);
    expect(remoteHead(repo)).toBe(tip);
  });

  it("G9 the hook judges every stdin line, skips a deleted-ref line, refuses a malformed line rc 3, and judges past an unknown remote sha", () => {
    const repo = makeRepo();
    const base = repo.commit({ [MAIN]: 10 }, "base");
    const tip = repo.commit({ [SHARD]: 900 }, "large shard");
    const zeros = "0".repeat(40);
    const hook = (stdin: string): SpawnSyncReturns<string> =>
      spawnSync(process.execPath, [TOOL, "pre-push", "origin", repo.remote], { cwd: repo.dir, env: childEnv(repo.home, { [CEILING_ENV]: "600" }), input: stdin, encoding: "utf8" });
    expect(hook(`(delete) ${zeros} refs/heads/gone ${base}\n`).status).toBe(0);
    expect(hook(`refs/heads/main ${base} refs/heads/main ${zeros}\n`).status).toBe(0);
    const both = hook(`refs/heads/a ${base} refs/heads/a ${zeros}\nrefs/heads/b ${tip} refs/heads/b ${base}\n`);
    expect(both.status).toBe(2);
    expect(stderrLines(both)).toEqual([refusal(SHARD, repo.blobOf(tip, SHARD), 900, 600)]);
    expect(hook("refs/heads/main not-a-sha refs/heads/main\n").status).toBe(3);
    const unknownRemote = hook(`refs/heads/main ${tip} refs/heads/main ${"f".repeat(40)}\n`);
    expect(unknownRemote.status).toBe(2);
  });

  const hookIn = (repo: Repo, remote: string, stdin: string): SpawnSyncReturns<string> =>
    spawnSync(process.execPath, [TOOL, "pre-push", remote, repo.remote], { cwd: repo.dir, env: childEnv(repo.home, { [CEILING_ENV]: "600" }), input: stdin, encoding: "utf8" });

  it("G10 the hook excludes a line's remote sha that this repository has: an oversized export only that commit holds is not judged again, and the same push from a new ref is", () => {
    const repo = makeRepo();
    const old = repo.commit({ [MAIN]: 900 }, "an oversized export the remote already holds");
    const tip = repo.commit({ "src/b.ts": 5 }, "a later commit that does not touch the export");
    const known = hookIn(repo, "origin", `refs/heads/main ${tip} refs/heads/main ${old}\n`);
    expect(known.status).toBe(0);
    expect(known.stderr).toBe("");
    const fresh = hookIn(repo, "origin", `refs/heads/main ${tip} refs/heads/main ${"0".repeat(40)}\n`);
    expect(fresh.status).toBe(2);
    expect(stderrLines(fresh)).toEqual([refusal(MAIN, repo.blobOf(old, MAIN), 900, 600)]);
  });

  it("G11 the hook excludes every remote-tracking ref of the remote it is called for: a new branch over a commit origin already tracks passes, the same line for another remote does not", () => {
    const repo = makeRepo();
    const old = repo.commit({ [MAIN]: 900 }, "an oversized export origin already holds");
    const tip = repo.commit({ "src/b.ts": 5 }, "a later commit that does not touch the export");
    repo.git("update-ref", "refs/remotes/origin/main", old);
    const line = `refs/heads/feature ${tip} refs/heads/feature ${"0".repeat(40)}\n`;
    const tracked = hookIn(repo, "origin", line);
    expect(tracked.status).toBe(0);
    expect(tracked.stderr).toBe("");
    const other = hookIn(repo, "upstream", line);
    expect(other.status).toBe(2);
    expect(stderrLines(other)).toEqual([refusal(MAIN, repo.blobOf(old, MAIN), 900, 600)]);
  });

  it("G12 one typed line per oversized blob for the whole push: two ref lines that would both send one oversized shard print it once", () => {
    const repo = makeRepo();
    repo.commit({ [MAIN]: 10 }, "base");
    const tip = repo.commit({ [SHARD]: 900 }, "large shard");
    const zeros = "0".repeat(40);
    const r = hookIn(repo, "origin", `refs/heads/a ${tip} refs/heads/a ${zeros}\nrefs/heads/b ${tip} refs/heads/b ${zeros}\n`);
    expect(r.status).toBe(2);
    expect(stderrLines(r)).toEqual([refusal(SHARD, repo.blobOf(tip, SHARD), 900, 600)]);
  });
});
