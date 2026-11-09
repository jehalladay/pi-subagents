/**
 * wb-294d (g10.24-K1): the pre-push size guard over the tracker export family of qa/workbench/tracker-export.mjs.
 *
 * Bead acceptance (1), quoted: "at FW_EXPORT_SOFT_CEILING bytes (default 95 MiB) the push path refuses rc 2 BEFORE any git push with
 * ONE typed line naming the blob path and byte size; selftest leg plants a scratch repo with an oversized tracked blob and asserts the
 * typed refusal". Owner shape element 4: the guard "covers the MAIN export AND each shard". The family judged is every blob a pushed
 * commit writes to .beads/issues.jsonl or below .beads/archive/ (G2-G4; a merge's own write, G18), whatever other path also holds it
 * (G17); the objects judged are the ones a push of <tip> would send: `git rev-list --objects <tip> --not <excluded...>` (G5, G19). The
 * hook judges the push of the local sha of each line that pushes on these stdins G9 plants - the base commit's line alone, its two
 * lines at once, its line alone whose remote sha, forty f's, this repository lacks, its line alone of the root commit G9 builds, whose
 * sha begins and ends with 0 and is not all zeros, and its line that pushes the oversized shard before its deleted-ref line of forty
 * zeros and after it - and G9's deleted-ref lines of forty zeros and of sixty-four, each alone on stdin with the base commit
 * as the remote sha, exit 0 (G9); G9's three deleted-ref lines of three fields with forty zeros, of forty zeros beside a remote sha
 * one digit short, and of sixty-four zeros beside an upper-case remote sha are malformed (G9). On each stdin G10 plants it excludes
 * the line's remote sha when this repository has it as a commit - the local sha's parent, the root commit G10 builds as the local
 * sha's parent, whose sha begins and ends with 0, and the remote's commit beside the local sha, both children of one base commit (a
 * push that is not a fast-forward, its local side writing no family blob) - but not the remote sha G10 plants naming the export's
 * blob or its commit's tree (G10), and it excludes the remote-tracking ref G11 plants for the remote it is called for (G11), so a
 * blob reachable from an excluded commit is not judged, and one typed line is printed per oversized blob however many of the hook's
 * lines (G12) or family paths (G14)
 * would send it. A large blob outside the family is NOT CLAIMED by this guard (G6 and G16 pin that boundary: other paths, and a tree
 * object below .beads/archive/). G13's push the hook cannot judge, of a local sha this repository lacks, exits 3 unless G13's judged
 * push of the oversized shard beside it refuses at the ceiling, which exits 2 (G13); the usage errors and unknown verbs G15 plants
 * exit 3 with their usage line (G15). Wiring the guard into the machine's collect and land-chain
 * push paths lives outside this repository; here the push path is git itself, through the hook (G7).
 * Every case runs in a throwaway repository from the scratch helper with an explicit child environment, with the ceiling lowered
 * through FW_EXPORT_SOFT_CEILING - or, where G1 plants an empty and an absent value and at G15's usage errors, left at the default
 * over a 10-byte export - so no case writes a 95 MiB file.
 */
import { execFileSync, type SpawnSyncReturns, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
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

/** A sha that begins and ends with 0 and is not all zeros: the form a test of the deleted ref's all-zeros sha must tell apart from it. */
const ZERO_LED = /^0[0-9a-f]{38}0$/;

/**
 * wb-xkto (refusal #4 of wb-137f, U1: GP45-01): writes a ROOT commit of `repo`'s index whose sha has the ZERO_LED form and returns its
 * sha; HEAD is not moved. The commit object is built here under a fixed author and committer stamp, a counter in its message ground
 * until the sha1 of the object, computed here, has that form; git hash-object -w writes it and must return the same sha. With no parent
 * and a fixed tree the commit is the same on every run, so the plant never depends on the run's clock (refusal #4 U1: the suite's
 * other commit shas change from run to run).
 */
function zeroLedRootCommit(repo: Repo, message: string): string {
  const tree = repo.git("write-tree");
  for (let counter = 0; counter < 1_000_000; counter += 1) {
    const body = `tree ${tree}\nauthor t <t@example.invalid> 1793750400 +0000\ncommitter t <t@example.invalid> 1793750400 +0000\n\n${message} ${counter}\n`;
    const sha = createHash("sha1").update(`commit ${Buffer.byteLength(body)}\0${body}`).digest("hex");
    if (!ZERO_LED.test(sha)) continue;
    const written = execFileSync("git", ["hash-object", "-t", "commit", "-w", "--stdin"], { cwd: repo.dir, env: childEnv(repo.home), input: body, encoding: "utf8" }).trim();
    expect(written, "git's sha of the commit object built here").toBe(sha);
    return sha;
  }
  throw new Error("no commit sha of the ZERO_LED form within the counter's range");
}

// wb-eiwp: G1 grew by its guard-CLI plants; the describe carries the pre-push describe's bound.
describe("wb-294d export-size guard: the soft ceiling", { timeout: 120_000 }, () => {
  it("G1 the default is 95 MiB = 99,614,720 bytes; a positive whole number in FW_EXPORT_SOFT_CEILING replaces it, 2^53 - 1 the largest; zero, a negative, a fraction, a word, an exponent, a padded or zero-led number, 2^53 and one past 2^53 refuse (rc 3 at guard and, for the word 'ten', at pre-push here; compact's is the compaction suite's K8); an empty and an absent value are taken at guard and at pre-push, the 10-byte export passing rc 0 with nothing printed", () => {
    expect(DEFAULT_SOFT_CEILING).toBe(99_614_720);
    expect(softCeiling({})).toEqual({ ok: true, bytes: 99_614_720 });
    expect(softCeiling({ [CEILING_ENV]: "" })).toEqual({ ok: true, bytes: 99_614_720 });
    expect(softCeiling({ [CEILING_ENV]: "4096" })).toEqual({ ok: true, bytes: 4096 });
    // wb-137f refusal #3 U6 (GP1-07): 2^53 - 1 is the largest ceiling; 2^53 refuses like 2^53 + 1.
    expect(softCeiling({ [CEILING_ENV]: "9007199254740991" })).toEqual({ ok: true, bytes: Number.MAX_SAFE_INTEGER });
    // wb-eiwp: '+12' (a plus sign) and '12 ' (padded at its end) join the list.
    const bads = ["0", "-5", "+12", "1.5", "abc", "1e3", " 12", "12 ", "012", "9007199254740992", "9007199254740993"];
    for (const bad of bads) {
      const result = softCeiling({ [CEILING_ENV]: bad });
      expect(result.ok, bad).toBe(false);
    }
    const repo = makeRepo();
    const tip = repo.commit({ [MAIN]: 10 }, "base");
    const r = repo.guard([tip], "ten");
    expect(r.status).toBe(3);
    expect(stderrLines(r)).toEqual([`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "ten"); nothing is pushed`]);
    // wb-eiwp (F2 of wb-xkto's landing 1041: GX10-09 trimmed the value at the guard CLI only): each value the loop above refuses at
    // softCeiling() is planted at the guard CLI too - rc 3, the typed line naming the value, nothing on stdout - and 2^53 - 1 there
    // is taken: the 10-byte export under it passes rc 0 silently.
    for (const bad of bads) {
      const refused = repo.guard([tip], bad);
      expect(refused.status, bad).toBe(3);
      expect(stderrLines(refused), bad).toEqual([`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "${bad}"); nothing is pushed`]);
      expect(refused.stdout, bad).toBe("");
    }
    const largest = repo.guard([tip], "9007199254740991");
    expect(largest.status).toBe(0);
    expect(largest.stderr).toBe("");
    expect(largest.stdout).toBe("");
    const hook = spawnSync(process.execPath, [TOOL, "pre-push", "origin", repo.remote], { cwd: repo.dir, env: childEnv(repo.home, { [CEILING_ENV]: "ten" }), input: `refs/heads/main ${tip} refs/heads/main ${"0".repeat(40)}\n`, encoding: "utf8" });
    expect(hook.status).toBe(3);
    expect(stderrLines(hook)).toEqual([`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "ten"); nothing is pushed`]);
    expect(hook.stdout).toBe("");
    // wb-fflk (F1 of wb-eiwp's landing 1051: GQ-04 and GQ-07 survived there): an empty and an absent FW_EXPORT_SOFT_CEILING are
    // taken, not refused, at the guard CLI and at the pre-push hook - the 10-byte export under the default passes at each rc 0 with
    // nothing on stderr or stdout. Which ceiling applies there is NOT CLAIMED (the default's would need a 99,614,720-byte blob).
    const taken = (run: SpawnSyncReturns<string>, label: string): void => {
      expect(run.status, label).toBe(0);
      expect(run.stderr, label).toBe("");
      expect(run.stdout, label).toBe("");
    };
    const hookUnder = (extra: NodeJS.ProcessEnv): SpawnSyncReturns<string> =>
      spawnSync(process.execPath, [TOOL, "pre-push", "origin", repo.remote], { cwd: repo.dir, env: childEnv(repo.home, extra), input: `refs/heads/main ${tip} refs/heads/main ${"0".repeat(40)}\n`, encoding: "utf8" });
    taken(repo.guard([tip], ""), "guard, an empty value");
    taken(repo.guard([tip]), "guard, an absent value");
    taken(hookUnder({ [CEILING_ENV]: "" }), "pre-push, an empty value");
    taken(hookUnder({}), "pre-push, an absent value");
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

  it("G4 every oversized blob in the pushed range gets its own line - an intermediate commit's blob is caught though the tip shrank it, and two commits that write two different oversized blobs to one path - of two sizes, and of one size - print two lines, one per blob", () => {
    const repo = makeRepo();
    const big = repo.commit({ [MAIN]: 900 }, "a big export");
    const tip = repo.commit({ [MAIN]: 20, [SHARD]: 700 }, "export shrunk, shard large");
    const r = repo.guard([tip], "600");
    expect(r.status).toBe(2);
    expect(stderrLines(r).sort()).toEqual([refusal(MAIN, repo.blobOf(big, MAIN), 900, 600), refusal(SHARD, repo.blobOf(tip, SHARD), 700, 600)].sort());
    // wb-137f refusal #3 U5 (GP1-10): two oversized blobs, each written to .beads/issues.jsonl by its own commit.
    const twice = makeRepo();
    const one = twice.commit({ [MAIN]: 900 }, "one oversized export");
    const two = twice.commit({ [MAIN]: 901 }, "another oversized export at the same path");
    expect(twice.blobOf(two, MAIN)).not.toBe(twice.blobOf(one, MAIN));
    const both = twice.guard([two], "600");
    expect(both.status).toBe(2);
    expect(stderrLines(both).sort()).toEqual([refusal(MAIN, twice.blobOf(one, MAIN), 900, 600), refusal(MAIN, twice.blobOf(two, MAIN), 901, 600)].sort());
    // The same, two blobs of one size: 900 bytes of x, then 900 bytes of y.
    const sized = makeRepo();
    const xs = sized.commit({ [MAIN]: 900 }, "an oversized export of x");
    writeFileSync(join(sized.dir, MAIN), "y".repeat(900));
    sized.git("add", "--", MAIN);
    sized.git("commit", "-q", "-m", "an oversized export of y, of the same size");
    const ys = sized.git("rev-parse", "HEAD");
    expect(sized.blobOf(ys, MAIN)).not.toBe(sized.blobOf(xs, MAIN));
    const equal = sized.guard([ys], "600");
    expect(equal.status).toBe(2);
    expect(stderrLines(equal).sort()).toEqual([refusal(MAIN, sized.blobOf(xs, MAIN), 900, 600), refusal(MAIN, sized.blobOf(ys, MAIN), 900, 600)].sort());
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

  it("G16 the family is the repository paths .beads/issues.jsonl and .beads/archive/*, blobs only: another directory's .beads/issues.jsonl, .beads/issues.jsonl.bak, .beads/archive-old/, a file named .beads/archive and a tree object below .beads/archive/ larger than the ceiling are not judged", () => {
    const repo = makeRepo();
    const smallFiles = Object.fromEntries(Array.from({ length: 40 }, (_, index) => [`.beads/archive/sub/f${String(index).padStart(3, "0")}`, 1]));
    // Distinct sizes, so each path holds its own blob (one blob would be listed once, by one of its paths).
    const tip = repo.commit({ "sub/.beads/issues.jsonl": 5000, ".beads/issues.jsonl.bak": 5001, ".beads/archive-old/issues-closed-2026-11.jsonl": 5002, ...smallFiles, [MAIN]: 10 }, "outside the family");
    const tree = repo.git("rev-parse", `${tip}:.beads/archive/sub`);
    expect(Number(repo.git("cat-file", "-s", tree))).toBeGreaterThan(600);
    const r = repo.guard([tip], "600");
    expect(r.status).toBe(0);
    expect(r.stderr).toBe("");
    const fileRepo = makeRepo();
    const fileTip = fileRepo.commit({ ".beads/archive": 5003, [MAIN]: 10 }, "a file named .beads/archive");
    const file = fileRepo.guard([fileTip], "600");
    expect(file.status).toBe(0);
    expect(file.stderr).toBe("");
  });

  it("G17 SHARED BLOB: an oversized export whose bytes another path also holds - one the object listing meets first - is judged by the family path a pushed commit writes it to", () => {
    const repo = makeRepo();
    const tip = repo.commit({ ".beads/archive-old/copy.jsonl": 900, [MAIN]: 900 }, "the export's bytes at a path the listing meets first");
    const blob = repo.blobOf(tip, MAIN);
    expect(repo.blobOf(tip, ".beads/archive-old/copy.jsonl")).toBe(blob);
    expect(repo.git("rev-list", "--objects", tip).split("\n").filter(line => line.startsWith(`${blob} `))).toEqual([`${blob} .beads/archive-old/copy.jsonl`]);
    const r = repo.guard([tip], "600");
    expect(r.status).toBe(2);
    expect(stderrLines(r)).toEqual([refusal(MAIN, blob, 900, 600)]);
  });

  it("G18 MERGE: an oversized export that only a merge commit writes - its own change, against each parent - is judged", () => {
    const repo = makeRepo();
    const base = repo.commit({ [MAIN]: 10 }, "base");
    repo.git("checkout", "-q", "-b", "side");
    repo.commit({ "src/side.ts": 3 }, "side");
    repo.git("checkout", "-q", "main");
    repo.commit({ "src/main.ts": 4 }, "main");
    repo.git("merge", "-q", "--no-commit", "side");
    writeFileSync(join(repo.dir, MAIN), "x".repeat(900));
    repo.git("add", "--", MAIN);
    repo.git("commit", "-q", "-m", "a merge that writes the export");
    const tip = repo.git("rev-parse", "HEAD");
    expect(repo.git("rev-list", "--parents", "-n", "1", tip).split(" ")).toHaveLength(3);
    const r = repo.guard([tip, "--not", base], "600");
    expect(r.status).toBe(2);
    expect(stderrLines(r)).toEqual([refusal(MAIN, repo.blobOf(tip, MAIN), 900, 600)]);
  });

  it("G19 NOT SENT: a pushed commit that writes back an export blob an excluded commit already holds sends no such blob and passes; the same push with nothing excluded refuses", () => {
    const repo = makeRepo();
    const old = repo.commit({ [MAIN]: 900 }, "an oversized export the remote already holds");
    repo.git("rm", "-q", "--", MAIN);
    repo.git("commit", "-q", "-m", "the export removed");
    const tip = repo.commit({ [MAIN]: 900 }, "the same bytes written back");
    expect(repo.blobOf(tip, MAIN)).toBe(repo.blobOf(old, MAIN));
    const excluded = repo.guard([tip, "--not", old], "600");
    expect(excluded.status).toBe(0);
    expect(excluded.stderr).toBe("");
    const whole = repo.guard([tip], "600");
    expect(whole.status).toBe(2);
    expect(stderrLines(whole)).toEqual([refusal(MAIN, repo.blobOf(tip, MAIN), 900, 600)]);
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

// wb-xkto: G9 and G10 grew by their zero-led sha plants (G9 ran 1.9 s at load1 193 under the 5 s default the complete gate's test
// step leaves); the describe carries the compaction CLI describe's bound.
describe("wb-294d export-size guard as the git pre-push hook (the push itself never reaches the remote)", { timeout: 120_000 }, () => {
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

  it("G9 the hook judges the push of the local sha of each line that pushes on these stdins it plants - the base commit's line alone, its two lines at once, its line alone whose remote sha, forty f's, this repository lacks, its line alone of the root commit it builds, whose sha begins and ends with 0 and is not all zeros (writing the oversized shard), and its line that pushes the oversized shard after its deleted-ref line of forty zeros and before it - and its deleted-ref lines of forty zeros and of sixty-four, each alone on stdin with the base commit as the remote sha, exit 0; it refuses each malformed line it plants alone on stdin rc 3 - its line of three fields, and with one typed line each: its lines of two and of five fields, of a local and of a remote sha one digit short, of an upper-case local and of an upper-case remote sha, and its three deleted-ref lines (three fields with forty zeros, forty zeros beside a remote sha one digit short, sixty-four zeros beside an upper-case remote sha)", () => {
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
    expect(base.toUpperCase()).not.toBe(base);
    expect(tip.toUpperCase()).not.toBe(tip);
    // wb-137f refusal #1 (U4, W8-04/W8-05): each sha form at both positions - the local sha one digit short or upper-case, and the remote.
    const malformed = [
      `refs/heads/main ${tip}`,
      `refs/heads/main ${tip} refs/heads/main ${base} extra`,
      `refs/heads/main ${tip.slice(1)} refs/heads/main ${base}`,
      `refs/heads/main ${tip} refs/heads/main ${base.toUpperCase()}`,
      `refs/heads/main ${tip.toUpperCase()} refs/heads/main ${base}`,
      `refs/heads/main ${tip} refs/heads/main ${base.slice(1)}`,
    ];
    for (const bad of malformed) {
      const refused = hook(`${bad}\n`);
      expect(refused.status, bad).toBe(3);
      expect(stderrLines(refused), bad).toEqual([`tracker-export: malformed pre-push line refused (${bad.length} chars); nothing is pushed`]);
    }
    const unknownRemote = hook(`refs/heads/main ${tip} refs/heads/main ${"f".repeat(40)}\n`);
    expect(unknownRemote.status).toBe(2);
    // wb-xkto (refusal #4 of wb-137f, U1: GP45-01, witness W-GP45-01a): the line alone of the root commit built here from the index
    // above, which writes the oversized shard and whose sha begins and ends with 0 and is not all zeros, is judged; the deleted-ref
    // line of sixty-four zeros with the base commit as its remote sha, alone, exits 0 like the one of forty.
    const zeroLed = zeroLedRootCommit(repo, "the oversized shard at a sha that begins and ends with 0");
    expect([ZERO_LED.test(zeroLed), /^0+$/.test(zeroLed)], "the local sha begins and ends with 0 and is not all zeros").toEqual([true, false]);
    const zeroLedPush = hook(`refs/heads/z ${zeroLed} refs/heads/z ${zeros}\n`);
    expect(zeroLedPush.status).toBe(2);
    expect(stderrLines(zeroLedPush)).toEqual([refusal(SHARD, repo.blobOf(zeroLed, SHARD), 900, 600)]);
    const deleted64 = hook(`(delete) ${"0".repeat(64)} refs/heads/gone ${base}\n`);
    expect([deleted64.status, deleted64.stderr]).toEqual([0, ""]);
    // wb-xkto (refusal #1 of wb-xkto, U1: GX8-01, witness W-GX8-01): the line that pushes the oversized shard is judged beside the
    // deleted-ref line of forty zeros - that line before it (git push origin :gone main), and after it.
    const oversizedShard = refusal(SHARD, repo.blobOf(tip, SHARD), 900, 600);
    const deletedThenPush = hook(`(delete) ${zeros} refs/heads/gone ${base}\nrefs/heads/main ${tip} refs/heads/main ${zeros}\n`);
    expect([deletedThenPush.status, stderrLines(deletedThenPush)], "a deleted-ref line, then a line that pushes the oversized shard").toEqual([2, [oversizedShard]]);
    const pushThenDeleted = hook(`refs/heads/main ${tip} refs/heads/main ${zeros}\n(delete) ${zeros} refs/heads/gone ${base}\n`);
    expect([pushThenDeleted.status, stderrLines(pushThenDeleted)], "a line that pushes the oversized shard, then a deleted-ref line").toEqual([2, [oversizedShard]]);
    // wb-xkto (refusal #1 of wb-xkto, U2: GX8-03, witness W-GX8-03): these three deleted-ref lines are malformed, one typed line
    // each - three fields with forty zeros, forty zeros beside a remote sha one digit short, and sixty-four zeros beside an upper-case
    // remote sha.
    const malformedLine = (bad: string): string => `tracker-export: malformed pre-push line refused (${bad.length} chars); nothing is pushed`;
    const deletedThreeFields = `(delete) ${zeros} refs/heads/gone`;
    const deletedThree = hook(`${deletedThreeFields}\n`);
    expect([deletedThree.status, stderrLines(deletedThree)], deletedThreeFields).toEqual([3, [malformedLine(deletedThreeFields)]]);
    const deletedShortRemote = `(delete) ${zeros} refs/heads/gone ${base.slice(1)}`;
    const deletedShort = hook(`${deletedShortRemote}\n`);
    expect([deletedShort.status, stderrLines(deletedShort)], deletedShortRemote).toEqual([3, [malformedLine(deletedShortRemote)]]);
    const deleted64UpperRemote = `(delete) ${"0".repeat(64)} refs/heads/gone ${base.toUpperCase()}`;
    const deletedUpper = hook(`${deleted64UpperRemote}\n`);
    expect([deletedUpper.status, stderrLines(deletedUpper)], deleted64UpperRemote).toEqual([3, [malformedLine(deleted64UpperRemote)]]);
  });

  const hookIn = (repo: Repo, remote: string, stdin: string): SpawnSyncReturns<string> =>
    spawnSync(process.execPath, [TOOL, "pre-push", remote, repo.remote], { cwd: repo.dir, env: childEnv(repo.home, { [CEILING_ENV]: "600" }), input: stdin, encoding: "utf8" });

  it("G10 on each stdin it plants the hook excludes the line's remote sha when this repository has it as a commit, and the oversized export only that commit's history holds is not judged again: the local sha's parent (the same push from a new ref is judged), the root commit it builds as the local sha's parent, whose sha begins and ends with 0 and is not all zeros, and the remote's commit X beside the local Y, both children of one base commit (a push of Y over X, which is not a fast-forward, Y writing no family blob; the same push from a new ref is judged); the remote shas it plants naming the oversized export's blob and the tree of the commit that holds it - objects this repository has that are not commits - are not excluded and the push is judged", () => {
    const repo = makeRepo();
    const old = repo.commit({ [MAIN]: 900 }, "an oversized export the remote already holds");
    const tip = repo.commit({ "src/b.ts": 5 }, "a later commit that does not touch the export");
    const known = hookIn(repo, "origin", `refs/heads/main ${tip} refs/heads/main ${old}\n`);
    expect(known.status).toBe(0);
    expect(known.stderr).toBe("");
    const fresh = hookIn(repo, "origin", `refs/heads/main ${tip} refs/heads/main ${"0".repeat(40)}\n`);
    expect(fresh.status).toBe(2);
    expect(stderrLines(fresh)).toEqual([refusal(MAIN, repo.blobOf(old, MAIN), 900, 600)]);
    // wb-xkto (refusal #4 of wb-137f, U1: GP45-01, witness W-GP45-01b): the remote's commit here is the root commit built below, which
    // holds the oversized export and whose sha begins and ends with 0, and it is excluded; (F5 rider: GP45-13, witness W-GP45-13) the
    // remote sha naming the oversized export's blob, or the tree of the commit that holds it, is no commit, so it is not excluded and
    // the push is judged.
    const zeroRepo = makeRepo();
    mkdirSync(join(zeroRepo.dir, ".beads"), { recursive: true });
    writeFileSync(join(zeroRepo.dir, MAIN), "x".repeat(900));
    zeroRepo.git("add", "--", MAIN);
    const zeroOld = zeroLedRootCommit(zeroRepo, "an oversized export the remote already holds, at a sha that begins and ends with 0");
    expect([ZERO_LED.test(zeroOld), /^0+$/.test(zeroOld)], "the remote sha begins and ends with 0 and is not all zeros").toEqual([true, false]);
    zeroRepo.git("update-ref", "HEAD", zeroOld);
    const zeroTip = zeroRepo.commit({ "src/b.ts": 5 }, "a later commit that does not touch the export");
    expect(zeroRepo.git("rev-parse", `${zeroTip}^`)).toBe(zeroOld);
    const zeroKnown = hookIn(zeroRepo, "origin", `refs/heads/main ${zeroTip} refs/heads/main ${zeroOld}\n`);
    expect([zeroKnown.status, zeroKnown.stderr]).toEqual([0, ""]);
    const blob = zeroRepo.blobOf(zeroOld, MAIN);
    expect(zeroRepo.git("cat-file", "-t", blob)).toBe("blob");
    const notCommit = hookIn(zeroRepo, "origin", `refs/heads/main ${zeroTip} refs/heads/main ${blob}\n`);
    expect(notCommit.status).toBe(2);
    expect(stderrLines(notCommit)).toEqual([refusal(MAIN, blob, 900, 600)]);
    const tree = zeroRepo.git("rev-parse", `${zeroOld}^{tree}`);
    expect(zeroRepo.git("cat-file", "-t", tree)).toBe("tree");
    const notCommitTree = hookIn(zeroRepo, "origin", `refs/heads/main ${zeroTip} refs/heads/main ${tree}\n`);
    expect(notCommitTree.status).toBe(2);
    expect(stderrLines(notCommitTree)).toEqual([refusal(MAIN, blob, 900, 600)]);
    // wb-xkto (refusal #1 of wb-xkto, U3: GX8-06, witness W-GX8-06): this push of Y over X is not a fast-forward - the remote's commit
    // X, which this repository has, is no ancestor of the local sha Y; both are children of the base commit that writes the oversized
    // export, and Y's side writes no family blob - and it excludes X, so the base's export is not judged; the same push from a new ref
    // is judged.
    const sides = makeRepo();
    const sidesBase = sides.commit({ [MAIN]: 900 }, "the base: an oversized export the remote already holds");
    const remoteTip = sides.commit({ "src/x.ts": 5 }, "X: the remote's tip");
    sides.git("checkout", "-q", "-b", "y", sidesBase);
    const localTip = sides.commit({ "src/y.ts": 5 }, "Y: a sibling of X that does not touch the export");
    const isAncestor = (ancestor: string, of: string): number | null =>
      spawnSync("git", ["merge-base", "--is-ancestor", ancestor, of], { cwd: sides.dir, env: childEnv(sides.home), encoding: "utf8" }).status;
    expect(
      [isAncestor(remoteTip, localTip), isAncestor(sidesBase, localTip), isAncestor(sidesBase, remoteTip), sides.blobOf(localTip, MAIN) === sides.blobOf(sidesBase, MAIN)],
      "X is no ancestor of Y; the base is an ancestor of both; Y keeps the base's export",
    ).toEqual([1, 0, 0, true]);
    const notFastForward = hookIn(sides, "origin", `refs/heads/main ${localTip} refs/heads/main ${remoteTip}\n`);
    expect([notFastForward.status, notFastForward.stderr], "a push of Y over the remote's X, a commit this repository has").toEqual([0, ""]);
    const sidesFresh = hookIn(sides, "origin", `refs/heads/main ${localTip} refs/heads/main ${"0".repeat(40)}\n`);
    expect([sidesFresh.status, stderrLines(sidesFresh)], "the same push from a new ref").toEqual([2, [refusal(MAIN, sides.blobOf(sidesBase, MAIN), 900, 600)]]);
  });

  it("G11 the hook excludes the remote-tracking ref it plants for the remote it is called for, origin's main: a new branch whose commit is a child of the commit that ref names passes, the same line for another remote does not", () => {
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

  it("G13 its push the hook cannot judge, of a local sha this repository lacks, alone on stdin exits 3 with its typed line; beside its line that pushes the oversized shard, which refuses at the ceiling, the exit is 2 with both lines, and its malformed line beside that push exits 2 as well, with both lines", () => {
    const repo = makeRepo();
    repo.commit({ [MAIN]: 10 }, "base");
    const tip = repo.commit({ [SHARD]: 900 }, "large shard");
    const zeros = "0".repeat(40);
    const ghost = "1234567890abcdef1234567890abcdef12345678";
    const unjudged = `tracker-export: could not judge a push of ${ghost} (git rev-list --objects ${ghost} exited 128); nothing is pushed`;
    const alone = hookIn(repo, "origin", `refs/heads/g ${ghost} refs/heads/g ${zeros}\n`);
    expect(alone.status).toBe(3);
    expect(stderrLines(alone)).toEqual([unjudged]);
    const both = hookIn(repo, "origin", `refs/heads/g ${ghost} refs/heads/g ${zeros}\nrefs/heads/b ${tip} refs/heads/b ${zeros}\n`);
    expect(both.status).toBe(2);
    expect(stderrLines(both)).toEqual([unjudged, refusal(SHARD, repo.blobOf(tip, SHARD), 900, 600)]);
    const bad = "refs/heads/main not-a-sha refs/heads/main";
    const malformed = hookIn(repo, "origin", `${bad}\nrefs/heads/b ${tip} refs/heads/b ${zeros}\n`);
    expect(malformed.status).toBe(2);
    expect(stderrLines(malformed)).toEqual([`tracker-export: malformed pre-push line refused (${bad.length} chars); nothing is pushed`, refusal(SHARD, repo.blobOf(tip, SHARD), 900, 600)]);
  });

  it("G14 one typed line per oversized blob however many family paths hold it: the same bytes at the main export and in a shard print one line, naming one of those family paths", () => {
    const repo = makeRepo();
    const tip = repo.commit({ [MAIN]: 900, [SHARD]: 900 }, "the same 900 bytes at two family paths");
    const blob = repo.blobOf(tip, MAIN);
    expect(repo.blobOf(tip, SHARD)).toBe(blob);
    const r = repo.guard([tip], "600");
    expect(r.status).toBe(2);
    const lines = stderrLines(r);
    expect(lines).toHaveLength(1);
    expect([refusal(MAIN, blob, 900, 600), refusal(SHARD, blob, 900, 600)]).toContain(lines[0]);
  });

  it("G15 USAGE: guard with no tip or two, or with an unknown or valueless option, pre-push with no remote or three arguments, and an unknown verb or none exit 3 with their usage line and nothing on stdout", () => {
    const repo = makeRepo();
    const tip = repo.commit({ [MAIN]: 10 }, "base");
    const run = (args: readonly string[]): SpawnSyncReturns<string> => spawnSync(process.execPath, [TOOL, ...args], { cwd: repo.dir, env: childEnv(repo.home), input: "", encoding: "utf8" });
    const cases: readonly [readonly string[], string][] = [
      [["guard"], "tracker-export: usage: guard <tip> [--not <rev>]...; nothing is pushed"],
      [["guard", tip, tip], "tracker-export: usage: guard <tip> [--not <rev>]...; nothing is pushed"],
      [["guard", tip, "--force"], "tracker-export: usage: guard <tip> [--not <rev>]...; nothing is pushed"],
      [["guard", tip, "--not"], "tracker-export: usage: guard <tip> [--not <rev>]...; nothing is pushed"],
      [["guard", "--not", tip], "tracker-export: usage: guard <tip> [--not <rev>]...; nothing is pushed"],
      [["pre-push"], "tracker-export: usage: pre-push <remote> [<url>] (git pre-push hook; ref lines on stdin); nothing is pushed"],
      [["pre-push", "origin", repo.remote, "extra"], "tracker-export: usage: pre-push <remote> [<url>] (git pre-push hook; ref lines on stdin); nothing is pushed"],
      [["frobnicate"], "tracker-export: usage: compact | rehydrate | guard | pre-push (see the header of qa/workbench/tracker-export.mjs)"],
      [[], "tracker-export: usage: compact | rehydrate | guard | pre-push (see the header of qa/workbench/tracker-export.mjs)"],
    ];
    for (const [args, usage] of cases) {
      const r = run(args);
      expect(r.status, args.join(" ")).toBe(3);
      expect(stderrLines(r), args.join(" ")).toEqual([usage]);
      expect(r.stdout).toBe("");
    }
  });
});
